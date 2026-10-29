# Open questions, audit dispositions, and provenance

*Draft, revised 2026-10-28 after two de novo audits (`../vsect-audits/claude-audit.md`, `../vsect-audits/codex-audit.md`) and the coordinator's judgment of them (`../vsect-audits/coordinator-judgment.md`). What is still open, which of it needs Joseph, how each audit finding was handled, where the drafter disagrees, and where each element came from.*

## Open, and needing Joseph

1. **Who-moves-next flags: typed or computed?** spec-lite keeps `awaiting-second`, `awaiting-decision` and `needs-work` as typed frontmatter booleans. That was Joseph's own proposal (`spec-lite-0.1.0/sop/influx/jaw-proposal-and-feedback.md` §1.1: "recorded canonically in the yaml frontmatter"). This draft computes them from events instead (`model.md`, *Who moves next*), because a typed `awaiting-second: false` is a standing word and the auditors found the typed form contradicts the draft's other rules. That reverses his words, so it is his call, not spec-lite's decider's alone.
2. **Where vsect lives, and in what language.** This draft sits in `~/src/aat-v3/msc/vsect/` because aat-v3 is its first consumer. A durable estate tool more likely belongs at `~/src/arch/firmatum/utils/vsect/`, and the estate's stance for durable content-parsing tools trends toward Rust on the udon core. Not decided.
3. **The cost of the landing rule.** As now specified, any rewording waits for a different mind before old checks carry over (`core.md` §8.1), and a redefinition near the root stales checks on everything resting on it (`core.md` §3.3). Near AAT's roots that could make most of Part I wait on second readers after one edit. The draft adopts the strict form, as the source and the coordinator ask; if it proves too costly in use, that is a finding to bring back, not a softening to pre-empt.
4. **The verb names** (`revise`, `take`, `refute`, `land`, `contest`, `for`) are first choices. They should face the estate's naming criteria before they set.

## Open, and needing spec-lite's decider (if vsect is to manage spec-lite)

5. **`verification-level:` and `evidence:` in frontmatter** — spec-lite's steward-decided convention (`sop/adr/per-kind-verification-and-status.md`). vsect computes the same from event files and writes nothing back (`storage.md`). No spec-lite record carries these fields yet.
6. **Hand-written `consequences:`** — vsect computes reverse edges and reports disagreements; whether spec-lite keeps writing them is its call.

## Open, closable by anyone

7. **The five-segment test.** Re-mark five ASF Part I segments into statements under `core.md` §1 (tags, `of` paragraphs, teaching), and count where each segment's existing findings fall: on a statement, on teaching, or still unassigned. Include a move, a split, a merge, a duplicate id and a refutation that crosses a record. This is the first admission evidence for the theory store's kinds, and the test of whether `of`-attachment carries glosses well enough.
8. **The unassigned-prose detector.** `check` reports truth-apt paragraphs that belong to no statement. Telling a truth-apt sentence from a pointer or a framing sentence is a heuristic; its false-positive rate on ASF is unknown.
9. **Ceilings.** The draft removed the hand-typed per-statement `ceiling:` (an auditor noted it is the same word d60c511 kept) and says a ceiling derives from the statement-kind and its declared lines. Whether that derivation is enough, or authors need to declare a ceiling with a reason (ASF FORMAT's "Max attainable"), is open.
10. **Projection functions.** No store has declared how standing is computed. Until one does, vsect shows raw trails. Candidate projections (strongest line, floor, broken, stale) need definitions and fixtures (`core.md` §6, §14).
11. **Rewording vs redefinition.** The classification is a judgment. How often the second-mind check fires on real edits is unknown.
12. **Math normalization.** The normalizer treats any change in math as a change (`core.md` §3.1). Equivalent notations will stale checks until math equivalence is specified.
13. **Clocks.** Which waiting items get which limits, and what happens past one, is a store-level choice not yet made for aat-v3.
14. **Episodes.** Events carry an episode; whether a certification can attach to the episode as a whole (as in Samuel Wecker's independently built live_docs system) is open.
15. **Agentic output marks.** `⚠ ✓ ↻ ?` have not been checked across model families, as the estate's glyph study requires before a glyph carries meaning.
16. **Orientation.** `vsect orient` counts only reads made through `vsect read`; vivarium's sealed-quiz gate is the stronger instrument if a store wants one.
17. **Limen and statements.** Limen follows `[[kind:slug]]` today; following `#statement` ids needs it to learn the statement tag.

## How each audit finding was handled

*A = adopted as the coordinator judged; F = adopted in the form stated; D = declined or deferred, with the reason. Claude's findings are L1–L5, S1–S10 and minor; Codex's are A-01–A-12.*

| Finding | Handling | Where |
|---|---|---|
| L1, S1, A-01 statement as the unadjudicated, unidentified unit; glosses outside spans; departure from RC1 unstated | A: "one fate, one atom" opens the model; statement = atom (RC1's record), record = file; stable ids and lifecycle; gloss and discussion share the atom via contiguity or `of`; multi-statement prose is teaching; unassigned truth-apt prose reported | `model.md`, `core.md` §1–2 |
| L2 evidence doesn't decay on upstream redefinition | A: effective version over premises and definitions | `core.md` §3.3–3.4 |
| L3 landing rule weakened | A: any rewording waits for a second mind; author carry-over recorded as the author's claim at the lowest rung | `core.md` §8.1, `vsect.md` §3.3 |
| L4 version read is asserted, not observed | A: verifier reads a snapshot (`read --at`); `take` derives the version from quoted spans when it can, recording how | `core.md` §7.4, `vsect.md` §3.4–3.5 |
| L5 spec-lite doesn't fit | F: README narrows to theory-first; the four differences recorded as spec-lite's decider's questions; decision `status:` allowed as a process fact; YAML records and typed bare slugs supported | `README.md`, `storage.md`, Q5–6 |
| S2, A-11 `init` seeds untested kinds; profile conflates write semantics | A: `init` declares no kinds; candidates are founding material; experiment and run separated; "carried" retired as a line name (now *imported*); predecessor material has its own crossing | `model.md` *Kinds*, `vsect.md` §5 |
| S3 worked refutation grounded in purpose; redefinition shown as refutation; "leave it" offered as live | A: refutation by counterexample from the verified audit finding; redefinition shown separately via `revise`; "leave θ unnamed" shown as narrowed by the GA-1 result | `session-aat.md` |
| S4 flags contradictory | A, with a disagreement about routing: computed, dropped from frontmatter — but this reverses Joseph's own words, so it is Q1 for him | `model.md`, Q1 |
| S5 a finding closed by its author's own edit or delete-and-re-add | A (not named in the coordinator's judgment; adopted because it is the landing rule's twin at the finding→fix crossing): closure needs confirmation by someone other than the reviser; delete-and-re-add treated as rename | `core.md` §2.3, §8.2 |
| S6, A-06 identity and role self-declared | F: actors are recorded claims with a `read` and `descends-from` declaration; independence computed from those, never from role; steward and decider declared; harness session id in trailers; no credential system | `core.md` §5, §11, §13 |
| S7 no predecessor import | A: `bring --predecessor` carries findings and records old status words as the predecessor's claims | `vsect.md` §3.9, `storage.md` |
| S8 kind declared twice; ASF tag words are standing words; non-existent tag examples | A: frontmatter declares, tag must agree (`check`); reviewed mapping table for ASF's ~30 tag words; examples corrected (ASF has no `Claim` tag) | `storage.md`, `core.md` §1 |
| S9, A-03 untyped edges | A: closed edge set with cascade behavior; `seeded-by` added; reverse edges computed; written `consequences:` reconciled, not overridden | `core.md` §4 |
| S10 Working Notes, form/ceiling, floor, two hash spaces undefined | A: Working Notes forward-only and excluded from `--bare`; ceiling no longer typed (Q9); projections declared or raw (Q10); statement digests separated from commit ids | `core.md` §1.6, §3, §6 |
| A-02 computed standing undeclared | A: projections must be declared and fixtured; raw trails until then | `core.md` §6, `vsect.md` §2 |
| A-04 append-only unenforced | F: append-only by convention, anchored by git; content-derived event ids; edit/delete/duplicate/missing detection. **D**: signatures and Merkle manifests, as plumbing ahead of need for a local single-steward estate (coordinator's call; drafter agrees) | `core.md` §5, §13 |
| A-05 no report protocol | A: report skeleton; unplaced findings; idempotent intake | `core.md` §7 |
| A-07 grammar and normalizer | A: normative grammar; vsect-owned deterministic normalizer; full SHA-256; conservative math | `core.md` §1, §3 |
| A-08 no reconciliation | A: reconciliation table; commit refuses over unreconciled edits | `core.md` §9 |
| A-09 store addressing | A: spec-lite's address contract; event paths keyed by kind and slug | `core.md` §10, `storage.md` |
| A-10 command semantics | A: every question answerable by flag; exit 3 without one; exit codes describe the command, not the store; dry run; intent-file recovery | `core.md` §12, `vsect.md` §6 |
| A-12 milestone 0 too ambitious | A: first version infers nothing about truth | `vsect.md` §8 |
| Minor: event path collisions; declarations without a home; md-press as normalizer; orient weaker than vivarium's; relata's identifier-grade rule loosened; agentic default over-attributed; brief primes; invented Joseph quote; "certified in July", 174 files, downstream-weighting stated as fact; limen and statement ids; undefined terms; dashboard exit code; steward vs decider; commit refusal case unnamed; no dry run; refutation can't be contested | A, all | throughout |

## Provenance — where each element came from

*Carried* means taken from a named source; *synthesized* means made in this draft or its revision.

| Element | Source | Standing |
|---|---|---|
| "One fate, one atom"; the gloss shares the claim's fate | the 2026-08-31 verisectorium session (`~/.claude.bak.2026-09-23/projects/-Users-josephwecker-v2-src-arch-firmatum-verisectorium/91c680e1-….jsonl` L332, endorsed by Joseph at L341); RC1 02's grain invariant | carried |
| Porcelain-first; verbs are the work; record-keeping inferred from acts; `next`, `read` with marks, `revise`, bare `verify` briefs, `take`, the steward queue, commit trailers, the "did you check it against its source" prompt | `~/src/aat-refactored/scratch/vsect-porcelain-sketch.md` | carried, reworked |
| The underlying laws (nothing hand-set; append-only; evidence bound to its version; crossings recorded; absence three-valued; actor recorded); kinds admitted by evidence; phase 0 with no kinds | `~/src/aat-refactored/scratch/vsect-hypothetical-cli.md` | carried |
| Bare `vsect` = dashboard + usage; files abstracted behind a logical model "in the same way relata does"; YAML frontmatter + markdown now, udon later; de novo audits before landing | Joseph, 2026-10-28 | carried (steward direction) |
| Act only on identifier-grade designators, otherwise offer candidates; nothing waits invisibly; dry run | `relata --help` | carried |
| `[[kind:slug]]` resolution; kind in frontmatter; directories organize; kind change as retire + mint; outline always true; computed columns never typed; the store address contract | spec-lite `sop/` conventions and decisions; limen `vsect.lua` | carried |
| In a theory, derivation and evidence carry everything and authority is noise | `jaw-proposal-and-feedback.md` §3.14 | carried |
| Failure-and-repair individuation; evidence lines and rungs; signed refutations; criterion committed before the outcome; stating is recording; declines; eras; decay on edit, referent change and era bump; as-of projections; typed edges incl. rebut/undercut and transitive descent | verisectorium RC1 01–04, 06, 08, 09, 11 | carried; RC1 is itself `proposed` |
| Episodes | RC1 `95-ADDENDUM-field-trial-2026-08-30.md` | carried as an open question |
| Three output audiences | `~/src/arch/firmatum/principles/src/norm-three-audiences.md` (Joseph, 2026-10-10); the agentic default is that file's undecided proposal | carried |
| Founding leaves outline (and here, kinds) to the steward; influx index records only outcomes | verisectorium `theory/sop/influx/deploy-3-founding-feedback-2026-08-12.md`; the hypothetical-CLI sketch's phase 0 | carried |
| Questions with closers; purpose statements as the only place steward authority enters theory content | aat-refactored `PROPOSAL-2026-09-29-foundation-and-sops.md` §6–7; RC1 07 | carried |
| The landing rule in its strict form | aat-refactored proposal ("any rewording, even one judged equivalent, is checked again"); the `d60c511` failure | carried |
| Instantiation as a verification method | ASF audit 731548; ASF TODO §2026-07-03 | carried |
| Per-file events for multi-agent safety | ASF `terminology/decisions/` | carried |
| Integrity contracts: identity lifecycle, effective versions, closed edge set, event schema and the four separate claims, report protocol, reconciliation, command contracts, raw-until-declared projections, milestone 0 | the two de novo audits (Codex A-01–A-12; Claude L1–S10) as judged by the coordinator | carried from the audits; their exact forms here are synthesized |
| `of` paragraphs attaching non-contiguous prose to a statement; teaching statements via `narrates`; the unassigned-prose report as a prompt rather than an error | this revision | synthesized |
| Ceilings derived rather than typed | this revision, from Claude S10 | synthesized (Q9) |
| Flags computed rather than typed | this revision, from Claude S4 and the coordinator's judgment | synthesized; reverses Joseph's proposal (Q1) |
| ASF tag-word mapping on import | Claude S8 (counts verified by that auditor) | carried; the mapping itself is to be reviewed |
| Dashboard layout, verb set and names, exit-code scheme | first draft, revised | synthesized |
| The worked session's defects | ASF `01-aat-core/src/{post-causal-structure,scope-adaptive-system,def-agent-environment}.md`; audit 731548 B-3; `spikes/epistemic-target-ontology/{00-spike,01-ga1-verification}.md` | real, cited |

Coherence caution: almost every source above descends from one steward and one family of agents, and this draft was written and revised by an agent that had read all of them. Two audits from different model families found its weak places; agreement between them is the strongest evidence this draft has, and it is evidence about the draft's gaps, not about its rightness. The next check is the five-segment test (Q7) and then real use.
