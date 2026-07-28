# Install the HawkSoft assistant (no terminal needed)

This guide is for agency staff. It uses the **Claude desktop app** — all clicks,
no commands. It takes about two minutes, and you only do it once.

## Before you start

- **Install the Claude desktop app** (Mac or Windows) from
  [claude.ai/download](https://claude.ai/download), open it, and sign in with your
  work Claude account.
- **Access to the HawkSoft plugin.** The plugin lives at
  `joshuaneidich/hawksoft-claude-skills` on GitHub. If that repository is private,
  ask your administrator to give you access first (or to install it for everyone —
  see [For administrators](#for-administrators) below). If it is public, you're
  ready.

## Install it (click-by-click)

1. In the Claude desktop app, click the **+** button next to the message box.
2. Choose **Plugins**.
3. Click **Add plugin** (or **Marketplaces → Add**).
4. When it asks for a marketplace, paste this exactly and confirm:

   ```text
   joshuaneidich/hawksoft-claude-skills
   ```

5. In the plugin list, find **hawksoft** and click **Install**.
6. Choose **Install for you**.
7. If prompted, click **Reload plugins** (or close and reopen the app).

That's it — the assistant is installed.

> Menu names can vary slightly between app versions. If you don't see **Plugins**
> under **+**, look for a **Plugins** or **Marketplaces** item in the app's settings
> menu — the steps are the same.

## Check that it worked

In the message box, type a forward slash and the word `hawksoft`:

```text
/hawksoft
```

You should see the HawkSoft commands appear, such as:

- `/hawksoft:hawksoft-operations`
- `/hawksoft:claims`
- `/hawksoft:policy-servicing`

If they appear, you're done. You can start by asking, for example, *"help me log an
inbound phone call from an insured."*

## Getting updates

When the plugin is updated, open **+ → Plugins**, find **hawksoft**, and click
**Update** (or **Reinstall**). Then **Reload plugins**.

## If something goes wrong

- **The `/hawksoft` commands don't appear** → open **+ → Plugins**, confirm
  **hawksoft** shows as *Installed*, then click **Reload plugins** or restart the
  app.
- **"Cannot access marketplace" / repository not found** → the repository is
  private and your account hasn't been granted access. Ask your administrator.
- **You use Claude only in a web browser (claude.ai)** → the plugin browser is in
  the **desktop app**, not the website. Install the desktop app, or ask your
  administrator to enable it for everyone (below).

## For administrators

If you manage a **Teams or Enterprise** workspace, you can enable this for all staff
so **no one has to install anything.** In
**claude.ai → Admin settings → Claude Code → Managed settings**, add:

```json
{
  "extraKnownMarketplaces": {
    "hawksoft-claude-skills": {
      "source": { "source": "github", "repo": "joshuaneidich/hawksoft-claude-skills" }
    }
  },
  "enabledPlugins": ["hawksoft@hawksoft-claude-skills"]
}
```

Save it, and every user in the workspace gets the HawkSoft assistant automatically
on their next session — including on claude.ai (web), where self-install is not
available. Make sure the workspace's accounts can reach the repository; if it is
private, grant the workspace access or use a public distribution repository.
