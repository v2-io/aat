# Preparations

Where the work on the new ASF (this repo) and the new verisectorium and vsect (`~/src/verisectorium/`) is discussed and prepared, from 2026-11-04. Joseph: this is now where we work on the stuff. Anything copied here supersedes its original.

## Where things stand

**Decided by Joseph:**
- **A new store, with ASF as influx.** ASF is not iterated in place. A new store is founded here, and current ASF is ordinary influx to it, with no transitional mechanisms. Slugs are free to change; the old-slug → fate mapping is published.
- **Only through vsect.** Agents change atoms only through vsect. *"If the model and the tool aren't able to accomodate what they want to do yet-- that's exactly how we know what to flesh out more."*
- **vsect starts fresh.** It is a new engine, in `~/src/verisectorium/`, and earlier efforts are influx to it. It does not model councils, especially not at first: a transition is a queue drained by a decision-maker, filled later.
- **Where the store lives.** The store is not the repo. It lives wherever the OS convention puts it, as relata's does.

**Where the thinking is (2026-11-04):**
- **Too complicated, and not sophisticated enough.** Joseph found the kernel drafts (`vsect/KERNEL.md`, draft 3) and the ASF system model (`asf-system/`, iteration 2) both. They lost the framework that had been coming together, the one built on RC1 and the maturation plan. The cause, on the vsect lead's account: the kernel was drafted without reading RC1's core files (01–04, 07, 08, 11) or the verisectorium theory store. Those already define atoms, dimensions, kinds and the lexical core.
- **The agreed next step is a rethink, not a repair.**
  - Read RC1 whole, and the theory store's outline and its core segments.
  - Then write one short component map: what verisectorium already defines (the kernel, mostly as written), what vsect must implement, and what ASF must declare (its kinds as dimensions, and its transitions as movements on them).
  - `vsect/KERNEL.md` and `vsect/vsect-lexicon.md` are folded into that map, not kept alongside it.
- **The first concrete input is the influx list.** councils-46's step 1: read the sprint's influx maps (`asf-sprint-2026-10/influx-scout/`, `internal-surfaces/`) and record each source with how far it was explored.

## What is here

- **`asf-system/`.** The ASF system model, iterations 1 and 2, moved from `arch/msc/asf-system/`. `HISTORY-from-arch.txt` holds its commit history there. `joseph-feedback-2026-11-04.md` has his questions on it.
- **`vsect/`.** The vsect drafts and plans:
  - `MATURATION-PLAN.md` and the other lead session's `-notes`, `-scratch` and `-experts-and-councils`;
  - `KERNEL.md` (draft 3) with `KERNEL-check-1.md`;
  - `vsect-lexicon.md`.
- **`foundations/`.** From the councils work, the documents the ASF and vsect thinking rests on:
  - `asf-flows.md`, the flow model;
  - `councils-system-model.md`, transitions as queues and charters as records;
  - the fresh read of the flow model (`feedback/`);
  - in `research/`:
    - the dialog transcription and its extractor;
    - the vsect lead's flow priors and plan-read;
    - Line B's report;
    - the unknowns scout, with its scripts;
    - the RC1–vsect gap notes.
- **`asf-sprint-2026-10/`.** The 2026-10-30 sprint's whole working tree, copied from `asf/msc/inside-out-2026-10/`. It includes:
  - INTENT and HANDOFF;
  - the drains;
  - the influx scout and the internal-surfaces maps;
  - the owner and system reviews;
  - the vsect flow review and the agent-identity account.

  With it are the sprint's retrospective (reflection 31) and the Fable assessment of the tag against main.
- **`line-a/`.** The Claim Record extraction pilot's account, scripts and data, from its unmerged asf branch (`worktree-agent-a25fdf864ac319cc9`).
- **`sessions.md`.** The sessions since the sprint that bear on this work, with how to find and extract each.

## What is elsewhere, and stays there

- **`~/src/verisectorium/`** (GitHub `v2-io/verisectorium`):
  - `.archive/prior-incarnation/` is the verisectorium as it grew in arch, with its history. That includes the theory store (`theory/OUTLINE.md`, `theory/src/`) and RC1 (`theory/influx/segments-model-rc1/`).
  - `.archive/prior-vsect/` is vsect 0.1, its source and its history.
- **`~/src/aat-v3/.archive/`** holds the earlier aat-v3 attempts. Among them are the archived vsect design (`msc/vsect/`: model, core, vsect, storage, open) and Line B's pilot store. The tag `pre-new-vsect` marks the point before this work.
- **`~/src/arch/asf/`** is current ASF, which is influx. Its points of reference:
  - tags `pre-integration-2026-10-30` and `post-integration-2026-10-31`;
  - its SOPs, `doc/sop/`;
  - its vsect 0.1 store (`.vsect/`, `items/`, `questions/`, `reviews/`).
- **`~/src/arch/msc/councils/`** is the councils work as a whole: the generic collaborative council template, its feedback, the three spikes with the walking skeleton, the RONR-12 model and `high-councils/`.
- **`~/src/agent-core/claude-code/agent-identity/`** is the per-agent identity hook (`CC_AGENT`) and its re-test.
- **Agent conduct docs:**
  - `~/src/arch/SUBAGENT-INSTRUCTIONS-notes.md`;
  - `AGENTIC-DELEGATION.md` and `SPIKE-PROMPT.template.md`, whose current copies are in agent-core and supersede arch's.
