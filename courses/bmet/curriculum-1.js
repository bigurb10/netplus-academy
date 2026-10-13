// BMET Academy curriculum, units 1 to 3. Original teaching content for the AAMI/ACI CABT exam.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " tip line, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Welcome to Healthcare Technology Management", domain: 7,
  blurb: "What a biomed does, how the CABT exam works, and the kit you will use for the labs.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "What a BMET Does", domain: 7, obj: "Career", minutes: 8,
      body: `Somebody has to make sure the infusion pump on the floor delivers what the screen says, that the monitor's alarm sounds when it should, and that the defibrillator works the one time a year it is needed. That somebody is you. This lesson is the shape of the job before any of the theory.

## The department and its names
The department that owns a hospital's medical equipment is usually called **healthcare technology management**, or HTM. Walk the halls of an older building and the same door may say biomedical engineering or clinical engineering. The people are called biomeds, equipment technicians, or by the job title **BMET**, which is biomedical equipment technician. All of those words point at the same work: keeping the machines at the bedside safe, accurate, and running.

## A day on the bench
An associate-level technician is trusted with four kinds of work on day one.

- **Scheduled maintenance**, often called PM: the planned inspection, cleaning, safety test, and performance check a device gets on a calendar, before anything goes wrong.
- **Incoming inspections**: a new device is unpacked, checked against the purchase order, safety tested, function tested, tagged with an asset number, and entered in the records before it ever touches a patient.
- **Minor troubleshooting and repairs**: a pump that will not charge, a lead wire with a break in it, a cart with a dead battery, an alarm nobody can clear.
- **Supporting senior technicians**: holding the other end of the cable, fetching the analyzer, documenting while they work, and learning the devices you are not signed off on yet.

Mixed into all of it are **rounds**: walking the units to look at equipment in place, swap dated accessories, and answer questions before they become work orders.

## Work orders and the CMMS
Every job is a **work order**. It lives in the **CMMS**, the computerized maintenance management system, which is the database holding every device, its history, its schedule, and your write-up. The record is the work. An inspection nobody wrote down cannot be proven, and an unproven inspection is a finding when inspectors visit.

## Who you work with
- **Nurses and therapists**, who use the device and report the problem; they are your best source of what actually happened.
- **IT**, because monitors, pumps, and carts sit on the network now.
- **Facilities**, who own the outlets, the gases, and the building.
- **Vendors and manufacturer field engineers**, for parts, software, and the repairs under contract.
- **Infection prevention**, who decide how a device is cleaned before it reaches your bench and before it returns to the floor.

## The ladder and the places to stand on it
Most shops run BMET I, then BMET II, then BMET III, then a specialist on one equipment family such as imaging or laboratory, then supervisor, then manager. Biomeds work in hospital in-house departments, for an **ISO** (an independent service organization under contract to several facilities), in manufacturer field service on one product line, and in the military, which trains its own.

> Tip: when a question describes a task, ask who owns it. The outlet and the medical gas belong to facilities, the network belongs to IT, the device belongs to you, and the patient belongs to the clinician.`,
      hook: "HTM is the department; biomed, BMET, and clinical engineering are names for the same work. Four duties: scheduled maintenance (PM), incoming inspections, minor troubleshooting and repairs, supporting senior technicians. Every job is a work order in the CMMS. The ladder runs BMET I, II, III, specialist, supervisor, manager."
    },
    {
      id: "u1l2", title: "The CABT Exam and How This Course Works", domain: 7, obj: "Career", minutes: 9,
      body: `You are studying for one specific test, so it pays to know exactly what it looks like before you study a single fact. Here is the exam, then here is the path this course walks you down.

## The exam
The **CABT**, the Certified Associate in Biomedical Technology, is the entry-level credential from **ACI**, the credentials institute inside **AAMI**. It is:

\`\`\`
Questions      100 multiple choice
Time           2 hours, closed book, nothing on the desk
Delivery       live remote proctoring, year-round: webcam, microphone, quiet room
Eligibility    high school junior or above; no degree and no experience required
Fee            $220 member, $270 non-member, non-refundable
Window         six months from purchase to the day you test
Retake         $190 member, $240 non-member, after a 60-day wait
Result         pass or fail on the screen immediately
Validity       5 years, non-renewable
\`\`\`

Six domains divide the questions: Anatomy and Physiology 10%, Medical Devices as Related to Patient Care 23%, Safety in Healthcare 16%, Fundamentals of Electricity and Electronics 14%, Reasoning and Problem Solving 24%, and Healthcare Information Technology 13%. Reasoning and the device domain together are nearly half the test, which is why so much of this course asks you to decide something rather than recall it.

Two of those facts bite people. **Non-renewable** means the associate credential expires in five years and cannot be renewed, so plan your next exam inside that window. And the **60-day wait** plus a new fee is the cost of walking in unprepared.

## How this course works
The stages run in order, and each one unlocks the next.

1. **The memorization sheet.** Numbers, ranges, limits, and formulas. Read it first, on day one, before you understand any of it. The rest of the course keeps pointing back at it.
2. **The starter test.** A short test that finds out what you already know and suggests where to begin.
3. **The tutorial.** The lessons, unit by unit, each with a deeper explanation behind it, five or more questions, and a checkpoint at the end of the unit. Some lessons carry a hands-on **lab**.
4. **The 50-question test.** Half the length of the real exam, 60 minutes, graded at 80% here because you train above the line, not at it.
5. **Retraining.** Every topic you miss comes back as a short drill, a lesson to reread, or an extended set of questions.
6. **Practice tests** until 3 of your last 5 reach 80%.
7. **The official-format test:** 100 questions in 120 minutes, scored at the real exam's 70%. Pass it once and that pass is permanent.
8. **Ready.** The certificate of completion needs all three: every lesson finished, every lab finished, and the official-format test passed.

> Tip: the exam gives you an on-screen four-function calculator and nothing else. Practice the arithmetic in this course without a phone so the real thing feels normal.`,
      hook: "CABT: 100 questions, 2 hours, closed book, remote proctored year-round, high school junior or above. $220 member and $270 non-member, retake $190 and $240 after a 60-day wait, six months to test, pass or fail immediately, valid 5 years and non-renewable. Course path: sheet, starter test, lessons and labs, 50-question test, retraining, practice until 3 of the last 5 hit 80%, then the official-format test at 70%."
    },
    {
      id: "u1l3", title: "Your Lab Kit and Your First Measurements", domain: 7, obj: "Career", minutes: 10, lab: "kit-setup",
      body: `Reading about electricity teaches you the words. Putting probes on a part teaches you the job. This course has a virtual multimeter built in, and if you also buy about forty dollars of parts you can do every lab for real on your own bench.

## The kit
- **Digital multimeter** with test leads. The one tool a biomed carries every day.
- **Solderless breadboard** and **jumper wires**: a board full of spring clips that lets you build a circuit without soldering.
- **Resistor assortment**: parts that limit current. Get at least 100, 220, 470, 1k, 2.2k, and 10k ohm values.
- **A few capacitors**: parts that store charge.
- **9 V battery and a battery clip**: your power source, small enough to be harmless.
- **LEDs**, red and green: little lights that only work one way round.
- **A slide switch**: makes and breaks a path.
- **A fuse holder with a 1 A fuse**: the sacrificial part that opens before something expensive does.

Resistors carry their value as color bands; the memorization sheet's band table decodes them (brown, black, red, gold is 1,000 ohm at 5%), and the lab asks you to read one.

## The meter, one control at a time
- The **dial** picks what the meter measures: V DC for steady voltage, V AC for wall voltage, Ohms for resistance, continuity for "is this one piece of wire", A DC for current, and on many meters a diode test.
- The **jacks**: the black lead always goes in **COM**, the common jack. The red lead goes in the **V/ohm** jack for voltage, resistance, continuity, and the diode test, and moves to the **amps** jack only when you measure current. Moving that one lead is the step people forget.
- **Auto range** means the meter picks the scale itself; you just read the number and the unit on the display.
- **OL** on the display means over limit: the value is beyond the range, which is what an open circuit or a broken wire looks like on ohms.
- A **minus sign** is not an error. It means the red probe is on the more negative point. Swap the probes and the sign goes away.

## Two rules that save meters and fingers
1. **Never measure ohms on a powered circuit.** The meter measures resistance by pushing its own tiny current through the part. Any outside voltage makes the reading meaningless and can damage the meter.
2. **Never put the meter on amps across a source.** On the amps range the meter is almost a plain piece of wire. Across a battery or an outlet that is a dead short, and the best case is a blown fuse inside your meter.

## How a lab card works
The virtual meter does exactly what the kit does. Each lab shows a drawing with named **test points**, a power switch for the circuit, and a list of tasks. You click the red probe's point, then the black probe's, read the display, type the number, and press **Record**. **Check** grades the card, tells you why each answer is right, and lets you retry a task or redo the whole lab. Using real parts instead? Tick the box and type what your own meter shows; the accepted ranges allow for real-world tolerance. Your first lab measures a 9 V battery and one loose resistor, which is the smallest possible version of everything that follows.

> Tip: say the setup out loud before you touch anything: what am I measuring, where do the probes go, and is the power meant to be on or off. Ohms and continuity are always off.`,
      hook: "Kit: multimeter, breadboard and jumpers, resistors, a few capacitors, 9 V battery and clip, LEDs, a slide switch, a fuse holder with a 1 A fuse. Black lead in COM always; red in V/ohm except for current, when it moves to the amps jack. OL means over limit. Two rules: never ohms on a live circuit, never amps across a source."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Anatomy, Physiology, and Medical Terminology", domain: 1,
  blurb: "The body systems your equipment watches and supports, the normal numbers, and the words clinicians use to describe both.",
  assumes: "Nothing. No biology background needed.",
  lessons: [
    {
      id: "u2l1", title: "Body Organization, Directions, and Word Parts", domain: 1, obj: "A&P-A", minutes: 9,
      body: `You will never diagnose anybody. You will still spend every day around people who describe the body in a particular vocabulary, and around devices named after the parts they watch. Learn the map and the word parts and the whole rest of the course reads easier.

## How the body is built up
Four levels, smallest to largest:

- **Cells** are the living building blocks.
- **Tissues** are sheets or bundles of one kind of cell doing one job: lining, support, muscle, nerve.
- **Organs** are structures built of several tissues with a purpose: heart, lungs, brain, kidney, skin.
- **Systems** are groups of organs that work together.

The systems this course names are the **circulatory** system (heart, vessels, blood), the **respiratory** system (airway and lungs), the **nervous** system (brain, spinal cord, nerves), the **digestive** system (the tube from mouth to the other end, plus liver and pancreas), the **urinary** system (kidneys and bladder), the **endocrine** system (glands and hormones), the **musculoskeletal** system (the skeletal system of bones and joints plus the muscular system that moves them), the **lymphatic system** and the **immune system** it carries (lymph vessels, lymph nodes, spleen, white cells), and the **skin**, also called the **integumentary system**.

## Systems do not work alone
A patient's oxygen number depends on all of them at once. The lungs load oxygen onto the blood, the heart pushes that blood to the tissues, the brainstem sets the breathing and the heart rate, the kidneys keep the fluid balance that gives the heart something to pump, and the skin is the surface your sensor sticks to. When a monitor shows a bad number, the cause can sit in any of those links, which is also why one patient is wired to several of your devices at once. Holding temperature, pressure, fluid, and chemistry inside a narrow band has a name, **homeostasis**, and most alarms announce either that the body has lost that balance or that the device helping it hold the balance has stopped.

## Directions: the words on every label and report
\`\`\`
anterior / posterior   front / back               the breastbone is anterior, the spine is posterior
superior / inferior    above / below              the head is superior to the chest
medial / lateral       toward / away from middle  the nose is medial, the ears are lateral
proximal / distal      near / far from the trunk  the elbow is proximal to the wrist
supine / prone         face up / face down        most patients on a table lie supine
\`\`\`

These matter to you in practical ways: a probe placed more **distal** means farther out the limb, a cuff goes on the upper arm **proximal** to the elbow, and a patient lying **prone** changes where every cable can safely run.

## Word parts: a decoder for terms you have never seen
Most medical words are a **root** (the body part) with a **prefix** (in front) or a **suffix** (on the end).

- Prefixes: **brady-** slow, **tachy-** fast, **hyper-** high or too much, **hypo-** low or too little, **a-** and **an-** without, **dys-** difficult or painful.
- Roots: **cardio** heart, **pulmo** and **pneumo** lung, **nephro** and **reno** kidney, **neuro** nerve, **gastro** stomach, **derm** skin, **hemo** blood.
- Suffixes: **-itis** inflammation, **-ectomy** surgical removal, **-oscopy** looking inside, **-graphy** the process of recording, **-gram** the record itself, **-emia** a condition of the blood.

Assemble them and unfamiliar words decode themselves. Tachycardia is a fast heart. Hypoxemia is too little oxygen in the blood. Electrocardiography is the process that produces the electrocardiogram, which is why one of your devices is a recorder and its output is a strip of paper.

> Exam tip: word-part questions are free points, so break the term in half before you look at the options. For direction questions, the trunk is the reference: proximal is toward it, distal is away from it.`,
      hook: "Cells, tissues, organs, systems. Anterior front, posterior back, superior above, inferior below, medial toward the middle, lateral away, proximal near the trunk, distal far, supine face up, prone face down. Brady slow, tachy fast, hyper high, hypo low; -itis inflammation, -ectomy removal, -graphy the recording process, -gram the record, -emia in the blood."
    },
    {
      id: "u2l2", title: "The Heart, Circulation, and the Numbers a Monitor Shows", domain: 1, obj: "A&P-B", minutes: 10,
      body: `More of your equipment is built around the heart than around any other organ. Understand the pump and its wiring and the ECG monitor, the blood pressure cuff, and the defibrillator all stop being mysterious.

## The pump
The heart has **four chambers**. The two small upper ones are **atria** and the two large lower ones are **ventricles**. The right side sends blood **to the lungs**; the left side sends it **to the body**. Blood returning from the body enters the right atrium, drops into the right ventricle, and is pumped to the lungs to pick up oxygen. It comes back into the left atrium, drops into the left ventricle, and is pumped out to everything else. The left ventricle is the thickest muscle in the heart because it does the longest push.

**Valves** sit between the chambers and at each exit, and they are one-way doors. They open to let blood through and snap shut so it cannot wash back. A valve that leaks or will not open is why an operating room needs a heart-lung machine.

## The wiring
Every beat starts as a tiny electrical signal.

1. The **SA node** in the right atrium fires on its own. It is the natural pacemaker and it sets the rate.
2. The atria squeeze. On the tracing that is the small **P wave**.
3. The **AV node** holds the signal back for a fraction of a second so the ventricles can fill.
4. The ventricles squeeze. That is the tall spike, the **QRS complex**, and it is what a monitor counts to show a heart rate.
5. The ventricles recover. That is the **T wave**.

An **ECG** records this from electrodes on the skin. It reads the heart's electricity, nothing else, which is why a loose electrode looks like a rhythm problem.

## The numbers
One **cardiac cycle** is the whole round trip: atrial contraction, then ventricular contraction, then the refill before the next beat. Every number below is a measurement of that cycle.

- **Systole** is the squeeze and **diastole** is the refill. Blood pressure quotes both: about **120/80 mmHg** in an adult, the systolic over the diastolic.
- **MAP**, the mean arterial pressure, is the average pressure over a whole beat: diastolic plus one third of the gap between the two numbers. For 120/80 that is 80 + 40/3, about 93 mmHg. An automatic cuff measures this value most directly and calculates the other two from it.
- **Heart rate** at rest is **60 to 100** beats per minute. Below 60 is **bradycardia**; above 100 is **tachycardia**.

## The pipes and what flows in them
**Arteries** carry blood away from the heart under pressure, which is why they are thick-walled and why an arterial line has a pressure waveform. **Veins** return it at low pressure. **Capillaries** are the thin-walled vessels in between where oxygen crosses into tissue. Blood itself is **plasma**, the liquid, carrying **red cells** that hold oxygen on **hemoglobin**, **white cells** that fight infection, and **platelets** that clot.

Three of your devices read this one system: the **ECG** reads its electricity, **NIBP** squeezes an artery shut and listens for the pressure where flow returns, and **pulse oximetry** shines light through a finger to see how much oxygen the hemoglobin is carrying.

> Exam tip: keep the two rhythm facts straight. The P wave is the atria, the QRS is the ventricles, and a monitor's heart rate comes from counting QRS complexes.`,
      hook: "Four chambers, one-way valves; right side to the lungs, left side to the body. SA node fires, P wave is the atria, AV node delays, QRS is the ventricles, T wave is recovery. Systole over diastole, about 120/80; MAP = diastolic + (systolic minus diastolic)/3; rate 60 to 100, bradycardia below, tachycardia above. ECG reads electricity, NIBP reads pressure, pulse oximetry reads oxygen on hemoglobin."
    },
    {
      id: "u2l3", title: "The Lungs and Breathing", domain: 1, obj: "A&P-A", minutes: 9,
      body: `Breathing moves two gases in opposite directions, and a whole shelf of your equipment exists to help with it or to measure it. The lungs are also the system where a device failure becomes an emergency fastest.

## The path air takes
Air enters the nose or mouth, passes the throat, and goes down the **trachea**, the stiff ringed tube in the front of the neck. The trachea splits into two **bronchi**, one per lung, and those split again and again like an upside-down tree until the smallest branches end in **alveoli**: millions of tiny sacs, each wrapped in capillaries. The wall between a sac and a capillary is thin enough for gas to cross. That is where the actual work happens.

Below the lungs sits the **diaphragm**, a dome of muscle. When it contracts and flattens, the chest gets bigger, pressure inside drops, and air flows in. Relax it and air flows out. Normal breathing is pulled in, not pushed, which is exactly backwards from how a ventilator works: a ventilator pushes air in under positive pressure.

## Two gases, two directions
Oxygen crosses from the alveoli into the blood, and **carbon dioxide** crosses out of the blood into the alveoli to be breathed away. Carbon dioxide is the waste product of every cell, and the body is fussier about getting rid of it than people expect.

This gives you two different ideas that sound the same:

- **Ventilation** is moving air in and out. The measure of it is breathing rate and volume, and the number that reflects it is the exhaled carbon dioxide.
- **Oxygenation** is getting oxygen onto the blood. The measure of it is the oxygen saturation.

A patient can be oxygenated and still not ventilating, which is why a monitor watches both.

## The numbers
\`\`\`
Respiratory rate     12 to 20 breaths per minute (adult, at rest)
SpO2                 95 to 100%
EtCO2                35 to 45 mmHg
Tidal volume         about 500 mL per breath at rest
\`\`\`

**SpO2** is the oxygen saturation a pulse oximeter reads. **EtCO2** is the carbon dioxide measured at the very end of a breath, which is the closest a sensor at the mouth can get to what is in the blood. **Tidal volume** is the size of one ordinary breath.

## The devices on this system
- **Ventilator**: pushes measured breaths into a patient who cannot breathe enough alone.
- **Oxygen concentrator**: pulls nitrogen out of room air to deliver oxygen-rich gas without a cylinder.
- **Suction**: negative pressure to clear fluid out of an airway.
- **Capnograph**: measures the carbon dioxide in exhaled gas and reports EtCO2 with a waveform.
- **Pulse oximeter**: a red and infrared light clipped on a finger or ear to report SpO2 and pulse rate.
- **Nebulizer**: turns liquid medication into a mist to be breathed in.
- **Spirometer**: measures how much air a patient can move and how fast, used for testing rather than treatment.

> Exam tip: memorize the four numbers above as a block. Questions often give you one reading out of range and ask which device reported it: 92% is the oximeter, 55 mmHg is the capnograph, 28 breaths a minute is the monitor or the ventilator.`,
      hook: "Airway: trachea, bronchi, alveoli, with the diaphragm pulling air in. Oxygen in, carbon dioxide out. Ventilation is moving air; oxygenation is loading oxygen. Respiratory rate 12 to 20, SpO2 95 to 100%, EtCO2 35 to 45 mmHg, tidal volume about 500 mL. Devices: ventilator, oxygen concentrator, suction, capnograph, pulse oximeter, nebulizer, spirometer."
    },
    {
      id: "u2l4", title: "The Nervous System and the Brain", domain: 1, obj: "A&P-B", minutes: 8,
      body: `The nervous system runs on electricity, in tiny amounts, which makes it the system a biomed should respect most. It is the reason a shock hurts, the reason one frequency of alternating current is more dangerous than others, and the reason several of your devices either listen to electrical signals or supply them.

## Two halves
- The **central nervous system** is the brain and the spinal cord: the processor and the main cable.
- The **peripheral nervous system** is every nerve that branches off, out to muscle, skin, and organs.

The wire in both halves is the **neuron**, one nerve cell that passes a signal along as a travelling change in charge and hands it to the next cell at a junction. **Sensory receptors** in the skin, the muscles, and the organs start those signals, and muscles and glands are where they end. A nerve is a bundle of nerve fibers (axons), which is why a device that stimulates a nerve reaches many cells at once.

## Parts of the brain worth knowing
- The **cerebrum** is the big wrinkled top: thinking, speech, decisions, and voluntary movement.
- The **cerebellum** sits underneath at the back and handles balance and smooth coordination.
- The **brainstem** connects the brain to the spinal cord and runs the things nobody chooses: **breathing and heart rate**. Damage here is why a patient ends up on a ventilator.
- The **spinal cord** carries signals both ways inside the backbone, and **nerves** fan out from it.
- A **reflex** is the shortcut: the signal reaches the spinal cord and comes straight back out as movement without waiting for the brain. That is why a hand pulls off a hot pan before you notice it is hot.

## Why this is the safety lesson in disguise
Nerves signal by moving charge, and muscles contract when a nerve tells them to. An outside current does the same thing, whether the body asked for it or not. That is the whole of electrical shock: outside current forcing nerves and muscles to fire.

Two consequences follow:

- Muscles clamp. At roughly **10 to 20 mA** through the body a person cannot let go of what they are holding, because the muscles that grip are stronger than the ones that release.
- The heart is a muscle driven by its own electrical timing, and **60 Hz** wall power happens to reverse direction at close to the worst possible rate for it. A current large enough to interfere can leave the heart quivering instead of beating.

The numbers behind those sentences come later in the safety unit; what you need here is why the body is vulnerable at all. The answer is that your equipment and the patient both run on electricity.

## Devices on this system
At the level of recognizing what they are for:

- **EEG**: records the brain's electrical activity from electrodes on the scalp, in microvolts, which is far smaller than an ECG signal and therefore far fussier about electrode contact and interference.
- **Nerve stimulators**: deliver a small controlled pulse to a nerve, used in surgery and in testing.
- **TENS**: a small unit that sends mild pulses through skin electrodes to reduce pain.
- **Evoked-potential monitors**: supply a stimulus (a click, a flash, a pulse) and record the much smaller response from the nervous system, averaged over many repetitions to dig it out of the noise.

> Exam tip: brainstem equals breathing and heart rate; cerebellum equals balance and coordination; cerebrum equals thinking and voluntary movement. If a question involves the smallest signals and the fussiest electrodes, it is the EEG.`,
      hook: "Central nervous system is brain and spinal cord; peripheral is the nerves. Cerebrum thinks, cerebellum balances, brainstem runs breathing and heart rate, reflexes turn around at the spinal cord. Nerves and muscles answer to outside current, which is why 10 to 20 mA locks a hand shut and 60 Hz is dangerous to the heart. Devices: EEG, nerve stimulators, TENS, evoked-potential monitors."
    },
    {
      id: "u2l5", title: "Kidneys, Blood, Skin, Digestion, and Hormones", domain: 1, obj: "A&P-B", minutes: 9,
      body: `Four more systems, each with equipment attached. None of them need depth; they need the one idea per system that explains the devices.

## Kidneys and the urinary system
Two kidneys filter the entire blood supply over and over, pulling out **urea** and the rest of the body's waste along with extra water and sending it on as urine through the ureters to the bladder. Each kidney does that with about a million microscopic filters called **nephrons**, which is why kidney disease usually shows up as a gradual loss of filtering rather than an on-or-off failure. They also hold the body's water, salt, and acid balance steady. When kidneys fail, a **dialysis** machine does the filtering instead: blood out of the patient, through a filter, and back. That machine is a water treatment plant, a pump, a heater, and a set of alarms, and it is one of the most heavily maintained devices in a hospital. A **bladder scanner** uses ultrasound to measure how much urine is left behind without a catheter.

## Blood
An adult carries roughly five liters of blood. Lose enough of it and pressure falls no matter how well the heart works. Blood comes in types, **A, B, AB, and O**, each either positive or negative, and the type must match before a transfusion. Type O negative is the one most often given when there is no time to check. For you, blood matters two ways: the devices that warm it, pump it, and spin it in the laboratory, and the fact that every patient's blood is treated as infectious.

## Skin
Three layers: the **epidermis** on the outside, the **dermis** underneath with the blood vessels and nerves, and the **subcutaneous** fat below that. Skin is a barrier against infection, a thermostat whose **sweat glands** and flushing shed heat as part of the body's **thermoregulation**, a sense organ, and the place the body makes **vitamin D** in sunlight.

Skin is also an electrical component. Dry, intact skin is a good insulator, roughly **100,000 ohm** between two points on the body. Wet it with sweat, water, or electrode gel and that can fall toward **1,000 ohm**. The same 120 V is a hundred times more dangerous against wet skin, which is the single most useful safety fact in this course. It also explains your devices: an **electrode** deliberately lowers skin resistance with gel so a tiny signal can get out, an electrosurgical return pad or a warming blanket can **burn** skin if the heat or current concentrates, and a cuff, a probe, or a mattress left in one place too long causes a **pressure injury**.

## Digestion
A long tube: mouth, esophagus, stomach, small intestine, large intestine, with the liver adding **bile** to break up fat and the pancreas adding digestive enzymes. Food is broken down and absorbed, and what is left is waste. The devices are **feeding pumps** that deliver formula into the stomach or intestine, **suction** to remove fluid, and **endoscopes**, flexible cameras that let a clinician look inside the tube and work through it.

## Hormones
The **endocrine** system is a set of glands (pancreas, thyroid, adrenals, pituitary) that release **hormones** into the blood as chemical messages. Slower than nerves, but they reach everywhere. The one you will meet constantly is **insulin** from the pancreas, which lets cells take up **glucose** from the blood. Too little insulin and blood sugar climbs. Hence **glucometers**, the handheld meters that read a drop of blood, and **insulin pumps**, which deliver tiny continuous doses.

The thyroid sets the body's metabolic speed, which includes body temperature. Normal core temperature is **37 C**, which is 98.6 F.

> Exam tip: the skin resistance pair, about 1,000 ohm wet against about 100,000 ohm dry, shows up in both the anatomy and the electricity questions. Learn it once and you answer it in both places.`,
      hook: "Kidneys filter blood and make urine; dialysis replaces them. About five liters of blood, types A, B, AB, O with positive or negative. Skin is epidermis, dermis, subcutaneous: barrier, thermostat, and an insulator worth about 100,000 ohm dry but near 1,000 ohm wet. Digestion means feeding pumps, suction, endoscopes. Endocrine means hormones; insulin moves glucose, so glucometers and insulin pumps. Normal temperature 37 C."
    },
    {
      id: "u2l6", title: "Vital Signs and the Device That Measures Each", domain: 1, obj: "A&P-A", minutes: 8,
      body: `A vital sign is one of the handful of numbers that say how a patient is doing right now. Clinicians read them constantly, and most of the equipment you will touch in your first year measures one of them. This lesson ties each number to its device and to the thing that most often makes it wrong.

## The numbers and the boxes
\`\`\`
Vital sign          Normal adult at rest      Measured by
Heart rate          60 to 100 beats/min       ECG monitor, pulse oximeter, NIBP module
Respiratory rate    12 to 20 breaths/min      monitor impedance channel, capnograph
Blood pressure      about 120/80 mmHg         NIBP cuff, or arterial line and transducer
SpO2                95 to 100%                pulse oximeter
Temperature         37 C (98.6 F)             electronic thermometer, monitor probe, infrared
EtCO2               35 to 45 mmHg             capnograph
Pain                0 to 10, patient reported  no device: the patient's own answer
\`\`\`

Pain is on the list of things measured at the bedside and it is the one with no instrument. That is worth remembering, because a question that asks which vital sign has no sensor has exactly one answer.

## Where the sensors go
- **ECG electrodes**: on prepped skin over bone or firm tissue, not over a moving muscle, and in the arrangement the monitor expects for three or five leads.
- **NIBP cuff**: upper arm, snug, with the bladder centered over the artery and the arm supported at heart level.
- **SpO2 probe**: a finger, toe, or ear, with the two **LEDs** on one side and the **photodiode** that detects their light facing them through the tissue.
- **Temperature probe**: the site the probe type is made for, oral, axillary, or rectal, with the right cover.
- **Capnography sampling line**: in the breathing circuit for an intubated patient, or a nasal cannula for a patient breathing on their own.

## The errors you will be called about
Most vital-sign calls are not broken equipment. They are physics meeting a real patient.

- **Wrong cuff size.** A cuff too small for the arm reads high; too large reads low. The bladder should wrap about 80% of the arm.
- **Motion.** A shivering or restless patient defeats both the oximeter and the cuff. The oximeter looks for a pulse-shaped change in light, and movement looks the same.
- **Cold fingers and poor circulation.** No pulsing blood at the probe means no SpO2 reading, and the display says so with a weak or missing signal indicator. Nail polish and bright overhead light cause the same complaint.
- **Loose or dried-out electrodes.** The classic false alarm: an electrode that has lifted shows a flat line or a lead-off message, and it gets reported as "the monitor says the patient has no heartbeat".
- **Mouth breathing on a nasal capnography cannula.** The exhaled gas misses the sample port, so EtCO2 reads far too low on a patient who is breathing perfectly well.

The right first move for all of these is the same: look at the patient and the sensor before you suspect the box. If the patient looks fine and the sensor is wrong, the sensor is the fault.

> Exam tip: when a reading is impossible but the patient is comfortable, suspect the interface, not the instrument: the electrode, the probe, the cuff, the line, or the site.`,
      hook: "Heart rate 60 to 100, respiratory rate 12 to 20, blood pressure about 120/80 mmHg, SpO2 95 to 100%, temperature 37 C, EtCO2 35 to 45 mmHg, pain 0 to 10 with no device. Errors: wrong cuff size (small reads high), motion, cold fingers, loose electrodes, mouth breathing on a nasal capnography line. Check the patient and the sensor before the monitor."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Electricity and Electronics", domain: 4,
  blurb: "Current, voltage, resistance, Ohm's law, circuits, components, and wiring, each one measured on the meter rather than taken on faith.",
  assumes: "The meter basics from unit 1: the dial, the jacks, OL, and the two safety rules.",
  lessons: [
    {
      id: "u3l1", title: "Charge, Current, Voltage, and Resistance", domain: 4, obj: "E&E-D", minutes: 9,
      body: `Three quantities explain almost every electrical fault you will ever chase. Learn what each one is, what it is measured in, and how a meter gets at it, and the rest of this unit is arithmetic.

## What is actually moving
Everything is made of atoms, and every atom has **protons** in its core and **electrons** around the outside. Equal numbers of each make an atom electrically neutral, and electricity is what happens when electrons leave that balance. In some materials those outer electrons are loosely held and can drift from atom to atom. Those materials are **conductors**: copper and silver are the best common ones, which is why wire is copper and the best contacts are silver plated. In other materials the electrons are locked in place, so nothing drifts. Those are **insulators**: rubber, glass, plastic, air, and dry skin.

Nothing useful happens until something pushes the electrons along.

## The three quantities
- **Current**, written out as **electric current**, is the flow: how many charges pass a point each second. It is measured in **amps** (A) and the symbol in formulas is **I**. One amp is one **coulomb** of charge, a fixed and very large number of electrons, passing each second. Small currents are written in **mA** (thousandths of an amp) and **microamps** (millionths).
- **Voltage** is the push: the difference in electrical pressure between two points. It is measured in **volts** (V) and the symbol is **V**. Voltage always exists **between** two places, never at one, which is why a meter reading needs two probes.
- **Resistance** is the opposition: how hard the material makes it for current to flow. It is measured in **ohms** and the symbol is **R**. Large resistances are written in **kohm** (thousands) and **Mohm** (millions).

The part that supplies resistance on purpose is a **resistor**. **Fixed resistors** carry a printed value, with one band or marking for the **resistor tolerance**, meaning how far from that value the part is allowed to be. **Variable resistors** are adjustable: a **potentiometer** has three legs and works as an adjustable divider, which is what a volume knob and a calibration trimmer are, and a **rheostat** has two and is wired to set a current.

## The water picture
Think of a hose fed by a tank.

\`\`\`
voltage      the water pressure behind the nozzle
current      the gallons per minute actually flowing
resistance   how narrow the hose is
\`\`\`

Raise the pressure and more flows. Pinch the hose and less flows. Pressure can sit there with nothing flowing at all, which is exactly what an unplugged outlet does: 120 V present, zero current, nothing happening until a path exists.

## How you measure each one
This is the part people get wrong, and the drawing in the lab makes it obvious.

- **Volts across.** Put the two probes on two points with the power **on**. You are comparing them.
- **Amps in series.** Break the circuit and put the meter **in** the gap so the current has to flow through it, with the power **on**. The red lead moves to the amps jack.
- **Ohms with no power.** The meter supplies its own tiny current, so the part must be dead and ideally disconnected at one end. Other parts still wired in parallel pull the reading low.

## Ground
**Ground** is the reference point everything else is measured against, the zero of the system. It is also a safety path: in a grounded device the metal case is wired back to the third pin on the plug, so if a wire inside comes loose and touches the case, current rushes to ground, the breaker trips, and nobody standing beside it becomes the path instead. Those two jobs, zero reference and safety return, are why ground comes up in every chapter after this one.

> Exam tip: amps through, volts across, ohms unpowered. If a question describes a meter reading that makes no sense, check which of those three rules was broken.`,
      hook: "Electrons drift in conductors (copper, silver) and not in insulators (rubber, glass, plastic, dry skin). Current is flow in amps (I), voltage is push in volts (V), resistance is opposition in ohms (R); mA and microamps, kohm and Mohm. Water analogy: pressure, flow, narrowness. Volts across with power on, amps in series with power on, ohms with power off. Ground is both the zero reference and the safety path."
    },
    {
      id: "u3l2", title: "Ohm's Law and Power", domain: 4, obj: "E&E-A", minutes: 10, lab: "dmm-ohms",
      body: `One equation ties the three quantities together, and a second one tells you how much heat the circuit makes. Between them they answer most of the numeric questions on the exam and explain why electricity is dangerous.

## Ohm's law
\`\`\`
V = I x R        volts  = amps x ohms
I = V / R        amps   = volts / ohms
R = V / I        ohms   = volts / amps
\`\`\`

The triangle trick: write V on top with I and R side by side underneath. Cover the one you want and the other two show you the operation. V over something means divide; two values side by side means multiply.

Worked example: 12 V across 4 ohm. Cover I, and you are left with V over R: 12 / 4 = **3 A**.

## Power
Power is the rate at which electrical energy turns into heat, light, or motion. It is measured in **watts**.

\`\`\`
P = V x I            the one to reach for first
P = I squared x R    when you know current and resistance
P = V squared / R    when you know voltage and resistance
\`\`\`

Same example: 12 V at 3 A is 12 x 3 = **36 W**.

Power ratings matter because every resistor is also a small heater. A common hobby resistor is rated a **quarter watt**. Ask it for more and it discolors, drifts, and eventually opens. In your lab, 9 V across 470 ohm draws about 19 mA and dissipates about 0.17 W, comfortably under the rating. Drop the resistor to 47 ohm and the same battery asks for 1.7 W, seven times the rating, and the part cooks.

## Why Ohm's law is the safety lesson
Current is what injures people, and Ohm's law says what sets the current: the voltage available and the resistance in the path. The voltage of an outlet is fixed at 120 V. The variable is **you**.

\`\`\`
Dry, intact skin     about 100,000 ohm    120 V / 100,000 = about 1 mA   a tingle
Wet or broken skin   about 1,000 ohm      120 V / 1,000  = 120 mA        likely fatal
\`\`\`

Nothing about the outlet changed. Sweat, a spilled bag of saline, a cut on your thumb, or a gel-covered electrode changed the denominator, and the current went up a hundredfold. That is the entire argument for dry hands, intact gloves, and keeping liquids off the bench.

## A circuit worked end to end
A 9 V battery and one 470 ohm resistor in a loop:

1. Current: I = V / R = 9 / 470 = **0.019 A**, which is 19 mA.
2. Power in the resistor: P = V x I = 9 x 0.019 = **0.17 W**.
3. Check it the other way: P = V squared / R = 81 / 470 = 0.17 W. The two agree, so the arithmetic is sound.

In the lab you measure the voltage and the current on that exact circuit, then compute R and P from your own readings instead of trusting the color bands. When a measured R lands within a few percent of the printed value, you have proved both the law and your technique.

> Exam tip: convert to plain amps, volts, and ohms before you divide. 470 ohm and 19 mA is 0.019 A, not 19, and that one slip turns 470 ohm into 0.47 ohm.`,
      hook: "V = I x R, I = V / R, R = V / I; P = V x I, P = I squared x R, P = V squared / R. 12 V across 4 ohm is 3 A and 36 W. Quarter-watt resistors cook if asked for more. Body resistance about 100,000 ohm dry gives about 1 mA from 120 V; about 1,000 ohm wet gives 120 mA. Convert mA to amps before dividing."
    },
    {
      id: "u3l3", title: "Series and Parallel Circuits", domain: 4, obj: "E&E-E", minutes: 10, lab: "series-parallel",
      body: `There are only two ways to connect two parts: one after the other, or side by side. Every circuit you meet is a mix of those two, called a **combination circuit**, and each of the two has its own set of rules.

## Series: one path
Parts in **series** sit in a single loop, so the current has nowhere else to go.

- **Current** is the same everywhere in the loop.
- **Voltage** divides between the parts, and the drops add up to the source.
- **Resistance** adds: R total = R1 + R2 + R3. That total is the **equivalent resistance**, the single resistor that would behave the same way.
- **One part opening stops everything.**

Example: 9 V with 220 ohm and 470 ohm in series. Total resistance is 690 ohm, so the current is 9 / 690 = 0.013 A. Across the 220 ohm that is 0.013 x 220 = 2.87 V; across the 470 ohm, 0.013 x 470 = 6.13 V. The two drops add to 9.0 V, the source. The bigger resistor always takes the bigger share.

That last rule is why a **fuse** goes in series: when it opens, everything downstream stops. It is also why an old string of holiday lights wired in series went completely dark when a single bulb failed.

## Parallel: more than one path
Parts in **parallel** are connected across the same two points, so each one sees the whole voltage.

- **Voltage** is the same across every branch.
- **Current** divides, and the branch currents add up to the total.
- **Resistance total is less than the smallest branch.** For exactly two **parallel resistors**, use product over sum: (R1 x R2) / (R1 + R2).
- **One branch opening leaves the others working.**

Example: 9 V across 220 ohm and 470 ohm in parallel. The 220 ohm branch draws 9 / 220 = 0.041 A and the 470 ohm branch draws 9 / 470 = 0.019 A, so the feed carries 0.060 A. Total resistance is 9 / 0.060 = 150 ohm, which is indeed below 220. Product over sum agrees: (220 x 470) / 690 = 150 ohm.

## The voltage divider
Two resistors in series across a supply give you a smaller voltage at the point between them, in proportion to the resistances. In the example above, the junction sits 6.13 V above the bottom of the 470 ohm resistor. Circuit boards use dividers everywhere to scale a signal down to something a chip can read, and a drifting divider is a classic cause of a reading that is wrong by a steady percentage.

## Why the hospital is wired in parallel
Every outlet in a room is connected across the same supply, so each one gets the full 120 V and unplugging one device does not kill the others. The same is true inside a device: the boards, the display, and the pump motor hang in parallel off the power supply, each drawing the current it needs at the same voltage. If outlets were in series, a single unplugged pump would darken the ward.

In the lab you build both circuits, measure the two series drops and add them, then measure both branch currents and the feed, and watch the branch currents add up. Seeing it on the display is what makes it stick.

> Exam tip: name the circuit before you calculate. Same current and adding voltages means series. Same voltage and adding currents means parallel. A parallel total below the smallest branch is the sanity check on your arithmetic.`,
      hook: "Series: one path, same current, voltages add, resistances add, one open stops all; a fuse is in series. Parallel: same voltage, currents add, total below the smallest branch, product over sum for two; one branch opening leaves the rest alive. 9 V with 220 and 470 in series gives 13 mA, 2.87 V and 6.13 V. In parallel the branches draw 41 mA and 19 mA for 60 mA total and 150 ohm. Outlets and device loads are parallel."
    },
    {
      id: "u3l4", title: "Power Supply, Switch, Load: Reading a Simple Circuit", domain: 4, obj: "E&E-E", minutes: 9,
      body: `A schematic is not a picture of the inside of a device. It is a map of where current can go. Once you can trace a path on paper you can find the one place the path is broken.

## Every circuit has three parts
1. A **source**: the battery, the power supply output, the wall outlet. It provides the push.
2. A **control**: the switch, relay, or transistor that decides whether the path is complete.
3. A **load**: a lamp, a heater, a **DC motor** in a pump, a speaker, or a circuit board that does the work and uses the power.

Add the wires that join them and you have a circuit. If current is not flowing, exactly one of those four things is at fault, and the meter tells you which.

Switches are the control you meet most, and they are described two ways at once. By feel: a **toggle switch** flips, a **rocker switch** tips one end in, a **pushbutton switch** springs back when you let go, and a membrane keypad is a printed version of the same contact. By what the contacts do: a **single-pole switch** breaks one conductor while a **double-pole switch** breaks two at once, which is how a mains switch opens hot and neutral together, and a **single-throw switch** has one on position while a **double-throw switch** moves its common contact between two outputs.

## Symbols to recognize on sight
\`\`\`
cell             one long line and one short line; the long line is positive
battery          several cells stacked, long and short alternating
resistor         a zigzag, or a plain rectangle on newer drawings
lamp             a circle with an X or a loop inside
switch           a line lifted away from a contact
fuse             a loop, or an S, between two terminals
circuit breaker  a switch with a small hook or an arc through it
capacitor        two parallel plates; a curved plate means polarized, so it goes in one way
inductor         a series of loops or humps, like a coil of wire
transformer      two coils facing each other, often with lines between them for the core
diode            a triangle pointing into a bar; current flows the way the triangle points
LED              the same triangle and bar with two small arrows coming off it
ground           three horizontal lines, each shorter than the one above
chassis ground   a small hatched bracket or rake
\`\`\`

## Crossing versus joining
Two lines that cross with **no dot** are two wires passing each other with no connection. A **dot** at the junction means they are joined. Older drawings used a little hop over the crossing wire to say the same thing. Misreading a dot is how a beginner sees a short that is not there.

## Following the power path
This is the single most useful skill in the unit. A device is dead; trace the path in order and measure at each step.

1. **The outlet** and the cord. Is there voltage at the receptacle, and is the cord intact at both ends?
2. **The plug and the inlet.** Many devices have a detachable cord that works loose.
3. **The fuse** or breaker. Measure across it: a good fuse has almost no voltage across it, an open one has all of it.
4. **The switch.** Across a closed switch you should read almost nothing; the full supply voltage across it means it is open.
5. **The power supply.** Does its output rail read the voltage printed beside it?
6. **The load.** If the supply is good and the load does nothing, the fault is in the load or in the wiring to it.

You walk the path until the voltage disappears. The part between the point where it is present and the point where it is gone is the part that is broken.

## Block diagrams
A block diagram drops the symbols and draws each section as a labeled box with arrows for the signal flow: mains in, power supply, controller, display, motor drive, motor. It will not tell you which component failed, but it tells you which section to put the probes in, and it is the first page you should look at in a service manual for a device you have never opened. Signals are drawn flowing left to right and power top to bottom, so read it that way.

> Exam tip: full source voltage across a part that should be a conductor (a fuse, a closed switch, a wire) means that part is open. Near zero volts across it means it is doing its job.`,
      hook: "Source, control, load, and the wires between them. Symbols: battery with the long line positive, resistor zigzag or rectangle, lamp circle with an X, switch lifted line, fuse loop or S, breaker with a hook, capacitor plates (curved means polarized), inductor coils, transformer two coils, diode triangle into a bar, LED with arrows, ground three shrinking lines, chassis a hatched bracket. A dot means joined, no dot means crossing. Trace outlet, cord, plug, fuse, switch, supply, load until the voltage disappears."
    },
    {
      id: "u3l5", title: "Opens, Shorts, Fuses, and Circuit Breakers", domain: 4, obj: "E&E-F", minutes: 10, lab: "open-short",
      body: `Nearly every electrical failure is one of two things: a path that should be complete and is not, or a path that exists where it should not. Learn how each one looks on a meter and you can diagnose a dead device without a manual.

## The open circuit
An **open** is a break: a blown fuse, a switch that will not close, a wire broken inside its insulation, a cold solder joint, a corroded connector pin, a burned-out lamp.

- Resistance across the break is **infinite**, and the meter shows **OL**.
- **No current** flows anywhere in that loop.
- With the power on, the **full source voltage appears across the open**, because no other part has current through it to drop any voltage.

That last point is the one that finds the fault. In a dead loop, put the probes across each part in turn. The part showing the whole supply voltage is the open one. A resistor with 0 V across it is innocent; it simply has no current.

## The short circuit
A **short** is an unintended path of almost no resistance: a solder bridge, a pinched wire against a metal case, a screw dropped on a board, insulation worn through, liquid spilled inside.

- Resistance is **near zero**, so continuity beeps.
- Ohm's law then asks for an enormous current, because the denominator collapsed.
- The result is **heat**: a hot wire, a burned trace, scorched plastic, smoke, fire, and a fuse or breaker opening if the circuit is protected.

A short across a part shows **no voltage** across that part even with the power on, because a near-zero resistance cannot develop a voltage.

## Finding each one
\`\`\`
Fault   Ohms (power off)   Continuity   Volts across it (power on)
open    OL                 silent       the full source voltage
short   near 0 ohm         beeps        about 0 V
good    its rated value    silent       its normal share of the supply
\`\`\`

Work with the power off for ohms and continuity, and isolate at least one end of the part so other parts in parallel do not fool you.

## Fuses
A **fuse** is a deliberate weak link in series with the circuit. Its thin element melts and opens before the wiring, the board, or the transformer is damaged.

- Every fuse carries a **current rating** and a **voltage rating**, and both must match the original.
- **Fast-acting** fuses open almost at once and protect sensitive electronics. **Slow-blow** (time-delay) fuses tolerate a brief inrush, which is what a motor or a transformer draws the instant it is switched on. Fitting a fast fuse where a slow one belongs gives you a device that blows a fuse every time it starts.
- Never replace a fuse with a larger one and never bypass one with a jumper or foil. The fuse is the only thing standing between a fault and a fire.
- **Find the cause first.** A fuse opens for a reason. Clear the short, then fit a new fuse of the same rating, then power up. Replacing the fuse first just destroys the new fuse and teaches you nothing.

## Circuit breakers and GFCI
A **circuit breaker** does the same job as a fuse but resets instead of being replaced; inside, a magnetic or heat-operated mechanism trips the contacts open. A breaker that will not stay set is reporting a fault, not failing.

A **GFCI** protects people rather than wiring. It compares the current going out on the hot conductor with the current coming back on the neutral, and if the two differ, the missing current is leaking somewhere it should not be, possibly through a person. It opens at an imbalance of **4 to 6 mA** under the NFPA 99 requirement for wet locations, far below the current that could stop a heart. That is why a GFCI protects sinks, tubs, and therapy pools, and why its monthly test button matters.

In the lab you meet a dead loop with one open part and one shorted part, and the readings tell you which is which before you touch a tool.

> Exam tip: open means OL on ohms and full voltage across the gap. Short means near 0 ohm, a beep, and no voltage across it. A fuse that blows again immediately means the short is still there.`,
      hook: "Open: infinite resistance, OL, no current, full source voltage across the break. Short: near 0 ohm, beeps, huge current, heat and fire, and no voltage across the shorted part. Ohms and continuity with the power off. Fuses match current and voltage rating, fast or slow-blow, never bypassed, and you find the cause before fitting a new one. Breakers reset. A GFCI compares hot against neutral and opens at 4 to 6 mA under NFPA 99 for wet locations."
    },
    {
      id: "u3l6", title: "DC Versus AC, Transformers, and Wall Power", domain: 4, obj: "E&E-C", minutes: 9,
      body: `There are two kinds of electricity in every hospital room, and the boundary between them sits inside each device's power supply. Knowing which side of that boundary you are probing decides which range the meter goes on.

## DC: steady, one direction
**Direct current** flows one way and holds one value. Batteries make it, and so does the output of every power supply. Circuit boards run on it: 3.3 V, 5 V, 12 V, 24 V. On the meter it is **V DC**, red lead positive and black negative, and a minus sign only means your probes are the other way round.

## AC: reversing
**Alternating current** reverses direction over and over. In the United States, wall power is **120 V at 60 Hz**, meaning it completes 60 full cycles each second. Much of the rest of the world uses **230 V at 50 Hz**.

- **Frequency** is cycles per second, in hertz. **Period** is the time for one cycle, and it is simply 1 divided by the frequency: 1 / 60 = about 16.7 milliseconds. At 50 Hz the period is 20 ms.
- The **120 V** on the label is an **RMS** value, the effective value: the steady DC voltage that would deliver the same heating power. The waveform itself swings higher, peaking near **170 V** in each direction. Your meter shows the effective value; an oscilloscope shows the peaks.

## Why the grid uses AC at all
Because of the **transformer**. Two coils wound on a shared iron core: current changing in one coil creates a changing magnetic field, and that changing field induces a voltage in the other. That is **electromagnetic induction**, and it is the same effect behind a generator and the back voltage a running motor produces. The ratio of turns sets the ratio of voltages. More turns on the output side **steps up** the voltage; fewer turns **steps down**. A 10-to-1 **step-down transformer** fed 120 V delivers 12 V, and a **step-up transformer** does the reverse, which is how the grid carries power at high voltage and low current.

The catch is in the word changing. A transformer only works on AC. Feed it steady DC and you get a brief pulse as you connect it and then nothing but a hot coil. That is why power is generated and distributed as AC and stepped down near the building.

An **isolation transformer** has equal turns, so the voltage comes out the same as it went in. Its purpose is the separation itself: there is no direct connection between the two sides, so the output does not share the building's ground reference. Hospitals use that trick in a few wet and critical areas to reduce the risk from a single fault.

## Inside the power supply
A device that plugs into the wall but runs on DC has to convert, in this order:

1. A **transformer** or a switching stage brings the voltage down.
2. A **rectifier**, usually four diodes arranged as a **bridge rectifier**, flips the negative halves of the wave upward so everything flows one way. That is **full-wave rectification**, and the output is bumpy DC.
3. A **filter capacitor** stores charge on the peaks and releases it in the dips, smoothing the bumps into something steady. What is left of the bumps is called **ripple**, and too much of it is a classic cause of a device behaving strangely under load.
4. A **regulator** holds the output at an exact value as the load changes. A supply built with one is a **regulated power supply**, and its rail should read the printed value whether the device is idle or working hard.

When that whole chain lives in a block on the cord instead of inside the device, it is an **AC adapter**, also called an **AC-to-DC adapter**, or a **wall transformer** if it is one of the old heavy ones. Adapters wander between devices, so match the label and not the plug: the voltage, the polarity, and at least the current rating of the original, because a barrel plug that fits perfectly can still be carrying the wrong voltage.

## The outlet
A standard receptacle has three contacts: the narrow slot is **hot**, the wider slot is **neutral**, and the round hole is **ground**. Hot carries the voltage, neutral is the normal return, and ground is the protective path that only carries current during a fault. A **hospital-grade** receptacle or plug is marked with a **green dot**: it is built to grip the blades harder and to keep its ground connection reliable, and that retention is one of the things an inspection checks.

> Exam tip: three numbers. 120 V 60 Hz in the United States, about 170 V at the peak, and 16.7 ms per cycle. And one rule: transformers do nothing on DC.`,
      hook: "DC is steady and one direction (batteries, supply rails); AC reverses, 120 V 60 Hz in the United States and 230 V 50 Hz elsewhere. Period is 1 over frequency: 16.7 ms at 60 Hz. The 120 V is the RMS or effective value and the waveform peaks near 170 V. Transformers change AC voltage by turns ratio and do nothing on DC; an isolation transformer has equal turns and just separates the sides. Inside a supply: transformer, rectifier diodes, filter capacitor, regulator. Outlet: narrow slot hot, wide slot neutral, round hole ground; hospital grade is marked with a green dot."
    },
    {
      id: "u3l7", title: "Capacitors, Inductors, Diodes, LEDs, and Transistors", domain: 4, obj: "E&E-B", minutes: 9,
      body: `You do not have to design with these parts. You do have to recognize them on a board and on a drawing, know what each one is for, and know which one can still hurt you after the power is off.

## Passive and active
Two words sort the whole parts list. **Passive components** only store, release, or use up what they are handed: resistors, capacitors, inductors, transformers. **Active components** are the semiconductors that steer or enlarge a signal, and most need a supply of their own: diodes, transistors, and the chips built out of them. The distinction is worth having because a board's passive parts usually fail visibly, by burning or leaking, and its active parts usually fail silently.

## Capacitor: stores charge
Two conducting plates separated by an insulator. Apply a voltage and charge piles up on the plates; remove the supply and the charge stays. Capacitance is measured in **farads**, which is a huge unit, so real parts are marked in **microfarads** (millionths) or picofarads. Capacitors smooth a power supply's output, pass signals while blocking steady voltages, and set timing.

The safety point is the one to carry out of this lesson. **A capacitor can hold a dangerous charge long after the device is unplugged.** A defibrillator's capacitor is built to store hundreds of joules and dump them in milliseconds, which is exactly as lethal as it sounds. Before you open anything with a large capacitor, follow the manual's discharge procedure, let the unit dump its charge into an analyzer, and verify with a meter that the charge is gone. A dark display is not proof of anything.

A larger electrolytic capacitor is a **polarized capacitor**: the can is marked with a stripe and the board with a plus sign, and fitting one backwards makes it vent or burst. Every capacitor also carries a **working voltage**, the highest it may ever see; a replacement rated below the rail it sits on fails early even when the capacitance is right.

## Inductor: stores energy in a magnetic field
A coil of wire, sometimes on an iron core. Current through it builds a magnetic field; the field resists any sudden change in that current. Inductance is measured in **henries**, usually millihenries (mH) or microhenries in the parts you will meet. You meet coils as filter chokes, as the windings of a **transformer**, as the coil in a **relay** (a switch moved by a magnet, so a small signal can control a big load), and as the windings of every **motor**. Because a coil fights change, switching one off produces a voltage spike, which is why relay and motor circuits carry a protective diode across the coil.

## Diode: a one-way valve
Current passes in the direction the symbol's triangle points, which is called **forward bias**, and is blocked the other way, **reverse bias**. A silicon diode needs about **0.6 to 0.7 V** across it before it conducts, and it holds roughly that drop while it does. Diodes rectify AC into DC, protect against a battery fitted backwards, and clamp those switching spikes.

The meter's **diode test** pushes a small current and displays that forward drop, red probe on the **anode** (the triangle side), black on the **cathode** (the bar side, usually marked with a stripe on the part). Reversed, a good diode reads OL. Reading OL both ways means it is open; near 0 both ways means it is shorted.

## LED: a diode that makes light
An **LED** is a diode built to emit light, and it needs more forward voltage than a plain one: about **1.8 to 2.0 V** for red, up to about **3.3 V** for blue and white. Two consequences:

- It is **polarized**. Fitted backwards it simply never lights. On a fresh part the **longer leg is the anode**, the positive side.
- It **must have a series resistor**. An LED's current rises almost vertically once it starts conducting, so connecting one straight across 9 V destroys it. The resistor sets the current.

## Transistor: switch and amplifier
Three legs. A small current or voltage on the control leg governs a much larger current through the other two. Used as a **switch**, it is either fully on or fully off, which is how a controller turns a pump motor, a heater, or a solenoid on and off thousands of times with no moving contacts. Used as an **amplifier**, it reproduces a small signal at a larger size, which is how a microvolt ECG signal becomes something a display can draw.

**Integrated circuits** pack thousands or millions of transistors into one package with numbered pins: the processors, memory, amplifiers, and regulators that make up a modern board. They are also the parts a static discharge destroys silently. The chip in charge is usually a **microcontroller**, a whole small computer on one piece of silicon (processor, memory, and input and output pins), and the program inside it is what a manual calls the firmware or the software version.

Two more parts live on the same boards and come up on your bench. A **piezoelectric buzzer** works by the **piezoelectric effect** run backwards: voltage makes the crystal flex, and that is what makes the alarm tone in most devices, so a silent alarm can be a dead buzzer rather than a logic fault. A **thermistor** is a resistor whose value changes with temperature, which makes it the sensing element in temperature probes and inside battery packs; most are **negative temperature coefficient** types, so the resistance falls as the part gets hotter, while **positive temperature coefficient** parts rise instead and are used as self-resetting fuses. A **thermocouple** does the same sensing job with two dissimilar metals joined at a tip, where the junction itself produces a tiny voltage that grows with temperature, and it is what survives the heat inside a sterilizer or an oven.

## The symbols for these five
\`\`\`
capacitor    two parallel plates; a curved second plate means it is polarized
inductor     a row of loops or humps, like a coil of wire seen side on
transformer  two coils facing each other, core lines drawn between them
diode        a triangle pointing into a bar; current flows the way it points
LED          the same triangle and bar with two small arrows leaving it
transistor   a circle with three leads: one straight bar and two angled, one carrying an arrow
integrated circuit   a plain rectangle with numbered pins and the part number inside
\`\`\`

> Exam tip: the shock question in this unit is always the capacitor. The component questions are the forward drops: about 0.6 to 0.7 V for a diode, about 1.8 to 3.3 V for an LED.`,
      hook: "Capacitor stores charge, farads and microfarads, polarized types have a stripe, and a defibrillator capacitor stays lethal after power off: discharge and verify. Inductor or coil stores energy magnetically, henries, used in relays, transformers, and motors, and spikes when switched off. Diode passes one way with a 0.6 to 0.7 V drop; the meter's diode test reads that with red on the anode. LED needs 1.8 to 3.3 V, is polarized with the long leg as the anode, and always needs a series resistor. Transistor is a switch or amplifier; integrated circuits pack millions of them."
    },
    {
      id: "u3l8", title: "Batteries, Chargers, and Battery Care", domain: 4, obj: "E&E-B", minutes: 9,
      body: `A surprising share of a biomed's work orders are batteries. A pump that will not hold a charge, a monitor that dies when it leaves the wall, a defibrillator that fails its self-test on the night it is needed: all battery jobs. Know the chemistries, the ratings, and the warning signs.

## Cell voltage tells you the chemistry
\`\`\`
Alkaline               1.5 V per cell     single use; the standard cell in handheld instruments
Nickel metal hydride   1.2 V per cell     rechargeable; reads a little below the alkaline it replaces
Lithium coin cell      3 V                holds board settings and the real-time clock
Lithium-ion            3.6 to 3.7 V       rechargeable; the pack in most modern portable devices
Sealed lead-acid       2 V per cell       so a 12 V block is six cells; carts, pumps, and beds
\`\`\`

Those per-cell numbers are how you check a pack without a manual. A 7.2 V lithium-ion pack is two cells; a 9.6 V nickel pack is eight.

Every cell is one of two kinds. A **non-rechargeable battery** is a primary cell, used once and replaced: the **alkaline battery** in a handheld instrument and the lithium coin cell on a board. A **rechargeable battery** is a secondary cell that goes back on a charger, which is every pack in a pump, a monitor, or a defibrillator. Never put a primary cell on a charger.

## Capacity and runtime
Capacity is measured in **amp-hours** (Ah) or **milliamp-hours** (mAh): how much current for how long. A 2,000 mAh pack supplying 200 mA lasts roughly ten hours, less in practice because the discharge is not perfectly efficient.

The important point for your job: **voltage looks normal long after capacity is gone.** An aging pack sits at its rated voltage with no load, then collapses the moment the device draws current. That is why a battery check is a **timed runtime test** under a real load, not a quick poke with a meter.

## Stacking cells
- **In series**, voltages add and capacity stays the same. Six 2 V lead-acid cells make a 12 V block with the capacity of one cell.
- **In parallel**, voltage stays the same and capacities add. Two 2,000 mAh cells side by side give 4,000 mAh at the same voltage, and can also supply twice the current.

Mixing old and new cells, or two chemistries, in one series string is a reliable way to ruin both.

## Charging
A **charger** is matched to a chemistry. Lithium packs are charged at constant current and then held at a constant voltage, with a protection circuit in the pack watching voltage, current, and temperature. Nickel chemistries are charged until the pack's voltage or temperature says stop. Lead-acid gets a long, gentle finishing charge. Use the charger made for the pack; a generic supply at the right voltage is not the same thing.

Most devices charge whenever they are plugged in, which is why "leave it on the wall when not in use" is the standard instruction on a crash cart.

## When to replace
- **Swelling.** A lithium pack that is puffy, or a case that will no longer close, is scrapped immediately. Never charge it, never puncture it, never press it flat.
- **Heat.** Warm during fast charging is normal; hot is not.
- **Leakage or crust** on an alkaline or lead-acid cell, or a corroded contact.
- **Failing the runtime specification**, which is the objective test and the one you document.
- **Age.** Most packs carry an install date for a reason, and a dated pack is replaced on schedule, not on failure.

Store spares cool and part-charged, not full and not flat, and rotate the stock so nothing sits for years.

## Battery work in scheduled maintenance
On a **defibrillator**, battery condition and the self-test log are the heart of the PM, because the device sits unused until an emergency. On an **infusion pump**, the runtime test proves a patient can be moved without losing the infusion. On a **monitor**, it proves the transport between floors. Record the install date on the pack and in the record, so the next technician knows its age without guessing. Dispose of every cell through the facility's recycling or hazardous waste route, never the regular trash.

A **UPS**, an uninterruptible power supply, is the same idea at room scale: a battery and an inverter that carry equipment through a power interruption until the generator picks up. Its internal batteries age exactly like any other and are replaced on a schedule.

> Exam tip: voltage alone never proves a battery. The test is runtime under load against the specification, and the per-cell voltages above are how you work out a pack's cell count.`,
      hook: "Per cell: alkaline 1.5 V, nickel metal hydride 1.2 V, lithium coin 3 V, lithium-ion 3.6 to 3.7 V, sealed lead-acid 2 V, so a 12 V lead-acid block is six cells. Capacity in Ah or mAh; series adds voltage, parallel adds capacity. Voltage looks fine after capacity is gone, so test timed runtime under load. Swelling, heat, leakage, failed runtime, or age means replace. Battery PM on defibrillators, pumps, and monitors; recycle, never bin. A UPS is the same idea for a room."
    },
    {
      id: "u3l9", title: "Wiring, Color Codes, Ground, and ESD", domain: 4, obj: "E&E-D", minutes: 10, lab: "continuity-diode",
      body: `Colors tell you which conductor you are holding, gauge tells you how much current it can carry, and a wrist strap keeps the board you are holding alive. This lesson is the practical end of the unit.

## Color codes
\`\`\`
United States building and cord wiring
  black or red     hot          carries the voltage
  white            neutral      the normal return path
  green or bare    ground       protective path, carries current only during a fault

International device cords (IEC colors)
  brown            live
  blue             neutral
  green and yellow stripe   ground

DC wiring and test leads
  red              positive
  black            negative
\`\`\`

A device made overseas and sold here often has brown, blue, and green-yellow inside the case and black, white, and green on the building side of the plug, so you must be fluent in both. Green, in either scheme, is always ground, and nothing else is ever green.

## Gauge, stranded, and solid
**AWG** is the wire gauge number, and it runs backwards: a **lower number is a thicker wire** that carries more current. 14 AWG is thicker than 18 AWG. Too thin a wire for its load means heat, a voltage drop at the end of the run, and eventually a fire.

**Stranded** wire is many fine strands twisted together: flexible, happy to be bent thousands of times, and therefore what every power cord, patient cable, and lead wire uses. **Solid** wire is one conductor: stiffer, easier to push into a screw terminal or a breadboard, and used for fixed building wiring. Put solid wire where something flexes and it work-hardens and breaks, usually just inside the strain relief where you cannot see it.

Inside a device those conductors have to land somewhere: a **terminal block** where a screw clamps each wire, a plug-in connector, or a flat **ribbon cable** carrying a whole bank of signals between boards. The board itself is a **printed circuit board**, copper traces bonded to an insulating sheet, and on a modern one most parts are **surface mount**, soldered to pads on the surface rather than through holes. That is why board-level repair belongs to a depot: your job is to identify the failed board, not the failed chip.

## What ground actually does
Two jobs, as in the first lesson of this unit. It is the **zero reference** that every other voltage is measured against, and it is the **protective path**: the green wire bonds the metal case back to the outlet's ground pin, so a loose internal wire touching the case sends current back through the ground conductor and trips the breaker rather than waiting for a person to complete the circuit. That is why a cracked plug, a missing ground pin, or a three-prong to two-prong adapter is an immediate failure on a patient-care device, and why ground continuity is the first electrical measurement in a safety test.

On a drawing, the word ground can mean three different things. **Earth ground** is the connection back to the building and the plug's third pin. **Chassis ground** is the metal case itself. **Signal ground** is the **common ground** a board measures its own voltages against, usually the negative side of its supply. They are normally tied together at one point, and knowing which one a schematic means saves you from chasing a voltage that was never supposed to be there.

## Continuity and the diode test
**Continuity** answers one question: is this one unbroken piece of conductor? The meter pushes a tiny current and beeps if it gets through, showing a fraction of an ohm. Open, it shows OL.

- A closed switch beeps; an open switch reads OL.
- A good cable beeps end to end. A cable with a break inside its jacket looks perfect and reads OL, which is why continuity, not eyesight, condemns a cable. Flex the cable while testing to catch the intermittent ones, especially at the ends where the strain lands.
- Always power off, and isolate one end so another path does not beep for the cable.

The **diode test** is continuity's cousin: it pushes a known small current and shows the forward voltage, about 0.6 to 0.7 V for a plain diode and about 1.8 to 2.0 V for a red LED, with the red probe on the anode. Reversed, a healthy part reads OL.

## ESD: the damage you never see
Walking across a carpet charges you with **static electricity**, to thousands of volts. A spark you can feel is roughly **3,000 V**, but as little as **100 V** can destroy a chip with no spark, no noise, and no visible mark. The board then works, or half works, or fails next week, and nobody connects it to the moment you picked it up.

The habits are simple and not optional:

1. Wear a grounded **wrist strap** and work on a grounded **mat**.
2. Touch the chassis before you touch a board, so you and it sit at the same potential.
3. Transport and store boards in **anti-static bags**, never a plastic tray or a shirt pocket.
4. Hold boards by the edges, keep fingers off connector pins and chip legs.
5. Remember that dry air makes **ESD** worse: winter and low **humidity** are when quiet failures cluster.

In the lab you test two switches, two cables, a diode, and an LED with nothing powered, and finish by naming the ground conductor by its color.

> Exam tip: green or bare is ground, white is neutral, black or red is hot, and brown is live with blue neutral on a cord. Lower AWG means thicker. 3,000 V is the spark you feel; 100 V is the damage you do not.`,
      hook: "United States wiring: black or red hot, white neutral, green or bare ground. IEC cords: brown live, blue neutral, green-yellow ground. DC: red positive, black negative. AWG runs backwards, so lower is thicker; stranded flexes, solid stays put. Ground is the zero reference and the protective path, so ground continuity is tested first. Continuity beeps on an unbroken path and reads OL on a break; the diode test shows about 0.6 to 0.7 V forward, about 1.8 to 2.0 V on a red LED. ESD: a spark you feel is about 3,000 V, 100 V can kill a chip, so wrist strap, mat, bags, edges, and watch dry air."
    }
  ]
});
