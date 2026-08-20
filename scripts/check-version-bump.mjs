// Fail when the shipped plugin changed but its version did not.
//
// `/plugin marketplace add` follows the default branch, so a merge is a release
// whether or not anyone calls it one. If two commits ship different procedures
// under the same version, "what version are you running?" stops being an
// answerable question — the number no longer identifies the content. This check
// makes the version the one reliable handle on what an installed agency has.
//
// Only files that actually reach an installed plugin count. Docs, the README, CI,
// and the validators can change freely without a bump; SKILL.md, task and
// reference files, the manifests, and the bundled hook cannot.
//
// Usage:
//   node scripts/check-version-bump.mjs <base-ref>
//
// CI passes the pull request's base or the previous default-branch commit. With no
// base (a first push, a force push, a shallow clone) there is nothing to compare
// against and the check reports that instead of guessing.

import { execFileSync } from 'node:child_process';

const PAYLOAD_PREFIXES = ['.claude-plugin/', 'skills/'];
const PAYLOAD_FILES = ['scripts/hawksoft-guard.mjs'];

const MANIFEST = '.claude-plugin/plugin.json';

function git(args) {
  // Capture stderr rather than letting git print it: every call here is inside a
  // try/catch that reports the failure in its own words.
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  }).trim();
}

function skip(reason) {
  console.log(`Version-bump check skipped: ${reason}`);
  process.exit(0);
}

function isPayload(file) {
  return (
    PAYLOAD_PREFIXES.some((prefix) => file.startsWith(prefix)) || PAYLOAD_FILES.includes(file)
  );
}

// Compare only the numeric release triple; a prerelease suffix is treated as the
// release it belongs to, which is enough to catch "forgot to bump".
function parseVersion(value) {
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(value ?? '');
  if (!match) return null;
  return match.slice(1, 4).map(Number);
}

function isGreater(next, previous) {
  for (let i = 0; i < 3; i += 1) {
    if (next[i] > previous[i]) return true;
    if (next[i] < previous[i]) return false;
  }
  return false;
}

const baseRef = process.argv[2];

if (!baseRef || /^0+$/.test(baseRef)) {
  skip('no base revision to compare against.');
}

let base;
try {
  base = git(['merge-base', baseRef, 'HEAD']);
} catch {
  skip(`base revision "${baseRef}" is not reachable in this clone.`);
}

if (base === git(['rev-parse', 'HEAD'])) {
  skip('nothing new on this branch.');
}

const changed = git(['diff', '--name-only', base, 'HEAD']).split('\n').filter(Boolean);
const payloadChanges = changed.filter(isPayload);

if (payloadChanges.length === 0) {
  console.log(
    `No shipped plugin files changed since ${base.slice(0, 8)} — no version bump required.`
  );
  process.exit(0);
}

let baseManifest;
try {
  baseManifest = JSON.parse(git(['show', `${base}:${MANIFEST}`]));
} catch {
  skip(`${MANIFEST} did not exist at ${base.slice(0, 8)}.`);
}

const headManifest = JSON.parse(git(['show', `HEAD:${MANIFEST}`]));

const previous = parseVersion(baseManifest.version);
const next = parseVersion(headManifest.version);

if (!previous || !next) {
  console.error(
    `\nCannot compare versions: "${baseManifest.version}" -> "${headManifest.version}".\n`
  );
  process.exit(1);
}

if (!isGreater(next, previous)) {
  const state =
    headManifest.version === baseManifest.version
      ? `but ${MANIFEST} is still ${headManifest.version}`
      : `but ${MANIFEST} went backwards, ${baseManifest.version} -> ${headManifest.version}`;
  console.error(
    `\n${payloadChanges.length} shipped plugin file(s) changed since ${base.slice(0, 8)}, ` +
      `${state}:\n`
  );
  for (const file of payloadChanges) console.error(`  - ${file}`);
  console.error(
    '\nInstalls follow the default branch, so this would ship new content under a ' +
      'version someone is already running. Bump the version in package.json and both ' +
      'files in .claude-plugin/ (npm test checks they agree), then commit again.\n' +
      'Patch for wording and fixes, minor for a new task or skill, major for a routing ' +
      'or safety change.\n'
  );
  process.exit(1);
}

console.log(
  `Version bumped ${baseManifest.version} -> ${headManifest.version} for ` +
    `${payloadChanges.length} shipped file change(s).`
);
