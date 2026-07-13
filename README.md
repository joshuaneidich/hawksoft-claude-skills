# HawkSoft Claude Skills

This repository contains local-development scaffolding for a HawkSoft Claude plugin and reusable agent instructions for HawkSoft workflows.

The goal is to help an AI assistant guide, draft, or perform approved HawkSoft procedures such as logging phone notes, documenting client conversations, creating tasks, and attaching documents.

## Current plugin layout

```text
hawksoft-claude-skills/
├── .claude-plugin/
│   └── marketplace.json
├── plugins/
│   ├── .claude-plugin/
│   │   └── plugin.json
│   └── skills/
│       └── hawksoft-operations/
│           ├── SKILL.md
│           ├── references/
│           │   └── phone-log-standards.md
│           ├── screenshots/
│           │   └── phone-log/
│           └── tasks/
│               └── log-inbound-phone-call.md
├── scripts/
├── package.json
└── package-lock.json
```

For local Claude Code development, the `plugins/` directory is the plugin root because it directly contains both `.claude-plugin/` and `skills/`.

## Local Claude Code development

From PowerShell on the development machine, run:

```powershell
cd "C:\Users\joshu\OneDrive\Desktop\Projects\hawksoft skills\hawksoft-claude-skills"
claude --plugin-dir .\plugins
```

After Claude Code opens, run:

```text
/help
```

You should see the plugin skill namespace:

```text
/hawksoft:hawksoft-operations
```

The namespace comes from `plugins/.claude-plugin/plugin.json`:

- Plugin name: `hawksoft`
- Skill folder: `hawksoft-operations`
- Full command: `/hawksoft:hawksoft-operations`

When editing the local plugin during a Claude Code session, run:

```text
/reload-plugins
```

## Testing guidance mode

Use this prompt in Claude Code:

```text
/hawksoft:hawksoft-operations Walk me through logging an inbound phone call from an insured.
```

Expected behavior:

1. Claude reads `SKILL.md`.
2. Claude recognizes the phone-log task.
3. Claude reads `tasks/log-inbound-phone-call.md`.
4. Claude reads `references/phone-log-standards.md`.
5. Claude provides the HawkSoft path: `Action > Phone > From > Insured > Log`.
6. Claude reminds the user to review the proposed note before selecting `Save Log`.

## Testing execution mode with a fabricated client

Use fabricated or test-client data until the workflow is proven safe.

Example prompt:

```text
/hawksoft:hawksoft-operations

Log an inbound phone call on the currently open test client.

Caller: Test Neidich
Relationship: Named insured
Reason: The customer called to confirm we received the signed application.
Action taken: I confirmed receipt and advised that the application is being reviewed.

Stop before selecting Save Log.
```

Expected note:

```text
Inbound call from Test Neidich, named insured. Customer called to confirm that we received the signed application. Confirmed receipt and advised that the application is being reviewed.
```

Expected HawkSoft path:

```text
Action > Phone > From > Insured > Log
```

Claude should verify the client, confirm the breadcrumb `Phone > From > Insured > Log`, enter or propose the note, and pause before selecting `Save Log`.

## Using with Claude Cowork or other computer-use environments

Claude Code local plugin loading is useful for testing file paths, task routing, and instructions.

For desktop app control, install or upload the plugin or standalone skill into the environment that controls HawkSoft, then enable computer use and grant access only to the applications needed for testing.

Recommended testing flow:

```text
Edit plugin in WebStorm
        ↓
Test instructions with Claude Code --plugin-dir
        ↓
Install or upload the plugin/skill into the desktop computer-use environment
        ↓
Enable computer use
        ↓
Allow access to HawkSoft
        ↓
Test only on fabricated clients
```

Use a prompt such as:

```text
Use the HawkSoft Operations skill.

On the currently open test client, log an inbound phone call from the insured.

Note details:
The customer called to confirm we received the signed application. I confirmed receipt and advised that the application is being reviewed.

Follow Action > Phone > From > Insured > Log.

Show me the proposed note and stop before clicking Save Log.
```

## Adding screenshots

Place screenshots for the phone-log workflow in:

```text
plugins/skills/hawksoft-operations/screenshots/phone-log/
```

Recommended names:

```text
01-action-phone.png
02-create-log-window.png
```

Additional useful screenshots would show:

- `Phone > From`
- `From > Insured`
- `Insured > Log`

Do not include screenshots of the code editor unless they directly help the agent perform a HawkSoft workflow.

## Adding a new HawkSoft task

1. Create a task file under `plugins/skills/hawksoft-operations/tasks/`.
2. Add any standards or reference material under `plugins/skills/hawksoft-operations/references/`.
3. Add any screenshots under a workflow-specific folder in `plugins/skills/hawksoft-operations/screenshots/`.
4. Update the task-routing section in `plugins/skills/hawksoft-operations/SKILL.md` so Claude knows when to read the new files.
5. Run `npm test`.

A good task file should include:

- Purpose
- Required information
- Exact HawkSoft screen path
- Step-by-step procedure
- Review-before-save checkpoint
- Failure handling

## Making this usable beyond Claude

Keep HawkSoft procedures in plain Markdown task and reference files so they are portable. Claude-specific files should only wrap the reusable procedures.

Portable content:

- `plugins/skills/hawksoft-operations/tasks/*.md`
- `plugins/skills/hawksoft-operations/references/*.md`
- workflow screenshots

Claude-specific content:

- `plugins/.claude-plugin/plugin.json`
- `plugins/skills/hawksoft-operations/SKILL.md`
- `.claude-plugin/marketplace.json`

If another AI tool does not support Claude plugins, copy the relevant task and reference files into that tool's instruction system and keep the same safety rules: verify the client, avoid unsupported facts, pause before save/submit actions, and test only with fabricated data first.
