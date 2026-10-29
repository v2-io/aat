# Map — ASF process, tracking and history layers (for the AAT v3 foundation rebuild)

*Finder's map, written 2026-10-28 (~20:05 MDT) by an Opus 5.5 instance for the v3 coordinator and any successor. It is a reading order, not a digest and not a whitelist: everything listed is worth opening; the order is the information. Paths are relative to `~/src/arch/asf/` unless absolute. "Read whole" / "skimmed" marks how much of each item I actually looked at before ranking it, so you know where my ranking is weakest. Nothing in ASF was edited.*

*Patch covered: repo-root files, `doc/` beyond the SOPs (plus the two unread naming SOPs), `msc/` (all), `terminology/`, `bin/`, `empirica/`, `releases/`, `.archive/`, and ASF project memory at `~/.claude/projects/-Users-josephwecker-v2-src-arch-asf/memory/`. Not covered (other finders): `01–04-*/`, `audits/`, `spikes/`. I point into those only where something in my patch leans on them.*

---

## Read this first: what surprised me, and where I think the framing could shift

1. **ASF already wrote a diagnosis of its own process machinery, and a decision package based on it.** `msc/meta-process-review-2026-07-07/` (ten parallel cluster maps, a decisions census, and a process map) plus `msc/decision-briefs-2026-07-15.md` amount to an autopsy of exactly the machinery v3 is choosing whether to inherit. In one sentence, from `PROCESS-MAP-v0.udon:460-474`: these are *"un-clocked queues driven by a single human clock"*. Joseph's own fix shape follows: give each process a trigger, build healing into the steady state, and reduce the human-clocked part to real theory decisions that arrive as briefs. The process map is **written in udon**, so it is also an early specimen of udon used for process records. If v3's "SOPs as atoms" idea has a nearest ancestor in ASF, this directory is it. I put it near the top for that reason.

2. **The ASF memory layer contradicts itself about `status:`, and ASF's own history settles which side is right.** `feedback_stage_gating_known_problematic.md` says `status:` is "the live, maintained truth-tracking dimension". But `CHANGELOG.md:201-214` (the 2026-07-14 health scan) records seven independent status rulings that moved labels in **both** directions: stale understatements as well as overstatements. And `CHANGELOG.md:215-231` records a false "iff" in Prop A.1 that prior auditors had certified, plus a quantity that was silently redefined in a 2026-05-18 recheck while its old gloss stayed in place. Both entries are first-hand evidence for the aat-refactored census finding that hand-kept labels drift. The memory file is the stale party.

3. **A second memory contradiction is still unresolved: where pedagogical "gold" goes.**
   - `project_pedagogy_reflection_gold_mechanism.md` says gold goes to a pedagogy pipeline with Joseph as the reader-test, and explicitly **not** into Working Notes.
   - `project_audit_gold_lifted_is_integrated.md` and `feedback_impl_intro_first_pass_failure_modes_and_md_press.md` (both 2026-08-22) send it into `impl-*` Working Notes.
   - `decision-briefs-2026-07-15.md:43-48` (brief A1) names this as "the one genuinely open design point".

   v3 will need a home for its teaching layer, so this is a live design question you inherit.

4. **ASF already has a working "records plus append-only decision events" system: `terminology/`.** It has per-entry markdown+YAML files, decisions stored as `<slug>/<ts>-<decider>-<action>.md`, an atomic `safe_write`, and a generated `LEXICON.md`. The design rationale is in `terminology/README.md:17-135`. It is the closest in-repo engineering precedent for the RC1-style "events, with projections computed" architecture. `LEXICON.md:157-308` is also the canonical list of ASF's record-kind vocabulary: status values, the "three rings", claim postures, search-depth tiers, stages and gates, section kinds, and the 19 segment types. That is the input to the vocabulary-conservation pass the aat-refactored proposal says a redo needs.

5. **The roots of the epistemic-label system are in `.archive/`, not in FORMAT.**
   - `.archive/PLANS.md:1-60`: "TST cadence + TFT epistemic system as the combined standard".
   - `.archive/old-tf-00-notation-conventions.md:5-16` (equation-tag semantics) and `:249-271` (the claim registry).
   - `.archive/00-founding-notes.md` (ACT genesis: the goal/intent gap, Seneca's port).

   For a rebuild from the foundation, these show what the labels were originally for, before they became `status:`. Outside my patch, Joseph's own from-scratch TFT teaching file is at `~/src/arch/proprium/INGEST/old-firmatum/lessons.md` (534 lines; byte-identical copy at `~/src/.moved/old-firmatum/lessons.md`). `msc/reflections/06-the-lessons-file-and-teaching-as-love.md` calls it the theory taught at its best.

6. **On the framing of my patch.** "Process, tracking, history" includes two kinds of material that bear on v3 very differently:
   - the **diagnoses and decisions about the machinery** (meta-process review, decision briefs, SOP-consolidation design, INTEGRATION-CLEANUP's ratified canon-boundary principle, CHANGELOG's process-scar entries);
   - the **open theory queues** (most of `TODO.md` and `PROPOSALS.md`).

   I ranked the first kind higher. The queues matter mainly as "known defects and open forks a rebuild should not re-inherit silently". The exception is the root-ontology fork SP-30, which ranks high because a v3 foundation sits directly on it.

7. **A priming note, offered as a choice rather than a "don't".** If you want an unprimed first read of the theory itself (the de-novo SOP's reason for its avoid-list), read the segments before CHANGELOG, `TODO.md`, `PROPOSALS.md`, `FINDINGS.md` and `HISTORICAL-CONTEXT.md`. If not, ignore this.

8. **Smaller things I tripped over:**
   - **ASF memory carries stale paths.** `project_aat_reboot.md` still points at `~/src/aat-reboot/`, and several memory files name `~/src/archema-io/…`. Resolve them to `~/src/aat-refactored/` and `~/src/arch/…`.
   - **`.archive/math-core.md` predates SP-24.** It still says "an agent is an entity satisfying three conditions". The current single-file assembly of Vol 1 is `CURRENT-VOL1.md` (2026-08-22, about 10.4K lines, Working Notes stripped).
   - **The core is not self-contained.** Meta-process cluster 10 measured Vol 1 reaching down into Vols 2–4 (42 references into 03, including a load-bearing appendix with "client" segments in Vol 3). That matters if v3 is meant to be a self-contained core.

---

## Tier 1 — the machinery's own autopsy, and the decisions it produced

1. `msc/meta-process-review-2026-07-07/00-INDEX.md:1-32` *(read whole)*. Charter and method of the 2026-07-07 review: ten clusters, each mapped through de-facto, aspirational, emergent, stale and blocked-on-Joseph lenses. It is the frame for everything below in this tier.
2. `msc/meta-process-review-2026-07-07/PROCESS-MAP-v0.udon:1-80, 440-489` *(read those spans; 81-439 not yet)*. A MECE-ish process map in udon, with health and drain tags, the core-loop diagram, the one-sentence diagnosis, Joseph's fix shape, and the open unknowns. It doubles as a udon-for-process specimen. Lines 81-439 (generation, verification, integration, coherence, pedagogy, release, governance, cross-project) are the full carve.
3. `msc/meta-process-review-2026-07-07/01-theory-content-lifecycle-findings.md:1-73` and `-reflection.md:1-19` *(read whole)*. Measured with statistics: the promotion ladder never produced a `format-clean` or `candidate` segment, so Gate 4 (the designed drain for Working Notes) never fired. About 67% of AAT's Working-Notes words are parked audit gold. Working Notes quietly became a decision queue. Read it before designing v3's lifecycle.
4. `msc/meta-process-review-2026-07-07/DECISIONS-CENSUS.md:1-75` *(skimmed)*. The consolidated "what is actually Joseph's" census. Its meta-finding: the infrastructure is good, and nearly every stall is a decision that never reached Joseph in a form he could act on.
5. `msc/meta-process-review-2026-07-07/0[2-9]-*-reflection.md` and `10-*-reflection.md` *(read all; about 20 lines each)*. Each cluster's before/after. The ones that bear most on v3:
   - 02: the routing SOPs are excellent, but their terminal stage is gated on one human.
   - 03: the naming system has decision recording and execution but no surfacing.
   - 04: CLAUDE.md as an amplifier; staleness tracks distance from the hot path.
   - 07: the decision-brief artifact is the mechanism, and SP-30's package is a working example.
   - 09: the de-novo "agentic reading" method is the project's own most important tool, and it runs with no tooling.
6. `msc/meta-process-review-2026-07-07/07-decision-routing-and-joseph-blockers-findings.md:96-155` *(headers only)*. The mechanism-design sketch for routing decisions to Joseph, and candidate process definitions.
7. `msc/meta-process-review-2026-07-07/02-audit-and-spike-lifecycle-findings.md:1-130` and `04-governing-doc-memory-sop-integrity-findings.md:1-106` *(headers only)*. The detailed findings behind reflections 02 and 04. Open these when you design v3's audit/spike lifecycle and its auto-loaded layer.
8. `msc/decision-briefs-2026-07-15.md:1-214` *(read 1-112; headers for the rest)*. "The valve": every open decision that is genuinely Joseph's, as one-sitting briefs.
   - Policy calls, `:41-96`:
     - A1: the gold-dir policy, including the open pedagogy-vs-Working-Notes point.
     - A4: what replaces stage-gating, and what drains Working Notes.
     - A6: CLAUDE.md as an unreviewed amplifier, and generating whatever is derivable.
   - Root ontology, `:99-112`: SP-30, the typed epistemic target $S_t=(\Omega_t,\theta)$. A v3 foundation sits on this.
   - Theory and naming briefs, `:113-200`: separability-ladder rung names, agent-spectrum quadrant names, Greek cycle vocabulary, LEXICON Continuity→Persistence.
9. `CHANGELOG.md:201-214` *(read whole)*. The 2026-07-14 health scan:
   - seven independent tier adjudications in both directions (the evidence for surprise #2);
   - Joseph's recorded stage-gating position;
   - the cadence exemption for intro and `disc-*` segments;
   - the tools that clear their own staleness (`bin/refresh-all --check`, the lint-outline whitelist).
10. `CHANGELOG.md:215-231` *(read whole)*. Audit 731548 routing:
    - B-1: Prop A.1's "iff" was never proven, was certified "flawless" by prior auditors, and was split into sufficiency plus Lemma A.1N, with a blind second verifier.
    - B-2: the ρ⋆ boundary had been silently redefined in a recheck spike, a regression.
    - Takeaway: the defect classes v3's record system has to make visible are quantifier-register drift and silent redefinition.
11. `INTEGRATION-CLEANUP-TODO.md:5-24` *(read whole)*. **The ratified canon-boundary principle** (D-1, Joseph 2026-05-30):
    - spike etymology;
    - the binary canon/Working-Notes boundary;
    - canon may cite only canon and the published world;
    - a canon→artifact reference is by definition an integration failure;
    - simulations are spike-class.

    It is the one hard boundary rule ASF ratified explicitly. `:25-86` holds the open remainders: Working-Notes drain, F6/G5 (CLAUDE.md as amplifier), and the "notes for the next agent".
12. `msc/sop-consolidation-design-2026-06-01.md:8-120` *(read 1-120)*. The **disposition-vs-procedure cut**: disposition stays auto-loaded because a file you must remember to open cannot fire a reflex, while procedure goes to SOPs. Also defer-don't-fork, the six-cluster inventory, and the migration map. It is superseded for planning but remains the clearest statement of how ASF decided what an SOP is. `sop-shift-completion-plan-2026-06-02.md:1-46` and `wn-discipline-coherence-pass-2026-05-31.md:1-56` record how it actually landed (both skimmed).
13. `PROPOSALS.md:389-401` *(read whole)*. **SP-30**: the totality reading of Ω, reshaped into the typed epistemic target. It covers the four-quadrant check, the side-effect audit across `#def-action-transition` and `#def-observation-function`, and the verified GA-1 two-horn no-go. The decision package itself is in `spikes/epistemic-target-ontology/` (spikes finder's patch), and `doc/vivarium.md:13-15` maps it onto vivarium's authored worlds.

## Tier 2 — the record-kind vocabulary and its origins (inputs to v3's kinds, labels and events)

14. `LEXICON.md:157-308` *(read whole)*. ASF's canonical vocabulary for its own records:
    - epistemic status values and the three rings;
    - the Findings schema, claim postures and search-depth tiers;
    - stages and gates;
    - section kinds;
    - the 19 segment types in three groups, plus the named worked examples.

    It is generated from `terminology/entries/*.md`, which carry `do_not_confuse` and `see_also` fields (sample: `terminology/entries/exact.md`).
15. `terminology/README.md:1-210` *(headers plus 1-20 and the schema region)*. Design of the multi-agent-safe store:
    - why it uses per-entry files rather than sqlite (`:29-46`);
    - the atomicity contract (`:47-59`);
    - the entry schema (`:60-99`);
    - append-only decision events (`:100-134`);
    - what is not yet built (`:205-210`; NOTATION is not yet generated from it).

    Read it as the in-repo precedent for event-sourced records. The `terminology/decisions/` tree (149 dirs) is the live data.
16. `.archive/old-tf-00-notation-conventions.md:5-16, 172-185, 249-271` *(headers plus grep)*. TFT's original **equation-tag semantics**, global assumptions and **claim registry**, "every substantive claim classified by epistemic strength". This is the ancestor of `status:` and of the equation tags.
17. `.archive/PLANS.md:1-60` *(read)*. Why ASF chose numbered claim segments over chapter documents, "TST cadence + TFT epistemic system", and the original five-section map. It is the moment the segment architecture was adopted, with its reasons.
18. `.archive/00-founding-notes.md:1-154` *(read 1-60)*. The ACT genesis: TFT lacked goal/intent as a first-class object. It covers the three mismatch signals and Seneca's port. It is the original statement of what the theory was meant to add.
19. `NOTATION.md:10-29, 252-263` *(read)*. NOTATION's self-declared drift caveat ("a lagging index, not the arbiter"; the ρ worked instance), and the **Global Assumptions registry** (GA-1…GA-5). Cross-cutting assumptions are a record kind v3 will need. `:204-251` holds the conventions (the accumulation typing adopted 2026-05-19) and the units.
20. `msc/nogo-structure-read-2026-07-29.md:1-251` *(read 1-30 plus headers)*. A de novo structural read of all of AAT's impossibility results. Its findings:
    - "the framework's discriminating criteria are better developed than its positive taxonomy";
    - a missing **claim-type** (escape-set exhaustion, the "exactly k channels" results);
    - self-silencing floors;
    - look-alikes that are miscatalogued;
    - epistemic-label observations (`:193-210`).

    Bears directly on v3's claim-kind taxonomy. Its companion is `msc/nogo-unification-archaeology-2026-07-29.md:1-261`, which records prior re-carvings with dates and verdicts so they are not re-walked.
21. `PROPOSALS.md:81-91, 403-442` *(read whole)*.
    - B.3 (C-BP1 + C-BP4): "epistemic separation framework + claim-level statuses". It is ASF's own never-executed proposal for statuses at the level of individual claims, with layer names "defined / causally valid / operationally extractable".
    - §H.4-5: "outlines are cheap; segments are expensive", outlines as views, and filtering layers within segments. This anticipates computed projections.
22. `TODO.md:255-270` *(read)*. Two foundational hygiene items:
    - "nominal" means opposite scope membership in `#scope-agency` versus `#post-causal-structure`;
    - **`depends:` conflates logical prerequisite with forward reference**, with a confirmed two-cycle. That is a record-relation distinction v3 should make explicit.

    `TODO.md:514-526` *(read)* holds the 731548 residuals:
    - the Gate-2 addition "instantiate a concrete system against each membership/exclusion clause";
    - the legacy quantifier sweep, aimed at TFT-inherited language;
    - the floor-routing diagnostic segment.
23. `FORMAT-TODO.md:106-139` *(read 95-140)*. The open question "how to mark imported-vs-AAT-native content", with options `origin:` field / `recapitulation` type / convention. Pair it with `PROPOSALS.md:335-355` (SP-23, a theorem-import architecture meta-segment). v3 will have to decide where an adopted theorem's provenance lives.

## Tier 3 — the scar tissue: CHANGELOG entries where a discipline or rule was born

*CHANGELOG is about 460 KB with very long lines; these spans are the process-relevant entries. `CHANGELOG.md:1-28` is the preamble (GUC rosetta stone, and how CHANGELOG relates to TODO, LOG, audits and git).*

24. `CHANGELOG.md:386-395` *(read)*. SP-24: the root definition reframed from agent-object to **coupling**, with the information-loss boundary as constitutive. It separates the scope cascade from the agent spectrum, and rejects Path B ("Entity"). This is the most recent root-definition change before SP-30.
25. `CHANGELOG.md:676-702` *(skimmed)*. 2026-05-18/19:
    - the ρ-decomposition truthification ("methodology paid out twice against the lead agent");
    - NOTATION treated as a lagging proxy;
    - the spike-routing cycle that caught "the canon's one self-lie" and gave birth to the **regression axis** discipline.
26. `CHANGELOG.md:704-716` *(skimmed)*. 2026-05-16, Model-S non-exit: three audit clusters converged on a fixed-time/infinite-horizon conflation. The peer adjudication's process call was right and its substantive prediction was disconfirmed. The independent-verify gate (adjudicator ≠ confirmer) is shown working.
27. `CHANGELOG.md:184-192` *(read)*. The 2026-07-15 tracker prune:
    - Joseph's standing directive (done items are deleted, and CHANGELOG has no standards and absorbs anything);
    - the D-3 resolution;
    - the process scar "filter your exclusions, then re-verify without them".
28. `CHANGELOG.md:293-303` *(read)*. 2026-06-02 SOP consolidation as it actually landed: the `.sop.md`/`.sop/` convention, interments, symlink aliases, Working-Notes discipline single-sourced, `bin/check-links`.
29. `CHANGELOG.md:483-500` and `:443-466` *(read 483-500)*. Track C, the meta-architecture relocation under "introduced before used". It raised ordering violations from 5 to 22, all by design, which is why lint-outline needed its whitelist. Ordering rules versus pedagogy placement is a tension v3's dependency model will meet.
30. `CHANGELOG.md:362-377` *(read)*. SP-26, anti-collapse named as a style claim ("not a fifth facet; carries no theorem"), and SP-28, the agency-scope contrast channel. Both show how ASF homes a *style* claim as opposed to a theorem.
31. `CHANGELOG.md:793-813` *(headers)*. The `impl-*` chapter-end series is established as the canonical home of findings, and `FINDINGS-RANKED-DRAFT` is retired. Read it alongside `TODO-big-picture.md` below.
32. `CHANGELOG.md:718-728` *(headers)*. The AAD→AAT rename and the volume-directory harmonization. The full plan is `msc/AAD-to-AAT-TODO.md:1-691`, a large-rename discipline specimen (skimmed).
33. `CHANGELOG.md:1360-1448` *(read 1360-1375)*. Imported auto-memory history, including the **March 2026 foundation spikes**:
    - purposeful-agent derivation;
    - spike v3 as definitive;
    - graph uniqueness;
    - the note that the $O_t/\Sigma_t$ split is a *scope narrowing*, not derived.

    The spike files themselves are in `spikes/` (spikes finder).
34. `CHANGELOG.md:1449-1508` *(read 1449-1460)*. 2026-05-12: the Volume/Part/Chapter hierarchy applied across the OUTLINEs, and the origin of the `--GAP--` chapter-head rows.

## Tier 4 — project memory: the disposition as ASF learned it

*Path prefix: `~/.claude/projects/-Users-josephwecker-v2-src-arch-asf/memory/`. Each file is 25-90 lines; read it whole. I read about 35 in full and the descriptions of all ~110. You have read `MEMORY.md`.*

35. **Statements about the canon/epistemics boundary** v3 has to restate or replace. All read whole:
    - `feedback_working_theory_belongs_in_canon.md`: canon admits weak tiers that are honestly marked, and "strengthening is the promotion process, not the admission condition".
    - `feedback_integration_is_replacement.md`.
    - `feedback_spike_references_only_in_working_notes.md`: the binary canon boundary, with Joseph's 2026-05-19 grounding "do not over-enumerate".
    - `feedback_reference_vs_research_status_separation.md`: reference describes, research status goes elsewhere.
    - `feedback_math_lives_in_segments.md`.
36. **On the hand-kept-label and lifecycle failures.** All read whole:
    - `feedback_stage_gating_known_problematic.md`: note its `status:` claim, surprise #2.
    - `feedback_drain_across_surfaces_and_regression_check.md`: the five-surface drain plus the pickaxe regression check.
    - `feedback_prune_completed_from_trackers.md`: extended to Working Notes and to strikethroughs.
    - `project_integrated_wipe_never_real.md`: a phantom Joseph-decision carried for two months, so verify where decisions came from.
    - `feedback_independent_review_discipline.md`: "reviewed" versus "attested", never "witness".
    - `feedback_multipass_incremental_landing.md`: withholding verified truth is also a failure.
37. **Pedagogy and register.** All read whole:
    - `project_pedagogy_reflection_gold_mechanism.md`: commissioned intros fail; reflections made during in-order walks are the gold.
    - `feedback_respectful_pedagogy_mental_model_first.md`: Layer 0 then Layer 1; the analog must be isomorphic.
    - `feedback_prose_intros_default_lean_conservative.md`.
    - `feedback_meta_segments_deserve_pedagogical_work.md`.
    - `feedback_lossy_boundary_not_blindness.md`: the agent–world boundary is lossy, not blind, and paraphrase degrades canon. This is foundational to v3's very first definition.
    - `feedback_segment_voice_not_diff_voice.md`.
    - `feedback_math_novelty_recognition.md`: don't deflate, and scoping *is* the result.
    - `feedback_gate2_epistemic_tribunal.md`.
    - `feedback_external_standard_category_error.md`.
    - Also, descriptions only: `feedback_avoid_model_tic_vocabulary.md` and `feedback_plain_words_for_joseph.md`.
38. **Collaboration stance.** Read whole:
    - `user_status_coach_accountable_to_truth.md`: "the project serves Truth, not Joseph". It is the in-ASF counterpart of the aat-refactored "too much deference to me" diagnosis.
    - `project_modularity_state_dynamics_register_openings.md`: the normative and narrative registers opened 2026-05-09.
39. **Method memories that are now SOP-backed.** Read whole:
    - `feedback_pilot_then_sweep_pattern.md`;
    - `feedback_problem_framing_paralleling_test.md`: tooling that sits beside existing infrastructure rather than extending it signals a wrong framing. Worth holding when deciding what v3 reuses from ASF's `bin/` and `terminology/` and what it rebuilds;
    - `feedback_hybrid_commit_cadence_for_parallel_sweeps.md`;
    - `feedback_impl_intro_first_pass_failure_modes_and_md_press.md`.
40. **Naming.** Read whole:
    - `feedback_subject_noun_slug_naming.md`;
    - `feedback_role_prefix_separate_from_subject_noun.md`;
    - `feedback_naming_principle_citability.md` (Criterion 9);
    - `feedback_terminology_rename.md` (axiom→postulate, etc., and why).

    Read them before choosing v3's naming conventions.
41. **History.**
    - `session_2026_03_11_tst_conversion.md` (read 1-60): the origin of the `stage:` track and of the corollary-folding policy.
    - `project_aat_reboot.md` (read whole): stale path, as noted in surprise #8.
    - `project_2026_04_*` cycle files (descriptions only): April archaeology, lower.

## Tier 5 — framing surfaces and the open-queue layers (what the theory says about itself, and what is pending)

42. `PROPOSALS.md:1-64` *(read)*. Portfolio conventions: the SP schema (thesis / merits / scope / findings-subsumed / interactions / effort / risks / status), independence markers, and the two bundles:
    - Bundle 1, the framework-face reframe;
    - Bundle 2, Section III completion.
43. `PROPOSALS.md:278-333` *(read)*. SP-21, splitting composite-agent scope routes into separate ontologies, with its explicit "what this reverses" record. It is a model of how to record a deliberate prior choice that a later proposal would undo, and a foundational scope fork for v3 Part III.
44. `PROPOSALS.md:95-101` *(read)*. C.1 O-BP13: Cox-parallel *necessity* for DAG semantics, given P1–P4 plus causal sufficiency. Foundational for Part II's strategy-DAG grounding. `PROPOSALS.md:361-376` *(read)*: SP-27, introspective-fork undetectability, which grounds Part IV in Part I's lossy φ.
45. `TODO-big-picture.md:1-64` *(read whole)*. The 2026-05-16 register correction:
    - FORMAT read as a canonical taxonomy is "stale working instructions";
    - deflation is register drift, not a missing word;
    - "state the kind, full stop";
    - the census denominator is the `impl-*` layer.

    It is directly about how a contribution gets labeled.
46. `TODO.md:1-15, 27-54, 75-94, 149-182, 240-249` *(read)*.
    - Layer roles.
    - Strengthen-first candidates from the gold-lift.
    - **Greek-vocabulary prose discipline**: the segment math does not use the distinctions the Greek terms carry, and Joseph agrees.
    - Open theory items.
    - The queue to auto-derive NOTATION.

    The rest of `TODO.md` (183-239, 268-513) is ASF's theory and tooling backlog. Open it for whichever segment you are rebuilding.
47. `HISTORICAL-CONTEXT.md:1-94` *(read whole)*. Long-form positioning, the peer frameworks (active inference, IBM/Miehling, Hafez, Miller, GAA, OODA), and "How this work developed". It is the self-description v3 will either keep or revise.
48. `README-auditor.md:1-243` *(read whole)*. `:24-60` is the auditor's priming-avoid list, a good summary of which files ASF considers priming. `:77-172` is the structure, the minimum concepts, the cross-domain table and the maturity gradient. Note that it is generated from `doc/readme/src/_*.md`, so `doc/readme/src/_position-and-lineage.md` and `_maturity-gradient.md` are the actual sources.
49. `msc/domain-unification-2026-05-04/recommended-agent-ontology.md` *(skimmed)*, `doc/DOMAINS.md:1-119` *(skimmed)* and `msc/scope-of-work-ontology-and-figure-2026-05-17.md:1-237` *(headers plus 1-20)*. The four-axis agent lattice (semantic tier × knowledge type × GUC coupling × arity) and the verification of the Vol-1 scope figure. Its labels `[CANON ✓]/[DECIDED]/[SYNTH ?]/[OPEN]` are a working epistemic key worth noticing. Read these when reconciling the scope cascade, the scope lattice and the agent spectrum you flagged.
50. `msc/451729-d1-gate-verification-2026-05-20.md:1-223` *(read 22-40 plus headers)*, `msc/verify-strategy-cost-cluster-2026-05-20.md:1-694` and `msc/verify-sector-condition-cluster-2026-05-20.md:1-461` *(skimmed)*. Specimens of strict, independent, adjudicator-role verification:
    - a per-gate pass/fail on six segments;
    - YAML front matter declaring authority, scope and governing references;
    - "output: this document only".

    They show concretely what a verification event against a fixed text looked like in ASF.
51. `msc/meta-process-review-2026-07-07/10-repo-decomposition-strategic-question-findings.md:13-57` *(headers)*. Coupling measured: Vol 1 reaches down into Vols 2–4. Read it if v3's core is meant to stand alone.
52. `msc/meta-process-review-2026-07-07/SESSION-LOG-2026-07-14.md:30-46` *(read)*. A proposal for layering memory into universal, program and member levels. Relevant to v3's auto-loaded layer.

## Tier 6 — reference, tooling and archaeology (open on demand)

53. `bin/lint-outline:1-35` *(read header)*. What dependency, ordering, orphan and stage checks ASF actually mechanized, and the whitelist file `01-aat-core/OUTLINE-accepted.md`.
    - `bin/term` (892 lines): the terminology CLI.
    - `bin/build-monograph` plus `bin/lib/{ingest,segment_renderer,assemble,outline_walker}.rb` (about 3.9K lines): the markdown-first build, which strips Working Notes for `--public` (see `segment_renderer.rb`, `ingest.rb`).
    - `bin/extract-findings` and `bin/refresh-all`: the generated-file pipeline.

    Open these when deciding what v3 reuses. I did not read their bodies.
54. `doc/digests/math-core.md.liquid:1-40` *(read whole)* and `msc/build-markdown-design.md:1-176` *(head)*. A filter/projection recipe over the OUTLINE: segments with a Formal Expression, showing status, depends and brief. It is a working example of a computed view. The stale output is `.archive/math-core.md` (see surprise #8).
55. `msc/markdown-first-pipeline.md:1-331` *(head)*. The design record for the build. Meta-process cluster 05 called the build sound and the conventions layer above it mostly deferred. `FORMAT-TODO.md:1-105` and `BIBLIOGRAPHY-TODO.md:15-31` cover the volume/part/chapter numbering and the decided **strengthened hybrid citation rule**: `\citep` is required for bibliography-worthy sources, and load-bearing imports need locator-backed cites.
56. `empirica/README.md:1-34` *(read whole)*. A canonization instrument for simulations: MANIFEST with an epistemic tier, consuming segments, provenance and RUNS log, plus the rule "nothing is 'confirmed' without a recorded run". It is a small but complete record design.
57. `releases/v0.1.0-mathematical-lineages.md:1-343` and `releases/v0.4.0.md:1-105` *(headers)*. The 17 mathematical lineages with per-lineage segment lists, a cross-lineage matrix, "lineages under-acknowledged in the headline", and the v0.4.0 known limitations.
58. `msc/summary-attempt/` (194 files; `000-supplement-notes.md:1-25` read). A walker's per-segment mental-model prose in OUTLINE order, with appendix interleaving by symlink. It is a mental-model-first pedagogy layer for every Vol-1 segment, as of May. `feedback_prose_intros_default_lean_conservative` records where it was weaker than canon.
59. `.archive/`, foundation era (files skimmed or headers only):
    - `2026-03-13-research-agenda.md:1-105`: the first priority list and the α vs 𝒯 primer.
    - `2026-03-13-hypothetical-theory-choice.md`: the session choosing between ACT and Hafez.
    - `03-goal-formalism-sketch.md`, `04-intent-dag-consolidated.md` and `000-contents.md` (324 lines): the original master outline, "the whole proof in plain English".
    - `old-tf-readme.md`, `old-tf-*` (TF-01…TF-11 plus appendices) and `README-act-original.md`.
    - `tst-skeptical-critique.md` and `tst-arbitration-report.md`.
    - `2026-03-13-landscape-research/`.

    `.archive/README.md` explains the layout and the `msc-naming-2026-08-22.tar.gz` naming tree.
60. `msc/reflections/` (30 files; headers of all read). Author-voice journal entries.
    - Most bearing: `12-truthification-and-what-the-theory-session-missed.md`, `13-actually-verifying-alpha-T.md` (a verification done by hand), `24-framework-as-its-own-diagnostic.md`, and `28`–`30` (impact; the charter).
    - `01`–`11` and `14`–`19`: cohort-reading context.
    - `msc/reflections-rowan-2025-12/`: older.
61. `doc/sop/naming.sop/principles.sop.md:1-138` and `naming.sop/methodology.sop.md:1-185` *(headers; the two SOPs you have not read)*. Architectural invariants: role prefix, subject-noun, the Greek commitment, rename vs alias vs canonicalize, and the evaluation criteria.
62. Lower-priority remainder:
    - `LOG.md:1-221` *(read whole)*: pre-2026-04-24 cycle archaeology with the GUC rosetta stone; useful for "did this commitment rest on derivation or on cycle consensus".
    - `TERMINOLOGY-TODO.md:1-104`: naming backlog.
    - `FINDINGS.md:1-1235`: generated from segment `## Findings`, 48 entries, a specimen of a computed catalog.
    - `NOTATION.md:30-203`: the symbol tables.
    - `LEXICON.md:1-156, 309-384`: the remaining vocabulary.
    - `TST-IDEAS.md`.
    - `msc/joseph-working-notes.md`: Joseph's notes plus a Gemini auditor exchange.
    - `msc/logogenic-encounter-2026-05-01/05-segment-stub-discipline.md`: the "pointers for fleshing out" Working-Notes pattern.
    - `msc/class-rename-*`.
    - `msc/aat-v0.4.0-*-review.md`.
    - `msc/handoff-2026-05-01.md`.
    - `msc/judgment-calls-readme-cycle-2026-04-26.md`.
    - `msc/working-composition-admissibility.md` (Part III's open M_adm workshop).
    - `msc/quiz-responses/`.
    - `CURRENT-VOL1.md` and `-APPENDICES.md`: whole Vol 1 in one file, for an in-order read if you want one.

---

## Coverage, honestly

- **Read whole:**
  - the root `OUTLINE`, `HISTORICAL-CONTEXT`, `LOG`, `TODO-big-picture`, `README-auditor` and `INTEGRATION-CLEANUP-TODO`;
  - `LEXICON:157-308`;
  - the stated PROPOSALS and TODO spans;
  - the cited CHANGELOG entries;
  - meta-process `00`, `01` (both files), all reflections, and the PROCESS-MAP head and tail;
  - decision-briefs `1-112`;
  - about 35 memory files.
- **Skimmed or headers only:** everything else listed. The weakest spots in my ranking are:
  - PROCESS-MAP `:81-439`;
  - meta-process findings `02`/`04`/`07`/`08`/`09`/`10`;
  - the `bin/` bodies;
  - the `.archive` TFT-era files;
  - most `msc/` working files below Tier 3.

  Any of these may deserve to move up once opened.
- **Not opened:** `.claude/` and `.obsidian/` in ASF, `mono/`, `ref/`, `env/`, and the `terminology/entries` bodies beyond one sample.
