"""Task 4: access gating built into the engine, off by default (course.freeCourse). Run from the repo root."""
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


# Access helpers right after the data index
rep("  const gens = FRA.generators || {};\n  document.title = course.name;\n",
    """  const gens = FRA.generators || {};
  document.title = course.name;

  // ---------- access ----------
  // Free set: the cheat sheet, the starter test, and the lessons below. Everything else needs entitlement.
  const FREE_SET = new Set();
  (function () { const f = course.free || {}; if (Array.isArray(f.lessons)) f.lessons.forEach(id => FREE_SET.add(id)); else if (typeof f.lessons === 'number') lessons.slice(0, f.lessons).forEach(l => FREE_SET.add(l.id)); })();
  const entitled = () => !!course.freeCourse || window.FRA_ENTITLED === true;
  const lessonLocked = id => !entitled() && !FREE_SET.has(id);
  const testsLocked = kind => !entitled() && kind !== 'starter';
  function paywall(what) {
    const btn = course.upgradeUrl ? `<a class="btn primary" href="${esc(course.upgradeUrl)}">Unlock the full course</a>` : `<button class="btn primary" data-act="upgrade">Unlock the full course</button>`;
    return `<div class="card lift stack paywall"><div class="eyebrow">Full course</div><h3>${esc(what)} is part of the full ${esc(course.name)} course.</h3><p class="ink2">The cheat sheet, the starter test, and the first ${FREE_SET.size} lessons are free. The full course adds every lesson, the ${EXAM_N}-question test, retraining, practice tests, and drills.</p><div class="row">${btn}<button class="btn ghost" data-act="go" data-arg="course">See the free lessons</button></div></div>`;
  }
""")

# Lesson view: locked lessons show the head and a paywall
rep("    const l = L[id]; if (!l) return viewCourse();\n    const ls = lstat(id); if (ls.status === 'new') { ls.status = 'read'; save(); }",
    """    const l = L[id]; if (!l) return viewCourse();
    if (lessonLocked(id)) return `<div class="content stack" style="gap:20px"><div class="lesson-head"><div class="row" style="gap:8px"><span class="pill accent">Unit ${l.unit.n}</span><span class="pill">${DOMAINS[l.domain].short}</span><span class="pill">Objective ${l.obj}</span></div><h1>${esc(l.title)}</h1></div>${paywall('This lesson')}</div>`;
    const ls = lstat(id); if (ls.status === 'new') { ls.status = 'read'; save(); }""")

# Rail and course list lock marks
rep("""<span style="flex:1">${esc(l.title)}</span>${rem.has(l.id) ? '<span class="inplan" title="In your tutorial"></span>' : ''}</button></li>""",
    """<span style="flex:1">${esc(l.title)}</span>${lessonLocked(l.id) ? '<span class="lock" title="Full course">&#9679;</span>' : rem.has(l.id) ? '<span class="inplan" title="In your tutorial"></span>' : ''}</button></li>""")
rep("""${planEntry(l.id) && !planDone(l.id) ? '<span class="pill accent">in tutorial</span>' : ''}</button>`).join('')}</div>""",
    """${lessonLocked(l.id) ? '<span class="pill">Full course</span>' : planEntry(l.id) && !planDone(l.id) ? '<span class="pill accent">in tutorial</span>' : ''}</button>`).join('')}</div>""")

# Tests hub: unlock button instead of full/practice when locked
rep("""${st !== 'starter' ? `<button class="btn ${st === 'fulltest' || st === 'practice' ? 'primary' : ''}" data-act="start-exam" data-arg="${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'practice' : 'full'}">${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'Practice test' : `${EXAM_N}-question test`}</button>` : ''}</div></div>""",
    """${st !== 'starter' ? (testsLocked('full') ? `<button class="btn primary" data-act="upgrade">Unlock the ${EXAM_N}-question test</button>` : `<button class="btn ${st === 'fulltest' || st === 'practice' ? 'primary' : ''}" data-act="start-exam" data-arg="${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'practice' : 'full'}">${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'Practice test' : `${EXAM_N}-question test`}</button>`) : ''}</div></div>""")

# start-exam guard
rep("      case 'start-exam': {\n",
    "      case 'start-exam': {\n        if (testsLocked(arg === 'starter' ? 'starter' : 'full')) { toast('The full course is needed for this test.'); return go('exam'); }\n")

# Next action on the home page
rep("    if (st === 'fulltest') return { label: `Take the ${EXAM_N}-question test`, act: 'start-exam', arg: 'full', sub: 'Weighted like the real exam. Your misses become the retraining tutorial.' };",
    "    if (st === 'fulltest') return testsLocked('full') ? { label: `Unlock the full course to take the ${EXAM_N}-question test`, act: 'upgrade', arg: '' } : { label: `Take the ${EXAM_N}-question test`, act: 'start-exam', arg: 'full', sub: 'Weighted like the real exam. Your misses become the retraining tutorial.' };")
rep("    return { label: 'Take a practice test', act: 'start-exam', arg: 'practice', sub: `Pass streak ${S.passStreak} of ${STREAK_NEEDED}. Score ${PASS_PCT}% or better ${STREAK_NEEDED} times in a row to be cleared.` };",
    "    if (testsLocked('practice')) return { label: 'Unlock the full course for practice tests', act: 'upgrade', arg: '' };\n    return { label: 'Take a practice test', act: 'start-exam', arg: 'practice', sub: `Pass streak ${S.passStreak} of ${STREAK_NEEDED}. Score ${PASS_PCT}% or better ${STREAK_NEEDED} times in a row to be cleared.` };")

# Drills locked entirely
rep("    const tr = S.active && S.active.kind === 'train' ? S.active : null;\n    if (!tr) {\n      const weak = weakTopics();",
    "    const tr = S.active && S.active.kind === 'train' ? S.active : null;\n    if (!entitled()) return `<div class=\"content stack\" style=\"gap:18px\"><div><div class=\"eyebrow\">Drills</div><h1>Extra practice on weak topics</h1></div>${paywall('Drilling')}</div>`;\n    if (!tr) {\n      const weak = weakTopics();")

# Upgrade action
rep("      case 'deep-toggle': {",
    "      case 'upgrade': { if (course.upgradeUrl) { location.href = course.upgradeUrl; return; } toast('The full course is not for sale yet. Everything is free for now.'); return; }\n      case 'deep-toggle': {")

io.open(P, "w", encoding="utf-8", newline="\n").write(src)
print("task4 patch applied")
