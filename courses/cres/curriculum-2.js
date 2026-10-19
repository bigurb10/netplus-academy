// CRES Academy curriculum, units 5 to 8. Original teaching content for the AAMI/ACI CRES exam.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, ``` fenced block, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u5", n: 5, title: "X-ray Production, Tubes, and Generators", domain: 4,
  blurb: "How the tube makes x-rays, what the generator controls, and how technique shapes the beam.",
  assumes: "Unit 4.",
  lessons: [
    {
      id: "u5l1", title: "X-ray Production: Cathode, Anode, Focal Spot, Bremsstrahlung and Characteristic Radiation", domain: 4, obj: "FUN-A", minutes: 10,
      body: `Every complaint about output, contrast, or detail ends in the same few centimeters: a filament boiling off electrons and a metal target stopping them. Learn what happens there and most generator faults stop being mysterious.

## Thermionic emission and the space charge
The cathode is a coiled **thoriated tungsten filament**, 1 to 2 cm long and about 2 mm across, sitting inside a **focusing cup**. The filament circuit heats it, and at a filament current of about 4 A the outer electrons gain enough energy to leave the metal. That is **thermionic emission**. The freed electrons hang around the filament as a cloud called the **space charge**, and because like charges repel, the cloud itself resists further emission. The focusing cup is held negative, so it squeezes that cloud into a narrow stream instead of letting it spread. **Tube current**, read in mA, is simply how many of those electrons cross to the anode each second. It is set by filament heating, and a small change in filament current makes a large change in mA, which is why the mA calibration lives in the filament circuit and not in the high-voltage section.

## One percent x-rays, ninety-nine percent heat
The kilovoltage across the tube accelerates the electrons; the target stops them. The **law of conservation** of energy means all of that kinetic energy has to go somewhere: about **1 percent** of it leaves as x-rays and about **99 percent** becomes heat. That single ratio is behind rating charts, cooling curves, warm-up procedures, and most dead tubes.

## The two ways an x-ray is made
- **Bremsstrahlung**, or braking radiation: an electron passing near a tungsten nucleus is pulled off course and slowed, and the energy it gives up leaves as a photon. Any amount can be lost, so these photons come out in a continuous spread from near zero up to the peak kilovoltage. That mix of energies makes every diagnostic beam a **heterogeneous beam**: never one energy, which is why beam quality has to be measured as a half-value layer rather than read off the console. They are the bulk of a diagnostic beam.
- **Characteristic** radiation: an electron knocks a K-shell electron out of a target atom, an outer electron falls into the hole, and the photon carries exactly the difference between the two binding energies. Only K-shell transitions are useful, and in tungsten they sit at about **69.5 keV**, so none of them appear until the tube runs above that.

Target atoms hold their electrons in **electron shells**, named K, L, and M outward from the **atomic nucleus**, and each shell has an **electron-binding energy** that grows with the **atomic number** of the element. Tungsten's high atomic number and high **atomic mass** are exactly why it is the target: more protons in the nucleus means more bremsstrahlung, and tightly bound K-shell electrons means characteristic photons energetic enough to be useful.

## What moves the emission spectra
Plot how many photons come out against their energy and you have the beam's **emission spectra**: a continuous bremsstrahlung hump with the characteristic lines standing on top of it. Five things move those spectra, and the exam asks which way.
\`\`\`
Raise this            Quantity (how many)   Quality (average energy)
mA or mAs             up                    no change
kVp                   up                    up
Added filtration      down                  up
Target atomic number  up                    up
Voltage ripple        down                  down
\`\`\`

## Focal spot, line focus, and the heel effect
The **actual focal spot** is the strip of target the electrons land on. The **effective focal spot** is what the detector sees looking back up the beam, and it is smaller. That is the **line-focus principle**: angling the target, usually about 5 to 20 deg, projects a long thin track as a small square, so a track of roughly 10 mm by 1 mm reads as about 1 mm by 1 mm. A steeper angle gives a smaller effective spot and a stronger **heel effect**, the drop in intensity toward the anode end of the field, because photons leaving that way climb out through more target metal. Radiographers use it on purpose by putting the thick end of a part under the cathode side.

> Exam tip: thermionic emission at the filament, the space charge opposing it, the focusing cup aiming it; 1 percent x-rays and 99 percent heat; bremsstrahlung is continuous and most of the beam, characteristic is discrete and starts at about 69.5 keV in tungsten; mA changes quantity only, kVp changes both, filtration raises quality and lowers quantity; line focus shrinks the effective spot and the heel effect follows the anode end.`,
      hook: "A heated thoriated tungsten filament 1 to 2 cm long emits electrons at about 4 A of filament current, the space charge opposes them and the negative focusing cup aims them, tube current in mA counts how many cross each second, about 1 percent of their energy becomes x-rays and 99 percent heat, bremsstrahlung gives the continuous bulk of the beam while characteristic radiation needs the tungsten K-shell energy of about 69.5 keV, and angling the target by about 5 to 20 deg shrinks a 10 mm by 1 mm track into roughly a 1 mm square at the cost of a heel effect toward the anode."
    },
    {
      id: "u5l2", title: "The Tube: Housing, Rotating Anode, Line-Focus Principle, Dual Focus, Heat Units, Cooling, Failure", domain: 4, obj: "FUN-A", minutes: 11,
      body: `A tube is the most expensive consumable in the department and the part a technician is most often asked to defend or condemn. Knowing how it is built, how heat leaves it, and how it dies is what makes that call defensible.

## How the tube is built
- The **envelope** is a vacuum vessel of glass or metal holding the cathode and anode. Metal lasts longer, because tungsten boiling off the electrodes plates the inside of a glass envelope and eventually conducts.
- **External components** are the parts you can see and touch: the housing with its high-voltage cable receptacles, the port and its added filter, the expansion bellows and thermal switch, the collimator mount, and the stand or ceiling support that carries all of it.
- **Oil** around the envelope carries heat away and insulates. The **housing** is lead-lined, and that lining is what holds stray radiation escaping anywhere but the port below **100 mR/h at 1 m** while keeping high voltage away from hands.
- The **anode** is a disc of tungsten-rhenium backed by molybdenum or graphite, angled a few degrees, spun by an induction motor. That **target composition** is chosen for three things at once: a high melting point, a high atomic number for output, and backing metals whose **thermal conductivity** moves heat away from the track faster than tungsten alone would. The motor itself is a **rotor** shaft inside the vacuum with a **stator** winding outside it. Standard speed is about **3,400 rpm**, high speed about **10,000 rpm**, and reversing the stator field is how the disc is braked.
- **Dual focus**, which is why a manual calls it a **dual-focus tube**, means two filaments in the focusing cup, large and small, giving two focal spots: small stations about 0.3 to 0.6 mm for detail, large stations about 1.0 to 1.2 mm when the exposure needs the heat capacity.

## Heat units, the number every rating is written in
\`\`\`
Single phase                  HU = kVp x mA x s
Three phase or high frequency HU = 1.4 x kVp x mA x s
Energy equivalent             1 HU = about 1.4 J
Worked                        98 kVp at 120 mAs single phase = 11,760 HU
\`\`\`
**Heat dissipation** happens by three paths and all three can fail: conduction from the track into the disc, the stem, and the oil; convection as that oil circulates, sometimes through a pump and a heat exchanger; and radiation from the hot disc to the housing wall. A blocked filter, a dead fan, a tired pump, or low oil removes one path and the tube pays for it.
A **rating chart** answers one question: is this single exposure safe at this kVp, mA, time, focal spot, and anode speed? The **anode cooling curve** and the **housing cooling curve** answer the next one: how long before the next series. The anode is only at its peak for about 1 to 3 seconds per exposure, but a housing holding millions of heat units can need an hour or two to come all the way down. A cold anode loaded hard cracks, which is the entire reason the **warm-up** series in the manual exists.

## How it fails
\`\`\`
Filament evaporation   tungsten thins the coil and plates the envelope; output drifts
                       low, then the filament opens
Anode pitting          repeated overload roughens the track; output falls and varies
Cracked anode          cold loading or a wobbling disc; fails at once
Arcing                 plated tungsten conducts, so current jumps the vacuum and
                       the generator throws a tube-arc or overcurrent fault
Bearing wear           heat conducted into the rotor; a noisy or slow rotor, then a
                       rotor fault. Long fluoroscopic runs are hardest on bearings
Oil leak               a seal or bellows; low oil means poor cooling and arcing
\`\`\`
Overheating is the usual cause of early death, and good practice buys life: the lowest technique that answers the question, the fewest repeats, never past the rating chart. A well-used tube should give at least about **50,000 exposures**.

> Exam tip: housing leakage under 100 mR/h at 1 m; rotor about 3,400 rpm standard and 10,000 rpm high speed; heat units are kVp x mA x s single phase and 1.4 times that on three phase or high frequency, with 1 HU about 1.4 J; the rating chart clears one exposure and the cooling curves clear the next series; a noisy rotor or output that drifts low says the tube, not the generator.`,
      hook: "A glass or metal vacuum envelope sits in oil inside a lead-lined housing that holds leakage under 100 mR/h at 1 m, a tungsten-rhenium disc on molybdenum or graphite is spun at about 3,400 rpm or about 10,000 rpm by a rotor and stator, dual filaments give small and large focal spots, heat is counted as kVp x mA x s on single phase and 1.4 times that on three phase or high frequency with 1 HU about 1.4 J, the rating chart clears one exposure while the anode and housing cooling curves clear the next series, and the tube dies of filament evaporation, anode pitting or cracking, arcing, or bearing wear, usually from heat."
    },
    {
      id: "u5l3", title: "Generators: kVp, mA, Time, mAs, Rectification and Waveform, High-Voltage Transformers, Timers", domain: 4, obj: "FUN-B", minutes: 11,
      body: `The generator's job is narrow and absolute: put a chosen voltage across the tube, push a chosen current through it, for a chosen length of time, the same way every time. Everything on the console is one of those three, and every output complaint is one of them drifting.

## From the wall to the tube
1. **Line compensation** holds the incoming supply steady so one technique gives the same exposure all day. Rooms are commonly fed at 220 V, some at 110 or 440, and bigger generators take three-phase service.
2. The **autotransformer** is a single tapped winding. Moving the kVp selector picks a tap, which sets the voltage offered to the next stage, and a **pre-reading voltmeter** shows the selection before any exposure. Never trust that display for quality control; measure the real tube potential.
3. The **step-up transformer** multiplies that by its turns ratio into kilovolts, and potted **high-voltage cables** carry it to the tube. A dirty or unseated cable termination arcs.
4. The **filament circuit**, fed through precision resistors, sets filament heating and therefore the mA station.
5. **Rectifiers** make the current one-way. Without them the negative half-cycle would drive voltage backward across the tube and destroy it.

## Waveform and ripple
\`\`\`
Waveform                  Ripple   Meaning
Single phase, half wave    100%    one half-cycle used; least efficient, longest times
Single phase, full wave    100%    both halves used, twice the pulse rate
Three phase, six pulse      14%    voltage never drops below about 86% of peak
Three phase, twelve pulse    4%    never below about 96% of peak
High frequency               1%    nearly constant; the standard on new equipment
\`\`\`
A manual spells those names out in full, so recognize them: full-wave rectified **single-phase, two-pulse alternating current** gives two useful pulses per cycle, while **three-phase alternating current** gives six or twelve, and a high-frequency generator converts the supply to a much higher frequency before rectifying it, which is how it gets to almost no ripple at all.
Less ripple means more x-rays and more penetrating ones for the same settings, so a technique chart does not move between generators. Going from single phase to three phase can need as much as **10 kVp less** for the same receptor exposure at the same mAs.

## Timers and the exposure sequence
Five kinds appear on exams: **synchronous** (tied to the 60 Hz supply, so multiples of 1/60 s), **electronic** (the common and the most accurate), **mechanical** (spring-driven, in portables and dental units), **mAs** timers, which end on the product, and **automatic**, which is the exposure control. Timer accuracy is a measured quality control item, not a belief.

The two-stage switch runs the sequence: **prep** spins the rotor and boosts the filament, the ready light means the interlock chain is satisfied, then **expose** closes the contactor. Interlocks sit in series, so one open contact gives no exposure and often no fault code at all.

## mAs, reciprocity, and the 15 percent rule
{{mAs = mA x seconds}}. Any pair with the same product should give the same receptor exposure, and proving that is the linearity test. Raising kVp by **15 percent** has about the same effect on receptor exposure as doubling the mAs, so the working rule is: raise kVp 15 percent and halve the mAs to hold exposure while cutting dose, accepting lower contrast.

> Exam tip: autotransformer selects kVp, filament circuit sets mA, rectifiers give one-way current; ripple runs 100, 100, 14, 4, and 1 percent from half wave to high frequency, and less ripple means more quantity and quality; electronic timers are the accurate ones; prep spins and heats, expose fires, and interlocks are in series; mAs is mA times seconds and 15 percent more kVp equals twice the mAs.`,
      hook: "Line compensation steadies the supply, the autotransformer taps set kVp against a pre-reading voltmeter that must never be trusted for quality control, the step-up transformer and potted cables deliver kilovolts, the filament circuit sets the mA station, and rectifiers keep current one-way; ripple falls 100, 100, 14, 4, and 1 percent from half wave through three-phase six and twelve pulse to high frequency, with less ripple giving more quantity and quality and sometimes allowing 10 kVp less; timers are synchronous, electronic, mechanical, mAs, and automatic; prep spins the rotor and boosts the filament before expose closes the contactor through series interlocks; and mAs is mA times seconds, with 15 percent more kVp worth a doubled mAs."
    },
    {
      id: "u5l4", title: "Automatic Exposure Control, Technique Charts, and the Exposure Factors", domain: 4, obj: "FUN-B", minutes: 10,
      body: `Most of the exposures a modern room makes are ended by the machine, not the operator. That makes the exposure control a service item, and it makes "the images from room 3 are too dark" a measurement rather than an argument.

## How the exposure control works
**Ionization chambers** sit in front of the receptor, usually three of them, and older systems used a light detector behind the receptor called a phototimer. Radiation crossing a chamber ionizes its gas, the charge builds, and when it reaches the level set for that exam the console cuts the exposure. The operator still picks kVp and the mA station; the machine picks the time.
- **Cell selection** decides which chamber is listened to. Anatomy must sit over the chosen cell or the exposure ends on whatever was there, usually lung or bare table.
- **Density settings** step the target up or down, each step moving the resulting image density by a small fixed amount, typically 0.1 of optical density.
- **Minimum response time** is the shortest exposure the system can terminate. Below it the chamber cannot react in time, so very fast exposures overshoot.
- The **backup timer** is the safety net. It must end the exposure at **6 s or 600 mAs**, whichever comes first, and the usual working setting is about 1.5 times the expected time. Testing it with lead over the cell is a standard quality control step.

Low-kilovoltage work is where the control is least reliable, which is why mammography has its own schedule and why a short manual backup is set for those exams. The control also cannot fix geometry: collimating off the cell, centering off the cell, or a grid left out all give a wrong exposure with nothing wrong in the electronics.

## Technique charts
A chart turns a measured part into settings. Part thickness is measured with **calipers**, then the chart is read.
\`\`\`
Fixed kVp, variable mAs   kVp set by the anatomy, mAs adjusted for thickness; the
                          common general-purpose chart
Variable kVp, fixed mAs   kVp raised with thickness; older, more contrast change
High kVp chart            above 100 kVp, for chest work and barium studies
\`\`\`

## The four factors, and what changes each
\`\`\`
Factor                    Improved by                        Hurt by
Density or brightness     more mAs, higher kVp, short SID    less mAs, long SID, added
                                                             filtration, a grid without
                                                             compensation
Contrast                  lower kVp, grid, collimation       higher kVp, scatter, fog
Recorded detail           small focal spot, long SID,        large focal spot, long OID,
                          short OID, no motion               motion
Distortion                centered, square alignment         angled parts, off-center
                                                             anatomy, uneven OID
\`\`\`
On digital systems the **exposure index** reports what the detector actually received and the **deviation index** compares that with the target for the exam. They are how overexposure is caught, because digital processing hides it.

> Exam tip: ionization chambers in front of the receptor end the exposure, cell selection and density steps tune it, minimum response time sets the floor, and the backup must stop at 6 s or 600 mAs; the control cannot fix positioning, collimation, or a missing grid; charts are fixed kVp or variable kVp, read after measuring with calipers; density, contrast, recorded detail, and distortion are the four factors, and exposure index with deviation index is the digital dose feedback.`,
      hook: "Ionization chambers in front of the receptor end the exposure once enough radiation has arrived, with cell selection, density steps of about 0.1 optical density, a minimum response time below which the chambers cannot react, and a backup timer that must stop at 6 s or 600 mAs; it cannot fix anatomy placed off the cell, collimation off the cell, or a missing grid; technique charts are fixed kVp or variable kVp and are read after calipers; and density, contrast, recorded detail, and distortion are the four image quality factors, with exposure index and deviation index reporting what a digital detector received."
    },
    {
      id: "u5l5", title: "Collimation, Filtration, Grids, and Air Gap: Controlling the Beam and Scatter", domain: 4, obj: "FUN-A", minutes: 10,
      body: `X-rays leave the target in every direction. Everything between the target and the receptor exists to throw away the photons that would only add dose or fog, and every one of those devices is a test you will be asked for.

## Collimation
A **collimator** is two pairs of lead shutters at right angles, with a lamp and mirror that project where the field will land. The upper pair trims badly aimed radiation close to the tube and the lower pair sizes the field. **Cones** and **cylinders** bolt underneath to cut a small round field, and an **aperture diaphragm** is a lead plate with a fixed opening for the same purpose. All of them are **beam-restricting devices**, or **beam restrictors**: they decide how much of the patient the beam is allowed to reach, and every one of them lowers scatter and dose at the same time. Two numbers matter: the light field must agree with the radiation field within **2 percent of the SID**, and **positive beam limitation**, which sizes the shutters automatically to the receptor, must hold the same 2 percent. At a 100 cm SID that tolerance is 2 cm.

## Filtration
**Inherent** filtration is what the tube and its oil remove on their own; **added** filtration is the aluminum at the port; together they are total filtration. Filtration throws away low-energy photons that would be absorbed in skin without reaching the receptor, so the average energy rises while the number of photons falls.
\`\`\`
Below 50 kVp     total filtration at least 0.5 mm Al
50 to 70 kVp     at least 1.5 mm Al
Above 70 kVp     at least 2.5 mm Al
\`\`\`
You cannot measure the layers separately, so beam quality is proven by **half-value layer**: add calibrated aluminum sheets until intensity halves, and compare with the minimum for that kVp and waveform. **Compensating filters**, wedge and trough shaped, even out a part that changes thickness.

## What the beam does inside the patient
Five interactions are named, and only two of them matter at the energies a diagnostic room uses.
\`\`\`
Coherent scattering   low energy; the photon changes direction and loses no energy;
                      adds a little fog and nothing else
Photoelectric effect  the photon is absorbed outright, which is what makes bone and
                      contrast white; it climbs steeply with atomic number
Compton scattering    the photon gives up part of its energy and goes on in a new
                      direction; this is the scatter that fogs images and exposes the room
Pair production       needs at least 1.02 MeV, so it never happens in diagnostic work
Photodisintegration   needs above about 10 MeV; a therapy energy, not a diagnostic one
\`\`\`
**Differential absorption** is the reason an image exists at all: bone absorbs more than soft tissue and soft tissue absorbs more than air, so what reaches the receptor varies across the field. Tissue the beam passes through easily, such as lung, fat, and air, has high **radiolucency**, and tissue that stops it, such as bone, metal, and contrast, is radiopaque. What leaves the patient is the **exit radiation**: the surviving primary beam that carries the picture, plus the scatter that spoils it. Everything in the rest of this lesson is an attempt to keep the first and throw away the second.

## Scatter, and the grid
Scatter rises with **kVp**, with **field size**, and with **part thickness**. You control the first two. Collimation is the cheapest control there is, because a smaller field makes less scatter in the first place.
A **grid** is lead strips separated by spacers that lets straight-line photons through and absorbs angled ones. **Grid construction** is worth picturing: strips of lead alternating with an **interspace material** of aluminum or fiber, which holds the exact spacing and passes the primary beam, the whole stack sealed in a protective frame. Damage to that frame or to the interspace material is permanent and shows on every image the grid is used for.
- **Ratio** is strip height over gap, commonly 4:1 to 16:1. **Frequency** is strips per inch, commonly 60 to 150. Higher ratio removes more scatter and costs more dose.
- **Types**: linear strips are parallel, focused strips are angled to match the beam and must face the tube on the labeled side, crossed grids are two linear grids at right angles.
- The **Bucky factor**, also called the grid conversion factor, is the mAs increase a grid costs, and it rises with ratio and with kVp. **Selectivity** compares primary to scattered radiation passed; contrast improvement factors typically run 1.5 to 2.5.
- **Cutoff** names the mistake: a focused grid upside down fades density at the edges, off level drops density across the whole image, off center drops it at the sides. A stationary grid prints its lines; a moving one blurs them away, so lines on an image from a moving grid mean the Bucky is not moving.

## Air gap
Pull the part well away from the receptor and much of the scatter diverges past it, which buys contrast without a grid or its dose. The price is magnification and more focal spot blur, so it suits lateral cervical spine and some vascular work rather than general radiography.

> Exam tip: light field to radiation field and positive beam limitation both within 2 percent of the SID; total filtration at least 2.5 mm Al above 70 kVp, proven by half-value layer; scatter rises with kVp, field size, and thickness; grid ratio 4:1 to 16:1 and frequency 60 to 150, with the Bucky factor as the dose it costs; cutoff is upside down at the edges, off level everywhere, off center at the sides; the air gap trades sharpness for scatter rejection.`,
      hook: "Two pairs of lead shutters with a lamp and mirror, plus cones, cylinders, and aperture diaphragms, must hold the light field and positive beam limitation within 2 percent of the SID; inherent plus added filtration must reach at least 2.5 mm Al above 70 kVp and is proven by half-value layer, while compensating filters even out changing thickness; scatter rises with kVp, field size, and part thickness; grids of 4:1 to 16:1 ratio and 60 to 150 strips per inch, linear, focused, or crossed, remove it at a dose cost called the Bucky factor and fail as cutoff when reversed, tilted away from perpendicular, or decentered; and an air gap buys the same contrast by letting scatter miss the receptor, at the price of magnification."
    },
    {
      id: "u5l6", title: "Tables, Bucky, Tube Stands, and the Mechanical System", domain: 4, obj: "FUN-B", minutes: 9,
      body: `Half the calls in a general room are mechanical. Nothing about a lock, a brake, or a cable is cosmetic: a mechanism that drifts changes the geometry of the image, and a mechanism that lets go can injure someone.

## The table and the Bucky
A radiographic table floats its top in two directions, elevates, and on some units tilts. Under the top sits the **Bucky assembly**: a tray for the receptor, the moving grid, and the exposure control chambers. The top itself is a low-absorption material so it does not add to the patient's thickness. What you check is that the float locks hold at any position, that the tray centers and latches, that the grid actually oscillates during the exposure, and that the tilt stops and limit switches work.

## Stands and supports
- **Ceiling-suspended** tube stands ride two sets of rails at right angles, giving reach over the table and to the wall stand. Travel, detents, brakes, and the longitudinal and transverse locks are all PM items.
- **Floor-mounted** columns run on a floor rail or on casters, with the tube carriage riding up and down the column.
- A **C-arm** support carries tube and receptor on one rigid arc, which is why it holds alignment through any angle.
- The **wall stand** or upright receptor holds the detector at a set height with its own grid and chambers.

## Detents, indicators, and the counterweight
**Detents** are the click-stops at standard positions: centered over the table, at the wall stand, at the standard distances. **SID** and angle indicators have to read what is true, because federal tolerance for the distance indicator is 2 percent of the SID and every technique chart assumes it. Many columns and ceiling mounts balance the tube with a **counterweight** on a cable; a frayed cable or a worn pulley is a dropped-tube hazard, which is why cables, chains, and their anchors are inspected and never left to a judgment call. Powered systems add **collision sensors** and travel limits, and those get proven, not assumed.

## The mechanical PM list
\`\`\`
Locks, brakes, detents     hold at any position, release cleanly, no creep
Cables, chains, pulleys    no fraying or kinks, correct tension, anchors sound
Bearings and rails         clean, lubricated as the manual says, no play
Collimator mounting        seated square on the tube port, no play in the mount,
                           light field still true after any work on it
Alignment                  tube to receptor, grid perpendicular, lasers true
Indicators                 SID and angle readouts measured, not believed
Collision and limits       every sensor and stop proven to actually stop motion
Cable management           flexing loops routed clear of pinch and travel paths
\`\`\`

## How mechanical faults arrive as image complaints
Alignment that has drifted shows as grid cutoff or clipped anatomy. A Bucky that does not oscillate prints grid lines. A table top or stand that creeps during a long exposure shows as motion blur. A detent that no longer lands leaves every image centered slightly differently, which the radiographer reports as inconsistency rather than as a fault. Measure the geometry before you touch the generator.

> Exam tip: the Bucky holds the tray, the moving grid, and the exposure chambers; ceiling mounts ride two sets of perpendicular rails, and the SID indicator must be within 2 percent; a frayed counterweight cable is a safety fault, not a comfort item; grid lines mean a Bucky that is not moving, cutoff and clipped anatomy mean alignment, and blur during long exposures can be a stand that creeps.`,
      hook: "A radiographic table floats, elevates, and tilts over a Bucky assembly holding the tray, the moving grid, and the exposure chambers, while ceiling-suspended stands ride two sets of perpendicular rails, floor columns ride a rail, and a C-arm carries tube and receptor on one arc; detents, locks, brakes, bearings, cables, counterweights, and collision sensors are the PM list, the SID and angle indicators must be measured rather than believed because the distance tolerance is 2 percent, and mechanical drift arrives as grid cutoff, grid lines, clipped anatomy, or motion blur rather than as a mechanical complaint."
    }
  ]
});

FRA.units.push({
  id: "u6", n: 6, title: "Image Receptors, Fluoroscopy, Mammography, and CT", domain: 4,
  blurb: "How the image is captured and processed, and the systems built around the receptor.",
  assumes: "Unit 5.",
  lessons: [
    {
      id: "u6l1", title: "From Film-Screen to CR to DR: Receptor Types, Screens, and Processors", domain: 4, obj: "FUN-A", minutes: 10,
      body: `Three generations of receptor are still in the field and all three are still on exams. You will service digital panels, you will meet a plate reader in a clinic, and you will be asked film questions because the vocabulary of image quality was written in film.

## Film-screen, and why it still matters
A cassette held double-emulsion film between two **intensifying screens**. The screens carry a phosphor layer that flashes visible light when x-rays strike it, and that light, not the x-rays, exposed most of the film, which is what made the dose tolerable. Screen speed rose with thicker phosphor and larger crystals, and fell in sharpness as it rose. An **automatic processor** moved the film by rollers through developer, fixer, wash, and dryer, and the film came out **developed**, fixed, and dry, carrying whatever markers and identification were in the field at the moment of exposure, permanently. **Sensitometry** is how the whole chain was monitored: expose a step strip, read it with a densitometer, and compare speed, contrast, and base plus fog against the baseline. The limits were tight, typically within 0.10 of the baseline for speed and contrast and 0.05 for base plus fog. Three ideas survive from all of this: optical density, screen speed, and screen-film contact.

## Computed radiography
A **CR** cassette holds a **PSP** plate instead of film. The exposure leaves a latent image trapped in the phosphor; a reader scans the plate with a laser, and that laser **stimulation** releases the trapped energy as light, which is why the plate is called photostimulable. A photodetector reads the light line by line, and a bright lamp erases the plate for reuse. The workflow still involves carrying cassettes, which is its weakness, and the plate itself becomes an image quality item.
\`\`\`
Dust or scratches on the plate   the same mark on every image from that plate
Incomplete erase                 a ghost of the previous exposure
Aging or worn plate              lost speed, so techniques creep up
Cracked plate                    a sharp line that does not move with anatomy
\`\`\`

## Digital radiography
A **DR** detector reads out electronically with no plate to carry.
- **Indirect** panels put a **CsI** scintillator over an amorphous silicon **TFT** array: x-rays make light, the light makes charge, the array reads the charge.
- **Direct** panels use amorphous selenium, which makes charge from x-rays with no light step in between.
- Panels are wired or wireless. Wireless panels add batteries, charging bays, and a radio link to the fault list, and they get dropped.

**DQE** is the number that explains why digital lowered dose: it describes how much of the radiation reaching the detector becomes usable signal, so a higher value buys the same image for less exposure. Care is physical: panels are dropped, sat on, and left in cold cars, they have a working temperature range, and their cases and cable strain reliefs are inspection items. Handle boards with electrostatic discharge precautions.

> Exam tip: screens made film practical and sensitometry monitored the chain within about 0.10 of baseline; a CR plate stores a latent image that a laser releases and a lamp erases, so dust, scratches, incomplete erase, and age all print; indirect DR is cesium iodide over amorphous silicon thin-film transistors, direct DR is amorphous selenium; higher detective quantum efficiency means the same image at less dose.`,
      hook: "Film-screen cassettes used intensifying screens so light rather than x-rays exposed the film, with automatic processors and sensitometry holding speed, contrast, and base plus fog near baseline; computed radiography stores a latent image in a photostimulable phosphor plate that a laser reads and a lamp erases, so dust, scratches, an incomplete erase, or age print on every image; digital radiography reads out electronically, indirectly through cesium iodide over an amorphous silicon transistor array or directly through amorphous selenium, wired or wireless; and detective quantum efficiency is why digital gives the same image for less dose."
    },
    {
      id: "u6l2", title: "Digital Detector Electronics, Calibration, Defective Pixel Maps, and Image Processing", domain: 4, obj: "FUN-A", minutes: 10,
      body: `A flat panel detector is a semiconductor device the size of a cassette that gets handled like a clipboard. Most of what goes wrong with it is either calibration or physical damage, and the two look different on the image if you know what to look for.

## How a panel is read out
Each pixel of a **TFT** array holds a transistor and a storage capacitor. Gate lines running one way switch a whole row of transistors on; data lines running the other way carry the charge from that row to amplifiers at the edge. The panel is read row by row, the analog charge becomes numbers in an **ADC**, and the numbers go to the processing computer. A dead gate line takes out a row, a dead data line takes out a column, and either one shows as a straight line in the image that never moves with the anatomy.

## The three calibrations
1. **Offset**, also called dark calibration: read the panel with no radiation to learn what each pixel reports from leakage and electronics alone, then subtract it.
2. **Gain**, or flat-field calibration: make a uniform exposure and learn how much each pixel responds, then scale every pixel to match. This is what makes a uniform beam read as a uniform image.
3. The **defective pixel map**: a stored list of pixels, rows, and columns that cannot be trusted, whose values are filled in from their neighbors.
All three drift, and all three are invalidated by a panel swap, a board swap, a firmware change, or a change in the beam filtration. Recalibrate after any of those, after a panel has been dropped, and on the manufacturer's schedule.

## Faults by appearance
\`\`\`
Straight line, same place every image   dead gate or data line, or a stale pixel map
Broad shading or a brightness gradient  stale or wrong gain calibration
Rings or blotchy mottle                 scintillator damage or moisture ingress
Ghost of the previous image             incomplete readout or detector lag
Noise everywhere at normal technique    underexposure, or a failing amplifier chain
Nothing at all, panel offline           battery, charge, radio link, cable, or power
\`\`\`
Panels also have a temperature window and a warm-up period. A panel pulled from a cold corridor can read badly until it stabilizes, which is a service note worth telling the department rather than a fault.

## What the processing does, and why it hides problems
Correction before anything else happens is **preprocessing**: offset, gain, and the defective pixel map, done on the raw values. Everything after it is **postprocessing**, and it starts with the **image histogram**, a count of how many pixels hold each value. The system looks at the shape of that histogram, decides which part of it is anatomy, and scales the display from there, which is why a histogram error is one of the most common digital image complaints: an uncollimated field, a prosthesis, a large metal object, or an exposure field the algorithm cannot find leaves the whole image too dark or too light with nothing wrong in the hardware. **Partitioning** two exposures onto one plate works only when each field has clear collimated margins, because the field recognition step has to be able to tell them apart.
After that, the image goes through a **look-up table** that maps detector values to displayed brightness, then through windowing and often edge enhancement. **Window width** sets how many values are spread over the gray scale, which is displayed contrast; **window level** sets where in the range that spread sits, which is displayed brightness. Because the processing normalizes brightness, an image that received twice the needed radiation can look correct, which is exactly why the **EI** and **DI** are reported alongside it.

Two measured numbers describe how good a panel still is. **Signal-to-noise ratio** compares the signal the anatomy produced with the random noise under it, and it falls when exposure falls, which is why an underexposed digital image looks grainy rather than light. **Modulation transfer function** is the curve of how much of an object's contrast survives as the detail gets finer, measured from a bar pattern, and it is the formal way spatial resolution is stated when a specification or a physicist's report gives one.

## Service tools
The manufacturer's calibration software, a repeatable test exposure geometry, a uniformity phantom or a simple flat absorber for flat-field checks, a resolution test tool, and the panel's own error log. Keep the before and after images with the work order; a uniformity image is the proof that the recalibration worked.

> Exam tip: a thin-film transistor array is read row by row and digitized, so a dead line gives a fixed straight line; offset, gain, and defective pixel map are the three calibrations and all are void after a panel, board, firmware, or filtration change; lines mean electronics or a stale map, shading means gain, rings and blotches mean the scintillator; processing hides exposure error, so read the exposure index and deviation index.`,
      hook: "A thin-film transistor array stores charge pixel by pixel and is read row by row through gate and data lines into an analog-to-digital converter, so a dead line prints a fixed straight stripe; offset, gain or flat-field, and defective pixel map calibrations all drift and are void after a panel, board, firmware, or filtration change; shading means gain, rings and blotches mean the scintillator, a ghost means lag, and an offline panel means battery, link, or power; and because look-up tables, window width, and window level normalize the display, the exposure index and deviation index are the only honest record of what the detector received."
    },
    {
      id: "u6l3", title: "Fluoroscopy: Image Intensifiers, Flat Panels, Dose Rate Control, and Digital Subtraction", domain: 4, obj: "FUN-B", minutes: 11,
      body: `Fluoroscopy trades image quality for time: a live image at a tube current of only about 5 mA, held bright by electronics instead of by technique. That bargain is where the dose is, and it is where the faults are.

## The image intensifier chain
The whole trick is **image intensification**: taking a faint pattern of x-rays and turning it into a bright visible image inside a tube, instead of raising technique until the picture is bright on its own.
1. X-rays leaving the patient strike the **input phosphor**, which converts them to light. Input diameters run about 10 to 40 cm and name the tube.
2. A **photocathode** bonded to it turns that light into electrons.
3. **Electrostatic focusing lenses** and an **accelerating anode** at high voltage drive those electrons down the tube and focus them.
4. They land on a small **output phosphor**, typically 2.5 or 5 cm across, as a small bright image.

Two gains multiply to make that brightness:
\`\`\`
Minification gain  (input diameter / output diameter) squared
Flux gain          the 50 to 75 light photons each arriving electron makes at the
                   output phosphor
Brightness gain    minification gain x flux gain, commonly 5,000 to 30,000
Conversion factor  output brightness per unit input rate, about 0.01 x brightness
                   gain, so roughly 50 to 300
\`\`\`
Brightness gain falls as the tube ages, and because the dose control defends brightness, an aging intensifier quietly raises patient dose until it is replaced. Intensifier tubes also give away their age in the image: **vignetting**, a dimming toward the edges, geometric distortion at the periphery, and **veiling glare** that flattens contrast. Flat-panel fluoroscopy has none of those.

## Magnification, and the dose it costs
Most intensifiers are multifield, so the mode is called **multifield image intensification**: a trifield tube might be 25, 17, and 12 cm. Selecting a smaller field uses only the central part of the input phosphor, which improves spatial and contrast resolution and raises patient dose, because the system must deliver more radiation per unit area to keep the picture bright. A magnification mode left engaged is a classic cause of a high measured dose rate.

## Holding brightness, and holding dose down
**ABC** raises mA, kVp, or pulse width as the patient thickens, so the dose rate climbs with patient size by design. The operator's real dose controls are: **pulsed** fluoroscopy at the lowest acceptable frame rate, which is the single biggest saving available; **last-image hold**, which leaves the final frame on the monitor with the beam off; collimation; and keeping the receptor close to the patient.

Federal limits are the numbers to know: the tabletop rate must not exceed **10 R/min**, or **20 R/min** where a high-level control is fitted, with no limit while recording; a **5-minute** cumulative timer must sound; and source-to-skin distance must be at least **38 cm** on a stationary unit and **30 cm** on a mobile one.

## Digital fluoroscopy and subtraction
The output phosphor is coupled by optics to a television camera or a **CCD**, whose video drives the monitors at the table and in the control booth, with the recording and processing hardware on the monitor cart. That video, or a flat panel's output, is digitized, so frames can be stored, replayed, and processed. **DSA** takes a mask frame before contrast arrives and subtracts it from the contrast run, leaving only the vessels. Any motion between mask and run leaves a misregistration artifact that mimics disease, so table, tube, and detector stability are image quality items here. Two features built on the same subtraction are worth knowing by name: **remasking** picks a better mask frame out of the stored run when the first one was spoiled by motion, and **roadmapping** holds a subtracted vessel map on the screen as a guide while the physician advances a catheter under live fluoroscopy. Older fluoroscopic television drew each frame as two **interlaced** fields, which blurred anything moving; digital systems read **progressive** frames line by line, which is what makes a freeze frame usable.

## Geometry and operator dose
Under-table tubes with the receptor above put most scatter below the waist and are shielded by the table, the Bucky slot cover, and the drape. An over-table tube with the receptor below throws scatter at the operator's head and neck, which is why those configurations and mobile C-arms need deliberate positioning, aprons, thyroid shields, and a step back during the run.

> Exam tip: input phosphor 10 to 40 cm and output 2.5 or 5 cm; brightness gain is minification times flux gain, roughly 5,000 to 30,000, and it falls with age; magnification raises resolution and dose; automatic brightness control defends brightness, not dose; 10 R/min at the tabletop, 20 R/min with a high-level control, a 5-minute audible timer, and source-to-skin distance at least 38 cm stationary and 30 cm mobile.`,
      hook: "The intensifier runs input phosphor, photocathode, electrostatic lenses, accelerating anode, and a 2.5 or 5 cm output phosphor, where minification gain times flux gain gives a brightness gain of roughly 5,000 to 30,000 that falls with age; magnification modes and a thicker patient both raise dose because automatic brightness control defends brightness; pulsed mode, last-image hold, and collimation are the savings; flat panels avoid vignetting and distortion; digital subtraction needs a motion-free mask; and the limits are 10 R/min at the tabletop, 20 with a high-level control, a 5-minute timer, and source-to-skin distance of at least 38 cm stationary or 30 cm mobile."
    },
    {
      id: "u6l4", title: "Mobile C-arms, the Interventional Suite, and Angiography", domain: 4, obj: "FUN-B", minutes: 10,
      body: `A C-arm is a fluoroscope that has to survive being pushed down a corridor into a sterile field. The physics is unchanged from the fixed room; everything that is different is mechanical, electrical, and procedural.

## How a mobile C-arm is built
The **C** carries the tube at one end and an intensifier or flat panel at the other, so the two stay aligned through every angle. The arm orbits within the C and rotates about its support, and each motion has a brake. A separate **monitor cart** holds the displays, the recording system, and often the image processor, joined to the C by a thick interconnecting cable. The unit runs from a wall outlet, so the power cord, plug, and strain relief are inspection items along with the brakes, the cable, the foot switch, and the laser aimers. **Mini C-arms** are small-field units for extremities, with the same requirements at lower output.

Most of that work is in surgery, and surgery sets the rules: the unit comes in clean, the covers go on before the case, and nothing about it is adjusted once the field is sterile. In the room, the C-arm is draped and worked around a sterile field: covers go on before the case, the operator positions by brake and detent rather than by force, and nothing is adjusted across the field. A unit that drifts or whose brake slips is a sterility and a safety problem at once.

## The interventional and cardiac suite
A fixed suite is the same chain built heavier: a floor-mounted or ceiling-mounted gantry, sometimes two of them for **biplane** work, a table that floats and tilts under a sterile drape, large displays on a boom, a power injector for contrast, hemodynamic monitoring, and a control room. The tube is a high heat capacity unit because the runs are long. For a technician that means more of everything: gantry motion and collision systems, cable management through a moving arc, cooling, injector interfaces, monitors, and the network link that gets every run to the archive.

## The procedure, at recognition level
1. The patient is prepared and consented, and an access site is cleaned and anesthetized.
2. A needle enters the vessel, a **guidewire** is threaded, and a **catheter** is advanced over it to the target.
3. Contrast is injected and imaged, usually with subtraction, from the angles the physician needs; imaging the arteries this way is **arteriography**, and the same approach on veins is venography.
4. A device may be placed: balloon, stent, coil, or embolic agent.
5. Access is closed and the patient is watched for bleeding and for reaction.

The suite is equipped for complications: emergency drugs, oxygen, suction, and monitoring are part of the room, and the technician keeps the equipment that supports them inspected, charged, and working. Whether and how a patient reacts to contrast is the clinical team's domain; the readiness of the equipment is yours.

## Dose management
Long cases put the dose in one place on the skin, so interventional work tracks dose rather than estimating it.
\`\`\`
Reference air kerma   cumulative dose at a defined reference point; an estimation of
                      skin dose rather than a measurement of it
Dose area product     dose multiplied by field area, so it falls when the field is
                      collimated even though the dose rate does not change
Fluoroscopy time      beam-on minutes; the crudest of the indicators
Peak skin dose        the worst single patch of skin, and the one that causes injury
\`\`\`
The **DAP** meter under the collimator is where that second number comes from. Skin dose is tracked case by case against trigger levels, because an interventional skin dose near 1,000 mGy is common and is to be avoided wherever it can be. Your part is verifying that the displayed numbers are real: a dose display is a measurement, and it is checked against an instrument like any other.

> Exam tip: a C-arm keeps tube and receptor aligned on one arc, and its service list is brakes, cables, foot switch, aimers, power cord, and the monitor cart; biplane suites double the gantry and the collision risk; angiography is access, guidewire, catheter, contrast, image, close; the suite's emergency equipment is on your inspection list; reference air kerma and dose area product are the recorded dose numbers, and they are verified against an instrument.`,
      hook: "A mobile C-arm holds tube and receptor on one arc with braked orbital and lateral motion, a monitor cart, an interconnecting cable, a foot switch, and laser aimers, all of which are the inspection list, while mini C-arms do extremities; a fixed interventional or catheterization suite adds a floor or ceiling gantry, sometimes biplane, a floating table, injectors, hemodynamic monitoring, and a high heat capacity tube; angiography runs access, guidewire, catheter, contrast, imaging, and closure with the suite's emergency equipment on your inspection list; and dose is managed by reference air kerma, dose area product, and skin dose tracking that a technician verifies against an instrument."
    },
    {
      id: "u6l5", title: "Mammography Systems: Tube, Compression, AEC, and Tomosynthesis", domain: 4, obj: "FUN-A", minutes: 10,
      body: `Mammography is the one modality whose quality control program is written into federal law, and the one where a repair is not finished until the re-verification is documented. Every design choice in the machine follows from one problem: the tissues being imaged barely differ in density.

## The tube, and why it is special
- **Target and filter**: molybdenum, rhodium, or tungsten targets, paired with molybdenum or rhodium filters, shift the spectrum into the energy range where soft tissue still shows absorption differences. Conventional technique would be useless here.
- **Low kilovoltage**: about **23 to 28 kVp**, because the photoelectric effect, which creates the contrast, needs low photon energies.
- **Window and filtration**: a beryllium window passes those soft photons, and total filtration is at least **0.5 mm Al** equivalent, which is the minimum for this work rather than the 2.5 mm of general radiography.
- **Small focal spot**: down to about **0.1 mm**, because microcalcifications are the finding.
- **Geometry**: a source-to-image distance of about **60 to 80 cm**. The cathode end faces the chest wall, so the heel effect puts the stronger part of the beam where the tissue is thickest.

## Compression, the control with a number on it
Compression spreads tissue to an even thickness, holds it still, brings it closer to the receptor, and lowers both scatter and dose. It is also the most frequent service item. Both the powered and the manual modes must reach **25 to 40 lb** and hold for at least **15 seconds**, and the automatic mode must never exceed **40 lb**. The test is a scale under the paddle. Check the paddle itself for cracks and flex, and prove the release works, including the emergency release.

## Receptor, grid, and exposure control
The grid is low ratio, **4:1 or 5:1**, at **30 to 50 lines per cm**. The exposure detector sits **behind** the receptor, reading what came through, and it responds to beam quality as well as quantity. Digital units use **TFT** arrays with thallium-activated **CsI**, or a **CCD** in some older designs, and film-screen still edges them on pure spatial resolution. **DBT** sweeps the tube through an arc and reconstructs slices, which separates overlapping tissue and adds gantry motion and arc calibration to the quality control list. Stereotactic biopsy units add a needle guidance stage whose coordinate accuracy is verified with a phantom.

## The quality control program under MQSA, from the bench side
\`\`\`
Daily         detector or processor check, cleanliness
Weekly        phantom image, screen cleanliness, viewing conditions
Monthly       visual checklist: lights, displays, locks, rigidity
Quarterly     repeat analysis, every 250 patients or at least quarterly
Semiannual    compression force, darkroom fog and screen contact where film remains
Annual        medical physicist survey, and after any major component change
\`\`\`
The phantom score is the headline: the minimum to pass accreditation is **four fibers, three speck groups, and three masses**, and a score that falls by more than **0.5** from the last image means stop and investigate rather than adjust technique. On digital units the repeat rate should be under **1 percent**.

The service items that recur are compression force calibration and the compression drive, a cracked or flexing paddle, the target and filter wheel with its position sensor and interlock, and detector calibration. After a repair, re-verify what you touched: compression force after anything in the drive, a phantom image and the exposure control after a detector or generator repair, arc calibration after work on a tomosynthesis gantry, and the physicist survey after a major component change.

> Exam tip: molybdenum, rhodium, or tungsten targets with matching filters at about 23 to 28 kVp through a beryllium window, at least 0.5 mm Al equivalent, focal spots to 0.1 mm, source-to-image distance 60 to 80 cm, cathode at the chest wall; compression 25 to 40 lb held 15 seconds in both modes and never above 40 lb; grid 4:1 or 5:1 at 30 to 50 lines per cm with the detector behind the receptor; four fibers, three specks, three masses, and never a drop of more than 0.5.`,
      hook: "Mammography uses molybdenum, rhodium, or tungsten targets with matching filters at about 23 to 28 kVp through a beryllium window with at least 0.5 mm Al equivalent filtration, focal spots down to about 0.1 mm, a source-to-image distance of 60 to 80 cm, and the cathode at the chest wall to use the heel effect; compression must reach 25 to 40 lb and hold 15 seconds in both modes and never exceed 40 lb; the grid is 4:1 or 5:1 at 30 to 50 lines per cm and the exposure detector sits behind the receptor; tomosynthesis adds arc motion and calibration; and the program runs daily to annual with a phantom score of four fibers, three speck groups, and three masses that must not fall by more than 0.5."
    },
    {
      id: "u6l6", title: "CT at Recognition Depth: Gantry, Slip Ring, Detector Array, Tube Cooling, Reconstruction", domain: 4, obj: "FUN-A", minutes: 10,
      body: `A scanner is a radiographic room turned inside out: the tube and the receptor rotate around the patient and a computer builds the image from transmission measurements instead of from a shadow. Most of what a technician owns on one is mechanical, thermal, and computing.

## What is inside the gantry
- The **tube** is a high heat capacity unit, because a scan is effectively one very long exposure. Capacities of tens of millions of heat units and cooling rates of millions of heat units per minute are what let a department run a full schedule.
- The **slip ring** carries power in and data out through brushes on rotating rings, which is what allows continuous rotation instead of winding and unwinding a cable.
- The **detector array** is thousands of solid-state scintillation elements with their photodiodes and acquisition electronics, read thousands of times per rotation.
- The **collimator and filters** shape the beam into the slice profile the protocol asked for.

Recognize the direction the technology moved, because older equipment is still in service: gas-filled detectors gave way to solid-state scintillation detectors, the earliest of which used **NaI** before better crystals replaced it, and single-slice scanners gave way to multislice arrays, 16 slices in 2002, 64 in 2004, dual-source designs the year after, and 320 by 2007.

## Helical scanning and pitch
The couch moves while the gantry turns, so the beam traces a spiral through the patient.
\`\`\`
Pitch = couch travel per 360 deg rotation / beam width
Example: 12 mm of travel with a 10 mm beam width is a pitch of 1.2:1
Above 1.0   the spiral stretches: faster coverage, lower dose, less overlap
Below 1.0   the spiral overlaps: more data, more dose
\`\`\`

## Reconstruction, and the views built from it
Helical data does not land neatly in the plane of a slice, so building each one starts with **interpolation** between the measurements either side of it, and then a reconstruction **algorithm** turns those projections into an image. Because the result is a volume of numbers rather than a shadow, the same data can be re-cut: **multiplanar reformation** builds coronal, sagittal, and oblique views out of axial data, with no extra exposure to the patient.

## The numbers on the image
Reconstruction converts attenuation into **HU**, the density scale: air is about **-1000**, water is exactly **0** by continuous calibration, and dense bone reaches about **+3000**. Water being exactly zero is why a water phantom is scanned so often; when those numbers drift, the calibration is the suspect. The display is then **windowed**: window width is how many values are spread across the gray scale, which sets contrast, and window level is where in the range that window sits, which sets brightness. The same raw data can be read as lung, soft tissue, or bone by windowing alone.

## Dose terms
**CTDI** expresses the dose in a slice spread over a defined 10 cm length, so dose delivered outside the chosen slice is counted. **DLP** multiplies that index by the scanned length, which is why it tracks with how much of the patient was scanned. Both are displayed and recorded, and both are measured with pencil ionization chambers in phantoms, generally by the physicist.

## What the technician services
Table travel and **couch incrementation** accuracy, meaning the table actually moves the distance the protocol asked for, and the **laser localizer** lights it is positioned by; gantry covers, slip-ring brushes, and the wear dust they produce; air and water calibrations on the manufacturer's schedule; chillers, fans, and filters, because heat is the chronic enemy; power quality and the distribution inside the system; consoles, reconstruction computers, disks, and the archive link; contrast injectors and their interface. Tube replacement and the deeper calibrations are usually shared with or owned by the vendor, so read the service contract before you open the gantry.

> Exam tip: the slip ring is what makes continuous rotation possible; pitch is couch travel per rotation over beam width, so above 1.0 means faster and lower dose; Hounsfield units run air about -1000, water exactly 0, dense bone about +3000, and a water phantom drift is a calibration finding; window width sets contrast and window level sets brightness; computed tomography dose index is defined over a 10 cm length and the dose length product scales with the length scanned.`,
      hook: "A scanner rotates a high heat capacity tube and a solid-state detector array on a gantry whose slip ring carries power and data so rotation never stops, with the couch moving to trace a helix at a pitch of couch travel per rotation over beam width; reconstruction gives Hounsfield units with air about -1000, water exactly 0, and dense bone about +3000, displayed by window width for contrast and window level for brightness; dose is reported as a computed tomography dose index defined over a 10 cm length and a dose length product that scales with scan length; and the technician owns the table, alignment, covers and brushes, air and water calibrations, cooling and filters, power, computers, and the archive link, while tube replacement usually belongs to the vendor."
    }
  ]
});

FRA.units.push({
  id: "u7", n: 7, title: "Ultrasound, Nuclear Medicine, and MRI", domain: 4,
  blurb: "The non-x-ray modalities at the depth the exam names them: what each system is, what it is made of, and what you service.",
  assumes: "Unit 6.",
  lessons: [
    {
      id: "u7l1", title: "Ultrasound Physics and Probes: Frequency, Attenuation, Resolution, Probe Types and Failure Modes", domain: 4, obj: "FUN-A", minutes: 10,
      body: `**Diagnostic ultrasound** is the modality an imaging technician actually repairs, because the expensive, fragile, frequently damaged part is a handheld probe. There is no ionizing radiation here; the hazards are to the equipment and to infection control.

## How sound makes a picture
A probe contains **piezoelectric** elements: materials that produce a voltage when squeezed and change shape when a voltage is applied. Drive one with a short electrical pulse and it rings, sending sound into the body at a frequency far above anything the ear can hear. The same element then listens. That is the **pulse-echo** principle: the time an echo takes to come back sets the depth it is drawn at, and the **amplitude** of that echo sets how bright the spot is drawn.

Echoes come from boundaries. Every tissue has an **acoustic impedance**, and sound reflects where that impedance changes. A small difference, as between soft tissues, reflects a little and lets the rest pass, which is what makes an image. A huge difference, as at air or bone, reflects almost everything and leaves a shadow behind it, which is why gel excludes air from the skin and why bowel gas and ribs block the view.

## Frequency, penetration, and the trade you cannot escape
Sound weakens, or **attenuates**, as it travels, and it attenuates faster at higher frequency, so both depth and frequency cost you signal.
\`\`\`
Higher frequency   finer detail, less penetration   superficial work: vessels, thyroid,
                                                    musculoskeletal, newborns
Lower frequency    coarser detail, more penetration deep work: abdomen, obstetrics,
                                                    large patients
\`\`\`
That single trade explains the probe rack. Nobody chooses a probe by preference; they choose the highest frequency that still reaches the target.

## Probe types
- **Linear** array: a straight row of elements, rectangular image, high frequency, superficial anatomy and vascular access.
- **Curved** or convex array: a curved row, wedge-shaped wide field, lower frequency, abdomen and obstetrics.
- **Phased** array: a small footprint steered electronically, which fits between ribs, so it is the cardiac probe.
- **Endocavity** probes: shaped for internal use and used with a cover.
- **TEE** probes: a long flexible shaft passed down the esophagus to image the heart from behind it.

## Inside the probe, and how it dies
A probe is a stack: elements, a matching layer that couples sound into tissue, damping backing behind the elements, an acoustic lens at the face, then a cable of very fine coaxial wires to a dense connector.
\`\`\`
Element dropout        a dark stripe fixed in the image that does not move with the probe
Broken cable conductor the same stripe, or an intermittent one that follows cable flex
Lens damage            cracks, delamination, or chemical attack; a blurred or dark region
Fluid ingress          disinfectant past the immersion line, or a soaked connector; noise,
                       dropout, then total failure
Connector damage       bent or recessed pins from dropping the connector
Strain relief failure   the cable pulled where it leaves the housing
\`\`\`
Inspect every probe on every visit: face and lens for cracks, housing for splits, cable along its whole length for kinks and flattening, connector pins for bend and corrosion. Confirm suspected dropout on a phantom and then prove it by swapping in a known good probe. Probes are the most expensive consumable in the department and almost all of their deaths are handling or chemistry.

> Exam tip: piezoelectric elements both send and receive, and depth comes from echo timing; sound reflects where acoustic impedance changes, so air and bone block it and gel excludes air; higher frequency means finer detail and less penetration; linear is superficial, curved is deep and wide, phased array fits between ribs for cardiac work; a fixed dark stripe is element dropout or a broken conductor, proven on a phantom and by swapping probes.`,
      hook: "Piezoelectric elements turn a drive pulse into sound above the range of hearing and the returning echo back into a voltage, with depth read from the travel time and echoes arising wherever acoustic impedance changes, so gel excludes air while air and bone shadow everything behind them; higher frequency buys detail and loses penetration, which is why linear probes do superficial work, curved probes do abdomen and obstetrics, phased arrays fit between ribs for cardiac studies, and endocavity and transesophageal probes go inside; and a probe is a stack of elements, matching layer, backing, lens, cable, and connector that fails as element dropout, broken conductors, lens damage, fluid ingress, or bent pins."
    },
    {
      id: "u7l2", title: "Ultrasound Systems: Beamformer, Modes, Doppler, Probe Testing and High-Level Disinfection", domain: 4, obj: "FUN-B", minutes: 10,
      body: `The cart is the easy half of an ultrasound system: a computer with amplifiers, a display, a battery, and a lot of connectors. Knowing the signal path tells you which half of a complaint you are holding.

## The signal path
1. **Transmit**: pulse generators drive the elements, with a delay on each one so the pulses add up into a beam aimed where the system wants it.
2. **Receive and beamform**: the echoes from every element are amplified and recombined with matching delays, which is what forms a line of the image.
3. **Signal and image processing**: amplification by depth, filtering, detection, scan conversion, and the gray scale map.
4. **Display and store**: the monitor, the measurement and annotation tools, and the link to the archive.
5. **Support**: cart power supply, battery, probe ports, control panel, trackball, and footswitch.

## Modes, and what each is for
- **B-mode** is the familiar two-dimensional gray scale image.
- **M-mode** plots one line against time, which is how motion of a valve or a wall is measured.
- **Color Doppler** maps flow direction and speed over the image; **spectral Doppler** plots the velocity trace from one sample point.
- **Three-dimensional** and volume modes sweep or acquire a volume and render it.
Doppler works from the frequency shift of an echo returning from something moving, so it is the first thing to break when contact is poor or a channel is weak.

## The controls a complaint will mention
**Gain** amplifies everything that comes back. **Time-gain compensation** amplifies deeper echoes more than shallow ones, to make up for the attenuation they suffered on the way. **Depth** sets how far the system listens, **focus** sets where the beam is narrowest, and **frequency** or preset selects the compromise between detail and penetration. Most images that look wrong are a preset or a gain setting rather than a fault, which is why reproducing the complaint with the correct preset is the first step. Two artifacts are worth recognizing: a dark region behind gas or bone, which is a shadow and moves with the anatomy, and a dark stripe fixed in the image, which is hardware.

## Cleaning, disinfection, and the rule that saves probes
Reprocessing follows what the probe touched. Intact skin needs cleaning and low-level disinfection; anything touching mucous membranes needs **HLD**; anything entering sterile tissue must be sterile. Endocavity probes are used with a cover, and the cover does not replace high-level disinfection afterward. Two rules protect the hardware: use only a chemical the manufacturer lists for that probe, and never take the probe past its immersion line, which means the connector never gets wet. More probes are destroyed by cleaning than by clinical use.

## Quality control and the usual faults
Scan a phantom at fixed settings and compare depth of penetration, resolution, and uniformity with the baseline on file; inspect the probe; check the display against a test pattern; prove every control, trackball, and footswitch. A probe's **frequency response**, the band of frequencies its elements actually send and receive, drifts as elements age and as the backing and lens degrade, which is what a dedicated probe tester measures and why a probe can pass a visual check and still produce a poor image.
\`\`\`
Dark stripe in the image        element dropout or a broken conductor; swap the probe
Weak, noisy image               wrong preset, poor contact and gel, lens damage, or a
                                failing channel; try a known good probe first
No Doppler, or noisy Doppler    contact, preset, or a receive channel
Dead display or control         cart power supply, battery, cable, or the panel itself
Will not run on battery         pack capacity under load, charger, or a charge interlock
Probe damaged after cleaning     the wrong chemical, soaking past the line, or a wet
                                connector; retrain and relabel
\`\`\`

> Exam tip: transmit, beamform, process, display, with cart power and ports underneath; B-mode is the gray scale image, M-mode is motion against time, Doppler reads the frequency shift of moving blood; gain amplifies everything and time-gain compensation amplifies by depth; mucous membrane contact means high-level disinfection, a cover does not replace it, and the wrong chemical or a wet connector is what kills probes.`,
      hook: "An ultrasound system transmits with per-element delays, beamforms the returning echoes, processes and displays them, and runs from a cart with power supply, battery, probe ports, and a control panel; B-mode is the gray scale image, M-mode plots motion against time, and color and spectral Doppler read the frequency shift from moving blood; gain amplifies everything while time-gain compensation amplifies by depth, so most odd-looking images are presets; probes touching mucous membranes need high-level disinfection with a cover that does not replace it, using only approved chemicals and never past the immersion line; and faults run dropout, poor contact, weak channels, display and cart power, and battery capacity under load."
    },
    {
      id: "u7l3", title: "Gamma Cameras, Nuclear Medicine, PET, and Hybrid Systems at Recognition Depth", domain: 4, obj: "FUN-A", minutes: 9,
      body: `Nuclear medicine inverts the usual arrangement: the radiation source is inside the patient and the equipment only listens. That changes the regulations, the hazards, and the boundary between your work and someone else's.

## The radiopharmaceutical
Atoms of one element that carry different numbers of neutrons are **isotopes**, and an isotope with an unstable nucleus is a **radioisotope**: it reaches stability by throwing out radiation, which is **radioactivity**. A **radiopharmaceutical** is such an atom attached to something the body handles in a known way, so the tracer collects where the physiology takes it. **Tc-99m** is the workhorse: it decays to technetium-99 emitting a gamma ray of about **140 keV**, which is the energy window the camera is tuned to. Activity falls by **half-life**: after each such period, half of whatever was there is left, so a tracer fades on its own clock. The length of the period belongs to the agent, and imaging favors short ones, which is why doses are assayed and used on a schedule rather than stored.

## The gamma camera chain
1. A **collimator** of lead holes bolted to the face of the detector accepts only gamma rays arriving along the hole axis. Without it there would be no image at all, and collimators are heavy, interchangeable, and easily damaged.
2. A large **NaI** scintillation crystal flashes light where a gamma ray is absorbed. It is fragile, and it cracks from mechanical shock and from rapid temperature change.
3. An array of **PMT** tubes behind the crystal, through a light guide, turns each flash into pulses.
4. **Position and energy circuits** compare the pulse sizes across the array to locate the event and to accept only events inside the energy window.
5. The **computer** builds, corrects, and stores the image.

**SPECT** rotates that camera around the patient and reconstructs slices, which adds gantry motion, uniformity, and center-of-rotation calibrations to the list. **PET** uses tracers such as **fluorine-18** that emit positrons; each positron meets an electron and annihilates, and the mass of both particles becomes photon energy, which is **energy equivalence** in plain sight: two photons of about **0.51 MeV** leave in opposite directions, and a ring of detectors accepts only pairs that arrive together, which is **coincidence** detection. **SPECT/CT** and **PET/CT** add a scanner for anatomy and attenuation correction, so everything from unit 6 comes with them.

## Instruments and the hot lab
Doses are measured in a **dose calibrator** before they are given, and contamination is found with survey meters. Both are calibrated and logged. The hot lab works behind shielding, with syringe shields, gloves, labeled containers, decay storage for waste, and surveys, all under a materials license held by the facility rather than by you.

## Where your work stops
\`\`\`
Yours                       Detector heads and gantry motion, collimator changers and
                            carts, table, covers, cooling, computers and network links,
                            daily flood and resolution phantom runs with the staff
Shared or vendor            photomultiplier tuning and energy peaking, crystal
                            replacement, deep electronics calibration
Physicist and licensee      dose calibrator calibration, surveys, license records,
                            wipe tests, and anything involving the material itself
\`\`\`

> Exam tip: a tracer goes in the patient and the camera only listens; collimator, sodium iodide crystal, light guide, photomultiplier array, position and energy circuits, computer; technetium-99m gives about 140 keV and activity falls by half-life; single photon emission tomography rotates the camera, positron tomography counts coincident photons of about 0.51 MeV from agents such as fluorine-18, and hybrids add a scanner; the dose calibrator and the license belong to the physicist and the facility.`,
      hook: "A radiopharmaceutical puts the source inside the patient, so the gamma camera only listens through a lead collimator, a sodium iodide crystal, a light guide, a photomultiplier array, and position and energy circuits into a computer; technetium-99m emits about 140 keV and every agent decays by its own half-life; rotating the camera gives single photon emission tomography while positron tomography counts the pairs of about 0.51 MeV photons from annihilation of positrons from agents such as fluorine-18, and hybrid units add a scanner for anatomy and attenuation correction; the dose calibrator, survey meters, hot lab, and license belong to the physicist and the facility, while heads, gantry, collimators, table, cooling, and computers belong to you."
    },
    {
      id: "u7l4", title: "MRI at Recognition Depth: Magnet, Gradients, RF Coils, Cryogens, and What the Technician Services", domain: 4, obj: "FUN-A", minutes: 9,
      body: `A magnet room is the most dangerous room you will service, and the danger has nothing to do with radiation. The field is always on, it cannot be switched off for your convenience, and it will take a tool out of your hand.

## What the system is made of
- The **magnet** is a superconducting coil carrying current with no resistance, immersed in liquid helium. Field strength is measured in tesla, commonly **3 T**, and **1 T** equals 10,000 gauss. The field never turns off.
- The **cold chain** keeps the coil superconducting: a **compressor**, a **cold head** on the magnet, and a **chiller** removing the heat. A warm cold head or a falling helium level is an emergency call, not a work order for next week.
- **Gradient coils** add a controlled slope to the field so position can be encoded. They are driven by large amplifiers, and the forces on them are what makes the banging noise.
- **RF** coils transmit the pulses and receive the signal. Transmit is usually built in; receive coils are the handled items, so their cables, connectors, and housings are the inspection list.
- The **shielded room** is a copper enclosure with a filter panel and a door that must seal, keeping outside radio energy out. A propped or failing door shows as interference lines in the image.
- The **table**, patient monitoring, and any peripheral in the room must be rated for the environment.

## Image formation, briefly
Protons in the body line up with the strong field. An **RF** pulse at the right frequency tips them out of alignment; as they relax back they emit a signal that the receive coils pick up, and the gradients let the system know where each signal came from. Tissues relax at different rates, which is the contrast. No ionizing radiation is involved.

## The safety rules, restated
\`\`\`
Zones         I public, II reception and screening, III controlled and badged,
              IV the magnet room itself
The 5-gauss   posted line where implants and pacemakers can be affected, so screening
line          happens before it
Labels        MR Safe, MR Conditional, MR Unsafe; conditional items carry the field,
              gradient, and radiofrequency limits they were tested to
Projectiles   any ferromagnetic tool, cylinder, or cart; screen every person and item
              every time, including yourself and your test equipment
Quench        loss of superconduction boils the helium off; the pipe vents outside, and
              a room-side release displaces oxygen
Cryogens      liquid helium boils at 4 K and liquid nitrogen at 77 K; both freeze skin
RF energy     deposited energy heats tissue, so looped or damaged coil cables burn
\`\`\`

## Yours, and the manufacturer's
Yours: the chiller and its water loop, filters, room temperature and humidity, helium level monitoring and alarms, coil and cable inspection, table motion, rated peripherals, the shielded door and its seal, power conditioning, and the console and network side. The manufacturer's, or shared under contract: cold head service and the cryogen fill, gradient amplifier and coil work, magnet shimming, and anything that would ramp or quench the magnet. Know that boundary before you are standing in zone IV with a meter in your hand that should not be there.

> Exam tip: a superconducting coil in liquid helium, commonly 3 T, with 1 T equal to 10,000 gauss and the field never off; compressor, cold head, and chiller keep it cold and a helium alarm is an emergency; gradients encode position and make the noise, radiofrequency coils transmit and receive; zones I to IV with screening before the 5-gauss line and MR Safe, Conditional, or Unsafe labels on every item; yours is cooling, coils, table, peripherals, room integrity, and computers, while cold head and magnet work is the vendor's.`,
      hook: "A superconducting coil sitting in liquid helium makes a field measured in tesla, commonly 3 T with 1 T equal to 10,000 gauss, that is never off; a compressor, cold head, and chiller keep it superconducting so a helium level alarm is an emergency; gradient coils encode position and make the banging while radiofrequency coils transmit and receive the signal from relaxing protons inside a copper shielded room whose door must seal; zones I to IV, screening before the 5-gauss line, MR Safe, Conditional, and Unsafe labels, projectiles, quench, and cryogens at 4 K and 77 K are the safety rules; and the technician owns cooling, coils and cables, table, rated peripherals, room integrity, and the console while the vendor owns the cold head and the magnet."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "PM, QC, and Test Equipment", domain: 4,
  blurb: "What an imaging preventive maintenance visit must do, the quality control tests by modality, and the instruments that measure the beam.",
  assumes: "Units 5 and 6.",
  lessons: [
    {
      id: "u8l1", title: "What an Imaging PM Requires, and QC by Modality", domain: 4, obj: "FUN-C", minutes: 11,
      body: `A **PM** visit on imaging equipment is not a cleaning round. It is a set of measurements against stated tolerances, and the record of those measurements is what the department shows a surveyor. Two sources set the content: the manufacturer's manual and the regulations that apply to that modality. Two kinds of work fill the schedule, and a surveyor expects to see them counted separately: **preventive maintenance**, the scheduled measurements this lesson is about, and **corrective maintenance**, the repair work unit 9 covers. The ratio between them is a health number for the whole program, because a room that needs constant correction is telling you its prevention is not working.

## What every imaging PM covers
\`\`\`
Mechanical          locks, brakes, detents, counterweights, cables and chains, bearing
                    play, rails, table travel, collision sensors, covers
Electrical safety   ground resistance at 0.5 ohm maximum and chassis leakage at
                    500 microamps for cord-connected patient-care equipment under
                    current NFPA 99, with an analyzer; IEC 60601-1 states touch
                    current as 100 microamps normal and 500 in a single fault
Interlocks          door, rotor ready, receptor parked, collimator, emergency stops:
                    prove each one blocks the exposure
Radiation output    kVp accuracy, timer, linearity, reproducibility, half-value layer,
                    collimation and alignment, leakage
Image quality       a phantom or test object at fixed geometry, compared with the
                    baseline on file
Software and logs   read the error log, note firmware versions, record before clearing,
                    patch only on the vendor's validated schedule
Environment         filters, fans, dust, room temperature and humidity, because heat
                    kills generators and detectors
Documentation       the measured value, the tolerance, and pass or fail, on the work
                    order and in the CMMS
\`\`\`

## Radiographic QC and its tolerances
\`\`\`
Test                     Tolerance                              Usual interval
Total filtration         at least 2.5 mm Al above 70 kVp        annually
Collimation, alignment   within 2 percent of the SID            semiannually
SID indicator            within 2 percent                       annually
Half-value layer (HVL)   meets the minimum for that kVp and     annually
                         waveform
Focal spot size          within plus or minus 50 percent of     annually
                         the nominal size
kVp accuracy             within plus or minus 10 percent        annually
Timer accuracy           5 percent above 10 ms, 20 percent      annually
                         at or below 10 ms
Exposure linearity       within 10 percent between adjacent     annually
                         mA stations
Reproducibility          within plus or minus 5 percent over    annually
                         repeated identical exposures
\`\`\`
Add one rule to all of it: repeat the affected tests after any major repair to the console, the high-voltage generator, or the tube, and whenever output looks wrong, rather than waiting for the anniversary.

## By modality
- **Fluoroscopy**: tabletop exposure rate against the 10 R/min and 20 R/min limits, the 5-minute audible timer, minimum source-to-skin distance of 38 cm stationary and 30 cm mobile, and a resolution and low-contrast test object at fixed geometry against the baseline.
- **Mammography**: the only modality whose schedule is law. Detector or processor daily, phantom image weekly, visual checklist monthly, repeat analysis quarterly or every 250 patients, compression at least semiannually, physicist survey annually and after a major component change.
- **Ultrasound**: a tissue phantom at fixed settings for penetration, resolution, and uniformity; probe inspection; the display against a test pattern; every control and footswitch.
- **CT**: your side is table, alignment, covers, cooling, and the air and water calibrations on schedule; the physicist's annual survey covers dose indices, image quality, and the radiation profile.

## The technician's QC and the physicist's survey
They are different jobs, and so are the two words people use for them. **Quality control** is the measuring: fixed tests, stated tolerances, recorded results. **Quality assurance** is the program around the measuring: the policies, the schedule, the training, the review of results, and the corrective action when something fails. A surveyor asks for both, and a binder of readings nobody reviewed is quality control without quality assurance. Your measurements prove that the equipment still performs within tolerance and are made on a repeating schedule with repeating methods. The medical physicist's annual survey is an independent evaluation, with dose measurements, shielding, and image quality assessed against the standards the facility is accredited to, and it produces a report with findings that someone has to close. Both records are asked for, and they are expected to agree.

> Exam tip: a PM is mechanical, electrical safety, interlocks, output, image quality, logs, environment, documentation; radiographic tolerances are kVp 10 percent, timer 5 percent above 10 ms and 20 percent below, linearity 10 percent, reproducibility 5 percent, collimation 2 percent of the SID, focal spot 50 percent, filtration 2.5 mm Al; retest after any major repair; and the physicist's annual survey is independent of your scheduled QC.`,
      hook: "An imaging preventive maintenance visit must cover mechanical items, electrical safety with an analyzer, every interlock proven, radiation output, image quality against a filed baseline, error logs and firmware, environment, and documentation of the measured value with its tolerance; radiographic tolerances are total filtration at least 2.5 mm Al, collimation and alignment within 2 percent of the SID, focal spot within 50 percent of nominal, kVp within 10 percent, timer within 5 percent above 10 ms and 20 percent at or below, linearity within 10 percent between adjacent stations, and reproducibility within 5 percent, all repeated after major repair; fluoroscopy, mammography, ultrasound, and computed tomography each add their own list; and the physicist's annual survey is an independent evaluation rather than a substitute for your schedule."
    },
    {
      id: "u8l2", title: "Measuring the Beam: kVp Meters, Dosimeters, Ion Chambers, Dose Area Product, HVL, Timer Checks", domain: 4, obj: "FUN-E", minutes: 10,
      body: `Nothing about radiation output can be judged by looking, and the console display is a selection rather than a measurement. Every statement you make about a beam has to come from an instrument, and every instrument has to be in calibration itself.

## The instruments
\`\`\`
Non-invasive kVp meter   sits in the beam on the tabletop and reports kVp, exposure
                         time, dose, dose rate, and half-value layer without opening
                         the generator, so time and mAs are verified independently
                         of the console
Ionization chamber       the reference detector: a gas volume whose ionization is
                         collected and measured; large volume means good low-dose
                         sensitivity
Solid-state detector     a semiconductor detector, compact and fast, used for output,
                         timing, and modern multi-function meters
Electrometer             the meter that measures the tiny charge a chamber collects
DAP meter                a flat transmission chamber on the collimator, reading dose
                         multiplied by field area as the case runs
Geiger-Muller counter    a gas detector run at a high enough voltage that every event
                         gives the same large pulse; fast and sensitive for finding
                         contamination and low-level radiation, poor at measuring dose
Survey meter             finds scatter and leakage around a room, in mR/h
Staff dosimeters         TLD and OSL badges read by a service, plus direct-reading
                         electronic dosimeters
\`\`\`

What separates those gas detectors is the voltage across them. Too low and the ion pairs find each other and recombine before they can be collected, which is the **recombination** region and is useless for measurement. At the working voltage of a dosimeter every pair is collected and the reading is proportional to the radiation, which is the ionization region. Far higher and a single event avalanches into one full-sized pulse, which is the Geiger-Muller region: excellent for hearing that radiation is present, no good for saying how much.

## Placing the meter so the number means something
Put the detector at a stated distance on the central ray, with nothing in the beam that is not supposed to be there, collimated to the detector and no smaller. Hold the geometry constant between exposures, because the inverse square law will swamp any effect you are trying to measure if the distance moves. Record what you set, what you measured, and where the detector was.

## The measurements themselves
1. **kVp accuracy**: expose at each commonly used station and compare the reading with the selection. Tolerance is 10 percent.
2. **Timer accuracy**: read the time the meter reports against the console. Tolerance is 5 percent above 10 ms and 20 percent at or below it.
3. **Linearity**: hold mAs constant and change the mA and time together, then compare output per mAs between adjacent stations. Tolerance is 10 percent.
4. **Reproducibility**: make several identical exposures, changing the controls away and back between them. Output must agree within 5 percent.
5. **Half-value layer**: measure output, then add calibrated aluminum sheets until the reading is half of the original, and compare the thickness with the minimum for that kVp and waveform.
6. **Fluoroscopic rate**: a chamber at the tabletop with phantom material in the beam, against the 10 R/min and 20 R/min limits.

## Phantoms and test tools
A beam alignment tool for perpendicularity and centering, a collimation template or coins on a cassette for light field agreement, pinhole, star, or slit tools for focal spot size, resolution and low-contrast phantoms for image quality, stepped acrylic or aluminum for exposure control response, and the accreditation phantoms for mammography and computed tomography.

## Units and conversions on the readout
Meters report in whichever family they were built for, so convert without hesitating: 1 Gy equals 100 rad, 1 Sv equals 100 rem, 1 R equals 2.58 x 10 to the minus 4 C/kg, and a fluoroscopic 10 R/min is 100 mGy/min. Air kerma in gray has replaced exposure in roentgen in modern instruments, and dose rate, not dose, is the quantity a fluoroscopic limit is written in.

## Calibrating the instruments
A measurement is only as good as the meter, so every dosimeter, chamber, electrometer, and kVp meter carries a calibration certificate with a date and traceability, usually renewed annually or on the manufacturer's interval. An out-of-calibration meter invalidates every record made with it, which is why the certificates are part of the documentation a surveyor asks for.

> Exam tip: the console shows a selection, the meter shows a measurement; a non-invasive meter gives kVp, time, dose, rate, and half-value layer from outside the generator; ionization chambers and solid-state detectors with an electrometer are the dose references; the dose area product meter sits under the collimator; half-value layer is measured by adding aluminum until intensity halves; 1 Gy is 100 rad and 1 Sv is 100 rem; and the meter's own calibration certificate is part of the record.`,
      hook: "A console display is a selection and only an instrument is a measurement, so a non-invasive kVp meter on the tabletop reports kVp, time, dose, dose rate, and half-value layer, while ionization chambers and solid-state detectors with an electrometer are the dose references, a dose area product meter under the collimator tracks dose times field area, and survey meters and badges cover scatter and staff; geometry is held constant, kVp is held within 10 percent, timers within 5 percent above 10 ms and 20 percent below, linearity within 10 percent, reproducibility within 5 percent, and half-value layer is found by adding aluminum until intensity halves; 1 Gy is 100 rad, 1 Sv is 100 rem, 1 R is 2.58 x 10 to the minus 4 C/kg; and every meter's own calibration certificate belongs in the record."
    },
    {
      id: "u8l3", title: "The Safety Analyzer and Voltmeter in the Imaging Suite, and Documenting PM and QC for the Surveyor", domain: 4, obj: "FUN-E", minutes: 10,
      body: `Two instruments cover the electrical half of imaging service: an analyzer that proves the equipment is safe to touch, and a meter that tells you whether the equipment is being fed and powered correctly. Then the records prove you did both.

## The electrical safety analyzer
The analyzer sits between the equipment and the supply and performs a fixed sequence.
1. **Visual inspection and cord check**: plug, cord, strain relief, chassis, and any accessory lead.
2. **Ground resistance**, chassis to the plug ground pin: **0.5 ohm maximum** for patient-care equipment under NFPA 99.
3. **Chassis (touch) leakage**, measured in normal polarity, reversed polarity, and with the ground open: **500 microamps** for cord-connected patient-care equipment in current NFPA 99 editions, where older editions used 300 or 100, so cite the edition your facility uses. IEC 60601-1 states touch current as **100 microamps** normal and **500 microamps** in a single fault condition.
4. **Patient lead leakage** where applied parts exist: type B and BF **100 microamps** normal and **500** single fault; type CF **10** and **50 microamps**. Earth leakage is **5 mA** normal and **10 mA** single fault.
Those limits matter in imaging because interventional and catheterization rooms have applied parts and catheters, which is where microshock, as little as **10 microamps** to the heart, becomes real.

## What differs on imaging equipment
Much of an imaging suite is **hard-wired**: the generator, the gantry, the table, the magnet. There is no plug to lift and no polarity to reverse, so the plug-based leakage sequence cannot be run at all.
\`\`\`
Cord-connected items     run the full analyzer sequence: portables, C-arms, ultrasound
                         carts, injectors, monitors, consoles on a cord
Hard-wired items         prove the equipment grounding and bonding from chassis to the
                         ground reference, check insulation and conductor condition,
                         verify the disconnect and overcurrent protection, and follow the
                         manufacturer's installation and service checks instead
Three-phase supplies     there is no single hot and neutral to reverse, so the test is
                         supply verification, phase rotation where it matters, bonding,
                         and panel condition, done with the electrician's involvement
\`\`\`
Write what you did and why on the work order. A blank where a leakage reading should be looks like an omission; a sentence saying the unit is permanently wired and naming the ground and bonding checks performed instead is a finding closed.

## The voltmeter inside the generator
A **DVM** or **DMM** answers the questions the analyzer cannot: is the incoming supply at the stated voltage and balanced, are the low-voltage rails at the values printed in the manual, is this interlock contact actually closed, is that fuse good. Measure resistance and continuity only with the equipment off and capacitors discharged, and measure voltage only when the circuit must be live and the room is clear. Do not go near the high-voltage section with a general purpose meter: tube potential is measured non-invasively, and a high-voltage divider is used only where the manufacturer provides one and the procedure calls for it.

## The documentation a surveyor wants
\`\`\`
Inventory          every device by control number, model, serial, location, risk class
PM records         what was due, what was done, completion rate, reasons for overdue
QC logs            signed and dated readings with tolerances, including the daily checks
                   the technologists perform
Physicist reports  annual surveys with findings and closure dates
Dosimetry          badge reports and any investigation of a high reading
Recalls            each notice, the devices affected, and what was done
Training           who is competent on what, contractors included
Calibration        current certificates for every test instrument you used
\`\`\`
All of it lives in the **CMMS** rather than in a folder, because that is where completion rates, due lists, and history reports come from. If the repair is not in the system it did not happen, and if the reading is not next to its tolerance the record does not prove anything.

> Exam tip: analyzer sequence is visual and cord, ground resistance 0.5 ohm, chassis leakage in normal, reversed, and open-ground conditions at 500 microamps under current NFPA 99, then patient leads at 100 and 500 microamps for type B and BF and 10 and 50 for CF, with IEC 60601-1 touch current 100 and 500; hard-wired and three-phase equipment gets grounding, bonding, and installation checks instead; measure resistance with the power off; and the record is the measured value beside its tolerance, in the CMMS.`,
      hook: "The safety analyzer runs visual and cord check, ground resistance at 0.5 ohm maximum under NFPA 99, chassis leakage in normal, reversed, and open-ground conditions at 500 microamps for cord-connected patient-care equipment in current editions where older ones used 300 or 100, and patient lead leakage at 100 and 500 microamps for type B and BF and 10 and 50 for type CF, with IEC 60601-1 touch current at 100 and 500 and earth leakage at 5 and 10 mA; hard-wired generators, gantries, and magnets have no plug to lift, so grounding, bonding, insulation, and installation checks replace the sequence; a voltmeter proves line voltage, rails, test points, and interlock contacts with the power off for resistance and never near the high-voltage section; and the record is the measured value next to its tolerance in the CMMS, alongside inventory, PM completion, QC logs, physicist reports, dosimetry, recalls, training, and instrument calibration certificates."
    }
  ]
});
