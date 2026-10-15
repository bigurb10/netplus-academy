// PBQ grading, normalization, and answer text (engine/pbq.js). Run: node tests/pbq.js
const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const w = new JSDOM('<!doctype html><html><body><div id="host"></div></body></html>', { runScripts: 'outside-only', url: 'http://localhost/' }).window;
w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'pbq.js'), 'utf8'));
const P = w.FRAPbq;
const g = (task, answer) => P.grade(task, answer);

// ----- order -----
const order = { id: 'o', kind: 'order', prompt: 'Order the steps', items: ['Identify', 'Theory', 'Test', 'Plan'], expect: [0, 1, 2, 3] };
check('order: full credit in the right sequence', g(order, [0, 1, 2, 3]).score === 1 && g(order, [0, 1, 2, 3]).correct === true);
check('order: partial credit by items in the right position', g(order, [0, 2, 1, 3]).score === 0.5 && g(order, [0, 2, 1, 3]).correct === false);
check('order: an incomplete answer scores what is placed', g(order, [0, 1]).score === 0.5);
check('order: an empty answer scores zero', g(order, null).score === 0 && g(order, []).score === 0);

// ----- match -----
const match = { id: 'm', kind: 'match', prompt: 'Match', left: ['Switch', 'Router'], right: ['Layer 2', 'Layer 3', 'Layer 7'], expect: [0, 1] };
check('match: every pairing right is full credit', g(match, [0, 1]).score === 1);
check('match: one of two right is half', g(match, [0, 2]).score === 0.5);
check('match: unplaced items count as wrong', g(match, [0, null]).score === 0.5 && g(match, null).score === 0);

// ----- multiselect -----
const multi = { id: 's', kind: 'multiselect', prompt: 'Pick the bad lines', options: ['a', 'b', 'c', 'd', 'e'], expect: [1, 3] };
check('multiselect: exactly the expected picks is full credit', g(multi, [3, 1]).score === 1);
check('multiselect: one right of two is half', g(multi, [1]).score === 0.5);
check('multiselect: a wrong pick cancels a right one', g(multi, [1, 3, 0]).score === 0.5);
check('multiselect: floors at zero', g(multi, [0, 2, 4]).score === 0 && g(multi, [0, 2, 4]).correct === false);

// ----- form -----
const form = { id: 'f', kind: 'form', prompt: 'Configure', fields: [
  { id: 'ip', label: 'IP address', expect: ['192.168.10.1'], normalize: 'ip' },
  { id: 'mask', label: 'Subnet mask', expect: ['255.255.255.192', '/26'], normalize: 'cidr' },
  { id: 'vlan', label: 'VLAN', expect: ['10'], normalize: 'number' },
  { id: 'ssid', label: 'SSID', expect: ['Clinic-5G'], normalize: 'text' }
] };
check('form: every field right is full credit', g(form, { ip: '192.168.10.1', mask: '/26', vlan: '10', ssid: 'clinic-5g' }).score === 1);
check('form: ip normalization strips spaces and leading zeros', g(form, { ip: ' 192.168.010.001 ', mask: '255.255.255.192', vlan: '10', ssid: 'Clinic-5G' }).score === 1);
check('form: cidr accepts the dotted mask or the prefix', g(form, { ip: '192.168.10.1', mask: '255.255.255.192', vlan: '10', ssid: 'Clinic-5G' }).score === 1 && g(form, { ip: '192.168.10.1', mask: ' /26', vlan: '10', ssid: 'Clinic-5G' }).score === 1);
check('form: number normalization accepts 10.0 and 010', g(form, { ip: '192.168.10.1', mask: '/26', vlan: '010', ssid: 'Clinic-5G' }).score === 1 && g(form, { ip: '192.168.10.1', mask: '/26', vlan: '10.0', ssid: 'Clinic-5G' }).score === 1);
check('form: text normalization is case and space insensitive', g(form, { ip: '192.168.10.1', mask: '/26', vlan: '10', ssid: '  CLINIC-5G ' }).score === 1);
check('form: three of four fields is 0.75', g(form, { ip: '192.168.10.2', mask: '/26', vlan: '10', ssid: 'Clinic-5G' }).score === 0.75);
check('form: a missing field is wrong, not an error', g(form, { ip: '192.168.10.1' }).score === 0.25 && g(form, null).score === 0);

// ----- command -----
const cmd = { id: 'c', kind: 'command', prompt: 'Show the full IP configuration', expect: ['ipconfig /all'], alt: ['ipconfig -all'], flagOrder: false };
check('command: exact form is right', g(cmd, 'ipconfig /all').correct === true);
check('command: case, extra spaces, and a trailing period are ignored', g(cmd, '  IPCONFIG   /ALL. ').correct === true);
check('command: an alternate spelling is right', g(cmd, 'ipconfig -all').correct === true);
check('command: the wrong command is zero', g(cmd, 'ifconfig /all').score === 0 && g(cmd, '').score === 0 && g(cmd, null).score === 0);
const cmd2 = { id: 'c2', kind: 'command', prompt: 'Scan', expect: ['nmap -sV -p 443 10.0.0.5'], flagOrder: false };
check('command: flags in any order compare equal when flagOrder is false', g(cmd2, 'nmap -p 443 -sV 10.0.0.5').correct === true);
const cmd3 = { id: 'c3', kind: 'command', prompt: 'Copy', expect: ['copy a.txt b.txt'] };
check('command: token order matters when flagOrder is not false', g(cmd3, 'copy b.txt a.txt').correct === false);

// ----- choice -----
const choice = { id: 'p', kind: 'choice', prompt: 'Pick', options: ['x', 'y', 'z', 'w'], expect: 2 };
check('choice: the expected index is right, anything else zero', g(choice, 2).score === 1 && g(choice, 1).score === 0 && g(choice, null).score === 0);

// ----- answer and expected text (for the results page and the static page) -----
check('expectedText: order lists the sequence', P.expectedText(order) === 'Identify, Theory, Test, Plan');
check('expectedText: match lists the pairs', P.expectedText(match) === 'Switch: Layer 2; Router: Layer 3');
check('expectedText: multiselect lists the picks', P.expectedText(multi) === 'b, d');
check('expectedText: form lists field and first accepted value', P.expectedText(form) === 'IP address: 192.168.10.1; Subnet mask: 255.255.255.192; VLAN: 10; SSID: Clinic-5G');
check('expectedText: command gives the first accepted form', P.expectedText(cmd) === 'ipconfig /all');
check('expectedText: choice gives the option', P.expectedText(choice) === 'z');
check('answerText: order in the chosen sequence', P.answerText(order, [1, 0, 2, 3]) === 'Theory, Identify, Test, Plan');
check('answerText: match shows placed and unplaced', P.answerText(match, [2, null]) === 'Switch: Layer 7; Router: (not placed)');
check('answerText: form shows what was typed, blank for empty', P.answerText(form, { ip: '1.2.3.4' }) === 'IP address: 1.2.3.4; Subnet mask: (blank); VLAN: (blank); SSID: (blank)');
check('answerText: nothing answered reads as such', P.answerText(cmd, null) === '(no answer)');
check('emptyAnswer: the per-kind empty shape', JSON.stringify(P.emptyAnswer(order)) === '[]' && JSON.stringify(P.emptyAnswer(match)) === '[null,null]' && JSON.stringify(P.emptyAnswer(form)) === '{}' && P.emptyAnswer(cmd) === '' && P.emptyAnswer(choice) === null);
check('KINDS lists the six kinds', JSON.stringify(P.KINDS) === JSON.stringify(['order', 'match', 'multiselect', 'form', 'command', 'choice']));

// ----- rendering: drag, tap, and keyboard give the same answer; collect maps display order back to pack indexes -----
{
  const w2 = new JSDOM('<!doctype html><html><body><div id="host"></div></body></html>', { runScripts: 'outside-only', url: 'http://localhost/' }).window;
  w2.eval(fs.readFileSync(path.join(ROOT, 'engine', 'pbq.js'), 'utf8'));
  w2.eval(fs.readFileSync(path.join(ROOT, 'tests', 'fixtures', 'mini', 'pbqs.js'), 'utf8'));
  const P2 = w2.FRAPbq; const pbq = w2.FRA.pbqs['mini-net']; const host = w2.document.getElementById('host');
  const helpers = { esc: s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])), inline: s => String(s) };
  const ui = { order: {}, answers: {}, sel: {}, checked: false };
  P2.render(host, pbq, ui, helpers);
  check('render: one task card per task', host.querySelectorAll('.pbq-task').length === 6);
  check('render: no task control carries data-act', host.querySelectorAll('.pbq-task [data-act]').length === 0);
  const click = el => el.dispatchEvent(new w2.MouseEvent('click', { bubbles: true }));
  // order by tap: tap an item, tap another, they swap
  const orderCard = host.querySelector('.pbq-task[data-task="steps"]');
  const items = () => [...orderCard.querySelectorAll('[data-pbq="order-item"]')];
  const firstText = items()[0].textContent.trim(), secondText = items()[1].textContent.trim();
  click(items()[0]); check('order: tapping an item selects it', items()[0].getAttribute('aria-pressed') === 'true');
  click(items()[1]); check('order: tapping a second item swaps the two', items()[0].textContent.trim() === secondText && items()[1].textContent.trim() === firstText);
  // order by keyboard: focus an item and press ArrowUp
  items()[1].focus(); items()[1].dispatchEvent(new w2.KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
  check('order: ArrowUp moves the focused item up', items()[0].textContent.trim() === firstText);
  // order by drag: dragstart on item 3, drop on item 0
  const dt = { data: {}, setData(k, v) { this.data[k] = v; }, getData(k) { return this.data[k]; }, effectAllowed: '', dropEffect: '' };
  // The display order is shuffled, so the dragged item is identified by what it shows and the pack index it carries, not by a fixed string.
  const dragText = items()[3].textContent.trim(); const dragIndex = Number(items()[3].dataset.index);
  const ds = new w2.Event('dragstart', { bubbles: true }); ds.dataTransfer = dt; items()[3].dispatchEvent(ds);
  const dp = new w2.Event('drop', { bubbles: true }); dp.dataTransfer = dt; items()[0].dispatchEvent(dp);
  check('order: dropping item 4 on item 1 moves it there', items()[0].textContent.trim() === dragText);
  // match by tap: tap a left chip, tap a right slot
  const matchCard = host.querySelector('.pbq-task[data-task="pairs"]');
  click(matchCard.querySelector('[data-pbq="match-item"]')); click(matchCard.querySelectorAll('[data-pbq="match-slot"]')[1]);
  check('match: a tapped chip lands in the tapped slot', matchCard.querySelectorAll('[data-pbq="match-slot"]')[1].querySelector('.pbq-chip') !== null);
  // multiselect, form, command, choice
  const msCard = host.querySelector('.pbq-task[data-task="lines"]'); click(msCard.querySelector('[data-pbq="ms-opt"][data-index="0"]'));
  const formCard = host.querySelector('.pbq-task[data-task="cfg"]'); formCard.querySelector('input[data-field="ip"]').value = '192.168.10.10'; formCard.querySelector('input[data-field="mask"]').value = '/26';
  host.querySelector('.pbq-task[data-task="cmd"] input').value = 'IPCONFIG /ALL';
  const chCard = host.querySelector('.pbq-task[data-task="cable"]'); click(chCard.querySelector('[data-pbq="choice"][data-index="0"]'));
  const answers = P2.collect(host, pbq, ui);
  check('collect: order answer is in pack indexes and reflects the moves', Array.isArray(answers.steps) && answers.steps.length === 4 && answers.steps[0] === dragIndex);
  check('collect: match answer maps the chip to the chosen slot in pack indexes', Array.isArray(answers.pairs) && answers.pairs.length === 2 && answers.pairs.filter(x => x != null).length === 1);
  check('collect: multiselect, form, command, and choice answers are read back', answers.lines.length === 1 && answers.cfg.ip === '192.168.10.10' && answers.cfg.mask === '/26' && answers.cmd === 'IPCONFIG /ALL' && answers.cable != null);
  const graded = pbq.tasks.map(t => P2.grade(t, answers[t.id]));
  check('collect then grade: the multiselect, form, command, and choice picks above are right', graded[2].correct && graded[3].correct && graded[4].correct && graded[5].correct);
  // re-render with checked: true shows every why and locks the controls
  ui.answers = answers; ui.checked = true; P2.render(host, pbq, ui, helpers);
  check('render after Check: a why per task and no enabled inputs', host.querySelectorAll('.pbq-why').length === 6 && [...host.querySelectorAll('input, button[data-pbq]')].every(el => el.disabled));
  // display order is stable across renders
  const before = [...host.querySelectorAll('.pbq-task[data-task="steps"] [data-pbq="order-item"]')].map(e => e.textContent.trim()).join('|');
  P2.render(host, pbq, ui, helpers);
  check('render: the display order survives a re-render', [...host.querySelectorAll('.pbq-task[data-task="steps"] [data-pbq="order-item"]')].map(e => e.textContent.trim()).join('|') === before);
}

if (fails.length) { console.log(`\n${fails.length} FAILED`); process.exit(1); }
console.log('\nAll PBQ tests passed.');
