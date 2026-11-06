// ── helpers: every drawn thing is a <g class="el" data-id> placed by a CSS transform ──
const NS = 'http://www.w3.org/2000/svg';
const R = {};            // id -> { g, scene, x, y }
const T = {};            // text id -> <text>
function mk(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function place(g, x, y) { g.style.transform = `translate(${x}px,${y}px)`; }
function group(scene, id, x, y, cls, parentId) {
  const parent = parentId ? R[parentId].g : document.getElementById('scene-' + scene);
  const g = mk('g', { class: 'el ' + (cls || ''), 'data-id': id }, parent);
  place(g, x, y);
  R[id] = { g, scene, x, y, base: 'el ' + (cls || '') };
  return g;
}
function txt(g, id, x, y, str, cls, anchor) {
  const t = mk('text', { x, y, class: cls || 't-body' }, g);
  if (anchor) t.setAttribute('text-anchor', anchor);
  t.textContent = str;
  if (id) T[id] = t;
  return t;
}
// a box with lines of text: lines = [[textId|null, dy, string, class], ...]
function card(scene, id, x, y, w, h, fam, lines, parentId) {
  const g = group(scene, id, x, y, 'f-' + fam, parentId);
  mk('rect', { class: 'box', width: w, height: h }, g);
  (lines || []).forEach(l => txt(g, l[0] ? id + '.' + l[0] : null, 9, l[1], l[2], l[3] || 't-body'));
  return g;
}
function chip(scene, id, x, y, w, str, fam, parentId) {
  const g = group(scene, id, x, y, 'f-' + fam, parentId);
  mk('rect', { class: 'box', width: w, height: 20 }, g);
  txt(g, id + '.t', 7, 14, str, 't-small');
  return g;
}
function wire(scene, id, d, cls, arrow) {
  const g = group(scene, id, 0, 0, '');
  const p = mk('path', { class: 'wire ' + (cls || ''), d }, g);
  if (arrow !== false) p.setAttribute('marker-end', 'url(#arr)');
  return g;
}
function note(scene, id, x, y, lines, cls, anchor) {
  const g = group(scene, id, x, y, '');
  [].concat(lines).forEach((s, i) => txt(g, i === 0 ? id + '.t' : id + '.t' + i, 0, i * 15, s, (cls || 't-note') + ' on-paper', anchor));
  return g;
}
