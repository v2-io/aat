// ── Scene A: structure ──
(function () {
  const S = 'a';
  // the segment frame and its name
  const f = group(S, 'segT', 20, 40, 'f-stone');
  mk('rect', { class: 'box', width: 500, height: 440 }, f);
  txt(f, 'segT.l', 12, 16, 'SEGMENT · KIND: DERIVED-RESULT', 't-label');
  txt(f, 'segT.n', 12, 31, 'persistence-threshold', 't-name');

  // four veritoids
  const V = [
    ['vc', 'α > ρ/R bounds mismatch'],
    ['vd', 'Proof, in steps'],
    ['ve', 'Correction must outpace drift'],
    ['vk', 'Wipe faster than the snow falls'],
  ];
  V.forEach(([id, content]) => card(S, id, 0, 0, 210, 70, 'sand', [
    ['slot', 15, '', 't-label'], ['name', 33, content, 't-name'], ['kind', 49, '', 't-small'], ['written', 63, '', 't-small'],
  ]));
  // computed values travel with their veritoid
  chip(S, 'vc.v1', 225, 2, 232, 'position · by derivation: re-derived', 'teal', 'vc');
  chip(S, 'vc.v2', 225, 26, 232, 'credence · 0.93 that it is true', 'teal', 'vc');
  chip(S, 've.v1', 225, 26, 232, 'judged value · follows: probably yes', 'teal', 've');
  // a bound is written; an attribute is computed but is not an answer on a dimension
  chip(S, 'vc.b', 225, 50, 232, 'bound · may assert: an original claim', 'sand', 'vc');
  chip(S, 'vc.a', 225, 74, 232, 'attribute · 9 words · changed 3 days ago', 'plain', 'vc');
  // the dimensions a claim's kind allows, each with its scale
  (function () {
    const d = group(S, 'dimT', 80, 200, 'f-paper');
    mk('rect', { class: 'box', width: 440, height: 84 }, d);
    txt(d, null, 9, 15, 'DIMENSIONS THE KIND \u201cCLAIM\u201d ALLOWS, EACH WITH ITS SCALE', 't-label');
    txt(d, null, 9, 39, 'true by derivation?', 't-small'); txt(d, null, 9, 66, 'how likely true?', 't-small');
    let x = 122; [['sketch', 46], ['drafted', 50], ['premises checked', 100], ['re-derived', 66]].forEach(([r, w]) => {
      mk('rect', { class: 'rungbox', x, y: 25, width: w, height: 20 }, d); txt(d, null, x + 6, 39, r, 't-small'); x += w + 4; });
    txt(d, null, 402, 39, 'ladder', 't-note'); txt(d, null, 122, 66, 'a number from 0 to 1', 't-small'); txt(d, null, 402, 66, 'number', 't-note');
    const c = group(S, 'dimT.cur', 0, 0, '', 'dimT'); mk('rect', { class: 'rungcur', x: 330, y: 25, width: 66, height: 20 }, c);
  })();
  // the derivation, split into steps
  const sp = group(S, 'vd.split', 0, 0, '', 'vd');
  [0, 1, 2].forEach(i => {
    mk('rect', { class: 'box', x: 9 + i * 66, y: 24, width: 60, height: 22 }, sp);
    txt(sp, null, 16 + i * 66, 39, 'step ' + (i + 1), 't-small');
    mk('circle', { cx: 60 + i * 66, cy: 35, r: 3.5, fill: 'var(--teal-ink)' }, sp);
  });

  // legend for written and computed
  chip(S, 'legW', 640, 196, 280, 'written by an author', 'sand');
  chip(S, 'legC', 640, 222, 280, 'computed: a value, an answer on a dimension', 'teal');
  chip(S, 'legA', 640, 248, 280, 'computed: an attribute, a plain measurement', 'plain');

  // inner dependencies
  wire(S, 'dep1', 'M50,370 C24,352 24,305 48,288');
  wire(S, 'dep2', 'M50,285 C6,240 6,150 48,118');
  note(S, 'depL', 30, 215, 'rests on', 't-note').firstChild.setAttribute('transform', 'rotate(-90)');

  // the segment's own values
  chip(S, 'sv1', 40, 430, 150, 'truth = the claim’s', 'teal');
  chip(S, 'sv2', 198, 430, 168, 'freshness = the stalest', 'teal');
  chip(S, 'sv3', 374, 430, 136, 'coherence: holds', 'teal');
  note(S, 'svL', 40, 422, ['ALIASED', ''], 't-label'); note(S, 'svL2', 198, 422, 'DERIVED', 't-label'); note(S, 'svL3', 374, 422, 'OWN', 't-label');

  // a second segment and the reference
  const u = group(S, 'segU', 640, 150, 'f-stone');
  mk('rect', { class: 'box', width: 300, height: 150 }, u);
  txt(u, null, 12, 16, 'SEGMENT · KIND: DERIVED-RESULT', 't-label');
  txt(u, null, 12, 31, 'per-dimension-bound', 't-name');
  card(S, 'vu', 660, 195, 210, 70, 'sand', [
    ['slot', 15, 'FORMAL-CLAIM · ONE', 't-label'], ['name', 33, 'The weak dimension binds', 't-name'], ['kind', 49, 'kind: claim', 't-small'],
  ]);
  wire(S, 'ref', 'M660,230 C600,230 600,115 512,115');
  note(S, 'refL', 640, 124, ['predicated-on \u00b7 needs: re-derived or better', ''], 't-note');
  note(S, 'latent', 640, 322, ['Latent level: this claim can be no better', 'supported than the one it rests on.'], 't-note');

  // a projection
  const p = group(S, 'proj', 20, 494, 'f-iris');
  mk('rect', { class: 'box', width: 920, height: 54 }, p);
  txt(p, null, 12, 16, 'PROJECTION · KIND: CHAPTER', 't-label');
  txt(p, null, 12, 34, 'Persistence and structural limits', 't-name');
  chip(S, 'pm1', 300, 512, 180, '1 → persistence-threshold', 'iris');
  chip(S, 'pm2', 488, 512, 180, '2 → per-dimension-bound', 'iris');
  chip(S, 'pmc', 740, 512, 190, 'coherence of the chapter', 'teal');

  // a rendering
  const r = group(S, 'rend', 700, 350, 'f-paper');
  mk('rect', { class: 'box', width: 96, height: 112 }, r);
  [18, 30, 42, 60, 72, 84].forEach((y, i) => mk('line', { x1: 10, x2: i % 3 === 2 ? 60 : 86, y1: y, y2: y, stroke: 'var(--ink-quiet)', 'stroke-width': 2 }, r));
  note(S, 'rendL', 806, 392, ['persistence-threshold.md', 'a rendering, as of one state'], 't-note');
  wire(S, 'rendW', 'M520,410 L696,410');
})();
