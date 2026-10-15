// FieldReady Academy performance-based questions (PBQs): grading, normalization, answer text, and the
// task renderers for the six task kinds. Loaded before engine/app.js, which owns the views, the
// state, and the test integration. Nothing here reads FRA.course or S; app.js passes what the
// renderers need. Task controls use data-pbq attributes, never data-act, so app.js's click
// delegation ignores them.
window.FRAPbq = (function () {
  const KINDS = ['order', 'match', 'multiselect', 'form', 'command', 'choice'];
  const str = x => x == null ? '' : String(x);
  const squash = s => str(s).trim().replace(/\s+/g, ' ');
  // Field normalizers. Each returns a canonical string; two values match when their canonical strings match.
  const normalize = {
    text: s => squash(s).toLowerCase(),
    number: s => { const n = Number(squash(s)); return Number.isFinite(n) ? String(n) : squash(s).toLowerCase(); },
    ip: s => { const t = squash(s); const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t); return m ? m.slice(1).map(o => String(Number(o))).join('.') : t.toLowerCase(); },
    // A dotted mask and its prefix length are the same answer: both canonicalize to the prefix.
    cidr: s => {
      const t = squash(s).replace(/^\//, '');
      if (/^\d{1,2}$/.test(t)) return '/' + Number(t);
      const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t);
      if (!m) return t.toLowerCase();
      const bits = m.slice(1).map(o => Number(o).toString(2).padStart(8, '0')).join('');
      return /^1*0*$/.test(bits) ? '/' + (bits.indexOf('0') < 0 ? 32 : bits.indexOf('0')) : t;
    }
  };
  function normalizeCommand(s, flagOrder) {
    const t = squash(s).toLowerCase().replace(/\.$/, '');
    if (!t) return '';
    if (flagOrder === false) { const parts = t.split(' '); return parts[0] + (parts.length > 1 ? ' ' + parts.slice(1).sort().join(' ') : ''); }
    return t;
  }
  const fieldNorm = f => normalize[f.normalize] || normalize.text;
  const fieldOk = (f, v) => (f.expect || []).some(e => fieldNorm(f)(e) === fieldNorm(f)(v));
  const commandOk = (t, v) => [].concat(t.expect || [], t.alt || []).some(e => normalizeCommand(e, t.flagOrder) === normalizeCommand(v, t.flagOrder));

  function grade(task, answer) {
    let score = 0; let detail = null;
    switch (task.kind) {
      case 'order': {
        const a = Array.isArray(answer) ? answer : []; const e = task.expect || [];
        const hits = e.map((x, i) => a[i] === x); score = e.length ? hits.filter(Boolean).length / e.length : 0; detail = hits; break;
      }
      case 'match': {
        const a = Array.isArray(answer) ? answer : []; const e = task.expect || [];
        const hits = e.map((x, i) => a[i] != null && a[i] === x); score = e.length ? hits.filter(Boolean).length / e.length : 0; detail = hits; break;
      }
      case 'multiselect': {
        const a = Array.isArray(answer) ? Array.from(new Set(answer)) : []; const e = new Set(task.expect || []);
        const right = a.filter(i => e.has(i)).length; const wrong = a.length - right;
        score = e.size ? Math.max(0, right - wrong) / e.size : 0; detail = { right, wrong }; break;
      }
      case 'form': {
        const a = answer && typeof answer === 'object' ? answer : {}; const fs = task.fields || [];
        const hits = fs.map(f => fieldOk(f, a[f.id])); score = fs.length ? hits.filter(Boolean).length / fs.length : 0; detail = hits; break;
      }
      case 'command': score = commandOk(task, answer) ? 1 : 0; break;
      case 'choice': score = answer != null && Number(answer) === Number(task.expect) ? 1 : 0; break;
      default: score = 0;
    }
    score = Math.round(score * 1000) / 1000;
    return { score, correct: score === 1, detail };
  }

  function emptyAnswer(task) {
    switch (task.kind) {
      case 'order': return [];
      case 'match': return (task.left || []).map(() => null);
      case 'multiselect': return [];
      case 'form': return {};
      case 'command': return '';
      default: return null;
    }
  }
  const NONE = '(no answer)';
  function expectedText(task) {
    switch (task.kind) {
      case 'order': return (task.expect || []).map(i => task.items[i]).join(', ');
      case 'match': return (task.left || []).map((l, i) => `${l}: ${task.right[task.expect[i]]}`).join('; ');
      case 'multiselect': return (task.expect || []).slice().sort((a, b) => a - b).map(i => task.options[i]).join(', ');
      case 'form': return (task.fields || []).map(f => `${f.label}: ${(f.expect || [])[0] || ''}`).join('; ');
      case 'command': return (task.expect || [])[0] || '';
      case 'choice': return str((task.options || [])[task.expect]);
      default: return '';
    }
  }
  function answerText(task, answer) {
    if (answer == null) return NONE;
    switch (task.kind) {
      case 'order': return Array.isArray(answer) && answer.length ? answer.map(i => task.items[i]).join(', ') : NONE;
      case 'match': return (task.left || []).map((l, i) => `${l}: ${answer[i] != null ? task.right[answer[i]] : '(not placed)'}`).join('; ');
      case 'multiselect': return Array.isArray(answer) && answer.length ? answer.slice().sort((a, b) => a - b).map(i => task.options[i]).join(', ') : NONE;
      case 'form': return (task.fields || []).map(f => `${f.label}: ${squash(answer[f.id]) || '(blank)'}`).join('; ');
      case 'command': return squash(answer) || NONE;
      case 'choice': return answer != null && task.options && task.options[answer] != null ? task.options[answer] : NONE;
      default: return NONE;
    }
  }

  // ---------- rendering ----------
  // ui = { order: { taskId: [packIndex in display position] }, answers: { taskId: answer }, sel: { taskId: value }, checked }.
  // Display order is chosen once per task (shuffled) and kept in ui.order so re-renders are stable;
  // answers are always in pack indexes. Controls carry data-pbq, never data-act.
  const shuffled = n => { const a = Array.from({ length: n }, (_, i) => i); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const identity = n => Array.from({ length: n }, (_, i) => i);
  function orderFor(ui, task, n, key) {
    ui.order = ui.order || {}; const k = key || task.id;
    // A multiselect task over consecutive lines (a log, a running-config excerpt) can opt out of the
    // shuffle with shuffle: false so the order a learner reads stays the order the pack wrote.
    const keepOrder = task.kind === 'multiselect' && task.shuffle === false;
    if (!ui.order[k] || ui.order[k].length !== n) ui.order[k] = keepOrder ? identity(n) : shuffled(n);
    return ui.order[k];
  }
  const answerOf = (ui, task) => ui.answers[task.id] != null ? ui.answers[task.id] : emptyAnswer(task);
  const resultOf = (ui, task) => ui.checked ? grade(task, answerOf(ui, task)) : null;
  const taskClass = res => 'pbq-task' + (res ? (res.correct ? ' ok' : ' miss') : '');
  // Everything inside one task card: the stem, the controls for its kind, and, once checked, the
  // verdict with the expected answer and the why. Split out of render so one card can be
  // re-rendered in place while the other cards keep their typed fields and their DOM identity.
  function taskInner(pbq, ui, t, i, helpers) {
    const esc = helpers.esc, inline = helpers.inline || helpers.esc;
    const a = answerOf(ui, t); const res = resultOf(ui, t); const dis = ui.checked ? ' disabled' : '';
    let body = '';
    if (t.kind === 'order') {
      // Display order: the learner's current sequence if any, else the shuffle. The position
      // number sits outside the chip so the chip reads as nothing but the item itself.
      const seq = Array.isArray(a) && a.length === t.items.length ? a : orderFor(ui, t, t.items.length);
      body = `<ol class="pbq-order">${seq.map((pi, pos) => `<li><span class="pbq-pos">${pos + 1}</span><button type="button" class="pbq-chip" data-pbq="order-item" data-index="${pi}" draggable="${ui.checked ? 'false' : 'true'}" aria-pressed="${ui.sel[t.id] === pi ? 'true' : 'false'}"${dis}>${inline(t.items[pi])}</button></li>`).join('')}</ol><p class="muted pbq-hint">Drag, or tap one item then another to swap them, or use the arrow keys.</p>`;
    } else if (t.kind === 'match') {
      const lo = orderFor(ui, t, t.left.length, t.id + ':l'), ro = orderFor(ui, t, t.right.length, t.id + ':r');
      const placed = li => Array.isArray(a) ? a[li] : null;
      const bank = lo.filter(li => placed(li) == null).map(li => `<button type="button" class="pbq-chip" data-pbq="match-item" data-index="${li}" draggable="${ui.checked ? 'false' : 'true'}" aria-pressed="${ui.sel[t.id] === li ? 'true' : 'false'}"${dis}>${inline(t.left[li])}</button>`).join('');
      const slots = ro.map(ri => { const li = Array.isArray(a) ? a.indexOf(ri) : -1; return `<div class="pbq-slot" data-pbq="match-slot" data-index="${ri}" tabindex="${ui.checked ? -1 : 0}"><span class="pbq-slot-label">${inline(t.right[ri])}</span>${li >= 0 ? `<button type="button" class="pbq-chip" data-pbq="match-item" data-index="${li}" draggable="${ui.checked ? 'false' : 'true'}" aria-pressed="${ui.sel[t.id] === li ? 'true' : 'false'}"${dis}>${inline(t.left[li])}</button>` : '<span class="pbq-empty">drop here</span>'}</div>`; }).join('');
      body = `<div class="pbq-bank" data-pbq="match-bank">${bank || '<span class="muted">All placed.</span>'}</div><div class="pbq-slots">${slots}</div><p class="muted pbq-hint">Drag an item onto its match, or tap the item then tap the match. Tap a placed item to return it.</p>`;
    } else if (t.kind === 'multiselect') {
      const oo = orderFor(ui, t, t.options.length); const chosen = new Set(Array.isArray(a) ? a : []);
      body = `<div class="options">${oo.map(oi => `<button type="button" class="option" data-pbq="ms-opt" data-index="${oi}" aria-pressed="${chosen.has(oi) ? 'true' : 'false'}"${dis}><span class="key">${chosen.has(oi) ? 'x' : ''}</span><span>${inline(t.options[oi])}</span></button>`).join('')}</div><p class="muted pbq-hint">Pick every line that applies.</p>`;
    } else if (t.kind === 'form') {
      body = `<div class="pbq-form">${t.fields.map(f => `<label class="field"><span>${esc(f.label)}</span><input type="text" data-pbq="field" data-field="${esc(f.id)}" value="${esc(a && a[f.id] != null ? a[f.id] : '')}" autocomplete="off" spellcheck="false"${dis}></label>`).join('')}</div>`;
    } else if (t.kind === 'command') {
      body = `<div class="pbq-cmd"><span class="pbq-prompt">&gt;</span><input type="text" data-pbq="command" value="${esc(a || '')}" autocomplete="off" spellcheck="false" placeholder="type the command"${dis}></div>`;
    } else {
      const oo = orderFor(ui, t, t.options.length);
      body = `<div class="options">${oo.map((oi, k) => `<button type="button" class="option" data-pbq="choice" data-index="${oi}" aria-pressed="${a === oi ? 'true' : 'false'}"${dis}><span class="key">${'ABCDEFGH'[k] || k + 1}</span><span>${inline(t.options[oi])}</span></button>`).join('')}</div>`;
    }
    const verdict = res ? `<div class="feedback ${res.correct ? 'good' : 'bad'}"><div class="verdict">${res.correct ? 'Correct' : res.score > 0 ? `Partly right (${Math.round(res.score * 100)}%)` : 'Not right'}</div>${res.correct ? '' : `<div><strong>Expected:</strong> ${esc(expectedText(t))}</div>`}<div class="pbq-why">${inline((pbq.why || {})[t.id] || '')}</div></div>` : '';
    return `<div class="q-stem"><span class="muted tnum">${i + 1}.</span> ${inline(t.prompt)}</div>${body}${verdict}`;
  }
  function render(container, pbq, ui, helpers) {
    container.__helpers = helpers;
    ui.answers = ui.answers || {}; ui.sel = ui.sel || {};
    container.__pbq = { pbq, ui };
    container.innerHTML = pbq.tasks.map((t, i) => `<div class="${taskClass(resultOf(ui, t))}" data-task="${helpers.esc(t.id)}" data-kind="${t.kind}">${taskInner(pbq, ui, t, i, helpers)}</div>`).join('');
    if (!container.__pbqWired) { wire(container); container.__pbqWired = true; }
  }
  // The one listener set per container: clicks, drags, keys, and typing on data-pbq controls.
  function wire(container) {
    const ctx = () => container.__pbq || {};
    const taskOf = el => { const card = el.closest('.pbq-task'); const { pbq } = ctx(); return card && pbq ? pbq.tasks.find(t => t.id === card.dataset.task) : null; };
    // One card at a time: re-rendering only the task that changed leaves the other cards' typed
    // fields and the rest of the page untouched. A missing card falls back to the whole container.
    const rerender = tid => {
      const { pbq, ui } = ctx(); if (!pbq || !ui) return;
      const i = pbq.tasks.findIndex(t => t.id === tid); const card = container.querySelector(`.pbq-task[data-task="${tid}"]`);
      if (i < 0 || !card) { render(container, pbq, ui, container.__helpers); return; }
      const t = pbq.tasks[i];
      card.className = taskClass(resultOf(ui, t));
      card.innerHTML = taskInner(pbq, ui, t, i, container.__helpers);
    };
    const seqOf = (ui, t) => { const a = ui.answers[t.id]; return Array.isArray(a) && a.length === t.items.length ? a.slice() : orderFor(ui, t, t.items.length).slice(); };
    const moveOrder = (ui, t, from, to) => { const seq = seqOf(ui, t); const [x] = seq.splice(from, 1); seq.splice(to, 0, x); ui.answers[t.id] = seq; ui.order[t.id] = seq.slice(); };
    const swapOrder = (ui, t, i, j) => { const seq = seqOf(ui, t); [seq[i], seq[j]] = [seq[j], seq[i]]; ui.answers[t.id] = seq; ui.order[t.id] = seq.slice(); };
    const place = (ui, t, li, ri) => { const a = Array.isArray(ui.answers[t.id]) ? ui.answers[t.id].slice() : emptyAnswer(t); const prev = a.indexOf(ri); if (prev >= 0) a[prev] = null; a[li] = ri; ui.answers[t.id] = a; };
    const unplace = (ui, t, li) => { const a = Array.isArray(ui.answers[t.id]) ? ui.answers[t.id].slice() : emptyAnswer(t); a[li] = null; ui.answers[t.id] = a; };
    // rerender(t.id) replaces the card's children, so the focused node is gone even when the same
    // chip reappears at the same spot. Re-query by data-pbq/data-index and refocus, same pattern as
    // the order-item ArrowUp/ArrowDown handler below, so a keyboard user can keep going with arrows.
    const focusMatch = (t, kind, idx) => { const el = container.querySelector(`.pbq-task[data-task="${t.id}"] [data-pbq="${kind}"][data-index="${idx}"]`); if (el) el.focus(); };
    container.addEventListener('click', e => {
      const el = e.target.closest('[data-pbq]'); if (!el || el.disabled) return; const { ui } = ctx(); if (!ui || ui.checked) return;
      const t = taskOf(el); if (!t) return; const kind = el.dataset.pbq; const idx = Number(el.dataset.index);
      if (kind === 'order-item') {
        const seq = seqOf(ui, t); const pos = seq.indexOf(idx);
        if (ui.sel[t.id] == null) { ui.sel[t.id] = idx; } else if (ui.sel[t.id] === idx) { delete ui.sel[t.id]; } else { swapOrder(ui, t, seq.indexOf(ui.sel[t.id]), pos); delete ui.sel[t.id]; }
        rerender(t.id); return;
      }
      if (kind === 'match-item') {
        const a = ui.answers[t.id]; const placed = Array.isArray(a) && a[idx] != null;
        if (placed) { unplace(ui, t, idx); delete ui.sel[t.id]; } else if (ui.sel[t.id] === idx) { delete ui.sel[t.id]; } else { ui.sel[t.id] = idx; }
        rerender(t.id); focusMatch(t, 'match-item', idx); return;
      }
      if (kind === 'match-slot') { if (ui.sel[t.id] != null) { const li = ui.sel[t.id]; place(ui, t, li, idx); delete ui.sel[t.id]; rerender(t.id); focusMatch(t, 'match-item', li); } return; }
      if (kind === 'ms-opt') { const a = new Set(Array.isArray(ui.answers[t.id]) ? ui.answers[t.id] : []); if (a.has(idx)) a.delete(idx); else a.add(idx); ui.answers[t.id] = Array.from(a); rerender(t.id); return; }
      if (kind === 'choice') { ui.answers[t.id] = idx; rerender(t.id); return; }
    });
    container.addEventListener('keydown', e => {
      const el = e.target.closest('[data-pbq]'); if (!el || el.disabled) return; const { ui } = ctx(); if (!ui || ui.checked) return;
      const t = taskOf(el); if (!t) return; const kind = el.dataset.pbq; const idx = Number(el.dataset.index);
      if (kind === 'order-item' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        const seq = seqOf(ui, t); const pos = seq.indexOf(idx); const to = e.key === 'ArrowUp' ? pos - 1 : pos + 1;
        if (to < 0 || to >= seq.length) return; e.preventDefault(); moveOrder(ui, t, pos, to); rerender(t.id);
        const again = container.querySelector(`.pbq-task[data-task="${t.id}"] [data-pbq="order-item"][data-index="${idx}"]`); if (again) again.focus(); return;
      }
      if (kind === 'match-slot' && (e.key === 'Enter' || e.key === ' ')) { if (ui.sel[t.id] != null) { e.preventDefault(); const li = ui.sel[t.id]; place(ui, t, li, idx); delete ui.sel[t.id]; rerender(t.id); focusMatch(t, 'match-item', li); } }
    });
    // Typing lands in ui.answers as it happens, with no re-render to steal the caret, so a repaint
    // of the whole view keeps what the learner typed. collect still reads the fields from the DOM.
    container.addEventListener('input', e => {
      const el = e.target.closest('[data-pbq="field"], [data-pbq="command"]'); if (!el) return; const { ui } = ctx(); if (!ui || ui.checked) return;
      const t = taskOf(el); if (!t) return;
      if (t.kind === 'form') { const a = Object.assign({}, ui.answers[t.id] && typeof ui.answers[t.id] === 'object' ? ui.answers[t.id] : {}); a[el.dataset.field] = el.value; ui.answers[t.id] = a; }
      else ui.answers[t.id] = el.value;
    });
    container.addEventListener('dragstart', e => {
      const el = e.target.closest('[data-pbq="order-item"], [data-pbq="match-item"]'); if (!el) return; const { ui } = ctx(); if (!ui || ui.checked) return;
      const t = taskOf(el); if (!t) return; container.__drag = { task: t.id, kind: el.dataset.pbq, index: Number(el.dataset.index) };
      if (e.dataTransfer) { try { e.dataTransfer.setData('text/plain', el.dataset.index); e.dataTransfer.effectAllowed = 'move'; } catch (err) { /* jsdom */ } }
    });
    container.addEventListener('dragover', e => { if (container.__drag) e.preventDefault(); });
    container.addEventListener('drop', e => {
      const d = container.__drag; if (!d) return; const { ui } = ctx(); container.__drag = null; if (!ui || ui.checked) return;
      const target = e.target.closest('[data-pbq="order-item"], [data-pbq="match-slot"], [data-pbq="match-bank"]'); if (!target) return;
      const t = taskOf(target); if (!t || t.id !== d.task) return; e.preventDefault();
      if (d.kind === 'order-item' && target.dataset.pbq === 'order-item') { const seq = seqOf(ui, t); moveOrder(ui, t, seq.indexOf(d.index), seq.indexOf(Number(target.dataset.index))); rerender(t.id); return; }
      if (d.kind === 'match-item' && target.dataset.pbq === 'match-slot') { place(ui, t, d.index, Number(target.dataset.index)); rerender(t.id); return; }
      if (d.kind === 'match-item' && target.dataset.pbq === 'match-bank') { unplace(ui, t, d.index); rerender(t.id); }
    });
  }
  // Read every task's answer out of the DOM and ui (typed fields come from the DOM; the rest from ui.answers).
  function collect(container, pbq, ui) {
    const out = {};
    pbq.tasks.forEach(t => {
      const card = container.querySelector(`.pbq-task[data-task="${t.id}"]`);
      if (t.kind === 'form') { const a = {}; if (card) card.querySelectorAll('input[data-field]').forEach(inp => { a[inp.dataset.field] = inp.value; }); out[t.id] = a; }
      else if (t.kind === 'command') { const inp = card && card.querySelector('input[data-pbq="command"]'); out[t.id] = inp ? inp.value : ''; }
      else if (t.kind === 'order') { const a = ui.answers[t.id]; out[t.id] = Array.isArray(a) && a.length === t.items.length ? a.slice() : orderFor(ui, t, t.items.length).slice(); }
      else out[t.id] = ui.answers[t.id] != null ? ui.answers[t.id] : emptyAnswer(t);
    });
    return out;
  }

  return { KINDS, normalize, normalizeCommand, grade, emptyAnswer, expectedText, answerText, render, collect };
})();
