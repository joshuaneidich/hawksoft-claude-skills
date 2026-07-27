# Log an Inbound Phone Call From an Insured

## Purpose

Document an inbound phone call from an insured in the correct HawkSoft client record.

This task is the **worked example** for the repository: every step below names the
exact on-screen option to click, and the [Optional additions](#optional-additions-perform-only-when-asked-or-required)
section shows how to document an optional item (adding a client tag) so the
assistant performs it only when it is actually wanted.

## HawkSoft screen path

Use this exact action path:

```text
Action → Phone → From → Insured → Log
```

The completed Create Log window shows this breadcrumb:

```text
Phone > From > Insured > Log
```

## Required information

Before beginning, obtain:

- The correct client record
- Caller name
- Confirmation that the caller is the insured or an authorized person
- Reason for the call
- Important facts communicated by the caller
- Action taken by the agency
- Any next step (responsible employee or due date, when known)
- Relevant policy, when applicable

If the user has not provided enough information to write an accurate note, ask for
the missing details before opening the Create Log editor.

## Procedure

### 1. Verify the client

Confirm that the correct HawkSoft client is open. Read and verify the client name,
the client type, and the mailing address or another available identifier. Do not
continue if the client record is uncertain.

### 2. Open the Action menu

On the client toolbar, select **Action**. The Action window opens with the prompt
**"Choose an action to perform."** and the list of communication methods (Phone,
Mail, Walkin, Chat, Fax, Email, Text, Online, Download, Internal).

### 3. Choose the communication method — Phone

Select **Phone**. The prompt changes to **"What started this action?"** and the
breadcrumb reads `Phone >`.

### 4. Choose the direction — From

Select **From**.

- **From** means the communication came *from* the other party *to* the agency —
  this is an **inbound** call.
- Do **not** select **To** for an inbound call (To is for calls the agency places).

The breadcrumb now reads `Phone > From >`.

![Action window: Phone, choosing From vs To](../screenshots/phone-log/01-action-direction.png)

### 5. Choose the party — Insured

The party list appears: **Insured, Carrier, Lien Holder, Escrow, Claimant, Law
Enforcement, Other, Certificate Holder, Mortgagee.**

Select **Insured** when the caller is the insured or an authorized insured contact.

If the caller is a carrier, lien holder, escrow, claimant, law enforcement,
certificate holder, mortgagee, or another party, stop and select that party instead
— do not assume Insured. (If the caller's relationship is unclear, ask before
choosing.)

The breadcrumb now reads `Phone > From > Insured >`.

![Action window: Phone > From > party list](../screenshots/phone-log/02-phone-from-party.png)

### 6. Choose the action — Log

The action list appears: **Change Client, Claims, Log, Trust Accounting, Scan,
Print/Create, Send Email, ACORD Forms, Insert Policy, Done.**

Select **Log**. This opens the **Create Log** editor.

![Action window: Phone > From > Insured > action list](../screenshots/phone-log/03-insured-action-list.png)

### 7. Confirm the Create Log window

Before typing, confirm the Create Log window shows:

- The **date, time, and your user initials** (e.g. `07/27/2026 10:01 AM  JBN`)
- The breadcrumb **`Phone > From > Insured > Log`**

If the breadcrumb does not match, use **< Back** to correct the earlier selections.

![Create Log window](../screenshots/phone-log/04-create-log.png)

### 8. Write the phone note

Type the note in the editor on the left, following the agency standards in
`../references/phone-log-standards.md`. The note should normally cover:

1. Who called
2. Why the person called
3. Important facts or requests
4. What the agency communicated or completed
5. What happens next

Do not invent facts or fill gaps with assumptions.

### 9. Add activity tags when applicable

On the right side of the Create Log window, under **Add Activity Tags**, select the
tags that accurately describe the interaction. You can browse the list or use the
search box (**Click to search** / `ALT-A`). Tags are grouped (for example
`AutoShop >`) and include entries such as AOR, Billing, Bind/Bound, Cancel Request,
Cancellation, Claim, Coverage, Declaration Page, Documents Request, Endorsement, ID
Cards, Information Update.

Add only tags that fit the call. Do not add unrelated tags to fill the screen.

> **Activity tags vs. client tags:** *Activity tags* (this panel) describe **this
> log entry**. A *client tag* (next section) is a flag on the **whole client** and
> is a separate, optional action.

## Optional additions (perform only when asked or required)

These steps are **optional**. Do them only when the user explicitly asks, or when an
agency standard requires them for this kind of interaction. If neither applies, skip
this section and continue to [Review before saving](#10-review-before-saving).

### Optional: Add a client tag

Use this when the user wants to flag the client (for example, a billing or
retention flag) as part of the same interaction.

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
window to create a suspense/task, then set the assignee and due date. (Document the
Add Task dialog's fields as its own optional step once its screen is captured.)

## 10. Review before saving

Confirm:

- Correct client
- Correct breadcrumb (`Phone > From > Insured > Log`)
- Correct caller and relationship
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
- The caller's relationship is unclear.
- The Action window options do not match this procedure.
- The breadcrumb is incorrect.
- The user has not supplied enough facts.
- A required client-tag Category or Reason is unknown.
- HawkSoft displays an error.
- **Save Log** does not close the editor.
- The new entry does not appear in the Logs section.

Do not repeatedly select **Save Log** when HawkSoft appears unresponsive.
