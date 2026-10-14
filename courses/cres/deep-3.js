// CRES Academy deeper explanations, units 9 and 10. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u9l1: `## Why the method is worth more than the fault tables
Imaging systems are too varied to memorize. A department can run four generator brands, three detector families, two fluoroscopic platforms, and a scanner nobody else in the state owns. What travels between all of them is a way of working, and that is exactly what the problem-solving items test. Every one of them hands you a symptom and asks which step comes first. If you have a method, you answer those without knowing the model.

## Step one is harder than it looks
The symptom you are given is already a translation. Somebody saw something, interpreted it, and told somebody else, who called you. Three things recover the original: the operator's own words, the exact step where it happens, and how often. "The exposure fails" and "it fails only on the second image of a two-view chest when she uses the wall stand" are the same call, and only one of them is solvable from the hallway.
Then reproduce it. Reproducing a fault does four things at once: it proves the fault exists, it shows you the conditions, it gives you a before image or reading to compare against, and it tells you whether the operator's description matches the machine's behavior. If you cannot reproduce it, you are either missing a condition or looking at a use error.

## The splits, and why order matters
\`\`\`
Order  Split                    Cost to check   What a failure here looks like
1      Is it powered and ready  free            dead console, no boot, breaker out
2      Is the chain closed      minutes         no exposure and no error code
3      Does the console reach   minutes         settings ignored, no response
       the controller
4      Is the beam right        a meter         output low, high, or inconsistent
5      Is the geometry right    a tool and tape light field, SID, detent, alignment
6      Is the receptor right    a phantom       artifacts, shading, dead lines
7      Does the image leave     a network test  images stuck in the local queue
\`\`\`
Work the cheap, safe, and fast checks first, not because they are more likely in theory but because they cost nothing to eliminate and they are the ones a busy technician skips. The order also happens to follow the signal, so each pass narrows the system in one direction.

## Device error versus use error, in practice
The two have different evidence. A device error reproduces at a fixed technique with the operator removed: you set the console yourself, you expose a phantom, and the fault appears. A use error disappears when you do that. The second case is real work, not a dismissal: somebody is producing bad images, repeating exposures, and giving dose. The corrective action is a demonstration at the console and a request for applications training, recorded in the work order with the same care as a part number. If the same call comes back from the same room, the training is the open item.

## Verification and the decision to stop
A repair is finished when the measurement that would have caught the fault reads inside tolerance and is written down with the tolerance beside it. That is also what protects you: a number in the record is the difference between "I fixed it" and evidence.
Stop and escalate when the next step needs a license, a tool, a password, or a part you do not have; when the assembly is sealed; when the hazard exceeds what you can control alone; or when two honest attempts have not moved the symptom. Escalation with full notes is professional. Escalation after three days of guessing is not.

## What to memorize
- Four steps: symptom in the operator's words and reproduced, history from the CMMS and the error log, isolate by halves, verify with a measurement.
- Isolation blocks: power, control, high voltage, mechanical, receptor, network.
- Device error reproduces at a fixed technique with a phantom; use error does not, and its fix is applications training.
- Simplest, safest, cheapest check first. A problem-solving item asking for the FIRST step wants that check.`,

u9l2: `## Triage is an exam skill before it is a shop skill
Problem-solving items frequently give you two or three broken things and ask which gets your attention. The answer never depends on which is more interesting or which vendor answers the phone. It depends on a fixed hierarchy: harm, then the standard that exists to prevent harm, then clinical access, then comfort.

## Risk first, and what counts as risk in imaging
Imaging adds two hazards that most medical equipment does not have. The first is ionizing radiation, so anything that can give unintended or uncontrolled dose is a safety fault: a collimator that will not restrict the field, a dark collimator lamp, a fluoroscope above its rate limit, an AEC that does not terminate, a timer that runs long, a missing filter. The second is mass in motion, so a failed lock, a worn counterweight cable, a brake that creeps, or a collision sensor that no longer stops a gantry can injure directly. Both of those outrank any amount of schedule pressure, and in both cases the right first action is to stop the use, not to start the repair.

## The regulatory layer
A system outside the limits that state and federal performance rules set is not a system with a defect to be scheduled; it is a system that should not be imaging patients. That distinction matters on the exam. The numbers that trigger it are the ones you measure at a periodic test, so knowing them is what lets you make the call on the spot.
\`\`\`
Finding                                  Decision
Measured kVp outside 10 percent          out of service until corrected
Timer outside 5 percent above 10 ms      out of service until corrected
Linearity outside 10 percent             out of service until corrected
Reproducibility outside plus or minus 5 percent  out of service until corrected
Light field and x-ray field outside 2 percent of the SID  out of service
Fluoroscopic tabletop rate above 10 R/min normal or 20 R/min boost  out of service
Housing leakage at or above 100 mR/h at 1 m  out of service
AEC backup will not end at 6 s or 600 mAs  out of service
\`\`\`

## Weighing downtime honestly
Downtime is not counted in rooms, it is counted in patients who cannot be imaged. One scanner in the building and a stroke protocol on it is a different number from a third radiographic room with two working neighbors twenty feet away. Ask the lead technologist three questions: what volume does this room carry, where does that volume go while it is down, and what cannot be done anywhere else. The answers change the queue, and they also give you the sentence you use when you ask a vendor for an emergency part.

## Loaners, backups, and the paperwork
Plan the workaround before you need it. Know which rooms can absorb which exams, which mobile unit can stand in, whether the service contract includes a loaner and what its response clock is, and who signs for a rental. A loaner arriving on site is not ready for patients: it needs incoming inspection, electrical safety, output verification, and a network configuration before the first exposure, and that work is part of the downtime estimate you give radiology.
Taking a system out of service is a documented act with four parts: a tag the staff cannot miss, the energy secured if the hazard is electrical or mechanical, a work order recording the reason and the measurement that drove it, and notification to the department manager plus the radiation safety officer when dose or a regulation is involved. Returning it is the mirror image: the verification readings, the tolerance, the date, and the name, because that record is what a surveyor reads a year later.

## What to memorize
- Order: patient and staff safety, then out-of-tolerance systems, then downtime weighted by alternatives, then convenience.
- Out of tolerance in use means out of service, and the triggering numbers are the periodic test tolerances.
- Say what works, what does not, and when it returns; agree the workaround with the lead technologist.
- A loaner needs incoming inspection, safety testing, output verification, and network setup before patients.`,

u9l3: `## The fastest technician in the department is the best reader
Service speed in imaging comes from knowing which document answers which question. Guess work costs hours; the right page costs minutes. There are four resources, and each one answers a different kind of question.

## The service manual, section by section
\`\`\`
Section                  The question it answers
Theory of operation      what is this assembly supposed to do, and in what sequence
Installation             feeds, clearances, grounding, and the acceptance tests
Adjustment procedures    how is this calibrated, in what order, with what tool
Error codes              what does this number mean and what causes it
Troubleshooting trees    a guided path for the faults the maker expects
Parts list and views     the order number, and how it comes apart safely
Specifications           the tolerance you verify against at the end
Schedules                what the periodic visit must cover and how often
\`\`\`
Two habits pay for themselves. First, read the whole adjustment procedure before starting it, because calibrations have prerequisites and doing them out of order means doing them twice. Second, read the specification table first, so you know what number you are aiming at before you touch an adjustment.

## Schematics, block diagrams, and test points
A block diagram is a map of signal flow; a schematic is a map of measurable nodes. Use the first to decide where to look and the second to decide what to measure. Four paths cover nearly every electrical fault in an imaging room.
- The **power path**: the room feed, the disconnect, the contactor, the autotransformer, the internal low-voltage supplies. Faults here kill everything or kill it under load.
- The **control path**: console to controller to driver boards to the thing that moves or energizes. Faults here produce settings that are ignored or sequences that stop partway.
- The **interlock chain**: a series string of contacts, any one of which blocks an exposure. Faults here produce no exposure and no error code.
- The **high-voltage path**: the tank, the cables and their terminations, the tube. Faults here are arcs, codes, and burnt smells.
Measure with the equipment in the state the manual names, and measure resistance and continuity only with the system off and the capacitors discharged. A reading that makes no sense is far more often a probe on the wrong test point than a mystery.

## Service software and the logs
Diagnostic software is usually the best test equipment on site. It gives a service mode, calibration routines, detector tests, exposure and tube counters, and an error log with timestamps that a meter can never match. Three rules make it useful. Export the log before clearing it, because the sequence of entries before the fault is the actual evidence. Compare timestamps against the room's schedule, which is how you learn that the fault happens at the first exposure of the morning, or only during a particular protocol. And note the software version in every work order, because a published fix is version specific.

## Support, notices, and keeping the shelf current
Technical support is a resource, not an admission. Call with the model, serial number, software version, the exact error text, your readings, and what you already tried, and ask for the open field notices and service bulletins on that model while you have them. File what they send. A documentation shelf rots quietly: manuals for systems long gone, no manual for the scanner installed last year, firmware notes nobody recorded. Keep a current copy of the manual, the schematic set, the service software, the passwords in the facility's approved vault, and the notice file for each system you support, and your next first visit on a strange fault starts from the right page.

## What to memorize
- Service manual: theory, installation, adjustments, error codes, trees, parts, specifications, schedules.
- Schematic: the power, control, interlock, and high-voltage paths, with test points and expected values.
- Export the error log before clearing it, and record the software version in the work order.
- Call support with model, serial number, software version, exact error text, readings, and what you tried.`,

u9l4: `## The call that comes most often
"The room will not expose" arrives more than any other complaint in radiography. It is also the one most often handled badly, because the chain from the wall to the focal spot has perhaps twenty elements and the expensive ones are at the end. Work it as a tree and the cheap half falls out in ten minutes.

## A no-exposure fault tree
\`\`\`
Does the console power up and complete its startup
  NO  -> room disconnect, breaker, line voltage at the panel, main contactor,
         internal low-voltage supplies, console boot and its own fuses
  YES v
Is there an error code or message
  YES -> code table, then the log entries immediately before it: thermal cutout,
         overcurrent, tube arc, line voltage, rotor fault, communication fault
  NO  v
Does the first stage of the exposure switch do anything (rotor, prep, ready lamp)
  NO  -> exposure switch and its cable, hand or foot switch, prep contacts,
         then the interlock chain: door, emergency stop, collimator or tray
         switch, receptor parked and size selected, tube at a valid detent
  YES v
Does the rotor reach ready
  NO  -> stator drive board, run capacitor, rotor bearing drag, ready sensing
  YES v
Does the exposure start and terminate wrongly
  EARLY -> AEC backup at 6 s or 600 mAs, thermal protection, arc detection
  NONE  -> filament circuit continuity, high-voltage contactor or primary
           switching device, tube arc detection latched, controller fault
  YES v
Exposure happens but nothing reaches the image
  -> receptor selected wrongly, receptor not communicating, network queue
\`\`\`
The value of the tree is not the branches, it is the order: everything above the rotor is free or nearly free to check.

## Low or inconsistent output
Measure before adjusting, and measure the supply first. Incoming line voltage that sags under exposure load moves every calibrated value with it, and chasing kVp calibration on a sagging feed is a day wasted. Then take the four numbers that define a generator: measured kVp within 10 percent of indicated, exposure time within 5 percent above 10 ms and 20 percent at 10 ms or less, linearity within 10 percent in output per mAs between adjacent mA stations, and reproducibility within plus or minus 5 percent over repeated identical exposures. A single projection that burns out or washes out while everything else is correct is an AEC chamber, a cell selection, or a density setting, not a generator fault.

## High-voltage faults and the tube
The high-voltage section fails in a small number of ways and they overlap in their symptoms. Cable terminations contaminated or assembled without the specified compound track and arc. Transformer oil that is low, wet, or old loses its insulating strength and the tank arcs internally. A failing rectifier stack drops output and can take the primary with it. And a tube that has plated its envelope with tungsten evaporated from the filament becomes a conductor across the vacuum, so current jumps and the generator throws a tube-arc or overcurrent fault. A gassy tube gives erratic kVp, falling output, and arcing together. Next door, a rotor that hums without reaching ready is a stator drive or a run capacitor, while a noisy or slow run-up with a healthy drive is bearing wear, and bearing wear means a tube replacement.

## Working safely and verifying afterwards
The high-voltage section is the one place in imaging service that kills technicians who hurry. Open the disconnect, lock and tag it, wait the discharge time the manual states, ground the high-voltage terminals with the manufacturer's grounding stick, and never work alone in an energized tank. Afterwards, verify: measured kVp, timer, linearity, reproducibility, and in most states a check that housing leakage is still under 100 mR/h at 1 m if the housing was disturbed. Record each reading against its tolerance.

## What to memorize
- No code means the interlock chain and the switch; a code means the code table plus the log before it.
- Rotor hums and never readies: stator drive or run capacitor. Noisy or slow with a good drive: bearings, so the tube.
- Verify kVp within 10 percent, time within 5 percent above 10 ms, linearity within 10 percent, reproducibility within plus or minus 5 percent.
- Lockout, stated discharge time, grounding stick, never alone.`,

u9l5: `## Three systems, one bad image
The reason image complaints are hard is that the generator, the tube, and the receptor all write on the same page. A dark image can be a kVp calibration, a worn tube, or a detector gain. The way out is to stop reasoning about causes and start exposing phantoms, because a phantom at a fixed technique is a measurement.

## Heat, age, and the focal spot
Heat is what kills tubes, and the charts in the manual exist to keep you inside it. The rating chart clears one exposure at a given kVp, mA, time, focal spot, and anode speed; the anode and housing cooling curves clear the next series. A system that throws thermal faults during a busy list is sometimes a cooling fault rather than an abused tube: check the fans, the filters, the oil level, the heat exchanger, and the room temperature before blaming technique.
Age shows in three ways. Filament evaporation thins the coil, so output drifts low and eventually the filament opens. The evaporated tungsten plates the inside of the envelope and becomes a conduction path, so the tube arcs. And the anode track roughens, so output varies from exposure to exposure. Focal spots also grow, with age and on high mA stations, and a bigger spot blurs every edge in the image at once. That is the signature that separates a tube problem from a receptor problem: receptor faults are local or patterned, focal spot blur is everywhere and uniform.

## The artifact table
\`\`\`
Appearance              Cause                        Check                      Fix
Fine parallel lines     stationary grid, Bucky
                        not moving                   listen and watch the Bucky  drive, motor, switch
Edges pale, center fine grid upside down              grid label and orientation  refit the grid
Density low everywhere  grid off level or wrong
                        focal distance               level and the grid spec     level or match the grid
Density low at the sides tube off center to grid      alignment and detents       align and reset detents
Wavy repeating pattern  grid frequency beating
                        against detector sampling     grid type and orientation   different grid or angle
Stripe or dead line     dead row or column, stale
                        pixel map                    flat field and the map      recalibrate or replace
Faint previous image    incomplete plate erase        re-erase and re-image       erase; service the reader
Same mark every image   scored plate, dust in the
                        beam path, bad pixel group   clean, then flat field      clean, map, or replace
Blur everywhere, bone
edges soft              focal spot growth or long
                        exposure time                measure time, then phantom  tube or generator
Blur in one direction    patient motion               exposure time and protocol  shorter time, coaching
\`\`\`
Digital artifacts group into three families: the receptor itself, the software that corrects it, and the object in the beam. Dead pixels, rows, and columns are normal and are filled in from neighboring pixel values by the correction map, and a single one does not affect a diagnosis, but many of them must be corrected and physical damage means replacement. A plate that has been idle for 24 hours collects enough background radiation to fog, so it is erased again before use.

## Geometry is not a fault
Magnification is the ratio of the source-to-image distance to the source-to-object distance, so a longer SID and a smaller OID give a truer, sharper image. Distortion comes from an angled part, an off-center tube, or a tilted receptor. Before accepting a sharpness complaint as a fault, prove that the light field coincides with the radiation field within 2 percent of the SID, that the SID indicator reads within the same 2 percent, and that the detents put the tube where the label says.

## The one test
Expose a phantom at a fixed, written-down technique on the suspect receptor, then on a known good receptor in the same room. If the fault follows the receptor, it is the receptor. If it stays with the room, measure kVp and mAs: wrong numbers mean the generator, correct numbers with poor sharpness mean the tube. One test, three answers, and a number for the report.

## What to memorize
- Grid faults: lines mean stationary, pale edges mean upside down, low everywhere means off level or wrong focal distance, low at the sides means off center, a wavy pattern means frequency beating.
- Ghost is an incomplete erase; a plate idle 24 hours is re-erased; dead pixels are interpolated from neighbors.
- Blur everywhere with correct geometry is focal spot or time; blur in one direction is motion.
- Phantom at a fixed technique, swapped receptor, then measured kVp and mAs separates the three systems.`,

u9l6: `## The faults that hurt people
Everything else in an imaging room produces a bad image or no image. The mechanical system produces injuries. A tube column weighs more than the patient under it, a tilting table can drop somebody, and a brake that creeps turns a lateral into a fall. That is why mechanical findings are the ones where the correct answer on the exam is usually "remove it from service", not "schedule the repair".

## Tables, columns, and what drives them
Tabletop float is a lock releasing and a low-friction way; when float fails, the order of suspicion is the lock or its solenoid, the control switch, the drive belt where the float is powered, and then the ways themselves. Vertical and tilt motions run on motors with gearboxes, screw jacks, hydraulics, or cables and counterweights, and each has limit switches at both ends of travel. A motion that stops partway is far more often a limit switch, a position sensor, or a loose connector than a failed motor, so measure before you lift anything.
Cables and counterweights deserve their own inspection every visit, because they are the parts whose failure is sudden and whose warning signs are visible: broken strands, kinks, flat spots, corrosion, loose terminations, frayed ends, and a pulley that has worn a groove. A suspended component whose cable inspection you cannot pass is out of service immediately, with the load lowered or secured.

\`\`\`
Finding                        Severity        Action
Lock or brake will not hold    safety          out of service now, secure the load
Counterweight cable damaged    safety          out of service now, secure the load
Collision sensor inoperative   safety          out of service until proven
Light field and x-ray field disagree beyond 2 percent of the SID  dose  out of service
Collimator lamp dark           dose            repair promptly, it invites guessing
SID indicator wrong beyond 2 percent  dose     repair promptly
Tabletop will not float        downtime        repair, room usable meanwhile
Motion stops partway           downtime        repair
Detents drifted                workflow        adjust, log the drift
Rough, noisy, or grabby motion wear            lubricate or replace, trend it
\`\`\`

## Locks, detents, and collision protection
Detents are workflow: the preset positions that make a chest, a table Bucky, and a cross-table lateral quick and repeatable. When they drift, the department gets slower and centering gets inconsistent, and you will hear about it as "the centering is off in room 3". Locks and brakes are safety, and so are collision sensors and the soft stops on a powered gantry. Prove each collision stop actually stops motion at the force or distance the manual specifies rather than assuming it works because nothing has crashed yet.

## The collimator and the receptor side
The collimator is both a mechanical and a dose device. Prove three things: the blades track the selected field size at the indicated SID, the light field matches the x-ray field within 2 percent of the SID with the beam-alignment tool, and automatic collimation plus the SID indicator hold the same 2 percent. A burnt-out lamp or a misaligned mirror is a dose finding, because the technologist will guess the field and the patient receives the difference.
On the receptor side, check that the table tray centers and latches at each detent, that the wall stand matches the tube's height and tilt, that the grid seats fully, and that a wireless panel sits home in its holder so the system knows it is parked. A panel not detected as parked is one of the most common no-exposure calls in a digital room.

## Wear, lubrication, and trending
Lubricate what the manual names, with what it names, in the amount it names. Grease on a brake surface, a clutch face, or a drive wheel is a fault you manufactured. Record play, noise, and the effort needed to move each axis on every visit, because the trend is what lets you order a bearing before the motion jams on a Friday afternoon.

## What to memorize
- Safety items: locks, brakes, counterweight cables, suspended components, collision sensors. Those come out of service immediately.
- Dose items: light field to x-ray field, automatic collimation, and the SID indicator, all within 2 percent of the SID.
- A motion stopping partway is usually a limit switch or sensor; a rough or grabby motion is wear.
- Lubricate only per the manual, and trend play, noise, and effort at every visit.`,

u9l7: `## Where the money is
A flat-panel detector is often the most expensive single part in a radiographic room, and an image intensifier is not far behind. Both are also the parts the department complains about most, so the decision that matters is whether a fault is a calibration, a cleaning, a setting, or a replacement.

## Receptor faults and what calibration can reach
A gain and offset calibration measures each pixel's response to a uniform beam and builds a correction, so it reaches anything that is a smooth, repeatable response error: shading, banding, a mottled background, drift after a board change, and the small noise increase that comes with age. It cannot reach a physical defect. A scratch, an impact, a growing cluster of dead pixels, a delaminated plate, or a cracked panel is a replacement. Between those sits the defect map, which interpolates a dead pixel, row, or column from its neighbors: a single defect is invisible in a diagnosis, many of them must be corrected, and a map that has grown every quarter is telling you the panel is dying.
\`\`\`
Fault                           Calibration  Clean  Setting  Replace
Shading, banding, mottle         yes          -      -        -
Noise after a board change       yes          -      -        -
New dead rows or clusters        map only     -      -        likely
Scratch, impact, delamination    -            -      -        yes
Ghost on an imaging plate        -            erase  -        if repeated
Lag on a warm aging panel        -            -      cooling  eventually
Dust marks in the same place     -            yes    -        if internal
Wireless panel dropping out      -            contacts  access point  battery
Panel not detected as parked     -            contacts holder  -      -
\`\`\`
Plates and cassettes wear in ways panels do not: scored phosphor, peeling edges, light leaks, and dust on the reader's mirrors and lenses, which is a service intervention rather than a wipe. A plate idle for 24 hours is re-erased before use, because background radiation fogs it.

## Fluoroscopy: the intensifier's signature
An image intensifier loses conversion gain as it ages. The automatic brightness control responds by raising technique to defend image brightness, so the first measurable sign of an aging intensifier is a rising patient dose rate at a fixed phantom, long before anybody complains about the picture. That is why the tabletop dose rate baseline is the most valuable number in a fluoroscopy record. Other intensifier faults are distinctive: image rotation, edge distortion, vignetting, vacuum loss, and a burnt input phosphor where somebody left the beam parked. Flat-panel fluoroscopy does not rotate or distort at the edges; it fails in rows, columns, and panels, and it suffers lag when hot.
Automatic brightness control that hunts, pumping brightness up and down, is a feedback loop problem: the sensing element, the loop calibration, or a mismatch after a camera or panel change. Dose rate too high at the tabletop has a short list: the control's calibration, a magnification mode left engaged, continuous rather than pulsed operation, or a missing filter. Measure it with a chamber at the tabletop against the 10 R/min normal limit and the 20 R/min boost limit, and confirm the five-minute audible timer while you are there.

## The monitor chain and the verification set
A fluoroscopic complaint is sometimes neither the tube nor the receptor. Cables, the graphics path, and a display that has drifted out of calibration all look like a fluoroscopy fault from the control room, which is why you check the image on a second display before dismantling anything.
Finish every receptor or fluoroscopy repair with the same set: a flat-field image, a phantom image at a fixed geometry and technique compared with the baseline on file, the exposure or dose indicator in range, and the tabletop dose rate where dose rate was touched. Write the numbers down. Without a baseline, none of those images prove anything, which is the real reason the quality control file matters.

## What to memorize
- Calibration fixes smooth response errors; maps interpolate dead pixels; physical damage means replacement.
- A plate idle 24 hours is re-erased; repeated ghosts point at the reader.
- Rising dose rate at a fixed phantom is the earliest sign of an aging intensifier; rotation and edge distortion are intensifier only.
- Tabletop rate against 10 R/min and 20 R/min, five-minute audible timer, and a phantom image after every receptor repair.`,

u9l8: `## Two systems held to a written program
Mammography and ultrasound look like opposites: one is the most heavily regulated x-ray system in the building, the other has no ionizing radiation at all. What they share is that both are governed by a written quality control program with baselines, and on both the phantom image is the evidence that ends an argument about whether a system is fit to use.

## Mammography faults
Compression is the fault that reaches you most. The requirement is a force of 25 to 40 lb available in both powered and manual modes, with no way for the system to exceed 40 lb automatically, and it is verified with a scale rather than a technologist's judgment. A unit that will not reach the force is a drive, a force sensor, or a calibration; a unit that reads force it is not applying is a sensor or a calibration and is the more dangerous of the two. A paddle that will not release is an immediate out-of-service fault, because it can trap a patient, and the release path including any manual override is tested at every visit. Paddles that are cracked, chipped, or bent are replaced, never dressed.
Image faults divide the same way they do in radiography. Light or dark images and a falling phantom score point at the AEC detector position, the cell selected, detector calibration, or target and filter selection. The rule the program gives you is a trigger rather than a judgment: a phantom score that drops by more than 0.5 means stop and investigate calibration, target and filter selection, compression, and processing, instead of adjusting technique to make the image look right again. A target or filter error is the filter wheel motor, its position sensor, or an interlock. A mark in the same place on every image is a detector or plate defect, dust in the beam path, or a damaged paddle, and the way to tell them apart is to image the phantom with the paddle removed and then refitted.
Returning a mammography unit to clinical use is evidence-driven, because the program is federal: the phantom image back in tolerance, the quality control record signed and dated, and a qualified medical physicist survey after a major component is replaced, which is the same trigger as the annual survey requirement.

## Ultrasound faults
\`\`\`
Symptom                     Most likely cause              First check
Dark vertical stripe        element dropout or a broken
                            cable conductor                phantom, then swap the probe
Shadow in one preset only    failing channel group or
                            a preset change                compare presets and probes
Weak, shallow, noisy image   gel and contact, lens wear,
                            bent connector pins            inspect lens and connector
No Doppler signal            preset, wall filter, gain,
                            then the probe                 known good probe on a flow phantom
Image good, controls dead    panel, cart power, battery     power path and the panel cable
Dead display                 cable, inverter or backlight,
                            graphics path                  second display or output
Probe failed after cleaning  wrong chemistry, soaked past
                            the immersion line, wet connector  the cleaning procedure in use
\`\`\`
The single most useful ultrasound test is the swap: a fault that follows the probe into another port is the probe, and a fault that stays with the port is the system. Immersion and chemistry damage is the most common avoidable probe failure in a department, and the fix is procedural rather than technical: a visible immersion line, only the chemistry the manufacturer approves for that probe, a connector kept dry, and retraining with the staff who clean. Transesophageal probes add an electrical leakage test, because they go inside a patient, and they are the probes most often destroyed by soaking.

## The right phantom, against a baseline
Mammography uses the accreditation phantom and its scored image, read the same way every time, by the same method, under the same viewing conditions. Ultrasound uses a tissue-mimicking phantom at fixed settings for depth of penetration, resolution, and uniformity. In both cases the image is worthless without the baseline image and numbers on file, which is why the first job on a new or repaired system is to record a baseline.

## What to memorize
- Compression 25 to 40 lb in both modes, no automatic exceeding of 40 lb, verified with a scale; a paddle that will not release is out of service at once.
- A phantom score drop over 0.5 means stop and investigate, not adjust technique.
- A dark stripe is element dropout or a cable conductor; prove it by swapping a known good probe.
- Probe failure after cleaning is chemistry, immersion depth, or a wet connector, and transesophageal probes also get a leakage test.`,

u9l9: `## Equipment that lives in a hallway
Mobile imaging equipment is built to be abused and still gets abused faster than it is built for. It is pushed into elevators, parked against door frames, wiped with whatever bottle is on the cart, and expected to work on battery at three in the morning on a floor where nothing else works. Its failures concentrate in three places: stored energy, motion, and anything that flexes.

## Batteries, chargers, and the test that actually means something
A battery-powered portable stores the energy for both propulsion and the exposure itself, so capacity decides whether a technologist finishes the round or walks the unit back. The only meaningful test is under load, because a tired pack holds a convincing resting voltage and then collapses at the first exposure. Measure terminal voltage while driving and during an exposure, count exposures per charge, and log run time so the trend shows a pack failing before the department discovers it at a bedside.
Charger faults imitate battery faults exactly, so prove the charger before you condemn a pack: output voltage and current at the connector, the charge interlock or inhibit, the connector and cord, and whether the unit is actually plugged in between rounds. A pack stored discharged loses capacity permanently, which makes "plug it in after every round" a maintenance instruction rather than a courtesy. Replace cells as a matched set, never one cell in an old string, and dispose of them by their chemistry.
\`\`\`
Symptom                          First check                  Then
Will not expose off mains         pack voltage under load      charger output and interlock
Dies partway through a round      exposures per charge vs log  capacity test, cell balance
Will not charge                   cord, connector, interlock   charger output, then pack
Drive weak or dead                dead-man drive switch        belt, bearings, brake drag
Will not hold on a slope          brake pads and adjustment    out of service now
Fault only in one arm position    continuity wiggle test       cable or connector replacement
Collimator lamp or laser dark     lamp and timer circuit       mirror alignment
Blurred portable images only      exposure time and motion     grid alignment and set SID
\`\`\`

## Motion, brakes, and the dead-man switch
The drive and the brakes are safety systems on a machine that weighs several hundred pounds and travels in corridors with patients in them. A dead-man drive switch that sticks closed, a brake that creeps on a slope, or a unit that will not stop comes out of service immediately. Wheels, casters, and bearings collect hair, tape, and fluid, and a dragging caster feels exactly like a weak drive, so look before measuring. Check that the tube arm, the column, and the collimator lock in the transport position, because an arm that swings while the unit is moving hits a door frame or a person.

## Flex failures and the wiggle test
Transport destroys what bends. Cables at the tube arm, the hand switch, the footswitch, the monitor cart, and the detector tether fail one conductor at a time, which produces the most frustrating symptom in service: an intermittent fault that follows a position. Find it with a meter rather than the image. Put continuity on the suspect conductor, flex the cable through its range, and watch for the break; then replace the cable or the connector rather than splicing it. The same logic applies to connectors whose strain relief has pulled out, which is the usual outcome of a cable used as a handle.

## C-arms and mobile image faults
A C-arm adds orbital, lateral, wig-wag, and vertical motions, each with its own brake, detent, and sometimes a motor and encoder. Faults are brake wear, worn detents, collision stops, and encoders that lose position so the displayed angle is wrong. The image faults specific to mobile work are not system faults at all: motion blur from the long exposure times a battery unit uses, grid misalignment from a detector held by hand or wedged behind a patient, and an SID that was estimated rather than set.

## After an isolation room
A unit used in isolation is cleaned with the facility's approved product, with attention to the hand switch, rails, keyboard, and detector, then inspected for liquid intrusion, because the commonest harm from cleaning is a soaked control or a wet connector. Confirm that the chemistry in use is the one the manufacturer approves, and that the staff doing the cleaning know which bottle that is: a wiped-down unit destroyed by the wrong disinfectant is a training finding, not a device fault.

## What to memorize
- Test batteries under load and log run time and exposures per charge; prove the charger before replacing a pack; never store a pack discharged.
- Brakes and the dead-man drive switch are safety items and come out of service immediately.
- A fault that appears only in one arm position is a cable flex failure, found with a continuity wiggle test.
- Mobile image faults are usually motion, grid alignment, and an estimated SID, and a dark collimator lamp is a dose problem.`,

u9l10: `## The part of the job that keeps the job
Technical skill gets you hired in radiology; communication is what keeps you welcome in it. The exam tests this domain because an imaging technician works with four audiences who each need different words: technologists who need to run the room, radiologists who need to read the image, managers who need numbers and dates, and vendor engineers who need facts in a fixed order.

## Clinical staff
Lead with their three questions, in their order: what works now, what does not, and when does it come back. Then translate. A technologist does not need the words "high-voltage cable termination"; they need to know the snapping noise and the dark images came from a cable connection, it is replaced, the output measures correct, and the room is theirs. Give a time you can keep rather than the time you hope for, update it as soon as it slips, and deliver it to the lead technologist first so the schedule can be moved once rather than three times.
Radiologists ask a different question: can I trust the image. Answer it with what you measured. "Measured kVp and time are within tolerance, the detector was recalibrated, and the phantom image matches the baseline" is an answer; "it should be fine now" is not.

## Use error without blame
When reproduction shows the machine is behaving as designed, the corrective action is a demonstration. Put the behavior on the screen, show the setting that produces it and the setting that does not, and name the machine as the subject of every sentence: "this console does that when the outer chamber is selected on a small patient." Then arrange real applications training through the vendor or the department superuser, and record the conversation in the work order exactly as you would a part number, because the next person needs to know this was not a hardware fault. Watch for the call to return; a repeat means the training is still an open item, and it may belong in the department's competency record.

## Escalation
\`\`\`
Have ready                      Why it matters
Model and exact serial number    the right manual, parts, and field notices
Software or firmware version      published fixes are version specific
Exact error text and code         the log entry verbatim, not a paraphrase
Your measurements                 kVp, mAs, voltages, resistances, with tolerances
What you already tried            stops them walking you back through it
Patient and schedule impact       decides callout versus next-day
Contract and purchase details     decides who pays and how fast a part moves
Case number from the last call    links the thread for whoever takes the next one
\`\`\`
While you have support on the line, ask what open field notices and service bulletins exist for that model and serial range. Those notices are how a one-off fault turns out to be a known defect with a kit, and they are also something a surveyor may ask whether you track.

## The service report
The report is the deliverable. It carries the symptom as reported, what you found, what you did, the parts used by number, the verification readings with their tolerances, the dose or quality control results where output, geometry, or the receptor was touched, the time the system returned to use, and your name. Written that way it answers three later questions at once: did this repair work, is this device failing repeatedly, and was the system safe when it went back into service.

## The other departments and the project work
Information technology owns the network past your device, facilities owns power and cooling, infection prevention owns cleaning chemistry, and radiation safety owns dose and the regulatory relationship. Each conversation goes better with evidence instead of suspicion: the address, the test, the result, the time. On installs, upgrades, and acceptance testing, agree before the work who tests what, who signs acceptance, who trains the staff, who updates the inventory and the service documentation, and who tells the department it is live. Write that down too, because a project nobody documented becomes a support problem nobody owns.

## What to memorize
- Clinical staff: what works, what does not, when it returns, in their language, to the lead technologist first.
- Use error: demonstrate, arrange applications training, document without blame, watch for the repeat.
- Escalate with model, serial number, software version, exact error text, readings, what you tried, and the impact.
- The service report carries symptom, cause, action, parts, verification readings, and the return-to-service time.`,

u10l1: `## Why addressing is a service skill in imaging
In most of a hospital the network is somebody else's problem. In imaging it is partly yours, because the modality's network settings are entered by hand during installation, written in the service manual's configuration section, and changed by you when the archive moves. That makes four values worth understanding rather than copying: the address, the mask, the gateway, and the name servers.

## The mask, and the mistake it causes
The address names the device; the mask says how much of that address is the network. With {{255.255.255.0}} the first three numbers are the network and the last names the host, so {{10.4.7.20}} and {{10.4.7.90}} are neighbors and talk directly, while {{10.4.9.12}} is on another network and the conversation must go through a router. Get the mask wrong and the device develops a strange personality: some destinations work and others do not, with no pattern the user can describe, because the device is deciding wrongly which destinations are local. Get the gateway wrong and the device works perfectly inside its own subnet and can reach nothing else, which users report as "the whole network is down" from that one console.
\`\`\`
Value             What it is for               Symptom when it is wrong
Address            names this device            duplicate address, nothing works
Subnet mask        decides who is local          some destinations fail, no pattern
Default gateway    the exit to other networks    local works, everything else dead
Name servers       turn names into addresses     address works, name does not
\`\`\`

## Static versus handed out, and why imaging is static
DHCP is a lease: the device asks and a server answers with an address for a period. That is right for a workstation and wrong for a modality, because every node that sends to the modality, and every node the modality sends to, is configured with an address and a port. If the archive's address changed on a Tuesday, every room in the department would stop sending at once. So modalities, archives, brokers, and anything another device must find are given static addresses from a documented plan, and the plan is part of the equipment record.
A device showing an address beginning {{169.254}} has assigned that to itself after asking for a lease and getting no answer, which points at the link, the port's VLAN, or the DHCP service, never at the imaging application.

## Switches, routers, and the imaging VLAN
A switch joins devices within one network and learns which MAC address lives on which port, so traffic goes only where it belongs. A router joins networks and is usually where the access rules live. A VLAN is a logical network running over shared switches, and imaging gets its own for three reasons worth stating in exam language: traffic volume, narrow access rules, and modalities running software that cannot be patched on the enterprise's schedule. The practical consequence is the fault that catches everyone: a perfect cable in a correctly wired jack that happens to be assigned to the wrong VLAN behaves exactly like a dead network.

## Bandwidth in numbers
File size is the matrix multiplied by the bit depth, so a 4096 x 4096 image at 12 bits is about 25 megabytes of pixels before anything is wrapped around it. Per image, the usual approximations are about 2 megabytes for nuclear medicine, 5 for magnetic resonance, 10 for computed tomography, 20 for radiography, and 50 for digital mammography, which is why a four-view mammography study runs to about 200 megabytes and a cross-sectional study of several hundred slices is a serious transfer. Modalities are therefore wired, archives sit on the fastest links in the department, and a congested path shows up as a growing local queue rather than an error message.

## What to memorize
- Mask decides local, gateway is the exit, name servers resolve names; each has its own distinctive failure.
- Modalities and archives are static because other nodes are configured to find them.
- A self-assigned 169.254 address means DHCP never answered: a link, port, or service fault.
- Switch inside one network, router between networks, VLAN separates on shared switches; the wrong VLAN looks like no network.`,

u10l2: `## The layer you can touch
Almost every network tool an imaging technician owns works at layer one, and so do a surprising share of the faults. A modality that will not send is a cable, a jack, a port, a link speed, or a wireless gap far more often than it is a protocol problem, and all of those are physical things in rooms you already visit.

## Copper by category, and the hundred-meter rule
\`\`\`
Cable     Speed it supports in practice   Connector   Run limit
Cat 5e    1 Gbps                           RJ45        100 m
Cat 6A    10 Gbps                          RJ45        100 m
Fiber     beyond copper speeds and far
          beyond copper distance; immune
          to electrical noise               optical     far beyond 100 m
\`\`\`
The hundred-meter figure is the whole channel, which means the run in the wall plus the patch cord at each end, so a long run finished with two long patch cords is a channel that works in testing and fails in a warm closet. Fiber earns its place twice in imaging: between closets, and anywhere the cable has to pass near high-current equipment, because glass does not care about electrical noise.

## The chain from jack to switch
A run goes device, patch cord, wall jack, building cable, patch panel, patch cord, switch port. Each junction is a place a fault hides, and two of them are inside the data closet where you may not be the last person to have worked. Label both ends of anything you install, record the jack number in the equipment record, and photograph the patch panel before you change it. The commonest physical faults in a real department are a patch cord crushed by a table caster or a C-arm wheel, a jack terminated to the wrong pin standard so it works at low speed and fails at high, and a patch cord in the panel that somebody moved during another project.

## Link lights, and what a degraded link does clinically
The link light is the fastest diagnosis in informatics. No light at either end is physical. A light with no activity means connected and silent, which moves the fault to addressing or the application. A link negotiating at a lower speed than it should is the subtle one: it usually means a damaged pair, and it never produces an error message. What it produces is a department complaining that sends from that room take minutes instead of seconds, which gets reported as "the archive is slow".

## Wireless, access points, and the detector
Enterprise wireless is a set of access points configured centrally by a controller, which sets channels, power, and security for all of them at once. That architecture produces a characteristic failure: a change made centrally by the network team takes out every wireless detector in the building on the same afternoon, and nothing in any room has changed. The wireless receptor is the most demanding client in the hospital, because it moves, carries large files, and runs on a battery. Coverage gaps collect in stairwells, elevators, lead-lined rooms, and shielded suites, and they look like a panel that drops out mid-exam or a study that sits in the local queue until the unit is wheeled back toward an access point. Prove a suspected coverage problem by working in the same room as an access point before anybody reconfigures anything.

## Testers and tracers
A cable tester proves continuity, length, shorts, split pairs, and whether each pin lands where it should, and the better ones report the distance to a fault, which tells you whether the break is in the patch cord or thirty meters into a wall. A tone generator and probe finds which jack is which in an unlabeled closet. A known good patch cord in the bag beats both of them for speed, because substitution is a test. What none of them can do is tell you which VLAN a port is in, which is why that question goes to the network team early.

## What to memorize
- Cat 5e 1 Gbps, Cat 6A 10 Gbps, 100 m channel including patch cords, RJ45 connectors, fiber for distance and electrical noise.
- The chain is device, cord, jack, building cable, panel, cord, port; label and record both ends.
- No link light is physical; a link at the wrong speed produces slow sends and no error.
- One change at the controller reaches every access point; coverage gaps strand wireless detectors.`,

u10l3: `## Imaging equipment is computing equipment
Inside every modern modality there is a computer doing the work that matters after the exposure: reconstruction, processing, storage, and transmission. That is why so many "imaging" faults are ordinary computer faults, and why the troubleshooting is ordinary too.

## Where the work happens
The console takes the operator's input and runs the exposure. The acquisition workstation reconstructs and processes images, holds today's studies, and sends them. Reconstruction is arithmetic on large arrays, so that machine has the most processing power and memory in the department and is the one that gets slow when something is wrong. A reading station is built differently: its job is to pull studies quickly and display them accurately, so it is built around its network path, its graphics, and its calibrated displays.
\`\`\`
Part        Its job                         How its shortage shows
CPU          reconstruction and processing    long reconstruction, sluggish console
RAM          the working set of one study     slowdown that worsens with study size
Storage      today's studies and the cache    cannot acquire, disk full warnings
Graphics     drawing the image on a display   slow paging through a large series
Network card moving studies off the machine   growing local queue, slow sends
\`\`\`

## Operating systems, accounts, and versions
The operating system under a modality's application is validated as part of the product, which is why it is often several versions behind the rest of the hospital and why you cannot simply patch it. Three rules follow. Patch only on the manufacturer's validated schedule. Keep the service account separate from clinical accounts, so configuration changes are attributable and clinical users cannot reach service functions. And record the software and firmware versions in the equipment record, because a published fix, a known defect, a conformance statement, and a support call are all version specific.

## Storage, redundancy, and the thing people confuse with a backup
Studies live in tiers: a local cache on the modality, an online archive for recent work, and a slower deep archive for older studies. A RAID set spreads data across drives so the array survives a drive failure and tells you about it. The trap is believing that is a backup. A degraded array is a failure already in progress with the safety margin gone, and an array deleted by mistake, encrypted by malware, or destroyed by a flood takes every copy inside it. A backup is a separate copy somewhere else that somebody has restored and timed. Schedule restore tests, and export each modality's configuration so a replacement console is configured rather than reinvented.

## Virtualization and the cloud at recognition depth
A hypervisor lets one physical host run many virtual servers, which is how archives, brokers, worklist servers, and management systems are commonly deployed. The gains are consolidation, fast provisioning, and snapshots; the exposure is that one host failing takes down every server on it, so clustering and backups still matter and patching has not gone away. Cloud services are a vendor's servers reached over the internet, which adds a written agreement covering patient data, encryption both on the wire and on the disk, and an internet circuit whose outage is now a clinical outage.

## The ordinary faults
No power is the same chain as any device: outlet, cord, supply, switch. Power but no picture is the display, the cable, or the graphics output, and the machine is usually booting fine behind it. "No boot device" means a failed drive or a changed boot order, often a stray USB device left in a port. Slow means a nearly full or failing disk, insufficient memory, dust and heat, or a background job. Peripherals fail at the port, the cable, or the driver, and a barcode scanner that suddenly adds characters has been reprogrammed rather than broken. A machine with the wrong date at every boot has a dead clock battery, and in imaging that is more than cosmetic, because time stamps are what tie an image to an order and a dose record to a patient.

## What to memorize
- Reconstruction needs processing and memory; reading stations need network, graphics, and calibrated displays.
- Patch only on a schedule the manufacturer has validated, separate service from clinical accounts, record versions.
- RAID survives a drive and warns you; it is not a backup, and a backup is not real until restored.
- One virtual host failing takes every server on it; cloud adds an agreement and an internet dependency.`,

u10l4: `## The system everybody blames
When anything in radiology goes wrong, the first words are usually "PACS is down". Learning the parts is how you turn that sentence into a question you can answer in a minute.

## Four parts, four different failures
\`\`\`
Part            What it does                   What its failure looks like
Archive          stores the image data          sends fail, retrieves fail
Database          indexes what exists and where  images exist but cannot be found
Workstations      display studies for reading    one reader affected, or all readers
Interfaces        connect modalities and records text stops, worklists empty
\`\`\`
That table is diagnostic. "Nobody can find yesterday's study but today's work is fine" is a database and index story, not a storage story. "One radiologist cannot open anything" is a workstation, an account, or a permission. "Every modality lost its worklist" is an interface. Saying which of the four you are in, out loud, before touching anything, is the single most useful habit in imaging informatics.
A vendor neutral archive is a strategic version of the archive: studies are held in a standard form independent of the reading application, so the application can be replaced without a second data migration. You will be asked what it is and why it exists more often than you will touch one.

## The lifecycle, and the two steps that generate service calls
A study is acquired against a scheduled order, sent, stored, committed, routed, read, reported, retained, and finally purged by policy. Two of those steps produce most of your work.
**Storage commitment** is the archive confirming that it has taken permanent responsibility for a study. Until that confirmation arrives, the modality's copy is the only guaranteed copy, so clearing local storage can lose the study. A room whose local disk fills every week is often a room whose storage commitment is failing quietly.
**Prefetching and routing** move studies toward where they will be needed: prior studies pulled toward the reading station when the patient is registered, and current studies copied to a subspecialty reader, a surgical suite, or another site by rule. A radiologist reporting missing priors is nearly always describing a prefetch or routing rule, or a name and identifier mismatch that stopped the priors being recognized as the same patient, rather than a lost study.

## Hanging protocols and the complaint that is not a fault
A hanging protocol is a saved layout: which series goes to which display in which orientation with which comparison. When images "come up wrong", the cause is the protocol or the way the modality labels its series, and the fix is configuration by the application team. Recognizing it saves you from troubleshooting an archive that is working correctly.

## Ownership, and why it is worth writing down
\`\`\`
Modality, console, its cable and jack          the imaging service shop
Switch port, VLAN, firewall, name resolution    the network team
Archive, database, routing, viewers, accounts   radiology informatics
The application's defects and patches           the vendor
\`\`\`
Agree this once, in writing, and keep it with the equipment records. Most of the time lost in an imaging informatics outage is spent deciding whose problem it is.

## Disaster recovery, from your side
The department needs a second copy of the archive somewhere else, a restore that has been tested and timed, and a written downtime procedure. Your contribution during an archive outage is specific: the modalities keep scanning into local storage, so you watch local free space in every room, you know how many studies each room can hold, and you tell the manager when a room is about to stop. That is the number that decides whether imaging continues.

## What to memorize
- Archive, database, workstations, interfaces, each with a distinctive failure signature.
- Storage commitment is what makes local deletion safe; failing commitment fills local disks.
- Missing priors are prefetch, routing, or identifier matching; a wrong layout is a hanging protocol.
- During an archive outage, local free space on each modality is the number that matters.`,

u10l5: `## The standard you configure by hand
DICOM was produced by the radiology professional body together with the manufacturers' association so that imaging systems from different makers could exchange images. It is the one informatics subject on which an imaging technician is expected to be fluent, because the fields you type during an installation are DICOM fields, and almost every "it will not send" call is a DICOM configuration call.

## Objects, services, and SOP classes
An information object is an image, a dose report, a structured report, or another unit of data together with everything known about it. A service is an operation performed on an object. Pair one with the other and you have a **SOP class**, which is the unit in which capability is stated: this node can store a computed tomography image, that node can serve a modality worklist. Two nodes agree on SOP classes or they do not talk, and the document that states each product's classes and roles is its conformance statement.

## The association, item by item
Before anything moves, two application entities negotiate an association over a TCP connection. Four things must line up, and three of them are typed by a human.
- **AE title**: the name each entity answers to, case sensitive, with length limits. Mistyped titles are the single most common installation fault.
- **Host**: the address, which is why modalities and archives hold static addresses.
- **Port**: commonly 104 or 11112, and the one most often left at a default that the other end does not use.
- **SOP classes and roles**: what each side offers and whether it is acting as the provider or the user of the service.

## The service table
\`\`\`
Service      Plain meaning                      Typical failure and first check
C-ECHO        verification, the DICOM ping        AE title, host, port spelling
C-STORE       push images to a destination        SOP class, disk space, license, rights
C-FIND        query for studies that match        query keys, date range, character set
C-MOVE        ask a node to send studies to a
              third destination                   destination not configured on sender
MWL           modality worklist query: pull the
              scheduled patients and accessions   query keys, modality code, date range
MPPS          performed procedure step: report
              started, completed, discontinued    status boards and billing stall
Commitment    archive accepts permanent
              responsibility for the study        local deletion becomes unsafe
Print         send an image to a hardcopy device  rarely used now, still on the exam
\`\`\`
Read that table twice, because problem-solving items are built on it: an echo that passes with a store that fails is a class, capacity, license, or permission problem, and nothing else.

## The worklist is a patient safety feature
A modality worklist query brings the day's scheduled patients, their identifiers, and their accession numbers to the console so the technologist selects rather than types. It is the department's main defense against misidentified studies, which is why an empty worklist is an urgent informatics call rather than an inconvenience: every study acquired by hand during the outage has to be reconciled afterwards by somebody with privileges in several systems.

## The header, and what a mismatch does downstream
Every object carries tagged fields: patient name, identifier, accession number, study and series description, modality, dates, and technique. Downstream systems match on those fields, so a mismatch never looks like an error at the modality. It looks like a study that will not attach to its order, a report with nowhere to file, a study missing from a worklist of unread cases, or priors that no longer recognize their own patient. That is why you change those fields only through the worklist, and why corrections are made in the archive and the record systems together rather than at the console.

## What to memorize
- Object plus service equals SOP class; conformance statements state what a product supports.
- Association needs AE title, host, port (commonly 104 or 11112), and matching SOP classes.
- C-ECHO verifies, C-STORE sends, C-FIND queries, C-MOVE retrieves, MWL schedules, MPPS reports, commitment transfers responsibility.
- Header mismatches appear downstream as unattachable studies and lost reports, not as modality errors.`,

u10l6: `## The text half of radiology
A department can have perfect images and still be broken, because an image with no order behind it and no report ahead of it is not a diagnosis. HL7 carries that text, and understanding the path it travels is what lets you tell a modality fault from an interface fault in one question.

## The systems, each in one line
The **RIS** schedules exams, holds the worklist, tracks the status of each study, and routes reports. The **EMR** is where the order begins and where the report must land, and the **EHR** is the clinician's view of the same record. The **interface engine** or broker sits between them all: it receives messages, translates them into each receiver's expected format, routes them, queues them when a receiver is slow, and logs every rejection with a reason. That log is the first place to look whenever text stops moving, and the queue depth is the single best health indicator in the whole chain.

## The three message types worth knowing
\`\`\`
Type   Name                      What it carries and why you care
ADT    admit, discharge,
       transfer                   identity and location; identity faults start here
ORM    order                      the requested exam and the accession number
ORU    observation result         the dictated report returning to the record
\`\`\`
Messages are lines of text divided into segments, each segment holding one kind of information, which is what lets an interface engine reject a message with a specific reason such as an unknown patient or an invalid field rather than failing silently.

## The path, with the failure at each step
\`\`\`
Step                                   If it fails, the symptom is
Order placed in the record system       no order exists anywhere
Order reaches the RIS and is scheduled  nothing to schedule, nothing on the worklist
Worklist query reaches the modality     technologists type patients by hand
Study acquired against that entry       study with no matching order
Progress reported upstream              status boards and billing stall
Study sent and stored in the archive    images on the modality only
Read against prefetched priors          reading delayed, priors absent
Report returns to the record            images readable, no report filed
Dose record follows the identifiers     dose reporting gaps with regulatory weight
\`\`\`

## Identifiers, and the five ways they break
Two identifiers hold the chain together: the medical record number, which ties studies to a person, and the accession number, which ties one order to one study. The classic breakages are a duplicate record created at registration, two records merged after a study was acquired, a name changed between the order and the exam, a study acquired before the order reached the worklist, and a patient typed in by hand during a worklist outage. None of these produces a network error. They produce a study that will not attach, a report with nowhere to go, or images in the wrong person's record, and correcting them means consistent changes in the archive, the record system, and the report, which is informatics work with an audit trail, not a console edit.

## Dose reporting at recognition level
Modern systems generate a structured dose record for each study and send it the way they send an image, so dose can be totaled per patient, compared with reference levels, and submitted to a registry. Two things follow for you. A dose record that stops arriving is an interface fault with a compliance consequence, so it belongs on the post-change test list. And dose records contain patient identifiers, which makes them protected information in a place people forget to look.

## What to memorize
- ADT identity and location, ORM orders, ORU results; the broker translates, queues, and logs.
- The path is order, schedule, worklist, acquisition, progress, send, read, report, and dose, joined by identifiers.
- Medical record number ties studies to a person; accession number ties an order to a study.
- Duplicates, merges, name changes, early acquisition, and hand typing are the five identifier faults, corrected by informatics.`,

u10l7: `## One question first
Interdependence is the reason the first question in any informatics call is not what is broken. It is how wide the fault is, because the width tells you the layer, the owner, and the next test, all before you have walked anywhere.

## The width table
\`\`\`
What is affected                       Almost always
One modality cannot send                that node: AE title, address, port, cable, port
One modality has no worklist            that node's query: keys, modality code, dates
Every modality lost its worklist        upstream: the RIS, the broker, or name service
No reading station can open studies     the archive, its database, or its network path
One reader cannot open studies          that account, profile, permissions, or station
Everything everywhere is slow            the network, a backup job, or a failing link
Text flows, images do not                the imaging interfaces
Images flow, text does not                the message interfaces and the queue
\`\`\`
Say the row out loud and the call shortens. One node is yours to fix; everything at once is somebody else's to fix with your evidence.

## The upstream failures and what each one does
- **Worklist down.** Technologists revert to typing, so every study acquired during the outage becomes reconciliation work later. The outage is an hour; the cleanup is a week.
- **Archive down.** Reading stops immediately while acquisition continues into local storage, so the department is now living on local disk space in every room. Your job during that outage is to know how much is left.
- **Name resolution down.** Nothing resolves by name. Anything configured by address keeps working, which is both a diagnostic clue and the reason some older modality entries are still written as addresses.
- **Certificate expired.** A secure interface that worked yesterday fails today with no change by anybody. Expiry dates belong in a calendar with a reminder, because this failure is entirely predictable and still surprises departments every year.
- **Interface queue stalled.** Messages are accepted and never delivered, so the modality looks healthy and everything downstream is wrong. Queue depth is the number that catches it.

## Mapping before you need the map
Draw the department once: each modality, its interfaces, the broker, the archive, the record system, the dose destination, the reading stations, and the direction of each dependency. Mark which links are encrypted and when their certificates expire. Keep it with the equipment records. The value shows on the day a ward reports that radiology is down: one page turns a long sequence of phone calls into two checks and a name to call.

## Change control, and the test that is always skipped
A change to a networked modality is a change to every system it talks to, so it gets a record, a test, and a rollback plan. The minimum post-change test is a chain test, not a console test: verify the association, pull a worklist, acquire a test study, confirm it arrives at the archive, confirm the progress status moved, confirm the dose record arrived, and confirm a report can file against it. Agree before the work who tests which link. The classic silent failure after an upgrade is a modality that images perfectly, sends perfectly, and quietly stops producing dose records, which nobody notices until an audit.

## Downtime and monitoring
Every department needs a written downtime procedure covering how patients are identified without a worklist, what is recorded on paper, where studies are held, and how it is all reconciled afterwards, plus who declares downtime and who declares it over. On the monitoring side, interfaces, queues, and free space should be watched automatically, with alerts that reach somebody who acts. Know who receives them, because an alert going to a mailbox nobody reads is not monitoring.

## What to memorize
- Scope first: one node is local, everything at once is upstream.
- Worklist outage means hand typing and reconciliation; archive outage means local disks filling.
- Name resolution failures spare anything configured by address; certificates expire on a schedule you can calendar.
- Test the whole chain after every change, including the dose record, and keep a written downtime and reconciliation procedure.`,

u10l8: `## The service technician as a security control
Security in imaging is not an information technology project that happens around you. Several of its controls are literally your tasks: the inventory, the versions, the service accounts, the sanitization before a device leaves, the advisories handled like recalls. The exam asks about this domain in the form of "what should the technician do".

## Where the patient data actually is
People think of the archive. The data is also in the console's local study list, the detector's cache, the dose reports, the exported images somebody put on a drive for a conference, the service logs attached to a vendor ticket, and the hard drive in the workstation you are about to send back for credit. That is why sanitization before disposal, trade-in, or vendor return is a documented step with a record of what was done, and why a vendor touching patient data works under a business associate agreement.

## The rules in plain words
HIPAA protects identifiable health information through its privacy, security, and breach rules. HITECH strengthened enforcement, added breach notification, and extended the duties to service vendors. The security rule asks for three categories of safeguard, and the three names are worth memorizing exactly: **administrative** (policies, training, access review, risk analysis), **physical** (locked rooms and closets, screens turned away, controlled media and disposal), and **technical** (unique accounts, encryption, audit logs, automatic logoff).

## Access control on a modality
\`\`\`
Control                   What it looks like in a room
Unique named accounts      no shared login, no password taped inside the cover
Separate service account   configure with it; never chart with it
Least privilege            the rights the task needs, reviewed when people move on
Default credentials gone   changed at installation, stored in the approved vault
Automatic logoff           consoles lock; a logged-in console in a corridor is an exposure
Audit logging              actions attributable to a person, which shared accounts defeat
\`\`\`

## Patching, protection, and segmentation
A modality's software stack is validated as a whole, so patches are applied when the manufacturer has validated them. The gap between a vulnerability being published and a validated patch arriving is real, and it is covered by compensating controls rather than wishful thinking. The main one is **segmentation**: the device sits on its own VLAN, reachable only from the addresses and on the ports it needs, with no general internet access from the console and no browsing. Antivirus runs only where the manufacturer supports it, with the exclusions the manufacturer publishes, because a scanner that quarantines a study or locks a file during reconstruction causes a clinical outage. Where antivirus is unsupported, allow-listing permits only approved software to run, which suits a fixed-function device well.

## Encryption, and the difference it makes to a breach
Encryption in transit protects data crossing the network: TLS on interfaces that support it, a VPN for anything leaving the building, and current wireless security on every radio link. Encryption at rest protects the disk, which matters most for laptops, portable drives, and devices going out for service. The practical difference is stark: a lost device that was encrypted is an incident to investigate, while losing one that was never encrypted is a reportable breach carrying notification duties.

## Medical device cybersecurity and incident response
The structural problem with imaging equipment is lifespan. A scanner serves fifteen years and its operating system does not, so departments run unsupported software on devices that cannot be replaced casually. Add remote service access, fixed-function devices that cannot host modern protections, and third-party software components the vendor assembled, and you have the real risk picture. Three habits cover most of it: know what you own and what it runs, read the manufacturer's security disclosures and advisories, and handle a security advisory exactly like a recall, with affected devices identified by model and serial range and the action dated in the record.
Incident response, in order: isolate the device from the network, preserve the evidence, notify security and the department manager at once, do not power it off if forensic examination may be needed unless you are told to, and keep it out of clinical use until it is cleared.

## What to memorize
- Patient data lives in consoles, caches, dose reports, exports, and service logs; sanitize or document before anything leaves.
- Administrative, physical, and technical safeguards are the security rule's three categories.
- Unique named accounts, a separate service account, least privilege, changed defaults, automatic logoff, audit logs.
- Patch on a schedule the manufacturer has validated, segment what cannot be patched, and encrypt both on the wire and on the disk.
- Incident: isolate, preserve, notify, and leave it powered if a forensic examination may be needed.`,

u10l9: `## The documents a surveyor asks the shop for
Security that exists only in practice cannot be demonstrated, and demonstration is what a survey is. Four documents carry most of the weight in imaging, and the shop owns or feeds all four.

## The inventory, which everything else stands on
A security risk assessment asks, system by system, what data it holds, what could go wrong, how likely and how severe that is, and what control reduces it. None of that can be done without an accurate inventory of networked devices, and that inventory is the shop's work: model, serial number, location, network address, operating system and application version, the vendor who services it, what it connects to, and whether it holds patient data. When the inventory is stale every document downstream of it is wrong, which is why "show me your networked medical device inventory" is usually the first request and often the most revealing answer.

## MDS2, read as a service document
\`\`\`
What the form states                    The service question it answers
Data stored and transmitted              does this hold patient data; must it be sanitized
Authentication and authorization         are unique accounts possible at all
Automatic logoff and audit controls      can an action be attributed to a person
Security updates and patching            who may patch it, and on whose schedule
De-identification and export             can test images leave the device safely
Backup, recovery, emergency access       what happens in a failure or an emergency
Malware protection, node authentication  is antivirus supported; is it allow-listing only
Remote service and connectivity          which remote doors exist and how to close them
Third-party components and guidance      what the vendor expects the facility to do
\`\`\`
Ask for it at purchase, while the money is still unspent, and attach it to the device record. Pair it with the software component list a manufacturer can supply, which is the document that lets you answer "are we affected" when an advisory names a software library rather than a product.

## IEC 80001 at recognition level
This is the risk management standard for information technology networks that carry medical devices. Its premise is that neither the network team nor the device team can manage that risk alone, and what it asks for is a documented joint process with named responsibility across the life of the network. Practically, it is the authority behind the meeting where you and the network team agree, before a modality goes live, what it needs to reach, what may reach it, who patches it, who monitors it, and what happens when it fails. Write the outcome down; that record is the evidence.

## Vendor remote access
Uncontrolled vendor access is among the easiest findings for a surveyor to write, and among the easiest to fix. The controlled form has five features: access through the facility's managed gateway or VPN rather than a vendor tunnel or a modem; a named account per engineer instead of a shared one; access enabled for a session and disabled afterwards; a session a facility person approves and can observe; and a log of who connected, when, and what they did. Behind it sits a business associate agreement with any vendor that can see patient data, which the compliance office will ask about before anybody is given a credential.

## What the survey wants from you, and where it comes from
Expect four requests: the networked device inventory with versions; evidence that security actions are tracked and closed like any other corrective action; access and audit records showing accounts are unique, justified, and reviewed; and the handling record for advisories and recalls with a security element. Every one is answered from the CMMS if you put it there as you go, with the device record carrying its security documents, the work orders carrying the patch and configuration changes with dates, and each advisory carrying the devices affected and what was done. Recording it afterwards, in a hurry, during a survey week, is how a good program fails an audit.

## What to memorize
- The risk assessment stands on the device inventory, and the inventory is the shop's.
- MDS2 states data held, authentication, logging, patching, backup, emergency access, malware protection, and remote service.
- IEC 80001 asks for a joint documented risk process for networks carrying medical devices; it sets no acceptable risk level for you.
- Vendor access: managed gateway, named account, enabled per session, approved and observed, logged, under a business associate agreement.`,

u10l10: `## Bottom up, every time
Network troubleshooting rewards discipline more than cleverness. Each layer is proved before the next is suspected, and the reason is not purity: it is that the lower layers are cheap to test and are where the faults actually are.

## The five steps
1. **Link.** Lights at the device and at the switch port. No light is physical: patch cord, jack, run, or port. A light with no activity means connected and silent.
2. **The device's own configuration.** Read the mask, the gateway, the name servers, and the device's own address on the console. A self-assigned address beginning 169.254 means no DHCP answer; a duplicate address warning means somebody else has yours; a wrong mask or gateway explains destinations that work alongside destinations that do not.
3. **Reachability.** PING outward in order: the device's own address, then the gateway, then the archive by address. Each step proves one more segment.
4. **Name.** PING the archive by name. Works by address and fails by name is name resolution, without exception.
5. **Application.** Reachable both ways and still failing is the application: a blocked port, a stopped service, or a configuration mismatch. This is where a DICOM echo takes over.

## Reading the replies
\`\`\`
Result                          What it proves
Reply with a time               the path and host are alive at the IP level
Request timed out               no reply: host down, wrong subnet, or echo blocked
Destination host unreachable    your own side has no route: mask or gateway
Replies with wild times or loss congestion, a damaged pair, or wireless trouble
Fine by address, fails by name  name resolution only; connectivity is good
\`\`\`
Hospital firewalls often drop echo traffic, so a device that does not answer a PING is not proven dead. That is precisely why the application's own test, a DICOM echo, is the more meaningful check at step five.

## The rest of the toolbox
Traceroute lists the router hops toward a destination and shows where replies stop, which is how a fault between buildings or sites is located before anyone blames a modality; between a modality and an archive that share one VLAN there may be nothing to show. The ARP table on the device lists the hardware addresses it has recently seen on its own network, which is how a duplicate address is confirmed. A cable tester proves continuity, wiring, shorts, split pairs, and length, often with the distance to the fault. A tone generator and probe finds the jack. The switch port itself, read by the network team, shows link speed, duplex, error counters, and the VLAN assigned, and those four facts settle a surprising number of arguments.

## The four classic misconfigurations
A good cable in a jack whose port sits on the wrong VLAN behaves exactly like a dead network, and it is the most common fault in a newly installed room. A firewall rule permitting the archive's address but not the port the modality uses gives a device that pings perfectly and cannot send a single image. A wrong subnet mask produces the pattern nobody can describe: some destinations reachable, others not. And a wireless detector that drops out mid-exam is coverage, roaming, or its battery, which you prove by working beside an access point before anybody reconfigures a controller.

## Handing over with evidence
Past your device, the fault belongs to the network team, and what you give them decides how long it takes. Give the mask, the gateway, the name servers, and the device's own address; the link state at both ends; what pings and what does not, by address and by name; the exact text of the application error; the time the fault started; and what changed. Then ask two specific questions: which VLAN is that port in, and what rules exist between these two addresses. Record the ticket number in the equipment record so the next technician inherits the thread rather than starting again.

## What to memorize
- Order: link, configuration, reachability by address, reachability by name, application.
- 169.254 means no DHCP; works by address but not by name means name resolution.
- Echo traffic is often blocked, so a silent PING does not prove a dead device.
- Wrong VLAN, a missing port rule, and a wrong mask are the classic misconfigurations; hand over measurements, not suspicion.`,

u10l11: `## Four complaints
Nearly all of the imaging informatics work that reaches a service technician arrives as one of four sentences: it will not connect, it says it sent but nothing arrived, the worklist is empty, or the study is on the wrong patient. Each has its own first test, and three of them start in the same place.

## The first test is always the echo
A DICOM echo proves, in one step, that two nodes can open an association: the AE titles are right, the address is right, the port is right, and the network path exists. A failed echo means stop looking at the application. A successful echo means the network and the identities are fine and the fault is in what the nodes are trying to do, which is a completely different search. No other single test in imaging informatics saves as much time.

## The PACS fault table
\`\`\`
Complaint                      Likely cause                      First check
Association rejected            AE title typed wrongly, case       both sides, character
                                included                           by character
Association rejected            wrong port or host                 port 104 or 11112, address
Echo passes, store fails        SOP class mismatch                 both conformance statements
Echo passes, store fails        archive disk, license, or rights    archive log and its alerts
Sent, nothing arrived           sent to the wrong destination       the destination entry used
Local queue growing, retries     link speed, congestion, archive
                                down                               link, then archive status
Study split or incomplete        association interrupted mid send   cable, wireless, timeouts
Local disk filling               storage commitment failing          commitment configuration
Archive has it, reader cannot    routing, prefetch, or the index     routing rules, then database
Worklist empty on one modality   its query keys, modality code,
                                or date range                      that node's worklist setup
Worklist empty everywhere        RIS, broker, or name resolution     broker queue and its log
Wrong patient on a study         hand typing, accession mismatch,
                                duplicate or merged record          the order and the header
Slow sends everywhere            bandwidth, a backup job, a link
                                at the wrong speed                 switch port counters
\`\`\`

## Reading both logs together
The modality's log records what it attempted and what it was told. The archive's log records what it received and why it refused. Each alone produces an argument between two vendors; together they usually produce an answer in a paragraph. Line them up by timestamp, which is also why clocks across the department must agree.

## Empty worklists, in order of likelihood
Prove the scope first: one modality or all of them. One modality points at its own configuration, and the usual culprits are a query asking for a modality code the orders do not carry, a date range or time zone that excludes today, a changed AE title at the worklist source, and a station name the source does not recognize. All modalities at once points upstream to the scheduling system, the interface engine, or name resolution, and the broker's queue depth and error log will say which. Remember what an empty worklist costs: technologists type patients by hand, and every hand-typed study becomes reconciliation work.

## Wrong patient, and slow sends
A study attached to the wrong patient is an identifier fault, not a transport fault, and the correction is made consistently across the archive, the record system, and the report by people with the privileges and the audit trail for it. Do not attempt it at the console. Slow sends are a different family: bandwidth shared with a backup job, a link that negotiated at the wrong speed because of a damaged pair, or a compression choice. Compression is worth knowing numerically: lossless compression, which reconstructs the original exactly, is generally accepted up to about 3:1 for diagnostic images, while heavier lossy compression of roughly 10:1 or more supports remote viewing but is not acceptable for computer-aided detection or for archiving.

## What to memorize
- Echo first. Echo fails means titles, host, port, or path; echo passes means look at the service.
- Store failing after a good echo is SOP class, disk, license, or permissions.
- One empty worklist is that node's query; all of them is the scheduling system, the broker, or name resolution.
- Wrong patient is an identifier correction for informatics; lossless to about 3:1 is accepted, heavy lossy compression is not for archiving.`,

u10l12: `## The last device in the chain
Everything the department does arrives at a display. A generator calibrated to a few percent, a detector with a fresh gain map, and an archive that delivered the study intact can all be undone by a monitor that is too dim, too bright, or no longer following its curve. Diagnostic displays are therefore treated as measuring instruments: they are calibrated, measured, recorded, and retired.

## Two classes of display
A diagnostic display is a calibrated grayscale device in a controlled room, used to make the report: high luminance, measured uniformity, limited ambient light, and a calibration history. A clinical display is an ordinary monitor in a ward, clinic, or office, used to look at a study that has already been reported. Mammography is the strictest case of all. The distinction matters in service because the right answer to "can you put this on the monitor in my office so I can read it" is that the display is not qualified for that use, and the reading moves to a station that is.

## The curve, and why it exists
The grayscale standard display function is the curve in the imaging standard that maps stored pixel values to displayed brightness so that equal steps in stored value produce equal steps in perceived brightness. Calibration is the act of making a display follow that curve, and it is done with a luminance meter, not by eye. The point of the standard is consistency: a study looks the same on every calibrated station in the enterprise, so a radiologist's judgment does not depend on which room they sat in.

## The numbers
\`\`\`
Quantity                            Figure to know
Maximum luminance, diagnostic        above 171 cd/m2, and consistent with the
                                     manufacturer's stated figure
Nonuniformity on one display         under about 30 percent between its brightest
                                     and darkest measured regions
Geometric distortion                 about 2 percent for a primary diagnostic class
                                     display, about 5 percent for a secondary class
Luminance meter                      range about 0.05 to 1000 cd/m2, better than
                                     5 percent accuracy, traceable to the national
                                     measurement standard
Illuminance meter                    better than 5 percent response, including at
                                     an angle of about 50 degrees
Reading room ambient light           about 1 footcandle, which is about 10.8 lux
Film illuminator, where still in use  at least 1500 cd/m2, varying no more than
                                     plus or minus 10 percent across the surface
Test pattern viewing distance        about 30 cm for the low-contrast patterns
\`\`\`
Ambient light belongs in that table because reflected room light adds to every dark pixel. The test is simple: a low-contrast pattern should be equally visible with the room lights as it is in darkness, and if the lights change what can be seen, the lights are too bright. That is why reading rooms are dim and why a daily visual check of a standard test pattern, with its light and dark patches, is a job a technologist can be taught in five minutes.

## Display faults, in service order
Dim overall is the backlight or an aged panel, and it is settled with a meter rather than an opinion. Uneven brightness is uniformity, which calibration corrects to a point and then cannot. Dead pixels are a panel defect counted against the manufacturer's specification. Lines, flicker, color casts, and intermittent dropouts are the cable, the connector, or the graphics path first, every time, so swap the cable and try another output before condemning the panel. Two matched displays that no longer match each other are a calibration or an aging difference, and a display that cannot be brought back inside tolerance comes out of diagnostic use with the reading moved to a qualified station.

## Workstation problems that are not displays
Slow to display and slow to retrieve are different faults with different owners: slow display is local, in memory, the graphics path, or the application, while slow retrieval is the network or the archive. Then there are the faults that are not technical at all, and they are common: a corrupted user profile, permissions that exclude a folder or a study type, a session left open by the previous reader, a password change nobody propagated to a service account, or a roaming profile that did not load. Recognizing those saves you from dismantling a workstation that is working exactly as built, and the fix belongs to the application or identity team.

## What to memorize
- Diagnostic displays are calibrated to the grayscale standard display function and measured with a luminance meter.
- Maximum luminance above 171 cd/m2, nonuniformity under about 30 percent, distortion about 2 percent for a primary class display.
- Reading room ambient light about 1 footcandle, which is about 10.8 lux; film illuminators at least 1500 cd/m2 within plus or minus 10 percent.
- Dim is the backlight, uneven is uniformity, lines and flicker are the cable or graphics path; out of tolerance means out of diagnostic use.`

});
