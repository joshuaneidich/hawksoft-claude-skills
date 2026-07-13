import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

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

for (const skillDir of skillDirs) {
  const skillFile = join(skillDir, 'SKILL.md');
  if (!existsSync(skillFile)) {
    throw new Error(`Missing SKILL.md in ${skillDir}`);
  }

  const content = readFileSync(skillFile, 'utf8').trim();
  if (!content) {
    throw new Error(`Empty SKILL.md in ${skillDir}`);
  }

  if (!content.startsWith('---')) {
    throw new Error(`SKILL.md in ${skillDir} must start with YAML frontmatter.`);
  }

  if (!/^name:\s*.+$/m.test(content) || !/^description:\s*.+$/m.test(content)) {
    throw new Error(`SKILL.md in ${skillDir} must include name and description frontmatter.`);
  }

  // Every markdown file the skill routes to must exist. Screenshots are
  // exempt: SKILL.md documents that they may be added later.
  const referenced = [...content.matchAll(/\$\{CLAUDE_SKILL_DIR\}\/(\S+?\.md)/g)]
    .map((match) => match[1]);

  for (const relPath of referenced) {
    const target = join(skillDir, relPath);
    if (!existsSync(target)) {
      throw new Error(`SKILL.md in ${skillDir} references missing file: ${relPath}`);
    }
  }

  console.log(`Validated skill: ${skillDir} (${referenced.length} routed file(s) checked)`);
}

console.log(`Validated ${skillDirs.length} skill(s).`);
