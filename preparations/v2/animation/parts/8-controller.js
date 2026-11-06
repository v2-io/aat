// ── controller ──
const DEFAULT_TEXT = {};
for (const id in T) DEFAULT_TEXT[id] = T[id].textContent;
const svg = document.getElementById('svg');
const panels = { intro: document.getElementById('panel-intro'), open: document.getElementById('panel-open') };
let cur = 0;

function stateAt(n) {
  const scene = STEPS[n].scene;
  let first = n; while (first > 0 && STEPS[first - 1].scene === scene) first--;
  const st = { show: new Set(), pos: {}, cls: {}, txt: {} };
  for (let i = first; i <= n; i++) {
    const d = STEPS[i].d || {};
    (d.show || []).forEach(id => st.show.add(id));
    (d.hide || []).forEach(id => st.show.delete(id));
    Object.assign(st.pos, d.pos || {}); Object.assign(st.cls, d.cls || {}); Object.assign(st.txt, d.txt || {});
  }
  const d = STEPS[n].d || {};
  st.hi = new Set(d.hi || d.show || []);
  return st;
}

function render(n) {
  cur = Math.max(0, Math.min(STEPS.length - 1, n));
  const step = STEPS[cur], scene = step.scene, isPanel = scene in panels;
  svg.hidden = isPanel;
  for (const k in panels) panels[k].hidden = k !== scene;
  if (!isPanel) {
    const st = stateAt(cur);
    for (const id in R) {
      const r = R[id];
      const on = r.scene === scene && st.show.has(id);
      const p = st.pos[id] || [r.x, r.y];
      place(r.g, p[0], p[1]);
      r.g.setAttribute('class', r.base + (on ? ' on' : '') + (st.cls[id] ? ' ' + st.cls[id] : '') + (on && st.hi.has(id) ? ' hi' : ''));
    }
    for (const id in T) T[id].textContent = id in st.txt ? st.txt[id] : DEFAULT_TEXT[id];
  }
  const inCh = STEPS.filter(s => s.ch === step.ch), k = inCh.indexOf(step) + 1;
  document.getElementById('where').textContent = step.ch.toUpperCase() + (inCh.length > 1 ? ' · ' + k + ' OF ' + inCh.length : '');
  document.getElementById('cap-title').textContent = step.title;
  document.getElementById('cap-text').innerHTML = step.text;
  document.getElementById('cap-terms').innerHTML = (step.terms || []).map(t => `<span>${t}</span>`).join('');
  document.getElementById('cap-flag').textContent = step.flag || '';
  document.getElementById('count').textContent = (cur + 1) + ' / ' + STEPS.length;
  document.getElementById('prev').disabled = cur === 0;
  document.getElementById('next').disabled = cur === STEPS.length - 1;
  document.querySelectorAll('#ticks button').forEach((b, i) => { b.className = (i < cur ? 'done' : i === cur ? 'now' : '') + (b.dataset.gap ? ' gap' : ''); b.setAttribute('aria-current', i === cur ? 'step' : 'false'); });
  document.querySelectorAll('#chapters button').forEach(b => b.setAttribute('aria-current', b.dataset.ch === step.ch ? 'true' : 'false'));
  try { history.replaceState(null, '', '#step-' + (cur + 1)); } catch (e) {}
}


(function build() {
  const ticks = document.getElementById('ticks'), chapters = document.getElementById('chapters');
  let last = null;
  STEPS.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.title = s.title; b.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' + s.title);
    if (last !== null && s.ch !== last) b.dataset.gap = '1';
    b.addEventListener('click', () => { render(i); });
    ticks.appendChild(b);
    if (s.ch !== last) {
      const c = document.createElement('button');
      c.type = 'button'; c.textContent = s.ch.toUpperCase(); c.dataset.ch = s.ch;
      c.addEventListener('click', () => { render(i); });
      chapters.appendChild(c);
    }
    last = s.ch;
  });
  document.getElementById('prev').addEventListener('click', () => { render(cur - 1); });
  document.getElementById('next').addEventListener('click', () => { render(cur + 1); });
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { render(cur + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { render(cur - 1); e.preventDefault(); }
  });
  const m = /^#step-(\d+)$/.exec(location.hash);
  render(m ? parseInt(m[1], 10) - 1 : 0);
  window.addEventListener('hashchange', () => { const h = /^#step-(\d+)$/.exec(location.hash); if (h && parseInt(h[1], 10) - 1 !== cur) render(parseInt(h[1], 10) - 1); });
})();
