# Crossings log

*Append-only. One entry per crossing: what came in, from where (path and commit in the predecessor), what it became here, what was left behind and why, and what the crossing found in the source. This file records outcomes and reasons only; it never restates `ls`.*

Predecessor: ASF, `~/src/arch/asf/`, read at `2133cf2ee1ab0d3cced0c74c3e266e5994113929` (2026-11-02). ASF was not modified by any crossing.

Outcomes used: **integrated** (became a record here) · **left** (stays in ASF; reason given) · **carried as finding / question / item** (became a vsect record of that kind) · **needs-review** (crossed, but a judgment in the crossing is flagged for a second mind).

---

## 1. `def-agent-environment` (ASF `01-aat-core/src/def-agent-environment.md`, 102 lines at `2133cf2e`) → `src/def-agent-environment.md`, **integrated**

**Became:** 2 statements. ASF's two `*[Definition …]*` tags became `coupling` (definition) and `information-loss-boundary` (**choice**, not definition: the text itself says "not a truth-claim about the world but a modeling choice"; the carve follows the text, not the old tag word). The intro's two paragraphs were assigned to the two statements they state (the ASF intro restates the Formal Expression almost verbatim, so each statement now holds its prose and its formal form together, one fate). The Epistemic Status and the three Discussion paragraphs were attached with `of` markers. Text inside spans is verbatim.

**Statement-grain premise that record grain hides:** `information-loss-boundary` says "for every system AAT analyzes, that channel loses information about the state and the law taken together", which rests on `#scope-adaptive-system`'s predicate. ASF's `depends: []` on this record is right at record grain only because `scope-adaptive-system` depends on this record and a record-grain edge back would be a cycle. At statement grain there is no cycle (`adaptive-scope` rests on `coupling`, not on the boundary). Declared in `statements:`; unread by vsect 0.1.0. A refactor in place cannot express this without the same carve.

**Left in ASF (not crossed):** the 2026-05-30 audit-gold harvest (lines 47–86, five sections). Of its three "Follow-up items": *boundary integrity* → carried as `question:is-boundary-integrity-a-second-constitutive-comm` (merged with the 2026-08-12 candidate-scope note, lines 88–101, which was that flag written out); *computational vs perceptual opacity* → already answered in-place on 2026-10-30 (marked so in the gold) and the open residue is ASF `item:adaptive-scope-compute-relative-extension`, not re-carried; *"maintains internal state" is doing heavy lifting* → a watch-item on `03-llm-core`, not a finding on this cluster; left. The "candidate Brief prose", "candidate Discussion", "readers often ask", "candidate figures" and "belongs elsewhere" sections are pedagogy influx, not claims; they stay in ASF where the audit record that produced them lives.

**Found in the source:** (1) the intro paragraph and the Formal Expression say the same thing twice, with the Formal Expression's channel list adding only the $\lvert\mathcal A\rvert \geq 2$ gloss; a cold reader meets the three channels three times (intro, formal, epistemic status). (2) The umbrella/tier paragraph names five segments outside this cluster and the LEXICON; it is teaching about the cascade sitting inside a root definition. Kept attached to `coupling` because it fixes the meaning of the word *agent*, which is this statement's; flagged **needs-review** as a carve judgment. (3) The record-grain `depends: []` understates what the boundary rests on (above).

**Cost:** about 25 minutes felt; the carve decisions (two kinds, the hidden premise, where the umbrella paragraph belongs) were the cost, not the typing.
