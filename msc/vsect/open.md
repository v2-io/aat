# Open questions, audit dispositions, and provenance

*Draft, revised 2026-10-28 after two de novo audits (`../vsect-audits/claude-audit.md`, `../vsect-audits/codex-audit.md`) and the coordinator's judgment of them, then again the same night after a third (`../vsect-audits/agy-audit.md`, Gemini) and the coordinator's round-2 judgment (`../vsect-audits/coordinator-judgment.md`, *Round 2*). The round-2 integration was done by a fresh Claude (Opus 5.5) instance, not the drafting fork. What is still open, which of it needs Joseph, how each audit finding was handled, where this revision went beyond or against the judgment, and where each element came from.*

## Open, and needing Joseph

1. **Who-moves-next flags: typed or computed?** spec-lite keeps `awaiting-second`, `awaiting-decision` and `needs-work` as typed frontmatter booleans. That was Joseph's own proposal (`spec-lite-0.1.0/sop/influx/jaw-proposal-and-feedback.md` §1.1: "recorded canonically in the yaml frontmatter"). This draft computes them from events instead (`model.md`, *Who moves next*), because a typed `awaiting-second: false` is a standing word and the auditors found the typed form contradicts the draft's other rules. That reverses his words, so it is his call, not spec-lite's decider's alone.
2. **Can a verifier be shown only part of an atom?** "One fate, one atom" puts a claim's gloss and its defending discussion inside the claim's atom: they are refuted together. But a de novo verifier should re-derive without the author's working — and under that principle, reading the atom *is* reading the author's working (agy A9). The draft's provisional handling (`core.md` §7.5, `vsect.md` §3.4): stage one gives the statement's primary span and the primary spans of what it rests on, and withholds its attached spans, teaching, any derivation that proves it, and prior findings; stage two, after that report is taken, gives the whole atom and asks whether every gloss says no more than the statement. *The integrator's lean:* this is coherent, because fate and visibility are different properties — one fate says what is refuted, superseded or ratified together, and nothing in it says the parts must be read together; the two stages keep the blind re-derivation and still check the glosses, which a verifier denied them could not. Its cost falls on authors: anything defending a claim that sits in the claim's own primary span (before the next heading) is shown to the verifier, so ASF-style segments would need their defense moved under a heading and attached with `of`. Whether that is the right reading of the principle is Joseph's, since he endorsed it.
3. **Where vsect lives, and in what language.** This draft sits in `~/src/aat-v3/msc/vsect/` because aat-v3 is its first consumer. A durable estate tool more likely belongs at `~/src/arch/firmatum/utils/vsect/`, and the estate's stance for durable content-parsing tools trends toward Rust on the udon core. Not decided.
4. **The cost of the landing rule.** Any rewording waits for a different mind before old checks carry over (`core.md` §9.1), and an unconfirmed change anywhere in a check's basis stales it however far upstream (`core.md` §3.7). Round 2 made the *mechanics* cheap — one unconditional confirmation at a root re-binds every downstream check with no downstream writes — but not the *judgment*: a confirmer at a root is asked whether the rewording is equivalent full stop, for every use downstream. One who can only say "equivalent for what this check checked" confirms for that check, and each dependent then waits for its own confirmation (`core.md` §9.2). Near AAT's roots that could still make much of Part I wait on second readers after one edit. The draft keeps the strict form, as the source and the coordinator ask; if it proves too costly in use, that is a finding to bring back, not a softening to pre-empt.
5. **The verb names** (`revise`, `take`, `confirm`, `refute`, `cross`, `contest`, `for`, `findings place` / `dispose`) are first choices. They should face the estate's naming criteria before they set. `cross` replaced round 1's `land` so that the influx verb no longer says *landed*, which Joseph reserved for outline rows (agy B1).

## Open, and needing spec-lite's decider (if vsect is to manage spec-lite)

6. **`verification-level:` and `evidence:` in frontmatter** — spec-lite's steward-decided convention (`sop/adr/per-kind-verification-and-status.md`). vsect computes the same from event files and writes nothing back (`storage.md`). No spec-lite record carries these fields yet.
7. **Hand-written `consequences:`** — vsect computes reverse edges and reports disagreements; whether spec-lite keeps writing them is its call.
8. **`strength:` on 53 cards.** `storage.md` reads it as the firmness of Joseph's ruling (a card is the decision for its rule), a process field shown beside computed standing. If it is meant as epistemic standing instead, vsect would refuse it as typed standing.
9. **Which of `depends:` and `test-fixtures:` are meaning edges** — whether a change to what a card depends on stales checks on the card (`core.md` §3.4, §4).

## Open, closable by anyone

10. **The five-segment test.** Re-mark five ASF Part I segments into statements under `core.md` §1 (tags, spans ended by headings, `of` spans, teaching), and count where each segment's existing findings fall: on a statement, on teaching, or still unassigned. Include a move, a split, a merge, a duplicate id and a refutation that crosses a record, and run the two-stage verification brief (Q2) on one claim to see how much of the author's case its primary span still carries. This is the first admission evidence for the theory store's kinds.
11. **The unassigned-prose detector.** `check` reports paragraphs that read like claims and belong to no statement. It is a heuristic, outside the exact-agreement surface (`core.md` §16); its false-positive rate on ASF is unknown.
12. **Ceilings.** A ceiling is now a declared function of statement-kind, form, lines and premise ceilings (`core.md` §6, from agy B5). Whether authors also need to declare a ceiling with a reason (ASF FORMAT's "Max attainable") is open.
13. **Projection functions.** No store has declared how standing is computed. Until one does, vsect shows raw trails. Candidate projections (strongest line, floor, broken, stale) and the container-row projection need definitions and fixtures (`core.md` §6, §8.3, §16).
14. **Rewording vs redefinition.** The classification is a judgment. How often the second-mind check fires on real edits is unknown.
15. **Math normalization.** The normalizer treats any change in math as a change (`core.md` §3.1). Equivalent notations will stale checks until math equivalence is specified. The normalizer pipeline is now precise enough for two implementations to agree on prose and math as written; it has not been run against real ASF files.
16. **Clocks.** Which waiting items get which limits, and what happens past one, is a store-level choice not yet made for aat-v3.
17. **Episodes.** Events carry an episode; whether a certification can attach to the episode as a whole (as in Samuel Wecker's independently built live_docs system) is open.
18. **Agentic output marks.** `⚠ ✓ ↻ ?` have not been checked across model families, as the estate's glyph study requires before a glyph carries meaning.
19. **Orientation.** `vsect orient` counts only reads made through `vsect read`; vivarium's sealed-quiz gate is the stronger instrument if a store wants one.
20. **Limen and statements.** Limen follows `[[kind:slug]]` today; following `#statement` ids needs it to learn the statement tag, and showing generated marks distinctly would help.
21. **Defined terms as edges.** In a store that delimits defined terms (`core.md` §12.4), every delimited use of a term is a use of the definition that lists it — which is what a `defined-by` edge declares by hand. Computing `defined-by` from delimiters (with declared edges as a consistency check) would make upstream staleness follow actual use rather than the author's memory of it. Not adopted; worth deciding when a store first delimits terms.

## Where this revision went beyond or against the round-2 judgment

All eighteen round-2 findings are adopted in the forms the judgment states. Where the integration had to choose something the judgment left open, or went further, it is listed here so the coordinator can disagree.

- **Cascade marks (B2, extended).** The judgment asks `refute` to write a mark into the refuted statement's file. ASF's routing SOP goes on: *"every dependent of the falsified claim must be found and either cascade-marked … an un-marked dependent of a falsified claim is the same 'segment lies about itself' failure, one hop away"* (`routing.sop.md` §4.2). So marks are also written above every statement the refutation makes broken and every teaching statement that narrates it (`core.md` §10.2). Statements whose checks merely went stale are not marked: their text does not now assert anything known false, and staleness is shown by `read`.
- **Atoms (A2/A5, a mechanism the judgment did not name).** Edges resolve to **atoms** (the minting event's id), and version vectors are keyed by atom, not by display id, so renaming a statement stales nothing that rests on it, and a moved statement's trail is gathered by atom rather than by moving event files (agy A5.4). Without this, a rename near a root would have staled every check downstream — the cost Q4 worries about, for no change in meaning.
- **Own version excludes edges.** The own version covers text, kind and declared form; edges shape the basis instead (`core.md` §3.2, §3.4). A check therefore stales when a meaning edge is added or removed, and a confirmation cannot carry it across that change.
- **No `_unplaced` directory (A6).** agy proposed `.vsect/events/_unplaced/`. Instead a finding is an item of a report record, so an unplaced finding's trail lives under its report — it never needs a target to have a home (`storage.md`, *Briefs and reports*).
- **Built-in record kinds.** Round 1 had `init` declare no kinds. Reports now need a home (A6), and `ask`, `decide` and purpose revision already wrote question, decision and purpose records, so these four are built in (`core.md` §6). The domain's kinds — everything the theory is made of — are still admitted, not seeded. This narrows round 1's "no kinds" rather than reversing it; if the coordinator reads it as a reversal, say so.
- **`reconcile` removed rather than aliased (B7).** `revise` with no argument does what `reconcile` did; keeping a second name for it seemed to cost more than it gave.
- **`strength:` (A10).** agy listed it as typed standing vsect would refuse. Read at its source, it is the firmness of Joseph's ruling on a card that is its own decision (`adr/leans-are-working-spec.md`), so `storage.md` treats it as a process field and leaves the reading to spec-lite's decider (Q8).
- **Two-stage verification (A9).** The judgment's proposed handling withholds defending discussion; withholding glosses too would lose the summary check that the brief was carrying (*"check that every summary says no more than the statement under it"*), so a second stage restores it after the blind first stage. Recorded with Q2.
- **A3's ASF census.** agy's numbers and the integrator's own regex count at `4ee2b89` broadly agree (about 550 tags, about a third in the `*[Word (id)]*` form, 20 segments with none); the coordinator's quick count differed by pattern. `storage.md` gives rounded figures and says they are one regex's.

## How each round-2 finding was handled

*All adopted in the judgment's form; "Where" names where each now lives.*

| Finding | Handling | Where |
|---|---|---|
| A1 hash-only state can't run `read --at`, diffs, briefs, rename detection | objects store of every version seen, content-addressed and committed; lifecycle events carry own version and declarations | `core.md` §3.3, §5.2; `storage.md` *Objects* |
| A2 recursive effective version contradicts confirm-rewording and the transitivity column; cycles and unwritten targets | basis and version vector; equivalence from confirmations, unconditional or scoped; local holding rule; meaning edges acyclic; `unwritten` / `unreachable` components; confirmation scope as Q4 | `core.md` §3.4–3.7, §9.2; Q4 |
| A3 grammar: heading levels, one-paragraph `of`, inline `narrates`, id-uniqueness contradiction, ASF tags | any heading ends a span; `of` uses the same span rule; `narrates` in frontmatter only; ids unique per record; markers stripped before hashing; predecessor import raw, statements made when carved | `core.md` §1, §2.1; `storage.md` *Influx* |
| A4 closed edge set contradicts extensibility; missing edges; `proves` one-way | core set, extensible by declaration; `per`, `serves`, `concerns`, `blocks`, `recognizes`, `specializes` added; `proves` coupling | `core.md` §4 |
| A5 one event schema for all acts; `revise` and `era` missing | envelope plus per-class payloads; `revise`, `era`, `brief`, `take`, `review-finding` added; `weaken` renamed `narrow` | `core.md` §5.1–5.2 |
| A6 checks conflated with findings; no confirm or dispose verbs; nowhere to keep unplaced findings | typed report items (check, finding, equivalence, finding-review); `vsect confirm`, `vsect findings place` / `dispose`; reports and briefs as store directories, unplaced findings in their report's trail | `core.md` §7; `vsect.md` §3.5–3.6; `storage.md` |
| A7 version-from-quotes impossible as ordered | declared version first, quotes checked against stored text; quote search only for undeclared items | `core.md` §7.4 |
| A8 no outline grammar; no projection for containers | outline section: grammar, row-types, computed cells and marks, `--check`; container rows broken-first plus counts, never one grade | `core.md` §8; `model.md` *Record* |
| A9 independence rests on self-report; "the author's working" undefined | `read` / `descends-from` stated as declared provenance seeded by the brief; independence predicate with the shared basis excluded; withheld set defined; the atom tension as Q2 | `core.md` §5.6, §7.5; Q2 |
| A10 spec-lite understated | `grain: record`; spec-lite list extended (strength, record-grain edges, context sidecars, terms); defined-term contract | `core.md` §1.1, §12.4; `storage.md`; Q8–9 |
| B1 `landed` used for influx | crossings end *integrated*; verb `cross` | `model.md` *Influx*; `vsect.md` §3.10; `storage.md` |
| B2 a refuted statement unmarked in its file | generated marks, with cascade marks (above) | `core.md` §10; `vsect.md` §3.7; `session-aat.md` |
| B3 normalizer underspecified | precise pipeline | `core.md` §3.1 |
| B4 aliases in ids and paths | canonical kind names everywhere vsect records; aliases only as input and in links | `core.md` §2.1; `session-aat.md` |
| B5 ceiling ignores form and premises | ceiling a declared function of kind, form, lines and premise ceilings | `core.md` §6; `model.md` |
| B6 "as of" a commit over uncommitted work | `+dirty` moments | `core.md` §3.8; `vsect.md` §2; `session-aat.md` |
| B7 `revise` and `reconcile` overlap; no split / merge / supersede choices | `revise` is the one verb, with every lifecycle choice offered | `core.md` §11; `vsect.md` §3.3 |
| B8 heuristic counts vs exact agreement | heuristic outputs excluded from the agreement surface and labelled on the dashboard | `core.md` §16; `vsect.md` §2 |

## How each round-1 finding was handled

*Section references are to the current files (round 2 renumbered `core.md`). A = adopted as the coordinator judged; F = adopted in the form stated; D = declined or deferred, with the reason. Claude's findings are L1–L5, S1–S10 and minor; Codex's are A-01–A-12.*

| Finding | Handling | Where |
|---|---|---|
| L1, S1, A-01 statement as the unadjudicated, unidentified unit; glosses outside spans; departure from RC1 unstated | A: "one fate, one atom" opens the model; statement = atom (RC1's record), record = file; stable ids and lifecycle; gloss and discussion share the atom via contiguity or `of`; multi-statement prose is teaching; unassigned truth-apt prose reported | `model.md`, `core.md` §1–2 |
| L2 evidence doesn't decay on upstream redefinition | A: effective version over premises and definitions | `core.md` §3.4–3.7 |
| L3 landing rule weakened | A: any rewording waits for a second mind; author carry-over recorded as the author's claim at the lowest rung | `core.md` §9.1, `vsect.md` §3.3 |
| L4 version read is asserted, not observed | A: verifier reads a snapshot (`read --at`); `take` derives the version from quoted spans when it can, recording how | `core.md` §7.4, `vsect.md` §3.4–3.5 |
| L5 spec-lite doesn't fit | F: README narrows to theory-first; the four differences recorded as spec-lite's decider's questions; decision `status:` allowed as a process fact; YAML records and typed bare slugs supported | `README.md`, `storage.md`, Q6–9 |
| S2, A-11 `init` seeds untested kinds; profile conflates write semantics | A: `init` declares no kinds; candidates are founding material; experiment and run separated; "carried" retired as a line name (now *imported*); predecessor material has its own crossing | `model.md` *Kinds*, `vsect.md` §5 |
| S3 worked refutation grounded in purpose; redefinition shown as refutation; "leave it" offered as live | A: refutation by counterexample from the verified audit finding; redefinition shown separately via `revise`; "leave $\theta$ unnamed" shown as narrowed by the GA-1 result | `session-aat.md` |
| S4 flags contradictory | A, with a disagreement about routing: computed, dropped from frontmatter — but this reverses Joseph's own words, so it is Q1 for him | `model.md`, Q1 |
| S5 a finding closed by its author's own edit or delete-and-re-add | A (not named in the coordinator's judgment; adopted because it is the landing rule's twin at the finding→fix crossing): closure needs confirmation by someone other than the reviser; delete-and-re-add treated as rename | `core.md` §2.4, §9.3 |
| S6, A-06 identity and role self-declared | F: actors are recorded claims with a `read` and `descends-from` declaration; independence computed from those, never from role; steward and decider declared; harness session id in trailers; no credential system | `core.md` §5, §13, §15 |
| S7 no predecessor import | A: `bring --predecessor` carries findings and records old status words as the predecessor's claims | `vsect.md` §3.10, `storage.md` |
| S8 kind declared twice; ASF tag words are standing words; non-existent tag examples | A: frontmatter declares, tag must agree (`check`); reviewed mapping table for ASF's ~30 tag words (replaced in round 2, A3: statements are made when a segment is carved, and the old word is recorded as the predecessor's claim); examples corrected (ASF has no `Claim` tag) | `storage.md`, `core.md` §1 |
| S9, A-03 untyped edges | A: closed edge set with cascade behavior (made a core set, extensible, in round 2, A4); `seeded-by` added; reverse edges computed; written `consequences:` reconciled, not overridden | `core.md` §4 |
| S10 Working Notes, form/ceiling, floor, two hash spaces undefined | A: Working Notes forward-only and excluded from `--bare`; ceiling no longer typed (Q12); projections declared or raw (Q13); statement digests separated from commit ids | `core.md` §1.7, §3, §6 |
| A-02 computed standing undeclared | A: projections must be declared and fixtured; raw trails until then | `core.md` §6, `vsect.md` §2 |
| A-04 append-only unenforced | F: append-only by convention, anchored by git; content-derived event ids; edit/delete/duplicate/missing detection. **D**: signatures and Merkle manifests, as plumbing ahead of need for a local single-steward estate (coordinator's call; drafter agrees) | `core.md` §5, §15 |
| A-05 no report protocol | A: report skeleton; unplaced findings; idempotent intake | `core.md` §7 |
| A-07 grammar and normalizer | A: normative grammar; vsect-owned deterministic normalizer; full SHA-256; conservative math | `core.md` §1, §3 |
| A-08 no reconciliation | A: reconciliation table; commit refuses over unreconciled edits | `core.md` §11 |
| A-09 store addressing | A: spec-lite's address contract; event paths keyed by kind and slug | `core.md` §12, `storage.md` |
| A-10 command semantics | A: every question answerable by flag; exit 3 without one; exit codes describe the command, not the store; dry run; intent-file recovery | `core.md` §14, `vsect.md` §6 |
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
| Ceilings derived rather than typed | this revision, from Claude S10 | synthesized (Q12) |
| Flags computed rather than typed | this revision, from Claude S4 and the coordinator's judgment | synthesized; reverses Joseph's proposal (Q1) |
| ASF tag-word mapping on import | Claude S8 (counts verified by that auditor) | carried; the mapping itself is to be reviewed |
| Objects store, version vectors with confirmed equivalence, typed report items, `grain: record`, outline grammar, generated marks on refutation, envelope-plus-payload events, `+dirty` moments, the normalizer pipeline | the agy audit (A1–A10, B1–B8) as judged by the coordinator in round 2 | carried from the audit; exact forms synthesized in the round-2 integration |
| Generated marks on refutation | ASF `doc/sop/audit.sop/routing.sop.md` §4.1 ("A segment must never lie about its own status, even transiently"); RC1 04 *LAND*; agy B2 | carried |
| Cascade marks on broken dependents and narrating teaching | ASF `routing.sop.md` §4.2 (cascade closure) | carried; extended here beyond the judgment's form |
| `integrated` for influx crossings, `landed` only for outline rows | Joseph, 2026-09-30 (spec-lite `sop/adr/landed-not-integrated.md`); agy B1 | carried (steward ruling) |
| Outline grammar, row-types, `※` / `∂` columns, cell marks `— ∅ ⚠` | spec-lite `sop/src/conv-outline.md`, `conv-row-type.md`, `conv-column-notation.md` (Joseph's proposals there) | carried |
| Term delimiters and `terms:` | spec-lite `sop/src/conv-term-delimiters.md`; limen `vsect.lua` | carried |
| Atoms (statement identity as the minting event), two-stage verification, built-in process kinds, own version excluding edges | round-2 integration | synthesized (see *Where this revision went beyond or against the round-2 judgment*) |
| Dashboard layout, verb set and names, exit-code scheme | first draft, revised | synthesized |
| The worked session's defects | ASF `01-aat-core/src/{post-causal-structure,scope-adaptive-system,def-agent-environment}.md`; audit 731548 B-3; `spikes/epistemic-target-ontology/{00-spike,01-ga1-verification}.md` | real, cited |

Coherence caution: almost every source above descends from one steward and one family of agents, and this draft was written and revised by an agent that had read all of them. Three audits from three model families found its weak places — the third mostly in machinery the first two had prompted; agreement between them is the strongest evidence this draft has, and it is evidence about the draft's gaps, not about its rightness. Round 2's mechanisms have been traced through the porcelain on paper, not run. The next check is the five-segment test (Q10), then a first implementation against the fixtures in `core.md` §16, then real use.
