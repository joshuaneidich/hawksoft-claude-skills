import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const files = [
  '.claude-plugin/marketplace.json',
  '.claude-plugin/plugin.json'
];

for (const file of files) {
  JSON.parse(readFileSync(file, 'utf8'));
  console.log(`Valid JSON: ${file}`);
}

const marketplace = JSON.parse(readFileSync('.claude-plugin/marketplace.json', 'utf8'));

for (const plugin of marketplace.plugins ?? []) {
  if (typeof plugin.source !== 'string') {
    throw new Error(`Marketplace plugin "${plugin.name}" is missing a string source.`);
  }
  const manifest = join(plugin.source, '.claude-plugin', 'plugin.json');
  if (!existsSync(manifest)) {
    throw new Error(`Marketplace plugin "${plugin.name}" points at "${plugin.source}" but ${manifest} does not exist.`);
  }
  console.log(`Marketplace source exists: ${plugin.name} -> ${plugin.source}`);
}
