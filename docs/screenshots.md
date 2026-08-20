# Screenshot capture checklist

Every screenshot referenced by a task must exist on disk — `npm test` fails on a
broken embed. A shot that is planned but not yet captured is recorded in the task
file as a comment marker instead:

```markdown
<!-- screenshot-pending: ../screenshots/phone-log/01-action-direction.png — Action window: Phone, choosing From vs To -->
```

This page lists every marker currently outstanding, so the captures can be taken in
one sitting.

## How to capture

1. Open HawkSoft on a **fabricated or test client**. Never capture a screen showing
   a real insured, policy number, claim, or payment detail.
2. Take the shot at the moment the task file describes — the window and breadcrumb
   named in the caption should both be visible.
3. Crop to the HawkSoft window. Do not include the desktop, other applications, or
   the code editor.
4. Save as PNG at the exact path in the marker.
5. Replace the marker with a real embed using the marker's own caption:

   ```markdown
   ![Action window: Phone, choosing From vs To](../screenshots/phone-log/01-action-direction.png)
   ```

6. Remove the folder's `.gitkeep` once it holds real files, then run `npm test`.
   The validator refuses to leave a marker in place for a file that now exists, so
   a forgotten swap is caught.

## Outstanding — `skills/hawksoft-operations/screenshots/phone-log/`

Shared by `tasks/log-inbound-phone-call.md` and
`tasks/log-an-outbound-phone-call.md`.

| File | Caption | Screen to capture |
| --- | --- | --- |
| `01-action-direction.png` | Action window: Phone, choosing From vs To | The Action window after selecting **Phone**, with **From** and **To** both visible |
| `02-phone-from-party.png` | Action window: Phone > From > party list | The party list (Insured, Carrier, Lien Holder, Escrow, Claimant, Law Enforcement, Other, Certificate Holder, Mortgagee) with the breadcrumb reading `Phone > From >` |
| `03-insured-action-list.png` | Action window: Phone > From > Insured > action list | The action list (Change Client, Claims, Log, Trust Accounting, Scan, Print/Create, Send Email, ACORD Forms, Insert Policy, Done) with the breadcrumb reading `Phone > From > Insured >` |
| `04-create-log.png` | Create Log window | The Create Log editor showing date, time, user initials, and the full breadcrumb |
| `05-add-client-tag.png` | Add Tag dialog (client tag) | The Add Tag dialog, including the "Show as an alert…" checkbox |

`02-phone-from-party.png` and `03-insured-action-list.png` are referenced only by
the inbound task; the other three are referenced by both.

## Not yet started — `skills/hawksoft-operations/screenshots/web-log/`

No task embeds a web-app screenshot yet. The **New Log** form on
`agents.hawksoft.app` (Channel, From/To, Entity, Activity Tags, User Note, Save New
Log) is the natural first capture, referenced from
`shared/references/web-logging.md`. Remember that a shared reference is copied into
every skill by `npm run sync:shared`, so any screenshot it embeds must exist in
every skill's `screenshots/` folder — prefer keeping web-app screenshots in the
task files that use them.
