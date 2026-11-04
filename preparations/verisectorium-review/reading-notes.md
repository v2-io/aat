# Reading notes: the verisectorium prior incarnation, read for what moves to the top level

*councils-46, 2026-11-04. Intermediate thinking, written as I read so it sinks in. Not a recommendation yet. Joseph's frame for the read: "thoroughly explore ~/src/verisectorium/.archive/prior-incarnation/ and recommend files to move into verisectorium/ top-level … adjudicate verisectorium work in context of our latest experiences." And: "verisectorium was focused on layout and components as files and directories, where we hope to essentially abstract that away — but things like having standard influx points and meta/feedback routes and every verisectoria having SoPs … are all important." CLI name: `v2`, not `vsect`.*

## Read so far, whole

- prior-incarnation `README.md`, `CLAUDE.md`, `theory/OUTLINE.md` (with its Working Notes), `theory/sop/ORIENT.md`
- RC1: 00, 01, 02, 03, 04, 06, 07, 08, 09, 10, 11, 90, 95 (not yet: SPECIMEN, `lang/`)
- `theory/influx/00-INDEX.md`; `steward-brainstorms/realization-model-v1.md`; `template/sop/SOP.outline.md`
- `preparations/asf-earlier-vsect/MATURATION-PLAN.md`
- ASF: Volume 1 OUTLINE (first chapters), `def-agent-environment` whole, `der-orient-cascade` (first half)
- Earlier today: archived vsect design `model.md`, `core.md`; RC1 06/09/10; KERNEL drafts 1–2; asf-flows; Line A.

## What hit hardest, in order of how much it changes today's work

1. **Joseph's "kinds don't specify axes" is RC1's spine.** RC1 01: "a record's kind is individuated by how it fails and what repairs it, and adjudicated on its kind's epistemic dimensions." 03: "A kind's dimension-profile *is* most of its declaration." A dimension = question + degrees of warrant + dishonesty modes, moved only by its own movers. The eight namespaces (Evidence, Backing, Fidelity, Efficacy, Comprehension, Conviction, Freshness, Disposition), with Evidence and Backing split into orthogonal named dimensions (`evidence/derivation`, `decision/grounding`, …). Today's ASF model had none of this. The KERNEL drafts had "dimension it moves" as one field with nothing behind it. This is the framework Joseph said we lost.

2. **Transitions = movers.** RC1's "moved only by its own movers" + 09's rule form (*when / allow / enabling*) is exactly what a transition is: a named channel that moves one dimension along its ladder, signed (refutation channels first-class). Joseph's "stations should specify which axes are adjudicated to new values" = RC1's ladders with channels (04's two worked tables: `evidence/*` for a claim, `decision/*` for a decision). The councils "transition-edge as a queue drained by a decision-maker" sits on top of this: a mover's queue.

3. **Atomic changeset = RC1's EPISODE gap (95, routed to fork queue 6).** The field trial found exactly Joseph's concern: "the common case of a securing act is multi-record … a cascade episode touches a dozen records as one act; a review certifies an episode, not a record." And live_docs already runs the inverse factorization: *the trail is session-scoped (WAL), per-record history is a materialized projection of it.* That answers "how is a changeset tracked as a whole": the episode is primary storage, per-record trails are projections. Prescribed path: SPECIMEN #3 first ("more specimens before more ontology"). Our Line A measurement (grouping saves nothing in vsect 0.1, because cost is a function of end state and records are primary) is the same finding from the other side: in a record-primary store an episode has no substance.

4. **The influx failure was predicted.** `form-influx-membrane` (manifest + payloads + typed outcomes; "nothing writes the population directly") and the realization model's **base material** ("payload-sidecars with inferred items, one item per doc") are the shape the sprint's drains lacked. Also `form-pending-surface` ("asked-and-answered is recorded"), the delete-test, `claim-dispatch-compounds` (false nuggets). Joseph's "only through vsect" is `form-influx-membrane`'s "nothing writes the population directly", extended to every write.

5. **The store triplet answers "standard influx points and meta/feedback routes".** canon + influx⁺ (base material designated); lexicon + influx; SOP + influx⁺ (meta-feedback channel = `post-self-governance` realized; plus upgrade channel); a history layer required from birth. SOPs are a verisectorium one level deep, terminating at self-governance via their own influx. Joseph today: "every verisectoria having SoPs (although maybe in our case they'll be more a part of the system model)". The realization model already says serving forms of norms are views over a norm population; in the new system that population could be records in the system definition.

6. **The misfire hazard is what happened today.** ORIENT: "Fluency-before-doctrina is this project's own founding wound: the theory-misfire read the forms, skipped the settled content, and produced something *almost* right — the most expensive kind of wrong." The KERNEL drafts and my ASF model are a second misfire of the same shape: drafted without RC1's core files or the theory canon. Worth saying plainly in the recommendation, and it argues for doctrina-first orientation in the new repo's front door.

7. **Layout vs abstraction.** The prior incarnation is layout-shaped (organs map to directories, template = blank-slate directory tree, NAME-ME surfaces). RC1 deliberately is not ("physical realization is a deployment matter"). 11 supplies the vocabulary for abstracting layout away: record = `@{referent}`, manifestation ≠ identity, identity = maintained `@{binding}` (dangle/collide), projection = `@{generator}` evaluated as of a `@{moment}`, edges = `@{reference}`s with intended cardinality, designator vs description. That's the bridge to Joseph's "abstract layout away": the store is bindings + trail; files are one manifestation.

8. **Things today's KERNEL got right, independently or by inheritance, that RC1 also holds**: computed standing, append-only, content versions, founding questions as admission guard, rebut vs undercut, "kind admitted only when it fails differently". Things today added that RC1 lacks or only gestures at: attested actor (identity hook), the engine as the only writer + projection invariant, tool actors with version as era, the demand backlog, the ant-shaped interface, names vs atoms (11 has it as binding), councils as one kind of decision-maker, importance/decision lapse (RC1 has `decision/falsifiers` reopen; importance not as such), flows (yields, three steady-state conditions). The flows sit more naturally as an analysis over the trail than as model (Joseph's point).

## Candidate move list, first pass (to revise as I read on)

*Top-level of `~/src/verisectorium/`, as the new canon/seed. "Move" = promote out of `.archive/` as live material; everything else stays archived as influx.*

- **RC1 whole** (00–11, 90, 95, SPECIMEN, `lang/` spike): the epistemic core. Candidate home: top-level `model/` (or the new canon's foundation). 90 and 95 come too: the fork queue (esp. 6, EPISODE) is live work.
- **Theory canon segments that are drafted** (23 per ORIENT) and the OUTLINE: probably yes as the theory store. To decide after reading them: which are layout-bound (e.g. `form-slug-form-kinds`, `form-process-map`?) vs principle.
- **realization-model-v1** (store triplet, instrumenta axes, actor roles, professio, upgrade propagation, affordance directive): yes, it's the deployment layer's best statement and still live per the OUTLINE.
- **ORIENT.md** (doctrina/praxes/professio; hazards): yes, as the seed of the new front door, adapted.
- **template/**: mostly no as layout; its SOP.outline's process-state and authority-register enums are worth carrying.
- **To check:** `model-2026-08-14/` (01-MODEL §2 nine questions, §6 emission/composite detail, 02-GROUNDING external-warrant table: 90 says these are "not yet carried, so they stay live"), `steward-brainstorms/` (verbatim baselines), `segment-research/epistemic-map.md`, `verisect-and-ldocs.md` (live_docs comparison: the WAL→trail union), `instrumenta/` (REGISTER-RULING governs), `terminology-survey.md` + `TERM.term.ud` (def-entry schema), `sop/influx/` feedback items.

## Questions forming

- RC1's EVENT attaches to one record; Joseph's changeset and the 95 finding say the episode is primary. If the trail is episode-scoped, what is a per-record trail: a declared projection. Does that change the kernel's "every event carries …" table? Probably: the event's unit is the episode, with per-record entries.
- RC1's "line" (one record × one dimension over time) vs today's "transition": a transition is a mover on a line. Lexicon should carry both, as different things.
- Where do councils attach in RC1 terms? Backing's movers (`decision/accountability` rungs proposed→supported→ratified→ruled) and the importance discussion. A council is a mover of Backing, and sometimes of Evidence when it's a tribunal (a review). That's cleaner than "any decision-maker".
- Disposition as "the bus" + 07's gap-ordering as a projection over Disposition + edges: this is the flows question in RC1 terms (what is waiting, where, exerting what influence), without wall time.
