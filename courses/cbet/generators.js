// CBET Academy dynamic question generators. Each returns a fresh, computed question so circuit math, RC time constants,
// leakage limits and shock thresholds, ECG rate math, unit conversions, infusion arithmetic, ventilator math, and subnet
// decisions never repeat exactly.
window.FRA = window.FRA || {};
(function () {
  const R = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[R(arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = (p) => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const money = (n) => n.toLocaleString('en-US');
  // Distinct wrong answers: drop anything equal to the correct value, dedupe, keep three.
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };

  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- Ohm's law, power, series and parallel (u2l1) ----------
  const PAR = [[6, 3, 2], [12, 4, 3], [10, 10, 5], [20, 5, 4], [12, 6, 4], [30, 15, 10], [8, 8, 4], [24, 8, 6], [40, 10, 8], [60, 30, 20], [100, 100, 50], [30, 6, 5]];
  function ohms() {
    const kind = R(5);
    if (kind === 0) {
      const V = pick([6, 9, 12, 24, 48, 120]); const Rr = pick([2, 3, 4, 6, 8, 10, 12, 20, 24, 30, 40, 60]); const I = V / Rr;
      return build("u2l1", `A ${V} V supply is connected across a ${Rr} ohm resistor. What current flows?`, `${num(I)} A`,
        wrong(`${num(I)} A`, [`${num(V * Rr)} A`, `${num(Rr / V)} A`, `${num(I * 2)} A`, `${num(I / 2)} A`, `${num(V + Rr)} A`, `${num(I * 10)} A`]),
        `Ohm's law: I = V / R = ${V} / ${Rr} = ${num(I)} A. Multiplying (${num(V * Rr)}) or dividing the other way (${num(Rr / V)}) are the usual errors.`, "ohm");
    }
    if (kind === 1) {
      const I = pick([0.5, 1, 2, 3, 4, 5, 10]); const Rr = pick([2, 4, 5, 6, 8, 10, 12, 20, 24]); const V = I * Rr;
      return build("u2l1", `A ${I} A current flows through a ${Rr} ohm resistor. What is the voltage across it?`, `${num(V)} V`,
        wrong(`${num(V)} V`, [`${num(Rr / I)} V`, `${num(I / Rr)} V`, `${num(V * 2)} V`, `${num(V / 2)} V`, `${num(I + Rr)} V`, `${num(V * 10)} V`]),
        `V = I x R = ${I} x ${Rr} = ${num(V)} V. Voltage across a resistor rises with the current through it.`, "ohm");
    }
    if (kind === 2) {
      const V = pick([12, 24, 120, 240]); const I = pick([0.5, 1, 2, 5, 10, 15]); const P = V * I;
      return build("u2l1", `A device operates at ${V} V and draws ${I} A. How much power does it dissipate?`, `${money(P)} W`,
        wrong(`${money(P)} W`, [`${num(V / I)} W`, `${num(V + I)} W`, `${money(P * 2)} W`, `${money(P / 2)} W`, `${money(P * 10)} W`, `${num(I / V, 3)} W`]),
        `P = V x I = ${V} x ${I} = ${money(P)} W. Power can also be written I squared x R or V squared / R.`, "ohm");
    }
    if (kind === 3) {
      const V = pick([12, 24, 36, 48, 120]); const R1 = pick([2, 4, 6, 8, 10]); const R2 = pick([2, 4, 6, 12, 20]); const Rt = R1 + R2; const I = V / Rt; const V1 = I * R1;
      if (R(2) === 0) return build("u2l1", `A ${V} V supply feeds a ${R1} ohm resistor and a ${R2} ohm resistor in series. What current flows in the circuit?`, `${num(I)} A`,
        wrong(`${num(I)} A`, [`${num(V / R1)} A`, `${num(V / R2)} A`, `${num(V / ((R1 * R2) / Rt))} A`, `${num(I * 2)} A`, `${num(V * Rt)} A`]),
        `In series, resistances add: ${R1} + ${R2} = ${Rt} ohms. I = V / R total = ${V} / ${Rt} = ${num(I)} A, the same current through both resistors.`, "ohm");
      return build("u2l1", `A ${V} V supply feeds a ${R1} ohm resistor and a ${R2} ohm resistor in series. What is the voltage across the ${R1} ohm resistor?`, `${num(V1)} V`,
        wrong(`${num(V1)} V`, [`${num(I * R2)} V`, `${num(V)} V`, `${num(V / 2)} V`, `${num(V1 * 2)} V`, `${num(V1 / 2)} V`, `${num(V * 2)} V`, `${num(V1 * 3)} V`, `${num(V1 / 3)} V`, `${num(V + R1)} V`]),
        `Total resistance ${Rt} ohms, so I = ${V} / ${Rt} = ${num(I)} A. Voltage across ${R1} ohms = ${num(I)} x ${R1} = ${num(V1)} V; the remaining ${num(I * R2)} V drops across the ${R2} ohm resistor, and the two add to ${V}.`, "ohm");
    }
    const [R1, R2, Rp] = pick(PAR);
    return build("u2l1", `Two resistors of ${R1} ohms and ${R2} ohms are connected in parallel. What is the total resistance?`, `${num(Rp)} ohms`,
      wrong(`${num(Rp)} ohms`, [`${num(R1 + R2)} ohms`, `${num(Math.max(R1, R2))} ohms`, `${num((R1 + R2) / 2)} ohms`, `${num(R1 * R2)} ohms`, `${num(Rp * 2)} ohms`, `${num(Rp / 2)} ohms`]),
      `For two resistors in parallel, R total = (R1 x R2) / (R1 + R2) = (${R1} x ${R2}) / (${R1} + ${R2}) = ${num(Rp)} ohms, always less than the smaller branch.`, "ohm");
  }

  // ---------- RC time constants (u2l3) ----------
  const fmtTime = (ms) => ms >= 1000 ? `${num(ms / 1000)} s` : `${num(ms)} ms`;
  function rc() {
    const Rk = pick([1, 2, 5, 10, 20, 50, 100]); const Cu = pick([1, 10, 47, 100, 220, 470, 1000]);
    const tau = Rk * Cu; // kilohms x microfarads = milliseconds
    const kind = R(3);
    const wrongs = [fmtTime(tau * 10), fmtTime(tau / 10), fmtTime(tau * 2), fmtTime(tau / 2), fmtTime(tau * 5), fmtTime(tau * 100)];
    if (kind === 0) return build("u2l3", `A ${Rk} kilohm resistor charges a ${Cu} microfarad capacitor. What is the RC time constant?`, fmtTime(tau), wrong(fmtTime(tau), wrongs),
      `Tau = R x C = ${Rk} kilohms x ${Cu} microfarads = ${fmtTime(tau)} (kilohms times microfarads gives milliseconds). The capacitor reaches 63 percent of the supply voltage in one time constant.`, "rc");
    if (kind === 1) return build("u2l3", `A capacitor of ${Cu} microfarads charges through ${Rk} kilohms. How long until it reaches about 63 percent of the supply voltage?`, fmtTime(tau), wrong(fmtTime(tau), wrongs),
      `One time constant, R x C = ${Rk} kilohms x ${Cu} microfarads = ${fmtTime(tau)}, brings the capacitor to about 63 percent. Five time constants is essentially full charge.`, "rc");
    return build("u2l3", `A capacitor of ${Cu} microfarads charges through ${Rk} kilohms. About how long until it is essentially fully charged (99 percent)?`, fmtTime(tau * 5), wrong(fmtTime(tau * 5), [fmtTime(tau), fmtTime(tau * 10), fmtTime(tau * 2), fmtTime(tau / 2), fmtTime(tau * 50)]),
      `Tau = ${Rk} kilohms x ${Cu} microfarads = ${fmtTime(tau)}. A capacitor is about 99 percent charged after five time constants: 5 x ${fmtTime(tau)} = ${fmtTime(tau * 5)}.`, "rc");
  }

  // ---------- Leakage limits, ground resistance, shock thresholds (u3l2) ----------
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
      return build("u3l2", `Under IEC 60601-1, what is the normal-condition limit for ${name}?`, nc, shuffle(["5 mA", "10 mA", "100 microamps", "500 microamps", "10 microamps", "50 microamps"].filter(v => v !== nc)),
        `The normal-condition limit for ${name} is ${nc}; the single-fault limit is five times that. CF is the tightest at 10 microamps because its applied part may contact the heart.`, "safe");
    }
    if (kind === 1) {
      const [name, nc, sfc] = pick(LIMITS);
      return build("u3l2", `Under IEC 60601-1, what is the single-fault-condition limit for ${name}?`, sfc, shuffle(["5 mA", "10 mA", "100 microamps", "500 microamps", "10 microamps", "50 microamps"].filter(v => v !== sfc)),
        `Single-fault limits are five times the normal-condition limits: ${name} is ${nc} normally and ${sfc} with one fault such as an open ground or reversed polarity.`, "safe");
    }
    if (kind === 2) {
      const [level, effect] = pick(THRESH);
      if (R(2) === 0) return build("u3l2", `Which current level corresponds to ${effect}?`, level, shuffle(THRESH.filter(t => t[0] !== level).map(t => t[0])),
        `${level.charAt(0).toUpperCase() + level.slice(1)} is ${effect}. Perception about 1 mA, let-go 10 to 20 mA, fibrillation 100 to 300 mA through the skin, and only about 10 microamps to the heart directly.`, "safe");
      return build("u3l2", `What is the physiological significance of ${level} of 60 Hz current?`, effect.charAt(0).toUpperCase() + effect.slice(1), shuffle(THRESH.filter(t => t[0] !== level).map(t => t[1].charAt(0).toUpperCase() + t[1].slice(1))),
        `${level.charAt(0).toUpperCase() + level.slice(1)} is ${effect}. The thresholds in order: perception, let-go, fibrillation; microshock bypasses the skin entirely.`, "safe");
    }
    if (kind === 3) {
      const [type, ncLim, sfLim] = pick([["B", 100, 500], ["BF", 100, 500], ["CF", 10, 50]]);
      const single = R(2) === 0; const lim = single ? sfLim : ncLim;
      const measured = pick([Math.round(lim * 0.3), Math.round(lim * 0.6), Math.round(lim * 0.9), Math.round(lim * 1.2), Math.round(lim * 1.6), Math.round(lim * 2.5)]);
      const pass = measured <= lim; const cond = single ? "with the ground open (single fault)" : "in the normal condition";
      const correct = pass ? `Pass; the limit is ${uA(lim)}` : `Fail; the limit is ${uA(lim)}`;
      const other = single ? ncLim : sfLim;
      return build("u3l2", `A safety analyzer measures ${uA(measured)} of AC patient lead leakage on a type ${type} device ${cond}. Does the device pass?`, correct,
        [pass ? `Fail; the limit is ${uA(lim)}` : `Pass; the limit is ${uA(lim)}`, `Pass; the limit is ${uA(other)}`, `Fail; the limit is ${uA(other)}`],
        `Type ${type} AC patient leakage is limited to ${uA(ncLim)} in the normal condition and ${uA(sfLim)} under a single fault. Measured ${uA(measured)} ${cond} is ${pass ? "at or under" : "above"} the ${uA(lim)} limit, so the device ${pass ? "passes" : "fails and must be removed from service"}.`, "safe");
    }
    const r = pick([0.05, 0.1, 0.2, 0.3, 0.45, 0.6, 0.8, 1.2]); const pass = r <= 0.5;
    const correct = pass ? "Pass; the limit is 0.5 ohm" : "Fail; the limit is 0.5 ohm";
    return build("u3l2", `Ground resistance from the chassis of a cord-connected patient-care device to the plug's ground pin measures ${num(r)} ohm. Does it pass?`, correct,
      [pass ? "Fail; the limit is 0.5 ohm" : "Pass; the limit is 0.5 ohm", pass ? "Fail; the limit is 0.1 ohm" : "Pass; the limit is 5 ohms", "It cannot be judged without a leakage reading"],
      `NFPA 99 limits chassis-to-ground-pin resistance to 0.5 ohm for patient-care equipment. ${num(r)} ohm is ${pass ? "within" : "above"} that limit${pass ? "" : "; check the cord, plug, and ground connections"}.`, "safe");
  }

  // ---------- ECG paper math (u4l1) ----------
  function ecg() {
    const kind = R(5);
    if (kind === 0) {
      const n = pick([2, 3, 4, 5, 6]); const rate = 300 / n;
      return build("u4l1", `On an ECG strip at 25 mm/s, consecutive R waves are ${n} large boxes apart. What is the heart rate?`, `${num(rate, 0)} bpm`,
        wrong(`${num(rate, 0)} bpm`, [`${num(1500 / n, 0)} bpm`, `${num(300 / (n + 1), 0)} bpm`, `${num(300 / (n - 1 || 1), 0)} bpm`, `${num(n * 25, 0)} bpm`, `${num(rate * 2, 0)} bpm`]),
        `Each large box is 0.20 s at 25 mm/s, so rate = 300 / large boxes = 300 / ${n} = ${num(rate, 0)} bpm. Using small boxes, 1500 / ${n * 5} gives the same answer.`, "ecg");
    }
    if (kind === 1) {
      const m = pick([10, 12, 15, 18, 20, 25, 30]); const rate = Math.round(1500 / m);
      return build("u4l1", `On an ECG strip at 25 mm/s, consecutive R waves are ${m} small boxes apart. What is the heart rate?`, `${rate} bpm`,
        wrong(`${rate} bpm`, [`${Math.round(300 / m)} bpm`, `${Math.round(1500 / (m + 5))} bpm`, `${Math.round(1500 / (m - 5))} bpm`, `${m * 4} bpm`, `${rate * 2} bpm`]),
        `Each small box is 0.04 s, so rate = 1500 / small boxes = 1500 / ${m} = ${rate} bpm.`, "ecg");
    }
    if (kind === 2) {
      const k = pick([4, 5, 6, 7, 8, 9, 11, 13]);
      return build("u4l1", `An irregular rhythm shows ${k} R waves in a 6-second strip (30 large boxes). What is the approximate heart rate?`, `${k * 10} bpm`,
        wrong(`${k * 10} bpm`, [`${k * 6} bpm`, `${k * 5} bpm`, `${k * 20} bpm`, `${k} bpm`, `${k * 15} bpm`]),
        `For irregular rhythms, count the R waves in 6 seconds and multiply by 10: ${k} x 10 = ${k * 10} bpm. The 300 and 1500 methods assume a regular rhythm.`, "ecg");
    }
    if (kind === 3) {
      const boxes = pick([3, 4, 5, 6, 7]); const secs = boxes * 0.04; const normal = secs >= 0.12 && secs <= 0.20;
      const label = normal ? "normal (0.12 to 0.20 s)" : (secs > 0.20 ? "prolonged, beyond 0.20 s" : "short, under 0.12 s");
      const correct = `${num(secs)} s, ${label}`;
      return build("u4l1", `A PR interval spans ${boxes} small boxes at 25 mm/s. What is its duration, and is it normal?`, correct,
        wrong(correct, [`${num(secs)} s, ${normal ? "prolonged, beyond 0.20 s" : "normal (0.12 to 0.20 s)"}`, `${num(boxes * 0.2)} s, prolonged, beyond 0.20 s`, `${num(boxes * 0.01)} s, short, under 0.12 s`, `${num(boxes * 0.04 * 2)} s, prolonged, beyond 0.20 s`]),
        `Each small box is 0.04 s, so ${boxes} boxes = ${num(secs)} s. The normal PR interval is 0.12 to 0.20 s, so this one is ${label}.`, "ecg");
    }
    const mm = pick([5, 8, 12, 15, 20, 25]); const mv = mm / 10;
    return build("u4l1", `At the standard gain of 10 mm/mV, an R wave measures ${mm} mm tall. What is its amplitude?`, `${num(mv)} mV`,
      wrong(`${num(mv)} mV`, [`${num(mm)} mV`, `${num(mm * 10)} mV`, `${num(mv * 2)} mV`, `${num(mv / 2)} mV`, `${num(mm / 25)} mV`]),
      `Standard sensitivity is 10 mm per millivolt, so ${mm} mm / 10 = ${num(mv)} mV. The 1 mV calibration pulse draws a 10 mm square.`, "ecg");
  }

  // ---------- Unit conversions (u4l6) ----------
  function units() {
    const kind = R(8);
    if (kind === 0) { const v = pick([5, 8, 10, 12, 15, 20, 25, 30, 40]); const r = v / 1.36; const c = `${num(r, 1)} mmHg`;
      return build("u4l6", `A ventilator pressure of ${v} cm H2O is approximately how many mmHg?`, c, wrong(c, [`${num(v * 1.36, 1)} mmHg`, `${num(v, 1)} mmHg`, `${num(v / 2, 1)} mmHg`, `${num(v * 7.5, 1)} mmHg`, `${num(r * 2, 1)} mmHg`]),
        `1 mmHg = 1.36 cm H2O, so ${v} cm H2O / 1.36 = ${num(r, 1)} mmHg. Water is lighter than mercury, so the mmHg number is always smaller.`, "unit"); }
    if (kind === 1) { const v = pick([5, 10, 15, 20, 25, 30, 50]); const r = v * 1.36; const c = `${num(r, 1)} cm H2O`;
      return build("u4l6", `A pressure of ${v} mmHg equals approximately how many cm H2O?`, c, wrong(c, [`${num(v / 1.36, 1)} cm H2O`, `${num(v, 1)} cm H2O`, `${num(v * 2, 1)} cm H2O`, `${num(v * 7.5, 1)} cm H2O`, `${num(r / 2, 1)} cm H2O`]),
        `1 mmHg = 1.36 cm H2O, so ${v} mmHg x 1.36 = ${num(r, 1)} cm H2O.`, "unit"); }
    if (kind === 2) { const v = pick([1, 2, 5, 10, 15, 50]); const r = v * 51.7; const c = `about ${num(r, 0)} mmHg`;
      return build("u4l6", `A gauge reads ${v} psi. What is this in mmHg?`, c, wrong(c, [`about ${num(v * 14.7, 0)} mmHg`, `about ${num(v * 7.5, 0)} mmHg`, `about ${num(v * 1.36, 1)} mmHg`, `about ${num(v * 760, 0)} mmHg`, `about ${num(r / 2, 0)} mmHg`]),
        `One atmosphere is 14.7 psi and 760 mmHg, so 1 psi = 760 / 14.7 = about 51.7 mmHg. ${v} psi x 51.7 = about ${num(r, 0)} mmHg.`, "unit"); }
    if (kind === 3) { const v = pick([2, 4, 5, 8, 10, 12, 20]); const r = v * 7.5; const c = `${num(r, 1)} mmHg`;
      return build("u4l6", `A monitor set to kPa shows ${v} kPa. What is this in mmHg?`, c, wrong(c, [`${num(v / 7.5, 2)} mmHg`, `${num(v * 1.36, 1)} mmHg`, `${num(v * 51.7, 0)} mmHg`, `${num(v, 1)} mmHg`, `${num(r * 2, 1)} mmHg`]),
        `1 kPa = 7.5 mmHg (101.3 kPa is one atmosphere, 760 mmHg). ${v} x 7.5 = ${num(r, 1)} mmHg.`, "unit"); }
    if (kind === 4) { const cT = pick([35, 36, 37, 38, 38.5, 39, 40, 41, 42]); const f = cT * 1.8 + 32; const c = `${num(f, 1)} F`;
      return build("u4l6", `A patient's temperature is ${num(cT, 1)} C. What is this in Fahrenheit?`, c, wrong(c, [`${num(cT * 1.8, 1)} F`, `${num(cT + 32, 1)} F`, `${num(cT * 2 + 30, 1)} F`, `${num((cT - 32) / 1.8, 1)} F`, `${num(f + 1.8, 1)} F`]),
        `F = C x 1.8 + 32 = ${num(cT, 1)} x 1.8 + 32 = ${num(f, 1)} F. Remember 37 C = 98.6 F as a check.`, "unit"); }
    if (kind === 5) { const fT = pick([95, 96.8, 98.6, 100.4, 101.3, 102.2, 103.1, 104, 105.8]); const cv = (fT - 32) / 1.8; const c = `${num(cv, 1)} C`;
      return build("u4l6", `A patient's temperature is ${num(fT, 1)} F. What is this in Celsius?`, c, wrong(c, [`${num(fT / 1.8, 1)} C`, `${num(fT - 32, 1)} C`, `${num(fT * 1.8 + 32, 1)} C`, `${num(cv + 1, 1)} C`, `${num(cv - 1, 1)} C`]),
        `C = (F minus 32) / 1.8 = (${num(fT, 1)} minus 32) / 1.8 = ${num(cv, 1)} C.`, "unit"); }
    if (kind === 6) { const kg = pick([3, 10, 25, 50, 60, 70, 80, 90, 100, 120]); const lb = kg * 2.2; const c = `${num(lb, 1)} lb`;
      return build("u4l6", `A patient weighs ${kg} kg. What is this in pounds?`, c, wrong(c, [`${num(kg / 2.2, 1)} lb`, `${num(kg * 2, 1)} lb`, `${num(kg * 2.54, 1)} lb`, `${num(kg * 3, 1)} lb`, `${num(kg, 1)} lb`]),
        `1 kg = 2.2 lb, so ${kg} kg x 2.2 = ${num(lb, 1)} lb. Doses are calculated in kilograms, so the conversion runs the other way at the bedside.`, "unit"); }
    const v = pick([1, 2, 3, 4, 5, 6]); const psi = v * 14.5; const c = `about ${num(psi, 1)} psi`;
    return build("u4l6", `A tourniquet gas supply is regulated to ${v} bar. What is this in psi?`, c, wrong(c, [`about ${num(v * 7.5, 1)} psi`, `about ${num(v * 51.7, 1)} psi`, `about ${num(v / 14.5, 2)} psi`, `about ${num(v * 1.36, 1)} psi`, `about ${num(psi * 2, 1)} psi`]),
      `1 bar is about one atmosphere, 14.5 psi (100 kPa). ${v} bar x 14.5 = about ${num(psi, 1)} psi.`, "unit");
  }

  // ---------- Infusion arithmetic (u5l2) ----------
  function infusion() {
    const kind = R(5);
    if (kind === 0) {
      const vol = pick([250, 500, 1000]); const hrs = pick([2, 4, 5, 8, 10, 12, 24]); const rate = vol / hrs; const c = `${num(rate, 1)} mL/hr`;
      return build("u5l2", `An order calls for ${money(vol)} mL to infuse over ${hrs} hours. What rate should be programmed?`, c, wrong(c, [`${num(rate * 2, 1)} mL/hr`, `${num(rate / 2, 1)} mL/hr`, `${num(vol / (hrs * 60), 2)} mL/hr`, `${money(vol * hrs)} mL/hr`, `${num(rate * 10, 1)} mL/hr`]),
        `Rate in mL/hr = volume / hours = ${money(vol)} / ${hrs} = ${num(rate, 1)} mL/hr.`, "inf");
    }
    if (kind === 1) {
      const rate = pick([50, 75, 100, 120, 125, 150, 200]); const df = pick([10, 15, 20, 60]); const gtt = Math.round(rate * df / 60); const c = `${gtt} gtt/min`;
      return build("u5l2", `A gravity infusion runs at ${rate} mL/hr with a ${df} gtt/mL administration set. What drip rate should be counted?`, c, wrong(c, [`${Math.round(rate * 60 / df)} gtt/min`, `${Math.round(rate / df)} gtt/min`, `${rate * df} gtt/min`, `${Math.round(gtt * 2)} gtt/min`, `${Math.round(gtt / 2) || 1} gtt/min`]),
        `Drops per minute = (mL/hr x drop factor) / 60 = (${rate} x ${df}) / 60 = ${gtt} gtt/min.`, "inf");
    }
    if (kind === 2) {
      const dose = pick([0.05, 0.1, 0.2, 0.5, 1]); const kg = pick([50, 60, 70, 80, 90, 100]); const conc = pick([0.5, 1, 2, 4]); const mgHr = dose * kg; const rate = mgHr / conc; const c = `${num(rate)} mL/hr`;
      return build("u5l2", `A ${kg} kg patient is ordered ${dose} mg/kg/hr of a drug supplied at ${conc} mg/mL. What pump rate delivers the order?`, c, wrong(c, [`${num(mgHr)} mL/hr`, `${num(mgHr * conc)} mL/hr`, `${num(rate * 10)} mL/hr`, `${num(rate / 10)} mL/hr`, `${num(dose * conc)} mL/hr`]),
        `Dose per hour = ${dose} mg/kg/hr x ${kg} kg = ${num(mgHr)} mg/hr. Divide by the concentration: ${num(mgHr)} / ${conc} mg/mL = ${num(rate)} mL/hr.`, "inf");
    }
    if (kind === 3) {
      const dose = pick([2, 5, 10]); const kg = pick([50, 60, 70, 80]); const conc = pick([1, 2, 4, 8]); const mcgMin = dose * kg; const mgHr = mcgMin * 60 / 1000; const rate = mgHr / conc; const c = `${num(rate)} mL/hr`;
      return build("u5l2", `A ${kg} kg patient is ordered ${dose} mcg/kg/min of a drug supplied at ${conc} mg/mL. What pump rate delivers the order?`, c, wrong(c, [`${num(rate * 10)} mL/hr`, `${num(rate / 10)} mL/hr`, `${num(mcgMin / conc)} mL/hr`, `${num(mgHr)} mL/hr`, `${num(rate * 60)} mL/hr`]),
        `${dose} mcg/kg/min x ${kg} kg = ${mcgMin} mcg/min. Times 60 is ${mcgMin * 60} mcg/hr = ${num(mgHr)} mg/hr. Divide by ${conc} mg/mL: ${num(rate)} mL/hr. Convert units before dividing.`, "inf");
    }
    const mg = pick([200, 400, 500, 800, 1000, 2000]); const mL = pick([100, 250, 500, 1000]); const conc = mg / mL; const c = `${num(conc)} mg/mL`;
    return build("u5l2", `A bag contains ${money(mg)} mg of drug in ${money(mL)} mL. What is the concentration?`, c, wrong(c, [`${num(mL / mg, 3)} mg/mL`, `${num(conc * 10)} mg/mL`, `${num(conc / 10, 3)} mg/mL`, `${money(mg)} mg/mL`, `${num(conc * 2)} mg/mL`]),
      `Concentration = mg / mL = ${money(mg)} / ${money(mL)} = ${num(conc)} mg/mL. Every dose-to-rate calculation divides by this number, so an error here scales every rate.`, "inf");
  }

  // ---------- Ventilator math and alarms (u6l4) ----------
  const VALARMS = [["a kinked endotracheal tube", "High pressure"], ["thick secretions blocking the airway", "High pressure"], ["the patient biting the tube", "High pressure"], ["water pooled in the circuit tubing", "High pressure"], ["bronchospasm", "High pressure"], ["the circuit disconnected at the wye", "Low pressure or low minute volume"], ["a leaking endotracheal tube cuff", "Low pressure or low minute volume"], ["a cracked humidifier chamber", "Low pressure or low minute volume"], ["no spontaneous breath detected for the set interval", "Apnea"], ["a depleted oxygen sensor reading wrong", "FiO2"]];
  function vent() {
    const kind = R(5);
    if (kind === 0) { const perKg = pick([6, 7, 8]); const kg = pick([50, 55, 60, 65, 70, 75, 80]); const vt = perKg * kg; const c = `${money(vt)} mL`;
      return build("u6l4", `A ventilator is set to deliver ${perKg} mL/kg of ideal body weight to a patient whose ideal body weight is ${kg} kg. What tidal volume should be set?`, c, wrong(c, [`${money(vt * 2)} mL`, `${money(Math.round(vt / 2))} mL`, `${money(kg * 10)} mL`, `${money(perKg * 100)} mL`, `${money(vt + 100)} mL`]),
        `Tidal volume = ${perKg} mL/kg x ${kg} kg = ${money(vt)} mL. Lung-protective volumes are 6 to 8 mL per kilogram of ideal, not actual, body weight.`, "vent"); }
    if (kind === 1) { const vt = pick([400, 450, 500, 550, 600]); const rate = pick([10, 12, 14, 15, 16, 18, 20]); const mv = vt * rate / 1000; const c = `${num(mv, 1)} L/min`;
      return build("u6l4", `A ventilator delivers a tidal volume of ${vt} mL at ${rate} breaths per minute. What is the minute volume?`, c, wrong(c, [`${num(mv * 2, 1)} L/min`, `${num(mv / 2, 1)} L/min`, `${num(vt / rate, 1)} L/min`, `${num(vt * rate / 100, 1)} L/min`, `${num(mv * 10, 1)} L/min`]),
        `Minute volume = tidal volume x rate = ${vt} mL x ${rate} = ${money(vt * rate)} mL/min = ${num(mv, 1)} L/min.`, "vent"); }
    if (kind === 2) { const f = pick([0.21, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0]); const pct = Math.round(f * 100); const c = `${pct} percent oxygen`;
      return build("u6l4", `A ventilator's FiO2 is set to ${num(f)}. What oxygen concentration is being delivered, and how is it verified?`, `${c}, checked with an oxygen analyzer calibrated at 21 and 100 percent`,
        wrong(`${c}, checked with an oxygen analyzer calibrated at 21 and 100 percent`, [`${pct} percent oxygen, checked with a capnograph`, `${num(f)} percent oxygen, checked with an oxygen analyzer`, `${100 - pct} percent oxygen, checked with an oxygen analyzer`, `${pct * 2 > 100 ? 100 : pct * 2} percent oxygen, checked with a flow analyzer`]),
        `FiO2 is the fraction of inspired oxygen; ${num(f)} is ${pct} percent. Room air is 0.21. Delivered oxygen is verified with an oxygen analyzer calibrated at 21 percent (room air) and 100 percent.`, "vent"); }
    if (kind === 3) { const rate = pick([10, 12, 15, 20, 30]); const cyc = 60 / rate; const c = `${num(cyc, 1)} seconds`;
      return build("u6l4", `A ventilator is set to ${rate} breaths per minute. How long is each breath cycle?`, c, wrong(c, [`${num(cyc * 2, 1)} seconds`, `${num(cyc / 2, 1)} seconds`, `${num(rate / 60, 2)} seconds`, `${rate} seconds`, `${num(cyc + 1, 1)} seconds`]),
        `Cycle time = 60 / rate = 60 / ${rate} = ${num(cyc, 1)} seconds. With an I:E ratio of 1:2, one third of that is inspiration.`, "vent"); }
    const [cause, alarm] = pick(VALARMS);
    return build("u6l4", `A ventilated patient's circuit develops ${cause}. Which alarm is expected?`, alarm, shuffle(["High pressure", "Low pressure or low minute volume", "Apnea", "FiO2"].filter(a => a !== alarm)),
      `${cause.charAt(0).toUpperCase() + cause.slice(1)} produces a ${alarm.toLowerCase()} alarm. High pressure means gas cannot get in (obstruction); low pressure means gas is escaping (disconnect or leak); apnea means no breath detected.`, "vent");
  }

  // ---------- Same subnet or through the gateway (u9l1) ----------
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
      return build("u9l1", `A monitor at ${ip1} and a central station at ${ip2} both use subnet mask ${mask}. How do they communicate?`, correct,
        [same ? "Different subnets; traffic passes through the default gateway router" : "Same subnet; they communicate directly through the switch", "Same subnet; traffic must pass through the gateway", "Different subnets; they cannot communicate at all"],
        `With mask ${mask}, the ${bits} identify the network. ${ip1} and ${ip2} ${same ? "share" : "differ in"} the network portion, so they are on ${same ? "the same subnet and talk directly through the switch" : "different subnets and must go through the gateway router"}.`, "net");
    }
    const good = `${a}.${b}.${c1}.${(h1 + 90) % 250 + 1}`;
    const bad1 = `${a}.${b}.${(c1 + 3) % 250 + 1}.${h1}`; const bad2 = `${a}.${(b + 5) % 250 + 1}.${c1}.${h1}`; const bad3 = `${a + 1}.${b}.${c1}.${h1}`;
    return build("u9l1", `A device is configured with IP address ${ip1} and mask 255.255.255.0. Which address is on the same subnet?`, good, [bad1, bad2, bad3],
      `A /24 mask (255.255.255.0) means the first three octets, ${a}.${b}.${c1}, are the network. Only ${good} shares them; the others differ in the third, second, or first octet and need a router.`, "net");
  }

  FRA.generators = { u2l1: ohms, u2l3: rc, u3l2: safety, u4l1: ecg, u4l6: units, u5l2: infusion, u6l4: vent, u9l1: subnet };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
