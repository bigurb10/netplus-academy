// CRES Academy curriculum, units 1 to 4. Original teaching content for the AAMI/ACI CRES exam.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, ``` fenced block, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Anatomy, Positioning, and Medical Language", domain: 1,
  blurb: "The organs and systems the image shows, the planes and positions radiographers speak in, and the words on a requisition.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "Body Organization, Planes, Habitus, and Positional Terminology", domain: 1, obj: "A&P-D", minutes: 9,
      body: `Service calls in radiology arrive in the radiographer's language: the table will not reach the lateral decubitus detent, the tube column cannot clear a hypersthenic patient, the manual says to level the detector to the midcoronal plane. You will never position a patient, but you cannot move the equipment to the right place until you know what those words mean. This is the **medical terminology** half of the first domain: the words for parts, planes, directions, and positions that a requisition, a protocol, and a service manual all assume you already own.

## From cells to systems
**Cells** are the smallest living units. Cells of one kind form **tissues**: epithelial (linings), connective (support), muscle, and nervous. Tissues build **organs** such as the heart, lungs, liver, and kidneys, and organs that work together form **systems**: circulatory, respiratory, gastrointestinal, urinary, musculoskeletal, nervous, endocrine, and lymphatic. Every room in the department exists to image one of those systems, and that is the depth the exam asks for.

## The planes the equipment is aligned to
- **Sagittal** planes divide the body vertically into left and right parts. The **midsagittal** plane, also called the median plane or the **median sagittal plane**, divides it into equal halves, and it is the line a tube column, table centerline, and laser aimer are set to.
- **Coronal** planes divide the body vertically into front and back parts; the **midcoronal** plane runs through the middle of that split and is the reference a manual uses for detector height.
- **Transverse** planes, also called **axial** planes, cut horizontally into upper and lower parts. Cross-sectional systems reconstruct in this plane, which is why a computed tomography service manual talks about axial slices and table increments.

## Directions and patient positions
\`\`\`
anterior / posterior   front / back               the sternum is anterior, the spine posterior
superior / inferior    toward head / toward feet  the lungs are superior to the liver
medial / lateral       toward / away from midline the sternum is medial, the ribs lateral
proximal / distal      near / far from the trunk  the knee is proximal to the ankle
cephalic / caudal      toward head / toward feet  tube angles are named this way
cranial / caudal       toward skull / toward tail the same pair used of anatomy
supine / prone         face up / face down        bedside work is mostly supine
erect / recumbent      upright / lying down       chest work is erect when the patient can stand
\`\`\`
A **decubitus** position means the patient is lying down and the beam runs horizontally, which is how free air and fluid levels show. **Lateral decubitus** is lying on a side, named for the side that is down. **Dorsal decubitus** is on the back and **ventral decubitus** is face down, both with the beam crossing side to side. Recumbent positions without the horizontal beam are named the same way: **dorsal recumbent** is on the back, **ventral recumbent** is face down, and **left lateral recumbent** or **right lateral recumbent** is on the named side, so a **left or right lateral decubitus** is simply that position with the beam turned horizontal. To the equipment that means a horizontal tube, a vertical detector, and locks that actually hold.

## Body habitus
Build decides where the organs sit, so it decides where the beam is centered and how much exposure the part needs.
\`\`\`
Hypersthenic   about 5 percent   massive, broad deep midsection; high diaphragm, high transverse
                                 stomach, high outside gallbladder, colon framing the abdomen; most exposure
Sthenic        about 50 percent  the average athletic build technique charts are written for
Hyposthenic    about 35 percent  more slender than sthenic; stomach and gallbladder sit high
Asthenic       about 10 percent  frail, long shallow narrow midsection; heart nearly vertical at the
                                 midline, low medial stomach, low midline gallbladder, low colon; least exposure
\`\`\`
Between the extremes those organs move 6 to 8 inches, which is more than the collimated field of many exams. That is why a complaint of "the centering is off on big patients" is usually technique and not a broken detent.

> Exam tip: midsagittal splits left from right, coronal splits front from back, transverse or axial splits top from bottom. Sthenic is half the population and the build charts assume; hypersthenic is 5 percent and asthenic 10 percent. Decubitus always means lying down with a horizontal beam.`,
      hook: "Cells build tissues, organs, and systems; sagittal splits left and right, coronal front and back, transverse or axial top and bottom; anterior, posterior, superior, inferior, medial, lateral, proximal, distal, supine, prone, erect, and recumbent name the patient, decubitus means lying down with a horizontal beam, and habitus runs hypersthenic 5 percent, sthenic 50, hyposthenic 35, asthenic 10."
    },
    {
      id: "u1l2", title: "Chest, Abdomen, and Pelvis on the Image: Heart, Lungs, Liver, GI and Urinary Tracts", domain: 1, obj: "A&P-A", minutes: 10,
      body: `Three quarters of the volume a general radiographic room produces is chest, abdomen, and pelvis. Knowing what those images are meant to show tells you when a complaint is a fault and when it is a technique choice.

## The heart and the chest image
The heart is a four-chamber pump: the right side sends blood to the lungs, the left side sends it to the body. Blood leaves the right side through the **pulmonary artery** to the lungs and returns through the **pulmonary vein** to the left side, which pushes it out through arteries, then **arterioles**, then capillaries, and back through **venules** and veins; the heart with those vessels is the **cardiovascular system**, the circulatory system the outline names. On a chest image the heart appears as a **silhouette** against air-filled lung, and its width compared with the chest is one of the first things read, so geometry matters: a posteroanterior projection at the long distance keeps the heart close to the detector and near its true size, while an anteroposterior portable at a short distance magnifies it. A radiologist complaining that hearts look large on one room is making a distance and projection comment, which is yours to check.

## Lungs, airway, diaphragm, and pleura
Air enters through the trachea, divides into the bronchi, and ends in the alveoli where gas is exchanged. The **diaphragm** is the muscle below the lungs that drives breathing, and the **pleura** is the double membrane around each lung. Images are taken on full **inspiration** because the lungs are then largest and the diaphragm lowest; an expiration image looks crowded and underexposed and is a repeat. Pathologies the chest is ordered for, at recognition level, are pneumonia (fluid and consolidation), pneumothorax (air outside the lung), pleural effusion (fluid in the space), and heart enlargement.

## Abdomen: liver, gallbladder, and the gastrointestinal tract
The **gastrointestinal tract** runs mouth, pharynx, esophagus, stomach, small intestine (duodenum, jejunum, ileum), large intestine or colon, rectum, and anus. The **liver** sits high on the right and makes bile, the **gallbladder** stores it, and the **pancreas** adds digestive enzymes. Abdominal images are ordered for obstruction, free air after a perforation, stones, and foreign bodies.

## Urinary system
Two **kidneys** filter blood, the **ureters** carry urine down, the **bladder** stores it, and the **urethra** carries it out. Stones and obstruction are the common reasons for imaging.

## Contrast by system
\`\`\`
Air (negative)        Bowel gas and double-contrast studies; absorbs little, so it reads dark
Barium sulfate        Swallowed or given as an enema for the gastrointestinal tract; not injected
Iodinated contrast    Vessels, the urinary tract, and cross-sectional work; given by vein or catheter
Sensitivity           Always checked before administration, so reaction supplies stay in the room
\`\`\`

## What each exam demands of the equipment
- Chest: a high kilovoltage technique, above 100 kVp, for latitude through lung and mediastinum, at the long source-to-image distance, erect, on inspiration.
- Abdomen: a grid, because a thick trunk scatters heavily, and the shortest practical time, because bowel moves.
- Pelvis: careful collimation and shielding of what is not being imaged, because the gonads are in or near the field.

> Exam tip: the heart is the pump, the diaphragm drives breathing, and chest images are taken on inspiration. Barium goes in the gastrointestinal tract, iodinated contrast goes into vessels and the urinary tract. Chest means high kilovoltage and a long distance; abdomen means a grid.`,
      hook: "The heart pumps right side to lungs and left side to body and shows as a silhouette whose size depends on projection and distance; lungs, trachea, diaphragm, and pleura are imaged erect on inspiration; the gastrointestinal tract runs mouth to anus with liver, gallbladder, and pancreas alongside; kidneys, ureters, bladder, and urethra make the urinary tract; barium images the gut, iodinated contrast the vessels and urinary tract, and chest work needs high kilovoltage while abdomen needs a grid."
    },
    {
      id: "u1l3", title: "Skeleton, Spine, Skull, and Joints, with the Brain, Nervous, and Endocrine Systems", domain: 1, obj: "A&P-B", minutes: 10,
      body: `Most plain-film volume is bones, and bone is what drives technique: it is dense, it varies hugely in thickness from a finger to a hip, and it is what the radiographer blames when an image looks flat.

## Axial and appendicular
The **skeletal system** divides in two. The **axial skeleton** is the center of the body: skull, vertebral column, ribs, and sternum. The **appendicular skeleton** is the limbs and the girdles that hang them on: shoulders, arms, hands, pelvis, legs, feet. There are five primary bone types: **long bones** such as the femur, **short bones** such as the carpals of the wrist, **flat bones** such as the ribs, **sesamoid bones** such as the patella, and **irregular bones** such as the vertebrae. Marrow inside bone makes blood cells, which is also why bone marrow is one of the most radiosensitive tissues in the body.

A requisition names the bone and not the region, so learn the limb list as it runs outward from the trunk. At the shoulder, the girdle is the **clavicle** in front and the **scapula** behind; the upper arm includes the **humerus**; the forearm carries two bones, the **radius** under the thumb and the **ulna** under the little finger; and the hand is **carpals** at the wrist, **metacarpals** across the palm, and **phalanges** in the fingers. The lower limb mirrors it: the **pelvis** with its hip socket, the **femur** down to the knee with the **patella** in front of it, then the weight-bearing **tibia** beside the slimmer **fibula**, and the foot as **tarsals** at the ankle, **metatarsals** through the arch, and **phalanges** again in the toes. Every step outward is thinner than the one before it, which is why no single extremity technique serves a shoulder and a finger.

## The vertebral column
\`\`\`
Cervical    7    neck; the atlas and axis at the top carry the skull
Thoracic   12    each pair of ribs attaches here
Lumbar      5    the heavy load-bearing bodies, the thickest part to penetrate
Sacral      5    fused into the sacrum
Coccyx      4 fused bones at the tail
Total      33 bones, so a spine series covers more thickness change than any other exam
\`\`\`

## Skull and joints
The cranium surrounds the brain: the frontal bone at the forehead, parietal bones at the sides, temporal bones housing the ear structures, the occipital bone at the back, plus the ethmoid and sphenoid inside. The face carries the mandible, maxilla, zygomatic, nasal, and lacrimal bones. **Joints** are classified by structure as **fibrous**, **cartilaginous**, or **synovial**, and by function as immovable, slightly movable, or freely movable. The synovial joints, with a capsule and fluid, are the freely movable ones imaging is mostly ordered for.

## Brain, nerves, and the endocrine glands
The **brain** and **spinal cord** are the central nervous system; the **nerves** branching from them are the peripheral nervous system. Bone hides soft neural tissue, so plain films show the skull and spine while computed tomography and magnetic resonance show the brain, cord, and discs themselves, which is why a stroke or a disc complaint moves to those rooms. The **endocrine glands**, at recognition level, are the pituitary, thyroid, parathyroid, adrenals, pancreas, and gonads, and the thyroid is the one imaging and nuclear medicine work with most.

## What bone does to technique
- Density and thickness drive kilovoltage: a hand needs far less than a hip, and a lumbar spine needs a grid where a finger does not.
- Musculoskeletal pathologies imaging is ordered for are fractures and dislocations, arthritis and joint space loss, bone infection, and tumors.
- Thin extremities need a small focal spot and short exposures, so detail complaints on extremity work point at focal spot, distance, and motion rather than at dose.

> Exam tip: axial is skull, spine, ribs, and sternum; appendicular is the limbs. Count the column 7, 12, 5, 5, and a coccyx. Joints are fibrous, cartilaginous, or synovial. Bone thickness and density pick kilovoltage and decide whether a grid is used.`,
      hook: "The axial skeleton is skull, spine, ribs, and sternum and the appendicular is the limbs and girdles; bones are long, short, flat, sesamoid, or irregular; the column counts 7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral, and a coccyx; joints are fibrous, cartilaginous, or synovial; the brain, cord, and nerves hide behind bone so cross-sectional rooms image them, and bone thickness decides kilovoltage and whether a grid is needed."
    },
    {
      id: "u1l4", title: "Positioning by Exam: Projections, Topographical Landmarks, and Reading the Requisition", domain: 1, obj: "A&P-C", minutes: 10,
      body: `Positioning is a radiographer's skill, but every one of its requirements is a demand on your equipment: a distance that must be repeatable, a detent that must land, a lamp that must show the field, a marker that must appear on the image.

## Projections, named for where the beam goes
- **AP**: the beam enters the front and exits the back, with the patient facing the tube. **PA**: it enters the back and exits the front, with the patient facing the receptor, which puts the anatomy closer to the detector and magnifies less.
- **Lateral**: the beam crosses side to side, and the named side is the one against the receptor.
- **Oblique**: the body is rotated between frontal and lateral while the tube and receptor stay square. **RAO** puts the right front against the receptor, **LAO** the left front, **RPO** the right back, **LPO** the left back.
- **Axial** runs along the long axis of a part; **tangential** skims a surface to throw other anatomy clear; **decubitus** is lying down with a horizontal beam.

## Distances and the central ray
The **source-to-image receptor distance** is standardized so one technique repeats: about 100 cm for routine work, 180 cm for chest, and about 90 cm on some special units. The **object-to-image receptor distance** is the gap between the anatomy and the detector, and keeping it short is what keeps the image sharp. The **central ray** is the center of the beam, aimed at the center of the part and the center of the detector. Collimate to the part, and put a left or right marker in the field, not on the anatomy.

## Topographic lines and landmarks
\`\`\`
Orbitomeatal line       outer corner of the eye to the ear canal
Infraorbitomeatal line  just below the eye to the ear canal
Glabellomeatal line     the glabella between the eyebrows to the ear canal
Acanthiomeatal line     the acanthion where nose meets upper lip to the ear canal
T1                      about 2 inches above the sternal notch
T2 to T3                the sternal notch; T4 to T5 the sternal angle
T6 to T7                the lower end of the scapula; T10 the xiphoid tip
\`\`\`
Those points are the body's surface **topography**, the bony landmarks a radiographer finds by feel, and **spinal topography** is the same idea along the vertebral column, which is how a chart says where to center. The skull lines are how a manual tells you to set tube and table angles, so an angle readout that is out by a few degrees becomes a positioning complaint.

## The requisition and the identifying markers
A requisition carries the patient identifiers, the exam requested, the side, the relevant history, and pregnancy status. Every image must carry the patient's full name, a unique identifier, date of birth, the date it was made, anatomic markers for right and left, the patient's orientation, any time interval used, whether a chest was made on inspiration or expiration, and sequence markers when it belongs to a series. When a console loses that overlay after a software change, you have a compliance problem, not a cosmetic one.

## Positional terminology as the equipment sees it
The same anatomy needs a different setup in every modality: a radiographic room sets table angle, tube angle, detector height, and distance; computed tomography sets patient orientation, laser alignment, and table increment; ultrasound needs only access and gel. Anatomy, technique, and position are one package, which is why a positioning complaint is checked as geometry: distance indicator, angle readout, detents, lamp, and collimation.

> Exam tip: AP enters the front, PA enters the back, and the named oblique or lateral side is the one closest to the receptor. Routine distance about 100 cm, chest 180 cm. Learn the four skull lines and the thoracic landmarks, and know that markers and identifiers on the image are required, not optional.`,
      hook: "AP, PA, lateral, the obliques RAO, LAO, RPO, and LPO, plus axial, tangential, and decubitus name where the beam goes; distance is about 100 cm routine and 180 cm for chest with the object-to-image distance kept short; the orbitomeatal, infraorbitomeatal, glabellomeatal, and acanthiomeatal lines and the T1 to T10 landmarks set the angles; and every image must carry name, identifier, date of birth, date, anatomic markers, orientation, time interval, inspiration or expiration, and sequence."
    }
  ]
});
FRA.units.push({
  id: "u2", n: 2, title: "Radiation, Magnetic, and Facility Safety", domain: 2,
  blurb: "How imaging hurts people and equipment, and the rules and numbers that keep dose low.",
  assumes: "Unit 1's terminology.",
  lessons: [
    {
      id: "u2l1", title: "Electrical and Mechanical Safety in the Imaging Suite, Patient Transfer and Moving", domain: 2, obj: "SAF-A", minutes: 10,
      body: `An imaging room is the most electrically and mechanically dangerous place a technician works: kilovolts behind one panel, a few hundred kilograms of ceiling-hung iron overhead, and a patient on a table that tilts.

## What current does to a body
\`\`\`
1 mA            threshold of perception, a tingle
5 mA            accepted maximum harmless current
10 to 20 mA     let-go threshold: muscles clamp and the person cannot release
50 mA           pain, possible fainting, respiratory arrest
100 to 300 mA   ventricular fibrillation likely
6 A and above   sustained heart contraction, burns, respiratory paralysis
Microshock      as little as 10 microamps delivered directly to the heart can fibrillate
\`\`\`
Microshock matters in the interventional suite, where a catheter or pacing wire bypasses the skin entirely.

## The limits you test to
Name the standard with every number, because the exam does.
- NFPA 99: ground resistance from chassis to the plug ground pin no more than **0.5 ohm** for patient-care equipment; chassis touch leakage **500 microamps** for cord-connected patient-care equipment in current editions, where older editions used 300 or 100.
- IEC 60601-1, normal then single fault: earth leakage **5 mA / 10 mA**; touch current **100 / 500 microamps**; patient leakage type B and type BF **100 / 500 microamps**; type CF **10 / 50 microamps**.
- NFPA 99 also defines the patient care vicinity as about **6 feet (1.8 m)** beyond the bed or chair and **7.5 feet (2.3 m)** above the floor, which is where those rules apply.
A **GFCI** trips at **4 to 6 mA** and protects people from macroshock near water; it does nothing about microshock, because its threshold is hundreds of times too high.

## Grounding and receptacles
The ground conductor gives leakage and fault current a low-resistance path home, so a breaker trips instead of a patient becoming the path. Use hospital-grade receptacles and plugs, replace a damaged cord rather than taping it, and never run patient-care equipment from an extension cord; relocatable power taps must be rated for the use, secured, and never daisy-chained.

## High voltage inside the cabinet
Generators hold energy after the disconnect is open. Capacitors and capacitor-discharge portables can stay charged for a long time, and a high-voltage section runs at tens of kilovolts, so **lockout and tagout** come before any cover.
1. Open and lock the room disconnect, then tag it with your name.
2. Wait the time the manual states, then discharge the capacitors with the manufacturer's tool, to ground, one at a time.
3. Prove it is dead with a meter before a hand goes in, and treat high-voltage cable terminations as live until you have grounded them.
4. Restore interlocks and covers before the first exposure, and retest safety afterward.

## Mechanical hazards
Tube stands, overhead cranes and rails, table drives, tilt mechanisms, and ceiling-mounted monitors all store energy or carry weight. Watch the pinch points at columns and detector carriages, keep brakes, locks, and detents adjusted, and never defeat a collision sensor to finish a case. Counterweights and their cables are a drop hazard, so inspect cables, chains, stops, and the overhead mounting on every visit; ceiling-mounted equipment has its own documented inspection because the failure mode is fatal. Newton's laws are not an abstraction in a corridor: a loaded portable unit has **momentum**, and whatever **acceleration** a ramp or a sudden stop adds has to be absorbed by a brake, a caster, or you. Push from the handles, keep the speed walkable, and never stop a rolling unit with your body.

## Moving patients, and everyone else in the room
Good **body mechanics** means using your legs and not your back, getting help rather than lifting alone, and using slide boards, lifts, and a log roll for a patient who must stay in line, and never leave a patient on an unlocked or tilted table. Restraints and immobilization are used only as policy allows and with proper consent. Infection control applies to you as much as to clinical staff: standard precautions with every patient, contact precautions and dedicated or wiped-down tools for an isolation room, and **airborne** precautions with the fitted respirator the facility specifies when the posting calls for one. Clean and disinfect what you touched, with a product approved for that surface, before the room takes the next patient. During a procedure, visitors and staff who must stay get an apron and a position behind a barrier or at a distance, and anyone who does not need to be there leaves.

> Exam tip: 1 mA perception, 10 to 20 mA let-go, 100 to 300 mA fibrillation, 10 microamps microshock. Ground 0.5 ohm and chassis leakage 500 microamps are NFPA 99; the 100 / 500 and 10 / 50 microamp patient limits are IEC 60601-1. Lock out, discharge, and verify before any hand enters a high-voltage cabinet.`,
      hook: "1 mA is perception, 5 mA the accepted harmless maximum, 10 to 20 mA let-go, 50 mA respiratory arrest, 100 to 300 mA fibrillation, 6 A sustained contraction, and 10 microamps straight to the heart is microshock; NFPA 99 sets ground resistance at 0.5 ohm and chassis leakage at 500 microamps inside a patient care vicinity of 6 feet and 7.5 feet while IEC 60601-1 sets touch current at 100 and 500 microamps and type CF patient leakage at 10 and 50; and no hand enters a high-voltage cabinet before lockout, discharge, and a meter reading."
    },
    {
      id: "u2l2", title: "How Radiation Harms: Ionization, Dose Quantities and Units, Occupational and Public Limits", domain: 2, obj: "SAF-C", minutes: 11,
      body: `Every protective feature you maintain exists because x-rays ionize tissue. This lesson is the vocabulary and the numbers behind all of it, and it is where the unit-conversion questions come from.

## Ionization and what it damages
An x-ray photon with enough energy knocks an electron off an atom, leaving an ion pair. That is **ionization**, and it is the difference between x-rays and the radio waves a wireless access point puts out. X-rays and gamma rays are electromagnetic radiation; alpha particles, beta particles, and neutrons are **particulate radiation**, which carries mass, gives up its energy over a very short distance, and is what a nuclear medicine source emits inside the patient. Damage happens two ways: the **direct effect** is a photon hitting a critical molecule such as DNA, and the **indirect effect** is a photon splitting water into reactive fragments that then attack the molecule. Because the body is mostly water, the indirect effect does most of the harm.
- **Somatic** damage is to the exposed person's own tissues; **genetic** damage is to the reproductive cells and so to descendants.
- Dividing cells are the most sensitive, which is why bone marrow, the gonads, and children matter most.
- Dose rate matters: the same total dose delivered slowly does less harm than the same dose all at once, because repair has time to work.

Two kinds of effect sit behind every limit in this course. **Stochastic effects**, such as **cancer** and genetic change, have no threshold: any dose carries some probability of them, and the probability rises with dose while the severity does not. **Deterministic effects**, such as skin reddening, hair loss, and cataract, need a threshold dose before they appear at all, and above it they get worse as dose rises. Occupational and public limits exist to keep stochastic risk small; the dose alerts on a long fluoroscopic case exist to keep deterministic injury from happening at all.

## Quantities and units
\`\`\`
Exposure, air kerma   roentgen (R); 1 R = 2.58 x 10 to the minus 4 C/kg; air kerma in gray is the SI form
Absorbed dose         gray (Gy) or rad;      1 Gy = 100 rad
Equivalent dose       sievert (Sv) or rem;   1 Sv = 100 rem
Effective dose        sievert, weighted for radiation type and tissue sensitivity
Prefixes              milli is a thousandth, micro a millionth; 1 mSv = 1000 microsieverts
\`\`\`
Work the conversions both ways. 5 rem is 50 mSv. 0.2 mSv is 20 mrem. 2 Gy is 200 rad.

## Where background dose comes from
Natural background is about **3 mSv per year**, radon being the largest part, and the largest artificial source for the population is medical imaging. One chest image is about **0.02 mSv**, so a staff member's annual dose is best understood against background rather than against zero.

## The limits
\`\`\`
Occupational effective dose     50 mSv per year, cumulative 10 mSv x age in years
Lens of the eye                 150 mSv per year
Thyroid, skin, hands, and feet  500 mSv per year
Public                          1 mSv per year frequent, 5 mSv infrequent
Embryo or fetus                 5 mSv over the gestation, 0.5 mSv in any month once declared
Education and training under 18 1 mSv per year
\`\`\`
A worked example: a badge reporting 0.4 mSv in a quarter projects to about 1.6 mSv a year, which is a few percent of the occupational limit and is a normal result for a radiographer; the same reading on a badge that never leaves the booth says something is wrong with the badge or the room.

## Personnel monitoring
Badges are thermoluminescent or optically stimulated detectors read by a service, usually quarterly, and worn at the collar outside the apron so they read what reaches the unprotected neck and head. A thermoluminescent badge stores the energy it absorbs in a crystal and gives it back as light when the reader heats it, which is **thermoluminescence**; the **properties** of the crystal are the reason it is used, because lithium fluoride absorbs radiation much the way tissue does. In pregnancy a second badge goes at the waist under the apron. The reports go to the radiation safety officer and the committee, who look for trends, for a badge left in the room, and for anyone approaching an investigation level. If you move a badge rack or leave your own badge on a cabinet, you have corrupted the record.

> Exam tip: 1 Gy = 100 rad and 1 Sv = 100 rem, so divide rem by 100 to get sieverts. Occupational 50 mSv a year, cumulative 10 mSv times age, lens 150, extremities and skin 500, public 1, declared pregnancy 0.5 mSv a month. Background is about 3 mSv a year.`,
      hook: "X-rays ionize, the indirect effect through water does most of the damage, somatic harm is to you and genetic harm to descendants, and dividing cells are the most sensitive; 1 Gy is 100 rad and 1 Sv is 100 rem; background runs about 3 mSv a year; and the limits are occupational 50 mSv a year with a cumulative 10 mSv times age, lens 150 mSv, skin and extremities 500 mSv, public 1 mSv frequent and 5 mSv infrequent, a declared embryo or fetus 0.5 mSv a month, and trainees under 18 at 1 mSv."
    },
    {
      id: "u2l3", title: "Time, Distance, Shielding, the Inverse Square Law, and ALARA in Practice", domain: 2, obj: "SAF-C", minutes: 10,
      body: `Three rules protect everyone in the room, and one formula decides how well. This lesson is the arithmetic a technician is expected to do standing in the suite.

## The three cardinal rules
- **Time**: dose is proportional to beam-on time, so **minimize time**; pulsed fluoroscopy and short exposures cut it directly.
- **Distance**: **maximize distance**, because it is the strongest control there is and it is free. One step back beats any apron.
- **Shielding**: aprons, thyroid shields, mobile barriers, the control booth, and the lead in the walls, used after time and distance rather than instead of them.

## The inverse square law
Intensity falls with the square of the distance, because the same photons spread over a larger area.
\`\`\`
I1 / I2 = (d2 / d1) squared

Example 1: 16 mGy/h at 1 m. At 2 m: 16 x (1/2) squared = 4 mGy/h. Double the distance, one quarter the rate.
Example 2: 2 mGy/h at 2 m. At 1 m: 2 x (2/1) squared = 8 mGy/h. Half the distance, four times the rate.
\`\`\`
The same law runs the other way in fluoroscopy: halving the source-to-skin distance from 40 cm to 20 cm raises entrance exposure about four times, which is why the spacer that enforces the minimum distance is never removed.

## ALARA as a program, not a slogan
**ALARA** means as low as reasonably achievable, and an inspector looks for it in three forms: written policies that set it as the facility's goal, procedures that implement it (protocols by size, pediatric technique charts, pulsed defaults, collimation rules), and physical actions you can point to (shields on the walls, barriers in the room, apparel inspected, interlocks proved). Your part is the physical and the recorded part: a collimator lamp that works, a pulsed mode that still defaults correctly after a software update, and a service record that says you verified it. What the program is chasing is **dose reduction**, and what it is removing is every **unnecessary** exposure: a field wider than the anatomy, a repeat, a magnification mode left engaged, a study already done down the hall.

## Fluoroscopy practice
- Use **pulsed mode** rather than continuous, and let **last-image hold** replace a second look.
- Collimate to the anatomy; magnification modes raise dose rate, so they are used deliberately and briefly.
- The cumulative timer gives an audible signal at **5 minutes** of beam-on time, and beam-on time is recorded for the exam.
- Stand on the image-receptor side of the patient rather than the tube side, behind the drape and the table shield, and step back whenever you are not needed at the table.

## Pediatric and pregnancy practice
Ask about pregnancy, let the patient declare it, and once declared the monthly embryo or fetus limit of **0.5 mSv** applies. Shield what is not being imaged, collimate tightly, use the lowest technique that answers the question, immobilize rather than accept motion, and avoid the repeat entirely, because a repeat doubles the dose of that image. Children are more radiosensitive because dividing cells are the most sensitive cells there are.

## Repeat analysis is a dose program
Counting repeats by room, by reason, and by technologist finds the uncollimated room, the drifting detector, the miscalibrated automatic exposure control, and the training gap. It belongs in your quality control data because every repeat is a dose nobody needed to give.

> Exam tip: distance beats everything, and the inverse square law is squared both ways: double it for a quarter, halve it for four times. The fluoroscopic timer signals at 5 minutes. ALARA shows up as policy, procedure, and physical action, and a repeat is a dose event.`,
      hook: "Time, distance, and shielding in that order of power; intensity follows I1 over I2 equals d2 over d1 squared, so doubling the distance quarters the rate and halving it quadruples it; ALARA has to show as policy, procedure, and physical action; pulsed mode, last-image hold, collimation, the 5-minute timer, and standing on the receptor side protect the operator; and pregnancy means declare, shield, collimate, lowest technique, and no repeats against a 0.5 mSv monthly limit."
    },
    {
      id: "u2l4", title: "Protective Apparel, Barriers, and Shields, and How They Are Tested", domain: 2, obj: "SAF-C", minutes: 9,
      body: `Apparel and barriers are the only safety equipment in the department that a technician both tests and condemns, and they fail silently: a torn apron looks exactly like a good one.

## Lead equivalent
Protective garments are rated by the thickness of lead that would attenuate as well as the material in them.
\`\`\`
Aprons and gloves      0.25, 0.5, and 1 mm lead equivalent; 0.25 mm the minimum, 0.5 mm the normal choice
At 75 kVp              0.25 mm attenuates about 66 percent, 1 mm about 99 percent
Weight                 a 1 mm apron can weigh 12 kg (25 lb), which is why 0.5 mm is the usual compromise
Thyroid, gonadal, eyewear  read the lead equivalent marked on the garment and record it
Bucky slot cover and fluoroscopic curtain  each at least 0.25 mm; the cover closes a gap of about 5 cm at gonadal level
\`\`\`

## Storage and inspection
Hang garments on racks, never fold them, because a fold cracks the lead and the crack is invisible from outside. Inspect and image every apron, glove, thyroid shield, and gonadal shield at least **annually**, by fluoroscopy or by radiography at about 120 kVp and 10 mAs, and look for cracks, bunching along fold lines, tears, and holes. Replace on any defect in a critical area, record the garment's identifier and the result, and physically remove a failed garment from the room, because an apron that fails inspection and stays on the rack will be worn.

## Barriers
- A **primary barrier** intercepts the useful beam. The fluoroscopic receptor assembly is one, at least 2 mm lead equivalent, interlocked so the tube cannot energize while it is parked out of position.
- A **secondary barrier** intercepts scatter and leakage: the control booth, the lead glass window, and the upper walls. A booth barrier is about 1/16 inch lead equivalent, and the booth **partition** has to be placed and sized so that nothing but scattered radiation can reach the operator behind it.
- Mobile shields fill the gap in rooms where staff must stand at the table, and a mobile exposure switch must reach 2 m from the tube.

## Room design, at recognition level
A medical physicist designs shielding from four inputs: the **workload** of the room, the **use factor** (how much of the time the beam points that way), the **occupancy factor** (who is on the other side of that wall and for how long), and the distance. The output is a shielding report that says what goes in each wall, floor, ceiling, and door. Keep it with the room record, because any penetration you make through a wall for a cable is a change to that design and has to be sealed the way the report says.

## Gonadal shields and collimation
Gonadal shields come as **shadow shields** hung in the beam, **flat contact shields** laid on the patient, and **shaped shields** for male anatomy. Used properly they cut ovary dose about 50 percent and testicular dose about 95 percent, and they are used whenever they will not cover the region of interest, within about 0.5 cm of the primary beam. But the first shield is always **collimation**: tissue outside the field gets only scatter, so a working collimator lamp and an accurate light field do more for dose than any garment.

> Exam tip: 0.25 mm lead equivalent is the minimum and 0.5 mm the normal apron; inspect apparel at least annually by imaging it and retire it on any crack or tear; hang, never fold. Primary barriers take the useful beam, secondary barriers take scatter and leakage, and collimation is the first shield.`,
      hook: "Aprons and gloves run 0.25, 0.5, and 1 mm lead equivalent with 0.25 the minimum and 0.5 the normal pick, thyroid and gonadal shields carry a marked value, bucky slot covers and curtains at least 0.25 mm; hang them, image them at least annually at about 120 kVp and 10 mAs, and retire on any crack; primary barriers take the useful beam at 2 mm and the booth is about 1/16 inch; and workload, use factor, and occupancy factor drive the physicist's shielding design while collimation stays the first shield."
    },
    {
      id: "u2l5", title: "The MRI Environment and Electromagnetic Interference: Zones, Projectiles, Quench, RF Heating", domain: 2, obj: "SAF-B", minutes: 10,
      body: `The magnet room is the one place in the hospital where a routine tool can kill someone. There is no power switch for the hazard: the static field is on while the scanner is idle, while it is in service, and during a power failure.

## The zones
\`\`\`
Zone I    freely accessible public space
Zone II   reception and screening, where patients are interviewed and changed
Zone III  controlled, badged access; the field is strong enough to matter here
Zone IV   the magnet room itself, under direct supervision whenever anyone is inside
5 gauss   the posted line where implants and pacemakers can be disturbed; 1 T = 10,000 gauss
\`\`\`
A common clinical magnet is **3 T**. Screening happens before the 5-gauss line, not at the door of the magnet room, and the screening is of people and of everything they carry.

## Projectiles
Any ferromagnetic object becomes a missile as it crosses into the strong field: oxygen cylinders, floor buffers, mop buckets, stretchers, IV poles, and the screwdriver in your pocket. Items are labeled **MR Safe**, **MR Conditional**, or **MR Unsafe**, and a conditional item carries the field, gradient, and radiofrequency limits it was tested to. Your meters, analyzers, and cart are almost always unsafe, so service work gets staged outside and brought in only with the magnet staff. Screen yourself every time; familiarity is what kills people in that room.

## Patients, implants, and devices
Ferromagnetic screening covers implants, pacemakers, neurostimulators, clips, pumps, and shrapnel, and a patient who cannot answer gets screened another way. Monitors, pumps, and ventilators in the room have to be rated for it and secured where the field allows.

## Quench
A **quench** is the loss of superconduction: the coil goes resistive, the liquid helium boils off, and a huge volume of cold gas leaves through the quench pipe to the outside. Helium boils at 4 K and nitrogen at 77 K, and a release into the room displaces oxygen, frosts the vent, and can pressurize the door shut. Press the quench button only to free someone pinned by a projectile or in a life-threatening emergency, never to make service convenient: a quench is expensive, slow to recover, and can damage the magnet. Know where the quench button, the emergency stop, and the oxygen monitor are before you need them.

## Radiofrequency heating, noise, and gradients
Transmitted radiofrequency energy deposits heat in tissue, so cable loops, damaged coils, bare conductors, and even some tattoo pigments cause burns. Route cables so they cannot loop or touch skin, and retire a coil with damaged insulation rather than taping it. Gradient switching makes the acoustic noise, a banging loud enough to require hearing protection, and cryogen handling needs the gloves, face shield, and ventilation the facility specifies.

## Electromagnetic interference, both directions
A scanner interferes with monitors and pumps nearby, and a noisy device inside the shielded room spoils the image. The room's copper shielding and filter panel keep outside radiofrequency out, so a propped door, a failed door finger stock, or an unfiltered cable through the wall shows up as zipper or herringbone artifacts across the image. When an image shows interference, check what changed in the room, whether every penetration is through the filter panel, whether the door closes and latches, and what new device arrived nearby, before touching the scanner's own electronics.

> Exam tip: zones I to IV with screening before the 5-gauss line, 1 T equals 10,000 gauss, and the field is never off. MR Safe, MR Conditional, MR Unsafe. A quench vents helium and displaces oxygen, so the button is for emergencies only. Image interference points at a door, a penetration, or a new neighbor, not at the magnet.`,
      hook: "The static field is always on, zones run I to IV with screening before the posted 5-gauss line and 1 T equal to 10,000 gauss; ferromagnetic tools, cylinders, and buffers become projectiles so everything is labeled MR Safe, MR Conditional, or MR Unsafe; a quench boils off helium through the vent and can displace oxygen, so the button is for emergencies only; and radiofrequency energy burns through looped cables and damaged coils while interference in either direction traces to a propped door, an unfiltered penetration, or a new device nearby."
    }
  ]
});
FRA.units.push({
  id: "u3", n: 3, title: "Regulation, Accreditation, and the CMMS", domain: 2,
  blurb: "Who regulates imaging, what each one asks for, and how the CMMS proves it.",
  assumes: "Unit 2.",
  lessons: [
    {
      id: "u3l1", title: "Who Regulates Imaging: FDA and 21 CFR 1020, State Radiation Control, and CMS", domain: 2, obj: "SAF-D", minutes: 10,
      body: `Three layers of government touch an imaging room: a federal agency that regulates the equipment, a state program that registers and inspects it, and a federal payer whose conditions the hospital must meet to be paid. Each asks you for something different.

## FDA and the federal performance standards
The **FDA** regulates medical devices and radiation-emitting products through its **CDRH**, the Center for Devices and Radiological Health, which carries forward the work the former **BRH**, the Bureau of Radiological Health, began. Its performance standards for diagnostic x-ray systems live in **21 CFR 1020**, and they are written as numbers a system must meet.
\`\`\`
Tube housing leakage      less than 100 mR/h (about 1 mGy/h) at 1 m from the housing
AEC backup timer          ends the exposure at 6 s or 600 mAs, whichever comes first
Light field to beam       within 2 percent of the SID; at 100 cm that is 2 cm
PBL and SID indicator     each held within the same 2 percent
Minimum total filtration  2.5 mm Al above 70 kVp, 1.5 mm Al from 50 to 70 kVp, 0.5 mm Al below 50
Fluoroscopy               10 R/min tabletop, 20 R/min with high-level control; dead-man control;
                          cumulative timer signaling at 5 minutes; SSD at least 38 cm fixed, 30 cm mobile
\`\`\`
The standard binds the manufacturer and anyone who **modifies** a system, and that includes you. Swap a collimator, recalibrate an automatic exposure control, or replace a high-voltage component and the room must still meet every one of those numbers when you leave, with the measurement in the record to prove it.

## State radiation control programs
States, not the federal government, register and inspect the machines in use. A state program registers every tube, inspects rooms on its own schedule, licenses or certifies the **radiologic technologist** who may operate a system, sets what must be posted, and can shut a room down. Their rules differ from state to state but most are built from the shared suggested regulations that state program directors write together through **CRCPD**, which is why registration, survey intervals, and operator rules look similar everywhere without being identical. A new or relocated tube is a registration event: your paperwork feeds it.

## CMS and the survey
**CMS** sets the conditions of participation a hospital must meet to be paid, may survey directly, and otherwise accepts the survey of an accrediting organization it has granted deeming authority. Equipment maintenance is in those conditions, which is why a maintenance strategy that departs from the manufacturer's recommendation has to be written down and justified rather than simply adopted.

## Reporting incidents
When a device may have caused or contributed to a death or serious injury, that is a medical device report, filed on the facility's timeline to the manufacturer and the FDA. Your part is to stop using the device, preserve it exactly as it is with its logs and settings, photograph and document, and never "test it to see." A repaired device is destroyed evidence.

## The practical rule
Think of it as three questions with three owners: does the equipment meet the federal performance standard, is the machine registered and inspected by the state, and can the hospital show the payer and its accreditor a managed program. The first is measured, the second is registered, and the third is documented.

> Exam tip: 21 CFR 1020 is the FDA performance standard and it applies to whoever modifies the system, not just the maker. States register and inspect machines and license operators. CMS sets the conditions of participation. Leakage under 100 mR/h at 1 m, backup at 6 s or 600 mAs, collimation within 2 percent of the distance.`,
      hook: "The FDA through CDRH, carrying on from BRH, sets the performance standards in 21 CFR 1020 covering housing leakage under 100 mR/h at 1 m, an AEC backup at 6 s or 600 mAs, light and beam fields within 2 percent of the SID, minimum filtration, and the fluoroscopic limits, and they bind anyone who modifies a system; state radiation control programs register tubes, inspect rooms, and credential operators from the shared suggested regulations; CMS sets the conditions of participation; and a device suspected in a serious injury is preserved and reported, never tested."
    },
    {
      id: "u3l2", title: "Mammography under MQSA and ACR Accreditation", domain: 2, obj: "SAF-D", minutes: 10,
      body: `Mammography is the one modality where the quality control schedule is federal law. Everywhere else a missed test is a finding; here it can close the service.

## The law and the program
The **MQSA**, the Mammography Quality Standards Act, makes the **FDA** the regulator of every facility that performs mammography. A facility must hold a certificate to operate, be **accredited** by an approved body such as the **ACR**, be **inspected annually**, meet personnel requirements for interpreting physicians, technologists, and medical physicists, have a **medical physicist survey** every year, and run a written quality control program. Images, reports, and quality control records are retained for the period the law sets, and a patient and her physician must receive results.

## The quality control schedule
\`\`\`
Daily          detector or processor check, and cleanliness
Weekly         phantom image scored and logged, screen cleanliness, viewing conditions
Monthly        visual checklist of the unit: paddles, locks, lights, indicators, cables
Quarterly      repeat analysis, or every 250 patients
Semiannual     compression force, and the other semiannual tests the program lists
Annual         full medical physicist survey, or sooner after a major component change
\`\`\`
Those intervals are examinable. The **mammographer**, the technologist who performs the exams, does the daily, weekly, and monthly work; the medical physicist does the annual survey; you make the equipment able to pass both.

## The phantom and its score
The **ACR** test object holds fibers, speck groups, and masses of decreasing size, imaged at the same clinical technique a **mammogram** is taken with, and its scoring runs from largest to smallest until an object can no longer be seen. The minimum to pass accreditation is **four fibers, three speck groups, and three masses**, and a score must not fall more than **0.5** from the previous image. A falling score is the single most useful early warning the modality has: stop, and look at detector calibration, target and filter selection, compression, and automatic exposure control before anyone changes technique.

## What your service visit must leave behind
After any work on a mammography unit the compliance state has to be restored and proven.
1. **Compression force**: both power and manual modes must reach 25 to 40 lb and hold at least 15 seconds, and 40 lb must never be exceeded in power mode.
2. **Automatic exposure control**: verify constant density across thicknesses after any receptor, detector, or board work.
3. **Phantom image**: take one and score it after any work on the receptor, detector, or beam path, and file it.
4. **Records**: the measurement, the tolerance, pass or fail, and whether a physicist survey is now required because the component you changed was a major one.

## Accreditation beyond mammography
The **ACR** also accredits computed tomography, magnetic resonance, ultrasound, nuclear medicine, and breast tomosynthesis programs, with their own phantoms and submitted images. Those are voluntary in the sense that the law does not compel them, but payers often do, so losing accreditation has the same practical effect as losing a license.

> Exam tip: MQSA is federal, administered by the FDA, with annual inspection, annual physicist survey, accreditation by an approved body, and a legally required quality control schedule. Phantom weekly; minimum score four fibers, three specks, three masses; no drop over 0.5. Compression 25 to 40 lb, held 15 seconds, never above 40 in power mode.`,
      hook: "MQSA puts mammography under the FDA with a certificate, accreditation by an approved body such as the ACR, annual inspection, annual medical physicist survey, personnel requirements, and a legally mandated quality control schedule of daily detector checks, weekly phantom images, a monthly visual checklist, quarterly repeat analysis, semiannual compression force, and annual physicist tests; the test object must score at least four fibers, three speck groups, and three masses with no drop over 0.5; and any receptor work ends with compression verified at 25 to 40 lb, the AEC checked, and a scored phantom image in the file."
    },
    {
      id: "u3l3", title: "The Joint Commission, OSHA, ANSI/AAMI Standards, and the Radiation Safety Committee", domain: 2, obj: "SAF-D", minutes: 10,
      body: `The FDA regulates the machine and the state registers it. This lesson is about the bodies that judge the program around it, and about the committee inside the building that owns radiation.

## Who owns what
\`\`\`
Body        Protects             Asks you for
TJC         the patient, through inventory, maintenance strategy, PM completion rates, test
            the program          records with tolerances, inspection history, competency records
OSHA        the worker           hazard labels and the safety data sheet, PPE, bloodborne
                                 pathogen controls, lockout and tagout
ANSI/AAMI   the discipline       a program written against the recognized equipment-management
                                 standards: risk classes, intervals, documentation
NCRP        dose limits          the limit table and the shielding reports barriers come from
NEMA        the equipment        manufacturer standards, such as focal spot tolerances
\`\`\`

## The Joint Commission
**TJC** surveys hospitals on behalf of the federal payer, and equipment questions land in its environment of care and equipment management standards. A surveyor wants to see a complete **inventory**, a documented **maintenance strategy** with the intervals and the reasoning behind them, **PM completion rates** with an explanation for anything overdue, test records with readings and tolerances, and inspection history by device. In imaging it adds the modality-specific items: the annual medical physicist survey, dose documentation and review for fluoroscopy and computed tomography, apparel inspection records, and evidence that staff are trained and competent on what they operate. Surveys are unannounced, so the only workable strategy is a system that is always current.

## OSHA
**OSHA** regulates your safety rather than the patient's.
- **Hazard communication**: every chemical you use has a label and an **SDS**, available where the work happens, with training on both. **Hazardous materials** disposal is the other end of the same rule: processor chemistry, cleaning and disinfecting agents, spent batteries, and the lead in a retired apron are regulated waste rather than trash, and the facility's waste procedure says where each one goes.
- **PPE**: the employer supplies, trains on, and maintains it, radiation apparel included.
- **Bloodborne pathogens**: an exposure control plan, sharps handling, and treating every patient as potentially infectious, which matters when you service a table, a probe, or a cassette.
- **Lockout and tagout**: energy isolated, locked, tagged, and verified before service, and only the person who applied a lock removes it.

## ANSI, AAMI, NCRP, and NEMA
- **ANSI** accredits the process a standards developer follows; **AAMI** writes the content, including the equipment-management standards a hospital program is written against. A standard carrying both names has both halves.
- **NCRP** publishes the dose limits and the shielding reports physicists design barriers from, which is why its limit table is the one worth memorizing.
- **NEMA** carries manufacturer standards, such as the tolerance a nominal focal spot size is allowed, and the imaging communications standard.

## The radiation safety officer and the committee
Every facility using radiation names a **RSO** and runs a radiation safety committee. The officer owns the dosimetry program, surveys, posting, incident investigation, and the authority to stop unsafe practice. The committee reviews badge reports and trends, shielding designs, incident and overexposure investigations, new equipment and room changes, and policy. You are a supplier to both: survey and output measurements, repair records, and notice when a protective feature has been defeated or a shield has been drilled through.

## What a survey asks for, and how you prepare
Keep the inventory accurate, close work orders with the measured value and its tolerance, keep apparel inspection and output test records where they can be produced in minutes, keep physicist reports with their findings closed out, and keep recall documentation showing which devices a notice touched and what was done. Preparation is not a week of tidying; it is the record being correct every day.

> Exam tip: The Joint Commission judges the program (inventory, strategy, completion rates, records), OSHA protects the worker (hazard communication and the SDS, PPE, bloodborne pathogens, lockout and tagout), ANSI accredits while AAMI writes, NCRP publishes the limits, and NEMA is the manufacturers. The radiation safety officer and the committee own radiation inside the building.`,
      hook: "The Joint Commission surveys the environment of care and wants an inventory, a documented maintenance strategy, PM completion rates, test records, inspection history, physicist surveys, and dose documentation; OSHA covers worker safety through hazard communication and the SDS, PPE, bloodborne pathogens, and lockout and tagout; ANSI accredits the process while AAMI writes the equipment-management content, NCRP publishes the dose limits and shielding reports, and NEMA carries manufacturer standards; and inside the building the RSO and the radiation safety committee own dosimetry, surveys, incidents, and policy."
    },
    {
      id: "u3l4", title: "The CMMS: Service History, Recalls, and Compliance and Performance Reports", domain: 2, obj: "SAF-E", minutes: 9,
      body: `The **CMMS** is the database of record for everything your department owns and everything you have done to it. If the repair is not in the system, as far as an inspector is concerned it did not happen.

## What it holds
\`\`\`
Inventory        every device by control number, model, serial number, location, risk class, interval
Work orders      who called, the symptom in their words, the finding, the fix, parts, labor, readings
PM schedule      what is due, what is overdue, completion rate by area and by technician
Parts and costs  what was used, what it cost, cumulative cost against replacement value
Service history  every visit on that device, vendor reports attached, so repeat failures show
Documents        manuals, physicist surveys, electrical safety results, recall notices
\`\`\`

## Using it on a job
1. Open or accept the work order before you start, so labor and downtime are real rather than reconstructed.
2. Record the symptom as the caller said it, not as you have already decided it is.
3. Document the finding, the parts, and the measurements with their tolerances, and attach the vendor report or the output test sheet.
4. Close the work order with the room's return-to-service time, because that is the number radiology and the payer care about.
A habit worth building: read the device's service history before you touch it. Three similar calls in a quarter is a pattern, and the pattern is often the answer.

## Recalls and field notices
When a manufacturer field notice or an **FDA** recall arrives, the system is how you prove you handled it: search the inventory by model and serial range, list every affected device and its location, record the action taken on each one with a date, and keep the notice itself attached to those records. Devices in storage, loaners, and units at off-site clinics are the ones that get missed, which is why the search is done against the inventory and not from memory.

## Compliance and performance reports
- **Compliance reports** answer a surveyor: PM completion rate, overdue list with reasons, inspection history, electrical safety results, apparel inspection records.
- **Performance reports** answer management: **MTBF**, the mean time between failures, per device and per model, plus downtime by room, cost of service against replacement value, and vendor response times. They are what a replacement request is argued from, and they only exist if work orders were closed honestly.

## Why complete records are your defense
After an incident, the record is the only thing that speaks for you. A device with a full history showing scheduled maintenance completed, measurements inside tolerance, and the fault reported and acted on puts the technician and the hospital on solid ground. A device with a gap in its history leaves the gap to be explained by someone else later.

> Exam tip: the computerized maintenance management system holds inventory, work orders, PM schedules, parts, costs, and service history. Recalls are handled by searching the inventory and documenting the action per device. Compliance reports show completion and overdue; performance reports show time between failures, downtime, and cost. Undocumented work does not exist.`,
      hook: "The CMMS holds the inventory by control number with risk class and interval, every work order with symptom, finding, parts, labor, and readings, the PM due and overdue lists, costs, and the full service history with vendor reports; you open it before the job and close it with the return-to-service time; recalls and field notices are answered by searching the inventory and documenting the action on each device; and compliance reports prove completion and inspection history while performance reports give MTBF, downtime, and cost for management."
    }
  ]
});
FRA.units.push({
  id: "u4", n: 4, title: "Electricity, Electronics, and Imaging Power", domain: 3,
  blurb: "The circuit theory, components, and facility power an imaging generator depends on.",
  assumes: "Nothing beyond unit 1.",
  lessons: [
    {
      id: "u4l1", title: "Voltage, Current, Resistance, and Power: Ohm's Law, Series and Parallel", domain: 3, obj: "E&E-A", minutes: 10,
      body: `Every measurement you will ever take on an imaging system comes back to four quantities and one law. The scale is bigger than on a monitor bench, but the arithmetic is the same.

## The four quantities
- **Charge** is the quantity of electricity; current is charge in motion.
- **Current** (I), in **amperes**, is **electric current**: charge in motion. Tube current is in milliamperes and filament current in amperes.
- **Voltage** (V), in **volts**, is the pressure that pushes the flow, and its older name, **electromotive force**, says exactly what it does. Tube potential is in kilovolts.
- **Resistance** (R), in **ohms**, opposes the flow, and **electric resistance** in a wire, a contact, or a winding is where unwanted heat comes from.
The water analogy holds: voltage is pressure, current is the flow rate, resistance is the narrowness of the pipe, and power is the work the water does when it arrives.

## Energy and charge, before the law
**Energy** is the ability to do work, and the **law of conservation** says it changes form rather than disappearing. On a service call you meet it as **potential energy** in a raised table or a charged capacitor, kinetic energy in a moving gantry, **thermal energy** in an anode, **electrical energy** in every circuit you measure, **chemical energy** in a battery pack, and **nuclear energy** in the tracer a gamma camera watches.
**Electrostatics** is charge at rest. Three **laws of electrostatics** are worth carrying: unlike charges attract and like charges repel, charge on a conductor sits on its outer surface, and the force between two charges falls with the square of the distance between them. **Electrification** is how an object gains that charge, and the **methods of electrification** are friction, contact, and induction, which is why a plastic cover attracts dust to a detector and why you ground yourself before handling a board. **Electrodynamics** is the same charge in motion, and that is the rest of this unit.

## Ohm's law and power
\`\`\`
V = I x R        I = V / R        R = V / I
P = V x I        P = I squared x R        P = V squared / R        in watts
Imaging power    (mA x kVp) / 1000 = kW, and multiply by 0.7 for a single-phase generator
\`\`\`
Worked: 24 V across 8 ohms draws 3 A and dissipates 72 W. A 1,000 mA station at 120 kVp is (1000 x 120) / 1000 = 120 kW, which is why the room needs a feeder of its own.

## Series and parallel
Two **electric circuits** cover nearly everything in a generator cabinet, and telling them apart decides what a measurement means.
- **Series** is one path. The same current flows through every element, the voltage drops add up to the source, and resistances add: R total = R1 + R2 + R3. One open element stops everything, which is exactly how a fuse and an interlock chain work.
- **Parallel** is several paths across the same two points. Every branch sees the same voltage, the branch currents add, and the reciprocals add: 1 / R total = 1/R1 + 1/R2. Total resistance is always less than the smallest branch, so two 100 ohm elements in parallel measure 50 ohms. Receptacles, cabinet fans, and the low-voltage loads inside a generator are parallel, which is why one can fail without the others noticing.

## The numeric prefixes you have to read without thinking
\`\`\`
kilo  x 1000        kV (tube potential), kW (power), kohm (resistance)
milli x 0.001       mA (tube current), ms (exposure time), mSv (dose)
micro x 0.000001    microamps (leakage limits), microfarads (capacitors)
\`\`\`
So 70 kV is 70,000 V, 500 mA is 0.5 A, 10 ms is 0.01 s, and 500 microamps is 0.0005 A.

## Measuring without damaging anything
1. **Volts** are measured **across** a component with the circuit live, meter in parallel, one hand in your pocket.
2. **Amps** are measured **in series**, in the path, or without breaking it using a clamp.
3. **Ohms and continuity** are measured with the equipment **off, isolated, and capacitors discharged**; a reading over the meter's limit means the path is open.
Never put a meter rated for the bench across a high-voltage section, and never trust a console display for a quality control number.

## Generator-scale examples
- The **filament** circuit is low voltage and high current: about 4 A or more through a coil of a fraction of an ohm, and small resistance changes there move tube current a long way.
- **Tube current** is set by that filament temperature, not by a rheostat in the high-voltage path.
- **Kilovolts** come from a step-up transformer, so the primary side carries hundreds of volts at high current while the secondary carries tens of kilovolts at milliamperes. Power is roughly conserved, which is the cross-check when a reading looks impossible.

> Exam tip: V = I x R and P = V x I, with P = I squared x R when you have current and resistance. Series shares current and adds voltage; parallel shares voltage and adds current. Volts across, amps in series, ohms with the power off. Imaging power in kilowatts is mA times kVp divided by 1000.`,
      hook: "Current in amperes, voltage in volts, resistance in ohms, and power in watts tie together as V equals I times R and P equals V times I, with P equal to I squared times R; series shares current and adds voltage and resistance while parallel shares voltage, adds current, and always measures less than its smallest branch; kilo, milli, and micro turn 70 kV into 70,000 V and 500 mA into 0.5 A; volts go across, amps go in series, ohms go in with the power off and the capacitors discharged; and mA times kVp over 1000 gives the kilowatts a room must be fed."
    },
    {
      id: "u4l2", title: "Components in a Circuit: Passive, Active, Rectifiers, and Reading the Schematic", domain: 3, obj: "E&E-B", minutes: 10,
      body: `Open an imaging generator and you see the same two dozen **electronic components** over and over. Knowing what each one does, and what each one does when it fails, is most of electronic troubleshooting.

## Passive components
- **Resistors** limit current and drop voltage. In the filament circuit they set the milliampere stations, so a drifted resistor or a dirty tap is a linearity problem.
- **Capacitors** store charge. They pass alternating current and block direct current, smooth rectified voltage, and in a capacitor-discharge portable they are the exposure energy itself. Treat every one as charged until you have discharged it with the manufacturer's tool and read zero.
- **Inductors** oppose a change in current: chokes, stator windings, and the windings of every transformer.
- **Transformers** at component level are two coupled windings that change alternating voltage by their turns ratio.

## The RC time constant
A capacitor charging through a resistor fills on a curve, not instantly. One time constant is **tau = R x C**: a capacitor reaches about **63 percent** of the final voltage in one time constant and is essentially full, about 99 percent, after **five**. A 10 kohm resistor with a 100 microfarad capacitor gives tau = 1 second, so five seconds to full. The same curve runs backward on discharge, which is why a bleeder resistor's value tells you how long a cabinet needs before it is safe.

## Active components
\`\`\`
Diode        conducts one way; about 0.7 V forward drop in silicon; shorted passes both ways, open neither
Rectifier    half-wave passes one half-cycle, full-wave uses both, a bridge of four diodes is the usual form
Transistor   switches or amplifies on a small control current
SCR          a gate-triggered AC switch; the usual exposure and rotor switching element
Relay        a small coil current switching a large load; a contactor is a heavy-duty relay
Fuse, breaker opens on overcurrent; a repeat trip is a fault, never a nuisance
\`\`\`
Relays, contactors, solenoids, brakes, and motors are the **electromechanical devices** in the cabinet: current moving metal. They fail mechanically rather than electrically, so they are the parts you expect to find pitted, burned, or sticking, and they are the ones a nose and a finger diagnose faster than a meter.

Rectification matters because the tube needs one-way current. Without it the negative half-cycle would drive electrons the wrong way and destroy the tube; with it, ripple falls as pulses per cycle rise, from 100 percent on single-phase to about 14 percent on six-pulse three-phase, 4 percent on twelve-pulse, and about 1 percent on a high-frequency generator.

## Interlocks and indicators
An **interlock** is a contact in series with the exposure circuit: door, rotor ready, receptor parked, correct cassette size, collimator, emergency stop. Because they are in series, one open contact gives no exposure and very often no fault code, which is the classic "nothing happens" call. An indicator **LED** that is dark means the lamp or the circuit driving it is dead, so prove which before you conclude anything from it.

## Reading an imaging schematic
Learn the schematic symbols first, because a drawing is unreadable without them: a resistor is a zigzag or a plain rectangle, a capacitor two parallel plates with one curved if it is polarized, an inductor or winding a coil, a transformer two coils with a core between them, a diode a triangle against a bar pointing the way current flows, a transistor a circle with three leads, a fuse a short link, and a contact a pair of lines that a coil symbol beside it operates. Then follow four paths, in this order:
1. **Power path**: incoming supply, disconnect, main contactor, the autotransformer, the step-up transformer, rectifiers, and the tube.
2. **Control path**: console, logic boards, the timer, and the exposure switch's two stages.
3. **Interlock chain**: drawn as a string of normally open or normally closed contacts in series. Walk it contact by contact with the power off, on continuity.
4. **Test points**: the manual marks them with the expected value. A test point that matches the printed value proves everything upstream of it; the first one that does not names the stage.

> Exam tip: capacitors pass alternating current and block direct current, inductors do the opposite. Tau = R x C, 63 percent in one time constant and about 99 percent in five. Rectifiers exist because the tube needs direct current. Interlocks are in series, so one open contact gives no exposure and no code. Discharge before you touch.`,
      hook: "Resistors drop voltage and set milliampere stations, capacitors store charge and pass alternating current, inductors oppose current change, and transformers change voltage by turns ratio; tau equals R times C gives 63 percent in one time constant and about 99 percent in five; diodes drop about 0.7 V and rectify half-wave, full-wave, or as a bridge so the tube gets one-way current, while transistors, SCRs, relays, contactors, fuses, and breakers switch and protect; and a schematic is read as power path, control path, interlock chain in series, and test points against their printed values."
    },
    {
      id: "u4l3", title: "Electromagnetism, Induction, Transformers, and the Electromagnetic Spectrum", domain: 3, obj: "E&E-B", minutes: 10,
      body: `An x-ray generator is a machine for turning a modest building voltage into tens of kilovolts, and it does that with nothing but coils of wire and the relationship between electricity and magnetism.

## Magnetism and electromagnetism
Every magnet has two **magnetic poles**, north and south, that cannot be separated, and like poles repel while unlike poles attract, which is the whole of the laws of magnetism you need. Every moving charge makes a magnetic field around it, and a coil concentrates that field into something usable. Run current through a coil wound on iron and you have an electromagnet: brakes, relays, contactors, stator windings, and the gradient coils of a scanner are all this idea.

## Induction
**Faraday** found the other half, **electromagnetic induction**: a changing magnetic field through a conductor induces a voltage in it. The field has to be changing, which is why transformers work on alternating current, whose voltage rises and falls as a **sine wave**, and do nothing on steady direct current.
- **Self-induction** is a coil inducing a voltage in itself as its own current changes, which is what an inductor is.
- **Mutual induction** is a changing current in one coil inducing a voltage in a second coil beside it. That is a transformer.

## The transformer law
\`\`\`
Vs / Vp = Ns / Np        secondary voltage = primary voltage x turns ratio
Is / Ip = Np / Ns        current goes inversely, so voltage up means current down
Step-up    more turns on the secondary: the high-voltage section, 500 to 1,000 secondary turns per primary turn
Step-down  fewer turns: the filament supply, high current at a few volts, about 4 A or more
Autotransformer  one tapped winding; the kVp selector picks taps, read by a pre-reading voltmeter
\`\`\`
Worked: 120 V into a 750:1 step-up gives 90,000 V, which is 90 kVp at the tube. The autotransformer in front of it is typically adjustable from about 100 to 400 V, which is how one generator covers every station. Transformers lose energy to winding resistance, hysteresis, and eddy currents, all of which become heat, so the high-voltage section sits in oil that both insulates and carries that heat away. Oil that is low, contaminated, or leaking is an insulation failure waiting to arc.

## The electromagnetic spectrum
\`\`\`
radio -> microwave -> infrared -> visible light -> ultraviolet -> x-ray -> gamma ray
longer wavelength, lower frequency, lower energy   ->   shorter, higher, higher
\`\`\`
All of it travels at the speed of light; what changes is wavelength and frequency, and they are inversely related, so a shorter wavelength means a higher frequency and a higher photon energy. The energy one photon carries is its frequency times Planck's constant, and that **photonic energy** is what decides whether a photon can ionize. The same radiation behaves as a wave when you measure wavelength and as a particle when you count photons, which is **wave-particle duality**. X-rays and gamma rays sit at the energetic end, where a single photon carries enough energy to tear an electron off an atom. That is why they **ionize** and radio waves do not, and it is the whole reason the rest of this course has dose limits in it. X-rays and gamma rays differ only in origin: x-rays come from the tube's electron interactions, gamma rays from inside a nucleus.

## The induction motor that spins the anode
The anode is inside a sealed vacuum envelope, so nothing mechanical can reach it. An **electric motor** turns current into motion and an **electric generator** turns motion into current, and the stator and rotor here are an **electric motor** built around the glass. **Stator** windings outside the envelope produce a rotating magnetic field that induces currents in the rotor on the anode stem and drags it around: about 3,400 rpm standard and about 10,000 rpm on high-speed tubes. Reversing the stator field brakes it. A rotor that will not spin, runs up slowly, or sounds rough is the stator drive, its capacitor, or worn bearings, and the last of those means the tube is near its end.

> Exam tip: induction needs a changing field, so transformers need alternating current. Secondary voltage follows the turns ratio and current goes inversely. Step-up makes kilovolts, step-down heats the filament, the autotransformer selects kVp. Shorter wavelength means higher frequency and higher energy, and only the energetic end ionizes. The anode is spun by an induction motor through the glass.`,
      hook: "A moving charge makes a magnetic field and a changing field induces a voltage, which is Faraday's induction and why transformers need alternating current; mutual induction gives the transformer law where secondary voltage follows the turns ratio and current runs inversely, so a 750 to 1 step-up turns 120 V into 90 kVp while a step-down supplies about 4 A to the filament and a tapped autotransformer adjustable from about 100 to 400 V selects the station; losses become heat so the high-voltage section lives in oil; the spectrum runs radio, microwave, infrared, visible, ultraviolet, x-ray, and gamma with shorter wavelength meaning higher frequency and energy and only the top end ionizing; and stator windings spin the anode by induction at about 3,400 or 10,000 rpm."
    },
    {
      id: "u4l4", title: "Facility Power: 3-Phase, 480 VAC, Panels, and the Imaging Room's Dedicated Feed", domain: 3, obj: "E&E-C", minutes: 10,
      body: `A generator at 120 kW draws more in a tenth of a second than a whole nursing unit does in an hour. Everything about how an imaging room is fed follows from that one fact.

## Single-phase and three-phase
Single-phase service is one alternating waveform: **120/240 VAC** at 60 Hz with a grounded center neutral, which is what offices and most clinical devices run on. Three-phase service is three waveforms offset in time so the combined power never falls to zero, which is why it carries heavy loads with less current, less wiring, and far less voltage sag. Facility distribution for imaging is three-phase, commonly **480 VAC**, stepped down to what each room needs. Most imaging systems are designed for 220 V, with some at 110 V or 440 V, so the first question on any install is what the room is actually fed.

At recognition level, three-phase windings are connected either as a **delta**, a closed triangle with no neutral, or as a **wye**, three windings joined at a common point that becomes the neutral and allows two voltages from one transformer. Which one a facility uses changes the available voltages and how the system is grounded, and it is in the room's electrical drawing.

## Why the room gets its own feed
Each imaging room has its own feeder from the panel, its own breaker, and a lockable **disconnect** at the room. Three reasons: the inrush of an exposure would dim everything else on a shared circuit, a dedicated feeder keeps the conductors short and fat so the voltage holds up, and service needs a single point you can lock and tag. **Line impedance** is why the conductors matter: during an exposure the current is enormous, and voltage drop equals that current times the impedance of everything between the transformer and the tube, so an undersized or shared feed shows up as a sagging supply exactly when the exposure needs it.

## Line voltage compensation
Building power is never steady enough for repeatable exposures, so the generator corrects it ahead of the autotransformer, holding the supply at its design value. That compensator is also a diagnostic: if it is at the end of its range, the problem is the building, not the generator.

## What the generator needs on its nameplate
\`\`\`
Phase          single or three; a large generator is three-phase
Voltage        what the room must supply, and the tolerance it will accept
kVA            the apparent power the feed must deliver, which sizes breaker and conductors
Momentary draw the peak during an exposure, which is what voltage drop is calculated from
Ground         a dedicated equipment ground and bonding of every cabinet, rail, and table
\`\`\`
Grounding and bonding do two jobs at once here: they keep leakage and fault current off people, and they keep the system quiet. A lifted or high-resistance ground gives you a leakage failure and image noise in the same visit.

## Emergency power off
Every room has an emergency power off that drops the system, and the exposure circuit is interlocked to it. Know where it is in each room, test it on the schedule, and understand what it does and does not kill: it usually does not de-energize the incoming feeder, so it is not a substitute for locking the disconnect.

## Brownouts and shared feeds
Low line voltage makes a generator read kilovolts low, abort exposures partway, or throw a line-compensation or supply fault. A shared feed shows the same symptoms only when the other load is running, which is why "it only happens in the afternoon" is a power question. Measure at the room disconnect under load and during an exposure, compare with the nameplate tolerance, and bring facilities in with numbers rather than a complaint.

> Exam tip: three-phase power never falls to zero, which is why the big generators use it; distribution is commonly 480 VAC and systems are usually built for 220 V. Each room gets a dedicated feeder, breaker, and lockable disconnect. Voltage drop is current times line impedance, so low kVp and aborted exposures point at the supply. Line compensation holds the input steady, and a compensator at its limit blames the building.`,
      hook: "Single-phase is 120/240 VAC at 60 Hz while three-phase never drops to zero and so feeds the big generators, commonly distributed at 480 VAC and connected as delta or wye, with most imaging systems built for 220 V and some for 110 or 440; each room gets its own feeder, breaker, and lockable disconnect because an exposure's inrush and line impedance would otherwise sag the supply; line voltage compensation holds the input steady and a compensator at its limit indicts the building; the nameplate's phase, voltage, and kVA size the feed; and a brownout or a shared feed reads as low kVp, aborted exposures, or a supply fault."
    },
    {
      id: "u4l5", title: "UPS, Line Conditioning, and Internal System Power Distribution", domain: 3, obj: "E&E-E", minutes: 10,
      body: `Between the room disconnect and the x-ray tube there are a dozen power stages, and most "the whole system is dead" calls are one of them. Learn the chain and the call becomes a measurement instead of a guess.

## Power protection outside the system
\`\`\`
UPS, online double conversion  always runs the load from the inverter: cleanest output, no switchover gap
UPS, line-interactive          regulates voltage and switches to battery on loss
UPS, standby                   only switches on loss, no regulation
Line conditioner               regulates and filters, no battery: cures noise and sag, not a blackout
Isolation transformer          breaks a ground loop and blocks common-mode noise
Surge protection               clamps transients; a surge strip is not a UPS
\`\`\`
What a UPS protects in an imaging room is the console, the acquisition and reconstruction computers, the archive, and the detector electronics, so a study in progress is not lost and a database is not corrupted. It is normally **not** sized to make an exposure: the generator's momentary draw is far beyond it, which is why the room goes dark for imaging during an outage but the console survives. Batteries age out silently, so a unit nobody has load-tested is not protection, and the self-test and battery replacement interval belong in the PM.

## Inside the system
1. The incoming feed lands on a main contactor and the system's **PDU**, the power distribution unit that splits it to the subsystems.
2. **Low-voltage supplies** make the direct current rails for the console, logic and interlock boards, the detector, and the collimator and lamp.
3. The **high-voltage section** takes the compensated supply through the autotransformer to the step-up transformer, the rectifier set, and out through the high-voltage cables to the tube. Those cables end in potted terminations that must be clean, greased as the manual says, and seated; a dirty or loose termination arcs, and arcing is a fault code and a dead room.
4. **Interlocks and the emergency off chain** sit in series across all of it, so an open contact anywhere looks like a power failure.
Those four stages are the system's **internal system distribution**, and the manual's block diagram names every one of them with a test point and an expected value. Learn that diagram for the rooms you cover and you will stop opening cabinets to find out where the power stopped.

## How a failed supply announces itself
- **Console dead, breaker holding**: the low-voltage supply feeding the console, or the contactor that should have closed.
- **Detector offline, everything else fine**: the detector's own rail, its cable, or the panel's supply, not the generator.
- **No rotor, exposure blocked**: the stator drive supply or its capacitor, which also fails the rotor-ready interlock.
- **Intermittent resets**: a sagging rail or a tired filter capacitor, found by measuring each rail at the test point the manual names while the system works, not after it has stopped.
- **Nothing at all, with no fault code**: suspect the interlock chain or the emergency off before any board.
Measure every rail before condemning a board. A low rail imitates a dozen different faults, and boards are the most expensive wrong answer in the building.

## Stored energy
Capacitor banks, the high-voltage section, and a capacitor-discharge portable all hold energy after the disconnect is open. Lock and tag the disconnect, wait what the manual says, discharge with the manufacturer's tool to ground, verify with a meter, and keep one hand clear. Never defeat an interlock to make a measurement easier, and put every cover back before the first exposure.

> Exam tip: online double-conversion is the cleanest UPS; a line conditioner has no battery and a surge strip is neither. The uninterruptible supply protects consoles and computers, not the exposure. Measure every low-voltage rail at its test point before replacing a board, and remember that an open interlock imitates total power failure.`,
      hook: "Online double-conversion runs the load from the inverter, line-interactive regulates and switches, standby only switches, a line conditioner has no battery and a surge strip is neither, and what they protect is the console, computers, and archive rather than the exposure; inside the system the feed goes through the main contactor and PDU to low-voltage rails and to the high-voltage section of autotransformer, step-up transformer, rectifiers, and cable terminations, with interlocks and the emergency off chain in series across everything; a dead console, an offline detector, a silent rotor, or random resets each name a rail to measure first; and stored energy means lock, tag, wait, discharge, and verify."
    },
    {
      id: "u4l6", title: "Battery-Powered Systems: Ultrasound Carts and Portable X-ray", domain: 3, obj: "E&E-D", minutes: 9,
      body: `A portable x-ray unit has to make a full exposure in a ward where the nearest outlet is an ordinary general-purpose circuit. It solves that by storing energy first, which makes its battery pack a clinical part and not an accessory.

## Why portables carry batteries
The exposure comes out of the unit's own storage, not out of the wall: a battery pack driving an inverter and generator, or in older designs a **capacitor bank** charged slowly and dumped through the tube. Either way the wall only has to refill the store between exposures, which is why a portable can work from a normal receptacle at all. Many units also drive their wheels from the same pack, so a weak battery costs you both exposures and transport.

## The chemistries you will meet
\`\`\`
Sealed lead-acid   heavy, tolerant, cheap; sulfates and dies if left discharged; vents hydrogen if overcharged
Lithium-ion        lighter, more capacity, no memory; needs its own charger and protection circuit;
                   swelling, heat, or physical damage means remove it from service now
\`\`\`
Never substitute a chemistry or a capacity the unit was not built for. The charger, the protection circuitry, and the machine's own charge gauge are all matched to the pack that belongs there.

## Charging practice
Leave the unit on the charger between cases. That one habit prevents most battery failures, because a lead-acid pack left discharged sulfates and will not come back, and a lithium pack left deeply discharged may refuse to accept a charge at all. Teach the staff to read the **charge indicator** and to plug the unit in rather than parking it in a hallway, and put a charging location in the room's workflow instead of hoping.

## Capacity fade and replacement
Every pack loses capacity with cycles and age. The honest measure is not the indicator but the trend: exposures per charge, run time per charge, and pack voltage under load, logged at every PM. Replace on the manufacturer's interval or when the measured capacity falls below what the unit needs, whichever comes first, and replace a set together rather than mixing an old cell with new ones.

## What a weak pack looks like
- Exposures that are underexposed, abort partway, or will not start at all away from mains.
- The system resetting or rebooting at the moment of exposure, as the rail collapses under load.
- A rotor that will not reach ready speed, so the exposure is interlocked out.
- Drive that is slow, weak uphill, or dies before the round is finished.
Measure the pack **under load**, not at rest: a tired battery reads nearly normal open-circuit and collapses the moment it is asked for current.

## The charger and its faults
Chargers fail as often as packs. Check that it is actually delivering current, that the charge interlock does not hold the unit in a no-exposure state, and that the cord, inlet, and internal connections are sound. A unit that is "always dead in the morning" is a charger, an interlock, or staff unplugging it, long before it is a battery.

## Ultrasound carts
Carts carry batteries for transport and short scans, with their own supplies for the display, beamformer, and probe electronics, and a docking or charging position in the department. The failures look electrical rather than acoustic: a dead display, controls that do nothing, or a cart that shuts down when it is moved, which points at the pack, the supply, or a flexing cable rather than at a probe.

## Battery safety and the PM list
Lead-acid packs vent, so keep ventilation clear and never charge one in a sealed cabinet. Treat swelling, heat, leakage, or a damaged case as a fire risk: remove it, isolate it, and follow the facility's disposal and transport rules, because these are regulated waste and regulated cargo rather than trash. Every battery PM covers a visual check of case, terminals, and cables, a load measurement, the charger's output, the charge indicator against reality, run time or exposures per charge logged for the trend, and a note of the pack's date and part number.

> Exam tip: a portable makes its exposure from stored energy, so battery health is image quality. Lead-acid dies if stored discharged; lithium needs its own charger and comes out of service when it swells. Measure a pack under load, log the trend, and suspect the charger or a charge interlock before the pack when a unit is always dead in the morning.`,
      hook: "A portable draws its exposure from a battery pack or capacitor bank rather than from the ward outlet, so pack health is image quality and often drive power as well; sealed lead-acid sulfates if stored discharged while lithium-ion needs its matched charger and leaves service when it swells; leave units on the charger, read the charge indicator, and log exposures and run time per charge because the trend is the warning; a weak pack gives low or aborted exposures, resets at exposure, a rotor that never reaches ready, and slow drive, so measure it under load; and a unit always dead in the morning is a charger, a charge interlock, or an unplugged cord before it is a battery."
    }
  ]
});
