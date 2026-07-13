import { readFileSync } from 'node:fs';

const files = [
  '.claude-plugin/marketplace.json',
  'plugins/claude/.claude-plugin/plugin.json',
  'plugins/.claude-plugin/plugin.json'
];

const parsed = new Map();

for (const file of files) {
  parsed.set(file, JSON.parse(readFileSync(file, 'utf8')));
  console.log(`Valid JSON: ${file}`);
}

const marketplace = parsed.get('.claude-plugin/marketplace.json');
if (!marketplace.owner || typeof marketplace.owner !== 'object' || !marketplace.owner.name) {
  throw new Error('.claude-plugin/marketplace.json must include an owner object with a name.');
}

if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length === 0) {
  throw new Error('.claude-plugin/marketplace.json must include at least one plugin entry.');
}

for (const plugin of marketplace.plugins) {
  if (!plugin.name) {
    throw new Error('Each marketplace plugin entry must include a name.');
  }
  if (!plugin.source) {
    throw new Error(`Marketplace plugin "${plugin.name}" must use source instead of path.`);
  }
  if (plugin.source !== './plugins/claude') {
    throw new Error(`Marketplace plugin "${plugin.name}" must point to ./plugins/claude.`);
  }
  if ('path' in plugin) {
    throw new Error(`Marketplace plugin "${plugin.name}" should not use unsupported path field.`);
  }
}
