#!/usr/bin/env node
// Sync shared reference files into every skill.
//
// The single source of truth for cross-skill references (for example, the
// "find and open a client" precondition) lives in shared/references/. Each skill
// is bundled independently for non-Claude vendors, so a task can only link to a
// reference inside its own skill — this script copies every shared reference into
// each skills/<skill>/references/ so those links resolve everywhere.
//
// Usage:
//   node scripts/sync-shared.mjs           # write copies into each skill
//   node scripts/sync-shared.mjs --check   # fail if any copy is missing/outdated
//
// The --check mode runs in `npm test` so the copies can never silently drift from
// the source. When it fails, run `npm run sync:shared` and commit the result.

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const sharedRefs = join(repoRoot, 'shared', 'references');
const skillsRoot = join(repoRoot, 'skills');

const check = process.argv.includes('--check');

function listSkills() {
  if (!existsSync(skillsRoot)) return [];
  return readdirSync(skillsRoot)
    .filter((entry) => {
      const dir = join(skillsRoot, entry);
      return statSync(dir).isDirectory() && existsSync(join(dir, 'SKILL.md'));
    })
    .sort();
}

function sharedFiles() {
  if (!existsSync(sharedRefs)) return [];
  return readdirSync(sharedRefs)
    .filter((f) => f.endsWith('.md'))
    .sort();
}

const files = sharedFiles();
const skills = listSkills();
const problems = [];
let wrote = 0;

for (const skill of skills) {
  const destDir = join(skillsRoot, skill, 'references');
  for (const file of files) {
    const source = readFileSync(join(sharedRefs, file), 'utf8');
    const destPath = join(destDir, file);
    const current = existsSync(destPath) ? readFileSync(destPath, 'utf8') : null;
    if (current === source) continue;
    if (check) {
      problems.push(`${skill}/references/${file}`);
    } else {
      mkdirSync(destDir, { recursive: true });
      writeFileSync(destPath, source);
      wrote += 1;
      console.log(`synced  skills/${skill}/references/${file}`);
    }
  }
}

if (check) {
  if (problems.length) {
    console.error(
      'Shared references out of sync:\n  - ' +
        problems.join('\n  - ') +
        '\n\nRun: npm run sync:shared'
    );
    process.exit(1);
  }
  console.log(`Shared references in sync (${files.length} file(s) × ${skills.length} skill(s)).`);
} else {
  console.log(`Done. ${wrote} file(s) synced across ${skills.length} skill(s).`);
}
