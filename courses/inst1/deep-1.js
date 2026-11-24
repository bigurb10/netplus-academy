// INST1 Academy deeper explanations, units 1 to 3. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u1l1: `## A day on a commercial job
The best way to learn who does what is to follow one task through a day. You are asked to pull and terminate 20 drops in a ceiling where the HVAC contractor has just hung new duct. Notice how many people your work touches before one cable is cut.

\`\`\`
Time    What happens                                  Who you deal with
07:00   safety briefing, review today's work areas   foreman
07:30   check the drawing revision for the floor      foreman, designer if unclear
08:00   find duct blocking the planned route          HVAC contractor, via the foreman
09:30   route approved; supports hung independently   foreman
11:00   pull and label cable                          your crew
13:00   firestop any opening you made                 inspector accepts later
15:30   test, clean up, floor protection back         foreman
\`\`\`

## Who answers what
Ask the **foreman** about your schedule, tools, and priorities. Ask the **designer** (through the foreman) about conflicts between drawing and field. Ask the **electrician** about anything on or near power. Ask the **general contractor** about access. The **inspector** is not someone to ask for permission to improvise; the inspector accepts or rejects finished work.

## Worked example
At 08:00 you find a new duct sitting where the drawing shows the cable route. The wrong answers: hang the cable from the duct (it is the HVAC trade's work and not a support), squeeze the cable under it (you may crush it or block service access), or move the duct (never touch another trade's work). The right answer is to stop, tell the foreman, and let the designer and HVAC contractor settle the route. Then you document the change on your as-built set.

## What conduct looks like
- Neat and workmanlike: bundles loose and parallel, labels facing out, no scraps left behind.
- Daily cleanup before you leave, so the next trade starts on a clean floor.
- Respect for the occupied space: floor protection, dust barriers, ceiling tiles replaced whole.
- Honest reporting: a damaged cable is reported, not buried in the wall.

## Where the credential fits
Installer 1 is the first rung. Installer 2 Copper or Installer 2 Optical Fiber comes next, then the Technician level, and the design path later leads to the RCDD.

> Remember: the installer places and pulls, but conflicts go up the chain, never sideways into another trade's work.`,

u1l2: `## Reading a hazard before you climb
A hazard review turns a vague worry into a short list of controls. You do it before the task, not after the near miss. The pattern is always the same: break the task into steps, name what could hurt you at each step, and pick the control.

\`\`\`
Task step                  Hazard                    Control
Move ladder to corridor    strain, door swing        two people carry; block the door
Set the ladder             unstable base             4-to-1 pitch, level floor, foot support
Open the ceiling tile      dust, falling debris      eye protection, hard hat
Pull cable overhead        sharp edges, cuts         gloves
Drill a hole in a beam     chips, noise              glasses, hearing protection
Core a slab                silica dust               water, vacuum, respirator
\`\`\`

## The 4-to-1 ladder rule, worked
The base of an extension ladder sits 1 unit out for every 4 units of working height. A ladder that reaches 4 m up a wall has its base 1 m out. A ladder reaching 5 ft up has its base 1.25 ft out. Too steep and it tips backward; too shallow and the base slides out.

Worked example: you need to step off onto a 3.2 m (about 10.5 ft) landing. The ladder must extend 1 m (3.28 ft) above the landing, so the landing edge, where the ladder rests, is the 3.2 m working height. One quarter of 3.2 m puts the base 0.8 m from the wall. Always use three points of contact, face the ladder, and stay off the top step of a stepladder or the top two rungs of an extension ladder.

## Energy control
Lockout and tagout is not a suggestion. If a task puts you near a circuit, the person who controls that circuit locks it and tags it. You never remove another worker's lock, and you never assume a panel is dead because it looks off. You are an installer, not an electrician, and power work belongs to the electrician.

## Stop-work triggers
- Suspected asbestos: stop, keep others away, report.
- Unknown dust or fumes: stop and ask for the air to be checked.
- A fiber end with a light source on: never look into it.
- Any injury: report it, however small.

> Remember: when a hazard has no control yet, the task waits. A late job is a smaller problem than a hurt installer.`,

u1l3: `## Reading a cable's identity
Every reel has a jacket print that tells you what it is. Learn to read it in a few seconds. A typical print runs along the jacket and repeats every two feet or so.

\`\`\`
Print element        Example           What it tells you
Maker and part       (the brand)       who made it
Construction         4PR 23 AWG        four pairs, 23 AWG conductors
Category             CAT 6A            performance level
Listing              CMP               plenum rating
Footage marks        0412 FT           running length on the reel
\`\`\`

## Why the twists matter
The twist rate of each pair is different on purpose, so no two pairs line up and couple noise to each other. A pair signal travels as a difference between its two wires, and noise that hits both wires equally cancels out. That is why untwisting more than 13 mm (0.5 in) at a termination for Category 5e and above degrades performance.

## Matching cable to the job
\`\`\`
Job                           Cable choice
Workstation drop              Category 6, solid, UTP
Wireless access point         Category 6A, solid, higher power margin
Patch cord                    Category 6, stranded
Plenum ceiling                same category, CMP jacket
Voice backbone                multipair, 25-pair binder groups
Cable TV drop                 RG-6, 75 ohm
\`\`\`

## Worked example
You pulled 600 ft of cable from a reel whose footage mark read 2150 at the start. At the end of the pull the mark reads 1550. The footage counts down, so you used 2150 - 1550 = 600 ft. If the print shows a CMR jacket and the job is a plenum ceiling, that cable cannot be used even if the category is right. A higher rating can replace a lower one, never the reverse.

## Shielded cable
F/UTP, S/FTP, and other STP cable need a bonded shield. A shielded cable whose shield is left unbonded loses the benefit of the shield and can cause noise problems.

> Remember: solid for the wall, stranded for the cord; category sets the frequency; the print tells you the truth.`,

u1l4: `## Reading a fiber cable
A fiber cable has several layers, and every layer has a job. From the center out: the glass core and cladding (125 micron cladding in both families), a coating, a buffer, strength members, and a jacket. Knowing the order lets you strip it without cutting what you should not.

\`\`\`
Layer              Job
Core               carries the light
Cladding           keeps the light in the core
Coating            protects the glass; 250 micron
Buffer             tight 900 micron, or loose tube
Strength member    aramid yarn that takes the pull
Jacket             outer protection and the printed identity
\`\`\`

## Matching type to system
\`\`\`
Fiber         Source                Wavelengths     Typical use
OM1, OM2      LED                   850, 1300 nm    short older links
OM3, OM4      VCSEL                 850 nm          laser optimized links
OM5           VCSEL                 850 nm and wider  wideband links
OS1, OS2      laser                 1310, 1550 nm   long distance
\`\`\`

## The 12-color code, worked
Strands in order: Blue, Orange, Green, Brown, Slate, White, Red, Black, Yellow, Violet, Rose, Aqua. A 24-fiber cable has two groups: strands 1 to 12 in solid colors, and strands 13 to 24 in the same colors with a black tracer, except the black strand, which takes a yellow tracer.

Worked example: strand 15 is the third color of the second group, so it is green with a black tracer. Strand 20 is the eighth color, so it is black with a yellow tracer. A loose-tube cable with 6 tubes of 12 fibers colors the tubes with the same order, so fiber 5 of tube 3 is slate in a green tube.

## Armor and bonding
Armored cable has a metal layer. Interlocking armor is bonded to the telecom bonding system at each end, because it is a conductive path that can carry fault current. Plain jackets need no bonding.

## Jacket colors
Colors are voluntary and vary by maker, so a color on its own never tells you the type. Always read the print.

> Remember: tight buffer inside, loose tube outside, and bond the armor.`,

u1l5: `## A sample legend, decoded
Every sheet has a legend. On the sample telecom sheet below, read the legend first and the drawing second. Each symbol means exactly what the legend says on that sheet, and the legend on the next job may use the same shape for something else.

\`\`\`
Symbol               Meaning on this sheet
Triangle, one fill   voice outlet, one port
Square, one fill     data outlet, one port
Triangle and square  voice and data outlet, two ports
Circle with W        wireless access point on the ceiling
Heavy dashed line    cable tray above the ceiling
TR in a box          telecom room
\`\`\`

## Counting outlets from a floor plan
Take the sample floor: four offices along one side, an open area in the middle, and a conference room.

\`\`\`
Room           Symbol                            Outlets (ports)
Office 301     one voice and data                2 ports
Office 302     one voice and data                2 ports
Office 303     one voice and data                2 ports
Office 304     one voice and data                2 ports
Open area      six data squares                  6 ports
Conference     two voice and data                4 ports
Hall ceiling   two access points                 2 ports
Total                                            20 ports
\`\`\`

The count is 20 ports. Check the schedule: it should list the same 20 outlet IDs. If the floor plan says 20 and the schedule says 19, the drawing and the schedule disagree. Do not guess which is right.

## Scale in practice
Suppose the title block says 1/8 in = 1 ft. A line on the sheet 2 in long represents 16 ft of building. Measure the route along the pathway, then add the vertical drops and the slack. A route that scales to 80 ft on the sheet can be 95 ft after drops and slack.

## When the field differs
Stop, ask the designer in writing, and mark the change on your as-built set. The revision, the schedule, and the field must agree when you finish.

> Remember: legend first, counts from the symbols, measure the route not the line, and write down every change.`,

u1l6: `## A delivery check, step by step
A good installer treats a delivery the way a pharmacist treats a prescription: check it before accepting it. A fast, written check prevents most installation delays.

\`\`\`
Order line            Delivered           Result
Category 6 box, 4     4 boxes             match
Category 6A box, 2    1 box               short; note on slip
CMP rating, 2 boxes   2 boxes, CMR print  wrong listing; reject
Jacks, 100            100                 match
J-hooks, 200          190, 3 bent         short and damaged; note
\`\`\`

The **CMP versus CMR** line is the dangerous one. The box says one thing and the jacket says another, so you open a reel and read the jacket. A riser cable cannot go in a plenum ceiling.

## Materials against the drawings
Count from the drawings: if the plan shows 80 outlets, you need at least 80 jacks plus spares, 80 faceplates, and enough cable for 80 routes plus slack. Compute cable by route length, not by hope. For 80 drops at an average of 55 m, you need 80 x 55 = 4400 m, which is about 14 400 ft. Add waste and slack, and compare with the delivered footage.

## Tool care
- Strippers: blades sharp, set for the cable's jacket, never for a different one.
- Punch-down tool: blade seated and the right type for the block.
- Crimper: dies matched to the plug.
- Label maker: fresh tape and a clean head.
- Tester: batteries charged, adapters clean, reference done at the start of the session.
- Ladder: inspected each day.

## Staging
Stage materials in the work area or a locked cage. Keep reels covered and off a wet floor. Keep boxes labeled with the room or the pull. A crew spends less time searching when staging follows the drawings.

> Remember: check, count, note damage before you sign, and track footage from the first cut to the last.`,

u1l7: `## One cable, labeled end to end
The best way to learn a labeling scheme is to label one cable from the TR to the outlet. Take a Category 6A cable to outlet B in room 306 on the third floor, landing on port 14 of the second patch panel in TR 3A. Here is the scheme this job uses, from the specification.

\`\`\`
Item              Pattern                Example
Space             floor + letter         3A
Panel             room - panel           3A-PP2
Panel port        panel - port           3A-PP2-14
Outlet            floor - room - port    3-306-B
Cable             panel port / outlet    3A-PP2-14 / 3-306-B
\`\`\`

## The full label set
\`\`\`
Where the label goes               Text on it
Cable at the TR end, near the panel 3A-PP2-14 / 3-306-B
Patch panel port 14                3A-PP2-14
Cable at the outlet end            3A-PP2-14 / 3-306-B
Faceplate, port B                  3-306-B
Pathway where cable enters         3A-C1 (conduit 1)
Bonding conductor to the SBB       3A-SBB1 at both ends
\`\`\`

Both ends carry the same cable identifier, which names both ends. A tech who finds only the TR end knows the outlet, and a tech who finds only the outlet knows the panel and port.

## Placing the label
Put it within sight of the end, where it reads without moving the cable. Wrap it around the jacket so it faces out, not under a bundle. Use a machine-printed, durable label. A handwritten label smudges and a flag label falls off.

## Worked example
You test the cable and save the result using the identifier {{3A-PP2-14 / 3-306-B}}. The tester file, the panel record, the drawing, and the label now all say the same thing. If any one disagrees, the record is wrong and an inspector or a tech will find it.

## The four classes and closeout
Administration scales from one telecom room to several campuses. At closeout hand over the labeled records, the as-built drawings, and the test results.

> Remember: one scheme, both ends, machine printed, and all four records agree.`,

u2l1: `## Who wins when documents disagree
Most disputes on a job come from the same question: who has the final word? The order below settles most of them. The stricter document usually wins, and when it does not, the AHJ decides.

\`\`\`
Source                 Force          Example
Adopted code           the law        the NEC after your state adopts it
AHJ ruling             binding        the inspector's decision on a firestop
Contract and spec      binding        the cabling category the owner ordered
Standard               guidance       the TIA standard when no contract calls for it
Manufacturer           warranty       the listed installation instructions
\`\`\`

A standard turns binding when a code, a contract, or a specification calls for it. A specification that says "install per the TIA-568 standard" makes the standard part of your contract.

## Listing versus labeling
A product is **listed** when an NRTL (UL is the best-known one) tests it and puts it on a published list for a stated use. The label on the product shows that listing. A cable listed as CMR is not acceptable for a plenum. A firestop system is listed for a certain wall and penetrant, and not for another.

## Worked example
The drawing shows one outlet height. The AHJ says accessibility rules require a different one. Your own habit says a third. Three sources, three answers. The AHJ's rule wins, because mounting heights and permit rules are the AHJ's call. You document the conflict, ask the designer to update the drawing, and mount to the AHJ's height.

## Examples of what each family covers
\`\`\`
Question                         Document family
What does the cable need to be?  TIA-568
How big and where is the TR?     TIA-569
How do I label it?               TIA-606
How do I bond it?                TIA-607
What cable rating in the plenum? NEC (NFPA 70)
What PPE do I wear?              OSHA
\`\`\`

## What to do
When you do not know which governs, ask the foreman and the designer in writing. Write down the AHJ's answer, with the date and the person's name.

> Remember: codes are law, standards bind through contracts, the AHJ decides, and the stricter rule wins.`,

u2l2: `## A listing table you can use
When you stand under a ceiling with a cable in your hand, you ask three things: what space is this, what rating is this cable, and is the rating at least as high as the space requires?

\`\`\`
Cable        Rating   Plenum   Riser   General   Limited use
CMP          highest  yes      yes     yes       yes
CMR          next     no       yes     yes       yes
CMG or CM    general  no       no      yes       yes
CMX          limited  no       no      no        dwellings, raceways only
\`\`\`

Fiber and coax follow the same order: OFNP, OFNR, OFN; OFCP, OFCR; CATVP, CATVR, CATV. The extra letter P means plenum, R means riser, and no letter means general.

## Three where-may-it-go cases
\`\`\`
Case                                        Cable in hand   Allowed?   Why
1  Pull to a drop above an air-return ceiling   CMR         no         riser is lower than plenum
2  Pull through a firestopped floor opening     CMP         yes        higher rating may replace lower
3  Run on one floor, no air handling above      CMR         yes        riser may replace general
\`\`\`

Case 1 is the classic violation. The cable is a good cable in the wrong place. Case 2 costs more than it needs to, but it is allowed. Case 3 is legal and common when a project buys one cable for several spaces.

## Worked example
A job has 40 drops in a plenum ceiling and 10 drops in a corridor with a solid ceiling and no air handling. The buyer orders CMP for the plenum and CMG for the corridor. Halfway through, the CMG runs out. Can you finish the corridor with CMP? Yes, since a higher rating may replace a lower one. Can you finish the ceiling with leftover CMG? No, since a lower rating can never replace a higher one.

## What the inspector reads
The inspector reads the jacket print. A missing or faded print means the cable is treated as unrated. A cable inside surface raceway in a plenum must still be plenum rated.

## Cords and small things
Patch cords and jumpers in a plenum space need plenum ratings too. A little cord in the wrong ceiling is still a violation.

> Remember: P above R above G above X; higher may replace lower; the print is the proof.`,

u3l1: `## A distance budget for one channel
A channel has a budget, and every meter you spend has to come out of one account or the other. The permanent link has 90 m (295 ft) and the cords have 10 m (33 ft) together. Together that is 100 m (328 ft).

\`\`\`
Piece of the channel                   Limit            Example
Horizontal permanent link              90 m  (295 ft)   78 m
Work area cord                         part of 10 m     3 m
Patch cord in the TR                   part of 10 m     2 m
Equipment cord                         part of 10 m     3 m
Cords together                         10 m  (33 ft)    8 m
Channel (link plus cords)              100 m (328 ft)   86 m
\`\`\`

## Estimating a link before you pull it
Do not scale the straight line on the drawing. A cable runs along a pathway, so add every segment.

\`\`\`
Segment                                   Length
TR to the corridor, along the tray        45 m
Corridor to the office, in J-hooks        24 m
Drop down the wall to the outlet           3 m
Service slack at the TR and at the outlet  6 m
Total route                               78 m
\`\`\`

## Worked example: one passes, one fails
Outlet A has a 78 m route. It is under 90 m, so the permanent link passes. With 8 m of cords the channel is 86 m, under 100 m. Outlet B in the far corner has a route of 92 m. The link is over 90 m, so it fails before any cords are added, and cutting a shorter cord does not save it. You tell the foreman; the designer may add a TR or a TE closer to that corner, or move the outlet.

Never cheat by shortening the cords on paper. The 10 m of cords is a limit on what users may plug in. The application also sets a limit, so the real distance can be shorter than 90 m for a fast service.

## Where each distance lives
\`\`\`
Subsystem              Where it ends
Work area              the cord ends at the equipment
Horizontal             the outlet to the TR on the same floor
Backbone               TR to TR, TR to ER, and ER to EF
\`\`\`

A **cross-connect** joins two cable runs through patch cords at a panel. An **interconnect** connects a run straight to the equipment. The horizontal has one cross-connect level and no tandem patch panels, and the backbone allows at most two levels. A bridged tap or a splice in horizontal copper is never allowed.

> Remember: 90 + 10 = 100, measure the route, and the permanent link is the part you build.`,

u3l2: `## Does the TR reach the far corner?
The reach rule says that no horizontal cable run may pass 90 m. A TR placed badly on a long floor can leave outlets out of range. Check the room against the farthest outlet on the floor before the walls go up.

\`\`\`
Option                           Route to farthest outlet   Result
TR at the east end               77 m + 8 m drop and slack  85 m  passes
TR at the west end               88 m + 8 m drop and slack  96 m  fails
TR in the center core            45 m + 8 m drop and slack  53 m  passes
\`\`\`

The drop and slack allowance is real cable. It is easy to forget when you scale the plan.

## A checklist for a new TR
\`\`\`
Check                 What you look for
Location              same floor as the work areas; centered in the core when possible
Reach                 no run over 90 m
Stacking              rooms line up from floor to floor for the backbone
Environment           conditioned air, clean, dry, lit well enough to read a label
Power                 dedicated, nonswitched duplex outlets
Bonding               a busbar installed and the TBB reachable
Door                  lockable, wide enough to move equipment
Floor load            checked with the designer for full racks
Intruders             no water pipes over the equipment, no storage
\`\`\`

## Backboard layout, worked
A TR has two walls plywood-covered. Each sheet is 1.2 m by 2.4 m (4 ft by 8 ft). A wall that is 3.6 m (11.8 ft) long needs 3.6 / 1.2 = 3 sheets set on edge, which means the 2.4 m dimension runs vertical. The plywood runs from 203 mm (8 in) above the floor to 2.6 m (8.5 ft). Do not split the difference in a taller room. Paint it with two coats of fire-retardant paint, unless the code requires fire-retardant treated plywood, in which case you do not paint it and you ask the AHJ whether the stamp stays visible.

## Fastening
On wood studs, align the sheet to the studs. On metal studs, use screws at least 12.7 mm (0.5 in) longer than the plywood is thick. In a hollow wall, use toggle bolts at least 6.3 mm (0.25 in) in diameter, 51 mm (2 in) from the edges and about every 610 mm (24 in). Leave no gaps between sheets.

## The TE
A TE serves at most 335 square meters (3600 square feet) on a floor and never replaces a TR. A metal TE is bonded.

> Remember: reach first, then environment, then backboard.`,

u3l3: `## Sizing the rack for a 96-outlet floor
A rack is a stack of rack units, and every piece of equipment takes a number of them. One rack unit (1 U) is about 45 mm (1.75 in).

\`\`\`
Item                                 Rack units
Four 24-port patch panels            4 U
Four horizontal cable managers       4 U
Switch (one per 48 ports)            2 x 1 U = 2 U
Backbone fiber panel                 1 U
Power strip, rear rail               0 U or 1 U
Total used                           11 U
\`\`\`

Eleven rack units is 11 x 45 mm, which is about 495 mm (11 x 1.75 in, which is 19.25 in). A 2.1 m (7 ft) rack has far more space, so this leaves growth room. Never fill a rack to the top on day one.

## Anchoring and bracing, in order
1. Mark the footprint on the floor and drill for expansion anchors.
2. Set the rack, add flat washers and lock washers, and tighten the anchors.
3. Brace the top to the wall, a tray, or a ladder rack so the rack cannot tip.
4. Apply any seismic bracing the AHJ requires.
5. Bond the rack with its own conductor to the busbar.

\`\`\`
Rack type        Best use                               Watch for
Two-post         patch panels, light equipment          tipping if overloaded
Four-post        heavy equipment                        weight; anchors
Cabinet          lockable, enclosed equipment           airflow and power
Wall mount       small zones and TEs                    wall must carry the load
\`\`\`

## Clearances
Use double-sided racks and keep both the front and the rear accessible. If no distance is specified, plan at least 1 m (3.28 ft) around and between equipment. A rack tight against a wall cannot be serviced.

## Cable management
Vertical managers sit on the sides and carry the bundles up from the pathway. Horizontal managers go by each patch panel and hold the cords. **D-rings** are fine for small bundles and cross-connect jumpers, but a bundle of many cables needs a ladder rack. Leave cord slack and a gentle bend, never a tight loop.

## Equipment fasteners
Use M5, M6, 10-32, or 12-24 threads to match the equipment, with star washers for bonding. A mixed bag of screws strips the threads.

> Remember: anchor, brace, bond, and keep front and rear open.`,

u3l4: `## A bonding layout for a three-floor building
A building has an entrance facility in the basement and a TR on each of three floors, each with two racks. This is the plan, from the service entrance to the last rack.

\`\`\`
Link                        From               To                   Conductor
BCT                         building service   PBB in the EF        shortest route
TBB segment 1               PBB                SBB in TR 1          insulated stranded copper
TBB segment 2               PBB                SBB in TR 2          insulated stranded copper
TBB segment 3               PBB                SBB in TR 3          insulated stranded copper
Rack bonding conductors     SBB in each TR     each rack            6 AWG minimum, 6 in total
Equalizer                   TR 1 SBB           TR 3 SBB             6 AWG minimum, if designed
\`\`\`

The **BCT** connects the PBB to the electrical service's grounding electrode system and is kept as short as possible. The **TBB** links the PBB to each SBB so every floor is at the same potential. The **rack bonding conductor** (formerly TEBC) is a 6 AWG minimum, stranded, insulated copper conductor from the SBB to each rack. Every bonding conductor is green, or green with a yellow stripe.

## Count the labels
Each bonding conductor is labeled at both ends.

\`\`\`
Conductors              Count   Labels (2 per conductor)
BCT                     1       2
TBB segments            3       6
Rack conductors         6       12
Total                           20
\`\`\`

## What else gets bonded
- Every rack and cabinet, each by its own conductor.
- Ladder rack and cable tray sections.
- Metal conduit, through a grounding bushing and a 6 AWG copper wire to the busbar.
- Cable shields and armored cable.
- The entrance protector.

## Names to know
The primary bonding busbar is formerly the TMGB. The secondary bonding busbar is formerly the TGB. The rack bonding conductor is formerly the TEBC. If a document shows an old name, translate it before you act.

## What not to do
Do not use a water pipe as the only telecom ground path, because plastic pipe or a meter breaks the path without anyone noticing. Do not daisy-chain rack to rack, because one loose joint drops every rack after it. Do not rely on a power cord ground as the only ground for a rack.

> Remember: PBB in the basement, TBB to each floor, an SBB in each room, and one conductor to each rack.`,

u3l5: `## A bond that passes the first time
A good bond is a short list of steps done in the same order every time. The mistakes are almost always shortcuts: paint left on, a lug squeezed with pliers, or a conductor bent around a corner.

\`\`\`
Step   Action                                       Why
1      Cut the conductor to the shortest route      less resistance and less to go wrong
2      Strip and install a compression lug          a crimp the right die closes
3      Scrape the metal to bare metal               paint insulates
4      Apply antioxidant compound                   keeps oxide off the joint
5      Bolt with a two-hole lug, star washers       two holes resist twisting
6      Label both ends                              the next tech can follow it
7      Check visually and for continuity            proves the joint
\`\`\`

## Routing rules
- Minimum bend radius 203 mm (8 in). Never bend a conductor to less than 90 degrees.
- Mount the busbar on insulated standoffs with at least 51 mm (2 in) of clearance behind it.
- Keep conductors away from sharp edges.
- No daisy-chaining. Each rack goes back to the busbar on its own conductor.

## Worked example: reading a resistance check
After the bonding is complete, the testing technician or the electrician measures the two-point bonding resistance between the busbar and the rack. The recommended maximum is 0.1 ohm (100 milliohms).

\`\`\`
Rack   Reading       Result    Likely cause if it fails
1      0.04 ohm      pass
2      0.06 ohm      pass
3      0.35 ohm      fail      paint under the lug, or no antioxidant
4      open circuit  fail      conductor not connected
\`\`\`

Rack 3 fails. The visual check finds a lug on painted metal. You loosen it, scrape the paint to bare metal, apply antioxidant, and tighten. The tech measures again and records 0.05 ohm.

## Who owns what
You make and label the telecom bond. The electrician makes any connection to an ac panel or service ground, because only qualified electricians connect there. The electrician or the testing technician verifies resistance and records it.

> Remember: bare metal, antioxidant, compression lug, shortest route, labels at both ends.`,

u3l6: `## Picking and spacing a pathway
Choosing a pathway is a three-part question: how much cable, where does it run, and what is next to it. A single table helps.

\`\`\`
Situation                              Choice               Reason
200 cables to a TR, ceiling space      cable tray           open top, easy to add
Heavy backbone cable in the TR         ladder rack          strong rungs for ties
A corridor, 30 cables                  wire mesh basket     light and shaped to the route
A small group of drops                 J-hooks or rings     low cost; keep within load
A finished room, no ceiling access     surface raceway      visible, covers the cable
Exposed or damaged-prone area          conduit              physical protection
\`\`\`

Continuous support carries cable along its whole length. Noncontinuous support holds it at points, no more than 1.5 m (5 ft) apart.

## Worked example: separation from power
A designer places a new cable pathway, grounded metal tray, alongside unshielded power cables carrying more than 5 kVA.

\`\`\`
Case                                                Needed distance   Your layout   Result
Unshielded power, open or nonmetal pathway          610 mm            600 mm        fails by 10 mm
Unshielded power next to a grounded metal pathway   305 mm            600 mm        passes
Power in grounded metal conduit, metal pathway      152 mm            600 mm        passes
Near an electric motor or transformer               1220 mm           600 mm        fails
\`\`\`

Which row applies depends on what the power is in and what the cable is in. If the power is unshielded and the pathway is open or nonmetal, 610 mm is needed and 600 mm fails by 10 mm. A grounded metal tray cuts the needed distance to 305 mm, which 600 mm easily meets. A motor or transformer needs 1220 mm, so 600 mm fails and the route has to move. Branch circuits of 5 kVA or less need no extra separation. When a table and the designer disagree, the stricter distance wins.

## Rules that never change
- Never attach to ceiling grid wires or the grid.
- Never attach to sprinkler pipes or another trade's conduit, duct, or hangers.
- Hang from the structure with your own rod, strap, or beam clamp.
- Keep clear of fluorescent, neon, and discharge lighting by 130 mm (5.12 in).

> Remember: size the pathway to the cable, keep it off other trades' supports, and let the stricter distance win.`,

u3l7: `## Matching the box to the cable
The box is where the cable ends its horizontal run and turns toward the jack. It has to be large enough for the bend, and that depends on the cable's outside diameter.

\`\`\`
Cable                      Bend radius      OD (sample)   Radius needed
Category 6, 4-pair UTP     4 x OD           0.25 in       1.0 in
Category 6A, 4-pair UTP    4 x OD           0.30 in       1.2 in
Two Category 6A in one box 4 x OD each      0.30 in       1.2 in, plus room for both
\`\`\`

A shallow box can force a Category 6A cable into a tighter bend than 1.2 in. The jack will pass a quick wiremap and later fail NEXT. A deep box gives the cable room to curve gently.

## Worked example: choose the box
The drawing says two Category 6A cables to a double-gang faceplate in an office. You have shallow boxes and deep boxes. The two cables with slack each need a 1.2 in radius, and the jack bodies take space. The shallow box leaves too little room, so the BEST choice is the deep double-gang box with a mud ring that matches the drywall thickness.

\`\`\`
Part                What to check before rough-in
Box                 single or double gang, shallow or deep, matches the drawing
Mud ring            thickness matches the wall finish
Low-voltage bracket never in a fire or smoke barrier unless listed for it
Conduit stub-up     reamed, bushed, with a pull string
Height              as the drawing and the AHJ set it, marked from the finished floor
Cover               tape or a cap over the opening during drywall work
\`\`\`

## Height and accessibility
Do not guess. Mounting height comes from the drawings and the AHJ, including accessibility rules. When two outlets near each other differ in height, check the drawing. Measure from the finished floor, not the subfloor.

## Faceplate and blanks
When the wall is finished, install the faceplate, fill every unused position with a blank, and label each port. A faceplate with a blank is a finished, serviceable outlet.

> Remember: choose the box for the bend radius, mark the height from the drawing and the AHJ, and blank every spare opening.`,

u3l8: `## A cut-in ring, step by step
A cut-in ring is a job where mistakes show up as holes in someone's wall. The method is slow on purpose. Work through the checks first, and only then cut.

\`\`\`
Check                       How                                       If the check fails
Studs                       stud finder, mark both edges              move the opening
Above the ceiling           look into the ceiling space               find the route first
Power in the cavity         scan, then open a small hole to look      stop; move the opening
Fire rating of the wall     read the drawing or ask                   use a listed box only
Level and height            mark from the finished floor, then level  re-mark
\`\`\`

## The sequence
1. Locate and mark studs; pick a bay with nothing in it.
2. Check the ceiling above for the route and for obstructions.
3. Scan the cavity for power.
4. Mark the opening with the ring template, level.
5. Cut slowly with a drywall saw. Cut small first; enlarge to fit.
6. Pass a fish tape or drop a string from the ceiling, tie the cable to it, and pull it through.
7. Slip the cable into the ring, seat the ring in the opening, and tighten the wings until the ring grips the drywall.
8. Leave slack and keep the bend radius.

## Worked example: a rated wall
The customer wants an outlet in a corridor wall that the drawing marks as a one-hour fire-rated wall. A standard cut-in ring is plastic and is not listed for the wall. The correct response is not to use it and hope. You stop, ask the foreman, and the designer specifies a box listed for that wall and a putty pad to seal it. You install exactly as the listing says and the AHJ accepts the work.

## Cleaning up
Vacuum drywall dust as you go, keep dust off the customer's furniture, bag the scrap, and take it with you. Patch only what you are permitted to patch.

## Common mistakes
- Cutting before scanning: the saw meets a wire.
- Cutting too big: the ring will not hold.
- Forgetting the string: the cable has to be fished through a closed wall.
- Using a plain ring in a fire-rated wall.

> Remember: locate, scan, mark, cut small, fish, set, and use only a listed box in a rated wall.`,

u3l9: `## Four ways to get an outlet to the middle of a floor
A conference table in the middle of a room needs power and data under it. Four options exist, and each has a different cost in fire rating, schedule, and flexibility.

\`\`\`
Option             Built when          Fire-rating effect                        Change later
In-slab conduit    before the pour     rating kept; conduit is in the slab       hard
Floor box          before or after     firestopped to its listing                moderate
Poke-through       after the slab      listed device restores the rating         easy
Access floor       with the floor      the slab below stays intact               easiest
\`\`\`

## The poke-through decision
A poke-through is the usual choice after the slab is poured. The decision has a short checklist.

\`\`\`
Question                                         Answer needed
Is the floor a rated assembly?                   find the rating on the drawings
Is a listed poke-through available for it?       match the device's listing to the floor
Is the slab scanned for rebar and conduit?       yes, before any core
Is the cable rated for the space below?          plenum below means plenum cable
Is the opening to be firestopped?                installed exactly to the listing
\`\`\`

## Worked example
The floor between level 2 and level 3 is rated two hours and the ceiling of level 2 is an air plenum. The drawing calls for a poke-through at the conference table. You scan the slab with the foreman and mark a clear spot. A core goes through; the poke-through is the device listed for that floor assembly and the cable type. The cables that go through it are plenum rated because they enter the plenum below. After the cabling, the installer firestops the device exactly as the listing says and labels it. An ordinary plastic box, or a core filled with foam, would leave the floor with a hole in its rating.

## Under an access floor
An access floor sits on pedestals with a void under the panels.
- Run cable in trays or baskets under the floor, not loose on the slab.
- Keep communications separated from power, as the separation table requires.
- Keep airflow clear. Mounds of cable block the cooling.
- Use the cable rating the space needs. An under-floor void used for air needs plenum cable.

## Floor boxes
A floor box set in a core needs a cover that keeps out water and dust, and a seal that restores the floor's rating.

> Remember: a rated floor stays rated only when the poke-through or floor box is installed exactly to its listing.`,

u3l10: `## Place by place: what can go wrong
The four locations in this lesson look unrelated, but each fails in the same way: a rule that fits the wall gets used where it does not belong. Walk each one with a short checklist.

\`\`\`
Location          Typical outlet          The trap                       The fix
Power pole        side-by-side jacks      power and data on one side     separate sides
Modular panel     raceway feed            tight bends in the raceway     use the wide channel; leave no kinks
Ceiling           access point, camera    plenum cable, no support       plenum rated cable, hung from structure
Hazardous area    listed fittings only    ordinary box and cable         listed for the location
Wet or exterior   weatherproof box        water follows the cable in     drip loop, gasketed cover
\`\`\`

## Worked example: the furniture feed
A cubicle cluster is fed from the floor by a whip of power cable and a bundle of Category 6A cable. The furniture maker's raceway is narrow. A Category 6A cable with a 0.30 in OD needs a bend radius of 4 x 0.30 = 1.2 in, and the raceway has a tight corner at the base. Two cables will be pinched. The fix is to use the wide channel the furniture maker provides for communications, keep the power on the other side, and leave slack at the feed so furniture can be moved without pulling on the cable.

## Ceiling outlets
An access point mounted above a tile needs a cable run to an enclosure or a box, supported from the structure. The loop of slack must fit in the box. If the space is a plenum, use plenum cable and a plenum-rated enclosure. Label the cable at the box with the same identifier that appears at the TR.

## Wet and exterior locations
Water follows a cable. Use a weatherproof box with a gasketed cover and sealed entries. Form a **drip loop**: let the cable hang low before it rises into the box, so water drips off at the bottom and never reaches the box.

## Hazardous locations
Never decide on your own that a space is ordinary. The AHJ and the designer classify a hazardous location. Use fittings and cable listed for it, installed as listed.

> Remember: power and communications on separate sides, listed products in special locations, and drip loops outdoors.`,

u3l11: `## Planning a sleeve through a rated floor
A riser sleeve is a hole you plan once and use for years. Plan three things: its size, its safety, and its seal.

\`\`\`
Question               Answer for this job
What goes through      a bundle of 4-pair cables, 0.25 in OD each
Sleeve size            2 in sleeve, ID 2.067 in
Design fill            designer says 40 percent at most on day one
Spare capacity         the rest is for growth
Protect the cable      bushing at both ends
Seal                   listed firestop system after cabling
\`\`\`

## Worked example: how many cables on day one
The 2 in sleeve has an ID of 2.067 in, so its area is proportional to 2.067 squared, which is 4.2725. The designer's day-one limit is 40 percent. Each cable is proportional to 0.25 squared, which is 0.0625.

Cables at the limit = 0.4 x 4.2725 / 0.0625 = 27.3, which rounds down to 27.

So the sleeve carries 27 cables on day one and holds growth room for the remainder. If the pull schedule calls for 30 cables, the sleeve is too small for the plan, and you tell the foreman so the designer can add a sleeve or enlarge it. Never stuff one more cable in.

## Coring safety, in order
1. Confirm the core location is on the drawing.
2. Scan the slab for rebar, conduit, and post-tension cables.
3. Put on eye protection, hearing protection, and a respirator.
4. Use water or a vacuum to keep silica dust down.
5. Core only where approved. Never cut into structure without the designer's approval.

## Sleeves, cores, and slots, compared
\`\`\`
Opening   Shape              Typical use                          Edge treatment
Sleeve    round pipe         wall or floor, cable bundle          bushed at both ends
Core      round drilled hole one or a few cables through slab     bushed or sleeved
Slot      rectangle          riser with many cables               framed
\`\`\`

## Unused openings
Cap and label them. If the wall or floor is rated, firestop them too. At the end of every workday, no penetration in a rated barrier is left open.

> Remember: scan before coring, bush the edges, leave spare capacity, and firestop every opening that holds cable.`,

u3l12: `## Filling a tray the way a designer does
A cable tray is sized from the cross-section of the cable it carries. In this example the designer limits the tray to 25 percent full on day one, which leaves room to add cable later. The fill percent is cable area divided by tray area. The designer's number wins; this example shows how the arithmetic works.

\`\`\`
Tray width                       12 in (305 mm)
Usable depth                     3.94 in (100 mm)
Tray cross-section               12 x 3.94 = 47.28 square in
Cable (sample Category 6A)       OD 0.30 in, area 0.0707 square in
\`\`\`

## How many cables at the limit
At 25 percent fill: 0.25 x 47.28 = 11.82 square in of cable area. Each cable takes 0.0707 square in, so 11.82 / 0.0707 = 167 cables, rounded down.

## What fill is 120 cables
120 x 0.0707 = 8.48 square in of cable. 8.48 / 47.28 = 17.9 percent. That is under 25, so the tray has growth room. If the job later adds 60 more cables, 180 cables is 12.73 square in, which is 26.9 percent, a little over the planning target. You tell the foreman before the next pull.

## Types and what to check
\`\`\`
Type          Support rule or detail
Ladder        rungs to tie to; good for heavy cable
Solid bottom  protects cable, holds heat; keep fiber cords off it
Wire mesh     supports within 0.6 m (2 ft) of each end and each side of a joint, then every 1.52 m (5 ft)
Center spine  cable hangs on both sides; careful with bend radius
Ladder rack   tubular, 38 mm (1.5 in) deep; width 152 mm (6 in) to about 1 m (3.28 ft)
\`\`\`

Support from the structure above with threaded rod, 16 mm (5/8 in) for heavy duty, anchored properly. Assemble with splice plates, and bond each section. A listed tray cut in the field may lose its listing, so ask the AHJ first.

## Transitions and drop-outs
Cable leaves a tray through a waterfall or drop-out, a curved fitting that holds the cable to its bend radius. Cable that drops over a bare edge is crushed. In a vertical run, secure each cable to the rung so the weight spreads over several supports. Keep the cable below the side rails, with retaining posts where needed. The depth of cable in a pathway should never exceed 152 mm (6 in).

> Remember: fill is cable area over tray area, plan for growth, bond every section, and use drop-outs at every exit.`,

u3l13: `## Spacing J-hooks along a corridor
J-hooks and bridle rings hold a bundle at points, so their spacing, sag, and load decide whether the bundle stays neat. The rule is a maximum of 1.5 m (5 ft) between supports.

\`\`\`
Run length            24 m
Maximum spacing       1.5 m
Minimum spaces        24 / 1.5 = 16 spaces
Hooks needed          17 hooks
\`\`\`

Sixteen spaces need 17 hooks. In practice you vary the spacing slightly, for example 1.2 m, 1.4 m, 1.3 m, and 1.5 m, so the bundle does not sag in a repeating pattern. No gap is allowed to pass 1.5 m. If a gap would pass it, add a hook.

## Load capacity
Each hook is rated for a number of cables, or for a bundle weight, and the rating is on its data sheet.

\`\`\`
Case                                    Cables planned   Hook rating   Action
Corridor today                          40               50            fine
Corridor after the next phase           62               50            over; use larger hooks or a tray
Ceiling over an open office, 200 cables 200              n/a           tray, not hooks
\`\`\`

Never exceed the hook's rating. When the count grows past it, the job needs bigger hooks or a tray.

## Worked example: a bad hang
A crew hangs hooks from the ceiling grid wires because they are close. The cable sags to the tile, and the tile bows. The grid wires carry the ceiling, and another trade owns them. The fix: take the hooks down, hang rod or beam clamps from the structure above, space the hooks at 1.5 m or less, and keep the sag shallow so the bundle never touches the grid.

\`\`\`
Rule                        Detail
Spacing                     1.5 m (5 ft) at most
Sag                         even and shallow; bundle off the tile and the grid
Attachment                  to the structure, never grid wires, the grid, or other trades' supports
Clearances                  away from lights and sprinkler heads
Bundles                     loose; no ties or staples that crush the jacket
Fiber cords                 off solid-bottom supports
\`\`\`

Hold the line on one point: independent supports. If a reasonable support point does not exist, stop and ask the foreman instead of hanging from someone else's work.

> Remember: 1.5 m or less, from the structure, within the load rating, and never from grid wires.`,

u3l14: `## Conduit fill, worked twice
Fill is the share of the conduit's inside area that the cables take up. The limits are 53 percent for one cable, 31 percent for two, and 40 percent for three or more. The formula uses squares because area goes with diameter squared.

\`\`\`
Fill percent = number of cables x cable OD squared / conduit ID squared x 100
\`\`\`

Here the conduit is EMT, and its inside diameter comes from a table, not from the trade size.

\`\`\`
EMT size   Inside diameter   ID squared
1 in       1.049 in          1.1004
1-1/4 in   1.380 in          1.9044
\`\`\`

## Worked example 1: how many cables at the limit
How many 0.25 in cables fit in 1 in EMT at 40 percent? OD squared is 0.0625.

Number = 0.40 x 1.1004 / 0.0625 = 7.04, so 7 cables. Always round down.

Check: 7 x 0.0625 / 1.1004 x 100 = 39.8 percent, under 40. Eight cables would be 45.4 percent, over.

## Worked example 2: the fill percent for a given count
A crew wants to pull 12 of the same cables in 1-1/4 in EMT.

Fill = 12 x 0.0625 / 1.9044 x 100 = 39.4 percent, under the 40 percent limit. It is allowed. Thirteen would be 42.7 percent, over.

\`\`\`
Conduit      Cables of 0.25 in OD   Fill percent   Result
1 in EMT     7                      39.8           pass
1 in EMT     8                      45.4           fail
1-1/4 in EMT 12                     39.4           pass
1-1/4 in EMT 13                     42.7           fail
\`\`\`

## Bends and pull points
\`\`\`
Rule                        Value
Bends between pull points   no more than two 90-degree bends
Distance between pull points  no more than 30 m (100 ft)
Conduit bend radius         6 x inside diameter for 2 in (53 mm) and smaller; 10 x above
Conduit carrying fiber      10 x inside diameter
\`\`\`

Add a pull box when a run would exceed either limit. A pull box stays accessible and is never buried behind a finished wall.

## Finishing
Ream the cut end, install a bushing, leave a pull string, and use sweeps for fiber and large cable. A raceway in a plenum needs plenum-rated cable. Innerduct, including ENT, must be listed for the space it passes through.

> Remember: 53, 31, 40; two bends; 30 m; look up the ID, square both numbers, and round down.`,

u3l15: `## From penetration to method
Choosing a firestop is a matching problem. You hold three facts, and the listing sheet must agree with all three: the assembly, the penetrant, and the opening. Then you pick the method the listing calls for.

\`\`\`
Penetration                           Assembly            Typical method class         What the listing decides
Bundle of cables, rectangular opening wall, rated        nonmechanical: pillows or sealant with board   product, depth, and packing
Many cables, repeated additions       wall or floor       mechanical: modules or blocks in a frame  which module fits
Single small cable, round core        floor, rated        nonmechanical: putty or sealant ring  product and depth
Metal conduit, round opening          wall, rated         nonmechanical: sealant or wrap as listed  product and gap size
Plastic conduit                       floor or wall       intumescent wrap or collar as listed  product and size
Back of an outlet box                 wall, rated         nonmechanical: putty pad  pad size and placement
Open slot for a riser                 floor, rated        framed opening with pillows or board (nonmechanical)  frame and filler
\`\`\`

## The pick, worked
You have a 4 in round core through a two-hour concrete floor carrying a bundle of cables. The three facts: a concrete floor of a two-hour rating, a bundle of cables, and a round opening of a stated size. You search the approval sheet for a system that lists all three. The sheet shows a system that uses a sealant with a stated depth and a mineral wool backing. You match the system exactly: the backing, the depth, and the product, not "something similar." If no system lists your combination, you stop and ask the designer or the AHJ.

## Mechanical or nonmechanical
A **mechanical** system is made of manufactured, presized elastomeric components, such as modules, blocks, and grommets, held in place by mechanical compression, sometimes in a frame. It is durable and can be reconfigured when cable is added. A **nonmechanical** system uses pliable materials molded or sized to the opening: putties, caulks and sealants, blankets, pads, foams, pillows, and intumescent wraps. Intumescent materials expand with heat; passive ones absorb or burn away heat. The listing, not your preference, says which one you may use.

## Ratings
\`\`\`
Rating   Meaning
F        hours the system keeps flames from passing; withstands a hose stream
T        hours the system keeps the cold-side temperature rise under a limit
L        how well the system seals against smoke leakage
\`\`\`

The system's ratings must meet or exceed the wall or floor's rating.

## After the install
Label it with the system number, the date, and the installer. Let the AHJ or inspector accept it before it is covered. Whenever a cable is added or removed, break the seal, add or remove the cable, and reseal. At the end of every day, no penetration in a rated barrier stays open.

## What never works
Foam, tape, rags, and insulation are not firestop. Neither is a system that is almost right.

> Remember: match the assembly, the penetrant, and the opening; install exactly as listed; label, inspect, and reseal.`

});
