*KR B.1 (claim records) and I.4 (standing read from recorded checks), under the top intent "Complete "in-place" refactor of ASF-- meta, all artifacts, and theory itself." (Joseph, 2026-10-30). Measurement branch `worktree-agent-a25fdf864ac319cc9`, commits `73e47ee9` (kind declaration) and `249dfbf9` (the changeset); not merged, not pushed.*

# Moving the Claim Records out of segment bodies: what it cost vsect, measured

*2026-11-04, by a general-purpose Claude Opus 5.5 agent (`0903e35e…/a25fdf864ac319cc9`), for the lead and for councils-46. Midway through, the in-place line was closed in favour of founding a new store in `~/src/aat-v3/`. The extraction was finished anyway, on the branch, because the honest numbers come from vsect computing them on the real store, and the cost was small. What carries over to the new store is in the last two sections.*

## The numbers

All counts are read from `vsect` (dashboard) and `vsect confirm` (pending pairs), vsect 0.1.0. A *pair* is (record, version a check read, version now): one second-mind judgment in v1. "Checks waiting" counts the distinct checks listed under any pending pair.

| | before (`2133cf2e`) | one changeset (`249dfbf9`) | 24 separate edits (throwaway copy) |
|---|---|---|---|
| pending pairs | 234 | 242 | 242 |
| checks waiting on a pair | 348 | 349 | 349 |
| dashboard "rewordings awaiting" / "checks lapsed" | 223 / 336 | 231 / 336 | 231 / 336 |
| records holding now | 6 | 8 | 8 |
| revise events written | – | 15 | 15 |
| `vsect revise` invocations | – | 15, by name | 15, by name |
| sittings (commits) | – | 1 | 24 |
| pairs created / removed along the way | – | 82 / 74 | 82 / 74 (summed over steps) |
| worst intermediate state | – | – | 246 pairs, 353 checks waiting |

**The headline: in vsect v1 the two protocols cost exactly the same.** The 24-edit run ends with the same 242 pairs, each carrying the same checks (compared pair by pair), and along the way it creates and removes exactly the 82 and 74 pairs the single changeset does: no pair was created and then destroyed mid-run. The reason is structural. A verdict compares each check's recorded basis versions with the versions in the tree now (`state.rs`, `verdict`), and a pending pair is keyed by (record, from, to). So cost is a function of the end state, not of how many edits produced it. Episodes would save nothing in recording. The cost of not having them is on the confirm side (next section).

The changeset's own composition, which the flat totals hide:

| | pairs | check-bindings | notes |
|---|---|---|---|
| new pairs (record-carrying version to record-free version) | 15 | 443 (138 distinct checks) | one per segment that a check rested on; their diffs total 618 lines, which is exactly the removed record text |
| retargeted pairs (same `from`, new `to`) | 67 | – | old debt. The diff a confirmer reads now leaves out the record wherever `from` predates the insertion |
| pairs that vanished | 7 | 412 | the Part I persistence family; see below |
| checks that hold again / newly waiting | 4 / 5 | – | `a2-front-door-trace-1` ×3 and `defender-noise-round-2` ×1 hold again; `part-ii-round-2` ×5 newly wait |

For comparison, the sprint's retrospective reports that inserting the records lapsed 13 of the 36 pairs in the one confirm pass. Removing them creates 15 pairs and erases 7.

## The 24, counted

- 24 segments, 1,154 lines, 79 entries (the retrospective counted 1,130 lines). Every section sat between `## Epistemic Status` and `## Discussion`, so the cut is one contiguous span in each file.
- By `01-aat-core/OUTLINE.md` placement: 16 in Part II, 6 in Part I plus `result-sector-persistence-template` in the Appendices (the persistence family, 7), and `deriv-observation-noise-placement`, first listed under Part III. This matches the lead's figures.
- 20 of the 24 insertions were pure: the inserting commit changed nothing else in the hashed text. The other four inserting commits also edited the body: `der-causal-hierarchy-requirement`, `der-loop-interventional-access`, `der-orient-cascade`, `deriv-observation-noise-placement`.
- **For 9 segments, removal returns the hashed text exactly to the version before insertion:** the 7 persistence-family segments, plus `def-strategy-dimension` and `form-complete-agent-state`. Nothing in their hashed text changed after the insertion, and vsect had already stored those versions. Because vsect addresses text by content, every check and every scoped confirmation bound to the old version counts again with no event. That is why 7 pairs (412 bindings) vanished, and why `form-sector-condition`'s `004adea7` pair fell from 7 waiting checks to 1: confirmations made against the pre-insertion text applied again. Only 4 checks actually hold again, because nearly every check also waits on other upstream pairs.
- Per-segment detail (insert commit, versions, bindings) is in `claim-record-extraction-2026-11-04/census.json`.

## What vsect would need to treat this as one act

The changeset is mechanical and invariant-checked (below). In v1 it still costs 15 revise invocations and leaves 15 confirm judgments, and each judgment cannot be a blanket "equivalent". These are the gaps, most consequential first.

1. **Evidence about moved text cannot follow it.** The two reviews written to check the records, `b1-part-ii-check-1` and `part-ii-check-1-b1-records`, recorded 31 checks, 25 of them on these 24 segments. Their outcomes: 10 confirmed, 14 narrowed, 7 broken. Of the 59 findings open on the 24 segments, 18 come from those two reviews, and 21 come from them or name a record in their text. All of that evidence stays keyed to `segment:<slug>`, whose text no longer contains what it judged. Events are append-only, and v1 has no act that says "this span moved to that record". The design already has the act: `split` (`core.md` §5.2, lifecycle `from`/`into` atoms). With a split from `segment:x` into (`segment:x`, `claim-record:x`), the 25 checks and the record findings would be gathered under the record they judged. Without it, the honest v1 repair is an `annotate` per event (31 checks plus the findings), a cost a new store avoids entirely by never putting the records in the body.
2. **A confirmer cannot judge the changeset once.** Of the 138 distinct checks behind the 15 new pairs, most read only the body, so for them the removal is equivalent. A few read the record. A keyword reading of their criteria finds 6 that may have judged the very record their pair removes. Five clearly did: `b1-part-ii-check-1#C2` and `part-ii-round-2#C3`, `#C5`, `#C10` and `#C11`. The sixth, `part-ii-check-1-identification#C10`, is doubtful. A confirmer would have to make the call check by check. So an unconditional `confirm … --judgment equivalent` would be false for those, and v1 forces 15 separate `--checks` splits. To be one act, an episode needs two things. (a) A declared, tool-verified transform on `revise`. vsect can verify "the new text is the old text minus one heading-delimited span, and the span is byte-identical in record R" exactly as `scripts/extract.py verify` does. (b) Read sets at span grain, so that one episode confirmation can re-bind every check whose read set excludes the moved span and end the rest. Read sets today name records, not spans. With (a) alone, the 15 judgments shrink to one transform check, but the per-check split remains. With (a) and (b), the act is one confirmation. This is Q17 meeting Q2 (`~/src/aat-v3/msc/vsect/open.md`): what a check read is what decides whether an episode can be confirmed whole.
3. **`revise` cannot be scoped to a changeset.** Bare `vsect revise` walks every unclassified edit in the tree, and here that included two edits by someone else (`def-auxilia-hierarchy` and `disc-adversarial-coupling-pressure`). The changeset had to be revised by name, 15 invocations. An episode id on `revise` (the design's envelope already has `episode:`) would scope it.
4. **Keep content addressing exactly as it is.** The 7 vanished pairs came free because versions are hashes of normalized text, and an exact revert lands on a version the trail already knows. Whatever an episode adds should not fold the episode into the version hash, or this property is lost.

I found nothing that needs a code change for the record kind itself. Declaring `claim-record` in `.vsect/kinds.yaml`, with a `describes` edge (`in_basis: true`, `meaning: true`, `on_refute: flag`), worked in vsect 0.1.0 as it stands. `vsect impact segment:result-persistence-condition` lists `claim-record:result-persistence-condition` via `describes`, and records two hops downstream through `depends`. A check on a record therefore binds the segment's version and lapses when the segment changes, while the segment's own basis never includes its record.

## What this says about how the new store should hold claim records

The plan's phase-4 question is whether a Claim Record shares its statement's fate (`MATURATION-PLAN.md`). This pilot does not run the five-segment test, but it bears on it. The record reviews broke or narrowed 21 of the 31 record checks, and many records argue against sentences in their own body. `claim-records/result-persistence-condition.md` says that the body's "structural failure requires changing the correction architecture entirely" "is therefore false of retunable gains and of added information". Records fail, and get repaired, on their own schedule. In design terms that answers the record-boundary test ("can this piece fail … while that piece stands?") with yes. So in a store founded fresh:

- a claim record is its own record from the start, never part of the statement's hashed text, with an edge to the statement it describes that puts the statement in the record's basis and not the reverse;
- checks and findings about a record are placed on the record, so none are ever stranded;
- statement text does not cite its records by position ("the first Claim Record"), because the position does not survive a move. Three such citations exist in ASF (below).

Whether a record is one record per statement or one per claim within it is open. The ASF records hold 1 to 7 claims each, and the record reviews checked them claim by claim ("Record 1: …", "R2's register"), which suggests per-claim grain.

## How the extraction was done, and how to check it

- `scripts/extract.py apply` moved each `## Claim Record` section, up to the next level-2 heading, byte for byte into `claim-records/<slug>.md`, under frontmatter `describes: segment:<slug>`.
- `scripts/extract.py verify 73e47ee9 249dfbf9` re-checks from git alone, and passes with 24 segments and 0 violations. Per segment it checks that splicing the moved bytes back at the same line reproduces the old file exactly, that the sidecar is the frontmatter plus exactly those bytes, that the frontmatter is unchanged, and that vsect's statement text changed by that span and nothing else. A one-character change in a body or a sidecar is caught; this was tested.
- `scripts/vnorm.py` transcribes vsect's version computation, so that versions can be computed at past commits. It agrees with `vsect read` on all 247 segments (`scripts/validate.py`).
- The 24-edit run (`scripts/sequential.py`) ran on a copy of the tree at `2133cf2e`, without git, with the same `kinds.yaml`. Each step extracted one record, ran `vsect revise segment:<slug>`, and measured. It made no confirmations: a confirm must come from someone other than the reviser, and simulating one would mean forging an identity. The per-step table is in `data/seq.json`.
- `vsect check` after the changeset: structure clean, exit 0.

## Left as found, deliberately

- **Three in-text citations now point at a sidecar.** `der-directed-separation` cites "(first Claim Record)" twice: in Discussion, which is hashed text, and in Working Notes. `der-orient-cascade`'s Epistemic Status says "(Claim Record)". Repointing them would be a rewording, which would break the strict invariant and need its own confirm, so they were left alone and are listed here instead. The in-place line is closed, so they were not opened as vsect items.
- **The SOPs still prescribe the section.** `doc/sop/format.sop.md` (cadence item 6 and its `### Claim Record` subsection) and `doc/sop/agents.sop.md` (cadence item 6) were not edited. On a landing branch they would change in the same commit, to say where records live.
- **`CURRENT-VOL1.md` and `CURRENT-VOL1-APPENDICES.md` still carry the records.** They are generated snapshots. A rebuild would drop them, because the build reads segment bodies; it was not run.

## On the brief, and what cheaper would have been

The brief was clear, and its bounds were right: claims, by-path commits, branch only. One instruction turned out to rest on an unexamined assumption: the request to run 24 separate edits "so the difference is the cost of not having episodes". In vsect v1 that difference is zero by construction, because cost depends only on the end state. That is worth knowing, but the measurement could have been predicted from `state.rs` before running it. In hindsight the cheaper route to the same numbers was the copy alone: run the extraction there and measure, with no branch commits. The branch adds only the git-checkable invariant. By the clock, the claims went in at 11:30 MST and this account was written by about 11:50 MST. Orientation and validating the hash transcription came before the claims.

*Scripts: `claim-record-extraction-2026-11-04/scripts/`, run from the asf root. Data: `claim-record-extraction-2026-11-04/data/` and `census.json`. Claims on the 24 segments were released at the end.*
