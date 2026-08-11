---
name: hawksoft-operations
description: Guide or perform approved HawkSoft agency-management workflows, especially logging client interactions (phone, walk-in, email, text, fax, mail, chat, online). Use whenever HawkSoft is mentioned, or the user asks how to complete — or asks Claude to perform — a HawkSoft operation such as logging a call or documenting a client conversation.
---

# HawkSoft Operations

Use this skill for common procedures in the HawkSoft agency management system.

The instructions in this skill represent agency-approved procedures. Do not invent a workflow from general knowledge when a documented task procedure exists.

## Determine the requested mode

### Guidance mode

Use guidance mode when the user asks how to complete a HawkSoft task.

In guidance mode:

1. Read the relevant task file.
2. Explain the steps clearly.
3. Do not interact with the user's computer.
4. Identify any information the user must collect before beginning.

### Execution mode

Use execution mode when:

- The user asks Claude to perform the task.
- Computer use is available.
- HawkSoft is open or can be opened.
- The user has provided enough information to perform the task safely.

In execution mode:

1. Read the relevant task procedure before interacting with HawkSoft.
2. Verify the correct client before entering or saving information.
3. Follow the documented screen path.
4. Do not guess missing client, policy, effective-date, or coverage information.
5. Stop when the visible HawkSoft interface materially differs from the procedure.
6. During testing, pause immediately before any final save action.
7. Present the proposed entry to the user for approval.
8. After saving, verify that the entry appears in HawkSoft.

## Task routing

### Log an inbound phone call from a customer

When the user asks to:

- Log a phone call
- Add a phone note
- Document an inbound customer call
- Record a call from an insured
- Add a customer conversation to HawkSoft

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-inbound-phone-call.md`
- `${CLAUDE_SKILL_DIR}/references/phone-log-standards.md`
- `${CLAUDE_SKILL_DIR}/references/navigation.md`
- `${CLAUDE_SKILL_DIR}/references/safety.md`

Use these screenshots when the visible interface needs clarification:

- `${CLAUDE_SKILL_DIR}/screenshots/phone-log/01-action-phone.png`
- `${CLAUDE_SKILL_DIR}/screenshots/phone-log/02-create-log-window.png`

If a screenshot file is unavailable, continue with the written procedure and explain that the screenshot should be added later.

### Log an outbound phone call

When the user asks to:

- Log an outbound call
- Record a call I made to a customer

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-an-outbound-phone-call.md`

### Log a walk-in

When the user asks to:

- Log a walk-in
- Record an in-person visit

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-a-walk-in.md`

### Log email correspondence

When the user asks to:

- Log an email
- Record correspondence with a client

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-email-correspondence.md`

### Log a text message

When the user asks to:

- Log a text message
- Record a text with a client

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-a-text-message.md`

### Log a fax

When the user asks to:

- Log a fax
- Record a fax for a client

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-a-fax.md`

### Log a mail item

When the user asks to:

- Log a mail item
- Record a letter we received or sent

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-a-mail-item.md`

### Log a chat

When the user asks to:

- Log a chat
- Record a chat with a customer

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-a-chat.md`

### Log an online interaction

When the user asks to:

- Log an online interaction
- Record an online request

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-an-online-interaction.md`

### Send an email

When the user asks to:

- Send an email
- Email the client from HawkSoft

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/send-an-email.md`

### Requests without a documented task

If the user asks for a HawkSoft operation that has no task file above:

1. Say that the operation is not yet covered by an agency-approved procedure.
2. In guidance mode, general HawkSoft advice may be offered only when clearly labeled as not agency-approved.
3. In execution mode, do not perform the operation. Never execute an undocumented workflow.

## Client verification

Before writing anything to HawkSoft:

1. Confirm that the correct client record is open.
2. Read the visible client name.
3. Verify at least one additional identifier when available, such as:
   - Address
   - Phone number
   - Email address
   - Policy number
4. Do not rely solely on which tab happens to be open.
5. Stop if the client identity is uncertain.

## Documentation rules

All HawkSoft documentation must be:

- Factual
- Concise
- Professionally written
- Limited to information relevant to the interaction
- Clear about what the client said
- Clear about what the agency did
- Clear about any next action

Do not include:

- Full Social Security numbers
- Full payment-card numbers
- Passwords
- Security answers
- Unsupported conclusions
- Information belonging to an unrelated client

## Final-save rule

During development and testing, do not select a final button such as:

- Save Log
- Save
- Finish
- Submit
- Bind
- Cancel Policy
- Delete

until the user approves the proposed action.

After approval and completion, verify the saved result.

## Current request

$ARGUMENTS
