# What is on disk — for the maintainer, not the user

*Draft, revised after two de novo audits. The user works in the terms of [`model.md`](model.md); the rules files must satisfy are in [`core.md`](core.md). This file shows what the files look like, so anyone can still read a store with `cat` if vsect is unavailable.*

## Layout

```text
<store>/
  .vsect/
    kinds.yaml          declarations: name, steward, decider, stores, kinds, lines, edges, projections, clocks
    events/<record-kind>/<record-slug>/<event-id>.yaml   one file per act, content-addressed
    eras.yaml           era keys (code versions etc.) and their current values
  main.outline.md       the main view; other views beside it as *.outline.md
  <any directories>     records; directories only organize
  influx/               material not yet taken in, and the crossings log
  CHANGELOG.md          the history layer, required from founding
```

Records are found through `kinds.yaml`'s `find` globs and their frontmatter `kind:`, as spec-lite and limen's `vsect` plugin already resolve `[[kind:slug]]`. Limen keeps following records in a vsect store unchanged; following a link to a statement (`#id`) needs limen to learn the statement tag (it currently resolves `#suffix` to headings, block ids and fixture cases).

## A record

Markdown with YAML frontmatter, one record per file. Frontmatter holds only what the author declares about the record and its statements. Nothing computed is written there — no status, stage, verification level or who-moves-next flags.

```markdown
---
kind: segment
statements:
  residual-learnable:
    as: scope
    defined-by: [def:epistemic-target#typed-target]
  exclusion:
    as: claim
    form: qualitative
    premise: [segment:scope-adaptive-system#residual-learnable]
---

# Scope: Adaptive System

*[Scope (residual-learnable)]* A system is in the adaptive scope when something it could learn about its world remains unknown given its history: $H(S_t \mid \mathcal C_t) \gt 0$, with $S_t = (\Omega_t, \theta)$.

*[Claim (exclusion)]* A system with nothing left to learn is outside the scope, because mismatch, gain and persistence have no work to do for it.

*[of (exclusion)]* For example, a fully known deterministic system: every prediction is right.

## Working Notes

- (forward work only)
```

- The tag names the statement and gives its display word; the frontmatter entry, keyed by the same id, declares it. `vsect check` reports a tag without an entry, an entry without a tag, and a tag word that disagrees with the declared `as:`.
- `form:` is the author's declared shape of a claim (exact under named premises, qualitative, approximate, statistical). There is no per-statement `ceiling:` typed by hand; a ceiling is derived from the statement-kind and its lines.
- Edges are the closed set of `core.md` §4 (`premise`, `supports`, `defined-by`, `narrates`, `instantiates`, `proves`, `seeded-by`, `supersedes`).
- `was:` names a retired record this one replaced.

## Events

See `core.md` §5 for the schema. Paths are keyed by record kind and slug (so `def:agent-environment` and `segment:agent-environment` never share a directory) and file names are the event's content digest (so two events can never collide and an edited event no longer matches its name).

## Influx and predecessor material

```text
influx/
  00-INDEX.md        the crossings log (append-only): item, outcome, where it landed, why
  <items>            brought material, each with a provenance header (source path, commit, date, who brought it)
```

The index records only what the tree can't: outcomes and reasons. It never restates `ls`.

A **predecessor corpus** (ASF, for AAT v3) is brought with `vsect bring --predecessor <path>`. Each predecessor segment arrives as influx with its provenance; its certified findings (from its audits, findings catalog and Working Notes, where they name a target) arrive as findings with provenance, waiting to be placed when the segment lands. Its standing words arrive as what the old corpus claimed: an `assert` event at the lowest rung, attributed to the predecessor, never standing here.

ASF's statement tags use about thirty words, many of them standing words (`Derived` 242 times in Part I, `Hypothesis` 22, `Result` 8, `Proved` 2, alongside `Definition` 87, `Formulation` 31, `Discussion` 24). On import they are translated by a mapping table a person reviews — `Derived`, `Hypothesis`, `Result`, `Proved` → `Claim`, with the old word recorded as the predecessor's claim about its support; `Formulation` → `Choice`; `Discussion` → teaching or an `of` paragraph — and never imported as standing words in text. (ASF has no `Claim` tag today; that word is introduced by the mapping.)

## spec-lite, the second corpus

vsect is designed theory-first. spec-lite already runs on most of these conventions, and four differences would need its decider's call before vsect manages it:

1. **`status:` on decision records** (65 records). A decision's status (proposed, accepted, superseded) is a process fact about the decision, not epistemic standing, so a decision kind may carry it; vsect's refusal applies to standing words on truth-apt statements. No conflict once declared that way.
2. **`verification-level:` and `evidence:` in frontmatter** — spec-lite's steward-decided convention (`sop/adr/per-kind-verification-and-status.md`, `decided-by: steward`) has the verifying act write these into the record. vsect computes the same from event files and writes nothing back. No spec-lite record carries the fields yet, so this is the moment to settle it; it is spec-lite's decider's question, not vsect's to override.
3. **Hand-written `consequences:`** (134 records, at Joseph's direction). vsect computes reverse edges and reports disagreements with written ones (`core.md` §4); it does not drop them.
4. **The three flags in frontmatter** (Joseph's own proposal, jaw-proposal §1.1). vsect computes who moves next instead; see `open.md`.

YAML fixture records (`dat/<slug>.yaml`) are records like any other: a kind's `find` glob may point at YAML files, and their top-level mapping is their frontmatter. Bare slugs in fields whose kind is declared (`fields: {per: decision}`) resolve; elsewhere they are reported.

## Moving to udon

Frontmatter field names are bare words, so they map one-to-one onto udon attributes; event files are flat mappings, one udon element each. When a lite parser exists vsect reads both forms and a store can move record by record (`vsect migrate --to udon <record>`) without changing any id. Event ids are computed over canonical field content, not over file bytes, so a format change does not change them.
