# De novo audit of the `vsect` draft

**Audit date:** 2026-10-28
**Auditor:** Codex
**Disposition:** Do not implement the write path or advertise computed epistemic state until the blockers below have a normative resolution. The draft has a strong and unusually concrete user-facing workflow, but its central integrity promises are presently under-specified.

## Scope and method

I read the complete draft in `msc/vsect/` as an independent design, then traced the claims it says it carries from:

- verisectorium RC1, especially its spine, object model, edges, certification/audit material, language sketch, and founding questions in `~/src/arch/firmatum/verisectorium/theory/influx/segments-model-rc1/`;
- the current udon spec-lite SOP conventions and `.vsect/kinds.yaml` in `~/src/arch/firmatum/udon/v2/spec-lite-0.1.0/`; and
- the interfaces and on-disk examples promised by this draft.

This is a design audit, not an implementation review: no vsect implementation or vsect store exists in this repository. “Line” references below are source line numbers at the audit date. I treated all material outside this audit directory as read-only.

## Executive assessment

The draft succeeds at explaining why a cold-arriving worker should see work, evidence, staleness, and unresolved questions in the same place they do the work. The dashboard, bare verifier brief, landing-rule example, three-valued absence, and refusal to equate authority with truth are worthwhile constraints.

However, it currently describes a porcelain experience more precisely than the state model that must make that experience honest. Most seriously:

1. It moves adjudication from records to statements without defining statements as first-class stable objects.
2. It promises computed standing, cascades, independence, and `next` ranking without declaring the rules that compute any of them.
3. It calls a mutable collection of ordinary YAML files append-only without defining a tamper-evident trail or the identity/addressing required to audit one.
4. It has no machine-readable report/finding protocol, despite making report intake the point at which outside checking changes the corpus.

Those are not implementation details. They decide whether the tool can distinguish a real independent check from prose that merely looks like one, whether two implementations will agree on the dashboard, and whether a later auditor can reproduce an asserted history.

## Findings

### A-01 — Blocker — The proposed record/statement split leaves the actual adjudication object without identity, lifecycle, or a complete contract

**Evidence.** `model.md:15–25` calls a file-backed `kind:slug` record the unit named, filed, and cited, while expressly making a named in-file statement the unit to which evidence, findings, and dependencies attach. The theory profile then defines `segment` as a container for statements of *any* statement-kind (`model.md:102–116`). Statement boundaries are inferred from tags and the next tag or heading (`model.md:25`); their declarations are keyed in their parent’s mutable frontmatter (`storage.md:33–56`).

This is an intentional but unresolved departure from RC1. RC1 defines a record as “one atom of one kind,” makes it the unit of adjudication, and says that two independently adjudicable things are two records (`02-RECORD-OBJECT-MODEL.md:5–13`). Its founding procedure consequently asks for the grain and edges at which state attaches before certification (`10-FOUNDING-QUESTIONS.md:7–15`). The draft itself acknowledges this as its first question needing Joseph (`open.md:7`).

**Why it matters.** A statement has all the duties of a record but none of the protections: no stable identifier independent of its containing text, no explicit mint/retire/supersede semantics, no collision rule for its key, no statement-level write semantics, no statement-level working notes, and no projection from statement state to the containing record. Deleting or moving a tag changes the address of the very object that evidence and findings cite. A future “retired and replaced” statement can neither remain a durable target nor be unambiguously followed through history. It also permits a `segment` to mix definition, scope, choice, claim, and norm even though those fail and repair differently.

**Required resolution.** Choose one coherent model before implementation:

- Make each independently adjudicable statement a first-class record, and make a segment an outline/grouping/view or a prose companion; or
- explicitly define **statement** as a first-class sub-record with a stable ID, parent/child identity rules, mint/retire/supersede operations, statement-kind schema, per-statement edges/working notes/events, collision detection, and an upward projection rule.

Then run the promised five-segment exercise, including a statement move, deletion, split, merge, duplicate name, and a refutation that crosses a segment boundary. Do not treat a tag syntax alone as the answer to record grain.

### A-02 — Blocker — “Computed standing” has no declared computation, so the dashboard cannot be deterministic or auditable

**Evidence.** The model provides six ladders and says readers see “strongest line” and “floor” (`model.md:42–57`). It never defines: which lines a given statement must declare; which event types/outcomes advance, lower, or invalidate each rung; whether rungs across unlike lines are comparable; how the strongest line is selected; what the floor is a floor *of*; how a refutation, open finding, expired era, carried-source ceiling, missing premise, or conflicting evidence affects either output; or what consumers are licensed to infer. The event sample supplies only one event shape (`storage.md:63–80`). The dashboard nevertheless shows counts and the specification says all displayed state is computed (`vsect.md:39–50`).

The gap is especially important because RC1 requires a declaration of dimensions, ladders, movers, ceilings, projection, and the resulting consumer license (`09-LANGUAGE.md:7–14`; `10-FOUNDING-QUESTIONS.md:11–15`). It also requires projections to be order-invariant and treats correlation/descent as material to aggregation (`01-SPINE.md:48–64`). Spec-lite independently notes that the relationship between a kind’s single verification level and several dimensions remains unresolved (`conv-verification-and-status.md:40–46`).

**Why it matters.** Two correct-looking implementations can display different standing for the same trail. Worse, a reader may interpret “strongest line” as a confidence score while a skeptical “floor” is actually an uncomputed minimum of unrelated prerequisites. A statement with a high carried rung and a failed simulation, or an independent re-derivation based on a refuted premise, has no specified result. This is precisely the ambiguity the draft wants to eliminate.

**Required resolution.** Put a versioned, machine-readable declaration in the store profile for every statement-kind (or other chosen adjudication unit):

- required/optional evidence dimensions and their ordered rungs;
- allowed event classes, outcome vocabulary, authority/independence requirements, invalidation and decay rules per rung;
- declared typed projection functions for `standing`, `strongest-line`, `floor`, `broken`, `stale`, and record/outline summaries;
- an order-invariance requirement and fixtures covering permutations, conflicting lines, stale events, refutations, no evidence, and every three-valued absence case; and
- consumer licenses stated in words as well as the computation.

Until then, show raw per-line trails rather than a synthetic standing headline.

### A-03 — Blocker — The edge model is absent, making refutation cascades and impact analysis non-reproducible

**Evidence.** The sample has untyped `depends:` links at both record and statement grain (`storage.md:28–46`), while prose later uses at least `support`, `narrates`, and “leans on” and assigns three different cascade actions (`vsect.md:112–128`). The draft also promises `impact` to explain effects of “each class” of change (`vsect.md:167–175`), but defines no classes, edge schema, direction, cardinality, transitivity/composition, or conflict precedence. `open.md:35–36` says RC1 typed edges were “simplified,” but does not say into what.

RC1 treats edges as a separately declared object: an edge kind includes meaning, consumers, and composability (`09-LANGUAGE.md:9–14`), and its founding questions require the grain and edge kinds before certification (`10-FOUNDING-QUESTIONS.md:14–15`).

**Why it matters.** The difference between “uses as a premise,” “is a pedagogical summary of,” “illustrates,” “shares a term with,” and “was historically derived from” determines whether a refutation breaks, stales, merely flags, or does nothing to a dependent. Over-cascading produces alarm fatigue and encourages people to route around the tool; under-cascading exposes known-false content as usable. An untyped `depends:` makes both failures inevitable and prevents an auditor from checking why one dependent was marked broken while another was not.

**Required resolution.** Replace generic dependency links with a small, closed initial edge vocabulary. For each edge kind declare source/target grains and permitted kinds, semantic meaning, whether it transmits support, traversal direction, transitivity/composition, invalidation/cascade behavior for refutation/revision/staleness/deletion, and the user-visible explanation. Reject unknown edge kinds. If a generic “related” link is needed, make it explicitly non-cascading. Add graph fixtures for the cascade displayed in `vsect.md`.

### A-04 — High — “Append-only” is asserted, not made auditable; event identity and trail integrity are incomplete

**Evidence.** Events are one YAML file per act and are declared never edited or deleted (`storage.md:63–82`), but are ordinary files in a working tree. Their suggested filename includes timestamp/actor/verb, not a unique immutable event ID; `corrects:` has no defined target syntax; the body has no event ID, creation timestamp, store/schema version, hash chain, signature, or parent/commit anchor. The draft says events “can’t silently disagree with [themselves]” (`storage.md:82`) and relies on git to make after-the-fact edits visible (`storage.md:106–108`). Yet a user can edit, delete, rename, stage, amend, or initially commit an event without vsect; git attribution alone does not establish append-only history, identity, or that the written act happened.

RC1 is more precise about the distinction: reproducibility makes fabrication later convictable, while tamper-evidence must cover the trail itself; its stated estate substrate is a hash-chained commit stream (`08-CERTIFICATION-AND-AUDIT.md:17–21`). It also says trail corruption unwarrants every projection built upon it (`01-SPINE.md:60–64`).

**Why it matters.** `why`, standing, declinations, corrections, and certifications are only as good as the trail. With no canonical event identity, a correction can point ambiguously or break after a filename normalization. With no integrity rule, two clones can have event files with the same path but different content and no specified behavior. The design cannot decide whether it is promising protection against accidental mutation, detectable historical tampering, or merely a workflow convention.

**Required resolution.** State the trust boundary honestly and specify a verifiable minimum:

- canonical event bytes/schema, a content-derived event ID, explicit UTC creation time, schema/profile version, and unambiguous `corrects`/episode references;
- the event inclusion set and ordering-independent verification rule;
- what anchor makes removal/rewrite detectable (for example, signed commits plus an immutable remote/ref, or a per-commit manifest/Merkle root linked to a prior protected commit);
- behavior for malformed, duplicate, missing, orphaned, corrected, and conflicting events; and
- a clear separation between “recorded claim,” “reproducible check,” “authenticated actor,” and “tamper-evident trail.”

If this is deliberately a trust-based local tool, say “append-only by convention” and avoid presenting it as an enforced guarantee.

### A-05 — High — `take` relies on quote matching, but reports/findings have no interchange contract

**Evidence.** `vsect take` is meant to read arbitrary verifier notes, audits, and spike reports, locate a target by text quoted in the report, and attach each item at the version read (`vsect.md:104–110`). The model says a finding targets a particular statement version and can be answered, rejected, or carried as a defect (`model.md:67–69`). Neither `model.md` nor `storage.md` defines a report/finding schema, a required target identifier/version, an item ID, a finding disposition event, a severity, a quoted span rule, an evidential outcome grammar, or the rule for a zero/one/many quote match. The verification brief likewise says only where notes should be written (`vsect.md:93–102`).

**Why it matters.** Natural-language quotations are neither stable keys nor enough to establish what a reviewer actually examined. The same text may occur twice, a reviewer may paraphrase, a current file may have changed, and an imported report may contain both observation and recommendation. The tool cannot reliably turn a report into a reversible evidence event, tell whether an unresolved item is newly unplaced or previously seen, or implement the landing rule without trusting a guessed association.

**Required resolution.** Define a minimal portable report format produced by `brief`/`verify` and accepted by `take`: report ID and immutable source bytes; author/role/independence/descent declaration; episode; each finding’s ID, target stable ID, version/content hash, check type and precommitted criterion, outcome, evidence/reproduction pointer, and disposition semantics. Permit quoted prose as context only. For free-form imports, create an explicit **unplaced finding/influx item** and require a human to bind it; do not infer a binding that changes standing. Specify idempotence so retaking a report cannot double-count evidence.

### A-06 — High — Actor, authority, independence, and purpose ownership are labels rather than enforceable declarations

**Evidence.** Events contain an actor name and role (`storage.md:67–78`), and `take` records a reporter’s role and “independence” (`vsect.md:104–108`). `verify` asks for an independent verifier, but supplies neither an independence test nor a declaration of the verifier’s descent from author, source, method, or prior findings (`vsect.md:93–102`). `decide` records who decided and delegated authority (`vsect.md:143–145`), while purpose is “owned by the steward” and revised only by that steward (`model.md:82–86`, `model.md:112–115`). No store schema declares principals, steward identity, roles/capabilities, delegation scope/expiry, credential-to-actor binding, or how a CLI rejects an unauthorized purpose revision/decision.

RC1 treats standing as a gate—an unauthorized decision never came into existence as a decision—and asks founders to declare who may move a value on which warrant (`10-FOUNDING-QUESTIONS.md:7–13`). It also says evidence agreement adds weight only to the degree non-shared descent is shown (`01-SPINE.md:58–64`).

**Why it matters.** The most consequential terms in the draft become self-asserted metadata. An author can label their own event `verifier`, a reviewer who read the author’s notes can be counted as independent, and any local writer can create a purported steward purpose statement. Those are exactly the authority/evidence substitutions that the draft otherwise rejects.

**Required resolution.** Declare an actor and authority model in the store profile. At minimum: canonical principals; roles as capabilities rather than free strings; steward/decider bindings; delegations with issuer, scope, validity interval, and revocation/supersession; an authentication/attestation boundary; and a structured independence/descent declaration for evidence events. Treat failed gates as invalid events, not low-quality evidence. If enforcing identity is outside vsect’s scope, accept events as unverified claims and never use their role/independence to advance a rung requiring those properties.

### A-07 — High — The file grammar and version function are not sufficiently defined to bind evidence to text safely

**Evidence.** A statement span begins at a Markdown tag and ends at the next tag or heading; its hash is calculated after “md-press” normalization, unwrapping logical lines and collapsing whitespace (`model.md:25`; `storage.md:84–86`). The grammar of tags, headings, nested headings, tags in lists/tables/code fences/block quotes, duplicate tags, escaped text, YAML parsing/canonicalization, Unicode normalization, line endings, comments, and links is absent. “md-press’s rules” is referenced but not identified as a versioned dependency. Math normalization is explicitly open (`open.md:16`).

**Why it matters.** A content hash can only protect exactly what all producers parse identically. Under the current prose, a heading introduced within an explanation can silently truncate a statement; a duplicate tag can give two spans one address; formatter versions can invalidate a whole corpus or, more dangerously, agree on a hash while reading different content. A checker cannot reproduce an old event’s version once the parser changes.

**Required resolution.** Publish a normative grammar and canonicalization algorithm, including parser and normalization version in both the store profile and event. Choose a collision-resistant full digest encoding, not the illustrative six-character prefixes. Define parse errors and their safety behavior (especially duplicate/missing/nested tags), and add fixtures for every Markdown construct vsect accepts. Until equivalent mathematical expressions are specified, use a conservative byte/canonical-token hash that deliberately stales checks when notation changes; false staleness is safer than undocumented equivalence.

### A-08 — Medium — The “plain-editor” workflow has no reconciliation protocol for out-of-band mutations

**Evidence.** The design correctly permits editing a record with any editor (`vsect.md:75–91`) and calls the files an implementation anyone may edit (`vsect.md:9–18`). It says `revise` is the moment an edit becomes part of the store. But it never defines the baseline against which `revise` compares when a record is renamed, relocated, copied, deleted, changed on two branches, has frontmatter/statement tags edited separately, or is committed before `revise`. Kind must never change (`model.md:13–17`), events must be append-only, and flags are ordinary Boolean frontmatter yet are said to clear when a resolving act occurs (`model.md:88–90`).

**Why it matters.** The principal workflow explicitly bypasses vsect’s writer. Without a reconciliation state machine, `check` cannot distinguish an unrecorded new record from a copied collision, an accidental kind mutation from retirement/replacement, or a missing event from a branch merge. It also cannot know whether a manually cleared flag was resolved or simply erased. “vsect copes with that” is therefore the most important unspecified behavior in the tool.

**Required resolution.** Specify a manifest/baseline model and a `check`/`reconcile` state machine. Enumerate every out-of-band delta and the only permitted outcomes: accept and emit a reconstruction event, quarantine pending explicit disposition, reject, or require an explicit migration/retirement action. Make frontmatter ownership clear: which fields are author declarations, which are tool-maintained act results, and how direct edits are detected and reviewed. Include merge fixtures and prohibit a successful `commit` when un-reconciled record or trail mutations exist.

### A-09 — Medium — Store resolution and cross-store identity are contradictory/incomplete for nested stores

**Evidence.** A store is the directory containing `.vsect/`; vsect always selects the nearest store above the current directory; another store is reached as `store/kind:slug` (`model.md:7–11`). AAT is explicitly expected to contain a nested SOP store. But the storage layout only discusses find globs (`storage.md:7–19`); it has no `stores:` mapping or store identifier. It consequently does not say whether a parent search skips nested `.vsect` roots, how a store name resolves, how name collisions are handled, whether an event/report can target another store, or whether traversing a symlink may leave the selected root.

The imported spec-lite convention already specifies the missing pieces: a named `stores` mapping in each store’s kinds file, unqualified references resolved locally, qualified references resolved by the target’s own kinds file (`sop/adr/cross-store-links.md:45–50`), and kind/slug identity plus duplicate detection (`sop/src/conv-records.md:16–28`; `sop/adr/kind-slug-references.md:42–44`).

**Why it matters.** `vsect read`, `bring`, `take`, `impact`, and links may operate over the wrong store precisely in the nested layout the draft proposes. A qualified name is a syntactic promise but not an address until the mapping and canonical store identity exist. It also weakens provenance: “ASF at 4ee2b89” does not say which content root or imported source bytes were used.

**Required resolution.** Adopt or explicitly supersede the spec-lite address contract: declare immutable/canonical store identity, a named store registry/mapping, local versus qualified resolution, nested-root and symlink behavior, cross-store event/report rules, and collision/error behavior. Use fully qualified targets in event data whenever a trail may outlive a local context.

### A-10 — Medium — Command, exit-code, and transactional semantics are too ambiguous for automation and multi-writer use

**Evidence.** The draft promises a program-facing JSON/udon interface and a fixed four-code scheme: zero is “done and nothing outstanding,” one is “done, with something the caller should see,” two is failed, and three is not run (`vsect.md:180–186`). It does not state the schema/version/streaming behavior for machine formats, nor what “outstanding” means per command. For example, a successful `revise` in a store with an old unrelated finding apparently returns 1; `take` can place some items while leaving others unplaced; `refute` changes the target and all affected dependents; `bring` and `land` make multiple files; and `commit` adds a git commit and trailers. There are no atomicity, locking, retry, idempotence, partial-failure, concurrent-writer, or recovery rules.

**Why it matters.** Agents and scripts will either treat useful success as failure or ignore signal-bearing nonzero returns. A crash halfway through a multi-file cascade can leave the corpus in the precise unsafe state the command was supposed to prevent. Per-event filenames reduce—but do not remove—collisions; they do not make a record update plus its event plus an influx disposition transactional.

**Required resolution.** Give each command a contract: validated inputs; reads/writes; atomic unit; idempotency key; possible partial result; recovery procedure; structured output schema and version; and command-local exit meaning. Reserve nonzero for a documented caller action, or separate “command succeeded” from “store health” in machine output. Implement journal/intent-plus-finalize or an equivalent recoverable transaction for every operation spanning record, event, view/influx, and git state.

### A-11 — Medium — The starting kind profile conflates incompatible write semantics and has not passed its own founding test

**Evidence.** The profile calls `experiment / run` one row despite an experiment design being mutable present intent and a run being an append-only historical execution (`model.md:104–116`). `report` is described as append-only, but audit reports normally need a present body plus an append-only trail/dispositions. `carried` is both inbound material and lowest-rung evidence; `influx` is separately described as the place before material joins the store (`model.md:96–98`). `def` is a term group with multiple lines, while `segment` contains heterogeneous adjudication units. The draft candidly says the eleven record kinds and eight statement kinds were assembled rather than tested (`open.md:7–10`).

RC1 requires kind write semantics to follow truth conditions—replacement versus append-only—and says composite content must be consciously reified, viewed, clustered, or visibly exempted (`02-RECORD-OBJECT-MODEL.md:15–21`; `10-FOUNDING-QUESTIONS.md:7–15`).

**Why it matters.** These are not merely labels. They determine history, evidence grain, lifecycle, imports, and whether `new` can build required frontmatter. Conflation makes it impossible to decide whether an edit is a revision, a new historical account, or an invalid mutation. It also risks quietly converting an unreviewed carry into a record that looks landed.

**Required resolution.** Do not ship a generic theory profile yet. Run each candidate through RC1’s founding questions using real AAT material and publish the answers. Split `experiment` from `run`; distinguish carrier/influx objects from evidence about a landed statement; decide whether a term group is a cluster/view versus an atom; and state each kind’s write semantics, required fields, dimensions, gates, and consumer licenses. The initial CLI can operate on an intentionally smaller profile while this work happens.

### A-12 — Low — The initial implementation plan promises read-only results before the data needed to compute them exists

**Evidence.** The draft says the dashboard, `read`, `next`, `outline`, `check`, `why`, and `kinds` can be built first over Markdown/frontmatter (`vsect.md:197–199`). Yet the same commands require declared statement boundaries and dependencies, event/trail data, typed edges, clocks, era state, kind/evidence/projection declarations, identity/collision data, and an outline semantics that are not currently defined. The dashboard says it “reads nothing but the store” and is fast enough for every arrival (`vsect.md:20–50`), but no indexing, cache invalidation, symlink/exclusion, malformed-file, or partial-store behavior is specified.

**Why it matters.** An early read-only implementation will silently choose the unresolved semantic rules and become de facto governance. That is especially dangerous here because the draft’s stated goal is to prevent arbitrary status words and invisible assumptions.

**Required resolution.** Narrow milestone 0 to inspection that makes no epistemic inference: discover/parse records, report structural errors, display raw declarations and raw event trails, and expose ambiguous/unresolved data explicitly. Make the first semantic milestone the profile/projection/edge/event fixtures required by A-02 through A-07; only then add dashboard standing, cascade, or ranking.

## Cross-cutting observations

### The draft should distinguish four different claims

Several passages slide between them:

1. **A user asserted an act happened.**
2. **The act is reproducible and its reproduction supports the recorded outcome.**
3. **The actor is authorized or independent enough for a rung.**
4. **The trail has not been rewritten since an identified anchor.**

They should be separate fields/projections, not an `actor.role` string plus an event file. RC1’s distinction between reproducibility, trail tamper-evidence, and substrate-grain identity is the useful minimum (`08-CERTIFICATION-AND-AUDIT.md:17–21`).

### The strongest part of the draft can be preserved

The recommended fixes do not require abandoning the porcelain. `read --bare`, verifier briefs that suppress prior findings, explicit decline events, carried-source prompts, visible queues, and the landing-rule check all remain good interfaces. They need a stable statement/sub-record identity, a report protocol, and declared computations underneath them.

### The provenance register is candid but not yet a substitute for a conformance boundary

`open.md` does a good job identifying provenance and open questions. A tool specification also needs a section that says which sentences are normative requirements, which data declarations are extensible, which are examples, which source choices are consciously superseded, and how versions of the store profile migrate. Without that boundary, a future implementation cannot tell whether it may change an example’s behavior.

## Recommended disposition and sequencing

### Before any semantics-changing command

Resolve A-01 through A-07 in a short **core model/profile** document plus executable fixtures. The exit criterion should be that two independent implementations can parse the same sample store and produce the same raw event validity, line states, standing/floor, stale/broken markers, finding dispositions, and cascade set.

### Safe first implementation slice

Implement only:

- a strict parser and structural `check` for the settled record/sub-record grammar;
- name resolution/collision reporting;
- raw record and trail display, with no inferred standing; and
- fixture-based validation of canonical hashing and event schema.

This respects the draft’s “read-only first” intent without prematurely freezing the unresolved epistemic semantics.

### After the core model is executable

Add `new`/`revise` with reconciliation (A-08), then report creation/intake (A-05), authority-gated decision/purpose operations (A-06), typed cascades (A-03), and finally a transactional multi-writer write path with machine interface contracts (A-10). Build dashboard ranking last, after the store can compute its inputs rather than inventing them.

## Positive findings

- The draft correctly refuses a single universal certainty/status word and separates authority over process from truth of theory (`model.md:42–57`, `model.md:82–86`).
- Version-bound checks and the explicit landing-rule scenario directly address a real and costly class of integration failure (`vsect.md:104–110`; `session-aat.md:143–159`).
- The design makes unresolved work visible and gives absence more than one meaning, both important anti-forgetting properties (`vsect.md:9–18`).
- It explicitly records its uncertain decisions rather than presenting synthesis as settled estate doctrine (`README.md:23–27`; `open.md:5–21`). That candor makes the necessary redesign tractable.

## Audit conclusion

`vsect` is a promising workflow design, not yet a sufficiently specified integrity system. Its next artifact should not be more command prose. It should be a small, testable core that makes the chosen adjudication unit, its identity/version, typed edges, authority gates, event validity, and projection rules explicit. Once those exist, the existing porcelain can become reliable rather than merely persuasive.
