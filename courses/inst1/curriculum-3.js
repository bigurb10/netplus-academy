// INST1 Academy curriculum, units 6 to 9. Original teaching content for the BICSI Installer 1 exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u6", n: 6, title: "Testing", domain: 5,
  blurb: "What is tested, what each number means, and how to run the tester.",
  assumes: "Unit 5: terminated links ready to test.",
  lessons: [
    {
      id: "u6l1", title: "Permanent Link and Channel: What Each Includes and When to Test It", domain: 5, obj: "5.1", minutes: 10,
      body: `The last jack on the floor is punched down, and the foreman asks for test results by Friday. Before you pick up the tester, decide what you are certifying. The installer certifies the cabling you installed. The user's equipment sees something larger.

## Two ways to measure one link
\`\`\`
Test            Runs from                           Includes            Limit
Permanent link  panel connector to outlet jack      fixed cable only    90 m (295 ft)
Channel         equipment to equipment              both cords too      100 m (328 ft)
\`\`\`
The permanent link is the fixed cabling: the horizontal cable and the connectors at each end. The channel adds the patch cord at the panel, the equipment cord at the work area, and any cross-connect between them. Cords total at most 10 m (33 ft).

## Which one you run
When you finish the installation, the patch cords do not exist yet, so you test the **permanent link**. The tester uses its own permanent link adapters, which are short, high-quality cords made for the test, so the result describes your work and not somebody's worn cord. A channel test is run when the contract asks for it, or when a working path is in question and you need to know what the user's equipment sees.

## Three kinds of tester
- **Certification** tester: measures every parameter across the whole frequency range and compares each to the limits of a category. Its report is the proof of a compliant link.
- **Verification** tester: checks connectivity, such as wiremap and length. It finds wiring faults but does not prove performance.
- **Qualification** tester: tells you whether an existing link can carry a given kind of traffic, such as a speed on a network. It does not certify the cable.

## Test before cords exist
Test as soon as a run is terminated, while the ladders are still up and the ceiling is still open. A failing link found in week one costs minutes. The same link found at closeout costs a ceiling tile, a lift, and a return trip.

> Tip: if the contract says "test to the category," that is a certification test. A wiremap tester alone does not meet it.

> Exam tip: the installer certifies the permanent link, 90 m, without patch cords. The channel is 100 m and includes the cords.`,
      hook: "Test the permanent link (90 m, no cords) when you finish; the channel (100 m) includes the cords; only a certification tester proves a category."
    },
    {
      id: "u6l2", title: "Test Parameters: Wiremap, Length, Insertion Loss, NEXT, Return Loss, Margin", domain: 5, obj: "5.1", minutes: 11,
      body: `A tester screen shows ten or more lines, each with a number and a PASS. Knowing what each line measures lets you read a failure and know where to look.

## What each parameter means
\`\`\`
Parameter          Plain meaning                              Lower or higher is better
Wiremap            each pin reaches the correct far pin       must be correct
Length             electrical length of each pair             shorter than the limit
Insertion loss     signal lost along the link                 lower
NEXT               crosstalk into a pair, near the tester     higher dB (more isolation)
PSNEXT             NEXT from all three other pairs combined   higher dB
ACR-F              far-end signal compared with far-end noise higher dB
Return loss        signal reflected back by mismatches        higher dB
Propagation delay  time the signal takes to arrive            lower
Delay skew         difference between fastest and slowest pair lower
\`\`\`

## Length and NVP
The tester measures how long the signal takes to travel, and converts that to length with the cable's **nominal velocity of propagation (NVP)**, the speed as a fraction of the speed of light. The conversion uses the cable's NVP, so choosing the wrong cable type gives a wrong length.

## Reading margin
Each result also shows a **margin**: how far the measurement is from the limit. A margin of 5 dB means 5 dB of room. A small margin is a pass but a warning: a slightly worse connector at the same link would fail. The tester reports the **worst case**, the single pair or pair combination closest to the limit, and the frequency where it occurs.

## What to do with it
A failing wiremap is a fault to fix before reading anything else. Loss and crosstalk results at high frequency point to termination quality, since the worst crosstalk usually comes from the last few inches of untwisted conductor.

> Tip: for a failing NEXT or return loss result, look at the worst-case pair and the distance reading before you reterminate anything.

> Exam tip: the tester reports the worst case, and margin is the room left before the limit.`,
      hook: "Wiremap first; insertion loss and delay want lower numbers, NEXT and return loss want higher dB; the tester shows the worst case and the margin."
    },
    {
      id: "u6l3", title: "Running the Tester: Reference, Limits, Autotest, Saving Results", domain: 5, obj: "5.1", minutes: 10,
      body: `It is 6:30 in the morning and you have 96 links to test before the ceiling crew arrives. A consistent routine is the difference between a clean report and a day of retests.

## Before the first test
1. Charge the tester and the remote unit.
2. Check the calibration date. A tester out of date is not accepted for a certification report.
3. Fit the right adapters for the test: permanent link adapters for a permanent link.
4. **Set the reference** with those adapters, at the start of each session.

## Each link
1. Choose the **limit**: the category, and permanent link or channel.
2. Choose the **cable type**, and the NVP if the tester asks for it.
3. Connect the main unit and the remote, and run **Autotest**.
4. Read the result. PASS, FAIL, or a pass with an asterisk.
5. Save with the **cable label as the name**, so the record matches the cable.

## The marginal pass
An asterisk means the result passes, but within the tester's own accuracy of the limit. Many specifications treat that as a fail, so ask the foreman or read the contract. Test again, and check the adapters first.

## Export for closeout
Download the saved results to the reporting software and keep the files with the other records. The closeout package includes the results for every link, and each must match a label on the drawings.

## Fiber loss testing
Fiber is tested with a **light source and a power meter** (an optical loss test set). Clean and inspect the connectors, set a reference, then measure. Multimode is tested at 850 and 1300 nm, singlemode at 1310 and 1550 nm. An **OTDR** shows where along the fiber the loss and reflections are, and is a recognition-level tool for this exam.

> Tip: re-reference whenever you change adapters or cords, and when the tester has been off for a long break.

> Exam tip: set the reference, pick the right limit, run the autotest, and save under the cable label.`,
      hook: "Charge, check calibration, set the reference, choose the limit and cable type, autotest, save under the cable label; fiber uses a light source and power meter."
    }
  ]
});

FRA.units.push({
  id: "u7", n: 7, title: "Troubleshooting", domain: 6,
  blurb: "Reading a failing test and fixing the cause.",
  assumes: "Unit 6: what each test result means.",
  lessons: [
    {
      id: "u7l1", title: "Wiremap Faults: Opens, Shorts, Reversed, Crossed, Split Pairs", domain: 6, obj: "6.1", minutes: 11, lab: "wiremap-fault",
      body: `A link fails the tester with a wiremap fault. Wiremap faults are the most common failure after a new termination, and the screen tells you which conductor to look at.

## The five faults
\`\`\`
Fault      What the screen shows                     Usual cause                              Fix
Open       a pin has no connection to the far end    conductor missed or poorly seated        reterminate the pair
Short      two pins connected to each other          stray strand, nicked jacket, a staple    find the touch point, reterminate
Reversed   a pair is wired tip to ring               tip and ring swapped within one pair     reterminate that pair
Crossed    pairs 2 and 3 arrive on each other's pins A on one end and B on the other          make both ends the same, retest
Split pair pins connect but pairs are not twisted    one wire from two pairs swapped          rewire to the color code
\`\`\`

## Why each happens
An **open** is almost always a conductor that did not seat in its slot, or a cut one. A **short** needs a conductor or a metal object touching the wrong thing; look for a nicked jacket where the cable rubbed a bracket. A **crossed** result when pairs 2 and 3 swap is the signature of T568A on one end and T568B on the other.

## The split pair is sneaky
A split pair has the right pin-to-pin connections, so a basic continuity check passes it. But the two wires in a pair are no longer twisted with each other, and the link fails NEXT. Only a wiremap tester that checks twisting, or the NEXT result, reveals it.

## The routine
Find the fault on the screen, go to the end the tester names, **reterminate**, and **retest**. Never assume the fix worked until the screen says so.

> Tip: if many links fail the same way, suspect a pattern, such as one end wired to the other standard, before you suspect many bad punches.

> Exam tip: crossed pairs 2 and 3 point to A and B on the two ends; a split pair passes continuity and fails NEXT.`,
      hook: "Open, short, reversed, crossed, split: read the screen, reterminate the named end, retest; a split pair passes continuity but fails NEXT."
    },
    {
      id: "u7l2", title: "Transmission Failures: NEXT, Return Loss, Insertion Loss, Length", domain: 6, obj: "6.1", minutes: 10,
      body: `The wiremap is clean and the link still fails. Now the problem is in how the signal travels, not where the wires go. Each failure has a short list of usual causes.

## Failures and usual causes
\`\`\`
Failure          Usual causes                                          First check
NEXT             too much untwist, low-category part, split pair       the terminations, the jack category
Return loss      kinked cable, tight cable ties, mixed impedance       bends, ties, cords and parts
Insertion loss   a run too long, hot ceiling, poor connection          length, temperature, terminations
Length           run over the 90 m permanent link limit                the route and the distance reading
\`\`\`

## NEXT
Untwist the pairs only as far as needed to reach the termination: at most 13 mm (0.5 in) for Category 5e and above. A longer untwist, or a jack or panel rated for a lower category than the cable, is the most likely NEXT failure.

## Return loss
Return loss is signal bounced back where the cable's impedance changes. A **kink** or a bend tighter than the minimum radius, a cable tie pulled until it dents the jacket, or a **mixed system** (cable of one impedance with a part of another) all produce reflections.

## Insertion loss and length
Loss grows with length and with temperature, so a long run through a hot ceiling space loses more. A result over the length limit means the run is longer than 90 m; check the route, because the tester reports the cable length, not the straight-line distance.

## Which end? Distance to fault
Many testers show a **distance to fault** for crosstalk and return loss. HDTDX locates crosstalk and HDTDR locates reflections. The number tells you how far from the tester the problem is, so you know which end to reterminate, or whether to look in the middle for a kink.

> Tip: a fault close to one end means reterminate that end. A fault far from both ends means the cable itself.

> Exam tip: NEXT usually means untwist or a low-category part; return loss usually means kinks, tight ties, or mismatched parts.`,
      hook: "NEXT: untwist or low-category parts; return loss: kinks, tight ties, mismatches; loss: length or heat; the distance reading names the end to fix."
    },
    {
      id: "u7l3", title: "A Troubleshooting Method: Isolate, Test, Fix, Retest, Document", domain: 6, obj: "6.1", minutes: 9,
      body: `A user's outlet "does not work," and a tester result is only one clue. A repeatable method gets you to the cause faster than guessing.

## The steps
1. **Gather the symptoms.** Which outlet, since when, what changed, and what exactly fails.
2. **Check the simple things first.** The patch cord, the switch port, and the label at both ends. Most failures are a loose or bad cord or the wrong port.
3. **Isolate the link from the cords.** Test the permanent link with the tester's own adapters. If it passes, the problem is in the cords or the equipment.
4. **Change one variable at a time.** Swap one cord, then retest. If you change three things and it works, you do not know which one fixed it.
5. **Fix and retest.** Reterminate or replace the failed part, then run the same test again and save the new result.
6. **Document.** Record the cause, the fix, the date, and your name, and update the records, the label, and the drawing if anything changed.

## An example
A phone will not link. The cord is good, the port is active, and the label matches. The permanent link test shows a split pair at the outlet. You reterminate the jack to the color code, retest, and the link passes. You save the new result under the same label and note the fix in the record.

## Mistakes that waste time
- Reterminating before you know which end is at fault.
- Replacing a part without testing the old one.
- Fixing the cable and not updating the tester file, so the report still says FAIL.

> Tip: keep one known-good patch cord in your pouch, so you can rule out cords in seconds.

> Exam tip: check the cord, port, and label first, isolate the link, and change one variable at a time.`,
      hook: "Gather symptoms, check cord, port, and label, isolate the link from the cords, change one thing at a time, retest, and document."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Retrofits", domain: 7,
  blurb: "Working in buildings where people work, and taking out what is no longer used.",
  assumes: "Unit 3: pulling and pathways.",
  lessons: [
    {
      id: "u8l1", title: "Working in Occupied Buildings: Surveys, Permits, Ceilings, Cutovers", domain: 7, obj: "7.1", minutes: 10,
      body: `The foreman sends you to a third-floor office where forty people are working. Nothing about this job is like an empty building, because everything you touch belongs to someone who is using it.

## Survey first
Walk the job before you promise anything. Look at the existing pathways, the ceiling type, and where cable already runs. Ask for the **asbestos report** for the building. If a space has not been cleared, stop and do not disturb it. Identify the live circuits: never assume an old cable or box is dead.

## Permits and hours
Hot work, ceiling access, core drilling, and after-hours entry may need permits and notice to the building. Work hours and permit rules are set by the owner and the authority having jurisdiction (AHJ). Ask; do not guess.

## Protect the people and the space
- Use dust barriers and drop cloths under any opening.
- Lift ceiling tiles carefully, set them aside flat, and put them back. Replace any you break or stain.
- Move furniture only with permission, and put it back.
- In a hospital, follow the **infection-control rules**, which may mean sealed work areas and special cleanup. Recognize that they exist and follow the instructions you are given.

## Cutover planning
\`\`\`
Step                Do
New cabling         installed, tested, and labeled before any move
Change window       agreed time when users can be without service
Back-out plan       a way to return to the old system if the new one fails
Labeling            old and new ends marked so nobody mixes them up
\`\`\`
Keep the old system working until the new one is accepted.

> Tip: take a photo of the ceiling before you open it, so the room looks the same when you leave.

> Exam tip: survey first, identify live circuits before touching anything, and have a back-out plan for the cutover.`,
      hook: "Survey, get the asbestos report, ask about permits, protect the occupants, identify live circuits, and plan the cutover with a back-out plan."
    },
    {
      id: "u8l2", title: "Abandoned Cable: Identifying It, the Removal Rule, Safe Removal", domain: 7, obj: "7.1", minutes: 9,
      body: `Opening a ceiling you find bundles of old cable that go nowhere. They add fire load and block your new pathway. The rule is to take out what is abandoned, but only what is truly abandoned.

## What counts as abandoned
The NEC treats installed cable as **abandoned** when it is not terminated at both ends and not identified for future use with a tag. Cable that has a connector or a termination at both ends is still in service, even if you think nobody uses it.

## The removal rule
The NEC requires that the **accessible portions** of abandoned cable be removed. The reasons: old cable adds combustible material, can mislead the next installer, and fills pathways.

## Confirm it is dead first
\`\`\`
Check                 How
Records               the drawings and the administration records show it unused
Tone and probe        trace both ends to the source, and find where it stops
Tester                a test shows an open or no connection at one end
Ask                   the owner or the IT manager confirms
\`\`\`
Do not cut a cable until you are sure it is not live, because it may carry a life-safety or building circuit.

## Removing it safely
1. Tag or mark both ends and confirm the route.
2. Cut near the end and pull the cable out gently from the far end, coiling as you go.
3. Do not force it; if it will not move, stop and look for a snag, a tie, or a firestop.
4. Firestop any opening you disturb.
5. Dispose of it as the site directs.
6. Update the records and drawings to show what was removed.

> Tip: tag cable you are leaving for future use, with the date and the purpose, so the next tech does not remove it.

> Exam tip: abandoned means not terminated at both ends and not tagged for future use; remove the accessible portions.`,
      hook: "Abandoned: not terminated at both ends and not tagged for future use; confirm it is dead, remove the accessible portions, firestop, update the records."
    }
  ]
});

FRA.units.push({
  id: "u9", n: 9, title: "Integration and Convergence", domain: 8,
  blurb: "The other systems that ride on, or beside, structured cabling.",
  assumes: "Unit 3: pulling and pathways.",
  lessons: [
    {
      id: "u9l1", title: "Cabling for Other Building Systems", domain: 8, obj: "8.1", minutes: 10,
      body: `The same ceiling holds data cable, a paging speaker line, a nurse-call line, and the fire alarm. Each belongs to a different trade, has different rules, and must not be mixed up.

## Common systems
\`\`\`
System            What it needs
Paging, sound     speaker or low-voltage cable, often a different type
 masking
Clocks            power and sync cable, as the maker specifies
Nurse call        listed cable in healthcare spaces, per the design
BAS (building     controller cable for sensors and control, often shielded
 automation)
Life safety,      listed fire alarm cable, a separate pathway, special rules
 fire alarm
Elevator          cable and pathways set by the elevator contractor
\`\`\`

## Rules that hold across systems
- **Use the cable the system calls for.** A fire alarm circuit needs fire alarm cable with the right listing, not data cable because it is on the reel.
- **Keep life-safety circuits separate.** Do not bundle them with other cables unless the code and the design allow it. They have their own pathways and identification.
- **Know who terminates.** Often the system's own contractor makes the final connections and tests. You pull and label the cable; do not terminate to equipment you were not assigned.
- **Coordinate with each trade.** Agree on the pathway, the schedule, and who firestops.

## Label and record
Label cables from other systems the same way, with unique identifiers, at both ends. Record them on the drawings so a shared pathway is understandable by the next technician.

> Tip: if you do not know what a cable is, do not cut it. Ask the foreman, who can trace it to a contractor.

> Exam tip: use the cable and listing the system requires, keep life-safety circuits separate, and coordinate with each trade.`,
      hook: "Other systems share the building: use the cable and listing each requires, keep life safety separate, know who terminates, and label everything."
    },
    {
      id: "u9l2", title: "Power Over the Cable: PoE Types, Bundle Heating, Wireless, DAS", domain: 8, obj: "8.1", minutes: 10,
      body: `A camera, a phone, and a wireless access point (AP) can all run on power from the data cable. This is Power over Ethernet (PoE), and it changes how you plan a bundle.

## PoE types
\`\`\`
Type    Power at the source
1       15.4 W
2       30 W
3       60 W
4       90 W
\`\`\`
The switch or injector is the power sourcing equipment (PSE). The camera, phone, or AP is the powered device (PD). The device receives less than the source sends, because the cable uses some of the power as heat.

## Heat in bundles
Current in a conductor makes heat. In a large bundle the heat from the inner cables has nowhere to go, so the temperature rises, and a warmer cable loses more signal. High-power runs carry the most current. What installers do:
- keep bundles **smaller** for PoE runs
- use **higher-category** or larger-gauge cable, which has less resistance
- **separate** the bundles and avoid packing them tightly in a closed space

## Wireless APs
An AP is often in the ceiling. It is cabled to an outlet near the AP, with a short cord to the device, and with enough slack to move it. Label the outlet and the AP.

## DAS at recognition level
A distributed antenna system improves cellular coverage inside a building using antennas and coaxial or fiber cabling. Know that it exists and that its own contractor usually designs and terminates it.

## Cameras and access control
Security cameras and door readers are often PoE devices. Plan the pathway and power budget, and label every outlet.

> Tip: ask the designer which PoE type each device needs before you choose the cable category.

> Exam tip: PoE types 1 to 4 are 15.4, 30, 60, and 90 W at the source; large bundles heat, so use smaller bundles or higher-category cable.`,
      hook: "PoE types 1 to 4 deliver 15.4, 30, 60, 90 W at the source; heat builds in big bundles, so use smaller bundles and higher-category cable."
    }
  ]
});
