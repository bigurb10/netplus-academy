// Shared jsdom boot for FieldReady Academy tests. Loads a course pack folder plus the engine into a window.
const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function courseFiles(courseDir) {
  // course.js first so FRA.course exists before anything reads it; the rest alphabetical (order does not matter for data).
  const all = fs.readdirSync(courseDir).filter(f => f.endsWith('.js')).sort();
  return [...all.filter(f => f === 'course.js'), ...all.filter(f => f !== 'course.js')].map(f => path.join(courseDir, f));
}

function boot(opts) {
  const o = Object.assign({ engineDir: path.join(ROOT, 'engine'), hash: '', url: 'http://localhost/', beforeApp: null }, opts);
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => { if (!/not implemented|localStorage|SecurityError/.test(String(e))) console.error('JSDOM ERR', e.message); });
  const dom = new JSDOM('<!doctype html><html><head><title>x</title></head><body><div id="app"></div></body></html>',
    { url: o.url + o.hash, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.confirm = () => true; w.scrollTo = () => {}; w.print = () => { w.printed = (w.printed || 0) + 1; };
  w.HTMLElement.prototype.scrollIntoView = function () {};
  for (const f of courseFiles(o.courseDir)) w.eval(fs.readFileSync(f, 'utf8'));
  if (o.beforeApp) o.beforeApp(w);
  w.eval(fs.readFileSync(path.join(o.engineDir, 'app.js'), 'utf8'));
  w.$ = s => w.document.querySelector(s);
  w.$$ = s => [...w.document.querySelectorAll(s)];
  w.click = el => { if (!el) throw new Error('click target not found'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  w.text = () => w.document.body.textContent;
  return w;
}

function courseDirs() {
  const dir = path.join(ROOT, 'courses');
  return fs.readdirSync(dir).filter(d => fs.existsSync(path.join(dir, d, 'course.js'))).map(d => path.join(dir, d));
}

module.exports = { boot, courseFiles, courseDirs, ROOT };
