// BMET Academy curriculum, units 6 to 8. Original teaching content for the AAMI/ACI CABT exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u6", n: 6, title: "Medical Devices and Test Equipment", domain: 2,
  blurb: "The devices on a hospital floor, what each one does and delivers, the test equipment that proves it, the tools in your box, and the inspections that start and end every device's life.",
  assumes: "The body from unit 2, the meter from unit 3, percent error from unit 4, and the safety test from unit 5.",
  lessons: [
    {
      id: "u6l1", title: "Diagnostic Devices", domain: 2, obj: "MD-A", minutes: 10,
      body: `A clinic exam room holds half a dozen devices that cost less than a laptop, and every one of them eventually lands on your bench. Diagnostic devices look and measure. They do not push energy or fluid into a patient, which makes them the gentlest place to start. For each one, hold three facts: what it does, what it measures, and the one check that catches the way it usually fails.

## The handheld set
**Otoscope.** Lights and magnifies the ear canal and the eardrum. A disposable or cleanable **speculum** cone fits the tip so the instrument can see down the canal without touching it, and a battery or rechargeable **handle** powers the lamp. The check: lamp brightness, the handle's charging contacts and battery, and a clean undamaged set of specula with the device.

**Ophthalmoscope.** Lights the inside of the eye and lets a clinician focus on the retina. A **lens dial** on the head clicks through correction powers, and that dial is what fails: feel every detent and watch the view change as it moves. The check: lamp output, dial detents, and optics cleaned with lens tissue only, never a disinfectant wipe.

**Audiometer.** Plays tones of known frequency and loudness through headphones so a clinician can map what a patient is able to hear. It belongs in a quiet room or a booth, because background noise alone will fail a healthy ear. The check: headphone cords and cushions, the response of every button and tone, and the calibration record, since an output that has drifted turns into a hearing loss the patient does not have.

## Temperature and weight
**Thermometers.** An electronic unit reads temperature through a **thermistor**, a resistor whose resistance changes with heat, in a probe used **oral**, axillary, or **rectal**. The probes are color coded by site and are never swapped between sites. A **tympanic thermometer** is an **infrared temperature sensor**: it reads the heat radiating from the ear canal instead of touching anything, and a **temporal** unit scans the forehead the same way. Every one of them uses a single-use **probe cover**, and a missing box of covers takes a thermometer out of service as surely as a dead battery. The check: compare against a reference thermometer, confirm the probe type matches the device, and verify the cover supply.

**Scales.** A **floor** scale weighs a standing patient, a **chair** scale weighs someone who cannot stand, a **bed** scale weighs through load cells under the frame, and an **infant** scale weighs in grams on a tray. The check never changes: **zero** the scale empty, then load certified **calibration weights** at a low, a middle, and a high value and compare. A scale that was not zeroed is wrong by the same amount on every patient, and the weights carry their own due date.

## Looking inside and looking closely
**Bladder scanner.** A handheld ultrasound that measures the volume of urine left in the bladder so a nurse can decide whether to catheterize. It needs **gel** between the probe and the skin, because ultrasound will not cross an air gap, and it has to be **aimed** at the midline above the pubic bone. The check: the probe face for cracks and wear, the battery and charger, and the stored reference or phantom check the manual specifies.

**Microscope.** Magnifies laboratory specimens. Rotating **objectives** give the magnification steps, the **stage** holds and moves the slide, and the **light** below it sets what you can see. The check: illumination and its brightness control, smooth stage travel, objectives clean and free of fingerprints, with lens tissue the only thing that ever touches glass.

**Centrifuge.** Spins tubes so the parts of a sample separate by density. Tubes must be loaded in **balanced** pairs opposite each other, because an unbalanced **rotor** at thousands of revolutions per minute shakes itself apart. The **lid lock** interlock must hold the lid shut while the rotor turns and refuse to release until it stops. The check: speed with a **tachometer** against the dial setting, timer accuracy, the interlock, and the rotor inspected for cracks and corrosion.

## The recording cart
An **EKG cart** records the heart's diagnostic tracing on paper or straight into the chart. **Twelve leads** are derived from ten **electrodes** placed on the limbs and across the chest, so lead placement is a clinical skill and a mislabeled lead wire produces a tracing that imitates disease. The **paper** runs at the standard **25 mm/s**, which makes a small box 0.04 s wide, and the cart's **filters** clean up mains interference and muscle noise without flattening the real signal. The check: every lead wire and the trunk cable for continuity end to end, the paper supply and print quality, the filter and gain settings left where the department wants them, and a simulator tracing confirmed on every lead.

## The spot-check monitor
A **spot-check vital signs monitor** is the rolling stand a nurse wheels room to room to take one set of vitals: blood pressure, pulse rate, oxygen saturation, and temperature, then moves on. It is not a continuous bedside monitor and usually has no alarms worth the name. Its failures are almost all accessory failures: a leaking cuff or hose, a cracked oximeter probe, a missing temperature probe cover. The check: each parameter against the matching simulator or reference, the accessories, the battery runtime, and the wheels and stand.

> Exam tip: name the device, then say what it measures and the one check. Otoscope ear, ophthalmoscope eye with a lens dial, thermistor probes by site with single-use covers, scales zeroed then checked with certified weights, bladder scanner needs gel, EKG cart records twelve leads from ten electrodes at 25 mm/s, microscope objectives and stage, centrifuge balanced with a lid interlock and a tachometer speed check.`,
      hook: "Diagnostic devices look and measure rather than deliver. Otoscope lights the ear canal through a speculum on a battery handle; ophthalmoscope lights the eye and its lens dial clicks through powers. Thermometers read through a thermistor probe used oral, axillary, or rectal, or infrared at the ear (tympanic) or forehead (temporal), always with a single-use probe cover. Scales come as floor, chair, bed, and infant types: zero empty, then check with certified calibration weights low, middle, and high. A bladder scanner is handheld ultrasound for urine volume and needs gel and correct aim. An EKG cart records the twelve-lead tracing from ten electrodes on paper running at 25 mm/s, with filters for interference, and its check is lead wire and cable continuity, paper and print quality, and a simulator tracing on every lead. A microscope has objectives, a stage, and a light. A centrifuge needs balanced tubes opposite each other, a sound rotor, a working lid lock, and a tachometer speed check. A spot-check vital signs monitor takes one set of vitals room to room, and its faults are usually accessories."
    },
    {
      id: "u6l2", title: "Patient Monitoring", domain: 2, obj: "MD-B", minutes: 10,
      body: `A bedside monitor is one box doing five jobs at once, and each job is a different kind of measurement with a different way of going wrong. Learn them one parameter at a time and the monitor stops being mysterious: it is an amplifier for the heart, a pump and a pressure gauge, two colors of light, a gas bench, and a resistance meter, sharing one screen and one alarm system.

## ECG and heart rate
The monitor amplifies the heart's own electrical signal, measured in millivolts at the skin. **Electrodes** are adhesive pads with a gel center; **lead wires** run from them to a trunk cable. A three-electrode set gives the standard rhythm views, and **lead II** is the one most often displayed because it runs along the heart's axis and gives the tallest, cleanest **QRS** complex to count.

The monitor counts rate from the QRS, so anything that spoils the signal spoils the rate. **Skin prep** matters: dry the site, clip hair rather than shaving it, and use fresh electrodes, because a dried-out gel pad is a high-resistance connection that picks up noise. Rate alarms are set high and low, normally bracketing the adult 60 to 100 beats per minute range, and a lead-off condition raises its own alarm.

## Non-invasive blood pressure
**NIBP** inflates a cuff to stop flow, then bleeds it down while watching the small pressure oscillations the artery makes under the cuff. That is the **oscillometric** method, and it reports systolic, diastolic, and a calculated mean. **Cuff size** is the single biggest error source: a cuff too small reads high, a cuff too large reads low, and the bladder should wrap roughly 80% of the arm. The **cycle interval** sets how often it repeats, the **hose** must be unkinked and leak-free, and a moving arm produces a failed or wild reading rather than a quiet wrong one.

The manual version of the same measurement is a **sphygmomanometer**: a cuff, a bulb, and a gauge, with a stethoscope listening for the sounds that appear and disappear as the cuff deflates. Departments keep them as the backup for when a module fails, and they are still your work: a leak check on the cuff and bulb, and a gauge that sits on zero with the cuff open.

## Pulse oximetry
A **SpO2** probe shines two wavelengths through a finger, toe, earlobe, or an infant's foot: **red light at about 650 to 660 nm** and **infrared at about 805 to 940 nm**. Oxygenated and deoxygenated blood absorb those two colors differently, so the ratio of what gets through gives the saturation, normally 95 to 100%. The measurement needs a pulse to work from, so poor **perfusion**, a cold hand, or a blood pressure cuff inflating on the same arm will stall it. **Motion** is the other enemy, and dark **nail polish** or an artificial nail blocks the light path. Move the probe, warm the site, or switch to an ear sensor before you blame the monitor.

## EtCO2
A capnograph measures carbon dioxide in exhaled gas and reports **EtCO2**, normally **35 to 45 mmHg**, plus a respiratory rate and a waveform. A **sidestream** sensor draws a sample through thin tubing to a bench inside the monitor, which is why it needs a **water trap** to catch condensation and why a blocked or wet sample line is the most common fault. A **mainstream** sensor sits in the breathing circuit itself with no sample line, responds faster, and is heavier at the airway.

## Temperature, telemetry, and pressure
**Temperature probes** are thermistors on a cable, surface or internal, and they are verified against a resistance box or a reference thermometer at two points. A probe that has fallen off the patient reads room temperature, which is the classic nuisance alarm.

**Telemetry** moves the same measurements by radio. The patient wears a battery-powered **transmitter** with electrodes; **antennas** in the ceiling feed the signal to a **central station** where one clerk or nurse watches many patients. Telemetry runs on **WMTS**, radio bands reserved for patient monitoring so consumer gear cannot step on them. Its failures are batteries, antenna coverage holes, and the wrong patient assigned to the wrong transmitter.

**Invasive pressure** replaces the cuff with a catheter in an artery, a saline-filled line, and a **transducer** that converts pressure into a voltage. Recognize it, know it must be zeroed to atmosphere at the level of the heart, and leave the rest to a later course.

## Alarms and alarm fatigue
Every parameter carries a high and a low **alarm limit**. Limits set too tight make the monitor cry constantly; staff then turn volumes down, silence by reflex, and eventually miss the alarm that mattered. That is **alarm fatigue**, and it is a patient-safety problem your department owns a piece of: default limits, working speakers, correct priority, and alarms that actually reach somebody are part of every monitor inspection.

> Exam tip: ECG counts the QRS and needs skin prep and fresh electrodes; NIBP is oscillometric and the wrong cuff size is the main error, small reads high; SpO2 uses red about 650 to 660 nm and infrared about 805 to 940 nm and needs perfusion; EtCO2 is 35 to 45 mmHg with a water trap on a sidestream line; telemetry rides on WMTS. Alarm limits set too tight cause alarm fatigue.`,
      hook: "A bedside monitor runs several measurements at once. ECG amplifies millivolt signals through electrodes and lead wires, counts rate from the QRS, usually displays lead II, and needs skin prep and fresh electrodes. NIBP is oscillometric: the wrong cuff size is the main error, a small cuff reads high, and the hose must not leak or kink. Pulse oximetry shines red light at about 650 to 660 nm and infrared at about 805 to 940 nm through a finger, toe, or earlobe and needs perfusion; motion, cold hands, and nail polish defeat it. EtCO2 is 35 to 45 mmHg, measured sidestream through a sample line with a water trap or mainstream at the airway. Temperature probes are thermistors verified at two points. Telemetry sends vitals by radio from a battery transmitter through ceiling antennas to a central station on WMTS bands. Invasive pressure uses a catheter and a transducer zeroed at heart level. Alarm limits too tight cause alarm fatigue."
    },
    {
      id: "u6l3", title: "Verifying a Monitor With a Patient Simulator", domain: 2, obj: "MD-E", minutes: 9, lab: "monitor-pm",
      body: `A monitor that powers up and draws a pretty waveform has proved nothing. The only way to know it is telling the truth is to feed it a signal whose value you already know and compare. That instrument is a **patient simulator**, and this lesson is the inspection built around it.

## What a simulator generates
A simulator is a small box with lead posts and connectors that produces the signals a patient would, on command and to a known value.

- **ECG rhythms and rates**: normal sinus rhythm at a rate you dial in, plus arrhythmias such as ventricular fibrillation, ventricular tachycardia, atrial fibrillation, and asystole, at selectable amplitude.
- **SpO2**, through a finger-shaped optical simulator the real probe clips onto, which answers the probe's own light with the ratio for a chosen saturation.
- **NIBP**, through a pressure simulator that presents the pressure pulses a cuff would feel, so the monitor computes a systolic and diastolic you selected.
- **Temperature**, by presenting the resistance a thermistor probe would have at a chosen temperature.
- **Respiration**, by varying impedance across the ECG leads the way a breathing chest does.

## Why a simulator is not a safety test
This is a favorite exam point. A simulator **supplies** signals and draws essentially no current from the device. It proves the monitor measures and alarms correctly. It says nothing about ground resistance or leakage current, because it never tests the power path or the isolation between the patient connection and the mains. The analyzer from unit 5 answers the safety question; the simulator answers the performance question. A full inspection needs both, and the safety test comes first so that you are not handling a device whose ground is open.

## The inspection, in order
1. **Visual**: case, screen, keys, speaker, wheels or mount, battery door, and the inspection label.
2. **Cables and connectors**: the ECG trunk cable and every lead wire end to end, the NIBP hose, the SpO2 cable, the temperature probe. Lead wires fail at the ends from flexing, and a continuity check with the meter finds a break that looks fine.
3. **Electrical safety**: ground resistance and leakage in every condition, plus patient lead leakage, because this device has applied parts. Judge it against your limits card.
4. **Apply the simulator**: connect it to the lead wires, the oximeter probe, and the cuff port in turn, select known values, and let each reading settle.
5. **Compare each number against the manual's tolerance.** Not against what looks about right: against the printed specification. A monitor reading 63 when the simulator sends 60 is a failure on a device specified to plus or minus 2 beats per minute, however healthy it looks.
6. **Alarm checks**: set the rhythm to **asystole** and confirm the monitor reads zero and alarms, then to **ventricular fibrillation** and confirm it alarms again. Check that the sound is audible at the volume the floor uses and that the alarm reaches the central station if it is networked.
7. **Document**: the simulator settings, the monitor readings side by side, the tolerance each was judged against, the safety numbers, and a clear pass or fail.

## Tolerances are the whole point
Every number you compare needs a limit from the service manual. Typical monitor tolerances are tight: a couple of beats per minute on heart rate, a couple of percent on saturation, a few mmHg on pressure. Compute the error as **reading minus the known input** and keep the sign, so the record shows which way the monitor leans and next year's inspection can see the drift.

## In the lab
You set a simulator to 60 beats per minute, normal sinus rhythm, 97% saturation, and 120/80, apply it, and record what the monitor shows for each parameter. You compute the heart rate error, decide pass or fail against the tolerances printed in the lab's manual panel, and then run the asystole alarm check.

> Exam tip: a patient simulator generates ECG rhythms and rates, SpO2 through a finger simulator, NIBP, temperature, and respiration. It supplies signals and draws no current, so it is a performance test, never a safety test. Compare every reading against the manual's tolerance, finish with asystole and ventricular fibrillation alarm checks, and write the numbers down.`,
      hook: "A patient simulator produces known signals: ECG rhythms and rates, arrhythmias including asystole and ventricular fibrillation, SpO2 through a finger simulator, NIBP through a pressure simulator, temperature as a thermistor resistance, and respiration as changing impedance. It supplies signals and draws no current, so it verifies performance and is not a safety test; the analyzer does that. Inspection order: visual, cables and lead wires end to end, electrical safety including patient lead leakage, apply the simulator, compare every reading against the manual's tolerance, alarm checks with asystole and ventricular fibrillation, then document the simulator settings next to the monitor readings. Error is reading minus known input, sign kept, so drift shows up between inspections."
    },
    {
      id: "u6l4", title: "Infusion Devices", domain: 2, obj: "MD-C", minutes: 10,
      body: `More patients are connected to an infusion pump than to anything else in the building, and a hospital owns them by the hundred. They are the device a new technician inspects most, so know the family: what each type delivers, what the numbers on the screen mean, and what the alarms are telling you.

## The large-volume pump
A **large-volume infusion pump** drives fluid or medication from a bag, through an administration set, into a vein. Most use a **peristaltic** mechanism: fingers or a rotor squeeze the soft tubing in sequence and walk the fluid along, so the pump never touches the fluid itself and the single-use **administration set** is the only part in the fluid path. Sets are specific to the pump, because the pump's accuracy depends on the exact tubing diameter and wall thickness it was calibrated for.

**Free-flow protection** is the safety feature worth naming on an exam. When a set is removed from the pump, a clamp built into the set closes by itself, so gravity cannot empty the bag into the patient at an uncontrolled rate.

The screen carries three numbers:

- **Rate** in **mL/h**: how fast. This is a volume per hour, not drops per minute.
- **VTBI**, the volume to be infused: how much in total before the pump stops.
- **KVO**, keep vein open: the small trickle the pump drops to after the volume is finished so the line does not clot.

Two alarms carry most of the calls. An **occlusion** alarm means pressure above the threshold: a clamp left closed, a kinked line, a blocked site, or a patient lying on the tubing. An **air-in-line** alarm means the ultrasonic detector saw bubbles, usually because the set was not purged properly at setup. A **drug library** holds the hospital's approved medications with soft and hard limits on dose and rate, so a nurse who keys an impossible number gets stopped; keeping that library current and matched across the fleet is a department job.

## Syringe and patient-controlled pumps
A **syringe pump** delivers very small, very precise volumes by pushing a syringe plunger with a motorized **driver**. The pump must be told the **syringe size** and brand because it calculates rate from the plunger's travel and the barrel's diameter, so the wrong profile produces a confidently wrong flow. These are the pumps used for infants and for potent drugs at a fraction of a milliliter per hour.

A **PCA** pump lets the patient press a **button** for a dose of pain medication. Three settings control it: the dose, the **lockout interval** that refuses another dose until enough time has passed, and an hourly or four-hourly limit. The drug is a controlled substance, so the pump's cassette lives behind a **key or a code**, and the lock, the key control, and the dose history log are all part of its inspection.

## Enteral feeding
An **enteral feeding pump** delivers formula into the stomach or intestine, not into a vein. Feeding sets use **ENFit** connectors, a thread-on design chosen deliberately so a feeding set cannot be joined to an intravenous line. That incompatibility is the point: connecting formula to a vein is fatal, and the connector is the engineering control that prevents it. Accuracy requirements are looser than for a vein pump, but flow checks, the rotor or fingers, and the set path still get inspected.

## Gravity and the drop factor
Before pumps, and still today when no pump is available, fluid runs by **gravity** from a bag hung above the patient, controlled by a roller clamp and counted as drops per minute in the drip chamber. The set's **drop factor**, printed on the package, says how many drops make a milliliter: commonly 10, 15, or 20 for a standard set and 60 for a microdrip set. Recognize the idea and the term; a pump reports mL/h and never counts drops.

## Battery and cleaning
Pumps ride on poles through hallways and spend their lives half charged, so the **battery** is the most replaced part in the fleet. A pump that runs only while plugged in is out of service, and runtime on battery is a measured item on the inspection, not a guess. **Cleaning** matters just as much: fluid gets into keypads and mechanisms, so wipe the device with the agent the manual allows, keep liquid out of the seams, and look into the pumping channel for dried residue that will hold the tubing in the wrong position.

> Exam tip: rate is mL/h, VTBI is the total to deliver, KVO is the trickle after it finishes. Occlusion means pressure, air-in-line means bubbles. Free-flow protection clamps the set when it leaves the pump. Syringe pumps need the right syringe size selected; PCA pumps have a patient button, a lockout interval, and a lock; feeding pumps use ENFit so formula cannot reach a vein.`,
      hook: "A large-volume pump drives fluid through a single-use administration set with a peristaltic mechanism, and free-flow protection clamps the set when it is removed so gravity cannot dump the bag. Rate is in mL/h, VTBI is the total volume to be infused, KVO is the trickle after it finishes. Occlusion alarms mean pressure from a closed clamp, a kink, or a blocked site; air-in-line alarms mean the detector saw bubbles from a poorly purged set; the drug library enforces dose limits. A syringe pump pushes a plunger with a driver and must have the right syringe size and brand selected. A PCA pump has a patient button, a lockout interval, hourly limits, and a locked cassette. Enteral feeding pumps use ENFit connectors so a feed cannot be joined to an intravenous line. Gravity sets count drops using a drop factor. Batteries and cleaning are the recurring maintenance items."
    },
    {
      id: "u6l5", title: "Checking an Infusion Pump's Flow Rate", domain: 2, obj: "MD-E", minutes: 9, lab: "infusion-check",
      body: `A pump that says 120 mL/h and delivers 150 mL/h is a dosing error that nobody at the bedside can see. Flow accuracy is the one performance check an infusion pump cannot be released without, and you can run it with a cylinder, a stopwatch, and arithmetic you already know.

## The volumetric check
This is the classic method and the one the exam asks about.

1. Load a fresh administration set, prime it so no air remains, and put the outlet end into a clean **graduated cylinder** sized close to the volume you expect, because a 100 mL cylinder reads far better than a 1,000 mL one.
2. Program a known **rate**, 120 mL/h is convenient, and a volume larger than you plan to collect.
3. Start the pump and the **stopwatch** together, and run a timed collection of at least **30 minutes**.
4. Read the cylinder at eye level, at the bottom of the curved liquid surface, to the nearest graduation.
5. Convert back to the pump's units: **rate = volume / minutes x 60**. A 30-minute collection is simply doubled.
6. Compute **percent error = (delivered minus set) / set x 100**, keeping the sign.
7. Compare against the manual, and a **typical acceptance band is plus or minus 5%**.

Worked through: set 120 mL/h, collected 62 mL in 30 minutes. Delivered rate is 62 / 30 x 60 = 124 mL/h. Error is (124 minus 120) / 120 x 100 = +3.3%, inside 5%, so it passes and the record shows the number rather than the word.

Why 30 minutes and not 5? A peristaltic mechanism delivers in small pushes, so a short collection catches whatever part of the cycle it happened to land on. Length also shrinks your own reading error: misreading by 1 mL on a 10 mL collection is 10%, while the same 1 mL on a 60 mL collection is under 2%.

## The gravimetric check
If the shop has a good balance, weigh instead of reading a scale by eye. Water is convenient: **1 g of water equals 1 mL**. Tare the container on the balance, collect for the timed period, weigh again, and the grams gained are the milliliters delivered. It removes meniscus and parallax error entirely, which is why calibration laboratories prefer it. An **infusion analyzer** does the same job automatically and also measures occlusion pressure, but the cylinder method is the one that works when every analyzer is signed out.

## The rest of the inspection
- **Occlusion alarm**: clamp the line downstream and confirm the pump alarms and stops within the specified pressure or time. A pump that keeps pushing against a closed line is dangerous twice over, once for the pressure and once for the bolus released when the clamp opens.
- **Air-in-line alarm**: introduce air into the set the way the manual describes and confirm the detection and the alarm.
- **Battery run time**: charge fully, unplug, run at a stated rate, and time how long it lasts against the specification. This is the test that finds a pack that reads the right voltage and has no capacity left.
- **Free-flow clamp**: open the door with a set loaded and confirm the set's own clamp closes. Then confirm the pump alarms when the door is opened while running.
- **Visual, electrical safety, and cleaning** as always, with the safety test before the performance work.

## Document the numbers
Write the set rate, the collection time, the volume collected, the computed delivered rate, the percent error, the acceptance band, and the results of each alarm test. A pump that passes at +4% this year and +4.8% next year is still passing and is also telling you something; only recorded numbers let anyone see that.

## In the lab
You set the pump to 120 mL/h, run a 30-minute collection into a cylinder, read the volume, convert it to a rate, compute the percent error, and decide pass or fail against a plus or minus 5% specification. The lab also asks why 30 minutes beats 5.

> Exam tip: rate = volume / minutes x 60, percent error = (delivered minus set) / set x 100, typical acceptance plus or minus 5%, collection at least 30 minutes, cylinder read at eye level at the bottom of the meniscus. Gravimetric alternative: 1 g of water = 1 mL. Then test occlusion, air-in-line, battery runtime, and the free-flow clamp.`,
      hook: "Flow accuracy is checked volumetrically: prime a fresh set, program a known rate, collect into a graduated cylinder for at least 30 minutes with a stopwatch, read at eye level at the bottom of the meniscus, then rate = volume / minutes x 60 and percent error = (delivered minus set) / set x 100. Typical acceptance is plus or minus 5%. A 30-minute collection averages the peristaltic pulses and shrinks reading error. The gravimetric method weighs the water instead, since 1 g of water equals 1 mL, and an infusion analyzer automates both. Also test the occlusion alarm by clamping downstream, the air-in-line alarm, battery run time against the specification, and the set's free-flow clamp. Document the set rate, time, volume, computed rate, percent error, and the acceptance band."
    },
    {
      id: "u6l6", title: "Defibrillators, AEDs, and the Defibrillator Analyzer", domain: 2, obj: "MD-C", minutes: 10, lab: "defib-check",
      body: `A defibrillator sits on a crash cart for months doing nothing, and then one morning a life depends on it delivering the energy printed on its dial. Nothing you inspect has a higher ratio of consequence to use, and nothing in the shop can hurt you faster if you are careless with it.

## What defibrillation does
In **ventricular fibrillation** the ventricles quiver instead of beating and move no blood. In **pulseless ventricular tachycardia** they beat far too fast to fill. In both cases a measured shock depolarizes the whole muscle at once, stopping the chaos so the heart's own pacemaker can restart an organized rhythm. The shock does not start a stopped heart: a flat line is treated with chest compressions and drugs, not a shock. Defibrillation is one part of resuscitation alongside **CPR**, which is why the device sits on a cart with everything else.

## Manual, automated, and the modes
A **manual** defibrillator is operated by a clinician who reads the rhythm, chooses the energy, charges, and discharges. An **AED** reads the rhythm itself and will only charge and advise a shock for a rhythm a shock can help, which is what makes it safe for a responder with no training.

Two more modes appear on manual units:

- **Synchronized cardioversion** times the shock to the **QRS** complex so it does not land during the vulnerable part of the cycle. It is used on an organized but too-fast rhythm. Defibrillation of a chaotic rhythm is unsynchronized, because there is no complex to synchronize to. The analyzer measures the **sync delay**, the time from the complex to the discharge.
- **External pacing** sends small repeated pulses through the pads to drive a heart that is beating too slowly, set by rate and current rather than joules.

## Waveforms, energies, and pads
Older units delivered a **monophasic** waveform, current in one direction, and needed more energy. Current units are **biphasic**: the current reverses partway through, which defibrillates at lower energy with less damage to the muscle.

\`\`\`
Setting                 Energy
biphasic adult shock    120 to 200 J, by the manufacturer's protocol
monophasic adult shock  360 J
pediatric dosing        2 to 4 J/kg of body weight
analyzer load           50 ohm, standing in for a patient's chest
\`\`\`

**Pads** are disposable, pre-gelled, adhesive, and they carry an **expiry date**; expired or dried pads are the most common reason a defibrillator fails when it is needed. **Paddles** are reusable metal, pressed to the chest with conductive gel, and on some units they carry the charge and discharge controls in the handles.

## The defibrillator analyzer
The analyzer presents a **50 ohm load**, the standard stand-in for the impedance of a chest, and measures what actually arrives there.

- **Delivered energy** in joules at each setting, compared against the manual's allowance. That allowance is often a percentage or a fixed number of joules, whichever is larger, because a percentage of 2 J is meaninglessly small.
- **Charge time** from pressing charge to the ready tone, typically specified at the maximum setting from a full battery. A charge time that is creeping up means an aging battery or capacitor.
- **Sync delay** in milliseconds, with the analyzer supplying a rhythm for the unit to synchronize to.
- Pacing output, on units with that mode.

## Daily checks and the stored charge
Clinical staff do a **daily user check**: the unit is on the cart, the battery indicator or self-test light is good, pads are present and in date, cables are attached, the paper is loaded, and the self-test log shows no failures. Your scheduled inspection goes further: visual and cord, electrical safety, delivered energy at low, middle, and maximum settings, charge time, sync, pacing, battery capacity, and the paper and pads; the battery's install or expiry date is checked and recorded too.

The hazard is the **capacitor**. It holds a lethal charge after the unit is charged, and it holds it even after the power is off and the battery is out. Discharge into the analyzer or use the unit's own internal dump before you open anything, call clear and make sure nobody is touching the patient, bed, or paddles before any discharge, and never discharge into the air or onto a bench.

## In the lab
You discharge into the analyzer at the 2, 50, 200, and 360 J settings and record what it measured at each one, compute the percent error at 360 J keeping the sign, and then apply the allowance rule: plus or minus a percentage of the setting or a fixed number of joules, whichever is larger, which is why a 2 J setting is judged against the fixed figure rather than the percentage.

> Exam tip: biphasic adult 120 to 200 J, monophasic adult 360 J, pediatric 2 to 4 J/kg, analyzer load 50 ohm. The analyzer measures delivered energy, charge time, and sync delay. Synchronized cardioversion times the shock to the QRS; defibrillation is unsynchronized. Pads expire, and a charged capacitor stays lethal after the power is off.`,
      hook: "Defibrillation stops ventricular fibrillation or pulseless ventricular tachycardia so the heart's own pacemaker can restart an organized rhythm; a flat line gets compressions, not a shock. A manual unit lets a clinician choose the energy, while an AED reads the rhythm and advises a shock only when one will help. Monophasic current goes one direction and needs more energy; biphasic reverses partway and works at lower energy. Biphasic adult 120 to 200 J, monophasic adult 360 J, pediatric 2 to 4 J/kg. Synchronized cardioversion times the shock to the QRS; external pacing drives a slow heart. Pads are disposable and expire; paddles are reusable with gel. The defibrillator analyzer presents a 50 ohm load and measures delivered energy, charge time, and sync delay. Daily user checks cover battery, pads in date, cables, paper, and the self-test log. A charged capacitor stays lethal after power off, so dump the charge before opening the case."
    },
    {
      id: "u6l7", title: "Suction, Warming and Cooling, SCDs, and Physical Therapy Equipment", domain: 2, obj: "MD-C", minutes: 9,
      body: `These are the devices that fill the rest of the cart and the rest of your week. None of them is complicated, and all of them deliver something to a patient: negative pressure, heat, cold, squeeze, or electrical pulses. For each one, say what it delivers and the basic check.

## Suction
Suction removes fluid, secretions, and blood. A suction pump is also called an **aspirator**, and the two words mean the same device on a work order. There are two sources.

A **wall regulator** plugs into the vacuum outlet in the headwall. It has a gauge reading **mmHg** of vacuum, a knob to set the level, and a selector for continuous or intermittent. A **portable suction pump** carries its own motor and battery for transport, the ambulance, or a room with no piped vacuum. Both run through a **canister** that collects the fluid and a **filter** that protects the pump or the wall line from overflow; a clogged filter is the usual reason a unit will not pull.

The check: **clamp the tubing** at the patient end so no air can get in, set the regulator, and watch the gauge reach the set level and hold it. If it will not reach, the leak is in the lid seal, the canister, the tubing, or the filter, in that order, and a reference gauge teed into the patient connection tells you whether the device's own gauge is honest.

## Warming and cooling
- **Forced-air warmers** blow warm air through a disposable inflatable blanket over the patient. The check: set temperature against a reference, the high-temperature cutoff, the hose and its connection, and the air filter. A hose blowing on bare skin without the blanket burns, so the interlock and the warning labels matter.
- **Fluid warmers** warm blood or intravenous fluid on its way to the patient. The check: outlet temperature accuracy and the over-temperature alarm and cutoff.
- **Warming and cooling blankets** circulate temperature-controlled water through a pad, driven by a bedside unit, and are used to warm a cold patient or deliberately cool one. The check: water temperature accuracy at two setpoints, the high and low limits, hose fittings, and leaks.
- **Infant warmers and incubators** hold a newborn's temperature, either radiantly from above or by warming the air in an enclosed hood. Recognize them, know they are temperature-critical devices with their own alarm and probe checks, and leave the detail to a specialist course.

The pattern across all of them: an accuracy check at one or two setpoints, an independent **over-temperature cutoff** that is tested separately, and the hoses, filters, and probes.

## Sequential compression devices
An **SCD** inflates **sleeves** wrapped around the calves or thighs in a timed **cycle**, squeezing from the ankle upward to keep blood moving and prevent clots in a patient who cannot walk. The check: pressure accuracy against a reference gauge, **cycle timing**, and **tubing** and sleeve leaks, since a cracked connector means a sleeve that never reaches pressure and a unit that alarms all night.

## Physical therapy equipment
- **TENS**, transcutaneous electrical nerve stimulation, sends small adjustable electrical pulses through skin electrodes to block pain. The check: output amplitude and rate against the display, electrode and lead condition, and the battery.
- **Therapeutic ultrasound** delivers sound energy through a handheld head and coupling gel to warm tissue deep under the skin. The check: output power with a wattmeter, the head for cracks, and the timer, because a stalled head left on in one place burns.
- **CPM** machines, continuous passive motion, slowly flex and extend a joint after surgery through a set range. The check: range limits, speed, the emergency stop, and the frame and straps.
- **Treadmills** are used for stress testing and rehabilitation. The check: speed accuracy, the emergency stop and the safety clip, belt condition and tracking, and the handrails.
- **Hot and cold packs** come from a warming cabinet or a chiller. The check is the cabinet: temperature accuracy against a reference and the high-limit control, since the hazard is a burn on skin that cannot report it.

> Exam tip: suction is negative pressure measured in mmHg from a wall regulator or a portable pump, checked by clamping the tubing and watching the gauge reach and hold. Warming and cooling devices get an accuracy check plus a separate over-temperature cutoff test. SCDs deliver a timed squeeze and get pressure, cycle, and leak checks. TENS delivers pulses, therapeutic ultrasound delivers sound energy and needs a working timer, and CPM machines move a joint through a set range.`,
      hook: "Suction removes fluid with negative pressure read in mmHg, from a wall regulator at the headwall or a portable pump with its own motor and battery, through a canister and filter; check it by clamping the tubing and watching the gauge reach and hold the set level. Forced-air warmers, fluid warmers, warming and cooling blankets, and infant warmers and incubators all get a temperature accuracy check at setpoint plus a separate over-temperature cutoff test, with hoses, filters, and probes inspected. A sequential compression device squeezes the legs in a timed cycle through sleeves and tubing, checked for pressure accuracy, cycle timing, and leaks. TENS sends small pulses through skin electrodes; therapeutic ultrasound warms deep tissue through gel and needs a working timer; CPM machines move a joint through a set range; treadmills need speed, belt, and emergency stop checks; warming cabinets for hot packs need temperature and high-limit checks."
    },
    {
      id: "u6l8", title: "Hand Tools and the Biomed Toolbox", domain: 2, obj: "MD-D", minutes: 9,
      body: `A biomed's toolbox is not a mechanic's. It is a small, deliberate set that opens medical enclosures without marring them, measures what the job needs, and never guesses where a specification exists. Here is what belongs in it and what each tool is for.

## Drivers and wrenches
- **Screwdrivers**: **Phillips** for cross-head screws, **flat** for slotted, **Torx** for the six-point star you find all over medical enclosures, and **security bits** for the Torx with a pin in the middle, the triangle, and the spanner heads manufacturers use to keep users out of a case.
- **Allen wrenches**, also called hex keys, for socket-head screws on covers, shafts, and pulleys. Carry both **metric and SAE** sets, because a close-but-wrong key rounds the socket into a problem you cannot fix.
- **Nut drivers** for hex-head screws and the threaded standoffs that hold boards and connectors, which turn far better with the right driver than with pliers.
- A **torque wrench** for anything with a specification, reading in **inch-pounds** or **newton-meters**. Torque matters because too little lets a fastener back out under vibration or leaves a gasket leaking, and too much strips threads, cracks plastic, or crushes a seal. The rule is simple: if the manual prints a torque value, use the wrench and set it to that value.

## Pliers and cutters
- **Channel locks** grip large round fittings and nuts where no wrench fits.
- **Needle-nose pliers** reach into a crowded chassis to hold, bend, and place small parts.
- **Diagonal cutters** cut wire and cable ties flush.
- A **wire stripper** removes insulation at the correct gauge notch without nicking the copper underneath, and a nicked conductor breaks later, inside the insulation, where nobody can see it.
- **Crimpers** squeeze a terminal or a connector onto a conductor so the joint is mechanically and electrically sound; the crimper has to match the terminal family, and a crimp you can pull apart by hand was never finished.
- **Vice grips** clamp a part or a frozen fastener temporarily when nothing else will hold it.
- **Soldering** is the last resort and the delicate one: a clean tip at the right temperature, heat the joint and not the solder, let the joint pull the solder in, and keep the iron away from plastic connectors and nearby components. A good joint is shiny and concave; a dull ball is a cold joint that will fail intermittently.

## Measuring and marking
- A **stopwatch** times collections, charge times, cycles, and battery runtime. Start it with the device, not after.
- A **graduated cylinder** measures collected volume for a flow check, read at eye level at the bottom of the meniscus.
- A **tachometer** reads rotational speed in **RPM**, optically off a reflective mark or by contact, and it is how a centrifuge's dial is checked against reality.
- **Calibration weights** and a reference scale check patient scales, at a low, middle, and high load. The weights are certified and carry their own due date.
- A **flashlight** or headlamp, because every connector you need to see is in shadow.
- A **label maker** for asset tags, inspection labels, cable ends, and the date on a replaced battery.

## Care, calibration, and misuse
Tools get wiped down when they leave a patient area, kept dry, kept in their places, and inspected: a screwdriver with a chewed tip damages every screw it touches and an insulated handle with a split is no longer insulated.

Every piece of **test equipment** carries a **calibration sticker** with a due date, and that includes the meter, the analyzer, the simulator, the tachometer, and the weights. Check the sticker before you check the device, because a reading from an out-of-calibration instrument proves nothing and cannot be defended in a record.

Three misuses to never commit: **pliers on a nut**, which rounds it and ruins hardware you may not be able to order; the **wrong screwdriver**, which turns a Phillips head into a hole; and a **torque wrench used as a breaker bar**, which knocks the wrench out of calibration and quietly makes every torque value you set after that a lie.

> Exam tip: match the tool to the fastener, carry metric and SAE hex keys, and use a torque wrench whenever the manual prints a value in inch-pounds or newton-meters. A tachometer reads RPM for a centrifuge, certified weights check scales, and a stopwatch and graduated cylinder do a flow check. Every instrument needs a current calibration sticker. Never use pliers on a nut, the wrong screwdriver, or a torque wrench as a breaker bar.`,
      hook: "The biomed toolbox: Phillips, flat, Torx, and security bits for medical enclosures, metric and SAE Allen wrenches, nut drivers for hex heads and standoffs, and a torque wrench set to the manual's value in inch-pounds or newton-meters because too little lets fasteners loosen and too much strips threads and crushes seals. Channel locks for large fittings, needle-nose pliers for small parts, diagonal cutters for wire and ties, a wire stripper at the right gauge notch, crimpers matched to the terminal, vice grips for stuck fasteners, and soldering for a shiny concave joint rather than a dull cold ball. Measuring tools: stopwatch, graduated cylinder, tachometer in RPM for centrifuges, certified calibration weights and a reference scale, flashlight, and label maker. Every instrument carries a calibration sticker with a due date, and a reading from an expired instrument proves nothing. Never use pliers on a nut, the wrong screwdriver, or a torque wrench as a breaker bar."
    },
    {
      id: "u6l9", title: "Incoming Inspection and Scheduled Maintenance, Start to Finish", domain: 2, obj: "MD-E", minutes: 10, lab: "incoming-inspection",
      body: `Two procedures bracket a device's whole life in the hospital. The **incoming inspection** happens once, before the device is ever used, and it creates everything the record will ever know about that device. **Scheduled maintenance** repeats on an interval until the device is retired. Learn both as ordered lists, because the exam asks what comes first and the floor asks what comes next.

## Incoming inspection, in order
1. **Paperwork.** Check the shipment against the packing slip and the packing slip against the purchase order: right model, right quantity, right voltage, right accessories. Catch a wrong or short shipment now, while the vendor still owns the problem.
2. **Physical inspection.** Unpack and look: shipping damage, dents, a cracked case, a bent cord pin, a cracked display. Note the model and serial number from the label. Do not power up something that is visibly damaged.
3. **Accessories and manuals.** Account for cords, batteries, probes, cables, cuffs, and the service manual and the instructions for use. File both documents where the department keeps them, because every later procedure quotes them.
4. **Asset tag and the record.** Apply the department's asset tag and create the record in the **CMMS**: model, serial number, manufacturer, location, department, purchase date, and the maintenance schedule it will follow. The tag number is how every future work order finds this device.
5. **Electrical safety test.** Ground resistance and leakage in every condition, plus lead leakage where there are applied parts, judged against your limits card. Write down the numbers: they are the **baseline** every future test compares against.
6. **Function test per the manual.** Run the manufacturer's performance procedure with calibrated test equipment, and compare each reading against the printed tolerance.
7. **Configuration.** Set what the department wants: alarm limits and defaults, the clock, the units of measure, the drug library or protocol file, the network address, the name the device reports, and any passcodes.
8. **User training.** If the model is new to the floor, arrange the in-service before the device goes into use. An unfamiliar device generates false service calls for a month.
9. **Release.** Apply the inspection label with the next due date and document the release in the record.

Steps 1 and 2 come first for a reason: they are the only steps that can still be undone cheaply.

## Scheduled maintenance, in order
1. **Interval.** The device's PM interval comes from the manufacturer's recommendation, the risk the device carries, and the department's program. High-risk life-support devices get inspected more often than a scale.
2. **Checklist.** Work the written procedure for that model so every technician does the same inspection: visual and cord, cleaning, electrical safety, function and performance against tolerances.
3. **Consumables.** Replace what the procedure lists on this interval: **filters**, **batteries**, seals, tubing, light sources, and the dated accessories. Date the battery you install so the next technician knows its age.
4. **Calibration.** Adjust what the manual allows you to adjust, and only with instruments whose calibration is current.
5. **Label.** Apply the inspection label with the date performed or the date due, so anybody on the floor can see at a glance whether the device is current.
6. **Document.** Readings with units, the limits they were judged against, parts used, time spent, a clear pass or fail, and your name and date in the CMMS.

## What "PM due" means, and why completion matters
A device's record carries a **PM due** date and a window around it. Inside the window the device is current; past it the device is **overdue**, which is a finding at a survey and a real risk, because overdue devices are the ones with the dead batteries and the worn cords. Departments track the **completion rate**: the share of scheduled inspections finished inside their window. It is reported to leadership and looked at by surveyors, and because the number comes from closed work orders, an inspection you performed but never closed counts as not done.

## In the lab
A new portable suction unit arrives. You walk the inspection in order: what to do first with the box, the electrical safety readings on the analyzer against the NFPA 99 limits, the right function check for a suction unit, the verdict, and the last step before it goes to the floor.

> Exam tip: incoming inspection runs paperwork, physical inspection, accessories and manuals, asset tag and CMMS record, electrical safety for the baseline, function test, configuration, user training, release. Scheduled maintenance runs interval, checklist, consumables, calibration, label, document. An inspection that is not closed in the CMMS counts as not done.`,
      hook: "Incoming inspection in order: packing slip against the purchase order, physical inspection for shipping damage, accessories and manuals accounted for and filed, asset tag and a CMMS record with model, serial, location and schedule, the electrical safety test that becomes the baseline, the function test from the manual with calibrated equipment, configuration of alarm limits, clock and network, user training when the model is new, then release with an inspection label. Scheduled maintenance in order: the interval set by the manufacturer, risk, and program; the written checklist; consumables such as filters and batteries, dated when installed; calibration with in-date instruments; the inspection label; and documentation of readings, limits, parts, time, pass or fail, name and date. PM due means a date and a window, past it the device is overdue, and completion rates come from closed work orders, so unclosed work counts as undone."
    },
    {
      id: "u6l10", title: "Minor Troubleshooting: The First Checks", domain: 2, obj: "MD-E", minutes: 9,
      body: `Most calls are not repairs. A nurse pages the shop, you walk up to a device that will not do something, and nine times out of ten the fix is power, a connection, an accessory, or a setting. The skill is not knowing the circuit; it is working a short list in order so you find the simple thing before you spend an hour on the hard thing.

## Work the list in order
1. **Power.** Is it plugged in, at both ends? Is the switch on? Does the battery indicator show charge, and has the unit been on battery so long that it is now flat? A surprising share of calls end here.
2. **The outlet.** Plug something you trust into the same receptacle. If a known-good device will not run either, the problem belongs to facilities, not to you, and that one test saves an hour and tells the electrician exactly where to go.
3. **Fuse or breaker.** Check the device's own fuse or breaker. If a fuse has blown, replace it with the identical current and voltage rating, and then ask **why it blew**, because a fuse that opens twice is a symptom and not a part.
4. **Cables and connectors.** Reseat everything. Look for bent or pushed-back pins, cuts, kinks, and strain at the ends, which is where cables fail. Flex a suspect cable while watching the symptom.
5. **Swap the accessory.** Put on a known-good lead wire, probe, cuff, sensor, or administration set. This single test splits the problem in half: if a good accessory fixes it the device is fine, and accessories fail far more often than devices.
6. **User or device.** Ask the person who called what happened, and then watch them do the task the way they normally do it. Say it plainly and without blame: most calls turn out to be a setup step, a supply, or a setting, and finding that out is a successful call, not a wasted one.
7. **Look up the error code.** Write down the exact wording or number on the screen before you clear it, then find it in the service manual. The code is the manufacturer's own troubleshooting map.
8. **Restart.** Power cycle, but only after you have recorded the state and the code, because a restart erases the evidence as often as it fixes the fault.

## The simple thing first
This ordering is not laziness; it is probability. The common causes are common. Checking power before you open a case costs thirty seconds, while opening a case first costs an hour, risks damage, and often ends with you discovering the battery was flat. Change **one thing at a time** and recheck after each change, so that when the symptom goes away you know what fixed it.

## Know your scope, and when to stop
An associate technician has a boundary, and a good one knows exactly where it is. Stop and escalate when the next step needs a tool, a password, software, or training you do not have; when the device is under a service contract whose terms you would void; when the fault is inside a high-energy section such as a defibrillator capacitor bank or an imaging high-voltage supply; or when you simply do not know. Escalating is a professional act. Guessing next to a patient is not.

When you stop, leave the device **safe**: tag it clearly as out of service, remove it from the patient area if it could be grabbed in a hurry, and tell the unit what you have done and what happens next.

## Communicate and document
Tell the user what you found, in plain words, and what they should do next time. Tell them when the device will be back. Then write it down: the problem as reported, what you observed, the exact error code, the tests you ran with their results, what you changed, parts used, time, and the outcome. A call that ended with "no fault found, user re-trained on purging the set" is a real record and may be the third such note that finally explains a pattern.

## Your first-line test equipment
Three instruments answer most first questions. The **DMM** checks battery voltage, supply voltages, fuse and cable continuity, and resistance with the power off. The **electrical safety analyzer** answers whether a device is safe to be near a patient at all. The **patient simulator** feeds a monitor a known signal so you can tell a bad monitor from a bad accessory. Reach for them in that order: is it powered, is it safe, is it accurate.

> Exam tip: power, outlet, fuse or breaker, cables and connectors, swap the accessory, user versus device, error code, then restart. Change one thing at a time. Replace a fuse with the same rating and find out why it blew. Know your scope, escalate rather than guess, tag what you take out of service, and document everything including the calls that turned out to be nothing.`,
      hook: "First checks in order: power at both ends and the battery, the outlet tested with a known-good device, the device's fuse or breaker with an identical replacement and the question of why it blew, cables and connectors reseated and flexed, then swap the accessory for a known-good one because accessories fail more often than devices. Ask the user what happened and watch them do the task, since most calls are setup, supplies, or settings. Record the exact error code before clearing it and look it up in the service manual, and restart only after recording the state. Check the simple thing first and change one thing at a time. Know your scope: escalate when the step needs tools, passwords, software, or training you lack, or when high energy is involved, and tag anything you take out of service. Communicate with the user and document everything. First-line instruments are the DMM, the electrical safety analyzer, and the patient simulator."
    }
  ]
});

FRA.units.push({
  id: "u7", n: 7, title: "Healthcare IT", domain: 6,
  blurb: "The computer inside and beside every modern device: its parts, its connectors, the network it lives on, the apps you work from, the privacy rules you work under, and the security habits that keep a device on the network.",
  assumes: "Nothing beyond unit 1. No computer background needed.",
  lessons: [
    {
      id: "u7l1", title: "Inside a Computer", domain: 6, obj: "HIT-B", minutes: 9,
      body: `Every monitor, pump, analyzer, and imaging console in the building is a computer wearing a medical case. You do not have to be a network engineer, but when a device will not boot, will not print, or will not join the network, the words in this lesson are how you describe the problem to somebody who can help.

## The parts, and what each one failing looks like
- **CPU**, the processor: it runs the instructions. It rarely fails outright, but a blocked fan or a dust-packed heatsink makes it overheat, and an overheating machine slows down and then shuts off.
- **RAM**, the working memory: fast, and **volatile**, meaning everything in it disappears the instant power drops. That is why unsaved work is lost in a power blip and why "it forgot everything" is a different problem from "it lost a file". Bad memory causes random crashes with no pattern.
- **Storage**, which keeps data with the power off. A **hard drive** stores it magnetically on **spinning platters** with a head that flies above them, so it has moving parts, it fails, and clicking or grinding is its warning. A **solid-state drive** has no moving parts, is much faster, and survives the bumps a rolling cart delivers, which is why it belongs in anything mobile.
- **GPU**, the graphics processor: it draws the display. It matters where images matter, such as an imaging review workstation.
- **Power supply**: it converts wall AC into the low-voltage DC the board needs. A failing one causes random reboots, a machine that will not start at all, or a smell you will remember.
- **Motherboard**: the board everything plugs into, carrying the connections between parts.
- **Ports**: the connectors on the outside for power, network, display, keyboard, mouse, and storage.

## Firmware, the operating system, and drivers
**BIOS**, or the modern **UEFI**, is the firmware on the board itself. It wakes the hardware at power-on, holds settings such as boot order and the clock, and finds the drive to start from. A dead coin cell on the board loses those settings, which shows up as a wrong clock, and on older machines a lost boot order.

The **operating system** manages the hardware and runs the applications. **Drivers** are small programs that let the operating system talk to one specific piece of hardware: a printer, a scanner, a serial adapter, an imaging board. Missing or wrong drivers are the classic failure after an update, and "it worked until the update" is almost always a driver story.

## Printers
A **local printer** plugs into one machine, usually by **USB**, and prints only for that machine. A **network printer** has its own **IP** address and prints for everybody. Either way the job goes into a **print queue** first, and a stuck queue is the most common printing fault: the job sits there, the next jobs stack behind it, and nothing comes out until somebody clears it. Check the queue before you check the printer.

## Form factors
A **desktop** sits under a bench with room for parts and real cooling. A **laptop** carries its own battery and screen and goes where the work is. A **tablet** is the glass panel staff carry on rounds, and it is the form factor your department increasingly supports because the clinical apps live on it. Each has the same parts in a different package, and each gets dropped, soaked, and left to run flat.

## The computer inside a medical device
This is the part that makes healthcare IT different. The computer in an infusion pump or a monitor is **embedded**: it runs software the manufacturer wrote and validated as part of a regulated medical device. You do not treat it like an office machine.

- **Never install an update, a patch, or antivirus on a medical device without the manufacturer's validated release and your department's approval.** An unapproved update can take the device out of specification or out of service, and it can void the device's clearance for clinical use.
- The configuration is part of the device: alarm defaults, drug libraries, and calibration data live in that computer, so a board swap or a reset means restoring the configuration and re-verifying.
- Many of them cannot be patched at all, which is exactly why hospitals put them on their own protected network segment, the subject of a later lesson in this unit.

> Exam tip: RAM is volatile working memory, storage keeps data with the power off, a hard drive has spinning platters and a solid-state drive has none, the power supply turns AC into DC and causes random reboots when it fails, BIOS or UEFI starts the machine, and drivers are the usual casualty of an update. A local printer plugs in by USB, a network printer has an IP address, and a stuck print queue is the first thing to check. Never patch an embedded medical device without the manufacturer's validated update.`,
      hook: "The CPU runs instructions and overheats when its fan or heatsink is blocked. RAM is fast working memory and is volatile, so its contents vanish when power drops. Storage keeps data without power: a hard drive uses spinning magnetic platters and moving heads and warns by clicking, while a solid-state drive has no moving parts and suits mobile carts. The GPU draws the display, the power supply converts wall AC to low-voltage DC and causes random reboots as it fails, the motherboard connects everything, and ports are the outside connectors. BIOS or UEFI is the firmware that starts the machine and finds the boot device. The operating system runs applications and drivers let it talk to specific hardware, which is why updates break printing and scanning. A local printer connects by USB, a network printer has its own IP address, and both use a print queue that jams. Desktops, laptops, and tablets hold the same parts. The computer inside a medical device is embedded and regulated: never patch it without the manufacturer's validated update."
    },
    {
      id: "u7l2", title: "Connectors and Cables", domain: 6, obj: "HIT-C", minutes: 9,
      body: `Half of healthcare IT support is identifying a connector across a room and knowing what it should be plugged into. Learn these by shape, because that is how they arrive: a bag of cables on your bench with no labels.

## The USB family
\`\`\`
Connector    Shape                                  Where you see it
USB-A        flat rectangle, one-way                 the host end: computers, chargers, hubs
USB-B        squarish with a notched top             the device end: printers, older scanners
USB-C        small oval, reversible                  current phones, tablets, laptops, new devices
micro-USB    small trapezoid, thin                   handheld meters, older phones, battery chargers
mini-USB     small trapezoid, taller                 older cameras and legacy field instruments
\`\`\`

**USB** carries data and power on the same cable, which is why it charges things. Speed has climbed through several generations, and the practical point is that a cable and both ends have to support a speed for you to get it: plugging a fast drive into an old port gives you the old speed, not an error. Blue or teal insert colors often mean a faster generation, though colors are a hint and not a standard.

## Video output
A computer's **video output** is the port the display plugs into, and four shapes are still in service:

- **HDMI**: current digital video and audio in one flat connector with slightly tapered corners. The default on displays and carts.
- **DisplayPort**: digital video, a rectangle with one corner cut, often with a latch you must press to release. Common on workstations with multiple monitors.
- **VGA**: the old analog standard, a blue fifteen-pin shell with two thumbscrews. Analog means a long or poor cable gives a soft, ghosted picture instead of failing cleanly.
- **DVI**: the white digital connector of the generation between VGA and HDMI, still on older imaging displays.

## Network and serial
- **RJ45** is the eight-pin clip-in network jack, on **Cat5e** or **Cat6** twisted-pair cable. Cat6 is built to tighter tolerances for higher speeds over the same distance. Both terminate in a wall jack or a patch panel.
- **Fiber** carries light down glass strands. It goes long distances, carries enormous bandwidth, and, because it is glass, it also provides complete **electrical isolation** between buildings, which is why it is used between a hospital and a detached clinic.
- **RS-232 serial**, usually on a **DB9** shell, is a nine-pin two-row connector that looks ancient and is still everywhere on medical devices. It is how you reach the service menu on an older monitor, pull a log from an analyzer, or feed data to a strip printer. Keep a serial-to-USB adapter in your bag, and know that the adapter needs a driver.

A **cable tester** settles any argument about a network cable: plug both ends into it and it checks each of the eight conductors end to end and in the right order, then reports an open, a short, or a crossed pair. A **cable tracer**, a tone generator on one end and a probe in your hand, tells you which jack or which end of a bundle a cable belongs to. Both beat guessing, and both are cheap enough that your shop should own them.

## Power and audio
**Power connectors** on medical devices are usually a three-prong hospital-grade plug at the wall and a **detachable cord** that ends in the common rectangular appliance connector at the device. That means the cord is a replaceable part, and the cord is also the single most common safety-test failure. Low-voltage power comes from external supply bricks with barrel plugs that vary in diameter (outside and inside), voltage, and polarity, so confirm all three before plugging in: a correctly sized plug carrying the wrong voltage destroys a device.

**Audio** is the 3.5 mm stereo jack you know from headphones, found on monitors for alarm tones and on teaching and therapy equipment.

## Identifying, caring, and adapting
To identify an unknown connector, count the pins and their rows, note the shell shape, look for a latch or thumbscrews, and check whether it is keyed so it fits only one way. Then match it to the port and never force it: a connector that needs force is the wrong connector or is upside down, and bent pins are a repair rather than a cable swap.

Cable care is a safety issue in this job. Support the weight so a connector never hangs on its own solder joints, and use the **strain relief** at both ends rather than pulling on the cable body. Coil cables loosely, never kink them, and route them out of door hinges, wheels, and bed rails. Pull a plug by its shell and never by its cord.

**Adapters** solve a mismatch of shape, and sometimes of signal, but each one is another connection that can fail, and a passive adapter cannot create a signal that is not there. Prefer the correct single cable where one exists, and be especially careful with the three-prong to two-prong mains adapter, which defeats the ground and is never acceptable on patient-care equipment.

> Exam tip: identify by shape. USB-A is the flat host end, USB-B the squarish device end, USB-C the small reversible oval. HDMI and DisplayPort are current digital video, VGA is the blue fifteen-pin analog shell, DVI is the white digital one. RJ45 on Cat5e or Cat6 is network, fiber is glass for distance and isolation, and RS-232 on a DB9 is the service port on medical devices.`,
      hook: "Identify connectors by shape. USB-A is the flat host end, USB-B the squarish device end, USB-C the small reversible oval, with micro-USB and mini-USB on handhelds and legacy gear; USB carries data and power and gives the slowest speed of cable, port, and device. Video: HDMI and DisplayPort are digital, VGA is the blue fifteen-pin analog shell whose long cables go soft rather than failing, DVI is the older white digital plug. Network is RJ45 on Cat5e or Cat6 twisted pair, and fiber carries light for long runs and electrical isolation between buildings. RS-232 on a DB9 shell is the service and data port still common on medical devices, and a serial-to-USB adapter needs a driver. Detachable mains cords are replaceable parts and the most common safety-test failure; check barrel-plug voltage, polarity, and size before plugging in. Support cables at the strain relief, pull plugs by the shell, and never use a three-prong to two-prong adapter on patient-care equipment."
    },
    {
      id: "u7l3", title: "Networks: LAN, WAN, Wi-Fi, and the Data Closet", domain: 6, obj: "HIT-D", minutes: 10, lab: "ping-walkthrough",
      body: `A monitor that cannot reach its central station, a pump that will not take a drug library update, a cart that goes quiet in one hallway: these are network calls, and they come to you first because the device has your asset tag on it. You do not need to run the network. You need to find out whether the fault is the device, the cable, the room, or the network, and hand it to the right person with evidence.

## The shape of a network
A **LAN** is one building or campus: the hospital's own wiring. A **WAN** links separate sites across distance over circuits a carrier provides, so a clinic across town reaches the data center over the WAN.

Inside the LAN, a **switch** connects wired devices and forwards each packet only to the port that needs it. The part it replaced, an **Ethernet hub**, copied every packet to every port, which wasted the wire and let anything on it see everything; if you meet one still in service, it is a finding, not a spare. A **router** joins different networks together, and the router's address on your network is the **default gateway**, meaning the address a device sends traffic to whenever the destination is somewhere else.

Each device has an **IP** address and a **subnet mask**. The mask says which part of the address is the network. With the common mask **255.255.255.0**, the first three numbers are the network: **10.20.4.57 and 10.20.4.90 are on the same subnet and can talk directly, while 10.20.9.20 is not and every packet to it goes through the gateway.** That single rule answers a large share of network questions on the exam and on the floor.

Addresses arrive two ways. **DHCP** hands them out automatically from a pool, and a device gets whatever is free. A **static** address is typed in and never changes, which is what a central station or a server needs; many hospitals compromise with a DHCP **reservation**, so a device is handed the same address every time by its hardware address. **DNS** turns names into addresses, so if an address works and the name does not, suspect DNS.

## Wireless, and short range
**Wi-Fi** is the radio network. The **SSID** is the network's broadcast name, the **2.4 GHz** band reaches farther but is crowded and slower, the **5 GHz** band is faster with more channels and less interference but covers less ground, and traffic is secured with **WPA2** or the newer **WPA3**. A device that works everywhere except one hallway has a coverage problem, not a device problem.

**Bluetooth** is short-range pairing for a printer, a probe, or a handheld scanner. **RFID** tags are small transponders read by an antenna, used for asset tags and inventory; a hospital-wide **RTLS**, a real-time location system, is built on them and is how a hospital finds its pumps.

## Keeping devices apart
A **VLAN** is a separate logical network inside the same physical switches. Medical devices normally live on their own VLAN, away from office computers and guest traffic, which limits what can reach a device that cannot be patched and contains the damage when something on the office side is compromised. A device moved to the wrong wall jack can land on the wrong VLAN and simply go silent.

A **VPN** is an encrypted tunnel across an untrusted network. When a vendor needs remote access to a device for service, a controlled, auditable VPN account is the right answer, not an open port or a modem hanging off the device.

**Telemetry** is the exception to all of this: patient telemetry runs on **WMTS**, radio bands reserved by regulation for medical telemetry, with its own antennas and receivers, so it is not competing with phones and office wireless for airtime.

## The data closet
The jack in the wall runs back to a **patch panel** in a closet, where a short cable connects it to a port on a **switch** in a **server rack**. The floor closet is an **IDF**, an intermediate distribution frame, which the IT department may call the telecommunications room; the building's core room, where the IDFs come together with the servers and the circuits that leave the building, is the **MDF**, the main distribution frame. When you report a dead jack, report the room and the jack number printed on the faceplate: that label is how the network technician finds the right port.

## Two commands that answer most questions
**ipconfig** prints the machine's own address, subnet mask, and default gateway. Start there, because everything else depends on those three numbers.

**ping** sends a few small packets to an address and reports replies, round-trip times, and loss. Ping the **gateway** first: replies with no loss mean the machine, its cable, the jack, and the local switch path are all working, so the fault is further out. Then ping the destination. Loss or timeouts to the server with a clean gateway is evidence that the problem is on the network beyond your room, and that is the moment to call IT with the output rather than swapping cables.

## In the lab
A central station cannot see its telemetry server. You read an **ipconfig** and two **ping** outputs: find the station's own address, identify which device answered the first ping, apply the subnet rule to decide whether the server is local, compute the packet loss percentage, and choose the best next step.

> Exam tip: LAN is local, WAN links sites; a switch connects a LAN, a router joins networks and its address is the default gateway. With a 255.255.255.0 mask, matching first three numbers means the same subnet. DHCP is automatic and static is typed; DNS maps names to addresses. Medical devices sit on their own VLAN, vendors come in over a VPN, telemetry rides WMTS. Run ipconfig first, then ping the gateway, then the destination.`,
      hook: "A LAN covers one building or campus and a WAN links sites. A switch connects wired devices; a router joins networks and its address on your network is the default gateway. An IP address plus a subnet mask of 255.255.255.0 means devices sharing the first three numbers are on the same subnet and anything else goes through the gateway. DHCP assigns addresses automatically, often by reservation for devices, while a static address is typed in; DNS turns names into addresses. Wi-Fi broadcasts an SSID, 2.4 GHz reaches farther and 5 GHz is faster, secured with WPA2 or WPA3; Bluetooth pairs short range; RFID tags and an RTLS locate equipment. Medical devices live on their own VLAN and vendors reach them through a VPN. Telemetry runs on reserved WMTS bands. Wall jacks land on a patch panel and switch in a floor closet called an IDF, which feeds the building's MDF. Run ipconfig for your own address, mask, and gateway, then ping the gateway before the destination."
    },
    {
      id: "u7l4", title: "Apps and Smartphones on the Job", domain: 6, obj: "HIT-A", minutes: 8,
      body: `The device in your pocket is now a shop tool, and it is used badly more often than any screwdriver. Used well it saves a walk back to the shop every half hour; used carelessly it creates a privacy incident that outlives the repair.

## The work you do from a phone or tablet
- **The CMMS mobile app.** Open, update, and close work orders at the bedside; look up a device's history before you touch it; see what else on that floor is due. Closing a work order where you finished it, instead of six hours later from memory, is the single habit that most improves a department's records.
- **Barcode and QR scanning.** Point the camera at the asset tag and the record opens, with no mistyped asset number and no guessing which of four identical pumps you are holding. The same scan logs parts and serial numbers.
- **Manuals and libraries.** Service manuals and the instructions for use travel as **PDF** files, and manufacturer libraries hold them along with bulletins and parts lists. Keep the ones you use offline, because the basement room with the equipment problem is the room with no signal.
- **The camera, for documentation.** A photograph of a cracked housing, a burned connector, a model label, or a wiring layout before you unplug it is worth a paragraph of description. Two hard rules: **never photograph a patient**, and never photograph a screen or a chart that shows patient information. Check the background before you tap, because what is behind the device is in the picture too.
- **Email and messaging.** Short, factual, no patient details, naming the asset number and the device rather than the room and the person. Assume anything you write may be read by a manager, a vendor, or a surveyor later, because it may be.
- **The calendar.** Scheduled maintenance assignments, vendor visits, in-service sessions, and the follow-up you promised a floor.
- **An authenticator app.** Many hospital systems need a second factor to sign in, and the app on your phone generates it. Set it up on day one, because the account you cannot reach is the record you cannot write.

## Phone hygiene in clinical areas
A phone goes everywhere you go, which means it goes into isolation rooms and onto bed rails. Wipe it with an approved disinfectant wipe the way you wipe a meter. Keep it out of your hands at a bedside: the patient and the nurse cannot tell whether you are reading a manual or texting, and perception is part of the job. Silence it before you walk into a procedure room, and do not take a call next to a patient. In an **MRI** suite the phone is a ferromagnetic object like any other and stays outside the magnet room.

## Permissions, updates, and whose phone it is
Review what an app may reach. A scanning app needs the camera; it does not need your contacts or your location. Install work apps from the hospital's own catalog or the official store, keep them and the phone's operating system current, and do not sideload.

Know the difference between a **personal** device and a **work** device. If your personal phone is enrolled in the hospital's management system, the hospital can enforce a passcode and encryption and can remotely wipe its work data, and in some arrangements the whole device. Hospital data belongs in hospital apps: do not move device logs, service records, or anything with patient information into personal cloud storage, personal email, or a personal messaging thread. If you leave or your phone is lost or stolen, report it the same day.

> Exam tip: the phone is a tool with a privacy edge. Close work orders where you did the work, scan asset tags instead of typing them, keep manuals offline, and photograph equipment only, never patients or screens with patient information. Keep work data in work apps, use the authenticator, wipe the phone like any other instrument, and leave it outside the magnet room.`,
      hook: "The phone is a shop tool: the CMMS mobile app opens, updates, and closes work orders where the work happens; barcode and QR scanning of asset tags removes typing errors; service manuals and instructions for use travel as PDF files that should be kept offline for basements with no signal; the camera documents cracked housings, burned connectors, and model labels, but never a patient and never a screen showing patient information, background included; email and messaging stay short and factual with asset numbers rather than patient details; the calendar carries the maintenance schedule; and an authenticator app supplies the second factor for hospital sign-in. Wipe the phone like any instrument, silence it in clinical areas, and keep it out of the magnet room. Review app permissions, install from the hospital catalog or official store, keep apps updated, know that an enrolled personal device can be wiped remotely, and keep hospital data out of personal accounts."
    },
    {
      id: "u7l5", title: "HIPAA, the EMR, and Device Integration", domain: 6, obj: "HIT-E", minutes: 9,
      body: `You will stand at bedsides, carry devices off floors, and read screens full of information about people you will never meet. Privacy law does not make an exception for technicians, and the rules are simpler than their reputation.

## What is protected
**PHI**, protected health information, is any health information that can be tied to a particular person: name, dates, addresses, record and account numbers, images, and the readings on a screen beside a named patient. Separated from the identity, a waveform is just data; with a name attached it is protected.

**HIPAA** sets the rules, and three ideas carry most of the weight:

- **Minimum necessary.** See and use only what your job requires. You need the device, its settings, its logs, and its asset number. You do not need the patient's diagnosis, and a technician reading a chart out of curiosity has committed a violation even with no further harm.
- **The privacy rule** governs who may see and share PHI, and under what conditions.
- **The security rule** requires safeguards for electronic PHI in three families: **administrative** (policies, training, access reviews), **physical** (locked rooms, screen placement, device control), and **technical** (passwords, encryption, audit logs).

**Breach reporting** has teeth and deadlines. A lost unencrypted laptop, a monitor sent to trade-in with patient data still on it, or a photograph posted publicly becomes a reportable breach with notifications to patients, to regulators, and sometimes to the press. The reporting duty is why your obligation is to **report immediately** rather than to quietly fix it: delay is its own violation.

## The EMR and device integration
The **EMR**, the electronic medical record, is the patient's chart in software. **Device integration** pushes data from your equipment straight into it: vital signs from monitors, infusion details from pumps, measurements from ultrasound, instead of a nurse copying numbers by hand.

The path runs device, then network, then an **interface** or **middleware** server that translates and routes the data, then the chart. **HL7** is the long-standing messaging standard those interfaces speak, and you only need to recognize the name and know it carries patient and clinical data between systems. **Barcode patient identification** ties the data to the right person: the nurse scans their own badge, the patient's wristband, and the device or the medication, and the match is what makes the record correct. An **admit, discharge, and transfer** feed keeps the systems agreed on who is in which bed, and when it is wrong a patient's vitals land in somebody else's chart.

The technician's lesson from all of this: a device assigned to the wrong patient or the wrong bed does not produce a blank chart, it produces a **wrong** chart. Confirming the patient and bed assignment is part of installing, moving, or returning any integrated device.

## PHI living on devices
Equipment stores patient data far more often than people expect. Monitors hold trends and alarm histories, infusion pumps hold infusion logs, ultrasound and imaging units hold studies with names attached, and defibrillators hold event recordings.

That means a device leaving the hospital needs its storage dealt with first: a trade-in, a loaner going back to a vendor, a unit going out for depot repair, or anything headed for disposal. Follow the manufacturer's documented procedure to clear patient data, or have the drive wiped or destroyed by the process your facility approves, such as a documented multi-pass overwrite or physical destruction, and keep the certificate or the record that it happened. "We assumed it was empty" is not a defense.

## Screens, photographs, and vendors
**Screen privacy** is physical security: turn a display away from a hallway, lock a workstation when you step away even for a minute, and do not leave a service menu open with a patient's record on it. **Photographs** of equipment are useful and photographs with patient information in them are incidents; check the whole frame, including a reflected screen. And an outside company that will handle PHI, including a service organization whose technicians work on your integrated devices, must have a **business associate agreement** in place before it touches anything: recognize the term and know it is signed before the work starts, not after.

> Exam tip: PHI is health information tied to a person, and minimum necessary applies to you at the bedside. The privacy rule says who may see it, the security rule requires administrative, physical, and technical safeguards, and a breach must be reported immediately. Device integration carries vitals into the EMR through an interface or middleware, so the wrong patient assignment writes the wrong chart. Clear or destroy stored patient data before any device leaves the hospital, and keep the record of it.`,
      hook: "PHI is any health information tied to a person, including the readings on a screen next to a named patient. HIPAA's minimum necessary rule applies to technicians: use only what the job needs. The privacy rule governs who may see PHI, the security rule requires administrative, physical, and technical safeguards, and a breach carries reporting duties and deadlines, so report immediately rather than fixing it quietly. The EMR is the patient's electronic chart, and device integration sends vitals, infusion data, and measurements into it through an interface or middleware server, with HL7 as the messaging standard, barcode patient identification tying data to the right person, and admit, discharge, and transfer feeds keeping bed assignments agreed. A device assigned to the wrong patient writes a wrong chart. Monitors, pumps, ultrasound, and defibrillators store patient data, so clear or destroy it, with a record, before a device goes to trade-in, loan return, depot repair, or disposal. Turn screens away, lock workstations, photograph equipment only, and get a business associate agreement before an outside company touches PHI."
    },
    {
      id: "u7l6", title: "Network Security Basics", domain: 6, obj: "HIT-F", minutes: 9,
      body: `Medical devices are on the network, many of them run software that cannot be updated, and attackers have learned that a hospital under pressure pays quickly. Security is not the IT department's private problem; the habits in this lesson are part of being allowed to put a device on a hospital network at all.

## Firewalls and the device segment
A **firewall** sits at a boundary and allows only the traffic that policy permits, blocking everything else. There is one at the hospital's edge, and there are usually others inside.

Behind one of those internal boundaries is the **medical device VLAN**, a separate segment holding equipment that cannot be patched or hardened the way an office computer can. The segment limits what can reach a vulnerable device and limits what that device could reach if it were ever compromised. The practical consequence for you: devices on that segment often cannot see the internet, a vendor cannot simply connect from outside, and moving a device to a convenient wall jack can put it on the wrong segment and break it. Network changes for devices go through IT, with the device's needs written down.

## Phishing
**Phishing** is a message that tries to make you click, open, or type a credential. Learn the shape: urgency ("your account closes today"), authority ("from the vice president"), a link whose text does not match where it actually goes, an unexpected attachment, a request to confirm a password, odd grammar, and a reply address that is almost right. Vendors and manufacturers are impersonated constantly, because a service notice is exactly the kind of mail a technician opens.

Three rules: **do not click, do not reply, report it** the way your facility asks, usually a report button or a security mailbox. If a message about a device looks real but unexpected, reach the vendor through the number you already have. And if you did click, say so immediately: fast reporting is the difference between one machine and the whole network.

## Patches and passwords
**Patching** splits in two. Workstations and servers get patched promptly on the hospital's schedule. **Medical devices get only the manufacturer's validated updates**, applied on the manufacturer's and the department's terms, because an unvalidated change can take a regulated device out of service or out of specification. "It cannot be patched yet" is a real condition, and the answer to it is the device segment and monitoring, not an unapproved update.

**Passwords**: long **passphrases** beat short complicated passwords, every system gets its own, and nothing gets written on a label stuck to a monitor. Default device passwords are published on the internet and must be changed at installation, and shared service accounts are tracked rather than handed around. Add **MFA**, multi-factor authentication, wherever it is offered: a stolen password alone then buys nothing.

## The small habits
- **Lock the screen** every single time you walk away, even for a moment at a nurse station.
- **USB hygiene**: no unknown or found drives, ever, and no personal drives in clinical machines. If you must move device data, use the method your department approves.
- **Antivirus** on workstations, kept current, and on medical devices only where the manufacturer supports it.
- **Least privilege**: your account carries the access your job needs and no more, which also means you are not the person who can accidentally delete the fleet.

## Ransomware and reporting
**Ransomware** encrypts files and demands payment, and in a hospital that means charting on paper, diverted ambulances, and canceled procedures for days or weeks. It usually enters through a clicked link, a stolen password, or an exposed remote connection, which is why the ordinary habits above are the actual defense.

If something looks wrong, **report it at once**: strange files, a ransom message, a device behaving oddly after a vendor visit, an account that logged in when you were asleep. Call the number your facility publishes, say what you saw and when, and then do what the security team tells you, which may include disconnecting a device from the network while leaving it powered. Do not try to clean it yourself, do not reimage it, and do not power it down unless told to, because the evidence of what happened is in the machine.

> Exam tip: firewalls filter at boundaries and the medical device VLAN sits behind one because devices cannot always be patched. Phishing is urgency plus a link: do not click, do not reply, report it. Patch devices only with the manufacturer's validated updates, use long unique passphrases plus multi-factor authentication, change default device passwords, lock the screen, and keep unknown USB drives out. Report any suspected incident immediately and let the security team direct what happens next.`,
      hook: "A firewall allows only permitted traffic at a boundary, and the medical device VLAN sits behind one because many devices cannot be patched or hardened; that is why device network changes go through IT and why a wrong wall jack can break a device. Phishing uses urgency, false authority, mismatched links, and unexpected attachments, often impersonating a vendor: do not click, do not reply, report it, and say so immediately if you did click. Workstations get patched promptly, but medical devices get only the manufacturer's validated updates. Use long unique passphrases, change published default device passwords at installation, and add multi-factor authentication. Lock the screen every time, keep unknown USB drives out of clinical machines, keep antivirus current where the manufacturer supports it, and work with least privilege. Ransomware encrypts files and stops a hospital, and it usually arrives through a clicked link, a stolen password, or an exposed remote connection. Report incidents at once and follow the security team's direction rather than cleaning up yourself."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Getting Hired", domain: 7,
  blurb: "Where biomed jobs are and how each kind hires, the resume and lab portfolio that get you an interview, the hands-on test, your first ninety days, and the certification ladder above this exam.",
  assumes: "The rest of the course. Not tested on the exam, but it is the reason you took it.",
  lessons: [
    {
      id: "u8l1", title: "Where the Jobs Are and How Each Hires", domain: 7, obj: "Career", minutes: 8,
      body: `There is no single biomed job market. There are five or six of them, they hire in different ways, and knowing which door you are knocking on changes what you put in front of the person who opens it.

## The employers
- **Hospital in-house HTM departments.** The most common first job: one department owning the whole equipment fleet, a mixed bench, a scheduled maintenance workload, and senior technicians to learn from. Best place to start, because you see everything and nobody expects you to know it all yet.
- **Independent service organizations.** An **ISO** contracts to service equipment for several facilities. Broad exposure quickly, more driving, and more working alone. Good early experience and a harder first week.
- **Manufacturer field service.** You work for the company that builds the device, go deep on one product line, get factory training and genuine parts and tools, and cover a territory. Often requires travel and more often requires experience, though some makers hire new technicians for simpler lines and train them.
- **Military.** The armed forces train their own biomedical equipment technicians through the Department of Defense program and then put them to work immediately on a wide fleet. It is the single most structured path into this field, and the training transfers directly to hospital work afterward.
- **Clinics and surgery centers.** Smaller fleets, fewer people, more autonomy, and you are often the only technician on site, so your judgment about when to call for help matters more.
- **Dialysis organizations.** Large fleets of similar machines with heavy regulatory requirements and water treatment systems alongside them. Very trainable work with clear procedures, and a common entry point.
- **Imaging service.** Radiography, fluoroscopy, and the high-voltage side of the shop. Normally entered after general biomed experience and specialist training rather than straight out of a course.

## The titles you will see
Postings use different words for similar work: **BMET I** for the entry level, with II and III above it; **biomedical equipment technician**; **equipment technician** or **medical equipment technician**; **field service technician** or field service engineer on the manufacturer side; **clinical engineering technician**; and support or associate titles such as equipment support specialist for the role that does transports, battery swaps, and simple inspections. Search for several of these, because a hospital that has nothing under one title may have three openings under another.

## How each one actually hires
- **Public postings** on hospital career pages and the large job boards: the main route for in-house departments, and they screen on keywords, so your resume has to use the words in the posting.
- **Referrals.** A large share of first jobs come from somebody who already works there. This is why you talk to people, attend a local association meeting, and keep in touch with a technician who answered your questions.
- **Apprenticeships and trainee programs.** Some systems run formal entry programs that hire with no experience and train on the job. They are worth going out of your way for.
- **Veteran hiring programs.** Hospitals and manufacturers both recruit military-trained technicians deliberately, and veterans' employment services will connect you.
- **Associate degree programs.** Two-year biomedical equipment technology programs place graduates through their own clinical rotations and employer relationships, and the rotation is often the interview.
- **The AAMI career center** and association job boards, where biomed-specific openings are posted and where employers look for people holding biomed credentials.
- **Staffing and contract agencies**, which place technicians on temporary projects such as a fleet upgrade. Short-term work, real experience, and a frequent route to a permanent offer.

## What a first job screens for
Nobody expects an entry technician to know a device family cold. What they screen for is narrower and more honest:

- **Safety habits.** Do you talk about electrical safety testing, lockout tagout, and hand hygiene as things you always do, or as things you have heard of?
- **Documentation.** Can you write what you did so somebody else can read it a year later? A department lives on its records and new technicians are often weakest here.
- **Attitude.** Will you ask before you guess, admit what you have not done, take the unglamorous work, and still be pleasant at a nurse station at the end of a long shift?

Those three are the whole interview behind the questions, and all three are things you can demonstrate from this course.

> Tip: match the door to the key. In-house departments and dialysis hire through postings and trainee programs, manufacturers hire for one product line and travel, an ISO gives broad exposure fast, and the military trains from zero. Search several titles, chase referrals and apprenticeships, and show safety habits, documentation, and attitude rather than claiming experience you do not have.`,
      hook: "Biomed employers: hospital in-house HTM departments, the most common first job with a mixed bench and senior technicians to learn from; independent service organizations contracting across several facilities for broad exposure and more travel; manufacturer field service, deep on one product line with factory training and a territory; the military, which trains its own technicians through the Department of Defense program; clinics and surgery centers with small fleets and more autonomy; dialysis organizations with large similar fleets and heavy regulation; and imaging service, usually entered after general experience. Titles include BMET I, biomedical equipment technician, equipment technician, field service technician, and clinical engineering technician. Hiring comes through public postings screened on keywords, referrals, apprenticeships and trainee programs, veteran hiring programs, associate degree program rotations, the AAMI career center, and staffing agencies. A first job screens for safety habits, documentation, and attitude rather than device expertise."
    },
    {
      id: "u8l2", title: "Your Resume and Your Lab Portfolio", domain: 7, obj: "Career", minutes: 8,
      body: `A hiring manager spends well under a minute on a resume the first time. Your job is to make that minute say: this person knows the safety test, writes things down, and can be trained. Everything else is detail.

## One page, in the employer's words
Keep it to **one page**. An entry-level resume on two pages reads as padding, and the second page is rarely opened.

Then write a **skills section in the words the posting uses**, because the first reader is often a keyword filter and the second is a manager scanning for familiar terms. Use the plain names for what you have actually done:

\`\`\`
Electrical safety testing      ground resistance and leakage, NFPA 99 limits
Test equipment                 digital multimeter, electrical safety analyzer, patient simulator
Preventive maintenance         written PM procedures, consumables, inspection labels
Incoming inspection            paperwork, safety baseline, function test, asset tagging
Documentation                  work orders and equipment records in a CMMS
Devices                        infusion pumps, patient monitors, defibrillators, suction, scales
Healthcare IT                  connectors and cabling, ipconfig and ping, device network basics
Safety and compliance          lockout tagout, safety data sheets, medical gas handling, infection control
\`\`\`

Every line there is something this course taught you and the labs made you do. None of it claims a job you have not held.

Underneath that, list education, this course and the **CABT** under certifications, any work history at all (customer service, the military, a trade, electronics repair, a warehouse) with the transferable parts named, and nothing else. Hand tools, troubleshooting method, following written procedures, careful documentation, and dealing with upset people are all genuinely relevant, so say them plainly instead of hiding them.

## The lab portfolio
This is what you have that other entry candidates do not, and it is the thing to bring.

- **Your lab records from this course.** The safety test readings in each condition with the limits they were judged against, the pump flow check with the collected volume and the computed percent error, the defibrillator energies against the analyzer, the monitor verification against simulator settings, the incoming inspection walkthrough. Written the way a work order is written.
- **Kit photographs.** Your meter on a real measurement, your bench, a resistor measured out of circuit, a battery under load. Proof that you have had your hands on it.
- **The certificate of completion** from this course and, when you have it, the **CABT** itself with its date.
- A short **list of devices** you can describe: what each one does, what it measures or delivers, and which instrument checks it.

Put it in a simple folder, paper or a single document, bring it to the interview, and offer it when the practical questions begin: "I ran that check in my coursework, here are the numbers I recorded." That sentence does more than any adjective.

## Matching the posting, references, and your online presence
**Match the keywords.** Read the posting, list the nouns it uses (preventive maintenance, electrical safety, CMMS, work orders, incoming inspection, customer service), and make sure those exact words appear truthfully somewhere in your resume. Do not claim what you cannot discuss; be ready to talk about every line.

**References**: three people who will say you are reliable and will actually answer the phone. An instructor, a former supervisor, a senior technician who has seen you work. Ask first, tell them which job you applied for, and send them a thank-you either way.

**Online presence**: assume the manager will search your name. A professional profile listing the credential and the course, a photograph you would show a patient's family, and no public posts you would not want read aloud in the interview. A profile that names the credential also means recruiters looking for biomeds can find you.

> Tip: one page, a skills section in the employer's words, and a lab portfolio that shows real recorded numbers from your safety tests, flow checks, energy checks, and monitor verifications. Add the certificate and the CABT, mine any job history for transferable skills, mirror the posting's keywords truthfully, line up three references who will answer, and clean up what a search of your name returns.`,
      hook: "Keep the resume to one page and write a skills section in the employer's own words: electrical safety testing with ground resistance and leakage against NFPA 99 limits, the multimeter, safety analyzer, and patient simulator, preventive maintenance procedures, incoming inspection, documentation in a CMMS, the device families you can describe, and healthcare IT basics. List education, this course, the CABT, and any job history with its transferable parts named. The lab portfolio is the entry candidate's advantage: your recorded lab numbers with the limits they were judged against, kit photographs, the certificate of completion, the credential itself, and a short list of devices you can explain. Mirror the posting's keywords truthfully, keep three references who will answer the phone and know which job you applied for, and make sure a search of your name returns something professional."
    },
    {
      id: "u8l3", title: "Interviews and the Hands-On Test", domain: 7, obj: "Career", minutes: 8,
      body: `A biomed interview has two halves. Somebody asks you questions in a room, and then somebody puts a device or a tool in front of you. Candidates prepare for the first half and are surprised by the second.

## The questions, and the STAR pattern
Expect these, nearly word for word: why biomed, what you know about the work, walk me through an electrical safety test, what would you do if a nurse told you a pump was dosing wrong, tell me about a time you made a mistake, tell me about a time you dealt with a difficult person, how do you prioritize when three floors call at once, where do you want to be in five years.

Behavioral questions, the ones that start "tell me about a time", are answered with **STAR**:

- **Situation**: one sentence of context.
- **Task**: what you were responsible for.
- **Action**: what *you* did, step by step, in the first person.
- **Result**: how it came out, with a number if there is one, and what you took from it.

Keep it under two minutes. Use real examples from any part of your life, because the pattern is what is being graded, not the setting. Prepare four stories in advance: a mistake you owned, a conflict you handled, a time you figured something out, and a time you followed a procedure exactly when it would have been easier not to. Those four cover most of what gets asked.

For the mistake question, never say you cannot think of one. Tell a true small story, say what you did the moment you noticed, say who you told, and say what you changed afterward. The answer they are listening for is: this person reports things.

## The practical
A hands-on station is common, and it is usually one of these:

- **Safety test a device.** Plug it into the analyzer, run the sequence, and read the results against a limits card. Say the order out loud as you go: visual and cord first, then ground resistance, then chassis leakage in every condition, then lead leakage if there are applied parts.
- **Find a fault in a pump** or another simple device. Work the first checks in order, out loud: power, outlet, fuse, cables, swap the accessory, ask what the user saw.
- **Read a schematic.** Trace the power path, identify the fuse, the switch, the transformer, the rectifier, a resistor and a capacitor, and say where you would measure first and what you would expect.
- **Identify tools and instruments** laid out on a bench: Phillips, Torx and security bits, hex keys and the metric versus SAE problem, a torque wrench, a wire stripper, a tachometer, a graduated cylinder, a safety analyzer, a patient simulator. Say what each one is for and the misuse to avoid.

Use the DMM correctly if it is handed to you: volts across a component with power on, amps in series, and ohms or continuity only with the power off.

## What the interviewer is actually watching
Not whether you get the right number. Four things:

1. **Method.** Do you have an order, and do you follow it, or do you poke at things? Narrating your order is the single easiest way to look competent.
2. **Safety.** Do you check the cord before you plug it in, keep one hand clear of a chassis, discharge before you open, ask whether the device has been cleaned, and respect a capacitor? A candidate who grabs a defibrillator's paddles to look underneath has ended the interview.
3. **Asking before guessing.** "The manual would tell me the tolerance, may I look it up?" is a better answer than a confident wrong number. Nobody wants a new technician who invents specifications.
4. **Communication.** Can you explain to a nurse, in plain words and without condescension, what you found and when the device comes back?

## Your questions, and the follow-up
Ask two or three real ones: how is the scheduled maintenance workload distributed, what does training look like in the first six months, which equipment families would I start on, how does the department handle escalation to a vendor, what does success look like at ninety days. Those questions say you are thinking about the work and not only the offer.

Then **follow up**. A short thank-you message within a day, naming one specific thing from the conversation, and a single polite check-in after the timeline they gave you has passed. Small effort, remembered more than you would expect.

> Tip: answer behavioral questions in STAR order, situation, task, action, result, and prepare a mistake, a conflict, a problem you solved, and a time you followed procedure. Expect a practical: a safety test, a fault to find, a schematic to read, or tools to identify. Narrate your method, be visibly safe, look things up rather than inventing numbers, explain in plain words, ask good questions, and follow up within a day.`,
      hook: "Expect standard questions (why biomed, walk me through a safety test, a nurse reports a pump dosing wrong, a mistake you made, a difficult person, how you prioritize) and answer behavioral ones in STAR order: situation, task, action, result, under two minutes, with four stories prepared, including a mistake you owned and reported. The practical station is usually a safety test on the analyzer, a fault to find on a pump using the first checks in order, a schematic to trace, or tools to identify, with the DMM used correctly: volts across with power on, amps in series, ohms and continuity only with power off. The interviewer watches method, visible safety habits, willingness to look things up instead of guessing a specification, and plain communication. Ask about workload distribution, training, starting equipment families, and escalation, then follow up with a specific thank-you within a day."
    },
    {
      id: "u8l4", title: "Your First 90 Days", domain: 7, obj: "Career", minutes: 8,
      body: `The first three months decide whether you become the technician people look for or the one they work around. Almost none of it is about technical skill, which is good news, because habits are easier to control than knowledge.

## Shadow, and write it down
Follow every senior technician who will let you. Watch how they open a case, how they talk to a nurse, where they put the device while they work, what they check first, and what they decide not to do. Carry a notebook and use it: error codes and what the device was doing when they appeared, part numbers, which vendor to call for which product line, where the analyzer and the simulator live, which floors have which equipment, who the manager is on each unit. Nobody will ask to see the notebook, and it will make you faster than anybody expects within a month.

## Learn the CMMS in the first week
Learn to open a work order, add notes and readings, attach parts and time, close it correctly, and find a device's history before you touch it. Then look at the **PM backlog** and the scheduled list you own: due dates, windows, and which devices are near overdue. Ask how completion is measured and what counts as late. A new technician who closes work orders cleanly and keeps their scheduled list current earns trust faster than one who makes a brilliant repair and leaves the record blank.

## Document everything, every time
Including the calls that turned out to be nothing. "No fault found; user shown how to purge the set; device returned to service" is a real record, and three of those from the same floor is a training problem somebody can fix. Write readings with units and the limit they were judged against. Write the exact wording of an error code. Write it the day you did it, not from memory on Friday.

## Ask before you guess
Near a patient, there is no cost to a question and a real cost to a guess. Ask when you do not know a tolerance, when the manual is ambiguous, when a device is under contract, when something looks like it needs a tool or a training you do not have, and when you are not sure whether the thing in front of you is safe. Senior technicians judge new people by the quality of their questions, not the absence of them. The one thing nobody forgives is a guess that was hidden afterward.

## Safety habits until they are boring
Hand hygiene on the way in and the way out. The visual and cord inspection before anything is plugged in. The safety test when the procedure calls for it, in order, every time. Lockout tagout for stored energy. The inspection label and the record at the end. Do them in the same order on every device until they stop being decisions. That is what competence looks like from the outside, and it is also what keeps you out of a story nobody wants to be in.

## Build relationships with nursing and IT
The nurses are your eyes: they see a device fail, they know what was happening when it did, and they decide whether to call you or to push a device into a corner with tape on it. Learn names, answer plainly, never make anyone feel stupid about a device, and tell them when something will be back. **IT** owns the network your devices live on, so introduce yourself before the outage, learn who handles device segments and addresses, and bring them evidence (the ipconfig, the ping, the jack number) rather than "the monitor is broken."

## Own mistakes, out loud and immediately
You will make some. The rule is simple: if a mistake could touch a patient or a device's safety, report it **now**, to your supervisor, in plain words. Say what you did, what the device is, where it is, and what you have already done to make it safe. Hospitals have processes for this, and they protect patients and you. The career-ending version is never the mistake; it is the hidden mistake somebody else finds.

## Training logs, competencies, and the review
Your department keeps a **training log** and a list of **competencies**: the devices and procedures you have been signed off to work on alone. Ask what is on yours, ask how to add to it, and do not work beyond it. Then expect a **probation review** somewhere around ninety days, measuring attendance, scheduled maintenance completion, documentation quality, safety habits, and how the floors talk about you. Ask for the criteria in week one and ask your supervisor halfway through how you are tracking, so the review tells you nothing new.

> Tip: shadow and keep a notebook, learn the CMMS and your scheduled backlog in week one, document everything including the nothing calls, ask before you guess, repeat the safety habits until they are boring, build credit with nursing and IT before you need it, report any mistake immediately, work only inside your signed competencies, and ask for the ninety-day criteria on day one.`,
      hook: "First ninety days: shadow every senior technician and keep a notebook of error codes, part numbers, vendor contacts, and where equipment and instruments live. Learn the CMMS in week one, opening, updating, and closing work orders and reading a device's history, and learn your PM backlog, its due dates and windows, and how completion is measured. Document everything, including calls that turned out to be nothing, with readings, units, limits, and exact error wording, written the same day. Ask before guessing, especially near a patient, and understand that senior technicians judge new people by their questions. Repeat the safety habits (hand hygiene, visual and cord inspection, the safety test in order, lockout tagout, the label and the record) until they are automatic. Build relationships with nursing, who report the faults, and with IT, who own the device network, bringing evidence rather than complaints. Report any mistake immediately. Work only inside your signed competencies and training log, and ask for the probation review criteria on day one."
    },
    {
      id: "u8l5", title: "The Certification Ladder", domain: 7, obj: "Career", minutes: 8,
      body: `The credential you are about to earn is the first rung, not the destination, and it has a clock on it. This lesson is the map of what sits above it and when each piece becomes available to you.

## Where you are: the CABT
The **CABT** proves you know the fundamentals and can be trusted around patients and equipment. It needs no experience and no degree, which is exactly why it works as a door opener: it is evidence for a person whose resume has no biomed history yet. It is valid **5 years and it does not renew**. That is deliberate. Five years is enough time to qualify for the technician credential, so the ladder expects you to climb rather than re-sit the bottom rung.

## The next rung: the CBET
The **CBET** is the working technician's credential and the one most job postings name.

\`\`\`
Full certification, any one of these paths
  an associate degree or higher in electronics, technology, or science, plus 2 years of full-time BMET work
  a United States military biomedical equipment technology program, plus 2 years of full-time BMET work
  4 years of full-time BMET work alone

Candidate status, any one of these alone
  the qualifying associate degree or higher
  the United States military program
  2 years of full-time BMET work
  (candidate status gives 5 years to finish the rest and upgrade to full certification)

The exam
  165 questions in 3 hours
  offered in May and November at test centers
  $410 member, $460 non-member
  recertified every 3 years
\`\`\`

Read those two blocks together and the plan writes itself. If you are hired this year with no degree, two years of work gets you candidate status and four years gets you full certification. If you are in or finishing an associate degree in electronics, technology, or science, the degree alone opens candidate status now and the degree plus two years of work completes it. Military training works the same way as the degree. Either way, **plan the next exam inside the five years your current credential lasts**, because that is the window the ladder was designed around.

Note how different the next exam is from this one: more than half again as many questions, three hours, at a test center rather than remotely, and only two sittings a year. Those dates matter for planning, and so does the recertification cycle: unlike the associate credential, the technician credential renews every three years on continuing education.

## The branches above it
- **CRES**, the radiology equipment specialist credential, is the **imaging** branch: radiography, fluoroscopy, and the high-voltage, high-consequence side of the shop. Also 165 questions in 3 hours, taken after imaging service experience.
- **CHTM** is the **management** credential: budgets, staffing, contracts, regulation, risk, and program strategy, for the person who runs a healthcare technology management program rather than working the bench.

The shape of the ladder is therefore: associate, then technician, then either specialist or manager. Each rung is its own exam with its own eligibility, and nobody skips from the bottom to the top.

## Membership, continuing education, and what to study next
**AAMI** membership gets you a lower fee on every ACI exam ($50 less on the technician-level exam in 2026), and the real value is the publications, the webinars, standards access, and the career listings that keep you current. Local and regional biomed associations run meetings and swap meets that are worth more for contacts than for content.

**Continuing education** is both a requirement above the associate level and the actual mechanism of getting better: manufacturer training on the equipment families your department owns, a soldering or electronics refresher if your hands are new to it, an anatomy and physiology course if the body is the part that still feels foreign, and networking training, because device connectivity is where the work is going. The CompTIA networking certification is a common, well-recognized complement for a biomed who wants to be the person in the department who speaks fluently to IT.

What to study next, in a sensible order: the device families you now inspect, your department's own procedures and limits card, the service manuals for the fleet you own, networking and device integration, and then one specialty to go deep in: imaging, laboratory, dialysis, anesthesia, or sterilizers. Then take the technician exam and keep climbing.

> Tip: the CABT is valid 5 years and does not renew, so plan the CBET inside that window. Full technician status needs a qualifying associate degree or a United States military biomed program plus two years of work, or four years of work alone; candidate status opens at the degree, the program, or two years of work, with five years to upgrade. The exam is 165 questions in three hours, offered in May and November at test centers, $410 member and $460 non-member, recertified every three years. CRES is the imaging branch and CHTM is the management branch.`,
      hook: "The CABT is the first rung: no experience or degree required, valid 5 years, non-renewable, because five years is time enough to qualify for the technician credential. Full CBET certification comes by an associate degree or higher in electronics, technology, or science plus two years of full-time biomed work, a United States military biomedical equipment technology program plus two years, or four years of work alone; candidate status opens at the degree alone, the military program alone, or two years of work alone, with five years to upgrade. That exam is 165 questions in three hours, offered in May and November at test centers, $410 member and $460 non-member, and recertified every three years on continuing education. Above it, CRES is the imaging specialist branch and CHTM is the management branch. AAMI membership gets you a lower fee on every ACI exam, and the real value is the publications, webinars, standards access, and career listings; continuing education means manufacturer training, electronics and anatomy refreshers, and networking study, since device connectivity is where the work is going."
    }
  ]
});
