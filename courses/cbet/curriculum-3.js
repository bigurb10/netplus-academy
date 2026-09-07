// CBET Academy curriculum, units 7 to 9. Original teaching content for the AAMI/ACI CBET exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u7", n: 7, title: "Troubleshooting Method", domain: 5,
  blurb: "How to approach any broken device: a repeatable method, device failure versus use error, power and module faults, signal and cable faults, prioritizing repairs, and communicating with staff.",
  assumes: "You know the device categories from Units 4 to 6 and basic electronics from Unit 2.",
  lessons: [
    {
      id: "u7l1", title: "The Troubleshooting Method and Device Versus Use Error", domain: 5, obj: "Problem solving", minutes: 11,
      body: `Thirty percent of the exam is problem solving, and most problem-solving questions are really about method: what you check first, what a symptom implies, and how you prove you fixed it. Learn the method as a sequence and apply it to every scenario question.

## The six steps
1. **Gather information.** Who reported it, what exactly happened, when, which patient mode, what was connected, any alarms or error codes. Read the service history in the CMMS; a repeat complaint is a different problem than a first one.
2. **Verify the complaint.** Reproduce it. If it will not reproduce, ask the reporter to demonstrate. "No fault found" is a legitimate result, but it is also the most common way a real intermittent gets sent back to the floor.
3. **Identify the simplest causes first.** Power, connections, settings, accessories, user procedure. Half of all service calls end here.
4. **Isolate the fault.** Swap known-good accessories, substitute modules, split the system in half (does the signal reach the cable? the module? the display?), use a simulator to replace the patient and an analyzer to replace guesswork.
5. **Correct and verify.** Repair or replace. Then test the whole device against specifications, not just the part you touched: a full performance verification and an electrical safety test after any repair that opened the case.
6. **Document and return.** What was wrong, what was done, parts used, test results, time. Tell the user what happened and what changed.

## Device failure versus use error
Many "broken" devices work perfectly. The outline names this explicitly: distinguish a device failure from a **use error** (the device was operated in a way that produced a bad result). Signs of use error:
- The problem disappears when you operate the device yourself.
- The wrong mode, patient category, alarm limit, or accessory was selected.
- The complaint is "it never works" from one unit and never from others.
- The device's log shows the sequence of user actions leading to the event.
Use error is not blame. It often means a confusing interface, a mismatched accessory, or missing training, and the fix is education, configuration, or a report to the manufacturer, not a part.

## Reading symptoms
- **Intermittent** faults point to connections, cables, cold solder joints, thermal problems, and software. Flex, tap, warm, cool.
- **Sudden total** failure points to power: fuse, supply, cord, battery, switch.
- **Gradual drift** points to aging components, sensors, calibration.
- **Appears only with a specific accessory** points to the accessory.
- **Appears only in one room** points to the environment: outlet, EMI, network port, gas outlet.

## Safety in troubleshooting
Remove a suspect device from patient use before you investigate; tag it. Preserve evidence if a patient injury is involved (do not clear logs, do not repair before the investigation permits it). Use lockout when working on powered equipment. Never bypass an interlock to "see if it works."

> Exam tip: when a question asks what to do first, the answer is almost always verify the complaint, check the simplest causes (power, connections, settings, accessories), or check the patient before the equipment. When it asks what to do last, the answer is verify the whole device and document.`,
      hook: "Gather, verify, simplest causes, isolate, correct and verify, document. Intermittent means connections; sudden means power; drift means aging. Use error is a real diagnosis, and its fix is education or configuration."
    },
    {
      id: "u7l2", title: "Power Supply, Battery, and Module Faults", domain: 5, obj: "Problem solving", minutes: 11,
      body: `A device that is completely dead, resets, or behaves strangely under load usually has a power problem. The exam wants the order of checks and what each symptom means.

## The power chain
Outlet, cord, inlet and fuse, power switch, power supply (transformer or switching supply), voltage rails (often 3.3, 5, 12 V), the boards, and in parallel the battery charger, battery, and the transfer circuit between mains and battery.

## Dead device: the order
1. Is the outlet live? Test with a known-good device or a meter; check the breaker; check whether the outlet is on a circuit that was switched off.
2. Is the cord good? Look for damage, a loose plug, a broken ground pin; measure continuity; check that the cord retainer is engaged.
3. Is the inlet fuse blown? A blown fuse is a symptom, not a cause: replace it once with the correct rating; if it blows again, the supply or a load is shorted.
4. Does the device run on battery? If yes, the mains side is the problem; if no, the battery or the common circuitry.
5. Are the supply rails present? Measure at the test points; ripple on a scope; a supply that sags under load reveals itself when the device resets when a motor or heater starts.

## Batteries
- **Lead-acid** (sealed): heavy, tolerant, used in defibrillators, transport equipment, carts; kept charged; capacity falls with age and deep discharge.
- **Nickel-cadmium and nickel-metal hydride**: older portable devices; NiCd shows the memory effect when repeatedly partially discharged.
- **Lithium-ion**: light, high energy, in most modern portables; needs protection circuits; swelling, heat, or damage means remove and dispose properly.
Symptoms: short runtime means aged cells; will not charge means charger, contacts, or cell failure; sudden shutdown under load means high internal resistance. Test by running to the low-battery alarm under load and comparing to specification. Batteries are replaced on a schedule regardless of apparent condition on life-support devices.

## Module faults
Modular monitors, pumps, and ventilators are built from replaceable modules. Isolation is by substitution: swap the suspect module with a known-good one; if the fault moves with the module, the module is bad; if it stays, the host or the connection is bad. Check the connector pins between module and host: bent pins and debris cause intermittent module errors.

## Board-level repair
Most departments replace boards rather than components. When you do go to components: look, smell, and touch for heat first. Bulging or leaking capacitors, discolored resistors, cracked solder around heavy or hot parts, corrosion from fluid ingress. A thermal camera or freeze spray finds thermal intermittents. Follow ESD precautions: wrist strap, mat, antistatic bags.

## Fluid ingress
The number one killer of portable devices. A pump that fell in a bath of saline, a monitor that had coffee spilled into it. Power off, remove the battery, dry and inspect before applying power; corrosion on the board continues after the liquid dries.

> Exam tip: a fuse that blows again after replacement means a downstream short, not a bad fuse. A device that resets when a heater or motor starts has a supply that sags under load. Swap modules to isolate. Replace batteries on schedule for life-support equipment.`,
      hook: "Outlet, cord, fuse, switch, supply, rails, battery. A repeat blown fuse is a short. Reset under load is a weak supply. Swap to isolate a module. Lithium swelling means remove; replace life-support batteries on schedule."
    },
    {
      id: "u7l3", title: "Signal, Cable, Connector, and Sensor Faults", domain: 5, obj: "Problem solving", minutes: 10,
      body: `More medical device failures are in the accessories than in the device: patient cables, lead wires, probes, hoses, and connectors take all the flexing, pulling, cleaning, and dropping. The exam expects you to suspect them first and to know the failure modes.

## The signal chain
Patient, electrode or sensor, lead wire, trunk cable, connector, input circuit, processing, display. A fault anywhere shows as bad data at the end. Isolate by replacing from the patient end inward with known-good parts, or by driving the input with a simulator: if the simulator through the cable is bad and the simulator direct to the module is good, the cable is at fault.

## Cable failures
- **Strain relief breaks**: wires break inside the jacket where the cable meets the connector or the probe; the outside looks fine. Symptom: intermittent when flexed, lead-off, a parameter that drops when the cable moves.
- **Connector pin damage**: bent, pushed-back, or corroded pins; debris in the socket; worn latches that let the plug back out.
- **Cleaning damage**: jacket cracking and sticky degradation from harsh disinfectants; fluid wicking into connectors.
- **Shield damage**: 60 Hz noise on ECG from a cable with a broken shield.
Test: a continuity check while flexing each section, a cable tester for multi-pin cables, and simple visual inspection. Replace cables rather than repair them; a spliced patient cable is a leakage and reliability risk.

## Sensors and probes
- SpO2: cracked emitter or detector windows, broken finger clip springs, cable breaks at the sensor; symptoms are no reading, a poor pleth, or the need to reposition constantly.
- Temperature: wrong series, cracked probe tip, cable break; symptoms are a fixed wrong reading or an open-probe error.
- Pressure transducers: not zeroed, air in the dome, a wrong cable; symptoms are offset or damped readings.
- NIBP hoses: cracks and leaks; symptom is failed or slow measurements. Leak test the hose and cuff.
- Gas sampling lines: kinks, water, occlusion; symptom is a sampling line alarm or a delayed capnogram.

## Electromagnetic interference
- **60 Hz hum**: grounding, shield, electrode contact, a nearby motor or light ballast.
- **Radio frequency**: an ESU in the next room, a two-way radio, a cell phone against the device, an unshielded switching supply; symptoms are random resets, noisy signals, or alarms during activation of the source.
- **Magnetic**: MRI suites; anything ferrous is a hazard, and unshielded electronics fail near the magnet.
Approach: correlate the symptom with a source in time and distance; move or shield; check grounding; check cable routing (separate signal and power cables).

## Displays and outputs
No display but the device otherwise runs: backlight or inverter, display cable, video board. A dim or flickering display: backlight aging. Missing segments or lines: the panel itself. Printer problems are almost always paper, the print head, or the paper sensor.

> Exam tip: intermittent when the cable is flexed means a break at the strain relief. A simulator that reads correctly through a different cable proves the original cable is bad. Replace patient cables; do not splice them.`,
      hook: "Suspect accessories first: strain-relief breaks, bent pins, cleaning damage, broken shields. Isolate by substituting known-good parts or driving the input with a simulator. Correlate EMI with a source. Replace, do not splice."
    },
    {
      id: "u7l4", title: "Prioritizing Repairs and Deciding Repair, Replace, or Escalate", domain: 5, obj: "Problem solving", minutes: 9,
      body: `A shop always has more work than hours. The outline lists prioritization as a problem-solving skill, and the exam tests it with scenarios: several calls arrive at once, or a repair is technically possible but not sensible.

## Priority order
1. **Patient safety incidents**: any device involved in a patient injury, or one that could cause one now. Sequester the device, secure evidence, notify risk management.
2. **Life-support and critical care with no backup**: ventilators, defibrillators, anesthesia machines, dialysis, infusion pumps for critical drugs. A failed defibrillator on a unit with none in reserve is an emergency.
3. **Devices blocking care**: the only ultrasound in a clinic, the lab analyzer with no backup, the OR table for the next case.
4. **Devices with backups available**: swap in a spare, repair later.
5. **Non-critical, convenience, cosmetic.**
Within a level: patients waiting now over patients waiting later; the shorter fix first when it frees a critical resource; a repeat failure raised in priority because it hints at a systemic problem.

## Loaners and spares
The fastest repair is a swap. A pool of spare pumps, monitors, and modules keeps care going while the repair waits. Track loaners in the CMMS so they come back and so the failed unit does not vanish into a closet.

## Repair or replace
- **Cost**: a common rule of thumb flags a repair that costs more than half the replacement cost, or a device whose accumulated repair cost approaches its value.
- **Age and support**: past its expected life, no parts, end of manufacturer support, no software updates (a cybersecurity problem for networked devices).
- **Reliability**: frequent failures, repeated repairs of the same fault, a history of incidents.
- **Standardization**: replacing an orphan with the fleet standard reduces training, parts, and errors.
- **Safety**: recalls, alerts, obsolete design (no free-flow protection, no drug library).
The biomed provides the data; capital planning makes the call.

## When to escalate
- Under warranty or service contract: call the vendor; a self-repair may void coverage.
- Beyond your training or tools: complex imaging, lasers, dialysis water systems, anything requiring manufacturer software.
- Patient involvement: risk management before any repair.
- A design or software fault seen across the fleet: report to the manufacturer and, when it meets the criteria, to the FDA.
- Facility issues found while troubleshooting: outlets, gas pipelines, network, HVAC belong to facilities and IT.

## Communicating the decision
Tell the department what is happening and when. "Removed from service; loaner delivered; part ordered; expected back Thursday" prevents a dozen phone calls and a workaround that invents a new hazard.

> Exam tip: patient injury first, life support without backup second. A swap with a spare beats a fast repair. Repair cost above about half of replacement, no parts or support, or repeated failures point to replacement. Call the vendor when under contract or beyond your training.`,
      hook: "Priority: injury, life support without backup, blocking care, has backup, cosmetic. Swap a spare first. Replace when repair cost, age, support, or reliability say so. Escalate for warranty, training, patient involvement, or fleet-wide faults."
    },
    {
      id: "u7l5", title: "Communication, User Training, and Closing the Loop", domain: 5, obj: "Problem solving", minutes: 9,
      body: `The outline lists communication with staff and education of users under problem solving, because the same problems recur until people know something different. The exam asks how you handle the person, not just the device.

## Taking the call
Get the facts without judgment: what happened, when, what was the device doing, what did you expect, is the patient okay, is the device still in use. Ask for the exact wording of any message on the screen. Ask what changed recently (new set, new software, new staff). Write it down. Users are your first sensor, and a user who feels blamed stops calling.

## Explaining findings
- Lead with the outcome for the patient and the unit: safe or not, in service or not, when it comes back.
- Explain the cause in plain language and one sentence. "The cable had a break inside the plug; we replaced it" beats a lecture on strain relief.
- If it was a use error, say what to do differently, and treat it as a training and design gap: "The pump defaults to the last patient's weight unless you clear it. Here's how to clear it."
- Never diagnose the patient, never assign blame, never guess at a cause you have not verified.

## Training users
The best fix for a recurring complaint is a five-minute demonstration at the bedside. Good training is short, hands-on, and specific to the tasks that go wrong: how to change electrodes, how to zero a transducer, what the alarm colors mean, how to load a set. Coordinate with nurse educators and the manufacturer's clinical specialists; document who was trained, on what, and when. New equipment requires training before first use.

## Safety culture and reporting
Encourage reporting of near misses, not just injuries. Feed device problems into the hospital's incident system; feed patterns into equipment purchasing. Post alerts and recalls where users see them, and confirm the required action was done, not just announced.

## Working with other departments
- **Nursing and clinical staff**: users; the source of complaints and the audience for training.
- **IT**: network, servers, cybersecurity, EMR integration; a joint responsibility for networked devices.
- **Facilities**: power, medical gas, HVAC, water; report outlet and gas problems to them.
- **Infection prevention**: cleaning agents and reprocessing; approve disinfectants that will not damage devices.
- **Risk management and quality**: incidents, investigations, accreditation.
- **Purchasing and materials**: parts, accessories, capital.
- **Vendors**: contracts, field service, software, recalls.

## Professional conduct
Confidentiality about patients and about incidents under investigation. Honesty about what you know and do not know. Following the department's procedures for documentation even when the repair was trivial. A professional appearance and a calm manner in clinical areas; patients and families are watching.

> Exam tip: when a scenario involves a user, the answer includes listening without blame, verifying the complaint, explaining plainly, and training or configuration if it was a use error. Document training. Report near misses.`,
      hook: "Ask what happened without blame. Lead with patient and unit status. Explain cause in one plain sentence. Use error means training and a design note, not blame. Report near misses. Know which department owns what."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Troubleshooting by Device Category", domain: 5,
  blurb: "Applying the method to monitoring, diagnostic, infusion, therapeutic, perioperative, life-support, and laboratory devices, plus preventive maintenance, performance verification, and documentation.",
  assumes: "You know the troubleshooting method from Unit 7 and the device functions from Units 4 to 6.",
  lessons: [
    {
      id: "u8l1", title: "Monitoring Faults: Localized Versus System-Wide", domain: 5, obj: "Problem solving", minutes: 11,
      body: `Monitoring problems are the most frequent service calls and the outline lists them twice. The single most useful question is: is this one bed, or the whole unit?

## Localized versus system-wide
- **One bed, one parameter**: the accessory, sensor, module, or user setting for that parameter.
- **One bed, all parameters**: that monitor, its power, or its network connection.
- **Several beds in one area**: a switch, a telemetry antenna zone, a power circuit for that wing.
- **All beds**: the central station, the server, a network change, a time or license problem.
- **All beds, one parameter**: a configuration pushed from the central station, or a software update.
Ask before you walk. The answer decides whether you bring a cable or call IT.

## ECG problems
- **Noisy or fuzzy trace**: electrodes and skin prep first; then the lead wires and cable (flex test); then the environment (60 Hz source); then the monitor input.
- **Lead-off on one lead**: that electrode or wire.
- **Lead-off on all leads**: trunk cable or module.
- **Wrong rate**: pacer spikes counted as beats, tall T waves double-counted, low amplitude missing beats; adjust lead or gain; check the pacer setting.
- **Flat line, patient fine**: cable disconnected; monitor may show a different alarm than asystole for lead-off, so check which.

## NIBP problems
- **Fails to measure**: cuff size and fit, hose leaks, movement, arrhythmia, patient mode.
- **Reads consistently high or low**: cuff size, arm position relative to the heart, calibration; verify with an NIBP simulator and a reference gauge.
- **Slow or repeated inflations**: leak in the cuff or hose.

## SpO2 problems
- **No reading or searching**: sensor placement, perfusion, motion, ambient light; try another site; check the sensor and cable with a simulator.
- **Reading disagrees with the blood gas**: dyshemoglobins, dyes, nail polish, or a damaged sensor; the physics limits are real.

## Invasive pressure problems
- **Offset**: not zeroed or not leveled.
- **Damped waveform**: air, clot, kink, loose connection; fast-flush test.
- **No waveform**: stopcock turned wrong, transducer cable, module.

## Capnography problems
- **Sampling line alarm**: water, kink, occlusion; replace the line and water trap.
- **Flat capnogram**: patient and airway first.
- **Baseline above zero**: rebreathing; absorber and valves.

## Telemetry problems
- **Dropouts on one patient**: transmitter battery, leads, patient out of coverage.
- **Dropouts in an area**: antenna, amplifier, coax.
- **Everyone**: receiver, central station, network, interference in the band.

## Central station and network
- **One bed missing**: cable, wall port, switch port, IP configuration, monitor network settings.
- **All beds missing**: switch, server, a network change; confirm with IT; check time sync and license status.
- **Wrong patient in a record**: admission and discharge workflow at the central station.

> Exam tip: one bed is local (accessory, module, that monitor's network drop); all beds is the system (switch, server, configuration). Electrodes first for ECG noise, cuff fit and hose for NIBP, perfusion and site for SpO2, zero and level for invasive pressure, patient first for a lost capnogram.`,
      hook: "One bed, one parameter: accessory or module. One bed, all: that monitor or its drop. All beds: central station, server, network. ECG noise starts at the electrodes; NIBP at the cuff; SpO2 at the site; IBP at zero and level; capnography at the patient."
    },
    {
      id: "u8l2", title: "Diagnostic and Infusion Device Faults", domain: 5, obj: "Problem solving", minutes: 11,
      body: `Diagnostic devices fail quietly with wrong numbers; infusion devices fail loudly with alarms, or dangerously with no alarm at all. The exam pairs the symptom with the most likely cause and the correct first action.

## Diagnostic equipment
- **Ultrasound image dark or with vertical dropout bands**: transducer element damage; test with a phantom; replace the transducer. A whole-image problem points to the system.
- **Ultrasound noisy or striped**: EMI, a bad transducer cable, or a failing board; swap transducers to isolate.
- **Spirometer reading low with the calibration syringe**: dirty or damaged sensor, leak at the mouthpiece or tubing, wrong temperature correction; clean or replace the sensor and recalibrate.
- **Audiometer failing calibration at one frequency**: the earphone transducer; swap earphones; recalibrate with the sound level meter.
- **Scale drifting or not returning to zero**: something touching the platform, unlevel floor, damaged load cell or cable; check with test weights.
- **Stress treadmill belt slipping or speed inaccurate**: belt tension and wear, drive belt, motor controller; verify speed and grade.
- **12-lead ECG with one bad lead**: the lead wire; a whole set of noisy leads is the trunk cable or the electrodes.
- **Otoscope dim**: lamp, battery, contacts, fiber bundle.

## Infusion pumps: alarms that are true
- **Downstream occlusion**: the line is kinked, clamped, or the catheter is blocked. The alarm is correct; clear the cause. Frequent occlusion alarms at low rates on one pump: verify the occlusion pressure with the analyzer; a threshold set too low or a mechanism problem.
- **Upstream occlusion**: bag empty, clamp closed above the pump, spike not vented.
- **Air-in-line**: air in the tubing from an empty bag or a set that was not primed. Repeated air alarms with no visible air: dirty or misaligned sensor, wrong set, or the tubing not seated in the sensor.
- **Door or set alarms**: the set is not loaded correctly or the door latch is worn.

## Infusion pumps: failures with no alarm
- **Free-flow**: the most dangerous failure. A set removed without clamping, a set incompatible with the pump's free-flow mechanism, or a broken door clamp. Test every PM.
- **Under- or over-delivery**: mechanism wear, wrong set, a set used past its rated hours (tubing fatigues in the peristaltic path), a syringe size misdetected. Verify with the infusion analyzer at low and high rates.
- **Wrong dose from right pump**: programming error, wrong concentration, drug library out of date or not loaded. Check the pump's event log; it records every keystroke.
- **Siphoning or start-up delay** on syringe pumps: mounting height, plunger clamp, low rates.

## Investigating a pump incident
Do not clear the pump. Sequester it with the set and bag as found. Photograph the display. Download the event log. Note the programmed rate, volume infused, and the drug library version. Verify flow accuracy afterward on the analyzer. The log usually tells the story.

## Enteral pumps and injectors
- Enteral pump alarms: formula viscosity, clogged sets, wrong set. Never adapt an enteral set to an IV connector.
- Contrast injector faults: pressure limit reached (small catheter or occlusion), air detected (purge routine not done), syringe heater, arm and interface cables, scanner interlock.

> Exam tip: a bad ultrasound image in bands is the transducer; a whole-image fault is the system. Occlusion and air alarms are usually right. Free-flow and under-delivery do not alarm, which is why PM tests them. Never clear a pump involved in an incident; download the log.`,
      hook: "Transducer for bands, system for the whole image. Occlusion and air alarms usually true; free-flow and delivery errors silent, so PM tests them. In an incident, sequester the pump as found and read its log."
    },
    {
      id: "u8l3", title: "Therapeutic, Perioperative, and Life-Support Faults", domain: 5, obj: "Problem solving", minutes: 12,
      body: `The devices that heat, cut, shock, and breathe. Failures here injure, so the pattern is: patient safe first, device out of service, evidence preserved, then diagnosis with the right analyzer.

## Temperature devices
- **Incubator or warmer over-temperature**: controller or heater fault; the independent over-temp cutoff is the safety net and is tested at PM; remove from service.
- **Radiant warmer heating with the probe off**: probe-off alarm failure; serious.
- **Hypo/hyperthermia unit not reaching temperature**: low water, clogged filter, weak pump, heater or compressor; check flow and leaks.
- **Blood warmer over 42 C**: cutoff failure; out of service.
- **Forced-air warmer burn**: hosing; a training issue, plus check outlet temperature.

## Suction and compression
- **Weak suction**: filter wet, canister lid seal, float closed, tubing leak, regulator, pump diaphragm on portables.
- **SCD low-pressure alarm**: sleeve or hose leak; high pressure: kinked hose.

## Electrosurgery
- **ESU alarms and will not activate**: return electrode monitoring detected poor pad contact or a disconnect; check the pad, cable, and connector. The alarm is a safety feature working.
- **Burn under the pad**: pad placement, size, or contact; verify the REM circuit with the analyzer.
- **Burn at a remote site**: alternate path through an ECG electrode or a grounded metal contact; review positioning and electrode placement.
- **Low output**: verify with the ESU analyzer; a pencil or cable failure before a generator failure.
- **Interference with the ECG during activation**: expected; the monitor's ESU filter setting helps.

## Sterilizers, tourniquets, tables, lights
- **Failed biological indicator**: steam quality, air removal, wet or overloaded packs, door gasket, timer; quarantine the loads.
- **Tourniquet leaking or inaccurate**: cuff, tubing, connectors, gauge calibration.
- **Table drifts down under load**: hydraulic leak or valve; out of service.
- **Light drifts**: arm balance and brakes.

## Defibrillators
- **Low delivered energy**: capacitor aging, relay, connectors; the analyzer reveals it; out of service.
- **Long charge time**: battery or capacitor.
- **Sync fails**: dangerous; out of service.
- **No ECG through pads**: pad cable and connector.
- **AED self-test failure**: read the indicator; usually pads expired or battery.
- **Pacer not capturing**: output, pads, then verify pacing current on the analyzer.
- **IABP timing or gas alarms**: trigger source (ECG cable or pressure), helium supply, catheter kink, balloon leak (blood in the line: stop).

## Ventilators and anesthesia
- **High-pressure alarm**: obstruction in the patient, tube, or circuit; water in the tubing; clinical staff clear it.
- **Low-pressure or low-volume alarm**: disconnect or leak; the patient is checked first; then the circuit, humidifier, cuff.
- **Volume delivered does not match set volume on the analyzer**: flow sensor calibration, leak in the exhalation valve, wrong circuit compliance setting.
- **FiO2 wrong**: blender, oxygen sensor exhausted, gas supply pressure.
- **Apnea alarm on a breathing patient**: trigger sensitivity or flow sensor.
- **Anesthesia machine fails the leak test**: vaporizer seating and fill cap, gaskets, absorber canister seal, circuit connections, bellows.
- **Rising inspired CO2**: exhausted absorber, stuck one-way valve, low fresh gas flow.
- **Concentrator low oxygen**: sieve beds; measure with the analyzer.

## After any life-support repair
Full performance verification with the appropriate analyzer, all alarms exercised, electrical safety test, battery check, documented before the device returns. A partially tested defibrillator is a defibrillator that fails during a code.

> Exam tip: over-temperature and probe-off failures on infant devices are immediate removals. ESU refusing to fire is the safety monitor working. Low delivered energy or failed sync removes a defibrillator. High pressure is obstruction; low pressure is disconnect. Every life-support repair ends with full verification.`,
      hook: "Over-temp and probe-off failures: remove now. ESU inhibit is REM working; burns are pad contact or alternate paths. Defib low energy, long charge, failed sync: out of service. High pressure obstruction, low pressure disconnect. Full verification after every life-support repair."
    },
    {
      id: "u8l4", title: "Laboratory Device Faults and Environmental Problems", domain: 5, obj: "Problem solving", minutes: 9,
      body: `Laboratory devices fail in mechanical and thermal ways, and the consequences are ruined specimens, ruined inventory, and wrong results. The outline lists them under problem solving as well as function.

## Centrifuges
- **Vibration or walking**: unbalanced load first; then rotor damage, bucket mismatch, worn bearings or motor mounts.
- **Will not start**: lid interlock, lid latch sensor, timer, drive belt, brushes on older motors, fuse.
- **Speed low or unstable**: worn brushes, controller, belt slipping, tachometer feedback; verify with a tachometer.
- **Noisy at speed**: bearings; a rising whine.
- **Refrigerated model not cooling**: condenser blocked, fan, compressor.
- **Broken tube inside**: a biohazard spill; stop, follow the spill procedure, decontaminate the rotor and bowl, inspect for damage.

## Refrigerators and freezers
- **Temperature excursion alarm**: door left open, gasket, overloaded shelves blocking airflow, defrost cycle, compressor or fan, power. Compare the chart or data log to the alarm; assess the contents with the lab's rules.
- **Alarm not sounding during test**: probe placement, alarm setpoints, dead backup battery in the alarm, remote notification not configured.
- **Ultra-low freezer warming**: dirty filter and condenser, door seal frost, compressor; these have a two-stage cascade and fail expensively.

## Incubators and baths
- **Incubator temperature or CO2 off**: reference thermometer and gas analyzer decide; then sensor calibration, door seal, water pan, CO2 supply and valve, heater.
- **Water bath overshoot**: thermostat or over-temperature cutoff; low water level exposes the heater.
- **Contamination**: cleaning schedule and water quality.

## Analyzers
- **QC out of range**: reagents, calibration, a clogged probe, temperature control, tubing wear; the analyzer's own diagnostics first; escalate to the vendor when under contract.
- **Interface to the lab information system down**: middleware, network, the analyzer's interface settings; results may queue and need release.
- **Fluidic leaks and pump wear**: routine maintenance kits.

## Microscopes and cutting equipment
- **Dim or uneven illumination**: lamp, alignment, condenser position, dirty optics.
- **Cannot focus**: stage or focus mechanism, an objective loose or wrong.
- **Cryostat sections shredding**: temperature too warm or too cold for the tissue, dull blade, anti-roll plate.

## Environmental problems that masquerade as device faults
- **Power quality**: sags and surges from elevator motors and imaging equipment reset sensitive devices; a UPS or conditioned circuit fixes it.
- **Temperature and humidity**: a device rated for 15 to 30 C in a closet at 35 C throttles or fails; condensation after transport from a cold vehicle shorts boards.
- **Water quality**: scale in sterilizers, baths, and analyzers; dialysis water is its own discipline.
- **Vibration**: a centrifuge on the same bench as a balance ruins the balance readings.
- **Gas and vacuum**: low pipeline pressure shows as ventilator and suction faults; report to facilities.

> Exam tip: centrifuge vibration is balance first, then rotor and bearings. Refrigerator excursions are door, gasket, airflow, defrost, then compressor. QC failures start with reagents and calibration. Consider the environment when many unrelated devices in one location misbehave.`,
      hook: "Centrifuge: balance, then rotor and bearings; interlocks stop it starting. Refrigerator: door, gasket, airflow, defrost, compressor; check the log. Analyzer QC: reagents, calibration, probes. Many devices failing in one place is the environment: power, temperature, water, gas."
    },
    {
      id: "u8l5", title: "Preventive Maintenance, Performance Verification, and Documentation", domain: 5, obj: "Problem solving", minutes: 11,
      body: `Preventive maintenance is troubleshooting before the failure. The exam tests what a PM contains, how performance is verified, how intervals are set, and what the record must show.

## What a PM is
A scheduled inspection and test that finds wear before it fails and proves the device meets specification. Contents, in the usual order:
1. **Visual and mechanical**: case, cord, plug, strain reliefs, wheels, latches, labels, accessories, cleanliness, fluid ingress signs.
2. **Electrical safety**: ground resistance and leakage per the standard.
3. **Functional and performance verification** with the right analyzer or simulator against the manufacturer's specifications and tolerances.
4. **Alarms**: every alarm exercised.
5. **Battery**: runtime under load, replacement by date.
6. **Consumables and wear items**: filters, gaskets, batteries, tubing kits, lamps, replaced on schedule.
7. **Software**: version current; drug library or configuration current.
8. **Cleaning and calibration** as applicable.
9. **Labeling** with the date and next due; **documentation** in the CMMS.

## Performance verification, by device
- Monitors: patient simulator for every parameter, NIBP simulator, SpO2 simulator, temperature simulator; alarm limits.
- Defibrillators: analyzer for energy at several settings, charge time, sync, pacing, ECG; battery.
- Infusion pumps: analyzer for flow accuracy at two rates, occlusion pressure and time, air-in-line, free-flow.
- Ventilators and anesthesia: gas flow analyzer and test lung for volumes, pressures, rates, FiO2; alarms; leak tests.
- ESUs: analyzer for output and REM.
- Sterilizers: temperature and pressure references, biological indicators.
- Laboratory: tachometers, reference thermometers, test weights, gas analyzers.
- Everything: a calibrated electrical safety analyzer.
Tolerances come from the manufacturer; a reading outside tolerance is a failed PM and the device is repaired before return.

## Setting intervals
Manufacturer recommendations are the starting point. Many programs use a **risk-based** approach: devices scored by function (life support scores highest), physical risk, maintenance requirements, and incident history, with intervals from three months to two years, or inspection-only for low-risk items. Accrediting bodies and CMS allow an alternative equipment maintenance program for many devices, but require that life-support devices, imaging, and devices with manufacturer-mandated schedules stay on the manufacturer's schedule, and that the program be documented and data-driven.

## Compliance and recordkeeping
- **Inventory**: every device with a unique control number, manufacturer, model, serial, location, owner, risk class, PM interval.
- **PM completion**: tracked as a percentage; surveyors ask for it, and life-support completion must be 100 percent.
- **Work orders**: complaint, findings, actions, parts, test results, labor, dates, technician.
- **Recalls and alerts**: received, matched to inventory, action taken, closed.
- **Incidents**: preserved evidence, investigation, reports.
- **Test equipment calibration**: certificates and due dates.
Records are how you prove, years later, that the device was safe when it left your hands.

## Incoming inspection
Every new or loaned device gets an acceptance test before first patient use: as-shipped condition, electrical safety, performance verification, configuration to hospital standards, training, and entry into the inventory. A device that arrives directly on the floor bypasses all of that, and surveyors look for it.

> Exam tip: a PM is inspection, electrical safety, performance verification with the right analyzer, alarms, battery, consumables, software, label, and record. Life-support PM completion must be 100 percent. Risk-based intervals are allowed except where the manufacturer's schedule is mandated. Incoming inspection before first use.`,
      hook: "PM: inspect, electrical safety, performance verification, alarms, battery, consumables, software, label, document. Tolerances from the manufacturer. Risk-based intervals, life support on schedule and 100 percent complete. Incoming inspection before any device touches a patient."
    }
  ]
});

FRA.units.push({
  id: "u9", n: 9, title: "Healthcare Information Technology", domain: 6,
  blurb: "Networking fundamentals, wireless and infrastructure, network troubleshooting tools, device integration with the EMR through HL7 and DICOM, protected data and cybersecurity, and computer hardware and software troubleshooting.",
  assumes: "You know the monitoring systems from Unit 4 and the troubleshooting method from Unit 7.",
  lessons: [
    {
      id: "u9l1", title: "Networking Fundamentals: Addresses, Cables, and the Devices Between", domain: 6, obj: "Healthcare IT", minutes: 12,
      body: `Seventeen percent of the exam is IT, and most of that is networking, because monitors, pumps, imaging, and lab analyzers all live on the network now. Learn the vocabulary and the numbers.

## Layers, in plain terms
- **Physical**: cables, connectors, radio, and the bits on them.
- **Data link**: Ethernet frames and **MAC addresses** (48-bit hardware addresses burned into each interface, written as six pairs of hex). Switches work here.
- **Network**: **IP addresses** and routing between networks. Routers work here.
- **Transport**: **TCP** (connection, reliable, ordered; HL7, DICOM, web) and **UDP** (no connection, fast, lossy; some streaming and discovery).
- **Application**: HTTP, HTTPS, DNS, DHCP, SMB file shares, HL7, DICOM, remote desktop.

## IP addressing
- **IPv4**: four numbers 0 to 255, such as 10.20.30.40. A **subnet mask** (255.255.255.0, or /24) says which part is the network and which the host. Devices on the same subnet talk directly; different subnets talk through a router at the **default gateway**.
- **Private ranges**: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Hospital networks use these inside; a **NAT** router shares public addresses outward.
- **Static** addresses are typed into the device and never change: monitors and servers, because the central station must always find them. **DHCP** hands out addresses automatically: workstations, phones, most pumps. A device with a duplicate static address knocks another off the network.
- **DNS** turns names into addresses. **APIPA** (169.254.x.x) means the device asked DHCP and got nothing: a link or DHCP problem.
- **IPv6**: 128-bit addresses in hex groups; present in modern equipment, rarely central to the exam.

## Ports
A port number identifies the service at an address: 80 HTTP, 443 HTTPS, 22 SSH, 3389 remote desktop, 53 DNS, 104 DICOM by convention, and vendor-chosen ports for HL7 (often 2575 or similar). A **firewall** allows or blocks by address and port. A monitor that cannot reach its server after a firewall change is a port rule.

## Cabling
- **Twisted pair** Cat5e, Cat6, Cat6a with RJ45 plugs; 100 m maximum run; 1 Gb/s common, 10 Gb/s on Cat6a. Straight-through for device to switch. The pairs are color coded to a wiring standard, and a miswired plug fails at speed or entirely.
- **Fiber**: single-mode for long runs (kilometers), multimode for shorter; immune to EMI; used between closets and to imaging.
- **Coaxial**: telemetry antenna systems and legacy video.
- **Power over Ethernet**: the switch powers access points, phones, and cameras over the data cable.

## Switches, routers, and VLANs
- A **switch** connects devices in one network, learning MAC addresses per port. Managed switches support **VLANs**: virtual networks that separate traffic, so monitoring has its own network sharing the same physical switches. A port on the wrong VLAN is a monitor that cannot see its server.
- A **router** connects networks and chooses paths; the gateway address on a device is a router interface.
- **Hubs** are obsolete repeaters. **Bridges** join two segments.

## Servers and clients
The central station, EMR, PACS, and CMMS are servers; workstations and devices are clients. Servers run on **UPS** power, in cooled rooms, with backups. A **domain controller** authenticates users; a **file server** shares folders; a **print server** manages printers.

> Exam tip: MAC is hardware (layer 2, switches); IP is logical (layer 3, routers). Same subnet talks directly; otherwise through the gateway. Static for monitors, DHCP for the rest; 169.254 means DHCP failed. TCP reliable, UDP fast. 100 m copper limit; fiber for distance and EMI. VLANs separate traffic on shared switches.`,
      hook: "MAC at the switch, IP at the router. Subnet mask decides same network. Static for monitors and servers, DHCP for the rest, 169.254 means no DHCP. TCP reliable, UDP fast. 100 m copper, fiber beyond. VLAN separates; firewall filters by port."
    },
    {
      id: "u9l2", title: "Wireless, Access Point Controllers, KVMs, Virtual Servers, and the Cloud", domain: 6, obj: "Healthcare IT", minutes: 10,
      body: `The outline names wireless networks, access point controllers, KVM switches, virtual servers, and cloud computing. Each is a short concept the exam checks with a definition or a symptom.

## Wi-Fi
- **Bands**: 2.4 GHz (longer range, more interference, three usable channels) and 5 GHz (more channels, less range, less crowded), plus 6 GHz on the newest gear. Medical telemetry has its own protected WMTS bands; Wi-Fi is shared with everything else.
- **Standards** are the 802.11 family; newer versions mean more speed and better handling of many clients.
- **Security**: WPA2 or WPA3 with a strong key, or enterprise authentication with certificates. Open or WEP networks are unacceptable for patient devices.
- **Coverage and roaming**: pumps and monitors move; a device dropping when a patient walks means a coverage gap or a roaming problem between access points. Site surveys map signal strength; dead zones are stairwells, elevators, shielded rooms, and MRI suites.
- **Interference**: microwave ovens, cordless phones, neighbors' networks on 2.4 GHz; older medical devices with weak radios.
- **Symptoms and causes**: one device cannot connect (its credentials, radio, or driver); all devices in an area drop (that access point or its cable and PoE); everyone everywhere (the controller or authentication server).

## Access point controllers
Enterprise Wi-Fi uses dozens to thousands of **access points** managed by a **controller** (hardware or cloud) that pushes configuration, sets channels and power, handles roaming, and applies the same security everywhere. Changes at the controller affect every access point at once, which is why a monitoring outage can follow a Wi-Fi change made by IT.

## KVM switches
A keyboard-video-mouse switch lets one set of controls operate several computers; the reverse, a KVM extender, puts the controls far from the computer (a console in a control room, the computer in a rack). Used in imaging suites, ORs, and data centers. Symptoms: no video (cable, resolution, the switch's port), keyboard not working (USB emulation), lag on IP-based extenders.

## Virtual servers
One physical machine runs many **virtual machines**, each an independent server with its own operating system, under a **hypervisor**. Benefits: fewer boxes, quick provisioning, snapshots for backup, moving a server to another host when hardware fails. Risks: a host failure takes down every server on it (hence clusters and redundancy), and virtual servers still need patching and backups. Medical device servers (central stations, PACS, CMMS) increasingly run virtualized; the vendor states whether it is supported.

## Cloud computing
Servers and services rented from a provider and reached over the internet: **SaaS** (an application, such as a hosted CMMS or remote device monitoring), **PaaS** (a platform for building applications), **IaaS** (raw virtual machines and storage). Benefits: no local hardware, scale, remote access. Concerns: patient data leaving the building requires a **business associate agreement**, encryption in transit and at rest, and access controls; internet outages cut off the service; the vendor controls updates and downtime.

## Remote access and support
Vendors service devices remotely through **VPNs** or vendor-managed gateways. Access must be controlled: named accounts, logging, on-demand enablement, and no permanent open doors.

> Exam tip: 2.4 GHz reaches farther but is crowded; 5 GHz is faster and cleaner. WPA2 or WPA3 only. Coverage gaps drop mobile devices. A controller change affects every access point. Virtualization shares hardware among servers. Cloud means a vendor's servers and a business associate agreement.`,
      hook: "2.4 GHz range, 5 GHz speed; WPA2 or WPA3; gaps drop moving devices; one AP down is an area, the controller is everyone. KVM shares controls. Virtual machines share a host. Cloud is rented servers plus a business associate agreement."
    },
    {
      id: "u9l3", title: "Network Troubleshooting Tools and Method", domain: 6, obj: "Healthcare IT", minutes: 10,
      body: `A monitor that cannot reach the central station is a network problem until proven otherwise. The outline names the tools: ping, tracert, the cable tester, and the ability to read a device's network configuration.

## The bottom-up sequence
1. **Link light.** No light at the device or the switch port: cable, port, or the device's network interface. Amber or blinking codes vary by vendor; a lit link with no traffic light means connected but silent.
2. **Cable.** Test it with a cable tester: continuity, pin-to-pin wiring, shorts, split pairs, length. Try a known-good patch cable. Check the wall jack to closet run separately.
3. **Configuration.** IP address, subnet mask, gateway, DNS on the device; are they what the network team assigned? 169.254 means DHCP failed. Duplicate address warnings mean another device has the same one.
4. **Reachability.** Ping the device from a workstation and ping the server from the device (or from a laptop on the same jack).
5. **Path.** Trace the route to see where it stops.
6. **Service.** Address reachable, application not: the port is blocked, the service is down, or the application is misconfigured.

## Ping
Sends an echo request and reports whether a reply came back and how long it took.
- **Reply**: the address is reachable at the IP level.
- **Request timed out**: no reply; the device is off, disconnected, on the wrong subnet, or a firewall blocks the echo.
- **Destination host unreachable**: your own gateway has no route.
- **High or variable times, or lost packets**: congestion, a bad cable, a wireless problem.
Ping your own loopback (127.0.0.1) to prove the stack works, your own address, the gateway, then the server: each step isolates a layer.

## Tracert
Lists every router hop between you and the destination with timing. The hop where responses stop is where the path breaks. Between a monitor and a central station on the same VLAN there may be no hops at all.

## Other commands and tools
- **ipconfig** (Windows) or **ifconfig / ip** (Linux) shows the device's address, mask, gateway, and DNS, and can release and renew a DHCP lease.
- **nslookup** tests name resolution: does the name resolve to the right address?
- **arp -a** shows the addresses recently seen on the local network and reveals duplicates.
- **netstat** lists open connections and listening ports on a computer.
- **Cable tester and tone generator**: wiring and finding the far end of a cable in a closet.
- **Protocol analyzer** (packet capture): sees the actual traffic, used with IT for interface problems.
- **Switch management**: port status, VLAN, errors, and PoE; usually IT's console, but knowing what to ask for matters.
- **Wireless survey tools** show signal strength and interference on a floor plan.

## Working with IT
Report what you measured, not a guess: "monitor at 10.20.5.14 has link, correct configuration, pings its gateway, cannot ping the central station at 10.20.1.10; worked until yesterday's change window." Ask for the port's VLAN and the firewall rules between those addresses. Log the ticket and the resolution in both systems.

> Exam tip: link light, cable, configuration, ping, trace, service. 169.254 is DHCP failure. Ping success proves IP reachability; a blocked port shows as reachable but the application fails. Tracert shows where the path stops. A cable tester checks wiring and length.`,
      hook: "Link light, cable, config, ping, tracert, service. Ping loopback, self, gateway, server to isolate. 169.254 means no DHCP. Reachable but the application fails is a port or service. Give IT measurements, not guesses."
    },
    {
      id: "u9l4", title: "Device Integration: EMR, Middleware, HL7, and DICOM", domain: 6, obj: "Healthcare IT", minutes: 11,
      body: `Vital signs flow from the monitor into the patient's chart; images flow from the CT into the archive; pumps download drug libraries and upload infusion data. Integration is how, and the outline names the pieces.

## The systems
- **EMR / EHR**: the electronic medical record: orders, notes, results, medication administration, flowsheets.
- **LIS**: the laboratory information system; analyzers send results to it and it sends them to the EMR.
- **RIS**: the radiology information system: scheduling, worklists, reports.
- **PACS**: picture archiving and communication system: stores and displays images.
- **CMMS**: the computerized maintenance management system: equipment inventory and work orders (yours).
- **Middleware / integration engine**: the translator in the middle that receives messages from one system, converts them, and routes them to others, with queues and logs.

## HL7
Health Level Seven is the standard for text messages between clinical systems. Version 2 is the workhorse: a message is lines of text segments separated by delimiters, each segment a kind of information.
- **ADT** messages: admit, discharge, transfer; they tell every system who is in which bed.
- **ORM** orders and **ORU** results (observations, including vital signs from a monitor).
- Segments: MSH (header), PID (patient identity), OBR (the observation request), OBX (each observation and value).
A monitor sending vital signs to the EMR sends an ORU with OBX segments; the integration engine maps it to the right patient and flowsheet row. **FHIR** is the newer web-style standard using resources and web APIs, growing alongside version 2.

## Patient association
The most common integration failure is not a network fault: it is data in the wrong chart, or no chart. A device must know which patient it is on. Methods: admission at the central station or device (manual entry with room and bed), barcode scanning of the patient wristband and the device, or ADT feed to the device system. When the bed association is stale (patient moved, not discharged from the monitor), the next patient's data lands in the previous patient's record. Discharge from the device is a workflow step as important as admission.

## DICOM
Digital Imaging and Communications in Medicine is the standard for images and the messages around them.
- Every imaging device is an **application entity** with an **AE title**, an IP address, and a port (104 by convention); both sides must be configured with the other's details.
- Services: **store** (send images to PACS), **query and retrieve**, **modality worklist** (the device pulls the day's scheduled patients from the RIS so the technologist selects instead of typing), **print**, and **storage commitment**.
- **Verification (C-ECHO)** is the DICOM ping: proves that two nodes are configured to talk.
- An image is a file of tagged fields (patient name, ID, study date, modality, pixel data). Wrong demographics come from typing at the modality instead of using the worklist.

## Troubleshooting integration
1. Is it every message or one? All results missing is the interface, the engine, or the network; one patient missing is association or a rejected message.
2. Check the integration engine's queue and error log; rejected messages show why (unknown patient, bad format).
3. Verify the network path and port between the devices (ping, then the application's own test such as a DICOM echo).
4. Check the AE titles, addresses, and ports on both sides after any change on either.
5. Check certificates and accounts if the interface uses secure transport.
6. Involve the vendors of both ends and the integration team; keep the ticket numbers together.

## Data flow example
Monitor reads 118/76 at 09:00. Every minute or on validation, the central station builds an HL7 ORU with an OBX for each vital and sends it to the integration engine. The engine looks up the bed's patient from the ADT feed, converts units and codes to what the EMR expects, and posts it. The nurse validates the value in the flowsheet. The record now shows a vital sign with a device source and a timestamp, which is why time synchronization across devices matters.

> Exam tip: HL7 carries text messages (ADT, ORU, OBX); DICOM carries images with AE titles, addresses, and ports, and a DICOM echo tests connectivity. Middleware translates and routes. Data in the wrong chart is patient association, not the network. Worklist prevents typing errors.`,
      hook: "HL7: ADT tells who is where, ORU carries results, OBX is each value. DICOM: AE title, IP, port; echo tests; worklist avoids typing. Middleware translates and queues. Wrong chart is stale association. Same-subnet ping, then the application's own test."
    },
    {
      id: "u9l5", title: "Protected Health Information and Medical Device Cybersecurity", domain: 6, obj: "Healthcare IT", minutes: 12,
      body: `Every networked device stores or moves patient data, and every one is a computer that can be attacked. The outline lists protected data, encryption, access controls, viruses and malware, and security practices. Expect both definitions and "what should the technician do" scenarios.

## Protected health information
- **PHI**: any health information tied to an identifiable person: names, dates, medical record numbers, images, device logs with patient names. A monitor's stored trends and a pump's history are PHI. A device leaving the hospital for repair, trade-in, or disposal must have PHI removed (a documented sanitization or storage destruction), and the vendor must hold a **business associate agreement**.
- **HIPAA** privacy and security rules require administrative, physical, and technical safeguards; breaches are reported and penalized. Minimum necessary: access only what your job requires, and never look up a patient out of curiosity.
- **Physical**: screens turned from public view, devices not left logged in, drives and USB media controlled, secure disposal.

## Access control
- Unique user accounts, strong passwords or passphrases, **multi-factor authentication** for remote and administrative access.
- **Role-based access**: a biomed account can configure but not chart; a nurse account can chart but not configure.
- **Least privilege**: default accounts and vendor passwords changed at installation; service accounts disabled when not in use; access reviewed and removed when people leave.
- Screen locks and automatic logoff. Shared or written-down passwords defeat everything else.

## Encryption
Turns data into unreadable form without a key. **In transit**: HTTPS, TLS, VPNs, WPA2/WPA3 on Wi-Fi. **At rest**: full-disk encryption on laptops and servers, encrypted device storage where supported. A lost encrypted laptop is an inconvenience; a lost unencrypted one is a reportable breach.

## Malware and attacks
- **Virus, worm, trojan**: code that infects, spreads, or hides; **ransomware** encrypts systems and demands payment and has shut down hospitals; **spyware** and **keyloggers** steal.
- **Phishing**: mail or messages that trick people into clicking or giving credentials; the most common entry point. **Social engineering**: the "vendor" on the phone asking for remote access.
- **Unpatched systems**: old operating systems on medical devices, unsupported software, and missing updates. Many devices run embedded Windows or Linux versions the manufacturer must validate before patching; that is why network segmentation matters.
- **USB media**: a service laptop or a thumb drive carries infection into an isolated device.

## Defenses the biomed participates in
- **Inventory**: every networked device recorded with its operating system, software versions, network address, and the manufacturer's security documentation (an **MDS2** form describes a device's security capabilities; an **SBOM** lists its software components).
- **Segmentation**: medical devices on their own VLANs with firewall rules that allow only needed traffic; no internet browsing from device consoles.
- **Patching** per the manufacturer's validated releases; **antivirus** where supported; disabling unused ports and services.
- **Change control**: no configuration change to a networked device without a record and a plan to test it.
- **Vendor access** controlled and logged; service laptops kept patched and scanned; no personal USB drives.
- **Backups** tested by restoring; **incident response** plan: isolate the device, preserve evidence, notify IT security, do not power off if forensics are needed unless told to.
- **Alerts and recalls** for cybersecurity vulnerabilities handled like any other recall.

## The technician's habits
Lock your screen. Do not plug unknown media into anything. Do not share your account. Report a suspicious message instead of clicking. Sanitize PHI before a device leaves. Use the approved remote-access process for vendors, never a workaround. Keep patient details out of photographs, emails, and notes unless the channel is approved.

> Exam tip: PHI includes device logs and images; sanitize before disposal or vendor return; business associate agreements for vendors. Least privilege, unique accounts, multi-factor for remote access, encryption in transit and at rest. Phishing is the common entry. Segment medical devices, patch as validated, control vendor access, back up and test restores.`,
      hook: "PHI lives in device memory: sanitize before it leaves; vendors sign a BAA. Unique accounts, least privilege, MFA, encryption in transit and at rest. Phishing and USB media carry malware; segmentation, validated patches, controlled vendor access, tested backups defend."
    },
    {
      id: "u9l6", title: "Computer Hardware and Software Troubleshooting", domain: 6, obj: "Healthcare IT", minutes: 11,
      body: `Monitors, central stations, imaging consoles, and lab analyzers are computers with medical software. The outline expects you to recognize the parts, the operating system basics, and the common faults.

## Hardware
- **CPU**, **RAM** (working memory; lost at power off), **storage** (hard disk drive with platters, or a solid-state drive with no moving parts and far more reliability), **motherboard**, **power supply**, **graphics**, **network interface**, and **ports** (USB, serial RS-232 on older medical devices, display ports).
- **Firmware and BIOS/UEFI**: the low-level software that starts the machine; a CMOS battery keeps its settings and the clock; a dead one causes wrong dates and settings lost at boot.
- **Peripherals**: keyboard, mouse, barcode scanners, printers, touchscreens, card readers.

## Boot problems
- **No power**: outlet, cord, supply, switch (the same chain as any device).
- **Powers but no display**: monitor and cable, graphics output, the machine is actually booting (listen for drives and fans), or a failed board; beep codes and diagnostic lights help.
- **Stops at the firmware screen**: no bootable drive found: a failed drive, a wrong boot order, or a stuck USB device.
- **Operating system errors, blue screens, loops**: corrupted system files, failed updates, driver problems, failing storage or memory; safe mode, memory tests, drive diagnostics, restore from backup or image.
- **Slow**: nearly full or failing drive, too little RAM, malware, background updates, overheating (dust in fans and heat sinks).

## Operating systems and software
- **Windows**, **Linux**, and embedded real-time systems on devices. Know: user accounts and permissions, services, drivers, event logs, updates and patches, the registry on Windows, file systems and shares.
- **Drivers** connect hardware to the operating system; a device that stopped working after an update often needs its driver reinstalled or rolled back.
- **Application faults**: crashes at a specific action, missing licenses, a configuration file changed, a database full. Vendor logs and the event log point to the cause.
- **Updates**: on medical devices only the manufacturer's validated updates; on general workstations, IT's patch schedule. A workstation used as a medical device console still follows the device vendor's rules.

## Data and backups
- **Backups**: full, incremental, differential; kept off the machine and off site; tested by restore. Central stations, PACS, and CMMS databases are backed up on a schedule; a device's configuration is exported and saved so a replacement can be configured identically.
- **Storage failure**: clicking drives, disk errors in the log, slow reads; replace and restore. **RAID** arrays survive one drive failure and alert when degraded; a degraded array is a failure waiting to become total.
- **Disposal**: drives wiped or destroyed for PHI.

## Peripherals and common calls
- Printer: paper, toner, driver, network address, print spooler; a network printer that vanished usually changed address.
- Barcode scanner: configuration barcodes set the mode; a scanner that adds characters or none was reprogrammed.
- Touchscreen drifting: calibration; dead area: the panel.
- USB devices not recognized: port, cable, driver, power.
- Serial (RS-232) connections on older devices: baud rate, parity, data bits, and cable pinout (straight versus null modem) must match on both ends.

## Method, applied to computers
The same six steps: gather (what changed, what error text), verify, simplest causes (power, cables, restart, updates in progress, disk full), isolate (swap peripherals, boot from external media, test memory and drives), correct and verify, document. Keep an image of the standard configuration so a rebuild takes an hour, not a day.

> Exam tip: RAM is lost at power off, storage is not; SSDs have no moving parts. A wrong date at boot is the CMOS battery. No bootable device is the drive or boot order. Only validated updates on medical devices. RAID degraded is still a failure. Serial links need matching baud, parity, data bits, and cable type.`,
      hook: "CPU, RAM (volatile), storage (SSD reliable), firmware with a CMOS battery. No display: monitor, cable, board. No boot device: drive or order. Slow: disk, RAM, malware, heat. Validated updates only on devices; back up and test restores; RAID degraded is urgent; serial settings must match."
    }
  ]
});
