// INST1 Academy curriculum, units 1 to 3. Original teaching content for the BICSI Installer 1 exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Field Planning", domain: 1,
  blurb: "Safety, the cables you will handle, reading the drawings, staging the job, and labeling it so the next tech can follow it.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "The Installer's Job, the ICT Trades, and Professional Conduct", domain: 1, obj: "1", minutes: 9,
      body: `On your first morning the foreman hands you a floor plan, a hard hat, and a pallet of boxed cable. You are an ICT cabling installer: you place the pathways, pull the cable, terminate it, label it, test it, and firestop the holes you make. Everything else on the job exists so those cables can do their work.

## The people around you
A commercial job is a crowd, and each trade owns its own work.

\`\`\`
Who                  What they own                         What you ask them
Foreman              your crew, schedule, and daily tasks  what to do next, who has the keys
Designer             the drawings and specifications       any conflict between drawing and field
General contractor   the whole project and the schedule    access to rooms, lifts, and areas
Electrician          power wiring and panels               anything on or near power
Fire alarm tech      the fire alarm system                its pathways, devices, and circuits
HVAC tech            ducts, air handlers, and plenums      ceiling space and air-handling rules
Inspector (AHJ)      the final word on code                what must pass before cover-up
\`\`\`

## Professional conduct
- Work neatly and to the drawings: straight runs, loose bundles, labels you can read.
- Clean up every day. Scrap, cable ends, and packaging go in the bin before you leave.
- Respect the occupied space: floor protection, dust barriers, and tiles put back.
- Never cover, move, or cut another trade's work. Ask the foreman, who asks that trade.
- Tell the truth about mistakes early; a bad pull caught Tuesday is cheaper than one found at inspection.

## Where this leads
Installer 1 is the entry certificate. After it come Installer 2 Copper and Installer 2 Optical Fiber, then the Technician level, and later the design path toward the RCDD.

> Tip: when two trades want the same space, the answer is never to squeeze your cable in. Tell the foreman and let the designer decide.

> Exam tip: when a question asks who decides a conflict on the job, the answer is the designer or the AHJ, never the installer's own guess.`,
      hook: "An installer places, pulls, terminates, labels, tests, and firestops, works around the other trades without touching their work, and asks before guessing."
    },
    {
      id: "u1l2", title: "Jobsite Safety: the Safety Plan, Hazards, PPE, Ladders and Lifts, Lockout", domain: 1, obj: "1.5", minutes: 11,
      body: `The foreman says the ceiling above the corridor needs a pull tonight, and a ladder is already leaning on the wall. Before you climb, there are three things you owe the job: you have read the safety plan, you have reviewed the hazards in the space you are about to work, and you are wearing what the site requires.

## Plan, review, protect
Verify and comply with the site safety plan. It lists the rules, the muster point, and who to call. A **job hazard review** walks the task step by step and asks what could hurt you at each step, then picks a control for it.

\`\`\`
PPE item              When you wear it
Hard hat              under overhead work, on any active construction floor
Eye protection        drilling, cutting, stripping, and anything that makes chips or dust
Gloves                pulling, cutting, handling sharp metal edges
Hearing protection    coring, hammer drills, mechanical rooms
High-visibility vest  loading docks, parking, and any traffic area
Safety-toe boots      the whole shift on a construction site
Respirator            concrete dust and drywall dust
\`\`\`

## Ladders, lifts, and falls
Inspect the ladder before every use. Set it at a 4-to-1 pitch: the base sits 1 unit out for every 4 units of height. Keep three points of contact, face the ladder, and never stand on the top step of a stepladder or the top two rungs of an extension ladder. Extend an extension ladder 1 m (3.28 ft) above a landing so you can step on and off safely. A lift or scaffold needs training first, and fall protection is worn as the plan says.

## Energy, air, and light
- **Lockout and tagout**: installers never work on energized power. The person who controls the circuit locks and tags it.
- **Asbestos**: if you suspect it, stop work, keep others away, and report it.
- **Silica dust** comes from coring concrete: use water or a vacuum and wear a respirator.
- **Fiber**: shards go in a sealed container, and you never look into a fiber end.
- **First aid**: know the kit, report every injury, however small.

Every chemical on the job, from firestop sealant to pulling lubricant, comes with a **safety data sheet** that lists its hazards, the PPE it needs, and first aid; keep the sheets where the crew can reach them. A **personnel lift**, such as a scissor lift or a **bucket lift**, is used only after training, with the gate closed and a harness where the lift requires one. A **powder-actuated tool** fires a fastener into concrete or steel with a charge; only a trained, certified operator uses one, with eye and hearing protection.

> Tip: a safe job is a quiet job. If you are about to improvise around a hazard, that is the moment to call the foreman.

> Exam tip: the FIRST step before any hazardous task is to review the site safety plan and the hazards, not to start and fix problems as they appear.`,
      hook: "Read the plan, review the hazards, wear the PPE, set the ladder at 4 to 1, never touch energized power, and stop on asbestos."
    },
    {
      id: "u1l3", title: "Copper Cable: Categories, UTP and Shielded, Conductor Size, Multipair, Coax", domain: 1, obj: "1.1", minutes: 10,
      body: `A box lands in the staging room with a jacket printed in tiny letters, and the foreman asks what it is. You need to read cable the way a mechanic reads a part number.

## Twisted pair
Four pairs of copper wire are twisted together because a twisted pair cancels most of the noise it picks up and most of the noise it makes. Tighter, more even twists carry higher frequencies. That is why a cable's category matters.

\`\`\`
Category   Rated frequency   Notes
5e         100 MHz           minimum for new work; 24 AWG typical
6          250 MHz           spline or tight twist controls crosstalk
6A         500 MHz           larger OD, so it fills pathways faster
\`\`\`

## Construction
- **UTP** has no shield and is the common horizontal cable.
- **F/UTP** has a foil around all four pairs. **S/FTP** has foil on each pair and a braid over the whole cable. **STP** is the general name for a shielded cable. A shield only helps when it is bonded.
- **23 AWG and 24 AWG**: the lower the number, the thicker the wire.
- **Solid** conductors run horizontal and punch down on an IDC. **Stranded** conductors make patch cords, which flex without breaking but lose more signal, so cords stay short.
- **Multipair** cable bundles pairs for voice backbone in 25-pair binder groups, each group marked by a colored binder.

## Reading the jacket
The print gives the category, the listing (CMP, CMR, CM), the AWG, and footage marks. Use the footage marks to track what you pulled. If the print is missing, treat the cable as unrated.

## Coax
RG-6 is the standard 75 ohm cable for video and cable television. RG-59 is older and thinner with more loss, used for short video and camera runs. RG-11 is thick and low loss for long and outdoor runs. Video systems are 75 ohm and radio systems are 50 ohm.

Four-pair UTP is a **balanced twisted-pair** cable: the two wires of each pair carry equal and opposite signals, so noise that reaches both wires cancels out. Keeping the twists, the pair order, and the untwist limit is what keeps the pair balanced.

> Tip: read the print at both ends of the reel before you cut. A reel that changes category midway is a returned reel.

> Exam tip: Category 5e is 100 MHz, 6 is 250 MHz, 6A is 500 MHz; stranded for cords, solid for permanent runs.`,
      hook: "Category sets the frequency, solid wire runs the walls, stranded wire makes the cords, and the jacket print tells you what you are holding."
    },
    {
      id: "u1l4", title: "Optical Fiber: Multimode and Singlemode, Buffers, Jackets, and the Color Code", domain: 1, obj: "1.2", minutes: 10,
      body: `A reel arrives with an orange jacket and the drawing calls for aqua. Before the foreman swears, you check the print: fiber jacket color is a convention, and the real type is printed on the cable. To handle fiber you need to know its parts and its names.

## Core, cladding, coating
Light travels in the **core**. The **cladding** around it bends the light back in, and is 125 micron on both multimode and singlemode. The **coating** protects the glass. A multimode core is 62.5 or 50 micron; a singlemode core is about 9 micron.

\`\`\`
Type   Core         Jacket color
OM1    62.5 micron  orange
OM2    50 micron    orange
OM3    50 micron    aqua
OM4    50 micron    aqua (some violet)
OM5    50 micron    lime green
OS1/2  about 9      yellow
\`\`\`

## Buffers and cable styles
- **Tight buffer**: a 900 micron coating on each fiber. Used inside buildings and easy to terminate.
- **Loose tube**: 250 micron coated fibers floating in a gel or dry tube. Used outdoors and transitioned at the building entry.
- Cables are made for indoor, outdoor, or indoor-outdoor use. Indoor-outdoor cable is built to survive both environments, so it needs no transition at the building entry.
- **Armored** cable has a metal layer that resists crushing and rodents. **Interlocking armor** must be bonded to the telecom bonding system.

## The 12-color code
Blue, orange, green, brown, slate, white, red, black, yellow, violet, rose, aqua. Fibers 13 to 24 repeat the colors with a black tracer; the black fiber takes a yellow tracer. Loose-tube cables color the buffer tubes with the same order, so you name a fiber by tube color and fiber color.

## Light and handling
Multimode uses LED or VCSEL sources at 850 and 1300 nm. Singlemode uses a laser at 1310 and 1550 nm. Never look into a fiber end.

Light stays in the core because the core bends light more than the cladding around it. Light that strikes the boundary at a shallow angle reflects back into the core, which is called **total internal reflection**. A bend that is too tight changes that angle and lets light leak out, which is why fiber has a bend radius.

> Tip: write the strand number on your pull sheet as you terminate. Colors fade in memory faster than on the buffer.

> Exam tip: when jacket color and print disagree, believe the print. And remember: tight buffer indoors, loose tube outdoors.`,
      hook: "Core, cladding, and coating make a fiber; OM1 to OM5 are multimode, OS1 and OS2 are singlemode, and the 12-color code names every strand."
    },
    {
      id: "u1l5", title: "Reading Blueprints: Symbols, Scales, Legends, Floor Plans, Riser Diagrams", domain: 1, obj: "1.3", minutes: 10,
      body: `The foreman unrolls the telecom sheet on the hood of the truck and says, "Count me the drops on the third floor." A drawing is a compressed set of instructions, and the first skill is knowing where to look.

## The frame of every sheet
- **Title block**: the sheet number, the project, the date, and the **revision**. Always confirm you hold the latest revision.
- **Legend**: decodes every symbol on the sheet.
- **General notes**: the rules that apply to the whole sheet, such as cable type or mounting height.

## Scales
A drawing is smaller than the building. An **architectural scale** reads in feet and inches, an **engineering scale** reads in decimal feet, and a **metric scale** reads as a ratio. Use the scale printed in the title block and measure along the route, not in a straight line.

## The sheet types
\`\`\`
Sheet                      What it shows
Floor plan                 outlets, rooms, and pathways on one level
Reflected ceiling plan     what is in the ceiling: lights, devices, access points
Riser diagram              how the floors connect, and the backbone between TRs
Details                    enlarged views: a firestop, a rack, a mounting
Schedules                  tables listing outlets, cable, or equipment
\`\`\`

## Telecom symbols
Outlets carry symbols for voice, data, or both, and a number or a count beside the symbol tells you how many ports. Pathways are drawn as lines with their own symbols: conduit, cable tray, and ladder rack each have a line style the legend decodes, usually with a size or tag beside it. A telecom room (TR) is drawn as a room outline with a boxed label, and an equipment room or entrance facility is tagged the same way, so you can find the room every run ends in. Each outlet also has an ID such as a room and port, and the ID is what you label.

## When the drawing and the field disagree
A wall is in the wrong place or a duct blocks the route. Stop. Do not guess. Ask the foreman, who asks the designer in writing. Document the change on your as-built set so the record matches what was built.

> Tip: take a photo of the revision block before you carry a sheet to the job. Old rolls stay on trucks for months.

> Exam tip: when the drawing and the field disagree, the FIRST step is to stop and ask the designer, then document the change.`,
      hook: "Read the title block, the revision, and the legend first; count outlets from the symbols; and when the field disagrees, stop, ask, and document."
    },
    {
      id: "u1l6", title: "Tools, Materials, and the Job Inventory", domain: 1, obj: "1.4", minutes: 9,
      body: `A forklift drops a pallet at the loading dock and the driver wants a signature now. Whoever signs owns what is on that pallet, so the check starts before the pen.

## Materials against the drawings
Your materials list comes from the drawings: how many outlets, how many jacks, how many feet of cable, how many boxes and supports. Inventory the supplies against that list. If a count looks low, tell the foreman while there is still time to order.

## Checking a delivery
\`\`\`
Check             What you look for
Part number       matches the order and the materials list
Category          printed on the box and the jacket, as ordered
Listing           the right rating for the space: CMP, CMR, CM
Quantity          the count and the footage, not just the box count
Damage            crushed boxes, kinked cable, wet cartons
\`\`\`

Note damage on the delivery slip before you sign. Move the material to the staging space, off the floor if it can get wet, and keep it where the crew can find it and strangers cannot.

## Installer hand tools
- **Strippers** remove the jacket without nicking the conductors.
- **Punch-down tool** seats and trims wire on an IDC.
- **Crimper** attaches modular plugs and some connectors.
- **Fish tape** pulls a string through a wall or conduit.
- **Label maker** prints durable labels.
- **Cable tester** checks wiremap before you leave the room.
- **Ladder**: inspect it before each use.

Keep blades sharp and clean. A dull blade nicks a conductor and a dirty one leaves a mess in a jack.

## Track the footage
Cable reels carry footage marks. Write the starting and ending mark for each cable on your pull sheet, so waste is visible and a short pull is caught before a reel runs out.

Paperwork sets the job before the first cable moves. The **scope of work** says what the crew installs and what it does not. The **bill of material** lists every part and its quantity, and a **cutsheet** lists each cable and the port it lands on. Product **submittals** go to the designer for approval before anything is ordered. At the **preinstallation meeting**, the crew, the contractor, and the owner agree on schedule, access, and site rules. When the drawings and the site disagree, the foreman sends a **request for information** and waits for the written answer instead of guessing.

> Tip: never leave a reel exposed overnight where weather or other trades can damage it.

> Exam tip: the FIRST step when a delivery arrives is to check it against the materials list and the order, then note any damage before signing.`,
      hook: "Check every delivery for part number, category, listing, quantity, and damage before you sign, then stage it and track the footage."
    },
    {
      id: "u1l7", title: "Labeling and Administration: Identifiers, Placement, and Records", domain: 1, obj: "1.6", minutes: 11, lab: "label-run",
      body: `Eight months after you leave, a tech stands in the TR with a dead data port and 400 cables that look alike. The label is the only thing standing between that tech and an all-day trace. You are labeling for a stranger.

## Why administration matters
Administration is the system of identifiers, labels, drawings, and records that makes a cabling system manageable. It follows one consistent scheme across the whole job, set by the specification or the designer, and you follow it exactly.

## What gets an identifier
Every space, panel, port, cable, pathway, and bonding conductor gets a unique identifier.

\`\`\`
Item           Example pattern                    Meaning
Space          3A                                 floor 3, telecom room A
Panel + port   3A-PP2-14                          room 3A, patch panel 2, port 14
Cable          3A-PP2-14 / 3-306-B                names both ends: panel and outlet
Outlet         3-306-B                            floor 3, room 306, port B
Bonding        3A-SBB1                            conductor to secondary busbar
\`\`\`

A cable identifier names both ends, so the tech holding either end knows the other.

## The rules
- Label **both ends** of every cable with the same identifier.
- Place the label within sight of the end, where it can be read without moving the cable.
- Use **machine-printed**, durable labels. Handwriting smudges, and tape flags fall off.
- Label bonding conductors at both ends too.

## Records
The four administration classes, at recognition level, grow with the system: one telecom room, one building, a campus, and several campuses. The larger the system, the more records it needs. At closeout hand over the as-built drawings, the panel and cable records, and the test results, all agreeing with the labels.

> Tip: print labels in the order you will pull, then check the first and last against the drawing before applying any.

> Exam tip: a label that disagrees with the drawing or the panel record is a defect; the FIRST step is to confirm which one is right, then correct the rest.`,
      hook: "One scheme, a unique identifier for everything, both ends labeled, machine printed, and records that agree with the labels."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Codes and Standards", domain: 9,
  blurb: "Who writes the rules, who enforces them, and the fire ratings that decide which cable may go where.",
  assumes: "Unit 1.",
  lessons: [
    {
      id: "u2l1", title: "Who Writes the Rules: Codes, Standards, the AHJ, and Listing", domain: 9, obj: "9.1", minutes: 10,
      body: `The inspector walks into the TR, points at a cable, and says it has to come out. You say the standard allows it. He says the code does not. Who wins? You need to know the difference before you argue.

## Code versus standard
A **code** is a rule adopted into law and enforced by an inspector. The NEC is a code once your jurisdiction adopts it. So are the **building code**, which covers construction, fire ratings, and exits, and the **fire code**, which the fire marshal enforces to keep the occupied building fire safe. A **standard** is a consensus document that sets the technical method. It is not law by itself, but it becomes binding when a code, a contract, or a specification calls for it.

## The AHJ
The **authority having jurisdiction** is the inspector, the fire marshal, or the building official whose decision wins on your job. Mounting heights, permit rules, and whether a product is acceptable are the AHJ's call. Local codes may be stricter than the national ones, and the stricter rule applies.

\`\`\`
Document            What it governs
NFPA 70 (the NEC)   wiring, cable listings, bonding, and firestop of penetrations
Building and fire   construction, fire ratings, and means of egress
codes
OSHA                jobsite safety for workers
TIA-568             cabling topology, distances, performance, and tests
TIA-569             pathways and spaces
TIA-606             administration and labeling
TIA-607             bonding and grounding
ISO/IEC 11801       the international structured cabling standard
\`\`\`

## Listing
A product is **listed** when an NRTL, such as UL, has tested it for a stated use and put it on a published list. The label on the product is how you and the inspector know it. A product listed for one use is not automatically acceptable for another.

## When documents disagree
Ask the designer in writing. The stricter requirement wins, and the AHJ settles anything unclear.

> Tip: keep the listing label or the jacket print visible until the inspector has passed the work.

> Exam tip: a standard becomes enforceable when a code or contract calls for it, and the AHJ's decision overrides your reading of any document.`,
      hook: "A code is law, a standard is consensus until a contract or code adopts it, the AHJ decides, and a listing proves a product was tested."
    },
    {
      id: "u2l2", title: "Cable Listings and Fire Ratings: Plenum, Riser, General Purpose, Limited", domain: 9, obj: "9.1", minutes: 10,
      body: `A pallet of cheap general-purpose cable is on sale, and the ceiling you are pulling through is an air return. Pull it and you create a violation that an inspector will find and you will pull out again.

## Plenum spaces
A **plenum** is a space used to move air, such as a ceiling void that returns air to the air handler. Fire and smoke in a plenum spread through the entire building through the air system, so cable there must burn slowly and make little smoke.

## The ratings
\`\`\`
Rating   Name             Where it may go
CMP      plenum           air-handling spaces; highest rating
CMR      riser            vertical runs between floors, through firestopped openings
CMG/CM   general purpose  horizontal runs on one floor; not plenum, not riser
CMX      limited use      dwellings and raceways; short runs
\`\`\`

Fiber and coax follow the same ladder: OFNP, OFNR, and OFN for nonconductive fiber, OFCP and OFCR for fiber with metal in it, and CATVP, CATVR, and CATV for coax.

## The substitution rule
A higher rating can replace a lower one. A plenum cable may go in a riser or a general space; a riser cable may go in a general space. A lower rating can never replace a higher one. General cable in a plenum or riser is a violation, even for a short run.

## Reading the listing
Read the jacket print. It shows the rating, the category, and the AWG. If the print is missing or unreadable, treat the cable as unrated and do not install it. The inspector reads the same print.

## What the inspector checks
- The print matches the space the cable is in.
- Pathways and openings are firestopped.
- Cable in a plenum is plenum rated, including cords and cable inside surface raceway.

> Tip: when the ceiling above a corridor is an air return, say so on the pull schedule before cable is cut.

> Exam tip: plenum (P) is above riser (R), above general (G), above limited (X). A higher rating may replace a lower one but never the reverse.`,
      hook: "CMP beats CMR beats CMG and CM beats CMX: a higher rating may replace a lower one, never the reverse, and the jacket print tells you which you hold."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Pathways and Spaces", domain: 2,
  blurb: "The rooms, the bonding, the outlets, the supports, the conduit, and the firestop that every cable depends on.",
  assumes: "Units 1 and 2.",
  lessons: [
    {
      id: "u3l1", title: "The Structured Cabling System: Subsystems, Topology, Distances", domain: 2, obj: "2", minutes: 10,
      body: `The drawing for a new office floor shows forty outlets, one closet, and a line labeled "to ER." Before you pull anything you need the map of the whole system and the limits it was designed to meet.

## The subsystems
\`\`\`
Subsystem             What it is
Work area             the outlet, the patch cord, and the equipment on the desk
Horizontal cabling    outlet back to the patch panel in the TR on the same floor
Telecom room (TR)     serves one floor; holds panels, racks, switches, cross-connects
Backbone cabling      links between TRs, equipment rooms, and entrance facilities
Equipment room (ER)   serves the building or campus; large equipment lives here
Entrance facility     where outside cable enters; protectors and the PBB live here
\`\`\`

Cabling between two TRs is backbone, even when they are on one floor.

## The hierarchical star
Every floor reaches back to a higher level; nothing runs in a ring or a chain. The main cross-connect (MC) is the top, usually in the ER. The intermediate cross-connect (IC) is an optional middle level. The horizontal cross-connect sits in the TR. The horizontal allows one cross-connect level only, with no tandem patch panels between the outlet and the TR. The backbone allows at most two levels. Bridged taps and splices are not allowed in horizontal copper.

## Cross-connect or interconnect
A **cross-connect** joins two cabling runs through patch cords or jumpers. An **interconnect** connects a run straight to equipment. A **consolidation point**, at recognition level, is an optional point in the horizontal that serves a cluster of outlets in an open office.

## Distances
\`\`\`
Horizontal permanent link         90 m (295 ft)
Horizontal channel                100 m (328 ft)
Patch and equipment cords         10 m (33 ft) total
\`\`\`

The permanent link is what you build; the channel adds the cords. Never stretch the 90 m to make a run work.

Backbone that runs between rooms inside one building is **intrabuilding backbone**. Backbone that runs between buildings on a campus is **interbuilding backbone**, and it usually enters each building through an entrance facility.

> Tip: measure the route, not the straight line. A 70 m wall-to-wall distance can be an 85 m cable route.

> Exam tip: 90 + 10 = 100 m. The permanent link is the part you install, and cords add the last 10 m.`,
      hook: "Work area, horizontal, TR, backbone, ER, and entrance facility form a hierarchical star, with 90 m links, 100 m channels, and 10 m of cords."
    },
    {
      id: "u3l2", title: "Telecommunications Spaces: TR, ER, EF, and TE", domain: 2, obj: "2.1", minutes: 11,
      body: `The foreman points at a janitor closet and says that is the new TR. Water pipes cross the ceiling and a floor drain sits in the middle. The room has to be right before the first rack goes in, because every cable on the floor ends here.

## What each space serves
A **TR** serves one floor or part of one. An **ER** serves the whole building or campus and houses large equipment. An **EF** is where outside cabling enters the building. A **TE** is a cabinet that serves a small zone of at most 335 square meters (3600 square feet) on a floor. A TE is never a substitute for a TR.

## Location
- At least one TR per floor, on the same floor as the work areas it serves.
- Place it so that no horizontal cable run passes 90 m.
- Stack TRs vertically so backbone pathways run straight.

## Environment
The room needs conditioned air, clean and dry conditions, good lighting, power outlets on dedicated, nonswitched circuits, and bonding already in place. The floor must carry the load of full racks, so ask the designer. The door must lock and be wide enough to move equipment in.

> Do not put in a TR: water pipes or drains over the equipment, unrelated equipment, storage, or anything that blocks the door.

## The backboard
\`\`\`
Item          Rule
Material      plywood, void free, A grade exposed, C grade on the wall, 15 percent moisture or less
Thickness     19 mm (3/4 in); sheets 1.2 m by 2.4 m (4 ft by 8 ft)
Height        from 203 mm (8 in) above the floor to 2.6 m (8.5 ft)
Paint         two coats of fire-retardant paint; if fire-retardant treated, do not paint
Where         at least two walls; all four if possible
Fasteners     on studs, screws 12.7 mm (0.5 in) longer than the plywood is thick
\`\`\`

If no clearance distance is specified, plan at least 1 m (3.28 ft) around and between equipment.

> Tip: lay out the backboard on the drawing and mark the conduit entries before the plywood goes up.

> Exam tip: a TE serves at most 335 square meters, and it never replaces a TR. A TR needs at least one per floor.`,
      hook: "A TR serves a floor, an ER the building, an EF the outside world, and a TE a small zone; keep water out and the backboard void free."
    },
    {
      id: "u3l3", title: "Racks and Cabinets: Anchoring, Clearances, Cable Management", domain: 2, obj: "2.1", minutes: 9,
      body: `The rack arrives on a pallet and the crew wants it standing before lunch. Standing is not the same as secure. A rack holds hundreds of pounds of equipment and the cables that feed it, and it is the one thing in the room that can hurt someone if it falls.

## Types
A **two-post rack** (also called a **relay rack**) holds light equipment and patch panels. A **four-post rack** or **cabinet** carries heavy equipment and gives better cable management. A **wall mount** serves small zones and needs a wall that can carry the full load. Equipment screws use M5, M6, 10-32, or 12-24 threads, with star washers for bonding.

## Sizes
\`\`\`
Item                 Standard
Width                483 mm (19 in); 584 mm (23 in) for service providers
Height               2.1 m (7 ft) normal
One rack unit (U)    about 45 mm (1.75 in) of vertical space
\`\`\`

## Anchoring and bracing
- Bolt a floor rack to the floor with expansion anchors, flat washers, and lock washers.
- Brace the top to the wall, a tray, or a ladder rack. Seismic bracing is whatever the AHJ requires.
- A wall-mounted rack goes on lag bolts and washers into the plywood.

## Clearances
Use double-sided racks and keep the front and the rear accessible. A rack pushed against a wall cannot be serviced. Plan the aisle so equipment can be moved in and out.

## Cable management
Vertical managers run at the sides, and horizontal managers sit by each patch panel. Leave room for cord slack. **D-rings** are fine for small bundles and cross-connect jumpers, but they never replace a ladder rack. Secure power strips to the rack and plug them into the dedicated outlets.

## Bonding
Every rack is bonded to the busbar with its own conductor. Never daisy-chain.

> Tip: set the rack's hole pattern by the first piece of equipment, then do not move it after the cables are in.

> Exam tip: anchor the rack to the floor, brace the top, and keep both the front and the rear accessible.`,
      hook: "Anchor to the floor, brace the top, keep front and rear clear, manage cables with vertical and horizontal managers, and bond every rack."
    },
    {
      id: "u3l4", title: "Bonding and Grounding: PBB, SBB, TBB, BCT, and What Gets Bonded", domain: 2, obj: "2.2", minutes: 11,
      body: `A storm takes out a switch in a building that passed inspection last year. The cause is not the cable, it is the difference in electrical potential between two rooms. Telecom bonding exists to keep that difference small. The busbars, the conductors between them, and the bonds to racks and pathways together make up the **telecommunications bonding infrastructure**.

## Why bond
Bonding joins metal parts so they sit at the same electrical potential. It also gives fault and surge current a deliberate, low-resistance path instead of letting it find one through a person or a cable. **Grounding** connects to the earth; **bonding** joins metal to metal. Telecom needs both.

## The parts
\`\`\`
Part                                   What it does
PBB (formerly TMGB)                    one per building; in the EF; bonded to the service ground
BCT                                    connects the PBB to the electrical service's grounding electrode system; keep short
TBB                                    insulated stranded copper from the PBB to each SBB
SBB (formerly TGB)                     one or more per TR or ER, in each room
Rack bonding conductor (formerly TEBC) 6 AWG minimum, from the busbar to each rack
Grounding equalizer                    6 AWG minimum between TRs, evening out potentials
\`\`\`

The BCT connects the PBB to the electrical service's grounding electrode system, the TBB links the SBBs on each floor, and each rack gets its own conductor back to the nearest busbar.

## What gets bonded
- Racks and cabinets
- Cable tray, ladder rack, and metal conduit
- Cable shields and armored cable
- The entrance protector

Use green, or green with a yellow stripe, for every bonding conductor.

## What not to do
Never use the water pipe as the telecom ground path on its own. Never rely on a power cord ground as the only ground for a rack. The telecom ground path is separate and verifiable.

> Tip: copy the old name next to the new on your notes. The exam and some drawings use both.

> Exam tip: the PBB is formerly the TMGB and the SBB is formerly the TGB. The TBB goes from the PBB to the SBBs, and the BCT connects the PBB to the electrical service's grounding electrode system.`,
      hook: "PBB in the entrance room, TBB up the building to each SBB, BCT to the electrode, and a green conductor to every rack, tray, and shield."
    },
    {
      id: "u3l5", title: "Making the Bond: Lugs, Connectors, Routing, Labels, Checks", domain: 2, obj: "2.2", minutes: 9,
      body: `The electrician hands you a spool of green 6 AWG and says the busbar is yours. A bond is only as good as its worst joint, and a joint made on painted metal is not a bond at all.

## The connection
\`\`\`
Step                What to do
Lug                 two-hole compression lug on every busbar and rack connection
Surface             scrape paint to bare metal
Compound            apply antioxidant, then bolt the connection
Hardware            star washers and the right screws for the equipment threads
\`\`\`

Do not use a lug made for a different wire size. A compression lug is crimped with the right die, not squeezed with pliers.

## Routing
- Take the shortest path, with no sharp bends. The minimum bend radius is 203 mm (8 in), and never bend a conductor to less than 90 degrees.
- Mount the busbar on insulated standoffs with at least 51 mm (2 in) of clearance behind it.
- Never daisy-chain rack to rack. Each rack gets its own conductor back to the busbar.
- Metal conduit and tray are bonded; a grounding bushing carries a 6 AWG copper wire to the busbar.

## Labels
Label both ends of every bonding conductor, in the same scheme as the rest of the job, so that the next tech can follow each conductor without opening the room.

## Checks
Make a visual check: tight, clean, correct lug, correct color, no sharp bends. Then a continuity check. Two-point bonding resistance is recommended at 0.1 ohm (100 milliohms) at most. The electrician or the testing technician verifies resistance; you do not guess it.

## Who owns the final tie
Only a qualified electrician connects to the ac panel ground or the service ground. Your job ends at the telecom busbar.

> Tip: keep a small bottle of antioxidant compound in the bag. A dry joint fails a test on day one.

> Exam tip: bare metal, antioxidant, compression lug, shortest path, no daisy chain, and both ends labeled.`,
      hook: "Scrape to bare metal, antioxidant, two-hole compression lugs, shortest route, no daisy chains, label both ends, and let the right person verify resistance."
    },
    {
      id: "u3l6", title: "Cable Support Systems: Choosing a Pathway, EMI, and Separation", domain: 2, obj: "2.3", minutes: 10,
      body: `The drawing shows a long corridor with a ceiling full of lights and ducts, and the foreman asks what you will hang cable from. The right support depends on how much cable it carries, where it runs, and what is near it.

## The choices
\`\`\`
Pathway             Best fit
Conduit             exposed runs, harsh spaces, and where the AHJ requires it
Cable tray          many cables; open access from above
Ladder rack         heavy cable and the TR; strong rungs to tie to
Wire mesh basket    corridors and ceilings; light, easy to cut and shape
J-hooks and rings   small bundles of cable; low cost
Raceway             surface runs in finished rooms
\`\`\`

**Continuous cable support** (tray, ladder rack, basket) carries the cable along its whole length. **Noncontinuous** support (J-hooks, rings) holds it at points. Noncontinuous supports are no more than 1.5 m (5 ft) apart.

## Where not to hang cable
Never attach to ceiling grid wires, the grid itself, sprinkler pipes, or another trade's conduit, duct, or hangers. Hang from the structure above with your own supports.

## EMI and separation
Power wiring and motors create **EMI**, and radio sources create **RFI**. Keep cable away from them. In plain words:

\`\`\`
Source                                         Minimum distance
Branch circuits 5 kVA or less                  none extra
Unshielded power, open or nonmetal pathway     610 mm (24 in)
Unshielded power next to grounded metal        305 mm (12 in)
Power in grounded metal conduit next to metal  152 mm (6 in)
Electric motors and transformers               1220 mm (48 in)
Fluorescent, neon, and discharge lighting      130 mm (5.12 in)
\`\`\`

Grounded metal pathways help. When a table and the designer disagree, the stricter distance wins.

> Tip: cross power at a right angle if the route forces a crossing; it keeps the shared length short.

> Exam tip: the FIRST concern for a new pathway beside power or a motor is separation, and the stricter of the table and the designer wins.`,
      hook: "Choose tray, rack, basket, hooks, conduit, or raceway for the load, hang from the structure, and keep distance from power, motors, and lights."
    },
    {
      id: "u3l7", title: "The Outlet at the Wall: Boxes, Rings, Heights, Box Fill", domain: 2, obj: "2.4", minutes: 9,
      body: `The sheetrock crew is hanging walls tomorrow and the electrician has set the boxes. This is the last chance to prepare the outlet, because everything after it is cutting holes.

## Boxes and rings
A **single-gang** box holds one device and a **double-gang** box holds two. A **deep** box gives room for the cable's bend radius, which matters most for Category 6A, with its larger OD and stiffer jacket. A **mud ring** (or plaster ring) finishes the opening to match the thickness of the wall. A **low-voltage bracket** holds a faceplate where there is no box.

\`\`\`
Part                 What it is for
Single-gang box      one jack or faceplate
Double-gang box      two faceplates, or heavy cable
Deep box             Category 6A or a thick bundle; room for bend radius
Mud ring             finishes the opening to the wall thickness
Low-voltage bracket  open wall; never in a fire or smoke barrier unless listed
\`\`\`

## Box fill
A box has only so much room. The cable, its slack, and the body of the jack must all fit without forcing a bend smaller than the radius. If they do not fit, choose a deeper box rather than crushing the cable.

## Mounting height
The mounting height comes from the drawings and the **AHJ**, including accessibility rules. Never guess it. Mark the height from the finished floor in the same place on every wall.

## Pathways from the box
Run **conduit** from the box up to the ceiling space as a stub-up when the wall is finished with no cavity, and leave a pull string in it. Ream and bush the end.

## Faceplates and blanks
Install the faceplate when the wall is finished. Fill every empty position with a blank so dust and mice stay out. Label it.

> Tip: tape the box closed after rough-in so drywall mud stays out of the jack opening.

> Exam tip: mounting height is set by the drawings and the AHJ. A box should be deep enough to protect the cable's bend radius.`,
      hook: "Choose the box for the cable and the bend radius, set the height from the drawings and the AHJ, stub a conduit up, and blank every empty hole."
    },
    {
      id: "u3l8", title: "Cut-In Rings and Old Work: Finding Studs, Cutting, Securing", domain: 2, obj: "2.5", minutes: 9, lab: "cut-in-ring",
      body: `The room is finished and the customer wants one more outlet on the wall behind the desk. There is no box and no open wall. You will use a **cut-in ring**, a cavity box that clamps to existing drywall. It is old-work, and the wall holds surprises.

## Before you cut
\`\`\`
Step                 What you do
Locate studs         use a stud finder; mark both edges of the stud
Look above           check the ceiling space above the wall for pathway and obstructions
Check for power      scan for wires in the cavity before any cut
Mark level           set the ring height, then draw the opening with a level
\`\`\`

A stud, a fire blocking, or a power cable inside the cavity means move the opening.

## The cut
1. Trace the ring template at the marked height.
2. Cut slowly with a drywall saw, staying inside the lines.
3. Drop a string from the ceiling space, or run a fish tape up from the opening, and tie on the cable. Pull the cable through.
4. Feed the cable into the ring, set the ring, and tighten the wings until the ring clamps the drywall.
5. Dress the cable, leave slack, and keep the bend radius.

## Fire-rated walls
In a fire-rated wall, use only a box that is listed for it, and firestop it to the listing. A low-voltage ring in a rated wall is not acceptable unless it is listed for that wall.

## Clean up
Vacuum the dust, bag the scraps, and patch only what you are permitted to patch. The customer's wall is not your dump.

> Tip: cut the hole smaller than you think. You can always make it larger.

> Exam tip: the FIRST step before cutting into an existing wall is to locate studs and check the cavity for power and obstructions.`,
      hook: "Find the studs, check the cavity for power, cut to the template, drop the string, set the ring, and use only a listed box in a fire-rated wall."
    },
    {
      id: "u3l9", title: "Floor Outlets, Poke-Throughs, and Access Floors", domain: 2, obj: "2.6", minutes: 10,
      body: `A conference room sits in the middle of an open floor, and the table will not touch a wall. The outlet has to come out of the floor, and the floor is a rated assembly, so every hole you make in it has a cost.

## Floor outlet choices
\`\`\`
Method             How it works                         Watch for
Poke-through       fire-rated device in a core hole     keeps the floor's rating only when installed to its listing
Floor box          in-slab box fed by conduit           firestopped and sealed to the listing
In-slab conduit    cast into the concrete before pour   planned on the drawings; hard to change later
Access floor       raised panels on pedestals           airflow and tile access
\`\`\`

## Poke-throughs
A **poke-through** is a device set in a core hole that carries cable up through the floor. It is a listed, fire-rated device and restores the rating when installed exactly as its listing says. The cables in it must match the space below: a plenum below means plenum cable. Only core where the drawings show, and never into structure without approval. Scan the slab first.

## Floor boxes
A floor box sits in a slab or a core and is fed by conduit or through a core. It must be firestopped and sealed to the listing, with a cover that keeps water and dust out.

## Under the floor
An access floor sits on pedestals, with a plenum-like void below.
- Support cable in cable trays or baskets under the floor, not loose on the slab.
- Separate communications from power as the separation rules require.
- Keep airflow clear: a mass of loose cable blocks cooling.
- Use cable rated for the space below, as the drawing and the AHJ require.

> Tip: ask the foreman who scanned the slab and when. A fresh scan beats a drawing from last year.

> Exam tip: a poke-through is a fire-rated device that keeps the floor's rating only if it is installed exactly to its listing.`,
      hook: "Poke-throughs and floor boxes keep a floor's fire rating only when installed to their listing, and access floors need trays, separation, and clear airflow."
    },
    {
      id: "u3l10", title: "Utility Columns, Modular Furniture, Ceilings, and Special Locations", domain: 2, obj: "2.7", minutes: 9,
      body: `The designer wants outlets on a power pole, in modular cubicles, in the ceiling for access points, and in a wet room off the lobby. Each place has its own trap.

## Utility columns and furniture
A **utility column** (power pole) drops from the ceiling to a desk and carries power and communications to the furniture. **Modular furniture** has raceways in its panels, fed from the floor or the ceiling.

- Keep power and communications on separate sides of the pole or raceway.
- The **bend-radius trap**: furniture raceways are tight. A cable that bends sharper than its radius, especially Category 6A, will fail a test. Use the raceway's wider channels and leave no kinks.
- Leave slack at the feed so furniture can be moved.

## Ceilings
Wireless access points and cameras mount in the ceiling. Run cable to a box or a listed enclosure, and support it from the structure. In a plenum ceiling, use plenum-rated cable and plenum-rated enclosures. Leave a service loop that fits in the enclosure.

## Special locations
\`\`\`
Location             What it needs
Hazardous            fittings and cable listed for the location
Wet                  weatherproof boxes with gasketed covers
Exterior             weatherproof boxes, sealed entries
\`\`\`

In wet and exterior locations, form a **drip loop** so water runs off the cable before it reaches the box.

## Who decides
Hazardous and special locations are the AHJ's and the designer's call. Ask first, and install only what the drawing and the listing allow.

Most offices have a **suspended ceiling**: lay-in tiles on a metal grid hung from the structure on wires. The grid and its wires hold the tiles and nothing else, so cable is hung from its own supports above them.

> Tip: tag every pole and raceway feed with its outlet ID at the source, not just at the faceplate.

> Exam tip: power and communications go on separate sides of a pole or raceway, and a wet or exterior outlet needs a weatherproof box and a drip loop.`,
      hook: "Separate power from communications on poles and raceways, watch the bend radius in furniture, and use listed fittings and drip loops in special locations."
    },
    {
      id: "u3l11", title: "Sleeves, Cores, and Slots", domain: 2, obj: "2.9", minutes: 9,
      body: `A riser has to pass through three floors and the drawing shows a sleeve. The sleeve is the hole, and it must be placed, sized, protected, and sealed in that order.

## The three openings
\`\`\`
Opening   What it is                                Rules
Sleeve    a short pipe through a wall or floor     bushed at both ends
Core      a round hole drilled through a floor     core where the drawings show
Slot      a rectangular floor opening for a riser  frame it and firestop it
\`\`\`

## Sizing and spare capacity
Size an opening for the cable you have now and for growth. Do not fill a sleeve to its limit, because the next pull has no room. Leave spare capacity as the designer sets it.

## Coring safety
Never core into a slab until the slab has been **scanned** for rebar and conduit, and the location is cleared. Use water to control dust, because drilling concrete creates silica dust, and wear a respirator. Never cut into structure without approval from the designer or engineer.

## Placing sleeves
Place sleeves where the drawing shows. A sleeve through a wall extends past the surface so it can be bushed and sealed. A sleeve in a floor is set before the pour and capped until used. Install a **bushing** on the end so the cable jacket is not cut.

## Firestop every opening
Every sleeve, core, and slot with cable through it gets a listed firestop system after cabling. Cap and label unused openings, and firestop them too if the wall or floor is rated. Never leave an open penetration at the end of the day.

> Tip: add a metal tag at the sleeve with its identifier so firestopping and later cabling match the drawing.

> Exam tip: the FIRST step before coring is to scan the slab. Every opening that holds cable is firestopped after cabling.`,
      hook: "Sleeves, cores, and slots are placed where the drawings show, bushed, sized with spare capacity, cored only after a scan, and firestopped after cabling."
    },
    {
      id: "u3l12", title: "Trays and Ladder Rack: Assembly, Support, Bonding, Fill", domain: 2, obj: "2.11", minutes: 10,
      body: `The drawing shows a long cable tray running down a corridor and into the TR. It carries hundreds of cables and the bundle will weigh as much as a person. A tray is the backbone of a large job and its mistakes are expensive.

## Tray types
\`\`\`
Type             What it looks like
Ladder           two side rails with rungs; strong, open, easy to tie to
Solid bottom     a closed channel; protects cable, holds heat
Wire mesh        welded wire; light and easy to cut
Center spine     a single center support with cable on both sides
\`\`\`

## Assembly and support
Assemble each section with the maker's **splice plates** and hardware. Support the tray from the structure with threaded rod, 16 mm (5/8 in) for heavy duty, anchored properly. Wire mesh trays are supported within 0.6 m (2 ft) of each end and each side of a joint, then every 1.52 m (5 ft). Ask the AHJ before you cut a listed tray, because a field cut can void the listing.

## Bonding
Every section is bonded, whether it carries power or low-voltage cable. Splice plates alone are not a guaranteed bond; use the listed bonding jumper where the maker requires it.

## Fill
Fill and depth are set by the designer and the code. Plan for growth by leaving the room the designer sets. Use retaining posts so cable never rises above the side rails.

## Transitions and drop-outs
Cables leave a tray through a drop-out that protects the bend radius. Never let cable drop over a bare edge. Vertical runs are secured to the rung so the weight spreads over several supports.

## Ladder rack in the TR
Tubular ladder rack is 38 mm (1.5 in) deep and 152 mm (6 in) to about 1 m (3.28 ft) wide. It carries cable overhead to the racks and is braced to the walls and racks.

Where there is no wall to bracket from, tray or ladder rack hangs on a **trapeze**: two threaded rods dropped from the structure with a strut channel across the bottom for the tray to sit on.

> Tip: walk the tray with a flashlight before you pull and look for sharp edges and missing bonds.

> Exam tip: every tray section is bonded, and a listed tray is not cut in the field without asking the AHJ.`,
      hook: "Tray sections are assembled with splice plates, supported from the structure, bonded, kept lightly filled, and never cut without asking the AHJ."
    },
    {
      id: "u3l13", title: "J-Hooks, Rings, and Other Noncontinuous Supports", domain: 2, obj: "2.12", minutes: 9,
      body: `You are running one floor's worth of 4-pair cable through a hallway ceiling, and the plan says J-hooks. They are cheap, but spaced badly they ruin cable.

## The rule
Noncontinuous supports (J-hooks and bridle rings) hold cable only at points. Space them **no more than 1.5 m (5 ft) apart**. Closer is fine. Vary the spacing slightly so the cable does not fall into a repeating sag pattern.

\`\`\`
Item             Rule
Spacing          1.5 m (5 ft) at most
Sag              even and shallow; bundle must not rest on the ceiling or the grid
Attachment       never to grid wires, to the grid itself, or another trade's conduit, duct, or pipe
Independent      hang from the structure with your own rod, strap, or beam clamp
Load             stay within the hook's rated cable count
\`\`\`

## Sag and load
A bundle should hang in a gentle, even curve between hooks. If the bundle rests on the tile or sags to the floor of the ceiling void, the hook is too small or spaced too far. Each hook has a **load capacity**, stated as a number of cables. Never exceed it. When the count grows, use bigger hooks or a tray.

## Do not crush
J-hooks and rings are wide so they do not squeeze the jacket. Never use ties or staples to flatten a bundle against them. Leave bundles loose.

## Clearances
Keep clear of lights and sprinkler heads. Fiber cords stay off solid-bottom supports; use mesh, ladder, or noncontinuous supports to avoid pressure points.

## Independent support
Rods, straps, or beam clamps carry the load from the structure above. If you cannot find a support point, ask the foreman before you improvise.

> Tip: hang the first hook, then pace the rest to a marked length, with a few that are shorter.

> Exam tip: J-hooks no more than 1.5 m (5 ft) apart, hung independently, never from grid wires or another trade's supports.`,
      hook: "Hang J-hooks from the structure at 1.5 m or less, vary the spacing, keep the sag shallow, respect load ratings, and never use grid wires."
    },
    {
      id: "u3l14", title: "Conduit, Raceway, and Innerduct: Fill, Pull Points, Bends", domain: 2, obj: "2.13", minutes: 11, lab: "conduit-fill",
      body: `The foreman says the 1 in conduit between the TR and the corner office has one more cable to go, and it already has several. Whether it can take it is arithmetic, not opinion.

## Fill limits
Conduit fill is the share of the pipe's inside area the cables take up.

\`\`\`
Cables in the conduit      Maximum fill
1                          53 percent
2                          31 percent
3 or more                  40 percent
\`\`\`

## The formula, worked once
Fill percent = number of cables x cable OD squared / conduit ID squared x 100.

Say 1 in EMT (ID 1.049 in) and 0.25 in cable. ID squared is 1.1004 and OD squared is 0.0625. Seven cables: 7 x 0.0625 / 1.1004 x 100 = 39.8 percent, under the 40 percent limit. Eight cables is 45.4 percent, over. Round the cable count down.

## Pull points and bends
- No more than two 90-degree bends between pull points.
- No more than 30 m (100 ft) between pull points.
- Add a **pull box** when a run would exceed either limit. Size and place it for straight-through pulls, and keep it accessible, never behind a finished wall.
- Bend radius of the conduit: 6 x the inside diameter for conduit 2 in (53 mm) and smaller, 10 x above, and 10 x for conduit carrying fiber.

## Finishing the conduit
Ream every cut end and install a bushing so the jacket is not cut. Leave a pull string in every empty conduit. Use sweeps for fiber and large cable.

## Raceway and innerduct
**Surface raceway** is a surface channel with its own fittings, used where walls cannot be opened; a raceway in a plenum needs plenum-rated cable. **Innerduct** is a small flexible tube pulled inside a conduit or tray, used to protect fiber. ENT is flexible nonmetallic tubing, and it, like all innerduct, must be listed for the space.

A **wireway** is a metal trough with a hinged or removable cover, run along a wall or above a rack to carry many cables over a short distance where conduit would need too many pull points.

> Tip: look up the ID of the conduit type and size. EMT, ENT, and PVC differ.

> Exam tip: fill limits are 53, 31, and 40 percent; no more than two 90-degree bends and 30 m between pull points.`,
      hook: "Fill is 53, 31, and 40 percent, with two bends and 30 m between pull points; calculate with OD and ID squared and round the cable count down."
    },
    {
      id: "u3l15", title: "Firestopping and Smoke Barriers: Listed Systems, Methods, Inspection", domain: 2, obj: "2.16", minutes: 11, lab: "firestop-pick",
      body: `You have finished pulling a bundle through a two-hour wall and the pull is tested. One thing remains, and it is the one the inspector looks for first: the hole is open.

## Why firestop
A fire-rated wall or floor holds fire and smoke for a stated number of hours. Every penetration breaks that rating until it is sealed. Whatever hole you make, you close with a system that **restores the rating**.

## Listed systems
A **listed firestop system** is a tested combination of materials and method for one specific penetration in one specific assembly. To pick it, match all three: the wall or floor assembly, the penetrant (what goes through, such as a bundle of cables or a conduit), and the opening size.

\`\`\`
Rating   What it measures
F        hours the system keeps flames from passing through; also withstands a hose stream
T        hours the system keeps the cold-side temperature rise below a limit
L        how well the system seals against smoke leakage
\`\`\`

A **smoke barrier** is built to resist smoke, not just flame. Penetrations in it also need sealing.

## Methods
- **Mechanical**: manufactured, presized elastomeric components, such as modules, blocks, and grommets, held in place by mechanical compression, sometimes in a frame. They are durable and can be reconfigured when cable is added.
- **Nonmechanical**: pliable materials molded or sized to fit the opening: putties, caulks and sealants, blankets, pads, foams, pillows, and intumescent wraps. Some are intumescent (they expand with heat) and some are passive (they absorb or burn away heat).
- For plastic pipe, use the intumescent collar or wrap that the listing names.
- **Putty pads** seal the back of an outlet box in a rated wall.

Install it **exactly as the listing says**. Never substitute foam, tape, rags, or insulation. If you cannot find a listed system that fits, stop and ask the designer or the AHJ.

## Label, inspect, reseal
Label the firestop with the system number, the date, and the installer. The AHJ or inspector must accept it before it is covered. Adding or removing a cable breaks the seal, so reseal every time. A rated-wall opening is sealed at the end of every workday.

A **through penetration** passes all the way through a rated wall or floor. A **membrane penetration** opens only one face of it, such as a box set into one side of a rated wall, and it needs a listed firestop too. Together these keep the building's **compartmentation**: each rated wall and floor holds fire and smoke inside one compartment. When no listed system fits the job, the firestop maker's engineer may write an **engineered judgment** for that one condition, and the AHJ must accept it before the work is done.

> Tip: take a photo of the approval sheet and the installed system before it is covered.

> Exam tip: a firestop system is matched to the assembly, the penetrant, and the opening exactly, and any added cable means resealing.`,
      hook: "Every hole in a rated assembly closes with a listed system matched to the wall, the penetrant, and the opening, then labeled, inspected, and resealed after any change."
    }
  ]
});
