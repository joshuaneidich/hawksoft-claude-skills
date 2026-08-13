// Claude translation: the native Claude Code plugin. No content translation is
// needed (Claude is the source format); the "translation" is packaging plus
// per-variant description tuning and, for the strict variant, a bundled
// UserPromptSubmit hook.
//
// The variants differ ONLY in how eagerly the skill activates — same skills, same
// commands, same procedures. You install exactly one, so the build produces just
// the recommended default (soft-trigger) unless you ask for others:
//
//   node scripts/build.mjs claude                     # default -> dist/claude/hawksoft/
//   node scripts/build.mjs claude --variant strict    # -> dist/claude/hawksoft-always-enforce/
//   node scripts/build.mjs claude --variant manual    # -> dist/claude/hawksoft-manual/
//   node scripts/build.mjs claude --all               # all three
//
// Output: dist/claude/<folder>/  (+ dist/claude/README.md)

import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const meta = {
  id: 'claude',
  label: 'Claude Code plugin',
  summary: 'Native plugin; recommended soft-trigger by default, other variants on demand.'
};

const skillRel = 'skills/hawksoft-operations/SKILL.md';

// Front-loaded, wide-trigger description for the two auto-activating variants.
const AUTO_DESCRIPTION =
  'HawkSoft agency-management workflows, especially logging client interactions ' +
  '(phone, walk-in, email, text, fax, mail, chat, online) — in the HawkSoft web app ' +
  '(agents.hawksoft.app) when it is available, otherwise the desktop Action menu. Use ' +
  'whenever HawkSoft is mentioned, or the user asks how to complete — or asks the ' +
  'assistant to perform — a HawkSoft operation such as logging a call or documenting a ' +
  'client conversation.';

const MANUAL_DESCRIPTION =
  'HawkSoft agency-management workflows (manual mode). Use only when the user ' +
  'explicitly invokes /hawksoft:hawksoft-operations or asks by name for a documented ' +
  'HawkSoft procedure. Do not auto-activate on incidental mentions of HawkSoft.';

// Each variant carries a short `key` (for --variant), a `folder` (its dist path),
// and whether it is the default single build.
const variants = [
  {
    key: 'soft',
    folder: 'hawksoft',
    label: 'Soft trigger (recommended default)',
    blurb:
      'A strong description auto-activates the skill on HawkSoft requests, but the ' +
      'assistant still decides. No hook, no extra setup.',
    description: AUTO_DESCRIPTION,
    hook: false,
    default: true
  },
  {
    key: 'strict',
    folder: 'hawksoft-always-enforce',
    label: 'Always enforce (strict)',
    blurb:
      'A bundled hook reminds the assistant to route through the skill every time ' +
      'HawkSoft is mentioned. Deterministic — closest to "always."',
    description: AUTO_DESCRIPTION,
    hook: true
  },
  {
    key: 'manual',
    folder: 'hawksoft-manual',
    label: 'Manual only',
    blurb:
      'The skill activates only when the user explicitly runs ' +
      '/hawksoft:hawksoft-operations. No auto-trigger, no hook.',
    description: MANUAL_DESCRIPTION,
    hook: false
  }
];

// Resolve which variants to build from the selector passed by the orchestrator.
// undefined/"default" -> the recommended single variant; "all" -> every variant;
// otherwise a comma-separated list of keys/folders.
function selectVariants(selector) {
  if (!selector || selector === 'default') return variants.filter((v) => v.default);
  if (selector === 'all') return variants.slice();
  const wanted = String(selector)
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const chosen = variants.filter(
    (v) => wanted.includes(v.key) || wanted.includes(v.folder)
  );
  if (!chosen.length) {
    const keys = variants.map((v) => v.key).join(', ');
    throw new Error(`Unknown Claude variant "${selector}". Options: ${keys}, all.`);
  }
  return chosen;
}

function setDescription(skillMdPath, description) {
  const content = readFileSync(skillMdPath, 'utf8');
  if (!/^description:.*$/m.test(content)) {
    throw new Error(`No description frontmatter found in ${skillMdPath}`);
  }
  writeFileSync(skillMdPath, content.replace(/^description:.*$/m, `description: ${description}`));
}

function addHook(variantDir, guardScriptPath) {
  const hooksDir = join(variantDir, 'hooks');
  const scriptsDir = join(variantDir, 'scripts');
  mkdirSync(hooksDir, { recursive: true });
  mkdirSync(scriptsDir, { recursive: true });
  cpSync(guardScriptPath, join(scriptsDir, 'hawksoft-guard.mjs'));

  const hooksJson = {
    description:
      'Remind the assistant to use the hawksoft-operations skill whenever HawkSoft is mentioned.',
    hooks: {
      UserPromptSubmit: [
        {
          hooks: [
            {
              type: 'command',
              command: 'node "${CLAUDE_PLUGIN_ROOT}/scripts/hawksoft-guard.mjs"'
            }
          ]
        }
      ]
    }
  };
  writeFileSync(join(hooksDir, 'hooks.json'), JSON.stringify(hooksJson, null, 2) + '\n');
}

function writeIndex(outDir, chosen) {
  const rows = chosen
    .map(
      (v) =>
        `## ${v.label}\n\n${v.blurb}\n\n` +
        'Install this folder:\n\n```text\n' +
        `claude --plugin-dir dist/claude/${v.folder}\n` +
        '```\n'
    )
    .join('\n');

  const built = chosen.map((v) => `\`${v.folder}\``).join(', ');
  const md =
    `# HawkSoft plugin (Claude)\n\n` +
    `Generated by \`npm run build\`. This run produced: ${built}. Each folder is a ` +
    `complete, installable copy of the HawkSoft plugin; they differ only in how ` +
    `eagerly the skill activates. Install exactly one.\n\n` +
    `Build other variants with \`npm run build:claude:all\` (all three), ` +
    `\`npm run build:claude:strict\`, or \`npm run build:claude:manual\`.\n\n${rows}\n` +
    `All variants expose \`/hawksoft:hawksoft-operations\` (and the other category ` +
    `commands) and the same procedures.\n`;

  writeFileSync(join(outDir, 'README.md'), md);
}

export function translate({ repoRoot, outDir, options = {} }) {
  const guardScript = join(repoRoot, 'scripts', 'hawksoft-guard.mjs');
  const chosen = selectVariants(options.variants);
  const summary = [];

  for (const v of chosen) {
    const variantDir = join(outDir, v.folder);
    mkdirSync(join(variantDir, '.claude-plugin'), { recursive: true });
    // A distributable plugin needs only plugin.json — not marketplace.json, which
    // is for the marketplace-add flow and would otherwise ride along in the folder.
    cpSync(
      join(repoRoot, '.claude-plugin', 'plugin.json'),
      join(variantDir, '.claude-plugin', 'plugin.json')
    );
    cpSync(join(repoRoot, 'skills'), join(variantDir, 'skills'), { recursive: true });
    setDescription(join(variantDir, skillRel), v.description);
    if (v.hook) addHook(variantDir, guardScript);

    summary.push(`${v.folder}  —  ${v.label}`);
    summary.push(`    install:  claude --plugin-dir dist/${meta.id}/${v.folder}`);
  }

  writeIndex(outDir, chosen);
  if (chosen.length > 1) {
    summary.push('see dist/claude/README.md for the comparison; install exactly one');
  } else {
    summary.push('build other activation variants with npm run build:claude:all / :strict / :manual');
  }
  return summary;
}
