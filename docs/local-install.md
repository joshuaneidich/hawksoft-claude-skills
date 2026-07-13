# Local Install and Testing

For local Claude Code development, the repository root is the plugin root. From the repository root run:

```powershell
claude --plugin-dir .
```

The command should expose:

```text
/hawksoft:hawksoft-operations
```

Use `/reload-plugins` after changing plugin files in an active Claude Code session.

The repository also works as a Claude plugin marketplace:

```text
/plugin marketplace add joshuaneidich/hawksoft-claude-skills
/plugin install hawksoft@hawksoft-claude-skills
```
