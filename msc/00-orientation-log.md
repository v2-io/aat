# Orientation log — AAT v3 refactor (first coordinator, Opus 5.5, from 2026-10-28)

*To a successor, who will arrive cold, possibly after my context ends: this file is the running trail of what I read, in what order, and what struck me — so you can skip re-finding things, but not skip reading them. Where I record a judgment it is mine and may be wrong; where I quote Joseph or a file it is verbatim. Companion files in this dir hold topic notes (see the index at the bottom).*

## The ask (Joseph, 2026-10-28, verbatim)

> I tried to start to do a full refactor of AAT (in ASF) a few weeks ago but it failed. I played it kind of loose but it turns out it really needs the right discipline from ASF from the very beginning. That's where you come in, if you're willing and ready. I basically am going to want you to get a good feel for ASF's full workstream -- all of its SoPs and FORMAT and look at the segments and backlogs, audit area and spike area and segments and outlines... Then have a look at verisectorium -- all around but then in particular the template/ and theory/influx/segments-model-rc1/ primary stuff. Then, finally-- udon/v2/spec-lite-0.1.0/ (getting close to final- ignore the current volatility of the typing system/syntax). It's a lot-- you'll probably need to collect thoughts as you go in a way that can be used by a successor when you hit your context limit at some point-- saving them significant search etc. These three things are much bigger than you might think at first-- do not underestimate. Go ahead and get your own intuition for what's there in the three places (etc.) -- then go ahead and launch any agents to go over directories and files rather thoroughly and recommend to you the files+spans that you should focus on. Do not run them for their summaries, do not run them to comprehend for you, and don't let them say "don't read" something-- they just give you the directories/files/line-spans in priority order-- not a whitelist/blacklist... Then you get to do the rest, while accumulating your own notes (in as many files as you want), here in msc/...

## Locations

- This repo: `~/src/aat-v3/` (remote `github.com/v2-io/aat`), one commit at start (README "Version 3.0 Refactor").
- ASF: `~/src/arch/asf/` (remote `v2-io/agentic-systems`). Orientation = `doc/sop/agents.sop.md` (= CLAUDE.md). Project memory at `~/.claude/projects/-Users-josephwecker-v2-src-arch-asf/memory/MEMORY.md` (does NOT auto-load from here — read it).
- verisectorium: `~/src/arch/firmatum/verisectorium/`.
- udon: `~/src/arch/firmatum/udon/` (spec-lite at `v2/spec-lite-0.1.0/`, ~499 files, ~66K lines).
- **The failed prior attempt: `~/src/aat-refactored/`** (created 2026-09-25 as `~/src/aat-reboot/`; renamed 2026-09-29; 76 commits; last 2026-09-29). Joseph didn't name it in the ask; found via ASF memory `project_aat_reboot.md` (which still has the stale `aat-reboot` path).

## Reading trail

1. `aspectus` on aat-v3, arch (asf / verisectorium / udon depth 2).
2. ASF `doc/sop/agents.sop.md` — whole.
3. ASF project MEMORY.md — whole (index only; detail files not yet opened).
4. aat-refactored: HANDOFF, OUTLINE, scratch/PROCESS, scratch/RETRO, both reflections — whole.

## What the failed attempt teaches (my reading, 2026-10-28)

- Method was: walk ASF Vol 1 in outline order; finder agent per segment (aux report of everything around it); cold-read note before aux; intermediate note; rewrite drafts in `src/` with "formal layer (authoritative) + delivery layer". Got through units 00–16 in one day (09-25).
- 09-29: Joseph — *"The idea that it just needed a clarity rewrite is, I think, largely proven to be untrue"*; *"since this is no longer a refactor for clarity but rather a foundation-refactor-- it's also the perfect and probably most appropriate opportunity to apply what we can of verisectorium's thinking"*; *"I think that SoPs are a critical 'atom' of this new project"*; agents in a new project show *"way too much deference to me"* vs ASF agents who treat the theory as owned by Truth.
- Second coordinator's distilled failure shape: **"a surface claims more than what's under it"** (slogan in headline slot; "Verified" line over a review with ~50 defects; `status:` set in opposite directions; "sealed" taxonomy nobody looked at). And: *"When Joseph points at two or three things, he's showing you a kind of problem. Sweep for the kind."*
- The misattributed slogan ("a representation that can be wrong in a way that matters") — agent-origin, attributed to Joseph, used as warrant for a formal clause. Joseph: *"Anything that is asserted in AAT that rests on who stated it is garbage, IMO."*
- Speed: 16 units in a day; drafts carried many single-agent unverified claims (marked). Ch.1 never revised against its de novo review.
- Still to read there: `scratch/PROPOSAL-2026-09-29-foundation-and-sops.md` (the ASF→RC1 mapping — directly bridges to verisectorium), `spikes/fresh-view-2026-09-29/*` (esp. taxonomy-audit, thoughts), the vsect sketches, MODEL.md, rewrite-thoughts.md, the review/verify spikes, the intermediates.

5. ASF: `doc/sop/` all except naming pair (agents, format, sop-creation, audit index, routing, de-novo, spikes, multi-agent, git-hygiene, build-pipeline stub); `01-aat-core/OUTLINE.md`; `INTRODUCTION.md`; `src/def-agent-environment.md`; PRACTICA; JOSEPH-TODO; audits README + STATUS; headings of TODO/PROPOSALS — whole unless stated.
6. verisectorium: README, CLAUDE, PRACTICA.ud, CHANGELOG, theory/sop/ORIENT, all of template/ incl. its 9 symlinked theory segments, every .md in segments-model-rc1/ — whole.
7. udon spec-lite-0.1.0: main.outline.md, sop/main.outline.md, .int/README.md, .int/HANDOFF-2026-10-22.md, .int/vsect-requirements-on-lite.md, .vsect/kinds.yaml — whole. Confirmed no vsect tool exists anywhere (2026-10-28).
8. **Launched 7 span-finder agents (2026-10-28 ~20:00 MDT)**, each writing a priority-ordered `path:start-end` map (not summaries; not a whitelist) to `msc/maps/`: `asf-process-and-history.md`, `asf-vol1-theory.md`, `asf-audits-and-spikes.md`, `verisectorium.md`, `udon-spec-lite.md`, `aat-refactored.md`, `joseph-words-and-estate.md`. Briefs: peer voice, Joseph's words on what a map is, read-only boundary, stay-on-the-line. If a map file is missing, the agent may have returned it as text — check the session.

## Index of companion notes in msc/

- `00-orientation-log.md` — this file: the ask, locations, reading trail, the failed attempt.
- `10-asf-workstream-notes.md` — ASF SOP layer, seams, disposition doctrine, theory shape, backlogs.
- `20-verisectorium-notes.md` — template (whole) + RC1 (whole) + first-pass RC1↔AAT mapping.
- `30-udon-spec-lite-notes.md` — why lite matters (the pipeline), lite's contract, spec-lite as a verisectorium deployment, its SOP store.
- `40-emerging-picture.md` — my own synthesis-in-progress and open questions (hypothesis register).
- `maps/` — the finders' span maps (reading plans, not content).

### aat-refactored `scratch/PROPOSAL-2026-09-29-foundation-and-sops.md` (read whole, 419 lines) — the bridge to RC1

Status in its own words: "proposed. Nothing here is decided." Key moves (my compression — read the primary; it's the most important single file in aat-refactored):
- Problem: agents who don't remember each other rebuild AAT, so "the corpus itself has to say, for every statement in it: what kind of statement it is, how well it has been established, and what has actually been done to check it ... in a form a newcomer can trust *without trusting whoever wrote it*." ASF's `type:/status:/stage:` labels went wrong; RC1 (`verisectorium/theory/influx/segments-model-rc1/`) "has never been used on a real corpus"; aat-refactored proposed to be its first test.
- 8-point picture: names-for-every-assertion, records-only-when-needed (lazy); author declares form/ground/ceiling, never hand-writes established-ness; events naming the exact text version examined ("Evidence counts only for the text it examined"); projections computed, not typed; 5 change cases (refuted / weakened / **redefined** (RC1 lacks it) / purpose revised / no-go escaped); nothing gets standing from who endorsed it (formulations + purpose statements); questions as records with closers (agent-open default / awaiting-ground / steward-fact / steward-purpose); teaching describes, never supports.
- Census evidence: `der-recursive-update` status went exact → conditional → exact with Epistemic Status word-for-word unchanged — `status:` was a hand-kept summary readers set differently.
- 26-kind taxonomy draft — *explicitly marked mostly unverified*; `spikes/fresh-view-2026-09-29/taxonomy-audit.md` found ≥8 dropped distinctions. Proposal says a redo needs a different agent, whole-segment census per ASF type, and a vocabulary-conservation pass across RC1 / template / comproprium / vivarium / udon / ASF FORMAT.
- Open steward-purpose fork: adaptive scope behavioral (drops known-law tracking and the race) vs relative to a declared world model (keeps the race).
- "Things to adopt now": finding tags `→ the-loop#time-clause @sha`; summary-check line in every reviewer brief; commit trailers `Role:` / `Read-at:`; generated Status blocks; landing rule (landed text checked against exactly what was verified).
- Relationship stated then: aat-refactored = where RC1 is *tested*, not where the template is deployed; "The template predates RC1, and its epistemology row is still an empty gap awaiting your decision." **Check whether that is still true** — verisectorium has moved since 09-29 (template/ looked current in aspectus).

## State at ~20:20 MDT 2026-10-28 (for a successor resuming cold)

**Maps landed** (`maps/`): verisectorium, aat-refactored, udon-spec-lite, asf-process-and-history, asf-vol1-theory, asf-audits-and-spikes. Still running at this writing: joseph-words-and-estate. Each map lists what its agent read whole vs skimmed — trust ranks at the top, treat lower ranks as provisional.

**Read first-hand since the maps:** verisectorium deploy-3 founding feedback, NOTE-TO-SUCCESSOR, 05-CONCLUDING; STEWARD-VERBATIM 698–800 + 996–1058; jaw-proposal §1.1, :55–62, :118–126, :170–180, §3.14; Ch.1 of ASF Vol 1 (all 7 segments, body + Follow-ups); SP-30 spike 00-spike.md + PROPOSALS SP-30 + decision brief. Notes: `50-segment-reading-notes.md`, additions in `30-…` and `40-…`.

**Next, in my judgment (not a plan anyone ratified):**
1. Put the founding questions to Joseph (see `40-emerging-picture.md` "Open questions" + H6: SP-30 typed target; scope; outline ownership per deploy-3; record substrate; what carries from aat-refactored).
2. Read the joseph-words map when it lands; read his late-Sept/Oct words on the refactor first.
3. Continue first-hand reading: SP-30 push files 01–04 (esp. 02-typed-predicate, 03-comprehension-lift-scout); Ch.2 roots (`maps/asf-vol1-theory.md` entries 1, 18–21); aat-refactored Tier 1 (de novo review, Ch.2 verifier, specimen-worked); ASF meta-process review (`msc/meta-process-review-2026-07-07/` 00-INDEX, PROCESS-MAP-v0.udon:440-489, 01-findings); spec-lite card exemplar `src/rule-strings-like-ruby.md` + sidecar + `sop/influx/udon-team-notes.md`.
4. Only then draft anything in aat-v3 beyond msc/ — and per deploy-3, write only what the founding session can know; route the outline to Joseph.

**Housekeeping flagged to Joseph:** the audits/spikes finder accidentally published its map as a private claude.ai artifact (https://claude.ai/artifact/3AhcjFYaj5K1vSPGwxJhNf); not deleted pending his word. (2026-10-28: Joseph asked for it to be deleted; Joseph deleted it himself via `/artifacts` the same night.) ASF memory `project_aat_reboot.md` has a stale path (`~/src/aat-reboot/` → `~/src/aat-refactored/`) — not edited (outside this repo; his call).

## Decisions & direction, 2026-10-28 evening (Joseph's words verbatim; my calls marked)

- Joseph on aat-refactored: *"I found out later that aat-refactored project that had paused, I thought, to wait for vsect-- actually wasn't worth (probably) trying to massage into a good working state-- hence this repo this evening (although it will be an 'influx' source at some point so any good things can be adjudicated and integrated in here-- but the feeling after resting on this for a while is that this needs a discipline from the beginning). Udon is just getting pulled together almost enough to get the parser really done (working on that in parallel to here)."*
- On RC1: *"I forgot I was so bearish on RC1. Yeah, the vocabulary definitely drifted by the time it got to me, obscuring the core concepts which was frustrating. I think discussing it in terms of concrete tooling and interface and file-formats started to redeem it quite a bit-- gave me better mental latches for the theoretical work :-)"*
- On vsect vs ontology: I recommended vsect first, porcelain-first, with the ontology emerging as whatever the verbs must record/compute. Joseph: *"I agree-- we need your context to draft it, but then one or more de-novo audits that have free reign and that can dig deeply into asf and verisectorium and anywhere else they want. Consider using yaml-frontmatter + markdown (even if it's "per-atom"...) for now-- it'll be easy to move to udon later. The main idea is that, in the same way relata does (but with much more thoughtful porcelain), vsect will abstract the actual files/indexes/dbs away from the workflow-- we'll all be able to think about it via logical mental model based on using vsect. In fact, running vsect without any command or flags should probably output some kind of dashboard in addition to usage.... (just my 2c-- feel free to ignore ;-). I'm happy to defer to you for #1 and #2 there."*
- **Coordinator calls under that deferral (revisitable):** (1) the vsect spec drafts at `aat-v3/msc/vsect/` as influx — aat-v3 is the first consumer; final home decided once it's real. (2) Design document first (verbs + session flow seen whole), card-cutting later if earned. Storage for now: YAML-frontmatter markdown, per-atom where useful.
- **Launched:** a fork (inherits this whole session's context) to draft the vsect spec. Then: one or more free-rein de-novo audits of the draft (bare briefs), per Joseph.

## State at ~21:40 MDT 2026-10-28 — vsect draft through one audit-and-integrate cycle

- `msc/vsect/` (7 files, 844 lines): README, vsect.md (porcelain), model.md (opens with "one fate, one atom"), core.md (contracts: grammar, identity, versions, edges, events, projections, reports, landing/closing, reconciliation, addressing, authority, command contracts, trusted base, fixtures), storage.md, session-aat.md, open.md (questions + finding-by-finding disposition table + provenance).
- `msc/vsect-audits/`: claude-audit.md, codex-audit.md (both bare-brief de novo), coordinator-pre-audit-notes.md (my read before either landed), coordinator-judgment.md (dispositions + what I guarded). The drafting fork integrated against the judgment; its divergences: flags routed to Joseph (his own 09-30 proposal); S5 adopted (my judgment omitted it by oversight — fork was right); landing-rule cost recorded as an open question, not softened.
- Not yet done: no re-audit of the integrated draft; md-press math pass skipped (ollama model missing); nothing committed; I spot-checked model.md opening, core.md §7–8, open.md, but did not re-read every integrated line.
- Next real test: the five-segment re-marking (open.md Q7) — the Claude auditor offered to run it.
