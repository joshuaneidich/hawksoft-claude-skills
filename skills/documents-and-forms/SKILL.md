---
name: documents-and-forms
description: Guide or perform approved HawkSoft document and form workflows. Use whenever the user asks to scan/attach a document, print or create a document, or complete an ACORD form in HawkSoft (Action → Internal).
---

# Documents and Forms

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

### Scan and attach a document

When the user asks to:

- Scan a document
- Attach a document to a client
- Import a file

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/scan-and-attach-a-document.md`

### Print or create a document

When the user asks to:

- Print ID cards
- Create a document
- Generate a dec page

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/print-or-create-a-document.md`

### Complete an ACORD form

When the user asks to:

- Complete an ACORD form
- Fill out an ACORD
- Generate an ACORD form

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/complete-an-acord-form.md`

### Process a carrier download

When the user asks to:

- Process a carrier download
- Handle a download from the carrier

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/process-a-carrier-download.md`

### Carrier website inquiry

When the user asks to:

- Carrier website inquiry
- Look something up on the carrier site
- Open the carrier website

Read these files before proceeding:

- `${CLAUDE_SKILL_DIR}/tasks/carrier-website-inquiry.md`

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
