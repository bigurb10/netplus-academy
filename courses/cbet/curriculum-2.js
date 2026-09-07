// CBET Academy curriculum, units 4 to 6. Original teaching content for the AAMI/ACI CBET exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "Physiological Monitoring", domain: 4,
  blurb: "ECG, blood pressure, oximetry, capnography, temperature, respiration, telemetry, fetal monitoring, EEG, and the test equipment and units behind them.",
  assumes: "You know the cardiovascular and respiratory systems and basic electronics.",
  lessons: [
    {
      id: "u4l1", title: "ECG: Electrodes, Leads, Waveform, and Paper Math", domain: 4, obj: "Function", minutes: 12,
      body: `The electrocardiograph is the device the exam returns to most often. Know how the signal is picked up, how leads are formed, what the waveform means, and how to read the paper.

## Electrodes and skin
Silver/silver chloride electrodes with conductive gel convert ion flow in the skin to electron flow in the wire. Skin must be clean, dry, and lightly abraded; hair shaved; gel fresh. Poor contact raises impedance, which produces noise, baseline wander, and lead-off alarms. Electrodes dry out; open packages have a shelf life.

## Placement and colors
US (AHA) color code: **RA white, LA black, RL green, LL red, V (chest) brown**. Memory aid: white on the right, smoke over fire (black above red on the left), green is ground. RL is the reference (right-leg drive) that reduces common-mode noise. Limb electrodes for monitoring are placed on the torso near the shoulders and hips.

## Leads
A lead is a voltage between two points, not a wire. **Einthoven's triangle** uses RA, LA, and LL:
- Lead I = LA minus RA. Lead II = LL minus RA. Lead III = LL minus LA.
- **Einthoven's law**: II = I + III.
The **augmented** leads aVR, aVL, aVF look from each limb toward the center. The six **precordial** leads V1 to V6 sit across the chest from the right sternal border around to the left axilla. Ten electrodes produce the 12-lead ECG. Lead II is the standard monitoring lead because it aligns with the heart's electrical axis and shows a clear P wave.

## The waveform
**P wave** atrial depolarization; **PR interval** 0.12 to 0.20 s, the AV node delay; **QRS** ventricular depolarization, under 0.12 s; **ST segment** where injury shows; **T wave** ventricular repolarization; **QT interval** under about 0.44 s.

## Paper math
Paper moves at **25 mm/s**; sensitivity is **10 mm per mV**. A small box is 1 mm = 0.04 s; a large box is 5 mm = 0.20 s.
- Heart rate = **1500 / small boxes** between R waves, or **300 / large boxes**.
- Four large boxes between R waves: 300 / 4 = 75 bpm. Twenty small boxes: 1500 / 20 = 75.
- A 1 mV calibration pulse should draw a 10 mm square wave.

## Bandwidth and filters
**Monitoring mode** 0.5 to 40 Hz: stable baseline, artifact rejected, but ST segments distorted. **Diagnostic mode** 0.05 to 150 Hz: accurate ST and pacemaker spikes, more noise. A 60 Hz notch removes mains hum. Pacemaker spikes need the wider bandwidth and a pacer detection circuit.

## Artifacts and their causes
- **60 Hz interference**: poor electrode contact, unshielded or damaged cable, nearby equipment, bad ground.
- **Wandering baseline**: respiration, patient movement, drying electrodes.
- **Muscle tremor**: shivering, tension; a fuzzy baseline.
- **Lead-off**: high electrode impedance or a broken wire; the monitor flags which lead.
- Flat line with the patient talking: a disconnected lead, not asystole.

## Testing
A **patient simulator** supplies a known rate, amplitude, and arrhythmias. Verify rate accuracy, amplitude (1 mV = 10 mm), each lead, alarm limits, arrhythmia detection, and the pacer detection.

> Exam tip: 1500 divided by small boxes, 300 divided by large boxes. Lead II = LL minus RA. Monitoring mode 0.5 to 40 Hz, diagnostic 0.05 to 150 Hz. White right, black left, green ground, red left leg.`,
      hook: "RA white, LA black, RL green, LL red, V brown. Lead I = LA-RA, II = LL-RA, III = LL-LA, II = I + III. 25 mm/s, 10 mm/mV; rate = 1500/small boxes or 300/large. Monitoring 0.5 to 40 Hz, diagnostic 0.05 to 150 Hz."
    },
    {
      id: "u4l2", title: "Blood Pressure: NIBP and Invasive Monitoring", domain: 4, obj: "Function", minutes: 11,
      body: `Two ways to measure the pressure in an artery: squeeze it from outside, or put a transducer inside. Each has its own errors, and the exam tests both.

## Non-invasive: the oscillometric method
An automated cuff inflates above systolic, then deflates in steps. As it passes through the pressure range, the artery pulses against the cuff and produces tiny pressure oscillations that a transducer in the monitor senses.
- The oscillations are largest at **mean arterial pressure**; that is measured directly.
- **Systolic** and **diastolic** are derived from where the oscillation amplitude rises and falls past set fractions of the maximum.
Manual (auscultatory) measurement instead listens for **Korotkoff sounds**: first sound systolic, disappearance diastolic.

## Cuff size and placement
The bladder width should be about **40 percent** of the arm circumference and its length about **80 percent**.
- Too small a cuff reads **high**; too large reads **low**.
- The cuff should be level with the heart; below the heart reads high, above reads low.
- Movement, arrhythmias, and a leaking hose (slow deflation) cause errors and failed readings.
Neonatal, pediatric, adult, and thigh cuffs exist for this reason, and the monitor must be in the matching mode; neonatal mode uses lower inflation limits.

## Testing NIBP
An **NIBP simulator** generates oscillations at set pressures; a pressure meter checks the monitor's transducer against a reference; a **leak test** confirms the cuff, hose, and pneumatic system hold pressure (typically no more than a few mmHg per minute of drop). Verify overpressure cutoff and maximum inflation time.

## Invasive: the arterial line
A catheter in an artery connects through fluid-filled tubing to a **pressure transducer**, which turns pressure into a voltage. The standard transducer sensitivity is **5 microvolts per volt of excitation per mmHg**, so any monitor and transducer that follow the standard interchange.
- **Zeroing**: open the stopcock to air and zero the monitor, so atmospheric pressure reads zero.
- **Leveling**: the transducer sits at the **phlebostatic axis**, the fourth intercostal space at the midaxillary line, level with the heart. Every **13.6 cm** the transducer is too low adds about 10 mmHg; too high subtracts it (1 mmHg = 1.36 cm H2O).
- A pressurized flush bag at about 300 mmHg keeps the line open at a few mL per hour.

## Damping and the fast-flush test
Squeeze the flush valve for a moment and release. A well-damped system shows a sharp square wave followed by one or two quick oscillations and a return to the waveform with a visible **dicrotic notch**.
- **Overdamped**: rounded waveform, no notch, few oscillations; systolic reads low, diastolic high. Causes: air bubbles, clots, kinks, loose connections, soft tubing.
- **Underdamped**: excessive ringing; systolic reads high. Causes: long stiff tubing, high catheter resonance.

## Other invasive pressures
Central venous pressure, pulmonary artery pressure, and intracranial pressure use the same transducer principle with different scales and waveforms.

## Reading the scenario
- "NIBP reads consistently higher than the arterial line": cuff too small or positioned low.
- "Arterial waveform rounded, no notch": overdamped; check for air and kinks.
- "Readings changed after the bed was raised": transducer no longer level; re-level.
- "Cuff inflates but never gives a reading": leak, movement, or wrong patient mode.

> Exam tip: oscillometry measures MAP directly. Cuff width 40 percent of arm circumference; small cuff reads high. Transducer 5 microvolts per volt per mmHg; level at the phlebostatic axis; 13.6 cm equals 10 mmHg. Overdamped reads low and loses the notch.`,
      hook: "Oscillometric: MAP measured, systolic and diastolic derived. Cuff 40 percent width, too small reads high. Arterial line: zero to air, level at the phlebostatic axis, 13.6 cm H2O = 10 mmHg, 5 uV/V/mmHg. Fast-flush test: overdamped rounds and reads low."
    },
    {
      id: "u4l3", title: "Oximetry, Capnography, Respiration, and Temperature", domain: 4, obj: "Function", minutes: 11,
      body: `Four parameters that share a monitor and a set of failure modes.

## Pulse oximetry
The probe shines two LEDs through a fingertip or earlobe: **red at about 660 nm** and **infrared at about 940 nm**. Oxygenated hemoglobin absorbs more infrared; deoxygenated absorbs more red. A photodetector on the other side measures both, and the ratio, taken only from the pulsing (arterial) part of the signal, gives **SpO2**. Normal is 95 to 100 percent. The pulse also gives heart rate and a **plethysmograph** waveform whose quality shows perfusion.
Errors:
- **Carboxyhemoglobin** (carbon monoxide poisoning) reads falsely **high**.
- **Methemoglobin** pushes readings toward **85 percent** regardless of true saturation.
- Motion, low perfusion (cold, shock), nail polish, dark pigment, ambient light, and IV dyes disturb it.
- A dropped or crushed probe cracks the LED or detector; cables fail at the connector.
Test with an **SpO2 simulator** (an optical or electronic tester) at several saturations and pulse rates; verify alarm limits.

## Capnography
Measures CO2 in exhaled gas by **infrared absorption** at about 4.26 micrometers. **End-tidal CO2** (the value at the end of exhalation) is normally **35 to 45 mmHg** and tracks arterial CO2 closely.
- **Mainstream**: the sensor sits in the airway adapter; fast, no sampling tube, adds weight and dead space.
- **Sidestream**: a small pump draws gas through tubing to a sensor in the monitor; works with non-intubated patients; adds delay; needs a water trap and clean tubing.
The **capnogram**: baseline near zero (inspiration), a sharp rise, an alveolar plateau, EtCO2 at the end of the plateau, a sharp fall. A sudden loss of the waveform means disconnection, apnea, or loss of circulation; a rising baseline means rebreathing (exhausted CO2 absorber, insufficient flow). Calibrate to zero and to a reference gas per the manufacturer.

## Respiration
Monitors derive respiratory rate by **impedance pneumography**: a small high-frequency current through two ECG electrodes measures the chest's changing impedance as it expands. Cheap, but fooled by movement and cardiac artifact; it cannot detect an obstructed airway where the chest still moves. Capnography is the reliable monitor of breathing.

## Temperature
- **Thermistor**: a semiconductor whose resistance falls as temperature rises (negative temperature coefficient). Most patient probes. Two common curve standards, **YSI 400** and **YSI 700**, are not interchangeable; a probe of the wrong series reads wrong.
- **Thermocouple**: two dissimilar metals produce a voltage proportional to temperature; rugged, wide range.
- **Infrared** (tympanic, temporal) reads emitted heat without contact; technique-sensitive.
- Probes are tested in a controlled water bath or with a probe simulator (a precision resistor).
Normal is 37 C; hypothermia below about 35 C; fever above about 38 C.

## Reading the scenario
- "SpO2 reads 99 percent in a patient rescued from a house fire who is cyanotic": carboxyhemoglobin; the oximeter is fooled.
- "EtCO2 waveform vanished but the ventilator shows normal volumes": circuit disconnect at the airway or loss of circulation; check the patient first.
- "Temperature reads 3 degrees off with a new probe": wrong YSI series or monitor setting.
- "Respiration rate shows 0 while the patient breathes": impedance electrodes placed poorly or an artifact setting; capnography would show it.

> Exam tip: 660 nm red, 940 nm infrared; CO poisoning reads falsely high; methemoglobin reads about 85. EtCO2 35 to 45, measured by infrared; mainstream in the airway, sidestream sampled. Thermistor resistance falls with temperature; YSI 400 and 700 are different curves.`,
      hook: "Oximetry: 660 and 940 nm, ratio of pulsatile absorbance; CO reads high, methemoglobin about 85. EtCO2 35 to 45 by infrared; mainstream versus sidestream; lost waveform means disconnect or no circulation. Impedance pneumography for rate. Thermistor NTC, YSI 400 versus 700."
    },
    {
      id: "u4l4", title: "Physiological Monitors, Telemetry, and Vital Signs Monitors", domain: 4, obj: "Function", minutes: 10,
      body: `The parameters live in three kinds of product: bedside multiparameter monitors tied to a central station, wearable telemetry transmitters, and simple vital signs monitors that spot-check.

## The bedside monitor
A multiparameter monitor accepts modules or built-in channels for ECG, NIBP, SpO2, invasive pressures, EtCO2, temperature, and respiration. It runs on AC with an internal battery for transport, connects to the network for the central station, and stores trends and alarm events. Configurations are set per unit (adult, pediatric, neonatal) and per profile.

## The central station
A workstation that displays every monitored bed on the unit, receives alarms, stores full-disclosure waveforms, prints strips, and forwards data to the electronic record. It depends on the network; when one bed drops off it is that bed's cable, port, or configuration, and when every bed drops it is the switch, server, or network.

## Alarms
Alarms are ranked by IEC 60601-1-8: **high priority** red and flashing with a fast tone, **medium** yellow flashing, **low** cyan or yellow steady with a soft tone. Limits are set per patient and per unit policy. **Alarm fatigue**, staff tuning out constant alarms, is a recognized patient safety hazard; alarm management programs adjust default limits, delay minor alarms, require electrode changes to reduce false lead-off alarms, and route alarms to phones. A biomed's contribution is accurate signals and correct configuration.

## Telemetry
A small transmitter worn by an ambulatory patient sends ECG (and often SpO2) by radio to antennas in the ceiling and receivers at the central station. In the US, medical telemetry uses the **WMTS** bands: **608 to 614 MHz, 1395 to 1400 MHz, and 1427 to 1432 MHz**, reserved from interference. Some systems use Wi-Fi instead.
Common problems: **dropouts** from poor antenna coverage (dead spots, patients off the unit), **low batteries** (a daily change routine), lead and electrode problems producing false alarms, and interference. Transmitters are cleaned between patients and their battery contacts corrode.

## Vital signs monitors
Portable spot-check monitors take NIBP, SpO2, and temperature on demand, on carts or wall mounts, often with barcode scanning of patient and clinician and wireless transmission to the record. They spend their lives on batteries and being rolled into things; batteries, cuff hoses, probe cables, and casters are the repairs.

## Networked monitoring
Monitors and central stations are IT systems now: IP addresses (usually static), switches, sometimes a dedicated VLAN, servers, and interfaces to the EMR. Configuration errors, duplicate addresses, and network changes break monitoring as surely as a bad cable.

## Reading the scenario
- "One bed shows offline at the central station, others fine": that bed's cable, port, or network settings.
- "All telemetry patients on one wing drop out": antenna or receiver for that coverage area.
- "Frequent false lead-off alarms": electrode quality and skin prep, not the monitor.
- "Alarm sounded but nobody responded": alarm fatigue; review limits and escalation.

> Exam tip: high-priority alarms are red and flashing. WMTS 608 to 614 MHz. One bed offline is local; all beds offline is the system. Telemetry dropouts: coverage, battery, leads.`,
      hook: "Bedside monitor, central station, telemetry, spot-check vital signs. Alarms: high red flashing, medium yellow flashing, low cyan steady; alarm fatigue is a hazard. WMTS 608 to 614, 1395 to 1400, 1427 to 1432 MHz. One bed local, all beds system."
    },
    {
      id: "u4l5", title: "Fetal Monitoring and EEG", domain: 4, obj: "Function", minutes: 8,
      body: `Two specialized monitors on the outline: one for two patients at once, one for microvolts from the brain.

## Fetal monitoring
Labor and delivery monitors track the fetal heart rate and the mother's contractions together, printing both on one strip.
- **Fetal heart rate (FHR)** by **ultrasound Doppler**: a transducer strapped to the abdomen sends ultrasound and detects the frequency shift from the moving fetal heart. Normal is **110 to 160 bpm**. Gel is essential; the transducer must be repositioned as the baby moves. Signal loss, doubling or halving of the rate, and picking up the maternal pulse are the classic artifacts.
- **Uterine contractions** by **tocodynamometer (TOCO, also called a tocograph)**: a pressure-sensing button strapped over the fundus measures the change in abdominal firmness during contractions. It shows timing and duration, not true intrauterine pressure; the baseline is zeroed between contractions and belt tension matters.
- **Direct methods** when needed: a **fetal scalp electrode** gives a beat-to-beat ECG, and an **intrauterine pressure catheter** measures actual contraction pressure in mmHg.
- The monitor also records maternal pulse and often maternal NIBP and SpO2, and has an event marker.
Testing: a fetal simulator provides Doppler-like signals and TOCO pressures; verify FHR accuracy, TOCO calibration, paper speed (commonly 3 cm/min in the US), and printer function. Ultrasound transducers crack when dropped and fail from cable flexing.

## EEG
The electroencephalograph records the brain's electrical activity, tens of microvolts, from scalp electrodes placed by the **10-20 system**, which spaces electrodes at 10 and 20 percent intervals of head measurements so placement is repeatable. Signals are amplified with very high gain and CMRR and displayed as multiple channels (montages).
Frequency bands: **delta** below 4 Hz (deep sleep), **theta** 4 to 8 Hz (drowsy), **alpha** 8 to 13 Hz (relaxed, eyes closed), **beta** above 13 Hz (alert). Uses: seizure diagnosis, sleep studies, monitoring depth of anesthesia (processed EEG indices), and brain death determination.
Because the signals are so small, EEG is the most artifact-sensitive recording in the hospital: electrode impedance is checked before every study (typically under 5 kilohms), and 60 Hz, muscle, eye movement, and cable motion all intrude. Related: **EMG** records muscle activity, **nerve conduction studies** time stimulus response, and **evoked potentials** average the brain's response to repeated stimuli during spine surgery.

## Reading the scenario
- "FHR tracing shows a rate of 75 that matches the mother's pulse": the Doppler is picking up the maternal signal; reposition.
- "TOCO shows no contractions but the mother reports them": belt too loose or the transducer off the fundus.
- "EEG channels full of 60 Hz on one electrode": that electrode's impedance is high; re-prep.

> Exam tip: FHR normal 110 to 160 by ultrasound Doppler; TOCO measures contraction timing by pressure on the abdomen. EEG uses the 10-20 system and microvolt signals; delta, theta, alpha, beta from slow to fast.`,
      hook: "Fetal: Doppler ultrasound for FHR 110 to 160, TOCO for contraction timing, scalp electrode and IUPC are direct. EEG: 10-20 placement, microvolts, impedance under 5 kilohms, delta under 4, theta 4 to 8, alpha 8 to 13, beta above 13."
    },
    {
      id: "u4l6", title: "Test Equipment and Units of Measure", domain: 4, obj: "Function", minutes: 10,
      body: `The outline names the test equipment a biomed uses and the units a biomed converts. Both are pure recall.

## Test equipment, and what each proves
- **Electrical safety analyzer**: ground resistance, chassis and patient lead leakage under normal and fault conditions. Used at incoming inspection, after repair, and at PM on everything with a plug.
- **Patient (physiological) simulator**: generates ECG at set rates and amplitudes plus arrhythmias, respiration, invasive pressure waveforms, and temperature values. Verifies monitors and ECG machines.
- **SpO2 simulator**: electronic or optical, feeds the probe known saturations and pulse rates.
- **NIBP simulator**: produces oscillometric pulses at set pressures; includes leak testing and static pressure checks.
- **Defibrillator analyzer**: a 50-ohm load that measures delivered energy, charge time, synchronization delay, and pacing output.
- **Electrosurgical analyzer**: measures ESU output power into a range of loads, leakage current, and return electrode monitoring function.
- **Gas flow and ventilator analyzer**: volume, flow, pressure, and oxygen concentration; used with a test lung.
- **Infusion pump analyzer**: flow rate accuracy over time and occlusion alarm pressure.
- **Oxygen analyzer**: percent oxygen; calibrated at 21 and 100 percent.
- **Digital voltmeter (DVM or DMM)**: voltage, current, resistance, continuity; the everyday tool. Other meters: pressure meter, tachometer (centrifuge speed), light meter (surgical lights, phototherapy), sound level meter (audiometers, alarms), thermometer references for water baths and incubators.
- **Oscilloscope** for waveforms; **cable tracer** and tester for network cabling.
All test equipment has its own calibration schedule, traceable to national standards, and its calibration sticker is checked before use.

## Units of measure
- **Pressure**: **mmHg** for blood pressure and gas partial pressures; **cm H2O** for airway and ventilator pressures (1 mmHg = 1.36 cm H2O); **psi** for cylinders and pipelines (1 atmosphere = 14.7 psi = 760 mmHg = 101.3 kPa); **bar** roughly one atmosphere (1 bar = 100 kPa = 14.5 psi = 750 mmHg); **kPa** in some monitors (1 kPa = 7.5 mmHg).
- **Temperature**: **F = C x 1.8 + 32**; **C = (F minus 32) / 1.8**. 37 C = 98.6 F; 0 C = 32 F; 100 C = 212 F.
- **Energy**: **joules** for defibrillators; 1 J = 1 watt-second.
- **Light**: **lumens** are total output of a lamp; **lux** is lumens per square meter at the surface (surgical lights are rated in lux at 1 meter); phototherapy is measured in microwatts per square centimeter per nanometer.
- **Sound**: **decibels**; audiometers report hearing thresholds in dB HL.
- **Flow and volume**: mL/hr for infusion, L/min for gas, mL and L for volume; 1 mL = 1 cc.
- **Weight and length**: 1 kg = 2.2 lb; 1 inch = 2.54 cm.
- **Prefixes**: kilo 1,000; milli one thousandth; micro one millionth; nano one billionth.

## Worked conversions
- 40 cm H2O of PEEP pressure is about 29 mmHg (40 / 1.36).
- A cylinder gauge reading 2,000 psi is about 136 atmospheres or 13,800 kPa.
- 39 C is 39 x 1.8 + 32 = 102.2 F.
- A 200 J shock delivered in 10 ms is 20,000 W of instantaneous power.

> Exam tip: the analyzer named in the question tells you the device: 50-ohm load means defibrillator, test lung means ventilator, flow rate accuracy means infusion pump. 1 mmHg = 1.36 cm H2O; 14.7 psi = 760 mmHg; F = 1.8C + 32; lumens is output, lux is at the surface.`,
      hook: "Safety analyzer, patient simulator, SpO2 and NIBP simulators, defibrillator analyzer (50 ohm), ESU analyzer, gas flow analyzer, infusion analyzer, oxygen analyzer, DVM. 1 mmHg = 1.36 cm H2O, 14.7 psi = 760 mmHg = 1 bar-ish, F = 1.8C + 32, joules for defibs, lumens versus lux."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Diagnostic, Infusion, Therapeutic, and Laboratory Equipment", domain: 4,
  blurb: "The office diagnostic devices, the pumps that deliver fluids and drugs, the therapeutic devices on the wards, and the laboratory equipment the outline lists.",
  assumes: "You know the monitoring parameters and units.",
  lessons: [
    {
      id: "u5l1", title: "Diagnostic Equipment", domain: 4, obj: "Function", minutes: 10,
      body: `The outline lists the diagnostic devices of clinics and testing rooms: otoscope, ophthalmoscope, scales, stress test systems, audiometers, ECG machines, spirometers, and ultrasound.

## Otoscope and ophthalmoscope
Handheld illuminated instruments for the ear and the eye, usually on a wall transformer or a rechargeable handle. The otoscope has a magnifying lens and disposable specula; the ophthalmoscope has a lens wheel for focus and apertures for different views. Failures: lamp burnout (halogen or LED), weak rechargeable handle batteries, corroded charging contacts, broken lens wheels, cracked fiber-optic bundles that dim the light. Check output with a light meter if the manufacturer specifies it.

## Scales
Patient weight drives drug doses and fluid balance, so accuracy matters. Floor, chair, wheelchair, bed, and infant scales use **load cells** (strain gauges) or older mechanical balances. Verify with **certified test weights** at several points of the range, zero with the platform or bed empty, and check for level and for anything touching the platform. Bed scales must be re-zeroed when linen or equipment changes.

## Stress test systems
A treadmill or bicycle ergometer with a 12-lead ECG and automated NIBP, running protocols (the common one raises speed and grade every three minutes). The ECG uses diagnostic bandwidth with heavy motion artifact filtering. Safety: an emergency stop, a defibrillator in the room, and calibrated treadmill speed and grade (verified with a tachometer or measured belt speed and an inclinometer). Failures: belt wear and slippage, drive motor and controller, grade motor, ECG cable breakage from constant motion.

## Audiometers
Measure hearing thresholds by presenting pure tones through headphones or bone conductors at frequencies from about 250 to 8,000 Hz and levels in **dB HL**; the patient signals when a tone is heard. Calibration is against a sound level meter with an artificial ear coupler, typically annually, and daily listening checks are done by the user. Testing must be in a quiet room or booth; background noise invalidates results.

## Spirometers
Measure lung volumes and flows as the patient exhales forcibly through a mouthpiece: **FVC**, **FEV1**, their ratio (normal about 0.7 to 0.8), and peak flow. Sensors are pneumotachographs, turbines, or ultrasonic. Calibration uses a **3-liter syringe** pushed at several speeds; the device must read within a few percent. Disposable filters and mouthpieces protect against cross-infection; the sensor is cleaned per the manufacturer. Temperature and barometric pressure corrections apply.

## Electrocardiographs
The diagnostic 12-lead machine: ten electrodes, full diagnostic bandwidth, interpretation software, a printer, and often a network connection to the record. Tested with a simulator for rate, amplitude, lead correctness, and paper speed; cables are the recurring failure.

## Ultrasound
A **piezoelectric** transducer converts electrical pulses into ultrasound and returning echoes back into electrical signals. Frequencies of about 2 to 15 MHz; **higher frequency gives better resolution but less penetration**, so deep abdominal imaging uses low frequency and vascular or superficial imaging uses high. **Doppler** measures blood flow from the frequency shift of moving cells. Gel excludes air, which reflects ultrasound. Transducer crystals crack when dropped, cables fail at the strain relief, and lens surfaces wear; a **phantom** checks image quality and depth accuracy. Ultrasound is the one imaging modality the outline names as diagnostic equipment.

> Exam tip: scales are verified with certified test weights. Spirometers are calibrated with a 3 L syringe. Audiometers are calibrated with a sound level meter in a quiet room. Higher ultrasound frequency means better resolution and less depth. Stress test rooms need an emergency stop and a defibrillator.`,
      hook: "Otoscope and ophthalmoscope: lamps, batteries, contacts. Scales: certified weights, zero empty. Stress test: emergency stop, defibrillator, calibrated speed and grade. Audiometer: dB HL, sound level meter, quiet booth. Spirometer: 3 L syringe, FEV1/FVC. Ultrasound: piezoelectric, high frequency resolves, low frequency penetrates."
    },
    {
      id: "u5l2", title: "Infusion Equipment", domain: 4, obj: "Function", minutes: 11,
      body: `Infusion pumps are the most numerous devices in a hospital and the source of the most incident reports. The outline names five kinds.

## Large-volume pumps
Deliver IV fluids and drugs from bags at rates from fractions of a mL per hour to a liter per hour through a disposable administration set. Most use a **peristaltic** mechanism (fingers or a rotor squeezing the tubing); some use a cassette. Accuracy is typically within **5 percent** and is verified with an **infusion pump analyzer** that measures delivered volume over time.
Safety features the exam expects:
- **Free-flow protection**: when the set is removed from the pump, a clamp in the set or the pump's door mechanism prevents gravity from draining the bag into the patient.
- **Occlusion alarms**: **downstream** (a kink, closed clamp, or clotted catheter raises pressure; alarm at a set pressure threshold) and **upstream** (an empty or clamped bag starves the pump).
- **Air-in-line detection**: an ultrasonic sensor on the tubing detects bubbles above a set size.
- **Drug library** (dose error reduction software): the pump knows each drug's concentration and safe dose range and warns or blocks entries outside it. Keeping the library current is a joint pharmacy and biomed task.
- **Keep-vein-open** rate when an infusion completes; **secondary (piggyback)** infusions; battery for transport.

## Syringe pumps
Drive a syringe plunger with a lead screw for precise low-volume delivery: neonatal drugs, anesthesia, critical drips. The pump must correctly identify the syringe size, and the syringe must be clamped securely. Two known hazards: **start-up delay** at low rates while mechanical slack takes up, and **siphoning** if the syringe is mounted well above the patient and the plunger is not held.

## Patient-controlled analgesia
A syringe or cassette pump that delivers a set bolus of pain medication when the patient presses a button, limited by a **lockout interval** and an hourly or four-hour maximum, with optional background infusion. Locked to prevent tampering, with a history log. Programming errors (wrong concentration) are the classic PCA incident; drug libraries and independent double checks are the defenses.

## Enteral feeding pumps
Deliver formula to the gut through feeding tubes. Lower accuracy is acceptable, and the sets use **enteral-only connectors** that cannot mate with IV connectors, by design. Alarms for occlusion and empty bag; a dose limit; easy cleaning because formula spills.

## Contrast injectors
Power injectors for CT, MRI, and angiography push contrast at programmed volumes and flow rates, sometimes at high pressure. Features: a pressure limit, an air detection or purge routine, heated syringes to lower viscosity, and interlocks with the imaging system. Air injection is the critical hazard.

## Testing and math
Verify flow accuracy at low and high rates, occlusion alarm pressure and time to alarm, air-in-line detection with a known bubble, free-flow protection with the set removed, battery runtime, and the drug library version.
- Rate: mL/hr = total volume / hours. One liter over 8 hours is 125 mL/hr.
- Drops: drops per minute = (mL/hr x drop factor) / 60. At 125 mL/hr with a 15 drop/mL set: 125 x 15 / 60 = 31 drops per minute.
- Dose: mL/hr = (dose in mg/kg/hr x weight in kg) / concentration in mg/mL. A 70 kg patient at 0.1 mg/kg/hr from a 1 mg/mL bag: 7 mg/hr, so 7 mL/hr.

> Exam tip: free-flow protection, occlusion (upstream and downstream), air-in-line, and the drug library are the four safety features. Enteral connectors do not fit IV lines on purpose. Accuracy within about 5 percent, checked with an infusion analyzer. PCA has a lockout interval.`,
      hook: "LVP peristaltic, within 5 percent, free-flow protection, occlusion up and downstream, air-in-line, drug library. Syringe pumps: size detection, start-up delay, siphoning. PCA: bolus, lockout, limit. Enteral connectors incompatible by design. Injectors: pressure limit, air detection. mL/hr = volume/hours; dose math."
    },
    {
      id: "u5l3", title: "Therapeutic Equipment", domain: 4, obj: "Function", minutes: 10,
      body: `The outline groups these as therapeutic: neonatal and pediatric equipment, patient temperature management, aspiration, sequential compression devices, and physical therapy equipment.

## Neonatal and pediatric equipment
- **Infant incubator**: a heated, humidified enclosure. **Air mode** holds the air at a set temperature; **skin (servo) mode** adjusts heat to hold the baby's skin probe at a set temperature. Alarms for over-temperature (typically around 38 to 39 C air), probe failure, fan failure, and power. Oxygen can be added and monitored. Cleaning between patients is critical; humidity reservoirs grow organisms.
- **Radiant warmer**: an open bed with an overhead heater under skin-probe servo control, for procedures and resuscitation. Over-temperature and probe-off alarms; the heater must never run uncontrolled.
- **Phototherapy**: blue light around **425 to 475 nm** treats jaundice; output is measured with a radiometer in microwatts per square centimeter per nanometer, lamps are replaced by hours of use, and eye protection is required.
- Pediatric versions of everything else use smaller cuffs, probes, and dose limits; neonatal modes on monitors and pumps use different alarm defaults.

## Patient temperature management
- **Hypo- and hyperthermia units**: circulate temperature-controlled water through blankets or pads to warm or cool a patient, in servo mode from a patient temperature probe. Water temperature is bounded (about 4 C to 42 C) so tissue is never burned or frozen; check flow, leaks, hose couplings, filters, the water reservoir, and the temperature sensors. Used for surgery, fever control, and targeted cooling after cardiac arrest.
- **Forced-air warmers** blow warm air through disposable blankets; the hose must never be used without the blanket (burns).
- **Fluid warmers** (covered with perioperative equipment) warm IV fluids and blood.

## Aspiration (suction)
Vacuum removes secretions, blood, and gastric contents. Wall vacuum through a **regulator** (continuous or intermittent, set in mmHg; adult airway suction around 80 to 120 mmHg, lower for children and infants), a collection canister with an overflow shutoff float, a filter, and tubing. Portable suction units add a pump and battery. Failures: clogged filter, canister lid seal, tubing leaks, worn pump diaphragm, dead battery. Verify vacuum with a gauge and check the overflow protection.

## Sequential compression devices
Prevent blood clots in the legs by inflating sleeves in sequence from ankle to thigh, then deflating. Check inflation pressures (typically 35 to 55 mmHg), cycle timing, hose connections, and sleeve integrity; alarms for high or low pressure and disconnected sleeves.

## Physical therapy equipment
- **TENS** units deliver low-level current for pain; **neuromuscular stimulators** contract muscle. Verify output amplitude, frequency, and timers, and inspect leads and electrodes.
- **Therapeutic ultrasound** (1 to 3 MHz) heats tissue; verify output power with a wattmeter and check the transducer face.
- **Diathermy** heats with radio frequency or microwaves; **traction** applies measured force; **continuous passive motion** machines move a joint through a set range; whirlpools and hot packs involve water temperature and electrical safety.

> Exam tip: incubator servo mode controls to skin temperature; radiant warmers must alarm on probe failure. Phototherapy is blue light around 450 nm measured with a radiometer. Temperature management water is limited to about 4 to 42 C. Adult suction around 80 to 120 mmHg with an overflow shutoff. SCDs inflate in sequence.`,
      hook: "Incubator air or skin servo mode, over-temp alarm; radiant warmer probe-off alarm; phototherapy 425 to 475 nm. Hypo/hyperthermia water 4 to 42 C. Suction 80 to 120 mmHg adult, overflow float, filter. SCD sequential inflation 35 to 55 mmHg. PT: TENS, stimulators, therapeutic ultrasound."
    },
    {
      id: "u5l4", title: "Laboratory Equipment", domain: 4, obj: "Function", minutes: 9,
      body: `The outline names eleven kinds of laboratory equipment. Most are simple machines whose failures are mechanical or thermal, and whose safety is about balance, temperature, and sharp blades.

## Centrifuges
Spin samples to separate components by density: blood cells from plasma. Speed in **RPM**; the force that matters is **RCF** (relative centrifugal force, in g), which depends on speed and rotor radius. Rules: **balance** opposing tubes by weight, never run with an open lid (interlock), verify speed with a **tachometer** (often a strobe or optical), check the timer, listen for bearing noise, inspect rotors for corrosion and cracks, and observe biohazard practice for broken tubes. Vibration means imbalance or a failing bearing.

## Incubators
Hold cultures at a set temperature, commonly 37 C, sometimes with CO2 and humidity control. Verify temperature with a reference thermometer at several points, check door gaskets and the CO2 sensor calibration, and confirm alarms.

## Rockers and shakers
Gently agitate samples and blood bags. Check speed, tilt, motor, belts, and the platform.

## Refrigerators and freezers
Blood banks and pharmacies store blood, vaccines, and reagents at **2 to 8 C**; freezers run at about minus 20 C or minus 80 C (ultra-low). Requirements: continuous temperature logging, high and low alarms with remote notification, backup power, door gaskets, defrost cycles that do not breach limits, and no overloading that blocks airflow. A temperature excursion can destroy a blood inventory; alarm testing is a PM item.

## Microscopes
Light source (halogen or LED), condenser, objectives, eyepieces, stage. Service: clean optics correctly, replace lamps, align illumination, check mechanical stage and focus.

## Water baths
Heat samples at a stable temperature. Check the thermostat and heater, uniformity, level and water quality, and over-temperature protection.

## Analyzers
Chemistry, hematology, blood gas, and immunoassay analyzers are fluidic robots: pumps, valves, tubing, probes, optical or electrochemical sensors, and temperature control. They run calibrators and **quality control** samples; reagents expire; probes clog; tubing wears. Most are serviced by the vendor, but biomeds handle electrical safety, UPS power, network interfaces, and first-line troubleshooting.

## Cryostats and microtomes
A **microtome** cuts tissue into sections a few micrometers thick for slides; a **cryostat** is a microtome inside a freezer chamber (about minus 20 C) for frozen sections during surgery. Hazards: the blade is razor sharp and the tissue may be infectious; check temperature, the advance mechanism, blade holder, and defrost.

## Common threads
Temperature verification against a traceable reference, speed verification with a tachometer, electrical safety, and infection control on anything that held specimens. Laboratory accreditation programs require documented calibration and maintenance, so the CMMS records matter here too.

> Exam tip: balance the centrifuge, verify speed with a tachometer, never bypass the lid interlock. Blood and vaccines at 2 to 8 C with continuous logging and alarms. A cryostat is a refrigerated microtome for frozen sections.`,
      hook: "Centrifuge: RPM and RCF, balance loads, lid interlock, tachometer. Incubator 37 C, CO2. Refrigerators 2 to 8 C, freezers minus 20 or minus 80, logged and alarmed. Analyzers: fluidics, calibrators, QC. Cryostat is a cold microtome; blades and biohazard."
    }
  ]
});

FRA.units.push({
  id: "u6", n: 6, title: "Perioperative and Life-Support Equipment", domain: 4,
  blurb: "The operating room's devices and the machines that keep patients alive: ESU, video, tourniquets, sterilizers, warmers, tables, lights, microscopes, defibrillators, pacemakers, balloon pumps, ventilators, and anesthesia machines.",
  assumes: "You know electrical safety and the monitoring parameters.",
  lessons: [
    {
      id: "u6l1", title: "Electrosurgery and Surgical Video Integration", domain: 4, obj: "Function", minutes: 10,
      body: `The electrosurgical unit is the most electrically hazardous device in routine use, and the video system is what the whole operating room looks at. Both are on the outline by name.

## How electrosurgery works
An ESU passes high-frequency current through tissue, and the heat at the small active electrode cuts or coagulates. The frequency, about **300 kHz to 3 MHz**, is above the range that stimulates nerves and muscle, so hundreds of milliamps flow without contraction.
- **Cut**: a continuous sine wave; cells vaporize; a clean incision with little hemostasis.
- **Coagulation**: interrupted or damped bursts with a higher peak voltage; tissue dries and seals; stops bleeding.
- **Blend**: a mix that cuts while sealing.
- Power is set in watts; typical settings tens of watts, with higher voltage in coag modes.

## Monopolar versus bipolar
- **Monopolar**: current leaves the active electrode (pencil), passes through the patient, and returns through a large **dispersive (return) electrode** pad. Because the pad is large, current density there is low and no heating occurs, as long as the whole pad is in good contact.
- **Bipolar**: current passes only between the two tips of a forceps; no return pad; used for delicate work and near pacemakers.

## Burns and how they are prevented
The return pad is the danger point. If part of it lifts, the same current concentrates on a smaller area and burns the skin. Modern ESUs use **return electrode monitoring** (contact quality monitoring): a split pad whose two halves are compared; if impedance between them changes beyond limits, the generator alarms and disables output. Other burn causes: the pad on bony, hairy, or scarred sites; fluid pooling; **alternate return paths** through ECG electrodes or metal touching the patient; **capacitive coupling** through laparoscopic instruments; an active pencil left on the drapes; and fire in oxygen-enriched environments. Pacemakers and implanted devices can be disrupted; bipolar or short bursts are preferred.

## Testing an ESU
An **electrosurgical analyzer** measures output power into a range of load resistances (tissue is roughly 100 to 500 ohms), high-frequency leakage current, and the return electrode monitoring function (it should alarm when the split pad is unbalanced and when disconnected). Also check foot switches, the pencil, cords and connectors, the audible activation tone, and electrical safety.

## Surgical video integration
Modern ORs route video from endoscopic cameras, room cameras, and imaging to wall monitors, boom monitors, recorders, and conference systems through an integration controller.
- Components: **camera head and control unit**, **light source** (xenon or LED) and **light cable** (fiber bundles that break and dim), **insufflator** (CO2 for laparoscopy, with pressure and flow limits), monitors, recorder, routing switcher, touch-panel control.
- Common problems: broken light cable fibers (dim image), fogged or scratched scope lenses, camera cable failures, white balance not set, wrong video format or cable between components, routing misconfiguration, insufflator pressure alarms.
- Testing: image quality on a test target, white balance, light output, insufflator pressure and flow with a gauge, video path from each source to each display, and electrical safety on everything in the patient area.

## Reading the scenario
- "Patient burned under the return pad": poor contact; check pad placement and REM function.
- "ESU alarms and will not activate": split pad unbalanced or disconnected; the safety feature is working.
- "Laparoscopic image is dim": light cable fibers broken or lamp aged.
- "Video shows on the boom but not the wall monitor": routing configuration or cable to that display.

> Exam tip: 300 kHz to 3 MHz is above nerve stimulation. Cut is continuous, coag is interrupted. Monopolar needs a return pad; bipolar does not. Return electrode monitoring prevents pad burns. Test with an ESU analyzer into a load.`,
      hook: "ESU 300 kHz to 3 MHz, no stimulation. Cut continuous, coag interrupted, blend mixed. Monopolar with a return pad and contact quality monitoring; bipolar between tips. Burns: pad contact, alternate paths, capacitive coupling. Video: camera, light source and cable, insufflator, routing."
    },
    {
      id: "u6l2", title: "Tourniquets, Sterilizers, Fluid Warmers, Tables, Lights, and Surgical Microscopes", domain: 4, obj: "Function", minutes: 10,
      body: `The rest of the perioperative list. Each is a simple idea with a specific safety limit.

## Pneumatic tourniquets
A cuff on a limb inflates above arterial pressure to create a bloodless field. The controller sets and displays pressure, alarms on leaks and deviations, and tracks **inflation time**, alarming at set intervals because prolonged inflation injures nerves and tissue (about two hours is a common limit). Typical pressures run above systolic; settings are chosen by the surgeon based on limb and patient. Checks: **gauge calibration** against a reference, leak test of cuff and tubing, alarm function, timer, cuff and connector condition, and the source gas or compressor. A wrong pressure reading is a direct patient injury.

## Sterilizers
- **Steam (autoclave)**: saturated steam under pressure; 121 C at about 15 psi for 15 to 30 minutes, or 132 to 135 C for short flash cycles; pre-vacuum cycles remove air first. Checks: temperature and pressure against references, timer, door gasket and interlock, chamber drain and filter, steam quality, and the printout. **Biological indicators** (spore tests) verify lethality; chemical indicators confirm exposure.
- **Ethylene oxide**: gas sterilization for heat-sensitive items, with long aeration to remove toxic residue.
- **Hydrogen peroxide plasma**: low-temperature, fast, for delicate instruments.
- **Washer-disinfectors** and ultrasonic cleaners prepare instruments; **sterilization equipment** in the outline includes all of these.

## Fluid and blood warmers
Warm IV fluids and blood to near body temperature during rapid infusion and surgery. Designs: dry heat plates with a disposable cassette, water baths, and in-line coil warmers. The critical safety point is the **over-temperature cutoff**: blood must not be heated above about 42 C or cells are damaged. Checks: temperature accuracy at the outlet, the independent over-temperature alarm and cutoff, flow path leaks, and electrical safety.

## Operating tables
Hydraulic or electric tables raise, tilt, and articulate. Checks: all motions and their controls, hand pendant and battery, brakes and floor locks, hydraulic leaks, weight rating labels, pads and rails, and electrical safety. A table that drifts down under load or whose brakes fail is a fall hazard.

## Surgical lights
Provide shadow-free, color-correct illumination measured in **lux at one meter** and with a color temperature near daylight. Halogen lamps need replacement and cooling; LED heads run cooler. Checks: light output with a meter, focus and pattern, arm balance and drift (a drifting light sags onto the field), sterile handle attachment, and electrical safety.

## Surgical microscopes
Precision optics on a balanced stand with motorized focus and zoom, illumination through fiber or LED, and often video output. Checks: optical cleanliness and alignment, illumination intensity, focus and zoom motors, stand balance and brakes (a microscope that drops is a serious injury), foot pedal, and electrical safety.

## Reading the scenario
- "Tourniquet displays 250 mmHg but the reference gauge reads 210": calibration; the cuff was under-inflated and the field may bleed, or over-inflated and nerves injured; recalibrate before use.
- "Blood warmer outlet reads 44 C": over-temperature cutoff failed; remove from service.
- "Surgical light slowly droops during cases": arm balance or brake adjustment.
- "Autoclave prints 121 C but the biological indicator grew": steam quality, air removal, or a load problem; investigate before releasing loads.

> Exam tip: tourniquet gauge accuracy and time alarms; blood never above about 42 C; autoclave 121 C at 15 psi with biological indicators; surgical lights measured in lux at one meter; tables and microscopes are drop and drift hazards.`,
      hook: "Tourniquet: calibrated gauge, leak test, time alarm near 2 hours. Steam sterilizer 121 C, 15 psi, biological indicators; ETO and peroxide plasma for heat-sensitive. Fluid warmer cutoff about 42 C. Tables: motions, brakes, hydraulics. Lights: lux at 1 m, drift. Microscopes: balance and brakes."
    },
    {
      id: "u6l3", title: "Defibrillators, External Pacemakers, and Balloon Pumps", domain: 4, obj: "Function", minutes: 11,
      body: `Three devices that act directly on the heart, tested more often than anything else because failure is immediate.

## Defibrillators
A defibrillator charges a capacitor to a high voltage and discharges it through the chest to stop ventricular fibrillation so the heart can restart in rhythm.
- **Energy** in joules: stored energy is one half x C x V squared; delivered energy is lower and depends on the patient's impedance (about 50 ohms is the test load).
- **Monophasic** waveforms (older) deliver up to **360 J**. **Biphasic** waveforms reverse polarity mid-pulse and need less, typically **120 to 200 J** for adults, device specific. Pediatric doses are **2 J/kg** first, then **4 J/kg**.
- **Synchronized cardioversion** for organized rhythms (atrial fibrillation, some tachycardias) times the shock to the R wave, avoiding the vulnerable period that could cause fibrillation. **Unsynchronized** defibrillation for VF and pulseless VT.
- **AEDs** analyze the rhythm and advise a shock only for shockable rhythms; public devices with self-tests.
- Paddles and pads: adhesive pads are safer and enable hands-free pacing; paddles need gel and firm pressure.
- **Daily user check**: a shock into the tester or a self-test, pads in date, battery charged, paper loaded.
Testing with a **defibrillator analyzer**: delivered energy at several settings into 50 ohms (within about 15 percent of set), **charge time** to maximum energy (typically under 10 seconds), synchronization delay from the R wave, ECG accuracy, pacer output, battery runtime, and electrical safety. Capacitor aging, relay contacts, and batteries are the common failures.

## External (transcutaneous) pacemakers
Built into most defibrillators. Large pads deliver pacing pulses through the chest at a set **rate** and **current** (milliamps) until **capture** is seen: a QRS after each pacer spike. **Demand mode** paces only when the patient's own rate falls below the set rate; **fixed** (asynchronous) mode paces regardless. Verify output current, rate, and mode with the analyzer.

## Intra-aortic balloon pumps
A catheter with a long balloon sits in the descending aorta. Timed to the ECG or the arterial waveform, the pump inflates the balloon with **helium** (low density, fast movement, absorbed safely if it leaks) during **diastole**, pushing blood back toward the coronary arteries and raising coronary perfusion, and deflates just before **systole**, lowering the pressure the heart must pump against (afterload). The result is more oxygen to the heart muscle and less work for it, supporting a failing heart after infarction or surgery.
- Timing errors (early or late inflation or deflation) reduce benefit or harm the patient; the console shows the augmented waveform.
- Alarms: **gas leak** (balloon rupture, with blood in the tubing), **gas loss**, timing and trigger loss, high or low augmentation, catheter kink.
- Checks: helium supply, pneumatic system leaks, trigger sources (ECG and pressure), alarm function, battery, and electrical safety.

## Reading the scenario
- "Delivered energy tests 150 J at a 200 J setting": below tolerance; capacitor or relay; remove from service.
- "Pacing spikes appear but no QRS follows": no capture; raise current, check pad contact; if output verifies correct, the issue is clinical.
- "Balloon pump alarms gas leak with blood visible in the catheter tubing": balloon rupture; the pump stops; clinical emergency.
- "Charge time has grown to 20 seconds": battery or capacitor aging.

> Exam tip: biphasic 120 to 200 J, monophasic 360, pediatric 2 then 4 J/kg. Synchronized for organized rhythms. Test into 50 ohms with an analyzer. Demand pacing only when the rate falls below the set rate. Balloon inflates in diastole with helium, deflates before systole.`,
      hook: "Defibrillator: stored energy half CV squared, delivered into 50 ohms; biphasic 120 to 200 J, mono 360, peds 2 then 4 J/kg; sync to the R wave for organized rhythms; analyzer checks energy, charge time, sync. Pacer: demand versus fixed, capture. IABP: helium, inflate in diastole, deflate before systole."
    },
    {
      id: "u6l4", title: "Ventilators and Anesthesia Machines", domain: 4, obj: "Function", minutes: 12,
      body: `Two machines that breathe for the patient, one on the ward and one in the OR. The outline expects normal function, settings, and alarms.

## Mechanical ventilators
A ventilator delivers gas under positive pressure through a circuit and endotracheal tube, then lets the patient exhale passively.
Settings and normal values:
- **Tidal volume** 6 to 8 mL/kg of ideal body weight (about 500 mL for an adult).
- **Rate** 12 to 20; **minute volume** = tidal volume x rate.
- **FiO2** 0.21 to 1.0, verified by an oxygen analyzer calibrated at 21 and 100 percent.
- **PEEP** (positive end-expiratory pressure), commonly about 5 cm H2O, keeps alveoli open.
- **I:E ratio**, commonly 1:2; inspiratory flow and pressure limits.
Modes:
- **Volume control** delivers a set volume each breath; pressure varies with lung stiffness.
- **Pressure control** delivers a set pressure; volume varies.
- **Assist-control** gives a full breath for every patient effort and a minimum rate. **SIMV** gives set breaths and lets the patient breathe spontaneously between. **Pressure support** boosts spontaneous breaths. **CPAP** holds continuous pressure without mandatory breaths.
Alarms and what they mean:
- **High pressure**: obstruction, kinked tube, secretions, coughing, water in the circuit, patient fighting the ventilator.
- **Low pressure** or **low minute volume**: disconnection, leak, cuff leak, circuit crack.
- **Apnea**: no breath detected within the set time.
- **Low FiO2**, high or low rate, power and gas supply alarms.
Components: turbine or compressor or pipeline gas, blender, flow and pressure sensors, exhalation valve, humidifier (heated, with a temperature probe), filters, and a battery. Testing uses a **gas flow analyzer** and a **test lung**: volume, pressure, flow, FiO2, PEEP, and every alarm. Circuits are single use or reprocessed per policy.

## Respiratory therapy equipment
**Oxygen concentrators** separate oxygen from air with a molecular sieve, delivering about 90 to 95 percent. **CPAP** and **BiPAP** treat sleep apnea and support breathing non-invasively; BiPAP has separate inspiratory and expiratory pressures. **Humidifiers** and **nebulizers** condition gas and deliver drugs. **Bag-valve masks** and **flowmeters** are inspected for function.

## Anesthesia machines
An anesthesia machine delivers a controlled mix of oxygen, air, nitrous oxide, and an inhaled anesthetic agent, and can ventilate the patient.
- **Gas supply**: pipeline (about 50 psi) with cylinder backup; pin index and DISS fittings; gas-specific color coding; pressure gauges and low-pressure alarms.
- **Flowmeters** set each gas; the **hypoxic guard** links oxygen and nitrous oxide so the mix never falls below about 21 to 25 percent oxygen. The **oxygen flush** delivers a high flow of pure oxygen.
- **Vaporizers** add a precise concentration of liquid agent; each is agent-specific and keyed: **sevoflurane yellow, isoflurane purple, desflurane blue**; interlocks prevent two vaporizers from running at once.
- The **breathing circuit** with a **CO2 absorber** (soda lime, which changes color when exhausted) lets gas be rebreathed; one-way valves; the **adjustable pressure-limiting valve**.
- **Scavenging** collects waste anesthetic gas and vents it, protecting staff.
- Monitoring: inspired oxygen, agent concentration, EtCO2, airway pressure, volumes, and all the usual patient parameters.
- **Checks before use** (a formal checklist): high-pressure system, low-pressure leak test, vaporizer leaks, breathing circuit leak test, ventilator function, scavenging, and alarms.

## Reading the scenario
- "High-pressure alarm on a ventilator": kink, secretions, cough, water; check the patient and circuit first.
- "Low-pressure alarm": disconnect or leak; reconnect immediately.
- "Concentrator delivers 80 percent oxygen": sieve beds exhausted.
- "Anesthesia machine will not deliver nitrous without oxygen flow": the hypoxic guard is working as designed.
- "CO2 absorber has changed color": exhausted; replace it.

> Exam tip: tidal volume 6 to 8 mL/kg, minute volume is tidal volume times rate, PEEP about 5, FiO2 checked at 21 and 100. High-pressure alarm is obstruction; low-pressure is disconnect. Vaporizer colors: sevoflurane yellow, isoflurane purple, desflurane blue. Hypoxic guard keeps oxygen above about 21 to 25 percent.`,
      hook: "Ventilator: VT 6 to 8 mL/kg, rate 12 to 20, PEEP 5, FiO2 checked at 21 and 100; volume versus pressure control; high pressure obstruction, low pressure disconnect, apnea. Anesthesia: pipeline 50 psi, hypoxic guard, keyed vaporizers (sevo yellow, iso purple, des blue), CO2 absorber, scavenging, pre-use checklist."
    }
  ]
});
