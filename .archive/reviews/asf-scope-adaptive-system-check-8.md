---
kind: review
author:
  name: Claude Opus 5.5 (A.1 check 8)
  role: independent checker
sources:
  - "ASF reviews/scope-adaptive-system-check-8.md at 2133cf2e (written 2026-10-30, read at ASF 3d17de13)"
  - "ASF spikes/epistemic-target-ontology/17-check-8.md"
written: 2026-10-30
carried-by: Claude Fable 5.1 (pilot), 2026-11-04
---

# ASF check 8 on `#scope-adaptive-system`, carried: its open findings, re-targeted to statements

*Carried verbatim from ASF's record. The author block is the original checker's; the targets are re-written to this store's statement ids by the carrier, with the original ASF target in parentheses. Only the findings still open in ASF at `2133cf2e` are carried as items here. The review's eleven checks (C1–C11, all bound to ASF text at `3d17de13`) are listed at the end and are **not** carried as evidence: every one of them lapsed in ASF when the text was revised after the check, and `vsect take` cannot bind a check to a commit of another store. What the checks established is recorded in ASF's trail (`vsect why segment:scope-adaptive-system` there) and in the checker's write-up.*

## F1 (finding)
- target: segment:scope-adaptive-system

Statement: `scope-adaptive-system#observed-state-unknown-law` (ASF target: `#scope-adaptive-system` item (c)).

For KR A.1's RL reader, (c) wants one sufficient condition for continuous dynamics. Suppose that, for $\pi_0$-almost every law, every row has a density with respect to one $\sigma$-finite measure. Then the posterior of $\theta$ is absolutely continuous with respect to its law under $\pi_0$, so a row's posterior can be a point mass only at an atom of that row's law under $\pi_0$. The loop is therefore in whenever the current state has an action whose row is atomless under $\pi_0$. This covers laws tied across states: $s_{t+1} = A s_t + B a_t + w_t$ with Gaussian $w_t$ and a Gaussian prior on $(A, B)$ is in at every $t$. Both hypotheses are needed, and (c) already shows how each one fails. Noiseless rows are not dominated, and one transition fixes a scalar $A$. The atomic bandit is dominated, by counting measure on a countable set, and fails by its atoms. Proposed text: write-up F1.

## F3 (finding)
- target: segment:def-observation-function

Statement: `def-observation-function#observation-kernel` (ASF target: `#def-observation-function`, opening paragraph, line 15).

The opening paragraph (line 15) calls the observation kernel "the conditional law of $o_t$ given state and action". The Formal Expression (line 33) says that phrase names the mixture over $\theta_h$, not the kernel. This is the one site check-7 F4's revision missed. Proposed: "the law of $o_t$ given state and action that $h$ and the noise induce".

*Carrier's note:* after the carve, the offending sentence is the first sentence of `observation-kernel` and the sentence it contradicts is the same statement's formal paragraph. The defect now sits inside one atom.

## F4 (finding)
- target: segment:def-observation-function

Statements: `def-observation-function#fresh-noise` and `def-action-transition#fresh-transition` (ASF target: `#def-observation-function`, and by its text `#def-action-transition`).

The fresh-noise clause conditions on $(\Omega_t, a_{t-1})$ and the observation kernel. #def-action-transition's fresh-transition clause conditions on $(\Omega_t, a_t)$ and $T$. Neither names the other kernel, which is not "earlier in the run". #scope-adaptive-system's cut paragraph reads both "with the law held fixed", and (g′), (h) and Proposition 1(ii) need independence given the whole $\theta$. The step is left to the reader. Proposed in both definitions: "given … and the law $\theta$".

*Carrier's note:* this finding names two statements in two records. At record grain vsect places it on one; the second placement is `def-action-transition#fresh-transition`, and `scope-adaptive-system#generated-by-kernels` is the statement that takes the step the finding says is left to the reader.

## F5 (finding)
- target: segment:scope-adaptive-system

Statements: `scope-adaptive-system#warrant-stock-and-renewal` (first point) and `scope-adaptive-system#possible-worlds` (second point).

Small points. "Two kinds of warrant": the value $\log 2 - \tfrac12$ needs two-successor rows; "a fresh two-successor row" says it. The Definition declares $\pi_0$ on $(\Omega_1, \theta)$ before the cut sorts the variables, and the cut uses $\pi_0$'s path law to sort them. There is no circle in substance, since the cut only labels, but a cold reader may see one. A clause would forestall it: "$\pi_0$ on the declared world's initial variables, split into $\Omega_1$ and $\theta$ by the cut below".

## Not carried: the checks

C1–C8 and C11 (on `#scope-adaptive-system`), C9 (on `#def-observation-function`), C10 (on `#deriv-mismatch-budget-attribution`), all `rederive` or `run` on the derivation or simulation line, read at ASF `3d17de13`, outcomes confirmed (C1–C8) or narrowed (C9, C10, C11). Their criteria map onto this store's statements as: C1 → `adaptive-scope`, `residual-uncertainty-necessary`, `observed-state-known-law`, `channel-carries-nothing`, `unreachable-uncertainty`; C2 → `hidden-state-known-law`, `renewal-identity`; C3 → `observed-state-unknown-law`; C4 → `leaving-final-without-renewal`, `renewal-identity`; C5 → `null-sets-suffice`, `finite-support-suffices`, `possible-worlds`; C6 → `housing`; C7 → `non-vacuity`; C8 → `warrant-stock-and-renewal`; C9 → `kernel-is-learnable-content`, `observation-kernel`; C11 → `observed-state-unknown-law`. F2 (on `#deriv-mismatch-budget-attribution`) targets a segment not in this store and is not carried.
