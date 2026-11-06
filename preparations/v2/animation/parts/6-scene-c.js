// ── Scene C: intake and work ──
(function () {
  const S = 'c';
  card(S, 'src', 30, 60, 180, 96, 'sage', [[null, 15, 'SOURCE', 't-label'], [null, 34, 'audit-2026-10.md', 't-name'], [null, 52, 'read by: A, whole', 't-small'], [null, 68, 'cut completely: yes', 't-small'], [null, 84, 'retired when all five are settled', 't-small']]);
  const OUT = ['changed an existing veritoid', 'became a new veritoid', 'already present', 'passed to an inbox (not final)', 'delivered to another store'];
  OUT.forEach((o, i) => {
    const y = 60 + i * 46;
    card(S, 'ck' + i, 260, y, 96, 30, 'sage', [[null, 19, 'chunk ' + (i + 1), 't-small']]);
    wire(S, 'cw' + i, `M356,${y + 15} L436,${y + 15}`);
    chip(S, 'co' + i, 440, y + 5, 230, o, 'paper');
  });
  wire(S, 'cs', 'M210,108 L256,108', '', false);
  note(S, 'cl', 362, 48, 'crossing', 't-note');
  const t = group(S, 'cT', 730, 60, 'f-stone');
  mk('rect', { class: 'box', width: 200, height: 110 }, t);
  txt(t, null, 12, 16, 'SEGMENT', 't-label'); txt(t, null, 12, 31, 'persistence-threshold', 't-name'); txt(t, null, 12, 52, 'what it says: its veritoids', 't-small');
  const ib = group(S, 'cI', 730, 186, 'f-sage');
  mk('rect', { class: 'box', width: 200, height: 62, 'stroke-dasharray': '4 3' }, ib);
  txt(ib, null, 12, 16, 'ITS INBOX', 't-label'); txt(ib, null, 12, 34, 'chunk 4, waiting', 't-name'); txt(ib, null, 12, 51, 'not part of what the segment says', 't-small');
  wire(S, 'ci', 'M670,213 L726,213');

  note(S, 'mq', 60, 340, 'QUEUE', 't-label'); note(S, 'mm', 360, 340, 'MOVE', 't-label'); note(S, 'mk', 700, 340, 'MECHANISMS', 't-label');
  ['claim c2 of T', 'claim u2 of U', 'step 3 of another proof'].forEach((q, i) => chip(S, 'q' + i, 60, 352 + i * 28, 200, q, 'sand'));
  card(S, 'mv', 360, 352, 250, 76, 'slate', [[null, 18, 'derivation: drafted → re-derived', 't-name'], [null, 38, 'first: the content is written and staged', 't-small'], [null, 54, 'standing: not the author of what is read', 't-small'], [null, 69, 'records: what was read, the criterion', 't-small']]);
  ['a rule', 'a single agent', 'a council'].forEach((m, i) => chip(S, 'm' + i, 700, 352 + i * 28, 200, m, 'paper'));
  wire(S, 'mw1', 'M260,390 L356,390'); wire(S, 'mw2', 'M696,390 L614,390');
  note(S, 'mn', 60, 462, ['A move is a declared way for a value to change through an act. Each has a queue of things waiting.', 'A queue can be worked by more than one mechanism. The model says nothing about how a council works inside.'], 't-note');
})();

const C1 = ['src', 'cs', 'cl', 'cT', 'cI', 'ci'].concat([0, 1, 2, 3, 4].flatMap(i => ['ck' + i, 'cw' + i, 'co' + i]));
STEPS.push(
{ scene: 'c', ch: 'Intake and work', title: 'Sources, chunks, crossings, inboxes',
  text: 'Material from outside is a <strong>source</strong>. It is cut, completely, into <strong>chunks</strong>, and each chunk gets a <strong>crossing</strong>: the recorded decision about where it went. The store knows who has read each source and how far its chunks have got, so “unread” is something you can ask for. Every segment has an <strong>inbox</strong> where chunks that bear on it wait. It is not part of what the segment says, so filling or emptying it never makes the segment look changed. What is handed on to another store is a <strong>delivery</strong>.',
  terms: ['source', 'chunk', 'crossing', 'inbox', 'delivery'],
  flag: 'The sprint dealt with about two thousand Working Notes items and retired no sources, because the notes lived inside the text they were about.',
  d: { show: C1, hi: ['src', 'cI'] } },

{ scene: 'c', ch: 'Intake and work', title: 'Moves, queues, mechanisms',
  text: 'A <strong>move</strong> is a declared way for a value to change through an act. Each move has a queue. What works the queue is left open on purpose: a rule, one agent, or a council. Joseph’s diagnosis of the October sprint’s loop was a fresh mind landing a checker’s findings and writing new text that then needed checking. The remedy that points to is that findings go back to the author. Independence belongs on the checking side only.',
  terms: ['move', 'queue', 'mechanism'],
  flag: 'The model supports that remedy and does not yet enforce it.',
  d: { show: ['mq', 'mm', 'mk', 'q0', 'q1', 'q2', 'mv', 'm0', 'm1', 'm2', 'mw1', 'mw2', 'mn'], hi: ['mv'] } },

{ scene: 'open', ch: 'What is open', title: 'What is open, and what is only proposed',
  text: 'The model is a working one. These are the places where it is undecided, and the places where it rests on a step nobody has confirmed.',
  terms: [] },
);
