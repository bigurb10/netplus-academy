// CHTM Academy curriculum, units 7 and 8. Original teaching content for the AAMI/ACI CHTM exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u7", n: 7, title: "Education and Training", domain: 4,
  blurb: "How a manager decides what training is worth, buys it, delivers it, and proves it worked.",
  assumes: "Unit 4. Training is justified and judged from the same numbers your service operation already produces.",
  lessons: [
    {
      id: "u7l1", title: "Analyzing Training Needs: Cost, ROI, Competency, Operations, Inventory", domain: 4, obj: "EDU-A", minutes: 10,
      body: `A technician asks for a two-week factory school on the anesthesia fleet. Tuition is $9,500, travel and lodging add $2,800, the fleet sits on a vendor contract, and three other people have asked for schools this year. What you are deciding is not whether the course is good. It is whether this course, this year, returns more than the other three, and the only way to settle that is to turn the request into a number.

## The inputs a training needs analysis answers
\`\`\`
Input                  The question it settles
Asset inventory        how many of the model the hospital owns, where
                       they are, and what is arriving next year
Competency             which assessed gaps exist today, by person and
                       by equipment type
Failure data           what the repeat repairs, the cannot-duplicate
                       calls, and the long repair times say about a
                       skill nobody in the shop has
Operations             which backlog, response time, or completion
                       problem this course actually fixes
Customer requirements  what the clinical departments have asked for,
                       and what they will stop calling the vendor about
Regulatory             training the accreditor, a condition of
                       participation, or a license requires anyway
Technical              what the equipment demands: service software,
                       service keys, calibration tools, a certificate
Resources              whether the tools, test equipment, manuals, and
                       parts access exist to use the skill afterward
Cost and return        tuition, travel, lodging, and the productivity
                       lost while the person is away, against what the
                       hospital stops paying somebody else
\`\`\`
Regulatory sits above everything else on that list because it is not a choice. A request that answers every line is a plan; a request that answers only the first line is a wish.

## Cost against return, worked out
\`\`\`
Cost, year one
  Tuition                                              $9,500
  Travel and lodging                                   $2,800
  Two weeks away, 80 hours at the loaded rate          $5,760
  Total first-year cost                               $18,060

Return, every year from now on
  Vendor contract declined                            $48,000
  Less parts the hospital now buys itself            -$11,000
  Less in-house labor, 160 hours loaded              -$11,520
  Net avoided each year                               $25,480

Payback        18,060 / 25,480 = 0.71 years, about 8.5 months
Five-year ROI  (127,400 - 18,060) / 18,060 x 100 = about 605 percent
\`\`\`
Training is a one-time cost. It is high in year one and close to zero afterward, which is why a single-year view kills almost every school worth attending. Show the accumulated position at years four, five, and six, where in-house cost crosses under contract cost, and administration has something it can approve.

## Prioritizing, and the plan that gets funded
Rank the year's requests: anything a regulator or a license requires, then anything that closes a safety or single-point-of-failure gap, then the requests with the shortest payback, then development that costs nothing at all. That last group is larger than most managers think. Free trade publications, association and vendor webinars, the online discussion lists where managers put questions to each other, open courseware from universities, and planned cross-training inside your own shop all build skill without a purchase order, and they all earn continuing education units toward the credentials your staff hold.

Then write the year as one document rather than four arguments: equipment type, who goes, the cost, what it avoids, and the reason, with a total that matches the education line in your operating budget. It goes where the capital plan goes, to your director and to finance, and it is reviewed every quarter as fleets, contracts, and people change.

> Exam tip: a training needs analysis weighs asset inventory, competency gaps, failure and repeat-repair data, operations impact, customer requirements, regulatory requirements, technical requirements, available resources, and cost against return. Training is a one-time cost, so justify it on accumulated savings at years four, five, and six, not on year one alone.`,
      hook: "A training request becomes fundable when the needs analysis names the inventory, the competency gap, the failure data, the operations problem, the customer and regulatory demand, and the return across four, five, and six years."
    },
    {
      id: "u7l2", title: "Measuring Training Effectiveness: Failure Rates, Total Time to Repair, Competencies, User Satisfaction", domain: 4, obj: "EDU-B", minutes: 9,
      body: `Six months ago you spent $21,000 sending two technicians to a pump school. Your director asks what the hospital got for it. "They know a lot more now" is not an answer, and next year's education line depends on your having a better one. The measures you need are already in the system; what is missing is a baseline you were supposed to capture before anyone left.

## Before and after, on measures you already collect
\`\`\`
Measure                          12 months   12 months   Read
                                 before      after
Repeat repairs within 30 days       19           6        improved
First-time fix rate                 58%         84%       improved
Total time to repair, median      4.6 days   1.3 days     improved
Vendor labor invoiced            $31,400     $6,900       improved
Contract and warranty calls          41           9        improved
placed on this fleet
Documented competent on the      1 of 6      5 of 6       improved
model
Survey score, technical             3.8         4.5        improved
competence, on those units
Calls coded as use error             22          20       did not move
\`\`\`
Eight lines moved and one did not, and the one that did not is the most useful line on the table. Use error is a clinical-user problem, and technician training was never going to touch it, so the next program belongs in the unit rather than in the shop. Capture every one of these before the first person travels. A baseline you reconstruct afterward is an argument, not evidence.

## Cost per trained technician
Total program cost divided by the number of people who came out competent. It is the number that decides how you buy training, not whether you buy it.
\`\`\`
Option                      Total cost   Trained   Cost each
One seat at the factory       $12,300        1      $12,300
On-site delivery for six      $26,000        6       $4,333
\`\`\`
The on-site class costs more in total and less than half as much per person, and the trade is instructor quality and content. Ask one question before you sign: is this the same class the manufacturer's own service staff sit in, or a shorter version built for customers? Check with managers whose people have actually attended, rather than assuming that the maker's own school is automatically the better or cheaper one.

## Documenting it, and deciding what happens next
The result belongs in three places: the employee's training record, the competency record against the model in the **CMMS**, and your annual education report to the environment of care committee, next to completion and repair-time trends the committee already follows. Then make a decision in writing. Repeat the program, change the provider, change the delivery from travel to on-site, extend it to a second person so the skill has a backup, or stop buying it. A program nobody ever evaluated gets renewed by habit and canceled by a budget cut, and neither of those is a management decision.

> Exam tip: evaluate training on cost, failure rates and repeat repairs, total time to repair, staff competencies and skill set, and user satisfaction, measured before and after. Cost per trained technician is what decides factory travel against on-site delivery, and the baseline has to be captured before the training happens.`,
      hook: "Training effectiveness is proved by comparing failure rates, repeat repairs, total time to repair, documented competencies, vendor cost, and user satisfaction against a baseline captured before anyone traveled."
    },
    {
      id: "u7l3", title: "Technical Training: Model-Specific, Manufacturer-Provided, Negotiated Into the Purchase", domain: 4, obj: "EDU-C", minutes: 9,
      body: `The quote for four new ultrasound systems is on your desk and the sales representative wants a decision this week. The price is fine. The thing you will never be able to buy later is on page four, in the terms nobody reads: service training, service documentation, and software access. After the purchase order is signed you have no leverage at all, because the money has already moved.

## What model-specific technical training unlocks
Service-level training is rarely just knowledge. It is usually the key to a set of things the manufacturer releases only to people who have attended.
\`\`\`
What it unlocks           Why it matters afterward
Service software and      without them a fault you have diagnosed is
service keys              still a vendor visit
Service-level manuals     operator manuals do not carry the schematics,
                          error code tables, or calibration procedures
Parts eligibility         some makers sell certain assemblies only to
                          trained personnel
Calibration and           the procedure that proves the device meets
verification procedures   specification before it goes back to a patient
Standing with the maker   a trained technician gets a different
                          conversation on the support line
\`\`\`

## Negotiating it into the purchase
There is no law that makes a manufacturer sell you service training, which means every term you want has to be written into the agreement while the sale is still in doubt. Some makers price training high on purpose so that a service contract looks cheap beside it; that pricing is a negotiating position, not a cost.
\`\`\`
Term to put in writing              Why it matters
Number of seats and the level       one seat trains one person, and an
                                    operator class is not service training
The same class the maker's own      customer-only classes sometimes leave
service staff attend                out the troubleshooting you need most
Delivered inside the warranty       a seat you cannot use is not a seat.
period, or the warranty extended    If the class slips, the warranty moves
until it is delivered
Travel and lodging named            a free seat with $3,000 of travel
                                    attached is not a free seat
Manuals, software, service keys,    this is what makes the training
passwords, updates, and technical   usable, and it has to last as long as
support for the life of the device  the device does
A price locked as if you were       even if you are not sure you will go,
attending                           a locked price beats a promise
Payment withheld until the          the strongest tool a manager has, and
materials arrive                    the one most often left out
\`\`\`
Ask your materials management or accounting partner whether training should sit as its own line on the purchase order or be folded into the capital purchase. It matters to them because training cannot be depreciated the way equipment can, and the answer differs between employers. Also get the maker's sales people and service people talking to each other in front of you, because a seat that sales promised and service never booked leaves you with a signed deal and no training plan.

## Third-party schools, cross-training, and the record
Price independent trainers against the maker every time. They are often cheaper, sometimes teach more, and have no reason to hold back the troubleshooting that keeps hospitals buying contracts. Judge them the same way: ask people who sat in the class.

Then make the skill survive one person. Every critical model needs at least two competent people, which is also how a department builds a succession plan rather than discovering one on the day a senior technician resigns. Record it all in the **CMMS** against the model and the person: who was trained, by whom, at what level, on what date, what the certificate says, and when a refresher is due. That record is what you hand a surveyor who asks how you know the person who services ventilators is competent to do it.

> Exam tip: negotiate training, manuals, software, service keys, passwords, updates, and support into the purchase agreement before the sale closes, delivered inside the warranty period or the warranty extended until it is. After the purchase order is signed there is no leverage left, and every critical model needs two trained people rather than one.`,
      hook: "Model-specific service training unlocks software, keys, documentation, and parts, and it has to be negotiated into the purchase agreement with travel, materials, and a delivery date, because after the sale there is no leverage left."
    },
    {
      id: "u7l4", title: "Regulatory, Safety, and Soft-Skills Training", domain: 4, obj: "EDU-C", minutes: 9,
      body: `A surveyor stops one of your technicians in a corridor and asks how he decontaminates a device before he opens it. He answers well. Then she asks to see the record that says he was taught, and that is the half that fails. Required training is two documents: the teaching and the proof.

## The training the hospital owes, and the record it leaves
\`\`\`
Training                       Who usually owns it     The record you hold
General safety and the         the hospital, at hire   attendance with the
emergency codes                then annually           date, in the file
Infection control and the      infection prevention,   attendance plus the
handling of contaminated       with the department     procedure taught
devices
Hazard communication for       the hospital safety     attendance, plus the
chemicals in the shop          program                 chemical inventory
                                                       and labels on site
Electrical safety, lockout     the department          attendance plus a
and tagout                                             competency sign-off
Radiation safety, where        the radiation safety    attendance, reported
staff enter controlled areas   committee               to that committee
Laser safety, where lasers     the laser safety        attendance and the
are serviced or supported      program                 eyewear issued
Privacy and information        the privacy and         attendance, annually
security, including HIPAA      security officers
Cybersecurity awareness        information technology  attendance, annually
Regulatory and code            the department, from    attendance plus the
compliance for the equipment   the equipment plan      topics covered
program
Department policy and the      the manager             a signature that the
procedure manual                                       manual was read
\`\`\`
Every line has an annual refresher or a defined interval, and every line is evidence somebody will eventually ask for. Keep it as a matrix with one row per person and one column per topic, holding the date completed and the date due. Read it monthly, not in the week before a survey.

## Soft skills are not an extra in this department
Technicians spend their day explaining technical findings to people who have a patient waiting. That is a skill, it can be taught, and the absence of it shows up directly in your satisfaction scores.
\`\`\`
Soft skill             What it prevents
Communication          the correct technical answer that the nurse
                       cannot use, which becomes a second call
Customer service       the repair that was fast and is remembered as
                       slow because nobody said anything
Conflict handling      a unit relationship that sours and turns every
                       future call into an escalation
Written work           a service report a surveyor, a risk manager, or
                       a lawyer cannot follow four years later
\`\`\`
Buy it the same way you buy technical training: a short course, then reinforcement in shop meetings and in the moment. It also travels further than a model-specific class, because it applies to every call a technician takes.

## What the surveyor actually reads
Three things, in this order: that a required topic exists for the role, that each person has a completed date inside the interval, and that the content matches what the person just told her in the corridor. Gaps are findings, but an undocumented completion is the same finding as a missed class, so chase the signature with the same energy you chase the attendance.

> Exam tip: required training covers safety, infection control, hazard communication, electrical safety, radiation and laser safety where they apply, privacy and information security, cybersecurity awareness, regulatory and code compliance, and the department's own policies, each with an interval and a dated record. Soft skills sit alongside them, not below them.`,
      hook: "Required training is both a curriculum and a dated record per person, covering safety, infection control, hazard communication, privacy, cybersecurity, regulatory compliance, and department policy, with soft skills bought the same deliberate way."
    },
    {
      id: "u7l5", title: "Orientation and Initial Training: Mentor, SOPs, Shop and Facility", domain: 4, obj: "EDU-C", minutes: 9,
      body: `A new technician starts Monday. If nobody has planned her first ninety days, the department will teach her by accident: she will learn whatever the person sitting nearest her happens to do, including the habits you have been trying to end for two years. Orientation is the cheapest quality improvement a manager ever gets to make, and the window closes fast.

## What the orientation plan contains
\`\`\`
Element                     What it covers
Facility orientation        the hospital's own program: codes, fire
                            response, privacy, infection control,
                            badge, parking, and payroll
Department orientation      the scope of service, who the customers
                            are, the on-call rules, escalation, how a
                            call reaches the shop
Shop and tool control       bench layout, test equipment and its
                            calibration status, tool sign-out, parts
                            stores, hazardous materials
The CMMS                    how to open, document, and close a work
                            order to the department's standard, and
                            what a complete record holds
SOPs and the equipment      the procedure manual and the medical
plan                        equipment management plan, read and
                            signed for
Safety training             electrical safety, lockout and tagout,
                            decontamination before service, personal
                            protective equipment for her areas
Assigned mentor             one named experienced technician, with
                            protected time and a written goal
Initial competency          the list of skills and models she must be
checklist                   signed off on, and in what order
Milestones                  what has to be true at 30, 60, and 90 days
\`\`\`

## The mentor, named and resourced
Pick one person, tell them what a successful ninety days looks like, and protect the hours. A mentorship that is assumed rather than scheduled becomes "ask me if you get stuck," which produces a technician who does not ask. Pair deliberately as well: the best diagnostician in the shop is not always the best teacher, and the person whose habits you want copied matters more than the person with the most years.

## Nothing goes out alone until somebody signs for it
Initial competency is a document, not an impression. It names the model or the skill, the method used to assess it, the assessor, and the date, and it exists before the new technician works unsupervised on that device. Build it in order of risk: the devices she will be called to most, and the life-support and critical items, come first.
\`\`\`
Initial competency record, week six
Skill or model            Method             Assessor   Date     Result
Electrical safety test    observed           lead       day 12   competent
General infusion pump     observed PM plus   lead       day 24   competent
                          one repair
Vital signs monitor       observed PM        senior     day 31   competent
Work order documentation  record review,     manager    day 33   competent
                          five closed jobs
Ventilator                observed, not      senior     day 40   in training
                          yet signed
\`\`\`

## The probationary review
Most employers run a formal review at the end of a probationary period, and it decides whether the hire holds. Bring nothing new to it. If attendance, documentation, or a competency has been a problem at week five, it was a conversation at week five and a note in your file at week five. Use the review to confirm what is already known, to set the first goals, and to start the development plan, and if the fit is wrong, say so there rather than six months later.

> Exam tip: orientation covers the facility, the department, the shop and tool control, the CMMS, the SOP manual and the equipment plan, and safety, with an assigned mentor, a documented initial competency checklist, and milestones at 30, 60, and 90 days. Nobody works unsupervised on a device before the sign-off for that device exists.`,
      hook: "A new technician's first ninety days are a written plan: facility and department orientation, shop and tool control, the CMMS, SOPs, safety, a named mentor, a documented competency checklist, and milestones at 30, 60, and 90 days."
    },
    {
      id: "u7l6", title: "Operator Training Against Failure Trending and Use Error, and for New Equipment, Applications, and Staff", domain: 4, obj: "EDU-D", minutes: 10,
      body: `Thirty-one calls on one pump model in four months, and twenty-two of them closed as cannot duplicate. The devices are fine. The problem is in the units, the cost is landing in your labor budget, and the fix is education rather than a repair. Finding that pattern is a management activity, because nobody standing at a bedside can see it.

## Reading the trend to find the use error
Sort the calls by where they came from before you sort them by what was wrong.
\`\`\`
Where the calls came from   Calls  Cannot    What it points at
                                   duplicate
5 east, nights                16        14   one shift with one habit
5 east, days                   4         2   same unit, already trained
3 west, all shifts             6         3   a new intake of residents
Outpatient clinic              5         3   a drug library change made
                                             in June
Totals                        31        22
\`\`\`
The signals that mean training rather than repair are consistent: clusters of use-error and cannot-duplicate codes, which some departments call the no fault found calls, damaged accessories and cables, repeat calls from one unit or one shift, alarms that staff are silencing instead of answering, and spikes that follow an intake of residents or travelers, a software update, or a configuration change. Each of those is a different conversation, and the trend tells you which one.

## Facilitating the training rather than delivering it
You are not the clinical educator and you should not try to be. Bring the data to the unit's educator and, where the device is new or complex, the manufacturer's clinical specialist. You supply the pattern, the device knowledge, and the dates; they supply credibility with the staff and the authority to pull people off the floor. Observing the user with the device for an hour is worth more than a slide: setup habits, technique, and one wrongly saved preset explain most of what the trend showed.

Then go to every shift. The table above puts fourteen of twenty-two findings on nights, and a single daytime in-service would have missed all of them.

## The four changes that are always a training event
\`\`\`
Change                        What the training has to achieve
New equipment                 operator training before first clinical
                              use, on every shift that will touch it
New clinical application      a new procedure on a device the unit has
                              had for years is new training
New or rotating staff         residents, travelers, agency staff, and
                              new hires arrive without your in-service
Database or configuration     a new drug library, preset, alarm default,
change                        or network change teaches old users a new
                              device even though nothing was replaced
\`\`\`
Record attendance every time: date, unit, shift, topic, who delivered it, and who was present by name. That record answers the accreditor, and the names tell you which shift to go back to.

## Prove the calls stopped
Count the same calls for the next three months against the same four months you started with. If cannot-duplicate calls on that model fall and stay down, the program worked and belongs in next year's plan. If they fall on days and hold on nights, you have your next in-service and the shift to deliver it on.

> Exam tip: use error is spotted on the service call itself and coded there, then trended by department, model, and shift before any training is planned. New equipment, new clinical applications, new or rotating staff, and database or configuration changes are all training events, and the in-service runs on every shift with attendance recorded by name.`,
      hook: "Failure trending finds use error by sorting calls by unit, shift, and model, then the manager brings the pattern to clinical educators and vendor specialists, trains every shift, records attendance, and counts whether the calls stopped."
    },
    {
      id: "u7l7", title: "Manuals and Media, and Collaboration with Non-Clinical Departments", domain: 4, obj: "EDU-G", minutes: 9,
      body: `The one technician who knew the service passwords for the sterilizer fleet retired in March. Nobody can get into the machines, the maker wants a visit charge to re-enter them, the service manuals were in a cabinet somebody cleared out, and the operations manual on the unit was lost so long ago that the staff have started calling you to ask how to run a cycle. None of that is a technical failure. It is a library nobody owned.

## The library, and who owns it
\`\`\`
Material                    Where it lives and who keeps it current
Service manuals, per model  one indexed location technicians can reach
                            on and off shift, named owner, review date
Operations manuals          a copy for the department and copies on the
                            units, because a unit's lost manual turns
                            into a service call
Software, firmware images,   stored securely, with a retrieval path that
service keys, passwords      survives the person who set them up
Training media              recordings, slides, job aids, and quick
                            reference cards made after every school, so
                            one seat teaches the whole shop
Vendor portal accounts      registered to roles rather than to people,
                            with the renewal date tracked
Version control             one named owner and a review date, so
                            superseded revisions come out and nobody
                            works from an obsolete procedure
\`\`\`
Two rules make the difference. Materials are requested in writing at purchase, not asked for later as a favor, and access never depends on a single person's memory.

## What the purchase agreement has to say
Require every item the department will need in order to keep the device going: the service and operations manuals, the passwords and service keys, the software and firmware together with its updates, and the maker's technical support, all of it supplied for as long as the hospital keeps the device in service. Then arrange with materials management that payment can be withheld until those items have actually arrived. Where your state has adopted the healthcare facilities code, most of that list is already a legal obligation, and naming the requirement explicitly costs nothing even where the state has not. Word it carefully and check the wording with managers who have bought from the same company recently, because a vendor's lawyer reads "available on request" very differently from the way you meant it.

## Collaboration with the departments that are not clinical
Most of what the department actually needs comes from four partners, and the collaboration works in both directions: they train your people and you train theirs.
\`\`\`
Partner                 What you work out together
Infection prevention    how devices are cleaned and disinfected
                        between patients, what must be decontaminated
                        before the shop opens it, which agents damage
                        which materials, and how reprocessing devices
                        are validated and monitored
Facilities management   normal and emergency power branches, water,
                        medical gases, ventilation in procedure rooms,
                        construction and utility interruption, and who
                        responds to what at two in the morning
Materials management    purchase orders and terms and conditions,
                        receiving and incoming inspection, consumables
                        and single-use items, and withholding payment
                        until deliverables arrive
Information technology  addresses and network segments for networked
                        devices, patching windows, interface failures,
                        security and remote vendor access, and a joint
                        path for an incident that could be either the
                        device or the network
\`\`\`
Put the relationship in writing where it matters: who is called, in what order, and who owns the decision. The three in the morning telephone call is a bad time to discover that nobody agreed.

> Exam tip: the manager assures the availability of service manuals, operations manuals, software, keys, passwords, updates, and training media, requested in writing at purchase with payment held until delivery, under one named owner with a review date. Collaboration runs with infection prevention, facilities management, materials management, and information technology.`,
      hook: "Service and operations manuals, software, keys, passwords, and training media are a managed library with an owner and a review date, secured in the purchase agreement, and maintained alongside infection prevention, facilities, materials management, and information technology."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Human Resources and Labor Law", domain: 5,
  blurb: "Hiring, evaluating, developing, paying, and protecting the people who do the work.",
  assumes: "Nothing. This unit stands on its own.",
  lessons: [
    {
      id: "u8l1", title: "Job Descriptions, Selection, Retention, and Termination", domain: 5, obj: "HR-A", minutes: 10,
      body: `Your strongest technician resigns on a Tuesday. In the exit conversation he tells you he left because there was nowhere to go: one job title, one pay grade, and nothing above it. Replacing him is estimated to cost more than one and a half times his annual salary, before you count the weeks of equipment nobody can repair, and the first cause of it was a document you never wrote.

## The ladder is built before anybody is hired
Nobody can be promoted into a job that does not exist. If the department holds a single description called technician, then the only career move available to a good technician is to leave. Write the whole range at once so the levels fit together and each one is a real step up in duty and pay: entry, mid, senior, specialist by modality, lead, and supervisor. Even a two-person department needs at least eight descriptions and steps on the books, because future positions are far easier to create as one coherent set than one at a time under pressure.

## What a job description holds
\`\`\`
Section                     What goes in it
Title and pay grade         the step on the ladder, and the grade that
                            sets the pay range
Reporting line              who the person reports to and who, if
                            anyone, reports to them
Purpose                     two sentences on why the job exists
Duties                      what the person actually does, in the order
                            that consumes their time
Education and experience    the minimum the hospital will accept, and
                            what it prefers
Certification               whether a credential is expected, required,
                            or rewarded at this step
Physical requirements       lifting, standing, reaching, climbing, and
                            the environments entered, written honestly
Working conditions          shifts, on-call, travel between sites,
                            exposure to patient care areas
Competencies                the assessed skills the person must hold or
                            acquire, which the evaluation then measures
\`\`\`
The description is not paperwork. It is what you post, screen against, interview from, evaluate against, pay from, and, if it ever comes to it, defend a decision with.

## Selection, run with human resources rather than around them
1. Post against the written description, internally first if the hospital requires it.
2. Screen every application against the same stated minimums, and record why each was in or out.
3. Interview with the same structured questions for every candidate, in the same order.
4. Add a practical skills assessment, because an interview measures how well somebody talks about repair work.
5. Verify references, education, and any credential claimed, through human resources.
6. Document the reason for the choice in job-related terms.
7. Let human resources make the offer, because they own the pay range, the start date, and the paperwork.

## Retention, and the thing managers get wrong about it
The direct manager is the single biggest influence on whether people stay. Managers consistently rank what motivates staff as salary, bonuses, vacation, retirement, and other benefits first, with interesting work, involvement in decisions, feedback, training, and respect below them. Employees rank it the other way round: the five communication items first, and the money items last. Pay that is clearly below market will drive someone out, but pay alone will not keep anyone in a job that is dull and in which nobody is consulted. So retention is managed on all of it at once: competitive pay, development that visibly goes somewhere, recognition that is real, a workload somebody can survive for years, and a shop culture people want to spend their day inside.

## Termination done correctly
Termination is the last step of a documented path, never the first response to an event. Progressive discipline means the conversation, then the written warning, then the performance improvement plan with dates and support, then the decision, with each step recorded when it happened and not reconstructed afterwards. Human resources is in it from the beginning, the same standard is applied to every employee in comparable circumstances, and the meeting itself is short, private, and attended by human resources. Then close the practical loop: badge, keys, tools, parts access, vendor portal accounts, system accounts, and the service passwords that only that person knew.

> Exam tip: a full ladder of job descriptions and pay grades comes first, because promotion requires a job to be promoted into, and even a two-person department needs at least eight. Selection is structured and documented with human resources, retention rests on interesting work, involvement, feedback, training, and respect, and termination is the last step of a documented, consistently applied path.`,
      hook: "A complete ladder of job descriptions and grades comes before hiring, selection is structured and documented with human resources, retention rests on involvement and feedback more than pay, and termination is the last documented step of a consistently applied path."
    },
    {
      id: "u8l2", title: "Performance Evaluations: Compensation, Organizational Values, Engagement", domain: 5, obj: "HR-B", minutes: 10,
      body: `The evaluation form is due Friday and you are about to write down three criticisms the technician has never heard. Stop there. An annual review that contains new information is a management failure being disclosed in writing, and the employee will spend the meeting defending himself instead of agreeing to anything.

## The cycle the review sits inside
\`\`\`
When                What happens
All year            feedback in the moment, good and bad, with a dated
                    line in your own notes each time
Mid-year            a short scheduled check against the goals, in
                    writing, so nothing can be a surprise in month ten
Before the review   the employee's self-assessment, and your pull of
                    the numbers from the CMMS and the survey
The written review  rated against the goals and the competencies that
                    were agreed at the start of the period
The conversation    private, scheduled, with the document already read
After               the compensation decision, the signature, and the
                    next period's goals and development plan
\`\`\`

## Rated against goals and competencies, which is what pay is set from
\`\`\`
Area                        Goal set        Result     Rating
Scheduled maintenance       95 percent      97         exceeds
completion, assigned list    monthly
Paid hours documented       85 percent      79         below
against an asset or
department
Repeat repairs on the       fewer than 4    2          exceeds
assigned fleet              per quarter
Competency sign-offs        4 new models    4          meets
completed
Response to priority one    15 minutes      14 min     meets
calls
Observance of               see notes       consistent meets
organizational values
Engagement                  see notes       strong     exceeds
\`\`\`
Rate the work against what was agreed, not against the person you wish you had. Compensation follows the rating wherever the hospital's policy allows it, and where it does not, say so plainly rather than implying a raise you cannot deliver. One line in that table is below goal, and it is below goal by a defined amount against a defined target, which is what makes it a development conversation rather than an accusation.

## Organizational values and engagement, evaluated on behavior
Both are real criteria and both are easy to fake. Tie them to things you watched happen. Values show up as how a technician treats a nurse at the worst moment of her shift, whether a problem gets escalated or hidden, and whether the documentation is honest when nobody will check. Engagement shows up as bringing problems with a suggestion attached, helping a new hire without being asked, and turning up to the improvement conversation. Write the example, not the adjective: "reorganized the pump store after the audit finding, unprompted" survives a challenge, and "has a great attitude" does not.

## Keeping bias out
\`\`\`
Trap                        What it does to the rating
The last six weeks          a strong or weak recent month stands in for
                            the whole year
One strength or one         a single impressive or annoying trait colors
failure colors everything   every unrelated area
Rating the person most      the technician who thinks like you looks
like you higher             better than the one who does not
Everyone in the middle      ratings bunch at average so no conversation
                            is required, which devalues the strong
                            performers and protects the weak ones
Everyone rated high         the review stops carrying information and
                            cannot support any pay or promotion decision
\`\`\`
The defense against all five is the same: dated, specific evidence collected across the whole period, with the numbers pulled from the system rather than remembered.

## Writing it and holding the conversation
Write in specifics with dates and figures, in neutral language, describing behavior and results rather than character. Give the employee the document before the meeting so the conversation is about what happens next. Let them respond, record their comments, both sign it, and file it. Then start the next period by agreeing the goals, because an evaluation that ends without new goals has told somebody how they did and nothing about what you want.

> Exam tip: nothing in an annual review should be new information, because feedback is the manager's job all year. Performance is evaluated against agreed goals and competencies to determine compensation, alongside observance of organizational values and engagement, with dated and specific evidence, communicated in writing and signed.`,
      hook: "An evaluation rates agreed goals and competencies to set compensation, judges values and engagement on observed behavior, keeps bias out with dated evidence, and contains nothing the employee has not already heard."
    },
    {
      id: "u8l3", title: "Development Plans, Competency Assessment, Certification, and Recommendations to Human Resources", domain: 5, obj: "HR-B", minutes: 9,
      body: `A technician tells you she wants to move into imaging. You can say yes, say no, or write a plan. Only the third answer keeps her, and only the third answer gives you a second person on a fleet where you currently have one.

## The performance development plan
A development plan is not a wish list. It names what the person will be able to do, the gap between that and today, who closes the gap, what it costs, and the date you will both look at it again.
\`\`\`
Development plan, period starting January
Goal         be signed off on the general radiographic fleet
Gap today    no service training on the modality, no competency
             sign-offs, no experience with the test equipment
Step 1       shadow the imaging specialist two days a month,
             February through May, protected time
Step 2       manufacturer service school, 4 days, $6,800 plus
             travel, requested in the education plan for Q3
Step 3       supervised scheduled maintenance on two rooms, with
             observed sign-off by the specialist, by November
Step 4       added to the imaging on-call rotation in January
Review       with the mid-year check, and again at the evaluation
\`\`\`
Three things make it real: a date on every step, a budget line for anything that costs money, and protected time for the steps that do not. A plan whose first step is "when things are quieter" never starts.

## Competency assessment, initial and ongoing
Competency assessment of the people who service medical equipment is required by the accreditor and has to be documented however you do it. It is assessed initially, before someone works unsupervised, and then on an ongoing basis, organized both by device and by skill.
\`\`\`
Method                      What it is good at, and its weakness
A written or practical      thorough, and the hardest to build, because
test                        every technician's assignment differs so one
                            test rarely fits the whole shop
Self-assessment against a   fast, covers everything, and gives you a
list of skills and models   training plan for free. Must be spot-checked
                            by the manager or it drifts optimistic
Observed scheduled          watches the real work on the real device.
maintenance                 Covers only what is scheduled that month
Review of repeat repairs    uses data you already hold and points
                            straight at a skill gap. Also catches bad
                            parts and bad devices, so read it carefully
                            before you conclude it is the technician
\`\`\`
Most departments use a combination: the self-assessment for coverage, observation for the critical devices, and repeat repairs as the check that the other two are telling the truth.

## Certification as a development goal and a differentiator
Tie defined steps in the career ladder to a credential and reward achieving it financially where the compensation policy allows. The fear that certifying people helps them leave is backwards: training and development bind a technician to an employer who pays fairly and takes the work seriously, and a department of certified staff is the easiest competence argument you will ever make to a surveyor. Track the renewal cycles too, because a credential allowed to lapse takes a ladder step and a pay differential with it. Thirty continuing education units across a three-year cycle keeps the manager credential current, and your staff's technician credentials run on their own cycles.

## Recommendations to human resources, and the evidence each one needs
\`\`\`
Recommendation        What human resources needs from you
Promotion             the higher job description, the evaluations, the
                      competency records, and what changes in the
                      department when they move
Pay adjustment        the grade, the comparable roles inside and
                      outside, and the market data, not an anecdote
Discipline            dated records of what happened, what was said
                      before, and how comparable cases were handled
Accommodation         the essential functions of the job and what has
                      been asked for. Never a diagnosis
Termination           the whole documented path, with every prior step
                      recorded at the time it happened
\`\`\`
Bring them in before you act rather than after. They own the process, the consistency across the hospital, and the legal exposure; you own the job, the facts, and the record.

> Exam tip: a performance development plan carries goals, the training that closes the gap, timelines, and a review date. Competency assessment is required and documented, done initially and on an ongoing basis, by test, spot-checked self-assessment, observed scheduled maintenance, or review of repeat repairs, and every recommendation to human resources arrives with the evidence that supports it.`,
      hook: "Development plans name the goal, the gap, the training, the cost, and the review date; competency is assessed initially and continuously by test, spot-checked self-assessment, observation, or repeat repairs; and certification is tied to the ladder and rewarded."
    },
    {
      id: "u8l4", title: "Goals, Coaching, Mentoring, Recognition, and Conflict", domain: 5, obj: "HR-C", minutes: 10,
      body: `"Do better on documentation" is not a goal. It cannot be measured, it has no date, and at the review you and the technician will disagree in good faith about whether it happened. Everything in personnel management that works has the same quality: it is specific, it is written down, and it is said close to the event rather than months later.

## Goals that a number can settle
\`\`\`
What managers write        What the goal should say
Be more productive         document 85 percent of paid hours against an
                           asset or a clinical department, by the end of
                           the second quarter
Improve your scheduled     complete 95 percent of assigned scheduled
maintenance                maintenance each month for six consecutive
                           months
Be better with customers   no escalated complaints, and a technical
                           competence score at or above 4.3 on the
                           annual survey in your assigned units
Learn imaging              pass the general radiographic service school
                           by October and hold two observed competency
                           sign-offs by December
\`\`\`
Write the desired result rather than the activity. A goal that names the desired result says what will be true when the work has succeeded, which is the only version two people can check the same way a year later. Individual goals come down from the department's goals, which cover financial performance, scheduled maintenance completion, customer satisfaction, response time, repeat repairs, and use errors. Share those with everybody and explain why each one matters, so a technician can see how his own list adds up to the department's. Then set the individual goals with the person rather than for them. A goal the employee helped write gets worked at; a goal handed down gets quoted back at you.

## Coaching, in the moment
Coaching is continuous and specific, and it happens near the event. Name the behavior, say what it cost, show the better version, ask for agreement, and write one dated line in your notes. Five minutes at the bench outranks a paragraph in a review eight months later, and it is the only way the review ends up containing nothing new.

## Mentoring, with time protected
Pair a new or developing technician with an experienced one, name both, give the mentor the goal in writing, and schedule the hours. Mentoring that is assumed turns into "ask me if you get stuck," which produces a technician who does not ask. Choose for teaching ability and for habits you want copied, not only for years of service.

## Recognition that is worth having
Financial incentives are difficult to arrange in a hospital, and managers overestimate how much they matter. Try the exercise: rank the motivators you believe your staff care about, then ask them to rank the same list themselves. Managers usually put pay, bonuses, and benefits near the top, while technicians usually put interesting work, a say in decisions, feedback, training, and plain respect above the money items. That gap is the useful part, because the motivators your staff name are the ones a supervisor can hand out this week without a budget line, while the ones managers guess at need a compensation committee. Recognition works when it is specific, prompt, and visible to peers: name what the person did and what it achieved, in front of the shop or in the committee report where their work actually landed. Recognition fails when it is late, generic, or distributed to everyone equally, because at that point it is attendance.

## Conflict, handled early and written down
1. Act early. Conflict left alone becomes two camps and then a staffing problem.
2. Hear each person separately, on facts and behavior rather than on character.
3. Check what the policy and the job descriptions actually require, so the resolution rests on something other than your preference.
4. Bring them together, agree what will be different, and be explicit about what is not negotiable.
5. Put the agreement in writing to both, and set a date to check it held.
6. Involve human resources as soon as the conflict touches protected ground, alleges harassment or discrimination, or looks likely to end in discipline.

Document improvement opportunities the same way: write it when it happens, in neutral language, with the date and the specifics. Every periodic evaluation is communicated in writing and signed, because a conversation nobody recorded did not happen as far as anybody outside the room is concerned.

> Exam tip: goals are measurable and dated and ladder up from the department's goals; coaching is continuous, specific, and close to the event; mentoring needs a named pair and protected time; recognition beats money for most technicians when it is specific and prompt; and conflict is addressed early, on the facts, with the agreement and every periodic evaluation put in writing.`,
      hook: "Measurable dated goals drawn from the department's own goals, coaching in the moment, a named mentor with protected time, specific and prompt recognition, and conflict addressed early on the facts and recorded in writing."
    },
    {
      id: "u8l5", title: "Facilitating Change; Hearings and Investigations", domain: 5, obj: "HR-C", minutes: 9,
      body: `You are moving the department from paper work orders to entry on a handheld at the bedside. Two technicians have already told the shop it will never work, and one of them is the person everybody else listens to. The handhelds are not the problem. A change explained is implemented; a change announced is resisted, and the difference is almost entirely in what you did before the switch.

## Why before what
1. Explain the problem it fixes, in terms the shop cares about: less double entry, no evening spent catching up on paper, a record that is complete when a risk manager asks.
2. Bring the people who will do the work into the design. Let them choose the field order, the templates, and the spots where a signal is weak.
3. Train before the switch, not during it, and train the quiet ones privately so nobody has to look slow in front of peers.
4. Pilot it with volunteers on one equipment type, fix what the pilot finds, and say publicly what you changed because of it.
5. Measure what happened and publish it, both the win and the cost.
6. Recognize the people who made it work, by name.
7. Keep repeating the why for months, because the reason fades faster than the inconvenience.

\`\`\`
What you hear              What is usually underneath    What answers it
"We have always done it    fear of looking slow in       training before
this way"                  front of the shop             the switch, and
                                                         done privately
"It will take longer"      it probably will at first     name the learning
                                                         curve and the date
                                                         you expect it to
                                                         end
"Nobody asked us"          they are right                bring them into
                                                         the design now and
                                                         say so out loud
"The last change failed"   they are right about that     say what is
                           one too                       different this time
"The clinicians will       sometimes true, and worth     pilot it and find
hate it"                   finding out early             out
\`\`\`

## Hearings and investigations, where you act for the organization
Sooner or later you will be asked to take part in a personnel matter formally: an internal investigation, a grievance hearing, an unemployment or discrimination claim, or an arbitration under a collective bargaining agreement. You are there on behalf of the organization, which makes your job narrow and important.
\`\`\`
Your role         a witness to facts and the keeper of the records.
                  Not the judge, not the prosecutor, not the advocate
Preparation       be briefed by human resources, and by legal counsel
                  where they are involved, before you say anything.
                  Read your own documentation first so your account
                  and the record agree
What you bring    dates, documents, work orders, evaluations, and
                  written warnings. Not impressions, not hearsay,
                  not what the shop thinks
Consistency       the same facts gathered the same way for every
                  employee, and comparable cases treated comparably.
                  This is what keeps the hospital out of court
Confidentiality   discuss it with nobody outside the process,
                  including the rest of the department, however much
                  they ask
Documentation     contemporaneous, neutral, dated. A note written on
                  the day outweighs a better-worded one written later
Never             promise an outcome, retaliate against a participant,
                  interview alone where human resources should be
                  present, discuss it with the other staff, or change
                  a record after the fact
\`\`\`
The habit that makes all of this survivable is built years earlier: write things down when they happen. Managers who document routinely walk into a hearing with the answer already on paper, and managers who do not spend the hearing explaining why there is nothing in the file.

> Exam tip: facilitating change means explaining why first, involving the staff who will do the work, training before the switch, measuring, and recognizing the people who made it work. In a personnel hearing or investigation the manager is a factual witness for the organization: briefed by human resources, prepared from the records, consistent across employees, confidential, and never the person who promises an outcome.`,
      hook: "Change is facilitated by explaining why, involving the staff, training before the switch, measuring, and recognizing the people who made it work; in a hearing the manager is a prepared, consistent, confidential factual witness for the organization."
    },
    {
      id: "u8l6", title: "Staffing Levels, the Cost of a Biomed, Incentives, and Pay Equity", domain: 5, obj: "HR-C", minutes: 9,
      body: `There is a hiring freeze, the on-call rotation is down to three people, and a technician has just put a job posting from the hospital across town on your desk showing four dollars an hour more than he earns. Three different problems, all three yours, and all three answered with numbers rather than opinions.

## Coverage, not just workload
Workload tells you how many hours of work exist. Coverage tells you how many people you need to hold the hours open.
\`\`\`
Coverage question              What it forces into the headcount
How often does each person     a rotation of one week in three wears
take on-call                   people out and they leave. One in four
                               or one in five is sustainable
Does a second shift survive    one person on evenings means no evening
leave                          cover for every vacation and illness
Does every critical skill      a single trained person on sterilizers,
have a second holder           imaging, or the laboratory is a single
                               point of failure with a resignation date
                               you cannot predict
How much time is travel        separate sites and clinics consume hours
                               that produce nothing
What is not device work        meetings, rounding, projects, incidents,
                               committees, inventory, and training
\`\`\`
Roughly 1,200 to 2,000 inventoried items per technician is a first pass and a sanity check, nothing more: it ignores complexity, ignores what sits on contract, and moves with how the inventory was counted. Refine it with inventory value, risk mix, number of sites, and scope.

## The cost of one technician, written out
\`\`\`
Line                                           Figure
Salary, a hospital-employed technician         under $100,000 a year
Divided by 2,080 paid hours                    under $50 an hour
Plus about 25 percent for benefits
Plus about another 20 percent for supervision
and unproductive time
Fully loaded cost to the hospital              at most about $72 an hour
First year only
  Tools and test equipment                     one-time
  Model-specific training                      one-time
  Uniforms, radio, and licenses                one-time
\`\`\`
Fully loaded means the whole overhead that arrives with a person: benefits, supervision, and the hours nobody produces work in. That figure is the whole argument. It sits below any outside hourly rate and below the labor built into most service contracts, which means a hospital is usually better off holding more of the cheap resource than buying more of the expensive one. Write the request that way: name the contract you will decline or the vendor labor you will stop buying, put the loaded cost of the position beside it, and leave deliberate slack in the new role so it also absorbs backlog.

## Incentives that achieve the result, and the ones that backfire
\`\`\`
Incentive                      What it actually produces
Certification differential     pays for proof of competence and holds
                               trained people. Works
On-call and shift pay          buys coverage nobody volunteers for.
                               Works, where the rotation is written
                               down and the pay is budgeted
Specialty skill differential   keeps a lone imaging or laboratory
                               specialist from leaving. Works
Recognition and a real say      what technicians rank above the money
in the department               items. Costs nothing and is skipped most
Paying per work order closed    many small closed work orders and worse
                               documentation. Backfires
Paying on completion rate       paperwork that says complete. Backfires
alone
\`\`\`
Sustained overtime is the incentive nobody chose. It is a position in disguise, and it is almost always cheaper to fund the position than to keep paying the premium.

## Pay equity, in both of its senses
The legal sense is narrow and absolute: whatever criteria the employer uses to set wages must carry no influence from sex or race. Every manager should know that and should be reviewing the pay of everyone who reports to them regularly against it, including people doing comparable work inside the same department on different grades.

The second sense is market fairness, and it is genuinely hard. No two jobs are identical, perks like preferred hours or no travel are worth real money to some people, and job titles for this work vary so widely that surveys struggle to match them at all. Self-reported salary surveys are discounted, and should be: the people reporting benefit from high numbers, and some will report total pay including overtime and on-call instead of base pay. Do it properly instead. Collect job descriptions from comparable local employers, help human resources match them to your own grades, then let human resources survey salary, overtime, on-call, and the rest of the package. Take that result to human resources, not the posting on your desk.

> Exam tip: staffing comes from workload plus coverage, with 1,200 to 2,000 items per technician as a sanity check only. A technician under $100,000 a year is under $50 an hour, about $72 fully loaded after roughly 25 percent for benefits and roughly 20 percent for supervision and unproductive time, which is below any vendor rate. Pay equity means wage-setting criteria free of any influence of sex or race, checked by a properly conducted survey rather than self-reported numbers.`,
      hook: "Staffing is set by workload and coverage with 1,200 to 2,000 items per technician as a sanity check, justified by the roughly $72 fully loaded hourly cost of a technician, supported by incentives that reward competence and coverage, and checked for pay equity."
    },
    {
      id: "u8l7", title: "Labor Law and a Safe Workplace: ADA, EEOC, FMLA, NLRA, OSHA, and PPE", domain: 5, obj: "HR-D", minutes: 10,
      body: `Four conversations in one week. A technician asks for a stool because standing all day has become painful. A second needs six weeks to care for a parent after surgery. Two more are standing in the corridor comparing their pay out loud, and a fifth has told you the guard is missing from the shop grinder. Every one of those is a law, and in all four the correct first move is the same.

## The first call is always human resources
The legal aspects of employment are the one part of this job where being fast and being helpful is a hazard. Call before you act, not after you have already answered. You own the job, the facts, and the records; human resources owns the process, the consistency across the whole hospital, and the legal exposure. The answers that get hospitals into court are almost always given quickly, from memory, by a well-meaning manager who was trying to be helpful.

## The five that come up most
\`\`\`
Law      What it protects, and your first move
ADA      People with a physical or mental impairment that
         substantially limits a major life activity, a record of
         one, or who are regarded as having one. Requires
         reasonable accommodation.
         First move: talk about the essential functions of the job
         and what would let the person perform them. Never ask for
         a diagnosis and never decide alone that it cannot be done
EEOC     Enforces the federal bans on discrimination in hiring,
         firing, promotion, harassment, training, wages, and
         benefits by race, color, religion, sex including
         pregnancy, gender identity, and sexual orientation,
         national origin, age of 40 or older, disability, and
         genetic information. Most employers of 15 or more are
         covered, and 20 or more in age cases. Retaliation against
         someone who complains, files, or takes part in an
         investigation is itself illegal.
         First move: take any complaint seriously, report it to
         human resources the same day, change nothing about the
         person's assignment or schedule in the meantime
FMLA     Gives eligible employees 12 workweeks of unpaid,
         job-protected leave in a 12-month period for a birth, an
         adoption or foster placement, a serious health condition
         of the employee or of a spouse, child, or parent, or a
         qualifying military exigency, and up to 26 workweeks to
         care for a covered servicemember. Group health coverage
         continues, and the job is restored.
         First move: send the request to human resources, who
         determine eligibility. Do not grant, deny, or interpret
         it yourself, and do not ask for medical detail
NLRA     Protects employees' rights to organize, to bargain
         collectively, and to act together about the terms and
         conditions of their employment, whether or not a union
         is present. That acting together is called concerted
         activity, so two technicians discussing their pay or
         workload together are engaged in protected activity.
         First move: nothing. Do not question it, discourage it,
         watch it, or let it affect an assignment or a review
OSHA     Requires the employer to provide a workplace that is safe
         and healthful, with hazard assessment, training, personal
         protective equipment, and records, and protects the right
         to report a hazard without retaliation.
         First move: make the hazard safe or take it out of
         service now, report it through the safety program, and
         thank the person who raised it
\`\`\`

## State and local law, and the collective agreement
State and local law adds its own rules on leave, scheduling, pay transparency, meal and rest breaks, and more, and where it gives an employee greater protection than the federal rule, it governs. Where the department is represented, the collective bargaining agreement governs the process on top of all of it. Neither is something to answer from memory in a corridor.

## A safe workplace is a management duty, not a poster
The sequence is fixed and it is the sequence a citation follows. Assess the hazards of each area the staff work in, provide the protective equipment the assessment calls for, train people on when and how to use it, replace it when it is damaged or worn, and keep the records of all four. Equipment handed out without an assessment is a finding waiting to be written, and so is a shop full of unused gloves and eye protection, because usage is part of the duty. Report what belongs in the environment of care program, and investigate injuries and near misses the same way you would investigate a device event.

> Exam tip: learn which law owns each situation. Accommodation is the ADA, discrimination, harassment, and retaliation are the EEOC's laws, protected leave with job restoration is the FMLA, employees acting together on pay or working conditions is the NLRA, and a safe workplace with hazard assessment, training, and protective equipment is OSHA. In all of them the manager's first step is to involve human resources before acting.`,
      hook: "Accommodation is the ADA, discrimination and retaliation are the EEOC's laws, protected leave is the FMLA, employees acting together on pay or conditions is the NLRA, and a safe workplace with assessment, training, and protective equipment is OSHA, and every one of them starts with a call to human resources."
    }
  ]
});
