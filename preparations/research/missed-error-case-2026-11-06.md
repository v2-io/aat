# The missed-error case in ASF: what the record shows

*Written 2026-11-06 by a Claude Fable 5.1 research agent for the Claude session working with Joseph on the v2 engine. Read-only on `~/src/arch/asf` (HEAD `68f68644`). Paths below are relative to `~/src/arch/asf/` unless they start with `~`. "At the tag" means `git show pre-integration-2026-10-30:<path>`. Where I quote, the quoted words are greppable. Where I say "grep", I searched and did not read the surrounding file whole.*

## 1. Short answer

The tags are `pre-integration-2026-10-30` (`4ee2b895`) and `post-integration-2026-10-31` (`aa162d8a`).

The case that fits Joseph's description best is **Prop A.1S(i), the "stopped bound", in `01-aat-core/src/deriv-sector-condition.md`** (Appendix A, `status: exact`, the Lyapunov derivation behind the persistence condition). It was found false on 2026-10-30 by an Opus 5.5 verifier with a bare brief, about 25 minutes after it started, while checking something else. Section 2 has the particulars.

His description does not pick out one case, though. I think his memory blends at least two events in that same segment, and three more sprint findings fit parts of it:

| Case | Segment | Fits | Does not fit |
|---|---|---|---|
| **A. Stopped bound, Prop A.1S(i)** | `deriv-sector-condition` (App. A) | "exact" derivation; "didn't prove what it thought it proved"; passed by Gemini, Codex, Fable and Claude audits; found by Opus 5.5; fixed in the sprint | Not an "iff"; not a scope |
| **B. Persistence "iff"** | `deriv-sector-condition`, Prop A.1 | An "iff"; "prior auditors certified the algebra flawless"; earliest AAT material | Found by **Fable 5** on 2026-07-02 and fixed 2026-07-03, not in the sprint |
| **C. "iff causally sufficient"** | `def-strategy-dag`, `deriv-graph-structure-uniqueness` | An "iff"; false; found by an Opus 5.5 explorer; fixed in the sprint; verified by a second Opus 5.5 | Part II, `status: conditional`, not early |
| **D. Innovation vs estimation error** | `def-mismatch-signal`, `deriv-gain-sector`, persistence family | Very early AAT; a proof that "slides" between two objects; found by Opus 5.5; fixed in the sprint | Not a single false statement; the propositions stood and their reading changed |
| **E. Hard ceiling (F72)** | `deriv-strategic-persistence-hard-ceiling` | `status: exact`, false (algebra error); found by an Opus verifier in the sprint | Part II appendix, written 2026-05-20 |

A and B are in the same file and have the same shape (a statement that outran its proof, under audits that checked the algebra and passed it). A is the one that was "an exact derivation", was found by Opus 5.5, and was fixed in the sprint. B is the one that was an "iff". If I had to guess which he means, it is A with B's word attached. That is a guess; he can tell you.

One thing in his description the record does not support as stated: **"Opus 5.5 immediately saw it" holds for one Opus 5.5 instance in one role.** On the same day an Opus 5.5 explorer read Part I and proposed the exit-time result without flagging (i), and the Fable 5.1 spike author listed (i) as established canon. Section 2.5 has this.

## 2. Case A: Prop A.1S(i), the stopped second-moment bound

### 2.1 What it said before

At the tag, `01-aat-core/src/deriv-sector-condition.md`:

- `:137` "(i) *Stopped bound* — the stopped process satisfies for all $t \geq 0$:" followed by $\mathbb{E}[\lVert\delta(t\wedge\tau_R)\rVert^2] \leq \lVert\delta(0)\rVert^2 e^{-2\alpha t} + n\sigma_w^2/(2\alpha)$, under (A1) and (A2′) on the ball $\mathcal B_R$ only.
- `:147` "(iii′) *Fixed-time tail* — under the mean-square persistence condition (ii), Markov's inequality on the stopped second moment gives…" with stated limit $n\sigma_w^2/(2\alpha R^2)$, called "stationary-sharp".
- `:205` the proof step: "**Stopping-time localization.** … Replacing $t$ with the stopped time $t \wedge \tau_R$ makes the argument valid … The stopped Grönwall bound (i) follows."
- `:260` Epistemic Status: "Proposition A.1S is *exact* in its region-aware form: the stopped Grönwall bound (i), the mean-square persistence condition (ii), the fixed-time tail (iii′), and the finite-horizon sup-bound…"
- `:247` derivation-audit table row: "**Proved**".
- `:353` in Working Notes: "**Prop A.1S non-exit probability (RESOLVED in canon — do not re-open).**" and `:307` the "(iii′)/(iv)/dichotomy" provenance note.

History of the text: the stopped Grönwall form entered in `80b40d28` (2026-04-22, "Prop A.1S region-condition lift succeeds via standard stopping-time localization (Khasminskii 2012 ch. 5)"). On 2026-05-16, `3d582e9b` (Opus 4.7) replaced the old (iii), an infinite-horizon non-exit bound that two audits had found false, with (iii′) and (iv), and wrote "(i)/(ii)/(iii′)/(iv) each exact".

### 2.2 What was wrong, in the finder's words

`spikes/spike-exit-time-model-s-2026-10-30/de-novo-feedback-1.md` §1 (line numbers there refer to the file at `481943e4`, after same-day edits had shifted it):

> "**canon's Prop A.1S(i) stopped bound is false whenever the mean-square condition (ii) holds**, it is jointly inconsistent with canon's own Cor A.1S.1, and the spike's neighborhood map inherited it as fact."

The three-line argument, from the same section: on $\{\tau_R \leq t\}$ the stopped path sits on the sphere, so the stopped moment is at least $R^2 P(\tau_R \leq t)$; Cor A.1S.1 (canon, exact) gives $P(\tau_R \leq t) \to 1$; the bound's right side tends to $n\sigma_w^2/(2\alpha)$, which under (ii) is strictly less than $R^2$.

Where the proof breaks:

> "the decay term carries the indicator: the mass frozen on the sphere does not decay. Replacing $\mathbb{E}[V\mathbf 1_{\{t\lt\tau\}}]$ by $\mathbb{E}[V(\delta_{t\wedge\tau})]$ is the step that is not available, and without it Grönwall does not close. Localization makes A2′ applicable; it does not make the frozen mass contract."

Why nobody saw it:

> "When (ii) fails, (i)'s limit is at least $R^2$ and the inconsistency disappears, which is why the error is invisible until the condition the segment cares about is imposed."

And on the earlier repair:

> "The object the 2026-05-16 cycle retreated *to* fails for the same reason as the object it retreated *from*: both treat the stopped second moment as if the frozen mass decayed. Read literally, (i)+(iii′) re-imply the deleted (iii)"

The verifier gave a Monte Carlo table (OU, $n=2$, $\alpha=2$, $\sigma_w=R=1$: stopped moment 0.927 at $t=2$ against a bound of 0.5) and the script, both inline in §1.

### 2.3 What it says now

`01-aat-core/src/deriv-sector-condition.md` at HEAD (last touched `898104f2`, 2026-10-30; unchanged since the post tag as far as `git diff --stat` shows):

- (i) is the **killed** moment, $\mathbb E[\lVert\delta_t\rVert^2;\ \tau_R \gt t]$. `:157`: "it is not a bound on the stopped moment … the mass frozen on the sphere at exit does not decay, and under (ii) that stopped moment tends to $R^2$".
- (iii) is split: the stationary tail under a *global* sector condition (`:165`), and a composed region-aware tail under a local one (`:169`).
- (iv) is kept, re-derived from "the exact stopped identity" (`:191`–`:195`): "The decay term plays no part in (iv), which is why (iv) survives the correction to (i)."
- `:205` names the unavailable step in the proof and carries the Monte Carlo.
- New **Prop A.1S-τ** (exit time bounded below by the OU benchmark), which is what the spike was for.
- `:359` Epistemic Status: the stopped bound with decay "is *false* under (ii), by three lines from Corollary A.1S.1 … it is not carried."
- `:530` Working Notes: "Regression guard (Model S containment): two objects have been carried here and found false, and neither is to be restored."

Landing commit: `33cfb14c` (2026-10-30 16:29, co-authored Claude Fable 5.1; the accounts call it `a728475f` on its branch). CHANGELOG entry: `CHANGELOG.md:85`–`:87`, "Refuted and replaced (C.1/C.2, item C1; round 2 on A7)".

### 2.4 Who had checked it before, and what they said

Every row is about `deriv-sector-condition`. None of these is a recorded check in the vsect sense; vsect's first version is 2026-10-30. They are audit reflections, adjudications and commit messages. Model names are from each audit's own files unless noted.

| Date | Who | What they said about the stopped bound | Pointer |
|---|---|---|---|
| 2026-04-25 | Audit 584721, Claude Opus 4.7 | "the stopped Grönwall bound holds. Non-exit probability $\leq n\sigma_w^2/(2\alpha R^2)$ by Markov on the steady-state second moment. ✓" and "**Math is sound throughout.**" (This also passed the old (iii), which 742613 broke the same day.) | `audits/AUDIT-WORKING-584721/.integrated/19-deriv-sector-condition.md:39`, `:43` |
| 2026-04-25 | Audit 742613, Codex (per `audits/audit-findings-742613.md:26`) | Found the old (iii) false. On (i): "Prop A.1S's stopped mean-square bound is plausible" and "The stopped bound can remain". FINAL: "Repair options: state only the stopped bound…" | `audits/AUDIT-WORKING-742613/.integrated/24-deriv-sector-condition.md:28`–`:29`; `audits/.integrated/audit-742613-FINAL-2026-04-25.md:90`, `:121` |
| 2026-04-25 | Audit 613842 (model not named in the files I read) | Same finding on (iii); treats the stopped bound as the sound part | `audits/AUDIT-WORKING-613842/07-finding-verification.md:49`, `:72` |
| 2026-04-28 | Audit 829314, Gemini | "the stopping-time localization at $\tau_R$ is a highly mature and exact application of Khasminskii (2012)" | `audits/AUDIT-WORKING-829314/.integrated/70-deriv-sector-condition.md:7` |
| 2026-04-30 | Audit 193847, Gemini | Poked the isotropic-noise assumption and the PID classification. Nothing on the stopped bound. | `audits/AUDIT-WORKING-193847/.integrated/59-deriv-sector-condition.md` |
| 2026-05-10 | Audit 451729, Claude Sonnet 4.6 | "Correct stopping-time localization for the stochastic case"; "Highest value of any segment I've read." | `audits/.integrated/AUDIT-WORKING-451729/01-batch-06.md:18`, `:179` |
| 2026-05-16 | Adjudication 628401, Claude Opus 4.7 | "The *stopped bound* (i) and the *mean-square persistence* (ii) are fine — the defect is localized to (iii)" | `audits/.integrated/ADJUDICATION-WORKING-628401/adjudication.md:218` |
| 2026-05-16 | Adjudication 704182 ("independent co-owner pass"; model not named in what I read) | Judged the old, false (iii) "**correctly closed by strengthening**", on the day it was being replaced. A second passed-while-false record, on the neighbouring claim. | `audits/.integrated/ADJUDICATION-WORKING-704182/adjudication.md:280`–`:284` |
| 2026-05-16 | Landing commit, Claude Opus 4.7 | "(i)/(ii)/(iii′)/(iv) each exact" | `git show -s 3d582e9b` |
| 2026-05-20 | Extraction digests, Claude Opus 4.7 | "**First-hand verified extensively**"; "**Cascade verified clean**": consumers now use "the stopped bound / mean-square threshold / fixed-time tail" | `audits/audit-findings-742613.md:95`–`:107`, `:593`; `audits/audit-findings-613842.md:81`–`:93`, `:338` |
| 2026-05-27 | Audit 384279, Claude Opus 4.7 | Lists "Khasminskii 2012 stopping-time localization" among external citations spot-checked. No per-segment note on this file in its dir. | `audits/audit-384279-FINAL-2026-05-27.md:151` |
| 2026-05-28 | Audit 773921, Gemini 2.5 Pro | "they are textbook-perfect"; "**7. What would I change?** Nothing." | `audits/AUDIT-WORKING-773921/.integrated/31-deriv-sector-condition.md` |
| 2026-07-02 | Audit 731548, Claude Fable 5 | "stopping-time localization legitimate (optional stopping on $L^2$-bounded martingale) ✓", under the heading "All four pre-registered checks executed; math verified first-hand." This is the audit that found case B in the same file. | `audits/AUDIT-WORKING-731548/25-deriv-sector-condition.md:7` |
| 2026-07-20 | Audit 374162, Claude Fable 5 | Its quiz answer key gives the stopped second-moment bound as one of the "three guarantees that *are* available" | `audits/.integrated/AUDIT-WORKING-374162/05-batch-tempo-sector-quiz-answers.md:49` |
| 2026-07-20 | Audit 628417, Grok 4.5 | No mention of the stopped bound found by grep. Not read. | `audits/AUDIT-WORKING-628417/` |
| 2026-09-25 | aat-reboot supplements, Claude Opus 5.5 | Mentions Prop A.1S only for "needs white noise". By the sprint's own map these 17 files run from the introduction to `der-action-selection` and do not walk Appendix A; I did not verify that. | `audits/aat-reboot-aux-supplemental/00-introduction.md:20` |

Two things about this record that the table does not show:

- The checks that passed (i) mostly verified a *different* thing: that the Itô correction, the Grönwall algebra and the optional-stopping step are each legitimate. Each is. The false step is the unstated identification of the killed moment with the stopped one, which sits between them.
- The 2026-04-25 audits that found the neighbouring (iii) false **recommended (i) as the safe fallback**, and the May repair then relied on it. After that, the segment's own Working Notes told later auditors "RESOLVED in canon — do not re-open", and Fable 5's July reflection says of this segment "this segment pre-answered my strongest planned attack" (`25-deriv-sector-condition.md`, "Wandering thoughts", *Three*).

On "Gemini-Argon": I found no audit of asf under that name. The only occurrence I found anywhere is Joseph's own message of this week about `agy` using "Gemini-4/Argon" (`~/src/aat-v3/preparations/research/joseph-messages-2026-10-28--11-05.md:27`), which is about aat-v3. Asf's Gemini audits are 829314, 193847 and 773921 (Gemini 2.5 Pro).

### 2.5 How it was found

- **Who and role.** An independent verifier of a *spike*, not an auditor of the segment. vsect records the actor as `c1-spike-verifier`, role `independent-verifier`. The file says "by an Opus verifier with a bare brief"; the commit that added it, `e0f80afb`, carries `Co-Authored-By: Claude Opus 5.5`. So the model is Opus 5.5 by commit trailer, not by the record of the act.
- **What it was doing.** Checking `spikes/spike-exit-time-model-s-2026-10-30/` (by Claude Fable 5.1, `56fc3178`), a new result on *when* the mismatch leaves the region. That spike came from the owner review's Part I explorer (Opus 5.5), item C1 in `msc/inside-out-2026-10/owner-review/integrator-items.md`.
- **Timing.** The spike's last commit is 15:13 MDT. The verifier's file says it started at 15:27. Its commit is 15:50.
- **Its own account of why it looked.** `de-novo-feedback-1.md` §8: "The bare brief worked. 'Re-derive from what is written rather than from what you can tell was intended' is what sent me back into Prop A.1S's localization paragraph instead of accepting it as the spike's background." And on the spike author's miss: "The miss is in the neighborhood map. It read Prop A.1S as settled … the spike's Monte Carlo already shows $P(\tau_R \leq 2) = 0.91$ at $\kappa = 2$."
- **Same day, same or newer models, not seen.** `spikes/spike-exit-time-model-s-2026-10-30/01-neighborhood-map.md:17` (Fable 5.1) lists "stopped second-moment bound" as what canon holds. `msc/inside-out-2026-10/owner-review/explorers/part-i.md` (Opus 5.5) proposes the exit-time result at §8 and has no mention of the stopped bound (grep). An A7 integrator and an A7 verifier (both Opus 5.5) also recorded confirmed checks on this segment within the same hour, on a different criterion (`vsect why segment:deriv-sector-condition`, acts at 21:12Z and 21:54Z; the breaking check is recorded at 21:56Z).

What the finder had that the others did not, as far as the record shows: a new true statement about exit times sitting next to the old one, and a brief that asked it to re-derive what was written. Joseph's "something in his most recent training" is not something the record can confirm or refute.

### 2.6 Was it independently confirmed

Yes, three times, by three different minds, all recorded:

1. **Integrator re-derivation**, Claude Fable 5.1 (Part I round-2 integrator): `reviews/part-i-round-2-integration.md` C1, with its own exact-discretization Monte Carlo (8000 paths; stopped 0.74 at $t=1$, 0.995 at $t=4$ against 0.5). Script and output in `msc/inside-out-2026-10/part-i-round-2.md`, `recheck.py` §5.
2. **Independent check of the landing**, Claude Opus 5.5 (Part I round-2 checker): `reviews/part-i-round-2-check-1.md` C1, criterion "Prop A.1S(i), the killed second-moment bound, holds under (A2') on the ball, and a stopped-moment bound with the decay term is false under (ii)", outcome confirmed (`vsect why`, 22:58Z).
3. **Outside assessment**, Claude Fable 5.1 with no part in the day: `msc/inside-out-2026-10/tag-vs-now-assessment-2026-10-31.md`, "Killed versus stopped moment … The correction is right, and it was a real error in the tag's `exact` appendix." (Copy at `~/src/aat-v3/preparations/asf-sprint-2026-10/tag-vs-now-assessment-2026-10-31.md:43`.) This one is prose only; the retrospective says its criteria "are not yet recorded in vsect".

The original breaking check is `reviews/c1-exit-time-verify-1.md` C1 (outcome `broken`, bound to `481943e4`). `vsect read segment:deriv-sector-condition` shows it today as "⚠ rederive broken by c1-spike-verifier … broke an earlier text; stale: own text changed". Every check on the segment is currently marked lapsed for the same reason.

### 2.7 What else changed because of it

From the body of `33cfb14c` and `CHANGELOG.md:85`–`:87`. I read the commit message and the changelog, and spot-read `deriv-sector-condition` itself; I did not open each downstream segment.

- **Same defect elsewhere:** `#result-contraction-template` CT-S (the same stopped-Grönwall shape in a weighted metric) became a killed moment.
- **Consumers re-read:** `#result-sector-persistence-template`, `#result-sector-condition-stability` ("Two kinds of guarantee" became three: scale, tail, time), `#deriv-stochastic-non-exit` (including a "well inside" sentence that was wrong), `#impl-persistence-and-limits`.
- **The role of the new result changed.** The exit-time comparison was written to sit *beside* A.1S. The verifier's finding made it the *replacement*: "it is the only region-aware Model S containment statement canon would have that is true" (`de-novo-feedback-1.md` §1). It landed as Prop A.1S-τ.
- **A headline moved.** `01-aat-core/INTRODUCTION.md` headline 2 became "Containment Dichotomy, with a clock". The clause "structural adaptation is *generic, not exceptional*" was narrowed everywhere to "loss of the parametric certificate is generic; whether it forces model-class change is open".
- **Two status signals were deleted** from Working Notes: the provenance note and "the off-ramp 'RESOLVED — do not re-open' over the very package found broken" (`CHANGELOG.md:87`).
- **Left open by name:** `#result-adversarial-exponent-regimes` (whether $b = 3/2$ rests on the local stopped bound) was "unchecked" by the verifier and "not re-derived" by the integrator.

**Residue I found that the sprint did not touch** (grep only): the Fable 5 quiz corpus still teaches the stopped bound as a correct answer, at `audits/.integrated/AUDIT-WORKING-374162/05-batch-tempo-sector-quiz-answers.md:49` and in `msc/quiz-responses/quiz-40*.md`. The sprint's own map calls that corpus "the closest thing the project has to a test suite for comprehension". The prior audit files in 2.4 are also unchanged, which is right for a record, but nothing links them to the refutation.

## 3. The other cases, with pointers

### B. The persistence "iff" (July, not the sprint)

- **Claim:** Prop A.1 closed with "the agent persists iff $\alpha \gt \rho/R$". The only-if was never proven and is false for a general fixed corrector.
- **Found by:** audit 731548, Claude Fable 5, 2026-07-02, finding B-1: `audits/audit-731548-FINAL-2026-07-02.md:43`, "verified REAL-AND-OPEN, not a regression", after a six-verifier round.
- **Prior record, in the changelog's words:** "the finding contradicts heavily-audited canon (prior auditors certified the algebra 'flawless' — correctly; the defect is quantifier-register)" (`CHANGELOG.md:286`).
- **Fixed:** `d69ac271` (2026-07-03), Lemma A.1N: sufficiency, class-level necessity, and an agent-level iff only under a radially tight sector. This is the regression guard you saw in `impl-persistence-and-limits`.
- **Sprint connection:** restatements of the old iff survived in the front door until the sprint (the Part I figure caption at `01-aat-core/OUTLINE.md:13`, fixed in `9e3ec279`).

### C. "AND/OR propagation is correct iff the DAG is causally sufficient"

- **Before (tag):** `01-aat-core/src/def-strategy-dag.md:82`, "computes correct probabilities **if and only if** the strategy DAG is causally sufficient"; `:167`; `deriv-graph-structure-uniqueness.md:109`, "the *same condition*". `git log -S` shows that sentence present since at least the 2026-04-16 directory rename.
- **Finder's words:** Opus 5.5 Part II explorer, `msc/inside-out-2026-10/owner-review/explorers/part-ii.md:119`–`:127`: "This is false. Forward propagation multiplies the parents' *marginal* statuses…", with a three-node counterexample and the observation that the corpus's own `example-L1.md:56` is the same case.
- **Now:** exact for all credences iff every ancestor has exactly one directed path to the node; at the root, iff the DAG is an AND/OR tree. Commit `33bf185d` (Opus 5.5); the segment was renamed `deriv-graph-structure` in `471aa7ce`.
- **Confirmation:** an Opus 5.5 verifier with a bare brief re-derived both directions over about 3,000 random graphs, asked for five wording repairs and a minor sixth, found an adjacent overclaim in Step 3(d), and proposed a strengthening: `msc/inside-out-2026-10/owner-review/A1-verify-1.md` (this is the file you guessed at; it belongs to this case). Fable 5.1's outside assessment also re-derived it.
- **Prior record:** by grep, no audit at the tag contains "polytree", "reconverg" or a challenge to the iff. Several praised the cluster: "The 'Correlation Hierarchy' discussion is a mathematical tour de force" (193847, Gemini, `audits/AUDIT-WORKING-193847/.integrated/34-def-strategy-dag.md:11`); Fable 5 called `deriv-graph-structure-uniqueness` "the sufficiency-vs-necessity exemplar" (`audits/audit-731548-FINAL-2026-07-02.md:126`). There are per-segment notes on `def-strategy-dag` in 193847, 266847, 361742, 526815, 584721, 773921, 829314, 849201, 963715 and 471203; I did not read them.

### D. "Mismatch" named two objects

- **Finder's words:** Opus 5.5 terminology explorer, `msc/inside-out-2026-10/owner-review/explorers/terminology.md:27`: the bridge proof "starts from 'innovation $\delta = o - \hat x$', then proves the sector condition for the *estimation error*". It adds "I have not traced how much downstream depends on the conflation".
- **What the integrator then found** (Opus 5.5, `481943e4`): the conflation "hid a term". Every correction feeds channel noise into the estimation error, so "faster adaptation improves persistence" was false for gain raised past the optimum. At the tag, `deriv-gain-sector.md:34`–`:42` already displays the $-K\varepsilon$ term and then drops it by taking the "expected correction". Account: `msc/inside-out-2026-10/c1-lanes/part-i-mismatch-lineage.md`.
- **Knock-on:** `#deriv-persistence-cost` (the "Kalman–Bucy saturates" claim "compared two different distortions", and an algebra slip that a 2026-05-30 Working Note had marked "RESOLVED"). The independent check, `c1-lanes/part-i-check.md` (Opus 5.5), then found the persistence condition becomes a window of gains.
- **Prior record:** my grep of the audits for the innovation/estimation-error distinction found nothing. The pattern was narrow, so that is weak evidence of absence.

### E. The strategic-persistence hard ceiling (F72)

- **Before:** `deriv-strategic-persistence-hard-ceiling.md`, `status: exact`, added `9054e9ff` (2026-05-20): a cap at $\rho_\Sigma \lt R_\Sigma/2$.
- **Finder:** an Opus verifier, `3f9e732f` (2026-10-30): "the strategic-persistence hard ceiling is false (algebra error, not convention)". Record: `reviews/f72-hard-ceiling-verify-1.md`, outcome `broken`.
- **What the prior record held:** a 2026-05-31 spike had reached "verdict B, convention-dependent", and `JOSEPH-TODO.md:32` at the tag said "take adjudication verdict B as settled (name the convention, keep `status: exact`)". The pending decision would have kept the false result.
- **Now:** segment deleted; Prop B.1F in `#deriv-edge-credence-dynamics`; new `#deriv-evidence-allocation-ceiling`.

### Not a fit, for completeness

`scope-adaptive-system` (your first guess) was rewritten in the sprint, but its defect (the scope excludes tabular RL) was found by Fable 5 on 2026-07-02 (731548 B-3) and sat as SP-30 until the sprint. It was a known, unlanded finding. The items (a)–(h′) are new sprint text.

## 4. What I could not find or confirm

- **Which case Joseph means.** Section 1 is my reading of fit.
- **Who launched the case-A verifier and the text of its brief.** I have only the verifier's quotation of one sentence from it.
- **The model behind `c1-spike-verifier`** other than by commit trailer. The sprint predates per-agent identity (2026-11-02).
- **Any Gemini-Argon audit of asf.**
- **Any audit before 2026-10-30 that questioned the stopped bound.** I found none. This rests on grep across `audits/` at the tag plus whole reads of six per-segment reflections (193847, 584721, 731548, 742613, 773921, 829314). I did not read 526815's 258-row ledger, 628417, 963715, 471203 or the 374162 reflections.
- **Whether the pre-sprint Working Note was right that 829314 flagged the old (iii).** The 829314 reflection I read does not; its FINAL may. Not checked.
- **Joseph's own earlier reading of (i).** Nothing in the repo records one either way.
- **The downstream edits themselves.** I relied on the commit message and changelog for 2.7.
- **Model names for 613842 and adjudication 704182.**
- The sprint's own maps disagree with the audits' files on two auditor identities (584721 is Claude Opus 4.7 by its FINAL, 742613 is Codex by its digest; `internal-surfaces/audits-working-dirs.md` §8 has them the other way round). I used the audit files.

## 5. Notes for the model, offered as a reader's observations

These are mine and are not findings about the record.

- In case A the passing checks and the breaking check answered different questions about the same proposition. Most passes verified steps of the proof. The break tested the statement against a neighbouring result. A record that says only "checked, passed" would not distinguish them.
- Two of the passes were not neutral: the audits that broke (iii) named (i) as the safe fallback, and the repair leaned on it. A refutation of one claim acted as support for its neighbour without anyone checking the neighbour.
- A "RESOLVED — do not re-open" note sat over the false statement for five months, and one later auditor said the segment had pre-answered its attack.
- The error was found as a side effect of verifying a *new* claim placed next to the old one. No check of (i) itself was ever scheduled.
- "The same model saw it immediately" is true of one instance with a re-derive brief and false of at least one other instance of that model the same morning.
