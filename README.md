# HawkSoft Claude Skills

This repository is a Claude Code plugin that teaches an AI assistant to guide, draft, or perform approved HawkSoft agency-management procedures — logging phone notes, documenting client conversations, creating tasks, attaching documents, and similar workflows.

**Start here:**

- Want to try the plugin locally? See [Quick start](#quick-start).
- Want to add a new procedure to the existing skill? See [Add a new task to an existing skill](#add-a-new-task-to-an-existing-skill).
- Want to create a brand-new skill? See [Create a new skill](#create-a-new-skill).

## Quick start

> **Requires a recent Claude Code.** The `--plugin-dir` flag only exists in newer releases. If you see `error: unknown option '--plugin-dir'`, your install is outdated: check `claude --version`, run `claude update` (or reinstall), and try again. If you cannot update, use the [marketplace install](#install-via-the-plugin-marketplace) below instead — it works from inside any Claude Code session.

From the repository root (any shell — PowerShell shown as the example):

```powershell
cd path\to\hawksoft-claude-skills
claude --plugin-dir .
```

After Claude Code opens, run `/help`. You should see the plugin skill:

```text
/hawksoft:hawksoft-operations
```

The command name comes from two places:

- `hawksoft` — the plugin name in `.claude-plugin/plugin.json`
- `hawksoft-operations` — the skill folder name under `skills/`

While editing files during a Claude Code session, run `/reload-plugins` to pick up changes. Before committing, run `npm test` to validate the plugin JSON and every skill.

### Install via the plugin marketplace

This repo is also a Claude plugin marketplace (that is what `.claude-plugin/marketplace.json` is for), so you can install it without the `--plugin-dir` flag. Start `claude` normally, then from the repository root:

```text
/plugin marketplace add .
/plugin install hawksoft@hawksoft-claude-skills
```

Or install straight from GitHub without cloning:

```text
/plugin marketplace add joshuaneidich/hawksoft-claude-skills
/plugin install hawksoft@hawksoft-claude-skills
```

To remove it later, run `/plugin uninstall hawksoft@hawksoft-claude-skills` and `/plugin marketplace remove hawksoft-claude-skills`.

Prefer `--plugin-dir` while actively developing: it loads the working copy for the session only, so file edits plus `/reload-plugins` take effect immediately without reinstalling.

## How the pieces fit together

Four words come up constantly in this repo. Here is what each one means:

| Term | What it is | Where it lives |
| --- | --- | --- |
| **Skill** | The front door. Tells Claude *when* to activate, what safety rules always apply, and which detailed file to read next. | `skills/<skill-name>/SKILL.md` |
| **Task** | A step-by-step walkthrough of *one* HawkSoft procedure — exact screen path, required info, where to pause. | `skills/<skill-name>/tasks/*.md` |
| **Reference** | Reusable standards shared by multiple tasks — note-writing style, navigation conventions, safety checklists. | `skills/<skill-name>/references/*.md` |
| **Workflow** | The real-world business procedure. Each workflow usually becomes one task file. | (concept, not a file) |

The pattern in practice:

```text
One broad skill: HawkSoft Operations
        ↓ routes to
Many detailed task files: log phone call, attach document, create task
        ↓ use
Reference files: note standards, navigation conventions, safety rules
        ↓ optionally use
Screenshots: visual examples of specific HawkSoft screens
```

Avoid creating one separate skill for every tiny HawkSoft action. Keep one broad skill as the front door and add task files behind it. Only create a new skill when a capability is genuinely a different domain (for example, a different application than HawkSoft, or a workflow with its own activation rules and safety posture).

## Repository layout

```text
hawksoft-claude-skills/
├── .claude-plugin/
│   ├── plugin.json          ← plugin manifest (defines the /hawksoft: namespace)
│   └── marketplace.json     ← lets this repo be added as a plugin marketplace
├── skills/
│   └── hawksoft-operations/ ← one folder per skill
│       ├── SKILL.md         ← skill entry point (required)
│       ├── tasks/           ← one file per HawkSoft procedure
│       ├── references/      ← shared standards and conventions
│       └── screenshots/     ← visual context, one subfolder per workflow
├── docs/
│   ├── concepts.md          ← plugin/skill/task/reference terminology in depth
│   ├── file-layout.md       ← why files live where they do
│   ├── local-install.md     ← local testing and marketplace install commands
│   └── porting/             ← vendor porting notes (Claude, OpenAI, generic)
├── scripts/                 ← validators run by `npm test`
├── AGENTS.md                ← source of truth for agents editing this repo
├── CLAUDE.md                ← short pointer that sends Claude to AGENTS.md
└── package.json             ← `npm test` runs the validators
```

The repository root is the plugin root because it directly contains both `.claude-plugin/` and `skills/`. There is exactly one copy of the skill content — vendor-specific porting notes in `docs/porting/` point other assistants at the same files rather than duplicating them.

Details on individual files:

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Source of truth for AI agents editing this repository: intent, guardrails, terminology, validation expectations. |
| `CLAUDE.md` | Claude-specific pointer to `AGENTS.md` so instructions do not drift in two places. |
| `.claude-plugin/plugin.json` | Plugin manifest. Its `name` field (`hawksoft`) creates the `/hawksoft:` command namespace. |
| `.claude-plugin/marketplace.json` | Marketplace metadata pointing the `hawksoft` plugin at the repository root. |
| `skills/hawksoft-operations/SKILL.md` | Skill entry point: when to activate, guidance vs. execution mode, task routing, guardrails. |
| `skills/hawksoft-operations/tasks/log-inbound-phone-call.md` | Workflow for logging an inbound call via `Action > Phone > From > Insured > Log`. |
| `skills/hawksoft-operations/references/phone-log-standards.md` | Phone-log writing style, examples, and "do not claim completion prematurely" rules. |
| `skills/hawksoft-operations/references/navigation.md` | Breadcrumb-style screen paths; stop when the interface differs from the procedure. |
| `skills/hawksoft-operations/references/safety.md` | Safety checklist applied before any save, submit, bind, cancel, or delete action. |
| `docs/concepts.md` | Deeper explanation of the plugin/skill/task/reference terminology. |
| `docs/file-layout.md` | Rationale for where files live (e.g. why porting notes are not in a root `agents/` folder). |
| `docs/local-install.md` | Canonical local-testing and marketplace-install instructions. |
| `docs/porting/` | Vendor-specific porting notes (Claude, OpenAI, generic) for reusing the skill content outside Claude. |
| `scripts/validate-json.mjs` | Parses required plugin JSON files so blank or invalid manifests are caught. |
| `scripts/validate-skills.mjs` | Verifies every skill folder has a valid `SKILL.md` and that every routed file exists. |

Note on empty folders: Git only tracks files, so intentionally empty screenshot folders contain `.gitkeep` placeholders. Once a folder has real screenshots, the `.gitkeep` can be removed. The phone-log task currently references two screenshots (`screenshots/phone-log/01-action-phone.png` and `02-create-log-window.png`) that have not been captured yet — this is expected: the task file tells the agent to continue without them, and the validator only requires referenced `.md` files to exist.

## Create a new skill

A skill is just a folder under `skills/` with a `SKILL.md` inside. Follow these steps:

**1. Create the folder.** The folder name becomes the command name, so keep it lowercase-with-hyphens:

```text
skills/<your-skill-name>/
```

This produces the command `/hawksoft:<your-skill-name>`.

**2. Create `SKILL.md`** in that folder. It must start with YAML frontmatter containing `name` and `description` — `npm test` fails without them:

```markdown
---
name: your-skill-name
description: One or two sentences saying what the skill does and when Claude should use it. Claude reads this to decide when to activate the skill, so mention the trigger words a user would actually say.
---

# Your Skill Title

Short statement of purpose and the safety posture.

## When to use this skill

Describe the requests that belong here.

## Task routing

| User asks about | Read this file |
| --- | --- |
| Doing X | ${CLAUDE_SKILL_DIR}/tasks/do-x.md |
```

Keep `SKILL.md` concise: when to activate, what guardrails always apply, and which file to read next. Detailed steps belong in task files, not in `SKILL.md`.

**3. Add supporting folders as needed:**

```text
skills/<your-skill-name>/
├── SKILL.md
├── tasks/          ← one file per procedure
├── references/     ← shared standards
└── screenshots/    ← one subfolder per workflow
```

**4. Route to files with `${CLAUDE_SKILL_DIR}`.** When `SKILL.md` tells Claude to read another file, reference it as `${CLAUDE_SKILL_DIR}/tasks/whatever.md`. The validator checks that every file referenced this way actually exists, so broken routing is caught by `npm test`.

**5. Validate and reload:**

```bash
npm test
```

Then in a running Claude Code session, `/reload-plugins` and confirm the new command appears in `/help`.

**6. Update the docs.** Add the skill to the layout section above and, if agents need new editing rules for it, to `AGENTS.md`.

## Add a new task to an existing skill

Most new HawkSoft procedures should be tasks inside `hawksoft-operations`, not new skills.

1. Create a task file under `skills/hawksoft-operations/tasks/`. A good task file includes:
   - Purpose
   - Required information (what to collect before starting)
   - Exact HawkSoft screen path (breadcrumb style, e.g. `Action > Phone > From > Insured > Log`)
   - Step-by-step procedure
   - Review-before-save checkpoint
   - Failure handling (what to do when the screen does not match)
2. Add any shared standards to `skills/hawksoft-operations/references/`.
3. Add screenshots under a workflow-specific folder in `skills/hawksoft-operations/screenshots/`.
4. Update the task-routing section in `skills/hawksoft-operations/SKILL.md` so Claude knows when to read the new files.
5. Run `npm test`.

Use `tasks/log-inbound-phone-call.md` as the model for structure and tone.

### Adding screenshots

Place screenshots in a per-workflow folder, numbered in the order the screens appear:

```text
skills/hawksoft-operations/screenshots/phone-log/
├── 01-action-phone.png
├── 02-create-log-window.png
```

Only include screenshots that directly help the agent perform a HawkSoft workflow.

## Testing the skill

### Guidance mode (explain the steps)

```text
/hawksoft:hawksoft-operations Walk me through logging an inbound phone call from an insured.
```

Expected behavior: Claude reads `SKILL.md`, routes to `tasks/log-inbound-phone-call.md` and `references/phone-log-standards.md`, gives the path `Action > Phone > From > Insured > Log`, and reminds you to review the note before selecting `Save Log`.

### Execution mode (perform the steps, fabricated client only)

Use fabricated or test-client data until the workflow is proven safe.

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

Claude should verify the client, follow `Action > Phone > From > Insured > Log`, propose the note, and pause before selecting `Save Log`.

### With Claude Cowork or other computer-use environments

Claude Code with `--plugin-dir` is for testing file paths, routing, and instructions. For actual desktop control, install the plugin or standalone skill into the environment that controls HawkSoft, enable computer use, and grant access only to the applications needed for testing:

```text
Edit plugin locally
        ↓
Test instructions with claude --plugin-dir .
        ↓
Install the plugin/skill into the desktop computer-use environment
        ↓
Enable computer use, allow access to HawkSoft
        ↓
Test only on fabricated clients
```

## Task roadmap

Documented:

- Log an inbound phone call from an insured

Planned (not yet written — the skill must not execute these until a task file exists):

- Find and verify a client
- Open a policy
- Attach documents
- Create a suspense/task
- Log an outbound call or voicemail

## Using this beyond Claude

HawkSoft procedures live in plain Markdown task and reference files so they stay portable. Claude-specific files only wrap the reusable procedures.

The skill itself follows the open [Agent Skills](https://code.claude.com/docs/en/skills) convention — a folder containing a `SKILL.md` with `name` and `description` frontmatter plus supporting files. Any tool that supports that convention can consume `skills/hawksoft-operations/` directly. One caveat: the `${CLAUDE_SKILL_DIR}` variable used in file references is Claude-specific; other consumers should read those references as paths relative to the skill folder.

Portable content:

- `skills/hawksoft-operations/tasks/*.md`
- `skills/hawksoft-operations/references/*.md`
- workflow screenshots

Claude-specific content:

- `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
- `skills/hawksoft-operations/SKILL.md` (the frontmatter format; the body is plain Markdown any agent can follow)

Vendor-specific porting notes live in `docs/porting/` (Claude, OpenAI, generic). If another AI tool does not support Claude plugins, copy the relevant task and reference files into that tool's instruction system and keep the same safety rules: verify the client, avoid unsupported facts, pause before save/submit actions, and test only with fabricated data first.

## Where instructions live

| File | Purpose |
| --- | --- |
| `README.md` | Human-facing guide (this file): layout, local testing, and how to add skills and tasks. |
| `AGENTS.md` | Source of truth for AI agents editing this repository. |
| `CLAUDE.md` | Short Claude-facing pointer to `AGENTS.md`. |

If an instruction should guide every AI agent working on this repository, put it in `AGENTS.md`. If it is a user-facing setup or usage explanation, put it here.
