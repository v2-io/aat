# Coordinator's judgment of the two vsect audits — and what gets integrated

*2026-10-28. Audits: `claude-audit.md` (Claude Opus 5.5, bare brief), `codex-audit.md` (Codex, bare brief). My own read, written before either landed: `coordinator-pre-audit-notes.md`. Joseph asked for at least one de novo audit, judged and integrated, before he sees the result. This file is the judgment; the integration is done by the drafting fork against it.*

## Verification of the one claim I could not take on trust

The Claude audit says the 2026-08-31 exchange the draft (and I) cited as Joseph's objection to splitting AAT segments *resolved* two turns later. **Verified at the primary** (`~/.claude.bak.2026-09-23/projects/-Users-josephwecker-v2-src-arch-firmatum-verisectorium/91c680e1-c357-49bd-8a82-12bcb8ca5065.jsonl`): L332, the agent: *"An atom is the thing with one fate. Its parts share that fate; a separate atom has its own. … could this piece be refuted, superseded, or ratified while that piece carries on unaffected? … if a segment held two claims and a counterexample killed one while the other stood untouched, you'd be holding two fates in one wrapper — two atoms."* L341, Joseph: *"OK-- excellent. This seems a lot more reasonable-- and it's completely different from literally everything you've been saying since the beginning."* L344, the agent: this is RC1 02's invariant, which "doesn't currently open the model — a founding agent should probably meet 'one fate, one atom' before meeting a single question or table."

So: Joseph's objection was to splitting a claim's *gloss / formal expression / discussion* (one fate) into separate atoms, not to separating independently-failable claims. I quoted L329 without the resolution at L332–L341 — the truncation failure. Corrected in `40-emerging-picture.md`.

## The two audits, compared

They are complementary with little overlap: Codex audited vsect as an **integrity system** (identity, computation, edges, trail, report protocol, grammar, reconciliation, transactions); Claude audited it as a **truth instrument against its own sources and the real corpora** (where the defects actually live, decay on referent change, the landing rule's weakening, spec-lite fit, the worked example's own rule violations). Convergence (independent families, same draft): untyped edges (A-03 ≈ S9); self-declared identity/role (A-06 ≈ S6); kind profile untested / shouldn't be seeded (A-11 ≈ S2); exit codes (A-10 ≈ minor); statement as underspecified adjudication unit (A-01 ≈ S1/L1). My own pre-audit concerns: #1 (interactive prompts vs agents) — partly A-10; #3 (untagged prose) — L1, made decisive by the corpus census; #5 (depends grain) — A-03/S9; #7 (ASF import path) — S7. My #2/#4/#6 were minor or subsumed.

## Disposition (adopt / adopt-in-form / decline), with reasons

**The central re-cut (L1 + S1 + A-01):** adopt. The design principle that opens the model is Joseph-endorsed **"one fate, one atom"**. A *statement* is the atom (RC1's record/atom, renamed honestly as a mapping): it has a stable id, a lifecycle (mint / retire / supersede / split / merge / rename-with-carry), collision detection, and its own trail. A *record file* groups atoms for reading (a view-like container — the segment is not a kind; say so). **A claim's gloss, summary sentence and discussion share its fate**: they are part of the atom's text and its version, or — if they narrate several atoms — they are `teaching` that `narrates` them and goes stale when any changes. Untagged truth-apt prose is the thing `check` flags. Run the five-segment re-marking test (open Q1) and count where existing findings fall relative to atoms.

**Computation (A-02, S10 floor, L2):** adopt. Standing is a *declared* projection per statement-kind/line (rungs, event classes, invalidation, projection functions, licenses), order-invariant, with fixtures. **Decay on referent change** (L2): a statement's effective version includes the effective versions of its declared premises and definitions; a redefinition upstream stales dependents' checks, and the reword/redefine call is where that cost is paid down. Until projections are declared and fixtured, show raw per-line trails (no synthetic headline).

**Landing rule (L3):** adopt the source's form: *any* rewording — even one judged equivalent — is checked again by a different mind (`revise` emits the one-paragraph equivalence brief); author carry-over is recorded as the author's claim at the lowest rung, never as the check carrying over. If that proves costly in use, that's a finding for Joseph, not a pre-emptive softening.

**Version actually read (L4):** adopt: verifiers get a snapshot (`vsect read --at`, a worktree, or `git show`), and `take` derives the version from the spans a report quotes when it can, recording which way it was determined.

**Typed edges (A-03 + S9):** adopt a small closed set — `premise` (necessary; refutation → broken), `supports` (non-necessary; weakening → undercut), `defines`/uses-term, `narrates` (teaching; → stale), `instantiates`, `proves`, `seeded-by` (descent; transitive; needed for independence), `supersedes` — each with grain, direction, transitivity and cascade behavior declared; unknown edge kinds rejected. Spec-lite's hand-written `consequences:` is addressed explicitly (computed reverse vs hand-declared; a disagreement is a `check` finding).

**Trail integrity (A-04):** adopt Codex's *own fallback*, honestly stated: append-only by convention, anchored by git; event ids content-derived; `corrects:`/`episode:` references unambiguous; `check` detects edited/deleted/duplicate event files. No signatures or Merkle manifests in v0 — that would be plumbing ahead of need for a local single-steward estate; the trusted-base section says exactly what is and isn't guaranteed (with S6).

**Report/finding protocol (A-05):** adopt: a minimal report format that `brief`/`verify` produce and `take` accepts (finding id, target statement id + version, check type, criterion + commitment, outcome, reproduction pointer); free-form reports become *unplaced findings* a mind binds; idempotent re-take.

**Actors and authority (A-06 + S6):** adopt in its fallback form: actor/role/independence are recorded *claims* with a structured descent declaration (what the actor had read); they never by themselves advance a rung that requires independence; the harness's session id goes in commit trailers where available. Declare steward/decider bindings in the store; a purpose revision by anyone else is refused. No credential system.

**Grammar & version normalization (A-07 + md-press minor):** adopt: a normative statement grammar (tags, spans, duplicates, nesting, code/quotes), a vsect-owned frozen deterministic normalizer (not md-press's probabilistic joins), full digests; conservative hashing that stales on any notation change until math equivalence is specified.

**Reconciliation (A-08):** adopt: a `check`/`reconcile` state machine for out-of-band edits (rename, copy, delete, branch merge, frontmatter-only edits, kind mutation), each with an allowed outcome; `commit` refuses with unreconciled mutations. **Flags (S4):** decide them as *computed* projections (who moves next) and drop them from frontmatter; state the departure from spec-lite.

**Stores & addressing (A-09):** adopt spec-lite's existing address contract (`stores:` mapping, local vs qualified resolution, kind:slug identity, collision surfacing); event paths keyed by `kind:slug` (fixes the minor collision finding).

**Commands (A-10 + my #1 + minor exit-code):** adopt: each write verb has a contract (reads/writes, atomic unit, idempotency, partial results, recovery); **every interactive question has a flag/heredoc form, and with no TTY a needed answer is refused with the question stated (exit 3), never defaulted**; `--dry-run` on cascading verbs; separate "command succeeded" from "store has outstanding items" in exit codes so the dashboard's exit code means something.

**Kinds at founding (A-11 + S2):** adopt: `init` seeds **no** kinds; the theory profile ships as influx material for the founding questions; split experiment/run; "carried" reserved for external material; the predecessor corpus gets its own crossing (S7). Kinds admitted by the five-segment test as first evidence.

**Predecessor import (S7):** adopt: `bring --from-predecessor` (name TBD) carries ASF segments *and* places ASF's certified findings as findings with provenance; ASF's `status:`/`stage:` arrive as recorded claims of the old corpus at the lowest rung, never as standing. **Tag words (S8):** one place declares statement-kind; ASF's ~30 tag words (`Derived` ×242, …) mapped by a reviewed table, never imported as standing words; fix the non-existent tag examples.

**Worked example (S3 + minor slips):** adopt: refute by counterexample (the tabular-RL agent), show the *redefinition* path for the exclusion rationale under the typed target, drop "leave it" as a live option (the GA-1 two-horn no-go narrows it — say so), remove the invented Joseph quote, don't prime the verify brief with the question's systems, fix "certified in July", 174 files, and the downstream-weighting sentence stated as fact.

**Spec-lite fit (L5):** adopt by narrowing: README states theory-first; the spec profile is future work; the `status:`/`verification-level` conflict is recorded as a question for spec-lite's decider (a steward decision exists there — name it, don't override it).

**Milestone 0 (A-12):** adopt: parse, identity, collisions, raw declarations and raw trails, structural check — no inferred standing, ranking or cascade until the core declarations and fixtures exist.

**Working notes (S10):** define them: forward-work only (estate rule); findings are objects, never WN prose; a `--bare` read excludes WN.

**Minor findings (Claude):** adopt all as edits (orient vs vivarium's sealed-quiz precedent noted as the stronger instrument; relata's identifier-grade-only auto-resolution; the three-audience attribution corrected to "Claude's proposal, not decided"; steward ≠ decider; `commit` refusal case named; refutation contest channel + independence; undefined terms added to the model page).

## What I'm guarding in the integration

Both audits pull toward specification completeness, which is right underneath and wrong on top. Joseph's verdict on the 09-29 sketch was "plumbing without the porcelain". So: **`vsect.md` stays porcelain** (the verbs, the dashboard, what the user sees and is asked); the integrity contracts land in a separate core document (model + declarations + grammar + edges + events + reconciliation + command contracts + fixtures-to-write), which the user never needs to read. "The constraints are the product; the taxonomy is the packaging" (grok, RC1 90). And "one fate, one atom" opens the model, before any table.

---

# Round 2 — judgment of the `agy` (Gemini 4 Argon, medium) audit of the revision at 83dd98b

*Bare brief (`agy-brief.md`); run interactively by Joseph after my print-mode run stalled. Read whole. Spot-checked at the primary: B1's quote of Joseph (`spec-lite/sop/adr/landed-not-integrated.md:47`, verbatim ✓); A3's `Proof Step` ×6 in `deriv-sector-condition.md` ✓; `*[Definition (transition opacity)]*` ✓. My quick regex counts 65 paren-less tags where agy reports 91 — different patterns; treat its census numbers as one auditor's, the direction (most ASF tags don't parse under §1 as written) as sound.*

This audit is the first outside read of the revision's new layer (`core.md`, the reworked `storage.md`), and it is mechanically sharp: it executed the contracts against the porcelain and the real corpora. Several defects were introduced by round 1's integration (synthesized mechanisms not traced end-to-end) — exactly what a second round exists to catch.

**Adopt all ten load-bearing findings and all eight secondary ones, with these forms:**

- **A1** — store canonical statement snapshots (`.vsect/objects/<own-version>` or git blobs) and record `own-version` + declaration digest on lifecycle events. Without it `read --at`, diffs, equivalence briefs and rename detection cannot run.
- **A2** — replace the opaque recursive digest with a **dependency-version vector** (the statement's own version plus each premise/definition's own version, over the closure), with `confirm-rewording(S, v1, v2)` defining an equivalence on own-versions; a check holds iff every component is equivalent. Staleness stays transitive (L2's intent kept), re-binding becomes O(1). Require premise ∪ defined-by to be a DAG; a sentinel for unwritten targets. Note in open.md: confirming a root rewording asserts *unconditional* equivalence — if the confirmer can only say "equivalent for criterion C", dependents re-bind individually.
- **A3** — any heading ends a span; `of` uses the same span rule; teaching edges live only in frontmatter; id uniqueness is per record; tag markers stripped before hashing; predecessor import is raw influx, with tag normalization done when a segment is carved, not by a word table.
- **A4** — §4 is the *core* edge set, extensible by store declaration (resolving the line-5 contradiction); add edges for citing purpose/decision/aim, question concerns/blocks, recognition-over-instances, template specialization; specify the `proves` reverse coupling (a broken or stale derivation undercuts its claim's derivation line).
- **A5** — event envelope + per-act-class payloads; add `revise` and `era`.
- **A6** — report items typed check / finding / equivalence / finding-review; porcelain verbs (or `findings` sub-verbs) for confirm-rewording, confirm-answered, dispose-finding; a storage home for unplaced findings, reports and briefs.
- **A7** — reverse §7.4: the report's declared version first, quotes as a consistency check; quote search only for free-form reports.
- **A8** — an outline grammar section in core.md; container rows project broken-first + counts, never a scalar.
- **A9** — `read`/`descends-from` are declared provenance (seeded by `verify`), stated honestly; the independence predicate excludes the shared premises/definitions both must read. The deeper point is a **real design tension, routed to open.md, not resolved by fiat:** "one fate, one atom" puts a claim's defending discussion inside its atom, but a de novo verifier should re-derive without the author's working. Proposed handling: `verify` gives the claim's formal clause + its declared premises/definitions; derivations (their own records) and defending discussion are withheld. Whether withholding part of an atom is coherent is a question for Joseph.
- **A10** — **`grain: record`** for single-statement record kinds (the record *is* the statement; no tags needed). Elegant: card stores (spec-lite) and container stores (AAT segments) run on one engine. Add `strength:`, `depends:`/`per:`/`test-fixtures:`, `context:` sidecars, and `terms:`/«…»/⟦…⟧ to the spec-lite list and a core contract.
- **B1** — influx crossings use `integrated` (Joseph's ruling, verified); `landed` stays the outline row-type.
- **B2** — **`refute` writes a visible, generated mark into the record file** (a callout naming the event). This is ASF routing §4.1 — "A segment must never lie about its own status, even transiently … In the segment. Not a quiet note in tracking." — and outranks the "nothing computed is written into files" convenience. `check` verifies the mark matches the trail.
- **B3** normalizer as a precise pipeline; **B4** canonical kind names in ids and paths; **B5** ceiling = f(statement-kind, form, lines, premise ceilings); **B6** `+dirty` moments; **B7** `revise` is the single reconcile verb (`reconcile` = `revise --all`) with split/merge/supersede/rename choices; **B8** heuristic counts outside the exact-agreement surface.

**Guarding, as in round 1:** `vsect.md` stays porcelain — new mechanism goes to `core.md`/`storage.md`; new verbs only where a moment of real work needs one (A6's confirm/dispose are such moments). Nothing declined.
