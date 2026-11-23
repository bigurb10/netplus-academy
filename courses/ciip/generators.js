// CIIP Academy dynamic question generators. Each returns a fresh, computed question so study size and annual storage,
// compression, transfer time, availability, and ROI and payback never repeat exactly. Formulas agree with the lessons
// and the cheat sheet. Sizes use 1 MB = 1,000,000 bytes and 1 GB = 1,000 MB, the convention the lessons state.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const comma = x => Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const money = x => "$" + comma(x);
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u5l1 study size and annual storage ----------
  const STUDIES = [
    { name: "a CT study", images: [200, 400, 600, 1000], m: 512, bytes: 2 },
    { name: "an MR study", images: [150, 300, 500], m: 256, bytes: 2 },
    { name: "a digital radiography study", images: [2, 3, 4], m: 2048, bytes: 2 },
    { name: "an ultrasound study", images: [20, 40, 60], m: 640, bytes: 1 }
  ];
  function storage() {
    const s = pick(STUDIES); const n = pick(s.images); const mb = n * s.m * s.m * s.bytes / 1e6;
    if (R(2) === 0) return build("u5l1", `${s.name.replace(/^./, c => c.toUpperCase())} has ${n} images, each ${s.m} x ${s.m} pixels at ${s.bytes} byte${s.bytes > 1 ? "s" : ""} per pixel. About how large is it, uncompressed?`, `${num(mb, 1)} MB`,
      wrong(`${num(mb, 1)} MB`, [`${num(mb / s.bytes, 1)} MB`, `${num(mb * 8, 1)} MB`, `${num(n * s.m * s.bytes / 1e6, 1)} MB`, `${num(mb * 2, 1)} MB`]),
      `Study size = images x rows x columns x bytes per pixel = ${n} x ${s.m} x ${s.m} x ${s.bytes} = ${comma(mb * 1e6)} bytes, about ${num(mb, 1)} MB. Forgetting the bytes per pixel, or counting bits, are the usual slips.`, "sto");
    const avg = pick([20, 50, 100, 150, 250]); const exams = pick([20000, 40000, 60000, 100000, 150000]); const tb = exams * avg / 1e6;
    return build("u5l1", `A department performs ${comma(exams)} exams a year with an average study size of ${avg} MB. How much new storage does a year of studies need, uncompressed?`, `${num(tb, 2)} TB`,
      wrong(`${num(tb, 2)} TB`, [`${num(tb * 1000, 0)} TB`, `${num(tb / 1000, 3)} TB`, `${num(tb / 12, 2)} TB`, `${num(tb * 2, 2)} TB`]),
      `Annual storage = exams x average size = ${comma(exams)} x ${avg} MB = ${comma(exams * avg)} MB = ${num(tb, 2)} TB (1 TB = 1,000,000 MB). Plan for growth and any second copy on top of this.`, "sto");
  }

  // ---------- u3l4 compression ----------
  function compression() {
    const orig = pick([60, 120, 250, 400, 800]); const ratio = pick([2, 2.5, 3, 4, 10, 15]);
    if (R(2) === 0) return build("u3l4", `A ${orig} MB study is stored with ${ratio}:1 compression. How much space does it take?`, `${num(orig / ratio, 1)} MB`,
      wrong(`${num(orig / ratio, 1)} MB`, [`${num(orig * ratio, 1)} MB`, `${num(orig - ratio, 1)} MB`, `${num(orig / ratio / 2, 1)} MB`, `${num(orig * (1 - 1 / ratio), 1)} MB`]),
      `Compressed size = original / ratio = ${orig} / ${ratio} = ${num(orig / ratio, 1)} MB. A ratio of ${ratio}:1 means the stored copy is 1/${ratio} of the original.`, "cmp");
    const stored = orig / ratio;
    return build("u3l4", `A study is ${orig} MB before compression and ${num(stored, 1)} MB after. What compression ratio was achieved?`, `${num(ratio, 1)}:1`,
      wrong(`${num(ratio, 1)}:1`, [`1:${num(ratio, 1)}`, `${num(ratio * 2, 1)}:1`, `${num(100 / ratio, 0)}:1`, `${num(ratio / 2, 1)}:1`]),
      `Ratio = original / compressed = ${orig} / ${num(stored, 1)} = ${num(ratio, 1)}:1. Lossless compression of medical images typically lands in the low single digits; higher ratios usually mean lossy.`, "cmp");
  }

  // ---------- u4l4 transfer time ----------
  function transfer() {
    const mb = pick([50, 100, 250, 500, 1000, 2000]); const mbps = pick([10, 50, 100, 1000]); const sec = mb * 8 / mbps;
    return build("u4l4", `About how long does it take to send a ${comma(mb)} MB study over a ${comma(mbps)} Mbps link at full speed, ignoring overhead?`, `${num(sec, 1)} seconds`,
      wrong(`${num(sec, 1)} seconds`, [`${num(mb / mbps, 1)} seconds`, `${num(sec * 8, 1)} seconds`, `${num(sec / 60, 1)} seconds`, `${num(mb / mbps / 8, 2)} seconds`]),
      `Transfer time = size in bits / speed in bits per second. ${comma(mb)} MB x 8 = ${comma(mb * 8)} megabits; / ${comma(mbps)} Mbps = ${num(sec, 1)} seconds. Links are rated in bits, files in bytes; multiply by 8 first. Real transfers are slower because of protocol overhead and latency.`, "xfr");
  }

  // ---------- u5l5 availability ----------
  const AV = [{ p: "99", f: 0.99 }, { p: "99.5", f: 0.995 }, { p: "99.9", f: 0.999 }, { p: "99.95", f: 0.9995 }, { p: "99.99", f: 0.9999 }];
  function availability() {
    const a = pick(AV);
    if (R(2) === 0) { const min = (1 - a.f) * 525600;
      return build("u5l5", `A PACS service level agreement guarantees ${a.p}% availability. How much downtime does that allow in a year?`, `about ${comma(min)} minutes (${num(min / 60, 1)} hours)`,
        wrong(`about ${comma(min)} minutes (${num(min / 60, 1)} hours)`, [`about ${comma(min / 12)} minutes (${num(min / 720, 1)} hours)`, `about ${comma(min * 10)} minutes (${num(min / 6, 1)} hours)`, `about ${comma(a.f * 525600)} minutes (${num(a.f * 8760, 1)} hours)`, `about ${comma(min / 10)} minutes (${num(min / 600, 1)} hours)`]),
        `Allowed downtime = (1 minus availability) x minutes in a year = (1 minus ${a.f}) x 525,600 = about ${comma(min)} minutes. Each extra 9 cuts the allowance tenfold.`, "av"); }
    const down = pick([60, 120, 240, 480, 720]); const pct = (1 - down / 43200) * 100;
    return build("u5l5", `In a 30-day month the archive was down for ${down} minutes. What availability did it achieve?`, `${num(pct, 2)}%`,
      wrong(`${num(pct, 2)}%`, [`${num(100 - down / 525600 * 100, 3)}%`, `${num(100 - down / 1440 * 100, 2)}%`, `${num(100 - down / 432, 2)}%`, `${num(pct - 1, 2)}%`]),
      `A 30-day month has 30 x 1,440 = 43,200 minutes. Availability = (43,200 minus ${down}) / 43,200 x 100 = ${num(pct, 2)}%.`, "av");
  }

  // ---------- u7l1 ROI and payback ----------
  function roi() {
    const cost = pick([50000, 80000, 120000, 200000, 300000]); const saving = pick([20000, 30000, 40000, 60000, 80000]); const years = pick([3, 4, 5]);
    if (R(2) === 0) { const gain = saving * years; const r = (gain - cost) / cost * 100;
      return build("u7l1", `A speech-recognition and reporting upgrade costs ${money(cost)} and saves ${money(saving)} a year in transcription. What is the return on investment over ${years} years?`, `${num(r, 0)}%`,
        wrong(`${num(r, 0)}%`, [`${num(gain / cost * 100, 0)}%`, `${num(saving / cost * 100, 0)}%`, `${num((gain - cost) / gain * 100, 0)}%`, `${num(r / years, 0)}%`, `${num(r + 50, 0)}%`, `${num(r - 50, 0)}%`, `${num(r + 100, 0)}%`]),
        `ROI = (gain minus cost) / cost x 100. Gain = ${money(saving)} x ${years} = ${money(gain)}; (${money(gain)} minus ${money(cost)}) / ${money(cost)} x 100 = ${num(r, 0)}%.`, "roi"); }
    const pb = cost / saving;
    return build("u7l1", `A cloud archive migration costs ${money(cost)} up front and saves ${money(saving)} a year in on-site storage support. What is the payback period?`, `${num(pb, 1)} years`,
      wrong(`${num(pb, 1)} years`, [`${num(saving / cost, 2)} years`, `${num(pb * 12, 0)} years`, `${num(pb / 2, 1)} years`, `${num(pb + 1, 1)} years`]),
      `Payback period = cost / annual savings = ${money(cost)} / ${money(saving)} = ${num(pb, 1)} years. ROI tells you how much; payback tells you how soon.`, "roi");
  }

  FRA.generators = { u5l1: storage, u3l4: compression, u4l4: transfer, u5l5: availability, u7l1: roi };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
