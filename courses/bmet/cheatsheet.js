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
          ["Certifying body", "AAMI Credentials Institute (ACI), the credentialing arm of AAMI"],
          ["Questions", "100 multiple choice"],
          ["Time and rules", "2 hours, closed book, no notes or phones"],
          ["Calculator", "An on-screen four-function calculator is provided; no calculator of your own"],
          ["Delivery", "Live remote proctoring year-round through Kryterion: webcam, microphone, quiet room, cleared desk"],
          ["Eligibility", "High school junior or above; no work experience and no degree required"],
          ["Window to test", "Six months from purchase to the test date"],
          ["Results", "Pass or fail on screen immediately, confirmed by email within 24 hours"],
          ["Cut score", "Not published. This course scores the official-format test at 70% so you train above the line"],
          ["Fee", "2026 fee: $220 member, $270 non-member; non-refundable"],
          ["Retake", "$190 member, $240 non-member, after a 60-day wait"],
          ["Validity", "5 years, non-renewable; by then you qualify for the technician-level exam"],
          ["Anatomy and Physiology", "10%"],
          ["Medical Devices as Related to Patient Care (the course calls it Medical Devices and Test Equipment)", "23%"],
          ["Safety in Healthcare", "16%"],
          ["Fundamentals of Electricity and Electronics", "14%"],
          ["Reasoning and Problem Solving", "24%"],
          ["Healthcare Information Technology (Healthcare IT)", "13%"]
        ] },
        { type: "note", text: "Reasoning and Problem Solving plus Medical Devices and Test Equipment are 47% of the exam, nearly half the questions. For every device on this sheet be ready to say three things: what it does, what it measures or delivers, and which tool checks it." }
      ]
    },
    {
      id: "anatomy", title: "Anatomy, physiology, and terminology",
      blocks: [
        { type: "table", cols: ["Vital sign (adult, at rest)", "Normal range", "Measured by"], rows: [
          ["Heart rate", "60 to 100 beats per minute; below 60 is bradycardia, above 100 is tachycardia", "ECG monitor, pulse oximeter, NIBP module"],
          ["Respiratory rate", "12 to 20 breaths per minute", "Monitor impedance channel, capnograph, counting the chest"],
          ["Blood pressure", "About 120/80 mmHg; MAP = diastolic + (systolic minus diastolic) / 3", "NIBP cuff, arterial line and transducer"],
          ["Oxygen saturation (SpO2)", "95 to 100%", "Pulse oximeter"],
          ["End-tidal carbon dioxide (EtCO2)", "35 to 45 mmHg", "Capnograph"],
          ["Temperature", "37 C = 98.6 F; fever above about 38 C", "Electronic thermometer, monitor temperature probe, infrared"],
          ["Tidal volume", "About 500 mL per breath at rest", "Ventilator display, spirometer, gas flow analyzer"]
        ] },
        { type: "table", cols: ["Body system", "Key organs", "What it does", "What your devices do with it"], rows: [
          ["Circulatory", "Heart, arteries, veins, capillaries, blood", "Moves oxygen, nutrients, and waste", "ECG records its electrical activity, NIBP and arterial lines measure its pressure, defibrillators restart its rhythm"],
          ["Respiratory", "Nose, trachea, bronchi, lungs, alveoli, diaphragm", "Takes in oxygen, gives off carbon dioxide", "Ventilators move the gas, oximeters read the oxygen carried, capnographs read the CO2 breathed out"],
          ["Nervous", "Brain, spinal cord, nerves", "Senses, decides, and signals by small electrical pulses", "Brain and muscle recorders capture those pulses; stimulators and TENS units supply them"],
          ["Digestive", "Mouth, esophagus, stomach, intestines, liver, pancreas", "Breaks food down and absorbs it", "Feeding pumps deliver formula, suction removes fluid, scopes let a clinician look inside"],
          ["Urinary", "Kidneys, ureters, bladder, urethra", "Filters blood and makes urine", "Dialysis machines replace the filtering; bladder scanners measure what is left behind"],
          ["Endocrine", "Pancreas, thyroid, adrenals, pituitary", "Releases hormones that set metabolism and blood sugar", "Glucose meters and insulin pumps work on this system"],
          ["Musculoskeletal", "Bones, joints, skeletal muscle, tendons", "Holds the body up and moves it", "Therapy stimulators, CPM machines, traction, beds and lifts"],
          ["Integumentary", "Skin, hair, nails", "Barrier, temperature control, sensation", "Every electrode, probe, and cuff touches it, so skin prep, adhesives, and pressure matter"]
        ] },
        { type: "list", title: "Directional terms and word parts", cols: 2, items: [
          "Anterior is front, posterior is back; superior is above, inferior is below; medial is toward the midline, lateral is away from it; proximal is near the trunk, distal is far from it; supine is face up and prone is face down",
          "Prefixes: brady- slow, tachy- fast, hyper- high or too much, hypo- low or too little, a- and an- without, dys- difficult or painful",
          "Roots: cardio heart, pulmo and pneumo lung, nephro and reno kidney, neuro nerve, gastro stomach, derm skin, hemo blood",
          "Suffixes: -itis inflammation, -ectomy surgical removal, -oscopy looking inside, -graphy the recording process, -gram the record itself, -emia a blood condition. Put them together: tachycardia is a fast heart and electrocardiography is the process that prints the electrocardiogram"
        ] },
        { type: "table", cols: ["Heart and rhythm", "What to remember"], rows: [
          ["Four chambers", "Right atrium and right ventricle pump blood to the lungs; left atrium and left ventricle pump it to the body; the left ventricle is the thickest because it works hardest"],
          ["Valves", "Tricuspid between right atrium and right ventricle, pulmonary out to the lungs, mitral between left atrium and left ventricle, aortic out to the body; they keep flow one way"],
          ["SA node", "The natural pacemaker in the right atrium; it fires first and sets the rate. Flow path: body, right atrium, right ventricle, lungs, left atrium, left ventricle, body"],
          ["AV node", "The relay that delays the signal so the ventricles have time to fill before they squeeze"],
          ["P wave", "The atria depolarizing, the small bump before the spike"],
          ["QRS complex", "The ventricles depolarizing, the tall spike; monitors count heart rate from it and defibrillators synchronize to it"],
          ["T wave", "The ventricles recovering after the beat"],
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
          ["Current ladder", "1 A = 1,000 mA = 1,000,000 microamps; move the decimal three places per step, so 0.47 A is 470 mA"],
          ["Resistance ladder", "1 kohm = 1,000 ohm; 1 Mohm = 1,000,000 ohm = 1,000 kohm"]
        ] },
        { type: "table", cols: ["Resistor band", "Digit or meaning"], rows: [
          ["Color digits", "Black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, white 9"],
          ["First three bands", "The first two bands are the first two digits; the third band is the multiplier, meaning how many zeros to add"],
          ["Fourth band", "Tolerance: gold 5%, silver 10%, no band 20%"],
          ["Worked example", "Brown, black, red, gold = 1, 0, add two zeros = 1,000 ohm plus or minus 5%. Measure resistors out of circuit with the power off, because parts in parallel pull the reading low"]
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
          ["RMS", "The 120 V on the label is an RMS value, the effective value (the DC voltage that would deliver the same power); the waveform actually peaks near 170 V"],
          ["Transformers", "Work on AC only. More turns on the output side raises voltage, fewer turns lowers it; an isolation transformer has equal turns and just separates the two sides"],
          ["Rectifier", "Diodes inside a power supply turn AC into DC, and a capacitor then smooths the leftover ripple. AC at 60 Hz is also the frequency the heart is most vulnerable to, which is why the safety limits on this sheet are written for it"]
        ] },
        { type: "list", title: "Components and what they do", cols: 2, items: [
          "Resistor limits current and drops voltage; value in ohms, power rating in watts",
          "Capacitor stores charge, measured in farads; it can hold a dangerous charge after the power is off, so discharge before you touch",
          "Inductor or coil stores energy in a magnetic field, measured in henries; it resists sudden changes in current",
          "Diode passes current one way only, with a forward drop of about 0.6 to 0.7 V; backwards it blocks",
          "LED gives light for about 1.8 to 3.3 V, always needs a series resistor, and the longer leg is the anode (positive)",
          "Transistor works as a switch or an amplifier: a small signal on one leg controls a larger current through the other two",
          "Fuse is one-time and a breaker resets; replace a fuse with the same current and voltage rating, then find out why it blew",
          "Switch makes or breaks a path, and a relay is a switch moved by a coil so a small signal can control a big load",
          "Transformer changes AC voltage and can isolate a circuit; it does nothing on DC"
        ] },
        { type: "list", title: "Schematic symbols in words", cols: 2, items: [
          "Battery: alternating long and short lines, the long line is positive",
          "Resistor: a zigzag, or a plain rectangle on newer drawings",
          "Capacitor: two parallel plates; a curved second plate means it is polarized and must go in the right way",
          "Diode: a triangle pointing into a bar, and current flows the way the triangle points; add rays and it is an LED",
          "Switch: a line lifted away from a contact. Fuse: a loop or an S between two terminals. Lamp: a circle with an X or a loop inside",
          "Ground: three shrinking horizontal lines. Chassis ground: a small rake or hatched bracket. Signals are drawn flowing left to right"
        ] },
        { type: "table", cols: ["Wiring", "Colors and rules"], rows: [
          ["United States building and cord wiring", "Black or red is hot, white is neutral, green or bare copper is ground"],
          ["International device cords", "Brown is live, blue is neutral, green with a yellow stripe is ground"],
          ["DC leads", "Red is positive, black is negative; on a battery the terminals are marked plus and minus"],
          ["Wire gauge", "AWG numbers run backwards: a lower number is a thicker wire that carries more current, so 14 AWG is thicker than 18 AWG. Every cord entering a case needs a clamp or bushing so a pull lands on the case, not on the conductors"]
        ] },
        { type: "table", cols: ["Battery", "Voltage per cell and notes"], rows: [
          ["Alkaline", "1.5 V, single use; the standard cell in handheld instruments"],
          ["Nickel metal hydride", "1.2 V, rechargeable; a fresh pack reads a little below the alkaline number it replaces"],
          ["Lithium coin cell", "3 V; holds memory settings and real-time clocks on circuit boards"],
          ["Lithium-ion", "3.6 to 3.7 V, rechargeable; never crush, puncture, or fully drain one"],
          ["Sealed lead-acid", "2 V per cell, so a 12 V block is six cells; common in infusion pumps, carts, and beds"],
          ["Capacity", "Amp-hours or milliamp-hours: how much current for how long. Runtime falls as a pack ages even though voltage looks fine"],
          ["Stacking", "Cells in series add voltage; cells in parallel add capacity at the same voltage"]
        ] },
        { type: "list", title: "Static and bare-board handling", cols: 2, items: [
          "A static shock you can feel is roughly 3,000 V, but as little as 100 V can quietly damage a chip without any spark you notice",
          "Wear a grounded wrist strap, work on a grounded mat, and touch the chassis before you touch a board",
          "Carry boards in antistatic bags, never in a plastic tray or a shirt pocket",
          "Dry winter air makes ESD worse and humidity helps; hold boards by the edges and keep your fingers off the connector pins"
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
        { type: "list", title: "Reading an instrument", cols: 2, items: [
          "Get your eye level with the mark; looking down or up at a scale adds parallax error",
          "In a graduated cylinder read the bottom of the curved surface of the liquid, with the cylinder on a flat bench",
          "Read to the nearest printed graduation, then estimate one more digit; write down the units every time, and let the reading settle first",
          "Zero or tare the instrument before the first reading; a scale that was not zeroed is wrong by the same amount on every weight"
        ] },
        { type: "list", title: "Graphs, tables, and trends", cols: 2, items: [
          "Read the axis labels and units before the shape of the line; a flat-looking curve can be a huge swing if the scale is small",
          "A value that creeps in the same direction across several scheduled inspections predicts a failure even while it is still inside tolerance",
          "In a specification table find the row for the model, then the column for the condition, then read the limit and its units; averages hide outliers, so one bad reading in ten still means one bad device"
        ] },
        { type: "list", title: "Flowcharts and narrowing it down", cols: 2, items: [
          "Flowchart shapes: oval is start or end, rectangle is a step, diamond is a yes or no decision, arrows show the order",
          "Try the simplest and most common cause first: power, battery, connection, consumable, setting",
          "Change one thing at a time and recheck, so you know what fixed it",
          "Swap a suspected cable, probe, or accessory for a known-good one; that single test splits the problem in half",
          "Work in this order: is the patient safe, what did the user see and do, is it the accessory, is it the device. If it works in another room, the fault is not in the device"
        ] },
        { type: "list", title: "Service manuals and documentation", cols: 2, items: [
          "Service manual sections you will use: safety notices, specifications, theory of operation, setup and installation, scheduled maintenance procedure and interval, calibration, troubleshooting and error codes, parts list, schematics",
          "The instructions for use (IFU) are written for the clinician; the service manual is written for you. Both are controlled documents, so use the version that matches the model and software",
          "A work order needs: asset identification number, the problem as reported, what you found, what you did, parts used, time spent, test results with a clear pass or fail, and your name and the date",
          "If it is not written in the CMMS it did not happen; a device released without a documented safety test is a finding at the next survey"
        ] }
      ]
    },
    {
      id: "safety", title: "Safety in healthcare",
      blocks: [
        { type: "table", cols: ["Current through the body (60 Hz)", "Effect"], rows: [
          ["1 mA", "Threshold of perception, a faint tingle"],
          ["5 mA", "Accepted maximum harmless current"],
          ["10 to 20 mA", "Let-go threshold: muscles clamp and the person cannot release the conductor"],
          ["50 mA", "Pain, possible fainting, respiratory arrest"],
          ["100 to 300 mA", "Ventricular fibrillation likely"],
          ["6 A and above", "Sustained contraction and burns"],
          ["Microshock", "As little as 10 microamps delivered directly to the heart can cause fibrillation"]
        ] },
        { type: "table", cols: ["IEC 60601-1 limit", "Normal condition", "Single fault condition"], rows: [
          ["Earth (ground) leakage", "5 mA", "10 mA"],
          ["Touch (enclosure) current", "100 microamps", "500 microamps"],
          ["Patient leakage, type B and type BF", "100 microamps", "500 microamps"],
          ["Patient leakage, type CF", "10 microamps", "50 microamps"]
        ] },
        { type: "table", cols: ["NFPA 99 and facility fact", "Value"], rows: [
          ["Ground resistance, chassis to the plug ground pin (NFPA 99)", "0.5 ohm maximum for patient-care equipment"],
          ["Chassis (touch) leakage, cord-connected patient-care equipment (NFPA 99)", "500 microamps in current editions; older editions used 300 or 100 microamps, so know the limit your facility cites"],
          ["Patient care vicinity (NFPA 99)", "About 6 ft (1.8 m) out from the bed or chair and 7.5 ft (2.3 m) up from the floor"],
          ["GFCI trip (NFPA 99 wet locations)", "4 to 6 mA of imbalance between hot and neutral"],
          ["Hospital-grade receptacle", "Marked with a green dot; built for grip and a reliable ground, and checked for retention force and polarity"],
          ["Extension cords and cheater adapters", "Not used with patient-care equipment, and a three-prong to two-prong adapter defeats the ground, so it is never acceptable"],
          ["Relocatable power taps", "Only the rated and approved type, only where allowed, secured, and never daisy-chained into another tap"],
          ["Damaged cords and plugs", "Remove the device from service: a cracked plug, a missing ground pin, or a pinched cord fails the inspection on sight"]
        ] },
        { type: "list", title: "Protection classes and applied-part types", cols: 2, items: [
          "Class I: the metal case is protected by a third-wire protective earth, so ground continuity is the critical test. Class II: double insulated, no ground pin, marked with a square inside a square, and there is no ground to test. Internally powered: runs on its own battery, so it is isolated from the mains while unplugged",
          "Type B applied part (stick figure) touches the body but is not for direct cardiac connection. Type BF (stick figure in a box) is body floating, isolated from earth. Type CF (heart in a box) is cardiac floating, safe for a direct connection to the heart, and carries the tightest leakage limits",
          "Defibrillation-proof parts add the paddle symbol: the applied part survives a defibrillator discharge",
          "Macroshock crosses the skin and takes milliamps to hurt; microshock bypasses the skin through a catheter or lead and needs only microamps, which is why type CF exists"
        ] },
        { type: "table", cols: ["Electrical safety test", "Order and notes"], rows: [
          ["Full sequence", "Visual and cord inspection first, then ground resistance, then chassis leakage in each condition, then patient lead leakage; stop at the first failure and tag the device"],
          ["Leakage conditions", "Normal polarity, reversed polarity, open ground, and open neutral; leakage is worst with the ground open, which is why that case is tested"],
          ["When to test", "At incoming inspection before first patient use, after any repair that touches the power path or enclosure, and on the scheduled maintenance interval"],
          ["Trending", "Rising leakage or ground resistance across inspections means insulation or a cord is failing, so compare to the last reading and not only to the limit"]
        ] },
        { type: "list", title: "Lockout and tagout (LOTO)", cols: 2, items: [
          "Steps in order: notify everyone affected, shut the equipment down, isolate the energy source, apply your own lock and tag, release stored energy, then verify zero energy before you work",
          "Stored energy includes charged capacitors, compressed gas, springs, hydraulic pressure, raised beds and tables, and hot surfaces; one device often has several sources at once, such as mains power, a battery, and a gas supply",
          "Verify zero energy with a meter or a gauge, because an indicator light that is out is not proof the circuit is dead",
          "Only the person who placed a lock removes it, and never somebody else at shift change for convenience"
        ] },
        { type: "list", title: "Hazard communication", cols: 2, items: [
          "GHS pictograms to recognize: flame for flammable, flame over a circle for oxidizer, skull for acute toxicity, corrosion, exclamation mark for irritant, the silhouette for a longer-term health hazard, gas cylinder, and environment",
          "The safety data sheet (SDS) for every chemical has 16 numbered sections and must be reachable by staff at any hour",
          "The sections you will actually open: 2 hazards, 4 first aid, 5 fire fighting, 7 handling and storage, 8 exposure controls and PPE",
          "OSHA requires the labels, the SDS access, the training, and the records; cleaning wipes, solvents, battery electrolyte, and compressed gases all count"
        ] },
        { type: "table", cols: ["Medical gas", "Facts"], rows: [
          ["Cylinder and outlet colors (United States)", "Oxygen (O2) green, medical air yellow, nitrous oxide blue, nitrogen black, carbon dioxide gray, vacuum or suction white"],
          ["What each one is for", "Oxygen for therapy, medical air as the driving gas for ventilators, nitrous oxide for anesthesia, nitrogen for surgical tools, carbon dioxide for insufflation, vacuum for suction"],
          ["Oxygen hazard", "Oxygen supports combustion, so no oil, grease, or tape on a fitting and no ignition source nearby"],
          ["Full E cylinder", "About 2,000 to 2,200 psi and about 660 liters of gas"],
          ["Wall outlets", "About 50 psi delivered to the device"],
          ["Connections", "Small cylinders use the pin index safety system (PISS) and pipeline outlets use the diameter index safety system (DISS); each gas has its own pattern, so no adapters and no forcing"],
          ["Handling", "Cylinders chained or racked upright, caps on when not in use, full separated from empty, never left free-standing on a cart"],
          ["Zone valves", "Labeled shutoff valves that isolate the gas for one area; know where they are before you need them"]
        ] },
        { type: "list", title: "Signs, symbols, and zones", cols: 2, items: [
          "Ionizing radiation: the three-blade trefoil. Practice ALARA, keep exposure time short, stand back, use shielding, and wear your dosimeter where the badge belongs",
          "Laser doors state the class and the wavelength, and eyewear has to match that wavelength, not just be dark",
          "Biohazard symbol marks regulated waste, sharps containers, and specimen transport",
          "MRI zones I, II, III, and IV run from public to the magnet room; the magnet is always on even when nothing is scanning, so no steel tools, no oxygen cylinders, no carts",
          "MR Safe, MR Conditional, and MR Unsafe labels say whether an item may enter; conditional means only under stated limits",
          "Oxygen in use signs mean no ignition sources. The book-and-hand symbol means consult the instructions, and a triangle with an exclamation mark is a general warning"
        ] },
        { type: "list", title: "Infection control for the technician", cols: 2, items: [
          "Hand hygiene first and last, every time, and again after gloves come off",
          "Standard precautions: treat every patient's blood and body fluids as infectious regardless of diagnosis",
          "PPE on in this order: gown, mask, eye protection, gloves. Off in this order: gloves, eye protection, gown, mask",
          "An N95 respirator, fit tested, is for airborne precautions; a surgical mask is not the same thing",
          "Sharps go straight into the sharps container, never in a pocket, a tray, or regular trash",
          "Spaulding levels: critical items that enter sterile tissue are sterilized, semi-critical items that touch mucous membranes get high-level disinfection, non-critical items that touch intact skin get low-level disinfection",
          "A device is cleaned and wiped down before it comes to your bench, and you clean it again before it goes back to the floor"
        ] },
        { type: "list", title: "Device-specific hazards", cols: 2, items: [
          "X-ray and CT: time, distance, and shielding; stand behind the barrier, wear the dosimeter, and never hold a cassette by hand",
          "Defibrillator: the capacitor holds a lethal charge after charging. Call clear, let nobody touch the bed, and disarm or dump the charge into the analyzer before you open anything",
          "Electrosurgery (ESU): current returns through a pad, so a partly lifted return electrode concentrates the current and burns the patient; check the pad, the cable, and the alarm that watches them",
          "Centrifuge: never open the lid while the rotor spins, inspect the rotor for cracks and corrosion, and keep loads balanced",
          "Lasers: wavelength-matched eyewear for everyone in the room, door interlocks, and no reflective instruments in the beam path",
          "Fire: RACE is rescue, alarm, confine, extinguish. PASS is pull, aim, squeeze, sweep. Classes are A ordinary combustibles, B flammable liquids, C energized electrical, K kitchen oils",
          "Mechanical: beds, tables, and lifts have pinch points and heavy moving parts. Block them before reaching in, lift with your legs and a straight back, and get help or a cart for anything awkward"
        ] }
      ]
    },
    {
      id: "devices", title: "Medical devices and test equipment",
      blocks: [
        { type: "table", cols: ["Diagnostic device", "What it does", "A key check"], rows: [
          ["Otoscope", "Lights and magnifies the ear canal", "Lamp output, battery or charger contacts, clean specula"],
          ["Ophthalmoscope", "Lights and focuses on the back of the eye", "Lamp, lens wheel detents, clean optics with lens tissue only"],
          ["Thermometer", "Reads temperature by thermistor probe used oral, axillary, or rectal; infrared ear or forehead; disposable single-use strip", "Compare against a reference thermometer; probe type must match the device"],
          ["Scale", "Weighs a patient standing, sitting, or in a bed", "Zero empty, then check with certified test weights at low, middle, and high load"],
          ["Bladder scanner", "Ultrasound measurement of urine volume left in the bladder", "Probe surface condition, battery, and the stored reference check"],
          ["EKG cart", "Records the twelve-lead diagnostic tracing on paper or to the chart", "Lead wires and cable continuity, paper and print quality, simulator tracing on every lead"],
          ["Microscope", "Magnifies specimens for the laboratory", "Illumination, stage movement, objective cleanliness, no fingerprints on optics"],
          ["Centrifuge", "Spins samples to separate them by density", "Speed with a tachometer, timer accuracy, lid interlock, rotor condition"]
        ] },
        { type: "table", cols: ["Monitoring parameter", "Normal value", "How it is verified", "Common false alarm"], rows: [
          ["ECG and heart rate", "60 to 100 beats per minute", "Patient simulator at several rates and amplitudes", "Loose or dried-out electrode reading as asystole or a lead-off alarm"],
          ["NIBP", "About 120/80 mmHg", "NIBP analyzer for pressure accuracy plus a cuff leak test", "Wrong cuff size or a moving arm; a small cuff reads high"],
          ["SpO2", "95 to 100%", "SpO2 simulator or finger phantom, plus a probe and cable check", "Motion, poor perfusion, cold fingers, or nail polish"],
          ["EtCO2", "35 to 45 mmHg", "Known calibration gas and a gas analyzer", "Water in the sample line or an occluded sidestream tube"],
          ["Temperature", "37 C = 98.6 F", "Resistance box or reference thermometer at two points", "Probe off the patient reading room temperature"],
          ["Telemetry", "Same vitals, sent by radio", "Signal strength and battery, then a simulator through the transmitter", "Dropouts from dead batteries or a coverage hole, not a real rhythm change"]
        ] },
        { type: "table", cols: ["Therapeutic device", "What it delivers", "Settings", "The maintenance check"], rows: [
          ["Large-volume infusion pump", "Fluid or medication through a set into a vein", "Rate in mL/h, volume to be infused", "Flow accuracy, occlusion pressure, alarms, battery runtime"],
          ["Syringe pump", "Very small, precise volumes from a syringe", "Rate, syringe brand and size", "Correct syringe profile selected, plunger grip, flow accuracy at a low rate"],
          ["PCA pump", "A patient-pressed dose with lockouts", "Dose, lockout interval, hourly limit", "Lockout timing, key and lock security, dose history log"],
          ["Feeding pump", "Formula into the stomach or intestine", "Rate and volume", "Flow accuracy; the set connector is deliberately incompatible with a vein line"],
          ["Suction regulator", "Negative pressure to remove fluid", "Vacuum level, continuous or intermittent", "Gauge accuracy against a reference, leak check, canister and filter"],
          ["Defibrillator and AED", "A measured shock to restart an organized rhythm", "Energy in joules, synchronized or not, pacing on some units", "Delivered energy, charge time, synchronization, battery, pads in date, self-test log"],
          ["Patient warming and cooling", "Warm or cool air or water to hold body temperature", "Set temperature and a high limit", "Temperature accuracy, over-temperature cutoff, filters, hose condition"],
          ["Sequential compression device (SCD)", "Timed squeeze on the legs to keep blood moving", "Pressure and cycle time", "Pressure accuracy, hose and sleeve leaks, cycle timing"],
          ["Therapy equipment: TENS and CPM", "TENS sends small pulses for pain; a CPM machine moves a joint through a set range", "Pulse amplitude and rate; range of motion and speed", "Output level, electrode and cable condition, range limits and the stop control"]
        ] },
        { type: "table", cols: ["Defibrillator number", "Value"], rows: [
          ["Biphasic adult shock", "120 to 200 J, depending on the manufacturer's protocol"],
          ["Monophasic adult shock", "360 J"],
          ["Pediatric dosing", "2 to 4 J/kg of body weight"],
          ["Analyzer load", "The analyzer presents a 50 ohm load, which stands in for the patient's chest"],
          ["Charge time", "Timed from the charge button to the ready tone, and a slow charge usually means an aging battery or capacitor"],
          ["Synchronized mode", "Times the shock to the QRS complex for an organized rhythm; defibrillation of a chaotic rhythm is unsynchronized. Compare delivered joules at low, middle, and maximum settings against the manufacturer's tolerance"]
        ] },
        { type: "table", cols: ["Infusion number or alarm", "Meaning"], rows: [
          ["Rate", "Programmed in mL/h; the pump moves the set volume per hour, not drops per minute"],
          ["Volume to be infused (VTBI)", "How much to give before the pump stops and alarms"],
          ["Keep vein open (KVO)", "A small trickle after the volume finishes so the line does not clot"],
          ["Flow accuracy check", "Collect into a graduated cylinder for 30 minutes and double it, or use an infusion analyzer; typical specification is plus or minus 5%"],
          ["Occlusion alarm", "Pressure above the threshold: a clamp left closed, a kink, or a blocked site"],
          ["Air-in-line alarm", "The ultrasonic detector sees bubbles; purge the set properly on setup"],
          ["Free-flow protection", "The set clamps itself when it is removed from the pump, so gravity cannot dump the bag into the patient"]
        ] },
        { type: "table", cols: ["Hand tool", "The job", "The misuse to avoid"], rows: [
          ["Graduated cylinder", "Measuring collected volume for a flow check", "Reading it in your hand or above eye level"],
          ["Stopwatch", "Timing a collection, a charge, or a cycle", "Starting it after the pump, which shortens the interval"],
          ["Allen (hex) keys, metric and SAE", "Socket-head screws on covers and shafts", "Forcing a metric key into an SAE socket and rounding it out"],
          ["Torque wrench", "Tightening to a value in inch-pounds or newton-meters", "Using it as a breaker bar, or guessing instead of looking up the value"],
          ["Channel locks", "Gripping large round fittings and nuts", "Turning finished hardware with them and chewing it up; use a wrench"],
          ["Needle-nose pliers", "Reaching, bending, and holding small parts", "Cutting hard wire with the tips and springing the jaws"],
          ["Diagonal cutters", "Cutting wire and ties flush", "Prying or twisting with them"],
          ["Wire stripper", "Removing insulation at the right gauge notch", "Using a knife or the wrong notch and nicking the copper"],
          ["Vice grips", "Clamping a part or a stuck fastener temporarily", "Using them on good hardware as a wrench"],
          ["Torx and security bits", "Opening medical enclosures that are meant to stay closed to users", "Driving a Torx screw with a flat blade"],
          ["Nut drivers", "Hex-head screws and standoffs in cases", "Reaching for pliers instead and marking the hardware"]
        ] },
        { type: "table", cols: ["Test instrument", "What it verifies", "How to use it"], rows: [
          ["Digital multimeter (DMM)", "Voltage, current, resistance, continuity", "Volts across a part with the power on, amps in series with the circuit, ohms and continuity only with the power off"],
          ["Electrical safety analyzer", "Ground resistance and leakage currents", "Follow the sequence: visual, ground resistance, chassis leakage in each fault condition, patient lead leakage"],
          ["Patient simulator", "Monitors and recorders, by producing ECG, SpO2, respiration, NIBP, and temperature signals", "It supplies signals and draws no current from the patient, so it tests the monitor, not the patient circuit safety"],
          ["Defibrillator analyzer", "Delivered energy, charge time, synchronization", "Discharge into its 50 ohm load and compare joules at several settings"],
          ["Infusion analyzer", "Flow rate and occlusion pressure", "Or do it with a graduated cylinder and a stopwatch when no analyzer is free"],
          ["Tachometer", "Rotational speed in RPM", "Optical or contact reading on a centrifuge or blower"],
          ["Calibration weights", "Scales", "Certified weights at low, middle, and high load, and the weights carry their own due date"],
          ["Pressure meter or manometer", "Cuffs, suction regulators, and gas regulators", "Tee it in at the patient connection so it reads what the patient would see"]
        ] },
        { type: "note", text: "Every piece of test equipment carries its own calibration sticker and due date. A reading taken with an out-of-calibration instrument proves nothing, so check the sticker before you check the device." },
        { type: "list", title: "Incoming inspection, in order", cols: 2, items: [
          "Check the shipment against the packing slip and the purchase order before anything else",
          "Inspect physically for shipping damage, then confirm the model, serial number, and voltage rating",
          "Account for accessories, batteries, power cords, and the manuals, and file the service manual and the IFU",
          "Assign an asset tag and create the record in the CMMS with model, serial, location, owner, and the maintenance schedule",
          "Perform the electrical safety test and record the numbers as the baseline for all future comparisons",
          "Perform the function test from the manual, then set the configuration, alarm limits, and clock the way the department wants",
          "Train the users or arrange the in-service, then release the device and document the release"
        ] },
        { type: "list", title: "Scheduled maintenance (PM), in order", cols: 2, items: [
          "Visual inspection: case, cord, plug, strain relief, connectors, labels, wheels, filters, and anything missing",
          "Clean the device and its filters, inside and out as the manual allows",
          "Electrical safety test: ground resistance and leakage, compared against the limit and the previous reading",
          "Function and performance checks against the manual's tolerances, using calibrated test equipment",
          "Replace the consumables on the list: batteries, filters, seals, tubing, and the dated accessories",
          "Apply the inspection label with the date due, and document the results, parts, and time in the CMMS"
        ] },
        { type: "list", title: "First checks when something does not work", cols: 2, items: [
          "Is it powered: plugged in, switch on, breaker set, battery charged, and is the outlet itself live",
          "Fuse or circuit breaker on the device, and if a fuse blew, why",
          "Cables and connectors: reseat them, look for bent pins, cuts, and strain at the ends",
          "Swap the accessory, probe, or lead wire for a known-good one before you open the device",
          "User or device: watch the task performed the way the clinician does it; most calls are setup, supplies, or settings",
          "Look up the error code in the manual, note the exact wording, and restart only after you have recorded the state",
          "Know when to stop: escalate to the vendor or a senior technician, and document everything either way"
        ] }
      ]
    },
    {
      id: "it", title: "Healthcare IT",
      blocks: [
        { type: "table", cols: ["Computer part", "What it does"], rows: [
          ["CPU", "The processor that runs the instructions; its speed and cooling set performance"],
          ["RAM", "Fast working memory, and it is volatile: everything in it is gone when power drops"],
          ["HDD and SSD", "An HDD is a spinning magnetic drive with moving parts that fail, and clicking is its warning; an SSD is solid-state with no moving parts, faster and better on a cart that gets bumped"],
          ["GPU", "Draws the display, and the part that matters on imaging review workstations"],
          ["Power supply", "Converts wall AC into the DC voltages the board needs; a failing one causes random reboots"],
          ["Motherboard", "The board everything plugs into, carrying the buses between parts"],
          ["BIOS and UEFI", "The firmware that starts the machine and finds the boot device; UEFI is the modern version"],
          ["Operating system and drivers", "The operating system manages the hardware and runs the applications; drivers are the small programs that let it talk to one specific device, and wrong or missing drivers are the classic after-update failure"],
          ["Printers", "A local printer plugs into the machine by USB; a network printer has its own IP address and prints for everyone"]
        ] },
        { type: "table", cols: ["Connector", "Where you see it"], rows: [
          ["USB-A, USB-B, USB-C, micro-USB", "Rectangular host port, square-ish device port, the reversible oval, and the small legacy plug on handhelds"],
          ["HDMI and DisplayPort", "Current digital video and audio to a monitor"],
          ["VGA and DVI", "Older video: VGA is analog with a blue fifteen-pin shell, DVI is the white digital connector"],
          ["RJ45", "The eight-pin network jack on Cat5e or Cat6 cable"],
          ["Fiber", "Glass strands for long runs and for electrical isolation between buildings"],
          ["RS-232 serial, often on a DB9 shell", "The nine-pin serial port still used to configure and pull data from medical devices"]
        ] },
        { type: "table", cols: ["Network term", "Meaning"], rows: [
          ["LAN and WAN", "A LAN is one building or campus; a WAN links sites across distance"],
          ["Switch", "Connects wired devices inside a LAN and forwards traffic only to the port that needs it"],
          ["Router and default gateway", "A router joins networks; the default gateway is the address a device sends traffic to when the destination is on another network"],
          ["IP address and subnet mask", "The address identifies the device; the mask says which part of it is the network"],
          ["DHCP", "Hands out addresses automatically; medical devices often get a reservation so the address never changes"],
          ["DNS", "Turns names into addresses; if an address works but the name does not, suspect DNS"],
          ["Wi-Fi and Bluetooth", "Wi-Fi on 2.4 GHz reaches farther and 5 GHz is faster with less interference, secured with WPA2 or WPA3; Bluetooth is short-range pairing for probes, printers, and handheld scanners"],
          ["RFID and RTLS", "Tags and readers that locate equipment; a real-time location system is how a hospital finds its pumps"],
          ["VLAN and VPN", "A VLAN is a logical network inside the switch, and medical devices usually live on their own away from office traffic; a VPN is an encrypted tunnel, which is how a vendor should reach a device for remote service"],
          ["IDF and MDF", "The main distribution frame is the building's core data room; an intermediate distribution frame is the floor closet that feeds the jacks"],
          ["Server rack and patch panel", "Rack units hold the gear; the patch panel is where every wall jack terminates and gets a short cable to a switch port"],
          ["WMTS", "Protected radio bands reserved for patient telemetry so consumer devices cannot step on them"]
        ] },
        { type: "table", cols: ["Command", "What it tells you"], rows: [
          ["ipconfig", "The device's own IP address, subnet mask, and default gateway, which is where every network call starts"],
          ["ping", "Whether a destination answers, how long it takes, and how many packets were lost; ping the gateway first, then the server"],
          ["Same subnet or not", "With a /24 mask, devices sharing the first three numbers of the address are on the same subnet and can talk without a router"]
        ] },
        { type: "list", title: "Privacy rules you work under", cols: 2, items: [
          "HIPAA protects PHI, any health information that can be tied to a person: name, dates, identifiers, images, and the readings on a screen",
          "Minimum necessary: see and share only what the job requires, and that applies to a technician at a bedside too",
          "The privacy rule governs who may see PHI; the security rule requires administrative, physical, and technical safeguards; a breach has reporting duties with deadlines",
          "The EMR is the patient's electronic chart, and device integration pushes vitals and waveforms from your equipment straight into it, so a wrong patient assignment becomes a charting error",
          "Wipe or destroy storage before a device leaves the hospital for trade-in, loan return, or disposal; a certificate of destruction or a documented multi-pass overwrite, often called a DoD wipe, is the record that it happened",
          "No patient details in photos, texts, or work order notes, and nothing on a screen in the background of a picture",
          "An outside service company handling PHI signs a business associate agreement before it touches anything"
        ] },
        { type: "list", title: "Security habits", cols: 2, items: [
          "Lock the screen every time you walk away, even for a minute at a nurse station",
          "Long passphrases, unique per system, with multi-factor authentication (MFA) wherever it is offered",
          "Phishing arrives as urgency plus a link: do not click, do not reply, report it the way your facility asks",
          "Patch medical devices only on the vendor's validated schedule; an unapproved update can take a device out of service or out of specification",
          "No unknown USB drives in a clinical machine, and no personal drives for transferring device data",
          "Firewalls at the edge and a separate VLAN for devices that cannot be patched; least privilege on every account",
          "Report a suspected incident immediately, disconnect the device from the network if told to, and do not try to clean it yourself"
        ] }
      ]
    },
    {
      id: "career", title: "Your career",
      blocks: [
        { type: "table", cols: ["Credential", "What it is for", "When you qualify"], rows: [
          ["CABT", "Proof you know the fundamentals and can be trusted on a hospital floor; the credential this course targets", "Now: high school junior or above, no experience required. 100 questions in 2 hours, valid 5 years and non-renewable"],
          ["CBET", "The working technician's credential, and the one most job postings name", "Candidate status opens at an associate degree or higher in electronics, technology, or science, a United States military biomedical equipment technology program, or two years of full-time BMET work, any one of those alone, with five years to finish. Full certification needs one of: that degree plus two years of BMET work, the military program plus two years, or four years of full-time BMET work alone. 165 questions in 3 hours, offered in May and November, $410 member and $460 non-member, recertified every 3 years"],
          ["CRES", "The imaging specialist: radiography, fluoroscopy, and the high-voltage side of the shop", "After experience in imaging service. Also 165 questions in 3 hours"],
          ["CHTM", "The management credential: budgets, staff, regulations, and program strategy", "After experience leading a healthcare technology management program"]
        ] },
        { type: "note", text: "The ladder runs associate, then technician, then specialist or manager, and each rung is its own exam. The associate credential is the one that does not renew, so plan the next step inside those 5 years." },
        { type: "table", cols: ["Where the jobs are", "What the work looks like"], rows: [
          ["Hospital in-house HTM department", "A mixed bench, scheduled maintenance, and the whole equipment fleet; the most common first job"],
          ["Independent service organization (ISO)", "Contract service across several facilities, heavier travel, broad exposure"],
          ["Manufacturer field service", "Deep knowledge of one product line, factory training, OEM parts and tools, and a territory"],
          ["Military and government", "Structured training and advancement, rotating assignments"],
          ["Clinics, surgery centers, and dialysis", "Smaller fleets, more autonomy, and you are often the only technician"]
        ] },
        { type: "list", title: "Your first ninety days", cols: 2, items: [
          "Shadow everyone you can and write down what you see; the hospital's own habits are not in any manual",
          "Learn the CMMS the first week: how to open, update, and close a work order and where the equipment history lives",
          "Document everything you touch, including the calls that turned out to be nothing",
          "Ask before you guess, especially near a patient; nobody is upset about a question, and everybody remembers a mistake",
          "Do the safety habits every single time until they are boring: hand hygiene, the visual check, the safety test, the label, the record",
          "Keep a notebook of error codes, part numbers, and who to call; record the exact wording of a code and what the device was doing when it appeared",
          "In an interview, answer with the STAR pattern: the situation, the task you had, the action you took, and the result"
        ] }
      ]
    }
  ]
};
