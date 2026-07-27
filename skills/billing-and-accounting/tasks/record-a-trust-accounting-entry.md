# Record a trust-accounting entry

## Purpose

Record a trust-accounting transaction.

## Screen path

Use this exact action path:

Action → Internal → Trust Accounting

## Required information

Before beginning, obtain:

- The correct client record
- The transaction type
- Amount and date
- Account affected

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

### 3. Choose Internal → Trust Accounting

In the Action menu, select **Internal**, then **Trust Accounting**. (Fill in the exact click-through: which button/menu you select and what appears next. Replace this placeholder once verified against the real HawkSoft screen.)

### 4. Choose the transaction type

(Fill in the exact click-through: which button/menu you select and what appears next. Replace this placeholder once verified against the real HawkSoft screen.)

### 5. Enter amount, account, and date

(Fill in the exact click-through: which button/menu you select and what appears next. Replace this placeholder once verified against the real HawkSoft screen.)

### 6. Review before saving

Before any final action, confirm:

- The correct record is open
- The entered information is accurate and complete
- No sensitive information is included
- Any next step is clear

During development, pause here. Show the proposed action to the user and ask for approval before selecting a final button such as **Save**.

### 7. Save and verify

After the user approves, complete the save, wait for the screen to update, and confirm that the entry appears as expected. Report completion to the user.

## Failure handling

Stop and report the problem when:

- The correct record cannot be verified.
- The visible interface does not match this procedure.
- The user has not supplied enough information.
- The application displays an error.
