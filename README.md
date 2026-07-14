# HawkSoft Claude Skills

This repository contains local-development scaffolding for a HawkSoft Claude plugin and reusable agent instructions for HawkSoft workflows.

The goal is to help an AI assistant guide, draft, or perform approved HawkSoft procedures such as logging phone notes, documenting client conversations, creating tasks, and attaching documents.


## Source-of-truth files

This repository now has two agent-instruction files at the root:

| File | Purpose |
| --- | --- |
| `AGENTS.md` | The source of truth for agents editing this repository. It defines the project purpose, editing principles, safety guardrails, terminology, current Claude plugin command, and validation command. |
| `CLAUDE.md` | A Claude-facing pointer file. It intentionally stays short and points Claude back to `AGENTS.md` so repository instructions do not drift in two places. |

If an instruction needs to guide every AI agent working in this repository, put it in `AGENTS.md`. If it is only a user-facing setup or usage explanation, put it in this README.

## What each tracked file and folder is for

| Path | Purpose |
| --- | --- |
| `README.md` | Human-facing guide. Use it to understand the repository layout, local Claude Code command, testing prompts, screenshot placement, how to add tasks, and how this can be reused outside Claude. |
| `AGENTS.md` | Agent-facing source of truth for future edits to this repository. It explains project intent, guardrails, terminology, and validation expectations. |
| `CLAUDE.md` | Claude-specific pointer that sends Claude to `AGENTS.md` instead of duplicating instructions. |
| `.claude-plugin/marketplace.json` | Marketplace metadata. It lets the repository be added as a Claude plugin marketplace and points the `hawksoft` plugin at the repository root. |
| `.claude-plugin/plugin.json` | Claude plugin manifest. The `name` field is `hawksoft`, which creates the `/hawksoft:` namespace. Because this sits at the repository root next to `skills/`, the repository itself is the plugin. |
| `skills/` | Folder containing skill folders bundled by the plugin. Each direct child folder is one skill. |
| `skills/hawksoft-operations/` | The current HawkSoft operations skill folder. This folder is what produces the `hawksoft-operations` part of `/hawksoft:hawksoft-operations`. |
| `skills/hawksoft-operations/SKILL.md` | The skill entry point. It should stay relatively concise and focus on when to use the skill, how to route tasks, what guardrails apply, and which supporting files to read. |
| `skills/hawksoft-operations/tasks/` | Detailed one-procedure task walkthroughs. A task is the “how to do this exact HawkSoft job” file. |
| `skills/hawksoft-operations/tasks/log-inbound-phone-call.md` | Detailed workflow for logging an inbound phone call from an insured using `Action > Phone > From > Insured > Log`. |
| `skills/hawksoft-operations/references/` | Standards and reusable background material shared by tasks. Reference files are not usually full workflows by themselves. |
| `skills/hawksoft-operations/references/phone-log-standards.md` | Phone-log writing style, examples, activity-tag guidance, and “do not claim completion prematurely” rules. |
| `skills/hawksoft-operations/references/navigation.md` | Navigation conventions: use exact breadcrumb-style screen paths and stop when the interface differs from the procedure. |
| `skills/hawksoft-operations/references/safety.md` | Safety checklist applied before any save, submit, bind, cancel, or delete action. |
| `skills/hawksoft-operations/screenshots/` | Visual context for workflows. This folder is tracked with placeholder files so the structure is present even before real screenshots are added. |
| `skills/hawksoft-operations/screenshots/phone-log/` | Screenshot folder for the phone-log workflow. Add `01-action-phone.png`, `02-create-log-window.png`, and later screenshots for `Phone > From`, `From > Insured`, and `Insured > Log`. |
| `agents/` | Vendor-specific porting notes (Claude, OpenAI, generic) that point other assistants at the same task and reference files. |
| `docs/` | Short supporting documents: concepts, file layout, and local install notes. |
| `scripts/validate-json.mjs` | Parses required plugin JSON files so blank or invalid manifests are caught. |
| `scripts/validate-skills.mjs` | Verifies every skill folder has a non-empty `SKILL.md` with required frontmatter. |
| `package.json` | Project metadata and npm scripts. `npm test` runs the validators. |
| `package-lock.json` | Locked npm dependency metadata for reproducible installs. |

## Skill, task, workflow, and reference: what is the difference?

A **skill** is the agent-facing entry point. It answers questions like:

- When should this capability activate?
- What kind of requests belong here?
- What safety rules always apply?
- Which detailed file should the agent read next?

In this repo, the skill is:

```text
skills/hawksoft-operations/SKILL.md
```

A **task** is a detailed workflow for one specific HawkSoft procedure. It answers questions like:

- What exact HawkSoft path should be followed?
- What information is required before starting?
- What are the step-by-step clicks or checks?
- Where should the agent pause for review?
- What should the agent do if the screen does not match?

In this repo, the first task is:

```text
skills/hawksoft-operations/tasks/log-inbound-phone-call.md
```

A **workflow** is the real-world business procedure. In practice, each workflow should usually become one task file. For example:

```text
Workflow: Log inbound phone call from insured
Task file: skills/hawksoft-operations/tasks/log-inbound-phone-call.md
Skill route: SKILL.md tells Claude to read that task when the user asks to log a call or phone note
```

So the workflow is not merely a list of “what” items and it is not usually a separate skill. The cleaner pattern is:

```text
One broad skill: HawkSoft Operations
        ↓ routes to
Many detailed task/workflow files: log phone call, attach document, create task, update client info
        ↓ use
Reference files: note standards, naming conventions, compliance rules, glossary
        ↓ optionally use
Screenshots: visual examples for specific HawkSoft screens
```

A **reference** is supporting material that can be reused by multiple tasks. For example, `phone-log-standards.md` explains how a good note should be written; the inbound-call task uses that standard, and future outbound-call or voicemail tasks could reuse it too.

This structure avoids creating one separate Claude skill for every tiny HawkSoft action. Instead, keep one `hawksoft-operations` skill as the front door, then add many task files behind it.

## Did the folder structure get pushed?

Git only tracks files, not empty folders. The committed structure includes folders that contain files, such as `tasks/` and `references/`. To make intentionally empty screenshot folders show up after clone, this repo uses `.gitkeep` placeholder files under screenshot directories.

When you add real screenshots later, keep the `.gitkeep` files or remove them after at least one real screenshot exists in the folder.

## Current plugin layout

```text
hawksoft-claude-skills/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/
│   └── hawksoft-operations/
│       ├── SKILL.md
│       ├── tasks/
│       │   └── log-inbound-phone-call.md
│       ├── references/
│       │   ├── navigation.md
│       │   ├── phone-log-standards.md
│       │   └── safety.md
│       └── screenshots/
│           └── phone-log/
├── agents/
│   ├── claude/
│   ├── generic/
│   └── openai/
├── docs/
├── scripts/
├── AGENTS.md
├── CLAUDE.md
├── package.json
└── package-lock.json
```

The repository root is the plugin root because it directly contains both `.claude-plugin/` and `skills/`. There is exactly one copy of the skill.

## Local Claude Code development

From PowerShell on the development machine, run:

```powershell
cd "C:\Users\joshu\OneDrive\Desktop\Projects\hawksoft skills\hawksoft-claude-skills"
claude --plugin-dir .
```

After Claude Code opens, run:

```text
/help
```

You should see the plugin skill namespace:

```text
/hawksoft:hawksoft-operations
```

The namespace comes from `.claude-plugin/plugin.json`:

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
skills/hawksoft-operations/screenshots/phone-log/
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

1. Create a task file under `skills/hawksoft-operations/tasks/`.
2. Add any standards or reference material under `skills/hawksoft-operations/references/`.
3. Add any screenshots under a workflow-specific folder in `skills/hawksoft-operations/screenshots/`.
4. Update the task-routing section in `skills/hawksoft-operations/SKILL.md` so Claude knows when to read the new files.
5. Run `npm test`.

A good task file should include:

- Purpose
- Required information
- Exact HawkSoft screen path
- Step-by-step procedure
- Review-before-save checkpoint
- Failure handling

## Task roadmap

Documented:

- Log an inbound phone call from an insured

Planned (not yet written — the skill must not execute these until a task file exists):

- Find and verify a client
- Open a policy
- Attach documents
- Create a suspense/task
- Log an outbound call or voicemail

## Making this usable beyond Claude

Keep HawkSoft procedures in plain Markdown task and reference files so they are portable. Claude-specific files should only wrap the reusable procedures.

Portable content:

- `skills/hawksoft-operations/tasks/*.md`
- `skills/hawksoft-operations/references/*.md`
- workflow screenshots

Claude-specific content:

- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `skills/hawksoft-operations/SKILL.md` (frontmatter format; the body is plain Markdown any agent can follow)

Vendor-specific porting notes live in `agents/`.

If another AI tool does not support Claude plugins, copy the relevant task and reference files into that tool's instruction system and keep the same safety rules: verify the client, avoid unsupported facts, pause before save/submit actions, and test only with fabricated data first.
