// BMET Academy memorization sheet for the AAMI/ACI CABT exam. Numbers, normal ranges, limits, formulas,
// device facts, and orders of steps a new technician must recall cold. Original content. Safety limits name their standard.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "BMET Memorization Sheet",
  intro: "Print this and keep it beside you through the course and the labs. The CABT asks for the basics a first-year technician uses every day: normal values, safety limits, Ohm's law, unit conversions, what each device does, and which tool does which job. Every number on this sheet is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Certifying body", "AAMI Credentials Institute (ACI)"],
          ["Questions", "100 multiple choice"],
          ["Time and rules", "2 hours, closed book, no notes or phones"],
          ["Calculator", "An on-screen four-function calculator is provided; no calculator of your own"],
          ["Delivery", "Live remote proctoring year-round through Kryterion: webcam, microphone, quiet room, cleared desk"],
          ["Eligibility", "High school junior or above; no work experience and no degree required"],
          ["Window to test", "Six months from purchase to the test date"],
          ["Results", "Pass or fail on screen immediately, confirmed by email within 24 hours"],
          ["Cut score", "Not published; this course trains to 70% on the official-format test"],
          ["Fee", "2026 fee: $220 member, $270 non-member; non-refundable"],
          ["Retake", "$190 member, $240 non-member, after a 60-day wait"],
          ["Validity", "5 years, non-renewable; by then you qualify for the technician-level exam"],
          ["Domain weights", "Anatomy and Physiology 10%; Medical Devices as Related to Patient Care 23%; Safety in Healthcare 16%; Fundamentals of Electricity and Electronics 14%; Reasoning and Problem Solving 24%; Healthcare Information Technology 13%"]
        ] },
        { type: "note", text: "Reasoning and Problem Solving plus Medical Devices as Related to Patient Care are 47% of the exam, nearly half the questions. For every device on this sheet be ready to say three things: what it does, what it measures or delivers, and which tool checks it." }
      ]
    },
    {
      id: "anatomy", title: "Anatomy, physiology, and terminology",
      blocks: [
        { type: "table", cols: ["Vital sign (adult, at rest)", "Normal range", "Measured by"], rows: [
          ["Heart rate", "60 to 100 beats per minute; below 60 is bradycardia, above 100 is tachycardia", "ECG monitor, pulse oximeter, NIBP module; verified with a patient simulator"],
          ["Respiratory rate", "12 to 20 breaths per minute", "Monitor impedance channel, capnograph, counting the chest"],
          ["Blood pressure", "About 120/80 mmHg; MAP = diastolic + (systolic minus diastolic) / 3", "NIBP cuff, arterial line and transducer; verified with an NIBP analyzer and a cuff leak test"],
          ["Oxygen saturation (SpO2)", "95 to 100%", "Pulse oximeter, red light about 650 to 660 nm and infrared about 805 to 940 nm; verified with an SpO2 simulator or finger phantom"],
          ["End-tidal carbon dioxide (EtCO2)", "35 to 45 mmHg", "Capnograph; verified with a known calibration gas and a gas analyzer"],
          ["Temperature", "37 C (98.6 F); fever above about 38 C", "Electronic thermometer, monitor temperature probe, infrared; verified with a resistance box or reference thermometer at two points"],
          ["Tidal volume", "About 500 mL per breath at rest", "Ventilator display, spirometer, gas flow analyzer"]
        ] },
        { type: "table", cols: ["Body system", "Key organs", "What it does", "What your devices do with it"], rows: [
          ["Circulatory", "Heart, arteries, veins, capillaries, blood", "Moves oxygen, nutrients, and waste", "ECG records electrical activity; NIBP and arterial lines measure pressure; defibrillators restart rhythm"],
          ["Respiratory", "Nose, trachea, bronchi, lungs, alveoli, diaphragm", "Takes in oxygen, gives off carbon dioxide", "Ventilators move the gas, oximeters read oxygen carried, capnographs read CO2 breathed out"],
          ["Nervous", "Brain, spinal cord, nerves", "Senses, decides, and signals by small electrical pulses", "Brain/muscle recorders capture those pulses; stimulators and TENS units supply them"],
          ["Digestive", "Mouth, esophagus, stomach, intestines, liver, pancreas", "Breaks food down and absorbs it", "Feeding pumps deliver formula, suction removes fluid, scopes let a clinician look inside"],
          ["Urinary", "Kidneys, ureters, bladder, urethra", "Filters blood and makes urine", "Dialysis machines replace the filtering; bladder scanners measure what is left behind"],
          ["Endocrine", "Pancreas, thyroid, adrenals, pituitary", "Releases hormones that set metabolism and blood sugar", "Glucose meters and insulin pumps work on this system"],
          ["Musculoskeletal", "Bones, joints, skeletal muscle, tendons", "Holds the body up and moves it", "Therapy stimulators, CPM machines, traction, beds and lifts"],
          ["Integumentary", "Skin, hair, nails", "Barrier, temperature control, sensation", "Every electrode, probe, and cuff touches it; skin prep, adhesives, pressure matter"]
        ] },
        { type: "list", title: "Directional terms and word parts", cols: 2, items: [
          "Anterior front, posterior back; superior above, inferior below; medial toward the midline, lateral away from it; proximal near the trunk, distal far from it; supine face up, prone face down",
          "Prefixes: brady- slow, tachy- fast, hyper- high or too much, hypo- low or too little, a- and an- without, dys- difficult or painful",
          "Roots: cardio heart, pulmo and pneumo lung, nephro and reno kidney, neuro nerve, gastro stomach, derm skin, hemo blood",
          "Suffixes: -itis inflammation, -ectomy surgical removal, -oscopy looking inside, -graphy the recording process, -gram the record itself, -emia a blood condition. Put them together: tachycardia is a fast heart and electrocardiography is the process that prints the electrocardiogram"
        ] },
        { type: "table", cols: ["Heart and rhythm", "What to remember"], rows: [
          ["Four chambers", "Right atrium/ventricle pump blood to the lungs; left atrium/ventricle pump it to the body; the left ventricle is thickest, working hardest"],
          ["Valves", "Tricuspid (right atrium to right ventricle), pulmonary (to the lungs), mitral (left atrium to left ventricle), aortic (to the body); keep flow one way"],
          ["SA and AV nodes", "SA node: the natural pacemaker in the right atrium, fires first and sets the rate. Flow path: body, right atrium, right ventricle, lungs, left atrium, left ventricle, body. AV node: the relay that delays the signal so the ventricles have time to fill before they squeeze"],
          ["P, QRS, and T", "P wave: the atria depolarizing, the small bump before the spike. QRS complex: the ventricles depolarizing, the tall spike; monitors count heart rate from it and defibrillators synchronize to it. T wave: the ventricles recovering after the beat"],
          ["Systole and diastole", "Systole is the squeeze and the higher number; diastole is the refill and the lower number"],
          ["Blood", "Red cells carry oxygen on hemoglobin, white cells fight infection, platelets clot, plasma is the liquid that carries the rest"]
        ] }
      ]
    },
    {
      id: "electricity", title: "Electricity and electronics",
      blocks: [
        { type: "table", cols: ["Formula", "Statement", "Units"], rows: [
          ["Ohm's law", "V = I x R", "Volts = amps x ohms"],
          ["Solve for current", "I = V / R", "Amps = volts / ohms"],
          ["Solve for resistance", "R = V / I", "Ohms = volts / amps"],
          ["Power", "P = V x I", "Watts = volts x amps"],
          ["Power from current", "P = I squared x R", "Use it when you know current and resistance"],
          ["Power from voltage", "P = V squared / R", "Use it when you know voltage and resistance"],
          ["Worked example", "12 V across 4 ohms draws 3 A and burns 36 W", "12 / 4 = 3; 12 x 3 = 36"]
        ] },
        { type: "table", cols: ["Prefix or conversion", "Value"], rows: [
          ["Prefixes", "kilo is 1,000 times (1 kV = 1,000 V), milli is one thousandth (1 mA = 0.001 A), micro is one millionth (1 microamp = 0.000001 A)"],
          ["Current and resistance ladders", "1 A = 1,000 mA = 1,000,000 microamps (0.47 A is 470 mA); 1 kohm = 1,000 ohm; 1 Mohm = 1,000,000 ohm = 1,000 kohm"]
        ] },
        { type: "table", cols: ["Resistor band", "Digit or meaning"], rows: [
          ["Color digits", "Black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, white 9"],
          ["First three bands", "The first two bands are the first two digits; the third band is the multiplier, meaning how many zeros to add"],
          ["Fourth band", "Tolerance: gold 5%, silver 10%, no band 20%"],
          ["Worked example", "Brown, black, red, gold = 1, 0, add two zeros = 1,000 ohm plus or minus 5%. Measure out of circuit with power off; parallel parts pull the reading low"]
        ] },
        { type: "table", cols: ["Circuit", "Series", "Parallel"], rows: [
          ["Current", "The same through every part", "Divides between branches, and the branch currents add up to the total"],
          ["Voltage", "Divides across the parts and the drops add up to the source", "The same across every branch"],
          ["Resistance", "Add them: R total = R1 + R2 + R3", "Total is lower than the smallest branch; for two, (R1 x R2) / (R1 + R2)"],
          ["One part opens", "Everything stops, which is why a fuse goes in series", "Only that branch stops and the rest keeps working, which is why wall outlets are wired in parallel"]
        ] },
        { type: "table", cols: ["DC and AC", "What to remember"], rows: [
          ["DC", "Steady, one direction: batteries, power supply outputs, most circuit boards. Red lead is positive, black is negative"],
          ["AC", "Reverses direction many times a second: wall power. The United States uses 120 V at 60 Hz; much of the world uses 230 V at 50 Hz"],
          ["RMS", "The 120 V on the label is RMS, the effective value (DC voltage giving the same power); the waveform peaks near 170 V"],
          ["Transformers", "Change AC voltage (more turns on the output raises it, fewer lowers it) and can isolate a circuit; an isolation transformer has equal turns; does nothing on DC"],
          ["Rectifier", "Diodes turn AC into DC inside a power supply; a capacitor smooths the ripple"]
        ] },
        { type: "list", title: "Components, symbols, and what they do", cols: 2, items: [
          "Battery: provides DC power; symbol is alternating long/short lines, long line positive",
          "Resistor: limits current, drops voltage (ohms, watts); symbol is a zigzag or plain rectangle",
          "Capacitor: stores charge in farads, can hold a dangerous charge after power off, discharge before touching; symbol is two parallel plates, a curved plate meaning polarized",
          "Inductor or coil: stores energy in a magnetic field (henries), resists sudden current changes",
          "Diode: passes current one way, forward drop about 0.6 to 0.7 V, blocks backwards; symbol is a triangle into a bar, current flows the way it points; rays added make it an LED",
          "LED: needs about 1.8 to 3.3 V, always a series resistor, longer leg is the anode (positive)",
          "Transistor: switch or amplifier, a small signal on one leg controlling a larger current through the other two",
          "Fuse: one-time (a breaker resets instead), replace with the same current/voltage rating; symbol is a loop or an S between two terminals. Lamp symbol is a circle with an X or a loop inside",
          "Switch and relay: a switch makes or breaks a path, a relay is a switch moved by a coil for a small signal to control a big load; switch symbol is a line lifted from a contact",
          "Ground: three shrinking horizontal lines. Chassis ground: a small rake or hatched bracket. Signals flow left to right"
        ] },
        { type: "table", cols: ["Wiring", "Colors and rules"], rows: [
          ["United States building and cord wiring", "Black or red is hot, white is neutral, green or bare copper is ground"],
          ["International device cords", "Brown is live, blue is neutral, green with a yellow stripe is ground"],
          ["DC leads", "Red is positive, black is negative; on a battery the terminals are marked plus and minus"],
          ["Wire gauge", "AWG runs backwards: a lower number is thicker, carrying more current (14 AWG thicker than 18 AWG). Every cord entering a case needs a clamp or bushing so a pull lands on the case, not the conductors"]
        ] },
        { type: "table", cols: ["Battery fact", "Voltage per cell and notes"], rows: [
          ["Chemistries", "Alkaline 1.5 V, single use; nickel metal hydride 1.2 V, rechargeable; lithium coin cell 3 V, holds memory/clock settings; lithium-ion 3.6 to 3.7 V, rechargeable, never crush, puncture, or fully drain; sealed lead-acid 2 V per cell (a 12 V block is six cells), common in infusion pumps, carts, and beds"],
          ["Capacity and stacking", "Capacity in amp-hours or milliamp-hours; runtime falls as a pack ages even though voltage looks fine. Cells in series add voltage, cells in parallel add capacity at the same voltage"]
        ] },
        { type: "list", title: "Static and bare-board handling", cols: 2, items: [
          "A static shock you can feel is roughly 3,000 V; as little as 100 V can quietly damage a chip with no spark you notice",
          "Wear a grounded wrist strap, work on a grounded mat, touch the chassis before touching a board",
          "Carry boards in antistatic bags, never a plastic tray or a shirt pocket",
          "Dry winter air makes ESD worse, humidity helps; hold boards by the edges, fingers off the connector pins"
        ] },
        { type: "table", cols: ["Fault", "What you measure"], rows: [
          ["Open", "Infinite resistance (the meter shows OL), no current flows, and the full source voltage appears across the break"],
          ["Short", "Near zero resistance, far too much current, heat, and a blown fuse or tripped breaker"],
          ["High resistance joint", "Current still flows, but the voltage drop across the joint is large and the joint runs warm"]
        ] }
      ]
    },
    {
      id: "reasoning", title: "Math, measurement, and reasoning",
      blocks: [
        { type: "table", cols: ["Conversion", "Value"], rows: [
          ["Volume", "1 L = 1,000 mL; 1 mL = 1 cubic centimeter"],
          ["Mass and length", "1 kg = 1,000 g = 2.2 lb; 1 inch = 2.54 cm"],
          ["Pressure, airway", "1 mmHg = 1.36 cmH2O"],
          ["Pressure, gas", "1 psi = 51.7 mmHg; 1 atmosphere = 14.7 psi = 760 mmHg; 1 kPa = 7.5 mmHg"],
          ["Temperature formulas", "F = C x 9/5 + 32; C = (F minus 32) x 5/9"],
          ["Temperature anchors", "37 C = 98.6 F; 0 C = 32 F; 100 C = 212 F"],
          ["Flow rate", "mL/h divided by 60 = mL/min, so 120 mL/h is 2 mL/min; a 30-minute collection doubled gives the hourly rate"]
        ] },
        { type: "table", cols: ["Accuracy math", "Rule"], rows: [
          ["Percent error", "(measured minus expected) / expected x 100; keep the sign so you know which way it is off"],
          ["Tolerance band", "expected x percent; a 5% band on 40 mL is 2 mL, so 38 to 42 mL"],
          ["Pass or fail", "Pass when the size of the error is inside the band, ignoring the sign"],
          ["Worked example", "37 mL where 40 mL was expected: (37 minus 40) / 40 x 100 = -7.5%, which fails a 5% band. A pump set to 100 mL/h that delivers 103 mL is +3%, which passes"],
          ["Accuracy and precision", "Accuracy is how close to the truth; precision is how repeatable. A meter can be precisely wrong"]
        ] },
        { type: "table", cols: ["ECG paper and rate", "Value"], rows: [
          ["Paper speed", "25 mm/s is standard"],
          ["Box sizes", "A small box is 1 mm wide = 0.04 s; a large box is 5 mm wide = 0.2 s, so five small boxes make one large one"],
          ["Height", "1 mV of signal = 10 mm tall at normal gain"],
          ["Rate from the boxes", "300 / the large boxes between two R waves, or 1,500 / the small boxes. Four large boxes is 300 / 4 = 75 beats per minute"],
          ["Six-second rule", "Count the beats in a six-second strip and multiply by 10; the quickest way with an irregular rhythm"]
        ] },
        { type: "list", title: "Reading instruments, graphs, and trends", cols: 2, items: [
          "Get your eye level with the mark; looking down or up at a scale adds parallax error",
          "In a graduated cylinder read the bottom of the curved surface of the liquid, with the cylinder on a flat bench",
          "Read to the nearest printed graduation, then estimate one more digit; write down the units every time, and let the reading settle first",
          "Zero or tare the instrument before the first reading; a scale that was not zeroed is wrong by the same amount on every weight",
          "Read the axis labels and units before the shape of the line; a flat-looking curve can be a huge swing if the scale is small",
          "A value that creeps in the same direction across several scheduled inspections predicts a failure even while it is still inside tolerance",
          "In a specification table find the row for the model, then the column for the condition, then read the limit and its units; averages hide outliers, so one bad reading in ten still means one bad device"
        ] },
        { type: "list", title: "Flowcharts, narrowing it down, and documentation", cols: 2, items: [
          "Flowchart shapes: oval start/end, rectangle a step, diamond a yes/no decision, arrows show the order",
          "Try the simplest, most common cause first: power, battery, connection, consumable, setting",
          "Change one thing at a time and recheck, so you know what fixed it",
          "Swap a suspected cable, probe, or accessory for a known-good one; that single test splits the problem in half",
          "Order: is the patient safe, what did the user see and do, is it the accessory, is it the device. If it works in another room, the fault is not in the device",
          "Service manual sections you will use: safety notices, specifications, theory of operation, setup and installation, scheduled maintenance procedure and interval, calibration, troubleshooting and error codes, parts list, schematics",
          "The IFU is written for the clinician, the service manual for you; both are controlled documents, so use the version matching the model and software",
          "A work order needs: asset identification number, the problem as reported, what you found, what you did, parts used, time spent, a clear pass/fail, your name and date",
          "If it is not written in the CMMS it did not happen; a device released without a documented safety test is a finding at the next survey"
        ] }
      ]
    },
    {
      id: "safety", title: "Safety in healthcare",
      blocks: [
        { type: "table", cols: ["Current through the body (60 Hz)", "Effect"], rows: [
          ["1 mA", "Threshold of perception"],
          ["5 mA", "Accepted maximum harmless current"],
          ["10 to 20 mA", "Let-go threshold: muscles clamp, cannot release the conductor"],
          ["50 mA", "Pain, possible fainting, respiratory arrest"],
          ["100 to 300 mA", "Ventricular fibrillation likely"],
          ["6 A and above", "Sustained contraction and burns"],
          ["Microshock", "10 microamps direct to the heart can cause fibrillation"]
        ] },
        { type: "table", cols: ["IEC 60601-1 limit", "Normal condition", "Single fault condition"], rows: [
          ["Earth (ground) leakage", "5 mA", "10 mA"],
          ["Touch (enclosure) current", "100 microamps", "500 microamps"],
          ["Patient leakage, type B and type BF", "100 microamps", "500 microamps"],
          ["Patient leakage, type CF", "10 microamps", "50 microamps"]
        ] },
        { type: "table", cols: ["NFPA 99 and facility fact", "Value"], rows: [
          ["Ground resistance, chassis to the plug ground pin (NFPA 99)", "0.5 ohm maximum for patient-care equipment"],
          ["Chassis (touch) leakage, cord-connected patient-care equipment (NFPA 99)", "500 microamps in current editions; older editions used 300 or 100 microamps"],
          ["Patient care vicinity (NFPA 99)", "About 6 ft (1.8 m) out from the bed or chair and 7.5 ft (2.3 m) up from the floor"],
          ["GFCI trip (NFPA 99 wet locations)", "4 to 6 mA of imbalance between hot and neutral"],
          ["Hospital-grade receptacle", "Marked with a green dot; checked for retention force and polarity"],
          ["Extension cords and cheater adapters", "Never used with patient-care equipment; a three-prong to two-prong adapter defeats the ground"],
          ["Relocatable power taps", "Only where allowed, rated, and secured; never daisy-chained"],
          ["Damaged cords and plugs", "Remove from service: a cracked plug, missing ground pin, or pinched cord fails inspection on sight"]
        ] },
        { type: "table", cols: ["Protection class or applied-part type", "What it means"], rows: [
          ["Class I / Class II / internally powered", "Class I: metal case grounded by a third-wire protective earth; ground continuity is the critical test. Class II: double insulated, no ground pin, marked with a square inside a square. Internally powered: runs on its own battery, isolated from the mains while unplugged"],
          ["Type B / BF / CF applied parts", "Type B (stick figure): touches the body, not for cardiac connection. Type BF (stick figure in a box): body floating, isolated from earth. Type CF (heart in a box): cardiac floating, safe for a direct heart connection, tightest leakage limits"],
          ["Defibrillation-proof", "Adds the paddle symbol: the applied part survives a defibrillator discharge"],
          ["Macroshock vs. microshock", "Macroshock crosses the skin and takes milliamps to hurt; microshock bypasses the skin through a catheter or lead and needs only microamps"]
        ] },
        { type: "table", cols: ["Electrical safety test", "Order and notes"], rows: [
          ["Full sequence", "Visual and cord inspection, ground resistance, chassis leakage in each condition, then patient lead leakage; stop at the first failure and tag the device"],
          ["Leakage conditions", "Normal polarity, reversed polarity, open ground, open neutral; worst with the ground open"],
          ["When to test", "Incoming inspection, after any repair touching the power path or enclosure, and on the scheduled maintenance interval"],
          ["Trending", "Rising leakage or ground resistance means insulation or a cord is failing; compare to the last reading, not only the limit"]
        ] },
        { type: "list", title: "Lockout/tagout and hazard communication", cols: 2, items: [
          "LOTO steps in order: notify everyone affected, shut the equipment down, isolate the energy source, apply your own lock and tag, release stored energy, verify zero energy before you work",
          "Stored energy: charged capacitors, compressed gas, springs, hydraulic pressure, raised beds and tables, hot surfaces; one device often has several sources at once",
          "Verify zero energy with a meter or gauge; an indicator light that is out is not proof the circuit is dead. Only the person who placed a lock removes it, never someone else at shift change",
          "GHS pictograms: flame for flammable, flame over a circle for oxidizer, skull for acute toxicity, corrosion, exclamation mark for irritant, silhouette for a longer-term health hazard, gas cylinder, and environment",
          "The safety data sheet (SDS) for every chemical has 16 numbered sections and must be reachable by staff at any hour; sections you will actually open: 2 hazards, 4 first aid, 5 fire fighting, 7 handling and storage, 8 exposure controls and PPE",
          "OSHA requires the labels, SDS access, training, and records; cleaning wipes, solvents, battery electrolyte, and compressed gases all count"
        ] },
        { type: "table", cols: ["Medical gas", "Facts"], rows: [
          ["Colors and uses (United States)", "Oxygen (O2) green, for therapy; medical air yellow, ventilator driving gas; nitrous oxide blue, anesthesia; nitrogen black, surgical tools; carbon dioxide gray, insufflation; vacuum or suction white"],
          ["Oxygen hazard", "Supports combustion: no oil, grease, or tape on a fitting, no ignition source nearby"],
          ["Full E cylinder", "About 2,000 to 2,200 psi and about 660 liters of gas"],
          ["Wall outlets", "About 50 psi delivered to the device"],
          ["Connections", "Small cylinders use the pin index safety system (PISS), pipeline outlets use the diameter index safety system (DISS); each gas has its own pattern, no adapters or forcing"],
          ["Handling", "Cylinders chained or racked upright, caps on when not in use, full separated from empty, never free-standing on a cart"],
          ["Zone valves", "Labeled shutoff valves isolating the gas for one area; know their locations"]
        ] },
        { type: "list", title: "Signs, symbols, and zones", cols: 2, items: [
          "Ionizing radiation: the three-blade trefoil. Practice ALARA: keep exposure time short, stand back, use shielding, wear your dosimeter where the badge belongs",
          "Laser doors state the class and wavelength; eyewear must match that wavelength, not just be dark. Biohazard symbol marks regulated waste, sharps containers, specimen transport",
          "MRI zones I, II, III, IV run from public to the magnet room, always on even when nothing is scanning (no steel tools, oxygen cylinders, carts); MR Safe, MR Conditional, MR Unsafe labels say whether an item may enter, conditional meaning only under stated limits",
          "Oxygen in use signs mean no ignition sources. The book-and-hand symbol means consult the instructions; a triangle with an exclamation mark is a general warning"
        ] },
        { type: "list", title: "Infection control for the technician", cols: 2, items: [
          "Hand hygiene first and last, every time, and again after gloves come off",
          "Standard precautions: treat every patient's blood and body fluids as infectious regardless of diagnosis",
          "PPE on: gown, mask, eye protection, gloves. Off: gloves, eye protection, gown, mask. An N95 respirator, fit tested, is for airborne precautions; a surgical mask is not the same",
          "Sharps go straight into the sharps container, never in a pocket, a tray, or regular trash",
          "Spaulding levels: critical items entering sterile tissue are sterilized; semi-critical items touching mucous membranes get high-level disinfection; non-critical items touching intact skin get low-level disinfection",
          "Clean a device before it reaches your bench, and clean it again before it returns to the floor"
        ] },
        { type: "list", title: "Device-specific hazards", cols: 2, items: [
          "X-ray and CT: time, distance, and shielding; stand behind the barrier, wear the dosimeter, never hold a cassette by hand",
          "Defibrillator: the capacitor holds a lethal charge after charging; call clear, let nobody touch the bed, disarm or dump the charge into the analyzer before opening anything",
          "Electrosurgery (ESU): current returns through a pad, so a partly lifted return electrode concentrates current and burns the patient; check the pad, cable, and alarm",
          "Centrifuge: never open the lid while the rotor spins; inspect the rotor for cracks and corrosion, keep loads balanced",
          "Lasers: wavelength-matched eyewear for everyone in the room, door interlocks, no reflective instruments in the beam path",
          "Fire: RACE is rescue, alarm, confine, extinguish. PASS is pull, aim, squeeze, sweep. Classes: A ordinary combustibles, B flammable liquids, C energized electrical, K kitchen oils",
          "Mechanical: beds, tables, and lifts have pinch points and heavy moving parts; block them before reaching in, lift with your legs, get help for anything awkward"
        ] }
      ]
    },
    {
      id: "devices", title: "Medical devices and test equipment",
      blocks: [
        { type: "table", cols: ["Diagnostic device", "What it does", "A key check"], rows: [
          ["Otoscope", "Lights and magnifies the ear canal", "Lamp, battery or charger contacts, clean specula"],
          ["Ophthalmoscope", "Lights and focuses on the back of the eye", "Lamp, lens detents, optics cleaned with lens tissue only"],
          ["Thermometer", "Reads temperature by thermistor probe, oral/axillary/rectal, or infrared ear/forehead; disposable single-use strip", "Compare against a reference thermometer; probe type must match device"],
          ["Scale", "Weighs a patient standing, sitting, or in a bed", "Zero empty; check with certified weights at low, middle, high load"],
          ["Bladder scanner", "Ultrasound measurement of urine volume left in the bladder", "Probe surface, battery, stored reference check"],
          ["EKG cart", "Records the twelve-lead diagnostic tracing on paper or to the chart", "Lead wires and cable continuity, paper and print quality, simulator tracing on every lead"],
          ["Microscope", "Magnifies specimens for the laboratory", "Illumination, stage movement, clean objectives, no fingerprints"],
          ["Centrifuge", "Spins samples to separate them by density", "Speed with a tachometer, timer accuracy, lid interlock, rotor condition"]
        ] },
        { type: "note", text: "Normal values, the clinical device, and the verification tool for ECG, NIBP, SpO2, EtCO2, and temperature are on the anatomy vital-sign table above. Telemetry: verify with a simulator through the transmitter after checking signal strength and battery; a dropout is usually a dead battery or a coverage hole. Common false alarms: a loose or dried electrode reads as asystole or lead-off; a small cuff or a moving arm reads high; motion, poor perfusion, cold fingers, or nail polish upset SpO2; water in the EtCO2 sample line; a temperature probe off the patient reads room air." },
        { type: "table", cols: ["Therapeutic device", "What it delivers", "Settings", "The maintenance check"], rows: [
          ["Large-volume infusion pump", "Fluid or medication into a vein", "Rate in mL/h, volume to be infused", "Flow accuracy, occlusion pressure, alarms, battery runtime"],
          ["Syringe pump", "Very small, precise volumes from a syringe", "Rate, syringe brand and size", "Correct syringe profile, plunger grip, low-rate flow accuracy"],
          ["PCA pump", "A patient-pressed dose with lockouts", "Dose, lockout interval, hourly limit", "Lockout timing, key and lock security, dose history log"],
          ["Feeding pump", "Formula into the stomach or intestine", "Rate and volume", "Flow accuracy; connector deliberately incompatible with a vein line"],
          ["Suction regulator", "Negative pressure to remove fluid", "Vacuum level, continuous or intermittent", "Gauge accuracy against a reference, leak check, canister and filter"],
          ["Defibrillator and AED", "A measured shock to restart an organized rhythm", "Energy in joules, synchronized or not, pacing on some units", "Delivered energy, charge time, sync, battery, pads in date, self-test log"],
          ["Patient warming and cooling", "Warm or cool air or water to hold body temperature", "Set temperature and a high limit", "Temperature accuracy, over-temperature cutoff, filters, hose condition"],
          ["Sequential compression device (SCD)", "Timed squeeze on the legs to keep blood moving", "Pressure and cycle time", "Pressure accuracy, hose and sleeve leaks, cycle timing"],
          ["Therapy equipment: TENS and CPM", "TENS: pulses for pain. CPM: moves a joint through a set range", "Pulse amplitude and rate; range of motion and speed", "Output level, electrode and cable condition, range limits and the stop control"]
        ] },
        { type: "table", cols: ["Defibrillator number", "Value"], rows: [
          ["Biphasic adult shock", "120 to 200 J, depending on the manufacturer's protocol"],
          ["Monophasic adult shock", "360 J"],
          ["Pediatric settings", "Lower and weight based, chosen by the clinician"],
          ["Analyzer load", "The analyzer presents a 50 ohm load, standing in for the patient's chest"],
          ["Charge time", "Timed from the charge button to the ready tone; a slow charge usually means an aging battery or capacitor"],
          ["Synchronized mode", "Times the shock to the QRS complex for an organized rhythm; a chaotic rhythm gets unsynchronized defibrillation. Compare delivered joules at low, middle, and maximum settings against tolerance"]
        ] },
        { type: "table", cols: ["Infusion number or alarm", "Meaning"], rows: [
          ["Rate", "Programmed in mL/h; the pump moves the set volume per hour, not drops per minute"],
          ["Volume to be infused (VTBI)", "How much to give before the pump stops and alarms"],
          ["Keep vein open (KVO)", "A small trickle after the volume finishes so the line does not clot"],
          ["Flow accuracy check", "Collect into a graduated cylinder for 30 minutes and double it, or use an infusion analyzer; typical spec is plus or minus 5%"],
          ["Occlusion alarm", "Pressure above the threshold: a clamp left closed, a kink, or a blocked site"],
          ["Air-in-line alarm", "The ultrasonic detector sees bubbles; purge the set on setup"],
          ["Free-flow protection", "The set clamps itself when removed from the pump, so gravity cannot dump the bag into the patient"]
        ] },
        { type: "table", cols: ["Hand tool", "The job", "The misuse to avoid"], rows: [
          ["Graduated cylinder", "Measuring collected volume for a flow check", "Reading it above eye level"],
          ["Stopwatch", "Timing a collection, a charge, or a cycle", "Starting it late, which shortens the interval"],
          ["Allen (hex) keys, metric and SAE", "Socket-head screws on covers and shafts", "Forcing a metric key into an SAE socket"],
          ["Torque wrench", "Tightening to a value in inch-pounds or newton-meters", "Using it as a breaker bar, or guessing the value"],
          ["Channel locks", "Gripping large round fittings and nuts", "Turning finished hardware with them; use a wrench"],
          ["Needle-nose pliers", "Reaching, bending, and holding small parts", "Cutting hard wire with the tips"],
          ["Diagonal cutters", "Cutting wire and ties flush", "Prying or twisting with them"],
          ["Wire stripper", "Removing insulation at the right gauge notch", "Using a knife or wrong notch, nicking the copper"],
          ["Vice grips", "Clamping a part or a stuck fastener temporarily", "Using them on good hardware as a wrench"],
          ["Torx and security bits", "Opening medical enclosures that are meant to stay closed to users", "Driving a Torx screw with a flat blade"],
          ["Nut drivers", "Hex-head screws and standoffs in cases", "Reaching for pliers, marking the hardware"]
        ] },
        { type: "table", cols: ["Test instrument", "What it verifies", "How to use it"], rows: [
          ["Digital multimeter (DMM)", "Voltage, current, resistance, continuity", "Volts with power on, amps in series with the circuit, ohms and continuity only with power off"],
          ["Electrical safety analyzer", "Ground resistance and leakage currents", "Sequence: visual, ground resistance, chassis leakage in each fault condition, patient lead leakage"],
          ["Patient simulator", "Monitors and recorders, by producing ECG, SpO2, respiration, NIBP, and temperature signals", "Supplies signals, draws no current from the patient; tests the monitor, not patient-circuit safety"],
          ["Defibrillator analyzer", "Delivered energy, charge time, synchronization", "Discharge into its 50 ohm load and compare joules at several settings"],
          ["Infusion analyzer", "Flow rate and occlusion pressure", "Or a graduated cylinder and a stopwatch when no analyzer is free"],
          ["Tachometer", "Rotational speed in RPM", "Optical or contact reading on a centrifuge or blower"],
          ["Calibration weights", "Scales", "Certified weights at low, middle, high load; weights carry their own due date"],
          ["Pressure meter or manometer", "Cuffs, suction regulators, and gas regulators", "Tee in at the patient connection to read what the patient would see"]
        ] },
        { type: "note", text: "Every piece of test equipment carries its own calibration sticker and due date; check the sticker before you check the device." },
        { type: "list", title: "Incoming inspection, in order", cols: 2, items: [
          "Check the shipment against the packing slip and purchase order first",
          "Inspect physically for shipping damage, then confirm the model, serial number, and voltage rating",
          "Account for accessories, batteries, cords, and manuals; file the service manual and the IFU",
          "Assign an asset tag and create the record in the CMMS with model, serial, location, owner, and the maintenance schedule",
          "Perform the electrical safety test; record the numbers as the baseline",
          "Perform the function test from the manual; set configuration, alarm limits, and clock as the department wants",
          "Train the users or arrange the in-service, then release and document it"
        ] },
        { type: "list", title: "Scheduled maintenance (PM) and first checks, in order", cols: 2, items: [
          "PM visual inspection: case, cord, plug, strain relief, connectors, labels, wheels, filters, anything missing",
          "Clean the device and its filters, inside and out as the manual allows",
          "Electrical safety test: ground resistance and leakage, compared against the limit and the previous reading",
          "Function and performance checks against the manual's tolerances, using calibrated test equipment",
          "Replace the consumables on the list: batteries, filters, seals, tubing, dated accessories",
          "Apply the inspection label with the date due; document results, parts, and time in the CMMS",
          "First checks: is it powered (plugged in, switch on, breaker set, battery charged, outlet live)",
          "Fuse or breaker on the device, and if a fuse blew, why; cables and connectors reseated, checked for bent pins, cuts, strain",
          "Swap the accessory, probe, or lead wire for a known-good one before opening the device",
          "User or device: watch the task performed the way the clinician does it",
          "Look up the error code, note the exact wording, restart only after recording the state",
          "Know when to stop: escalate to the vendor or a senior technician, and document everything either way"
        ] }
      ]
    },
    {
      id: "it", title: "Healthcare IT",
      blocks: [
        { type: "table", cols: ["Computer part", "What it does"], rows: [
          ["Core components", "CPU: processor that runs instructions, speed and cooling set performance. RAM: fast working memory, volatile, gone when power drops. GPU: draws the display, matters on imaging review workstations. Power supply: converts wall AC into the board's DC voltages; a failing one causes random reboots. Motherboard: the board everything plugs into, carrying the buses between parts"],
          ["Storage, firmware, software, and peripherals", "HDD: spinning magnetic drive with moving parts, clicking is its warning. SSD: solid-state, no moving parts, better on a cart that gets bumped. BIOS/UEFI: firmware that starts the machine and finds the boot device. Operating system and drivers: the operating system manages hardware and runs applications; drivers let it talk to one specific device, and wrong or missing drivers are the classic after-update failure. Printers: local by USB, network with its own IP address"]
        ] },
        { type: "table", cols: ["Connector", "Where you see it"], rows: [
          ["USB-A, USB-B, USB-C, micro-USB", "Rectangular host, square-ish device, the reversible oval, small legacy plug on handhelds"],
          ["HDMI and DisplayPort", "Current digital video and audio to a monitor"],
          ["VGA and DVI", "Older video: VGA is analog with a blue fifteen-pin shell, DVI is the white digital connector"],
          ["RJ45", "The eight-pin network jack on Cat5e or Cat6 cable"],
          ["Fiber", "Glass strands for long runs and for electrical isolation between buildings"],
          ["RS-232 serial, often on a DB9 shell", "The nine-pin serial port still used to configure and pull data from medical devices"]
        ] },
        { type: "table", cols: ["Network term", "Meaning"], rows: [
          ["LAN and WAN", "A LAN is one building or campus; a WAN links sites across distance"],
          ["Switch", "Connects wired devices inside a LAN and forwards traffic only to the port that needs it"],
          ["Router and default gateway", "A router joins networks; the default gateway is where a device sends traffic bound for another network"],
          ["IP address and subnet mask", "The address identifies the device; the mask says which part of it is the network"],
          ["DHCP", "Hands out addresses automatically; medical devices often get a reservation so the address never changes"],
          ["DNS", "Turns names into addresses; if an address works but the name does not, suspect DNS"],
          ["Wi-Fi and Bluetooth", "Wi-Fi: 2.4 GHz reaches farther, 5 GHz is faster with less interference, secured with WPA2 or WPA3. Bluetooth: short-range pairing for probes, printers, handheld scanners"],
          ["RFID and RTLS", "Tags and readers that locate equipment; a real-time location system is how a hospital finds its pumps"],
          ["VLAN and VPN", "A VLAN is a logical network inside the switch; medical devices usually live on their own. A VPN is an encrypted tunnel, how a vendor reaches a device for remote service"],
          ["IDF, MDF, racks, and patch panels", "MDF is the building's core data room; IDF is the floor closet feeding the jacks. Rack units hold the gear; the patch panel is where every wall jack terminates and gets a short cable to a switch port"],
          ["WMTS", "Protected radio bands reserved for patient telemetry so consumer devices cannot step on them"]
        ] },
        { type: "table", cols: ["Command", "What it tells you"], rows: [
          ["ipconfig", "The device's own IP address, subnet mask, and default gateway, which is where every network call starts"],
          ["ping", "Whether a destination answers, how long it takes, and how many packets were lost; ping the gateway first, then the server"],
          ["Same subnet or not", "With a /24 mask, devices sharing the first three numbers of the address are on the same subnet and can talk without a router"]
        ] },
        { type: "list", title: "Privacy and security habits", cols: 2, items: [
          "HIPAA protects PHI, any health information tied to a person: name, dates, identifiers, images, readings on a screen",
          "Minimum necessary: see and share only what the job requires, including a technician at a bedside",
          "The privacy rule governs who may see PHI; the security rule requires administrative, physical, and technical safeguards; a breach has reporting duties with deadlines",
          "The EMR is the patient's electronic chart; device integration pushes vitals and waveforms into it, so a wrong patient assignment becomes a charting error",
          "Wipe or destroy storage before a device leaves for trade-in, loan return, or disposal; a certificate of destruction or documented multi-pass overwrite (a DoD wipe) is the record",
          "No patient details in photos, texts, or work order notes, or on a screen in the background; an outside service company handling PHI signs a business associate agreement first",
          "Lock the screen every time you walk away, even for a minute at a nurse station",
          "Long passphrases, unique per system, with multi-factor authentication (MFA) wherever offered",
          "Phishing arrives as urgency plus a link: do not click, do not reply, report it as your facility asks",
          "Patch medical devices only on the vendor's validated schedule; an unapproved update can take a device out of service or spec",
          "No unknown USB drives in a clinical machine, and no personal drives for transferring device data",
          "Firewalls at the edge and a separate VLAN for devices that cannot be patched; least privilege on every account",
          "Report a suspected incident immediately, disconnect the device if told to, and do not try to clean it yourself"
        ] }
      ]
    },
    {
      id: "career", title: "Your career",
      blocks: [
        { type: "table", cols: ["Credential", "What it is for", "When you qualify"], rows: [
          ["CABT", "Entry-level proof of fundamentals; the credential this course targets (exam facts above)", "Now: high school junior or above, no experience required"],
          ["CBET", "The working technician's credential, named in most job postings", "Candidate: an associate degree in electronics/technology/science, a United States military BMET program, or two years of full-time BMET work (five years to finish). Full certification: that degree plus two years of BMET work, the military program plus two years, or four years of BMET work alone. 165 questions, 3 hours, May and November, $410 member/$460 non-member, recertified every 3 years"],
          ["CRES", "The imaging specialist: radiography, fluoroscopy, and the high-voltage side of the shop", "After experience in imaging service. Also 165 questions in 3 hours"],
          ["CHTM", "The management credential: budgets, staff, regulations, and program strategy", "After experience leading a healthcare technology management program"]
        ] },
        { type: "list", title: "Where the jobs are", cols: 2, items: [
          "Hospital in-house HTM, a mixed bench and the most common first job; independent service organization (ISO), contract service across facilities with more travel; manufacturer field service (OEM), one product line with factory parts, tools, and training; military and government; clinics, surgery centers, and dialysis, small fleets where you are often the only technician."
        ] },
        { type: "list", title: "Your first ninety days", cols: 2, items: [
          "Shadow everyone you can and write down what you see; the hospital's own habits are not in any manual",
          "Learn the CMMS the first week: open, update, close a work order, and find the equipment history",
          "Document everything you touch, including calls that turned out to be nothing",
          "Ask before you guess, especially near a patient; nobody is upset about a question, everybody remembers a mistake",
          "Do the safety habits every time until boring: hand hygiene, the visual check, the safety test, the label, the record",
          "Keep a notebook of error codes, part numbers, and who to call; record the exact wording of a code and what the device was doing"
        ] }
      ]
    }
  ]
};
