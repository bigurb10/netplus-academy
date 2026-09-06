"""Task 3: engine reads FRA.course instead of hard-coded Net+ constants. Run from the repo root."""
import io, sys
P = "engine/app.js"
src = io.open(P, encoding="utf-8").read()


def rep(old, new, count=1):
    global src
    n = src.count(old)
    if n != count:
        print(f"FAIL expected {count} found {n}:\n{old[:150]}")
        sys.exit(1)
    src = src.replace(old, new)


def span(start, end, new):
    """Replace everything from the start marker (inclusive) to the end marker (exclusive)."""
    global src
    a = src.index(start)
    b = src.index(end, a)
    src = src[:a] + new + src[b:]


rep("/* NetPlus Academy application.", "/* FieldReady Academy course engine. Reads FRA.course (a course pack manifest) and the pack's data.")

span("  // ---------- constants ----------\n", "  // ---------- data index ----------\n", """  // ---------- course manifest ----------
  const course = FRA.course;
  if (!course || !Array.isArray(course.domains) || !course.test) throw new Error('FRA.course manifest missing or incomplete');
  const DOMAINS = {}; course.domains.forEach(d => { DOMAINS[d.id] = d; });
  const DOMAIN_IDS = course.domains.map(d => d.id);
  const T = course.test;
  const PASS_PCT = T.passPct, STREAK_NEEDED = T.streakNeeded, EXAM_N = T.questions, EXAM_MINUTES = T.minutes;
  const STARTER_N = DOMAIN_IDS.length * T.starterPerDomain, CHECKPOINT_N = T.checkpointN, CHECKPOINT_PASS = T.checkpointPass;
  const REBUILD_PTS = 3 * T.starterPerDomain; // every starter question in the domain wrong
  const ALL_WORD = T.starterPerDomain === 2 ? 'both' : 'all';
  const CONF = [[1, 'Guess'], [2, 'Unsure'], [3, 'Fairly sure'], [4, 'Sure'], [5, 'Certain']];
  const STORE_KEY = `fra.${course.id}.state.v3`;
  // Feedback delivery. Feedback is always saved in the browser and exportable from the Feedback tab.
  // Optionally set feedbackEndpoint (a URL that accepts POSTed JSON) and/or feedbackEmail in the course manifest.
  const FEEDBACK_ENDPOINT = course.feedbackEndpoint || '';
  const FEEDBACK_EMAIL = course.feedbackEmail || '';
  const FB_CATS = {
    question: ['Answer key is wrong', 'Question is unclear or ambiguous', 'Explanation is wrong or unclear', 'Too easy or off-topic', 'Typo', 'Other'],
    lesson: ['Content is inaccurate', 'Unclear or confusing', 'Missing something the exam covers', 'Too long or too short', 'Typo', 'Other'],
    overall: ['Content accuracy', 'Difficulty', 'Website bug', 'Design or usability', 'Idea or request', 'Other']
  };
  const WHERE_LABEL = { starter: 'Starter test', full: `${EXAM_N}-question test`, practice: 'Practice test', checkpoint: 'Lesson checkpoint', train: 'Drills', 'starter-results': 'Starter test results', 'full-results': `${EXAM_N}-question test results`, 'practice-results': 'Practice test results', callout: 'Lesson callout' };
  const STARTER_POOL = course.starterPool || {};
  const CORE = course.core || {};

""")

span("  // ---------- data index ----------\n", "  // ---------- utilities ----------\n", """  // ---------- data index ----------
  const units = (FRA.units || []).slice().sort((a, b) => a.n - b.n);
  const lessons = []; const L = {};
  units.forEach(u => u.lessons.forEach(l => { l.unit = u; l.index = lessons.length; lessons.push(l); L[l.id] = l; }));
  const bank = FRA.questions || []; const Q = {}; bank.forEach(q => { Q[q.id] = q; });
  const byLesson = {}; bank.forEach(q => { (byLesson[q.t] = byLesson[q.t] || []).push(q); });
  const lessonsByDomain = {}; DOMAIN_IDS.forEach(d => { lessonsByDomain[d] = []; });
  lessons.forEach(l => { if (!lessonsByDomain[l.domain]) throw new Error(`lesson ${l.id} uses unknown domain ${l.domain}`); lessonsByDomain[l.domain].push(l); });
  const gens = FRA.generators || {};
  document.title = course.name;

""")

# Storage: v3 per course, migrate legacy keys
rep("return { v: 2, view: { name: 'cheatsheet', arg: 'intro' }, lessons: {}, qstats: {}, topics: {}, exams: [], passStreak: 0, plan: null, active: null, settings: { timer: true }, feedback: [], seen: {}, created: Date.now() };",
    "return { v: 3, course: course.id, view: { name: 'cheatsheet', arg: 'intro' }, lessons: {}, qstats: {}, topics: {}, exams: [], passStreak: 0, plan: null, active: null, settings: { timer: true }, feedback: [], seen: {}, created: Date.now() };")
rep("""  function load() {
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) { const s = JSON.parse(raw); if (s && s.v === 2) return Object.assign(fresh(), s); } } catch (e) { /* storage unavailable */ }
    return fresh();
  }""",
    """  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) { const s = JSON.parse(raw); if (s && s.v === 3) return Object.assign(fresh(), s); }
      for (const key of (course.legacyStoreKeys || [])) {
        const old = localStorage.getItem(key);
        if (old) { const s = JSON.parse(old); if (s && s.v === 2) return Object.assign(fresh(), s, { v: 3, course: course.id }); }
      }
    } catch (e) { /* storage unavailable */ }
    return fresh();
  }""")
rep("case 'import': { try { const obj = JSON.parse($('#io').value); if (!obj || obj.v !== 2) throw new Error('bad'); S = Object.assign(fresh(), obj); S.active = null;",
    "case 'import': { try { const obj = JSON.parse($('#io').value); if (!obj || (obj.v !== 2 && obj.v !== 3)) throw new Error('bad'); S = Object.assign(fresh(), obj, { v: 3, course: course.id }); S.active = null;")

# Domain loops and literals
rep("[1, 2, 3, 4, 5]", "DOMAIN_IDS", count=8)
rep("const entries = {}; const domPts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; const domCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };",
    "const entries = {}; const domPts = {}; const domCount = {}; DOMAIN_IDS.forEach(d => { domPts[d] = 0; domCount[d] = 0; });")
rep("if (domPts[d] >= 6) { depth[d] = 'rebuild';", "if (domPts[d] >= REBUILD_PTS) { depth[d] = 'rebuild';")
rep("const picks = shuffle(STARTER_POOL[d]).slice(0, 2);", "const picks = shuffle(STARTER_POOL[d] || lessonsByDomain[d].map(l => l.id)).slice(0, T.starterPerDomain);")
rep("let score = 0; const byDomain = { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 }, 5: { c: 0, t: 0 } };",
    "let score = 0; const byDomain = {}; DOMAIN_IDS.forEach(d => { byDomain[d] = { c: 0, t: 0 }; });")

# Wording that assumed two starter questions, five domains, nine units, fifty questions
rep("if (r.kind === 'domain') return r.level === 'rebuild' ? `${DOMAINS[r.d].short}: both starter questions missed` : `${DOMAINS[r.d].short}: gap on the starter test`;",
    "if (r.kind === 'domain') return r.level === 'rebuild' ? `${DOMAINS[r.d].short}: ${ALL_WORD} starter questions missed` : `${DOMAINS[r.d].short}: gap on the starter test`;")
rep("function lessonWhy(r) { const d = DOMAINS[r.d].short; return r.level === 'rebuild' ? `In your tutorial because you missed both ${d} questions on the starter test.`",
    "function lessonWhy(r) { const d = DOMAINS[r.d].short; return r.level === 'rebuild' ? `In your tutorial because you missed ${ALL_WORD} ${d} questions on the starter test.`")
rep('<p class="ink2" style="font-size:.95rem">Missed both questions in a domain: you get every lesson in that domain. Missed one, or guessed: you get that domain\'s core lessons plus the exact topic. Confident and correct on both: nothing from that domain.</p>',
    '<p class="ink2" style="font-size:.95rem">Missed ${ALL_WORD} questions in a domain: you get every lesson in that domain. Missed one, or guessed: you get that domain\'s core lessons plus the exact topic. Confident and correct on ${ALL_WORD}: nothing from that domain.</p>')
rep("""        <div class="eyebrow">NetPlus Academy</div>
        <h1>Ten questions, then a course built for you.</h1>
        <p class="ink2" style="font-size:1.1rem">The starter test asks two questions from each of the five exam domains.""",
    """        <div class="eyebrow">${esc(course.brand)} · ${esc(course.name)}</div>
        <h1>${STARTER_N} questions, then a course built for you.</h1>
        <p class="ink2" style="font-size:1.1rem">The starter test asks ${T.starterPerDomain} questions from each of the ${DOMAIN_IDS.length} exam domains.""")
rep("<h1>Nine units, ${lessons.length} lessons</h1>", "<h1>${plural(units.length, 'unit')}, ${plural(lessons.length, 'lesson')}</h1>")
rep("const STAGE_LABEL = { starter: 'Starter test', tutorial: 'Initial tutorial', fulltest: '50-question test', retrain: 'Retraining', practice: 'Practice tests', ready: 'Ready' };",
    "const STAGE_LABEL = { starter: 'Starter test', tutorial: 'Initial tutorial', fulltest: `${EXAM_N}-question test`, retrain: 'Retraining', practice: 'Practice tests', ready: 'Ready' };")
rep("const TEST_LABEL = { starter: 'Starter test', full: '50-question test', practice: 'Practice test' };",
    "const TEST_LABEL = { starter: 'Starter test', full: `${EXAM_N}-question test`, practice: 'Practice test' };")
rep("The starter test is ${STARTER_N} questions, two per domain.", "The starter test is ${STARTER_N} questions, ${T.starterPerDomain} per domain.")
rep("Unseen questions are chosen first, and subnetting, ports, OSI, and route-selection items are generated fresh every time.</p>",
    "Unseen questions are chosen first.${course.generatedNote ? ' ' + esc(course.generatedNote) : ''}</p>")
rep("`The real exam passes at 720 of 900, about 72%. This course holds you to ${PASS_PCT}% so the real thing has margin.`",
    "`${esc(course.realExamNote)} This course holds you to ${PASS_PCT}% so the real thing has margin.`")
rep("<p>The real exam passes at about 72%, so you have margin. Schedule it for the next week or two while the material is fresh, and do one drill session a day until then.</p>",
    "<p>${esc(course.realExamNote)} You have margin. Schedule it for the next week or two while the material is fresh, and do one drill session a day until then.</p>")
rep("""        <li>Up to 90 questions in 90 minutes, including performance-based items. Do the multiple choice first if a simulation stalls you; flag and return.</li>
        <li>Read for the qualifier: MOST likely, BEST, FIRST, NEXT. The methodology questions are about order.</li>
        <li>Subnet with block sizes on the scratch board. 256 minus the mask octet, then count.</li>
        <li>Eliminate two options, then decide. Never leave a question blank.</li>
        <li>Two forms of ID, arrive early, sleep the night before.</li>
""", "        ${(course.examDay || []).map(t => `<li>${inline(t)}</li>`).join('')}\n")
rep("if (st === 'fulltest') return { label: 'Take the 50-question test', act: 'start-exam', arg: 'full',",
    "if (st === 'fulltest') return { label: `Take the ${EXAM_N}-question test`, act: 'start-exam', arg: 'full',")

# Brand and catalog link
rep('<button class="brand" data-act="go" data-arg="home"><span class="mark">N+</span> NetPlus Academy</button>',
    '<button class="brand" data-act="go" data-arg="home"><span class="mark">${esc(course.short)}</span> ${esc(course.name)}</button>')
rep("${navBtn('home', 'Home')}${navBtn('tutorial', 'Tutorial')}${navBtn('exam', 'Tests')}${navBtn('train', 'Drills')}${navBtn('cheatsheet', 'Cheat sheet')}${navBtn('progress', 'Progress')}${navBtn('feedback', 'Feedback')}\n          </nav>",
    "${navBtn('home', 'Home')}${navBtn('tutorial', 'Tutorial')}${navBtn('exam', 'Tests')}${navBtn('train', 'Drills')}${navBtn('cheatsheet', 'Cheat sheet')}${navBtn('progress', 'Progress')}${navBtn('feedback', 'Feedback')}${course.catalogUrl ? `<a href=\"${esc(course.catalogUrl)}\" title=\"${esc(course.brand)}\">All courses</a>` : ''}\n          </nav>")

# Feedback naming
rep("body: JSON.stringify(Object.assign({ course: 'netplus-academy' }, f))", "body: JSON.stringify(Object.assign({ course: course.id }, f))")
rep("const lines = [`# NetPlus Academy feedback (", "const lines = [`# ${course.name} feedback (")
rep("a.download = 'netplus-academy-feedback.json';", "a.download = `${course.id}-feedback.json`;")
rep("subject=${encodeURIComponent('NetPlus Academy feedback')}", "subject=${encodeURIComponent(course.name + ' feedback')}")

# Self-test: no lesson ids, proportions from STARTER_N
rep("ex.answers[k] = k < 6 ? { choice: wrong, conf: 5 } : k < 8 ? { choice: q.c, conf: 1 } : { choice: q.c, conf: 5 }; });",
    "ex.answers[k] = k < Math.round(STARTER_N * 0.6) ? { choice: wrong, conf: 5 } : k < Math.round(STARTER_N * 0.8) ? { choice: q.c, conf: 1 } : { choice: q.c, conf: 5 }; });")
rep("saveFeedback({ kind: 'question', ref: { qid: 'u1l1-1', lesson: 'u1l1', stem: 'self-test stem',",
    "saveFeedback({ kind: 'question', ref: { qid: lessons[0].id + '-1', lesson: lessons[0].id, stem: 'self-test stem',")
rep("go('lesson', 'u4l1'); deepOpen = 'u4l1'; render();", "const deepId = lessons.find(l => FRA.deep && FRA.deep[l.id]).id; go('lesson', deepId); deepOpen = deepId; render();")
rep("log.push(`deep u4l1 rendered pre=${deepPre} ol=${deepOl}`);", "log.push(`deep ${deepId} rendered pre=${deepPre} ol=${deepOl}`);")

io.open(P, "w", encoding="utf-8", newline="\n").write(src)
print("task3 patch applied")
