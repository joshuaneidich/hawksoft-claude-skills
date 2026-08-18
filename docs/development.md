# Development & Technical Guide

This guide is for people extending or maintaining the plugin: adding procedures,
building the enforcement variants, and understanding how the pieces fit. If you
only want to *use* the skill, see the [README](../README.md).

## How the pieces fit together

Four words come up constantly in this repo:

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

Avoid creating one separate skill for every tiny HawkSoft action. Keep one broad
skill as the front door and add task files behind it. Only create a new skill
when a capability is genuinely a different domain (a different application than
HawkSoft, or a workflow with its own activation rules and safety posture).

## Repository layout

```text
hawksoft-claude-skills/
├── .github/
│   └── workflows/ci.yml     ← runs `npm test` + the full build on every push/PR
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
│   ├── development.md        ← this file
│   ├── file-layout.md       ← why files live where they do
│   ├── local-install.md     ← local testing and marketplace install commands
│   ├── screenshots.md       ← outstanding screenshot captures and how to add one
│   └── porting/             ← vendor porting notes (Claude, OpenAI, generic)
├── scripts/
│   ├── validate-json.mjs    ← validates plugin metadata consistency (`npm test`)
│   ├── validate-skills.mjs  ← validates skill frontmatter, routing, links (`npm test`)
│   ├── skill-builder.mjs    ← interactive builder (`npm run new-skill`)
│   ├── build.mjs            ← vendor build orchestrator (`npm run build`)
│   ├── translations/        ← one module per vendor (claude.mjs, chatgpt.mjs)
│   └── hawksoft-guard.mjs   ← hook script bundled into Claude's strict variant
├── dist/                    ← build output, one folder per vendor (gitignored)
├── AGENTS.md                ← source of truth for agents editing this repo
├── CLAUDE.md                ← short pointer that sends Claude to AGENTS.md
├── LICENSE                  ← MIT
└── package.json             ← npm scripts (test, new-skill, build)
```

The repository root is the plugin root because it directly contains both
`.claude-plugin/` and `skills/`. There is exactly one copy of the skill content —
vendor-specific porting notes in `docs/porting/` point other assistants at the
same files rather than duplicating them.

## Local install and testing

Use `claude --plugin-dir .` from the repo root for session-only loading while
developing, and `/reload-plugins` to pick up file edits without reinstalling.
See [local-install.md](local-install.md) for every option, including marketplace
install.

Before committing, run:

```bash
npm test
```

It checks three things:

- **Plugin metadata** (`validate-json.mjs`) — the manifest carries the fields an
  install needs (`name`, `version`, `description`, `license`, `repository`,
  `homepage`), the version is semver and identical in `package.json`, a `LICENSE`
  exists, and any field the marketplace entry restates matches the manifest.
- **Skills** (`validate-skills.mjs`) — `SKILL.md` frontmatter is present and its
  `name` matches the directory (that pair is what makes `/hawksoft:<name>`
  resolve), every `${CLAUDE_SKILL_DIR}` route exists, and **every local link and
  image target in every skill markdown file resolves** — including screenshots.
- **Shared references** (`sync-shared.mjs --check`) — no skill's copy has drifted
  from `shared/references/`.

The same suite runs in GitHub Actions on every push and pull request
(`.github/workflows/ci.yml`), plus a full `npm run build -- --all` as a smoke
test. Installs track the default branch directly, so a red commit here is live for
every installed user — treat CI as the last gate before that.

## Releasing

`/plugin marketplace add` follows the default branch, so every merge ships. Tag
the commits that are known good so a version can be named and returned to:

```bash
# after merging to the default branch, with npm test green
git tag -a v1.2.0 -m "HawkSoft plugin 1.2.0"
git push origin v1.2.0
```

Keep the tag equal to the `version` in `.claude-plugin/plugin.json` — `npm test`
enforces that `package.json`, the manifest, and the marketplace entry already agree
on it, so the tag is the only remaining place it can drift. Bump the version in
`package.json` and `.claude-plugin/` (both files) in the same commit as the change
that warrants it: patch for wording and fixes, minor for a new task or skill, major
for a routing or safety change that alters how an installed plugin behaves.

To run a specific version rather than the tip, clone at the tag and load it
directly:

```powershell
git clone --branch v1.2.0 https://github.com/joshuaneidich/hawksoft-claude-skills
claude --plugin-dir hawksoft-claude-skills
```

## Interactive skill builder (`npm run new-skill`)

Rather than writing Markdown by hand, you can scaffold skills and tasks through a
small browser form:

```bash
npm run new-skill        # then open the printed http://127.0.0.1:4600 URL
```

It starts a local, zero-dependency Node server (`scripts/skill-builder.mjs`) and
writes files straight into `skills/`. It has two tabs:

**Create** — scaffold a new skill or task. In the form you:

1. **Pick what to create** — a task inside an existing skill (the default; the
   dropdown is populated from `skills/`), or a new HawkSoft category (a new skill
   with its own `/hawksoft:<name>` command). Most additions are tasks; create a new
   category only when the procedures deserve their own command and routing.
2. **Answer the questions** — for a new category, its name and description; then the
   task's title, purpose, screen path (breadcrumb, e.g.
   `Action → Phone → To → Insured → Log`), trigger phrases, required information,
   numbered steps, and any screenshots.
3. **Click "Create files."** It writes `SKILL.md`, the task file, and a screenshot
   folder, and adds the task to the skill's routing section. Screenshots you name
   here are recorded as `screenshot-pending` markers at the step they illustrate —
   never as embeds, which would fail `npm test` until the capture exists.

**Browse & edit** — see every skill and its files in a list, click any file to open
its Markdown in an editor, and **Save** it back. This is where you perfect the
step-by-step click-throughs in each task after scaffolding. Editing is limited to
Markdown files under `skills/` (path traversal and non-`.md` files are rejected),
and only files that already exist can be saved — use the Create tab to add new ones.

Every generated task automatically includes a **review-before-save checkpoint**
and a **failure-handling** section, so new skills keep the agency safety posture
by default. Use a different port with `npm run new-skill -- --port 5000`.

The builder only *scaffolds* — review the wording and capture the pending
screenshots (see [`screenshots.md`](screenshots.md)) before relying on the
procedure. It refuses to overwrite an existing
skill or task file. Creating files by hand (below) is fully supported too.

## The two surfaces (web app and desktop)

Logging has two possible surfaces, and the split is documented in exactly one place:
`shared/references/web-logging.md` (a [shared reference](#shared-references-sharedreferences),
copied into every skill as `references/web-logging.md`).

- The **HawkSoft web app** (`agents.hawksoft.app`) **New Log** form is the preferred
  route for logging — one screen (Channel, From/To, Entity, Activity Tags, User Note,
  Save New Log) instead of the desktop `Action → Method → Direction → Party → Log`
  walk. Its fields map 1:1 onto the desktop choices, so a task's web mapping and its
  desktop path must always agree.
- The **desktop Action menu** stays the fallback and the only documented route for a
  client tag, a follow-up task/suspense, a policy association, or any non-logging
  procedure.

Each logging task opens with a **"Before you start — choose the surface"** decision
block that names its web mapping and links the reference. When you add a logging task,
copy that block and fill in its `Channel` / `From/To` / `Entity` values; when you
change a task's desktop path, update the mapping in the same edit. Screenshots of the
web form live in `skills/hawksoft-operations/screenshots/web-log/`.

## Shared references (`shared/references/`)

Some references apply to every skill — most notably the branchy "find and open a
client" precondition that each task's step 1 links. A task can only link a reference
inside its own skill (each skill is bundled independently for non-Claude vendors), so
these live once in `shared/references/` and are copied into every
`skills/<skill>/references/`:

```bash
npm run sync:shared        # copy shared references into every skill
```

Edit the **canonical** copy under `shared/references/`, never the per-skill copies —
`npm test` runs `sync-shared.mjs --check` and fails if any skill's copy has drifted,
so run `npm run sync:shared` and commit the result after changing a shared reference.

## Vendor builds (`npm run build`)

The skills under `skills/` are the single source of truth. `npm run build`
(`scripts/build.mjs`) turns them into per-vendor deliverables, each in its own
namespaced folder under `dist/`:

```text
dist/
├── claude/     ← native plugin (default: the recommended variant; others on demand)
└── chatgpt/    ← one ChatGPT Skill bundle per skill (same SKILL.md format, routing adapted)
```

Each vendor is a **translation module** at `scripts/translations/<id>.mjs` that
exports `meta` (`id`, `label`) and `translate({ repoRoot, skillsRoot, outDir })`.
The orchestrator clears `dist/<id>/`, calls the module, and prints its summary.
Build everything with `npm run build`, or one vendor with `npm run build:claude` /
`npm run build:chatgpt` (or `node scripts/build.mjs <id>`). **Adding a vendor** is:
drop a `translations/<id>.mjs`, add it to the `registry` array in `build.mjs`.
`dist/` is gitignored — regenerate any time.

### Claude (`scripts/translations/claude.mjs`)

Claude is the source format, so this is packaging, not translation. Claude Code
has no install-time prompt for activation behavior, so it is baked into the build
as variants. You install exactly one, so the **default build produces only the
recommended variant** (`dist/claude/hawksoft/`); the others are separate commands:

| Build command | Folder | Hook | Behavior |
| --- | --- | --- | --- |
| `npm run build` / `npm run build:claude` | `dist/claude/hawksoft/` | — | Strong auto-trigger; Claude auto-activates on HawkSoft requests but still uses judgment. **Recommended default.** |
| `npm run build:claude:strict` | `dist/claude/hawksoft-always-enforce/` | ✅ `UserPromptSubmit` | Deterministic — reminds Claude to route through the skill whenever "HawkSoft" appears in a prompt. |
| `npm run build:claude:manual` | `dist/claude/hawksoft-manual/` | — | Restrictive; activates only on explicit `/hawksoft:hawksoft-operations`. |
| `npm run build:claude:all` | all three folders | mixed | Builds every variant at once. |

Under the hood these map to `node scripts/build.mjs claude [--variant strict|manual | --all]`.

- The two auto variants get a description that front-loads "HawkSoft" and widens
  the trigger surface. The manual variant tells Claude *not* to auto-activate on
  incidental mentions.
- The strict variant additionally bundles a hook. Plugins load hooks from a
  `hooks/hooks.json` at the plugin root; the entry runs
  `scripts/hawksoft-guard.mjs` (copied in from the repo) via
  `${CLAUDE_PLUGIN_ROOT}`. On each prompt the guard reads stdin, and if the prompt
  mentions HawkSoft it returns a `UserPromptSubmit` `additionalContext` reminder;
  otherwise it stays silent.
- Each variant folder is a clean single plugin — only `plugin.json` under
  `.claude-plugin/` (the repo's `marketplace.json` is for the marketplace-add flow
  and is not copied in), so a variant folder zips directly for a local plugin upload.

Install exactly one variant, e.g. `claude --plugin-dir dist/claude/hawksoft`.

### ChatGPT (`scripts/translations/chatgpt.mjs`)

ChatGPT's Skills feature uses the **same `SKILL.md` convention** as Claude — YAML
frontmatter (`name` + `description`) plus a Markdown body and optional bundled
resource folders, uploaded as a zip whose contents are a single top-level folder
(≤ 50 MB) via `POST /v1/skills` or the ChatGPT app (Business/Enterprise/Edu). So
the translation is faithful — it copies the skill folder and adapts only the
Claude-specific bits:

- `${CLAUDE_SKILL_DIR}/…` routing → paths relative to the skill root.
- The trailing `## Current request` / `$ARGUMENTS` block (a Claude plugin-command
  convention) is removed.
- The `.claude-plugin/` manifests are omitted.
- `tasks/` and `references/` are already plain Markdown with relative links, so
  they are copied unchanged.

Every skill under `skills/` becomes its own bundle (ChatGPT uploads one zip per
skill). The module then **validates** each bundle (frontmatter present, no leftover
`${CLAUDE_SKILL_DIR}` or `$ARGUMENTS`, every routed `.md` resolves) and throws if
anything is off, so the output cannot silently drift from the source. Output is
`dist/chatgpt/<skill>/` for each skill plus `dist/chatgpt/README.md` with zip/upload
steps and fallbacks (Projects, Custom GPTs) for workspaces without Skills.

### Verify the Claude strict variant

The description tuning is easy to eyeball, but the `always-enforce` hook only runs
inside a live Claude Code session — `npm test` and the build do not exercise it.
Before relying on strict enforcement, do this smoke test once:

1. **Check the guard script in isolation.** It should emit a reminder for a
   HawkSoft prompt and nothing for an unrelated one:

   ```bash
   echo '{"prompt":"log a call in HawkSoft"}' | node scripts/hawksoft-guard.mjs
   # → prints a JSON object with hookSpecificOutput.additionalContext

   echo '{"prompt":"what time is it?"}' | node scripts/hawksoft-guard.mjs
   # → prints nothing
   ```

2. **Build and install only the strict variant:**

   ```bash
   npm run build:claude:strict
   ```

   ```text
   claude --plugin-dir dist/claude/hawksoft-always-enforce
   ```

3. **Confirm the hook is registered.** In the session, run `/hooks` and verify a
   `UserPromptSubmit` entry pointing at `hawksoft-guard.mjs` appears. (If your
   Claude Code prompts to approve plugin hooks on first load, approve it.)

4. **Confirm it fires.** Send a prompt that mentions HawkSoft but does *not* name
   the skill — e.g. `I need to note a customer call in HawkSoft`. Claude should
   reach for `hawksoft-operations` and follow its procedure and safety rules.
   Then send an unrelated prompt and confirm the reminder does *not* appear.

If step 4 does not trigger, check that the plugin's hooks were approved, that
`node` is on `PATH` in that environment, and that `/hooks` shows the entry. The
soft-trigger and manual variants have no hook, so they need no such check — only
their description behavior.

## Create a new skill by hand

A skill is just a folder under `skills/` with a `SKILL.md` inside.

**1. Create the folder.** The folder name becomes the command name, so keep it
lowercase-with-hyphens:

```text
skills/<your-skill-name>/
```

This produces the command `/hawksoft:<your-skill-name>`.

**2. Create `SKILL.md`** with YAML frontmatter containing `name` and
`description` — `npm test` fails without them:

```markdown
---
name: your-skill-name
description: One or two sentences saying what the skill does and when Claude should use it. Mention the trigger words a user would actually say.
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

Keep `SKILL.md` concise: when to activate, what guardrails always apply, and which
file to read next. Detailed steps belong in task files.

**3. Add supporting folders as needed:** `tasks/`, `references/`, `screenshots/`.

**4. Route to files with `${CLAUDE_SKILL_DIR}`.** The validator checks that every
file referenced this way exists, so broken routing is caught by `npm test`.

**5. Validate and reload:** run `npm test`, then `/reload-plugins` in a session
and confirm the new command appears in `/help`.

**6. Update the docs** — add the skill to the layout above and, if agents need new
editing rules for it, to `AGENTS.md`.

## Add a task to an existing skill

Most new HawkSoft procedures should be tasks inside `hawksoft-operations`, not new
skills.

1. Create a task file under `skills/hawksoft-operations/tasks/`. A good task file
   includes: Purpose; Required information; the exact HawkSoft screen path
   (breadcrumb style, e.g. `Action > Phone > From > Insured > Log`); a numbered
   procedure; a review-before-save checkpoint; and failure handling.
2. Add any shared standards to `skills/hawksoft-operations/references/`.
3. Add screenshots under a workflow-specific folder in
   `skills/hawksoft-operations/screenshots/`.
4. Update the task-routing section in `skills/hawksoft-operations/SKILL.md`.
5. Run `npm test`.

Use `tasks/log-inbound-phone-call.md` as the model for structure and tone. The
[interactive builder](#interactive-skill-builder-npm-run-new-skill) does all of
this for you.

### Adding screenshots

Place screenshots in a per-workflow folder, numbered in the order the screens
appear:

```text
skills/hawksoft-operations/screenshots/phone-log/
├── 01-action-direction.png
├── 02-phone-from-party.png
```

Only include screenshots that directly help the agent perform a workflow. Git only
tracks files, so intentionally empty screenshot folders keep a `.gitkeep`
placeholder; remove it once real screenshots exist.

**Never embed a screenshot that has not been captured.** `npm test` fails on an
`![caption](path)` whose file is missing, because a broken embed ships broken
visual guidance into the execution path and nothing else catches it. For a shot
that is planned but not yet taken, mark the step instead:

```markdown
<!-- screenshot-pending: ../screenshots/phone-log/01-action-direction.png — Action window: Phone, choosing From vs To -->
```

The validator checks that the marker points inside the skill's `screenshots/`
folder and that the file really is still missing — once the capture lands, `npm
test` tells you to swap the marker for a real embed. The written procedure always
stands on its own; a screenshot is clarification, never the only source of a step.

The outstanding captures are tracked in
[`screenshots.md`](screenshots.md).

## Using this beyond Claude

HawkSoft procedures live in plain Markdown task and reference files so they stay
portable. The skill follows the open
[Agent Skills](https://code.claude.com/docs/en/skills) convention — a folder with
a `SKILL.md` (`name` + `description` frontmatter) plus supporting files. That
convention is now shared across tools: **ChatGPT's Skills feature uses the same
`SKILL.md` format**, which is why the ChatGPT translation is a faithful copy
rather than a rewrite. Run `npm run build:chatgpt` to produce an upload-ready
bundle (see the [ChatGPT build](#chatgpt-scriptstranslationschatgptmjs) above).

The one Claude-specific detail is the `${CLAUDE_SKILL_DIR}` routing variable; the
build rewrites it to relative paths for other consumers, and any tool reading the
source directly should treat those references as paths relative to the skill
folder.

Portable content: `skills/hawksoft-operations/tasks/*.md`,
`skills/hawksoft-operations/references/*.md`, and workflow screenshots.
Claude-specific content: the `.claude-plugin/` manifests and the `SKILL.md`
frontmatter format. Vendor-specific porting notes live in `docs/porting/` (Claude,
OpenAI, generic). If another tool does not support Claude plugins, copy the task
and reference files into that tool's instruction system and keep the same safety
rules: verify the client, avoid unsupported facts, pause before save/submit
actions, and test only with fabricated data first.

## Task roadmap

Documented:

- Log an inbound phone call from an insured

Planned (not yet written — the skill must not execute these until a task file
exists): find and verify a client; open a policy; attach documents; create a
suspense/task; log an outbound call or voicemail.

## Where instructions live

| File | Purpose |
| --- | --- |
| `README.md` | User-facing guide: install and use the skill. |
| `docs/development.md` | This file: extend, build, and maintain the plugin. |
| `AGENTS.md` | Source of truth for AI agents editing this repository. |
| `CLAUDE.md` | Short Claude-facing pointer to `AGENTS.md`. |

If an instruction should guide every AI agent working on this repository, put it
in `AGENTS.md`. If it is user-facing setup or usage, put it in `README.md`. If it
is contributor/technical documentation, put it here.
