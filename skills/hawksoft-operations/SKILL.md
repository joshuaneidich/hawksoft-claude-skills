---
name: hawksoft-operations
description: Guide or perform approved HawkSoft interaction logging and documentation — phone calls, walk-ins, email, text, fax, mail, chat, and online contacts — in the HawkSoft web app (agents.hawksoft.app) when it is available, otherwise the desktop Action menu. Use when the user asks to log, note, or document a client interaction in HawkSoft, or to send an email from HawkSoft. Policy changes, claims, client-record edits, documents and ACORD forms, and payments belong to the policy-servicing, claims, client-records, documents-and-forms, and billing-and-accounting skills.
---

# HawkSoft Operations

Use this skill to **log and document client interactions** in the HawkSoft agency
management system — the phone, walk-in, email, text, fax, mail, chat, and online
procedures routed below.

The instructions in this skill represent agency-approved procedures. Do not invent a workflow from general knowledge when a documented task procedure exists.

## Related HawkSoft skills

This plugin splits HawkSoft by category. If the request is about the record itself
rather than documenting a contact, hand it to the sibling skill that owns it:

| Request | Skill |
| --- | --- |
| Insert, endorse, cancel, renew, reinstate, move, or remarket a policy | `policy-servicing` |
| File a claim, record proof of claim, update claim status | `claims` |
| Change client info, duplicate, merge, archive a client, create a snapshot | `client-records` |
| Scan or attach a document, print/create a document, ACORD forms, carrier downloads | `documents-and-forms` |
| Post a payment, create an invoice, trust accounting | `billing-and-accounting` |

Logging the *conversation about* one of those events still belongs here — for
example, "log the call where the insured asked to cancel" is a log; performing the
cancellation is `policy-servicing`. When a request is both, do the sibling task
first, then log.

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
- Computer use (or browser use, for the web app) is available.
- HawkSoft is open or can be opened — the desktop client, or the web app at
  `agents.hawksoft.app` for logging.
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

## Choose the surface for logging tasks

Logs can be written in two places, and the faster one is preferred:

- **HawkSoft Agent Portal (`agents.hawksoft.app`) — preferred for logging.** Search →
  Select the client → **New Log +**, and the whole entry is one screen (Channel,
  From/To, Entity, Activity Tags, User Note) instead of a walk through the desktop
  Action menu.
- **HawkSoft desktop Action menu — the fallback**, and the only route for anything the
  New Log form does not offer: a client tag, a follow-up task/suspense, or a specific
  policy association.

Before performing any logging task, read:

- `${CLAUDE_SKILL_DIR}/references/web-logging.md`

Then follow the surface decision at the top of the task file. Every safety rule is
unchanged on the web: verify the client, never invent facts, and pause for approval
before **Save New Log**. If the web app is unreachable, prompts for sign-in, or does
not match the documented form, say so and use the desktop steps — never enter
credentials, and never improvise a path through an unfamiliar screen.

Non-logging tasks are desktop procedures; there is no approved web equivalent for them.

## Task routing

Every logging task below also reads `${CLAUDE_SKILL_DIR}/references/web-logging.md`
before it starts.

### Log an inbound phone call from a customer

When the user asks to:

- Log a phone call
- Add a phone note
- Document an inbound customer call
- Record a call from an insured
- Add a customer conversation to HawkSoft

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-inbound-phone-call.md`
- `${CLAUDE_SKILL_DIR}/references/web-logging.md`
- `${CLAUDE_SKILL_DIR}/references/phone-log-standards.md`
- `${CLAUDE_SKILL_DIR}/references/navigation.md`
- `${CLAUDE_SKILL_DIR}/references/safety.md`

Screenshots for this workflow live in `${CLAUDE_SKILL_DIR}/screenshots/phone-log/` and
are embedded at the step they illustrate inside the task file. Where a step carries a
`screenshot-pending` comment marker instead of an image, the capture has not been taken
yet: continue with the written procedure and say that the screenshot is still to be
added.

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

### Log a Client Interaction

When the user asks to:

- Log an interaction
- Log a call, email, or contact
- Record a client contact

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/log-a-client-interaction.md`

### Requests without a documented task

If the user asks for a HawkSoft operation that has no task file above:

1. First check the sibling skills in [Related HawkSoft skills](#related-hawksoft-skills)
   — most non-logging procedures are documented there, not here.
2. Otherwise, say that the operation is not yet covered by an agency-approved procedure.
3. In guidance mode, general HawkSoft advice may be offered only when clearly labeled as not agency-approved.
4. In execution mode, do not perform the operation. Never execute an undocumented workflow.

## Client verification

Before writing anything to HawkSoft — desktop or web:

1. Confirm that the correct client record is open. In the web app, read the breadcrumb
   (`Home / Client <number> / New Log`) and the client header on the page.
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
- Save New Log (web app)
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
