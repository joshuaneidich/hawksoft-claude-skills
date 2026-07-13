# Concepts

This project separates HawkSoft business knowledge from tool-specific packaging.

- **Workflow**: a real business process, such as logging an inbound phone note.
- **Task file**: the written step-by-step version of a workflow.
- **Skill**: the agent entry point that decides when to use HawkSoft guidance and which task/reference files to read.
- **Reference**: standards, templates, safety rules, navigation notes, or glossary material reused by multiple workflows.
- **Plugin manifest**: Claude-specific packaging (`.claude-plugin/`) that exposes the skill to Claude Code or Claude desktop-style environments. The repository root is the plugin.
