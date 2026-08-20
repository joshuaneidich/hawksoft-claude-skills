# Claude HawkSoft Agent Instructions

For Claude Code local testing, load the plugin from the repository root:

```powershell
claude --plugin-dir .
```

The flag requires a recent Claude Code release; see `docs/local-install.md` for troubleshooting and the marketplace-based install alternative.

Then invoke the skill that owns the request:

```text
/hawksoft:hawksoft-operations     logging and documenting client interactions
/hawksoft:policy-servicing        policy changes
/hawksoft:claims                  claims
/hawksoft:client-records          client record edits
/hawksoft:documents-and-forms     documents and ACORD forms
/hawksoft:billing-and-accounting  payments, invoices, trust accounting
```

The repository root is the plugin: `.claude-plugin/plugin.json` provides the `hawksoft` namespace and each folder under `skills/` provides one namespaced skill.
