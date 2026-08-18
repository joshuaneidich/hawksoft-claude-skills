# Log an Outbound Phone Call to an Insured

## Purpose

Document an outbound call the agency placed to an insured in the correct HawkSoft
client record.

## HawkSoft screen path

Use this exact action path:

```text
Action → Phone → To → Insured → Log
```

The completed Create Log window shows this breadcrumb:

```text
Phone > To > Insured > Log
```

## Required information

Before beginning, obtain:

- The correct client record
- Who was called
- Reason for the call
- What was said / the outcome
- Any next step (responsible employee or due date, when known)
- Relevant policy, when applicable

If the user has not provided enough information to write an accurate note, ask for
the missing details before opening the Create Log editor.

## Before you start — choose the surface

Logging is faster in the HawkSoft web app, so it is the preferred route. Follow
`../references/web-logging.md`:

**Decision — is the web app (`agents.hawksoft.app`) available and signed in?**

- **Yes, and this is a plain log** → log it there. In **New Log**, this task's path
  becomes **Channel** = Phone, **From/To** = To, **Entity** = Insured. Follow `../references/web-logging.md`
  to the end — including the pause before **Save New Log** — and skip the desktop
  steps below.
- **Yes, but the request also needs a client tag, a follow-up task, or a specific
  policy association** → the New Log form has none of those. Use the desktop steps
  below.
- **No / not signed in / unsure** → use the desktop steps below.

## Procedure

### 1. Open and verify the correct client

The correct client must be open and verified before anything else. Follow
`../references/find-and-open-a-client.md`:

**Decision — is the correct client already open and verified?**

- **Yes** → continue to step 2.
- **No / unsure** → open it via **Search** first:
  - **Exactly one match** → open it, then verify name + address/DOB.
  - **Multiple matches** → narrow by DOB, address, or policy number; if still
    indistinguishable → **stop and ask the user.**
  - **No match** → **stop.** The client may not exist; creating one is a separate
    task. Report to the user — do not create a client here.

Do not continue on an uncertain client.

### 2. Open the Action menu

On the client toolbar, select **Action**. The Action window opens with the list of
communication methods (Phone, Mail, Walkin, Chat, Fax, Email, Text, Online,
Download, Internal).

### 3. Choose the communication method — Phone

Select **Phone**. The prompt changes to **"What started this action?"** and the
breadcrumb reads `Phone >`.

### 4. Choose the direction — To

Select **To**.

- **To** means the agency placed the call *to* the other party — this is an
  **outbound** call.
- Do **not** select **From** for an outbound call (From is for calls the agency
  receives).

The breadcrumb now reads `Phone > To >`.

<!-- screenshot-pending: ../screenshots/phone-log/01-action-direction.png — Action window: Phone, choosing From vs To -->

### 5. Choose the party — Insured

The party list appears: **Insured, Carrier, Lien Holder, Escrow, Claimant, Law
Enforcement, Other, Certificate Holder, Mortgagee.**

Select **Insured** when the call was to the insured or an authorized insured
contact. If you called a carrier, lien holder, mortgagee, or another party, select
that party instead — do not assume Insured. (If unclear, ask before choosing.)

The breadcrumb now reads `Phone > To > Insured >`.

### 6. Choose the action — Log

The action list appears: **Change Client, Claims, Log, Trust Accounting, Scan,
Print/Create, Send Email, ACORD Forms, Insert Policy, Done.**

Select **Log**. This opens the **Create Log** editor.

### 7. Confirm the Create Log window

Before typing, confirm the Create Log window shows:

- The **date, time, and your user initials**
- The breadcrumb **`Phone > To > Insured > Log`**

If the breadcrumb does not match, use **< Back** to correct the earlier selections.

<!-- screenshot-pending: ../screenshots/phone-log/04-create-log.png — Create Log window -->

### 8. Write the phone note

Type the note in the editor on the left, following the agency standards in
`../references/phone-log-standards.md`. The note should normally cover who you
called, why, what was said, and what happens next. Do not invent facts or fill gaps
with assumptions.

### 9. Add activity tags when applicable

On the right side of the Create Log window, under **Add Activity Tags**, select the
tags that accurately describe the call (browse or search with `ALT-A`). Add only
tags that fit; do not add unrelated tags to fill the screen.

> **Activity tags vs. client tags:** *Activity tags* (this panel) describe **this
> log entry**. A *client tag* (next section) is a flag on the **whole client** and
> is a separate, optional action.

## Optional additions (perform only when asked or required)

These steps are **optional** — do them only when the user explicitly asks, or when
an agency standard requires them. If neither applies, skip to
[Review before saving](#10-review-before-saving).

### Optional: Add a client tag

**When to do this — including automatically from the request.** Perform this step
whenever the user's wording names or implies a tag, not only when they ask in a
separate sentence. Treat phrasings like these as an explicit request to add a tag:

- "log the call and **tag** them as **upset**"
- "add a **billing** tag" / "**flag** this client for follow-up"

Also do it when an agency standard requires a client tag for this interaction. If
neither applies, skip this step.

**Interpreting the request.**

- **Client tag vs. activity tag:** if the value matches an **activity tag** (Billing,
  Cancellation, Bind/Bound, etc.), add it as an activity tag in step 9 instead. Use a
  **client tag** for client-level flags and sentiment (for example, "upset").
- Map the user's words onto the dialog: pick the **Category** that best fits and put
  the specifics in **Reason** (e.g. Reason: "Upset about premium increase").
- If the right **Category** is unclear or not in the list, **ask the user** before
  choosing — never invent a category.
- Doing this automatically does **not** skip approval: the tag is staged with the log
  and shown at [Review before saving](#10-review-before-saving); it commits on Save Log.

1. In the Create Log window, select **Add Client Tag** (bottom left). The **Add
   Tag** dialog opens.
2. Choose a **Category** from the dropdown. (If you do not know the correct
   category, ask the user — do not guess.)
3. Enter a **Reason** describing why the tag is being added.
4. Only if the user asks to restrict it, check **"Tag can only be edited / archived
   by current user"**. Leave it unchecked otherwise.
5. Select **OK** to return to the Create Log window.

`OK` only attaches the tag to this pending log — it is **not** the final save.
Include the proposed client tag (category and reason) in what you show the user at
[Review before saving](#10-review-before-saving); the tag is committed when the log
is saved.

<!-- screenshot-pending: ../screenshots/phone-log/05-add-client-tag.png — Add Tag dialog (client tag) -->

### Optional: Add a task (suspense)

Use this when the call requires a follow-up. Select **+ Add Task** in the Create Log
window, then set the assignee and due date.

## 10. Review before saving

Confirm:

- Correct client
- Correct breadcrumb (`Phone > To > Insured > Log`)
- Correct person called and reason
- Accurate facts and any policy reference
- Appropriate activity tags
- Any optional client tag or task the user approved
- No sensitive information
- A clear next step

During development, **pause here.** Show the complete proposed note, the selected
activity tags, and any optional client tag or task to the user, and ask for approval
before selecting **Save Log**.

## 11. Save the log

After the user approves:

1. Select **Save Log**.
2. Wait for the Create Log window to close.
3. Return to the client's Logs section.

## 12. Verify completion

Confirm the new log appears in the client's log list, with the current date and
time, the correct user, the phone communication type, the correct note summary, and
any relevant policy association. Report completion to the user.

## Failure handling

Stop and report the problem when:

- The client cannot be verified.
- The person's relationship is unclear.
- The Action window options do not match this procedure.
- The breadcrumb is incorrect.
- The user has not supplied enough facts.
- A required client-tag Category or Reason is unknown.
- HawkSoft displays an error.
- **Save Log** does not close the editor.
- The new entry does not appear in the Logs section.

Do not repeatedly select **Save Log** when HawkSoft appears unresponsive.
