// INST1 Academy deeper explanations, units 4 and 5. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u4l1: `## A pull schedule for six cables
Here is a real-looking schedule for six drops from TR 2A. The measured path is what you get from the drawing or a tape-style pull line. The slack column is 10 ft at each end, as the plan gives it, so each cable needs its path plus 20 ft.

\`\`\`
Cable ID   To        Path   Slack, both ends   Cut length   Pathway
2A-014     Outlet 14  168    20                 188 ft       corridor J-hook, drop
2A-015     Outlet 15  182    20                 202 ft       corridor J-hook, drop
2A-016     Outlet 16  144    20                 164 ft       conduit to wall box
2A-017     Outlet 17  120    20                 140 ft       corridor J-hook, drop
2A-018     Outlet 18   96    20                 116 ft       conduit to wall box
2A-019     Outlet 19  150    20                 170 ft       corridor J-hook, drop
Total                                          980 ft
\`\`\`

Six cut lengths add up to 980 ft, so the six cables fit in one 1000 ft box with 20 ft left over. The leftover is scrap unless a seventh drop is short enough to use it. Pull the longest cable first so a short box end is never the cable that comes up short.

## Why whole runs per box
A box is one continuous length. If a run is 200 ft and the box has 1000 ft, you get 5 runs and the last 0 ft is empty. If the run were 230 ft, you would get 4 runs with 80 ft of leftover, because a fifth run does not fit. That leftover is never joined to anything. A splice in horizontal copper is not allowed, so a partial run is scrap.

## Worked example: the box count
You must pull 32 runs for the floor. Each run is 180 ft of path with 10 ft of slack at each end.

1. Cut length = 180 + 10 + 10 = 200 ft.
2. Runs per box = 1000 / 200 = 5, rounded down. Already whole.
3. Boxes = 32 / 5 = 6.4, rounded UP to 7.

Change the run to 230 ft: 1000 / 230 = 4.35, rounded down to 4 runs per box. Then 32 / 4 = 8 boxes. A longer run does not just add cost in proportion; it changes how many runs a box gives.

## Setup checklist the schedule drives
- Reel stands or boxes at the TR, one per cable in the pull, so nothing twists.
- Sheaves at the corridor corner and at the first J-hook past the TR door.
- Radios: the feed end and the outlet end, and a runner at the turn.
- Labels cut and ready, one per cable, so every cable is marked before it is cut from the box.

> Remember: slack at both ends, runs per box rounded down, boxes rounded up.`,

u4l2: `## Choosing a way to get a line through
A pull string is the first and cheapest part of a pull, and the one most often skipped. The choice depends on the conduit: its length, how many bends it holds, and whether there is a line in it already.

\`\`\`
Situation                                  Best method
Short, straight stub with one bend         steel or fiberglass fish tape
Long straight run                          fiberglass fish tape, the preferred tape near electrical work
Ceiling drop to a wall box                 glow or push rod
Long run with several bends                blown line with a piston, or a vacuum
Run with an old string already inside      tie new string to old, pull the old string out
Box or raceway with live conductors      no tape of any kind until the electrician de-energizes and locks out the circuit
\`\`\`

## Blown line in more detail
The piston or mouse is sized to the conduit's trade size. It is tied to a light line that pays off a reel. A vacuum or a blower moves the piston down the conduit, and the line goes with it. You then tie a heavier pull rope to the light line and draw it back. A mouse stuck behind a joint can be cleared by reversing the airflow.

## Worked example: replacing a string
You pull eight cables through a conduit that had one pull string in it. The string was a thin nylon line.

1. Tie the new, stronger pull rope to the old string at the TR end.
2. Pull the old string out at the far end until the rope arrives, then untie the string.
3. Tie the cable bundle to the rope through a swivel and pull the cables through.
4. Before you finish, run a new pull string through with the cable, or draw one in on the same rope. A conduit must never be left empty of string.
5. Tie the string off at both ends and tag it with the date and the conduit number.

## Measuring while you pull
A footage line prints a number every foot or meter. At the far end, read the mark where the line comes out. That figure is the run length. Record it against the cable ID so the next crew knows which conduits are long.

## Safety
Metal fish tapes carry electricity and can pull a fault into your hands. Never fish any tape, steel or fiberglass, into a box or raceway with energized conductors. The electrician de-energizes and locks out the circuit first. Fiberglass is preferred near electrical work because it does not conduct, but that is not permission to work live.

> Remember: tie off both ends, use a rope rather than string for the real pull, and always leave a fresh string in.`,

u4l3: `## The limits worked in numbers
Every limit on the pull has a number, and the exam gives you the cable and asks for the number. Practice each calculation until it is routine. The rules: tension 110 N (25 lbf) per 4-pair cable; bend radius 4 x OD for 4-pair UTP and 10 x OD for multipair; fiber 10 x OD with no load and 20 x OD under pulling tension.

\`\`\`
Cable                      OD       Rule               Minimum bend radius
4-pair UTP                 0.25 in  4 x OD             1.0 in
Multipair copper           1.0 in   10 x OD            10 in
Fiber, installed, no load  0.5 in   10 x OD            5 in
Fiber, during the pull     0.5 in   20 x OD            10 in
\`\`\`

## Tension for a bundle
The 25 lbf limit belongs to each 4-pair cable. Pulled together, the limit is that figure times the number of cables, as long as each cable shares the load evenly and the grip is rated for it.

Worked example: you pull 12 cables at once.
- In pounds: 12 x 25 = 300 lbf.
- In newtons: 12 x 110 = 1320 N.

Pick one unit and stay in it. The two numbers are close but not equal, so never convert one cable in one unit and the rest in another. A swivel and a tension meter at the grip tell you what the cables are really feeling.

## Worked example: a decision
A tension meter on the pull of 12 cables reads 320 lbf as the cable passes the second bend. The limit is 300 lbf. The correct action is to stop the pull, find out why it is stiff (a crushed section, a missing sheave, or too many cables), and fix that before going on. Do not push the last 20 lbf by speeding up.

## What each limit protects
- Tension stretches the pairs and loosens the twist, which fails return loss and crosstalk later.
- A bend tighter than the radius flattens the pair spacing.
- Crush from a cinched tie deforms the jacket and the pairs.
- Twist from a spinning reel puts a spiral in the cable that shows up as a kink.

## After the pull
The bend radius applies to a cable at rest too. A service loop in the ceiling must be larger than the radius, and a cable that turns into a wall box needs a box deep enough for the bend. Tie bundles with hook-and-loop ties, never cinched.

> Remember: 110 N or 25 lbf per cable; a bundle is that times the count; bend radius is a multiple of the diameter, and the manufacturer's number wins.`,

u4l4: `## One conduit pull from start to finish
Take one pull as a story: eight cables from a TR through 60 ft of conduit with two bends and a pull box, to a wall box in a conference room.

\`\`\`
Stage        What you do                                            Why
Plan         read the schedule; check the fill and the pull points  conduit is a closed pathway
Line         blow or fish a line in; replace with a rope            the rope carries the force
Make up      label cables, square the ends, fit the basket grip     a smooth head slides past joints
Feed         stand at the TR, cables run off stands into a bushing  no kinks, no dragging
Pull         steady and slow; radios on                             jerks stretch the cable
Pull box     feed the loop out at the box and pull on               never a bend point
Finish       trim to slack, cap, label, new string in               ready for termination and the next crew
\`\`\`

## Making a tape-and-loop head
When no basket grip is at hand, strip a short length of each jacket back, fold the ends over a pulling loop, and tape them down in a tapered shape. Stagger the cable ends so the head tapers in steps and does not end in one square lump. A tight, smooth wrap lets the bundle slide past a coupling.

## Worked example: where a pull box goes
Run length is 85 ft with three 90-degree bends. The rules: no more than two 90-degree bends and no more than 30 m (100 ft) between pull points. This run breaks the bend limit, so it needs a pull box. Place the box after the second bend. Now the first section has two bends and the second has one, and each section is under 100 ft.

At the pull box you pull enough cable out to make a loose loop, check the whole length for kinks, lay the loop at its bend radius, and then pull on. The loop must not be bent tighter than the cable's bend radius.

## Feeding without kinks
- A person on every few feet of the feed end to keep the cables from twisting around each other.
- A bushing or a guide so the cable never touches the cut edge of a conduit.
- A stand or box that pays out smoothly. Never pull cable up from the floor of a reel.

## Why the rope carries the force
The jacket, the pairs, and the bundle are not built to bear a pull. The rope takes the load, and the grip spreads it around the whole bundle.

> Remember: pull boxes are for feeding and pulling, never for bending, and a conduit gets a fresh pull string every time.`,

u4l5: `## A ceiling pull checked against the rules
You are about to hang cable above a corridor. The plan shows a 60 ft run with J-hooks every 5 ft, then a turn into a room. Look at the ceiling before you lay a single cable.

\`\`\`
What you see             What you do
J-hooks on grid wire     reject them; hang new hooks from structure
Hooks 8 ft apart         add hooks so none are more than 1.5 m (5 ft) apart
Ballast above the route  keep the cable 130 mm (5.12 in) away, or reroute
Sprinkler head below     keep the cable clear of the spray pattern and the head
Access panel in the way  route around it so the panel still opens
Duct dripping or cold    do not tie to it; the duct belongs to another trade
\`\`\`

## Counting hooks, a worked example
A straight run of 60 ft with a hook every 5 ft needs 60 / 5 = 12 spans. The first hook near the start and the last near the end are included, so you need 13 hooks. Add hooks on both sides of any turn.

## Bundle size and loading
Each J-hook has a rated count of cables. Do not exceed it. Lay a bundle of four or five cables in one hook, loose, so a person can lift it. Bigger bundles need bigger hooks or a tray. A cable that sits under the bundle on the bottom of the hook carries the weight of all the rest, so keep bundles shallow and untied.

## Plenum and riser ratings
An air-handling ceiling is a plenum. Check the print on the jacket before you lay a single cable.

\`\`\`
Print     Allowed in a plenum?
CMP       yes
CMR       no, riser only
CMG, CM   no, general purpose only
CMX       no, limited use
\`\`\`
The same applies to fiber: OFNP is plenum and OFNR is riser. A higher rating may go where a lower one is required, not the other way around.

## The drop
At the outlet the cable comes down in the wall or a pole. Strap it to the structure or a support and leave the slack the plan gives. Do not tie to the grid. Label it at the outlet end before you go on.

> Remember: lay in, do not drag; 1.5 m (5 ft) between supports; independent support; plenum cable in a plenum.`,

u4l6: `## A top-down riser plan
The backbone cable runs from the sixth-floor TR down to the basement TR. It is a heavy multipair cable on a large reel. Here is the plan for the crew.

\`\`\`
Position        Person   Task
Top floor       2        set the reel on a stand, set the brake, feed
Floors 5 to 1   1 each   guide the cable, call stop, hold the grip at the floor
Basement        2        receive the cable, secure it, confirm the arrival
\`\`\`

Everyone has a radio on the same channel and a signal for stop.

## Steps in order
1. Walk the shaft. Check that each floor opening has a bushing or a sleeve so the cable will not scrape.
2. Set the reel on its stand at the top. Set the brake and check that it holds.
3. Feed the end of the cable down the shaft to the floor below, and secure it there with a split-mesh grip or a clamp.
4. Release the brake a little, feed more cable, and secure it at each floor in turn. The support takes the weight at each floor.
5. Once the cable reaches the basement, leave the planned slack, support it at the bottom, and leave the cable coiled neatly.
6. Firestop each floor opening around the cable, label it at every floor, and never splice it.

## Worked example: how many supports
The riser serves floors 6 through 1 and the basement, seven levels, and the plan calls for a support at every level. That is 7 supports. The reel at the top has its own brake and is not counted. The weight is shared among the 7 supports and not carried by the lowest one.

## What goes wrong
- A reel without a brake can spin faster than the crew can feed, and the cable falls.
- A cable with no support at the floors hangs from its own jacket and stretches the pairs.
- A cable pulled over a sharp sleeve edge scrapes its jacket.

## Controlling the descent
You do not pull the cable down; you let it down. A brake at the reel holds the speed. Each floor calls the stop if the cable binds or the speed rises. The person at the top releases only as much cable as the lower floors can handle.

> Remember: brake at the reel, a grip or clamp at every floor, a call-stop signal, then firestop and label.`,

u4l7: `## Pulling up: tension is the story
In a top-down pull gravity helps. In a bottom-up pull it works against you, and the longer the shaft, the more cable hangs below the winch. The tension climbs with every floor. A crew that treats it like a horizontal pull will exceed the limit before it reaches the top.

\`\`\`
Part             Job                                        Mistake to avoid
Pull line        reaches from the top to the reel           weak line that breaks
Winch/capstan    pulls at an even speed                     fast, jerky starts
Pulling eye      attaches to the cable's strength member   gripping only the jacket
Swivel           takes out the twist                        leaving it out
Tension monitor  shows the pull in real time                trusting feel instead
Floor supports   hold the cable before the tension is off  releasing at the top first
\`\`\`

## Sequence
1. Run the pull line up the shaft from the top, and tie it to the pulling eye on the cable at the bottom, through a swivel.
2. Brief everyone: radios on, a stop signal, and the manufacturer's tension limit written where the winch operator can see it.
3. Start the winch slowly. Watch the tension meter and the cable at each floor.
4. If the reading nears the limit, stop and find out why.
5. When the end reaches the top, secure it with a grip.
6. Work down: support the cable at each floor with a grip or clamp.
7. Release the tension only after all the supports hold the cable.

## Worked example: reading the meter
In this example the manufacturer's limit for the cable is 600 lbf. The meter reads 250 lbf at the start, climbs steadily to 540 lbf at the fifth floor, and jumps to 620 lbf. The jump over the limit means the pull must stop at once. Possible causes: a snag at a sleeve, a twist, or the cable touching the wall. Fix it before restarting. The lesson is that you do not finish the last floor at the cost of the cable.

## Top down or bottom up
Top down when the reel can go on the top floor. Bottom up when it cannot. Bottom up requires the winch, the swivel, and the meter. In both, support at each floor and firestop at the end.

> Remember: watch the meter against the manufacturer's limit, and support at every floor before you release.`,

u4l8: `## Horizontal backbone: a campus example
A small campus has a main building and an annex 150 ft apart. A fiber backbone runs underground in a duct bank from the annex entrance facility to the main building's equipment room.

\`\`\`
Stage                   What you do
Plan                    read the plan for pull points, the manhole, and the innerduct
Prepare the manhole     test the air, ventilate, get the permit, post a standby person
Innerduct               pull innerduct through the duct and leave a string in each
Pull the cable          feed at one pull point, pull at the next, with a swivel and tension meter
Entrance facility       change outdoor cable to indoor-rated cable, or splice to it
Finish                  cap the ends, label both ends, record the footage
\`\`\`

## The transition rule
Outdoor cable is built for weather: it may be loose tube with gel inside and a jacket not rated for fire. The NEC lets it enter a building only a short distance before it must be replaced, or spliced to, cable with an indoor fire rating. The entrance facility is where that change is made. In practice you stop the outdoor cable at the entrance facility and carry on inside with plenum or riser cable.

## Worked example: staging the pull
Two pull points divide the 150 ft run. The cable reel stays at the first pull point in the manhole, and the cable is fed into the duct while the crew at the second point pulls on the rope. The plan reads like this:

1. Set the reel at the feed point on a stand, clear of the opening.
2. Feed the cable off the reel steadily, with a person guiding it at the mouth of the manhole so it never bends tighter than its radius.
3. Use a swivel and a tension meter at the pulling end.
4. After the cable arrives, leave slack coiled at a large radius in the manhole.

## Between TRs on one floor
This is the same cable family as the riser. Use the tray or conduit shown, and leave the slack for multipair, the backboard length plus floor to ceiling. Label both ends with the same name.

## Confined space rule
A manhole is a confined space. Never enter until it has been tested, ventilated, and permitted, and a standby person is outside.

> Remember: innerduct, a swivel and tension limit, the transition at the entrance facility, and no entry to a manhole without a permit.`,

u4l9: `## Fiber pulling, worked through
The risk in a fiber pull is not the weight but the stretch and the bend. The cable's strength member does the work, and you must give it the job.

\`\`\`
Cable part           What it does
Core and cladding    carry the light, and are glass; never pull on these
Buffer               coats each fiber (900 micron tight buffer or 250 micron loose tube)
Strength member      aramid yarn or a central member that carries the pull
Jacket               protects, but is not the load path
\`\`\`

## Attaching the pull
A pulling grip or eye connects to the strength member. The cable maker supplies a pulling eye on pre-terminated cable. On bare cable the aramid yarn is wrapped and clamped under the grip's collar. A swivel goes between the line and the eye so twist stays out.

## Bend radius worked for a fiber cable
Suppose a cable is 0.5 in across.
- During the pull, the radius must be at least 20 x 0.5 = 10 in.
- Once installed with no load, the radius must be at least 10 x 0.5 = 5 in.

A bend radius is a radius, but sheaves are sold by diameter. The sheave's radius must be at least the 10 in minimum under tension, so you need a sheave at least 20 in in diameter. A sheave 4 in across has a 2 in radius and fails badly, and even a 10 in sheave has only a 5 in radius, which is too small for the pull. At a tray corner, use a sweep, not a sharp angle.

## The figure-eight, step by step
1. Pay the cable off the reel and lay it on the floor in a large figure eight, two loops side by side.
2. Keep the loops flat and clean, with no cable crossing itself in a tight kink.
3. Feed from the pile into the conduit end. As the pile shrinks, flip the loops over to keep the cable from twisting.
4. A coil laid in a single circle twists the cable once per loop. The eight twists in one lobe and untwists in the other.

## Innerduct and protection
Pull fiber inside innerduct in conduit and trays. The duct gives a smooth, clean path and marks the fiber's route. Leave a labeled string in the innerduct. Cap the cable ends and keep them off dirty floors. A pre-terminated cable keeps its connectors under a pulling sleeve until the cable is in place.

> Remember: strength member, never fibers; stay under the manufacturer's limit; 10 x at rest, 20 x pulling; figure eight for long runs.`,

u4l10: `## Slack planned, not guessed
Slack is the last decision of the pull. Use the plan's numbers, and keep the cable dressed so it can be found and trusted.

\`\`\`
Place                        Slack
Work area, 4-pair            305 mm (12 in) minimum after termination; not stored in loops
TR or ER, 4-pair             to the farthest corner of the room by the pathway, plus floor to ceiling
TR or ER, multipair          the length of the backboard plus floor to ceiling
TE                           2 m (6.6 ft) stored outside the enclosure
\`\`\`

## Worked example: a TR slack estimate
A TR is 3 m (10 ft) square with a 2.6 m (8.5 ft) ceiling. A four-pair cable comes in on the ladder rack above the door, and the farthest corner of the room is 3 m along that rack.

The rule is enough to reach the farthest corner by way of the pathway, plus floor to ceiling.

1. The ladder rack runs along the wall from the door to the far corner: 3 m by way of the pathway.
2. Floor to ceiling: 2.6 m.
3. Slack = 3 + 2.6 = 5.6 m, plus any margin the plan adds for a retermination.
The point is to measure the route, not to guess a round number.

## A service loop done right
Lay a loop in the ceiling or on the ladder rack in a coil larger than the cable's minimum bend radius, supported on the rack or in hooks, not hanging on one cable. Tie it loosely. Never stuff a loop into the ceiling with a tight twist.

## Dress into the rack
\`\`\`
Step   Action
1      Bring the cables down the ladder rack to the vertical manager
2      Group them by patch panel, in port order
3      Tie with hook-and-loop ties, snug but loose
4      Land each cable at its port with the label out
5      Leave a short drip loop of slack, not a big coil, behind the panel
\`\`\`

## Leave it clean
Cap the ends, sweep up, restore the tiles, and take your scrap with you. Record each cable's footage against its label on the schedule. The next trade, and the next installer, depends on your record.

> Remember: slack at the work area is at least 305 mm (12 in) after termination and not coiled; the TR slack is measured by the route.`,

u5l1: `## Prepare the cable like a surgeon
Termination quality is set in the first 50 mm (2 in) of the cable. A clean strip, an undamaged pair, and a tight twist make a link that tests well the first time. A hurried strip makes a link that tests marginal or fails.

\`\`\`
Step   Do                                                    Avoid
1      read the label; match it to the schedule              terminating a cable that has the wrong ID
2      inspect the last 300 mm for kinks, nicks, crush       terminating over damage
3      route to the panel or jack in port order              crossing cables and losing the order
4      leave the planned slack                               stripping before you have the slack set
5      score the jacket lightly with the tool                cutting deep and nicking the pairs
6      pull the rip cord to open the jacket                  tearing it by hand
7      cut away the loose jacket, trim the rip cord          leaving the cord loose in the jack
8      fan the pairs; do not untwist more than 13 mm         untwisting the pairs for easy handling
\`\`\`

## A nick, and what it costs
Suppose you cut the jacket too deep and nick one conductor. It may pass the wiremap today. After a year of heat and flexing the copper breaks, and the link goes open. The tester finds it, but the cost of finding and fixing a bad termination in a finished building is many times the cost of cutting off a few inches and starting again.

## Worked example: the untwist limit
You strip 76 mm (3 in) of jacket, fan out the pairs, and untwist them to dress them in a neat row. The limit is 13 mm (0.5 in). The pairs untwisted for 76 mm, which is about six times the limit, so crosstalk will be bad. The fix is to cut off the damaged end, strip only what the jack needs, and keep each pair twisted right up to the point where it enters the termination.

## IDC rule
An insulation displacement connector has blades that cut through the insulation and grip the copper. Never strip the insulation for it. Stripping loosens the grip and invites corrosion.

## Shielded cable
Shielded cable adds a drain wire and a foil or braid to deal with before the pairs. Fold the shield back and keep it intact. Lesson u5l8 explains how to terminate it.

> Remember: label, inspect, route, strip clean, twist to within 13 mm, no insulation stripping for an IDC.`,

u5l2: `## Hardware in the right place
A telecom room is a collection of hardware, and each piece has a job. Putting the wrong piece in the wrong place creates faults that no tester can fix.

\`\`\`
Piece            Where                    What it does
Keystone jack    work area outlet         ends the horizontal cable in a standard 8-position jack
Patch panel      TR rack                  ends the horizontal cable on a row of jacks
110 block        TR wall or rack          ends and cross-connects horizontal and backbone cable
66 block         TR backboard             voice-grade cross-connect only
Fiber panel      TR or ER rack            holds adapters and cassettes for fiber
Cassette         inside a fiber panel     breaks a multifiber trunk out to single ports
\`\`\`

## The category rule, with a worked example
Category 6A cable goes into a Category 6A jack, to a Category 6A patch panel, with Category 6A cords. If one jack in the link is Category 5e, the channel is rated at Category 5e. A new Category 6A tester would find it at once, because the whole link fails at the higher limits. The fix is to replace the jack, not to retest and hope.

## Seating a 110 block, with the blade
The tool carries a replaceable blade with a cutting edge on one side. You place the tool over the wire with the cutting edge facing outward, toward the end of the wire you will not use.

1. Lay the pair on the block's slots in order, keeping the twist to within 13 mm. Across the row the pairs go blue, orange, green, brown, and in every pair the white-striped conductor goes in before the solid one.
2. Position the tool so the cutting side is out.
3. Push firmly until it clicks. The wire is seated in the contact and the end is trimmed.
4. Look for a clean cut with the wire flush with the block.
5. Place the connecting block or the clips over the row.

If the cutting side points inward, the tool seats the wire but cuts the length that should remain, or leaves the end uncut. Neither is acceptable.

## 66 versus 110
A 66 block is an older style for voice. Its clips are not rated for high-speed data. A 110 block is built for data and voice at higher categories. When the job says Category 6, a 66 block is the wrong choice.

> Remember: match every category; 66 blocks are for voice only; the 110 blade cuts on the outside.`,

u5l3: `## Both pin tables side by side
The two schemes put the same eight colors on the eight pins. Only the positions of the orange and green pairs differ.

\`\`\`
Pin   Pair position   T568A          T568B
1     pair 2          white-green    white-orange
2     pair 2          green          orange
3     pair 3          white-orange   white-green
4     pair 1          blue           blue
5     pair 1          white-blue     white-blue
6     pair 3          orange         green
7     pair 4          white-brown    white-brown
8     pair 4          brown          brown
\`\`\`

The pair positions follow the pins: pair 1 at pins 4 and 5, pair 2 at pins 1 and 2, pair 3 at pins 3 and 6, pair 4 at pins 7 and 8. The colors on the pins at 1, 2, 3, and 6 depend on the scheme.

## Worked example: a mixed job
A crew terminates 24 jacks in T568B. A helper punches the last jack in T568A by mistake. The wiremap shows a crossed pair on that link, because the orange and green pairs are swapped at one end only.

1. Check the pin table. At that jack, pins 1 and 2 are white-green and green, but the other end has white-orange and orange.
2. The jack is the odd one out. Reterminate it in T568B.
3. Retest. The wiremap now passes.
The pairs are twisted correctly in both cases, so this fault is not a split pair; it is a pair crossed with its partner at the far end.

## Why one scheme per job
Mixing schemes has no electrical benefit and leads to crossed pairs. The designer sets one scheme; every jack, panel, and cord follows it, and the drawings state it.

## Straight-through and crossover
- Straight-through: the same scheme at both ends. The standard patch cord.
- Crossover: T568A at one end and T568B at the other. Transmit pairs land on receive pairs. Most modern equipment adjusts on its own, so a crossover is rarely needed.

## Tool use on a jack
\`\`\`
Step   Action
1      seat the jacket just inside the jack's back
2      lay each pair to its colored slot, matching the label
3      cap the jack, or punch each conductor in order
4      trim, check for stray copper
5      snap the jack in the panel or faceplate
\`\`\`

> Remember: A and B differ only in the orange and green pairs, and the job uses one scheme.`,

u5l4: `## The full 25-pair table
Pair n is found from the tip color (group 1 to 5) and the ring color (position 1 to 5): n = 5 x (tip group - 1) + ring position. The table below holds every pair.

\`\`\`
Tip group      Ring: blue   orange   green   brown   slate
1  white           1        2        3       4       5
2  red             6        7        8       9       10
3  black           11       12       13      14      15
4  yellow          16       17       18      19      20
5  violet          21       22       23      24      25
\`\`\`

Read it across: white-blue is 1, white-orange 2, white-green 3, white-brown 4, white-slate 5. Then red starts the next row at pair 6.

## Worked examples, forward and back
- Yellow-green: yellow is tip group 4 and green is ring 3. n = 5 x 3 + 3 = 18.
- Red-slate: n = 5 x 1 + 5 = 10.
- Violet-orange: n = 5 x 4 + 2 = 22.

Going back from a pair number, subtract 1, divide by 5. The whole part gives the tip group minus 1, and the remainder gives the ring position minus 1.
- Pair 17: 16 / 5 = 3 remainder 1, so the tip is the fourth color (yellow) and the ring is the second (orange). Yellow-orange.
- Pair 25: 24 / 5 = 4 remainder 4, so violet-slate.

## Binder groups
A cable above 25 pairs groups each 25 pairs under a colored binder. The binder color uses the same code, so the first binder is white-blue (pairs 1 to 25), the second white-orange (pairs 26 to 50), and the sixth is red-blue (pairs 126 to 150). The code runs to 600 pairs, and the violet-slate binder is not used.

\`\`\`
Binder   Color         Pairs
1        white-blue    1 to 25
2        white-orange  26 to 50
3        white-green   51 to 75
4        white-brown   76 to 100
5        white-slate   101 to 125
6        red-blue      126 to 150
\`\`\`

## Terminating a 25-pair group in order
1. Strip the jacket and open the binder group you are working on.
2. Take pair 1, white-blue, and seat it on the first position of the block.
3. Continue in table order, row by row, to pair 25.
4. Seat each wire with the tool, cutting side out, and keep the twist to within 13 mm.
5. Mark the block with the pair range.

> Remember: tips white, red, black, yellow, violet; rings blue, orange, green, brown, slate.`,

u5l5: `## A good connector and a bad one
Look at two finished F connectors on RG-6 and decide which one you would sign off.

\`\`\`
Check                    Good connector                       Bad connector
Center conductor         straight, protrudes the right amount bent, or cut too long, or too short
Braid                    folded back over the jacket          strands bent forward, touching the center
Dielectric               clean cut, undamaged                 crushed or nicked
Compression              body fully seated and even           uneven, not fully compressed
Fit on the jacket        tight, will not twist or pull off    loose, turns by hand
Type                     compression                          twist-on
\`\`\`

## Why the bad one fails
The braid strands that touch the center conductor make a short, so the picture drops out or the signal is lost. A bent or too-long center conductor can damage the jack it plugs into. A loose connector lets moisture in and corrodes the braid. A twist-on connector is the likeliest to show all three faults.

## Worked example: from strip to test
You terminate an RG-6 camera cable with an F compression connector.

1. Cut the cable end square with a sharp cutter.
2. Place the cable in the strip tool, rotate the tool the set number of turns, and remove the waste.
3. Check the center conductor: it must be clean and straight. Trim stray braid strands away from it.
4. Fold the braid back over the jacket.
5. Slide the connector on until the dielectric seats in the body.
6. Compress with the compression tool until it stops.
7. Inspect: center conductor correct, no braid showing in front, connector tight.
8. Test for continuity and for a short between center and shield.

## Cable and connector pairing
RG-6 is the standard for new video and cable television. RG-59 is thinner and has more loss, so it is for short video runs. RG-11 is thick and low loss for long outdoor feeds. All are 75 ohm. Use the F connector for television and a BNC for security video, and match the connector to the cable's size.

## Center conductor note
The F connector has no center pin. It uses the cable's own solid center conductor, so it cannot be used on a cable with a stranded center conductor.

> Remember: compression, not twist-on; braid folded and away from the center; test for a short.`,

u5l6: `## Connectors compared
\`\`\`
Connector   Latch or lock       Size     Typical use
LC          push-pull latch     small    new patch panels, small form factor
SC          push-pull           square   patch panels, older and newer links
ST          bayonet twist       round    older multimode work
MPO         push-pull, keyed    large    many fibers in one ferrule
\`\`\`

## The color convention for end faces
\`\`\`
End face   Body color   Face
UPC        blue         flat or slightly curved, polished
APC        green        angled, polished
\`\`\`
The two types do not mate. An APC face pressed against a UPC face scratches both and loses signal. Always look at the connector color before you plug in.

## Three termination methods, compared at recognition level
\`\`\`
Method                  How it works                                   Loss and speed
Field polish            glue the fiber in, then polish by hand         skilled work, slow
Mechanical splice       prepolished stub joins the fiber in a gel      quick, a little more loss
Fusion-spliced pigtail  a machine fuses a factory pigtail to the fiber lowest loss, common on big jobs
\`\`\`

## Worked example: a panel of 12 ports
You terminate 12 duplex runs, 24 fibers, into a fiber panel with LC adapters. The plan asks for fusion-spliced pigtails.

1. Strip the cable, cut the buffer, and clean the glass.
2. Splice each fiber to a pigtail on the splice tray, one fiber at a time.
3. Seat the splices in the tray in fiber-color order.
4. Plug each pigtail into the back of an adapter.
5. Cap every adapter on the front until patch cords go in.
6. Label the panel with the run number and the fiber pair on each port.

## Polarity in plain words
In a duplex link, light transmitted at one end must arrive at the receive port at the other end. A "polarity" mistake puts transmit onto transmit. Follow the labels and the plan, and test with a light source.

## Safety
Cut ends of glass are sharp and impossible to see. Work over a mat, cut into a sealed container, and clean up before you eat. Never look into a fiber end.

> Remember: blue UPC, green APC, never mated; fusion splice gives the lowest loss.`,

u5l7: `## A cleaning routine, worked
A fiber link tests 3 dB over its loss budget. The cable and splices are good. The first suspect is the connectors, not the cable.

\`\`\`
Step   Do
1      confirm the fiber is dark; never look in with a source on
2      inspect each connector end face with the scope
3      if dirty, dry-clean it; inspect again
4      if still dirty, wet-to-dry clean it; inspect again
5      inspect the adapter's inside and clean it with a stick swab
6      mate, test, and cap what is not in use
\`\`\`

## Three cleaning tools
\`\`\`
Tool                    Used for
Cassette cleaner        dry-cleaning the end face with one pass across a cloth
Stick swab              cleaning inside an adapter or a recessed connector
One-click cleaner       cleaning a connector or adapter with one push
\`\`\`

## Dry versus wet-to-dry
Dry cleaning removes loose dust. A smear of oil or a film does not wipe off dry. For those, a wet-to-dry clean puts a small amount of approved solvent on a wipe, wipes once, and follows at once with a dry pass over the same spot. Using too much solvent leaves residue, which is as bad as dirt.

## Worked example: a re-clean, step by step
You inspect an LC connector. The scope shows a dust particle on the core.
1. Dry-clean once with the one-click cleaner.
2. Inspect again. The particle is gone, but a smear remains.
3. Wet-to-dry clean.
4. Inspect again. The face is clean. Mate it.
If a scratch shows after cleaning, the connector is damaged and must be replaced.

## Safety rules
- Never look into a fiber end or connector with a light source connected.
- Use only an approved scope with a filter for live links.
- Dispose of used wipes in the proper bin.

## Dust caps
Dust caps go on every unused connector and adapter. Cap them when you unplug them, and keep a few spares in your pouch.

> Remember: inspect, clean, inspect, mate; dry first, wet-to-dry only if needed.`,

u5l8: `## A shielded link, end to end
Shielded cable only works if the shield is a continuous, bonded path. One gap and it stops working, often without a visible clue.

\`\`\`
Link part              Shield requirement
Cable                  foil or braid continuous, drain wire intact
Jack at the outlet     shielded body, shield contact on the cable
Patch cord             shielded cord with a shielded plug
Patch panel            shielded panel, bonded to the rack
Rack                   bonded to the secondary bonding busbar
\`\`\`

## Handling the drain wire and foil
\`\`\`
Step   Do
1      strip the jacket back only as far as needed
2      fold the braid back over the jacket, or trim the foil to the jack's contact
3      keep the drain wire; do not cut it off
4      terminate the drain wire to the jack's or panel's shield lug
5      keep the foil in contact with the shield contact
6      terminate the pairs to the color code, keeping the twist
\`\`\`

## Worked example: a broken shield
A 48-port shielded panel shows a continuity fault on six ports. The wiremap passes, but the shield test shows an open shield. You inspect: those six cables had their drain wires cut off by the helper to make the termination neat.

1. Reterminate those six cables with a fresh strip.
2. Fold the foil and the drain wire onto the jack's shield contact.
3. Retest. The shield now reads as continuous.
A shield that is open at one end acts like an antenna: it picks up noise and can radiate it. This is worse than an unshielded cable.

## Bonding at the panel
The rack and the panel bond to the secondary bonding busbar with a rack bonding conductor, 6 AWG minimum, green jacket, two-hole compression lugs, bare metal under the lug with antioxidant. Each rack gets its own conductor. The two-point bonding test recommends 0.1 ohm (100 milliohms) at most.

> Remember: shielded parts everywhere, drain wire terminated, shield continuous, panel and rack bonded; no daisy chains.`
});
