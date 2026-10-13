// BMET Academy labs, units 6 and 7: simulator and monitor, infusion flow check, defibrillator analyzer,
// incoming inspection on the safety analyzer, and a ping walkthrough. Original content.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};

FRA.labs["monitor-pm"] = {
  id: "monitor-pm", lesson: "u6l3", title: "Verify a bedside monitor with a patient simulator", instrument: "monitor",
  intro: `The simulator stands in for the patient. Set it, apply, and read what the monitor shows. A monitor passes when every number it displays is within the manual's tolerance of what the simulator sent.

- Set the simulator to 60 bpm, normal sinus rhythm, SpO2 97%, NIBP 120/80, then press **Apply**.
- Record each monitor value with the Record button (or type it), then compute the heart rate error.
- Finish with the alarm check: switch the rhythm to asystole and apply.`,
  manual: `## Performance verification tolerances
- Heart rate: within plus or minus 2 bpm of the simulator rate
- SpO2: within plus or minus 2% of the simulator setting
- NIBP: within plus or minus 3 mmHg, systolic and diastolic
- Alarms: asystole and ventricular fibrillation must each raise a visible alarm`,
  scenario: { hrErr: 1, spo2Err: -1, sysErr: 2, diaErr: -1, tolerance: { hr: 2, spo2: 2, nibp: 3 } },
  tasks: [
    { id: "hr", kind: "reading", prompt: "Monitor heart rate with the simulator at 60 bpm", unit: "bpm", expect: [60, 62], measure: { param: "hr", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "spo2", kind: "reading", prompt: "Monitor SpO2 with the simulator at 97%", unit: "%", expect: [95, 97], measure: { param: "spo2", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "sys", kind: "reading", prompt: "Monitor systolic with the simulator at 120", unit: "mmHg", expect: [121, 123], measure: { param: "sys", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "dia", kind: "reading", prompt: "Monitor diastolic with the simulator at 80", unit: "mmHg", expect: [78, 80], measure: { param: "dia", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "err", kind: "reading", prompt: "Heart rate error: monitor minus simulator, in bpm", unit: "bpm", expect: [0.5, 1.5] },
    { id: "v", kind: "verdict", prompt: "Against the manual's tolerances, does the monitor pass?", expect: "pass" },
    { id: "asys", kind: "choice", prompt: "Switch the rhythm to asystole and apply. What should the monitor do?", options: ["Show a heart rate of 0 and raise an ASYSTOLE alarm", "Keep showing 60 until the next reading", "Show the SpO2 as the heart rate", "Switch itself off"], expect: 0 }
  ],
  why: {
    hr: "The simulator sends 60 bpm; this monitor reads 61. One beat high is inside the plus or minus 2 bpm tolerance.",
    spo2: "Set 97, shown 96. One percent low is inside plus or minus 2%.",
    sys: "Set 120, shown 122. Two mmHg high is inside plus or minus 3 mmHg.",
    dia: "Set 80, shown 79. One mmHg low is inside plus or minus 3 mmHg.",
    err: "61 minus 60 = 1 bpm. Error is always the device's reading minus the known input.",
    v: "Every parameter is inside its tolerance (1 bpm, 1%, 2 mmHg, 1 mmHg), so the monitor passes performance verification. Record the simulator settings and the monitor readings side by side.",
    asys: "Asystole is a flat line: the monitor must read 0 and alarm. The alarm check is part of every monitor PM because a monitor that measures well but never alarms is dangerous."
  }
};

FRA.labs["infusion-check"] = {
  id: "infusion-check", lesson: "u6l5", title: "Flow rate check with a graduated cylinder", instrument: "infusion",
  intro: `Set the pump, run it into the cylinder for a timed collection, read the volume, and compute what the pump really delivered.

- Set the rate to **120 mL/h** and the VTBI to 100 mL, press **Start**, then fast-forward to **30 minutes** (three presses of +10 min).
- Read the cylinder to the nearest milliliter and record it.
- Delivered rate = volume / 30 minutes x 60. Percent error = (delivered minus set) / set x 100.`,
  manual: `## Flow rate accuracy
- Plus or minus 5% of the set rate, from 1 to 999 mL/h, verified by a timed volumetric collection of at least 30 minutes
- Read the cylinder at eye level, bottom of the meniscus, to the nearest graduation`,
  scenario: { rateErr: 0.03, cylinderMl: 100, graduation: 1, tolerance: 5 },
  tasks: [
    { id: "vol", kind: "reading", prompt: "Volume in the cylinder after 30 minutes at 120 mL/h", unit: "mL", expect: [61, 63], measure: { what: "volume", rate: 120, minutes: 30 } },
    { id: "rate", kind: "reading", prompt: "Delivered rate = volume / 30 x 60", unit: "mL/h", expect: [122, 126], measure: { what: "rate", rate: 120, minutes: 30 } },
    { id: "pct", kind: "reading", prompt: "Percent error against the set 120 mL/h", unit: "%", expect: [1.5, 5.0], measure: { what: "error", rate: 120, minutes: 30 } },
    { id: "v", kind: "verdict", prompt: "Against the manual's plus or minus 5%, does the pump pass?", expect: "pass" },
    { id: "half", kind: "choice", prompt: "Why collect for 30 minutes rather than 5?", options: ["A longer collection averages out the pump's stroke-to-stroke variation and makes a 1 mL reading error small", "The pump needs 30 minutes to warm up", "Shorter collections are not allowed by HIPAA", "The cylinder only reads correctly when nearly full"], expect: 0 }
  ],
  why: {
    vol: "At 120 mL/h for 30 minutes the pump should deliver 60 mL. This pump runs about 3% fast, so the cylinder shows about 62 mL.",
    rate: "62 mL / 30 min x 60 = 124 mL/h. Always convert the collection back to the pump's units before comparing.",
    pct: "(124 minus 120) / 120 x 100 = 3.3%. Positive means the pump over-delivers.",
    v: "3.3% is inside plus or minus 5%, so the flow check passes. Document the set rate, the time, the volume, and the computed error.",
    half: "A 1 mL misreading on a 10 mL collection is 10%; on a 60 mL collection it is under 2%. Longer collections also average the small pulses of a peristaltic mechanism."
  }
};

FRA.labs["defib-check"] = {
  id: "defib-check", lesson: "u6l6", title: "Delivered energy on the defibrillator analyzer", instrument: "defib",
  intro: `Discharge the defibrillator into the analyzer at each energy on the list and record what the analyzer measured. The analyzer presents a 50 ohm load, the standard stand-in for a patient's chest.

- Select an energy, press **Charge**, then **Discharge into the analyzer**. Record the delivered energy for 2, 50, 200, and 360 J.
- The manual's allowance is a percentage or a fixed number of joules, whichever is larger, so low energies get the fixed allowance.
- Never discharge a real defibrillator into the air, onto a bench, or with anyone touching the paddles.`,
  manual: `## Delivered energy accuracy (into a 50 ohm load)
- Plus or minus 15% of the selected energy, or plus or minus 3 J, whichever is greater, at every setting from 2 J to 360 J
- Charge time to 360 J from a full battery: 10 seconds or less`,
  scenario: { energies: [2, 50, 200, 360], deliveredErr: { "2": 0.1, "50": -0.04, "200": 0.03, "360": -0.05 }, tolerance: { pct: 15, floor: 3 } },
  tasks: [
    { id: "e2", kind: "reading", prompt: "Delivered energy at the 2 J setting", unit: "J", expect: [1.9, 2.5], measure: { energy: 2 } },
    { id: "e50", kind: "reading", prompt: "Delivered energy at the 50 J setting", unit: "J", expect: [47, 49], measure: { energy: 50 } },
    { id: "e200", kind: "reading", prompt: "Delivered energy at the 200 J setting", unit: "J", expect: [205, 207], measure: { energy: 200 } },
    { id: "e360", kind: "reading", prompt: "Delivered energy at the 360 J setting", unit: "J", expect: [341, 343], measure: { energy: 360 } },
    { id: "pct360", kind: "reading", prompt: "Percent error at 360 J (keep the sign)", unit: "%", expect: [-5.5, -4.5] },
    { id: "v", kind: "verdict", prompt: "Against the manual, does the defibrillator pass at every setting?", expect: "pass" },
    { id: "floor", kind: "choice", prompt: "At 2 J the analyzer read 2.2 J, which is 10% high. Pass or fail, and why?", options: ["Pass: 0.2 J is inside the 3 J allowance that applies at low energies", "Fail: 10% is close to the 15% limit", "Fail: any error at 2 J is dangerous", "Pass: the analyzer rounds to the nearest joule"], expect: 0 }
  ],
  why: {
    e2: "Set 2 J, delivered about 2.2 J. At this setting the 3 J fixed allowance governs, so anything from 0 to 5 J passes.",
    e50: "Set 50 J, delivered about 48 J. The allowance is the larger of 15% (7.5 J) and 3 J, so 42.5 to 57.5 J passes.",
    e200: "Set 200 J, delivered about 206 J. The allowance is 30 J (15%), so 170 to 230 J passes.",
    e360: "Set 360 J, delivered about 342 J. The allowance is 54 J (15%), so 306 to 414 J passes.",
    pct360: "(342 minus 360) / 360 x 100 = -5.0%. Negative means the delivered energy is low.",
    v: "Every setting is inside its allowance, so the defibrillator passes the energy check. Record each setting and delivered value; a drift over successive PMs predicts a failing capacitor.",
    floor: "Percent limits become meaningless at tiny energies (15% of 2 J is 0.3 J), so the manual gives a fixed floor. 0.2 J off is well inside 3 J."
  }
};

FRA.labs["incoming-inspection"] = {
  id: "incoming-inspection", lesson: "u6l9", title: "Incoming inspection on a new suction unit", instrument: "safety",
  intro: `A new portable suction unit has arrived. Walk the incoming inspection in order: paperwork and visual inspection, the electrical safety test on the analyzer, the function check, and the record.

- The analyzer below is for the safety test step: ground resistance and chassis leakage in every condition. This unit has no conductive patient connection, so there is no lead leakage test.
- The other steps are questions about what comes next and why.`,
  manual: `## Electrical safety limits (NFPA 99, cord-connected patient-care equipment)
- Ground wire resistance: 0.5 ohm maximum
- Chassis (touch) leakage: 500 microamps maximum in every condition
## Function check (from the unit's service manual)
- With the tubing clamped, the vacuum gauge must reach the set level within 5 seconds and hold; maximum vacuum at least 500 mmHg`,
  scenario: { standard: "NFPA 99", ground: 0.09, chassis: { normal: 30, reverse: 44, "normal-open": 120, "reverse-open": 150 }, limits: { ground: 0.5, chassis: 500 } },
  tasks: [
    { id: "first", kind: "choice", prompt: "The box is open. What is the first step?", options: ["Check the packing slip against the purchase order, then inspect the unit, accessories, and manuals for damage and completeness", "Plug it in and run the safety test", "Put it on a cart for the floor", "Enter a PM schedule"], expect: 0 },
    { id: "gnd", kind: "reading", prompt: "Ground wire resistance", unit: "ohm", expect: [0.06, 0.12], measure: { test: "ground", polarity: "normal", ground: "closed" } },
    { id: "chw", kind: "reading", prompt: "Chassis leakage, reversed polarity, ground open", unit: "uA", expect: [148, 152], measure: { test: "chassis", polarity: "reverse", ground: "open" } },
    { id: "fn", kind: "choice", prompt: "Which function check is right for a suction unit?", options: ["Clamp the tubing: the gauge must reach the setting within 5 seconds and hold it", "Run it dry for an hour and listen", "Measure the motor current", "Fill the canister with water and time how fast it empties"], expect: 0 },
    { id: "v", kind: "verdict", prompt: "Does the unit pass incoming inspection?", expect: "pass" },
    { id: "paper", kind: "choice", prompt: "Last step before the unit goes to the floor?", options: ["Asset tag on the unit, CMMS entry with model, serial, location, PM interval, and today's test results, then user training if the model is new to the floor", "Email the vendor", "Put the manual in the box and store it", "Nothing; the safety test is the record"], expect: 0 }
  ],
  why: {
    first: "Incoming inspection starts with paperwork and eyes: is this what was ordered, is anything missing or damaged in shipping. Powering a damaged unit can hide or worsen the problem.",
    gnd: "About 0.09 ohm, well under 0.5 ohm. New cords usually read very low; a high reading on a new unit means shipping damage or a bad plug.",
    chw: "About 150 microamps in the worst case, under the 500 microamp limit. Record every condition, not just the worst.",
    fn: "A suction unit's job is vacuum. Clamp the line so no air enters, set the regulator, and the gauge must reach and hold the setting. Compare the maximum with the manual's specification.",
    v: "Paperwork complete, no damage, every safety reading under its limit, and the function check meets the specification: the unit passes.",
    paper: "The record is what makes the unit findable and schedulable: an asset tag, a CMMS entry with the test results, and a PM interval. Training the users is part of release when the model is new to them."
  }
};

FRA.labs["ping-walkthrough"] = {
  id: "ping-walkthrough", lesson: "u7l3", title: "Read a ping and an ipconfig", instrument: "choices",
  intro: `A central station cannot see a telemetry server. You open a command prompt on the station and run two commands. Read the output and answer.`,
  scenario: { text: "C:\\>ipconfig\n\nEthernet adapter Ethernet:\n   IPv4 Address. . . . . . . . : 10.20.4.57\n   Subnet Mask . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . : 10.20.4.1\n\nC:\\>ping 10.20.4.1\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nPackets: Sent = 4, Received = 4, Lost = 0 (0% loss)\n\nC:\\>ping 10.20.9.20\nReply from 10.20.9.20: bytes=32 time=2ms TTL=126\nRequest timed out.\nReply from 10.20.9.20: bytes=32 time=3ms TTL=126\nReply from 10.20.9.20: bytes=32 time=2ms TTL=126\nPackets: Sent = 4, Received = 3, Lost = 1 (25% loss)" },
  tasks: [
    { id: "ip", kind: "choice", prompt: "What is this station's own IP address?", options: ["10.20.4.57", "10.20.4.1", "255.255.255.0", "10.20.9.20"], expect: 0 },
    { id: "gw", kind: "choice", prompt: "Which device answered the first ping?", options: ["The default gateway, the router at 10.20.4.1", "The telemetry server", "The DNS server", "The station itself"], expect: 0 },
    { id: "subnet", kind: "choice", prompt: "Is the server at 10.20.9.20 on the station's subnet?", options: ["No: with a 255.255.255.0 mask only 10.20.4.x is local, so traffic to it goes through the gateway", "Yes: both start with 10.20", "Yes: both ping", "No: servers are never on a subnet"], expect: 0 },
    { id: "loss", kind: "reading", prompt: "Packet loss to the server, in percent", unit: "%", expect: [25, 25] },
    { id: "next", kind: "choice", prompt: "No loss to the gateway, 25% loss to the server. Best next step?", options: ["Report it to IT with this output: the fault is beyond the gateway, not in this room or this station", "Replace the station's network cable", "Reboot the station", "Change the station's subnet mask"], expect: 0 }
  ],
  why: {
    ip: "ipconfig lists the station's own settings. The IPv4 Address line is the station; Default Gateway is the router it uses to leave the subnet.",
    gw: "You pinged 10.20.4.1, which ipconfig names as the default gateway: the router on this subnet. Four replies with no loss means the station, its cable, and the local switch path are fine.",
    subnet: "A 255.255.255.0 mask makes the first three numbers the network. 10.20.4 and 10.20.9 differ, so the server is on another subnet (likely another VLAN) and every packet to it crosses the gateway.",
    loss: "Sent 4, received 3, lost 1: 1 / 4 = 25%, exactly what the summary line says.",
    next: "Everything local works (0% loss to the gateway). The loss appears only on the path beyond the router, which is IT's network. Hand them the evidence; swapping cables here would change nothing."
  }
};
