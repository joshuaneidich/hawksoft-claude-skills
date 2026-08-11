---
name: policy-servicing
description: Guide or perform approved HawkSoft policy servicing workflows. Use whenever the user asks to insert, endorse, cancel, renew, or reinstate a policy in HawkSoft.
---

# Policy Servicing

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

### Insert a new policy

When the user asks to:

- Insert a policy
- Add a new policy to a client
- Set up a new policy

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/insert-a-new-policy.md`

### Endorse a policy

When the user asks to:

- Endorse a policy
- Make a policy change
- Add a vehicle or driver

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/endorse-a-policy.md`

### Cancel a policy

When the user asks to:

- Cancel a policy
- Record a cancellation

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/cancel-a-policy.md`

### Renew a policy

When the user asks to:

- Renew a policy
- Process a renewal

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/renew-a-policy.md`

### Reinstate a policy

When the user asks to:

- Reinstate a policy
- Undo a cancellation

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/reinstate-a-policy.md`

### Change policy details

When the user asks to:

- Change policy details
- Edit a policy
- Update policy information

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/change-policy-details.md`

### Change policy status

When the user asks to:

- Change policy status
- Update a policy status

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/change-policy-status.md`

### Quote or export a policy

When the user asks to:

- Quote a policy
- Export policy data
- Start a rating

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/quote-or-export.md`

### Duplicate or remarket a policy

When the user asks to:

- Duplicate a policy
- Remarket a policy
- Shop a policy to another carrier

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/duplicate-or-remarket-policy.md`

### Archive a policy

When the user asks to:

- Archive a policy
- Remove an old policy

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/archive-a-policy.md`

### Move a policy

When the user asks to:

- Move a policy
- Transfer a policy to another client

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/move-a-policy.md`

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
