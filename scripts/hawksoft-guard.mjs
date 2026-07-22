#!/usr/bin/env node
// UserPromptSubmit guard for the "always-enforce" HawkSoft variant.
//
// This runs as a bundled plugin hook. When the user's prompt mentions HawkSoft,
// it injects a reminder so the assistant routes through the hawksoft-operations
// skill and honors its safety rules — turning the skill's soft auto-trigger into
// a deterministic one. When HawkSoft is not mentioned, it stays silent.
//
// It is copied into dist/claude/hawksoft-always-enforce/scripts/ by the Claude
// translation (scripts/translations/claude.mjs) and referenced from that variant's
// hooks/hooks.json via ${CLAUDE_PLUGIN_ROOT}.

import { stdin } from 'node:process';

let raw = '';
stdin.setEncoding('utf8');
stdin.on('data', (chunk) => {
  raw += chunk;
});
stdin.on('end', () => {
  let prompt = '';
  try {
    prompt = JSON.parse(raw || '{}').prompt || '';
  } catch {
    // If stdin was not JSON, fall back to treating it as the raw prompt text.
    prompt = raw;
  }

  if (!/hawksoft/i.test(prompt)) {
    process.exit(0);
  }

  const reminder =
    'HawkSoft was mentioned. Before responding, use the hawksoft-operations skill: ' +
    'follow its documented task procedures, verify the correct client, do not invent ' +
    'undocumented workflows, and pause for user approval before any final Save, Submit, ' +
    'Bind, Cancel, or Delete action.';

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: reminder
      }
    })
  );
  process.exit(0);
});
