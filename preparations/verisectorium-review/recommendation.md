# What to move from the prior incarnation to verisectorium's top level

*councils-46, 2026-11-04, for Joseph. First pass. Read whole or in the parts named in `reading-notes.md` beside this file, which also says what I have not read. Judged against this week's experience: the sprint, the councils work, the kernel drafts and my ASF model. "Move" means: promote out of `.archive/prior-incarnation/` as live material at the top of `~/src/verisectorium/`. Everything not named stays archived, as influx.*

## The short version

The prior incarnation already holds the framework the kernel drafts and my ASF model lost. RC1 defines kinds by their epistemic dimensions, transitions as each dimension's movers, and status as a projection over the trail. The theory canon and the realization brainstorm give the intake, feedback and SOP routes every store needs. And RC1's open fork 6, EPISODE (2026-08-30), is your atomic-changeset question, already found from the other side. It comes with a working counter-design: live_docs' session-scoped trail, with per-record history as a projection.

So most of the promotion is the epistemic core and the principles. Most of what stays archived is layout: directories, the template tree, filename prefixes. That matches your direction to abstract layout away.

ORIENT names the hazard this week walked into: *"Fluency-before-doctrina is this project's own founding wound: the theory-misfire read the forms, skipped the settled content, and produced something almost right — the most expensive kind of wrong."* The kernel drafts were a second instance of it. That argues for the new front door being doctrina-first.

## Promote

### 1. RC1, whole (`theory/influx/segments-model-rc1/`)

All of 00–11, 90, 95, SPECIMEN and the `lang/` spike. This is the epistemic core, and it's what the new vsect implements. In this week's terms:

| This week's question | Where RC1 already answers it |
|---|---|
| "kinds don't specify which axes are tracked" | 01–03: a kind is individuated by failure-and-repair and adjudicated on its epistemic dimensions. Each dimension is a question, plus degrees of warrant, plus dishonesty modes, moved only by its own movers |
| "stations don't say which axes they adjudicate to which values" | 04: the ladders with signed channels (worked for `evidence/*` and `decision/*`); 09: the *when / allow / enabling* rule |
| the atomic changeset, tracked as a whole | 95 and fork 6: EPISODE, with per-record trails as projections. The prescribed entry is SPECIMEN #3 before any new object |
| decision importance; unity required by importance | 04's `decision/*` ladder: accountability proposed → supported → ratified → ruled, guarded by grounding and consultation; `decision/falsifiers` reopen with "what changed". Importance itself isn't there yet; your 2026-11-03 account adds it |
| "only through vsect" | 08's under-recording economics and 09's "stating the act *is* recording it", which the field trial calls demonstrated |
| independence, priming | 04's coherence default and commitment law; 08's grader independence |
| names, slugs, the old-slug mapping | 11: identity as a maintained `@{binding}`, with `@{dangle}` and `@{collide}` |
| the drain and gap ordering (the flows) | 07: gap priority as a projection over Disposition plus edges; "silent loss is the deep failure" |

RC1's own register stays: **proposed**, none of it ratified. Promoting it changes where it lives, not its tier. Its fork queue (90) is live work.

### 2. The parts of `theory/influx/model-2026-08-14/` that RC1 says it hasn't carried

90's supersession map: *"Not yet carried … so they stay live: 01-MODEL's §2 nine derivation questions …; §6's emission/composite detail …; 02-GROUNDING's external-warrant table; the exercise-audit worklist."* Promote:
- **01-MODEL**, read in part. Its §5 (progressive inculcation: conscious → habitual → reflexive) and §6 (composites, emissions bounded by their weakest necessary premise) are not elsewhere.
- **02-GROUNDING**, unread by me.

### 3. The theory canon (`theory/OUTLINE.md` + `theory/src/`), split by whether it's principle or layout

**Principle; promote as canon, at their current tiers.** I'd keep these 19:
- norm-truth-above-self, obs-truth-failure-manifestations;
- post-living-collection, post-total-turnover, claim-comprehension-economics;
- def-atom-cluster, def-integration-replacement, form-influx-membrane;
- claim-dispatch-compounds, claim-clocked-drains, claim-truth-over-proxy, claim-strengthen-first;
- form-state-flags-not-gates, claim-decision-surfacing, form-steward-valve;
- form-experiential-reading, claim-outline-as-view;
- post-names-are-interface, claim-naming-criteria.

These are what the sprint failed against. The clearest cases:
- `form-influx-membrane` ("nothing writes the population directly"; typed outcomes);
- `claim-dispatch-compounds` (false nuggets);
- `claim-clocked-drains` ("un-clocked queues on a single human clock");
- `form-state-flags-not-gates` (the stage ladder that never fired).

**Layout-bound; promote only after re-cutting in RC1's and today's terms:**
- **`def-verisectorium`.** The nine organs read as failure classes, which is useful, but they were built as components and directories. Under your direction they become concerns the system definition answers, not places.
- **`def-atom`.** "Slug = identity" is superseded by 11's binding.
- **`form-slug-form-kinds`.** The filename-prefix scheme is layout. The principle under it, "nothing mutable participates in identity", survives as names versus identity.
- **`form-process-map`.** A process map over organs. In the new system the processes are the transitions of the definition, so this becomes a view of it.

**The 12 pre-drafted stubs and the OUTLINE's proposed rows** come along as rows, at `proposed`. Their Working Notes carry the drafting cautions.

### 4. The realization model (`theory/influx/steward-brainstorms/realization-model-v1.md`) and its frozen baseline

This is where your "standard influx points and meta/feedback routes and every verisectoria having SOPs" already has a worked first statement:
- **The store triplet.** Canon plus influx, with **base material** designated: "payload-sidecars with inferred items, one item per doc". Lexicon plus influx. SOP plus influx, with the **meta-feedback channel** and the **upgrade channel**. A history layer, required from birth.
- **SOPs are a verisectorium one level deep,** terminating at self-governance through their own influx. The many serving forms of norms are views over a norm population. In the new system that population can be records of the system definition, as you suggested.
- **The instrumenta axes.** Cognition I₀–I₃, with "logogenic proposes, deterministic disposes". Trigger × mutation, where M₂ (event-mutating) is exactly what `v2`'s writing verbs are.
- **Actor roles and the promotion lattice.**
- **Professio.**
- **Upgrade propagation,** advisory versus compat-critical.
- **The affordance directive:** "global, pwd-aware/root-aware instruments à la git and relata". That's `v2`.

Its register is brainstorm-grade, unratified, with `[J]`/`[C]`/`[J+C]` attribution marks. Promote it with that register intact. Its frozen baseline (`.integrated/instrumenta-and-realization-2026-08-06.md`) is the verbatim primary, so it moves too.

### 5. `theory/sop/ORIENT.md`, as the seed of the new front door

Doctrina, praxes and professio, in that order. Its named hazards. Its contextual-primaries table. The doctrina reading list will change, because the canon changes, but the shape is what this week lacked.

### 6. From `template/`, one small thing

The two enums in `template/sop/SOP.outline.md`'s Working Notes:
- **process-state:** proposed / template / override;
- **the authority register for directives:** proposed / ratified / ruled, plus `current`, with authority as its own axis apart from evidence tier.

The rest of `template/` is a directory skeleton, so it stays archived.

## Read before deciding: likely promote, but I haven't read it

- **`theory/influx/verisect-and-ldocs.md`.** The live_docs comparison. Its §7 is the "union ideation": WAL → trail migration, de-fusing enums, verdict and edge upgrades. That bears directly on EPISODE and on how a changeset is tracked. It's high priority.
- **`theory/influx/segment-research/epistemic-map.md`.** The registers/ladders synthesis and a segment-kind taxonomy seed, steward-corrected.
- **`theory/sop/influx/`.** Seven feedback items for the SOP store, including deployment founding feedback and aspectus-on-arrival.
- **`theory/influx/rc1-denovo-read-2026-08-14.md` and `rc1-grok-read-2026-08-14.md`.** The two stranger reads of RC1. 90 calls them "the first descent-independent agreement".

## Leave archived, as influx

- **`theory/influx/asf-sops/`.** Copies, and the live originals in asf win.
- **`vera/`, `tribunal/`, most of `segment-research/` and `synthesis/`.** Gather material, partly absorbed. The tribunal strand overlaps `msc/councils/research/tribunal-history.md`.
- **`instrumenta/`.** Its labels are governed by its own REGISTER-RULING; the realization model carries what matters from it.
- **`terminology-survey.md` and `TERM.term.ud`.** Leave them until the definition-entry form is decided. RC1 11 says the udon references def store is the better exemplar.
- **The whole `template/` tree** (layout), and **`PRACTICA.ud` and `CHANGELOG.md`** (history).
- **`.archive/theory-misfire/`.** Per its standing advisory.

## What this week adds that the prior incarnation lacks

These should arrive in the new verisectorium alongside RC1, as its implementation-facing complement. Each has a source in `preparations/`:
- **the engine as the only writer,** with files as renderings checked against the log (kernel drafts, invariant 1);
- **identity attested by the harness** (the agent-identity hook): RC1 08's trusted-base layer 3, made real;
- **tools as actors, at a version, the version being the era;**
- **refused acts recorded as demands,** the backlog your rule asks for;
- **the `ant`-shaped interface:** a typed request on stdin, structured result. This is 09's keystone in practice;
- **councils, placed in RC1's terms.** I'd now say: a council is a mover of `decision/*` (Backing), or of `evidence/*` when it's a tribunal. The generic collaborative council file and `councils-system-model.md` belong here as the adapter side;
- **decision importance,** declared plus computed reach, and a lapse when it rises: an addition to `decision/*`;
- **the flow analysis** (`asf-flows.md`), recast as what it is: an analysis over the trail. It fits under RC1 07's gap economics and Disposition, not inside the model;
- **the sprint's measurements:** self-checks 0 of 116, the independent yield falling from 0.57 to 0.18, Line A, Line B's five crossings. Specimens for RC1's acceptance protocol, in particular SPECIMEN #3.

## For the lexicon

The words already settled in RC1 and the canon should replace this week's coinages:

| This week's coinage | RC1's settled word |
|---|---|
| "axis" | **dimension** (with namespace) |
| "station", "transition" | **mover**, on a **line**, through a named, signed **channel**, along a **ladder** of **rungs** |
| "stock" | the **kind** of record |
| "role" | *(retire)* |
| "set aside" | **efflux** across a **membrane** (the Flux organ is "material crossing membranes, both directions"). For hand-offs to sibling stores, the name is still yours to choose |
| "changeset" | **episode**, if SPECIMEN #3 earns it |

RC1's settled vocabulary for the rest: **record** (= atom), **trail**, **projection** (a `@{generator}`, as of a `@{moment}`), **era**, **binding**, **dangle**, **collide**, **base material**, **delete-test**, **coherence default**, **commitment law**.

A choice is owed between **record** (RC1) and **atom** (the canon and the kernel drafts). They name the same thing, and today's lexicon carries both.

## The open questions this raises for you

1. **Should this canon be ASF-shaped or not?** The canon segments were written from this estate's instances. RC1 says it is "the founding agent's" model for any store. ASF would then be a store founded by running RC1 10's questions against its own material, with the five root segments from Line B as the first specimens.
2. **Is EPISODE the changeset, and does SPECIMEN #3 come first?** RC1's own discipline says the specimen comes before the object. Our Line A data, and a cascade from one of the five roots, are natural material for it.
3. **Where councils attach.** I'd say they're movers of Backing (and of Evidence, as tribunals), not a general "decision-maker". Does that match what you meant by transitions drained by decision-makers?
