# HawkSoft Agent Guidance

This repository contains HawkSoft workflow guidance for agentic AI. It is intentionally split into reusable HawkSoft business procedures and Claude-specific plugin packaging.

The goal is to help an assistant guide or perform approved HawkSoft procedures such as logging phone notes, finding customers, opening policies, creating tasks, attaching documents, and documenting client conversations.

## Source-of-truth files

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Source of truth for agents editing this repository. It contains editing rules, safety guardrails, validation steps, and the requirement to review diffs before committing. |
| `CLAUDE.md` | Claude-facing pointer file. It intentionally points Claude back to `AGENTS.md` instead of duplicating repository instructions. |
| `README.md` | Human-facing guide to the project structure, local Claude testing, where to add files, and how skills/workflows relate. |

If an instruction is for every agent editing this repository, put it in `AGENTS.md`. If it is for humans using or extending the package, put it in this README.

## Current folder structure

```text
hawksoft-agent-guidance/
  README.md
  AGENTS.md
  CLAUDE.md
  package.json
  package-lock.json

  docs/
    concepts.md
    file-layout.md
    local-install.md

  workflows/
    phone-notes/
      log-phone-note-from-insured.md
    customers/
      find-customer.md
    policies/
      open-policy.md

  skills/
    hawksoft-operations/
      SKILL.md
      references/
        phone-notes.md
        navigation.md
        safety.md
      screenshots/
        phone-log/

  plugins/
    claude/
      .claude-plugin/
        plugin.json
      skills/
        hawksoft-operations/
          SKILL.md
          tasks/
            log-inbound-phone-call.md
          references/
            phone-log-standards.md
          screenshots/
            phone-log/

  agents/
    generic/
      hawksoft-agent-instructions.md
    openai/
      hawksoft-agent-instructions.md
    claude/
      hawksoft-agent-instructions.md

  scripts/
    validate-json.mjs
    validate-skills.mjs
```

Git does not track empty directories, so intentionally empty screenshot folders contain `.gitkeep` placeholder files. When you add real screenshots, you can keep the placeholder or remove it after another file exists in that folder.

## What each file and folder is for

| Path | Purpose |
| --- | --- |
| `docs/` | Human-readable design notes. Use this for explanations that are helpful to maintainers but not necessarily loaded by an AI skill at runtime. |
| `docs/concepts.md` | Short glossary of the main concepts: workflow, task file, skill, reference, and plugin adapter. |
| `docs/file-layout.md` | Explanation of the repository layers and why the project is separated into workflows, skills, plugins, and agent adapters. |
| `docs/local-install.md` | Local Claude Code testing notes, including the current `claude --plugin-dir .\\plugins\\claude` command. |
| `workflows/` | Vendor-neutral HawkSoft business procedures. These are the durable “how the agency does the work” files and should be useful beyond Claude. |
| `workflows/phone-notes/log-phone-note-from-insured.md` | Canonical workflow for documenting an inbound phone call from an insured. |
| `workflows/customers/find-customer.md` | Placeholder for a future customer lookup and verification workflow. |
| `workflows/policies/open-policy.md` | Placeholder for a future policy-opening workflow. |
| `skills/` | Canonical agent-facing skills and references. This layer is not tied to one assistant vendor. |
| `skills/hawksoft-operations/SKILL.md` | Canonical HawkSoft Operations skill. It explains when the skill applies and which workflow/reference files to use. |
| `skills/hawksoft-operations/references/phone-notes.md` | Canonical phone-note writing standards. |
| `skills/hawksoft-operations/references/navigation.md` | Canonical navigation guidance for precise HawkSoft screen paths and mismatch handling. |
| `skills/hawksoft-operations/references/safety.md` | Canonical safety rules, especially client verification and pausing before final save/submit actions. |
| `plugins/claude/` | Claude-specific plugin adapter. This is the folder you point Claude Code at during local testing. |
| `plugins/claude/.claude-plugin/plugin.json` | Claude plugin manifest. Its `name` is `hawksoft`, which creates the `/hawksoft:` namespace. |
| `plugins/claude/skills/hawksoft-operations/SKILL.md` | Claude-packaged skill entry point. It mirrors the canonical skill but uses plugin-local paths that Claude can load at runtime. |
| `plugins/claude/skills/hawksoft-operations/tasks/` | Claude-packaged task files. These are included so the plugin works when loaded from `plugins/claude`. |
| `plugins/claude/skills/hawksoft-operations/references/` | Claude-packaged reference files used by the plugin skill. |
| `plugins/claude/skills/hawksoft-operations/screenshots/` | Claude-packaged screenshot folders for visual HawkSoft UI context. |
| `agents/` | Starter instruction files for non-plugin contexts. These are adapters for generic agents, OpenAI-based agents, and Claude prompts. |
| `agents/generic/hawksoft-agent-instructions.md` | Generic reusable HawkSoft agent instructions. |
| `agents/openai/hawksoft-agent-instructions.md` | OpenAI-oriented starting point for porting this guidance into an OpenAI assistant, Codex skill, or custom agent. |
| `agents/claude/hawksoft-agent-instructions.md` | Claude-oriented starting point for using the Claude plugin adapter. |
| `.claude-plugin/marketplace.json` | Optional top-level Claude marketplace metadata. It has an owner and points the marketplace plugin source to `./plugins/claude`. |
| `scripts/validate-json.mjs` | Validates plugin JSON and required marketplace fields such as `owner` and plugin `source`. |
| `scripts/validate-skills.mjs` | Validates that every discovered `SKILL.md` has required frontmatter. |
| `package.json` | Project metadata and npm scripts. `npm test` runs all validators. |
| `package-lock.json` | Locked npm dependency metadata. |

## Skill vs workflow vs task vs reference

A **workflow** is the real HawkSoft business process. Example: “log an inbound phone note from an insured.” Workflows belong under `workflows/` so they remain usable outside Claude.

A **task file** is the detailed written walkthrough for one workflow. In this project, most workflow files are task files: they contain required information, HawkSoft screen path, step-by-step actions, review checkpoints, save behavior, and failure handling.

A **skill** is not every individual HawkSoft procedure. The skill is the agent-facing entry point that says:

- when the HawkSoft capability applies;
- which workflow/task file to read;
- which reference files apply;
- what safety rules always apply;
- when to stop and ask the user.

A **reference** is reusable supporting material, such as phone-note writing standards, navigation rules, or safety guidance. Multiple workflows can use the same reference.

The intended pattern is:

```text
One broad skill: HawkSoft Operations
        ↓ routes to
Many workflow/task files: phone note, find customer, open policy, attach document
        ↓ use
Shared references: phone-note standards, navigation, safety, glossary
        ↓ optionally use
Screenshots: visual examples for specific HawkSoft screens
```

So: a workflow is not just a list of “what” items pointing to a separate skill for each “how.” Instead, a workflow usually is the detailed “how.” The broad skill is the router and guardrail layer.

## Local Claude Code development

The Claude plugin root is now:

```text
plugins/claude
```

Run this from the repo root in PowerShell:

```powershell
claude --plugin-dir .\plugins\claude
```

After Claude Code opens, run:

```text
/help
```

You should see:

```text
/hawksoft:hawksoft-operations
```

The namespace comes from:

- Plugin name in `plugins/claude/.claude-plugin/plugin.json`: `hawksoft`
- Skill folder under `plugins/claude/skills/`: `hawksoft-operations`
- Full command: `/hawksoft:hawksoft-operations`

When editing the plugin during a Claude Code session, run:

```text
/reload-plugins
```

## Testing guidance mode

Use this prompt in Claude Code:

```text
/hawksoft:hawksoft-operations Walk me through logging an inbound phone call from an insured.
```

Expected behavior:

1. Claude reads the plugin skill at `plugins/claude/skills/hawksoft-operations/SKILL.md`.
2. Claude recognizes the phone-note workflow.
3. Claude reads `tasks/log-inbound-phone-call.md` from inside the plugin skill folder.
4. Claude reads `references/phone-log-standards.md` from inside the plugin skill folder.
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

## How to add a new HawkSoft workflow

1. Add the vendor-neutral workflow under `workflows/<category>/<workflow-name>.md`.
2. Add or update shared standards under `skills/hawksoft-operations/references/`.
3. If Claude needs the workflow at plugin runtime, add a packaged copy under `plugins/claude/skills/hawksoft-operations/tasks/` or update the packaging approach.
4. Update `skills/hawksoft-operations/SKILL.md` so the canonical skill knows when to use the workflow.
5. Update `plugins/claude/skills/hawksoft-operations/SKILL.md` so Claude Code can route to its packaged copy.
6. Add screenshots under the relevant `screenshots/` folder when visual context helps.
7. Run `npm test`.

## Using with Claude Cowork or other computer-use environments

Claude Code local plugin loading is useful for testing file paths, task routing, and instructions.

For desktop app control, install or upload the Claude plugin or standalone skill into the environment that controls HawkSoft, then enable computer use and grant access only to the applications needed for testing.

Recommended testing flow:

```text
Edit canonical workflow/reference files
        ↓
Update Claude plugin packaged files
        ↓
Test with Claude Code --plugin-dir .\plugins\claude
        ↓
Install or upload the plugin/skill into the desktop computer-use environment
        ↓
Enable computer use
        ↓
Allow access to HawkSoft
        ↓
Test only on fabricated clients
```

## Screenshot guidance

Put canonical phone-log screenshots here:

```text
skills/hawksoft-operations/screenshots/phone-log/
```

Put Claude-packaged copies here when needed by the plugin:

```text
plugins/claude/skills/hawksoft-operations/screenshots/phone-log/
```

Recommended names:

```text
01-action-phone.png
02-create-log-window.png
03-phone-from.png
04-from-insured.png
05-insured-log.png
```

Do not include screenshots of the code editor unless they directly help an agent perform a HawkSoft workflow.
