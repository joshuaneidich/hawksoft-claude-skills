# Find and Open a Client (shared precondition)

Every task requires the correct client to be open and verified **before** its own
steps begin. Run this branch first, then return to the task.

## Decision — is the correct client already open and verified?

- **Yes, open and verified** → return to the task and continue with its next step.
- **No / unsure** → find and open the client below.

## Find and open the client

1. Click **Search**.
2. Enter the most unique identifier you have — policy number, phone number, or full
   name.
3. Act on the results:
   - **Exactly one match** → open it, then verify (below).
   - **Multiple matches** → narrow by date of birth, mailing address, or policy
     number. If two or more remain indistinguishable → **stop and ask the user**
     which client is correct. Do not guess.
   - **No match** → **stop.** The client may not exist yet. Creating a client is a
     separate task — do not create one as part of another workflow. Report this to
     the user.

## Verify before continuing

Confirm at least two identifiers match what the user gave you:

- Client name
- Mailing address or date of birth
- A policy number, when relevant

If verification fails → **stop and ask.** Never proceed on an unverified client.

## Return to the task

Once the correct client is open and verified, return to the task and continue —
usually by opening the **Action** menu.
