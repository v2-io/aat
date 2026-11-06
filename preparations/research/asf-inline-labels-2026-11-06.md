# What ASF's inline epistemic labels are trying to say

*Fable session, 2026-11-06, at Joseph's prompt: "Look at all the free-text epistemic labels as well — attempts to be very honest when there wasn't a good definition of axes to adjudicate on…?"*

## Method

Every `*[ … ]*` label in the body of every segment in all four volumes of `~/src/arch/asf` at HEAD `68f68644`, taken mechanically (labels inside Working Notes counted apart: 12). 790 labels in 212 segments. The full list is beside this file as `asf-inline-labels-2026-11-06.tsv` (volume, segment, body/wn, label).

435 of the 790 carry free text beyond a bare head or a head with a kebab-case name. I read all 435. The counts below are by rough pattern match over the 790 and are indicative only; the reading, not the counts, is the basis for what follows.

## What the labels carry

| Labels | What is being said | Examples |
|---|---|---|
| 472 | a **name for the piece itself**, below the segment | `(two-gap-sum)`, `(adaptive-scope-membership)` |
| 138 | **what it rests on** | "from sector-persistence-template", "from C1+C2+C3", "from Pinsker + Cauchy-Schwarz", "from Monderer-Shapley 1996" |
| 95 | **conditions** it is asserted under | "Conditional on (S1)–(S5) below", "Conditional on Beta-Bernoulli model", "under deterministic π*" |
| 47 | **exact**, of which 22 say exact only within a named case | "exact under linearization", "exact in the linear-Gaussian sub-scope α", "exact at the linearized level for the pure case, exact-via-Conley for the mixed case" |
| 28 | an **external work** it draws on | "Khasminskii 2012 ch. 5", "from Cox's theorem", "Duncan 1970; Mitter & Newton 2005" |
| 27 | **support other than derivation** | "validated by simulation", "by construction", "counterexample-grade", "Putnam's fit" |
| 17 | what it is **not** | "positioning rather than derivation", "taxonomy, not derived", "each is a recommendation, not a derived result in that field's own formalism" |
| 16 | a **step of a proof** | "Proof Step: uniqueness by Cauchy functional equation" |
| 14 | **less than exact** | "robust qualitative", "heuristic tier", "first-order approximation", "the leading-order scaling is stated, the constants are not derived here" |
| 13 | a **choice or convention** | "multiplicative composition a modeling choice", "stated fluid-limit convention, introduced here; not a pre-existing canon identity" |
| 12 | **whose claim it is** | "this segment's own framing", "the pathology reading is the source's own", "agentic restatement", "imported" |
| 11 | **two verdicts in one label** | "Exact for the quantity; the design reading is discussion-grade", "truth-relative exact; agent-relative conditional" |
| 8 | **forced or unique** | "kl-direction-forced", "uniqueness of log-odds, conditional on the axiom above" |
| 8 | conditional on a **reading** | "conditional on the buyer-seller-as-two-sub-agent reading", "on the first-action reading of A_O^B" |
| 4 | a **proposed test** | "An empirical test: measure total development time on codebases ranked by…" |
| about 2 | **how sure** | "empirically plausible, not derived", "plausible but not independently validated" |

89 labels are a bare head with nothing else.

## What I take from it

1. **Almost none of this is about how sure anyone is.** In 790 labels I found about two that state a degree of belief. Everything else describes what is being claimed and what it stands on. The honesty these labels were reaching for is honesty about the *shape of the claim*, not about confidence.
2. **The single most common thing a label does is name a piece smaller than the segment.** 472 of 790. Authors have been minting identities for sub-segment pieces by hand all along.
3. **The second most common is to say what the piece rests on, at that same grain.** 138 labels, pointing at three different sorts of thing: another segment, a numbered local assumption, and outside literature or standard mathematics.
4. **"Exact" is nearly half the time qualified by where.** It is not a level. It is a statement about sharpness within stated bounds, and outside those bounds the same result is usually called robust-qualitative.
5. **Things the labels say that were not in my list of seven questions:**
   - *whose claim it is*: owned here, restated from elsewhere, imported, the source's own;
   - *what it is not*: an explicit disclaimer of a stronger reading;
   - *the logical genre*: no-go, witness, identity, bound, uniqueness, template;
   - *dependence on a convention or a reading*: true under this way of mapping the theory's objects onto an imported theorem's, or under this chosen convention, and sometimes "convention-robust";
   - *a proposed test*.
6. **Eleven labels carry two verdicts joined by a semicolon.** Each is a place where one tagged piece is really two with different support.

## Limits

- Pattern counts are rough; several categories overlap and some labels match none.
- Labels are one of five surfaces where ASF records this kind of thing. Epistemic Status prose, where the feedback report says the per-claim statuses mostly live, is not covered here.
- I read the labels, not the statements they are attached to. I cannot say whether any label is accurate.

---

# Addendum: the `## Epistemic Status` sections

*Same session, same day. Joseph asked whether I had looked at these too. I had not.*

## Coverage, stated first

220 of 247 segments have one: about 50,000 words, median about 200, longest 1,151 (`form-objective-functional`). I extracted all of them and read **the first 62 whole, then stopped at Joseph's request**. The 62 are alphabetical within volume 1: every `def-`, every `der-`, and the `deriv-` segments through `deriv-matrix-persistence-condition`. So the sample holds **no** `disc-`, `emp-`, `example-`, `form-`, `hyp-`, `impl-`, `obs-`, `result-` or `scope-` segment, and nothing from volumes 2 to 4. It is the most mathematical end of the theory.

## What these sections do (from the 62)

1. **Split the segment into named parts, each with its own verdict.** Nearly every one. `def-value-object`: "The segment contains three distinct epistemic layers". `def-strategic-tempo` gives five parts five different labels in one paragraph.
2. **Say which parts the frontmatter word covers.** "The frontmatter `status: exact` applies to the definitions, to the interventional interpretation, and to the convention hierarchy; the true-law claim and the identification are conditional as scoped."
3. **Say why it is this level and not a higher one.** "neither condition is establishable from the global dependency chain — they are properties of the application — so the tier is `conditional` rather than `exact`."
4. **State a ceiling**, often per part: "Max attainable: …", and whether the limiting condition "is inherent, not removable".
5. **Separate the truth of an if-then from whether the "if" holds.** "The conditional claim (IF epistemic update is goal-blind, THEN the separation holds) is exact. Whether a particular agent satisfies the condition is determined by its processing architecture." And: the remaining condition "is about model quality, not proof quality".
6. **Name each condition and say what kind of thing it is**: posited, derived elsewhere, a design condition, an empirical claim about a class of agents.
7. **List what is not established.** "Not established:", "What this does not establish:", "What remains open:", sometimes with items struck through and marked resolved in place.
8. **Say what is imported and what is the theory's own.** "The mathematical core is textbook … The contribution is the AAT-framing". Full citations sit here.
9. **Say when a definition is also a claim.** "The stipulation itself carries no truth-claim, but the definition is advertised as an *operationalization*", which holds only under two conditions.
10. **Say what depends on a convention**, and sometimes report a probe of whether the result survives other conventions.
11. **Say what would refute it, strengthen it, or soften it.** `der-team-persistence` designs a full test. `der-mood-timescale`: "What would strengthen this: … What would soften it: …".
12. **Record checks that were done, in prose.** "independently refute-verified (2026-06-17): every algebraic step re-derived clean"; "proposed by the independent verifier and re-derived by the integrator"; "validated by simulation across quadratic, logistic, exponential-family, and non-convex losses"; and one owed: "primary-source verification scheduled for promotion past `draft`".
13. **Say what is forced and what would unforce it.** "Under (PI) … upgrade from *derived (conditional on choice of inner product)* to *derived (AAT-internally forced)* … Under non-adoption of (PI), they remain…".
14. **Mark one-directional results.** Sufficient but not necessary; one-point form implied but not conversely, with the counterexample named.
15. **Occasionally hold new mathematics.** `der-tempo-composition`'s section contains a derivation, a table and three displayed results.

As with the inline labels, **statements of how sure anyone is are nearly absent.** What is there is what is claimed, under what, resting on what, checked how, and what is not claimed.

## What I would expect in the 158 I did not read (projection, not reading)

From the inline labels, which I did read for all volumes: empirical segments giving the data, the measure used and the fit; worked examples grading how well each mapping holds; hypotheses stating falsifiers; discussion segments disclaiming derivation and citing convergence across audits; volumes 3 and 4 leaning on normative and operational language and on outside provenance. These are guesses about emphasis. I would not expect a new *kind* of statement beyond the fifteen above, but I have not checked.

## What it means for the model

An Epistemic Status section is an author doing by hand, in prose, per part of a segment, exactly the three things the model wants kept apart: what is claimed (items 1, 3 to 6, 9, 10, 13, 14), what has been done (items 8, 12), and what is and is not thereby warranted (items 2, 7, 11). It is not a rendering of state. It is the place where the segment's real structure was written down because there was nowhere else to put it.
