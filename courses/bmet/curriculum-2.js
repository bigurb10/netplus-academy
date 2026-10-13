// BMET Academy curriculum, units 4 and 5. Original teaching content for the AAMI/ACI CABT exam.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " tip line, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "Math and Reasoning for Technicians", domain: 5,
  blurb: "Units, scales, waveforms, graphs, flowcharts, manuals, and paperwork: the arithmetic and the reading habits behind every number you write down.",
  assumes: "The meter work from unit 3. No math beyond grade-school arithmetic.",
  lessons: [
    {
      id: "u4l1", title: "Metric Prefixes and Unit Conversions", domain: 5, obj: "RPS-A", minutes: 10,
      body: `A nurse tells you the pump is set to 125 mL/h. The analyzer shows 0.42 mA of leakage and the limits card says 500 microamps. A ventilator spec is written in cmH2O and the gauge in front of you reads mmHg. None of that is hard arithmetic. All of it goes wrong the same way: somebody compared two numbers that were not in the same units.

## The prefixes, and the only trick you need
A prefix is a multiplier stuck on the front of a unit. Five of them cover nearly everything on a bench.

\`\`\`
Prefix  Written  Means                 Example
kilo    k        one thousand          1 kg = 1,000 g
centi   c        one hundredth         1 cm = 0.01 m
milli   m        one thousandth        1 mA = 0.001 A
micro   u        one millionth         1 microamp = 0.000001 A
nano    n        one billionth         1 nanometer = 0.000000001 m
\`\`\`

You almost never need to multiply. You need the decimal point. Going from a bigger unit to a smaller one the number gets **bigger**, so the point moves **right**; going from smaller to bigger the number gets smaller and the point moves **left**. Milli to micro is three places right, so 0.42 mA is 420 microamps. Micro to milli is three places left, so 500 microamps is 0.5 mA. Say "smaller unit, bigger number" to yourself before you move the point and you will stop reversing it.

## Volume
**1 L = 1,000 mL**, and **1 mL is one cubic centimeter**, which is why an older chart writes 250 cc where a pump screen says 250 mL. A syringe marked in tenths of a milliliter and a bag marked in liters are measuring the same thing.

## Mass and length
**1 kg = 1,000 g = 2.2 lb**. A 70 kg patient weighs 70 x 2.2 = 154 lb, and a dose or a defibrillator energy given per kilogram has to use the kilograms, not the pounds. For length, **1 inch = 2.54 cm**, 1 m = 100 cm = 1,000 mm. A 6 ft clearance is 6 x 12 x 2.54 = about 183 cm, or 1.8 m.

## Current, the conversion you will do most
**1 A = 1,000 mA = 1,000,000 microamps.** Leakage limits are written in microamps and meters often read in milliamps, so this is the one to have reflexively: 500 microamps = 0.5 mA, 10 microamps = 0.01 mA, 5 mA = 5,000 microamps.

## Pressure
Four scales, one set of bridges.

\`\`\`
1 mmHg      = 1.36 cmH2O      blood pressure in mmHg, airway pressure in cmH2O
1 kPa       = 7.5 mmHg        many specifications are written in kilopascals
1 psi       = 51.7 mmHg       cylinder and pipeline gauges read in psi
1 atmosphere = 14.7 psi = 760 mmHg
\`\`\`

So 20 cmH2O of airway pressure is 20 / 1.36 = about 15 mmHg, and a 40 kPa cuff range is 40 x 7.5 = 300 mmHg.

## Temperature
**F = C x 9/5 + 32** and **C = (F minus 32) x 5/9**. Anchor the three pairs you already know: **37 C = 98.6 F**, 0 C = 32 F, 100 C = 212 F. Check yourself with an anchor every time: if you convert 40 C and get anything less than 98.6 F, you ran the formula backwards.

## Flow
A pump rate is **mL/h**. Divide by 60 for **mL/min**: 120 mL/h is 2 mL/min. Going the other way, a 30-minute collection doubled gives the hourly rate, so 25 mL caught in half an hour means the pump delivered 50 mL/h.

## Write the unit on every number
A number with no unit is not a measurement, it is a guess waiting to be misread. 0.5 could be half an ohm or half a milliamp. Write {{0.42 mA}} in the record, not {{0.42}}, and convert once, in writing, before you compare a reading with a limit.

> Exam tip: milli to micro is three places right, micro to milli is three left. Memorize 2.2 lb per kg, 2.54 cm per inch, 1.36 cmH2O per mmHg, 7.5 mmHg per kPa, 51.7 mmHg per psi, 14.7 psi per atmosphere, and 37 C = 98.6 F.`,
      hook: "Prefixes: kilo 1,000, centi one hundredth, milli one thousandth, micro one millionth, nano one billionth. Smaller unit means bigger number, so the point moves right: 0.42 mA = 420 microamps, 500 microamps = 0.5 mA. 1 L = 1,000 mL and 1 mL = 1 cc. 1 kg = 1,000 g = 2.2 lb. 1 inch = 2.54 cm. 1 A = 1,000 mA = 1,000,000 microamps. 1 mmHg = 1.36 cmH2O, 1 kPa = 7.5 mmHg, 1 psi = 51.7 mmHg, 1 atmosphere = 14.7 psi = 760 mmHg. F = C x 9/5 + 32, C = (F minus 32) x 5/9, and 37 C = 98.6 F. mL/h divided by 60 = mL/min. Always write the unit."
    },
    {
      id: "u4l2", title: "Reading Scales, Meters, and Cylinders; Tolerance and Percent Error", domain: 5, obj: "RPS-A", minutes: 10, lab: "reading-scales",
      body: `Two technicians read the same analog gauge and write down two different numbers. Only one of them is doing the job. Reading an instrument is a skill with rules, and the pass or fail you write in the record is only as good as the reading it came from.

## Analog scales and the needle
A needle instrument gives you a printed number, a set of ticks between the printed numbers, and a pointer.

1. Check the **range** the instrument is on. The same face can mean 0 to 10 V or 0 to 250 V.
2. Count the divisions between two printed numbers and divide the difference by that count. Five divisions between 6 and 7 means each division is 0.2 V. Then estimate one more digit by eye between ticks.
3. Find the last division line the needle has passed, add the whole divisions beyond it, then estimate the tenths of the next one by eye. Two divisions past 6 on a 0.2 V scale is 6.4 V; on a face with 1 V divisions, a needle four tenths of the way from 6 to 7 is also 6.4 V.

**Parallax** is the error you add by looking at the needle from the side: the pointer sits slightly above the scale, so an angled eye reads it against the wrong mark. Get your eye level and square to the face. Good instruments put a mirror strip behind the needle so you can line the needle up with its own reflection.

## Liquids and the meniscus
Water in a narrow tube climbs the walls, so the surface is a shallow curve called the **meniscus**. Stand the cylinder on a flat bench, bring your eye level with the liquid, and read the **bottom of the curve**. Read it in the air, not in your hand: tilting a cylinder changes the reading.

## A ruler is an instrument too
Plenty of measurements are made with a millimeter rule: the height of a complex on a strip, the width of an interval, a gap, a travel, a wear mark. The same three rules apply. Lay the rule flat against the thing you are measuring so it is not held at an angle, start from a printed line rather than the worn end of the rule, and read millimeters to the mark and estimate the half. A gauge face, a cylinder, and a ruler are the same job: find the value of one graduation, then count.

## How many digits to write down
Read to the nearest printed graduation, then **estimate one more digit**. On a cylinder marked every 10 mL you estimate to the nearest milliliter between the marks, so you may write 37 mL, but never 37.4821 mL, because the instrument cannot resolve that. Those trustworthy digits are the **significant figures**: the digits your instrument actually earned. Writing more digits than the instrument can resolve is not extra precision, it is fiction, and it makes a borderline device look fine.

## Accuracy and precision are not the same thing
**Accuracy** is how close a reading is to the truth. **Precision** is how repeatable it is. A meter that reads 9.00 V five times in a row on a 10.00 V source is wonderfully precise and 1 V wrong. Repeatability is comforting and proves nothing on its own, which is why instruments are checked against a known standard.

## Percent error
Every performance check ends with the same question: how far off is it, as a percentage?

\`\`\`
percent error = (measured minus expected) / expected x 100
\`\`\`

**Keep the sign.** A minus sign says the device delivered less than it promised, a plus sign says more, and that direction often points straight at the cause. Worked: a 30-minute collection should have been 40 mL and you measured 37 mL. (37 minus 40) / 40 x 100 = -3 / 40 x 100 = **-7.5%**.

## Tolerance and the pass or fail decision
**Tolerance** is the band the manual allows, usually a percent of the expected value. Turn it into real units before you judge anything: 5% of 40 mL is 2 mL, so the band is **38 to 42 mL**. Then compare the size of your error with the band and ignore the sign. 37 mL sits outside 38 to 42, so -7.5% fails a 5% tolerance. Two separate steps, in this order: do the arithmetic, then make the decision.

## In the lab
You read three figures and then do exactly that arithmetic: an analog voltmeter on its 0 to 10 V range printed at 0, 5, and 10 with divisions 1 V apart, so you estimate the tenths, a 100 mL graduated cylinder holding a 30-minute collection, and six seconds of ECG whose complexes you count and multiply by ten. Then you work out the percent error of the collected volume against the expected 40 mL, keep the sign, and decide against the manual's plus or minus 5% whether the flow check passes.

> Exam tip: percent error = (measured minus expected) / expected x 100, sign kept. Tolerance becomes real units first: 5% of 40 is 2, so 38 to 42. Read the bottom of the meniscus, read a needle square-on, and estimate one digit past the smallest graduation.`,
      hook: "Check the range, count the divisions between printed numbers, read square-on to kill parallax, and read the bottom of the meniscus on a cylinder standing flat. Read to the nearest graduation and estimate one more digit; no more digits than the instrument earned. Accuracy is closeness to truth, precision is repeatability, and a meter can be precisely wrong. Percent error = (measured minus expected) / expected x 100, keeping the sign: 37 mL against 40 mL is -7.5%. Convert tolerance to units before deciding: 5% of 40 mL is 2 mL, band 38 to 42 mL, so 37 mL fails."
    },
    {
      id: "u4l3", title: "Reading Waveforms: ECG Paper, Period, Amplitude, and Rate", domain: 5, obj: "RPS-A", minutes: 9,
      body: `A nurse hands you a strip and says the monitor rate is wrong. You cannot check that claim by looking at the monitor, because the monitor is the thing in question. You check it off the paper, and for that you need to know what one little box is worth.

## The paper is a ruler in two directions
\`\`\`
Across (time)   paper speed 25 mm/s is standard
                small box = 1 mm wide = 0.04 s
                large box = 5 mm wide = 0.2 s   (five small boxes)
Up (voltage)    normal gain: 1 mV of signal = 10 mm tall
\`\`\`

Everything else in this lesson is arithmetic on those four numbers. Before you measure anything, confirm the speed and gain printed on the strip, because a strip run at 50 mm/s will give you half the real rate if you assume 25.

## Three ways to get a heart rate
- **The 300 method**: count the **large** boxes between two R waves and divide 300 into it. Four large boxes is 300 / 4 = **75** beats per minute.
- **The 1,500 method**: count the **small** boxes between two R waves and divide 1,500 into it. Twenty small boxes is 1,500 / 20 = 75 beats per minute, the same answer with finer resolution.
- **The six-second method**: count the complexes in a **six-second** strip and multiply by **10**. Ten complexes in six seconds is 100 beats per minute.

## Period and frequency
The **period** is the time for one cycle, and the **frequency** is how many cycles happen per second, measured in hertz. They are two views of one number.

\`\`\`
f = 1 / T        T = 1 / f
\`\`\`

A beat every 0.8 s is 1 / 0.8 = 1.25 Hz, which is 1.25 x 60 = 75 beats per minute. Run it the other way for mains power: 60 Hz has a period of 1 / 60 = about 16.7 ms.

## Amplitude and baseline
**Amplitude** is height, measured from the **baseline**, the flat level the trace rests on between events. At normal gain, 10 mm of height is 1 mV, so a complex 12 mm tall is 1.2 mV. Two habits follow: measure height from the baseline rather than from the bottom of the paper, and check the gain marker before you trust any millivolt number, because half gain halves every amplitude on the strip.

## Three shapes worth recognizing
- A **sine wave** is a smooth, symmetrical swing with no corners: mains power, a test tone, and the interference mains power leaves behind.
- A **square wave** snaps between two levels and holds: digital signals, switching power supplies, pacemaker pulse trains, and the calibration pulse a monitor can put on the trace.
- An **arterial pressure wave** has a sharp upstroke, a rounded peak, a small notch on the way down as the valve closes, and a slow decline to the next beat. Its top is the systolic pressure and its bottom the diastolic.

## Artifact versus signal
**Artifact** is anything on the trace that did not come from the patient. Three patterns cover most of it.

- **60 Hz interference**: a thick, fuzzy baseline of perfectly regular small waves, 60 of them a second. It comes from nearby mains wiring and shows up worst with a dried electrode, a broken shield, or a poor ground.
- **Motion**: a wandering, rolling baseline and ragged spikes with no rhythm, caused by the patient shivering, moving, or being moved.
- **A loose or dry electrode**: sudden square steps, a flat line on one lead while the others look fine, or a lead-off alarm. Fix the patient end before you suspect the machine.

The rule that saves you: regular and far too fast is usually electrical, irregular and messy is usually mechanical, and one lead behaving differently from the rest is usually that lead.

## Why six seconds works
The 300 and 1,500 methods assume the next beat comes at the same spacing as the last one. In an irregular rhythm it does not, so a single measured interval can be far from the average. Counting everything in six seconds averages the irregularity instead of ignoring it, which is why it is the method clinicians use when the rhythm is not steady.

> Exam tip: 25 mm/s, small box 0.04 s, large box 0.2 s, 1 mV = 10 mm. Rate is 300 / large boxes, 1,500 / small boxes, or six-second count x 10. f = 1 / T. Use the six-second strip when the rhythm is irregular.`,
      hook: "ECG paper at 25 mm/s: small box 1 mm = 0.04 s, large box 5 mm = 0.2 s, and 1 mV = 10 mm tall at normal gain. Rate three ways: 300 divided by the large boxes between R waves, 1,500 divided by the small boxes, or the beats in a six-second strip times 10. Four large boxes is 75 beats per minute. Period and frequency: f = 1 / T, so 0.8 s is 1.25 Hz and 60 Hz is 16.7 ms. Amplitude is measured from the baseline, so check the gain. Sine is smooth, square snaps between levels, an arterial wave has a sharp upstroke and a notch. Artifact: regular fuzz is 60 Hz, a wandering baseline is motion, square steps and a flat lead are the electrode. Six seconds for irregular rhythms."
    },
    {
      id: "u4l4", title: "Graphs, Tables, and Trend Data", domain: 5, obj: "RPS-B", minutes: 8,
      body: `A supervisor drops a page on your bench: one line graph of battery run times, one table of a monitor's specifications, and a printout of the last four safety tests on a pump. Nothing on that page is broken yet. Reading it correctly is how you get ahead of the device that is about to break.

## Read the axes before the shape
A graph has two axes, and each one carries a label, a unit, and a scale.

1. Read the horizontal axis: usually time, sometimes a setting.
2. Read the vertical axis: what was measured, in what units.
3. Look at where the vertical scale starts and how far it runs.

That third step is the one people skip. A line that looks like a cliff can be a two percent change on a scale that starts at 95, and a line that looks flat can be a doubling on a scale that runs to 10,000. To read a value off a line graph, go up from the time on the horizontal axis until you meet the line, then straight across to the vertical axis, and read to the nearest gridline with one estimated digit, exactly as you would on a meter.

## Bars, and what they are for
A **bar chart** compares separate things rather than showing change over time: work orders by department, failures by model, scheduled maintenance completion by month. Taller is more. Watch for a vertical axis that does not start at zero, because it makes a small difference between bars look enormous.

## Two-way tables: row then column
A specification table has one row per model or parameter and one column per condition. Always travel in the same order: **find the row first, then the column, then read the cell, then read its unit.** Scanning across the wrong row is the single most common mistake made with a spec table, and the answer it gives you looks perfectly reasonable.

\`\`\`
Model     Accuracy        Fuse        Battery run time
IP-100    plus/minus 5%   1 A, 250 V  6 h
IP-200    plus/minus 2%   2 A, 250 V  8 h
\`\`\`

A **lookup table** is the same idea with no arithmetic: a wire color code, a fuse rating by model, a gas color, an error code and its meaning. You are not expected to memorize these; you are expected to look them up every time and write down what you looked up.

## Trends: the reading that is still passing
A single number is judged against a limit. A series of numbers is judged against **itself**.

\`\`\`
Scheduled inspection   Chassis leakage   Limit
2 years ago            90 microamps      500 microamps
last year              150 microamps     500 microamps
this year              310 microamps     500 microamps
\`\`\`

Every one of those passes. The device is still failing, just not yet: insulation that leaks twice as much every year has a date. The same logic catches a battery whose timed run goes 6 h, 5 h, 3.5 h, and a ground resistance creeping from 0.08 to 0.3 ohm. Compare each reading with the last one and not only with the limit, which is exactly why the last reading is kept in the record.

## Percent change, and the outlier
**Percent change = (new minus old) / old x 100.** Leakage from 120 to 150 microamps is (150 minus 120) / 120 x 100 = **+25%**. Worth noting even though the number is tiny.

An **outlier** is a value that does not belong with its neighbors: nine run times near 6 h and one at 45 minutes. Averaging hides it, and the average is not what hurts the patient. Look at individual values, decide whether the odd one is a bad measurement or a bad device, and go and find out which.

> Exam tip: read the axis labels, units, and starting value before the shape of the line. Row first, then column, in any table. Percent change = (new minus old) / old x 100. A reading that creeps in one direction across inspections is a failure in progress even while it still passes.`,
      hook: "Read both axes, their units, and where the scale starts before you read the shape; a flat line on a small scale can be a huge swing. Off a line graph: up from the time, across to the value, nearest gridline plus one estimated digit. Bar charts compare separate things, and a vertical axis that does not start at zero exaggerates. In any table: row first, then column, then the cell, then its unit. Lookup tables (color codes, fuse ratings, error codes) are looked up, not memorized. Trends are judged against the last reading, not only the limit: 90, 150, 310 microamps all pass and still predict a failure. Percent change = (new minus old) / old x 100. Averages hide outliers."
    },
    {
      id: "u4l5", title: "Flowcharts and the Process of Elimination", domain: 5, obj: "RPS-C", minutes: 9,
      body: `A monitor in room 12 shows no waveform. You could open it. You could also discover in ninety seconds that the same cable fails on a known-good monitor, which is the whole job: shrinking the list of possible causes with cheap tests before you reach for a screwdriver.

## The shapes on a troubleshooting chart
Manufacturers draw their troubleshooting trees as flowcharts, and the shapes mean the same thing everywhere.

\`\`\`
oval        start or end
rectangle   a step: do this, measure that
diamond     a decision, answered yes or no
arrows      the order, and which branch each answer takes
\`\`\`

Follow it as written, from the oval, one box at a time. Answer each diamond with a test you actually performed, not with what you expect the answer to be. Skipping ahead to the box you think is the problem is how technicians spend an afternoon on a branch the chart would have ruled out in one step.

## Halve the problem
Every good test cuts the remaining possibilities roughly in half rather than checking one suspect. "Does it do the same thing on a different outlet" splits the building from the device in one move. "Does the same cable fail on another monitor" splits the cable from the monitor. Ask what single test divides the list, and do that one first.

## Swap with a known-good part
The fastest version of halving is substitution: fit a **known-good** cable, probe, sensor, or battery and see whether the symptom follows the part or stays with the device. Two rules make it trustworthy. Know the swapped part is good, which means it came from a working device or stock, not from the shelf of things somebody set aside. And swap one part at a time, so the result means something.

## Simplest and cheapest cause first
Most work orders end at something ordinary, so check the ordinary things first: power at the outlet, the switch, the breaker, the charged battery, the connector seated, the consumable loaded, the setting, the mode, the alarm limit. Order the possible causes by how likely and how cheap they are to test, and work down that list. Nobody is ever sorry they checked that it was plugged in.

## One change at a time
Change one thing, retest, write down the result. Change three things and the device may work with no idea which change fixed it, which means you cannot write the record, cannot prove the repair, and cannot fix the next one faster. If a change does nothing, put it back before trying the next.

## The order of suspicion: patient, user, accessory, device
1. **Patient first.** Is anyone at risk right now? Is the patient on this device? If so, get clinical staff to move care to a spare before you touch anything.
2. **User and use.** What did they see, in what order, and what has changed? Settings, a different mode, a new disposable, a new user. Many reported failures are a device doing exactly what it was told.
3. **Accessory and consumable.** Cables, leads, sensors, cuffs, tubing, batteries, electrodes. These flex, get dropped, and get cleaned, so they fail far more often than the device.
4. **The device itself.** Only then is it the box, and now you have a short list to open it with.

A useful corollary: if it works in another room, the fault is not inside the device. If the same fault follows the device, it is not the room.

## Write down what you ruled out
The eliminated causes are findings, not wasted time. "Works on a different outlet, fails with two different cables, battery runs 5 h" tells the next technician where not to look and tells the record what you actually did. A write-up that lists only the fix hides the work.

## When to stop and escalate
Stop and get help when the device is beyond what you are signed off on, when the repair needs a tool, a calibration, or software you do not have, when the problem is intermittent and you cannot reproduce it, when a patient was involved, or when your time has outgrown the value of the repair. Escalating is a decision with a reason behind it, not a failure, and it belongs in the record with everything you eliminated.

> Exam tip: oval start, rectangle step, diamond decision. Test the simplest and cheapest cause first, change one thing at a time, swap in a known-good accessory to split the problem in half, and work patient, user, accessory, device. If it works in another room it is not the device.`,
      hook: "Flowchart shapes: oval start or end, rectangle a step, diamond a yes or no decision, arrows the order. Follow the tree as written and answer each diamond with a test you ran. Pick the test that halves the list: another outlet, another room, a known-good cable. Swap one known-good part at a time. Try the simplest and cheapest causes first: power, battery, connection, consumable, setting. Change one thing, retest, record it. Work in order: patient safe, user and what changed, accessory, then the device. Works elsewhere means it is not the device. Write down what you ruled out, and escalate for scope, tools, software, intermittent faults, or patient involvement."
    },
    {
      id: "u4l6", title: "Reading a Service Manual", domain: 5, obj: "RPS-C", minutes: 9,
      body: `Nobody memorizes equipment. A technician who looks fast is usually just fast at finding the right page. The service manual is the only place that holds the real fuse rating, the real tolerance, and the real procedure for the device in front of you, and reading one is a skill you can practice before you ever touch that model.

## What is inside, in the order you will meet it
\`\`\`
Safety notices          warnings, cautions, voltages present, stored energy, read first
Specifications          ranges, accuracies, tolerances, power, fuses, environment
Theory of operation     how it works, usually with a block diagram
Setup and configuration installation, options, settings, software configuration
Scheduled maintenance   the procedure and the interval, step by step
Calibration             what to adjust, with what reference, and to what limit
Troubleshooting         symptoms, error codes, and what each one means
Parts list              every replaceable part with its part number
Schematics              circuit drawings and board layouts
\`\`\`

Two of those sections carry the weight. **Specifications** gives you the number to judge a reading against, and without it you have a measurement and no decision. **Troubleshooting** turns the device's own complaint into a short list of causes, which is why you look up an error code before you take anything apart.

## Specifications and tolerances
A specification is a value plus a tolerance plus the conditions it applies under. "Flow accuracy plus or minus 5% at 25 mL/h and above, after a 30-minute stabilization" is a complete spec: the 5% alone is not. Read the whole row, including the footnote, because tolerances often widen at the extremes of a range and some only apply with a particular disposable fitted.

## The three things you look up most
- **The fuse rating**, written as current, voltage, and type: 2 A, 250 V, time-delay. Fitting a bigger fuse to stop it blowing is replacing a protective device with a fire. Fitting a fast fuse where a time-delay was specified gets you a device that trips at power-on.
- **A part number**, especially the battery. Batteries differ in chemistry, capacity, and the charging circuit expects a particular one, so the number in the parts list is the part, and a close-looking pack is not.
- **The scheduled maintenance procedure and interval**, which tells you what the manufacturer wants done, how often, and which performance tests it expects, so your checklist matches the device rather than your habits.

## Model, serial, and revision
The nameplate carries the **model** (which manual), the **serial number** (which individual device, its warranty and its history), and often a hardware **revision** or software version. Parts and procedures change mid-production, so a manual for the right model and the wrong revision can list a part that does not fit your board. Match all three before you order anything, and record them in the work order.

## The instructions for use are a different document
The **IFU** is written for the clinician: how to set it up, run it, clean it, and what the alarms mean. The service manual is written for you: how to test it, adjust it, and repair it. Both are controlled documents tied to a model and a software version, which is why you use the copy that matches rather than a search result for something similar. If the clinical complaint is "the alarm keeps sounding", the instructions for use may answer it faster than the service manual.

## Where manuals live
The organized shop keeps them attached to the asset record in the **CMMS**, so opening the device's record gives you its manual, its history, and its scheduled maintenance procedure together. Otherwise: the manufacturer's service portal, which usually needs an account, the department's library of files and binders, or the manufacturer's technical support line. When you find one that was missing, attach it to the asset record so the next person does not have to repeat the hunt.

> Exam tip: specifications give the number you judge a reading against, troubleshooting decodes the error, the parts list gives the part number, and the fuse rating is current, voltage, and type. The instructions for use are for the clinician; the service manual is for you. Match model, serial, and revision.`,
      hook: "Service manual sections: safety notices, specifications, theory of operation, setup and configuration, scheduled maintenance procedure and interval, calibration, troubleshooting and error codes, parts list with part numbers, and schematics. Specifications give the number you judge a reading against, and a spec is a value plus a tolerance plus its conditions. Look up a fuse by current, voltage, and type; look up a battery by part number; look up the maintenance procedure and interval. Match model, serial, and revision, because parts change mid-production. The instructions for use are for the clinician, the service manual for you, and both are controlled documents. Manuals live on the asset record, the manufacturer portal, or the department library."
    },
    {
      id: "u4l7", title: "Work Orders and Documentation", domain: 5, obj: "RPS-C", minutes: 8,
      body: `You replace a pump's door latch, test it, and hand it back. Two months later the same pump is involved in a complaint and somebody asks what was done to it in July. Everything you remember is worth nothing. Everything you wrote is worth everything. Documentation is not the paperwork after the job; it is part of the job.

## The CMMS
Every device a hospital owns lives in the **CMMS**, the computerized maintenance management system. It holds the asset record (what the device is, where it is, who owns it, what it cost), the maintenance schedule, and every work order ever opened against it. You will spend part of every day in it: opening work orders, closing them, looking at what the last technician found, and seeing what is due.

## What a work order has to say
\`\`\`
Asset identification number   the tag number, so the record attaches to the right device
Location and department       where it is, and who to tell when it comes back
Problem reported              in the reporter's words, with the date and who reported it
What you found                the condition and the measurements
What you did                  the repair, adjustment, part, or cleaning
Parts used                    part number and quantity
Time spent                    labor, and travel if your shop tracks it
Test results                  readings with their units and a clear pass or fail
Status                        in service, out of service, awaiting parts
Your name and the date        who did the work, and when
\`\`\`

The fields people skip are the measurements and the pass or fail. A closed work order saying "repaired, works fine" proves nothing: it does not say what was wrong, what you measured, or that the device is safe.

## Write plain sentences
Write what a stranger could follow a year from now. No private shorthand, no blame, no jokes, and no diagnoses of the user.

- Weak: "Fixed. Tested ok."
- Better: "Lower door latch broken, found during visual inspection. Replaced latch, part 45-2210. Ground resistance 0.12 ohm, chassis leakage 48 microamps normal and 190 microamps worst case, both pass. Flow check at 100 mL/h measured 98 mL/h, within the 5% tolerance. Returned to unit 4B, charge nurse notified."

The second version is the same amount of typing and an entirely different document: it names the fault, the part, the numbers, the limits, and who has the device now.

## Due dates and completion rates
Scheduled maintenance is generated by the system with a **due date** and usually a window around it. Two numbers get watched: whether the work was done inside its window, and the **completion rate**, the percentage of due inspections finished in the period. Both come from what you close, so an inspection done and not closed counts as not done. If a device cannot be found or is in use, the answer is to document the attempt and schedule a return, never to close it as complete.

## The incoming inspection record and the asset tag
A new device's first record is its **incoming inspection**: the shipment checked against the order, the model and serial recorded, the first electrical safety test and performance check captured as the **baseline** every later reading is compared with, the accessories inventoried, the manual attached, and the **asset tag** applied and entered. That tag number is how every future work order finds this device, which is why a tag that falls off gets replaced with the same number and not a new one.

## Why it actually matters
- **Surveys and inspections.** Accrediting bodies and state inspectors read records, not benches. An undocumented inspection is a finding, and a pattern of them is a serious one.
- **Recalls and field notices.** When a manufacturer recalls a model or a lot, the records tell you which devices you own, where they are, and which were already modified. Without them, somebody walks the building.
- **Patterns.** Three failures of the same part across a fleet is a design or supply problem worth escalating, and it only exists if the part numbers were written down.
- **Legal protection.** If a device is implicated in a patient event, the record is the evidence that it was inspected, tested, and released to service correctly. It protects the patient, the hospital, and you.

> Exam tip: if it is not written down it did not happen. Every work order needs the asset number, the problem reported, what you found, what you did, parts, time, readings with a clear pass or fail, and your name and date. The incoming inspection creates the baseline, and the asset tag number is how the record finds the device.`,
      hook: "Every device lives in the CMMS with its asset record, its schedule, and every work order. A work order needs asset identification number, location, problem reported, what you found, what you did, parts used, time spent, test results with units and a clear pass or fail, status, and your name and date. Write plain sentences a stranger could follow a year later, and include the measurements, not just the word fixed. Scheduled maintenance has a due date and a window, and the completion rate comes from what you close, so unclosed work counts as undone. The incoming inspection sets the baseline readings and applies the asset tag. Records matter for surveys, recalls, fleet patterns, and legal protection: if it is not written down it did not happen."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Safety in Healthcare", domain: 3,
  blurb: "What current does to a person, the electrical safety test and the limits it is judged against, lockout tagout, chemicals, medical gases, infection control, and the hazards of particular devices.",
  assumes: "Ground, cords, and the meter from unit 3.",
  lessons: [
    {
      id: "u5l1", title: "Electrical Safety: Macroshock, Microshock, and Why Leakage Matters", domain: 3, obj: "SAF-B", minutes: 10,
      body: `A healthy adult can grab a 9 V battery all day and feel nothing. A patient with a catheter running to the heart can be killed by a current ten thousand times smaller than the one that would make you flinch. That gap is the reason electrical safety testing exists, and it is the single most important idea in this unit.

## What current does to a person
Voltage is the push, but the damage is done by **current**, and by where it flows.

\`\`\`
Current through the body (60 Hz)   Effect
1 mA                              threshold of perception, a faint tingle
5 mA                              accepted maximum harmless current
10 to 20 mA                       let-go threshold: muscles clamp, the person cannot release
50 mA                             pain, possible fainting, respiratory arrest
100 to 300 mA                     ventricular fibrillation likely
6 A and above                     sustained contraction and burns
10 microamps                      microshock: delivered directly to the heart, can cause fibrillation
\`\`\`

Notice the shape of that list. The dangerous band is not the top: above the fibrillation range the heart clamps and often restarts, while **100 to 300 mA** stops it coordinating and it does not. And notice that 10 to 20 mA takes away your ability to let go, which is why one hand in a pocket is an old habit worth keeping.

## Skin is the resistor that protects you
Dry, intact skin is roughly **100,000 ohm** between two points on the body. Wet it with sweat, water, or electrode gel and it can fall toward **1,000 ohm**. Ohm's law does the rest: the same 120 V that pushes about 1 mA through dry skin pushes about a hundred times more through wet skin. Wet floors, bathrooms, dialysis, hydrotherapy, and a patient fresh from a procedure are all the low-resistance case.

## Macroshock and microshock
**Macroshock** is current that crosses the skin and spreads through the body. It takes **milliamps** to hurt, because the skin and the bulk of the body spread and resist it, and only a fraction of it reaches the heart.

**Microshock** is current delivered **inside** the body, straight to the heart, through a catheter filled with conductive fluid, a pacing wire, or an internal lead. The skin is not in the path and nothing spreads the current out, so as little as **10 microamps** can cause fibrillation. That is a current you cannot feel, from a device that appears to be working perfectly.

## Why patients are vulnerable in ways you are not
- **Invasive connections.** Catheters, pacing wires, and internal leads carry current past the skin.
- **Wet or broken skin.** Gel, prepped sites, incisions, and sweat all drop the resistance that protects you.
- **They cannot let go.** A sedated, anesthetized, or restrained patient cannot pull away, and cannot tell you something feels wrong.
- **Several devices at once.** A patient wired to a monitor, a pump, and a warming blanket can become the path between two chassis that sit at slightly different potentials.

## Leakage current, and where it comes from
**Leakage current** is the small current that escapes a perfectly healthy device: through the capacitance between the mains wiring and the metal case, through the filter capacitors a power supply uses, through transformer windings, and through insulation that is never a perfect insulator. It is not a fault. Every mains-powered device has it, and it grows as insulation ages, cords get crushed, and moisture gets in.

That current has to go somewhere, and where it goes is the question. In a healthy Class I device it flows harmlessly down the **ground wire** to the building. Break the ground and the leakage waits on the chassis for another path, and the next conductive thing to touch the case becomes the path. That is why electrical safety testing measures ground continuity first and then measures leakage with the ground deliberately opened: the test asks what this device does on its worst day, not its best.

A **GFCI** receptacle is the matching protection in wet locations. It compares the current going out on hot with the current returning on neutral, and if **4 to 6 mA** goes missing it assumes the missing current found a person and opens the circuit in a fraction of a second.

## The patient care vicinity
Standards draw a box around the patient inside which equipment grounding and receptacle requirements are stricter, because anything inside it can be touched by the patient or by somebody touching the patient at the same time. Under **NFPA 99** that space reaches about **6 ft (1.8 m)** out from the bed or chair and about **7.5 ft (2.3 m)** up from the floor. Practically: a power strip, a laptop charger, or a personal fan placed on the bed rail is inside the box, and anything inside it has to be equipment you have inspected.

## Electrical is one of three hazard classes
The exam groups hazards in three families, and this unit covers all of them: **electrical** hazards, as above; **chemical** hazards, meaning the cleaners, solvents, electrolyte, and compressed gases in your shop; and **environmental** hazards, meaning fire, radiation, lasers, magnetic fields, mechanical and ergonomic hazards, noise, temperature, and biological exposure. The same habit answers all three: know which hazard a job carries before you start it, and wear or use the control that matches.

> Exam tip: 1 mA perception, 5 mA accepted maximum harmless, 10 to 20 mA let-go, 50 mA pain and respiratory arrest, 100 to 300 mA fibrillation likely, 6 A and above contraction and burns, and 10 microamps straight to the heart. Macroshock in milliamps crosses the skin; microshock in microamps bypasses it. GFCI trips at 4 to 6 mA, and the patient care vicinity is 6 ft (1.8 m) out and 7.5 ft (2.3 m) up under NFPA 99.`,
      hook: "Current, not voltage, does the damage: 1 mA perception, 5 mA accepted maximum harmless, 10 to 20 mA let-go, 50 mA pain and possible respiratory arrest, 100 to 300 mA ventricular fibrillation likely, 6 A and above sustained contraction and burns, and as little as 10 microamps delivered directly to the heart. Dry skin is about 100,000 ohm and wet skin can fall toward 1,000 ohm. Macroshock crosses the skin and needs milliamps; microshock bypasses the skin through a catheter or lead and needs microamps. Patients cannot let go, are wet, are invaded, and are wired to several devices at once. Leakage current comes from capacitance and insulation in every healthy device and leaves by the ground wire, so ground continuity is tested first and leakage is tested with the ground open. A GFCI trips at 4 to 6 mA. The patient care vicinity under NFPA 99 is about 6 ft (1.8 m) out and 7.5 ft (2.3 m) up. The three hazard classes are electrical, chemical, and environmental."
    },
    {
      id: "u5l2", title: "The Electrical Safety Test: Ground Resistance and Leakage", domain: 3, obj: "SAF-B", minutes: 10, lab: "safety-pass",
      body: `This is the test that defines the job. A pump can pump, a monitor can display, and neither one is safe to send to a patient until an analyzer has proved that its ground works and that the current escaping its case is small enough not to matter. It is also the most predictable test you will ever run, because the limits are fixed and the sequence never changes.

## What the analyzer does
An **electrical safety analyzer** is a box the device plugs into, and which plugs into the wall. Because it sits between the two, it can do things an ordinary meter cannot.

- Measure the resistance of the **ground path** from the device's exposed metal to its plug's ground pin.
- Measure **leakage current** through a network designed to respond the way a human body would, so a microamp reading means a microamp through a person.
- **Reverse the mains polarity** and **open the ground or the neutral** on purpose, so leakage can be measured in fault conditions without creating a real fault.
- Measure leakage from the **patient leads** of a device that has applied parts.

It is a specialized instrument, it is calibrated on a schedule, and its printout or saved record is the evidence that the test happened.

## The two numbers for a cord-connected device
\`\`\`
Ground wire resistance, chassis to the plug's ground pin   0.5 ohm maximum   (NFPA 99)
Chassis (touch) leakage, in every test condition            500 microamps    (NFPA 99)
\`\`\`

Under **NFPA 99**, the standard a hospital's own program is built on, ground resistance for patient-care equipment must be **0.5 ohm or less**, and chassis leakage must stay under **500 microamps** in current editions. Older editions used **300** or **100 microamps**, and some facilities still cite the tighter number in their own policy, so read the limits card your shop works to rather than assuming. Ground resistance is measured once. Leakage is measured in every condition.

A high ground reading almost never means a broken device. It means a worn cord, a tired plug, a damaged strain relief, or a corroded ground screw, and flexing the cord while watching the reading usually finds it.

## The test conditions, and the worst case
\`\`\`
Polarity   Ground    What it represents
normal     closed    the device as it sits on the floor every day
reversed   closed    hot and neutral swapped at the outlet, a real wiring error
normal     open      the ground conductor broken inside the cord or the plug
reversed   open      both at once: the worst case
\`\`\`

Leakage is also measured with the **neutral open**, which simulates a broken return. The condition that matters most is **reversed polarity with the ground open**, and the reason is worth understanding rather than memorizing. Opening the ground removes the path that normally carries leakage away, so the current has nowhere to go but the chassis and whoever touches it. Reversing the polarity puts the hot conductor where the device's filter capacitors leak most. Together they give the highest reading a device can produce, and the limit has to be met **in that condition too**, not just in the comfortable one.

## The sequence
1. **Visual inspection** first: the cord along its whole length, both strain reliefs, the plug and its ground pin, the case, the fan filter, labels, and accessories. A cracked plug or a missing ground pin ends the test here.
2. **Ground wire resistance**, chassis to the plug's ground pin, flexing the cord as you watch.
3. **Chassis leakage** in each condition: normal, reversed, open ground, and reversed with open ground.
4. **Patient lead leakage** in each condition, if the device has applied parts.
5. **Document** every reading with its units, the condition it was taken in, and a clear pass or fail.

Stop at the first failure, tag the device, and do not continue as if the rest will make up for it.

## When the test is run
- At **incoming inspection**, before the device is ever used, which also creates the baseline readings every future test is compared with.
- **After any repair** that touches the power path, the ground, the enclosure, the power supply, or a patient connection.
- On the **scheduled maintenance interval** for that device, as its procedure and your program define it.
- Any time a device has been dropped, flooded, or reported as giving someone a tingle.

## Recording a pass
Write the numbers, not the word "passed". The record should show ground resistance in ohms, the leakage in each condition in microamps, the limit each was judged against, the analyzer used, the date, and your name. Numbers let the next technician see a trend; the word "passed" hides one.

## In the lab
You run the full test on a Class I infusion pump that has just come back from repair, with no conductive patient connection. You read the ground resistance, then chassis leakage in the normal condition and in the worst case, you identify which condition produced the highest reading, you decide pass or fail against the limits card, and you say where the 500 microamp limit comes from.

> Exam tip: 0.5 ohm maximum ground resistance and 500 microamps chassis leakage under NFPA 99 (older editions 300 or 100). Visual, ground, chassis leakage in every condition, then lead leakage. Reversed polarity with the ground open is the worst case, and the limit has to hold there too.`,
      hook: "An electrical safety analyzer sits between the wall and the device so it can measure the ground path, measure leakage through a body-like network, and create faults on purpose by reversing polarity and opening the ground or neutral. Two limits under NFPA 99: ground wire resistance from chassis to the plug ground pin 0.5 ohm maximum, and chassis leakage 500 microamps in every condition in current editions, with older editions at 300 or 100. Conditions: normal, reversed polarity, open ground, reversed with open ground, plus open neutral. Reversed polarity with the ground open is the worst case, because the leakage has no path away and the filters leak most. Sequence: visual and cord check, ground resistance, chassis leakage in each condition, lead leakage, document. Test at incoming inspection, after any repair touching power or enclosure, and on the schedule. Record the numbers, not the word passed."
    },
    {
      id: "u5l3", title: "Reading the Limits: NFPA 99, IEC 60601-1, and a Failing Device", domain: 3, obj: "SAF-D", minutes: 10, lab: "safety-fail",
      body: `Two standards sit behind every safety test you will run, and they do different jobs. **NFPA 99** is the facility standard: it tells a hospital what to test and to what limit. **IEC 60601-1** is the device standard: it tells a manufacturer how safe a device must be by design, and it sets the limits for the parts that touch the patient. You will see both numbers on one limits card.

## The device limits
\`\`\`
IEC 60601-1 limit                            Normal condition   Single fault condition
Earth (ground) leakage                       5 mA               10 mA
Touch (enclosure) current                    100 microamps      500 microamps
Patient leakage, type B and type BF          100 microamps      500 microamps
Patient leakage, type CF                     10 microamps       50 microamps
\`\`\`

Read the two columns before the numbers. The **normal condition** is the device working properly. A **single fault condition** is one thing broken: one open ground, one open neutral, one failed insulation barrier. Standards allow more leakage with one fault present because they assume faults happen and that no single one may be allowed to hurt anybody. Two patterns make the table easy: the fault column is **five times** the normal column for touch and patient leakage; earth leakage is the exception, 5 mA to 10 mA. And **CF is ten times tighter** than B and BF, because 10 microamps to the heart is the number that matters.

Earth leakage is the current flowing in the ground conductor itself and is measured in milliamps, not microamps. It is a much larger number because it is the current the ground wire is there to carry, and comparing it with a 500 microamp chassis limit is a classic exam trap.

## Protection classes
- **Class I**: exposed metal is protected by a third wire, the **protective earth**. The ground pin is a safety device, so ground continuity is the critical test and a defeated ground is an immediate removal from service.
- **Class II**: **double insulated**, no ground pin, marked with a square inside a square. Protection comes from two independent layers of insulation, so there is no ground to measure; you inspect the case and the cord instead, and a cracked case is a safety failure.
- **Internally powered**: it runs on its own battery, so while unplugged it is isolated from the mains entirely. Test it as internally powered on battery, and as its class when the charger is connected, because the charger puts it back on the mains.

## Applied part types
An **applied part** is the piece that deliberately touches the patient: the electrode, the sensor, the cuff, the lead.

\`\`\`
Type   Symbol                     Means                            Patient leakage (normal / fault)
B      stick figure               touches the body, earthed        100 / 500 microamps
BF     stick figure in a box      body floating, isolated          100 / 500 microamps
CF     heart in a box             cardiac floating, heart-safe     10 / 50 microamps
\`\`\`

**Floating** means the patient connection is isolated from the chassis and from earth, so a mains-side fault cannot drive current through the patient to ground. **Defibrillation-proof** parts add paddles to the symbol: the applied part survives a defibrillator discharge without being destroyed and without passing the shock somewhere it should not go.

## Which limit applies to which device
Ask two questions in this order: how is the device protected from the mains, and what touches the patient?

- An infusion pump with a three-prong cord and no conductive patient connection: Class I, so **0.5 ohm** ground and **500 microamps** chassis leakage under NFPA 99.
- A vital-signs monitor with a type BF sensor: the same chassis limits, plus **100 microamps** patient leakage normal and 500 in a single fault.
- A pressure monitor connected through a catheter to the heart, or an internal pacing device: type **CF**, so **10 microamps** normal and 50 in a single fault.
- A double-insulated hand tool with a two-prong plug: Class II, so there is no ground measurement to make, and the inspection is the case, the cord, and its leakage.

When the device and the standard disagree, the tighter number wins, and the manufacturer's service manual can be tighter than the standard.

## What you do when a reading fails
1. **Stop.** Do not continue the test hoping for a better number, and never average a failing reading with passing ones.
2. **Remove it from service and tag it.** A clear tag that says out of service, the date, your name, and why. Physically separate it from equipment that is ready for use so nobody grabs it.
3. **Document every reading**, with the condition, the limit, and the standard the limit came from.
4. **Tell the department** it came from, so they can get a replacement rather than hunt for this one.
5. **Repair**, which for leakage is usually a power-supply filter capacitor, a damaged cord, a wet or contaminated interior, or a failing ground connection.
6. **Retest the full sequence** and document the passing numbers. The retest, not the repair, is what returns the device to service.

## Leakage trends
Keep comparing each reading with the last one on that device. A chassis leakage that reads 90, then 150, then 310 microamps across three inspections passes every time and is a device whose insulation is on its way out. A ground resistance creeping from 0.08 toward 0.3 ohm is a cord that will fail. Acting on a trend is planned work; waiting for the limit is an emergency.

## In the lab
You test a Class I vital-signs monitor with a type BF sensor and run the whole sequence: ground resistance, chassis leakage in every condition, and patient lead leakage in every condition. One reading is over its limit. You find it, name the limit and the standard it broke, decide the verdict, choose what happens to the monitor next, and say which limit would have applied if that sensor had been type CF.

> Exam tip: IEC 60601-1 normal and single fault, in microamps unless stated: touch 100 / 500, patient leakage B and BF 100 / 500, CF 10 / 50, and earth leakage 5 mA / 10 mA. Class I has a protective earth, Class II is double insulated with no ground to test. One failing reading in any condition fails the device: tag it, document it, repair it, retest it.`,
      hook: "NFPA 99 is the facility standard (what a hospital tests and to what limit); IEC 60601-1 is the device standard. IEC 60601-1, normal / single fault: earth leakage 5 mA / 10 mA, touch current 100 / 500 microamps, patient leakage type B and BF 100 / 500 microamps, type CF 10 / 50 microamps. A single fault condition is one thing broken, and the fault column is five times the normal one for touch and patient leakage; earth leakage is the exception, 5 mA to 10 mA. Class I is protected by a third-wire protective earth, Class II is double insulated with no ground to test and is marked with a square in a square, internally powered runs isolated on its battery. Applied parts: type B stick figure, type BF stick figure in a box and isolated, type CF heart in a box for direct cardiac connection, and defibrillation-proof parts add paddles. On a fail: stop, tag out of service, document every reading with its limit, notify the department, repair, and retest the full sequence. Trend each reading against the last."
    },
    {
      id: "u5l4", title: "Lockout Tagout, Safety Data Sheets, and Hazard Communication", domain: 3, obj: "SAF-A", minutes: 9,
      body: `An autoclave with the panel off, a surgical table raised on its column, a defibrillator with the cover removed, a drum of floor cleaner that got decanted into an unlabeled bottle. Every one of those is somebody about to be hurt by energy or a chemical they thought was handled. The controls for both are procedures, and both are written down before you need them.

## Lockout tagout, in order
**LOTO** is the procedure that makes equipment safe to work on by making it impossible to energize while you are inside it.

1. **Notify** everyone affected: the department, the users, and anyone else who might come looking for the device.
2. **Shut it down** by its normal controls, in the normal order.
3. **Isolate** the energy source: unplug it, open the disconnect, close the gas valve, remove the battery.
4. **Lock and tag.** Your own lock on the isolating device, and a tag with your name, the date, and why.
5. **Release stored energy.** Discharge capacitors, lower what is raised, bleed pressure, release spring tension, let hot parts cool.
6. **Verify zero energy** before you reach in. Measure it. An indicator light that is off is not proof of anything, because the lamp may simply be dead.

Only the **person who applied a lock removes it**. Not the next shift, not a supervisor who needs the room, not a helpful colleague. If a lock has to come off and its owner cannot be found, that is a documented procedure involving the manager, not a bolt cutter and a shrug.

## Stored energy is the part people forget
Isolating the mains does not make a device inert.

- **Capacitors**, in a defibrillator or any switching power supply, can hold a lethal charge for a long time after the plug comes out. Discharge them by the method the manual gives and then measure to confirm.
- **Springs**, in beds, lifts, doors, and table columns, release instantly when you remove the fastener holding them.
- **Pressure**, in gas lines, cuffs, hydraulics, autoclaves, and sterilizers. Bleed it and read the gauge at zero.
- **Gravity**: anything raised must be lowered or physically blocked before you put a hand under it.
- **Batteries**, which keep a device live after it is unplugged and are their own energy source to isolate.
- **Heat**, in autoclaves, warming cabinets, and lamps.

One device often has several at once: a mains cord, an internal battery, a charged capacitor bank, and a gas supply. Isolate all of them.

## Hazard communication
The right to know what you are working with is a rule, not a courtesy. **OSHA** requires labeled containers, access to a safety data sheet for every chemical, training on the hazards, and records of all of it. **GHS** is the global labeling system that standardizes what the label looks like, so a product label carries the product name, a signal word (danger or warning), hazard statements, precautions, the supplier, and the pictograms.

Pictograms worth knowing on sight:

- **Flame**: flammable.
- **Flame over a circle**: an oxidizer, the one that makes other things burn harder. This is the oxygen pictogram.
- **Skull and crossbones**: acute toxicity.
- **Corrosion**: eats skin, eyes, or metal.
- **Exclamation mark**: irritant or less severe hazard.
- **Silhouette with a star burst on the chest**: a longer-term health hazard.
- **Gas cylinder**: gas under pressure.
- **Environment**: harmful to aquatic life.

A chemical decanted into another container gets a label with the same information. An unlabeled bottle on a bench is a hazard with no instructions.

## The safety data sheet
Every chemical has an **SDS** with **16 numbered sections** in the same order every time, and it must be reachable by staff at any hour, including the night shift. You do not read all sixteen. You read these:

\`\`\`
Section 2   hazards: what it can do to you
Section 4   first aid: what to do in the first minute
Section 5   fire fighting: which extinguisher, and what not to use
Section 7   handling and storage: how to keep it and what it must not sit next to
Section 8   exposure controls and PPE: gloves, eye protection, ventilation
\`\`\`

## The chemicals in your shop
Solvents and contact cleaners, isopropyl alcohol, disinfectant wipes and sprays, battery electrolyte from a leaking lead-acid pack, flux and solder, adhesives and thread lockers, compressed and liquefied gases, and cylinder cleaning agents. Every one has a sheet. The most common injuries are splashes to the eye and skin burns from electrolyte, with solvent vapor in a closed room a close third.

So: know where the **eyewash station** is and how long to use it (keep the eye in the stream and hold the lids open, for the full time the sheet states), work with volatile chemicals under **ventilation** or a fume hood rather than at a closed bench, keep lids on, keep oxidizers away from flammables, never mix cleaners, and wear what section 8 tells you to wear.

> Exam tip: LOTO order is notify, shut down, isolate, lock and tag, release stored energy, verify zero energy. Only the person who placed a lock removes it. Stored energy means capacitors, springs, pressure, gravity, batteries, and heat. An SDS has 16 sections; you open 2 hazards, 4 first aid, 5 fire, 7 handling, 8 protective equipment.`,
      hook: "LOTO in order: notify, shut down, isolate the energy source, apply your own lock and tag, release stored energy, verify zero energy with a meter or gauge. Only the person who applied the lock removes it. Stored energy includes charged capacitors, springs, pressure, raised loads, batteries, and heat, and one device often has several at once. Hazard communication: OSHA requires labels, SDS access at any hour, training, and records; GHS standardizes the label with a signal word, hazard statements, and pictograms (flame flammable, flame over a circle oxidizer, skull acute toxicity, corrosion, exclamation mark irritant, silhouette health hazard, gas cylinder, environment). An SDS has 16 sections; read 2 hazards, 4 first aid, 5 fire fighting, 7 handling and storage, 8 exposure controls and PPE. Label every decanted container, know the eyewash station, and use ventilation."
    },
    {
      id: "u5l5", title: "Medical Gas Color Codes, Signage, and Symbols", domain: 3, obj: "SAF-A", minutes: 9,
      body: `A gas cylinder is a few hundred pounds of pressure with a valve on top, and the wrong gas plumbed into the right fitting is a patient event. Hospitals prevent that with colors, with fittings that only mate one way, and with signs. Your job is to read all three without hesitating.

## The colors, in the United States
\`\`\`
Gas                  Color    Used for
oxygen               green    oxygen therapy, anesthesia machines, blenders
medical air          yellow   driving ventilators, air for mixing, surgical tools
nitrous oxide        blue     anesthesia
nitrogen             black    driving surgical instruments
carbon dioxide       gray     insufflation for laparoscopy
vacuum (suction)     white    suction, waste gas scavenging
\`\`\`

These are the United States colors, and they are not the same everywhere: other countries assign white to oxygen, for example, so a cylinder that arrives from abroad is identified by its **label**, not its paint. The label is the legal identification of the contents in every country. Color gets your attention; the label and the fitting confirm it.

## Cylinders and pressures
Small cylinders are lettered by size. An **E cylinder** is the one strapped to a transport cart or the back of a wheelchair; an **H cylinder** is the tall one chained in a rack or a manifold room.

- A **full E cylinder** holds about **2,000 to 2,200 psi** and delivers about **660 liters** of gas.
- **Wall outlets and pipeline terminals** deliver about **50 psi** to the device, which is the pressure a ventilator or a flowmeter expects.

A **regulator** does that reduction: a high-pressure gauge reads what is left in the cylinder, and the regulator drops it to working pressure for the flowmeter or the device. Two consequences follow. A cylinder gauge tells you remaining contents, not flow. And a device fed directly from a cylinder without a regulator is being fed about forty times its working pressure.

## Fittings that only fit
- The **pin index safety system** is used on small cylinder valves: a pattern of pins and holes unique to each gas, so an oxygen regulator physically cannot mount on a nitrous oxide cylinder.
- The **diameter index safety system** is used on pipeline and wall outlet connections: each gas has its own thread and shoulder diameters, so hoses cannot cross-connect.
- Quick-connect wall fittings are keyed per gas in the same spirit.

The rule that comes out of all of it: **no adapters, and never force a fitting.** A connection that does not go together is telling you something true. Likewise **no oil, no grease, no tape** on an oxygen fitting, because oxygen is an oxidizer: it does not burn, it makes everything else burn harder, and a trace of hydrocarbon in a high-pressure oxygen stream can ignite. If a fitting leaks, the answer is the correct washer or a repair, not a wrap of tape.

## Handling and storage
- Cylinders are **secured upright**, chained, racked, or in a cart stand. Never free-standing, never lying loose on a bed or a cart.
- **Valve caps on** whenever a cylinder is not in use or in transit. A knocked-off valve turns a cylinder into a projectile.
- **Full separated from empty**, with empties marked, so nobody grabs a dead cylinder in an emergency.
- Stored in a **ventilated**, cool place away from heat, flames, and electrical sources, and never oxygen next to flammables.
- Transported with a cart, not carried, and never rolled or dragged by the valve.

## Zone valves
A **zone valve** is a labeled shutoff behind a glass or a cover that isolates the medical gas supply to one area: an operating room, a wing, a floor. The label states the gas and the area it serves. Closing one stops the gas to everything downstream, including devices keeping people alive, so it is closed by the people whose procedure says to close it, in a fire or a leak, with clinical staff notified. Know where they are before you need them, and never block access to one with equipment.

## Signs and labels around the building
- **Oxygen in use** and **no smoking**: an oxygen-enriched area, so no ignition sources.
- **Ionizing radiation**: the three-blade trefoil, on X-ray rooms, dose areas, and radioactive material.
- **Laser in use**: the door sign states the class and the wavelength, and eyewear has to match that wavelength rather than merely being dark.
- **Biohazard**: regulated waste, sharps containers, specimen transport.
- **MRI zones** and the magnetic field warnings: the magnet is always on, so the sign is permanent and absolute.

## Symbols on the device itself
\`\`\`
Stick figure                  type B applied part
Stick figure in a box         type BF applied part, isolated
Heart in a box                type CF applied part, heart-safe
Paddles added to the symbol   defibrillation-proof applied part
Square inside a square        Class II, double insulated
Book with a hand, or an i     consult the instructions for use
Triangle with an exclamation  general warning, read the manual before acting
\`\`\`

Those symbols are how a device tells you which limits apply to it when there is no manual in your hand, which is exactly the situation on the floor at two in the morning.

> Exam tip: United States colors are oxygen green, medical air yellow, nitrous oxide blue, nitrogen black, carbon dioxide gray, vacuum white. A full E cylinder is about 2,000 to 2,200 psi and about 660 liters; wall outlets deliver about 50 psi. The pin index safety system is for small cylinders, the diameter index safety system for pipelines. No adapters, no forcing, no oil on oxygen.`,
      hook: "United States medical gas colors: oxygen green, medical air yellow, nitrous oxide blue, nitrogen black, carbon dioxide gray, vacuum white; elsewhere the colors differ, so the label is the identification. A full E cylinder is about 2,000 to 2,200 psi and about 660 liters, an H cylinder is the tall racked one, and wall outlets deliver about 50 psi through a regulator. Small cylinders use the pin index safety system, pipelines use the diameter index safety system, so no adapters and never force a fitting. Oxygen is an oxidizer: no oil, grease, or tape. Secure cylinders upright, caps on, full separated from empty, ventilated storage, moved on a cart. Zone valves are labeled shutoffs for one area. Device symbols: stick figure type B, in a box type BF, heart in a box type CF, paddles defibrillation-proof, square in a square Class II, book and hand consult the instructions, triangle warning."
    },
    {
      id: "u5l6", title: "Infection Control, Standard Precautions, and PPE", domain: 3, obj: "SAF-C", minutes: 9,
      body: `You go where the patients are, you touch what they touched, and you carry your tools and your hands from one room to the next. That makes a technician a possible route of transmission, and infection control the part of safety that protects other people from you as much as it protects you.

## Hand hygiene is the whole program in one habit
Wash or sanitize before you enter a room, after you leave, before and after touching a device, and **again after gloves come off**, because gloves tear and hands get contaminated as they are removed. Soap and water when hands are visibly soiled and for certain organisms that alcohol does not kill; alcohol rub otherwise, rubbed until dry. No single practice prevents more transmission, and no amount of other protection substitutes for it.

## Standard precautions
**Standard precautions**, once called universal precautions, is one sentence: treat **every** patient's blood, body fluids, secretions, non-intact skin, and mucous membranes as infectious, regardless of their diagnosis or how healthy they look. You are never told who is infectious, because nobody knows for certain, including the patient. So the protection is chosen by the task, not by the person. **Transmission-based precautions** are added on top of standard precautions when an organism needs more, and the sign on the door says which.

## PPE, and the order that matters
\`\`\`
Putting it on   gown, mask or respirator, eye protection, gloves
Taking it off   gloves, eye protection, gown, mask or respirator
\`\`\`

Gloves go on last and come off first, because they are the dirtiest thing in the room. Remove everything at the doorway, into the right bin, then do hand hygiene. The order exists so that nothing dirty crosses your face or your clothes on its way to the trash.

- **Gloves** for anything that may contact fluids, contaminated surfaces, or chemicals; one task, one pair, and never a pair worn out into the corridor.
- **Gowns** when your arms or clothing could be contaminated.
- **Surgical masks** stop your droplets and splashes toward your mouth and nose. They are not respirators and they do not seal.
- **N95 respirators** filter fine airborne particles and only work if they **seal** to your face, which is why they are **fit tested** and why facial hair breaks them.
- **Eye protection**: goggles or a face shield whenever something could splash or spray, including when you are opening a device that has suction or fluid in it.

## Sharps
A sharp goes **straight into the sharps container** and nowhere else: not a pocket, not a tray, not a bench, not a regular trash can. You will meet needles left in equipment, broken glass from a specimen, and wire ends and lancets. Never reach blindly into a bin, a drawer, or the bottom of a cart. If you are stuck, wash the area, report it immediately, and follow the exposure procedure, because treatment decisions are time-sensitive.

## Clean, disinfect, sterilize
These are three different things, and the level required depends on what the item touches. That ranking is the **Spaulding** classification.

\`\`\`
Category        Touches                      Treatment
critical        sterile tissue or bloodstream  sterilization
semi-critical   mucous membranes               high-level disinfection
non-critical    intact skin                    low-level disinfection
\`\`\`

**Cleaning** is the physical removal of soil and is the prerequisite for everything else: you cannot disinfect something that is dirty, because the soil shields the organism. **Disinfecting** kills most organisms on a surface, and the product's **contact time** is part of the instruction, so a surface wiped and immediately dried was not disinfected. **Sterilizing** destroys everything, including spores, by steam, gas, or chemical process.

## The device on your bench
A device is **cleaned and wiped down on the unit before it comes to you**, and you are entitled to ask for that. If something arrives visibly soiled, do not open it: send it back to be cleaned, or clean it yourself with full protection on. Then clean it again before it goes back to the floor, using a disinfectant the manufacturer approves, because the wrong chemical crazes plastic, clouds screens, and eats keypad legends. Clean your tools and the bench too, and keep a clean side and a dirty side.

## Isolation signs
- **Contact precautions**: gown and gloves, because the organism spreads by touch and on surfaces. Equipment may have to stay in the room.
- **Droplet precautions**: a surgical mask within a few feet, for organisms that travel on large droplets.
- **Airborne precautions**: a fit-tested **N95** or better, and the door stays closed, because the particles stay suspended.

Read the sign before you enter, and if you do not know what it requires, ask the nurse rather than guessing. Nobody in a hospital minds that question.

## Bloodborne pathogens and exposure
The organisms the rules were written around are **hepatitis B**, **hepatitis C**, and **HIV**, carried in blood and some body fluids. Your employer is required to offer the **hepatitis B vaccine** at no cost to employees with occupational exposure risk, and taking it is the single most effective protection available to you.

After a needlestick, a cut with a contaminated sharp, or a splash to the eyes, nose, or mouth: wash or flush the site immediately with soap and water or the eyewash, **report it right away** to your supervisor and employee health, and get evaluated. Preventive treatment is most effective within hours, so the thing that ruins an exposure is waiting until the end of your shift.

> Exam tip: hand hygiene first, last, and after gloves. Standard precautions treat everyone's fluids as infectious. PPE on: gown, mask, eye protection, gloves. Off: gloves, eye protection, gown, mask. Spaulding: critical sterilized, semi-critical high-level disinfected, non-critical low-level disinfected. Airborne needs a fit-tested N95; a surgical mask is not one.`,
      hook: "Hand hygiene before, after, and again when gloves come off. Standard precautions: treat every patient's blood and body fluids as infectious regardless of diagnosis, and add transmission-based precautions when the door sign says so. PPE on in the order gown, mask or respirator, eye protection, gloves; off in the order gloves, eye protection, gown, mask. A surgical mask is not an N95, and an N95 only works fit tested and sealed. Sharps go straight into the sharps container. Spaulding: critical items that enter sterile tissue are sterilized, semi-critical items touching mucous membranes get high-level disinfection, non-critical items touching intact skin get low-level disinfection; cleaning comes first and contact time matters. Devices are cleaned before the bench and again before returning. Isolation: contact gown and gloves, droplet surgical mask, airborne fit-tested N95 with the door closed. Bloodborne pathogens are hepatitis B, hepatitis C, and HIV; the hepatitis B vaccine is offered free, and an exposure is washed and reported immediately."
    },
    {
      id: "u5l7", title: "Device-Specific Hazards: Imaging, Defibrillators, Lasers, MRI, Lab Equipment, and Fire", domain: 3, obj: "SAF-D", minutes: 10,
      body: `General safety habits keep you alive in most of the building. A handful of areas have a hazard that will hurt you faster than your habits can react, and in each one the rule is specific, short, and not negotiable. Learn the rule before you are sent to the room.

## X-ray, fluoroscopy, and computed tomography
Ionizing radiation does its damage quietly and cumulatively, and the protection is three levers, summed up as **ALARA**: as low as reasonably achievable.

- **Time**: less time in the room while the beam is on. Fluoroscopy is the one that runs for minutes.
- **Distance**: dose falls off sharply as you step back, so a pace or two matters more than it feels like it should.
- **Shielding**: stand behind the barrier or the leaded glass, or wear the lead apron and thyroid collar if you must be in the room.

Wear your **dosimeter** where you were told to wear it, outside the apron at the collar, because a badge in a drawer records nothing and a badge under the apron under-reads. Never hold a patient or a cassette by hand during an exposure, and never let a service procedure put a beam on while anyone is unshielded in the room.

## Magnetic resonance imaging
The one rule that covers most of it: **the magnet is always on**, even when the system is idle, powered down, or being serviced, because the field comes from a superconducting coil that is never switched off.

- **Projectiles** are the killer. A steel tool, an oxygen cylinder, a floor polisher, or a pair of scissors becomes a missile pulled into the bore at speed. People have died from this.
- The room is zoned **I to IV**, from public access through to the magnet room itself, with screening before anyone passes into the controlled zones.
- Take in only **non-ferrous**, labeled tools: titanium, aluminum, brass, plastic. Empty your pockets of badges, keys, phones, and cards, and leave an analyzer or a toolbox outside unless it is labeled for the room.
- Items are labeled **MR Safe**, **MR Conditional** (allowed only under stated limits), or **MR Unsafe**.
- A **quench** is the sudden boil-off of the liquid helium that keeps the magnet superconducting, planned or accidental. It vents a huge volume of helium gas, which displaces oxygen, so the response is get everyone out and do not re-enter until the room has been cleared.
- Never enter alone, and never let anyone in on your badge who has not been screened.

## Ultrasound
No ionizing radiation and no magnet, so the hazards are ordinary and still real: probe damage and cracked lenses that let fluid in, cleaning and high-level disinfection requirements that depend on what the probe touched, cables that fail from being run over, and lifting and ergonomic strain on a heavy cart. A damaged probe is both an image problem and a patient-contact problem.

## Defibrillators
After charging, the capacitor holds a **lethal** charge, and it keeps holding it after the device is off and unplugged.

- Call **clear** loudly and make sure nobody, including you, is touching the patient, the bed, or anything conductive in contact with either.
- Dump a charge into the **analyzer or test load**, or use the device's own disarm, and then confirm it is discharged before you open anything.
- Service it with the manual's discharge procedure, and treat the internal capacitor as live until you have measured otherwise.
- Pads and paddles: adhesive pads are placed and left alone and have an expiration date, paddles need gel and firm contact. Expired pads and a dead battery are the two most common reasons a defibrillator fails when it is finally needed, which is why the daily check and the self-test log exist.

## Electrosurgery
An **ESU** pushes high-frequency current through the patient to cut and coagulate, and the current returns through a **return electrode** pad on the skin. Spread across the whole pad the current density is harmless. If the pad lifts partway, dries out, or is placed over a bony prominence or a scar, the same current leaves through a smaller area and **burns** the patient. So: check the pad, the cable, and the contact-quality monitor and its alarm; look for fluid pooling under the pad; and remember that burns can also happen at a different grounded contact point if the return path is poor.

## Lasers
Light concentrated enough to cut will blind you before you know it happened, and reflections count.

- Door signs state the **class** and the **wavelength**. Class 3B and Class 4 are the surgical ones that damage eyes and skin.
- **Eyewear must match the wavelength**; dark glasses are not laser protection, and the wrong filter is no filter.
- Everyone in the room wears it, including you and the patient. Door interlocks and warning lights stay functional.
- Keep reflective instruments out of the beam path, watch for a fire risk with oxygen and drapes, and use the smoke evacuator.

## Laboratory equipment
- **Centrifuge**: never open the lid while the rotor is spinning, and never defeat the lid interlock. Inspect the rotor for cracks and corrosion, keep loads balanced, and replace a rotor at the manufacturer's life limit. A failed rotor at full speed destroys the machine and anything near it.
- **Chemicals and biohazard**: analyzers hold reagents, acids, and patient specimens. Protection on, and the safety data sheet before you open a reagent compartment.
- **Autoclaves and sterilizers**: steam under pressure burns badly, and a chamber or jacket can stay pressurized and hot long after the cycle ends. Bleed it, verify zero pressure on the gauge, and let it cool.

## Fire
\`\`\`
RACE   rescue anyone in danger, alarm, confine by closing doors, extinguish or evacuate
PASS   pull the pin, aim at the base, squeeze, sweep side to side
\`\`\`

Extinguisher classes: **A** ordinary combustibles like paper and cloth, **B** flammable liquids, **C** energized electrical equipment, **K** kitchen oils and fats. Use a rated extinguisher on electrical equipment and never water. An oxygen-enriched room raises the risk of everything, which is why oxygen cylinders and ignition sources are kept apart, and why your job in a fire is usually rescue, alarm, and closing the door rather than fighting it.

## Mechanical and ergonomic hazards
Beds, stretchers, tables, lifts, and chairs are heavy powered machines with **pinch points**, and they move while you are reaching into them. Block or lower what is raised, keep fingers out of scissor mechanisms, and remember that somebody may press a control while your hand is inside, so isolate the power. Lift with your legs and a straight back, get a cart for anything awkward, and ask for help rather than becoming the next incident report.

## What you wear, area by area
\`\`\`
Area              Protection you put on before you start
imaging           lead apron and thyroid collar if in the room, dosimeter, barrier or leaded glass
magnet room       nothing ferrous: emptied pockets, non-ferrous labeled tools, screening
defibrillator     insulated tools, dry hands, a discharged capacitor confirmed by measurement
electrosurgery    gloves, eye protection, and smoke evacuation at the site
laser room        eyewear rated for that wavelength, worn by everyone including the patient
laboratory        gloves, eye protection, gown or coat, and the safety data sheet read first
autoclave         heat-resistant gloves, eye protection, zero pressure verified
mechanical work   gloves, blocked or lowered loads, power isolated, help for heavy lifts
\`\`\`

The pattern is the same everywhere: name the hazard, then put on the control that matches it. Protection chosen after the job starts is protection chosen too late.

> Exam tip: ALARA is time, distance, shielding, plus your dosimeter. The magnet is always on and projectiles are the danger. A charged defibrillator capacitor is lethal after power off. A lifted electrosurgery return pad burns the patient. Laser eyewear must match the wavelength. RACE is rescue, alarm, confine, extinguish; PASS is pull, aim, squeeze, sweep; classes A, B, C, K.`,
      hook: "Radiation: ALARA means time, distance, shielding, with the dosimeter worn where you were told. MRI: the magnet is always on, projectiles kill, zones I to IV with screening, non-ferrous tools only, items labeled MR Safe, MR Conditional, or MR Unsafe, and a quench displaces oxygen so evacuate. Ultrasound hazards are probe damage, disinfection, and lifting. Defibrillators hold a lethal capacitor charge after power off: call clear, dump into the analyzer or disarm, and check pad expiry and battery. Electrosurgery returns current through a pad, so a lifted or dried pad burns the patient. Lasers: the sign gives class and wavelength, and eyewear must match the wavelength. Centrifuge: lid lock, balanced load, inspect the rotor. Autoclave: steam and pressure stay after the cycle. Fire: RACE rescue, alarm, confine, extinguish; PASS pull, aim, squeeze, sweep; classes A ordinary, B liquids, C electrical, K kitchen oils. Mechanical: pinch points, block what is raised, isolate power, lift with your legs."
    }
  ]
});
