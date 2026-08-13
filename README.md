# HawkSoft Claude Skills

A Claude Code plugin that teaches an AI assistant to guide, draft, or perform
approved HawkSoft agency-management procedures — logging phone notes, documenting
client conversations, and similar workflows. It follows agency-approved steps and
always pauses for your approval before any final save.

> **Just want to use it?** You're in the right place. If you want to add
> procedures, build the plugin, or understand how it's put together, see the
> [Development & technical guide](docs/development.md).

## Install

> **Agency staff / non-technical users:** follow
> **[Install for users](docs/install-for-users.md)** — a click-by-click guide for
> the Claude desktop app, no terminal required. The options below are for
> developers and administrators.

> **Requires a recent Claude Code.** The `--plugin-dir` flag only exists in newer
> releases. If you see `error: unknown option '--plugin-dir'`, run
> `claude update` (or use the marketplace option below, which works in any
> session).

**Option A — try it for one session (no install):**

```powershell
cd path\to\hawksoft-claude-skills
claude --plugin-dir .
```

**Option B — install it persistently from GitHub (no clone needed):**

```text
/plugin marketplace add joshuaneidich/hawksoft-claude-skills
/plugin install hawksoft@hawksoft-claude-skills
```

To remove it later: `/plugin uninstall hawksoft@hawksoft-claude-skills` and
`/plugin marketplace remove hawksoft-claude-skills`.

## Verify it loaded

Run `/help`. You should see the command:

```text
/hawksoft:hawksoft-operations
```

## Using the skill

**Ask how to do something (guidance):**

```text
/hawksoft:hawksoft-operations Walk me through logging an inbound phone call from an insured.
```

Claude explains the exact HawkSoft path (`Action > Phone > From > Insured > Log`),
lists what to collect first, and reminds you to review the note before saving.

**Ask Claude to do it (execution, computer-use environments only):**

```text
/hawksoft:hawksoft-operations

Log an inbound phone call on the currently open test client.
Caller: Test Neidich (named insured)
Reason: Confirming we received the signed application.
Action taken: Confirmed receipt; advised it is being reviewed.
Stop before selecting Save Log.
```

Claude verifies the client, follows the documented path, proposes the note, and
**pauses before any final Save** until you approve. Always test on fabricated or
test-client data first.

### Where logs get written

Logging runs on whichever surface is faster:

- **HawkSoft web app (`agents.hawksoft.app`) — preferred.** The **New Log** form takes
  the whole entry on one screen (Channel, From/To, Entity, Activity Tags, User Note),
  so Claude fills it in directly instead of walking the desktop Action menu.
- **HawkSoft desktop — the fallback**, used automatically when the web app is not open
  or signed in, and whenever the log needs something the New Log form does not have: a
  **client tag**, a **follow-up task**, or a **policy association**.

Either way Claude verifies the client first and pauses before **Save New Log** /
**Save Log**. It will never enter your credentials — if a sign-in screen appears, it
stops and tells you.

## Choose how assertively the skill activates

Different agencies want different behavior — some want Claude to *always* reach
for the HawkSoft skill, others want it only when asked by name. The default build
produces just the **recommended** variant; the others are separate build commands.

```bash
npm run build                 # default -> dist/claude/hawksoft/ (soft-trigger)
npm run build:claude:strict   # -> dist/claude/hawksoft-always-enforce/
npm run build:claude:manual   # -> dist/claude/hawksoft-manual/
npm run build:claude:all      # all three at once
```

| Build command | Folder | Behavior |
| --- | --- | --- |
| `npm run build` (default) | `dist/claude/hawksoft/` | **Recommended.** A strong description auto-activates the skill on HawkSoft requests; Claude still uses judgment. No hook. |
| `npm run build:claude:strict` | `dist/claude/hawksoft-always-enforce/` | **Strict.** A bundled hook makes Claude route through the skill *every time* HawkSoft is mentioned. Closest to "always." |
| `npm run build:claude:manual` | `dist/claude/hawksoft-manual/` | **Manual.** The skill activates only when you run `/hawksoft:hawksoft-operations` explicitly. |

Each command produces a clean, single plugin folder (one `plugin.json`) — so it's
also the right thing to zip for a local plugin upload. Install one, e.g.:

```powershell
claude --plugin-dir dist\claude\hawksoft
```

Every variant exposes the same `/hawksoft:*` commands and the same procedures —
they differ only in how eagerly the skill engages. See
[`docs/development.md`](docs/development.md#vendor-builds-npm-run-build) for how the
builds work.

## Use it in ChatGPT

The same `npm run build` also produces **ChatGPT** bundles — one per skill, since
ChatGPT uploads one zip per skill. ChatGPT's Skills feature uses the same
`SKILL.md` format as this repo, so the port is faithful — no rewrite. After
building, each bundle is at `dist/chatgpt/<skill>/`; zip each folder and upload it
(ChatGPT Settings on Business/Enterprise/Edu workspaces, or `POST /v1/skills`).
Full steps and fallbacks (Projects, Custom GPTs) are in `dist/chatgpt/README.md`.
Build just these with `npm run build:chatgpt`.

## Safety posture

- Procedures are agency-approved; Claude will not invent an undocumented HawkSoft
  workflow.
- Claude pauses before any final **Save, Submit, Bind, Cancel, or Delete** and
  waits for your approval.
- Sensitive data (full SSNs, full card numbers, passwords) is kept out of notes.
- Test only with fabricated or test-client data until a workflow is proven.

## Learn more

- [Install for users](docs/install-for-users.md) — non-technical, click-by-click
  install via the Claude desktop app, plus the admin org-wide rollout.
- [Development & technical guide](docs/development.md) — repo layout, concepts,
  the interactive skill builder, the variant build, and how to add procedures.
- [Local install and testing](docs/local-install.md) — every install option in
  detail.
- [`AGENTS.md`](AGENTS.md) — source of truth for AI agents editing this repo.
