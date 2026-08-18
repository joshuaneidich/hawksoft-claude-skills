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
- Preserve the final-save guardrail: agents must pause for user approval before clicking or instructing a final action such as `Save Log`, `Save New Log` (web app), `Save`, `Submit`, `Bind`, `Cancel Policy`, or `Delete`.

## Skill and workflow terminology

- A skill is the agent-facing entry point. It tells the assistant when it applies, how to route requests, what safety rules to follow, and which supporting files to read.
- A task is a detailed workflow for one specific procedure, such as logging an inbound phone call from an insured.
- A reference file contains standards, templates, examples, terminology, or policy guidance used by one or more tasks.
- A screenshot is visual context for a task. It should illustrate HawkSoft screens, not the code editor.

Never embed a screenshot that has not been captured. `npm test` fails on any image
whose file is missing, because a broken embed ships broken visual guidance into the
execution path. For a planned-but-uncaptured shot, mark the step with a
`screenshot-pending` HTML comment naming the path and the caption — see
`docs/screenshots.md` for the exact form, the outstanding list, and the swap-back
rule the validator enforces once the file exists. The written procedure must stand
on its own either way; a screenshot clarifies a step, it is never the only source of
one.

## Authoring branching logic in tasks

Task files are prose, so express conditional flow as explicit decision blocks:

- Open a branch with a bold decision line: `**Decision — <question>?**`.
- Give one bullet per outcome: `- **<condition>** → <what to do>`.
- Use `→` for "then"; nest a numbered list under a bullet for a multi-step branch.
- End every decision with a terminal branch for the uncertain case —
  `→ stop and ask the user`, or `→ this is a separate task` — so no path is left
  undefined. This preserves the never-guess rule and the final-save guardrail.
- Keep cross-task jumps verbal (name the other task); do not inline another full
  procedure inside a branch.

Shared preconditions that branch — most commonly finding and opening the correct
client — live in a reference such as `references/find-and-open-a-client.md`, and a
task's first step points to it instead of repeating the logic. Because each skill is
bundled independently for non-Claude vendors, a shared reference must exist inside
each skill that links to it: the canonical copy lives in `shared/references/`, and
`npm run sync:shared` copies it into every `skills/<skill>/references/`. Edit the
canonical copy, then run the sync; `npm test` fails if any skill's copy has drifted.

## Two surfaces: web app and desktop

HawkSoft work happens on two surfaces, and tasks must say which one they use:

- **Web app (`agents.hawksoft.app`) — preferred for logging.** Its **New Log** form
  captures a whole log on one screen (Channel, From/To, Entity, Activity Tags, User
  Note, Save New Log). `shared/references/web-logging.md` is the single place that
  documents it — a shared reference, so `npm run sync:shared` copies it into every
  skill and any skill's logging task can link `../references/web-logging.md`. Tasks
  link it from a "Before you start — choose the surface" decision block instead of
  restating the procedure.
- **Desktop Action menu — the fallback**, and the only documented route for a client
  tag, a follow-up task/suspense, a policy association, and every non-logging
  procedure.

When editing a logging task, keep both surfaces in sync: the web mapping in its
decision block (`Channel` / `From/To` / `Entity`) must match the desktop path
(`Method → Direction → Party`) in the same file. Do not document a web screen that has
not been seen — the never-guess rule applies to the web app exactly as it does to the
desktop client, and the assistant must stop rather than improvise when the page does
not match.

Optional steps should be **self-triggering from the request.** When a task has an
optional action (adding a tag, creating a follow-up task), document how to detect it
from the user's wording — for example, "tag them as upset" means add the tag — so the
assistant performs it automatically when implied, maps the user's words onto the
dialog's fields, asks when a required field is ambiguous rather than inventing one,
and still surfaces the staged action for approval before the final save.

## Current plugin command

The repository root is the Claude plugin root because it directly contains both `.claude-plugin/` and `skills/`. There is exactly one copy of the skill; do not create per-vendor duplicate trees.

The current Claude Code command, run from the repository root, is:

```powershell
claude --plugin-dir .
```

This flag requires a recent Claude Code release; see `docs/local-install.md` for troubleshooting and the marketplace-based install alternative.

Each skill is namespaced by the plugin name, so the current commands are:

```text
/hawksoft:hawksoft-operations
/hawksoft:policy-servicing
/hawksoft:claims
/hawksoft:client-records
/hawksoft:documents-and-forms
/hawksoft:billing-and-accounting
```

## Scaffolding new skills and tasks

A skill here is a HawkSoft *category* with its own `/hawksoft:<name>` command and
routing; a task is one procedure inside a skill. Most additions are tasks under an
existing skill — create a new skill only for a distinct category that warrants its
own command and routing (for example claims or billing).

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

## Vendor builds

`npm run build` (`scripts/build.mjs`) turns the single source under `skills/` into
per-vendor deliverables, each in its own namespaced folder under `dist/`
(gitignored): `dist/claude/` (the native plugin; the default build emits only the
recommended `hawksoft/` variant, with `npm run build:claude:strict` /
`:manual` / `:all` for the `hawksoft-always-enforce` hook variant and
`hawksoft-manual`) and `dist/chatgpt/` (one ChatGPT Skill bundle per skill; ChatGPT
Skills use the same `SKILL.md` format, so only the Claude-specific routing is
adapted, and the module validates each bundle's output). Each Claude variant folder
carries only `plugin.json`, so it zips cleanly for a local plugin upload.

Each vendor is a translation module at `scripts/translations/<id>.mjs` exporting
`meta` and `translate(...)`, registered in `build.mjs`. Add a vendor by adding a
module and registering it. `skills/` is the single source of truth — edit it, not
`dist/`. Build one vendor with `npm run build:claude` / `npm run build:chatgpt`.
See `docs/development.md` for details.

## Documentation split

User-facing usage lives in `README.md`. Contributor and technical documentation
(layout, concepts, the skill builder, the variant build, adding procedures) lives
in `docs/development.md`. Keep this file (`AGENTS.md`) as the agent source of
truth.

## Skill boundaries

Each skill owns one HawkSoft category and its description must claim only that
category. `hawksoft-operations` owns **logging and documenting client
interactions**; policy changes, claims, client-record edits, documents/ACORD forms,
and payments belong to `policy-servicing`, `claims`, `client-records`,
`documents-and-forms`, and `billing-and-accounting`. A description that claims the
whole product ("use whenever HawkSoft is mentioned") wins requests that belong to a
sibling, so keep the verbs disjoint and keep the hand-off table in
`skills/hawksoft-operations/SKILL.md` current when a skill is added.

`skills/` is the single source of truth for triggering. The Claude build overrides a
skill description only for the `manual` variant; the auto-activating variants ship
the source description verbatim, so a narrowing done in `SKILL.md` cannot be
silently undone by the build.

## Validation

Before committing changes, run:

```bash
npm test
```

It checks plugin metadata (required manifest fields, semver, `package.json` /
`plugin.json` / marketplace-entry agreement, a `LICENSE` on disk), every skill
(frontmatter present, `name` matching the directory, every `${CLAUDE_SKILL_DIR}`
route and every local link and image target resolving, screenshot-pending markers
well-formed), and that no skill's shared-reference copy has drifted.

The same suite runs in CI on every push and pull request
(`.github/workflows/ci.yml`), together with `npm run build -- --all`. Installs track
the default branch directly, so anything merged is live for installed users
immediately — do not merge on red.
