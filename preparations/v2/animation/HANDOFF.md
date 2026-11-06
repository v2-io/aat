# Animation artifact: where it stands, for whoever picks it up

*Written 2026-11-06 by the fork that started this, at a requested pause before a harness restart. To me after the restart, or to a successor who has none of my context. Nothing has been published. Nothing outside this directory was touched.*

## What was asked

Joseph: build "an animation artifact that basically turns those definitions into a sequence of transitions and animations that progressively explain the entire model", using available skills. "Those definitions" are `../def/*.yaml` (17 groups, 71 terms; reading order in `../def/_outline.yaml`), which restate `../model-and-lexicon.md`. Both are read-only for this work: the coordinator may be editing them with Joseph.

The restart is so that a `/motion` skill is available. I have not seen that skill. Read it before continuing; it may replace the hand-built approach below. What follows is what I had settled without it.

## What exists

- `parts/1-head.html` — done. Title, fonts, all CSS, and the page skeleton (masthead, chapter nav, stage with one SVG and two HTML panels, caption block, controls). Not yet joined to anything.
- Nothing else. Parts 2 to 4 (the script) are designed below and not written.

Intended final file: `v2-model-walkthrough.html` here, made by concatenating the parts, then published with the Artifact tool (`icon: "diagram"`, a one-sentence description). Artifact page rules: no doctype/html/head/body tags; `<title>` first; scripts only from the allowed CDNs (none needed); works at phone width; both themes.

## Decisions made, with reasons

1. **House design system applies.** Joseph has a design system artifact, "v2 Design System copy-2" (https://claude.ai/artifact/5EDBUGbQUz2p6PnG5vqgCN). I read its `project/README.md` and `project/tokens.json`. The CSS in part 1 uses its exact token values. What governs:
   - washi (light) and slate (dark) grounds; ink on paper; **one point of shu (vermilion) per view**. I spend it on the current-step tick in the progress row and nowhere else.
   - square corners; no shadows on a sheet; hue only from the ten "families" (I use sand for veritoids, stone for segment frames, teal dashed for computed values, iris for projections, slate for acts, clay for the frontier, sage for sources and chunks).
   - type: Crimson Text for the title, Inter for headings and UI, Newsreader for prose, Victor Mono uppercase for kickers and labels (typed as capitals, never transformed).
   - copy: plain declarative sentences, sentence case, no superlatives, no emoji, em dashes unspaced.
   - **motion: "Almost none. Reveals and state changes ease over 200ms … Nothing loops, bounces or parallaxes."** So the animation is eased state changes only: things appear, move once into place, change fill. No looping, no bounce. If `/motion` wants more than that, the design system and Joseph's request pull in different directions and he should be asked.
2. **Form: a stepped explainer on one sheet.** One drawing stage that changes in place, a caption under it, Back / Next / Play, a row of step ticks, arrow keys. Play advances every ~7 seconds. The page is complete at rest: step 1 shows on load.
3. **Sequence follows the def outline**, but as one running example, the one in the model document: a derived result T (`persistence-threshold`) with a formal claim, a derivation, a description and an eli8; and a second segment U (`per-dimension-bound`) whose claim is predicated on T's.
4. **Every caption carries the terms it introduces** as chips, and a short italic flag wherever the model document marks the point as unconfirmed by Joseph or open. The flags matter: Joseph is using this to check his understanding, and must be able to see which parts are his and which are proposals.

## Planned implementation (if hand-built)

One SVG, viewBox `0 0 960 560`, three scene groups. Elements are made by small JS helpers, each a `<g class="el" data-id>` positioned by CSS `transform: translate()`, shown by adding class `on`. A step is a delta: `{show:[], hide:[], pos:{id:[x,y]}, cls:{id:'broken'|'changed'|''}, txt:{id:'…'}}`. State for step n is the fold of all deltas from the start of its scene. Elements first shown in the current step get class `hi` (strong ink outline). CSS for all of this is already in part 1 (`.el`, `.on`, `.hi`, `.changed`, `.broken`, `.wire`, `.f-*` families, text classes `t-name t-body t-small t-label t-note`, `.on-paper` for text not on a card).

### Scene A — structure (11 steps)

Geometry. Segment T frame (stone) at (20,40) 500×440 with a name tab. Four veritoid cards (sand), 210×70: `vc` formal claim "α > ρ/R keeps mismatch bounded", `vd` derivation "Proof, in steps", `ve` description "Correction must outpace drift", `vk` eli8 "Wipe faster than the snow falls". Scattered positions for steps 1–4: vc (80,90), vd (520,60), ve (150,330), vk (560,360). Assembled from step 5: x=50, y=80, 165, 250, 335. Card text lines: slot label y=15, content y=33 bold, kind y=49, written line y=63. Value chips (teal, dashed) are children of the card so they travel with it: on `vc` at dx=225, dy=2/26/50, width 150; on `ve` at dx=225, dy=26, width 190.

| # | Title | What changes on the stage | Terms |
|---|---|---|---|
| A1 | Content | four cards appear, scattered, content text only | content |
| A2 | Kinds | each card gains "kind: claim / proof-step / explanation / explanation" | veritoid-kind |
| A3 | Dimensions and values | chips appear beside `vc` ("derivation: re-derived", "credence 0.93", "current: fresh") and `ve` ("reader follows: probably yes") | veritoid, dimension, scale, ladder, rung, value, position, credence, judged-value |
| A4 | Written and computed | `vc` gains the line "ground: derivable · claims: theorem"; two legend chips top right: solid "written by an author", dashed "computed by the store" | written, computed, ground, claimed-level, bound, attribute |
| A5 | Segment and slots | cards slide into one column; frame T and its name appear; slot labels appear: "FORMAL-CLAIM · ONE", "DERIVATION · ANY NUMBER", "DESCRIPTION · ONE", "ELI8 · AT MOST ONE" | segment, segment-kind, slot, name |
| A6 | Inner dependencies | two curved arrows at the left edge: eli8 → description ("M50,370 C25,350 25,305 50,287"), description → formal claim ("M50,285 C10,240 10,150 50,117"), labelled "rests on" | inner-dependency |
| A7 | The segment's own values | three chips along the bottom of the frame at y=425: "truth = the claim's · aliased" (40), "freshness = the stalest · derived" (200), "coherence · own" (370) | aliased, derived, own, coherence |
| A8 | Split | the derivation card shows three small boxes "step 1/2/3", each with its own dot; kind line becomes "kind: proof-step × 3" | split, recut (mention merge, promote, fold-back, retire in the caption) |
| A9 | References | segment U frame at (640,150) 300×150 with card `vu` at (660,190) "The weak dimension is the bottleneck"; arrow "M660,225 C600,225 590,115 512,115" labelled "predicated-on" and "needs: re-derived or better"; note at (640,330) on the latent level | reference, reference-kind, predicated-on, dependency-graph, latent-level |
| A10 | Projection | iris band at (20,492) 920×56: "PROJECTION · CHAPTER", "Persistence and structural limits", member chips "1 → persistence-threshold", "2 → per-dimension-bound", a dashed "coherence" chip | projection, canonical-projection, orphan |
| A11 | Rendering | a page icon at (660,350) with "persistence-threshold.md", arrow from the frame labelled "produced, as of a state" | rendering |

Flags: A3–A5 "Two levels of content, and only two, is not yet confirmed by Joseph." A8 "Open: whether a veritoid has an identity of its own that survives a recut." A9 "That pointers are written, with only 'does it hold' computed, is a proposal." A10 "The word is confirmed by Joseph. That a projection is a kind of segment is a proposal."

### Scene B — time and change (9 steps)

This is the worked example of `model-and-lexicon.md` section 4.2, row for row. Geometry: T frame (30,40)–(600,210) with four boxes 125×60 in a row at y=80, x=50 eli8 `k1`, 190 description `e1`, 330 derivation `d1`, 470 claim `c1` (claim rightmost so U's pointer is short); a value chip under the claim at y=150. U frame (680,40)–(930,210) with claim box `u1` at (720,80) and a chip below. Pointer U→T from (720,110) to (595,110). Acts row y=250–330: one slate pill for "B's re-derivation of T" with binding lines up to the derivation and claim boxes; one pill for "whole-read of T"; later one for U. Frontier panel (clay) at (680,235)–(930,400), title "OWED — THE FRONTIER", up to four lines. Timeline y=430–540: a strong steady line with dot S0 at x=80 and dot S1 at x=880 (appears last); between them work-time ticks at 08:30, 09:25, 11:00, 11:30, 12:00, 13:00, 13:30, 14:00 (x from 180 to 800), a "now" marker that moves, labels "STEADY TIME" and "WORK TIME", and under the span "working state — never the theory".

| # | Title | Stage | Terms |
|---|---|---|---|
| B1 | Two kinds of time | T, U, the pointer, S0 on the timeline, claim chip "re-derived" | log, state, steady-state, working-state, steady-time, work-time |
| B2 | Acts bind to what they read | act pill "B re-derived c1 by way of d1" with lines to c1 and d1; pill "whole-read of T" | act, actor, bind, standing |
| B3 | 08:30 — a finding | finding pill; claim chip "known broken"; frontier: "T's claim is known broken" | perturbation, frontier |
| B4 | 09:25 — one segment changeset | c1→c2, d1→d2, k1→k2 flash together, e1 marked "affirmed"; both act pills go `broken`; chip "drafted"; frontier four lines: re-derive c2 · whole-read T · U's pointer: its target was narrowed, did U rely on what is gone? · U needs "re-derived", T's claim is "drafted" | segment-changeset, affirmation |
| B5 | 11:00 — a check binds again | act pill "B re-derived c2 by way of d2", binds; chip "re-derived"; frontier two lines | (value falls and is earned back) |
| B6 | 11:30 — a second changeset | d2→d3 flashes; act pill broken; chip "drafted"; frontier grows back | work-time vs steady-time |
| B7 | 12:00 — re-derived again | pill "c2 by way of d3", binds | |
| B8 | 13:00 — the narrowing reaches U | u1→u2 flashes, pointer re-declared; U chip "drafted"; frontier: whole-read T · re-derive u2 · whole-read U | refuted, dropped-in-level, narrowed |
| B9 | 14:00 — the next steady state | U pill binds; whole-reads bind; frontier empty; S1 appears; note "d2 was never part of any steady state" | atomic-changeset |

Flags: B3 "Open, Joseph's: may a finding show on a steady state before its consequences are worked through?" B4 "The 'changed or affirmed' rule, and written-at-once versus values-earned-back, are proposals." B1 or B9 "Open, Joseph's: several changesets in progress at once."

### Scene C — intake and work (2 steps)

C1 Sources, chunks, crossings: a source (sage) cut into five chunks; each chunk's crossing drawn as an arrow to its outcome (changed an existing veritoid; became a new one; already present; passed to segment T's inbox; delivered to another store); a line "read by: A · fully cut". The inbox drawn beside T's frame, outside it, with the note "not part of what the segment says". Terms: source, chunk, crossing, inbox, delivery.
C2 Moves, queues, mechanisms: a move "derivation: drafted → re-derived", its queue of three waiting items, and three mechanisms (rule, agent, council). Caption states Joseph's diagnosis of the sprint's loop (a fresh mind landing a checker's findings) and that findings go back to the author. Terms: move, queue, mechanism.

### Two HTML panels (no drawing)

- **Intro** (step 0): what a verisectorium, a store and a definition are; how to step through.
- **What is still open** (last step): two columns. "Open": veritoid identity; a known defect showing on a steady state; several changesets at once; what a small rewording costs in credence; independence of same-family checkers; how "it was Joseph" is attested; whether author continuity is enforced. "Proposed, not yet confirmed": two levels of content; the write rule; references as written; a projection being a segment; narrowing as a third case; identity surviving a change of meaning; the inbox outside the segment's state. Source: `model-and-lexicon.md` Part 9.

Total: 24 steps. Chapter nav: Start · Structure · Time and change · Intake and work · What is open.

## What I would do next

1. Read the `/motion` skill and decide whether it changes the build. Keep the sequence, wording and flags above whatever the technique.
2. Re-read `../def/*.yaml` and `../model-and-lexicon.md` Part 9 in case the coordinator changed them, and adjust captions.
3. Write the script (scene A, then B, then C, then the controller), join the parts, take the one allowed preview, fix once, publish, and report the link to the coordinator.
4. Captions are not yet written out in full. Write them in the model document's register: two to four plain sentences each, Joseph's own phrases where the document quotes him.

## Update, later on 2026-11-06: built and published

No `/motion` skill turned out to be available, so the page was hand-built as planned above.

- Published: https://claude.ai/artifact/JhUgcNT6DAB25KcLWkuioL (private to Joseph). Source: `v2-model-walkthrough.html` here.
- To change it, edit the files in `parts/`, rejoin them, and publish the same file path again to keep the URL:
  `{ cat parts/1-head.html; echo '<script>'; cat parts/[2-8]*.js; echo '</script>'; } > v2-model-walkthrough.html`
- `parts/`: `1-head.html` (styles, skeleton), `2-core.js` (drawing helpers), `3-scene-a.js` and `4-steps-a.js` (structure), `5-scene-b.js` (time and change, with its steps), `6-scene-c.js` (intake and work, and the last step), `7-panels.js` (the two text panels), `8-controller.js`.
- A step can be opened directly with `#step-N` on the URL, 1 to 24.
- Checked once, in a headless browser, at steps 5, 12, 16 and 23, light theme, desktop width. Fixes from that look were applied and not looked at again. Not checked: the dark theme, phone width, the other twenty steps, and Play.
- All 24 captions are written. They follow `../model-and-lexicon.md` and `../def/*.yaml` as those stood on 2026-11-06 at about 11:00 local. If either changes, the captions and the last panel need the same change.

## Update 2, 2026-11-06 afternoon: Joseph's first round of feedback applied

- Play removed. The big header removed. Controls and chapter links are now one bar at the top, so they do not move between steps.
- **Rule adopted for term chips:** a term is listed under a step only if that step's caption names and defines it and, where it can be drawn, the drawing shows it. Before this, each step listed every term of its definition group whether or not the step dealt with it.
- To honour that, Structure went from 11 to 13 steps: "Dimensions and their scales" (a drawn ladder with rungs), "Values, in three forms" (each chip names its form), "Written and computed", and "Bounds and attributes" (a bound drawn as written, an attribute drawn in its own style as computed-but-not-a-value). 26 steps in all.
- Terms defined in a caption but still not drawn: merge, promote, fold-back, retire, reference-kind, orphan, delivery, actor, standing. Each caption says so where it matters.
- Three later steps (11:00, 11:30, 12:00) now list no terms, since they introduce none.
- Checked once more in a headless browser at steps 4, 7, 8 and 16 (light, desktop). Still unchecked: dark theme, phone width.
