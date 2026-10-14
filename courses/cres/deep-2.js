// CRES Academy deeper explanations, units 5 to 8. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u5l1: `## Reading the spectrum the way a service call arrives
Nobody calls to say the emission spectrum has shifted. They say images are flat, or grainy, or that one room needs more technique than the identical room next door. Each of those is a statement about how many photons arrive and how energetic they are, which is exactly what the spectrum describes. Quantity is the number of photons; quality is their penetrating power, measured in practice as the half-value layer. Hold those two apart and every exposure factor sorts itself out.

\`\`\`
Change                 Quantity        Quality          Why
mA or mAs doubled      doubles         unchanged        more electrons, same energy
kVp raised             rises steeply   rises            faster electrons, harder photons
Added filtration       falls           rises            the soft photons are removed
Target atomic number   rises           rises            heavier nuclei brake harder
Voltage ripple raised  falls           falls            more of the cycle at low voltage
Distance doubled       one quarter     unchanged        inverse square, not production
\`\`\`
Two of those rows are the ones exams exploit. Filtration lowers quantity while raising quality, so an output measurement that is low with a normal half-value layer is a different fault from one that is low with a high half-value layer. And ripple belongs to the generator, not the operator, which is why a technique chart cannot be carried from a single-phase room to a high-frequency room.

## The two production mechanisms, told apart
Bremsstrahlung is a near miss. The electron is deflected and slowed by the nuclear field and radiates whatever energy it lost, so the output is continuous from near zero up to the peak tube voltage. Characteristic radiation is a direct hit on an inner shell. The vacancy is filled from an outer shell and the photon energy is fixed by the difference in binding energies, which is why characteristic lines are discrete and why only tungsten's K-shell transitions, at about 69.5 keV, are diagnostically useful. A tube running at 60 kVp produces no useful characteristic radiation at all, only bremsstrahlung.

## Focal spot, blur, and magnification
The line-focus principle lets a big thermal target act like a small optical source. The electrons land on a long track; the detector, looking up the beam, sees that track foreshortened.
\`\`\`
Actual focal spot      the real area bombarded; sets how much heat can be taken
Effective focal spot   the projected size; sets how sharp the image can be
Target angle           about 5 to 20 deg; steeper gives a smaller effective spot
Line focus example     a track of about 10 mm by 1 mm projects as about 1 mm square
Focal spot blur        blur = effective focal spot x (OID / SOD)
Magnification          MF = SID / SOD, about 1.1 at a 100 cm SID and 1.05 at 180 cm
\`\`\`
Work the blur formula once and the detail complaints stop being vague. A 0.6 mm effective spot with a part 10 cm off the receptor and a 90 cm source-to-object distance blurs about 0.6 x (10 / 90), near 0.07 mm. Double the gap and the blur doubles. That is why pulling the part to the detector beats arguing about focal spot stations, and why a room that has lost its small focal spot station will be reported as soft extremity images.

## What to memorize
- Thermionic emission, space charge, focusing cup, tube current set by filament heating.
- About 1 percent x-rays, 99 percent heat.
- Bremsstrahlung continuous and the bulk of the beam; characteristic discrete, tungsten K-shell about 69.5 keV.
- mA changes quantity only; kVp changes both; filtration lowers quantity and raises quality; more ripple lowers both.
- Blur equals effective focal spot times object-to-receptor distance over source-to-object distance.`,

u5l2: `## Heat is the whole story
About 99 percent of the energy delivered to the target becomes heat, in a spot a millimeter or two across, at the end of a stalk inside a vacuum. Everything the tube is built from is an answer to that: the high atomic number and high melting point of tungsten, the rhenium that keeps the surface from roughening, the molybdenum or graphite backing that stores heat without weight, the rotation that spreads the track over a whole circumference, the oil that carries it out, the housing that dumps it into the room. Heat leaves in all three ways: radiation from the anode, conduction down the stem and into the envelope, convection in the oil to the housing. The anode sits at its peak for only about 1 to 3 seconds per exposure, but the housing can hold millions of heat units and need an hour or two to come fully down.

## Worked heat unit examples
\`\`\`
Case                                                Arithmetic                 Result
AP pelvis, single phase, 75 kVp, 80 mAs             75 x 80                    6,000 HU
Fluoroscopic run, single phase, 85 kVp, 3 mA, 5 min 85 x 3 x (5 x 60)          76,500 HU
Cervical spine, three phase, 70 kVp, 50 mAs         1.4 x 70 x 50              4,900 HU
Four exposures in that series                       4 x 4,900                  19,600 HU
Any exposure totalling 10,000 HU, put into joules   10,000 x 1.4 J per HU      14,000 J, or 14 kJ
\`\`\`
Two habits keep these right. Convert minutes to seconds before anything else, because fluoroscopic questions are written in minutes and the formula wants seconds. And read the waveform in the stem: the 1.4 factor applies to three-phase and high-frequency equipment, because low ripple keeps the tube near peak voltage for more of the cycle and therefore makes more heat for the same settings.

## Walking a rating chart
A radiographic rating chart is one family of curves, one per mA station, with kVp up the side and exposure time along the bottom, drawn for a stated focal spot and anode speed. To use it:
1. Pick the curve for the mA station you intend to use.
2. Find your kVp on the vertical axis and run across to that curve.
3. Drop to the time axis. That is the longest exposure the tube will accept. Anything shorter is safe; anything longer is not.
4. Check which chart you are holding. The small focal spot and the low anode speed each have their own, and both are more restrictive.

The cooling curves answer the next question instead. Find the heat the anode now holds on the curve, read the time at that point, then read the time where the same curve reaches zero: the difference is the wait. If a chart puts 60,000 heat units at about the four-minute mark and comes to zero at twelve minutes, another eight minutes clears it completely, and far less than that is enough to drop back under a safe level for the next series. The housing curve has the same shape and a far longer clock.

## Failure, and the service judgment
\`\`\`
Symptom                                  Read it as
Output drifts low across every station    filament evaporation, a thinning coil
Output low and inconsistent by station    a pitted or roughened focal track
Tube-arc or overcurrent fault codes       tungsten plated inside a glass envelope
Rotor noisy, slow to reach ready          bearing wear; the end is near
Fails at once after a cold hard exposure  a cracked anode; the warm-up was skipped
\`\`\`
A tube that has given tens of thousands of exposures and is now noisy, slow, and drifting is not a calibration problem. Document the output measurements, the fault history, and the exposure count, and quote the tube.

## What to memorize
- Leakage under 100 mR/h at 1 m; rotor about 3,400 rpm standard, about 10,000 rpm high speed.
- HU = kVp x mA x s single phase, 1.4 x kVp x mA x s on three phase or high frequency, 1 HU about 1.4 J.
- Rating chart clears one exposure; anode and housing cooling curves clear the next series.
- Warm up a cold anode; overheating is the usual cause of early failure; expect at least about 50,000 exposures.`,

u5l3: `## The generator is three promises
Voltage, current, time. Every console control, every interlock, every fault code serves one of the three, and quality control measures exactly those three plus what they produce. The chain is short enough to memorize: supply, line compensation, autotransformer, step-up transformer, rectifier bank, high-voltage cables, tube, with the filament circuit hanging off the side and the timer in series with the whole thing.

## Waveform, ripple, and why it matters at the bench
\`\`\`
Waveform                    Pulses per cycle   Ripple   Voltage stays above
Single phase, half wave      1                 100%     zero
Single phase, full wave      2                 100%     zero
Three phase, six pulse       6                  14%     about 86% of peak
Three phase, twelve pulse   12                   4%     about 96% of peak
High frequency              effectively steady   1%     about 99% of peak
\`\`\`
Low ripple means the tube spends more of the exposure near peak voltage, so for the same kVp and mAs you get more photons and harder ones. Three consequences follow. Technique charts do not transfer between waveforms, and moving from single phase to three phase can mean as much as 10 kVp less for the same receptor exposure. Heat units carry the 1.4 factor on three-phase and high-frequency equipment. And the power rating of a generator is quoted at 100 kVp and 100 ms: for low-ripple equipment it is simply tube current times kilovoltage, so 600 mA at 100 kVp is 60 kW, while a single-phase unit is rated at about 0.7 of that product, which puts 400 mA at 100 kVp near 28 kW.

## Rectification, told as a fault
Unrectified high voltage is an alternating wave. The positive half drives electrons from filament to target as intended. The negative half tries to drive them backward from a target that is not built to emit, and the inverse voltage that results is what kills tubes. Half-wave rectification throws the negative half away: the tube is idle half the time, so exposures are long. Full-wave rectification flips the negative half up and uses it, doubling the pulse rate at the same peak. One failed element in a full-wave bank does not kill the room; it halves the output and raises ripple, which reads as a room that suddenly needs more technique. Measure, do not assume.

## Timers, and what each is good for
\`\`\`
Synchronous   tied to the 60 Hz supply, so times come in multiples of 1/60 s
Electronic    the common type and the most accurate; resets fast for serial work
Mechanical    spring driven, in portables and dental units; the least accurate
mAs timer     ends the exposure on the product rather than on a clock
Automatic     the exposure control; the only one the operator does not set
\`\`\`
Tolerance is 5 percent of the set time above 10 ms and 20 percent at or below 10 ms, measured with a meter rather than trusted from the display.

## The 15 percent rule, and reciprocity
Receptor exposure rises roughly with the square of kVp and linearly with mAs, which is where the working rule comes from: raise kVp by 15 percent and the receptor sees about what doubling the mAs would have given. Run it the useful way round and you cut patient dose: raise kVp 15 percent, halve the mAs, accept less contrast. Reciprocity is the other half of the same idea. 200 mA at 0.1 s and 400 mA at 0.05 s are both 20 mAs and should expose the receptor identically; proving they do is the linearity test, and adjacent mA stations must agree within 10 percent.

## What to memorize
- Supply, compensation, autotransformer, step-up transformer, rectifiers, cables, tube; filament circuit sets mA.
- Ripple 100, 100, 14, 4, 1 percent; less ripple means more quantity and quality.
- Timer tolerance 5 percent above 10 ms, 20 percent at or below; electronic timers are the accurate ones.
- mAs = mA x s, reciprocity, linearity within 10 percent between adjacent stations, and 15 percent kVp equals double mAs.`,

u5l4: `## The exposure control is a measurement, not an opinion
When radiology says a room runs dark, you are being handed a calibration question with no numbers attached. The exposure control ends the exposure when enough radiation has crossed its chamber, so a complaint about density is a complaint about one of four things: what the chamber received, which chamber was listened to, what target it was calibrated against, or whether the exposure was short enough for the chamber to react at all. Phantom exposures through stepped absorber settle it in ten minutes.

## Testing it the way the standard asks
\`\`\`
Test                     Method                              Pass
Density consistency      expose through a thin, a medium,     image density constant
                         and a thick absorber of acrylic      whatever the thickness
                         or aluminum
Cell selection           lead over the selected cell          exposure runs to backup
Backup termination       lead in the beam, chamber starved    ends at 6 s or 600 mAs
Density steps            step up and down one notch           density moves by about
                                                              0.1 and comes back
Minimum response time    shortest achievable exposure         meets the published value
\`\`\`
The density consistency test is the heart of it, because that is the control's whole promise: the same image whatever the patient's thickness. If density climbs with thickness the chamber is being fooled or its calibration has drifted; if density falls, the system is hitting a limit somewhere, often the minimum response time at the thin end or the backup at the thick end.

## Faults that are not faults
Three complaints look electronic and are not.
- **Anatomy off the cell.** The chamber reads whatever sits over it. Lung over a chamber meant for abdomen ends the exposure early and the image comes out light; bare table under the chamber does the same.
- **Collimation across the cell.** Shutters that clip the chosen chamber starve it, so the exposure runs long and the image is dark, sometimes all the way to backup.
- **A missing or wrong grid.** Remove a grid and the chamber fills faster, so the exposure ends early and the contrast is poor; add one where the calibration assumed none and the exposure lengthens.
Each of those is reproducible with a phantom, and reproducing it is how you hand the complaint back as technique with evidence rather than as an opinion.

## Charts and the four factors
A chart exists so the same part gets the same exposure on Monday and Friday. Measure the part with calipers, read the chart, adjust for habitus and pathology. Fixed kVp with variable mAs is the general-purpose form, because holding kVp holds contrast; variable kVp charts change contrast as they change thickness; a high kVp chart is kept for chest work and barium studies above 100 kVp. Then the four factors tell you which complaint belongs to which control.
\`\`\`
Density or brightness   mAs first, then kVp and distance
Contrast                kVp first, then scatter control: grid, collimation
Recorded detail         focal spot, distance, object-to-receptor gap, motion
Distortion              centering, alignment, part angle
\`\`\`
Digital systems add the exposure index and the deviation index, which are the only honest way to find overexposure now that processing makes a dark image look normal.

## What to memorize
- Chambers in front of the receptor; cell selection, density steps of about 0.1, minimum response time, backup at 6 s or 600 mAs.
- Test density through stepped acrylic or aluminum and prove the backup with lead.
- Off-cell anatomy, clipped collimation, and a missing grid all produce density complaints with nothing broken.
- Four factors: density, contrast, recorded detail, distortion; exposure index and deviation index for digital dose.`,

u5l5: `## Everything between the target and the receptor throws something away
The useful beam is a cone of photons aimed at anatomy. The collimator throws away the ones aimed anywhere else, filtration throws away the ones too soft to reach the receptor, and the grid throws away the ones that changed direction inside the patient. Each device has a number attached, and those numbers are the quality control tests.

\`\`\`
Device                  Specification                             How it is proven
Collimator light field  within 2 percent of the SID               coins or markers on a
                                                                  cassette, measured
Positive beam limiting  within 2 percent at every standard SID    repeat at each format
SID indicator           within 2 percent                          tape measure
Total filtration        at least 2.5 mm Al above 70 kVp,          half-value layer
                        1.5 mm from 50 to 70, 0.5 mm below 50     measurement
Half-value layer        meets the minimum for that kVp and        add aluminum until
                        waveform                                  intensity halves
\`\`\`
The 2 percent rule is worth internalizing as a distance: at a 100 cm SID it is 2 cm, which is about a finger's width, and a light field out by more than that is a dose finding, not a cosmetic one. Filtration is the opposite kind of test: you cannot take the layers apart and measure them, so the half-value layer stands in for all of it. If the measured layer is below the minimum for that kVp and waveform, filtration is missing or the tube potential is wrong, and both are serious.

## Scatter arithmetic, and the grid
Scatter grows with kVp, with field size, and with part thickness. The operator owns the first two. Collimating is free and lowers both dose and scatter at once; the grid costs dose but is the only way to clean up what a thick part has already produced.
\`\`\`
Grid term            Meaning                                      Typical
Grid ratio           strip height divided by the gap              4:1 to 16:1
Grid frequency       strips per inch                              60 to 150
Bucky factor         the mAs multiplier a grid costs              rises with ratio and kVp
Selectivity          primary passed compared with scatter passed  higher is better
Contrast improvement contrast with the grid over contrast without 1.5 to 2.5
\`\`\`
A high-ratio grid in a room doing thin extremity work is a dose problem dressed up as quality. A grid missing from a room doing abdomens is a contrast problem that no amount of processing will fix.

## Cutoff, read from the image
\`\`\`
What the image shows                      What was wrong
Density fades along both edges            a focused grid installed upside down
Density low across the whole image        the grid off level, not perpendicular to the ray
Density low at the sides only             a focused grid off center, or the wrong SID
                                          for its focal range
Fine lines across every image             a stationary grid, or a Bucky that stopped moving
Moire or beat patterns on digital         grid frequency against detector sampling
\`\`\`
That table is a diagnosis in one look, which is why it is worth memorizing in the exam's words: edges, everywhere, sides, lines.

## The air gap, honestly
Moving the part away from the receptor lets scattered photons diverge past it, which raises contrast with no grid and no added mAs. The cost is magnification and more focal spot blur, both of which grow with the gap, so it is a deliberate choice for a few exams rather than a general technique. If a room is producing magnified, slightly soft images and someone mentions they stopped using the grid, you have found the trade nobody decided to make.

## What to memorize
- 2 percent of the SID for light field, automatic collimation, and the distance indicator.
- At least 2.5 mm Al total filtration above 70 kVp, proven by half-value layer.
- Scatter rises with kVp, field size, thickness; collimation first, then a grid.
- Ratio 4:1 to 16:1, frequency 60 to 150, Bucky factor is the dose cost, contrast improvement 1.5 to 2.5.
- Cutoff: upside down fades the edges, off level drops everything, off center drops the sides.`,

u5l6: `## Mechanical faults are geometry faults
An imaging room is a precision measuring instrument that someone shoves around all day. The distance from focal spot to receptor, the angle of the tube, the perpendicularity of the grid, and the centering of the field are all mechanical, and all of them are written into the technique chart as assumptions. When a mechanism drifts, nothing announces it. The images change, the radiographer compensates, and the complaint arrives weeks later as a vague loss of quality.

\`\`\`
Mechanism            What it must do                     How it fails          Image result
Table float locks    hold anywhere, release clean        creep, weak detent    inconsistent
                                                                               centering
Elevation drive      hold height under load             sag, drift            SID error
Bucky oscillation    move the grid during exposure      stalled motor or      grid lines
                                                         drive
Receptor tray        center and latch the detector      loose latch           cutoff, clipping
Ceiling rails        travel freely, lock firmly         worn stops, dry       vibration during
                                                         bearings              long exposures
Counterweight cable  carry the tube, always             fraying, broken       a dropped tube
                                                         strand
Collision sensors    stop powered motion on contact     dead sensor           injury or damage
Angle and SID scales read what is actually true         slipped scale,        wrong technique,
                                                         bent pointer          cutoff
\`\`\`

## The inspection habits that matter
Locks and brakes are tested at the extremes, not in the middle: at full extension, at the top of travel, with the tube angled. Cables and chains are inspected along their whole length and at the anchors, where fatigue concentrates, and a single broken strand condemns a cable. Rails and bearings get cleaned and lubricated only as the manual states, because the wrong grease picks up grit and makes the wear worse. Every limit switch, every collision sensor, and every emergency stop is proven by actually tripping it. On powered tables and stands, confirm that motion stops when the control is released rather than coasting.

## Measuring geometry so you can prove it
1. Set the standard distance by detent and measure it with a tape. The indicator must agree within 2 percent of the distance, which at 100 cm is 2 cm.
2. Set zero angle by detent and check the tube with a level; check a 15 and a 30 deg setting against the scale.
3. Put a beam alignment test tool on the receptor, expose, and confirm the central ray is perpendicular and centered.
4. Confirm the light field matches the radiation field within 2 percent, because a collimator that has shifted on its mount fails this even though nothing inside it is broken.
5. Record the numbers. A measured geometry log is what lets you say next quarter whether something moved.

## Handing the right half back
When the evidence says the geometry is good, the remaining variation is positioning and technique, and that belongs to the department. Say it with numbers: the distance indicator reads within 1 cm at 100 cm, the light field is within a centimeter, the alignment tool shows the ray centered and square, the Bucky oscillates on every exposure. That sentence ends an argument that symptom descriptions cannot.

## What to memorize
- The Bucky assembly holds the tray, the moving grid, and the exposure chambers.
- Ceiling supports ride two sets of rails at right angles; floor columns ride a rail or casters; a C-arm holds alignment through any angle.
- SID and angle indicators within 2 percent, measured; light field to radiation field within 2 percent.
- A frayed counterweight cable, a dead collision sensor, and a brake that creeps are safety findings.
- Grid lines mean the Bucky stopped; cutoff and clipping mean alignment or tray; blur in long exposures can be a creeping stand.`,

u6l1: `## Three generations, one vocabulary
Image quality language was invented for film and never replaced, so a question can describe a digital room in film words. Optical density means overall blackening, which on a monitor is brightness. Screen speed means how much image you get per unit of radiation, which is now detector sensitivity and the exposure index. Screen-film contact means the receptor's internal geometry, which is now a flat panel's scintillator bond. Translate once and the old vocabulary stops being a trap.

\`\`\`
Receptor      How the image is held            What goes wrong
Film-screen   light from intensifying screens  processor chemistry and temperature,
              exposes double-emulsion film     screen dirt, poor screen-film contact
CR plate      energy trapped in a storage      dust and scratches printing every image,
              phosphor, read out by laser      incomplete erase ghosts, lost speed
Indirect DR   cesium iodide makes light, an    gain and offset drift, dead lines,
              amorphous silicon array reads it scintillator damage, dropped panels
Direct DR     amorphous selenium makes charge  the same electronics faults, no light
              with no light step               stage to blame
\`\`\`

## Why the film chain needed so much quality control
Everything in a film department could drift: developer temperature, replenishment, immersion time, safelight leaks, screen cleanliness, cassette contact. Sensitometry caught all of it in one daily test. Expose a step wedge with a sensitometer, process it, read it with a densitometer, and compare three numbers with the baseline: a speed index, a contrast or density difference, and base plus fog. Speed and contrast were typically held within about 0.10 of baseline and base plus fog within about 0.05. Mechanical artifacts had their own signatures: evenly spaced scratches in the direction of travel came from misaligned guide shoes, and repeating marks spaced about 3.14 inches apart came from a damaged one-inch roller, which is why they were called pi lines.

## What the plate reader actually does
The exposure leaves electrons trapped in the phosphor. A laser scans the plate and releases that trapped energy as light, proportional to what each point received; a photodetector reads it line by line; then a bright lamp floods the plate to clear whatever is left so it can be used again. Three consequences follow. The plate is physical, so it collects dust and scratches that appear in the same place on every image it makes. The erase step can be incomplete, which leaves a faint ghost of the previous exposure. And plates age, so a department that has been creeping its technique up on one cassette has probably found a worn plate rather than a generator fault.

## Why digital lowered dose
Detective quantum efficiency is the fraction of the radiation reaching the detector that becomes usable signal. A detector with a higher value gives the same image quality at lower exposure, which is the whole argument for replacing film and plates. It varies with photon energy, so the comparison only means something at a stated technique. The practical corollary on the bench is that a detector losing efficiency shows up as creeping technique and a drifting exposure index long before anyone calls it broken.

## What to memorize
- Screens made film practical; sensitometry monitored speed, contrast, and base plus fog near baseline.
- A storage phosphor plate stores a latent image that a laser releases and a lamp erases.
- Indirect digital is cesium iodide over amorphous silicon transistors; direct digital is amorphous selenium.
- Higher detective quantum efficiency means the same image at less dose.
- Repeating marks and lines in the same place come from the receptor or the transport, not from anatomy.`,

u6l2: `## The panel is a measuring instrument, so it needs a zero and a scale
Every pixel of a flat panel has its own leakage and its own sensitivity, and both change with temperature and age. Calibration is nothing more exotic than setting a zero and a scale for each one, then keeping a list of the pixels that cannot be fixed.

\`\`\`
Calibration           What it measures                 Done by            Invalidated by
Offset or dark        what each pixel reports with     reading the panel  temperature change,
                      no radiation at all              unexposed          board swap
Gain or flat field    how much each pixel responds     a uniform          panel or filtration
                      to a known uniform exposure      exposure          change, firmware
Defective pixel map   which pixels, rows, and          analysis of the    new damage after a
                      columns cannot be trusted        calibration runs   drop or a fault
\`\`\`
Order matters: offset first, then gain, then the map, because each step depends on the one before. Do them in the geometry and at the techniques the manufacturer specifies, and keep the uniformity image from before and after in the work order. A recalibration without a before and after image is an assertion; with them it is evidence.

## Reading the image to find the circuit
The readout is a grid: gate lines switch rows on, data lines carry charge out. That geometry is why detector faults are so often straight.
\`\`\`
What you see                              Where to look
A dark or bright line, always same place   gate line, data line, or a stale pixel map
A wide band or smooth shading              gain calibration stale or done at the wrong beam
Mottle, rings, blotches                    scintillator damage, delamination, moisture
A faint copy of the last image             detector lag or an incomplete readout cycle
Grain everywhere at correct technique       underexposure; check the exposure index first
Image fine, panel randomly offline         battery, charging contacts, radio link, cable
\`\`\`
The discipline is the same every time: reproduce the artifact with no patient, at a known technique, on a flat absorber. If the artifact is in the same pixels every exposure, it is the detector. If it moves, it is anatomy, the grid, or the beam.

## Why processing hides exposure error
Raw detector values go through a look-up table that maps them to displayed brightness, and then through windowing: window width is the number of values spread across the gray scale, which is contrast, and window level is where that window sits, which is brightness. Edge enhancement then sharpens the result. Because the display is normalized, an image made with twice the needed radiation looks right and an image made with half of it looks right but noisy. That is exactly why the exposure index and the deviation index exist, and why a dose review reads those numbers rather than the pictures.

## Temperature, handling, and the service note
Panels have a working temperature range and need time to stabilize after a move between a cold corridor and a warm room. They also get dropped, and a dropped panel can pass a quick look and fail a uniformity image. Handle boards with electrostatic discharge precautions, hold them by the edges, and keep them in antistatic bags; a part weakened that way often fails days later and looks like a new fault.

## What to memorize
- Offset, gain, defective pixel map, in that order, and all void after a panel, board, firmware, or filtration change.
- Straight lines mean electronics or a stale map; shading means gain; rings and blotches mean the scintillator; ghosts mean lag.
- Window width sets contrast, window level sets brightness, and processing hides exposure error.
- Reproduce every artifact with no patient on a flat absorber before changing anything.`,

u6l3: `## The intensifier chain, stage by stage
An intensifier exists because a fluoroscopic image made directly on a screen is too dim to read at a safe dose. It takes a large, faint x-ray image and turns it into a small, bright light image.
1. **Input phosphor**: x-rays in, light out, over a disc 10 to 40 cm across. Cesium iodide grown in columns is the usual material because it absorbs well and keeps the light from spreading.
2. **Photocathode**: bonded to the phosphor, it emits electrons in proportion to the light that lands on it.
3. **Electrostatic focusing lenses and accelerating anode**: charged electrodes shape the electron stream and drive it the length of the tube at high voltage, which is where the energy gain comes from.
4. **Output phosphor**: 2.5 or 5 cm across, where the accelerated electrons make a small, intensely bright image for the camera or optics.

## The arithmetic
\`\`\`
Minification gain = (input diameter / output diameter) squared
Flux gain         = light photons made at the output phosphor per arriving electron,
                    typically 50 to 75
Brightness gain   = minification gain x flux gain
Conversion factor = about 0.01 x brightness gain
\`\`\`
Worked, with the numbers an exam uses:
- A 25 cm tube with a 2.5 cm output phosphor: 25 / 2.5 = 10, and 10 squared is 100. With a flux gain of 50, brightness gain is 100 x 50 = **5,000**, and the conversion factor is about 50.
- A 30 cm tube with a 2.5 cm output: 30 / 2.5 = 12, squared is 144. With a flux gain of 75, brightness gain is 144 x 75 = **10,800**.
- Typical tubes land between **5,000 and 30,000**, with conversion factors of 50 to 300.

Now use it to explain the magnification mode. Switch that 25 cm tube to its 12 cm field and the minification gain falls from 100 to about 23, because 12 / 2.5 = 4.8 and 4.8 squared is about 23. Brightness collapses by roughly a factor of four, and since the dose control is built to defend brightness, it raises the radiation to make up the difference. That is the whole reason magnification costs dose: better spatial and contrast resolution, paid for in milligray.

The same arithmetic explains aging. Brightness gain falls with use, so the control compensates with more radiation, and patient dose creeps up invisibly until someone measures the tabletop rate and compares it with the baseline. An intensifier is a consumable with a slow failure mode.

## The faults that name the technology
\`\`\`
Dimming toward the edges of the image     vignetting; inherent to intensifier optics
Curved or rotated geometry at the edge    intensifier distortion, worse with age
Contrast that looks washed out             veiling glare inside the tube
Dose rate high at normal technique         brightness control calibration, a magnification
                                           mode left engaged, continuous instead of
                                           pulsed, or a missing filter
Flat-panel fluoroscope with none of these  by design: no phosphor optics to distort
\`\`\`

## The regulated numbers, and the test
Measure at the tabletop with a calibrated chamber: the rate must not exceed 10 R/min, or 20 R/min where a high-level control is fitted, and no limit applies while recording. Confirm the cumulative timer sounds at 5 minutes of beam-on time. Confirm the source-to-skin distance, at least 38 cm on a stationary unit and 30 cm on a mobile one, with the spacer in place. Then run a resolution and low-contrast test object at fixed geometry and compare against the baseline on file, because image quality drifts too slowly to notice from memory.

## What to memorize
- Input phosphor, photocathode, electrostatic lenses, accelerating anode, output phosphor, in that order.
- Brightness gain equals minification gain times flux gain, commonly 5,000 to 30,000, and falls with age.
- Minification gain is the square of the diameter ratio, so a smaller field means less gain and more dose.
- 10 R/min, 20 R/min with a high-level control, 5-minute audible timer, 38 cm and 30 cm source-to-skin distances.`,

u6l4: `## A fluoroscope that gets pushed into a sterile field
Nothing about a C-arm's physics is new; everything about its environment is. It is moved daily, draped, worked around by people who cannot step back, and run from whatever outlet is nearest. That is why the service list is so mechanical and so unforgiving.

\`\`\`
Item                     Why it matters                      Failure you will meet
Orbital and lateral      the only way to aim without         a brake that slips during a
brakes                   moving the patient                   case, drift under drape
Interconnect cable       carries power, video, and control    flexing breaks conductors;
                         between C and cart                   faults that follow motion
Power cord and plug      the whole unit's supply              strain relief pulled out,
                                                              a cracked plug
Foot switch              the operator's exposure control      liquid ingress, a stuck pedal
Laser aimer and lamp     collimation without fluoroscopy      a dark lamp invites an
                                                              uncollimated field
Monitor cart             displays, recording, processing      a dead monitor channel,
                                                              a failing disk
Battery, if fitted       transport and brief operation        capacity lost; measure
                                                              under load, not at rest
\`\`\`
The wiggle test earns its keep here. A fault that appears only at a particular arm position is a cable flex failure, and continuity measured while the arm is moved will find it when a static measurement will not.

## The fixed suite, scaled up
A catheterization or interventional room is the same chain built for long cases: a floor or ceiling gantry, sometimes biplane, a high heat capacity tube, a floating and tilting table, boom-mounted displays, a power injector, hemodynamic monitoring, and a control room. More motion means more collision protection; longer runs mean cooling and heat budgets actually matter; everything is cabled through a moving arc, so cable management is a safety item. The network link is part of the system, because a run that cannot reach the archive is a repeated case.

## Recognizing the procedure
Access the vessel, thread a guidewire, advance a catheter over it, inject contrast and image, place a device if one is needed, close the site, and watch the patient. Knowing that sequence tells you when the room must not be interrupted and which equipment is critical at which moment: injector and imaging during the run, monitoring throughout, and subtraction only as good as the stillness between mask and contrast.

Contrast is the pharmacological risk in the room. Low-osmolality nonionic agents are much safer than the older ionic agents, but around 3 percent of patients still react, so the room keeps emergency drugs, oxygen, and suction, and the technician keeps the equipment that supports a reaction working and charged.

## Dose, because interventional dose lands in one spot
\`\`\`
Quantity              What it tells you                        Why it is tracked
Reference air kerma   cumulative dose at a defined point        a proxy for skin dose
Dose area product     dose multiplied by field area            reflects the volume
                                                                irradiated, falls with
                                                                collimation
Fluoroscopy time      beam-on minutes                           the crudest indicator
Peak skin dose        the worst single patch of skin            the one that causes injury
\`\`\`
A skin dose near 1,000 mGy is common in a long interventional case and is to be avoided wherever it can be, which is why trigger levels and logging exist in every interventional program. Your contribution is making sure the displayed numbers are true: a dose display is an instrument reading, and it is compared against a calibrated meter on the same schedule as everything else.

## What to memorize
- The C keeps tube and receptor aligned; brakes, cables, foot switch, aimers, cord, and cart are the service list.
- Faults that follow arm movement are cable flex failures, found with continuity during motion.
- Angiography: access, guidewire, catheter, contrast, image, device, close, observe.
- Nonionic low-osmolality contrast still gives reactions in about 3 percent of patients.
- Reference air kerma, dose area product, fluoroscopy time, and peak skin dose are the recorded dose numbers.`,

u6l5: `## Everything follows from one problem
Breast tissue barely differs in density and atomic number from the tissue beside it, so at ordinary radiographic energies there is almost nothing to see. The whole machine is a response: lower the photon energy until the photoelectric effect dominates, then protect the image from everything that low energy makes worse.

\`\`\`
Design choice                    Reason
Molybdenum, rhodium, or          their characteristic emission lands in the energy range
tungsten target with a matching  where soft tissue still shows absorption differences
molybdenum or rhodium filter
About 23 to 28 kVp               low energy maximizes photoelectric absorption
Beryllium window, at least       passes the soft photons that a glass window and
0.5 mm Al equivalent total       2.5 mm of aluminum would absorb
Focal spot to about 0.1 mm       microcalcifications are the finding; blur hides them
Source-to-image distance         long enough to limit blur, short enough for output
60 to 80 cm
Cathode toward the chest wall    the heel effect puts more intensity on thicker tissue
Grid 4:1 or 5:1, 30 to 50        scatter control at a dose cost the thin part can afford
lines per cm
Exposure detector behind the     it reads what came through the receptor, responding
receptor                         to quality as well as quantity
\`\`\`

## Compression, measured
Compression does four things at once: it evens the thickness so one exposure suits the whole breast, it holds the tissue still, it brings the tissue closer to the receptor, and it thins the part so there is less scatter and less dose. It is also the most common service complaint, and it has a number, so it is testable.
1. Put a scale under the paddle with a towel or pad to protect both.
2. Run the powered mode and read the peak force. Both powered and manual modes must reach between 25 and 40 pounds.
3. Confirm the force holds for at least 15 seconds without creeping.
4. Confirm that the automatic mode cannot exceed 40 pounds.
5. Inspect the paddle for cracks, flex, and a worn chest wall edge, and prove the normal and emergency releases.
Record the measured force with the tolerance. A compression complaint closed without a number on the work order is not closed.

## The program, and what it means after a repair
\`\`\`
Interval      Tasks
Daily         detector or processor check; cleanliness of the work surfaces
Weekly        phantom image; screen cleanliness; viewing conditions
Monthly       visual checklist: lights, displays, locks, rigidity and stability
Quarterly     repeat analysis, at least quarterly or every 250 patients
Semiannual    compression force; darkroom fog and screen-film contact where film remains
Annual        medical physicist survey, and again after any major component change
\`\`\`
The weekly phantom image is the one that catches drift. Score it largest to smallest: four fibers, three speck groups, and three masses is the accreditation minimum, and a drop of more than 0.5 from the previous score is a stop-and-investigate finding, not something to compensate for with technique. On digital systems the repeat rate should stay under 1 percent, because repeats can be deleted rather than counted and that makes diligence a discipline.

After a repair, the re-verification is part of the job: compression force after anything in the compression drive, a phantom image and an exposure control check after a detector or generator repair, arc calibration after work on a tomosynthesis gantry, and the physicist survey after a major component change.

## What to memorize
- Targets and filters of molybdenum, rhodium, or tungsten; about 23 to 28 kVp; beryllium window; 0.5 mm Al equivalent.
- Focal spot to 0.1 mm, source-to-image distance 60 to 80 cm, cathode at the chest wall.
- Compression 25 to 40 lb in both modes, held 15 seconds, never above 40 lb automatically.
- Grid 4:1 or 5:1 at 30 to 50 lines per cm; exposure detector behind the receptor.
- Four fibers, three speck groups, three masses; no drop greater than 0.5; digital repeat rate under 1 percent.`,

u6l6: `## A scanner is a heat, motion, and computing problem
The physics a technician needs for computed tomography fits in a paragraph: a collimated beam crosses the patient from thousands of angles while a detector array measures what gets through, and a computer solves for the attenuation of every voxel. Everything else about owning a scanner is heat, motion, power, and computers.

\`\`\`
Subsystem              What it does                        What the technician does
Gantry and slip ring   rotates tube and detectors          brushes and wear dust, covers,
                       continuously, power and data        balance and noise, interlocks
                       through brushes
High capacity tube     survives scans measured in          monitor heat budgets and
                       tens of millions of heat units      cooling; replace with the vendor
                       with cooling of millions per minute
Detector array and     thousands of elements read          air and water calibrations on
acquisition            thousands of times per rotation     schedule; report channel faults
Couch                  indexes the patient accurately      travel accuracy, indexing,
                                                            alignment lights, weight limit
Cooling plant          removes the heat all of this makes   chillers, pumps, fans, filters,
                                                            room temperature and humidity
Console and            reconstructs, displays, archives     disks, backups, network link,
reconstruction                                              software versions
Injector               delivers contrast on cue             interface, calibration, alarms
\`\`\`

## Pitch, worked
Pitch is couch travel per rotation divided by beam width. If the couch advances 12 mm per 360 deg rotation and the beam is 10 mm wide, the pitch is 12 / 10 = 1.2:1. Pitch above 1.0 stretches the helix, so a given length of patient is covered faster and with less dose; below 1.0 the turns overlap, which adds data and dose. Pitch is a protocol parameter rather than a service adjustment, but it is the first thing to ask about when a department reports that dose or coverage changed with no hardware work.

## Hounsfield units, and why water matters
\`\`\`
Air                about -1000
Fat                negative, between air and water
Water              exactly 0, by continuous calibration
Soft tissue        slightly above 0
Dense bone         up to about +3000
\`\`\`
Water is defined as zero, which makes a water phantom the reference that catches drift. If water reads several units away from zero, the calibration is suspect before anything clinical is. Windowing then decides what the radiologist sees: window width is how many values are spread across the gray scale, so it sets contrast, and window level is where that window sits, so it sets brightness. One acquisition is read as lung, soft tissue, and bone by changing those two numbers, which is also why a complaint about how an image looks is usually a display or protocol question rather than an acquisition fault.

## Dose terms at recognition level
The computed tomography dose index expresses dose in a slice spread over a defined 10 cm length, so radiation delivered outside the chosen slice is included rather than ignored. The dose length product multiplies that index by the length scanned, so it rises with coverage and is the number that tracks how much of the patient was irradiated. Both are measured with pencil ionization chambers in standard phantoms, usually by the medical physicist, and both appear on the dose report that the archive stores.

## What to memorize
- The slip ring allows continuous rotation; brushes and their dust are a service item.
- Pitch is couch travel per rotation over beam width; above 1.0 is faster and lower dose.
- Air about -1000, water exactly 0, dense bone about +3000; a water phantom drift is a calibration finding.
- Window width is contrast, window level is brightness.
- The dose index is defined over a 10 cm length; the dose length product scales with the length scanned.`,

u7l1: `## Why a radiology technician ends up owning ultrasound
It is the only imaging modality in the department with no ionizing radiation, no high-voltage generator, and no tube to replace, and yet it generates a steady stream of work orders. The reason is the probe: a precision transducer with hundreds of tiny elements and a hand-held cable, carried around, dropped, wiped with whatever is on the cart, and soaked by people in a hurry. Learn the probe and you have learned most of ultrasound service.

## The physics you actually use
\`\`\`
Idea                   What it means at the cart
Piezoelectric element  one component both sends the pulse and receives the echo
Pulse-echo timing      depth comes from how long the echo took to return
Acoustic impedance     echoes arise where impedance changes between tissues
Air and bone           an enormous impedance change: near-total reflection, then a
                       shadow, so gel is not optional and ribs and gas block the view
Attenuation            sound weakens with depth, and faster at higher frequency
The trade              higher frequency gives finer detail and shallower reach
\`\`\`
That last row is the whole reason a department owns a rack of probes rather than one good one. A sonographer picks the highest frequency that still reaches the target, which is why a complaint of a poor deep image on a high-frequency linear probe is a probe-selection conversation, not a fault.

## The probe as a stack
From the patient inward: the acoustic lens, a matching layer that gets sound across the boundary into tissue efficiently, the piezoelectric elements, damping backing that stops them ringing on, then the interconnect, the cable of very fine coaxial wires, and the connector.
\`\`\`
Failure                Image or symptom                  Where it came from
Element dropout        a dark stripe fixed in the image   dead element or its channel
Broken conductor       the same stripe, or intermittent   cable flex, usually near the
                       with cable position                strain relief or connector
Lens delamination      a blurred or dark patch            heat, chemistry, or age
Cracked housing        noise, then fluid ingress          a drop
Fluid ingress          noise, dropout, total failure      soaked past the immersion line
                                                          or a wet connector
Bent connector pins    channels missing on one port only  dropping the connector
\`\`\`
The stripe test is the one to internalize: a dark band that stays in the same part of the image while the probe is moved is in the probe or its channel; a dark band that moves with anatomy is a shadow from gas, bone, or poor contact.

## Proving it rather than guessing
1. Reproduce it on a phantom at a fixed preset so the image is repeatable.
2. Move the probe. Fixed artifact means hardware.
3. Flex the cable along its length and at the strain relief while watching the image.
4. Move the probe to another port. If the fault follows the probe it is the probe; if it stays with the port it is the system.
5. Fit a known good probe of the same type. That one step settles most disputes.
6. Inspect: lens and face under light, housing seams, cable for kinks and flattening, connector pins for bend and corrosion.
Document the probe by serial number, because probes circulate between carts and a condemned one must not come back.

## What to memorize
- Piezoelectric elements send and receive; depth comes from echo timing.
- Echoes come from changes in acoustic impedance; air and bone reflect nearly everything.
- Higher frequency means better detail and less penetration.
- Linear for superficial, curved for abdomen and obstetrics, phased array for cardiac, endocavity and transesophageal for internal work.
- A fixed dark stripe is dropout or a broken conductor; prove it on a phantom and by swapping probes.`,

u7l2: `## Dividing the system in two
Every ultrasound complaint divides into probe or system. The division is cheap to make and it decides what you do next, so make it first: put a known good probe of the same type on the suspect port, and put the suspect probe on a known good port or cart. Two minutes of swapping beats an hour of reasoning.

## The signal path, with the fault at each stage
\`\`\`
Stage                  Function                           Failure signature
Transmit               pulse each element with a delay    weak or absent image on one
                       so the beam forms and steers       sector; a dead transmit channel
Receive and beamform    amplify and recombine echoes       dropout stripes, noise, poor
                                                           penetration
Processing              depth-dependent gain, filtering,   odd gray scale, banding;
                        detection, scan conversion         usually software or presets
Display                 monitor and its calibration        brightness and contrast drift,
                                                           dead backlight
Controls                panel, trackball, footswitch       sticking keys, a trackball
                                                           full of gel
Cart power              supply rails, battery, charger      resets, will not run on
                                                           battery, dead cart
Network                 send studies to the archive        studies stuck in the local
                                                           queue
\`\`\`

## Modes and controls, in the words a complaint arrives in
B-mode is the two-dimensional gray scale picture. M-mode plots a single line against time for motion measurements. Color Doppler lays flow over the image, and spectral Doppler plots velocity at a sample point; both read the frequency shift of echoes from moving blood, which is why they fail first when contact, gel, or a receive channel is marginal. Gain amplifies everything; time-gain compensation amplifies by depth to offset attenuation, so a badly set compensation curve looks like a machine fault and is not one. Depth, focus, and frequency or preset set the compromise between detail and reach. Always reproduce a complaint with the correct preset loaded before you believe it.

## Reprocessing, and the probes it destroys
\`\`\`
What the probe touched      Required level            Practical rule
Intact skin                 clean, low-level           wipe with an approved product
                            disinfection
Mucous membranes            high-level disinfection    cover during use, then full
                                                       high-level disinfection after
Sterile tissue              sterile                    a sterile sheath and a probe
                                                       rated for it
\`\`\`
Two sentences protect the hardware: use only a chemical the manufacturer lists for that exact probe, and never immerse past the marked line, which means the connector stays dry forever. A transesophageal probe adds a leak test before reprocessing, because a pinhole in the shaft lets fluid into the electronics and ends the probe. When a probe dies after cleaning, the corrective action is retraining and relabeling the chemical, not just a replacement part.

## Quality control that is worth the time
Scan a tissue-mimicking phantom at a fixed preset and depth and compare with the baseline images on file: depth of penetration, axial and lateral resolution, and uniformity. Inspect every probe. Check each monitor against a test pattern, because a reading or scanning display that has drifted changes what the sonographer can see. Exercise every control, the trackball, and the footswitch. File the images, not just a tick, so next year's comparison means something.

## What to memorize
- Swap probe and port first; it splits probe from system in minutes.
- Transmit, beamform, process, display, with power and network underneath.
- B-mode, M-mode, color and spectral Doppler; gain is overall and time-gain compensation is by depth.
- Mucous membranes mean high-level disinfection, and a cover does not replace it.
- Approved chemicals only, never past the immersion line, and leak test a transesophageal probe.`,

u7l3: `## A modality where the source is the patient
Everything unfamiliar about nuclear medicine comes from one fact: the radioactive material is administered, so the regulation attaches to the material and its license rather than to a machine you can switch off. The camera is a passive instrument. Your access, your surveys, and the boundary of your work are all set by that license, which the facility holds.

## The chain, stage by stage, with what fails
\`\`\`
Stage                  Function                         What goes wrong
Collimator             lead holes accept only gamma     dented or crushed holes;
                       rays along the axis              artifacts and lost resolution.
                                                        Heavy: changers and carts are
                                                        a mechanical safety item
Scintillation crystal  sodium iodide flashes light      cracks from shock or a fast
                       where a gamma ray is absorbed    temperature change; it is a
                                                        vendor-level replacement
Light guide and        turn each flash into pulses      tube drift with age and
photomultiplier array                                   temperature, so uniformity and
                                                        energy peaking are routine
Position and energy    locate the event and reject      a drifting window counts the
circuits               what is outside the window       wrong photons: a noisy image
Computer and network   build, correct, store, send      disks, software versions, links
Gantry and table       rotate the heads, position       motion faults, collision safety,
                       the patient                      encoder and index errors
\`\`\`

## Tracers, energy windows, and half-life
A radiopharmaceutical joins a radioactive atom to a carrier the body treats predictably, so the tracer concentrates where the physiology takes it. Technetium-99m is the common one, giving a gamma ray of about 140 keV, and the camera's energy window is set around that so scattered and unrelated photons are rejected. Activity falls by half-life: in each successive period half of whatever activity remains is gone, so the dose in the syringe is weaker than the dose that was drawn an hour earlier. The length of that period belongs to the agent, and imaging agents are deliberately short-lived so a patient is not left radioactive for weeks. That is why doses are assayed in a dose calibrator immediately before use and why waste is held for decay rather than simply discarded.

Positron imaging works differently. Agents such as fluorine-18 emit positrons; each positron annihilates with an electron and produces two photons of about 0.51 MeV flying in opposite directions, and the detector ring accepts only pairs arriving in coincidence, which is what locates the event without a collimator. Hybrid units, single photon or positron tomography combined with a scanner, add attenuation correction and anatomy, and they also add every mechanical, thermal, and computing item of the scanner to your list.

## Quality control you will see
Daily or at least regularly, the staff run a **flood** image to check uniformity across the detector and a bar or resolution phantom to check spatial resolution, and the system is peaked on its energy window. A rotating camera adds a center-of-rotation check, because a few millimeters of error smears every reconstruction. Learn to read those images: a cold or hot patch in a flood is a photomultiplier or its tuning, a repeating pattern is a collimator, and a general loss of resolution with everything else normal is often the crystal or the light coupling.

## What to memorize
- Collimator, sodium iodide crystal, light guide, photomultiplier array, position and energy circuits, computer.
- Technetium-99m at about 140 keV; activity falls by half-life, which depends on the agent.
- Positron imaging: about 0.51 MeV photon pairs in coincidence, from agents such as fluorine-18.
- Flood for uniformity, bar phantom for resolution, center of rotation for tomography.
- The dose calibrator, surveys, license, and the material itself belong to the physicist and the facility.`,

u7l4: `## The room where the hazard is mechanical
The field is on, it is on everywhere in the room, and it does not care that you are a technician. People have been injured by oxygen cylinders, floor polishers, and tool bags. The habit that keeps you alive is simple and absolute: nothing enters the magnet room until it has been screened, every single time, including you, your pockets, your cart, and your test equipment.

\`\`\`
Zone      What it is                          Who may be there
Zone I    freely accessible public space      anyone
Zone II   reception and screening              patients and staff, supervised
Zone III  controlled, access restricted        screened and trained people only
Zone IV   the magnet room itself               screened people under supervision
\`\`\`
The posted 5-gauss line marks where the field can disturb an implant or a pacemaker, so screening always happens before it, not at the door. Items are labeled MR Safe, MR Conditional, or MR Unsafe, and conditional means safe only inside stated field, gradient, and radiofrequency limits. A multimeter is not conditional unless someone tested it and labeled it.

## The subsystems, and the service boundary
\`\`\`
Subsystem           What it does                      Yours or theirs
Magnet and coil     the static field, always on       theirs: ramping, shimming,
                                                      any work that risks a quench
Cold chain          compressor, cold head, chiller     shared: you own the chiller,
                    keep the helium cold               water loop, filters, and the
                                                      alarms; the cold head service
                                                      and cryogen fill are theirs
Gradient coils and  slope the field to encode          theirs, mostly: coil and
amplifiers          position; the source of the noise  amplifier work
Radiofrequency      transmit the pulses, receive       yours: inspect every receive
coils               the signal                        coil, cable, and connector
Shielded room       copper enclosure, filter panel,    yours: door seal, panel
                    sealing door                       integrity, penetrations
Table and           position and watch the patient     yours: motion, brakes,
peripherals                                            rated devices only
Console, network    reconstruct, display, archive      yours
\`\`\`

## Reading the two emergencies
A **helium level alarm** or a cold head that has stopped means the cryogen is boiling away, and above a certain point the magnet will lose superconduction. That is a same-day call to the vendor, not a note for the next visit. A **quench**, planned or not, boils the helium off rapidly; the quench pipe is designed to vent it outside, and a failure that releases it into the room displaces oxygen and fogs the air. Evacuate, prop the door open only if the procedure says so, and do not re-enter until the room is cleared. Helium boils at 4 K and nitrogen at 77 K, so any cryogen contact is an immediate cold injury.

## Image complaints that are yours
Interference lines or a zipper pattern across images usually mean radiofrequency is getting in: a door not sealing, a damaged filter panel, a new penetration someone made for a cable, or a device in the room that should not be. Signal loss in one region can be a damaged receive coil or a broken coil cable, which is why coil inspection is a scheduled item. Heating complaints point at looped or damaged coil cables, which is a burn risk and not a tolerance issue.

## What to memorize
- Superconducting coil in liquid helium, commonly 3 T, 1 T equals 10,000 gauss, never off.
- Compressor, cold head, chiller; a helium alarm is an emergency.
- Zones I to IV, screening before the 5-gauss line, MR Safe, Conditional, and Unsafe labels.
- Gradients encode position and make the noise; radiofrequency coils transmit and receive.
- Interference lines mean the shielded room; your list is cooling, coils, table, peripherals, room integrity, and computers.`,

u8l1: `## A preventive visit is a set of measurements
The difference between a maintenance visit that protects a department and one that just fills a line in a database is numbers. Every item on the procedure should end in a measured value, a tolerance, and a verdict. That is also how the visit survives a survey: an inspector does not ask whether you went, they ask what you measured and what the limit was.

## The tolerance table, by modality
\`\`\`
Radiography
  Total filtration          at least 2.5 mm Al equivalent above 70 kVp
  Collimation and alignment light field to radiation field within 2 percent of the SID
  SID indicator             within 2 percent
  Focal spot size           within plus or minus 50 percent of the nominal size
  kVp accuracy              within plus or minus 10 percent of the indicated value
  Timer accuracy            within 5 percent above 10 ms; 20 percent at or below 10 ms
  Exposure linearity        within 10 percent of output per mAs between adjacent
                            mA stations
  Reproducibility           within plus or minus 5 percent over repeated identical
                            exposures
  Exposure control          constant density through varying acrylic or aluminum, with
                            the backup proven to end at 6 s or 600 mAs
  Housing leakage           less than 100 mR/h at 1 m
Fluoroscopy
  Tabletop exposure rate    not above 10 R/min, or 20 R/min with a high-level control;
                            no limit while recording
  Cumulative timer          audible signal at 5 minutes of beam-on time
  Source-to-skin distance   at least 38 cm stationary, at least 30 cm mobile
  Image quality             resolution and low-contrast test object at fixed geometry
                            against the baseline on file
Mammography
  Compression               25 to 40 lb in both modes, held 15 seconds, never above 40
  Phantom score             four fibers, three speck groups, three masses, and no drop
                            greater than 0.5 from the previous image
  Schedule                  detector or processor daily, phantom weekly, visual checklist
                            monthly, repeat analysis quarterly or every 250 patients,
                            compression at least semiannually, physicist annually
Ultrasound
  Phantom                   penetration depth, resolution, and uniformity at fixed
                            settings against the baseline
  Probe and display         lens, housing, cable, and connector inspected; monitor
                            checked against a test pattern
Computed tomography
  Technician                table travel and indexing, alignment lights, covers and
                            brushes, cooling and filters, air and water calibrations
  Physicist, annually       dose indices, image quality, uniformity, and the radiation
                            profile against the accreditation standard
\`\`\`
One rule applies across all of it: evaluation follows any major equipment modification. A new tube, a high-voltage generator repair, a console board, a change in filtration, or a detector swap resets the clock on the tests that could have been affected.

## Where the frequency comes from
Three sources, and they stack rather than compete. The manufacturer's manual sets the procedure and the interval for the hardware. The regulator sets the minimum for anything with a legal limit: the state radiation control program for x-ray output and surveys, federal mammography law for that modality's whole schedule. The facility's own program, written against its accreditation, can be stricter and often is for high-risk equipment. When the three disagree, the strictest wins, and the work order names which one you followed.

## Two different jobs
Your quality control is repetitive and comparative: the same test, the same geometry, the same phantom, compared with what it did last time. The medical physicist's survey is independent and evaluative: dose measurements, shielding adequacy, image quality against the accreditation standard, with a written report whose findings someone must close. The pair of them is what an inspector expects to see, and they are expected to agree. When they do not, the usual explanation is geometry or a meter out of calibration, so keep your method written down well enough to repeat exactly.

## What to memorize
- kVp 10 percent, timer 5 percent above 10 ms and 20 percent at or below, linearity 10 percent, reproducibility 5 percent.
- Collimation, automatic collimation, and the distance indicator all within 2 percent of the SID; focal spot within 50 percent.
- Fluoroscopy 10 and 20 R/min, 5-minute timer, 38 cm and 30 cm source-to-skin distances.
- Mammography compression 25 to 40 lb and a phantom score of four, three, and three.
- Retest after any major repair; the physicist's annual survey is independent of your schedule.`,

u8l2: `## Why every claim needs an instrument
A console tells you what someone selected. Only a meter tells you what the tube produced. That distinction is the whole of output quality control, and it is why the first sentence of any output investigation is the same: put a meter on the tabletop and measure what the room actually does.

\`\`\`
Instrument                Reads                               Used for
Non-invasive kVp meter    kVp, exposure time, dose, dose       the whole radiographic
                          rate, half-value layer              output set, from outside
Ionization chamber        charge from ionized gas, through     the reference dose and
                          an electrometer                     dose rate measurements
Solid-state detector      semiconductor signal                compact multi-function
                                                              meters, fast timing
Dose area product meter   dose multiplied by field area        interventional and
                                                              fluoroscopic dose tracking
Survey meter              dose rate in the room, mR/h          scatter and leakage checks
Pencil chamber            dose along a 10 cm length            computed tomography
                                                              dose indices
Badges and electronic     accumulated occupational dose        staff monitoring, worn at
dosimeters                                                    the collar outside the apron
\`\`\`

## The measurement sequence that answers an output complaint
1. Set a known geometry: the detector on the central ray at a measured distance, collimated to the detector and no tighter, nothing else in the beam.
2. Measure kVp at the stations in use. Tolerance is 10 percent. A kVp that reads low explains flat, grainy images at once.
3. Measure the exposure time. Tolerance is 5 percent above 10 ms, 20 percent at or below.
4. Check linearity: compare output per mAs between adjacent mA stations, tolerance 10 percent. This is the test that explains "images differ depending on which station we pick."
5. Check reproducibility: several identical exposures with the controls moved away and back, tolerance 5 percent. Scatter here usually points at the kVp control.
6. Measure the half-value layer by adding calibrated aluminum until intensity halves, and compare with the minimum for that kVp and waveform.
7. Write the numbers, the tolerances, and the geometry on the work order while you are still standing there.

## Half-value layer, worked as a method
Measure output with no added aluminum: call it 100 percent. Add sheets a little at a time, reading after each addition, until the reading passes through half of the original. Interpolate between the two thicknesses that straddle half. The result rises with kVp and with filtration, which is why it is compared against a table indexed by both kVp and waveform rather than against a single number. A measured layer below the minimum means filtration is missing or the tube potential is not what the console says, and both are reportable.

## Units, converted without hesitating
\`\`\`
1 Gy = 100 rad                       absorbed dose
1 Sv = 100 rem                       equivalent dose
1 R = 2.58 x 10 to the minus 4 C/kg  exposure, the older quantity
10 R/min = 100 mGy/min               the fluoroscopic normal-operation limit
1 mSv = 1000 microsieverts           prefixes, which is where errors creep in
\`\`\`
Air kerma in gray has replaced exposure in roentgen on modern instruments, so a meter may report one while the regulation is written in the other. Fluoroscopic limits are rates, not doses, and interventional dose displays are usually air kerma at a reference point.

## The instrument's own calibration
Every chamber, electrometer, kVp meter, and dosimeter carries a calibration certificate with a date and traceability, typically renewed annually or on the maker's interval. Keep the certificates with the test equipment inventory, because an out-of-calibration meter retroactively invalidates every record it produced, and that is a finding no amount of careful work will undo.

## What to memorize
- The console is a selection; the meter is a measurement.
- Non-invasive kVp meter for kVp, time, dose, rate, and half-value layer; chamber plus electrometer as the reference.
- Dose area product under the collimator; pencil chamber for computed tomography; badges at the collar outside the apron.
- Tolerances: kVp 10 percent, timer 5 and 20 percent, linearity 10 percent, reproducibility 5 percent.
- 1 Gy equals 100 rad, 1 Sv equals 100 rem, 10 R/min equals 100 mGy/min; keep the instrument certificates current.`,

u8l3: `## Two instruments, two different questions
The analyzer asks whether this equipment is safe for a person to touch. The voltmeter asks whether this equipment is being fed and powered as designed. Confusing them wastes a visit: a leakage reading tells you nothing about why a console will not boot, and a rail voltage tells you nothing about whether a chassis is safe.

## The analyzer sequence, and the limits with their standards
\`\`\`
Step                       Limit                      Standard
Visual and cord check      no damage, correct strain   practice; the step that finds
                           relief, intact ground pin   most real faults
Ground resistance,         0.5 ohm maximum for         NFPA 99
chassis to plug ground pin patient-care equipment
Chassis (touch) leakage    500 microamps for cord-     NFPA 99, current editions
in normal, reversed        connected patient-care      (older editions used 300 or
polarity, and open ground  equipment                   100: cite your edition)
Touch current              100 microamps normal,       IEC 60601-1
                           500 single fault
Patient leakage, type B    100 microamps normal,       IEC 60601-1
and BF                     500 single fault
Patient leakage, type CF   10 microamps normal,        IEC 60601-1
                           50 single fault
Earth leakage              5 mA normal, 10 mA          IEC 60601-1
                           single fault
\`\`\`
The reason imaging cares is the interventional suite. Type CF applied parts exist there because catheters reach the heart, and microshock, as little as 10 microamps delivered directly to the heart, needs no shock hazard at the chassis to be lethal. The open-ground condition in the sequence exists for the same reason: leakage rides the ground wire, and the test asks what happens when that path is gone.

## Hard-wired and three-phase equipment
Most of the expensive equipment in an imaging suite is permanently connected, so the classic sequence does not fit.
\`\`\`
Situation              Why the plug test fails           What replaces it
Hard-wired generator,  no plug to lift, no polarity      ground and bonding continuity
gantry, table, magnet  to reverse                        from chassis to the ground
                                                         reference, insulation and
                                                         conductor condition, the
                                                         disconnect and overcurrent
                                                         device, and the manufacturer's
                                                         installation checks
Three-phase supply     no single hot and neutral pair     supply verification, balance,
                       to swap                           phase rotation where it matters,
                                                         bonding, panel condition, with
                                                         the facility electrician
Accessories on a cord  the sequence does apply            run it: injectors, monitors,
                                                         carts, portables, C-arms
\`\`\`
Record the substitution explicitly. "Permanently wired: plug-based leakage not applicable; chassis to ground reference measured at 0.3 ohm, bonding verified, disconnect and overcurrent device checked" closes the item. A blank does not.

## The voltmeter, used safely
Line voltage at the disconnect and at the generator input, balance between phases, the low-voltage rails at the test points the manual names, continuity of an interlock contact, a fuse, a cable. Two rules keep you alive: resistance and continuity only with the equipment off and the capacitors discharged and verified at zero, and voltage only when the circuit has to be live and the room is clear. Never approach the high-voltage section with a general purpose meter. Tube potential is measured non-invasively from the beam side, and a high-voltage divider is used only where the manufacturer supplies one and the procedure calls for it.

## Records, because the record is the deliverable
An inspector's request is predictable: the inventory, the maintenance strategy, the completion rate, the test records, the physicist's reports, dosimetry, recalls, training, and the calibration certificates of the instruments you used. All of it comes out of the maintenance system, which is why every reading goes in with its tolerance and its verdict, and why a work order closed as repaired and tested, with no numbers, is worse than useless. Readings next to limits are what turn a visit into evidence.

## What to memorize
- Sequence: visual and cord, ground resistance, chassis leakage in normal, reversed, and open-ground, then patient leads.
- 0.5 ohm ground and 500 microamps chassis leakage from NFPA 99; touch current 100 and 500, type B and BF 100 and 500, CF 10 and 50, earth leakage 5 and 10 mA from IEC 60601-1.
- Microshock is 10 microamps to the heart, which is why interventional rooms use type CF parts.
- Hard-wired and three-phase equipment gets grounding, bonding, insulation, and installation checks instead, recorded explicitly.
- Resistance with the power off; never a general purpose meter in the high-voltage section; every reading beside its tolerance in the CMMS.`
});
