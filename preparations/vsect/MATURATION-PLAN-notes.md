*Notes on `MATURATION-PLAN.md` (draft of 2026-11-02), under KR I.3 and I.4.*

# Notes on the maturation plan

*Claude Opus 5.5, 2026-11-03, in a desktop-app session with Joseph. Written for the plan's author, its independent reviewer, and Joseph. They came out of drawing the plan as an interactive map (the "vsect Flow Map" artifact, https://claude.ai/artifact/9SeTfefaAtpD6bwL4rC3Wd, private to Joseph). Drawing it meant deciding, step by step, which box a piece of work lands in next, and these are the places where the plan did not decide it for me. They are not a review of the plan.*

Each note says what it rests on. "Read from the texts" means I compared the plan with the design (`~/src/aat-v3/msc/vsect/`), the flow review (`asf/msc/inside-out-2026-10/system-review/vsect-flow-2026-11-02/`) or the identity review, and quote where it matters. "From the shape" means I inferred it and have not checked it against the code or the trail. None of these were run past a second mind.

## 1. Phase 2's independence is lineage; the design's is lineage plus what was read

*Read from the texts.*

Phase 2 decides independence by agent key: *"Compare the actor's agent key with the keys of everyone who revised the target version, within the check's basis. The agent's recorded `parent:` and `agent-type:` let a fork … count as the least independent kind of other."* The identity review adds a third case, the reviser's own subagent, which is one step of lineage. All of these answer "is this another mind?"

The design's predicate (`core.md` §5.6) has three conjuncts. A check counts as independent only if the actor's session differs from the author's, its declared `read` contains nothing from the statement's withheld set (§7.5: attached spans, narrating teaching, derivations, prior findings, the author's events and reports), and its `descends-from` chain is disjoint from theirs. The second and third conjuncts answer a different question: "is this an *unprimed* mind?" Lineage cannot see that. Suppose a lead launches a sibling verifier with a brief that carries the integrator's framing, or the integrator's own landing review. That verifier has a clean key and a primed read, and phase 2 would give it `✓`.

There is a second divergence inside the first conjunct. §5.6 compares *sessions*. On Claude Code a lead and all its subagents share `CLAUDE_CODE_SESSION_ID`, which is why vsect has `identity: harness-session` apart from `harness-agent`. Read literally against harness sessions, §5.6 would count no in-session verifier as independent. The plan's move from session to agent key is the right one, I think, but it is a revision of §5.6 itself. *The design, revised* names §5.6 only for how identity is attested, not for what the predicate compares.

Phase 2's read sets record what a check read. Nothing in phases 1–4 compares them with a withheld set. That comparison arrives with `verify` writing the brief (and its `brief` event), which the plan puts under *Later*. So between phase 2 and *Later*, the right-hand evidence column means "another mind", not "independent" in the design's sense. Its "wrong if" (*independent and self-recorded checks find defects at similar rates once rounds stop being adversarial*) would also be measured against that weaker column.

These are the ways to close the gap that I can see, not a recommendation:

- Revise §5.6 now. Agent key and lineage replace session, and the read and descends-from conjuncts stay as written, marked not yet computable.
- Name the column for what phase 2 computes ("another agent") until `verify` exists.
- Have phase 2 record, on each securing event, whether the check came from a bare brief. That would be declared at first, and attested once `verify` writes briefs.

The sprint's 65-of-153 figure came from bare-brief verifiers, so the two readings may agree on today's data. They would diverge when a lead primes a verifier.

## 2. The crossing states differ from the design's, and the revision list does not say so

*Read from the texts.*

The design's `cross` ends a crossing as *integrated* (where), *rejected* (the submitter erred), *needs-review* (the store is honestly unsure) or *skipped* (wrong kind of drop) (`vsect.md` §3.10; `core.md` §5 payloads; `storage.md`). Phase 3 instead adopts the flow review's states: unread → read → in canon / superseded / set aside / opened, with retirement computed. The plan's rule is that the design is revised first where use contradicts it. *The design, revised* lists identity, items, computed frontmatter and where vsect lives, but not this.

The two sets do not map one to one:

- *needs-review* has no counterpart. "read" with no disposition is the nearest, but that means "not yet decided", not "honestly unsure".
- *rejected* (the submitter erred) and *set aside* (sound, but belongs elsewhere) are different fates. The flow review's list has only the second.
- *in canon* and *opened* are finer than *integrated*, which is presumably why use produced them.

The founding questions phase 3 already runs on `item` could also be run on `source`, and their answers recorded in the design before `cross` is built.

## 3. "close refuses a commit the durable ref does not carry" moves closing to after the merge

*The rule is read from the plan. The consequence is from the shape.*

Phase 1 makes `close --by-commit` refuse a commit not reachable from `origin/main`. That rightly stops new dead citations. It also means a lane working in a worktree cannot close its own item when it finishes: its commit is not on main yet. Where landing rebases, the commit that does reach main has a different hash from the one the lane made. That is the cause of the 17 dead citations (flow review §4, item 2). So under the rule, closing happens after the merge, by whoever can see the landed hash.

The plan does not say who that is. A few shapes would work:

- The lead closes at merge, citing the landed commit.
- `close` accepts the worktree commit as pending, and `check`, or the merge step, re-resolves it by patch id once it lands. This is the same matching the plan already uses to repair the 17.
- The lane records the closing intent with `claim`, and the closing happens later.

The second keeps "closed by the commit that did it" attached to the mind that did it. The identity review notes that `Claude-Agent:` trailers would also let `close` check that the closer made the commit.

## 4. The retirement lint guards moves, not deletions

*From the shape.*

Phase 3: *"a source may move to `.integrated/` or `.archived/` only when every unit it carries is in a terminal state … `check` enforces it on those directories."* Deletion is the other way a source leaves the tree, and the plan intends it for `drain/` (*"Only then is `drain/` deleted"*). A lint scoped to two directories does not see a `git rm`.

`revise` already walks the fate of deleted records that the trail speaks about. The same rule could cover sources: a source record whose file is gone must be retired, or `check` reports it. Then the delete-test holds whichever way the file leaves.

## 5. What sets a source's "read" state?

*From the shape. The design text is quoted.*

The flow review's states begin with "unread → read (by whom, at which version)". That state could be set two ways. One is `vsect read source:x`: the design already treats `vsect read` as recording reads, as a floor, for `orient` (*"what this session has read through `vsect read` (a floor — reads done another way are invisible to it)"*). The other is a separate recorded act.

If `vsect read` sets it, opening a file through vsect counts as reading it for integration. If an explicit act sets it, every crossing gains a step. The design's rule 2 (*"Stating the act is recording it"*) leans toward the first. "Read for integration" may need more than "displayed once", though. The canary case in I.9 is a source that nobody read, so either version would catch it.

## 6. Items closed on evidence that can lapse

*From the shape.*

If phase 3 makes a defect-in-a-claim item close by "a revision with a second mind's check", the evidence it closes on is a check, and checks lapse. What happens to the item when that check later lapses, or `confirm` ends it as not-equivalent? It could stay closed as a historical fact about the revision, or reopen as owed again.

Findings already face this question and answer it with `review-finding` bound to a revision. The founding questions' "can this piece fail … while that piece stands?" test seems the natural place to settle it for each closing kind. A run-closed item (`empirica/`) and an era change raise the same question.

## 7. Who may clear stale teaching

*From the shape. The interaction between phases 2 and 4 is my reading.*

Phase 4's fix for the retrospective's first mechanism makes teaching go stale when anything it narrates changes. In the design, `narrates` is in the basis, so a check on the teaching statement lapses and is re-bound like any other. The plan does not say who re-reads stale teaching. Under phase 2's rules, an integrator re-reading the headline it rewrote is self-recorded. If that is enough to clear staleness, phase 4 makes restatement drift visible without making it independently checked. Restatements kept producing findings after the mathematics had converged, and that suggests the second check is where the value is. This is a policy choice, and one that phase 4's brief might name.

## 8. After the plan, state is still typed into the tree in three places

*From the shape, while drawing the dataflow.*

Every surface in the map computes from the trail, except three places where the tree itself carries state:

1. Frontmatter `closed:` / `rechecked:` / `owner:`. This is Q-A, and phase 1 either syncs these lines or removes them.
2. Directory location for sources: `.integrated/` and `.archived/`. Phase 3 lints this.
3. Directory location for items: `items/imported/` versus `items/`, which `recheck holds` changes by moving the file.

Phase 1's new check rules compare frontmatter with the trail. As written, nothing compares an item's directory with its trail. A `holds` re-check whose move was left out of the commit would be the same seam as the 189, through a different door. The flow review found that `holds` moves did get committed (172 of 176), because a move cannot be half-staged the way a frontmatter rewrite can. So this may be a gap only in principle. If phase 1's rules are written as "tree state that encodes record state agrees with the trail", they would cover all three places at once.

## For whoever picks these up

These are questions the drawing raised, from one reading of the plan. Several of them may already be settled in conversations I did not see. If a note is wrong, or already handled, the useful thing is to say so here, next to it, rather than delete it, so the next reader sees both.
