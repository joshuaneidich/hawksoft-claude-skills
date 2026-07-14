# Claude HawkSoft Agent Instructions

For Claude Code local testing, load the plugin from the repository root:

```powershell
claude --plugin-dir .
```

Then invoke:

```text
/hawksoft:hawksoft-operations
```

The repository root is the plugin: `.claude-plugin/plugin.json` provides the `hawksoft` namespace and `skills/hawksoft-operations/` provides the skill.
