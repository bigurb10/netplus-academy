// CHTM Academy dynamic question generators. Each returns a fresh, computed question so budget variance, return on
// investment and payback, straight-line depreciation, the cost of service ratio, and FMEA risk priority numbers never
// repeat exactly. Formulas agree with the lessons and the cheat sheet.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const money = x => "$" + Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u1l3 budget variance ----------
  const LINES = ["parts", "service contracts", "supplies", "training", "consumables", "overtime"];
  function variance() {
    const kind = R(2);
    const line = pick(LINES); const budget = pick([20000, 25000, 40000, 50000, 60000, 80000, 120000]);
    const pct = pick([-15, -12, -10, -8, -5, 5, 8, 10, 12, 15, 20]); const actual = budget * (1 + pct / 100); const v = actual - budget;
    const fav = v < 0;
    if (kind === 0) return build("u1l3", `The ${line} line was budgeted at ${money(budget)} and the year-to-date actual is ${money(actual)}. What is the variance, and is it favorable?`,
      `${money(Math.abs(v))} ${fav ? "under budget, favorable" : "over budget, unfavorable"}`,
      [`${money(Math.abs(v))} ${fav ? "over budget, unfavorable" : "under budget, favorable"}`, `${money(Math.abs(v) * 2)} ${fav ? "under budget, favorable" : "over budget, unfavorable"}`, `${money(budget)} ${fav ? "under budget, favorable" : "over budget, unfavorable"}`],
      `Variance = actual minus budget = ${money(actual)} minus ${money(budget)} = ${fav ? "minus " : ""}${money(Math.abs(v))}. An expense line that comes in under budget is favorable; over budget is unfavorable.`, "var");
    return build("u1l3", `The ${line} line was budgeted at ${money(budget)}; actual spending is ${money(actual)}. What is the variance as a percent of budget?`, `${num(pct, 1)}%`,
      wrong(`${num(pct, 1)}%`, [`${num(-pct, 1)}%`, `${num(v / actual * 100, 1)}%`, `${num(pct / 2, 1)}%`, `${num(pct * 2, 1)}%`]),
      `Variance percent = (actual minus budget) / budget x 100 = (${money(actual)} minus ${money(budget)}) / ${money(budget)} x 100 = ${num(pct, 1)}%. Divide by the budget, not the actual.`, "var");
  }

  // ---------- u1l5 return on investment and payback ----------
  function roi() {
    const kind = R(2);
    const cost = pick([15000, 20000, 30000, 40000, 50000, 75000, 100000]); const saving = pick([5000, 8000, 10000, 12000, 15000, 20000, 25000]); const years = pick([3, 4, 5]);
    if (kind === 0) {
      const gain = saving * years; const r = (gain - cost) / cost * 100;
      return build("u1l5", `Bringing a device line in house costs ${money(cost)} in training and test equipment and saves ${money(saving)} a year in contract fees. What is the return on investment over ${years} years?`, `${num(r, 0)}%`,
        wrong(`${num(r, 0)}%`, [`${num(gain / cost * 100, 0)}%`, `${num(saving / cost * 100, 0)}%`, `${num((gain - cost) / gain * 100, 0)}%`, `${num(r / years, 0)}%`, `${num((saving - cost) / cost * 100, 0)}%`]),
        `ROI = (gain minus cost) / cost x 100. Gain over ${years} years = ${money(saving)} x ${years} = ${money(gain)}; (${money(gain)} minus ${money(cost)}) / ${money(cost)} x 100 = ${num(r, 0)}%.`, "roi");
    }
    const pb = cost / saving;
    return build("u1l5", `A program costs ${money(cost)} up front and saves ${money(saving)} a year. What is the payback period?`, `${num(pb, 1)} years`,
      wrong(`${num(pb, 1)} years`, [`${num(saving / cost, 2)} years`, `${num(pb * 12, 0)} years`, `${num(pb / 2, 1)} years`, `${num(pb + 1, 1)} years`]),
      `Payback period = cost / annual savings = ${money(cost)} / ${money(saving)} = ${num(pb, 1)} years. ROI tells you how much; payback tells you how soon.`, "roi");
  }

  // ---------- u1l4 straight-line depreciation ----------
  function depreciation() {
    const kind = R(2);
    const cost = pick([24000, 36000, 48000, 60000, 90000, 120000, 150000]); const salvage = pick([0, 2000, 4000, 6000, 10000]); const life = pick([5, 6, 7, 8, 10]); const annual = (cost - salvage) / life;
    if (kind === 0) return build("u1l4", `A device cost ${money(cost)}, has a ${life}-year useful life, and a salvage value of ${money(salvage)}. What is the annual straight-line depreciation?`, `${money(annual)} per year`,
      wrong(`${money(annual)} per year`, [`${money(cost / life)} per year`, `${money((cost + salvage) / life)} per year`, `${money(annual * 2)} per year`, `${money(cost - salvage)} per year`, `${money((cost - salvage) / (life - 1))} per year`]),
      `Straight-line depreciation = (cost minus salvage) / useful life = (${money(cost)} minus ${money(salvage)}) / ${life} = ${money(annual)} per year.`, "dep");
    const n = pick([1, 2, 3, 4].filter(y => y < life)); const book = cost - annual * n;
    return build("u1l4", `A device cost ${money(cost)} with a ${life}-year life and ${money(salvage)} salvage, depreciated straight-line. What is its book value after ${n} year${n > 1 ? "s" : ""}?`, money(book),
      wrong(money(book), [money(cost - cost / life * n), money(annual * n), money(cost - annual), money(salvage), money(book / 2)]),
      `Annual depreciation = (${money(cost)} minus ${money(salvage)}) / ${life} = ${money(annual)}. Book value = cost minus accumulated depreciation = ${money(cost)} minus ${money(annual * n)} = ${money(book)}.`, "dep");
  }

  // ---------- u4l5 cost of service ratio ----------
  const DEVICES = ["an anesthesia machine", "a CT scanner", "a patient monitor fleet", "an infusion pump fleet", "a ventilator", "an ultrasound system", "a sterilizer"];
  function csr() {
    const kind = R(2);
    const acq = pick([40000, 80000, 120000, 250000, 500000, 1200000]); const pct = pick([3, 4, 5, 6, 8, 10, 12, 15]); const svc = acq * pct / 100;
    if (kind === 0) return build("u4l5", `${pick(DEVICES).replace(/^./, c => c.toUpperCase())} was acquired for ${money(acq)} and costs ${money(svc)} a year in labor, parts, and contracts. What is its cost of service ratio?`, `${num(pct, 1)}%`,
      wrong(`${num(pct, 1)}%`, [`${num(acq / svc, 1)}%`, `${num(pct * 10, 1)}%`, `${num(pct / 2, 1)}%`, `${num(pct * 2, 1)}%`]),
      `Cost of service ratio = annual service cost / acquisition cost x 100 = ${money(svc)} / ${money(acq)} x 100 = ${num(pct, 1)}%.`, "csr");
    const acq2 = pick([60000, 100000, 300000, 800000].filter(a => a !== acq)); const pct2 = pick([3, 4, 5, 6, 8, 10, 12, 15].filter(p => p !== pct)); const svc2 = acq2 * pct2 / 100;
    const higher = pct > pct2 ? "A" : "B";
    return build("u4l5", `Device A: acquired for ${money(acq)}, ${money(svc)} a year to service. Device B: acquired for ${money(acq2)}, ${money(svc2)} a year to service. Which has the higher cost of service ratio?`, `Device ${higher}, at ${num(Math.max(pct, pct2), 1)}% against ${num(Math.min(pct, pct2), 1)}%`,
      [`Device ${higher === "A" ? "B" : "A"}, at ${num(Math.min(pct, pct2), 1)}% against ${num(Math.max(pct, pct2), 1)}%`, `Device ${svc > svc2 ? "A" : "B"}, because it costs more per year in dollars`, `They are equal, because the ratio ignores acquisition cost`],
      `Ratio A = ${money(svc)} / ${money(acq)} = ${num(pct, 1)}%; ratio B = ${money(svc2)} / ${money(acq2)} = ${num(pct2, 1)}%. The ratio compares service cost to what the device cost, so the bigger dollar figure is not always the worse ratio.`, "csr");
  }

  // ---------- u3l5 FMEA risk priority number ----------
  const MODES = ["battery fails during transport", "alarm volume set too low", "infusion rate entered in the wrong units", "pump door seal leaks", "network drop loses the worklist", "cable insulation cracks"];
  function fmea() {
    const kind = R(2);
    const s = pick([3, 5, 6, 7, 8, 9, 10]); const o = pick([2, 3, 4, 5, 6, 7]); const d = pick([2, 3, 4, 5, 6, 8]); const rpn = s * o * d;
    if (kind === 0) return build("u3l5", `In an FMEA, the failure mode "${pick(MODES)}" scores severity ${s}, occurrence ${o}, and detection ${d}. What is its risk priority number?`, String(rpn),
      wrong(String(rpn), [String(s + o + d), String(s * o), String(s * d), String(rpn * 2), String(o * d), String((s + 1) * (o + 1) * (d + 1))]),
      `Risk priority number = severity x occurrence x detection = ${s} x ${o} x ${d} = ${rpn}. The three scores multiply; they are not added.`, "fmea");
    const s2 = pick([3, 5, 6, 7, 8, 9, 10]); const o2 = pick([2, 3, 4, 5, 6, 7]); const d2 = pick([2, 3, 4, 5, 6, 8]); let rpn2 = s2 * o2 * d2;
    if (rpn2 === rpn) rpn2 = rpn + 1;
    const first = rpn > rpn2 ? "the first" : "the second";
    const m1 = pick(MODES); let m2 = pick(MODES); if (m2 === m1) m2 = MODES[(MODES.indexOf(m1) + 1) % MODES.length];
    return build("u3l5", `Two failure modes: "${m1}" scores ${s} / ${o} / ${d} and "${m2}" scores ${s2} / ${o2} / ${d2} (severity / occurrence / detection). Which gets attention first?`, `${first.replace(/^./, c => c.toUpperCase())}, with a risk priority number of ${Math.max(rpn, rpn2)}`,
      [`${(rpn > rpn2 ? "The second" : "The first")}, with a risk priority number of ${Math.min(rpn, rpn2)}`, `${s >= s2 ? "The first" : "The second"}, because severity alone decides the order`, `Neither, because both must be fixed before any scoring`],
      `RPN = severity x occurrence x detection: ${s} x ${o} x ${d} = ${rpn} and ${s2} x ${o2} x ${d2} = ${rpn2 === s2 * o2 * d2 ? rpn2 : rpn2}. The higher number is addressed first; severity alone does not decide, though a very high severity is often reviewed regardless.`, "fmea");
  }

  FRA.generators = { u1l3: variance, u1l5: roi, u1l4: depreciation, u4l5: csr, u3l5: fmea };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
