// Validates every lab in a course pack without course.js: loads curriculum-*.js and labs-*.js in jsdom,
// runs FRAInstruments.validate on each lab, and checks the lesson <-> lab links both ways.
// Usage: node tests/labcheck.js courses/bmet
'use strict';
const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');
const I = require('../engine/instruments.js');
const dir = path.resolve(process.argv[2] || 'courses/bmet');
const files = fs.readdirSync(dir).filter(f => /^(curriculum|labs)(-[^.]+)?\.js$/.test(f)).sort();
const w = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' }).window;
for (const f of files) w.eval(fs.readFileSync(path.join(dir, f), 'utf8'));
const FRA = w.FRA || {}; const labs = FRA.labs || {}; const problems = [];
const lessons = {}; (FRA.units || []).forEach(u => (u.lessons || []).forEach(l => { lessons[l.id] = l; }));
for (const id of Object.keys(labs)) {
  const lab = labs[id];
  if (lab.id !== id) problems.push(`${id}: id field is "${lab.id}"`);
  const l = lessons[lab.lesson];
  if (!l) problems.push(`${id}: lesson ${lab.lesson} does not exist`);
  else if (l.lab !== id) problems.push(`${id}: lesson ${lab.lesson} points at lab "${l.lab}"`);
  I.validate(lab).forEach(p => problems.push(`${id}: ${p}`));
}
Object.keys(lessons).forEach(k => { const l = lessons[k]; if (l.lab && !labs[l.lab]) problems.push(`${k}: lab "${l.lab}" is not defined`); });
const withLab = Object.values(lessons).filter(l => l.lab).length;
console.log(`${path.basename(dir)}: ${Object.keys(labs).length} labs on ${withLab} lessons; instruments ${[...new Set(Object.values(labs).map(l => l.instrument))].join(', ') || 'none'}`);
if (problems.length) { console.log(problems.map(p => '  - ' + p).join('\n')); process.exit(1); }
console.log('labcheck: OK');
