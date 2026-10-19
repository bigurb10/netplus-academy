// BMET Academy deeper explanations, units 6 to 8. Original content, written for a reader with no background.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u6l1: `## The four facts per device
Diagnostic devices are small, cheap, numerous, and easy to neglect, which is exactly why exams ask about them. Hold four facts for each one and you can answer almost any question put to you.

\`\`\`
Otoscope
  what it does        lights and magnifies the ear canal and the eardrum
  settings            lamp brightness; a speculum size chosen for the patient
  first check         lamp output, battery or charger contacts, clean undamaged specula
  common false alarm  "the light is dim" is almost always the battery or the charger contacts

Ophthalmoscope
  what it does        lights the inside of the eye so the retina can be examined
  settings            the lens dial, which clicks through correction powers
  first check         lamp, every dial detent, optics cleaned with lens tissue only
  common false alarm  "it will not focus" is usually a dirty lens or a dial that skips a detent

Electronic thermometer
  what it does        reads body temperature through a thermistor probe, or infrared at ear or forehead
  settings            site mode (oral, axillary, rectal) matched to the probe
  first check         compare against a reference, confirm the probe matches the site, check cover stock
  common false alarm  a wrong reading from a cold probe, the wrong site mode, or a missing or doubled cover

Patient scale
  what it does        weighs a patient standing, seated, in bed, or on an infant tray
  settings            units, and the tare or zero function
  first check         zero empty, then certified weights at a low, middle, and high load
  common false alarm  a weight that jumped overnight: the scale was never zeroed, or something is under it

Bladder scanner
  what it does        measures by ultrasound how much urine is left in the bladder
  settings            patient sex or body mode, and the aim over the midline above the pubic bone
  first check         probe face for cracks and wear, battery, the stored reference or phantom check
  common false alarm  an impossible volume from no gel, a bad aim, or a probe held off the midline

EKG cart
  what it does        records the twelve-lead diagnostic tracing on paper or into the chart
  settings            paper speed 25 mm/s, gain, and the interference and muscle filters
  first check         lead wire and cable continuity, paper and print quality, a simulator on every lead
  common false alarm  a lead-off message or one flat lead, which is a broken wire and not a patient finding

Centrifuge
  what it does        spins tubes so a sample separates into layers by density
  settings            speed in revolutions per minute, time, and sometimes temperature
  first check         speed with a tachometer, timer accuracy, lid interlock, rotor for cracks
  common false alarm  an imbalance alarm or a shake that is a real warning: stop and check the load
\`\`\`

## Why the thermistor matters
A thermistor is a resistor whose resistance changes predictably with temperature, so the device is really an ohmmeter with a lookup table. Two consequences follow. First, a probe is part of the measurement, so a probe from another model, or a damaged cable, gives a confident wrong number rather than an error. Second, probe covers are not only hygiene: the manufacturer calibrated the device expecting that thin plastic layer, and a missing or doubled cover shifts the reading.

## Why zero comes before weights
A scale has an offset and a span. Zeroing fixes the offset, so an unzeroed scale is wrong by the same amount at every load, which looks like a plausible weight and is not. Checking with certified weights at three loads tests the span across the range, since a cell can be perfect at 20 kg and off at 150 kg. The weights carry their own calibration due date, and so does the reference thermometer and the tachometer: a check made with an expired standard proves nothing.

## The centrifuge is the one that can hurt you
Everything else in this lesson shines light or reads a resistance. A centrifuge stores real kinetic energy. An unbalanced load or a corroded rotor at thousands of revolutions per minute can throw a rotor through the lid, which is why tubes are loaded in balanced pairs opposite each other, why the lid interlock must hold the lid closed until the rotor stops, and why the rotor gets inspected for cracks and corrosion at every inspection rather than when somebody complains.`,

u6l2: `## One box, several measurements
A bedside monitor is a bundle of unrelated instruments sharing a screen, a power supply, and one alarm system. Diagnosing one means naming the parameter first, because each channel fails in its own way.

\`\`\`
ECG and heart rate
  what it does        amplifies the heart's millivolt signal and counts the QRS to report a rate
  settings            lead selection, gain, high and low rate alarm limits, filters
  first check         electrodes and lead wires end to end, then a simulator at known rates
  common false alarm  asystole or lead-off from a dried-out electrode or a broken lead wire

Non-invasive blood pressure
  what it does        inflates a cuff and reads the oscillations to report systolic and diastolic
  settings            cuff size, cycle interval, initial inflation pressure, alarm limits
  first check         cuff size for the arm, hose and cuff leak test, pressure against an analyzer
  common false alarm  a wild or failed reading from a moving arm, or a high reading from a small cuff

Pulse oximetry
  what it does        shines red and infrared light through tissue to compute oxygen saturation
  settings            averaging time, alarm limits, probe site and type
  first check         probe and cable for cracks, then a simulator or finger phantom
  common false alarm  low saturation or no pulse from motion, cold hands, poor perfusion, nail polish

EtCO2 (capnography)
  what it does        measures carbon dioxide in exhaled gas and reports the end-tidal value
  settings            sidestream or mainstream, alarm limits, sample flow
  first check         calibration gas or a gas analyzer, the water trap, the sample line
  common false alarm  a falling or flat waveform from water or secretions blocking the sample line

Temperature
  what it does        reads a thermistor probe on the surface or inside the body
  settings            probe type and site, alarm limits
  first check         a resistance box or reference thermometer at two points
  common false alarm  a reading near room temperature because the probe fell off the patient

Telemetry
  what it does        sends the same measurements by radio to a central station
  settings            transmitter channel or pairing, patient and bed assignment
  first check         battery, antenna coverage, then a simulator through the transmitter
  common false alarm  dropouts read as a rhythm change when the cause is a battery or a coverage hole
\`\`\`

## The numbers worth memorizing
\`\`\`
Parameter          Normal adult value           Hard fact to carry
heart rate         60 to 100 beats per minute   the monitor counts the QRS complex
blood pressure     about 120/80 mmHg            a cuff too small reads high
SpO2               95 to 100%                   red about 650 to 660 nm, infrared about 805 to 940 nm
EtCO2              35 to 45 mmHg                sidestream needs a water trap
respiratory rate   12 to 20 breaths per minute  measured as changing impedance across the ECG leads
temperature        37 C = 98.6 F                a thermistor is a resistance measurement
\`\`\`

## Alarm fatigue is a technical problem too
It is tempting to file alarm fatigue under human behavior, but much of it is in your hands. Default limits that arrive from the factory too tight, a speaker that has gone quiet, an alarm priority set wrong so a technical message sounds like a crisis, a telemetry patient whose transmitter battery dies every shift: each one trains staff to ignore sound. Verifying that alarms are audible at the volume the unit actually uses, that defaults match what the department agreed, and that networked alarms reach the central station is part of a monitor inspection, not an optional extra.`,

u6l3: `## What a simulator is, and what it is not
A patient simulator is a signal source. It presents, at its terminals and connectors, electrical and optical patterns that imitate a patient to a known specification, so that any difference between what it sent and what the monitor displays belongs to the monitor.

\`\`\`
Simulator output     How it imitates the patient
ECG rhythm and rate  a millivolt waveform at a selected rate, amplitude, and rhythm
arrhythmias          asystole, ventricular fibrillation, ventricular tachycardia, atrial fibrillation
SpO2                 a finger-shaped optical device that answers the probe's own light
NIBP                 a pressure source that presents the pulses a cuff would feel
temperature          the resistance a thermistor probe would have at a chosen temperature
respiration          a changing impedance across the ECG leads, as a breathing chest produces
\`\`\`

The exam point that catches people: a simulator draws essentially no current and never touches the mains side of the device, so it cannot say anything about ground resistance, chassis leakage, or patient lead leakage. Performance and safety are two different questions answered by two different instruments, and the safety test comes first so you are not standing over a device whose ground may be open.

## The tolerance is the test
A verification without a limit is a vibe. Every reading you compare needs a number from the service manual, and typical monitor tolerances are tighter than people guess.

\`\`\`
Parameter    Typical published tolerance      What a failure looks like
heart rate   plus or minus a few bpm          reads 66 when the simulator sends 60
SpO2         a couple of percent              reads 92 when the simulator sends 97
NIBP         a few mmHg on each number        reads 131/88 when the simulator sends 120/80
temperature  a few tenths of a degree         reads 36.2 C against a 37.0 C input
\`\`\`

Compute error as **reading minus known input** and keep the sign. Plus means the monitor reads high. Keeping the sign across years of records is what turns a file of passing inspections into a drift you can act on before it fails.

## The order, and why each step sits where it does
Visual first, because a cracked connector or a crushed cable ends the inspection cheaply. Cables and lead wires next, because they are the most common fault in the whole device and because a broken lead wire will make every later measurement lie. Electrical safety third: it is a pass or fail gate, and a device that fails it goes no further. The simulator fourth, when you know the device is safe and its accessories are sound. Alarms last, because an alarm check is only meaningful once the measurements are trustworthy.

Two alarms are always checked by name. **Asystole**: set the simulator to a flat line and the monitor must read zero and alarm. **Ventricular fibrillation**: set it and the monitor must alarm. A monitor that measures beautifully and never alarms is more dangerous than one that does not work at all, because nobody is watching it.

## The record
Write the simulator setting and the monitor reading side by side, with the tolerance each was judged against, the simulator and analyzer used with their calibration status, the date, and your name. That table is the evidence that the inspection happened and the baseline the next one is compared with.`,

u6l4: `## The family, in one table
Every infusion device moves fluid at a controlled rate. What changes is the volume, the precision, and who is allowed to press the button.

\`\`\`
Large-volume infusion pump
  what it does        drives fluid or medication from a bag through a set into a vein
  settings            rate in mL/h, VTBI, KVO rate, and the drug library entry
  first check         flow accuracy by timed collection, occlusion and air-in-line alarms, battery
  common false alarm  air-in-line from a set that was purged carelessly at setup

Syringe pump
  what it does        pushes a syringe plunger to deliver very small, very precise volumes
  settings            rate, and the syringe brand and size the pump must be told
  first check         the correct syringe profile is selected, then flow accuracy at a low rate
  common false alarm  an occlusion warning that is really a plunger not seated in the driver

PCA pump
  what it does        delivers a dose when the patient presses the button, within limits
  settings            dose, lockout interval, hourly or four-hourly maximum
  first check         lockout timing, the lock and key control, and the dose history log
  common false alarm  "the pump is ignoring the button" is usually the lockout working as designed

Enteral feeding pump
  what it does        delivers formula into the stomach or intestine, never into a vein
  settings            rate and volume, with ENFit connectors on the set
  first check         flow accuracy, the pumping mechanism, and the set path for dried formula
  common false alarm  a no-flow alarm from formula that has thickened or a kinked set
\`\`\`

## Why the set matters as much as the pump
A peristaltic pump does not measure fluid. It squeezes a known tube a known amount a known number of times and trusts that the tube is the one it was calibrated for. Change the internal diameter or the wall thickness and the delivered volume changes with it, which is why a pump is only accurate with its own administration sets and why "we used a different set, it fits fine" is a dosing error waiting to be discovered. The set is also the only part in the fluid path, which is why it is single use and why the pump itself never needs sterilizing.

## Three numbers and two alarms
\`\`\`
Term        Meaning                                               A wrong entry causes
rate        mL/h, how fast the pump delivers                      the wrong dose per hour
VTBI        volume to be infused, the total before it stops        an infusion that ends too early or runs long
KVO         keep vein open, the trickle after the volume finishes  a clotted line if it is set to zero
occlusion   pressure above the threshold                          a closed clamp, a kink, or a blocked site
air-in-line the ultrasonic detector saw bubbles                    a set purged poorly, or a bag that ran dry
\`\`\`

## Free flow, and why the engineering control wins
Gravity will empty a bag in minutes if nothing stops it. Early pumps relied on the user remembering to close a clamp before taking a set out of the pump, and people forget under pressure. Modern sets carry a clamp that closes itself when the set leaves the pumping channel, so the safe state is the default. The same thinking produced ENFit: rather than training everyone never to connect a feeding set to a vein line, the connector was redesigned so it physically cannot happen. When an exam asks why a connector is incompatible, the answer is always that incompatibility is the safety feature.

## What actually fails in a fleet
Batteries, by a wide margin, followed by cases cracked in transport, keypads with fluid under them, and doors or latches worn by thousands of set changes. Runtime on battery is measured against the specification, not guessed, because a pack can hold its voltage and have almost no capacity left. Date the battery you install. Look into the pumping channel for dried residue, which holds the tubing slightly out of position and quietly shifts the flow rate.`,

u6l5: `## The arithmetic, once, carefully
The flow check is three numbers and two formulas, and if you can do them cold you can run the test with a cylinder and a stopwatch.

\`\`\`
Step                 Formula or rule                                 Worked example
convert to a rate    rate = volume / minutes x 60                    62 mL / 30 min x 60 = 124 mL/h
percent error        (delivered minus set) / set x 100, keep the sign (124 - 120) / 120 x 100 = +3.3%
tolerance band       set rate x percent                              5% of 120 = 6, so 114 to 126 mL/h
pass or fail         pass when the size of the error is in the band  +3.3% passes a 5% band
expected volume      rate x minutes / 60                             120 mL/h x 30 / 60 = 60 mL expected
\`\`\`

The collection time is a choice you make, and it has consequences in two directions.

\`\`\`
Collection   Expected volume at 120 mL/h   Effect of a 1 mL reading error
5 minutes    10 mL                          10%, which swamps the pump's own error
15 minutes   30 mL                          3.3%
30 minutes   60 mL                          1.7%, comfortably below a 5% specification
60 minutes   120 mL                         0.8%, and the usual choice for an investigation
\`\`\`

A peristaltic mechanism also delivers in pulses rather than a smooth stream, so a short collection can land on a favorable or unfavorable part of the cycle. Thirty minutes is the common compromise: long enough to average the pulses and shrink your reading error, short enough that a shop can inspect a fleet.

## Volumetric, gravimetric, and the analyzer
\`\`\`
Method          How it measures          Strength                     Weakness
volumetric      graduated cylinder       needs nothing special        meniscus and parallax reading error
gravimetric     balance, 1 g water=1 mL  removes reading error        needs a good balance, and water only
analyzer        automatic flow sensing   fast, also reads occlusion   one instrument shared by the shop
\`\`\`

Read a cylinder with it standing on a flat bench, your eye level with the liquid, at the bottom of the curved surface, to the nearest printed graduation. Choose a cylinder close to the expected volume: a 100 mL cylinder marked every milliliter is a far better instrument for a 60 mL collection than a 1,000 mL cylinder marked every 10 mL.

## The rest of the inspection, and why each item exists
- **Occlusion alarm.** A pump that pushes against a closed line builds pressure and then releases a bolus when the obstruction clears. The alarm threshold and the time to alarm are both specified.
- **Air-in-line.** The detector is ultrasonic and sits around the tubing. Its failure mode is to stop seeing air, which is silent, so it has to be provoked deliberately.
- **Battery runtime.** The single most common reason a pump is unusable on a floor, and the only test that finds a pack with voltage and no capacity.
- **Free-flow clamp.** Open the door with a set loaded and watch the set's own clamp close.
- **Keypad, door, latch, and the pumping channel**, because the mechanism is what makes the number true.

## The record that earns its keep
Set rate, collection time, volume collected, computed delivered rate, percent error with its sign, the acceptance band, and the alarm test results. Next year's technician compares against those numbers, and a pump creeping from +1% to +4% across three inspections is a mechanism wearing out while still passing. Only recorded numbers make that visible.`,

u6l6: `## The device, in one table
\`\`\`
Manual defibrillator
  what it does        delivers a measured shock, chosen by a clinician, to stop a chaotic rhythm
  settings            energy in joules, synchronized or not, pacing rate and current on some units
  first check         delivered energy at low, middle, and maximum, charge time, sync delay, battery
  common false alarm  a pads or cable fault message from a dried-out or expired pad set

AED
  what it does        analyzes the rhythm itself and advises a shock only when one will help
  settings            almost none by design; adult or pediatric pads or a key
  first check         the self-test log, battery date, pad expiry, and delivered energy on the analyzer
  common false alarm  a chirping unit is a failed self-test, usually the battery or the pads
\`\`\`

## Energies, and why there are two numbers
\`\`\`
Setting                 Energy                          Why
biphasic adult shock    120 to 200 J, per the protocol   the current reverses, so less energy does the job
monophasic adult shock  360 J                            current in one direction needs more energy
pediatric settings      lower and weight based           chosen by the clinician; the analyzer verifies them
analyzer load           50 ohm                           the standard stand-in for a chest's impedance
\`\`\`

A biphasic waveform sends current one way and then reverses it partway through the pulse. That defibrillates reliably at lower total energy, with less damage to the heart muscle, which is why nearly everything current is biphasic and why the energy numbers differ by nearly a factor of two between the two technologies. The 50 ohm load is the number to carry: the analyzer is not measuring what the capacitor stored, it is measuring what arrives at a realistic load, which is what the patient would get.

## Modes that confuse people
**Defibrillation** is unsynchronized. The rhythm is chaotic, there is no organized complex, so the shock goes the instant the operator presses discharge.

**Synchronized cardioversion** is for an organized but too-fast rhythm. The unit watches for the **QRS** complex and fires in step with it, avoiding the part of the cycle where a shock could make things worse. The analyzer measures the **sync delay**: the time between the complex it supplied and the discharge it received.

**External pacing** is not a shock at all. It sends small repeated pulses at a set rate and current to drive a heart beating too slowly, delivered through the same pads.

## The daily check and the scheduled inspection
\`\`\`
Who         What they check                                             How often
clinical    present on the cart, self-test or battery indicator good      every shift or every day
staff       pads present and in date, cables attached, paper loaded
technician  visual and cord, electrical safety, delivered energy at       on the scheduled interval
            several settings, charge time, sync delay, pacing, battery
            capacity, paper and pad stock, the event and self-test log
\`\`\`

Expired pads are the most common reason a defibrillator fails at the moment it is needed, which is why a date check costs nothing and is on the daily list.

## The hazard, stated plainly
The energy lives in a capacitor, and a charged capacitor does not care that the power is off, the battery is out, or that you are only looking. Before opening a case, discharge into the analyzer or use the unit's internal dump and confirm it. Before any discharge, call clear and confirm that nobody is touching the patient, the bed, or the paddles. Never discharge into the air or against a bench: with no load the energy has nowhere to go and can damage the unit as well as the person holding it.`,

u6l7: `## Four families, one habit
\`\`\`
Suction (wall regulator or portable pump)
  what it does        applies negative pressure to remove fluid, secretions, or blood
  settings            vacuum level in mmHg, continuous or intermittent
  first check         clamp the tubing, confirm the gauge reaches and holds; compare with a reference
  common false alarm  "no suction" from a full canister, a clogged filter, or a lid seal not seated

Patient warming and cooling
  what it does        delivers warm air, warmed fluid, or temperature-controlled water to hold temperature
  settings            target temperature and a separate high limit
  first check         temperature accuracy at setpoint, then the over-temperature cutoff on its own
  common false alarm  an over-temperature trip caused by a kinked hose or a blocked filter, not a bad heater

Sequential compression device
  what it does        squeezes the legs in a timed cycle to keep blood moving and prevent clots
  settings            pressure and cycle time
  first check         pressure against a reference gauge, cycle timing, sleeve and tubing leaks
  common false alarm  a low-pressure alarm from a cracked connector or a sleeve applied too loosely

Physical therapy equipment
  what it does        TENS sends pulses for pain, therapeutic ultrasound warms deep tissue, CPM moves a joint
  settings            amplitude and rate; intensity and time; range of motion and speed
  first check         output against the display with the right meter, electrodes and cables, the timer
  common false alarm  "no output" on a TENS unit is nearly always electrodes, leads, or the battery
\`\`\`

## Suction, in numbers and in order
Suction is a pressure measurement below atmosphere, read in mmHg on the regulator's gauge. The hospital's piped vacuum arrives at the wall outlet, and the regulator's job is to limit it to a clinically safe level and to switch between continuous and intermittent. Portable units carry their own pump, motor, and battery for transport and for rooms with no piped vacuum.

The check order follows the air path. Clamp at the patient end so no air can enter, then watch the gauge: if it reaches the set level and holds, the device and its path are sound. If it will not reach, work back through the lid seal, the canister and its float, the tubing, and the filter, because every one of those is a potential leak and the filter is the usual culprit. Tee a reference gauge in at the patient connection to judge whether the unit's own gauge tells the truth.

## Why thermal devices get two tests
Every warming or cooling device has a control that holds the set temperature and an independent protective device that shuts it down if the control fails. Those are two separate things and they are tested separately, because a device can hold 40 C perfectly while its cutoff is dead, and that device will burn somebody the day the controller fails. Burns are the hazard throughout this family, and they land on patients who are sedated, anesthetized, or too young to report pain, so the labels, the interlocks, and the cutoffs carry real weight. A forced-air warmer hose aimed at bare skin without its blanket is the classic injury.

## The pattern to carry
For all of these, the inspection is: what does it deliver, is the delivered amount accurate against a reference, does the independent protection work, and are the hoses, filters, seals, sleeves, electrodes, and timers intact. The device is usually fine; the disposable or the accessory is usually the fault.`,

u6l8: `## The box, by job
\`\`\`
Tool                        The job                                  The misuse that costs you
Phillips and flat drivers   cross-head and slotted screws            the wrong size, which chews the head
Torx and security bits      medical enclosures meant to stay closed  a flat blade in a Torx screw
Allen keys, metric and SAE  socket-head screws on covers and shafts  a near-fit key, which rounds the socket
nut drivers                 hex-head screws and board standoffs      pliers instead, which marks the hardware
torque wrench               any fastener with a printed value        using it as a breaker bar
channel locks               large round fittings and nuts            turning finished hardware with them
needle-nose pliers          reaching, holding, bending small parts   cutting hard wire with the tips
diagonal cutters            cutting wire and cable ties flush        prying or twisting with them
wire stripper               insulation off at the right gauge notch  a knife, which nicks the copper
crimper                     terminals and connectors onto conductors a crimper that does not match the terminal
vice grips                  clamping a part or a frozen fastener     using them as a wrench on good hardware
soldering iron              joining wire and repairing a connection  heating the solder instead of the joint
\`\`\`

## Torque, explained once
Torque is twisting force, read in inch-pounds or newton-meters, and a printed torque value exists because the designer calculated what the joint needs. Too little leaves a fastener to walk out under vibration, a gasket to weep, or a heat sink to lose contact with the chip it is cooling. Too much strips a thread in aluminum, cracks a plastic boss, crushes a seal so it no longer seals, or bows a cover so the next panel will not line up. A torque wrench is a calibrated instrument, so it reads only while its calibration is current, it gets set back to its lowest setting for storage, and it is never used to break a fastener loose: a sharp overload knocks it out of calibration, and every value you set afterward is a number you cannot defend.

## Measuring tools and the calibration chain
\`\`\`
Instrument           Measures             Used on                      Carries a due date
stopwatch            elapsed time         collections, charge times    yes
graduated cylinder   volume               infusion flow checks         no, but it has a stated accuracy
tachometer           speed in RPM         centrifuges, blowers, pumps  yes
calibration weights  mass                 patient and infant scales    yes
digital multimeter   volts, amps, ohms    everything electrical        yes
safety analyzer      ground and leakage   every mains-powered device   yes
patient simulator    monitor performance  monitors and recorders       yes
\`\`\`

This is the idea behind the whole column on the right: a measurement is only as good as the thing you compared against. An out-of-calibration analyzer that reads 400 microamps when the true value is 600 will pass a device that should fail, and the record of that test is worthless, because nobody can say which way it was wrong. Check the sticker before you check the device, and if the sticker is expired, swap the instrument rather than noting it later.

## Care and the quiet failures
Wipe tools down when they leave a patient area and keep them dry. Inspect them like anything else: a chewed screwdriver tip damages every screw it meets, a split insulated handle is no longer insulated, a stretched crimper no longer crimps to spec, and a cracked plastic case on a meter is a path for a finger to somewhere it should not be. Keep each tool in its place so you notice when one is missing, which matters most when the missing one was left inside a device.

A good solder joint is shiny, smooth, and concave where it meets the pad, with the wire's outline visible under it. A dull gray ball sitting on the pad is a cold joint: it will conduct today, fail intermittently in six months, and be found by somebody else. Heat the joint, let the joint pull the solder in, and keep the iron away from plastic connectors and nearby components.`,

u6l9: `## The two lists, side by side
\`\`\`
Step  Incoming inspection (once, before first use)   Scheduled maintenance (every interval)
1     packing slip against the purchase order        confirm the interval and the written procedure
2     physical inspection for shipping damage        visual: case, cord, plug, strain relief, labels
3     accessories, batteries, manuals accounted for  clean the device and its filters
4     asset tag and the CMMS record created          electrical safety test against the limit and last year
5     electrical safety test: the baseline readings  function and performance against the manual
6     function test from the manual                  replace the listed consumables and date them
7     configuration: alarms, clock, network, library  calibrate what the manual permits
8     user training or in-service if the model is new apply the inspection label with the due date
9     release, with the inspection label and record  document readings, limits, parts, time, pass or fail
\`\`\`

## Why the order is the answer
Exam questions about these procedures almost always ask what comes first or what comes next, and the ordering has a logic worth holding.

Paperwork and eyes come before power because they are the only steps that can still be undone cheaply: a wrong model can go back, a shipping-damaged unit is the carrier's problem, and powering a damaged device can turn a claim into a repair you own. The asset tag and the record come before testing because the test results need somewhere to live and the tag is how they are filed. The electrical safety test comes before the function test because it is a gate: a device that fails it is not going to be configured and released, whatever else it can do. Configuration comes after the function test because you set what you have proved works. Training comes before release because an unfamiliar device generates a month of false service calls, each one logged against the device as a fault it never had.

## The baseline, and what trending buys you
The safety numbers you record at incoming inspection are the device's own history starting at zero hours. Every future test is compared with the limit and with that baseline. A pump that read 0.08 ohm and 40 microamps when new and reads 0.3 ohm and 320 microamps three years later is still passing and is also telling you that a cord is failing and insulation is aging. That is a part replaced on a Tuesday instead of a device removed from a patient's room on a Saturday, and it is only available if somebody wrote the numbers rather than the word "pass".

## PM due, windows, and completion
\`\`\`
Term             Meaning
interval         how often the device is inspected, from the manufacturer, the risk, and the program
PM due date      the date the next inspection is scheduled for
window           the period around the due date in which it still counts as on time
overdue          past the window: a real risk and a finding at a survey
completion rate  the share of scheduled inspections closed inside their window
\`\`\`

Completion rate is reported to leadership and read by surveyors, and because it is computed from closed work orders, the inspection you performed on Thursday and never closed counts as not done. Devices also go missing, which is why locating equipment is part of the job and why a hospital with a real-time location system uses it most for exactly this problem. If a device cannot be found, the record says so, in writing, with what you did to look for it.`,

u6l10: `## The list, and the reason each item is on it
\`\`\`
Order  Check                      Why it is this high on the list
1      power at both ends         loose plug, switch off, flat battery: the most common cause by far
2      the outlet itself          a known-good device in the same receptacle settles it in 30 seconds
3      device fuse or breaker     cheap to check; and a blown fuse is a symptom, so ask why
4      cables and connectors      cables fail at the ends from flexing, and reseating costs nothing
5      swap the accessory         splits the problem in half: accessories fail far more than devices
6      user or device             watch the task performed; most calls are setup, supplies, or settings
7      the error code             the manufacturer's own troubleshooting map, in the service manual
8      restart                    fixes a surprising amount, and erases evidence, so record first
\`\`\`

## Probability, not laziness
Working a list in order looks unambitious next to opening a case and measuring, and it is the right thing to do because the common causes are common. Checking power costs half a minute; opening a case costs an hour, risks damage, voids some contracts, and often ends with the discovery that the battery was flat. The same thinking explains **change one thing at a time**: if you replace a lead wire, a cable, and an electrode set together and the fault clears, you have fixed the symptom and learned nothing, and you have no idea which part to stock.

## The swap test
Substitution is the most powerful simple test you own, because it divides the system in two. A known-good probe, lead wire, cuff, hose, sensor, or administration set either fixes the problem or does not, and either answer is progress. It works in the other direction too: a device that misbehaves on one floor and behaves on your bench points at the room, the outlet, the network jack, or the way the device is being used, not at the device.

## User and device are not opposites
A call that resolves as a setup step is a successful call, not a wasted one, and the way you handle it decides whether that nurse calls you next time. Ask what happened in plain language, ask them to show you, and never make anybody feel foolish about a machine. Then write it down as what it was: three "no fault found" notes from the same unit about the same step is a training need somebody can fix, and the only way it surfaces is if the notes exist.

## Scope, escalation, and leaving it safe
\`\`\`
Stop and escalate when                       Because
you need a tool, password, or software        guessing with the wrong tool makes a repair into a replacement
the device is under a service contract        an unauthorized repair can void coverage
high energy is involved                      a defibrillator capacitor or an imaging supply can kill you
you have not been signed off on the device    competency lists exist for a reason
you simply do not know                       a question costs nothing; a guess near a patient can cost everything
\`\`\`

When you stop, leave it safe: tag the device out of service with a clear label, remove it from the patient area if somebody might grab it in a hurry, tell the unit what you did and what happens next, and write the whole thing up including what you ruled out. Three instruments answer most first questions: the **DMM** for voltages, continuity, and resistance with the power off; the **safety analyzer** for whether the device is safe to be near a patient; and the **patient simulator** for whether a monitor is telling the truth.`,

u7l1: `## The parts, and the symptom each one produces
\`\`\`
Part            What it does                        How it fails, and what you see
CPU             runs the instructions               overheats when its fan or heatsink clogs: slow, then off
RAM             fast volatile working memory        random crashes with no pattern; contents lost on power loss
hard drive      magnetic platters, moving heads     clicking or grinding, then data loss; dies when bumped
solid-state drive  flash storage, no moving parts   fails without warning but survives carts and drops
GPU             draws the display                   artifacts, blank screen, or poor imaging performance
power supply    converts wall AC into low-voltage DC  random reboots, no start at all, a burnt smell
motherboard     carries the connections between parts  one subsystem dead while the rest works
BIOS or UEFI    starts the hardware, finds the boot device  a wrong clock, and on older machines a lost boot order
operating system  manages hardware, runs applications  slow, crashing, or will not start after a change
drivers         let the system talk to one device    printing, scanning, or serial access broken after an update
\`\`\`

## Volatile, and why it matters at a bedside
**Volatile** means the contents vanish when power is removed. Working memory is volatile; storage is not. The distinction explains behavior you will see on real devices: a monitor that loses its trend data in a power loss but remembers its alarm defaults has lost volatile memory and kept non-volatile settings. It also explains why "it forgot everything, including the date" is a different fault from "it lost a file": the first is a dead coin cell holding the firmware's settings, the second is storage.

## The printing fault nobody checks
\`\`\`
Printer type     Connection          What to check first
local            USB to one machine  the cable, then the print queue on that machine
network          its own IP address  the queue, then whether the printer answers a ping
\`\`\`

A job goes into a **queue** before it goes to the printer, and a stuck job blocks every job behind it. The user sees "it is not printing" and reports a broken printer; the printer is usually fine. Clear the queue first.

## The embedded computer, and the rule that protects you
The computer inside a monitor, pump, or analyzer is part of a regulated medical device. The manufacturer wrote the software, validated it against the device's specifications, and holds the clearance that allows the device to be used clinically. That has three consequences.

First, **updates come from the manufacturer, validated, and go on with your department's approval**. An unapproved patch, an antivirus product the maker does not support, or a driver from a general-purpose source can take the device out of specification, out of service, or out of compliance, and the fact that it was well intentioned is no defense.

Second, the configuration is part of the device. Alarm defaults, drug libraries, calibration constants, network settings, and the device's own name live in that computer, so a board replacement or a factory reset means restoring the configuration and then re-verifying performance rather than assuming.

Third, many of these devices run software that cannot be updated at all, sometimes for years. That is not negligence, it is the regulatory reality, and the hospital's answer is to put those devices on a protected network segment behind a firewall and watch them. Which is the next lesson but one.`,

u7l2: `## The shapes, in one place
\`\`\`
Connector     Shape to look for                       Where it lives
USB-A         flat rectangle, fits one way            host ports: computers, chargers, hubs
USB-B         squarish with a notched top             printers and older peripherals
USB-C         small reversible oval                   current phones, tablets, laptops, new devices
micro-USB     small thin trapezoid                    handheld meters, older phones, chargers
mini-USB      small taller trapezoid                  older cameras and legacy instruments
HDMI          flat with slightly tapered corners      current displays, carts, projectors
DisplayPort   rectangle with one corner cut, latched   multi-monitor workstations
VGA           blue 15-pin shell, two thumbscrews       older carts, projectors, legacy consoles
DVI           white digital shell, many pins           displays of the generation before HDMI
RJ45          8-pin clip-in jack on twisted pair       network jacks, patch panels, switches
fiber         thin glass, ceramic ferrule in a clip    long runs and isolation between buildings
RS-232 on DB9 9 pins in two rows, thumbscrews          service and data ports on medical devices
\`\`\`

## Why the old ones refuse to die
Serial is the clearest example. **RS-232** on a **DB9** shell is slow, bulky, and ancient, and it is still on monitors, analyzers, printers, infusion pumps, and laboratory instruments, because a medical device has a long regulated life and because serial is simple enough to be reliable. Expect to use it to reach a service menu, pull a log, or feed a strip printer. Carry a serial-to-USB adapter, and remember that the adapter needs a driver, which makes it the thing that stops working after a laptop update.

**VGA** survives for the same reason, and it carries a lesson about analog: a poor or long analog cable does not fail cleanly, it degrades. A soft, ghosted, or shadowed picture on a VGA display is usually the cable, while a digital link either works or shows nothing.

## Twisted pair and glass
\`\`\`
Cable   Carries          Notes
Cat5e   electrical signal  the common workhorse; terminates on RJ45 and patch panels
Cat6    electrical signal  tighter construction for higher speeds over the same distance
fiber   light              long distances, very high bandwidth, complete electrical isolation
\`\`\`

The isolation point matters in a hospital. Copper between two buildings can carry a difference in ground potential, and a lightning strike on one building has a path into the other. Glass carries no current at all, which is why building-to-building links are fiber.

## Power connectors, and the one that is a safety issue
Most medical devices take a detachable mains cord: a hospital-grade three-prong plug at the wall and the common rectangular appliance connector at the device. Because the cord detaches, it is a replaceable part, and because it is the part that gets run over by beds and wheels, it is also the most common failure on an electrical safety test. Low-voltage supplies use barrel plugs that vary in diameter (outside and inside), voltage, and polarity. Check all three: a plug that fits mechanically and carries the wrong voltage or polarity destroys the device it fits.

Never use a three-prong to two-prong adapter on patient-care equipment. It defeats the protective ground, which is the conductor the whole electrical safety test exists to verify.

## Care, and the honest truth about adapters
Cables fail at the ends, where flexing concentrates. Support the weight so a connector never carries the cable's own hanging mass, use the molded strain relief rather than pulling on the cable body, coil loosely without kinking, keep cables out of hinges and wheels, and pull a plug by its shell. An adapter solves a shape mismatch and occasionally a signal conversion, and every adapter adds a connection that can fail intermittently; a passive adapter cannot create a signal the source never produced. One correct cable beats two adapters.`,

u7l3: `## The words, in the order you need them
\`\`\`
Term             What it is                                        Where you meet it
LAN              one building or campus network                     the hospital's own wiring
WAN              links separate sites across distance               a clinic reaching the data center
switch           connects wired devices inside a LAN                the box in the floor closet
router           joins two networks together                        between the device segment and the rest
default gateway  the router's address on your network               the third line of an ipconfig
IP address       the device's own address                           on every networked device and server
subnet mask      says which part of the address is the network      255.255.255.0 is the common one
DHCP             hands out addresses automatically                  workstations, and devices by reservation
static address   typed in and never changes                         servers and central stations
DNS              turns names into addresses                         when the address works and the name does not
VLAN             a separate logical network in the same switches    the medical device segment
VPN              an encrypted tunnel across an untrusted network    vendor remote service access
WMTS             radio bands reserved for patient telemetry         telemetry transmitters and antennas
IDF              the floor closet feeding the wall jacks            where you report a dead jack
MDF              the building's core data room                      servers and the circuits that leave
patch panel      where every wall jack terminates                   one short cable per jack to a switch port
\`\`\`

## The subnet rule, worked
This is the single most useful piece of network arithmetic for a technician, and the exam leans on it.

\`\`\`
Station         10.20.4.57       mask 255.255.255.0
Another monitor 10.20.4.90       same first three numbers: same subnet, talks directly
Telemetry server 10.20.9.20      different third number: another subnet, goes through the gateway
Gateway         10.20.4.1        the router's address on the station's own subnet
\`\`\`

A mask of 255.255.255.0 means the first three numbers identify the network and the last identifies the device inside it. Two devices with the same first three numbers can reach each other through the switch alone. Anything else leaves by the gateway. That one rule tells you whether a problem could possibly be local.

## Reading ping and ipconfig like a technician
**ipconfig** gives you three numbers: the address, the mask, and the gateway. Everything else depends on them, so it is always the first command.

**ping** then answers a yes or no question in two stages. Ping the **gateway** first. Four replies with no loss proves the station, its cable, the wall jack, the patch cable, and the local switch path are all working; a failure there means the fault is in the room and is yours to chase. Then ping the destination. Loss or timeouts to a server while the gateway is clean is evidence that the fault lies beyond the router, on the network, and the right move is to hand IT the output with the jack number rather than swapping cables that have just been proved good.

\`\`\`
Gateway result   Destination result   What it means
replies, 0% loss  replies, 0% loss     the network path is fine: look at the application or the server
replies, 0% loss  timeouts or loss     the fault is beyond the gateway: report it to IT with the output
no reply          not tested yet       local: cable, jack, switch port, or the station's own settings
\`\`\`

## Wireless, and the two bands
The **SSID** is the name a wireless network broadcasts. The **2.4 GHz** band travels farther and through more walls but is crowded and slower; the **5 GHz** band is faster with more usable channels and less interference but covers less ground. Both are secured with **WPA2** or **WPA3**. The diagnostic value is this: a device that misbehaves in one place and works everywhere else is a coverage problem, while a device that misbehaves everywhere is a device problem.

**Bluetooth** pairs over a few meters for a printer, probe, or scanner. **RFID** tags are read by antennas for inventory and asset tracking, and a hospital-wide **RTLS** built on them is how a department finds a pump that has been pushed into a linen closet.

## Why devices get their own VLAN
Many medical devices cannot be patched, cannot run current security software, and will outlive several generations of office computers. Putting them on their own logical network limits what can reach them and limits what they could reach if compromised. The practical consequences for you: those devices often cannot see the internet, a vendor cannot just connect from home, and moving a device to a convenient jack can land it on the wrong segment, where it will look broken while being perfectly healthy. Device network changes go through IT, with the device's requirements written down.`,

u7l4: `## The phone as a shop tool
\`\`\`
Use                      What it saves you                       The rule attached to it
CMMS mobile app          closing work orders where you did them   close it there, not from memory later
barcode or QR scanning   typing an asset number wrongly           scan the tag rather than reading it aloud
PDF manuals offline      a walk back to the shop for a manual     keep the ones you use stored locally
camera on equipment      a paragraph of description               never a patient, never a screen with data
email and messaging      a phone call nobody answers              asset numbers, no patient details
calendar                 a missed in-service or vendor visit      put the follow-up in before you leave the floor
authenticator app        a locked account at the worst moment     set it up on day one
\`\`\`

## The photograph rule, stated carefully
A photograph of a cracked housing, a burnt connector, a model and serial label, or a wiring layout before you disconnect it is genuinely useful documentation, and it belongs attached to the work order. Two things make it a privacy incident instead: a patient in the frame, and a screen or paper showing patient information in the frame. The second is the one that catches people, because the thing being photographed is the device and the thing in the background is a monitor with a name on it. Look at the whole frame, including reflections in glass and polished surfaces, before you tap. If in doubt, move the device or turn the screen.

## Phone hygiene, and how you look doing it
Your phone goes everywhere you go, including into rooms on precautions and onto bed rails. Wipe it with an approved disinfectant wipe the way you wipe a meter, and keep it in a pocket rather than your hand at a bedside: a patient and a nurse cannot tell the difference between reading a manual and texting, and the impression is part of your professional standing. Silence it before a procedure room. In an **MRI** environment a phone is just another ferromagnetic object and stays outside the magnet room with your tools.

## Permissions, updates, and whose device it is
\`\`\`
Question                        The answer to carry
what should an app reach?       only what its job needs: a scanner needs the camera, not your contacts
where do work apps come from?   the hospital's catalog or the official store, never a sideloaded file
who updates them?               you do, promptly, for phones and apps; devices are a different rule
personal or work device?        if it is enrolled, the hospital can enforce rules and wipe work data
where does hospital data live?  in hospital apps and systems, never personal cloud, mail, or messaging
lost or stolen phone?           report it the same day, before anything else
\`\`\`

The last three lines are the ones that cause real trouble. Moving a device log, a service record, or a photograph into a personal account feels harmless and creates an uncontrolled copy of hospital data, which is exactly what the security rule exists to prevent. An enrolled personal phone is a compromise both sides accept: the hospital gets to require a passcode, encryption, and the ability to remove its own data, and you get to carry one phone. Know which arrangement you are in before you put anything on it.

## The habit that matters most
Of everything in this lesson, closing a work order where the work happened is the one that changes a department. Notes written at the bedside contain the error code as it appeared, the readings as you took them, and what the user actually said. The same note written at four in the afternoon from memory contains none of that, and in a week it contains nothing at all.`,

u7l5: `## What is protected, and what the rules require
\`\`\`
Idea                 What it means for a technician
PHI                  health information tied to a person: names, dates, numbers, images, screen readings
minimum necessary    use the device, its settings, logs, and asset number; not the patient's diagnosis
privacy rule         governs who may see and share PHI, and under what conditions
security rule        requires administrative, physical, and technical safeguards for electronic PHI
administrative       policies, training, access reviews, agreements with outside companies
physical             locked rooms, screen placement, control of devices and media
technical            passwords, encryption, audit logs, automatic screen locks
breach reporting     notifications with deadlines; your duty is to report at once, not to fix it quietly
\`\`\`

Curiosity is the violation people do not expect. Opening a chart to see how a patient you met is doing has no bad intent and is still a privacy violation, because access is audited and the standard is what your job requires, not what you meant.

## The path from a device to the chart
\`\`\`
Stage         What happens
device        a monitor, pump, or ultrasound produces readings or a study
network       the data crosses the hospital network, usually from the device segment
interface     an interface engine or middleware server translates and routes the message
EMR           the data lands in the patient's electronic chart, attached to a patient and an encounter
\`\`\`

**HL7** is the messaging standard those interfaces have spoken for decades; recognize the name and know it carries patient and clinical data between systems. **Barcode patient identification** is how the data gets attached to the right person: a nurse scans a badge, a wristband, and the device or medication, and the match is the thing that makes the record true. An **admit, discharge, and transfer** feed keeps every system agreed on who is in which bed.

The technician's takeaway is blunt: an integrated device assigned to the wrong patient or the wrong bed does not produce a blank chart, it produces a wrong one, in somebody else's record, where a clinician will act on it. Confirming the patient and bed assignment is part of installing, moving, or returning any integrated device, and it is a step worth saying out loud to the nurse.

## PHI lives on your equipment
\`\`\`
Device                 What it stores
patient monitor        trends, alarm history, sometimes names and bed assignments
infusion pump          infusion logs with times, doses, and sometimes patient identifiers
ultrasound and imaging  studies with patient names and dates attached
defibrillator          event recordings of an actual resuscitation
workstations and carts  everything a computer stores, including cached records
\`\`\`

So a device leaving the hospital is a data problem before it is a logistics problem. Trade-in, a loaner going back to a vendor, a unit shipped to a depot for repair, a machine headed for disposal: each one needs the stored patient data cleared by the manufacturer's documented procedure, or the drive wiped or physically destroyed by whatever process your facility approves, with the certificate or the record kept. "We assumed it was empty" has produced real, reportable, expensive breaches.

## Screens, pictures, and outside companies
Turn displays away from corridors and waiting areas, lock a workstation whenever you step away, and never walk off leaving a service menu open on a record. Photograph equipment, never patients or screens, and check the whole frame. And an outside service organization whose technicians will handle PHI must have a **business associate agreement** in place before the work starts: recognize the term, know it is a contract that binds the vendor to the same protections, and know that it is signed in advance, not afterwards.`,

u7l6: `## The habits, and what each one stops
\`\`\`
Habit                              What it prevents
firewall at every boundary          traffic nobody authorized reaching something that cannot defend itself
medical devices on their own VLAN   an office infection reaching a device that cannot be patched
do not click, do not reply, report  the single most common way an attacker gets in
validated updates only on devices   taking a regulated device out of service or out of specification
long unique passphrases             one leaked password opening every system you touch
change default device passwords     an attacker using a password printed in a public manual
multi-factor authentication         a stolen password being enough on its own
lock the screen every time          anybody using your access, and seeing PHI on the way past
no unknown USB drives               malware carried in by hand, past every network control
least privilege                     a small mistake or a stolen account becoming a large incident
report immediately                  one machine becoming a hospital-wide outage
\`\`\`

## Phishing, by its tells
\`\`\`
Tell                        Example
urgency                     "your account will be closed today"
false authority             a message that appears to come from an executive or the help desk
a mismatched link           friendly text over an address that goes somewhere else entirely
an unexpected attachment    an invoice, a shipping notice, a service bulletin you did not request
a request for a credential  any message asking you to confirm a password
a reply address almost right  one letter different from the real vendor's domain
\`\`\`

Technicians are targeted with service and parts notices precisely because those are the messages we open without thinking. The defense is procedural, not clever: if a message about a device looks real but unexpected, contact the vendor on the number you already have. And if you did click, report it immediately. Fast reporting is the difference between one workstation reimaged quietly and a hospital on paper charting for a week.

## Patching, split in two
A hospital runs two patching regimes at once, and confusing them is a real error.

Workstations, servers, and phones get patched promptly on the hospital's schedule, because the vendor expects it and nothing is validated against a frozen configuration. Medical devices get **only the manufacturer's validated updates**, on terms the manufacturer and your department agree, because the device's clearance for clinical use rests on the configuration it was validated in. Installing an unapproved patch or an unsupported antivirus product on a medical device can break its performance, void its clearance, and take it out of service, and good intentions are not a defense.

When a device cannot be patched, the controls are compensating ones: the segment, the firewall, monitoring, restricted accounts, and physical control. That is a legitimate answer, and it is the hospital's answer, not yours to improvise around.

## Ransomware, and what you are expected to do
Ransomware encrypts files and demands payment, and in a hospital the effect is clinical: paper charting, diverted ambulances, canceled procedures, and weeks of recovery. It arrives by a clicked link, a stolen credential, or an exposed remote connection, so the ordinary habits in the first table are the actual defense.

If you see something wrong (a ransom message, files renamed, a device behaving strangely after a vendor visit, an account that signed in while you were asleep), report it at once on the number your facility publishes, say what you saw and when, and then follow the security team's instructions. They may tell you to disconnect a device from the network while leaving it powered on. Do not clean it yourself, do not reimage it, and do not power it off unless told to: the record of what happened is inside the machine, and destroying it makes the investigation impossible.`,

u8l1: `## Six employers, compared
\`\`\`
Employer                  The work                              Hires by                      First job?
hospital in-house HTM     whole fleet, mixed bench, scheduled    public postings, referrals,    yes, the usual one
                          maintenance, senior techs to learn from trainee programs
independent service org    contract service across facilities,    postings and agencies,         yes, with more
                          broad exposure, travel, more alone      referrals                      independence early
manufacturer field service one product line, deep, factory        company careers pages,         sometimes, on
                          training, a territory, travel           referrals from reps            simpler product lines
military                   wide fleet, structured training and    enlistment into the             yes, and it trains
                          advancement, rotating assignments       Department of Defense program  you from zero
clinics and surgery        small fleets, often the only tech,     postings, word of mouth        yes, if you are
centers                   more autonomy and judgment                                            comfortable alone
dialysis organizations     large similar fleets, water treatment,  company postings and          yes, very trainable
                          heavy regulation, clear procedures      trainee programs               with clear procedures
imaging service            radiography, fluoroscopy, high voltage  internal moves, specialist     usually later, after
                                                                  recruiting                     general experience
\`\`\`

## Read the title, not just the posting
The same job is advertised under half a dozen names, and searching one of them hides most of the market. Look for biomedical equipment technician, **BMET I** (with II and III above it), medical equipment technician, equipment technician, clinical engineering technician, field service technician or engineer, and the support titles such as equipment support specialist or equipment distribution technician, which handle transports, battery swaps, and simple inspections and are a genuine way in. A hospital with nothing under one title often has three openings under another.

## How hiring really happens
\`\`\`
Route                    What it needs from you
public posting            keywords from the posting, truthfully, in your resume
referral                  knowing one person who already works there, which means talking to people
apprenticeship or trainee  willingness to go where the program is and start at the bottom
veteran hiring program     military service, and a resume that translates military terms to civilian ones
associate degree program   two years, and the clinical rotation that often becomes the interview
the AAMI career center     a credential and a profile that names it
staffing or contract agency availability for a project, which turns into permanent work surprisingly often
\`\`\`

A large share of first biomed jobs come through a referral or a rotation rather than a cold application, and that is not unfair, it is information: hiring managers are trying to reduce the risk of an unknown entry candidate. Anything that makes you known reduces that risk. Go to a local association meeting. Ask a technician for twenty minutes of questions. Follow up with the person who interviewed you even after a rejection, because the second opening is three months away.

## What they are screening for
Not device knowledge. A department expects to train you on its own equipment and its own procedures, and what it cannot train quickly is **safety habits**, **documentation**, and **attitude**. Those three are what every interview question is secretly about: does this person do the safety test the same way every time, will the record be legible and complete a year from now, and will the floors be glad to see them. All three are demonstrable from this course and its labs, which is exactly why the next lesson is about how to show them.`,

u8l2: `## The one-page layout
\`\`\`
Section            What goes in it                                        Lines
header             name, city, phone, professional email                   2
summary            one or two sentences: the credential and what you seek  2
certifications     the CABT with its date, this course's certificate       2
skills             the employer's own words, grouped and specific          6 to 9
experience         any job, with the transferable parts named              3 to 5 each
education          high school, degree or program, relevant coursework     2
\`\`\`

## Skills in the employer's words
The first reader of a resume is often an automated filter and the second is a manager scanning for familiar nouns, so use the terms the posting uses. These are all things this course actually taught and the labs made you do:

\`\`\`
Electrical safety testing   ground wire resistance and leakage currents, NFPA 99 limits, fault conditions
Test equipment              digital multimeter, electrical safety analyzer, patient simulator, tachometer
Preventive maintenance      written procedures, consumables, inspection labels, due dates and windows
Incoming inspection         purchase order check, safety baseline, function test, asset tagging
Documentation               work orders, readings with units and limits, equipment records in a CMMS
Device families             infusion pumps, patient monitors, defibrillators, suction, scales, warmers
Healthcare IT               connectors and cabling, ipconfig and ping, device network basics
Safety and compliance       lockout tagout, safety data sheets, medical gas handling, infection control
\`\`\`

## The portfolio, and the sentence it buys you
Other entry candidates have a resume. You have recorded measurements. Collect them:

- Safety test records with every condition, the limit each was judged against, and the verdict.
- The pump flow check with the collected volume, the computed rate, and the percent error with its sign.
- Defibrillator delivered energies against the analyzer at several settings, with the allowance rule.
- Monitor verification with simulator settings beside monitor readings and the tolerance applied.
- The incoming inspection walkthrough in order.
- Photographs of your own kit mid-measurement, and the certificate plus the credential.

Then in the interview, when a practical question arrives, you get to say: "I ran that check in my coursework. Here is what I recorded and the limit I compared it against." That one sentence separates a candidate who has read about the job from one who has done a version of it.

## Keywords, references, and your name in a search box
\`\`\`
Item          The standard to hit
keywords      every important noun in the posting appears truthfully somewhere in your resume
honesty       you can discuss every line on the page for two minutes without hedging
references    three people who will answer the phone and know which job you applied for
online        a professional profile naming the credential; nothing public you would not read aloud
file name     your own name and the word resume, not "resume final v3"
format        a plain document or a clean document file that an automated filter can actually read
\`\`\`

Ask references before you list them, tell them which job and what it needs, and thank them whatever the result. Assume a manager will search your name, because they do, and assume the profile that names your credential is also how a recruiter looking for biomeds finds you, because that happens too.`,

u8l3: `## The two halves of the interview
\`\`\`
Half            What it looks like                              What it measures
the questions   why biomed, walk me through a safety test,       how you think and how you talk
                a nurse says a pump is dosing wrong, a mistake
                you made, a difficult person, how you prioritize
the practical   safety test a device, find a fault, read a       what you do with your hands and
                schematic, identify tools on a bench            whether you are safe doing it
\`\`\`

## STAR, and the four stories to have ready
\`\`\`
Letter      What goes in it                            Length
Situation   one sentence of context                     1 sentence
Task        what you were responsible for               1 sentence
Action      what you personally did, step by step       3 to 5 sentences
Result      how it came out, with a number if there is one, and what you learned  1 to 2 sentences
\`\`\`

Prepare four: a mistake you owned and reported, a conflict with a person you handled, a problem you worked out by elimination, and a time you followed a procedure exactly when cutting the corner would have been easier. Those four answer most behavioral questions with a change of framing. Keep each under two minutes, and use real examples from any part of your life, because the pattern is what is being graded.

The mistake question deserves its own note. "I cannot think of one" reads as either dishonest or oblivious. Tell a small true story, and make the structure of the answer: here is what happened, here is the moment I noticed, here is who I told immediately, here is what I changed. The answer they want is that you report things.

## The practical, and what is actually being watched
\`\`\`
Station                 How to handle it                                    What they see
safety test a device    narrate the order: visual and cord, ground           method and safety habits
                        resistance, chassis leakage in each condition,
                        lead leakage if there are applied parts
find a fault            work the first checks out loud: power, outlet,        a system instead of poking
                        fuse, cables, swap the accessory, ask the user
read a schematic        trace the power path and name the parts: fuse,       can you read a drawing
                        switch, transformer, rectifier, resistor, capacitor
identify tools          name the job and the misuse for each one             tool discipline
use the meter           volts across with power on, amps in series,          whether you are safe with it
                        ohms and continuity only with power off
\`\`\`

The four things being judged are the same at every station: **method** (do you have an order and follow it), **safety** (do you check the cord before plugging in, respect a capacitor, ask whether the device has been cleaned), **asking before guessing** ("the manual would give me the tolerance, may I look it up" beats a confident wrong number every time), and **communication** (can you explain to a nurse in plain words what you found and when the device comes back).

## Your questions, and the follow-up
Ask two or three that show you are thinking about the work: how is the scheduled maintenance workload distributed, what does training look like in the first six months, which equipment families would I start on, how does the department handle escalation to a vendor, what does success at ninety days look like. Avoid starting with time off and pay; those belong to the offer conversation.

Then send a short thank-you within a day that names one specific thing from the conversation, and check in once politely after the timeline they gave you has passed. It is a small effort that is remembered far out of proportion to its size.`,

u8l4: `## Ninety days, by theme
\`\`\`
Theme            What it looks like in week 1        What it looks like by day 90
shadowing        follow everyone, write it all down   you are the one being asked a question
the CMMS         open, update, close a work order     your scheduled list is current, closed on time
documentation    readings with units and limits       a stranger could follow your notes a year later
asking           questions about every tolerance      questions about the interesting things only
safety habits    the written order, every time        the same order, without thinking about it
relationships    names on two units and one in IT     floors call you by name and tell you what happened
mistakes         report the first one immediately     you report them as a matter of routine
competencies     ask what is on your list             several device families signed off
\`\`\`

## The notebook
Carry one and use it. Error codes and what the device was doing when they appeared. Part numbers and which vendor sells them. Which floors have which equipment and which manager runs each unit. Where the analyzer, the simulator, and the weights live, and when their calibration is due. The passwords you are allowed to have, kept where your department says they may be kept. Nobody will ask to see it, and inside a month it will make you noticeably faster than anyone expects of a new technician.

## Documentation is the job, not the paperwork about the job
\`\`\`
Write this                                     Not this
"ground 0.09 ohm, chassis 30/44/120/150 uA,     "safety test passed"
limit 500 uA, NFPA 99"
"flow check: 62 mL in 30 min at 120 mL/h set,   "flow ok"
124 mL/h delivered, +3.3%, spec plus/minus 5%"
"error E-14 displayed while priming; set        "intermittent fault"
replaced; code did not return in 30 min run"
"no fault found; user shown set purge steps;    "user error"
device returned to service"
\`\`\`

The left column is a record. The right column is a note that will be useless to the next technician, to a surveyor, and to you in a year. And write it the day you did it, because Friday's reconstruction from memory loses exactly the details that matter.

## Asking, mistakes, and the thing nobody forgives
Ask when you do not know a tolerance, when a manual is ambiguous, when a device is under contract, when the next step needs a tool or training you do not have, and when you are unsure whether something is safe. Senior technicians judge new people by the quality of their questions, not by the absence of them.

And when you make a mistake that touches a patient or a device's safety, report it immediately, in plain words, to your supervisor: what you did, which device, where it is, and what you have already done to make it safe. Hospitals have processes built for exactly this, and they exist to protect patients and to protect you. What ends careers is not the mistake; it is the mistake somebody else discovered.

## Competencies and the review
Your department keeps a training log and a list of signed competencies: the devices and procedures you are cleared to work on alone. Ask what is on yours, ask what it takes to add to it, and work inside it. Then expect a probation review around ninety days measuring attendance, scheduled maintenance completion, documentation quality, safety habits, and how the floors talk about you. Ask for those criteria in week one and ask your supervisor at six weeks how you are tracking, so the review contains no surprises.`,

u8l5: `## The ladder, in one table
\`\`\`
Credential  For                     Eligibility                                 Exam
CABT        proving the             high school junior or above; no experience   100 questions, 2 hours,
            fundamentals            and no degree required                       remote proctored, valid 5
                                                                                 years, non-renewable
CBET        the working technician   full: a qualifying associate degree or       165 questions, 3 hours,
            (what most postings      higher plus 2 years of work, the United      May and November, at test
            name)                    States military program plus 2 years, or     centers, $410 member and
                                     4 years of work alone. Candidate status      $460 non-member,
                                     at the degree, the program, or 2 years       recertified every 3 years
                                     alone, with 5 years to upgrade
CRES        imaging service          imaging service experience                   165 questions, 3 hours
CHTM        managing a program       experience leading an equipment program      a management exam
\`\`\`

## Why the bottom rung expires
The associate credential is valid five years and does not renew, and that looks harsh until you line it up against the next rung's eligibility. Five years of full-time work is more than the four years that qualifies you for full technician certification on work experience alone. So the clock is not a penalty, it is a schedule: by the time the associate credential lapses, you are eligible for the one that replaces it.

\`\`\`
Your situation now                   Candidate status        Full certification
hired with no degree                  after 2 years of work   after 4 years of work
finishing a qualifying associate      at the degree           degree plus 2 years of work
completing the military program       at the program          program plus 2 years of work
\`\`\`

Read your own row, put the date in a calendar, and work backward: the next exam is offered only in **May and November**, at a test center rather than remotely, so a missed window costs six months.

## The branches, and what each one is really about
**CRES** is the imaging branch: radiography and fluoroscopy, where the equipment carries high voltage, ionizing radiation, and consequences measured in patient dose. It is normally taken after real imaging service experience and specialist training, and it pays accordingly.

**CHTM** is the management branch: budgets, capital planning, contracts, staffing, regulation, risk, and the relationship with hospital leadership. It is a different job rather than a harder version of yours.

Both sit above the technician credential, and nobody jumps from the bottom to the top. The shape is: associate, technician, then specialist or manager.

## Membership, continuing education, and the study plan
**AAMI** membership gets you a lower fee on every ACI exam ($50 less on the technician-level exam in 2026), and the real value is the publications, webinars, standards access, and job listings that keep you current. Local and regional biomed associations are worth more for the people than the programs.

Continuing education is a recertification requirement above the associate level and is also the actual mechanism of getting better. In a sensible order: the device families your department owns, your department's own procedures and limits card, the service manuals for your fleet, networking and device integration, then one specialty to go deep in (imaging, laboratory, dialysis, anesthesia, sterilizers). The CompTIA networking certification is a common and well-recognized complement for the technician who wants to be the person in the department who speaks fluently with the network team, and device connectivity is where this work is heading.`
});
