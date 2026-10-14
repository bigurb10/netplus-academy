// CRES Academy memorization sheet for the AAMI/ACI CRES exam. Numbers, limits, formulas, device facts,
// standards, and orders of steps an imaging technician must recall cold. Original content. Safety limits name their standard.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CRES Memorization Sheet",
  intro: "Print this and keep it beside you. The CRES exam rewards recall of dose limits, the inverse square law, tube and generator relationships, QC tolerances, regulators and what each asks for, and the network tools of the imaging department. Every number on this sheet is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Certifying body", "AAMI Credentials Institute (ACI), the credentialing arm of AAMI"],
          ["Questions and time", "165 multiple-choice questions in 3 hours, closed book; on-screen calculator and notepad only"],
          ["Delivery and windows", "Computer-based at Kryterion centers, travel up to 100 miles; twice a year, May 1 to 15 and November 1 to 15"],
          ["The six domains", "Anatomy and Physiology 7 percent; Public Safety in the Healthcare Facility 8; Fundamentals of Electricity and Electronics 10; Healthcare Technology and Function 25; Healthcare Technology Problem Solving 25; Healthcare Information Technology 25"],
          ["Passing", "A criterion-referenced cut score set by the modified Angoff method; no cut score is published"],
          ["Results", "Pass or fail on screen and by email within 24 hours; those who do not pass also get a scaled score and an analysis of performance"],
          ["Fee", "$410 member, $460 non-member; retake $355 member, $405 non-member"],
          ["Retakes and recertification", "60 days between attempts, three attempts in two years, then a one-year wait; recertify every three years with continuing education"],
          ["Where the points are", "Function, problem solving, and informatics are 75 percent; the first three domains are 25 percent"]
        ] },
        { type: "table", cols: ["Eligibility pathway", "What it requires"], rows: [
          ["Pathway 1, education", "An associate degree or higher in an electronics, technology, or science program plus two years of full-time BMET work"],
          ["Pathway 2, military", "A United States military biomedical equipment technology program plus two years of full-time BMET work"],
          ["Pathway 3, experience", "Four years of full-time BMET work"],
          ["Radiology specialty clause", "Full certification also requires at least 40 percent of work experience in the radiology specialty over the last two years, with 25 percent over the last five years"],
          ["Candidate status", "The degree alone, the military program alone, or two years of work alone earns candidate status, not full certification"],
          ["Credential ladder", "CABT entry associate, CBET general technician, CRES imaging specialist, CHTM manager; all four are ACI credentials inside HTM"]
        ] },
        { type: "note", text: "This course's official-format test uses 70%, the same bar as our CBET course; ACI publishes no cut score." }
      ]
    },
    {
      id: "positioning", title: "Anatomy, positioning, and terminology",
      blocks: [
        { type: "table", cols: ["Direction or position terms", "Plain meaning"], rows: [
          ["Anterior (ventral), posterior (dorsal)", "Toward the front; toward the back"],
          ["Superior, inferior", "Toward the head; toward the feet"],
          ["Medial, lateral", "Toward the midline; away from it"],
          ["Proximal, distal", "Nearer the trunk or attachment; farther from it"],
          ["Supine, prone, erect, recumbent", "Face up; face down; upright; lying down in any position"],
          ["Lateral decubitus", "On a side, horizontal beam; right or left names the down side"],
          ["Dorsal and ventral decubitus", "On the back, or face down, horizontal beam crossing side to side"]
        ] },
        { type: "table", cols: ["Projection or position", "Beam path and equipment"], rows: [
          ["AP", "Enters the front, exits the back; patient supine or erect facing the tube"],
          ["PA", "Enters the back, exits the front; patient faces the receptor, so less magnification"],
          ["Lateral", "Crosses side to side; the named side is against the receptor"],
          ["Oblique: RAO, LAO, RPO, LPO", "Body rotated between frontal and lateral, tube and receptor square. RAO right front to the receptor, LAO left front, RPO right back, LPO left back"],
          ["Axial, tangential", "Along the long axis of the part; or skimming a surface to clear other anatomy"],
          ["Decubitus", "Lying down with a horizontal beam, so air and fluid levels show"]
        ] },
        { type: "table", cols: ["Plane, line, or landmark", "How it divides, or where it runs"], rows: [
          ["Sagittal, median (midsagittal)", "Vertically into left and right; the median plane into equal halves"],
          ["Midcoronal", "Vertically into anterior and posterior parts"],
          ["Transverse (axial)", "Horizontally into superior and inferior parts; state the level"],
          ["Orbitomeatal, infraorbitomeatal", "Outer canthus of the eye, or just below the eye, to the auricular point (ear canal)"],
          ["Glabellomeatal, acanthiomeatal", "The glabella between the eyebrows, or the acanthion where nose meets upper lip, to the auricular point"],
          ["T1", "About 2 inches above the sternal notch"],
          ["T2 to T3, then T4 to T5 disc spaces", "The sternal notch at the jugular; then the sternal angle"],
          ["T6 to T7 disc space, then T10", "The lower end of the scapula; then the xiphoid tip"],
          ["Column count", "33 bones: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral, coccyx of 4 fused"]
        ] },
        { type: "table", cols: ["Body habitus", "Share", "Where the organs sit"], rows: [
          ["Hypersthenic", "About 5 percent", "Massive, broad deep midsection, ribs nearly parallel to the floor; high diaphragm, short wide heart, high transverse medial stomach, high outside gallbladder, colon framing the abdomen; most exposure"],
          ["Sthenic", "About 50 percent", "The average athletic build technique charts are based on; ribs sloping down, stomach high and left, colon evenly spread, gallbladder centered right"],
          ["Hyposthenic", "About 35 percent", "More slender than sthenic; stomach and gallbladder high; less exposure"],
          ["Asthenic", "About 10 percent", "Frail and slim, long shallow narrow midsection; heart nearly vertical at the midline, low medial stomach, low midline gallbladder, low colon; least exposure"],
          ["Why it matters", "6 to 8 inches", "Habitus shifts the diaphragm, stomach, gallbladder, heart, and lungs that far, so centering and collimation change with build"]
        ] },
        { type: "table", cols: ["System", "Key organs", "What imaging shows", "One pathology"], rows: [
          ["Circulatory", "Heart, arteries, veins, capillaries", "Angiographic and interventional runs; heart size on a chest image", "Arterial stenosis"],
          ["Respiratory", "Trachea, bronchi, lungs, diaphragm, pleura", "Chest radiography: air, fluid, lung markings", "Pneumonia, pneumothorax"],
          ["Gastrointestinal", "Esophagus, stomach, intestines, liver, gallbladder, pancreas", "Contrast swallows and enemas, abdominal series, fluoroscopy of motion", "Obstruction, ulcer"],
          ["Urinary", "Kidneys, ureters, bladder, urethra", "Contrast studies of the collecting system", "Stones"],
          ["Musculoskeletal", "Bones, joints, muscles, tendons", "Most plain-film work: alignment, cortex, joint spaces", "Fracture, arthritis"],
          ["Nervous", "Brain, spinal cord, peripheral nerves", "Skull and spine positioning; cross-sectional for soft tissue", "Disc herniation, bleed"],
          ["Endocrine", "Thyroid, parathyroid, adrenals, pancreas, pituitary", "Thyroid uptake work, neck soft tissue", "Thyroid nodule"],
          ["Lymphatic", "Nodes, spleen, thymus, tonsils", "Node chains and spleen on cross-sectional work", "Enlarged nodes"]
        ] },
        { type: "list", title: "Word parts and the abdominal map", cols: 2, items: [
          "Prefixes: brady- slow, tachy- fast, hyper- above normal, hypo- below normal, a- or an- without, dys- difficult, peri- around, endo- inside, retro- behind, sub- under",
          "Roots: cardi heart, pulmo or pneumo lung, nephro or reno kidney, hepat liver, gastro stomach, entero intestine, osteo bone, arthro joint, encephal brain, mammo breast, angio vessel",
          "Suffixes: -itis inflammation, -ectomy removal, -ostomy opening, -oscopy viewing, -graphy recording, -gram the record, -algia pain, -megaly enlargement, -oma tumor, -osis condition",
          "Map: the median and a transverse plane cross at the navel to give four quadrants; anatomically there are nine regions (hypochondrium, epigastrium, lumbar, umbilical, iliac, hypogastrium)",
          "Requisition words: bilateral both sides, unilateral one, ipsilateral same side, contralateral opposite, portable at the bedside, stat now"
        ] }
      ]
    },
    {
      id: "radiation", title: "Radiation: quantities, limits, and protection",
      blocks: [
        { type: "table", cols: ["Quantity", "Unit and conversion"], rows: [
          ["Exposure and air kerma", "Roentgen (R), and 1 R = 2.58 x 10 to the minus 4 C/kg in SI units; air kerma in gray (Gy) is the SI replacement"],
          ["Absorbed dose", "Gray (Gy), or rad; 1 Gy = 100 rad"],
          ["Equivalent dose", "Sievert (Sv), or rem; 1 Sv = 100 rem"],
          ["Effective dose", "Sievert, weighted for radiation type and tissue sensitivity"],
          ["Prefixes", "milli a thousandth (mSv, mGy, mR), micro a millionth; 1 mSv = 1000 microsieverts"]
        ] },
        { type: "table", cols: ["Dose limit (annual unless stated)", "Value"], rows: [
          ["Occupational effective dose", "50 mSv per year, and a cumulative limit of 10 mSv x age in years"],
          ["Occupational organ limits", "Lens of the eye 150 mSv per year; thyroid, skin, hands, and feet 500 mSv per year"],
          ["Public", "1 mSv per year frequent exposure, 5 mSv infrequent"],
          ["Embryo or fetus", "5 mSv over the gestation; 0.5 mSv in any month once declared"],
          ["Education and training, under 18", "1 mSv per year"],
          ["Natural background", "About 3 mSv per year, radon the largest part; one chest image about 0.02 mSv"]
        ] },
        { type: "table", cols: ["Cardinal rule or law", "What it says"], rows: [
          ["Time, distance, shielding", "Dose rises with beam-on time; distance is the strongest control, so one step back beats any apron; shielding is aprons, mobile shields, the booth barrier, and lead in the walls"],
          ["Inverse square law", "I1 / I2 = (d2 / d1) squared. Double the distance, one quarter the intensity. Halving a fluoroscope's skin distance from 40 cm to 20 cm raises entrance exposure about four times"],
          ["ALARA", "As low as reasonably achievable: lowest technique, smallest field, fewest exposures"]
        ] },
        { type: "table", cols: ["Protective apparel and barrier", "Specification"], rows: [
          ["Aprons and gloves", "0.25, 0.5, and 1 mm lead equivalent; at least 0.25 mm Pb required, 0.5 mm Pb normal. At 75 kVp, 0.25 mm Pb attenuates about 66 percent and 1 mm Pb about 99 percent, but 1 mm can weigh 12 kg (25 lb)"],
          ["Thyroid and gonadal shields", "Used and inspected like an apron; read the lead equivalent marked on the garment"],
          ["Inspection and retirement", "Fluoroscope or radiograph every apron, glove, and shield at least yearly, or use 120 kVp at 10 mAs radiography; replace on cracks, tears, or holes; store on racks"],
          ["Gonadal shielding practice", "Cuts ovary dose about 50 percent, testicular about 95 percent; use within about 0.5 cm of the primary beam. Flat contact shields lie on the patient, shadow shields hang in the beam"],
          ["Bucky slot cover and curtain", "Each at least 0.25 mm Pb equivalent; the cover closes the roughly 5 cm gap at gonadal level"],
          ["Barriers and mobile work", "The fluoroscopic receptor assembly is a primary barrier of at least 2 mm Pb, interlocked so the tube cannot energize parked; the booth is about 1/16 inch lead equivalent; a mobile switch must reach 2 m from the tube"]
        ] },
        { type: "table", cols: ["Fluoroscopy limit", "Value"], rows: [
          ["Tabletop intensity", "Not above 10 R/min (100 mGy/min) without high-level control, 20 R/min (200 mGy/min) with it, and not above 2.1 R/min (21 mGy/min) per mA at 80 kVp. No limit while recording"],
          ["Cumulative timer", "Audible signal at 5 minutes of beam-on time; record beam-on time every exam"],
          ["Minimum source-to-skin distance (SSD)", "Not less than 38 cm stationary, not less than 30 cm mobile"],
          ["Control, filtration, collimation", "Dead-man control stops the beam on release; total filtration at least 2.5 mm Al equivalent; an unexposed border must show with the input phosphor 35 cm above the tabletop"]
        ] },
        { type: "table", cols: ["MRI safety item", "What to know"], rows: [
          ["Zones", "Zone I public, Zone II reception and screening, Zone III controlled and badged, Zone IV the magnet room"],
          ["Field and the 5-gauss line", "1 T = 10,000 gauss, a common magnet is 3 T, the field is never off. The posted 5-gauss line marks where an implant or pacemaker can be disturbed, so screening happens before it"],
          ["Projectiles and screening", "Any ferromagnetic tool, cylinder, or cart becomes a missile; screen every person and item every time. Labels are MR Safe, MR Conditional, or MR Unsafe"],
          ["Quench and cryogens", "Loss of superconduction boils off the cryogen; the quench pipe vents outside, a room-side release displaces oxygen. Liquid helium boils at 4 K, nitrogen at 77 K"],
          ["RF energy and EMI", "Deposited RF heats tissue, so looped leads and damaged coils cause burns. The scanner also interferes with nearby monitors and pumps, and a noisy device spoils the image"]
        ] },
        { type: "note", text: "Pregnancy and pediatrics: ask, then declare. Once declared, the 0.5 mSv monthly limit applies to the embryo or fetus. Shield what is not being imaged, collimate to the anatomy, use the lowest technique that answers the question, immobilize rather than repeat, and use a gonadal shield whenever it will not cover the region of interest. Children are more radiosensitive because dividing cells are the most sensitive cells there are." }
      ]
    },
    {
      id: "regulation", title: "Regulators, standards, and what each asks for",
      blocks: [
        { type: "table", cols: ["Body", "What it does and what it asks you for"], rows: [
          ["FDA", "Regulates devices and radiation-emitting products through CDRH, which carries the work the former BRH began; publishes the standards in 21 CFR 1020 and runs recalls and device reporting"],
          ["State radiation control programs", "Register every tube, inspect rooms, set operator and posting rules; CRCPD is where those programs write their shared suggested regulations"],
          ["NRC", "Licenses byproduct radioactive material, so nuclear medicine carries its own licence, surveys, and records"],
          ["CMS and TJC", "CMS sets the conditions of participation and may survey directly; The Joint Commission surveys environment of care, asking for the inventory, maintenance strategy, PM completion, test records, and inspection history"],
          ["MQSA and ACR", "Federal mammography law under the FDA: accreditation, annual inspection, an annual medical physicist survey, personnel qualifications, a written QC program. ACR accredits facilities and publishes the phantoms"],
          ["OSHA", "Worker safety: hazard communication, bloodborne pathogens, electrical practice, and the PPE the employer must supply"],
          ["ANSI and AAMI", "The equipment-management standards a technology program is written against; ANSI accredits the process, AAMI writes the content"],
          ["NCRP and NEMA", "NCRP publishes the dose limits and shielding reports barriers are designed from; NEMA carries manufacturer standards such as focal spot tolerances"]
        ] },
        { type: "table", cols: ["Federal performance number", "Limit"], rows: [
          ["Tube housing leakage radiation", "Less than 100 mR/h (about 1 mGy/h) at 1 m from the housing"],
          ["AEC backup timer", "Must end the exposure at 6 s or 600 mAs, whichever comes first"],
          ["Light field to x-ray field", "Within 2 percent of the SID; at a 100 cm SID that is 2 cm"],
          ["Console and geometry indicators", "PBL within 2 percent of the SID, the SID indicator within 2 percent, and the console must show exposure conditions and that the tube is energized"],
          ["Minimum total filtration", "At least 2.5 mm Al above 70 kVp, 1.5 mm Al from 50 to 70 kVp, 0.5 mm Al below 50 kVp"]
        ] },
        { type: "table", cols: ["Minimum HVL (mm Al) by waveform", "30 kVp", "50 kVp", "70 kVp", "90 kVp", "130 kVp"], rows: [
          ["Single phase", "0.3", "1.2", "1.6", "2.6", "3.6"],
          ["Three phase or high frequency", "0.4", "1.5", "2.0", "3.1", "4.2"]
        ] },
        { type: "table", cols: ["CMMS record", "What it must hold"], rows: [
          ["Equipment inventory", "Every device by control number, model, serial number, location, risk class, and interval; the first thing a surveyor asks for"],
          ["Work order", "Who, what, when, the symptom in the caller's words, the finding, parts, labor, and readings after the repair"],
          ["PM due list", "What is due, what is overdue, and the completion rate by area"],
          ["Service history and recalls", "Every visit on a device, vendor reports included, so repeat failures show; plus which devices a notice touches and what was done"],
          ["Compliance and performance reports", "PM completion, failures, downtime, and cost per device for management review"]
        ] }
      ]
    },
    {
      id: "electricity", title: "Electricity, electronics, and imaging power",
      blocks: [
        { type: "table", cols: ["Formula", "Statement"], rows: [
          ["Ohm's law", "V = I x R; I = V / R; R = V / I"],
          ["Power", "P = V x I; P = I squared x R; P = V squared / R, in watts"],
          ["Series and parallel", "Series: one path, resistances add, same current, voltages add. Parallel: several paths, reciprocals add, same voltage, branch currents add"],
          ["Imaging system power rating", "(mA x kVp) / 1000 = kW, so 1,000 mA at 120 kVp is 120 kW; multiply by 0.7 single phase"],
          ["Transformer turns and AC values", "Secondary voltage = primary voltage x turns ratio, so 120 V at 750:1 gives 90 kVp. RMS = 0.707 x peak, peak = 1.414 x RMS; mains is 120 V RMS at 60 Hz"]
        ] },
        { type: "table", cols: ["Prefix or unit", "Meaning on an imaging console"], rows: [
          ["kilo, milli, micro", "A thousand, a thousandth, a millionth: kV and kW, mA and ms, and the microamps leakage limits use"],
          ["kVp, mA, and mAs", "Kilovolt peak is the highest voltage across the tube and sets quality; mA is tube current and sets quantity; mAs is mA x exposure time in seconds, the one number that sets how many x-rays are made"]
        ] },
        { type: "table", cols: ["Component", "What it does in imaging equipment"], rows: [
          ["Resistor, capacitor, inductor", "A resistor limits current and drops voltage, and sets mA in the filament circuit. A capacitor stores charge, smooths rectified voltage, passes AC and blocks DC. An inductor opposes a change in current: transformers, chokes, stator windings"],
          ["Transformer", "Changes AC voltage by turns ratio: autotransformer sets kVp, step-up makes kilovolts, step-down heats the filament"],
          ["Diode and rectifier", "A diode conducts one way, about 0.7 V forward drop in silicon; a rectifier set makes the one-way current the tube needs"],
          ["Transistor and SCR", "A transistor switches or amplifies on a small control current; an SCR is a gate-triggered AC switch used in primary circuits and rotor drives"],
          ["Fuse, breaker, relay, contactor", "Fuses and breakers open on overcurrent, and a repeat trip is a fault, not a nuisance; a relay or contactor lets a small coil current switch the rotor or exposure load"],
          ["Interlock and indicators", "An interlock sits in series with the exposure circuit: door, rotor ready, receptor parked, collimator, emergency stop. An unlit LED means the lamp or its drive is dead"]
        ] },
        { type: "table", cols: ["Facility and room power", "Fact"], rows: [
          ["Three-phase distribution", "Facility power distribution for imaging is three-phase, commonly 480 VAC, stepped down to what each room needs; three-phase service feeds the larger generators"],
          ["Single-phase service", "120/240 VAC at 60 Hz with a grounded center neutral; most imaging systems are designed for 220 V, some 110 V or 440 V"],
          ["Dedicated feed, disconnect, ground", "Each room has its own feeder and a lockable disconnect: tag it before opening a cabinet. A lifted ground gives a leakage failure and image noise at once"],
          ["Line voltage compensation", "Building power is never steady enough for repeatable exposures; the compensator corrects the supply ahead of the autotransformer"],
          ["Transformers in the generator", "The autotransformer is a tapped winding the kVp selector picks taps on, read by a pre-reading voltmeter; the step-up secondary carries 500 to 1,000 turns per primary turn; the filament step-down supplies about 4 A or more"],
          ["Low-voltage rails", "Logic and interlock boards run on VDC rails from the cabinet supplies; measure each at the test point the manual names before condemning a board"]
        ] },
        { type: "table", cols: ["Waveform", "Ripple and what it means"], rows: [
          ["Single phase, half-wave and full-wave", "Half-wave passes only the positive half of each cycle, the least efficient; full-wave uses both halves at twice the pulse rate. Ripple is 100 percent either way, and without rectification the negative half-cycle would destroy the tube"],
          ["Three phase, six pulse", "About 14 percent ripple, so voltage never drops below about 86 percent of peak"],
          ["Three phase, twelve pulse", "About 4 percent ripple, never below about 96 percent of peak"],
          ["High frequency", "About 1 percent ripple, nearly constant voltage: most efficient and now standard. Less ripple means more quantity and quality for the same settings, so one technique is not the same exposure on another generator"]
        ] },
        { type: "table", cols: ["Power protection", "What it is for"], rows: [
          ["UPS types", "Online double conversion always runs the load from the inverter, the cleanest protection for consoles and archives; line-interactive regulates and switches on loss; standby only switches. Batteries age out"],
          ["Line conditioner", "Regulates and filters without a battery: cures noise and sag, not a blackout"],
          ["Isolation and surge protection", "An isolation transformer clears ground loops and noise; surge devices clamp transients. A surge strip is not a UPS"],
          ["Internal distribution and brownouts", "One feed splits to generator, gantry, table, and computers, so one branch can look like total failure. Low line voltage makes a generator read kVp low, abort exposures, or throw a line-compensation fault"]
        ] },
        { type: "table", cols: ["Battery-powered systems", "What to check"], rows: [
          ["Where they are and what is in them", "Ultrasound carts and portable x-ray units, on sealed lead-acid or lithium-ion packs; never substitute a chemistry the unit was not built for"],
          ["Charge before use", "Leave the unit on the charger between cases; a lead-acid pack left discharged sulfates and will not come back"],
          ["Capacity fade", "Run time and exposures per charge fall with age; log them, because the trend is the warning"],
          ["What a weak pack does", "Low or aborted exposures, resets mid-exposure, or a rotor that will not spin; measure the pack under load"]
        ] },
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
          ["Patient leakage, DC (all types)", "10 microamps", "50 microamps"]
        ] },
        { type: "table", cols: ["NFPA 99 and facility fact", "Value"], rows: [
          ["Ground (chassis to plug ground pin) resistance", "0.5 ohm maximum for patient-care equipment"],
          ["Chassis (touch) leakage, cord-connected patient-care equipment", "500 microamps in current editions (older editions used 300 or 100 microamps; know the limit your facility cites)"],
          ["Patient care vicinity", "About 6 feet (1.8 m) beyond the bed or chair and 7.5 feet (2.3 m) above the floor"],
          ["GFCI trip", "4 to 6 mA (nominal 5 mA)"],
          ["Applied part types", "Type B touches the body but not the heart; BF is body floating and isolated; CF is cardiac floating, safe for a direct heart connection"]
        ] }
      ]
    },
    {
      id: "tubes", title: "X-ray production, tubes, and generators",
      blocks: [
        { type: "table", cols: ["Tube part", "Facts worth memorizing"], rows: [
          ["Cathode", "A thoriated tungsten filament, 1 to 2 percent thorium, coiled about 1 to 2 cm long and 2 mm across, in a negatively charged focusing cup; two filaments give the small and large spots"],
          ["Anode", "A tungsten-rhenium target disc backed by molybdenum or graphite. Tungsten is chosen for atomic number 74, conductivity close to copper, and a melting point of about 3,400 C"],
          ["Rotor and stator", "An induction motor spins the anode, about 3,400 rpm standard and about 10,000 rpm high-speed; reversing the stator field brakes it"],
          ["Anode angle and line focus", "Angles about 5 to 20 deg. Angling shortens a long focal track into a small effective spot, so a 10 mm by 1 mm line becomes about a 1 mm square; smaller angle, smaller spot, stronger heel effect"],
          ["Heel effect", "Intensity is lower on the anode side because those x-rays cross more target material; put thick anatomy under the cathode side"],
          ["Focal spot sizes", "Small stations about 0.3 to 0.6 mm, large about 1.0 to 1.2 mm, mammography down to 0.1 mm. Nominal sizes carry a variance, so a nominal 0.3 mm may measure 0.45 mm and pass"],
          ["Envelope, oil, housing", "A glass or metal vacuum envelope; tungsten plating glass causes arcing, so metal lasts longer. Oil carries heat to the lead-lined housing, which limits leakage and shock risk"]
        ] },
        { type: "table", cols: ["Production fact", "Detail"], rows: [
          ["Efficiency", "About 1 percent of the electrons' kinetic energy becomes x-rays, about 99 percent heat"],
          ["Bremsstrahlung and characteristic radiation", "Electrons braked by the nuclear field emit a continuous spread of energies, the bulk of the beam. An inner-shell vacancy filled from an outer shell instead emits a photon at exactly the difference in binding energies, and only K-shell transitions in tungsten are useful, above its K-shell energy of about 69.5 keV"]
        ] },
        { type: "table", cols: ["Exposure factor", "Rule"], rows: [
          ["kVp", "Sets penetrability (quality, measured as the HVL) and contrast; quantity is proportional to kVp squared"],
          ["mA and time", "Both linear with quantity; short times freeze motion"],
          ["mAs and reciprocity", "mAs = mA x seconds, and any pair giving the same product should give the same receptor exposure, which is what the linearity test checks"],
          ["The 15 percent rule", "Raising kVp 15 percent equals doubling the mAs; to hold receptor exposure, raise kVp 15 percent and halve the mAs, accepting lower contrast"],
          ["Filtration", "Removes low-energy photons that only dose the patient: average energy and HVL rise, quantity falls"],
          ["Distance and magnification", "Receptor exposure falls with the square of the SID. MF = SID / SOD, about 1.1 at a 100 cm SID and 1.05 at 180 cm"]
        ] },
        { type: "table", cols: ["Heat fact", "Value"], rows: [
          ["Heat units", "Single phase HU = kVp x mA x s, so 98 kVp at 120 mAs is 11,760 HU; three phase or high frequency HU = 1.4 x kVp x mA x s, because lower ripple makes more heat. 1 HU = 1.4 joules"],
          ["Rating and cooling charts", "The rating chart says whether one exposure is safe; anode and housing cooling curves say how long to wait before the next series"],
          ["How heat leaves", "Radiation from the anode, conduction into envelope and oil, convection in the oil to the housing, then the room. The anode is hottest for only about 1 to 3 seconds per exposure"]
        ] },
        { type: "table", cols: ["Tube failure mode", "Cause and what you see"], rows: [
          ["Filament evaporation", "Tungsten boils off, thins the coil, and plates the envelope; output drifts low, then the filament opens"],
          ["Anode pitting and melting", "Repeated overload roughens the target; output falls and becomes unpredictable across stations"],
          ["Cracked anode", "A cold anode loaded hard cracks or wobbles and fails at once, which is why the warm-up series exists"],
          ["Arcing", "Tungsten plated inside a glass envelope conducts, so tube current jumps the vacuum and the generator throws an overcurrent or tube-arc fault"],
          ["Bearing wear", "Heat into the rotor ruins the bearings: a noisy or slow rotor, then a rotor-fault lockout. Long fluoroscopic runs are hardest on them"],
          ["Overheating", "The most common cause of early failure. Lowest technique that works, fewest repeats, never exceed the rating chart; a well-used tube gives at least about 50,000 exposures"]
        ] },
        { type: "table", cols: ["Generator control", "What it does"], rows: [
          ["kVp and mA selectors", "kVp picks autotransformer taps, mA sets filament heating; verify with a meter, not the display, and keep adjacent mA stations within 10 percent"],
          ["Time and mAs", "Timer types: synchronous (multiples of 1/60 s), electronic (common and most accurate), mechanical (portables and dental), mAs, and automatic"],
          ["AEC and backup timer", "Ionization chambers in front of the receptor end the exposure when enough radiation arrives; cell selection and density steps tune it, and the backup must end at 6 s or 600 mAs"],
          ["Line compensation", "Holds the supply steady so one technique gives the same exposure all day"],
          ["Rotor, ready, and interlocks", "First stage spins the anode and heats the filament, and the ready light means the interlock chain is satisfied. A two-stage dead-man switch sits in series with those interlocks, so an open link gives no exposure and no fault code"]
        ] },
        { type: "table", cols: ["Image quality factor", "Raised by", "Lowered by"], rows: [
          ["Density (overall blackening)", "More mAs, higher kVp, shorter distance, faster receptor", "Less mAs, lower kVp, longer distance, a grid without compensation; too little exposure also shows as noise"],
          ["Contrast", "Lower kVp, a grid, collimation, compression", "Higher kVp, scatter, fog, a large field"],
          ["Recorded detail", "Small focal spot, long SID, short OID, no motion", "Large focal spot, short SID, long OID, motion"],
          ["Distortion", "Correct alignment and centering", "Angled parts, off-center anatomy, uneven OID across a thick part"]
        ] },
        { type: "table", cols: ["Beam control device", "Facts"], rows: [
          ["Collimator and PBL", "Two pairs of lead shutters at right angles plus lamp and mirror, with cones and aperture diaphragms to restrict further. Light field and x-ray field must match within 2 percent of the SID, and positive beam limitation must hold the same 2 percent"],
          ["Grid ratio, frequency, types", "Ratio is strip height over gap, usually 4:1 to 16:1; frequency is strips per inch, usually 60 to 150; higher ratio removes more scatter and costs more dose. Linear grids are parallel, focused grids are angled with the labeled side to the tube, crossed grids are two at right angles"],
          ["Bucky factor", "The mAs increase a grid costs, also called the grid conversion factor; it rises with ratio and with kVp. Contrast improvement factors run 1.5 to 2.5"],
          ["Air gap and compensating filters", "A long OID lets scatter miss the receptor instead of using a grid, at the cost of magnification; wedge and trough filters even out a part that changes thickness"]
        ] }
      ]
    },
    {
      id: "receptors", title: "Receptors, fluoroscopy, mammography, CT, ultrasound, nuclear medicine, MRI",
      blocks: [
        { type: "table", cols: ["Receptor", "How it works and what fails"], rows: [
          ["CR, and the film it replaced", "A PSP plate stores the latent image, a laser scanner reads the glow, a bright lamp erases it for reuse. Dust and scratches print on every image, an incomplete erase leaves a ghost, a worn plate loses speed. Film vocabulary survives in questions: optical density, screen speed, screen-film contact"],
          ["DR, indirect and direct", "Indirect panels use a CsI scintillator over an amorphous silicon TFT array; direct panels use amorphous selenium, with no light step"],
          ["DQE, EI, and DI", "Detective quantum efficiency is how much of the radiation reaching the detector becomes usable signal, so higher means the same image at less dose. The exposure index reports what the detector received, and the deviation index compares it with the target for that exam"],
          ["Calibration and care", "Offset (dark), gain (flat-field), and defective pixel map; skipping them shows as banding, shading, or stuck pixels. Inspect portable panel cases and cables, and handle boards with ESD precautions"]
        ] },
        { type: "table", cols: ["Fluoroscopy item", "Facts"], rows: [
          ["Image intensifier chain", "Input phosphor, photocathode, electrostatic focusing lenses, anode, output phosphor; output phosphors about 2.5 or 5 cm, input phosphors 10 to 40 cm"],
          ["Gains", "Flux gain is the 50 to 75 light photons each photoelectron makes at the output phosphor; minification gain is the square of input over output diameter; brightness gain = minification gain x flux gain"],
          ["ABC and magnification", "Automatic brightness control holds brightness by raising mA, kVp, or pulse width as the patient thickens, so dose rate climbs on a large patient. A magnification mode uses less of the phosphor, so dose rate rises again"],
          ["Flat-panel fluoroscopy", "A dynamic flat detector instead of an intensifier tube: even brightness, no vignetting or S-distortion"],
          ["Pulsed mode and last-image hold", "Short pulses at a chosen rate are the biggest dose saving the operator has; last-image hold freezes the final frame with the beam off"],
          ["DSA", "A mask image taken before contrast is subtracted from the contrast run so only vessels remain; any motion ruins it"],
          ["C-arm and the suite", "A mobile or fixed C-arm adds its own collimator, laser aimers, brakes, detents, cables, and foot switches to the PM list"]
        ] },
        { type: "table", cols: ["Mammography item", "Facts"], rows: [
          ["Targets, filters, technique", "Molybdenum, rhodium, or tungsten targets with matching molybdenum or rhodium filters shift the spectrum into the useful range for soft tissue. About 23 to 28 kVp, with total filtration at least 0.5 mm Al equivalent through a beryllium window"],
          ["Focal spot and geometry", "Focal spots down to about 0.1 mm for microcalcifications; the cathode faces the chest wall so the heel effect evens out thicker tissue, at an SID of about 60 to 80 cm"],
          ["Compression", "Power and manual modes must both reach 25 to 40 lb and hold at least 15 seconds, and 40 lb must never be exceeded automatically. Thinner even tissue means less scatter, less motion, a shorter OID, lower dose"],
          ["Grids and AEC", "Grids of 4:1 or 5:1 at 30 to 50 lines per cm; the AEC detector sits behind the receptor and reads intensity and quality"],
          ["Digital detectors and DBT", "TFT arrays with thallium-activated cesium iodide, or a CCD; film-screen still edges them on spatial resolution. Digital breast tomosynthesis sweeps the tube through an arc and reconstructs slices, adding gantry motion and arc calibration to QC"],
          ["QC schedule", "Processor or detector daily, phantom image weekly, visual checklist monthly, repeat analysis quarterly or every 250 patients, compression at least semiannually, medical physicist survey annually or after a major component change"],
          ["ACR phantom scoring", "Count largest to smallest; the minimum to pass accreditation is four fibers, three speck groups, and three masses, and a score must not fall more than 0.5 from the last image"]
        ] },
        { type: "table", cols: ["CT item", "Facts"], rows: [
          ["Gantry and slip ring", "Tube and detector array rotate together; the slip ring carries power and signals so rotation never stops"],
          ["Helical scanning and pitch", "The couch moves while the gantry turns, tracing a spiral. Pitch is couch travel per rotation over beam width, such as 1.0:1; above 1 the spiral stretches and dose falls, below 1 it overlaps and dose rises"],
          ["HU scale", "Hounsfield units run from -1000 to +3000: air -1000, water exactly 0 by continuous calibration, dense bone about +3000. A water-phantom drift is why numbers go wrong"],
          ["Cooling and reconstruction", "CT tubes carry huge heat loads, so cooling and the heat-unit budget govern how fast a schedule runs; raw data is reconstructed then windowed for display"],
          ["What the technician services", "Table motion and alignment, laser lights, slip-ring brushes, detector and air calibrations, chillers and filters, console and reconstruction computers, and the network link"]
        ] },
        { type: "table", cols: ["Ultrasound item", "Facts"], rows: [
          ["How it works", "A probe's piezoelectric elements turn an electrical pulse into sound and the echo back into a voltage; no ionizing radiation"],
          ["Frequency and depth", "Higher frequency gives finer detail but less penetration; sound also weakens with depth and is blocked by bone and gas, so gel and window matter"],
          ["Probe types", "Linear for superficial work, curved for abdomen and obstetrics, phased array for cardiac, TEE down the esophagus, plus intracavity probes"],
          ["Doppler", "Measures motion and flow from the frequency shift of the echo; noise and poor contact ruin it first"],
          ["HLD", "Probes touching mucous membranes need high-level disinfection between patients; the wrong chemical or a soaked connector destroys a probe"],
          ["Dropout and service", "A dead element or broken cable wire leaves a dark stripe down the image that does not move with the probe. Service covers probes and connectors, cart power and batteries, display and controls, and the network link"]
        ] },
        { type: "table", cols: ["Nuclear medicine item", "Facts"], rows: [
          ["Gamma camera chain", "Collimator, NaI scintillation crystal, light guide, PMT array, position and energy circuits, then the computer"],
          ["Technetium-99m (Tc-99m)", "The workhorse tracer; it decays to technetium-99 emitting a 140 keV gamma ray, the window the camera is peaked for"],
          ["PET and hybrids", "Positron emitters annihilate with electrons and send out a pair of photons of about 0.51 MeV in opposite directions, and the ring counts coincidences. SPECT/CT and PET/CT add a CT gantry for attenuation correction and anatomy"],
          ["Instruments and service", "Doses are assayed in a dose calibrator and contamination found with survey meters, both calibrated and logged. The technician handles detectors and collimators, PMT tuning and uniformity, gantry motion, computers and links"]
        ] },
        { type: "table", cols: ["MRI item", "Facts"], rows: [
          ["Magnet", "A superconducting coil in a liquid-helium bath, measured in tesla, commonly 3 T, always on"],
          ["Gradients and RF coils", "Gradient coils bend the field to encode position and make the banging noise; RF coils transmit and receive the signal"],
          ["Cold chain", "Compressor, cold head, and chiller keep the helium cold; a helium level alarm or a warm cold head is an emergency"],
          ["Shielded room and service", "Copper shielding and a filter panel keep outside RF out, and a propped door shows as zipper artifacts. The technician services chillers and compressors, coils and cables, table motion, rated peripherals, and the console side"]
        ] }
      ]
    },
    {
      id: "pm", title: "PM, QC, and test equipment",
      blocks: [
        { type: "table", cols: ["PM area", "What the visit must cover"], rows: [
          ["Mechanical", "Locks, brakes, detents, counterweights, cables and chains, bearing play, tube stand and rails, table travel, collision sensors; plus filters, fans, dust, and room temperature, because heat kills generators and detectors"],
          ["Electrical safety", "Ground resistance 0.5 ohm maximum and chassis leakage within the limit your facility cites, with an analyzer, at incoming inspection, after repair, and on schedule"],
          ["Interlocks", "Door, rotor ready, receptor parked, collimator, emergency stops: prove each one blocks the exposure"],
          ["Radiation output", "kVp accuracy, timer, linearity, reproducibility, HVL, and leakage on the schedule the state and the manufacturer set"],
          ["Logs and documentation", "Read the error log every visit, note firmware versions, record before clearing, patch only on the vendor's validated schedule, and close the work order with the measured value, the tolerance, and pass or fail"]
        ] },
        { type: "table", cols: ["Radiographic QC test", "Tolerance"], rows: [
          ["kVp accuracy", "Measured kVp within 10 percent of the indicated kVp"],
          ["Exposure timer accuracy", "Within 5 percent of the indicated time above 10 ms; 20 percent at 10 ms or less"],
          ["Linearity and reproducibility", "No more than 10 percent variation in output per mAs between adjacent mA stations, and no more than plus or minus 5 percent over repeated identical exposures"],
          ["Collimation and beam alignment", "Light field and x-ray field within 2 percent of the SID, with PBL and the SID indicator held to the same 2 percent"],
          ["HVL", "Measure and compare with the minimum for that kVp and waveform; meeting it proves the filtration is adequate"],
          ["Focal spot size", "Pinhole camera, star pattern, or slit camera against the nominal size and its variance"],
          ["AEC performance", "Constant density through varying thicknesses of aluminum or acrylic, plus a backup timer test at 6 s or 600 mAs"],
          ["When to retest", "Annually, after major repair to the console or high-voltage generator, and whenever output looks wrong"]
        ] },
        { type: "table", cols: ["Fluoroscopy QC test", "What to measure"], rows: [
          ["Tabletop exposure rate and timer", "A chamber at the tabletop against the 10 R/min and 20 R/min limits, and the audible signal at 5 minutes"],
          ["Geometry", "SSD at least 38 cm stationary or 30 cm mobile with the spacer in place, and an unexposed border with the input phosphor 35 cm above the tabletop"],
          ["Image quality", "A resolution and low-contrast phantom at fixed geometry against the baseline on file"]
        ] },
        { type: "table", cols: ["Mammography QC schedule", "Tasks"], rows: [
          ["Daily and weekly", "Processor or detector check and cleanliness daily; phantom image, screen cleanliness, viewing conditions weekly"],
          ["Monthly and quarterly", "Visual checklist monthly; repeat analysis quarterly or every 250 patients"],
          ["Semiannual and annual", "Compression force at least semiannually; medical physicist survey annually or after a major component change"]
        ] },
        { type: "table", cols: ["Ultrasound QC task", "What to do"], rows: [
          ["Phantom scan", "Depth of penetration, resolution, and uniformity at fixed settings against the baseline"],
          ["Probe, display, and controls", "Cracks in the lens, kinked cables, bent connector pins, and chemical damage; brightness and contrast against the test pattern, with every control and footswitch working"]
        ] },
        { type: "table", cols: ["Test instrument", "What it is for"], rows: [
          ["Non-invasive kVp meter", "Reads kVp, time, dose, dose rate, and HVL from outside the beam path, and verifies time and mAs independently of the console"],
          ["Ionization chamber and solid-state detector", "The reference dose and dose-rate detectors for output, fluoroscopic rate, and leakage"],
          ["DAP meter", "Measures dose area product under the collimator, tracking dose and the volume of tissue irradiated"],
          ["Phantoms, filters, test tools", "Calibrated aluminum sheets added until intensity halves give the HVL; plus resolution and contrast phantoms, the beam-alignment tool, pinhole and star patterns, and the mammography and CT accreditation phantoms"],
          ["Staff dosimeters", "TLD and OSL badges read by a service, plus direct-reading electronic dosimeters; worn at the collar outside the apron"],
          ["DMM or DVM", "Voltage, current, and resistance at the test points the manual names; on continuity an OL reading means the path is open"],
          ["Electrical safety analyzer", "Ground resistance and leakage against the NFPA 99 and IEC 60601-1 limits, in normal, reversed-polarity, and open-ground conditions"],
          ["Dose calibrator", "Assays activity in nuclear medicine before a dose is given, with its own constancy, accuracy, linearity, and geometry tests"]
        ] },
        { type: "table", cols: ["What a surveyor asks for", "Where it comes from"], rows: [
          ["Inventory and PM record", "The CMMS: complete, current, risk-classified, with completion rates and reasons for anything overdue"],
          ["QC logs", "Signed, dated records with readings and tolerances, technologist daily checks included"],
          ["Physicist and safety reports", "Annual surveys with findings and closure dates, dosimetry reports, committee minutes, shielding designs"],
          ["Recalls and training", "Each notice with the devices affected and what was done, and who is competent on what, contractors included"]
        ] }
      ]
    },
    {
      id: "troubleshooting", title: "Troubleshooting imaging systems",
      blocks: [
        { type: "list", title: "The method, every time", cols: 2, items: [
          "Symptom and history: get it in the user's own words with the exam, the room, and the step where it happens, then ask what changed and read the error log and service history. Not working is not a symptom",
          "Isolate: split the chain into power, control, generation, geometry, receptor, and network, and prove which side of each split is good. Measure resistance and continuity only with the equipment OFF and capacitors discharged",
          "Verify: after the fix, run the test that would have caught the fault and record the number",
          "Device error versus use error: reproduce it yourself. A fault nobody else can reproduce is often workflow or training, and the fix is a demonstration, not a part",
          "Repair, replace, or escalate: weigh downtime, parts cost against replacement value, your own calibration ability, and the limits of your service access",
          "Exam wording: a problem-solving stem asks for the FIRST step or the MOST likely cause, so pick the check that is safest, simplest, and soonest. Read what the stem says is NOT true; BEST means the complete safe action, while LEAST likely wants the three plausible ones eliminated"
        ] },
        { type: "table", cols: ["Priority", "Why it comes first"], rows: [
          ["Patient and staff safety", "Stop the exposure, lock out the room, remove the device from service; an unsafe machine never stays in use to protect a schedule"],
          ["Clinical downtime", "A down room reroutes patients; say when it will be back and give radiology a workaround"],
          ["Compliance", "The repair is not done until the test, the record, and the sign-off are done"],
          ["Convenience", "Cosmetic items wait, but write them down so they are not lost"]
        ] },
        { type: "table", cols: ["Radiographic room symptom", "Likely causes and the first checks"], rows: [
          ["No exposure", "With no error code it is an interlock: door, rotor not ready, receptor not parked or wrong size, collimator, emergency stop. Follow the series chain until a contact is open. With a fault code, read the code and the log: tube arc, overcurrent, line voltage, thermal cutout, failed contactor"],
          ["Output low or high", "Verify kVp and timer with a meter, check mA linearity and filtration, then the AEC cell and density setting. Burnt-out images point at a timer or AEC failure or calibration lost after a board swap; density differing between stations is a linearity fault"],
          ["Rotor will not spin or runs noisy", "Stator drive, capacitor, or bearing wear; a noisy rotor with a slow run-up means the tube is near its end"],
          ["Artifacts", "Grid lines mean a stationary grid or a Bucky not moving. Cutoff names the error: upside down fades the edges, off level drops density everywhere, off center drops it at the sides. On digital, stripes mean a stale gain or pixel map, a ghost means an incomplete CR erase, moire means grid frequency beating against detector sampling, repeating marks mean a scored plate"],
          ["Mechanical drift, drop, collision", "Locks and detents out of adjustment, worn cable or counterweight, failed collision sensor; a safety fault, not a comfort item"]
        ] },
        { type: "table", cols: ["Fluoroscopy symptom", "Likely causes and the first checks"], rows: [
          ["Dim or noisy image", "ABC at its limit, an aging intensifier losing gain, a camera or flat-panel fault, or a very large patient; compare dose rate with the baseline first. Image rotation or edge distortion is intensifier aging, which flat panels do not do"],
          ["Dose rate too high", "ABC calibration, a magnification mode left engaged, continuous instead of pulsed mode, or a missing filter; measure at the tabletop against the 10 R/min and 20 R/min limits"]
        ] },
        { type: "table", cols: ["Mammography symptom", "Likely causes and the first checks"], rows: [
          ["Compression will not reach or hold", "Paddle, drive, or force calibration; verify 25 to 40 lb in both modes with a scale and that 40 lb cannot be exceeded automatically"],
          ["Images too light or dark, or the phantom score falls", "AEC detector position, cell selection, or detector calibration; confirm with a phantom image before touching technique. A drop of more than 0.5 means stop and investigate calibration, target and filter selection, compression, or processing"],
          ["Filter wheel fault or repeating artifacts", "The wheel motor, position sensor, or interlock behind a target or filter error; a mark in the same place every image is a detector or plate defect, dust in the beam path, or a damaged paddle"]
        ] },
        { type: "table", cols: ["Ultrasound symptom", "Likely causes and the first checks"], rows: [
          ["Dark stripe down the image", "Element dropout or a broken cable conductor; confirm on a phantom, then swap the probe to prove it"],
          ["Weak or noisy image, or absent Doppler", "Wrong preset, poor contact and gel, lens or connector damage, or a failing channel; try a known good probe first. A dead display or control is cart power, battery, cable, or the panel"],
          ["Probe damage after cleaning", "A disinfectant not approved for that probe, soaking past the immersion line, or a soaked connector; retrain and relabel"]
        ] },
        { type: "table", cols: ["Portable and C-arm symptom", "Likely causes and the first checks"], rows: [
          ["Will not expose away from mains, or dies within a shift", "Battery capacity under load, charger fault, a charge interlock, or a unit stored discharged; measure the pack under load and log run time"],
          ["Drive, brakes, or faults that follow movement", "Brake pads, drive belt, wheel bearings, or dead-man drive switch; faults that follow arm movement are cable flex failures, found with a wiggle test on continuity"],
          ["Collimator lamp or laser out", "Lamp, timer circuit, or mirror alignment; a dark lamp invites an uncollimated field, so it is a dose issue"]
        ] },
        { type: "note", text: "The service report is part of the repair: the symptom as reported, what you found, what you did, the parts used, the readings with their tolerances, and the time the room went back into use. Tell radiology what works now, what does not, what to avoid, and when you will be back. When you call the manufacturer, have the model, serial number, software version, exact error text, and readings ready." }
      ]
    },
    {
      id: "it", title: "Imaging informatics",
      blocks: [
        { type: "table", cols: ["Networking item", "What to know"], rows: [
          ["IP address, subnet mask, gateway", "Four numbers 0 to 255 name the device; the mask splits that into network and host, and two devices must share a subnet to talk without a router. The default gateway is the way out, and a wrong one looks like the whole network is down from that device"],
          ["DHCP and DNS", "DHCP hands out addresses, and a self-assigned 169.254 address means it could not be reached. DNS turns names into addresses: if the address works and the name does not, it is DNS"],
          ["Switch versus router", "A switch connects devices inside one LAN; a router connects networks and usually carries the access rules"],
          ["VLAN", "A logical network on shared switches. Imaging gear often sits on its own VLAN, which is why a good cable in the wrong port gets nowhere"],
          ["LAN, WAN, and wireless", "The LAN is the building and the WAN joins sites, where slow prior retrievals live. Fixed modalities are wired; portables roam, so coverage gaps leave studies stuck in the local queue"],
          ["Cabling and NIC", "Cat 5e for 1 Gbps, Cat 6A for 10 Gbps, 100 m per run, RJ45 connectors, fiber for long runs. No link light on the network card is a layer 1 problem, cable or port"]
        ] },
        { type: "table", cols: ["Tool", "What it proves"], rows: [
          ["PING and traceroute", "PING sends ICMP echoes, and a reply proves the path and host are alive: work outward from own address to gateway to archive by address to archive by name. traceroute shows each router hop and where the path stops, which matters across a WAN before blaming the modality"],
          ["ipconfig or ifconfig", "Reads the device's own address, mask, gateway, and DNS: the fastest way to spot a bad address"],
          ["Cable tester, tracer, port lights", "Prove the pairs end to end and find which jack is which; lights on both ends settle the physical layer"],
          ["DICOM echo", "A C-ECHO verifies the association, AE titles, address, and port: the DICOM ping, and the first test when images will not move"]
        ] },
        { type: "table", cols: ["DICOM item", "What to know"], rows: [
          ["Association, AE title, host, port", "Two application entities negotiate an association and must agree on who they are and what services they support. Each node answers to a case-sensitive AE title plus address and port, commonly 104 or 11112; a typo here is the most common reason a new room cannot send"],
          ["SOP class", "The service and object pair that says what a node can do, such as store a CT image or query a worklist"],
          ["C-ECHO and C-STORE", "Verification, then the push that sends images to the archive. A node that verifies but cannot store usually has a class mismatch, or a disk, licence, or permission limit at the receiver"],
          ["C-FIND and C-MOVE", "Query for matching studies, then ask a node to send them somewhere; retrieving priors needs the destination configured on the sending node"],
          ["MWL and MPPS", "The modality worklist query pulls scheduled patients and accession numbers to the console; performed procedure step reports started, completed, or discontinued, which drives status boards and billing"],
          ["Storage commitment and GSDF", "Storage commitment is the archive confirming permanent responsibility, which makes local deletion safe; the grayscale standard display function is the calibration curve that makes an image look the same on every reading station"]
        ] },
        { type: "table", cols: ["System", "Its job and the path through it"], rows: [
          ["PACS and VNA", "The archive plus reading workstations store, retrieve, distribute, and display. A vendor neutral archive holds studies from many systems in a standard form, so a vendor can be replaced without migrating the data again"],
          ["RIS", "Schedules exams, holds the worklist, tracks status, routes reports"],
          ["HL7", "The messaging standard joining those systems: ADT for admit, discharge, and transfer, ORM for orders, ORU for results and reports"],
          ["Order to report", "Ordered in the EMR, scheduled in the RIS, shown on the modality as a worklist entry, images to PACS, read and dictated, report back to the EMR and the EHR clinicians read"],
          ["Interface engine or broker", "Translates and routes HL7 and DICOM traffic between systems; its queue is where stuck messages pile up"]
        ] },
        { type: "table", cols: ["Security item", "What it means for imaging equipment"], rows: [
          ["HIPAA, HITECH, and PHI", "HIPAA protects PHI through its privacy, security, and breach rules; HITECH strengthened enforcement, added breach notification, and bound service vendors. Identifiers sit in consoles, caches, dose reports, and service logs, so sanitize or document before a device leaves the building"],
          ["MDS2", "The manufacturer disclosure statement for medical device security: what a device stores, how it authenticates, and what it can be patched with"],
          ["IEC 80001", "Risk management for IT networks carrying medical devices: the framework behind joint reviews with the IT department"],
          ["Least privilege and remote access", "Separate service and clinical accounts, no shared logins, vendor access through the hospital VPN with a controlled account, logged and time-limited, never an always-on modem"],
          ["Patching, segmentation, encryption", "Patch only on the vendor's validated schedule; a modality that cannot be patched is segmented onto its own VLAN with only the ports it needs; encrypt anything leaving the building"],
          ["Backups", "Archives and databases backed up and restore-tested; a backup nobody has restored is a hope, not a plan"]
        ] },
        { type: "note", text: "Imaging applications depend on each other, so the first question is how wide the fault is. One modality that cannot send is a node problem: AE title, address, port, or cable. Every modality losing its worklist at once is upstream, at the RIS or the interface engine. A down archive fails every reading station while the modalities keep scanning into their local queues, so the clock is running on local disk. Escalate with the device, the test you ran, the result, and the time it started." }
      ]
    }
  ]
};
