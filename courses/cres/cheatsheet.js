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
          ["Questions", "165 multiple-choice questions"],
          ["Time and rules", "3 hours, closed book; an on-screen calculator and notepad are the only tools allowed"],
          ["Delivery", "Computer-based at Kryterion test centers; travel of up to 100 miles may be needed to reach one"],
          ["Testing windows", "Offered twice a year: May 1 to 15 and November 1 to 15"],
          ["Domain 1, Anatomy and Physiology", "7 percent of the exam"],
          ["Domain 2, Public Safety in the Healthcare Facility", "8 percent of the exam"],
          ["Domain 3, Fundamentals of Electricity and Electronics", "10 percent of the exam"],
          ["Domain 4, Healthcare Technology and Function", "25 percent of the exam"],
          ["Domain 5, Healthcare Technology Problem Solving", "25 percent of the exam"],
          ["Domain 6, Healthcare Information Technology", "25 percent of the exam"],
          ["Passing", "A criterion-referenced cut score set by the modified Angoff method; no cut score is published"],
          ["Results", "Pass or fail on screen at once and by email within 24 hours; candidates who do not pass also receive a scaled score and an analysis of performance"],
          ["Fee", "$410 member, $460 non-member; retake $355 member, $405 non-member"],
          ["Retakes", "Wait 60 days between attempts; at most three attempts in two years, then a one-year wait"],
          ["Recertification", "Every three years with continuing education"],
          ["Where the points are", "Function, problem solving, and imaging informatics are 75 percent of the exam; the first three domains together are 25 percent"]
        ] },
        { type: "table", cols: ["Eligibility pathway", "What it requires"], rows: [
          ["Pathway 1, education", "An associate degree or higher in an electronics, technology, or science program plus two years of full-time BMET work"],
          ["Pathway 2, military", "A United States military biomedical equipment technology program plus two years of full-time BMET work"],
          ["Pathway 3, experience", "Four years of full-time BMET work"],
          ["Radiology specialty clause", "Full certification also requires at least 40 percent of work experience in the radiology specialty over the last two years, with 25 percent over the last five years"],
          ["Candidate status", "The degree alone, the military program alone, or two years of full-time work alone earns candidate status rather than full certification"],
          ["Credential ladder", "CABT for the entry associate, CBET for the general technician, CRES for the imaging specialist, CHTM for the manager; all four are ACI credentials inside HTM"]
        ] },
        { type: "note", text: "This course's official-format test uses 70%, the same bar as our CBET course; ACI publishes no cut score." }
      ]
    },
    {
      id: "positioning", title: "Anatomy, positioning, and terminology",
      blocks: [
        { type: "table", cols: ["Direction or position term", "Plain meaning"], rows: [
          ["Anterior (ventral)", "Toward the front of the body"],
          ["Posterior (dorsal)", "Toward the back of the body"],
          ["Superior", "Above, toward the head"],
          ["Inferior", "Below, toward the feet"],
          ["Medial", "Toward the midline of the body"],
          ["Lateral", "Away from the midline, toward the side"],
          ["Proximal", "Nearer the trunk or the point of attachment"],
          ["Distal", "Farther from the trunk or the point of attachment"],
          ["Supine", "Lying face up on the back"],
          ["Prone", "Lying face down"],
          ["Erect", "Standing or seated upright"],
          ["Recumbent", "Lying down in any position"],
          ["Lateral decubitus", "Lying on a side with a horizontal beam; right or left names the down side"],
          ["Dorsal decubitus", "Lying on the back with a horizontal beam crossing the body side to side"],
          ["Ventral decubitus", "Lying face down with a horizontal beam crossing the body side to side"]
        ] },
        { type: "table", cols: ["Projection or position", "Beam path and what the equipment must do"], rows: [
          ["AP", "Beam enters the front and exits the back; patient supine or erect facing the tube"],
          ["PA", "Beam enters the back and exits the front; patient faces the receptor"],
          ["Lateral", "Beam crosses side to side; the named side is the one against the receptor"],
          ["Oblique", "The body is rotated between frontal and lateral; the tube and receptor stay square to each other"],
          ["RAO", "Right anterior oblique: the right front of the body is against the receptor"],
          ["LAO", "Left anterior oblique: the left front of the body is against the receptor"],
          ["RPO", "Right posterior oblique: the right back of the body is against the receptor"],
          ["LPO", "Left posterior oblique: the left back of the body is against the receptor"],
          ["Axial", "Beam runs along the long axis of the part; the tube is angled from the standard position"],
          ["Tangential", "Beam skims a surface or a curved structure to throw it clear of other anatomy"],
          ["Decubitus", "Any position taken with the patient lying down and a horizontal beam; air and fluid levels show"]
        ] },
        { type: "table", cols: ["Plane", "How it divides the body"], rows: [
          ["Sagittal", "Vertically into left and right parts; there are an infinite number of parallel sagittal planes"],
          ["Median (midsagittal)", "Vertically into equal left and right halves from head to toe"],
          ["Midcoronal", "Vertically into front (anterior) and back (posterior) parts"],
          ["Transverse (axial)", "Horizontally into upper (superior) and lower (inferior) parts; always state the level"]
        ] },
        { type: "table", cols: ["Topographic line", "Runs from"], rows: [
          ["Orbitomeatal", "The outer canthus of the eye to the auricular point, the opening of the ear canal"],
          ["Infraorbitomeatal", "Just below the eye to the auricular point"],
          ["Glabellomeatal", "The glabella, between the eyebrows above the nose, to the auricular point"],
          ["Acanthiomeatal", "The acanthion, where the center of the nose meets the upper lip, to the auricular point"]
        ] },
        { type: "table", cols: ["Spinal landmark", "Surface feature it sits behind"], rows: [
          ["T1", "About 2 inches above the sternal notch"],
          ["T2 to T3 disc space", "The sternal notch at the jugular"],
          ["T4 to T5 disc space", "The sternal angle"],
          ["T6 to T7 disc space", "The lower end of the scapula"],
          ["T10", "The xiphoid tip"],
          ["Column count", "33 bones: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral, and the coccyx of 4 fused tailbones"]
        ] },
        { type: "table", cols: ["Body habitus", "Share of people", "Where the organs sit"], rows: [
          ["Hypersthenic", "About 5 percent", "Massive build, broad deep midsection, ribs nearly parallel to the floor; high diaphragm, short wide heart, high transverse medial stomach, high outside gallbladder, colon framing the abdomen; needs more exposure than sthenic"],
          ["Sthenic", "About 50 percent", "The average athletic build every technique chart is based on; ribs sloping down, stomach high and left, colon evenly spread, gallbladder centered on the right"],
          ["Hyposthenic", "About 35 percent", "More slender than sthenic; stomach and gallbladder high; needs less exposure than sthenic"],
          ["Asthenic", "About 10 percent", "Frail slim build, long shallow narrow midsection; heart nearly vertical at the midline, low medial stomach, low midline gallbladder, low colon; needs the least exposure"],
          ["Why it matters", "Up to 6 to 8 inches", "Habitus shifts the diaphragm, stomach, gallbladder, heart, and lungs by that much, which is why centering and collimation change with build"]
        ] },
        { type: "table", cols: ["System", "Key organs", "What imaging shows", "One common pathology"], rows: [
          ["Circulatory", "Heart, arteries, veins, capillaries", "Angiography and interventional runs with contrast; heart size on a chest image", "Stenosis of a coronary or peripheral artery"],
          ["Respiratory", "Trachea, bronchi, lungs, diaphragm, pleura", "Chest radiography for air, fluid, and lung markings", "Pneumonia or pneumothorax"],
          ["Gastrointestinal", "Esophagus, stomach, small and large intestine, liver, gallbladder, pancreas", "Contrast swallows and enemas, abdominal series, fluoroscopy of motion", "Obstruction or an ulcer"],
          ["Urinary", "Kidneys, ureters, bladder, urethra", "Contrast studies of the collecting system and the bladder", "Stones in the kidney or ureter"],
          ["Musculoskeletal", "Bones, joints, muscles, tendons, ligaments", "Most of the plain-film workload; alignment, cortex, joint spaces", "Fracture or arthritis"],
          ["Nervous", "Brain, spinal cord, peripheral nerves", "Skull and spine positioning; cross-sectional work for soft tissue", "Disc herniation or bleed"],
          ["Endocrine", "Thyroid, parathyroid, adrenals, pancreas, pituitary", "Thyroid uptake work and neck soft tissue", "Thyroid nodule"],
          ["Lymphatic", "Nodes, spleen, thymus, tonsils, vessels", "Node chains and the spleen on cross-sectional work", "Enlarged nodes"]
        ] },
        { type: "list", title: "Word parts and the abdominal map", cols: 2, items: [
          "Prefixes: brady- slow, tachy- fast, hyper- above normal, hypo- below normal, a- or an- without, dys- difficult, peri- around, endo- inside, retro- behind, sub- under",
          "Roots: cardi heart, pulmo or pneumo lung, nephro or reno kidney, hepat liver, gastro stomach, entero intestine, osteo bone, arthro joint, myelo cord or marrow, encephal brain, mammo breast, angio vessel",
          "Suffixes: -itis inflammation, -ectomy removal, -ostomy opening, -oscopy viewing, -graphy the act of recording, -gram the record, -algia pain, -megaly enlargement, -oma tumor, -osis condition",
          "Four quadrants: the median plane and a transverse plane cross at the navel to give right upper, right lower, left upper, and left lower quadrants for clinical description",
          "Nine regions: right hypochondrium, epigastrium, left hypochondrium across the top; right lumbar, umbilical, left lumbar across the middle; right iliac, hypogastrium, left iliac across the bottom",
          "Requisition words to read without pausing: bilateral both sides, unilateral one side, ipsilateral same side, contralateral opposite side, portable at the bedside, stat now"
        ] }
      ]
    },
    {
      id: "radiation", title: "Radiation: quantities, limits, and protection",
      blocks: [
        { type: "table", cols: ["Quantity", "Unit and conversion"], rows: [
          ["Exposure", "Roentgen (R) in the old system; 1 R = 2.58 x 10 to the minus 4 C/kg in SI units"],
          ["Air kerma", "Gray (Gy); the SI replacement for exposure, measured in air"],
          ["Absorbed dose", "Gray (Gy) in SI, rad in the old system; 1 Gy = 100 rad"],
          ["Equivalent dose", "Sievert (Sv) in SI, rem in the old system; 1 Sv = 100 rem"],
          ["Effective dose", "Sievert; absorbed dose weighted for the kind of radiation and the sensitivity of each tissue"],
          ["Activity", "Becquerel in SI, curie in the old system; the number of decays per second in a source"],
          ["Prefixes you will meet", "milli is one thousandth (mSv, mGy, mR), micro is one millionth (microgray, microamps); 1 mSv = 1000 microsieverts"],
          ["One chest image", "About 0.02 mSv to the patient, a useful yardstick when a patient asks"]
        ] },
        { type: "table", cols: ["Dose limit (annual unless stated)", "Value"], rows: [
          ["Occupational effective dose", "50 mSv per year"],
          ["Occupational cumulative dose", "10 mSv x age in years"],
          ["Lens of the eye, occupational", "150 mSv per year"],
          ["Thyroid, skin, hands, and feet, occupational", "500 mSv per year"],
          ["Public, frequent exposure", "1 mSv per year"],
          ["Public, infrequent exposure", "5 mSv per year"],
          ["Embryo or fetus", "5 mSv over the whole gestation; 0.5 mSv in any one month once the pregnancy is declared"],
          ["Education and training, under 18", "1 mSv per year"],
          ["Negligible individual dose", "0.01 mSv per year"],
          ["Natural background", "About 3 mSv per year, radon the largest part"]
        ] },
        { type: "table", cols: ["Cardinal rule or law", "What it says and how it is used"], rows: [
          ["Time", "Dose rises with beam-on time; shorter fluoroscopy time and fewer repeats cut dose for everyone in the room"],
          ["Distance", "The strongest control there is; one step back from the table does more than any apron"],
          ["Shielding", "Lead aprons, mobile shields, the control booth barrier, and lead in the walls"],
          ["Inverse square law", "I1 / I2 = (d2 / d1) squared. Intensity falls with the square of distance, so doubling the distance leaves one quarter the intensity"],
          ["Worked example", "Halving the source-to-skin distance of a fluoroscope from 40 cm to 20 cm raises the entrance exposure about four times from geometry alone, before attenuation is counted"],
          ["ALARA", "As low as reasonably achievable: the lowest technique, the smallest field, and the fewest exposures that still answer the clinical question"]
        ] },
        { type: "table", cols: ["Protective apparel and barrier", "Specification"], rows: [
          ["Apron and glove thicknesses", "0.25, 0.5, and 1 mm lead equivalent; at least 0.25 mm Pb is required and 0.5 mm Pb is the normal working compromise"],
          ["What that buys", "At 75 kVp, 0.25 mm Pb attenuates about 66 percent of the beam and 1 mm Pb about 99 percent"],
          ["Weight", "A 1 mm Pb apron can weigh as much as 12 kg (25 lb), which is why 0.5 mm is standard"],
          ["Inspection", "Fluoroscope or radiograph every apron, glove, and gonadal shield at least once a year; high-kVp radiography, for example 120 kVp at 10 mAs, works when a fluoroscope is not free"],
          ["Thyroid and gonadal shields", "Used and inspected exactly like an apron and imaged on the same annual schedule; read the lead equivalent marked on the garment rather than assuming it"],
          ["Replace when", "Cracks, tears, or holes appear in the image; store on racks, never folded or heaped"],
          ["Bucky slot cover", "At least 0.25 mm Pb equivalent, closing the roughly 5 cm gap at gonadal level during fluoroscopy"],
          ["Protective curtain or panel", "At least 0.25 mm Pb equivalent between the fluoroscopist and the patient"],
          ["Fluoroscopic image receptor assembly", "A primary protective barrier of at least 2 mm Pb equivalent, interlocked so the tube cannot energize when it is parked"],
          ["Control booth barrier", "About 1/16 inch lead equivalent; the exposure switch is fixed to the console, never on a long cord"],
          ["Mobile radiography", "The exposure switch must let the operator stand at least 2 m from the tube, with the beam directed away"]
        ] },
        { type: "table", cols: ["Fluoroscopy limit", "Value"], rows: [
          ["Tabletop intensity, no high-level control", "Must not exceed 10 R/min (100 mGy/min)"],
          ["Tabletop intensity, optional high-level control in use", "Must not exceed 20 R/min (200 mGy/min)"],
          ["Per milliampere of operation at 80 kVp", "Tabletop intensity should not exceed 2.1 R/min (21 mGy/min) for each mA"],
          ["Recorded runs", "There is no intensity limit while the image is being recorded, as in cine or video runs"],
          ["Cumulative timer", "Must give an audible signal once 5 minutes of beam-on time has passed; record total beam-on time for every exam"],
          ["Minimum source-to-skin distance", "Not less than 38 cm on stationary fluoroscopes, not less than 30 cm on mobile fluoroscopes"],
          ["Exposure control", "Dead-man type: release the pedal or switch and the beam stops"],
          ["Total filtration", "At least 2.5 mm Al equivalent, counting the tabletop and cradle between tube and patient"],
          ["Collimation check", "With the input phosphor 35 cm above the tabletop and the shutters fully open, an unexposed border must show on the monitor"]
        ] },
        { type: "table", cols: ["MRI safety item", "What to know"], rows: [
          ["Zones", "Zone I is open to the public, Zone II is reception and screening, Zone III is controlled and badged, Zone IV is the magnet room itself"],
          ["Field strength", "1 T = 10,000 gauss; a common clinical magnet runs at 3 T and is never switched off"],
          ["The 5-gauss line", "The posted boundary of the fringe field; beyond about 5 G a pacemaker or other implant can be disturbed, so it marks where screening must already be done"],
          ["Projectiles", "Any ferromagnetic tool, cylinder, or cart becomes a missile; carts, ladders, and test gear taken into Zone IV must be labeled MR Safe or MR Conditional"],
          ["Quench", "A sudden loss of superconduction boils off the cryogen; the quench pipe vents it outside, and a room-side release displaces oxygen"],
          ["Cryogens", "Liquid helium boils at 4 K and liquid nitrogen at 77 K; cold burns and asphyxiation are the hazards"],
          ["RF energy", "Deposited RF heats tissue; looped leads, pulse oximeter cables, and damaged coils cause burns"],
          ["Implants and screening", "Screen every person and every piece of equipment, every time; labels are MR Safe, MR Conditional, or MR Unsafe"],
          ["EMI both ways", "The scanner radiates interference into nearby monitors and pumps, and a noisy device in the room spoils the image; the shielded room and its filter panel keep both out"]
        ] },
        { type: "table", cols: ["Shielding practice", "Detail"], rows: [
          ["Gonadal shields", "A lead gonadal shield cuts ovary exposure by about 50 percent and testicular exposure by about 95 percent"],
          ["When to use one", "Whenever the gonads lie within about 0.5 cm of the primary beam and the shield will not cover the region of interest"],
          ["Shield types", "Flat contact shields laid on the patient, and shadow shields hung in the beam from the tube housing"]
        ] },
        { type: "note", text: "Pregnancy and pediatrics: ask, then declare. Once a pregnancy is declared the monthly limit of 0.5 mSv applies to the embryo or fetus. Shield what is not being imaged, collimate to the anatomy, choose the lowest technique that still answers the question, immobilize rather than repeat, and use a gonadal shield whenever it will not cover the region of interest. Children are more radiosensitive than adults because dividing cells are the most sensitive cells there are." }
      ]
    },
    {
      id: "regulation", title: "Regulators, standards, and what each asks for",
      blocks: [
        { type: "table", cols: ["Body", "What it does and what it asks you for"], rows: [
          ["FDA", "Regulates medical devices, including every radiation-emitting product; the Center for Devices and Radiological Health (CDRH) carries the work that the former Bureau of Radiological Health (BRH) began"],
          ["21 CFR 1020", "The federal performance standards for radiation-emitting products: leakage, timers, indicators, collimation, and fluoroscopic limits"],
          ["State radiation control programs", "Register every tube, inspect rooms, license or credential operators, and set posting and survey rules; CRCPD is where those state programs write their shared suggested regulations"],
          ["NRC", "Licenses byproduct radioactive material, which is why nuclear medicine work has its own licence, surveys, and records"],
          ["CMS", "Sets the conditions of participation a hospital must meet to be paid, and may survey directly"],
          ["TJC", "The Joint Commission surveys environment of care: a complete equipment inventory, a maintenance strategy, PM completion rates, test records, and inspection history"],
          ["MQSA", "Federal mammography law under the FDA: accreditation, annual inspection, an annual medical physicist survey, personnel qualifications, and a written QC program"],
          ["ACR", "The American College of Radiology accredits imaging programs and publishes the phantoms and scoring that accreditation uses"],
          ["OSHA", "Worker safety: hazard communication, bloodborne pathogens, lockout and electrical practice, and the PPE the employer must supply"],
          ["ANSI and AAMI", "The equipment management standards a healthcare technology program is written against; ANSI accredits the process and AAMI writes the content"],
          ["NCRP", "Publishes the dose limits and the shielding design reports that physicists use for room barriers"],
          ["NEMA", "Equipment standards from the manufacturers' association, including focal spot tolerances and the DICOM standard's home"]
        ] },
        { type: "table", cols: ["Federal performance number", "Limit"], rows: [
          ["Tube housing leakage radiation", "Less than 100 mR/h (about 1 mGy/h) at 1 m from the housing"],
          ["AEC backup timer", "Must end the exposure at 6 s or 600 mAs, whichever comes first"],
          ["Light field to x-ray field", "Must coincide within 2 percent of the SID; at a 100 cm SID that is 2 cm"],
          ["PBL accuracy", "Within 2 percent of the SID at every standard distance and receptor size"],
          ["SID indicator", "Accurate to within 2 percent of the indicated SID"],
          ["Beam-on indication", "The console must positively show the conditions of exposure and that the tube is energized"],
          ["Minimum total filtration", "At least 2.5 mm Al above 70 kVp, at least 1.5 mm Al from 50 to 70 kVp, at least 0.5 mm Al below 50 kVp"],
          ["Fluoroscopic limits", "As in the radiation section: 10 R/min without high-level control, 20 R/min with it, 5-minute audible timer, SSD 38 cm stationary and 30 cm mobile"]
        ] },
        { type: "table", cols: ["Operating kVp", "Minimum HVL, single phase (mm Al)", "Minimum HVL, three phase or high frequency (mm Al)"], rows: [
          ["30", "0.3", "0.4"],
          ["50", "1.2", "1.5"],
          ["70", "1.6", "2.0"],
          ["90", "2.6", "3.1"],
          ["130", "3.6", "4.2"]
        ] },
        { type: "table", cols: ["CMMS record", "What it must hold"], rows: [
          ["Equipment inventory", "Every device by control number, model, serial number, location, risk class, and PM interval; this is the first thing a surveyor asks to see"],
          ["Work order", "Who, what, when, the symptom in the caller's words, the finding, the parts used, labor time, and the test results after the repair"],
          ["PM due list", "What is due this month, what is overdue, and the completion rate by area"],
          ["Service history", "Every visit on a device, so repeat failures and a replace-or-repair decision are visible"],
          ["Recall and alert tracking", "Which devices a notice touches, what was done, and when"],
          ["Compliance and performance reports", "PM completion, mean time between failures, downtime, and cost per device for the management review"],
          ["Vendor records", "Contracts, remote access accounts, and the outside service reports filed against the same device"]
        ] }
      ]
    },
    {
      id: "electricity", title: "Electricity, electronics, and imaging power",
      blocks: [
        { type: "table", cols: ["Formula", "Statement"], rows: [
          ["Ohm's law", "V = I x R; I = V / R; R = V / I"],
          ["Power", "P = V x I; P = I squared x R; P = V squared / R, in watts"],
          ["Series circuit", "One path: resistances add, the current is the same everywhere, the voltages across the parts add to the source"],
          ["Parallel circuit", "Several paths: the reciprocals of the resistances add, the voltage is the same across each branch, the branch currents add"],
          ["Imaging system power rating", "(mA x kVp) / 1000 = kW; 1,000 mA at 120 kVp is 120 kW. For a single-phase system multiply the answer by 0.7"],
          ["Transformer turns", "Secondary voltage = primary voltage x (secondary turns / primary turns); 120 V through a 750:1 step-up gives 90,000 V, that is 90 kVp"],
          ["AC values", "RMS = 0.707 x peak; peak = 1.414 x RMS; mains in the United States is 120 V RMS at 60 Hz"]
        ] },
        { type: "table", cols: ["Prefix or unit", "Meaning on an imaging console"], rows: [
          ["kilo (k)", "One thousand; kV is a thousand volts, kW a thousand watts"],
          ["milli (m)", "One thousandth; mA is a thousandth of an ampere, ms a thousandth of a second"],
          ["micro", "One millionth; leakage limits are written in microamps"],
          ["kVp", "Kilovolt peak, the highest voltage across the tube during the exposure; it sets beam quality"],
          ["mA", "Tube current, the number of electrons crossing the tube per second; it sets beam quantity"],
          ["mAs", "mA x exposure time in seconds; the single number that sets how many x-rays are made"]
        ] },
        { type: "table", cols: ["Component", "What it does in imaging equipment"], rows: [
          ["Resistor", "Limits current and drops voltage; the filament circuit uses precision resistors to set mA"],
          ["Capacitor", "Stores charge, smooths rectified voltage, and passes AC while blocking DC"],
          ["Inductor", "Opposes a change in current; the core of transformers, chokes, and the stator windings"],
          ["Transformer", "Changes AC voltage by turns ratio; the autotransformer sets kVp, the step-up makes kilovolts, the step-down heats the filament"],
          ["Diode", "Conducts one way only, about 0.7 V forward drop in silicon"],
          ["Rectifier", "A diode set that turns AC into the one-way current the tube needs; solid-state today, vacuum-tube valves historically"],
          ["Transistor", "Switches or amplifies under control of a small base or gate current"],
          ["SCR", "A silicon controlled rectifier: a gate-triggered switch used to chop and control AC power"],
          ["Fuse and breaker", "Open on overcurrent; a fuse is replaced, a breaker is reset, and a repeat trip is a fault, not a nuisance"],
          ["Relay and contactor", "A small coil current switches a large load; the rotor and exposure contactors click when the generator is told to run"],
          ["Interlock", "A switch in series with the exposure circuit: door, rotor ready, receptor parked, collimator cassette size"],
          ["LED", "Light-emitting indicator and the backlight of a console display; an unlit LED is a place to start, not proof of a fault"],
          ["Thermal switch", "Opens when the tube housing or oil reaches its limit and locks out the exposure until it cools"]
        ] },
        { type: "table", cols: ["Facility and room power", "Fact"], rows: [
          ["Single-phase service", "120/240 VAC at 60 Hz, with a grounded center neutral"],
          ["What an imaging room is fed", "Most imaging systems are designed for 220 V; some run on 110 V and some on 440 V. Three-phase VAC service feeds the larger generators"],
          ["Low-voltage rails", "Logic, interface, and interlock boards run on VDC rails fed from the cabinet supplies; measure each rail at the test point the manual names before condemning a board"],
          ["Dedicated feed and disconnect", "An imaging room has its own feeder and a lockable disconnect; find it and tag it before any service inside the generator cabinet"],
          ["Line voltage compensation", "Building power is never steady enough for repeatable exposures; the line compensator measures the incoming supply and corrects it ahead of the autotransformer"],
          ["Autotransformer", "A single tapped winding; the kVp selector picks taps on it, and a pre-reading voltmeter shows the kVp before the exposure"],
          ["Step-up transformer", "The secondary carries 500 to 1,000 turns for every primary turn, which is how a few hundred volts becomes 100 kVp"],
          ["Filament step-down transformer", "Drops voltage and raises current; a filament current of about 4 A or more boils electrons off the coil"],
          ["Grounding", "Every cabinet, rail, and table is bonded; a lifted ground is the most common cause of a leakage failure and of image noise at the same time"]
        ] },
        { type: "table", cols: ["Waveform", "Ripple and what it means"], rows: [
          ["Single phase, half-wave", "Only the positive half of each cycle reaches the tube; the most pulsed, least efficient supply, still seen in dental and some portables"],
          ["Single phase, full-wave", "Both halves are used, so the pulse rate doubles; ripple is still 100 percent, falling to zero twice a cycle"],
          ["Three phase, six pulse", "About 14 percent ripple, so the tube voltage never drops below about 86 percent of peak"],
          ["Three phase, twelve pulse", "About 4 percent ripple, never below about 96 percent of peak"],
          ["High frequency", "About 1 percent ripple, a nearly constant voltage; the most efficient and now the standard"],
          ["Why ripple matters", "Less ripple means greater x-ray quantity and quality for the same settings, so the same technique on a different generator is not the same exposure"],
          ["Inverse voltage", "Without rectification the negative half-cycle puts voltage backward across the tube and can destroy it"]
        ] },
        { type: "table", cols: ["Power protection", "What it is for"], rows: [
          ["UPS, online double conversion", "Always runs the load from the inverter; the cleanest protection, used for consoles, archives, and workstations"],
          ["UPS, line-interactive", "Regulates voltage and switches to battery on loss; a good fit for small modality computers"],
          ["UPS, standby", "Passes mains through until it fails, then switches; the cheapest and the slowest"],
          ["Line conditioner", "Regulates and filters without a battery; cures noise and sag, not a blackout"],
          ["Isolation transformer", "Breaks the galvanic path to clear ground loops and noise on long cable runs"],
          ["Surge protection", "Clamps transients from switching and lightning; a surge strip is not a UPS"],
          ["What a brownout does", "Low line voltage makes the generator read kVp low, abort exposures, or throw a line-compensation fault; check the incoming supply before chasing boards"]
        ] },
        { type: "table", cols: ["Battery system", "What to check"], rows: [
          ["Where they are", "Ultrasound carts, portable radiographic units, C-arm memories, and the backup supplies for consoles"],
          ["Chemistry", "Sealed lead-acid packs in older carts, lithium-ion in newer ones; never mix a replacement chemistry a unit was not built for"],
          ["Charging practice", "Leave the unit on the charger between cases; a sealed lead-acid pack left discharged sulfates and will not come back"],
          ["Capacity fade", "Run time and the number of exposures per charge fall with age; log them, because the trend is the warning"],
          ["What a weak pack does", "A portable with a low pack gives low or aborted exposures, resets mid-exposure, or will not spin the rotor; measure the pack under load, not at rest"]
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
          ["Applied part types", "Type B touches the body but not the heart, BF is body floating and isolated, CF is cardiac floating and safe for a direct heart connection"]
        ] }
      ]
    },
    {
      id: "tubes", title: "X-ray production, tubes, and generators",
      blocks: [
        { type: "table", cols: ["Tube part", "Facts worth memorizing"], rows: [
          ["Cathode", "The negative end: a thoriated tungsten filament, 1 to 2 percent thorium, coiled about 1 to 2 cm long and about 2 mm across, inside a negatively charged focusing cup that herds the electrons toward the target"],
          ["Dual focus", "Two filaments in the cup, small for detail and large for thick parts; the console mA selection picks which one is heated"],
          ["Anode", "The positive end, a tungsten-rhenium target disc backed by molybdenum or graphite; it collects the electrons and radiates heat"],
          ["Why tungsten", "Atomic number 74 for efficient x-ray production, thermal conductivity close to copper, and a melting point of about 3,400 C"],
          ["Rotor and stator", "An induction motor spins the anode, about 3,400 rpm on standard tubes and about 10,000 rpm on high-speed tubes; reversing the stator field brakes it"],
          ["Anode angle", "About 5 to 20 deg on diagnostic tubes; the smaller the angle, the smaller the effective focal spot and the stronger the heel effect"],
          ["Line-focus principle", "Angling the target shortens a long focal track into a small effective focal spot: a 10 mm by 1 mm line becomes about a 1 mm square seen from the receptor"],
          ["Heel effect", "Intensity is lower on the anode side of the field because those x-rays pass through more target material; put the thick anatomy under the cathode side"],
          ["Focal spot sizes", "Small stations run about 0.3 to 0.6 mm and large stations about 1.0 to 1.2 mm; mammography goes down to 0.1 mm. Nominal sizes carry an allowed variance, so a nominal 0.3 mm spot may measure up to 0.45 mm and still pass"],
          ["Envelope", "A glass or metal vacuum envelope; vaporized tungsten plating the inside of a glass envelope causes arcing, which is why metal envelopes last longer"],
          ["Oil and housing", "Oil insulates and carries heat out to the lead-lined housing, which also limits leakage radiation and protects against shock"],
          ["Window and filtration", "Inherent filtration from the envelope, port, and oil plus added aluminum makes the total filtration"]
        ] },
        { type: "table", cols: ["Production fact", "Detail"], rows: [
          ["Efficiency", "Only about 1 percent of the electrons' kinetic energy becomes x-rays; about 99 percent becomes heat"],
          ["Bremsstrahlung", "Electrons braked by the nuclear field emit a continuous spread of energies; it is the bulk of the diagnostic beam"],
          ["Characteristic radiation", "An inner-shell vacancy filled from an outer shell emits a photon at exactly the difference in binding energies; only K-shell transitions in tungsten are diagnostically useful"],
          ["Tungsten K-shell", "Binding energy about 69.5 keV, so characteristic K x-rays only appear above that tube potential"],
          ["Beam quality", "Set by kVp and filtration; quality means penetrability and is measured as the HVL"],
          ["Beam quantity", "The number of photons; it rises linearly with mAs and about with the square of the kVp"]
        ] },
        { type: "table", cols: ["Exposure factor", "Rule"], rows: [
          ["kVp", "Controls penetrability and contrast and strongly affects quantity; x-ray quantity is proportional to kVp squared"],
          ["mA", "Linear with quantity: double the mA and twice as many electrons cross the tube, at the same energies"],
          ["Exposure time", "Linear with quantity; short times freeze motion and are the first thing to shorten on a moving patient"],
          ["mAs and reciprocity", "mAs = mA x seconds; any pair that gives the same mAs should give the same receptor exposure, which is exactly what the linearity test checks"],
          ["The 15 percent rule", "Raising kVp by 15 percent is equivalent to doubling the mAs; to hold receptor exposure steady, raise kVp 15 percent and halve the mAs, accepting lower contrast"],
          ["Filtration", "Removes low-energy photons that only dose the patient; it raises average energy and the HVL and lowers quantity"],
          ["Distance", "Pure inverse square law: receptor exposure falls with the square of the SID"],
          ["Magnification factor", "MF = SID / SOD; about 1.1 at a 100 cm SID and about 1.05 at 180 cm"]
        ] },
        { type: "table", cols: ["Heat fact", "Value"], rows: [
          ["Heat units, single phase", "HU = kVp x mA x s; 98 kVp at 120 mAs is 11,760 HU"],
          ["Heat units, three phase or high frequency", "HU = 1.4 x kVp x mA x s, because a lower-ripple waveform makes more heat for the same settings"],
          ["Energy equivalent", "1 HU = 1.4 joules; a single-phase heat unit is about 0.7 J"],
          ["Fluoroscopic heat", "Multiply by the beam-on seconds: 76 kVp at 1.5 mA for 3.5 min is 23,940 HU on a single-phase system"],
          ["Rating charts", "The tube rating chart says whether one exposure is safe; the anode cooling curve and the housing cooling curve say how long to wait before the next series"],
          ["How heat leaves", "Radiation from the anode, conduction up the stem into the envelope and oil, convection in the oil to the housing, then into the room"],
          ["Peak temperatures", "The anode runs at its hottest for only about 1 to 3 seconds per exposure, which is why a cooling anode still fails if the next series starts too soon"]
        ] },
        { type: "table", cols: ["Tube failure mode", "Cause and what you see"], rows: [
          ["Filament evaporation", "Tungsten boils off a hot filament, thins the coil, and plates the envelope; output drifts low, then the filament opens and the tube will not energize"],
          ["Anode pitting and melting", "Repeated overload roughens the target; output falls and becomes unpredictable across stations"],
          ["Cracked anode", "A cold anode loaded hard cracks or wobbles; the tube fails at once, which is why a warm-up series exists"],
          ["Arcing", "Tungsten plated inside a glass envelope conducts, so the tube current jumps the vacuum; the generator throws an overcurrent or tube-arc fault"],
          ["Bearing wear", "Heat conducted into the rotor assembly ruins the bearings; a noisy or slow rotor and a rotor-fault lockout follow. Long fluoroscopic runs are hardest on them"],
          ["Overheating", "The most common cause of early failure; the main defenses are the lowest technique that works, fewer repeats, and respecting the rating chart"],
          ["Expected life", "A correctly used tube will give at least about 50,000 exposures before it becomes a failure risk"]
        ] },
        { type: "table", cols: ["Generator control", "What it does"], rows: [
          ["kVp selector", "Picks taps on the autotransformer; verify against a non-invasive meter, not against the display"],
          ["mA selector", "Sets filament heating through the filament circuit; the stations must stay within 10 percent of each other"],
          ["Time and mAs", "Timer types are synchronous (multiples of 1/60 s), electronic (the common and most accurate type), mechanical (portables and dental), mAs, and automatic"],
          ["AEC", "Ionization chambers in front of the receptor end the exposure when enough radiation has arrived; cell selection, density steps, and the backup timer are all part of it"],
          ["Backup timer", "Ends the exposure at 6 s or 600 mAs if the AEC does not; test it by putting lead over the cell"],
          ["Line compensation", "Holds the supply steady so the same technique gives the same exposure all day"],
          ["Rotor and ready", "Pressing the first stage spins the anode and heats the filament; the ready light means the interlock chain is satisfied"],
          ["Exposure switch and interlocks", "Two-stage dead-man switch in series with door, rotor-ready, receptor, and collimator interlocks; any open link gives no exposure and no fault code"]
        ] },
        { type: "table", cols: ["Image quality factor", "Raised by", "Lowered by"], rows: [
          ["Density (overall blackening)", "More mAs, higher kVp, shorter distance, faster receptor", "Less mAs, lower kVp, longer distance, a grid without compensation"],
          ["Contrast", "Lower kVp, a grid, collimation, compression", "Higher kVp, scatter, fog, a large field"],
          ["Recorded detail", "Small focal spot, long SID, short OID, no motion", "Large focal spot, short SID, long OID, patient or equipment motion"],
          ["Distortion", "Correct alignment and centering reduce it", "Angled parts, off-center anatomy, uneven OID across a thick part"],
          ["Noise", "Enough mAs at the receptor keeps it low", "Too little exposure, high receptor gain, scatter"]
        ] },
        { type: "table", cols: ["Beam control device", "Facts"], rows: [
          ["Collimator", "Two pairs of lead shutters at right angles plus a lamp and mirror; the light field must match the x-ray field within 2 percent of the SID"],
          ["Cones and aperture diaphragms", "Fixed restrictors used for special work; they limit the field more tightly than shutters"],
          ["PBL", "Positive beam limitation sizes the shutters automatically to the receptor; it must hold 2 percent of the SID at all standard distances"],
          ["Grid ratio", "Lead strip height divided by the gap between strips; usually 4:1 to 16:1. Higher ratio removes more scatter and costs more dose"],
          ["Grid frequency", "Strips per inch, usually 60 to 150; mammography grids run 30 to 50 lines per cm at 4:1 or 5:1"],
          ["Grid types", "Linear (parallel strips), focused (angled to match beam divergence, labeled side to the tube), crossed (two linear grids at right angles)"],
          ["Bucky factor", "The mAs increase a grid costs, also called the grid conversion factor; it rises with grid ratio and with kVp"],
          ["Contrast improvement factor", "Contrast with the grid divided by contrast without it; most grids land between 1.5 and 2.5, roughly doubling contrast"],
          ["Air gap technique", "A deliberately long OID lets scatter miss the receptor instead of using a grid; it magnifies the image"],
          ["Compensating filters", "Wedge and trough filters even out exposure across a part that changes thickness"]
        ] }
      ]
    },
    {
      id: "receptors", title: "Receptors, fluoroscopy, mammography, CT, ultrasound, nuclear medicine, MRI",
      blocks: [
        { type: "table", cols: ["Receptor", "How it works and what fails"], rows: [
          ["Film and intensifying screens", "History on most sites, but the vocabulary survives: optical density, screen speed, screen-film contact, and the processor artifacts that still appear in exam questions"],
          ["CR", "Computed radiography: a PSP plate stores the latent image, a laser scanner reads the glow out line by line, then a bright erase lamp clears the plate for reuse"],
          ["CR faults", "Dust and scratches on the plate print on every image, an incomplete erase leaves a ghost of the last exposure, and a worn plate loses speed"],
          ["DR, indirect", "A CsI scintillator converts x-rays to light onto an amorphous silicon TFT array; the most common fixed-room detector"],
          ["DR, direct", "Amorphous selenium converts x-rays straight to charge with no light step, which keeps the signal sharp"],
          ["DQE", "Detective quantum efficiency: how much of the radiation reaching the detector becomes usable signal. Higher DQE means the same image at less dose"],
          ["EI and DI", "The exposure index reports how much radiation the detector received; the deviation index compares it with the target for that exam, so it is the technologist's dose feedback loop"],
          ["Detector calibration", "Offset (dark) correction, gain (flat-field) correction, and a defective pixel map; a skipped calibration shows as banding, a shading gradient, or stuck pixels"],
          ["Detector care", "Portable detectors are dropped, flexed, and soaked; inspect cases and cables, and handle the boards inside with ESD precautions"]
        ] },
        { type: "table", cols: ["Fluoroscopy item", "Facts"], rows: [
          ["Image intensifier chain", "Input phosphor, photocathode, electrostatic focusing lenses, anode, output phosphor; output phosphors are about 2.5 or 5 cm, input phosphors 10 to 40 cm"],
          ["Flux gain", "Each photoelectron reaching the output phosphor makes 50 to 75 times as many light photons as were needed to create it"],
          ["Minification gain", "The square of the input phosphor diameter divided by the square of the output phosphor diameter"],
          ["Brightness gain", "Brightness gain = minification gain x flux gain"],
          ["ABC", "Automatic brightness control holds image brightness by raising mA, kVp, or pulse width as the patient thickens; it is why dose rate climbs on a large patient"],
          ["Magnification modes", "A smaller input field uses less of the phosphor, so the system raises dose rate to keep brightness; magnification always costs dose"],
          ["Flat-panel fluoroscopy", "No intensifier tube: a dynamic flat detector gives even brightness across the field and no vignetting or S-distortion"],
          ["Pulsed fluoroscopy", "Short pulses at a chosen rate instead of continuous beam; the single biggest dose saving available to the operator"],
          ["Last-image hold", "Freezes the final frame on screen so the team can study it with the beam off"],
          ["DSA", "Digital subtraction angiography: a mask image taken before contrast is subtracted from the contrast run, so only vessels remain. Any patient motion ruins it"],
          ["C-arm and the suite", "A mobile or fixed C-arm adds its own collimator, laser aimers, brakes, detents, cables, and foot switches to the PM list"]
        ] },
        { type: "table", cols: ["Mammography item", "Facts"], rows: [
          ["Targets and filters", "Molybdenum, rhodium, or tungsten targets with matching molybdenum or rhodium filters, chosen to shift the spectrum into the useful range for soft tissue"],
          ["Technique", "About 23 to 28 kVp as the compromise between dose at low kVp and lost contrast at high kVp; total filtration at least 0.5 mm Al equivalent through a beryllium window"],
          ["Focal spot", "Very small, down to about 0.1 mm, because the target is microcalcifications"],
          ["Geometry", "The cathode goes toward the chest wall so the heel effect evens out the thicker tissue; SID about 60 to 80 cm"],
          ["Compression", "Both power and manual modes must reach 25 to 40 lb and hold it at least 15 seconds; 40 lb must never be exceeded in automatic mode"],
          ["Why compress", "Thinner, more even tissue means less scatter, less motion, a shorter OID, better contrast, and lower dose"],
          ["Grids and AEC", "Grids of 4:1 or 5:1 at 30 to 50 lines per cm; the AEC detector sits behind the receptor and reads both intensity and quality"],
          ["Digital detectors", "TFT arrays with thallium-activated cesium iodide, or a CCD; film-screen still edges them on spatial resolution, while digital wins on contrast and post-processing"],
          ["DBT", "Digital breast tomosynthesis sweeps the tube through an arc and reconstructs slices, so the gantry motion and the arc calibration join the QC list"],
          ["QC schedule", "Processor or detector checks daily, a phantom image weekly, a visual checklist monthly, repeat analysis quarterly, compression at least semiannually, and a medical physicist survey annually or after a major component change"],
          ["ACR phantom scoring", "Count from largest to smallest; the minimum to pass accreditation is four fibers, three speck groups, and three masses, and a score must not drop more than 0.5 from the last image"]
        ] },
        { type: "table", cols: ["CT item", "Facts"], rows: [
          ["Gantry", "Tube and detector array rotate together around the bore; the slip ring carries power and signals so rotation never has to stop"],
          ["Helical scanning", "The couch moves while the gantry turns, so the beam traces a spiral through the patient"],
          ["Pitch", "Couch travel per rotation divided by beam width, written as a ratio such as 1.0:1; above 1 the spiral stretches and dose falls, below 1 it overlaps and dose rises"],
          ["HU scale", "Hounsfield units run from -1000 to +3000: air is -1000, water is exactly 0 by calibration, and dense bone is about +3000"],
          ["Calibration", "Detector response is calibrated continuously so water always reads 0; a water-phantom drift is the classic reason numbers go wrong across the field"],
          ["Tube and cooling", "CT tubes carry huge heat loads, so housing cooling, chillers, and the heat-unit budget govern how fast a schedule can run"],
          ["Reconstruction", "Raw data is reconstructed into images, then windowed for display; the archive keeps the images, and sometimes the raw data, under its own retention rule"],
          ["What the technician services", "Table motion and alignment, laser lights, slip-ring brushes, detector and air calibrations, chillers and filters, console and reconstruction computers, and the DICOM link to the archive"]
        ] },
        { type: "table", cols: ["Ultrasound item", "Facts"], rows: [
          ["How it works", "A probe's piezoelectric elements turn an electrical pulse into sound and the returning echo back into a voltage; no ionizing radiation is involved"],
          ["Frequency trade-off", "Higher frequency gives finer detail but less penetration; lower frequency reaches deep structures with coarser detail"],
          ["Attenuation", "Sound weakens with depth and is blocked by bone and gas, which is why gel, window, and patient preparation matter so much"],
          ["Probe types", "Linear for superficial work, curved for abdomen and obstetrics, phased array for cardiac, TEE for the esophagus, and intracavity probes"],
          ["Doppler", "Measures motion and flow from the frequency shift of the echo; noise and poor contact ruin it before they ruin the gray-scale image"],
          ["HLD", "Probes that touch mucous membranes need high-level disinfection between patients; the wrong chemical or a soaked connector destroys a probe"],
          ["Element dropout", "A dead element or broken cable wire leaves a dark stripe straight down the image that does not move when the probe moves; test with a phantom and replace the probe"],
          ["What the technician services", "Probes and their connectors, cart power and batteries, display and controls, air filters, cleaning damage, and the network link that sends studies to the archive"]
        ] },
        { type: "table", cols: ["Nuclear medicine item", "Facts"], rows: [
          ["Gamma camera chain", "Collimator, NaI scintillation crystal, light guide, PMT array, position and energy circuits, then the computer"],
          ["Technetium-99m (Tc-99m)", "The workhorse tracer; it decays to technetium-99 emitting a 140 keV gamma ray, which is the energy window the camera is peaked for"],
          ["PET", "Positron emitters annihilate with electrons and send out a pair of photons of about 0.51 MeV in opposite directions; the detector ring counts the coincidences"],
          ["Hybrid systems", "SPECT/CT and PET/CT put a CT gantry in line for attenuation correction and anatomy; they bring every CT service item with them"],
          ["Dose calibrator and survey meters", "Doses are assayed in a dose calibrator before injection, and Geiger counters find contamination on surfaces; both are themselves calibrated and logged"],
          ["What the technician services", "Detector and collimator handling, PMT tuning and uniformity corrections, table and gantry motion, computers and network links; the radiopharmacy side belongs to licensed staff"]
        ] },
        { type: "table", cols: ["MRI item", "Facts"], rows: [
          ["Magnet", "A superconducting coil in a liquid-helium bath, measured in tesla, commonly 3 T; the field is always on"],
          ["Gradients and RF", "Gradient coils bend the field to encode position and are what make the banging noise; RF coils transmit and receive the signal"],
          ["Cold chain", "Compressor, cold head, and chiller keep the helium cold; a rising helium level alarm or a warm cold head is an emergency, not a work order for next week"],
          ["Shielded room", "Copper shielding and a filter panel keep outside RF out and the gradient field in; a propped door or a bad penetration shows up as zipper artifacts"],
          ["What the technician services", "Chillers and compressors, coils and their cables, table motion, patient monitors and peripherals rated for the room, and the console and network side"]
        ] }
      ]
    },
    {
      id: "pm", title: "PM, QC, and test equipment",
      blocks: [
        { type: "table", cols: ["PM area", "What the visit must cover"], rows: [
          ["Mechanical", "Locks, brakes, detents, counterweights, cables and chains, bearing play, tube stand and ceiling rails, table travel, collision sensors and bumpers"],
          ["Electrical safety", "Ground resistance 0.5 ohm maximum and chassis leakage within the limit your facility cites, measured with a safety analyzer at incoming inspection, after repair, and on schedule"],
          ["Interlocks", "Door, rotor ready, receptor parked, collimator, and emergency stops; prove each one actually blocks the exposure"],
          ["Radiation output", "kVp accuracy, timer, linearity, reproducibility, HVL, and leakage, to the schedule the state and the manufacturer set"],
          ["Software and logs", "Read the error log every visit, note firmware versions, and clear only after recording; patch on the vendor's validated schedule"],
          ["Cleaning and environment", "Filters, fans, dust in cabinets, room temperature and humidity; heat kills generators and detectors"],
          ["Documentation", "Close the work order with readings, not adjectives: the measured value, the tolerance, and pass or fail"]
        ] },
        { type: "table", cols: ["Radiographic QC test", "Tolerance"], rows: [
          ["kVp accuracy", "Measured kVp within 10 percent of the indicated kVp"],
          ["Exposure timer accuracy", "Within 5 percent of the indicated time above 10 ms; 20 percent is acceptable at 10 ms or less"],
          ["mA linearity", "No more than 10 percent variation in output per mAs between adjacent mA stations"],
          ["Exposure reproducibility", "Output must not vary by more than plus or minus 5 percent over repeated identical exposures"],
          ["Light field and x-ray field", "Coincide within 2 percent of the SID"],
          ["PBL and SID indicator", "Each within 2 percent of the SID"],
          ["HVL", "Measure and compare with the minimum for that kVp and waveform; meeting it proves the filtration is adequate"],
          ["Focal spot size", "Measured with a pinhole camera, star pattern, or slit camera and compared with the nominal size and its allowed variance"],
          ["AEC performance", "Constant image density through varying thicknesses of aluminum or acrylic, plus a backup timer test at 6 s or 600 mAs"],
          ["Protective apparel", "Image every apron, glove, and shield at least annually"],
          ["When to retest", "Annually, after any major repair to the console or high-voltage generator, and whenever output looks wrong"]
        ] },
        { type: "table", cols: ["Fluoroscopy QC test", "What to measure"], rows: [
          ["Tabletop exposure rate", "With a chamber at the tabletop: 10 R/min without high-level control, 20 R/min with it"],
          ["Cumulative timer", "Audible signal at 5 minutes of beam-on time"],
          ["Source-to-skin distance", "At least 38 cm stationary, 30 cm mobile; check the spacer is present and not removed for convenience"],
          ["Collimation", "An unexposed border visible with the input phosphor 35 cm above the tabletop and the shutters open"],
          ["Image quality", "A resolution and low-contrast phantom at a fixed geometry, compared with the baseline image kept on file"],
          ["Protective devices", "Bucky slot cover and protective curtain present, 0.25 mm Pb equivalent, and actually in place during the run"]
        ] },
        { type: "table", cols: ["Mammography QC task", "Frequency"], rows: [
          ["Processor or detector check", "Daily"],
          ["Darkroom or reading-area cleanliness", "Daily"],
          ["Phantom image and score", "Weekly"],
          ["Viewing conditions and screen cleanliness", "Weekly"],
          ["Visual checklist", "Monthly"],
          ["Repeat analysis", "Quarterly, or every 250 patients"],
          ["Compression force", "At least semiannually"],
          ["Medical physicist survey", "Annually and after any major component change"]
        ] },
        { type: "table", cols: ["Ultrasound QC task", "What to do"], rows: [
          ["Phantom scan", "Record depth of penetration, resolution, and uniformity at fixed settings and compare with the baseline"],
          ["Probe inspection", "Look and feel for cracks in the lens, kinked cables, bent connector pins, and chemical damage"],
          ["Display and controls", "Check brightness and contrast against the test pattern, and that every control and footswitch still works"]
        ] },
        { type: "table", cols: ["Test instrument", "What it is for"], rows: [
          ["Non-invasive kVp meter", "Reads kVp, time, dose, dose rate, and HVL from outside the beam path; the backbone of radiographic QC"],
          ["Ionization chamber", "The reference dose and dose-rate detector for output, fluoroscopic rate, and leakage measurements"],
          ["Solid-state detector", "Compact dose and kVp sensing in a multimeter-style QC instrument"],
          ["DAP meter", "Measures dose area product under the collimator, which tracks both dose and the volume of tissue irradiated"],
          ["Timer and mAs meter", "Verifies exposure time and mAs independently of the console display"],
          ["HVL filter set", "Calibrated aluminum sheets added in steps until intensity halves; that thickness is the HVL"],
          ["Phantoms and test tools", "Resolution and contrast phantoms, the beam-alignment and collimation test tool, pinhole and star patterns, the mammography and CT accreditation phantoms"],
          ["Dosimeters worn by staff", "TLD and OSL badges read by a service, plus direct-reading electronic dosimeters for immediate feedback"],
          ["DMM or DVM", "Voltage, current, and resistance at the test points the service manual names; on continuity an OL reading means the path is open"],
          ["Electrical safety analyzer", "Ground resistance and leakage against the NFPA 99 and IEC 60601-1 limits, in normal, reversed-polarity, and open-ground conditions"],
          ["Dose calibrator", "Assays activity in nuclear medicine before a dose is given; it has its own constancy, accuracy, linearity, and geometry tests"]
        ] },
        { type: "table", cols: ["What a surveyor asks for", "Where it comes from"], rows: [
          ["Equipment inventory", "The CMMS, complete, current, and risk-classified"],
          ["PM completion record", "The CMMS due list with completion rates and reasons for anything overdue"],
          ["QC logs", "Signed, dated records with readings and tolerances, including the technologist-level daily checks"],
          ["Physicist reports", "Annual surveys with findings, corrective actions, and the date each was closed"],
          ["Radiation safety records", "Dosimetry reports, the radiation safety committee minutes, and room shielding designs"],
          ["Recalls and alerts", "The notice, the devices affected, what was done, and when"],
          ["Training records", "Who is competent on what, including contractors and anyone with remote access"]
        ] }
      ]
    },
    {
      id: "troubleshooting", title: "Troubleshooting imaging systems",
      blocks: [
        { type: "list", title: "The method, every time", cols: 2, items: [
          "Symptom: get it in the user's own words, with the exam, the room, and the exact step where it happens. Not working is not a symptom",
          "History: ask what changed, read the error log and the service history, and find out whether it ever worked this way",
          "Isolate: split the chain into power, control, generation, geometry, receptor, and network, then prove which side of each split is good",
          "Verify: after the fix, run the test that would have caught the fault, measure, and record the number",
          "Device error versus use error: reproduce it yourself. A fault nobody else can reproduce is often a workflow or training problem, and the fix is a demonstration, not a part",
          "Repair, replace, or escalate: weigh downtime, parts cost against replacement value, your own calibration ability, and the limits of your access to the manufacturer's service level",
          "Exam wording: a problem-solving stem asks for the FIRST step or the MOST likely cause. Pick the check that is safest, simplest, and soonest, read what the stem says is NOT true, and remember that BEST means the complete safe action while LEAST likely wants the three plausible ones eliminated",
          "Measure resistance and continuity only with the equipment OFF and capacitors discharged; measure voltage only when the circuit must be live and you have cleared the room"
        ] },
        { type: "table", cols: ["Priority", "Why it comes first"], rows: [
          ["Patient and staff safety", "Stop the exposure, lock out the room, and remove the device from service; an unsafe machine never stays in use to protect a schedule"],
          ["Clinical downtime", "A down room reroutes patients; say when it will be back and give radiology a workaround while you work"],
          ["Compliance", "The repair is not done until the test, the record, and the sign-off are done"],
          ["Convenience", "Cosmetic and comfort items wait, but write them down so they are not lost"]
        ] },
        { type: "table", cols: ["Radiographic room symptom", "Likely causes and the first checks"], rows: [
          ["No exposure, no error code", "An interlock: room door, rotor not ready, receptor not parked or wrong size, collimator, emergency stop. Follow the chain in series until a contact is open"],
          ["No exposure with a generator fault", "Read the fault, then the log history: tube arc, overcurrent, line voltage, thermal cutout, or a failed contactor. Power cycle once, then diagnose"],
          ["Rotor will not spin or runs noisy", "Stator drive, capacitor, bearing wear; a noisy rotor with a slow run-up means the tube is near its end"],
          ["Output low for the set technique", "Verify kVp and timer with a meter, check mA linearity, check added filtration and tube aging, then look at the AEC cell and density setting"],
          ["Output high or burnt-out images", "Timer or AEC failure, backup timer not ending the exposure, wrong cell selected, or a calibration lost after a board swap"],
          ["Density varies between stations", "Linearity failure between adjacent mA stations; a filament or mA-regulation fault, not a receptor problem"],
          ["Grid lines on every image", "A stationary grid, or a Bucky that is not moving: check the motor, drive, and start signal"],
          ["Grid cutoff", "Grid upside down (density fades at the edges), off level (density down across the whole image), off center or wrong focal distance (density down at the sides)"],
          ["Bright or dark stripes on a digital image", "Defective pixel map or gain calibration out of date; run the detector calibration before condemning the panel"],
          ["Ghost of the previous image", "Incomplete erase on a CR plate, or detector lag; cycle the erase and check the erase lamp"],
          ["Moire pattern on a digital image", "Grid frequency beating against the detector sampling; change grid orientation or frequency"],
          ["Dust and scratch marks in the same place", "A dirty or scored CR plate; clean per the manufacturer and retire the plate if the mark survives"],
          ["Mechanical drift, drop, or collision", "Locks and detents out of adjustment, worn cables or counterweight, failed collision sensor; this is a safety fault, not a comfort item"]
        ] },
        { type: "table", cols: ["Fluoroscopy symptom", "Likely causes and the first checks"], rows: [
          ["Dim or noisy image", "ABC at its limit, an aging intensifier losing gain, camera or flat-panel fault, or simply a very large patient; compare the dose rate with the baseline before replacing anything"],
          ["Dose rate too high", "ABC calibration, magnification mode left engaged, continuous instead of pulsed mode, or a failed filter in the beam. Measure at the tabletop against the 10 R/min and 20 R/min limits"],
          ["Image rotates or distorts at the edges", "Intensifier aging and stray field effects on an image-intensifier chain; flat-panel systems do not do this"],
          ["No last-image hold or no save", "Workstation or storage fault, or a full local disk; check the archive link too"],
          ["Pedal does nothing", "Dead-man switch, cable, or interlock; the beam-on indicator and the audible timer tell you whether the generator ever ran"]
        ] },
        { type: "table", cols: ["Mammography symptom", "Likely causes and the first checks"], rows: [
          ["Compression will not reach or hold force", "Paddle, drive, or force calibration; verify 25 to 40 lb in both modes with a scale, and that 40 lb cannot be exceeded automatically"],
          ["Images too light or too dark", "AEC detector position, cell selection, or detector calibration; confirm with a phantom image before adjusting technique"],
          ["Phantom score falls", "Score dropping more than 0.5 means stop and investigate: detector calibration, target and filter selection, compression, or processing"],
          ["Filter wheel or target fault", "The generator reports a target or filter error; the wheel motor, position sensor, or interlock is the usual cause"],
          ["Artifacts in the same place on every image", "Detector or plate defect, dust in the beam path, or a damaged paddle"]
        ] },
        { type: "table", cols: ["Ultrasound symptom", "Likely causes and the first checks"], rows: [
          ["Dark stripe down the image", "Element dropout or a broken cable conductor; confirm on a phantom, then swap the probe to prove it"],
          ["Whole image noisy or weak", "Wrong preset, poor contact and gel, probe lens damage, or a failing probe connector; try a known good probe first"],
          ["Probe damage after cleaning", "Disinfectant not approved for that probe, soaking past the immersion line, or a soaked connector; retrain and relabel"],
          ["Doppler noisy or absent", "Interference, bad contact, probe or channel fault; test the same probe in Doppler on the phantom"],
          ["Display or control dead", "Cart power supply, battery, cable, or the control panel itself; separate the system fault from the probe fault before ordering"]
        ] },
        { type: "table", cols: ["Portable and C-arm symptom", "Likely causes and the first checks"], rows: [
          ["Will not take an exposure away from mains", "Battery pack capacity under load, charger fault, or a charge interlock; measure the pack under load"],
          ["Short run time or dead within a shift", "Aged pack, a charger left unplugged, or a unit stored discharged; log run time and replace the pack on trend"],
          ["Drive or brakes faulty", "Brake pads, drive belt, wheel bearings, or dead-man drive switch; a C-arm that drifts is a collision risk"],
          ["Intermittent faults when the arm moves", "Cable and connector flex failure at the bend points; wiggle-test with the meter on continuity"],
          ["Collimator lamp or laser out", "Lamp, timer circuit, or mirror alignment; a dark lamp invites an uncollimated field, so it is a dose issue"]
        ] },
        { type: "note", text: "The service report is part of the repair. Write the symptom as reported, what you found, what you did, the parts used, the readings after the work with their tolerances, and the time the room went back into use. Tell radiology in their terms, not in yours: what works now, what does not, what to avoid, and when you will be back. When you call the manufacturer, have the model, serial number, software version, exact error text, and the readings ready; that one call is shorter than three." }
      ]
    },
    {
      id: "it", title: "Imaging informatics",
      blocks: [
        { type: "table", cols: ["Networking item", "What to know"], rows: [
          ["IP address", "Four numbers 0 to 255 that identify a device; modalities and archives are usually static or on a reservation so they are always reachable"],
          ["Subnet mask", "Splits the address into network and host; two devices must share a subnet to talk without a router"],
          ["Default gateway", "The router address a device uses to leave its own subnet; a wrong gateway looks like the whole network is down from that device"],
          ["DHCP", "Hands out addresses automatically; a self-assigned 169.254 address means the DHCP server could not be reached"],
          ["DNS", "Turns names into addresses; if the address works and the name does not, it is DNS"],
          ["Switch versus router", "A switch connects devices inside one LAN; a router connects different networks and is where access rules usually live"],
          ["VLAN", "A logical network on shared switches; imaging gear is often on its own VLAN, which is why a correct cable in the wrong port gets nowhere"],
          ["LAN, WAN, and remote reading", "The LAN is the building, the WAN joins sites and is where a slow prior-study retrieval usually lives"],
          ["Wired versus wireless", "Fixed modalities are wired for bandwidth and reliability; portables and tablets roam, so coverage gaps show up as studies stuck in the local queue"],
          ["Cabling", "Cat 5e for 1 Gbps and Cat 6A for 10 Gbps, with a 100 m limit per run and RJ45 connectors; fiber for long runs and between buildings"],
          ["NIC", "The network card and its link light: no light is a layer 1 problem, cable or port, before it is anything else"]
        ] },
        { type: "table", cols: ["Tool", "What it proves"], rows: [
          ["PING", "Sends ICMP echoes to an address; a reply proves the path and the host are alive. Ping the gateway, then the archive, then by name"],
          ["traceroute", "Shows each router hop and where the path stops; useful across a WAN before blaming the modality"],
          ["ipconfig or ifconfig", "Reads the device's own address, mask, gateway, and DNS; the fastest way to spot a bad or self-assigned address"],
          ["Cable tester and tracer", "Proves the pairs end to end and finds which jack is which; wire-map faults explain intermittent links"],
          ["Port and link lights", "Link and activity lights on both ends tell you whether the physical layer is alive before any software check"],
          ["DICOM echo", "A C-ECHO verifies the association, AE titles, address, and port between two nodes. It is the DICOM ping and the first test when images will not move"],
          ["Vendor service and log tools", "Queue status, retry counts, and job logs on the modality and the archive; the number of failed jobs tells you when it started"]
        ] },
        { type: "table", cols: ["DICOM item", "What to know"], rows: [
          ["Association", "The negotiated connection between two application entities; both sides must agree on who they are and what services they support"],
          ["AE title", "The name a DICOM node answers to, case-sensitive; a typo here is the most common reason a new modality cannot send"],
          ["Host and port", "Address plus port, commonly 104 or 11112; both ends need the other's values and the firewall must pass them"],
          ["SOP class", "The service and object pair that says what a node can do, for example store a CT image or query a worklist"],
          ["C-ECHO", "Verification: are you there and can we talk"],
          ["C-STORE", "Push images from a modality or workstation to the archive"],
          ["C-FIND", "Query for studies that match criteria"],
          ["C-MOVE", "Ask a node to send matching studies somewhere, which is how priors are retrieved"],
          ["MWL", "The modality worklist query that pulls scheduled patients and accession numbers to the console, so nobody types a name by hand"],
          ["MPPS", "Modality performed procedure step: the modality reports started, completed, or discontinued, which drives status boards and billing"],
          ["Storage commitment", "The archive confirms it has taken permanent responsibility for a study, which is what makes it safe to delete locally"],
          ["GSDF", "The grayscale standard display function: diagnostic monitors are calibrated to it so the same image looks the same on every reading station"]
        ] },
        { type: "table", cols: ["System", "Its job and the path through it"], rows: [
          ["PACS", "The archive plus the reading workstations: it stores, retrieves, distributes, and displays images"],
          ["VNA", "A vendor neutral archive that holds studies from many systems in a standard form, so a modality or reading vendor can be replaced without moving the data again"],
          ["RIS", "Schedules exams, holds the worklist, tracks status, and sends reports back out"],
          ["HL7", "The text messaging standard that joins those systems: ADT for admit, discharge, and transfer, ORM for orders, ORU for results and reports"],
          ["Order to report", "Order placed in the EMR, scheduled in the RIS, appears on the modality as a worklist entry, images sent to PACS, read and dictated, report returned to the EMR"],
          ["EMR and EHR", "The chart the clinicians work in; the imaging report and a link to the images land there, which is why an interface fault becomes a clinical complaint fast"],
          ["Interface engine or broker", "Translates and routes HL7 and DICOM traffic between systems; its queue is where stuck messages pile up and where to look first"],
          ["Dose index registry and reporting", "Dose data from modalities is collected for review; a modality sending bad or no dose data is a reportable gap, not a cosmetic one"]
        ] },
        { type: "table", cols: ["Security item", "What it means for imaging equipment"], rows: [
          ["HIPAA", "Protects PHI: privacy, security, and breach rules cover every image, worklist, and service laptop that touches patient data"],
          ["HITECH", "Strengthened enforcement and added breach notification; it also binds business associates, including service vendors"],
          ["PHI on devices", "Names and identifiers sit in consoles, local caches, dose reports, and service logs; sanitize or document before a device leaves the building"],
          ["MDS2", "The manufacturer disclosure statement for medical device security: the form that tells you what a device stores, how it authenticates, and what it can be patched with"],
          ["IEC 80001", "Risk management for IT networks that carry medical devices; it is the framework behind joint reviews between the technology and IT departments"],
          ["Least privilege", "Separate service and clinical accounts, no shared logins, and no vendor account left live after a visit"],
          ["Patching", "Only on the vendor's validated schedule; an unpatchable modality is segmented instead, not left open"],
          ["Segmentation", "Imaging devices on their own VLAN with rules that allow only the ports they need, so one infected workstation cannot reach the archive"],
          ["Encryption", "In transit for anything leaving the building and at rest where the vendor supports it"],
          ["Vendor remote access", "Through the hospital VPN with an account the hospital controls, logged and time-limited, never an always-on modem or an unknown tunnel"],
          ["Backups", "Archives and databases backed up and restore-tested; a backup nobody has restored is a hope, not a plan"]
        ] },
        { type: "note", text: "Imaging applications depend on each other, so the first question in an informatics fault is how wide it is. One modality that cannot send is a node problem: AE title, address, port, or cable. Every modality losing its worklist at once is upstream, at the RIS or the interface engine. A down archive fails every reading station and every prior retrieval while the modalities keep scanning into their local queues, so the clock is running on local disk space. Say what you have proved and what you have not when you escalate to the IT department: the device, the test you ran, the result, and the time it started." }
      ]
    }
  ]
};
