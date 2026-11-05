# Knowledge graphs, and what sits nearer to the plan than they do

*Research note, 2026-11-04. Written by a Claude Opus 5.5 subagent for Joseph and councils-46, from the question Joseph posed: "we should also look at knowledge graphs to see if we're accidentally reinventing them in part or leaving some important ideas on the table." Read before writing: `PLAN.md` whole; RC1 whole (00–11, 90, 95); the 2026-08-10 external-ontologies survey's index and reassembled model, plus its RDF statement-metadata entry; the relata transfer map's structure and its ledger sections; vsect 0.1's README and maturation plan, for what is already built. Proposed register throughout. Nothing here edits the plan.*

*Verification grades used below:*
- **read**: I read the primary text this session and the claim rests on what it says.
- **abstract**: I confirmed the source exists and the claim from its abstract, bibliographic record, or an authoritative summary, but did not read the body.
- **recalled**: from training, not checked this session. Each one is marked where it occurs.
- **inference**: my own reasoning, grounded in the sources named beside it.

*Sources and grades are listed at the end.*

---

## 1. The short answer: the question's frame is slightly off

The plan is only partly a knowledge graph, and that part is not where its difficulty lies. Records with stable identities, typed edges between them, and metadata on individual statements make a knowledge graph in the ordinary sense (a property graph or an RDF dataset). The knowledge-graph field has settled lessons there, and they bear on identity, statement metadata, and what absence means (§8). But the knowledge-graph stack is built on open-world semantics and monotone entailment, where adding facts never retracts a conclusion. The plan's center of gravity is the opposite: standing is computed, retracted by later events, propagated through dependencies, and re-established by recorded acts.

The established fields that have built *that* are, in order of how much of the plan they already cover:

1. **Reason maintenance**, also called truth maintenance (Doyle's JTMS, 1979; de Kleer's ATMS, 1986). Belief status is computed from recorded justifications and never set by hand. Retraction propagates, contradictions become *nogoods*, and the reasoner is kept separate from the system that records its justifications. This is the closest ancestor of A2, A5 and the plan's appendix on conditional decisions. My `memorata-search` queries for it, and for most of the fields below, surfaced nothing in the estate. That was a shallow search (top hits only), so read it as "not prominent", not "absent". (§2)
2. **Logic-programming fixpoint semantics** (Datalog, stratification, stable models). This gives a precise and checkable form of Part D's "monotone rule", and names the two ways it fails: oscillation and tension. (§3)
3. **Incremental computation and build systems** (early cutoff, verifying traces, delete-and-rederive). This is the established answer to A1's "upward lapse" problem, and to a cost vsect 0.1 has already measured. (§4)
4. **Truth discovery, data fusion, and evidence algebras** (source-dependence detection; Dawid–Skene; provenance semirings; subjective logic). This is the established home of A2's computed certainty under the coherence default. (§5)
5. **Assurance cases and requirements traceability.** These are the engineering fields that maintain claims-with-evidence graphs across change. RC1 08 queued this as an external check and it never ran. (§6)

Then come time (bitemporal and event-sourced stores, §7), identity (§8), and the knowledge-graph lessons proper (§9).

One-line reframing, as inference: **v2 is a reason-maintenance system over a provenance log. Its computed layer is an incremental, stratified rule program whose projections carry an evidence algebra. Knowledge-graph forms are its natural interchange layer, not its engine.**

What I found *genuinely different* in the plan, meaning not a reinvention, is in §10. That list is short but load-bearing.

---

## 2. Reason maintenance: the closest ancestor

**Bears on:** A0 and A2 (standing computed from acts), A5 (episodes; discoveries "carrying a condition"), Part D's monotone rule, and the appendix items "theorems conditioned on A and on B" and "decisions lapsing: assumptions as edges".

**What is established.** In Doyle's TMS (*Artificial Intelligence* 12, 1979), each belief (*node*) has justifications. A justification has an *in-list* and an *out-list*, and is valid when every in-list node is IN and every out-list node is OUT. A node's IN/OUT label is determined by its justifications, and is never asserted on its own (abstract, via secondary summaries). The architecture splits the work in two:
- an inference engine does the reasoning and hands the TMS its justifications;
- the TMS keeps the dependency network, propagates retractions, and reports contradictions back.

In de Kleer's ATMS (*AI* 28, 1986), a node's *label* is the set of minimal *environments* (sets of assumptions) under which it holds. A minimal inconsistent environment is a *nogood*, and every superset of a nogood is removed from all labels (abstract).

**How it maps.**

| Plan | Reason maintenance |
|---|---|
| "standing is computed, never typed" (B) | labels are computed from justifications, never asserted |
| "the graph records the results of reasoning, it does not perform the reasoning" (ennaos VERA, as quoted in the 2026-08 survey) | the inference-engine / TMS split, exactly |
| evidence events as what standing stands on | justifications |
| lapse when a basis changes | retraction propagation |
| refutation becomes a no-go | a contradiction becomes a nogood |
| "theorems conditioned on A and on B" (appendix); "assumptions as edges, with a lapse when one changes" | ATMS labels: *this result holds in environments {A}, {B}*, kept for every environment at once, without picking one |
| discoveries "carrying a condition (applies only if this changeset commits)" (A5) | a node labeled with the environment {changeset-commits} |
| a tension record: "two well-supported states held, not oscillated between" (A5) | ATMS holds incompatible contexts side by side; nothing forces a choice until one is needed |

**What to take** (inference unless marked):

1. **ATMS-style condition labels**, as the representation for conditional standing. ASF already writes results "under explicit premises (R1)–(R4)". An ATMS label states that natively: a record's standing *per assumption set*. A decision's or assumption's lapse then removes environments from labels; it is not a sweep. The A5 condition on out-of-scope discoveries becomes the episode's own assumption, so an abort retracts everything resting on it in one step. That is the property A5 wants, and it comes free.
2. **Nogoods as first-class records.** A no-go result in ASF is often "these premises together are inconsistent". The ATMS nogood is exactly that object. Its useful property is that every superset is also dead (abstract). This gives the no-go cascade a precise extent.
3. **Well-founded support**, *recalled* (Doyle's requirement that IN labels rest on non-circular support; I did not re-read it). The plan says dependencies run "mostly backward, but not only": an introduction depends on later segments, and notation cuts across. Once support can cycle, *a computed certainty can support itself*. With "bounded by the weakest necessary premise" (a minimum over premises), a cycle's greatest fixpoint keeps whatever value the cycle started with. Only the least fixpoint, or an explicit groundedness rule, refuses circular support. The projection has to say which one it computes. I'd treat this as a real open item for A2: nothing in PLAN or RC1 states it, and the composite-and-intro structure guarantees cycles will exist.

**What is different, and why it matters.** TMS labels are binary (IN/OUT) or sets of environments. They carry no graded certainty, no account of who made the act, and no independence. A TMS also trusts its inference engine completely. The plan's evidence lines, commitment law and coherence default add exactly what a TMS lacks, because the plan's "inference engine" is many fallible minds rather than one sound prover. So this is a precursor, not a replacement. But the plan should adopt its vocabulary and its solved sub-problems (environments, nogoods, well-founded support, propagation algorithms) instead of rediscovering them.

---

## 3. Fixpoints: the "monotone rule", made precise

**Bears on:** Part D (the monotone rule and hysteresis), A5 (the breaker and tension records), Part B stage 1 ("no rule cycle runs unsupervised").

**What is established.**
- A *stratified* logic program (no recursion through negation) has a unique perfect model, built in stages (abstract, standard theory).
- Under stable-model semantics, a loop through negation of *even* length can yield several stable models. The textbook case is `a ← not b`, `b ← not a`, which has two. A loop of *odd* length can yield none (abstract, secondary sources).
- Recursion through aggregation is well-defined when the aggregated domains are complete lattices and the program is monotone. Min and max are the standard examples, as in shortest paths over shortest subpaths (Ross & Sagiv, PODS 1992; abstract).

**What it shows about the plan** (inference from the above):

1. **"Rules only lower" buys termination, not uniqueness.** Part D says that under the monotone rule "the automated layer always reaches a fixed point". On finite ladders, rules that only lower must stop. But RC1 04's order-invariance law needs *one* answer, whatever order things fire in, and lowering alone doesn't give that. Take "lower Y if X is high" beside "lower X if Z changed". If X is lowered first, Y is never lowered. If Y's rule fires first, it is. Both runs only lowered, they ended at different fixed points, and the difference came from firing order. The rule reads "X is high", so lowering X *disables* it, which is negation in disguise. **The condition that gives a unique, order-invariant result is that every rule's output is a monotone function of its inputs: lowering an input can only lower or keep outputs.** That is checkable per rule at stage 1, by stratification over a rule-dependency graph with signed edges. "No rule cycle runs unsupervised" (Part B stage 1) becomes the precise check: **no cycle through a negative (antitone) edge**.
2. **The breaker's two failure shapes already have names.** A cycle through negation of odd length has no stable outcome: the system *oscillates*, which is what the breaker catches by counting generations. An even cycle has two stable outcomes: a *tension*, which is A5's "two well-supported states held, not oscillated between". So both can be detected *statically*, from the rule graph at definition time, before any episode runs. The generation-counting breaker remains the right guard for judgment-loop dynamics (ρ), where the "rules" are minds and no static graph exists.
3. **Hysteresis is history-dependent by construction.** A band with hysteresis depends on where the value came from, not only where it is. That breaks "standing = f(trail as of a moment)" unless the hysteresis state is itself derived from the trail. That's fine, but say so, so that order-invariance is checked against it.
4. **Joseph's non-monotone case** (coupling against cohesion as an equilibrium search) is outside Datalog. But the plan's proposed handling, "a deterministic equilibrium search run to its own convergence criterion inside an episode, recorded as one act", is the right shape: an optimization *recorded* as an event is base data, and the rule program over it stays stratified.

---

## 4. Incremental computation: early cutoff, and a cost vsect has already measured

**Bears on:** A1 ("upward lapse is a declared rule, not automatic … without such rules, every edit would lapse the whole theory"), open question 1 (does a change in standing alone lapse a composite?), Part B ("a check binds to its basis and lapses with the cause named").

**What is established** (read: Mokhov, Mitchell & Peyton Jones, "Build Systems à la Carte", ICFP 2018):
- *Minimality* (Def. 2.1): "A build system is minimal if it executes tasks at most once per build and only if they transitively depend on inputs that changed since the previous build."
- *Early cutoff* (§2.3): "When it executes a task and the result is unchanged from the previous build, it is unnecessary to execute the dependent tasks." Their example, Fig. 3, is adding a comment to `main.c`: `main.o` comes out unchanged, so nothing downstream rebuilds.
- *Verifying traces* (§4.2.2): "record the values/hashes of dependencies used last time, and if something has changed, the key is dirty."
- Every trace kind supports early cutoff except *deep* traces, which record hashes of the transitive terminal inputs (§4.2.4).

**What vsect 0.1 does**, from its README: "`depends:` is a meaning edge, in the basis, transitive … a check on a segment lapses when anything upstream of it changes". The first measurement: "checks on `#deriv-evidence-allocation-ceiling` rest on a basis of 36 statement versions. One edit anywhere in that set lapses them." From MATURATION-PLAN: of about 120 bindings one confirm pass compared, **3** were touched by their change. In build-system terms, **vsect 0.1 uses deep traces, which is precisely the design that cannot do early cutoff.** And `vsect confirm --equivalent` ("one event at the root re-binds every check that read the old version and everything downstream") is **early cutoff performed by a second mind**.

**What to take** (inference):
1. **Bind a check to the values it directly read, not to the transitive closure.** "Values" means the content hashes of the specific projections it read: B's statement text, B's certainty band. A change deep upstream reaches A's check only if it changes something A's check actually read. This is RC1 06's own rule, which vsect 0.1 departed from: "strength **never** propagates transitively …; *reachability* is transitive for notification only."
2. **Let weakened premises re-price through the computation, not through lapse.** If C (under B) is refuted, B's own check lapses because B directly read C. A's check, which read B's statement, still holds, because A does follow from B. What changes is A's *standing*, which is computed as bounded by B's, so it drops at the next evaluation. That is RC1 06's "re-pricing is not a mutation sweep" made mechanical. Of the 117 of 120 bindings that confirm found untouched, those that lapsed only through a transitive upstream change would not have lapsed at all. Those whose *direct* read changed would still need a confirm. I can't tell from the record how the 117 split.
3. **This answers A1's upward-lapse question structurally.** The answer is not "declare rules per level". It is: *a composite's coherence review binds to the hashes of what it read*, meaning each section's headline statement and band, not every byte. An edit that leaves those unchanged is cut off. Declared upward-lapse rules then become declarations of *what a coherence review reads*, which is the plan's "a dependency carries a predicate" seen from the other side.
4. **Open question 1 then has a crisp answer.** A standing change lapses the composite's coherence iff the coherence review read that standing.
5. **For the engine:** maintaining derived facts under deletion in recursive rules is a solved problem. *DRed* (delete and rederive) handles recursion, and *counting* handles non-recursive views (Gupta, Mumick & Subrahmanian, SIGMOD 1993; abstract). It's worth reading before writing v2's propagation.

What doesn't transfer: build tasks are deterministic, and minds are not. Early cutoff through a *mind's* judgment ("this edit didn't change what B asserts") is a recorded act with an actor, which is what `confirm` already is. Where the projection read is mechanical (a hash of a statement block), the cutoff is free. Where it needs judgment, it stays a confirm.

---

## 5. Computed certainty: the fields that already compute it

**Bears on:** A2 (certainty by weight of evidence; the coherence default; likelihood ratios measured from the trail), A7 (calibration via concordance).

### 5a. The coherence default is established in data fusion

- **Truth discovery with source dependence.** Dong, Berti-Équille & Srivastava, "Integrating Conflicting Data: The Role of Source Dependence" (PVLDB 2(1), 2009; abstract). They detect which sources copy which, and discount the copiers, while discovering truth from conflicting claims. They also infer *direction*: who copied whom. This is RC1's coherence default ("agreement adds weight only where descent is shown cut") arrived at independently, for web data. The plan records descent explicitly (`seeded-by`), where Dong et al. must infer it. The useful import is their method for when descent was *not* recorded: inferring likely shared descent from patterns of correlated errors. That suits the intake of legacy ASF material, where nobody recorded who seeded what.
- **Subjective logic** (Jøsang; read, "Fission of Opinions in Subjective Logic", FUSION 2009). Observations from sensors over disjoint periods "are independent, and it is natural to simply add the observations … cumulative fusion". Observations over the same period "are dependent, and it is natural to take the average … averaging fusion". This is the coherence default as an algebra. Subjective logic also keeps an explicit *uncertainty mass* apart from the belief value, which is A0's "certainty is always recorded separately from the value it qualifies". One divergence worth weighing: for dependent evidence the plan takes the *strongest* item ("the strongest item counts and repeats add nothing"), while averaging fusion takes the *mean*. They differ exactly when dependent items disagree. Max lets one strong-but-correlated item set the value. Averaging lets weak correlated items dilute it. Neither is obviously right, and the plan should choose deliberately.

### 5b. Measuring likelihood ratios without ground truth

A2 says "the likelihood ratios are priors, measurable from the trail", and gives as its example "a first independent check finds something in about 42% of cases (65 of 153)". Two problems here. Neither is a knowledge-graph point, but both are load-bearing:

1. **A finding rate is not a likelihood ratio** (inference; elementary). A likelihood ratio for "check passed" is P(pass | claim sound) ÷ P(pass | claim unsound). The 42% is P(finding) over a mixed population. To turn it into a likelihood ratio you need the check's error rates on sound and on unsound claims separately.
2. **"The likelihood ratios are priors" conflates the two things relata's canon keeps strictly apart.** The canon row `form-evidence-ledger`, quoted in A2 itself, says "priors separate from likelihoods". The relata transfer map (§2.3) explains why: "folding priors into the evidence sum is how base rates silently manufacture acceptance."

**The established tool for exactly this measurement:** Dawid & Skene, "Maximum Likelihood Estimation of Observer Error-Rates Using the EM Algorithm" (*J. R. Stat. Soc. C* 28(1), 1979; abstract). It estimates each rater's error rates *when the true answer is never observed*, from the pattern of agreement among raters. Relata could compute likelihood ratios because humans adjudicated the truth. ASF mostly can't: there is no oracle for "this derivation is sound". Dawid–Skene's model is the way to get per-check-type error rates from the trail anyway. Its central assumption is that raters err independently given the truth. That is exactly what the coherence default refuses to assume without shown descent-cuts. So *the descent graph is an input this estimation requires*, and the plan already records it. The two pieces fit together. This is the most directly usable import in this note for A2's "calibrates them over time".

### 5c. An algebra for propagation

**Provenance semirings** (Green, Karvounarakis & Tannen, PODS 2007; abstract). Annotations propagate through queries and recursive Datalog by two operators. One combines *alternative* derivations, and the other combines *joint* use of inputs. **Annotated RDF** applies the same idea inside knowledge graphs. The Hogan survey describes it as annotations "modelled as semi-rings: algebraic structures consisting of domain values … and two main operators" (read).

The plan's A2 rules fit this shape. "Bounded by the weakest necessary premise" is minimum as the joint-use operator. "Within one line, the strongest counts" is maximum as the alternative operator. "Independent lines add log-likelihood ratios" is a sum, which is *not idempotent*. The semiring literature's known lesson is that non-idempotent combination over-counts whenever two derivation paths share an input. That over-counting is precisely what the coherence default guards against.

Stating A2's projection as an explicit annotation algebra, with the operator choice per edge kind declared, would make it checkable at stage 1, alongside RC1 06's per-edge composability table. It would also expose the cycle question from §2.

### 5d. Two error layers at intake

Dong, Gabrilovich et al., "Knowledge-Based Trust" (PVLDB 8(9), 2015; abstract) separates *extraction* errors (the system misread the page) from *source* errors (the page is wrong). They found extraction errors "far more prevalent". This is A6's distinction between a chunk *misread at crossing* and a source that is *wrong*. The plan's crossing outcomes include "rejected (the submitter erred)", but there is no slot for the crosser erring. If a crossing is itself an act with an actor (it should be), a later re-crossing that disagrees with it is evidence about the crosser, not about the source. That keeps a bad intake read from depressing a source's standing.

---

## 6. Assurance cases and traceability: RC1's queued external check, partly run

**Bears on:** A4b (change obligations), A2 (confidence), RC1 08's acceptance protocol item 3 ("the safety-case frameworks — the one surveyed place a counterexample to the ceiling-plus-evidence-action design plausibly lives"). As far as I can tell that item was never run, and neither was the 2026-08 survey's follow-up list entry for GSN.

- **Assurance 2.0** (Bloomfield & Rushby, "Assessing Confidence with Assurance 2.0", arXiv 2205.04522; read, abstract): "confidence cannot be reduced to a single attribute or measurement". They base it on positive perspectives, negative perspectives ("doubts and challenges to the case, typically expressed as defeaters"), and residual doubts. This corroborates RC1's vector over scalar position, from a field with regulatory stakes. A December 2025 SRI report keeps "logical indefeasibility and dialectical examination" as the main criteria, with probabilistic assessment as a supplement (abstract).
- **Eliminative argumentation** (Goodenough, Weinstock & Klein, SEI 2012 and later; abstract and secondary). Confidence grows as identified doubts (*defeaters*: rebutting, undermining, undercutting) are eliminated. It is recorded as *Baconian* "i|n", meaning i of n identified defeaters eliminated, explicitly distinct from the probability that the claim is true.

**How this meets the plan** (inference):
- **A4b's obligations are defeaters.** "Have you checked adjacent segments?" and "does this change the SVG metaphor?" are identified doubts. "Each discharged by a recorded act" is elimination. "The commit guard requires them all discharged" is a Baconian n|n gate. The assurance literature has thought hard about the failure that matters most here: *defeaters you didn't identify*, which is the "residual doubt" perspective, and about defeaters of defeaters. The plan has no slot for residual doubt: what a coherence close *didn't* think to ask. RC1's de-novo audit is the plan's manufactured answer to that. Assurance 2.0's three-perspective form would let it be recorded on the record rather than only practiced.
- **The counterexample RC1 08 was looking for is partly here.** Eliminative confidence is a *different quantity* from weight of evidence, and is explicitly not a probability of truth. A2 currently has one certainty, computed by weight of evidence. The plan may need both: weight of evidence for *evidenced* aspects, and an eliminative count for *obligation discharge* and coherence. If so, they must not be added together. The substitution law, applied once more.
- **Requirements traceability: "suspect links."** Requirements tools (IBM DOORS and its successors; Jama) flag a trace link as *suspect* when either end changes, and someone must *clear* it. That is lapse plus confirm, in industrial use for decades. The lesson from practice (community-reported, Jazz forum, not verified against product docs) is that clearing degenerates into acknowledgment. An IBM-side answer describes it as "basically say 'let's ignore these changes'". And bulk "clear all" functions exist. vsect's `confirm` already refuses the reviser and demands a criterion. Those two refusals are exactly what keeps confirm from becoming DOORS-style clearing, and they are worth keeping when v2 rebuilds it.

---

## 7. Time: two clocks, and replay under a changed definition

**Bears on:** RC1 11's open `@{moment}`; A2 (events record "who did it"); RC1 08's under-recording remedy; Part B ("what survives a blow-away: the event log, replayed under the new definition with a migration step").

- **Bitemporality** (XTDB documentation; SQL:2011 system-versioning; abstract and docs excerpts). There are two time axes. *Valid time* is when something was true or happened. *System time* is when the store learned it. "Auditing will need to see the data 'as we knew it at the time', which is the purpose of the system-time AS OF clause". Corrections are "additive, and the pre-correction state is never destroyed". **"As of a moment" is ambiguous until you say which clock.** The plan needs both (inference):
  - *Late recording.* RC1 08's remedy for under-recording invites recording an act after the fact ("I re-derived this yesterday, recording now"). Its standing as of yesterday's valid time differs from what any reader could have seen as of yesterday's system time.
  - *Corrections chain beneath, never overwrite* (RC1 02). That is a system-time correction to a valid-time fact.
  - *Era bumps.* A result measured under an era that was later found to have ended earlier than recorded.

  RC1 11 found `@{moment}` "load-bearing and undefined in *both* corpora". The bitemporal model is the established partial answer: a moment is a pair, and "untimed" fails in two different ways.
- **Episodes as reified transactions.** Datomic: "transactions are themselves entities … an ideal place to store domain-specific provenance metadata", and every datom leads to "the tx that asserted it and vice-versa" (abstract, docs excerpts). This is the factorization RC1 95 found in live_docs, and that A5 adopts: the episode as primary, carrying actor, summary and signature, with per-record history as a projection. It is established practice in a production database, and the plan can cite it.
- **Replay under a new definition.** Event-sourcing practice, mostly via Greg Young's *Versioning in an Event Sourced System* (Leanpub, 2017; book outline and secondary write-ups only), has these established positions:
  - existing events are never edited;
  - old events are *upcast* when read (translated by code at read time), or migrated by *copy-and-replace* into a new stream that leaves the old one untouched.

  The risk for the plan is specific (inference). Replaying old events under a changed definition silently *reinterprets* them. A "re-derived" event recorded when the derivation ladder had four rungs is not the same act as one recorded under a five-rung ladder. RC1's ERA object is the right instrument. Every event should carry the definition version it was recorded under, and a migration should be an upcaster with its own author and version, so "this standing was computed by reading old events through migration M" is itself visible. Part B's "hand migrations during stage 0 are recorded as migrations" is the start of this. The upcaster form makes it replayable.

---

## 8. Identity: precedents, one of them from mathematics

**Bears on:** A1 (identity as a maintained binding; record as the unit with one fate; old names keep resolving; the old-slug-to-fate mapping), Part B (versions are content hashes).

- **The Stacks Project's tags** (read: stacks.math.columbia.edu/tags). This is the closest precedent in a living mathematical corpus:
  - "each of these gets a tag which will always point to the same mathematical result";
  - "These tags don't change even if the item moves within the text";
  - "we will **never change the tag**";
  - for a result found to be wrong, "we may remove it from the project … However, we will keep the tag, and there will be an explanation for its disappearance."

  That is A1's identity binding plus the old-slug-to-fate mapping, in a mathematics corpus with many contributors, run since 2005 or so (the start year is recalled). Their tags are opaque and meaning-free, by design. ASF's slugs are meaningful, which is why renames happen at all. That choice is worth making consciously, since meaningful names guarantee rename events, and opaque ones mostly avoid them.
- **OBO Foundry term stability** (read: principle FP-019).
  - "The definition of a term MUST always denote the same thing(s)". If the meaning changes, "a new term MUST be created with a new IRI and the new definition". Clarity edits are allowed only "if referents don't change".
  - Obsolete terms carry `replaced_by` (exact replacement) or `consider` (inexact candidates), and an obsolescence reason.

  This is a sharp, decades-tested answer to a question A1 leaves implicit: **when does a revision make a new record?** OBO's answer is: when the referent changes. Applied to ASF, a rewording that changes what a statement asserts is a new record superseding the old. A rewording that clarifies is a new version of the same record. That is a usable test for "the unit with one fate". `replaced_by` against `consider` is the exact-against-inexact split RC1 06 already makes for `restates`.
- **Content-hash identifiers.** Trusty URIs (Kuhn & Dumontier, ESWC 2014; abstract) embed a hash of the content in the identifier, computed on an abstract form so reserialization doesn't change it. This corroborates Part B's "versions are content hashes". The lesson worth taking is *hash the normalized form*, so formatting churn (an md-press unwrap, say) doesn't mint new versions and lapse checks. This connects to §4: what a check binds to should be the hash of a normalized projection.
- **Identity links overused.** Halpin et al., "When owl:sameAs Isn't the Same" (ISWC 2010; abstract): sameAs is used under "many mutually incompatible intuitions" that "almost always violate" its strict semantics. Taken transitively, it merges distinct things. This corroborates RC1 06's refusal to chain near-restates, and the crossing outcome "duplicate", which should never be a transitive merge.
- **FRBR/LRM** (Work / Expression / Manifestation / Item) was covered by the 2026-08 survey. It maps onto record / content version / rendering (file, section) / copy. The plan's "manifestation" is already the LRM word.

---

## 9. Knowledge graphs proper: what they have learned that the plan should keep

**Bears on:** A0 and A2 (aspect = value, basis, certainty), A2 graduation, A6 (exploration state; delete-test), RC1 07 (declared ignorance), the storage choice.

1. **Make every aspect value a uniform statement object from day one.** Knowledge graphs spent about 25 years on attaching metadata to single statements: RDF reification, n-ary relations, singleton properties, named graphs, RDF-star. Hernández, Hogan & Krötzsch benchmarked all four on Wikidata (SSWS 2015; abstract). RDF 1.2's *triple terms* and *reifiers* are still a Working Draft as of the most recent draft I found (5 December 2025). Wikidata's answer is the durable one: *every* statement is an object carrying value, qualifiers, references and rank, whether or not it currently has any.

   The plan's graduation ladder says "Hardness is a property of each *value* … the same aspect can be a label on one record and procedural on another". That's right as epistemics. As *representation* (inference), the knowledge-graph lesson is that it should not change shape as it graduates. A label-level aspect value should already be the same statement object as a reified one, with empty basis and procedure slots. Graduation fills slots; it never migrates representations. Otherwise every consumer must handle four shapes for one aspect, and every graduation is a schema migration across the log. Level 3, "reified: the aspect becomes a record of its own kind", is the one real shape change, and it can be a statement object gaining a record binding.
2. **Rank is a decision; references are evidence.** Wikidata keeps "which value is preferred" (rank) apart from "who says so" (references). The 2026-08 survey verified this (Help:Ranking). It is A0's decision/truth-claim split, in the largest public knowledge graph. Corroboration.
3. **Unknown and none are positive statements.** Wikidata (read: Help:Statements): "unknown value" for Shakespeare's birth date is "a positive statement that that information has not been preserved". "No value" for Elizabeth I's children is "a positive statement that she had no children". Both are distinct from a missing statement. This is RC1 07's declared-ignorance vocabulary, and RC1 08's decline-event, in production. The design point it supports: *absence of a statement must keep meaning "nobody has said", and the other two need their own statement forms.*
4. **The open-world assumption is the knowledge-graph default, and the plan needs the opposite.** Hogan et al., *Knowledge Graphs* (ACM CSUR 54(4), 2021; read): under OWA "we cannot be certain that this relation does not exist", whereas under CWA "what is not known is assumed to be false". OWL adopts OWA and no-unique-name. The survey names *Local Closed World* as the middle ground. The plan's whole absence semantics needs closed-world semantics *over the trail*: "absence means unrun", "unread is a query", the delete-test computed. The world the trail describes (ASF's mathematics) stays open. So it's a local closed world scoped to the log (inference). Concretely: if v2 ever borrows RDF or OWL tooling, or exports into it, the closed-world scope must be declared, or every "no event" will read as "unknown" downstream.
5. **Completeness statements** (Darari, Nutt, Pirrò & Razniewski, ISWC 2013; abstract). These are declarations that a source is complete for some pattern, used to certify that a query answer is complete. The COOL-WD tool later collected more than 10,000 such statements for Wikidata. A6's "a source retires when every chunk is terminal" and "exploration state … unread is a query" are completeness claims. The established form is a declared completeness statement per source and pattern, which is what lets "every chunk of S is terminal" be certified rather than merely observed to have no counterexample.
6. **Don't make a triplestore the engine** (inference). Knowledge-graph reasoners compute monotone entailment under OWA. v2 computes non-monotone, as-of standing under a local CWA, with evidence algebra. Use knowledge-graph forms where they are strong: interchange and export. PROV-O for events, activities and agents fits naturally, since CC_AGENT's `parent=` is PROV's `actedOnBehalfOf`. The nanopublication shape (assertion / provenance / publication info) suits emitting records to other stores, A6's open "efflux" question. Both are verified in the 2026-08 survey. Notably, both exclude confidence from their schemas, so the plan's epistemic layer would ride alongside them, not inside.

**Where I looked and found nothing to take:** knowledge-graph embeddings and link prediction. They could generate candidate *places to look* for A4b (likely-missing `depends:` edges), but only as obligation generators, never as evidence, under the substitution law. The plan's description-style references already cover that need without learned models. I'd defer it until there is a demand.

**A near precedent worth a look:** the Lean *blueprint* used by large formalization projects (secondary sources only). It is a mathematical corpus as a dependency graph whose nodes show *statement* status and *proof* status separately (Verso's version: "border shows statement status, fill shows proof status"). Dependencies are declared with `\uses`, and contributors work in parallel. It is the nearest living cousin of an ASF segment with separately laddered sections. It also shows the next rung up for `evidence/derivation`: machine-checked, where declared dependencies can be compared against the checker's actual ones.

---

## 10. What is genuinely different, and why it holds

In none of the fields above did I find the following. They are why the plan is not a reinvention, and they are where its novelty claim should rest:

- **The substitution law and dimension orthogonality**, as a *checkable* property of a definition. Assurance 2.0 says confidence is not one number. GRADE separates certainty from recommendation. No system I found makes "no dimension's value ever substitutes for another's" a lint over its rule language.
- **The commitment law**, which counts a check only if its criterion was committed before the outcome. Pre-registration exists in empirical science, but none of the knowledge-graph, reason-maintenance, truth-discovery or assurance systems record *when the criterion was fixed relative to the outcome* as part of an event.
- **Actor independence and descent as first-class trail data, consumed at projection time.** Truth discovery *infers* dependence after the fact. The plan *records* it. Dawid–Skene *assumes* independence. The plan *refuses to assume* it.
- **Importance as always *for* a target, deciding the unity a close requires.** Carneades-style argumentation has per-issue proof standards (recalled, unchecked). Nothing I found ties the required proof standard to computed reach for a named consumer.
- **Under-recording priced as equal dishonesty, with decline-events.** Wikidata's novalue/somevalue are the closest neighbors, but they describe the world, not acts that were considered and declined.

---

## 11. Things in the plan unrelated to knowledge graphs

- **A2's likelihood-ratio paragraph** (§5b above): a finding rate is not a likelihood ratio, and calling likelihood ratios "priors" undoes the prior/likelihood separation the same paragraph cites. This would mislead whoever builds the projection.
- **Cycles in support** (§2.3): composites whose introductions depend on later segments, and notation groups that cut across, guarantee cycles. A2's projection must say least or greatest fixpoint, or ground cycles explicitly. Nothing currently does.
- **vsect 0.1's transitive lapse contradicts RC1 06**, which grants transitivity for notification only (§4). PLAN.md's Part B inherits "a check binds to its basis" without saying *direct* or *transitive* basis. This is worth settling before step 2, since it decides the event schema.
- **Part D's monotone assumption** guarantees termination but not the order-invariance RC1 04 requires (§3.1). The repair is cheap: require that rules be monotone functions, and check it by stratification.
- **"As of a moment"** throughout Part A and RC1 11 needs a second clock before late recording or corrections are designed (§7).
- A small one: A7 uses Kendall's τ for "claimed against established strength" across ladders. τ needs every record to have a position in both orderings. Ladders with off-ladder terminals (refuted, not-proven; the 2026-08 survey's L6) will need a declared placement or exclusion, or τ will silently drop them.

---

## 12. Scope honesty: what I did and didn't do

- **I read in full:** PLAN.md, RC1, the 2026-08 survey's index and reassembled model, and the relevant passages of the build-systems paper, the Hogan survey, Jøsang's fission paper, the Stacks tags page, OBO FP-019, Wikidata Help:Statements, and the Assurance 2.0 abstract.
- **I did not read the bodies of:** Doyle, de Kleer, Dong 2009, Dawid–Skene, Green et al., Gupta et al., Ross–Sagiv, Darari et al., KBT, Halpin et al., or Greg Young's book. Claims resting on them are at abstract grade, as marked. The TMS well-founded-support point is recalled. **If one thing should be verified before it shapes v2, it is §2.** Of everything here it carries the most structure on the least primary reading. A read of de Kleer 1986 §§1–4 would settle it. The dekleer.org PDF did not extract cleanly through search.
- **I did not read:** the 2026-08 survey's other nine sweeps (only the index, the model, and the RDF entry); relata's code or the `form-evidence-ledger` canon row itself (only the transfer map's account of them); the verisectorium theory store; the councils work.
- **Not covered at all:** argumentation frameworks beyond what RC1 06 already adopted (Carneades' proof standards look relevant to importance-indexed unity and are unchecked); ontology-evolution literature (Stojanovic, Noy & Klein), which may bear on system episodes; bidirectional transformations, which may bear on renderings checked against the log.
- **Descent caution, in the plan's own terms:** this is one mind's survey in one session. Where several fields "converge" on a plan element here, they are independent of the plan, but my *selection* of them is not independent of my reading of the plan. The sources are unseeded. The mapping is mine.

## 13. Feedback on the brief

It worked well. The location pointer to the 2026-08 survey saved real work: knowing it covered status vocabularies is what told me to spend my effort on dynamics. The one thing I'd have wanted earlier is vsect 0.1's measured costs (the 36-version basis, 3 of 120), which turned an abstract import into a concrete one. They are in `~/src/verisectorium/.archive/prior-vsect/README.md` and `MATURATION-PLAN.md`, and a pointer to them as "what's built and measured" would help the next researcher. Joseph's framing ("knowledge graphs") was a good door, even though the room behind it turned out to be reason maintenance.

---

## Sources

| Source | Grade | Used in |
|---|---|---|
| Mokhov, Mitchell, Peyton Jones, "Build Systems à la Carte", ICFP 2018 — [PDF](https://www.microsoft.com/en-us/research/uploads/prod/2018/03/build-systems-a-la-carte.pdf); JFP 2020 version [PDF](https://www.microsoft.com/en-us/research/uploads/prod/2020/04/build-systems-jfp.pdf) | read (ICFP text: Def. 2.1, §2.3, §4.2.2–4.2.4) | §4 |
| Hogan et al., "Knowledge Graphs", ACM CSUR 54(4), 2021 — [arXiv 2003.02320v6](https://arxiv.org/abs/2003.02320v6) | read (§3.3.2–3.3.4, §4.1.1) | §5c, §9 |
| Jøsang, "Fission of Opinions in Subjective Logic", FUSION 2009 — [PDF](https://mn.uio.no/ifi/english/people/aca/josang/publications/jos2009-fusion.pdf) | read (cumulative vs averaging passage) | §5a |
| Stacks Project, tags — [page](https://stacks.math.columbia.edu/tags) | read | §8 |
| OBO Foundry principle FP-019, term stability — [page](https://obofoundry.org/principles/fp-019-term-stability.html) | read | §8 |
| Wikidata, Help:Statements — [page](https://www.wikidata.org/wiki/Help:Statements) | read | §9 |
| Bloomfield & Rushby, "Assessing Confidence with Assurance 2.0" — [arXiv 2205.04522](https://arxiv.org/abs/2205.04522) | read (abstract) | §6 |
| de Kleer, "An Assumption-based TMS", *AI* 28:127–162, 1986 — [PDF](https://www.dekleer.org/Publications/An%20Assumption-Based%20TMS.pdf) | abstract (labels, environments, nogoods via secondary) | §2 |
| Doyle, "A Truth Maintenance System", *AI* 12(3):231–272, 1979 — [aitopics record](https://aitopics.org/doc/classics:CA80645E); [Temple TMS notes](https://cis.temple.edu/~giorgio/cis587/readings/tms.html) | abstract; well-founded support **recalled** | §2 |
| Dong, Berti-Équille, Srivastava, "Integrating Conflicting Data: The Role of Source Dependence", PVLDB 2(1), 2009 — [PDF](https://lunadong.com/publication/dependence_vldb.pdf) | abstract | §5a |
| Dawid & Skene, "Maximum Likelihood Estimation of Observer Error-Rates Using the EM Algorithm", JRSS C 28(1):20–28, 1979 — [RePEc](https://econpapers.repec.org/RePEc:bla:jorssc:v:28:y:1979:i:1:p:20-28) | abstract | §5b |
| Green, Karvounarakis, Tannen, "Provenance Semirings", PODS 2007 — [PDF](https://www.cs.ucdavis.edu/~green/papers/pods07.pdf) | abstract | §5c |
| Dong, Gabrilovich et al., "Knowledge-Based Trust", PVLDB 8(9), 2015 — [arXiv 1502.03519](https://arxiv.org/abs/1502.03519) | abstract | §5d |
| Gupta, Mumick, Subrahmanian, "Maintaining Views Incrementally", SIGMOD 1993 — [researchr](https://researchr.org/publication/GuptaMS93) | abstract | §4 |
| Ross & Sagiv, "Monotonic Aggregation in Deductive Databases", PODS 1992 / JCSS 1997 — [PDF](https://static.aminer.org/pdf/PDF/000/545/459/monotonic_aggregation_in_deductive_databases.pdf) | abstract | §3 |
| Stable models, even/odd loops through negation — e.g. [arXiv 1402.5436](https://arxiv.org/pdf/1402.5436); [Costantini et al.](https://userweb.fct.unl.pt/%7elmp/publications/online-papers/MH-chapter.pdf) | abstract / standard theory | §3 |
| Goodenough, Weinstock, Klein, "Toward a Theory of Assurance Case Confidence", SEI 2012 — [KiltHub](https://kilthub.cmu.edu/articles/report/Toward_a_Theory_of_Assurance_Case_Confidence/6585362/1); Diemert et al. — [JSS](https://jsystemsafety.com/index.php/jss/article/view/215) | abstract / secondary | §6 |
| Suspect links in DOORS — [IBM tutorial](https://www.ibm.com/docs/SSYQBZ_9.7.1/com.ibm.rational.doors.tutorials.doc/topics/abstract_linksandtraceability.html); [Jazz forum on clearing](https://jazz.net/forum/questions/198226/when-something-has-suspicions-we-can-clear-a-single-suspicion-which-we-understand-or-we-can-clear-all-suspicions-for-the-artifact-which-we-understand-but-what-does-clear-for-profile-do) | community-reported | §6 |
| XTDB, "Time in XTDB" — [docs](https://docs.xtdb.com/about/time-in-xtdb) | docs excerpt | §7 |
| Datomic, reified transactions — [blog 2015](https://blog.datomic.com/2015/12/reified-transactions.html); [data model](https://docs.datomic.com/data-model.html) | docs excerpt | §7 |
| Young, *Versioning in an Event Sourced System* — [Leanpub](https://leanpub.com/read/esversioning); [InfoQ](https://www.infoq.com/news/2017/07/versioning-event-sourcing); [Arkency](https://blog.arkency.com/4-strategies-when-you-need-to-change-a-published-event/index.md) | outline / secondary | §7 |
| Kuhn & Dumontier, "Trusty URIs", ESWC 2014 — [arXiv 1401.5775](https://arxiv.org/pdf/1401.5775) | abstract | §8 |
| Halpin et al., "When owl:sameAs Isn't the Same", ISWC 2010 — [Springer](https://link.springer.com/doi/10.1007/978-3-642-17746-0_20) | abstract | §8 |
| Hernández, Hogan, Krötzsch, "Reifying RDF: What Works Well With Wikidata?", SSWS 2015 — [PDF](https://ddll.inf.tu-dresden.de/w/images/5/52/Hernandez-Hogan-Kroetzsch-RDF-reification-evaluation-SSWS2015.pdf) | abstract | §9 |
| RDF 1.2 Concepts, W3C Working Draft 2025-12-05 — [W3C](https://www.w3.org/TR/2025/WD-rdf12-concepts-20251205/) | listing (status only) | §9 |
| Darari, Nutt, Pirrò, Razniewski, "Completeness Statements about RDF Data Sources", ISWC 2013 — [PDF](https://www.inf.unibz.it/~nutt/Publications/13-iswc.pdf) | abstract | §9 |
| Lean blueprint dependency graph — [Verso blueprint](https://leanprover.github.io/verso-blueprint/test-blueprints/preview_runtime_showcase/html-multi/Dependency-Graph/); [Zulip](https://leanprover-community.github.io/archive/stream/423402-PrimeNumberTheorem+/topic/Blueprint.20colors.html) | secondary | §9 |
| The 2026-08-10 external-ontologies survey (PROV-O, nanopublications, Wikidata ranks, FRBR/LRM, SKOS) — `~/src/verisectorium/.archive/prior-incarnation/theory/influx/segment-research/external-ontologies/` | as graded there | §8, §9 |
