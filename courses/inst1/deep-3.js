// INST1 Academy deep dives, units 6 to 9.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u6l1: `## What the two tests really contain
The permanent link and the channel are two answers to two questions. The permanent link asks whether the cabling the installer put in the wall is good. The channel asks whether the whole path the user's equipment sees is good. The same cable can pass one and fail the other, because cords are part of only one of them.

\`\`\`
Part of the path              Permanent link   Channel
Connector at the panel        yes              yes
Fixed horizontal cable        yes              yes
Jack at the outlet            yes              yes
Equipment cord at the panel   no               yes
Cord at the work area         no               yes
Cross-connect, if present     no               yes
Maximum length                90 m (295 ft)    100 m (328 ft)
Cords, total                  not counted      10 m (33 ft) at most
\`\`\`

## Worked example: why the numbers add up
A run measures 88 m on the permanent link test. At the panel there is a 3 m patch cord, and at the desk a 5 m cord. The channel is 88 + 3 + 5 = 96 m, inside the 100 m limit. Now suppose the run is 92 m. The permanent link fails the 90 m limit even though 92 + 8 = 100 m would just fit the channel. The permanent link limit is the one the installer is held to, so the answer is to reroute or shorten the run, not to argue about cords.

## Which adapter, which test
\`\`\`
Situation                                  Test           Adapters
New cabling, no cords yet                  permanent link permanent link adapters
Contract asks for end-to-end proof         channel        channel adapters with the cords
Existing link, user reports a slow port    channel        the user's actual cords
\`\`\`
Use the permanent link adapters only for the permanent link. A channel adapter or a patch cord used in a permanent link test adds the cord's own connector to the measurement, and the result no longer describes only your work.

## Three kinds of tester in practice
A **certification** tester measures every parameter across the frequency range and holds the limits for each category. A **verification** tester finds wiring faults, such as an open or a crossed pair, and often reports length. A **qualification** tester says whether a link can carry a given speed on a live network. Only the first proves a category. If a foreman gives you a basic cable tester and asks for "Cat 6A test results", the answer is that the tool cannot produce them.

> Remember: permanent link is 90 m without cords; channel is 100 m with cords; only certification proves a category.`,

u6l2: `## A test report, line by line
A saved report lists each parameter, its measured value, the limit, and a margin. Read it from the top: a wiremap fault stops everything else, and the rest tell you how much room the link has.

\`\`\`
Link  B2-014   Cat 6A permanent link   Result: PASS

Parameter         Measured     Limit        Margin   Worst case
Wiremap           pass         -            -        -
Length            71 m         90 m         19 m     pair 3-6
Insertion loss    30.2 dB      36.3 dB      6.1 dB   pair 7-8 at 500 MHz
NEXT              42.1 dB      38.7 dB      3.4 dB   pair 4-5 / 7-8
PSNEXT            40.6 dB      36.7 dB      3.9 dB   pair 3-6
ACR-F             31.0 dB      25.8 dB      5.2 dB   pair 1-2 / 3-6
Return loss       17.6 dB      14.8 dB      2.8 dB   pair 1-2 at 90 MHz
Prop. delay       380 ns       498 ns       118 ns   pair 7-8
Delay skew        12 ns        44 ns        32 ns    pair 1-2
\`\`\`
The values here are illustrative; the point is how to read each line.

## Line by line
- **Wiremap pass.** Every pin goes to the right pin, and the twisting is right. Nothing else counts until this is true.
- **Length 71 m.** Under the 90 m limit with room to spare. If the label on the drawing said 40 m, the difference tells you the cable took a longer route than planned, or the NVP setting was wrong.
- **Insertion loss.** Signal lost along the run. The margin is where it is closest to the limit, usually at the highest frequency.
- **NEXT and PSNEXT.** Crosstalk. A very small margin here is a pass but a warning of a terminated untwist near the limit.
- **ACR-F.** The far-end signal against the far-end noise.
- **Return loss.** A margin of 2.8 dB is the smallest on this page, so this is the parameter to watch if cords are later added.
- **Delay and skew.** The cable's travel time, and the spread between the pairs.

## What to do with a thin margin
The tester passes at any positive margin, but a link with 0.2 dB of margin on return loss is one slightly worse connector away from a fail. If the next link nearby has the same story, look at how the connectors were terminated. A consistent thin margin on NEXT suggests untwist; on return loss, tight bends or ties.

## The marginal asterisk
A result marked pass with an asterisk lies within the tester's accuracy of the limit. The tester cannot say it truly passes. Treat it by the contract, and fix the link if the contract treats it as a failure.

> Remember: wiremap first; every other line shows margin to the limit; the worst case tells you which pair to inspect.`,

u6l3: `## A tester session from start to export
A tester session is a routine. Follow it in order every time and the saved results will match the cabling.

\`\`\`
Order  Step                 Why
1      charge unit and remote  a dead remote ends the session
2      check calibration date  an expired tester is not accepted
3      fit the right adapters  permanent link adapters for a permanent link
4      set the reference       removes the adapters' own loss from the result
5      choose the limit        category and permanent link or channel
6      choose the cable type   sets NVP and the family of limits
7      autotest                runs every parameter
8      save under the label    one record per cable label
9      export                  reporting software, kept with the records
\`\`\`

## Worked example: a wrong limit
You test 12 links against the Category 6 limit, but the job specifies Category 6A. All 12 pass. The foreman then asks why the report says Category 6. The links were never held to the stricter 6A limit, so the passes mean nothing. All 12 must be retested with the right limit. Choosing the limit before the first test avoids a full morning of rework.

## Reference, in plain words
The reference measures the tester's own adapters and cords and subtracts them from every result. If you swap an adapter, drop a cord, or leave the tester off for a long break, set the reference again.

## Fiber loss testing
\`\`\`
Step                          Do
1  clean and inspect          every connector, both sides
2  set the reference          with a launch cord on the light source
3  measure                    at both wavelengths
4  compare to the loss budget the allowed total for the link
\`\`\`
Test multimode at 850 and 1300 nm, and singlemode at 1310 and 1550 nm. Total loss comes from a light source and a power meter. An OTDR shows where along the fiber the loss and reflections sit; know what it is, as the exam does not ask you to run one.

> Remember: reference, limit, cable type, autotest, save under the label, export.`,

u7l1: `## Four fault screens
A wiremap screen draws the eight pins at each end with lines between them. Reading it is a matter of seeing where the lines go. Here are four common screens, with the cause and the fix.

\`\`\`
Screen 1  OPEN
  pin 5 shows no line to the far end
  cause: the conductor on pin 5 was not seated in the slot
  fix:   reterminate that pair at the end the tester names, retest

Screen 2  SHORT
  pins 3 and 6 are joined by a line
  cause: a stray strand, or a nicked jacket against a bracket
  fix:   find the touch point, retrim, reterminate, retest

Screen 3  CROSSED PAIRS
  pins 4,5 and 7,8 go straight; pins 1,2 and 3,6 show crossed at the far end
  cause: T568A on one end and T568B on the other
  fix:   rewire one end to match the other, retest

Screen 4  SPLIT PAIR
  all pins connect to the right pins, but a split-pair flag shows
  cause: one wire from each of two pairs swapped on the same pins
  fix:   reterminate to the color code, retest
\`\`\`

## Worked example
A 24-port panel is punched in T568B and the jacks in the offices were punched by a helper in T568A. Every one of the 24 links shows pairs 2 and 3 crossed. The fix is not 24 separate reterminations of random conductors. Pick one standard for the job (the drawings say which), and rewire all the ends that are wrong. If the job is T568B, the helper's 24 jacks are redone.

If only three of the 24 show the fault, the A/B mismatch is unlikely. Suspect a pair punched wrong on those three.

## Why a split pair is hard to see
The pins connect correctly, so a simple continuity tester passes it. The two wires of a pair are no longer twisted with each other, so the crosstalk is high. A tester that checks twisting flags it. If not, it appears as a NEXT failure.

## Safety
If you find a short or damage inside a box, never work in a box or raceway with energized conductors. Stop, and ask the electrician who controls it.

> Remember: open, short, reversed, crossed, split; reterminate the named end and retest.`,

u7l2: `## From symptom to cause
A transmission failure has a short list of causes. The tester's worst-case pair and the distance reading narrow the list.

\`\`\`
Failure          Where it starts             What to inspect
NEXT, near end   the last inches of cable    untwist, jack category, split pair
NEXT, mid-run    the cable itself            a damaged section, a tight tie
Return loss      near a bend or part         kinks, ties, cords of mixed type
Insertion loss   the whole run               length, hot spaces, bad connectors
Length           the run                     route over 90 m
\`\`\`

## Worked example: using the distance reading
A Category 6A link fails NEXT. The tester shows the worst case 1.5 m from the main unit, and the run is 60 m. The fault is near the end where the tester is, so you reterminate that end first and check the untwist: it should be no more than 13 mm (0.5 in). The 1.5 m reading rules out the middle of the cable, so you do not pull anything. After the reterminate, the link passes with 2 dB of margin.

Now the same link, but the worst case is at 31 m. The problem is in the cable, perhaps under a tight tie or a hanger. You walk the pathway near that distance. If the run is long, the number is an estimate, so check a few meters either side.

## Return loss
A kink or a bend tighter than the minimum radius (4 x OD for 4-pair UTP) changes the impedance there and reflects signal. A cable tie pulled until it dents the jacket does the same. Mixed impedance is a part of one kind on a cable of another, such as a Category 5e jack on a Category 6A cable, which also hurts NEXT.

## Insertion loss and heat
Loss grows with length and with temperature. A long run in a hot ceiling space loses more than the same run in a cool riser. A result near the limit on a hot day may pass cool.

## Length over the limit
The permanent link limit is 90 m. Longer means a new route, a closer telecommunications room, or a design change. It is never fixed by reterminating.

> Remember: distance reading first; near an end means reterminate; mid-run means look at the cable.`,

u7l3: `## The method on one page
Troubleshooting is a loop. Each turn tests one idea.

\`\`\`
Step  Do                                   Example
1     gather symptoms                      "no link on B2-014 since Monday"
2     check cord, port, label              swap the cord; port shows active
3     isolate link from cords              permanent link test with adapters
4     change one variable                  reterminate one end only
5     fix and retest                       same test, same limit
6     document                             cause, fix, date, name
\`\`\`

## Worked example
Monday a user reports that a phone does not link. Gather the symptom: the outlet is B2-014, it worked last week, and a desk was moved over the weekend. Check the simple things: a different cord does not help, but the port is active. The label at the panel reads B2-014, and the label at the outlet reads B2-041, so the move may have put the wrong cord on the wrong jack. You find the outlet's cable runs to B2-041's port, which is disabled. The fix is to re-patch the cord to the right port and fix the label. No tester was needed. If the label had matched, the next step is the permanent link test.

If the test then fails with a split pair at the outlet, you change one variable: reterminate that jack to the color code. You retest with the same limit. If it passes, save the result under the same label, and note the fix in the records.

## What not to do
- Do not change the cord, the jack, and the port at once.
- Do not reterminate before the tester says which end.
- Do not leave the old FAIL file in the record. Replace it with the new one.

## Documentation is part of the fix
A repair that is not recorded is repeated. Record what failed, the cause, the fix, and the new test result. If the repair changed a label or a route, update the drawings and the administration record so all agree.

> Remember: simple things first, isolate, one variable, retest, document.`,

u8l1: `## Before you cut anything
An occupied building adds people, hours, and permits to every task. The survey is what keeps the job from stopping on day two.

\`\`\`
Survey item            Ask or look for
Existing pathways      what is there, how full, who owns it
Asbestos report        which areas are cleared; stop if unsure
Live circuits          which cables and boxes are in service
Permits                hot work, core drilling, ceiling access, after hours
Work hours             set by the owner and the AHJ
Occupant sensitivities hospital infection control, offices with meetings
\`\`\`

## Worked example: a cutover plan
An office moves 40 users from old Category 5e to new Category 6A over a weekend. The plan:

1. New cabling is installed, tested, and labeled by Thursday.
2. The change window is Saturday 6 pm to Sunday 6 pm, agreed with the manager.
3. The back-out plan: the old cables and switch stay connected until Sunday noon. If more than a few users fail after the move, the old patch cords go back in.
4. Old and new ends are labeled differently, so nobody pairs a new jack with an old panel port.
5. After Sunday noon, with the new system accepted, the old cables are tagged or removed under the abandoned cable rules.

## Protecting the occupants
Plastic sheeting and drop cloths under an opened ceiling. A vacuum with a filter at the cutting point. Ceiling tiles lifted straight up, set flat, and put back. In a hospital, the facility may require a barrier, negative air, or a permit before any ceiling is lifted. You follow their rules because the dust can reach patients.

## Identify before you touch
An old cable in a ceiling may carry a live circuit. Identify it by records, by tracing, or by asking, before cutting. Never work in a box or raceway with energized conductors; if you find power in a box, stop and call the electrician.

## Labels in a retrofit
Mark every old and new cable at both ends before the cutover. A label on a disconnected cable saves an evening of tracing later.

> Remember: survey, permits, protect the space, identify live circuits, plan the cutover with a back-out.`,

u8l2: `## Is it abandoned? A decision table
The NEC defines abandoned cable as installed cable that is not terminated at both ends and not identified for future use with a tag. Everything else is either in service or intentionally kept.

\`\`\`
Condition found                                 Abandoned?   Action
Terminated at both ends, in use                 no           leave in place
Terminated at both ends, unused                 no           leave; ask owner before removing
Terminated at one end only, no tag              yes          remove accessible portion
Terminated at neither end, no tag               yes          remove accessible portion
Cut at both ends, tagged for future use         no           leave; keep the tag current
Unknown, source or destination not found        not sure     do not cut; trace and ask
Part of a life-safety or building circuit       no           leave; tell the owner
\`\`\`

## Worked example
Above a corridor you find 14 old cables hanging loose. Twelve have both ends cut. Nine of those have no tag, and three carry a faded paper tag reading "future, 2019, B. Lee". The other two are cut at one end and disappear at the other into a wall box you cannot open.

- The nine untagged cables, not terminated at either end: abandoned. Remove the accessible portions.
- The three tagged cables: identified for future use. They are not abandoned, though a faded tag needs checking. Ask the owner whether they are still wanted, and if so, replace the tag with a clear one.
- The two that vanish into the box: unknown, because you cannot see what is at the box end. Trace them, check the records, and ask. Do not cut.

## Confirm before cutting
Check the drawings and administration records, then use a tone and probe, or a tester, to trace each end. Cut a cable only when it is certain to be out of service.

## Safe removal
Cut near one end and pull from the other, coiling as it comes. If it resists, stop. A snag, a tie, or a firestopped sleeve may be holding it. Never yank on a cable because it may bring down a ceiling or other cables. Firestop any penetration you open, and update the records to show what you removed.

> Remember: not terminated at both ends and not tagged equals abandoned; remove the accessible portions after you confirm it is dead.`,

u9l1: `## Who owns what in a shared pathway
In a modern building, one ceiling carries many systems. What you do depends on whose cable it is.

\`\`\`
System        Cable and rules                       Who usually terminates
Data (SCS)    UTP or fiber to the standard          you, the installer
Paging        low-voltage speaker cable             the audio contractor
Sound masking low-voltage speaker or control cable  the sound contractor
Clocks        as the maker specifies                the clock contractor
Nurse call    listed cable per the design           the nurse-call contractor
BAS           controller cable, often shielded      the controls contractor
Fire alarm    listed fire alarm cable, own pathway  the fire alarm contractor
Elevator      as the elevator contractor specifies  the elevator contractor
\`\`\`
Always confirm with the foreman. The row above is a pattern, not a promise.

## Worked example
Your crew pulls 60 data cables through a corridor ceiling. An existing yellow-jacketed cable in the pathway turns out to be the fire alarm circuit. You do not move it, cut it, or tie your cables to its supports, because life-safety circuits have their own supports and identification. You route your cables on separate supports, with space from the fire alarm cable. When you need to cross it, you cross it, and you do not bundle.

Another cable at the end of the corridor is unlabeled. You do not cut it. You ask the foreman, who traces it to the sound contractor.

## Coordination
Agree the pathway, the order of work, and who firestops each penetration. The data crew pulls and labels; the system contractor terminates and tests its own system.

## Records
Add the other systems' cables to the drawings and administration records, with identifiers at both ends. The next installer will not guess what a cable is.

> Remember: right cable and listing for the system, life safety separate, the contractor terminates, everything labeled.`,

u9l2: `## PoE types
\`\`\`
Type   Power at the source   Typical devices
1      15.4 W                basic phones, simple sensors
2      30 W                  access points, many cameras
3      60 W                  larger cameras, thin clients
4      90 W                  high-power displays and lighting
\`\`\`
The source is the PSE, in a switch or an injector. The powered device (PD) always receives less than the source sends, because the cable itself dissipates some of the power as heat.

## Why bundles heat
Power flowing in the conductors makes heat. In a large bundle, the inside cables lose heat to the cables around them, so the temperature climbs. A warmer cable has more resistance, and loses more power and signal, which can push insertion loss toward the limit and strain the PoE budget.

## Worked example: bundle size
A closet feeds 48 type 4 (90 W) devices. The designer's first plan bundles all 48 cables together in one ceiling tray. The bundle is at the maximum power each cable can carry, all in contact, so the middle cables are the hottest. The installer's options are:

\`\`\`
Option                       Effect
smaller bundles              each cable has more cooling surface
higher-category cable        larger conductors, less resistance, less heat
separation between bundles   air moves between bundles
fewer cables on one support  less contact, less temperature rise
\`\`\`
Choose the combination the design allows. Splitting the 48 cables into several smaller bundles, tied loosely and spaced on the tray, is a practical answer, using a higher-category cable if the designer calls for it. The exact limit is set by the manufacturer and the design, so ask.

## Wireless and DAS
An AP in a ceiling needs an outlet with slack, labeled with its AP number. A DAS carries cellular signals on coaxial or fiber cable, and is usually designed and terminated by its own contractor. Recognize it and coordinate.

## Cameras and access control
Both are common PoE devices. Plan the pathway and the power budget with the designer, and label every outlet so the security contractor and the next tech find each device.

> Remember: 15.4, 30, 60, 90 W at the source; heat builds in big bundles, so smaller bundles, higher category, and separation.`

});
