# Reading map: `~/src/aat-refactored/` (for the AAT v3 coordinator)

*Mapper: Opus 5.5 subagent, 2026-10-28. Brief: rank files and line spans in that repo (plus the finders' supplementals in ASF) for two purposes: what v3 should carry forward, and where the looseness showed. This is an ordered reading list, not a summary and not a whitelist. Every file in the patch is listed somewhere below; the order is the information.*

*What I read. Whole: every `scratch/` intermediate and cold read (00–16), `MODEL.md`, `rewrite-thoughts.md`, all 17 aux reports, `_FINDER-BRIEF-draft.md`, all nine `src/` drafts, every file in `spikes/review-ch1-2-*`, `spikes/verify-ch2-*/report.md`, the spike-adaptive-predicate files except 02a/02b (read section by section, about two-thirds of each), `de-novo-feedback-1.md`, both `spikes/_briefs/`, and in `fresh-view-2026-09-29/` `thoughts.md`, `census-findings.md`, `red-team-notes.md`, `history-and-sourcing.md`, `taxonomy-audit.md`, `theory-findings-to-verify.md`, `worked-example-*`, `specimen-notes.md`, and `specimen-worked.md` §§0–6. Every commit subject and body (76 commits). Skimmed only: the two vsect sketches (structure, opening and laws sections), the three Python check scripts (by size and purpose), and the ASF supplementals: section headings of all 17, plus 00's notes (:1–57) and feedback (:384–426) and the "worries" sections of 02, 03, 05, 11, 12, 14, 15 and 16. The 16 finder briefs in `scratch/aux/_briefs/` are byte-identical to `_FINDER-BRIEF-draft.md` once each file's slug and the old repo path are normalized. I checked that with a diff, so I didn't read them separately.*

---

## Read this part first: surprises, and where I think the framing could be sharper

1. **The repo's carry-forward value is mostly in its *reports*, not in its `src/` drafts.** Every `src/` file opens with a Status block saying it is known false or overstated in places. No claim text in `src/` changed after 2026-09-25 (commit `e9c84e6`'s body: "No claim text changed: the integration itself is still to do"). The triage queue (items 1–17) was never executed. On 09-29 the work turned to apparatus entirely: the proposal, the taxonomy, the vsect sketches. So the theory that is worth carrying lives in four checking documents: the Ch.2 verifier, the de novo review, the spike verifier, and the phase-2 heads-up. The drafts are mainly the *objects* those reports were written against. I've ranked accordingly.

2. **The clearest single specimen of the looseness is the integration commit `d60c511`, and git timestamps show it.** The Ch.2 verifier's report landed at 20:29:28 and the de novo review at 20:31:47. The integration landed at 20:32:10. It rewrote the integrity clause into a form that drops the verifier's "under exogenous future actions" qualifier, which made the clause contradict itself (T1). The same commit left "equivalently, adapted to σ(C_t)" in the time clause, which then contradicts that clause's own new first sentence (T2). It also relabelled a hypothesis "now exact" (T3). The specimen agent reconstructed all of this forensically: `specimen-worked.md` §0 and the L6/L7 trails. The tempo matches. The intermediates for units 01–04 were committed within 4 minutes of each other (18:59–19:03), and units 00–16, nine drafts and four subagent reports all landed in about 4.3 hours. Nothing in the repo records the read-version of any finding. Run `git log --reverse --format='%h %ad %s' --date=iso` before you read anything else: the timestamps are evidence in their own right.

3. **"Verified" here almost never means two independent minds.**
   - The phase-1 de novo review and the phase-2 heads-up are the same reviewer instance (`specimen-worked.md:44–47`).
   - The three fresh-view subagents all read the first-pass `thoughts.md` before they started.
   - All 76 commits carry Joseph's git identity, so role is recoverable only from prose headers.

   The strongest content is the handful of results re-derived by two separate readers: the Ch.2 identities (regret identity, retention/readout split, finite-horizon target form) were each re-derived by the Ch.2 verifier *and* the de novo reviewer. Everything else that is load-bearing carries the label single-agent: the sandwich lemma, the chain-rule learning budget, the belief-state no-go, F-AG4's ignorability-by-construction, and T1–T7. Your brief asks for "verified results". Expect very few, and expect most of them to be candidates for a v3 verifier.

4. **A large part of what's here is a map of ASF's own Ch.1–early-Ch.3 defects** (the aux reports), and v3 needs that regardless of method. The aux line citations into `asf/01-aat-core/src/` are still valid. Nothing under that directory has changed since 2026-08-24, and the finders read at `875e1ac3` (2026-09-24). ASF overall has moved 398 commits since then, so their citations into `audits/`, `spikes/`, `TODO.md` and the like may have drifted.

5. **On your framing.** "What it got right" and "where the looseness showed" usually sit in the *same* file, often the same paragraph. The Ch.2 verifier both strengthens (the sandwich lemma) and catches loose claims, so the two lists can't be partitioned. Instead I've tagged each entry **[carry]**, **[loose]** or both. A third category may deserve its own slot: **looseness in the checking itself.** The triage dropped the reviewer's smoothing condition. The spike's rescue was tested against only one member of the twin family. The taxonomy revision fixed only the items Joseph had pointed at. The sim verified an adjacent pair. Those are the failure modes most likely to recur under any discipline v3 adopts.

---

## The ordered list

Paths are relative to `~/src/aat-refactored/` unless they start with `~` or `asf/` (= `~/src/arch/asf/`).

### Tier 1: the independent checks, and the forensic record of what went wrong

1. **`spikes/review-ch1-2-2026-09-25/phase1-de-novo.md:1-173`** [carry][loose]. An unprimed de novo audit of all nine drafts (deliberately didn't read `scratch/` or `spikes/`). About 50 findings, weighted [breaks]/[gap]/[label], with small counterexamples you can verify by reading.
   - Three strengthenings: the chain-rule learning budget (:76–80), sequential ignorability by construction (F-AG4, :106), and the "target form is unconditional" note (:148).
   - A "What holds up" section for nearly every segment, which is the closest thing to a list of keepers.
   - Structural observations (:164–169), including "the delivery layer is … often better than the formal layer at saying what's meant".
   - Its scope-and-limits paragraph (:171–173) says which items want an independent check.

2. **`spikes/verify-ch2-retention-2026-09-25/report.md:1-275`** [carry][loose]. The only commissioned, independent, adversarial verification in the repo.
   - Summary table: :17–35.
   - The finite-horizon argument and the trigger that always fires (§1–2): :39–71.
   - The sandwich lemma, with proof and a numerical check (§3): :73–99.
   - Three ways to be wrong (§4): :101–127.
   - Four action conventions in one chapter (§5): :129–150.
   - Integrity as a Markov condition (§6): :152–184.
   - Checked clean (§12): :238–249. Regression check against ASF (§13): :251–257. What it didn't check (§14): :259–270.
   - §15 (:272–274) proposes a method question worth carrying into every v3 verifier brief.
   - Small numeric checks live in `spikes/verify-ch2-retention-2026-09-25/checks/{sandwich,finite_state_floor,ar1}.py` (36/32/20 lines).

3. **`spikes/fresh-view-2026-09-29/specimen/specimen-worked.md:11-290`** [loose]. A hand-built trail of about 68 events against `the-loop`, each bound to the text version it examined. It is the forensic evidence for surprise 2.
   - The three body versions: §0 :11–25.
   - Who acted, and that A2 and A7 are one mind: §1 :27–49.
   - The 21-record cut: §2 :51–89.
   - The trails: §3 :90–196. L6 and L7 (:124–147) are the `d60c511` landing; L8 and L9 (:148–160) are the dropped smoothing condition.
   - Hand labels against the computed column at two moments: §4 :198–240.
   - The pending integration, projected: §5 :242–273. Minted questions: §6 :275–290.

4. **`spikes/fresh-view-2026-09-29/specimen/specimen-notes.md:1-172`** [loose][carry]. The specimen agent's own reading of the above.
   - The short version: :18–34.
   - What the specimen shows about AAT's content: :36–46 (actionable theory repairs).
   - Strains S1–S7, where evidence needs a text address, redefinition is a third change-class, and findings are themselves claims: :63–80.
   - What RC1 didn't answer: :82–88.
   - Pilot advice, with the cheapest changes: :140–149.

5. **`spikes/spike-adaptive-predicate-2026-09-25/de-novo-feedback-1.md:1-217`** [carry][loose]. The spike verifier.
   - F1, the stream form replaces the draft's predicate, with an XOR counterexample: :24–42.
   - F2, the belief-state twin, which makes the no-go broader and sets up the behavior-level vs declared-world fork for Joseph: :46–87.
   - F3, boundary, grain and chance don't pin membership, with an autonomy hypothesis: :91–100.
   - F4, the cascade into reach and agentic-scope: :104–117.
   - F5, the modal-reading argument rests on rows that are false in general: :121–135.
   - F6, the sim checked an adjacent pair: :139–145.
   - F7.7, the slogan's authorship was flagged here first: :149–163.
   - Re-derived clean: :167–185. Feedback on attacking the *strengthening attempt*, not only the verdicts: :211–215.
   - Appendix code: :221–281.

6. **`spikes/fresh-view-2026-09-29/theory-findings-to-verify.md:1-81`** [carry][loose]. T1–T7 against `the-loop`, plus one lead (sanctioned writes as a declared channel). Each finding has a target, the version read, and a check anyone can re-run. None has been independently verified. This is the most directly actionable queue left behind, whether or not v3 keeps `the-loop`'s shape.

7. **`spikes/review-ch1-2-2026-09-25/triage-coordinator.md:1-47`** [loose][carry]. The coordinator's single-agent decisions, taken under Joseph's deferral. Compare item 2 (:12–17) with the review's F-L6 (`phase1-de-novo.md:34`): the smoothing condition falls off here. Item 4 (:19–25) is the adaptive-scope decision that the F2 fork bears on. The "already integrated" line (:7) equates findings written against v1 that nobody re-checked against v2 (specimen-notes :155).

8. **`spikes/review-ch1-2-2026-09-25/phase2-heads-up.md:1-214`** [carry]. Collisions between the rewrite's Chapter 1–2 choices and later ASF (Parts II–III, Vols 3–4), each with slugs, a side, and a confidence.
   - Group A (:7–121) matters for any foundation refactor: A1 ignorability, A2 interior-action loophole in GUC class, A4 integrity vs Part II's sanctioned writes, A5 the two meanings of "chronica" and "integrity", A7 a declared target across sessions, A8 pretrained weights under the modeler's prior $\pi_0$, A10–A11 Chapter 3 conventions and glyph collisions, A14 chance must be declared.
   - Group B: :123–214.
   - Its brief (`spikes/_briefs/review-ch1-2-phase2.md:1-9`) is the spoiler-light look-ahead pattern, and short.

### Tier 2: the method and apparatus analysis (the bridge to verisectorium RC1)

You've read the PROPOSAL whole. These are its evidence base, and in places they say more than the proposal does.

9. **`spikes/fresh-view-2026-09-29/thoughts.md:1-333`** [loose][carry].
   - The picture (:7–56).
   - What ASF's `status:` field actually did (§1, :61–101).
   - Name everything, promote to a record lazily, plus the two extra promotion triggers (§2, :105–132).
   - Evidence names the text it examined (§3, :136–157).
   - The three ways a premise can change (§4, :161–173).
   - Headline rules (§5, :177–203).
   - Authority kept out of truth, purpose statements, closers (§6, :207–245).
   - The anchoring-slot check (§7, :249–265).
   - The finder protocol as a manual projection (§8, :269–283).
   - Adopt-now list and RC1 amendments (§9, :287–323). Open questions (:327–333).

10. **`spikes/fresh-view-2026-09-29/census-findings.md:1-238`** [loose]. A measured census of all 246 ASF segments' `status:` values plus the full history of `status:` changes, with scripts.
    - Bottom line: :5–20.
    - The exact/conditional seam, and the `der-recursive-update` flip-flop over an unchanged body: F5 :79–92.
    - How status values moved, including the 0-of-4 match between a review's rulings and what was committed, and the 80-day lag: F6 :94–118.
    - 25 Epistemic Status sections read whole: F8 :124–156.
    - Corrections to `thoughts.md`: F9 :158–161.
    - Reproducible scripts: :194–238. Highest value if v3 decides what replaces ASF's frontmatter.

11. **`spikes/fresh-view-2026-09-29/red-team-notes.md:1-205`** [loose][carry].
    - The short version: :11–24.
    - The thesis rule would have enshrined the slogan (§1): :30–53.
    - Formulations need purposes, with F2 as the live case (§2): :57–73.
    - Redefinition as a third change-class (§6): :114–120.
    - Delivery more accurate than the formal layer (§10): :155–161.
    - The one failure class the light process didn't catch: :176–186.
    - What survives: :190–196.

12. **`spikes/fresh-view-2026-09-29/taxonomy-audit.md:1-104`** [loose]. The taxonomy author auditing its own draft: what each call rests on (§1 :18–46), what was dropped (§2–3 :48–88), and what a proper redo needs (§5 :96–104). Read beside `history-and-sourcing.md:226-241` (eighth round). Together they record the failure of treating Joseph's pointed examples as a checklist instead of a class.

13. **`spikes/fresh-view-2026-09-29/history-and-sourcing.md:1-242`** [loose]. Provenance and descent among the agents.
    - The coordinator's five pushbacks and how each was resolved: :67–83.
    - Selection effects from Joseph's pointers: :85–116.
    - Joseph's taxonomy challenges, and where the first draft was wrong: :180–199.
    - The class-not-checklist correction: :226–241.

14. **`spikes/fresh-view-2026-09-29/worked-example-recursive-update.md:1-202`** [carry]. One ASF segment, `der-recursive-update`, taken all the way through the proposed record model: records, events, the computed line, and where each old section goes (§6 :180–195). It's the most concrete answer to "what would a v3 segment look like under RC1-style records". Note its own caveat that it predates the derivation kind.

### Tier 3: the drafts, as specimens and as the best-checked candidates to carry

Read these alongside the Tier 1 findings, which name exact sentences in them.

15. **`src/retention.md:1-113`** [carry]. The most-verified draft, revised after the verifier: finite-horizon $S_k$ under $\pi_{\mathrm{ref}}$, the target form, the sandwich lemma, fitness on the agent's history law, the retention/readout split, and three ways to be wrong.
    - Status block (:13): still owes the review's F-R3 and the heads-up's A7 and B8.
    - Working Notes (:98–113): the Chapter 4 trigger warning, and the readout reading of ASF's Prop. 4 ceiling.

16. **`src/what-to-keep.md:1-72`** [carry]. The post-verification information-curve segment: price vs budget, a corrected causal-state limit, the curve as an upper bound for recursive stores. Its Working Notes (:59–72) also list how it departs from ASF's `form-information-bottleneck`.

17. **`src/the-loop.md:1-113`** [loose][carry]. The specimen's object.
    - The time and integrity clauses as landed: :39–41, the T1/T2 sites.
    - The reach definition that the review took apart: :43–52.
    - Housing rules H1–H3: :54–58. H3, classifications must be invariant under redescription, is a good principle that did not fire when it should have (specimen-notes :45).
    - The back-action decision and Joseph's physics objection: :96–101.
    - "Now exact" lift: :102. Unlabelled claim: :106.

18. **`src/history.md:1-82`** [carry][loose]. The history/retention/record trichotomy (:19–31), the endowment as $(M_0, f, \text{rule space})$ (:25), and the inside-view no-go (:33–40), which the review calls tautological in form (F-H2). Token uniqueness as a scope commitment, with no derivation anywhere: :31, :78.

19. **`src/adaptive-scope.md:1-105`** [loose]. Status (:13–15) stacks three sources of known-false content. Notes :83–92 summarize the spike's landing. Lead line :17 is the post-slogan version. Read with `git show b99d694^:src/adaptive-scope.md` to see the slogan in the headline slot.

20. **`src/the-reality-model.md:1-63`** [carry]. H4 on the store (completeness is recursion; :21), boundedness as the commitment with bite (:23), information state defined correctly (:25), causal states as the ideal (:27). F-RM2's store-vs-readout conflict is still open (:13, :45).

21. **`src/agentic-scope.md:1-69`**, **`src/held-still-and-moving.md:1-49`**, **`src/the-cycle.md:1-55`** [loose][carry]. Each has a Status block naming its known breaks: surfacing through the store, and bandits excluded; Doob false for loops; "the cycle is forced" overclaims. The carry-worthy ideas are Joseph's Option A, world-routed agency, with its provenance (`agentic-scope.md:63`); the still/moving cut; and the retitle to "the *order* of the cycle is forced".

### Tier 4: the spike on the adaptive scope

22. **`spikes/spike-adaptive-predicate-2026-09-25/02a-exact-structure.md:1-87`** [carry]. Lemmas L1–L5: horizon collapse and absorption (:13–27), the oracle-advantage reading (:29–37), invariance (:39–47), the prior mattering only through null sets (:49–55), and $t$-dating vs ASF's floor (:57–74). Read against de-novo-feedback F1, since L1(a)'s action step is false, and F7.3.

23. **`spikes/spike-adaptive-predicate-2026-09-25/02b-housing-policy-representation.md:1-95`** [carry][loose].
    - The re-housing twins and the no-go: §4 :5–42. The "succeeds for actors" rescue there was refuted by F2.
    - Own policy vs some continuation policy: §5 :44–64. Its table rows are refuted by F5.
    - The representation clause and the two meanings of "matters": §6 :66–77.
    - Whose prior: §7 :79–83. Adversarial instances: §8 :85–95.

24. **`spikes/spike-adaptive-predicate-2026-09-25/03-the-question-underneath.md:1-59`**, **`debrief.md:1-27`**, **`README.md:1-42`** [loose][carry]. The recommended statement (03 :25–36), the two-knob dial (03 :38–45), and what's left for Joseph (03 :47–59). The debrief is the Joseph-facing register. Several of its sentences are on F2's and F5's delete lists (`de-novo-feedback-1.md:194-201`), which makes it a good test of how a summary outruns its own derivations.

25. **`spikes/spike-adaptive-predicate-2026-09-25/01-neighborhood-map.md:1-48`** [carry]. Where ASF already carries the predicate's quantity (Prop. 3's (ii′), event information content, $\eta^\ast \gt 0$), the consumer table (incomplete per F7.5), and the provenance of the OODA sentence (:33–35).

26. **`spikes/spike-adaptive-predicate-2026-09-25/proposed-integration-plan.md:1-48`** (with its do-not-inherit list, :41–48), **`00-log.md:1-23`**, **`sims/gaussian_checks.py:1-78`**. The do-not-inherit list is worth seeing: two of its "vocabulary" items turned out to be where the substance was wrong (`de-novo-feedback-1.md:213`).

27. **`spikes/_briefs/spike-adaptive-predicate.md:1-69`** [carry: method]. A full spike brief in Joseph's register: the consent opening, research-quest framing, "I have my own guesses", the neighborhood map as first deliverable, role separation, the drill. Compare it with the verifier's feedback on what the brief's drill missed (`de-novo-feedback-1.md:214`).

### Tier 5: the coordinator's reading trail (theory insights as they formed, and where errors entered)

Each intermediate's "What the aux changed" and "Wandering thoughts" sections hold the reasoning. The cold reads are the unprimed first impressions. Most of what landed in `src/` is traceable here, including the corrections. In reading order:

28. **`scratch/05-scope-adaptive-system.md:1-79`** [loose]. The hop where the misattributed slogan became a formal clause and Part I's headline. The correction banner is at :3, and the original reasoning is left intact at :21, :27–32, :59 and :63. Read it with **`scratch/aux/05-scope-adaptive-system.md:1-71`**: the rebuke (:3), the authorship standard (:57–63), and the March transcript note (:64–67). Neither file stands without the other.

29. **`scratch/04-def-chronica.md:9-31`**, **`scratch/06-scope-agency.md:9-45`**, **`scratch/07-post-causal-structure.md:9-30`** [carry]. In order:
    - the trichotomy and why "the prior is machinery, not material";
    - fork detection as relational;
    - the three action targets, Joseph's 2026-04-01 Option A, and the formal-layer-lags-prose diagnosis that became the "formal layer authoritative" rule;
    - irreversibility has no formal consumer, and the cycle is what non-anticipation leaves room for.

30. **`scratch/09-form-agent-model.md:9-26`**, **`scratch/10-form-information-bottleneck.md:9-31`**, **`scratch/11-def-model-sufficiency.md:9-32`**, **`scratch/12-def-model-class-fitness.md:9-28`** [carry][loose]. Chapter 2's spine forming:
    - Doob–Dynkin makes the equation derived; information state vs causal state; Still 2009; price vs budget; the price of goal-blindness;
    - sufficiency's three hidden choices; the inside-view no-go generalized; the retention/readout split arriving.

    Several statements here were later corrected by the verifier: Still as warrant, and "information state". So these are snapshots, not final positions.

31. **`scratch/13-the-cycle-in-motion-intro.md:5-28`**, **`scratch/14-form-event-driven-dynamics.md:9-31`**, **`scratch/15-der-recursive-update.md:9-26`**, **`scratch/16-der-action-selection.md:9-25`** [carry]. Chapter 3 as the readout chapter; three places to read evidence badly; clock-as-channel; forgetting as a clock; H4 on the store; the one-step lemma; fluency split into epistemic vs action; the compilation frontier. **Reading stopped at unit 16, so these are the forward-most theory notes in the repo.**

32. **`scratch/01-def-agent-environment.md:9-26`**, **`scratch/02-def-action-transition.md:9-25`**, **`scratch/03-def-observation-function.md:9-33`**, **`scratch/08-the-reality-model-intro.md:9-29`**, **`scratch/00-introduction.md:18-78`** [carry][loose].
    - "Learning ends; tracking doesn't", later refined to still/moving.
    - The gold-lift defect: a dissolved "strongest item" stays live in the Working Notes (02 :17).
    - Invariance under redescription as a principle, and memory being valuable because of lossiness *plus* temporal correlation (03 :24–31).
    - The endowment/class tension (08).
    - Nine staleness items in ASF's introduction (00 :57–78).

33. **Cold reads, `scratch/NN-*-cold-read.md`** (10–38 lines each; 00 is the substantial one, :1–38) [carry: method]. The unprimed first read. Comparing a cold read with its intermediate shows what the aux changed. Unit 01's "three readers point at one fix" turned out to be an already-verified finding; that is calibration data on what cold reading finds by itself.

34. **`scratch/rewrite-thoughts.md:1-59`** [carry][loose]. Joseph's layer sketch read as formal / delivery / open-door (:5–18), the starting defaults (:20–28), the gold-lift process finding (:39–41), and the "formal layer authoritative" hard rule (:57–59). The red team (`red-team-notes.md` §10) and the reviewer both argue that the rule's corollary, "delivery may only explain what the formal layer says", is wrong where the delivery states intent better than the formal layer does.

35. **`scratch/MODEL.md:1-79`** [loose]. Self-declared stale (header :3). Its value now is as a snapshot of the coordinator's mental model mid-Chapter 2, including hypotheses that were later refuted or revised: "one race, lifted" (:72), and the ledger as typed ignorance (:73).

### Tier 6: the finder protocol and the aux reports (an index into ASF Ch.1–3)

36. **`scratch/aux/_FINDER-BRIEF-draft.md:1-116`** [carry: method]. The finder brief as it evolved: the inclusion test, the six-heading aux shape, failed checks to the aux and passed checks to the supplemental, Joseph's checklist verbatim (:65–75), and the change log (:104–116). The sixteen `scratch/aux/_briefs/NN-*.md` are this template filled in (identical once slug and repo path are normalized; diff-checked).

37. **`~/src/arch/asf/audits/aat-reboot-aux-supplemental/00-introduction.md:1-57,384-426`** [carry: method]. The pilot finder's process notes and its feedback on parallelizing finders. Its argument: category-split finders lose the cross-file joins where every top finding came from; question-shaped helpers work. It also notes, at :53 and :424, that front matter has no staleness mechanism. The rest of the file (:58–383) is the full pilot report.

38. **The aux reports, by what they offer v3.** Each has the same sections: ESSENTIAL-REMAINING / UNINTEGRATED-UPDATES / FINDER-OBSERVED / ADDITIONAL-NOTES / FORWARD-REFERENCES / SOURCES. FINDER-OBSERVED holds single-agent checks that failed. UNINTEGRATED points at ASF audit material (mostly 731548, under the standing Joseph gate) that never reached canon. In rough order of how much bears on a v3 foundation:
    - `scratch/aux/11-def-model-sufficiency.md:28-63` — sufficiency's three hidden choices, the per-run vs ensemble counterexample, the target form;
    - `scratch/aux/12-def-model-class-fitness.md:22-51` — where the retention/readout split originated; the Kuratowski triviality; three incompatible downstream uses of fitness;
    - `scratch/aux/15-der-recursive-update.md:34-77` — completeness is recursion; the one-step lemma; recursion of *what*;
    - `scratch/aux/01-def-agent-environment.md:11-79` — B-3/SP-30, the typed target, boundary integrity's only home;
    - `scratch/aux/05-scope-adaptive-system.md:25-52` (beyond the rebuke) — the lower wall, the temporal quantifier, the hidden ensemble quantifier;
    - `scratch/aux/06-scope-agency.md:11-72` — two live readings of condition 4; Joseph's 2026-04-01 decision with its transcript locus; the kernel restatement;
    - `scratch/aux/14-form-event-driven-dynamics.md:11-57` — the two horns; surprise vs information;
    - `scratch/aux/13-the-cycle-in-motion-intro.md:9-44` — the canon state of the decomposition, gain, tempo and CIY as of 09-24;
    - `scratch/aux/09-form-agent-model.md:9-49`, `scratch/aux/10-form-information-bottleneck.md:9-62`, `scratch/aux/04-def-chronica.md:9-35`, `scratch/aux/07-post-causal-structure.md:11-52`, `scratch/aux/03-def-observation-function.md:9-40`, `scratch/aux/02-def-action-transition.md:11-49`, `scratch/aux/08-the-reality-model-intro.md:9-53`, `scratch/aux/16-der-action-selection.md:11-68`, `scratch/aux/00-introduction.md:9-47`.

39. **The other 16 supplementals, `~/src/arch/asf/audits/aat-reboot-aux-supplemental/NN-*.md`** (47–90 lines each). Mostly passed checks addressed to ASF Working Notes, plus segment history, slug-tagged notes for later segments, and brief feedback. The "worries" sections are the part most relevant to v3:
    - `02:44-50`, `03:31-34,49-53` (the encoding-relativity argument in full);
    - `05:45-49`, `11:51-61`, `12:28-32`, `14:36-46`, `15:35-40`, `16:44-50`.

    The supplementals sit untracked in ASF by design.

### Tier 7: the tooling sketches

40. **`scratch/vsect-porcelain-sketch.md:1-232`**. A hypothetical tool whose verbs are the project's own loop and whose record-keeping is inferred from acts. Read it if v3 builds tooling. "Where kinds went" (:210–217) and "What this attempt still hasn't settled" (:226–232) are the parts most likely to matter.

41. **`scratch/vsect-hypothetical-cli.md:1-246`**. Superseded (Joseph: plumbing without porcelain). It is kept for its six laws (:11–22) and its phasing of how kinds get admitted (:54–80). The worked session (:82–224) is long and hypothetical.

### Git history (commit bodies)

42. **`git -C ~/src/aat-refactored log --reverse --format='%h %ad %s%n%b' --date=iso`** (about 160 lines once trailers are stripped). The bodies worth reading are these:
    - `dc1a4ec`, `630eb3e`: decisions taken under Joseph's deferral.
    - `2a5b46c`: the spike's claimed landing, which F1, F2 and F5 then cut back.
    - `cef3e9b`: the verifier's summary.
    - `e9c84e6`: status honesty; no claim text changed.
    - `b99d694` and `932af3e`: the slogan removal and the rebuke.
    - `ca363ae` and `ac5ddaa`: the proposal.
    - `533a139`: says outright that the taxonomy justification sweep "has NOT been done".

    The subject lines and timestamps on 09-25 (16:37–20:55) carry the tempo evidence. To see the `d60c511` landing as a diff: `git show d60c511 -- src/the-loop.md`.

---

## Pointers outside the patch that this material leans on

- **ASF `01-aat-core/src/deriv-mismatch-budget-attribution.md`**: Prop. 3 (:68–80) is the exact information-form decomposition whose middle term the spike promoted to the scope. Prop. 4 (:82–92) and its WN :125 are the "open" link to fitness that the verifier closed with the sandwich lemma.
- **ASF `spikes/epistemic-target-ontology/`** (SP-30): the typed target $(\Omega_t, \theta)$, `02-typed-predicate.md` (§2.2–2.3, §5.2–5.3, §7.2, §9), and the GA-1 twin in `01-ga1-verification.md`. Every typed-target move in the rewrite descends from these. They are single-agent there too, apart from the GA-1 twin, which was verified once.
- **ASF `audits/AUDIT-WORKING-731548/`** (the FINAL, `verify/03`, `verify/04`, `verify/05`, and the per-segment reflections): the source of most "unintegrated" items. It is under Joseph's standing gate.
- **ASF `spikes/spike-honest-activation-2026-09-23/03-derivations.md`** R1–R4: the liar and full-control cases behind "three ways to be wrong".
- **ASF `.archive/old-tf-ooda-universal-pattern.md:1030-1054`**: the agent-written source of the slogan (see F7.7 and the aux 05 rebuke).
- **verisectorium RC1** (`theory/influx/segments-model-rc1/`): what `thoughts.md` and the specimen were testing. Its S1–S7 strains and proposed amendments (`thoughts.md:315-323`) are addressed to it.

---

## Feedback on the brief, and adjacent things

- **The brief worked well for this.** The one-line "not a whitelist" framing, the purpose split, and knowing who reads the map next all shaped how I ranked. The only friction was the framing problem in surprise 5: the two purposes mostly share files, so I tagged entries rather than splitting the list.
- **One fact you may want before you read:** the reviewer of phase 1 and of phase 2 is one instance, and all fresh-view agents read `thoughts.md` first. Weigh any "two reviewers agree" claim in these files with that in mind.
- **Adjacent: `HANDOFF.md:31-33`** still says "Verified: … by a de novo reviewer" for a review that found about 50 defects. Two separate agents flagged that word ("exercised", not "passed"). It's the same surface-over-substance shape the second reflection names.
- **Adjacent: aspectus.** On `~/src/aat-refactored/` it rendered `audits/` (an empty directory) as `[empty]`, which is correct. The fresh-view agents reported trailing dots in the lines column (`188.`); I saw the same, though it may be intended formatting. I haven't written to aspectus's inbox, since this brief scopes my writes to this file.

*I'm staying on the line for follow-ups.*
