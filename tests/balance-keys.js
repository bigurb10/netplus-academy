// Rewrites a questions-*.js file so correct answers are spread evenly across positions A to D.
// Swaps the correct option with the option at the target position; content is unchanged.
// Usage: node tests/balance-keys.js courses/secplus/questions-1.js
const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');
const file = path.resolve(process.argv[2]);
const src = fs.readFileSync(file, 'utf8');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' });
const w = dom.window; w.eval(src);
const qs = w.FRA.questions;
if (!qs || !qs.length) { console.error('no questions found'); process.exit(1); }
// Keep the file's header comment lines (everything before the push call)
const headerEnd = src.indexOf('FRA.questions.push(');
const header = src.slice(0, headerEnd);
// Deterministic balanced targets: cycle 0..3 with a per-lesson offset so each lesson also varies
let out = []; let lastLesson = null; let i = 0; let lessonOffset = 0;
const before = [0, 0, 0, 0], after = [0, 0, 0, 0];
for (const q of qs) {
  if (q.t !== lastLesson) { lastLesson = q.t; lessonOffset = (lessonOffset + 1) % 4; i = 0; out.push(`\n// ${q.t}`); }
  before[q.c]++;
  const target = (i + lessonOffset) % 4; i++;
  const a = q.a.slice(); const correct = a[q.c];
  if (q.c !== target) { a[q.c] = a[target]; a[target] = correct; }
  after[target]++;
  const obj = { id: q.id, t: q.t, q: q.q, a, c: target, e: q.e };
  out.push(JSON.stringify(obj).replace(/^\{"id":/, '{id:').replace(/,"t":/, ',t:').replace(/,"q":/, ',q:').replace(/,"a":/, ',a:').replace(/,"c":/, ',c:').replace(/,"e":/, ',e:') + ',');
}
// Drop the trailing comma on the last entry
out[out.length - 1] = out[out.length - 1].replace(/,$/, '');
const body = 'FRA.questions.push(' + out.join('\n') + '\n);\n';
fs.writeFileSync(file, header + body, 'utf8');
console.log(`${path.basename(file)}: ${qs.length} questions; key positions before ${before.join('/')} after ${after.join('/')}`);
