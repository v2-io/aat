# A working session on AAT v3 — illustrative

*Draft, revised after three de novo audits. The store, ids, versions and counts are invented; no aat-v3 store exists yet. The defects it works on are real and cited to ASF (`~/src/arch/asf/`) at commit `4ee2b89`. Statement versions are shown as `v:` plus a short prefix of their digest; commit ids appear only after "as of". Lines marked **[invented]** are invented words in a real person's mouth and must not be quoted as theirs.*

## Founding

```
$ cd ~/src/aat-v3 && vsect init --name aat-v3 --steward joseph --decider joseph
Founded store "aat-v3".
  .vsect/kinds.yaml   name, steward, decider, store mapping — no kinds of AAT's own declared
  main.outline.md     no parts or chapters: the outline's structure is the steward's to name
  influx/             empty
  CHANGELOG.md        founding entry written
```

`init` declares nothing about AAT — neither its outline nor its kinds. The estate's third founding (verisectorium's deployment #3) found that a founding agent filling in a domain's shape turns its own ignorance into the corpus; kinds are the same kind of shape, and get admitted from evidence later.

```
$ vsect bring --predecessor ~/src/arch/asf/01-aat-core/src/
Brought 173 segments from ASF (at 4ee2b89) into influx, unchanged.
  Their statements will be made as each is carved (vsect new <influx item>): most of
    their tags don't parse as statements yet, and their tag words are mostly standing words.
  ASF findings carried with them: 61, in reports/asf-*.md (from Working Notes "Follow-up
    items" and audits that name a segment) — unplaced until the statements they concern exist
  ASF's status words will be recorded as ASF's own claims (lowest rung) as statements land,
    never as standing here
```

## Arriving cold, a week in

```
$ vsect
aat-v3 · theory store · 9 records, 31 statements · computed as of 1d40be2

Known broken
  (none)

Waiting, oldest first
   1 question for the steward              6d   → vsect for steward
   4 findings not yet disposed of          5d   → vsect findings
 165 influx items not taken in             7d   → vsect influx

Evidence recorded (raw — no standing declared yet)
  derivation   premise checks 6 · drafts 19 · none 6
  imported     primary 0 · recalled 4 · named only 3
```

```
$ vsect next
1. question:typed-target — for the steward (purpose), 6 days.
   segment:agent-environment, segment:action-transition and segment:observation-function
   can't be drafted past their first statements until it's answered.
2. segment:post-causal-structure#coupling-regimes — a finding carried from ASF:
   "nominal" here names a case *inside* the agency scope; segment:scope-agency uses
   "nominal agents" for the case *outside* it.
   (ASF post-causal-structure.md:37; verified 2026-05-29, routed 2026-07-03, not landed there)
3. segment:scope-adaptive-system#exclusion — a finding carried from ASF (audit 731548 B-3,
   adversarially verified): excludes the fully observed MDP with an unknown transition law.
4. 4 statements use an imported theorem not checked at its primary (Pearl's do-calculus ×2,
   Doob–Dynkin, the Kalman filter) → vsect next --imported
```

## A small repair, end to end

The agent renames the coupling regime "nominal" to "query-only" in the file, then:

```
$ vsect revise segment:post-causal-structure
Changed:
  • coupling-regimes  v:9b0e → v:c41a
      Did the meaning change, or only the words? [reworded/redefined] reworded
      → recorded as your claim. Its one earlier check stays with v:9b0e until a different
        mind confirms the change didn't touch it. Brief written: briefs/equiv-coupling-regimes.md
      → the carried finding ("nominal" means opposite things) is marked answered-pending:
        it closes when someone other than you confirms the rename answers it.
  • normative-weighting (new tag): "the model should give more weight to observations
    causally downstream of the agent's actions" — tagged as a norm.
      A norm needs an aim it derives from. Which? (a statement id, or Enter to mark it open)
    >
      → marked open: a norm with no stated aim. Three ASF auditors asked for this sentence to
        be checked against the update-gain derivation; that check is now a question here.
Anything in this edit you're not sure of yet? (Enter to skip)
>
```

## A false statement, shown false

Audit 731548's B-3 finding was verified adversarially before it reached this store. The exclusion statement is false under the definitions as they stand today, whatever the steward decides about the root, so it is refuted now:

```
$ vsect refute segment:scope-adaptive-system#exclusion \
    --by report:asf-audit-731548#B-3 \
    --counterexample 'tabular RL: $o_t = \Omega_t$, transition law unknown'
Refuted, as of 4a91d0e+dirty. Marked in scope-adaptive-system.md, above the statement.
  premise of segment:agent-environment#full-access-vacuous → broken, marked in its file
  narrated by teaching:part-i-front-door                  → stale, marked in its file
What replaces it? > (Enter: leave the gap visible until the root question is answered)
```

Anyone who opens `scope-adaptive-system.md` now — in an editor, on GitHub — meets the mark before the claim:

```markdown
> [!vsect refuted] Refuted 2026-10-29 by counterexample — tabular RL: $o_t = \Omega_t$, transition law unknown. `vsect why segment:scope-adaptive-system#exclusion` (event 9f2c…).

*[Claim (exclusion)]* A system with nothing left to learn is outside the scope, …
```

## The root question, and what its answer does

```
$ vsect read question:typed-target
question:typed-target — for the steward (purpose) — asked 6 days ago

Is the environment's governing law (θ) a named part of what the agent is uncertain about,
beside its state Ω?

In concrete systems:
  A Kalman filter knows its laws but not its state; a tabular RL agent sees its state but
  not its transition law. The adaptive scope should hold both, for different reasons.
Options:
  (1) typed target S_t = (Ω_t, θ): one scope predicate, H(S_t | C_t) > 0.
  (2) the totality reading: say Ω includes the law; a smaller edit.
Evidence that narrows it (imported from ASF, verified 2026-07-04):
  with θ left unnamed and the observation law unknown, the fresh-noise assumption (GA-1)
  is indeterminate — two observationally equivalent housings disagree — so "leave θ
  unnamed" is not an open option. (asf/spikes/epistemic-target-ontology/01-ga1-verification.md)
```

The steward answers. His words are recorded as a purpose statement:

```
$ vsect answer question:typed-target --by joseph --choose 1 \
    --purpose "[invented] Part I is about what an agent can come to know: its state, its world's laws, and what stays chance."
Recorded purpose:part-i-aim (joseph). question:typed-target answered → option 1.
```

The agent then drafts the root as a term group and revises:

```
$ vsect revise def:epistemic-target
definition:epistemic-target
  • typed-target (new) — minted. Declared: definition.
$ vsect revise segment:scope-adaptive-system
  • residual-learnable  v:7e02 → v:f19d   [redefined: now H(S_t | C_t) > 0]
      → 2 statements rest on it as a premise; their checks stop counting:
        segment:scope-agency#cascade, segment:agent-environment#boundary
  • exclusion — gone, and exclusion-learnable is new. What happened to exclusion?
      [retired / renamed / superseded / split / merged] superseded by exclusion-learnable
      → exclusion-learnable minted; the refutation mark comes off with the old text.
      → 1 statement cites exclusion as a premise and should now cite its successor:
        segment:agent-environment#full-access-vacuous
```

Nothing was edited in the two dependents. Their checks stop counting because what they rest on now means something else, and `next` lists them to re-read. (Typing `def:` is fine; vsect answers in the kind's full name, `definition:`, which is what it records.)

## Getting it checked, and the landing rule at work

```
$ vsect verify def:epistemic-target#typed-target
Brief (bare, stage one of two): briefs/verify-typed-target.md
  "Would you do an independent, adversarial check of definition:epistemic-target#typed-target?
   It is given below as it stands at v:3a77, with the statements it rests on; the author's
   discussion of it is not, so that your reading is your own. Re-derive from what is written
   rather than from what you can tell was meant, and test concrete systems against each
   clause. Write your report from briefs/report-skeleton.md to reports/verify-typed-target.md."
  (Stage two — the glosses and discussion, checked against the statement — is written when
   this report is taken.)
```

While the verifier works, the author tightens a sentence: "the structure invariant under the agent's actions" becomes "the invariant structure". Then:

```
$ vsect take reports/verify-typed-target.md
Check C1 → definition:epistemic-target#typed-target, read at v:3a77
    (declared by the report; its quotes occur in that version)
  outcome: confirmed (re-derived; the verifier declares it read only what the brief gave)
  ⚠ The statement is now v:8c15. Its text changed after the check:
      - θ: the structure invariant under the agent's actions
      + θ: the invariant structure
    The check stays with v:3a77. Restore the qualifier, or get the new wording checked.
  Stage two brief written: briefs/verify-typed-target-glosses.md
```

That warning exists because the estate's previous attempt landed a verified statement with its qualifier dropped and kept the word "exact" (`~/src/aat-refactored`, commit `d60c511`). Nobody had to remember to look; the version mismatch is what vsect sees — and it can show the two texts because it kept v:3a77, which was never committed.

The author thinks the shorter wording means the same, and says so:

```
$ vsect revise def:epistemic-target
  • typed-target  v:3a77 → v:8c15
      Did the meaning change, or only the words? [reworded/redefined] reworded
      → recorded as your claim. Brief for a different mind: briefs/equiv-typed-target.md
        ("Is 'the invariant structure' equivalent to 'the structure invariant under the
        agent's actions', as it bears on what C1 checked?")
```

## Committing

```
$ vsect commit -m "Root: typed epistemic target; old exclusion refuted; coupling regime renamed"
Committed 5e7a2c1
  Role: author · Session: <harness session id>
  Read-at: definition:epistemic-target#typed-target@v:8c15, segment:scope-adaptive-system@…
  Pending: 1 rewording awaiting a second mind; 1 check bound to an earlier version
```

## What the session never asked for

No kind was chosen by name, no status typed, no event or link written by hand, no event file opened. Every question vsect asked was about AAT — did the meaning change, which aim does this norm serve, what replaces a refuted statement — at the moment the answer mattered.
