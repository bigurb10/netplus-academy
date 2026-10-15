# Exam facts and flashcards: landing-page facts tables and a flashcards page per course

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every course landing page carries two facts tables (the exam, this course) with the domains and, for the ACI courses, the exam fee; every course gets a crawlable `/<id>/flashcards/` page built from its glossary and cheat sheet with an in-page viewer, linked from the nav, the landing page, the practice and PBQ pages, the app's cheat sheet view, and the sitemap.

**Architecture:** All in the static generator `site/build-site.js` (a `flashcardsPage(m, R, origin)` beside `pbqPage`, a `flashcardDecks(m)` model helper, two facts tables in `landingPage`), one optional manifest string `exam.fee`, one button in `engine/app.js`'s cheat sheet view, and tests in `tests/site.js` and `tests/engine.js` on the mini fixture.

**Tech Stack:** Node static generator, jsdom tests, vanilla JS viewer inlined in the page (no libraries), `python build.py`, `node site/build-site.js`.

Spec: `docs/superpowers/specs/2026-10-15-growth-round-design.md`, section 2.

## Global Constraints

- The flashcards page is complete without JavaScript: every card is a `<div class="fc"><dt>front</dt><dd>back</dd></div>` inside a `<dl>` inside `<section class="deck" data-deck="<slug>">`; the viewer reads cards from that DOM.
- Decks: `acronyms` (every glossary key; front = the key, back = `full` then `tip`) and one per cheat-sheet section that has at least one table with exactly two columns (front = `rows[i][0]`, back = `rows[i][1]`, section title as the deck name, section `id` as the slug); rows whose first cell exceeds 80 characters are skipped; tables with three or more columns are never cards.
- `exam.fee` is an optional string on the manifest `exam` object. Values, verbatim: bmet `"2026: $220 AAMI member, $270 non-member; retake $190 or $240"`, cbet and cres `"2026: $410 AAMI member, $460 non-member; retake $355 or $405"`, chtm `"2026: $490 AAMI member, $565 non-member; retake $440 or $515"`. The four CompTIA manifests get no `fee`.
- Format row: `"Multiple choice plus performance-based questions"` when `Object.keys(m.pbqs).length > 0`, else `"Multiple choice"`.
- Viewer storage key `fra.<id>.flashcards`; every `localStorage` access wrapped in try/catch; the page works with storage unavailable.
- Plain ASCII in every file; original copy; no library or external request on the page.
- Commit after every task; never push. Branch `exam-facts-flashcards` off `main`.

## Conventions

- `m` is the course model from `model(FRA)` in `site/build-site.js`: `m.c` (manifest), `m.lessons`, `m.freeLessons`, `m.cheatsheet` (`{ title, intro, sections: [{ id, title, blocks: [{ type: 'table', cols, rows } | { type: 'list', ... } | { type: 'note', ... }] }] }`), `m.acronyms` (`{ KEY: { full, tip, more } }`), `m.pbqs`, `m.urls`.
- Pages are assembled with `shell({ origin, path, type, title, ogTitle, description, nav, jsonld, body })`; see `pbqPage` at `site/build-site.js:496` for the pattern, `crumbs`, `nav`, `examName`, `org`, `breadcrumbLd`, `esc`, `shorten`, `DESC_MAX`.
- Tests: `tests/site.js` builds the mini fixture into a temp dir (`site.buildAll` / `site.buildCourse`, see its section 2) and checks files with `exists()` and `read()`; follow the existing `pb` (PBQ page) checks at lines 90 to 100 for style. `tests/engine.js` boots the mini course as `wp` for the PBQ block; the cheat sheet view opens with `act(wp, 'nav', 'cheat')` or `wp.click(wp.$('[data-act="nav"][data-arg="cheat"]'))`.
- Run a single test file with `node tests/site.js` or `node tests/engine.js`; the full suite with `npm test`.

## File structure

- Modify `site/build-site.js`: `model()` gains `urls.flashcards` and `flashcards` (the deck list); new `flashcardDecks(m)` and `flashcardsPage(m, R, origin)`; `landingPage` facts tables and FAQ; `nav` item; `practicePage` and `pbqPage` closing cards; `buildCourse` page list; `courseUrls`.
- Modify `site/site.css`: `.deck`, `.fc`, `.fc-viewer` styles (small, dark-theme consistent with the existing `.card`).
- Modify `courses/{bmet,cbet,cres,chtm}/course.js`: `exam.fee`.
- Modify `engine/app.js`: the Flashcards button in `viewCheatsheet`.
- Modify `tests/site.js`, `tests/engine.js`.
- Modify `README.md` (one paragraph), the plan's Status section.

---

### Task 1: Exam facts tables and FAQ on the landing page, `exam.fee` on the ACI manifests

**Files:**
- Modify: `courses/bmet/course.js`, `courses/cbet/course.js`, `courses/cres/course.js`, `courses/chtm/course.js` (the `exam:` line)
- Modify: `site/build-site.js` (`landingPage`, lines 363 to 410: the `facts` array and the section that renders it; `defaultFaq`)
- Test: `tests/site.js`

**Interfaces:**
- Produces: `landingPage` renders `<table class="plain facts" id="exam-facts">` and `<table class="plain facts" id="course-facts">`; `m.c.exam.fee` (string or undefined).

- [ ] **Step 1: Write the failing tests.** In `tests/site.js`, after the line `check('landing JSON-LD: Course, FAQPage, BreadcrumbList', ...)`, add:

```js
check('landing has an exam facts table with the vendor, format, and every domain weight', landing.includes('id="exam-facts"') && landing.includes('<th scope="row">Vendor</th>') && landing.includes('<th scope="row">Format</th>') && m.c.domains.every(d => landing.includes(`<th scope="row">${esc(d.name)}</th><td>${d.pct}%</td>`)));
check('landing has a course facts table with lessons, questions, and cost', landing.includes('id="course-facts"') && landing.includes('<th scope="row">Questions</th>') && landing.includes('<th scope="row">Cost</th><td>Free</td>'));
check('landing shows a fee row only when the manifest sets exam.fee', (!!m.c.exam.fee) === landing.includes('<th scope="row">Fee</th>'));
check('landing FAQ asks what is on the exam and lists the domains', landing.includes('What is on the') && m.c.domains.every(d => landing.includes(esc(d.name))));
```

- [ ] **Step 2: Run to verify they fail.** Run: `node tests/site.js 2>&1 | grep FAIL`. Expected: the four new checks FAIL.
- [ ] **Step 3: Set the fees.** In each ACI manifest's `exam: { ... }` object add `fee: "<value from Global Constraints>"` as the last property (plain string).
- [ ] **Step 4: Rewrite the facts in `landingPage`.** Replace the `const facts = [ ... ].filter(Boolean);` block and the "The exam at a glance" section with:

```js
  const hasPbq = Object.keys(m.pbqs || {}).length > 0;
  const examFacts = [
    ex.vendor ? ['Vendor', ex.vendor] : null,
    ['Exam', ex.title || c.name],
    ex.code ? ['Code', ex.code] : null,
    ex.questions ? ['Questions', `${ex.questions}`] : null,
    ex.minutes ? ['Time', `${ex.minutes} minutes`] : null,
    ['Format', hasPbq ? 'Multiple choice plus performance-based questions' : 'Multiple choice'],
    c.realExamNote ? ['Passing', c.realExamNote] : (ex.passPct ? ['Passing', `${ex.passPct}%`] : null),
    ex.fee ? ['Fee', ex.fee] : null
  ].filter(Boolean).concat((c.domains || []).map(d => [d.name, `${d.pct}%`]));
  const courseFacts = [
    ['Lessons', `${m.lessons.length} across ${m.units.length} units${totalMin ? `, about ${Math.round(totalMin / 60 * 10) / 10} hours of reading` : ''}`],
    labs.length ? ['Labs', `${labs.length}`] : null,
    ['Questions', `${m.questions.length}, every one explained`],
    hasPbq ? ['PBQs', `${Object.keys(m.pbqs).length}`] : null,
    m.flashcards && m.flashcards.total ? ['Flashcards', `${m.flashcards.total}`] : null,
    ['Cost', 'Free']
  ].filter(Boolean);
  const factsTable = (id, rows) => `<div class="table-wrap"><table class="plain facts" id="${id}"><tbody>${rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>`;
```

and in the body:

```js
<section>
  <h2>The exam at a glance</h2>
  ${factsTable('exam-facts', examFacts)}
  <h2>This course</h2>
  ${factsTable('course-facts', courseFacts)}
</section>
```

(`m.flashcards` arrives in Task 2; until then the Flashcards row is simply absent, which the `&&` guard allows.)

- [ ] **Step 5: FAQ.** In `defaultFaq(m)` (find it with `grep -n "function defaultFaq" site/build-site.js`) add, before its `return`'s closing, two entries built the same way as the existing ones:

```js
    { q: `What is on the ${examName(c) || c.name} exam?`, a: `${(c.domains || []).map(d => `${d.name} (${d.pct}%)`).join(', ')}. The course's units follow the same domains, and every practice test is weighted the same way.` },
```

and, only when `c.exam && c.exam.fee`:

```js
    { q: `How much does the ${examName(c) || c.name} exam cost?`, a: `${c.exam.fee}. The fee goes to the certifying body; this course is free.` },
```

If `defaultFaq` builds a literal array, insert the first object unconditionally and the second with a spread: `...(c.exam && c.exam.fee ? [{...}] : [])`. A manifest with its own `seo.faq` keeps it; the test fixture has none, so the default applies there.

- [ ] **Step 6: Run the tests.** Run: `node tests/site.js 2>&1 | grep -E "FAIL|passed"`. Expected: no FAIL.
- [ ] **Step 7: Commit.**

```bash
git add courses/bmet/course.js courses/cbet/course.js courses/cres/course.js courses/chtm/course.js site/build-site.js tests/site.js
git commit -m "feat(site): exam facts and course facts tables with domain weights and ACI fees; exam FAQ entries"
```

### Task 2: Flashcard decks in the model and the flashcards page

**Files:**
- Modify: `site/build-site.js` (`model()`; new `flashcardDecks`, `flashcardsPage`; `buildCourse`; `courseUrls`)
- Modify: `site/site.css`
- Test: `tests/site.js`

**Interfaces:**
- Produces: `m.urls.flashcards` (`/<id>/flashcards/`), `m.flashcards = { decks: [{ slug, name, cards: [{ front, back }] }], total }`, `flashcardDecks(m)`, `flashcardsPage(m, R, origin)`; both functions exported from `module.exports`.

- [ ] **Step 1: Write the failing tests.** In `tests/site.js` section 2 (the mini build), after the PBQ page checks, add:

```js
check('flashcards page written at the course URL', exists('mini/flashcards/index.html'));
const fc = read('mini/flashcards/index.html');
const acrCount = Object.keys(FRAmini.acronyms || {}).length;
check('flashcards: every acronym is a card in the acronyms deck', fc.includes('<section class="deck" data-deck="acronyms">') && Object.keys(FRAmini.acronyms || {}).every(k => fc.includes(`<dt>${esc(k)}</dt>`)));
const twoCol = m.cheatsheet.sections.flatMap(s => s.blocks.filter(b => b.type === 'table' && b.cols.length === 2).flatMap(b => b.rows.filter(r => String(r[0]).length <= 80)));
const wideRows = m.cheatsheet.sections.flatMap(s => s.blocks.filter(b => b.type === 'table' && b.cols.length > 2).flatMap(b => b.rows));
check('flashcards: every two-column cheat sheet row is a card', twoCol.length > 0 && twoCol.every(r => fc.includes(`<dt>${esc(String(r[0]))}</dt>`)));
check('flashcards: rows of wider tables are not cards', wideRows.every(r => !fc.includes(`<dt>${esc(String(r[0]))}</dt>`)));
check('flashcards: the title carries the card count and the viewer is inlined', fc.includes(`Flashcards: ${acrCount + twoCol.length} cards`) && fc.includes('fra.mini.flashcards'));
check('flashcards: JSON-LD has a LearningResource and a DefinedTermSet', fc.includes('"LearningResource"') && fc.includes('"DefinedTermSet"'));
check('nav and sitemap carry the flashcards URL', fc.includes('href="/mini/flashcards/"') && read('sitemap.xml').includes('/mini/flashcards/</loc>'));
```

`FRAmini` is the mini pack object section 2 already loads (use whatever name that section gives `site.loadPack(miniDir)`; if it only has `m`, use `m.acronyms`). If the mini fixture's cheat sheet has no two-column table, add one to `tests/fixtures/mini/cheatsheet.js`: a section `{ id: "ports", title: "Ports", blocks: [{ type: "table", cols: ["Port", "Use"], rows: [["22", "SSH"], ["443", "HTTPS"]] }] }`, and check with `node tests/site.js` that the parity section still passes (it compares the engine's cheat sheet render to the static one, so the fixture change is visible to both).

- [ ] **Step 2: Run to verify they fail.** Run: `node tests/site.js 2>&1 | grep FAIL`. Expected: the new checks FAIL (the page does not exist).
- [ ] **Step 3: Model.** In `model()` add to `urls`: `flashcards: \`/${c.id}/flashcards/\`,` and after the `urls` object is built, set `m.flashcards = flashcardDecks(m)` (restructure the return so the model is assigned to a `const m` first, then `m.flashcards = flashcardDecks(m); return m;`). Add above `model`:

```js
// Flashcards come from data the pack already has: the acronym glossary (front: the key, back: what it
// stands for and the tip) and every two-column cheat-sheet table (front: first column, back: second).
// Wider tables are not cards, and a first cell over 80 characters is a sentence, not a prompt.
function flashcardDecks(m) {
  const decks = [];
  const acr = Object.keys(m.acronyms || {}).sort().map(k => ({ front: k, back: [m.acronyms[k].full, m.acronyms[k].tip].filter(Boolean).join('. ').replace(/\.\./g, '.') }));
  if (acr.length) decks.push({ slug: 'acronyms', name: 'Acronyms', cards: acr });
  ((m.cheatsheet && m.cheatsheet.sections) || []).forEach(s => {
    const cards = (s.blocks || []).filter(b => b.type === 'table' && Array.isArray(b.cols) && b.cols.length === 2)
      .flatMap(b => (b.rows || []).filter(r => String(r[0]).length <= 80).map(r => ({ front: String(r[0]), back: String(r[1]) })));
    if (cards.length) decks.push({ slug: s.id, name: s.title, cards });
  });
  return { decks, total: decks.reduce((n, d) => n + d.cards.length, 0) };
}
```

- [ ] **Step 4: The page.** Add after `pbqPage`:

```js
// The flashcards page: every deck rendered as a definition list (complete without JavaScript),
// with an inline viewer that flips one card at a time and remembers "Got it" in localStorage.
function flashcardsPage(m, R, origin) {
  const c = m.c; const decks = m.flashcards.decks; const total = m.flashcards.total;
  const h1 = `${examName(c) || c.name} Flashcards: ${total} cards`;
  const description = shorten(`Free ${examName(c) || c.name} flashcards: ${decks.map(d => `${d.cards.length} ${d.name.toLowerCase()}`).join(', ')}. Flip, shuffle, and mark the ones you know.`, DESC_MAX);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }, { name: 'Flashcards', href: m.urls.flashcards }];
  const deckHtml = decks.map(d => `<section class="deck" data-deck="${esc(d.slug)}"><h2>${esc(d.name)} <span class="muted">${d.cards.length}</span></h2><dl>${d.cards.map(x => `<div class="fc"><dt>${esc(x.front)}</dt><dd>${esc(x.back)}</dd></div>`).join('')}</dl></section>`).join('');
  const faq = [
    { q: `How many ${examName(c) || c.name} flashcards are there?`, a: `${total}: ${decks.map(d => `${d.cards.length} on ${d.name.toLowerCase()}`).join(', ')}. They come from the course's cheat sheet and glossary, so what you drill is what the lessons teach.` },
    { q: 'Do I need an account?', a: 'No. The cards you mark as known are remembered in this browser only. Sign in to the course for progress that follows you between devices.' }
  ];
  const body = `${crumbs(crumbList)}
<article class="lesson flashcards">
  <div class="eyebrow">${esc(examName(c) || c.name)}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">Tap a card to flip it. Mark the ones you know and they drop out of the deck; the rest keep coming back. ${total} cards from the course's cheat sheet and glossary.</p>
  <div class="card fc-viewer" id="fc-viewer" hidden>
    <div class="row spread" style="flex-wrap:wrap;gap:8px"><label class="muted">Deck <select id="fc-deck">${decks.map(d => `<option value="${esc(d.slug)}">${esc(d.name)} (${d.cards.length})</option>`).join('')}</select></label><span class="muted" id="fc-count"></span></div>
    <button class="fc-card" id="fc-card" type="button" aria-live="polite"><span class="fc-face" id="fc-front"></span><span class="fc-face fc-back" id="fc-back" hidden></span></button>
    <div class="row" style="flex-wrap:wrap;gap:8px"><button class="btn" type="button" id="fc-prev">Previous</button><button class="btn" type="button" id="fc-next">Next</button><button class="btn" type="button" id="fc-shuffle">Shuffle</button><button class="btn primary" type="button" id="fc-know">Got it</button><button class="btn" type="button" id="fc-again">Again</button><button class="btn ghost" type="button" id="fc-reset">Reset this deck</button></div>
    <p class="muted" style="font-size:.9rem">Space flips, arrow keys move. Known cards are remembered in this browser.</p>
  </div>
  ${deckHtml}
  <section><h2>Questions people ask</h2>${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>
</article>
<aside class="card cta stack">
  <div class="eyebrow">Flashcards are the recall half</div>
  <h2>The course teaches the other half</h2>
  <p class="ink2">${m.lessons.length} lessons, ${m.questions.length} explained questions, and a tutorial built from what you miss. Free while we launch.</p>
  <p><a class="btn primary" href="${m.urls.app}">Start the free course</a> <a class="btn" href="${m.urls.cheat}">Read the cheat sheet</a> <a class="btn" href="${m.urls.practice}">Try the practice test</a></p>
</aside>
<script>
(function(){
  var KEY='fra.${c.id}.flashcards';
  var decks={};document.querySelectorAll('section.deck').forEach(function(s){decks[s.dataset.deck]=Array.prototype.map.call(s.querySelectorAll('.fc'),function(x){return {f:x.querySelector('dt').textContent,b:x.querySelector('dd').textContent};});});
  var known={};try{known=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){known={};}
  function store(){try{localStorage.setItem(KEY,JSON.stringify(known));}catch(e){}}
  var v=document.getElementById('fc-viewer'),sel=document.getElementById('fc-deck'),card=document.getElementById('fc-card'),front=document.getElementById('fc-front'),back=document.getElementById('fc-back'),count=document.getElementById('fc-count');
  if(!v||!sel||!Object.keys(decks).length)return;
  var deck=sel.value,order=[],i=0,flipped=false;
  function pool(){var k=known[deck]||{};return decks[deck].map(function(c,n){return n;}).filter(function(n){return !k[n];});}
  function load(){order=pool();i=0;flipped=false;show();}
  function show(){var all=decks[deck].length;if(!order.length){front.textContent='Every card in this deck is marked known. Reset to start over.';back.hidden=true;front.hidden=false;count.textContent=all+' of '+all+' known';return;}
    if(i>=order.length)i=0;if(i<0)i=order.length-1;var c=decks[deck][order[i]];front.textContent=c.f;back.textContent=c.b;front.hidden=flipped;back.hidden=!flipped;count.textContent=(i+1)+' of '+order.length+' left, '+(all-order.length)+' known';}
  function flip(){if(!order.length)return;flipped=!flipped;show();}
  function move(d){if(!order.length)return;i+=d;flipped=false;show();}
  sel.addEventListener('change',function(){deck=sel.value;load();});
  card.addEventListener('click',flip);
  document.getElementById('fc-prev').addEventListener('click',function(){move(-1);});
  document.getElementById('fc-next').addEventListener('click',function(){move(1);});
  document.getElementById('fc-shuffle').addEventListener('click',function(){for(var a=order.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1));var t=order[a];order[a]=order[b];order[b]=t;}i=0;flipped=false;show();});
  document.getElementById('fc-know').addEventListener('click',function(){if(!order.length)return;known[deck]=known[deck]||{};known[deck][order[i]]=1;store();order.splice(i,1);flipped=false;show();});
  document.getElementById('fc-again').addEventListener('click',function(){move(1);});
  document.getElementById('fc-reset').addEventListener('click',function(){delete known[deck];store();load();});
  document.addEventListener('keydown',function(e){if(e.target.tagName==='SELECT')return;if(e.key===' '){e.preventDefault();flip();}else if(e.key==='ArrowRight'){move(1);}else if(e.key==='ArrowLeft'){move(-1);}});
  v.hidden=false;load();
})();
</script>`;
  return shell({
    origin, path: m.urls.flashcards, type: 'article',
    title: `${h1} | ${c.name}`, ogTitle: h1, description,
    nav: nav(m, m.urls.flashcards),
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'LearningResource', name: h1, description, url: origin + m.urls.flashcards, inLanguage: 'en', isAccessibleForFree: true, learningResourceType: 'Flashcards', about: { '@type': 'Thing', name: examName(c) || c.name }, provider: org() },
      ...(decks.some(d => d.slug === 'acronyms') ? [{ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: `${examName(c) || c.name} acronyms`, hasDefinedTerm: decks.find(d => d.slug === 'acronyms').cards.map(x => ({ '@type': 'DefinedTerm', termCode: x.front, name: x.front, description: x.back })) }] : []),
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}
```

The `${c.id}` inside the `<script>` is interpolated by the outer template literal when the page is generated, so the key is literal in the output. Check that `examName`, `org`, `breadcrumbLd`, `crumbs`, `nav`, `shorten`, and `DESC_MAX` are the names used elsewhere in the file (`grep -n "^function examName\|^function org\|^function breadcrumbLd\|^const DESC_MAX" site/build-site.js`).

- [ ] **Step 5: Wire it.** In `buildCourse`, after the PBQ page line: `if (m.flashcards.total) pages.push({ url: m.urls.flashcards, title: 'Flashcards', file: writePage(opts.out, m.urls.flashcards, flashcardsPage(m, R, origin)) });`. In `courseUrls`, add `m.urls.flashcards` when `m.flashcards.total > 0` (concat the same way the PBQ URL is added). In `nav`, add `item(m.urls.flashcards, 'Flashcards')` after the cheat sheet item, when `m.flashcards && m.flashcards.total`. Export `flashcardDecks` and `flashcardsPage` in `module.exports`.
- [ ] **Step 6: Styles.** Append to `site/site.css`:

```css
.deck dl { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; margin: 0; }
.deck .fc { border: 1px solid var(--line, #2a2f3a); border-radius: 8px; padding: 10px 12px; }
.deck dt { font-weight: 600; margin: 0 0 4px; }
.deck dd { margin: 0; color: var(--ink2, #b8bec9); font-size: .95rem; }
.fc-viewer { gap: 12px; }
.fc-card { display: block; width: 100%; min-height: 180px; border: 1px solid var(--line, #2a2f3a); border-radius: 12px; background: var(--card2, rgba(255,255,255,.03)); color: inherit; font: inherit; font-size: 1.15rem; line-height: 1.4; padding: 24px; text-align: center; cursor: pointer; }
.fc-card .fc-back { font-size: 1rem; }
```

Use the CSS custom property names the file already defines (`grep -o -- "--[a-z0-9]*" site/site.css | sort -u`); replace `--line`, `--ink2`, `--card2` with the real names if they differ, keeping the fallbacks.

- [ ] **Step 7: Run the site tests.** Run: `node tests/site.js 2>&1 | grep -E "FAIL|passed"`. Expected: no FAIL.
- [ ] **Step 8: Render it once** for a real course and look: `node site/build-site.js` then open `dist/site/netplus/flashcards/index.html` with headless Chrome (`"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --screenshot=<scratchpad>/fc.png --window-size=1100,900 "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/dist/site/netplus/flashcards/index.html"`) and read the screenshot: the viewer shows the first acronym card and the deck lists follow.
- [ ] **Step 9: Commit.**

```bash
git add site/build-site.js site/site.css tests/site.js tests/fixtures/mini/cheatsheet.js
git commit -m "feat(site): flashcards page per course from the glossary and cheat sheet, with an inline viewer"
```

### Task 3: Links everywhere, the app button, README, rebuild

**Files:**
- Modify: `site/build-site.js` (`landingPage` Flashcards section; `practicePage` and `pbqPage` closing cards)
- Modify: `engine/app.js` (`viewCheatsheet`, line 1477: the `printBtn`)
- Modify: `README.md`
- Test: `tests/site.js`, `tests/engine.js`

- [ ] **Step 1: Failing tests.** In `tests/site.js` after the flashcards checks:

```js
check('landing has a Flashcards section linking the page with the count', landing.includes('<section id="flashcards">') && landing.includes(`href="/mini/flashcards/"`) && landing.includes(`${m.flashcards.total} cards`));
check('practice and PBQ pages link the flashcards', read('mini/practice-test/index.html').includes('href="/mini/flashcards/"') && pb.includes('href="/mini/flashcards/"'));
```

(`landing` is read before the facts checks in Task 1; if the variable was read earlier than the Task 2 build, re-read it after `buildAll`.) In `tests/engine.js`, in the mini PBQ block before `// Home shows the welcome page`, add:

```js
    wp.click(wp.$('[data-act="nav"][data-arg="cheat"]'));
    check('the cheat sheet view links the flashcards page', !!wp.$('a.btn[href="/mini/flashcards/"]') && /Flashcards/.test(wp.$('a.btn[href="/mini/flashcards/"]').textContent));
    act(wp, 'pbq-open', 'mini-net');
```

(the last line returns the view to the PBQ the following lines expect; if the following lines do not depend on the PBQ view, drop it).

- [ ] **Step 2: Run to verify they fail.** `node tests/site.js 2>&1 | grep FAIL` and `node tests/engine.js 2>&1 | grep FAIL`. Expected: the three new checks FAIL.
- [ ] **Step 3: Landing section.** In `landingPage`'s body, after the `#free-lessons` section, add:

```js
${m.flashcards && m.flashcards.total ? `<section id="flashcards">
  <h2>Flashcards</h2>
  <p class="ink2">${m.flashcards.total} cards from the cheat sheet and glossary: ${m.flashcards.decks.map(d => `${d.cards.length} ${esc(d.name.toLowerCase())}`).join(', ')}. Flip, shuffle, mark what you know.</p>
  <p><a class="btn" href="${m.urls.flashcards}">Drill the flashcards</a></p>
</section>` : ''}
```

- [ ] **Step 4: Closing cards.** In `practicePage`'s `<aside class="card cta stack">` button row and in `pbqPage`'s, add ` <a class="btn" href="${m.urls.flashcards}">Flashcards</a>` after the existing buttons, guarded by `${m.flashcards && m.flashcards.total ? ... : ''}`.
- [ ] **Step 5: The app button.** In `engine/app.js` `viewCheatsheet`, change the `printBtn` line to:

```js
    const printBtn = `<a class="btn" href="/${esc(course.id)}/flashcards/">Flashcards</a><button class="btn primary" data-act="print-cheat">Print or save as PDF</button>`;
```

and confirm the place `printBtn` is rendered is a `.row` so the two sit side by side (`grep -n "printBtn" engine/app.js`).

- [ ] **Step 6: README.** Find the paragraph that describes the public pages (`grep -n "cheatsheet/\|/pbq/" README.md`) and add one sentence: "Each course also has `/<id>/flashcards/`, built from its glossary and two-column cheat-sheet tables, with an in-page viewer that remembers known cards in the browser."
- [ ] **Step 7: Run both test files, then rebuild and the full suite.** `node tests/site.js`, `node tests/engine.js` (no FAIL); then `python build.py` and `node site/build-site.js` (expected: `sitemap: 1071 URLs`, eight more than 1063); then `npm test` (all PASS).
- [ ] **Step 8: Status.** Append to this plan:

```markdown
## Status

Done <date>: exam facts (two tables, domain weights, ACI fees) and FAQ entries on every landing page; eight /<id>/flashcards/ pages (card counts: <per course>); nav, landing, practice, PBQ, and app links; sitemap 1071 URLs; npm test green.
```

- [ ] **Step 9: Commit.**

```bash
git add -A
git commit -m "feat(site,engine): flashcards linked from the landing, practice, PBQ pages and the app; README; rebuilt bundles and site"
```

## Status

Done 2026-10-15: exam facts (two tables, domain weights, ACI fees) and FAQ entries on every landing page; eight /<id>/flashcards/ pages (card counts: aplus1 455, aplus2 405, bmet 225, cbet 557, chtm 392, cres 423, netplus 434, secplus 369); nav, landing, practice, PBQ, and app links; sitemap 1071 URLs; npm test green.
