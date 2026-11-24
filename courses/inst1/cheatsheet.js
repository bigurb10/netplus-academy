// INST1 Academy memorization sheet for the BICSI Installer 1 exam. The cabling system, spaces, bonding, pathways,
// firestopping, cable listings, pulling limits, termination color codes, testing, labeling, and safety an entry-level
// installer must recall cold. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "INST1 Memorization Sheet",
  intro: "Print this and keep it in your tool bag. The Installer 1 written exam rewards recall of the cabling system's parts and distances, the rules for spaces, pathways, bonding, and firestop, the limits on every pull, the color codes, and what a tester is telling you. Every name and number on this sheet is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Credential", "BICSI Installer 1 (INST1): the entry-level installation certificate for the ICT trades. It is nonrenewable"],
          ["Two parts", "A hands-on exam first, then the written exam. Both must be passed. The written exam can only be taken after the hands-on is passed"],
          ["Hands-on", "Six tasks done to industry standards, 20 minutes per task. The proctor gives pass or fail after each task"],
          ["Hands-on timing", "Given on the last day of the IN101 class, generally Friday afternoon"],
          ["Hands-on retest", "One failed task may be retested the same day at no cost. Failing the same task twice, or failing two tasks, means retaking the hands-on on another date"],
          ["Written exam", "75 multiple-choice questions testing knowledge and application, 2 hours, computer-based at a Pearson testing site"],
          ["Tools at the written exam", "A calculator and a whiteboard are provided. There are no scheduled breaks"],
          ["Passing score", "Set by a panel of experts using a standard-setting method. BICSI does not publish it. A failing candidate gets a score report by topic area, not a score"],
          ["Experience required", "None. Recommended: the IN101 class, about 50 hours of self-study, and safety and PPE training"],
          ["Physical requirements", "Tell colors apart, work with good manual dexterity, stand for long periods, climb ladders, and lift and carry up to 50 pounds"],
          ["Application", "At least seven days before the hands-on date"],
          ["Exam fee", "$335 for a BICSI member, $400 for a nonmember. It covers the first hands-on attempt and the first written attempt"],
          ["Retest fee", "$135 member, $200 nonmember"],
          ["Virtual walk-in hands-on", "$135"],
          ["Waiting periods", "30 days between unsuccessful attempts; 90 days after a third unsuccessful attempt"],
          ["Eligibility window", "One year from your first hands-on attempt"],
          ["Identification", "A government photo ID with your signature plus a secondary ID. The name must match your BICSI profile"],
          ["Next steps", "Installer 2 Copper (INSTC) and Installer 2 Optical Fiber (INSTF). The design path later leads to the RCDD"],
          ["How the questions read", "Jobsite scenarios that ask for the FIRST step, the MOST likely cause, or the BEST method or material"]
        ] },
        { type: "table", cols: ["Area of expertise", "Weight on the exam", "Questions in this course's 50-question tests"], rows: [
          ["1. Field Planning, Implementation, and Design", "13%", "6"],
          ["2. Pathways and Spaces", "31%", "16"],
          ["3. Pulling Copper and Fiber Cable", "21%", "11"],
          ["4. Terminating Copper and Fiber Cable", "15%", "8"],
          ["5. Testing", "6%", "3"],
          ["6. Troubleshooting", "6%", "3"],
          ["7. Retrofits", "3%", "1"],
          ["8. Integration and Convergence", "3%", "1"],
          ["9. Codes and Standards", "2%", "1"]
        ] },
        { type: "note", text: "Pathways and Spaces (31 percent) and Pulling (21 percent) together are more than half the exam. This course's official-format test uses 75 percent. BICSI does not publish its passing score, so treat 75 percent as a target, not a prediction." }
      ]
    },
    {
      id: "system", title: "The cabling system",
      blocks: [
        { type: "table", cols: ["Part of the system", "What it is and what it holds"], rows: [
          ["Work area (WA)", "Where people use the system: the outlet, the patch cord, and the equipment on the desk. Two outlets minimum per work area"],
          ["Horizontal cabling (HC)", "The cable from the outlet in the work area back to the patch panel in the telecom room on the same floor"],
          ["Telecommunications room (TR)", "Serves one floor or part of one. Holds patch panels, racks, switches, and the cross-connects for horizontal and backbone cabling"],
          ["Telecommunications enclosure (TE)", "A cabinet that serves a small space on a floor. It is never a substitute for a TR"],
          ["Backbone cabling", "The cable between TRs, equipment rooms, and entrance facilities. Cabling between two TRs is backbone, even on one floor"],
          ["Equipment room (ER)", "Serves the whole building or campus. Houses large common equipment and terminates backbone cabling. It can also serve as an entrance facility"],
          ["Entrance facility (EF)", "Where outside cabling enters the building. Holds the protectors, the demarcation, and the primary bonding busbar"],
          ["Structured cabling system (SCS)", "The whole planned system of subsystems above, built to one standard. A building's information transport system (ITS) is the same idea"],
          ["Main cross-connect (MC)", "The top of the backbone hierarchy, usually in the equipment room"],
          ["Intermediate cross-connect (IC)", "The optional middle level between the main cross-connect and a floor's horizontal cross-connect"],
          ["Horizontal cross-connect", "Where horizontal cabling meets the patch panel and equipment, normally in the TR"],
          ["Telecommunications outlet", "The wall or furniture jack that ends the horizontal cable. Also called the telecommunications outlet and connector"]
        ] },
        { type: "table", cols: ["Topology rule", "Value"], rows: [
          ["Shape", "A hierarchical star: every floor reaches back to a higher level, never in a ring or a chain"],
          ["Cross-connects in the horizontal", "One level only. No tandem patch panels between the outlet and the TR"],
          ["Cross-connects in the backbone", "At most two levels: the main and one intermediate"],
          ["Bridged taps and splices", "Not allowed in horizontal copper cabling"]
        ] },
        { type: "table", cols: ["Distance", "Metric", "English"], rows: [
          ["Horizontal permanent link", "90 m", "295 ft"],
          ["Horizontal channel (the link plus the cords)", "100 m", "328 ft"],
          ["Patch and equipment cords, all together", "10 m", "33 ft"],
          ["Multimode optical fiber backbone, structured cabling maximum", "2000 m", "6562 ft"],
          ["Singlemode optical fiber backbone, structured cabling maximum", "3000 m", "9842 ft"]
        ] },
        { type: "list", title: "Work area planning", cols: 2, items: [
          "At least two outlets per work area: one for voice, one for data, at minimum",
          "A work area is planned at about 10 square meters (108 square feet) of floor space",
          "The outlet and the station equipment count as the work area; the patch cord ends it",
          "Application distances can be much shorter than the maximums above; the application sets the real limit",
          "The 90 m permanent link leaves room for the cords: 90 + 10 = 100 m channel",
          "Horizontal cabling ends in a TR on the same floor as the work area it serves"
        ] },
        { type: "note", text: "Think of the permanent link as what the installer builds and the channel as what the user runs. Cords add the last 10 m. Never use cable longer than 90 m in the permanent link to make a distance work." }
      ]
    },
    {
      id: "media", title: "Copper, fiber, and coax",
      blocks: [
        { type: "table", cols: ["Twisted-pair cable", "Rated frequency", "Notes"], rows: [
          ["Category 5e", "100 MHz", "Minimum category for new installation, 4 pairs, 24 AWG typical"],
          ["Category 6", "250 MHz", "Often has a spline or a tighter twist to control crosstalk"],
          ["Category 6A", "500 MHz", "The A is augmented; larger overall diameter, so it fills pathways faster"]
        ] },
        { type: "table", cols: ["Cable construction", "What it means"], rows: [
          ["UTP", "Unshielded twisted pair: the most common horizontal cable"],
          ["F/UTP", "Foil over the whole cable, no shield on the individual pairs"],
          ["STP", "Shielded twisted pair: a general name for cable with a shield around the pairs or the whole cable"],
          ["S/FTP", "Braid over the cable and foil on each pair; the shield must be bonded"],
          ["23 AWG and 24 AWG", "Conductor sizes; the lower the number, the thicker the wire. Category 6A is often 23 AWG"],
          ["Solid conductor", "Used for permanent horizontal runs and punched down on an insulation displacement connector"],
          ["Stranded conductor", "Used for patch cords; it flexes without breaking but loses more signal, so cords stay short"],
          ["Multipair", "Bundled pairs for backbone voice cable, in 25-pair binder groups"],
          ["Color-coded binder", "A colored ribbon or thread that groups every 25 pairs inside a large multipair cable"]
        ] },
        { type: "table", cols: ["Optical fiber type", "Core size", "Jacket color you will see"], rows: [
          ["OM1 multimode", "62.5 micron", "Orange"],
          ["OM2 multimode", "50 micron", "Orange"],
          ["OM3 multimode, laser optimized", "50 micron", "Aqua"],
          ["OM4 multimode, laser optimized", "50 micron", "Aqua (some makers use violet)"],
          ["OM5 multimode, wideband", "50 micron", "Lime green"],
          ["OS1 and OS2 singlemode", "About 9 micron (8 to 9)", "Yellow"]
        ] },
        { type: "table", cols: ["Fiber construction", "Value or rule"], rows: [
          ["Cladding diameter", "125 micron for both multimode and singlemode"],
          ["Tight buffer", "A 900 micron coating on each fiber. Used inside buildings, easier to terminate, less water-resistant"],
          ["Loose tube", "Coated fibers with a 250 micron coating floating in a gel or dry tube. Used outdoors, must be transitioned inside the building"],
          ["Multimode light source", "LED or VCSEL, at 850 nm and 1300 nm"],
          ["Singlemode light source", "Laser, at 1310 nm and 1550 nm"],
          ["Jacket color is voluntary", "The color is a convention, not a law. Read the print on the jacket for the real fiber type"]
        ] },
        { type: "table", cols: ["Strand", "Color", "Strand", "Color"], rows: [
          ["1", "Blue", "7", "Red"],
          ["2", "Orange", "8", "Black"],
          ["3", "Green", "9", "Yellow"],
          ["4", "Brown", "10", "Violet"],
          ["5", "Slate", "11", "Rose"],
          ["6", "White", "12", "Aqua"]
        ] },
        { type: "note", text: "Fiber color code: Blue, Orange, Green, Brown, Slate, White, Red, Black, Yellow, Violet, Rose, Aqua. Strands 13 to 24 repeat the same colors with a black tracer, except the black strand, which takes a yellow tracer." },
        { type: "table", cols: ["Coax cable", "Impedance and use"], rows: [
          ["RG-6", "75 ohm. The standard for video and cable television runs; the best choice in new work"],
          ["RG-59", "75 ohm. Older and thinner, with more loss; short video runs and closed-circuit cameras"],
          ["RG-11", "75 ohm. Thick, low-loss; long runs and outdoor feeder cable"],
          ["Video systems", "75 ohm"],
          ["Radio systems", "50 ohm"],
          ["Connectors", "F connector for cable television; BNC for security video and test equipment"]
        ] }
      ]
    },
    {
      id: "codes", title: "Codes, listings, and standards",
      blocks: [
        { type: "table", cols: ["Term", "Meaning"], rows: [
          ["Code", "A rule adopted into law, enforced by an inspector. The NEC is a code once your jurisdiction adopts it"],
          ["Standard", "A consensus document that sets the technical method. It becomes enforceable when a code, a contract, or a specification calls for it"],
          ["AHJ", "Authority having jurisdiction: the inspector, fire marshal, or building official whose decision wins. Mounting heights and permit rules are the AHJ's call"],
          ["NRTL", "Nationally recognized testing laboratory, such as UL. It lists and labels products"],
          ["Listed", "A product that an NRTL has tested and put on a published list for a stated use"],
          ["Specification versus drawing", "When they disagree, ask the designer in writing before you build. Do not guess"]
        ] },
        { type: "table", cols: ["Copper rating", "Where it may be installed"], rows: [
          ["CMP", "Plenum: air-handling spaces. The highest rating for communications cable"],
          ["CMR", "Riser: vertical runs between floors, through a firestopped opening"],
          ["CMG and CM", "General purpose: horizontal runs on one floor, but not in plenums or risers"],
          ["CMX", "Limited use: dwellings and raceways only, in short runs"]
        ] },
        { type: "table", cols: ["Fiber and coax rating", "Where it may be installed"], rows: [
          ["OFNP", "Optical fiber, nonconductive, plenum"],
          ["OFNR", "Optical fiber, nonconductive, riser"],
          ["OFN", "Optical fiber, nonconductive, general purpose"],
          ["OFCP", "Optical fiber, conductive (it has metal in it), plenum"],
          ["OFCR", "Optical fiber, conductive, riser"],
          ["CATVP", "Community antenna television and coax, plenum"],
          ["CATVR", "Coax, riser"],
          ["CATV", "Coax, general purpose"]
        ] },
        { type: "table", cols: ["Substitution rule", "Detail"], rows: [
          ["A higher rating can replace a lower one", "A plenum cable may go where a riser or general cable is required; a riser cable may go where a general cable is required"],
          ["A lower rating can never replace a higher one", "General cable in a plenum or a riser is a violation, even for a short run"],
          ["Order from highest to lowest", "Plenum (P), then riser (R), then general (G or none), then limited (X)"],
          ["Cable type must match its space", "The jacket print tells you the rating. If the print is missing, treat the cable as unrated"]
        ] },
        { type: "table", cols: ["Standards family", "What it covers"], rows: [
          ["TIA-568", "The cabling standard: topology, distances, performance, connectors, and test methods"],
          ["TIA-569", "Pathways and spaces: rooms, trays, conduit, and boxes"],
          ["TIA-606", "Administration: labeling and records"],
          ["TIA-607", "Bonding and grounding for telecommunications"],
          ["TIA-758", "Outside plant, at recognition level only"],
          ["ISO/IEC 11801", "The international structured cabling standard, with its own class names"],
          ["NFPA 70", "The National Electrical Code (NEC): wiring, cable listings, bonding, and firestop of penetrations"],
          ["NFPA 72", "Fire alarm and signaling, at recognition level. Fire alarm work is separate from structured cabling"],
          ["OSHA", "The federal safety rules for your jobsite: PPE, ladders, trenching, hazard communication"]
        ] },
        { type: "note", text: "Name the standard, not its edition. The exam asks which document governs a task, not which revision. Local code and the AHJ override a standard whenever they are stricter." }
      ]
    },
    {
      id: "spaces", title: "Telecom spaces and bonding",
      blocks: [
        { type: "table", cols: ["Space", "What it serves and the rules"], rows: [
          ["Telecommunications room (TR)", "At least one per floor. Placed so that no horizontal run passes 90 m. Horizontal cabling ends in a TR on the same floor"],
          ["Equipment room (ER)", "Serves the building or campus. Houses large equipment and terminates backbone and horizontal cabling"],
          ["Entrance facility (EF)", "Where public and private service cabling enters the building. Includes the entrance point at the building wall"],
          ["Telecommunications enclosure (TE)", "Serves at most 335 square meters (3600 square feet) on a floor. It does not replace a TR"],
          ["Environment", "Conditioned air, clean and dry, lit well enough to read a label, with power and bonding already in place"],
          ["Do not put in a TR", "Water pipes or drains over the equipment, unrelated equipment, storage, and anything that blocks the door"],
          ["Door and access", "Lockable, wide enough to move equipment, and clear of obstructions"],
          ["Work and aisle space", "If no distance is specified, plan at least 1 m (3.28 ft) around and between equipment"]
        ] },
        { type: "table", cols: ["Backboard", "Rule"], rows: [
          ["Material", "Plywood, void free, A grade on the exposed side and C on the wall side, 15 percent moisture or less"],
          ["Thickness", "19 mm (3/4 in), recommended; sheets are 1.2 m by 2.4 m (4 ft by 8 ft)"],
          ["Mounting height", "From 203 mm (8 in) above the finished floor up to 2.6 m (8.5 ft). Do not split the difference in a taller room"],
          ["Fire protection", "Two coats of fire-retardant paint. If the code requires fire-retardant treated plywood, do not paint it; ask the AHJ whether to leave the stamp showing"],
          ["Where", "On at least two walls of a TR; all four if possible. Mount a 305 mm (12 in) tray on the same walls"],
          ["Fasteners on studs", "Align the sheet to the studs. On metal studs, screws at least 12.7 mm (0.5 in) longer than the plywood is thick"],
          ["Fasteners in a hollow wall", "Toggle bolts at least 6.3 mm (0.25 in) in diameter, 51 mm (2 in) from the edges, about every 610 mm (24 in)"],
          ["Joints", "No gaps between adjacent sheets"]
        ] },
        { type: "table", cols: ["Rack and cabinet", "Rule"], rows: [
          ["Width", "483 mm (19 in) is the standard; 584 mm (23 in) racks are used by service providers"],
          ["Height", "2.1 m (7 ft) is the normal height"],
          ["One rack unit", "1 U is about 45 mm (1.75 in) of vertical space"],
          ["Anchoring", "Bolt a floor rack to the floor with expansion anchors, flat washers, and lock washers"],
          ["Overhead support", "Brace the top of the rack to the wall, a tray, or a ladder rack. Seismic bracing is whatever the AHJ requires"],
          ["Access", "Use double-sided racks and keep the front and the rear accessible"],
          ["Equipment screws", "M5, M6, 10-32, or 12-24 threads, with star washers for bonding"],
          ["Wall-mounted rack", "Lag bolts and washers into the plywood; check the wall will carry the full load"],
          ["Cable management", "Vertical managers at the sides, horizontal managers by each patch panel, and room for cord slack"],
          ["D-rings", "Fine for small bundles and cross-connect jumpers; never a replacement for a ladder rack"]
        ] },
        { type: "table", cols: ["Bonding part", "Rule"], rows: [
          ["Primary bonding busbar (PBB)", "Formerly the telecommunications main grounding busbar (TMGB). One per building, in the entrance facility, bonded straight to the service ground"],
          ["Secondary bonding busbar (SBB)", "Formerly the telecommunications grounding busbar (TGB). One or more per TR or ER, as many as needed"],
          ["Telecommunications bonding backbone (TBB)", "An insulated, stranded copper conductor from the PBB to each SBB, equalizing the floors"],
          ["Bonding conductor for telecommunications (BCT)", "Joins the PBB to the building's grounding electrode. Keep it as short as possible"],
          ["Rack bonding conductor", "Formerly the TEBC. 6 AWG minimum, stranded, insulated copper from the SBB or PBB to each rack and cabinet"],
          ["Grounding equalizer", "A 6 AWG minimum insulated copper conductor that evens out potentials between TRs"],
          ["Jacket color", "Green, or green with a yellow stripe, for every bonding conductor"],
          ["Lugs", "Two-hole compression lugs on every busbar and rack connection"],
          ["Surface preparation", "Scrape paint to bare metal, apply antioxidant compound, then make the connection"],
          ["Daisy-chaining", "Never. Each rack gets its own conductor back to the busbar"],
          ["Busbar mounting", "On insulated standoffs with at least 51 mm (2 in) of clearance behind it"],
          ["Bend rules", "Minimum bend radius of 203 mm (8 in); never a bend of less than 90 degrees"],
          ["Bonding resistance", "Two-point bonding test: 0.1 ohm (100 milliohms) is the recommended maximum"],
          ["Conduits and trays", "Metal conduit, tray, and ladder rack are bonded. A grounding bushing carries a 6 AWG copper wire to the busbar"],
          ["Power cord ground", "Never the only ground for a rack. The telecommunications ground path is separate and verifiable"]
        ] },
        { type: "note", text: "Old and new names: PBB = formerly TMGB; SBB = formerly TGB; rack bonding conductor = formerly TEBC. The exam may use either set, so know both. If a document shows an old name, translate it before you act." }
      ]
    },
    {
      id: "pathways", title: "Pathways",
      blocks: [
        { type: "table", cols: ["Conduit rule", "Value"], rows: [
          ["Fill, one cable", "53 percent of the inside area"],
          ["Fill, two cables", "31 percent"],
          ["Fill, three or more cables", "40 percent"],
          ["Bends between pull points", "No more than two 90-degree bends"],
          ["Distance between pull points", "No more than 30 m (100 ft)"],
          ["Bend radius, trade size 2 in (53 mm) and smaller", "6 x the inside diameter"],
          ["Bend radius, larger than 2 in", "10 x the inside diameter"],
          ["Bend radius, conduit carrying optical fiber", "10 x the inside diameter"],
          ["Conduit types", "EMT is thin-wall steel tubing, ENT is flexible nonmetallic tubing, and PVC is rigid plastic. Each has its own inside diameter, so look it up before you calculate fill"],
          ["Pull box", "Add one where a run would otherwise exceed two bends or the pull length; it must stay accessible, never behind a finished wall"],
          ["Conduit ends", "Ream the cut ends and install bushings so the jacket is not cut"],
          ["Pull string", "Leave one in every empty conduit, and replace it whenever you pull"],
          ["Sweeps", "Use sweep elbows for fiber and large cables"],
          ["Entering a TR", "Conduit ends come in at the left side of the backboard. The interconnecting conduit is 78 mm (3 trade size) minimum, bushed and firestopped"]
        ] },
        { type: "table", cols: ["EMT trade size", "Inside diameter"], rows: [
          ["1/2 in", "0.622 in"],
          ["3/4 in", "0.824 in"],
          ["1 in", "1.049 in"],
          ["1-1/4 in", "1.380 in"],
          ["1-1/2 in", "1.610 in"],
          ["2 in", "2.067 in"]
        ] },
        { type: "table", cols: ["Fill calculation", "How to do it"], rows: [
          ["Formula", "Fill percent = number of cables x cable OD squared / conduit ID squared x 100"],
          ["Worked example", "Ten cables with a 0.25 in OD in 1 in EMT: 10 x 0.0625 / 1.1004 x 100 = 56.8 percent. That is over the 40 percent limit"],
          ["Fix", "At 40 percent, 1 in EMT carries 0.4 x 1.1004 / 0.0625 = 7 of those cables. Use a 1-1/4 in conduit or split the run"],
          ["Use OD and ID", "OD is the outside diameter of the cable; ID is the inside diameter of the conduit. Square each one"],
          ["Round down", "Always round the number of cables down, never up"]
        ] },
        { type: "table", cols: ["Tray and ladder rack", "Rule"], rows: [
          ["Tubular ladder rack depth", "38 mm (1.5 in); the width runs from 152 mm (6 in) to about 1 m (3.28 ft)"],
          ["Threaded rod, heavy duty", "16 mm (5/8 in) rod, properly anchored"],
          ["Wire mesh tray supports", "Within 0.6 m (2 ft) of each end and each side of a joint, then every 1.52 m (5 ft)"],
          ["Rod-stock tray depths", "51 mm (2 in), 100 mm (3.94 in), and 152 mm (6 in), usually in 3 m (10 ft) sections"],
          ["Cutting a listed tray", "Ask the AHJ first. A field cut can void the listing"],
          ["Bonding", "Every section is bonded, whether it carries power or low-voltage cable"],
          ["Fill and depth", "Set by the designer and the code. Use retaining posts so cable never rises above the side rails"],
          ["Vertical runs", "Secure each cable to the rung so the weight spreads over several supports"],
          ["Riser core", "A vertical ladder rack in a riser core passes through firestopped openings"],
          ["Multiple levels", "Firestopping between levels may be required"]
        ] },
        { type: "table", cols: ["J-hook and noncontinuous support", "Rule"], rows: [
          ["Maximum spacing", "1.5 m (5 ft) apart"],
          ["Sag", "Even and shallow; the cable bundle must not rest on the ceiling or touch the tile grid"],
          ["Attachment", "Never to ceiling grid wires, to the grid itself, or to another trade's conduit, duct, or pipe"],
          ["Independent support", "Hang from the structure above with its own rod, strap, or beam clamp"],
          ["Load", "Do not exceed the hook's rated cable count; use bigger hooks or a tray"],
          ["Fiber cords", "Keep them off solid-bottom supports; use mesh, ladder, or noncontinuous supports to avoid pressure points"]
        ] },
        { type: "table", cols: ["Separation from power and EMI sources", "Minimum distance"], rows: [
          ["Branch circuits of 5 kVA or less", "No extra separation needed"],
          ["Unshielded power in open or nonmetal pathways", "610 mm (24 in)"],
          ["Unshielded power next to a grounded metal pathway", "305 mm (12 in)"],
          ["Power in grounded metal conduit next to a metal pathway", "152 mm (6 in)"],
          ["Electric motors and transformers", "1220 mm (48 in)"],
          ["Fluorescent, neon, mercury vapor, and discharge lamps", "130 mm (5.12 in)"],
          ["Arc welders", "800 mm (31.5 in)"],
          ["Induction heating equipment", "1000 mm (39.37 in)"]
        ] },
        { type: "note", text: "Power wiring creates electromagnetic interference (EMI), and radio sources create radio-frequency interference (RFI). Distance and grounded metal pathways reduce both. When a table and the designer disagree, the stricter distance wins." },
        { type: "table", cols: ["Outlets and boxes", "Rule"], rows: [
          ["Single-gang and double-gang boxes", "A box for one or two faceplates; deep enough for the cable bend radius"],
          ["Cut-in ring or old-work bracket", "Mounts a faceplate in existing drywall without a box"],
          ["Low-voltage mounting bracket", "Never in a fire or smoke barrier unless listed for it"],
          ["Poke-through", "A rated floor assembly installed to its listing; the cables in it must match the space below"],
          ["Floor box", "Fed through a floor core or a slab sleeve and firestopped to the listing"],
          ["Furniture feed", "A power pole or partition raceway; keep power and communications on separate sides"],
          ["Mounting height", "Set by the drawings and the AHJ; never guess it"],
          ["Plenum boxes", "A surface raceway in a plenum needs plenum-rated cable"]
        ] },
        { type: "table", cols: ["Sleeve, core, and slot", "Rule"], rows: [
          ["Sleeve", "A short pipe through a wall or floor. Bushed at both ends"],
          ["Core", "A round hole drilled through a floor or wall. Core where the drawings show; never into structure without approval"],
          ["Slot", "A rectangular floor opening for a riser. Frame it and firestop it"],
          ["Spare capacity", "Leave room for growth; do not fill a sleeve to its limit"],
          ["Firestop", "Every sleeve, core, and slot with cable through it gets a listed firestop system"],
          ["Unused openings", "Cap and label them, and firestop them too if the wall is rated"]
        ] }
      ]
    },
    {
      id: "firestop", title: "Firestopping",
      blocks: [
        { type: "table", cols: ["Concept", "Rule"], rows: [
          ["Firestop system", "A listed system: a tested combination of materials and method for one specific penetration, in one specific wall or floor assembly"],
          ["Why", "To keep flame, heat, and smoke from passing through the opening and to restore the rating of the wall or floor"],
          ["F rating", "How many hours the system keeps flames from passing through. It also withstands a hose stream"],
          ["T rating", "How many hours the system keeps the temperature rise on the cold side below a limit"],
          ["L rating", "How well the system seals against smoke leakage"],
          ["Listing number", "The tested system has an identifier such as a letter code and a number. Read it from the approval sheet, then match the system exactly"],
          ["Smoke barrier", "A wall built to resist smoke, not just flame. Penetrations in it also need sealing"],
          ["Mechanical devices", "Collars, wraps, sleeves, and pass-through devices that expand or close when heated"],
          ["Nonmechanical materials", "Caulk, putty, pillows, sealant, and board that fill the gap"],
          ["Putty pads", "Seal the back of an outlet box in a rated wall"]
        ] },
        { type: "table", cols: ["Rule", "Detail"], rows: [
          ["Restore the rating", "Whatever hole you make, you close with a system that restores the wall's rating"],
          ["Match the listed system exactly", "The wall type, penetrant, opening size, and material must all match the tested system"],
          ["Label it", "Mark the firestop with the system number, the date, and the installer"],
          ["Inspect it", "The AHJ or inspector must accept it before it is covered"],
          ["Reseal after any change", "Adding or removing a cable breaks the seal, so reseal the opening every time"],
          ["End of the day", "A penetration in a fire or smoke barrier is sealed at the end of every workday, not just at the end of the job"],
          ["Never use", "Foam, tape, rags, or insulation as a substitute for a listed system"],
          ["Not your call", "If you cannot find a listed system that fits, stop and ask the designer or the AHJ"]
        ] }
      ]
    },
    {
      id: "pulling", title: "Pulling cable",
      blocks: [
        { type: "table", cols: ["Setup item", "Purpose"], rows: [
          ["Reel stands or boxes", "Let the cable unwind without twisting or kinking"],
          ["Sheaves and rollers", "Guide the cable around corners at its bend radius"],
          ["Pull string or rope", "Carries the pulling force, not the cable jacket"],
          ["Grips and eyes", "Attach to the cable with a swivel so the pull does not twist it"],
          ["Communication", "Radios or signals between the pulling end and the feed end"],
          ["Pull schedule", "Lists each cable, its label, its length, and the sequence of the pull"],
          ["Mark before cutting", "Label the cable before you cut it from the reel"]
        ] },
        { type: "table", cols: ["Pulling limit", "Value"], rows: [
          ["Tension, 4-pair cable", "110 N (25 lbf) at most, per cable"],
          ["Bend radius, 4-pair UTP", "4 x the cable OD"],
          ["Bend radius, multipair copper", "10 x the cable OD"],
          ["Bend radius, optical fiber with no load", "10 x the cable OD"],
          ["Bend radius, optical fiber under pulling tension", "20 x the cable OD"],
          ["Manufacturer limits", "Win over the numbers above whenever they are stated"],
          ["Kinks", "A kinked cable is damaged. Replace it"],
          ["Crush", "Do not crush a cable with ties, staples, or a tight J-hook; leave bundles loose"],
          ["Fill", "Never exceed the conduit fill limits just to get one more cable in"],
          ["Lubricant", "Only a lubricant listed as compatible with the cable jacket"]
        ] },
        { type: "table", cols: ["Riser pull", "Method"], rows: [
          ["Top down", "Feed from the top with a reel brake at the feed end and support at each floor to take the weight"],
          ["Bottom up", "Use a pull line with a winch, a swivel, and tension monitoring"],
          ["Cable weight", "Heavy backbone cable needs hooks, grips, and supports in proportion; secure it at each floor"],
          ["Firestop", "Every floor opening is firestopped once the cable is in place"],
          ["Label", "Label the cable at every floor; never splice a riser"]
        ] },
        { type: "table", cols: ["Slack", "Amount"], rows: [
          ["Work area, 4-pair copper", "305 mm (12 in) minimum after termination; not stored in loops"],
          ["TR or ER, 4-pair", "Enough to reach the farthest corner by way of the pathway, plus floor to ceiling"],
          ["TR or ER, multipair", "The length of the backboard plus floor to ceiling"],
          ["TE", "2 m (6.6 ft) stored outside the enclosure"],
          ["Why", "Service slack allows reterminations and moves without a new cable"]
        ] },
        { type: "table", cols: ["Fiber handling", "Rule"], rows: [
          ["Where to pull", "On the strength member (the aramid yarn or central member), never on the fibers or the jacket"],
          ["Figure-eight", "Lay long runs in a figure eight on the floor to avoid twist, and flip it as you feed"],
          ["Innerduct", "Pull fiber inside an innerduct in conduit and trays, and leave the end of the duct labeled"],
          ["Cleanliness", "Cap the ends, keep dirt out, and never drag cable across a dirty floor"],
          ["Pulling tension", "Stay below the maximum on the cable's specification sheet"]
        ] }
      ]
    },
    {
      id: "termination", title: "Termination",
      blocks: [
        { type: "list", title: "Before you terminate", cols: 2, items: [
          "Confirm the cable label matches the pull schedule and the outlet or port label",
          "Check the pair twist and the jacket for kinks, nicks, or crush",
          "Leave the service slack, then strip only the jacket needed",
          "Untwist at most 13 mm (0.5 in) for Category 5e and above",
          "Use the right tool for the connecting hardware: punch-down tool, termination tool, or cleaver",
          "Keep the jack's wiring standard the same at both ends of the link",
          "Choose one wiring standard per job and mark it on the drawings",
          "Verify the work area outlet type matches the drawings and the jack color rules"
        ] },
        { type: "table", cols: ["Pin", "T568A", "T568B"], rows: [
          ["1", "White-green", "White-orange"],
          ["2", "Green", "Orange"],
          ["3", "White-orange", "White-green"],
          ["4", "Blue", "Blue"],
          ["5", "White-blue", "White-blue"],
          ["6", "Orange", "Green"],
          ["7", "White-brown", "White-brown"],
          ["8", "Brown", "Brown"]
        ] },
        { type: "table", cols: ["Wiring rule", "Detail"], rows: [
          ["One standard per job", "Pick T568A or T568B and use it for every jack, panel, and cord in the system"],
          ["Straight-through patch cord", "Same standard at both ends"],
          ["Pair 1", "Pins 4 and 5, blue pair"],
          ["Pair 2", "Pins 1 and 2"],
          ["Pair 3", "Pins 3 and 6"],
          ["Pair 4", "Pins 7 and 8"],
          ["Split pair", "Wires from two different pairs land together as a pair; every pin connects, so continuity passes, but crosstalk fails"]
        ] },
        { type: "table", cols: ["25-pair color code", "Colors"], rows: [
          ["Tip colors, in order", "White, red, black, yellow, violet"],
          ["Ring colors, in order", "Blue, orange, green, brown, slate"],
          ["Pair 1", "White-blue"],
          ["Pair 2", "White-orange"],
          ["Pair 5", "White-slate"],
          ["Pair 6", "Red-blue"],
          ["Pair 25", "Violet-slate"],
          ["Formula for pair n", "Tip color = group (n - 1) divided by 5, dropping the remainder. Ring color = (n - 1) mod 5"],
          ["Larger cables", "Each group of 25 pairs gets its own color-coded binder"]
        ] },
        { type: "table", cols: ["Connecting hardware", "Notes"], rows: [
          ["110 block", "A punch-down block for horizontal and backbone cross-connects. Terminate with a 110 tool; the jacks sit on the connecting block"],
          ["66 block", "An older style punch-down block for voice. A 66 block is for voice only, not for high-speed data"],
          ["Insulation displacement connector (IDC)", "The jaw that cuts through the insulation as you punch the wire down"],
          ["Patch panel", "A rack-mounted panel of jacks; the horizontal cable punches into the back"],
          ["Jack", "Punch each pair to its color code on the jack; keep the pairs twisted as close to the terminals as you can"],
          ["Strain relief", "Tie off or secure the cable so no pull reaches the termination"]
        ] },
        { type: "table", cols: ["Coax", "Notes"], rows: [
          ["Connector types", "F connector for cable television; BNC for security video"],
          ["Compression connector", "The standard today: clean cut, correct strip, then compress"],
          ["Strip", "Cut the jacket and the center conductor to the length the connector maker shows"],
          ["Test", "Check continuity and look for a shorted center conductor and shield"]
        ] },
        { type: "table", cols: ["Fiber connectors", "Notes"], rows: [
          ["LC", "Small form factor with a latch; the common choice on new work"],
          ["SC", "Square, push-pull connector; common on patch panels"],
          ["ST", "Round bayonet connector with a twist lock; older style"],
          ["MPO", "A multifiber push-on connector that carries many fibers in one ferrule"],
          ["UPC", "Ultra physical contact: a polished end face, blue connector body"],
          ["APC", "Angled physical contact: a polished angled end face, green connector body"],
          ["Do not mix", "Never mate an APC to a UPC; the angled and flat faces damage each other and lose signal"],
          ["Inspect before you connect", "Look at the end face with a scope; if it is dirty, clean it"],
          ["Cleaning", "Dry clean first with a cassette cleaner or swab; use a solvent only if the dry clean fails"],
          ["Never look", "Never look into a fiber end or a connector with a light source on"]
        ] }
      ]
    },
    {
      id: "testing", title: "Testing and troubleshooting",
      blocks: [
        { type: "table", cols: ["Test type", "What it covers"], rows: [
          ["Permanent link", "The fixed cable and both connectors, without the patch cords. This is what the installer certifies"],
          ["Channel", "The whole path including both patch cords, the connectors, and the cross-connect. This is what the user's equipment sees"]
        ] },
        { type: "table", cols: ["Parameter", "What it measures"], rows: [
          ["Wiremap", "Whether each pin connects to the right pin at the far end"],
          ["Length", "The electrical length of each pair; it must stay within the permanent link limit"],
          ["Insertion loss (IL)", "How much signal is lost along the link; lower is better"],
          ["NEXT", "Near-end crosstalk: signal leaking from one pair into another at the end near the tester"],
          ["PSNEXT", "Power sum NEXT: the combined crosstalk from the other three pairs on one pair"],
          ["FEXT", "Far-end crosstalk: signal leaking from one pair into another at the far end of the link"],
          ["ACR-F", "Attenuation-to-crosstalk ratio, far end: how much stronger the signal is than the noise at the far end"],
          ["Return loss (RL)", "Signal reflected back by impedance mismatches, often from a poor termination"],
          ["Propagation delay", "How long the signal takes to travel the link"],
          ["Delay skew", "The difference in delay between the fastest and slowest pair"]
        ] },
        { type: "table", cols: ["Wiremap fault", "Likely cause and fix"], rows: [
          ["Open", "A wire is not connected or has been cut. Reterminate the pair or find the break"],
          ["Short", "Two wires touch. Check for a stray strand or a staple through the cable"],
          ["Reversed pair", "A pair is wired tip to ring at one end; reterminate that pair"],
          ["Crossed pair", "A pair is on the wrong pins at one end; the jack or the panel was punched in the wrong order"],
          ["Split pair", "One wire from each of two pairs was swapped. The pins connect, but the twist is wrong. Reterminate to the color code"]
        ] },
        { type: "table", cols: ["Tester step", "What to do"], rows: [
          ["Set the reference", "Do this at the start of each session, with the matching adapters"],
          ["Choose the limit", "Pick the permanent link or channel limit for the right category"],
          ["Choose the cable type", "Pick the cable family and the NVP if the tester asks"],
          ["Autotest", "Connect and run the full test"],
          ["Save with the label", "Use the cable label as the name, so the record matches the cable"],
          ["PASS", "Every parameter is within the limit"],
          ["FAIL", "One parameter is outside the limit. Find the cause, fix it, and retest"],
          ["Marginal asterisk", "The result passes, but is within the tester's accuracy of the limit. Treat it as a pass only if the specification allows; many do not"],
          ["Tester accuracy", "Level III covers Category 6 up to 250 MHz; Level IIIe covers Category 6A up to 500 MHz"],
          ["Cords", "Test with the tester's own cords or adapters, and replace them when they wear"]
        ] },
        { type: "table", cols: ["Fiber testing", "What to do"], rows: [
          ["Tier 1 test", "A light source and a power meter measure total loss in the link. Reference the equipment first, then measure"],
          ["OLTS", "Optical loss test set: a light source and power meter in one box"],
          ["OTDR", "Optical time-domain reflectometer: shows where the loss and reflections are along the fiber. Recognition level"],
          ["Launch cord", "A reference cord used so the first connector is also tested"],
          ["Clean first", "Inspect and clean every connector before testing"],
          ["Both wavelengths", "Test multimode at 850 and 1300 nm and singlemode at 1310 and 1550 nm"]
        ] }
      ]
    },
    {
      id: "job", title: "Safety, labeling, retrofits, and other systems",
      blocks: [
        { type: "table", cols: ["Safety topic", "Rule"], rows: [
          ["Site safety plan", "Read it on day one and follow it; attend the safety briefing"],
          ["PPE", "Safety glasses, gloves, hard hat, and safety shoes as the site requires; hearing and dust protection when needed"],
          ["Ladders", "Inspect before use, face the ladder, keep three points of contact, and never overreach"],
          ["Lifts", "Be trained before you operate a lift or scaffold; follow the harness rules"],
          ["Lockout and tagout", "Never work on or near energized equipment that has not been locked out and tagged by the person who controls it"],
          ["Confined spaces", "Do not enter a manhole or vault until it is tested, ventilated, and permitted, with a standby person outside"],
          ["Silica dust", "Drilling and coring concrete creates silica dust. Use water or a vacuum and wear a respirator"],
          ["Asbestos", "If you suspect it, stop work, keep others away, and report it. Never disturb or sweep it"],
          ["Laser safety", "Never look into a fiber end; treat every fiber as live until it is proven dark"],
          ["Lifting", "Lift with your legs, ask for help, and carry no more than your limit"],
          ["First aid", "Know where the kit is, who is trained, and how to call for help. Report every injury"],
          ["Electrical", "Treat unknown wires as live; only qualified electricians connect to ac panel grounds"]
        ] },
        { type: "table", cols: ["Label", "Rule"], rows: [
          ["Identifiers", "Every space, cable, panel, port, pathway, and bonding conductor gets a unique identifier"],
          ["Both ends", "Label each cable at both ends, and use the same name on both"],
          ["Where", "Within sight of the end, where it can be read without moving the cable"],
          ["Machine printed", "Use a printed, permanent label; never handwriting that smudges"],
          ["Match the records", "The label, the drawing, the panel record, and the tester file must all agree"],
          ["Records", "Keep the administration records, the as-built drawings, and the test results, and hand them over at closeout"],
          ["Cable tags", "Label both ends of a bonding conductor and the sheath of a backbone cable at the rack or ladder rack"]
        ] },
        { type: "list", title: "Retrofits", cols: 2, items: [
          "Survey the existing space and pathways before you promise anything",
          "Protect the occupied space: dust barriers, floor protection, and moving furniture only with permission",
          "Lift and replace ceiling tiles carefully; do not break or stain them",
          "Remove abandoned cable under the NEC unless it is tagged for future use",
          "Test existing cable before you reuse it; it must meet the category you need",
          "Plan the cutover: install, test, and label first, then move users with an agreed outage window",
          "Keep the old system working until the new one is accepted",
          "Firestop every penetration you make or open"
        ] },
        { type: "list", title: "Other systems on the cabling", cols: 2, items: [
          "Paging and sound masking",
          "Clocks and nurse call",
          "Building automation (BAS)",
          "Life safety and fire alarm: a separate system with separate rules",
          "Elevators",
          "Access control",
          "Video surveillance",
          "Wireless access points (AP)",
          "Distributed antenna systems (DAS)",
          "Convergence puts many systems on the same cabling; plan the pathways for all of them"
        ] },
        { type: "table", cols: ["Power over Ethernet", "Power at the source"], rows: [
          ["PoE type 1", "15.4 W"],
          ["PoE type 2", "30 W"],
          ["PoE type 3", "60 W"],
          ["PoE type 4", "90 W"],
          ["Bundle heating", "More power means more heat in a bundle. Use larger-gauge or higher-category cable and smaller bundles for high-power runs"],
          ["Equipment names", "The switch or injector is the power sourcing equipment (PSE); the camera, phone, or access point is the powered device (PD)"]
        ] },
        { type: "note", text: "Plan every job around three questions. What does the drawing say, what does the AHJ require, and what does the manufacturer allow? When any of them is stricter than your habit, the stricter one wins." }
      ]
    }
  ]
};
