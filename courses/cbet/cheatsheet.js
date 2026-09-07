// BiomedTech Academy memorization sheet for the AAMI/ACI CBET exam. Numbers, normal ranges, limits, formulas,
// device facts, and orders of steps that must be recalled cold. Original content. Safety limits name their standard.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CBET Memorization Sheet",
  intro: "Print this and keep it beside you. The CBET exam rewards recall of normal values, safety limits, device settings, and formulas across every kind of equipment in a hospital. Every number on this sheet is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Certifying body", "AAMI Credentials Institute (ACI)"],
          ["Questions", "165 multiple choice; 150 scored, 15 unscored pretest items mixed in"],
          ["Time", "3 hours, closed book"],
          ["Passing", "Criterion-referenced cut score, about 116 of 165 correct (roughly 70%)"],
          ["Healthcare Technology Function and Operation", "30%"],
          ["Healthcare Technology Problem Solving", "30%"],
          ["Healthcare Information Technology", "17%"],
          ["Public Safety in the Healthcare Facility", "10%"],
          ["Anatomy and Physiology", "7%"],
          ["Fundamentals of Electricity and Electronics", "6%"]
        ] },
        { type: "note", text: "Function and problem solving are 60% of the exam. For every device: what it measures or delivers, its key settings and normal values, its alarms, and its common failures." }
      ]
    },
    {
      id: "anatomy", title: "Anatomy and physiology",
      blocks: [
        { type: "table", cols: ["Vital sign (adult, resting)", "Normal range", "Measured by"], rows: [
          ["Heart rate", "60 to 100 bpm (below 60 bradycardia, above 100 tachycardia)", "ECG, pulse oximeter, NIBP"],
          ["Respiratory rate", "12 to 20 breaths per minute", "Impedance pneumography, capnography"],
          ["Blood pressure", "About 120/80 mmHg; MAP about 70 to 100 mmHg", "NIBP, arterial line"],
          ["Oxygen saturation (SpO2)", "95 to 100%", "Pulse oximeter"],
          ["End-tidal CO2 (EtCO2)", "35 to 45 mmHg", "Capnograph"],
          ["Body temperature", "37 C (98.6 F); fever above about 38 C", "Thermistor, thermocouple, infrared"],
          ["Fetal heart rate", "110 to 160 bpm", "Doppler ultrasound"],
          ["Tidal volume", "About 500 mL at rest (6 to 8 mL/kg ideal body weight on a ventilator)", "Ventilator, spirometer"]
        ] },
        { type: "table", cols: ["System", "Key parts", "What the technician's devices do with it"], rows: [
          ["Cardiovascular", "Heart (right atrium, right ventricle, left atrium, left ventricle), valves, arteries, veins, capillaries", "ECG records electrical activity; NIBP and arterial lines measure pressure; defibrillators reset rhythm; pacemakers time it"],
          ["Conduction path", "SA node, AV node, bundle of His, bundle branches, Purkinje fibers", "P wave = atrial depolarization, QRS = ventricular depolarization, T wave = ventricular repolarization"],
          ["Respiratory", "Trachea, bronchi, bronchioles, alveoli, diaphragm", "Ventilators move gas; oximeters measure oxygen carried; capnographs measure CO2 exhaled"],
          ["Nervous", "Brain (cerebrum, cerebellum, brainstem), spinal cord, peripheral nerves", "EEG records brain activity; EMG records muscle; nerve stimulators test conduction"],
          ["Renal", "Kidneys, ureters, bladder", "Dialysis replaces filtration when kidneys fail"],
          ["Digestive", "Esophagus, stomach, small and large intestine, liver, pancreas", "Enteral pumps feed; endoscopes view"],
          ["Endocrine", "Pancreas (insulin), thyroid, adrenals, pituitary", "Glucose meters and insulin pumps"],
          ["Blood", "Plasma, red cells (oxygen), white cells (immunity), platelets (clotting)", "Analyzers count and measure; oximetry depends on hemoglobin"]
        ] },
        { type: "list", title: "Directional terms and word parts", cols: 2, items: [
          "Anterior front, posterior back; superior above, inferior below; medial toward the midline, lateral away; proximal near the trunk, distal far; supine face up, prone face down",
          "Systole contraction, diastole relaxation. Hypertension high pressure, hypotension low. Hypoxia low oxygen, hypercapnia high CO2",
          "Prefixes: brady- slow, tachy- fast, hyper- high, hypo- low, a-/an- without, dys- difficult",
          "Roots: cardio heart, pulmo/pneumo lung, nephro/reno kidney, hepat liver, neuro nerve, gastro stomach, derm skin, osteo bone, hemo/hemat blood, myo muscle",
          "Suffixes: -itis inflammation, -ectomy removal, -ostomy opening, -oscopy viewing, -graphy recording, -gram the record, -algia pain"
        ] },
        { type: "list", title: "ECG timing (normal adult)", cols: 2, items: [
          "PR interval 0.12 to 0.20 s; QRS under 0.12 s; QT under about 0.44 s",
          "Paper speed 25 mm/s; 1 mV = 10 mm; small box 0.04 s (1 mm), large box 0.20 s (5 mm)",
          "Heart rate = 1500 / small boxes between R waves, or 300 / large boxes",
          "Ventricular fibrillation: chaotic, no QRS; asystole: flat line; both are shockable or not per ACLS (VF shockable, asystole not)"
        ] }
      ]
    },
    {
      id: "electronics", title: "Electricity and electronics",
      blocks: [
        { type: "table", cols: ["Formula", "Statement"], rows: [
          ["Ohm's law", "V = I x R; I = V / R; R = V / I"],
          ["Power", "P = V x I = I squared x R = V squared / R (watts)"],
          ["Series resistance", "R total = R1 + R2 + ... ; same current through each; voltages add"],
          ["Parallel resistance", "1 / R total = 1/R1 + 1/R2 + ... ; two resistors: (R1 x R2) / (R1 + R2); same voltage across each; currents add"],
          ["Kirchhoff", "Currents into a node equal currents out; voltages around a loop sum to zero"],
          ["AC values", "RMS = 0.707 x peak; peak = 1.414 x RMS; peak-to-peak = 2 x peak; US mains 120 V RMS at 60 Hz (many countries 230 V at 50 Hz)"],
          ["Transformer", "V secondary / V primary = N secondary / N primary; step-down lowers voltage and raises current; isolation transformer 1:1"],
          ["Capacitive reactance", "Xc = 1 / (2 x pi x f x C); capacitors pass AC, block DC"],
          ["Inductive reactance", "XL = 2 x pi x f x L; inductors pass DC, oppose changes in current"],
          ["RC time constant", "tau = R x C; capacitor reaches 63% of full charge in one tau, about 99% in five"],
          ["Frequency and period", "f = 1 / T; 60 Hz has a period of 16.7 ms"],
          ["Nyquist", "Sample at more than twice the highest frequency in the signal"]
        ] },
        { type: "list", cols: 2, items: [
          "Resistor color code digits: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, white 9; tolerance gold 5%, silver 10%",
          "US wire colors: black (or red) hot, white neutral, green or bare ground",
          "Diode conducts one way; forward drop about 0.7 V silicon; rectifiers: half-wave, full-wave, bridge; capacitor filters ripple; regulator holds output steady",
          "Linear power supply: heavy transformer, low noise, inefficient. Switching supply: light, efficient, more noise",
          "Transistor: NPN or PNP, base controls collector-emitter; used as a switch or amplifier",
          "Op-amp rules: huge gain, inputs draw no current, output drives the inputs equal with feedback; instrumentation amplifier rejects common-mode noise (high CMRR) for ECG front ends",
          "Filters: low-pass keeps slow signals, high-pass removes baseline drift, band-pass keeps a range, notch removes 60 Hz",
          "Digital: binary 1010 = 10 decimal = A hex; 8 bits = 1 byte = 0 to 255; ADC resolution: 8 bits = 256 steps, 12 bits = 4096",
          "Logic: AND all inputs high, OR any input high, NOT inverts, NAND and NOR are inverted AND and OR, XOR exactly one",
          "DMM measures volts, amps (in series), ohms (power off); oscilloscope shows voltage against time; 10x probe divides by ten; function generator provides test signals"
        ] }
      ]
    },
    {
      id: "safety", title: "Electrical safety",
      blocks: [
        { type: "table", cols: ["Current through the body (60 Hz, hand to hand)", "Effect"], rows: [
          ["1 mA", "Threshold of perception (tingle)"],
          ["5 mA", "Accepted maximum harmless current"],
          ["10 to 20 mA", "Let-go threshold: muscles contract and the person cannot release"],
          ["50 mA", "Pain, possible fainting, respiratory arrest"],
          ["100 to 300 mA", "Ventricular fibrillation likely"],
          ["6 A and above", "Sustained heart contraction, burns, respiratory paralysis"],
          ["Microshock", "As little as 10 microamps delivered directly to the heart (through a catheter or pacing wire) can cause fibrillation"]
        ] },
        { type: "table", cols: ["IEC 60601-1 limit", "Normal condition", "Single fault condition"], rows: [
          ["Earth (ground) leakage", "5 mA", "10 mA"],
          ["Touch (enclosure, chassis) current", "100 microamps", "500 microamps"],
          ["Patient leakage, type B and BF, AC", "100 microamps", "500 microamps"],
          ["Patient leakage, type CF, AC", "10 microamps", "50 microamps"],
          ["Patient leakage, DC (all types)", "10 microamps", "50 microamps"],
          ["Mains voltage on the applied part", "BF: 5 mA; CF: 50 microamps", "(single fault test)"]
        ] },
        { type: "table", cols: ["NFPA 99 and facility facts", "Value"], rows: [
          ["Ground (chassis to plug ground pin) resistance", "0.5 ohm maximum for patient-care equipment"],
          ["Chassis (touch) leakage, cord-connected patient-care equipment", "500 microamps (older editions used 300 or 100 microamps; know the limit your facility cites)"],
          ["Line isolation monitor (LIM) alarm", "5 mA total hazard current"],
          ["GFCI trip", "4 to 6 mA (nominal 5 mA)"],
          ["Isolated power", "Neither conductor is grounded; used in wet locations and some operating rooms; first fault does not shock, LIM alarms"],
          ["Receptacle testing", "Retention force, polarity, ground continuity; hospital-grade receptacles have the green dot"]
        ] },
        { type: "list", title: "Classes, types, and symbols", cols: 2, items: [
          "Class I: protective earth (three-prong ground). Class II: double insulation, no ground (square-in-square symbol). Internally powered: battery only",
          "Applied part type B: body, not for direct cardiac use (stick figure). BF: body floating, isolated (figure in a box). CF: cardiac floating, safe for direct heart connection (heart in a box)",
          "Defibrillation-proof applied part: the symbol with paddles; withstands a defibrillator discharge",
          "Macroshock: current through the skin; needs milliamps. Microshock: current bypassing the skin to the heart; microamps",
          "Safety analyzer tests in order: visual inspection, ground resistance, chassis leakage (normal, reversed polarity, open ground, open neutral), patient lead leakage, lead-to-lead, mains on applied part",
          "Leakage rises with open ground and reversed polarity; a rising leakage trend on PM predicts insulation failure"
        ] }
      ]
    },
    {
      id: "facility", title: "Infection control, fire, gas, radiation, MRI, and regulations",
      blocks: [
        { type: "list", title: "Infection control", cols: 2, items: [
          "Standard precautions: treat all blood and body fluids as infectious; hand hygiene before and after every patient contact and before touching equipment",
          "PPE donning: gown, mask, eye protection, gloves. Doffing: gloves, eye protection, gown, mask (clean hands between)",
          "Cleaning removes soil; disinfection kills most microbes; sterilization kills all including spores",
          "Spaulding: critical items (enter sterile tissue) sterilize; semi-critical (touch mucous membranes) high-level disinfect; non-critical (intact skin) low-level disinfect",
          "Steam autoclave: 121 C (250 F) at 15 psi for 15 to 30 minutes, or 132 to 135 C flash cycles; biological indicators verify; ethylene oxide and hydrogen peroxide plasma for heat-sensitive items",
          "Clean and disinfect equipment before servicing it; sharps in puncture-resistant containers; OSHA bloodborne pathogens standard covers exposure control"
        ] },
        { type: "list", title: "Fire, gas, radiation, laser, MRI", cols: 2, items: [
          "Fire triangle: heat, fuel, oxygen. RACE: rescue, alarm, confine, extinguish. PASS: pull, aim, squeeze, sweep",
          "Extinguisher classes: A ordinary combustibles, B flammable liquids, C electrical, D metals, K cooking oils",
          "Oxygen-enriched atmospheres burn faster; no oil or grease on oxygen fittings; cylinders secured upright, capped, stored below 125 F",
          "US medical gas cylinder colors: oxygen green, nitrous oxide blue, carbon dioxide gray, nitrogen black, medical air yellow, helium brown; pin index and DISS fittings prevent wrong connections",
          "Full E cylinder of oxygen: about 2,000 to 2,200 psi, about 660 liters; wall outlets about 50 psi",
          "Ionizing radiation protection: time, distance, shielding; ALARA; inverse square law (double the distance, one quarter the dose); lead aprons about 0.5 mm; dosimeters for staff",
          "Laser classes 1 (safe) through 4 (fire and eye hazard); wavelength-specific eyewear; fire risk with oxygen and drapes",
          "MRI zones I (public) through IV (magnet room); the magnet is always on; ferromagnetic objects become projectiles; quench vents helium; screen every person and device; MR Safe, MR Conditional, MR Unsafe labels"
        ] },
        { type: "list", title: "Regulations and reporting", cols: 2, items: [
          "FDA medical device reporting: user facilities report a device-related death to FDA and the manufacturer within 10 work days, a serious injury to the manufacturer within 10 work days",
          "Recall classes: Class I serious harm or death, Class II temporary or reversible harm, Class III unlikely to cause harm",
          "The Joint Commission surveys hospitals (environment of care, equipment management, alternative equipment maintenance rules); CMS sets Conditions of Participation; OSHA protects workers (hazard communication, safety data sheets)",
          "After an incident: remove the device from service with all accessories and disposables attached, do not clear logs or settings, tag and sequester, document, report",
          "Root cause analysis: ask why repeatedly; fix the system, not just the part"
        ] }
      ]
    },
    {
      id: "monitoring", title: "Physiological monitoring",
      blocks: [
        { type: "table", cols: ["ECG fact", "Value"], rows: [
          ["Einthoven's triangle", "Lead I = LA minus RA; Lead II = LL minus RA; Lead III = LL minus LA; Lead II = Lead I + Lead III"],
          ["Augmented leads", "aVR, aVL, aVF from the limb electrodes; V1 to V6 across the chest; 12 leads from 10 electrodes"],
          ["Electrode colors (US, AHA)", "RA white, LA black, RL green (ground), LL red, V brown (\"white on right, smoke over fire\")"],
          ["Bandwidth", "Monitoring mode 0.5 to 40 Hz; diagnostic mode 0.05 to 150 Hz"],
          ["Interference", "60 Hz: bad electrode contact, unshielded leads, nearby equipment; wandering baseline: respiration or motion; spikes: muscle tremor or loose lead"],
          ["Lead-off", "High impedance detected on an electrode; check gel, skin prep, cable"],
          ["Simulator test", "Patient simulator provides rate, amplitude, and arrhythmias to verify the monitor"]
        ] },
        { type: "table", cols: ["Blood pressure fact", "Value"], rows: [
          ["NIBP method", "Oscillometric: cuff inflates above systolic, deflates in steps, MAP is the point of maximum oscillation, systolic and diastolic derived"],
          ["Cuff sizing", "Bladder width about 40% of arm circumference, length about 80%; too small reads high, too large reads low"],
          ["Invasive line", "Transducer zeroed to atmosphere and leveled at the phlebostatic axis (fourth intercostal space, midaxillary line)"],
          ["Height error", "Every 13.6 cm (about 10 cm of water equals 7.4 mmHg; 13.6 cm H2O = 10 mmHg) the transducer is off level changes the reading about 10 mmHg"],
          ["Damping", "Fast-flush (square wave) test: overdamped rounds the wave and reads low systolic; underdamped overshoots and reads high"],
          ["Transducer sensitivity", "5 microvolts per volt per mmHg (industry standard)"],
          ["Units", "1 mmHg = 1.36 cm H2O; 1 kPa = 7.5 mmHg; 760 mmHg = 1 atmosphere = 14.7 psi"]
        ] },
        { type: "table", cols: ["Oximetry and capnography", "Value"], rows: [
          ["Pulse oximeter wavelengths", "Red about 660 nm, infrared about 940 nm; ratio of absorbances gives SpO2"],
          ["Errors", "Carboxyhemoglobin reads falsely high; methemoglobin trends toward 85%; motion, low perfusion, nail polish, ambient light, dyes"],
          ["Testing", "SpO2 simulator or optical tester; check probe LED and detector, cable, and site"],
          ["Capnography", "Infrared absorption by CO2 (about 4.26 micrometers); mainstream sensor at the airway, sidestream samples through tubing (delay, water trap)"],
          ["Capnogram", "Baseline near zero, rapid rise, alveolar plateau, EtCO2 at end of plateau, drop on inspiration; loss of waveform means disconnect, apnea, or esophageal intubation"]
        ] },
        { type: "list", title: "Other monitoring", cols: 2, items: [
          "Temperature: thermistor (resistance falls as temperature rises, NTC), thermocouple (voltage from two metals), infrared tympanic; YSI 400 and 700 series probe curves are not interchangeable",
          "Respiration on a monitor: impedance pneumography through the ECG electrodes; capnography is more reliable",
          "Alarm priorities (IEC 60601-1-8): high red flashing, medium yellow flashing, low cyan or yellow steady; alarm fatigue is a patient safety problem",
          "Telemetry: WMTS bands 608 to 614 MHz, 1395 to 1400 MHz, 1427 to 1432 MHz; dropouts from antenna coverage, low battery, interference",
          "Fetal monitor: ultrasound Doppler for fetal heart rate, tocodynamometer for contractions, normal FHR 110 to 160 bpm",
          "EEG bands: delta under 4 Hz, theta 4 to 8, alpha 8 to 13, beta above 13; electrodes placed by the 10-20 system; EMG measures muscle electrical activity"
        ] }
      ]
    },
    {
      id: "therapy", title: "Therapeutic and life-support devices",
      blocks: [
        { type: "table", cols: ["Defibrillation fact", "Value"], rows: [
          ["Adult energy", "Monophasic 360 J; biphasic 120 to 200 J (device specific); pediatric 2 J/kg first, 4 J/kg after"],
          ["Synchronized cardioversion", "Shock timed to the R wave for organized rhythms (atrial fibrillation, SVT); unsynchronized for VF and pulseless VT"],
          ["Stored energy", "E = one half x C x V squared; delivered energy is lower than stored"],
          ["Testing", "Defibrillator analyzer with a 50 ohm load; check delivered energy, charge time, synchronization, pacing output"],
          ["AED", "Analyzes rhythm, advises shock only for VF and pulseless VT"],
          ["External pacing", "Demand mode paces only when intrinsic rate falls below the set rate; fixed mode paces regardless; capture confirmed by QRS after each spike"]
        ] },
        { type: "table", cols: ["Ventilator fact", "Value"], rows: [
          ["Tidal volume", "6 to 8 mL/kg ideal body weight; minute volume = tidal volume x rate"],
          ["Typical settings", "Rate 12 to 20; I:E ratio 1:2; PEEP 5 cm H2O; FiO2 0.21 to 1.0"],
          ["Modes", "Volume control delivers a set volume; pressure control delivers a set pressure; assist-control, SIMV, pressure support, CPAP"],
          ["Alarms", "High pressure: obstruction, kink, coughing, secretions. Low pressure or low volume: disconnect or leak. Apnea: no breath detected"],
          ["Oxygen analyzer calibration", "Room air 21% and 100% oxygen; galvanic cells wear out"],
          ["Concentrator", "Delivers about 90 to 95% oxygen using molecular sieve; CPAP splints the airway open; BiPAP has separate inspiratory and expiratory pressures"],
          ["Testing", "Gas flow analyzer or ventilator tester for volume, pressure, flow, and oxygen; test lung"]
        ] },
        { type: "table", cols: ["Infusion fact", "Value"], rows: [
          ["Accuracy", "Large-volume pumps typically within 5%; verify with an infusion analyzer"],
          ["Rate math", "mL per hour = total mL / hours; drops per minute = (mL/hr x drop factor) / 60"],
          ["Dose math", "mL/hr = (dose in mg/kg/hr x weight in kg) / concentration in mg/mL"],
          ["Safety features", "Free-flow protection when the set is removed, occlusion alarm (upstream and downstream), air-in-line ultrasonic detector, drug library dose limits, keep-vein-open rate"],
          ["Types", "Peristaltic large-volume pump, syringe pump for small precise volumes, PCA with patient button and lockout, enteral pump for feeding (incompatible connectors on purpose)"]
        ] },
        { type: "table", cols: ["Electrosurgery fact", "Value"], rows: [
          ["Frequency", "About 300 kHz to 3 MHz, above the frequency that stimulates nerves and muscle"],
          ["Modes", "Cut: continuous sine wave, vaporizes. Coag: interrupted or damped bursts, dries and seals. Blend mixes them"],
          ["Monopolar", "Current flows from the active electrode through the patient to a large return (dispersive) electrode; return electrode contact quality monitoring prevents burns"],
          ["Bipolar", "Current flows between the two tips of the forceps; no return pad needed"],
          ["Burns", "Poor return pad contact, pad on bony or hairy site, alternate paths through ECG electrodes or metal; capacitive coupling in laparoscopy"],
          ["Testing", "ESU analyzer measures output power into a load, leakage, and return electrode monitoring"]
        ] },
        { type: "list", title: "Dialysis, anesthesia, neonatal", cols: 2, items: [
          "Hemodialysis: blood pump, dialyzer (semipermeable membrane), dialysate mixed from concentrate and treated water; conductivity about 13 to 14 mS/cm; temperature about 35 to 38 C; blood leak detector, air detector with venous clamp, arterial and venous pressure monitors",
          "Dialysis water: reverse osmosis, carbon filters (chlorine and chloramine), softener; water quality per AAMI standards",
          "Anesthesia machine: pipeline and cylinder gas supply, flowmeters, agent-specific vaporizers (sevoflurane yellow, isoflurane purple, desflurane blue), hypoxic guard keeps oxygen at least 21 to 25%, oxygen flush, CO2 absorber, scavenging removes waste gas, pin index and DISS prevent misconnection",
          "Infant incubator: air and skin temperature servo control, humidity, oxygen; warmer: radiant heat with skin probe; phototherapy: blue light about 425 to 475 nm for jaundice; alarms for over-temperature"
        ] }
      ]
    },
    {
      id: "imaging", title: "Imaging, laboratory, and general equipment",
      blocks: [
        { type: "table", cols: ["Imaging fact", "Value"], rows: [
          ["X-ray tube", "Cathode filament emits electrons; anode target (tungsten) stops them; about 99% becomes heat; rotating anode spreads heat"],
          ["kVp", "Penetrating power and contrast; higher kVp, more penetration, less contrast"],
          ["mA and time", "mAs = mA x seconds sets quantity of X-rays and image density"],
          ["Inverse square", "Intensity falls with the square of distance; double the distance, one quarter the intensity"],
          ["Half-value layer", "Thickness of material that halves the beam intensity"],
          ["Collimation, grid, AEC", "Collimator limits the beam; grid removes scatter; automatic exposure control ends the exposure at the right dose"],
          ["CT", "Rotating tube and detectors; Hounsfield units: water 0, air minus 1000, bone up to plus 1000"],
          ["Ultrasound", "Piezoelectric transducer sends and receives; 2 to 15 MHz; higher frequency, better resolution, less penetration; Doppler measures flow; gel removes air"],
          ["MRI", "Superconducting magnet 1.5 or 3 tesla cooled by liquid helium; gradients and RF pulses; quench releases helium; RF shielding; no ferromagnetic items"],
          ["Nuclear medicine", "Gamma camera detects radiopharmaceutical emissions; PET detects 511 keV photon pairs"]
        ] },
        { type: "list", title: "Laboratory and general equipment", cols: 2, items: [
          "Centrifuge: speed in RPM, force in RCF (g); balance loads opposite each other; lid interlock; check speed with a tachometer",
          "Spectrophotometer: absorbance follows Beer-Lambert (absorbance proportional to concentration and path length); calibrate with blanks and standards",
          "Chemistry and hematology analyzers: reagents, calibration, quality control samples, temperature control, fluidics and clogs",
          "Sterilizer: steam 121 C at 15 psi or 132 C flash; check temperature, pressure, time, chamber and gasket; biological indicator confirms",
          "Beds: motors, controls, side rails, brakes, scale calibration; lifts: sling inspection, load rating, battery; suction regulators: vacuum in mmHg, check filter and collection canister",
          "Sequential compression devices: pressure and cycle timing; endoscopes: light source, camera, insufflation, leak test before reprocessing"
        ] }
      ]
    },
    {
      id: "troubleshooting", title: "Problem solving and troubleshooting",
      blocks: [
        { type: "list", title: "The method, in order", items: [
          "1. Confirm the complaint: talk to the user, reproduce the problem, check for use error and the right accessories.",
          "2. Check the simple things: power, plug, battery, fuse, cables, connectors, settings, sensors, disposables.",
          "3. Isolate: which subsystem (power, sensor, signal path, processor, display, mechanical); half-split the signal path with a simulator and test equipment.",
          "4. Form and test one hypothesis at a time; swap known-good parts.",
          "5. Repair or replace; follow the service manual.",
          "6. Verify: full performance test and electrical safety test after any repair, before return to service.",
          "7. Document: symptom, cause, action, parts, test results, time, in the CMMS."
        ] },
        { type: "table", cols: ["Symptom", "First suspects"], rows: [
          ["Device dead, no power", "Outlet, cord, plug, fuse, power switch, battery, power supply output"],
          ["Runs on AC but not battery", "Battery aged or not charging; charger circuit; battery connector"],
          ["ECG shows 60 Hz noise", "Electrode contact, gel, skin prep, lead cable shield, nearby equipment, ground"],
          ["Wandering baseline", "Patient movement or respiration, loose electrode, high-pass filter setting"],
          ["Intermittent signal", "Cable flex failure near connectors, loose connector, cracked solder"],
          ["NIBP reads high", "Cuff too small, cuff too low, patient movement, hose leak causing slow deflation"],
          ["Arterial line reads low and rounded", "Overdamped: air bubble, clot, kinked tubing, loose connection"],
          ["SpO2 no reading", "Probe placement, perfusion, ambient light, probe LED failure, cable"],
          ["Ventilator high-pressure alarm", "Kinked circuit, secretions, patient coughing, water in tubing"],
          ["Ventilator low-pressure or volume alarm", "Disconnect, leak, cuff leak, circuit crack"],
          ["Infusion pump occlusion alarm", "Kinked tubing, closed clamp, clotted line, set loaded wrong"],
          ["Infusion pump air-in-line alarm", "Air in set, sensor dirty, set not seated"],
          ["Defibrillator low delivered energy", "Capacitor aging, relay, paddles or pads, battery"],
          ["ESU patient burn", "Return electrode contact, alternate path, damaged cable"],
          ["Telemetry dropouts", "Antenna coverage, low battery, interference, transmitter distance"],
          ["Image artifacts on X-ray", "Grid cutoff, detector calibration, motion, wrong technique"]
        ] },
        { type: "list", title: "Power and batteries", cols: 2, items: [
          "Cell voltages: lead-acid 2.0 V, nickel-cadmium 1.2 V, nickel-metal hydride 1.2 V, lithium-ion 3.6 to 3.7 V; alkaline 1.5 V",
          "Nickel-cadmium shows memory effect (condition with full cycles); lithium-ion does not, but must not be over-discharged; sealed lead-acid sulfates if left discharged",
          "Capacity in amp-hours; runtime falls as batteries age; replace on schedule or when runtime test fails",
          "Ripple on a supply output means a failing filter capacitor; check outputs under load; switching supplies need a load to regulate",
          "ESD: wrist strap and mat when handling boards; store boards in antistatic bags"
        ] },
        { type: "list", title: "Maintenance and management", cols: 2, items: [
          "Preventive maintenance: scheduled or risk-based; alternative equipment maintenance (AEM) programs allowed under CMS and Joint Commission rules for non-critical devices with documented justification",
          "Priority order: life support and high-risk devices first, then patient risk, then downtime and clinical impact",
          "Test equipment: electrical safety analyzer, patient simulator, SpO2 simulator, NIBP simulator, defibrillator analyzer, ESU analyzer, gas flow analyzer, infusion analyzer, oxygen analyzer, pressure meter, tachometer",
          "Calibration traceable to national standards; test equipment has its own calibration schedule",
          "CMMS holds inventory, asset tags, work orders, PM schedules, history, parts, and reports (MTBF, completion rate)",
          "Incoming inspection before first use: physical, functional, safety test, inventory entry, user manual and service manual on file",
          "Lifecycle: acquisition, incoming inspection, use, maintenance, end of support, disposition (data wiped, decontaminated, recycled per policy)"
        ] }
      ]
    },
    {
      id: "hit", title: "Healthcare information technology",
      blocks: [
        { type: "table", cols: ["Networking fact", "Value"], rows: [
          ["IPv4 address", "Four numbers 0 to 255; subnet mask separates network and host; default gateway is the exit router"],
          ["Private ranges", "10.0.0.0/8; 172.16.0.0 to 172.31.255.255; 192.168.0.0/16"],
          ["DHCP", "Assigns addresses automatically; medical devices often use static addresses or DHCP reservations"],
          ["DNS", "Names to addresses; a device that can ping an address but not a name has a DNS problem"],
          ["APIPA", "169.254.x.x means DHCP failed"],
          ["Ports", "HTTP 80, HTTPS 443, SSH 22, DICOM commonly 104 or 11112, HL7 commonly 2575 (site specific)"],
          ["Devices", "Switch connects devices in a LAN by MAC address; router connects networks by IP; access point connects Wi-Fi clients; VLAN separates devices logically on one switch"],
          ["Cabling", "Cat 5e 1 Gbps, Cat 6A 10 Gbps, 100 m limit; fiber for longer runs; link light off means Layer 1"],
          ["Wi-Fi", "2.4 GHz longer range, channels 1, 6, 11; 5 GHz more channels, less interference; WPA2 or WPA3; enterprise mode uses 802.1X with RADIUS"],
          ["Telemetry and RTLS", "WMTS bands for patient telemetry; real-time location systems track equipment with RF, infrared, or ultrasound tags"]
        ] },
        { type: "table", cols: ["Interoperability", "Meaning"], rows: [
          ["HL7 version 2", "Text messages between systems: ADT (admit, discharge, transfer), ORM (orders), ORU (results, including device data)"],
          ["HL7 FHIR", "Modern web-based standard using resources and APIs"],
          ["DICOM", "Standard for medical images and their transfer; modality worklist pulls patient data to the scanner; PACS stores and serves images"],
          ["EHR and EMR", "Electronic health record (across organizations) and electronic medical record (within one); device integration feeds vitals into them"],
          ["Middleware", "Translates and routes between devices and the EHR; device gateways"],
          ["Time synchronization", "NTP keeps device clocks aligned so records and alarms line up"],
          ["IHE", "Profiles that specify how standards are used together so products interoperate"]
        ] },
        { type: "list", title: "Cybersecurity and privacy", cols: 2, items: [
          "HIPAA: privacy rule (who may see PHI), security rule (administrative, physical, technical safeguards), breach notification; PHI is any identifiable health information; minimum necessary",
          "NIST Cybersecurity Framework functions: govern, identify, protect, detect, respond, recover",
          "HITRUST: a certifiable framework combining many requirements; HHS cybersecurity performance goals: essential and enhanced practices for hospitals",
          "MDS2: manufacturer disclosure statement for medical device security, filled in by the vendor; SBOM: software bill of materials listing components",
          "Controls: unique accounts and MFA, least privilege, encryption at rest and in transit, patching on the vendor's validated schedule, network segmentation for devices that cannot be patched, antivirus where the vendor allows, physical security of workstations",
          "Backups: 3 copies, 2 media, 1 offsite; test restores; ransomware response is isolate, report, restore",
          "Incident handling: disconnect the device from the network, do not power off if forensics are needed, report to security and the vendor, document"
        ] },
        { type: "list", title: "Computer troubleshooting", cols: 2, items: [
          "ping tests reachability; ipconfig shows address, mask, gateway; tracert shows the path; check link lights and cables before software",
          "Slow or failing PC: disk space, memory, malware, failing drive, overheating; drivers after updates; restore from image",
          "Operating system basics: user accounts and permissions, services, event logs, updates; medical device software changes only with vendor approval"
        ] }
      ]
    },
    {
      id: "conversions", title: "Conversions and formulas to memorize",
      blocks: [
        { type: "table", cols: ["Conversion", "Value"], rows: [
          ["Weight", "1 kg = 2.2 lb; 1 lb = 0.454 kg"],
          ["Temperature", "F = C x 1.8 + 32; C = (F minus 32) / 1.8; 37 C = 98.6 F; 0 C = 32 F; 100 C = 212 F"],
          ["Pressure", "1 mmHg = 1.36 cm H2O; 1 kPa = 7.5 mmHg; 1 atm = 760 mmHg = 14.7 psi = 101.3 kPa; 1 psi = 51.7 mmHg"],
          ["Volume", "1 L = 1000 mL; 1 mL = 1 cc; 1 oz = 29.6 mL"],
          ["Length", "1 inch = 2.54 cm; 1 m = 39.4 inches"],
          ["Metric prefixes", "kilo 10 to the 3, milli 10 to the minus 3, micro 10 to the minus 6, nano 10 to the minus 9, pico 10 to the minus 12"],
          ["Energy", "1 joule = 1 watt-second; defibrillator energy in joules"],
          ["Flow", "mL/hr = mL / hr; L/min for gas; minute volume = tidal volume x rate"]
        ] }
      ]
    }
  ]
};
