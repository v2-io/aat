# vsect core — the contracts underneath

*Draft, written 2026-10-28 in response to two de novo audits (`../vsect-audits/`). This is the document a user should never need: the contracts that make the porcelain in [`vsect.md`](vsect.md) honest. It is written for the implementer and for anyone checking that two implementations would agree. Everything here is proposed. Where a rule is stated as "vsect does X", that is the intended requirement; where it is an example, it says so.*

*Conformance boundary.* Sections 1–12 state requirements. Examples inside them are marked as examples. A store's own declarations (§6) may add kinds, lines, edges and projections; they may not weaken §§1–5, §7–8 or §12. Anything this document does not cover is open and listed in [`open.md`](open.md); an implementation that has to choose there should surface the choice, not bury it.

## 1. Statement grammar

1. A statement begins at a **tag** of the form `*[<Word> (<id>)]*` at the start of a paragraph, outside code spans, fenced blocks, block quotes and tables. `<Word>` is the statement-kind's display word; `<id>` is the statement's id (§2).
2. A statement's **text** is: its tag paragraph and every following paragraph up to the next tag, the next heading at the same or a higher level than the one containing the tag, or the end of the record — **plus** any paragraph elsewhere in the record that declares it belongs to that statement (`*[of (<id>)]*` at the paragraph's start). Glosses, summary sentences and defending discussion are attached this way when they are not contiguous. (This is how the gloss shares the claim's fate.)
3. A paragraph that speaks for several statements is marked `*[Teaching (<id>) narrates <id>, <id>]*` and is a teaching statement (§4 `narrates`).
4. Every other paragraph in a record is **unassigned**. `vsect check` reports unassigned paragraphs that contain a truth-apt sentence (a declarative sentence that is not a heading, a quotation, a pointer, or a question). The detector is a heuristic and its reports are prompts, not errors; a store may declare the threshold.
5. Parse errors (each stops the record from being read as statements, and is reported with its line): a tag inside code or a quotation; two tags with one id in a store; an `of`/`narrates` naming an id that does not exist; a tag whose word is not a declared statement-kind (once the store declares kinds); nested tags.
6. Working Notes (a final `## Working Notes` section) are not part of any statement. They carry forward work only. Findings never live there as prose; they are finding objects (§7). `vsect read --bare` excludes Working Notes.

## 2. Identity and lifecycle

1. A statement's id is `<record-kind>:<record-slug>#<id>` within its store, and `<store>/<record-kind>:<record-slug>#<id>` outside it. The `<id>` part is unique within the record; the whole is unique within the store.
2. Lifecycle acts, each an event: **mint** (new id), **retire** (the id stops being live; its history stays), **supersede** (a new id answers now; the old points to it), **split** (one id becomes several, each inheriting the parent's findings to be re-dispositioned), **merge** (several become one, findings carried over), **rename** (same atom, new id, history carried). Moving a statement to another record is a rename.
3. A statement whose text is deleted and whose near-identical text reappears under another id in the same commit is treated as a **rename**, not a retire-plus-mint: its findings and history follow it. (Guard against closing a finding by delete-and-re-add.)
4. A record's kind never changes. A change of kind is: retire the old record, mint a new one, `was:` linking them.

## 3. Versions

1. **Canonical text.** vsect owns a deterministic normalizer, versioned and recorded in every event that cites a version. It: decodes UTF-8 and applies NFC; normalizes line endings; joins soft-wrapped lines into logical lines by a fixed rule (no probabilistic joins); collapses runs of spaces; trims trailing whitespace; keeps math (`$…$`, `$$…$$`) byte-for-byte after those steps. It does not attempt mathematical equivalence: any change to notation stales checks. False staleness is preferred to undocumented equivalence.
2. **Own version**: SHA-256 of the statement's canonical text, written in full (abbreviations are for display only).
3. **Effective version**: SHA-256 over the statement's own version and the sorted effective versions of every statement it declares as `premise` or `defined-by` (§4). A check is bound to the effective version it read. A change upstream therefore stales downstream checks.
4. The cost of (3) is paid down by classification: when a statement is revised, the reviser classifies the change as **reworded** (same meaning) or **redefined**; a rewording claim does not stop propagation by itself (see the landing rule, §8), but once a different mind confirms the rewording, downstream checks are re-bound to the new effective version without being re-done.
5. Record versions are not used for evidence. Commit ids appear only as "computed as of".

## 4. Edges

A closed set. Each edge is declared on the dependent statement (except where noted) and points at a statement (record-grain targets are allowed only for `narrates` and `instantiates`). Unknown edge kinds are a parse error.

| Edge | Meaning | On refutation of the target | On redefinition of the target | Transitive? |
|---|---|---|---|---|
| `premise` | the target is necessary for this statement | this statement is **broken** | this statement's checks stale | for notification only |
| `supports` | the target contributes support, not necessarily | this statement is **undercut**: support from the target is removed from its evidence; flagged only if that crosses a declared threshold | flagged to re-read | no |
| `defined-by` | this statement uses a term the target defines | flagged to re-read | this statement's checks stale | for notification only |
| `narrates` | this teaching speaks about the target | **stale** | **stale** | no |
| `instantiates` | this worked example is an instance of the target | flagged to re-check the mapping | stale | no |
| `proves` | (declared on a derivation) this proves the target | the derivation is marked as proving something false (a no-go result to examine) | the proof's checks stale | no |
| `seeded-by` | this statement's framing or method descends from the target (or from an outside source) | none | none | **yes** — descent flows; independence of two lines is computed over these chains |
| `supersedes` | this statement answers in place of the target | — | — | revised-by chains resolve to the current statement |

Reverse edges are computed. Where a store also keeps hand-written reverse links (spec-lite's `consequences:`), `vsect check` reports any disagreement between the written and the computed sets; neither silently wins.

## 5. Events

1. **Schema** (YAML now, udon later; every field required unless marked):

```yaml
schema: vsect-event/0
id: <sha256 of the canonical bytes of every other field>
at: 2026-10-29T03:14:07Z
store: aat-v3
episode: <episode id>                      # optional
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
actor:                                     # all recorded claims, not verified identities
  name: claude-opus-5.5
  session: <harness session id, if available>
  role: verifier
  read: [<statement@effective-version>, …] # what the actor had seen
  descends-from: [<statement or event ids>] # descent declaration, for independence
corrects: <event id>                       # optional
normalizer: vsect-norm/0
```

2. **Files**: one per event, at `.vsect/events/<record-kind>/<record-slug>/<event-id>.yaml`. Content-derived ids make duplicates detectable and collisions impossible.
3. **Append-only by convention, anchored by git.** vsect never edits or deletes an event file. `vsect check` reports: an event file whose content no longer hashes to its id (edited), an id referenced by `corrects`/`episode` that does not exist (missing), two events with identical content (duplicate), and an event file present in git history but absent now (deleted). It does not prevent these; it detects them.
4. **Four different things, kept apart** in every projection: that someone *says* an act happened (the event exists); that the act is *reproducible* (its `recheck` re-runs to the same outcome); that the actor was *independent enough* (computed from `read` and `descends-from`, never from `role`); that the *trail is unaltered* since an anchor (§5.3 checks plus git history).
5. A rung that requires independence is never moved by an event whose `read` includes the author's working or whose `descends-from` shares a chain with the author's evidence on that line.

## 6. Declarations, lines and projections

A store's `.vsect/kinds.yaml` declares, and nothing is computed that is not declared:

- statement-kinds (with their display word, failure modes and repairs in words) and record kinds (with `find` globs, required fields, write semantics: replacement, append-only, or container);
- lines: rungs in order; which acts with which outcomes move each rung up or down; whether the rung requires independence; what invalidates it (own-text change, upstream redefinition, era change);
- projections: named functions from a statement's events to a displayed value (e.g. `strongest-line`, `floor`, `broken`, `stale`), each with a sentence saying what a reader may conclude from it;
- clocks: how long each kind of waiting item may wait before `check` reports it;
- the steward, the decider, the store mapping, launchers and orientation reading list.

Every projection is order-invariant: the same events in any order give the same value. **Until a store declares projections and their fixtures pass, vsect shows only raw per-line trails** (events grouped by line, in date order) and computes no summary.

## 7. Reports and findings

1. `vsect verify` and `vsect brief` produce a report skeleton in a fixed form; `vsect take` accepts it:

```markdown
---
report: verify-typed-target-2026-11-02
author: {name: …, session: …, role: verifier, read: […], descends-from: […]}
episode: <id>
---

## Finding F1
target: segment:agent-environment#typed-target
effective-version: <sha256>
check: rederive | instantiate | read | …
criterion: …
committed: before | after
outcome: confirmed | broken | narrowed | inconclusive
recheck: …

<the reporter's own words>
```

2. A free-form report is accepted too, but every item in it becomes an **unplaced finding** until a mind binds it to a target and version; vsect may propose a binding from quoted text (with the number of matches it found) but never binds one that would change standing without confirmation.
3. `take` is idempotent: the same report taken twice adds nothing.
4. The version a finding examined is determined, in order of preference: from the quoted spans, if they hash to a known version; from the report's `effective-version` field; from the brief. The event records which.

## 8. Landing and closing rules

1. **The landing rule.** Text that lands must be the text that was checked. If a statement's effective version changes between a check and its landing, the check stays bound to the old version. Any rewording — even one the author judges equivalent — is checked again by a different mind: `revise` emits a one-paragraph equivalence brief ("Is X equivalent to Y as it bears on criterion C?"), and the old check shows as not carrying over until a `confirm-rewording` event from someone other than the reviser arrives. The author's own equivalence judgment is recorded as an `assert` at the lowest rung.
2. **Closing a finding by revision.** A finding answered by a revision stays open until someone other than the reviser (ideally the finder) confirms, against the finding's criterion, that the revision answers it. A finding against a deleted statement is closed only by an explicit disposition, never by the deletion.
3. **Refutation.** `refute` requires a ground that is evidence (a counterexample, a broken derivation, a measured miss), not authority. It marks dependents per §4 immediately. A refutation can be contested (`contest` event); a contested refutation shows both, and the derivation line's independence rule applies to the refutation as it does to support.

## 9. Reconciliation of edits made outside vsect

Records are ordinary files, edited by anything. `vsect check` compares the working tree with the last state vsect recorded and classifies each difference; `vsect reconcile` resolves them. Allowed outcomes for each:

| Out-of-band change | What vsect does |
|---|---|
| statement text edited | pending `revise` (classify reworded / redefined) |
| statement tag added | pending mint |
| statement tag removed | pending retire, or rename if near-identical text reappears (§2.3) |
| record file renamed or moved | same record if kind and slug unchanged (directories mean nothing); otherwise a rename to confirm |
| record copied | collision: both kept, surfaced, resolved by retiring or renaming one |
| record deleted | pending retire of its statements; findings stay visible |
| frontmatter `kind` changed | refused: kind change is retire + mint |
| frontmatter edges changed | pending: effective versions recompute; the change is recorded as an event on `revise` |
| event file edited, deleted or duplicated | reported (§5.3); never repaired silently |
| branches merged with divergent statements | each divergent statement becomes a pending revise against both parents |

`vsect commit` refuses while any change is unreconciled, and names it.

## 10. Stores and addressing

spec-lite's address contract is adopted: each store's `.vsect/kinds.yaml` has a `stores:` mapping of names to paths; unqualified references resolve in the local store; qualified ones (`store/kind:slug`) resolve through the mapping and then the target store's own kinds file; identity is `(kind, slug)` and duplicates are surfaced. A store has a declared `name`, used in every event. Nested stores: search for a store root stops at the nearest `.vsect/`; a parent store does not see a nested store's records except through its mapping. Links in files name their kind; a bare slug is resolved only in a field whose kind is declared (`fields: {per: decision}`), never guessed elsewhere. Symlinks are followed only within the store root.

## 11. Authority

The store declares `steward:` and `decider:` (names), and any delegations (issuer, scope, from, until, superseded-by). vsect cannot verify who is typing; it records actors as claims (§5.1). It refuses, at the porcelain, a `purpose` revision or a steward-routed answer whose recorded actor is not the declared steward, and records delegated decisions as awaiting ratification. These are checks against honest mistakes, not security; the trusted base (§13) says so.

## 12. Command contracts

1. **No hidden questions.** Every question a verb can ask has a flag or stdin form (`--answer key=value`, or a YAML/udon document on stdin). Without a terminal, a verb that needs an answer it was not given stops, prints the question, and exits 3. It never defaults.
2. **Exit codes** describe the command, not the store: 0 the command did what was asked; 1 it did, and produced items the caller should act on (unplaced findings, refused carry-overs); 2 it failed; 3 it did not run (a missing answer, an unreconciled change, an absent precondition). Store health is reported in output, never in the exit code. The bare dashboard exits 0 when it rendered.
3. **Dry run.** Every verb that writes accepts `--dry-run`, printing exactly what it would write.
4. **Atomicity.** A verb that writes several things (events, record files, influx log) writes an intent file first, then the pieces, then removes the intent. On start, any leftover intent is reported and must be completed or rolled back (`vsect recover`).
5. **Machine output** (`--format json|udon`) carries `schema: vsect-<verb>/<n>` and is stable within a schema version.
6. **Designators.** vsect acts on its own only when a designator is exact (a full `kind:slug` or statement id). Anything else — a partial slug, free text — yields candidates with how each matched, and the caller chooses.

## 13. The trusted base

What vsect guarantees: given an unaltered trail, every displayed value is reproducible from the declarations and events; edits, deletions and duplicates in the trail are detected (§5.3) against git history; checks are bound to the exact text they read. What it does not guarantee: that recorded acts happened, that recorded actors are who they say, or that a store's declarations are wise. Reproducible checks make fabricated acts convictable later. One-off acts (testimony, a read nobody can repeat) rest on trust in whoever recorded them and never count toward independent agreement.

## 14. Fixtures to write before any semantic command ships

- grammar: every construct in §1, including tags in code, quotes, tables, lists; `of` and `narrates` attachment; unassigned truth-apt prose;
- normalizer: reflow invariance; any math change stales; NFC;
- identity: rename-with-carry; split; merge; delete-and-re-add detected as rename; collisions;
- effective versions: a redefinition two steps upstream stales the right checks and no others;
- edges: the cascade table of §4, statement by statement;
- events: edited / missing / duplicate / deleted detection;
- projections: order invariance under permutation; independence over `seeded-by` chains;
- reports: structured and free-form intake; idempotent re-take; version-from-quotes;
- reconciliation: every row of §9, including a branch merge;
- commands: every question answerable non-interactively; exit codes; dry run; interrupted multi-file write recovered.

The test that matters most is the one Codex proposed: two independent implementations parse the same sample store and agree on every computed value.
