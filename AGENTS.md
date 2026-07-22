# HawkSoft Agent Instructions

This file is the source of truth for agents working in this repository.

## Project purpose

This repository packages HawkSoft agency-management procedures so AI assistants can guide users through approved workflows and, where computer use is available, help perform those workflows safely.

The content should be useful in two layers:

1. Claude-specific packaging, including plugin metadata and `SKILL.md` files.
2. Vendor-neutral HawkSoft procedures, including task files, reference standards, and screenshots that another assistant can reuse outside Claude.

## Editing principles

- Keep detailed HawkSoft procedures in task and reference files under `skills/hawksoft-operations/`.
- Keep `SKILL.md` focused on routing, safety rules, and when to read supporting files.
- Keep Claude-specific install and namespace details in plugin metadata and user-facing README instructions.
- Do not put private customer, policy, claim, payment, or protected personal information in repository examples.
- Use fabricated test data in docs and examples.
- Preserve the final-save guardrail: agents must pause for user approval before clicking or instructing a final action such as `Save Log`, `Save`, `Submit`, `Bind`, `Cancel Policy`, or `Delete`.

## Skill and workflow terminology

- A skill is the agent-facing entry point. It tells the assistant when it applies, how to route requests, what safety rules to follow, and which supporting files to read.
- A task is a detailed workflow for one specific procedure, such as logging an inbound phone call from an insured.
- A reference file contains standards, templates, examples, terminology, or policy guidance used by one or more tasks.
- A screenshot is visual context for a task. It should illustrate HawkSoft screens, not the code editor.

## Current plugin command

The repository root is the Claude plugin root because it directly contains both `.claude-plugin/` and `skills/`. There is exactly one copy of the skill; do not create per-vendor duplicate trees.

The current Claude Code command, run from the repository root, is:

```powershell
claude --plugin-dir .
```

This flag requires a recent Claude Code release; see `docs/local-install.md` for troubleshooting and the marketplace-based install alternative.

The current skill command is:

```text
/hawksoft:hawksoft-operations
```

## Scaffolding new skills and tasks

A browser-based builder is available for scaffolding:

```bash
npm run new-skill
```

It serves a local form (`scripts/skill-builder.mjs`, Node built-ins only) that
writes a new skill or a new task into `skills/` using the conventions above:
`SKILL.md` frontmatter, `${CLAUDE_SKILL_DIR}` routing, a per-workflow screenshot
folder, and a review-before-save checkpoint plus failure-handling section in
every task. It refuses to overwrite existing files. Generated content is a
starting point — review the wording and preserve the final-save guardrail before
relying on any procedure. Creating files by hand remains fully supported.

## Enforcement variants

`npm run build` (`scripts/build-variants.mjs`) generates three installable copies
of the plugin into `dist/` (gitignored) — `hawksoft-always-enforce`,
`hawksoft-soft-trigger`, and `hawksoft-manual` — that differ only in how eagerly
the skill activates. The strict variant bundles a `UserPromptSubmit` hook
(`scripts/hawksoft-guard.mjs`). The canonical source under `skills/` is the single
source of truth; the variants are derived from it at build time, so edit the
source, not `dist/`. See `docs/development.md` for details.

## Documentation split

User-facing usage lives in `README.md`. Contributor and technical documentation
(layout, concepts, the skill builder, the variant build, adding procedures) lives
in `docs/development.md`. Keep this file (`AGENTS.md`) as the agent source of
truth.

## Validation

Before committing changes, run:

```bash
npm test
```

This validates plugin JSON and the required skill frontmatter/content.
