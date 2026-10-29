# De novo audit of the vsect design draft (`msc/vsect/`, 2026-10-28)

> [!note] **Integrated (round 1).** This audit was judged in `coordinator-judgment.md` and integrated into the vsect draft at `8fae9c4`; how each finding was handled is in `../vsect/open.md`. Kept as the auditor wrote it. Section numbers it cites refer to the draft it read, not the current one.

*Auditor: Claude (Opus 5.5), 2026-10-28, from a bare brief ("would you do a de novo audit of the vsect spec draft"), with free rein over the estate and read-only outside this directory. I had not seen the drafting session. I read the six draft files whole first and formed a first-pass list, then checked that list against the sources the draft cites. To keep my read unprimed I did not open `codex-audit.md` or `coordinator-pre-audit-notes.md` in this directory. After my findings had formed I read two of the coordinator's notes (`00-orientation-log.md`, `40-emerging-picture.md`) for context on aat-v3.*

*Register: these are findings with evidence, not verdicts. Where I give a remedy, it is a suggestion for the authors to weigh. "Verified" below means I opened the primary and checked it.*

## What I read

- **The draft, whole:** `README.md`, `vsect.md`, `model.md`, `storage.md`, `session-aat.md`, `open.md`.
- **Verisectorium:** RC1 `02-RECORD-OBJECT-MODEL.md`, `06-EDGES.md`, `08-CERTIFICATION-AND-AUDIT.md` and `10-FOUNDING-QUESTIONS.md` whole; the `95-ADDENDUM` in part; `theory/sop/influx/deploy-3-founding-feedback-2026-08-12.md` in the cited parts.
- **aat-refactored:** `scratch/vsect-porcelain-sketch.md` whole; `vsect-hypothetical-cli.md` (the laws and phases); `PROPOSAL-2026-09-29-foundation-and-sops.md` §§ on purpose, closers, adopt-now and the landing rule; the `d60c511` diff to `src/the-loop.md`.
- **spec-lite:** `.vsect/kinds.yaml`; `sop/adr/{per-kind-verification-and-status, no-computed-columns-yet, cross-store-links}.md`; `sop/src/conv-verification-and-status.md` (head); `.int/vsect-requirements-on-lite.md`; `.int/STEWARD-VERBATIM.md` around the "one MUST = one card" exchange; plus a census of the corpus's frontmatter fields.
- **ASF at `4ee2b89`:** `01-aat-core/src/{scope-adaptive-system, post-causal-structure}.md` whole; the cited lines of `def-agent-environment`, `def-action-transition`, `def-observation-function` and `scope-agency`; `spikes/epistemic-target-ontology/00-spike.md` §§1–4; TODO/CHANGELOG/audits entries on the "nominal" finding; a census of tag words across Part I; and the `terminology/decisions/` naming.
- **Elsewhere:**
  - `firmatum/principles/src/norm-three-audiences.md`;
  - limen `vsect.lua` (the resolution header);
  - `relata --help`;
  - vivarium `bin/orient-check` and `ORIENT.md`;
  - the 2026-08-31 verisectorium transcript (`~/.claude.bak.2026-09-23/projects/-Users-josephwecker-v2-src-arch-firmatum-verisectorium/91c680e1-….jsonl`), lines 319–356.

## Summary

The draft does what it was asked to do, and it does a lot of it well. It puts porcelain first, builds the read-only verbs first, and has nothing hand-set. It has decline events, keeps empty, failed and not-run apart, carries an honest provenance table, and warns against reading its sources' agreement as evidence. The real ASF defects in its worked session are real and correctly located (verified; see the end). The problems I found sit underneath that surface. Most are places where the data model doesn't yet deliver what the rules promise. Five of them seem load-bearing to me.

1. **The statement span leaves out the layer where the recorded failures live.** A statement's version covers only the text from its tag to the next tag or heading. Glosses, opening summaries, Epistemic Status and Discussion fall outside every span. So no edit there stales any check. In ASF, the defects the session uses all sit in that untagged prose. So did the estate's distilled failure shape, "a surface claims more than what's under it".
2. **Evidence decays on edits to its own text, but not when what it leans on changes.** RC1 requires decay on "edit, referent change, era bump". Under the draft, a statement whose definitions were redefined keeps its ✓. The worked session's own refutation is an instance of this gap.
3. **The landing rule is weaker than its source, and weaker in exactly the direction that failed.** The source says *"Any rewording, even one judged equivalent, is checked again."* The draft lets a check carry over on the author's say-so. `d60c511` was an author's equivalence judgment.
4. **The version a verifier read is asserted by the brief, not observed.** In the worked session the author edits the file while the verifier reads it.
5. **The second intended corpus, spec-lite, doesn't fit the storage contract.** There is no spec profile. `vsect check` as specified would error on spec-lite's 65 decision records (they carry `status:`). spec-lite also has 134 records with hand-written `consequences:`, YAML fixture records, and bare-slug typed fields, and the draft addresses none of these.

The significant and minor findings follow. The last sections cover what I verified as accurate and the limits of this audit.

---

## Load-bearing findings

### L1. The version unit excludes the glosses, summaries and discussion where ASF's recorded defects actually sit

**What the draft says.** A statement's "span runs from its tag to the next tag or heading" (`model.md:25`), and its version is the hash of that span (`storage.md:86`). The verify brief carries the line *"check that every opening sentence and summary says no more than the formal statement under it"* (`vsect.md:95`).

**What the corpus shows (verified).**

- **Few tags, in the wrong places.** ASF Part I carries few tags per file: 24 files have none, 51 have one and 23 have two. The Ch.1 segments carry one or two each, all on definitions or scope predicates.
- **The session's defects are all in untagged prose:**
  - the exclusion rationale, in `scope-adaptive-system.md:18` (opening gloss) and `:45` (Discussion);
  - "Nominal coupling", in `post-causal-structure.md:37` (a Discussion bullet);
  - the "give more weight to causally-downstream observations" sentence, in `post-causal-structure.md:49` (Discussion);
  - "full-state access … vacuous", in the opening gloss at `def-agent-environment.md:13`, as well as in the formal section.
- **The same pattern in aat-refactored.** Its census found that *"of the eight review findings accepted against `the-loop`, six land on sentences that have no name today"* (`PROPOSAL…:22`).
- **The estate's distilled failure.** The second aat-refactored coordinator's distilled shape is "a surface claims more than what's under it". The specimen notes add that a qualifier "fell off on the way from an account into a body" (`spikes/fresh-view-2026-09-29/specimen/specimen-notes.md:73`).

**Why it matters.** The draft knows summaries are a failure site, which is why the verify-brief line exists. But its data model gives summaries no version and no owner. Say a verifier confirms a statement and someone then sharpens the opening gloss into an overclaim. Nothing stales, `read` still shows ✓, and the landing rule never fires. That is d60c511's shape moved one layer up.

**The exchange the draft cites settles this.** The draft cites Joseph's 2026-08-31 objection (`open.md:7`). The resolution reached two turns later, which Joseph called "excellent … a lot more reasonable" (L341), is that the gloss, formal expression and discussion *share the claim's fate*: "a bad gloss mis-states it, a broken derivation un-supports it … all the parts' troubles land on *its* account" (L332). On that resolution, the gloss is part of the claim's atom. The span rule cuts it away.

**Two questions the sources asked that the draft left unanswered.**

- The porcelain sketch asked: *"Is it fine to require every assertion to sit under a tag or heading?"*
- The proposal named, as a remaining uncertainty, *"whether naming every assertion is worth its cost at scale."*

The draft adopted tags without carrying either question into `open.md`.

**What might strengthen it (suggestions).**

- Give a record's non-statement prose a fate. Either each gloss or summary paragraph *narrates* named statements and has its own version (RC1 06's `narrates`, with freshness reset on referent change), or the record's unspanned prose is hashed into every statement's version (conservative, noisier).
- Either way, run the test `open.md` Q1 proposes (re-mark five ASF Part I segments), and have it count where the segments' existing findings fall relative to the spans.

### L2. Evidence is bound to the statement's own text, not to the meanings it leans on, so redefinitions upstream leave stale ✓ marks

**What the draft says.**

- Rule 5: *"Every check is bound to the version of the statement it read. When the statement's text changes, earlier checks stop counting"* (`vsect.md:13`).
- On redefinition, the redefined statement's checks lapse and *"every statement depending on it is flagged to be re-read"* (`vsect.md:84`). The dependents' own checks are untouched, because their spans didn't change.

**The source the draft carries.** RC1 02, LADDER: *"A certificate at any rung decays with its warrant: edit, referent change, era bump. One that cannot decay is a lie in waiting."* PROJECTION's failure mode is the label-lie: *"a cell … surviving events that invalidated it."*

**The worked session is an instance.**

- The exclusion rationale ("a system with full knowledge … H(Ω|C)=0 … outside AAT's concerns") is false while Ω is the state alone: a tabular RL agent has H=0 and a whole transition law left to learn.
- Under the typed target the session adopts (option 1, S=(Ω,θ)), H(S|C)=0 *does* mean nothing learnable remains. So the sentence's truth turned on a definition it leans on, not on its own words.
- Its storage example declares it `premises: []` (`storage.md:41`), so nothing would propagate to it anyway.

**Why it matters.** This is the case the estate cares most about: Part I's roots are being redefined (SP-30). Under the draft, every dependent of a redefined root keeps showing ✓ beside a ↻-less "flagged to re-read" note.

**Suggestion (a strengthening).** Make a statement's *effective version* a hash over its own span plus the effective versions of its declared premises and definitions, as a Merkle chain. Then "evidence belongs to the text it examined" extends to "and to the meanings it leaned on" with no extra mechanism, and the `reworded`/`redefined` classification decides whether that propagation is waived. The trade-off is real: an upstream edit invalidates more checks. That is the honest price, and the reword/redefine question is where it gets paid down.

### L3. The landing rule is carried in weakened form, and the weakening sits exactly where d60c511 failed

**Source** (`aat-refactored/scratch/PROPOSAL-2026-09-29-foundation-and-sops.md:395`, verified): *"Landing rule: landed text is checked against exactly what was verified. Any rewording, even one judged equivalent, is checked again."*

**The draft.**

- `revise`: *"reworded without change of meaning — earlier checks may carry over, but only if someone says so and why"* (`vsect.md:83`).
- `take`: *"asks whether the change touched what was checked"* (`vsect.md:110`).
- In the session, the author answers `word` and *"its one earlier check … carries over, with your reason"* (`session-aat.md:68–69`).
- `open.md:42` lists the landing rule as **carried**.

**Why it matters.** The `d60c511` failure was an integrator's equivalence judgment. The coordinator's map records that it landed "23 s after the de novo review / 3 min after the verifier", dropped the verifier's qualifier, and relabelled a hypothesis "now exact" (verified in the diff to `src/the-loop.md`). The draft's carry-over asks the same person, at the same moment, the same question that failed. It also keeps author-attested carry-over as evidence, which RC1 08 says certifies "authorship diligence", not the claim.

**Suggestion.** Keep the source's rule and use the draft's own rule 2 (make the honest act cheap). On any rewording, `revise` emits a one-paragraph bare brief for a different mind: *is X equivalent to Y as it bears on criterion C?* The old check stays ↻ until that comes back. Author carry-over can remain recorded as the author's claim, at the lowest rung, never as the check carrying over. If that proves too costly in use, that is a finding to bring to Joseph, not a softening to pre-empt.

### L4. "The version the reporter read" is supplied by the brief, not observed, and the worked session shows the gap

**The draft.**

- `verify` writes a brief naming *"the text and its version"* (`vsect.md:95`).
- `take` attaches each item *"at the version the reporter read"* (`vsect.md:106`).
- In the session the brief says *"as of 4a91d0e (file: segments/agent-environment.md)"*, and *"while the verifier works, the author tightens a sentence in the same statement"* (`session-aat.md:136, 143`).

**The gap.** The verifier opens the live file. It reads whatever is on disk, which may be 77c2f05 or a half-edited state, while the event records 4a91d0e. The landing rule then compares the wrong pair. Evidence bound to the wrong text is exactly what rule 5 exists to prevent.

**Suggestion.** Hand the verifier a snapshot (`vsect read --at <version>`, a `git show` path, or a worktree), not the working file. Have `take` determine the version read by hashing the spans the report quotes, falling back to the brief's claim only when the quotes are absent, and recording which happened.

### L5. The second intended corpus can't be stored, checked or profiled as specified

The README says the design *"must serve both a theory … and a spec"* (`README.md:9`), and §8 builds the read-only verbs first *"over the frontmatter-and-markdown files spec-lite already has"* (`vsect.md:199`). Against the spec-lite corpus (verified census, excluding `.int/` and `.old/`), five things don't fit.

- **`status:` is an error under the draft.** 65 decision records carry `status:` (it is in spec-lite's `kinds.yaml` `requires:` for `decision`). `storage.md:61` says *"No `status:` … field exists. Writing one is a `vsect check` error."*
- **`verification-level` contradicts a ratified decision.** spec-lite's `sop/adr/per-kind-verification-and-status.md` is `decided-by: steward`. It writes `verification-level` and `evidence` into frontmatter by the verifying act. The draft departs from this, and says so (`storage.md:82`, `open.md:14`). But it doesn't say that the convention it departs from is a steward decision with its own reopen conditions. No record in spec-lite carries `verification-level:` yet, so the convention is unexercised. That makes this a good moment to settle it.
- **Hand-written reverse links.** 134 records carry hand-written `consequences:` (reverse links), at Joseph's direction (`.int/STEWARD-VERBATIM.md` ~L726: *"you'll start (hopefully) instinctively using the frontmatter of each card to say which other rulings it depends on … and the inverse"*). The draft never mentions them. Its `impact` verb computes reverse edges, and nothing says what happens when the hand-written ones disagree.
- **YAML records.** Fixtures are records stored as `dat/<slug>.yaml` (`kinds.yaml` `fixture.find`), not as markdown with frontmatter. `storage.md:23` admits only the latter.
- **Bare slugs in typed fields.** spec-lite's typed reference fields allow bare slugs (`fields: {per: decision, …}`; `.int/vsect-requirements-on-lite.md` item 3). The draft says *"a bare slug in a file is never guessed"* (`vsect.md:73`). A declared field type isn't a guess, but the draft should say so, or spec-lite's links become errors.

There is also no spec profile at all. `init --profile theory|spec` names one (`vsect.md:178`), but only the theory profile exists. The decision-carrying rule card ("Isn't a card a decision already?" — Joseph, same file) has no counterpart in the theory profile's kind table.

**Suggestion.** Either narrow the README's claim (theory first, spec later) or add a spec profile drawn from spec-lite's actual `kinds.yaml`. Then resolve the `status:` and `verification-level` conflict as an explicit question for spec-lite's decider. That is the udon team's call, per that store's `decider:`.

---

## Significant findings

### S1. The model renames RC1's RECORD without flagging the departure, and cites the weaker half of Joseph's 2026-08-31 exchange

- **RC1 02's first line** is *"RECORD — one atom of one kind: the unit of adjudication"*, with the invariant *"a record carrying two independently-adjudicable things is two records"*.
- **The draft's model** says *"Record … Not: the unit of adjudication — see statement"* (`model.md:17`).
- **Provenance.** `open.md:35` lists RC1 01–04 as **carried**, with no note that the central term was re-cut.

**What the cited exchange actually concluded (verified, L332–L341).** Joseph agreed to *"An atom is the thing with one fate"*, and that *"file was convention smuggled in as definition."* That resolution supports the draft's design better than the objection it quotes. In the exchange's terms the draft's statement is the atom, and its record is the file that groups atoms. Saying so outright would make the departure from RC1 a vocabulary mapping rather than a silent contradiction. It would also bring L1's consequence with it: the gloss shares the claim's fate.

Joseph's L356 restatement of brick 1 is *"we're not mixing two atom-kinds that should have independent … 'standing'"*. Against that, the theory profile's `segment` kind has no failure mode of its own: its "lifecycle that sets it apart" is that *"statements are adjudicated one by one"* (`model.md:106`). That makes `segment` a container, not a kind under the draft's own admission rule (*"a kind earns its place when it fails differently"*, `model.md:102`). That may be fine, but it should be named. The record level is a view-like grouping, much as RC1 10's "missing sentence 2" puts the topical spine in the outline.

### S2. `init` seeds the kinds the design says must be admitted by evidence

- **The draft applies the deploy-3 lesson to the outline.** It *"writes nothing about AAT … the estate learned at its third founding that a founding agent filling it in turns its own ignorance into the corpus's shape"* (`session-aat.md:18`).
- **But `init` writes the kinds anyway:** *"11 record kinds, 8 statement-kinds, 6 evidence lines — all `proposed`"* (`session-aat.md:10`).
- **Its sources go the other way:**
  - The hypothetical-CLI sketch's phase 0 has *"No kinds"*, and the tool *"never hard-codes today's taxonomy"*.
  - The porcelain sketch let kinds be inferred and admitted on demand.
  - RC1 08's acceptance protocol, item 2, checks *"that a founding agent reaches declarations rather than inheriting them."*
- **Its own acknowledgement.** `open.md:9` notes that the previous taxonomy was "mostly unverified" after eight dropped distinctions, and that this one "has the same standing".

**Why it matters.** "Proposed" is a label. A seeded `kinds.yaml` is what every agent will build on, and the founding is when that leverage is greatest (deploy-3: *"when they accumulate at the very beginning, they rapidly accumulate thereafter"*). The profile is also where the draft is least grounded.

**Suggestion.** Ship the profile as influx material for the founding questions, not as declarations, or ship no profile, as the hypothetical-CLI sketch's phase 0 did. Let the five-segment test in Q1 be the first admission evidence.

### S3. The worked refutation points at a purpose statement as its ground and treats a redefinition as a refutation

The session runs `vsect refute …#exclusion-rationale --by purpose:part-i-aim --because "fully observed MDPs … are excluded"` (`session-aat.md:119`). This cuts against the draft's own rules in two ways.

- **The ground is a purpose statement.** The model says *"in a theory, derivation and evidence carry everything and authority is noise"*, and a purpose statement is *"the one place the steward's authority enters"* (`model.md:84–86`). A refutation's ground should be the counterexample (the tabular-RL agent), which is evidence and reproducible. Here the refutation's record pointer names the steward's purpose.
- **The claim wasn't refuted.** As L2 shows, after the typed-target answer the claim "H=0 ⇒ nothing left to learn" becomes true. What happened was a redefinition of the predicate it leans on, the §3.3 *redefined* path. The draft has no way to say "this was false under the old definitions".

**Also in the example.**

- Option (3), "leave it", is presented as a live steward-purpose option (`session-aat.md:103`). The spike's verified two-horn result (`00-spike.md` §4) makes leaving θ unhoused a no-go for GA-1's well-posedness. So the example routes to the steward a question that evidence already narrows.
- The asker's own [Y/n] is the only check on whether a question "needs the steward" (`vsect.md:134`).

Neither is fatal, but the worked example is where readers will learn what the verbs mean.

### S4. Flags: who writes them, at what grain, and whether they count as "hand-set" are all contradictory

The draft says four things about flags that don't fit together.

- Flags are record-level frontmatter (`storage.md:30–32`).
- *"The act that resolves a flag clears it"* (`model.md:90`).
- *"Frontmatter holds only what the author declares; nothing computed is ever written there"* (`storage.md:23`).
- The dashboard counts *"3 **statements** awaiting a second look"* and claims *"Everything shown is computed; nothing on it can be typed into a file"* (`vsect.md:34, 50`).

If vsect writes the flags, frontmatter is no longer author-only. If authors write them, the dashboard shows hand-typed state, and `awaiting-second: false` is a standing word under rule 4. There is also the grain mismatch: the flags are per record, while the dashboard's count is per statement. And `awaiting-second` overlaps with the computed derivation line (is "awaiting a second look" a flag or the absence of an independent rung?).

**Suggestion.** Decide whether flags are declarations (who moves next, typed by people) or projections. If they are projections, compute them from events and drop them from frontmatter. That would be a departure from spec-lite worth stating.

### S5. A finding can be closed by the author's own edit, deletion or rename without anyone checking the fix

- §3.3: on deletion, *"any finding against it is answered by deletion (recorded)"*.
- The session: *"The finding against it is answered by this rewording (recorded)"*. That happens before the author has even said whether the meaning changed (`session-aat.md:67`).
- The model lists *"answered by a revision"* as a disposal (`model.md:69`).

**Why it matters.**

- **It's a laundering path.** Delete a statement with an open finding and re-add the same content under a new tag, and the finding is closed, and the evidence trail starts fresh. `revise`'s "closely follows" detector watches only influx material (`vsect.md:87`), not a store's own deleted text.
- **It's another integration-moment self-judgment.** The landing rule guards the verified→landed crossing. Nothing guards the finding→fix crossing, which is the same shape.

**Suggestion.** Make "answered by revision" a claim that waits for confirmation. Ideally the finder or an independent reader confirms it, against the finding's criterion. Treat delete-then-re-add of near-identical text as a rename, and carry the findings across.

### S6. Identity and role rest on a self-declared field, since git records Joseph for every commit

- `storage.md:108` puts actor identity in *"whatever git and the harness record"*.
- The aat-refactored proposal notes *"Every commit here carries your git identity, so today the history can't show that the spiker, verifier and integrator were different minds."*
- So the event's `actor: {name: claude-opus-5.5/a7, role: verifier}` (`storage.md:69`) is self-declared.

That matters for three rules:

- *"revised only by the steward"* (the `purpose` kind, `model.md:114`);
- *"decision made under delegated authority … awaiting ratification"*;
- the independence that the derivation line's top rung requires.

**Suggestion.** State this in the trusted-base section as part of the residue. Consider what the harness can actually attest, such as a session id in the trailer, as vivarium's `orient:<session_id>` does.

### S7. ASF itself, the first consumer's main input, has no import story beyond "carried"

`bring` turns ASF segments into `carried:asf-*` records whose standing is *"named here, not checked here"* and which *"never outranks its source"* (`model.md:98`, `vsect.md:151`). Three gaps follow.

- **ASF's own trail stays behind.** ASF holds a great deal of real evidence: certified findings in `FINDINGS.md`, `audits/`, Working Notes, verified spikes. `bring` of `src/` carries none of it as findings or events. The session nonetheless shows vsect knowing that *"Three ASF auditors flagged this sentence"* and citing `carried:asf-spike-epistemic-target-ontology`, which the `bring` shown never brought (`session-aat.md:21, 74, 104`).
- **"Its source's own standing" is undefined for ASF.** ASF's standing words are the hand-set `status:` and `stage:` that the draft treats as untrustworthy (`scope-adaptive-system.md` says `stage: claims-verified` over a known-false rationale).
- **"Carried" names three things:**
  - an evidence line for imported theorems (Lyapunov, Čencov);
  - a record kind;
  - the standing of influx material.

  ASF isn't external literature. It is this theory's predecessor, with its own audit trail. The specimen notes already flag *"Intra-corpus carriage has no named line"* (`specimen-notes.md:73`).

**Suggestion.** Give the predecessor its own crossing path, where `bring` can also place a predecessor's certified findings as findings, with their provenance. Then keep "carried" for the external-theorem line.

### S8. Statement-kind is declared twice, and ASF's tag words encode the standing the draft refuses

- **Declared twice.** The tag in the text (`*[Claim (exclusion-rationale)]*`) and the frontmatter (`as: claim`) both state the kind (`storage.md:39, 55`). `vsect check` reports a tag with no entry, but it doesn't check that the two kind words agree.
- **ASF's tag words are standing words.** By count across Part I (verified):

  | Tag word | Count |
  |---|---|
  | `Derived` | 242 |
  | `Definition` | 87 |
  | `Formulation` | 31 |
  | `Discussion` | 24 |
  | `Hypothesis` | 22 |
  | `Result` | 8 |
  | `Proved` | 2 |

  about thirty distinct words in all. `Derived`, `Hypothesis`, `Result` and `Proved` are exactly the stages the draft says are *"not different kinds of thing"* (`model.md:40`). Carried into the store as tag text, they become typed standing words in the body. That is the thing §7 refuses in frontmatter, and nothing addresses it.
- **The draft's tag examples don't exist in ASF.** `model.md:25` says ASF "already marks" atoms as `*[Claim (persistence-threshold)]*` and `*[Scope (information-loss-boundary)]*`. No `[Claim (` tag exists anywhere in ASF. `persistence-threshold` doesn't occur in Part I. ASF tags that atom `*[Definition (information-loss-boundary)]*` (`def-agent-environment.md:29`). Some tag names also contain spaces (`transition opacity`).

**Suggestion.** Choose one place to declare the statement-kind. Treat the tag word as a statement-kind only, and have `bring` translate ASF's ~30 words into it, as a mapping a person reviews rather than a silent one.

### S9. `premises:` and `depends:` are both used and neither is defined, while the refutation cascade depends on the difference

- **Both fields appear** in `storage.md:36–46`, and `storage.md:59` calls them "links … where known".
- **RC1 06's rule:** *"if B was a **necessary** premise, A is marked known-broken"*, while support strength *"never propagates transitively."*
- **The draft's cascade** marks every *"uses it as support"* dependent **broken** (`vsect.md:120–121`, `session-aat.md:123–124`).
- **No `seeded-by` edge.** The draft also drops RC1's `seeded-by` edge, which is the data the independence rule needs (*"two derivations count as independent only if neither descends from the other"*, `model.md:108`). Independence can't be computed without it.

**Suggestion.** Define `premises:` as the necessary premises, which cascade to *broken*, and `depends:` as other support, which cascades to an undercut. Add `seeded-by`, or say how descent is recorded.

### S10. Undefined: Working Notes, `form:` vs `ceiling:`, "floor", and the record-level version

- **Working Notes are load-bearing but undefined.**
  - `needs-work` points at *"the record's working notes"* (`model.md:90`).
  - `check` looks for *"a flag set with no working note behind it"* (`vsect.md:173`).
  - ASF-style Working Notes are where prior findings live: post-causal-structure's notes hold the certified "nominal" finding. So a "bare" brief that points the verifier at the file (`session-aat.md:135`) hands it the prior findings, against `vsect.md:95`.
  - Findings would also have two homes: prose notes and finding objects.
- **`form:` vs `ceiling:` overlap.** `model.md:57` gives ceiling examples ("exact under named premises" vs "qualitative") that are `form:` values in `storage.md:59`. The storage example declares `form: qualitative, ceiling: exact` (`storage.md:39–40`), which reads as contradictory. RC1 says the ceiling is *"assignable from kind before work"*. The draft makes it a per-statement author declaration. A hand-typed `ceiling: exact` beside a statement is also the word d60c511 kept.
- **"Floor"** is *"the weakest thing a careful skeptic could hold you to"* (`model.md:57`), with no computation given. The standing function is the core of rule 4 ("nothing is hand-set; standing is computed"), and it is unspecified. RC1 02 lists `max/floor/shown-independent-agreement` only as a to-do.
- **Two hash spaces are mixed.** Statement versions are span hashes (`a3f19c`). The session uses commit-shaped ids for both ("as of 4a91d0e" and "at version 4a91d0e → 77c2f05"). `Read-at: segment:agent-environment@77c2f05` and `actor.read: [segment:…@a3f19c]` (`storage.md:69`) use a record-level version that isn't defined.

---

## Minor findings

- **Event file collisions.** Events live at `.vsect/events/<record-slug>/…` (`storage.md:65`). A slug is unique only within a kind, and the draft's own examples have both `def:agent-environment` (`storage.md:28, 36`) and `segment:agent-environment` (`session-aat.md:123, 132`), which would share one directory. Per-second timestamps keyed on actor and verb also collide within one writer's burst, such as a `take` placing several findings on one record. (The ASF `terminology/decisions/` precedent, which I verified, keys by entry, where names are unique.)
- **Declarations with no home.** The ranking rule (`vsect.md:60`), the orientation reading list (`vsect.md:163`), the verify launcher (`vsect.md:97`) and the profiles aren't in `kinds.yaml`'s listed contents (`storage.md:10`) or anywhere else in the layout.
- **md-press as normalizer.** md-press's unwrapping includes probabilistic "unsure" join decisions and changes across builds. The version hash needs a frozen, deterministic normalizer that vsect owns, or tool upgrades will mass-stale evidence.
- **`orient` is weaker than its precedent.** vivarium's gate proves comprehension (a sealed quiz) and ties the pass to the session's compaction generation (verified, `bin/orient-check`, `ORIENT.md`). The draft counts what was opened through `vsect read` and ignores compaction. `open.md:21` admits the count is a floor; the precedent shows a stronger instrument exists.
- **The relata carry is loosened.** relata acts on its own only for *identifier-grade* evidence (`relata --help`). vsect "acts if it is certain" on free-text designators (`vsect.md:73`).
- **Agentic default over-attributed.** "Agentic default for non-TTY output" is attributed to Joseph (`open.md:38`). In the source it is *"Claude's proposal, 2026-10-10 … not decided"* (`norm-three-audiences.md`, "How a tool tells them apart"). The three-audience split itself is his.
- **The example brief primes.** The verify brief in the session lists four systems to test (`session-aat.md:137–139`), taken from the question record, so the author's framing reaches the verifier. That contradicts `vsect.md:95` and the estate's de novo practice. A single "test it against concrete systems clause by clause" line would carry the method without the frame.
- **An invented Joseph quote.** The `--purpose` answer (`session-aat.md:112`) puts invented words in Joseph's mouth in a durable estate document. The README marks the terminal output as invented. Given the misattributed-slogan history, consider marking that line itself as invented, or paraphrasing it.
- **Smaller accuracy slips.**
  - "certified in July" (`session-aat.md:53`): ASF TODO says the finding was *verified* 2026-05-29 and *routed* 2026-07-03.
  - *"the update-gain machinery weights by uncertainty, not by downstreamness"* (`session-aat.md:75`) is stated as fact. The three auditors asked for that to be *checked*.
  - "Brought 175 files" (`session-aat.md:22`): Part I has 174.
- **limen fragments.** limen resolves `#suffix` as a heading, block id or fixture case (`vsect.lua:27`). It won't find `*[Claim (name)]*` statement tags, so "limen keeps working … without changes" (`storage.md:19`) holds for records, not statements.
- **Terms the model doesn't define.** *lift* (`vsect.md:89`), *certified* (`model.md:65`) and *standing* are used without definition. The "eleven nouns" page also leans on about a dozen sub-nouns (line, rung, era, episode, closer, ceiling, form, version, profile, decline, crossing). That's fine, but the promise "work entirely in these terms" (`model.md:3`) needs them on the page.
- **The bare dashboard always exits 1.** Under §6's scheme the bare dashboard exits 1 on any live store, so its exit code carries nothing.
- **Steward vs decider.** "steward" and "decider" are used interchangeably (`vsect for joseph` / `for <decider>`). spec-lite's decider is "udon team's decider (Joseph unless the team declares otherwise)". These may be different people.
- **`commit` refusal.** `commit` refuses while *"a refutation has unmarked dependents"* (`vsect.md:159`), but `refute` marks them all at once. The case the refusal guards (dependents added later by a hand edit?) should be named.
- **No dry run.** `refute` and `revise` act at once and cascade. relata offers `--dry-run`; the write verbs here would benefit from one.
- **Contesting a refutation.** RC1 08 records the steward's view that under-recording is as dishonest as overclaim, and a wrong "broken" is the same kind of label-lie. The draft gives a refutation no channel for being contested, and no independence requirement, while support needs both.

---

## What I verified as accurate

So the authors know what held:

- **The worked session's ASF defects are real and correctly cited:**
  - "nominal" with opposite scope membership (`post-causal-structure.md:37` vs `scope-agency.md:19`), with "query-only coupling" already latent at `:40`;
  - three auditors on the downstream-weighting sentence (742613, 849201, 773921 at `post-causal-structure.md:71`);
  - Kalman knowing θ but not Ω, and tabular RL the reverse;
  - the 2026-07-04 GA-1 verification;
  - the exclusion of standard RL (audit 731548 B-3 / SP-30).
- **d60c511** dropped a verified qualifier and relabelled a hypothesis "now exact" (diff checked).
- **Other sources check out:**
  - spec-lite's three flags, `kinds.yaml` resolution, `stores:` cross-store form, and that `sop/` has its own `.vsect/`;
  - "one MUST = one card";
  - deploy-3's empty-outline lesson and the influx-index "wrong three times in an hour" lesson;
  - the three-audience norm and its JSON-cost occasion;
  - the ASF `terminology/decisions/` per-file naming;
  - the live_docs and episode provenance in RC1 95;
  - Joseph's 2026-08-31 words at L329 (quoted accurately).

## Scope and limits of this audit

- **No independent theory check.** I did not re-derive any AAT mathematics. Where I say a claim's truth turns on a definition (L2, S3), that is from reading the segment and the spike, not a fresh derivation.
- **Partial reading of some sources.** I read RC1's 01, 03, 04, 07, 09 and 11, the template, and most of spec-lite's `sop/` only by title or not at all. Divergences that live there would be missed.
- **Skipped history.** I did not read STEWARD-VERBATIM beyond the cited passage, or Joseph's post-09-21 words, which the coordinator notes say memorata doesn't index.
- **Only one specimen check.** I checked the tag census and the "defects live in untagged prose" pattern against Ch.1 and two segments. A wider sample might change the proportion, though probably not its direction.
- **Read this list as the content.** It is not a clean bill for anything it doesn't mention.

## On the brief and the process

- **The brief worked.** It was two lines, free rein, and a stated boundary, and it gave me no frame to confirm. The draft's own register helped too: honest status, a provenance table, the coherence caution. It made the audit faster, because I could check *carried* claims against their sources one by one. Most of the significant findings came out of that table.
- **One aspectus anomaly.** `ASPECTUS_COLUMNS_HEAT=off` printed *"columns.heat accepted for this release; membership is now [layout]"*. That is a deprecation notice the global CLAUDE.md's de novo invocation will keep hitting. I did not append it to aspectus's `inbox.md`, because that file is outside this directory. Whoever owns it may want to.
- **Staying on the line.** I'm available for follow-ups: to expand any finding, to run the five-segment re-marking test from `open.md` Q1 as a specimen, or to check a revised draft against this list.
