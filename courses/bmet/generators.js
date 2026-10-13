// BMET Academy dynamic question generators. Each returns a fresh, computed question so Ohm's law, circuit math,
// unit conversions, tolerance and percent error, ECG paper math, leakage pass/fail, infusion rate checks, and
// delivered-energy checks never repeat exactly. Numbers agree with the lessons and the cheat sheet.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  // Distinct wrong answers: drop anything equal to the correct value, dedupe, keep three.
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u3l2 Ohm's law and power ----------
  function ohms() {
    const kind = R(4);
    if (kind === 0) {
      const V = pick([3, 5, 6, 9, 12, 24]); const Rr = pick([10, 20, 47, 100, 220, 470, 1000]); const I = V / Rr;
      return build("u3l2", `A ${V} V battery is connected across a ${Rr} ohm resistor. What current flows?`, `${num(I * 1000, 1)} mA`,
        wrong(`${num(I * 1000, 1)} mA`, [`${num(V * Rr)} mA`, `${num(Rr / V, 1)} mA`, `${num(I * 2000, 1)} mA`, `${num(I * 500, 1)} mA`, `${num(I, 3)} mA`]),
        `I = V / R = ${V} / ${Rr} = ${num(I, 4)} A, which is ${num(I * 1000, 1)} mA. Multiplying instead of dividing, or dividing the other way round, gives the usual wrong answers.`, "ohm");
    }
    if (kind === 1) {
      const I = pick([0.01, 0.02, 0.05, 0.1, 0.25, 0.5]); const Rr = pick([10, 22, 47, 100, 220, 470]); const V = I * Rr;
      return build("u3l2", `${num(I * 1000)} mA flows through a ${Rr} ohm resistor. What voltage is across it?`, `${num(V)} V`,
        wrong(`${num(V)} V`, [`${num(Rr / I)} V`, `${num(V * 1000)} V`, `${num(V * 2)} V`, `${num(V / 2)} V`, `${num(I + Rr)} V`]),
        `V = I x R = ${num(I, 3)} A x ${Rr} ohm = ${num(V)} V. Convert milliamps to amps first: ${num(I * 1000)} mA is ${num(I, 3)} A.`, "ohm");
    }
    if (kind === 2) {
      const V = pick([5, 9, 12, 24, 120]); const I = pick([0.1, 0.25, 0.5, 1, 2]); const P = V * I;
      return build("u3l2", `A device runs on ${V} V and draws ${num(I)} A. How much power does it use?`, `${num(P)} W`,
        wrong(`${num(P)} W`, [`${num(V / I)} W`, `${num(V + I)} W`, `${num(P * 2)} W`, `${num(P / 2)} W`, `${num(P * 10)} W`]),
        `P = V x I = ${V} x ${num(I)} = ${num(P)} W. Power is volts times amps; dividing them gives resistance, not power.`, "ohm");
    }
    const V = pick([6, 9, 12]); const I = pick([0.006, 0.009, 0.012, 0.02, 0.03, 0.05]); const Rr = V / I;
    return build("u3l2", `You measure ${V} V across a resistor and ${num(I * 1000)} mA through it. What is its resistance?`, `${num(Rr, 0)} ohm`,
      wrong(`${num(Rr, 0)} ohm`, [`${num(V * I, 3)} ohm`, `${num(Rr / 1000, 3)} ohm`, `${num(Rr * 2, 0)} ohm`, `${num(Rr / 2, 0)} ohm`, `${num(V / (I * 1000), 3)} ohm`]),
      `R = V / I = ${V} / ${num(I, 3)} = ${num(Rr, 0)} ohm. Forgetting to turn ${num(I * 1000)} mA into ${num(I, 3)} A is the usual slip.`, "ohm");
  }

  // ---------- u3l3 series and parallel ----------
  const PAR = [[100, 100, 50], [220, 220, 110], [100, 300, 75], [200, 300, 120], [470, 470, 235], [1000, 1000, 500], [600, 300, 200], [120, 60, 40]];
  function circuits() {
    const kind = R(4);
    if (kind === 0) {
      const R1 = pick([100, 220, 330, 470]); const R2 = pick([100, 220, 470, 1000].filter(r => r !== R1)); const Rt = R1 + R2;
      return build("u3l3", `A ${R1} ohm resistor and a ${R2} ohm resistor are in series. What is the total resistance?`, `${Rt} ohm`,
        wrong(`${Rt} ohm`, [`${num((R1 * R2) / Rt, 1)} ohm`, `${Math.max(R1, R2)} ohm`, `${num((R1 + R2) / 2, 1)} ohm`, `${R1 * R2} ohm`, `${Math.abs(R1 - R2)} ohm`]),
        `Series resistances add: ${R1} + ${R2} = ${Rt} ohm. The same current flows through both, so each adds its own opposition.`, "cir");
    }
    if (kind === 1) {
      const V = pick([6, 9, 12, 24]); const R1 = pick([100, 220, 470]); const R2 = pick([100, 220, 330, 470, 1000].filter(r => r !== R1)); const V1 = V * R1 / (R1 + R2);
      return build("u3l3", `A ${V} V supply feeds a ${R1} ohm and a ${R2} ohm resistor in series. What voltage is across the ${R1} ohm resistor?`, `${num(V1)} V`,
        wrong(`${num(V1)} V`, [`${num(V - V1)} V`, `${num(V)} V`, `${num(V / 2)} V`, `${num(V1 * 2)} V`, `${num(V1 / 2)} V`]),
        `Series current I = ${V} / ${R1 + R2} = ${num(V / (R1 + R2), 4)} A; across ${R1} ohm that is ${num(V1)} V. The other ${num(V - V1)} V is across the ${R2} ohm resistor, and the two add back to ${V} V.`, "cir");
    }
    if (kind === 2) {
      const [R1, R2, Rp] = pick(PAR);
      return build("u3l3", `Two resistors, ${R1} ohm and ${R2} ohm, are in parallel. What is the total resistance?`, `${Rp} ohm`,
        wrong(`${Rp} ohm`, [`${R1 + R2} ohm`, `${Math.max(R1, R2)} ohm`, `${num((R1 + R2) / 2, 1)} ohm`, `${Rp * 2} ohm`, `${num(Rp / 2, 1)} ohm`]),
        `Parallel total = (R1 x R2) / (R1 + R2) = (${R1} x ${R2}) / (${R1 + R2}) = ${Rp} ohm, always less than the smaller branch because a second path lets more current flow.`, "cir");
    }
    const V = pick([6, 9, 12]); const R1 = pick([100, 200, 300, 600]); const R2 = pick([100, 150, 300, 400].filter(r => r !== R1)); const I1 = V / R1 * 1000; const I2 = V / R2 * 1000; const It = I1 + I2;
    return build("u3l3", `A ${V} V supply feeds ${R1} ohm and ${R2} ohm in parallel. What total current does the supply deliver?`, `${num(It, 1)} mA`,
      wrong(`${num(It, 1)} mA`, [`${num(I1, 1)} mA`, `${num(I2, 1)} mA`, `${num(V / (R1 + R2) * 1000, 1)} mA`, `${num(It / 2, 1)} mA`, `${num(It * 2, 1)} mA`]),
      `Each branch sees the full ${V} V: ${num(I1, 1)} mA through ${R1} ohm and ${num(I2, 1)} mA through ${R2} ohm. Branch currents add: ${num(It, 1)} mA.`, "cir");
  }

  // ---------- u4l1 unit conversions ----------
  function units() {
    const kind = R(5);
    if (kind === 0) { const mL = pick([250, 500, 750, 1000, 1500, 2000, 3000]); return build("u4l1", `A bag holds ${mL} mL. How many liters is that?`, `${num(mL / 1000, 2)} L`, wrong(`${num(mL / 1000, 2)} L`, [`${mL * 1000} L`, `${num(mL / 100, 2)} L`, `${num(mL / 10, 1)} L`, `${mL} L`]), `1 L = 1,000 mL, so ${mL} mL / 1,000 = ${num(mL / 1000, 2)} L. Move the decimal three places to the left.`, "unit"); }
    if (kind === 1) { const mA = pick([0.1, 0.3, 0.5, 2, 5, 10, 25]); return build("u4l1", `A leakage reading is ${num(mA, 1)} mA. Express it in microamps.`, `${num(mA * 1000, 0)} microamps`, wrong(`${num(mA * 1000, 0)} microamps`, [`${num(mA / 1000, 4)} microamps`, `${num(mA * 100, 0)} microamps`, `${num(mA * 10, 0)} microamps`, `${num(mA, 1)} microamps`]), `1 mA = 1,000 microamps, so ${num(mA, 1)} mA = ${num(mA * 1000, 0)} microamps. Milli is a thousandth; micro is a millionth.`, "unit"); }
    if (kind === 2) { const c = pick([0, 4, 20, 25, 36, 37, 38, 40, 100]); const f = c * 9 / 5 + 32; return build("u4l1", `A probe reads ${c} C. What is that in Fahrenheit?`, `${num(f, 1)} F`, wrong(`${num(f, 1)} F`, [`${num(c * 9 / 5, 1)} F`, `${num(c + 32, 1)} F`, `${num((c - 32) * 5 / 9, 1)} F`, `${num(c * 2 + 30, 1)} F`]), `F = C x 9/5 + 32 = ${c} x 1.8 + 32 = ${num(f, 1)} F. Body temperature, 37 C, is 98.6 F.`, "unit"); }
    if (kind === 3) { const f = pick([32, 50, 68, 77, 95, 98.6, 100.4, 104, 212]); const c = (f - 32) * 5 / 9; return build("u4l1", `A thermostat shows ${f} F. What is that in Celsius?`, `${num(c, 1)} C`, wrong(`${num(c, 1)} C`, [`${num(f * 5 / 9, 1)} C`, `${num(f - 32, 1)} C`, `${num(f * 9 / 5 + 32, 1)} C`, `${num((f - 30) / 2, 1)} C`]), `C = (F minus 32) x 5/9 = (${f} minus 32) x 0.556 = ${num(c, 1)} C. Subtract 32 first, then scale.`, "unit"); }
    const cm = pick([5, 10, 15, 20, 27, 34]); const mmHg = cm / 1.36; return build("u4l1", `A ventilator pressure of ${cm} cmH2O is about how many mmHg?`, `${num(mmHg, 1)} mmHg`, wrong(`${num(mmHg, 1)} mmHg`, [`${num(cm * 1.36, 1)} mmHg`, `${num(cm, 1)} mmHg`, `${num(cm * 10, 1)} mmHg`, `${num(cm / 10, 2)} mmHg`]), `1 mmHg = 1.36 cmH2O, so divide: ${cm} / 1.36 = ${num(mmHg, 1)} mmHg. Mercury is 13.6 times denser than water.`, "unit");
  }

  // ---------- u4l2 tolerance and percent error ----------
  function tolerance() {
    const kind = R(3);
    if (kind === 0) {
      const exp = pick([40, 50, 60, 80, 100, 120, 200]); const err = pick([-8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8]); const meas = num(exp * (1 + err / 100), 1); const pe = (Number(meas) - exp) / exp * 100;
      return build("u4l2", `A pump set to deliver ${exp} mL delivered ${meas} mL. What is the percent error?`, `${num(pe, 1)}%`,
        wrong(`${num(pe, 1)}%`, [`${num(-pe, 1)}%`, `${num(Number(meas) - exp, 1)}%`, `${num(pe * 10, 1)}%`, `${num(pe / 10, 2)}%`, `${num(Math.abs(pe) + 1, 1)}%`]),
        `Percent error = (measured minus expected) / expected x 100 = (${meas} minus ${exp}) / ${exp} x 100 = ${num(pe, 1)}%. Keep the sign: negative means the pump under-delivered.`, "tol");
    }
    if (kind === 1) {
      const exp = pick([50, 100, 120, 150, 200]); const tol = pick([2, 5, 10]); const err = pick([-12, -9, -7, -6, -4, -3, -1, 1, 3, 4, 6, 7, 9, 12]); const meas = num(exp * (1 + err / 100), 1); const ok = Math.abs(err) <= tol;
      const yes = `Pass: the error is ${num(Math.abs(err), 1)}%, inside plus or minus ${tol}%`; const no = `Fail: the error is ${num(Math.abs(err), 1)}%, outside plus or minus ${tol}%`;
      return build("u4l2", `The manual allows plus or minus ${tol}%. Expected ${exp}, measured ${meas}. Pass or fail?`, ok ? yes : no,
        [ok ? no : yes, `Pass: any reading within ${tol} units passes`, `Fail: the reading is not exactly ${exp}`],
        `Error = (${meas} minus ${exp}) / ${exp} x 100 = ${num(err, 1)}%. The limit is plus or minus ${tol}%, so this ${ok ? 'passes' : 'fails'}. Tolerance is a percentage of the expected value, not a fixed number of units.`, "tol");
    }
    const nominal = pick([100, 220, 470, 1000, 2200, 4700]); const tol = pick([5, 10]); const lo = nominal * (1 - tol / 100); const hi = nominal * (1 + tol / 100);
    return build("u4l2", `A ${nominal} ohm resistor has a ${tol}% tolerance band. What range of resistance is acceptable?`, `${num(lo, 0)} to ${num(hi, 0)} ohm`,
      [`${num(nominal - tol, 0)} to ${num(nominal + tol, 0)} ohm`, `${num(nominal * (1 - tol / 10), 0)} to ${num(nominal * (1 + tol / 10), 0)} ohm`, `${num(lo, 0)} to ${nominal} ohm`, `${nominal} to ${num(hi, 0)} ohm`],
      `${tol}% of ${nominal} is ${num(nominal * tol / 100, 0)} ohm, so the resistor may read anywhere from ${num(lo, 0)} to ${num(hi, 0)} ohm and still be within its specification.`, "tol");
  }

  // ---------- u4l3 ECG paper math ----------
  function strip() {
    const kind = R(3);
    if (kind === 0) { const big = pick([2, 3, 4, 5, 6]); const hr = 300 / big; return build("u4l3", `On ECG paper at 25 mm/s, consecutive R waves are ${big} large boxes apart. What is the heart rate?`, `${num(hr, 0)} bpm`, wrong(`${num(hr, 0)} bpm`, [`${num(1500 / big, 0)} bpm`, `${num(60 / big, 0)} bpm`, `${num(big * 10, 0)} bpm`, `${num(hr * 2, 0)} bpm`, `${num(hr / 2, 0)} bpm`]), `One large box is 0.2 s, so rate = 300 / large boxes = 300 / ${big} = ${num(hr, 0)} bpm.`, "ecg"); }
    if (kind === 1) { const small = pick([10, 12, 15, 20, 25, 30]); const hr = 1500 / small; return build("u4l3", `At 25 mm/s the R-to-R interval measures ${small} small boxes. What is the rate?`, `${num(hr, 0)} bpm`, wrong(`${num(hr, 0)} bpm`, [`${num(300 / small, 0)} bpm`, `${num(small * 10, 0)} bpm`, `${num(hr * 2, 0)} bpm`, `${num(hr / 2, 0)} bpm`, `${num(small * 4, 0)} bpm`]), `One small box is 0.04 s, so rate = 1,500 / small boxes = 1,500 / ${small} = ${num(hr, 0)} bpm.`, "ecg"); }
    const beats = pick([4, 5, 6, 7, 8, 9, 10, 12]); return build("u4l3", `A six-second strip shows ${beats} QRS complexes. What is the approximate heart rate?`, `${beats * 10} bpm`, wrong(`${beats * 10} bpm`, [`${beats * 6} bpm`, `${beats} bpm`, `${beats * 60} bpm`, `${beats * 5} bpm`]), `A six-second strip times ten gives beats per minute: ${beats} x 10 = ${beats * 10} bpm. The method works for irregular rhythms too.`, "ecg");
  }

  // ---------- u5l2 leakage and shock thresholds ----------
  function leakage() {
    const kind = R(3);
    if (kind === 0) {
      const limit = pick([100, 300, 500]); const v = pick([20, 45, 80, 120, 260, 340, 480, 520, 610, 750]); const ok = v <= limit;
      const yes = `Pass: ${v} is at or below the ${limit} microamp limit`; const no = `Fail: ${v} exceeds the ${limit} microamp limit`;
      return build("u5l2", `Your facility's chassis leakage limit is ${limit} microamps. A device reads ${v} microamps with the ground open and polarity reversed. Pass or fail?`, ok ? yes : no,
        [ok ? no : yes, `Pass: open-ground readings never count`, `Fail: any leakage over 10 microamps fails`],
        `Compare the worst-case reading with the limit the facility cites: ${v} against ${limit} microamps. ${ok ? 'It passes.' : 'It fails, and the device is tagged out of service.'} Open ground with reversed polarity is a fault condition the test deliberately creates.`, "leak");
    }
    if (kind === 1) {
      const r = pick([0.05, 0.12, 0.2, 0.35, 0.48, 0.5, 0.55, 0.7, 1.2]); const ok = r <= 0.5;
      const yes = `Pass: ${num(r, 2)} ohm is at or below 0.5 ohm`; const no = `Fail: ${num(r, 2)} ohm is above 0.5 ohm`;
      return build("u5l2", `The ground wire resistance from the chassis to the plug's ground pin measures ${num(r, 2)} ohm. Against the 0.5 ohm NFPA 99 limit, what is the result?`, ok ? yes : no,
        [ok ? no : yes, `Pass: ground resistance has no limit`, `Fail: only 0 ohm passes`],
        `Patient-care equipment must keep the ground path at 0.5 ohm or less so fault and leakage current flow to ground instead of through a person. ${num(r, 2)} ohm ${ok ? 'passes' : 'fails; look for a damaged cord, plug, or strain relief'}.`, "leak");
    }
    const table = { '0.5': 'below the threshold of perception', '1': 'the threshold of perception, a tingle', '5': 'the accepted maximum harmless current', '15': 'the let-go range, where muscles lock and the person cannot release', '50': 'pain, possible fainting, and respiratory arrest', '100': 'likely ventricular fibrillation' };
    const key = pick(Object.keys(table));
    return build("u5l2", `About ${key} mA of 60 Hz current flows hand to hand through a person. What effect is expected?`, table[key],
      shuffle(Object.keys(table).filter(k => k !== key).map(k => table[k])).slice(0, 3),
      `At 60 Hz: 1 mA is perception, 5 mA the accepted harmless maximum, 10 to 20 mA the let-go threshold, 50 mA pain and respiratory arrest, 100 to 300 mA ventricular fibrillation. ${key} mA is ${table[key]}.`, "leak");
  }

  // ---------- u6l5 infusion flow checks ----------
  function infusion() {
    const kind = R(3);
    if (kind === 0) {
      const rate = pick([50, 75, 100, 120, 125, 150, 200]); const min = pick([15, 20, 30, 60]); const err = pick([-7, -5, -4, -3, -2, 2, 3, 4, 5, 7]); const vol = num(rate * min / 60 * (1 + err / 100), 1); const got = Number(vol) / min * 60;
      return build("u6l5", `A pump set to ${rate} mL/h ran for ${min} minutes into a graduated cylinder, which shows ${vol} mL. What rate did the pump actually deliver?`, `${num(got, 1)} mL/h`,
        wrong(`${num(got, 1)} mL/h`, [`${num(Number(vol) / min, 2)} mL/h`, `${num(Number(vol) * min / 60, 1)} mL/h`, `${num(rate, 1)} mL/h`, `${num(got * 2, 1)} mL/h`, `${num(Number(vol), 1)} mL/h`]),
        `Rate = volume / time. ${vol} mL in ${min} min is ${num(Number(vol) / min, 3)} mL/min, times 60 is ${num(got, 1)} mL/h.`, "inf");
    }
    if (kind === 1) {
      const rate = pick([50, 100, 120, 150, 200]); const err = pick([-8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 8]); const vol = num(rate * 30 / 60 * (1 + err / 100), 1); const got = Number(vol) / 30 * 60; const pe = (got - rate) / rate * 100; const ok = Math.abs(pe) <= 5;
      return build("u6l5", `Set rate ${rate} mL/h, 30-minute collection, ${vol} mL in the cylinder. The manual allows plus or minus 5%. Result?`, `${ok ? 'Pass' : 'Fail'}: ${num(pe, 1)}% error`,
        [`${ok ? 'Fail' : 'Pass'}: ${num(pe, 1)}% error`, `${ok ? 'Fail' : 'Pass'}: ${num(-pe, 1)}% error`, `Pass: the pump ran for the full 30 minutes`],
        `Delivered rate = ${vol} / 30 x 60 = ${num(got, 1)} mL/h. Error = (${num(got, 1)} minus ${rate}) / ${rate} x 100 = ${num(pe, 1)}%. The limit is plus or minus 5%, so it ${ok ? 'passes' : 'fails'}.`, "inf");
    }
    const rate = pick([25, 50, 75, 100, 125, 150, 250]); const vol = pick([250, 500, 1000]); const h = vol / rate;
    return build("u6l5", `A ${vol} mL bag is infusing at ${rate} mL/h. How long will it take to empty?`, `${num(h, 2)} hours`,
      wrong(`${num(h, 2)} hours`, [`${num(vol * rate / 1000, 2)} hours`, `${num(rate / vol, 3)} hours`, `${num(h * 60, 0)} hours`, `${num(h / 2, 2)} hours`, `${num(h * 2, 2)} hours`]),
      `Time = volume / rate = ${vol} / ${rate} = ${num(h, 2)} hours (${num(h * 60, 0)} minutes).`, "inf");
  }

  // ---------- u6l6 delivered energy ----------
  function defib() {
    const kind = R(2);
    const set = pick([2, 5, 10, 20, 50, 100, 150, 200, 300, 360]); const err = pick([-20, -16, -12, -10, -8, -5, -3, 3, 5, 8, 10, 12, 16, 20]);
    const got = num(set * (1 + err / 100), 1); const diff = Number(got) - set; const allowed = Math.max(3, set * 0.15); const ok = Math.abs(diff) <= allowed + 1e-9;
    if (kind === 0) return build("u6l6", `A defibrillator set to ${set} J delivered ${got} J into the analyzer. What is the percent error?`, `${num(diff / set * 100, 1)}%`,
      wrong(`${num(diff / set * 100, 1)}%`, [`${num(-diff / set * 100, 1)}%`, `${num(diff, 1)}%`, `${num(diff / set * 10, 2)}%`, `${num(Math.abs(diff) / set * 100 + 2, 1)}%`]),
      `Error = (delivered minus set) / set x 100 = (${got} minus ${set}) / ${set} x 100 = ${num(diff / set * 100, 1)}%.`, "def");
    return build("u6l6", `The manual allows plus or minus 15% or 3 J, whichever is larger. Set ${set} J, delivered ${got} J. Result?`, `${ok ? 'Pass' : 'Fail'}: ${num(Math.abs(diff), 1)} J off against an allowance of ${num(allowed, 1)} J`,
      [`${ok ? 'Fail' : 'Pass'}: ${num(Math.abs(diff), 1)} J off against an allowance of ${num(allowed, 1)} J`, `${ok ? 'Fail' : 'Pass'}: ${num(Math.abs(err), 1)}% is ${ok ? 'too much' : 'acceptable'}`, `Pass: the analyzer reading is close enough at any energy`],
      `At ${set} J the allowance is the larger of 15% (${num(set * 0.15, 1)} J) and 3 J, so ${num(allowed, 1)} J. The delivered energy is ${num(Math.abs(diff), 1)} J off, which ${ok ? 'passes' : 'fails'}.`, "def");
  }

  FRA.generators = { u3l2: ohms, u3l3: circuits, u4l1: units, u4l2: tolerance, u4l3: strip, u5l2: leakage, u6l5: infusion, u6l6: defib };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
