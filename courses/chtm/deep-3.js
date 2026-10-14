// CHTM Academy deeper explanations, units 7 and 8. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u7l1: `## The whole year on one worksheet
Four people asked for schools and a fifth thing is required whether anybody asked or not. Separate requests argue with each other; one worksheet ranks them.
\`\`\`
Request                 Fleet  Cost     Net avoided  Payback   Rank and why
                        size   year 1   each year
Anesthesia service        14   $18,060    $25,480    8.5 mo    1, declines a
school, 2 weeks                                                $48,000 contract
Sterilizer validation      9    $4,200    not costed   n/a     1, required by
refresher                                                      the laboratory
                                                               checklist anyway
Radiographic service      22    $8,400    $14,200    7.1 mo    2, creates the
school                                                         second imaging
                                                               holder we lack
Infusion pump school,    260   $26,000    $19,800    1.3 yr    2, lowest cost
on-site, 6 seats                                               per person
Soft skills, whole        n/a   $3,500    not costed   n/a     3, answers the
shop, 1 day                                                    survey scores
Total                           $60,160
\`\`\`
Rank in four bands. Anything a regulator, a license, or an accreditation checklist requires goes first and is not scored on return at all. Anything that removes a single point of failure goes next, because one trained person on a critical fleet has a resignation date you cannot predict. Then the requests with the shortest payback. Then the ones with no cash return but a measurable effect on a number you already report.

## The return, in full
\`\`\`
Cost, year one
  Tuition                                             $9,500
  Travel and lodging                                  $2,800
  80 hours away at the loaded rate of $72             $5,760
  Total                                              $18,060

Avoided, each year once trained
  Vendor service contract declined                    $48,000
  Less parts the hospital now buys itself            -$11,000
  Less 160 hours of in-house labor at $72            -$11,520
  Net avoided per year                                $25,480

Payback        18,060 / 25,480 = 0.71 years
Return, 5 yr   (127,400 - 18,060) / 18,060 x 100 = about 605 percent
\`\`\`
Two honesty rules make that calculation survive a finance review. Count your own labor at its fully loaded rate, because leaving it out makes every in-house option look free and is the fastest way to have a saving dismantled. And count the productivity lost while the person is away, because two weeks of a technician is a real cost even though no invoice arrives for it.

## Why a single-year view kills good training
Training is a one-time expense, high in year one and close to zero afterwards. Judged on year one alone it barely breaks even; judged across the life of the fleet it is one of the best returns a department can produce.
\`\`\`
Year   Training spent   Contract avoided   Net position
       cumulative       cumulative         cumulative
1          $18,060           $25,480          +$7,420
2          $18,060           $50,960         +$32,900
3          $18,060           $76,440         +$58,380
4          $18,060          $101,920         +$83,860
5          $18,060          $127,400        +$109,340
6          $18,060          $152,880        +$134,820
\`\`\`
Every column is a running total to the end of that year. The training column holds at $18,060 because it was paid once, in year one, while the avoided column keeps adding another $25,480.

Present the accumulated position at years four, five, and six. That is the view in which the crossover is obvious and administration has something to approve rather than an expense to decline.

## The development that costs nothing
A plan made only of purchased schools understates what the department can do. Free trade publications, association and vendor webinars, the online discussion lists where managers put real questions to each other, open courseware published by universities, and planned cross-training between your own technicians all build skill with no purchase order, and all of it counts toward the continuing education units your certified staff have to accumulate. Put it in the plan with the paid items so the plan shows the whole program.

## What to memorize
\`\`\`
Needs analysis inputs  asset inventory, competency gaps, failure and
                       repeat-repair data, operations impact, customer
                       requirements, regulatory requirements, technical
                       requirements, resources, cost against return
Cost of a course       tuition plus travel and lodging plus the
                       productivity lost while the person is away
Return                 contract, vendor labor, parts markup, and
                       downtime avoided, net of in-house labor at the
                       loaded rate and parts you now buy
Payback                first-year cost divided by net annual saving
Ranking                regulatory first, then single points of failure,
                       then shortest payback, then no-cash-return items
                       that move a reported number
The argument           accumulated position at years four, five, and
                       six, never year one alone
\`\`\``,

u7l2: `## Proving the training caused the change
A before-and-after table is only an argument until you have dealt with everything else that moved in the same twelve months. Finance will ask, and a manager who has already answered keeps the education line.
\`\`\`
What else changed              How to handle it in the report
A second fleet of the same      say so, and report per-device rates
model arrived                   rather than raw call counts
The vendor contract was         name it, and count only the labor and
renegotiated                    parts effects you can separate
A technician left or joined     report the measures per technician as
                                well as per fleet
A recall or an upgrade          exclude those work orders, and say how
absorbed hours                  many you excluded
A different model was never     use it as a control: if its repeat-
trained on                      repair rate held flat while the trained
                                fleet improved, the training is the
                                most likely cause
Seasonality                     compare the same months, not the most
                                recent twelve against the previous
\`\`\`
The control-fleet trick is the strongest and the cheapest. You almost always have a comparable fleet nobody was trained on, and a flat line beside a falling line is close to proof.

## Three ways to buy the same class
\`\`\`
Option                      Total     Trained  Each      What to check
One seat at the factory     $12,300      1     $12,300   the maker's own
                                                         class, so content
                                                         risk is lowest
On-site delivery, six       $26,000      6      $4,333   ask whether it is
seats                                                    the same class the
                                                         maker's own staff
                                                         attend, or a shorter
                                                         customer version
Third-party school, two      $9,600      2      $4,800   check with managers
seats plus travel                                        whose people sat in
                                                         it, not the brochure
\`\`\`
Cost per trained technician decides how you buy; the needs analysis decided whether you buy. The two questions are separate and managers routinely collapse them, which is how a department ends up with one expensive seat when six people needed the skill.

## The decision record
Write one short record per program and keep them together. It is what next year's plan is built from, and it is what you hand your director when the education line is questioned.
\`\`\`
Program            anesthesia service school, 2 technicians
Cost               $18,060 including travel and time away
Delivered          March, factory, 2 weeks
Baseline captured  yes, 12 months before, from the CMMS and survey
Measures moved     repeat repairs 19 to 6, first-time fix 58 to 84
                   percent, total time to repair 4.6 to 1.3 days,
                   vendor labor $31,400 to $6,900, competent on the
                   model 1 of 6 to 5 of 6
Measures flat      use-error calls 22 to 20
Confounders        one additional unit arrived in month 4, counted
                   in the per-device rates
Decision           repeat for two more technicians next year; take
                   the use-error problem to the unit educator
Reported to        the environment of care committee, annual report
\`\`\`

## What to memorize
\`\`\`
Measures           cost, failure rates and repeat repairs, total time
                   to repair, first-time fix, contract calls avoided,
                   staff competencies and skill set, user satisfaction
Baseline           captured before anybody travels, from the CMMS and
                   the satisfaction survey
Cost per trained   total program cost divided by the number who came
technician         out documented competent
Attribution        name the confounders, compare the same months, and
                   use an untrained comparable fleet as a control
Documented in      the training record, the competency record in the
                   CMMS, and the annual report to the committee
The decision       repeat, change the provider, change the delivery,
                   extend it to a second person, or stop
\`\`\``,

u7l3: `## The training and materials clause, line by line
This is the paragraph that decides what the department can do with the device for the next ten years, and it has to be agreed while the sale is still in doubt.
1. Seats and level. State the number of seats and that they are service level, not operator level. One seat trains one person.
2. The same class. State that attendees sit in the class the manufacturer's own service personnel attend, with the same materials, rather than a customer version.
3. Delivery date. State that training is delivered inside the warranty period, and that if it is not, the warranty is extended until it has been.
4. Travel and lodging. Name who pays. A free seat with $3,000 of travel attached is not free.
5. Materials for the life of the device. All literature, service and operations manuals, passwords, service keys, software, firmware, and updates, plus technical support, for as long as the hospital keeps the device in service.
6. Price protection. A locked price for additional seats, parts, and labor, whether or not you intend to use it.
7. Payment. Arrange with materials management that payment may be withheld until the listed items actually arrive, because terms and conditions with no money behind them are a request.

Have the wording checked by managers who have bought from the same company recently. A vendor's lawyer reads "available on request" very differently from the way you meant it, and the only early warning available is somebody else's experience.

## Attending the school before the device arrives
Where the schedule allows it, send the technician before delivery and acceptance rather than after.
\`\`\`
Why                           What it is worth
Incoming inspection           a trained technician checks the
                              installation and the acceptance tests
                              knowing what right looks like
Minor repairs in warranty     a $40 part and twenty minutes beats days
                              of shipping and a vendor visit, even when
                              the vendor would have done it for nothing
Handling damage               damage from handling usually falls outside
                              warranty cover and becomes a charge. An
                              in-house repair avoids the charge
Supporting the operators      clinical questions in the first weeks are
                              answered on the unit rather than logged
\`\`\`

## The cross-training matrix
Competency recorded per person and per model turns into a risk register the moment you total the columns.
\`\`\`
Model                   A   B   C   D   Competent   Risk
Anesthesia machine      C   -   C   -       2       covered
Ventilator              C   C   -   -       2       covered
Infusion pump           C   C   C   C       4       covered
Sterilizer              C   -   -   -       1       single point
Radiographic room       -   -   -   C       1       single point
Laboratory analyzer     -   C   -   -       1       single point
\`\`\`
Three single points of failure, and all three are on expensive fleets where a vendor visit is the only alternative. That table is also a succession plan and a training plan: it tells you exactly which three courses to put in next year's worksheet, and in what order.

## What to memorize
\`\`\`
What training unlocks  service software, service keys, service-level
                       manuals, parts eligibility, calibration
                       procedures, and standing with the maker
Negotiate              seats and level, the maker's own class, delivery
                       inside the warranty or the warranty extended,
                       travel and lodging, materials for the life of
                       the device, locked prices, payment withheld
Timing                 before the purchase order is signed. Afterwards
                       there is no leverage at all
Purchase order         ask accounting whether training is its own line,
                       because training cannot be depreciated
Third parties          often cheaper and sometimes better; judge by
                       asking people whose staff attended
Coverage               two competent people on every critical model,
                       recorded in the CMMS by person, model, level,
                       date, and refresher due
\`\`\``,

u7l4: `## The training matrix, read monthly
One grid answers the question a surveyor asks and tells you what to chase this week.
\`\`\`
Topic                        A         B         C         D
General safety, annual       03/2026   03/2026   03/2026   09/2026
Infection control, annual    03/2026   03/2026   OVERDUE   09/2026
Hazard communication         03/2026   03/2026   03/2026   09/2026
Electrical safety, lockout   01/2026   01/2026   01/2026   09/2026
Radiation safety             n/a       n/a       02/2026   n/a
Privacy and security         03/2026   03/2026   03/2026   09/2026
Cybersecurity awareness      03/2026   03/2026   03/2026   09/2026
Policy manual sign-off       2019      2024      2026      2026
\`\`\`
Two problems are visible and they are different problems. One overdue annual refresher is a scheduling failure with an obvious fix. A policy manual signed for in 2019 is worse: the manual has been revised several times since, so one technician has been working from a document the department no longer follows. Re-sign the manual whenever it is materially revised, and record the revision number next to the signature.

## What an interval actually means
Annual means inside twelve months, not inside the calendar year, and the date that counts is the date the person completed it rather than the date the class was offered. Role-based topics apply to the people in that role, which is why the radiation safety row has gaps in it and why those gaps are correct. Everything else applies to everybody, including the manager, including the person who has done the job for twenty years, and including the technician who was on leave when the class ran.

## Buying soft skills deliberately
\`\`\`
Skill                  What it prevents                   How to buy it
Communication          the correct technical answer the   short course,
                       nurse cannot use, which becomes    then practice in
                       a second call                      shop meetings
Customer service       a 90-minute repair remembered      the same, plus
                       as a delay because nobody said     rounding with
                       anything                           the manager
Conflict handling      one soured unit relationship       a course, and
                       that turns every future call       the manager
                       into an escalation                 modeling it
Written work           a service report nobody can        review real
                       follow four years later, in the    closed records
                       one case that matters              together
\`\`\`
Soft-skills training also travels further than a model-specific class, because it applies to every call a technician takes rather than to one fleet, which is a useful argument when the education line is tight.

## What to memorize
\`\`\`
Required topics      safety and emergency codes, infection control and
                     device handling, hazard communication, electrical
                     safety with lockout and tagout, radiation and
                     laser safety where they apply, privacy and
                     information security, cybersecurity awareness,
                     regulatory and code compliance, department policy
Soft skills          communication, customer service, conflict
                     handling, and written work, bought deliberately
Record per person    topic, date completed, date due, and for the
                     policy manual the revision signed for
Intervals            annual means inside twelve months from the last
                     completion, not inside the calendar year
At survey            the topic exists for the role, each person has a
                     date inside the interval, and the content matches
                     what the technician just said in the corridor
\`\`\``,

u7l5: `## The 30, 60, and 90 day plan
Write it before the start date, give a copy to the new technician and a copy to the mentor, and review it at each milestone.
\`\`\`
By day 30: knows the building and the shop
  Facility orientation complete, with the hospital's own record of it
  Department scope, customers, escalation path, and on-call rules
  explained; SOP manual and the equipment management plan read and
  signed for, with the revision noted
  Shop and tool control: tool sign-out, test equipment and its
  calibration status, parts stores, hazardous materials
  Safety complete: electrical safety, lockout and tagout,
  decontamination before service, protective equipment for her areas
  Opens, documents, and closes a work order to the department
  standard; verified against five closed jobs
  Signed off on electrical safety testing and one general device type
  Works supervised at all times. Nothing solo yet

By day 60: carries the routine list alone
  Signed off on the three device types she is called to most
  Holds her own scheduled maintenance list for one unit
  Introduced on her assigned units by the mentor, by name
  Has escalated at least once and can say when she would again
  Mid-point conversation held and written down, both signed

By day 90: a contributing member of the shop
  Competency checklist complete for her assigned scope, with
  life-support and critical devices signed by a senior technician
  Unscheduled work assigned unsupervised on signed-off models only
  Documentation rate and completion measured for the first time
  Probationary review held, containing nothing she has not heard,
  with the first goals agreed and a development plan started
  Named as the second holder for one skill the department lacks
\`\`\`

## The mentor's written goal
Name one mentor, give them the plan above, and protect the hours in the schedule rather than assuming them. Tell the mentor what success is: by day 90 the new technician works the routine list unsupervised, documents to standard without being chased, and asks for help before a device is in pieces. Pick for teaching ability and for habits you want copied. The strongest diagnostician in the shop is not always the right choice, and the person with the most years is sometimes the source of the practices you have been trying to retire.

## Initial competency, and the order it is built in
Build the checklist in order of risk and frequency: the devices she will be called to most, and the life-support and critical items, first. Each line holds the model or skill, the method used, the assessor, the date, and the result, and no line is closed early to free up a body for the schedule. The single rule that protects the hospital is simple: nobody works unsupervised on a device before the sign-off for that device exists, and the sign-off is a dated document rather than a memory.

## The probationary review
The formal review at the end of the probationary period decides whether the hire holds, and it should be the least surprising meeting of the ninety days. If documentation, attendance, or a competency was a problem in week five, it was a conversation in week five and a dated line in your notes in week five. Use the review to confirm, to agree the first goals, and to start the development plan. If the fit is genuinely wrong, say so here with human resources rather than six months later, because the cost of carrying a poor fit is paid in patient-care equipment nobody can repair.

## What to memorize
\`\`\`
Orientation covers   facility, department, shop and tool control, the
                     CMMS, SOPs and the equipment management plan,
                     safety, an assigned mentor, an initial competency
                     checklist, and milestones at 30, 60, and 90 days
Mentor               one named person, protected time, a written goal
Day 30               supervised only, with basic sign-offs complete
Day 60               routine list alone on signed-off models
Day 90               checklist complete, probationary review held,
                     goals and development plan agreed
The rule             no unsupervised work on a device before the dated
                     competency sign-off for that device exists
\`\`\``,

u7l6: `## From a service call to an in-service
The trend is the evidence; the questions below turn it into a plan. Run them in order, because each one narrows where the training has to go.
\`\`\`
Question                        What the answer changes
Did the count spike, or has     a spike has a cause you can find; a
it always been this high        steady rate is a design or model issue
What changed in that period     an installation, a software or drug
                                library update, a preset change, a new
                                intake of residents, agency staff
Which department                one unit is a relationship and a
                                teaching problem; every unit is the
                                device or the configuration
Which model                     one model across many units points at
                                the device or its interface, not the
                                staff
Which shift                     almost always the most useful cut, and
                                the one most often skipped
Who closed the calls            check the technician is coding use
                                error and cannot duplicate correctly
                                before you build a program on it
\`\`\`
That last row matters more than it looks. If one technician codes everything cannot duplicate and another writes a real finding, your trend is measuring documentation habits rather than clinical practice.

## The in-service, and the record it leaves
\`\`\`
In-service record
Topic          infusion pump: rate entry, the secondary line, and
               the three alarms staff reported silencing
Why            22 cannot-duplicate calls in 4 months, 14 of them on
               5 east nights
Delivered by   the unit's clinical educator, with the manufacturer's
               clinical specialist, HTM supplying the data and the
               device
Sessions       nights 23:00 and 03:00; days 07:30 and 15:00;
               weekend 09:00
Attendance     31 staff by name, with shift and role
Not present    6 staff, listed, booked into the next session
Materials       one-page job aid left on every pump, and the
               operations manual replaced on the unit
Follow-up      count the same calls for 3 months from 1 October
\`\`\`
The two lines managers leave out are the ones that make it a program rather than an event: the people who were not there, and the date you will check whether it worked.

## Did it work
Count the same code, on the same model, in the same units, for the next three months against the four you started with. Three outcomes and three different next steps. The calls fall and stay down: record it, report it, and close the item. They fall on days and hold on nights: you have the next session and you know the shift. They do not move at all: it was probably never use error, so look again at the device, the configuration, an accessory that fails, or an interface, and tell the unit what you found so the relationship survives.

## What to memorize
\`\`\`
Identify             use error is spotted on the service call itself
                     and coded there. A code assigned later is a guess
Trend by             department, model, shift, and what changed
                     recently: installation, software or database
                     change, new residents or agency staff
Observe              watch the user with the device. Setup habits,
                     technique, and a wrongly saved preset explain
                     most of it
Facilitate           the unit's clinical educator and the vendor's
                     clinical specialist deliver it; HTM brings the
                     data, the device, and the dates
Always a training    new equipment before first clinical use, a new
event                clinical application on an old device, new or
                     rotating staff, and any database or configuration
                     change
Record               date, unit, shift, topic, who delivered it, who
                     attended by name, and who did not
Verify               count the same calls for three months afterwards
\`\`\``,

u7l7: `## An access register that survives a resignation
The failure mode is always the same: one person held the knowledge and left. The register below is the fix, and the column that does the work is the third one.
\`\`\`
Material                 Where it lives        Who else can get it
Service manuals          department drive,     every technician, and
                         indexed by model      the on-call phone
Operations manuals       on the unit, plus a   unit educators and the
                         controlled copy       department
Service keys and         the hospital's        two named managers and
passwords                password vault        the on-call supervisor
Software and firmware    department drive,     every technician, with
images                   by model and version  the version recorded
Vendor portal accounts   registered to a role  the role holder and one
                         mailbox, not a person backup, renewal tracked
Training media and job   department drive,     every technician, and
aids                     made after each       the unit for operator
                         school                 aids
\`\`\`
Two habits keep it honest. Review it on a date, with one named owner, so superseded revisions come out and nobody works from a procedure the maker has replaced. And test retrieval rather than assuming it: once a year, ask a technician who did not set it up to produce the service password for a fleet. If it takes more than a few minutes, you do not have a register, you have a cupboard.

## The clause, and the leverage behind it
Put it in the purchase agreement in writing: every manual the technicians and the units will need, the passwords and service keys, the software and firmware together with its updates, and the maker's technical support, supplied for as long as the hospital keeps the device in service. Then arrange with materials management that payment can be withheld until those items are delivered, because an invoice is usually payable once everything with a price attached has been signed for, and the items you care about most are often sitting in the terms and conditions with no price at all. Where your state has adopted the healthcare facilities code, most of that list is already a legal obligation; state the requirement explicitly anyway, and state it the same way even where the code has not been adopted.

## The four partners, and the question each one settles
\`\`\`
Partner                 The questions that have to be answered
Infection prevention    how is a device cleaned between patients, what
                        must be decontaminated before the shop opens
                        it, which agents damage which materials, and
                        how are reprocessing devices validated and
                        monitored
Facilities management   which outlets are on the emergency branch,
                        who owns water, gases, and ventilation in
                        procedure rooms, how is a utility interruption
                        planned, and who responds at two in the morning
Materials management    what do the terms and conditions say, who
                        performs receiving and incoming inspection,
                        which consumables are single use, and can
                        payment be held until deliverables arrive
Information technology  which segment and address does a device sit
                        on, when is the patching window, who owns
                        remote vendor access, and what is the joint
                        path when an incident could be device or
                        network
\`\`\`
Write the agreed answers down and name the people. The three in the morning telephone call is a bad moment to discover that nobody ever decided.

## What to memorize
\`\`\`
Assure availability  service manuals, operations manuals, software,
                     firmware, service keys, passwords, updates,
                     training media, and other educational material
Where it comes from  requested in writing at purchase, with payment
                     withheld until delivery
Legal backing        where the state has adopted the healthcare
                     facilities code, most of the list is required
How it is kept       one named owner, a review date, version control,
                     role-based vendor accounts, and retrieval tested
                     by somebody who did not set it up
Collaborate with     infection prevention, facilities management,
                     materials management, and information technology
\`\`\``
});

Object.assign(FRA.deep, {

u8l1: `## A job description, section by section
This is the document everything else in the employee's working life is measured against, which is why it is written before the position is posted rather than after somebody has been hired into it.
\`\`\`
Job description: Biomedical Equipment Technician II

1. Identification
   Title, job code, pay grade and range, department, cost center,
   date written, date last reviewed, and whether the role is exempt
   or non-exempt from overtime
2. Reporting relationship
   Reports to the HTM supervisor. Supervises no one. Provides
   technical direction to technician I staff and to students
3. Position summary
   Two sentences: inspects, maintains, calibrates, and repairs
   assigned patient care equipment so that it is safe, available,
   and meets specification when it reaches a patient
4. Essential duties, in the order that consumes the time
   Performs scheduled maintenance, performance verification, and
   electrical safety testing on assigned equipment
   Diagnoses and repairs unscheduled failures to component or
   assembly level
   Documents all work in the CMMS to the department standard
   Performs incoming inspection on new and loaned equipment
   Responds to recalls and advisories on assigned equipment
   Supports clinical users, including in-service assistance
   Takes part in the on-call rotation
5. Qualifications
   Required: associate degree in biomedical equipment technology or
   equivalent military training, plus two years of experience
   Preferred: experience with the department's critical fleets
6. Certification
   Technician certification expected within 24 months of entering
   the grade; a pay differential applies on achievement
7. Physical requirements
   Lifts and carries up to 50 pounds; pushes equipment on wheels;
   stands, kneels, and reaches for extended periods; distinguishes
   colors on wiring and indicators
8. Working conditions
   Patient care areas including critical care and surgery; exposure
   to bloodborne pathogens with protective equipment; electrical
   and compressed gas hazards; scheduled on-call; travel between
   sites
9. Competencies
   Electrical safety testing; the assigned device list by model;
   work order documentation; privacy and information security;
   customer communication
10. Signatures
   Employee, manager, and human resources, with the date
\`\`\`
Section 4 is the one managers write badly. Essential duties are what the law and the accommodation conversation both turn on, so they are written as the job actually is, in the order that consumes the time, rather than as a wish list topped with the most impressive task.

## The ladder, written once
Promotion requires a job to be promoted into. Write the full set in one sitting so the steps line up and each is a genuine increase in responsibility, autonomy, and pay: technician I, II, and III; specialist by modality; lead; supervisor; and manager. Even a two-person department needs at least eight descriptions and steps on the books, because the positions you will need in four years are far easier to create now as one coherent family than one at a time in the middle of a hiring freeze.

## The structured interview
\`\`\`
Element                     Why it is built this way
The same questions, in      so candidates can be compared on
the same order              something other than how well they chat
Questions drawn from the    so every question is job related and
duties and competencies     defensible
A practical assessment      an interview measures how well somebody
                            talks about repair work
A written scoring sheet     so the decision survives being questioned
per interviewer             six months later
References and credentials  verified through human resources, always,
                            including the certification claimed
A documented reason         in job-related terms, kept with the file
\`\`\`

## What to memorize
\`\`\`
Job description holds  title and grade, reporting line, purpose,
                       duties, education and experience, certification
                       expectation, physical requirements, working
                       conditions, competencies
Ladder                 a full range of levels and grades, written at
                       once; at least eight even in a two-person shop
Selection              post, screen against the written minimums,
                       structured interviews, skills assessment,
                       verified references and credentials, documented
                       reason, offer made by human resources
Turnover cost          recruiting and training a replacement is
                       estimated to exceed 1.5 times annual salary
Retention              the direct manager is the biggest factor.
                       Employees rank interesting work, involvement,
                       feedback, training, and respect above pay
Termination            the last step of a documented, consistently
                       applied path, with human resources present
\`\`\``,

u8l2: `## Rating scales, and what each level has to mean
A scale is worthless until the levels are defined in behavior, because otherwise every manager in the hospital uses a different one and the ratings cannot support a pay decision.
\`\`\`
Level           What it has to mean
Exceeds         beat the agreed measure, and did something the goal
                did not ask for: trained others, fixed a process,
                took on a fleet nobody owned
Meets           hit the agreed measures. This is the rating most
                good technicians get and it is not a criticism
Below           missed an agreed measure by a stated amount. Comes
                with a development step and a date, never alone
Unsatisfactory  missed measures that matter and did not improve
                after documented coaching. Goes to a performance
                improvement plan with human resources
\`\`\`
"Meets" has to be respectable or the whole scale inflates. Where every rating is "exceeds", the document carries no information, cannot justify a raise for the person who actually did more, and cannot support a decision about the person who did less.

## The document, section by section
\`\`\`
Section                  What goes in it
The period               dates covered, and the goals agreed at the
                         start of it
Results against goals    each goal, the measure, the result, the
                         rating, and where the number came from
Competencies             the assessed list from the job description,
                         with the dates of the sign-offs
Organizational values    two or three observed examples, with dates.
                         Behavior, never adjectives
Engagement               observed examples: suggestions brought,
                         help given, participation
Strengths                specific, so the person knows what to keep
Development areas        one or two, each with a step and a date
Next period's goals      agreed in the conversation, not imposed
                         after it
Employee comments        their own words, unedited
Signatures               both, with the date
\`\`\`

## The conversation, in order
1. Send the document first. A person reading criticism for the first time in the room cannot discuss anything.
2. Open with the period's results against the agreed measures, not with the areas for development.
3. Hand over the specifics, with dates. "Three unit complaints in March, all from 4 west" is discussable; "communication needs work" starts an argument about character.
4. Ask for their account before you respond to it, and write what they say.
5. Say plainly what the rating means for pay, including when the answer is that policy allows nothing this year.
6. Agree the next period's goals and the development plan in the same meeting, so the review ends looking forward.
7. Both sign, file it with human resources, and keep your own copy of the dated notes it was built from.

## Compensation, values, and engagement
Pay follows the rating wherever the hospital's policy permits, which is why the ratings have to be comparable across the shop and built from numbers rather than impressions. Values and engagement are genuine criteria and they are the easiest place for bias to hide, so they are evaluated the same way as everything else: named behavior, on a date, that you or a documented complaint actually observed. Tie the department's goals to the organization's stated priorities as well, because an evaluation framework that speaks the hospital's own language is far easier to defend in a compensation review.

## What to memorize
\`\`\`
The rule               nothing in the annual review is new. Feedback
                       is the manager's job all year
Evaluated against      the goals and competencies agreed at the start
                       of the period, plus observance of organizational
                       values and engagement
Determines             compensation, where the hospital's policy allows
Bias traps             recent weeks standing in for the year, one trait
                       coloring everything, favoring people like you,
                       rating everyone in the middle, rating everyone
                       high
Defense                dated, specific, behavior-based evidence, with
                       the numbers pulled from the system
Communicated           in writing, discussed privately, signed by both,
                       with the employee's own comments recorded
\`\`\``,

u8l3: `## The competency matrix a surveyor asks for
Competency assessment of the people who service medical equipment is required and must be documented. The matrix is how a manager produces it in one page instead of opening eight personnel files.
\`\`\`
Person   Initial    Electrical  Life support   Critical     Next due
         sign-off   safety      models         models
A        03/2024    01/2026     vent 02/2026   pump 02/2026  01/2027
                                anes 02/2026   mon 02/2026
B        07/2025    01/2026     vent 02/2026   pump 02/2026  01/2027
                                               lab 11/2025
C        01/2019    01/2026     none           sterilizer    01/2027
                                               03/2026
D        09/2026    09/2026     in training    pump 10/2026  09/2027
                                               rad 10/2026
\`\`\`
Read it two ways. Down a column it is a risk register: life support has two holders and sterilizers have one. Across a row it is a development plan: technician D has an initial sign-off and three months of history, so the next conversation is which life-support model she trains on and who assesses her.

## Four assessment methods, and when each is right
\`\`\`
Method                      Use it when                 Watch for
Written or practical test   a defined body of           every technician's
                            knowledge, such as          assignment differs,
                            electrical safety           so one test rarely
                            testing                     fits the whole shop
Self-assessment against     you need coverage of        optimism. Spot-check
every skill and model       everything quickly, and     a sample yourself or
                            a training plan             it drifts
Observed scheduled          the device is critical      only covers what is
maintenance                 and the work is real        scheduled that month
Review of repeat repairs    you want evidence from      a repeat repair can
                            data you already hold       be a bad part or a
                                                        bad device. Check
                                                        before you conclude
\`\`\`
Most departments combine them: the self-assessment for breadth, observation for the critical devices, and repeat repairs as the check on whether the first two are telling the truth.

## The development plan, costed
A plan that no budget can carry is a promise you will break. Each step that costs money gets a figure and a budget year, each step that costs time gets protected hours, and the whole thing gets a review date on the same cycle as the evaluation.
\`\`\`
Step                            Cost        When        Owner
Shadow the imaging specialist   time only   Feb to May  specialist
two days a month                protected
Manufacturer service school,    $6,800      Q3, in the  manager to
4 days                          plus travel education   request
                                            plan
Supervised scheduled            time only   Jun to Nov  specialist
maintenance on two rooms
Two observed competency         time only   by Nov      specialist
sign-offs
Added to the imaging on-call    pay         January     manager
rotation                        differential
\`\`\`

## Certification, and the renewal nobody tracks
Make a credential a requirement at defined steps in the ladder and reward achieving it. The worry that certified staff will leave gets the causation backwards: development binds people to an employer who pays fairly and takes the work seriously, and a shop of certified technicians is the simplest competence evidence a manager can hand a surveyor. Then track the renewal cycles for the whole department, because a lapsed credential takes a ladder step and a pay differential with it, and the person who lets it lapse is usually the busiest person you have.

## What to memorize
\`\`\`
Development plan      the goal, the gap, the training that closes it,
                      the cost and budget year, protected time, a
                      timeline, and a review date
Competency            required and documented. Assessed initially
                      before unsupervised work, then on an ongoing
                      basis, by device and by skill
Methods               test, self-assessment spot-checked by the
                      manager, observed scheduled maintenance, review
                      of repeat repairs
Certification         tied to steps in the career ladder, financially
                      rewarded, with renewal cycles tracked
Recommendations to    promotion, pay, discipline, accommodation, and
human resources       termination, each with the evidence it needs,
                      brought before you act rather than after
\`\`\``,

u8l4: `## Four vague goals, rewritten
The test of a goal is whether you and the employee could disagree about whether it was met. If you could, it is not a goal.
\`\`\`
Vague                     Measurable, dated, and drawn from a
                          department goal
Be more productive        document 85 percent of paid hours against an
                          asset or a clinical department by the end of
                          Q2, measured monthly from the CMMS
Improve your scheduled    complete 95 percent of assigned scheduled
maintenance               maintenance each month for six consecutive
                          months
Be better with customers  no escalated complaints, and a technical
                          competence score at or above 4.3 in your
                          assigned units on the annual survey
Learn imaging             pass the general radiographic service school
                          by October and hold two observed competency
                          sign-offs by December
Take on more              own the sterilizer fleet from July: schedule,
                          parts, vendor relationship, and the monthly
                          numbers
\`\`\`
Every one of those ladders up to a department goal, and the department's goals cover financial performance, scheduled maintenance completion, customer satisfaction, response time, repeat repairs, and use errors. Share the department set with everybody and explain why each matters, so a technician can see how his own list adds up to something. Then set the individual goals with the person. A goal somebody helped write gets worked at; a goal handed down gets quoted back at you in the review.

## The coaching conversation, in five moves
1. Name the behavior, not the character. "The last four pump jobs closed with no findings recorded," never "you are careless."
2. Say what it cost, concretely. "When the unit asked what was wrong, there was nothing to tell them, so they called back."
3. Show the better version. Open a good record of your own and read the findings line out loud.
4. Ask for agreement, and let them talk. Half the time the cause is something you can fix, like a handheld that drops the signal in that wing.
5. Write one dated line in your own notes. Not a warning, not in the file yet, just a record that the conversation happened on that date.

Five minutes at the bench outranks a paragraph in a review eight months later, and it is the only mechanism that makes an annual review contain nothing new.

## A conflict, handled and documented
\`\`\`
Step                       What it looks like in the record
Heard separately           date, who, what each said, in their words
Policy checked             which policy or job description applies
Brought together           date, what was agreed, what is not
                           negotiable
Confirmed in writing       a short note to both, same day
Review date set            two weeks, and the outcome recorded
Escalated when it          allegations of harassment or
touched protected ground   discrimination, anything heading for
                           discipline: human resources the same day
\`\`\`
Document improvement opportunities the same way: write it when it happens, in neutral language, with the date and the specifics. Every periodic evaluation is communicated in writing and signed. A conversation nobody wrote down did not happen, as far as anybody outside the room is ever able to tell.

## What to memorize
\`\`\`
Goals             measurable, dated, drawn from the department's
                  goals, and set with the employee
Coaching          continuous, specific, close to the event: name the
                  behavior, say the cost, show better, ask for
                  agreement, record the date
Mentoring         a named pair, protected time, a written goal,
                  chosen for teaching ability
Recognition       specific, prompt, visible to peers. Technicians
                  rank recognition and a real say in the department
                  above the money items
Conflict          early, separately, on facts and policy, agreement
                  in writing, a review date, human resources as soon
                  as it touches protected ground
Always written     periodic evaluations and documented improvement
                  opportunities, dated and signed
\`\`\``,

u8l5: `## A change plan on one page
\`\`\`
Week      What happens                        Who
-6        Name the problem in the shop's      manager, at the shop
          terms and ask for the shop's own    meeting
          list of what is wrong today
-5        Working group of two technicians    volunteers, one of
          and the supervisor designs the      them a sceptic on
          field order, templates, and the     purpose
          weak-signal workarounds
-4        Decisions published, including       manager
          what was changed because of the
          group's input, said out loud
-3        Training, in small groups, with     supervisor and the
          the quiet and less confident        working group
          staff coached privately
-2        Pilot on one equipment type with    volunteers
          volunteers; paper kept as a
          fallback
-1        Fix what the pilot found; publish   manager
          the fixes and the go-live date
0         Switch, with the working group      everyone
          available on the floor all week
+4        Measure: documentation rate,        manager, reported to
          closure time, complaints, and       the director
          what the clinicians noticed
+8        Recognize the people who made it    manager, by name, in
          work, and repeat the why           the committee report
\`\`\`
Nothing in that plan is about handhelds. It is about who was consulted, who was trained before the switch rather than during it, and whether the reason survived contact with the inconvenience. A change explained is implemented; a change announced is resisted.

## What a hearing asks you for, and what it does not
\`\`\`
It asks for                     It does not want
Dates, documents, work orders,  your opinion of the person's
evaluations, warnings           character
What you observed, and when     what the shop thinks, or what
                                somebody told you second hand
How comparable cases were       an argument for an outcome. You are
handled                         a witness, not an advocate
The record as it was written    a tidier version written later. A
on the day                      note made on the day outweighs a
                                better-worded one made since
A consistent account that       anything you have not read before
matches your own file           walking in
\`\`\`
Be briefed by human resources, and by legal counsel where they are involved, before you say anything. Read your own documentation first so that your account and the record agree. Keep the matter confidential, including from the rest of the department however much they ask, because a manager who discusses an investigation in the shop has created a second problem on top of the first.

## The five things never to do
Promise an outcome. Retaliate against anyone who complained, gave evidence, or took part. Interview alone where human resources should be present. Discuss the case with other staff. Change, backdate, or tidy a record after the fact. Each of those turns a defensible personnel action into a legal exposure, and each is most tempting in the first hour after something happens.

## What to memorize
\`\`\`
Facilitating change  explain why before what, involve the people who
                     do the work, train before the switch, pilot,
                     measure, recognize by name, keep repeating why
Resistance           usually fear of looking slow, a real learning
                     curve, not being consulted, or a previous change
                     that failed. Each has a different answer
Your role in a       a factual witness for the organization. Not the
hearing              judge, prosecutor, or advocate
Preparation          briefed by human resources and legal counsel,
                     prepared from your own records
Consistency          the same facts gathered the same way for every
                     employee; comparable cases treated comparably
Never                promise an outcome, retaliate, interview alone,
                     discuss it with staff, or alter a record
\`\`\``,

u8l6: `## A coverage model, worked
Workload gives hours. Coverage gives people. A department sized on hours alone has no evenings, no on-call rotation anybody can sustain, and a single holder on three critical skills.
\`\`\`
Requirement                           People it takes
Day shift, main hospital, 6,400       4.0 generalists, from the
inventoried items                     workload calculation
Evening cover, 4 hours x 5 days       0.5 by hours, but staffed with
                                      2 people so leave and illness
                                      do not close the shift
On-call, no worse than 1 week in 4    4 people qualified to take it,
                                      which the day staff satisfy
Imaging, 22 rooms                     1.0 specialist, plus a second
                                      holder in development
Sterilizers and laboratory            1.0 specialist, plus a second
                                      holder in development
Three clinics, 40 miles of travel     0.4 of a position consumed by
                                      travel that produces nothing
Non-device time, about 15 percent     0.9 across the department:
of all hours                          meetings, rounding, projects,
                                      incidents, committees, inventory
\`\`\`
Roughly 1,200 to 2,000 items per technician is a first pass only. It ignores complexity, ignores what sits on contract, and shifts with how the inventory was counted, so a department that inventoried every module looks twice as efficient as one that counted whole systems. Use inventory value as the better first estimate, with one caveat: imaging carries expensive parts and relatively little labor, so an equal dollar value of general patient care equipment needs more hours.

## The position request that gets approved
\`\`\`
The ask         one technician at the entry grade
Funded by       a $60,000 service contract on a system leaving
                warranty, which the department declines. The contract
                carries a 30-day cancellation clause, quoted and in
                hand
Loaded cost     under $100,000 salary is under $50 an hour across
                2,080 paid hours; about 25 percent for benefits and
                about another 20 percent for supervision and
                unproductive time gives at most about $72 an hour
Hours the new   0.4 of a position
system needs
Net capacity    0.6 of a position returned to the scheduled
returned        maintenance backlog
Also in year 1  tools and test equipment, model-specific training,
                uniforms and a radio, all one-time
\`\`\`
Asking for staff to perform scheduled maintenance almost never works, because prevented problems are invisible to the people who approve positions. Asking to replace a quoted contract with cheaper in-house labor works, and the slack you deliberately leave in the new role is what absorbs the backlog.

## The wage survey, done properly
Self-reported salary surveys are discounted and should be. The people reporting benefit from high numbers, and some will report total pay including overtime and on-call rather than base pay, which makes the whole field look better paid than it is. Do it the slow way instead: collect real job descriptions from comparable local employers, sit with human resources and match them to your own grades, then let human resources run the survey across salary, overtime, on-call, differentials, and benefits. The output is a document you can take into a compensation review, and it is the only version of this conversation that ever changes a pay range.

## What to memorize
\`\`\`
Staffing inputs    workload hours plus coverage: shifts that survive
                   leave, an on-call rotation of no worse than one
                   week in four, a second holder on every critical
                   skill, travel, and non-device time
Sanity check       1,200 to 2,000 inventoried items per technician,
                   refined by value, complexity, risk, sites, scope
Cost of a biomed   under $100,000 a year is under $50 an hour over
                   2,080 hours; plus about 25 percent benefits and
                   about 20 percent supervision and unproductive time
                   gives at most about $72 fully loaded
Justification      cost avoided against a quoted contract, with slack
                   left to absorb backlog
Incentives         certification, on-call, shift, and specialty
                   differentials work; recognition and a real say
                   work and cost nothing; paying per work order or on
                   completion rate alone backfires
Pay equity         wage-setting criteria free of any influence of sex
                   or race, reviewed regularly, plus market fairness
                   established by a properly conducted survey
\`\`\``,

u8l7: `## The table to know cold
\`\`\`
Law    What it protects          Manager must            Manager must not
ADA    A person with a           Discuss the essential   Ask for a diagnosis
       physical or mental        functions of the job    or medical detail.
       impairment that           and what would let      Decide alone that a
       substantially limits a    the person perform      job cannot be
       major life activity, a    them. Refer the         accommodated. Treat
       record of one, or who     request to human        the request as a
       is regarded as having     resources. Keep the     performance issue
       one. Requires             job description's
       reasonable                essential duties
       accommodation             accurate
EEOC   Applicants and            Take every complaint    Investigate alone,
       employees against         seriously and report    delay reporting,
       discrimination in         it to human resources   change the person's
       hiring, firing,           the same day. Apply     shift or assignment
       promotion, harassment,    every rule the same     after a complaint,
       training, wages, and      way to everybody        or let a complaint
       benefits by race,                                 affect a review
       color, religion, sex
       including pregnancy,
       gender identity, and
       sexual orientation,
       national origin, age
       40 or older, disability,
       and genetic information.
       Covers most employers
       of 15 or more, and 20
       or more in age cases.
       Retaliation is itself
       illegal
FMLA   Eligible employees:       Pass the request to     Grant, deny, or
       12 workweeks of unpaid,   human resources, who    interpret eligibility
       job-protected leave in    determine eligibility.  yourself. Ask for
       a 12-month period for a   Plan the coverage.      medical detail.
       birth, adoption or        Restore the job on      Penalize the absence
       foster placement, a       return                   in a review or in
       serious health condition                          the on-call rotation
       of the employee or of a
       spouse, child, or
       parent, or a qualifying
       military exigency; 26
       workweeks for military
       caregiver leave. Group
       health coverage
       continues
NLRA   Employees' right to       Leave it alone. Where   Question, discourage,
       organize, to bargain      the department is       or watch protected
       collectively, and to      represented, follow     activity. Let it
       act together about the    the collective          affect an assignment,
       terms and conditions of   bargaining agreement    a review, or
       employment, whether or     and involve human      overtime. Promise or
       not a union is present     resources before any   threaten anything in
                                 discipline              exchange
OSHA   Every worker's right to   Assess hazards by       Hand out protective
       a safe and healthful      area, provide the       equipment with no
       workplace, to training,   protective equipment    assessment behind it.
       to protective equipment,  the assessment calls    Let unsafe work
       and to report a hazard    for, train on its use,  continue while a fix
       without retaliation       replace it, keep the    is discussed. Hold a
                                 records, and make the   report against the
                                 hazard safe now         person who made it
\`\`\`

## State and local law, and the agreement on top
State and local law adds rules on leave, scheduling, pay transparency, meal and rest breaks, and more. Where it gives an employee greater protection than the federal rule, it governs. Where the department is represented, the collective bargaining agreement sets the process on top of all of it. Neither is answerable from memory in a corridor, which is the whole reason the first call is human resources.

## The hazard assessment is the first document, not the last
The sequence a citation follows is the sequence you work in: assess the hazards of each area the staff enter, provide the protective equipment the assessment calls for, train people on when and how to use it, replace it when it is damaged or worn, and keep records of all four. Protective equipment issued without an assessment behind it is a finding waiting to be written, and so is a shop full of unused gloves and eye protection, because utilization is part of the duty and not an employee preference. Report what belongs in the environment of care program and investigate injuries and near misses the way you would investigate a device event.

## What to memorize
\`\`\`
Accommodation and        ADA. Talk about essential functions, never a
essential functions      diagnosis
Discrimination,          the laws the EEOC enforces. Report the same
harassment, retaliation  day, change nothing in the meantime
Protected leave and      FMLA. Human resources determine eligibility
job restoration
Employees acting         NLRA. Do not question, discourage, watch, or
together on pay or       retaliate, union or no union
working conditions
Safe workplace,          OSHA. Assess, provide, train, replace, record
assessment, training,
protective equipment
State and local law      governs where it protects more than federal
The first step, always   involve human resources before you act
\`\`\``
});
