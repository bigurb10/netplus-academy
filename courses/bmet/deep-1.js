// BMET Academy deeper explanations, units 1 to 3. Original content, written for a reader with no background.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u1l1: `## Where the department sits
A hospital is three businesses sharing a building: the clinical side that treats patients, the facilities side that keeps the building alive, and the information side that keeps the data moving. Medical equipment sits on the seam between all three, and that is where the healthcare technology management department lives. Your work order may come from a nurse, your power comes from facilities, your network comes from IT, and your parts come from a manufacturer, which is why so much of the job is knowing who to call.

Most departments report either to facilities, to IT, or to a clinical operations leader. It matters less than it sounds. What matters is that the department owns every piece of medical equipment from the loading dock to the recycling bin.

## The life of one device
Follow a single infusion pump and you have the whole job in one story.

1. Somebody asks for it, and the department advises on the purchase: does it fit the fleet, will the accessories be shared, is it serviceable, does it need the network.
2. It arrives and you do the **incoming inspection**: unpack, check against the paperwork, inspect for shipping damage, record model and serial, electrical safety test, function test, asset tag, and a record created in the computerized maintenance management system.
3. It goes into service, and from then on it comes back to you on a schedule for **scheduled maintenance**, and off-schedule whenever it breaks.
4. Recalls, software updates, and accessory changes arrive from the manufacturer during its life, and each one becomes a project across the whole fleet of that model.
5. Eventually it is replaced. You wipe anything that stores data, strip usable parts, document the retirement, and it leaves.

Every step produces a record. That is not bureaucracy for its own sake: the record is what proves to a surveyor, a lawyer, or the next technician that the device was safe.

## What to memorize
\`\`\`
Term                      What it means
HTM                       healthcare technology management: the department and the discipline
biomed / BMET             the technician; clinical engineering is an older name for the same group
work order                one job: who asked, what was found, what was done, parts, time, result
CMMS                      the database of assets, schedules, work orders, and history
asset number              the device's unique identity in that database
incoming inspection       everything done before a new device touches a patient
scheduled maintenance     the planned inspection and service on a calendar interval
rounds                    walking the units to check equipment in place
ISO                       an independent service organization: contract service for several sites
field service             working for the manufacturer on one product line
\`\`\`

## The ladder, honestly
A BMET I works on the simpler fleet under supervision: beds, pumps, vital-signs monitors, suction, scales. A BMET II carries their own schedule and handles most of the general fleet. A BMET III takes the complex systems and often mentors. From there the paths split: specialist on one family such as imaging, laboratory, or dialysis, or supervisor and then manager, where the work becomes budgets, contracts, staffing, and regulations instead of screwdrivers.

Nobody skips the first rung by knowing more theory. People move up by being the technician whose documentation is clean, whose repairs hold, and who can be trusted alone on a floor. The credential gets you the interview; those three habits get you the ladder.`,

u1l2: `## Buying and sitting the exam
The process is short, and the deadlines are the part people trip over.

1. You apply and pay. Eligibility is high school junior or above, which means there is no degree requirement and no experience requirement standing between you and this credential.
2. From the day of purchase you have **six months** to test. The fee is non-refundable, so do not buy it until you intend to study.
3. You schedule a session. Delivery is **live remote proctoring, year-round**, so you test at your own computer with a human watching through the webcam. Expect to show identification, pan the camera around the room, clear the desk, and stay in frame; a phone, a second screen, notes, or somebody walking in can end the session.
4. The exam is **100 multiple-choice questions in 2 hours**, closed book, with an on-screen four-function calculator provided.
5. You get **pass or fail immediately** on the screen, with written confirmation by email.
6. If it goes badly, a retake costs less but waits **60 days**.

## The money and the calendar
\`\`\`
Item                     Member    Non-member
First attempt            $220      $270
Retake                   $190      $240
Window to test           six months from purchase
Retake wait              60 days
Validity                 5 years, non-renewable
\`\`\`

Those numbers argue for one thing: do not schedule the test until your practice scores say you are ready. A failed attempt costs the retake fee and two months of momentum.

## Non-renewable, and what comes next
The associate credential cannot be renewed. In five years it simply expires, and the intent is that by then you have the work experience for the technician-level exam, CBET. That exam's full certification wants one of three things: an associate degree or higher in electronics, technology, or science plus two years of full-time biomedical equipment work; a United States military biomedical equipment program plus two years; or four years of that work on its own. Candidate status, which lets you sit it earlier, opens at the degree alone, the program alone, or two years of work alone. Read that as a plan, not a worry: pass this exam, get hired, log the years, and the next rung is already in reach.

## Reading the domain weights as a study plan
\`\`\`
Domain                                     Share   Questions out of 100
Reasoning and Problem Solving              24%     about 24
Medical Devices as Related to Patient Care 23%     about 23
Safety in Healthcare                       16%     about 16
Fundamentals of Electricity and Electronics 14%    about 14
Healthcare Information Technology          13%     about 13
Anatomy and Physiology                     10%     about 10
\`\`\`

Reasoning is the largest single slice and it cannot be memorized. Those questions give you a situation and ask what you do first, what the reading means, or which cause to check next. That is why this course drills order-of-operations lists and why the labs make you decide something rather than just read a number.

## How the gates in this course work
The 50-question tests and practice tests are scored at 80%, above the real cut, so your margin is real. Qualification needs **3 of your last 5** tests at 80% or better, which prevents one lucky run from sending you to the exam. After that comes the official-format test: 100 questions, 120 minutes, scored at the exam's own 70%. Pass it once and that pass is permanent. The certificate of completion needs every lesson finished, every lab finished, and that official-format pass.`,

u1l3: `## The dial, one position at a time
Every handheld meter has the same handful of functions under different symbols.

- **V DC** (a straight line, sometimes with a dashed line under it). Steady voltage: batteries, power supply rails, board test points. This is where the dial lives most of the time.
- **V AC** (a wavy line). Alternating voltage: the wall, the primary side of a transformer, a motor winding. Reading AC on a DC range gives you a meaningless number near zero, which fools people into calling an outlet dead.
- **Ohms**. Resistance. The meter supplies its own small current and measures what comes back, which is why the circuit must be dead.
- **Continuity** (a speaker symbol). The same measurement with a beeper on it. You use it to ask one question: is this path unbroken?
- **A DC** (amps). Current. The red lead moves to the amps jack and the meter goes **into** the circuit.
- **Diode test**. Pushes a known small current and shows the forward voltage.
- Some meters add capacitance, frequency, and temperature. Nice to have, rarely the fault finder.

## Jacks, and the one lead that moves
The black lead lives in **COM** and never moves. The red lead sits in the **V/ohm** jack for voltage, resistance, continuity, and the diode test. For current it moves to the **amps** jack, often two jacks: one for milliamps and microamps and one for up to ten amps. Leaving the red lead in the amps jack and then probing a live circuit on the voltage range is the classic destructive mistake, because the meter is almost a wire on that path.

That amps path is protected by a **fuse inside the meter**. Blow it and the amps ranges read zero or OL forever while volts and ohms still work perfectly, which is a confusing failure until you have seen it once. A meter that will not read current is usually a meter with a blown internal fuse.

## Reading the display
\`\`\`
Display          Meaning
0.000            a real reading of zero: connected, nothing there
OL or 1 alone    over limit: beyond the range, or an open path
minus sign       the red probe is on the more negative point; swap and it goes away
mV, mA, k, M     the prefix is part of the reading: 1.2 k on ohms is 1,200 ohm
a drifting value an unsettled reading: wait, or the probes are not making contact
blank or dim     dead meter battery
\`\`\`

**Auto range** means the meter picks the scale for you and tells you the unit on the display. Read the unit every time; the difference between 470 and 470 k is the whole answer.

## Looking after the leads
Test leads fail more often than meters. The break hides inside the insulation where the lead meets the plug or the probe, so a lead can look perfect and read OL. Test a suspicious pair against themselves: on continuity, touch the probe tips together and the meter should beep and read a fraction of an ohm. Store them loosely coiled rather than wrapped tight around the meter, keep the tips clean, and keep your fingers behind the finger guards.

## The two rules, restated
Ohms and continuity are **power off** measurements, always, and ideally with one end of the part disconnected so parallel paths cannot pull the reading low. Current is an **in-series** measurement, never across a source. Those two sentences cover nearly every ruined meter and every impossible reading a beginner reports.`,

u2l1: `## Why a technician learns anatomy
You will not treat anybody. You will read a work order that says "monitor alarming on a prone patient, lead placement suspect," talk to a nurse who says the cuff is on the wrong side because the arm is distal to a graft, and open a manual whose first page describes what the device measures physiologically. The vocabulary is the price of admission to those conversations.

## Four levels, one example
Take the heart. The **cells** are muscle cells that contract when an electrical signal arrives. Bundled into **tissue**, they form the thick wall that can squeeze as one. Built into an **organ**, that wall becomes four chambers with valves. Joined with vessels and blood into a **system**, it circulates oxygen to every tissue in the body. Your ECG monitor listens at the cell level, your blood pressure cuff measures at the system level, and your defibrillator intervenes at the organ level. Same anatomy, three different devices, three different levels.

## What to memorize
\`\`\`
Direction pair          Meaning                      Anchor example
anterior / posterior    front / back                 breastbone anterior, spine posterior
superior / inferior     above / below                head superior to chest
medial / lateral        toward / away from midline   nose medial, ears lateral
proximal / distal       near / far from the trunk    elbow proximal to wrist
supine / prone          face up / face down          most procedures are done supine

Prefix      Meaning        Suffix      Meaning
brady-      slow           -itis       inflammation
tachy-      fast           -ectomy     surgical removal
hyper-      high, too much -oscopy     looking inside
hypo-       low, too little -graphy    the process of recording
a-, an-     without        -gram       the record itself
dys-        difficult      -emia       a condition of the blood

Root        Body part      Root        Body part
cardio      heart          gastro      stomach
pulmo       lung           derm        skin
pneumo      lung or air    hemo        blood
nephro      kidney         neuro       nerve
reno        kidney
\`\`\`

## Practice decoding
- **Bradycardia**: brady (slow) + cardia (heart). A slow heart rate, under 60 beats per minute.
- **Hypoxemia**: hypo (too little) + ox (oxygen) + emia (in the blood). Low blood oxygen, which is what a pulse oximeter is watching for.
- **Dyspnea**: dys (difficult) + pnea (breathing). Trouble breathing.
- **Nephrology**: nephro (kidney) + logy (study of). The specialty that runs the dialysis unit you will service.
- **Endoscopy**: endo (within) + oscopy (looking inside). Looking inside with a scope, which is the department with the most expensive flexible cables in the hospital.

## Where directions bite a technician
Three real examples. A pulse oximeter probe asked to go **more distal** goes farther out the limb, toward the fingertip, not toward the shoulder. A blood pressure cuff goes on the upper arm, **proximal** to the elbow, because the artery there runs deep and straight. And a patient turned **prone** for surgery has every cable, electrode, and probe relocated, because everything that was accessible on the front is now underneath them. Getting the word wrong in any of those produces a false reading or an unsafe setup, which is why the exam asks.`,

u2l2: `## The pump, in order
Blood makes a figure eight through the heart, and the order never changes.

\`\`\`
body -> vena cava -> RIGHT ATRIUM -> tricuspid valve -> RIGHT VENTRICLE
     -> pulmonary valve -> lungs (pick up oxygen, drop carbon dioxide)
     -> LEFT ATRIUM -> mitral valve -> LEFT VENTRICLE -> aortic valve -> body
\`\`\`

Right side to the lungs, left side to the body. The left ventricle pushes against the pressure of the whole body, so it has the thickest wall, and that is also why a failure on the left side shows up as fluid backing into the lungs.

The four valves are one-way doors. They open with the flow and slam shut against backflow, and the slam is what a stethoscope hears as the heart sounds.

## The electrical sequence and the tracing
\`\`\`
Event                               On the tracing   Why you care
SA node fires, atria depolarize     P wave           the natural pacemaker sets the rate
AV node delays the signal           flat PR stretch  gives the ventricles time to fill
ventricles depolarize               QRS complex      the monitor counts these for heart rate
ventricles recover                  T wave           a defibrillator avoids shocking here
\`\`\`

That table is most of an ECG question. The monitor is counting QRS complexes, so anything that adds a spike to the signal (a shivering patient, a loose electrode slapping, electrical interference) can be counted as a beat, and anything that removes the spike reads as no beat at all.

## The pressure numbers, derived not memorized
**Systole** is the squeeze; **diastole** is the refill. A cuff reports both: about 120/80 mmHg in a healthy adult.

The mean arterial pressure is not the average of those two numbers, because the heart spends more of each beat relaxed than squeezing. The estimate used everywhere is:

\`\`\`
MAP = diastolic + (systolic - diastolic) / 3
120/80  ->  80 + 40/3   = about 93 mmHg
120/90  ->  90 + 30/3   = 100 mmHg
160/100 ->  100 + 60/3  = 120 mmHg
\`\`\`

Work one of those by hand now and the exam version takes ten seconds.

## Heart rate and the two words
Resting adult heart rate is **60 to 100** beats per minute. Below 60 is bradycardia and above 100 is tachycardia. Both can be perfectly normal in context, an athlete at rest or anyone climbing stairs, which is why the monitor has adjustable alarm limits and why setting those limits is part of your setup.

## Vessels, blood, and the three devices
Arteries leave the heart under pressure and have muscular walls; veins return blood at low pressure and rely on valves and muscle movement; capillaries are one cell thick, which is the only way gas can cross. Blood is **plasma** carrying **red cells** (oxygen rides on hemoglobin), **white cells** (infection), and **platelets** (clotting).

Three everyday devices read this one system, and knowing which signal each one uses explains their failure modes. **ECG** reads electricity from skin electrodes, so it fails on bad skin contact. **NIBP** inflates a cuff to stop flow and watches the pressure where flow returns, so it fails on cuff size, placement, and movement. **Pulse oximetry** shines red light at about 650 to 660 nm and infrared at about 805 to 940 nm through tissue and compares how much of each is absorbed, so it fails when there is no pulsing blood at the site: cold fingers, poor circulation, or motion.`,

u2l3: `## The tree and the sacs
The airway is a branching tree that gets smaller and more numerous at every split: trachea, two bronchi, bronchioles, and finally the **alveoli**, hundreds of millions of sacs with a combined surface area about the size of a tennis court, roughly 70 square meters. Each sac is wrapped in capillaries, and the barrier between air and blood is thin enough that oxygen and carbon dioxide simply diffuse across it, each from where it is plentiful to where it is scarce. Nothing pumps the gas across; concentration does the work.

Breathing moves fresh air to those sacs. The **diaphragm** flattens, the chest cavity enlarges, pressure inside drops below the air outside, and air flows in. That is **negative pressure** breathing. A ventilator cannot do that, so it pushes gas in instead, under **positive pressure**, which is why ventilated patients need their airway pressures watched and why too much pressure can injure a lung.

## Ventilation against oxygenation
This distinction answers a surprising number of exam questions.

\`\`\`
Idea            What it is                        The number        The device
ventilation     moving air in and out             rate, tidal volume, EtCO2   ventilator, capnograph
oxygenation     loading oxygen onto the blood     SpO2              pulse oximeter, oxygen supply
\`\`\`

A patient on a high oxygen flow can show a beautiful SpO2 while barely breathing, because the blood that does reach the lungs is saturated. What gives that away is a rising carbon dioxide, because clearing carbon dioxide depends entirely on moving air. This is exactly why a monitor watches both and why a capnograph is standard where patients are sedated.

## What to memorize
\`\`\`
Measurement           Normal adult at rest     Instrument
Respiratory rate      12 to 20 breaths/min     monitor impedance channel, capnograph
SpO2                  95 to 100%               pulse oximeter
EtCO2                 35 to 45 mmHg            capnograph
Tidal volume          about 500 mL per breath  ventilator display, spirometer
\`\`\`

## The devices, and the one thing each gets wrong
- **Ventilator**: delivers measured breaths. Checks are delivered volume and pressure, the alarms, the oxygen blend, and the battery. The most common service call is a circuit leak or water in the tubing.
- **Oxygen concentrator**: takes room air and removes nitrogen, so there is no cylinder to change. Checks are oxygen purity, flow, and filters; a dirty intake filter is the usual complaint.
- **Suction**: a regulator and a canister on wall vacuum, set in continuous or intermittent mode. Checks are gauge accuracy against a reference, leak tests, and the filter. Wall outlets deliver about 50 psi for gases, and vacuum is a negative pressure rather than a supply.
- **Capnograph**: measures carbon dioxide in exhaled gas, either in the breathing circuit (mainstream) or by drawing a sample down a thin tube (sidestream). Water in that sample line is the top failure, and a patient breathing through the mouth on a nasal cannula reads falsely low.
- **Pulse oximeter**: red and infrared light through the tissue. Motion, cold fingers, nail polish, and bright ambient light all produce the same complaint.
- **Nebulizer**: turns liquid drug into an inhalable mist, driven by gas flow or an ultrasonic element.
- **Spirometer**: measures how much and how fast a patient can move air. It is a measuring instrument, so it needs a calibration syringe and a documented verification, not just a function check.`,

u2l4: `## Two systems in one
The **central nervous system** is the brain and spinal cord; the **peripheral nervous system** is every nerve leaving them. Signals travel as brief electrical pulses, created by charged particles moving across a nerve cell's membrane. Those pulses are tiny: a nerve or brain signal at the skin is measured in **microvolts**, tens of microvolts against about a millivolt from the heart, so roughly 10 to 100 times smaller than the signal an ECG picks up from the heart.

That single fact explains most of the equipment in this lesson. The smaller the signal, the more the amplifier has to magnify, and the more everything else in the room gets magnified with it: the 60 Hz hum from the wiring, the movement of a cable, a poorly prepped electrode, a nearby motor. An EEG technologist fussing for twenty minutes over electrode impedance is not being precious; below a certain contact quality the signal is simply buried.

## The map
\`\`\`
Structure        What it does                                 Equipment connection
cerebrum         thinking, speech, decisions, voluntary motion  EEG electrodes sit over it
cerebellum       balance and smooth coordination                balance and gait testing
brainstem        breathing and heart rate, automatically        ventilator patients, brain death testing
spinal cord      two-way cable inside the backbone              evoked-potential monitoring in surgery
peripheral nerves signals out to muscle and in from skin        nerve stimulators, TENS, nerve studies
reflex arc       sensation in, straight back out as movement    reflex testing, no device needed
\`\`\`

## Why electricity hurts
A nerve fires when the voltage across its membrane shifts far enough. A current from outside the body does the same thing, indiscriminately: it makes nerves fire and muscles contract whether or not the brain asked. Everything about electrical safety follows from that.

- At about **1 mA** through the body you feel a tingle: the threshold of perception.
- **5 mA** is the accepted maximum harmless current.
- At **10 to 20 mA** the flexor muscles that close a hand overpower the extensors that open it, so a person cannot let go. That is the **let-go threshold**, and it is the reason a brief contact becomes a long one.
- Around **50 mA** there is pain, possible fainting, and respiratory arrest, because the muscles that drive breathing are affected too.
- From **100 to 300 mA** ventricular fibrillation is likely: the heart's own electrical timing is overwhelmed and the muscle quivers instead of pumping.
- At **6 A and above** the whole heart muscle clamps in sustained contraction and burns follow.

And **60 Hz** matters, not just the size of the current. Wall power reverses 60 times a second, which lands close to the worst case for interfering with the heart's own rhythm. Those numbers belong to the safety unit, but the reason behind them belongs here: the body runs on electricity, so electricity can run the body.

## Devices to recognize
**EEG** records brain activity from scalp electrodes and lives or dies by electrode contact. **Nerve stimulators** deliver a controlled pulse to find or test a nerve, often during surgery. **TENS** units send mild pulses through skin electrodes for pain. **Evoked-potential monitors** supply a repeated stimulus and average hundreds of responses together, because any single response is smaller than the noise around it. Averaging is the trick that makes an invisible signal visible, and it is worth knowing by name.`,

u2l5: `## Kidneys: the filter
Blood enters each kidney, passes through about a million microscopic filters, and leaves cleaner. What is pulled out, waste and surplus water, becomes urine and drains to the bladder. Beyond cleaning, the kidneys hold the body's water, salt, and acid balance steady and help regulate blood pressure, which is why kidney failure affects the heart almost immediately.

**Dialysis** replaces that filtering mechanically: blood is pumped out of the patient, across a membrane with cleaning fluid on the other side, and returned. For a technician a dialysis machine is a pump, a heater, a water treatment system, a set of pressure and conductivity sensors, and a long list of alarms, each of which protects the patient from a specific failure. A **bladder scanner** is the opposite end of the complexity scale: a handheld ultrasound that measures retained urine volume so a nurse can avoid an unnecessary catheter.

## Blood
About five liters in an adult. Enough loss and pressure falls no matter how strong the heart is, which is what the fluid warmers, rapid infusers, and transfusion devices in a trauma bay exist to address.

\`\`\`
Blood type   Notes
A, B, AB, O  each is positive or negative for the Rh factor
O negative   given when there is no time to type and cross-match
AB           can receive the most types
Volume       about 5 liters in an adult
\`\`\`

## Skin, the component
Three layers: **epidermis** outside, **dermis** with vessels and nerves beneath it, **subcutaneous** fat below. Skin is a barrier against infection, a temperature control system that sweats and flushes, and a sense organ.

For your purposes, it is also a resistor whose value changes with the weather.

\`\`\`
Condition               Approximate resistance   Current from 120 V
dry, intact skin        about 100,000 ohm        about 1 mA, a tingle
wet, sweaty, or broken  about 1,000 ohm          about 120 mA, likely fatal
\`\`\`

Three device families follow from that. **Electrodes** deliberately lower skin resistance with gel and abrasion so microvolt signals can escape. **Electrosurgery units** pass current through tissue on purpose and return it through a large pad, so a pad partly lifted concentrates the current in a small area and **burns**; warming devices burn the same way when heat concentrates. And any cuff, probe, or mattress left pressing one spot too long causes a **pressure injury**, which is why bed and mattress maintenance is patient safety work and not janitorial work.

## Digestion
A tube from mouth to the far end, with the liver and pancreas adding chemicals along the way. Food is broken down, absorbed through the intestinal wall, and the remainder leaves. The devices are **feeding pumps**, whose connectors are deliberately incompatible with intravenous sets so formula can never be sent into a vein, **suction** for removing fluid, and **endoscopes**, flexible cameras threaded into the tube for both looking and working. Endoscopes are also the single most demanding item in the hospital for cleaning and disinfection, with their own documented reprocessing cycle.

## Hormones
The **endocrine** glands (pancreas, thyroid, adrenals, pituitary) release hormones into the blood as slow chemical messages that reach the whole body. **Insulin** from the pancreas lets cells take up **glucose**; without enough of it, blood sugar climbs. That gives you **glucometers**, handheld meters read from a drop of blood and subject to quality-control checks like any laboratory instrument, and **insulin pumps**, which deliver microliter doses continuously and therefore demand the same flow accuracy discipline as any other pump. The thyroid sets metabolic rate, which includes heat production, and normal core temperature is **37 C**, or 98.6 F.`,

u2l6: `## What a vital sign is for
A vital sign is a number that changes quickly when a patient gets worse. That is the whole reason this short list is measured again and again: it is an early warning system. Your job is to make sure the warning is true, because a monitor that cries wolf gets ignored, and an ignored monitor is a patient safety problem rather than an equipment problem.

## The table to know cold
\`\`\`
Vital sign          Normal adult at rest       Device                               Units
Heart rate          60 to 100                  ECG monitor, oximeter, NIBP module   beats per minute
Respiratory rate    12 to 20                   impedance channel, capnograph        breaths per minute
Blood pressure      about 120/80               NIBP cuff, arterial line             mmHg
SpO2                95 to 100                  pulse oximeter                       percent
Temperature         37 C (98.6 F)              thermometer, monitor probe, infrared C or F
EtCO2               35 to 45                   capnograph                           mmHg
Pain                0 to 10, as reported       none: the patient answers            a scale
\`\`\`

Note the last row. Pain is recorded at the bedside and has no sensor, which makes it the answer to any question asking which vital sign no device measures.

## Placement, and why each site is chosen
- **ECG electrodes** go on clean, dry, prepped skin over bone or firm tissue. Over a moving muscle the electrode records the muscle, not the heart.
- **NIBP cuff** goes on the upper arm with the bladder centered over the artery, the arm supported at heart level. A limb held above the heart reads low and a limb hanging below it reads high, which is why the position of the arm is part of the technique and not a detail.
- **SpO2 probe** needs the light source and the detector facing each other through well-perfused tissue: a fingertip, a toe, an earlobe, or a foot on an infant.
- **Temperature probe** must match its site and wear the right cover; an oral probe used rectally is a cross-contamination event, which is why the probes are color coded.
- **Capnography line** goes in the circuit for an intubated patient or on a nasal cannula for a patient breathing on their own.

## The five calls you will actually get
\`\`\`
Complaint                        Usual cause                          First check
"blood pressure reads too high"  cuff too small for the arm           cuff size: the bladder wraps about 80% of the limb
"oximeter keeps dropping out"    motion, cold fingers, poor perfusion warm the site, move the probe, check the waveform
"monitor says no heartbeat"      an electrode lifted or dried out     look at the patient, then the electrodes
"EtCO2 is way too low"           mouth breathing on a nasal cannula   watch how the patient breathes
"temperature reads room temp"    probe off the patient                where the probe actually is
\`\`\`

Every row has the same shape: the patient is fine and the interface is not. That is why the rule is to look at the patient first, the sensor second, the cable third, and the monitor last. It is also why swapping a probe or a lead set for a known-good one is the fastest diagnostic test in the building: one swap splits the problem in half.

## What makes a verification, not just a guess
When you do check the monitor itself, use a **patient simulator**: it produces known ECG rates and amplitudes, an SpO2 value, a respiration rate, and a temperature, so you can compare the display against something traceable. NIBP accuracy needs a pressure standard, and EtCO2 needs a known calibration gas. Comparing one monitor against another monitor proves nothing, because you have no idea which one is wrong.`,

u3l1: `## What is actually going on in the wire
Current is charge in motion. In a metal, the outermost electrons of each atom are barely held, so a push at one end of a copper wire nudges a drift of electrons along the whole length almost instantly. The individual electrons crawl; the effect travels at nearly the speed of light, which is why a light comes on the moment you flip a switch.

Two conventions coexist and both are correct in their own way. **Electron flow** goes from negative to positive, because electrons are negatively charged and are repelled by the negative terminal. **Conventional current**, the one every schematic, formula, and diode symbol uses, is drawn from positive to negative. Use conventional current for everything in this course; it is what the arrows mean.

## Conductors and insulators
\`\`\`
Conductors (electrons move freely)   Insulators (electrons are locked)
silver, the best                     rubber
copper, the practical choice         glass
aluminum, light and cheap            plastic, including cable insulation
gold, for contacts that must not corrode   dry air
salt water and body fluid            ceramic
human tissue, poorly but well enough dry, intact skin
\`\`\`

Notice the two entries at the bottom left. Body fluid conducts well and tissue conducts adequately, which is exactly why a catheter or a lead that reaches inside the body bypasses the one good insulator a person has.

## The three quantities, their units, and their prefixes
\`\`\`
Quantity    Symbol   Unit      Common sizes you will read
current     I        amp (A)   1 A = 1,000 mA = 1,000,000 microamps
voltage     V        volt (V)  1 kV = 1,000 V; 1 mV = 0.001 V
resistance  R        ohm       1 kohm = 1,000 ohm; 1 Mohm = 1,000,000 ohm
power       P        watt (W)  1 kW = 1,000 W
\`\`\`

Moving between those is just moving a decimal point three places per step. 0.47 A is 470 mA. 19 mA is 0.019 A. 2,200 ohm is 2.2 kohm. Practise that until it is automatic, because every numeric mistake on an electricity question is a decimal mistake, not a concept mistake.

## Why each measurement is taken the way it is
- **Voltage is a difference**, so it needs two points and the circuit must be energized for there to be a difference to see. You put the meter in parallel with the part, across it.
- **Current is a flow**, so the meter has to be part of the flow. You break the circuit and insert the meter, in series. An ammeter is built to have almost no resistance so it does not change the circuit it is measuring, which is precisely why putting it across a source is a short circuit.
- **Resistance is a property of the part**, not of the circuit, so the meter supplies its own small test current and the circuit must be dead. If the part is still soldered in, every other path between those two points is in parallel with it and pulls the reading low. A reading that is lower than the marking, in circuit, usually means you are measuring the whole board.

## Ground, both meanings
In a circuit, **ground** is whichever point you have chosen to call zero; every other voltage is stated relative to it. In a building, ground is a physical connection to earth, and the green wire in a cord bonds a device's metal case to it. The second meaning is the safety one: if a hot conductor inside comes loose and touches the chassis, the ground wire gives that current an easy path back, the current rises, and the breaker opens. Without that path the chassis simply sits at 120 V, waiting, and the first person to touch it and something grounded becomes the path. This is why ground continuity, measured chassis to plug pin, is the first test in an electrical safety sequence, with a limit of **0.5 ohm** under NFPA 99 for patient-care equipment.`,

u3l2: `## The triangle, and why it works
\`\`\`
         V
      -------
      I  |  R

cover V  ->  V = I x R
cover I  ->  I = V / R
cover R  ->  R = V / I
\`\`\`

The three forms are one relationship read three ways: the current through a resistance is proportional to the voltage across it. Double the push and you double the flow. Double the opposition and you halve the flow.

## Worked examples to copy
\`\`\`
Known                    Find        Work                     Answer
12 V across 4 ohm        current     12 / 4                   3 A
0.5 A through 100 ohm    voltage     0.5 x 100                50 V
9 V and 19 mA measured   resistance  9 / 0.019                about 474 ohm
120 V across 1,000 ohm   current     120 / 1000               0.12 A = 120 mA
24 V, need 10 mA         resistance  24 / 0.010               2,400 ohm
\`\`\`

The third row is the lab. You measure the voltage and the current and compute a resistance you never measured, then compare it with the color bands. When they agree you have proved your technique as well as the law.

## Power: the other equation
\`\`\`
P = V x I            volts x amps
P = I squared x R    when current and resistance are known
P = V squared / R    when voltage and resistance are known

12 V at 3 A         = 36 W
0.019 A in 470 ohm  = 0.019 x 0.019 x 470 = 0.17 W
9 V across 470 ohm  = 81 / 470 = 0.17 W
\`\`\`

The last two rows are the same circuit computed two ways, which is a free check on your arithmetic: if two routes disagree, one of them used a wrong number.

Power matters because it is heat. A resistor is rated for the heat it can shed, commonly a **quarter watt** on a hobby part and one or more watts on power resistors. Asking a quarter-watt part for 1.7 W does not blow it instantly; it discolors, its value drifts, the device develops an intermittent fault, and weeks later it opens. Burnt or discolored resistors on a board are a message: either the part was underrated or something else failed and overloaded it. Replacing it without finding out which is how you get the same board back.

## The shock arithmetic
Ohm's law is the reason electrical safety numbers are what they are. The outlet's 120 V is fixed; the path resistance is not.

\`\`\`
Path                           Resistance         Current from 120 V   Effect
dry hand to dry hand           about 100,000 ohm  about 1.2 mA         perception, a tingle
sweaty hands, metal tools      about 10,000 ohm   12 mA                past let-go: cannot release
wet skin, standing in water    about 1,000 ohm    120 mA               fibrillation likely
\`\`\`

Nothing about the electricity changed in those three rows. Your skin did. That is the argument for dry hands, intact insulation on your tools, no rings or watches at the bench, keeping fluid away from powered equipment, and never making yourself the second connection to ground.

The same arithmetic in reverse explains **microshock**: a current as small as **10 microamps** delivered directly to the heart through a catheter or a pacing lead can cause fibrillation, because the skin's resistance is not in the path at all. Microamps outside the body are nothing; microamps inside it are the reason leakage limits exist.

> Convert before you divide. Every wrong answer on this material comes from leaving a value in milliamps or kilohms.`,

u3l3: `## The two topologies, side by side
\`\`\`
                 Series                          Parallel
path             one loop, no branches           two or more branches
current          the same in every part          divides; branch currents add to the total
voltage          divides; drops add to the source same across every branch
resistance       R total = R1 + R2 + R3          less than the smallest branch
two resistors    just add them                   (R1 x R2) / (R1 + R2), product over sum
one part opens   everything stops                only that branch stops
one part shorts  the rest sees more current      that branch draws huge current; fuse opens
used for         fuses, switches, current sensing outlets, device loads, redundant parts
\`\`\`

## Series, worked fully
9 V, R1 = 220 ohm, R2 = 470 ohm, in one loop.

\`\`\`
R total = 220 + 470               = 690 ohm
I       = 9 / 690                 = 0.013 A, the same everywhere
V on R1 = 0.013 x 220             = 2.87 V
V on R2 = 0.013 x 470             = 6.13 V
check   = 2.87 + 6.13             = 9.00 V, the source
\`\`\`

The bigger resistance takes the bigger share of the voltage, always, and in exactly the ratio of the resistances: 470 is about 68% of 690, and 6.13 V is about 68% of 9 V. That proportionality is the **voltage divider**, and boards use it constantly to bring a signal down to a range a chip can read. A divider built from one precise resistor and one drifting one produces a reading wrong by a constant percentage, which is the signature of a calibration problem rather than a failure.

## Parallel, worked fully
9 V across R3 = 220 ohm and R4 = 470 ohm.

\`\`\`
Each branch sees the full 9 V.
I on R3 = 9 / 220                 = 0.041 A (41 mA)
I on R4 = 9 / 470                 = 0.019 A (19 mA)
I total = 0.041 + 0.019           = 0.060 A (60 mA)
R total = 9 / 0.060               = 150 ohm
check   = (220 x 470) / 690       = 150 ohm
\`\`\`

Two sanity checks live in that block. The total resistance must come out **below the smallest branch**, because adding a path can only make it easier for current to flow. And the total current must be **larger than any single branch**. If your answer breaks either rule, you added resistances that should have been combined.

A useful shortcut: equal resistors in parallel divide by how many there are. Two 470 ohm in parallel is 235 ohm; four of them is 117.5 ohm.

## Why the building is parallel
Every receptacle in a patient room hangs across the same supply, so each gets the full 120 V and unplugging one device changes nothing for the others. Inside a device the same thinking applies: the display, the controller, the pump motor, and the alarm all hang off the power supply in parallel, each drawing what it needs at the same rail voltage. Series connections in a hospital are reserved for things meant to interrupt everything downstream, which is exactly one list: switches, fuses, breakers, and interlocks.

The old string of holiday lights is the teaching example because the failure is so visible: wired in series, one dead bulb opens the loop and the whole string goes dark, and you have to find the single bad one by testing. Modern strings are wired in parallel sections for exactly that reason.`,

u3l4: `## A schematic is a map of paths
A drawing of a circuit tells you nothing about where parts physically sit, and that is deliberate. It shows what connects to what, so you can answer one question: can current get from here to there? Learn to read it as a set of routes rather than a picture.

Conventions worth knowing: signals are drawn flowing **left to right**, power is drawn with the positive supply at the **top** and ground at the **bottom**, and a long drawing is cut into sheets with labeled off-page connectors rather than wires running across the page.

## The symbols
\`\`\`
Part              Symbol in words                                       Watch out for
cell              one long line, one short; the long line is positive    polarity
battery           several cells stacked                                  total voltage marked beside it
resistor          a zigzag, or a plain rectangle on newer drawings       value and wattage
lamp              a circle with an X or a loop inside                   it is a load, not an indicator
switch            a line lifted off a contact                           drawn in its unoperated state
fuse              a loop, or an S, between two terminals                in series, always
circuit breaker   a switch with a hook or an arc symbol                 resettable, so no spare needed
capacitor         two parallel plates; a curved plate means polarized    polarized ones go in one way
inductor          a row of loops or humps                               a coil; also a relay or a motor
transformer       two coils facing each other, core lines between        AC only
diode             a triangle pointing into a bar                        current flows the way it points
LED               the same with two small arrows leaving it             polarized, needs a resistor
ground            three horizontal lines, each shorter than the last    the circuit's zero
chassis ground    a small hatched bracket or rake                       bonded to the metal case
\`\`\`

## Dots and crossings
A **dot** at an intersection means the wires are joined. **No dot** means they merely cross on the page and are not connected. Older drawings used a small hop over the crossing wire instead. Reading a missing dot as a connection is how a beginner convinces themselves a board has a short designed into it.

## Tracing the power path
This is the skill the exam tests under the heading of troubleshooting, and the order never changes.

\`\`\`
Step   What you probe                      Good                    Bad
1      the receptacle                      about 120 V AC          0 V: it is the outlet or the breaker
2      the cord, end to end, unplugged     continuity on all three OL: the cord
3      across the fuse, powered            about 0 V               full supply: the fuse is open
4      across the switch, closed, powered  about 0 V               full supply: the switch is open
5      the power supply output rails       the printed value       low, missing, or unstable: the supply
6      at the load                         the rail voltage        rail present, load dead: the load
\`\`\`

The method behind it: walk along the path until the voltage you expect disappears. Whatever sits between the last good point and the first bad point is the fault. You are not guessing; you are bisecting.

## Block diagrams
A block diagram throws away the components and draws each functional section as a labeled box with arrows between them: mains inlet, power supply, main controller, user interface, motor drive, motor, sensors back to the controller. It will never identify a failed part, but it tells you which section to probe, which boards talk to each other, and where the signal you care about is supposed to appear. For a device you have never opened, it is the right first page: read it, pick the section, then go to the schematic for that section.`,

u3l5: `## Two faults, mirror images
Every electrical failure reduces to a path problem. Either a path that should exist does not, or a path exists that should not.

\`\`\`
                     Open                           Short
what it is           a break in the path            an unintended low-resistance path
resistance           infinite: the meter shows OL   near zero: continuity beeps
current              none in that loop              far more than intended
voltage across it    the full source voltage        about 0 V
heat                 none                           a lot: hot wires, burned traces, smoke
typical causes       blown fuse, broken wire,       solder bridge, pinched wire on the chassis,
                     cold joint, corroded pin,      dropped screw, worn insulation,
                     open switch, burnt-out lamp    liquid spill
how you find it      volts across parts, powered;   continuity, unpowered, one end isolated
                     ohms, unpowered
\`\`\`

The voltage rule is the one that does the work. In a dead series loop, no current flows, so no good part can drop any voltage. Probe across each part in turn and the one showing the entire supply is the break. A resistor reading 0 V in a dead circuit is not faulty; it is simply idle.

## A worked diagnosis
The lab circuit is a battery, a fuse, a closed switch, and two 1k resistors in a loop, and the device is dead.

1. Across the fuse: **9 V**. That is the whole supply, so the fuse is open.
2. Across R1: **0 V**. No current, so no drop. R1 is not the fault.
3. Power off, ohms across the fuse: **OL**. Confirmed open.
4. Power off, continuity across each part: R2 **beeps** and reads about 0.3 ohm. A 1k resistor should read about 1,000 ohm and stay silent, so R2 has a short across it.
5. Conclusion: the short across R2 drew enough current to open the fuse.

The fix follows from the diagnosis, and the order matters: remove the short, **then** fit a new fuse of the same rating, **then** power up. Fitting the fuse first destroys the new fuse. Bypassing the fuse to "see if the rest works" removes the only protection in the circuit and can turn a cheap repair into a fire.

## Fuses, properly
\`\`\`
Property           What it means                         Rule
current rating     the amps it will carry indefinitely   replace with the same value, never larger
voltage rating     the voltage it can safely interrupt   same rating as the original, never lower
fast-acting        opens almost at once                  protects semiconductors
slow-blow          tolerates a brief inrush              motors, transformers, heaters
physical size      the body dimensions, as in 5 x 20 mm  it must fit the holder properly
\`\`\`

A higher voltage rating is also safe, but match the original unless the manual says otherwise. A fast fuse fitted where a slow one belongs blows every time the device starts, because the inrush when a motor or transformer energizes is many times the running current. That is a repeatable, maddening fault whose cause is a parts-bin substitution.

## Breakers and GFCI
A **circuit breaker** interrupts the same way a fuse does but resets, using a heat-operated strip for slow overloads and a magnetic element for sudden ones. A breaker that will not stay set is reporting a fault that is still present; holding it in is never the answer.

A **GFCI** protects people, not wiring. It continuously compares the current leaving on the hot conductor with the current returning on the neutral. Equal means all the current came back through the intended path. A difference means some of it went somewhere else, possibly through a person, and the device opens at an imbalance of **4 to 6 mA** under the NFPA 99 requirement for wet locations. Compare that with the body-current table: 4 to 6 mA is around the accepted harmless level and far below the 100 to 300 mA that causes fibrillation. A GFCI is designed to open while the shock is still only unpleasant.`,

u3l6: `## Two kinds of electricity, one boundary
Inside every mains-powered device there is a line with AC on one side and DC on the other, and that line is the power supply. Knowing which side you are probing decides the meter's range, the hazard, and what a wrong reading means.

\`\`\`
                 DC                                AC
direction        one way, steady                   reverses, many times a second
sources          batteries, supply rails, solar    the wall outlet, generators
typical values   3.3, 5, 12, 24 V on boards        120 V at 60 Hz (United States)
                                                   230 V at 50 Hz (much of the world)
meter range      V DC                              V AC
polarity         matters: red positive             not meaningful: it alternates
transformers     do not work on it                 the reason AC is used at all
\`\`\`

## Frequency, period, and the peak
**Frequency** is cycles per second, measured in hertz. **Period** is the duration of one cycle, and it is 1 divided by the frequency.

\`\`\`
60 Hz   ->  period = 1 / 60  = 0.0167 s = 16.7 ms
50 Hz   ->  period = 1 / 50  = 0.020 s  = 20 ms
\`\`\`

The 120 V on the label is an **RMS** value: the effective value, meaning the steady DC voltage that would heat a resistor at the same rate. The waveform itself swings well past that, peaking at about **170 V** in each direction (120 multiplied by about 1.414). Your multimeter reports the effective value, which is the useful number; an oscilloscope draws the peaks, which is why the two instruments appear to disagree about the same outlet.

And 60 Hz is not a neutral detail. Reversing 60 times a second lands near the worst case for disturbing the heart's own electrical timing, and it is also why 60 Hz hum is the background noise every biomedical amplifier is designed to reject.

## Transformers
Two coils sharing an iron core. A changing current in the first coil creates a changing magnetic field, and a changing magnetic field induces a voltage in the second. The voltage ratio equals the turns ratio.

\`\`\`
Turns ratio (primary : secondary)   Fed 120 V   Result
10 : 1                              120 V       12 V, stepped down
1 : 2                               120 V       240 V, stepped up
1 : 1                               120 V       120 V, isolated only
\`\`\`

Power in roughly equals power out, so a step-down transformer delivers lower voltage at higher current. And the whole mechanism depends on **change**, which is why a transformer does nothing on steady DC except get hot: connect DC and you see one brief pulse, then nothing.

An **isolation transformer** is a 1:1 transformer whose purpose is the gap itself. There is no conductive path between input and output, so the output does not reference the building's ground, and a single fault from either output conductor to ground does not complete a circuit through a person. Hospitals use isolated power in a few wet and critical locations, monitored by a line isolation monitor that warns when the isolation has degraded.

## What is inside a linear power supply
\`\`\`
mains AC -> transformer (step down) -> rectifier diodes (one direction only)
         -> filter capacitor (smooth the bumps) -> regulator (hold it exact) -> DC out
\`\`\`

Each stage has a signature failure. An open rectifier diode turns full-wave into half-wave rectification: the ripple drops to 60 Hz, which you hear as a hum, and the supply sags under load. A dried-out filter capacitor leaves **ripple** on the rail, and ripple shows up as noise on a trace, erratic readings, or random resets under load. A failed regulator gives a rail that is too high, too low, or that collapses the moment the device does any work.

## The outlet
Three contacts: the narrow slot is **hot**, the wide slot is **neutral**, the round hole is **ground**. Hot carries the supply, neutral is the working return, and ground carries nothing at all until something has gone wrong. A **hospital-grade** receptacle or plug is marked with a **green dot**, built for blade retention and a reliable ground path, and receptacle testing checks exactly those two things plus correct polarity.`,

u3l7: `## Capacitors
Two plates with an insulator between them. Apply voltage and charge accumulates; the charge stays when the supply is removed. Capacitance is measured in **farads**, a unit so large that real parts are marked in **microfarads** (millionths) or picofarads (million-millionths). A capacitor blocks steady DC and passes changing signals, which gives it three everyday jobs: smoothing a power supply rail, coupling a signal from one stage to the next while blocking the DC bias, and setting timing with a resistor.

\`\`\`
Capacitor fact                    Why it matters to you
stores charge after power off      the hazard: discharge before touching anything
electrolytic types are polarized   a stripe on the can, a plus on the board; backwards, it vents
value drifts and dries out         a tired filter capacitor leaves ripple and random faults
large energy stores in defib units hundreds of joules, discharged in milliseconds
\`\`\`

The defibrillator is the case that matters. Its capacitor is designed to hold a charge capable of restarting a heart, so the safety procedure is non-negotiable: follow the manual's discharge routine, dump any stored charge into the analyzer, confirm with a meter that the terminals are dead, and never treat a blank display as evidence of a discharged capacitor.

## Inductors
A coil of wire, often around an iron core. Current builds a magnetic field; the field opposes any change in that current. Inductance is measured in **henries**. You meet coils as supply filters, as transformer windings, as the coil in a **relay** (an electrically operated switch, so a small control signal can carry a large load), and as the windings of every motor and solenoid. Because a coil resists change, switching it off produces a large reverse voltage spike, which is why a protective diode sits across relay and motor coils and why a failed one quietly destroys the transistor that drives it.

## Diodes and LEDs
\`\`\`
Part                 Forward drop        Reverse        Notes
silicon diode        0.6 to 0.7 V        blocks         rectifying, protection, spike clamping
red LED              about 1.8 to 2.0 V  blocks         needs a series resistor, always
blue or white LED    up to about 3.3 V   blocks         higher drop, same rules
\`\`\`

On the meter's **diode test**, red probe to the **anode** (the triangle side) and black to the **cathode** (the bar side, marked with a stripe on the body) shows the forward drop. Swap the probes and a healthy part reads OL. Two failure signatures: **OL in both directions** means it is open, **near zero in both directions** means it is shorted.

An LED differs from a plain diode in two practical ways. It is **polarized** in a way you notice, because backwards it simply never lights, and on a new part the **longer leg is the anode**. And its current rises almost vertically once it begins conducting, so it must have a **series resistor** to set that current. Working example: a red LED on a 9 V supply needs to drop 9 minus about 2, which is 7 V, across the resistor, and for 15 mA that is 7 / 0.015 = about 470 ohm.

## Transistors and integrated circuits
Three terminals. A small current or voltage on the control terminal governs a much larger current through the other two. As a **switch** it is either fully on or fully off, which is how a controller runs a motor, heater, valve, or solenoid with no contacts to wear out. As an **amplifier** it reproduces a small signal at a larger size, which is how a microvolt signal from an electrode becomes a trace on a screen.

**Integrated circuits** are thousands to billions of transistors in one package: processors, memory, amplifiers, converters, regulators. They are the most capable parts on a board and the most fragile in one particular way, because a static discharge too small to feel can damage one with no outward sign at all.`,

u3l8: `## Why batteries are so much of the work
A battery is the only part of a device that is guaranteed to wear out on a schedule, and it is the part a patient's safety most often depends on at the worst moment: in transport, during a power failure, or at a code. So batteries generate work orders out of proportion to their cost, and a technician who understands them closes those calls quickly.

## Chemistry by voltage
\`\`\`
Chemistry              Volts per cell   Rechargeable   Where you find it
alkaline               1.5              no             handheld instruments, otoscopes, remotes
nickel metal hydride   1.2              yes             older portable devices, some chargers
lithium coin cell      3                no             board settings and the real-time clock
lithium-ion            3.6 to 3.7       yes             most modern portable devices
sealed lead-acid       2                yes             carts, beds, infusion pumps, a UPS
\`\`\`

Those per-cell numbers let you work out a pack without any documentation: a 7.2 V lithium-ion pack is two cells, a 9.6 V nickel pack is eight, and a 12 V lead-acid block is six.

## Capacity, and why voltage lies
Capacity is **amp-hours** or **milliamp-hours**: current multiplied by time. A 2,000 mAh pack supplying 200 mA runs for roughly ten hours in theory and less in practice.

The trap is that an exhausted pack still reads its rated voltage with nothing connected. Internal resistance rises as a pack ages, so the voltage holds until the device asks for current and then sags immediately. A meter across the terminals of a dead pack can read a confident 12.4 V. This is why a battery check is a **timed runtime test under a realistic load**, compared with the manufacturer's specification, and why the result is a number you write down rather than a judgement you form.

\`\`\`
Stacking      Voltage          Capacity
in series     adds             unchanged
in parallel   unchanged        adds
\`\`\`

Never mix old cells with new, or two chemistries, in one series string: the weakest cell is driven into reverse by the others and both the cell and the pack are ruined.

## Charging and care
A charger belongs to a chemistry. Lithium packs take constant current and then a held constant voltage, with a protection board inside the pack watching voltage, current, and temperature. Nickel chemistries are charged until a voltage or temperature signature says stop. Lead-acid wants a long, gentle finish. A bench supply set to the right voltage is not a charger and will eventually damage the pack or start a fire.

\`\`\`
Sign                              Action
swelling, a case that will not close   remove from service now; do not charge, puncture, or press
hot during normal charging             stop, investigate the charger and the pack
leaking or crusted terminals           replace, clean the contacts, check for corrosion damage
fails the runtime specification        replace, and document the measured runtime
past its install date                  replace on schedule, not on failure
\`\`\`

Store spares cool and partly charged rather than full or flat, label them with the date received, and rotate the stock so nothing sits for years.

## Battery work on the devices you will see
On a **defibrillator** the battery and the self-test log are the core of the scheduled maintenance, because the device sits idle until an emergency and a weak pack is invisible until then. On an **infusion pump** the runtime test proves a patient can be moved between floors without losing the infusion. On a **monitor** it proves the same for transport. Write the install date on the pack itself as well as in the record, so the next technician does not have to guess its age.

Every cell goes to the facility's recycling or hazardous waste stream, never the regular trash, and a swollen lithium pack is handled as a fire risk until it is gone. A **UPS** is this whole lesson at room scale: batteries plus an inverter that carry equipment through an outage until the generator takes over, with internal batteries that age and get replaced on a schedule just like any other.`,

u3l9: `## Colors, and why there are two schemes
\`\`\`
Scheme                        Hot / live        Neutral   Ground
United States building wiring black or red      white     green or bare copper
IEC device cords               brown            blue      green with a yellow stripe
DC wiring and test leads       red is positive   -         black is negative
\`\`\`

A device built for the global market has brown, blue, and green-yellow inside and a plug wired to the local scheme outside, so you must read both fluently. One thing is constant: anything green is ground, and nothing else is ever green. The exam leans on that.

## Gauge and construction
**AWG** numbers run backwards from intuition: a **lower number is a thicker wire**. 10 AWG is heavy, 14 AWG is a typical branch circuit, 18 AWG is a light cord, 24 AWG is a signal wire. Thicker wire has less resistance per foot, so it carries more current with less heating and less voltage lost along the run. Under-size the wire for the load and you get a warm cord, a device that misbehaves at the far end of a long run, and eventually a fire.

\`\`\`
Construction   Made of                  Use it for                  Fails when
stranded       many fine strands        cords, patient cables, leads  crushed or pinched
solid          one conductor            fixed wiring, breadboards     repeatedly flexed
\`\`\`

Anything that moves gets stranded wire. Put solid wire where something flexes and it work-hardens and snaps, almost always just inside the strain relief where the break is invisible. That is also where cords on real equipment fail, which is why the visual inspection pays special attention to both ends of every cord and why a strain relief or cord clamp is a safety-relevant part, not a cosmetic one.

## Ground, one more time
Ground does two jobs: it is the **zero reference** for measurement, and it is the **protective path** that bonds a metal case back to the outlet so a fault current trips the breaker instead of waiting for a person. That is why a cracked plug, a missing or bent ground pin, or a three-prong to two-prong adapter on patient-care equipment is an immediate removal from service, and why **ground resistance, chassis to the plug's ground pin, must be 0.5 ohm or less** under NFPA 99.

## Continuity and the diode test, in practice
\`\`\`
Test                 Good reading            Bad reading     Rules
continuity, switch   beep, under 1 ohm       OL when closed  power off
continuity, cable    beep end to end         OL              power off, isolate one end, flex it
diode test, forward  0.6 to 0.7 V            OL = open       red on the anode
diode test, red LED  about 1.8 to 2.0 V      0 V = shorted   red on the anode
\`\`\`

Continuity condemns cables that look perfect, because a conductor can break inside its jacket with no outward mark. Flex the cable along its length while watching the display to catch the intermittent ones, and test each conductor of a multi-conductor cable separately. Never trust your eyes on a cable that has been run over by a bed.

## ESD, the damage with no evidence
Walking across a floor and standing up from a chair charges you to thousands of volts. The spark you can feel is roughly **3,000 V**. But as little as **100 V** can destroy a chip with no spark, no sound, and no mark, and the part may then work normally for days before failing. Because the cause and the symptom are separated in time, nobody ever connects the two, which is why the habits have to be unconditional rather than situational.

\`\`\`
Control              What it does
grounded wrist strap keeps you at the same potential as the work, through a safe resistor
grounded mat         gives the bench a controlled path to ground
touch the chassis    equalizes you with the device before you reach inside
anti-static bags     shield boards in transport and storage
hold by the edges    keeps your charge away from pins and chip legs
humidity             damp air bleeds charge away; dry winter air is the worst case
\`\`\`

The one thing a wrist strap is not is a safety device for you. It is deliberately built with a high-value resistor so it cannot carry a dangerous current, and it is never a substitute for de-energizing equipment before you work on it.`
});
