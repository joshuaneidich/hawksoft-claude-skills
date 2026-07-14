# Log an Inbound Phone Call From an Insured

## Purpose

Document an inbound phone call from an insured in the correct HawkSoft client record.

## HawkSoft screen path

Use this exact action path:

Action → Phone → From → Insured → Log

The completed Create Log window should show this breadcrumb:

Phone > From > Insured > Log

## Required information

Before beginning, obtain:

- The correct client record
- Caller name
- Confirmation that the caller is the insured or authorized person
- Reason for the call
- Important facts communicated by the caller
- Action taken by the agency
- Any next step
- Any responsible employee or due date
- Relevant policy, when applicable

If the user has not provided enough information to write an accurate note, ask for the missing information before opening the Create Log editor.

## Procedure

### 1. Verify the client

Confirm that the correct HawkSoft client is open.

Read and verify:

- Client name
- Client type
- Mailing address or another available identifier

Do not continue if the client record is uncertain.

### 2. Open the Action workflow

In the HawkSoft toolbar, select:

**Action**

Use this screenshot for orientation:

![HawkSoft Action menu with Phone selected](../screenshots/phone-log/01-action-phone.png)

### 3. Select the communication method

In the Action window, select:

**Phone**

### 4. Select the direction

Select:

**From**

This indicates that the communication came from the other party to the agency.

Do not select **To** for an inbound call.

### 5. Select the person

Select:

**Insured**

Use this option when the caller is the insured or an authorized insured contact.

If the caller is a mortgage company, carrier, claimant, vendor, or another party, stop and select the appropriate party instead of assuming Insured.

### 6. Select the action result

Select:

**Log**

This opens the Create Log editor.

### 7. Verify the Create Log window

Before entering the note, confirm that the breadcrumb at the top reads:

**Phone > From > Insured > Log**

Use this screenshot for orientation:

![HawkSoft Create Log window](../screenshots/phone-log/02-create-log-window.png)

If the breadcrumb does not match, go back and correct the selected options.

### 8. Write the phone note

Use the agency phone-log standards in:

`../references/phone-log-standards.md`

The note should normally contain:

1. Who called
2. Why the person called
3. Important facts or requests
4. What the agency communicated or completed
5. What happens next

Do not invent facts or fill missing information with assumptions.

### 9. Add activity tags when applicable

Review the available Activity Tags on the right side of the Create Log window.

Add only tags that accurately describe the interaction.

Possible examples include:

- Billing
- Cancellation
- Claim
- Coverage
- Declaration Page
- Documents Request
- Endorsement
- ID Cards
- Information Update
- Inspection
- Lenders

Do not add unrelated tags merely to complete the screen.

### 10. Review before saving

Check:

- Correct client
- Correct breadcrumb
- Correct caller
- Correct facts
- Correct policy reference, if applicable
- Correct activity tags
- No sensitive information
- Clear next step

During development, pause here.

Show the complete proposed note and selected activity tags to the user.

Ask for approval before selecting **Save Log**.

### 11. Save the log

After the user approves:

1. Select **Save Log**.
2. Wait for the Create Log window to close.
3. Return to the client's Logs section.

### 12. Verify completion

Confirm that the new log appears in the client's log list.

Verify:

- Current date and time
- Correct user
- Phone communication type
- Correct note summary
- Relevant policy association, when applicable

Report completion to the user.

## Failure handling

Stop and report the problem when:

- The client cannot be verified.
- The caller's relationship is unclear.
- The Action menu does not match the procedure.
- The breadcrumb is incorrect.
- The user has not supplied enough facts.
- HawkSoft displays an error.
- Save Log does not close the editor.
- The new entry does not appear in the Logs section.

Do not repeatedly select Save Log when HawkSoft appears unresponsive.
