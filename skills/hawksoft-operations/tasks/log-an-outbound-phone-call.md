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

![Action window: Phone, choosing From vs To](../screenshots/phone-log/01-action-direction.png)

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

![Create Log window](../screenshots/phone-log/04-create-log.png)

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

Use this when the user wants to flag the client as part of the same interaction.

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

![Add Tag dialog (client tag)](../screenshots/phone-log/05-add-client-tag.png)

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
