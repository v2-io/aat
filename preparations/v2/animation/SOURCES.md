# What the walkthrough is, and where each part of it comes from

*For Joseph, 2026-11-06, to read beside the page. Written by the agent that built the page. Nothing on the page was changed to write this.*

## The short answer

**It is not an ordered animation of the definitions. It is my own restatement of the model, loosely following the definition groups.**

- **No caption is taken verbatim from a def file.** Every caption is my own wording. I wrote them from my working understanding of the model and did not open `def/*.yaml` while writing them. Some phrases coincide with the defs because the same line of work wrote both.
- **The order is mine, not the outline's.** It differs in six places (below).
- **A good deal on the page has no counterpart in the defs at all:** the running example and all its particulars, the whole Time chapter's worked example, most of the drawn relationships, the legend's three categories, the specific values on the chips, and the closing lists.
- **I simplified and merged in at least a dozen places,** and left one whole part of a definition group out (the sort of dimensions by what sustains them).

So if something on the page looks wrong or run together, the likelier place for the fault is the page. A fault in a def is only established by reading the def. For checking the model, `def/*.yaml` and `bin/defs overview` are the thing to read. The page is at best a teaching aid for them, and at present not a faithful one.

## 1. Order

Outline order (`def/_outline.yaml`): verisectorium, veritoid, dimension, value, written, segment, name, reference, premise-change, projection, recut, rendering, state, act, changeset, move, intake.

Where the page differs:

| Difference | Why I did it |
|---|---|
| The veritoid group is spread over three steps (Content, Kinds, Values). The term *veritoid* itself appears only at the third | I wanted "content plus its values" to be visible before naming it. The def introduces all three terms together |
| *attribute* (from the value group) and *bound* (from the written group) are pulled out into a step of their own | Added in the last revision, to stop them being listed without being explained |
| *name* is folded into the segment step | It is a one-term group |
| *recut* comes before *reference* and *projection*. The outline has it after projection | I wanted the split shown while the single segment was the only thing on screen. The def's point that a recut must not break references is weaker for being placed before references exist |
| *premise-change* is moved out of Structure into the Time chapter, at the 13:00 step | It is where the example has a narrowing. The outline puts it right after reference |
| *intake* comes before *move*. The outline has move first | No good reason. I grouped them as one chapter and drew intake first |

The terms of the *act* and *changeset* groups are not presented group by group at all. They are spread across the nine steps of the worked example in the order the example needs them.

## 2. The captions

- Verbatim from a def `intro` or one-line `def`: **none.**
- Close paraphrase of a def's `intro`, `def`, `invariants` or `discussion`: **most sentences**, by my estimate around two thirds.
- Taken from `model-and-lexicon.md` and not in the defs: the nine captions of the Time chapter (section 4.2 of that document), and the closing lists (its Part 9).
- My own, with no source in either: connecting sentences, the framing sentences at the start of each chapter, and several specific claims marked in the table below.

I have not checked each paraphrase against its def line by line. That check is what would be needed to say any caption is faithful.

## 3. Step by step

"Caption": *para* = my paraphrase of the def group named; *model-doc* = from `model-and-lexicon.md`, not the defs; *own* = mine.
"On the page but not in the defs" lists what the drawing or caption states that no def states.

| # | Step | Def group(s) | Terms listed | Caption | On the page but not in the defs |
|---|---|---|---|---|---|
| 1 | A store, and its definition | verisectorium | verisectorium, store, definition | para | The instruction text |
| 2 | Content | veritoid | content | para | The four pieces of content and their wording ("α > ρ/R bounds mismatch", "Wipe faster than the snow falls", and so on). Invented for the example |
| 3 | Kinds | veritoid | veritoid-kind | para | The kind names claim, proof-step, explanation come from the def's examples. That "the same kind can serve in many places" is in the segment def's discussion, not here |
| 4 | Dimensions and their scales | dimension | dimension, scale, ladder, rung | para | **"How likely true?" drawn as a dimension of its own, with a number scale. The defs do not say this.** In the defs, credence is a *form a value takes*, not a dimension. I do not know from the defs whether position and credence are answers on one dimension or on two. The table title "dimensions the kind allows" is the def's relation `allows` |
| 5 | Values, in three forms | value, veritoid | value, veritoid, position, credence, judged-value | para | The figure 0.93. The chip "follows: probably yes" as the judged value. **"How sure" is not drawn as a separate thing beside each value, though the def says every value has one.** The position chip has none. The credence chip is drawn as if the probability were the value |
| 6 | Written and computed | written | written, computed, ground, claimed-level | para | The pairing "ground: derivable · claims: theorem" on one line. "The store's work is to compare what is claimed with what has been earned" is my summary of two invariants |
| 7 | Bounds and attributes | written, value | bound, attribute | para | **The legend's three categories** (written; computed value; computed attribute). The defs have two, written and computed, with attributes under computed. The example attribute text |
| 8 | A segment and its slots | segment, name | segment, segment-kind, slot, name | para | The segment name `persistence-threshold` and kind name `derived-result`. The slot list is the def's example |
| 9 | Inner dependencies | segment | inner-dependency | para | Nothing beyond the def's example. The arrow label "rests on" |
| 10 | The segment's own values | segment | aliased, derived, own, coherence | para | The chip "coherence: holds" as a value. The examples are the def's |
| 11 | Recutting | recut | recut, split, merge, promote, fold-back, retire | para | The drawing of three steps each with a dot. Only *split* is drawn |
| 12 | References and the dependency graph | reference | reference, reference-kind, predicated-on, dependency-graph, latent-level | para | The second segment `per-dimension-bound` and its claim text. "needs: re-derived or better" is from the model document's example |
| 13 | Projections | projection | projection, canonical-projection, orphan | para | The member chips and the "coherence of the chapter" chip. The chapter title is a real ASF chapter. The two member names are invented |
| 14 | Renderings | rendering | rendering | para | The file name and the page icon |
| 15 | Two kinds of time | state | log, state, steady-state, working-state, steady-time, work-time | para, then model-doc for the setup | **The timeline drawing as a whole**: one line with S0 and S1 as dots and clock times as ticks between them. The defs do not draw time. Putting both kinds of time on one axis is my choice and may itself blur them |
| 16 | Acts bind to what they read | act | act, actor, bind, standing | para + model-doc | The two acts and their wording; the binding lines |
| 17 | 08:30, a finding | changeset | perturbation, frontier | model-doc | Everything specific. The frontier drawn as a list in a box |
| 18 | 09:25, one segment changeset | changeset, act | segment-changeset, affirmation | model-doc | Everything specific |
| 19 | 11:00, a check binds again | none new | none | model-doc | Everything specific |
| 20 | 11:30, a second changeset | none new | none | model-doc | Everything specific |
| 21 | 12:00, re-derived again | none new | none | model-doc | "That is exactly what the store needs in order to know how much B's checks are worth" is from the model document, not a def |
| 22 | 13:00, the narrowing reaches U | premise-change | refuted, dropped-in-level, narrowed | para + model-doc | Only *narrowed* is drawn. The other two are caption only |
| 23 | 14:00, the next steady state | changeset | atomic-changeset | model-doc | Everything specific |
| 24 | Sources, chunks, crossings, inboxes | intake | source, chunk, crossing, inbox, delivery | para | The source name and "five chunks". Five of the def's seven crossing outcomes are drawn; "one more independent arrival" and "superseded or rejected" are left out. The sprint figure in the italic line is from the def's discussion |
| 25 | Moves, queues, mechanisms | move | move, queue, mechanism | para | **The three lines inside the move box** ("first: the content is written and staged", "standing: not the author of what is read", "records: what was read, the criterion") are my invention of what a move declares. The three queue items are invented |
| 26 | What is open | none | none | model-doc | Both lists come from the model document's Part 9. Most items also appear in some def's `working-notes`, but I did not build the lists from those |

The italic lines under captions ("not yet confirmed", "open") come from the defs' `working-notes` in most cases and from the model document's Part 9 in the rest. I did not check each against its source.

## 4. Where I knowingly simplified or merged

1. **Credence as its own dimension** (step 4). Possibly a real error, not a simplification. See the table.
2. **"How sure" folded into the chips** (step 5), where the def keeps it apart from the value.
3. **What sustains a dimension is missing entirely.** `def-dimension` sorts dimensions into those sustained by evidence, by decision, by attestation, or a mix, and discusses importance. None of that is on the page.
4. **Only one reference kind is drawn.** Narrates, restates, seeded-by and supersedes are absent. So is "how many targets it expects", and so is the computed "does it still hold".
5. **A ground opening dimensions is stated and not drawn.** The dimension table does not change when the ground appears.
6. **A claimed level compared with a value is stated and not drawn** in the Structure chapter. It appears only implicitly in the Time chapter's frontier.
7. **The log is not drawn.** *State* and *steady state* are one dot.
8. **The two kinds of time share one axis** (step 15 onward).
9. **Standing and actor are caption only.**
10. **Affirmation**, a term of the act group, is introduced inside the changeset step.
11. **"An act alone is an atomic changeset of size one"** and **"only the last write of a segment reaches the next steady state"** are in the changeset def. The first is absent; the second is shown only by example.
12. **Canonical projection is not drawn as distinct** from an ordinary projection, and "what a review of a projection reads of each member" is caption only.
13. **A crossing being an act** is not said.
14. **Name** is merged into the segment step, and nothing of its invariants (may change; old names resolve; collisions surface) is shown.
15. **The definition** (what it declares; that it has versions) appears only in the opening panel.

## What I would suggest

Give feedback on the model against `def/*.yaml`, not against this page. If the page is still wanted, the honest way to rebuild it is the other way round from how I built it: generate each caption from the def's own `intro` and one-line definitions, in outline order, and add a drawing only where it shows a relation the def states. Then anything wrong on the page is wrong in a def, and he never has to ask this question.
