# Reading map — verisectorium (beyond what the coordinator already read), for the AAT v3 rebuild

*Mapper: a subagent of the aat-v3 coordinator, 2026-10-28. This is a map: paths and line spans in priority order, each with what kind of material is there and why it bears on rebuilding AAT from the foundation. It is not a summary and not a whitelist. Anything listed low is still worth opening; the order is the information.*

**Root.** Unless a path is absolute, it is relative to `~/src/arch/firmatum/verisectorium/`. Git history lives in `~/src/arch`. Latest verisectorium commit: `7249770`, 2026-09-21 ("RC1 attempt in udon as doc mgt DSL"). The theory has been quiet for about five weeks.

**Already read whole by the coordinator, so not listed:** README.md, CLAUDE.md, PRACTICA.ud, CHANGELOG.md, theory/sop/ORIENT.md, all of template/, the nine theory segments symlinked into template/sop/src/, and every `.md` in `theory/influx/segments-model-rc1/`.

---

## Read this first: surprises, and where the framing may be off

1. **AAT would not be RC1's first real test.** Three foundings already exist, and each one taught the same lesson.
   - Deployment #3 is `~/src/AISI-responses`, founded 2026-08-12. Its founding agent reported back in `theory/sop/influx/deploy-3-founding-feedback-2026-08-12.md`, listed as item 3 below.
   - udon lite is itself a verisectorium deployment. See `~/src/arch/firmatum/udon/v2/spec-lite-0.1.0/.old/vsect-init/` (contains `proposed-verisectorium.md`, `spec.outline.md`, `DECISIONS.md`) and its `sop/adr/` records: `per-kind-verification-and-status.md`, `no-computed-columns-yet.md`, `our-side-is-example.md`, `sop-own-vsect-and-decisions.md`. Its `adr/TEMPLATE.md:134,152` and `adr/decision-authority.md:26-32` cite RC1 directly.
   - Joseph's verdict on the verisectorium agent's founding skeleton for udon lite is in `spec-lite-0.1.0/adr/spec-organization-delegated.md:40-55` (2026-10-08): *"Please don't feel somehow attached to the 9-section forty-five segment random stuff that the verisectorium agent put in place as an example without knowing anything really about udon. *You* are supposed to become the deep domain expert on this and co-owner, not him."*
   - The shared lesson: whoever founds a deployment should not supply the domain's structure. The outline comes from the domain's owner.
   - This sits in your udon-lite patch. I flag it because it bears directly on the "first real test of RC1" framing.
   - The first attempt also recast itself as "where RC1 gets tested": `~/src/aat-refactored/spikes/fresh-view-2026-09-29/history-and-sourcing.md:51-54`. I only looked at that much.
2. **The only existing RC1-to-udon translation targets a superseded udon draft.** That translation is `theory/influx/segments-model-rc1/lang/rc1-in-udon.ud`, written against udon **0.10.01-draft**, not spec-lite-0.1.0 (lite's last commit is 2026-10-22). Its central move is that status is a `!` generator, so hand-set status has no syntax. Whether lite keeps that machinery is unverified. Lite's own `adr/no-computed-columns-yet.md` hints that it does not yet.
3. **The template predates RC1.** The template was last touched 2026-08-10; RC1 was written 2026-08-14 to 08-31. Your own notes already say this. I confirm it from git.
4. **The steward has a standing ruling on where rigor lives.** From `theory/influx/instrumenta/REGISTER-RULING.md:11`: *"nothing in the estate outside ASF has ASF's epistemology or rigor, however much its labels sound like it."* The ruling was aimed at the udon-needs gather, but the principle cuts here too. RC1 describes itself (`rc1-coord-wanderings-2026-08-14.md:7`) as "one mind, one steward, one day," all `proposed`. Verisectorium can supply structure and vocabulary to AAT. The truth discipline flows from ASF, not the other way round.
5. **RC1's most concrete open defect is ASF's own unanswered status problem.** That defect is the "grain nag" (`rc1-coord-wanderings:16-18`): how a record's headline status is computed from per-clause statuses. It is the same projection-rule gap that `segment-research/asf-implications-2026-08-14.md:23` found in ASF frontmatter: `def-satisfaction-gap` reports its headline claim, `emp-update-gain` reports its floor. A from-the-foundation AAT rebuild will be forced to answer it. Whoever answers it should see both.
6. **Several manifests in the patch can't be trusted for coverage.**
   - `theory/influx/00-INDEX.md` does not list segments-model-rc1, model-2026-08-14, segment-research, evidence/, instrumenta/, steward-brainstorms/, or the rc1 reads.
   - `vera/00-INDEX.md` lists files that are not in `vera/`.
   - The "Notes copy" column in `instances/deployments.md` dangles.
   - Navigate this tree by `aspectus` or `ls`, not by these indexes.
7. **The `asf-sops/` copies have drifted from the live ASF SOPs.** I diffed all 13 against `~/src/arch/asf/doc/sop/`. They differ in content, not just the 8-line banner, in:
   - `format.sop.md` (`md-press --check` is the commit gate since 2026-08-22)
   - `git-hygiene.sop.md`
   - `agents.sop.md` (`_obs/` became `.archive/`; the naming tree was packed)
   - `audit.sop/routing.sop.md` (new 2026-08-22 ruling: audit gold may be mined into `impl-*` Working Notes)
   - `multi-agent.sop.md`, `de-novo.sop.md`, `naming.sop/*`

   Read the live SOPs. The copies are a 2026-08-06 snapshot.
8. **The richest ASF-specific analysis in this patch is quarantined.** That is `asf-implications-2026-08-14.md`. The decision is yours; details at item 1 of the list.

**What I did with the misfire advisory (`.archive/theory-misfire/`).**
- I read its README and the root `.archive/HANDOFF-2026-08-06.md` (both explain the set-aside), and listed its filenames.
- I did not open its OUTLINE, ONTOLOGY, TODO, the 97 `last-adhoc-src/` segments, or `reports/`.
- What's there: a system-layout-first founding of verisectorium. The README's own words are "so wrong with plausible utility". The steward also ruled it not quotable at origin (`theory/influx/evidence/truth-over-proxy/00-MANIFEST.md:13`).
- Two pockets look relevant to AAT, and both are **copies whose originals are live elsewhere**, so you can skip the archive entirely:
  - `.archive/theory-misfire/.archive/asf/` holds 11 gather-era copies of ASF build and format "why" documents. Read the originals in ASF instead (pointers in item 21).
  - `.archive/theory-misfire/.archive/methodology/feedback-math-lives-in-segments.md` copies a memory file. The original is `~/.claude/projects/-Users-josephwecker-v2-src-arch-asf/memory/feedback_math_lives_in_segments.md`.
- My judgment: nothing in the archive needs mining for this refactor.

**Reading accounting, from my tool log.**
- Read whole: everything in Tier 1, nearly all of Tier 2, all of `theory/sop/influx/`, and every `theory/src/` segment beyond the nine except the bodies of `norm-truth-above-self`, `form-experiential-reading`, `claim-clocked-drains`, `claim-decision-surfacing`, `form-steward-valve` and `form-process-map`.
- Read in part (heads, headings, and targeted spans): those six segment bodies; `obs-truth-failure-manifestations` (lines 15-40); the ten external-ontology sweeps (headings, plus `sweep-scientific-maturity-ladders` §4-6 whole); the evidence slices beyond the spans cited; `verisect-and-ldocs` (headings and §0); `terminology-survey` (headings); `relata-methods` (headings); `realization-model-v1` (lines 1-14, 75-128, 150-168); `discussion-thoughts-crossmap` (lines 1-40); `instances/deployments.md` (lines 1-30); the `vera/` ennaos spec (headings); `instrumenta/` (00-MAP, REGISTER-RULING, and method-evidence-tiers lines 1-40); the `net/*.py` headers; `rc1-in-udon.ud` (lines 1-60 and 280-341).
- Not opened: `vera/ennaos-gemini-chat.md`; the other 19 instrumenta bridges and `agentic-ux-principles` beyond headings; tribunal bodies; `TERM.term.ud`; `build-issues-survey` beyond headings; `efflux/phanero-README.md` beyond headings; the `.dot`/`.svg`/`.png` net renders; `specimen.vsl`; most of `vsl.py`.

---

## Tier 1 — open first: where verisectorium meets ASF/AAT directly, plus the founding lessons

1. **`theory/influx/segment-research/asf-implications-2026-08-14.md:1-43`**
   - What it is: whole-reads of 16 vol-1 ASF segments, one per `type:` value, plus type/status/heading censuses.
   - Why open it: the frontmatter fields compress the prose layer lossily. `empirical` appears as both a kind and a ground. The headline-vs-floor projection rule is never declared. Types change on promotion. "Max attainable" lives only as a prose convention. There are 122 unnamed "Incidental audit gold" sub-records. The honest edge: *"the prose-first layer may be load-bearing for truthfulness."*
   - Caution: it carries a premature-synthesis banner ("withhold from any de-novo synthesis pass"). `model-2026-08-14/03-ADVERSARIAL-READ.md:18` (A6) judges its observational half as standing on its own reads. Counts are as of 2026-08-14.
   - Since you are synthesizing, how to handle the banner is your call. Re-verifying a few of its specimens in `~/src/arch/asf/01-aat-core/src/` is cheap.
2. **`theory/influx/segment-research/dive-asf-lineage.md:1-154`**
   - What it is: a specimen-grade anatomy of the ASF corpus as it actually is.
   - Contents: the three vocabularies (19 types, 8 statuses, 8 stages), with FORMAT's admission that stage lint is "currently ignored in practice"; a census of filename prefixes and their drift (`der-` vs `deriv-`); equation-level tags; the Findings sub-schema with its Search Log; the empirica MANIFEST/RUNS pair; `old-*` files frozen in their era's language; the terminology store with decision events; the SOP authority callouts.
   - §M at 129-147 lists 17 places where ASF practice doesn't fit verisectorium's carve. Those are design decisions the rebuild will meet.
3. **`theory/sop/influx/deploy-3-founding-feedback-2026-08-12.md:1-61`**
   - What it is: the only first-person account of founding a deployment by an agent other than the kit's author.
   - Key passages: "the outline is the thing to get right, and the founding agent cannot do it" (14-20); what Joseph cut, and why founding cruft compounds (22-46); a `cp -a` symlink bug that ships nine broken segment links (48-50).
   - This is the most direct precedent for founding aat-v3.
4. **`theory/influx/.archive/NOTE-TO-SUCCESSOR-2026-08-14.md:13-41`** and **`theory/influx/.archive/05-CONCLUDING-2026-08-14.md:14-25`**
   - What they are: a coordinator's account of gelling a model after reading about 7 of 40+ primaries, and later principles "docking into my premature frame as a diff". Joseph's insert (19-24) says the verisectorium syntheses "might have lost touch with the actual segments' and their needs in arch".
   - Why open them: this is your situation, written by someone who failed at it. The concluding file's second lesson is that assembly under-weights non-assertion kinds. That bias lands squarely on AAT's discussion/intro/impl segments.
5. **`theory/influx/model-2026-08-14/06-COUPLING-LOCK-AND-RECORDING.md`**
   - 5-22: the commitment law answers "is the math↔sim check-in loop unprincipled?" Its criteria: commit to a criterion before contact; nail divergences to root rather than tuning them away; a fresh committed re-run is what certifies. AAT's math ↔ vivarium-sim relationship sits exactly here.
   - 45-54: how securing work lands on disk (body / per-line sidecars / generated ledger).
   - 77-87: the forbidden inference edges.
6. **`theory/influx/model-2026-08-14/net/NOTES.md:28-36`**, with **`net/RUN-LOG.txt:1-31`** and **`net/RUN-LOG-decision.txt:1-30`**
   - What they are: the derivation line's ladder (sketch → drafted → deps-verified → re-derived; refutation lands a no-go as a result; ceiling "exact under named premises; conditional if any premise is empirical"), next to the in-vivo, testimony, transmission and analogy lines. Plus the decision line (grounds / consult / authority, with the reopen-brief).
   - Why open them: this is the closest thing in the corpus to a status model drawn for a mathematical theory with simulation support.
7. **`theory/influx/rc1-denovo-read-2026-08-14.md:1-58`** and **`theory/influx/rc1-grok-read-2026-08-14.md:80-172`**
   - What they are: two unprimed stranger reads of RC1 from different model families.
   - What converged: honest under-recording; an unstated trust floor; "one fully worked example record" as the missing artifact; a density that defeats a founding reader; "the constraints are the product; the taxonomy is the packaging."
   - Why open them: if AAT becomes a deployment of RC1, these are the predicted failure points.
8. **`theory/influx/rc1-coord-wanderings-2026-08-14.md:5-38`**
   - What it is: RC1's author on its own foundation, the hypotheses H1-H4, the grain-projection nag (16-18; see surprise 5), and the refinement order (28-34).
   - Line 38: "the model got *smaller* every time it got truer."
9. **`theory/influx/rc1-working-praxes.md:1-14`**
   - What it is: the working stance RC1 was written under. It includes Joseph's "20 lines of pure truth" (5) and the bare-de-novo-brief as "the literal seed and genesis of the epistemic honesty in ASF" (14).
10. **`theory/influx/segments-model-rc1/lang/rc1-in-udon.ud:1-24, 197-209, 290-341`**
    - What it is: RC1's object model typed as udon chunks. Lines 202-206 give the record-cluster layout (body / trail / notes with different write semantics). Lines 294-302 list nine lints; 304-336 list eight strains.
    - Read it against spec-lite, not 0.10.01 (surprise 2). `lang/README.md:1-10` frames what the spike is and isn't.
11. **`theory/influx/outline-review-2026-08-14.md:14-18, 26`**
    - What it is: the catch where the demoted "promise" frame re-entered through a fresh mind. Line 26 has the meta-note that consolidation's native failure is smoothing real disagreement between generations.
    - Why open it: AAT v3 is the third generation consolidating the earlier ones.

## Tier 2 — the epistemology model, its evidence, and ASF-sourced specimens

12. **`theory/influx/model-2026-08-14/01-MODEL.md:7-16, 38-51, 76-89`**
    - 7-16: the three commitments underneath (kind gates vocabulary; status is a projection of events; kinds individuate by failure and repair).
    - 38-51: the nine derivation questions, Q0-Q8. Grok noted RC1 cites these but doesn't restate them.
    - 76-89: the composites closure rule (reify / view-ify / cluster / exempt) and the "undeclared mixed composite" pathology. This bears on derivation appendices and on multi-claim segments.
13. **`theory/influx/model-2026-08-14/02-GROUNDING.md:24-49`** — divergences, the steward's forks F1-F5, and the amendment log. The record of what the steward's probes changed.
14. **`theory/influx/model-2026-08-14/03-ADVERSARIAL-READ.md:1-29`** — what the quarantined four files would have changed (A1-A6).
15. **`theory/influx/model-2026-08-14/steward-failure-modes-2026-08-14.verbatim.md:9-50, 54-98`**
    - What it is: Joseph's own list of how key claims and segments fail, verbatim.
    - 9-50 covers evidence and self-containment failures: "Missing calibration on downstream references…", "Incorrect scoping of a prerequisite/dependency (common)", and the four-way fan-out of truth lines (theoretical / empirical / testimonial / in-vivo).
    - 54-98 covers Backing: how agents misuse ruled decisions, "backwards compatibility with a ruling nobody deploys", ownership abdicated upward.
    - These are first-hand criteria for what an AAT segment must not do.
16. **`theory/influx/model-2026-08-14/net/steward-truthification-sketch-2026-08-14.verbatim.md:7-79`** — Joseph's cycle sketch and his directive "make it principled, not just translate it" (44-48).
17. **`theory/influx/segment-research/external-ontologies/sweep-scientific-maturity-ladders.md:87-138`**
    - What it is: mathematical statement-kinds as role labels, with kind independent of certainty and "conjecture" as the only epistemic word. Then proof-assistant trust: a binary kernel check plus an enumerated, propagated set of `sorry`/axiom dependencies, never a graded confidence. Then Lakatos's hard core versus protective belt.
    - Why open it: the most AAT-native external material in the patch. It is recalled-grade, not re-fetched.
18. **`theory/influx/segment-research/external-ontologies/REASSEMBLED-MODEL.md:9-41, 61-66`** — eight cross-field laws, five state tracks plus typed edges, and the gaps where the survey found nothing (State plus ceiling plus evidence-action is "invention until GSN follow-up"). The footnotes from line 80 on carry verification grades.
19. **Evidence slices with ASF/AAT worked instances** (all under `theory/influx/evidence/truth-over-proxy/`; each is a locator into live ASF files):
    - `lagging-index.md:7-31` — NOTATION.md as a lagging index; the ρ² additive decomposition.
    - `re-derivation-settles.md:7-143` — the 2026-05-17 founding conversation; `def-satisfaction-gap` and continuity-persistence re-derived.
    - `convergence-not-corroboration.md:131-152, 229-256` — convergence measures reachability; Model-S, a confident consensus disconfirmed.
    - `label-lies-about-status.md:102-153` — ASF audit status mismatches.
20. **`theory/src/claim-truth-over-proxy.md:15-56, 57-86`** and **`theory/src/claim-strengthen-first.md:15-47, 49-67`**
    - What they are: the theory-level restatements of ASF's spikes and routing SOP discipline.
    - Why open them: their footnotes index exact ASF SOP sections (§0, §0c, §2a, §3-§6, §8) and include the convergence tension Joseph left open (`claim-truth-over-proxy.md:83`). They are a fast index into the SOPs you will read at origin.
21. **`theory/influx/synthesis/asf-build-illuminated-model-2026-08-05.md:9-35`**
    - What it is: ASF's own build-era "why" documents (outlines are cheap; presentation-neutral substrate; one result per file; WN as an overloaded queue).
    - Its local-copy column is dead. Live originals:
      - `~/src/arch/asf/PROPOSALS.md:403-430` (§H items 4-5)
      - `~/src/arch/asf/msc/markdown-first-pipeline.md`
      - `~/src/arch/asf/msc/build-markdown-design.md`
      - `~/src/arch/asf/FORMAT-TODO.md`
      - `~/src/arch/asf/msc/meta-process-review-2026-07-07/01-theory-content-lifecycle-findings.md`
22. **`theory/influx/segment-research-notes-2026-08-09.md:15-79`** — locators and verbatim anchors into ASF's spikes, routing and de-novo SOPs, PROCESS-MAP and decision-routing findings. Useful as a reading guide before opening those at origin.
23. **`theory/influx/synthesis/live-state-field-reports-2026-08-05.md:12-59, 60-98`**
    - What it is: measured health of 01-aat-core and 02-tst-core as of 08-05: promotion history, `def-chronica` at 63% Working Notes, 02-tst half-migrated across three identity regimes, 03/04 dangling rows, and "what rots is not what the design conversation worried about."
    - Dated; re-check against today.
24. **`theory/influx/segment-research/dive-udon-trees.md:86-183, 186-213`** — udon-theory FORMAT's two-field epistemics ("`verified` is a stage, not a strength"; assignment-warrant), the udon-needs three-axis frontmatter in place, and verisectorium's own `form`/`type-expected` split.
25. **`theory/influx/instrumenta/REGISTER-RULING.md:1-20`** — same-author convergence is coherence, not corroboration, plus the "outside ASF" ruling quoted in surprise 4.
26. **`theory/sop/influx/tracking-register-2026-08-10.md:1-15`**, **`glance-vs-extract-2026-08-10.md:1-20`**, **`drafting-method-feedback-2026-08-09.md:1-30`**, **`survey-census-and-law-filter-2026-08-10.md:1-7`**
    - What they are: process scars from founding this corpus. Imperative register in tracking files turns intent into phantom law. Survey fan-outs are maps, not synthesis inputs. Thinking stops at composition. A kind survey without counts misled the taxonomy.
27. **`theory/OUTLINE.md:233-244`** (Working Notes: conventions set by example, slug-prefix lineage from ASF's role-prefix rule, epistemology "deliberately open", known tensions), then **`:14-27, 60-72, 181-229`** (Foundations, Organ III, Part IV deployment components). This is the canon view the template's segments come from.
28. **`theory/influx/segment-research/sketch-2026-03-epistemic-foundation-scale.jpeg`** — Joseph's March sketch, a steward primary. The scale runs axiomatic, mathematically grounded, constitutive, empirical, well-modeled, analogy, informed hypothetical, then branches to speculative, random, cargo cult. Below it: "conscious → habitual → reflexive → instinctive."

## Tier 3 — the taxonomy arc, theory segments, and adjacent design work

29. `theory/influx/segment-research/synthesis-v0-2026-08-10.md:9-60` — kind census and 18 candidate axes. §3 at 46-48 is the historical spine of why ASF's `type:` mixes three families.
30. `theory/influx/segment-research/TAXONOMY-FILL-v1.md:19-41, 115-131` — the family table (Exposition restored: discussion is ASF vol-1's most common type) and Working Notes WN-1 to WN-13. Then `pre-taxonomy-synthesis.md:13-34` (the retracted iff-law, the kind-declaration schema) and `epistemic-map.md:5-68`.
31. `theory/src/form-standing-verification.md:11-30` (pre-drafted). Dependency re-pricing when a premise is *weakened* "has no machinery anywhere". That is the open problem an AAT dependency DAG will hit. Pair with RC1 06-EDGES (rebut vs undercut).
32. `theory/src/obs-truth-failure-manifestations.md:15-56` — catalog of steward-attested failure shapes ("generate-mode at delivery", "signposted holes read as coverage").
33. `theory/src/post-total-turnover.md:15-52`, `post-living-collection.md:15-42`, `claim-comprehension-economics.md:15-56`, `def-verisectorium.md:11-51` — foundations. They cite TST segments at source tier; `post-total-turnover.md:51` points at `scope-developer-agent`.
34. Remaining drafted segments in `theory/src/`: `norm-truth-above-self.md`, `form-experiential-reading.md`, `claim-decision-surfacing.md`, `form-steward-valve.md`, `claim-clocked-drains.md`, `form-process-map.md`. Then the pre-drafted stubs: `form-decision-records`, `form-front-door`, `form-generated-views` (the NOTATION-should-be-generated remedy), `form-pedagogical-ordering`, `form-addressing`, `form-chronica-substrate`, `claim-absence-vs-conflict`, `claim-session-cycle-fit`, `disc-ladder-reconciliation`, `disc-epistemic-merge`.
35. `theory/influx/steward-brainstorms/realization-model-v1.md:75-128` — the store triplet. The "base material" influx is how a prior corpus (here ASF) enters a new instance; then doctrina / praxes / professio.
36. `theory/influx/steward-brainstorms/discussion-thoughts-crossmap-2026-08-06.md:12-41` — especially O17/O18 ("the cheapest time for principled invasive change is before consumers/corpora/imitation accrue") and O4 (rename as an expand-contract window).
37. `theory/influx/evidence/experiential-reading-primaries.md:10-30` — Joseph on AAT itself (agent knowledge vs substrate-reflexive information) and causal masking as the order verifier.
38. `theory/influx/segment-research/dive-papers-and-roots.md:13-71, 101-137` — per-clause status, max and decider in vivarium; residue as negative canon; the root-file census.
39. `theory/influx/terminology-survey.md:373-453` (the ASF terminology store's schema and decision events), then `690-850` (higher-level lexicon concerns). Relevant if AAT v3's vocabulary layer is rebuilt.
40. `theory/influx/verisect-and-ldocs.md:7-12, 75-101, 132-198, 223-232` — an independent system (Samuel Wecker's live_docs) that converged on the same object model, its production failure catalog, and the steward's demand statement for tooling (7.7b, 190-197).
41. `theory/influx/synthesis/relata-methods-for-verisectorium-2026-08-05.md:50-216` — the shipped evidence ledger (log-odds, priors separate from likelihoods, soft refutation, the independence rule). Read if AAT v3 wants computed status.
42. Quarantined premature syntheses. Read them as testimony, after your own model exists:
    - `segment-research/distilled-model-2026-08-14.md` (162 lines)
    - `securing-contract-2026-08-14.md` (118)
    - `foundation-axis-2026-08-14.md` (42)
43. `theory/influx/segment-research/dive-comproprium-kin.md:1-112`, `vera-read-notes-2026-08-10.md:1-29`, `glimpse-2026-08-10.md:1-30`, `TAXONOMY-DRAFT.md:1-68`, `2025-11-17-sensibility-to-truth.md` (291 lines; a 2025 autopax ancestor of the ladder idea).
44. `theory/influx/model-2026-08-14/04-EXERCISE-AUDIT.md:5-13, 83-94` — the cited-vs-exercised test for prior art ("an external cite on a carried-whole element must either be a graded corroboration claim or be cut"). Relevant to AAT's prior-art and Findings machinery.

## Tier 4 — lower relevance to the AAT core; listed so nothing is silently dropped

45. `theory/influx/asf-sops/` (13 files, about 3,000 lines). Stale copies; read `~/src/arch/asf/doc/sop/` live instead (surprise 7).
46. Remaining evidence slices: `truth-above-all.md`, `truth-above-self-deep.md`, `plausibility-vs-verification.md`, `honest-incompleteness.md`, `verified-against-artifact.md`, `proxies-for-truth.md`, `proxy-discipline-phrase.md`, `verification-regress.md`. These are the lineage of the disposition.
47. The other nine external-ontology sweeps (`segment-research/external-ontologies/sweep-*.md`). `formal-epistemology-argumentation` (Pollock, Dung) and `knowledge-org-design-rationale` (SKOS, ADR, FRBR) are the most likely to matter.
48. `theory/influx/segments-model-rc1/lang/vsl.py` (275 lines), `specimen.vsl` (134), `demo-*.vsl`, `RUN-LOG.txt` (58). The executable spike behind RC1 09.
49. `theory/influx/model-2026-08-14/net/truthification-net.py` (478), `decision-line.py` (262), the `.dot`/`.svg`/`.png` files, and `currency-coupling.*`.
50. `theory/influx/instrumenta/` — the tooling-theory gather: bridges, `agentic-ux-principles.md`, `tooling-needs-OUTLINE.md`. `bridges/method-evidence-tiers.md` (168) is the trio's three-axis system, already adopted upstream. `bridges/tools-are-observation-infrastructure.md` applies AAT's κ×A ideas to tools.
51. `theory/influx/instances/` (deployments.md, synthesis-missed-instances, vivarium-orientation-gate), `synthesis/scatter-inventory-2026-08-05.md`, `build/build-issues-survey-2026-08-05.md`, `efflux/phanero-README.md`.
52. `theory/influx/vera/` (ennaos VERA spec, 1,257 lines; Gemini chat, 711), `tribunal/`, `TERM.term.ud`, `.integrated/*`, `theory/influx/.archive/reflections-coord-2026-08-10.md`.

---

## Feedback on the brief

The brief was clear, and the "no don't-read lists" framing helped. I ranked by AAT-relevance rather than by importance to verisectorium. Most of the large influx bulk (VERA, tribunal, instrumenta, tooling) is verisectorium building itself, and it sits low here for that reason only.

The one thing I'd add for a successor: the most decision-relevant material for "make AAT the first test of RC1" sits just outside this patch, in udon lite's own vsect-init and ADRs and in aat-refactored's fresh-view spike (surprise 1). Whoever maps those may want to know verisectorium has three prior foundings to compare against.
