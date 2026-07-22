#!/usr/bin/env node
// Build vendor deliverables from the single source under skills/.
//
// Every vendor gets a namespaced folder under dist/ produced by its own
// translation step (scripts/translations/<vendor>.mjs). Claude is native
// (packaging + variants); other vendors adapt the skill into their format.
//
// Usage:
//   npm run build             # build every vendor
//   npm run build chatgpt     # build one vendor
//   node scripts/build.mjs claude

import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as claude from './translations/claude.mjs';
import * as chatgpt from './translations/chatgpt.mjs';

// Register vendors here. Adding a target is: drop a translations/<id>.mjs that
// exports `meta` and `translate`, then add it to this list.
const registry = [claude, chatgpt];

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, '..');
const skillsRoot = join(repoRoot, 'skills');
const distRoot = join(repoRoot, 'dist');

const only = process.argv[2];
const selected = only ? registry.filter((m) => m.meta.id === only) : registry;

if (only && selected.length === 0) {
  const known = registry.map((m) => m.meta.id).join(', ');
  console.error(`Unknown vendor "${only}". Known vendors: ${known}`);
  process.exit(1);
}

for (const mod of selected) {
  const outDir = join(distRoot, mod.meta.id);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const summary = mod.translate({ repoRoot, skillsRoot, outDir, scriptDir });

  console.log(`\n${mod.meta.label}  →  dist/${mod.meta.id}/`);
  for (const line of summary) console.log('  ' + line);
}

console.log('\nEach vendor folder is a self-contained deliverable. dist/ is gitignored.\n');
