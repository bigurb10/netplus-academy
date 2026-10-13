window.FRA = window.FRA || {};
FRA.guides = FRA.guides || [];
FRA.guides.push({
  slug: "virtual-electrical-safety-analyzer-lab", title: "How the Virtual Electrical Safety Analyzer Lab Works", description: "What an electrical safety analyzer measures, the limits it judges against, and how the browser lab runs a full safety test with no equipment.", updated: "2026-10-13",
  related: { courses: ["bmet", "cbet"], lessons: ["bmet:u5l1", "bmet:u5l2", "bmet:u5l3", "bmet:u6l9"] },
  faq: [
    { q: "Do I need a real analyzer to do these labs?", a: "No. The analyzer is drawn in the browser and the readings come from the scenario, so the lab runs on a phone with no equipment at all. If you do have a real analyzer at work, the same task sheet works with your own readings typed in." },
    { q: "Why test with the ground open if that never happens on a good outlet?", a: "Because the test is asking what happens when something breaks. A cord gets yanked, a ground pin snaps off, a receptacle loses its ground screw. Leakage that the ground wire normally carries away then has nowhere to go but through whoever touches the case, so the limits are written for that fault condition, not for the good day." },
    { q: "What is the difference between NFPA 99 and IEC 60601-1 limits?", a: "NFPA 99 is the facility standard a hospital tests to: 0.5 ohm of ground wire resistance and 500 microamps of chassis leakage for cord-connected patient-care equipment. IEC 60601-1 is the design standard the manufacturer builds to, and it splits every limit into a normal condition and a single fault condition. They overlap, and where they differ you test to the tighter number your department wrote into its procedure." },
    { q: "How often is a device safety-tested?", a: "At incoming inspection before it ever reaches a patient, at every scheduled maintenance interval, after any repair that touched the cord, the ground path, or the power supply, and any time a user reports a shock or a tingle. The interval itself comes from the department's equipment management plan rather than from one universal number, and higher-risk devices come round more often." }
  ],
  body: `An electrical safety analyzer decides whether a piece of patient-care equipment goes back to the floor, and it is the most-used instrument in a biomed shop. BMET Academy builds one into the browser: set up the test, press a button, read the meter, judge the reading against the limits.

## What the analyzer measures

Three measurements, and every safety test combines them.

- **Ground wire resistance.** The resistance from the chassis to the ground pin on the plug. It is the only thing between a fault inside the device and the person touching it, so it must be intact and tight at both ends.
- **Chassis leakage**, also called touch or enclosure leakage. The current that escapes from the power supply and its filters onto the metal case. Leakage is normal; too much of it is not.
- **Patient lead leakage**, the leakage out of an applied part: an ECG lead, a temperature probe, an SpO2 sensor. Anything touching the patient is held tighter than the case, because the patient cannot let go.

Each leakage measurement repeats in every condition the analyzer can create: normal, reversed mains polarity, open ground, and, on a bench analyzer, open neutral. **Reversed polarity with the ground open is the worst case**, and it is the condition that fails devices. Opening the ground removes the path that quietly carries leakage away; reversing polarity puts the hot conductor where the filters leak most. Together they produce the highest reading a device can give, so passing in the normal condition proves little.

## The limits

\`\`\`
Limit                                       Value            Standard
Ground resistance, chassis to ground pin    0.5 ohm max      NFPA 99
Chassis (touch) leakage                     500 microamps    NFPA 99 current editions;
                                                             older used 300 or 100
GFCI trip, wet locations                    4 to 6 mA        NFPA 99
\`\`\`

\`\`\`
IEC 60601-1 limit                 Normal condition   Single fault
Earth (ground) leakage            5 mA               10 mA
Touch (enclosure) current         100 microamps      500 microamps
Patient leakage, type B and BF    100 microamps      500 microamps
Patient leakage, type CF          10 microamps       50 microamps
\`\`\`

Those limits come from what current does to a body at 60 Hz.

\`\`\`
Current through the body    Effect
10 microamps                Microshock: straight to the heart, fibrillation
1 mA                        Threshold of perception
5 mA                        Accepted maximum harmless current
10 to 20 mA                 Let-go threshold: the muscles clamp and cannot release
50 mA                       Pain, possible fainting, respiratory arrest
100 to 300 mA               Ventricular fibrillation likely
\`\`\`

Current reaching the heart skips the skin, most of the body's resistance, so applied parts are held to microamps.

## How the lab works

1. Pick the test: ground resistance, chassis leakage, or patient lead leakage.
2. Set the mains polarity to normal or reverse and the ground conductor to intact or open.
3. Press **Test** and read the analyzer.
4. Press **Record the reading** to copy the display into the task sheet, then press **Check**.

The limits card is printed under the panel, and the engine computes the verdict from it. Nothing is hard-coded: change a scenario's limits and the right answer changes with them. Readings are deterministic per lab with about one digit of realistic jitter. A wrong answer says why and lets you retry, and when every task is right the card becomes a green summary. Redo any lab any time.

Three labs use the analyzer. A **passing infusion pump**: 0.11 ohm of ground resistance and a worst case near 205 microamps, inside 0.5 ohm and 500. A **failing vital-signs monitor**: normal-condition readings all fine, then about 640 microamps of chassis leakage with the ground open and polarity reversed, against 500. And an **incoming inspection** on a new suction unit, where the safety test is one step inside paperwork, inspection, function check, and record.

## What a record looks like

\`\`\`
Infusion pump                       Limit      Reading     Result
Ground wire resistance              0.5 ohm    0.11 ohm    pass
Chassis leakage, normal             500 uA     42 uA       pass
Chassis leakage, reverse + open     500 uA     205 uA      pass
Verdict: PASS. Documented, back in service.
\`\`\`

\`\`\`
Vital-signs monitor, type BF        Limit      Reading     Result
Ground wire resistance              0.5 ohm    0.14 ohm    pass
Chassis leakage, open ground        500 uA     480 uA      pass
Chassis leakage, reverse + open     500 uA     640 uA      FAIL
Patient lead leakage, worst case    100 uA     61 uA       pass
Verdict: FAIL. Tagged out of service.
\`\`\`

The lab judges patient lead leakage against the tighter 100 microamp normal-condition figure, which is what a department procedure usually specifies. One reading over its limit fails the device, and a failing device never goes back to a patient. Tag it out of service, document every reading rather than only the bad one, repair it (usually a leaky filter capacitor or a damaged cord), and retest before release.

> Record every condition, not just the worst one: the next technician needs your numbers to spot drift.

The virtual analyzer is a teaching model of what a real analyzer does, not an emulation of any brand. The controls, measurements, and limits are the ones you will meet; the menus on the box in your shop will look different. Every kit lab in the course also runs on the virtual instruments, so nothing waits on a parts order, and the labs that do use real parts run on a $60 to $100 home kit.

The analyzer labs live in **BMET Academy**, our free course for people starting out in healthcare technology management: 13 hands-on labs, a printable memorization sheet, and practice exams built toward the CABT. If the limits above are old news because you already work in a shop, the CBET course covers them at exam depth.`
});
