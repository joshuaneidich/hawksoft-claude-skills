// Validate the plugin metadata that Claude Code reads at install time.
//
// Beyond "is it parseable", this checks the three places a version or
// description can drift apart: package.json, .claude-plugin/plugin.json, and
// the marketplace entry that mirrors the manifest for the /plugin browse UI.
// Drift there is invisible locally and only shows up as a wrong version pinned
// by whoever installs next.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const files = ['.claude-plugin/marketplace.json', '.claude-plugin/plugin.json', 'package.json'];

const parsed = {};
for (const file of files) {
  parsed[file] = JSON.parse(readFileSync(file, 'utf8'));
  console.log(`Valid JSON: ${file}`);
}

const marketplace = parsed['.claude-plugin/marketplace.json'];
const manifest = parsed['.claude-plugin/plugin.json'];
const pkg = parsed['package.json'];

const errors = [];

// The manifest is what users install; require the metadata that makes a plugin
// findable and legally usable.
for (const field of ['name', 'version', 'description', 'license', 'repository', 'homepage']) {
  if (!manifest[field]) {
    errors.push(`.claude-plugin/plugin.json is missing "${field}".`);
  }
}

if (!/^\d+\.\d+\.\d+/.test(manifest.version ?? '')) {
  errors.push(`.claude-plugin/plugin.json version "${manifest.version}" is not semver.`);
}

if (pkg.version !== manifest.version) {
  errors.push(
    `package.json version (${pkg.version}) does not match ` +
      `.claude-plugin/plugin.json version (${manifest.version}).`
  );
}

if (existsSync('LICENSE')) {
  const license = readFileSync('LICENSE', 'utf8');
  if (manifest.license === 'MIT' && !/MIT License/i.test(license)) {
    errors.push('plugin.json declares "MIT" but LICENSE does not look like the MIT License.');
  }
} else {
  errors.push('Missing LICENSE file at the repository root.');
}

for (const plugin of marketplace.plugins ?? []) {
  if (typeof plugin.source !== 'string') {
    errors.push(`Marketplace plugin "${plugin.name}" is missing a string source.`);
    continue;
  }

  const manifestPath = join(plugin.source, '.claude-plugin', 'plugin.json');
  if (!existsSync(manifestPath)) {
    errors.push(
      `Marketplace plugin "${plugin.name}" points at "${plugin.source}" ` +
        `but ${manifestPath} does not exist.`
    );
    continue;
  }

  console.log(`Marketplace source exists: ${plugin.name} -> ${plugin.source}`);

  // A marketplace entry may restate manifest fields for the browse UI. When it
  // does, the two must agree.
  const target = JSON.parse(readFileSync(manifestPath, 'utf8'));
  for (const field of ['name', 'version', 'description', 'license', 'homepage', 'repository']) {
    if (plugin[field] !== undefined && plugin[field] !== target[field]) {
      errors.push(
        `Marketplace entry "${plugin.name}" ${field} is "${plugin[field]}" ` +
          `but ${manifestPath} says "${target[field]}".`
      );
    }
  }
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s) found:`);
  for (const message of errors) console.error(`  - ${message}`);
  console.error('');
  process.exit(1);
}

console.log('Plugin metadata is consistent across package.json, plugin.json, and marketplace.json.');
