# Log a walk-in

## Purpose

Document an in-person walk-in visit in the correct client record.

## Screen path

Use this exact action path:

Action → Walkin → Insured → Log

## Required information

Before beginning, obtain:

- The correct client record
- Who visited
- Reason for the visit
- Action taken or outcome

If the user has not provided enough information, ask for the missing details before starting.

## Procedure

### 1. Open and verify the correct client

The correct client must be open and verified before anything else. Follow
`../references/find-and-open-a-client.md`:

**Decision — is the correct client already open and verified?**

- **Yes** → continue to the next step.
- **No / unsure** → open it via **Search** (one match → open and verify; multiple →
  narrow, then ask if still unclear; no match → stop, creating a client is a separate
  task). Verify name + address/DOB before continuing.

Do not continue on an uncertain client.

### 2. Open the Action menu

On the client record, click **Action** to open the action list. (Fill in: exact location of the Action button for your layout.)

### 3. Choose Walkin → Insured

(Fill in the exact click-through: which button/menu you select and what appears next. Replace this placeholder once verified against the real HawkSoft screen.)

### 4. Enter the visit summary and outcome

(Fill in the exact click-through: which button/menu you select and what appears next. Replace this placeholder once verified against the real HawkSoft screen.)

### 5. Review before saving

Before any final action, confirm:

- The correct record is open
- The entered information is accurate and complete
- No sensitive information is included
- Any next step is clear

During development, pause here. Show the proposed action to the user and ask for approval before selecting a final button such as **Save**.

### 6. Save and verify

After the user approves, complete the save, wait for the screen to update, and confirm that the entry appears as expected. Report completion to the user.

## Failure handling

Stop and report the problem when:

- The correct record cannot be verified.
- The visible interface does not match this procedure.
- The user has not supplied enough information.
- The application displays an error.
