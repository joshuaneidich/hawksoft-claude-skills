# Logging in the HawkSoft Web App (preferred route)

The web app at `https://agents.hawksoft.app/` has a **New Log** form that writes the
same log entry as the desktop `Action → Method → Direction → Party → Log` path, in
one screen instead of a five-step menu walk. **It is the preferred route for logging
tasks** — use it whenever it is available and the log is a plain log.

Everything else is unchanged: verify the client, never invent facts, and **pause for
approval before `Save New Log`**. `Save New Log` is a final action under the
final-save rule, exactly like `Save Log` on the desktop.

## Decision — which surface do I use?

- **Web app reachable and signed in, and this is a plain log** → use this reference
  and stop following the task's desktop steps.
- **The request needs something the New Log form does not offer** — a **client tag**,
  a **follow-up task / suspense**, or an association with a **specific policy** →
  use the task's desktop Action-menu steps instead. Do not split one interaction
  across both surfaces.
- **Web app not reachable, not signed in, or a sign-in prompt appears** → tell the
  user, then use the task's desktop steps. Never enter credentials.
- **The screen does not match what is described below** → **stop and ask the user.**
  Do not improvise a path through an unfamiliar screen.

## What the New Log form maps to

| New Log field | Desktop equivalent | Notes |
| --- | --- | --- |
| **Channel** | Starting Method | Phone, Mail, Walkin, Chat, Fax, Email, Text, Online, Download |
| **From/To** | Direction | `From` = the party contacted the agency (inbound); `To` = the agency reached out (outbound) |
| **Entity** | Party | Insured, Carrier, Lien Holder, Escrow, Claimant, Law Enforcement, Certificate Holder, Mortgagee, Other |
| **Activity Tags** (toggle) | Add Activity Tags panel | Off by default; turn it on only when tags apply |
| **User Note** | The Create Log note editor | Same note standards as a desktop log |
| **Save New Log** | Save Log | **Final action.** Requires user approval first |

The form has no client-tag control, no **+ Add Task**, and no policy selector. If the
interaction needs one of those, it belongs on the desktop.

## Procedure

### 1. Open the web app and confirm you are signed in

Go to `https://agents.hawksoft.app/`. If a sign-in screen appears, **stop** — report
it to the user and offer the desktop route. Do not enter credentials.

### 2. Find and open the correct client

From **Home**, search for the client using the most unique identifier you have —
policy number, phone number, or full name:

- **Exactly one match** → open it.
- **Multiple matches** → narrow by date of birth, mailing address, or policy number.
  If two or more remain indistinguishable → **stop and ask the user** which client is
  correct. Do not guess.
- **No match** → **stop.** The client may not exist, or may not be visible in the web
  app. Report this to the user; creating a client is a separate task and is not done
  here.

This replaces the desktop step in `find-and-open-a-client.md`; the verification
requirement below is the same.

### 3. Open New Log and verify the client on the page

Open **New Log** for that client. Before typing anything, confirm on the page:

- The breadcrumb reads `Home / Client <number> / New Log`.
- The client header shows the **name** and **mailing address** you expect.

Confirm at least two identifiers match what the user gave you (name plus address, date
of birth, or policy number). If verification fails → **stop and ask.** Never log
against an unverified client.

Captured screenshots of this form live in `../screenshots/web-log/`. If none is
available, continue with the written procedure.

### 4. Set Channel, From/To, and Entity

Select each from its dropdown so the three together describe the real interaction —
they are the same three choices the desktop Action menu asks for, in the same order:

- **Channel** — how the interaction happened. If none of the options matches, **stop
  and ask**; do not force a channel.
- **From/To** — `From` for inbound, `To` for outbound. If the direction is genuinely
  not applicable (some walk-ins), ask the user rather than picking one at random.
- **Entity** — who the interaction was with. If it is unclear, **stop and ask.** Do
  not assume Insured.

### 5. Add activity tags when they apply

Turn the **Activity Tags** toggle on and select the tags that accurately describe the
interaction. Add only tags that fit — do not add unrelated tags. If no tag fits, leave
the toggle off.

These are *activity* tags, describing this log entry. A *client* tag — a flag on the
whole client, such as "upset" — is not available on this form; that log belongs on the
desktop.

### 6. Write the User Note

Write the note in **User Note**, following the agency note standards in
`phone-log-standards.md` (bundled with the hawksoft-operations skill; the same
standards apply to every channel): who the interaction was with, why, what was said or
done, and what happens next. Do not invent facts, and keep full SSNs, full card
numbers, passwords, and security answers out of the note.

### 7. Review before saving

Confirm:

- Correct client (breadcrumb client number, name, and address)
- Correct **Channel / From-To / Entity**
- Accurate facts
- Appropriate activity tags
- No sensitive information
- A clear next step

**Pause here.** Show the user the proposed note and the three selections, and ask for
approval before selecting **Save New Log**.

### 8. Save and verify

After approval, select **Save New Log** once. Wait for the page to respond, then
confirm the new log appears in the client's logs with the right date, user, channel,
and summary. Report completion to the user.

## Failure handling

Stop and report the problem when:

- A sign-in prompt appears, or the app is unreachable.
- The client cannot be found or cannot be verified.
- The correct channel, direction, or entity is unclear.
- The form's fields do not match the table above.
- The user has not supplied enough facts to write an accurate note.
- The app displays an error, or the save does not produce a visible log entry.

Do not select **Save New Log** repeatedly when the app appears unresponsive, and do not
retry the same log on the desktop without first confirming with the user that nothing
was saved — that is how duplicate logs happen.
