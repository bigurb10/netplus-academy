// INST1 Academy curriculum, units 4 and 5. Original teaching content for the BICSI Installer 1 exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "Pulling Cable", domain: 3,
  blurb: "Setting up a pull, the limits no pull may break, and pulling horizontal, backbone, and fiber without damage.",
  assumes: "Unit 3: the pathways you pull through.",
  lessons: [
    {
      id: "u4l1", title: "Pull Planning and Setup: Reels, Sheaves, the Pull Schedule", domain: 3, obj: "3.1", minutes: 10,
      body: `The foreman hands you a pull schedule for the second floor and says the cable arrives at seven tomorrow. Cable is pulled well or badly before the first foot leaves the box. The **cable pulling setup**, meaning the reels, the sheaves, the schedule, and a crew member at each end, is where you win the pull.

## The pull schedule
The schedule lists every cable the crew will pull, one line each. It is your work order and, later, your record.

\`\`\`
Cable ID   From        To          Length   Pathway
2A-014     TR 2A       Outlet 14   168 ft   corridor J-hook, then drop
2A-015     TR 2A       Outlet 15   182 ft   corridor J-hook, then drop
2A-016     TR 2A       Outlet 16   144 ft   conduit from ceiling to wall box
\`\`\`

Label each cable at the reel end before you cut it, then measure and record its footage when it is in. The label ties the cable to the schedule, the outlet, and the test file.

## Set up at the feed end
- Put the box or reel on a reel stand or spool tree so the cable unwinds without twisting or kinking.
- Protect the cable where it enters the pathway: bushings in the conduit, a sheave or roller at every corner, and no cable dragging across a floor or an edge.
- Put a person at the feed end and a person at the pull end, with radios, so the pull can stop at once.
- Use enough people that nobody has to haul on the cable itself. The pull rope carries the force.

## Estimating cable from a run list
Count whole runs, never part of one. Each run needs its length plus the slack the plan gives at both ends.

1. Run length = measured path plus slack at the TR end plus slack at the outlet end.
2. Runs per box = box length divided by run length, rounded DOWN, because a partial run is scrap.
3. Boxes = total runs divided by runs per box, rounded UP, because you cannot buy part of a box.

Example: 1000 ft boxes, runs of 180 ft with 10 ft of slack at each end make 200 ft per run. That is 5 runs per box, so 32 runs need 7 boxes (6.4 rounds up).

The gear: a **reel dolly**, or a pair of **jackstands** with a bar through the reel, lets the reel turn freely as the cable pays out. A **tugger** is a powered puller that winds in the **bull line**, the heavy rope used on long or heavy pulls. Boxed cable pays out of its box without kinks, as long as the box is not twisted.

> Tip: pull the longest runs first from a fresh box, then use the leftover lengths for the short runs.

> Exam tip: when a question asks how many boxes, include slack at BOTH ends, round runs per box down, then round boxes up.`,
      hook: "Label before you cut, set up at the feed end, protect every corner and entry, and estimate with slack at both ends, whole runs per box rounded down, boxes rounded up."
    },
    {
      id: "u4l2", title: "Pull String and Rope: Fish Tape, Rods, Blown Line", domain: 3, obj: "3.2", minutes: 9,
      body: `A conduit run is empty and the cable is on the cart, but nothing runs through it yet. Before a cable goes in, a line has to go in first. That line is your way through the pathway and the thing that carries the force of the pull.

## The tools, and what each is for
\`\`\`
Tool                 Use                                          Watch for
Steel fish tape      short runs of conduit with few bends          conducts electricity; never near energized power
Fiberglass fish tape stiff, nonconductive; longer straight runs    not permission to work live; wear eye protection
Glow or push rod     open ceilings, wall cavities, short drops     rods flex and can snag on insulation
Vacuum or blown line long conduit runs, many bends                 needs a piston or mouse sized to the conduit
Pull-line tape       footage marks along the line                  read the marks to measure the run
\`\`\`

## Blown line in plain words
A light string is tied to a piston or mouse, a small foam or rubber plug. Air pressure at one end, or a vacuum at the other, carries the plug through the conduit and the string with it. Then you use the string to draw in a heavier rope. It is the fastest way through a long run with bends.

## Measuring with a tape-style line
A pull line with printed footage marks tells you the length of the run as it goes in. Write the figure on the schedule so you know whether the run fits the cable you have cut.

## Tie both ends, and leave one in
- Tie the line off at both ends of the conduit so it cannot slip back inside.
- Pull the new cable with a rope or tape, never the thin string alone.
- After the pull, leave a new pull string in the conduit for the next crew. Do not remove the last string.

A **snake rod** (a flexible fiberglass rod) or a **telescoping pole** reaches across a ceiling or down a wall cavity without opening every tile. Rope is tied with hitches that hold under load and still untie afterward, such as the **clove hitch** and the **timber hitch**, and the knot is taped so it cannot snag. Pull a **trailer string** in behind the cable so the next pull has a line waiting.

> Tip: tie a knot big enough that it cannot slide through the bushing, and tape the tail so it does not catch.

> Exam tip: never fish any tape, steel or fiberglass, into a box or raceway with energized conductors. The electrician de-energizes and locks out the circuit first. Fiberglass is only the better choice near electrical work because it does not conduct.`,
      hook: "Use a fish tape, rod, or blown line to get a line through, tie both ends off, measure with a footage line, and always leave a new pull string behind."
    },
    {
      id: "u4l3", title: "The Limits on Every Pull: Tension, Bend Radius, Crush, Twist", domain: 3, obj: "3.1", minutes: 11, lab: "bend-tension",
      body: `A pull that feels hard has already gone wrong. The cable can be stretched, kinked, crushed, or twisted, and the tester will not show it until the cable fails later. Know the limits before you start.

## The numbers
\`\`\`
Limit                                        Value
Pulling tension, 4-pair cable                110 N (25 lbf), per cable
Bend radius, 4-pair UTP                      4 x the cable OD
Bend radius, multipair copper                10 x the cable OD
Bend radius, optical fiber, no load          10 x the cable OD
Bend radius, optical fiber, under tension    20 x the cable OD
\`\`\`
The manufacturer's stated limit always wins over these numbers.

## Tension is per cable
The 110 N (25 lbf) limit belongs to each 4-pair cable. When you pull a bundle together, the limit for the bundle is the single-cable limit multiplied by the number of cables. Twelve cables in one pull allow 12 x 25 = 300 lbf, or 12 x 110 = 1320 N. Use one unit throughout and never mix pounds and newtons. A tension meter or a breakaway swivel keeps the pull inside the limit.

## Bend radius, under tension and after
The radius is measured in cable diameters. A cable 0.25 in thick (UTP) bends no tighter than 4 x 0.25 = 1 in. The same rule holds after installation: a cable laid in a tight loop is still bent too far. Fiber needs the bigger radius while it is being pulled.

## Crush, twist, and kinks
- Over-tight ties crush the pairs. Use hook-and-loop ties and leave the bundle loose. Never cinch.
- Twist builds when a cable spins as it comes off a reel or past a grip. Feed from a stand and use a swivel.
- A kinked cable is damaged. Replace it.
- Use only lubricant listed as compatible with the jacket.

> Tip: when a pull gets stiff, stop and find out why. Pulling harder is the one move that always makes it worse.

> Exam tip: 110 N or 25 lbf belongs to ONE 4-pair cable. A bundle is the single-cable limit times the number of cables.`,
      hook: "25 lbf or 110 N per 4-pair cable, multiplied for a bundle; bend radius 4 x UTP, 10 x multipair, fiber 10 x at rest and 20 x under tension; never cinch, twist, or kink."
    },
    {
      id: "u4l4", title: "Horizontal Cable in Conduit: Grips, Feeding, Pull Boxes", domain: 3, obj: "3.3", minutes: 10,
      body: `The conduit between the corridor and a wall box has two bends and a pull box in the middle. The foreman wants eight cables through it today. Conduit is the easy pathway to damage a cable in, because you cannot see what is happening inside.

## Make up the bundle
Cut and label every cable, then lay them parallel. Make the head of the bundle with a basket grip or with the cable ends taped in a staggered, tapered loop. A smooth, narrow head slides past joints and bushings. A square, lumpy head catches.

\`\`\`
Step   Action
1      Lay the cables side by side and square them at the ends
2      Fit the basket grip over the bundle, or tape a staggered tape-and-loop head
3      Attach the pull rope through a swivel
4      Feed the cable off its stand, one person at the feed end
5      Pull steadily at the other end, never in jerks
\`\`\`

## Feeding without kinks
Feed straight off the stand into the conduit mouth with a bushing or a guide so the cable never touches the edge. Keep enough people on the feed end to hold the cables apart and stop them twisting. Keep a steady pace so the cable never bunches or snaps tight.

## Pull boxes
A pull box is a place to feed from and to pull through, never a place to make a bend. If a run has more than two 90-degree bends or runs past 30 m (100 ft), a pull box divides it. Pull to the box, feed the cable out as a loop, and pull on to the next section.

## Finish the pull
- Pull to the outlet end and to the TR as the schedule says, leaving the planned slack.
- Cap or tape the ends and record the footage and the label.
- Leave a new pull string in the conduit, tied off at both ends.

> Tip: lubricant listed for the cable jacket helps in long runs with many bends, but only that, and never more than you need.

> Exam tip: a pull box is for feeding and pulling, never for bending cable. Keep the cable's bend radius even inside it.`,
      hook: "Build a smooth tapered head, feed straight without kinks, use pull boxes as feed points and not bends, leave slack, and replace the pull string."
    },
    {
      id: "u4l5", title: "Horizontal Cable in Open Ceilings: Hooks, Bundles, Plenum Rules", domain: 3, obj: "3.4", minutes: 10,
      body: `The ceiling above the corridor is open: no conduit, just a grid, light fixtures, duct, and a row of J-hooks hung by the last crew. The easy pull is to drag the cable across the tile grid. It is also the wrong one.

## Lay it in, never drag it
Walk the cable from hook to hook and lay it in. Dragging a cable over a grid or a sharp edge scrapes the jacket and saws the pairs. Use a helper at each change of direction and keep the cable off the ceiling tile.

\`\`\`
Rule                         Detail
Support spacing              J-hooks no more than 1.5 m (5 ft) apart
Independent support          hang from the structure, never from the grid wires or another trade's pipe
Bundle size                  stay within the hook's rated cable count, and keep bundles loose
Sag                          shallow and even; the bundle never rests on the tile
Clearance                    away from lights, ballasts, sprinklers, access panels, and duct
\`\`\`

## Keep clear
Fluorescent and other discharge lamps need 130 mm (5.12 in) of separation. Do not run cable over a ballast, through a sprinkler's spray pattern, or across a panel that must open. Leave service access free.

## Plenum rules
A ceiling used as part of the air system is a plenum. Cable there must be plenum rated (CMP for copper, OFNP for fiber). A riser or general-purpose cable in a plenum is a violation, even for a short run. A higher rating may replace a lower one, never the reverse. The jacket print tells you the rating.

## The drop
Bring the cable down to the outlet and secure it with a strap or a support, not with the ceiling grid. Leave the slack the plan gives and tie it loosely.

> Tip: set a few extra J-hooks where the route turns; a cable around a corner needs support on both sides of the turn.

> Exam tip: plenum space needs plenum-rated cable. A lower rating never replaces a higher one.`,
      hook: "Lay the cable into J-hooks no more than 1.5 m (5 ft) apart on their own supports, keep it away from lights and sprinklers, and use plenum-rated cable in air-handling spaces."
    },
    {
      id: "u4l6", title: "Backbone Riser From the Top Down: Hoisting, Brakes, Support", domain: 3, obj: "3.5", minutes: 10,
      body: `The riser shaft runs from the sixth floor to the basement TR and the backbone cable weighs more than your crew can hold. A heavy cable pulled downward can run away from you. Pulled down from the top, though, gravity does the work, and your job becomes controlling it.

## Why top down
Gravity pulls the cable down the shaft, so you do not need a winch pulling against its whole weight. The risk flips from "too hard to pull" to "too fast to stop." The cure is a brake and a clear plan.

\`\`\`
Item                  Purpose
Reel at the top       the reel stand sits at the top floor with a brake on it
Brake                 controls descent and stops the reel the moment the cable runs
Sleeve or opening     protected with a bushing so the jacket is not scraped
Split-mesh grips      hold the cable at each floor while the next section is fed
Clamps or cable hangers support the weight at each floor
Radios                every floor can call a stop
\`\`\`

## Control the descent
1. Set the reel on the top floor with the brake on.
2. Feed the cable off the reel slowly while a crew member at each floor watches and guides it.
3. At each floor the cable is secured with a grip or clamp that takes the weight, so the load is shared over several floors and not hanging on the top reel.
4. A person at every level calls "stop" if the cable binds or runs.

## Support and finish
Secure and support the cable at each floor as you go. The weight of a riser cable must not hang from the floor below or from the jacket alone. Once the cable is in place, firestop every floor opening and label the cable at each floor. Never splice a riser.

> Tip: set the brake before the first foot comes off the reel, not after the cable starts to run.

> Exam tip: top-down is gravity-assisted, so the danger is a runaway. A brake at the reel and support at every floor are the answers.`,
      hook: "Top down lets gravity help, so put a reel with a brake at the top, control the descent, support the weight at every floor, firestop, label, and never splice."
    },
    {
      id: "u4l7", title: "Backbone Riser From the Bottom Up: Winches, Swivels, Tension", domain: 3, obj: "3.6", minutes: 10,
      body: `Sometimes the reel cannot go on the top floor: the roof is closed, the top room is too small, or the cable is simply too heavy to lift there. Then you pull from the bottom up, against gravity, and the tension rises with every floor.

## When bottom up is required
Choose bottom-up when the reel cannot be set up at the top, when the shaft or the cable does not suit a top-down feed, or when the plan says so. It is the harder method, and it needs a machine.

\`\`\`
Item                       Purpose
Pull line                  runs up the shaft from the top to the reel at the bottom
Winch or capstan           at the top, draws the line in at a steady speed
Pulling eye or grip        attaches the cable to the line
Swivel                     between the line and the grip so twist stays out of the cable
Tension monitor            a meter or dynamometer in line with the pull
Radios                     between the reel, the top, and each floor
\`\`\`

## Watch the tension
Compare the reading against the manufacturer's tension limit for that cable. If the pull nears the limit, stop. A heavy cable weighs more with every floor and the tension climbs as a result. Never exceed the rating to finish the pull, and never rely on feel.

## Support before you release
Each floor must hold the cable before the winch lets off. A cable hanging from the pulling eye alone is hanging from the weakest point. Secure it at each floor with a grip or clamp, then release the tension.

1. Pull the cable up to the top at a steady speed.
2. Secure it at the top with a grip.
3. Secure it floor by floor so the weight spreads.
4. Release the tension only when every support is holding.
5. Firestop each opening and label the cable.

> Tip: put a person with a radio at each floor so any one of them can stop the winch at once.

> Exam tip: bottom-up means tension monitoring against the manufacturer's limit and support at every floor before the tension is released.`,
      hook: "Bottom up fights gravity: a winch at the top, a swivel and grip, tension watched against the manufacturer's limit, and support at every floor before release."
    },
    {
      id: "u4l8", title: "Horizontal Backbone Between Rooms and Buildings", domain: 3, obj: "3.7", minutes: 9,
      body: `Backbone is not only vertical. The cable between two TRs on the same floor is backbone, and so is the cable between two buildings, which crosses the property through the entrance facility. These pulls are longer, so setup matters more.

## Between TRs on a floor
Use the pathway the drawings show, cable tray, ladder rack, or conduit. Support the cable along the way and pull it with a pulling eye and swivel, just as a riser. Leave the length of the backboard plus floor to ceiling at the TR when the cable is multipair.

## Between buildings
Outdoor cable runs underground or in the air, through the entrance facility and into the building. Pull it in innerduct in the underground conduit and through manholes where the plan says.

\`\`\`
Item                          Rule
Outdoor cable                 outdoor-rated, often loose tube and gel filled
Transition                    must change to indoor-rated cable within a short distance of entering,
                              set by the NEC and the AHJ, and the entrance facility is where it happens
Innerduct                     pull in innerduct and leave a labeled pull string
Pull boxes and manholes       recognition level: they are feed and pull points, never a place to coil cable
Confined space                a manhole needs testing, ventilation, a permit, and a standby person
\`\`\`

## Pull planning for long runs
- Mark the pull points on the schedule and decide where the cable will be fed and where it will be pulled.
- Use a tension meter and a swivel, and stay under the manufacturer's limit.
- Lay a long run in a figure eight if it must be staged on the ground.
- Protect the ends, cap them, and label the cable at both ends.

## Why transition inside
Outdoor cable has a jacket that burns and a gel that burns. Inside, flame can travel along it. The NEC limits how far it may enter before it changes to cable with an indoor fire rating.

> Tip: coordinate with the electrician and the owner before you open a manhole or trench. You never work in a confined space alone.

> Exam tip: outdoor cable transitions to an indoor-listed cable within the distance the NEC allows, normally right at the entrance facility.`,
      hook: "Between TRs or buildings, pull in innerduct with a swivel and tension limit, transition outdoor cable to indoor-rated cable at the entrance facility, and respect confined-space rules."
    },
    {
      id: "u4l9", title: "Pulling Optical Fiber: Strength Members, Tension, Figure-Eight", domain: 3, obj: "3.1", minutes: 10,
      body: `The fiber cable looks thin and light, but it is the easiest cable on the job to ruin. A fiber cable pulled wrong can show nothing on the outside and be dead on the test.

## Pull on the strength members
Fiber cable carries its own pulling strength: aramid yarn (or a central member) running inside the jacket. You attach the pulling grip or eye to that strength member. Never pull on the glass fibers and do not rely on the jacket alone. The pull puts a stretch on the fiber and stretch breaks it.

\`\`\`
Rule                    Detail
Where to pull           on the strength member, never on the fibers or the jacket
Tension limit           the manufacturer's rating on the specification sheet
Bend radius, no load    10 x the cable OD
Bend radius, in tension 20 x the cable OD
Figure-eight            for long pulls and staging, to avoid twist
Innerduct               pull inside innerduct in conduit and trays
\`\`\`

## Bend radius
Fiber needs the bigger radius while you pull. A 0.5 in cable bends no tighter than 20 x 0.5 = 10 in under tension, and 10 x 0.5 = 5 in once it is in place. Sheaves are sold by diameter, but the rule is a radius: the sheave's radius must be at least the minimum bend radius under tension. A cable that needs a 10 in radius needs a sheave at least 20 in across. Use large sheaves and sweep elbows.

## Figure-eight storage
A coil laid on the floor puts a twist into the cable with each loop. A figure eight puts one twist in each lobe in opposite directions, so the twists cancel. Lay a long run in a figure eight on the floor and flip it as you feed.

## Ends and cleanliness
Protect the ends with a pulling eye or a pre-terminated cable sleeve. Cap them and keep dirt out. Never drag fiber across a dirty floor.

Fiber loses light at bends in two ways. A **macrobend** is a bend you can see that is tighter than the bend radius. A **microbend** is a tiny kink in the fiber from crushing, a tight tie, or a sharp edge. Both add loss, and both are avoided by keeping the radius and never cinching a bundle.

> Tip: a swivel between the line and the grip keeps the twist out of the cable, and a tension meter keeps you honest.

> Exam tip: fiber is pulled on the strength member, never the fibers, and the bend radius is 10 x at rest and 20 x under tension.`,
      hook: "Pull fiber on the strength members, stay under the manufacturer's tension rating, use 10 x and 20 x bend radii, store long pulls in a figure eight, and protect the ends."
    },
    {
      id: "u4l10", title: "Slack, Service Loops, and Dressing the Pull Into the Room", domain: 3, obj: "3.3", minutes: 9,
      body: `The cables are in, but the job is not done until they are dressed into the room. Slack is cheap while the cable is in your hand and expensive once the wall is closed. Too little and a move costs a new cable. Too much and the ceiling fills.

## How much slack
\`\`\`
Place                     Amount
Work area, 4-pair copper  305 mm (12 in) minimum after termination; not stored in loops
TR or ER, 4-pair          enough to reach the farthest corner by way of the pathway, plus floor to ceiling
TR or ER, multipair       the length of the backboard plus floor to ceiling
TE                        2 m (6.6 ft) stored outside the enclosure
\`\`\`
Service slack allows reterminations and moves without a new cable.

## Service loops
Where the plan calls for a loop, lay it in a large, loose coil in the ceiling or on the ladder rack, at least at the cable's bend radius, supported so the weight does not hang on one point. A loop is not a place to tie cable tight or to leave a sharp bend.

## Dress into the rack
- Bring the cable to the rack from above through the ladder rack or the vertical manager.
- Bundle by patch panel, in the order they will land on the ports.
- Use hook-and-loop ties and leave them snug but loose; never cinch.
- Keep the labels facing out where a person can read them.

## Leave the room clean
Pick up scrap, sweep, and put the tiles back. Cap or protect each cable end until termination so dirt and moisture stay out. Record the footage against the label on the pull schedule.

> Tip: when you tie the bundle, keep the cables in the order of their port numbers. It saves hours at termination.

> Exam tip: slack at the work area is at least 305 mm (12 in) after termination, and it is not stored in loops.`,
      hook: "Leave the planned slack at every end, lay service loops at the bend radius, dress cables to the panel in port order with hook-and-loop ties, protect the ends, and clean up."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Termination", domain: 4,
  blurb: "Preparing cable, choosing hardware, and terminating four-pair, multipair, coax, and fiber to the standard.",
  assumes: "Unit 4: pulling cable.",
  lessons: [
    {
      id: "u5l1", title: "Pretermination: Sheath Removal, Pair Handling, Untwist Limits", domain: 4, obj: "4.1", minutes: 10,
      body: `The cable is pulled, the slack is dressed, and the label says it belongs on port 14. Before the first conductor goes anywhere, the cable has to be prepared. Most failed links trace back to this step, not to the termination itself.

## Route and dress first
Route the cable to the termination point in the order the ports are numbered. Check the label against the pull schedule and the outlet or port label. Cut to length with the slack plan in mind: leave the planned service slack, then strip only what the hardware needs.

## Remove the jacket without nicking
A nick in a conductor's insulation is a future failure. Use a cable stripper set to the jacket depth, or a ring tool, and rotate it gently. If the cable has a rip cord, score the jacket lightly, pull the rip cord down to open it, and cut the loose jacket away.

\`\`\`
Rule                          Detail
Jacket removal                no nicks or cuts in the insulation underneath
Rip cord                      use it where the cable has one; it opens the jacket cleanly
Untwist limit                 at most 13 mm (0.5 in) for Category 5e and above
Insulation                    never strip it for an IDC; the connector cuts through it
Pairs                         keep each pair twisted right up to the termination point
Strain relief                 secure the cable so no pull reaches the termination
\`\`\`

## Why the untwist limit
A pair carries a signal because its two wires are twisted together. Every millimeter you untwist is a millimeter that picks up and leaks crosstalk. Keep the pairs twisted to within 13 mm (0.5 in) of the termination.

## Shielded cable
Shielded cable has a drain wire and foil that must be handled before the pairs are. Lesson u5l8 covers that in full. Never trim the foil away or leave it loose.

> Tip: check the cable for kinks, nicks, and crush before you strip. If the damage is there, cut it off and start clean.

> Exam tip: the untwist limit is 13 mm (0.5 in), and insulation is never stripped for an insulation displacement connector.`,
      hook: "Route in port order, strip the jacket without nicking, use the rip cord, keep pairs twisted to within 13 mm, and never strip insulation for an IDC."
    },
    {
      id: "u5l2", title: "Connecting Hardware: Jacks, Panels, 110 and 66 Blocks", domain: 4, obj: "4.2", minutes: 10, lab: "punch-110",
      body: `A box of connecting hardware is on the shelf in the staging room: jacks, panels, blocks, and fiber cassettes, in three categories. The drawing says which. Your job is to match the hardware to the cable and the job, not to use what is nearest.

## Match the category
The link is only as good as its weakest part. Every component in a link, cable, jacks, panels, blocks, and cords, must be rated at least the category of the link. A higher-rated part never hurts, and a lower-rated one drags the whole link down. One Category 5e jack in a Category 6A link makes the link a Category 5e link.

\`\`\`
Hardware           Where it belongs
Keystone jack      the outlet in the work area, in a faceplate
Patch panel        the rack in the TR, jacks in a row, horizontal cable on the back
110 block          horizontal and backbone cross-connects and high-speed data
66 block           voice only; not for high-speed data
Fiber panel        rack-mounted, with adapters and cassettes for terminated fiber
\`\`\`

## Fiber hardware
A fiber panel holds adapters (the couplers where two connectors meet) and sometimes cassettes, small modules that connect a multifiber trunk to a set of single-fiber ports. Match the connector type of the panel to the connector on the cable.

## 110 punch-down in order
1. Lay the cable on the block, pairs in order, and keep the twist to within 13 mm.
2. Lay each conductor into its slot following the color code on the block. The pairs land in the order blue, orange, green, brown, and inside each pair the white-striped conductor (the tip) goes in before its solid mate (the ring).
3. Seat each conductor with the 110 punch tool. The blade has a cutting side: turn it OUT, toward the end of the wire, so the tool trims the excess as it seats the conductor.
4. Check that each wire is seated and trimmed flush.

A punch tool does two jobs in one stroke: it seats the wire in the IDC and cuts off the extra. Cutting side in puts the cut on the wire you need to keep.

The **designation strip** is the labeled strip that sits in the holder on a 110 or 66 block and names each position, so the next technician can read what lands where.

> Tip: use the jack's own color-coded label for the scheme the job uses, and follow it for every pair so no one has to guess.

> Exam tip: a 66 block is for voice only. Every part of a link must match the category of the cable.`,
      hook: "Match the category of every part, use keystone jacks at the outlet, patch panels and 110 blocks in the TR, 66 blocks for voice only, and seat 110 wire with the blade cutting side out."
    },
    {
      id: "u5l3", title: "Four-Pair Termination: T568A and T568B on Jacks, Panels, and Plugs", domain: 4, obj: "4.4", minutes: 11, lab: "jack-t568b",
      body: `The designer's note says T568B. The jacks in the box show both color codes printed on the housing. If the crew mixes them, the tester will show crossed pairs and a wasted afternoon. One scheme per job is the rule.

## The two pin tables (pinouts)
\`\`\`
Pin   T568A         T568B
1     white-green   white-orange
2     green         orange
3     white-orange  white-green
4     blue          blue
5     white-blue    white-blue
6     orange        green
7     white-brown   white-brown
8     brown         brown
\`\`\`

Only the orange and green pairs swap. The blue pair stays on pins 4 and 5 and the brown pair on pins 7 and 8 in both. The pair at pins 1 and 2 and the pair at pins 3 and 6 are the ones that change color.

## One scheme per job
Pick T568A or T568B once, write it on the drawings, and use it at every jack, patch panel, and cord end. Mixing them does not break continuity, but it creates a reversed or crossed link that fails the wiremap.

## Terminating a jack
1. Strip only the jacket needed, keeping the twist to within 13 mm.
2. Match the pairs to the color-coded label on the jack, the scheme the job uses.
3. Seat each conductor in its slot, in order.
4. Set the cap, then seat and cut with the tool.
5. Check for a stray strand and a tight, flush cap.

## Plugs and crimping
A field plug crimped on a cord is recognition-level work: it uses the same pin tables. Stranded cord is for patch cords. Solid cable goes on jacks and panels.

## Straight-through and crossover
A straight-through cord has the same scheme at both ends. A crossover has T568A at one end and T568B at the other, which swaps the transmit and receive pairs. Modern equipment senses this and does not need it.

> Tip: keep a printed pin table in your tool bag. The eye is fooled by white-orange and white-green on a ready crimp.

> Exam tip: one scheme per job. T568A and T568B differ only by the orange and green pairs.`,
      hook: "Use one scheme per job, T568A and T568B swap only the orange and green pairs, follow the jack's color label, seat each conductor, and cap and cut with the tool."
    },
    {
      id: "u5l4", title: "Multipair Termination: the 25-Pair Code, Binders, 66 and 110 Blocks", domain: 4, obj: "4.3", minutes: 11, lab: "pair-colors",
      body: `A 100-pair backbone cable arrives at the TR, and a block waits for it. Twenty-five pairs of white-blue to violet-slate must land in order. You do it from a code, not from memory of each wire.

## The 25-pair code
Each pair has a tip color and a ring color. Five tip colors times five ring colors give 25 pairs.

\`\`\`
Tip colors in order    white, red, black, yellow, violet
Ring colors in order   blue, orange, green, brown, slate
\`\`\`

Pair 1 is white-blue, pair 2 white-orange, pair 5 white-slate, pair 6 red-blue, and pair 25 violet-slate.

## From colors to a pair number, and back
Number the tip colors 1 to 5 and the ring colors 1 to 5 in order. Then:

**pair n = 5 x (tip group - 1) + ring position**

Black-brown: black is tip group 3 and brown is ring 4, so n = 5 x 2 + 4 = 14. Going back: for pair 14, take 14 - 1 = 13. Divide by 5: the whole part is 2, so the tip is the third color, black. The remainder is 3, so the ring is the fourth color, brown.

## Binder groups
Cables above 25 pairs bundle each group of 25 under a colored binder (tape or thread). The binder colors follow the same code. The white-blue binder holds pairs 1 to 25, the white-orange binder holds 26 to 50, and so on.

## Terminating in order
- Work binder by binder, pair by pair, in color order.
- On a 110 block, lay and punch each pair as for four-pair: seated and cut with the tool, cutting side out.
- On a 66 block, the same order and the same discipline.
- Keep the twist as close to the block as you can.
- Label each row with its pair range.

## Bridging clips
A bridging clip joins two rows of a 66 block to cross-connect a pair, and it can be pulled out to open the circuit for testing. This is recognition level, and clips are not rated for high-speed data.

> Tip: terminate in order, and any wrong pair shows as a break in the pattern of colors.

> Exam tip: pair n = 5 x (tip group - 1) + ring position. Tip colors: white, red, black, yellow, violet. Ring colors: blue, orange, green, brown, slate.`,
      hook: "The 25-pair code: tips white, red, black, yellow, violet; rings blue, orange, green, brown, slate; pair n = 5 x (tip group - 1) + ring position; one colored binder per 25 pairs."
    },
    {
      id: "u5l5", title: "Coaxial Termination: F and BNC, Compression Fittings, Strip Dimensions", domain: 4, obj: "4.5", minutes: 10, lab: "coax-f",
      body: `A camera is mounted and the cable is pulled. The picture rolls. The cable is good, so the fault is in the connector. Coax connectors are small, simple, and the most common coax failure.

## Which cable, which use
\`\`\`
Cable   Impedance   Use
RG-6    75 ohm      the standard for video and cable television in new work
RG-59   75 ohm      older and thinner, with more loss; short video and camera runs
RG-11   75 ohm      thick, low loss; long runs and outdoor feeders
\`\`\`
F connectors serve television and BNC serves security video and test gear.

## Strip, then fold
Use the connector maker's strip tool. It cuts the jacket, the braid, and the dielectric to set depths at once, so each layer is exposed to the right length and the center conductor is the right length. Fold the braid back over the jacket so it makes contact with the connector body, and keep stray braid strands away from the center conductor.

\`\`\`
Check                            Result
Center conductor                 straight, clean, and the length the connector needs
Braid                            folded back, no strands touching the center conductor
Dielectric                       clean cut, not crushed
Connector                        fully seated with the compression tool
\`\`\`

## Compression, crimp, and twist-on
A compression connector is the standard today: a clean strip, then a tool squeezes the fitting evenly along the cable. A crimp connector is older and gives a less even grip. A twist-on (screw-on) connector is strongly discouraged: its threads bite unevenly, it loosens, and the braid can touch the center conductor.

## Center conductor and inspection
An F connector uses the cable's own solid center conductor as the pin, so it cannot be used on a stranded center conductor. After compressing, look at the finished connector: the center conductor protrudes the correct amount, no braid shows outside, and the fitting is tight on the jacket. Then test continuity and for a short between center and shield.

> Tip: a sharp strip tool and a clean cut matter more than force on the compression tool.

> Exam tip: twist-on connectors fail because they loosen and let braid touch the center conductor. Use compression.`,
      hook: "RG-6, RG-59, and RG-11 are 75 ohm; strip with the right tool, fold the braid, compress rather than twist on, check the center conductor, and test for shorts."
    },
    {
      id: "u5l6", title: "Optical Fiber Connectors and Termination Methods", domain: 4, obj: "4.6", minutes: 10,
      body: `A fiber panel has twelve LC adapters and a pigtail waiting for each. One wrong connector and the link will not mate. Know the connectors, the end faces, and the three ways a fiber gets its connector.

## The connectors
\`\`\`
Connector   Description
LC          small form factor with a latch; the common choice on new work
SC          square, push-pull; common on patch panels
ST          round bayonet with a twist lock; older style
MPO         multifiber push-on: many fibers in one ferrule
\`\`\`

## End faces and colors
UPC (ultra physical contact) has a polished flat-curved face and a blue body. APC (angled physical contact) has an angled face and a green body. Never mate an APC to a UPC: the angled and flat faces damage each other and lose signal.

## Three ways to terminate, at recognition level
- **Field polish:** the connector is glued and the end face polished by hand.
- **Mechanical splice (prepolished):** a factory-polished stub inside the connector joins the fiber in a splice with index-matching gel.
- **Fusion-spliced pigtail:** a factory-made connector and a short fiber (a pigtail) are fused to the cable fiber by a machine. It gives the lowest loss and is the most common on large jobs.

Each field method starts with a **cleave**: the bare fiber is scored and snapped so its end is flat and square. Shards go straight into a marked container.

A fourth option skips field termination: with **pre-termination**, the cable or trunk arrives from the factory cut to length with its connectors already on and tested. The installer pulls it, protecting the ends, and plugs it in, so the lengths must be measured right before the order goes in.

## Panels and polarity
A duplex link needs the transmit of one end to land on the receive of the other. Polarity is that crossing. Follow the labeling on the panel and the plan, and check it with a light source before you trust it.

## Safety
- Shards of cut fiber are sharp and invisible: use a sealed disposal container.
- No food or drink near the work area.
- Never look into a fiber end or connector with a light source on.

> Tip: put the dust caps back on every connector and adapter you are not using. Dirt is the biggest enemy.

> Exam tip: APC is green, UPC is blue, and the two never mate.`,
      hook: "Know LC, SC, ST, and MPO, blue UPC and green APC (never mate them), field polish, mechanical splice, and fusion-spliced pigtails, and dispose of shards safely."
    },
    {
      id: "u5l7", title: "Inspecting and Cleaning Fiber End Faces", domain: 4, obj: "4.6", minutes: 9,
      body: `The link tests with high loss and the connectors look fine to the naked eye. Contamination is the most common fiber fault, and you cannot see it without a scope. The rule is simple: inspect before you connect.

## Inspect first
Use an inspection scope on the end face before every mating. If it is dirty, clean it and look again. If it is scratched or cracked, the connector must be replaced.

\`\`\`
Step   Action
1      Check that the fiber is dark; never look into a live end
2      Inspect the end face with the scope
3      If dirty, clean it, then inspect again
4      Mate only when the face is clean
5      Cap every unused end
\`\`\`

## The laser-safety rule
Never look into a fiber end or a connector with a light source on, and never look through a microscope at a live fiber without an approved scope with a filter. Treat every fiber as live until it is proven dark.

## Cleaning
- **Dry cleaning** comes first: a cassette cleaner, a swab, or a wipe drawn across the face once.
- **Wet-to-dry** is the second step, if dry cleaning fails: a small amount of approved solvent on a wipe, then a dry wipe over the same spot to remove it.
- A **one-click cleaner** is a pen that cleans a connector or adapter in a single push.
- Never touch the end face, and never blow on it.

## Dust caps
Keep dust caps on every connector and adapter when it is not in use. A cap that has fallen on the floor is dirty; clean the connector before you mate it.

## Why it matters
A speck of dust on the core of a singlemode fiber, which is about 9 micron wide, can block most of the light. That is why contamination is the first suspect when a link tests badly.

> Tip: clean and inspect both sides of an adapter: the connector and the adapter's inside.

> Exam tip: the first step with a fiber link that tests high in loss is to inspect and clean the connectors.`,
      hook: "Inspect before you connect, never look into a live fiber, clean dry first and wet-to-dry second, use one-click cleaners, and keep dust caps on."
    },
    {
      id: "u5l8", title: "Shielded Cabling: Drain Wires, Shield Continuity, Bonding at the Panel", domain: 4, obj: "4.2", minutes: 9,
      body: `A building near a radio tower has a shielded cable system. The foreman says "bond the shield." If you leave one end floating or break the shield in the middle, the cable no longer protects anything.

## What shielded cable is
\`\`\`
Type    Construction
F/UTP   foil over the whole cable, no shield on individual pairs
S/FTP   braid over the whole cable and foil on each pair
\`\`\`
Shielded cable is only as good as its shield. The shield must be continuous from end to end, jack to jack, and bonded.

## Hardware and handling
Use shielded jacks and shielded patch panels. Their metal bodies make contact with the cable's foil or drain wire. A shielded cable in an unshielded jack is an unshielded cable.

1. Strip the jacket only as much as needed.
2. Fold back the braid or foil, and keep it from touching the conductors.
3. Terminate the drain wire to the jack's or panel's shield lug or contact.
4. Keep the foil in full contact with the shield of the jack.

## Continuity and bonding
- The shield is continuous across every connection: cable, jack, panel, and cord.
- The panel and rack are bonded to the telecommunications bonding path with a rack bonding conductor, 6 AWG minimum, to the secondary bonding busbar.
- Never daisy-chain the bonding conductor from rack to rack.

## A broken shield is an antenna
If the shield breaks, or is grounded at one end only through a bad connection, it can pick up noise and radiate it. A broken or poorly bonded shield is worse than no shield. The tester's shield test and a bonding resistance check, 0.1 ohm (100 milliohms) at most, confirm the work.

A cable with one overall foil screen around four unshielded pairs is a **screened twisted-pair** cable (F/UTP). Like any shielded cable, it works only when the screen is continuous and bonded at the panel.

> Tip: do not cut away the foil because it is in your way. Fold it, tape it neatly if needed, and keep it in contact.

> Exam tip: the shield must be continuous end to end and bonded at the panel. A shield that is not continuous or not bonded is an antenna.`,
      hook: "Shielded systems need shielded hardware, a terminated drain wire, a shield continuous end to end, and a bonded panel and rack; a broken shield acts as an antenna."
    }
  ]
});
