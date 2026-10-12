'use strict';
// Virtual instruments for lab lessons (spec: docs/superpowers/specs/2026-10-12-bmet-academy-design.md,
// sections 3 and 4). Pure math and SVG up front, then the panels. No safety limit, tolerance, or
// reading lives here: every number comes from the lab's scenario. Loaded as a plain script (sets
// window.FRAInstruments) and as a CommonJS module for tests, the same way engine/merge.js is.
// engine/app.js reads window.FRAInstruments only when a lab card renders, never at boot.
(function (root, factory) {
  const api = factory();
  root.FRAInstruments = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 1;
  const NAMES = ['dmm', 'safety', 'monitor', 'infusion', 'defib', 'figures', 'choices'];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = v => (typeof v === 'number' && isFinite(v)) ? v : Number(v) || 0;
  const obj = v => (v && typeof v === 'object') ? v : {};

  // ---------- deterministic jitter ----------
  // FNV-1a over seed|key, mapped to [-1, 1]. The same lab reads the same on every visit, and a
  // test can assert exact values, while two different readings on one panel still differ.
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function jitter(seed, key) { return ((hash(String(seed) + '|' + String(key)) % 2001) / 1000) - 1; }
  // Decimal places implied by a least-significant digit: 0.25 -> 2, 0.5 -> 1, 0.001 -> 3, 1 -> 0, 0 -> 0.
  const decimals = lsd => { if (!(lsd > 0)) return 0; const s = String(lsd); const i = s.indexOf('.'); return i < 0 ? 0 : s.length - i - 1; };
  const fix = (v, lsd) => Number(v.toFixed(decimals(lsd)));
  // A reading is the true value plus at most one least-significant digit of jitter when a seed is given.
  const reading = (value, lsd, seed, key) => fix(value + (seed == null ? 0 : jitter(seed, key) * lsd), lsd);
  const lsdFor = v => { const a = Math.abs(v); return a < 10 ? 0.01 : a < 1000 ? 0.1 : 1; };

  // ---------- compute ----------
  const compute = {};
  const pair = (a, b) => a + '-' + b;
  function lookup(table, a, b) {
    const t = obj(table);
    if (t[pair(a, b)] != null) return { v: t[pair(a, b)], sign: 1 };
    if (t[pair(b, a)] != null) return { v: t[pair(b, a)], sign: -1 };
    return null;
  }
  const OL = (fn, unit) => ({ fn, value: null, unit, text: 'OL', invalid: false, lsd: 0 });
  const INVALID = (fn, unit) => ({ fn, value: null, unit, text: 'INVALID: circuit powered', invalid: true, lsd: 0 });
  // c: { fn: vdc|vac|ohm|adc|cont|diode, a: red point, b: black point, power: bool }
  compute.dmm = function (scenario, c, seed) {
    const sc = obj(scenario); const fn = c.fn || 'vdc'; const power = c.power !== false; const key = fn + ':' + c.a + ':' + c.b;
    const signed = (table, unit, lsd) => {
      if (!power) return { fn, value: 0, unit, text: (0).toFixed(decimals(lsd)) + ' ' + unit, invalid: false, lsd };
      const hit = lookup(table, c.a, c.b); if (!hit) return OL(fn, unit);
      const l = lsd || lsdFor(hit.v); const value = reading(hit.sign * hit.v, l, seed, key);
      return { fn, value, unit, text: value.toFixed(decimals(l)) + ' ' + unit, invalid: false, lsd: l };
    };
    if (fn === 'vdc') return signed(sc.vdc, 'V', 0.01);
    if (fn === 'vac') return signed(sc.vac, 'V', 0.1);
    if (fn === 'adc') return signed(sc.adc, 'A', 0.001);
    if (power) return INVALID(fn, fn === 'ohm' ? 'ohm' : 'V');
    if (fn === 'ohm') { const hit = lookup(sc.ohm, c.a, c.b); if (!hit) return OL(fn, 'ohm'); const l = lsdFor(hit.v); const value = reading(hit.v, l, seed, key); return { fn, value, unit: 'ohm', text: value.toFixed(decimals(l)) + ' ohm', invalid: false, lsd: l }; }
    if (fn === 'cont') { const hit = lookup(sc.cont, c.a, c.b); return hit && hit.v ? { fn, value: 1, unit: '', text: 'Continuity', invalid: false, lsd: 0 } : OL(fn, ''); }
    if (fn === 'diode') { const t = obj(sc.diode); const v = t[pair(c.a, c.b)]; if (v == null) return OL(fn, 'V'); const value = reading(v, 0.01, seed, key); return { fn, value, unit: 'V', text: value.toFixed(2) + ' V', invalid: false, lsd: 0.01 }; }
    return OL(fn, '');
  };
  const condKey = c => (c.polarity === 'reverse' ? 'reverse' : 'normal') + (c.ground === 'open' ? '-open' : '');
  // c: { test: ground|chassis|lead, polarity: normal|reverse, ground: closed|open }
  compute.safety = function (scenario, c, seed) {
    const sc = obj(scenario); const limits = obj(sc.limits); const test = c.test || 'ground';
    if (test === 'ground') { const value = reading(num(sc.ground), 0.01, seed, 'ground'); return { test, value, unit: 'ohm', text: value.toFixed(2) + ' ohm', lsd: 0.01, limit: limits.ground }; }
    const table = obj(sc[test]); const k = condKey(c); const value = reading(num(table[k]), 1, seed, test + ':' + k);
    return { test, value, unit: 'uA', text: value + ' uA', lsd: 1, limit: limits[test] };
  };
  // c: { hr, rhythm: nsr|asystole|vfib, spo2, sys, dia }
  compute.monitor = function (scenario, c) {
    const sc = obj(scenario); const rhythm = c.rhythm || 'nsr';
    return {
      hr: rhythm === 'asystole' ? 0 : rhythm === 'vfib' ? null : Math.round(num(c.hr) + num(sc.hrErr)),
      spo2: Math.round(num(c.spo2) + num(sc.spo2Err)),
      sys: Math.round(num(c.sys) + num(sc.sysErr)),
      dia: Math.round(num(c.dia) + num(sc.diaErr)),
      alarm: rhythm === 'asystole' ? 'ASYSTOLE' : rhythm === 'vfib' ? 'VFIB' : null
    };
  };
  // c: { rate: mL/h set on the pump, minutes: collection time }
  compute.infusion = function (scenario, c) {
    const sc = obj(scenario); const cap = num(sc.cylinderMl) || 100; const g = num(sc.graduation) || 1;
    const trueRate = fix(num(c.rate) * (1 + num(sc.rateErr)), 0.001);
    const exact = Math.min(cap, trueRate * num(c.minutes) / 60);
    const volume = fix(Math.round(exact / g) * g, g);
    const rateFromVolume = num(c.minutes) > 0 ? volume / num(c.minutes) * 60 : 0;
    const errPct = num(c.rate) > 0 && num(c.minutes) > 0 ? (rateFromVolume - num(c.rate)) / num(c.rate) * 100 : 0;
    return { volume, exact, trueRate, rateFromVolume, errPct };
  };
  // c: { energy: joules selected }
  compute.defib = function (scenario, c) {
    const sc = obj(scenario); const e = num(c.energy); const err = num(obj(sc.deliveredErr)[String(e)]);
    return { energy: e, delivered: fix(e * (1 + err), 0.1), chargeSeconds: fix(1 + e / 120, 0.1) };
  };

  // ---------- truth: the verdict a scenario implies, from its own limits ----------
  const truth = {};
  truth.verdict = function (lab) {
    const sc = obj(lab && lab.scenario);
    switch (lab && lab.instrument) {
      case 'safety': {
        if (sc.limits == null || typeof sc.limits !== 'object') return null;
        const lim = sc.limits;
        const provides = v => v != null && (typeof v !== 'object' || Object.keys(v).length > 0);
        if ((provides(sc.ground) && lim.ground == null) || (provides(sc.chassis) && lim.chassis == null) || (provides(sc.lead) && lim.lead == null)) return null;
        const over = (table, limit) => limit != null && Object.keys(obj(table)).some(k => num(table[k]) > num(limit));
        if (lim.ground != null && num(sc.ground) > num(lim.ground)) return 'fail';
        return over(sc.chassis, lim.chassis) || over(sc.lead, lim.lead) ? 'fail' : 'pass';
      }
      case 'monitor': {
        const t = sc.tolerance; const isNum = v => typeof v === 'number' && isFinite(v);
        if (!t || typeof t !== 'object' || !isNum(t.hr) || !isNum(t.spo2) || !isNum(t.nibp)) return null;
        return Math.abs(num(sc.hrErr)) <= t.hr && Math.abs(num(sc.spo2Err)) <= t.spo2 && Math.abs(num(sc.sysErr)) <= t.nibp && Math.abs(num(sc.diaErr)) <= t.nibp ? 'pass' : 'fail';
      }
      case 'infusion': {
        if (typeof sc.tolerance !== 'number' || !isFinite(sc.tolerance)) return null;
        return Math.abs(num(sc.rateErr) * 100) <= sc.tolerance ? 'pass' : 'fail';
      }
      case 'defib': {
        if (!Array.isArray(sc.energies) || !sc.energies.length) return null;
        const t = obj(sc.tolerance);
        return sc.energies.every(e => { const d = compute.defib(sc, { energy: e }).delivered; return Math.abs(d - num(e)) <= Math.max(num(t.floor), num(t.pct) / 100 * num(e)); }) ? 'pass' : 'fail';
      }
      default: return null;
    }
  };

  // ---------- measure: what a reading task's `measure` resolves to ----------
  function measure(lab, task) {
    const m = task && task.measure; if (!lab || !m) return null;
    const sc = lab.scenario;
    switch (lab.instrument) {
      case 'dmm': { const r = compute.dmm(sc, Object.assign({ power: m.power !== false }, m), lab.id); return r.value == null ? { value: null, lsd: 0, text: r.text } : { value: r.value, lsd: r.lsd }; }
      case 'safety': { const r = compute.safety(sc, m, lab.id); return { value: r.value, lsd: r.lsd }; }
      case 'monitor': { const r = compute.monitor(sc, obj(m.set)); const v = r[m.param]; return { value: v == null ? null : v, lsd: 0 }; }
      case 'infusion': { const r = compute.infusion(sc, m); return { value: m.what === 'rate' ? r.rateFromVolume : m.what === 'error' ? r.errPct : r.volume, lsd: 0 }; }
      case 'defib': return { value: compute.defib(sc, m).delivered, lsd: 0 };
      case 'figures': { const f = (obj(sc).figures || [])[num(m.figure)]; return f ? { value: num(f.value), lsd: 0 } : null; }
      default: return null;
    }
  }

  // ---------- validate: every way a lab record can be wrong, as plain sentences ----------
  function validate(lab) {
    const out = []; const p = s => out.push(s);
    if (!lab || typeof lab !== 'object') return ['lab is not an object'];
    if (NAMES.indexOf(lab.instrument) < 0) p(`unknown instrument "${lab.instrument}"`);
    if (!lab.scenario || typeof lab.scenario !== 'object') p('scenario is missing');
    if (!Array.isArray(lab.tasks) || !lab.tasks.length) { p('no tasks'); return out; }
    const why = obj(lab.why); const seen = Object.create(null);
    lab.tasks.forEach((t, i) => {
      const id = t && t.id; const tag = `task ${id || '#' + (i + 1)}`;
      if (!id || !/^[a-z0-9-]+$/.test(id)) p(`${tag}: id must match /^[a-z0-9-]+$/`);
      if (seen[id]) p(`${tag}: duplicate id`); seen[id] = true;
      if (!t.prompt) p(`${tag}: no prompt`);
      if (!Object.prototype.hasOwnProperty.call(why, id) || !why[id]) p(`${tag}: no why`);
      if (t.kind === 'reading') {
        if (!Array.isArray(t.expect) || t.expect.length !== 2 || !isFinite(t.expect[0]) || !isFinite(t.expect[1]) || t.expect[0] > t.expect[1]) p(`${tag}: expect must be [min, max]`);
        else if (t.measure && NAMES.indexOf(lab.instrument) >= 0) {
          const m = measure(lab, t);
          if (!m || m.value == null) p(`${tag}: measure gives no reading (${m && m.text ? m.text : 'unknown point or parameter'})`);
          else if (!(t.expect[0] <= m.value - m.lsd && t.expect[1] >= m.value + m.lsd)) p(`${tag}: expect [${t.expect[0]}, ${t.expect[1]}] does not contain the reading ${m.value} with jitter ${m.lsd}`);
        }
      } else if (t.kind === 'verdict') {
        if (t.expect !== 'pass' && t.expect !== 'fail') p(`${tag}: verdict expect must be "pass" or "fail"`);
        else { const v = truth.verdict(lab); if (v && v !== t.expect) p(`${tag}: verdict expect "${t.expect}" but the scenario's limits say "${v}"`); }
      } else if (t.kind === 'choice') {
        if (!Array.isArray(t.options) || t.options.length < 2) p(`${tag}: choice needs at least two options`);
        else if (!Number.isInteger(t.expect) || t.expect < 0 || t.expect >= t.options.length) p(`${tag}: expect must index an option`);
      } else p(`${tag}: kind must be reading, verdict, or choice`);
    });
    return out;
  }

  // ---------- current: the panel's displayed value for a task (the Record button) ----------
  function current(lab, ui, task) {
    const r = ui && ui.readout; const m = obj(task && task.measure); if (!r) return null;
    switch (lab && lab.instrument) {
      case 'dmm': case 'safety': return r.invalid || r.value == null ? null : r.value;
      case 'monitor': return m.param && r[m.param] != null ? r[m.param] : null;
      case 'infusion': return m.what === 'volume' && r.volume != null ? r.volume : null;
      case 'defib': return r.delivered == null ? null : r.delivered;
      default: return null;
    }
  }

  // ---------- figures: SVG a reading can be taken from ----------
  function figure(f) {
    f = obj(f);
    if (f.kind === 'meter') {
      const min = num(f.min), max = num(f.max) || 1, v = num(f.value); const frac = Math.max(0, Math.min(1, (v - min) / (max - min)));
      const ang = 180 - 180 * frac; const cx = 110, cy = 110, r = 90; const rad = ang * Math.PI / 180;
      const nx = cx + r * Math.cos(rad), ny = cy - r * Math.sin(rad); let ticks = '';
      for (let i = 0; i <= 10; i++) {
        const a = (180 - 18 * i) * Math.PI / 180; const inner = i % 5 ? r - 6 : r - 10;
        ticks += `<line x1="${(cx + inner * Math.cos(a)).toFixed(1)}" y1="${(cy - inner * Math.sin(a)).toFixed(1)}" x2="${(cx + r * Math.cos(a)).toFixed(1)}" y2="${(cy - r * Math.sin(a)).toFixed(1)}" stroke="currentColor" stroke-width="${i % 5 ? 1 : 2}"/>`;
        if (i % 5 === 0) ticks += `<text x="${(cx + (r - 22) * Math.cos(a)).toFixed(1)}" y="${(cy - (r - 22) * Math.sin(a) + 4).toFixed(1)}" font-size="10" text-anchor="middle" fill="currentColor">${min + (max - min) * i / 10}</text>`;
      }
      return `<svg class="fig meter" viewBox="0 0 220 125" width="220" height="125" role="img" aria-label="${esc(f.label || 'analog meter')}" data-kind="meter" data-value="${v}" data-angle="${ang.toFixed(1)}"><path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="currentColor" stroke-width="2"/>${ticks}<line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#C8322B" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="4" fill="currentColor"/><text x="${cx}" y="${cy + 13}" font-size="11" text-anchor="middle" fill="currentColor">${esc(f.unit || '')}</text></svg>`;
    }
    if (f.kind === 'cylinder') {
      const ml = num(f.ml) || 100; const v = Math.max(0, Math.min(ml, num(f.value))); const level = 100 * v / ml;
      const top = 20, bottom = 200, w = 70, x = 30; const h = bottom - top; const liquidTop = bottom - h * v / ml; let ticks = '';
      for (let i = 0; i <= 10; i++) { const y = bottom - h * i / 10; ticks += `<line x1="${x}" y1="${y}" x2="${x + 14}" y2="${y}" stroke="currentColor" stroke-width="1.5"/><text x="${x + 18}" y="${y + 4}" font-size="9" fill="currentColor">${ml * i / 10}</text>`; }
      return `<svg class="fig cylinder" viewBox="0 0 130 220" width="130" height="220" role="img" aria-label="${esc(f.label || 'graduated cylinder')}" data-kind="cylinder" data-value="${v}" data-level="${level.toFixed(1)}"><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="none" stroke="currentColor" stroke-width="2" rx="3"/><rect x="${x + 2}" y="${liquidTop.toFixed(1)}" width="${w - 4}" height="${(bottom - liquidTop).toFixed(1)}" fill="#7fb3ff" opacity="0.7"/>${ticks}</svg>`;
    }
    if (f.kind === 'strip') {
      const rate = num(f.rate), seconds = num(f.seconds) || 6; const px = 100; const W = seconds * px, H = 120, base = 80; let grid = '';
      for (let xg = 0; xg <= W; xg += 4) grid += `<line x1="${xg}" y1="0" x2="${xg}" y2="${H}" stroke="#f0a0a0" stroke-width="${xg % 20 ? 0.3 : 0.8}"/>`;
      for (let yg = 0; yg <= H; yg += 4) grid += `<line x1="0" y1="${yg}" x2="${W}" y2="${yg}" stroke="#f0a0a0" stroke-width="${yg % 20 ? 0.3 : 0.8}"/>`;
      let d = `M0 ${base}`; let beats = 0;
      if (f.flat || rate <= 0 && !f.chaotic) d += ` L${W} ${base}`;
      else if (f.chaotic) { for (let xg = 0; xg <= W; xg += 3) d += ` L${xg} ${(base + 25 * Math.sin(xg / 7) * Math.cos(xg / 11) + 10 * Math.sin(xg / 3)).toFixed(1)}`; }
      else {
        const period = 60 / rate * px;
        for (let x0 = 20; x0 < W; x0 += period) { beats++; d += ` L${(x0 - 14).toFixed(1)} ${base} Q${(x0 - 10).toFixed(1)} ${base - 6} ${(x0 - 6).toFixed(1)} ${base} L${(x0 - 2).toFixed(1)} ${base + 4} L${x0.toFixed(1)} ${base - 50} L${(x0 + 2).toFixed(1)} ${base + 8} L${(x0 + 4).toFixed(1)} ${base} L${(x0 + 10).toFixed(1)} ${base} Q${(x0 + 16).toFixed(1)} ${base - 12} ${(x0 + 22).toFixed(1)} ${base}`; }
        d += ` L${W} ${base}`;
      }
      return `<svg class="fig strip" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(f.label || 'ECG strip')}" data-kind="strip" data-rate="${rate}" data-beats="${beats}" data-seconds="${seconds}">${grid}<path d="${d}" fill="none" stroke="#14212E" stroke-width="1.5"/></svg>`;
    }
    return '';
  }

  // ---------- panels ----------
  // render(el, lab, ui, api): draws the instrument into el and wires its controls. ui is a plain
  // object the app keeps per lab for the page's lifetime, so control positions survive the app's
  // re-renders; ui.readout is the last measurement shown, which the task sheet copies through
  // current(). Buttons use data-ins (never data-act, which belongs to the app). api.toast is optional.
  const PANEL = {}; const HANDLE = {};
  PANEL.figures = lab => `<div class="ins figures">${(obj(lab.scenario).figures || []).map((f, i) => `<figure class="ins-fig"><div class="ins-fig-n">Figure ${i + 1}</div>${figure(f)}${f.caption ? `<figcaption>${esc(f.caption)}</figcaption>` : ''}</figure>`).join('')}</div>`;
  HANDLE.figures = () => false;
  PANEL.choices = lab => `<pre class="ins-text">${esc(obj(lab.scenario).text || '')}</pre>`;
  HANDLE.choices = () => false;

  const sel = (ui, field, opts) => `<select data-field="${field}">${opts.map(([v, l]) => `<option value="${v}" ${ui[field] === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const numField = (ui, field, label, min, max, dis) => `<label class="field">${label}<input type="number" data-field="${field}" min="${min}" max="${max}" value="${ui[field]}" ${dis ? 'disabled' : ''}></label>`;

  // The drawing's natural size, from its width/height attributes or its viewBox, so hotspots can be
  // placed in percent and follow the SVG when CSS scales it to a narrow screen.
  function drawingSize(svg) {
    const s = String(svg || '');
    const w = /\bwidth="(\d+(?:\.\d+)?)"/.exec(s), h = /\bheight="(\d+(?:\.\d+)?)"/.exec(s);
    if (w && h) return { w: Number(w[1]), h: Number(h[1]) };
    const vb = /\bviewBox="\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)\s*"/.exec(s);
    return vb ? { w: Number(vb[1]), h: Number(vb[2]) } : { w: 0, h: 0 };
  }
  // ---- dmm: a function dial, a circuit power switch, two probes placed on drawn test points ----
  const DMM_FNS = [['vdc', 'V DC'], ['vac', 'V AC'], ['ohm', 'Ohms'], ['adc', 'A DC'], ['cont', 'Continuity'], ['diode', 'Diode']];
  function dmmInit(lab, ui) { if (!ui.fn) { ui.fn = 'vdc'; ui.power = obj(lab.scenario).power !== false; ui.a = null; ui.b = null; ui.next = 'a'; ui.kit = false; ui.readout = null; } }
  PANEL.dmm = (lab, ui) => {
    dmmInit(lab, ui); const sc = obj(lab.scenario); const pts = obj(sc.points); const r = ui.readout;
    const size = drawingSize(sc.svg);
    const pct = (v, total) => total > 0 ? Number((100 * num(v) / total).toFixed(2)) : 0;
    const hot = Object.keys(pts).map(p => { const xy = pts[p] || []; return `<button type="button" class="tp ${ui.a === p ? 'red' : ui.b === p ? 'black' : ''}" data-ins="tp" data-arg="${esc(p)}" style="left:${pct(xy[0], size.w)}%;top:${pct(xy[1], size.h)}%" title="Test point ${esc(p)}">${esc(p)}</button>`; }).join('');
    return `<div class="ins dmm">
      <div class="ins-drawing">${sc.svg || ''}${hot}</div>
      <div class="ins-panel">
        <div class="ins-readout ${r && r.invalid ? 'bad' : ''}" data-readout>${ui.kit ? 'Your own meter: type what it reads' : r ? esc(r.text) : '--'}</div>
        <div class="ins-dial">${DMM_FNS.map(([k, l]) => `<button type="button" class="chip" data-ins="fn" data-arg="${k}" aria-pressed="${ui.fn === k}">${l}</button>`).join('')}</div>
        <div class="row" style="gap:10px;flex-wrap:wrap"><button type="button" class="btn small ${ui.power ? 'primary' : ''}" data-ins="power">Circuit power: ${ui.power ? 'ON' : 'OFF'}</button><span class="muted">Red probe: <b>${esc(ui.a || '-')}</b> · Black probe: <b>${esc(ui.b || '-')}</b> · click a test point: first red, then black</span></div>
        <label class="row" style="gap:8px"><input type="checkbox" data-field="kit" ${ui.kit ? 'checked' : ''}> I'm using my own kit and typing my readings</label>
      </div></div>`;
  };
  HANDLE.dmm = (lab, ui, act, arg) => {
    dmmInit(lab, ui);
    if (act === 'fn') ui.fn = arg;
    else if (act === 'power') ui.power = !ui.power;
    else if (act === 'tp') { if (ui.next === 'a') { ui.a = arg; ui.next = 'b'; } else { ui.b = arg; ui.next = 'a'; } }
    ui.readout = ui.kit || !ui.a || !ui.b ? null : compute.dmm(lab.scenario, { fn: ui.fn, a: ui.a, b: ui.b, power: ui.power }, lab.id);
    return true;
  };

  // ---- safety analyzer: test, polarity, ground condition, Test, and the limits card ----
  function safetyInit(ui) { if (!ui.test) { ui.test = 'ground'; ui.polarity = 'normal'; ui.ground = 'closed'; ui.readout = null; } }
  PANEL.safety = (lab, ui) => {
    safetyInit(ui); const sc = obj(lab.scenario); const lim = obj(sc.limits); const r = ui.readout;
    const names = { ground: 'Ground wire resistance', chassis: 'Chassis (enclosure) leakage', lead: 'Patient lead leakage' };
    return `<div class="ins safety"><div class="ins-panel">
      <div class="ins-readout" data-readout>${r ? esc(r.text) : '--'}</div>
      <div class="setup-grid"><label class="field">Test ${sel(ui, 'test', [['ground', names.ground], ['chassis', names.chassis], ['lead', names.lead]])}</label><label class="field">Mains polarity ${sel(ui, 'polarity', [['normal', 'Normal'], ['reverse', 'Reverse']])}</label><label class="field">Ground conductor ${sel(ui, 'ground', [['closed', 'Intact'], ['open', 'Open (lifted)']])}</label></div>
      <div class="row"><button type="button" class="btn primary small" data-ins="test">Test</button></div>
      <table class="plain ins-limits"><thead><tr><th>Limit${sc.standard ? ` (${esc(sc.standard)})` : ''}</th><th>Value</th></tr></thead><tbody>${['ground', 'chassis', 'lead'].filter(k => lim[k] != null).map(k => `<tr><td>${names[k]}</td><td>${esc(lim[k])} ${k === 'ground' ? 'ohm' : 'uA'}</td></tr>`).join('')}</tbody></table>
    </div></div>`;
  };
  HANDLE.safety = (lab, ui, act) => { safetyInit(ui); if (act === 'test') ui.readout = compute.safety(lab.scenario, { test: ui.test, polarity: ui.polarity, ground: ui.ground }, lab.id); else if (act === 'field') ui.readout = null; return true; };

  // ---- patient simulator and monitor ----
  function monInit(ui) { if (ui.hr == null) { ui.hr = 80; ui.rhythm = 'nsr'; ui.spo2 = 98; ui.sys = 120; ui.dia = 80; ui.readout = null; } }
  PANEL.monitor = (lab, ui) => {
    monInit(ui); const r = ui.readout;
    const screen = r ? `${r.alarm ? `<div class="ins-alarm">${esc(r.alarm)}</div>` : ''}<div class="ins-numerics"><div><span class="eyebrow">HR</span><b>${r.hr == null ? '---' : r.hr}</b></div><div><span class="eyebrow">SpO2</span><b>${r.spo2}</b></div><div><span class="eyebrow">NIBP</span><b>${r.sys}/${r.dia}</b></div></div>${figure({ kind: 'strip', rate: r.hr || 0, seconds: 6, flat: r.alarm === 'ASYSTOLE', chaotic: r.alarm === 'VFIB' })}` : '<p class="muted">Apply the simulator settings to see the monitor.</p>';
    return `<div class="ins monitor"><div class="ins-two">
      <div class="ins-panel"><div class="eyebrow">Patient simulator</div><div class="setup-grid">${numField(ui, 'hr', 'ECG rate (bpm)', 30, 300)}<label class="field">Rhythm ${sel(ui, 'rhythm', [['nsr', 'Normal sinus'], ['asystole', 'Asystole'], ['vfib', 'Ventricular fibrillation']])}</label>${numField(ui, 'spo2', 'SpO2 (%)', 70, 100)}${numField(ui, 'sys', 'NIBP systolic (mmHg)', 60, 250)}${numField(ui, 'dia', 'NIBP diastolic (mmHg)', 30, 150)}</div><div class="row"><button type="button" class="btn primary small" data-ins="apply">Apply to simulator</button></div></div>
      <div class="ins-panel ins-screen"><div class="eyebrow">Monitor</div>${screen}</div>
    </div></div>`;
  };
  HANDLE.monitor = (lab, ui, act) => { monInit(ui); if (act === 'apply') { ui.readout = compute.monitor(lab.scenario, { hr: ui.hr, rhythm: ui.rhythm, spo2: ui.spo2, sys: ui.sys, dia: ui.dia }); return true; } return false; };

  // ---- infusion pump flow check: set a rate, run, fast-forward, read the cylinder ----
  function infInit(ui) { if (ui.rate == null) { ui.rate = 100; ui.vtbi = 100; ui.elapsed = 0; ui.running = false; ui.readout = null; } }
  PANEL.infusion = (lab, ui) => {
    infInit(ui); const sc = obj(lab.scenario); const r = compute.infusion(sc, { rate: ui.rate, minutes: ui.elapsed }); ui.readout = ui.elapsed > 0 ? r : null;
    return `<div class="ins infusion"><div class="ins-two">
      <div class="ins-panel"><div class="eyebrow">Pump</div><div class="setup-grid">${numField(ui, 'rate', 'Rate (mL/h)', 1, 999, ui.running)}${numField(ui, 'vtbi', 'VTBI (mL)', 1, 9999, ui.running)}</div>
        <div class="ins-readout" data-readout>${ui.running ? 'RUNNING' : 'STOPPED'} · ${ui.elapsed} min elapsed</div>
        <div class="row" style="gap:8px;flex-wrap:wrap">${ui.running ? `<button type="button" class="btn small" data-ins="ff" data-arg="1">+1 min</button><button type="button" class="btn small" data-ins="ff" data-arg="10">+10 min</button><button type="button" class="btn small ghost" data-ins="stop">Stop</button>` : `<button type="button" class="btn primary small" data-ins="start">Start (empties the cylinder)</button>`}</div></div>
      <div class="ins-panel"><div class="eyebrow">Collection</div>${figure({ kind: 'cylinder', ml: num(sc.cylinderMl) || 100, value: r.volume })}<p class="muted">Read the meniscus to the nearest ${num(sc.graduation) || 1} mL.</p></div>
    </div></div>`;
  };
  HANDLE.infusion = (lab, ui, act, arg) => {
    infInit(ui);
    if (act === 'start') { ui.running = true; ui.elapsed = 0; return true; }
    if (act === 'stop') { ui.running = false; return true; }
    if (act === 'ff') { if (!ui.running) return false; ui.elapsed += num(arg); const maxMin = ui.rate > 0 ? ui.vtbi / ui.rate * 60 : 0; if (ui.elapsed >= maxMin) { ui.elapsed = Math.round(maxMin); ui.running = false; } return true; }
    return false;
  };

  // ---- defibrillator into the analyzer ----
  function defInit(lab, ui) { if (ui.energy == null) { ui.energy = num((obj(lab.scenario).energies || [200])[0]); ui.charged = false; ui.readout = null; } }
  PANEL.defib = (lab, ui) => {
    defInit(lab, ui); const sc = obj(lab.scenario); const r = ui.readout;
    return `<div class="ins defib"><div class="ins-two">
      <div class="ins-panel"><div class="eyebrow">Defibrillator</div><div class="row" style="gap:6px;flex-wrap:wrap">${(sc.energies || []).map(e => `<button type="button" class="chip" data-ins="energy" data-arg="${num(e)}" aria-pressed="${ui.energy === num(e)}">${num(e)} J</button>`).join('')}</div>
        <div class="ins-readout" data-readout>${ui.charged ? `CHARGED ${ui.energy} J` : `Selected ${ui.energy} J`}</div>
        <div class="row" style="gap:8px"><button type="button" class="btn small" data-ins="charge" ${ui.charged ? 'disabled' : ''}>Charge</button><button type="button" class="btn primary small" data-ins="discharge" ${ui.charged ? '' : 'disabled'}>Discharge into the analyzer</button></div></div>
      <div class="ins-panel ins-screen"><div class="eyebrow">Defibrillator analyzer</div><div class="ins-readout" data-readout>${r ? `${r.delivered} J delivered` : '--'}</div><p class="muted">${r ? `Set ${r.energy} J, charge time ${r.chargeSeconds} s.` : 'Charge, then discharge into the analyzer.'}</p></div>
    </div></div>`;
  };
  HANDLE.defib = (lab, ui, act, arg) => {
    defInit(lab, ui);
    if (act === 'energy') { ui.energy = num(arg); ui.charged = false; ui.readout = null; return true; }
    if (act === 'charge') { ui.charged = true; return true; }
    if (act === 'discharge') { if (!ui.charged) return false; ui.readout = compute.defib(lab.scenario, { energy: ui.energy }); ui.charged = false; return true; }
    return false;
  };

  function render(el, lab, ui, api) {
    const draw = lab && PANEL[lab.instrument];
    if (!draw) { el.innerHTML = '<p class="muted">Unknown instrument.</p>'; return; }
    // One listener pair per element; the handlers read the latest lab/ui/api from the holder, so a
    // re-render on the same element replaces the panel instead of stacking a second handler.
    el.__fraIns = { lab, ui: ui || {}, api: api || {} };
    const paint = () => { const h = el.__fraIns; el.innerHTML = PANEL[h.lab.instrument](h.lab, h.ui); };
    if (!el.__fraInsWired) {
      el.__fraInsWired = true;
      el.addEventListener('click', e => {
        const h = el.__fraIns; if (!h) return;
        const b = e.target.closest && e.target.closest('[data-ins]'); if (!b || !el.contains(b)) return;
        const fn = HANDLE[h.lab.instrument]; if (fn && fn(h.lab, h.ui, b.dataset.ins, b.dataset.arg, h.api)) paint();
      });
      el.addEventListener('change', e => {
        const h = el.__fraIns; if (!h) return;
        const f = e.target.closest && e.target.closest('[data-field]'); if (!f || !el.contains(f)) return;
        h.ui[f.dataset.field] = f.type === 'checkbox' ? f.checked : f.type === 'number' ? Number(f.value) : f.value;
        const fn = HANDLE[h.lab.instrument]; if (fn && fn(h.lab, h.ui, 'field', f.dataset.field, h.api)) paint();
      });
    }
    paint();
  }

  return { VERSION, NAMES, jitter, figure, compute, truth, measure, validate, current, render, PANEL, HANDLE };
}));
