# Local Install and Testing

The repository root is the plugin root. There are two ways to load it into Claude Code.

## Option 1: session-only load (best for development)

From the repository root:

```powershell
claude --plugin-dir .
```

This requires a recent Claude Code release. If you see `error: unknown option '--plugin-dir'`, the installed Claude Code is outdated — check `claude --version`, run `claude update` (or reinstall), and try again. If updating is not possible, use Option 2, which works from inside any Claude Code session.

Use `/reload-plugins` after changing plugin files in an active session; edits take effect immediately without reinstalling.

## Option 2: install via the plugin marketplace

The repository doubles as a Claude plugin marketplace (`.claude-plugin/marketplace.json`). Start `claude` normally, then either add the local checkout (run from the repository root):

```text
/plugin marketplace add .
/plugin install hawksoft@hawksoft-claude-skills
```

or install straight from GitHub without cloning:

```text
/plugin marketplace add joshuaneidich/hawksoft-claude-skills
/plugin install hawksoft@hawksoft-claude-skills
```

To remove it later:

```text
/plugin uninstall hawksoft@hawksoft-claude-skills
/plugin marketplace remove hawksoft-claude-skills
```

## Verifying the install

Either way, `/help` should expose:

```text
/hawksoft:hawksoft-operations
```
