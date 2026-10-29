# vsect — the spec (porcelain first)

*Draft, revised after two de novo audits (2026-10-28). This file is what a user meets: the design rules, what bare `vsect` shows, the verbs, and what the tool asks and refuses. Every noun is defined in [`model.md`](model.md). The contracts underneath — grammar, identity, versions, edges, events, projections, reconciliation, command contracts — are in [`core.md`](core.md), which a user never needs to read.*

## 1. Design rules

1. **The verbs are the work.** Each verb is something the corpus's work already does: orient, read, draft, revise, get checked, take in what was found, ask, decide, bring material in, commit. A verb that exists only to maintain the tool's bookkeeping is a design failure.
2. **Stating the act is recording it.** Doing the work through vsect leaves the record behind. Nobody writes a status, an event or a link entry as a separate chore, and recording is always cheaper than not recording.
3. **Ask only what can't be inferred, when it matters, in the work's own terms** — and every question can also be answered in advance by a flag, so agents without a terminal are never stuck or silently defaulted.
4. **Nothing is hand-set.** No verb, and no file field, sets a status, a level or a standing word. Standing is computed from what has been done, shown with the moment it was computed — and until a store has declared how to compute it, vsect shows the raw evidence instead of any summary.
5. **Evidence belongs to the text it examined, and to the meanings that text leaned on.** A check is bound to the exact version of the statement it read, including the versions of the definitions and premises it rests on. Change either, and the check stops counting until it is redone or a different mind confirms the change didn't touch it.
6. **Nothing waits invisibly.** Every waiting thing — an unplaced finding, an open question, a decision asked for, untaken influx — is shown somewhere a reader will see it, with its age.
7. **The files are an implementation.** A user thinks in statements, records, findings and questions. Files are plain markdown anyone may read or edit; vsect notices edits made outside it and asks to reconcile them.
8. **Absence has three meanings.** *Empty* (looked, nothing there), *failed* (the look broke) and *not run* are kept apart in words and in exit codes.
9. **Three audiences.** Output is written for a person at a terminal, for an agent reading through a pipe, and for a program — and the agent is not served by the program's output (§6).
10. **Refuse plainly, and say what to do instead.**

## 2. `vsect` with nothing after it: the dashboard

Bare `vsect` answers "where does this store stand, and what can I do here?" in one screen, then prints usage. It reads only the store, writes nothing, and exits 0 when it has rendered.

```
$ vsect
aat-v3 · theory store · 41 records, 128 statements · computed as of 7c2e9a1

Known broken
  ⚠ segment:scope-adaptive-system#exclusion — refuted by counterexample (tabular RL agent);
    3 statements rest on it as a premise → marked broken

Waiting, oldest first
  12 findings not yet disposed of          oldest 9d   → vsect findings
   2 findings unplaced                     oldest 1d   → vsect findings --unplaced
   3 rewordings awaiting a second mind     oldest 2d   → vsect next --second
   2 questions for the steward             oldest 5d   → vsect for steward
   1 simulation expired by an era change          → vsect next --stale
  57 influx items not taken in             oldest 14d  → vsect influx

Evidence recorded (raw — this store has not declared how to compute standing)
  derivation   re-derivations 9 · premise checks 22 · drafts 31 · none 66
  imported     primary 4 · secondary 6 · recalled 12 · named only 7
  open findings on 11 statements · declines this week 2 · unassigned truth-apt paragraphs 19

Do next:  vsect next
Read:     vsect read <record>  ·  vsect why <statement>  ·  vsect outline
Work:     vsect new · revise · verify · take · refute · ask · decide · bring · commit
Help:     vsect help <verb>    ·  vsect help model
```

A mind arriving cold sees, before reading anything, what is broken, what is waiting and for how long, and how much has been done to the theory — as counts, never as a graph. Every number is computed; none can be typed.

## 3. The daily loop

[`session-aat.md`](session-aat.md) runs a whole session.

### 3.1 `vsect next` — what is worth doing

A ranked list, each item with why it ranks there and which verb moves it. The default ranking: a broken statement others rest on; findings against statements many others depend on; checks invalidated by an edit, an upstream redefinition or an era change; rewordings waiting for a second mind; questions a pending decision needs; then age. `vsect next --why` shows the rule, which the store can change.

### 3.2 `vsect read <record>` — the record as it stands

The record's text, with marks beside the statements they concern: `⚠` broken or under an open finding (whose, at which version, whether independently checked); `✓` a check that holds at this version; `↻` a check that held at an earlier version and doesn't carry over; `?` an open question here (and its closer). Paragraphs that belong to no statement and sound like claims are marked too.

- `vsect read --bare` gives the text alone (no marks, no Working Notes) for a reader who must not be primed.
- `vsect read --at <version>` gives the text as it was at a version — what a verifier should read.

Designators: an exact `kind:slug` or statement id acts at once. Anything looser ("the agency scope's contrast condition") gets candidates with how each matched, and you choose. In files, links name their kind; a bare slug is never guessed.

### 3.3 Writing: `vsect new`, then edit, then `vsect revise`

`vsect new segment typed-target` creates the record with what its kind requires, from an outline row (so the proposal becomes a file) or an influx item (so the crossing is recorded). Then edit it with anything.

`vsect revise <record>` is the moment an edit becomes part of the store. For each statement it says, in plain words, what changed and what follows:

- **reworded** (you say the meaning didn't change): the old checks show `↻` and don't carry over yet. vsect writes a one-paragraph brief for a different mind — "Is this equivalent to that, as it bears on what was checked?" — and the checks carry over when that answer comes back. Your own judgment is recorded as your claim.
- **redefined**: the old checks lapse, and every statement that leans on this one is flagged, because its checks lapse too.
- **deleted**: findings against it stay open until someone disposes of them. If near-identical text reappears under another name, vsect treats it as a rename and carries the history across.
- **new**: minted, with its declarations asked for if missing.
- **follows influx material closely**: "This paragraph follows `asf/scope-adaptive-system` closely. Did you check it against its source, or carry it as is?"

A finding your revision answers stays open until someone other than you confirms it's answered. And it ends with one free question: *"Anything in this edit you're not sure of yet?"* — an answer becomes an open question on the statement. To record that you looked and chose not to lift something: `vsect revise --decline <statement> "why"`.

### 3.4 `vsect verify` — get it checked by someone else

`vsect verify <statement|record>` writes a **bare brief** for an independent verifier: the statement, a snapshot of its text at this version, where to write the report (in the form `vsect take` reads), and two lines earned by past failures — *re-derive from what is written, not from what was evidently meant*, and *check that every summary says no more than the statement under it*. For scopes and definitions it adds one more: *test concrete systems against each clause*. It shows no prior findings and no author's view, and it names no systems to test — choosing them is the verifier's job.

The brief is printed, or handed to a launcher if the store declares one; vsect doesn't launch agents itself.

### 3.5 `vsect take <report>` — take in what was found

`vsect take` reads a report and attaches each finding to the statement and version it examined. A report written from vsect's skeleton places itself. A free-form report's items become **unplaced findings** — vsect proposes where each might go and how sure it is, and a mind confirms. Nothing unplaced is dropped; everything unplaced shows in `vsect next`. Taking the same report twice changes nothing.

**The landing rule.** If the text changed after the check and before the landing, `take` says so and the check stays with the version it read. This is the guard against the most expensive failure recorded in the estate's previous attempt: a verified qualifier dropped between check and landing, with the word "exact" kept.

### 3.6 `vsect refute` — when something is shown false

```
$ vsect refute segment:scope-adaptive-system#exclusion \
    --by report:audit-731548#B-3 --counterexample "fully observed MDP, unknown transition law"
Refuted, as of 4a91d0e. It reads as broken everywhere it appears.
  premise of 3 statements → marked broken
  narrated by teaching:part-i-front-door → marked stale
  supports 1 statement → its support from this is removed (no threshold crossed)
What replaces it? (a statement id, "no-go", or Enter to leave the gap visible)
```

The ground has to be evidence — a counterexample, a broken derivation, a missed prediction — never authority. A refutation can be contested (`vsect contest`), and a contested one shows both. When a statement was right under old definitions and changes because a definition it leans on was redefined, that isn't a refutation: it's a redefinition, handled by `revise`. `--dry-run` shows the cascade without making it.

### 3.7 `vsect ask`, `vsect answer`, and the steward's queue

```
$ vsect ask "Is θ (the environment's governing law) a named part of the epistemic target?" \
    --closer steward-purpose --why "both readings are coherent; which is right depends on what Part I is for"
Recorded question:typed-target, for the steward (purpose).
```

Without the flags, vsect asks. `vsect for steward` (or `vsect for <decider>`) shows only what needs that person, each with its reason and age, and the count of everything else so it's visible nothing is hidden. Nothing reaches the steward without a stated reason. If evidence already narrows a question, vsect shows that evidence with it.

### 3.8 `vsect decide` — process decisions

Records a decision: who decided and how firmly, its grounds, what would reopen it, who was consulted. A decision made under delegated authority says so and shows as awaiting ratification. In a theory store, `decide` refuses a decision whose content is a claim about the theory, and offers `ask` or a claim instead.

### 3.9 `vsect bring` and `vsect influx` — outside material

`vsect bring <path>` brings material in, with its provenance; nothing in the store leans on it until it lands. `vsect bring --predecessor <path>` brings an earlier corpus (ASF, for AAT v3) along with its findings — they arrive as findings waiting to be placed — and its old status words arrive as what the old corpus claimed, never as standing. `vsect influx` lists what is waiting, grouped by what it concerns, oldest first. `vsect land <item>` records a crossing: landed (where), rejected, needs-review or skipped, with a reason.

### 3.10 `vsect commit`

A git commit that also records, in trailers, the role of whoever acted, the harness session if known, and the versions they read. It refuses while an edit made outside vsect hasn't been reconciled, and names the edit.

## 4. Orientation: `vsect orient`

A store declares what a new mind must read, in what order, whole. `vsect orient` shows that list with what this session has read through `vsect read` (a floor — reads done another way are invisible to it) and ends by inviting a short professio. A store that wants a real gate can use vivarium's stronger precedent: a sealed comprehension quiz tied to the session, required on commit.

## 5. Occasional and maintenance verbs

| Verb | What it does |
|---|---|
| `vsect why <statement>` | its history: every act on it, by version, with who and what they had read |
| `vsect impact <statement>` | what rests on it, and what each kind of change would do to each |
| `vsect findings` | open findings by target, oldest first; `--unplaced` |
| `vsect outline [view]` | the outline with computed columns; `--check` reports rows that disagree with their records |
| `vsect check` | everything that can be checked: edits not yet reconciled, unassigned truth-apt prose, dangling or colliding names, trail damage, items past their clock, typed standing words |
| `vsect reconcile` | walks through edits made outside vsect, one at a time |
| `vsect contest <refutation>` | records a challenge to a refutation, with its ground |
| `vsect lexicon` | generates the lexicon from term-group records |
| `vsect run <experiment>` | runs a declared measurement: a prediction must have been committed first; records code version, parameters, seed and outcome |
| `vsect brief <role> <target>` | a brief for a verifier, auditor or spike, in the estate's peer form |
| `vsect kinds` | the store's declared kinds, each with how it fails and how it is repaired; `vsect kinds propose` starts admitting a new one, with the instances that demand it |
| `vsect init` | founds a store: declarations with name, steward and decider but **no kinds**, an outline whose parts are gaps for the steward to name, an influx, a history layer |
| `vsect recover` | finishes or rolls back a write that was interrupted |

## 6. Output for three audiences

- **A person at a terminal** gets colour and emphasis as an information channel.
- **An agent reading through a pipe** gets the same layout without ANSI: aligned columns, counts, labels with units, and only Unicode marks whose reading has been checked across model families (`⚠ ✓ ↻ ?` are proposed and need that check). The three audiences are Joseph's (2026-10-10); making this the default whenever output isn't a terminal is a proposal recorded with that norm, not yet decided.
- **A program** asks by name: `--format json`, `--format udon`, or `-0`.

Exit codes describe the command, not the store: 0 done; 1 done, with items you should act on; 2 failed; 3 not run, and why (a question it needed answered, an unreconciled edit). Every verb that writes takes `--dry-run`.

## 7. What vsect refuses

- A status, level or standing word on a truth-apt statement, in text or frontmatter: *"Standing here is computed. If you mean 'I believe this derivation closes', say so with `vsect revise` and it is recorded as your claim, waiting for an independent check."*
- Carrying a check across a change without a different mind confirming the change didn't touch it.
- A refutation grounded in authority rather than evidence.
- Closing a finding on its author's say-so.
- Recording a claim about the theory as a decision.
- Guessing a bare slug in a file, or dropping a finding it couldn't place.
- Committing over unreconciled edits.
- Freezing or sealing anything without a recorded decision.

## 8. What comes first

The first version infers nothing about truth. It parses records and statements, reports structural problems (collisions, dangling links, grammar errors, unassigned truth-apt prose, trail damage), shows raw declarations and raw evidence, and renders the dashboard with raw counts. Standing, cascades and ranking come after the store's declarations and the fixtures in `core.md` §14 exist — so that an early tool doesn't quietly become the place the unsettled rules got decided.
