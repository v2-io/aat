const STEPS = [];
const scattered = { vc: [80, 90], vd: [560, 70], ve: [120, 320], vk: [640, 420] };
const column    = { vc: [50, 80], vd: [50, 165], ve: [50, 250], vk: [50, 335] };

STEPS.push(
{ scene: 'intro', ch: 'Start', title: 'A store, and its definition',
  text: 'This walks through the model one idea at a time. Each step adds something to the drawing and names the terms it brings in. Where a point is a proposal that Joseph has not confirmed, or is still open, the step says so in italics.',
  terms: ['verisectorium', 'store', 'definition'] },

{ scene: 'a', ch: 'Structure', title: 'Content',
  text: 'A store holds pieces of content. Here are four, from one result in the theory: a formal claim, its proof, a plain description, and an explanation for an eight-year-old.',
  terms: ['content'],
  d: { show: ['vc', 'vd', 've', 'vk'], pos: scattered } },

{ scene: 'a', ch: 'Structure', title: 'Kinds',
  text: 'Every piece of content is of a declared <strong>veritoid kind</strong>. A kind says what form the content takes and which questions may be asked of it. The same kind can serve in many places: the description and the simple explanation are both explanations.',
  terms: ['veritoid-kind'],
  d: { txt: { 'vc.kind': 'kind: claim', 'vd.kind': 'kind: proof-step', 've.kind': 'kind: explanation', 'vk.kind': 'kind: explanation' }, hi: ['vc', 'vd', 've', 'vk'] } },

{ scene: 'a', ch: 'Structure', title: 'Dimensions and their scales',
  text: 'A <strong>dimension</strong> is one question that can be asked of content and answered independently of every other question. A kind declares which dimensions it allows. Each dimension has a <strong>scale</strong>: the answers it can take. A scale may be a number, an unordered set, or a <strong>ladder</strong>, whose ordered steps are its <strong>rungs</strong>. Two dimensions of a claim are drawn here. Nothing has been answered yet.',
  terms: ['dimension', 'scale', 'ladder', 'rung'],
  d: { show: ['dimT'] } },

{ scene: 'a', ch: 'Structure', title: 'Values, in three forms',
  text: 'A <strong>value</strong> is the answer one piece of content has on one dimension. Content together with its values is a <strong>veritoid</strong>. A value takes one of three forms. A <strong>position</strong> says what has actually been done, here the rung reached on the derivation ladder. A <strong>credence</strong> is the probability that a truth claim is true. A <strong>judged value</strong> is a label only judgment can give, held as a spread and not a point. How sure we are is always kept beside the value, never folded into it.',
  terms: ['value', 'veritoid', 'position', 'credence', 'judged-value'],
  d: { show: ['vc.v1', 'vc.v2', 've.v1', 'dimT.cur'] } },

{ scene: 'a', ch: 'Structure', title: 'Written and computed',
  text: 'Everything about a veritoid is either <strong>written</strong> by an author or <strong>computed</strong> by the store. Its content is written. So are two things an author states beside it: its <strong>ground</strong>, which says what could support it and so which dimensions are open, and its <strong>claimed level</strong>, which is what it asserts about its own support. Every value is computed from what has been recorded as done. Nobody types a value. The store’s work is to compare what is claimed with what has been earned.',
  terms: ['written', 'computed', 'ground', 'claimed-level'],
  flag: 'Where the claimed level lives is open: beside the content, inside it, or as a declared limit.',
  d: { show: ['legW', 'legC'], txt: { 'vc.written': 'ground: derivable · claims: theorem' }, hi: ['vc', 'legW', 'legC'] } },

{ scene: 'a', ch: 'Structure', title: 'Bounds and attributes',
  text: 'Two more things attach to a veritoid, and neither is a dimension. A <strong>bound</strong> is written: a limit that is stated and then consulted, such as what this content may assert on its own authority. It is not earned by degrees and has no value. An <strong>attribute</strong> is computed, but it is not an answer to a question: it is a plain measurement with no judgment in it, such as a word count or an age. It has no “how sure”. A rule may turn attributes into a value, and when it does, that is recorded.',
  terms: ['bound', 'attribute'],
  d: { show: ['vc.b', 'vc.a', 'legA'] } },

{ scene: 'a', ch: 'Structure', title: 'A segment and its slots',
  text: 'A veritoid almost never makes sense alone. Veritoids are assembled into a <strong>segment</strong>: a named, ordered whole. Its <strong>segment kind</strong> declares its <strong>slots</strong>: which kind of veritoid fills each, whether it is required, and how many it holds. The segment is what has a <strong>name</strong>, what is written as one whole, and what is reviewed as a whole.',
  terms: ['segment', 'segment-kind', 'slot', 'name'],
  flag: 'Two levels of content, and only two, is the reading of Joseph’s description used here. He has not confirmed it.',
  d: { show: ['segT'], pos: column, hide: ['legW', 'legC', 'legA', 'dimT'],
       txt: { 'vc.slot': 'FORMAL-CLAIM · ONE', 'vd.slot': 'DERIVATION · ANY NUMBER', 've.slot': 'DESCRIPTION · ONE', 'vk.slot': 'ELI8 · AT MOST ONE' } } },

{ scene: 'a', ch: 'Structure', title: 'Inner dependencies',
  text: 'Inside a segment the veritoids rest on one another. The simple explanation rests on the description, and the description rests on the formal claim. The segment’s kind declares these. They are why the whole segment has to be looked at together when one veritoid in it moves.',
  terms: ['inner-dependency'],
  d: { show: ['dep1', 'dep2', 'depL'] } },

{ scene: 'a', ch: 'Structure', title: 'The segment’s own values',
  text: 'A segment has values too, and its kind says how each is got. An <strong>aliased</strong> value is one veritoid’s: this result is as true as its formal claim. A <strong>derived</strong> value is computed from several: it is as fresh as its stalest part. An <strong>own</strong> value is asked of the whole: does it hold together when read as one thing? That one is coherence.',
  terms: ['aliased', 'derived', 'own', 'coherence'],
  d: { show: ['sv1', 'sv2', 'sv3', 'svL', 'svL2', 'svL3'] } },

{ scene: 'a', ch: 'Structure', title: 'Recutting',
  text: 'To <strong>recut</strong> is to change how content is divided without changing what it says. The drawing shows a <strong>split</strong>: a check found that the proof’s steps stand or fall separately, so one veritoid became three in the same slot, each with its own values. The other four are not drawn. <strong>Merge</strong> turns several veritoids that say one thing into one. <strong>Promote</strong> moves veritoids out into a segment of their own. <strong>Fold back</strong> is the reverse. <strong>Retire</strong> takes something out of present truth. None of these may silently break anything that points in.',
  terms: ['recut', 'split', 'merge', 'promote', 'fold-back', 'retire'],
  flag: 'Open: whether a veritoid has an identity of its own that survives being moved. Every recut waits on that.',
  d: { show: ['vd.split'], txt: { 'vd.name': '', 'vd.kind': '', 'vd.written': 'each step has its own values' }, hi: ['vd'] } },

{ scene: 'a', ch: 'Structure', title: 'References and the dependency graph',
  text: 'A veritoid points at other veritoids by a <strong>reference</strong>. The chief one is <strong>predicated-on</strong>: this claim needs that one. Each pointer is of a declared <strong>reference kind</strong>, and a kind exists only because something treats it differently from the others. It points at the specific veritoid relied on, not at a whole segment, and it can say the level it needs. Even when it does not, there is a <strong>latent level</strong>: nothing can be better supported than what it rests on. All such pointers together are the <strong>dependency graph</strong>, which has no cycles.',
  terms: ['reference', 'reference-kind', 'predicated-on', 'dependency-graph', 'latent-level'],
  flag: 'That a pointer is written, and only “does it still hold” is computed, is a proposal.',
  d: { show: ['segU', 'vu', 'ref', 'refL', 'latent'] } },

{ scene: 'a', ch: 'Structure', title: 'Projections',
  text: 'A <strong>projection</strong> is a segment whose slots hold pointers to other segments, in a chosen order: a chapter, a part, a volume. It is a different structure from the dependency graph. It has a coherence of its own, and its kind says what a review of it reads of each member, so that a reworded proof step far below does not make the whole chapter need re-reading. The <strong>canonical projection</strong> says: this is the work, in this order. A segment it does not reach, and that nothing depends on or is depended on by, is an <strong>orphan</strong>. Orphans are allowed, and not drawn here.',
  terms: ['projection', 'canonical-projection', 'orphan'],
  flag: 'The word is confirmed by Joseph. That a projection is a kind of segment is a proposal.',
  d: { show: ['proj', 'pm1', 'pm2', 'pmc'], hide: ['latent'] } },

{ scene: 'a', ch: 'Structure', title: 'Renderings',
  text: 'A file, a page, or the view put in front of someone about to write is a rendering: text produced from the store, as of one state. It is never the thing itself. So a segment can be as small as the truth requires while what is shown is as wide as the work requires.',
  terms: ['rendering'],
  d: { show: ['rend', 'rendL', 'rendW'] } },
);
