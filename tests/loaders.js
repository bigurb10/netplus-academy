// The seven loaders. Adding a file under engine/ touches SEVEN registrations, not two:
// build.py, tests/lib.js, and all five <course>/index.html shells. On the merge-engine
// branch the five shells were missed, every unbundled page threw ReferenceError and
// rendered blank, and npm test plus the deployed bundles both stayed green -- the usual
// checks cannot catch it, which is why this suite exists. Run: node tests/loaders.js
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const SHELLS = ['netplus', 'secplus', 'cbet', 'aplus1', 'aplus2'];
// Everything engine/app.js depends on at load time. app.js must come after all of them:
// each sets a window global (FRAMerge, FRAAuth, FRASync) that app.js's boot IIFE reads.
const BEFORE_APP = ['merge.js', 'auth.js', 'sync.js'];

// The three spellings this repo actually uses to name an engine file: "../engine/sync.js"
// in the shells, os.path.join(ENGINE, "sync.js") in build.py, and
// path.join(o.engineDir, 'sync.js') in tests/lib.js. Matching these rather than the bare
// filename is what stops a passing mention in prose from counting as a registration.
const spellings = name => ['engine/' + name, 'ENGINE, "' + name + '"', "engineDir, '" + name + "'"];

// A loader is as easily disabled by commenting it out as by deleting it, and the dead
// text would still satisfy a plain substring search -- so comments come out first.
function stripHtmlComments(text) {
  let out = '';
  let i = 0;
  for (;;) {
    const a = text.indexOf('<!--', i);
    if (a < 0) return out + text.slice(i);
    out += text.slice(i, a);
    const b = text.indexOf('-->', a);
    if (b < 0) return out;
    i = b + 3;
  }
}
function stripLineComments(marker) {
  return text => text.split('\n').filter(line => line.trim().indexOf(marker) !== 0).join('\n');
}

// Where a loader registers `name`, or -1. The earliest spelling wins, so build.py's own
// later mention of engine/auth.js (the string build_callback() inlines) cannot stand in
// for the bundle list.
function at(text, name) {
  let best = -1;
  for (const s of spellings(name)) {
    const i = text.indexOf(s);
    if (i >= 0 && (best < 0 || i < best)) best = i;
  }
  return best;
}

function audit(label, file, strip) {
  const text = strip(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  const app = at(text, 'app.js');
  check(`${label} loads engine/app.js`, app >= 0, app);
  for (const name of BEFORE_APP) {
    const i = at(text, name);
    check(`${label} loads engine/${name}`, i >= 0, i);
    check(`${label} loads engine/${name} before engine/app.js`,
      i >= 0 && app >= 0 && i < app, `${i} vs ${app}`);
  }
}

for (const id of SHELLS) audit(`${id}/index.html`, path.join(id, 'index.html'), stripHtmlComments);
audit('build.py', 'build.py', stripLineComments('#'));
audit('tests/lib.js', path.join('tests', 'lib.js'), stripLineComments('//'));

if (fails.length) { console.error(`loaders: ${fails.length} failed`); process.exit(1); }
console.log('loaders: all OK');
process.exit(0);
