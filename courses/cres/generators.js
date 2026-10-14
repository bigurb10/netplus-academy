// CRES Academy dynamic question generators. Each returns a fresh, computed question so radiation units,
// the inverse square law, Ohm's law, RC time constants, heat units, mAs and the 15 percent rule, half-value
// layers, leakage limits, and subnet questions never repeat exactly. Numbers agree with the lessons and the cheat sheet.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const money = (n) => n.toLocaleString('en-US');
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u2l2 radiation units and time to a limit ----------
  function dose() {
    const kind = R(3);
    if (kind === 0) {
      const pairs = [["rad", "mGy", 10], ["rem", "mSv", 10], ["Gy", "rad", 100], ["Sv", "rem", 100], ["mSv", "microsieverts", 1000], ["mGy", "micrograys", 1000]];
      const [from, to, f] = pick(pairs); const v = pick([0.5, 1, 2, 5, 10, 25, 50, 100]); const ans = v * f;
      return build("u2l2", `A report gives ${num(v)} ${from}. What is that in ${to}?`, `${num(ans)} ${to}`,
        wrong(`${num(ans)} ${to}`, [`${num(v / f, 4)} ${to}`, `${num(ans * 10)} ${to}`, `${num(ans / 10)} ${to}`, `${num(v)} ${to}`]),
        `1 ${from} = ${f} ${to}, so ${num(v)} x ${f} = ${num(ans)} ${to}. Gray and sievert are the SI units; rad and rem are the older units, 100 to one.`, "dose");
    }
    if (kind === 1) {
      const rate = pick([0.5, 1, 2, 4, 5, 10]); const limit = pick([10, 20, 50, 100]); const h = limit / rate;
      return build("u2l2", `A survey meter reads ${num(rate)} mR/h where a worker must stand. How long can the worker stay before reaching ${limit} mR?`, `${num(h, 1)} hours`,
        wrong(`${num(h, 1)} hours`, [`${num(rate * limit, 0)} hours`, `${num(rate / limit, 3)} hours`, `${num(h * 2, 1)} hours`, `${num(h / 2, 1)} hours`]),
        `Time = allowed exposure / rate = ${limit} / ${num(rate)} = ${num(h, 1)} hours. Exposure accumulates at the rate the meter shows, so halving the time halves the dose.`, "dose");
    }
    const sofar = pick([2, 5, 8, 10, 12, 15, 20, 25, 30]); const left = 50 - sofar;
    return build("u2l2", `A technologist's badge reports show ${sofar} mSv so far this year. Against the occupational effective dose limit, how much remains?`, `${left} mSv`,
      wrong(`${left} mSv`, [`${50 + sofar} mSv`, `${num(sofar / 2)} mSv`, `${150 - sofar} mSv`, `${num(50 - sofar / 2)} mSv`]),
      `The annual occupational effective dose limit is 50 mSv. 50 minus ${sofar} leaves ${left} mSv. The lens limit is 150 mSv and the skin limit 500 mSv, which are different questions.`, "dose");
  }

  // ---------- u2l3 inverse square law ----------
  function inverse() {
    const kind = R(2);
    const d1 = pick([1, 2, 3, 4]); const d2 = pick([1, 2, 3, 4, 6, 8].filter(d => d !== d1)); const I1 = pick([4, 8, 16, 32, 64, 100, 200, 400]);
    const I2 = I1 * (d1 * d1) / (d2 * d2);
    if (kind === 0) return build("u2l3", `At ${d1} m from the source the exposure rate is ${I1} mR/h. What is the rate at ${d2} m?`, `${num(I2, 2)} mR/h`,
      wrong(`${num(I2, 2)} mR/h`, [`${num(I1 * d1 / d2, 2)} mR/h`, `${num(I1 * d2 * d2 / (d1 * d1), 2)} mR/h`, `${num(I1 * d1 * d1 / d2, 2)} mR/h`, `${num(I1 / 2, 2)} mR/h`, `${num(I1 * d2 / d1, 2)} mR/h`]),
      `Inverse square law: I2 = I1 x (d1 / d2) squared = ${I1} x (${d1} / ${d2}) squared = ${num(I2, 2)} mR/h. Doubling the distance cuts the rate to one quarter.`, "isl");
    const k = pick([2, 3, 4]); const dk = d1 * k; const frac = k * k;
    return build("u2l3", `The exposure rate at ${d1} m is ${I1} mR/h. At what distance does it fall to 1/${frac} of that?`, `${dk} m`,
      wrong(`${dk} m`, [`${d1 * frac} m`, `${num(d1 * Math.sqrt(k), 2)} m`, `${d1 + k} m`, `${num(d1 * k / 2, 1)} m`, `${num(dk * 3, 1)} m`]),
      `Rate falls with the square of distance: ${k} times the distance gives 1/${frac} of the rate, so ${d1} x ${k} = ${dk} m.`, "isl");
  }

  // ---------- u5l2 heat units (single-phase HU = kVp x mA x s; three-phase and high-frequency HU = 1.4 x kVp x mA x s; one heat unit is about 1.4 J) ----------
  const GENS = [["single-phase", 1], ["three-phase", 1.4], ["high-frequency", 1.4]];
  function heat() {
    const kind = R(3);
    const kVp = pick([60, 70, 80, 90, 100, 120]); const mA = pick([100, 200, 300, 400, 500]); const s = pick([0.05, 0.1, 0.2, 0.5, 1]); const [g, f] = pick(GENS);
    const base = kVp * mA * s; const HU = base * f;
    if (kind === 0) return build("u5l2", `A ${g} generator makes one exposure at ${kVp} kVp, ${mA} mA, ${num(s)} s. How many heat units does the anode receive?`, `${num(HU, 0)} HU`,
      wrong(`${num(HU, 0)} HU`, [`${num(f === 1 ? base * 1.4 : base, 0)} HU`, `${num(HU * 2, 0)} HU`, `${num(kVp * mA, 0)} HU`, `${num(HU / 2, 0)} HU`, `${num(kVp + mA + s, 0)} HU`]),
      `HU = kVp x mA x s${f === 1 ? "" : " x 1.4"} = ${kVp} x ${mA} x ${num(s)}${f === 1 ? "" : " x 1.4"} = ${num(HU, 0)} HU. Three-phase and high-frequency generators deliver about 1.4 times the heat of single-phase for the same settings, because their voltage stays near the peak.`, "hu");
    if (kind === 1) {
      const n = pick([5, 10, 20, 40]); const cap = pick([100000, 200000, 300000, 400000]); const total = HU * n; const ok = total <= cap;
      const correct = `${num(total, 0)} HU, ${ok ? "within" : "over"} the ${num(cap, 0)} HU rating`;
      return build("u5l2", `A ${g} generator fires ${n} exposures in quick succession at ${kVp} kVp, ${mA} mA, ${num(s)} s. The anode is rated ${num(cap, 0)} HU. What is the total, and is it within the rating?`, correct,
        [`${num(total, 0)} HU, ${ok ? "over" : "within"} the ${num(cap, 0)} HU rating`, `${num(HU, 0)} HU, within the ${num(cap, 0)} HU rating`, `${num(base * n, 0)} HU, ${base * n <= cap ? "within" : "over"} the ${num(cap, 0)} HU rating`, `${num(total * 2, 0)} HU, ${total * 2 <= cap ? "within" : "over"} the ${num(cap, 0)} HU rating`],
        `One exposure is ${kVp} x ${mA} x ${num(s)}${f === 1 ? "" : " x 1.4"} = ${num(HU, 0)} HU; ${n} of them is ${num(total, 0)} HU, which is ${ok ? "under" : "above"} the ${num(cap, 0)} HU anode rating. Always check the series against the rating chart, not just one exposure.`, "hu");
    }
    const J = HU * 1.4;
    return build("u5l2", `An exposure deposits ${num(HU, 0)} heat units in the anode. About how much energy is that in joules?`, `about ${num(J, 0)} J`,
      wrong(`about ${num(J, 0)} J`, [`about ${num(HU, 0)} J`, `about ${num(HU / 1.4, 0)} J`, `about ${num(J * 10, 0)} J`, `about ${num(J / 10, 0)} J`]),
      `One heat unit is about 1.4 joules, so ${num(HU, 0)} HU x 1.4 = about ${num(J, 0)} J. The anode must shed that energy before the next series.`, "hu");
  }

  // ---------- u5l3 mAs and the 15 percent rule ----------
  function technique() {
    const kind = R(3);
    if (kind === 0) {
      const mA = pick([100, 200, 300, 400, 500, 600]); const s = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5]); const mAs = mA * s;
      return build("u5l3", `The generator is set to ${mA} mA and ${num(s)} s. What is the mAs?`, `${num(mAs, 2)} mAs`,
        wrong(`${num(mAs, 2)} mAs`, [`${num(mA / s, 0)} mAs`, `${num(mA + s, 2)} mAs`, `${num(mAs * 2, 2)} mAs`, `${num(mAs / 2, 2)} mAs`]),
        `mAs = mA x s = ${mA} x ${num(s)} = ${num(mAs, 2)} mAs. Tube current times exposure time is the quantity of x-rays.`, "mas");
    }
    if (kind === 1) {
      const mAs = pick([5, 10, 20, 25, 40, 50, 100]); const mA2 = pick([100, 200, 400, 500]); const s2 = mAs / mA2;
      return build("u5l3", `A technique chart calls for ${mAs} mAs. The large focal spot only allows ${mA2} mA. What exposure time keeps the same mAs?`, `${num(s2, 3)} s`,
        wrong(`${num(s2, 3)} s`, [`${num(mA2 / mAs, 3)} s`, `${num(mAs * mA2 / 1000, 3)} s`, `${num(s2 * 2, 3)} s`, `${num(s2 / 2, 3)} s`]),
        `Time = mAs / mA = ${mAs} / ${mA2} = ${num(s2, 3)} s. Reciprocity: the same mAs from any mA and time pair gives the same receptor exposure.`, "mas");
    }
    const kVp = pick([60, 70, 80, 90, 100]); const mAs = pick([4, 8, 10, 16, 20, 40]); const up = R(2) === 0;
    const kVp2 = Math.round(up ? kVp * 1.15 : kVp * 0.85); const mAs2 = up ? mAs / 2 : mAs * 2;
    return build("u5l3", `An image was made at ${kVp} kVp and ${mAs} mAs. The radiologist wants the same receptor exposure with ${up ? "15 percent more" : "15 percent less"} kVp. What technique?`, `${kVp2} kVp and ${num(mAs2)} mAs`,
      [`${kVp2} kVp and ${mAs} mAs`, `${kVp2} kVp and ${num(up ? mAs * 2 : mAs / 2)} mAs`, `${Math.round(up ? kVp * 0.85 : kVp * 1.15)} kVp and ${num(mAs2)} mAs`],
      `The 15 percent rule: ${up ? "raising" : "lowering"} kVp by 15 percent ${up ? "doubles" : "halves"} receptor exposure, so ${up ? "halve" : "double"} the mAs. ${kVp} x ${up ? "1.15" : "0.85"} is about ${kVp2} kVp, and ${mAs} ${up ? "/ 2" : "x 2"} = ${num(mAs2)} mAs.`, "mas");
  }

  // ---------- u5l5 half-value layer ----------
  function hvl() {
    const kind = R(2);
    if (kind === 0) {
      const n = pick([1, 2, 3, 4, 5]); const I0 = pick([100, 200, 400, 800, 1000]); const rem = I0 / Math.pow(2, n);
      return build("u5l5", `An unfiltered beam measures ${I0} mR. After ${n} half-value layer${n > 1 ? "s" : ""} of added filtration, what remains?`, `${num(rem, 2)} mR`,
        wrong(`${num(rem, 2)} mR`, [`${num(I0 / (2 * n), 2)} mR`, `${num(I0 / Math.pow(2, n + 1), 2)} mR`, `${num(I0 - I0 * n / 10, 2)} mR`, `${num(I0 / n, 2)} mR`]),
        `Each half-value layer halves the intensity: ${I0} / 2^${n} = ${num(rem, 2)} mR. HVL measures beam quality; a harder beam needs a thicker layer to halve it.`, "hvl");
    }
    const h = pick([2, 2.5, 3, 4]); const n = pick([1, 2, 3, 4]); const t = h * n; const pct = 100 / Math.pow(2, n);
    return build("u5l5", `A beam's half-value layer is ${num(h)} mm Al. What fraction of the beam passes through ${num(t)} mm Al?`, `${num(pct, 2)}%`,
      wrong(`${num(pct, 2)}%`, [`${num(100 / n, 2)}%`, `${num(100 - pct, 2)}%`, `${num(100 / Math.pow(2, n + 1), 2)}%`, `${num(100 / (2 * n), 2)}%`, `${num(pct * 1.5, 2)}%`]),
      `${num(t)} mm is ${n} half-value layer${n > 1 ? "s" : ""} (${num(t)} / ${num(h)}), so the beam is halved ${n} time${n > 1 ? "s" : ""}: 100 / 2^${n} = ${num(pct, 2)}%.`, "hvl");
  }

  // ---------- u4l1 Ohm's law, power, series and parallel: copy of the CBET `ohms` with build("u4l1", ...) ----------
  const PAR = [[6, 3, 2], [12, 4, 3], [10, 10, 5], [20, 5, 4], [12, 6, 4], [30, 15, 10], [8, 8, 4], [24, 8, 6], [40, 10, 8], [60, 30, 20], [100, 100, 50], [30, 6, 5]];
  function ohms() {
    const kind = R(5);
    if (kind === 0) {
      const V = pick([6, 9, 12, 24, 48, 120]); const Rr = pick([2, 3, 4, 6, 8, 10, 12, 20, 24, 30, 40, 60]); const I = V / Rr;
      return build("u4l1", `A ${V} V supply is connected across a ${Rr} ohm resistor. What current flows?`, `${num(I)} A`,
        wrong(`${num(I)} A`, [`${num(V * Rr)} A`, `${num(Rr / V)} A`, `${num(I * 2)} A`, `${num(I / 2)} A`, `${num(V + Rr)} A`, `${num(I * 10)} A`]),
        `Ohm's law: I = V / R = ${V} / ${Rr} = ${num(I)} A. Multiplying (${num(V * Rr)}) or dividing the other way (${num(Rr / V)}) are the usual errors.`, "ohm");
    }
    if (kind === 1) {
      const I = pick([0.5, 1, 2, 3, 4, 5, 10]); const Rr = pick([2, 4, 5, 6, 8, 10, 12, 20, 24]); const V = I * Rr;
      return build("u4l1", `A ${I} A current flows through a ${Rr} ohm resistor. What is the voltage across it?`, `${num(V)} V`,
        wrong(`${num(V)} V`, [`${num(Rr / I)} V`, `${num(I / Rr)} V`, `${num(V * 2)} V`, `${num(V / 2)} V`, `${num(I + Rr)} V`, `${num(V * 10)} V`]),
        `V = I x R = ${I} x ${Rr} = ${num(V)} V. Voltage across a resistor rises with the current through it.`, "ohm");
    }
    if (kind === 2) {
      const V = pick([12, 24, 120, 240]); const I = pick([0.5, 1, 2, 5, 10, 15]); const P = V * I;
      return build("u4l1", `A device operates at ${V} V and draws ${I} A. How much power does it dissipate?`, `${money(P)} W`,
        wrong(`${money(P)} W`, [`${num(V / I)} W`, `${num(V + I)} W`, `${money(P * 2)} W`, `${money(P / 2)} W`, `${money(P * 10)} W`, `${num(I / V, 3)} W`]),
        `P = V x I = ${V} x ${I} = ${money(P)} W. Power can also be written I squared x R or V squared / R.`, "ohm");
    }
    if (kind === 3) {
      const V = pick([12, 24, 36, 48, 120]); const R1 = pick([2, 4, 6, 8, 10]); const R2 = pick([2, 4, 6, 12, 20]); const Rt = R1 + R2; const I = V / Rt; const V1 = I * R1;
      if (R(2) === 0) return build("u4l1", `A ${V} V supply feeds a ${R1} ohm resistor and a ${R2} ohm resistor in series. What current flows in the circuit?`, `${num(I)} A`,
        wrong(`${num(I)} A`, [`${num(V / R1)} A`, `${num(V / R2)} A`, `${num(V / ((R1 * R2) / Rt))} A`, `${num(I * 2)} A`, `${num(V * Rt)} A`]),
        `In series, resistances add: ${R1} + ${R2} = ${Rt} ohms. I = V / R total = ${V} / ${Rt} = ${num(I)} A, the same current through both resistors.`, "ohm");
      return build("u4l1", `A ${V} V supply feeds a ${R1} ohm resistor and a ${R2} ohm resistor in series. What is the voltage across the ${R1} ohm resistor?`, `${num(V1)} V`,
        wrong(`${num(V1)} V`, [`${num(I * R2)} V`, `${num(V)} V`, `${num(V / 2)} V`, `${num(V1 * 2)} V`, `${num(V1 / 2)} V`, `${num(V * 2)} V`, `${num(V1 * 3)} V`, `${num(V1 / 3)} V`, `${num(V + R1)} V`]),
        `Total resistance ${Rt} ohms, so I = ${V} / ${Rt} = ${num(I)} A. Voltage across ${R1} ohms = ${num(I)} x ${R1} = ${num(V1)} V; the remaining ${num(I * R2)} V drops across the ${R2} ohm resistor, and the two add to ${V}.`, "ohm");
    }
    const [R1, R2, Rp] = pick(PAR);
    return build("u4l1", `Two resistors of ${R1} ohms and ${R2} ohms are connected in parallel. What is the total resistance?`, `${num(Rp)} ohms`,
      wrong(`${num(Rp)} ohms`, [`${num(R1 + R2)} ohms`, `${num(Math.max(R1, R2))} ohms`, `${num((R1 + R2) / 2)} ohms`, `${num(R1 * R2)} ohms`, `${num(Rp * 2)} ohms`, `${num(Rp / 2)} ohms`]),
      `For two resistors in parallel, R total = (R1 x R2) / (R1 + R2) = (${R1} x ${R2}) / (${R1} + ${R2}) = ${num(Rp)} ohms, always less than the smaller branch.`, "ohm");
  }

  // ---------- u4l2 RC time constants: copy of the CBET `rc` with build("u4l2", ...) ----------
  const fmtTime = (ms) => ms >= 1000 ? `${num(ms / 1000)} s` : `${num(ms)} ms`;
  function rc() {
    const Rk = pick([1, 2, 5, 10, 20, 50, 100]); const Cu = pick([1, 10, 47, 100, 220, 470, 1000]);
    const tau = Rk * Cu; // kilohms x microfarads = milliseconds
    const kind = R(3);
    const wrongs = [fmtTime(tau * 10), fmtTime(tau / 10), fmtTime(tau * 2), fmtTime(tau / 2), fmtTime(tau * 5), fmtTime(tau * 100)];
    if (kind === 0) return build("u4l2", `A ${Rk} kilohm resistor charges a ${Cu} microfarad capacitor. What is the RC time constant?`, fmtTime(tau), wrong(fmtTime(tau), wrongs),
      `Tau = R x C = ${Rk} kilohms x ${Cu} microfarads = ${fmtTime(tau)} (kilohms times microfarads gives milliseconds). The capacitor reaches 63 percent of the supply voltage in one time constant.`, "rc");
    if (kind === 1) return build("u4l2", `A capacitor of ${Cu} microfarads charges through ${Rk} kilohms. How long until it reaches about 63 percent of the supply voltage?`, fmtTime(tau), wrong(fmtTime(tau), wrongs),
      `One time constant, R x C = ${Rk} kilohms x ${Cu} microfarads = ${fmtTime(tau)}, brings the capacitor to about 63 percent. Five time constants is essentially full charge.`, "rc");
    return build("u4l2", `A capacitor of ${Cu} microfarads charges through ${Rk} kilohms. About how long until it is essentially fully charged (99 percent)?`, fmtTime(tau * 5), wrong(fmtTime(tau * 5), [fmtTime(tau), fmtTime(tau * 10), fmtTime(tau * 2), fmtTime(tau / 2), fmtTime(tau * 50)]),
      `Tau = ${Rk} kilohms x ${Cu} microfarads = ${fmtTime(tau)}. A capacitor is about 99 percent charged after five time constants: 5 x ${fmtTime(tau)} = ${fmtTime(tau * 5)}.`, "rc");
  }

  // ---------- u8l3 leakage limits, ground resistance, shock thresholds: copy of the CBET `safety` with build("u8l3", ...) ----------
  const LIMITS = [
    ["earth (ground) leakage current", "5 mA", "10 mA"],
    ["touch (enclosure) leakage current", "100 microamps", "500 microamps"],
    ["patient leakage current, AC, type B or BF applied part", "100 microamps", "500 microamps"],
    ["patient leakage current, AC, type CF applied part", "10 microamps", "50 microamps"],
    ["patient leakage current, DC, any applied part type", "10 microamps", "50 microamps"]
  ];
  const THRESH = [["about 1 mA", "the threshold of perception, a tingle"], ["10 to 20 mA", "the let-go threshold, where muscles contract and the person cannot release"], ["100 to 300 mA", "the range where ventricular fibrillation is likely through the skin"], ["about 10 microamps", "the microshock threshold when current reaches the heart directly through a catheter or wire"]];
  const uA = (v) => `${v} microamps`;
  function safety() {
    const kind = R(5);
    if (kind === 0) {
      const [name, nc] = pick(LIMITS);
      return build("u8l3", `Under IEC 60601-1, what is the normal-condition limit for ${name}?`, nc, shuffle(["5 mA", "10 mA", "100 microamps", "500 microamps", "10 microamps", "50 microamps"].filter(v => v !== nc)),
        `The normal-condition limit for ${name} is ${nc}; the single-fault limit is five times that. CF is the tightest at 10 microamps because its applied part may contact the heart.`, "safe");
    }
    if (kind === 1) {
      const [name, nc, sfc] = pick(LIMITS);
      return build("u8l3", `Under IEC 60601-1, what is the single-fault-condition limit for ${name}?`, sfc, shuffle(["5 mA", "10 mA", "100 microamps", "500 microamps", "10 microamps", "50 microamps"].filter(v => v !== sfc)),
        `Single-fault limits are five times the normal-condition limits: ${name} is ${nc} normally and ${sfc} with one fault such as an open ground or reversed polarity.`, "safe");
    }
    if (kind === 2) {
      const [level, effect] = pick(THRESH);
      if (R(2) === 0) return build("u8l3", `Which current level corresponds to ${effect}?`, level, shuffle(THRESH.filter(t => t[0] !== level).map(t => t[0])),
        `${level.charAt(0).toUpperCase() + level.slice(1)} is ${effect}. Perception about 1 mA, let-go 10 to 20 mA, fibrillation 100 to 300 mA through the skin, and only about 10 microamps to the heart directly.`, "safe");
      return build("u8l3", `What is the physiological significance of ${level} of 60 Hz current?`, effect.charAt(0).toUpperCase() + effect.slice(1), shuffle(THRESH.filter(t => t[0] !== level).map(t => t[1].charAt(0).toUpperCase() + t[1].slice(1))),
        `${level.charAt(0).toUpperCase() + level.slice(1)} is ${effect}. The thresholds in order: perception, let-go, fibrillation; microshock bypasses the skin entirely.`, "safe");
    }
    if (kind === 3) {
      const [type, ncLim, sfLim] = pick([["B", 100, 500], ["BF", 100, 500], ["CF", 10, 50]]);
      const single = R(2) === 0; const lim = single ? sfLim : ncLim;
      const measured = pick([Math.round(lim * 0.3), Math.round(lim * 0.6), Math.round(lim * 0.9), Math.round(lim * 1.2), Math.round(lim * 1.6), Math.round(lim * 2.5)]);
      const pass = measured <= lim; const cond = single ? "with the ground open (single fault)" : "in the normal condition";
      const correct = pass ? `Pass; the limit is ${uA(lim)}` : `Fail; the limit is ${uA(lim)}`;
      const other = single ? ncLim : sfLim;
      return build("u8l3", `A safety analyzer measures ${uA(measured)} of AC patient lead leakage on a type ${type} device ${cond}. Does the device pass?`, correct,
        [pass ? `Fail; the limit is ${uA(lim)}` : `Pass; the limit is ${uA(lim)}`, `Pass; the limit is ${uA(other)}`, `Fail; the limit is ${uA(other)}`],
        `Type ${type} AC patient leakage is limited to ${uA(ncLim)} in the normal condition and ${uA(sfLim)} under a single fault. Measured ${uA(measured)} ${cond} is ${pass ? "at or under" : "above"} the ${uA(lim)} limit, so the device ${pass ? "passes" : "fails and must be removed from service"}.`, "safe");
    }
    const r = pick([0.05, 0.1, 0.2, 0.3, 0.45, 0.6, 0.8, 1.2]); const pass = r <= 0.5;
    const correct = pass ? "Pass; the limit is 0.5 ohm" : "Fail; the limit is 0.5 ohm";
    return build("u8l3", `Ground resistance from the chassis of a cord-connected patient-care device to the plug's ground pin measures ${num(r)} ohm. Does it pass?`, correct,
      [pass ? "Fail; the limit is 0.5 ohm" : "Pass; the limit is 0.5 ohm", pass ? "Fail; the limit is 0.1 ohm" : "Pass; the limit is 5 ohms", "It cannot be judged without a leakage reading"],
      `NFPA 99 limits chassis-to-ground-pin resistance to 0.5 ohm for patient-care equipment. ${num(r)} ohm is ${pass ? "within" : "above"} that limit${pass ? "" : "; check the cord, plug, and ground connections"}.`, "safe");
  }

  // ---------- u10l1 same subnet or through the gateway: copy of the CBET `subnet` with build("u10l1", ...) ----------
  function subnet() {
    const a = 10 + R(3) * 10; const b = 1 + R(200); const c1 = 1 + R(200); const h1 = 2 + R(200);
    const mask24 = R(3) !== 0; const mask = mask24 ? "255.255.255.0" : "255.255.0.0";
    const ip1 = `${a}.${b}.${c1}.${h1}`;
    if (R(2) === 0) {
      const same = R(2) === 0;
      let ip2;
      if (same) ip2 = mask24 ? `${a}.${b}.${c1}.${(h1 + 50) % 250 + 1}` : `${a}.${b}.${(c1 + 7) % 250 + 1}.${h1}`;
      else ip2 = mask24 ? `${a}.${b}.${(c1 + 7) % 250 + 1}.${h1}` : `${a}.${(b + 11) % 250 + 1}.${c1}.${h1}`;
      const correct = same ? "Same subnet; they communicate directly through the switch" : "Different subnets; traffic passes through the default gateway router";
      const bits = mask24 ? "first three octets" : "first two octets";
      return build("u10l1", `A monitor at ${ip1} and a central station at ${ip2} both use subnet mask ${mask}. How do they communicate?`, correct,
        [same ? "Different subnets; traffic passes through the default gateway router" : "Same subnet; they communicate directly through the switch", "Same subnet; traffic must pass through the gateway", "Different subnets; they cannot communicate at all"],
        `With mask ${mask}, the ${bits} identify the network. ${ip1} and ${ip2} ${same ? "share" : "differ in"} the network portion, so they are on ${same ? "the same subnet and talk directly through the switch" : "different subnets and must go through the gateway router"}.`, "net");
    }
    const good = `${a}.${b}.${c1}.${(h1 + 90) % 250 + 1}`;
    const bad1 = `${a}.${b}.${(c1 + 3) % 250 + 1}.${h1}`; const bad2 = `${a}.${(b + 5) % 250 + 1}.${c1}.${h1}`; const bad3 = `${a + 1}.${b}.${c1}.${h1}`;
    return build("u10l1", `A device is configured with IP address ${ip1} and mask 255.255.255.0. Which address is on the same subnet?`, good, [bad1, bad2, bad3],
      `A /24 mask (255.255.255.0) means the first three octets, ${a}.${b}.${c1}, are the network. Only ${good} shares them; the others differ in the third, second, or first octet and need a router.`, "net");
  }

  FRA.generators = { u2l2: dose, u2l3: inverse, u4l1: ohms, u4l2: rc, u5l2: heat, u5l3: technique, u5l5: hvl, u8l3: safety, u10l1: subnet };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
