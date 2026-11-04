# Adaptation & Actuation Theory, v3

> [!warning] **PILOT — not canon.** This store was founded on 2026-11-04 to test one line of a decision: whether AAT should be refactored in place in ASF (`~/src/arch/asf/`, the source of everything here) or founded fresh with ASF as its influx. One cluster of ASF was crossed so the two lines can be compared. ASF remains the theory's canon. Nothing here supersedes it, and the segments here are ASF's text re-cut, not a new draft. The pilot's report and debrief are in `msc/pilot-founding-2026-11-04/`.

## What is here

- `src/` — the crossed cluster: Part I, Chapter 1 ("The Coupled Loop: Ontology and Scope"), the five root definitions and the broadest scope. Each file is an ASF segment carved into **statements**, the unit that can be right or wrong on its own (`msc/vsect/model.md`, "One fate, one atom"). Text inside a statement is ASF's, verbatim at `2133cf2e`; what changed is the cut and the tags.
- `main.outline.md` — the reading order, with the chapter's two uncrossed rows shown as gaps.
- `reviews/` — findings carried from ASF's record, re-targeted to the statements they concern.
- `questions/`, `items/` — open questions and owed work carried from ASF, written by `vsect`.
- `influx/00-INDEX.md` — the crossings log: what each crossing took in, left behind, and found.
- `.vsect/` — the store's declarations and trail. `vsect` (bare) is the dashboard; `vsect help model` the mental model.
- `msc/` — the design history that preceded this founding (vsect's design and its audits, orientation maps), and the pilot's own report.

## How to read a record

A segment's frontmatter declares its statements (`statements:`), each with its kind (`as:`) and what it rests on (`premise:`, `defined-by:`). In the body, `*[Word (id)]*` opens a statement; `*[of (id)]*` attaches later prose (a gloss, a discussion) to it. Every heading ends a statement's span. `## Working Notes` belongs to no statement. `predecessor:` records what ASF typed about the segment (its `status:` and `stage:` words); that is provenance, never standing here.

vsect 0.1.0 reads one statement per record and does not yet read the tags. Standing, findings and checks therefore bind to the whole segment for now. The carving is real and the tool will read it when it grows; the mismatch is one of the pilot's findings.

## What is not here

Everything else in ASF: the other 242 segments, the appendices, the audit record, the spikes, the items ledger. References in the crossed text to segments outside this store (`#form-agent-model`, `#scope-agency`, and so on) resolve in ASF, and are basis components this store cannot yet bind to.
