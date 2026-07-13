import { readFileSync } from 'node:fs';

const files = [
  '.claude-plugin/marketplace.json',
  'plugins/.claude-plugin/plugin.json'
];

for (const file of files) {
  JSON.parse(readFileSync(file, 'utf8'));
  console.log(`Valid JSON: ${file}`);
}
