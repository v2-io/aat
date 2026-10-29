# The logical model — what you hold in mind while using vsect

*Draft, revised after two de novo audits (2026-10-28). This is the model vsect presents to its users. The contracts that make it hold — grammar, identity, versions, edges, events, projections, reconciliation — are in [`core.md`](core.md), which a user should never need to read. Files are described in [`storage.md`](storage.md).*

## One fate, one atom

Everything below rests on one principle, worked out in conversation with Joseph on 2026-08-31 and endorsed by him there (*"OK-- excellent. This seems a lot more reasonable"*):

> An atom is the thing with one fate. Its parts share that fate; a separate atom has its own. Ask of any piece: could this be refuted, superseded or ratified while that piece carries on unaffected? If so, they are two atoms.

So a claim's formal statement, the sentence that summarizes it, the gloss that explains it and the discussion that defends it are **one atom**: a bad gloss mis-states the claim, a broken derivation un-supports it, and both troubles land on the claim's account. Two claims sitting in one file, where a counterexample could kill one and leave the other standing, are **two atoms** — and a file is only where they are kept.

In this model the atom is called a **statement**. (Verisectorium RC1 calls the same thing a *record*; this model keeps "record" for the file, because that is what people already mean by it. The mapping is RC1 record = vsect statement; RC1's grouping = vsect record.)

## The nouns

### Statement — the atom

A **statement** is the unit that can be right or wrong on its own: `segment:scope-agency#contrast-condition`. Evidence attaches to statements, findings target them, dependencies run between them, and their history is their own.

A statement has a **stable id** that survives rewording and moving; it is **minted**, and later **retired**, **superseded**, **split**, **merged**, or **renamed** (with its history carried) — never silently lost when its text changes. Two statements may not share an id; vsect surfaces a collision rather than resolving it.

A statement's text is everything that shares its fate: its formal content and the prose that states, summarizes, glosses or defends it. Prose that speaks about *several* statements at once (a chapter introduction, an implications section, a summary paragraph covering three claims) is not part of any one of them; it is **teaching** (below), and it goes stale when any statement it speaks about changes. Truth-apt prose that belongs to no statement and to no teaching is the unaddressable layer where ASF's recorded defects sit; `vsect check` reports it.

Each statement does one thing — its **statement-kind** — and is judged by what it does: a *definition* introduces a term; a *scope* says which systems the theory addresses; a *choice* is a modeling choice where another would also fit; a *postulate* is asserted of everything in scope; a *claim* is truth-apt at whatever stage of support (hypothesis, derived and empirical are stages of one kind, so a claim's id never changes as support moves); a *no-go* says something cannot be done under stated conditions; a *norm* prescribes, given an aim; a *recognition* names a pattern across statements. These are candidates for a theory store's founding, not settled kinds (see *Kinds*, below).

### Record — where statements are kept

A **record** is a file: `kind:slug`. It is the unit you open, read, file, order in an outline and cite as a whole. Some records hold exactly one statement and take that statement's kind (a question, a decision, a purpose statement, a report, a term group). Others hold several statements and exist to keep them together for reading — an AAT **segment** is one of these. A segment is not a kind of truth; it is a container, and it fails only by holding the wrong things together. A record's kind never changes; a record that turns out to be the wrong kind is retired and replaced, linked by `was:`.

### Store

A **store** is one verisectorium: a directory whose root holds `.vsect/`. A store may hold another (an SOP store inside a theory store); vsect works in the nearest store above the current directory and reaches another as `store/kind:slug` through a declared mapping. Directories inside a store organize; they mean nothing.

### Evidence, lines and rungs

A statement's **evidence** is everything recorded as done to secure it, sorted into **lines** — one per kind of support it could stand on, declared when it is minted ("the instrument follows the ground"). Each line climbs **rungs**:

| Line | Rungs, lowest first | What breaks it (a result, not a failure) |
|---|---|---|
| derivation | drafted → premises checked → independently re-derived | a counterexample: the claim becomes a no-go |
| simulation | prediction committed → run once → swept → reproduced by another | a committed prediction missed |
| instance | mapping proposed → mapping checked under perturbation → a prediction checked | the mapping breaks: the claim's scope narrows |
| imported | named, not read → recalled → found by search → checked at a secondary → checked at the primary | the carriage was wrong, or the source changed |
| measured | anecdotal → measured once → robust across populations → calibrated | bias, inconsistency, imprecision |
| testimony | captured → corroborated → corroborated by another kind of evidence | impeachment |

*Imported* is the line for a theorem brought from outside (Lyapunov, the Causal Hierarchy Theorem, Čencov): capped at its source's standing. *Simulation* results carry their **era** (the code version they ran under) and expire visibly when it changes. A line is moved only by its own acts. An author's own assertion is the lowest rung of a line, never more. Endorsement, a decision, or a fine explanation moves no line. These ladders are candidates too; each store declares its own.

### Standing — computed, never typed

A statement's **standing** is what its evidence currently supports, computed from the record of acts, shown with the moment it was computed at. It is always computed; there is no way to type it. Until a store has declared exactly how standing is computed for each statement-kind (and tested that computation), vsect shows the raw evidence on each line instead of any summary. A statement's standing lapses when its own text changes, **and when the meaning of something it leans on changes** — a redefined premise or definition upstream stales the checks downstream.

The author separately declares what a statement *is claimed to be* — its **form** (exact under named premises, qualitative, approximate, statistical) — and that is shown beside the standing, never merged into it.

### Event

An **event** is one recorded act: who did it (as a recorded claim, with what they had read), what they did, to which statement at which version, against which criterion, whether that criterion was fixed before the outcome was seen, how to re-run the check, and what came of it. Events are only ever added. Nobody writes them by hand; vsect's verbs emit them. A decision **not** to lift a statement after looking at it is an event too (a **decline**), so that "no event" keeps meaning "nobody looked".

An **episode** groups the events of one sitting — an audit, a verification pass, a cascade — so the act can be judged as a whole and still appear in each statement's history.

### Finding

A **finding** is an item in a report that targets a statement at the version the reporter read. It stays visible on that statement until it is disposed of: answered (by a revision someone other than its author has confirmed answers it), rejected (with a reason), or carried as a known defect. A finding vsect cannot place is kept visible as **unplaced** until a mind binds it.

### Question

A **question** is an open item about the work, phrased as a question, belonging to the store. It has a **closer** — who may close it: *anyone* (the default), *awaiting* (a named piece of work), *steward-fact*, or *steward-purpose*. It closes as *answered*, *rejected* (with what would reopen it) or *superseded*, and stays findable after.

### Decision and purpose

A **decision** records how work is done here (a convention, who verifies what, a delegation), with who decided and how firmly, its grounds, what would reopen it, and who was consulted. Decisions are superseded, never edited. In a theory store a decision never settles whether something about the theory is true.

A **purpose** statement says what the theory, or part of it, is for. It is the one place a steward's authority enters a theory's content: a choice that only purpose can settle cites one, and is flagged for another look when the purpose is revised. Only the store's declared steward may revise one.

The **steward** owns the store's purpose; the **decider** is whoever the store says decides its process questions. They are often the same person and need not be.

### Who moves next

Every record shows who moves next on it: **awaiting a second look** (no independent check yet of something that needs one), **awaiting a decision** (the decider has been asked about this record), **needs work** (an open finding or question here). These are computed from the record's statements and events, not typed. (spec-lite keeps them as typed frontmatter flags, as Joseph proposed; computing them instead is a proposed change, open for him — see [`open.md`](open.md).)

### Teaching

**Teaching** is prose written for readers about statements: a chapter introduction, an implications section, a summary, a brief. It narrates; it never supports. When anything it narrates changes, it goes stale until someone re-reads it against the new text.

### View

A **view** selects and orders records and adds no claims. The **outline** is the main view: the store's reading order, chapter by chapter, with a one-line gloss per row. Some columns are typed (the row's type, its gloss); some are computed (standing, who moves next, open findings) and cannot be edited. The outline must always be true: a row may be a gap, a proposal or a landed record, but it never says something that isn't so.

### Influx

**Influx** is where material waits before becoming part of the store. Each crossing ends *landed* (where), *rejected* (the submitter erred), *needs-review* (the store is honestly unsure) or *skipped* (wrong kind of drop). Material from a **predecessor corpus** (ASF, for AAT v3) crosses with its history: its own findings arrive as findings, and its own status words arrive as what the old corpus claimed — the lowest rung, never standing here.

## Small words used above

- **version**: the digest of a statement's text (after canonical normalization) together with the versions of what it declares it leans on.
- **lift**: an act that moves a statement up a rung.
- **certified**: a claim about a statement that anyone can check without trusting its author — a named criterion, a reader independent enough for the rung, a dated event, a way to re-run it.
- **crossing**: a piece of influx becoming something in the store, or being turned away.
- **ceiling**: the strongest standing a statement could ever reach, given what it is.
- **profile**: a starting set of declarations a store may adopt at founding.

## Kinds — admitted, not inherited

A kind (of statement or of record) earns its place when it fails differently, and is repaired differently, from every other kind. A store starts with **no** declared kinds: `vsect init` writes none. Candidate kinds for a theory store — the statement-kinds above, and record kinds such as term group, derivation, worked example, experiment, run, teaching, question, decision, purpose, report and predecessor material — are offered as founding material, to be run through the founding questions against real records before anything is declared. The first such test planned for AAT v3 is re-marking five ASF Part I segments into statements and checking where their existing findings fall.
