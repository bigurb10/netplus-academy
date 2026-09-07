// CBET Academy curriculum, units 1 to 3. Original teaching content for the AAMI/ACI CBET exam.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Anatomy and Physiology", domain: 1,
  blurb: "The body systems a biomed's equipment monitors, supports, and replaces, and the vocabulary clinicians use to describe them.",
  assumes: "Nothing. Start here if you are new to healthcare.",
  lessons: [
    {
      id: "u1l1", title: "Body Organization, Terminology, and the Skin", domain: 1, obj: "A&P", minutes: 8,
      body: `A biomed does not diagnose patients, but every device you touch measures or treats a body system, and every clinician you talk to uses the same vocabulary. This lesson gives you the map and the words.

## How the body is organized
Cells form **tissues** (epithelial, connective, muscle, nervous), tissues form **organs**, and organs form **systems**. The exam names six systems: circulatory, respiratory, gastrointestinal, nervous, musculoskeletal, and endocrine, and four organs to know well: heart, lungs, brain, and skin.

## Directions and positions
- **Anterior** front, **posterior** back. **Superior** above, **inferior** below. **Medial** toward the midline, **lateral** away from it. **Proximal** closer to the trunk, **distal** farther away.
- **Supine** lying face up, **prone** face down.
- Planes: **sagittal** splits left and right, **coronal** (frontal) splits front and back, **transverse** splits top and bottom.

## Medical word parts
Most terms are a root plus a prefix or suffix.
- Prefixes: **brady-** slow, **tachy-** fast, **hyper-** above normal, **hypo-** below normal, **a-** or **an-** without, **dys-** difficult or abnormal.
- Roots: **cardio** heart, **pulmo** or **pneumo** lung, **nephro** or **reno** kidney, **hepat** liver, **neuro** nerve, **gastro** stomach, **derm** skin, **osteo** bone, **hemo** blood, **myo** muscle, **encephal** brain.
- Suffixes: **-itis** inflammation, **-ectomy** surgical removal, **-ostomy** surgical opening, **-oscopy** looking inside, **-graphy** recording, **-gram** the recording itself, **-algia** pain, **-emia** blood condition.
So tachycardia is a fast heart, an electrocardiogram is a recording of the heart's electricity, and hypoxemia is low oxygen in the blood.

## Vital signs, the numbers you will see everywhere
- Heart rate 60 to 100 beats per minute; below 60 bradycardia, above 100 tachycardia.
- Respiratory rate 12 to 20 breaths per minute.
- Blood pressure about 120/80 mmHg.
- Oxygen saturation 95 to 100 percent.
- Temperature 37 C (98.6 F); fever above about 38 C.

## The skin
Three layers: the **epidermis** (outer barrier), the **dermis** (blood vessels, nerves, glands), and the **subcutaneous** fat. The skin protects against infection, regulates temperature, and senses touch and pain. For the biomed it matters three ways: electrodes must overcome skin impedance (skin prep and gel), electrosurgery and warming devices can burn it, and pressure from beds and cuffs can injure it.

> Exam tip: word-part questions are free points. Break the word apart: brady (slow) + cardia (heart). Direction questions usually hinge on proximal versus distal and medial versus lateral.`,
      hook: "Cells, tissues, organs, systems. Anterior front, posterior back, proximal near, distal far, supine up, prone down. Brady slow, tachy fast, hyper high, hypo low, -itis inflammation, -ectomy removal. Know the vital sign ranges."
    },
    {
      id: "u1l2", title: "The Cardiovascular System", domain: 1, obj: "A&P", minutes: 11,
      body: `The heart is the organ the most equipment is built around: ECG monitors, blood pressure devices, defibrillators, pacemakers, and balloon pumps. Understand how it works and those devices make sense.

## The pump
Four chambers. The **right atrium** receives blood from the body through the vena cava and passes it through the **tricuspid valve** into the **right ventricle**, which pumps it through the **pulmonary valve** and pulmonary artery to the lungs. Oxygenated blood returns through the pulmonary veins to the **left atrium**, passes the **mitral valve** into the **left ventricle**, the strongest chamber, which pumps it through the **aortic valve** into the aorta and the body. Right side to the lungs, left side to the body.

## The electrical system
A heartbeat starts as an electrical impulse.
1. The **SA node** in the right atrium fires; it is the natural pacemaker.
2. The atria depolarize and contract: the **P wave**.
3. The **AV node** delays the impulse so the ventricles fill.
4. The impulse runs down the **bundle of His**, the **bundle branches**, and the **Purkinje fibers**.
5. The ventricles depolarize and contract: the **QRS complex**.
6. The ventricles repolarize: the **T wave**.
An ECG records this from the skin. **Einthoven's triangle** is the arrangement of the right arm, left arm, and left leg electrodes that produces leads I, II, and III.

## The cardiac cycle and blood pressure
**Systole** is contraction, **diastole** is relaxation and filling. Arterial pressure peaks in systole and falls in diastole: 120/80 means a systolic of 120 and a diastolic of 80 mmHg. **Mean arterial pressure** is closer to diastolic because diastole lasts longer: MAP = diastolic + (systolic minus diastolic) / 3. **Cardiac output** is heart rate times stroke volume, about 5 liters per minute at rest.

## Two things the exam names by name
- **Korotkoff sounds**: when a cuff is deflated with a stethoscope over the artery, the first tapping sound marks systolic pressure and the point where sounds disappear marks diastolic. Automated NIBP devices use oscillometry instead, but the term is on the outline.
- The **dicrotic notch**: a small dip on the downslope of an arterial pressure waveform where the aortic valve closes. Its presence shows a well-damped invasive line; its absence suggests overdamping.

## Blood vessels and blood
Arteries carry blood away from the heart under pressure; veins return it; capillaries exchange gases and nutrients. Blood is plasma plus red cells (hemoglobin carries oxygen), white cells (immunity), and platelets (clotting).

## When it goes wrong
**Arrhythmias**: bradycardia, tachycardia, atrial fibrillation (irregular, no P waves), ventricular fibrillation (chaotic, no output, shockable), asystole (flat line, not shockable). **Myocardial infarction** is heart muscle death from a blocked coronary artery. **Heart failure** is a weak pump; **hypertension** is chronic high pressure; **shock** is inadequate perfusion.

> Exam tip: P wave atrial, QRS ventricular depolarization, T ventricular repolarization. Systolic is the first Korotkoff sound, diastolic is the last. The dicrotic notch is aortic valve closure.`,
      hook: "Body, RA, RV, lungs, LA, LV, body. SA node, AV node, His, branches, Purkinje. P atria, QRS ventricles, T repolarization. MAP = DBP + (SBP minus DBP)/3. Korotkoff first sound systolic; dicrotic notch = aortic valve closing."
    },
    {
      id: "u1l3", title: "The Respiratory System", domain: 1, obj: "A&P", minutes: 9,
      body: `Ventilators, oximeters, capnographs, spirometers, and oxygen equipment all serve one system. Know how breathing works and what each number means.

## The airway
Air enters through the nose and mouth, passes the **pharynx** and **larynx**, and goes down the **trachea**, which splits into the right and left **bronchi**, then smaller **bronchioles**, ending in the **alveoli**, tiny sacs wrapped in capillaries where gas exchange happens. The lungs sit in the thoracic cavity, protected by the ribs, with the **diaphragm** underneath.

## How breathing works
Normal breathing is **negative pressure**: the diaphragm contracts and moves down, the chest expands, pressure inside falls below atmospheric, and air flows in. Exhalation is passive as the diaphragm relaxes. A **ventilator** does the opposite: it pushes gas in under **positive pressure**, which is why airway pressures and their alarms are central to ventilator care.

## Gas exchange
Oxygen diffuses from the alveoli into the blood and binds to **hemoglobin**; carbon dioxide diffuses out and is exhaled. Three separate things can fail:
- **Ventilation**: moving air in and out. Measured by respiratory rate, tidal volume, and end-tidal CO2.
- **Oxygenation**: getting oxygen into the blood. Measured by SpO2 and arterial blood gases.
- **Perfusion**: blood flow to carry it. A patient can ventilate fine and still be hypoxic if perfusion fails.

## Volumes and rates
- **Tidal volume**: one normal breath, about 500 mL in an adult; ventilators are set at 6 to 8 mL per kg of ideal body weight.
- **Minute volume**: tidal volume times rate, about 6 liters per minute.
- **Vital capacity**: the most air that can be exhaled after a full breath, about 4.5 liters.
- **Residual volume**: air that stays in the lungs after full exhalation.
- Spirometry reports **FVC** (forced vital capacity) and **FEV1** (the volume exhaled in the first second); a normal FEV1/FVC ratio is roughly 0.7 to 0.8.
- Respiratory rate 12 to 20 per minute; **apnea** is no breathing.

## The numbers monitors report
- **SpO2** 95 to 100 percent: how saturated hemoglobin is with oxygen.
- **EtCO2** 35 to 45 mmHg: the CO2 at the end of exhalation, a direct sign that ventilation and circulation are working.
- **FiO2**: the fraction of oxygen being delivered, 0.21 in room air up to 1.0.

## When it goes wrong
**Asthma** and **COPD** narrow the airways and trap air. **Pneumonia** fills alveoli with fluid. **Hypoxia** is too little oxygen; **hypercapnia** is too much CO2. **Respiratory arrest** is the reason ventilators, bag-valve masks, and oxygen exist.

> Exam tip: ventilation is air movement (EtCO2, tidal volume, rate); oxygenation is oxygen in the blood (SpO2). Normal breathing is negative pressure; a ventilator is positive pressure.`,
      hook: "Trachea, bronchi, bronchioles, alveoli; diaphragm drives negative-pressure breathing, ventilators push positive pressure. Tidal volume 500 mL, rate 12 to 20, SpO2 95 to 100, EtCO2 35 to 45. Ventilation moves air; oxygenation loads blood."
    },
    {
      id: "u1l4", title: "The Nervous and Musculoskeletal Systems", domain: 1, obj: "A&P", minutes: 9,
      body: `Nerves and muscles are electrical, which is why current shocks and stimulates, why ESUs run at high frequency, and why EEG and EMG exist.

## The nervous system
- The **central nervous system** is the brain and spinal cord. The **cerebrum** handles thought, sensation, and voluntary movement; the **cerebellum** coordinates balance and fine movement; the **brainstem** runs breathing, heart rate, and consciousness.
- The **peripheral nervous system** carries signals to and from the body.
- The **autonomic** system works without conscious control. The **sympathetic** branch (fight or flight) raises heart rate and blood pressure; the **parasympathetic** branch (rest and digest) lowers them. This is why anxiety or pain shows up on the monitor.

## Why electricity matters
A neuron sends a signal as an **action potential**: a brief electrical pulse traveling along the fiber. Muscle fibers contract in response to the same kind of pulse. External current at low frequencies mimics these pulses, which is why a 60 Hz shock causes muscle contraction, the let-go problem, and fibrillation. Electrosurgical units operate above about 100 kHz, faster than nerves can respond, so hundreds of milliamps pass through tissue without stimulation.

## Measuring the nervous system
- **EEG** records the brain's electrical activity from scalp electrodes placed by the 10-20 system. Rhythms are grouped by frequency: delta below 4 Hz (deep sleep), theta 4 to 8, alpha 8 to 13 (relaxed, eyes closed), beta above 13 (alert).
- **EMG** records muscle electrical activity; **nerve conduction studies** time a stimulus traveling along a nerve.
- **Evoked potentials** measure the brain's response to a sound, flash, or stimulus.

## The musculoskeletal system
About 206 bones give structure, protect organs, and make blood cells in the marrow. **Joints** connect bones; ligaments join bone to bone, tendons join muscle to bone. Three kinds of muscle: **skeletal** (voluntary, attached to bones), **smooth** (involuntary, in vessels and gut), and **cardiac** (the heart, involuntary but electrically driven).

## Devices that touch these systems
Physical therapy stimulators (TENS for pain, muscle stimulators), traction, continuous passive motion machines, and nerve stimulators used to test paralysis during anesthesia. Every one delivers current and must be checked for output and safety.

## When it goes wrong
**Stroke** is loss of blood flow to part of the brain. **Seizures** are abnormal electrical storms seen on EEG. **Spinal cord injury** blocks signals below the level of injury. Fractures and arthritis affect bones and joints.

> Exam tip: sympathetic speeds the heart, parasympathetic slows it. Low-frequency current stimulates nerves and muscle; ESU frequencies are too high to stimulate. EEG bands: delta, theta, alpha, beta from slow to fast.`,
      hook: "Brainstem runs breathing and heart rate; sympathetic speeds, parasympathetic slows. Nerves and muscles fire electrically, so low-frequency current stimulates and high-frequency ESU current does not. EEG: delta, theta, alpha, beta."
    },
    {
      id: "u1l5", title: "Gastrointestinal, Endocrine, Renal, and Blood", domain: 1, obj: "A&P", minutes: 8,
      body: `The remaining systems on the outline, each tied to devices you will maintain.

## The gastrointestinal system
Food travels from the mouth down the **esophagus** to the **stomach**, then through the **small intestine** (duodenum, jejunum, ileum), where most absorption happens, and the **large intestine**, where water is absorbed, to the rectum. The **liver** processes nutrients and drugs and makes clotting factors; the **pancreas** supplies digestive enzymes and insulin; the **gallbladder** stores bile.
Devices: **enteral feeding pumps** deliver formula through nasogastric or gastrostomy tubes; **suction** clears the stomach or airway; **endoscopes** view the tract. Enteral connectors are deliberately incompatible with IV connectors so feeding formula cannot be injected into a vein.

## The endocrine system
Glands release hormones into the blood. The **pancreas** releases **insulin** (lowers blood glucose) and glucagon (raises it); **diabetes** is too little insulin or resistance to it. The **thyroid** sets metabolic rate, the **adrenals** release epinephrine (adrenaline), and the **pituitary** directs the others. Devices: glucose meters and insulin pumps.

## The renal system
The **kidneys** filter blood through millions of **nephrons**, removing waste and excess water as urine, which passes through the **ureters** to the **bladder**. They also balance electrolytes and blood pressure. When kidneys fail, **dialysis** takes over: blood passes through a semipermeable membrane against a fluid called dialysate, and waste diffuses out. The dialysis machine's job is to pump blood, mix and warm dialysate, and watch for leaks and air.

## Blood
About five liters. **Plasma** is the liquid; **red cells** carry oxygen on hemoglobin; **white cells** fight infection; **platelets** clot. Laboratory analyzers count cells and measure chemistry; pulse oximetry works because oxygenated and deoxygenated hemoglobin absorb light differently. Blood must be stored at 2 to 8 C and warmed before rapid transfusion.

## Immunity and infection
White cells and antibodies defend against pathogens. Hospital-acquired infections spread on hands and equipment, which is why infection control is a biomed's responsibility too.

## When it goes wrong
**Diabetes**, **renal failure**, GI bleeding, liver failure, and anemia are the common conditions behind the equipment: feeding pumps, glucose meters, dialysis machines, blood warmers, and analyzers.

> Exam tip: kidneys filter, dialysis substitutes by diffusion across a membrane. Insulin lowers glucose. Enteral connectors do not fit IV lines by design. Blood and vaccines live at 2 to 8 C.`,
      hook: "GI absorbs in the small intestine; feeding pumps use enteral-only connectors. Pancreas makes insulin. Kidneys filter; dialysis diffuses waste across a membrane. Plasma, red cells with hemoglobin, white cells, platelets; store blood at 2 to 8 C."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Fundamentals of Electricity and Electronics", domain: 3,
  blurb: "The theory behind every circuit you troubleshoot, and the power systems that keep a hospital running.",
  assumes: "Basic arithmetic. No prior electronics needed.",
  lessons: [
    {
      id: "u2l1", title: "Voltage, Current, Resistance, and Power", domain: 3, obj: "Electronics", minutes: 10,
      body: `Every troubleshooting measurement you will ever make comes back to four quantities and one law.

## The four quantities
- **Voltage** (V, volts): electrical pressure, the push. Measured across two points.
- **Current** (I, amperes): the flow of charge. Measured through a path.
- **Resistance** (R, ohms): opposition to flow. Measured with the power off.
- **Power** (P, watts): the rate energy is used, which usually becomes heat.

## Ohm's law
V = I x R. Rearranged: I = V / R and R = V / I. Twelve volts across 4 ohms pushes 3 amps. If the resistance rises, the current falls. This is also why a shock's severity depends on skin resistance: 120 volts through dry skin at 100,000 ohms is about 1 mA, but through wet skin at 1,000 ohms it is 120 mA, a lethal current.

## Power
P = V x I. Substituting Ohm's law: P = I squared x R, and P = V squared / R. A 120 V heater drawing 10 A dissipates 1,200 W. A resistor carrying too much current overheats because power rises with the square of the current.

## Series circuits
Components in a single path. The **same current** flows through each; voltages **add up** to the source. Total resistance is the sum: R total = R1 + R2 + R3. If one component opens, the whole path stops, which is how a fuse works.

## Parallel circuits
Components side by side across the same two points. The **same voltage** is across each; currents **add**. Total resistance is less than the smallest branch: 1 / R total = 1/R1 + 1/R2 + ..., or for two resistors (R1 x R2) / (R1 + R2). Two 100-ohm resistors in parallel make 50 ohms. Wall outlets are in parallel, which is why one lamp burning out does not darken the room.

## Kirchhoff, in plain words
- Current into a junction equals current out.
- Voltages around any closed loop add up to zero: the drops equal the source.
These two rules let you find any unknown in a circuit from a schematic.

## Worked example
A 24 V supply feeds a 6 ohm resistor and a 2 ohm resistor in series. Total resistance 8 ohms, current 24 / 8 = 3 A, voltage across the 6 ohm resistor 3 x 6 = 18 V, across the 2 ohm resistor 6 V, and 18 + 6 = 24. Power in the 6 ohm resistor is 3 squared x 6 = 54 W.

> Exam tip: series shares current and adds voltage; parallel shares voltage and adds current. Parallel resistance is always smaller than the smallest branch. Power goes with the square of current.`,
      hook: "V = IR, P = VI. Series: same current, voltages add, resistances add. Parallel: same voltage, currents add, 1/R total = sum of 1/R. Shock current depends on skin resistance."
    },
    {
      id: "u2l2", title: "AC, Transformers, Hospital Power Distribution, and Isolation", domain: 3, obj: "Electronics", minutes: 11,
      body: `Hospitals run on alternating current, and the way it is distributed decides whether a fault shocks a patient or trips an alarm.

## AC basics
Direct current flows one way; alternating current reverses, in the US 60 times per second (60 Hz; 50 Hz in much of the world). The wall voltage of 120 V is the **RMS** value, the effective heating equivalent; the **peak** is 1.414 times higher, about 170 V. RMS = 0.707 x peak. Period = 1 / frequency, 16.7 ms at 60 Hz. Large equipment uses 208 or 240 V, and some uses three-phase power.

## Transformers
Two coils on a shared core. Voltage scales with the turns ratio: V secondary / V primary = N secondary / N primary. A **step-down** transformer lowers voltage and raises current; **step-up** does the reverse. An **isolation transformer** has a 1:1 ratio; its secondary has no connection to ground, which is the basis of isolated power systems and of the isolation inside patient-connected equipment.

## The three wires
US cords: **black** (or red) is hot, **white** is neutral (returns current, near ground potential), **green** or bare is **ground** (carries no current unless there is a fault). IEC cords use brown live, blue neutral, green-yellow ground. The ground wire gives fault current a low-resistance path back so a breaker trips instead of a person carrying it.

## The hospital essential electrical system
Codes (NFPA 99 for health care facilities and NFPA 70, the National Electrical Code) require an emergency generator that restores power within **10 seconds**, feeding three branches: **life safety** (exits, alarms), **critical** (patient care outlets, often marked **red**), and **equipment** (HVAC, elevators). Life-support equipment plugs into red outlets and often has its own battery or UPS to cover the switchover.

## Isolated power systems
In wet procedure locations and some operating rooms, power comes from an isolation transformer whose output is **not grounded**. A single fault from either conductor to ground does not complete a circuit, so it cannot shock. A **line isolation monitor (LIM)** continuously measures how much current a fault could drive and alarms when the total hazard current reaches **5 mA**, telling staff a first fault exists before a second one makes it dangerous.

## GFCI
A ground fault circuit interrupter compares current leaving on the hot wire to current returning on the neutral. A difference of about **5 mA** (4 to 6 mA) means current is escaping through something, possibly a person, and it trips in a few hundredths of a second. Used near sinks and in wet areas. It protects people; it does not protect against microshock, because 5 mA is far above the microshock threshold.

## Receptacles
Hospital-grade receptacles carry a green dot and are tested for retention force, polarity, and ground continuity. The **patient care vicinity** extends about 6 feet around the bed and 7.5 feet up; equipment used there follows the stricter rules.

> Exam tip: 120 V RMS is 170 V peak. Green is ground, white is neutral, black is hot. Generator in 10 seconds; red outlets are emergency power. LIM alarms at 5 mA; GFCI trips at 5 mA; they solve different problems.`,
      hook: "RMS = 0.707 x peak; 60 Hz. Transformer turns ratio sets voltage. Black hot, white neutral, green ground. Generator in 10 s, red outlets critical branch. Isolated power plus LIM alarms at 5 mA; GFCI trips at 5 mA."
    },
    {
      id: "u2l3", title: "Passive Components, Filters, and Reading Schematics", domain: 3, obj: "Electronics", minutes: 10,
      body: `Passive components store or dissipate energy; they cannot amplify. Knowing what each does, and how it looks on a schematic, is how you find a fault on a board.

## Resistors
Limit current and divide voltage. Value is printed as color bands: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, white 9; the third band is the multiplier and the fourth is tolerance (gold 5 percent, silver 10 percent). Red-violet-orange is 27,000 ohms. Failed resistors usually open and often show heat discoloration.

## Capacitors
Store charge between two plates. They block DC and pass AC, and they smooth ripple in power supplies, couple signals between stages, and store the energy in a defibrillator. Capacitance in farads (usually microfarads). Electrolytic capacitors have polarity and are the most common failure in old power supplies: they dry out, bulge, and leak, causing ripple, hum, and resets. Energy stored is one half x C x V squared.

## Inductors and transformers
A coil stores energy in a magnetic field, passes DC, and opposes changes in current, so it blocks high-frequency noise. Two coupled coils form a transformer.

## Reactance and filters
Capacitors and inductors resist AC by an amount that depends on frequency, called **reactance**. Capacitive reactance falls as frequency rises: Xc = 1 / (2 x pi x f x C). Inductive reactance rises with frequency: XL = 2 x pi x f x L. Combining them with resistors makes **filters**:
- **Low-pass** keeps slow signals and removes fast noise.
- **High-pass** removes slow drift, such as ECG baseline wander.
- **Band-pass** keeps a range, such as the ECG monitoring band of 0.5 to 40 Hz.
- **Notch** removes one frequency, almost always 60 Hz interference.

## The RC time constant
A capacitor charging through a resistor reaches 63 percent of its final voltage in one time constant, tau = R x C, and about 99 percent after five. A 10 kilohm resistor and a 100 microfarad capacitor give 1 second. Time constants set filter cutoffs, timing circuits, and defibrillator charge times.

## Reading a schematic
Schematics are the map you troubleshoot with.
- Symbols: a zigzag is a resistor, two parallel lines a capacitor (one curved if polarized), a coil an inductor, a triangle with a bar a diode, a circle with legs a transistor, a stack of lines ground, a small box or S-curve a fuse.
- Signal flows left to right; power rails run along the top and bottom.
- **Test points** are labeled with expected voltages or waveforms. Measure, compare to the printed value, and the first point that disagrees tells you the stage that failed.
- **Half-splitting**: check the middle of the signal path; if it is good, the fault is downstream, if bad, upstream. Repeat.

> Exam tip: capacitors block DC and pass AC; inductors do the opposite. A bulging electrolytic capacitor means ripple and resets. One time constant is 63 percent. On a schematic, the first test point that differs from the printed value points to the failed stage.`,
      hook: "Resistor color code black to white 0 to 9. Capacitors block DC, pass AC, store energy (half C V squared), fail by drying out. Inductors block fast changes. Low-pass, high-pass, band-pass, notch at 60 Hz. tau = RC, 63 percent. Half-split with the schematic."
    },
    {
      id: "u2l4", title: "Active Devices, Power Supplies, and Amplifiers", domain: 3, obj: "Electronics", minutes: 10,
      body: `Active devices control or amplify. They are what turn wall power into the clean rails a device needs and turn a microvolt heart signal into a waveform on a screen.

## Diodes
A diode conducts in one direction only, dropping about 0.7 V (silicon) when it does. Uses: **rectifiers** turn AC into pulsing DC (half-wave uses one diode, full-wave two, a bridge four); a **zener** diode conducts backward at a fixed voltage and holds a reference; an **LED** emits light and is the source in pulse oximeter probes.

## The power supply, stage by stage
1. **Transformer** steps the mains down (or a switching stage chops it at high frequency).
2. **Rectifier** turns AC into pulsing DC.
3. **Filter capacitor** smooths the pulses; too little capacitance or a dried-out capacitor leaves **ripple**.
4. **Regulator** holds the output steady as load and input vary.
**Linear** supplies are simple and quiet but heavy and inefficient, wasting the difference as heat. **Switching** supplies chop the input at tens of kilohertz, are light and efficient, and are in nearly every modern device; they are noisier and many need a minimum load to regulate. Most supply faults are failed capacitors, blown fuses from a shorted downstream component, or a regulator that drifts.

## Transistors and thyristors
A **transistor** (NPN or PNP) uses a small base current to control a larger collector-emitter current: a switch or an amplifier. **SCRs** and **triacs** switch large AC loads such as motors and heaters. Failed transistors usually short.

## Operational amplifiers
An op-amp has very high gain, and with feedback it follows two rules: the inputs draw no current, and the output does whatever it takes to make the two inputs equal. Resistor ratios set the gain. Inverting and non-inverting configurations amplify; a **differential** or **instrumentation amplifier** amplifies the difference between two inputs and rejects what they have in common. That common-mode rejection (**CMRR**) is why an ECG front end can pull a 1 mV heart signal out of volts of 60 Hz interference on both electrodes.

## Isolation
Patient-connected circuits float from ground so leakage current cannot reach the patient. **Optocouplers** pass signals as light across a gap; **isolation amplifiers** and isolation transformers do the same for analog signals and power. A failed isolation barrier shows up as excess patient leakage on the safety analyzer.

## From analog to digital
An **analog-to-digital converter** samples a signal and turns each sample into a number. Resolution in bits sets the steps: 8 bits is 256 levels, 12 bits is 4,096. Sample faster than twice the highest frequency of interest (the Nyquist rule) or the signal is misrepresented. A **DAC** does the reverse to drive displays and outputs.

> Exam tip: rectifier then filter then regulator; ripple means a bad filter capacitor. An instrumentation amplifier with high CMRR rejects 60 Hz on ECG leads. Isolation keeps patient circuits floating; excess patient leakage points to the barrier.`,
      hook: "Diode one way, 0.7 V; rectifier, filter capacitor, regulator; ripple means the capacitor. Linear quiet and heavy, switching efficient and noisy. Transistor is a switch or amplifier. Instrumentation amp with high CMRR for ECG. Optocouplers isolate. ADC resolution and Nyquist."
    },
    {
      id: "u2l5", title: "Batteries, UPS, and Power Conditioning", domain: 3, obj: "Electronics", minutes: 9,
      body: `Stored power keeps infusion pumps running during transport and keeps monitors alive during the ten seconds before the generator picks up. Battery problems are among the most common repairs a biomed makes.

## Battery basics
A battery converts chemical energy to electrical. **Primary** cells are single use; **secondary** cells recharge. Capacity is rated in **amp-hours**: a 2 Ah battery delivers 2 A for one hour or 0.5 A for four hours, less as it ages. Cells are stacked in series to reach the working voltage.

## Chemistries and cell voltages
- **Lead-acid** (sealed lead-acid in most medical carts and older devices): 2.0 V per cell, heavy, tolerant of trickle charging, but it **sulfates** and dies if stored discharged.
- **Nickel-cadmium**: 1.2 V per cell, rugged, suffers the **memory effect** where repeated partial discharge shrinks usable capacity; recover with full discharge and charge cycles.
- **Nickel-metal hydride**: 1.2 V per cell, more capacity than NiCd, less memory effect, self-discharges faster.
- **Lithium-ion**: 3.6 to 3.7 V per cell, light, high capacity, no memory effect, but must not be over-discharged or overcharged; protection circuits guard against **thermal runaway**, and damaged or swollen packs are a fire hazard.
- Alkaline primary cells are 1.5 V.

## Battery management
Batteries wear out on a schedule whether or not they fail visibly. A program includes dated labels, runtime tests at PM (run the device on battery to its low-battery alarm and compare to specification), conditioning cycles for NiCd, replacement at the vendor's interval, and correct disposal. A device that runs on AC but dies immediately on battery has a dead battery, a charger fault, or a bad battery connector.

## Uninterruptible power supplies
A UPS carries a load through short outages and the generator's start-up delay.
- **Standby**: passes utility power through, switches to the inverter on loss; brief transfer time.
- **Line-interactive**: also corrects sags and surges with a regulating transformer.
- **Online double-conversion**: always rectifies to DC and inverts back to AC, so the load never sees the utility directly; zero transfer time and full conditioning; the choice for critical equipment.
Runtime depends on load; size the UPS for the load and the time needed to shut down or reach generator power.

## Power quality
- **Sag** or **brownout**: voltage too low; **surge**: too high; **spike** or **transient**: a brief high-energy pulse from lightning or switching; **noise**: high-frequency garbage; **blackout**: none at all.
- **Surge protectors** clamp spikes; **power conditioners** regulate voltage and filter noise; a UPS does all of it plus outage bridging.
Devices with unexplained resets, corrupted data, or damaged supplies often live on a bad circuit.

> Exam tip: lead-acid 2 V, NiCd and NiMH 1.2 V, Li-ion 3.6 V per cell. NiCd has memory; Li-ion has thermal runaway risk. Online double-conversion UPS has no transfer gap. Runs on AC but not battery means battery, charger, or connector.`,
      hook: "Amp-hours is capacity. Lead-acid 2 V and sulfates, NiCd 1.2 V with memory, NiMH 1.2 V, Li-ion 3.6 V no memory but thermal runaway. Standby, line-interactive, online UPS. Sag, surge, spike, noise, blackout."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Public Safety in the Healthcare Facility", domain: 2,
  blurb: "Electrical safety and its standards, infection control, hazard communication, fire, gas, radiation, MRI, and the regulators and standards that govern equipment programs.",
  assumes: "You know Ohm's law and the basics of hospital power.",
  lessons: [
    {
      id: "u3l1", title: "Electrical Safety: Shock, Leakage, Grounding, and GFCI", domain: 2, obj: "Safety", minutes: 10,
      body: `Patients are more vulnerable to electricity than anyone else in the building: they are wet, sedated, and sometimes wired directly to the heart. Electrical safety is the biomed's core duty.

## What current does to the body
For 60 Hz current through the body from hand to hand:
- About **1 mA**: the threshold of perception, a tingle.
- **5 mA**: the accepted maximum harmless current.
- **10 to 20 mA**: the **let-go** threshold; muscles clamp and the person cannot release the conductor.
- Around **50 mA**: pain, fainting, possible respiratory arrest.
- **100 to 300 mA**: ventricular fibrillation is likely; this is the lethal range.
- **6 A and above**: sustained contraction of the heart, severe burns.

## Macroshock and microshock
**Macroshock** is current entering through the skin. The skin's resistance limits it, and it takes milliamps to hurt. **Microshock** is current that bypasses the skin and reaches the heart directly through a catheter, pacing wire, or fluid-filled line. There, as little as **10 microamps** can trigger fibrillation. That is why patient-connected equipment is held to microamp leakage limits.

## Where leakage comes from
Every powered device leaks a little current to its chassis through the capacitance of its power cord, transformer windings, and filters, plus any insulation defect. Normally the ground wire carries that leakage harmlessly away. If the ground opens, the chassis sits at a voltage and the leakage looks for another path, possibly through a patient touching the case and a grounded bed rail.

## Grounding
The green wire and the third prong exist to give fault and leakage current a low-resistance path back to the source so a breaker trips or the current is diverted. A broken ground pin, a two-prong adapter, or a damaged cord removes that protection. Ground resistance on patient-care equipment must stay below **0.5 ohm** (NFPA 99).

## Cord and plug inspection
Check for cracked insulation, bent or missing ground pins, strain relief pulled out, and burned contacts. Replace the cord; never tape it. Hospital-grade plugs and receptacles have a green dot. Extension cords and unapproved power strips are prohibited for patient care equipment; approved relocatable power taps must be rated, secured, and never daisy-chained.

## GFCI and isolated power
A **GFCI** trips when about 5 mA more leaves on the hot wire than returns on the neutral, protecting people near water from macroshock; it does nothing against microshock because its threshold is a thousand times too high. **Isolated power** with a **line isolation monitor** removes the ground reference entirely so a first fault causes no current flow; the LIM alarms at 5 mA of total hazard current so the fault is found before a second one appears.

## Habits that prevent shock
Keep patient-connected leads away from grounded metal. Never plug a patient-connected device into an ungrounded outlet. Report tingles immediately; a tingle is a fault. Test after every repair.

> Exam tip: 10 mA let-go, 100 mA fibrillation, 10 microamps microshock. Ground resistance 0.5 ohm. GFCI at 5 mA protects against macroshock, not microshock. An open ground turns leakage into a hazard.`,
      hook: "1 mA feel, 10 mA let-go, 100 mA fibrillate, 10 microamps to the heart is microshock. Leakage rides the ground wire; an open ground makes it a hazard. Ground resistance 0.5 ohm. GFCI 5 mA, LIM 5 mA."
    },
    {
      id: "u3l2", title: "NFPA 99, IEC 60601-1, Limits, and Safety Testing", domain: 2, obj: "Safety", minutes: 11,
      body: `Two documents set the numbers: IEC 60601-1 for how devices are designed, NFPA 99 for how facilities use and test them. The exam names both and expects the limits.

## Who says what
- **IEC 60601-1** is the international standard for medical electrical equipment design and testing. It defines protection classes, applied-part types, and leakage limits under normal and single-fault conditions.
- **NFPA 99**, the Health Care Facilities Code, covers the facility: electrical systems, medical gases, and the testing of equipment used in patient care. **NFPA 70** (the National Electrical Code) covers building wiring.

## Classes and applied-part types
- **Class I**: relies on a protective earth ground (three-prong plug).
- **Class II**: double or reinforced insulation, no ground needed; the square-within-a-square symbol.
- **Internally powered**: battery operated.
- **Type B** applied part: contacts the body, not the heart; stick-figure symbol.
- **Type BF**: body floating; the patient connection is isolated from ground; figure in a box.
- **Type CF**: cardiac floating; isolated and held to the tightest limits for direct cardiac connection; heart in a box.
- **Defibrillation-proof**: the symbol with paddles; the applied part survives a defibrillator discharge.

## The limits
IEC 60601-1, normal condition then single fault:
- Earth (ground) leakage: 5 mA, then 10 mA.
- Touch (enclosure) current: 100 microamps, then 500 microamps.
- Patient leakage, AC, types B and BF: 100 microamps, then 500 microamps.
- Patient leakage, AC, type CF: 10 microamps, then 50 microamps.
- Patient leakage, DC, all types: 10 microamps, then 50 microamps.
- Mains voltage applied to the patient connection: BF 5 mA, CF 50 microamps.
NFPA 99: ground resistance from chassis to plug ground pin no more than **0.5 ohm**; chassis touch current for cord-connected patient-care equipment **500 microamps** in current editions (older editions used 300 or 100; know which your facility cites).

## The safety analyzer test sequence
1. **Visual inspection**: cord, plug, strain relief, housing, labels.
2. **Ground resistance**: chassis to ground pin, under 0.5 ohm.
3. **Chassis leakage**: normal polarity, then reversed polarity, open ground, and open neutral; leakage rises under faults, and the single-fault limit applies.
4. **Patient lead leakage**: each lead to ground, normal and fault conditions.
5. **Lead-to-lead** leakage.
6. **Mains on applied part** (isolation test): a voltage is applied to the leads and the current that flows is measured.
Record every value; a rising trend across PMs predicts failure before a limit is crossed.

## When to test
At incoming inspection before first use, after any repair that could affect safety, and at scheduled preventive maintenance. Battery-only devices still get a visual and a patient-lead check.

## Reading a failing result
- Ground resistance high: worn plug, damaged cord, loose internal ground strap.
- Chassis leakage high in normal condition: insulation breakdown, failed filter capacitor, moisture.
- Patient leakage high: isolation barrier failure in the front end.

> Exam tip: CF is the tightest, 10 microamps normal. Single-fault limits are five times normal. Ground resistance 0.5 ohm. Test after every repair. Reversed polarity and open ground raise leakage; that is the point of testing them.`,
      hook: "IEC 60601-1 designs the device, NFPA 99 governs the facility. B, BF, CF; CF 10 microamps normal, 50 fault; B and BF 100 and 500; earth leakage 5 and 10 mA; ground 0.5 ohm. Test at incoming, after repair, at PM: ground, chassis under faults, patient leads, mains on applied part."
    },
    {
      id: "u3l3", title: "Infection Control, Universal Precautions, and PPE", domain: 2, obj: "Safety", minutes: 9,
      body: `Equipment moves between patients, and so do you. Infection control is part of the job, not something the nurses do for you.

## Standard (universal) precautions
Treat every patient's blood and body fluids as infectious. Hand hygiene before and after every patient contact and before and after touching equipment, with soap and water when hands are visibly soiled and alcohol rub otherwise. Gloves for contact with fluids; eye protection and mask when splashes are possible.

## Transmission-based precautions
Posted on the patient's door.
- **Contact**: gown and gloves; the organism spreads by touch (resistant bacteria, C. difficile, which also needs soap and water because alcohol does not kill spores).
- **Droplet**: surgical mask within a few feet; spread by coughing and sneezing (influenza).
- **Airborne**: N95 respirator, fit tested, and a negative-pressure room (tuberculosis, measles).
Equipment leaving an isolation room is cleaned and disinfected before it goes anywhere else.

## PPE, in order
Donning: gown, mask or respirator, eye protection, gloves. Doffing: gloves first (most contaminated), eye protection, gown, mask last, with hand hygiene between steps and after. Remove PPE before leaving the room, except the respirator in airborne isolation.

## Bloodborne pathogens and sharps
Hepatitis B, hepatitis C, and HIV spread through blood. The OSHA bloodborne pathogens standard requires an exposure control plan, training, hepatitis B vaccination offered, and PPE. Sharps go in puncture-resistant containers, never recapped by hand. A needlestick or splash is reported immediately for evaluation and treatment.

## Cleaning, disinfection, sterilization
- **Cleaning** removes soil and most organisms; it always comes first, because disinfectants cannot work through dirt.
- **Disinfection** kills most organisms; low-level for surfaces, high-level for items that touch mucous membranes. Contact time on the label must be met.
- **Sterilization** kills everything, including spores: steam autoclave at 121 C and 15 psi for 15 to 30 minutes, or 132 to 135 C for flash cycles; ethylene oxide or hydrogen peroxide plasma for heat-sensitive items; biological indicators prove the cycle worked.

## Spaulding classification
- **Critical** items enter sterile tissue or the bloodstream (surgical instruments, catheters): sterilize.
- **Semi-critical** items touch mucous membranes or non-intact skin (endoscopes, respiratory circuits): high-level disinfection at minimum.
- **Non-critical** items touch intact skin (blood pressure cuffs, monitors, beds): low-level disinfection.

## The biomed's part
Clean and disinfect a device before opening or servicing it, and again before returning it. Use disinfectants the manufacturer approves so housings do not crack. Keep the shop separate from clean storage. Wear gloves when handling equipment from isolation rooms.

> Exam tip: hand hygiene is the single most effective control. Airborne means N95 and negative pressure. Clean before you disinfect. Critical items sterilize, semi-critical high-level disinfect, non-critical low-level.`,
      hook: "Treat all fluids as infectious; hand hygiene always. Contact gown and gloves, droplet mask, airborne N95 and negative pressure. Don gown, mask, eyes, gloves; doff gloves first. Clean, then disinfect, then sterilize; Spaulding critical, semi-critical, non-critical."
    },
    {
      id: "u3l4", title: "Hazard Communication, Signage, Fire, Gas, Radiation, Laser, and MRI Safety", domain: 2, obj: "Safety", minutes: 11,
      body: `A hospital is full of things that burn, explode, irradiate, and attract steel. The outline expects you to read the labels and know the rules.

## Safety data sheets
Every hazardous chemical has a **safety data sheet** in a standard 16-section format: identification, hazards, composition, first aid, fire fighting, accidental release, handling and storage, exposure controls and PPE, physical properties, and so on. Staff must be able to reach the SDS for anything they use. **GHS pictograms** on containers: flame (flammable), flame over a circle (oxidizer), skull (acute toxicity), corrosion, exclamation mark (irritant), health hazard silhouette, gas cylinder, environment. The **NFPA 704 diamond** rates health (blue), flammability (red), reactivity (yellow) from 0 to 4, with a white box for special hazards such as OX for oxidizer.

## Hazard signage in the building
- **Laser**: sign states the class and wavelength; class 1 is safe, class 4 burns tissue and starts fires; wavelength-specific eyewear is required and the room is controlled during use.
- **Ionizing radiation**: the trefoil; protection is time, distance, and shielding; **ALARA** (as low as reasonably achievable); intensity follows the inverse square law; lead aprons; dosimeters for staff who work near X-ray.
- **MRI**: four zones from the public area (I) to the magnet room (IV); the magnet is always on; ferromagnetic objects become projectiles; every person and device is screened; equipment is labeled MR Safe, MR Conditional, or MR Unsafe; a **quench** vents cryogenic helium and needs an escape route.
- **Patient precautions**: contact, droplet, airborne, fall risk, latex allergy, and limb restrictions such as no blood pressure on an arm with a dialysis access.
- **Biohazard**: the three-crescent symbol on waste and specimens.

## Fire
The fire triangle is heat, fuel, and oxygen; remove any one. **RACE**: rescue anyone in danger, activate the alarm, confine the fire by closing doors, extinguish or evacuate. **PASS** for an extinguisher: pull the pin, aim at the base, squeeze, sweep. Classes: A ordinary combustibles, B flammable liquids, C electrical, D metals, K cooking oils. Hospitals defend in place with fire-rated compartments, so know where the smoke barrier doors are.

## Medical gases
Oxygen does not burn but makes everything else burn violently; oxygen-enriched atmospheres near cannulas, tents, and ventilators are fire risks with ESUs and lasers. Never use oil or grease on oxygen fittings. Cylinders are secured upright, capped when not in use, stored below 125 F with full separated from empty. US color code: **oxygen green**, **nitrous oxide blue**, **carbon dioxide gray**, **nitrogen black**, **medical air yellow**, **helium brown**. The **pin index** system on small cylinders and **DISS** fittings on hoses make wrong connections impossible. A full E cylinder of oxygen holds about 660 liters at about 2,000 to 2,200 psi; pipeline pressure is about 50 psi; **zone valves** shut off gas to an area in a fire.

## Electrical fires and equipment
Unplug if safe, use a class C extinguisher, and never use water on energized equipment. Report every incident.

> Exam tip: oxygen green, nitrous blue, CO2 gray, nitrogen black, air yellow. RACE then PASS. MRI zone IV is the magnet room and nothing ferromagnetic enters. Laser class 4 is the dangerous one. Time, distance, shielding for radiation.`,
      hook: "SDS has 16 sections; GHS pictograms; NFPA 704 diamond blue health, red flammability, yellow reactivity. RACE, PASS, classes A to K. Oxygen green, nitrous blue, CO2 gray, nitrogen black, air yellow. Laser class 4, radiation ALARA, MRI zones I to IV."
    },
    {
      id: "u3l5", title: "CMS, Accreditation, AAMI EQ Standards, and the CMMS", domain: 2, obj: "Safety", minutes: 10,
      body: `The equipment program exists inside a web of regulators, accreditors, and standards, and the CMMS is where it proves compliance. The outline names each by name.

## CMS and deemed status
The **Centers for Medicare and Medicaid Services** pays for a large share of hospital care and sets **Conditions of Participation** a hospital must meet to be paid. CMS can survey a hospital directly, but most hospitals are surveyed by an accrediting organization with **deemed status**, meaning CMS accepts its survey as proof of compliance. The organizations with deeming authority for hospitals include **The Joint Commission**, **DNV Healthcare**, **ACHC** (which absorbed the former HFAP program), and **CIHQ**.

## What surveyors look for
Accreditation standards for the environment of care and equipment management require a complete inventory, a documented maintenance strategy for each device, scheduled maintenance completed on time, safety and performance testing, incident investigation, staff training, and records that prove all of it. Missing PMs on life-support equipment are among the most serious findings.

## Alternative equipment maintenance
CMS allows hospitals to maintain equipment on a schedule or method that differs from the manufacturer's recommendation, an **AEM program**, when a qualified person documents a risk-based justification and the device's history supports it. AEM is **not** allowed for imaging and radiologic equipment, medical lasers, or any device where the manufacturer, federal or state law, or the device's design requires the manufacturer's method. New equipment follows the manufacturer's schedule until enough history exists to justify a change.

## The ANSI/AAMI EQ standards
- **EQ56**: the recommended practice for a medical equipment management program: scope, inventory, risk criteria, procedures, records, and quality measures.
- **EQ89**: guidance for scheduled maintenance and performance verification: how to decide what to do, how often, and how to verify performance.
- **EQ93**: the vocabulary of medical equipment management, so everyone means the same thing by terms such as corrective maintenance and performance verification.
- **EQ103**: guidance for alternative equipment maintenance programs: the risk assessment, documentation, and review that make an AEM defensible.

## Other regulators
- The **FDA** regulates devices and requires **medical device reporting**: a user facility reports a device-related death to the FDA and the manufacturer within 10 work days, and a serious injury to the manufacturer within 10 work days. Recalls are Class I (serious harm), II (temporary harm), or III (unlikely harm).
- **OSHA** protects workers: hazard communication, bloodborne pathogens, electrical safety at work.
- State health departments license facilities and may inspect.

## The CMMS
The **computerized maintenance management system** is the program's memory: the inventory with asset tags and risk scores, work orders for corrective and scheduled maintenance, PM schedules and completion, equipment history, parts and costs, and reports. Every activity is documented there, because to a surveyor an undocumented PM did not happen. Reports show PM completion rate, overdue items, repeat failures, mean time between failures, and cost of ownership, which drive AEM decisions and replacement planning. Use it well: search by asset tag or serial, close work orders with cause and action, and attach test results.

> Exam tip: CMS sets the conditions; The Joint Commission, DNV, ACHC, and CIHQ survey on its behalf. AEM needs a documented risk assessment and is never used for imaging, lasers, or where the manufacturer requires otherwise. EQ56 program, EQ89 maintenance, EQ93 vocabulary, EQ103 AEM. Death to FDA within 10 work days.`,
      hook: "CMS sets Conditions of Participation; Joint Commission, DNV, ACHC, CIHQ have deemed status. AEM allowed with documented risk assessment, never for imaging or lasers. EQ56 program, EQ89 maintenance, EQ93 vocabulary, EQ103 AEM. FDA reporting 10 work days. If it is not in the CMMS, it did not happen."
    }
  ]
});
