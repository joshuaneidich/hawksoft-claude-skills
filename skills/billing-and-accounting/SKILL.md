---
name: billing-and-accounting
description: Guide or perform approved HawkSoft billing and trust-accounting workflows. Use whenever the user asks to post a payment, create an invoice, or record a trust-accounting entry in HawkSoft.
---

# Billing and Accounting

Use this skill for approved workflows in this domain. The procedures here are
agency-approved: do not invent a workflow from general knowledge when a
documented task file exists.

## Determine the requested mode

### Guidance mode

Use guidance mode when the user asks how to complete a task. Read the relevant
task file, explain the steps clearly, do not interact with the user's computer,
and identify any information the user must collect before beginning.

### Execution mode

Use execution mode only when the user asks the assistant to perform the task,
computer use is available, the target application is open, and the user has
provided enough information to proceed safely. Read the task file first, verify
the correct record, follow the documented screen path, and pause before any
final save action.

## Task routing

### Post a payment

When the user asks to:

- Post a payment
- Record a payment
- Take a payment

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/post-a-payment.md`

### Create an invoice

When the user asks to:

- Create an invoice
- Bill a client
- Invoice a policy

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/create-an-invoice.md`

### Record a trust-accounting entry

When the user asks to:

- Record a trust accounting entry
- Make a trust transaction
- Trust accounting

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/record-a-trust-accounting-entry.md`

<!-- skill-builder:routing -->

### Requests without a documented task

If the user asks for an operation that has no task file above:

1. Say that the operation is not yet covered by an approved procedure.
2. In guidance mode, general advice may be offered only when clearly labeled as
   not agency-approved.
3. In execution mode, do not perform the operation. Never execute an
   undocumented workflow.

## Final-save rule

During development and testing, do not select a final button such as **Save**,
**Save Log**, **Finish**, **Submit**, **Bind**, **Cancel Policy**, or **Delete**
until the user approves the proposed action. After approval and completion,
verify the saved result.

## Current request

$ARGUMENTS
