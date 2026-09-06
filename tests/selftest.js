// Runs the engine's built-in #selftest (file: URL) against every course pack and the mini fixture.
const path = require('path'); const fs = require('fs');
const { boot, courseDirs, ROOT } = require('./lib');
const dirs = [...courseDirs(), path.join(ROOT, 'tests', 'fixtures', 'mini')].filter(d => fs.existsSync(d));
let failed = 0;
for (const dir of dirs) {
  const w = boot({ courseDir: dir, url: 'file:///x/index.html', hash: '#selftest' });
  const out = w.document.querySelector('#selftest');
  const txt = out ? out.textContent : 'NO SELFTEST OUTPUT';
  const ok = /^OK/.test(txt);
  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${path.basename(dir)}\n${txt.split('\n').map(l => '   ' + l).join('\n')}`);
  if (!ok) failed++;
}
if (failed) { console.error(`${failed} course(s) failed`); process.exit(1); }
console.log('selftest: all courses OK');
