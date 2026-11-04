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

## 2. `def-action-transition` (ASF `01-aat-core/src/def-action-transition.md`, 91 lines at `2133cf2e`) → `src/def-action-transition.md`, **integrated**

**Became:** 3 statements, matching ASF's three tags one-to-one: `action-transition` (definition), `fresh-transition` (**choice**: "the Markov commitment ... by declaration"), `transition-opacity` (definition; names $\theta_T$). The intro's three paragraphs each state one of them and were assigned accordingly (¶1 → action-transition, ¶3 → fresh-transition, ¶2 → transition-opacity). The Epistemic Status paragraph was **split** into three `of` spans, one sentence group per statement; it was one paragraph in ASF speaking for three things.

**Carve judgment, needs-review:** the audit gold (2026-05-30) recorded two substrates reading `*[Definition (transition opacity)]*` as mistyped (a postulate- or scope-flavored claim, not an object introduced) and a third withdrawing the objection. The carve keeps it a definition: its first sentence names $\theta_T$ and places its randomness under $\pi_0$, and its last sentence disclaims any requirement. If the pilot's kinds are ever run through the founding questions, this is the first case to test.

**Statement-grain edge record grain hides:** `transition-opacity` is defined through `#scope-adaptive-system`'s reference measure $\pi_0$ and its possible-worlds rule (`defined-by: segment:scope-adaptive-system#possible-worlds`). Same shape as crossing 1: a root definition leans on the scope that leans on it, and only statement grain can say which parts.

**Left in ASF:** the audit-gold harvest (lines 157–193). Its follow-ups: *hidden learnability/smoothness assumption* and *practical $\Omega$-sizing cost* are questions about the theory's reach, not defects in these statements; left as ASF influx. The eq-tag-typing follow-up is answered by the carve (above). "Doesn't the LLM case violate transition opacity?" is marked dissolved in-place (2026-10-30). The rest is pedagogy.

**Found in the source:** the intro paragraph order (action-transition, opacity, Markov) differs from the Formal Expression's (action-transition, fresh, opacity), so a reader meets the three things in two orders; the carve made the body order follow the formal order and the intro paragraphs travel with their statements, which ASF's section layout cannot do.

**Cost:** about 15 minutes felt; mostly the Epistemic Status split and the opacity-kind decision.

## 3. `def-observation-function` (ASF `01-aat-core/src/def-observation-function.md`, 93 lines at `2133cf2e`) → `src/def-observation-function.md`, **integrated**

**Became:** 5 statements from ASF's 4 tags. `observation-function`, `observation-kernel`, `epistemic-opacity` (definitions); `fresh-noise` (choice); and one **new statement the carve pulled out of the fresh-noise tag's span**: `kernel-is-learnable-content` (claim, exact; premises `fresh-noise` and `#def-action-transition#fresh-transition`). It had to come out: ASF's own Epistemic Status says it "does not follow from the kernel's definition alone" and gives the counterexample without fresh noise, and ASF's checks C7 (check 7) and C9 (check 8) checked exactly this sentence. A claim that can be refuted while the clause it sat under stands is a separate atom. The intro's second paragraph was **split** (lossiness → `observation-function`; the kernel sentences → `observation-kernel`'s opening); the Epistemic Status was split four ways.

**Findings carried** (`reviews/asf-scope-adaptive-system-check-8.md`): F3 → `observation-kernel` (the opening sentence, now this statement's first sentence, uses "the conditional law of $o_t$ given state and action", the phrase the Formal Expression says names the mixture, not the kernel — the carve makes the defect sit inside the statement it contradicts, which is where it belongs); F4 → `fresh-noise` and `#def-action-transition#fresh-transition` (neither conditions on the whole law $\theta$). Both open in ASF since 2026-10-31; unchanged here.

**Left in ASF:** the audit-gold harvest (lines 57–92). Live follow-ups: *is $a_{t-1}$ cashed in downstream or vestigial?* — a watch-item on Parts II–III, left; *constitutive-opacity triad named as such* — marked superseded in-place (the three are now one scope's typed anatomy); *known-noise instantiations* — marked resolved in-place. The pragmatic/epistemic action partition belongs to the strategy machinery. Left.

**Found in the source:** a derived, independently checked claim was living untagged inside a definitional clause's paragraph (above). Record-grain vsect bound C7/C9 to the whole segment, so the record cannot say that *this sentence* is what was re-derived. That is the clearest case in the cluster for statement grain.

**Cost:** about 25 minutes felt; the new statement and the two splits.

## 4. `def-chronica` (ASF `01-aat-core/src/def-chronica.md`, 110 lines at `2133cf2e`) → `src/def-chronica.md`, **integrated**

**Became:** 2 statements from ASF's 1 tag: `chronica` (definition) and `non-forkable` (**claim, qualitative**, premise `chronica`). ASF carried the non-forkability consequence inside the definition's prose ("a consequence the framework will lean on heavily"); it can be wrong while the definition stands, so it is its own atom. The ordinal-not-metric paragraph stays inside `chronica`: given the definition as a sequence, it cannot fail separately. Text verbatim; the intro's three paragraphs re-ordered so each sits with its statement.

**Carried as questions:** `question:does-the-abstract-chronica-need-the-tractus-chro` (closer: awaiting the `03-llm-core` interiority sub-scope — ASF held it as a Working Note since 2026-05-01 with Joseph's framing quoted); `question:the-chronica-is-ordinal-event-indexed-not-metric` (the two downstream implications).

**Carried as finding** (`reviews/asf-working-notes-follow-ups.md` F1): "Duplicating an agent's *state*" in `non-forkable` names the wrong object (audit gold, Claude 472913); still in the text at HEAD.

**Left in ASF:** the audit-gold harvest (lines 160–199) and the 2026-08-12 candidate spike (two forward candidates: a TRACTUS/CHRONICA forensics architecture; a fork-undetectability experiment). The spike candidates are owed work in ASF's sense, not this store's yet; left and listed. Follow-ups left: *digital-substrate non-forkability needs two sentences* (a `#scope-agent-identity` matter); *where do priors / $M_0$ live* (a `#form-agent-model` matter; it recurs in that segment's own gold); *linear vs branching histories*; *the $\mathcal H$ collision rationale* (NOTATION uses plain $H$).

**Found in the source:** three of the four live follow-ups on this segment target other segments. The gold was harvested per segment and filed where the reader was standing, not where the defect is. A crossing has to re-route them, and most route out of the cluster.

**Cost:** about 15 minutes felt.
