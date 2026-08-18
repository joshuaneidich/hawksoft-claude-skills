// Validate every skill under skills/.
//
// This is the guard that stands between a commit and every installed user:
// installs track the default branch directly, so anything that lands here is
// live immediately. The checks are deliberately about *broken references*,
// because a dangling path is a silent failure — Claude reads the file, finds
// nothing, and improvises, which is exactly what the never-guess rule forbids.
//
// Checks performed per skill:
//   1. SKILL.md exists, is non-empty, and starts with YAML frontmatter.
//   2. Frontmatter has `name` and `description`, and `name` matches the
//      directory name (Claude namespaces the command as /<plugin>:<name>).
//   3. Every `${CLAUDE_SKILL_DIR}/...` routed file exists.
//   4. Every markdown link and **image** with a local target resolves — this
//      is what catches an embedded screenshot that was never captured.
//   5. Every backticked path-like reference (`../references/foo.md`) resolves.
//   6. Every `<!-- screenshot-pending: ... -->` marker points inside the
//      skill's screenshots/ folder at a file that does not exist yet; once the
//      capture lands, the marker must become a real embed.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

const skillsRoot = join(process.cwd(), 'skills');

if (!existsSync(skillsRoot)) {
  throw new Error(`Missing skills directory: ${skillsRoot}`);
}

const skillDirs = readdirSync(skillsRoot)
  .map((entry) => join(skillsRoot, entry))
  .filter((entry) => statSync(entry).isDirectory());

if (skillDirs.length === 0) {
  throw new Error('No skill directories found under skills/.');
}

function markdownFilesIn(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const target = join(dir, entry);
    if (statSync(target).isDirectory()) markdownFilesIn(target, found);
    else if (entry.endsWith('.md')) found.push(target);
  }
  return found;
}

function relativeToRepo(absPath) {
  return absPath.slice(process.cwd().length + 1).split('\\').join('/');
}

// `[text](target)` and `![alt](target)`, with an optional "title".
const MARKDOWN_LINK = /(!?)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
// A backticked reference that looks like a path: it contains a slash.
const BACKTICKED_PATH = /`([^`\n]*\/[^`\n]*\.md)`/g;
// Non-greedy to the closing `-->`: captions legitimately contain `>` (HawkSoft
// breadcrumbs read `Phone > From > Insured`).
const SCREENSHOT_PENDING = /<!--\s*screenshot-pending:\s*(\S+)[\s\S]*?-->/g;
// Anything the filesystem cannot answer for: URLs, mailto:, bare anchors, and
// paths still carrying an unexpanded plugin variable.
const NOT_A_LOCAL_PATH = /^(?:[a-z][a-z0-9+.-]*:|#|\$\{)/i;

const errors = [];
let totalRouted = 0;
let totalLinks = 0;
let totalPending = 0;

for (const skillDir of skillDirs) {
  const skillName = basename(skillDir);
  const skillFile = join(skillDir, 'SKILL.md');

  if (!existsSync(skillFile)) {
    errors.push(`Missing SKILL.md in ${relativeToRepo(skillDir)}`);
    continue;
  }

  const content = readFileSync(skillFile, 'utf8').trim();
  if (!content) {
    errors.push(`Empty SKILL.md in ${relativeToRepo(skillDir)}`);
    continue;
  }

  if (!content.startsWith('---')) {
    errors.push(`SKILL.md in ${relativeToRepo(skillDir)} must start with YAML frontmatter.`);
    continue;
  }

  const nameMatch = content.match(/^name:\s*(.+)$/m);
  if (!nameMatch || !/^description:\s*.+$/m.test(content)) {
    errors.push(
      `SKILL.md in ${relativeToRepo(skillDir)} must include name and description frontmatter.`
    );
  } else if (nameMatch[1].trim() !== skillName) {
    errors.push(
      `SKILL.md in ${relativeToRepo(skillDir)} declares name "${nameMatch[1].trim()}" ` +
        `but lives in directory "${skillName}"; they must match so /<plugin>:<name> resolves.`
    );
  }

  // 3. Routed paths: ${CLAUDE_SKILL_DIR}/... must exist. Not just .md — SKILL.md
  //    has pointed at screenshot files that were never captured under filenames
  //    no task ever used, and nothing caught it.
  const routed = [...content.matchAll(/\$\{CLAUDE_SKILL_DIR\}\/([^\s`'"]+)/g)].map((m) => m[1]);
  for (const relPath of routed) {
    if (!existsSync(join(skillDir, relPath))) {
      errors.push(`SKILL.md in ${relativeToRepo(skillDir)} references missing file: ${relPath}`);
    }
  }
  totalRouted += routed.length;

  // 4-6. Every markdown file in the skill, including SKILL.md itself.
  let skillLinks = 0;
  let skillPending = 0;

  for (const file of markdownFilesIn(skillDir)) {
    const text = readFileSync(file, 'utf8');
    const where = relativeToRepo(file);

    for (const match of text.matchAll(MARKDOWN_LINK)) {
      const isImage = match[1] === '!';
      const raw = match[2];
      if (NOT_A_LOCAL_PATH.test(raw)) continue;
      const target = raw.split('#')[0];
      if (!target) continue;
      skillLinks += 1;
      if (!existsSync(resolve(dirname(file), target))) {
        errors.push(
          `${where} embeds a missing ${isImage ? 'image' : 'file'}: ${raw}` +
            (isImage
              ? ' (capture it, or replace the embed with a <!-- screenshot-pending: ... --> marker)'
              : '')
        );
      }
    }

    for (const match of text.matchAll(BACKTICKED_PATH)) {
      const raw = match[1];
      if (NOT_A_LOCAL_PATH.test(raw)) continue;
      skillLinks += 1;
      if (!existsSync(resolve(dirname(file), raw))) {
        errors.push(`${where} points at a missing file: ${raw}`);
      }
    }

    for (const match of text.matchAll(SCREENSHOT_PENDING)) {
      const raw = match[1];
      skillPending += 1;
      const absolute = resolve(dirname(file), raw);
      if (!absolute.startsWith(join(skillDir, 'screenshots'))) {
        errors.push(
          `${where} has a screenshot-pending marker outside the skill's screenshots/ folder: ${raw}`
        );
      } else if (existsSync(absolute)) {
        errors.push(
          `${where} still marks ${raw} as pending, but the file now exists — ` +
            'replace the marker with a real ![caption](path) embed.'
        );
      }
    }
  }

  totalLinks += skillLinks;
  totalPending += skillPending;

  console.log(
    `Validated skill: ${relativeToRepo(skillDir)} ` +
      `(${routed.length} routed file(s), ${skillLinks} local reference(s), ` +
      `${skillPending} screenshot(s) pending)`
  );
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s) found:`);
  for (const message of errors) console.error(`  - ${message}`);
  console.error('');
  process.exit(1);
}

console.log(
  `Validated ${skillDirs.length} skill(s): ${totalRouted} routed file(s), ` +
    `${totalLinks} local reference(s) resolved, ${totalPending} screenshot(s) awaiting capture.`
);
