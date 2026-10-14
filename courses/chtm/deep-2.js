// CHTM Academy deeper explanations, units 4 to 6. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u4l1: `## One work order, read the way an investigator will read it
Four years after a case, a risk manager asks for the service history of one infusion pump. This is the record they get, and every line of it was either captured at the time or lost forever.

\`\`\`
Field                     What this record holds
Work order number         WO-48812
Asset number              IV-10447
Device                    volumetric infusion pump, model and serial
                          recorded in full
Location and owner        unit 5 east, cost center 4210
Priority assigned         2, critical device with no spare on the unit
Requested                 Tue 07:15, by name, by telephone
Reported problem          "will not hold the set rate, alarms after a
                          few minutes" in the caller's own words
Assigned                  Tue 07:40, to a technician trained on the model
On site                   Tue 08:05
Found                     flow sensor out of tolerance; housing intact;
                          no evidence of damage or fluid ingress
Action                    sensor assembly replaced, calibration performed
Parts                     one assembly, part number and cost recorded
Labor                     1.8 hours, plus 0.3 hours travel
Verification              flow accuracy, occlusion alarm, battery run
                          time, and electrical safety all within
                          specification, values recorded
Return to service         Tue 10:20, returned to unit 5 east, user told
                          by name what was wrong and what was done
Problem code              device failure, not use error
Closed                    Tue 10:25
\`\`\`
Every field earns its place. Without the caller's own words you cannot later tell a device fault from a use error. Without the verification values you cannot prove the device met specification when it went back to a patient. Without parts cost and labor hours there is no cost of service ratio and no honest comparison of service options. Without the return-to-service time the clinician's experienced wait is invisible, which is exactly the number they will quote in the meeting.

## Priority, and the two clocks
Two clocks run on every call and they measure different people. Response time measures you: how long until somebody with the right skills was engaged. Total time to repair measures the clinician: from the call to return to service, including waits for parts, vendors, and access to the room. Report the second one, because it is the one the unit feels, and investigate the gap between them, because the gap is where parts supply, vendor performance, and room access live.

\`\`\`
Call                   Response   Total time   What the gap says
Pump, flow fault       25 min     3h 10m       healthy: parts on hand
Ventilator, alarm      10 min     1h 05m       healthy
Analyzer, no start     40 min     9 days       parts lead time, not labor
Scope washer, leak     35 min     6 days       waiting on a vendor visit
Warming cabinet        1 day      11 days      correctly deprioritized
\`\`\`

## The satisfaction survey, scored
Keep the questions fixed and score them on one scale, then read the subscores rather than the average. A program can hold a respectable overall number while failing badly at one thing that happens to be the thing people talk about.
\`\`\`
Question area                            This year   Last year
Ease of contact in working hours             4.4         4.3
Ease of contact after hours                  3.1         3.4
Speed of verbal response                     4.2         4.1
Speed of on-site response                    4.0         3.8
Timely completion                            3.9         3.9
Responsiveness of outside vendors you        2.8         3.0
call on our behalf
Technical competence                         4.6         4.5
Communication and follow-up                  3.2         3.6
Condition of equipment we maintain           4.3         4.2
Overall effectiveness of the program         3.9         4.0
\`\`\`
The overall score barely moved, and two things are getting worse: after-hours contact and follow-up communication. Both are management problems with cheap fixes, and both would have been invisible in the average. Collect department and shift but never names, leave space for free comment, and distribute where people actually are rather than in an email nobody opens.

## Complaints, handled as their own item
A complaint is not a work order and must not be closed by closing one. Log it separately with the complainant, the date, what they said, what you found, what you changed, and the date you went back and told them. Review the log monthly for patterns, because three complaints about the same unit usually mean one unresolved relationship rather than three equipment problems.

## What to memorize
\`\`\`
Lifecycle          request, triage, assignment, repair, verification,
                   closure, notification
Triage basis       clinical impact and urgency, never arrival order
Complete record    asset, times in and out, who, reported problem,
                   findings, action, parts with cost, labor hours, test
                   results, return-to-service decision
Two clocks         response time measures you; total time to repair
                   measures the clinician and is the one to report
Problem codes      use error and cannot duplicate are real work and
                   are not equipment failures. Trend them separately
Survey rule        same questions every year, no names collected,
                   subscores read individually
\`\`\``,

u4l2: `## The asset record, filled in
A surveyor, a recall, a budget, and a lawsuit all ask the same inventory different questions. One well-built record answers all four.

\`\`\`
Field                        Value in this record         Who needs it
Unique identifier            VENT-2207                    everybody
Manufacturer                 recorded in full             a recall
Model                        recorded in full             a recall
Serial number                recorded in full             a recall, by range
Description and              ventilator, intensive care    comparison between
nomenclature                 use                          like items
Location                     unit 3 north, bed bay 7      the technician
Owning department            cost center 4180             finance, allocation
Original cost                price paid, from the         the cost of service
                             purchase order               ratio
Acceptance date              the date the hospital took   the surveyor
                             it on
Risk score and strategy      life support; manufacturer   the plan, the
                             schedule, no alternative     surveyor
Service provider             in-house, named technician   the surveyor
                             competency on file
Scheduled maintenance        procedure, interval, month   the schedule
Warranty                     end date                     whoever pays
Contract                     none                         the budget
Software and firmware        version and date applied     a vulnerability
Patient data present         yes                          disposal, privacy
Network details             segment and address           security, outages
End of support              manufacturer's published      the capital plan
                            date
\`\`\`

## Ownership does not change the duty
\`\`\`
How the device got here   Inventory?   What else you must hold
Hospital purchased        yes          everything above
Leased                    yes          the lease terms, who maintains it,
                                       and the end-of-term data wipe
Rented, short term        yes          arrival and return dates, incoming
                                       check, and the rental agreement
Loaner during a repair    yes          who provided it, condition on
                                       arrival, and the return date
Trial or evaluation       yes          the evaluation agreement, an
                                       incoming inspection, and a removal
                                       date. Most unregistered equipment
                                       in a hospital arrived as a trial
Physician-owned           yes          the agreement permitting its use,
                                       who maintains it, and the evidence
Vendor-serviced,          yes          the contract, and a service report
hospital-owned                         in your system within 24 hours of
                                       each visit
Patient-owned             per policy   what the plan says about it, and the
                                       safety check your policy requires
\`\`\`
The pattern is constant: the device is listed, somebody is named as responsible for maintaining it, and you hold evidence that the maintenance happened. Ownership decides who pays, not who is accountable to the surveyor.

## Granularity, decided once and written down
Inventory everything with a serial number, because that is what a recall names. Then write the exceptions into the plan rather than leaving them to each technician: numerous, inexpensive, low-consequence items may share one group record with a count, which is honest, auditable, and far better than a list of individual records nobody maintains. What you must not do is leave an item out entirely because it seemed small, since the question at survey is not whether the item mattered but whether the hospital knows what it holds.

## The data quality audit, as a schedule
\`\`\`
Activity                  Frequency      What it catches
Formal inventory          annually       devices that moved, left, or
                                         were never recorded
Sampled check on          with every     wrong locations, missing tags,
rounds                    round          devices nobody told you about
New asset audit           monthly        assets created without cost,
                                         risk score, or schedule
Serial and model          quarterly      blank fields that would make a
completeness report                      recall unanswerable
Retired asset audit       quarterly      devices still receiving work
                                         orders after disposal
Contract and warranty     quarterly      expired coverage still assumed,
expiry report                            and paid coverage never used
Cost field audit          annually       assets with no original cost,
                                         which distort every ratio
\`\`\`
Recording the asset numbers you actually found during routine rounds is the single highest-value habit here. It finds more equipment per year than the annual sweep, and it produces something the annual sweep does not: dated evidence that inventory accuracy is managed continuously.

## What to memorize
\`\`\`
Scope rule        every medical device in the building, regardless of
                  ownership and regardless of who maintains it
Recall fields     manufacturer, model, serial number
Costing field     original cost, the price paid
Granularity       anything with a serial number; group the numerous,
                  cheap, low-risk items under one record with a count
Vendor work       logged in your system, with the report inside 24 hours
Audit             annual formal inventory plus sampling on every round
\`\`\``,

u4l3: `## A compliance report, built from the raw numbers
This is one month, worked all the way through to the document that goes to the committee.

\`\`\`
Department        Due   Completed   Deferred   Not found   Rate
Intensive care     88       88          0          0       100.0%
Operating rooms    64       61          2          1        95.3%
Emergency          47       44          1          2        93.6%
Medical units      96       82          6          8        85.4%
Imaging            31       31          0          0       100.0%
Laboratory         42       39          3          0        92.9%
Clinics            44       26          6         12        59.1%
TOTAL             412      371         18         23        90.0%
Life support and   96       96          0          0       100.0%
critical subset
\`\`\`
Completion rate is completed divided by due, times 100: 371 / 412 x 100 = 90.0 percent. Neither deferred nor not-found counts as complete. Report the critical subset separately and first, because 100 percent on life support with 90 percent overall is a managed program, and 95 percent overall with two ventilators missed is not.

## Reading your own report before anyone else does
The clinics line is the story. Twelve devices could not be found in buildings with no permanent technical staff, which is not a maintenance failure at all but an inventory and access failure wearing a maintenance failure's clothes. The medical units line is a second, different problem: fourteen misses across six wards suggests the month was overloaded rather than that anyone underperformed. Two causes, two different corrections, and a single average that would have hidden both.

## The exception list, which is the part that gets read
\`\`\`
Asset      Device              Reason                 Status
EKG-0391   electrocardiograph  in use all three       completed on the 4th
                               visits                 of the following month
IVP-1142   infusion pump       sent to the vendor     completed on return,
                               for a board            documented
SUC-0075   suction regulator   clinic closed on the   completed on the 2nd
                               scheduled day
CEN-0310   centrifuge          not found: unit says   escalated to the
                               it was returned to     department director,
                               the vendor             recorded as presumed
                                                      removed, asset flagged
WRM-0288   warming cabinet     deferred, low risk,    rescheduled, new date
                               technician absence     recorded
\`\`\`
Every line carries a reason and a disposition. A documented miss is a finding you can answer in one sentence; an undocumented one is a finding you cannot answer at all.

## The report as a document
1. **The headline**: overall rate, critical subset rate, and the direction of travel against the last three months.
2. **The table by department**, with due, completed, deferred, not found, and rate.
3. **The exception list**, every miss with a reason and a closing date.
4. **Causes**, named: overloaded month, absence not covered, access, inventory accuracy, parts, vendor delay.
5. **Corrective actions**, each with one owner and one date.
6. **The ask**: what you need from the committee, if anything, and what the hospital carries if you do not get it.

It goes to the environment of care committee, to the clinical directors whose devices were missed, and into the annual evaluation of the equipment management plan.

## Corrective action when the rate falls
\`\`\`
Cause                      Correction                      Proof it worked
Month overloaded           rebalance the master schedule   next three months'
                           by location and type            rates level out
Absence not covered        coverage rule written into      no absence-related
                           the procedure                   misses next quarter
Access to in-use devices   scheduled window agreed with    in-use misses fall
                           the unit, spares rotated
Inventory inaccuracy       sampling on rounds, retired     not-found count
                           asset audit                     falls
Parts or kits late         order the month before, hold    no kit-related
                           minimum stock                   deferrals
Vendor-held devices        turnaround commitment and a     vendor misses
                           loaner written into the         tracked on the
                           contract                        scorecard
\`\`\`

## What to memorize
\`\`\`
Formula            completed / due x 100
Monitoring         daily, not at month end, because at month end the
                   month is already lost
Not complete       deferred, and could not locate
Window             30 days either side of the scheduled date for annual
                   scheduled maintenance
Report contents    rate overall, rate by department, critical subset,
                   every miss with its reason and closing date, causes,
                   corrective actions with owners and dates
Audience           environment of care committee, clinical directors,
                   and the plan's annual evaluation
\`\`\``,

u4l4: `## A monthly dashboard, with the line that makes it useful
A dashboard without a cause column is a scoreboard. Add the cause and the action and it becomes a management document.

\`\`\`
Measure                  Target   This month   Trend   Cause and action
PM completion            95%      90.0%        down    clinics not found;
                                                       inventory audit under way
Life support completion  100%     100.0%       flat    no action
Backlog, open orders     under    118          up      two vacancies; agency
                         100                           cover approved
Backlog, oldest item     30 days  54 days      up      analyzer awaiting parts;
                                                       vendor escalated
Total time to repair     3.0 d    3.8 d        up      parts lead times; two
(critical devices)                                     stock items added
Mean time to repair      2.0 h    1.9 h        flat    labor is not the problem
Repeat repairs, 30 day   under 8  11           up      nine of eleven on one
                         per mo                        pump model; vendor
                                                       advisory requested
Uptime, critical fleet   99.0%    98.6%        down    the analyzer outage
Satisfaction, overall    4.0      3.9          down    follow-up communication
                                                       subscore fell
Overtime hours           under    212          up      vacancy cover; position
                         120                           request submitted
Cost of service ratio    6.0%     6.4%         up      imaging modality
                                                       drill-down in progress
Documentation rate       85%      81%          flat    coaching two technicians
\`\`\`
Read it as one story rather than twelve numbers: two vacancies are producing backlog, overtime, and a slipping completion rate, while a single pump model and a single parts supply problem explain the reliability and repair-time lines. One staffing request and two stocking decisions address most of the page.

## The traps in productivity measurement
\`\`\`
Measure                 How it gets gamed or misread
Work orders closed      split one job into three, or close and reopen.
per technician          Volume is not value
Mean time to repair     improves when you stop recording the hard jobs
                        properly, or when vendors take the difficult work
Labor hours per device  changes meaning the moment somebody inventories
                        modules separately. Never compare between hospitals
Documentation rate      chasing 100 percent produces fiction. Around 85
                        percent of paid hours is the honest ceiling
Completion rate alone   can be met by deferring everything inconvenient,
                        which is why the exception list is reported too
Cost per device         meaningless across devices worth $200 and
                        $2,000,000, which is why the ratio exists
\`\`\`
The general defence is to pair every efficiency measure with a quality measure. Completion rate with the exception list. Repair speed with repeat repairs. Cost reduction with uptime and satisfaction. A measure that cannot be improved at the expense of something else does not exist.

## Competency, as a document you can produce
\`\`\`
Technician   Equipment type     Trained     Assessed   Method         Due
A            ventilators        factory     this year  observed PM    next year
                                school
A            infusion pumps     in house    this year  written plus   next year
                                                       observed
B            anesthesia         factory     overdue    scheduled      now
                                school
B            defibrillators     in house    this year  observed PM    next year
C            sterilizers        vendor      this year  observed PM    next year
C            laboratory         none        n/a        training       request
             analyzers                                 requested      pending
Contractor   imaging            vendor      sampled    their records  annually
                                school                 reviewed
\`\`\`
Competency assessment of the people who service medical equipment is an accreditation requirement and it covers contractors too, which is why the last line exists. Sampling a contractor's training records and competency assessments is both acceptable and expected; taking their word for it is not.

## Proving a cost reduction
Four columns and nothing else: the baseline from your own records, the change and its date, the actual result over the same number of months, and the other things that changed in the period. Claim only the difference, state the labor you consumed at its loaded rate, and say what the department gave up. A saving that ignores in-house labor will be dismantled in public by the first finance analyst who looks at it.

## What to memorize
\`\`\`
Report to leadership   completion, backlog with age, total time to
                       repair, satisfaction, cost. Same set every month
Repeat repair          a repair that returns within 30 days
Documentation rate     about 85 percent of paid hours is realistic
Productivity           most output per input, not most motion
Competency             an accreditation requirement, covering contractors,
                       evidenced by sampling their records
Savings proof          baseline, change and date, actual, and what else
                       changed, with loaded labor included
\`\`\``,

u4l5: `## Three devices, one formula, three different decisions
The ratio is annual service cost divided by original acquisition cost, times 100. Here it is on three real-shaped cases.

\`\`\`
                            Device A         Device B        Device C
                            imaging system   sterilizer      infusion fleet
                                             (one unit)      (120 pumps)
Acquisition cost            $1,000,000       $85,000         $540,000
Contract payments             $180,000             $0              $0
Outside labor and travel            $0         $4,200          $1,100
Parts                               $0         $6,500         $28,400
In-house labor hours                 0            140            1,310
Labor at $72 loaded                 $0        $10,080          $94,320
Allocated overhead              $2,000         $1,200           $6,500
Annual service cost           $182,000        $21,980         $130,320
Cost of service ratio            18.2%          25.9%            24.1%
\`\`\`

**Device A** sits at 18.2 percent against a program running at 6 percent, which is roughly three times the program norm. That is the expected band for manufacturer-maintained equipment, so the number is not evidence of a bad deal; it is the price of a contract on a single complex system with no trained staff and no spare. The questions it earns are specific: what would a tube cost, what would a failed workstation on a Saturday cost at overtime rates, and what would two training seats plus a parts float cost instead.

**Device B** is the interesting one. A quarter of the purchase price every year on a single sterilizer, almost all of it in-house labor and parts, usually means one of three things: the unit is failing and belongs on the replacement list, the maintenance strategy is heavier than the risk justifies, or the hours are being documented against this asset because it is convenient rather than because they were spent on it. Check the work order detail before you conclude anything.

**Device C** is a fleet, and a fleet at 24 percent is a different problem from a single device at 24 percent. Divide it out: $130,320 across 120 pumps is $1,086 per pump per year against $4,500 of acquisition cost. The driver is 1,310 labor hours, which is nearly eleven hours per pump per year. That is a procedure and training question, and probably an accessory question, since disposables and cables usually dominate pump parts spend.

## The drill-down, which is where savings are found
\`\`\`
Level                 Ratio   What it tells you
Whole program          6.0%   healthy overall. Tells you nothing else
By hospital            4.1%   small site, mostly in-house
                       7.8%   main site, carries the imaging contracts
By department          3.4%   medical units
                      11.2%   imaging
                       8.1%   laboratory
By modality           18.2%   the contracted imaging system
                       5.0%   general radiography, in-house
By equipment type     25.9%   sterilizers
                       2.8%   patient monitors
By manufacturer       14.0%   one vendor, three device types, all above
                              the type norm. Look at parts pricing
\`\`\`
Sort by ratio, start at the top, and work down. The aggregate figure exists to be reported; the drill-down exists to find money.

## What the ratio is allowed to decide, and what it is not
\`\`\`
Finding                        Action it supports
High ratio, manufacturer       price a contract alternative: first look,
maintained, parts and          time and materials, or insourcing with
training available             training and a parts float
High ratio, in-house,          put the asset on the replacement list with
old asset, rising yearly       the cost history attached
High ratio, in-house,          review the maintenance strategy and the
new asset                      procedure. You may be over-maintaining
High ratio across one          review that vendor's parts pricing and
manufacturer                   contract terms at renewal
Low ratio on critical          verify the scheduled work is actually
equipment                      being done. Low is not automatically good
Low ratio, aggregate only      you have not looked yet
\`\`\`

## Benchmarking honestly
Dividing by acquisition cost removes the magnitude of the dollars, which is what lets a thermometer and a scanner be ranked on one scale, and it is why the measure travels better than cost per device or devices per technician. It still breaks across organizations, because programs differ in what they count as service cost, whether imaging and laboratory work is included, how they inventory, and how overhead is allocated. Treat a published band as a prompt, define your own inclusions in writing, and compare yourself against your own history. Measures inherited from facilities management, such as square footage or discharges, say nothing useful about an equipment program at all.

## What to memorize
\`\`\`
Formula          annual service cost / acquisition cost x 100
Inputs           price paid, and everything spent in a year: contracts,
                 parts, outside labor, loaded in-house labor, overhead
Typical bands    4 to 25 percent overall; 10 to 25 percent when the
                 manufacturer maintains it; 4 to 6 percent fully in-house
Drill-down       hospital, department, modality, equipment type,
                 manufacturer, individual asset
Trap             omitting in-house labor, which makes in-house look free
Low ratio        on critical equipment, check that the work is being done
\`\`\``,

u4l6: `## A staffing calculation, built from the bottom up
This is the whole arithmetic for one hospital, from the inventory to a position request.

\`\`\`
Equipment group          Units   Sched hrs   Sched    Unsched   Total
                                 per unit    total    hours     hours
Ventilators                 42       3.0       126       310      436
Anesthesia machines         14       6.0        84       180      264
Physiologic monitors       310       0.8       248       420      668
Infusion pumps             620       0.5       310       690    1,000
Defibrillators              58       1.5        87        95      182
Sterilizers                  9       8.0        72       240      312
Laboratory analyzers        36       4.0       144       520      664
Surgical and support       540       0.6       324       480      804
equipment
Imaging (in-house work)     22       6.0       132       260      392
SUBTOTAL                                     1,527     3,195    4,722
\`\`\`
The scheduled hours come from your own procedure times, not from a catalogue. The unscheduled hours come from the last two or three years of recorded repair hours by equipment type, which is the single strongest argument for complete documentation: without it this column is a guess and the request dies.

\`\`\`
Then add the work that is not on a device
Travel between buildings and clinics                        410
Incident investigation, recalls, and advisories             180
Projects, installations, and acceptance testing             520
Committee work, reporting, and inventory audits             260
Training delivered to clinical staff                        140
Training and competency received by your own staff          300
Meetings, huddles, and rounding                             250
TOTAL ANNUAL HOURS REQUIRED                               6,782
\`\`\`
\`\`\`
Convert hours into people
One position, paid hours per year                         2,080
Less leave, holidays, sick, and training                   (280)
Less the undocumented hour everybody loses daily           (240)
Productive hours delivered per position                   1,560
Positions required            6,782 / 1,560                 4.3
Positions currently funded                                  3.0
Gap                                                         1.3
\`\`\`
Dividing by 2,080 instead of 1,560 would have told you 3.3 positions and understated the need by a full person. That error is the most common one in this calculation, and administration will not correct it for you.

## Cross-checks, in the order they are worth anything
\`\`\`
Method                     This hospital       Verdict
Hours built from the       4.3 positions       the primary answer
inventory
Equipment value            $62,000,000 of      reasonable second
                           assets              estimate, because need
                                               tracks acquisition cost
Devices per technician     1,651 items for     inside the historic 1,200
                           3 positions         to 2,000 band, which hides
                                               the overtime completely
Monitored beds,            not used            inherited from facilities
discharges, square                             reporting; tells you nothing
footage                                        about an equipment program
\`\`\`
Note how badly the device-count check performs: it reports a department that looks correctly sized while overtime runs 80 percent above plan and completion sits below target. Use it to sanity-check an answer, never to produce one, and remember it is hostage to how the inventory was counted.

## The request that gets approved
Administration rarely funds a position to do preventive maintenance, because work that prevents problems is invisible to the people who approve headcount. Fund it with cost avoided instead.
\`\`\`
The argument, on one page
A system leaves warranty next quarter
Vendor contract quoted, annual                        $60,000
A technician at entry grade, fully loaded             below the contract
Hours the new system needs                            0.4 FTE
Capacity returned to the maintenance schedule         0.6 FTE
Ask                                                   one position, funded
                                                      by declining the contract
Condition                                             the contract must carry a
                                                      cancellation clause
\`\`\`
The underlying number is the loaded cost of your own labor. A hospital-employed technician earning under $100,000 a year is under $50 an hour across 2,080 hours; add about 25 percent for benefits and about 20 percent for supervision and unproductive time and the loaded cost reaches at most about $72 an hour, below any outside hourly rate and usually below the labor priced inside a contract. Leave deliberate slack in the new position so it absorbs backlog as well as the new system, and say in the request that you have done so.

## Skill mix, coverage, and on-call
\`\`\`
Decision             The rule that keeps you out of trouble
Generalist mix       patient care equipment, cross-trained, two deep on
                     every life-support type
Specialists          imaging, laboratory, sterile processing, networked
                     systems. Each one needs a second seat funded
Second seat          one trained technician is a single point of failure
                     the first time they take leave
Shift coverage       cover the hours clinicians work. Steady evening and
                     weekend volume is a second shift, not overtime
Overtime             sustained overtime for months is a position in
                     disguise. Report the hours and the dollars
On-call              written rotation, defined response time, documented
                     pay, and a rule on who may be called and for what
\`\`\`

## What to memorize
\`\`\`
Build order     scheduled hours per model x quantity, plus historical
                unscheduled hours, plus travel and non-device work,
                weighted by risk
FTE             one full-time position, roughly 2,080 paid hours a year
Divisor         productive hours delivered, not 2,080
Device count    1,200 to 2,000 items per technician, a sanity check only
Winning case    cost avoided against a vendor alternative, with the
                contract's cancellation clause confirmed
Loaded cost     salary, plus about 25 percent benefits, plus about 20
                percent supervision and unproductive time
\`\`\``,

u4l7: `## The test equipment register, as a document
Every resource argument you will ever make goes better with this table attached, because it converts "we need things" into a priced, scheduled list.

\`\`\`
Instrument            Qty  Matched to            Calibration   Status
Electrical safety       4  everything with a     annual        3 current,
analyzer                   mains cord                          1 due next month
Patient simulator       3  monitors, cardiac      annual        current
                           equipment
Infusion device         2  620 pumps              annual        current
analyzer
Ventilator and gas      2  ventilators,           annual        1 out for
flow analyzer              anesthesia machines                  calibration,
                                                                1 in service
Defibrillator           2  58 defibrillators      annual        current
analyzer
Pressure and            2  pressure systems,      annual        current
vacuum gauges              suction
Thermometry             1  sterilizers,           annual        current
standard                   incubators, warmers
Electrical test         6  general                as specified  current
meters
Torque and              1  mechanical assembly    as specified  current
mechanical tools
\`\`\`
Two rules govern this list. Tools used for maintenance need not be the exact instruments the device manufacturer names, but they must produce results equivalent to what the manufacturer's procedure requires, and they must be maintained so their readings can be relied on. And the quantity column has to reflect coverage while an instrument is away, which is why the gas flow analyzer line reads two rather than one.

## The calibration schedule and the retroactive trap
\`\`\`
Control                    What it means
Scheduled before lapse     calibration booked ahead of the due date, with
                           a loaner or a second instrument covering the gap
Traceable                  to the national measurement standards, through
                           the calibration provider
Certificate on file        held, dated, and retrievable in a survey
Due-date visibility        the overdue instrument physically cannot be
                           picked up: tagged, locked, or removed
Out-of-tolerance           a written procedure: quarantine the instrument,
procedure                  identify every record it produced since its last
                           good certificate, assess the clinical risk,
                           re-test what has to be re-tested, and report it
\`\`\`
That last line is the whole reason calibration is a patient safety control rather than paperwork. A reading taken with an out-of-tolerance instrument casts doubt on the record it produced, and four months of unnoticed drift can mean re-testing a fleet and explaining the gap to a surveyor. The cost of prevention is a calendar entry.

## PPE, driven by the hazard assessment
\`\`\`
Where the work happens     What the assessment usually requires
Shop bench                 eye protection, appropriate gloves
Operating rooms and        attire per the area's policy, and the
sterile areas              infection control rules for bringing tools in
Isolation rooms            the precautions posted for that room, and a
                           device cleaning procedure before you take the
                           equipment out
Sterile processing         eye and face protection, heat protection,
                           chemical-appropriate gloves
Imaging and therapy        dosimetry and the radiation safety program's
rooms                      rules, through the radiation safety officer
Electrical and             lockout devices, insulated tools, and the
mechanical work            energy isolation procedure
Laboratory areas           the area's chemical and biological precautions
\`\`\`
Issue it, train on it, record the training, and inspect it. The record is the part that fails an audit, not the glove box.

## Technical information, written as a specification
Nothing obliges a manufacturer to sell you manuals, software, keys, diagnostic access, or training, and once the purchase order is signed your leverage is gone. Put each item in the purchase agreement as a named deliverable rather than inside the terms, because an invoice normally clears when the priced items arrive and the unpriced promises are the ones that quietly vanish. Ask for the same training and materials the manufacturer's own engineers receive, in the same class rather than a special one for customers, delivered inside the warranty period or the warranty extended until it is. In a state that has adopted the health care facilities code, much of this list is a legal requirement, and citing it in the specification does no harm even where it has not. Then arrange with materials management that payment can be withheld until the unpriced deliverables actually arrive.

## Budgeting the resource list
\`\`\`
Line                        Budget home                     Timing
PPE, kits, consumables      operating, supplies             ordered the month
                                                            before the need
Hand tools, small           operating, unless an instrument annual
instruments                 clears the capitalization
                            threshold
Major test equipment        capital, competing with         capital cycle
                            clinical requests
Calibration                 operating, maintenance and      scheduled by
                            repairs or a calibration line   instrument
Manuals, software,          negotiated into the capital     at purchase
licenses, keys              purchase
Training                    operating, travel and           per technician,
                            education                       with justification
\`\`\`
A missing resource never stays a resource problem. It becomes a missed inspection on the compliance report, an unverified device returned to a patient, a safety test of unknown accuracy, or a technician working without the protection the hazard assessment required.

## What to memorize
\`\`\`
Tool rule           need not be the manufacturer's named tool, but must
                    give equivalent results and be maintained
Calibration         scheduled, traceable to the national measurement
                    standards, certificates retained
Out of tolerance    every record made since the last good certificate is
                    in doubt and may require re-testing
Technical info      manuals, software, passwords, diagnostic access,
                    updates, and training, negotiated at purchase and
                    backed by withholding payment
Coverage            a second instrument or a loaner, so overdue
                    equipment is never used
\`\`\``,

u4l8: `## The backup and restore register
This is the document that turns a vague intention into something you can be audited against, and the only column that really matters is the last one.

\`\`\`
System                 Backup       Held where      Restore tested   Result
Work order system      nightly      off the host,   quarterly        last test
                                    separate site                    passed, 41
                                                                     minutes
Imaging archive        per the      vendor-hosted   annually, with   passed
front end              contract     plus local      the vendor
Monitoring central     weekly       departmental    semi-annually    failed once:
station configuration               server                          user list
                                                                     not included,
                                                                     corrected
Anesthesia machine     after each   configuration   annually         passed
configurations         change       repository
Analyzer middleware    nightly      laboratory      annually         not yet
                                    server                           tested: action
                                                                     open, owner
                                                                     and date set
Calibration records    nightly      with the work   quarterly        passed
                                    order system
\`\`\`
Each row needs four decisions made in advance: how often, where the copy lives relative to the machine it protects, how long a restore is allowed to take, and how much data the hospital can afford to lose. Then put a date in the calendar, restore one for real, and write down what happened. The monitoring row above is why this matters: the backup ran successfully for months and did not contain the unit's user list, which nobody could have known without trying.

## Access control, which is where the findings are
\`\`\`
Account type            Rule                        Review
Technician              named individual account,   quarterly
                        rights for the job
Supervisor              elevated rights, named,     quarterly
                        separate from the daily
                        account where possible
Shared or generic       not permitted. It destroys  any found are closed
                        the audit trail             immediately
Device default          changed at installation,    at installation and
credentials             recorded securely           on any rebuild
Vendor remote access    named account, approval     per session, and at
                        before each session,        contract end
                        logged, revoked at the
                        end of the contract
Departing employee      closed on the day they      part of the exit
                        leave, every system         checklist
Clinical user on a      role-based, provisioned     with the unit, annually
device workstation      through the unit
\`\`\`
Run the review as a signed list rather than a glance. Two findings recur in every department that has not done this: accounts belonging to people who left, and a vendor account still live years after the contract ended.

## A change record, filled in
\`\`\`
Field                  Value
Change number          CHG-2214
What is changing       monitoring software, point release
Assets affected        38 bedside monitors, 2 central stations, listed
                       by asset number
Why                    manufacturer-validated fix for an alarm display
                       fault
Risk assessment        joint with information technology and the
                       manufacturer; alarm behavior and the record
                       interface both touched
Approved by            change board, with the unit manager informed
Window                 Sunday 02:00 to 05:00, lowest census
Back-out plan          previous version image held, tested, restorable
                       inside the window
Test after             alarm behavior on two monitors per unit, a known
                       value traced into the patient record, time stamp
                       and units verified
Result                 passed; one monitor required a second attempt,
                       recorded
Recorded against       version and date written to all 40 asset records
\`\`\`
The pattern behind nearly every self-inflicted clinical outage is a reasonable change made quietly: afterward nobody could say what had changed, so nobody could put it back. The back-out plan and the version record are the two lines that prevent that.

## Patching policy, in four sentences you can defend
Patch on the manufacturer's validated schedule, because a device is cleared in a configuration and an unvalidated change can take it outside that configuration. Write the manufacturer's obligation into the contract: that they will supply patches, and state when. Where the manufacturer says a patch is not supported, apply compensating controls and record the decision with the security officer's agreement rather than leaving a gap unremarked. And record every patch and software update against the asset with its version and date, because that record is how you answer the next vulnerability bulletin in an afternoon instead of a fortnight.

## What to memorize
\`\`\`
Backup rule        not a backup until a restore has been tested and
                   the result documented
Copy location      somewhere other than the machine it protects
Also back up       device configurations: unit setups, alarm limits,
                   user lists
Accounts           named, role-based, default credentials changed,
                   vendor access approved per session and revoked
Patching           the manufacturer's validated schedule, their
                   obligation in the contract, compensating controls
                   where a patch is impossible
Change control     written request, joint assessment, approval,
                   window, back-out plan, test, and a version record
\`\`\``,

u4l9: `## One equipment type, decided and documented
This is the file behind a single decision, which is the form the surveyor's question takes.

\`\`\`
Equipment type            electric hospital beds, 410 units
Current basis             manufacturer: semi-annual inspection
Proposed basis            annual inspection, with a brake and side rail
                          check at every unscheduled visit
Eligible for the program  yes. Not imaging or radiologic, not a laser,
                          no other law or condition of participation
                          pins it to the manufacturer, and five years of
                          our own maintenance history exists
\`\`\`
\`\`\`
Risk factor                      Evidence held
Function and consequence of      patient positioning and transfer. A
failure                          failure can cause a fall or an entrapment
                                 hazard rather than a therapy interruption
Seriousness of likely harm       potentially serious, which is why this is
                                 a reduction in frequency and not a
                                 removal from the program
How widespread harm would be     one patient per event, not fleet-wide
Manufacturer's recommendation     semi-annual inspection; rationale not
                                 supplied on request
Maintenance requirements         simple, procedures available in the
                                 hospital, differences from the
                                 manufacturer's procedure stated explicitly
Validation of the alternative    inspection findings recorded at both
                                 frequencies for one year on a sample of
                                 60 beds before the change
Availability of backup devices   spare beds available on every floor the
                                 same day
Incident history of identical    five years: 118 unscheduled calls, 104
or very similar equipment        were casters, controls, and cords found
                                 between inspections rather than at one;
                                 no fall or entrapment attributable to a
                                 missed inspection
Qualified decision maker         biomedical engineering supervisor,
                                 qualification record on file
\`\`\`
Several factors are weighed together, not scored in isolation, because severity and likelihood combine differently for different equipment and the same model can carry different risk in a different unit.

## Is it even eligible? The order to ask in
1. Does another federal or state law require the manufacturer's schedule, or set something stricter? If yes, stop.
2. Does another condition of participation pin it, such as the life safety provisions, which include following the manufacturer's guidance for alcohol-based hand-rub dispensers? If yes, stop.
3. Is it imaging or radiologic equipment, diagnostic or therapeutic? If yes, stop.
4. Is it a medical laser device? If yes, stop.
5. Is it new, without enough maintenance history from your records, your contractor's records, or publicly available nationally recognized sources? If yes, keep it on the manufacturer's schedule until history exists, then evaluate the track record, assess the risk, and test the alternative regimen before moving it.
6. Only now: is the risk-based assessment by qualified personnel documented, and is it critical equipment, which the surveyor will sample first?

## What the documentation must contain, per equipment type
\`\`\`
Item                        Detail required
Risks                       the types and level of risk to patient or
                            staff health and safety
Alternative activities      what you do, the maintenance strategy and
                            rationale behind it, and the differences from
                            the manufacturer's activities made explicit,
                            unless the manufacturer's recommendations
                            cannot be obtained
Alternative frequencies     the interval and the reasoning. Very low risk
                            equipment may carry a range such as every 12
                            to 24 months, or be covered by periodic
                            departmental sweeps that sample function and
                            poll the operators
Dates performed             when the work was done and any further action
                            required or taken
Failures                    equipment failures, excluding operator error,
                            and whether anyone was harmed
Identical items             type documentation may be generic, but the
                            record of work performed is specific to each
                            individual device
\`\`\`

## The maintenance strategies you choose between
\`\`\`
Strategy                  What it is                      Battery example
Preventive, time based    performed at fixed intervals,   replace every year
                          or by metered use, regardless   regardless, or after
                          of condition. Aimed at          a set number of
                          reliability rather than cost    hours
Predictive, condition     condition monitored to catch    replace a year later
based                     the onset of degradation and    than recommended,
                          schedule just before            based on monitoring
                          performance is lost             showing capacity
                                                          holds
Reactive                  run to failure. Acceptable      replace after the
                          only for low cost, low risk     device fails, when a
                          items where failure has         spare is on the shelf
                          little consequence              and nothing is at risk
Reliability centered      condition plus function,        replace more often in
                          consequence of failure, and     an ambulance than at
                          the operating environment,      a nurse station, same
                          optimizing reliability and      model, harsher duty
                          cost together
\`\`\`

## The annual effectiveness review
The program is written into the equipment management plan and reviewed every year on four questions, which are the same four a surveyor will ask. How is performance degradation detected where staff would not notice it, such as a slow miscalibration? How are malfunctions investigated, including whether they could have been prevented and whether the alternative strategy caused them? How is equipment removed from service once it is unsafe or no longer suitable? And how has performance data changed the program? Bring the answers with numbers: units in the program by type, inspection findings at the new interval against the old, unscheduled calls per unit per year before and after, failures and their causes, and anything moved back onto the manufacturer's schedule as a result.

## What to memorize
\`\`\`
What it permits      adjusting activities and frequencies away from the
                     manufacturer, on a documented risk assessment by
                     qualified personnel
What it demands      strict adherence to the activities and frequencies
                     you set, and ready identification in the inventory
Never included       imaging and radiologic, diagnostic or therapeutic;
                     medical laser devices; anything another law or
                     condition of participation pins; new equipment
                     without sufficient history
Qualified            a clinical or biomedical technician or engineer for
                     medical equipment, a facilities professional for
                     facility equipment, with qualification records held
                     and contractors' qualifications assured
Surveyor focus       critical equipment inside the program and the
                     evidence behind putting it there
More often is fine   you may exceed the manufacturer's frequency, but
                     must still perform their activities
\`\`\``,

u5l1: `## The plan, as a table of contents
A reader should be able to find any answer in this document in under a minute. This is the shape that does it.

\`\`\`
Section                            What it contains
1  Purpose and authority           why the plan exists, who approved it,
                                   and the date it took effect
2  Scope                           which equipment and which locations,
                                   including clinics and off-site care
3  Objectives                      what the program is trying to achieve,
                                   stated so performance can be measured
4  Responsibilities                4.1 the department
                                   4.2 clinical staff and operators
                                   4.3 contractors and manufacturers
                                   4.4 information technology
                                   4.5 facilities
                                   4.6 the committee that owns the plan
5  Inventory                       5.1 inclusion criteria
                                   5.2 grouping rules for numerous,
                                       low-risk items
                                   5.3 leased, rented, loaned, trial, and
                                       patient-owned equipment
                                   5.4 identification of critical
                                       equipment
                                   5.5 the data fields held
                                   5.6 accuracy audits
6  Risk and maintenance            6.1 the risk scoring method
   strategies                      6.2 the strategies available
                                   6.3 how each equipment type is
                                       assigned to one
                                   6.4 the alternative program, its
                                       exclusions, evidence, and review
7  Inspection and                  7.1 incoming inspection before first
   maintenance                         use and after major repair
                                   7.2 intervals and procedures
                                   7.3 who may perform the work, and the
                                       competency required
                                   7.4 the flexibility window used
                                   7.5 what happens when a device cannot
                                       be found
8  Incident response               securing the device, investigating,
                                   reporting, and releasing it
9  Recalls and advisories          who receives notices, how assets are
                                   matched, documented, and closed
10 Emergency procedures            clinical downtime, utility failure,
                                   and obtaining a replacement device
11 Training                        operators, technical staff, competency
                                   assessment, and records
12 Performance monitoring          the metrics, the audience, the
                                   frequency
13 Annual evaluation               the review of scope, objectives,
                                   performance, and effectiveness
14 Compliance statement            federal, state, local, and
                                   accreditation requirements the plan
                                   is written against
15 References                      the organization's other policies,
                                   named rather than repeated
16 Revision history                version, date, author, approver, and
                                   what changed
\`\`\`
Two sections carry more weight than their length suggests. Section 4 is what a surveyor reads when they want to know who is accountable, and vagueness there is a finding in itself. Section 6.4 is where the evidence behind your maintenance intervals lives, and it is the section most likely to be out of date, because practice changes faster than documents do.

## The annual evaluation, as a report
\`\`\`
Question                   Evidence you bring
Was the scope still        new locations, service lines, or equipment
right                      types added or removed during the year
Were the objectives met    each objective, the target, the actual, and
                           one sentence on why
What do the numbers say    completion by month and by department,
                           incidents, recalls, repeat repairs, total
                           time to repair, satisfaction, cost
Was the program            the alternative program's effectiveness
effective                  review, findings from survey or internal
                           audit, and whether last year's corrective
                           actions held
What changes next year     objectives for the coming year, with the
                           resources they need
\`\`\`
It is a short written report presented to and approved by the environment of care committee, and the approval is recorded in the minutes. The minutes are the evidence that leadership accepted the plan, which is what you will be asked for.

## How the plan sits inside the wider program
The equipment plan is one of the plans in the organization's environment of care program, alongside safety, security, hazardous materials and waste, fire safety, and utilities. That has practical consequences. Devices powered from the emergency branch appear in both the equipment plan and the utilities plan, so the two must agree. A sterilizer sits in the equipment plan and in infection control's program. Construction touches the equipment plan, the fire safety plan through the temporary measures used while life safety features are impaired, and infection control through the construction risk assessment. Write the cross-references rather than duplicating text, and review the neighbouring plans when yours changes.

## What to memorize
\`\`\`
Nature             organization-wide, not a departmental procedure
Specificity test   a reader can see how each equipment type is
                   maintained and how that is demonstrated
Must cover         scope and objectives, inventory criteria, risk and
                   maintenance strategies, inspection and preventive
                   maintenance, incident response, recalls, emergency
                   procedures, training, performance monitoring,
                   annual evaluation
Style              references the organization's other policies rather
                   than repeating them
Control            version, effective date, owner, review date,
                   revision history
Approval           the environment of care committee, recorded in the
                   minutes
\`\`\``,

u5l2: `## One procedure, written out
Procedures are judged by whether a competent newcomer could follow them and an auditor could tell from the records whether they were followed. Here is the one every department needs and few have.

\`\`\`
Number and title    HTM-03-06, Equipment due for scheduled maintenance
                    that cannot be located
Purpose             to ensure that a device which cannot be found is
                    searched for, escalated, and accounted for, rather
                    than recorded as missed
Scope               all assets on the scheduled maintenance list
Responsibility      technician: steps 1 to 3
                    supervisor: steps 4 to 6
                    manager: step 7
Procedure           1. search the recorded location and the unit's
                       storage areas, and ask the unit's charge nurse
                    2. record the attempt in the work order with the
                       date, time, and who was asked
                    3. check the sister units, central equipment
                       storage, the loaner pool, and any device out
                       with a vendor
                    4. notify the unit manager in writing, naming the
                       asset and the device
                    5. set a second attempt for a named date within
                       the flexibility window
                    6. if still not found, escalate to the department
                       director in writing
                    7. after 60 days, flag the asset in the inventory
                       as presumed removed, record the evidence, and
                       report it in the monthly compliance report
Records             the work order attempts, the written notifications,
                    and the inventory flag
References          the medical equipment management plan, inventory
                    section; HTM-02-01 Inventory accuracy
Approval            manager, effective date, version 3, review annually
\`\`\`
Notice what the procedure does not say. It does not name individuals, because people change and documents should not have to. It does not describe the search in loving detail, because the steps that matter are the ones that produce a record. And it ends with an accounting decision rather than trailing off, which is what turns a missing device from a recurring line on the report into a closed item.

## The document control register
\`\`\`
Number      Title                      Ver  Effective   Review   Owner
HTM-01-01   Inventory inclusion         4   this year   annual   manager
HTM-02-01   Inventory accuracy          2   this year   annual   supervisor
HTM-02-02   Incoming inspection         3   last year   annual   supervisor
HTM-03-01   Procedure assignment        5   this year   annual   manager
HTM-03-02   Risk-based strategy         6   this year   annual   manager
HTM-03-06   Device cannot be located    3   this year   annual   supervisor
HTM-04-01   Test equipment and          2   last year   annual   supervisor
            calibration
HTM-05-01   Unscheduled maintenance     3   last year   annual   supervisor
HTM-06-01   Equipment under contract    2   this year   annual   manager
HTM-08-01   Vendor management and       4   this year   annual   manager
            check-in
HTM-10-01   Work order documentation    5   this year   annual   supervisor
HTM-11-01   On-call and after hours     3   last year   annual   manager
HTM-16-01   Escalation                  2   last year   annual   manager
HTM-18-01   Information security and    3   this year   annual   manager
            patient privacy
HTM-21-01   Telemetry and spectrum      1   this year   annual   manager
\`\`\`
The register is the document a surveyor asks for when they want to know whether your library is managed. It takes an hour a year to maintain and it answers four questions at once: what exists, which version governs, who owns it, and whether the review is current.

## Training against procedures
\`\`\`
Procedure changed        What has to follow
A step changed           affected staff retrained, training recorded
                         with the version and the date
A new procedure          everyone in scope trained before it takes
                         effect
Annual review, no        the review itself recorded. No retraining
change                   needed, but the date must exist
A new employee           orientation against the full library, signed
                         off, with the dates held
A contractor             the documentation standard and the check-in
                         procedure issued and acknowledged in writing
\`\`\`
The training record is the half most departments skip, and it is the half that proves the document became a practice. Without it, a procedure is a statement of intent that a surveyor is entitled to disbelieve.

## The environment of care manual
The manual is the organization's binder of plans: the equipment plan beside safety, security, hazardous materials, fire safety, and utilities. Your chapters within it are the equipment plan itself and the parts of the other plans that depend on devices, such as which equipment runs on the emergency branch, which devices are involved in utility failure response, and how equipment is handled during construction. Know where the manual lives, know which version is current, and know which of its pages you are accountable for, because the surveyor will reach your content through that binder rather than through your departmental library.

## What to memorize
\`\`\`
Procedure parts     title and number, purpose, scope, responsibility by
                    role, numbered steps, records, references,
                    approval and dates
Document control    one source, version and effective date, named
                    owner, review cycle, change record, retirement of
                    superseded versions
Training            dated record of who was trained on which version
Relationship        procedures support the plan and reference the
                    organization's policies rather than contradicting
                    them
Survey chain        plan says what, procedure says how, record says it
                    happened. Break a link and the chain fails
\`\`\``,

u5l3: `## The reporting calendar
Publish this once a year and the question "when is that due" never costs anyone an afternoon again.

\`\`\`
Body                     Meets        Due from you          Data closes
Daily huddle             daily        priorities, blockers  that morning
Shop meeting             monthly      the numbers, goals,   the 3rd
                                      policy changes
Environment of care      monthly      completion rates,     the 5th
committee                             incidents, recalls,
                                      utility and
                                      construction impacts
Patient safety           monthly      device events, near   the 5th
                                      misses, use error
                                      trends, actions
Performance              quarterly    metrics against       the 5th of the
improvement                           targets, projects,    quarter month
                                      corrective actions
Risk management          as needed    investigations,       within the
                         plus         device holds,         deadline of
                         quarterly    reportable events     the event
Radiation safety         quarterly    imaging and therapy   the 5th of the
                                      equipment records,    quarter month
                                      survey results,
                                      device inventory
Infection control        quarterly    cleaning and          the 5th of the
                                      disinfection, water   quarter month
                                      systems, sterilizers,
                                      reprocessing
                                      equipment, loaners
Capital or technology    per cycle    evaluations, ranked   per the cycle
committee                             requests, feasibility
Senior leadership        monthly      one page: the number, the 5th
                                      the trend, the cause,
                                      the decision needed
Annual plan              annually     the plan evaluation   per the plan
evaluation                            and next year's goals
\`\`\`

## A committee report, one page
\`\`\`
To                 Environment of care committee
Month              reporting month and year
1 The number       scheduled maintenance completion 90.0 percent
                   against a 95 percent target. Life support and
                   critical equipment 100 percent
2 The trend        third consecutive month below target, down from
                   96.4 percent two months ago
3 The cause        two causes. Twelve devices in the outlying clinics
                   could not be located, which is an inventory and
                   access problem. Fourteen misses across the medical
                   units followed an unfilled absence
4 The action       clinic inventory audit under way, owner and date
                   named. Coverage rule added to the scheduled
                   maintenance procedure, effective this month.
                   Master schedule rebalanced for the medical units
5 The ask          the committee's support for a standing quarterly
                   access window in the clinics, agreed with the
                   clinic managers
Attached           the exception list: every miss, its reason, and its
                   closing date
\`\`\`
Five parts, in that order, every month. The order matters because a committee reads the first two lines and then decides whether to read the rest, and because putting the cause before the action stops the report becoming a list of activity with no diagnosis.

## Writing objectives that can be scored
\`\`\`
Weak                              Scoreable
"improve PM compliance"           completion at or above 95 percent
                                  every month, life support at 100
                                  percent, reported monthly
"be more responsive"              total time to repair on critical
                                  equipment reduced from 3.8 days to
                                  3.0 days by the end of the fiscal
                                  year
"reduce costs"                    program cost of service ratio held at
                                  or below 6.0 percent, with the
                                  imaging and sterilizer drill-downs
                                  acted on by the third quarter
"better customer service"         survey overall effectiveness from 3.9
                                  to 4.2 on the same questions, and the
                                  follow-up communication subscore from
                                  3.2 to 3.8
"fewer use errors"                use error work orders in the two
                                  highest departments reduced by a
                                  quarter, with in-service training
                                  delivered on all three shifts
\`\`\`
Set them from this year's actual performance, give each one an owner, and share them with the staff whose work produces them, because an objective people helped write is an objective they defend when it is inconvenient.

## What each committee can give you
This is the half managers forget. A committee is not only an audience; it can authorize things you cannot. Patient safety can mandate a clinical practice change that no amount of equipment work would achieve. Risk management can fund a control out of its own exposure budget. Performance improvement can give a project standing and a facilitator. The environment of care committee can approve the plan and put an access window on the record. Radiation safety can direct imaging to release equipment for service. Infection control can settle a dispute about who cleans a device before you touch it. Arrive with a request, not just a report.

## What to memorize
\`\`\`
Objective           a goal with a number, a date, and an owner
Report structure    the number, the trend, the cause, the action, the
                    ask. One page
Environment of      equipment plan performance, incidents, recalls,
care                annual evaluation. It approves the plan
Patient safety      device events, near misses, use error trends
Risk management     investigations, device holds, reportable events
Performance         metrics against targets, projects, corrective
improvement         action results
Radiation safety    imaging and therapy equipment records and the
                    radiation-producing device inventory
Infection control   cleaning and disinfection, water, sterilizers,
                    reprocessing equipment
Minutes             the decision is only real once it is minuted
\`\`\``,

u5l4: `## Four layers, all of them live at once
Managers get into trouble by thinking of compliance as one requirement. It is a stack, and a stricter layer always wins.

\`\`\`
Layer                      What it is                  Consequence of failure
Federal conditions of      the requirements a          participation in the
participation              hospital must meet to be    payment programs, which
                           paid for most of its        is existential rather
                           patients                     than a fine
Accrediting                standards from the body     loss of accreditation
organization standards     surveying on the agency's   and of deemed status,
                           behalf, at least as         which puts you back in
                           demanding as the federal    front of the state
                           requirements                survey agency
State requirements         licensure, the state        licensure, and state
                           health department, and      enforcement independent
                           adopted building, fire,     of accreditation
                           and electrical codes
Service-specific bodies    blood banks, laboratories,  loss of the specific
                           imaging accreditation,      service's accreditation
                           and others, each with       or its ability to bill
                           their own equipment rules
\`\`\`
A laboratory checklist that sets an instrument frequency governs that instrument no matter what your risk scoring would have chosen. Blood bank equipment requirements are often stricter than the manufacturer's own. And a state rule can be stricter than the federal one, which is why the plan's compliance statement names federal, state, and local requirements rather than just one.

## Deemed status, in plain terms
The federal agency approves accrediting organizations to survey hospitals on its behalf. A hospital accredited by one of them is deemed to meet the conditions of participation, so the accreditor's survey substitutes for the routine federal one. The agency keeps the right to validate that work and to investigate complaints directly, and the state survey agency performs surveys for hospitals that are not accredited and investigates complaints anywhere. Nothing about deemed status removes the underlying federal requirement; it changes who checks it.

\`\`\`
Body                            Scope relevant to equipment
The Joint Commission (TJC)      the most common hospital accreditor, with
                                standards reaching the equipment plan,
                                maintenance intervals and documentation,
                                and competency assessment
DNV                             hospital accreditation organized around
                                an integrated quality management system
The Healthcare Facilities       a hospital accreditation program that has
Accreditation Program (HFAP)    held deeming authority
AABB                            blood banks and transfusion services
CAP                             clinical laboratories, against detailed
                                discipline checklists
CLIA                            the federal program through which the
                                agency regulates laboratory testing
State survey agency             non-accredited hospitals, validation
                                surveys, and complaint investigations
\`\`\`

## The equipment requirements underneath all of it
\`\`\`
Requirement                          What you must be able to show
Facilities, supplies, and            a maintained program, with records
equipment maintained to an
acceptable level of safety and
quality
Inspection and testing before        the incoming inspection record, and
first use and after major            the post-repair verification record
repairs or upgrades
Qualified personnel overseeing       qualification records for your staff,
and performing the work              and how you assure contractors use
                                     qualified people
A complete inventory regardless      the inventory, with critical
of ownership, with a record of       equipment identifiable and the
maintenance activities               alternative program identifiable
Manufacturer documentation held      the recommendations themselves, plus
where you follow the                 your matching maintenance records
manufacturer
\`\`\`
Low cost, low risk items may be listed as a single line with a count rather than individually, which is the formal permission behind the grouping rule in your inventory section.

## The alternative program, as the agency states it
A hospital may adjust its maintenance, inspection, and testing frequency and activities away from the manufacturer's recommendations based on a risk-based assessment by qualified personnel, unless another federal or state law or a condition of participation requires adherence to the manufacturer's recommendations or sets specific requirements, the equipment is a medical laser device, or the equipment is new without a sufficient amount of maintenance history. Imaging and radiologic equipment, whether used for diagnostic or therapeutic purposes, is named as equipment that must be maintained per the manufacturer's recommendations. A hospital electing to adjust must develop, implement, and maintain a documented program based on generally accepted standards of practice, and must adhere strictly to the activities and frequencies it establishes. Doing more maintenance than the manufacturer recommends is permitted, provided the manufacturer's activities are still performed. Surveyors are directed to focus on critical equipment within the program and on the documentation of the factors and evidence behind the strategy for that equipment.

## What to memorize
\`\`\`
Why it matters      payment for most patients depends on meeting the
                    federal conditions of participation
Deemed status       approved accrediting organizations survey on the
                    agency's behalf; accreditation is deemed to meet
                    the conditions
Who else surveys    the state survey agency, for non-accredited
                    hospitals, validation, and complaints
Stricter wins       a state rule, a laboratory checklist, or a blood
                    bank standard overrides your own risk scoring
Equipment basics    maintained program, inspection before first use and
                    after major repair, qualified personnel with
                    records, complete inventory regardless of ownership
Excluded from the   imaging and radiologic, medical lasers, anything
alternative         another law or condition pins, and new equipment
program             without sufficient history
\`\`\``,

u5l5: `## Four regulators, four questions, four records
Each of these bodies asks a different question and is satisfied by a different document. Knowing which record answers which question is most of the job.

\`\`\`
Regulator            The question                  The record that answers it
Device agency        did you report the event,      the written reporting
                     and can you show how you       procedure, the event file,
                     decided                        and the submission with
                                                     its acknowledgment
Device agency        which of your devices were     the recall log matched to
                     affected by this notice,       assets by model and serial
                     and what did you do            range, with per-unit
                                                     action and closure dates
Spectrum agency      is the hospital's telemetry    the registration, the
                     use registered and             frequency and transmitter
                     coordinated                    register, and the
                                                     interference log
Radioactive          who is authorized to work      the radiation safety
materials regulator  on this, and is the service    program's authorization
                     recorded                       list and the service
                                                     records it requires
Privacy and          which devices hold patient     the inventory field, the
security rules       data, and what happened to     media destruction or wipe
                     the ones that left the         certificate, and the
                     building                       disposal record
\`\`\`

## The device agency, in a manager's terms
Device classification sorts devices by the degree of control needed to give reasonable assurance of safety and effectiveness, which is why two devices that look similar can face very different requirements, and why a question about classification is really a question about what evidence the manufacturer had to produce. Medical device reporting puts a mandatory duty on the hospital as a device user facility: written procedures that identify, evaluate, and transmit reportable events on time; an event file per event holding the information you evaluated, your deliberations about whether it was reportable, copies of what you submitted, and the agency's acknowledgments; and the file available to an authorized agency employee at any reasonable time. Recalls, corrections, and removals arrive with a hazard classification that sets your urgency and ends in a documented action for every affected unit. And anyone who remanufactures or refurbishes devices for resale works under the agency's quality system requirements, which is a fair question to ask a third-party refurbisher before you buy a rebuilt device from one.

## Spectrum, as a register you keep
\`\`\`
Item                        What to hold
Registration                the hospital's registration of its
                            telemetry use, and who maintains it
Frequency and transmitter    every transmitter, its frequency, its
register                     location, and the system it belongs to
New wireless systems         treated as a coordination request before
                             an installation, vendors included
Interference log             every complaint, what was found, what was
                             changed, and the clinical impact
Clinical escalation          an interference event affecting monitored
                             patients is reported as a patient safety
                             event, not only as a technical fault
\`\`\`
The point of protected telemetry spectrum is that monitored waveforms are not competing with everything else in the building. The failure mode is quiet: dropped waveforms on patients whose monitoring is the only thing standing between a deterioration and a response.

## Radioactive materials
Licensing and inspection of radioactive material use, including nuclear medicine, sits with the federal commission, and in much of the country that authority is exercised by the state under an agreement with it, so your inspector may be a state official applying equivalent rules. The license belongs to the hospital and is administered by the radiation safety officer and the radiation safety committee. Your boundary is narrow and absolute: no work on equipment handling sources without the radiation safety officer's clearance; service on sealed sources and therapy devices restricted to people the program authorizes; service records provided where the program requires them; and your imaging and therapy equipment records brought to the radiation safety committee on its calendar.

## Patient information, and the moment it leaves
\`\`\`
Route out of the building     What has to happen first
Repair at a vendor depot      wipe or remove the media, or hold a signed
                              business associate agreement covering the
                              vendor's handling of the data
Trade-in                      media wiped or destroyed, with a record
Lease or rental return        wiped before collection. The lessor will
                              not raise this, and often only you know
                              the data is there
Donation                      wiped, with the method documented
Scrap or recycling            media destroyed, with a certificate
Loaner going back             wiped, including any patient list or
                              clinician-entered settings
\`\`\`
The privacy rule protects identifiable health information and the security rule reaches every device that creates, receives, maintains, or transmits it electronically. Practically, that gives a manager five standing duties: record which devices hold patient data as an inventory field, wipe or destroy media before any device leaves, keep service vendors who will encounter the data under a business associate agreement, apply the same account discipline to device workstations as to any other system, and route any suspected exposure to the privacy officer immediately, because breach response runs on its own clock and belongs to somebody else.

## What to memorize
\`\`\`
Device agency        classification, reporting with written procedures
                     and event files, recalls, and the quality system
                     that applies to refurbishers
Spectrum agency      licenses and manages the radio spectrum, including
                     the protected telemetry service. Register, record
                     transmitters, coordinate, log interference
Radioactive          licensing and inspection by the commission or by a
materials            state under agreement with it, administered through
                     the radiation safety officer and committee
Privacy and          a privacy rule and a security rule; the security
security             rule covers electronic patient data on devices
Standing duty        patient data recorded as an inventory field, media
                     wiped or destroyed before any device leaves
\`\`\``,

u5l6: `## The survey evidence checklist
Keep this as a live document with a location and an owner against every line. When somebody arrives unannounced, the work is retrieval rather than assembly.

\`\`\`
#   Evidence                       Current means                Where it lives
1   Equipment inventory            complete, all ownership      the work order
                                   types, critical equipment    system, exported
                                   and alternative program      monthly
                                   both identifiable
2   The management plan            current version with the     document library
                                   committee's approval
3   Annual plan evaluation         this year's, minuted         committee minutes
4   Completion rates               this month and the prior     the compliance
                                   eleven, by department        report file
5   Exception list                 every miss, its reason,      with each monthly
                                   its closing date             report
6   Life support and critical      complete, no gaps            the work order
    equipment records                                           system
7   Incoming inspection            before first use, and        the asset records
    records                        after major repair
8   Incident files                 each investigation, its      risk management,
                                   findings, and the actions    with your copy
9   Reportable event files         the procedure, the file      the regulatory
                                   per event, submissions       file
                                   and acknowledgments
10  Recall and advisory log        every notice, applicable     the recall log
                                   or not, with per-unit
                                   action and closure
11  Staff competency records       trained, assessed, method,   personnel and
                                   date, due date              training files
12  Contractor competency          sampled training and         vendor files
    evidence                       competency records
13  Test equipment                 certificates on file,        calibration file
    calibration                    nothing overdue
14  Alternative program            risk assessment and          the program file
    evidence                       qualifications per
                                   equipment type
15  Alternative program            this year's, with numbers    committee minutes
    effectiveness review
16  Procedures and the             current versions, review     document library
    document register              dates, training records
17  Utility and construction       interruption records and     project files
    involvement                    equipment verification
18  Corrective action plans        prior findings, closed       the survey file
                                   with evidence, and the
                                   sustainment measures
\`\`\`
Assign one owner per line and audit the list quarterly by asking each owner to produce their item inside ten minutes. The audit is the preparation; the binder is just where it ends up.

## A tracer, step by step
\`\`\`
Step   What the surveyor does            What fails here
1      reads the tag on a device in a    the tag is missing, or the
       patient room                       number is not in the inventory
2      asks the nurse what she does      she does not know, or names a
       when it fails                      process that is not yours
3      looks the asset up                location wrong, risk score
                                          blank, no schedule assigned
4      reads the maintenance history     a gap, or an interval that does
                                          not match the plan
5      asks why that interval            no documented risk assessment,
                                          or the device is in the
                                          alternative program illegally
6      asks who did the last job and     no competency record, or the
       whether they were competent        contractor's records were
                                          never sampled
7      asks for the plan section that    the plan is out of date and
       covers this equipment type         describes something else
8      asks what happened the last       no incident file, or the device
       time one of these failed           was returned without
                                          verification
\`\`\`
Run your own tracers monthly with a supervisor on a device picked at random. Every weakness above is cheap to fix in advance and expensive to meet in person.

## A corrective action plan, filled in
\`\`\`
Finding              four devices in the alternative maintenance
                     program are diagnostic imaging equipment, which
                     is not eligible for inclusion
Scope                a full inventory review found seven, not four:
                     the four cited plus three in an outlying clinic
Root cause           the inventory's equipment type field did not
                     distinguish imaging equipment, and the strategy
                     assignment procedure had no eligibility check
Corrective action    all seven returned to the manufacturer's
                     schedule, overdue work performed, records
                     completed
Preventive action    eligibility check added to the strategy
                     assignment procedure; the inventory field
                     corrected across all imaging assets; a system
                     rule now blocks the assignment
Owner and date       supervisor for the device work, by a named date;
                     manager for the procedure and the system rule,
                     by a named date
Evidence of          completed work orders for all seven, the revised
completion           procedure with its version, a screen record of
                     the system rule, and a report showing no imaging
                     asset in the program
Sustainment          the exception report run monthly and presented
                     to the environment of care committee for six
                     months
\`\`\`
Note that the scope exceeded what was cited, which is almost always true, and that the root cause is a process rather than a person. A plan whose root cause is "technician error" will be rejected, and should be.

## Hosting, in three rules and a brief
Answer the question that was asked. Show the record and let the record speak. If you do not know, say you will find out, then find out. Brief your staff on the same three rules before any survey window, make sure every technician can describe their own competency record and say where the procedures live, and assign one person whose only job that day is fetching documents so the conversation never stalls while somebody hunts for a file.

## What to memorize
\`\`\`
Timing           unannounced, so evidence is kept current year-round
Tracer           one real device, followed from the bedside into the
                 inventory, schedule, history, competency records,
                 and the plan
Hosting          answer what was asked, show the record, never
                 speculate or volunteer unfixed problems
Plan contents    finding, scope, root cause, corrective action,
                 preventive action, owner, date, evidence of
                 completion, sustainment measure
Root cause       a process, not a person
Reporting        corrective action status to the environment of care
                 committee until every item is verified and holding
\`\`\``,

u6l1: `## A capital request, scored
Publish the factors and the weights before anything is scored, then score every request the same way. This is one request taken all the way through.

\`\`\`
Request           replace 3 operating room anesthesia machines
Requested by      anesthesia, supported by perioperative services
Quoted            $186,000 each, $558,000 total
\`\`\`
\`\`\`
Factor                      Weight  Score  Weighted  Why that score
Clinical need                  5      4       20     current units cannot
                                                      run the agents the
                                                      service now uses
Regulatory or safety           5      3       15     no standard forces it,
driver                                                but two units fail the
                                                      alarm requirements of
                                                      the current edition
Support status of what          4      5       20     manufacturer support
is replaced                                           ends in 14 months, in
                                                      writing
Condition and reliability       4      4       16     19 unscheduled calls
                                                      across 3 units last year
Cost of service                 3      4       12     ratio 14.1 percent
                                                      against a 6 percent
                                                      program norm
Downtime impact                 3      5       15     a failure cancels the
                                                      list for that room
Standardization fit             2      5       10     matches the 4 machines
                                                      already owned
Staffing and training           2      2        4     one school seat needed,
impact                                                 training negotiable
TOTAL WEIGHTED                                 112
\`\`\`
The total is meaningless on its own. It becomes useful the moment a second request is scored against the same sheet, and it becomes defensible the moment the weights were published first.

## The ranked list the committee actually decides from
\`\`\`
Rank  Request                        Cost      Score  Decision
1     Anesthesia machines (3)        $558,000   112   funded
2     Sterilizer, main processing    $240,000   108   funded
3     Imaging console replacement    $410,000    98   funded
4     Physiologic monitors, unit 4   $295,000    84   deferred
5     Ultrasound, vascular lab       $148,000    71   deferred
6     Laboratory centrifuges (6)      $54,000    58   declined
TOTAL REQUESTED                    $1,705,000
AVAILABLE                          $1,208,000
\`\`\`
Then say in one paragraph what the hospital carries by deferring items 4 and 5: the monitors stay on a model whose support ends in two years, with rising repair cost and a known parts lead time, and the ultrasound stays at its current image quality with an agreed re-review date. Carry both into next year's plan with their scores, their dates, and their files intact.

## The total cost of ownership behind the quote
\`\`\`
Line                                       Per machine   Three machines
Purchase                                      $186,000        $558,000
Delivery and installation                       $3,400         $10,200
Site preparation: gas outlet relocation         $2,800          $8,400
Acceptance testing and incoming inspection      included        included
Service training, one seat, hospital-wide            n/a         $9,500
Test equipment: gas and flow analyzer                n/a        $14,000
Service, years 1 to 2                           warranty        warranty
Service, years 3 to 10, in-house parts           $4,100/yr      $98,400
and labor
Consumables and accessories, 10 years          $9,000         $27,000
Disposal and data handling                        $400          $1,200
TEN-YEAR TOTAL COST OF OWNERSHIP                              $726,700
\`\`\`
The quoted price is 77 percent of the real number. That gap is what your review exists to find, and it is the single most common reason a funded project runs over: the site work, the training, the test equipment, and the consumables were never in the request.

## The evaluation record
\`\`\`
Document                   Why it is in the file
The request                what was asked for, by whom, and when
Clinical statement         the using department's own words on the
                           problem and the consequence of not funding
Options compared           do nothing, repair, refurbish, share,
                           outsource service, alternative models
Cost model                 the total cost of ownership above, with its
                           assumptions written down
Service strategy           the chosen strategy and what it needs
Feasibility                space, power, gases, network, site work
Security review            the manufacturer's security disclosure, the
                           operating system support horizon, patching
Standardization            what the hospital already owns
Score sheet                factors, weights, scores, the date, and who
                           scored it
Recommendation             one recommendation, with the alternatives
                           compared against it
Decision                   funded, deferred, or declined, with the body
                           and the date
\`\`\`
That file answers the three questions nobody asks until years later: why this device, why this vendor, and why not the other request.

## What to memorize
\`\`\`
Your contribution     total cost of ownership, service strategy,
                      feasibility, standardization, cybersecurity,
                      regulatory impact, staffing and training impact
Ranking               the same factors and published weights for every
                      request, scored from evidence
Costs requesters      installation, site preparation, old equipment
miss                  removal, training, test equipment, consumables,
                      renovation, disposal
Vendor-named          send it back for a functional requirement, unless
request               a single product genuinely meets a clinical need
Output                one recommendation to the capital or technology
                      committee, and a dated evaluation record
Feedback              tell declined requesters why, and what would
                      change the answer
\`\`\``,

u6l2: `## A site survey, filled in
Do this in the room, with the utility owners present, before the purchase order. This is the document it produces.

\`\`\`
Device                  large chemistry analyzer
Intended room           core laboratory, bay 3
\`\`\`
\`\`\`
Requirement        Device needs         Room has        Gap and owner
Footprint          2.6 m x 1.1 m        3.0 m x 1.4 m   none
Service clearance  0.9 m rear,          0.4 m rear      bench must move
                   0.6 m sides                          240 mm: facilities
Weight             980 kg loaded        slab, verified  none
Ceiling height     2.3 m                2.7 m           none
Delivery path      0.96 m crate width   0.91 m final    door frame removal:
                                        doorway         facilities
Elevator           1,200 kg, 1.1 m      1,500 kg,       none
                   depth                1.3 m
Power              two dedicated        one shared      new circuit on the
                   20 A circuits,       circuit         emergency branch:
                   emergency branch                     facilities electrical
Conditioned power  uninterruptible      none            unit sized and
                   supply for the                       ordered: you
                   controller
Heat load          2.4 kW               cooling at      supplementary cooling:
                                        capacity        facilities mechanical
Water              deionized, stated    none in bay 3   supply and treatment:
                   quality                              facilities plumbing
Drain              gravity drain        none in bay 3   drain run: facilities
                                                        plumbing
Compressed air     none                 n/a             none
Network            two wired drops      one drop        second drop and
                                                        addresses: information
                                                        technology
Interface          result feed to the   existing        interface build and
                   laboratory system    feed to be      test: informatics
                                        extended
Security review    vendor remote        not yet         assessment and remote
                   access required      assessed        access rules: security
                                                        officer
Infection control  construction in a    n/a             construction risk
                   clinical area                        assessment: infection
                                                        control
Workflow           operator standing    confirmed       none
                   position and
                   specimen flow
\`\`\`
Eleven gaps, every one with a named owner, every one knowable before the order. The alternative is a delivery truck and a conversation you cannot win.

## Long-lead items set the real schedule
\`\`\`
Item                         Lead time    On the critical path
Device manufacture and       10 weeks     yes
delivery
Electrical circuit on the    6 weeks      yes, and it needs a shutdown
emergency branch                           window
Water treatment and drain    8 weeks      yes
Supplementary cooling        12 weeks     yes, this is the longest item
Network drop and addresses   3 weeks      no, slack available
Interface build and test     5 weeks      yes, and it needs the device
Door frame removal and       2 weeks      no
reinstatement
Operator training            scheduled    no, but it gates go-live
                             to go-live
\`\`\`
The cooling unit, not the analyzer, decides the earliest possible go-live. That is the normal situation and it is why the survey happens before the order rather than after.

## The sign-off sheet
\`\`\`
Requirement                           Signed by                 Date
Space, structure, and weight          facilities, and the        held
                                      laboratory director
Construction and finishes             facilities project        held
                                      manager
Infection control during the work     infection control         held
                                      practitioner
Power, circuits, and branch           facilities electrical     held
Water, treatment, and drainage        facilities plumbing       held
Cooling and ventilation               facilities mechanical     held
Network, addresses, and bandwidth     information technology    held
Security assessment and remote        security officer          held
access
Interface and data definitions        informatics               held
Clinical workflow and operator        laboratory director       held
positions
Serviceability, parts, training,      you                       held
and test equipment
\`\`\`
An unsigned line is an assumption, and assumptions are what arrive on a Thursday. Attach the sheet to the project file and keep it; it is also the document that settles who pays when something was missed.

## What a missed requirement costs
\`\`\`
Missed                        Typical consequence
A dedicated circuit           several times the planned cost once walls
                              are closed, plus a shutdown window nobody
                              has, plus idle device time
A drain                       the device cannot be commissioned at all
Cooling capacity              intermittent faults that look like device
                              faults for months
A network drop                a device running standalone, with results
                              transcribed by hand and a data integrity
                              risk nobody signed up for
Service clearance             every future repair takes twice as long,
                              forever
The security review           a go-live blocked at the last moment by
                              the one person who was never asked
\`\`\`

## What to memorize
\`\`\`
Timing            the site survey happens in the room, with the
                  utility owners, before the purchase order
Domains           space and clearances, floor loading, delivery path,
                  site preparation and shielding, cooling and
                  ventilation, power and branch and conditioning,
                  water and gases and drainage, network and security,
                  workflow
Sign-off          one named owner per requirement, collected on one
                  sheet in the project file
Schedule          long-lead items set the real date, not the device
                  delivery
Cheapest hour     the one spent in the room before the order
\`\`\``,

u6l3: `## The sustainability questionnaire, answered
Send the same questions to every shortlisted vendor in writing and keep the replies. The differences decide the service strategy, and the answers are unobtainable after the order.

\`\`\`
Question                      Vendor A        Vendor B        Vendor C
Parts sold to equipment       yes, published   yes, on        no, service
owners                        price list       request         only
Parts availability            10 years from    7 years         n/a
commitment                    last shipment
Service training to the       yes, same        customer-only   none
hospital                      class as their   class
                              own engineers
Training cost per seat        quoted           quoted higher   n/a
Service manuals               full set         full set        operator
                                                               manual only
Software, keys, diagnostic    included,        time-limited    not offered
access                        named in the     license
                              agreement
Expected service life         10 years         8 years         10 years
End of support policy         published, 7     case by case    no statement
                              years after
                              last shipment
Operating system support       6 years, in      stated          not stated
horizon                       writing          verbally
Public device report          reviewed: no     reviewed: a     reviewed: two
history for the model         pattern found    cluster of      clusters, one
                                               alarm reports   with a recall
Recall history                none in 5        one correction  two, one Class
                              years                            II
Installed base within         11 sites         3 sites         1 site
100 miles
\`\`\`
Vendor C may still have the best clinical device and the lowest purchase price. What the table tells you is that choosing it means a contract for life, at a price you will never again be able to negotiate, on a model with a worse report history and almost no local presence. That is a decision the committee is entitled to make with its eyes open, and your job is to put it in front of them before the order rather than after.

## Priced over the life, which is the only fair comparison
\`\`\`
Year      Vendor A, in-house        Vendor C, contract only
          training  parts  labor    annual contract
1         $11,000       $0     $0   warranty
2              $0   $3,200 $2,600   warranty
3              $0   $3,400 $2,600   $42,000
4              $0   $3,900 $2,900   $42,000
5              $0   $4,300 $2,900   $44,000
6              $0   $5,100 $3,200   $44,000
7              $0   $5,600 $3,200   $46,000
TOTAL      $11,000  $25,500 $17,400  $218,000
Seven-year service cost       $53,900              $218,000
Difference                                        $164,100
\`\`\`
Price every option over the same period, hold the assumptions identical across options, and show a best case and a worst case for each rather than a single number, so the committee can see the hospital's maximum exposure as well as its expected cost. If one option has preventive work done at night, price it that way in every option.

## Reading the public report database properly
\`\`\`
Do                                   Do not
search the model and the             count records and conclude. A
manufacturer, and read the           widely used model naturally shows
narratives                           more reports than a rare one
look for repeated failure modes      treat a single dramatic report as a
and repeated device problems         verdict on the model
pair it with the recall and          assume an absence of reports means
advisory history for the model       an absence of problems. A new model
                                     has no history yet
ask other managers who already       rely on the sales reference list,
own one, and ask what broke          which is selected for you
search it again during an            wait for an investigation to finish
investigation, to see whether the    before checking whether anyone else
failure has happened elsewhere       has seen this
\`\`\`

## Writing the strategy into the contract
\`\`\`
Clause                       What it must say
Parts                        discount, availability period, and lead
                             time commitment
Training                     number of seats, which class, when
                             delivered, and the warranty extended if
                             training slips past it
Manuals and software         full set, updates for the life of the
                             device, passwords and diagnostic access
Response                     phone response and on-site arrival stated
                             separately, each with a remedy when missed
Exclusions                   listed by name. Batteries, accessories,
                             probes, glassware, major assemblies,
                             after-hours work, software, travel
Cancellation                 notice period and penalty, in writing
End of support               what the hospital receives: final parts
                             buy, documentation, migration terms
Payment                      withheld until the unpriced deliverables
                             arrive
\`\`\`
Then copy the commitments into the asset record, so the manager who inherits the device in six years can find out what the hospital was promised.

## What to memorize
\`\`\`
Sustainability       parts availability and pricing, service training,
questions            manuals and software and diagnostic access,
                     expected life and end of support, operating
                     system support horizon, public report and recall
                     history, vendor stability and local presence
Timing               all of it before the order. After the sale there
                     is no leverage on parts, training, or manuals
Point of sale        the most expensive service option and the hardest
contract             to leave. Decline and decide later
Costing rule         same period, same assumptions, best and worst
                     case, for every option
Report database      read patterns and narratives, not record counts
\`\`\``,

u6l4: `## The standardization case, with the data attached
Four pump models across six units. This is the page that wins the argument, and none of it is opinion.

\`\`\`
Model   Units   Use error   Repeat    Training   Parts held   Cost of
                work        repairs   hours/yr   (part        service
                orders/yr   /yr                  numbers)     ratio
A         310        14        3          16          22        2.6%
B          96        41        9          14          19        5.9%
C          68        33        7          12          24        7.1%
D         146        22        4          15          21        4.4%
TOTAL     620       110       23          57          86
\`\`\`
Models B and C are 26 percent of the fleet and 67 percent of the use error work orders. They also carry the two highest cost of service ratios and 43 of the 86 part numbers on the shelf. The safety argument and the cost argument point the same way, which is unusual and worth saying out loud.

\`\`\`
Consolidating onto model A
Devices to replace                                  164 units
Capital required, phased over two years             $738,000
Transition: two fleets in service                   9 months
Operator retraining                                 1,100 staff
Annual saving, parts and labor                      $46,000
Annual saving, training hours                       26 hours
Use error work orders expected to fall              by about 60 a year
Part numbers retired from the shelf                 43
Risk accepted                                       single supplier for
                                                    the whole pump fleet
\`\`\`
Name the transition cost and the risk accepted. A case that pretends standardization is free loses credibility at the first question, and the committee's trust is worth more than the project.

## Where to take it, and what to ask each body for
\`\`\`
Body                     What you bring            What you ask for
Patient safety           the use error data and    endorsement of the
                         the clinical risk         safety case
Nursing leadership       the floating-staff        agreement on the
                         argument and the          target model and the
                         retraining load           retraining plan
Capital or technology    the phased capital plan   funding across two
committee                and the saving            budget years
Environment of care      the plan sections that    noting, and the
                         change                    revised plan approved
Purchasing               the volume and the        a negotiated
                         contract leverage         agreement on devices
                                                   and consumables
\`\`\`

## The limits, written as a policy
\`\`\`
Limit                      How the policy handles it
Genuine specialty need     a published exception route: who requests,
                           what clinical evidence is required, who
                           decides, and a review date on every
                           exception granted
Vendor lock-in             a second qualified source for consumables
                           where possible, and the contract term kept
                           short enough to retain leverage
Concentrated recall or     accept it knowingly, and keep a contingency:
supply risk                a residual fleet of a second model on a
                           named number of units
Obsolescence              do not standardize onto a model late in its
                           life. Confirm the support horizon first
Quiet non-compliance      purchasing enforces the list, so an
                           unapproved device cannot be bought without
                           the exception on file
\`\`\`
A standard with no exception route produces workarounds rather than consistency, and the workarounds arrive without an incoming inspection.

## Accessories and consumables, the faster win
Standardizing below the device is cheaper, quicker, and often worth more. Cables, probes, cuffs, circuits, sets, batteries, and sensors drive a large share of parts spend, a large share of downtime, and most of the user frustration a department absorbs. Borrow the pharmacy's idea: a published list of approved device types and accessories the hospital buys, maintained by a committee, with a defined route for adding an item and a defined review for removing one. You maintain the technical content, purchasing enforces the list, and the clinical departments own the exceptions. That division of labor is the only one that survives contact with a sales representative who has gone around you to a clinical director.

## What to memorize
\`\`\`
Benefits        fewer use errors, one training program, one parts
                float, one procedure, contract leverage, spares that
                fit anywhere
Strongest       patient safety: one interface and one alarm behavior,
argument        especially for floating and agency staff
Evidence        models by unit, use error work orders, repeat
                repairs, training hours, part numbers held, cost of
                service ratio by model
Honest costs    replacing working devices, retraining operators, and
                two fleets during the transition
Limits          specialty need, vendor lock-in, concentrated recall
                and supply risk, obsolescence
Policy          written into the equipment plan and the purchasing
                policy, with a published exception route
\`\`\``,

u6l5: `## The lifecycle handoff checklist
A device passes through six or seven hands between a quotation and clinical use. Every handoff is where something gets dropped, so each one has an owner and a record.

\`\`\`
Stage          You deliver                       Evidence held
Acquisition    cost history, failure data,        the evaluation record
               support-withdrawal notices,
               total cost of ownership,
               serviceability assessment
Contracting    negotiated parts discount,         the signed agreement,
               training seats, manuals and        with deliverables named
               software, response commitments,
               named exclusions, cancellation
Pre-delivery   site requirements confirmed and    the signed site survey
               signed, delivery window agreed,
               receiving briefed
Installation   vendor work scheduled against      the installation record
               the clinical calendar, utilities
               present, access arranged
Acceptance     incoming inspection, performance   the acceptance test
               and safety test, configuration     record, signed before
               confirmed, software version        payment
               recorded
Inventory      asset record created with cost     the asset record
               and owner, risk scored, schedule
               assigned, tag applied
Training       operator training before clinical  training and competency
               use, service training delivered,   records
               materials filed
Sustainment    schedule live, parts stocked,      the work order history
               service strategy in force,
               recalls and patching routed
End of life    data wiped, asset retired, book    the disposal record
               value settled, method documented
\`\`\`

## The acceptance test record
\`\`\`
Check                                   Result
Model and configuration match the        confirmed against the purchase
order                                    order, line by line
Accessories and spares listed on the     two of six listed accessories
order are present                        missing: payment held
Unpriced deliverables received           manuals received; service
                                         software key outstanding:
                                         payment held
Performance against specification        all parameters within
                                         specification, values recorded
Electrical safety                        within limits, values recorded
Software and firmware version            recorded against the asset
Network and interface                    a known value traced into the
                                         record system, correct patient,
                                         correct units and time stamp
Site requirements met                    confirmed against the signed
                                         survey
Device labelled and tagged               asset number applied
Accepted for clinical use                not yet: accepted once the two
                                         accessories and the software
                                         key arrive
\`\`\`
This is the last moment the hospital holds the money, and the two held lines are exactly the items that disappear forever once an invoice clears. A device put into clinical use before this record exists is both a safety exposure and a lost negotiation.

## The vendor scorecard
\`\`\`
Measure                          Vendor A    Vendor B    Source
Phone response commitment met      96%         71%       work order times
On-site arrival commitment met     91%         64%       work order times
Scheduled visits delivered on      100%        78%       the schedule
time
Service report within 24 hours     98%         42%       the report log
Repeat visits for the same fault     2          11       work order history
Average parts lead time          4 days      13 days     parts records
Quote accuracy against invoice     100%        82%       purchasing records
Check-in compliance               100%        55%       the check-in log
\`\`\`
Take it to the vendor annually and at every renewal, and share it with purchasing. A vendor that knows it is measured behaves differently from one that does not, and a renewal conversation held with this page on the table is a negotiation rather than a signature.

## Making check-in and reporting actually happen
1. **Pay for all outside service from the department's budget.** Control of payment is the only real leverage that exists, and every other step on this list depends on it.
2. **Allow check-in by email** to a named control person with a copy to you, rather than a walk to the shop, because vendors arrive after hours and resent the detour.
3. **Write it into contracts and purchase orders**, with failure to check in named as grounds for a penalty or for termination.
4. **Send every provider a letter** stating that payment follows check-in, check-out, and a service report inside 24 hours of the visit.
5. **Log the vendor's work in your own system** against the asset, with findings, actions, parts, and hours, whether they send a report or not.
6. **Sample their credentials.** Ask for the training records and competency assessments of the people working on your equipment. The duty to ensure the person is qualified does not transfer with the contract.

## Escalation, agreed at signature
\`\`\`
Level   Yours                     Theirs                   Trigger
1       technician                service engineer          routine fault
2       supervisor                service manager           commitment
                                                            missed once
3       you                       regional manager          commitment
                                                            missed twice,
                                                            or a clinical
                                                            impact
4       you plus purchasing       account executive         pattern on the
                                                            scorecard
5       department director       their senior leadership   payment
        plus purchasing                                     withheld or
                                                             cancellation
                                                             considered
\`\`\`
An escalation path invented during an outage is just a series of phone calls. Agree it at signature, publish both sides' names, and use it in order, because skipping levels costs you the relationship you will need next month.

## What to memorize
\`\`\`
Coordination role    every lifecycle stage, with internal and external
                     providers held to the same documentation standard
Acceptance           incoming inspection and performance and safety
                     testing before clinical use and before payment
Vendor logging       every visit in your work order system against the
                     asset, report inside 24 hours of the visit
Enforcement          pay for outside service from your own budget;
                     write check-in into contracts and purchase orders
Credentials          sample the contractor's training and competency
                     records. The duty does not transfer
Reviews              a scorecard built from your own records, taken to
                     the vendor annually and at renewal
\`\`\``,

u6l6: `## A project schedule, with the critical path marked
Replacing the monitoring in four units. The dates are relative weeks, and the marked tasks are the ones that move the finish date.

\`\`\`
Wk  Task                                    Owner          Critical
0   Charter signed, sponsor named            you               yes
1   Requirements confirmed with nursing      you                no
2   Purchase order released                  purchasing        yes
2   Network assessment and drop survey       information        no
                                             technology
4   Network drops ordered                    information       yes
4   Infection control risk assessment        infection          no
                                             control
6   Training plan agreed with education      education           no
8   Network drops installed and tested       information       yes
10  Devices delivered                        vendor            yes
11  Incoming inspection and acceptance       you               yes
    testing
12  Interface build                          informatics       yes
13  Interface test with known values         informatics       yes
14  Operator training, all three shifts      education         yes
15  Unit 1 go-live                           you               yes
16  Units 2 and 3 go-live                    you                no
17  Unit 4 go-live                           you                no
18  Old devices retired, data wiped          you                no
19  Close-out and lessons learned            you                no
\`\`\`
The critical path runs through the network drops, the device delivery, acceptance, the interface, and training. A week lost on the drops is a week lost on go-live. A week lost on the infection control assessment is absorbed, because that task has slack. Knowing the difference is what lets you tell the sponsor which delays matter.

## The risk register
\`\`\`
Risk                          Likely  Impact  Mitigation and owner
Network drops delayed by       medium   high   ordered in week 4 rather
ceiling access                                 than week 8; information
                                               technology to confirm
                                               access with facilities
Interface field mapping        medium   high   test cases written in week
wrong                                          6, run with known values
                                               before go-live: informatics
Training not completed on      high     high   all three shifts scheduled
night shift                                    in week 14, attendance
                                               tracked: education
Old devices have nowhere       high     low    storage identified in week
to go                                           12 and disposal route
                                               agreed: you
Vendor delivery slips          low      high   delivery window in the
                                               contract with a remedy:
                                               purchasing
Clinical go-live window        medium   medium unit-by-unit phasing rather
unavailable                                    than one night: you
Alarm configuration            medium   high   configuration reviewed and
differs from the old                            signed by nursing before
system                                          go-live: nursing and you
\`\`\`
Review it at every project meeting and change the likelihood column honestly. A risk register written once and never updated is a document that predicted the past.

## The dependencies that belong to other people
Hospital projects are rarely limited by technical difficulty. They are limited by other people's calendars, and almost every critical-path task above is owned by somebody outside your department. That has two consequences. Put a representative from each department in the project rather than emailing them, and publish a one-page status every week with the decisions you need and the date you need them by, so a dependency that is slipping is visible to its owner and to the sponsor at the same time.

## Go-live readiness, as a gate
\`\`\`
Gate item                                  Status before unit 1 go-live
Acceptance testing complete and signed      yes
Assets in the inventory with cost, owner,   yes
risk score, and schedule
Procedures written, intervals set           yes
Test equipment and kits in hand             yes
Initial parts stock on the shelf            yes
Operators trained, all shifts, recorded     night shift at 80 percent:
                                            gate held for two days
Service strategy in force on day one        yes
Software versions recorded, backup taken    yes
and restore tested
Security: segment, accounts, vendor remote  yes
access agreed
Interface tested with known values          yes
Manuals, passwords, support contacts filed  yes
Downtime procedure issued to the unit       yes
Old device retirement and data wipe plan    yes
\`\`\`
Hold the gate rather than going live with an amber item. The two days you lose are cheaper than the incident, and the sponsor will remember the decision as competence rather than delay.

## Close-out
Final cost against budget, with the variances explained. The old assets retired in the inventory and their disposal documented. A written statement to the sponsor that the project is complete. And lessons learned that actually change something: a line added to the site survey template, a clause added to the next contract, a task added to the project checklist. A lessons-learned file that changes no template is a file nobody will ever open.

## What to memorize
\`\`\`
Charter            objective, sponsor, budget, deadline, and what is
                   out of scope
Milestone          a dated checkpoint with no duration of its own
Critical path      the longest chain of dependent tasks; a slip on it
                   slips the finish date. Tasks off it have slack
Change request     the formal route to alter scope, schedule, or
                   budget after the plan is baselined, with the impact
                   priced so the sponsor decides
Sustainment plan   inventory, maintenance, parts, training, service
                   strategy, software and backups, security,
                   documentation, and retirement of the old asset
Close-out          cost against budget, lessons that change a
                   template, and the sponsor told it is done
\`\`\``,

u6l7: `## The utility interruption worksheet
A notice naming a floor becomes a clinical plan by filling this in. One owner reads every notice; the worksheet is what they produce.

\`\`\`
Notice               riser isolation, Sunday 06:00 to 12:00
Named in the notice  third floor, east wing
Actually affected    third floor east, plus two rooms on the second
                     floor fed from the same riser, which the notice
                     did not mention
\`\`\`
\`\`\`
Area        Devices affected        Battery runtime   Plan
3 East      14 infusion pumps       documented, per   charged to full on
            in use                  model              Saturday evening;
                                                       four spares staged
3 East      6 bedside monitors      central station    monitors on the
                                    unaffected         emergency branch;
                                                       outlets labelled
                                                       and confirmed
3 East      1 ventilator            internal battery   patient moved to a
                                    documented         room on the
                                                       emergency branch
3 East      2 feeding pumps         documented         charged, spares
                                                       staged
3 East      suction, wall           no battery         portable suction
                                                       units staged, two
                                                       per corridor
2nd floor   1 warming cabinet,      none required      taken out of
            1 blanket warmer                           service for the
                                                       window, unit told
3 East      1 medication            building system    pharmacy notified;
            refrigerator                               temperature
                                                       monitoring
                                                       confirmed
\`\`\`
\`\`\`
Step                      Who         When
Scope confirmed with      you and     by Wednesday
facilities                facilities
Unit notified in writing  you         by Thursday, naming the window,
                                      the devices, and what to do instead
Spares staged and         you         Saturday evening
batteries charged
Attendance during the     a named     Sunday 06:00 to 12:00, reachable
interruption              technician
Verification on           the same    before any device returns to a
restoration               technician  patient
Documentation             you         Monday, into the project and
                                      equipment plan records
\`\`\`

## Verification on restoration, which is the step people skip
\`\`\`
Check                        Why it matters
Device powers up and         a device that was off is not a device
completes self-test          that is working
Settings and alarm limits    a power event quietly discards exactly
intact                       these, and the clinical consequence is
                             silent
Date and time correct        a wrong time stamp corrupts the record
                             and any later investigation
Network connection and       devices come back without reconnecting,
data flowing                 and the failure is an absence rather
                             than an error
Battery charging             a battery that did not resume charging
                             fails during the next event
Documented                   what was interrupted, what was tested,
                             what failed, what was corrected
\`\`\`

## HTM in a construction project
\`\`\`
Topic                     Your contribution
Design and planning        the equipment list with space, power,
meetings                   network, and environmental requirements,
                           asked for before the drawings are fixed
Equipment moves            what is relocated, when, by whom, who
                           verifies it afterward, and what the unit
                           uses meanwhile
Infection control risk     the containment, airflow, and work-hour
assessment                 controls that apply whenever devices or
                           utilities are opened up
Interim life safety        the temporary compensations that apply
measures                   while life safety features are impaired by
                           the work
Utility shutdowns          every planned interruption, run through the
                           worksheet above
Final acceptance           devices installed, inspected, tested,
                           tagged, inventoried, and scheduled before
                           the room opens
\`\`\`
The recurring failure is being invited late. Equipment decisions made on a drawing become construction costs nobody budgeted, or a finished room that will not hold the device the department ordered, and both are far cheaper to prevent at a planning meeting than to fix afterward.

## Downtime procedures, both halves
\`\`\`
Phase            What the procedure must answer
Declaration      who declares downtime, how units are told, and
                 within what time
During           how requests are captured on paper, who holds the
                 critical contact list, what the device does
                 standalone and for how long, what degrades silently,
                 and when a patient moves to a different device
Recovery         who declares the system restored, how downtime data
                 is reconciled into the record, how each device is
                 verified before it returns to a patient, and who
                 confirms the unit is back on normal workflow
Afterward        the backlog entered, any recall or advisory in
                 progress picked back up, and an after-action note
                 listing what failed and what changes
\`\`\`
Write recovery with the same care as the outage, because recovery is where most of the harm occurs. Then publish the procedures before the interruption, confirm the units hold them, and exercise them, because a drill is the cheapest possible place to discover that a phone number is wrong or a spare is out of calibration.

## What to memorize
\`\`\`
Utility notice      becomes a device list, a clinical impact
                    assessment, written notification, attendance, and
                    verification before patients return
Hidden scope        devices fed from the same system outside the area
                    named in the notice
Verification        power-up, self-test, settings and alarm limits,
                    time, network and data flow, battery charging
Construction        planning meetings, equipment moves, the infection
                    control risk assessment, interim life safety
                    measures, utility shutdowns, final acceptance
Change management   written request, joint assessment, approval,
                    window, back-out plan, test, version record
Downtime            declaration, during, recovery and reconciliation,
                    and an after-action note
\`\`\``,

u6l8: `## A month of meetings, and what each one leaves behind
Communication is a schedule, not a personality trait. This is the schedule.

\`\`\`
Meeting            When          Agenda                     Leaves behind
Daily huddle       every         yesterday's escalations,    a verbal
                   morning,      today's priorities, who     priority list
                   15 minutes    is blocked, who is out,     and one or two
                                 which units are hot         actions
Shop meeting       monthly,      the numbers against         minutes with
                   1 hour        goals, policy and           decisions,
                                 procedure changes,          actions, owners,
                                 training, incidents and     dates
                                 lessons, staff items
One to one         monthly,      workload, development,      a short note,
                   30 minutes    performance, anything       so nothing in
                                 that should never first     the annual
                                 appear in a review          review is new
Unit leader        monthly or    their equipment, their      an email the
meeting            quarterly     complaints, their           same day
                                 projects, what they need    confirming what
                                 from you                    was agreed
Vendor review      annually      the scorecard, open         a written
                   and at        issues, the renewal         summary and the
                   renewal       position                    agreed actions
Committees         per the       the number, the trend,      the minutes,
                   calendar      the cause, the action,      which are your
                                 the ask                     survey evidence
\`\`\`
Read last meeting's action list at the start of this one. An action list that is never revisited trains everybody to ignore it, which is how a department ends up with a minute book and no follow-through.

## The rounding log
\`\`\`
Unit       Date   What they told me            What I did
3 East     the    a pump alarms intermittently  collected it, found a
           6th    but "it always does that"     cracked sensor housing,
                                                replaced, told the charge
                                                nurse
Emergency  the    monitors stored in the        reorganized the storage
           6th    corridor, cables tangled      bay with them, labelled
                                                the shelf
Operating  the    new staff unsure of the       scheduled a 15 minute
rooms      7th    warmer controls               in-service on all three
                                                shifts
Clinic 2   the    a device we had no record     added to the inventory,
           8th    of, arrived as a trial        incoming inspection done,
                  eight months ago              trial agreement requested
Laboratory the    centrifuge due for service    rescheduled to their quiet
           8th    always arrives during         hour, standing window
                  their busiest hour            agreed
\`\`\`
Four of those five items would never have reached a work order. Rounding is how you find them, and the second column is how you convert a conversation into trust: act on something visible from each round and come back and say what you did.

## A vendor issue, in writing
\`\`\`
Element                What to write
Subject                asset number, device, and the commitment at
                       issue
Facts                  the dates, the calls placed, the times
                       promised, the times achieved, taken from your
                       own records
The commitment          quoted from the contract clause, by number
missed
Impact                 the clinical consequence: cases moved,
                       monitoring unavailable, a device out of
                       service for a stated number of days
What you want          a specific action, by a specific date
Escalation if not       the next level and the date you will escalate
met
Copied to              purchasing, and your own director
\`\`\`
Facts, clause, impact, request, date. Frustration persuades nobody and weakens a position that the records would have won on their own.

## Three habits that do most of the work
Tell people bad news first and from you. A director who hears about a problem from their own nurse before they hear it from you spends the next month assuming you hide things, and you will spend twice the effort recovering that ground. Say what you need in one sentence, with the consequence of not getting it, instead of describing a situation and hoping somebody infers the request. And document commitments in both directions with a short email the same day: what was agreed, who owns it, by when. Half the conflicts a manager handles come from two people remembering a corridor conversation differently, and five minutes of writing closes that gap permanently.

## What to memorize
\`\`\`
Huddle            daily, short, priorities and blockers
Shop meeting      monthly, the numbers and the goals, with minutes
One to one        monthly, so nothing in an annual review is new
Rounding          scheduled, without a work order in hand, three
                  questions, and visible follow-up
Vendor            technical traffic technician to engineer;
communication     commercial and performance traffic through you and
                  purchasing, in writing, on a published escalation
                  path
Minutes           decisions, actions, owners, dates. Only the lines
                  somebody must act on
Commitments       confirmed in writing the same day, both directions
\`\`\``,

u6l9: `## The integration register
Interfaces fail because they sit between two owners and belong to neither. The cure is a register, maintained like an inventory.

\`\`\`
Integration        Sends        Receives    Owner      Owner      Monitored
                                            (send)     (receive)  by
Bedside monitors   vital signs  patient     you        informatics information
to the record                   record                             technology,
                                                                   with a daily
                                                                   count check
Imaging modalities images       imaging     you        imaging     imaging
to the archive                  archive                informatics informatics
Archive to the     reports      patient     imaging    informatics informatics
record                          record      informatics
Laboratory         results      laboratory  you        laboratory  laboratory
analyzers to                    system                 informatics informatics
middleware
Infusion pumps     infusion     pump        you        pharmacy    you, by
to the drug        records      library                informatics library
library server                  server                             version
Ventilators to     settings     patient     you        informatics informatics
the record         and          record
                   measurements
Anesthesia         case         patient     you        informatics informatics
machines to the    records      record
record
\`\`\`
Every row names a sender, a receiver, two owners, and somebody who would notice if it stopped. The last column is the one most hospitals cannot fill in, which is why the common failure is not an error message but data quietly ceasing to arrive.

## The ownership agreement with information technology
\`\`\`
Question                                    Agreed answer
Who owns the device                          you
Who owns the network it sits on              information technology
Who owns the address and the segment         information technology,
                                             allocated with you
Who may change the device's                  you, through change control,
configuration                                with the manufacturer
Who may change the network affecting         information technology,
clinical devices                             through change control, with
                                             your sign-off
Which change windows apply to clinical       agreed windows only, never a
devices                                      standard maintenance window
                                             without notice
Who approves vendor remote access            you and the security officer,
                                             per session
Who is called first when a networked         a joint path: both paged, with
device misbehaves                            a named triage owner
Who owns the interface                       named per integration in the
                                             register
Who tests after a change                     whichever side changed, with
                                             the other side witnessing
\`\`\`
Write it down and have both directors sign it. The argument you avoid is the one that happens at two in the morning with a patient on the other end of it.

## Test cases, written once and reused
\`\`\`
Test                                   Pass criteria
A known value sent from the device     the same value appears in the
                                       record, unaltered
Correct patient                        the value is on the patient the
                                       device was attached to, verified
                                       against the admission record
Correct units                          the unit of measure is what the
                                       device sent, not a default
Correct time stamp                     the time matches the device, in
                                       the right time zone, without
                                       drift
Device identity                        the record names the device that
                                       produced the value
Absence detected                       disconnect the device and confirm
                                       that monitoring notices the
                                       silence within the agreed time
Boundary value                         an out-of-range value is
                                       transmitted and displayed as sent,
                                       not truncated or rounded away
\`\`\`
Run them after every change on either side: patches, upgrades, network changes, configuration changes, and anything the vendor does during a service visit. Test the data rather than the connection, because an interface that is up and delivering the wrong field is more dangerous than one that is plainly down.

## Consulting the people with the requirements
\`\`\`
Group            What only they know                   Ask them
Users            what the workflow actually is, as      watch the work, do
                 opposed to what the procedure says     not just interview
Management       the service line's direction and       what is funded, and
                 what is funded                         what is coming
Vendors          what the product can and cannot do,    make them answer in
                 and what it costs to make it do more   writing
Technicians      what fails, what is unserviceable,     ask before the
                 and what the last three of these       evaluation, not after
                 turned out to be like
\`\`\`
A requirement list assembled from all four survives contact with reality. One written from a single source does not, and the single source is usually a demonstration.

## When it goes wrong
A wrong-patient or wrong-value result is a patient safety event, not a technical fault. Report it as one, investigate it with the same rigor as a device failure, preserve the evidence on both sides of the interface, and bring both owners into the investigation. The root cause is almost never the interface software; it is a change made on one side without the other side being told, tested, or asked.

## What to memorize
\`\`\`
Consult          users, management, vendors, and technicians before a
                 technology decision
Boundary         who owns the device, the network, the configuration,
                 the change windows, and the incident path, in writing
Interface        named owner on both sides, in a maintained register,
                 with somebody who would notice silence
Testing          defined test cases, run after every change on either
                 side, testing the data rather than the connection
Common failure   data quietly stops arriving, with no error message
Wrong patient    a patient safety event, reported and investigated as
or wrong value   one
\`\`\``

});
