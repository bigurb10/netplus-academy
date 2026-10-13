// BMET Academy labs, units 4 and 5: reading figures, and the electrical safety analyzer. Original content.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};

FRA.labs["reading-scales"] = {
  id: "reading-scales", lesson: "u4l2", title: "Read the meter, the cylinder, and the strip", instrument: "figures",
  intro: `Three figures, no controls. Read each one the way you would on the bench, then do the arithmetic.

- Figure 1 is an analog voltmeter on its 0 to 10 V range. The face prints 0, 5, and 10 and the small ticks are 1 V apart; read where the needle points and estimate the tenths between ticks.
- Figure 2 is a 100 mL graduated cylinder marked every 10 mL. Read the bottom of the liquid level and estimate to the nearest milliliter between marks.
- Figure 3 is six seconds of ECG at 25 mm/s. Count the QRS complexes and multiply by ten.`,
  manual: `## Flow check acceptance
Expected volume in the 30-minute collection: 40 mL. Acceptable: within plus or minus 5% of expected.`,
  scenario: { figures: [
    { kind: "meter", min: 0, max: 10, value: 6.4, unit: "V", caption: "Figure 1. Analog voltmeter, 0 to 10 V range." },
    { kind: "cylinder", ml: 100, value: 37, caption: "Figure 2. 100 mL graduated cylinder after a 30-minute collection." },
    { kind: "strip", rate: 100, value: 100, seconds: 6, caption: "Figure 3. Six seconds of ECG at 25 mm/s." }
  ] },
  tasks: [
    { id: "meter", kind: "reading", prompt: "Figure 1: the voltmeter reads", unit: "V", expect: [6.2, 6.6], measure: { figure: 0 } },
    { id: "cyl", kind: "reading", prompt: "Figure 2: the cylinder holds", unit: "mL", expect: [36, 38], measure: { figure: 1 } },
    { id: "rate", kind: "reading", prompt: "Figure 3: heart rate from the six-second strip", unit: "bpm", expect: [95, 105], measure: { figure: 2 } },
    { id: "pct", kind: "reading", prompt: "Percent error of the collected volume against the expected 40 mL (keep the sign)", unit: "%", expect: [-7.6, -7.4] },
    { id: "v", kind: "verdict", prompt: "Against the manual's plus or minus 5%, does the flow check pass?", expect: "fail" }
  ],
  why: {
    meter: "The needle sits just past the 6 V tick, about four tenths of the way to 7: 6.4 V. Read straight on to avoid parallax.",
    cyl: "The liquid level sits a little under the 40 mark, about three tenths of a division below it: 37 mL.",
    rate: "Ten complexes in six seconds; 10 x 10 = 100 bpm. Six-second strip times ten gives beats per minute.",
    pct: "(37 - 40) / 40 x 100 = -7.5%. The minus sign says the pump delivered less than expected.",
    v: "Plus or minus 5% of 40 mL is 38 to 42 mL. 37 mL is outside that band, so the check fails and the pump needs service."
  }
};

FRA.labs["safety-pass"] = {
  id: "safety-pass", lesson: "u5l2", title: "Safety test on a good infusion pump", instrument: "safety",
  intro: `A large-volume infusion pump, Class I (three-prong cord), no conductive patient connection, back from a repair. Run the electrical safety test and decide whether it goes back to the floor.

- Select the test, the mains polarity, and the ground conductor condition, then press **Test**.
- Ground wire resistance is measured once. Chassis leakage is measured in every condition: normal, reversed polarity, open ground, and reversed polarity with open ground.
- Compare every reading with the limits card. The device passes only if every reading is under its limit.`,
  manual: `## Electrical safety limits (NFPA 99, cord-connected patient-care equipment)
- Ground wire resistance, chassis to plug ground pin: 0.5 ohm maximum
- Chassis (touch) leakage: 500 microamps maximum in every test condition
- Sequence: visual inspection and cord check, ground resistance, chassis leakage in each condition, document`,
  scenario: { standard: "NFPA 99", ground: 0.11, chassis: { normal: 42, reverse: 58, "normal-open": 170, "reverse-open": 205 }, limits: { ground: 0.5, chassis: 500 } },
  tasks: [
    { id: "gnd", kind: "reading", prompt: "Ground wire resistance", unit: "ohm", expect: [0.08, 0.14], measure: { test: "ground", polarity: "normal", ground: "closed" } },
    { id: "chn", kind: "reading", prompt: "Chassis leakage, normal polarity, ground intact", unit: "uA", expect: [40, 44], measure: { test: "chassis", polarity: "normal", ground: "closed" } },
    { id: "chw", kind: "reading", prompt: "Chassis leakage, reversed polarity, ground open", unit: "uA", expect: [203, 207], measure: { test: "chassis", polarity: "reverse", ground: "open" } },
    { id: "worst", kind: "choice", prompt: "Which condition gave the highest leakage?", options: ["Reversed polarity with the ground open", "Normal polarity with the ground intact", "Normal polarity with the ground open", "Reversed polarity with the ground intact"], expect: 0 },
    { id: "v", kind: "verdict", prompt: "Does the pump pass?", expect: "pass" },
    { id: "src", kind: "choice", prompt: "Where does the 500 microamp chassis limit on the card come from?", options: ["NFPA 99, for cord-connected patient-care equipment", "The pump's user manual", "OSHA", "The battery manufacturer"], expect: 0 }
  ],
  why: {
    gnd: "The ground path reads about 0.11 ohm, well under the 0.5 ohm NFPA 99 limit. A reading near or over 0.5 ohm points to a worn cord, plug, or strain relief.",
    chn: "About 42 microamps in the normal condition: the leakage that flows all the time, carried away by the ground wire.",
    chw: "With the ground lifted and the polarity reversed the chassis leakage rises to about 205 microamps. That is the worst case, and it is still under 500.",
    worst: "Opening the ground removes the path that carries leakage away, and reversing polarity puts the hot conductor where the filters leak most. Together they give the highest reading.",
    v: "Every reading is under its limit: 0.11 ohm against 0.5, and the worst chassis leakage 205 microamps against 500. Pass, document it, return it to service.",
    src: "NFPA 99 sets the facility limits a hospital tests to: 0.5 ohm ground resistance and 500 microamps chassis leakage for cord-connected patient-care equipment in current editions (older editions used 300 or 100)."
  }
};

FRA.labs["safety-fail"] = {
  id: "safety-fail", lesson: "u5l3", title: "Find the failing reading and name its limit", instrument: "safety",
  intro: `A vital-signs monitor, Class I, with a type BF applied part (the SpO2 sensor). Run the full test: ground resistance, chassis leakage in every condition, and patient lead leakage in every condition. One reading fails. Find it, say which limit it broke, and decide what happens to the monitor.`,
  manual: `## Electrical safety limits (NFPA 99 and IEC 60601-1)
- Ground wire resistance: 0.5 ohm maximum (NFPA 99)
- Chassis (touch) leakage: 500 microamps maximum in every condition (NFPA 99)
- Patient applied-part leakage, type BF: 100 microamps maximum in every condition this facility tests (IEC 60601-1 allows 500 under a single fault); type CF applied parts allow only 10 microamps
- A device that fails any reading is tagged out of service until repaired and retested`,
  scenario: { standard: "NFPA 99 / IEC 60601-1", ground: 0.14, chassis: { normal: 95, reverse: 140, "normal-open": 480, "reverse-open": 640 }, lead: { normal: 12, reverse: 15, "normal-open": 48, "reverse-open": 61 }, limits: { ground: 0.5, chassis: 500, lead: 100 } },
  tasks: [
    { id: "gnd", kind: "reading", prompt: "Ground wire resistance", unit: "ohm", expect: [0.11, 0.17], measure: { test: "ground", polarity: "normal", ground: "closed" } },
    { id: "chw", kind: "reading", prompt: "Chassis leakage, reversed polarity, ground open", unit: "uA", expect: [638, 642], measure: { test: "chassis", polarity: "reverse", ground: "open" } },
    { id: "ldw", kind: "reading", prompt: "Patient lead leakage, reversed polarity, ground open", unit: "uA", expect: [59, 63], measure: { test: "lead", polarity: "reverse", ground: "open" } },
    { id: "which", kind: "choice", prompt: "Which reading fails?", options: ["Chassis leakage with reversed polarity and open ground: 640 against a 500 microamp limit", "Ground resistance", "Patient lead leakage", "None of them"], expect: 0 },
    { id: "v", kind: "verdict", prompt: "Does the monitor pass?", expect: "fail" },
    { id: "next", kind: "choice", prompt: "What happens now?", options: ["Tag it out of service, document the readings, send it for repair, retest before it returns", "Return it: the normal-condition readings all pass", "Retest until a reading under 500 appears", "Replace the SpO2 sensor and return it"], expect: 0 },
    { id: "cf", kind: "choice", prompt: "If the applied part were type CF (direct cardiac), which lead leakage limit would apply?", options: ["10 microamps", "100 microamps", "500 microamps", "5 mA"], expect: 0 }
  ],
  why: {
    gnd: "About 0.14 ohm, under the 0.5 ohm limit. The ground path is fine; the problem is elsewhere.",
    chw: "About 640 microamps in the worst case. That is above the 500 microamp NFPA 99 chassis limit. The other chassis conditions pass, which is why the test runs every condition.",
    ldw: "About 61 microamps from the applied part in the worst case, under the 100 microamp limit for a type BF part.",
    which: "Only the chassis leakage under reversed polarity with an open ground exceeds its limit. A single failing condition fails the device.",
    v: "One reading over its limit is a fail. The patient would only be at risk in that fault condition, but the test exists to catch exactly that.",
    next: "A failing device never goes back to a patient. Tag it, write down every reading, repair (often a filter capacitor or cord), and retest to prove the fix.",
    cf: "A type CF applied part can connect to the heart, where 10 microamps can cause fibrillation, so IEC 60601-1 allows only 10 microamps in the normal condition (50 under a single fault)."
  }
};
