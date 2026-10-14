// CRES Academy curriculum, units 9 and 10. Original teaching content for the AAMI/ACI CRES exam.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, ``` fenced block, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u9", n: 9, title: "Troubleshooting Imaging Systems", domain: 5,
  blurb: "The method, the priorities, the resources, and the faults of every imaging system the exam names.",
  assumes: "Units 5 to 8.",
  lessons: [
    {
      id: "u9l1", title: "The Method: Symptom, History, Isolate, Verify; Device Error Versus Use Error", domain: 5, obj: "PS-D", minutes: 10,
      body: `Problem solving is a quarter of the exam, and it is written as method rather than as memory: you are handed a symptom and asked what you would do first. The method does not change between a radiographic room, a C-arm bay, and a reading station, and it is four steps long.

## Symptom, history, isolate, verify
1. **Symptom.** Write what the operator saw, in the operator's words, with the room, the exam, the step where it happens, and how often. "It is not working" is not a symptom. Then reproduce it yourself. A fault you cannot reproduce is still only a report.
2. **History.** Read the CMMS service history and the system's own error log before a cover comes off. What changed is the most useful question in service: a software update, a board swapped last week, a new technologist, a power event overnight.
3. **Isolate.** Split the system into blocks and prove which side of each split is good, so every measurement halves what is left.
4. **Verify.** Run the test that would have caught the fault, which usually means a test exposure and a phantom image, record the number against its tolerance, and tell the room what you proved.

## Isolating by halves
\`\`\`
Block          Prove it with
Power          line voltage under load, breaker, contactor, internal supplies
Control        console entries reaching the controller, interlock chain closed
High voltage   measured kVp and mAs, cable terminations, tank and tube behaviour
Mechanical     locks, drives, detents, collision sensors, light field, distance
Receptor       a flat-field image and a phantom image against the baseline on file
Network        link light, address, then a DICOM echo to the archive
\`\`\`

## Device error or use error
Reproduce the complaint yourself before you order a part. An image that is too dark on one station, a burnt-out abdomen, a chest with the lungs blown out: those come from the wrong technique, the wrong AEC chamber, the wrong receptor selected, or the wrong protocol chosen as often as from a fault. A device error is fixed with a repair and a verification. A use error is fixed with a demonstration and applications training, documented the same way, without blame. Calling one the other wastes either a part or a reputation.

## Simplest cause first, and when to stop
Check the free, fast, and safe things first: power, the right mode, a parked receptor, a cable, a setting. Escalate to the manufacturer when the fault is inside a sealed assembly, when the adjustment needs service software or a licence you do not hold, when the parts are not field-replaceable, or when two attempts have not moved the symptom. Stopping is a decision, not a defeat, and it belongs in the record with everything you proved.

> Exam tip: symptom in the operator's words and reproduced, history from the CMMS and the error log, isolate by halves, verify with a measurement. Simplest and safest cause first. A fault nobody else can reproduce is usually use error, and its fix is training, not a part.`,
      hook: "Get the symptom in the operator's words and reproduce it, read the history in the CMMS and the error log, isolate power, control, high voltage, mechanics, receptor, and network by halves, then verify with the measurement that would have caught the fault, and tell a device error (repair) from a use error (applications training) before you order a part."
    },
    {
      id: "u9l2", title: "Prioritizing Imaging Repairs by Risk, Downtime, and Regulatory Exposure", domain: 5, obj: "PS-A", minutes: 9,
      body: `On any morning you will have more calls than hours. The exam asks you to order them, and it expects one order every time: safety, then compliance that affects safety, then clinical downtime, then convenience.

## What makes one call outrank another
- **Risk to the patient or staff.** Anything that can deliver unintended dose, drop a part of the machine on somebody, or shock somebody goes first. A collimator lamp that no longer shows the field invites an uncollimated exposure, so it is a dose problem wearing a cosmetic disguise.
- **Regulatory exposure.** A system outside the limits the state and the federal performance rules set does not stay in use while you schedule the fix. Measured kVp outside 10 percent of the indicated value, a fluoroscope above the 10 R/min tabletop limit, or an AEC backup timer that will not end an exposure at 6 s or 600 mAs is an out-of-service decision.
- **Clinical downtime.** Weigh what the room carries. The only computed tomography scanner in the building outranks the third radiographic room, which has two neighbours; an emergency department portable outranks a clinic unit that works tomorrow.
- **Convenience.** Cosmetic and comfort items wait, but they are written down so they are not lost and so a pattern shows.

## Ordering the morning
\`\`\`
1  Unsafe and in use         stop it, lock it out, tag it, tell the manager now
2  Out of tolerance and in use  out of service until measured back in tolerance
3  Down and no alternative    the single scanner, the only mammography unit
4  Down with an alternative   reroute while you work, say when it returns
5  Degraded but usable        a known limit the room can work around
6  Cosmetic                   logged, scheduled, never forgotten
\`\`\`

## Telling radiology where they stand
Radiology does not need your fault tree. It needs three sentences: what works now, what does not, and when the room comes back. Give a time you can keep and update it when it slips. Arrange the workaround with the lead technologist, not around them: the adjacent room, a loaner, a rented mobile unit, the vendor's service contract response clock.

## Out of service and back again
Taking a system out of service is a documented act: a tag the staff cannot miss, the power secured if the hazard is electrical or mechanical, a work order with the reason and the measurement, and notice to the manager and the radiation safety officer when dose or a regulation is involved. It returns the same way, with the verification readings and the date in the record, because that is the evidence a surveyor reads later.

> Exam tip: safety first, then a system outside its limits, then downtime weighted by whether an alternative exists, then convenience. Out of service means tagged, documented, and announced; it returns only on a measurement, not on a feeling.`,
      hook: "Order the queue by patient and staff risk, then systems outside their limits, then downtime weighted by whether another room can carry the work, then convenience; tag and document anything taken out of service, arrange the workaround with the lead technologist, and return the system on a verification reading in the record."
    },
    {
      id: "u9l3", title: "Using the Resources: Schematics, Service Manuals, Diagnostic Software, and Error Logs", domain: 5, obj: "PS-B", minutes: 10,
      body: `Nobody memorizes an imaging system. The technicians who look fast are the ones who know where the answer lives, and the exam tests that directly: which document, which tool, which log.

## What a service manual actually holds
- **Theory of operation**, which is where you learn the block diagram, the sequence of an exposure, and what each assembly is supposed to do.
- **Adjustment and calibration procedures**, with the order they must be done in. Calibrations usually have prerequisites: a kVp calibration done before the line voltage is corrected has to be done twice.
- **Error code tables**, which turn a number on a console into a short list of causes.
- **Parts lists and exploded views**, which give the ordering number and show how the assembly comes apart without breaking the next part.
- **Specifications and tolerances**, which are the numbers you verify against at the end.

## Schematics and block diagrams
A block diagram answers "where does this signal come from" and a schematic answers "what should I measure here". Follow four paths on any imaging system: the **power path** from the feed to the internal supplies, the **control path** from the console to the controller to the drivers, the **interlock chain**, which is a series string that any open contact breaks, and the **high-voltage path** from the tank to the tube. Use the test points the manual names and compare with the expected values printed next to them; a reading nobody expected is often a probe on the wrong pin.

\`\`\`
Symptom                        The resource that answers it fastest
Fault code on the console      error code table, then the error log for what preceded it
No exposure, no code           the interlock chain on the schematic, contact by contact
Output measures wrong          calibration procedure and the specification table
Image artifact                 the receptor section plus service software detector tests
Intermittent and movement-tied the wiring diagram and a continuity wiggle test
Nothing fits the symptom       technical support, with readings in hand
\`\`\`

## Diagnostic software and logs
Modern systems hold more diagnostics than any meter you own: a service mode, error and event logs with timestamps, tube and exposure counters, calibration routines, and detector tests. Read and export the log **before** you clear it, because clearing it destroys the sequence that explains the fault. Match timestamps against the room schedule; a fault that only appears at the first exposure of the morning is a warm-up or a thermal problem.

> Exam tip: theory of operation, adjustments, error codes, parts, and tolerances come from the service manual; test points and the interlock chain come from the schematic; the sequence of a fault comes from the error log, which you export before clearing. Field notices and support calls want the model, serial number, software version, and your readings.`,
      hook: "The service manual carries the theory of operation, the adjustment order, the error code table, the parts list, and the tolerances; the schematic carries the power, control, interlock, and high-voltage paths with test points and expected values; service software and the error log carry the sequence, so export the log before you clear it and keep manuals, firmware notes, and field notices current."
    },
    {
      id: "u9l4", title: "Power and Generator Faults: No Exposure, Interlocks, High-Voltage Failures, Tube Arcing", domain: 5, obj: "PS-C", minutes: 11,
      body: `"The room will not take a picture" is the most common call in radiography and the most commonly mishandled, because the chain from the wall to the focal spot is long and most of it is cheap to check.

## No exposure
With **no error code**, suspect the series chain first. Door interlock, emergency stop, rotor not ready, receptor not parked or the wrong size selected, collimator or tray switch, the exposure switch itself: any open contact stops the exposure and most of them are mechanical. Follow the chain on the schematic contact by contact rather than guessing.
With **a generator fault code**, read the code and the log. Thermal cutouts, overcurrent, tube arc, line voltage out of range, and failed contactors each have their own number.

\`\`\`
Symptom                     First checks, in order
No exposure, no code        interlocks, rotor ready, receptor parked, exposure switch
No exposure, with a code    code table, then the log entries before it
Rotor hums, never ready     stator drive, run capacitor, bearing drag
Exposure terminates early   AEC backup at 6 s or 600 mAs, thermal, arc detection
Output low on every station line voltage under load, then kVp calibration
Output varies between mA stations  mA calibration and linearity, within 10 percent
\`\`\`

## Low or inconsistent output
Measure before you adjust. Incoming line voltage sags under exposure load when the feed is undersized or a connection is loose, and every calibrated value moves with it. Then take measured kVp, which must sit within **10 percent** of the indicated value, exposure time, which must sit within **5 percent** above 10 ms and **20 percent** at 10 ms or less, linearity, which allows no more than **10 percent** variation in output per mAs between adjacent stations, and reproducibility, which allows no more than **plus or minus 5 percent** over repeated identical exposures. An AEC that burns out or washes out one projection is a chamber, a cell selection, or a calibration, not a generator.

## The high-voltage section and the tube
High-voltage faults announce themselves: a snap at the moment of exposure, an overcurrent or tube-arc code, a burnt smell, oil on the floor. Causes are cable terminations contaminated or poorly greased, low or degraded transformer oil, a failing rectifier stack, and a tube whose envelope has been plated with evaporated tungsten so current jumps the vacuum. A gassy tube gives falling output, erratic kVp, and arcing. Rotor faults live next door, and they show as noise, a slow spin-up, or a rotor that never readies: a noisy or slow spin-up with a healthy stator and capacitor is bearing wear, which means the tube.

**Working in the high-voltage section** is the one part of this lesson that can kill you. Power off at the disconnect, lock and tag it, wait the discharge time the manual states, ground the high-voltage terminals with the manufacturer's grounding stick, and only then touch anything. Never work alone in an energized tank.

> Exam tip: no exposure with no code is the interlock chain; with a code, read the code and the log. Prove line voltage under load before calibrating anything. kVp within 10 percent, timer within 5 percent above 10 ms, linearity within 10 percent, reproducibility within plus or minus 5 percent. Arcing with low output and a noisy rotor is the tube.`,
      hook: "No exposure with no code is an open interlock (door, emergency stop, rotor ready, receptor parked, collimator, switch) and with a code is the code table plus the log; prove line voltage under load before touching a calibration, then verify kVp within 10 percent, time within 5 percent above 10 ms, linearity within 10 percent and reproducibility within plus or minus 5 percent; arcing, falling output, and a noisy slow rotor point at the tube, and the high-voltage tank is entered only after lockout, the stated discharge time, and a grounding stick."
    },
    {
      id: "u9l5", title: "Tube and Image Quality Faults: Heat, Focal-Spot Blur, Artifacts, Grid Errors, Motion", domain: 5, obj: "PS-C", minutes: 10,
      body: `An image complaint is the hardest call in imaging service, because three different systems can produce the same bad picture. The skill is one test that tells the generator, the tube, and the receptor apart.

## Heat and an aging tube
An overheated anode throws thermal faults, refuses the next series, and in the meantime gives falling and erratic output. The **rating chart** clears a single exposure at that kVp, mA, time, focal spot, and anode speed; the **anode and housing cooling curves** clear the next series. An aging tube loses output as the filament thins, plates the envelope until current jumps the vacuum, and roughens the anode track so output varies exposure to exposure. Focal spots grow with age and with high mA stations, and a larger spot blurs edges everywhere in the image at once, which no amount of processing fixes.

## Artifacts, by what they look like
Grid errors are called **cutoff**, and each kind of cutoff names its own mistake. The one digital artifact with a name of its own is **moire**, the wavy pattern a grid produces when its line frequency beats against the detector's sampling.
\`\`\`
Appearance                 Cause
Fine lines across the image a stationary grid or a Bucky that is not moving
Density lost at the edges   grid upside down
Density lost everywhere     grid off level, or the wrong focal distance for that grid
Density lost at the sides    tube off center to the grid
A wavy repeating pattern    grid frequency beating against detector sampling
Stripes or a dead line      a stale gain or pixel map, or dead rows and columns
A faint previous image      an incomplete plate erase
The same mark every image   a scored plate, dust in the beam path, or a bad pixel group
\`\`\`
Digital artifacts fall into three families: the receptor, the software that corrects it, and the object in the beam. Dead or defective pixels and dead rows are normal and are filled in from neighbouring pixels by the correction map; a single one does not harm a diagnosis but many of them must be corrected, and scratches or large groups mean a replacement. Stripes that survive a fresh detector calibration are a map or a hardware fault rather than a response error. A plate that has sat unused for 24 hours picks up background radiation and must be erased again before use.

## Geometry and motion
Magnification and distortion are geometry, not faults: a longer SID and a smaller OID give a sharper, truer image, and an angled part or an off-center tube distorts it. Prove that the light field coincides with the radiation field within **2 percent of the SID**, prove the SID indicator to the same 2 percent, and prove the detent positions. Blur with sharp bone edges elsewhere is patient motion; blur across the whole image with a correct geometry is focal spot or exposure time, so measure the time with a meter and suspect the timer.

## One test that tells them apart
Expose a phantom at a fixed technique on the suspect receptor, then on a known good receptor in the same room. If the image follows the receptor, it is the receptor. If it stays with the room, measure kVp and mAs: wrong numbers are the generator, right numbers with poor sharpness are the tube.

> Exam tip: grid lines mean a stationary grid, edge loss means upside down, loss everywhere means off level or wrong focal distance, side loss means off center, and a wavy pattern means grid and sampling frequencies beating. Ghosts are an incomplete erase. A swap of the receptor with a phantom at a fixed technique separates receptor, generator, and tube.`,
      hook: "Heat and age make a tube lose output, arc, and blur through a growing focal spot; grid lines, edge or side density loss, a wavy pattern, stripes, ghosts, and repeating marks each name their own cause; the light field and x-ray field must agree within 2 percent of the SID; and a phantom exposed at a fixed technique on a suspect receptor and then a known good one separates receptor from generator from tube."
    },
    {
      id: "u9l6", title: "Mechanical Faults: Tables, Stands, Locks, Collimator, and Detector Positioning", domain: 5, obj: "PS-C", minutes: 9,
      body: `Mechanical faults are the ones that injure people. Nothing else in an imaging room can drop, crush, or pinch, and a lock that lets go while a patient is on the table is an incident report, not a work order.

## Tables, stands, and drives
A tabletop that will not float is a lock not releasing, a failed float solenoid, a drive belt, or a control switch. Tilt and elevation run on motors, screw jacks, hydraulics, or cables and counterweights, each with a limit switch at both ends, and a stalled motion is as often a limit switch or a sensor as a motor. Inspect cables, chains, and counterweights for broken strands, flat spots, frayed ends, and loose terminations every visit, because that is the inspection that keeps a tube column from falling. Bearing play, worn rails, and dry ways show up first as a motion the technologist describes as rough or grabby.

\`\`\`
Symptom                       Likely cause                   Act
Lock will not hold            pad wear, air gap, failed coil  out of service now
Column or detector drifts down  counterweight cable, brake    out of service now
Tabletop will not float       lock, solenoid, belt, switch    repair, usable meanwhile
Motion stops partway          limit switch, sensor, drive     repair
Collision stop will not clear collision sensor or its wiring  repair before use
Light field does not match    lamp, mirror, blade adjustment  repair, dose issue
SID reads wrong               indicator sensor or scale       repair, dose issue
\`\`\`

## Locks, detents, and collision sensors
Detents are the preset positions that make the day fast, and when they drift the room gets slow and centering gets inconsistent. Locks and brakes are different: they are safety parts. A failed lock, a slipping brake, or a collision sensor that no longer stops motion comes out of service immediately, and so does any suspended component whose cable inspection you cannot pass.

## The collimator and the positioning of the receptor
The collimator carries three things you must prove: blades that actually track the selected field, a lamp and mirror whose light field agrees with the x-ray field within **2 percent of the SID**, and automatic collimation and SID indication held to the same **2 percent**. A dark collimator lamp is a dose problem, because the technologist will guess the field. On the receptor side, check that the tray centers and latches, that the wall stand height and detents match the tube, and that a wireless panel sits in its holder correctly so the room knows it is parked.

## Wear and lubrication
Lubricate only what the manual names, with what it names; grease on a clutch surface or in a brake is a failure you built. Log play, noise, and effort at each visit so a trend is visible before a part breaks.

> Exam tip: locks, brakes, counterweights, suspended components, and collision sensors are safety items and come out of service at once. Light field to x-ray field, automatic collimation, and the SID indicator all sit within 2 percent of the SID. A rough or grabby motion is wear; a motion that stops partway is usually a limit switch or a sensor.`,
      hook: "Tables and stands fail at locks, brakes, drives, limit switches, cables, and counterweights, and anything that can drop or crush comes out of service immediately; collimator blades, the light field, automatic collimation, and the SID indicator are all held within 2 percent of the SID; detents that drift make centering inconsistent; and lubrication follows the manual, because grease in a brake is a fault you created."
    },
    {
      id: "u9l7", title: "Digital Receptor and Fluoroscopy Faults: Dead Pixels, Calibration, Intensifier and Panel Failures", domain: 5, obj: "PS-C", minutes: 10,
      body: `Receptors are the most expensive part of a modern room and the part the department complains about most, so knowing when a calibration fixes a fault and when it only hides one is worth real money.

## Receptor faults
- **Dead pixels, rows, and columns** are expected and are filled in from neighbouring pixels by the defect map. A scratch, a growing cluster, or a line that the map does not cover is a replacement, not a recalibration.
- **Uniformity** drifts as the detector ages or as its temperature changes, so a flat-field image shows shading, banding, or a mottled background. That is what a gain calibration corrects.
- **Ghosting** is a previous image still in the receptor: on a plate it is an incomplete erase, and a plate unused for 24 hours is re-erased before use; on a panel it is lag, which worsens as the panel ages or runs hot.
- **Wireless panels** add their own list: a battery that will not hold a shift, a panel that drops off the access point mid-exam, a charging contact that is dirty, and a panel left out of its holder so the room does not know it is parked.
- **Plates and cassettes** wear mechanically: scored plates, peeling edges, light leaks, and dust on the reader's mirrors and lenses, which is a service job rather than a cleaning job.

\`\`\`
Fault                        Does a recalibration fix it
Shading or banding, uniform  yes, run the gain and offset calibration
New dead rows or clusters     no, update the map if allowed, else replace
Scratch or impact damage      no, replace the receptor
Ghost on a plate              no, erase it; repeated ghosts mean the reader
Lag on an aging panel         no, and it worsens with heat; check cooling
Noise after a board change    yes, calibrate, then verify with a phantom
\`\`\`

## Fluoroscopy
An image intensifier ages and loses gain, so the automatic brightness control raises technique to defend brightness and **dose rate climbs**. Dim and noisy at the limit, image rotation, and edge distortion all point at the intensifier; flat panels do not rotate or distort at the edges, they fail in rows, columns, and panels. Add vacuum loss, a burnt input phosphor from a parked beam, optics and camera faults, and an automatic brightness control that hunts because its feedback loop or its calibration is wrong. Always compare the measured tabletop dose rate with the baseline against the **10 R/min** normal limit and the **20 R/min** boost limit, confirm the five-minute audible timer, and check that nobody left a magnification mode or continuous fluoroscopy engaged. The monitor chain is part of the image: cables, the graphics path, and a display that has drifted out of calibration all look like a fluoroscopy fault.

## Verification after any receptor work
Flat-field image, phantom image at a fixed technique against the baseline on file, exposure index or dose indicator in range, and the numbers written down. A receptor job is not finished until that set is in the record.

> Exam tip: uniformity, shading, and noise are what a gain calibration fixes; dead clusters, scratches, and lag are not. Dim and noisy with a climbing dose rate is an aging intensifier, and rotation or edge distortion only happens on an intensifier. Measure the tabletop rate against 10 R/min and 20 R/min, and verify every receptor repair with a phantom.`,
      hook: "Gain and offset calibration fixes shading, banding, and noise but not dead clusters, scratches, or panel lag; ghosting on a plate is an incomplete erase and a plate idle 24 hours is re-erased; a dim, noisy fluoroscopic image with a climbing dose rate, rotation, or edge distortion is an aging intensifier, flat panels fail in rows and columns instead, and every receptor repair ends with a flat field and a phantom image measured against the baseline and the 10 R/min and 20 R/min limits."
    },
    {
      id: "u9l8", title: "Mammography and Ultrasound Faults: Compression, AEC, Probe Failures, Doppler, Disinfection Damage", domain: 5, obj: "PS-C", minutes: 10,
      body: `These two systems share nothing technically and everything procedurally: both are held to a written quality control program, and on both the phantom image is the evidence that settles an argument.

## Mammography
- **Compression.** Powered compression must reach and hold the required force, which is **25 to 40 lb** in both powered and manual modes, and the system must not be able to exceed 40 lb automatically. Verify with a scale, not by feel. A paddle that will not reach is a drive, a force sensor, or a calibration; a paddle that will not release is an immediate out-of-service fault, because it traps a patient. Cracked, bent, or chipped paddles are replaced, not filed smooth.
- **AEC and images.** Images that drift light or dark, or a phantom score that falls, point at the AEC detector position, the cell selected, detector calibration, or target and filter selection. A phantom score drop of more than **0.5** means stop and investigate rather than adjust technique.
- **Filter wheel and repeating marks.** A target or filter error is the wheel motor, its position sensor, or an interlock. A mark in the same place on every image is a detector or plate defect, dust in the beam path, or a damaged paddle.
- **Returning to service.** The written quality control program is federal under MQSA, so the evidence is too: the phantom image back in tolerance, the quality control record signed, and a qualified medical physicist survey after a major component is replaced, before clinical images are taken again.

## Ultrasound
\`\`\`
Symptom                        Cause and the first check
Dark stripe down the image     element dropout or a broken cable conductor
Shadow only in one preset      wrong preset or a failing channel group
Weak, noisy, shallow image     gel and contact, lens wear, connector pins
No Doppler signal              preset, wall filter, gain, then the probe
Image fine, controls dead      panel, cart power, or battery
Probe failed after cleaning    wrong disinfectant, soaked past the line, wet connector
\`\`\`
Swap a known good probe before you condemn anything: a fault that follows the probe is the probe, and a fault that stays with the port is the system. Immersion damage is the most common avoidable probe failure, so the fix is a labelled immersion line, the manufacturer's approved high-level disinfection chemistry, a dry connector, and retraining. Transesophageal probes carry a leakage test as well, because they are inside a patient.

## Verify with the right phantom
Mammography uses the accreditation phantom and its scored image. Ultrasound uses a tissue-mimicking phantom at fixed settings for depth of penetration, resolution, and uniformity, compared with the baseline on file. Without the baseline, a phantom image proves nothing.

> Exam tip: compression 25 to 40 lb in both modes and no automatic exceeding of 40 lb; a phantom score drop over 0.5 means stop and investigate; a paddle that will not release comes out of service at once. A stripe down an ultrasound image is element dropout or a cable conductor, proved by swapping a known good probe; probe damage after cleaning is chemistry, immersion depth, or a wet connector.`,
      hook: "Mammography faults are compression force outside 25 to 40 lb or a paddle that will not release, AEC and detector calibration behind light or dark images and a phantom score that drops more than 0.5, and a filter wheel behind target and filter errors, with the phantom and the physicist survey as the evidence for returning to service; ultrasound faults are element dropout as a dark stripe, cable and connector damage, immersion and disinfectant damage, and dead controls from cart power, all settled by swapping a known good probe and scanning a phantom against the baseline."
    },
    {
      id: "u9l9", title: "Portable and C-arm Faults: Batteries, Chargers, Brakes, and Cables", domain: 5, obj: "PS-C", minutes: 9,
      body: `Mobile equipment lives a hard life: it is pushed into elevators, parked against walls, cleaned with whatever is on the cart, and asked to work on battery at three in the morning. Its faults are therefore mostly power, motion, and flex.

## Batteries and chargers
A battery-powered portable stores the energy for both drive and exposure, so capacity decides whether the unit finishes a round. Test under load, not at rest: a resting voltage can look perfect on a pack that collapses at the first exposure. Log run time and the number of exposures per charge so the trend shows before a failure. Charger faults look like battery faults, so prove the charger output and the charge interlock before condemning a pack, and check that the unit is plugged in between rounds, because a pack stored discharged loses capacity permanently. Replace cells as a matched set and dispose of them as the chemistry requires.

\`\`\`
Symptom                           First check
Will not expose away from mains    pack voltage under load, then charger output
Dies partway through a round       capacity and run time logged against baseline
Drive weak or will not move        dead-man drive switch, belt, bearings, brake drag
Will not hold on a slope           brake pads and adjustment, out of service now
Fault only while the arm moves     cable flex failure, found with a continuity wiggle test
Collimator lamp or laser dark      lamp, timer circuit, mirror alignment: a dose issue
Image blurred on portables only    motion, grid alignment, and a guessed SID
\`\`\`

## Drive, brakes, and transport damage
Brakes and the dead-man drive switch are safety parts: a mobile unit that will not stop or that creeps on a slope comes out of service immediately. Transport wears what flexes. Cables at the tube arm, the hand switch, the footswitch, and the monitor cart break conductor by conductor, so a fault that appears only in one arm position is a flex failure. Find it with continuity and a wiggle test, not by watching the image. Inspect wheels, casters, and bearings, and check that the tube arm and collimator locks hold in transport position so nothing swings into a doorway.

## C-arm motions and the image
A C-arm adds orbital, lateral, wig-wag, and vertical motions, each with brakes, detents, and sometimes a motor. Faults are brake wear, worn detents, and collision stops. The image faults specific to mobile work are motion blur from long exposures, grid misalignment from a tilted detector, and an SID the operator guessed rather than set.

## After use in isolation
A unit used in an isolation room is cleaned with the facility's approved product, with attention to the hand switch, the rails, and the keyboard, and inspected afterwards for liquid damage, because the most common harm from cleaning is a soaked control. Check that the cleaning chemistry is the one the manufacturer approves and that the staff know which that is.

> Exam tip: test batteries under load and log run time; prove the charger before replacing a pack. Brakes and the dead-man drive switch are safety items and come out of service at once. A fault that appears only at one arm position is a cable flex failure, found with a wiggle test. A dark collimator lamp is a dose problem.`,
      hook: "Portables and C-arms fail at the battery pack under load, the charger and its interlock, brakes and the dead-man drive switch, and the cables that flex at the arm, hand switch, and footswitch, with image faults from motion, grid misalignment, and a guessed SID; test under load, prove the charger first, take any brake or drive fault out of service, hunt flex failures with a continuity wiggle test, and inspect for liquid damage after cleaning."
    },
    {
      id: "u9l10", title: "Communicating with Radiology Staff and the Manufacturer: Training, Escalation, the Service Report", domain: 5, obj: "PS-E", minutes: 9,
      body: `A repair nobody understood is only half a repair. The exam asks about communication because the technicians who last in radiology are the ones who can explain a fault to a technologist, a radiologist, a manager, and a vendor engineer in the words each one uses.

## Speaking to clinical staff
Lead with what the clinicians in front of you need: what works now, what does not, and when the room comes back. Translate into their world rather than yours. "The high-voltage cable termination was arcing" becomes "the snapping noise and the dark images came from a cable connection; it is replaced, the output measures correct, and the room is yours." Give a time you can keep, update it when it slips, and tell the lead technologist first so the schedule can move.

## Explaining a use error without blame
When the fault is workflow, make the demonstration the fix. Show the behaviour on the machine, show the setting that produces it, and show the one that does not. Say "this console does that when the outer chamber is selected on a small patient" rather than anything beginning with "you". Offer applications training through the vendor or the superuser, document the conversation in the work order as you would any other corrective action, and watch for the same call returning, because a repeat means the training did not take.

## Escalating to the manufacturer
\`\`\`
Have ready                 Why
Model and serial number    the right manual, parts, and field notices
Software or firmware version  fixes are version specific
Exact error text and codes  the log entry, not a paraphrase
What you measured          kVp, mAs, voltages, resistances, with tolerances
What you already tried     keeps them from walking you back through it
Patient impact and urgency  decides whether this is a callout
Purchase order and contract  decides who pays and how fast parts move
\`\`\`
Ask for the field notices and service bulletins on that model while you have them on the phone, and record the case number in the work order so the next technician can follow the thread.

## The service report
The report is part of the repair: the symptom as reported, what you found, what you did, the parts used by number, the verification readings with their tolerances, the time the room went back into use, and your name. Dose and quality control results belong in it when the repair touched output, geometry, or the receptor, because that is the record a surveyor reads.

## The other departments
Information technology owns the network beyond your device, facilities owns power and cooling, infection prevention owns cleaning chemistry, and radiation safety owns dose. Bring each of them evidence rather than suspicion. On projects, installs, upgrades, and acceptance testing, agree in advance who tests what, who signs the acceptance, and who trains the staff, then record it.

> Exam tip: tell clinical staff what works, what does not, and when it returns. Fix a use error with a demonstration and applications training, documented without blame. Escalate with model, serial number, software version, exact error text, readings, and what you tried. The service report carries symptom, cause, action, parts, verification, and the return-to-service time.`,
      hook: "Tell radiology what works, what does not, and when the room returns, in their words; fix a use error with a demonstration and applications training documented without blame; escalate to the manufacturer with the model, serial number, software version, exact error text, your readings, and what you tried; and close with a service report carrying symptom, cause, action, parts, verification readings, and the return-to-service time."
    }
  ]
});

FRA.units.push({
  id: "u10", n: 10, title: "Imaging Informatics and Networks", domain: 6,
  blurb: "The imaging network from the wall jack to the archive, and how to secure and troubleshoot it.",
  assumes: "Nothing beyond unit 1.",
  lessons: [
    {
      id: "u10l1", title: "Networking Fundamentals for the Imaging Network: IP, Subnets, Switches, VLANs", domain: 6, obj: "HIT-B", minutes: 10,
      body: `A quarter of the exam is informatics, and an imaging department is where a network is least forgiving: the files are huge, the modalities are configured by hand, and an image that does not arrive is a patient who has been exposed for nothing.

## Addresses, masks, and the way out
An IP address is four numbers from 0 to 255 that name one device. The **subnet mask** splits that address into a network part and a host part, so {{255.255.255.0}} leaves the last number for hosts. Two devices sharing one subnet talk to each other directly; everything else leaves by way of a router, which is the **default gateway**. A wrong gateway is the classic imaging misconfiguration, because the modality works perfectly inside its own room and can reach nothing beyond it. Inside a hospital the addresses come from the private ranges {{10.0.0.0/8}}, {{172.16.0.0/12}}, and {{192.168.0.0/16}}.

## Handed out or typed in
DHCP hands out addresses automatically, which suits workstations. Modalities and archives are given **static** addresses instead, because every other node is configured to find them at one address and port, and an address that changes overnight breaks every sending node at once. A device showing a self-assigned {{169.254}} address asked for a lease and nothing answered, which is a link or a DHCP problem rather than an imaging problem. **DNS** turns names into addresses, so when the address works and the name does not, the fault is name resolution.

## Switches, routers, and why imaging gets its own VLAN
\`\`\`
Device    What it does                         Failure as the modality sees it
Switch    joins devices in one network and
          learns each MAC address per port      no link light, or a dead port
Router    joins networks and usually carries
          the access rules between them         reaches its own room, nothing else
Firewall  permits or blocks by address and port reachable but the transfer fails
VLAN      a logical network on shared switches  a good cable in the wrong port
\`\`\`
Imaging sits on its own VLAN for three reasons: the traffic is heavy enough to crowd other users, the access rules it needs are narrow and specific, and many modalities run operating systems that cannot be patched on anybody's schedule, so they are kept where only what they need can reach them. Keep an imaging network diagram with the equipment records: every modality with its address and subnet, the jack it uses, the switch port and VLAN behind that jack, and the archive and worklist nodes it talks to. Half the calls in this unit are answered by reading it.

## Bandwidth, and what a study actually weighs
Image file size is the matrix size multiplied by the grayscale bit depth, so a 4096 x 4096 image at 12 bits is about 25 megabytes before anything else is added.
\`\`\`
Per image, approximately   Nuclear medicine 2 MB      MRI 5 MB
                           CT 10 MB                   CR and DR 20 MB
                           Digital mammography 50 MB
A four-view mammography study            about 200 MB
\`\`\`
A cross-sectional study is hundreds of those images, which is why a scanner is wired rather than wireless, why its sends are scheduled rather than instant, and why a congested link shows up as a growing local queue rather than as an error.

> Exam tip: the mask decides who is local and the gateway is the way out; a wrong gateway looks like the whole network is down from one device. Modalities are static; a self-assigned 169.254 address means DHCP never answered. Address works but name fails means DNS. A switch joins one network, a router joins networks, and a VLAN separates traffic on shared switches.`,
      hook: "Four numbers from 0 to 255 name a device, the subnet mask decides who is local, the default gateway is the way out, modalities get static addresses while a self-assigned 169.254 address means DHCP never answered, DNS turns names into addresses, switches join one network while routers join networks and VLANs separate imaging onto its own, and studies measured in tens of megabytes per image are why the modality is wired."
    },
    {
      id: "u10l2", title: "Wired and Wireless Hardware: Cabling, NICs, Access Points, Cable Tracers", domain: 6, obj: "HIT-C", minutes: 9,
      body: `Layer one is where an imaging technician does most of the network work, because the cable, the jack, the port, and the wireless link are the parts physically inside your rooms.

## Twisted pair, fiber, and the data closet
Copper in a hospital is twisted pair, sold by category and terminated in RJ45 plugs.
\`\`\`
Medium        Use in imaging                        Limit
Cat 5e        1 Gbps to a console or workstation    100 m per run, RJ45 plug
Cat 6A        10 Gbps to a scanner or archive link  100 m per run, RJ45 plug
Fiber         closet to closet, long runs, and
              anywhere electrical noise is heavy    hundreds of meters and beyond
\`\`\`
Every run goes wall jack to patch panel in the data closet, and from the panel a patch cord to a switch port. Three things in that chain fail in real departments: a patch cord crushed by a table caster, a jack whose pairs were terminated to the wrong standard, and a patch cord in the panel that somebody moved. Label both ends of everything you install and record the jack number in the equipment record, because the next technician will be looking for it at two in the morning.

## Network cards and link lights
The network interface card is the modality's door. Its link light is the fastest diagnosis in informatics: no light at either end means the fault is physical, in the cable, the jack, the patch cord, or the port. A link light with no activity means the device is connected and silent, which moves the fault up to addressing or the application. A link that negotiates at a lower speed than it should usually means a damaged pair, and it shows clinically as sends that take minutes instead of seconds.

## Wireless, and the detector's link
Access points are managed centrally by a controller that sets channels, power, and security for all of them at once, which is why a wireless change made by the network team can take out every portable detector in the building on the same afternoon. The wireless receptor is the most demanding client in the department: it moves, it carries large files, and it has a battery. Coverage gaps live in stairwells, elevators, lead-lined rooms, and any shielded suite, and they look like a panel that drops out mid-exam or a study stuck in a local queue until the unit is wheeled back into range.

## Tracers, testers, and what a bad cable looks like upstairs
A **cable tester** proves continuity, length, shorts, split pairs, and whether each pin lands where it should, and a tone generator with a tracer finds which jack is which in a closet of unlabeled punchdowns. Keep a known good patch cord in the bag, because substitution is faster than measurement. On the modality the symptoms of a failing cable are not an error message: dropped or incomplete sends, transfers that get slower, retries in the log, and an association that works once and then fails.

> Exam tip: Cat 5e for 1 Gbps and Cat 6A for 10 Gbps, 100 m per run with RJ45 connectors, fiber for distance and electrical noise. No link light is a layer one problem. A cable tester proves the pairs and the length; a tracer finds the jack. One change at the controller reaches every access point at once, and coverage gaps strand wireless detectors.`,
      hook: "Cat 5e carries 1 Gbps and Cat 6A carries 10 Gbps over runs up to 100 m on RJ45 connectors with fiber beyond that, runs pass through the wall jack and the patch panel where most real faults live, a link light settles layer one in seconds, access points are configured centrally so one controller change affects them all, and a failing cable shows up on the modality as dropped or slow sends rather than as an error."
    },
    {
      id: "u10l3", title: "Computer Hardware and Software for Imaging Systems: Workstations, Storage, Backups, Virtualization", domain: 6, obj: "HIT-B", minutes: 10,
      body: `Every modality in the department is a computer with a generator bolted to it, so the faults of ordinary computing arrive dressed as imaging faults.

## The console, the acquisition workstation, and the reading station
The console runs the exposure; the acquisition workstation reconstructs, processes, and sends. Reconstruction is why a scanner's workstation has more CPU and RAM than anything else in the department, and why a slow reconstruction after a software update is a resource complaint rather than a detector complaint. Reading workstations are built around their displays and their graphics path instead, because their work is to show images accurately and quickly.

## Operating systems, accounts, and versions
Modalities run general-purpose operating systems underneath the vendor's application, often versions older than anything else in the building, because the manufacturer validates the whole stack together. Software versions and patches are therefore part of the equipment record rather than an afterthought. That gives three rules: patch only when the manufacturer has validated the update, keep the service account separate from any clinical account, and record the software and firmware version in the equipment record, because a published fix, a known defect, and a support call are all version specific.

## Storage, from the panel to the archive
\`\`\`
Tier            What lives there                 What its failure looks like
Local cache      today's studies on the modality  cannot acquire, disk full warning
Online archive   recent studies, fast retrieval   priors slow or unavailable
Deep archive     older studies, slower retrieval  a long wait for an old study
RAID set         redundancy inside one array      degraded array, still running
Backup copy      a restorable copy off the box    nothing, until you need it
\`\`\`
A RAID set survives a drive failure and warns you; a degraded array is a failure already in progress, not a spare. Solid-state storage has no moving parts and fails differently from a spinning disk, usually without the warning noises. None of that is a backup: a backup is a copy somewhere else that somebody has restored. Test restores on a schedule, and export each modality's configuration so a replacement console can be set up identically instead of rebuilt from memory.

## Virtual servers and the cloud, at recognition level
One physical host can run many virtual servers under a hypervisor, which is how archives, brokers, and management systems are deployed now. The benefits are fewer boxes, quick provisioning, and snapshots; the risk is that one host failure takes every server on it, so clusters and backups still matter. Cloud services are somebody else's servers reached over the internet, which brings a written agreement covering patient data, encryption both on the wire and on the disk, and an internet link whose outage is now a clinical outage.

## Hardware troubleshooting basics
No power is the same chain as any device: outlet, cord, supply, switch. Powers but no display is the display, its cable, or the graphics path, with the machine often booting normally behind it. No boot device means a failed drive or a changed boot order. Slow means a full or failing disk, too little memory, heat and dust, or a background task. Peripherals (keyboards, barcode scanners, card readers, USB devices) fail at the port, the cable, or the driver. Wrong date and time at every boot is the clock battery, and it matters more here than elsewhere, because time stamps tie an image to an order.

> Exam tip: reconstruction needs CPU and memory; reading stations need the display and graphics path. Patch modalities only on a schedule the manufacturer has validated, and record versions. A degraded RAID array is a failure in progress and never a backup; a backup is a restored copy. One virtual host failing takes every server on it.`,
      hook: "Modality consoles and acquisition workstations are computers whose CPU, RAM, storage, and graphics decide reconstruction and display speed, their operating systems are patched only on a schedule the manufacturer has validated, with versions recorded, storage runs from local cache through online and deep archive with RAID as redundancy and never as a backup, virtual hosts and cloud services add shared risk, and ordinary computer faults (no boot device, no display, slow disks, dead peripherals, a flat clock battery) arrive disguised as imaging faults."
    },
    {
      id: "u10l4", title: "PACS: The Archive, Workstations, and the Image Lifecycle", domain: 6, obj: "HIT-B", minutes: 10,
      body: `PACS is the system the whole department points at. Knowing its parts and the path a study takes through it is what lets you say, in one sentence, whether a fault is yours, radiology's, or the vendor's.

## The parts
- The **archive**, which is the storage itself across its tiers.
- The **database**, which is the index of what exists and where; images survive a database failure but nobody can find them.
- **Workstations**, the diagnostic reading stations with calibrated displays, and clinical or web viewers for everybody else, which are deliberately not diagnostic.
- The **interfaces** to the modalities and to the record systems.
A **VNA**, or vendor neutral archive, holds studies from many systems in a standard form, so the reading application can be replaced without migrating the data again. That is a procurement decision you will be asked about rather than one you make.

## The lifecycle of one study
\`\`\`
1 Acquire   the modality makes the images against a scheduled order
2 Send      the modality pushes them to the archive
3 Store     the archive writes them and indexes them in its database
4 Commit    the archive confirms permanent responsibility for them
5 Route     rules copy or forward studies to readers and other sites
6 Read      a diagnostic station displays them with the prior studies
7 Report    the report is dictated and returned to the record system
8 Retain    the study is kept for the retention period the state sets
9 Purge     only after retention, and only by policy, never by a technician
\`\`\`
Two of those steps cause most of the work you will do. **Storage commitment** is the archive telling the modality that it now owns the study permanently, which is what makes clearing the modality's local disk safe; without it, deleting locally can lose a study. **Prefetching** and routing rules pull the prior studies toward the reading station before the patient arrives, so a radiologist complaining that priors are missing is usually describing a routing or prefetch rule rather than a lost study.

## Hanging protocols and the reading experience
A hanging protocol is the saved layout that decides which series appear where on which display. When a radiologist says the images come up wrong, that is a hanging protocol or a mismatch in how the modality labels its series, not an archive fault, and the fix is configuration by the application team.

## Who owns what
\`\`\`
The modality, its console, its cable and jack      the imaging service shop
The switch, the VLAN, the firewall, name service   the network team
The archive, the database, routing rules, viewers  radiology informatics
The application itself, its defects and patches    the vendor
\`\`\`
Disaster recovery crosses all four: a second copy of the archive somewhere else, a tested restore, and a written downtime procedure for what the department does while the archive is gone. During an archive outage the modalities keep scanning into local storage, so the clock is running on local disk space, and that is the number to watch.

> Exam tip: archive, database, workstations, interfaces. Storage commitment is what makes local deletion safe. Missing priors are a routing or prefetch rule. A wrong layout is a hanging protocol. During an archive outage, modalities fill their local disks, so local free space is the number that matters.`,
      hook: "PACS is an archive, a database, reading workstations, and interfaces, with a vendor neutral archive holding studies in a form that survives a change of application; a study is acquired, sent, stored, committed, routed, read, reported, retained, and only then purged; storage commitment makes local deletion safe, prefetch and routing rules deliver priors, hanging protocols decide the layout, and during an archive outage the modalities fill their own disks."
    },
    {
      id: "u10l5", title: "DICOM: Objects, Services, Modality Worklist, and DICOM Echo", domain: 6, obj: "HIT-B", minutes: 11,
      body: `DICOM is the imaging standard, written by the radiology professional body together with the manufacturers' association, and it is the one piece of informatics the exam expects you to know in detail, because configuring it is your job.

## Objects and services
DICOM defines two things: the **information objects** that carry an image or a report together with everything known about it, and the **service classes** that move them. Pair a service with an object and you get a **SOP class**, which is how a node states what it can do, such as store a computed tomography image or query a worklist.

## The association
Two nodes negotiate an **association** before anything moves, over a TCP connection, and four items must agree. The **AE title**, which names each application entity and is case sensitive. The **host** address. The **port**, commonly 104 or 11112. And the **SOP classes** both ends support. Each node has to hold the other's details, which is why a new room cannot send until somebody has entered it on both sides, and why a single typed character is the most common cause of a failed installation.

\`\`\`
Service    What it does                          First thought when it fails
C-ECHO     verification: proves the association   AE title, host, port spelling
C-STORE    pushes images to the archive           SOP class, disk, licence, rights
C-FIND     queries for matching studies           query keys, dates, character set
C-MOVE     asks a node to send studies somewhere  destination not configured there
MWL        pulls the scheduled patients and
           accession numbers to the console       query keys, modality code, date
MPPS       reports started, completed, or
           discontinued back upstream             status boards and billing stall
Commitment the archive accepts permanent
           responsibility for a study             local deletion is now unsafe
\`\`\`

## The worklist, and why it matters more than it looks
A modality worklist query pulls the day's scheduled patients, their identifiers, and their accession numbers to the console, so the technologist selects a patient instead of typing one. That is the single largest defence against misidentified studies in the department. When the worklist is empty, technologists type names by hand, and every typing error becomes a study that cannot be matched to its order and has to be corrected downstream by somebody with privileges you do not have.

## The header, the conformance statement, and mismatches
Every object carries a header of tagged fields: patient name and identifier, accession number, study and series description, modality, dates, and the technique used. Downstream systems match on those fields, so a mismatch does not look like an error on the modality at all; it looks like a study in the wrong place, a study that will not attach to its order, or a report with nowhere to go. The **conformance statement** is the document where each product states its AE titles, its supported SOP classes, its roles, its transfer syntaxes, and its limits, and comparing two conformance statements is how you find out before installation that two devices will not in fact talk.

> Exam tip: an association needs the AE title, host, port (commonly 104 or 11112), and matching SOP classes. C-ECHO verifies, C-STORE sends, C-FIND queries, C-MOVE retrieves, MWL brings the schedule to the console, MPPS reports progress, and storage commitment makes local deletion safe. A node that echoes but cannot store has a class, disk, licence, or permission problem.`,
      hook: "DICOM pairs objects with services into SOP classes, an association over a TCP connection needs matching AE titles, host, port (commonly 104 or 11112), and SOP classes on both sides, C-ECHO verifies while C-STORE sends, C-FIND queries, C-MOVE retrieves, the modality worklist brings scheduled patients and accession numbers to the console so nobody types them, MPPS reports progress, storage commitment transfers permanent responsibility, and the conformance statement tells you before installation whether two devices can talk."
    },
    {
      id: "u10l6", title: "RIS, HL7, the EMR, and the Order-to-Report Path", domain: 6, obj: "HIT-B", minutes: 10,
      body: `Images are only half of radiology. The other half is text: an order, a schedule, a worklist entry, a status, a report, and a bill. HL7 carries that text, and when it stops, the images have nowhere to belong.

## The systems
- The **RIS**, the radiology information system, schedules exams, holds the worklist, tracks the status of every study, and routes reports.
- The **EMR**, the electronic medical record, is where the order starts and where the report has to land, and the **EHR** is what clinicians read.
- The **interface engine**, sometimes called the broker, receives messages from one system, translates them into what the next system expects, and routes them, keeping a queue and a log. Its queue is where stuck messages pile up, and its log is the first place to look when text stops flowing.

## HL7 messages worth knowing by name
\`\`\`
ADT  admit, discharge, transfer: tells every system who the patient is
     and where they are. Identity problems usually start here
ORM  the order: what exam was asked for, by whom, with what accession number
ORU  results and reports: the dictated report going back to the record
\`\`\`
A message is lines of text in segments, each segment a kind of information, which is why an interface engine can read a rejection and tell you it failed on an unknown patient or a bad field rather than just failing silently.

## The path, end to end
\`\`\`
1 A clinician orders the exam in the EMR
2 The order reaches the RIS as an ORM message and is scheduled
3 The modality's worklist query pulls the patient and accession number
4 The technologist selects the patient and acquires the study
5 MPPS reports the study started and then completed
6 The study is sent to the archive and stored
7 A radiologist reads it against prefetched priors and dictates
8 The report returns as an ORU message to the EMR and the EHR
9 Dose and billing data follow the same identifiers
\`\`\`
Every step is joined by identifiers, which is where the path breaks.

## Where identifiers break
The **accession number** ties one order to one study, and the medical record number ties studies to a person. Trouble comes from duplicate records created at registration, two records merged after the fact, a name changed between the order and the exam, a study acquired before the order reached the worklist, and a patient typed in by hand during a worklist outage. The symptom is never a network error: it is a study that will not attach, a report that cannot be filed, or images in the wrong person's record, and correcting it needs the informatics team because the correction has to be made in several systems at once.

## Dose reporting, at recognition level
Modern systems produce a structured dose record for each study and send it the same way an image goes, so dose can be totalled per patient, compared against reference levels, and submitted to a national registry. For you, that means a dose record that stops arriving is an interface fault with regulatory consequences, and it is worth knowing which systems in your department produce one.

> Exam tip: ADT carries identity and location, ORM carries the order, ORU carries the result. The RIS schedules and holds the worklist, the interface engine translates and queues, and the EMR is where the order starts and the report lands. Misfiled studies are identifier problems (accession numbers, duplicates, merges, hand typing), not network problems.`,
      hook: "The RIS schedules exams and holds the worklist, HL7 carries identity in ADT, orders in ORM, and results in ORU through an interface engine whose queue and log show stuck messages, and the path runs order in the EMR to schedule in the RIS to worklist on the modality to acquisition to archive to read to report back into the record, joined at every step by the accession number and the medical record number, which is exactly where duplicates, merges, name changes, and hand typing break it."
    },
    {
      id: "u10l7", title: "Application Interdependence: Worklist, MPPS, Dose Reporting, and What Breaks Downstream", domain: 6, obj: "HIT-D", minutes: 9,
      body: `Imaging applications lean on each other, so the most useful first question in an informatics call is not what is broken but **how wide the fault is**. The answer tells you where to look and who to call before you have touched anything.

## How wide is it
\`\`\`
Scope                              Where the fault almost always is
One modality cannot send            that node: AE title, address, port, cable, port
Every modality lost its worklist    upstream: the RIS, the broker, or name service
Reading stations cannot see images  the archive, its database, or its network path
Everything in the building is slow  the network, a backup job, or a failing link
One user cannot log in              that account, its profile, or its permissions
\`\`\`
One node is yours. Everything at once is somebody else's, and your contribution is evidence that narrows it.

## The failures that take several systems with them
- **Worklist down.** Technologists type patients by hand, so every study acquired during the outage has to be reconciled afterwards.
- **Archive down.** Reading stops, while modalities keep scanning into local storage, so you are now watching local disk space on every room.
- **DNS down.** Nothing resolves by name. Devices configured by address keep working, which is a strong clue and the reason some modality entries are still written as addresses.
- **Certificate expired.** A secure interface that worked yesterday fails today with no change by anybody, at a moment nobody chose. Expiry dates belong on a calendar.
- **Interface engine queue stalled.** Images move but nothing is filed, which looks fine on the modality and broken everywhere else.

## Mapping the dependencies before you need the map
Draw it once: each modality, each interface, the broker, the archive, the record system, the dose destination, and what depends on what. Keep it with the equipment records and mark which links are secure and when their certificates expire. On the day a floor of the hospital says radiology is down, that one page converts an afternoon of phone calls into two checks.

## Change control and upgrades
Any change to a networked modality is a change to the systems it talks to, so it gets a record and a test. The minimum test after an upgrade, a board swap, a configuration change, or a network change is: verify the association, pull a worklist, acquire a test study, confirm it arrives in the archive, confirm the progress status moved, and confirm the dose record arrived. Agree in advance who tests which link and who may roll it back. An upgrade that works on the console and silently stops dose records is a very common and very embarrassing outcome.

## Downtime procedures and monitoring
Every department needs a written downtime procedure: how patients are identified by manual entry without a worklist, what is written on paper, where studies are held, and how everything is reconciled when the systems return. Reconciliation is the part that is always underestimated. On the monitoring side, interfaces and queues should be watched automatically so a stalled queue raises an alert rather than waiting for a radiologist to notice, and you should know who receives those alerts.

> Exam tip: ask how wide the fault is first. One node failing is that node; every node failing at once is upstream. Worklist outages mean hand typing and later reconciliation, archive outages mean local disks filling, name service outages spare anything configured by address, and expired certificates break interfaces nobody touched. Every change gets a test of the whole chain.`,
      hook: "Ask how wide the fault is before anything else, because one modality that cannot send is that node while every modality losing its worklist at once is the RIS, the broker, or name resolution; a down archive leaves modalities filling local disks, an expired certificate breaks an interface nobody touched, and a stalled interface queue looks healthy at the console and broken everywhere else, which is why you map the dependencies in advance, test the whole chain after any change, and keep a written downtime and reconciliation procedure."
    },
    {
      id: "u10l8", title: "Imaging Network Security: HIPAA, Access Control, Patching, Encryption, Device Cybersecurity", domain: 6, obj: "HIT-A", minutes: 10,
      body: `Every modality is a computer holding patient data, and imaging holds more of it than most: images, demographics, dose reports, local caches, and service logs. Security is therefore part of the service job, not a separate department's problem.

## PHI and the law in plain words
**PHI** is any health information that can be traced back to a named person, and in imaging it lives in more places than people expect: the console's local study list, the detector's cache, dose reports, exported test images, and the service logs you email to a vendor. **HIPAA** protects it through privacy, security, and breach rules, and **HITECH** strengthened enforcement, added breach notification, and bound service vendors to the same duties. The security rule asks for three kinds of safeguard, and the exam likes the three names: **administrative** (policies, training, access reviews), **physical** (locked rooms, screens turned away, controlled media), and **technical** (accounts, encryption, audit logs).
The practical rule for a technician: minimum necessary access, no browsing records, and nothing leaves the building with patient data on it until it has been sanitized or the removal is documented and covered by an agreement with the vendor.

## Access control
\`\`\`
Practice                 What it means on a modality
Unique named accounts     no shared logins, no generic service password on a sticker
Separate service account  configure with it, chart with a clinical account
Least privilege           rights for the task, nothing wider, reviewed when people leave
Default credentials gone  changed at installation and recorded in the approved vault
Automatic logoff          screens lock, consoles do not sit open in a public corridor
\`\`\`

## Patching, antivirus, and segmentation
A modality's operating system is validated as part of the product, so patches go on when the manufacturer has validated them, not when the enterprise pushes them. That is a real gap, and the way the gap is covered is **segmentation**: the device sits on its own VLAN with firewall rules that permit only the addresses and ports it needs, with no general internet access from the console. Antivirus runs only where the manufacturer supports it and with the exclusions the manufacturer lists, because a scanner that quarantines an image file does more damage than the malware it was looking for. Where antivirus is not supported, allow-listing, which permits only approved software to run, is the usual substitute.

## Encryption
Encryption **in transit** protects data crossing the network, which is TLS on the interfaces that support it and a VPN for anything leaving the building. Encryption **at rest** protects the disk, which matters most on laptops, portable drives, and any device going out for repair. A lost device that was encrypted is an incident to investigate; losing one that was never encrypted is a reportable breach.

## Medical device cybersecurity
The specific problem with imaging equipment is longevity: a scanner lives fifteen years and its operating system does not. That gives you legacy operating systems the maker no longer supports, fixed-function devices that cannot run modern protections, remote service doors, and software the vendor assembled from components you cannot see. Three habits cover most of it: know what you own and what it runs, read and act on the manufacturer's security disclosures and advisories, and treat a cybersecurity advisory exactly like a recall, with the affected devices identified and the action recorded.
Incident response is simple and worth memorizing: isolate the device from the network, preserve the evidence, notify security and the manager immediately, do not power it off if forensics may be needed unless you are told to, and keep the device out of clinical use until it is cleared.

> Exam tip: PHI lives in consoles, caches, dose reports, and service logs; sanitize or document before a device leaves. The security rule asks for administrative, physical, and technical safeguards. Patch only what the vendor validated and segment what cannot be patched. Encrypt in transit and at rest. On an incident: isolate, preserve, notify, and leave it powered if a forensic examination may be needed.`,
      hook: "Protected health information sits in consoles, caches, dose reports, and service logs, and HIPAA with HITECH asks for administrative, physical, and technical safeguards; use unique named accounts with a separate service account and least privilege, change default credentials at installation, patch only what the manufacturer validated and segment what cannot be patched, run antivirus or allow-listing only as the vendor supports, encrypt in transit and at rest, treat a security advisory like a recall, and on an incident isolate, preserve, notify, and do not power off if forensics may be needed."
    },
    {
      id: "u10l9", title: "Compliance Evidence: Risk Assessment, MDS2, Vendor Remote Access, What a Survey Wants", domain: 6, obj: "HIT-A", minutes: 9,
      body: `Security on paper is what a surveyor can read. This lesson is about the documents, because the biomed shop owns several of them and is asked for them by name.

## The risk assessment and the inventory it stands on
A security risk assessment asks, for each system, what data it holds, what could go wrong, how likely and how bad that is, and what is being done about it. It cannot be done without an accurate inventory, and that inventory is yours: every networked device with its model, serial number, location, network address, operating system and software version, who services it, and what it connects to. An inventory that is out of date makes every downstream document wrong, which is why "show me your networked device inventory" is one of the first questions asked.

## MDS2
\`\`\`
The form tells you            Why you care
What data the device stores
and transmits                  whether it holds PHI and must be sanitized
Authentication and authorization  whether unique accounts are even possible
Automatic logoff and audit logs   whether use can be attributed to a person
Security updates and patching     who may patch it and on whose schedule
De-identification and export      whether test images can leave safely
Backup, recovery, emergency access  what happens in a failure or an emergency
Malware protection and node
authentication                    whether antivirus is supported at all
Remote service and connectivity    which doors exist and how they are controlled
\`\`\`
Ask for it at purchase, because it is far easier to get before the money moves, and keep it with the device record. Pair it with the software component list a manufacturer can supply, which is what lets you answer "is this device affected" when an advisory names a component rather than a product.

## IEC 80001, at recognition level
This is the risk management standard for information technology networks that carry medical devices. It exists because neither the network team nor the device team can manage that risk alone, and what it asks for is a joint, documented process with named responsibility. In practice it is the authority behind sitting down with the network team before a modality goes on their network, and recording the decisions.

## Vendor remote access
Vendors need to reach their equipment, and uncontrolled remote access is one of the clearest findings a surveyor can write. The controlled version has five features: access through the facility's VPN or managed gateway rather than a modem or a vendor's own tunnel, a named account for each engineer instead of a shared one, access enabled for a session and then disabled, a session that somebody at the facility approves and can watch, and a log of who connected, when, and what they did. A **business associate agreement** covers any vendor that touches patient data, and it is the document the compliance office will ask whether you have before a vendor gets a password.

## What a survey asks the shop for
Expect four requests: the networked device inventory with versions, evidence that security actions are tracked like any other corrective action, the audit and access records showing accounts are unique and reviewed, and the records of how advisories and recalls with a security element were handled. All four are answered out of the CMMS if you record them there as you go: the inventory, the work orders for patches and configuration changes, the device security documents attached to the record, and the dated actions against each advisory.

> Exam tip: the risk assessment stands on the device inventory, and the inventory is the shop's. MDS2 states what a device stores, how it authenticates, whether it logs, and who may patch it. IEC 80001 manages risk on networks carrying medical devices through a joint documented process. Vendor remote access is named, approved, time-limited, and logged, under a business associate agreement.`,
      hook: "A security risk assessment stands on an accurate networked device inventory that the shop owns, the MDS2 form states what a device stores, how it authenticates, whether it logs, and who may patch it, a software component list answers whether an advisory applies, IEC 80001 asks for a joint documented risk process with the network team, vendor remote access must be named, approved, time-limited, logged, and covered by a business associate agreement, and every one of those answers comes out of the CMMS if you record it as you go."
    },
    {
      id: "u10l10", title: "Troubleshooting the Imaging Network: PING, Traceroute, Cable Tracers, Switch Ports, DNS", domain: 6, obj: "HIT-C", minutes: 10,
      body: `Network faults are solved from the bottom up, one layer at a time, and the discipline of doing it in order is what separates a ten-minute call from an afternoon of blame.

## The layered method
1. **Cable and link.** Link lights at the device and at the switch port. No light is physical: the patch cord, the jack, the run, or the port.
2. **The device's own address.** Read the mask, the gateway, the name servers, and the device's own address on the console with {{ipconfig}} or {{ifconfig}}. A self-assigned 169.254 address means no DHCP answer; a duplicate address warning means somebody else has yours.
3. **Reachability.** PING outward in order: the device's own address, then the gateway, then the archive by address.
4. **Name.** PING the archive by name. Works by address and fails by name is DNS, every time.
5. **Application.** Reachable by address and by name but the transfer fails is the application: a port blocked, a service stopped, or a configuration mismatch.

## Reading a PING result
\`\`\`
Reply with a time            the path and the host are alive at the IP level
Request timed out            no reply: host off, wrong subnet, or the echo is blocked
Destination host unreachable your own side has no route: check mask and gateway
Replies but times vary wildly or packets drop   congestion, a bad cable, or wireless
Reply by address, none by name  name resolution, not connectivity
\`\`\`
A blocked echo is worth remembering, because many hospital firewalls drop it. A device that does not answer a PING is not proof of a dead device, which is why the application's own test matters more.

## Traceroute and the rest of the toolbox
Traceroute lists each router hop toward a destination and where the replies stop, which is how a problem between buildings or sites is located before anybody blames the modality. Between a modality and an archive that share one VLAN there may be no hops to show. Beyond that: the ARP table, read at recognition level, shows which hardware addresses the device has recently seen on its own network and will reveal a duplicate address; a cable tester proves continuity, wiring, shorts, split pairs, and length; a tone generator and tracer finds the jack; and the switch port itself, which the network team reads, shows link speed, duplex, errors, and which VLAN the port is in.

## The classic misconfigurations
A good cable in a jack whose port sits on the wrong VLAN is the most common new-room fault, and it looks exactly like a dead network. A firewall rule that permits the archive's address but not the port the modality actually uses gives you a device that pings perfectly and cannot send anything. A wrong subnet mask makes some destinations reachable and others not, with no pattern the user can describe. A wireless detector that drops out mid-exam is coverage, roaming, or its battery, and it is worth proving with the panel in the same room as the access point before anybody touches the network.

## Handing it over with evidence
When the fault is past your device, hand it over as measurements, not suspicion: the mask, the gateway, the name servers, and the device's own address; the link state; what pings and what does not; the exact error from the application; the time it started; and what changed. Ask for two specific things, the VLAN assigned to that port and the firewall rules between those two addresses, and record the ticket number in the equipment record.

> Exam tip: link, address, reachability, name, application, in that order. A self-assigned 169.254 address means no DHCP. Works by address and not by name is DNS. Pings fine but cannot transfer is a port, a service, or a configuration. A good cable in the wrong VLAN looks like a dead network.`,
      hook: "Work the layers in order (link light, then the device's own address and mask, then PING outward to the gateway and the archive by address, then by name, then the application), read each PING reply for what it actually proves, use traceroute for hops between buildings, the ARP table for duplicates, a tester for the cable and a tracer for the jack, remember that a good cable in the wrong VLAN and a firewall permitting the address but not the port both imitate a dead network, and hand anything past your device to the network team as measurements with the time it started."
    },
    {
      id: "u10l11", title: "Troubleshooting PACS and DICOM: Association Failures, Missing Worklist, Images Not Arriving", domain: 6, obj: "HIT-C", minutes: 10,
      body: `This is the informatics work an imaging technician actually does. Four complaints cover nearly all of it, and each has its own first test.

## Association rejected
The modality says it cannot connect, or the association is rejected or aborted. Check, in this order: the AE title on both sides, exactly as typed and case sensitive; the host address; the port, commonly 104 or 11112; and then whether the two ends support the same SOP classes, which the conformance statements answer. After any change on either end, re-check all four, because a change at the archive breaks a modality that nobody touched.
**C-ECHO is the first test**, always. It proves the association, the titles, the address, and the port in one step, and it is the only test whose failure tells you to stop looking at the application.

## Images sent but not arriving
\`\`\`
Observation                        Likely cause
Echo passes, store fails           SOP class mismatch, disk, licence, permissions
Local queue growing, retries        link speed, congestion, or the archive is down
Archive has them, reader does not   routing or prefetch rules, or the database index
Modality shows sent, archive empty  sent to the wrong destination or a test node
Study arrives split or incomplete   interrupted association, cable, wireless dropout
Local disk filling on the modality  no storage commitment, so nothing can be cleared
\`\`\`
Read both logs together. The modality's log says what it tried and what it was told; the archive's log says what it received and why it refused. One log alone produces arguments.

## Worklist empty
An empty worklist is upstream of you more often than not. Prove the scope first: one modality or all of them. One modality means its own query configuration, its modality code, the date range it asks for, or its association to the worklist source. All of them means the RIS, the interface engine, or name resolution. Other common causes are a query asking for a different modality code than the orders carry, a date or time zone mismatch, a scheduling change that never reached the broker, and a stalled queue in the engine.

## Wrong patient, and slow sends
A study attached to the wrong patient is an identifier problem: a patient typed in by hand during a worklist outage, an accession number that does not match the order, a duplicate record, or two records merged after acquisition. Do not attempt the correction on the modality; it has to be made consistently in the archive, the record system, and the report, which is informatics work. Slow sends are bandwidth, a link negotiated at the wrong speed, or a backup job sharing the path. Compression is the other lever: lossless compression up to about 3:1 is generally accepted for diagnostic images, while heavier lossy compression of about 10:1 or more supports remote viewing but is not acceptable for computer-aided detection or for archiving.

> Exam tip: C-ECHO is the first test for anything that will not move. Echo passes and store fails means SOP class, disk, licence, or permissions. Empty worklists on every modality are upstream at the RIS or the broker; on one modality they are its own query. Wrong patient is an identifier problem corrected by informatics, not at the console. Lossless up to about 3:1 is fine; heavy lossy compression is not for archiving.`,
      hook: "Run a DICOM echo first for anything that will not move, then check the AE title, host, port, and SOP classes on both ends; an echo that passes with a failing store points at the SOP class, disk, licence, or permissions, a growing local queue points at the link or a down archive, an empty worklist on every modality is upstream at the RIS or broker while on one modality it is that node's own query keys and dates, a study on the wrong patient is an identifier problem for informatics rather than the console, and slow sends are bandwidth, link speed, or compression, where lossless up to about 3:1 is accepted and heavy lossy compression is not for archiving."
    },
    {
      id: "u10l12", title: "Monitors, Display Calibration, and Workstation Troubleshooting", domain: 6, obj: "HIT-C", minutes: 9,
      body: `The last thing that happens to an image is a display, and a display out of calibration undoes every careful thing the room did. Diagnostic displays are therefore test equipment, and they are tested.

## Diagnostic versus clinical displays
A diagnostic display is a calibrated grayscale device used to read studies: high luminance, measured uniformity, controlled viewing conditions, and a calibration record. A clinical display is an ordinary monitor on a ward or in a clinic, used to look at an image that has already been reported, and it is deliberately not held to the same standard. Mammography reading is the strictest case of all. When somebody asks you to put a study on a general monitor for a diagnosis, the answer is that the display is not qualified for it.

## Luminance and the grayscale standard display function
The **GSDF** is the curve in the imaging standard that maps stored pixel values to displayed brightness so that equal steps in value look like equal steps in brightness, which is what makes one image look the same on every calibrated station. Calibration is the act of making a display follow that curve, measured with a luminance meter rather than judged by eye, and it runs on a schedule: a visual test pattern check by the user daily or weekly, and a measured calibration at the interval the department's program sets.
\`\`\`
Quantity                          Value to know
Maximum luminance, diagnostic      above 171 cd/m2, and matched to the maker's figure
Nonuniformity across one display   under about 30 percent between its brightest
                                   and darkest regions
Geometric distortion               about 2 percent for a primary diagnostic class
                                   display, about 5 percent for a secondary one
Luminance meter range              about 0.05 to 1000 cd/m2, better than 5 percent
                                   accuracy, traceable to the national standard
Reading room ambient light         about 1 footcandle, which is about 10.8 lux
Film illuminator, where still used at least 1500 cd/m2, varying no more than
                                   plus or minus 10 percent across the surface
\`\`\`
Ambient light matters as much as the display: reflected room light adds to every dark pixel and destroys low-contrast visibility, which is why a reading room is dim and why a low-contrast test pattern should look the same with the lights as it does in the dark. A standard test pattern with light and dark patches, evaluated at about 30 cm, is the daily visual check that any technologist can do.

## Display faults
Dim overall is the backlight or an aged panel, and it is measured rather than argued about. Uneven brightness is uniformity, which calibration can correct up to a point and then cannot. Dead pixels are a panel defect and are counted against the maker's specification. Flicker, color tint, dropouts, and lines are the cable, the connector, or the graphics path first, so swap the cable and try another output before condemning a display. A display that reads out of tolerance and cannot be brought back is retired from diagnostic use, and the reading moves to a qualified station until it is replaced.

## Workstation problems
Slow display and slow retrieval are different performance faults: slow display is local, in memory, the graphics path, or the application, while slow retrieval is the network or the archive. Then there are the faults that are not technical at all: a user profile that has gone wrong, permissions that do not include the folder or the study type, a session left open by the previous reader, or a password change nobody propagated. Those belong to the application team, but recognizing them saves you from dismantling a workstation that is working perfectly.

> Exam tip: diagnostic displays are calibrated to the grayscale standard display function and measured with a luminance meter; maximum luminance above 171 cd/m2 and nonuniformity under about 30 percent. Ambient light is part of the measurement. Dim is the backlight, uneven is uniformity, lines and flicker are the cable or graphics path first. A display out of tolerance comes out of diagnostic use.`,
      hook: "Diagnostic displays are calibrated grayscale test equipment and clinical displays are not, the grayscale standard display function is the curve calibration makes a display follow so an image looks the same everywhere, the numbers to know are maximum luminance above 171 cd/m2, nonuniformity under about 30 percent, distortion of about 2 percent for a primary class display, a reading room at about 1 footcandle (about 10.8 lux), and film illuminators at least 1500 cd/m2 within plus or minus 10 percent, and dim means backlight, uneven means uniformity, lines and flicker mean the cable or graphics path, while a display out of tolerance comes out of diagnostic use."
    }
  ]
});
