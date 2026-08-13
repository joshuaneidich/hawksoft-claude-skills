# Logging in the HawkSoft Agent Portal (preferred route)

The **HawkSoft Agent Portal** at `https://agents.hawksoft.app/` has a **New Log** form
that writes the same log entry as the desktop `Action → Method → Direction → Party →
Log` path, in one screen instead of a five-step menu walk. **It is the preferred route
for logging tasks** — use it whenever it is available and the log is a plain log.

The portal is built for phones — it shows the banner *"Agent Portal is designed for
smaller mobile devices. Some screens may not look good on desktop browsers."* Cramped
or stretched layout on a desktop browser is expected and is **not** a reason to stop;
missing or differently-named controls still are.

Everything else is unchanged: verify the client, never invent facts, and **pause for
approval before `Save New Log`**. `Save New Log` is a final action under the
final-save rule, exactly like `Save Log` on the desktop.

## Decision — which surface do I use?

- **Web app reachable and signed in, and this is a plain log** → use this reference
  and stop following the task's desktop steps.
- **The request needs something the New Log form does not offer** — a **client tag**,
  a **follow-up task / suspense**, or an association with a **specific policy** →
  use the task's desktop Action-menu steps instead; the portal's **LAUNCH DESKTOP APP**
  button opens the desktop client. Do not split one interaction across both surfaces.
- **Web app not reachable, not signed in, or a sign-in prompt appears** → tell the
  user, then use the task's desktop steps. Never enter credentials.
- **The screen does not match what is described below** → **stop and ask the user.**
  Do not improvise a path through an unfamiliar screen.

## What the New Log form maps to

| New Log field | Desktop equivalent | Notes |
| --- | --- | --- |
| **Channel** | Starting Method | Phone, Mail, Walkin, Chat, Fax, Email, Text, Online, Download |
| **From/To** | Direction | `From` = the party contacted the agency (inbound); `To` = the agency reached out (outbound) |
| **Entity** | Party | Insured, Carrier, Lien Holder, Escrow, Claimant, Law Enforcement, Certificate Holder, Mortgagee, Other |
| **Activity Tags** (toggle) | Add Activity Tags panel | Off by default; on, it reveals a multi-select checkbox list with expandable groups |
| **User Note** | The Create Log note editor | Same note standards as a desktop log |
| **Save New Log** | Save Log | **Final action.** Requires user approval first |

The form has no client-tag control, no **+ Add Task**, and no policy selector. If the
interaction needs one of those, it belongs on the desktop.

## Procedure

### 1. Open the portal and confirm you are signed in

Go to `https://agents.hawksoft.app/`. The header reads **Agent Portal** and offers
**LAUNCH DESKTOP APP** and **LAUNCH ON DEVICE**; the landing page is **Search**.

If a sign-in screen appears instead, **stop** — report it to the user and offer the
desktop route. Do not enter credentials.

### 2. Search for the client

The **Search** page is a set of labelled fields, not one search box:

| Field | Notes |
| --- | --- |
| **Name** | Two boxes — last name in the first, first name in the second |
| **Include Personal Profiles** (toggle) | Off by default; leave it as-is unless the user asks otherwise |
| **Business Name** | Commercial clients |
| **Phone Number** · **Email** · **Address** | Contact identifiers |
| **Policy Number** · **Agency ID** · **Customer ID** | The most precise identifiers — prefer these |

Fill in the **most unique** identifier the user gave you — Customer ID, policy number,
phone, or email before a name — then select **Lookup**. **Recent Clients** (top right)
is a shortcut to recently opened clients; a client picked from there still has to be
verified in step 3.

This replaces the desktop step in `find-and-open-a-client.md`; the verification
requirement below is the same.

### 3. Verify the client in Results, then Select

**Results** lists one card per match. Each card shows the client name, an **ID** badge
(the client number), status chips (for example Active · Customer · Personal), mailing
address, phone, email, and a **Matched On** line naming what matched — for example
`Neidich, Joshua - 1st Named Insured`.

Verify against the card **before** opening it. Confirm at least two identifiers match
what the user gave you (name plus address, phone, email, or policy number), and read
**Matched On** — a hit on a driver, a secondary contact, or another client's record is
not the same as the named insured.

- **Exactly one card, verified** → select **Select**.
- **Multiple cards** → narrow with a more precise field (Customer ID, policy number)
  and search again. If two or more remain indistinguishable → **stop and ask the user**
  which client is correct. Do not guess.
- **No results** → **stop.** Re-check the spelling or try another identifier once; if
  it still returns nothing, report it. The client may not exist, or may not be visible
  in the portal — creating a client is a separate task and is not done here.

### 4. Open New Log

**Select** opens the client page: **Logs** and **Attachments** sections (each showing
the last 90 days), then two green action buttons — **New Log +** and **Add Attachment
+**.

Select **New Log +**. Before typing anything, confirm the page shows:

- The breadcrumb `Home / Client <number> / New Log`, with the same client number as the
  Results card.
- The client header with the **name** and **mailing address** you verified.

If either is wrong → **stop and ask.** Never log against an unverified client.

Captured screenshots of these screens live in `../screenshots/web-log/`. If none is
available, continue with the written procedure.

### 5. Set Channel, From/To, and Entity

Select each from its dropdown so the three together describe the real interaction —
they are the same three choices the desktop Action menu asks for, in the same order:

- **Channel** — how the interaction happened. If none of the options matches, **stop
  and ask**; do not force a channel.
- **From/To** — `From` for inbound, `To` for outbound. If the direction is genuinely
  not applicable (some walk-ins), ask the user rather than picking one at random.
- **Entity** — who the interaction was with. If it is unclear, **stop and ask.** Do
  not assume Insured.

### 6. Add activity tags when they apply

Turn the **Activity Tags** toggle on. It reveals a **checkbox list** — tick every tag
that accurately describes the interaction, and only those. If no tag fits, leave the
toggle off.

**Groups — expand them before deciding no tag fits.** Blue entries with a `▸` are
collapsed groups, sitting in alphabetical order among the plain tags. Their contents are
hidden until expanded, so a tag the user asked for may be nested one level down and
invisible on a flat scan of the list. Expand every group that could plausibly hold it
before concluding it is absent.

Group names are **agency-defined**, not portal built-ins — one agency's portal showed
`AutoShop`, `Payment Status`, and `Sentiment`, and another's will differ. Never assume a
group exists, and never assume it does not; read the list on screen.

**The list is agency-configurable — organizations add their own tags and groups**, so
treat this as orientation, not as the authoritative set:

> AOR · Billing · Bind/Bound · Cancel Request · Cancellation · Citizens Depopulation ·
> Claim · Coverage · Declaration Page · Documents Request · Endorsement · ID Cards ·
> Information Update · Inspection · Info Verification · Lenders · Missing Information ·
> Mortgage Clause · New Business Forms · Non-Renewals · Payments · Policy Change ·
> Policy Review · Policy Status · Proof of Coverage · Quote/Proposal · Referral ·
> Referred To Autoshop · Refund · REINSTATED · Renewal · Repairs · Rewrite ·
> Send E-Sign · Service Task · Source Policy ID · Verification

Read what is actually on screen and tick only what is there. If the tag the user named
is not in the list, **ask** — do not substitute a near-match, and do not report a tag as
applied when it was not.

**Sentiment tags vs. client tags.** These are *activity* tags: they describe **this log
entry**. A *client* tag is a flag on the **whole client**, and this form has no
client-tag control. So when the user says something like "tag them as upset":

- **They want the client flagged** → that is a client tag → use the desktop steps.
- **They want this interaction marked** → a sentiment-style group may exist (this
  agency added one named **Sentiment**); expand it and use a tag that genuinely fits.
- **Unclear which** → **ask.** A Sentiment tag on one log is not equivalent to a
  client-level flag, and choosing the wrong one silently is worse than asking.

### 7. Write the User Note

Write the note in **User Note**, following the agency note standards in
`phone-log-standards.md` (bundled with the hawksoft-operations skill; the same
standards apply to every channel): who the interaction was with, why, what was said or
done, and what happens next. Do not invent facts, and keep full SSNs, full card
numbers, passwords, and security answers out of the note.

### 8. Review before saving

Confirm:

- Correct client (breadcrumb client number, name, and address)
- Correct **Channel / From-To / Entity**
- Accurate facts
- Appropriate activity tags
- No sensitive information
- A clear next step

**Pause here.** Show the user the proposed note and the three selections, and ask for
approval before selecting **Save New Log**.

### 9. Save and verify

After approval, select **Save New Log** once. Wait for the page to respond, then open
the client's **Logs** section (last 90 days) and confirm the new entry is there with
the right date, user, channel, and summary. Report completion to the user.

## Failure handling

Stop and report the problem when:

- A sign-in prompt appears, or the app is unreachable.
- **Lookup** returns nothing, or no result card can be verified.
- **Matched On** shows the hit came from someone other than the intended party.
- A tag the user asked for is not in the Activity Tags list, including inside its
  collapsed groups.
- The correct channel, direction, or entity is unclear.
- The form's fields do not match the table above.
- The user has not supplied enough facts to write an accurate note.
- The app displays an error, or the save does not produce a visible log entry.

Do not select **Save New Log** repeatedly when the app appears unresponsive, and do not
retry the same log on the desktop without first confirming with the user that nothing
was saved — that is how duplicate logs happen.
