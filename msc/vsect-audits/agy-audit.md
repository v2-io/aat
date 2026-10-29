# De Novo Audit of the `vsect` Specification Draft (`83dd98b`)

**Auditor:** Antigravity (`agy`, Gemini 4 Argon)  
**Target:** `~/src/aat-v3/msc/vsect/` (`README.md`, `model.md`, `vsect.md`, `session-aat.md`, `core.md`, `storage.md`, `open.md`) at commit `83dd98b`  
**Cross-checked primaries:**
- `~/src/arch/asf/` (`FORMAT.md`, `01-aat-core/src/*.md` — all 173 segments scanned for tag grammar, plus whole-file reads of `def-agent-environment.md`, `scope-adaptive-system.md`, `post-causal-structure.md`, `result-persistence-condition.md`)
- `~/src/arch/firmatum/verisectorium/theory/influx/segments-model-rc1/` (`01-SPINE.md` through `11-LEXICAL-CORE.md`, `95-ADDENDUM-field-trial-2026-08-30.md`)
- `~/src/arch/firmatum/udon/v2/spec-lite-0.1.0/` (`.vsect/kinds.yaml`, `.int/vsect-requirements-on-lite.md`, `main.outline.md`, `sop/main.outline.md`, `sop/influx/jaw-proposal-and-feedback.md`, `sop/adr/*.md`, `sop/src/*.md`, `sop/def/*.md`, and all 236 records across the spec and SOP stores)
- `~/src/aat-refactored/scratch/` (`PROPOSAL-2026-09-29-foundation-and-sops.md`, `vsect-porcelain-sketch.md`)
- `~/src/limen/backbone/lua/plugins/vsect.lua`, `relata --help`, and `~/src/arch/firmatum/principles/src/norm-three-audiences.md`

---

## Executive Assessment

The post-audit revision at `83dd98b` achieves something rare: the porcelain (`model.md`, `vsect.md`, `session-aat.md`) keeps attention on the domain's work rather than on graph maintenance, while `core.md` and `storage.md` supply explicit data and workflow contracts. Grounding the atom in *"one fate, one atom"* (`model.md:9`) and separating the logical unit (`statement`) from the file container (`record`) resolves the central grain tension between ASF's multi-claim segments and RC1's single-fate records.

However, when the contracts in `core.md` and `storage.md` are executed step-by-step against real ASF segments, real `spec-lite-0.1.0` records, and the commands shown in `vsect.md` and `session-aat.md`, **ten load-bearing architectural and mechanical defects** and **eight secondary contract gaps** surface. Several were introduced by the revision itself when new mechanisms (`effective-version` Merkle hashes, `*[of (id)]*` attachment, closed edge tables, single-schema event files, hash-only state) were synthesized without being traced end-to-end through the porcelain verbs.

### Summary of Load-Bearing Findings (A1–A10)

| ID | Severity | Finding | Where |
|---|---|---|---|
| **A1** | **Blocker** | **Hash-only persistence cannot execute `read --at`, `revise` diffs, `take` diffs, `reconcile`, or rename-detection.** `.vsect/` stores only SHA-256 digests (`effective-version`), never statement text snapshots or prior frontmatter edges, and uncommitted versions (`v:3a77` in `session-aat.md:147–164`) are not in git. | `core.md` §2.3, §3.2–3.3, §5.1, §8.1, §9; `storage.md:7–17`; `session-aat.md:144–175` |
| **A2** | **Blocker** | **`effective-version` Merkle hashing (`core.md` §3.3) contradicts both `confirm-rewording` re-binding (§3.4) and `core.md` §4's "transitive for notification only".** In an append-only event store, changing an upstream `own-version` changes every downstream `effective-version` hash at arbitrary depth; a single local `confirm-rewording` event on an upstream node cannot make downstream check events match their new `effective-version` hashes without either O(DAG) event fanout or an unspecified graph-wide equivalence closure. Cycles and unwritten targets in `premise ∪ defined-by` are also unhandled. | `core.md` §3.3–3.4, §4, §5.3, §8.1 |
| **A3** | **High** | **The statement grammar (`core.md` §1) breaks on heading hierarchy, multi-paragraph/list/math glosses, and 67% of ASF Part I's real equation tags.** Under §1.2, tags under `# Title` (as in `storage.md:38–45`) swallow every `##` section except `## Working Notes`; `*[of (id)]*` covers only a single paragraph (dropping following display equations and bullet lists); `*[Teaching (id) narrates …]*` puts edges inline in markdown while `storage.md:28–51` puts edges in YAML frontmatter; and §1.5 ("two tags with one id in a store") directly contradicts §2.1 ("The `<id>` part is unique within the record"). | `core.md` §1.1–1.5, §2.1; `storage.md:28–51`; `asf/01-aat-core/src/*.md` |
| **A4** | **High** | **The closed edge set (`core.md` §4) makes the draft's own `purpose` citations, `norm` aims, `question` attachments, and `spec-lite`'s `depends`/`per`/`test-fixtures` illegal parse errors — and `proves` is specified backwards.** §4 declares a closed set of 8 edges and makes unknown edges a parse error, contradicting the conformance boundary (line 5) and omitting edges required by `model.md:25, 68, 74`, `vsect.md:57, 60`, `session-aat.md:50, 77`, and 172 of 236 `spec-lite` records. Meanwhile, `proves` specifies what happens to the derivation when the *claim* is refuted, but never what happens to the *claim* when its *derivation* breaks. | `core.md` line 5, §4; `model.md:25, 68, 74`; `session-aat.md:50, 77`; `storage.md:53` |
| **A5** | **High** | **The event schema (`core.md` §5.1) requires securing-only fields on all 21 acts, omits `revise` and `era`, and lacks payload fields for lifecycle/finding/question/decision acts.** `criterion`, `committed`, `recheck`, and `outcome` are required on `mint`, `retire`, `rename`, `split`, `merge`, `ask`, `answer`, `decide`, and `land`; `revise` is missing from `act:`; `era` is missing from §5.1 (breaking era expiry in `model.md:48` and `vsect.md:35`); and `split`/`merge`/`rename`/`supersede` have no target-ID fields. | `core.md` §5.1, §9; `model.md:48`; `vsect.md:35`; `storage.md:11` |
| **A6** | **High** | **Report and finding mechanics (`core.md` §7, §8.2, `vsect.md`) conflate passing checks with defect findings, lack verbs for `confirm-rewording` and `dispose-finding`, and have no storage path for unplaced findings.** `core.md` §7.1 labels a `confirmed` re-derivation `## Finding F1`, colliding with `model.md:64` ("A finding … stays visible on that statement until it is disposed of"); no porcelain verb in `vsect.md` emits `confirm-rewording`, confirms a finding is answered, or disposes of a finding as `rejected`/`known-defect`; and `.vsect/events/<kind>/<slug>/` cannot store an unplaced finding that has no `<kind>` or `<slug>`. | `core.md` §5.1–5.2, §7.1–7.2, §8.1–8.2; `model.md:64`; `vsect.md` §3, §5; `session-aat.md:158` |
| **A7** | **High** | **Version-from-quotes (`core.md` §7.4) is cryptographically impossible as stated.** A quoted substring in a report never hashes to `own-version` (which hashes the entire statement + `of` paragraphs) and *cannot* hash to `effective-version` (which hashes upstream `premise` and `defined-by` digests not present in the quote). Ranking quote-hashing ahead of the report's explicit `effective-version` field breaks structured intake. | `core.md` §3.2–3.3, §7.4; `session-aat.md:158` |
| **A8** | **High** | **Outline views (`main.outline.md`) have no grammar or projection contract in `core.md`, and container records (`segment`) have no defined standing projection.** Outlines list *records* (`model.md:29`) and show a computed *standing* column (`model.md:88`), but `segment` records hold multiple statements of incommensurable kinds (`definition`, `scope`, `choice`, `claim`) and have no record-level standing (`model.md:29, 52`). Neither `core.md` nor `storage.md` specifies the outline table syntax or container-projection rule needed for `vsect outline --check` or `vsect new`. | `model.md:29, 52, 88`; `vsect.md:69, 141`; `core.md`; `storage.md` |
| **A9** | **Medium-High** | **Independence computed from `actor.read` and `actor.descends-from` (`core.md` §5.4–5.5) rests on the same self-report channel as `actor.role`, and fails to distinguish reading the target statement from reading the author's working.** `vsect` cannot observe what an agent read via `cat`/`read_file`; `read:` in the report frontmatter (`core.md` §7.1) is self-reported just like `role:`. Moreover, a verifier *must* read the target statement (and its record container), which was written by the author; §5.5 does not define how "the author's working" is separated from the statement under test. | `core.md` §5.1, §5.4–5.5, §7.1, §13; `session-aat.md:147, 159` |
| **A10** | **Medium-High** | **`spec-lite` compatibility (`storage.md:74–84`) understates the gap between `spec-lite-0.1.0` and `core.md`.** Across all 236 records in `spec-lite-0.1.0` and `sop/`, **0** have `statements:` frontmatter, **0** have `*[…]*` tags, **53** non-decision cards carry `strength: provisional | decided | lean` in frontmatter, **172** use `depends:` at record grain, **171** use `per:`, and **30** use `test-fixtures:`. Running `vsect check` under `core.md` §§1–4 on `spec-lite-0.1.0` today would reject almost every file. | `storage.md:74–84`; `core.md` §§1–4, §10; `spec-lite-0.1.0/**` |

---

## Detailed Load-Bearing Findings (A1–A10)

### A1. Hash-only persistence in `.vsect/` cannot support `read --at`, `revise` diffs, `take` diffs, `reconcile`, or rename detection

**Where:** `core.md` §2.3, §3.2–3.3, §5.1, §8.1, §9; `storage.md:7–17`; `vsect.md:63, 72–76`; `session-aat.md:67–72, 144–175`.

**The defect:**  
According to `storage.md:7–17`, the `.vsect/` directory contains only three things:
1. `.vsect/kinds.yaml`
2. `.vsect/events/<record-kind>/<record-slug>/<event-id>.yaml`
3. `.vsect/eras.yaml`

And according to `core.md` §5.1, an event file records only `effective-version: <sha256>` (it does not even record `own-version`, let alone the statement's canonical text, raw text, or frontmatter edges).

Now trace what the porcelain and core contracts require `vsect` to do:
1. **`vsect read --at <version>` on uncommitted working-tree versions (`vsect.md:63`, `session-aat.md:147`):** In `session-aat.md:130–175`, the author drafts `def:epistemic-target` and runs `vsect revise` (minting `v:3a77`), then runs `vsect verify` (which instructs the verifier to run `vsect read --at v:3a77 def:epistemic-target`), then edits the file in the working tree to `v:8c15` (line 154) *before* running `vsect take` (line 157) and `vsect commit` (line 171). Version `v:3a77` **never existed in any git commit**. Because a SHA-256 hash cannot be inverted, and `.vsect/` stores no text blobs, `vsect read --at v:3a77` cannot reconstruct the text of `v:3a77` once the working tree file is edited to `v:8c15`.
2. **Diffing and equivalence briefs in `vsect take` and `vsect revise` (`core.md` §8.1, `session-aat.md:71, 160–162`):** `session-aat.md:160–162` shows `vsect take` printing a line diff between `v:3a77` and `v:8c15`:
   ```text
   - θ: the structure invariant under the agent's actions
   + θ: the invariant structure
   ```
   And `core.md` §8.1 requires `vsect revise` to emit a one-paragraph equivalence brief (*"Is X equivalent to Y as it bears on criterion C?"*). Neither the diff nor the brief can be generated if `vsect` only stored the SHA-256 digest of the previous version.
3. **Near-identical text detection on delete-and-re-add (`core.md` §2.3):** §2.3 requires that a statement whose text is deleted and whose near-identical text reappears under another id be treated as a rename. Without the prior text of the deleted statement stored in `.vsect/`, `vsect` has only its SHA-256 hash, which reveals nothing about near-identity.
4. **Distinguishing own-text edits from upstream changes and detecting frontmatter edge edits (`core.md` §9):** Because `core.md` §5.1 records only `effective-version` (and not `own-version` or the statement's declared edges), `vsect check` / `vsect reconcile` cannot tell from `.vsect/events/` whether a statement's `effective-version` changed because its own text was edited or because a premise changed, nor which frontmatter edge was added or removed.

**Repair:**
- Add `own-version: <sha256>` and `edges:` (or a declaration digest) alongside `effective-version: <sha256>` on `mint` and `revise` events in `core.md` §5.1.
- Store canonical statement snapshots by content hash in `.vsect/objects/<own-version>` (or write them into `.git/objects` via `git hash-object -w`) whenever `vsect new`, `vsect revise`, or `vsect verify` runs. Since statement texts are short paragraphs, `.vsect/objects/` (or git blobs) makes `read --at`, `take` diffs, equivalence briefs, and §2.3 similarity checks work deterministically even across uncommitted intermediate revisions.

---

### A2. `effective-version` Merkle hashing (`core.md` §3.3) contradicts `confirm-rewording` re-binding (§3.4) and §4's transitivity column

**Where:** `core.md` §3.3–3.4, §4, §5.1, §5.3, §8.1.

**The defect:**  
`core.md` §3.3 defines:
> *"Effective version: SHA-256 over the statement's own version and the sorted effective versions of every statement it declares as `premise` or `defined-by` (§4). A check is bound to the effective version it read. A change upstream therefore stales downstream checks."*

Three structural problems follow immediately from this definition:

1. **Contradiction with §4 ("Transitive? for notification only"):** In `core.md` §4, the `Transitive?` column for both `premise` and `defined-by` says *"for notification only"*. Because `effective-version(A)` hashes the **effective versions** (not `own-version`s) of `A`'s `premise` and `defined-by` targets, any change to $X$ at depth $k$ changes `effective-version` at depth $k-1, k-2, \dots, 0$. Thus check invalidation via `effective-version` is **strictly transitive across the entire `(premise ∪ defined-by)*` closure**, not "for notification only" (and not just "two steps upstream" as `core.md` §14 line 173 implies).
2. **Contradiction between immutable event hashes (§5.3) and `confirm-rewording` re-binding (§3.4):** Suppose root definition $D$ is reworded (`own-version` changes from $d_1$ to $d_2$), and 40 downstream statements $S_1, \dots, S_{40}$ depend transitively on $D$ via `defined-by` / `premise`. Their `effective-version`s immediately change from $e(S_i)_1$ to $e(S_i)_2$. Their existing check event files in `.vsect/events/` remain immutable (`core.md` §5.3) and still carry `effective-version: e(S_i)_1`. Now a second mind records a single `confirm-rewording` event on $D$ (`core.md` §3.4, §8.1). §3.4 says: *"once a different mind confirms the rewording, downstream checks are re-bound to the new effective version without being re-done."*  
   How? In an append-only store where events are never edited:
   - Either `confirm-rewording` on $D$ must write 40 new events across `.vsect/events/` for $S_1, \dots, S_{40}$, OR
   - `effective-version` matching is **not** hash equality (`event.effective_version == current.effective_version`), but requires `vsect` to store the decomposed dependency tree of every historical `effective-version` and evaluate equivalence modulo the transitive closure of `confirm-rewording` pairs $(d_1 \sim d_2)$. A flat SHA-256 `effective-version` cannot be unpacked to check whether its only difference from `e(S_i)_2` was a confirmed rewording at $D$!
3. **Criterion mismatch on upstream rewording (§8.1) and cycles/unwritten targets:** `core.md` §8.1 says `revise` emits *"Is X equivalent to Y as it bears on criterion C?"* When $D$ is a root definition with no check criterion of its own, while 40 downstream statements were checked against 40 *different* criteria $C_1, \dots, C_{40}$, confirming $D \equiv D'$ requires either unconditional semantic equivalence of $D$ or per-dependent confirmation. Moreover, §3.3 does not define what happens when `premise ∪ defined-by` contains a cycle (co-defined terms across two statements) or points to an unwritten statement / cross-store statement.

**Repair:**
- Do not make `effective-version` an opaque recursive SHA-256 digest. Instead, record on each event the map of `{statement_id: own_version}` for the target statement and its `premise` / `defined-by` closure (or hash a canonical map where `confirm-rewording(S, v1, v2)` defines an equivalence relation $v_1 \sim_S v_2$ on `own-version`s). Then a check recorded at vector $\vec{v}$ remains valid at $\vec{v}'$ iff for every $S$ in the domain, $v_S \sim_S v'_S$.
- Decide explicitly whether `premise` / `defined-by` invalidation is 1-hop (hashing upstream `own-version`s) or transitive (hashing the full closure), and align `core.md` §3.3, §4, and §14.
- Require `premise ∪ defined-by` to be a DAG (reporting cycles in `vsect check`) and define a sentinel hash (e.g. `unwritten`) when an edge points to a not-yet-written target.

---

### A3. The statement grammar (`core.md` §1) fails on heading hierarchy, multi-block `of` attachments, inline `Teaching` edges, and 67% of ASF Part I's tags

**Where:** `core.md` §1.1–1.5, §2.1; `storage.md:25–51`; `asf/01-aat-core/src/*.md`.

**The defect:**  
Testing `core.md` §1 against both `storage.md`'s own specimen (`storage.md:25–49`) and all 173 segments in `~/src/arch/asf/01-aat-core/src/` exposes four concrete grammar bugs:

1. **The heading-level termination rule (§1.2) swallows `##` sections when tags sit under `# Title`:**  
   `core.md` §1.2 states:
   > *"A statement's text is: its tag paragraph and every following paragraph up to the next tag, **the next heading at the same or a higher level than the one containing the tag**, or the end of the record"*
   
   Look at `storage.md:38–48`: the tags `*[Scope (residual-learnable)]*` and `*[Claim (exclusion)]*` sit directly under `# Scope: Adaptive System` (an H1 heading, level 1). Any subsequent `## Discussion` or `## Epistemic Status` heading is level 2 — a *lower* level than H1! Under §1.2, an H2 heading does **not** terminate a statement opened under H1 (only another H1, another tag, `## Working Notes` via §1.6, or EOF does). Conversely, in ASF segments where tags sit under `## Formal Expression` (H2) or `### Structural Persistence` (H3, as in `result-persistence-condition.md:33–35`), a tag under H3 is terminated by the next H3 or H2, whereas a tag under H2 swallows any subsequent `### What Is Derived vs. What Is Chosen` (H3) table (`FORMAT.md:453`). Any heading of *any* level (`#` through `######`) should terminate the current contiguous statement span unless an explicit multi-paragraph container or `*[of (id)]*` re-attaches below it.
2. **`*[of (id)]*` attaches only a single paragraph (§1.2), stranding display equations, lists, and multi-paragraph discussions:**  
   In §1.2, a primary tag `*[Word (id)]*` owns *"its tag paragraph and every following paragraph up to the next tag..."*, whereas `*[of (id)]*` owns only *"any paragraph elsewhere in the record that declares it belongs to that statement (`*[of (id)]*` at the paragraph's start)"* — singular. In Markdown (`FORMAT.md:579`), a display equation `$$…$$` must have blank lines before and after it, making it a separate block/paragraph; a bulleted list (such as the excluded cases in `scope-adaptive-system.md:45–46` or the coupling regimes in `post-causal-structure.md:35–38`) is also a separate block from its lead-in paragraph. If `*[of (id)]*` attaches only one paragraph, then every display equation, bullet item, and continuation paragraph in a non-contiguous gloss or Discussion becomes **unassigned truth-apt prose** (§1.4) unless every single block starts with `*[of (id)]*` (which is impossible for tables and blockquotes, where §1.1 forbids tags, and corrupts display math if placed on `$$`). Why doesn't `*[of (id)]*` use the exact same span rule as `*[Word (id)]*` (owning from `*[of (id)]*` up to the next tag or heading)?
3. **Inline `narrates` syntax on `Teaching` (§1.3) conflicts with frontmatter edge declarations (`storage.md:28–51`):**  
   `core.md` §1.3 specifies `*[Teaching (<id>) narrates <id>, <id>]*` with the `narrates` targets inside the Markdown tag. Yet `storage.md:28–36, 51` specifies that every statement tag in the body is paired with an entry in frontmatter `statements:` where its kind (`as:`) and edges (`premise:`, `defined-by:`, `narrates:`) live, and §1.1 defines the tag syntax as `*[Word (id)]*`. Putting `narrates <id>, <id>` inside the Markdown tag in §1.3 creates two places to declare `narrates` edges and leaves unclear whether `<id>` after `narrates` is a local `#<id>` or a full `kind:slug#<id>`.
4. **Direct contradiction between §1.5 and §2.1 on ID uniqueness scope:**  
   - `core.md` §1.5: *"Parse errors (each stops the record from being read as statements, and is reported with its line): … **two tags with one id in a store**"*
   - `core.md` §2.1: *"A statement's id is `<record-kind>:<record-slug>#<id>` within its store … **The `<id>` part is unique within the record; the whole is unique within the store.**"*  
   If `<id>` is unique within the *record* (§2.1), two records in the same store may both have `*[Claim (exclusion)]*`; §1.5 should say *"two tags with one id in a record"*.
5. **Empirical check against ASF Part I (`01-aat-core/src/*.md`) for `vsect bring --predecessor`:**  
   Scanning all 173 files in `~/src/arch/asf/01-aat-core/src/` shows **560** tags in record bodies (plus 12 inside `## Working Notes` = 572 total, vs `session-aat.md:21`'s invented `174 records` / `612 statement tags`):
   - Only **185 / 560 (33.0%)** match `core.md` §1.1's `*[Word (kebab-id)]*` at paragraph start.
   - **91** tags have no parenthetical `<id>` at all (`*[Definition]*`, `*[Hypothesis]*`, `*[Assumption]*`, `*[Empirical Claim]*`).
   - **195** tags carry comma/semicolon-separated notes, `from #…` dependencies, or standing words inside or after the parens (`*[Derived (structural-persistence, from sector-persistence-template)]*`, `*[Derived (fano-degeneracy-at-zero-information), exact]*`, per `FORMAT.md:52, 549`).
   - **132** tags with parentheses have no `<id>` at all — their parenthetical is a condition or provenance note with spaces (`*[Derived (from persistence-condition applied per edge)]*`, `*[Derived (Conditional on independent edges)]*`, `*[Definition (transition opacity)]*`, per `FORMAT.md:550`).
   - **24** tags appear *mid-paragraph* (`def-adaptive-tempo.md:62`, `def-satisfaction-gap.md:66`, `def-strategic-tempo.md:104`).
   - **5** segments contain duplicate parentheticals *within the same file* (`result-adversarial-tempo-advantage.md` has `adversarial-tempo-advantage` twice; `scope-composite-agent.md` has `scope-composite-agent` twice; `deriv-regime-marginal-indistinguishability.md` has `cross-regime-witness` twice; `deriv-sector-condition.md` has `Proof Step` 6 times).
   - **20** segments have **zero** tags in their body.  
   `storage.md:72` and `session-aat.md:21` assume `vsect bring --predecessor` only needs a tag-word mapping table (`Derived → Claim`), when in reality 67% of ASF's tags fail `core.md` §1.1's syntax before word-mapping even begins.

**Repair:**
- In `core.md` §1.2, make both `*[Word (id)]*` and `*[of (id)]*` run from the tag to the next tag, the next heading *of any level* (or provide an explicit end marker when a heading sits inside a statement), or EOF — including intervening lists, display math, tables, and blockquotes.
- In `core.md` §1.3, keep `*[Teaching (id)]*` syntax identical to §1.1 and put `narrates: [...]` in frontmatter under `statements.<id>.narrates` (or allow frontmatter to omit `statements:` only for single-statement records — see B1).
- In `core.md` §1.5, change *"two tags with one id in a store"* to *"two primary statement tags with one `<id>` in a record"*.
- Specify whether `*[Word (id)]*` and `*[of (id)]*` markers are stripped before `core.md` §3.1 canonical normalization (they must be, or renaming `<id>` changes `own-version` and stales all checks on a rename!).
- In `storage.md:70–72`, acknowledge that `vsect bring --predecessor` imports predecessor files as raw influx records; tag syntax normalization (minting `<id>`s for the 91 id-less and 132 note-only tags, extracting `from …` into `premise:`, deduplicating within-file ids) happens when a segment is carved/landed, not by a flat word-substitution table on `bring`.

---

### A4. The closed edge set (`core.md` §4) contradicts `core.md` line 5, breaks `model.md` and `session-aat.md`, and specifies `proves` backwards

**Where:** `core.md` line 5, §4; `model.md:25, 68, 74`; `vsect.md:57, 60`; `session-aat.md:50, 77`; `storage.md:53, 74–84`.

**The defect:**
1. **Self-contradiction on extensibility:** `core.md` line 5 ("Conformance boundary") says: *"A store's own declarations (§6) may add kinds, lines, **edges** and projections; they may not weaken §§1–5..."* Thirty lines later, `core.md` §4 says: *"A closed set. … Unknown edge kinds are a parse error."*
2. **Missing edges required by the draft's own workflows:**
   - **Choice $\to$ Purpose (`model.md:74`):** *"a choice that only purpose can settle cites one, and is flagged for another look when the purpose is revised."* None of the 8 edges in §4 (`premise`, `supports`, `defined-by`, `narrates`, `instantiates`, `proves`, `seeded-by`, `supersedes`) represents citing a `purpose` (or a process `decision`, i.e., `per:`).
   - **Norm $\to$ Aim (`model.md:25`, `session-aat.md:77`):** `session-aat.md:77` shows `vsect revise` asking: *"A norm needs an aim it derives from. Which? (a statement id, or Enter to mark it open)"*. §4 has no `aim` edge (and if it uses `premise`, an aim/purpose is not truth-apt and cannot be "refuted").
   - **Question $\to$ Target / Blocked statements (`vsect.md:57, 60`, `session-aat.md:49–51`):** `vsect read <record>` shows `? an open question here`, and `vsect next` in `session-aat.md:50` knows that `segment:agent-environment`, `segment:action-transition`, and `segment:observation-function` wait on `question:typed-target`. §4 has no `concerns` or `blocks` edge.
   - **Recognition $\to$ Instances (`model.md:25`) and Specialization (`PROPOSAL-2026-09-29:188`):** `instantiates` in §4 is restricted to *"this worked example is an instance of the target"*, leaving no edge for a `recognition` statement citing the statements it recognizes a pattern across, nor for a theorem specializing an abstract template (`result-sector-persistence-template`).
3. **`proves` cascade is specified in the wrong direction:** In `core.md` §4, `proves` is declared on a `derivation` pointing at the `claim` it proves (`target` = the claim). The table specifies what happens **"On refutation of the target"** (when the claim is refuted, the derivation is marked as proving something false) and **"On redefinition of the target"** (the proof's checks stale). It **never specifies what happens to the claim when the derivation is refuted, broken, or redefined**, nor how a `rederive` event on a `derivation` statement lifts the `derivation` line of the `claim` statement it `proves`!

**Repair:**
- Make the §4 table the **core edge set** (which stores may extend in `.vsect/kinds.yaml` by declaring target grain and cascade behavior on target refutation/redefinition/revision, matching line 5).
- Add `serves` / `grounded-in` (or `per`) for citing a `purpose`, `decision`, or `aim` (cascade on target revision: flagged to re-read), and `concerns` / `blocks` for questions.
- For `proves` (from derivation $D$ to claim $C$), specify the reverse coupling: $D$ contributes to $C$'s `derivation` line only while $D$'s own checks hold at $D$'s current effective version and $D$'s `proves` target is $C$ at $C$'s current effective version; if $D$ breaks or its checks stale, $C$'s support from $D$ is undercut.

---

### A5. The event schema (`core.md` §5.1) forces securing fields onto all 21 acts, omits `revise` and `era`, and drops act-specific payloads

**Where:** `core.md` §5.1, §5.2, §9; `model.md:48`; `vsect.md:35, 146`; `storage.md:11`.

**The defect:**  
`core.md` §5.1 states: *"Schema (YAML now, udon later; **every field required unless marked**)"*, and marks only `episode`, `line`, and `corrects` as optional:
```yaml
act: rederive | instantiate | run | assert | decline | place-finding | dispose-finding
     | mint | retire | supersede | split | merge | rename | refute | weaken | contest
     | ask | answer | decide | land | confirm-rewording
about: segment:scope-adaptive-system#residual-learnable
effective-version: <sha256>
line: derivation                           # for securing acts
criterion: "re-derive from the stated premises without the author's working"
committed: before | after                  # was the criterion fixed before the outcome was seen
recheck: <how anyone can re-run this>
outcome: confirmed | broken | narrowed | inconclusive | failed-to-run
```
1. **Securing fields required on non-securing acts:** A `mint`, `retire`, `rename`, `split`, `merge`, `ask`, `answer`, `decide`, or `land` event has no `criterion`, no `committed: before | after`, no `recheck`, and no `outcome: confirmed | broken | narrowed | inconclusive | failed-to-run`.
2. **`revise` is missing from `act:`:** `core.md` §9 says out-of-band edits to statement text or frontmatter edges are recorded as events on `revise` (classifying `reworded` vs `redefined`), yet `revise` (or `reword` / `redefine`) is not in the `act:` union in §5.1.
3. **`era` is missing from the event schema:** `model.md:48`, `vsect.md:35`, and `storage.md:11` (`.vsect/eras.yaml`) rely on simulation events recording the era key and value they ran under so era bumps expire them. `core.md` §5.1 has no `era:` field.
4. **Missing payload fields for lifecycle and workflow acts:**
   - `split`, `merge`, `rename`, `supersede`: need `into: [<id>, …]` / `from: [<id>, …]` (and when a statement moves across records, `core.md` §5.2's path `.vsect/events/<record-kind>/<record-slug>/<event-id>.yaml` splits the statement's trail across two directories unless `vsect` indexes `rename` events across the store).
   - `confirm-rewording`: needs `from-version: <sha256>` and `to-version: <sha256>`.
   - `place-finding` / `dispose-finding`: need `finding: <report#id>`, `disposition: answered | rejected | known-defect`, `reason: …`.
   - `refute` / `contest`: need `by: <report#id | counterexample>` and `ground: …`.
   - `land`: needs the influx item path and crossing outcome (`integrated` / `rejected` / `needs-review` / `skipped` — see also B2).

**Repair:**
- Factor `core.md` §5.1 into a **common envelope** (`schema`, `id`, `at`, `store`, `episode?`, `act`, `about`, `actor`, `corrects?`, `normalizer`) plus **per-act-class required payloads**:
  - *Securing acts* (`rederive`, `instantiate`, `run`, `assert`): require `effective-version`, `line`, `criterion`, `committed`, `recheck`, `outcome`, and optional `era: {<key>: <val>}`.
  - *Lifecycle acts* (`mint`, `revise`, `retire`, `supersede`, `split`, `merge`, `rename`, `confirm-rewording`): require `own-version`, `effective-version`, `change: minted | reworded | redefined` (on `revise`), and `targets: [...]` (on `split`/`merge`/`rename`/`supersede`).
  - *Finding/refutation acts* (`place-finding`, `dispose-finding`, `refute`, `weaken`, `contest`): require `finding` / `ground`, `effective-version`, and `disposition` / `reason`.

---

### A6. Report & finding mechanics (`core.md` §7, §8.2, `vsect.md`) conflate passing checks with defect findings, lack verbs for `confirm-rewording` and `dispose-finding`, and cannot store unplaced findings

**Where:** `core.md` §5.1–5.2, §7.1–7.2, §8.1–8.2; `model.md:64`; `vsect.md` §3, §5; `session-aat.md:71–74, 157–164`.

**The defect:**
1. **`## Finding F1` with `outcome: confirmed` (`core.md` §7.1, `session-aat.md:158`):**  
   `model.md:64` defines a **finding** as a defect item that *"stays visible on that statement until it is disposed of: answered (by a revision someone other than its author has confirmed answers it), rejected (with a reason), or carried as a known defect."*  
   Yet `core.md` §7.1's report skeleton titles every check item `## Finding F1` with `outcome: confirmed | broken | narrowed | inconclusive`, and `session-aat.md:158–159` shows:
   ```text
   Finding F1 → def:epistemic-target#typed-target, read at v:3a77
     outcome: confirmed (re-derived; the verifier read none of the author's working)
   ```
   If a `confirmed` re-derivation is ingested as a "Finding", does it become an open finding waiting to be answered or rejected? Obviously not — a `confirmed` item in a verification report is a **securing check** (emitting a `rederive` event with `outcome: confirmed`), whereas a `broken` / `narrowed` item or an audit objection is a **finding** requiring disposition. Conflating the two in the report schema and terminology makes `vsect findings` (`vsect.md:140`) and the dashboard's `12 findings not yet disposed of` ill-defined.
2. **Missing porcelain verbs for second-mind confirmations and finding dispositions:**  
   `core.md` requires three distinct acts by a second mind or maintainer:
   - Confirming that a `reworded` edit preserved meaning (`confirm-rewording`, `core.md` §5.1, §8.1; `vsect.md:33, 74`; `session-aat.md:72`).
   - Confirming that a revision answered an open finding (`core.md` §8.2; `vsect.md:80`; `session-aat.md:73–74`).
   - Disposing of an open finding as `rejected` (with reason) or `known-defect`, or binding an `unplaced` finding (`core.md` §5.1 `place-finding`, `dispose-finding`; `model.md:64`; `vsect.md:90`).  
   Yet **no verb in `vsect.md` (§3 or §5)** performs any of these three acts! (`vsect take` only ingests a report whose `check:` and `outcome:` fields in `core.md` §7.1 have no syntax for `confirm-rewording` or `dispose-finding`.)
3. **Unplaced findings have no storage location on disk:**  
   `core.md` §7.2 states that items in a free-form report become **unplaced findings** until a mind binds them to a target and version, and `vsect.md:32, 140` lists them under `vsect findings --unplaced`. But `core.md` §5.2 stores events exclusively at `.vsect/events/<record-kind>/<record-slug>/<event-id>.yaml`, and `storage.md:7–17` has no directory for reports, briefs, or unplaced findings. Before an unplaced finding has a target `<record-kind>` and `<record-slug>`, where does `vsect take` write it?

**Repair:**
- In `core.md` §7.1, distinguish report items (or use `## Item 1` / `kind: check | finding | equivalence | finding-review`) so that:
  - `confirmed` checks emit securing events (`rederive`, `instantiate`, `run`),
  - `broken` / `narrowed` / defect items create open findings (`place-finding`),
  - equivalence briefs (`briefs/equiv-*.md`) and finding-fix checks return `confirm-rewording` or `dispose-finding (answered)` items that `vsect take` can ingest, AND provide direct CLI flags (`vsect findings --place`, `vsect findings --dispose <id> --as rejected|known-defect --why "..."`).
- Add `.vsect/events/_unplaced/<event-id>.yaml` (or `.vsect/reports/`) to `storage.md` and `core.md` §5.2 for unplaced findings, plus declared directories for `briefs/` and `reports/` in `storage.md` so `vsect check` does not mistake them for unassigned records.

---

### A7. Version-from-quotes (`core.md` §7.4) is cryptographically impossible as stated

**Where:** `core.md` §3.2–3.3, §7.4; `session-aat.md:158`.

**The defect:**  
`core.md` §7.4 states:
> *"4. The version a finding examined is determined, **in order of preference: from the quoted spans, if they hash to a known version**; from the report's `effective-version` field; from the brief. The event records which."*

This fails for three independent reasons:
1. **A quoted span is a substring, not the whole statement + `of` paragraphs:** `own-version` is the SHA-256 of the *entire* normalized statement (including all contiguous paragraphs and any non-contiguous `*[of (id)]*` paragraphs). A reviewer quoting the faulty sentence or clause hashes to the SHA-256 of that substring, which never equals the `own-version` of the statement.
2. **A quoted span never contains upstream `premise` and `defined-by` hashes:** Checks and findings bind to `effective-version` (`core.md` §3.3, §5.1, §7.1), which is a SHA-256 over `own-version` *and* the sorted `effective-version`s of every `premise` and `defined-by` target. Even if a report quoted 100% of a statement's text, the quote cannot determine which upstream `defined-by` version was active when the verifier read it!
3. **Substring containment across historical versions is non-unique and inverted in priority:** Even if "hash to a known version" is replaced by "substring-matched against stored historical statement snapshots" (once A1 is fixed), a quoted sentence often remains byte-for-byte identical across $v_1$ and $v_2$ when another sentence of the same statement (or an upstream definition) was edited. Putting quote-matching *ahead* of the report's explicit `effective-version` field means a structured report with an exact `effective-version` would be overridden or made ambiguous whenever the quoted sentence existed in multiple versions.

**Repair:**
- Reverse the preference order in `core.md` §7.4:
  1. For structured reports: use the report's `effective-version` field (or the brief's recorded snapshot version), **and verify** as a consistency check that any quoted span in the item is a normalized substring of that version's stored text (flagging a mismatch if the quote does not appear in the claimed version).
  2. For free-form reports lacking `effective-version`: search stored statement text snapshots (from A1) for normalized substring containment; if the quote matches a single historical version, propose it; if it matches multiple versions (because the quoted sentence didn't change across edits), bind to the version active at the report's/brief's timestamp or mark the version binding for confirmation.

---

### A8. Outline views (`main.outline.md`) have no grammar or projection contract in `core.md`, and container records (`segment`) have no defined standing projection

**Where:** `model.md:29, 52, 88`; `vsect.md:69, 141`; `core.md`; `storage.md:12`.

**The defect:**
1. **Type mismatch between record-grain outline rows and statement-grain standing:**  
   - `model.md:29`: *"A record is a file: `kind:slug`. It is the unit you open, read, file, **order in an outline** and cite as a whole. … Others hold several statements and exist to keep them together for reading — an AAT **segment** is one of these. **A segment is not a kind of truth; it is a container**, and it fails only by holding the wrong things together."*
   - `model.md:88`: *"The **outline** is the main view: the store's reading order, chapter by chapter, with a one-line gloss per row. Some columns are typed (the row's type, its gloss); **some are computed (standing, who moves next, open findings)** and cannot be edited."*  
   If an outline row in AAT v3 names a `segment` record (`[[segment:scope-adaptive-system]]`), and a `segment` is a container holding 3–6 statements of different statement-kinds (`definition`, `scope`, `choice`, `claim`, `norm`), each on different evidence lines with no shared ladder, **what is the computed `standing` cell of that outline row?** Neither `model.md` nor `core.md` defines how statement-level standings project upward to a container record row (e.g., broken-first + per-kind summary vs floor vs headline statement).
2. **No outline grammar or sync contract in `core.md` or `storage.md`:**  
   `vsect new` creates a record *"from an outline row (so the proposal becomes a file)"* (`vsect.md:69`), `vsect outline --check` *"reports rows that disagree with their records"* (`vsect.md:141`), and `limen/vsect.lua:155–169` resolves unwritten `[[kind:slug]]` links by scanning `main.outline.md`. Yet `core.md` has **zero rules** for `*.outline.md` (table format, `row-type` values `gap | proposed | exploratory | example | template | landed`, `※`/`∂` column header markers from `spec-lite`'s `conv-column-notation.md`, or whether `vsect` rewrites `∂` cells in `main.outline.md` on disk or only renders them on stdout). Under `core.md` §14 (*"two independent implementations parse the same sample store and agree on every computed value"*), two implementations cannot even parse `main.outline.md` without a grammar in `core.md`.

**Repair:**
- Add a section to `core.md` specifying the `*.outline.md` table contract (row-types, `[[kind:slug]]` record column, authored vs computed `∂(...)` columns, and the `unwritten` link resolution rule from `spec-lite`'s `conv-references.md`).
- Specify the upward projection for container records (`segment`) on outline rows: e.g., show `⚠ broken (n)` first if any contained statement is broken/refuted, then open findings count, then statement counts by kind/standing (or a declared headline statement `#id`), never a single scalar grade for a multi-statement container.

---

### A9. Independence (`core.md` §5.4–5.5) relies on self-reported `read:` / `descends-from:` and conflates reading the target statement with reading the author's working

**Where:** `core.md` §5.1, §5.4–5.5, §7.1, §13; `vsect.md:84, 131`; `session-aat.md:147, 159`.

**The defect:**
1. **`actor.read` and `actor.descends-from` are self-reported claims, just like `actor.role`:**  
   `core.md` §5.4 says vsect keeps apart *"that the actor was independent enough (computed from `read` and `descends-from`, never from `role`)"*. And §5.5 says: *"A rung that requires independence is never moved by an event whose `read` includes the author's working or whose `descends-from` shares a chain with the author's evidence on that line."*  
   Look at how `read` and `descends-from` enter the system (`core.md` §7.1): they are YAML fields in the report frontmatter (`author: {name: …, session: …, role: verifier, read: […], descends-from: […]}`). As `vsect.md:131` notes (`vsect orient`), *"reads done another way are invisible to it"* — `vsect` cannot see what files an agent read via `cat`, `read_file`, or its prompt context. Thus `read` and `descends-from` in `core.md` §5.1 and §7.1 are **recorded claims** (just as §5.1 line 68 says: `actor: # all recorded claims, not verified identities`). Treating `read` and `descends-from` as objective inputs while treating `role` as untrusted misplaces the trust boundary.
2. **"Includes the author's working" is undefined in the object model:**  
   In `session-aat.md:147`, `vsect verify` instructs the verifier to run `vsect read --at v:3a77 def:epistemic-target`. So `def:epistemic-target@v:3a77` (written by the author!) is necessarily in the verifier's `read:` set. If a statement in `segment:foo#claim-1` has its proof steps or defending discussion in the same statement atom (`model.md:11`: *"a claim's formal statement, the sentence that summarizes it, the gloss that explains it and the discussion that defends it are one atom"*), then reading the statement *is* reading the author's defending argument! Neither `model.md` nor `core.md` defines which part of a statement or record constitutes *"the author's working"* that a de-novo verifier must not see, nor how `vsect read --bare --at <version>` strips "the author's working" if the proof/defense is inside the statement's own paragraph span.

**Repair:**
- If `vsect verify <statement>` is supposed to give a verifier the **claim statement without the author's proof/working**, then a proof/derivation (`*[Derivation (…)]*` or `*[of (id) working]*`) must be separable from the claim statement so `vsect read --bare` / `vsect verify` can emit the claim and its premises/definitions *without* the author's derivation! Otherwise, reading the atom always includes reading the author's working.
- In `core.md` §5.4–5.5 and §13, state honestly that `read` and `descends-from` are **declared provenance claims** (seeded automatically by `vsect verify` with the snapshot versions included in the brief, and augmented by the reporter/harness), and specify the exact graph predicate for §5.5: an event $E_2$ is independent of event $E_1$ on line $L$ iff $E_2.\text{actor}.\text{session} \neq E_1.\text{actor}.\text{session}$, $E_1.\text{id} \notin E_2.\text{read}^*$, and $(\{E_1\} \cup E_1.\text{descends\_from}^*) \cap (\{E_2\} \cup E_2.\text{descends\_from}^*) = \emptyset$ (excluding the target statement's own `premise` and `defined-by` declarations, which both author and verifier must read!).
  - Notice that last parenthesis: **both the author and an independent verifier must read the statement's `premise` and `defined-by` definitions!** If `descends-from` or `read` intersection is checked naively without excluding the shared `premise` and `defined-by` statements, *no verifier could ever be independent of the author* because both read the same upstream definitions!

---

### A10. `spec-lite-0.1.0` compatibility (`storage.md:74–84`) misses five structural incompatibilities with `core.md`

**Where:** `storage.md:74–84`; `open.md:12–16`; `core.md` §§1–4, §10; `~/src/arch/firmatum/udon/v2/spec-lite-0.1.0/`.

**The defect:**  
`storage.md:74` says: *"spec-lite already runs on most of these conventions, and four differences would need its decider's call before vsect manages it"* (`status:` on decisions, `verification-level:`/`evidence:`, `consequences:`, and the three flags).  
An inspection of all **236** records across `spec-lite-0.1.0` and `spec-lite-0.1.0/sop/` shows five deeper incompatibilities not listed in `storage.md` or `open.md`:
1. **Zero `statements:` frontmatter and zero `*[…]*` tags (0 / 236 records):** Every record in `spec-lite-0.1.0` is a single-record card (`one-record-per-file.md`) with **no** `statements:` key in frontmatter and **no** `*[Word (id)]*` tag in the body. Under `core.md` §1.4, `vsect check` would flag 100% of the paragraphs in all 236 records as "unassigned truth-apt prose", and no statement IDs would exist for events or edges to target.
2. **53 non-decision cards carry `strength: provisional | decided | lean` in frontmatter:** `def/` and `src/` cards in `spec-lite-0.1.0` (e.g., `def/def-document.md:6`) carry a hand-typed `strength:` field in frontmatter. Under `vsect.md` §7 and `core.md`, hand-typed standing/strength fields on non-decision records are refused.
3. **172 records use `depends:`, 171 use `per:`, and 30 use `test-fixtures:` — all at record grain:** `core.md` §4 rejects `depends`, `per`, and `test-fixtures` as unknown edge kinds ("Unknown edge kinds are a parse error") and forbids record-grain targets on everything except `narrates` and `instantiates`.
4. **11 records carry `context:` sidecar links (`*.context.md`):** Not mentioned in `storage.md`.
5. **Defined-term delimiters (`«…»` and `⟦…⟧`) and `terms:` frontmatter (50 records):** `spec-lite-0.1.0` (`conv-term-delimiters.md`) and `limen/vsect.lua:215–321` resolve `«term»` and `⟦term⟧` against `terms:` in `def/` frontmatter. `core.md` and `storage.md` never mention `terms:` or term delimiters, even though `vsect.md:145` includes `vsect lexicon` ("generates the lexicon from term-group records").

**Repair:**
- Support **whole-record statements** (card grain) in `core.md` §§1–2 and `storage.md`: when a record kind is declared in `kinds.yaml` as single-statement (`grain: record`, as in `spec-lite` cards, questions, decisions, purposes), the record `kind:slug` *is* the statement (no `statements:` map or `*[Word (id)]*` tag required; its body outside `## Working Notes` is the statement text; edges sit at top-level frontmatter). That single rule makes card-grain stores (`spec-lite`) and container-grain stores (`aat-v3` segments) work under the exact same engine!
- Add `strength:` (53 cards) and `depends:`/`per:`/`test-fixtures:` to the `spec-lite` migration/decider list in `storage.md:74–84` and `open.md`.
- Specify `terms:` frontmatter and `«…»` / `⟦…⟧` term-delimiter resolution in `core.md` §10 (matching `limen/vsect.lua:215–321`) so `vsect lexicon` and `vsect check` have a contract.

---

## Secondary Contract & Alignment Findings (B1–B8)

### B1. Influx crossing outcomes (`model.md:92`, `vsect.md:124`) re-introduce the `landed` vs `integrated` collision Joseph ruled against
- **Where:** `model.md:88, 92`; `vsect.md:124` vs `spec-lite-0.1.0/sop/influx/jaw-proposal-and-feedback.md` §1.4 and `sop/adr/landed-not-integrated.md`.
- **Issue:** On 2026-09-30, Joseph explicitly ruled: *"landed != integrated (which should be used for tracking influx stuff-- from the perspective of influx stuff- not something we track in the segments or outlines usually)"* (`sop/adr/landed-not-integrated.md`). The draft uses `landed` both for the outline row-type (`model.md:88`) and for the influx crossing outcome (`model.md:92`, `vsect.md:124` `vsect land <item>`), recreating the exact collision `landed-not-integrated.md` was written to end.
- **Repair:** Use `integrated` (or `taken`) for the influx crossing outcome in `model.md:92` and `vsect.md:124`, reserving `landed` for the outline row-type.

### B2. `vsect refute` leaves refuted false claims unmarked in the file on disk (`session-aat.md:89–96, 136`)
- **Where:** `vsect.md` §3.6; `session-aat.md:89–96, 136`; `storage.md:3, 23` vs RC1 `04-CYCLE.md:15`.
- **Issue:** `storage.md:3` promises that *"anyone can still read a store with `cat` if vsect is unavailable"*, while `storage.md:23` says `vsect` writes nothing back to the record file. When `vsect refute segment:scope-adaptive-system#exclusion` runs (`session-aat.md:90`) and the user presses Enter to leave the gap until later, the false claim remains word-for-word in `scope-adaptive-system.md` with no mark in the file. A reader using `cat`, GitHub, or an editor without `vsect` reads the refuted statement as live truth — violating RC1 `01-SPINE.md:9` (*"Every record must say, in itself, how strongly it is held and why"*) and `04-CYCLE.md:15` (*"a reader mid-repair sees known-broken, never the old claim"*). Furthermore, when the author later replaces `#exclusion` with a new id `#exclusion-learnable` (`session-aat.md:136`), downstream statements whose `premise:` cited `#exclusion` are left pointing at the old id unless `supersedes` is recorded.
- **Repair:** Either have `vsect refute` mark or replace the statement body in the file on disk (e.g., inserting a visible refutation callout or replacing the tag with `*[No-go (exclusion)]*` when `--replace` is given), or explicitly warn in `storage.md:3` that raw `cat` on a record file without `vsect read` **cannot** show refutations, findings, or staleness because all events live in `.vsect/events/`.

### B3. Canonical normalizer (`core.md` §3.1) runs line-joining and space-collapsing *before* isolating math, and leaves soft-wrap joining underspecified
- **Where:** `core.md` §3.1, §14.
- **Issue:** `core.md` §3.1 says the normalizer *"joins soft-wrapped lines into logical lines by a fixed rule (no probabilistic joins); collapses runs of spaces; trims trailing whitespace; keeps math (`$…$`, `$$…$$`) byte-for-byte **after those steps**."*
  1. If soft-wrap joining and space-collapsing run *before* math spans are isolated, multi-line display blocks `$$…$$` (and `%` comments or aligned environments inside them) are altered before "keeps math byte-for-byte" even runs; conversely, if `$$…$$` is isolated first, whitespace/newline reflow inside `$$…$$` changes the hash.
  2. "Joins soft-wrapped lines into logical lines by a fixed rule" does not specify the Markdown block boundary rules (CommonMark paragraph continuation lines vs list items `- ` / `1. `, indented list continuations, blockquotes `> `, tables `|`, fences ```` ``` ````, hard breaks `\` / two spaces, and `*[…]*` tags). Two independent implementations (`core.md` §14) will not produce identical SHA-256 hashes unless the exact block/line grammar is specified.
- **Repair:** Specify the normalizer as a precise pipeline in `core.md` §3.1: (1) UTF-8 + NFC + `\n` line endings; (2) strip the leading `*[Word (id)]*` / `*[of (id)]*` marker token from the paragraph start; (3) parse into block elements (headings, fenced code blocks, display math `$$…$$`, blockquotes, list items, tables, paragraphs) with inline `$…$` and `` `…` `` spans protected; (4) within prose runs of paragraphs/list items, replace single `\n` with a single space and collapse runs of ASCII spaces/tabs to one space; (5) join blocks of the statement in document order with `\n\n`.

### B4. Kind aliases vs canonical kinds in statement IDs and event paths (`core.md` §2.1, §5.2, §10; `storage.md:31, 58`)
- **Where:** `core.md` §2.1, §5.2, §10; `storage.md:31, 58`.
- **Issue:** `storage.md:31` writes `defined-by: [def:epistemic-target#typed-target]` and `session-aat.md:130` writes `vsect revise def:epistemic-target`, using the alias `def` (whereas in `spec-lite/.vsect/kinds.yaml:47–48` and `model.md:25`, the canonical kind name is `definition` and `def` is an alias). If one command or link uses `def:epistemic-target` and another uses `definition:epistemic-target`, `.vsect/events/<record-kind>/<record-slug>/` (`core.md` §5.2) and `about:` in events (`core.md` §5.1) will split across `def/` and `definition/` unless `core.md` mandates canonicalization.
- **Repair:** State in `core.md` §2.1 and §10 that while user input and Markdown links may use kind aliases declared in `kinds.yaml`, every canonical statement ID, `about:` field, `effective-version` input, and `.vsect/events/<record-kind>/` directory path **must resolve `<record-kind>` to the canonical kind name**.

### B5. Ceiling derivation (`storage.md:52`, `open.md:21`) omits `form:` and upstream `premise:` ceilings
- **Where:** `model.md:54, 100`; `storage.md:52`; `open.md:21` vs `FORMAT.md:502–505` and RC1 `04-CYCLE.md:31`.
- **Issue:** `storage.md:52` states: *"a ceiling is derived from the statement-kind and its lines."* Because `claim` is a single trajectory-neutral statement-kind (`model.md:25`), deriving ceiling from `(statement-kind, lines)` alone gives every derived `claim` the same ceiling — ignoring both the author's declared `form:` (`exact` vs `qualitative` vs `approximate` vs `statistical`) and whether its `premise:` targets are empirical/heuristic (RC1 `04-CYCLE.md:31`: *"exact under named premises; conditional if any premise is empirical"*).
- **Repair:** Define a statement's ceiling as a function of `(statement-kind, form, lines, min(ceiling(premise)))`.

### B6. "Computed as of `<commit>`" (`core.md` §3.5, `session-aat.md:92`) is false when the working tree or `.vsect/events/` has uncommitted changes
- **Where:** `core.md` §3.5; `vsect.md:24, 99`; `session-aat.md:32, 92`.
- **Issue:** `session-aat.md:92` prints `Refuted, as of 4a91d0e` immediately after `vsect refute` mutates `.vsect/events/` in the working tree, before `vsect commit` is run. At commit `4a91d0e`, the statement was *not* refuted. Printing a clean commit SHA `as of 4a91d0e` over uncommitted working-tree events violates RC1's `@{moment}` invariant (`11-LEXICAL-CORE.md:27`).
- **Repair:** In `core.md` §3.5, require that whenever `.vsect/` or tracked records have uncommitted changes relative to `HEAD`, the moment string must append `+dirty` (or the latest event timestamp/digest, e.g., `as of 4a91d0e+dirty (event 9f2c… at 2026-10-29T03:14:07Z)`).

### B7. `vsect revise` vs `vsect reconcile` overlap (`vsect.md` §3.3, §5; `core.md` §9) and missing lifecycle acts (`split`, `merge`, `supersede`)
- **Where:** `vsect.md` §3.3, §5; `core.md` §2.2, §9.
- **Issue:** Because records are ordinary files edited in any text editor (`vsect.md` §1.7, §3.3), *every* edit is made outside `vsect`. Having both `vsect revise <record>` (§3.3) and `vsect reconcile` (§5, `core.md` §9) walk through working-tree diffs creates two overlapping commands for the same transition. Meanwhile, neither `vsect revise` (§3.3) nor `vsect reconcile` (`core.md` §9) provides a way for the user to classify a tag change as `split`, `merge`, or `supersede` (all promised in `core.md` §2.2) — §9 only offers `mint`, `retire`, or automatic `rename`.
- **Repair:** Make `vsect revise [record]` the single verb that reconciles working-tree edits into events (running across the store when given no argument, or make `reconcile` an alias for `revise --all`), and include `split`, `merge`, `supersede`, and `rename` as explicit classification choices when tags are added/removed in `revise`.

### B8. Cross-implementation agreement (`core.md` §14) vs heuristic unassigned-prose counts (`core.md` §1.4, `vsect.md:41`)
- **Where:** `core.md` §1.4, §14; `vsect.md:41`.
- **Issue:** `core.md` §1.4 says the unassigned truth-apt prose detector *"is a heuristic and its reports are prompts, not errors"*, while `vsect.md:41` prints `unassigned truth-apt paragraphs 19` on the dashboard and `core.md` §14 requires two independent implementations to *"parse the same sample store and agree on every computed value."* Two implementations cannot agree on a heuristic count unless the heuristic rule is specified or excluded from the exact-agreement set.
- **Repair:** Either specify a deterministic syntactic rule for §1.4 (e.g., any unassigned paragraph outside `## Working Notes` that is not a heading, blockquote, markdown link-only line, or `?`-terminated sentence) or mark heuristic prompts in `core.md` §14 as outside the exact-match conformance surface.

---

## Verification Against Milestones (`vsect.md` §8 & `core.md` §14)

`vsect.md` §8 (*"What comes first: The first version infers nothing about truth. It parses records and statements, reports structural problems … shows raw declarations and raw evidence, and renders the dashboard with raw counts"*) is the right sequencing decision. To make that Milestone 0 implementable without guessing:

1. **Fix the grammar and whole-record grain first (A3, A10, B3, B4)** so the parser handles both container records with `*[Word (id)]*` / `*[of (id)]*` tags and single-statement card records (`grain: record`), strips tags before hashing, and terminates statements cleanly at headings.
2. **Add `.vsect/objects/` (or git blob storage) and `own-version` to events (A1)** so `read --at`, `revise`, `take`, and `reconcile` have access to prior statement texts even before `vsect commit`.
3. **Separate the event envelope from per-act payloads and add `era` and `revise` (A5, A6)** before freezing `.vsect/events/` fixtures.
4. **Replace opaque recursive `effective-version` hashing with a dependency-version map modulo `confirm-rewording` (A2)** before implementing standing/staleness cascades.
