# HawkSoft Agent Instructions

This file is the source of truth for agents working in this repository.

## Project purpose

This repository packages HawkSoft agency-management procedures so AI assistants can guide users through approved workflows and, where computer use is available, help perform those workflows safely.

The content should be useful in two layers:

1. Claude-specific packaging, including plugin metadata and `SKILL.md` files.
2. Vendor-neutral HawkSoft procedures, including task files, reference standards, and screenshots that another assistant can reuse outside Claude.

## Editing principles

- Keep vendor-neutral HawkSoft procedures under `workflows/` and canonical references under `skills/hawksoft-operations/references/`.
- Keep `SKILL.md` files focused on routing, safety rules, and when to read supporting files.
- Keep Claude-specific install, packaging, and namespace details under `plugins/claude/` and in user-facing README instructions; keep `plugins/` compatibility mirrors in sync when changing packaged Claude files.
- Do not put private customer, policy, claim, payment, or protected personal information in repository examples.
- Use fabricated test data in docs and examples.
- Preserve the final-save guardrail: agents must pause for user approval before clicking or instructing a final action such as `Save Log`, `Save`, `Submit`, `Bind`, `Cancel Policy`, or `Delete`.

## Skill and workflow terminology

- A skill is the agent-facing entry point. It tells the assistant when it applies, how to route requests, what safety rules to follow, and which supporting files to read.
- A task is a detailed workflow for one specific procedure, such as logging an inbound phone call from an insured.
- A reference file contains standards, templates, examples, terminology, or policy guidance used by one or more tasks.
- A screenshot is visual context for a task. It should illustrate HawkSoft screens, not the code editor.

## Current plugin command

The preferred local Claude plugin root is `plugins/claude/` because it directly contains both `.claude-plugin/` and `skills/`. A compatibility root remains at `plugins/`.

The current Claude Code command is:

```powershell
claude --plugin-dir .\plugins\claude
```

The current skill command is:

```text
/hawksoft:hawksoft-operations
```

## Validation and commit review

Before committing changes:

1. Run the validation suite:

   ```bash
   npm test
   ```

2. Review the staged or unstaged diff yourself before committing:

   ```bash
   git diff
   git diff --cached
   ```

3. Confirm the diff matches the user request and does not include accidental files such as `node_modules/`, private customer data, screenshots with real customer information, or unrelated formatting churn.

The validation suite checks plugin JSON and the required skill frontmatter/content. The manual diff review is mandatory before every commit.
