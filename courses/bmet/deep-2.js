// BMET Academy deeper explanations, units 4 and 5. Original content, written for a reader with no background.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u4l1: `## Why conversion is multiplying by one
Every conversion factor is a way of writing the number one. Because 1 inch and 2.54 cm are the same length, the fraction {{2.54 cm / 1 inch}} equals one, and multiplying by one never changes a quantity, only the words it is written in. That is the whole method, and it is why you can always check yourself: write the units into the arithmetic and cancel them like numbers. If the unit you wanted survives, you multiplied the right way up.

\`\`\`
Problem                        Set it up                        Answer
70 kg to pounds                70 kg x 2.2 lb / 1 kg            154 lb
8 inches to centimeters        8 in x 2.54 cm / 1 in            20.3 cm
0.42 mA to microamps           0.42 x 1,000                     420 microamps
500 microamps to milliamps     500 / 1,000                      0.5 mA
20 cmH2O to mmHg               20 / 1.36                        14.7 mmHg
100 kPa to mmHg                100 x 7.5                        750 mmHg
30 psi to mmHg                 30 x 51.7                        1,551 mmHg
125 mL/h to mL/min             125 / 60                         2.08 mL/min
\`\`\`

If you had divided the 70 kg by 2.2 you would have got 31.8, and the units would have told you so: kg divided by lb per kg leaves kg squared per pound, which is not a weight. Nobody writes that out on the bench, but the habit of asking "should the number get bigger or smaller?" is the same check in a faster form. A kilogram is more than a pound, so the number of pounds must be larger.

## The prefix ladder
\`\`\`
Unit         Steps from the base   Multiply by   Example
kilo         3 up                  1,000         1 kg = 1,000 g
base         0                     1             gram, meter, amp, liter
centi        2 down                0.01          1 cm = 0.01 m
milli        3 down                0.001         1 mA = 0.001 A
micro        6 down                0.000001      1 microamp = 0.000001 A
nano         9 down                1e-9          wavelengths of light
\`\`\`

Milli to micro is three steps, which is why the point moves three places and why 0.5 mA and 500 microamps are the same current. You will do that one more than any other conversion, because leakage limits are published in microamps and plenty of meters read in milliamps.

## Temperature, the one that needs the formula
\`\`\`
Direction          Formula                      Check
Celsius to F       F = C x 9/5 + 32             37 C = 66.6 + 32 = 98.6 F
F to Celsius       C = (F minus 32) x 5/9       98.6 F = 66.6 x 5/9 = 37 C
\`\`\`

The subtraction comes first going down and last going up, because the two scales do not share a zero. Keep the three anchor pairs in your head (0 and 32, 37 and 98.6, 100 and 212) and you will catch a reversed formula in one second: any body temperature in Fahrenheit is near 100, so an answer of 2.8 or 212 is a reversed formula, not a sick patient.

## The habit that prevents the error
Write the unit next to every number, every time, in your notes and in the record. Convert once, in writing, before comparing a reading with a limit, and write the converted value with its unit beside the original. A record that says {{ground 0.12 ohm, chassis leakage 48 microamps (limit 500 microamps)}} can be checked by anybody. A record that says {{0.12 / 48}} cannot be checked by anybody, including you, next year.`,

u4l2: `## Three different numbers people confuse
\`\`\`
Term         What it describes                             Example
resolution   the smallest change the instrument can show   a 1 mL graduation; a meter's last digit
accuracy     how close a reading is to the truth           plus or minus 1% of reading
tolerance    how far the device under test may be off      flow accuracy plus or minus 5%
\`\`\`

They get muddled because all three are written as small numbers near a measurement. Keep them apart by asking who each one describes. Resolution and accuracy describe **your instrument**. Tolerance describes **the device you are testing**. A meter with 1% accuracy cannot sensibly judge a device whose tolerance is 1%, because the limit and the uncertainty are the same size; a good rule of thumb is an instrument several times better than the tolerance you are judging.

Digital meter accuracy is usually written as a percentage of the reading plus a number of counts in the last digit, such as plus or minus (1% + 2 digits). On a 6.40 V reading that is 0.064 V from the percentage and 0.02 V from the digits, so the true voltage is somewhere around 6.40 plus or minus 0.08 V. Precision without accuracy is a meter that gives you the same wrong answer every time, which is why instruments go away for calibration against a traceable standard on a schedule, and why a calibration sticker with an expired date invalidates every reading you took with it.

## Reading an analog scale, in steps
\`\`\`
Step   What you do                                   On the lab's voltmeter
1      note the range the instrument is on           0 to 10 V
2      count the small ticks between two numbers     five ticks between 6 and 7
3      divide to get the value of one tick           1 V / 5 = 0.2 V per tick
4      find the last tick passed, add the rest       two ticks past 6
5      write the reading with its unit               6.4 V
\`\`\`

Parallax is worth one more sentence, because it is the error that feels like carefulness. The needle floats above the printed scale, so an eye off to the side sees it against a mark it is not over. Square your eye to the face, or line the needle up with its reflection in the mirror strip if the instrument has one. Then let the reading settle before you write it: a needle still drifting is a measurement still happening.

## Percent error and tolerance, worked
\`\`\`
Expected   Measured   Percent error                      5% band        Verdict
40 mL      37 mL      (37-40)/40 x 100 = -7.5%           38 to 42 mL    fail
40 mL      41 mL      (41-40)/40 x 100 = +2.5%           38 to 42 mL    pass
100 mL/h   103 mL/h   (103-100)/100 x 100 = +3%          95 to 105      pass
200 J      184 J      (184-200)/200 x 100 = -8%          190 to 210 J   fail
\`\`\`

Three habits make this reliable. Divide by the **expected** value, never by the measured one. **Keep the sign**, because a device consistently low and a device consistently high usually have different causes, and because a trend of growing negative error is a story. And turn the tolerance into real units before you judge anything, since "5%" is not a number you can compare a milliliter to.

## Significant figures without the jargon
Write the digits the instrument earned and no more. A cylinder graduated in whole milliliters earns 37 mL, and maybe 37.5 mL if you estimate between marks. It does not earn 37.48 mL, and writing that implies an instrument you do not have. In the other direction, dropping digits a device did give you (writing 6 V when the meter said 6.4 V) throws away the resolution you paid for and can turn a failing device into a passing one.`,

u4l3: `## The paper, and what one box is worth
\`\`\`
Direction   Feature              Value at standard settings
across      paper speed          25 mm/s
across      small box (1 mm)     0.04 s
across      large box (5 mm)     0.2 s
up          normal gain          1 mV = 10 mm tall
\`\`\`

Confirm both settings before you measure. A strip run at 50 mm/s stretches every interval to twice its width, so the 300 method on that strip reports half the real rate, and half gain halves every amplitude. Monitors print the speed and gain on the strip for exactly this reason, and a calibration pulse (a square step of a known 1 mV) is often printed with it.

## Rate, three ways, with the arithmetic
\`\`\`
Method        Count this                    Divide or multiply   Worked example
300 method    large boxes between R waves   300 / boxes          4 large boxes = 75 bpm
1,500 method  small boxes between R waves   1,500 / boxes        20 small boxes = 75 bpm
six-second    complexes in six seconds      count x 10           10 complexes = 100 bpm
\`\`\`

The first two measure one interval and assume the rest match it. They are quick and precise on a steady rhythm, and the 1,500 method is the finer of the two because a small box is a fifth of a large one. The six-second method measures a span instead of an interval, so it averages an irregular rhythm rather than being fooled by whichever interval you happened to pick. That is why it is the clinical default when the rhythm is irregular, and why the lab asks you to use it.

## Period and frequency are one number seen twice
\`\`\`
Known          Formula       Worked
period 0.8 s   f = 1 / T     1 / 0.8 = 1.25 Hz, which is 75 per minute
60 Hz          T = 1 / f     1 / 60 = 0.0167 s = 16.7 ms
rate 75 bpm    T = 60 / bpm  60 / 75 = 0.8 s between beats
\`\`\`

Those three lines connect this lesson to the mains power in unit 3 and to the alarm limits on a monitor. Beats per minute is just a frequency measured in a friendlier unit: divide by 60 for hertz, multiply by 60 to go back.

## Waveshapes and what they tell you
\`\`\`
Shape              Looks like                              You see it in
sine               smooth symmetrical swings, no corners   mains power, test tones, interference
square             snaps between two levels and holds      digital lines, switching supplies, pacing pulses
arterial pressure  sharp upstroke, notch, slow decline     invasive blood pressure traces
\`\`\`

Amplitude is always measured from the **baseline**, the level the trace rests at between events, not from the bottom edge of the paper. At normal gain a 12 mm complex is 1.2 mV.

## Artifact: three patterns and their fixes
\`\`\`
Pattern                          Looks like                        Usual cause
60 Hz interference               regular fine fuzz on the baseline  mains nearby, dry electrode, poor ground
motion                           wandering baseline, ragged spikes  patient moving, being moved, shivering
loose or dry electrode           square steps, one flat lead        electrode, lead wire, or connection
\`\`\`

Work the patient end first, every time: electrode age and placement, skin prep, the lead wire, then the cable, then the device. Two shortcuts earn their keep. Anything perfectly regular and far faster than a heartbeat is electrical rather than physiological. And when one lead misbehaves while the others look fine, the fault is in that lead's path, which you can prove in a minute by moving the lead wire to a known-good electrode.`,

u4l4: `## Read the frame before the picture
A graph is a claim, and the axes are the fine print. Three questions, in order: what does the horizontal axis measure, what does the vertical axis measure and in what units, and where does the vertical scale start and end? A vertical axis that begins at 95 instead of 0 turns a 2% wobble into a mountain range, and a scale that runs to 10,000 flattens a doubling into a shrug. Chart software picks those scales for looks, not for truth, so the shape of a line means nothing until you have read its scale.

To take a value off a line: go up from the point on the horizontal axis, stop at the line, go across to the vertical axis, read the nearest gridline and estimate one digit between gridlines, the same discipline as reading a meter.

\`\`\`
Chart type    Good for                        Watch out for
line          change over time                a vertical scale that does not start at zero
bar           comparing separate categories   bars that share no common baseline
table         exact values and specifications  reading across the wrong row
\`\`\`

## Tables: row then column, always
\`\`\`
Model     Flow accuracy    Fuse          Battery run time
IP-100    plus/minus 5%    1 A, 250 V    6 h
IP-200    plus/minus 2%    2 A, 250 V    8 h
IP-200X   plus/minus 2%    2 A, 250 V    10 h
\`\`\`

Find your model's row, travel along it to the column you want, read the cell, then read the column's unit. Doing it in that fixed order protects you from the error that gives a plausible wrong answer: the IP-100 tolerance applied to an IP-200, or a 2 A fuse fitted to a device that wanted 1 A. Lookup tables (wire colors, gas colors, fuse ratings, error codes) are the same discipline with no arithmetic, and they are looked up every time rather than remembered.

## Trends: the most valuable thing in the record
\`\`\`
Inspection     Chassis leakage   Change from last   Against the 500 microamp limit
two years ago  90 microamps      -                  passes
last year      150 microamps     +67%               passes
this year      310 microamps     +107%              passes
\`\`\`

Three passes and one obvious conclusion. Insulation that leaks twice as much each year will cross 500 microamps before the next inspection, so this device gets looked at now, as planned work, rather than failing in a patient room. The same reasoning catches a battery whose timed run goes 6 h, 5 h, 3.5 h, and a ground resistance walking from 0.08 to 0.3 ohm.

\`\`\`
percent change = (new minus old) / old x 100
\`\`\`

From 120 to 150 microamps: (150 minus 120) / 120 x 100 = +25%. Note the denominator is the **old** value; using the new one quietly shrinks every increase you report.

## Averages, outliers, and what to do about them
An average is a summary, and summaries hide exactly the cases that matter. Ten infusion pumps whose flow errors average 1% could be ten good pumps, or nine perfect pumps and one running 10% fast. The average is not what reaches the patient; the individual device is. So look at the spread and the extremes, treat a value far from its neighbors as a question rather than a mistake, and go and find out whether it was a bad measurement (wrong setup, wrong units, misread scale) or a bad device. Repeat the measurement before you conclude either way, and write down both readings.`,

u4l5: `## What a troubleshooting tree is for
\`\`\`
Shape       Means                     Example
oval        start or end              "monitor shows no waveform"
rectangle   a step to perform         "fit a known-good lead set"
diamond     a yes or no decision      "does the waveform return?"
arrows      order and branch taken    yes to the left, no down
\`\`\`

The chart's value is that somebody who knows the device thought about the order of the tests before you were in a hurry. Follow it from the oval, one box at a time, and answer every diamond with a test you actually ran. The classic failure is jumping to the box that matches your hunch: you can spend an afternoon down a branch the second diamond would have closed.

## Halving beats guessing
A test that eliminates half the remaining possibilities is worth more than a test that confirms a single suspect, because the number of candidates falls geometrically rather than one at a time.

\`\`\`
Question                                  What the answer splits
does it work on a different outlet?        the room from the device
does the same cable fail on another unit?  the cable from the device
does it work with a known-good battery?    the battery from the charger circuit
does another device fail in that room?     the room from the device, the other way round
\`\`\`

Substitution is the cheapest halving test there is, and it has two rules. The replacement must be **known** good, meaning it came from a working device or from stock, not from the shelf where broken things wait. And you swap **one** thing at a time, because two changes and a fix prove nothing.

## Order the candidates by likelihood and cost
Most work orders end at something ordinary: not plugged in, battery flat, switch off, connector loose, consumable empty, setting changed, alarm limit wrong, filter blocked. Those are all free to check, so they come first, and nobody has ever regretted confirming that a device was plugged in. Then come the cheap parts that flex and get dropped. Only then the device internals, which cost time, risk, and sometimes a patient-care device being gone for a week.

## Patient, user, accessory, device
\`\`\`
Order   Ask                                        Because
1       is anyone at risk right now?               care moves to a spare before you touch anything
2       what did the user see, and what changed?   many faults are a device obeying a new setting
3       is it an accessory or consumable?          cables, sensors, cuffs, batteries fail far more often
4       is it the device itself?                   by now the list is short enough to open it
\`\`\`

The corollary is the sentence that settles arguments on the floor: if it works in another room, the fault is not inside the device; if the fault follows the device, it is not the room.

## Write down the eliminations, and know when to stop
A negative result is a finding. "Works on a different outlet. Fails with two known-good lead sets. Battery runs 5 h under load." tells the next technician where not to look and shows what you did with the time. A write-up that lists only the fix hides the work and teaches nobody.

Escalate when the device is outside what you are signed off on, when the repair needs a tool, a calibration standard, a password, or software you do not have, when the fault is intermittent and you cannot reproduce it, when a patient was involved, or when the cost of your time has passed the value of the repair. Escalation is a decision with a reason, and the reason goes in the record alongside everything you ruled out.`,

u4l6: `## The map of a service manual
\`\`\`
Section                  What you get there
safety notices           voltages present, stored energy, cautions; read before opening
specifications           ranges, accuracies, tolerances, fuse ratings, power, environment
theory of operation      how it works, usually with a block diagram
setup and configuration  installation, options, settings, software configuration
scheduled maintenance    the procedure, the interval, and the performance checks
calibration              what to adjust, against what reference, to what limit
troubleshooting          symptoms, error codes, and likely causes
parts list               every replaceable part with its part number
schematics               circuit drawings, board layouts, connector pinouts
\`\`\`

Specifications and troubleshooting carry most of the weight. Specifications gives you the number that turns a measurement into a decision; without it you have a reading and no verdict. Troubleshooting converts the device's own complaint into a short list, which is why you look up an error code before you take anything apart, and why a code written down by the nurse who saw it is worth more than the device's current silence.

## Anatomy of a specification
A specification is a value, a tolerance, and the conditions it holds under.

\`\`\`
Written as                                              What each part does
"flow accuracy plus or minus 5%"                        the value and the band
"at 25 mL/h and above"                                  the range it applies to
"after 30 minutes of stabilization"                     the condition you must meet
"with the manufacturer's administration set"            the accessory it assumes
\`\`\`

Read the whole row and the footnote. Tolerances often widen at the ends of a range, and a test run without the stabilization time or with the wrong disposable fitted produces a real number and a meaningless verdict.

## The three lookups you will do weekly
\`\`\`
Lookup           Written as                   Why the detail matters
fuse             2 A, 250 V, time-delay       a bigger fuse is a fire; a fast fuse trips at power-on
battery          a part number, not a size    chemistry and capacity must match the charger
maintenance      procedure plus interval      your checklist should match the device, not your habits
\`\`\`

Fuse markings deserve a moment: the current rating is the limit it protects to, the voltage rating is the voltage it can safely interrupt, and the type says how fast it acts. A time-delay fuse tolerates the brief surge a motor or a power supply draws at switch-on; a fast-acting fuse protects sensitive electronics. Substituting one for the other gets you either nuisance failures or no protection at all.

## Model, serial, revision, and software
The nameplate says which manual to open (**model**), which individual device you are holding (**serial number**, with its warranty and its history), and often a hardware **revision** or software version. Manufacturers change parts and procedures mid-production, so the right manual at the wrong revision can list a board that will not fit. Match all of it before ordering, and copy model, serial, and revision into the work order so the next technician does not have to go back to the nameplate.

## Two documents, two audiences
\`\`\`
Document               Written for     Answers
instructions for use   the clinician   how to set it up, run it, clean it, what an alarm means
service manual         you             how to test it, adjust it, repair it, what the codes mean
\`\`\`

Both are controlled documents tied to a model and a software version. Use the matching copy rather than a search result for something similar, and when a complaint is really about operation, the instructions for use often answer it in one page.

## Where they live
Best case, attached to the asset record in the **CMMS**, so the device's record gives you its manual, its history, and its maintenance procedure in one place. Otherwise the manufacturer's service portal (usually an account, sometimes a training requirement), the department's library of files and binders, or technical support on the phone. When you track down a manual that was missing, attach it to the asset record. That is five minutes that saves the next person an hour.`,

u4l7: `## The record is the deliverable
A repair that is not documented is, to everyone except you, a device of unknown condition. The written record is what proves the device was inspected, what it measured, what was replaced, and who released it. That is why the trade's oldest line is "if it is not written down it did not happen", and why closing the work order is part of the job rather than an afterthought.

\`\`\`
Field                        What belongs in it
asset identification number  the tag number, so the history attaches to the right device
location and department      where it is, and who to notify when it returns
problem reported             the complaint in the reporter's words, with date and reporter
what you found               the condition and the measurements that describe it
what you did                 the repair, adjustment, cleaning, or configuration change
parts used                   part number and quantity
time spent                   labor, and travel if your shop tracks it
test results                 readings with units, the limits, and a clear pass or fail
status                       in service, out of service, awaiting parts
name and date                who did the work and when
\`\`\`

## The difference one minute of typing makes
\`\`\`
Weak                      Better
"Fixed. Tested ok."       "Lower door latch broken, found on visual inspection.
                           Replaced latch, part 45-2210. Ground 0.12 ohm, chassis
                           leakage 48 microamps normal, 190 worst case, both pass.
                           Flow at 100 mL/h measured 98 mL/h, inside the 5% band.
                           Returned to unit 4B, charge nurse notified."
\`\`\`

The second version names the fault, the part, the numbers, the limits they were judged against, and who has the device now. It is also what makes a trend possible next year, because a number can be compared and the word "ok" cannot. Write plain sentences a stranger could follow: no private shorthand, no blame, no guesses about the user, and nothing you would not want read aloud.

## Scheduled maintenance, due dates, and completion
Maintenance work orders are generated by the system with a due date and a window around it. Two measures get watched: whether each inspection happened inside its window, and the **completion rate**, the percentage of due inspections finished in the period. Both are computed from what you **close**, so an inspection performed and left open counts as not performed. When a device cannot be found, is in use, or is away for repair, document the attempt and reschedule. Closing it as complete because you looked for it is a false record, and a false record is worse than a missing one.

## The incoming inspection and the asset tag
\`\`\`
Step   What happens                                      Why it matters
1      shipment checked against the purchase order        right model, right accessories, no damage
2      model, serial, and revision recorded               identifies this individual device for life
3      electrical safety test and performance check       becomes the baseline for every future reading
4      accessories inventoried, manual attached           so the next technician has both
5      asset tag applied and entered in the CMMS          the number every future work order uses
\`\`\`

If a tag falls off, it is replaced with the same number. A new number orphans the device's whole history.

## Who reads these records, and why
- **Surveyors and inspectors** read records rather than benches. A missing inspection is a finding; a pattern of them is a serious one.
- **Recalls and field notices** are answered from the records: which devices of that model and lot you own, where they are, and which were already modified.
- **Fleet patterns** only exist if part numbers and findings were written down. Three identical failures is a problem to escalate, not three coincidences.
- **After a patient event**, the record is the evidence that the device was tested and released properly. It protects the patient first and you second, and it only works if it was written at the time.`,

u5l1: `## The table, and the shape hidden in it
\`\`\`
Current through the body (60 Hz)   Effect
1 mA                              threshold of perception, a faint tingle
5 mA                              accepted maximum harmless current
10 to 20 mA                       let-go threshold: muscles clamp, cannot release
50 mA                             pain, possible fainting, respiratory arrest
100 to 300 mA                     ventricular fibrillation likely
6 A and above                     sustained contraction and burns
10 microamps                      microshock straight to the heart can fibrillate
\`\`\`

Two things in that list surprise people. The most lethal band is in the **middle**: 100 to 300 mA disorganizes the heart so it quivers without pumping, while much larger currents clamp the whole muscle at once and it often resumes when the current stops. And the let-go threshold matters as much as the lethal one, because a person who cannot release a conductor stays in the circuit until somebody else intervenes.

## Ohm's law decides how much current you get
\`\`\`
Condition                   Resistance        Current at 120 V
dry intact skin             about 100,000 ohm  about 1 mA, a tingle
wet skin, gel, broken skin  toward 1,000 ohm   about 120 mA, the fibrillation band
\`\`\`

Nothing about the voltage changed. The only variable was the patient's skin, and the outcome moved from "perception" to "likely fatal". That is why wet locations, prepped skin, electrode gel, dialysis, and hydrotherapy get special treatment, and why a patient is never in the same risk category as you.

## Macroshock and microshock
\`\`\`
                 Path                                 Dangerous at   Protection
macroshock       across the skin, through the body    milliamps      insulation, ground, GFCI
microshock       inside the body, straight to heart   microamps      isolated type CF applied parts
\`\`\`

Microshock is the reason this profession tests in microamps. Current delivered through a fluid-filled catheter, a pacing wire, or an internal lead skips the skin and arrives concentrated at the heart, so **10 microamps** is enough. You cannot feel it, the patient cannot report it, and the device looks fine.

## Where leakage comes from
- **Capacitance** between the mains wiring and the chassis, and inside the power transformer. Two conductors separated by insulation form a capacitor whether anybody wanted one or not, and alternating current passes through capacitance.
- **Filter capacitors** deliberately fitted from the mains lines to the chassis to suppress electrical noise. They do their job by passing a small current to the case.
- **Insulation** that is good but not perfect, and which gets worse with age, heat, cleaning chemicals, moisture, and crushed cords.

So leakage is normal, is present in every healthy mains-powered device, and grows over the device's life. The question the safety test asks is not whether there is leakage but **where it goes**: down the ground conductor, or through whoever touches the case when the ground is broken.

## The protections around the patient
\`\`\`
Protection              What it does
protective ground       carries leakage and fault current away; tested first, 0.5 ohm max (NFPA 99)
GFCI receptacle         opens when 4 to 6 mA goes missing between hot and neutral
isolated power          separates the circuit from earth so one fault does not make a path
equipment inspection    finds the cracked plug, crushed cord, and defeated ground pin
\`\`\`

The **patient care vicinity** under NFPA 99 reaches about **6 ft (1.8 m)** out from the bed or chair and about **7.5 ft (2.3 m)** up from the floor. Inside that box, anything conductive can be touched by the patient or by a caregiver who is touching the patient, so the grounding and receptacle requirements are stricter and personal electrical items do not belong there. Measure it once in your head: six feet is about two long paces.

## The three hazard classes
Electrical hazards are the ones with numbers, but the exam groups hazards as electrical, **chemical** (cleaners, solvents, electrolyte, compressed gases), and **environmental** (fire, radiation, lasers, magnetic fields, mechanical and ergonomic hazards, noise, temperature, biological exposure). The habit that covers all three is the same: identify the hazard before the job starts, and use the control that matches it.`,

u5l2: `## What makes an analyzer different from a meter
\`\`\`
Capability                        Why an ordinary meter cannot do it
low-resistance ground measurement  it drives a substantial test current to find a few hundredths of an ohm
body-model leakage measurement     the reading is taken through a network that mimics a person
polarity reversal                  it swaps hot and neutral internally, on purpose
open ground and open neutral       it lifts a conductor to create a single fault safely
patient lead leakage               it drives and measures at the applied parts
\`\`\`

The analyzer is a calibrated instrument, so it carries a calibration date, and the reading it produces is only evidence while that date is current.

## The limits you test to
\`\`\`
Measurement                                   Limit             Standard
ground wire resistance, chassis to ground pin  0.5 ohm maximum   NFPA 99
chassis (touch) leakage, every condition       500 microamps     NFPA 99, current editions
chassis leakage, older editions                300 or 100        NFPA 99, older editions
\`\`\`

NFPA 99 is the facility standard: it is what a hospital's own electrical safety program is written against, and it is where the two numbers you will quote most often come from. Because older editions used tighter chassis limits, some facilities keep the tighter number in policy. Test to the limits card your shop publishes, and write the limit next to the reading so the record shows what it was judged against.

## Conditions, and why the worst case is the real test
\`\`\`
Polarity   Ground    Represents                          Leakage tends to be
normal     closed    the device on a good outlet          lowest
reversed   closed    hot and neutral swapped at the wall  higher
normal     open      ground broken in the cord or plug    higher again
reversed   open      both faults together                 highest: the worst case
\`\`\`

A broken ground is invisible from outside the device, and a reversed outlet is a wiring error nobody notices until somebody measures. Neither one is exotic, which is why the standard requires the limit to be met with them present. Leakage is also measured with the **neutral open**, simulating a broken return.

The mechanism is worth holding onto: the ground conductor is the drain that carries leakage away. Open it and the leakage sits on the chassis looking for another path. Reverse the polarity and the mains filter capacitors, which are connected between the supply lines and the chassis, sit on the hot side and pass more current to the case. Together you get the largest number the device can make, which is exactly the number a patient would meet on the worst day.

## The sequence, and what each step catches
\`\`\`
Step   Test                          Catches
1      visual and cord inspection     cracked plug, missing ground pin, crushed cord, damaged case
2      ground wire resistance         worn cord conductor, bad strain relief, corroded ground screw
3      chassis leakage, 4 conditions  aged insulation, wet interior, failing mains filter capacitor
4      patient lead leakage           a compromised isolation barrier in the applied-part circuit
5      documentation                  the part that makes the other four count
\`\`\`

Flex the cord while watching the ground reading: an intermittent conductor shows up as a jumping number and is otherwise invisible. Stop at the first failure and tag the device rather than finishing the sheet.

## When, and what you write down
Test at incoming inspection (which also records the **baseline**), after any repair touching the power path, ground, enclosure, power supply, or patient connection, on the device's scheduled interval, and after any event such as a drop, a flood, or a report of a tingle.

Then record: every reading with its units, the condition each was taken in, the limit and the standard, the analyzer identification and its calibration status, the date, and your name. "Passed" is not a record; {{ground 0.11 ohm, chassis 42 / 58 / 170 / 205 microamps, limit 500}} is, and next year it is the data that reveals a trend.`,

u5l3: `## Two standards, two jobs
\`\`\`
Standard        Written for      Tells you
NFPA 99         the facility     what the hospital tests, and to what limits
IEC 60601-1     the manufacturer how safe a device must be, including applied-part limits
\`\`\`

A hospital's limits card quotes both, and the tighter number always wins. A manufacturer may specify limits tighter than either, and then the service manual is what you test to.

## The device limit table
\`\`\`
IEC 60601-1 limit                       Normal condition   Single fault condition
earth (ground) leakage                  5 mA               10 mA
touch (enclosure) current               100 microamps      500 microamps
patient leakage, type B and type BF     100 microamps      500 microamps
patient leakage, type CF                10 microamps       50 microamps
\`\`\`

Two patterns carry the whole table: the single fault column is **five times** the normal column, and **type CF is ten times tighter** than B and BF. A single fault condition means exactly one thing has failed, such as an open ground, an open neutral, or one failed insulation barrier. Standards assume faults happen, so a device must still be safe with any one of them present, which is also why your test deliberately creates them.

Earth leakage is the odd row: it is measured in **milliamps**, because it is the current the protective ground conductor exists to carry, not current available to a person. Comparing it with a 500 microamp chassis limit is a common trap.

## Protection classes
\`\`\`
Class                Protection comes from            What you test
Class I              a third-wire protective earth    ground continuity, then leakage
Class II             double insulation, no ground pin  case and cord condition, then leakage
internally powered   its own battery, isolated         leakage on battery, and as its class when charging
\`\`\`

Class II carries a square inside a square. There is no ground to measure, so the inspection weight shifts to the enclosure: a cracked case on a double-insulated device is a safety failure, not cosmetic damage.

## Applied parts
\`\`\`
Type   Symbol                   Isolated   Direct cardiac use   Patient leakage normal / fault
B      stick figure             no         no                   100 / 500 microamps
BF     stick figure in a box    yes        no                   100 / 500 microamps
CF     heart in a box           yes        yes                  10 / 50 microamps
\`\`\`

**Floating** (the F) means the patient connection is isolated from the chassis and from earth, so a mains-side fault cannot push current through the patient to ground. **Defibrillation-proof** parts add paddles to the symbol: they survive a defibrillator discharge without damage and without routing the shock somewhere it should not go. The symbols are printed on the device, which is how you learn which limits apply when there is no manual in your hand.

## Choosing the limit
\`\`\`
Device                                          Limits that apply
Class I pump, no patient electrical connection  0.5 ohm ground, 500 microamps chassis
Class I monitor with a type BF sensor           the same, plus 100 / 500 patient leakage
catheter-connected pressure or pacing device    type CF, so 10 / 50 patient leakage
Class II two-prong hand tool                    no ground test; case, cord, and leakage
\`\`\`

## A failing reading, step by step
1. **Stop the test.** No averaging, no retrying for a kinder number, no "it passed in the normal condition".
2. **Tag it out of service** with the date, your name, and the reason, and physically separate it from ready equipment.
3. **Document** every reading, its condition, its limit, and the standard the limit came from.
4. **Notify the department** so they can source a replacement.
5. **Repair.** High leakage is usually a mains filter capacitor, a damaged cord, contamination or moisture inside, or a failing ground connection. High ground resistance is usually the cord, plug, or strain relief.
6. **Retest the full sequence** and document the passing numbers. The retest is what returns the device to service, not the repair.

## Trending, one more time
Compare each reading with the last one on that device, not only with the limit. Chassis leakage of 90, then 150, then 310 microamps passes three times and is a device on its way out; ground resistance creeping from 0.08 toward 0.3 ohm is a cord with a date on it. A trend acted on is scheduled work. A trend ignored is an emergency with a patient in the room.`,

u5l4: `## Lockout tagout, and the reason for each step
\`\`\`
Step   Action                   Why
1      notify those affected    nobody looks for the device, nobody restarts it
2      shut down normally       an orderly stop avoids damage and surprises
3      isolate the energy       unplug, open the disconnect, close the valve, remove the battery
4      lock and tag             makes re-energizing physically impossible, and names the owner
5      release stored energy    the device is not inert just because it is isolated
6      verify zero energy       measure it; an unlit lamp proves nothing
\`\`\`

The lock is yours and only you remove it. Not the oncoming shift, not a supervisor who needs the room, not a colleague being helpful. When several people work on one machine, each applies a lock, and the machine stays locked until the last one comes off. If a lock must be removed without its owner, that is a documented management procedure, not a judgment call with a bolt cutter.

## Stored energy
\`\`\`
Source        Found in                                 Released by
capacitors    defibrillators, switching supplies        the manual's discharge procedure, then measure
springs       beds, lifts, doors, table columns         releasing or blocking before removing fasteners
pressure      gas lines, autoclaves, hydraulics, cuffs  bleeding down, then reading the gauge at zero
gravity       raised beds, tables, lifts, trays         lowering, or physically blocking
batteries     almost every portable device              disconnecting or removing the pack
heat          autoclaves, warming cabinets, lamps       waiting, and checking before touching
\`\`\`

One device commonly has four at once: a mains cord, an internal battery, a charged capacitor bank, and a gas supply. The step that gets skipped is verification, and it is the only step that is actually evidence.

## Hazard communication
**OSHA** requires labeled containers, a safety data sheet accessible to staff at all hours, training on the hazards present, and records of all of it. **GHS** standardizes what the label says: product name, signal word (danger is more severe than warning), hazard statements, precautionary statements, supplier information, and pictograms.

\`\`\`
Pictogram                   Means
flame                       flammable
flame over a circle         oxidizer: makes other things burn harder (oxygen)
skull and crossbones        acute toxicity
corrosion                   destroys skin, eyes, or metal
exclamation mark            irritant or lesser hazard
silhouette with star burst  longer-term health hazard
gas cylinder                gas under pressure
environment                 harmful to aquatic life
\`\`\`

Anything decanted into a second container gets a label carrying the same information. An unlabeled spray bottle on a bench is a hazard whose instructions have been thrown away.

## The sixteen sections, and the five you open
\`\`\`
1  identification            9   physical and chemical properties
2  hazard identification     10  stability and reactivity
3  composition               11  toxicological information
4  first aid measures        12  ecological information
5  fire fighting measures    13  disposal
6  accidental release        14  transport
7  handling and storage      15  regulatory information
8  exposure controls, PPE    16  other information
\`\`\`

In a real hurry you read **2, 4, 5, 7, and 8**: what it does to you, what to do in the first minute, which extinguisher, how to store it and what it must not sit beside, and what to wear. The order is identical on every sheet in the world, which is the point of the format.

## The shop's own chemicals
Isopropyl alcohol, contact cleaner and solvents, disinfectant wipes and sprays, flux and solder, adhesives and thread lockers, electrolyte from a leaking lead-acid pack, and compressed or liquefied gases. The injuries that actually happen are splashes to the eye, skin burns from electrolyte, and headaches or worse from solvent vapor at a closed bench. So: know where the **eyewash** is and use it properly, holding the lids open for the full time the sheet specifies; work volatile chemicals under ventilation; keep lids on; keep oxidizers away from flammables; never mix cleaning products; and wear what section 8 specifies rather than what is nearest.`,

u5l5: `## Colors, and the limit of colors
\`\`\`
Gas               United States color   Typical use
oxygen            green                 therapy, anesthesia, blenders
medical air       yellow                driving ventilators, mixing, surgical tools
nitrous oxide     blue                  anesthesia
nitrogen          black                 driving surgical instruments
carbon dioxide    gray                  insufflation for laparoscopy
vacuum, suction   white                 suction, waste gas scavenging
\`\`\`

Learn those for the exam and treat them as a prompt rather than proof on the floor, because color codes differ between countries: a cylinder painted white may be oxygen somewhere else. The **label** is the legal identification of contents everywhere, and the fitting is the physical confirmation. Color, label, fitting, in that order of attention and reverse order of authority.

## Pressures and volumes
\`\`\`
Item                 Value
full E cylinder      about 2,000 to 2,200 psi, about 660 liters of gas
H cylinder           the tall cylinder, racked or manifolded
wall or pipeline     about 50 psi delivered to the device
regulator            reduces cylinder pressure to working pressure
\`\`\`

Three consequences follow from those numbers. The cylinder gauge reads **contents**, not flow, so a full gauge with a closed flowmeter delivers nothing. The pressure drop from about 2,000 psi to about 50 psi is the regulator's whole job, so a device fed straight from a cylinder is seeing roughly forty times what it expects. And because volume and pressure fall together in a cylinder, a gauge at half scale is roughly half the gas, which is how transport decisions get made.

## Fittings that only fit one way
\`\`\`
System                          Used on                  How it works
pin index safety system         small cylinder valves     a pin and hole pattern unique to each gas
diameter index safety system    pipeline and wall outlets thread and shoulder diameters per gas
keyed quick-connects            wall and ceiling outlets  a unique shape per gas
\`\`\`

The rule the whole scheme depends on is that nobody defeats it: **no adapters, and never force a fitting.** A connection that will not mate is giving you correct information. And no **oil, grease, or tape** on an oxygen fitting: oxygen is an oxidizer, so it does not burn itself but makes everything else burn ferociously, and a trace of hydrocarbon in a high-pressure oxygen stream can ignite. A leaking fitting needs the correct washer or a repair, never a wrap of tape.

## Handling, storage, and zone valves
- Secured upright, chained, racked, or in a proper stand. Never free-standing, never loose on a bed or cart.
- Valve caps on whenever the cylinder is not in use or in transit, because a snapped-off valve makes the cylinder a projectile.
- Full separated from empty, empties marked, so nobody grabs a dead cylinder in a crisis.
- Cool, ventilated storage, away from heat and ignition, and never oxygen stored with flammables.
- Moved on a cart, never carried, rolled, or dragged by the valve.

A **zone valve** is a labeled shutoff that isolates one area's gas supply, mounted behind a breakable cover with a sign naming the gas and the area. Closing it stops gas to everything downstream, including devices keeping people alive, so it is closed only per procedure, in a fire or major leak, with clinical staff told. Your job is knowing where they are and never blocking one with equipment.

## Symbols you read off the device
\`\`\`
Symbol                         Means
stick figure                   type B applied part
stick figure in a box          type BF applied part, isolated
heart in a box                 type CF applied part, heart-safe
paddles added to the symbol    defibrillation-proof applied part
square inside a square         Class II, double insulated
book with a hand               consult the instructions for use
triangle with exclamation      general warning: read before acting
\`\`\`

Those seven marks tell you the device's protection class and which leakage limits apply before you have found a single page of documentation.`,

u5l6: `## One habit, then everything else
Hand hygiene prevents more transmission than every other control combined, and the moments that matter are predictable: before entering, before and after touching a device or a patient's surroundings, after contact with anything soiled, after leaving, and **again after gloves come off**. Gloves leak, tear, and contaminate hands as they are pulled off, so they are a reason to wash rather than an excuse not to. Soap and water when hands are visibly soiled; alcohol rub otherwise, rubbed until dry.

## Standard precautions, then more if the sign says so
\`\`\`
Level                        Applies to                    What you do
standard precautions         every patient, always         treat all fluids as infectious; PPE by task
contact precautions          organisms spread by touch     gown and gloves; equipment may stay in room
droplet precautions          large droplets, short range   surgical mask near the patient
airborne precautions         particles that stay aloft     fit-tested N95 or better, door closed
\`\`\`

Standard precautions exist because you are never reliably told who is infectious, and often nobody knows. The protection is therefore chosen by the **task**, not by the patient's chart.

## The order of PPE, and why it is that order
\`\`\`
On          Off
gown        gloves
mask        eye protection
eye wear    gown
gloves      mask or respirator
\`\`\`

Gloves go on last and come off first because they are the most contaminated item in the room. Everything is removed at the doorway, into the correct bin, and then hands are cleaned. The sequence is designed so nothing dirty passes your face or your clothing on its way out.

A surgical mask and a respirator are not interchangeable: a mask blocks your droplets and shields your mouth and nose from splashes, while an **N95** filters fine airborne particles and only does so if it **seals**, which is why it is fit tested and why facial hair defeats it.

## Clean, disinfect, sterilize
\`\`\`
Spaulding category   Touches                        Treatment
critical             sterile tissue or bloodstream  sterilization
semi-critical        mucous membranes               high-level disinfection
non-critical         intact skin                    low-level disinfection
\`\`\`

**Cleaning** is physical removal of soil and comes first always, because soil shields organisms from any chemical. **Disinfection** kills most organisms on a surface and depends on **contact time**: a surface wiped and immediately dried was not disinfected, it was cleaned. **Sterilization** destroys everything including spores, by steam, gas, or a validated chemical process.

For your bench: a device is cleaned on the unit before it comes to you, and you may insist on that. Something visibly soiled goes back, or gets cleaned with full protection on before it is opened. Clean it again before it returns to the floor, using only a disinfectant the manufacturer approves, because the wrong chemical crazes plastic, clouds displays, and lifts keypad legends. Keep a clean side and a dirty side on the bench, and clean your tools too.

## Sharps, and exposures
Sharps go straight into a sharps container: never a pocket, a tray, a bench, or regular trash. You will meet needles left in equipment, broken specimen glass, lancets, and cut wire ends. Never reach blindly into a bin, a drawer, or the bottom of a cart.

\`\`\`
After an exposure   What to do
immediately         wash the site with soap and water, or flush eyes at the eyewash
within minutes      report to your supervisor and employee health
same visit          get evaluated: preventive treatment is time-sensitive
always              document it; it is an occupational injury record
\`\`\`

The bloodborne pathogens the rules were built around are **hepatitis B**, **hepatitis C**, and **HIV**. Your employer must offer the **hepatitis B vaccine** at no cost to employees with occupational exposure risk, and accepting it is the most effective single protection available to you. The thing that ruins an exposure is waiting until the end of the shift to mention it.`,

u5l7: `## One line per area
\`\`\`
Area                   The rule that will hurt you if you forget it
X-ray, fluoroscopy, CT  ALARA: time, distance, shielding, and wear the dosimeter
MRI                     the magnet is always on; steel becomes a projectile
defibrillator           the charged capacitor is lethal after power off
electrosurgery          a lifted or dried return pad concentrates current and burns
lasers                  eyewear must match the wavelength, and reflections count
centrifuge              never open a spinning rotor; inspect it and balance the load
autoclave               steam and pressure persist after the cycle ends
fire                    RACE and PASS, and never water on energized electrical
mechanical              block what is raised and isolate power before reaching in
\`\`\`

## Radiation
ALARA is three levers and a badge. **Time** in the room while the beam is on, which matters most in fluoroscopy because it runs for minutes rather than milliseconds. **Distance**, because dose falls off steeply with distance, so a step back is worth more than it feels. **Shielding**: the barrier, the leaded glass, the apron and thyroid collar. The **dosimeter** goes where you were told to wear it, outside the apron at collar level; in a drawer it records nothing, and under the apron it under-reports your real exposure. Never hold a patient or a cassette during an exposure, and never let a service procedure energize a tube with anyone unshielded in the room.

## Magnetic resonance
\`\`\`
Hazard         Why                                    Control
projectiles    the field pulls ferrous objects hard    non-ferrous labeled tools, empty pockets
always on      a superconducting magnet is never off   screening and the permanent sign
zones I to IV  public through to the magnet room       screening before entering controlled zones
quench         helium boils off and displaces oxygen   evacuate, do not re-enter until cleared
labels         MR Safe, MR Conditional, MR Unsafe      conditional means only within stated limits
\`\`\`

Nothing enters the magnet room without being cleared, including your analyzer, your toolbox, a floor polisher, and an oxygen cylinder. Never service alone there, and never escort in somebody who has not been screened.

## Energy that waits for you
A defibrillator's capacitor holds a lethal charge after the device is switched off and unplugged. Call **clear** loudly and confirm nobody touches the patient, the bed, or anything conductive connected to either; dump the charge into the analyzer or use the disarm; then follow the manual's discharge procedure and **measure** before you reach in. The two reasons a defibrillator fails when it is finally needed are a dead battery and expired pads, which is exactly what the daily check and the self-test log exist to catch.

An electrosurgical unit sends high-frequency current through the patient and recovers it through a **return electrode**. Spread over the whole pad, the current density is harmless. Lift a corner, let it dry, or site it over bone or scar tissue and the same current leaves through less skin, which burns. Check the pad, its cable, and the contact-quality monitor and its alarm, and look for fluid pooling under a pad.

## Lasers, laboratory, and fire
Door signs state the laser's **class** and **wavelength**; Class 3B and Class 4 damage eyes and skin, eyewear must be rated for that wavelength (dark is not rated), everyone in the room wears it, interlocks and warning lights stay working, reflective instruments stay out of the beam path, and oxygen plus drapes plus a beam is a fire.

In the laboratory: a centrifuge rotor at full speed carries enormous energy, so the lid interlock is never defeated, the rotor is inspected for cracks and corrosion and retired at its life limit, and loads are balanced. Analyzers hold reagents, acids, and patient specimens, so protection goes on and the safety data sheet comes out before a reagent compartment is opened. Autoclaves hold steam under pressure and stay hot and pressurized after the cycle: bleed, verify zero on the gauge, then wait.

\`\`\`
RACE   rescue, alarm, confine (close doors), extinguish or evacuate
PASS   pull the pin, aim at the base, squeeze, sweep
Class  A ordinary combustibles   B flammable liquids   C energized electrical   K kitchen oils
\`\`\`

Your role in a hospital fire is usually the first three letters of RACE. And remember that oxygen-enriched air makes every fire worse, which is why cylinders and ignition sources are kept apart.

## The hazards that injure the most technicians
Not radiation and not lasers: beds, lifts, carts, and lifting. Powered beds and tables have pinch points and move while hands are inside them, and somebody may press a control at the wrong moment, so isolate the power and block what is raised. Lift with your legs and a straight back, get a cart or a second person for anything heavy or awkward, and treat your own back as equipment with a maintenance schedule.`
});
