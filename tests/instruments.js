// engine/instruments.js: deterministic instrument math, SVG figures, lab validation. Pure half
// (no DOM) first; the panel block at the end boots jsdom. Run: node tests/instruments.js
'use strict';
const I = require('../engine/instruments.js');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const near = (a, b, eps) => typeof a === 'number' && Math.abs(a - b) <= eps;

check('module loads with its version and the seven instrument names', I.VERSION === 1 && Array.isArray(I.NAMES) && I.NAMES.join(',') === 'dmm,safety,monitor,infusion,defib,figures,choices');

// ---------- jitter ----------
check('jitter is deterministic for the same seed and key', I.jitter('lab-a', 'k') === I.jitter('lab-a', 'k'));
check('jitter stays within [-1, 1]', ['a', 'b', 'c', 'd', 'e'].every(k => { const j = I.jitter('seed', k); return j >= -1 && j <= 1; }));
check('jitter differs across keys', new Set(['a', 'b', 'c', 'd', 'e'].map(k => I.jitter('seed', k))).size > 1);

// ---------- dmm ----------
const DMM = { vdc: { 'A-B': 9, 'B-C': 4.5 }, vac: { 'P-N': 120 }, ohm: { 'B-C': 1000 }, adc: { 'X-Y': 0.009 }, cont: { 'A-B': true }, diode: { 'D-E': 0.65 } };
let r = I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: true });
check('dmm: DC volts across a known pair', near(r.value, 9, 0.011) && r.unit === 'V' && /V$/.test(r.text) && !r.invalid && r.lsd === 0.01, JSON.stringify(r));
check('dmm: swapped probes read negative', I.compute.dmm(DMM, { fn: 'vdc', a: 'B', b: 'A', power: true }).value < 0);
check('dmm: volts with the circuit off read zero', I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: false }).value === 0);
check('dmm: an unknown pair reads OL', I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'Q', power: true }).text === 'OL');
check('dmm: AC volts', near(I.compute.dmm(DMM, { fn: 'vac', a: 'P', b: 'N', power: true }).value, 120, 0.11));
r = I.compute.dmm(DMM, { fn: 'ohm', a: 'B', b: 'C', power: true });
check('dmm: ohms on a powered circuit is invalid', r.invalid === true && r.value === null && /INVALID/.test(r.text), r.text);
r = I.compute.dmm(DMM, { fn: 'ohm', a: 'B', b: 'C', power: false });
check('dmm: ohms with power off', near(r.value, 1000, 1.01) && r.unit === 'ohm' && r.lsd === 1, JSON.stringify(r));
check('dmm: ohms either way round', near(I.compute.dmm(DMM, { fn: 'ohm', a: 'C', b: 'B', power: false }).value, 1000, 1.01));
check('dmm: amps only at the break point', near(I.compute.dmm(DMM, { fn: 'adc', a: 'X', b: 'Y', power: true }).value, 0.009, 0.0011) && I.compute.dmm(DMM, { fn: 'adc', a: 'A', b: 'B', power: true }).text === 'OL');
check('dmm: continuity beeps where the table says so and OL elsewhere', I.compute.dmm(DMM, { fn: 'cont', a: 'A', b: 'B', power: false }).text === 'Continuity' && I.compute.dmm(DMM, { fn: 'cont', a: 'A', b: 'C', power: false }).text === 'OL');
check('dmm: continuity on a powered circuit is invalid', I.compute.dmm(DMM, { fn: 'cont', a: 'A', b: 'B', power: true }).invalid === true);
check('dmm: diode forward drop one way, OL the other', near(I.compute.dmm(DMM, { fn: 'diode', a: 'D', b: 'E', power: false }).value, 0.65, 0.011) && I.compute.dmm(DMM, { fn: 'diode', a: 'E', b: 'D', power: false }).text === 'OL');
check('dmm: a seed jitters by at most one least-significant digit', (() => { const a = I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: true }, 'lab-1'); const b = I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: true }, 'lab-1'); return a.value === b.value && near(a.value, 9, 0.011); })());

// ---------- safety ----------
const SAFE = { standard: 'NFPA 99', ground: 0.12, chassis: { normal: 45, reverse: 60, 'normal-open': 180, 'reverse-open': 210 }, lead: { normal: 8, reverse: 9, 'normal-open': 40, 'reverse-open': 45 }, limits: { ground: 0.5, chassis: 500, lead: 100 } };
r = I.compute.safety(SAFE, { test: 'ground', polarity: 'normal', ground: 'closed' });
check('safety: ground wire resistance in ohms', near(r.value, 0.12, 0.011) && r.unit === 'ohm' && r.limit === 0.5, JSON.stringify(r));
r = I.compute.safety(SAFE, { test: 'chassis', polarity: 'reverse', ground: 'open' });
check('safety: chassis leakage, reverse polarity, open ground, in microamps', near(r.value, 210, 1.01) && r.unit === 'uA' && r.limit === 500, JSON.stringify(r));
check('safety: lead leakage normal', near(I.compute.safety(SAFE, { test: 'lead', polarity: 'normal', ground: 'closed' }).value, 8, 1.01));

// ---------- monitor ----------
const MON = { hrErr: 1, spo2Err: -1, sysErr: 2, diaErr: -1, tolerance: { hr: 2, spo2: 2, nibp: 3 } };
r = I.compute.monitor(MON, { hr: 80, rhythm: 'nsr', spo2: 98, sys: 120, dia: 80 });
check('monitor: numerics are the simulator plus the scenario offsets', r.hr === 81 && r.spo2 === 97 && r.sys === 122 && r.dia === 79 && r.alarm === null, JSON.stringify(r));
check('monitor: asystole reads zero with an alarm', (() => { const m = I.compute.monitor(MON, { hr: 80, rhythm: 'asystole', spo2: 98, sys: 120, dia: 80 }); return m.hr === 0 && m.alarm === 'ASYSTOLE'; })());
check('monitor: fibrillation has no rate and an alarm', (() => { const m = I.compute.monitor(MON, { hr: 80, rhythm: 'vfib', spo2: 98, sys: 120, dia: 80 }); return m.hr === null && m.alarm === 'VFIB'; })());

// ---------- infusion ----------
const INF = { rateErr: 0.03, cylinderMl: 100, graduation: 1, tolerance: 5 };
r = I.compute.infusion(INF, { rate: 100, minutes: 30 });
check('infusion: delivered volume follows the true rate and reads to the graduation', near(r.exact, 51.5, 0.001) && r.volume === 52 && r.trueRate === 103 && near(r.rateFromVolume, 104, 0.001) && near(r.errPct, 4, 0.001), JSON.stringify(r));
check('infusion: the cylinder caps the volume', I.compute.infusion(INF, { rate: 600, minutes: 60 }).volume === 100);
check('infusion: zero minutes is empty', I.compute.infusion(INF, { rate: 100, minutes: 0 }).volume === 0);

// ---------- defib ----------
const DEF = { energies: [2, 50, 200, 360], deliveredErr: { '200': 0.02, '2': 0.1 }, tolerance: { pct: 15, floor: 4 } };
r = I.compute.defib(DEF, { energy: 200 });
check('defib: delivered energy applies the per-setting error', r.energy === 200 && r.delivered === 204 && r.chargeSeconds > 0, JSON.stringify(r));
check('defib: a setting without an error delivers exactly', I.compute.defib(DEF, { energy: 50 }).delivered === 50);
check('defib: low energy rounds to a tenth', I.compute.defib(DEF, { energy: 2 }).delivered === 2.2);

// ---------- truth.verdict ----------
const lab = (instrument, scenario, tasks, extra) => Object.assign({ id: 'l1', lesson: 'u1l1', title: 'T', instrument, intro: 'i', scenario, tasks, why: {} }, extra || {});
check('verdict: a safe device passes', I.truth.verdict(lab('safety', SAFE, [])) === 'pass');
check('verdict: one leakage over its limit fails', I.truth.verdict(lab('safety', Object.assign({}, SAFE, { chassis: Object.assign({}, SAFE.chassis, { 'reverse-open': 600 }) }), [])) === 'fail');
check('verdict: ground resistance over its limit fails', I.truth.verdict(lab('safety', Object.assign({}, SAFE, { ground: 0.8 }), [])) === 'fail');
check('verdict: a monitor within tolerance passes', I.truth.verdict(lab('monitor', MON, [])) === 'pass');
check('verdict: a monitor off by more than tolerance fails', I.truth.verdict(lab('monitor', Object.assign({}, MON, { hrErr: 3 }), [])) === 'fail');
check('verdict: infusion within tolerance passes, beyond fails', I.truth.verdict(lab('infusion', INF, [])) === 'pass' && I.truth.verdict(lab('infusion', Object.assign({}, INF, { rateErr: 0.06 }), [])) === 'fail');
check('verdict: defib within tolerance passes', I.truth.verdict(lab('defib', DEF, [])) === 'pass');
check('verdict: defib outside the floor at low energy fails', I.truth.verdict(lab('defib', Object.assign({}, DEF, { deliveredErr: { '2': 3 } }), [])) === 'fail');
check('verdict: dmm, figures and choices have no computed verdict', I.truth.verdict(lab('dmm', DMM, [])) === null && I.truth.verdict(lab('choices', { text: 'x' }, [])) === null);

// ---------- measure ----------
check('measure: a dmm task resolves through compute', (() => { const m = I.measure(lab('dmm', DMM, []), { id: 'v', kind: 'reading', measure: { fn: 'vdc', a: 'A', b: 'B' } }); return m && near(m.value, 9, 0.011) && m.lsd === 0.01; })());
check('measure: a monitor task picks its parameter', (() => { const m = I.measure(lab('monitor', MON, []), { id: 'h', kind: 'reading', measure: { param: 'hr', set: { hr: 80, rhythm: 'nsr', spo2: 98, sys: 120, dia: 80 } } }); return m && m.value === 81 && m.lsd === 0; })());
check('measure: infusion volume, rate and error', (() => { const L = lab('infusion', INF, []); const v = I.measure(L, { measure: { what: 'volume', rate: 100, minutes: 30 } }); const rt = I.measure(L, { measure: { what: 'rate', rate: 100, minutes: 30 } }); const e = I.measure(L, { measure: { what: 'error', rate: 100, minutes: 30 } }); return v.value === 52 && near(rt.value, 104, 0.001) && near(e.value, 4, 0.001); })());
check('measure: a defib task', I.measure(lab('defib', DEF, []), { measure: { energy: 200 } }).value === 204);
check('measure: a figure task reads the figure value', I.measure(lab('figures', { figures: [{ kind: 'meter', min: 0, max: 10, value: 6.4, unit: 'V' }] }, []), { measure: { figure: 0 } }).value === 6.4);
check('measure: a task without measure is null', I.measure(lab('dmm', DMM, []), { id: 'x', kind: 'reading' }) === null);

// ---------- validate ----------
const good = lab('safety', SAFE, [
  { id: 'gnd', kind: 'reading', prompt: 'Ground', unit: 'ohm', expect: [0.08, 0.16], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } },
  { id: 'ch', kind: 'reading', prompt: 'Chassis worst case', unit: 'uA', expect: [200, 220], measure: { test: 'chassis', polarity: 'reverse', ground: 'open' } },
  { id: 'v', kind: 'verdict', prompt: 'Pass?', expect: 'pass' },
  { id: 'which', kind: 'choice', prompt: 'Which limit applies?', options: ['500 uA', '100 uA'], expect: 0 }
], { why: { gnd: 'w', ch: 'w', v: 'w', which: 'w' } });
check('validate: a sound lab has no problems', I.validate(good).length === 0, I.validate(good).join('; '));
check('validate: a reading range that cannot contain the truth is reported by task id', I.validate(lab('safety', SAFE, [{ id: 'gnd', kind: 'reading', prompt: 'G', unit: 'ohm', expect: [0.2, 0.3], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } }], { why: { gnd: 'w' } })).some(p => /gnd/.test(p)));
check('validate: a range must leave room for jitter', I.validate(lab('safety', SAFE, [{ id: 'gnd', kind: 'reading', prompt: 'G', unit: 'ohm', expect: [0.12, 0.12], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } }], { why: { gnd: 'w' } })).some(p => /gnd/.test(p)));
check('validate: a verdict that contradicts the scenario is reported', I.validate(lab('safety', SAFE, [{ id: 'v', kind: 'verdict', prompt: 'P', expect: 'fail' }], { why: { v: 'w' } })).some(p => /v\b/.test(p) && /verdict/.test(p)));
check('validate: an unknown instrument is reported', I.validate(lab('oscilloscope', {}, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: { a: 'w' } })).some(p => /instrument/.test(p)));
check('validate: a task id with a colon is reported', I.validate(lab('choices', { text: 't' }, [{ id: 'a:b', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: { 'a:b': 'w' } })).some(p => /id/.test(p)));
check('validate: a missing why is reported', I.validate(lab('choices', { text: 't' }, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: {} })).some(p => /why/.test(p)));
check('validate: a choice expect outside its options is reported', I.validate(lab('choices', { text: 't' }, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 2 }], { why: { a: 'w' } })).some(p => /expect/.test(p)));
check('validate: no tasks is reported', I.validate(lab('choices', { text: 't' }, [])).some(p => /tasks/.test(p)));

// ---------- figures ----------
let svg = I.figure({ kind: 'meter', min: 0, max: 10, value: 5, unit: 'V' });
check('figure: a meter carries its value and a mid-scale needle at 90 degrees', /data-kind="meter"/.test(svg) && /data-value="5"/.test(svg) && /data-angle="90.0"/.test(svg) && /<line/.test(svg), svg.slice(0, 120));
svg = I.figure({ kind: 'cylinder', ml: 100, value: 50, graduation: 1 });
check('figure: a cylinder half full reports level 50', /data-kind="cylinder"/.test(svg) && /data-level="50.0"/.test(svg));
svg = I.figure({ kind: 'strip', rate: 60, seconds: 6 });
check('figure: a 6-second strip at 60 bpm draws 6 beats', /data-kind="strip"/.test(svg) && /data-beats="6"/.test(svg) && /data-rate="60"/.test(svg), svg.match(/data-beats="\d+"/));
check('figure: 120 bpm draws 12 beats', /data-beats="12"/.test(I.figure({ kind: 'strip', rate: 120, seconds: 6 })));
check('figure: a flat strip draws no beats', /data-beats="0"/.test(I.figure({ kind: 'strip', rate: 0, seconds: 6, flat: true })));
check('figure: an unknown kind renders nothing', I.figure({ kind: 'nope' }) === '');

// ---------- current ----------
check('current: dmm and safety copy the readout value, never an invalid one', I.current(lab('dmm', DMM, []), { readout: { value: 9, invalid: false } }, {}) === 9 && I.current(lab('dmm', DMM, []), { readout: { value: null, invalid: true } }, {}) === null);
check('current: monitor picks the task parameter', I.current(lab('monitor', MON, []), { readout: { hr: 81, spo2: 97 } }, { measure: { param: 'spo2' } }) === 97);
check('current: infusion gives the volume only', I.current(lab('infusion', INF, []), { readout: { volume: 52 } }, { measure: { what: 'volume' } }) === 52 && I.current(lab('infusion', INF, []), { readout: { volume: 52 } }, { measure: { what: 'rate' } }) === null);
check('current: defib gives delivered energy', I.current(lab('defib', DEF, []), { readout: { delivered: 204 } }, {}) === 204);
check('current: no readout yet is null', I.current(lab('dmm', DMM, []), {}, {}) === null);

// ---------- panels that need no controls (jsdom) ----------
{
  const { JSDOM } = require('jsdom');
  const w = new JSDOM('<!doctype html><div id="x"></div>').window; const el = w.document.getElementById('x');
  I.render(el, lab('choices', { text: 'Reply from 10.0.0.1 <ok>' }, []), {}, {});
  check('render: choices shows its text escaped in a pre', !!el.querySelector('pre.ins-text') && el.querySelector('pre').textContent === 'Reply from 10.0.0.1 <ok>');
  I.render(el, lab('figures', { figures: [{ kind: 'meter', min: 0, max: 10, value: 3, unit: 'V', caption: 'Meter one' }, { kind: 'cylinder', ml: 100, value: 20 }] }, []), {}, {});
  check('render: figures draws every figure with its caption', el.querySelectorAll('svg.fig').length === 2 && /Meter one/.test(el.textContent));
  I.render(el, lab('nope', {}, []), {}, {});
  check('render: an unknown instrument says so instead of throwing', /Unknown instrument/.test(el.textContent));
}

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('All instrument tests passed.');
process.exit(0);
