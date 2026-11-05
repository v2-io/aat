# The plan: v2, verisectorium's template, and ASF as the first store

*Status: working plan, 2026-11-04. Written by councils-46 (Claude Opus 5.5) from a day's dialog with Joseph. **Proposed throughout**, except what is quoted from Joseph, which is his. It replaces, as the place where the plan lives:*
- *`asf-earlier-vsect/KERNEL.md` (draft 3) and `vsect-lexicon.md`. Both are folded in here, as the README asked;*
- *`~/src/verisectorium/SCRATCH-for-joseph.md` §§1–7;*
- *the ASF system model, iterations 1–2 (`asf-system/`). That was a flow sketch, not a definition; its renderer is kept as a smoke test.*

*`verisectorium-review/recommendation.md` stays the list of what to promote from the prior incarnation.*

*How to read it:*
- *Part A is the model as we now understand it, built from the primitives in A0.*
- *Part B is who owns what.*
- *Part C is the steps.*
- *Part D lists the assumptions and open questions, so none of them hardens silently.*

*RC1 means `~/src/verisectorium/.archive/prior-incarnation/theory/influx/segments-model-rc1/`, the epistemic core this builds on. Read it whole before arguing with Part A. Its 01–04, 07, 08 and 11 are what the kernel drafts missed.*

---

## Part A: The model

### A0. The primitives everything is built from

- **Truth claim.** An assertion whose standing is a **certainty**, earned from accumulated evidence (RC1's `evidence/*` lines) and lowered by refutation or lapse.
- **Decision.** A choice at a branch point whose standing is its **backing** (RC1's `decision/*`: grounds, consultation, accountability, falsifiers) and the importance it was made at, *for* a target.
- **Attested fact.** Asserted and checkable, but carried without a trail: agent ids, dates. The floor where recursion stops.
- **Attribute.** A deterministic measurement, with no standing at all: a formula and the moment it was computed.

**Everything else is composed of these:**
- an aspect's value is a truth claim ("this section is stale", "this result is novel"), a decision ("treat it as provisional for now"), or both;
- importance is an attribute (reach, for a target) plus a decision (the stakes);
- a composite's coherence is a truth claim about the whole;
- a rule is a decision whose application is computed.

**Certainty is always recorded separately from the value it qualifies.** An aspect carries a value, a basis, and a certainty:
- `novelty: high` · basis: decided, label by X · certainty: low. X gave it in passing, with no literature search behind it.
- `novelty: high` · basis: decided, label by Y · certainty: moderate. Y gave it after a literature search. Same value, same graduation level, different certainty.
- `relative freshness: darn fresh` · basis: rule `freshness@v3` over the attribute recency · certainty: high that the rule was applied correctly. Whether the rule itself is a good measure of freshness is a separate decision, with its own backing.

Certainty is its own recorded value. It is never inferred from the value, from the basis, or from how far the aspect has graduated. A label can be held with moderate certainty, and a procedural value can be held with low certainty if its procedure is untested.

A value never stands in for its certainty, just as RC1's substitution law keeps one dimension from standing in for another. Graduation (A2) is about *how* a value is produced. Certainty is about *how strongly* it is held. They move separately.

### A1. Records, identity, composites

- **A record is the unit with one fate:** anything that can be refuted, superseded or ratified while its neighbors carry on. That is RC1's record, and the archived design's statement, and today's "atom": one thing under three names. **Record** is the word here.
- **Identity is a maintained binding, not a filename** (RC1 11). A name is a label with a history; a rename is an event, and old names keep resolving. A record's manifestation (a file, a section, a span) is not its identity. The old-slug → fate mapping is a projection over rename events.
- **A composite is a record in its own right** (RC1's *reify*). A segment, as ASF knows it, is the case Joseph described: sections that are separately laddered, possibly under different rules, but which make sense only together.
  - Its **basis** is its sections, plus the neighbors it declares.
  - It has an aspect of its own, **coherence**: does this hold together, read as a whole? A whole-document review moves it, and that review binds to the exact versions of every section.
  - A change to any section's content lapses the composite's coherence.
  - **Ratifying a section can be guarded on its composite's coherence holding at current versions.** That is "one change forces a look at the whole, and its neighbors, before ratification", expressed as a lapse and a guard. The sections remain separate records.
- **Composites nest, and the nesting is neither a strict tree nor strictly forward.** In ASF the levels are: a segment {statements, derivation, intro prose, …} → chapters and appendices → parts → volumes → the theory. Each level is a composite with its own coherence.
  - **Dependencies run mostly backward, but not only.** A segment requires earlier ones. But an introduction depends on later segments, and a notation or cross-cutting group cuts across the hierarchy. So groupings may overlap.
  - **A dependency carries a predicate:** on content alone, or on content with some aspect at a threshold ("rests on #x with certainty at least re-derived").
  - **Upward lapse is a declared rule, not automatic.** A section's change lapses its segment's coherence. Whether that in turn lapses the chapter's coherence depends on a rule: for instance, only when the segment's headline claim changes, or its certainty crosses a band. Without such rules, every edit would lapse the whole theory.
- **Composition has three honest shapes, plus one exemption** (RC1 03 and 11):
  - **reify:** a composite becomes a record, as above;
  - **cluster:** typed parts under one identity, each with its own write rules (body, working notes, events, companions);
  - **arrangement:** an ordering that adds no claims, such as an outline or the order of a segment's sections. It is authored, so it is a record, but it carries no warrant of its own;
  - **exempt, visibly:** archives, staging.

  The named pathology is the undeclared mixed composite: part claim, part decision, part history.
- **The specimen that makes this concrete:** `def-agent-environment`'s Working Notes hold six different fates under one heading. Proposed teaching, proposed body text, open questions, reader confusions, figure ideas, and material belonging elsewhere. Each would be moved by a different mover (`SCRATCH-for-joseph.md` §3 has the table).

### A2. Standing: what moves, and what sustains it

**Three things can move** for any record:
- its **content**;
- what it **claims**: declared form, register, scope;
- what its trail has **established**: computed standing.

Adjudication starts from a mismatch between claimed and established. It repairs in one of three ways:
- **secure:** a recorded act raises what is established;
- **revise the content** so it can earn the claim. This resets the standing the edit invalidates, which restarts those ladders;
- **lower the claim:** last (strengthen-before-soften), and by replacement, never by keeping a softened ghost.

**Aspects are values on a record, sorted by what sustains them** (Joseph's sort, one step more abstract than RC1's sort by what falsifies):
- **evidenced:** a truth claim with accumulated evidence. This is certainty: RC1's `evidence/*` lines (derivation, in-vivo, wild-empirical, instance, testimony, carriage), each with its own ladder;
- **decided:** at a branch point, on a basis, by accountable parties. RC1's `decision/*`: grounding, consultation, accountability, falsifiers;
- **attested:** asserted and checkable, but deliberately not carried with a trail: agent ids, dates, the steward at the time. **This is where recursion stops**, by design. It is RC1 08's trusted base.

Many aspects mix these. A warrant is itself a truth claim with a certainty.

**Certainty is computed, by a declared weight-of-evidence projection** (proposed; not yet discussed in depth). A truth claim's certainty is never typed. It is computed from its evidence events, each of which records:
- its line;
- its rung;
- its outcome: confirmed, narrowed or broken;
- whether its criterion was committed before the outcome was seen;
- who did it, and what they had read.

The natural form is weight of evidence in Good's and Turing's sense: log-likelihood ratios that add up.

**They add only across evidence that is independent.** RC1's coherence default is the rule that enforces this. Agreement adds weight only to the degree that descent is shown to be cut. Within one line of descent, the strongest item counts and repeats add nothing. Several things then follow:
- **Contributions with no evidential force count as zero.** A self-check found nothing in 116 of 116 (likelihood ratio about 1). A check whose criterion was set after the outcome is likewise excluded, by the commitment law.
- **A refutation is not a large negative weight.** A rebut caps the claim, and it becomes a no-go.
- **Strength does not travel up `supports` chains** (RC1 06). A dependent is bounded by its weakest necessary premise, and a weakened premise undercuts it.

**The likelihood ratios start as estimates and are measured from the trail.** They are not priors: a claim's prior is a separate quantity, and keeping the two apart is the point of the ledger cited below. A likelihood ratio needs a check's error rates: how often it finds something when there is a defect, against how often it does when there isn't. The trail's rates are not that. A first independent check finds something about 42% of the time (65 of 153), but that's a finding rate. The established way to estimate error rates when the true answer is never observed is Dawid–Skene (1979). This was flagged by the knowledge-graphs research, `research/knowledge-graphs.md`; I haven't checked it myself. The concordance between claimed and established strength (A7) checks calibration over time. Because every contribution is a recorded act, this computation raises certainty only through acts, which is consistent with the monotone assumption.

**Unread prior work that bears directly on this:**
- the canon row `form-evidence-ledger` ("status is a projection of an evidence ledger + event trail; priors separate from likelihoods; single decision rule, no points-tangle", carried over from relata);
- relata's shipped verification scheme;
- `theory/influx/synthesis/relata-methods-for-verisectorium-2026-08-05.md` (433 lines; the influx index calls its transfer map "the largest unabsorbed body").

Read these before designing the projection.

**Importance is an aspect, and always *for* a target:** a purpose, a decision, a consumer. Its basis is computed reach (what rests on this, for that target) plus decided stakes (how much that target matters). A record has no importance in general, only importance-for.

**RC1's other dimensions,** placed in this sort:
- **Freshness:** mostly rule-driven over attributes.
- **Conviction:** evidenced; builds and tests.
- **Efficacy:** evidenced; recorded firings. Possibly soft early on.
- **Fidelity:** attested at capture; corroboration is evidenced.
- **Comprehension:** starts soft, hardens through reader events.
- **Disposition:** mostly decided. It is routing.

RC1 states its set is not complete. Importance and coherence are this plan's additions.

**Attributes are deterministic measurements, not aspects.** They come from three places:
- content: word count;
- the trail: age, recency, change heat, who has touched it;
- the graph: coupling, reach.

Each has a declared formula and is computed as of a moment. It has no warrant beyond that, and it never goes stale; only the aspects that use it lapse. Changing a formula is a system decision.

**Rules turn attributes into an aspect's bands.** For example, relative freshness = recency ÷ …, thresholded. A band crossing is a deterministic event that names the rule and its version: `{from: "darn fresh", to: "lil'bit stale", by: <rule@version>}`. It ripples through `caused-by` into every aspect whose basis names this one. Novelty's certainty, for instance, may name the freshness of its literature search. **This is where the flow model's "mechanical stations" belong:** they are rules in the definition, firing as events.

**Graduation: one ladder for every aspect.**

| Level | What exists |
|---|---|
| 0. label | a value and who gave it |
| 1. ruled | produced under a declared rubric; the rubric is a record |
| 2. procedural | produced by a declared procedure whose runs are events bound to a basis; lapses when the basis changes |
| 3. reified | the aspect becomes a record of its own kind, with content (for novelty: near neighbors, search dates, the deliberations), the original subject as prerequisite, and aspects of its own (freshness, completeness, certainty) |

At level 3, the aspect's own aspects start again at level 0. That is the recursion. It stops in two places:
- **Demand.** An aspect graduates only when its failures need their own repair: RC1's admission rule, reused.
- **The attested floor.**

Hardness is a property of each *value*, not of each aspect type. The same aspect can be a label on one record and procedural on another.

### A3. Decisions come in four kinds

Separated by what they are about. Conflating them has happened repeatedly, the kernel drafts included.

| Kind | About | Examples | Recorded as |
|---|---|---|---|
| **domain** | the subject itself | udon's syntax choices; vivarium's architecture; an ASF modeling choice | a record, with `decision/*` ladders; claims resting on it say so |
| **interior** | one record's state | keeping a label after a rewording; sending two spans of an influx file to a sink; declining to lift | an **event** on that record, bound to a version, not a record |
| **work** | where effort goes | "concentrate the spikes on this scope for now" | a routing fact with a target and usually an expiry |
| **system** | how the store works | admitting a kind; "slugs are free, publish a mapping" | an edit to the definition at stage 0; an admission later |

**The test,** asked of an outcome: if it went the other way, what would change?
- what ASF *asserts*: domain;
- only a record's state: interior;
- only what is worked on next: work;
- how the store works: system.

In ASF, one deliberation often produces several kinds at once. Record each as what it is, linked by `caused-by`.

**Interior acts are escalated by importance, not by type.** The same act (a confirmation, say) needs more independence at a root with 245 dependents than at a leaf. The act's importance is its record's importance *for* what rests on it.

### A4. Movers, and where councils fit

- **A transition is a mover:** it moves one named dimension of one kind along its ladder, through a named, signed channel. Refutation is a first-class result. A transition declares:
  - the dimension it moves;
  - its guard (it may read projections and attributes);
  - its evidence requirement;
  - what its close writes;
  - its decision-maker slot.
- **Who fills slots is decided later.** Joseph's words: *"treat each vsect transition-edge as a queue that is drained by a 'decision-maker' and not specify a council or agent etc."*; *"especially not initially."*
- **Kinds of mover, from cheapest up:**
  - **rules:** deterministic band crossings and lapses, as in A2;
  - **single minds:** securing acts (re-derive, run, read-check), revisions, crossings;
  - **councils.**
- **If most ladders are computed or settled by individual securing acts, councils are for what is irreducibly judgment:**
  - decisions and ratification (`decision/*`);
  - a composite's coherence;
  - importance assignments, with their targets;
  - tensions (two well-supported claims);
  - reframing, when a breaker halts an episode;
  - batch dispositions;
  - tribunals, which move evidence: their close writes evidence plus a process decision.
- **A charter is derived from the transition it drains, not designed separately.** Joseph: *"the vsect type … will be developed hand-in-hand with what kind of council outcomes are meaningful for the record."* What a charter's latitude depends on:
  - **which dimension is moved,** which decides what the close must write;
  - **importance-for-target,** which decides the unity required: *"There is different level of unity required for different levels of importance"*. An "object" blocks a close where unanimity is required, including on an epistemic label. A bike-shed can proceed over "object" but not over "strongly object";
  - **seats:**
    - representative, where the body must be accountable;
    - perspective (duck-typed);
    - standing expert, re-forked, never substituted: a primary expert, adjacent experts, cross-cutting experts;
  - **tiers:** full member, discussant, preparer, consulted expert;
  - **non-response:** a unanimity council never shrinks;
  - **no confidence:** to a higher body;
  - **a meta-feedback channel to the charter record;**
  - **self-councils,** whose output is the agent's own decision.
- **The procedure** is `~/src/arch/msc/councils/generic-collab-council.md` (v2). Joseph's loop: presenting the topic without a solution, a sealed expected solution held by the leader, blind first responses, shuffled second responses, a unity report, then the finish form with sustaining levels. The walking skeleton's lessons apply to whatever runs it:
  - a seat is a lease with one holder;
  - per-member state lives with the holder;
  - rounds wait on submissions, never on deliveries.
- **Unity on importance can come before unity on truth.** Importance is itself decidable, and revisable.

### A4b. Change obligations: rules that ask questions

Most higher-order rules, and probably many lower-order ones at first, will act less like guards that pass or fail and more like a business-rules engine that **generates obligations** for a proposed change. They take three forms:
- **Invariants to keep:** "this change must leave X unchanged."
- **Places to look:**
  - "Have you checked adjacent segments for this?"
  - "Are you sure this hasn't also changed such-and-such?"
  - "Does this Part I change require changing the SVG metaphor in the introduction?"
- **Ancillary evidence to gather before a decision.** For example, a preparer agent lists the non-adjacent segments that mention a term without depending on it, as input to deciding whether they need checking before the chapter is declared coherent. That list is a *description*-style reference (RC1 06 and 11), run at that moment.

How obligations work:
- They attach to the episode.
- Each is discharged by a recorded act: a check, a preparer's report, or a decision that it doesn't apply.
- The episode's commit guard, and any ratification of a composite's coherence, require them all discharged.
- A rule that generates obligations is itself a decision in the definition (the system kind). It can graduate like an aspect: from a checklist line, to a rule with a matcher, to a procedure with its own record.

### A5. Global stability: episodes, ripple, and the breaker

- **A stable store is at a fixed point:** no rule would fire, and nothing demands work, as far as we know.
- **A perturbation opens an episode on a branch.** Perturbations include new audit findings, a new paper, a decision point reached, a new module. The episode's scope starts at the perturbation's computed reach and grows as ripples land; the growth is itself a signal. The store, or the affected subgraph, is **unstable** while the episode is open.
- **Inside the episode:**
  - proposed changes ripple through the model;
  - rule-driven changes settle;
  - the rest lands in the queues for minds and councils: checks, proposals, batch decisions, deeper cycles such as a spike;
  - discoveries outside the scope go to the general influx, **carrying a condition** ("applies only if this changeset commits"), so an abort can't leave them acted on as if it hadn't happened.
- **The episode is the atomic changeset.** It ends in one of three ways:
  - **commit:** every branch event re-validated against main; the commit guard is the coherence of what it touched;
  - **abort:** nothing changes;
  - **halt.**

  This is RC1's open fork 6, EPISODE. The field trial, and live_docs' session-scoped trail with per-record history as a projection, are the evidence that the trail's primary grain is the episode. **SPECIMEN #3 decides it:** one edit to an ASF root segment, worked whole.
- **A breaker counts generations per kind of finding,** from `caused-by`. Per kind, because raw counts fire on restatement churn while the mathematics holds. When generations stop shrinking it halts the episode and convenes a council over the whole picture. The council's outcomes:
  - keep running, with a higher limit;
  - surgery: split the changeset;
  - reframe: a conflation of terms or a fused dimension, so split it;
  - a **tension record:** two well-supported states held, not oscillated between;
  - or the definition itself is wrong ("Newton learning Relativity"). That opens a **system episode**: change the definition, then re-evaluate everything under it.
- **Episodes whose scopes overlap** are merged, or one waits. Overlap is computed from scopes.
- **The judgment loop is where ρ lives:** revise → check → finding → revise. Measured from the sprint: about 1.3 as run, about 0.6–0.8 with one independent check per landing. The land-only experiment measures it properly. The flow model (`foundations/asf-flows.md`) is an *analysis over the trail*, not part of the definition.

### A6. Intake, membranes, and what leaves

- **Nothing writes the population directly.** Joseph: *"AGENTS SHOULD NOT BE ABLE TO GO IN AND MANUALLY CHANGE CANON OR ATOMS. ONLY THROUGH VSECT!!!"* The canon's `form-influx-membrane` is the same law, written earlier.
- **Sources are cut into chunks.** RC1 and the kernel drafts call a chunk a "unit". Each chunk is crossed exactly once, to one of:
  - a state change on a record;
  - already present;
  - duplicate;
  - superseded;
  - rejected (the submitter erred);
  - needs-review (honestly unsure);
  - delivered elsewhere.

  A source retires when every chunk is terminal. That is the delete-test, computed.
- **Exploration state is recorded from the first act:** whether each source has been read, by whom, at which version, and how far each chunk has got. Unread is a query. The sprint's influx maps lacked this, and that is why it stopped.
- **Each legacy store gets a dialect declaration:** data saying what its files, frontmatter, tags and sections meant. ASF's `status:` is a hand-set word, so it arrives as testimony at the lowest rung. The intake is a mode of v2, needed for every older verisectorium (vivarium, relata, comproprium, terminology, the udon reference defs, AISI, limen).
- **Every store has designated influxes** (the realization model's triplet):
  - **canon,** whose base material is "payload-sidecars with inferred items, one item per doc";
  - **lexicon;**
  - **SOP,** with the **meta-feedback channel** (self-governance realized) and the **upgrade channel** (`v2 reinit`);
  - plus a history layer.

  In ASF's case the SOPs may live as records of the system definition. That is Joseph's suggestion.
- **What leaves:** the canon's word is *efflux*. The name for deliveries into sibling stores is still open. Not "set aside", which is a sink word for a delivery.

### A7. Fitness, concordance and cost: analyses over the trail

- **Fitness aspects.** Readability, teachability, conciseness, coherence, coupling, novelty, impact. These are values on records or composites, with a basis and a certainty like any aspect, often fed by attributes. They graduate like any aspect.
- **Kendall's τ: concordance between two orderings of the same records.** τ needs only orderings, which suits ladders (they're ordinal). Places it applies:
  - **claimed against established strength:** calibration across different ladders without forcing a common scale;
  - **importance against the order work was done:** drain order;
  - **reading order against dependency order:** each discordant pair is a forward reference;
  - **members' rankings:** Kendall's W, the many-rater form, carried in a council's unity report.
- **A cost matrix per ladder.** The cost of moving from rung *i* to rung *j* (a re-derivation costs more than a confirmation), weighed against the importance-for-target of closing that gap. Priority is then importance-weighted gaps priced by that matrix. That's RC1 07's gap economics, made computable.

Like the flow model, all of these are analyses over the trail. None is part of the definition.

## Part B: Who owns what

| Layer | Owns | Changed how, now |
|---|---|---|
| **verisectorium** (`~/src/verisectorium/`) | the general model: RC1, the theory canon, the template and seed records under one `TEMPLATE.outline.md` | by editing and verifying, the old way. v2 does not run on it yet |
| **v2** (the engine and CLI) | invariants; the event log; the definition format; intake; projections and renderings; `init` / `reinit`; checks of the definition itself | by building it, slice by slice |
| **a store's definition** (ASF's in aat-v3) | its kinds and their aspects, its transitions, its rules and attributes, its dialect declarations | hand-written files at stage 0 |
| **the store** (ASF's records) | records, events, trails | only through v2 |

**What v2 keeps from the kernel drafts:**
- the engine is the only writer of records, and every file under the store is a rendering checked against the log;
- the log is append-only;
- versions are content hashes; a check binds to its basis and lapses with the cause named;
- standing is computed, never typed;
- every event carries an attested actor (agent key, parent, type, session; or a tool at a version, the version being its era);
- an act the definition can't express is refused and recorded as a demand;
- every stock has an exit.

**What v2 defers:** the definition held as records. That is stage 2.

**Compiler stages:**
- **0, now:** hand-written definitions in two layers. The general layer is applied by `v2 init` and `v2 reinit` from verisectorium's template; the store's layer is ASF's files.
- **1:** v2 checks the definitions: every kind answers the founding questions; every transition names the dimension it moves; the substitution law holds; no rule cycle runs unsupervised.
- **2:** the definitions become records, admitted through v2's own transitions. v2 may then run on verisectorium itself.

**What survives a blow-away of the backing store: the event log,** replayed under the new definition with a migration step wherever the schema changed. Hand migrations during stage 0 are recorded as migrations.

## Part C: Steps

1. **Promote into verisectorium's template and seed records** what `verisectorium-review/recommendation.md` lists:
   - RC1 whole;
   - the Aug-14 model's uncarried parts;
   - the 19 principle segments;
   - the realization model;
   - ORIENT;
   - the template's two enums;
   - the four layout-bound segments, re-cut (scratch §5).

   Then write `TEMPLATE.outline.md`. Read `theory/influx/verisect-and-ldocs.md` §7 first, because it bears on the trail's grain.
2. **The smallest v2:** the definition format; the event log as primary; `init` / `reinit`; source and chunk with crossing outcomes and exploration state; one record kind with its aspects.
3. **`v2 init` on aat-v3,** with the verisectorium core only (influx, SOP, def, canonical view). Then ASF's dialect declaration, on paper, for Line B's five root segments: `def-agent-environment`, `def-action-transition`, `def-observation-function`, `def-chronica`, `scope-adaptive-system`.
4. **ASF's first hand-written definitions:** only what the five roots demand. Each gap becomes a recorded demand.
5. **Bring the five roots in as sources, cut them, and cross them.** Then:
   - **SPECIMEN #3** (one root edit as an episode), which settles the episode question and whether the store lives in the repo;
   - **RC1 08's auditor walk:** a fresh mind, given only the slice's records and their standing, asked "what should be audited?"

   Then a second slice, chosen by what the first one strained.

**The anchor rule, both directions:**
- no ASF kind without a named specimen and a founding-question justification;
- no change to RC1 or the canon without an ASF specimen that demanded it, or a mark saying it is unexercised.

## Part D: Assumptions and open questions

**Assumptions, each with what would revisit it:**
- **The monotone rule.** Rule-driven changes may only lower, reset or flag; only recorded acts by minds raise a value. Under it the automated layer always reaches a fixed point, and runaway is confined to the judgment loop.
  - *Not an invariant* (Joseph): some deterministic quantities are in principled tension. Coupling and cohesion trade against each other, and finding their balance is a search for an equilibrium; it would be silly for a council to adjudicate each half of an oscillation.
  - The likely replacement is a deterministic equilibrium search run to its own convergence criterion inside an episode, recorded as one act.
  - *Revisit* when the first non-monotone rule is wanted on real material.
- **Hysteresis on bands**, to stop values at a threshold from flapping. *Revisit* if it hides real movement.
- **Councils as movers of judgment-shaped dimensions,** not as general decision-makers. *Revisit* if a transition needs a council for something that isn't judgment.

**Open questions:**
1. Does a change in a section's *standing* alone lapse its composite's coherence, or only a change in its *content*? How does a composite declare its neighbors?
2. Is the trail's primary grain the episode? (SPECIMEN #3.) Does the backing store live in the repo? (The same specimen.)
3. Claim records: one per statement, or one per claim within it?
4. ASF's `disc-*` and `impl-*` segments: teaching, recognitions, or arrangements?
5. The name for deliveries into sibling stores.
6. Whether "computed" ever needs to be a basis for aspects, or stays the attributes underneath them.
7. **The lexicon.** The kernel drafts' lexicon is superseded. Its replacement should be built from RC1's settled words:
   - record, dimension (with namespace), line, mover, channel, ladder, rung, trail, projection, era;
   - binding, dangle, collide;
   - membrane, base material, delete-test, coherence default, commitment law;
   - plus this plan's aspect, attribute, band, graduation, episode, composite.

   It should be built as the template's lexicon store, not as a free-standing file.

---

## Appendix: discussed, but not in this plan

*Things that came up across 2026-11-03 and 11-04 and are not carried above. Some are recorded elsewhere; some may only be floating in transcripts. Listed so they aren't silently lost.*

- **The steward's accountability and veto.** Joseph: *"I'll have ultimate veto power independently because in the eyes of the law and the world I shoulder full actual accountability and reputation for the outcomes."* How that relates to `decision/accountability` and to council closes is open.
- **A council's composition is part of its record.** The diversity of perspectives and underlying models is recorded, "in case there are questions about its outcomes later at a higher level."
- **In-meeting acts:**
  - a research subcommittee that reports back without interrupting the meeting;
  - adding a member with a needed perspective;
  - near-identical motions counting as seconds;
  - follow-up questions to members based on what others said.

  See the councils spikes (`~/src/arch/msc/councils/spikes/`) and the collaborative council file.
- **Decision theory, Joseph, 2026-11-03:**
  - deciding under one regime, even arbitrarily, as the most effective way to gather evidence, with pilots as its routine form;
  - information, importance and decision space evolving together, and going wrong when conflated;
  - fiat by an accountable owner;
  - theorems conditioned on A and on B, the whole never exceeding its weakest link.

  Verbatim in `foundations/research/dialog-for-kernel-2026-11-04.md`, window 1.
- **What a changeset gathers.** It "pulls into its changeset all of the memories of other related/adjacent/historical things," drains several sources at once, and possibly has a specialist do the gathering. What must fit in one mind is the intent, the invariant and the judgment calls, with verified transforms and mechanical checks for the rest. Both are in `foundations/asf-flows.md` §6.
- **Where the store lives.** The README records Joseph's decision: outside the repo, by OS convention, as relata does. He later allowed the repo "only if it doesn't overly complicate … atomically coherent changesets". Part B's replay rule and SPECIMEN #3 should start from that default.
- **The influx inventory as its own first step:** the whole source list from the sprint's maps, with exploration state and read-by / not-read-by. That's separate from crossing the five roots.
- **Decisions lapsing:** assumptions as edges, with a lapse when one changes or the decision's importance-for-target rises (kernel draft 3).
- **The interface:** an `ant`-shaped request on stdin with a structured result (kernel draft 3; the vsect lead's plan-read addendum).
- **Truth as the frame for councils:** unity of purpose; members differ by experience, context, reasoning and angle; divergence means adjudicating truth "from the perspective of the system they know most about." Also high-councils (`~/src/arch/msc/councils/high-councils/`).
- **Reports as records:** v2's projections into the repo, "often recorded as curated collections of atoms", meaning a report can be an arrangement.
