// INST1 Academy dynamic question generators. Each returns a fresh, computed question so conduit fill, bend radius,
// pulling tension, cable quantity, and the 25-pair color code never repeat exactly. Rules agree with the lessons and
// the cheat sheet: fill 53/31/40 percent for 1/2/3+ cables; bend radius 4 x OD for 4-pair UTP, 10 x for multipair,
// fiber 10 x unloaded and 20 x under tension; 25 lbf (110 N) per 4-pair cable; whole runs per box.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const comma = x => Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u3l14 conduit fill ----------
  const EMT = [{ size: "3/4 in", id: 0.824 }, { size: "1 in", id: 1.049 }, { size: "1-1/4 in", id: 1.380 }, { size: "1-1/2 in", id: 1.610 }, { size: "2 in", id: 2.067 }];
  const CABLES = [{ name: "Category 5e", od: 0.21 }, { name: "Category 6", od: 0.25 }, { name: "Category 6A", od: 0.30 }];
  function fill() {
    const p = pick(EMT); const cab = pick(CABLES); const ratio = (p.id * p.id) / (cab.od * cab.od);
    const at40 = Math.floor(0.40 * ratio);
    if (R(2) === 0 && at40 >= 3) {
      const cands = [Math.floor(0.53 * ratio), Math.floor(0.31 * ratio), Math.floor(ratio), at40 + 1, at40 - 1, Math.floor(0.40 * p.id / cab.od), Math.round(0.40 * ratio) + 2].map(String);
      return build("u3l14", `What is the largest number of ${cab.name} cables (${cab.od} in OD) that may go in ${p.size} EMT (inside diameter ${p.id} in) at the 40 percent fill limit?`, String(at40),
        wrong(String(at40), cands),
        `Cables at the limit = 0.40 x (conduit ID squared) / (cable OD squared) = 0.40 x ${num(p.id * p.id, 3)} / ${num(cab.od * cab.od, 4)} = ${num(0.40 * ratio, 2)}, rounded down to ${at40}. Round down: a partial cable over the limit is over the limit. Using diameters instead of their squares, or the 53 percent one-cable figure, are the usual slips.`, "fill");
    }
    const n = Math.max(3, Math.min(at40 + 3, pick([3, 4, 5, 6, 8, 10])));
    const pct = n / ratio * 100;
    const cands = [`${num(n * cab.od / p.id * 100, 1)}%`, `${num(pct * 4 / Math.PI, 1)}%`, `${num(pct / 2, 1)}%`, `${num(pct * 2, 1)}%`, `${num(pct + 10, 1)}%`];
    return build("u3l14", `${n} ${cab.name} cables (${cab.od} in OD) are in ${p.size} EMT (inside diameter ${p.id} in). What is the conduit fill?`, `${num(pct, 1)}%`,
      wrong(`${num(pct, 1)}%`, cands),
      `Fill = number of cables x (cable OD squared) / (conduit ID squared) x 100 = ${n} x ${num(cab.od * cab.od, 4)} / ${num(p.id * p.id, 3)} x 100 = ${num(pct, 1)}%. With three or more cables the limit is 40 percent, so this conduit is ${pct <= 40 ? "within" : "over"} the limit.`, "fill");
  }

  // ---------- u4l3 bend radius and pulling tension ----------
  const BEND = [
    { name: "a 4-pair UTP cable", ods: [0.21, 0.25, 0.30], k: 4, why: "4 x OD for 4-pair UTP" },
    { name: "a multipair copper backbone cable", ods: [0.5, 0.75, 1.0, 1.25], k: 10, why: "10 x OD for multipair copper" },
    { name: "an indoor optical fiber cable during the pull", ods: [0.25, 0.4, 0.5, 0.6], k: 20, why: "20 x OD for fiber under pulling tension" },
    { name: "an installed indoor optical fiber cable with no load", ods: [0.25, 0.4, 0.5, 0.6], k: 10, why: "10 x OD for fiber with no load" }
  ];
  function bend() {
    const b = pick(BEND); const od = pick(b.ods); const r = b.k * od;
    const cands = [4, 8, 10, 20, 6].filter(k => k !== b.k).map(k => `${num(k * od, 2)} in`).concat([`${num(r / 2, 2)} in`, `${num(r * 2, 2)} in`]);
    return build("u4l3", `What is the minimum bend radius for ${b.name} with an outside diameter of ${od} in?`, `${num(r, 2)} in`,
      wrong(`${num(r, 2)} in`, cands),
      `Minimum bend radius = ${b.why} = ${b.k} x ${od} in = ${num(r, 2)} in. A manufacturer's figure, if larger, wins.`, "bend");
  }
  function tension() {
    const n = pick([2, 4, 6, 8, 12, 24]); const lbf = n * 25; const newton = n * 110;
    if (R(2) === 0) {
      const cands = [25, lbf / 2, lbf * 2, n * 110, lbf + 25].map(v => `${comma(v)} lbf`);
      return build("u4l3", `A bundle of ${n} 4-pair cables is pulled together. What is the most pulling tension the bundle may take?`, `${comma(lbf)} lbf`,
        wrong(`${comma(lbf)} lbf`, cands),
        `The limit is 25 lbf (110 N) per 4-pair cable: ${n} x 25 = ${comma(lbf)} lbf. Applying one cable's limit to the whole bundle, or mixing up newtons and pounds-force, are the usual slips.`, "ten");
    }
    const cands = [110, newton / 2, newton * 2, n * 25, newton + 110].map(v => `${comma(v)} N`);
    return build("u4l3", `A bundle of ${n} 4-pair cables is pulled together. What is the most pulling tension the bundle may take, in newtons?`, `${comma(newton)} N`,
      wrong(`${comma(newton)} N`, cands),
      `The limit is 110 N (25 lbf) per 4-pair cable: ${n} x 110 = ${comma(newton)} N.`, "ten");
  }
  const u4l3 = () => (R(2) === 0 ? bend() : tension());

  // ---------- u4l1 cable quantity ----------
  function quantity() {
    const runs = pick([12, 18, 24, 36, 48, 60]); const avg = pick([80, 110, 140, 170, 210, 250]); const slackTr = 10; const slackOut = 1;
    const per = avg + slackTr + slackOut; const perBox = Math.floor(1000 / per); const boxes = Math.ceil(runs / perBox);
    const naive = Math.ceil(runs * per / 1000); const noSlack = Math.ceil(runs / Math.floor(1000 / avg));
    const cands = [naive, noSlack, boxes + 1, boxes - 1, Math.ceil(runs * avg / 1000), boxes + 2].filter(v => v > 0).map(String);
    return build("u4l1", `${runs} outlets average ${avg} ft from the telecom room. You leave 10 ft of slack in the room and 1 ft at each outlet, and cable comes in 1,000 ft boxes. Runs cannot be spliced. How many boxes do you need?`, String(boxes),
      wrong(String(boxes), cands),
      `Each run needs ${avg} + 10 + 1 = ${per} ft. One box holds ${perBox} whole runs (1,000 / ${per}, rounded down; the leftover is too short to use). ${runs} runs / ${perBox} per box = ${num(runs / perBox, 2)}, rounded up to ${boxes} boxes. Dividing total footage by 1,000 ignores the short leftover at the end of each box.`, "qty");
  }

  // ---------- u5l4 25-pair color code ----------
  const TIP = ["white", "red", "black", "yellow", "violet"]; const RING = ["blue", "orange", "green", "brown", "slate"];
  const colors = n => `${TIP[Math.floor((n - 1) / 5)]}-${RING[(n - 1) % 5]}`;
  function pairs() {
    const n = 1 + R(25);
    if (R(2) === 0) {
      const g = Math.floor((n - 1) / 5); const r = (n - 1) % 5;
      const cands = [`${TIP[(g + 1) % 5]}-${RING[r]}`, `${TIP[g]}-${RING[(r + 1) % 5]}`, `${TIP[r]}-${RING[g]}`, `${TIP[(g + 4) % 5]}-${RING[r]}`, `${TIP[g]}-${RING[(r + 4) % 5]}`];
      return build("u5l4", `In a 25-pair cable, what are the colors of pair ${n} (tip first, then ring)?`, colors(n),
        wrong(colors(n), cands),
        `Tip colors run white, red, black, yellow, violet, five pairs each; ring colors run blue, orange, green, brown, slate within each group. Pair ${n} is in tip group ${g + 1} (${TIP[g]}) at ring position ${r + 1} (${RING[r]}): ${colors(n)}.`, "pr");
    }
    const g = Math.floor((n - 1) / 5); const r = (n - 1) % 5;
    const cands = [r * 5 + g + 1, n + 5 > 25 ? n - 5 : n + 5, n + 1 > 25 ? n - 1 : n + 1, n - 5 < 1 ? n + 10 : n - 5, (n + 12) % 25 + 1].filter(v => v >= 1 && v <= 25).map(String);
    return build("u5l4", `A pair in a 25-pair cable is ${colors(n)} (tip ${TIP[g]}, ring ${RING[r]}). What is its pair number?`, String(n),
      wrong(String(n), cands),
      `Pair number = 5 x (tip group minus 1) + ring position. ${TIP[g]} is tip group ${g + 1} and ${RING[r]} is ring position ${r + 1}: 5 x ${g} + ${r + 1} = ${n}.`, "pr");
  }

  FRA.generators = { u3l14: fill, u4l3: u4l3, u4l1: quantity, u5l4: pairs };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
