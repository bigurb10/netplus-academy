// BMET Academy labs, units 1 and 3: the kit labs on the virtual multimeter. Original content.
// Every number the instrument shows comes from the scenario tables below; the engine adds one
// digit of jitter so repeat readings look real. Point names use letters, digits, and + only.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};
(function () {
  // A small schematic drawer. Coordinates are user units in a 420 x 220 viewBox and the same
  // numbers go into `points`, so the engine's hotspots land on the drawn test points.
  const C = { brown: '#8b4513', black: '#111', red: '#d12', orange: '#f80', yellow: '#fd0', green: '#080', blue: '#03c', violet: '#80c', gray: '#888', white: '#eee', gold: '#c90' };
  const wire = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="2"/>`;
  const text = (x, y, t, size) => `<text x="${x}" y="${y}" font-size="${size || 11}" text-anchor="middle" fill="currentColor">${t}</text>`;
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="3" fill="currentColor"/>`;
  // Horizontal parts are centred on (x, y) and span x-20 to x+20.
  const resistor = (x, y, name, bands) => wire(x - 20, y, x - 14, y) + `<rect x="${x - 14}" y="${y - 7}" width="28" height="14" fill="#fff" stroke="currentColor" stroke-width="2"/>` + bands.map((b, i) => `<rect x="${x - 11 + i * 6}" y="${y - 7}" width="3" height="14" fill="${C[b]}"/>`).join('') + wire(x + 14, y, x + 20, y) + text(x, y - 11, name);
  const fuse = (x, y, name) => wire(x - 20, y, x + 20, y) + `<rect x="${x - 12}" y="${y - 5}" width="24" height="10" rx="5" fill="#fff" stroke="currentColor" stroke-width="2"/>` + text(x, y - 10, name);
  const sw = (x, y, name, closed) => wire(x - 20, y, x - 8, y) + dot(x - 8, y) + dot(x + 8, y) + (closed ? wire(x - 8, y, x + 8, y) : wire(x - 8, y, x + 6, y - 10)) + wire(x + 8, y, x + 20, y) + text(x, y - 14, name);
  const diode = (x, y, name) => wire(x - 20, y, x - 6, y) + `<polygon points="${x - 6},${y - 7} ${x - 6},${y + 7} ${x + 6},${y}" fill="currentColor"/>` + wire(x + 6, y - 7, x + 6, y + 7) + wire(x + 6, y, x + 20, y) + text(x, y - 11, name);
  const led = (x, y, name) => diode(x, y, name) + wire(x - 2, y - 9, x + 4, y - 15) + wire(x + 2, y - 9, x + 8, y - 15);
  const brk = (x, y, name) => wire(x - 20, y, x - 8, y) + dot(x - 8, y) + dot(x + 8, y) + wire(x + 8, y, x + 20, y) + text(x, y - 10, name);
  // A vertical battery centred on (x, y): the long plate is positive and sits on top.
  const battery = (x, y, name) => wire(x, y - 20, x, y - 6) + `<line x1="${x - 12}" y1="${y - 6}" x2="${x + 12}" y2="${y - 6}" stroke="currentColor" stroke-width="3"/><line x1="${x - 6}" y1="${y + 1}" x2="${x + 6}" y2="${y + 1}" stroke="currentColor" stroke-width="2"/><line x1="${x - 12}" y1="${y + 8}" x2="${x + 12}" y2="${y + 8}" stroke="currentColor" stroke-width="3"/><line x1="${x - 6}" y1="${y + 15}" x2="${x + 6}" y2="${y + 15}" stroke="currentColor" stroke-width="2"/>` + wire(x, y + 15, x, y + 20) + text(x - 20, y - 2, '+') + text(x + 26, y + 4, name);
  const svg = parts => `<svg viewBox="0 0 420 220" role="img" aria-label="circuit drawing" style="display:block;width:100%;height:auto">${parts.join('')}</svg>`;
  const KIT = ["9 V battery and clip", "Breadboard and jumper wires", "Resistor assortment"];

  FRA.labs["kit-setup"] = {
    id: "kit-setup", lesson: "u1l3", title: "Your first two measurements", instrument: "dmm",
    intro: `Lay out the kit and find each part on the list. Then take two measurements: the 9 V battery's voltage and one resistor's resistance.

- The **circuit power** switch on the panel stands for "battery connected". Voltage is measured with it on. Resistance is measured on a part that is **not** connected to anything, so switch it off first; a powered circuit gives an invalid ohms reading and can damage a real meter.
- Click the red probe's point first, then the black probe's. Red on the battery's + terminal (P) and black on the - terminal (N) reads positive; swapped probes read negative.
- Using your own kit? Tick the box and type what your meter shows. The task ranges accept real-world readings.`,
    kit: ["Digital multimeter with test leads", "Solderless breadboard and jumper wires", "Resistor assortment (at least 100, 220, 470, 1k, 2.2k, and 10k ohm)", "A few capacitors", "9 V battery and battery clip", "LEDs (red and green)", "A slide switch", "A fuse holder with a 1 A fuse"],
    scenario: { power: true,
      svg: svg([battery(70, 110, '9 V'), dot(70, 88), dot(70, 132), text(70, 160, 'battery'), resistor(260, 110, 'R1 1000 ohm', ['brown', 'black', 'red', 'gold']), dot(240, 110), dot(280, 110), text(260, 160, 'loose resistor, not connected to anything')]),
      points: { P: [70, 88], N: [70, 132], R1a: [240, 110], R1b: [280, 110] },
      vdc: { 'P-N': 9.32 }, ohm: { 'R1a-R1b': 988 } },
    tasks: [
      { id: "batt", kind: "reading", prompt: "Battery voltage: V DC, power on, red on P, black on N", unit: "V", expect: [8.4, 9.7], measure: { fn: "vdc", a: "P", b: "N" } },
      { id: "sign", kind: "choice", prompt: "Swap the probes (red on N, black on P). What does the meter show?", options: ["The same voltage with a minus sign", "Zero", "OL", "Twice the voltage"], expect: 0 },
      { id: "r1", kind: "reading", prompt: "Resistance of R1: Ohms, power OFF, probes on R1a and R1b", unit: "ohm", expect: [900, 1100], measure: { fn: "ohm", a: "R1a", b: "R1b", power: false } },
      { id: "bands", kind: "choice", prompt: "R1 is banded brown, black, red, gold. What does the code say?", options: ["1,000 ohm, 5% tolerance", "100 ohm, 10% tolerance", "10,000 ohm, 5% tolerance", "1,200 ohm, 1% tolerance"], expect: 0 }
    ],
    why: {
      batt: "A fresh 9 V battery reads about 9.3 to 9.6 V and a used one drifts toward 8.4 V; anything in that range is right. A reading of 0 means the circuit power is off; OL means a probe is not on a terminal.",
      sign: "A digital meter reports the red probe's polarity relative to the black one. Red on the negative terminal gives the same number with a minus sign; nothing is damaged.",
      r1: "A 1,000 ohm resistor with a gold band may read anywhere from 950 to 1,050 ohm, and most read within a percent or two. If the panel says INVALID, switch the circuit power off first.",
      bands: "The first two bands are digits (brown 1, black 0) and the third is the multiplier (red is x100): 10 x 100 = 1,000 ohm. Gold is 5% tolerance, silver 10%."
    }
  };

  FRA.labs["dmm-ohms"] = {
    id: "dmm-ohms", lesson: "u3l2", title: "Ohm's law on the bench", instrument: "dmm",
    intro: `One battery, one resistor, one loop. Measure the voltage across R1 and the current through the loop, then compute the resistance and the power without measuring them.

- Voltage: V DC, power on, red on R1a, black on R1b. The meter sits **across** the part.
- Current: A DC, power on, red on Xa, black on Xb. The meter sits **in** the loop at the break point so the current flows through it. On A DC anywhere else it reads OL.
- Then R = V / I and P = V x I. Check R against the color bands.`,
    kit: KIT.concat(["470 ohm resistor (yellow, violet, brown); leave one jumper out to make the break point X"]),
    scenario: { power: true,
      svg: svg([battery(70, 110, '9 V'), dot(70, 88), dot(70, 132), wire(70, 88, 70, 50), wire(70, 50, 170, 50), resistor(190, 50, 'R1 470 ohm', ['yellow', 'violet', 'brown', 'gold']), dot(170, 50), dot(210, 50), wire(210, 50, 290, 50), brk(310, 50, 'break X'), wire(330, 50, 380, 50), wire(380, 50, 380, 170), wire(380, 170, 70, 170), wire(70, 170, 70, 132)]),
      points: { P: [70, 88], N: [70, 132], R1a: [170, 50], R1b: [210, 50], Xa: [302, 50], Xb: [318, 50] },
      vdc: { 'P-N': 9.06, 'R1a-R1b': 9.06 }, adc: { 'Xa-Xb': 0.0193 }, ohm: { 'R1a-R1b': 471 } },
    tasks: [
      { id: "v", kind: "reading", prompt: "Voltage across R1 (V DC, power on)", unit: "V", expect: [8.4, 9.7], measure: { fn: "vdc", a: "R1a", b: "R1b" } },
      { id: "i", kind: "reading", prompt: "Current at the break point (A DC, power on, red on Xa, black on Xb)", unit: "A", expect: [0.017, 0.021], measure: { fn: "adc", a: "Xa", b: "Xb" } },
      { id: "r", kind: "reading", prompt: "Compute R = V / I in ohms (do not measure it)", unit: "ohm", expect: [420, 530] },
      { id: "p", kind: "reading", prompt: "Compute the power in R1, P = V x I, in watts", unit: "W", expect: [0.14, 0.21] },
      { id: "ol", kind: "choice", prompt: "On A DC with the probes across R1 (R1a to R1b) the meter shows OL. Why?", options: ["Current must flow through the meter; across a part there is no path through it", "The battery is dead", "R1 is open", "The meter needs the ohms range"], expect: 0 }
    ],
    why: {
      v: "With one resistor in the loop nearly the whole battery voltage appears across it: about 9.1 V here, anywhere from 8.4 to 9.7 V with a real battery.",
      i: "I = V / R = 9.06 / 470 = 0.0193 A, which is 19.3 mA. The meter reads in amps, so 0.019 is right; 19 would be milliamps.",
      r: "R = 9.06 V / 0.0193 A = 469 ohm, matching the yellow-violet-brown code (47 x 10 = 470) within tolerance. Anything from 420 to 530 counts.",
      p: "P = 9.06 x 0.0193 = 0.175 W, under the resistor's quarter-watt rating. A quarter-watt part asked for more than 0.25 W gets hot and fails.",
      ol: "An ammeter has almost no resistance and must sit in series, at the break, so the loop current passes through it. Across a part it has no complete path and reads OL. Across a battery on the amps range it would short the battery and blow the meter's fuse."
    }
  };

  FRA.labs["series-parallel"] = {
    id: "series-parallel", lesson: "u3l3", title: "Series voltages and parallel currents", instrument: "dmm",
    intro: `Two circuits share the drawing. The top one is **series**: 9 V through R1 (220 ohm) and R2 (470 ohm) in one loop with a break point SX. The bottom one is **parallel**: 9 V across R3 (220 ohm) and R4 (470 ohm) side by side, with a break point in each branch (X3, X4) and one in the feed (XT).

- Series: measure the voltage across each resistor and add them.
- Parallel: measure the current in each branch and in the feed, and add the branches.
- Everything on V DC and A DC is measured with the power on.`,
    kit: KIT.concat(["Two 220 ohm and two 470 ohm resistors; leave jumpers out for the break points"]),
    scenario: { power: true,
      svg: svg([
        battery(50, 60, '9 V'), dot(50, 38), dot(50, 82), wire(50, 38, 50, 20), wire(50, 20, 120, 20), resistor(140, 20, 'R1 220', ['red', 'red', 'brown', 'gold']), dot(120, 20), dot(160, 20), wire(160, 20, 200, 20), resistor(220, 20, 'R2 470', ['yellow', 'violet', 'brown', 'gold']), dot(200, 20), dot(240, 20), wire(240, 20, 300, 20), brk(320, 20, 'SX'), wire(340, 20, 400, 20), wire(400, 20, 400, 100), wire(400, 100, 50, 100), wire(50, 100, 50, 82), text(230, 95, 'series circuit', 10),
        battery(50, 165, '9 V'), dot(50, 143), dot(50, 187), wire(50, 143, 50, 125), wire(50, 125, 70, 125), brk(90, 125, 'XT'), wire(110, 125, 110, 205), wire(110, 205, 50, 205), wire(50, 205, 50, 187),
        wire(110, 140, 140, 140), brk(160, 140, 'X3'), wire(180, 140, 200, 140), resistor(220, 140, 'R3 220', ['red', 'red', 'brown', 'gold']), wire(240, 140, 360, 140),
        wire(110, 190, 140, 190), brk(160, 190, 'X4'), wire(180, 190, 200, 190), resistor(220, 190, 'R4 470', ['yellow', 'violet', 'brown', 'gold']), wire(240, 190, 360, 190), wire(360, 140, 360, 190), text(300, 212, 'parallel circuit', 10)
      ]),
      points: { P1: [50, 38], N1: [50, 82], S1a: [120, 20], S1b: [160, 20], S2a: [200, 20], S2b: [240, 20], SXa: [312, 20], SXb: [328, 20], P2: [50, 143], N2: [50, 187], XTa: [82, 125], XTb: [98, 125], X3a: [152, 140], X3b: [168, 140], X4a: [152, 190], X4b: [168, 190] },
      vdc: { 'P1-N1': 9.0, 'S1a-S1b': 2.87, 'S2a-S2b': 6.13, 'S1a-S2b': 9.0, 'P2-N2': 9.0 },
      adc: { 'SXa-SXb': 0.013, 'X3a-X3b': 0.041, 'X4a-X4b': 0.019, 'XTa-XTb': 0.06 },
      ohm: { 'S1a-S1b': 221, 'S2a-S2b': 468, 'S1a-S2b': 689 } },
    tasks: [
      { id: "v1", kind: "reading", prompt: "Series: voltage across R1 (S1a to S1b)", unit: "V", expect: [2.6, 3.1], measure: { fn: "vdc", a: "S1a", b: "S1b" } },
      { id: "v2", kind: "reading", prompt: "Series: voltage across R2 (S2a to S2b)", unit: "V", expect: [5.9, 6.4], measure: { fn: "vdc", a: "S2a", b: "S2b" } },
      { id: "sum", kind: "choice", prompt: "Add the two series voltages. What do they equal?", options: ["The battery voltage, about 9 V", "Zero", "Half the battery voltage", "Twice the battery voltage"], expect: 0 },
      { id: "i3", kind: "reading", prompt: "Parallel: current in the R3 branch (X3a to X3b)", unit: "A", expect: [0.039, 0.043], measure: { fn: "adc", a: "X3a", b: "X3b" } },
      { id: "i4", kind: "reading", prompt: "Parallel: current in the R4 branch (X4a to X4b)", unit: "A", expect: [0.016, 0.022], measure: { fn: "adc", a: "X4a", b: "X4b" } },
      { id: "it", kind: "reading", prompt: "Parallel: total current in the feed (XTa to XTb)", unit: "A", expect: [0.057, 0.064], measure: { fn: "adc", a: "XTa", b: "XTb" } },
      { id: "kcl", kind: "choice", prompt: "Compare the two branch currents with the feed current.", options: ["The branch currents add up to the feed current", "Each branch carries the full feed current", "The feed current is the smaller branch current", "The branches carry no current until the feed break is closed"], expect: 0 }
    ],
    why: {
      v1: "Series current is 9 V / (220 + 470) ohm = 0.013 A. Across 220 ohm that is 0.013 x 220 = 2.87 V. The smaller resistor takes the smaller share.",
      v2: "The same 0.013 A through 470 ohm drops 0.013 x 470 = 6.13 V. The bigger resistor takes the bigger share.",
      sum: "2.87 + 6.13 = 9.0 V. In a series loop the voltage drops always add up to the source; nothing is lost or gained.",
      i3: "Each parallel branch sees the full 9 V. I = 9 / 220 = 0.041 A (41 mA).",
      i4: "I = 9 / 470 = 0.019 A (19 mA). The bigger resistor passes the smaller current.",
      it: "The feed carries both branches: 0.041 + 0.019 = 0.060 A. The total resistance is 9 / 0.06 = 150 ohm, less than either branch.",
      kcl: "Current splits at a junction and rejoins after it; what goes in equals what comes out. 41 mA + 19 mA = 60 mA in the feed."
    }
  };

  FRA.labs["open-short"] = {
    id: "open-short", lesson: "u3l5", title: "Find the open and the short", instrument: "dmm",
    intro: `A simple loop: battery, fuse F1, switch S1 (closed), R1, and R2. The device is dead. One part is **open** and one is **shorted** (a solder bridge across it).

- An open part has the whole source voltage across it when power is on, and reads OL on ohms when power is off.
- A shorted part reads near 0 ohm and beeps on continuity when power is off, and has no voltage across it when power is on.
- Measure before you decide. Then say what you would do first.`,
    kit: KIT.concat(["Two 1k resistors, the slide switch, the fuse holder with the fuse pulled out to stand in for a blown one, and a short jumper across R2 as the bridge"]),
    scenario: { power: true,
      svg: svg([battery(70, 110, '9 V'), dot(70, 88), dot(70, 132), wire(70, 88, 70, 50), wire(70, 50, 80, 50), fuse(100, 50, 'F1'), dot(80, 50), dot(120, 50), wire(120, 50, 170, 50), sw(190, 50, 'S1 closed', true), wire(210, 50, 250, 50), resistor(270, 50, 'R1 1k', ['brown', 'black', 'red', 'gold']), dot(250, 50), dot(290, 50), wire(290, 50, 380, 50), wire(380, 50, 380, 170), wire(380, 170, 290, 170), resistor(270, 170, 'R2 1k', ['brown', 'black', 'red', 'gold']), dot(290, 170), dot(250, 170), `<line x1="256" y1="180" x2="284" y2="180" stroke="#d12" stroke-width="3"/>`, text(270, 195, 'solder bridge', 10), wire(250, 170, 70, 170), wire(70, 170, 70, 132)]),
      points: { P: [70, 88], N: [70, 132], F1a: [80, 50], F1b: [120, 50], R1a: [250, 50], R1b: [290, 50], R2a: [290, 170], R2b: [250, 170] },
      vdc: { 'P-N': 9.0, 'F1a-F1b': 9.0, 'R1a-R1b': 0, 'R2a-R2b': 0 },
      ohm: { 'R1a-R1b': 998, 'R2a-R2b': 0.3 },
      cont: { 'R2a-R2b': true } },
    tasks: [
      { id: "vf", kind: "reading", prompt: "Voltage across the fuse, F1a to F1b (V DC, power on)", unit: "V", expect: [8.4, 9.7], measure: { fn: "vdc", a: "F1a", b: "F1b" } },
      { id: "vr1", kind: "reading", prompt: "Voltage across R1, R1a to R1b (V DC, power on)", unit: "V", expect: [-0.1, 0.1], measure: { fn: "vdc", a: "R1a", b: "R1b" } },
      { id: "open", kind: "choice", prompt: "Which part is open?", options: ["F1, the fuse", "R1", "R2", "S1, the switch"], expect: 0 },
      { id: "rf", kind: "choice", prompt: "Power off, Ohms across F1a and F1b. What does an open fuse read?", options: ["OL", "0 ohm", "9 V", "1,000 ohm"], expect: 0 },
      { id: "short", kind: "choice", prompt: "Switch to Continuity with the power off and test each part. Which one is shorted?", options: ["R2: the bridge across it beeps and reads near 0 ohm", "R1", "F1", "S1"], expect: 0 },
      { id: "fix", kind: "choice", prompt: "What do you do first?", options: ["Remove the bridge across R2, then replace the fuse with the same rating, then power up", "Replace the fuse and power up to see if it holds", "Replace R1", "Bypass the fuse with a jumper to test the circuit"], expect: 0 }
    ],
    why: {
      vf: "No current flows through an open loop, so no voltage drops across R1 or R2; the entire 9 V appears across the gap, which is the fuse. Full source voltage across a part means that part is open.",
      vr1: "With the fuse open no current flows, and a resistor with no current through it has no voltage across it: 0 V.",
      open: "The fuse has the full source voltage across it and reads OL on ohms. The fuse opened because the shorted R2 let too much current flow.",
      rf: "An open fuse is a gap: infinite resistance, shown as OL. A good fuse reads near 0 ohm.",
      short: "The bridge is a path of almost no resistance around R2, so continuity beeps and ohms read about 0.3 ohm. A good 1k resistor reads about 1,000 ohm and does not beep.",
      fix: "A fuse opens for a reason. Clear the short first, replace the fuse with one of the same rating, then power up. Replacing the fuse first blows the new one; bypassing a fuse removes the protection."
    }
  };

  FRA.labs["continuity-diode"] = {
    id: "continuity-diode", lesson: "u3l9", title: "Continuity, cables, diodes, and wire colors", instrument: "dmm",
    intro: `Nothing here is powered, so the circuit power starts off and stays off. Test two switches, two cables, a diode, and an LED.

- Continuity beeps and reads near 0 ohm on a closed switch or a good cable, and OL on an open switch or a broken wire.
- The diode test pushes a small current and shows the forward voltage drop with the red probe on the anode (the arrow side) and black on the cathode (the bar). Swapped, it reads OL.
- The last task is about building wire colors, which you will see on every power cord and outlet.`,
    kit: KIT.concat(["The slide switch, two jumper wires (ask someone to nick one inside its insulation, or just test both), a diode if you have one, and a red LED"]),
    scenario: { power: false,
      svg: svg([sw(120, 50, 'S1', true), dot(100, 50), dot(140, 50), sw(300, 50, 'S2', false), dot(280, 50), dot(320, 50), wire(100, 110, 320, 110), dot(100, 110), dot(320, 110), text(210, 103, 'cable 1', 10), wire(100, 150, 320, 150), dot(100, 150), dot(320, 150), text(210, 143, 'cable 2', 10), diode(140, 200, 'D1'), dot(120, 200), dot(160, 200), text(120, 216, 'anode', 9), text(160, 216, 'cathode', 9), led(300, 200, 'L1 red LED'), dot(280, 200), dot(320, 200), text(280, 216, 'anode', 9), text(320, 216, 'cathode', 9)]),
      points: { S1a: [100, 50], S1b: [140, 50], S2a: [280, 50], S2b: [320, 50], C1: [100, 110], C2: [320, 110], C3: [100, 150], C4: [320, 150], D1a: [120, 200], D1k: [160, 200], L1a: [280, 200], L1k: [320, 200] },
      cont: { 'S1a-S1b': true, 'C1-C2': true },
      ohm: { 'S1a-S1b': 0.2, 'C1-C2': 0.4 },
      diode: { 'D1a-D1k': 0.66, 'L1a-L1k': 1.92 } },
    tasks: [
      { id: "sw", kind: "choice", prompt: "Continuity across S1a-S1b and across S2a-S2b. Which switch is closed?", options: ["S1: it beeps; S2 reads OL", "S2: it beeps; S1 reads OL", "Both beep", "Neither beeps"], expect: 0 },
      { id: "cable", kind: "choice", prompt: "Continuity end to end on cable 1 (C1-C2) and cable 2 (C3-C4). Which cable is broken inside its jacket?", options: ["Cable 2: C3 to C4 reads OL", "Cable 1: C1 to C2 reads OL", "Both are broken", "Neither; both beep"], expect: 0 },
      { id: "vd", kind: "reading", prompt: "Diode test on D1, red on the anode D1a, black on the cathode D1k", unit: "V", expect: [0.55, 0.75], measure: { fn: "diode", a: "D1a", b: "D1k", power: false } },
      { id: "vled", kind: "reading", prompt: "Diode test on the red LED, red on L1a, black on L1k (it may glow faintly)", unit: "V", expect: [1.7, 2.1], measure: { fn: "diode", a: "L1a", b: "L1k", power: false } },
      { id: "rev", kind: "choice", prompt: "Swap the probes on D1 (red on the cathode). What does the diode test show?", options: ["OL: a good diode blocks in reverse", "The same 0.66 V", "A negative voltage", "0 V"], expect: 0 },
      { id: "colors", kind: "choice", prompt: "On a US power cord or outlet, which conductor is green or bare?", options: ["Ground", "Hot", "Neutral", "A second hot"], expect: 0 }
    ],
    why: {
      sw: "A closed switch is a continuous path: the meter beeps and reads a fraction of an ohm. An open switch is a gap and reads OL.",
      cable: "A cable with a break inside its insulation looks fine and reads OL end to end. Cable 1 beeps; cable 2 does not. Flexing a cable while testing finds intermittent breaks.",
      vd: "A silicon diode conducts forward at about 0.6 to 0.7 V; the meter shows that drop. If you read OL both ways the diode is open; near 0 both ways, it is shorted.",
      vled: "An LED is a diode with a higher forward drop: about 1.8 to 2.0 V for red, up to about 3.3 V for blue and white. That is why an LED needs a series resistor on a 9 V supply.",
      rev: "In reverse a good diode blocks, so the meter's small test current cannot flow and it reads OL. A diode that conducts both ways is shorted.",
      colors: "US building wiring: black (or red) is hot, white is neutral, green or bare copper is ground. IEC cords: brown live, blue neutral, green-yellow ground."
    }
  };
})();
