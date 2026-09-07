// CBET Academy memorization sheet for the AAMI/ACI CBET exam. Numbers, normal ranges, limits, formulas,
// device facts, standards, and orders of steps that must be recalled cold. Original content. Safety limits name their standard.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CBET Memorization Sheet",
  intro: "Print this and keep it beside you. The CBET exam rewards recall of normal values, safety limits, device settings, units, standards, and formulas across every kind of equipment in a hospital. Every number on this sheet is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Certifying body", "AAMI Credentials Institute (ACI)"],
          ["Questions", "165 multiple choice; 150 scored, 15 unscored pretest items mixed in"],
          ["Time and rules", "3 hours, closed book, simple calculator allowed, no phones"],
          ["Passing", "Criterion-referenced cut score (modified Angoff), about 116 of 165 correct, roughly 70%"],
          ["Healthcare Technology and Function", "30%"],
          ["Healthcare Technology Problem Solving", "30%"],
          ["Healthcare Information Technology", "17%"],
          ["Public Safety in the Healthcare Facility", "10%"],
          ["Anatomy and Physiology", "7%"],
          ["Fundamentals of Electricity and Electronics", "6%"]
        ] },
        { type: "note", text: "Function and problem solving are 60% of the exam. For every device: what it measures or delivers, its settings and normal values, its alarms, its common faults, and the first check." }
      ]
    },
    {
      id: "anatomy", title: "Anatomy and physiology",
      blocks: [
        { type: "table", cols: ["Vital sign (adult, resting)", "Normal range", "Measured by"], rows: [
          ["Heart rate", "60 to 100 bpm (below 60 bradycardia, above 100 tachycardia)", "ECG, pulse oximeter, NIBP"],
          ["Respiratory rate", "12 to 20 breaths per minute", "Impedance pneumography, capnography"],
          ["Blood pressure", "About 120/80 mmHg; MAP = diastolic + (systolic minus diastolic) / 3, about 70 to 100", "NIBP, arterial line"],
          ["Oxygen saturation (SpO2)", "95 to 100%", "Pulse oximeter"],
          ["End-tidal CO2 (EtCO2)", "35 to 45 mmHg", "Capnograph"],
          ["Body temperature", "37 C (98.6 F); fever above about 38 C", "Thermistor, thermocouple, infrared"],
          ["Fetal heart rate", "110 to 160 bpm", "Doppler ultrasound"],
          ["Tidal volume", "About 500 mL at rest (6 to 8 mL/kg ideal body weight on a ventilator)", "Ventilator, spirometer"],
          ["Cardiac output", "About 5 L/min = heart rate x stroke volume (about 70 mL)", "Derived"]
        ] },
        { type: "table", cols: ["System", "Key parts", "What the technician's devices do with it"], rows: [
          ["Circulatory", "Heart (right atrium, right ventricle, left atrium, left ventricle), tricuspid, pulmonary, mitral, aortic valves, arteries, veins, capillaries", "ECG records electrical activity; NIBP and arterial lines measure pressure; defibrillators and pacemakers control rhythm; balloon pumps assist"],
          ["Blood flow", "Body, vena cava, RA, tricuspid, RV, pulmonary valve, pulmonary artery, lungs, pulmonary veins, LA, mitral, LV, aortic valve, aorta, body", "Right side pumps to lungs, left side to body"],
          ["Conduction path", "SA node, AV node, bundle of His, bundle branches, Purkinje fibers", "P wave atrial depolarization, QRS ventricular depolarization, T wave ventricular repolarization"],
          ["Respiratory", "Trachea, bronchi, bronchioles, alveoli, diaphragm", "Ventilators move gas; oximeters measure oxygen carried; capnographs measure CO2 exhaled; spirometers measure volumes"],
          ["Nervous", "Brain (cerebrum, cerebellum, brainstem), spinal cord, peripheral and autonomic nerves", "EEG records brain activity; EMG records muscle; stimulators test conduction; sympathetic raises heart rate, parasympathetic lowers it"],
          ["Musculoskeletal", "206 bones, joints, skeletal (voluntary), smooth (involuntary), and cardiac muscle", "Physical therapy stimulators, traction, continuous passive motion"],
          ["Gastrointestinal", "Esophagus, stomach, small intestine (absorption), large intestine, liver, pancreas, gallbladder", "Feeding pumps deliver enteral nutrition; suction removes; endoscopes view"],
          ["Endocrine", "Pancreas (insulin, glucagon), thyroid, adrenals (epinephrine), pituitary", "Glucose meters, insulin pumps"],
          ["Renal", "Kidneys (nephrons filter blood), ureters, bladder", "Dialysis replaces filtration"],
          ["Skin", "Epidermis, dermis, subcutaneous layer; barrier, temperature control, sensation", "Electrode contact and skin impedance, burns, pressure injuries"],
          ["Blood", "Plasma, red cells (hemoglobin carries oxygen), white cells (immunity), platelets (clotting)", "Analyzers count and measure; oximetry depends on hemoglobin"]
        ] },
        { type: "list", title: "Directional terms and word parts", cols: 2, items: [
          "Anterior front, posterior back; superior above, inferior below; medial toward the midline, lateral away; proximal near the trunk, distal far; supine face up, prone face down; planes: sagittal (left and right), coronal (front and back), transverse (top and bottom)",
          "Systole contraction, diastole relaxation. Hypertension high pressure, hypotension low. Hypoxia low oxygen, hypercapnia high CO2, apnea no breathing",
          "Prefixes: brady- slow, tachy- fast, hyper- high, hypo- low, a-/an- without, dys- difficult, peri- around, endo- inside",
          "Roots: cardio heart, pulmo/pneumo lung, nephro/reno kidney, hepat liver, neuro nerve, gastro stomach, derm skin, osteo bone, hemo/hemat blood, myo muscle, encephal brain",
          "Suffixes: -itis inflammation, -ectomy removal, -ostomy opening, -oscopy viewing, -graphy recording, -gram the record, -algia pain, -emia blood condition"
        ] },
        { type: "list", title: "ECG timing (normal adult)", cols: 2, items: [
          "PR interval 0.12 to 0.20 s; QRS under 0.12 s; QT under about 0.44 s",
          "Paper speed 25 mm/s; 1 mV = 10 mm; small box 0.04 s (1 mm), large box 0.20 s (5 mm)",
          "Heart rate = 1500 / small boxes between R waves, or 300 / large boxes",
          "Ventricular fibrillation: chaotic, no QRS, shockable. Asystole: flat line, not shockable. Atrial fibrillation: irregular, no P waves, cardiovert synchronized"
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
          ["Stored energy", "E = one half x C x V squared (joules); how a defibrillator capacitor stores its charge"]
        ] },
        { type: "list", cols: 2, items: [
          "Resistor color code digits: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, white 9; tolerance gold 5%, silver 10%",
          "US cord colors: black (or red) hot, white neutral, green or bare ground. IEC cords: brown live, blue neutral, green-yellow ground",
          "Schematic symbols: zigzag resistor, parallel lines capacitor, coil inductor, triangle-with-bar diode, ground, fuse, switch, battery; signals flow left to right; compare measured voltages to the values printed at test points",
          "Passive devices (resistors, capacitors, inductors, transformers) cannot add energy; active devices (diodes, transistors, ICs, op-amps) control or amplify",
          "Diode conducts one way, forward drop about 0.7 V silicon; zener regulates; LED lights; rectifiers: half-wave, full-wave, bridge; capacitor filters ripple; regulator holds output steady",
          "Linear power supply: heavy transformer, low noise, inefficient. Switching supply: light, efficient, more noise, needs a load",
          "Transistor: NPN or PNP, base controls collector-emitter; used as a switch or amplifier. SCR and triac switch AC power",
          "Op-amp rules: huge gain, inputs draw no current, feedback makes the inputs equal; instrumentation amplifier rejects common-mode noise (high CMRR) for ECG front ends; isolation amplifiers and optocouplers keep patient circuits floating",
          "Filters: low-pass keeps slow signals, high-pass removes baseline drift, band-pass keeps a range, notch removes 60 Hz",
          "DMM measures volts, amps (in series), ohms (power off); oscilloscope shows voltage against time, 10x probe divides by ten; function generator provides test signals"
        ] },
        { type: "table", cols: ["Power storage and conditioning", "Facts"], rows: [
          ["Cell voltages", "Lead-acid 2.0 V, nickel-cadmium 1.2 V, nickel-metal hydride 1.2 V, lithium-ion 3.6 to 3.7 V, alkaline 1.5 V"],
          ["Battery behavior", "NiCd memory effect (condition with full cycles); Li-ion no memory but thermal runaway risk and must not over-discharge; sealed lead-acid sulfates if left discharged; capacity in amp-hours falls with age"],
          ["UPS types", "Standby (switches on loss), line-interactive (regulates voltage), online double-conversion (always on inverter, best protection)"],
          ["Power problems", "Sag or brownout (low voltage), surge (high), transient spike, noise, blackout; conditioners regulate and filter"],
          ["Hospital essential electrical system (NFPA 99 and NFPA 70)", "Generator restores power within 10 seconds; branches: life safety, critical (patient care, red outlets), equipment; UPS bridges the gap for critical devices"],
          ["Isolated power and LIM", "Ungrounded secondary of an isolation transformer; line isolation monitor alarms at 5 mA total hazard current; used in wet procedure locations"],
          ["GFCI", "Trips at 4 to 6 mA of imbalance between hot and neutral in about 25 ms; wet locations"]
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
          ["Chassis (touch) leakage, cord-connected patient-care equipment", "500 microamps in current editions (older editions used 300 or 100 microamps; know the limit your facility cites)"],
          ["Patient care vicinity", "About 6 feet (1.8 m) beyond the bed or chair and 7.5 feet (2.3 m) above the floor"],
          ["Line isolation monitor alarm", "5 mA total hazard current"],
          ["GFCI trip", "4 to 6 mA (nominal 5 mA)"],
          ["Hospital-grade receptacle", "Green dot; test retention force, polarity, ground continuity"],
          ["Relocatable power taps", "Only where allowed, rated, and secured; never daisy-chained; no extension cords for patient care equipment"]
        ] },
        { type: "list", title: "Classes, types, symbols, and testing", cols: 2, items: [
          "Class I: protective earth (three-prong ground). Class II: double insulation, no ground (square-in-square symbol). Internally powered: battery only",
          "Applied part type B: body, not for direct cardiac use (stick figure). BF: body floating, isolated (figure in a box). CF: cardiac floating, safe for direct heart connection (heart in a box)",
          "Defibrillation-proof applied part: the symbol with paddles; withstands a defibrillator discharge",
          "Macroshock: current through the skin; needs milliamps. Microshock: current bypassing the skin to the heart; microamps",
          "Safety analyzer sequence: visual inspection and cord check, ground resistance, chassis leakage (normal, reversed polarity, open ground, open neutral), patient lead leakage, lead-to-lead, mains on applied part",
          "Leakage rises with open ground and reversed polarity; a rising leakage trend on PM predicts insulation failure; test at incoming inspection, after repair, and per PM schedule"
        ] }
      ]
    },
    {
      id: "facility", title: "Infection control, hazards, fire, gas, radiation, MRI, and standards",
      blocks: [
        { type: "list", title: "Infection control", cols: 2, items: [
          "Standard (universal) precautions: treat all blood and body fluids as infectious; hand hygiene before and after every patient contact and before touching equipment",
          "Transmission-based precautions: contact (gown, gloves), droplet (surgical mask), airborne (N95 respirator, negative-pressure room)",
          "PPE donning: gown, mask, eye protection, gloves. Doffing: gloves, eye protection, gown, mask (clean hands between)",
          "Cleaning removes soil; disinfection kills most microbes; sterilization kills all including spores",
          "Spaulding: critical items (enter sterile tissue) sterilize; semi-critical (touch mucous membranes) high-level disinfect; non-critical (intact skin) low-level disinfect",
          "Steam autoclave: 121 C (250 F) at 15 psi for 15 to 30 minutes, or 132 to 135 C flash cycles; biological indicators verify; ethylene oxide and hydrogen peroxide plasma for heat-sensitive items",
          "Clean and disinfect equipment before servicing it; sharps in puncture-resistant containers; OSHA bloodborne pathogens standard covers exposure control; report needlesticks immediately"
        ] },
        { type: "list", title: "Hazard communication and signage", cols: 2, items: [
          "Safety data sheet (SDS): 16 sections including identification, hazards, first aid, fire fighting, handling and storage, exposure controls and PPE; must be accessible to staff",
          "GHS pictograms: flame (flammable), flame over circle (oxidizer), skull (acute toxicity), corrosion, exclamation mark (irritant), health hazard (silhouette), gas cylinder, environment",
          "NFPA 704 diamond: blue health, red flammability, yellow reactivity, white special (W with a line means water reactive, OX oxidizer); scale 0 to 4",
          "Laser signs state the class and wavelength; classes 1 (safe) through 4 (fire and eye hazard); wavelength-specific eyewear",
          "Ionizing radiation: trefoil symbol; time, distance, shielding; ALARA; inverse square law; lead aprons about 0.5 mm; dosimeters",
          "MRI: zones I (public) through IV (magnet room); the magnet is always on; ferromagnetic objects become projectiles; quench vents helium; MR Safe, MR Conditional, MR Unsafe labels",
          "Patient precaution signs at the door: contact, droplet, airborne, fall risk, latex allergy, no blood pressure on a limb"
        ] },
        { type: "list", title: "Fire and medical gas", cols: 2, items: [
          "Fire triangle: heat, fuel, oxygen. RACE: rescue, alarm, confine, extinguish. PASS: pull, aim, squeeze, sweep",
          "Extinguisher classes: A ordinary combustibles, B flammable liquids, C electrical, D metals, K cooking oils",
          "Oxygen-enriched atmospheres burn faster; no oil or grease on oxygen fittings; cylinders secured upright, capped, stored below 125 F, full separated from empty",
          "US medical gas cylinder colors: oxygen green, nitrous oxide blue, carbon dioxide gray, nitrogen black, medical air yellow, helium brown; pin index and DISS fittings prevent wrong connections",
          "Full E cylinder of oxygen: about 2,000 to 2,200 psi, about 660 liters; wall outlets about 50 psi; zone valves shut off gas to an area"
        ] },
        { type: "table", cols: ["Standards, regulators, and accreditation", "What to know"], rows: [
          ["CMS", "Centers for Medicare and Medicaid Services; sets Conditions of Participation hospitals must meet to be paid; can survey directly"],
          ["Deemed status", "Accrediting organizations survey on CMS's behalf: The Joint Commission, DNV Healthcare, ACHC (formerly HFAP), CIHQ"],
          ["The Joint Commission", "Environment of Care and Emergency Management standards cover equipment inventory, maintenance strategies, testing, and documentation"],
          ["FDA", "Regulates devices; medical device reporting: user facilities report a device-related death to FDA and the manufacturer within 10 work days, a serious injury to the manufacturer within 10 work days; recalls Class I (serious harm), II (temporary harm), III (unlikely harm)"],
          ["OSHA", "Worker safety: hazard communication, bloodborne pathogens, PPE, electrical safety in the workplace"],
          ["ANSI/AAMI EQ56", "Recommended practice for a medical equipment management program"],
          ["ANSI/AAMI EQ89", "Guidance for scheduled maintenance and performance verification"],
          ["ANSI/AAMI EQ93", "Medical equipment management vocabulary and terminology"],
          ["ANSI/AAMI EQ103", "Alternative equipment maintenance (AEM) programs: how to justify and document maintenance strategies that differ from the manufacturer's"],
          ["AEM rules (CMS)", "Allowed with documented risk assessment by qualified staff; not for imaging or radiologic equipment, lasers, or where the manufacturer or law requires otherwise; new equipment follows the manufacturer until history supports a change"],
          ["CMMS", "Computerized maintenance management system: inventory and asset tags, work orders, PM schedules, equipment history, parts, reports (PM completion rate, mean time between failures, cost); every activity documented there"],
          ["After an incident", "Remove the device with all accessories and disposables attached, do not clear logs or settings, tag and sequester, document, report; root cause analysis asks why repeatedly"]
        ] }
      ]
    },
    {
      id: "monitoring", title: "Physiological monitoring",
      blocks: [
        { type: "table", cols: ["ECG fact", "Value"], rows: [
          ["Einthoven's triangle", "Lead I = LA minus RA; Lead II = LL minus RA; Lead III = LL minus LA; Einthoven's law: Lead II = Lead I + Lead III"],
          ["Augmented and chest leads", "aVR, aVL, aVF from the limb electrodes; V1 to V6 across the chest; 12 leads from 10 electrodes"],
          ["Electrode colors (US, AHA)", "RA white, LA black, RL green (ground), LL red, V brown (\"white on right, smoke over fire\")"],
          ["Bandwidth", "Monitoring mode 0.5 to 40 Hz; diagnostic mode 0.05 to 150 Hz"],
          ["Interference", "60 Hz: bad electrode contact, unshielded leads, nearby equipment; wandering baseline: respiration or motion; spikes: muscle tremor or loose lead"],
          ["Lead-off", "High impedance detected on an electrode; check gel, skin prep, cable"],
          ["Simulator test", "Patient simulator provides rate, amplitude, and arrhythmias to verify the monitor"]
        ] },
        { type: "table", cols: ["Blood pressure fact", "Value"], rows: [
          ["Korotkoff sounds", "Auscultatory method: cuff above systolic, deflate; first sound (phase 1) is systolic, sounds muffle then disappear (phase 5) at diastolic; automated devices use oscillometry instead"],
          ["NIBP method", "Oscillometric: cuff inflates above systolic, deflates in steps, MAP is the point of maximum oscillation, systolic and diastolic derived"],
          ["Cuff sizing", "Bladder width about 40% of arm circumference, length about 80%; too small reads high, too large reads low"],
          ["Invasive line", "Transducer zeroed to atmosphere and leveled at the phlebostatic axis (fourth intercostal space, midaxillary line)"],
          ["Dicrotic notch", "The small dip on the downslope of the arterial waveform marking aortic valve closure; its absence suggests overdamping"],
          ["Height error", "13.6 cm of water equals 10 mmHg; every 13.6 cm the transducer is off level changes the reading about 10 mmHg"],
          ["Damping", "Fast-flush (square wave) test: overdamped rounds the wave and reads low systolic; underdamped overshoots and reads high"],
          ["Transducer sensitivity", "5 microvolts per volt per mmHg (industry standard)"]
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
          "Alarm priorities (IEC 60601-1-8): high red flashing, medium yellow flashing, low cyan or yellow steady; alarm fatigue is a patient safety problem; alarm management programs set limits per unit",
          "Telemetry: WMTS bands 608 to 614 MHz, 1395 to 1400 MHz, 1427 to 1432 MHz; dropouts from antenna coverage, low battery, interference; central station shows all beds",
          "Fetal monitor: ultrasound Doppler for fetal heart rate (110 to 160 bpm), tocodynamometer (TOCO) for contractions by pressure on the abdomen; internal scalp electrode and intrauterine pressure catheter are the direct methods",
          "EEG bands: delta under 4 Hz, theta 4 to 8, alpha 8 to 13, beta above 13; electrodes placed by the 10-20 system; EMG measures muscle electrical activity; evoked potentials time the response to a stimulus"
        ] }
      ]
    },
    {
      id: "units", title: "Test equipment and units of measure",
      blocks: [
        { type: "table", cols: ["Test equipment", "Verifies"], rows: [
          ["Electrical safety analyzer", "Ground resistance, chassis and patient lead leakage under normal and fault conditions"],
          ["Patient (physiological) simulator", "ECG rate, amplitude, arrhythmias, respiration, invasive pressure, temperature"],
          ["SpO2 simulator", "Saturation and pulse readings through the probe"],
          ["NIBP simulator", "Cuff pressures and oscillometric readings; leak test"],
          ["Defibrillator analyzer", "Delivered energy into 50 ohms, charge time, synchronization, pacing output"],
          ["ESU analyzer", "Output power into a load, leakage, return electrode monitoring"],
          ["Gas flow and ventilator analyzer", "Volume, flow, pressure, oxygen concentration"],
          ["Infusion pump analyzer", "Flow rate accuracy, occlusion pressure"],
          ["DVM or DMM and meters", "Voltage, current, resistance; oxygen analyzer, pressure meter, tachometer, light meter, sound level meter"],
          ["Cable tracer or toner", "Finds the far end of a network cable"]
        ] },
        { type: "table", cols: ["Unit", "Conversion or meaning"], rows: [
          ["mmHg", "Blood and gas pressure; 760 mmHg = 1 atmosphere; 1 mmHg = 1.36 cm H2O"],
          ["cm H2O", "Ventilator and airway pressures; 1 cm H2O = 0.74 mmHg"],
          ["psi", "Gas cylinders and pipelines; 14.7 psi = 1 atmosphere; 1 psi = 51.7 mmHg; 1 psi = 6.9 kPa"],
          ["bar", "1 bar = 100 kPa = 14.5 psi = 750 mmHg, about 1 atmosphere"],
          ["kPa", "1 kPa = 7.5 mmHg; 101.3 kPa = 1 atmosphere"],
          ["Fahrenheit and Celsius", "F = C x 1.8 + 32; C = (F minus 32) / 1.8; 37 C = 98.6 F; 0 C = 32 F; 100 C = 212 F"],
          ["Joules", "Energy: 1 J = 1 watt-second; defibrillator output"],
          ["Lumens and lux", "Lumens: total light output of a lamp; lux: lumens per square meter at the surface (surgical lights are rated in lux at 1 m)"],
          ["Decibels", "Sound level and audiometer hearing threshold (dB HL); 10 dB is a tenfold power ratio"],
          ["Weight and length", "1 kg = 2.2 lb; 1 inch = 2.54 cm; 1 L = 1000 mL; 1 mL = 1 cc"],
          ["Prefixes", "kilo 10 to the 3, milli 10 to the minus 3, micro 10 to the minus 6, nano 10 to the minus 9"]
        ] }
      ]
    },
    {
      id: "devices", title: "Diagnostic, infusion, therapeutic, and laboratory equipment",
      blocks: [
        { type: "table", cols: ["Diagnostic device", "Facts"], rows: [
          ["Otoscope, ophthalmoscope", "Battery or wall-powered light and optics for ear and eye; check lamp, battery, charging contacts, specula"],
          ["Audiometer", "Hearing thresholds in dB HL at 250 to 8000 Hz; calibrate with a sound level meter and coupler; quiet room or booth"],
          ["Spirometer", "FVC, FEV1, FEV1/FVC ratio (normal about 0.7 to 0.8); calibrate with a 3 L syringe; filters and mouthpieces"],
          ["Stress test system", "Treadmill or bike with 12-lead ECG and NIBP; emergency stop; treadmill speed and grade calibration; defibrillator nearby"],
          ["Scales", "Calibrate with certified test weights; zero with the bed or chair empty; load cells"],
          ["Ultrasound", "Piezoelectric transducer sends and receives; 2 to 15 MHz; higher frequency, better resolution, less penetration; Doppler measures flow; gel removes air; transducer crystals crack if dropped"]
        ] },
        { type: "table", cols: ["Infusion device", "Facts"], rows: [
          ["Large-volume pump", "Peristaltic; accuracy typically within 5%; rate in mL/hr; free-flow protection; occlusion and air-in-line alarms; drug library"],
          ["Syringe pump", "Precise small volumes; syringe size must be recognized; start-up delay and siphoning risks"],
          ["PCA pump", "Patient button, bolus dose, lockout interval, hourly limit; locked to prevent tampering"],
          ["Feeding (enteral) pump", "Enteral-only connectors on purpose; lower accuracy acceptable"],
          ["Contrast injector", "Programmed volume and flow for imaging; pressure limit; air detection; heated syringe"],
          ["Rate math", "mL/hr = total mL / hours; drops per minute = (mL/hr x drop factor) / 60; mL/hr = (mg/kg/hr x kg) / (mg/mL)"]
        ] },
        { type: "table", cols: ["Therapeutic device", "Facts"], rows: [
          ["Infant incubator and warmer", "Air and skin temperature servo control, humidity, oxygen; radiant warmer with skin probe; over-temperature alarms; phototherapy blue light about 425 to 475 nm"],
          ["Patient temperature management", "Hypo- and hyperthermia units circulate water through blankets or pads; water temperature limits about 4 to 42 C; check flow, leaks, temperature sensor"],
          ["Aspiration (suction)", "Regulators in mmHg, continuous or intermittent; adult range about 80 to 120 mmHg; check filter, collection canister, tubing, vacuum source"],
          ["Sequential compression device", "Inflates leg sleeves in sequence to prevent clots; check pressures and cycle timing, hoses, sleeves"],
          ["Physical therapy equipment", "TENS and muscle stimulators, therapeutic ultrasound (1 to 3 MHz), diathermy, traction, continuous passive motion; output and timer verification"]
        ] },
        { type: "table", cols: ["Laboratory device", "Facts"], rows: [
          ["Centrifuge", "Speed in RPM, force in RCF (g); balance opposite loads; lid interlock; verify speed with a tachometer and timer"],
          ["Incubator", "Temperature (often 37 C) and sometimes CO2 and humidity; verify with a reference thermometer; door seals"],
          ["Rocker and shaker", "Speed and tilt; motor and belt"],
          ["Refrigerator and freezer", "Blood and vaccine storage 2 to 8 C; freezers minus 20 or minus 80 C; continuous temperature logging and alarms; door gaskets and defrost"],
          ["Microscope", "Light source, objectives, focus; cleaning optics"],
          ["Water bath", "Temperature control and uniformity; thermostat and heater"],
          ["Analyzers", "Reagents, calibration, quality control samples, fluidics and clogs, temperature"],
          ["Cryostat and microtome", "Cryostat cuts frozen sections in a cold chamber (about minus 20 C); microtome cuts thin sections; blade safety, temperature, advance mechanism"]
        ] }
      ]
    },
    {
      id: "surgery", title: "Perioperative and life-support devices",
      blocks: [
        { type: "table", cols: ["Electrosurgery fact", "Value"], rows: [
          ["Frequency", "About 300 kHz to 3 MHz, above the frequency that stimulates nerves and muscle"],
          ["Modes", "Cut: continuous sine wave, vaporizes. Coag: interrupted or damped bursts, dries and seals. Blend mixes them"],
          ["Monopolar", "Current flows from the active electrode through the patient to a large return (dispersive) electrode; return electrode contact quality monitoring prevents burns"],
          ["Bipolar", "Current flows between the two tips of the forceps; no return pad needed"],
          ["Burns", "Poor return pad contact, pad on bony or hairy site, alternate paths through ECG electrodes or metal; capacitive coupling in laparoscopy"],
          ["Video integration", "Cameras, light sources, monitors, recording and routing systems; check cable, connector, light cable fibers, white balance"]
        ] },
        { type: "list", title: "Other perioperative equipment", cols: 2, items: [
          "Pneumatic tourniquet: cuff pressure above systolic (commonly 250 mmHg arm, 300 mmHg leg or adjusted to the patient), time limit alarms (about 2 hours), leak test, calibrated gauge",
          "Fluid and blood warmer: keeps fluids near body temperature; over-temperature cutoff around 41 to 42 C; check heater, sensor, alarms",
          "Sterilizer: steam 121 C at 15 psi or 132 C flash; verify temperature, pressure, time, gasket, chamber; biological indicator; ethylene oxide and hydrogen peroxide for heat-sensitive items",
          "OR table: hydraulics or motors, controls, brakes, weight rating; surgical lights: lux at 1 m, color temperature, handles, bulbs or LEDs; surgical microscope: optics, illumination, balance, focus motors"
        ] },
        { type: "table", cols: ["Defibrillation and pacing", "Value"], rows: [
          ["Adult energy", "Monophasic 360 J; biphasic 120 to 200 J (device specific); pediatric 2 J/kg first, 4 J/kg after"],
          ["Synchronized cardioversion", "Shock timed to the R wave for organized rhythms (atrial fibrillation, SVT); unsynchronized for VF and pulseless VT"],
          ["Testing", "Defibrillator analyzer with a 50 ohm load; check delivered energy, charge time, synchronization, pacing output; daily user checks"],
          ["AED", "Analyzes rhythm, advises shock only for VF and pulseless VT"],
          ["External pacing", "Demand mode paces only when intrinsic rate falls below the set rate; fixed mode paces regardless; output in mA; capture confirmed by QRS after each spike"],
          ["Intra-aortic balloon pump", "Balloon in the descending aorta inflates in diastole (raises coronary perfusion) and deflates just before systole (lowers afterload); timed to the ECG or arterial waveform; helium gas; alarms for timing, leak, and gas loss"]
        ] },
        { type: "table", cols: ["Ventilator and anesthesia", "Value"], rows: [
          ["Tidal volume and minute volume", "6 to 8 mL/kg ideal body weight; minute volume = tidal volume x rate"],
          ["Typical settings", "Rate 12 to 20; I:E ratio 1:2; PEEP 5 cm H2O; FiO2 0.21 to 1.0"],
          ["Modes", "Volume control delivers a set volume; pressure control a set pressure; assist-control, SIMV, pressure support, CPAP; BiPAP has separate inspiratory and expiratory pressures"],
          ["Alarms", "High pressure: obstruction, kink, coughing, secretions. Low pressure or low volume: disconnect or leak. Apnea: no breath detected"],
          ["Oxygen analyzer calibration", "Room air 21% and 100% oxygen; galvanic cells wear out; concentrators deliver about 90 to 95%"],
          ["Anesthesia machine", "Pipeline (50 psi) and cylinder supply, flowmeters, agent-specific vaporizers (sevoflurane yellow, isoflurane purple, desflurane blue), hypoxic guard keeps oxygen at least 21 to 25%, oxygen flush, CO2 absorber, scavenging removes waste gas, pin index and DISS prevent misconnection; leak test before use"]
        ] }
      ]
    },
    {
      id: "troubleshooting", title: "Problem solving and troubleshooting",
      blocks: [
        { type: "list", title: "The method, in order", items: [
          "1. Confirm the complaint: talk to the user, reproduce the problem, rule out use error (wrong settings, wrong accessory, wrong technique), and check the right disposables.",
          "2. Check the simple things: power, plug, battery, fuse, cables, connectors, settings, sensors.",
          "3. Isolate: which subsystem (power, sensor, signal path, processor, display, mechanical); half-split the path with a simulator and test equipment; localized device or system-wide?",
          "4. Form and test one hypothesis at a time; swap known-good parts; use the schematic.",
          "5. Repair or replace; follow the service manual.",
          "6. Verify: full performance test and electrical safety test after any repair, before return to service.",
          "7. Document in the CMMS: symptom, cause, action, parts, test results, time. Educate the user if it was a use error."
        ] },
        { type: "table", cols: ["Symptom", "First suspects"], rows: [
          ["Device dead, no power", "Outlet, cord, plug, fuse, power switch, battery, power supply output"],
          ["Runs on AC but not battery", "Battery aged or not charging; charger circuit; battery connector"],
          ["Intermittent reboot or errors", "Failing power supply capacitors, loose connector, overheating"],
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
          ["Telemetry dropouts on one patient", "Transmitter battery, leads, distance; many patients: antenna system or receiver, a system-wide problem"],
          ["Monitor not sending to the central station or EMR", "One bed: cable, port, network config on that monitor. Every bed: switch, server, middleware, network outage"],
          ["Centrifuge vibration", "Unbalanced load, worn rotor or bearing"],
          ["Refrigerator temperature alarm", "Door seal, defrost cycle, compressor, probe, overloading"]
        ] },
        { type: "list", title: "Priorities, communication, maintenance", cols: 2, items: [
          "Priority order: life support and high-risk devices first, then patient risk, then urgency and downtime and clinical impact; loaners for critical downtime",
          "Device error versus use error: a device that performs to specification but was used wrongly needs education and possibly a design or labeling report, not a repair",
          "In-service and cross-training: teach proper use, care, cleaning, and alarm response; document attendance; communicate clearly with clinicians, staff, and manufacturers in writing and verbally",
          "Preventive maintenance: scheduled or risk-based; AEM programs allowed with documented justification (not imaging, lasers, or where the manufacturer requires); PM after repair; performance verification against tolerances",
          "Calibration traceable to national standards; test equipment has its own calibration schedule",
          "Incoming inspection before first use: physical, functional, safety test, inventory entry, manuals on file; lifecycle ends with data wiped, decontamination, and disposition"
        ] }
      ]
    },
    {
      id: "hit", title: "Healthcare information technology",
      blocks: [
        { type: "table", cols: ["Networking fact", "Value"], rows: [
          ["IPv4 address", "Four numbers 0 to 255; subnet mask separates network and host; default gateway is the exit router; same subnet required to talk without a router"],
          ["MAC address", "48-bit hardware address in 12 hex digits, burned into the network card; switches forward by MAC"],
          ["Private ranges", "10.0.0.0/8; 172.16.0.0 to 172.31.255.255; 192.168.0.0/16"],
          ["DHCP and static", "DHCP assigns addresses automatically; medical devices often use static addresses or DHCP reservations so they are always reachable"],
          ["DNS", "Names to addresses; ping by address works but by name fails means DNS"],
          ["APIPA", "169.254.x.x means DHCP failed"],
          ["Ports", "HTTP 80, HTTPS 443, SSH 22, DICOM commonly 104 or 11112, HL7 commonly 2575 (site specific)"],
          ["Devices", "Switch connects devices in a LAN by MAC; router connects networks by IP; access point connects Wi-Fi clients; access point controller manages many APs; KVM switch shares one keyboard, video, and mouse among servers; virtual servers run many operating systems on one host; LAN is local, WAN spans sites, cloud is provider-hosted"],
          ["Cabling", "Cat 5e 1 Gbps, Cat 6A 10 Gbps, 100 m limit; fiber for longer runs; link light off means Layer 1; cable tracer finds the far end"],
          ["Wi-Fi", "2.4 GHz longer range, channels 1, 6, 11; 5 GHz more channels, less interference; WPA2 or WPA3; enterprise mode uses 802.1X with RADIUS"],
          ["Telemetry and RTLS", "WMTS bands for patient telemetry; real-time location systems track equipment with RF, infrared, or ultrasound tags"]
        ] },
        { type: "table", cols: ["Command or tool", "Use"], rows: [
          ["ping", "Is the address reachable, and how fast; ping the gateway first"],
          ["ipconfig (Windows), ifconfig or ip (Linux)", "Show the device's address, mask, gateway; release and renew DHCP"],
          ["tracert or traceroute", "Every hop to a destination; where the path breaks"],
          ["nslookup", "Test name resolution"],
          ["arp -a", "IP to MAC table; duplicates"],
          ["netstat", "Open connections and listening ports"],
          ["Cable tracer and tester", "Find the far end; check pinout and continuity"]
        ] },
        { type: "table", cols: ["Interoperability", "Meaning"], rows: [
          ["HL7 version 2", "Text messages between systems: ADT (admit, discharge, transfer), ORM (orders), ORU (results, including device data)"],
          ["HL7 FHIR", "Modern web-based standard using resources and APIs"],
          ["DICOM", "Standard for medical images and their transfer; modality worklist pulls patient data to the device; PACS stores and serves images"],
          ["EMR and EHR", "Electronic medical record (within one organization) and electronic health record (across); devices feed vitals in directly or through middleware"],
          ["Middleware", "Translates and routes between devices and the EMR; device gateways; where most integration faults are diagnosed"],
          ["Time synchronization", "NTP keeps device clocks aligned so records and alarms line up"]
        ] },
        { type: "list", title: "Protected data and cybersecurity", cols: 2, items: [
          "HIPAA: privacy rule (who may see PHI), security rule (administrative, physical, technical safeguards), breach notification; PHI is any identifiable health information; minimum necessary",
          "NIST Cybersecurity Framework functions: govern, identify, protect, detect, respond, recover",
          "HITRUST: a certifiable framework combining many requirements; HHS cybersecurity performance goals: essential and enhanced practices for hospitals (MFA, patching, backups, segmentation, training)",
          "MDS2: manufacturer disclosure statement for medical device security; SBOM: software bill of materials",
          "Controls: unique accounts and MFA, least privilege, encryption at rest and in transit, patching on the vendor's validated schedule, network segmentation for devices that cannot be patched, antivirus where the vendor allows, physical security of workstations, screen locks",
          "Backups: 3 copies, 2 media, 1 offsite; test restores; ransomware response: isolate, report, restore",
          "Incident: disconnect the device from the network, do not power off if forensics are needed, report to IT security and the vendor, document"
        ] },
        { type: "list", title: "Computer hardware and software troubleshooting", cols: 2, items: [
          "Hardware: power supply (no power, random reboots), hard drive (slow, errors, clicking; SMART warnings; replace and restore image), memory (crashes), peripherals (drivers, cables, ports), connectors and cables (reseat, swap)",
          "Software: Windows, Office, Linux, and Unix updates and patches only on the vendor's validated schedule for medical devices; drivers after updates; event logs; restore from image; user accounts and permissions",
          "Order of checks: power and cables, link lights, address and gateway, ping the gateway, ping the server, name resolution, application or service, then escalate to IT or the vendor"
        ] }
      ]
    }
  ]
};
