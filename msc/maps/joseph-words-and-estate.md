# Map: Joseph's own words on the refactor, and the estate around the three corpora

*Finder map for the AAT v3 coordinator and any successor. Written 2026-10-28 by a finder agent (Opus 5.5) working read-only. It gives locators in priority order with a reason to open each one. It doesn't digest them, and it doesn't rule anything out: lower entries are still worth opening, and the order is the information. Where I describe what a passage is about, that's my reading of a quick look, not a verified summary.*

## Read this first: surprises, and where I think the brief's framing needs adjusting

1. **memorata doesn't cover your period.** Its index ends around 2026-09-21 to 09-24. Searches for `spec-lite`, `vsect` or `aat-refactored` restricted to `--since 2026-09-20` come back empty. Everything below from late September onward was found by reading `~/.claude/history.jsonl` (Joseph's typed prompts, with project and session id) and then the session transcripts directly. memorata is still the right tool for anything before about 09-21 (the August verisectorium and RC1 work, for example). A successor shouldn't take an empty memorata result as evidence that Joseph never said something.

2. **Part of the discipline v3 needs was built for AAT, but it lives inside udon.** On 2026-09-30 the aat-refactored coordinator built spec-lite's SOP store (`udon/v2/spec-lite-0.1.0/sop/`, `.vsect/kinds.yaml`, about 46 records in `sop/adr/`) under authority Joseph delegated to it. Its decisions were made in conversation with Joseph in the aat-refactored transcript `073f016a`. That store is the most recent concrete form of verisectorium-as-practice: row-type and doc-state, the ∂/※ derived columns, `[[kind:slug]]` resolution, kinds.yaml, working-notes policy and decision authority. Joseph framed it as "an exemplar for moving the udon work forward which will move verisectorium and the agentic systems framework / theory forward." It sits where it looks like udon content, so the spec-lite finder may map it as udon. It's really process, and Joseph insisted the process be kept distinct from udon's content.

3. **The only vsect-shaped tooling that exists is outside verisectorium.**
   - limen has a working `vsect` plugin that follows `[[kind:slug]]` links (`~/src/limen/backbone/lua/plugins/vsect.lua`, built 2026-10-01 at Joseph's request).
   - address-theory has a working def→LEXICON assembler, `bin/compose-lexicon`. The verisectorium template lists that instrument as "NOT BUILT".
   - vivarium has a working orientation gate: a quiz with core/src sealed, and a commit-msg hook that requires an `orient:` token.
   - comproprium has a mechanical corpus falsifier, `bin/check-corpus`.

   These are the places where "discipline became mechanism" was actually done.

4. **RC1's own comprehensibility has already failed in front of Joseph, twice.**
   - 2026-08-31 (verisectorium session `91c680e1`), trying to learn RC1: "This is a disaster." In the same session he asks whether an AAT segment would have to become many separate atoms.
   - 2026-09-29: "did verisectorium and RC1 then essentially clarify nothing?"

   Those passages bear directly on how far v3 can lean on RC1 as written.

5. **Joseph has said almost nothing about AAT between 10-01 and today.** After `073f016a` closed (10-01 02:43Z), his only AAT-refactor words before today's ask are incidental (for example the 10-10 ai-risk-model remark that ASF's outline/slug practice is "a solved problem across dozens of verisectoria"). The plan "spec-lite → lite parser → vsect → aat-refactor" is his wording from 09-30 (`073f016a` L460). Today's ask doesn't mention vsect or a parser at all. Whether v3 still waits on vsect, or replaces that plan, is a question for Joseph. The record doesn't answer it.

6. **AISI-responses is a template deployment (verisectorium's deployment #3, founded 2026-08-12), and Joseph calls it the poisoning one.** On 09-23 he called it "the one that was most poisoning" and "the attempt that was finally scrapped because the agents kept fixating on the wrong things." It's still useful as a warning specimen, especially its `sop/influx/feedback-*` reports on the template. A reader should know the priming risk before opening it.

**Reading these transcripts:** each line of a `.jsonl` is one JSON event. "L123" below means line 123 of the file, and timestamps are UTC. To print one of Joseph's turns:

```
python3 -c 'import json,sys; [print(n, (lambda c: c if isinstance(c,str) else " ".join(x.get("text","") for x in c if isinstance(x,dict)))(json.loads(l)["message"]["content"])) for n,l in enumerate(open(sys.argv[1]),1) if n in set(map(int,sys.argv[2].split(",")))]' FILE.jsonl 217,733
```

Agent replies sit on the lines between Joseph's turns. The ranges below include them where they matter.

---

## A. Joseph's own words about the refactor, in transcripts (highest priority)

### A1. aat-refactored, 2026-09-29: the failure diagnosis and the reframe
`/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-aat-refactored/cdaa5f65-1023-4388-95c3-20a7eab7c8a2.jsonl`

| Locator | What's there, and why open it |
|---|---|
| L217 | First reaction to the state of the first attempt: "The idea that it just needed a clarity rewrite is, I think, largely proven to be untrue"; moving workflow processes over from verisectorium and ASF; coordinator self-checking versus a separate verification pass. |
| L403–L542 | The misattributed-slogan episode in his own words: "Anything that is asserted in AAT that rests on who stated it is garbage"; whether the phrase illuminates anything; L542 on the first coordinator failing to "see through the cruft and vestiges and poor naming". |
| **L733** | **The reframe.** Truth as the "user", and deference to Joseph in new projects as the failure. "Since this is no longer a refactor for clarity but rather a foundation-refactor"; applying verisectorium "very concretely (including with tooling)" and "applying it immediately to a piecewise rebuild of AAT"; "SoPs are a critical 'atom' of this new project". |
| L755, L994, L998 | The context-overflow rewind. L998 is the rewritten prompt: what he wants understood first (ASF FORMAT, FORMAT-TODO, all outlines, the SPIKE template), "become the expert at the new model … then start having forks or fresh agents port things over". L755 is the abandoned original. |
| L1093–L1168 | How he wanted the fresh-agent review run ("Don't overprescribe"; "don't fall into the trap of being too deferential to the feedback"; findings and history in separate files). |
| **L1295–L1455** | His critique of the 09-29 proposal and taxonomy: missing definitions and lexicon, SOPs, influx, working notes, epistemic labels; "are 'Questions' … what?"; empirical data and attestations (L1350); derivation versus result versus corollary versus no-go (L1392); "absurd to consider it sealed" (L1407); "changes *only* the things I happened to notice" (L1455). |
| L1510–L1518 | His question about a general model for claims that accumulate evidence from several sources (L1510); the agent's RC1-based answer (L1513); his "did verisectorium and RC1 then essentially clarify nothing?" (L1515); the agent's reply (L1518). |
| **L1532** | **Where vsect starts as a tool.** A phased approach that begins with only an influx directory and no declared types; a hypothetical `vsect [verb:subverb:...]` CLI "primarily for agents", with udon payloads in and udon on stdout/stderr. |
| L1553–L1595 | His verdict on the resulting sketch: "architectural plumbing without the porcelain that actually helps the project stay focused on the problem domain … instead of essentially trying to conceptualize a complex RDF graph" (L1590). |

### A2. ASF, 2026-09-25: how the first attempt was launched
`/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-arch-asf/7d939998-1c3e-44ad-88c6-0e4c02c4af63.jsonl`

| Locator | What's there |
|---|---|
| **L37** | The founding brief, about 7k characters: the 830–1,100-page PDF and "the clarity of everything is phenomenally poor"; the per-segment finder agent, intermediate file and rewrite method; his red flags. This is the method v3 is reacting against, in his own framing. |
| **L444** | Item 5: "verisectorium has very strong and well-grounded opinions on this sort of thing that will be inculcated later". His sketch of the layers: clean formal statements as a DAG, a parallel delivery layer, intro and impl as a second pass. |
| L517, L545 | Scopes and edge cases fully developed in the formal layer but footnoted in the delivery layer; "how to best guide the reader's mental model … the true craft"; "I could have gotten this far … if such-and-such had been established in a different order". |
| **L758** | **The guiding principles that "overrule and supersede any of my leans":** love of truth, including its dissemination and "minimizing time to comprehension"; "thin branch" applicability; "the tell will be when edge cases … all of a sudden already have answers". Also his body-in-world doubts. |
| L1035 | "information is physical"; "It is completely appropriate to have a hypothesis as a load-bearing segment". |
| L1192–L1222 | Spike-brief corrections: don't prime with your guesses about weak spots; a spike is first a research quest; when sharing context helps and when it primes. |

### A3. aat-refactored, 2026-09-30 to 10-01: verisectorium mechanics decided with Joseph, which became spec-lite's SOP store
`/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-aat-refactored/073f016a-cd06-4410-898f-dc8454e79123.jsonl`

| Locator | What's there |
|---|---|
| **L460** | **The pipeline in his words:** udon-lite "is a prerequisite for vsect, which is essentially going to be developed here and then ported over … within verisectorium"; spec-lite as "itself a minor bespoke verisectorium"; "spec-lite-0.1.0 … -> udon-lite parser -> vsect -> aat-refactor"; "Unlike AAT, where decisions and provinance have very little bearing on the quality". |
| **L625–L707** | Canonical frontmatter data versus outline-only rows versus outline columns that reflect canon versus process/view columns; "THE OUTLINE MUST ALWAYS BE TRUE"; his concrete row-type / doc-state / flags proposal (L643); `conforms`; ∂ and ※ columns, with "—" versus "∅" (L675, L686); landed ≠ integrated, and directories carry no meaning (L707). |
| **L751–L884** | Frontmatter declares kind; slug prefixes are clues, and the history of why ASF uses them; the `[[kind:slug]]` resolution order (L751); kind mutation is "a dissolution and emergence of something else", no mixed records, a file as the referent (L756); "it really is the kinds-map that tells us what the corpus is", outline = view as "a *working theory*", defined-term delimiters «…» (L825); "sop absolutely needs its own adr/dec set … authority/provinance … *is* proper even in something like AAT" for processes, drop `max` for now (L859); `main.outline.md` (L884). |
| L995–L1151 | "outlines are generally meant as *current truth* … not big compilations of those decisions" (L1023); working notes and "frozen" (L1105); open questions belong in working notes and discussion (L1138). |
| L1229 | Delegation of the remaining setup to the coordinator, marked as needing ratification. |
| L1404 | Harness compaction summary of the morning (about 21k characters). Dense, but not his words: use it as an index into L5–L1229. |
| L1615–L1991 | Working notes are "*NOT* for history, changelog, or breadcrumbs" (L1615); objectives, and critical (CTQ) versus required (L1764, L1802); record-to-decision links; "supported" versus "ratified" (L1916); have an agent read vivarium's `core/src/norm-decision-authority.md` and RC1 for a council/support proposal (L1940–L1991). |
| L2041–L2236 | Cleaning out the guessed udon content: "clear all that crap out … Retain just enough to show the process"; "Discussion", not "Why". |

### A4. Today's ask
`/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-aat-v3/4788185b-b81d-4ff7-b56f-8a62778892dd.jsonl` L5. Already quoted in `msc/00-orientation-log.md`. Listed only for completeness.

### A5. udon spec-lite sessions: lite as substrate, and verisectorium practice on a live corpus
`/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-arch-firmatum-udon/`

| Locator | What's there |
|---|---|
| `5930da5d-…jsonl` L899, **L922** | The spec-lite mandate: "*disallow* any grammar that is going to be used in the future"; "In the corpus right now we have a ton of need for this lite parser and tooling"; reserve, not ignore; the pre-design method, with neutral and leans files and chronological history ("older discussions are not necessarily more privileged"). |
| `5930da5d-…jsonl` L1048–L1157 | His correction of a primed finder brief, given while it was running. |
| `5930da5d-…jsonl` L1673–L1831 | Adopting address-theory's def/ as core terminology; lexicon discipline (terms in backticks; "this is really sloppy"). |
| `fdcff70f-…jsonl` L277, L288, L485, L687, L887, L938 | Everything outside influx is example content written by a verisectorium expert who wasn't a udon expert; decisions are "not set in stone, that's part of why this process exists"; objectives, principles and CTQ first (L485); reserved syntax is an error (L887, L938). |
| **`293bb1ee-…jsonl` L1361–L1488** | **"Cards, not a queue."** "the purpose of using a verisectorium format is the ease with which the spec can be mutated"; one MUST per card, like an ISO standard; frontmatter carries depends-on and consequences; "Isn't a card a decision already?" |
| `293bb1ee-…jsonl` L2356, L2978, L3414 | Card provenance confusion; his ask for a handoff that names "documents or line-spans" for a successor. |
| `9fa643a2-…jsonl` L678, **L972, L1056** | Card hygiene: no breadcrumbs to defunct drafts; settled cards carry no working notes; `<slug>.context.md` sidecars; "Grounds: debated-decided, see [context]" instead of "Joseph, 2026-10-09: …"; a "strength" scalar for how revisitable a card is; a TODO-MSC collector. |
| `17de2677-…jsonl` L1460–L1496 | Writing a rule as a card, then having a fresh agent find its impact radius. |
| `1be2ea77-…jsonl` L1263, L1444 | CTQ-FACTORS marked steward-supported; giving delegates verbatim line spans, then letting them find the scope themselves. |
| `7a2a536a-…jsonl` L5 (today, 19:46 MDT) | The current state of spec-lite typing work, which he says to ignore. Listed for completeness. |

### A6. verisectorium, August: RC1's birth and Joseph's struggle with it (before memorata's cutoff, so memorata can find these too)
`/Users/josephwecker-v2/.claude.bak.2026-09-23/projects/-Users-josephwecker-v2-src-arch-firmatum-verisectorium/91c680e1-c357-49bd-8a82-12bcb8ca5065.jsonl` (2026-08-31)

| Locator | What's there |
|---|---|
| **L5, L161, L226** | "need to be simultaneously taught everything that it is trying to be vs current bespoke/adhoc verisectoria"; the explanation read as "a rewrite of the docs themselves but with lots more holes"; how to set up a verisectorium with RC1; Q1 "when there doesn't seem to be any domain-level spine". |
| **L302–L356** | The atom-grain dispute, including "Are you saying … an asf/aat src claim/segment would need to be many separate atoms?" (L329), "This is a disaster" (L324), his reframe (L356), and a pointer to ASF segments such as directed-separation and FORMAT as the bridge. |
| L385, L459 | NORMS.md; address theory as "a great big full circle": the don store as event-sourced document parts for automating ASF's atom processing; permission to extend RC1 with address-theory's lexical core. |

`/Users/josephwecker-v2/.claude.bak.2026-08-29/projects/-Users-josephwecker-v2-src-arch-firmatum-verisectorium/`

| Locator | What's there |
|---|---|
| `74630d08-…jsonl` **L632**, L860–L982 | "*zero* confidence that the survey will hand us the taxonomy … an evolved/evolving guess with inertia"; kind versus status and the history of slug prefixes; the stress test as a "forcing function". |
| `10422f61-…jsonl` L339, L388 | "The ultimate objective is for any agent creating a verisectorium to look at the kinds of things they need … That mental model … seems now as far away as ever"; declaring readiness before orienting. |
| `8c60280d-…jsonl` L376–L507, L1217–L1312 | RC1 drafting: tone and altitude, terms, the "lock" he couldn't understand ("I think in terms of bayesian updates and WoE"). |
| `9f6f9ad9-…jsonl` L114–L124, L323 | Template process-state semantics (override / template / proposed / drafted as one axis); agents without SOPs leaving breadcrumbs. |

### A7. Other projects where Joseph talks verisectorium (late Sept to Oct)
| Locator | What's there |
|---|---|
| `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-ai-risk-model/54a2430e-b7be-4ac7-a487-7c24e52f6f39.jsonl` L577, L661, **L1087**, L1119, **L1361**, L1394, L1411 | (2026-10-10/11) Alpha/beta/gamma failure history (L577). The three output audiences (L661). "one thing that is citable and a thing that fails in specific ways as a whole"; "Slug stability vs composed outline is … a solved problem across dozens of verisectoria"; segment by intended logic, not by source layout (L1087). Delimiters for verification level (L1119). Sidecars versus sections judged by TST co-change frequency, git hooks for attesting upgrades (L1361). README versus outline, noting 01-aat-core has no README (L1394). A `sop:` namespace in def/ (L1411). |
| `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-limen/617b0fe9-553a-4f7d-85a7-aa572e94781d.jsonl` L6394–L6645 | (2026-10-01) The request that produced limen's vsect plugin: specialized editing for udon, following `[[kind:slug]]` links, delineating store/kind/slug/suffix, creating unwritten records "in vsect with more intelligent placement". |
| `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src/a1998e91-c892-4602-9197-48d198a19ca4.jsonl` L133, L895 | (2026-09-23) The estate-survey brief, which includes verisectorium and RC1 samples; his response, including the AISI-responses tar-pit ("propensity for agents to immediately get pulled into 'fact-checking'") and how to label partial reads honestly. |
| `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-aisi-eoi/9c551ac8-1aac-41ed-b85c-28bd1f02ef3c.jsonl` L291, L296 | AISI-responses as "the attempt that was finally scrapped" and "most poisoning"; "basing anything on your extrapolation … of the prior agent's synthesis … is considered highly inneffective and even dangerous here". |

## B. Files where Joseph's words are already gathered (verbatim, or close)

Open these alongside the transcripts. They're faster to read, but each one is somebody's selection.

1. `/Users/josephwecker-v2/src/aat-refactored/scratch/PROCESS.md:7-33` (the "Why" section, 09-25 and 09-29, verbatim) and `:105-170` (state log: pause answers, guiding principles, spike rules, the slogan provenance). The coordinator has already read this; listed here because it's the densest carrier of his 09-25 to 09-29 words.
2. `/Users/josephwecker-v2/src/arch/firmatum/udon/v2/spec-lite-0.1.0/.int/STEWARD-VERBATIM.md` (1,883 lines). Read `:1-244` (09-29 to 10-01, including the "Elsewhere" quotes at `:215-244`, one of which is the 09-30 aat-refactored excerpt) and `:245-~720` (10-08 and 10-09, including the cards message near `:703`). It's udon-scoped, but it carries his verisectorium-process rulings verbatim.
3. `/Users/josephwecker-v2/src/arch/firmatum/udon/v2/spec-lite-0.1.0/sop/influx/jaw-proposal-and-feedback.md` (559 lines, whole). His 09-30 row-type / doc-state / flags proposal with the coordinator's and fork's feedback, iterated in place. It's the working document behind most of A3.
4. Claude project memories distilled from his corrections. Small, whole:
   - `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-aat-refactored/memory/`: five files (foundation-refactor-reframe, examples-mean-a-class, no-unilateral-freezing, ask-decided-position-not-ratify, process-not-content-for-udon).
   - `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-arch-firmatum-udon/memory/`: especially `read-as-reader-ground-up-models.md` ("you can only create and verify and use a theory like this if the mental model gets correctly built from the ground up — not as a 'random-access-semantic-locator' jumble", which it calls the corpus effort's primary premise), plus `distill-from-primaries-only.md`, `v2-sweet-spot-mandate.md`, `cards-not-queue.md`, `ratification-attaches-to-josephs-words.md`, `lean-vs-ruling.md`, `card-hygiene-on-edit.md`, `checks-must-read-the-primary.md`, `corpus-is-not-evidence.md`.
   - `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-arch-asf/memory/project_aat_reboot.md`. It still carries the stale `aat-reboot` path.
5. `/Users/josephwecker-v2/src/arch/firmatum/verisectorium/theory/influx/.integrated/instrumenta-and-realization-2026-08-06.md` (116, whole). The steward's verbatim baseline for tooling and realization. Then `theory/influx/steward-brainstorms/realization-model-v1.md:1-12` (attribution marks [J]/[C]) and `:140-165` (the affordance directive; "global, pwd-aware/root-aware instruments à la git and relata (`vsect` / `vera` / `term` / `sop`)"; the bootstrap list). This is the earliest place I found vsect as a delivery shape.
6. `/Users/josephwecker-v2/src/arch/notes/outline-segments-generalization-2026-07-23.md` (137, whole). The working note where the outline+segments pattern was first generalized (segment as cluster, strata on different clocks). It's the precursor to verisectorium, read against ASF.
7. `/Users/josephwecker-v2/src/arch/notes/opus-5.5-first-impressions-2026-09-23.md:71-80` (the AAT OUTLINE's internal-register problem, with his own outline comment quoted) and `:130-155` ("The organs cost before they pay"; theory running ahead of demand; RC1 "admired and not instantiated"). Joseph read and responded to this file (A7, `a1998e91` L895).
8. `/Users/josephwecker-v2/src/arch/notes/NORMS.md` (193). Programme-wide norms: udon base-name / manifestations / side-cars, processing queues, INFLUX. Joseph pointed an RC1 tutor at it (A6 L385).

## C. vsect: everything that exists

1. `/Users/josephwecker-v2/src/aat-refactored/scratch/vsect-hypothetical-cli.md` (246) and `vsect-porcelain-sketch.md` (232), whole. These are the two artifacts behind A1 L1532–L1595, and the porcelain sketch is the attempt after his "plumbing without the porcelain" verdict. Read them with that verdict in mind.
2. `/Users/josephwecker-v2/src/arch/firmatum/udon/v2/spec-lite-0.1.0/.int/vsect-requirements-on-lite.md` (28, whole). The "spec-lite → a lite parser → vsect → aat-refactored" sentence is at `:7`. Its items are carried from a fork's reading "not yet checked by anyone else".
3. `/Users/josephwecker-v2/src/arch/firmatum/udon/v2/spec-lite-0.1.0/.vsect/kinds.yaml` (97). The only live kinds map, written in the form decided in A3 L751–L884.
4. `/Users/josephwecker-v2/src/arch/firmatum/udon/v2/spec-lite-0.1.0/sop/influx/proposed-verisectorium.md` (290). The 09-30 fork's verisectorium design for spec-lite, including "What vsect wants from lite".
5. `/Users/josephwecker-v2/src/limen/backbone/lua/plugins/vsect.lua` (379), `/Users/josephwecker-v2/src/limen/impl/vs1-links.md` (37), `/Users/josephwecker-v2/src/limen/impl/vs2-links-decorated.md` (27), `/Users/josephwecker-v2/src/limen/PIPELINE.md:42-44`, `/Users/josephwecker-v2/src/limen/for-joseph-tmp.md:120-135`, `/Users/josephwecker-v2/src/limen/design/formats-and-plugins.md`. The one built consumer of vsect conventions, so the conventions already have a dependent.
6. `/Users/josephwecker-v2/src/arch/firmatum/verisectorium/PRACTICA.ud:120-130`. The queued `vsect ls-segments` spike.
7. `/Users/josephwecker-v2/src/arch/firmatum/verisectorium/theory/influx/verisect-and-ldocs.md` (319). verisectorium against Samuel Wecker's live_docs, "two builds of one system". It's the verisectorium finder's territory; listed here because it's the only built comparator for what a vsect-like tool does day to day.

## D. The estate: other deployments of the discipline, as exemplars and as warnings

### D1. spec-lite's SOP store (built 09-30 by the aat-refactored coordinator)
`/Users/josephwecker-v2/src/arch/firmatum/udon/v2/spec-lite-0.1.0/`
- `sop/main.outline.md` (92, whole), then `sop/src/*.md` (21 small `conv-*` / `dir-*` / `ref-*` records, about 30–56 lines each) and `sop/def/*.md` (10 records). This is the discipline written as records, so you can judge directly whether it's porcelain or plumbing.
- `sop/src/ref-hazards.md` (37, whole). Named hazards taken straight from aat-refactored's failures, each with its tell and its check. It may be the most directly reusable single file for v3.
- `sop/adr/setup-delegated-to-coordinator.md` (81), `adr/decision-authority.md` (129), `sop/influx/proposed-decision-authority.md` (191), `sop/influx/adr-check-notes.md` (197). How authority was delegated and recorded, and how the decisions were checked afterwards.
- `sop/influx/udon-team-notes.md` (29). What the owning team experienced.
- `git log -- sop` begins 2026-09-30, and later edits are by the udon team (10-20 card-shape changes "proposed to the SOP side"). That's worth seeing as evidence of how the process held up under real use.

### D2. address-theory (verisectorium deployment #2; the template was seeded from its predecessor)
`/Users/josephwecker-v2/src/address-theory/`
- `CLAUDE.md:10-35` (the priority/modify layout table, as a lived instance of the template's front door), `ORIENT.md` → `sop/src/disc-orient.md` (63), `PRACTICA.ud` (55), `DECISIONS.ud` (49), `CHANGELOG.md` (89).
- `bin/compose-lexicon:1-40` (the design constraint: "Faithfulness … every non-blank source line is checked off") and `bin/compose-defs`. The built def→LEXICON instrument.
- `def/*.ud` (7 files, 24–67 lines). The lexical core RC1 file 11 adopts, and the def format the template expects.
- `inf/ai-risk-model-feedback-2026-10-08.md` (52) and `inf/DEF-FIXES-PROPOSED-2026-10-09.md` (180). A downstream consumer's feedback flowing back through the influx channel: the membrane working in practice.

### D3. vivarium (dormant since 2026-07-31; the most mechanized deployment)
`/Users/josephwecker-v2/src/arch/vivarium/`
- `ORIENT.md:1-126` with `bin/try-me` (566), `bin/prove-me` (767), `bin/orient-check` (170), `hooks/commit-msg`. An orientation gate enforced by tooling. `core/src/ops-orientation-gate.md` (65) is its claim home.
- `FORMAT.md:9-114` ("The segment ontology is adopted from ASF, and it is expected to change"; `status` versus `stage`; "Promotion, and where ASF's model may not fit us"; epistemic triage) and `:209-251` (don't restate definitions; segment voice not diff voice; the linter). This is the closest sibling FORMAT to ASF's.
- `core/src/norm-decision-authority.md` (35; Joseph sent an agent here on 09-30), `core/src/norm-caught-disciplines-become-mechanisms.md`, `core/src/ops-audit-integration.md`, `core/src/ops-changelog-is-the-acceptance-check.md`.
- `ASF.md:1-44`. How vivarium routes to ASF without restating it ("Do not re-prove AAT in vivarium"). That matters for how v3 might relate to the old ASF. Also `core/src/disc-aat-vivarium-object-map.md` and `core/src/form-in-vivia-citation.md` (in-vivo evidence for AAT).
- `core/OUTLINE.md:1-60` (aspect columns, ★ free-read rows) and `CLAUDE.md:48-99` (standing law, the verify loop, claim↔code order).

### D4. comproprium (one deployment, three source directories)
`/Users/josephwecker-v2/src/arch/proprium/comproprium/`
- `README.md:29-48` ("Three source directories, because they have three different failure modes"; "Outlines are views, and they only order").
- `FORMAT.md` (84, whole). Written as divergences from ASF only: D1–D6, including append-only accounts and verbatim-as-primary.
- `bin/check-corpus:1-40`. "the corpus's own falsifier": quote fidelity checked mechanically, because "every verification run … found real defects".
- `GATHERING.md` (130). A harvesting brief in peer voice, with "What has already been learned the expensive way" at `:95-109`.

### D5. ai-risk-model (the most active new verisectorium, Oct; claims and evidence from many sources)
`/Users/josephwecker-v2/src/ai-risk-model/`
- `CLAUDE.md` (136, whole).
- `MODEL-GAMMA-METHODOLOGY-AND-PLAN.md:13-140` (alpha and beta failed, then gamma's principles), `:323-447` (passages, assertions, lineage and corroboration: a working answer to the A1 L1510 question about one claim backed by many sources), `:824-960` ("Decisions for Joseph"; "What could make this wrong").
- `def/*.ud` and `lexicon/` (a built lexicon renderer). Compare these with address-theory's.

### D6. principles (an honest-tiers exemplar)
`/Users/josephwecker-v2/src/arch/firmatum/principles/`
- `src/README.md:1-28`. The template's decided-by vocabulary applied to a real corpus, with an explicit `defacto` confession ("worn as `decided` until they collided with a decision already made").
- `src/norm-three-audiences.md` (61; steward, 2026-10-10). Human with terminal, agentic, and deterministic output. It bears directly on what vsect's output should be.
- `CLI.outline.md` points to `/Users/josephwecker-v2/src/arch/firmatum/utils/aspectus/ASPECTUS.outline.md` (257), a working tool-canon outline with efflux to `src/` (`src/EFFLUX-from-aspectus.md`, 92).

### D7. AISI-responses (template deployment #3; read as a warning)
`/Users/josephwecker-v2/src/AISI-responses/`. Note Joseph's priming warning (top, item 6) before opening.
- `README.md:5-14` (status; "376 rows are a warehouse … never again a synthesis input (that pass failed twice)"), `:37-60` (Warehouse), `:113-125` ("Standing rules that saved the week"; open decisions).
- `/Users/josephwecker-v2/src/arch/firmatum/verisectorium/theory/sop/influx/deploy-3-founding-feedback-2026-08-12.md` (61, whole). "what founding it was actually like", from the first deployment run by a session that wasn't the kit's author. It includes leaving the outline's parts empty because the atom was undecided, and template text carried over that "describes nothing locally". It's the closest analogue to founding v3 from the template.
- `sop/influx/feedback-state-enum-has-no-locally-originated-value.md`, `feedback-subagent-writes-blocked.md`, `feedback-grep-misses-the-defining-segment.md`, `feedback-tools-reference-omits-aspectus.md`. The deployment's later bug reports against the template. I didn't check whether these reached verisectorium (its `theory/sop/influx/` holds only the founding one).
- `CLAUDE.md:15-56` (layout, including the `hierarchy-early-attempt-WARNING` failed-pass record) and `de-novo-feedback.md` (63).

### D8. Successor and delegation discipline (process, not corpora)
- `/Users/josephwecker-v2/src/arch/msc/context-saliency/HYPOTHESES-AND-FINDINGS-2026-09-24.md:389-520` ("the shape of a handoff"; where things stand). Joseph pointed an agent here on 09-24. Relevant because v3 is explicitly planned around losing coordinators to context limits.
- `/Users/josephwecker-v2/src/arch/SUBAGENT-INSTRUCTIONS-notes.md` (128; Joseph-requested 10-07: a receiver-side orientation, asking mid-run, getting clarity from Joseph early) and `/Users/josephwecker-v2/src/arch/SPIKE-PROMPT.template.md` (111).

### D9. Lower priority, but on the same thread
- `/Users/josephwecker-v2/src/arch/asf/empirica/glyph-sequence-perception/METHODOLOGY.md` with `HANDOFF.md`. An ASF empirica refactor (Oct 5–6). Joseph's framing there (`/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-arch-asf-empirica-glyph-sequence-perception/71321f32-eae2-4ac1-a3cb-1e5cbb14b161.jsonl`, the turn at 2026-10-05T18:33Z): "this refactoring is still nascent … revisit from first principles … The ultimate goal isn't to 'get it running'". It's an in-vivo evidence-ladder specimen.
- `/Users/josephwecker-v2/.claude/projects/-Users-josephwecker-v2-src-arch-asf/6cf33147-7165-4a20-b6d1-00fc03f1d28d.jsonl` (10-07, agent-core strategy-DAG engineering over ASF theory). L1227 and L1249–L1331 are Joseph on theory gaps (decisiveness versus certainty; the goal arriving on the same channel as evidence). That's AAT content, not process, but it's recent.
- `/Users/josephwecker-v2/src/arch/msc/councils/` (RONR-OBSERVATIONS.md, ROADMAP.md). Joseph named councils on 09-30 as where serious decisions will eventually go.

## Feedback on the brief

The brief worked: it was clear what to find and what not to digest. Three things I'd pass on:

1. memorata's cutoff should be known up front. A finder told to use memorata for late September onward could honestly report "nothing found."
2. "Other live deployments" undersold the main estate fact: the most recent deployment of the discipline (spec-lite's `sop/`) was made by the previous AAT attempt, and it sits in a directory another finder is mapping as udon. It may be worth telling the spec-lite finder about this, or checking its map for the `sop/` versus content split.
3. A question for Joseph that the record can't answer: is the 09-30 pipeline (lite parser → vsect → AAT) still the plan for v3, or is v3 meant to proceed manually, the way spec-lite did ("basic manual verisectorium")?

I'm available for follow-up questions.
