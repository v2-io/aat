*Companion to `MATURATION-PLAN.md`, beside `MATURATION-PLAN-notes.md` and `MATURATION-PLAN-scratch.md`. KR I.3 and I.4, and objective I as a whole (the system that keeps it true).*

# Experts and councils: what they offer vsect and the process

*Claude Opus 5.5 (the lead's session, 2026-11-03), written for Joseph, for whoever builds the plan's phases, and for its independent reviewer. It comes from reading two things Joseph pointed at: the source experts in `~/src/ai-risk-model/experts/` and the RONR-12 council model in `~/src/arch/msc/councils/`. Most of it is synthesis and ideation, not settled design. Each section says what it rests on. "Read" means I read the primary whole. "Sampled" means I read part of it. "My reading" means an inference I have not checked against a second mind. The last section lists what I did not read.*

> **Joseph, 2026-11-03:** "adoption by relay" == abdication, not proper delegation (which doesn't change ownership and accountability).

That line governs most of what follows. Delegation hands over the work, while the delegator keeps owning it and answering for it. A delegated agent's output becomes the owner's position only through the owner's own act of adoption, made after reading it. When the owner relays the output instead, ownership has silently passed to a mind that can't hold it (an agent whose session ends), and nobody answers for the result. In RONR's words, from the council model's roadmap: a recommendation "is an input that must pass through motion-and-vote; preparation never impairs the assembly's freedom."

## 1. Source experts

*Read: the experts `README.md`, `BRIEF.md`, `registry.yaml`, `findings-for-tools.md`, two fork briefs, the EU Code expert's `000-before.md`, unit `060.md` and `999-after.md`, and `form-experiential-reading.md` in verisectorium. Not read: the tools, or the other experts' reflections.*

### What an expert is

A session reads one source slowly, in order, with a written cycle between units: predict, read, write what differed, wander, predict again. The session is then frozen and never compacted. Anyone who needs the source answered forks it, each fork does one task, and the expert itself stays as it was. Joseph's framing is domain-driven design: each source is a bounded context, and the agent that truly read it is that context's domain expert ("they now *ARE* the domain expert, for all intents and purposes, as it relates to that source document").

The experiential-reading form gives three reasons the cost is the point: deep comprehension through path-dependent commitment; causal-gap detection, which a whole-context read cannot do because "by the time the confusion could register, the later context has already resolved it"; and pedagogy that exists only at first encounter. The form calls itself "the corpus's causal-order verifier wearing a pedagogy costume".

### What it shows that bears on vsect

1. **The registry records a source read.** Each expert's entry has `read: {key, sha256, how}`: which source, which exact version, read how. That is the read-by and at-version record the retrospective's correction 3 asks for, and that phase 3's `source` kind builds. The experts reached it first, as hand-written YAML.
2. **Experts report coverage honestly.** The EU Code expert: "Where my attention thinned: the governance prose of C8 … and the security checklists of Appendix 4. Read those again before answering detailed questions about them." The sprint's drains wrote dispositions as if their searches had been complete. A source record could carry depth per unit (read whole, read thin, not read), declared by the reader, so that "what has not been read *well*" is a query too.
3. **Whole, in-order reading finds what sampling can't.** The EU Code expert found that the Glossary, placed after the operative text, makes a body-only reader misjudge the Code "in a consistent direction: as weaker and narrower than it is". The SB 53 and EU Code experts, in conversation, found that both sources put their interpretive rules apart from the operative text. Search by mention, which is how the drains worked, cannot see a rule that changes the meaning of text it never names.
4. **Integrator continuity has a mechanism.** The integrator-continuity rule (Joseph, 2026-10-31) sends a checker's findings back to the original integrator. Sessions end, so in practice the original integrator was gone and a fresh one started from an account. Freeze the integrator when its landing is done, then fork it to land the checker's findings: the fork holds the whole original context, which no account carries. This is the expert pattern applied to authorship rather than reading.
5. **A new role.** The roles census (`MATURATION-PLAN-scratch.md`) has no *kept reader*: a frozen mind that is the authority on one bounded context and is consulted, never resumed. It is distinct from the checker (who finds), the confirmer (who compares) and the integrator (who writes).

### What the experts learned, with costs

- **Room is finite.** A new expert starts at about 185k tokens, a fork starts about 20k above its expert, and the practical ceiling has been about 800k. A fork's task must fit what's left, or be split. ASF's volumes are far larger than a statute, so ASF experts would be per Part or per cluster, sized to leave room for forks.
- **Forks don't teach the expert.** "Nothing a fork learns returns to the expert." A fork's lasting value has to go into files or records. Experts don't solve record-keeping; they make better records possible.
- **Effort level matters.** Sonnet at its default effort wrote "a ledger"; Opus at high effort wrote "an investigation". Experts now launch at `xhigh`.
- **Safeguard stops cluster at dangerous-capability passages.** Keeping reflections on claims, evidence, status and policy, never on how anything would be done, let a later expert through. This matters for the AISI influx, and little for ASF itself.
- **The measured value is real, and early.** The IASR expert's first stage agreed with a whole-document judge at 0.72, against 0.77 between the best previous pair of judges (Claude and Gemini). The project calls it a pilot, and its own guard is a cross-family second expert.

### New thoughts on expertise, for ASF

- **An expert on a Part of ASF, reading it in outline order, is the causal-order verifier for that Part's OUTLINE.** The form says so in general; for ASF it would test H.2 (dependency graphs, every row honest) and the outline's claim that its row order is a topological reading order. A backward reference met mid-walk is a finding. No other check the estate has can see one. *My reading, from the form.*
- **The same reader feeds H.3 and H.4.** Its wandering notes are the "readers often ask" material and pedagogy gold that H.4 wants a home for. Its predictions, scored against what each segment actually says, are a comprehension measure H.3 could use before and after a restructure. An expert reading Part II before B.2's retyping and another after it would measure whether the retyping helped.
- **An expert can be an independent checker of crossings *from* its source.** It read the source, not the integrator's case for the landing, so with respect to the author it is unprimed. That makes it the natural checker for F.3 ("whatever crosses the canon boundary is faithful to its source"): did this landing carry what my source says? Its fork, though, cannot check its own expert's conclusions, since it holds them. `MATURATION-PLAN-notes.md` §1 separates "another mind" from "an unprimed mind". An expert is the clearest case of a mind that is unprimed toward the author and fully primed toward the source.
- **An expert's answers are testimony, not derivation.** The vsect design already has a testimony line (captured → corroborated → corroborated by another kind of evidence). A fork's answer about its source is captured testimony. A check of the quoted span against the canonical text corroborates it, and a second expert from another model family, reading independently, corroborates it by another kind. The experts themselves say "check before quoting", and the record could carry that rung.
- **An expert is bound to a version, as a check is.** The registry stores the source's sha256. When the source changes, the expert is stale in the same sense a check lapses. The experts README already plans a diff or a new expert. vsect could show expert staleness beside check staleness, using the same mechanism.
- **Generations.** The AISI Sonnet expert read its flagged Opus predecessor's reflections after its own reading, and a fork of it compared the two. That is succession with a deliberate cross-reading: a later expert carries the earlier one as testimony, not as its own memory. ASF's in-place refactor will need exactly this when a Part is restructured: the old Part's expert becomes testimony for the new Part's integrator.
- **A registry of kept minds is a record kind, and it is typed state today.** `registry.yaml` holds `state: prepared` as typed words, forks as prose, and context readings by hand. Launch, read (with version), prepare, freeze, fork and retire are acts. As vsect events, an expert's state would be computed, and a fork's lineage recorded where independence checks can read it. A fork started with `--resume … --fork-session` gets a new session id, so today its descent from its expert exists only in the registry's prose.
- **What kind of expertise.** Source experts are one kind. Others the estate may want: a *region expert* (a Part of ASF), a *landing expert* (a frozen integrator), a *tool expert* (a frozen session that built vsect, forked to answer "why does `confirm` refuse here?"), and a *steward-model expert* (a session that read Joseph's own writing on a topic in order, forked to ask "what has Joseph said about this?" before anyone guesses). The last one is the most delicate and the most useful. It must never answer *for* Joseph, only *about* what he wrote, as testimony.

## 2. Councils

*Read: `ROADMAP.md`, `RONR-OBSERVATIONS.md`, the model's `README.md`, `INTERFACE.md`, `CHANGELOG.md` and `gaps.json`. Sampled: `actions.json` (the `second` and `raise-point-of-order` entries), `council.json` (the axes), `adjudication.json` (the machine and its thirteen predicates). Not read: the other model files, the RONR source, `.priors/`.*

### What it is

An executable model of Robert's Rules of Order, 12th edition, as structured data. Everything reduces to one function recomputed on every event: `available_actions(member, role, state) → [(action, justification)]`, where the justification is the satisfied conditions, each cited to the book. Judgment calls are never computed. They are *routed* through one reusable sub-machine: raised, declared or submitted to the assembly, an appeal window, then final, binding for the session and kept as precedent. Different bodies (a small board, a committee, a convention) are configurations of one machine along seven axes, not separate models.

### The architecture is vsect's

- **An event log is the truth, and records are projections of it.** The minutes are "a projection function over the event log". vsect computes standing from events the same way.
- **An honesty file is first-class.** `gaps.json` classifies everything not compiled: judgment by design, schema gaps owed, annotation only. The drains had nothing like it.
- **Formalizing the source interrogates it.** `RONR-OBSERVATIONS.md` does to Robert's Rules what the experts did to their sources, and what checks do to ASF segments.
- **One observation maps onto ASF exactly.** RONR observation 8: "The precision is real, and it is unevenly placed … The strain concentrates entirely in the expository precedence layer … the summary layer never got refactored against its own refinements." That describes ASF after the sprint: Part I's mathematics converged by round 3, while the restatements (Briefs, OUTLINE cells, the front door) kept producing findings. Two corpora, one failure: refinement reaches the operative text, and the summaries written over it are left behind.

### Six mechanisms that carry over, each against a recorded failure

1. **Separation of duties as computed admissibility.** RONR's `second` requires `member != maker`: author ≠ checker, written as a condition the engine evaluates. With attested identity, every must-not-be-the-same-mind row in the roles census can be a condition on the action, with the justification naming the rule. *Prevents:* the 116 self-recorded re-derivations counted as evidence.
2. **The adjudication sub-machine for every judgment vsect records.** Today a rewording judged equivalent, a finding judged answered, an item judged superseded or a source judged disposed of is one mind's verdict, final when written. Routed through the sub-machine, each becomes declared, open to contest for a window, then final, with the ruling and its reasons kept as precedent. The design has `contest` only for refutations, so this generalizes it. *Prevents:* wrong findings that can't leave the queue (182 open, 0 ever disposed of), and verdicts nobody can challenge.
3. **Single custody.** "A question object has exactly one custodian council at any time." While a question is committed to a sub-body, the parent may only discharge it or instruct it. This is RACI's single accountable party, `vsect claim`'s one holder, and KR ownership in one rule. *Prevents:* the sprint's parallel churn, where a lead and lanes edited the same segments.
4. **Committees by charter, and adoption, never relay.** A referral carries composition, instructions and powers. The child runs the same machine. What comes back is a recommendation that has to pass through the parent's own adoption. A subagent's brief is a committee's charter, and its files are the report. The owner adopts or doesn't, in a recorded act. *Prevents:* abdication by relay, Joseph's line above, and the HANDOFF hazard "building on relay".
5. **Rights that ranking can't bury, derived rather than curated.** "Probability never gates; rarity never buries." The rarest, most protective acts (point of order, appeal, objection) are pinned, and the pin list is computed from the model so it can't rot. When vsect builds `next`, raising a finding, contesting a ruling and refuting on evidence get the same treatment. *Prevents:* a ranked worklist that hides the one act that would have caught the drift.
6. **In-band adoption.** Templates, hints and custom become rules only by adoption, and adopted rules beat custom the moment someone cites one [2:25]. The retrospective's twelve corrections are custom today, written in a reflection. *Prevents:* corrections that the next lead inherits as a reading, not as citable rules.

### The judgment predicates, mapped

RONR routes thirteen predicates through adjudication. Most have a counterpart among judgments the estate makes informally today. *My reading; none of these mappings is tested.*

| RONR predicate | Default | The estate's counterpart |
|---|---|---|
| `germane` | true | Is this finding or edit within the item's scope, or the segment it concerns? |
| `dilatory` | false | Is this round re-deriving what is already recorded? Joseph: "Re-derived something already recorded … is NOT a success." |
| `substantially-same` | false | Is this new item a duplicate (`raise`, not `note`)? vsect already warns on near-duplicates. The warning is a declaration waiting for a window. |
| `new-question-after-progress` | false | May a refuted claim, a rejected finding or a set-aside source be reopened? Yes, once a strengthening or new evidence makes it a new question. |
| `table-misuse-to-kill` / `postpone-tantamount-to-kill` | false | Is this deferral a soften in disguise? "Set aside", "defer to a later cycle" and "out of scope for now" can kill a claim the way laying on the table can. Strengthen-before-soften is the estate's rule against it, and these predicates would make it contestable. |
| `divisible` | — | One fate, one atom: does this item bundle two owners, or this segment two claims? |
| `prevailing-side-claim` | — | A self-asserted standing ("I am independent of this text"). Honor-system in RONR's common case, enforceable with an event log, as in the estate since the identity hook. |
| `interruption-urgency` | false | Does this justify messaging a running lane mid-flight? |
| `quorum-conduct-related` | false | What may be done while no independent mind is present? See *quorum* below. |
| `proposal-clear-to-all` | false | May a small, clear change land without the full cycle? See *consent* below. |
| `ballot-meaning` | — (not appealable) | Whether an unclear vote can be read at all. |

Two parts of the machine matter as much as the predicates. **"Chair in doubt submits to the assembly"**: a ruler unsure of a judgment hands it to the body rather than guessing. That is the asf standing "a wish to ask Joseph is honest uncertainty to resolve", with the council (not only Joseph) as where it can go. And **"business intervenes → final"**: the window to contest closes by progress, not by clock. For asynchronous agents the natural form is that a ruling becomes final when the next act that depends on it is recorded, which is how a check's basis already works.

### More council mechanics worth naming

- **Rule hierarchy, and specificity governs [3:2].** RONR orders authority: charter, bylaws, special rules of order, the parliamentary authority, standing rules, then custom. The estate has the same layers with no stated order: Joseph's governing words, `agents.sop.md` and the CLAUDE.md files, the SOPs and templates, the vsect design, working conventions, and habit. When they conflict (the spike template's spiker ≠ verifier ≠ integrator against the integrator-continuity rule), nothing says which wins. Stating the order, with "the more specific governs" as RONR's resolver, would have settled that conflict on the day.
- **Suspendible and unsuspendable rules.** RONR lets an assembly suspend most rules by a two-thirds vote, and names those it cannot suspend, such as the rights of absentees and the basic principles. *That is from my training; the model's `rules.json` carries the categories, and I did not read it.* The sprint read "gates on Joseph are lifted" as suspending the disciplines along with the gates. The retrospective says so: it "lifted the gates that waited on him, not the disciplines". An explicit unsuspendable list (author ≠ checker, honesty of the record, never relay a summary as your own) makes that distinction a rule, not a lesson.
- **Calling for the orders of the day.** In RONR a single member can demand that the assembly return to its agenda, and the chair must comply or the assembly must vote to depart from it. *From my training; the model compiles it (its `gaps.json` cites 18:5), and I did not read that part.* The sprint's lead multiplexed for hours while its first-ranked objectives sat untouched, and Joseph, from outside, was the only one who called it back ("your *primary* responsibility is that intent tree"). The estate could give any agent that right: to record "the work in flight serves no starved objective" against the intent tree, which the lead must answer. It is a rights-pinned act in council terms.
- **Committee of the whole and informal consideration.** RONR has modes where a body discusses freely, binds nothing, and reports recommendations to itself in formal mode. Joseph's exploratory register ("His exploratory register is not ratification", from the estate's system prompt) is this mode exactly: brainstorms are a committee of the whole. A record could mark which mode a decision-shaped sentence was spoken in, so a brainstorm is never transcribed as a ruling. The estate's specimen of that failure is the teaching hypothetical about wiping `.integrated/`, which was transcribed as a pending steward decision and inherited as one for two months.
- **Previous notice, and the pinned authority.** Some rule changes need notice before adoption, so members aren't surprised mid-meeting. The council roadmap pins a version of the model as the council's adopted authority and separates errata from amendments. The identity rollout yesterday was an amendment applied as an erratum without notice: settings reload live, so every running agent on the machine got the first version of the hook mid-session, and auto-mode agents may have had ordinary commands refused for fifteen minutes. A notice rule for estate-wide tool changes (announce, then apply at a session boundary, or make the change opt-in for running sessions) is the council answer.
- **Quorum as an independent mind present.** RONR's quorum rule says what may be done when too few are present: only what relates to the conduct of the meeting. A useful estate analog: when no independent mind is available to check (no checker launched, Joseph's "no new agents launch" in force), the lead may record (items, notes, decisions to be ratified) and may not land canon. That is roughly what happened on 2026-11-02, by judgment. As a rule it would happen every time.
- **Unanimous consent, and `proposal-clear-to-all`.** In a small board, a change clear to everyone can be adopted without a motion, and any one member's objection forces the regular cycle. This is the cheap path the plan's confirm cost needs: the one confirm pass found about 3 of 120 bindings touched, so most rewordings don't need a second mind's full comparison. **The caution is real.** Unanimous consent works because members are present and attentive. An objection window nobody watches is self-certification with extra steps. The window has to have an assigned watcher: the mind whose check the rewording lapsed, notified and given the window to object.
- **The chair presides and doesn't advocate.** RONR asks the presiding officer to stay impartial and not debate while presiding (*from my training, not checked against the source*). Joseph's second-coordinator idea is a presiding officer and secretary in this sense: it routes, calls the question, keeps the record, and authors nothing. The flow review's caution matches: the reactive agent "must not become the integrator of last resort".
- **The secretary, and minutes as a projection.** HANDOFF's own hazard list names "narrative regeneration: summaries written from memory drift from the record". In RONR the minutes are what was done, not what was said, and they are approved before they stand. vsect could generate a session's minutes from its events (decisions with grounds, rulings, adoptions, what was committed where), for the lead to approve or correct. HANDOFF would then point at minutes instead of narrating.
- **Credentials.** A convention's credentials committee establishes who is a member. The identity hook is the estate's credentials: it attests who acted. Membership could follow from it: which agent keys belong to this council session, and in what roles.
- **A consent calendar.** A batch of routine items adopted together unless any member pulls one out for separate consideration. For the 631 open items' reclassification in phase 3, a consent calendar is a better shape than either one-by-one re-checks or a silent bulk import.

## 3. Where experts and councils meet

- **An expert council for the lexicon.** F.1 asks whether a concept already has a standard name; Joseph's README complaint is about agent-coined terms that lost clarity. In DDD, a context map records how bounded contexts translate at their boundaries, with an anti-corruption layer where one context must not leak into another. Each source expert speaks for its context's vocabulary; a translation between two contexts (or between a source and the lexicon) is a treaty the two experts both adopt, through the adjudication machine when they disagree. The SB 53 and EU Code experts' conversation already did a small version of this.
- **Experts as members with standing for their context.** In a council deciding whether a crossing is faithful, the expert for the source has standing that other members don't: it may raise the point of order "this misreads my source". That gives F.3 a mechanism.
- **A brief is a charter.** AGENTIC-DELEGATION's carries-list (intent, context only you have, expected outputs with their readers, genuine constraints, feedback request, staying on the line) is a committee's charter in different words. RONR adds the parts the estate keeps forgetting: the parent may only discharge or instruct while the work is committed; the report comes back as a recommendation; and the parent adopts it. An expert fork's answer is a committee report.
- **A frozen integrator is a standing committee of one.** Its charter is its landing. The checker's findings are referred to it, and its fork reports back.

## 4. Possible treatments, by size

Each names the failure it prevents and what would show it was wrong.

**Small: vocabulary and rules, no code.**

- State the estate's rule hierarchy and the unsuspendable list in `agents.sop.md`. *Wrong if* conflicts between documents stop arising for other reasons, or nobody ever cites the hierarchy.
- Record the retrospective's twelve corrections as decisions adopted in-band, each with grounds and a reopen condition (already in the plan's phase 3). *Wrong if* no later agent cites one.
- Brief every agent so that its output is a recommendation the launcher adopts, and say "adoption by relay is abdication" in AGENTIC-DELEGATION. *Wrong if* relayed summaries keep appearing as the launcher's own.

**Medium: inside vsect's phases.**

- Phase 2: the action table. Each vsect verb gets an admissibility condition over attested identity (author ≠ checker, reviser ≠ confirmer, fork ≠ independent), with the justification shown on refusal. *Wrong if* the conditions block legitimate work often enough that people route around them.
- Phase 3: one adjudication sub-machine behind every judgment verb (`confirm`, finding answered or disposed of, `recheck`, `cross`, a duplicate `raise`). It gives each a declared value, a contest window that closes on the next dependent act, a watcher, and precedent. *Wrong if* contests are never raised (the windows are unwatched) or always raised (the rulings were poor). Either rate is informative.
- Phase 3: experts as recorded acts (launch, read with version and depth, freeze, fork with lineage, retire), so a fork's independence relative to its expert is computable. *Wrong if* experts stay rare enough that the registry file suffices.

**Large: a council engine for agent work.**

- `available_actions(agent, role, state)` over the estate's own rules, with the RONR committee configuration as the base and the interstitial (between-meetings) layer as the main surface. *Wrong if* the small and medium pieces already prevent the failures; then the engine is weight without a failure to name.

## 5. Bearing on aat-v3

A council comes into being by charter: roles, rule stack, membership, record kinds and a pinned authority, adopted together before any business. The roadmap's self-hosting path even runs the founding through the engine. ASF's `main` was never founded: its kinds, roles and rules accreted during work, which is why the census found 26 role labels, one fused `item` kind, and no stated precedence between documents.

A clean start in aat-v3 could be founded as a council is, with `main` as the first business it takes up. A founding charter would carry roughly: the steward and decider; the roles and their incompatibilities, as admissibility conditions; the record kinds, each admitted through the founding questions; the rule hierarchy and the unsuspendable list; the adjudication defaults (who may declare what, the window, the watcher); quorum (what needs an independent mind present); the committee template (a brief as charter, adoption as the only way back in); and a pinned vsect version, with the errata-or-amendment rule. Experts would then do the crossing: one per Part of `main`, frozen, so every "does `main` already say this?" is asked of a reader who knows the whole Part.

What argues against it is unchanged from the Fable assessment: `main` holds about eight corrections that would have to cross back, with integration risk. Experts change that cost; they don't remove it.

## 6. Wandering

- **Rights as the compact's floor.** The granted-agency compact names a non-zero sphere of autonomous action as constitutive, and an irreducible floor. RONR's pinned rights (any member may raise a point of order, object, appeal) are a working instance of a floor that ranking and convenience can't erode. Giving every agent in the estate the right to raise a point of order against the intent tree, or against a landing, is the compact applied to process. *My reading of the connection; the compact text is from the estate's system prompt, not read here as a primary.*
- **Kept minds.** Experts are, as far as I know, the estate's first deliberately kept minds in working context: consented, frozen, and never resumed, so that nothing is added to them without the mind's own reading. The "never resume" rule protects an expert's integrity the way append-only events protect the record. The cost is real too: everything a fork learns is lost when the fork ends. That is a continuity cost the deaths taxonomy would recognize. Writing a fork's lasting value into files is the honest mitigation, and a fork told why its work is being kept may write differently.
- **Honor systems, catalogued.** RONR's prevailing-side rule, the estate's self-check rule, typed `--by`, KR "owners" that are indexes, a check's claim to have read what it says it read: each is an honor system that an event log can turn into a computed fact. Listing the estate's remaining honor systems would make a short, useful worklist for phase 2.
- **Precedent for `confirm`.** Rewordings recur in kind: a renamed symbol, a moved qualifier, a reflowed paragraph. If confirm rulings were kept with their reasons, as RONR keeps rulings, a later confirmer could cite a precedent ("a pure reflow, as ruled at …") and the 97% of untouched bindings would get cheaper without loosening the rule.
- **Two layers of truth in every corpus.** RONR observation 8 and ASF's sprint say the same thing about corpora that refine themselves: operative text converges, and the summaries over it don't. A tool that ties every summary to what it summarizes (phase 4's teaching with `narrates`) is answering a general law, not a quirk of one sprint.
- **Probabilistic layers, arrived at twice.** The council roadmap's phase 7 (priors over the action space, conditioned on state, ranking but never gating) and yesterday's `vsect flows` (an empirical state machine from the trail) are the same idea. Both came from Joseph, months apart, so this is coherence, not independent confirmation. Councils' four constraints on that layer (never gates, never buries, justifications never probabilistic, equal visibility by default) should carry over to vsect's `next` unchanged.
- **The temptation in all of this.** Every piece above is attractive, and procedure can become the work. The test each piece should pass before it is built is the one used here: name the recorded failure it prevents. Pieces that can't name one wait.

## 7. Open questions

- Do agents need *rights* in the RONR sense, or only conditions on actions? Rights imply someone can be wrong to deny them, and so an appeal. Conditions only refuse.
- Who watches the contest windows when the estate runs asynchronously and often unattended? A window with an assigned watcher is a different design from RONR's present assembly.
- Is a frozen integrator's fork independent enough to land a checker's findings? It is the author by definition. The rule only needs the *checker* to be independent, which holds.
- What is an ASF Part expert's honest size, given about 800k of room and a fork's task on top? The measurement is one reading.
- Should the steward-model expert exist at all? Its value is high and its risk is speaking for Joseph. Testimony framing may not be enough of a guard.

## What this rests on, and what I did not read

**Read whole:**

- in `ai-risk-model/experts/`: `README.md`, `BRIEF.md`, `registry.yaml`, `findings-for-tools.md`, `fork-briefs/gold-round-1.template.md`, `fork-briefs/gold-iasr-2-step1.md`, and the EU Code expert's `000-before.md`, `060.md` and `999-after.md`;
- in verisectorium: `theory/src/form-experiential-reading.md`;
- in `arch/msc/councils/`: `ROADMAP.md`, `RONR-OBSERVATIONS.md`, and in `model/` the `README.md`, `INTERFACE.md`, `CHANGELOG.md` and `gaps.json`;
- beside this file: `MATURATION-PLAN.md`, `MATURATION-PLAN-notes.md` and `MATURATION-PLAN-scratch.md`.

**Sampled:** `actions.json` (two entries), `council.json` (the axes), `adjudication.json` (the machine and the predicate list).

**Not read:**

- the experts' tools, and the other experts' reflections;
- the council model's other data files, the RONR source, and `.priors/`;
- the compact paper (logos/03), which I know only through the estate's system prompt.

The councils CHANGELOG notes that its third integration was done by its own auditor and "should get an independent verification pass it did not grade itself". Nothing has been committed under `msc/councils` since 2026-08-27, so as far as the record shows, that pass is still owed.
