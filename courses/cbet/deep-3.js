// CBET Academy deeper explanations, units 7 to 9. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u7l1: `## Why method beats knowledge
A technician who knows every circuit but starts by opening the case will lose to one who asks three questions and swaps a cable. Problem-solving questions on the exam reward the second person. This walkthrough shows the method on one call from start to finish.

## The call
"The monitor in room 12 keeps alarming and the ECG is garbage. It's been doing it all night. Can you replace it?"

## Step 1: Gather
\`\`\`
who         the night nurse; the day nurse has not seen it yet
what        ECG noisy, frequent alarms (which alarms? "lead off and some arrhythmia ones")
when        started around 2 a.m.; fine on the previous patient
settings    adult profile; monitoring bandwidth; lead II
connected   5-lead cable, the unit's standard electrodes, an SCD on the legs, a bed with a warming blanket
history     CMMS shows no prior noise complaints on this monitor; PM done last month
\`\`\`
Three things already stand out: it started at a time, on a new patient, with new accessories in the room.

## Step 2: Verify
Look at the screen. Fuzzy 60 Hz on all leads, worse when the SCD cycles. The nurse is right: the trace is unusable. Now it is a real complaint and not a rumor.

## Step 3: Simplest causes
\`\`\`
electrodes    applied at 2 a.m. from a pack that had been open for days   -> dry
skin          hairy chest, no prep                                        -> high impedance
cable         flex test at each end: no change                           -> probably fine
environment   SCD plugged into the same outlet strip as a phone charger  -> a noise source nearby
settings      correct profile and bandwidth
\`\`\`
Change electrodes with proper prep. The trace cleans up considerably but noise still spikes when the SCD inflates.

## Step 4: Isolate
Unplug the SCD for one cycle: noise gone. Plug the SCD into a different outlet on the other wall: noise gone. Plug it back into the original outlet strip: noise returns. The strip, or the outlet feeding it, is the problem. A quick check with a receptacle tester shows an open ground on that outlet.

## Step 5: Correct and verify
Move the SCD to a good outlet. Tag the bad outlet and report it to facilities (an open ground is also a safety issue). Confirm a clean trace for several SCD cycles. Verify the monitor with a simulator briefly since it was accused: rate and amplitude correct.

## Step 6: Document
Work order: complaint, findings (dry electrodes, open ground on outlet feeding SCD, monitor verified OK), actions, facilities ticket number, time. Tell the nurse: "Electrodes were dried out and the outlet the leg pump was on had a bad ground. Monitor is fine. Facilities is fixing the outlet."

## What the walkthrough teaches
- The requested action (replace the monitor) was wrong. Replacing it would have "fixed" it for exactly as long as the new electrodes lasted, then failed again.
- Two problems coexisted. Fixing one and stopping would have left a hazard.
- The environment was a cause. The outlet was not on anyone's list.

## Device failure versus use error, with examples
\`\`\`
"Pump delivered double the dose"           log shows the concentration entered as 1 mg/mL for a 0.5 mg/mL bag   use error, plus a library gap
"Defibrillator would not shock"            log shows sync mode selected during VF, so no R wave to sync on       use error, training
"Ventilator alarmed all night"             high-pressure limit set 5 cm H2O above normal peak                   use error, configuration
"Monitor shows no SpO2"                    sensor cable broken at the strain relief                              device failure
"NIBP reads 40 high on every patient"      transducer calibration drifted                                        device failure
\`\`\`
Use error is a finding, not a verdict on the person. It leads to training, configuration, and reports to the manufacturer about confusing designs.

## What to memorize
- Gather, verify, simplest causes, isolate, correct and verify, document.
- Ask what changed. Consider the environment. Suspect two causes when one fix half-works.
- Use error is real; its remedy is education and configuration.`,

u7l2: `## Following the electrons from the wall
When a device is dead or misbehaving under load, the fastest path is to follow power from the outlet inward and stop at the first place it is missing. This walkthrough shows that path on a transport monitor, then covers batteries and modules in depth.

## The power chain, drawn
\`\`\`
[outlet] -> [cord] -> [inlet + fuse] -> [switch] -> [power supply] -> rails (3.3 V, 5 V, 12 V) -> boards
                                                       |
                                              [charger] -> [battery] -> [transfer circuit] -> rails (on battery)
\`\`\`
Everything to the left of the supply is cheap, common, and outside the case. Check it first.

## A dead transport monitor
\`\`\`
1  outlet     plug a lamp into it: lights                              outlet OK
2  cord       inspect: the plug's ground pin bent; wiggle the plug: the AC indicator flickers   cord suspect
3  swap cord  known-good cord: AC indicator steady, monitor boots      cord failed at the plug
4  verify     run 10 minutes on AC, check charging indicator, run 5 minutes on battery
5  document   cord replaced; the old one cut and discarded so it cannot come back
\`\`\`
Had step 3 failed, the next stops would be the inlet fuse (measure it, do not guess), then the supply's output rails at the test points with the cover off and the device unplugged between measurements.

## Fuses
A fuse protects the wiring from a fault downstream. Replace with the exact rating and type (fast or slow blow, voltage rating). A fuse that blows immediately on replacement means a short: a failed supply, a shorted motor, a pinched wire. Replacing it a second time with a larger one starts a fire.

## Supplies under load
A supply can deliver the right voltage at idle and sag when a heater, motor, or charger draws current. Symptoms: the device resets when the NIBP pump runs, the printer prints, or the screen goes bright. Test by measuring the rail while the load activates; a scope shows ripple that a meter averages away. Aging electrolytic capacitors are the classic cause: bulging tops, brown residue, a device that "needs to warm up."

## Batteries in depth
\`\`\`
Chemistry            Traits                                              Care
Sealed lead-acid     heavy, cheap, tolerant of float charging            keep charged; deep discharge kills; replace by age (2 to 3 years typical)
NiCd                 rugged, memory effect from partial cycles           periodic full discharge on some chargers; cadmium disposal rules
NiMH                 more capacity than NiCd, no strong memory           moderate self-discharge
Lithium-ion          light, dense, no memory                             protection circuit required; heat, swelling, puncture are hazards;
                                                                         store partly charged; replace by cycle count or age
\`\`\`
Testing: charge fully, then run under a realistic load until the low-battery alarm. Compare to the specification (a defibrillator: number of shocks and monitoring minutes; a pump: hours at a set rate). A battery below about 80 percent of rated runtime is due for replacement; life-support devices replace by date regardless. Check contacts for corrosion, and the charger's output before condemning a battery that "won't charge."

## Modules and the swap test
\`\`\`
symptom: SpO2 module shows "module fault" in bed 4
swap the module into bed 5's monitor:  fault follows   -> module
swap a good module into bed 4:         fault stays     -> bed 4's monitor slot, connector, or software
inspect the slot: a bent pin                            -> repair the host connector
\`\`\`
Always inspect connectors before condemning either side; debris and bent pins mimic module failure.

## Fluid ingress procedure
1. Power off, unplug, remove the battery. 2. Open and inspect; photograph. 3. Rinse deposits with the manufacturer-approved method, dry thoroughly (days, or a low-heat cabinet). 4. Inspect for corrosion under magnification; corroded connectors are replaced. 5. Power up on the bench with a current-limited supply if possible. 6. Full verification and safety test. Many devices are written off; a decision the repair-or-replace lesson covers.

## What to memorize
- Outlet, cord, fuse, switch, supply, rails; battery path in parallel.
- A repeat blown fuse is a short. Resets under load are a sagging supply, often aged capacitors.
- Runtime test under load to the alarm; replace by date for life support. Swap to isolate modules; inspect pins.`,

u7l3: `## The accessory is guilty until proven innocent
Ask any experienced technician what fails most and the answer is cables, probes, and connectors. They flex thousands of times, get pulled from sockets by the cord, are soaked in disinfectant, and are dropped. The exam scenarios usually have the accessory as the cause.

## The signal chain, and where breaks happen
\`\`\`
[electrode or sensor] -> [lead wire] -> [trunk cable] -> [connector] -> [input circuit] -> [module] -> [display]
        gel dries         breaks at the       breaks at both       pins bend,        rarely           rarely        backlight,
        adhesive fails    snap and at the     strain reliefs;      corrode,                                         cables
                          plug                shield cracks        debris
\`\`\`
Breaks happen at strain reliefs because that is where the cable bends most. The copper fatigues inside an intact jacket, so a visual check can miss it.

## Isolation by substitution, illustrated
\`\`\`
complaint: ECG lead-off alarms on lead II when the patient moves
step 1  new electrodes with prep                      alarms continue when the LL wire is flexed
step 2  swap the lead-wire set                        alarms stop; flexing the old set's LL wire near the snap: continuity opens
result  lead-wire set replaced; the old one discarded
\`\`\`
\`\`\`
complaint: no SpO2 on a transport monitor
step 1  sensor on your own finger: no reading          patient not the cause
step 2  known-good sensor: reads                       original sensor bad
step 3  (had step 2 failed) SpO2 simulator to the module through the cable: no reading; direct: reads   cable
\`\`\`
The simulator replaces the patient, so the patient's variables disappear from the problem. That is the point of test equipment in troubleshooting.

## Reading the noise
\`\`\`
thick 60 Hz on all leads          electrodes, shield, ground, a nearby source
60 Hz on one lead                 that wire or electrode
sharp random spikes               loose connection somewhere; tap test
pattern matching a device cycle   that device (SCD, bed motor, pump)
noise only in one room            that room's outlets or a source behind the wall
noise only when the ESU is on     expected; filters and placement reduce it
\`\`\`
EMI investigation is correlation: turn the suspected source off and on while watching; move the patient cable away from power cords; check the outlet ground; try a different outlet.

## Connectors
- **Bent pins**: often from forcing a plug in rotated. Straighten once with care, or replace; a re-bent pin will break.
- **Recessed pins**: pushed back into the housing; the connector fails intermittently. Replace.
- **Corrosion**: green or white deposits from fluid; clean with the approved contact cleaner; replace if pitted.
- **Worn latches**: the plug backs out when the cable is tugged; replace the connector or the cable.
- **Keyed connectors**: some accessories look identical but are keyed for different device families; forcing the wrong one damages both.

## Probes and transducers
\`\`\`
SpO2 clip     spring weakens, windows scratch, LED fails                 poor pleth, "sensor off," failed readings
temp probe    tip cracks and fluid enters; wrong series                   open-probe error; steady wrong reading
IBP           dome not seated, air not flushed, wrong cable adapter       damped, offset, or no waveform
NIBP hose     cracks at the ends; internal kinks                          leaks: slow inflation and failed readings; leak test
gas lines     water, kinks, occlusion                                     sampling alarms; a slow capnogram
ultrasound    crystals crack from drops                                   dropout bands; check with a phantom
\`\`\`

## Why not splice
A spliced patient cable changes impedance and shielding, can create a leakage path, has no strain relief at the splice, and cannot be cleaned. Standards and manufacturers expect intact assemblies. Replace, and stock the common cables.

## Prevention
Coil cables loosely, unplug by the plug, hang probes, use the cleaning agents the manufacturer approves, and check accessories at every PM. Cable failure rates fall dramatically on units that are taught to handle them.

## What to memorize
- Breaks live at strain reliefs and look fine from outside; flex-test with a meter.
- Substitute known-good parts from the patient end inward; a simulator removes the patient from the equation.
- Correlate EMI with a source; check the outlet ground. Replace, never splice.`,

u7l4: `## Triage for machines
An emergency department sorts patients by how quickly they will be harmed; a biomed shop sorts work orders the same way. The exam presents several requests at once and asks the order, or presents a costly repair and asks whether to make it.

## The priority scale, applied
Four calls arrive at 08:00:
\`\`\`
A  ICU: "one of our two ventilators failed its pre-use check; the other is on a patient"      life support, no backup
B  Med-surg: "a pump involved in an overdose last night is in the dirty utility room"          patient incident
C  Clinic: "the only ultrasound has a dark band on the image"                                  blocks care, no backup
D  Rehab: "a TENS unit's display is cracked but works"                                         cosmetic
\`\`\`
Order: B first as an action (sequester the pump and its set, notify risk management; five minutes, then it waits for the investigation), A immediately after (a loaner ventilator from the pool, then repair), C next (assess; a loaner transducer or a vendor call), D whenever. The incident goes first not because it is a fast repair but because evidence evaporates when a pump is cleaned and returned to the pool.

## The loaner reflex
Every minute a critical device is down is clinical risk. The fastest resolution is almost always a swap from a spare pool. Rules that make pools work: spares are PM-current and configured to the unit's standard; loaners are logged in the CMMS with the failed unit's number; the failed unit is tagged before it leaves the floor; the loaner comes back when the repair returns.

## Repair versus replace: a scoring view
\`\`\`
Factor              Favors repair                         Favors replace
cost                repair well under 50% of new          repair near or above 50%; cumulative repairs approaching value
age                 within expected life                  beyond it (typical lives: pumps 7 to 10 yr, monitors 8 to 10, ventilators 10)
support             parts and software available          end of life, no parts, no security patches
reliability         first failure                         repeat failures, the same fault again
safety              current design                        lacks modern safeguards, open recalls, incompatible with current sets
fleet               same as standard                      an orphan model with its own accessories and training
\`\`\`
A worked case: a 9-year-old infusion pump needs a new mechanism at 60 percent of the replacement cost, the manufacturer has announced end of support next year, and the model lacks a drug library. Every column favors replacement, and the hospital's standardization on one pump model seals it. The technician writes the recommendation with the numbers; the equipment committee decides.

## Escalation map
\`\`\`
Situation                                     Escalate to
device under warranty or service contract     the vendor (self-repair may void coverage; document the call)
beyond training, tools, or manuals            vendor field service, or a senior technician
patient injury or near miss                   risk management before touching the device; preserve evidence
recurring design or software fault            manufacturer complaint; FDA reporting when it meets the criteria
outlet, gas, HVAC, water                      facilities
network, server, account, cybersecurity       IT and IT security
cleaning damage patterns                      infection prevention (agent compatibility)
\`\`\`

## Recalls and alerts
A recall is prioritized by its classification: a Class I recall (serious harm likely) is acted on immediately across every affected unit in the inventory; Class II and III are scheduled. The record shows each device's serial number matched, the action taken, the date, and the technician.

## Communicating the plan
A one-line status to the department, updated when it changes, prevents workarounds. Workarounds are where new hazards come from: a pump borrowed from another unit with a different library, a ventilator kept in service after a failed check "because we needed it."

## What to memorize
- Incident, life support without backup, blocking care, has backup, cosmetic. Sequester incident devices first.
- Swap a spare; log the loaner. Replace when cost, age, support, reliability, safety, or fleet standardization says so.
- Escalate by category: vendor, risk management, manufacturer or FDA, facilities, IT. Class I recalls act now.`,

u7l5: `## The other half of the repair
A device fixed without the user knowing what changed will be back. A user blamed for a use error will stop calling. Communication and training are on the outline because they determine whether the same problem returns next week.

## Taking a complaint: a script
\`\`\`
"Tell me what happened."                     open question; let them describe it
"What did the screen say, exactly?"          error text and alarm names matter
"When did it start, and what changed?"       new set, new patient, new staff, moved rooms, software update
"Is the patient okay, and is it still in use?"   decides whether you walk or run
"Can you show me?"                           reproduces the fault and reveals the workflow
"Thanks for calling. Here's what I'll do."   the plan and the time
\`\`\`
Write the answers on the work order. Never open with "Did you check...?" It sounds like blame and the answer is always yes.

## Explaining a finding: three versions
A pump under-delivered because an administration set was used past its rated hours and the tubing had fatigued.
\`\`\`
Too technical    "The peristaltic segment lost compliance beyond the validated duty cycle, reducing stroke volume."
Blaming          "You left the set on for three days; it says 24 hours right on the package."
Right            "The tubing wears out after a day in the pump and delivers less. This one was in for three days.
                  Sets need changing every 24 hours; I'll ask the educator to add it to the shift checklist."
\`\`\`
The right version states the cause, the action, and the system fix, in three sentences, without a verdict on the person.

## Training that works
\`\`\`
short         five to ten minutes at the device, not an hour in a classroom
hands-on      the learner does the task while you watch, then does it again
specific      the exact tasks that generated the calls: load a set, zero a line, change electrodes, silence versus acknowledge
timed         at go-live for new equipment, after a software change, when a pattern of use errors appears, for new staff
documented    who, what, when, by whom; sign-in sheets or the learning system; surveyors ask
partnered     nurse educators, the vendor's clinical specialists, super-users on each unit
\`\`\`
Job aids help: a laminated card on the pump pole, a label at the socket showing which cable goes where, a color-coded hose.

## Reporting culture
Near misses are free lessons. A unit that reports "the pump almost ran free when I opened the door" lets you find a failing door clamp across the fleet before it hurts someone. Make reporting easy, thank the reporter, and close the loop by telling them what was found. Feed patterns into purchasing: a device that generates use errors on every unit is a design problem.

## Working with other departments, in scenarios
\`\`\`
"The outlet sparks when we plug in the bed"          facilities, and tag the outlet now
"The monitor cannot reach the central station"       IT for the switch port and VLAN; you supply the measurements
"The disinfectant is cracking the pump housings"     infection prevention; agent compatibility list from the manufacturer
"A patient was burned by a warmer"                   risk management; sequester; preserve; do not repair yet
"The vendor wants remote access to the PACS"          IT security; the approved remote-access process
"We need a spare defibrillator on this floor"         management and purchasing; data on failures and response time
\`\`\`

## Professionalism at the bedside
Introduce yourself to the patient and family before touching the equipment. Explain in one sentence what you are doing. Do not discuss the patient's condition; do not discuss another patient's device. Keep tools off the bed. Clean the device and your hands before and after. Leave the area as you found it, with the device labeled and the nurse informed.

## What to memorize
- Open questions, exact error text, what changed, patient status, a demonstration. No blame.
- Findings in plain sentences: cause, action, system fix. Training short, hands-on, specific, documented.
- Near misses are reported and closed. Facilities, IT, infection prevention, risk management each own their piece.`,

u8l1: `## One bed or all of them
The monitoring system is a chain from electrode to electronic record, and every link fails differently. The single fastest way to shorten the chain is to ask whether one bed is affected or every bed. This deep dive walks through the diagnostic tree and then the classic faults parameter by parameter.

## The tree
\`\`\`
                            Problem reported
                                  |
               +------------------+------------------+
          one bed                                  many beds
               |                                      |
     +---------+---------+                  +---------+---------+
 one parameter       all parameters      one area                 all beds
     |                    |                  |                       |
 accessory,          that monitor:       switch, antenna zone,   central station, server,
 sensor, module,     power, network      power circuit           network change, license,
 user settings       drop, IP, profile                            time sync, config push
\`\`\`
Bring a cable to the first branch, a laptop to the last.

## ECG, in depth
\`\`\`
Symptom                          First                 Then                    Then
noisy trace all leads            electrodes and prep   trunk cable and shield  60 Hz source; outlet ground
noisy trace one lead             that electrode        that lead wire          the module's input
lead-off one lead                electrode             lead wire               module input
lead-off all leads               trunk cable           module                  monitor
rate double the true rate        tall T waves; gain    lead choice             pacer spikes counted; pacer mode
rate half the true rate          low amplitude         lead choice             electrode placement
"asystole" while patient talks   cable disconnected    lead selection          only then the monitor
\`\`\`
Check what the monitor says about lead-off: most identify the lead. Recognize that some monitors switch to another lead automatically and quietly.

## NIBP
\`\`\`
fails to read              cuff size and fit, movement, arrhythmia, hose leak, patient mode
reads high consistently    cuff too small, arm below heart, calibration drift
reads low consistently     cuff too large, arm above heart
repeat inflation           leak; the monitor could not detect enough oscillations
inflates and stalls        overpressure cutoff, hose blockage, pump
\`\`\`
Verify with the NIBP simulator and a reference gauge on a static pressure; test for leaks.

## SpO2
\`\`\`
searching, no value        site, perfusion, motion, light; try another site; then sensor, cable, module
value disagrees with lab   physics: CO, methemoglobin, dyes, pigment; the device may be correct
intermittent               sensor cable at the strain relief; a worn clip
\`\`\`

## Invasive pressure
\`\`\`
constant offset            zero and level
damped waveform            air, clot, kink, loose fitting (fast flush)
no waveform                stopcock direction, cable, transducer, module
\`\`\`

## Capnography
\`\`\`
flat                       patient and airway first
sampling line alarm        water, kink, occlusion; replace line and trap
baseline above zero        rebreathing; absorber, valves, fresh gas flow
delayed                    long sampling line, low sample pump flow
\`\`\`

## Telemetry
\`\`\`
one patient drops          battery, leads, out of coverage, transmitter
one area drops             antenna, amplifier, coax, the receiver channel for that zone
all drop                   receiver, central station, network; interference in the band
false alarms one patient   electrodes and prep; daily change
\`\`\`

## The network side
\`\`\`
one bed missing at central     link light -> cable and wall jack -> switch port and VLAN -> the monitor's IP settings -> duplicate address
all beds missing               switch or server; ask IT what changed; check server services, time sync, license
data in the wrong chart        admission and discharge workflow at the central station; not the network
old data or gaps in the record the interface engine queue; time synchronization between systems
\`\`\`

## A complete scenario
"Two ICU rooms at the end of the hall have no waveforms at the central station since this morning; bedside monitors are fine." Two beds, one area, all parameters. Not accessories. Both rooms are served by the same closet switch; a look at the switch shows those two ports dark. IT finds the ports were disabled during an overnight change. Re-enabled, verified at the central station, documented with the IT ticket number, and the change process reviewed so monitoring ports are protected.

## What to memorize
- One bed one parameter: accessory. One bed all: that monitor. Area: switch or antenna. All: central station, server, change.
- ECG electrodes first; NIBP cuff fit; SpO2 site and perfusion; IBP zero and level; capnography patient first.
- Wrong chart is workflow; missing bed is link, cable, port, VLAN, IP.`,

u8l2: `## Wrong numbers and wrong doses
Diagnostic devices fail by measuring wrong; infusion devices fail by delivering wrong. The exam wants symptom-to-cause pairs and, for pumps, the discipline of preserving evidence.

## Diagnostic devices: symptom table
\`\`\`
Device        Symptom                                     Likely cause                              Confirm with
ultrasound    vertical dark bands                         damaged elements in the transducer        phantom; swap transducer
ultrasound    whole image noisy or missing                system board, cable, EMI                  swap transducer; move rooms
spirometer    low volumes with the syringe                dirty or damaged sensor, leak, BTPS       clean, replace, recalibrate
audiometer    fails at one frequency                      that earphone transducer                  swap earphones; sound level meter
scale         drifts, no return to zero                   contact with the platform, load cell      test weights
treadmill     belt slips, speed wrong                     belt tension, drive belt, controller      tachometer, inclinometer
12-lead ECG   one lead bad                                lead wire                                 swap; simulator
otoscope      dim                                         lamp, battery, contacts, fiber bundle     light meter
\`\`\`
The recurring rule: an artifact tied to one channel, band, or frequency is the transducer for that channel; a global fault is the system.

## Infusion pumps: alarms that are usually telling the truth
\`\`\`
Downstream occlusion    kinked line, closed clamp, positional catheter, clotted catheter; at low rates the alarm takes longer
Upstream occlusion      empty bag, clamp closed above the pump, unvented spike, collapsed bag
Air-in-line             empty bag, unprimed set, air trapped in a cassette
Door / set              set not seated, worn latch, wrong set
Low battery             expected on transport; check the runtime at PM
\`\`\`
When an alarm repeats on one pump with no visible cause, verify the threshold on the analyzer: an occlusion pressure far below specification, or an air sensor that trips with no air, is a pump fault.

## The silent failures
\`\`\`
Free-flow               set removed without clamping; incompatible set; worn door clamp; anti-free-flow valve missing
Under-delivery          fatigued tubing (set past its rated hours), mechanism wear, wrong set brand, misdetected syringe size
Over-delivery           mechanism fault; wrong set; siphoning on a syringe pump mounted high
Wrong dose              programming error: rate, concentration, weight, or units; drug library outdated or absent
No delivery             start-up delay at low rate; unseated syringe; clamp closed with no upstream alarm
\`\`\`
None of these announce themselves. PM exists to catch them: flow accuracy at two rates, occlusion pressure and time, air detection, free-flow, battery, and library version, every time.

## Investigating an incident: the sequence
\`\`\`
1  do not clear, do not reprogram, do not power off if the log could be lost
2  sequester the pump with the set, bag, and syringe as found; label and lock
3  photograph the display and the setup
4  download the event log (every keystroke, alarm, and delivery with times)
5  note the drug, concentration, programmed rate, volume infused, library version, software version
6  verify flow accuracy on the analyzer afterward, not before
7  report through risk management; manufacturer and FDA reporting when criteria are met
\`\`\`
The log usually resolves the question of device versus use: a pump that recorded 10 mg/mL entered for a 1 mg/mL bag has told you the story.

## Dose arithmetic checks
When reviewing a programmed infusion, recompute it:
\`\`\`
ordered 2 mg/min; bag 400 mg in 250 mL -> 1.6 mg/mL -> 2 / 1.6 = 1.25 mL/min = 75 mL/hr
ordered 5 mcg/kg/min, 60 kg; bag 400 mg in 250 mL -> 300 mcg/min = 18 mg/hr -> 18 / 1.6 = 11.25 mL/hr
\`\`\`
A rate ten times either answer is a decimal or unit error, the pattern behind most serious pump events.

## Enteral pumps and injectors
Enteral pump alarms usually mean viscous formula or a clogged set; a formula found in an IV line means an adapter defeated the connector standard, which is a reportable event. Injector faults: pressure limit reached (catheter too small or occluded), air detected because purging was skipped, heater faults, and scanner interface cables. Never bypass an injector's air detection.

## What to memorize
- Channel-specific artifacts are the transducer; global faults are the system.
- Occlusion and air alarms are usually true; free-flow and delivery errors are silent and tested at PM.
- Incident: do not clear; sequester as found; photograph; download the log; verify afterward; report.`,

u8l3: `## When the device can hurt
Temperature, electrosurgery, defibrillation, and ventilation devices deliver energy to the patient. Their failures are injuries, so the response has a fixed shape: patient safe, device out of service and tagged, evidence preserved, then analyzers.

## Temperature devices
\`\`\`
Symptom                                    Cause                                   Action
incubator air temp climbing past set        controller or heater; cutoff must trip  out of service; verify cutoff after repair
warmer heating with probe off               probe-off alarm failed                  out of service; serious
hypothermia unit not reaching set           low water, clogged filter, weak pump    check flow and leaks first
blood warmer outlet above 42 C              cutoff failure                          out of service immediately
burn under forced-air blanket               hosing (no blanket) or fault            training; check outlet temp and cutoff
\`\`\`
Any device that heats an infant gets the over-temperature and probe-off alarms tested at every PM by simulating the fault, not by reading a menu.

## Electrosurgery
\`\`\`
ESU will not activate, pad alarm            REM detected poor contact or disconnect    check pad, cable, connector: the safety feature is working
burn under the pad                          contact area lost, pad placement, size     verify REM on the analyzer; review placement practice
burn at a remote site                       alternate path (ECG electrode, metal)      positioning and electrode review; check the ESU's isolation
low output                                  pencil, cable, then generator              analyzer at several settings and loads
ECG noise during activation                 expected                                   monitor's ESU filter; electrode placement far from the site
\`\`\`

## Sterilizers, tourniquets, tables, lights, microscopes
\`\`\`
biological indicator positive               steam quality, air removal, wet or overloaded packs, gasket, timer   quarantine loads; repeat test after repair
tourniquet pressure inaccurate              gauge calibration, leak                                             calibrate; leak test
table drifts under load                     hydraulic leak, valve                                               out of service
light or microscope drifts                  arm balance, brakes                                                 adjust and test loaded
\`\`\`

## Defibrillators and pacers
\`\`\`
delivered energy low                        aging capacitor, relay contacts, connectors   analyzer; out of service if out of tolerance
charge time long                            battery, capacitor                            replace battery first; retest
sync fires on the T wave                    synchronization circuit                        out of service; dangerous
no ECG via pads                             pad cable, connector                           swap cable
AED self-test failure                       pads expired, battery                          read the indicator; replace
pacer spikes, no capture                    output too low, pad contact                    raise output; verify pacing current on the analyzer
\`\`\`
After any defibrillator repair: energy at low, mid, and max; charge time; sync; pacing; ECG; battery; safety test. A defibrillator that fails at 200 J is not found until a code unless the PM finds it first.

## IABP
\`\`\`
gas leak alarm, blood in tubing             balloon rupture                                stop; clinical emergency; catheter removal
no trigger                                  ECG cable, pressure line, or trigger source    switch trigger; check connections
poor augmentation                           timing, catheter position, balloon volume      timing review; clinical
helium low                                  tank                                           replace; check regulator
\`\`\`

## Ventilators and anesthesia
\`\`\`
high pressure                               obstruction; secretions; biting; water in circuit; bronchospasm   clinical clears; check circuit
low pressure / low volume                   disconnect; leak; cuff; humidifier crack                          patient first; then circuit
delivered volume wrong on analyzer          flow sensor calibration; exhalation valve leak; compliance set    calibrate; replace sensor
FiO2 wrong                                  blender; exhausted O2 sensor; supply pressure                     calibrate analyzer; replace sensor
apnea alarm on a breathing patient          trigger sensitivity; flow sensor                                  adjust; verify
leak test fails (anesthesia)                vaporizer seating, fill cap, gaskets, absorber seal, bellows      systematic leak search
inspired CO2 rising                         exhausted absorber, stuck valve, low fresh gas                    replace absorber; check valves
concentrator low O2                         sieve beds                                                        service
\`\`\`

## The return-to-service checklist for life support
\`\`\`
[ ] full performance verification with the correct analyzer against specification
[ ] every alarm exercised by creating the condition
[ ] electrical safety test
[ ] battery runtime
[ ] software, configuration, and accessories correct for the unit
[ ] documented; device labeled; user informed
\`\`\`

## What to memorize
- Infant heating devices: over-temp and probe-off failures are immediate removals, tested by simulation.
- ESU inhibit is REM working; burns are pad contact or alternate paths; test on the ESU analyzer.
- Defibrillator: energy, charge time, sync; failed sync is dangerous. High pressure obstruction; low pressure disconnect.
- Life-support return requires full verification, alarms, safety, battery, documentation.`,

u8l4: `## Machines that spin, cool, and heat
Laboratory devices are mechanically simple and unforgiving. A centrifuge failure is a rotor coming apart at thousands of RPM; a refrigerator failure is a blood bank lost overnight. The exam wants the ordered causes for each symptom and the environmental factors that fool technicians.

## Centrifuges: symptoms and causes
\`\`\`
vibration, walking               unbalanced load -> rotor damage or wrong buckets -> bearings or mounts
will not start                   lid interlock or latch sensor -> timer -> belt or brushes -> fuse
speed low or unstable            brushes -> belt slip -> controller -> tachometer feedback
rising whine                     bearings
refrigerated model warm          condenser blocked -> fan -> compressor
tube broke inside                stop; spill procedure; decontaminate; inspect rotor and bowl for damage
\`\`\`
Rotor inspection is a safety task: cracks, corrosion, and worn coatings on high-speed rotors can end in failure. Rotors have a cycle life and are retired.

## Refrigerators and freezers
\`\`\`
excursion alarm                  door open -> gasket -> overloaded shelves blocking airflow -> defrost cycle -> fan -> compressor -> power
alarm never sounds in test       probe placement -> setpoints -> alarm's backup battery -> remote notification configuration
ultra-low warming                dirty filter and condenser -> door frost and seal -> cascade compressor (expensive)
temperature reads wrong          the display probe versus the reference thermometer; calibrate or replace the probe
\`\`\`
The log decides the contents: a documented excursion of known duration and magnitude lets the laboratory apply its rules; an unlogged one wastes the inventory.

## Incubators, baths, shakers
\`\`\`
incubator temperature off        reference thermometer -> sensor calibration -> door seal -> heater
incubator CO2 off                calibrated analyzer -> CO2 supply and regulator -> valve -> sensor
water bath overshoot             thermostat -> over-temperature cutoff -> low water exposing the heater
contamination                    cleaning schedule; water quality in humidity pans
shaker speed wrong               belt -> motor -> controller; check platform mounts
\`\`\`

## Analyzers
\`\`\`
QC out of range                  reagents (lot, expiry) -> calibration -> probe clogging -> temperature control -> tubing and pumps
results not reaching the LIS     middleware queue -> network -> interface configuration -> analyzer software
fluid leaks                      tubing, seals, pump heads: maintenance kits
random errors                    power quality (UPS), fluid ingress, dust in optics
\`\`\`
Vendors service most analyzer internals under contract; the biomed handles power, UPS, safety, network, water and drain, and the first triage that gets the right vendor on the phone with the right information.

## Microscopes, microtomes, cryostats
\`\`\`
dim or uneven light              lamp -> alignment -> condenser -> dirty optics
cannot focus                     stage, focus mechanism, loose objective
cryostat sections shred          temperature (wrong for the tissue) -> dull blade -> anti-roll plate
cryostat frosting                door seal, defrost cycle, humidity in the room
\`\`\`

## Environment: the hidden device
\`\`\`
Symptom                                              Environmental cause
several unrelated devices reset at the same time     power sags from elevators, imaging, or HVAC; a shared circuit
devices in one closet overheat                       room temperature above the rated range; blocked vents
boards corroded in a new device                      condensation after moving from cold to warm; humidity
scale in sterilizers, baths, analyzers               water hardness; a softener or reverse osmosis needed
balance readings wander                              vibration from a centrifuge or foot traffic
ventilator and suction faults across a unit          pipeline pressure or vacuum; a facilities problem
wireless devices drop in one area                    an access point or interference source
\`\`\`
When many things fail in one place, stop repairing devices and look at the place.

## A scenario
"The blood bank refrigerator alarmed at 9 C at 3 a.m.; it is back at 4 C now." The chart shows a slow rise over two hours starting at 1 a.m. and a fall after 3:30 a.m. The night shift restocked at 1 a.m. and packed the shelves to the top; the alarm woke the supervisor, who redistributed the load. Cause: blocked airflow. Action: a loading diagram on the door, a check of the gasket and fan, alarm relay verified, contents assessed against the log. No compressor needed.

## What to memorize
- Centrifuge: balance, rotor, bearings; interlocks; rotors have a life.
- Refrigerator: door, gasket, airflow, defrost, fan, compressor; test the alarm; keep the log.
- Analyzer QC: reagents, calibration, probes, temperature. Many failures in one place is the environment.`,

u8l5: `## Maintenance is evidence
A preventive maintenance record is the proof that a device was safe on a date, tested by a named person with calibrated equipment against a known specification. Surveyors, attorneys, and the next technician all read it. This deep dive builds a PM from the pieces and then covers the program around it.

## Anatomy of a PM procedure
\`\`\`
Header      device type, model, control number, interval, procedure revision, test equipment required
1  Visual    case, cord, plug, strain reliefs, wheels, latches, labels, accessories, cleanliness, ingress signs
2  Safety    ground resistance; chassis leakage NC and SFC; patient lead leakage per applied part type
3  Function  power up; self-test; display; controls; printer; battery indicator
4  Perform   parameter by parameter against specification with the named analyzer
5  Alarms    each alarm created and observed, including audible volume
6  Battery   runtime under load to the low-battery alarm; replacement by date
7  Consume   filters, gaskets, tubing kits, lamps, batteries, O2 sensors: replaced by schedule
8  Software  version; configuration; drug library; time and date
9  Clean     per manufacturer; calibrate as required
10 Record    results with numbers, pass or fail, technician, date, next due; label the device
\`\`\`
A PM that records "OK" for a defibrillator's energy is worthless; one that records "set 200, delivered 194 J; set 360, delivered 351 J" is evidence.

## Performance verification cheat table
\`\`\`
Device                  Tool                              Key measurements
monitor                 patient simulator, NIBP, SpO2     rate, amplitude, leads, NIBP accuracy and leak, SpO2 at 3 points, temp, alarms
defibrillator           defib analyzer                     energy at 3 settings, charge time, sync delay, pacing rate and current, ECG
infusion pump           infusion analyzer                  flow at 2 rates, occlusion pressure and time, air-in-line, free-flow, battery
ventilator              gas flow analyzer, test lung, O2   VT, rate, PEEP, pressure, FiO2 at 3 points, all alarms, humidifier
anesthesia machine      analyzers plus leak tests          supply pressures, hypoxic guard, vaporizer output, leak, scavenging, absorber
ESU                     ESU analyzer                       power at settings and loads, HF leakage, REM inhibit
sterilizer              references, indicators             temperature, pressure, timer, BI results
centrifuge              tachometer                          speed, timer, interlock, vibration
refrigerator            reference thermometer               temperature, alarm setpoints and function, log
scale                   test weights                        accuracy across range, zero return
audiometer              sound level meter and coupler      output at each frequency
spirometer              3 L syringe                         volume at several flows
\`\`\`
Tolerances are the manufacturer's. A reading outside tolerance fails the PM and the device is repaired, retested, and only then returned.

## Setting intervals: the risk-based approach
\`\`\`
score = function (life support high, therapeutic, diagnostic, misc)
      + physical risk (death, injury, inconvenience)
      + maintenance requirement (extensive, average, minimal)
      + history (incidents, failures found at PM)
high score    quarterly or semiannual
medium        annual
low           inspection only, or no scheduled PM
\`\`\`
Constraints: life-support and imaging devices, and devices whose manufacturers mandate a schedule, stay on the manufacturer's schedule. Any alternative program must be documented, approved, and reviewed against its own data (failures found at PM, incidents). Accreditors and CMS survey this.

## Compliance numbers
- PM completion percentage by month; life-support and high-risk completion must be 100 percent, others near it.
- Devices "not found" chased down and resolved; a lost device is a compliance and safety gap.
- Recall and alert closure tracked with dates.
- Test equipment calibration certificates current.

## Incoming inspection
\`\`\`
[ ] shipping damage and completeness; accessories; manuals
[ ] entered in inventory with a control number and risk class
[ ] electrical safety test; full performance verification
[ ] configured to hospital standards (alarm defaults, profiles, network, drug library)
[ ] software version recorded; cybersecurity documentation (MDS2) filed
[ ] users trained; go-live scheduled
[ ] labeled and released
\`\`\`
The same applies to loaners, demo units, and physician-owned or patient-owned equipment brought into the building.

## Documentation habits that hold up
Numbers, not adjectives. The test equipment's control number on the record. Parts by part number. The time in and out. The user informed, by name. A device's history should let a stranger reconstruct its life.

## What to memorize
- PM: visual, safety, function, performance with the named analyzer, alarms, battery, consumables, software, clean, record.
- Manufacturer tolerances; a failed PM means repair before return.
- Risk-based intervals with life support and imaging on the manufacturer's schedule; 100 percent life-support completion.
- Incoming inspection before first use for every device, including loaners.`,

u9l1: `## The network, drawn small
Every networked device does the same four things: it has a hardware address, it is given a logical address, it decides whether the destination is nearby, and it either talks directly or hands the packet to a router. Once you can draw that, most exam questions about networking are answerable.

## A monitoring network
\`\`\`
   ROOM 1 monitor         ROOM 2 monitor          central station
   IP 10.20.5.11          IP 10.20.5.12           IP 10.20.5.100
   mask 255.255.255.0     mask 255.255.255.0      mask 255.255.255.0
   MAC 00:1A:...:11       MAC 00:1A:...:12        MAC 00:1A:...:C0
         |                      |                       |
         +----------------------+-----------------------+
                                |
                    [closet switch, VLAN 50 "monitoring"]
                                |
                    [core switch / router]  gateway for VLAN 50 = 10.20.5.1
                                |
              [integration engine 10.30.1.20, VLAN 60]   [EMR servers]
\`\`\`
Monitors and the central station share a subnet, so they talk directly through the switch. The central station reaching the integration engine on another subnet goes through the router at 10.20.5.1.

## Same subnet or not: the mask
Apply the mask: everything covered by 255 must match.
\`\`\`
10.20.5.11 and 10.20.5.100 with /24:   10.20.5 = 10.20.5     same subnet -> direct
10.20.5.11 and 10.30.1.20 with /24:    10.20.5 vs 10.30.1    different    -> via gateway
10.20.5.11 and 10.20.6.7  with /24:    10.20.5 vs 10.20.6    different    -> via gateway
10.20.5.11 and 10.20.6.7  with /16:    10.20 = 10.20         same
\`\`\`
A monitor typed with mask 255.255.0.0 when the network is /24 may work by accident until it needs a gateway it thinks it does not need. A monitor typed with the wrong gateway reaches its central station (same subnet) but never the EMR.

## Address rules for devices
\`\`\`
static      monitors, central stations, servers, imaging, printers: the address never changes
DHCP        workstations, phones, most pumps and mobile devices; often a DHCP reservation so the same
            MAC always receives the same address (static in effect, managed centrally)
169.254.x.x APIPA: the device asked DHCP and no server answered; link or DHCP problem
duplicate   two devices with the same static address: both flap; a duplicate warning in the log
\`\`\`

## Layers in one table
\`\`\`
Layer          Unit          Address        Device          Example failure
physical       bits          none           cable, port     no link light
data link      frame         MAC            switch          wrong VLAN; bad port
network        packet        IP             router          wrong gateway; wrong mask
transport      segment       port number    firewall        blocked port; service down
application    data          names, URLs    servers         wrong AE title; bad credentials
\`\`\`

## TCP and UDP
TCP sets up a connection, numbers every segment, acknowledges, and retransmits. HL7, DICOM, web pages, and remote desktop use it because a missing byte is unacceptable. UDP just sends: fast, no guarantees; used for streaming, discovery, some real-time waveforms, and DNS lookups.

## Cables, distances, and speeds
\`\`\`
Cat5e       1 Gb/s          100 m
Cat6        1 Gb/s (10 at short runs)   100 m
Cat6a       10 Gb/s         100 m
multimode fiber   hundreds of meters, building runs
single-mode fiber kilometers, campus links
PoE         power to APs, phones, cameras over the same cable; a switch's PoE budget can run out
\`\`\`
Beyond 100 m, copper fails at speed before it fails completely, which shows as errors and slow links.

## Switch, router, VLAN, firewall
A switch learns which MAC is on which port and forwards frames only where needed. A VLAN partitions one switch into several logical networks; a port assigned to the wrong VLAN connects the monitor to the wrong world. A router moves packets between VLANs and subnets. A firewall sits between zones and permits specific addresses and ports; medical device VLANs are firewalled from the general network so a workstation infection cannot reach a ventilator.

## What to memorize
- Apply the mask to decide same-subnet; same talks directly, different via the gateway.
- Static or reserved addresses for monitors and servers; 169.254 means no DHCP; duplicates flap.
- MAC at layer 2 (switch), IP at layer 3 (router), ports at layer 4 (firewall). TCP reliable, UDP fast.
- 100 m copper; fiber for distance and EMI; PoE powers access points.`,

u9l2: `## Radios, controllers, and rented computers
Wireless carries pumps and telemetry; controllers make hundreds of access points act as one; virtualization and cloud move servers out of the closet. Each has a definition question and a symptom question on the exam.

## Wi-Fi in a hospital
\`\`\`
2.4 GHz     longer range, penetrates walls better, only 3 non-overlapping channels, crowded (microwaves, cordless phones,
            older devices, neighbors)
5 GHz       more channels, faster, less interference, shorter range, more access points needed
6 GHz       newest band, most capacity, shortest range, newest devices only
\`\`\`
Older medical devices often support 2.4 GHz only; that band is planned for them, and IT is told which devices need it before a "2.4 GHz off" decision drops every pump.

## Security choices
\`\`\`
open / WEP            unacceptable for patient devices
WPA2-Personal         a shared passphrase; acceptable on a segregated device network, must be rotated when staff leave
WPA2/WPA3-Enterprise  each device authenticates with a certificate or credentials against a server; the enterprise standard
hidden SSID           not security; still a management choice
\`\`\`
Certificates expire. A fleet of pumps that stops connecting on the same day has an expired certificate or an authentication server change.

## Roaming and coverage
A moving device hands off between access points. Failures look like: the pump works in the room and drops in the hall; telemetry over Wi-Fi drops in the elevator lobby; a device reconnects only after a restart. Causes: coverage gaps (site survey), a device that clings to a weak access point (sticky client), roaming settings, or a controller change. Symptoms confined to an area mean an access point; symptoms everywhere mean the controller or authentication.

## The controller
\`\`\`
[controller] --manages--> [AP] [AP] [AP] ... [AP]
                pushes: SSIDs, security, channel and power plans, roaming, firmware
                collects: client counts, signal, interference, rogue APs
\`\`\`
One change touches every access point, which is why medical device teams ask for change notices and test windows. Cloud-managed controllers do the same from a vendor's servers.

## KVM switches and extenders
\`\`\`
KVM switch     one keyboard, video, mouse -> several computers (a data center rack, a control room)
KVM extender   keyboard, video, mouse at a console far from the computer, over Cat cable or IP
               (an OR console for a computer in an equipment room; imaging control rooms)
faults         no video: cable, resolution or refresh mismatch, the port; no keyboard: USB emulation setting;
               lag: IP extender bandwidth; wrong computer: the switch's port selection
\`\`\`

## Virtual servers
\`\`\`
   physical host (many CPUs, lots of RAM, shared storage)
   +-- hypervisor
       +-- VM: central station server (Windows)
       +-- VM: PACS database (Linux)
       +-- VM: CMMS application
   snapshots for backup and rollback; live migration to another host; high availability clusters
\`\`\`
Advantages: consolidation, fast provisioning, easy backups. Risks: one host failure hits every VM on it (clusters mitigate); shared storage and network become single points; each VM still needs patches, antivirus, and backups; the device vendor must support running its server virtualized, and some specify the hypervisor.

## Cloud
\`\`\`
SaaS   the vendor runs the application: hosted CMMS, remote device fleet monitoring, hosted PACS
PaaS   a platform to build on
IaaS   rented virtual machines and storage
\`\`\`
Requirements when patient data is involved: a business associate agreement with the provider, encryption in transit and at rest, access control and audit logs, data location and retention terms, and a plan for internet outages (a cloud-hosted central station is unreachable when the circuit is cut, so local monitoring must continue). Vendor updates arrive on the vendor's schedule; validation and training follow.

## Remote vendor access
Approved methods: a VPN account per vendor with named users, a vendor-access gateway that records sessions, enable-on-request rather than always on, and logs reviewed. Not approved: a modem left connected, a remote-desktop tool installed by the vendor, shared passwords in an email.

## What to memorize
- 2.4 GHz range and crowding; 5 GHz speed; plan 2.4 for older devices. WPA2 or WPA3, enterprise preferred; certificates expire.
- Area problems are an access point; everywhere is the controller or authentication.
- KVM shares controls; virtual machines share a host; cloud rents servers under a BAA with encryption and an outage plan.`,

u9l3: `## Proving where the network breaks
Network troubleshooting is the same six-step method with a fixed set of tools. The discipline is bottom-up: physical, then addressing, then reachability, then the application. This deep dive shows the tools on one outage.

## The outage
"Room 8's monitor disappeared from the central station an hour ago. The bedside is fine."

## Bottom-up
\`\`\`
1  link light         at the monitor's port: off.  At the wall jack with a laptop: on.   -> the monitor's cable or port
2  cable              swap the patch cable: link light on.                              -> cable was bad (kinked under the bed wheel)
3  config             monitor: IP 10.20.5.18, mask 255.255.255.0, gateway 10.20.5.1     -> correct per the address list
4  reachability       central station pings 10.20.5.18: replies                          -> IP path good
5  service            central station shows room 8 again after the monitor re-registers   -> done
6  document           cable replaced; routed away from the wheel; work order closed
\`\`\`
Had step 1 shown link at both ends, step 3 would have mattered more, and step 4 would have split the problem between the network and the application.

## ping, interpreted
\`\`\`
Reply from 10.20.5.18: time<1ms          reachable; local
Reply ... time=40ms, some lost            reachable with congestion, a bad cable, or wireless trouble
Request timed out                         no answer: off, unplugged, wrong subnet, or a firewall blocks echo
Destination host unreachable              your machine has no route (gateway or mask wrong on your side)
\`\`\`
The ladder: ping 127.0.0.1 (my stack works), ping my own address (my interface works), ping the gateway (I reach the router), ping the far server (the path works), then the application's own test.

## tracert, interpreted
\`\`\`
1   10.20.5.1      <1 ms     my gateway
2   10.30.1.1      1 ms      the next router
3   * * *          timeout   stops here: the break, or a router that ignores traces
4   10.30.1.20     2 ms      (if it continues, the earlier timeout was just a silent hop)
\`\`\`
Between devices on the same subnet there are no hops; tracert answers questions about paths through routers, not about a switch port.

## The address commands
\`\`\`
ipconfig /all     address, mask, gateway, DNS, MAC, DHCP lease
ipconfig /release and /renew      drop and request a new DHCP lease
nslookup name     which address does this name resolve to, and from which DNS server
arp -a            the MAC for each recent IP; two IPs with one MAC, or a changing MAC for one IP, mean a duplicate
netstat -an       open connections and listening ports; is the service actually listening
\`\`\`
A monitor at 169.254.x.x has no DHCP answer. A device that pings by address but not by name has a DNS problem.

## Cable testing
\`\`\`
continuity        each pin to the same pin at the far end
wiring map        no crossed or split pairs (a split pair passes continuity and fails at speed)
shorts and opens  the fault distance with a TDR-capable tester
length            under 100 m
tone and probe    find which jack in the closet is this room's cable
\`\`\`
A cable that passes continuity but fails at gigabit has a split pair or is too long; a certifier proves the run to category.

## Wireless tools
A survey app shows signal strength and channel use; a weak or absent signal in one area is coverage; strong signal with failures is authentication, roaming, or interference. The controller's client view shows a device's connection history.

## Packet capture
When IT and a vendor disagree about whose side failed, a capture on a mirrored switch port shows the actual conversation: the monitor sent, the server did not answer, or the server rejected. Biomeds rarely run it but should know to ask.

## Reporting to IT
\`\`\`
device        room 8 monitor, control number, MAC 00:1A:...:18, IP 10.20.5.18
symptom       not visible at central since 10:05; bedside fine
tested        link on with new cable; config verified; pings gateway; central station pings it; still not registered
ask           was anything changed on switch closet 2B port 14 or VLAN 50 at 10:00?
\`\`\`
Measurements shorten a two-day ticket to a ten-minute one.

## What to memorize
- Link light, cable, configuration, ping ladder, tracert, application test.
- Timed out means no answer; unreachable means no route on your side. 169.254 means no DHCP.
- arp for duplicates; nslookup for names; netstat for listening ports. A cable tester checks map and length.`,

u9l4: `## How a number becomes a chart entry
A vital sign on a monitor is a number on a screen. In the chart it is a coded observation with a patient, a time, a unit, and a source. HL7 and DICOM are the languages that make the trip possible, and middleware is the interpreter.

## The systems, wired together
\`\`\`
[monitors] -> [central station] --HL7 ORU--> [integration engine] --HL7--> [EMR flowsheet]
[ADT in EMR] --HL7 ADT--> [integration engine] --ADT--> [central station, pumps, lab, PACS]  (who is in which bed)
[analyzers] --> [LIS] --HL7 ORU--> [engine] --> [EMR results]
[CT scanner] --DICOM store--> [PACS];  [RIS] --DICOM worklist--> [CT];  [PACS] --HL7 ORU (report)--> [EMR]
[pump server] <--HL7--> [engine] <--> [pharmacy and EMR]  (orders to pumps, infusion data back)
\`\`\`

## An HL7 v2 message, annotated
\`\`\`
MSH|^~\\&|CENTRALSTN|ICU|EMR|HOSP|202609061205||ORU^R01|000123|P|2.5      header: sender, receiver, time, type ORU
PID|||MRN123456||DOE^JANE||19700101|F                                       patient: MRN, name, DOB, sex
PV1||I|ICU^08^A                                                             visit: inpatient, ICU room 8 bed A
OBR|1|||VITALS                                                              the observation set
OBX|1|NM|HR||88|/min|||||F                                                  heart rate 88 per minute
OBX|2|NM|SPO2||96|%|||||F                                                   SpO2 96 percent
OBX|3|NM|NIBP_SYS||118|mmHg|||||F                                           systolic 118
\`\`\`
Fields are separated by the vertical bar, components by the caret. The engine reads the segments, maps HR to the EMR's code for heart rate, converts units if needed, finds the patient by MRN or by bed from the ADT feed, and posts. A rejected message returns an acknowledgment with an error, which the engine logs.

## Message types to know
\`\`\`
ADT   A01 admit, A02 transfer, A03 discharge, A08 update: keeps every system's census correct
ORM   an order (a lab test, an infusion)
ORU   a result or observation (lab values, vital signs, a radiology report)
ACK   acknowledgment, accept or error
FHIR  the newer standard: resources (Patient, Observation) over web APIs; used by apps and newer interfaces
\`\`\`

## DICOM, annotated
\`\`\`
CT scanner:      AE title CT_ROOM2,   IP 10.40.2.15,  port 104
PACS:            AE title PACS_MAIN,  IP 10.40.1.10,  port 104
each side lists the other; a mismatch in any of the three fields fails the association
services:  C-ECHO verification (the DICOM ping);  C-STORE send images;  C-FIND / C-MOVE query and retrieve;
           modality worklist (the scanner pulls scheduled patients from the RIS);  storage commitment (PACS confirms it has the study)
\`\`\`
A DICOM image file carries tags: patient name and ID, study and series identifiers, modality, date, institution, and pixel data. Worklist populates the tags from the schedule, which is why typing demographics at the scanner is discouraged: it creates mismatched studies that must be merged by PACS administrators.

## Patient association, the recurring failure
\`\`\`
data in the wrong chart         the previous patient was never discharged from the monitor; the bed's association is stale
data missing                    the patient was never admitted to the monitor; MRN mismatch; ADT feed down
data delayed                    engine queue backed up; interface down and buffering; time skew
duplicate patients              two records created by manual entry; a merge in the EMR
\`\`\`
Barcode-driven admission (scan the wristband at the device) and automated ADT to the device system reduce these. Training on discharge from the device is as important as admission.

## Troubleshooting integration
\`\`\`
1  scope        one patient, one device, one unit, or everything
2  engine       queue depth; error log; the acknowledgment for a sample message
3  network      ping, then the application test: DICOM echo, an HL7 test message
4  config       AE titles, ports, IPs, interface IDs, after any change on either end
5  security     certificates for TLS interfaces; service account passwords that expired
6  vendors      both ends and the integration team on one ticket
\`\`\`

## Time
An observation at 12:05 on the monitor recorded at 12:11 by the EMR because the central station clock was six minutes off is a documentation error and, in a code review, a legal one. Time synchronization (NTP) across devices is part of integration.

## What to memorize
- ADT census; ORU results with OBX values; ACK errors. FHIR is the web-style newer standard.
- DICOM: AE title, IP, port on both sides; echo tests; store sends; worklist prevents typing.
- Wrong chart is stale association; missing is no admission or ADT; delayed is the queue. Sync the clocks.`,

u9l5: `## Every device is a computer someone can attack
Ransomware has diverted ambulances and canceled surgeries. A lost laptop with an unencrypted export has triggered million-dollar penalties. The biomed is part of the defense because the devices are in the biomed's inventory. This deep dive explains the concepts and turns them into habits.

## What counts as PHI
\`\`\`
obvious      names, MRNs, dates of birth, addresses, images with names
less obvious a monitor's trend memory; a pump's infusion history; an ultrasound's stored studies; a defibrillator's
             event record; a central station's full-disclosure archive; a service laptop's downloaded logs;
             a photograph of a screen taken for a work order
\`\`\`
Rules that follow: sanitize storage before a device leaves for repair, trade-in, loan return, or disposal, and record it; keep PHI out of work orders and emails unless the system is approved; vendors who may see PHI sign a business associate agreement; the minimum necessary rule applies to everyone.

## The CIA triangle
\`\`\`
Confidentiality   only authorized people see data        encryption, access control, screen locks, sanitization
Integrity         data is not altered                    checksums, controlled configuration, change control, logs
Availability      systems work when needed               backups, redundancy, UPS, patching, incident response
\`\`\`
Ransomware attacks availability; a stolen laptop attacks confidentiality; a tampered drug library attacks integrity.

## Access control, layered
\`\`\`
identification    a unique account per person; no shared logins
authentication    password or passphrase; MFA (something you know plus something you have) for remote and admin access
authorization     role-based: biomed configures, nurse charts, vendor sees only its device
accountability    logs record who did what; reviewed
hygiene           default and vendor passwords changed at install; accounts removed at departure; screen locks; auto-logoff
\`\`\`

## Encryption
\`\`\`
in transit   TLS/HTTPS for web and interfaces; VPN for remote access; WPA2/WPA3 for Wi-Fi; secure DICOM and HL7 over TLS
at rest      full-disk encryption on laptops and servers; encrypted storage on devices that support it; encrypted backups
keys         lose the key, lose the data: key management is part of the design
\`\`\`
A lost encrypted laptop is a lost laptop. A lost unencrypted one with PHI is a breach with notification duties.

## Threats, and the door each uses
\`\`\`
phishing            email or text with a link or attachment; steals credentials or drops malware; the most common door
social engineering  the "vendor" calling for remote access; the "IT" call for a password
ransomware          encrypts systems; spreads across a flat network; demands payment
worms and trojans   spread on their own or hide in legitimate software
USB media           a service laptop or thumb drive carrying infection into an isolated device
unpatched systems   old embedded operating systems on devices; missing updates; unsupported software
default passwords   on devices, cameras, network gear
physical            an unattended logged-in workstation; a device walked out the door
\`\`\`

## Defenses and the biomed's share
\`\`\`
inventory            OS, software versions, IP, MDS2 security disclosure, SBOM software bill of materials, vendor security contacts
segmentation         devices on dedicated VLANs; firewall rules allow only needed traffic; no internet from device consoles
patching             manufacturer-validated updates only, applied on a schedule; unsupported devices isolated further or replaced
endpoint protection  antivirus or allow-listing where the manufacturer supports it
hardening            unused ports, services, and accounts disabled; default passwords changed
vendor access        named accounts, MFA, session logging, enable on request
media control        no unknown USB; scanned service laptops
backups              scheduled, off-network copies, restore tests
change control       every configuration change recorded and tested
incident response    isolate, preserve, notify IT security; do not wipe evidence; a plan practiced in advance
alerts               cybersecurity advisories and recalls tracked like any recall
\`\`\`

## Two scenarios
"A vendor engineer wants to plug a personal laptop into the anesthesia machine's service port to update it." Refuse the personal laptop; use a department-managed, scanned service laptop or the vendor's approved method; record the software version before and after.

"A central station shows a ransom message." Disconnect it from the network (pull the cable, do not power off unless told), switch the unit to bedside monitoring and paper documentation, call IT security and risk management, preserve the machine, and start the downtime procedure. Recovery comes from tested backups on a clean rebuild.

## What to memorize
- PHI includes device memory; sanitize before devices leave; BAA for vendors; minimum necessary.
- Unique accounts, least privilege, MFA, encryption in transit and at rest.
- Phishing and USB media are the doors; segmentation, validated patching, controlled vendor access, tested backups, and an incident plan are the defenses.`,

u9l6: `## The computer under the medical software
Strip the vendor's application from a central station or an imaging console and you find an ordinary computer: a processor, memory, storage, a network card, an operating system, drivers, and peripherals. The exam expects the vocabulary and the standard faults.

## The parts and what they do
\`\`\`
CPU             executes instructions; overheats when fans and heat sinks clog with dust
RAM             working memory; volatile, empty after power off; too little makes everything slow
storage         HDD (spinning platters, fragile, clicks when failing) or SSD (no moving parts, fast, reliable)
motherboard     connects everything; firmware (BIOS/UEFI) lives here with a CMOS battery for settings and the clock
power supply    converts mains to the rails; fans; fails with age
graphics        onboard or a card; drives displays at a resolution and refresh rate
NIC             the network interface, wired or wireless; has the MAC address
ports           USB, display connectors, audio, and on older devices RS-232 serial
\`\`\`

## Boot sequence and where it stops
\`\`\`
power  -> firmware self-test -> finds a boot device -> loads the operating system -> loads drivers and services -> starts the application
  |            |                       |                          |                          |                          |
no power   beep codes, no display   "no bootable device"     blue screen, loop         devices missing, slow       application errors, license
outlet,    RAM, graphics, board     drive failed, boot        corrupt files, failed     driver problems, updates    vendor logs, config,
cord,                               order, USB stuck          update, bad RAM or drive                              database, license server
supply
\`\`\`
Read the point where it stops and the message on the screen; each stage has its own suspects.

## Slow computer, in order
1. Storage nearly full or failing (check the log for disk errors; listen).
2. Not enough RAM for the workload (constant paging).
3. Malware or unwanted software.
4. Updates running in the background.
5. Overheating and throttling (dust).
6. Network problems that make a networked application wait.

## Operating system essentials
\`\`\`
accounts and permissions   who may install, change settings, or read which folders
services                   background programs; the application's service must be running
drivers                    the code that runs each device; roll back a driver after an update breaks a peripheral
event logs                 errors with times; the first thing to read after a crash
updates                    validated by the medical device vendor before they touch a device computer
file shares and printers   SMB shares, print spooler
registry (Windows)         configuration database; changed only by the application or with guidance
\`\`\`

## Storage, RAID, and backups
\`\`\`
RAID 1     mirror: two drives hold the same data; one may fail
RAID 5     striping with parity across three or more; one may fail
RAID 10    mirrored stripes; fast and tolerant
degraded   one drive has failed; the array still works; replace now, before the second failure
backups    full, incremental, differential; off the machine and off site; tested by restoring
images     a saved copy of a configured system; a rebuild takes an hour instead of a day
disposal   drives wiped with a documented method or physically destroyed; PHI
\`\`\`

## Peripherals: the common calls
\`\`\`
printer         paper, toner, jam, driver, spooler stuck, changed network address
barcode scanner mode reprogrammed by a configuration barcode; adds or drops characters; cable
touchscreen     calibration drift; dead zones are the panel; a cracked screen registers ghost touches
USB device      port, cable, driver, power; try another port
serial RS-232   baud rate, data bits, parity, stop bits, flow control, and cable type (straight or null modem)
                must match on both ends; a mismatch shows garbage or nothing
display         no signal: cable and input selection; wrong resolution; flicker: cable or backlight
\`\`\`

## A scenario
"The lab's chemistry analyzer console will not start. The screen says 'no bootable device.'" Firmware runs (so the board and RAM are alive) but finds no operating system. Check for a USB drive left in a port (boot order), then the drive: listen, look in the firmware for the drive, run the drive diagnostic. The drive has failed. Replace it, restore the vendor's image and configuration backup, verify the interface to the LIS, document, and tell the lab. Then add the console to the RAID or backup plan if it was not on one.

## What to memorize
- RAM volatile, storage persistent; SSD no moving parts; CMOS battery for the clock and settings.
- Where the boot stops names the suspects: no power, beeps, no bootable device, blue screen, driver, application.
- Slow: disk, RAM, malware, updates, heat. Validated updates only on device computers.
- RAID degraded is urgent; backups tested by restore; serial settings and cable type must match.`

});
