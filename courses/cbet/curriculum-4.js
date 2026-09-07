// CBET Academy curriculum, supplementary lessons added to units 1 to 9 after a coverage review against the exam's
// published content areas. Loads after curriculum-1 to curriculum-3 and appends lessons to the existing units.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];
(function () {
  const unit = (id) => FRA.units.find((u) => u.id === id);
  const add = (id, lessons) => { const u = unit(id); if (u) u.lessons.push(...lessons); };

  add("u1", [
    {
      id: "u1l6", title: "Skin, Skeleton, Muscle, and the Brain in Detail", domain: 1, obj: "A&P", minutes: 10,
      body: `The exam's anatomy questions go one level deeper than "the heart pumps." They ask which layer of skin is deepest, which muscle type is not striated, where the parathyroid sits, and which part of the brain interprets sensation. This lesson supplies that level.

## The integumentary system
Skin, hair, nails, and glands. Three layers, from the outside in: the **epidermis** (its innermost layer is the **stratum basale**, where new cells are born), the **dermis** (blood vessels, nerves, hair follicles, sweat and sebaceous glands), and the **hypodermis** (subcutaneous fat, technically beneath the skin but part of the system). **Sebaceous glands** secrete sebum, an oil that waterproofs the skin; **sweat glands** cool the body and excrete waste. Sensory receptors report pain, touch, pressure, and temperature. Skin makes **vitamin D** under ultraviolet light and absorbs some drugs, which is how transdermal patches work.

## Muscle tissue
Three types, sharing excitability, contraction, and elongation:
- **Skeletal**: voluntary, **striated** (striped under a microscope), attached to bone, works in opposing pairs to move joints as levers.
- **Cardiac**: involuntary, striated, only in the heart.
- **Smooth**: involuntary, **not striated**, in the walls of hollow organs (stomach, intestines, bladder, uterus, blood vessels) and in sphincters. Smooth muscle is the one with a "disorderly" filament arrangement.
About 600 muscles in the body.

## The skeleton
**206 bones** in the adult. The **axial** skeleton (80 bones) is the skull, vertebral column (33 vertebrae: cervical, thoracic, lumbar, sacral, coccygeal), rib cage (12 pairs, the sternum's **manubrium**, body, and **xiphoid process**), the middle-ear **ossicles**, and the **hyoid** bone that anchors the tongue. The **appendicular** skeleton (126 bones) is the **pectoral girdle** (scapula and clavicle), the **pelvic girdle**, and the limbs: **humerus, radius, ulna**, carpals, metacarpals, phalanges in the arm; **femur, patella, tibia, fibula**, tarsals, metatarsals, phalanges in the leg. Tendons join muscle to bone; ligaments join bone to bone; cartilage cushions joints.

## The brain, region by region
Neurons pass signals as action potentials and hand them to the next cell across a **synapse** by releasing a chemical. The brain has three divisions:
- **Forebrain**: the **cerebrum** (two hemispheres joined by the corpus callosum, outer cortex of gray matter) with four lobes: **frontal** (planning, judgment, working memory, voluntary movement), **parietal** (sensory input and spatial sense; where sensation is interpreted), **occipital** (vision), **temporal** (hearing). The **thalamus** relays sensory signals and regulates sleep; the **hypothalamus** links the nervous system to the pituitary and controls temperature, hunger, and hormones.
- **Midbrain**: relays vision and hearing signals; sits above the pons.
- **Hindbrain**: the **cerebellum** (balance, coordination, smooth repetitive movement), the **pons** (relay and autonomic functions), and the **medulla oblongata** (breathing, heart rate, blood pressure).
The **brain stem** is the midbrain, pons, and medulla together; it connects to the spinal cord and keeps you alive without thinking.

## Peripheral nerves, two ways to split them
The **somatic** system controls voluntary skeletal muscle (walking, typing). The **autonomic** system runs involuntary functions, with the **sympathetic** branch for fight or flight and the **parasympathetic** branch for rest and digest.

> Exam tip: hypodermis is the deepest layer; stratum basale is the deepest part of the epidermis. Smooth muscle is non-striated and involuntary; cardiac is striated and involuntary. 206 bones, 80 axial and 126 appendicular. The parietal lobe interprets sensation; the medulla runs breathing and heart rate; the cerebellum coordinates. Somatic is voluntary.`,
      hook: "Epidermis (stratum basale at its base), dermis, hypodermis deepest. Sebaceous oil, sweat cools, skin makes vitamin D. Skeletal striated voluntary, cardiac striated involuntary, smooth non-striated involuntary. 206 bones: 80 axial, 126 appendicular. Frontal plans, parietal senses, occipital sees, temporal hears; thalamus relays; hypothalamus to pituitary; cerebellum coordinates; medulla breathes. Somatic voluntary, autonomic involuntary."
    },
    {
      id: "u1l7", title: "Digestion, Lymph and Immunity, Hormones, Kidneys, Reproduction, and Blood Terms", domain: 1, obj: "A&P", minutes: 11,
      body: `The remaining body systems, at the depth the exam asks: the organ, its job, and the one fact that gets tested.

## The digestive tract, in order
Digestion is movement, secretion, chemical breakdown, and absorption.
1. **Mouth**: chewing (**mastication**) increases surface area; salivary **amylase** starts on starch and lingual **lipase** on fat.
2. **Esophagus**: the **epiglottis** covers the airway during swallowing; the **lower esophageal sphincter** keeps acid out of the esophagus.
3. **Stomach**: grinds food and adds **gastric acid** (pH about **1.5 to 3.5**) and proteases; the **pyloric sphincter** releases the resulting **chyme** slowly.
4. **Small intestine**: **duodenum** (first section, most chemical digestion, receives bile and pancreatic enzymes), **jejunum** (absorbs sugars, amino acids, fatty acids), **ileum** (finishes absorption, recovers bile salts).
5. **Large intestine**: reabsorbs water to form solid waste; hosts bacteria that make vitamin K.
Accessory organs: the **liver** (largest solid organ; makes **bile**, plasma proteins, and cholesterol; stores glucose as **glycogen**; converts ammonia to **urea**; clears drugs and toxins; regulates clotting), the **gallbladder** (stores and concentrates bile, releases it into the duodenum), and the **pancreas** (exocrine digestive enzymes into the duodenum; endocrine **insulin** and glucagon into the blood).

## Lymphatic and immune systems
The lymphatic system drains interstitial fluid as **lymph** through vessels with valves, filters it in **lymph nodes** (concentrated in the neck, armpits, and groin), and returns it to the veins through lymphatic ducts. Lymphoid tissues: **tonsils**, the **thymus** (where T cells mature), the **spleen** (cleans blood of old cells and pathogens), and **Peyer's patches** in the small intestine. The immune system uses white cells and antibodies to avoid, detect, and eliminate infection; it does not filter toxins (the kidneys do that) and is not controlled by the hypothalamus.

## Endocrine glands and feedback
Hormones travel in blood and act only on cells with matching receptors. The **hypothalamus** and **pituitary** form the control center. Glands to know: **thyroid** (metabolic rate), **parathyroid** (four small glands on the **posterior of the thyroid's lateral lobes**; raise blood **calcium**), **adrenal cortex** (cortisol, salt and sugar balance) and **adrenal medulla** (epinephrine), **pancreatic islets** (insulin lowers glucose, glucagon raises it), **thymus**, **pineal** (daily rhythms), and the gonads. Most regulation is **negative feedback**: rising glucose triggers insulin, which lowers glucose, which stops the trigger. **Positive feedback** amplifies (labor contractions). The **pons** is brain stem, not a gland.

## The kidney, closer up
Each kidney has an outer **renal cortex**, inner **renal medulla**, and a **renal pelvis** that funnels urine into the **ureter**. About a million **nephrons** do the work: blood enters the **glomerulus** (a capillary tuft inside **Bowman's capsule**), where **blood pressure** drives filtration; the filtrate runs through tubules that reabsorb water, glucose, and ions, secrete wastes and hydrogen ions (adjusting pH), and send the rest to collecting ducts as urine. Urine leaves through the ureters, the bladder, and the **urethra**. Dialysis imitates the nephron with a membrane and dialysate.

## Reproduction
Male: **testes** make sperm and testosterone; sperm mature in the **epididymis**, travel the **vas deferens**, and mix with fluids from the seminal vesicles, **prostate**, and bulbourethral glands. Hormones: **FSH** drives sperm production, **LH** drives testosterone. Female: **ovaries** make eggs and secrete **estrogen** and **progesterone**; the egg travels the **fallopian tube**, where **fertilization** occurs, and the embryo implants in the **uterus**; the vagina is the birth canal.

## Blood terms that get confused
**Hemoglobin** is the iron-containing protein in red cells that carries oxygen. **Hematocrit** is the fraction of blood volume that is red cells (about 45 percent), measured by spinning a sample in a hematocrit centrifuge. An adult has about **5 liters** (five quarts) of blood. White cell types: lymphocytes, neutrophils, monocytes, eosinophils, basophils. Red cells live about four months and have no nucleus.

> Exam tip: the duodenum is the first part of the small intestine; the large intestine reabsorbs water; the gallbladder stores bile and the liver makes it; the pancreas makes insulin. Fertilization is in the fallopian tube. Filtration in the kidney is driven by blood pressure. Hemoglobin carries oxygen; hematocrit is the red-cell fraction. Negative feedback keeps things stable.`,
      hook: "Mouth amylase and lipase, epiglottis, stomach pH 1.5 to 3.5, pyloric sphincter, chyme, duodenum then jejunum then ileum, large intestine reabsorbs water. Liver makes bile, glycogen, urea; gallbladder stores bile; pancreas enzymes and insulin. Lymph nodes, tonsils, thymus, spleen, Peyer's patches. Parathyroid on the back of the thyroid raises calcium; negative feedback. Cortex, medulla, pelvis; glomerulus in Bowman's capsule; blood pressure drives filtration. Fertilization in the fallopian tube. Hemoglobin carries oxygen, hematocrit is the red-cell fraction, about 5 liters."
    }
  ]);

  add("u2", [
    {
      id: "u2l6", title: "Circuit Analysis: Energy, Dividers, Kirchhoff's Laws, Bridges, and Op-Amp Gain", domain: 3, obj: "Electronics", minutes: 11,
      body: `The exam's electronics items are short calculations. Each one below is a formula, a worked example, and the mistake the distractors are built from.

## Energy and the kilowatt-hour
Power is the rate of energy use; energy is power times time. A device drawing **500 mA at 120 V** uses 0.5 x 120 = **60 W**; run for 8 hours it uses 60 x 8 = 480 watt-hours = **0.48 kWh**, the unit on the electric bill. P = V x I, P = I squared x R, P = V squared / R: a 10 A current through 30 ohms dissipates 100 x 30 = **3,000 W**.

## Equivalent resistance
Series adds: 12 + 8 + 6 = **26 ohms**. Parallel uses reciprocals: for 4, 8, and 5 ohms, 1/4 + 1/8 + 1/5 = 0.25 + 0.125 + 0.2 = 0.575, so R = 1 / 0.575 = **1.74 ohms**, smaller than the smallest branch. For two resistors the shortcut is product over sum.

## Voltage divider
In series, each resistor takes a share of the source voltage in proportion to its resistance: V across R1 = V source x R1 / (R1 + R2 + ...). A 10 V source across 1.5 kilohms and 1 kilohm in series puts 10 x 1000 / 2500 = **4 V** across the 1 kilohm resistor. Every resistor in a series string obeys the same rule; the shares add back to the source.

## Current divider
In parallel, the current splits in inverse proportion to resistance: I through a branch = I total x (1 / R branch) / (sum of 1 / R for all branches). With 600 mA feeding 80, 50, and 200 ohm branches, the 50 ohm branch gets 600 x (1/50) / (1/80 + 1/50 + 1/200) = 600 x 0.02 / 0.0375 = **320 mA**. The smallest resistance takes the biggest share. A quicker check: all parallel branches see the same voltage, so I = V / R for each.

## Kirchhoff's laws, used properly
- **KCL** (current law): current into a node equals current out. Nodal analysis: if 9 A enters and 5 A and 2 A leave on two branches, the third branch carries **2 A**. A negative answer means the current flows opposite the arrow you assumed.
- **KVL** (voltage law): the voltages around any closed loop sum to zero; rises equal drops. Mesh analysis: a 10 V source and drops of 3, 2, and 4 V leave **1 V** for the last element.
These let you solve any unknown from a schematic when the resistor formulas alone will not.

## A battery's internal resistance
A real battery is an ideal source in series with a small resistance. If an open-circuit 1.58 V cell drops to 1.46 V with an 80 ohm load, the load current is 1.46 / 80 = 0.01825 A, and the internal resistance is the lost voltage over that current: (1.58 minus 1.46) / 0.01825 = **6.58 ohms**. Internal resistance rises as a battery ages, which is why an old battery reads full voltage unloaded and collapses under load.

## The Wheatstone bridge
Four resistors in a diamond with a meter across the middle. The bridge is **balanced** (zero current in the meter) when the ratios of the two sides match: R1 / R2 = R3 / R4. Given three values, the unknown is R4 = R3 x R2 / R1: with 9.8, 5.8, and 1.9 ohms, the missing resistance is 9.8 / 5.8 x 1.9 = **3.2 ohms**. Strain gauge pressure transducers and thermistor circuits are bridges; the tiny imbalance is the signal.

## Op-amp gain from resistor ratios
For an inverting amplifier, gain = R feedback / R input (the sign inverts). A gain of 9 with a 5 kilohm input resistor needs a **45 kilohm** feedback resistor. Non-inverting gain is 1 + R feedback / R input. ECG and pressure amplifiers are built from these ratios; a drifted resistor is a wrong gain.

> Exam tip: energy is power times time, in kWh on the bill. Divider formulas: voltage splits in proportion to resistance in series; current splits inversely in parallel. KCL at nodes, KVL around loops. Internal resistance is the voltage drop under load divided by the load current. A bridge balances when the ratios match. Inverting op-amp gain is R feedback over R input.`,
      hook: "P = VI = I squared R = V squared / R; energy = P x t, kWh. Series adds; parallel reciprocals, less than the smallest. Voltage divider: V x R1 / R total. Current divider: inverse to resistance. KCL in equals out; KVL loop sums to zero. Internal resistance = voltage drop / load current. Wheatstone balanced when R1/R2 = R3/R4. Inverting gain = Rf / Rin."
    },
    {
      id: "u2l7", title: "AC Power, Impedance, Transducers, Batteries by the Numbers, and Regulators", domain: 3, obj: "Electronics", minutes: 11,
      body: `The second set of electronics facts the exam draws on: how AC power is described and delivered, how reactance becomes impedance, what makes a component active, how batteries are specified, and how a switching regulator fails.

## Power distribution in the United States
Generators produce AC at a few kilovolts; **step-up transformers** raise it to hundreds of kilovolts for transmission because losses fall as current falls; **step-down transformers** at substations and on poles bring it to 240 V for buildings. Homes and most hospital branch circuits use the **split-phase** system: two 120 V lines of opposite phase with a grounded neutral between them, giving 120 V line to neutral and 240 V line to line, at **60 Hz**. The **National Electrical Code** is **NFPA 70**; the **NESC** (National Electrical Safety Code, from IEEE) covers utility transmission. Transformer math: V primary / V secondary = N primary / N secondary; stepping 240 V up to 6,000 V for a defibrillator charger needs a turns ratio of 240 / 6,000 = **0.04** (primary to secondary), that is 25 secondary turns per primary turn.

## True, reactive, and apparent power
In AC circuits with inductors and capacitors, voltage and current fall out of phase. **True (real) power** P, in watts, does work. **Reactive power** Q, in **VAR** (volt-amperes reactive), shuttles back and forth without doing work. **Apparent power** S, in **VA**, is what the supply must deliver: S squared = P squared + Q squared, a right triangle with S as the hypotenuse. 180 W with 240 VAR gives S = square root of (180 squared + 240 squared) = **300 VA**. **Power factor** is P / S, 0.6 here; UPS units and generators are rated in VA, so a low power factor means less usable wattage.

## Reactance and complex impedance
An inductor's reactance is **XL = 2 x pi x f x L**; a capacitor's is **XC = 1 / (2 x pi x f x C)**. A 40 mH inductor at 60 Hz: 2 x 3.1416 x 60 x 0.040 = **15 ohms**. Impedance combines resistance and reactance as **Z = R + jX**, where the reactive part is the imaginary component, written with j (or i) to show it is 90 degrees out of phase; an ideal 30 mH inductor at 60 Hz has Z = **11.3j ohms** with no real part, and a real coil with 0.01 ohm of wire resistance has Z = 0.01 + 11.3j. Inductance is in **henries** (usually millihenries), capacitance in farads (usually microfarads). Filters are named by what they pass: **low-pass, high-pass, band-pass, band-stop** (the notch filter is a narrow band-stop).

## Passive, active, and transducers
**Passive** components (resistors, capacitors, inductors, the **memristor**) consume or store energy and cannot amplify. **Active** components (transistors, op-amps, ICs) need a power source and provide gain. A thermistor is passive; a transistor is active. A **transducer** converts one form of energy to another: a **sensor** turns pressure, temperature, light, or sound into an electrical signal; an **actuator** turns an electrical signal into motion, heat, light, or sound. A piezoelectric crystal is both: pressure makes charge, and charge makes it move, which is why one ultrasound element sends and receives.

## Battery specifications
- **Voltage per cell** (chemistry sets it; a AA is one cell).
- **Capacity** in amp-hours or watt-hours.
- **Energy density**: energy per unit weight; it decides how heavy a battery a device must carry.
- **Internal resistance**: rises with age; limits current and causes sag under load.
- **Shelf life**: how well charge holds while unused; **self-discharge** rate.
- **Discharge curve**: how voltage falls over a discharge; a flat curve keeps a device happy until the end.
- **Cycle life** for rechargeables: the number of charge cycles before capacity falls.
- **C-rate**: charge or discharge current relative to capacity. A 60 kWh battery charged at 0.5 C draws 0.5 x 60 = **30 kW**; 1 C would empty or fill it in one hour.

## Regulators and how they fail
A **linear regulator** drops the excess voltage across a transistor and wastes it as heat: simple, quiet, inefficient. A **switching regulator** (switch-mode supply, SMPS) turns the input on and off rapidly and averages the result with an inductor and capacitor; the output is set by the on-to-off ratio (duty cycle): efficient, light, noisier. Failure signatures: a switching element **shorted** passes the full input voltage through (a high-voltage fault, and the downstream boards fail with it); a switching element stuck **open** gives zero output. Test a regulator by measuring its input and output pins against ground and comparing to the rated values; replace it with the same part number. A **GFCI** is not a regulator; it cuts power when the return current is smaller than the outgoing current.

> Exam tip: split-phase gives 120 and 240 V at 60 Hz; NEC is NFPA 70. S squared = P squared + Q squared, in VA, W, and VAR. XL = 2 pi f L; Z = R + jX. Memristor and thermistor are passive; transistor is active. Sensors convert to electrical, actuators from electrical. Energy density sets battery weight; C-rate times capacity gives charge power. A shorted switching element outputs full input voltage.`,
      hook: "Step-up to transmit, step-down to use; split-phase 120/240 V 60 Hz; NEC = NFPA 70; turns ratio = voltage ratio. S squared = P squared + Q squared; watts, VAR, VA; power factor P/S. XL = 2 pi f L, XC = 1/(2 pi f C), Z = R + jX, henries and farads. Passive stores or consumes; active amplifies; sensor to electrical, actuator from electrical. Battery: voltage per cell, energy density, internal resistance, shelf life, discharge curve, cycle life, C-rate. Switching regulator shorted = full input voltage, open = zero."
    }
  ]);

  add("u3", [
    {
      id: "u3l6", title: "NFPA 99 in Detail: Cylinders, Medical Gas Systems, Receptacles, Cords, Power Taps, Nurse Call, and Telecom Rooms", domain: 2, obj: "Safety", minutes: 11,
      body: `NFPA 99, the Health Care Facilities Code, is quoted on the exam by its specific rules, not just its name. These are the ones that appear.

## Storing gas cylinders
- Full cylinders and containers over **85 cubic meters** (at standard temperature and pressure) are stored separately from other full containers in noncombustible, lockable, secured spaces. Nonflammable gas quantities of 8.5 to 85 cubic meters go in secured, noncombustible or limited-combustible spaces.
- **Oxidizing gases** (oxygen, nitrous oxide) are kept at least **20 feet** from flammable gases, liquids, or vapors, or **5 feet** if the storage space has compliant automatic sprinklers, or with no separation inside a compliant gas cabinet.
- **No smoking or ignition sources** inside storage spaces, and none within 20 feet of outdoor storage.
- Small cylinders (sizes A, B, D, E) are secured to a stand or rack designed to hold them; nothing is stored loose or leaning. Cylinders are stored between about **minus 7 and 52 C** (20 to 125 F), **unwrapped** (shipping wrap comes off before storage), never in tightly enclosed spaces, and storage rooms holding positive-pressure gases other than oxygen and medical air carry a warning on the door. Cylinders in use inside smoke compartments do not need a separate enclosure.

## Medical gas and vacuum systems
Where a gas or vacuum failure could cause major injury (general anesthesia, deep sedation, the patient care vicinity), the code requires: cylinders that meet **DOT, Transport Canada, or ASME** rules; **contents-specific outlet connections** with no adapters; accurate, unaltered labels and verified contents; secure storage; **redundant** piping and components so no single fault shuts the supply down; **alarms**, labeled **shutoff (zone) valves**, and pressure and vacuum indicators; and an inventory with regular inspection by qualified people.

## Receptacles and wiring in patient care spaces
- Patient bed locations in general care get a minimum of **eight** receptacles (critical care gets more, often fourteen); they are **non-locking** so a cord pulls free, and in patient care spaces they are **tamper-resistant**. Bathrooms have no minimum.
- **Isolated-ground receptacles** (orange, with a triangle) are **prohibited** within the patient care vicinity, because they defeat the equipotential grounding the code relies on.
- Operating rooms may use single, duplex, or quadruplex receptacles; ground contacts are insulated; three- or four-pole units; locking or non-locking allowed. Wet procedure locations use isolated power or GFCIs.
- Household appliances without a grounding conductor are allowed only outside the patient care vicinity unless they are **double insulated**. Every piece of plug-connected non-medical electronics that a patient will touch, facility- or patient-owned, is inspected by staff before use, and anything worn or malfunctioning is removed or reported.

## Cords, plugs, and power taps
- **Three-to-two prong adapters** ("cheaters") are prohibited; they open the ground.
- Power cords need intact **strain relief** at both ends regardless of how often the device is unplugged; detachable cords are fine where sudden disconnection is not a hazard or a retention mechanism is used.
- **Tinned** (solder-coated) stranded wire ends under screw terminals are prohibited; solder cold-flows and the joint loosens.
- **Relocatable power taps** may be used with patient care equipment only when rated and secured, and the connected load may not exceed **75 percent** of the tap's rating, its ampacity (an AWG 10 tap rated for 35 A carries no more than 26 A). Never daisy-chain taps, and never use ordinary extension cords for patient care equipment.
- Portable patient-care equipment: chassis touch current no more than **500 microamps**, chassis-to-ground-pin resistance no more than **0.5 ohm**. A three-wire monitor leaking 0.5 mA (500 microamps) is at the limit; 0.6 mA fails.

## Nurse call systems
Nurse call (NFPA 99 chapter 7) is an audiovisual or tone-visual system that lets patients and staff call for help and that carries **medical device alarms, staff emergencies, code calls, and patient requests**. Every call must be announced audibly and visually at the required locations per state and local codes, and may also be sent to pagers and wireless devices. A cancelled call must be cancelled at the source. It is life-safety equipment: on emergency power, tested, and documented.

## Telecommunications rooms
Facilities must provide enough **telecommunications rooms** that no data outlet is more than **90 meters** of cable from its room (the copper limit with patch cords). At least **one TR per floor**, each serving no more than **20,000 square feet**; only equipment that supports the room's function inside; in disaster-prone areas, interior rooms with no exterior walls. The TR is where your monitor's network drop terminates.

## Touch current and clean agents
**Touch current** is leakage from a chassis that a patient or staff member can reach, flowing through any path other than the protective ground. **Clean agents** are fire extinguishants that are electrically nonconductive, volatile or gaseous, and leave no residue (nitrogen, carbon dioxide, the noble gases, halocarbon agents); they protect electronics and telecom rooms where water would destroy equipment.

> Exam tip: oxidizers 20 feet from flammables, 5 feet with sprinklers; no smoking within 20 feet; cylinders unwrapped, secured, between minus 7 and 52 C. Eight non-locking tamper-resistant receptacles per patient room; no isolated-ground receptacles in the patient care vicinity; OR receptacles may be duplex or quadruplex with insulated grounds. No cheater plugs, no tinned stranded ends, strain relief always, power taps at 75 percent, 500 microamps and 0.5 ohm for portable patient equipment. Ninety meters to the telecom room, one per floor, 20,000 square feet.`,
      hook: "Cylinders: secured, unwrapped, minus 7 to 52 C, oxidizers 20 ft from flammables (5 ft with sprinklers), no smoking within 20 ft, not in tight enclosures. Gas systems: DOT/ASME cylinders, gas-specific outlets, no adapters, redundancy, alarms, zone valves. Patient rooms: 8 non-locking tamper-resistant receptacles; no isolated-ground receptacles in the vicinity; OR duplex or quadruplex, insulated grounds; double-insulated household devices only. No cheater adapters, tinned ends, or missing strain relief; power taps 75%; portable equipment 500 microamps and 0.5 ohm. Nurse call carries device alarms and code calls. Telecom rooms: 90 m, one per floor, 20,000 sq ft. Touch current; clean agents leave no residue."
    },
    {
      id: "u3l7", title: "HazCom and GHS, Exposure Limits, Waste Rules, Precaution Systems, and the Accrediting Bodies", domain: 2, obj: "Safety", minutes: 11,
      body: `The safety domain also tests the paperwork: which standard requires what, which label element means what, which number is the legal limit, and which organization does which job.

## Hazard Communication versus GHS
OSHA's **Hazard Communication Standard** (29 CFR 1910.1200) requires employers to tell workers about chemical hazards, label containers, keep safety data sheets available, train staff, and keep training records. The **Globally Harmonized System** is the United Nations scheme that standardizes hazard classification, pictograms, signal words, and the SDS format worldwide; OSHA adopted it, so since 2015 US workplaces must use GHS-format SDSs and labels.

## Safety data sheet, the sixteen sections in order
1 identification, 2 hazard identification, 3 composition, 4 first aid, 5 fire fighting, 6 accidental release, 7 handling and storage, 8 exposure controls and personal protection, 9 physical and chemical properties, 10 stability and reactivity, 11 toxicological information, 12 ecological information, 13 disposal, 14 transport, 15 regulatory information, 16 other. An SDS gives handling procedures and the manufacturer's contact information; human carcinogenicity must be stated (animal-test carcinogenicity is recommended, not mandatory).

## Toxicity and exposure numbers
- **LD50**: the dose that kills 50 percent of test subjects; **LC50**: the lethal concentration in air for 50 percent. Both are normalized to body mass and note the route (oral, dermal, inhaled).
- **PEL**: OSHA's **permissible exposure limit**, the legal maximum averaged over a work shift.
- **TLV**: the **threshold limit value** recommended by the ACGIH; **REL**: NIOSH's recommended exposure limit, usually lower than the PEL; **STEL**: a **short-term exposure limit**, a ceiling for a 15-minute period rather than an average.
- Carcinogen listings come from the **NTP** (National Toxicology Program), **IARC**, and OSHA.
Chemical PPE from the SDS: chemical protective clothing, splash **goggles** with vents, a **face shield** over goggles for large quantities, gloves chosen for permeability, respirators when fume hoods cannot control vapors, aprons or suits, and closed-toed shoes.

## GHS labels
A compliant label, on the original container or a secondary one filled at work, shows the chemical identity, the manufacturer's name and US contact, the pictograms, a **signal word**, hazard statements, and precautionary statements. Only two signal words exist: **Danger** for the more severe hazards, **Warning** for the lesser. The nine pictograms: health hazard (silhouette), flame (flammable, **pyrophoric** substances that ignite in air within five minutes, self-heating), exclamation mark (irritant, sensitizer), gas cylinder (gas under pressure), flame over circle (**oxidizer**), corrosion, exploding bomb (reactive, explosive), environment (aquatic toxicity), skull and crossbones (acute toxicity). There is no "reducer" pictogram.

## Blood and waste rules
- **Universal precautions** (1980s) treat all blood and blood-contaminated fluids as infected with **blood-borne pathogens** (hepatitis B and C, HIV, Ebola); they do not apply to sweat, tears, nasal secretions, or urine unless bloody. Surfaces are cleaned with a bleach solution; contaminated solid waste goes in a plastic bag.
- **Standard precautions** (CDC, 1996) widened this to all body fluids and added body substance isolation; **transmission-based precautions** (contact, droplet, airborne) supplement them. Airborne disease needs an N95 respirator and a **negative-pressure** room, not a surgical mask.
- The OSHA Bloodborne Pathogens Standard defines **regulated waste** as liquid or free-flowing blood or items saturated with it: sealed and sent to a licensed medical waste service. Items with small amounts of **dried** blood can go in a sealed plastic bag with regular trash. Contaminated broken glass is picked up with tools, never hands. Sharps go in labeled puncture-proof containers.
- Laboratory practice: an annual biological risk assessment sets the **biosafety level**; **no mouth pipetting**; no eating, drinking, or contact-lens handling in the lab; retractable needles; minimize aerosols; decontaminate before disposal; an accessible **eyewash** station; hands-free sinks; a **clean utility** room separate from the **dirty utility** room; immunizations and PPE for staff. Lab coats are not gowns.

## Who accredits and regulates what
- **The Joint Commission**: accredits and certifies healthcare organizations by peer survey; publishes the **National Patient Safety Goals** yearly; links quality and risk management; does not set financial benefits.
- **DNV**: accredits hospitals under its **NIAHO** program, integrating the CMS Conditions of Participation with **ISO 9001** quality management; surveys annually.
- **ISO 9000 / 9001**: international quality management standards built on the **plan-do-check-act** cycle and risk-based thinking.
- **CMS**: runs Medicare, Medicaid, and **CHIP**; regulates human lab testing; publishes yearly **core measure** sets (clinical quality measures); does not accredit.
- **CAP** (College of American Pathologists): the nonprofit accrediting body for clinical laboratories under CMS authority; inspects every two years plus unannounced visits.
- **SMDA** (Safe Medical Devices Act, 1990, amended 1992): extends the FDA's **medical device reporting** to user facilities: device-related **deaths** reported to the FDA and the manufacturer, **serious injuries** to the manufacturer (or the FDA if unknown), with annual summaries.

> Exam tip: HazCom is OSHA's rule; GHS is the UN format it adopted. Sixteen SDS sections. PEL is legal, TLV and REL are recommendations, STEL is short-term, LD50 is the lethal dose for half. Signal words are Danger and Warning only; no reducer pictogram. Regulated waste is free-flowing blood; dried blood in a sealed bag can go in the trash. Airborne needs negative pressure. Joint Commission accredits and publishes NPSGs; DNV uses NIAHO and ISO 9001; CAP accredits labs; SMDA requires adverse event reporting.`,
      hook: "HazCom 29 CFR 1910.1200 adopts GHS. SDS 16 sections, handling and contact info. LD50 lethal dose for 50%; PEL legal (OSHA), TLV (ACGIH) and REL (NIOSH) recommended, STEL 15-minute ceiling; NTP and IARC list carcinogens. Labels: identity, contact, pictograms, signal word Danger or Warning, statements; pyrophoric ignites in air; oxidizer yes, reducer no. Universal precautions for blood; standard precautions for all fluids; airborne = N95 plus negative pressure. Regulated waste = free-flowing blood; dried blood sealed in regular trash. No mouth pipetting; eyewash; clean versus dirty utility. Joint Commission NPSGs; DNV NIAHO with ISO 9001 PDCA; CMS core measures and CHIP; CAP accredits labs; SMDA reporting."
    }
  ]);

  add("u4", [
    {
      id: "u4l7", title: "Manual Blood Pressure, Rhythms on the Strip, EEG Landmarks, Respiration Methods, and Analyzer Specifications", domain: 4, obj: "Function", minutes: 11,
      body: `Details that sit between the monitoring lessons and get their own questions: the manual cuff, what named arrhythmias look like, where EEG electrodes go, the other ways to count breaths, and exactly what each analyzer checks.

## The sphygmomanometer
A **sphygmomanometer** is an inflatable cuff, an inflation bulb with a valve, and a **manometer** (mercury column, aneroid dial, or electronic gauge) that reads cuff pressure. Manual **auscultatory** measurement: inflate above systolic until the radial pulse vanishes, deflate slowly, and listen with a stethoscope over the brachial artery. The first **Korotkoff** sound is systolic; the point where sounds disappear is diastolic. Automated devices replace the stethoscope with a microphone or use oscillometry. Faults: a gauge that does not return to zero needs the zeroing screw or recalibration; readings too high mean the cuff is below heart level or the patient is not at rest; readings consistently low mean the cuff is above the heart or, most often, an **air leak** in the cuff, tubing, or bulb; unstable readings mean movement or a badly placed cuff. If one unit reads high and others do not, test that unit on an NIBP simulator rather than on another patient; a leak lowers readings, so a leak cannot explain high ones.

## Arrhythmias as they appear on the strip
- **Sinus tachycardia**: fast but regular, normal waves.
- **Atrial (supraventricular) tachycardia**: rapid, consistent narrow QRS complexes, often over 150 bpm.
- **Atrial fibrillation**: irregular rhythm with rapid, quivering waves between QRS complexes and no true P waves.
- **Ventricular tachycardia**: rapid, **wide** QRS complexes; may or may not have a pulse.
- **Ventricular fibrillation**: chaotic, irregular spikes with no organized complexes; no output; shock it.
- **Asystole**: flat line; confirm the leads before believing it.
The interval from the end of the P wave to the start of the R wave is the AV conduction delay; the interval from the end of S to the start of T is when the ventricles are fully depolarized.

## ECG lead facts that get asked
A 12-lead ECG uses **ten electrodes**: four limb, six chest. **aVF** looks at the inferior wall of the heart (its positive pole is the left leg); aVR and aVL look from the right and left arms; V1 through V6 look horizontally. AHA limb colors: RA white, LA black, RL green, LL red; chest leads brown. The **IEC** color scheme used outside the US is different (RA red, LA yellow, LL green, RL black), so an imported cable set can be miswired by color. An electrocardiograph's thermal print head is tested by printing test patterns such as repeated letters or diagonal lines; running the paper at 10, 12.5, 25, and 50 mm/s tests the motor and paper sensors.

## EEG placement
The **10-20 system** places electrodes at 10 and 20 percent intervals of the distance between the **nasion** (the bridge of the nose) and the **inion** (the bump at the back of the skull), and between the ear points, so every lab records from the same spots. Beta waves (highest frequency) mean awake and active; alpha relaxed with eyes closed; theta drowsy; delta deep sleep. The signal passes through a differential amplifier that cancels what both electrodes share.

## Ways to monitor respiration
The most common is **chest impedance** (impedance pneumography) through the ECG electrodes; more air in the chest raises impedance. Other methods: **respiratory belts** (inductance or pressure) around the chest and abdomen, **airflow sampling** (thermistor or pressure at the nose, or the capnograph), and magnetometer methods. Capnography is the only one that proves gas is moving through the airway.

## Pulse oximetry, the numbers
Red light at about **650 to 660 nm** and infrared at about **805 to 940 nm**. Oxyhemoglobin absorbs more infrared; deoxygenated hemoglobin absorbs more red. Low perfusion, dark nail polish, carbon monoxide, and ambient light degrade accuracy; high perfusion helps. A fingertip oximeter that turns off mid-use has a low battery; one that never reads has poor placement or a truly low saturation.

## What each analyzer measures
- **Ventilator analyzer**: gas flow, pressure, tidal and minute volume, oxygen concentration, and breath detection thresholds; some act as lung simulators; handheld, battery powered, with data storage. It does not measure CO2 concentration.
- **Electrical safety analyzer**: ground wire resistance, chassis and lead leakage under normal and fault conditions, and, when simulating a human body's impedance against the enclosure, the touch current.
- **Defibrillator analyzer**: delivered energy, peak voltage and current, charge time, ECG synchronization delay, and pacer output into a fixed load. It measures what the defibrillator delivers, not the defibrillator's internal impedance.
- **ESU analyzer**: RMS power and current into loads, **crest factor** (peak-to-RMS ratio, sharp for cut, high for coag), peak-to-peak voltage, **RF leakage** current, and the return electrode monitor's alarm thresholds. It does not test handpiece continuity or chassis leakage; a multimeter and a safety analyzer do those.
- **Physiological simulator**: ECG with arrhythmias, invasive and non-invasive pressures, respiration, SpO2, temperature, fetal signals, all synchronized to one pulse. It does not simulate current.
- **DVM**: voltage only, with a small current draw from the circuit; auto or manual ranging; red lead positive. **DMM**: voltage, current, resistance, plus **continuity** (a tone when resistance between two points is low, circuit unpowered), frequency, and capacitance.

> Exam tip: manual BP uses a manometer and a stethoscope; a leak reads low, never high. VT has wide QRS; SVT is rapid and regular; AF is irregular without P waves. aVF sees the inferior wall; ten electrodes make twelve leads. Nasion to inion for EEG. Chest impedance is the usual respiration method. Ventilator analyzers measure flow, pressure, O2, and breath detection, not CO2; ESU analyzers measure crest factor and RF leakage, not handpiece continuity; a DMM's continuity mode measures low resistance.`,
      hook: "Sphygmomanometer: cuff, bulb, manometer, stethoscope; first Korotkoff systolic, disappearance diastolic; leak reads low; zero the gauge. VT wide QRS; SVT rapid regular; AF irregular, no P; VF chaotic. Ten electrodes, twelve leads; aVF inferior; AHA white-black-green-red, IEC red-yellow-green-black; print head test with letters. EEG 10-20 from nasion to inion; beta awake. Respiration: chest impedance, belts, airflow. SpO2 650 to 660 and 805 to 940 nm. Ventilator analyzer: flow, pressure, O2, breath detection. ESU analyzer: power, crest factor, RF leakage, REM. Defib analyzer: energy, charge time, sync. Simulator: no current. DMM continuity = low resistance, unpowered."
    }
  ]);

  add("u5", [
    {
      id: "u5l5", title: "Imaging Equipment: Ultrasound Physics, Radiography, Fluoroscopy, CT, MRI, and PET", domain: 4, obj: "Function", minutes: 10,
      body: `A biomed rarely repairs an X-ray tube, but the exam expects you to know how each imaging modality makes a picture and what its hazards are. Ultrasound is the one you will service; the rest you must recognize.

## Ultrasound
A **piezoelectric** crystal in the transducer turns electrical pulses into sound above hearing (2 to 15 MHz) and returning echoes back into electricity; the same element sends and receives. Tissue boundaries reflect; gel excludes air, which reflects everything. **Doppler** ultrasound detects motion: sound reflected from blood moving **toward** the transducer returns at a **higher** frequency (higher pitch), away at a lower one, giving flow direction and velocity. A blurry, noisy image from a handheld unit: check the crystal for cracks and continuity first (excess drive voltage from a failed regulator can damage it), then the gel, because too little gel scatters the beam in air. Higher frequency resolves finer detail but penetrates less.

## Radiography (X-ray)
X-rays are electromagnetic waves far shorter than visible light. In the tube, electrons boil off a heated **tungsten filament** (cathode) and slam into an angled **tungsten anode** target in a vacuum; the kilovoltage sets their speed and the beam's penetrating power, the milliamp-seconds set the quantity. Tissues absorb in proportion to density: bone and metal are **radiopaque** and appear **white**; air and water are **radiolucent** and appear dark. The image lands on film, a phosphor plate, or a digital detector. Staff protection is time, distance, shielding, lead aprons, and shielded rooms with labeled doors.

## Fluoroscopy
Continuous or pulsed X-rays produce a **live** image instead of a still one, for guiding catheters and watching swallowed or injected contrast move. Because the dose is continuous, the receptor uses an **image intensifier** (or a flat-panel detector) to amplify a faint X-ray image into visible light for a camera and monitor. Dose to patient and staff is the main hazard; foot-switch time is logged.

## Computed tomography
A CT scanner rotates an X-ray tube and an arc of detectors around the patient, collecting a fan of transmission readings from every angle, and a computer reconstructs cross-sectional slices, which are stacked into three-dimensional images. Contrast agents may be injected or ingested. Dose is higher than plain radiography; the room is shielded.

## Magnetic resonance imaging
A superconducting magnet aligns the spin of hydrogen nuclei (and other atoms with nonzero spin such as carbon-13, sodium-23, phosphorus-31). Radio-frequency pulses knock them out of alignment; as they **realign** they emit radio signals that coils detect, and different tissues relax at different rates, giving contrast without ionizing radiation. Hazards are the magnet (always on; ferromagnetic objects become projectiles; **pacemakers** and many implants are contraindicated or conditional), RF heating, loud gradient noise, and the cryogen **quench**. Nothing enters zone IV unscreened.

## Positron emission tomography
A radioactive tracer such as **fluorine-18 fluorodeoxyglucose (FDG)** is injected; it emits positrons that meet electrons and annihilate, sending two **gamma** photons in opposite directions. Ring detectors time the pairs and reconstruct where the tracer concentrates. Because fast-growing tumors consume glucose, FDG lights up cancer. PET is usually combined with CT for anatomy.

## Where these sit on the exam
The CBET content areas emphasize ultrasound and the **safety** of radiation and MRI over the workings of the big machines (those are the domain of the radiology equipment specialist). Know the mechanism, the radiation type, and the hazard for each; do not expect repair questions.

> Exam tip: piezoelectric crystals make and read ultrasound; Doppler toward the probe means higher pitch; poor gel means a blurry image. X-rays come from electrons hitting a tungsten anode; bone is radiopaque and white. Fluoroscopy is live X-ray through an image intensifier. CT is rotating X-ray slices reconstructed by computer. MRI reads the realignment of atoms in a magnet; no ionizing radiation; pacemakers are the contraindication. PET detects gamma photons from positron annihilation of an FDG tracer.`,
      hook: "Ultrasound: piezoelectric, 2 to 15 MHz, Doppler toward = higher pitch, gel excludes air, cracked crystal or thin gel blurs. X-ray: tungsten filament to tungsten anode in vacuum; kV sets penetration; radiopaque white, radiolucent dark. Fluoroscopy: continuous X-ray, image intensifier, live. CT: rotating tube and detectors, computed slices, 3D. MRI: magnet aligns hydrogen, RF, realignment signal, no ionizing radiation, pacemaker contraindication, quench. PET: FDG tracer, positron annihilation, two gamma photons, cancer eats glucose."
    },
    {
      id: "u5l6", title: "Diagnostic and Laboratory Devices in Detail: Otoscopes, Ophthalmoscopes, Audiograms, Uroflow Meters, Tympanic Thermometers, Endoscopes, Blood Gas Electrodes, Spectrophotometers, Hematocrit Centrifuges, and Microtomes", domain: 4, obj: "Function", minutes: 12,
      body: `The exam names diagnostic and laboratory devices that the earlier lessons only touched or skipped. Each gets its parts, its principle, and its test.

## Otoscope
For the ear canal and eardrum. Parts: handle (line-powered or battery), head, **lamp** (halogen or LED), magnifying **lens**, disposable **specula** in several sizes, and often an **insufflation** port to puff air at the eardrum. Monocular handheld units are common; binocular units are head- or wall-mounted for hands-free use. A **lamp collar** holds the bulb; a missing collar lets the lamp fall out. No microphone.

## Ophthalmoscope
For the interior of the eye, the **fundus** (retina, optic disc, vessels). Handheld, usually battery powered, with a **lens disc** of many powers for focus, **filters** and apertures of different shapes and colors, a mirror, and a condensing lens. Lenses and mirrors are cleaned with lens wipes; alcohol discolors coatings.

## Audiometer
Presents pure tones at set frequencies and levels; the patient signals when a tone is heard; the result is an **audiogram** of threshold in dB against frequency in Hz. **Air conduction** through headphones tests the whole pathway; **bone conduction** through a vibrator on the mastoid bypasses the middle ear, so comparing the two separates **sensorineural** loss (inner ear or nerve) from **conductive** loss (outer or middle ear). The audiometer creates frequencies; it does not measure them. Some include an otoscope.

## Uroflow meter
Measures the rate and volume of urine as a patient voids, to evaluate bladder emptying and obstruction: a funnel, a collection beaker, and a **pressure or weight transducer** that computes flow over time (total volume, peak and average flow, time to empty). Many are wireless to a receiving station (the wireless station) in another room for privacy; the link works only within about **3 meters** and fails with distance, interference, or a low battery. Overheating and low battery block tests until resolved.

## Tympanic thermometer
Reads core temperature from **infrared** emitted by the eardrum, which shares blood supply with the brain, using a **thermopile** that produces voltage in proportion to incoming infrared. Disposable **probe covers** keep it clean; a torn cover or a dirty, cracked lens changes readings (a cracked lens focuses less infrared and reads low; a torn cover can read high). The device needs about **30 minutes** to settle after moving rooms and works only within its ambient temperature range (roughly **10 to 40 C**); seal the probe in the canal, aim at the drum, and trigger the shutter. Other core routes: electronic probes (oral, rectal), temporal artery scanners; glass mercury thermometers are not used on patients.

## Endoscopes
Flexible tubes with a distal camera or **fiber-optic** image bundle, a **light source** built to run cool, channels for **insufflation** (inert gas to open the cavity), irrigation, and **suction**, and controls that steer the tip. Rigid scopes serve laparoscopy and arthroscopy. Video is displayed and recorded. Reprocessing is high-level disinfection at minimum; leak testing before immersion is essential.

## Blood gas analyzers
Measure **pO2, pCO2, and pH** with three electrodes. Oxygen: the **Clark** electrode, a platinum cathode and silver anode behind an oxygen-permeable membrane; the current is proportional to pO2. pH: a **glass electrode** measuring the potential between a reference solution and the sample. CO2: the **Severinghaus** electrode, a glass pH electrode behind a CO2-permeable membrane in a bicarbonate solution; CO2 crossing the membrane changes the pH, which the electrode reads. The analyzer needs the sample chamber warm (it refuses to run below its temperature window; a bad **thermistor** mimics this), a charged battery for portable units, and a clean **barcode** window to read sample and cartridge codes.

## Spectrophotometer
Identifies and quantifies a sample by how much light it **absorbs** at each wavelength. A tungsten (visible) or **deuterium** (ultraviolet) lamp shines through a prism or grating that selects a narrow wavelength, through a **cuvette** holding the sample, onto a detector. A **blank** cuvette of the solvent is read first so the cuvette and solvent are subtracted. Ultraviolet work needs **quartz** cuvettes, because glass and plastic absorb UV. Faults: a dead lamp (check the cable and circuit, then replace), weak light (lamp or mirror alignment, motor), low readings after the blank (an obstruction in the chamber or the wrong cuvette), intermittent operation at all wavelengths (the power cable).

## Centrifuges and hematocrit
Separation depends on **relative centrifugal force**, which rises with speed and rotor radius; the **hematocrit centrifuge** spins capillary tubes at roughly **10,000 to 15,000 g** for a few minutes to pack the red cells so the red-cell fraction can be read against a scale. Load symmetrically; a thermostat protects samples from heat.

## Microtomes, cryostats, water baths
A **microtome** cuts sections a few micrometers thick from tissue embedded in **paraffin** wax, with a rotary head against a fixed blade; a cryostat is a refrigerated microtome for frozen sections. Section quality depends on a firmly clamped sharp blade, the blade **clearance angle**, a chilled block, a steady slow stroke, and no wax on the blade. A **water bath** warms samples gently below 100 C, sometimes with stirring, and is used to incubate microbial cultures at growth temperature; an autoclave is for sterilizing, a cryostat for freezing.

> Exam tip: an otoscope has a lamp, lens, specula, and insufflator, no microphone; the ophthalmoscope views the fundus. An audiometer measures thresholds, not frequencies; air versus bone conduction separates sensorineural from conductive loss. A uroflow meter measures bladder emptying rate; wireless range about 3 m. Tympanic thermometers use a thermopile and infrared; cracked lens reads low; 30 minutes to settle. Endoscopes: fiber-optic, light, insufflation, suction. Clark for O2, glass for pH, Severinghaus for CO2. Spectrophotometers measure absorbance against a blank; quartz cuvettes for UV. Hematocrit centrifuges run around 10,000 g. Microtomes section paraffin blocks; water baths incubate.`,
      hook: "Otoscope: lamp, lens, specula, insufflation, lamp collar. Ophthalmoscope: fundus, lens disc, filters. Audiometer: audiogram dB versus Hz, air versus bone conduction, sensorineural versus conductive; makes tones, does not measure them. Uroflow: flow and volume of voiding, wireless within 3 m. Tympanic: infrared, thermopile, probe covers, 30 minutes, 10 to 40 C, cracked lens reads low. Endoscope: fiber-optic, cool light, insufflation, suction. Blood gas: Clark O2, glass pH, Severinghaus CO2; thermistor, battery, barcode window. Spectrophotometer: absorbance, blank, deuterium for UV, quartz cuvettes. Hematocrit centrifuge about 10,000 g. Microtome: paraffin, blade clamp, clearance angle. Water bath incubates under 100 C."
    },
    {
      id: "u5l7", title: "Infusion and Therapeutic Devices in Detail: Nutrition Pumps, Syringe and PCA Settings, Infusion Modes, Infant Warmers, Ultrasound Therapy, Hypo/Hyperthermia Units, Aspirators, SCDs, and Bilirubin Lights", domain: 4, obj: "Function", minutes: 11,
      body: `Second-level facts about the pumps and therapeutic devices: which mechanism each uses, which settings prevent harm, and the numbers the exam quotes.

## Feeding pumps: parenteral versus enteral
**Parenteral** nutrition (TPN) goes into a vein through an ordinary infusion pump with tight flow and volume controls. **Enteral** feeding goes into the stomach or intestine; because formula is thick, enteral pumps use **rotary peristaltic** heads on wider tubing, and their sets end in enteral-only connectors. Enteral alarms: **low flow** (empty bag, kinked or clamped tubing, a drip chamber seated wrong or coated with formula so the drop detector cannot see), **no set detected** (wrong set, poor seating, or bright ambient light on the optical detector).

## Syringe pumps
A lead screw depresses the plunger of a standard syringe, giving precise small volumes of potent drugs. Because the pump computes volume from plunger travel, it must know the **syringe diameter**; the wrong brand or size setting delivers the wrong dose. Limits: small volume (not for long-term high-volume therapy), start-up delay, siphoning. A pump that keeps running after the syringe is empty has a faulty sensor, a wrong size setting, or a multi-phase program still running; low voltage stalls a pump rather than overrunning it.

## PCA pumps, the settings
The patient presses a pendant for a **bolus**; the clinician sets the bolus size, a **lockout interval** (minimum time between doses), a **maximum dose** per hour or four hours, and an optional background infusion; the pump logs every request and delivery and is locked against tampering. The benefit is patient control within safe limits. A pump that delivers the basal rate but ignores requests: check the **settings** (lockout or maximum reached) before the pendant or motor; a "check settings" message with a locked door means setup was not completed.

## Infusion modes
**Continuous infusion**: a steady rate. **Intermittent**: programmed periods of high rate separated by low-rate (keep-open) periods, for drugs that irritate veins or need spacing. **Bolus**: a single volume over a short time. **Secondary** (piggyback): a second bag runs, then the primary resumes. **Pressure infusers** squeeze a bag from outside for rapid volume; they are not pumps.

## Infant warmers
Two designs. The **radiant warmer** is an open bed with an overhead heater, easy access for procedures, controlled from a **skin sensor** (heat sensor) on the baby; its drawbacks are drafts cooling the infant and increased **dehydration** from radiant heat, so skin temperature must be monitored. The **incubator** encloses the infant to control air temperature, humidity, and oxygen, for babies who need less handling. Faults: fluctuating or wrong skin temperature is almost always the sensor attached poorly, unplugged, or failed; a blocked path between heater and infant; power faults trace to the cord, fuse, and circuitry.

## Ultrasound therapy
A 1 to 3 MHz transducer delivers vibration that is absorbed as **deep heat** in muscle and connective tissue, improving blood flow and easing pain; focused high-intensity units treat tumors. Requires gel and constant motion of the head. Faults: no head detected (head too cold to sense, or poorly connected; warm it in the hand), overheating shutdown (too little gel or poor technique), slow warming (insufficient drive voltage; a cracked crystal or disconnected head would not work at all).

## Hypo/hyperthermia units
Wheeled units that heat or cool water and pump it through a blanket with sealed channels, regulating patient temperature automatically from a probe. Heating needs adequate **flow** (about **1 liter per minute** or more), correct limit settings, and a working heating element with the right resistance; a unit that neither heats nor cools well with no leaks usually has insufficient flow. Displays that stay dark are power and connections; a dead water pump is the pump or its board.

## Aspirators
A **vacuum pump**, a pressure gauge or regulator, tubing, a **collection container** with an overflow float, and a **hydrophobic bacterial filter** that protects the pump. Pulmonary (airway) aspirators clear mucus; gastric aspirators empty the stomach; surgical units remove blood, fluid, and smoke. Faults: pump will not run (fuse, or overheated from running against an obstruction; let it cool, or the pump has failed); runs with weak suction (loose tubing, cracked collection chamber, cracked vacuum line, clogged filter); runs with no suction (disconnected lines, a fully clogged filter, or a **full container** closing the float). Suction that fades gradually is a leak or filter, never a fuse.

## Sequential compression devices
An air pump inflates a multi-chamber sleeve from the **distal** end (ankle) to the **proximal** end (thigh), holds a few seconds, then deflates for about a minute; the wave pushes venous blood toward the torso as walking muscles would. Reversed order would push blood toward the foot. Faults: low pressure is a leak in sleeve, tubing, or the unit's internal tubing; high pressure is a misfit sleeve fitted too tightly; a valve feedback error is an electrical fault in the solenoids or wiring.

## Bilirubin lights
Phototherapy breaks down bilirubin in a newborn's skin. Bilirubin absorbs light from roughly **360 to 520 nm**; the blue-green region around 450 to 510 nm is the most effective, which is why the lamps look blue. Effectiveness rises with brighter output, a closer lamp, and more skin exposed; a red or infrared bulb (630 to 720 nm) does nothing. Often used over an incubator or warmer to hold temperature. Faults: bulb will not relight after a restart (bulb too hot; let it cool), bulb never lights (bulb, then **ballast**), dim output (dirty lens, then bulb or ballast), lights then quits with an overheat indication (clogged **fan filter**, stopped fans, or a bad thermistor).

> Exam tip: enteral pumps are peristaltic; a low-flow error comes from an empty bag, occlusion, or a badly seated drip chamber, not from ambient light (that gives "no set"). Syringe pumps need the syringe diameter. PCA settings: bolus, lockout, maximum; check settings first. Intermittent infusion alternates high and low rates. Radiant warmers dehydrate and need a skin sensor. Ultrasound therapy makes deep heat. Hypo/hyperthermia needs about 1 L/min flow. Aspirator suction fading is a leak or filter. SCDs inflate distal to proximal. Bilirubin lights are blue, 360 to 520 nm.`,
      hook: "TPN by vein through a standard pump; enteral by rotary peristaltic on wide tubing; low flow = empty, occlusion, drip chamber; no set = seating or bright light. Syringe pump needs the diameter; overrun = sensor, setting, or multi-phase. PCA: bolus, lockout, max dose, log, locked; settings first. Continuous, intermittent, bolus, secondary. Radiant warmer open with skin sensor, dehydrates; incubator enclosed. Ultrasound therapy deep heat; cold head not sensed; low voltage warms slowly. Hypo/hyperthermia flow at least 1 L/min. Aspirator: vacuum pump, gauge, container float, hydrophobic filter; fading suction is a leak or filter. SCD distal to proximal. Bilirubin 360 to 520 nm, blue-green best; bulb, ballast, fan filter."
    }
  ]);

  add("u6", [
    {
      id: "u6l5", title: "Heart-Lung Machines, Hemodialysis Circuits, Pacing Routes, the Anesthesia Gas Path, ESU Waveforms, Surgical Lasers, and Sterilization Methods", domain: 4, obj: "Function", minutes: 12,
      body: `The last group of life-support and operating room facts the exam draws from, at the level of circuit diagrams and named parts.

## The heart-lung machine
Cardiopulmonary bypass takes over the heart and lungs during open-heart surgery. Blood drains from the venous side to a reservoir, a **pump** moves it (a **roller pump**, which is peristaltic, or a **centrifugal pump**, both chosen to damage as few blood cells as possible), an **oxygenator** adds oxygen and removes CO2 (modern **membrane oxygenators** exchange gas across a semipermeable membrane; older bubble oxygenators bubbled gas directly through blood), a heat exchanger cools the blood to induce protective **hypothermia** and rewarms it at the end, filters catch clots and air, and the blood returns to the arterial side. **Heparin** thins the blood so it does not clot in the circuit (it is reversed afterward); **cardioplegia** solution stops the heart so the surgeon can work. Backup pumps and hand cranks exist because pump failure stops circulation.

## The hemodialysis circuit, in order
Blood leaves the patient's access, passes an arterial pressure monitor, the **blood pump** (peristaltic), a **heparin** pump that adds anticoagulant before filtration, the **dialyzer** (blood on one side of a semipermeable membrane, **dialysate** flowing the opposite direction, **countercurrent**, on the other, so wastes and excess water diffuse out), a venous pressure monitor, and finally an **air trap and detector** that stops the pump if bubbles are found, then returns to the patient. The machine also proportions, warms, and deaerates dialysate, controls fluid removal, and alarms on pressure, conductivity, temperature, blood leaks, and air. Water treatment (reverse osmosis) feeding the machine is its own discipline.

## External pacing routes
**Transcutaneous** pacing uses large adhesive pads and conductive gel on the chest; it needs higher output (tens of milliamps) to reach the heart through skin and muscle and is uncomfortable but fast. **Transvenous** pacing threads a lead through a vein (often the subclavian) into the right ventricle, needing far less current. **Epicardial** pacing uses wires sewn to the heart's surface at surgery and brought out through the chest; it needs no subclavian leads. External pulse generators adjust rate and output and can run on AC or battery because they are temporary.

## The anesthesia gas path
Gas supply (pipeline at about 50 psi, cylinders as backup) feeds the **flow controls** and flowmeters for oxygen, air, and nitrous oxide. Downstream of the flow control, part of the fresh gas passes through the **vaporizer**, which adds a set concentration of liquid agent, and rejoins the rest at the **common gas outlet**; the mixture enters the breathing circuit, where the patient's exhaled CO2 is removed by soda lime so gas can be rebreathed, and the **ventilator** or bag moves it. In order from supply to patient: gas supply, flow controls, vaporizer, common gas outlet, breathing circuit and absorber, ventilator, patient. The hypoxic guard, scavenging, and the pre-use checklist round it out.

## ESU waveforms and modes
A **continuous** sine waveform at full duty cycle makes a sharp, hot spark that vaporizes cells: **cut**. A **pulsed** or damped waveform with a low duty cycle and higher peak voltage makes a broad spark that dries and seals: **coagulation**. Mixed duty cycles give **blend**. **Monopolar** mode, with current from the pencil through the patient to the return pad, is the mode used for cutting; **bipolar** passes current only between forceps tips, for delicate work and near implants. A generator that powers up but gives no output usually has a blown **high-voltage** supply fuse; a blown low-voltage fuse would keep it from turning on at all.

## Surgical lasers
A laser excites a gas or crystal to emit a single wavelength; the wavelength decides which tissue absorbs it. **CO2** (carbon dioxide) lasers emit far infrared strongly absorbed by water, so they cut and vaporize soft tissue and skin surfaces with little penetration. **Nd:YAG** lasers emit near infrared that penetrates deeper, used for coagulation, hair, and tattoo removal. **Argon** lasers emit visible blue-green absorbed by hemoglobin and pigment, for eye and vascular work. **Excimer** lasers emit ultraviolet for corneal reshaping. CO2 beams are invisible, so a visible **aiming beam** shows the target; both travel down an **articulated arm** of mirrors that must stay aligned. Faults: aiming beam on but no treatment beam (footswitch, then the laser itself), neither beam (arm misaligned or laser fault), beams misaligned (arm or internal alignment); the manufacturer services the laser cavity.

## Sterilization methods compared
- **Steam** (autoclave): the common method; a chamber pumped free of air and filled with pressurized steam; fastest; not for heat- or moisture-sensitive items; **dry heat** for items that cannot be wet.
- **Gas** (ethylene oxide): for heat- and moisture-sensitive devices; long cycles (around ten hours plus aeration); effectiveness depends on time, temperature, humidity, and concentration.
- **Liquid chemical**: toxic solutions that reach small, enclosed spaces steam and gas miss; requires thorough rinsing.
- **Ionizing radiation** (gamma or beta): for disposable items sterilized in sealed packages by the manufacturer before they reach the hospital; breaks microbial DNA.
Autoclave faults: no steam means water pump, low water pressure or flow, a tripped breaker, or a burned-out heater (a leaky steam valve affects pressure, not steam production); over-pressurizing means a bad or shorted pressure switch.

## Blood warmers
Warm cold bank blood to body temperature for rapid transfusion so the patient does not become hypothermic. Coaxial tubing carries blood inside and warm water outside in opposite directions; alarms guard high and low temperature. **Pressurized-flow** warmers add a compressor and pressure chamber to push blood faster; a loud compressor means tubing not seated or a failing compressor; frequent over-temperature means blocked vents. Not for warming lab samples or infants.

> Exam tip: heart-lung machine: roller or centrifugal pump, membrane oxygenator, heat exchanger for hypothermia, heparin, cardioplegia. Dialysis order: blood pump, heparin, dialyzer with countercurrent dialysate, air trap last. Transcutaneous, transvenous, epicardial pacing. Gas supply, flow controls, vaporizer, common gas outlet, circuit, ventilator. Cut is continuous full duty cycle monopolar; coag is pulsed. CO2 laser for skin and soft tissue; Nd:YAG deep; argon pigment; excimer UV. Liquid sterilization reaches small openings; radiation is for disposables; no steam means pump, pressure, breaker, or heater.`,
      hook: "Bypass: venous reservoir, roller or centrifugal pump, membrane oxygenator, heat exchanger (hypothermia), filters, arterial return; heparin, cardioplegia, backup pump. Dialysis: blood pump, heparin pump, dialyzer with countercurrent dialysate, venous monitor, air trap last. Pacing: transcutaneous (pads, gel, high mA), transvenous (subclavian lead), epicardial (surface wires). Anesthesia path: supply, flow controls, vaporizer, common gas outlet, circuit and absorber, ventilator. ESU: continuous 100% duty = cut (monopolar), pulsed = coag; HV fuse = no output. Lasers: CO2 skin and soft tissue, Nd:YAG deep, argon pigment, excimer UV; aiming beam, articulated arm. Sterilize: steam, dry heat, EtO gas about 10 h, liquid for small openings, gamma or beta for disposables; no steam = pump, pressure, breaker, heater. Blood warmer: countercurrent water, compressor in pressurized units."
    }
  ]);

  add("u7", [
    {
      id: "u7l6", title: "Power Supply Faults, Criticality, Root Cause Analysis, and Local Versus Network Problems", domain: 5, obj: "Problem solving", minutes: 10,
      body: `Four problem-solving skills the exam tests by name: reading a power supply, ranking work by criticality, running a root cause analysis, and telling a local fault from a network one.

## Testing a power supply's regulation
When a device misbehaves or will not run, check the **voltage regulator**: with a multimeter from ground, measure the regulator's **input pin** (is it receiving voltage?) and **output pin** (is it supplying the rated voltage?). Low or missing output with good input means the regulator, or a shorted load pulling it down. Under warranty, send it in; otherwise replace the regulator with the same part number, or troubleshoot the discrete regulator circuit. The first check on any "switched to battery while plugged in" complaint is the **power cable** (continuity with a meter or cable tester) and the outlet, then the device's internal power circuit and board. A **switching supply** that outputs only its full input voltage has a **shorted** switching element; one that outputs nothing has the element stuck **open**. Desktop computer supplies fail most often from **fan failure and overheating**.

## UPS fault patterns
- Runs normally but backup lasts too briefly: the battery is undercharged or has lost capacity; charge it, test its output voltage, and replace the battery or the charging circuit.
- No backup power at all: suspect the **inverter** downstream of the battery.
- Switched to backup while plugged into a live wall: the fault is the outlet or the cable, not the UPS; check outlet voltage and cable continuity.

## Criticality and priority
**Criticality** is a score that combines the device's **importance** to the organization's mission (what stops if it fails), the **likelihood of failure** or its required maintenance frequency, and the **potential harm** if it fails. It drives the order of work orders, inspections, and scheduled maintenance: a high-criticality device's PM outranks a routine inspection of a device that has spares. The **value of a device's function** is judged by the department: a failed imaging unit stops radiology, while a failed cuff does not. **Redundancy** (backup units, easy replacement) lowers a device's risk and its priority, but it does not prevent all downtime, because simultaneous failures happen and redundancy costs money. **Maintenance checklists** guide daily and weekly user inspections and record biomed PMs across many devices; manufacturer-known failure modes set their contents. The time a repair takes is **not** a component of criticality.

## Root cause analysis
RCA asks what happened, why it happened, and how to prevent it from happening again, then keeps asking **why** of each answer (the **five whys**) until it reaches the underlying cause instead of the symptom. It is not about cost or blame; it is about the fix that stops recurrence. Worked cases the exam uses:
- A newly inspected handheld ultrasound gives blurry, noisy images: check the piezoelectric crystal's integrity and continuity (a failed voltage regulator can overdrive and crack it); if intact, the cause is too little **gel**, which is **use error**; instruct users.
- Fingertip pulse oximeters read erratically: **ambient light** leaking into the sensor from hasty placement or a bright room; remind staff about placement.
- One sphygmomanometer reads wrong but the others do not: watch staff use it to rule out technique; then inspect for **cracked tubing or bulb**, a slow leak that lowers readings. Look at the obvious first; a single fault is more likely than two.
- Use error versus device error: a misconfigured pump overdose is use error; blurry images from a good unit are use error; dust overheating a centrifuge is a maintenance lapse; a leaking cuff, a blackened spectrophotometer bulb, or a syringe pump that no longer detects syringes are device faults.

## Local versus network problems
- A nurse station is not receiving data from monitors: check whether **other devices** on the same department network have the same problem; the repair history in the CMMS shows whether it has happened before. Two or more monitors failing means a shared default configuration or a network communication fault; data missing from a single room means that room's equipment.
- Multiple bedside monitors give false alarms: look at the **time frame** and check the **alarm threshold** configuration; if normal values cross the set limits, it is an incorrect default setup or procedure, a localized configuration issue.
- Messages will not send from a nurses' station: check the **physical connections** first, continuity of the wired links and strength of the wireless link, before suspecting servers.
- To decide whether a recurring monitoring fault is localized or systemic, check the **repair records** for the same device type; a pattern across the fleet is systemic. Tools for the distinction are ping, cable testers and tracers, and a multimeter for continuity; an electrical safety analyzer tests leakage, which is never a network question.

> Exam tip: check the cable and outlet before opening a device that went to battery. Regulator: measure input and output pins against ground. Shorted switching element outputs full input voltage. Criticality = importance plus failure likelihood plus harm, not repair time. RCA keeps asking why. Blurry ultrasound and noisy fingertip oximeters are usually gel and ambient light. One bad monitor is local; several with the same fault is configuration or network; check records for patterns.`,
      hook: "Regulator: input pin, output pin, against ground; replace by part number. Cable first for the battery-switch complaint. Switching element shorted = full input; open = zero. Desktop PSU dies of heat. UPS: short runtime = battery; no backup = inverter; switched while plugged in = outlet or cable. Criticality = importance + failure likelihood + harm; redundancy lowers priority; checklists guide inspections; repair time is not criticality. RCA: what, why, prevent; five whys. Ultrasound blurry = crystal then gel; oximeter = ambient light; one sphygmomanometer = technique then cracks. One room local; several the same = config or network; check records."
    }
  ]);

  add("u8", [
    {
      id: "u8l6", title: "Fault Tables: Monitoring, Laboratory, Diagnostic, Infusion, Therapeutic, and Operating Room Equipment", domain: 5, obj: "Problem solving", minutes: 13,
      body: `Symptom, most likely cause, corrective action, by device. The exam asks these as "the device is reported to do X; what do you check?" Learn the pairs.

## Monitoring
- **EtCO2 reads nothing**: the cannula or tubing is disconnected or leaking (reconnect, check for leaks); the filter is missing or misinserted; the **moisture trap** is faulty (occlusion test, reinstall); an **internal leak** (occlude the port upstream of the filter and trap and test). **Occlusion alarm**: kinked or blocked tubing or cannula; a clogged filter or full moisture trap (replace the filter, then the trap).
- **ECG monitor**: blank screen but powers on, display and cables not connected (reconnect); no tones, speaker off or unplugged; no pulse or heart rate displayed, the analog output is faulty (system board); analog output out of sync, the input circuit (test sync with a defibrillator and simulator); liquid dripping from an LCD, a cracked display (replace).
- **EEG noise and artifacts**: bad leads or poorly prepped electrodes first; then electrical interference from nearby devices or power cables (clearance).
- **Sphygmomanometer**: gauge will not return to zero, recalibrate with the zeroing screw; unstable, patient movement or cuff placement (level with the heart); reads high, cuff below the heart or patient not at rest; reads low, cuff above the heart or, most often, an **air leak** in cuff, tubing, or bulb.
- **Invasive pressure transducer**: will not zero, an improperly connected or primed line, closed clamp, clot, or bubble, then a bad transducer; false high or low, transducer height (level with the heart), then zero it, then a bent or blocked cannula.
- **Fingertip pulse oximeter**: no SpO2, placement or truly low saturation; unstable, finger not deep enough or motion; will not turn on, battery low, reversed, or a damaged unit; shuts off during use, no signal or **low battery**.
- **Fetal monitor**: will not power, loose cable, blown fuse, low battery; noisy, volume high or EM interference; inconsistent fetal rate, transducer placement, loose belt, movement, wrong amount of gel; direct ECG absent, faulty electrode or cable.
- **Respiration monitor**: will not power, outlet, cord, or a board; noisy trace, electrode placement and lead connection, then electrodes, leads, cable, or the **input board**; no rate but a short or flat waveform, raise the **sensitivity**, then check the same chain. Rate missing while ECG and SpO2 work points to the input board, not the SpO2 probe or a disconnected monitor.

## Laboratory
- **Centrifuge**: display dark, power cable, fuse, outlet; stops mid-run, power connections; rotor will not spin, the **lid** not closed firmly (interlock), then internal connections, board, or motor.
- **Water bath**: no display, power and switch; not heating, setpoint or upper limit below the current temperature, or the low-water sensor (fill it); heating weakly, cable, low line voltage, or a lid not closed.
- **Blood gas analyzer**: refuses to run, "temperature too low," let it warm at room temperature (10 to 32 C), then check the **thermistor** resistance; will not run on battery, recharge, then the charging circuit and battery; barcode scanner dead, clean or replace the scratched **window**. "It doesn't work" with no detail: check cable and outlet voltage first.
- **Cryostat**: frosting, drafts, an open chamber, or the user's breath (close it, wear a mask); sections splinter, temperature set too low (raise it); squashed sections with a new blade and correct settings, a faulty thermistor, intermittent refrigeration, or chamber cracks, not slow cutting.
- **Microtome**: sections thick or thin, blade not clamped, a dull blade (move to a fresh edge or replace), or too small a **clearance angle** (increase stepwise); sections compressed, dull blade, block too warm (chill), cutting too fast, or **wax** on the blade. Warranty may require manufacturer repair.
- **Spectrophotometer**: lamp dead, check circuitry and cable then replace; weak light, lamp position, mirror, motor; low readings after the blank, an obstruction or a non-quartz cuvette for UV; intermittent at all wavelengths, the power cable.

## Diagnostic
- **Otoscope**: shadows, a faulty lamp filament or a bent head; dim, blown or wrong lamp, worn fibers, dirty tip or lens; loose illuminator, worn parts or missing screws; lamp falls out, the **lamp collar**. A loose head cuts light off entirely, it does not dim it.
- **Ophthalmoscope**: obstructed view, scratched lens disc, discolored or smudged filter, bent mirror hood; glare, dirty or scratched mirror, filter, or lens (clean or replace); shadows, a loose or tilted condensing lens, dirty lamp, loose objective; cannot focus, lens discolored by alcohol cleaning, loose objective.
- **Audiometer**: will not turn on, battery (leave on the charger, swap), then the board; chronically low battery, the power jack or the charging stand.
- **Uroflow meter**: not communicating, too far (about 3 m), EM interference, or uncharged; battery too low, charge; will not run, overheated, let it cool.
- **Tympanic thermometer**: reads high, torn probe cover; reads low, an obstruction in cover, tip, or ear canal, or a cracked lens; "ambient changing," rest 30 minutes; ambient out of range (about 10 to 40 C), relocate and rest.

## Infusion
- **Enteral feeding pump**: low flow error, empty container, occluded or clamped tubing, drip chamber seated wrong or coated with formula (reseat, move, or replace); no feeding bag detected, wrong set or seating, or **bright light** on the detector (move it).
- **Syringe pump**: motor not running, sensor or motor fault (check articulation and circuits); no syringe detected, sensor wiring.
- **PCA pump**: low battery, replace or plug in; high pressure, kinks, clamps, obstructions; "check settings," the door was locked before setup finished.

## Therapeutic
- **Infant warmer**: fluctuating skin temperature, reattach the sensor, clear the heater path; wrong temperature, sensor attachment, plug, or a failed sensor; power failure, cord, fuse, wiring, circuit.
- **Ultrasound therapy**: dark display, the AC adapter; no head detected, head too cold or poorly connected; overheating shutdown, too little gel or bad technique (cool down, retrain).
- **Hypo/hyperthermia**: display dark, connections and control panel; pump dead, board voltages then pump; no heat transfer, heating element resistance; will not warm, flow under 1 L/min, wrong limits, or no power to the element.
- **Aspirator**: pump will not run, fuse, overheated from an obstruction, or a dead pump; low suction, loose tubing, container cap, cracked vacuum line, clogged **hydrophobic filter**; no suction, disconnected lines, a blocked filter, or a full container.
- **SCD**: low battery, plug in; low pressure, leaks in sleeve, tubing, or internal tubing; high pressure, sleeve too tight; valve feedback error, wiring and solenoids.
- **Bilirubin light**: will not relight, bulb too hot; never lights, bulb then **ballast**; dim, lens then bulb or ballast; quits with overheating, fan filter, fans, thermistor.
- **Defibrillator**: will not power, battery (known good and charged), connectors, power board; controls unresponsive, keyboard, then system board; will not discharge in test, setup, paddles, cable, therapy connector cable; discharges out of spec, calibrate with simulator and analyzer. An AED that **undercharges** has a control board misjudging patient impedance; a weak battery gives an error instead.

## Operating room
- **ESU**: will not turn on, cord, outlet, fuse, internal connections, then the control board connectors, power supply, or RF board; footswitch dead, footswitch board then control board; display dead, cable then control board then display board; on but no output, the **high-voltage fuse**.
- **CO2 laser**: aiming beam only, footswitch then the laser system; neither beam, articulated arm alignment or the laser; beams misaligned, arm or internal alignment.
- **Tourniquet**: low battery, recharge; pump runs constantly, a **leak** in tubing, cuff, or valves, or a bad pressure transducer; no pressure reading, the transducer; valve failure, valve drivers or power to the valves. A disconnected pump means no inflation; an occluded deflation valve means no deflation.
- **Sterilizer**: panel dark, fuse, breaker, or power switch; no steam, water pump, low fluid pressure, overloaded circuit or breaker, burned-out heater, low water; pressurizes past the setpoint, the pressure switch or shorted contacts.
- **Blood warmer**: display dark, plug and fuse; loud compressor, tubing not seated or a failing compressor; frequent over-temperature, blocked air vents.

> Exam tip: EtCO2 internal leak is tested by occluding upstream of the filter and trap. Sphygmomanometer leaks read low. A missing respiration rate with working ECG is the input board. A centrifuge that will not spin has its lid open. Blood gas analyzer "too cold" is the thermistor. Microtome thickness is the blade clamp, edge, and clearance angle. Enteral "no set" is bright light; "low flow" is bag, occlusion, or drip chamber. PCA ignoring requests: settings first. Aspirator fading suction: leak or filter. ESU no output: high-voltage fuse. Tourniquet pump running constantly: a leak. No steam: pump, pressure, breaker, heater.`,
      hook: "EtCO2: cannula, filter, moisture trap, internal leak (occlude upstream); occlusion = kink, filter, trap. ECG blank screen = cables; no rate = system board; sync = input circuit. Sphyg leak reads low; zero screw. IBP won't zero = line, clamps, clots; false = height, zero, cannula. Oximeter shuts off = battery. Respiration missing with ECG fine = input board; flat trace = sensitivity. Centrifuge won't spin = lid. Bath not heating = setpoint or low water. Blood gas cold = thermistor; barcode = window. Cryostat frost = drafts; splinter = too cold. Microtome = clamp, edge, clearance angle, wax. Spectro low after blank = obstruction or non-quartz. Otoscope lamp falls = collar. Uroflow = 3 m. Tympanic high = torn cover, low = obstruction or cracked lens. Enteral low flow = bag, occlusion, chamber; no set = light. PCA = settings. Warmer = sensor. Ultrasound head cold. Hypo/hyper flow 1 L/min. Aspirator fade = leak or filter; none = disconnected, blocked, full. SCD high = tight sleeve. Bili = bulb, ballast, fan filter. AED undercharge = control board. ESU no output = HV fuse. Laser aiming only = footswitch. Tourniquet runs = leak. No steam = pump, pressure, breaker, heater. Warmer noise = compressor."
    }
  ]);

  add("u9", [
    {
      id: "u9l7", title: "Healthcare IT Law and Standards: HITECH, HIPAA Titles, DMCA, FDA Data Systems, IEC 80001, and MDS2", domain: 6, obj: "Healthcare IT", minutes: 10,
      body: `The healthcare IT domain includes the laws and standards that govern devices on networks. The exam asks what each one does, and what it does not.

## HITECH Act (2009)
Part of the American Recovery and Reinvestment Act. It pays **incentives** to Medicare providers who adopt certified electronic health records and demonstrate **meaningful use**, and it **penalizes** those who do not (reduced Medicare payments, with hardship exemptions such as rural practices). Its security provisions: **breach notification** to affected individuals and to Health and Human Services, business partners held to the security rules with penalties, restrictions on selling or marketing personal health information, patient access to their electronic records, and disclosure accounting. It also funds training, research, and grants for health IT. It does not dictate how much hospitals spend.

## HIPAA (1996), title by title
- **Title I**: health insurance access, portability, and renewal when changing plans; limits preexisting-condition exclusions; no discrimination on health status.
- **Title II**: the part that governs healthcare operations: fraud and abuse controls, **Administrative Simplification** (standard electronic transactions and identifiers, the **privacy rule** and **security rule**, which set most of the rules the industry follows), medical liability reform. Fines and violations fall under Title II.
- **Title III**: medical savings accounts and tax rules.
- **Title IV**: enforcement, delegated to the **Office for Civil Rights**.
- **Title V**: revenue offset provisions.
Administrative Simplification standardizes patient and financial data and electronic data interchange, cutting paperwork and cost, and requires confidentiality for fax, phone, and internet communications alike.

## DMCA (1998)
The Digital Millennium Copyright Act makes it illegal to make or distribute technology that **circumvents** access controls on copyrighted works, raises penalties for infringement, and limits service providers' liability for users' actions. It has two parts (the WIPO treaties implementation and the online infringement liability limitation). It does not ban copying devices as such, and it carves out exemptions, including circumventing protections for **security testing** and for a patient's access to data from a personal **medical implant**.

## FDA regulation of medical device data systems
An **MDDS** is hardware or software that only **stores, transfers, reformats, or displays** medical device data without controlling or altering the device. In 2011 the FDA reclassified MDDS from **Class III** (high risk) to **Class I** (low risk), and later stepped back from active regulation of them. A vital signs monitor's data feed and a data-display system are MDDS; a lobby television, a power cable, or a waiting-room tracking board are not.

## IEC 80001
IEC 80001-1 (2010, jointly with ISO) is the international standard for **risk management of IT networks that incorporate medical devices**. It uses the FDA-style definition of a medical device (any instrument or software intended for diagnosis or treatment that does not act chemically; drugs are excluded), applies to any organization's network that connects medical devices, including home care under provider supervision, and assigns responsibility for risk management across the network's life. It does **not** define acceptable risk levels; each nation and organization sets those. It was not published by the FDA.

## MDS2
The **Manufacturer Disclosure Statement for Medical Device Security** is a standardized form manufacturers complete to describe a device's security capabilities for buyers: what data it holds and transmits, automatic logoff, audit controls, authorization and user authentication, configurable security, security updates, de-identification, backup and recovery, **emergency access** (break-glass), data integrity and authentication, malware detection and resistance, node authentication, physical locks, plans for third-party components, security guidance, storage and transmission confidentiality and integrity, and remote access and servicing. Structural integrity of the hardware is not a security item and is not on the form. Pair it with the **SBOM** when assessing a networked device.

## Who covers what, in one line each
Ground continuity and leakage limits: IEC 60601 and NFPA 99, not HL7. Adverse event reporting: the SMDA and FDA medical device reporting. Breach reporting: HIPAA and HITECH. Image handling: DICOM. Message formats: HL7. Equipment management: AAMI EQ standards. Networks with devices: IEC 80001. Device security disclosure: MDS2.

> Exam tip: HITECH incentivizes and penalizes EHR adoption and defines meaningful use; it does not set spending guidelines. HIPAA Title II holds the privacy and security rules and the fines; Title I is insurance portability. DMCA prohibits circumventing protections, with exemptions for security testing and implant data. MDDS moved from Class III to Class I in 2011. IEC 80001 manages risk on networks with medical devices but sets no acceptable risk level. MDS2 lists security features, including break-glass; not structural integrity.`,
      hook: "HITECH 2009: EHR incentives and penalties, meaningful use, breach notification, business associates, no sale of PHI, patient access; no spending rules. HIPAA: I portability, II administrative simplification, privacy and security rules, fraud, fines; III savings accounts; IV enforcement by OCR; V revenue. DMCA 1998: no circumvention tools, higher penalties, provider liability limits; exemptions for security testing and implant data. MDDS: store, transfer, reformat, display; Class III to Class I in 2011. IEC 80001-1 2010: risk management for networks with medical devices, no risk levels defined, not FDA. MDS2: security features including automatic logoff, audit, authentication, updates, backup, emergency access, malware, remote service; not structural integrity."
    },
    {
      id: "u9l8", title: "Network Concepts and Tools: OSI Layers, Topologies, Binary Subnet Masks, Hubs Versus Switches, PPP, Cable Testers, TDRs, Ping and ICMP, Fiber Inspection, and the Clinical Information Systems", domain: 6, obj: "Healthcare IT", minutes: 12,
      body: `The networking vocabulary the exam expects beyond addresses and ping: the seven layers by name, the shapes networks take, masks in binary, why a switch beats a hub, and which information system does what.

## The OSI model, all seven
1. **Physical**: the medium and its signals: copper, fiber, radio, and hubs.
2. **Data link**: frames and the **MAC address** (48-bit, hexadecimal) on the network interface; switches and bridges.
3. **Network**: **IP** logical addressing and routing; packets; routers.
4. **Transport**: assembling and ordering data, TCP and UDP, ports.
5. **Session**: managing connections between systems and naming.
6. **Presentation**: converting data into readable formats, encryption, compression.
7. **Application**: the interface to programs (APIs) so software can use the network.
There is no "conversion" layer; conversion is presentation's job. Mnemonic: Please Do Not Throw Sausage Pizza Away.

## Topologies
The **physical** topology is the visible wiring; the **logical** topology is the path signals take.
- **Bus**: one cable with terminated ends; a break stops everyone.
- **Ring**: each node to the next in a loop; a break stops everyone.
- **Star**: every node to a central switch or hub; one bad cable affects one node. The standard today.
- **Hybrid**: star-bus or star-ring, mixing them.
- **Mesh**: every node to some (partial) or all (full) others; wireless backhaul and critical links.
- **Point-to-multipoint**: a central node that also processes data serving many endpoints; wireless access points and telemetry.

## Subnet masks in binary
A mask is 32 bits of ones followed by zeros. 255.255.255.0 is 11111111.11111111.11111111.00000000 (/24). 255.255.255.240 is 11111111.11111111.11111111.**11110000** (/28), leaving 16 addresses per subnet; 248 is 11111000 (/29) and 252 is 11111100 (/30). A mask with scattered ones such as 00110101 is invalid. **Subnetting** splits a large address block into smaller networks to keep departments separate, limit broadcasts, and use addresses efficiently; devices on different subnets need a router.

## Hubs versus switches, and PPP
A **hub** repeats every signal to every port (physical layer, half duplex, collisions). A **switch** learns each device's MAC in a **source address table** and forwards frames only to the right port (data link layer), which makes **full-duplex** communication possible. **PPP** (Point-to-Point Protocol) is a data link protocol for direct links between two routers over a serial or dial connection, with authentication, and carries IP through network control protocols. **LAN** is one site (a clinic, a hospital); **WLAN** is a LAN with wireless; **WAN** connects sites across distance (two facilities in different states); the internet is the largest WAN.

## Troubleshooting, the exam's framing
Troubleshooting has a **diagnosis** phase (match the user's symptoms to known problems) and a **resolution** phase (follow a solution path, which may require more diagnosis). Examples the exam uses: an intermittent wireless connection on one handheld is local unless other devices also drop; confirm the device connects elsewhere and is configured correctly, **power cycle** it, then check the access point's **status lights** and try connecting through it. A failed wired link between a router and a nearby desktop: gather information and ask what changed, check that the cables are connected, swap in a **known-good** cable or use a cable tester to find the fault and its distance, plan and implement the fix, test again, and if a fault remains, look for a second one. The first step for a PC failing wireless file transfers is to check its own wireless connectivity to nearby nodes and devices.

## Tools
- **Cable tester**: continuity and correct wiring end to end; multi-port for cable types. A **time domain reflectometer (TDR)** sends a pulse and reads the reflection to report whether the cable is open and **how far** away the break is.
- **Cable tracer (toner)**: a transmitter puts a tone on the wire; a handheld probe sounds when near it; finds runs behind walls and locates opens.
- **Ping**: uses **ICMP** echo request and reply (with IPv4 and IPv6 versions) to a name or address; reports round-trip time in milliseconds, **packet loss**, and minimum, maximum, average, and deviation. It proves a connection and its speed; it does not test cable resistance, echo everything received, or have anything to do with ultrasound. Power cycling a device is not a connectivity test.
- **Fiber-optic testers** (fiber tester): **inspection microscopes** check the cleanliness and polish of connector ends and splices; dirt and oil scatter light, so ends are cleaned with isopropyl alcohol and lint-free wipes, or cut and repolished; light sources and power meters measure loss.
- **Multimeter** for end-to-end resistance (an open reads very high). An electrical safety analyzer is not a network tool.

## The clinical information systems
- **PACS**: picture archiving and communication system; stores, transports, and displays imaging with the patient data attached; redundant servers keep images available; interfaces with RIS and LIS.
- **RIS**: radiology information system; registration, scheduling, tracking, reporting, and results distribution for imaging; integrates PACS and HL7.
- **LIS**: laboratory information system; tracks specimens, interfaces with analyzers, stores results, enforces standards; a **LIMS** does the same for research and high-volume sample tracking, and the two are merging.
- **DICOM**: a 22-part standard for medical images, their format, transmission, and interfaces with PACS; references IEC definitions.
- **HL7**: the organization and its standards for exchanging patient data in a common format: **version 2** messaging (the workhorse), **version 3** using XML, and the **Clinical Document Architecture (CDA)**. HL7 is about data formatting for messaging; it does not set leakage limits or breach rules.

> Exam tip: seven layers, physical to application; presentation converts formats; MAC is data link, IP is network. Star is the standard topology; mesh and point-to-multipoint are wireless favorites. 240 is 11110000. Hubs repeat at layer 1 and force half duplex; switches use a source address table at layer 2 and allow full duplex. PPP links two routers. Ping is ICMP echo with timing and packet loss. A TDR tells how far to the break. Fiber ends are inspected with a microscope and cleaned with alcohol. PACS images, RIS radiology workflow, LIS specimens, DICOM images (22 parts), HL7 messaging (v2, v3 XML, CDA).`,
      hook: "OSI: physical, data link (MAC, switches), network (IP, routers), transport (TCP/UDP), session, presentation (conversion, encryption), application (APIs); no conversion layer. Bus and ring break entirely; star survives one cable; hybrid, mesh, point-to-multipoint. 255.255.255.240 = 11110000; ones then zeros only. Hub repeats, layer 1, half duplex; switch source address table, layer 2, full duplex. PPP router to router. LAN site, WLAN wireless, WAN between sites. Diagnosis then resolution; power cycle, status lights, known-good cable, tester. TDR gives distance to a break; toner traces; ping is ICMP echo with time and loss; fiber microscope and isopropyl. PACS images, RIS radiology, LIS/LIMS lab, DICOM 22 parts, HL7 v2 messaging, v3 XML, CDA."
    }
  ]);
})();
