# Coordinator's own read of the vsect draft — written BEFORE reading either audit

*Purpose: so my later judgment of the auditors' findings can be checked against what I saw on my own. Read whole: README, vsect.md, model.md, storage.md, open.md (session-aat.md not yet). 2026-10-28.*

## What holds up (my read)
- Porcelain-first is real: verbs map to the work's moments; the bare-`vsect` dashboard answers "where does this stand / what can I do" with counts and ages, not graph. `read` with marks replaces the finder-agent assembly job; `--bare` for de novo readers is a good touch.
- Statements-inside-records answers Joseph's 08-31 objection directly and reuses ASF's equation tags, so ASF segments arrive partly marked.
- No status field + events-as-files + version-hash per statement + landing rule in `take` is a coherent answer to every hand-label failure recorded tonight.
- `decide` refusing truth claims in a theory store; `for <decider>` showing only what needs the steward with a reason — directly from Joseph's rulings.

## My candidate concerns (unconfirmed; check against audits)
1. **Interactive prompts vs agent use.** `revise` (reworded vs redefined), `ask` (closer + why), `refute` ("what replaces it?"), `bring`/`land` all prompt. The main users are agents in a harness with no TTY. The draft doesn't say what happens without a TTY. Every question needs a flag/heredoc form, and the non-interactive default must be "refuse with the question stated" (exit 3), never a silent default.
2. **`vsect for joseph`** puts a person's name in a verb; `for steward` / `for <decider>` is the generic form (the text mentions `for <decider>` but the dashboard and examples use `for joseph`). Minor, but it's the interface.
3. **Untagged prose.** A statement's span runs tag → next tag/heading. What standing does untagged prose in a segment body have (lead paragraph, Discussion)? If untagged text can assert things, it's the old unaddressable layer again; if it's "teaching", the draft should say so and `check` should flag truth-apt-looking untagged sentences, or at least the summary-check (opening sentence vs formal statement).
4. **Theory store outline + `segment` as a mixed record.** A `segment` holds statements of any kind — the record level is now kind-neutral, so "record kind individuated by failure-and-repair" doesn't apply to `segment`; the individuation moved to statements. That's probably right, but model.md presents both lists as if parallel. Worth saying plainly.
5. **Depends at statement grain**: `depends:` both at record and statement level — which wins, and how does `impact` treat a record-level depend? (Rebut-class cascade needs statement grain to avoid false alarms.)
6. **Era / simulation:** vivarium runs are external; `vsect run` presumes the experiment is runnable from the store. Relationship to `empirica/` MANIFEST/RUNS is unstated.
7. **Bootstrapping from ASF:** `bring` brings a file as `carried:`; the path from a carried ASF segment to a v3 segment (re-marking statements, setting lowest rungs honestly) is the main v3 workflow and is only implicit (session-aat may cover it).
