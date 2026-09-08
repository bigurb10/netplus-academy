// Acronym glossary check for every course pack. Run: node tests/acronyms.js [courses/<id>]
// Every acronym-looking token in tutorial and cheat sheet text must be a key in FRA.acronyms or be listed in
// FRA.acronymIgnore (uppercase words that are not acronyms: MOST, BEST, registry key names, model numbers).
// Every glossary entry needs a non-empty full, tip, and more. Also exported: scanPack(dir) for the emit tooling.
const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');

function loadPack(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' });
  const w = dom.window;
  for (const f of [...files.filter(f => f === 'course.js'), ...files.filter(f => f !== 'course.js')]) w.eval(fs.readFileSync(path.join(dir, f), 'utf8'));
  return w.FRA || {};
}

// Text the engine renders through inline(): lessons, hooks, unit blurbs, deep dives, cheat sheet, exam-day tips.
function tutorialTexts(F) {
  const out = [];
  (F.units || []).forEach(u => { out.push(u.title, u.blurb || ''); (u.lessons || []).forEach(l => { out.push(l.title, l.body || '', l.hook || ''); }); });
  Object.keys(F.deep || {}).forEach(k => out.push(F.deep[k]));
  const cs = F.cheatsheet;
  if (cs) { out.push(cs.title || '', cs.intro || ''); (cs.sections || []).forEach(s => { out.push(s.title || ''); (s.blocks || []).forEach(b => { if (b.title) out.push(b.title); if (Array.isArray(b.cols)) b.cols.forEach(c => out.push(c)); if (b.rows) b.rows.forEach(r => r.forEach(c => out.push(c))); if (b.items) b.items.forEach(c => out.push(c)); if (b.text) out.push(b.text); }); }); }
  ((F.course && F.course.examDay) || []).forEach(t => out.push(t));
  return out;
}
function questionTexts(F) { const out = []; (F.questions || []).forEach(q => { out.push(q.q || '', q.e || ''); (q.a || []).forEach(a => out.push(a)); }); return out; }

const stripCode = s => String(s).replace(/```[\s\S]*?```/g, ' ').replace(/\{\{.+?\}\}/g, ' ');
const looksAcronym = t => /^[A-Z0-9][A-Z0-9+.\-]*$/.test(t) && (t.match(/[A-Z]/g) || []).length >= 2 && !/^[0-9.]+$/.test(t);
const deplural = (t, known) => { if (known(t)) return t; const m = t.match(/^(.*[A-Z0-9])(s|es)$/); return m && known(m[1]) ? m[1] : t; };

// Scan texts. Returns { counts: {base: n}, ctx: {base: snippet} }. Known tokens (keys) are counted whole; anything else
// is split on / and - and only acronym-looking parts are reported. Ignored tokens are dropped.
function scan(texts, keys, ignore) {
  const known = t => Object.prototype.hasOwnProperty.call(keys, t);
  const counts = {}; const ctx = {};
  const hit = (base, s, at) => { counts[base] = (counts[base] || 0) + 1; if (!ctx[base]) ctx[base] = s.slice(Math.max(0, at - 45), at + 55).replace(/\s+/g, ' '); };
  for (const t of texts) {
    const s = stripCode(t);
    for (const m of s.matchAll(/[A-Za-z0-9_][A-Za-z0-9_+.\/-]*/g)) {
      let tok = m[0].replace(/[.\/-]+$/, ''); if (!tok) continue;
      const whole = deplural(tok, known);
      if (known(whole)) { hit(whole, s, m.index); continue; }
      if (ignore.has(tok) || ignore.has(whole)) continue;
      for (let part of tok.split(/[\/-]/)) {
        part = part.replace(/[.]+$/, ''); if (!part) continue;
        const base = deplural(part, known);
        if (known(base)) { hit(base, s, m.index); continue; }
        if (ignore.has(part) || ignore.has(base)) continue;
        if (looksAcronym(part)) hit(part, s, m.index);
      }
    }
  }
  return { counts, ctx };
}

function scanPack(dir) {
  const F = loadPack(dir);
  const keys = F.acronyms || {}; const ignore = new Set(F.acronymIgnore || []);
  return { F, keys, ignore, tutorial: scan(tutorialTexts(F), keys, ignore), questions: scan(questionTexts(F), keys, ignore) };
}

function check(dir) {
  const { F, keys, ignore, tutorial } = scanPack(dir);
  const id = path.basename(dir); const problems = [];
  if (!F.acronyms) { problems.push('no acronyms.js (FRA.acronyms missing)'); return report(id, problems, 0); }
  for (const k of Object.keys(keys)) {
    const e = keys[k] || {};
    for (const f of ['full', 'tip', 'more']) if (typeof e[f] !== 'string' || e[f].trim().length < 3) problems.push(`${k}: missing ${f}`);
    if (e.tip && e.tip.length > 160) problems.push(`${k}: tip is ${e.tip.length} chars (keep it under 160)`);
    if (ignore.has(k)) problems.push(`${k}: is both a glossary key and on the ignore list`);
    if (!/^[A-Za-z0-9][A-Za-z0-9+.\/-]*$/.test(k)) problems.push(`${k}: key has characters the matcher cannot handle`);
  }
  const missing = Object.keys(tutorial.counts).filter(t => !keys[t]).sort((a, b) => tutorial.counts[b] - tutorial.counts[a] || a.localeCompare(b));
  missing.forEach(t => problems.push(`missing: ${t} (${tutorial.counts[t]}x) ...${tutorial.ctx[t]}...`));
  const unusedKeys = Object.keys(keys).filter(k => !tutorial.counts[k]);
  // Keys that only questions use are fine (they still belong on the sheet); keys used nowhere are a mistake.
  const { questions } = scanPack(dir);
  unusedKeys.filter(k => !questions.counts[k]).forEach(k => problems.push(`unused key: ${k}`));
  const allText = tutorialTexts(F).concat(questionTexts(F)).join('\n');
  [...ignore].filter(w => !new RegExp('(^|[^A-Za-z0-9_])' + w.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&') + '(?![A-Za-z0-9_])').test(allText)).forEach(w => problems.push(`unused ignore entry: ${w}`));
  return report(id, problems, Object.keys(keys).length);
}
function report(id, problems, n) {
  console.log(`${id}: ${n} acronyms${problems.length ? `, ${problems.length} problem(s)` : ''}`);
  if (problems.length) console.log(problems.map(p => '  - ' + p).join('\n'));
  return problems.length === 0;
}

module.exports = { loadPack, scanPack, tutorialTexts, questionTexts, scan };

if (require.main === module) {
  const arg = process.argv[2];
  const dirs = arg ? [path.resolve(arg)] : fs.readdirSync(path.join(ROOT, 'courses')).filter(d => fs.existsSync(path.join(ROOT, 'courses', d, 'course.js'))).map(d => path.join(ROOT, 'courses', d));
  let ok = true; for (const d of dirs) if (!check(d)) ok = false;
  if (!ok) { console.error('acronyms: problems found'); process.exit(1); }
  console.log('acronyms: all packs OK');
}
