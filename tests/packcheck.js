// Validates a course pack folder without needing course.js: lesson structure, deep-dive coverage, question counts and keys.
// Usage: node tests/packcheck.js courses/secplus
const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');
const dir = path.resolve(process.argv[2] || 'courses/netplus');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f !== 'course.js').sort();
const dom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' });
const w = dom.window;
for (const f of files) w.eval(fs.readFileSync(path.join(dir, f), 'utf8'));
const FRA = w.FRA || {};
const units = (FRA.units || []).slice().sort((a, b) => a.n - b.n);
const problems = [];
const ids = new Set(); const lessons = [];
for (const u of units) {
  if (!u.id || !u.title || !Array.isArray(u.lessons)) problems.push(`unit ${u.id || '?'} malformed`);
  for (const l of u.lessons) {
    if (ids.has(l.id)) problems.push(`duplicate lesson id ${l.id}`); ids.add(l.id); lessons.push(l);
    for (const k of ['id', 'title', 'domain', 'obj', 'minutes', 'body', 'hook']) if (l[k] === undefined || l[k] === '') problems.push(`${l.id}: missing ${k}`);
    if (typeof l.body === 'string') {
      const words = l.body.split(/\s+/).length;
      if (words < 180) problems.push(`${l.id}: body only ${words} words`);
      if (!/^## /m.test(l.body)) problems.push(`${l.id}: no ## headings`);
      if (!/^> /m.test(l.body)) problems.push(`${l.id}: no exam tip line`);
      if ((l.body.match(/```/g) || []).length % 2) problems.push(`${l.id}: unbalanced fence`);
    }
  }
}
const deep = FRA.deep || {};
for (const l of lessons) {
  const d = deep[l.id];
  if (!d) { problems.push(`${l.id}: no deep dive`); continue; }
  const words = d.split(/\s+/).length;
  if (words < 300) problems.push(`${l.id}: deep dive only ${words} words`);
  if ((d.match(/```/g) || []).length % 2) problems.push(`${l.id}: deep dive unbalanced fence`);
}
for (const k of Object.keys(deep)) if (!ids.has(k)) problems.push(`deep dive for unknown lesson ${k}`);
const qs = FRA.questions || []; const qids = new Set(); const per = {}; const stems = new Map();
for (const q of qs) {
  if (qids.has(q.id)) problems.push(`duplicate question id ${q.id}`); qids.add(q.id);
  if (!ids.has(q.t)) problems.push(`${q.id}: unknown lesson ${q.t}`);
  if (!Array.isArray(q.a) || q.a.length !== 4) problems.push(`${q.id}: needs 4 options`);
  else if (new Set(q.a).size !== 4) problems.push(`${q.id}: duplicate options`);
  if (!(q.c >= 0 && q.c < 4)) problems.push(`${q.id}: bad correct index`);
  if (!q.e || q.e.length < 40) problems.push(`${q.id}: explanation too short`);
  if (!q.q || q.q.length < 20) problems.push(`${q.id}: stem too short`);
  const key = (q.q || '').toLowerCase().slice(0, 70); if (stems.has(key)) problems.push(`${q.id}: same opening as ${stems.get(key)}`); stems.set(key, q.id);
  per[q.t] = (per[q.t] || 0) + 1;
}
for (const l of lessons) if ((per[l.id] || 0) < 5) problems.push(`${l.id}: only ${per[l.id] || 0} questions`);
// Answer position balance: flag if one position holds more than 40% of keys
if (qs.length >= 20) { const pos = [0, 0, 0, 0]; qs.forEach(q => { if (q.c >= 0 && q.c < 4) pos[q.c]++; }); const max = Math.max(...pos); if (max / qs.length > 0.4) problems.push(`answer key skew: positions ${pos.join('/')}`); }
const domains = {}; lessons.forEach(l => { domains[l.domain] = (domains[l.domain] || 0) + 1; });
console.log(`${path.basename(dir)}: ${units.length} units, ${lessons.length} lessons (per domain ${JSON.stringify(domains)}), ${Object.keys(deep).length} deep dives, ${qs.length} questions, cheatsheet ${FRA.cheatsheet ? 'yes' : 'no'}, generators ${Object.keys(FRA.generators || {}).length}`);
if (problems.length) { console.log(problems.map(p => '  - ' + p).join('\n')); process.exit(1); }
console.log('packcheck: OK');
