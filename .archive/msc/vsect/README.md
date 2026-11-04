# vsect — design draft

*Status: **draft, proposed.** Written 2026-10-28 by a Claude (Opus 5.5) fork of the aat-v3 coordinator, at Joseph Wecker's request, then revised the same evening after two de novo audits (Claude and Codex, in `../vsect-audits/`) and the coordinator's judgment of them, and again after a third audit (Gemini, `agy-audit.md`) of that revision's contracts and the coordinator's round-2 judgment — that integration by a fresh Claude instance. Nothing here is decided. This README is written for a reader who was not in the session.*

## What vsect is meant to be

`vsect` is a command-line tool for working inside a **verisectorium** — the estate's name for a corpus of small named records (segments, definitions, questions, decisions, reports) arranged by outlines that are views over them, where every record must carry its own honest epistemic state because every mind that works on it arrives with no memory of earlier sessions.

The first intended corpus is **AAT v3** (`~/src/aat-v3/`), a ground-up rebuild of Adaptation and Actuation Theory, the mathematical core of the Agentic Systems Framework (`~/src/arch/asf/`). The design is **theory-first**: in a theory, derivation and evidence carry everything and authority is noise. The udon spec-lite corpus (`~/src/arch/firmatum/udon/v2/spec-lite-0.1.0/`) already runs on most of the file conventions vsect uses, and is the natural second corpus; where it differs, `storage.md` lists the differences as questions for its decider rather than designing a spec profile now.

Joseph's framing of the aim (2026-10-28): *"in the same way relata does (but with much more thoughtful porcelain), vsect will abstract the actual files/indexes/dbs away from the workflow-- we'll all be able to think about it via logical mental model based on using vsect. In fact, running vsect without any command or flags should probably output some kind of dashboard in addition to usage."* And on storage: *"Consider using yaml-frontmatter + markdown (even if it's 'per-atom'...) for now-- it'll be easy to move to udon later."*

## Why there is a draft at all

A previous attempt (2026-09-29, `~/src/aat-refactored/scratch/vsect-hypothetical-cli.md`) was judged by Joseph to be *"architectural plumbing without the porcelain that actually helps the project stay focused on the problem domain of the project instead of essentially trying to conceptualize a complex RDF graph."* A second sketch the same evening (`vsect-porcelain-sketch.md`, same directory) turned toward porcelain. This draft starts from that second sketch, the verisectorium RC1 segments model (`~/src/arch/firmatum/verisectorium/theory/influx/segments-model-rc1/`), and the conventions spec-lite actually runs on (`…/spec-lite-0.1.0/sop/`, `.vsect/kinds.yaml`), and tries to make the result usable by someone who has read none of those.

## Reading order

1. [`model.md`](model.md) — the logical model a user holds in mind, opening with the principle everything rests on ("one fate, one atom"): statements, records, evidence, standing, events, findings, questions, decisions, teaching, views, influx.
2. [`vsect.md`](vsect.md) — the porcelain: design rules, the bare-`vsect` dashboard, the verbs grouped by the work they serve, output for three audiences, what the tool refuses, what is built first.
3. [`session-aat.md`](session-aat.md) — one illustrative working session on AAT v3, using real defects from ASF's Part I. Illustrative: no such store exists yet.
4. [`core.md`](core.md) — the contracts underneath (grammar, identity, versions, edges, events, projections, reports, outlines, refutation marks, reconciliation, addressing, authority, command contracts, fixtures). For implementers and checkers; a user never needs it.
5. [`storage.md`](storage.md) — what the files look like (including the stored versions, briefs, reports and the mark a refuted statement carries in its own file), how a predecessor corpus is imported, how spec-lite differs, and the move to udon.
6. [`open.md`](open.md) — open questions (five need Joseph), how each finding of both audit rounds was handled, where the round-2 integration went beyond its judgment, and per-element provenance.

## Register

Every design choice here is a proposal. Where a choice carries a source (Joseph's words, a convention spec-lite runs on, an RC1 commitment, a lesson from a recorded failure), [`open.md`](open.md) says so. Everything the estate says agrees with itself is mostly one author and one family of agents — coherence, not independent corroboration — so agreement between this draft and its sources is not evidence that the draft is right. The examples in `vsect.md` and `session-aat.md` show invented terminal output; the AAT defects they operate on are real (cited), the numbers and record names in dashboards are illustrative.
