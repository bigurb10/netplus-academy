// Smoke test for a pack's generators: node tests/gen-smoke.js courses/<id> [calls per generator]
// Loads generators.js in a bare global, calls every generator many times, and checks each question is well formed:
// four unique options, a correct index that points at a real option, no "(1)" filler, and a real explanation.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = process.argv[2];
const N = Number(process.argv[3] || 1500);
if (!dir) { console.error('usage: node tests/gen-smoke.js courses/<id> [calls]'); process.exit(2); }
const file = path.join(dir, 'generators.js');
if (!fs.existsSync(file)) { console.log(`${path.basename(dir)}: no generators.js`); process.exit(0); }

// The global object doubles as `window`, so `window.FRA = ...` and a bare `FRA` refer to the same thing, as in a browser.
const ctx = { Date, Math, Number, String, console };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
const FRA = ctx.FRA;
const gens = FRA && FRA.generators ? FRA.generators : {};
const names = Object.keys(gens);
if (!names.length) { console.log(`${path.basename(dir)}: generators.js defines no generators`); process.exit(1); }

const problems = [];
let total = 0;
for (const name of names) {
  const stems = new Set();
  const before = problems.length;
  for (let i = 0; i < N; i++) {
    let q;
    try { q = gens[name](); } catch (e) { problems.push(`${name}: threw ${e.message}`); break; }
    total++;
    if (!q || typeof q.q !== 'string' || q.q.length < 20) problems.push(`${name}: bad stem ${JSON.stringify(q && q.q)}`);
    if (!Array.isArray(q.a) || q.a.length !== 4) problems.push(`${name}: ${q.a && q.a.length} options`);
    else {
      if (new Set(q.a).size !== 4) problems.push(`${name}: duplicate options ${JSON.stringify(q.a)}`);
      if (q.a.some(o => /\(\d+\)$/.test(String(o)))) problems.push(`${name}: filler option ${JSON.stringify(q.a)}`);
      if (q.a.some(o => typeof o !== 'string' || !o.length || /NaN|undefined|Infinity/.test(o))) problems.push(`${name}: malformed option ${JSON.stringify(q.a)}`);
    }
    if (typeof q.c !== 'number' || q.c < 0 || q.c > 3) problems.push(`${name}: bad correct index ${q.c}`);
    if (typeof q.e !== 'string' || q.e.length < 40) problems.push(`${name}: explanation too short`);
    if (/NaN|undefined|Infinity/.test(q.q + ' ' + q.e)) problems.push(`${name}: NaN/undefined in text: ${q.q}`);
    if (typeof q.t !== 'string' || !/^u\d+l\d+$/.test(q.t)) problems.push(`${name}: bad lesson id ${JSON.stringify(q.t)}`);
    stems.add(q.q);
    if (problems.length - before > 25) break;
  }
  if (stems.size < 5) problems.push(`${name}: only ${stems.size} distinct stems in ${N} calls`);
}
const uniq = [...new Set(problems)];
console.log(`${path.basename(dir)}: ${names.length} generators, ${total} calls, ${uniq.length} problems`);
uniq.slice(0, 25).forEach(p => console.log('  - ' + p));
process.exit(uniq.length ? 1 : 0);
