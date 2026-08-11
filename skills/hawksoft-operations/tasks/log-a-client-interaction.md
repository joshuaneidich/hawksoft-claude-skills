# Log a Client Interaction (any method, direction, or party)

## Purpose

Document **any** client interaction in the correct HawkSoft client record — no
matter how it happened (the Starting Method), which way it went (Direction), or who
it was with (Party). This is the catch-all handoff: it covers every logging route
through the Action menu. Use a channel-specific task (for example
`log-inbound-phone-call.md`) when one fits; otherwise use this.

## HawkSoft screen path

Use this path, substituting the choices you make below:

```text
Action → <Starting Method> → <Direction> → <Party> → Log
```

## Required information

Before beginning, obtain:

- The correct client record
- How the interaction happened (the Starting Method)
- Which direction it went (From the party, or To the party)
- Who it was with (the Party)
- A summary of what was said or done
- Any next step (responsible employee or due date, when known)
- Relevant policy, when applicable

If the user has not provided enough to write an accurate note, ask before opening
the Create Log editor.

## Procedure

### 1. Open and verify the correct client

The correct client must be open and verified before anything else. Follow
`../references/find-and-open-a-client.md`:

**Decision — is the correct client already open and verified?**

- **Yes** → continue to step 2.
- **No / unsure** → open it via **Search** (one match → open and verify; multiple →
  narrow, then ask if still unclear; no match → stop, creating a client is a separate
  task). Verify name + address/DOB before continuing.

Do not continue on an uncertain client.

### 2. Open the Action menu and make the handoff

Open **Action**, then walk the menu using `../references/action-navigation.md`. Make
each choice from the on-screen list to match the real interaction:

**Decision — how did the interaction happen? (Starting Method)**

- **Phone · Mail · Walkin · Chat · Fax · Email · Text · Online · Download** → select
  the one that matches. If none matches, **stop and ask** — do not force a method.

**Decision — which direction? (Direction)**

- **From** → the party contacted the agency (inbound).
- **To** → the agency reached out to the party (outbound).
- Walk-ins and some methods may not prompt for direction; skip if not shown.

**Decision — who was it with? (Party)**

- **Insured · Carrier · Lien Holder · Escrow · Claimant · Law Enforcement ·
  Certificate Holder · Mortgagee · Other** → select the party that matches.
- If the party is unclear → **stop and ask.** Do not assume Insured.

Then select **Log** to open the Create Log editor. Confirm the breadcrumb reads
`<Method> > <Direction> > <Party> > Log` before continuing.

### 3. Write the note

Write the note in the Create Log editor, following
`../references/phone-log-standards.md` (the same standards apply to every channel):
who the interaction was with, why, what was said or done, and what happens next. Do
not invent facts.

### 4. Add activity tags when applicable

Under **Add Activity Tags**, select the tags that accurately describe the
interaction. Add only tags that fit.

## Optional additions (perform only when asked or required)

Optional — do only when the user asks, or an agency standard requires. Otherwise skip
to [Review before saving](#5-review-before-saving).

### Optional: Add a client tag

Perform whenever the user's wording names or implies a tag (e.g. "tag them as
upset"). In the Create Log window select **Add Client Tag**, choose a **Category**,
enter a **Reason** (ask if the category is unclear — do not guess), optionally
restrict it to the current user, and select **OK**. The tag is staged with the log
and commits on Save Log, so include it at review.

### Optional: Add a task (suspense)

If a follow-up is needed, select **+ Add Task** and set the assignee and due date.

## 5. Review before saving

Confirm: correct client; correct breadcrumb (method, direction, party); accurate
facts and any policy reference; appropriate activity tags; any approved client tag or
task; no sensitive information; a clear next step.

During development, **pause here.** Show the proposed note and selections to the user
and ask for approval before selecting **Save Log**.

## 6. Save and verify

After approval, select **Save Log**, wait for the window to close, and confirm the
new log appears in the client's Logs with the right date, user, method, and summary.
Report completion to the user.

## Failure handling

Stop and report the problem when:

- The client cannot be verified.
- The correct method, direction, or party is unclear.
- The Action menu options do not match this procedure.
- The user has not supplied enough facts.
- HawkSoft displays an error.
- **Save Log** does not close the editor, or the entry does not appear in the Logs.
