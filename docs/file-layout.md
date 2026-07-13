# File Layout

The repository is organized into three layers:

1. Root files for project metadata and high-level documentation, plus `.claude-plugin/` manifests that make the repository root the Claude plugin.
2. `skills/` for the agent-facing skill: `SKILL.md` routing plus the task, reference, and screenshot files it reads. Task and reference files are plain Markdown so any assistant can reuse them.
3. `agents/` for vendor-specific porting notes (Claude, OpenAI, generic) that point other assistants at the same skill files.

There is exactly one copy of the skill. Do not create per-vendor duplicate trees; adapt via `agents/` notes instead.

Use `.gitkeep` files only to preserve intentionally empty folders in Git.
