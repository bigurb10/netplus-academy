// CBET Academy deeper explanations, units 4 to 6. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u4l1: `## A microphone for the heart
An ECG machine is an amplifier with electrodes for a microphone. The heart's electrical activity, about a millivolt at the skin, is picked up, amplified a thousand times, filtered, and drawn on paper or a screen. Everything about the device follows from how weak that signal is and how much noise surrounds it.

## Electrodes: where most problems start
A silver/silver chloride disc with conductive gel converts the ion currents in tissue into electron current in the wire. The interface has impedance, and the smaller it is, the cleaner the signal.
\`\`\`
skin prep     clean, dry, lightly abrade, clip hair       lowers impedance
fresh gel     dried electrodes from an open pack fail      high impedance, lead-off alarms
placement     over bone or flat muscle, not thick muscle   less muscle artifact
\`\`\`
When an ECG is noisy, the electrodes are the first suspect, the cable second, the monitor last.

## Colors and positions
\`\`\`
US (AHA) code:   RA white    LA black    RL green    LL red    V (chest) brown
memory aid:      white on the RIGHT; "smoke over fire" on the left (black above red); green is ground
\`\`\`
RL is not part of any lead. It is the **right-leg drive**: the amplifier senses the common-mode noise on the patient and feeds an inverted copy back through RL, cancelling much of the 60 Hz pickup.

## Leads are differences, not wires
\`\`\`
              LA (black)
              /   \\
   Lead I    /     \\   Lead III
   LA - RA  /       \\  LL - LA
           /         \\
   RA (white) ------- LL (red)
              Lead II
              LL - RA

   Einthoven's law:  Lead II = Lead I + Lead III
\`\`\`
Three augmented leads (aVR, aVL, aVF) look from each corner toward the middle. Six chest leads V1 to V6 run from the right sternal border, across the sternum, under the left nipple to the armpit. Ten electrodes, twelve views. Monitoring uses lead II because the heart's average electrical direction points from RA toward LL, so lead II shows the tallest, cleanest waveform.

## The waveform, with numbers
\`\`\`
                      R
                      |
                      |
        P            /|\\           T
       / \\          / | \\         /  \\
  ____/   \\____ ___/  |  \\_______/    \\____
                Q     |   S
        |-PR-|  |-QRS-|        |----QT----|

  PR interval  0.12 to 0.20 s     AV node delay; longer = heart block
  QRS          under 0.12 s        wide = ventricular origin or bundle branch block
  QT           under about 0.44 s  long QT risks dangerous arrhythmia
\`\`\`

## Paper math, worked
Paper runs at 25 mm per second. One small (1 mm) box is 0.04 s; one large (5 mm) box is 0.20 s. Amplitude: 10 mm per millivolt, so the calibration pulse is a 10 mm square.
\`\`\`
Rate = 1500 / (small boxes between R waves)   or   300 / (large boxes between R waves)

R waves 5 large boxes apart:    300 / 5  = 60 bpm
R waves 3 large boxes apart:    300 / 3  = 100 bpm
R waves 18 small boxes apart:   1500 / 18 = 83 bpm
Irregular rhythm: count R waves in 6 seconds (30 large boxes) and multiply by 10
\`\`\`

## Bandwidth: two modes, two purposes
\`\`\`
Monitoring   0.5 to 40 Hz     baseline stays flat, muscle noise suppressed; ST segments distorted;
                              pacemaker spikes may be lost without a pacer detector
Diagnostic   0.05 to 150 Hz   faithful ST segments and sharp spikes; more baseline wander and noise
\`\`\`
The 0.05 Hz high-pass in diagnostic mode is low enough to preserve the slow ST segment; the 0.5 Hz of monitoring mode is not. A notch filter at 60 Hz sits in both.

## Artifacts, and what each one says
\`\`\`
thick fuzzy 60 Hz on every lead          poor electrode contact, unshielded or damaged cable, ground problem, nearby device
slow rolling baseline                    breathing, patient movement, drying electrodes
fine irregular fuzz                      muscle tremor, shivering
one lead flat, others fine               that electrode or wire; lead-off
all leads flat, patient talking          cable unplugged, not asystole
regular sharp spikes                     pacemaker, or an ESU, or a bad cable connection
\`\`\`

## Testing with a simulator
Connect a patient simulator in place of the patient. Verify: rate accuracy at several rates, 1 mV amplitude gives 10 mm, each lead displays and matches the simulator's lead polarity, arrhythmia alarms fire, pacer spikes are detected, paper speed is 25 mm/s (a 1-second marker spans 25 mm), and alarm limits and volumes work.

## How the exam asks it
- "R waves are four large boxes apart; what is the rate?" 75 bpm.
- "Which lead is LL minus RA?" Lead II.
- "Which color is the right arm electrode in the AHA system?" White.
- "Which bandwidth is needed to evaluate ST segments accurately?" Diagnostic, 0.05 to 150 Hz.
- "Wandering baseline is most often caused by..." Respiration and patient movement.

## What to memorize
- RA white, LA black, RL green, LL red, V brown. Lead I LA-RA, II LL-RA, III LL-LA, II = I + III.
- 25 mm/s, 10 mm/mV; 1500 over small boxes, 300 over large.
- PR 0.12 to 0.20, QRS under 0.12. Monitoring 0.5 to 40 Hz, diagnostic 0.05 to 150 Hz.`,

u4l2: `## Two ways to measure a pressure you cannot see
You can squeeze the artery closed and watch what happens as you let go, or you can put a sensor inside it. The first is non-invasive blood pressure; the second is an arterial line. The exam wants the method, the errors, and the numbers for both.

## Oscillometry: listening with a pressure sensor
\`\`\`
cuff pressure
   |\\
   | \\_____ deflating in steps
   |       \\____
   |            \\____            oscillations riding on the cuff pressure:
   |    .  .  .  . . . ..:::||||:::.. . . .  .  .
   |                       ^
   +------------------------------------> time
                     largest oscillation = MEAN ARTERIAL PRESSURE (measured directly)
   systolic: where oscillations first grow past a fraction of the maximum (derived)
   diastolic: where they shrink back below a fraction (derived)
\`\`\`
This is why an oscillometric monitor is most trustworthy for MAP and why systolic and diastolic vary a little between brands: each uses its own fractions. Manual measurement with a stethoscope listens instead for **Korotkoff sounds**: first sound systolic, last sound diastolic.

## The cuff: size and position
\`\`\`
Bladder width about 40 percent of the arm circumference; length about 80 percent
too small or too loose    reads HIGH (the cuff must squeeze harder to occlude)
too large                 reads LOW
cuff below heart level    reads HIGH (about 7 to 8 mmHg per 10 cm)
cuff above heart level    reads LOW
arm moving, arrhythmia    failed or erratic readings; the pulses are irregular
slow leak in the hose     deflation too slow or readings fail
\`\`\`
Neonatal, pediatric, adult, large adult, and thigh cuffs exist because of the 40 percent rule, and the monitor's patient mode sets inflation limits and alarms to match.

## Testing NIBP
\`\`\`
NIBP simulator   generates oscillometric pulses at known pressures; verify the monitor's readings
static pressure  compare the monitor's transducer to a reference gauge across the range
leak test        pressurize the closed system; drop should be under the manufacturer's limit (a few mmHg/min)
safety           overpressure cutoff and maximum inflation time must abort a stuck inflation
\`\`\`

## The arterial line: a sensor in the artery
A catheter in the radial or femoral artery connects through stiff fluid-filled tubing to a transducer, a strain gauge that outputs a voltage proportional to pressure. The industry standard sensitivity is **5 microvolts per volt of excitation per mmHg**, which is why any standard transducer works with any standard monitor.

\`\`\`
[artery]--catheter--stiff tubing--stopcock--[TRANSDUCER]--cable--[monitor]
                                     |          |
                                open to air     pressurized flush bag (about 300 mmHg)
                                to ZERO         keeps the line open at a few mL/hr
\`\`\`

Two setup steps the exam tests:
- **Zero**: open the stopcock to air and press zero. The monitor now calls atmospheric pressure zero. Repeat after moving the transducer.
- **Level**: place the transducer at the **phlebostatic axis**, the fourth intercostal space at the midaxillary line, the level of the heart. Fluid columns add pressure: 1 mmHg per 1.36 cm of height. Transducer 13.6 cm too low reads about 10 mmHg high; too high reads 10 mmHg low.

## Damping: the fast-flush test
Squeeze the flush valve briefly and let go. The line is jolted with a square wave, and how it settles tells you its fidelity.
\`\`\`
optimal      sharp square, one or two quick oscillations, then a crisp waveform WITH a dicrotic notch
overdamped   square rounds off, no oscillation, waveform smooth and low, notch gone
             systolic reads LOW, diastolic HIGH   -> air bubble, clot, kink, loose fitting, compliant tubing
underdamped  rings several times before settling, waveform spiky
             systolic reads HIGH                  -> long or overly stiff tubing, catheter whip
\`\`\`
The dicrotic notch is the aortic valve closing; if a properly leveled, zeroed line shows no notch, look for air.

## Other invasive pressures
Central venous (low numbers, a small multiphase wave), pulmonary artery (a catheter floated through the heart), and intracranial pressure use the same transducer principle with different scales. All need zeroing and leveling.

## How the exam asks it
- "Which pressure does an oscillometric device measure directly?" Mean arterial pressure.
- "A cuff that is too small will read..." Falsely high.
- "The transducer is 13.6 cm below the phlebostatic axis; the reading is..." About 10 mmHg too high.
- "A rounded arterial waveform without a dicrotic notch indicates..." Overdamping.
- "Standard pressure transducer sensitivity?" 5 microvolts per volt per mmHg.

## What to memorize
- Oscillometry measures MAP; systolic and diastolic are derived. Korotkoff: first sound systolic, last diastolic.
- Cuff width 40 percent of arm circumference; small reads high, low reads high.
- Zero to air, level at the phlebostatic axis, 13.6 cm H2O = 10 mmHg, 5 uV/V/mmHg.
- Fast-flush: overdamped reads low and loses the notch; underdamped rings and reads high.`,

u4l3: `## Four sensors, four physics
Light through a finger, infrared through breath, current through the chest, and resistance in a probe. Each parameter uses a different physical trick, and each trick has a characteristic way of failing.

## Pulse oximetry: color as a number
Oxygenated hemoglobin is bright red; deoxygenated is darker and bluer. Shine red light (660 nm) and infrared (940 nm) through a fingertip and measure what comes out.
\`\`\`
                  LED red 660 nm  ---->  tissue  ---->  photodetector
                  LED IR  940 nm  ---->          ---->
   deoxygenated hemoglobin absorbs MORE red; oxygenated absorbs MORE infrared
   the ratio of the PULSING part of each signal maps to SpO2 through a calibration table
\`\`\`
Using only the pulsing component ignores skin, bone, and venous blood, which do not pulse. That gives SpO2, pulse rate, and a plethysmograph waveform whose size reflects perfusion.

Where the physics breaks down:
\`\`\`
carboxyhemoglobin (CO poisoning)   absorbs like oxyhemoglobin        reads falsely HIGH; patient may be dying at 99%
methemoglobin                      absorbs both wavelengths equally   reading drifts toward 85% regardless of truth
motion                             adds false pulses                  erratic values
low perfusion (cold, shock)        pulse too small to measure         no reading or unreliable
nail polish, dark pigment          extra absorption                   low bias or failure
ambient light, IV dyes             corrupt the detector               false readings
\`\`\`
Probe failures: cracked LED or detector from being dropped, cable breaks at the connector, worn finger clips that leak light. Test with an SpO2 simulator at several saturations and rates and confirm alarm limits.

## Capnography: the breath's CO2 by infrared
CO2 absorbs infrared strongly at about 4.26 micrometers. A sensor shines infrared through the gas and measures how much is absorbed.
\`\`\`
Mainstream    sensor in an adapter at the airway            fast, accurate, no sampling; adds weight and dead space; needs a heater to prevent fog
Sidestream    pump draws gas through thin tubing to the monitor   works on unintubated patients via cannula; delay of seconds; water trap and tubing clog
\`\`\`
The capnogram:
\`\`\`
CO2
 45 |        _______ plateau (alveolar gas)
    |       /       \\  <- EtCO2 read here, at the end of the plateau
    |      /         |
  0 |_____/          |______  baseline (inspiration should return to zero)
    +------------------------> time
  lost waveform     disconnect, apnea, esophageal tube, or no circulation (confirm the patient first)
  baseline above 0  rebreathing: exhausted CO2 absorber, low fresh gas flow, faulty valve
  sloping plateau   airway obstruction, bronchospasm
\`\`\`
Normal EtCO2 is 35 to 45 mmHg. Calibrate to zero and to a certified gas per the manufacturer.

## Respiration: impedance through the chest
The monitor pushes a tiny high-frequency current between two ECG electrodes and measures the chest's impedance. Inhaling stretches the chest and raises impedance; exhaling lowers it; the monitor counts cycles. It is free (no extra sensor) and weak: movement and heartbeat fool it, and an obstructed airway with a heaving chest counts as breathing. For anything that matters, capnography is the monitor of breathing.

## Temperature: three sensors
\`\`\`
Thermistor    semiconductor; resistance FALLS as temperature rises (NTC)     patient probes; two curve families,
                                                                              YSI 400 and YSI 700, not interchangeable
Thermocouple  two metals produce a voltage with temperature                   rugged, wide range, lab and sterilizers
Infrared      reads emitted heat without contact                              tympanic and temporal; technique-dependent
\`\`\`
A probe of the wrong series reads several degrees off with no error message, so the monitor's probe setting and the probe series must match. Test probes in a stirred water bath against a reference thermometer, or with a probe simulator (a precision resistor for the expected temperature).

## Worked scenarios
\`\`\`
"Rescued from a garage with a running car; SpO2 99%, patient drowsy"     carboxyhemoglobin; the oximeter is fooled; blood gas needed
"EtCO2 dropped to zero during transport; ventilator shows volumes"        disconnect at the airway or loss of pulse; check the patient
"Capnogram baseline sits at 8 mmHg"                                       rebreathing; check the absorber and flow
"New probe reads 3 degrees low"                                           wrong YSI series or monitor probe setting
"Respiration shows 0 on a breathing patient"                              impedance electrode placement or gain; use capnography
\`\`\`

## What to memorize
- Oximetry 660 and 940 nm; CO reads high; methemoglobin about 85; motion and perfusion errors.
- Capnography infrared at 4.26 micrometers; EtCO2 35 to 45; mainstream at the airway, sidestream sampled; lost waveform means disconnect or no circulation.
- Impedance pneumography counts chest impedance cycles. Thermistor NTC; YSI 400 and 700 differ.`,

u4l4: `## The system around the sensors
A parameter is worthless until it reaches a person who can act. Bedside monitors, the central station, telemetry, and vital signs carts are the delivery system, and their failures are as often network and battery as sensor.

## The bedside monitor
\`\`\`
[modules or channels: ECG, NIBP, SpO2, IBP, EtCO2, temp, resp]
        -> processing, display, alarms, trends, local storage
        -> network port (usually a static IP) -> central station and EMR
        -> AC power with an internal battery for transport
   configuration: adult / pediatric / neonatal profiles; unit-specific alarm defaults
\`\`\`
Profiles matter: a neonatal profile inflates the NIBP cuff less, sets different alarm limits, and changes how rates are interpreted. A monitor in the wrong profile gives wrong care.

## The central station
One workstation shows every bed on the unit. It receives every alarm, keeps full-disclosure waveforms for review, prints strips, and forwards vitals to the electronic record. It is a server and a network, and it fails like one.
\`\`\`
one bed offline, others fine         that bed's network cable, wall port, switch port, or IP configuration (or the monitor)
every bed offline                    the switch, the central station server, or a network change: a SYSTEM-WIDE problem
one bed's data in the wrong record   patient admitted to the wrong bed at the central station; an IT and workflow issue
\`\`\`
This localized-versus-system-wide distinction is on the outline twice: as a function concept and as a problem-solving skill.

## Alarms
\`\`\`
Priority   Visual              Audible          Example
High       red, flashing       fast, urgent     asystole, VF, apnea
Medium     yellow, flashing    slower           high heart rate, low SpO2 limit
Low        cyan or yellow,     soft or single   lead off, battery low, technical
           steady
\`\`\`
**Alarm fatigue** is what happens when hundreds of low-value alarms a day teach staff to tune them out, until the one that matters is missed. Alarm management programs set evidence-based default limits, add short delays to transient alarms, require daily electrode changes to cut false lead-off and artifact alarms, and route alarms to phones and pagers with escalation. The biomed's part: signals that are clean (electrodes, cables), configurations that match policy, and alarm volumes and limits verified at PM.

## Telemetry
\`\`\`
[transmitter on the patient] --radio--> [antennas in ceilings] --> [receivers] --> [central station]
US medical telemetry: WMTS bands 608 to 614 MHz, 1395 to 1400 MHz, 1427 to 1432 MHz (protected from interference)
some systems ride the hospital Wi-Fi instead
\`\`\`
\`\`\`
one patient dropping out                  transmitter battery, loose leads, patient left the covered area
patients in one hallway dropping out      antenna or amplifier for that coverage zone
everyone dropping out                     receiver, central station, or network
false alarms on one patient               electrodes and skin prep; a daily change routine
\`\`\`
Transmitters live on batteries (a scheduled change, often daily), get dropped, and their battery contacts corrode. Cleaning between patients is required and must not flood the connector.

## Vital signs monitors
Spot-check monitors on carts take NIBP, SpO2, and temperature on demand, scan patient and clinician barcodes, and send readings to the record over Wi-Fi. They are rolled into doorframes and dropped off carts, so the repairs are cuff hoses, probe cables, mounting hardware, casters, and batteries that spend their lives partially charged.

## Networked monitoring is IT
Static IP addresses (a duplicate breaks two beds), a dedicated monitoring VLAN, switches with power over Ethernet, servers with backups, interfaces to the EMR through middleware, and time synchronization so alarms and records line up. Network changes made without telling the biomed department are a recurring root cause of monitoring outages.

## How the exam asks it
- "What color and pattern indicate a high-priority alarm?" Red, flashing.
- "Which frequency band is reserved for medical telemetry?" WMTS, including 608 to 614 MHz.
- "All monitors on a unit stop displaying at the central station; where do you look first?" The network switch or the central station server, because it is system-wide.
- "Frequent false lead-off alarms; what is the most likely cause?" Electrode quality and skin preparation.
- "A monitoring failure caused by the same alarm sounding hundreds of times a day is called..." Alarm fatigue.

## What to memorize
- Bedside monitor with profiles, central station, telemetry on WMTS, vital signs carts.
- High red flashing, medium yellow flashing, low cyan steady. Alarm fatigue is a hazard.
- One bed is local; all beds is the system. Telemetry: coverage, battery, leads.`,

u4l5: `## Two patients on one strip, and microvolts from the skull
Fetal monitoring watches a mother and a baby at once with two different sensors. EEG watches the brain with the smallest signals in the hospital. Both are on the outline by name, and both are mostly about the transducers.

## The fetal monitor
\`\`\`
[ultrasound transducer on the abdomen] --> Doppler shift --> FETAL HEART RATE (FHR)
[tocodynamometer over the fundus]      --> abdominal firmness --> CONTRACTIONS (TOCO)
both printed together on one strip, commonly at 3 cm/min in the US, plus maternal pulse, event marks
\`\`\`
**FHR by ultrasound Doppler.** The transducer sends ultrasound and listens for echoes from the moving fetal heart; motion shifts the frequency, and the monitor turns the rhythm of those shifts into a rate. Normal FHR is **110 to 160 bpm**. Gel is mandatory; the transducer must be aimed at the heart and moved as the baby moves. Artifacts: signal loss, the monitor counting every second beat (halving) or extra echoes (doubling), and locking onto the **maternal** pulse, which is why the strip also shows the mother's pulse for comparison.

**Contractions by tocodynamometer.** A button-shaped pressure sensor strapped over the top of the uterus feels the abdomen harden during a contraction. It reports timing, frequency, and duration, not the real pressure inside the uterus, because belt tension and body habitus change the number. Users re-zero it between contractions.

**Direct methods** when accuracy matters: a **fetal scalp electrode** screwed into the scalp gives a true beat-to-beat ECG, and an **intrauterine pressure catheter** reads actual contraction pressure in mmHg.

Testing: a fetal simulator drives the Doppler input and the TOCO with known signals; verify rate accuracy across the range, TOCO zero and scale, paper speed, and the printer. Ultrasound transducers are dropped and crack; cables flex to death at the strain relief.

## EEG: the quietest signal
Brain rhythms at the scalp are 10 to 100 microvolts, ten to a hundred times smaller than ECG. Everything about EEG is about amplification and noise.
\`\`\`
electrodes placed by the 10-20 SYSTEM: positions at 10% and 20% intervals of skull measurements,
                                       so any lab reproduces the same placement
impedance checked before recording, typically under 5 kilohms per electrode
many channels displayed as montages (pairs or referenced electrodes)
gain very high; CMRR very high; 60 Hz notch; low-frequency response down to 0.5 Hz or lower
\`\`\`
\`\`\`
Delta   under 4 Hz    deep sleep, or pathology when awake
Theta   4 to 8 Hz     drowsiness, children
Alpha   8 to 13 Hz    relaxed, awake, eyes closed; disappears when eyes open
Beta    above 13 Hz   alert, concentrating, some drugs
\`\`\`
Uses: seizure diagnosis (spikes and sharp waves), sleep studies, monitoring anesthetic depth with a processed index, brain death determination, and intraoperative monitoring. Related recordings: **EMG** (muscle, millivolts, larger and easier), **nerve conduction** (stimulate, measure the delay), and **evoked potentials** (average hundreds of responses to a stimulus to pull a tiny signal out of noise, used to protect the spinal cord during spine surgery).

Artifacts: one noisy channel is that electrode's impedance; eye blinks appear on frontal channels; muscle tension fuzzes everything; cable movement makes big slow swings; 60 Hz means grounding or a nearby device.

## Worked scenarios
\`\`\`
"FHR trace reads 78 and matches the maternal pulse display"          Doppler locked onto the mother; reposition
"FHR suddenly doubles to 280"                                          doubling artifact; reposition and confirm
"TOCO trace flat while the mother reports contractions"                belt loose or sensor off the fundus; re-zero
"One EEG channel is full of 60 Hz"                                     that electrode's impedance is high; re-prep
"All EEG channels swing wildly when the patient moves"                 cable and electrode movement; normal artifact
\`\`\`

## How the exam asks it
- "How is fetal heart rate measured non-invasively?" Ultrasound Doppler.
- "What does a tocodynamometer measure?" Uterine contraction timing and duration via abdominal pressure.
- "Normal fetal heart rate range?" 110 to 160 bpm.
- "What is the 10-20 system?" The standardized EEG electrode placement scheme.
- "Which EEG band is below 4 Hz?" Delta.

## What to memorize
- FHR: Doppler ultrasound, 110 to 160, artifacts halving, doubling, maternal pulse. TOCO: timing by abdominal pressure, re-zero. Scalp electrode and IUPC are direct.
- EEG: 10-20 placement, microvolts, impedance under 5 kilohms, delta, theta, alpha, beta.`,

u4l6: `## Proof, and the numbers proof is written in
"The monitor works" is an opinion. "The monitor read 72 bpm at a simulated 72, 1 mV drew 10 mm, chassis leakage was 42 microamps" is evidence. Test equipment produces the evidence; units of measure are the language it is written in. The outline lists both.

## The toolkit, matched to the device
\`\`\`
Test equipment                  Feeds or measures                                   Used on
Electrical safety analyzer      ground resistance, chassis and lead leakage         anything with a plug; every PM
Patient simulator               ECG rate, amplitude, arrhythmias; resp; IBP; temp   monitors, ECG machines, telemetry
SpO2 simulator                  known saturations and pulse rates to the probe      oximeters, monitors
NIBP simulator                  oscillometric pulses at set pressures; leak test    NIBP monitors, vital signs carts
Defibrillator analyzer          delivered energy into 50 ohms, charge time, sync,   defibrillators, AEDs, pacers
                                pacing output
ESU analyzer                    output power into loads, HF leakage, return          electrosurgical units
                                electrode monitoring
Gas flow / ventilator analyzer  volume, flow, pressure, oxygen; with a test lung     ventilators, anesthesia machines
Infusion pump analyzer          delivered flow over time, occlusion pressure         all infusion pumps
Oxygen analyzer                 percent O2; calibrate at 21% and 100%                concentrators, ventilators, incubators
DVM / DMM                       volts, amps, ohms, continuity                        everything
Other meters                    pressure gauge (tourniquets, suction), tachometer   centrifuges, lights, audiometers,
                                (centrifuges), light meter, sound level meter,      baths, incubators
                                reference thermometer
Oscilloscope                    waveforms in time                                   signal troubleshooting
Cable tracer / tester           far end, pinout, continuity                         network cabling
\`\`\`
Two rules: test equipment has its own calibration schedule traceable to national standards (check the sticker before you trust it), and the simulator is connected in place of the patient, never in parallel with one.

## Units: a conversion sheet
Pressure is the one that appears in the most disguises.
\`\`\`
mmHg      blood pressure, gas partial pressures        760 mmHg = 1 atmosphere
cm H2O    airway and ventilator pressures, CVP         1 mmHg = 1.36 cm H2O   (1 cm H2O = 0.74 mmHg)
psi       cylinders, pipelines, tourniquet sources     14.7 psi = 1 atmosphere;  1 psi = 51.7 mmHg = 6.9 kPa
bar       some gas equipment                           1 bar = 100 kPa = 14.5 psi = 750 mmHg (about 1 atmosphere)
kPa       some monitors and gas analyzers              1 kPa = 7.5 mmHg;  101.3 kPa = 1 atmosphere
\`\`\`
\`\`\`
Temperature    F = C x 1.8 + 32      C = (F - 32) / 1.8      37 C = 98.6 F;  0 C = 32 F;  100 C = 212 F
Energy         joules; 1 J = 1 watt-second; defibrillator output
Light          lumens = a lamp's total output;  lux = lumens per square meter arriving at a surface
               (surgical lights rated in lux at 1 m; phototherapy in microwatts per cm squared per nm)
Sound          decibels; audiometer thresholds in dB HL; 10 dB = ten times the power
Flow           mL/hr infusion; L/min gas
Mass, length   1 kg = 2.2 lb;  1 inch = 2.54 cm;  1 mL = 1 cc;  1 L = 1000 mL
Prefixes       kilo x1000;  milli /1000;  micro /1,000,000;  nano /1,000,000,000
\`\`\`

## Worked conversions
\`\`\`
PEEP of 10 cm H2O in mmHg          10 / 1.36 = 7.4 mmHg
Tourniquet source at 3 bar in psi  3 x 14.5 = 43.5 psi
A patient at 102.2 F in C          (102.2 - 32) / 1.8 = 39 C
A 200 J shock lasting 10 ms        200 J / 0.010 s = 20,000 W during the pulse
An 80 kg patient in pounds         80 x 2.2 = 176 lb
500 microamps in milliamps         0.5 mA
\`\`\`

## The unit trap
Suction regulators read mmHg; ventilators read cm H2O; cylinders read psi; an NIBP monitor may be set to kPa. A "wrong reading" is sometimes a right reading in a different unit. Check the unit before condemning the device.

## How the exam asks it
- "Which test instrument verifies delivered energy?" A defibrillator analyzer with a 50 ohm load.
- "Convert 20 cm H2O to mmHg." About 14.7 mmHg.
- "How many mmHg is one atmosphere?" 760.
- "What is the difference between lumens and lux?" Lumens is total light output; lux is illumination at a surface.
- "Convert 40 C to Fahrenheit." 104 F.

## What to memorize
- Match the analyzer to the device; test equipment is itself calibrated; simulate in place of the patient.
- 1 mmHg = 1.36 cm H2O; 14.7 psi = 760 mmHg = 101.3 kPa; 1 bar about 1 atmosphere; 1 kPa = 7.5 mmHg.
- F = 1.8C + 32; joules; lumens versus lux; dB; 1 kg = 2.2 lb.`,

u5l1: `## The devices in the exam room
Not everything a biomed maintains is a life-support machine. The outline lists the diagnostic tools of clinics, screening programs, and testing rooms, and asks what each does, how it is verified, and how it fails.

## Otoscope and ophthalmoscope
\`\`\`
otoscope        light + magnifier + disposable speculum -> the ear canal and eardrum
ophthalmoscope  light + lens wheel (focus) + aperture selector -> the retina through the pupil
power           wall transformer with coiled cords, or rechargeable handles in a charging well
\`\`\`
Failures: lamps (halogen darkens with age; LEDs fail rarely but fail whole), rechargeable handle cells that no longer hold charge, corroded charging contacts, sticky lens wheels, and fiber-optic bundles in the head that break and dim the light. A light meter check against the manufacturer's minimum catches dimming that users adapt to without noticing.

## Scales
Weight sets drug doses, especially in pediatrics and chemotherapy, and drives fluid management. A scale that reads 2 kg high on an infant is a dosing error.
\`\`\`
types        floor, chair, wheelchair, infant, bed and lift-integrated
sensor       load cells (strain gauges); older units are mechanical balances
verify       certified test weights at zero, mid, and full range; return to zero after loading
watch for    an unlevel platform, a cable or bed rail touching the platform, bed scales not re-zeroed
             after linen and equipment changes, damaged load cell cables under the platform
\`\`\`

## Stress test systems
A treadmill (or bicycle) with a 12-lead diagnostic ECG and automated NIBP, driven by a protocol that raises the workload in stages until a target heart rate or symptoms.
\`\`\`
ECG            diagnostic bandwidth with aggressive motion-artifact filtering; electrodes taped and cables secured
treadmill      speed and grade set by the protocol; verify speed (measured belt speed or tachometer) and
               grade (inclinometer); belt tension and wear; drive and elevation motors and controllers
safety         emergency stop button reachable by the patient; a defibrillator and crash cart in the room;
               staff trained; the patient never left alone on a moving belt
common faults  belt slipping or worn, ECG cable breaks from constant motion, NIBP failing on a moving arm
\`\`\`

## Audiometers
Hearing is tested by presenting pure tones at set frequencies and levels and recording the quietest level the patient hears.
\`\`\`
frequencies    about 250 to 8,000 Hz (speech lives around 500 to 4,000)
levels         dB HL (hearing level), a scale referenced to normal young hearing
transducers    supra-aural or insert earphones for air conduction; a bone vibrator for bone conduction
calibration    against a sound level meter with an artificial ear coupler, typically annually,
               plus a daily listening check by the user; headphone cushions and cords wear
environment    a sound-treated booth or a quiet room; background noise invalidates thresholds
\`\`\`

## Spirometers
The patient inhales fully and blows out as hard and long as possible through a mouthpiece.
\`\`\`
measures       FVC (forced vital capacity), FEV1 (volume in the first second), FEV1/FVC (normal about 0.7 to 0.8),
               peak flow, and flow-volume curves
sensors        pneumotachograph (pressure drop across a screen), turbine, ultrasonic
calibration    a 3-liter syringe delivered at several speeds; readings within about 3 percent
infection      disposable filters and mouthpieces; sensor cleaning per the manufacturer
corrections    temperature and barometric pressure (BTPS correction) matter for accuracy
\`\`\`
A low FEV1/FVC ratio means obstruction (asthma, COPD); a low FVC with a normal ratio means restriction.

## Electrocardiographs
The 12-lead diagnostic machine: ten electrodes, 0.05 to 150 Hz bandwidth, interpretation algorithms, a printer, and often a network link to the record. Verify with a simulator (rate, 1 mV = 10 mm, lead correctness, 25 mm/s), and expect the patient cable to be the recurring failure.

## Ultrasound
The one imaging device the outline places under diagnostic equipment.
\`\`\`
transducer   piezoelectric crystals: voltage pulse -> ultrasound; returning echo -> voltage
frequency    about 2 to 15 MHz;  HIGHER frequency = better resolution, LESS penetration
             low (2 to 5 MHz) for abdomen and heart; high (7 to 15 MHz) for vessels, thyroid, superficial
modes        B-mode gray-scale image; M-mode motion over time (cardiac); Doppler for blood flow
             (color and spectral) from the frequency shift of moving cells
gel          excludes air, which reflects ultrasound almost completely
faults       cracked crystals from drops (dark bands in the image), cable failures at the strain relief,
             worn lens faces, fluid ingress; check with a tissue-mimicking phantom for depth accuracy
             and resolution
\`\`\`

## How the exam asks it
- "How is a spirometer calibrated?" With a 3-liter syringe.
- "What instrument calibrates an audiometer?" A sound level meter with a coupler.
- "Which transducer frequency gives the best resolution for a superficial vessel?" A high frequency, around 10 MHz or more.
- "How is a patient scale verified?" With certified test weights across the range.
- "What safety equipment must be present during a stress test?" An emergency stop and a defibrillator.

## What to memorize
- Otoscope and ophthalmoscope: lamps, batteries, contacts, fibers. Scales: certified weights, zero.
- Stress test: emergency stop, defibrillator, calibrated speed and grade, cable wear.
- Audiometer: 250 to 8,000 Hz, dB HL, sound level meter, quiet booth. Spirometer: 3 L syringe, FEV1/FVC 0.7 to 0.8.
- Ultrasound: piezoelectric, high frequency resolves, low penetrates, Doppler for flow, gel, phantom.`,

u5l2: `## The most common device, the most common incident
A large hospital owns thousands of infusion pumps, and pump-related events top incident reports year after year. The outline names five kinds and expects their mechanisms, safety features, and the arithmetic.

## What a pump is
A controlled way to push fluid into a patient at a set rate, more precise than gravity and able to alarm when something goes wrong.
\`\`\`
[bag or syringe] -> [administration set] -> [PUMP mechanism] -> [tubing] -> [catheter in the patient]
mechanisms:  linear peristaltic (fingers squeeze tubing in a wave), rotary peristaltic (rollers),
             cassette (a disposable chamber the pump fills and empties), syringe (lead screw pushes the plunger)
\`\`\`

## The five on the outline
\`\`\`
Large-volume pump (LVP)   bags of fluid and drugs; 0.1 to about 1,000 mL/hr; accuracy typically within 5%
Syringe pump              small precise volumes; neonatal drugs, anesthesia, potent drips; 0.1 to about 100 mL/hr
PCA pump                  patient-pressed bolus of analgesic; lockout interval; hourly limit; locked case; history log
Enteral feeding pump      formula into the gut; lower accuracy acceptable; enteral-only connectors
Contrast injector         high-flow, high-pressure contrast for imaging; pressure limit; air detection; heated syringe
\`\`\`

## The safety features, and the failure each prevents
\`\`\`
Free-flow protection      set removed from the pump -> a clamp in the set or the door mechanism stops gravity flow;
                          without it, a whole bag can run into the patient in minutes
Downstream occlusion      kink, closed clamp, clotted catheter -> pressure rises -> alarm at a set threshold
                          (time to alarm is longer at low rates; the analyzer checks both)
Upstream occlusion        empty or clamped bag -> the pump starves -> alarm
Air-in-line detection     an ultrasonic sensor on the tubing detects bubbles above a threshold volume
Drug library              (dose error reduction software) the pump knows each drug's concentration and dose limits;
                          soft limits warn, hard limits block; the library must be kept current and loaded on every pump
KVO                       when the programmed volume completes, a slow keep-vein-open rate continues
Battery                   transport; runtime tested at PM
\`\`\`

## Syringe pump hazards
The syringe must be seated and clamped, and the pump must know its size (many detect it; a wrong selection scales the rate). **Start-up delay**: at very low rates, mechanical slack means minutes may pass before drug reaches the patient. **Siphoning**: a syringe mounted well above the patient with a loose plunger can drain by gravity; anti-siphon valves and correct mounting prevent it.

## PCA
The patient presses a button for a **bolus**; the pump refuses another until the **lockout interval** passes and enforces an hourly or four-hour **limit**; a background infusion may run. The case locks and the pump logs every attempt and delivery. The classic PCA incident is a concentration programmed wrong (ten times the intended dose); drug libraries and a second-person check are the defenses.

## Enteral pumps and connectors
Formula must never reach a vein. Enteral sets use a connector standard that physically cannot mate with IV connectors. It is the design answer to a fatal error, and the exam likes it.

## Contrast injectors
For CT, MRI, and angiography: programmed volume, flow rate (mL/s), and a **pressure limit**; a heated syringe lowers contrast viscosity; an air-purge routine and detection because injected air is an embolus; interlocks synchronize with the scanner. Tubing and syringes are single use.

## Testing
\`\`\`
flow accuracy       infusion analyzer at low and high rates; typically within 5% of set
occlusion alarm     pressure at alarm and time to alarm; compare to specification
air-in-line         introduce a known bubble; alarm must fire
free-flow           remove the set with the bag hung high; no flow
battery             runtime to low-battery alarm
software            drug library version current; alarm volume; electrical safety
\`\`\`

## The math
\`\`\`
rate            mL/hr = total mL / hours                1,000 mL over 8 hr = 125 mL/hr
drops           gtt/min = (mL/hr x drop factor) / 60    125 mL/hr, 15 gtt/mL: 125 x 15 / 60 = 31 gtt/min
dose to rate    mL/hr = (mg/kg/hr x kg) / (mg/mL)       0.1 mg/kg/hr x 70 kg = 7 mg/hr; at 1 mg/mL = 7 mL/hr
micrograms      convert first: 5 mcg/kg/min x 80 kg = 400 mcg/min = 24 mg/hr; at 4 mg/mL = 6 mL/hr
\`\`\`

## Worked scenarios
\`\`\`
"Bag emptied in 20 minutes after the nurse opened the door to change sets"   free-flow protection failed or was bypassed
"Occlusion alarm at a set rate of 2 mL/hr came an hour after the line kinked"  expected: time to alarm is long at low rates
"Syringe pump shows infusing but no drug reached the patient for 10 minutes"  start-up delay at a low rate, or unseated syringe
"PCA patient oversedated; the pump log shows correct doses"                    programmed concentration wrong; library review
"Feeding formula found in an IV line"                                          a non-standard connector or adapter defeated the design
\`\`\`

## What to memorize
- Free-flow protection, occlusion (up and downstream), air-in-line, drug library; KVO; accuracy about 5%.
- Syringe: size detection, start-up delay, siphoning. PCA: bolus, lockout, limit. Enteral connectors are incompatible on purpose. Injectors: pressure limit and air detection.
- mL/hr = volume / hours; drops = rate x factor / 60; dose math converts units first.`,

u5l3: `## Devices that treat, on the wards
Not surgery, not life support: the equipment that warms, cools, suctions, squeezes, and stimulates. The outline's five categories each have one or two numbers and one hazard the exam expects.

## Neonatal and pediatric
Newborns cannot hold their own temperature, and premature infants need an artificial womb.
\`\`\`
Incubator        closed heated box; humidified air; optional oxygen; portholes for care
   air mode      the heater holds the AIR at a set temperature
   skin (servo)  a probe on the baby's skin sets the target; the heater adjusts to hold SKIN temperature
   alarms        high air temperature (around 38 to 39 C), probe off or failed, fan failure, power loss, over-temp cutoff
   care          humidity reservoirs breed organisms; thorough cleaning between patients; filters
Radiant warmer   an open bed under an overhead heater, servo controlled from a skin probe;
                 for resuscitation and procedures; MUST alarm when the probe falls off, or the heater runs open-loop
                 and burns
Phototherapy     blue light about 425 to 475 nm breaks down bilirubin (jaundice); output measured with a radiometer
                 in microwatts/cm2/nm; lamps replaced by hours; eye shields for the baby; LED units run cooler
Pediatric        smaller cuffs and probes; neonatal and pediatric modes on monitors, pumps, and defibrillators
                 change limits, inflation pressures, and doses
\`\`\`
Verify incubator and warmer temperature control against a reference thermometer, alarm function (pull the probe: it must alarm), fan and heater operation, and electrical safety; verify phototherapy output with the radiometer.

## Patient temperature management
\`\`\`
Hypo/hyperthermia unit   circulates water through a blanket or pads; heats or cools; manual or servo from a
                         patient probe; water temperature limited to about 4 to 42 C so skin is never frozen or burned
                         checks: temperature accuracy, servo response, flow, leaks, couplings, filters, reservoir, alarms
Forced-air warmer        blows warm air through a disposable blanket; the hose must NEVER be used bare against skin
                         ("hosing") because the outlet air burns; check outlet temperature and the over-temp cutoff
Fluid warmer             see perioperative; cutoff near 42 C
\`\`\`
Uses: warming during surgery, cooling for fever and after cardiac arrest, and rewarming hypothermia.

## Aspiration: suction
\`\`\`
[wall vacuum or portable pump] -> [regulator: continuous or intermittent, mmHg] -> [filter] -> [canister with
                                   overflow float] -> [tubing] -> [catheter]
typical settings   adult airway suction about 80 to 120 mmHg; lower for children and infants; gastric intermittent
faults             clogged filter, canister lid not sealing, float stuck closed, tubing leaks, worn pump diaphragm,
                   dead battery on portables, regulator gauge inaccurate
checks             vacuum level against a gauge, intermittent cycling, overflow protection, filter, battery runtime
\`\`\`
The overflow float matters: if fluid reaches the regulator or pump, the device is contaminated and may fail.

## Sequential compression devices
Inflatable sleeves on the legs inflate from ankle upward in sequence, then deflate, squeezing blood back toward the heart to prevent deep vein clots in immobile patients.
\`\`\`
pressures    typically 35 to 55 mmHg by chamber; cycle roughly one minute
checks       pressure per chamber against a gauge, cycle timing, hose and connector leaks, sleeve integrity,
             alarms for high and low pressure and disconnected sleeves
\`\`\`

## Physical therapy equipment
\`\`\`
TENS                 low-level current through skin electrodes for pain; verify amplitude, pulse width, frequency, timer
Muscle stimulators   stronger current to contract muscle; same verification
Therapeutic          1 to 3 MHz, heats deep tissue; verify output watts with a wattmeter; inspect the transducer face
ultrasound           (a cracked head burns the patient)
Diathermy            RF or microwave heating; strict placement rules; check output and shielding
Traction             a measured pull on the spine or limb; verify force against a gauge; check cables and stops
CPM                  continuous passive motion; a motor moves a joint through a set range; verify range, speed, stops
Whirlpools, packs    water temperature, GFCI protection, electrical safety
\`\`\`
Every PT device that delivers current or heat needs electrical safety testing plus output verification, and its leads and electrodes are inspected because the current path is the patient.

## Worked scenarios
\`\`\`
"Incubator air temperature climbs past the set point"                 heater or controller fault; the over-temp cutoff must work; remove from service
"Radiant warmer probe fell off; warmer kept heating"                  probe-off alarm failed; serious; remove from service
"Patient burned at the skin under a forced-air blanket hose"          hosing: hose used without the blanket
"Suction weak; canister full of foam"                                 overflow float closed or filter wet; replace and clean
"SCD alarms low pressure on one leg"                                  sleeve leak or hose disconnected
\`\`\`

## What to memorize
- Incubator air versus skin servo; over-temp alarm; radiant warmer probe-off alarm; phototherapy 425 to 475 nm, radiometer.
- Temperature units 4 to 42 C water; never a bare warmer hose.
- Suction 80 to 120 mmHg adult, overflow float, filter. SCD 35 to 55 mmHg, sequential. PT: verify output; therapeutic ultrasound 1 to 3 MHz.`,

u5l4: `## Simple machines, serious consequences
A centrifuge is a motor and a rotor. A refrigerator is a compressor and a thermostat. But an unbalanced centrifuge throws a rotor through its lid, and a refrigerator that drifts to 10 C overnight destroys a blood bank. The outline lists eleven laboratory devices; the pattern for all of them is temperature, speed, balance, and documentation.

## Centrifuges
\`\`\`
principle     spinning separates by density: cells settle, plasma stays on top
speed         RPM (revolutions per minute) is what the dial shows
force         RCF, relative centrifugal force in g, is what matters biologically: it rises with the square of speed
              and with rotor radius, so the same RPM gives different RCF in different rotors
rules         BALANCE opposing tubes by weight; never open a spinning centrifuge (lid interlock);
              use the right rotor and buckets; inspect rotors for cracks and corrosion; clean spills as biohazards
verify        speed with a tachometer (optical or strobe through a port), timer accuracy, brake, lid interlock,
              vibration (imbalance or a bearing), temperature on refrigerated models
\`\`\`
A centrifuge that "walks" across the bench is unbalanced; a whine that grows with speed is a bearing.

## Incubators (laboratory)
Hold cultures at 35 to 37 C, often with CO2 (typically 5 percent) and high humidity for cell culture. Verify temperature at several points with a reference thermometer, CO2 with a calibrated analyzer, door gasket, water pan, and alarms; contamination control means cleaning schedules.

## Rockers and shakers
Gentle agitation for mixing, blood bags on platelet agitators, and blotting. Check speed and tilt against settings, motor and belt, platform mounts, and that timers work.

## Refrigerators and freezers
\`\`\`
blood bank, vaccines, reagents      2 to 8 C (a narrow band; freezing destroys vaccines, warmth destroys blood)
plasma freezers                     about -20 C or colder
ultra-low freezers                  about -80 C; specimens and some vaccines
requirements   continuous temperature logging (chart or digital), high and low alarms with remote notification,
               emergency power, alarm testing at PM, door gaskets, defrost cycles that stay within limits,
               no overloading that blocks airflow, a calibrated reference thermometer inside
\`\`\`
An excursion is a reportable event; the logs prove whether the contents are still usable.

## Microscopes
Light source, condenser, objectives, eyepieces, mechanical stage. Service: correct cleaning of optics (lens paper, the right solvent), lamp replacement and alignment, stage and focus mechanics. Fluorescence scopes add filters and arc lamps with a life in hours.

## Water baths
Uniform stable heat for samples: thermostat, heater, circulation. Check temperature accuracy and uniformity, level, water quality (algae, scale), and over-temperature protection.

## Analyzers
Chemistry, hematology, coagulation, blood gas, and immunoassay analyzers are fluidic robots: sample probes, pumps, valves, tubing, reaction chambers with temperature control, optical or electrochemical sensors, and software. They run **calibrators** to set the scale and **quality control** samples to prove it holds. Reagents expire, probes clog, tubing wears, and results interface to the lab information system. Vendors service most; biomeds cover power (UPS), electrical safety, network, water and drain, and first-line triage.

## Cryostats and microtomes
\`\`\`
microtome    slices tissue blocks into sections a few micrometers thick for slides; a feed mechanism advances the block
cryostat     a microtome inside a refrigerated cabinet (about -20 C) for frozen sections read during surgery
hazards      the blade is razor sharp; tissue may be infectious; check temperature, advance mechanism, blade holder,
             defrost, and disinfection procedures
\`\`\`

## Common threads
\`\`\`
temperature   verify against a traceable reference thermometer; log; alarm
speed         verify with a tachometer
balance       centrifuges; interlocks
safety        electrical safety on all; biohazard handling on anything that held specimens
records       laboratory accreditation requires documented calibration and maintenance; CMMS again
\`\`\`

## Worked scenarios
\`\`\`
"Centrifuge vibrates and moves on the counter"            unbalanced load first; then rotor or bearing
"Blood bank refrigerator alarms at 9 C at 3 a.m."         door seal, defrost, compressor, or overloading; contents assessed against the log
"Cell cultures keep dying"                                 incubator temperature or CO2 out of range; verify with references
"Frozen sections are shredding"                            cryostat temperature or blade; check both
\`\`\`

## What to memorize
- Centrifuge: RPM versus RCF, balance, interlock, tachometer. Incubator 37 C and CO2.
- Refrigerators 2 to 8 C, freezers -20 or -80, logged and alarmed. Analyzers: calibrators and QC.
- Cryostat is a refrigerated microtome; blades and biohazard.`,

u6l1: `## Cutting with electricity, and seeing what you cut
The electrosurgical unit is a radio transmitter aimed at a patient, and the video system is how the surgeon sees inside. The outline names ESUs and video integration under perioperative function and again under problem solving.

## Why high frequency cuts safely
Low-frequency current stimulates nerves and muscle. Above roughly 100 kHz, cell membranes cannot follow the reversals, so current heats without stimulating. ESUs run at **300 kHz to 3 MHz**. At the tiny active electrode tip the current density is enormous and tissue heats instantly; at the large return pad it is low and nothing happens.

## Waveforms
\`\`\`
CUT     continuous sine wave, lower voltage    cells boil and burst: a clean incision, little sealing
COAG    interrupted bursts, higher peak voltage   tissue dries and shrinks, vessels seal: stops bleeding
BLEND   duty-cycled mixture                     cuts while sealing
power set in watts; coag modes reach higher voltages, which drive more leakage and more capacitive coupling
\`\`\`

## Monopolar and bipolar
\`\`\`
MONOPOLAR   [generator] -> active electrode (pencil) -> PATIENT -> return (dispersive) pad -> [generator]
            the whole body is in the circuit; the pad must be large and fully in contact
BIPOLAR     [generator] -> one forceps tip -> tissue between the tips -> other tip -> [generator]
            no return pad; current confined to millimeters; used near nerves, in neurosurgery, and with pacemakers
\`\`\`

## The burn problem and its solution
A return pad works only because it spreads current over a large area. Anything that shrinks the contact area concentrates current and cooks the skin under the pad.
\`\`\`
causes    pad partially lifted; pad over bone, scar, or hair; fluid under the pad; a pad too small for the patient;
          ALTERNATE PATHS: ECG electrodes, metal table parts, or a wet drape touching grounded metal
          (current takes a second route and burns there); CAPACITIVE COUPLING through a laparoscopic port
          to bowel the surgeon cannot see; the active pencil left on the drapes and activated
solution  RETURN ELECTRODE MONITORING (contact quality monitoring): the pad is split into two halves;
          the generator passes a small current between them and measures impedance; if contact area drops
          (impedance rises beyond limits) or the pad disconnects, the ESU alarms and REFUSES to activate
\`\`\`
Also: keep ECG electrodes far from the surgical site and the pad; use bipolar near implants; keep the pencil in its holster; no oxygen-enriched atmosphere near the field.

## Testing an ESU
The **electrosurgical analyzer** presents loads that mimic tissue (roughly 100 to 500 ohms) and measures output.
\`\`\`
output power     at several settings and loads, cut and coag, within the manufacturer's tolerance
HF leakage       high-frequency current escaping to ground; limits from IEC 60601-2-2
REM function     unbalance the split-pad simulator: the ESU must alarm and inhibit; disconnect: same
accessories      pencil, foot switch, cords, connectors; activation tone audible
safety           electrical safety test like any other device
\`\`\`

## Surgical video integration
\`\`\`
[camera head on the scope] -> [camera control unit] -> [routing switcher / integration controller]
[light source (xenon or LED)] -> [light cable, fiber bundles] -> the scope          -> monitors on booms and walls
[insufflator: CO2, pressure and flow limits, for laparoscopy]                       -> recorder, printer, conference
[touch-panel control of routing, lights, table, recording]
\`\`\`
\`\`\`
dim image                    broken fibers in the light cable (hold it to a light: dark spots), aged lamp, dirty connections
colors wrong                 white balance not set, damaged camera cable
image on one display only    routing configuration, cable or format mismatch to that display
fogged or dark scope         lens damage, moisture inside the scope; a scope failure, not video
insufflator alarms           over-pressure (obstruction), low CO2 supply, leaks at the trocar
\`\`\`
Testing: image quality on a test target, white balance procedure, light output with a meter, insufflator pressure and flow against a gauge, every source to every display, recorder function, and electrical safety on everything in the patient area, because the camera is on a metal scope inside the patient.

## Worked scenarios
\`\`\`
"Burn under the return pad after a long case"            pad contact degraded; check REM operation and pad placement practice
"ESU alarms and will not fire"                            the split pad is unbalanced or disconnected; the safety feature is working
"Burn on the patient's calf where it touched the table"   an alternate path; pad and positioning review
"Laparoscopic image is dim and yellowish"                 light cable fibers and lamp age
"The surgeon sees video but the recorder captures nothing" routing or recorder input
\`\`\`

## What to memorize
- 300 kHz to 3 MHz: no stimulation. Cut continuous, coag interrupted, blend mixed.
- Monopolar needs a large return pad with contact quality monitoring; bipolar does not.
- Burns come from pad contact, alternate paths, and capacitive coupling. Test with an ESU analyzer into a load.
- Video: camera, light source and cable, insufflator, routing; dim means fibers or lamp.`,

u6l2: `## The rest of the operating room
Six devices from the outline's perioperative list, each simple in principle and each with one number or hazard that the exam expects.

## Pneumatic tourniquets
A cuff around a limb inflates above arterial pressure so the surgeon works in a bloodless field.
\`\`\`
controller     sets pressure, displays it, alarms on leak or drift, tracks INFLATION TIME with interval alarms
pressure       above systolic; commonly around 250 mmHg on an arm and 300 on a thigh, adjusted to the patient
time           prolonged inflation injures nerve and muscle; alarms at intervals; about 2 hours is a common limit
gas            compressed air or a built-in compressor
checks         GAUGE CALIBRATION against a reference gauge (a wrong reading is a direct injury),
               leak test of cuff, tubing, and connectors, alarm and timer function, cuff and closure condition
\`\`\`

## Sterilizers
\`\`\`
Steam (autoclave)        saturated steam under pressure; gravity cycle 121 C at about 15 psi for 15 to 30 minutes;
                         pre-vacuum cycles pull air out first; flash cycles 132 to 135 C for a few minutes
                         verify: temperature and pressure against references, timer, door gasket and interlock,
                         chamber drain and filter, steam quality and traps, the cycle printout
                         prove: BIOLOGICAL INDICATORS (spore strips) show lethality; chemical indicators show exposure
Ethylene oxide (EtO)     gas for heat- and moisture-sensitive items; long cycles plus AERATION to remove toxic residue;
                         gas monitoring for staff safety
Hydrogen peroxide plasma low temperature, fast, for delicate electronics and scopes; item compatibility limits
Washer-disinfectors,     the front end: clean before sterilize; verify temperature, chemical dosing, cycle completion
ultrasonic cleaners
\`\`\`

## Fluid and blood warmers
Rapid infusion of cold fluid drops core temperature and cold blood can stop a heart. Warmers bring fluids to near body temperature on the way in.
\`\`\`
designs        dry-heat plates with a disposable cassette; water bath coil; in-line electronic warmers near the patient
THE limit      blood must not exceed about 42 C or red cells hemolyze; an independent OVER-TEMPERATURE CUTOFF
               and alarm are mandatory
checks         outlet temperature accuracy at flow, the over-temperature alarm and cutoff (simulate an over-temp),
               leak paths, and electrical safety
\`\`\`

## Operating tables
Electric or hydraulic; height, tilt, Trendelenburg, articulating sections, and attachments.
\`\`\`
checks    every motion from the hand pendant and any backup control, pendant cable and battery, brakes and
          floor locks (the table must not roll or drift under load), hydraulic leaks and drift, weight rating,
          pad condition, rail and attachment security, electrical safety (the patient lies on it during ESU use)
hazards   a table that drifts down under load; brakes that release; a pendant that moves the wrong axis
\`\`\`

## Surgical lights
\`\`\`
performance  illumination measured in LUX AT ONE METER (tens of thousands of lux); color temperature near daylight
             for true tissue color; shadow control from multiple sources; depth of field
lamps        halogen: hot, replaced regularly, fans; LED: cooler, long life, adjustable color
checks       output with a light meter, focus and pattern, arm balance and DRIFT (a light that sags onto the field
             is a contamination and injury problem), sterile handle mount, backup lamp switching, electrical safety
\`\`\`

## Surgical microscopes
\`\`\`
optics       objective, zoom, eyepieces, sometimes an assistant scope and a camera port
motion       motorized focus and zoom; a counterbalanced stand with brakes; a foot pedal
illumination fiber-optic or LED through the objective
checks       clean and aligned optics, illumination intensity, motor function, BALANCE and brakes (a head that drops
             onto a patient is a serious injury), pedal, electrical safety, drape compatibility
\`\`\`

## Worked scenarios
\`\`\`
"Tourniquet display 250, reference gauge 205"                        calibration; under-pressure lets blood into the field or over-pressure injures; recalibrate
"Blood warmer outlet measures 44 C"                                  cutoff failure; remove from service immediately
"Autoclave printout shows 121 C but the spore test grew"             steam quality, air removal, wet loads, or an overloaded chamber; quarantine loads and investigate
"Surgical light slowly lowers during a case"                         arm balance or brake; adjust and test with the head loaded
"OR table sinks a few inches over an hour with a patient on it"      hydraulic leak or valve; remove from service
\`\`\`

## What to memorize
- Tourniquet: calibrated gauge, leak test, time alarms near 2 hours.
- Steam 121 C at 15 psi with biological indicators; EtO and peroxide plasma for heat-sensitive items.
- Warmer cutoff about 42 C. Tables: motions, brakes, hydraulics. Lights: lux at 1 m, drift. Microscopes: balance and brakes.`,

u6l3: `## Three ways to take over the heart
A defibrillator resets a chaotic heart, an external pacemaker drives a slow one, and a balloon pump helps a weak one. Each is a life-support device, each is tested with specific numbers, and each is on the outline by name.

## Defibrillation: energy, waveforms, timing
A capacitor is charged to a high voltage and dumped through the chest. The pulse depolarizes enough of the heart at once to stop the chaos of ventricular fibrillation and let the SA node restart the rhythm.
\`\`\`
stored energy     E = 1/2 x C x V^2 (joules); a 32 microfarad capacitor at 5,000 V stores 400 J
delivered energy  less than stored; depends on the patient's impedance; tested into 50 ohms
monophasic        one-direction pulse; older; up to 360 J
biphasic          current reverses partway; more effective at lower energy; adults typically 120 to 200 J
                  (device specific: follow the manufacturer's sequence)
pediatric         2 J/kg first shock, 4 J/kg after
\`\`\`
\`\`\`
DEFIBRILLATION    unsynchronized; for VF and pulseless VT; the shock fires when the button is pressed
CARDIOVERSION     SYNCHRONIZED; for organized rhythms (atrial fibrillation, some tachycardias with a pulse);
                  the shock is timed to the R wave so it does not land on the T wave, where it could CAUSE VF
AED               analyzes the rhythm itself; advises and delivers a shock only for VF or pulseless VT;
                  public access units self-test and nag about pads and batteries
\`\`\`
Pads versus paddles: adhesive pads allow hands-free shocks and pacing and are safer for staff; paddles need conductive gel and firm pressure. Never shock a wet patient or one touching metal; announce and clear.

## Testing a defibrillator
The **defibrillator analyzer** is a 50-ohm load with a fast meter.
\`\`\`
delivered energy   at low, mid, and max settings; within the manufacturer's tolerance (often about 15%)
charge time        to maximum energy; typically under about 10 seconds; growing charge time means capacitor or battery
synchronization    the analyzer supplies an ECG; the shock must fire within a few tens of milliseconds after the R wave
ECG                rate and amplitude accuracy through pads and cable
pacing             output current and rate, demand behavior
battery            runtime and number of shocks; batteries are a scheduled replacement item
daily user check   a shock into the tester or an automatic self-test, pads in date, paper, battery
\`\`\`
Typical failures: aging capacitors (low energy, long charge), relay contacts, pad connectors, and batteries.

## External (transcutaneous) pacing
Large pads on the chest deliver pulses that capture the heart when its own rate fails.
\`\`\`
rate       the pacing rate set
output     current in mA, raised until CAPTURE: every pacer spike is followed by a QRS (and a pulse)
demand     paces only when the patient's own rate drops below the set rate; the usual mode
fixed      paces regardless of intrinsic beats; rarely used, risks competing with the heart
test       the analyzer measures pulse current, width, and rate, and checks that demand mode inhibits on a simulated intrinsic rhythm
\`\`\`
Pacing spikes without following QRS means no capture: contact, output, or the patient. Conscious patients feel each pulse; sedation is clinical.

## The intra-aortic balloon pump
A long balloon on a catheter sits in the descending aorta just below the arch. The pump inflates and deflates it with helium in time with the heart.
\`\`\`
        inflate during DIASTOLE  -> blood is pushed back up toward the coronary arteries -> more oxygen to the heart muscle
        deflate just before SYSTOLE -> the aorta is suddenly emptier -> less resistance for the ventricle (lower afterload)
        net effect: more supply, less demand; supports a failing heart after infarction, surgery, or in shock
timing  from the ECG (R wave) or the arterial pressure waveform (dicrotic notch); the console shows the augmented waveform
helium  low density moves fast through the thin catheter; if the balloon leaks, helium is absorbed harmlessly in small amounts
alarms  GAS LEAK (rupture; blood may appear in the tubing), gas loss, trigger loss, timing errors, low augmentation, kinked catheter
checks  helium supply and regulator, pneumatic leak test, both trigger sources, alarm function, battery, electrical safety
\`\`\`
Timing errors matter: early inflation fights the ventricle; late deflation raises afterload; both harm.

## Worked scenarios
\`\`\`
"200 J set, 150 J delivered into the analyzer"              out of tolerance; capacitor or relay; remove from service
"Charge to 360 J now takes 25 seconds"                       battery or capacitor aging
"Sync mode: the shock fired on the T wave in testing"        synchronization failure; dangerous; remove from service
"Pacing at 70 with spikes but no QRS"                        no capture; raise output, check pads; verify output on the analyzer
"IABP gas leak alarm, blood in the catheter line"            balloon rupture; the pump stops; clinical emergency
\`\`\`

## What to memorize
- Stored half CV squared; delivered into 50 ohms; biphasic 120 to 200 J, monophasic 360; peds 2 then 4 J/kg.
- Synchronized for organized rhythms (timed to R); unsynchronized for VF. AEDs shock only VF and pulseless VT.
- Analyzer: energy, charge time, sync, pacing. Demand pacing inhibits on intrinsic beats; capture is spike then QRS.
- IABP: helium, inflate in diastole, deflate before systole; gas leak alarm.`,

u6l4: `## Breathing machines
A ventilator breathes for a patient who cannot. An anesthesia machine does that and also mixes the gases that keep the patient asleep. Both push gas under pressure, both have alarms for the two ways that goes wrong, and both are tested with a gas analyzer and a test lung.

## The ventilator's settings, with numbers
\`\`\`
Tidal volume (VT)   6 to 8 mL per kg of IDEAL body weight (about 500 mL adult)     too much injures the lungs
Rate                12 to 20 breaths per minute                                     minute volume = VT x rate
FiO2                0.21 (room air) to 1.0                                          verified by an oxygen analyzer
                                                                                    calibrated at 21% and 100%
PEEP                positive end-expiratory pressure, commonly about 5 cm H2O       keeps alveoli open at end of exhalation
I:E ratio           inspiratory to expiratory time, commonly 1:2
pressure limit      the maximum airway pressure allowed; the high-pressure alarm threshold
\`\`\`

## Modes: who decides what
\`\`\`
Volume control (VCV)     the ventilator delivers a SET VOLUME; pressure rises as needed (varies with lung stiffness)
Pressure control (PCV)   the ventilator delivers a SET PRESSURE; volume varies with lung stiffness
Assist-control (A/C)     every breath, triggered by the patient or the timer, is a full machine breath
SIMV                     mandatory breaths at the set rate; patient breathes spontaneously in between
Pressure support (PSV)   spontaneous breaths get a boost of pressure; no set rate
CPAP                     continuous positive pressure; the patient does all the breathing
\`\`\`

## Alarms: two directions of failure
\`\`\`
HIGH PRESSURE        the gas cannot get in: kinked tube, secretions, biting, coughing, bronchospasm, water in the circuit,
                     patient fighting the ventilator
LOW PRESSURE /       the gas is escaping: DISCONNECT (the deadly one), leak in the circuit, cuff leak, cracked humidifier
LOW MINUTE VOLUME
APNEA                no breath detected in the set interval (spontaneous modes)
FiO2, rate, power,   gas supply low, battery, blender fault
gas supply
\`\`\`
High is obstruction, low is disconnect. The response to a low-pressure alarm is to look at the patient and reconnect, before anything else.

## Inside the ventilator
Gas source (turbine or compressor, or pipeline oxygen and air through a **blender**), flow and pressure sensors, an inspiratory valve, an **exhalation valve** that holds PEEP, a **heated humidifier** with a temperature probe (or a heat-and-moisture exchanger), bacterial filters, a battery for transport, and the circuit. Circuits and filters are single-patient or reprocessed per policy.

## Testing a ventilator
Connect a **test lung** and a **gas flow analyzer** in the circuit.
\`\`\`
delivered tidal volume at several settings   within tolerance (often about 10%)
pressure, PEEP, flow, rate                    against settings
FiO2                                          at 21, 50, 100 percent, with the analyzer calibrated first
every alarm                                   occlude for high pressure, disconnect for low, stop the lung for apnea
humidifier temperature, battery runtime, electrical safety, filters and circuit condition
\`\`\`

## Respiratory therapy equipment
\`\`\`
Oxygen concentrator   molecular sieve strips nitrogen from room air; delivers about 90 to 95% oxygen;
                      exhausted sieve beds deliver less; verify with an oxygen analyzer
CPAP / BiPAP          non-invasive support through a mask; CPAP one pressure; BiPAP separate inspiratory and
                      expiratory pressures; sleep apnea and respiratory failure; mask fit and leaks
Humidifiers, nebulizers, flowmeters, bag-valve masks   condition gas, deliver drugs, provide manual ventilation;
                      inspect, verify flow, keep clean
\`\`\`

## The anesthesia machine
\`\`\`
GAS SUPPLY     pipeline oxygen, air, nitrous oxide at about 50 psi; cylinder backup on the machine;
               pin index and DISS fittings; gauges; low-oxygen-pressure alarm and fail-safe that cuts nitrous
FLOWMETERS     set each gas; the HYPOXIC GUARD links oxygen and nitrous flows so the mix never falls below about
               21 to 25% oxygen; the OXYGEN FLUSH delivers a high flow of pure oxygen past the vaporizers
VAPORIZERS     add a set percentage of liquid anesthetic agent; AGENT-SPECIFIC and keyed so the wrong agent cannot be
               filled: sevoflurane YELLOW, isoflurane PURPLE, desflurane BLUE (heated and pressurized);
               an interlock allows only one vaporizer on at a time
BREATHING      the circle system: one-way inspiratory and expiratory valves, a CO2 ABSORBER (soda lime that changes
CIRCUIT        color as it exhausts), a reservoir bag, the adjustable pressure-limiting valve, the ventilator bellows
SCAVENGING     collects waste anesthetic gas from the APL valve and ventilator exhaust and vents it; protects staff
MONITORING     inspired oxygen, agent concentration, EtCO2, airway pressure, volumes, plus all patient parameters
PRE-USE CHECK  a formal checklist: high-pressure supply, low-pressure LEAK TEST (the vaporizer and pipes), circuit
               leak test, ventilator function, scavenging, monitors, alarms, suction available
\`\`\`

## Worked scenarios
\`\`\`
"High-pressure alarm, patient coughing"                     obstruction; suction and circuit check
"Low-pressure alarm, chest not rising"                      disconnect; reconnect now
"Concentrator reads 82 percent oxygen"                      sieve beds exhausted; service
"Nitrous will not flow with oxygen off"                     hypoxic guard doing its job
"CO2 absorber granules have turned color"                   exhausted; replace; rising EtCO2 baseline would follow
"Vaporizer will not accept the filler bottle"               keyed filler: wrong agent for that vaporizer, by design
\`\`\`

## What to memorize
- VT 6 to 8 mL/kg, rate 12 to 20, PEEP about 5, FiO2 verified at 21 and 100; minute volume is VT times rate.
- Volume control sets volume, pressure control sets pressure; A/C, SIMV, PSV, CPAP.
- High pressure is obstruction, low pressure is disconnect, apnea is no breath.
- Anesthesia: 50 psi pipeline, hypoxic guard, keyed vaporizers (sevo yellow, iso purple, des blue), CO2 absorber, scavenging, pre-use checklist.`

});
