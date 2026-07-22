# HawkSoft Claude Skills

A Claude Code plugin that teaches an AI assistant to guide, draft, or perform
approved HawkSoft agency-management procedures — logging phone notes, documenting
client conversations, and similar workflows. It follows agency-approved steps and
always pauses for your approval before any final save.

> **Just want to use it?** You're in the right place. If you want to add
> procedures, build the plugin, or understand how it's put together, see the
> [Development & technical guide](docs/development.md).

## Install

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

## Choose how assertively the skill activates

Different agencies want different behavior — some want Claude to *always* reach
for the HawkSoft skill, others want it only when asked by name. Run the build to
generate three ready-to-install variants and pick the folder that matches:

```bash
npm run build
```

This writes three complete, installable copies to `dist/` and prints which folder
does what:

| Folder | Behavior |
| --- | --- |
| `dist/hawksoft-always-enforce/` | **Strict.** A bundled hook makes Claude route through the skill *every time* HawkSoft is mentioned. Closest to "always." |
| `dist/hawksoft-soft-trigger/` | **Recommended default.** A strong description auto-activates the skill on HawkSoft requests; Claude still uses judgment. No hook. |
| `dist/hawksoft-manual/` | **Manual.** The skill activates only when you run `/hawksoft:hawksoft-operations` explicitly. |

Install exactly one, e.g.:

```powershell
claude --plugin-dir dist\hawksoft-always-enforce
```

All three expose the same `/hawksoft:hawksoft-operations` command and the same
procedures — they differ only in how eagerly the skill engages. See
[`docs/development.md`](docs/development.md#enforcement-variants-npm-run-build) for
how the variants are built.

## Safety posture

- Procedures are agency-approved; Claude will not invent an undocumented HawkSoft
  workflow.
- Claude pauses before any final **Save, Submit, Bind, Cancel, or Delete** and
  waits for your approval.
- Sensitive data (full SSNs, full card numbers, passwords) is kept out of notes.
- Test only with fabricated or test-client data until a workflow is proven.

## Learn more

- [Development & technical guide](docs/development.md) — repo layout, concepts,
  the interactive skill builder, the variant build, and how to add procedures.
- [Local install and testing](docs/local-install.md) — every install option in
  detail.
- [`AGENTS.md`](AGENTS.md) — source of truth for AI agents editing this repo.
