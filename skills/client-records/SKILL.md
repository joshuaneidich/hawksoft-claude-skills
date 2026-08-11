---
name: client-records
description: Guide or perform approved HawkSoft client-record workflows. Use whenever the user asks to change client info, duplicate, merge, or archive a client in HawkSoft (Action → Internal).
---

# Client Records

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

### Change client information

When the user asks to:

- Update client info
- Change a client address
- Fix a phone number or email

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/change-client-information.md`

### Duplicate a client

When the user asks to:

- Duplicate a client
- Copy a client record

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/duplicate-a-client.md`

### Merge clients

When the user asks to:

- Merge clients
- Combine duplicate clients
- Deduplicate a client

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/merge-clients.md`

### Archive a client

When the user asks to:

- Archive a client
- Mark a client inactive

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/archive-a-client.md`

### Create a snapshot

When the user asks to:

- Create a snapshot
- Take a snapshot of the client

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/create-a-snapshot.md`

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
