# vsect core — the contracts underneath

*Draft, written 2026-10-28 in response to two de novo audits, and restructured the same night after a third (`../vsect-audits/agy-audit.md`, round 2), which executed these contracts against the porcelain and the real corpora and found where they could not run. This is the document a user should never need: the contracts that make the porcelain in [`vsect.md`](vsect.md) honest. It is written for the implementer and for anyone checking that two implementations would agree. Everything here is proposed. Where a rule is stated as "vsect does X", that is the intended requirement; where it is an example, it says so.*

*Conformance boundary.* Sections 1–16 state requirements. Examples inside them are marked as examples. A store's own declarations (§6) may add statement-kinds, record kinds, lines, edges (beyond the core set of §4), projections and outline row-types; they may not weaken §§1–5, §7, §9–11 or §14. Anything this document does not cover is open and listed in [`open.md`](open.md); an implementation that has to choose there should surface the choice, not bury it.

## 1. Statement grammar

1. **Two grains.** Each record kind declares its grain. A **container** record (`grain: container`, e.g. an AAT segment) holds statements marked by tags. A **single-statement** record (`grain: record`, e.g. a spec-lite card, a question, a decision, a purpose, a report) *is* its statement: it has no tags, its statement id is its `kind:slug`, its edges and declarations sit in top-level frontmatter, and its statement text is its whole body except `## Working Notes` and generated marks (§10). The rest of this section concerns containers; everything after it applies to both grains.
2. **Tags.** A statement begins at a tag `*[<Word> (<id>)]*` that opens a paragraph, outside code spans, fenced blocks, block quotes and tables. `<Word>` is the statement-kind's display word; `<id>` is lowercase kebab-case, unique within the record (§2.1). A tag word that is not a declared display word is a parse error once the store declares kinds.
3. **Spans.** A tag opens a **span** that runs over every following block — paragraphs, lists, display math, tables, block quotes — up to the next tag, the next `*[of (…)]*` marker, the next heading **of any level**, or the end of the record. Headings always end spans, so a statement under `# Title` never swallows a later `## Discussion`.
4. **Attached spans.** A paragraph opening with `*[of (<id>)]*` opens a span by the same rule, and that span belongs to statement `<id>` of the same record. This is how a gloss, a summary sentence or defending discussion that is not contiguous with its statement shares its fate — with its display equations and lists, since the span rule is the same. A statement's text is its primary span followed by its attached spans, in document order.
5. **Teaching.** A paragraph that speaks for several statements is its own statement, tagged like any other (`*[Teaching (part-i-overview)]*`), whose kind is declared as teaching. What it narrates is declared in frontmatter (`narrates:`, §4), never inside the tag.
6. **Unassigned prose.** Every other block in a container (outside Working Notes) is unassigned. `vsect check` reports unassigned paragraphs that look truth-apt. The detector is a heuristic, its reports are prompts and not errors, and its counts are outside the exact-agreement surface (§16).
7. **Working Notes** (a final `## Working Notes` section) belong to no statement. They carry forward work only; findings never live there as prose (they are report items, §7). `vsect read --bare` excludes them.
8. **Parse errors**, each reported with its line and each stopping the record from being read as statements: a tag inside code, a quotation or a table; two primary tags with one `<id>` in a record; an `of` naming an id the record does not contain; a tag word that is not declared; a tag that opens mid-paragraph.
9. **Markers are not text.** Tag tokens (`*[Word (id)]*`, `*[of (id)]*`) and generated marks (§10) are removed before a statement's text is normalized (§3.1), so renaming an id or writing a mark never changes a version.

## 2. Identity and lifecycle

1. **Ids.** A statement's id is `<kind>:<slug>#<id>` for a statement in a container and `<kind>:<slug>` for a single-statement record, written as `<store>/…` outside its store. `<kind>` is always the **canonical** kind name in every id, `about:` field, event path and computed value; aliases declared in `kinds.yaml` (`def` for `definition`) are accepted only as input and in links, and resolved at once.
2. **Atoms.** A statement's identity is its **atom**: the id of the event that minted it (§5). Its displayed id is a name for the atom and may change; the atom never does. Events about a statement carry its atom, so its trail survives renames and moves; edges resolve to atoms, and bases and version vectors are built over atoms (§3.4), so renaming a premise stales nothing.
3. **Lifecycle acts**, each an event: **mint** (a new atom), **revise** (new text or declarations, classified reworded or redefined), **retire** (the atom stops being live; its history stays), **supersede** (a new atom answers now; the old points to it, and statements that cite the old one are reported for update), **split** (one atom becomes several new ones, each inheriting the parent's open findings to be re-placed), **merge** (several become one new atom, findings carried), **rename** (same atom, new id; moving a statement to another record is a rename). Every new atom is made by its own `mint`, so no event mints two: a `split`, `merge` or `supersede` is written after the mints of the atoms it brings in, and names them in `into`.
4. **Delete-and-re-add.** A statement whose text disappears while text whose canonical form is near-identical to its last stored version (§3.3) appears under another id in the same reconciliation is proposed as a **rename**, not retire-plus-mint, so its findings follow it. Near-identity is measured against the stored text, never guessed from a hash. The proposal is confirmed by the reviser (§11).
5. **Kind is fixed.** A record's kind never changes. A change of kind is: retire the old record's statements, mint new ones, `was:` linking the records.

## 3. Versions

1. **The normalizer** (`vsect-norm/1`; its name is recorded on every event that cites a version). For one span, in this order:
   1. decode UTF-8 and apply NFC; convert line endings to `\n`;
   2. remove generated marks (§10) and the leading tag or `of` token with the single space after it;
   3. parse the span into CommonMark blocks: headings, fenced code, display math (`$$…$$`), block quotes, list items, tables, HTML blocks and paragraphs; inside paragraphs and list items, protect inline code spans and inline math (`$…$`);
   4. fenced code and display math: kept byte-for-byte, except for line endings (already `\n`);
   5. paragraphs and list-item text: outside protected spans, a soft line break becomes one space, runs of spaces and tabs become one space, leading and trailing whitespace is removed; inside protected inline spans, a line break becomes one space and nothing else changes; a hard break is written as `\` followed by `\n`;
   6. list items: the bullet becomes `- `, ordered-list numbers are kept, nesting is written as two spaces per level; block quotes: each line's prefix becomes `> ` and the contents are normalized by these same rules; table rows: cells are trimmed and rows written as `| a | b |`;
   7. blocks are joined in document order with one blank line; a statement's spans are joined the same way.

   The normalizer does not attempt mathematical equivalence: any change to notation is a change. False staleness is preferred to undocumented equivalence.
2. **Own version.** The SHA-256 of a canonical serialization of the statement's kind, its declared `form:` if any, and its normalized text — written in full (abbreviations are for display only). Edges are not part of the own version; they shape the basis (§3.4).
3. **Objects.** Every own version a writing verb computes is stored at `.vsect/objects/<first two hex digits>/<own version>`: the canonical serialization itself, so the file hashes to its name. Objects are written by `new`, `revise`, `verify`, `take` and `refute` (whichever first sees a version), committed with the store, never edited, and checked like event files (§5.4). They are what makes `read --at`, diffs, equivalence briefs, quote matching and rename detection possible, including for versions that never reached a commit.
4. **Basis and version vector.** The **basis** $B(S)$ of statement $S$ is the smallest set containing $S$ and the targets of $S$'s own in-basis edges (§4), and closed under `premise`, `defined-by` and `specializes` (the *meaning edges*). Its **version vector** $V(S)$ maps each atom in $B(S)$ to its current own version, or to `unwritten` (a declared target not yet minted), or to `unreachable` (a target in another store that cannot be read now). The **effective version** is the SHA-256 of the canonical serialization of $V(S)$; it is an identifier for display and lookup. Checks are bound to the vector, not to the digest.
5. **No cycles.** The meaning edges must form a directed acyclic graph; `check` reports any cycle as an error on each statement in it. Terms that can only be defined together cannot be refuted or revised apart, so by "one fate, one atom" they are one statement (a term group record can hold it).
6. **Equivalence.** A `confirm-rewording` event (§5) about $S$ from own version $v_1$ to $v_2$ with outcome `equivalent` and scope `unconditional` adds the pair to a relation; $v_1 \sim_S v_2$ is the smallest equivalence relation containing every such pair for $S$. A confirmation scoped to particular checks (`for: [<event ids>]`, because the confirmer could only judge equivalence as it bears on those checks' criteria) applies to those checks alone. An outcome `not-equivalent` turns the change into a redefinition from then on.
7. **When a check holds.** A securing event recorded at vector $V$ holds now if and only if: the domain of $V$ equals the domain of the current $V(S)$ (no edge that shapes the basis was added or removed); for every atom $a$ in it, $V[a] \sim_a V_{now}[a]$, or a scoped confirmation for this event covers the difference; and the event's era values (if any) are current. If a component is now `unreachable`, the answer is *cannot evaluate*, shown as such and never as either holding or stale. Evaluation is local to the check (one pass over its vector): a confirmed rewording at a root re-binds every downstream check at once without writing anything downstream, and an unconfirmed change anywhere in a check's basis stales it however far upstream it sits.
8. **Moments.** Every computed value is shown "as of" a moment: the commit, with `+dirty` appended whenever tracked records, outlines, objects or events differ from that commit (`as of 4a91d0e+dirty`). Machine output adds the latest event's id and time. Commit ids appear only in moments, never as the version evidence is bound to.

## 4. Edges

Each edge is declared in frontmatter on the statement it is listed under (or at top level for a single-statement record) and points at statements, named by id and resolved to atoms. A reference to a single-statement record names its statement. A reference to a container record is allowed only on edges marked *container targets allowed* below, and means every statement in it as of now.

The **core set**, which every store has:

| Edge | Declared on → target | Target refuted or broken | Target's own version changes | In basis |
|---|---|---|---|---|
| `premise` | statement → statement it necessarily rests on | this statement is **broken**; broken propagates along `premise` | this statement's checks stale | yes (meaning edge) |
| `defined-by` | statement → definition of a term it uses | flagged to re-read | checks stale | yes (meaning edge) |
| `specializes` | statement → template it instantiates under stated substitutions | broken | checks stale | yes (meaning edge) |
| `supports` | statement → statement contributing non-necessary support | **undercut**: that support is removed from its evidence; flagged if a declared threshold is crossed | flagged to re-read | no |
| `proves` | derivation → the claim it proves | the derivation is flagged as proving something false (a no-go to examine) | the derivation's checks stale | yes |
| `instantiates` | worked example → statement it instances | flagged to re-check the mapping | checks stale | yes |
| `recognizes` | recognition → the statements it names a pattern across | flagged to re-check the pattern | checks stale | yes |
| `narrates` | teaching → statements (container targets allowed) | stale, and a generated mark (§10) | stale | yes |
| `serves` | norm → the purpose or statement stating its aim | the norm is flagged as having no standing aim | checks stale | yes |
| `per` | statement → decision or purpose whose authority it rests on | — (decisions and purposes are superseded, not refuted) | flagged to re-read; for a purpose, flagged for another look | no |
| `concerns` | question → statements (container targets allowed) | the question is flagged as possibly moot | the question is flagged to re-read | no |
| `blocks` | question → statements it holds up (container targets allowed) | — | — | no; read by `next` ranking |
| `seeded-by` | statement → statement, event or outside source its framing descends from | none | none | no; transitive for descent (§5.6) |
| `supersedes` | statement → statement it answers in place of | — | — | no; revised-by chains resolve to the current statement |

**The `proves` coupling.** A derivation's securing events count on the derivation line of the claim it proves only while they hold (§3.7); since the claim is in the derivation's basis, a check of a proof is a check that it proves *this* text. When a derivation is broken or its checks stale, the claim's support from it is removed exactly as for an undercut `supports` edge.

**Store-declared edges.** A store may declare further edges in `kinds.yaml`, each with: the kinds it is declared on and may target, whether container targets are allowed, its behavior when the target is refuted or broken and when the target's own version changes, whether it is in the basis, and whether it is a meaning edge (meaning edges must keep the graph acyclic, §3.5). Example: spec-lite's `depends:` declared as a meaning edge, its `test-fixtures:` as an in-basis edge to fixture records. An edge name that is neither core nor declared is a parse error.

**Reverse edges are computed.** Where a store also keeps hand-written reverse links (spec-lite's `consequences:`), `check` reports every disagreement between the written and the computed sets; neither silently wins.

## 5. Events

1. **Envelope** (every event; YAML now, udon later):

   ```yaml
   schema: vsect-event/1
   id: <sha256 of the canonical serialization of every other field>
   at: 2026-10-29T03:14:07Z
   store: aat-v3
   act: <one of the acts below>
   about: segment:scope-adaptive-system#residual-learnable   # canonical id at the time
   atom: <mint event id>          # when about a statement; omitted on `mint`, whose own id is the atom
   actor:                         # recorded claims, not verified identities (§15)
     name: claude-opus-5.5
     session: <harness session id, if available>
     role: verifier
     read: [<atom>@<own version>, <path>, …]   # declared provenance, seeded by the brief (§5.6)
     descends-from: [<atom, event id or outside source>, …]
   episode: <episode id>          # optional
   corrects: <event id>           # optional
   normalizer: vsect-norm/1
   ```

2. **Payloads, by act class.** Each act requires the envelope plus its class's fields:

| Class | Acts | Required payload |
|---|---|---|
| securing | `rederive`, `instantiate`, `run`, `read-check`, `assert`, `decline` | `basis` (the version vector, inline), `effective-version`, `line`, `criterion`, `committed: before \| after`, `recheck`, `outcome: confirmed \| broken \| narrowed \| inconclusive \| failed-to-run`; `era: {<key>: <value>}` for `run`; `from: <report item>` when taken from a report |
| lifecycle | `mint`, `revise`, `retire`, `supersede`, `split`, `merge`, `rename` | `own-version`; `declarations` (the statement's declared kind, form and edges, inline, targets as atoms); `record` (its file at the time); `change: reworded \| redefined` on `revise`; `from` / `into` (atoms) on `supersede`, `split`, `merge`, `rename` |
| equivalence | `confirm-rewording` | `from-version`, `to-version`, `outcome: equivalent \| not-equivalent`, `scope: unconditional \| {for: [<event ids>]}`, `criterion` when scoped |
| finding | `place-finding`, `review-finding`, `dispose-finding` | `finding: <report item>`; on `place-finding`: `target` (atom), `basis`, `version-from: declared \| brief \| quoted \| confirmed`; on `review-finding`: `revision` (the event answering it), `outcome: answered \| not-answered`, `criterion`; on `dispose-finding`: `disposition: rejected \| known-defect`, `reason` |
| refutation | `refute`, `narrow`, `contest` | `basis`; `ground: {kind: counterexample \| broken-derivation \| missed-prediction \| broken-mapping, text}`; `by` (report item or event), if any; `contests: <event id>` on `contest` |
| process | `brief`, `take`, `ask`, `answer`, `decide`, `cross`, `era` | `brief`: target, `basis`, role, stage, what it gives and withholds (§7.5); `take`: the report record and its items (id, type, span digest); `ask`/`answer`/`decide`: the question or decision record and, for `answer`, the option and any purpose minted; `cross`: the influx item, `outcome: integrated \| rejected \| needs-review \| skipped`, where it went, reason; `era`: key, from, to |

3. **Files.** One per event, at `.vsect/events/<canonical kind>/<slug>/<event id>.yaml`, under the record that held `about` when the event was written. A statement's trail is gathered by `atom`, across directories, so a moved statement's history stays whole without moving files; any index vsect keeps for speed is a cache and never authoritative.
4. **Append-only by convention, anchored by git.** vsect never edits or deletes an event or object file. `check` reports an event or object whose content no longer hashes to its name (edited), an id referenced by `corrects`, `episode`, `from`, `contests` or a payload that does not exist (missing), two events with identical content (duplicate), and a file present in git history but absent now (deleted). It detects these; it does not prevent them.
5. **Four different things, kept apart** in every projection: that someone *says* an act happened (the event exists); that the act is *reproducible* (its `recheck` re-runs to the same outcome); that the actor was *independent enough* (§5.6); that the *trail is unaltered* since an anchor (§5.4 plus git history).
6. **Independence.** `read` and `descends-from` are **declared provenance**: vsect cannot see what a mind read. `verify` seeds them with exactly what its brief gave (recorded on the `brief` event); the reporter or harness adds to them; vsect takes the declaration as a recorded claim, like `role`. A securing event $E$ on line $L$ for statement $S$ counts as independent of $S$'s author and of the evidence already on $L$ if and only if: its session differs from the sessions of $S$'s lifecycle events at the versions in its basis and of every event already counted on $L$; its declared `read` contains nothing from $S$'s withheld set (§7.5) and none of those events or their reports; and its `descends-from` chain (closed over `seeded-by`) is disjoint from theirs. What both sides necessarily read — the primary spans of the statements in $S$'s basis — is excluded from the comparison; otherwise no verifier could ever be independent. A rung that requires independence is moved only by independent events.

## 6. Declarations, lines, projections and ceilings

A store's `.vsect/kinds.yaml` declares, and nothing is computed that is not declared:

- statement-kinds (display word, whether the kind is teaching, failure modes and repairs in words) and record kinds (grain, `find` globs, aliases, required fields, process fields, write semantics: replacement, append-only, or container);
- lines: rungs in order; which acts with which outcomes move each rung up or down; whether a rung requires independence; what invalidates it (own-text change, basis change, era change);
- edges beyond the core set (§4);
- projections: named functions from a statement's events to a displayed value (`strongest-line`, `floor`, `broken`, `stale`), each with a sentence saying what a reader may conclude from it, and how a container record projects (§8.3);
- ceilings: a statement's **ceiling** is a declared function of its statement-kind, its declared form, its lines, and the ceilings of its premises — so an "exact under named premises" claim resting on an empirical premise is capped at that premise's ceiling;
- clocks, outline row-types (§8), term delimiters (§12.4), the steward, the decider, the store mapping, launchers and the orientation reading list.

vsect's own record kinds — **question**, **decision**, **purpose** and **report**, all single-statement — are built in, because its verbs write them; a store may alias them and add fields. Every domain kind is admitted by the store (`init` declares none).

Every projection is order-invariant: the same events in any order give the same value. **Until a store declares projections and their fixtures pass, vsect shows only raw per-line trails** (events grouped by line, in date order) and computes no summary.

## 7. Reports, briefs and findings

1. **Where they live.** A brief is written to `briefs/<slug>.md`; a report is a `report` record at `reports/<slug>.md` (paths declarable). A report's body is never edited after it is taken; a correction is a new report that cites it. A report's items are addressed `report:<slug>#<item>`.
2. **Item types.** A report written from vsect's skeleton gives each item a type:

   ```markdown
   ---
   kind: report
   author: {name: …, session: …, role: verifier, read: […], descends-from: […]}
   brief: briefs/verify-typed-target.md
   episode: <id>
   ---

   ## C1 (check)
   target: def:epistemic-target#typed-target
   effective-version: <digest from the brief>
   check: rederive
   criterion: …
   committed: before
   outcome: confirmed
   recheck: …

   ## F1 (finding)
   target: …
   effective-version: …
   quote: "…"

   <the reporter's own words>
   ```

   - **check** → a securing event. A check whose outcome is `broken` or `narrowed` also opens a finding carrying it, since something now needs answering.
   - **finding** → a `place-finding` event: an open finding on its target.
   - **equivalence** (the answer to an equivalence brief) → a `confirm-rewording` event.
   - **finding-review** (the answer to "does this revision answer that finding?") → a `review-finding` event.
3. **Free-form reports.** A report without typed items is accepted: `take` divides it into items (by heading, list item or paragraph), records the division on the `take` event, and leaves each item an **unplaced finding** until a mind binds it. An unplaced finding lives in its report's trail (`.vsect/events/report/<slug>/`) and is listed by `next` and the dashboard until placed. vsect may propose a binding (with how many places matched) but never binds one that would change standing without confirmation.
4. **Which version an item examined**, in order: the item's declared `effective-version` (or the brief's, recorded on its `brief` event), with every quote in the item checked to occur in that version's stored text — a mismatch is reported, not resolved silently; for an item with no declared version, a search of the target's stored versions (§3.3) for its quotes — one match is proposed, several are resolved to the version current when the brief was issued (or when the report was written, if there was no brief) and marked for confirmation. The event records which way the version was found.
5. **What a verification brief gives** (provisional — see [`open.md`](open.md), the verifier-and-atom question). Stage one gives the statement's **primary span** at the brief's version, the primary spans of its basis, the criterion, and where to write; it **withholds** the statement's attached spans, teaching that narrates it, derivations that prove it, its prior findings, and its author's events and reports — the **withheld set** used by §5.6. Stage two, issued only after the stage-one report is taken, gives the whole atom and asks whether every gloss and summary says no more than the statement. Each stage is its own `brief` event; the stage-two answer is recorded as a `read-check`, kept apart from the stage-one re-derivation, so the gloss check never counts as independent re-derivation.
6. **`take` is idempotent.** The same report taken twice adds nothing.

## 8. Outlines

1. **Grammar.** An outline is a `*.outline.md` file. Its headings are parts and chapters. Its tables have a header row; the columns are a row-type column, a record column holding one `[[kind:slug]]` link or nothing, a gloss column, and any number of computed columns, whose headers are `※(field)` (the record's frontmatter field) or `∂(projection)` (computed by vsect). Columns with no marker are authored.
2. **Row-types.** Each row has exactly one: `gap` (a suspected or known absence; a record it names does not exist), `proposed`, `exploratory`, `example`, `template`, `landed`. A store may declare more. Moving a row to `landed` needs whatever the store declares (spec-lite: a decision cited in `per:`). `landed` is a row-type only; an influx item is *integrated* (§5.2, `cross`).
3. **Container rows never get a single grade.** A row naming a container shows, in its standing column, broken and refuted statements first (`⚠ 2 broken`), then open findings, then counts of statements by kind and by projection value, or a statement the store declares as the row's headline. A row naming a single-statement record shows that statement's projection.
4. **Computed cells** carry a mark when they have no value: `—` (not applicable to this row), `∅` (applicable, nothing there), `⚠` (inputs unreadable). `vsect outline` renders them; `vsect outline --write` writes them into the file with the moment they were computed (§3.8); `commit` refreshes cells already written; nobody hand-edits one. Until a store declares the projection a column shows, the column is not shown.
5. **`vsect outline --check`** reports: a row-type outside the declared set; a record link that does not resolve, or resolves to a record whose kind differs; a `gap` row whose record exists; a written computed cell that disagrees with the computation; a record in the store that no view lists. Unresolved links in outlines are how limen and `new` find rows not yet drafted.

## 9. Landing and closing rules

1. **The landing rule.** Text that lands must be the text that was checked. If a statement's own version changes between a check and its landing, the check stays bound to the old version. Any rewording — even one the author judges equivalent — is checked again by a different mind: `revise` writes a one-paragraph equivalence brief ("Is $X$ equivalent to $Y$, as it bears on what was checked?"), and the old checks show as not carrying over until a `confirm-rewording` from someone other than the reviser arrives. The author's own judgment is recorded as an `assert` at the lowest rung.
2. **The scope of a confirmation.** A confirmer who can say "equivalent, full stop" confirms unconditionally, which re-binds every check in every basis the statement is in. One who can only say "equivalent as it bears on criterion $C$" confirms for the checks with that criterion; dependents whose checks used other criteria stay stale until confirmed for theirs.
3. **Closing a finding by revision.** A finding answered by a revision stays open until a `review-finding` with outcome `answered`, by someone other than the reviser (ideally the finder), against the finding's criterion. A finding against a retired statement is closed only by an explicit disposition, never by the retirement.

## 10. Refutation and the records that must not lie

1. **Refutation** requires a ground that is evidence (a counterexample, a broken derivation, a missed prediction, a broken mapping), not authority. It marks dependents per §4 at once. It can be contested (`contest`); a contested refutation shows both, and the derivation line's independence rule applies to the refutation as it does to support.
2. **Generated marks.** A record must never lie about itself, even transiently, even to a reader using `cat` (ASF's routing invariant, `~/src/arch/asf/doc/sop/audit.sop/routing.sop.md` §4.1: *"A segment must never lie about its own status, even transiently … In the segment. Not a quiet note in tracking."*; RC1 04: *"a reader mid-repair sees known-broken, never the old claim"*). So when `refute` runs, vsect writes a **generated mark** into the record file directly above the refuted statement's tag (or at the top of a single-statement record's body), and the same kind of mark above every statement the refutation makes broken and every teaching statement that narrates the refuted one:

   ```markdown
   > [!vsect refuted] Refuted 2026-10-29 by counterexample — tabular RL: $o_t = \Omega_t$, transition law unknown. `vsect why segment:scope-adaptive-system#exclusion` (event 9f2c…).
   ```

   A mark is a block quote whose first line opens `> [!vsect `; it belongs to no span and is removed before normalization (§1.9), so writing it changes no version. vsect writes, updates (`contested`) and removes marks (when the statement is retired or superseded); nobody else edits them; `check` reports a mark that disagrees with the trail and a refuted or broken statement without one. Marks are the only computed text vsect writes into a record; frontmatter never holds computed values.

3. **Replacement.** A mark is the interim state. The refuted statement is replaced by present truth — a no-go, a narrowed claim, or nothing — through `revise`, with `supersedes` recorded, and statements that cited the old one are listed for update.

## 11. Reconciliation of edits made outside vsect

Records are ordinary files, edited by anything. `vsect revise` is the single verb that turns working-tree changes into events: `vsect revise <record>` for one record, `vsect revise` with no argument for every unreconciled change in the store. `check` lists what is unreconciled. Allowed outcomes:

| Change in the working tree | What `revise` offers |
|---|---|
| statement text edited | classify reworded / redefined (§9.1) |
| tag added | mint; or, if text near-identical to a removed statement's stored version appeared, rename |
| tag removed | retire; rename (if near-identical text reappears, §2.4); supersede (name the successor); split (name the parts); merge (name the merged statement) |
| several tags removed and one added, or the reverse | merge or split, with the parts named |
| record file renamed or moved | same record if kind and slug are unchanged (directories mean nothing); otherwise a rename to confirm |
| record copied | collision: both kept, surfaced, resolved by retiring or renaming one |
| record deleted | retire its statements; findings stay visible |
| frontmatter `kind` changed | refused: kind change is retire + mint (§2.5) |
| declared form or statement-kind changed | classified like a text edit (the own version changed) |
| frontmatter edges changed | recorded on `revise`; bases recompute, and checks whose basis changed stop holding |
| generated mark edited or removed by hand | restored, and reported (§10.2) |
| event or object file edited, deleted or duplicated | reported (§5.4); never repaired silently |
| branches merged with divergent statements | each divergent statement is revised against both parents |

`vsect commit` refuses while any change is unreconciled, and names it.

## 12. Stores, addressing and terms

1. **Address contract** (spec-lite's, adopted): each store's `.vsect/kinds.yaml` has a `stores:` mapping of names to paths; unqualified references resolve in the local store; qualified ones (`store/kind:slug`) resolve through the mapping and then the target store's own kinds file; identity is `(canonical kind, slug)`, and duplicates are surfaced.
2. A store has a declared `name`, used in every event. Search for a store root stops at the nearest `.vsect/`; a parent store does not see a nested store's records except through its mapping. Symlinks are followed only within the store root.
3. Links in files name their kind; a bare slug is resolved only in a field whose kind is declared (`fields: {per: decision}`), never guessed elsewhere.
4. **Defined terms.** A store may declare term delimiters (spec-lite: `«…»` for its own terms, `⟦…⟧` for its SOP store's). A definition record lists its terms in `terms:`; the text inside delimiters must be a listed term (an inflected ending sits outside the closing delimiter). `check` reports a delimited term no definition lists (dangle), a term two definitions list (collision) and empty delimiters. `vsect lexicon` generates the lexicon from these declarations and never from prose.

## 13. Authority

The store declares `steward:` and `decider:` (names), and any delegations (issuer, scope, from, until, superseded-by). vsect cannot verify who is typing; it records actors as claims (§5.1). It refuses, at the porcelain, a `purpose` revision or a steward-routed answer whose recorded actor is not the declared steward, and records delegated decisions as awaiting ratification. These are checks against honest mistakes, not security; the trusted base (§15) says so.

## 14. Command contracts

1. **No hidden questions.** Every question a verb can ask has a flag or stdin form (`--answer key=value`, or a YAML/udon document on stdin). Without a terminal, a verb that needs an answer it was not given stops, prints the question, and exits 3. It never defaults.
2. **Exit codes** describe the command, not the store: 0 the command did what was asked; 1 it did, and produced items the caller should act on (unplaced findings, refused carry-overs); 2 it failed; 3 it did not run (a missing answer, an unreconciled change, an absent precondition). Store health is reported in output, never in the exit code. The bare dashboard exits 0 when it rendered.
3. **Dry run.** Every verb that writes accepts `--dry-run`, printing exactly what it would write — events, objects, marks and files.
4. **Atomicity.** A verb that writes several things (events, objects, record files, marks, influx log) writes an intent file first, then the pieces, then removes the intent. On start, any leftover intent is reported and must be completed or rolled back (`vsect recover`).
5. **Machine output** (`--format json|udon`) carries `schema: vsect-<verb>/<n>` and is stable within a schema version.
6. **Designators.** vsect acts on its own only when a designator is exact (a full id, with an alias resolved). Anything else — a partial slug, free text — yields candidates with how each matched, and the caller chooses.

## 15. The trusted base

What vsect guarantees: given an unaltered trail, every displayed value is reproducible from the declarations, the objects and the events; edits, deletions and duplicates in the trail are detected (§5.4) against git history; checks are bound to the exact text and basis they read; a refuted statement is marked in its own file. What it does not guarantee: that recorded acts happened, that recorded actors are who they say or read what they declare, or that a store's declarations are wise. Reproducible checks make fabricated acts convictable later. One-off acts (testimony, a read nobody can repeat) rest on trust in whoever recorded them and never count toward independent agreement.

## 16. Fixtures, and the surface two implementations must agree on

Fixtures to write before any semantic command ships:

- grammar: both grains; tags in code, quotes, tables, lists; spans ended by headings of every level; `of` spans carrying display math and lists; teaching with `narrates` in frontmatter; per-record id uniqueness; mid-paragraph tags; unassigned prose;
- normalizer: every step of §3.1; reflow invariance; any math change stales; NFC; markers and marks stripped;
- objects: `read --at` a version that never reached a commit; diff between two stored versions;
- identity: rename with carry; move across records; split; merge; supersede; delete-and-re-add proposed as rename; collisions; alias and canonical kind giving the same id;
- versions: a redefinition three steps upstream stales exactly the right checks; one unconditional confirmation at the root re-binds them all with no downstream writes; a scoped confirmation re-binds only its checks; a meaning-edge cycle; an `unwritten` target being written;
- edges: every row of §4, statement by statement; a store-declared edge; the `proves` coupling;
- events: every act class's payload; edited / missing / duplicate / deleted detection for events and objects;
- independence: the §5.6 predicate, including the shared-basis exclusion;
- reports: typed items of all four types; free-form intake; idempotent re-take; declared version with a mismatching quote; quote-only binding with one and with several matches;
- outlines: the grammar; container projection; `--check`;
- refutation: marks written, contested, removed; cascade marks; a hand-edited mark;
- reconciliation: every row of §11, including a branch merge;
- commands: every question answerable non-interactively; exit codes; dry run; interrupted multi-file write recovered.

**The agreement surface.** The test that matters most is Codex's: two independent implementations parse the same sample store and agree on every computed value — every id, own version, basis, effective version, holding verdict, cascade, projection, outline cell and check report — **except** the outputs of heuristics (the unassigned-prose detector, near-identity proposals, binding proposals for free-form reports), which are prompts for a mind and are compared only for being reported, not for their counts.
