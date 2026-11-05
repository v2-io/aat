# A de novo review of PLAN.md, with the mathematics and dynamics first

*2026-11-04. Claude (Fable 5.1), launched with a two-sentence brief: review `PLAN.md` de novo, with Joseph asking especially about its mathematics and dynamics; report here. Proposed register throughout. Nothing here edits the plan.*

*Version reviewed: `PLAN.md` at aat-v3 commit `6b90d14` (463 lines). While I was reading, commit `dc7083f` added one bullet to A8 (live_docs as a running system) and changed one line of step 1. I read that diff in full; §6 covers it. Everything else below refers to the `6b90d14` text, which `dc7083f` leaves unchanged.*

*What I read whole before writing: PLAN.md; RC1 (00–11, 90, 95, SPECIMEN; not `lang/`); `research/knowledge-graphs.md`; `foundations/asf-flows.md`; `foundations/councils-system-model.md`; `foundations/research/rc1-vsect-gaps.md` and `plan-read-vsect-side.md`; the vsect flow review's `02-measures.md`, `03-loops.md`, `05-questions.md`; `asf-system/out/report.md`; `asf-system/joseph-feedback-2026-11-04.md`; `generic-collab-council.md`; `preparations/README.md`. Partially: the kernel dialog (window 1 and greps for the credence and yield passages), the relata transfer map (§2.1–2.6), vsect 0.1's README (the `depends:` rule). Not read: `SCRATCH-for-joseph.md`, `verisect-and-ldocs.md`, the archived vsect design, the theory store, the walking skeleton, the influx maps. Descent caution: I read the knowledge-graphs note before writing, so where I agree with it that is not independent corroboration; I mark those places.*

---

## 0. The short version

The plan's structure is sound and most of its moves are the right ones: position and credence separated; standing computed; evidence added only where independence is shown; refutation as a cap rather than a weight; episodes as the atomic changeset; importance always for a target. The findings below are mostly places where the mathematics is stated loosely enough that two builders would implement it differently, or where a number from the sprint has been carried into a design that will make the number stop being true.

The four I would settle before step 2 (the smallest v2), because they decide the event schema or the projection:

1. **"Credence as a distribution over the scale" names three different quantities** (a fact, a judgment, a forecast), and the guard form `P(rung ≥ k) ≥ θ` is well-defined for only two of them (§1.1).
2. **The L1 gain figure of "0.6–0.8 with one independent check per landing" does not follow from the trail's numbers.** The arithmetic uses a yield diluted by 222 self-checks that found nothing. On the same trail, the gain under that regime is somewhere between 0.75 and 1.2, and the untested experiment is what decides it (§2.1).
3. **The "3 real changes in 120 lapses" figure measures vsect 0.1's transitive lapse, not the harmlessness of rewording.** 117 of the 120 were checks that never read the changed text. Under the direct-read binding the plan itself adopts in A8, those 117 never lapse, and the post-change forecast in A2 is calibrated to a design that no longer exists (§1.7).
4. **Dawid–Skene cannot be identified from a trail with one independent check per landing.** It needs, for some subpopulation of versions, at least three conditionally independent checks on the same version. That is a design requirement on the trail, and nothing in the plan states it (§1.5).

A fifth, which is good news: **open question 8 (circular support) is probably dissolvable rather than open** (§2.8).

---

## 1. Mathematics

### 1.1 Three quantities are wearing the word "credence"

A0 is careful about position (a fact from the trail) against credence (a belief). It then says *"A credence is a distribution over the scale, never a bare number,"* and in A2 writes a dependency predicate as *"rests on #x with P(at least re-derived) ≥ 0.9."* That predicate puts a probability on a *position* on the evidence ladder. But A0 has just said position is *"computed from the trail, and given a faithful trail it is a fact, not a guess."* Given a faithful trail, P(at least re-derived) is 0 or 1. The predicate is either a deterministic guard on position (write it as `position ≥ re-derived`) or a credence guard (write it as `P(true) ≥ 0.9`), and the mixed form is not well-defined.

Reading A0 and A2 together, "distribution over the scale" is doing three jobs:

| Quantity | Scale it is over | Example in the plan | What it is |
|---|---|---|---|
| **Position** | the evidence ladder | re-derived | a fact (point mass, given fidelity) |
| **Judged value** | the aspect's value scale | `novelty: high`, P(≥ high) ≈ 0.4 | a belief about where truth lies on an ordinal value |
| **Forecast after lapse** | the evidence ladder | "most of the mass stays at the old rung, with a thin tail below" | a prediction of what a re-check would find |

And a fourth, for a truth claim proper: P(true), a distribution over {false, true}, which collapses to one number, as A0's first sentence has it.

These move differently and are consumed differently. A guard on a forecast ("probably still re-derived") is a legitimate thing to want after a rewording; a guard on a judged value is another; a guard on position is a third. The plan's own substitution law says one dimension's value never stands in for another's, and the cross-product tell in RC1 03 is close to firing here: one field, three semantics. I would name them separately in A0 and let each have its own form. The bits-per-ladder paragraph then only applies to the judged-value and forecast cases, which is fine.

*Confidence: high that the predicate as written is ambiguous; the three-way split is my reading.*

### 1.2 A judge's self-reported credence is testimony, not the credence

A0's examples: `novelty: high · decided by X in passing · credence 0.4` and `… by Y after a literature search · credence 0.8`. Who supplies 0.4 and 0.8? If the judge does, then for decided and soft aspects the credence *is* typed, which is exactly the hand-set number RC1 01 says can lie, and it sits beside A2's *"A truth claim's credence is never typed."* The plan is not strictly contradicting itself (truth claims against soft aspects), but it is letting the one case in through the other's door.

What I think the plan means, and should say: a judge's stated confidence is an **attested fact about the judge** (testimony about their own state). The system's credence in the value is computed from that testimony with a judge-specific likelihood ratio, which is what the A7 concordance check calibrates. Then "in passing" against "after a literature search" is a difference in the *basis*, read by the projection, and X's 0.4 is one input, not the answer.

### 1.3 Conjunction of premises: the arithmetic is right; three things around it are not yet

The specimen's numbers check: 0.9⁵ = 0.590; the Fréchet lower bound is 5 × 0.9 − 4 = 0.5; the upper bound min(0.9) = 0.9. And the correction of "bounded by the weakest necessary premise" to a conjunction is right. (For the record: Joseph's own earlier phrasing in the kernel dialog, window 1, was the weakest-link form, *"the overall never exceeding the uncertainty of the weakest part of the chain."* The plan tightens it. That is a deliberate supersession and worth marking as one.)

Around it:

- **Recorded independence has opposite signs in the two places the plan uses it.** For corroborating evidence, shown independence is what lets weights add (good news for the claim). For premises, shown independence is what *lowers* the conjunction from the min bound (0.9) toward the product (0.59). The sentence *"RC1's coherence default isn't only a rule about corroboration: it decides how credence composes"* is right, and it should carry the sign flip, or a builder will apply the same "independence shown → stronger" rule to both.
- **Premises in a theory are usually positively dependent**, because they share definitions and constructions. Positive dependence pushes the conjunction toward min; it is the plan's "0.9" end, not the 0.59. So *"if their independence is recorded"* will rarely be the honest record for premise sets, and the coherence default's "assume shared descent" is, for conjunction, the *favorable* assumption. The projection should say what it serves when dependence is unknown: the interval, the lower bound, or a point. Serving the lower bound is conservative and simple; serving the interval is honest.
- **Depth attenuation.** Under conjunction, credence falls with chain depth: 0.95²⁰ ≈ 0.36, 0.99²⁰ ≈ 0.82. ASF's roots reach 245 segments; the leaves are deep. If per-link credence sits near 0.9, the far corners of the theory will compute at credences nobody will believe or use. Either per-link credence for re-derived mathematics is in fact 0.99+, in which case the 0.9 specimens are misleading about what the projection will show, or the attenuation is real and the plan should expect it. RC1 06's "support chains attenuate" is this, literally.
- **The derivation step is missing from the composition.** P(conclusion) depends on the premises holding *and* the derivation being valid. The plan has both halves, the premise conjunction here and the record's own `evidence/derivation` line in A2, and never says how they combine. That combination is the projection, and the plan calls it *"proposed; not yet discussed in depth,"* which is honest. The knowledge-graphs note's §5c asked for the algebra per edge kind; I agree, and I would add that it needs an operator for own-line evidence against inherited premise credence, not only for `supports`.

### 1.4 The within-line "strongest item counts" rule

*"Within one line of descent, the strongest item counts and repeats add nothing."* Under a proper likelihood model, two dependent items give LR(E₁) × LR(E₂ | E₁); perfect dependence makes the second factor 1 (so: the first item only), independence makes it LR(E₂) (so: the sum in log space). The max rule is the perfect-dependence limit. As a *default when descent is not shown cut*, it is the conservative choice and consistent with the coherence default. It should be stated as the conservative bound, not as *"the natural form."* The knowledge-graphs note's §5a already noticed that max and average disagree when dependent items disagree; I would add that "strongest" is undefined once weights are signed, and the plan's own structure resolves it: confirmations accumulate, refutations cap (A2: *"A rebut caps the claim"*). That is a lexicographic rule, not one algebra, and it is fine. It leaves **narrowed** undefined: a narrowing changes the claim's truth conditions, so it is neither a weight nor a cap but a new version with its own evidence (RC1 04's scope-bound). A2 lists narrowed as an outcome and gives it no effect.

### 1.5 Dawid–Skene: the right tool, with an identifiability condition the trail has to meet

The plan now has the prior/likelihood distinction right and recognizes that 42% is a finding rate, not a likelihood ratio. Good. On Dawid–Skene (which I know from the latent-class literature, not from re-reading the 1979 paper this session):

- **It is a latent class model, and latent class models need at least three conditionally independent indicators per item to be identified.** With two raters on a binary truth, the parameters are a prior plus two 2×2 confusion matrices (5 free), against a 2×2 agreement table (3 free): not identifiable. With three raters: 7 against 7, generically identified. The estimates come from the *pattern of agreement among raters on the same items*. So some subpopulation of versions needs **three or more independent checks on the same version**. The sprint's rounds checked successive *versions*, which are different items, and the plan's proposed regime is one independent check per landing. Under that regime Dawid–Skene has nothing to fit. Either the design sets aside a calibration subpopulation (a sample of versions that get three independent checks, with the extra checks costed as calibration rather than as securing), or likelihood ratios stay estimates.
- **It assumes raters err independently given the truth.** Checkers primed by the author's account violate this and inflate the estimated accuracy. The `seeded-by` edges are what let you exclude or model them; the knowledge-graphs note said the same (§5b), so count that as one voice, not two.
- **It is nominal, not ordinal.** The 1979 model uses a full k×k confusion matrix per rater and does not use the order of rungs. With 4–6 rungs and few raters that is badly over-parameterized. The plan's *"confusion matrices work on ordered categories"* is true in the sense that they can be applied, and misleading in the sense that they will not fit. An ordinal variant (shared cutpoints; a single accuracy parameter with distance-weighted errors) is what a small trail can support.
- **The 116-of-116 inference is right but should show its work.** "LR ≈ 1" does not follow from 116 confirmations alone; it follows from 116 confirmations *on text that independent checks found defective 42% of the time*. The contrast is the evidence, and it is the model case of how LRs will be estimated at all.

### 1.6 Calibration is a global re-projection; treat it as an era

A2: *"this computation raises certainty only through acts."* True per record. But re-estimating a check type's likelihood ratio from the trail changes every credence that used it, in either direction, with no act on any of those records. Raising an LR raises credences everywhere silently. RC1's ERA object is built for this: a calibration update should bump an era so that "computed under calibration c₃" is visible and the change is an event rather than drift. (The knowledge-graphs note's §7 made the era point for definition versions; this is the same point for calibration parameters.)

### 1.7 The "3 real changes in 120 lapses" number does not measure what A2 uses it for

A2: *"The one measured confirm pass found about 3 real changes in 120 lapses. So most of the mass stays at the old rung, with a thin tail below."* I traced the number. The flow review's `02-measures.md` row 4 gives it as 3 of 77 confirmed pairs (3 of about 120 bindings), and `05-questions.md` item 2 says what the 117 were: *"117 of 120 comparisons were 'this check reads nothing of that'."* Thirteen of the 36 pairs were pure Claim Record insertions, a grain artifact; without them precision is 3 of 23.

So the 0.03 is the rate at which a check lapsed by **vsect 0.1's transitive basis rule** turns out to have been affected. It is not the rate at which a rewording of text a check actually read changes the check's verdict. A8 proposes binding checks to direct reads (and I agree with the knowledge-graphs note that this is right). Under that design the 117 never lapse, and the relevant rate is at least 3 of 23 (13%) and plausibly higher among checks that read the changed sentence. The forecast distribution in A2 ("thin tail below") is therefore calibrated to a measurement the plan's own design change invalidates. The flow model's L2 conclusion survives (about 7 real changes per root edit either way, since the product is what matters there); A2's forecast does not.

A2's follow-on, *"The tail should depend on the kind of change: rewording or redefinition,"* connects to A8's OBO rule, which the plan doesn't yet connect: a redefinition is a new record with no evidence and no forecast; only a rewording has a forecast. That makes the forecast's domain smaller and cleaner.

### 1.8 Kendall's τ measures ordering, not calibration

A7: *"claimed against established strength: calibration across different ladders."* τ is a rank-concordance statistic. A claimant who orders every record correctly but is uniformly one rung overconfident gets τ = 1. That is **discrimination**, not calibration. Calibration (does P(≥ k) ≈ 0.9 hold 90% of the time) needs a reliability diagram or a proper-score decomposition over the recorded credences. Both are worth having; they answer different questions, and the plan should not call τ the calibration check. Two practical notes: with 4–6 rungs and hundreds of records, ties dominate, so it is τ-b or nothing; and off-ladder terminals (refuted, not-proven) need a declared placement or exclusion, which the knowledge-graphs note also flagged.

Kendall's W for a council's unity report is fine where members produce rankings; the generic council mostly produces sustaining levels per option, which is a different object.

### 1.9 The cost-matrix priority drops decision-inflection

A7: *"Priority is then importance-weighted gaps priced by that matrix."* RC1 07's ordering is expected value of information: how likely the pending decision is wrong, what that costs, and how much *this* measurement would change it. The plan's version keeps importance and cost and drops the third factor. A high-importance record with no decision waiting on it has near-zero value of information; the plan would rank it high. I would keep RC1 07's form, and keep its counterweight too (*cheap truth is run, not triaged*), which is absent from A7.

---

## 2. Dynamics

### 2.1 The L1 gain under "one independent check per landing" is not 0.6–0.8 on these numbers

A5: *"Measured from the sprint: about 1.3 as run, about 0.6–0.8 with one independent check per landing."* From `asf-flows.md` §5: 488 checks, 246 revises, 313 findings; so 1.98 checks per version × 0.64 findings per check × 1 version per finding ≈ 1.27. Fine for the sprint as run.

The 0.6 comes from 1 check × 0.64. But 0.64 is findings over *all* checks, and 222 of the 488 were self-checks that found 3 (`02-measures.md` rows 1–2). Removing self-checks halves the denominator without removing findings. Findings per *independent* check is between 200/266 ≈ 0.75 (if only the 200 review-born findings came from checks, `01-flows.md`) and 313/266 ≈ 1.18 (if all 313 did). So under "one independent check per landing, one revision per finding," the gain is **≈ 0.75 to ≈ 1.2**, and the claim that this regime is *"the lever that moves the gain across 1"* rests on the diluted figure. Dropping self-checks saves cost; on this trail it does not change findings per version.

What would move the gain: versions per finding below 1 (batch findings into one revision, which the plan's episode already does), and the maturity decay of yield (next item). The flow model's own untested experiment, a round that lands only findings followed by one more independent check, is exactly what separates these, and the plan should say the gain is "near 1, decided by that experiment" rather than carry 0.6–0.8.

*Confidence: high on the arithmetic; the 0.75–1.2 range is bounded by an attribution the trail could settle and nobody has.*

### 2.2 The yields are state-dependent, so ρ is a local linearization at best

The measured yields change by an order of magnitude with independence (0 against 0.43) and maturity (Part I 2/17 → 0/16 → 0/8; Volume 4 near 0.8; and the kernel dialog, line 973: pooled independent yield falls from 0.57 on a first review to 0.18 by the fourth). A loop whose gain decays with each round converges whether or not any single-round gain is below 1; a constant-ρ branching process is the wrong model for it. The flow model acknowledges this in its tables and then reasons from a scalar ρ anyway, and A5 inherits the scalar. The convergence criterion that matches the measurements is: **yield per round falls, and edit mass per round falls** (`03-loops.md`: no round removed more than it added; segments grew 1.5–2.5×). Flat findings with growing text is the loop; falling findings with shrinking text is convergence. ρ < 1 is neither necessary nor sufficient for that.

### 2.3 The breaker needs edit mass beside generation counts, and is low-power at these counts

A5's breaker counts generations per kind of finding. The one retrodiction (`scope-adaptive-system`: 2, 2, 2, 2, 2, 3) shows the count alone cannot tell "defects were there" from "rounds created defects"; `03-loops.md` shows what can: words added minus removed per round. I would make the breaker's statistic generations per kind **and** edit mass per generation. And at counts of 2 and 3, "stopped shrinking" over four to six generations is close to noise; the breaker should be a prompt that convenes a mind (which is what A5's halt → council already does) rather than anything that acts on its own. The typing-of-findings precondition is right and still owed (313 findings, no kind field).

### 2.4 Part D has not absorbed A8 §3

Part D: *"Under [the monotone rule] the automated layer always reaches a fixed point."* A8 (via the knowledge-graphs note) records that lowering-only gives termination, not uniqueness; RC1 04 requires order-invariance; the condition is that each rule's output be a monotone function of its inputs, checkable by stratification. Part D's text is unchanged, so A8 and D disagree inside one document. Hysteresis is history-dependent by construction, which breaks "standing = f(trail as of a moment)" unless the hysteresis state is itself derived from the trail; say so. These are the knowledge-graphs note's points; I checked them and agree, with one addition: the monotone rule should name *which values* it binds. Importance rises when a dependent is added (an attribute recomputed by a rule), and that is a rule raising a value. It is fine if importance is not "standing," but the rule as written doesn't say.

### 2.5 "Notify, don't cascade" is about events, not effects

A2: *"A premise losing credence propagates as a recomputation (notify, don't cascade). Only a refutation cascades hard."* Under conjunction, a root's credence is a multiplier on everything below it. A root dropping from 0.95 to 0.80 lowers every dependent's credence by the same factor, lazily, and every guard of the form P(…) ≥ θ in 245 segments can flip in the same evaluation. No events fire, but the effect is as wide as a cascade. The plan should say this plainly: the notify/cascade distinction is about what gets *recorded*, and the effect of a root credence change is global by construction. This is also where Part D's hysteresis stops being a nicety and becomes load-bearing: without it, root credence oscillating across a band flips hundreds of guards in both directions.

### 2.6 Episode scope at the roots is the whole theory

A5: *"The episode's scope starts at the perturbation's computed reach … Episodes whose scopes overlap are merged, or one waits."* Computed (transitive) reach at any of the five roots is 230–245 segments. So an episode on a root scopes to nearly everything, every two root episodes overlap, and root work is serial. Steps 3–5 begin with exactly those five roots. That is probably correct (it is what a changeset is for), but the plan should expect it: concurrency among episodes exists only away from the roots. And scope should be **direct-read reach**, consistent with A8's binding proposal, or it is global even for edits that no check read.

### 2.7 "Stable" has to be moment-indexed

A5: *"A stable store is at a fixed point: no rule would fire."* Freshness rules read age, and age advances. A store with any clock-driven rule is never at a fixed point; stability is "no rule would fire as of this moment, excluding the clocks," which is RC1 02's "no untimed evaluation" applied to the whole store. One sentence fixes it.

### 2.8 Open question 8 (circular support) looks dissolvable

The plan says *"ASF composites guarantee cycles."* I don't think they do, for three reasons, and one of them is already in the record:

- **At statement grain, the known `depends:` cycles vanish.** Line B's report (kernel dialog, line 1094): *"In three of the five roots, a definition rests on the scope that rests on it. At segment grain that would be a cycle; at statement grain there is none."* That is measured on the exact five segments steps 3–5 start with.
- **A1's "an introduction depends on later segments" is `narrates`, not `supports`.** RC1 06 types them differently and gives `narrates` no transitivity. An introduction's *freshness* depends on later segments; its truth does not support theirs or rest on theirs. If edges are typed, this cycle is not in the support graph.
- **Composite ↔ section is a guard cycle, not a support cycle.** A composite's coherence rests on its sections (support). A section's *ratification* is guarded on the composite's coherence (A1). Ratification is `decision/accountability`; the guard is a cross-dimension guard of the kind RC1 04 already has (*ratified* requires grounding-explicit and consultation-announced). Credence never flows around that loop.

The `dc7083f` live_docs bullet adds the fourth leg: an acyclic navigation hierarchy kept apart from a dependency web, with different propagation rules. So I would turn open question 8 into an **invariant with a lint**: `supports` is acyclic at statement grain; a cycle found is a grain defect or a mistyped edge and is routed to that repair. Declare the credence projection as a least fixpoint anyway, as the safety net, which is cheap. A1's sentence *"the nesting is neither a strict tree nor strictly forward"* then splits into: the nesting is a tree; the dependency web is a DAG at statement grain; the cross-cutting groups (notation) are `narrates` or arrangements.

### 2.9 A1 and A8 disagree about what lapses

A1: *"A change to any section's content lapses the composite's coherence."* A8 §(build systems): bind to what was directly read; *"A standing change lapses the composite's coherence iff the coherence review read that standing."* Both are in the plan; a builder reading A1 implements deep lapse, a builder reading A8 implements direct. The same goes for Part B's *"a check binds to its basis"* (direct or transitive is unsaid, as the knowledge-graphs note observed) and for Part D's monotone paragraph. A8 is framed as findings to verify before building on, which is honest, but the parts of A it would change should at least carry a mark saying so, or the plan's own two-current-labels rule ("there is only ever one current epistemic label") is being broken by the plan.

---

## 3. Smaller items

- **No slot for the crosser erring** (A6). Outcomes include "rejected (the submitter erred)" but not "the crossing was wrong." A re-crossing that disagrees with a crossing is evidence about the crosser, not the source (the knowledge-graphs note's §5d; I agree). And *"Each chunk is crossed exactly once"* should be "has exactly one current crossing," or correction is inexpressible.
- **Hash the normalized form** (Part B, *"versions are content hashes"*). Otherwise an `md-press` unwrap mints a version and lapses every check on it. One line.
- **The graduation ladder and credence.** Position and computed credence are already at level 2 (procedural) by construction; only *values* graduate. A2's *"Hardness is a property of each value"* says this; the table heading *"one ladder for every aspect"* slightly contradicts it.
- **"Importance is an attribute (reach, for a target) plus a decision (the stakes)"** (A0) is clean. One note: reach computed on transitive `supports` at the roots is ~245 for all five, so it will not rank the roots against each other; direct reach or weighted reach will.
- **Attested floor.** RC1 08 gives the floor three layers (reproducibility, tamper-evidence, identity at substrate grain) with named residue. A0's "agent ids, dates" is the third layer only. Worth citing all three so a builder knows reproducibility is the main fabrication defense.

---

## 4. What I would protect

Things the plan gets right that a repair pass could accidentally lose:

- Position and credence as separate recorded quantities (A0), once the three-way split in §1.1 is made.
- Refutation as a cap, never a large negative weight. It keeps the arithmetic from manufacturing recovery by piling confirmations on a refuted claim.
- Likelihood ratios measured from the trail, kept apart from priors (A2). This is exactly relata's §2.3 and the plan now states it correctly.
- The honest intermediate before the strengthening attempt, with downstream re-stabilization *held* (A2). That is the one place the plan explicitly trades consistency for cycles, and it is the right trade.
- Interior decisions as events, not records (A3). It is the main thing that keeps the record population from doubling.
- Conditions on out-of-scope discoveries ("applies only if this changeset commits") so an abort cannot leave them acted on (A5).
- The anchor rule in both directions (Part C).

---

## 5. On the plan as a document

Two things, briefly, since the brief said the review is mine to shape.

**A8 is a second plan inside the plan.** It holds the five findings that most change A1, A2, A5 and D, labeled "verify before building," while those sections still carry the pre-A8 text. The reader who stops at A2 builds one system; the reader who reaches A8 builds another. Either promote the verified items into their sections with the history in a Working Notes layer, or mark the affected sentences in A with "A8 would change this." The plan's own rule, one current label, argues for the former.

**The numbers need their measurement conditions.** 0.03, 0.42, 1.3, 0.6–0.8, 245, 116 of 116: each is carried as a bare number, and §§1.7 and 2.1 show two of them changing meaning when the condition is restored. A one-line "measured as X, under Y" beside each would have caught both. The flow model does this with its measured/estimate/guess tags; the plan dropped the tags on import.

---

## 6. The `dc7083f` addition (live_docs bullet in A8)

I read the diff after finishing the above. It is a useful addition and interacts with three findings:

- **Two graphs, kept apart** is the fourth leg of §2.8 and I'd lean on it: it answers A1's nesting paragraph more directly than anything in `6b90d14`.
- **Two-pass cascade (verdicts first, then one batch write)** is a concrete inner shape for A5's episode and for A4b's obligations; the proposed *undercut* as a fifth verdict matches RC1 06.
- **One line doesn't transfer.** *"A cascade reaching more than three documents from one edit is flagged as a single-responsibility smell."* In ASF the median transitive fan-out is 6 and the roots reach 245; that smell would fire on every root edit, where the fan-out is the mathematics, not a design fault. The bullet reports it as live_docs' rule and doesn't adopt it, which is correct, but a reader skimming A8 for rules to take could take it.
- The step 1 change (*"§7 is now read; its bearing is in A8"*) is consistent with the bullet.

---

## 7. Scope honesty

This is one mind's read in one session, with the knowledge-graphs note in context before I wrote. The findings in §1.5 (identifiability), §1.7 (what the 3-of-120 measures), §1.8 (τ versus calibration), §2.1 (the L1 arithmetic), §2.2 (state-dependent yields), §2.5 (notify versus effect), §2.6 (root scope), and §2.8 (cycles dissolvable) are mine and not in that note; the rest overlaps it and should count as one voice. Where I cite a number, I traced it to the flow review or flow model file named; where I cite a statistical property (Dawid–Skene identifiability, τ as rank concordance), it is from training and should be checked at a primary before it shapes the projection. I have not read the kernel dialog whole, `SCRATCH-for-joseph.md`, or `verisect-and-ldocs.md`, and anything the plan rests on from those is outside what I checked. Treat this report's finding list, not its silence, as its content.

I'm staying on the line for follow-up.
