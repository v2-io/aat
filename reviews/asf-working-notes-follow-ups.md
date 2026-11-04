---
kind: review
author:
  name: ASF audit gold, 2026-05-30 harvest (de novo auditors, attributed per item)
  role: auditor
sources:
  - "ASF 01-aat-core/src/def-chronica.md Working Notes, 'Follow-up items', at 2133cf2e"
written: 2026-05-30
carried-by: Claude Fable 5.1 (pilot), 2026-11-04
---

# Live follow-up items from the Chapter 1 audit gold that name a defect in a statement here

*The 2026-05-30 harvest filed, in each segment's Working Notes, the de novo auditors' follow-ups. Most are watch-items on other segments or pedagogy; those stay in ASF (`influx/00-INDEX.md` says which). This record carries the ones that name a defect in text that is now a statement in this store and that the text at `2133cf2e` still has. Attribution is the harvest's.*

## F1 (finding)
- target: segment:def-chronica

Statement: `def-chronica#non-forkable`.

"Duplicating an agent's *state*" is loosely worded. The non-forkable object is the *chronica*, not the lossily-compressed (hence duplicable) state $M_t$. Tightening "state" → "the agent (its chronica)" would prevent a careless reader from inferring $M_t$ itself is non-forkable — which is false and is "exactly the opposite of the Three-Deaths-relevant truth" (Claude, AUDIT-WORKING-472913). A one-word editorial fix.

*Carrier's note:* the phrase appears twice in the statement (the opening sentence and the Discussion paragraph attached to it). The harvest's "Three Deaths" name is retired in the estate; the finding stands without it.
