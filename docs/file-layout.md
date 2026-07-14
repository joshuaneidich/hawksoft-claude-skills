# File Layout

The repository is organized into three layers:

1. Root files for project metadata and high-level documentation, plus `.claude-plugin/` manifests that make the repository root the Claude plugin.
2. `skills/` for the agent-facing skill: `SKILL.md` routing plus the task, reference, and screenshot files it reads. Task and reference files are plain Markdown so any assistant can reuse them.
3. `docs/porting/` for vendor-specific porting notes (Claude, OpenAI, generic) that point other assistants at the same skill files. These live under `docs/` rather than a root `agents/` directory because Claude Code treats a plugin-root `agents/` directory as subagent definitions.

There is exactly one copy of the skill. Do not create per-vendor duplicate trees; adapt via `docs/porting/` notes instead.

Use `.gitkeep` files only to preserve intentionally empty folders in Git.
