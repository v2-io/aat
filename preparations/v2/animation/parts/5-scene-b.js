// ── Scene B: time and change (the worked example of the model document, 4.2) ──
const TX = [180, 268, 357, 445, 534, 622, 711, 800];           // work-time ticks
const TIMES = ['08:30', '09:25', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00'];
(function () {
  const S = 'b';
  const f = group(S, 'bT', 30, 40, 'f-stone');
  mk('rect', { class: 'box', width: 570, height: 170 }, f);
  txt(f, null, 12, 16, 'SEGMENT', 't-label'); txt(f, null, 12, 31, 'persistence-threshold  (T)', 't-name');
  [['bk', 50, 'ELI8', 'k1'], ['be', 190, 'DESCRIPTION', 'e1'], ['bd', 330, 'DERIVATION', 'd1'], ['bc', 470, 'FORMAL CLAIM', 'c1']]
    .forEach(([id, x, slot, v]) => card(S, id, x, 80, 125, 60, 'sand', [[null, 15, slot, 't-label'], ['v', 38, v, 't-name'], ['s', 53, '', 't-small']]));
  chip(S, 'bcv', 470, 150, 125, 're-derived', 'teal');

  const u = group(S, 'bU', 680, 40, 'f-stone');
  mk('rect', { class: 'box', width: 250, height: 170 }, u);
  txt(u, null, 12, 16, 'SEGMENT', 't-label'); txt(u, null, 12, 31, 'per-dimension-bound  (U)', 't-name');
  card(S, 'bu', 742, 80, 125, 60, 'sand', [[null, 15, 'FORMAL CLAIM', 't-label'], ['v', 38, 'u1', 't-name'], ['s', 53, '', 't-small']]);
  chip(S, 'buv', 742, 150, 125, 're-derived', 'teal');
  wire(S, 'bref', 'M742,110 L600,110');
  note(S, 'brefL', 640, 30, 'U\u2019s claim is predicated on T\u2019s, and needs it re-derived', 't-note', 'middle');

  // acts
  const a = group(S, 'actT', 330, 255, 'f-slate');
  mk('path', { class: 'wire bind', d: 'M62,0 L62,-113' }, a); mk('path', { class: 'wire bind', d: 'M202,0 L202,-83' }, a);
  mk('rect', { class: 'box', width: 265, height: 24 }, a); txt(a, 'actT.t', 9, 16, 'B re-derived c1 by way of d1', 't-small');
  const w = group(S, 'actW', 50, 255, 'f-slate');
  mk('path', { class: 'wire bind', d: 'M130,0 L130,-43' }, w);
  mk('rect', { class: 'box', width: 265, height: 24 }, w); txt(w, 'actW.t', 9, 16, 'whole-read of T: it coheres', 't-small');
  const fd = group(S, 'actF', 330, 292, 'f-rose');
  mk('rect', { class: 'box', width: 265, height: 24 }, fd); txt(fd, 'actF.t', 9, 16, 'finding: the claim needs a hypothesis H', 't-small');
  const au = group(S, 'actU', 680, 408, 'f-slate');
  mk('rect', { class: 'box', width: 250, height: 24 }, au); txt(au, 'actU.t', 9, 16, 'B re-derived u2', 't-small');
  note(S, 'logN', 50, 310, ['Acts are recorded in the log. Each binds to exactly', 'what it read, for as long as that is unchanged.'], 't-note');

  // the frontier
  const fr = group(S, 'fr', 680, 235, 'f-clay');
  mk('rect', { class: 'box', width: 250, height: 160 }, fr);
  txt(fr, null, 12, 18, 'OWED · THE FRONTIER', 't-label');
  [1, 2, 3, 4].forEach(i => txt(fr, 'fr.l' + i, 12, 22 + i * 24, '', 't-body'));

  // two kinds of time
  const tl = group(S, 'tl', 0, 0, '');
  mk('line', { class: 'axis steady', x1: 60, x2: 900, y1: 470, y2: 470 }, tl);
  txt(tl, null, 60, 448, 'STEADY TIME', 't-label on-paper');
  mk('circle', { class: 'dot fill', cx: 80, cy: 470, r: 6 }, tl); txt(tl, null, 80, 495, 'S0', 't-name on-paper strong', 'middle');
  const wt = group(S, 'wt', 0, 0, '');
  txt(wt, null, 60, 536, 'WORK TIME', 't-label on-paper');
  TX.forEach((x, i) => { mk('line', { class: 'axis', x1: x, x2: x, y1: 463, y2: 477 }, wt); txt(wt, null, x, 495, TIMES[i], 't-small on-paper', 'middle'); });
  note(S, 'wsn', 490, 536, 'between two steady states there is only a working state, which is never “the theory”', 't-note', 'middle');
  const s1 = group(S, 's1', 0, 0, '');
  mk('circle', { class: 'dot fill', cx: 880, cy: 470, r: 6 }, s1); txt(s1, null, 880, 495, 'S1', 't-name on-paper strong', 'middle');
  const now = group(S, 'now', 80, 0, '');
  mk('line', { class: 'now', x1: 0, x2: 0, y1: 440, y2: 462 }, now); mk('path', { d: 'M-5,440 L5,440 L0,448 z', fill: 'var(--ink)' }, now);
})();

const FR = (a, b, c, d) => ({ 'fr.l1': a || '', 'fr.l2': b || '', 'fr.l3': c || '', 'fr.l4': d || '' });
STEPS.push(
{ scene: 'b', ch: 'Time and change', title: 'Two kinds of time',
  text: 'Everything that happens is recorded in the log, and a state is the store as of a point in it. A <strong>steady state</strong> is one the store has rested in. The store moves from one steady state to the next at a single instant, logically: that sequence is <strong>steady time</strong>. The hours in which minds put such a move together are <strong>work time</strong>. In between, the store has only a <strong>working state</strong>: the last steady state plus what has been staged. Here is the store at rest, at S0: segment T, and a claim in segment U that is predicated on T\u2019s.',
  terms: ['log', 'state', 'steady-state', 'working-state', 'steady-time', 'work-time'],
  d: { show: ['bT', 'bk', 'be', 'bd', 'bc', 'bcv', 'bU', 'bu', 'buv', 'bref', 'brefL', 'tl', 'now', 'wt', 'wsn'] } },

{ scene: 'b', ch: 'Time and change', title: 'Acts bind to what they read',
  text: 'An <strong>act</strong> is one recorded thing that an <strong>actor</strong>, an identity the harness attests, did: a check, a review, a decision. It never changes what is written. It <strong>binds</strong> to exactly what it read, for as long as that is unchanged. Agent B re-derived the claim by way of the derivation, so that act read both, and the claim’s value “re-derived” rests on it. Someone read T as a whole and found it coheres. Whether an act counts at all is a matter of <strong>standing</strong>: may this actor do this?',
  terms: ['act', 'actor', 'bind', 'standing'],
  d: { show: ['actT', 'actW', 'logN'] } },

{ scene: 'b', ch: 'Time and change', title: '08:30 — a finding',
  text: 'An auditor finds that T’s claim is false as stated: it needs an extra hypothesis H. The finding is an act, and it is the <strong>perturbation</strong>, the thing that first disturbs a steady store. From here there is a <strong>frontier</strong>: everything still owed before the store is consistent again.',
  terms: ['perturbation', 'frontier'],
  flag: 'Open, and Joseph’s: may readers of the steady state see this finding before its consequences are worked through?',
  d: { show: ['actF', 'fr'], hide: ['logN'], pos: { now: [TX[0], 0] }, txt: Object.assign({ 'bcv.t': 'known broken' }, FR('T’s claim is known broken')), cls: { bcv: 'broken' } } },

{ scene: 'b', ch: 'Time and change', title: '09:25 — one segment changeset',
  text: 'Agent A writes a whole new state of T at once: the claim with H, the derivation reworked, the simple explanation rewritten, and the description left as it was with an <strong>affirmation</strong>: the author\u2019s recorded statement that it is still right. That is a <strong>segment changeset</strong>. Nothing in it comes before anything else. What is written is reconciled by the author, at one instant. Values are not the author’s to set: every act that read the old text stops binding, so the claim falls to “drafted”, and the work to earn it back goes on the frontier.',
  terms: ['segment-changeset', 'affirmation'],
  flag: 'The rule “every dependent is changed or affirmed”, and the split between what is written and values, are proposals built on Joseph’s rule.',
  d: { pos: { now: [TX[1], 0] }, hide: ['actF'],
       txt: Object.assign({ 'bc.v': 'c2', 'bd.v': 'd2', 'bk.v': 'k2', 'be.s': 'affirmed by A', 'bcv.t': 'drafted', 'actT.t': 'B re-derived c1 by way of d1 — no longer binds', 'actW.t': 'whole-read of T — no longer binds' },
            FR('re-derive c2', 'whole-read of T', 'U: its premise was narrowed. Did U use it?', 'U needs re-derived; T’s claim is drafted')),
       cls: { bc: 'changed', bd: 'changed', bk: 'changed', be: 'changed', bcv: '', actT: 'broken', actW: 'broken' } } },

{ scene: 'b', ch: 'Time and change', title: '11:00 — a check binds again',
  text: 'B re-derives the new claim by way of the new derivation. This act reads c2 and d2 and binds to them. The claim is “re-derived” again, and two things leave the frontier.',
  terms: [],
  d: { pos: { now: [TX[2], 0] },
       txt: Object.assign({ 'bcv.t': 're-derived', 'actT.t': 'B re-derived c2 by way of d2' }, FR('whole-read of T', 'U: its premise was narrowed. Did U use it?')),
       cls: { bc: '', bd: '', bk: '', be: '', actT: '' } } },

{ scene: 'b', ch: 'Time and change', title: '11:30 — a second changeset',
  text: 'A finds and fixes an error in a step of the derivation. That is a second changeset on T. B’s check of half an hour ago read d2, so it no longer binds, and the claim is “drafted” once more. This happened in work time. It will leave no trace on the steady line.',
  terms: [],
  d: { pos: { now: [TX[3], 0] },
       txt: Object.assign({ 'bd.v': 'd3', 'bcv.t': 'drafted', 'actT.t': 'B re-derived c2 by way of d2 — no longer binds' }, FR('re-derive c2', 'whole-read of T', 'U: its premise was narrowed. Did U use it?', 'U needs re-derived; T’s claim is drafted')),
       cls: { bd: 'changed', actT: 'broken' } } },

{ scene: 'b', ch: 'Time and change', title: '12:00 — re-derived again',
  text: 'B re-derives by way of d3. The earlier check stays in the log and binds to nothing. It is not neutral, though: B passed a derivation that had an error in it, and that is exactly what the store needs in order to know how much B’s checks are worth.',
  terms: [],
  d: { pos: { now: [TX[4], 0] },
       txt: Object.assign({ 'bcv.t': 're-derived', 'actT.t': 'B re-derived c2 by way of d3' }, FR('whole-read of T', 'U: its premise was narrowed. Did U use it?')),
       cls: { bd: '', actT: '' } } },

{ scene: 'b', ch: 'Time and change', title: '13:00 — the narrowing reaches U',
  text: 'A premise can change in three ways. It can be <strong>refuted</strong>, and what used it loses that support. It can <strong>drop in level</strong>, and what rests on it can claim less. Or it can be <strong>narrowed</strong>, as here, which puts a question to every dependent: did you rely on what is gone? U did. Agent C writes a changeset on U: its claim now assumes H too, and its pointer is declared again against c2.',
  terms: ['refuted', 'dropped-in-level', 'narrowed'],
  flag: 'Treating a narrowed premise as a third case is a proposal. The August model filed it with the soft case.',
  d: { pos: { now: [TX[5], 0] },
       txt: Object.assign({ 'bu.v': 'u2', 'buv.t': 'drafted', 'bu.s': 'now assumes H' }, FR('whole-read of T', 're-derive u2', 'whole-read of U')),
       cls: { bu: 'changed' } } },

{ scene: 'b', ch: 'Time and change', title: '14:00 — the next steady state',
  text: 'B re-derives u2. T and U are each read whole by someone other than their authors. Nothing is owed. Everything since 08:30 is one <strong>atomic changeset</strong>, and only now does the store move, at one instant, to S1. On the steady line T’s derivation went from d1 to d3: d2 was never part of any steady state. And there was never a theory in which T had H and U did not.',
  terms: ['atomic-changeset'],
  flag: 'Open, and Joseph’s: several changesets in progress at once, and whether two that were each completed combine into something steady.',
  d: { show: ['s1', 'actU'], pos: { now: [880, 0] },
       txt: Object.assign({ 'buv.t': 're-derived', 'actW.t': 'whole-read of T: it coheres', 'actU.t': 'B re-derived u2 · U read whole' }, FR('nothing owed')),
       cls: { bu: '', actW: '' } } },
);
