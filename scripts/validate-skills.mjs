import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const skillRoots = [
  join(process.cwd(), 'skills'),
  join(process.cwd(), 'plugins', 'claude', 'skills'),
  join(process.cwd(), 'plugins', 'skills')
];

let validated = 0;

for (const skillsRoot of skillRoots) {
  if (!existsSync(skillsRoot)) {
    throw new Error(`Missing skills directory: ${skillsRoot}`);
  }

  const skillDirs = readdirSync(skillsRoot)
    .map((entry) => join(skillsRoot, entry))
    .filter((entry) => statSync(entry).isDirectory());

  if (skillDirs.length === 0) {
    throw new Error(`No skill directories found under ${skillsRoot}.`);
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

    validated += 1;
  }
}

console.log(`Validated ${validated} skill(s).`);
