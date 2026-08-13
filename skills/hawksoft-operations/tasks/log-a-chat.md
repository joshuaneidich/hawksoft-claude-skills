# Log a chat

## Purpose

Document a chat conversation in the correct client record.

## Screen path

Use this exact action path:

Action → Chat → From/To → Party → Log

## Required information

Before beginning, obtain:

- The correct client record
- Who the chat was with
- Summary of the exchange
- Any follow-up needed

If the user has not provided enough information, ask for the missing details before starting.

## Before you start — choose the surface

Logging is faster in the HawkSoft web app, so it is the preferred route. Follow
`../references/web-logging.md`:

**Decision — is the web app (`agents.hawksoft.app`) available and signed in?**

- **Yes, and this is a plain log** → log it there. In **New Log**, this task's path
  becomes **Channel** = Chat, with **From/To** and **Entity** matching the direction and
  party of the chat. Follow `../references/web-logging.md`
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

- **Yes** → continue to the next step.
- **No / unsure** → open it via **Search** (one match → open and verify; multiple →
  narrow, then ask if still unclear; no match → stop, creating a client is a separate
  task). Verify name + address/DOB before continuing.

Do not continue on an uncertain client.

### 2. Open the Action menu and navigate to this operation

Open **Action** and follow `../references/action-navigation.md` to reach this operation using the Screen path above. Confirm each menu option on screen.

### 3. Choose Chat, the direction, and the party

(Fill in the exact click-through: which button/menu you select and what appears next. Replace this placeholder once verified against the real HawkSoft screen.)

### 4. Enter the chat summary and any follow-up

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
