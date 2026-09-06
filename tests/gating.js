// Gating: with freeCourse off, only the free set is open; with it on, nothing is locked; FRA_ENTITLED unlocks.
const path = require('path');
const { boot, ROOT } = require('./lib');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const dir = path.join(ROOT, 'courses', 'netplus');
const pills = w => w.$$('.pill').filter(p => p.textContent === 'Full course').length;
const state = w => JSON.parse(w.localStorage.getItem('fra.netplus.state.v3'));

// ----- Locked course (freeCourse off, not entitled) -----
let w = boot({ courseDir: dir, beforeApp: w => { w.FRA.course.freeCourse = false; } });
w.click(w.$('[data-act="go"][data-arg="home"]'));            // cheat sheet intro -> welcome page
check('cheat sheet and welcome open when locked', /memorization sheet/i.test(w.text()));
w.click(w.$('[data-act="go"][data-arg="course"]'));           // all units
w.click(w.$('[data-act="course"][data-arg="u3"]'));           // unit 3 is inside the free set
check('unit 3 shows no Full course pills', pills(w) === 0, pills(w));
w.click(w.$('[data-act="lesson"][data-arg="u3l4"]'));         // 10th lesson in course order
check('10th lesson opens when locked', /Wireless Media/.test(w.text()) && !!w.$('[data-act="start-checkpoint"]'));
w.click(w.$('[data-act="lesson"][data-arg="u4l1"]'));         // 11th lesson
check('11th lesson shows the paywall', !!w.$('.paywall') && !w.$('[data-act="start-checkpoint"]') && /first 10 lessons are free/.test(w.text()));
check('rail marks the 6 locked lessons of the open unit', w.$$('.rail .lock').length === 6, w.$$('.rail .lock').length);
w.click(w.$('.paywall [data-act="go"][data-arg="course"]'));
w.click(w.$('[data-act="course"][data-arg="u4"]'));
check('unit 4 shows 6 Full course pills', pills(w) === 6, pills(w));
// Starter test still runs
w.click(w.$('[data-act="go"][data-arg="home"]'));
w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
check('starter test still runs when locked', !!w.$('[data-act="opt"]'));
const Q = {}; w.FRA.questions.forEach(q => { Q[q.id] = q; }); const fat = x => typeof x === 'string' ? Q[x] : x;
state(w).active.items.map(fat).forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
check('starter results render', /Strong start|solid base|ground up/.test(w.text()));
w.click(w.$('[data-act="go"][data-arg="exam"]'));
check('tests hub shows unlock instead of the full test', !!w.$('[data-act="upgrade"]') && !w.$('[data-act="start-exam"][data-arg="full"]') && !w.$('[data-act="start-exam"][data-arg="practice"]'));
w.click(w.$('.nav [data-act="nav"][data-arg="train"]'));
check('drills page shows the paywall when locked', !!w.$('.paywall'));
w.click(w.$('[data-act="upgrade"]'));
check('upgrade without a URL shows a toast', /not for sale yet/.test(w.text()));

// ----- Open course (launch mode) -----
w = boot({ courseDir: dir });
w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="go"][data-arg="course"]')); w.click(w.$('[data-act="course"][data-arg="u4"]'));
check('freeCourse shows no Full course pills', pills(w) === 0, pills(w));
w.click(w.$('[data-act="lesson"][data-arg="u4l1"]'));
check('freeCourse opens every lesson', !w.$('.paywall') && !!w.$('[data-act="start-checkpoint"]'));
check('no lock marks when free', w.$$('.rail .lock').length === 0);

// ----- Entitled user on a locked course -----
w = boot({ courseDir: dir, beforeApp: w => { w.FRA.course.freeCourse = false; w.FRA_ENTITLED = true; } });
w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="go"][data-arg="course"]')); w.click(w.$('[data-act="course"][data-arg="u4"]')); w.click(w.$('[data-act="lesson"][data-arg="u4l1"]'));
check('FRA_ENTITLED unlocks everything', !w.$('.paywall') && !!w.$('[data-act="start-checkpoint"]'));

console.log(fails.length ? `\n${fails.length} FAILED: ${fails.join('; ')}` : '\nALL PASSED');
process.exit(fails.length ? 1 : 0);
