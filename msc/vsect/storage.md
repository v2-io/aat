# What is on disk — for the maintainer, not the user

*Draft, revised after three de novo audits (round 2 restructured it). The user works in the terms of [`model.md`](model.md); the rules files must satisfy are in [`core.md`](core.md). This file shows what the files look like, so anyone can still read a store with `cat` if vsect is unavailable — including, since round 2, that a refuted statement says so in its own file.*

## Layout

```text
<store>/
  .vsect/
    kinds.yaml          declarations: name, steward, decider, stores, kinds (with grain), lines, edges, projections, clocks
    events/<canonical kind>/<slug>/<event-id>.yaml   one file per act, content-addressed
    objects/<2 hex>/<own-version>                     every statement version vsect has seen, content-addressed
    eras.yaml           era keys (code versions etc.) and their current values
  main.outline.md       the main view; other views beside it as *.outline.md
  briefs/               briefs vsect wrote for verifiers, auditors and equivalence checks
  reports/              report records: what verifiers and auditors sent back
  <any directories>     records; directories only organize
  influx/               material not yet taken in, and the crossings log
  CHANGELOG.md          the history layer, required from founding
```

Records are found through `kinds.yaml`'s `find` globs and their frontmatter `kind:`, as spec-lite and limen's `vsect` plugin already resolve `[[kind:slug]]`. Limen keeps following records in a vsect store unchanged; following a link to a statement (`#id`) needs limen to learn the statement tag (it currently resolves `#suffix` to headings, block ids and fixture cases).

## A container record

Markdown with YAML frontmatter, one record per file. Frontmatter holds only what the author declares about the record and its statements; nothing computed is written there.

```markdown
---
kind: segment
statements:
  residual-learnable:
    as: scope
    defined-by: [definition:epistemic-target#typed-target]
  exclusion:
    as: claim
    form: qualitative
    premise: [segment:scope-adaptive-system#residual-learnable]
---

# Scope: Adaptive System

*[Scope (residual-learnable)]* A system is in the adaptive scope when something it could learn about its world remains unknown given its history: $H(S_t \mid \mathcal C_t) \gt 0$, with $S_t = (\Omega_t, \theta)$.

> [!vsect refuted] Refuted 2026-10-29 by counterexample — tabular RL: $o_t = \Omega_t$, transition law unknown. `vsect why segment:scope-adaptive-system#exclusion` (event 9f2c…).

*[Claim (exclusion)]* A system with nothing left to learn is outside the scope, because mismatch, gain and persistence have no work to do for it.

## Discussion

*[of (exclusion)]* For example, a fully known deterministic system: every prediction is right.

$$H(S_t \mid \mathcal C_t) = 0$$

## Working Notes

- (forward work only)
```

- The tag names the statement and gives its display word; the frontmatter entry, keyed by the same id, declares it. `vsect check` reports a tag without an entry, an entry without a tag, and a tag word that disagrees with the declared `as:`.
- Every heading ends a statement's span, so the `## Discussion` above would be unassigned without its `of` marker; with it, the paragraph *and* the display equation under it belong to `exclusion`.
- The `> [!vsect refuted]` block is a **generated mark** (`core.md` §10): vsect writes it when `refute` runs and removes it when the statement is replaced. It is the one piece of computed text vsect puts into a record, because a reader using `cat` must not read a refuted statement as live. It is not part of any statement's text, so writing it changes no version.
- `form:` is the author's declared shape of a claim (exact under named premises, qualitative, approximate, statistical). There is no per-statement `ceiling:`; a ceiling is computed from the statement-kind, its form, its lines and its premises' ceilings (`core.md` §6).
- Edges are the core set of `core.md` §4 plus any the store declares. Ids in files use canonical kind names or declared aliases; vsect stores only canonical names.
- `was:` names a retired record this one replaced.

## A single-statement record

A record kind declared `grain: record` *is* its statement: no tags, no `statements:` map; its edges sit at top level and its body (minus Working Notes and marks) is the statement's text. Questions, decisions, purposes and reports are of this grain, and so is every spec-lite card:

```markdown
---
kind: question
closer: steward-purpose
concerns: [segment:scope-adaptive-system]
blocks: [segment:agent-environment, segment:action-transition, segment:observation-function]
---

# Is $\theta$ a named part of the epistemic target?
…
```

## Objects

`.vsect/objects/` holds the canonical text of every statement version vsect has computed, named by its own version (the file hashes to its name). They are small — one statement's normalized text each — and committed with the store. They exist because a hash cannot be read back: without them vsect could not show a version that never reached a commit (`read --at`), diff two versions, write an equivalence brief, match a report's quotes, or notice that deleted text reappeared under another id.

## Events

See `core.md` §5 for the envelope and the per-act payloads. Paths are keyed by canonical record kind and slug (so `definition:agent-environment` and `segment:agent-environment` never share a directory), under the record that held the statement when the event was written; file names are the event's content digest, so two events can never collide and an edited event no longer matches its name. A statement's history is gathered by its `atom:` field, so moving a statement between records splits no trail.

## Briefs and reports

`vsect verify`, `vsect brief` and `vsect revise` (for equivalence checks) write briefs into `briefs/`. A verifier writes its report into `reports/` from the skeleton the brief points to (`core.md` §7.2). A report is a record of kind `report`; once taken, its body is not edited. Its items are addressed `report:<slug>#<item>`. A finding nobody has placed yet lives in its report's trail (`.vsect/events/report/<slug>/`) and is listed until someone places it — it never needs a target to exist.

## Influx and predecessor material

```text
influx/
  00-INDEX.md        the crossings log (append-only): item, outcome, where it went, why
  <items>            brought material, each with a provenance header (source path, commit, date, who brought it)
```

The index records only what the tree can't: outcomes (*integrated*, *rejected*, *needs-review*, *skipped*) and reasons. It never restates `ls`. *Integrated* is the influx item's outcome; *landed* is an outline row-type, and the two are not interchangeable (Joseph, 2026-09-30, spec-lite `sop/adr/landed-not-integrated.md`).

A **predecessor corpus** (ASF, for AAT v3) is brought with `vsect bring --predecessor <path>`. Its files arrive in influx **raw**, with provenance and nothing rewritten. Its findings (from its audits, findings catalog and Working Notes, where they name a target) arrive as report records under `reports/`, one per source, each finding unplaced until the statement it concerns exists here. Its standing words are recorded as what the old corpus claimed — an `assert` at the lowest rung, attributed to the predecessor — when a statement minted from that material lands, never as standing here.

ASF's tags will not parse as statements without work: a census of Part I at `4ee2b89` (2026-10-28, a regex count) found about 550 tags across 173 segments, only about a third in the `*[Word (id)]*` form; some 90 carry no parenthetical at all, many carry a provenance or condition note where an id would be (`*[Derived (from persistence-condition applied per edge)]*`), some open mid-paragraph or repeat within a file, and 20 segments have none. Tag words are also mostly standing words (`Derived` about 250 times). So statements are made when a segment is **carved** from influx — `vsect new` from an influx item — by a mind that mints ids, separates the old standing word from the statement-kind, turns `from …` notes into `premise:` edges, and records the old word as the predecessor's claim about its support. No word table makes these choices.

## spec-lite, the second corpus

vsect is designed theory-first; spec-lite is where its file conventions came from, and round 2 checked them against all 236 of its records. With `grain: record` its cards fit the same engine with no tags — but these differences would need its decider's call before vsect manages it:

1. **`status:` on decision records** (65 records). A decision's status is a process fact about the decision, not epistemic standing; declared as a process field, no conflict.
2. **`strength:` on 53 cards** (`provisional` 40, `lean` 6, `decided` 7). In spec-lite a card is the decision for its rule, and `strength:` is how firm Joseph's ruling is (`adr/leans-are-working-spec.md`: *"the strength of his word calibrates revisiting"*) — authority, not evidence. Declared as a process field of a card kind, vsect would show it beside computed standing, never merged into it. Whether that reading is right is spec-lite's decider's call.
3. **`verification-level:` and `evidence:` in frontmatter** — spec-lite's steward-decided convention (`sop/adr/per-kind-verification-and-status.md`, `decided-by: steward`) has the verifying act write these into the record. vsect computes the same from event files and writes nothing back. No spec-lite record carries the fields yet, so this is the moment to settle it; it is spec-lite's decider's question, not vsect's to override.
4. **Edges at record grain**: `depends:` (172 records), `per:` (171), `test-fixtures:` (30). `per:` is a core edge. `depends:` and `test-fixtures:` would be declared by the store (`core.md` §4): which of them are meaning edges — whose changes stale what rests on them — is the decider's call.
5. **Hand-written `consequences:`** (134 records, at Joseph's direction). vsect computes reverse edges and reports disagreements with written ones; it does not drop them.
6. **The three flags in frontmatter** (Joseph's own proposal, jaw-proposal §1.1). vsect computes who moves next instead; see `open.md`.
7. **`context:` sidecars** (`*.context.md`, history beside a card, Joseph 2026-10-20). Already excluded from records by spec-lite's `kinds.yaml`; vsect would treat them as the history layer for their card and never as statement text.
8. **Defined terms**: `terms:` on definition records and `«…»` / `⟦…⟧` delimiters (`sop/src/conv-term-delimiters.md`, resolved by limen). Covered by `core.md` §12.4.

YAML fixture records (`dat/<slug>.yaml`) are records like any other: a kind's `find` glob may point at YAML files, and their top-level mapping is their frontmatter.

## Moving to udon

Frontmatter field names are bare words, so they map one-to-one onto udon attributes; event files are flat mappings with one nested payload, one udon element each. When a lite parser exists vsect reads both forms and a store can move record by record (`vsect migrate --to udon <record>`) without changing any id. Event ids and own versions are computed over canonical content, not file bytes, so a format change changes neither — provided the normalizer is extended to udon prose with the same canonical output, which is its own fixture.
