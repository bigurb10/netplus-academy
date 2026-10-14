// CHTM Academy curriculum, units 4 to 6. Original teaching content for the AAMI/ACI CHTM exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "Service Operations and the CMMS", domain: 3,
  blurb: "How the work gets done, recorded, measured, staffed, and resourced, and how the record you keep answers a surveyor years later.",
  assumes: "Units 1 and 3. You should already know how the department's money is organized and how risk is scored.",
  lessons: [
    {
      id: "u4l1", title: "Work Order Flow From Request to Closure, and Customer Satisfaction", domain: 3, obj: "OPS-A", minutes: 10,
      body: `A nurse calls at 7:15 in the morning about an infusion pump that will not hold its rate. Two calls are already open, one technician is out, and the caller wants to know when somebody is coming. Everything that happens from here is either a work order or a complaint, and which one it becomes almost never depends on the repair.

## The lifecycle, stage by stage
\`\`\`
Stage              What has to happen                       Who hears about it
Request            captured once, with the asset number,    the caller gets a
                   location, caller, and the problem in     number and a promise
                   the caller's own words
Triage             ranked by clinical impact and urgency,   the unit, if the wait
                   not by the order calls arrived           will be longer
Assignment         to a technician with the competency      the unit learns who is
                   and the parts on hand                    coming and when
Repair             the work itself, with labor hours and    nobody, yet
                   parts recorded as they happen
Verification       performance and safety checks that       recorded against the
                   prove the device meets specification     asset
Closure            problem code, cause, action, parts,      the record is now
                   hours, condition on return               permanent
Notification       the user is told what was wrong and      the caller, by name
                   what was done
\`\`\`
The stage departments lose is the last one. A device returned to a unit with no explanation is remembered as a delay, however fast the repair was.

## Triage, and the service level targets you publish
Triage is a clinical judgment. A ventilator in use outranks a warming cabinet whatever time each call came in, and a device involved in a patient event stops being a repair at all and becomes evidence. Publish the priority tiers and the service level target for each one, then report against them. The numbers below are one department's own published commitment, not a standard anyone imposes; the discipline is having them in writing and measuring them, not the particular figures.
\`\`\`
Priority  Example                          Respond within   Resolve or give a plan
1         life support in use, a device    15 minutes       same shift
          in a patient event
2         critical device, no spare        1 hour           same day
          available on the unit
3         critical device with a spare     4 hours          2 working days
          in place
4         convenience or support item      1 working day    5 working days
\`\`\`

## What a complete record holds, and why
Asset number, date and time in and out, who did the work, the reported problem, what was found, what was done, parts used with their cost, labor hours, the test results, and the return-to-service decision. That list is not bureaucracy. It is what you hand a risk manager investigating an incident, what answers a lawsuit filed four years later, what a surveyor reads in a tracer, and what a cost of service ratio is built from. Two problem codes deserve their own discipline: **use error** and cannot duplicate. Both are real work and neither is an equipment failure, so trend them separately or you will treat a training problem as a reliability problem.

## Satisfaction, measured rather than sensed
Run a survey on the same questions year after year, because a survey you keep rewriting cannot show a trend. Ask about ease of contact in hours and after hours, speed of verbal and on-site response, completion, technical competence, communication, the condition of the equipment, and overall effectiveness of the program. Collect department and shift but no names, so people answer honestly, and leave room for free comment. Then do your rounding in person between surveys, handle complaints as their own tracked item with an owner and a closing date, and close the loop out loud: tell the person who complained what changed.

> Exam tip: triage by clinical impact, not by arrival order. The work order is not closed until the record holds problem, findings, action, parts, hours, test results, and the return-to-service decision, and the user has been told. Keep the satisfaction survey unchanged so the numbers compare across years.`,
      hook: "A work order runs request, triage by clinical impact, assignment, repair, verification, closure, and notification, and the record it leaves is what answers a lawsuit or a surveyor years later."
    },
    {
      id: "u4l2", title: "CMMS Documentation Regardless of Ownership: Inventory, Parts, History, Recalls, End of Life", domain: 3, obj: "OPS-B", minutes: 10,
      body: `A surveyor asks for a list of every ventilator in the building. You produce nineteen. The unit has twenty-two, because three arrived last month on a rental agreement that purchasing signed without telling you. Those three are the finding, and the reason is that your inventory records what the department maintains instead of what the hospital holds.

## The system of record, and the ownership rule
The **CMMS** is the department's system of record: if it is not in there, it did not happen. The inventory inside it must carry every medical device the building holds, whether the hospital bought it, leases it, rents it, borrowed it, has it on loan, or a physician brought it in, and regardless of who performs the maintenance. The duty follows the patient, not the invoice. Equipment the department does not maintain is still listed, flagged with who does maintain it and what evidence of that maintenance you hold, because the hospital still has to show the device is safe.

## The fields that have to be there
\`\`\`
Field                      Why it exists
Unique identifier          the number on the tag that every work order, part,
                           and vendor visit links back to
Manufacturer, model,       what a recall names. Without them a recall notice
serial number              cannot be matched to real devices
Description and            one agreed name per device type so like items can
nomenclature               be compared. UMDNS is the common free standard
Location                   where to go, and which unit's risk it is
Owning department          the cost center the asset belongs to, drawn
                           from the hospital's own account structure
Original cost              no cost of service ratio and no fair allocation of
                           cost is possible without the price paid
Risk score and strategy    what maintenance this asset gets and why
Service provider           in-house, a named contractor, or the manufacturer
Acceptance date            when the hospital took the device on
PM schedule and history    the plan and the proof
Warranty and contract      what somebody else is obliged to fix, and until when
Software and firmware      so a vulnerability or a recall can be matched to
version                    real units
End of life and support    so replacement planning starts years early
date
\`\`\`
Inventory anything with a serial number on it, because serial ranges are what recalls name. Items that are numerous, cheap, and low consequence can share one group record with a count, which is the honest way to handle a hundred poles rather than pretending to track each one.

## Parts, history, and recalls on the asset
Parts records carry what is on the shelf, what it cost, what it fits, and what is on order, so a repair's true cost is known and a slow-moving part is visible. Service history carries the full life of the asset including every vendor visit, which is the only way a repeat problem, a bad batch of parts, or a vendor who is not delivering ever becomes visible. Recalls and advisories are tracked against the affected assets with the action taken and the closure date, never on a spreadsheet one person keeps, because the recall outlives the person.

## Data quality is a scheduled activity
An inventory decays. Devices move, get traded between units, and leave with a patient. Audit it on purpose: a formal annual inventory, plus a sample of devices checked during routine rounds in each unit across life support, critical, and support equipment, with the asset numbers you actually found recorded in the system. That second habit finds more equipment per year than the annual sweep alone and it gives you something to show: evidence that inventory accuracy is managed rather than hoped for.

> Exam tip: the inventory covers every device in the building regardless of ownership and regardless of who maintains it, including leased, rented, loaned, and physician-owned equipment. Serial number is the field a recall needs, original cost is the field the cost of service ratio needs, and vendor visits belong in the same history as your own work.`,
      hook: "The CMMS lists every device in the building regardless of who owns or maintains it, with the identifier, model, serial, location, owner, original cost, risk, schedule, contract, software version, and end-of-support date that recalls, costing, and planning all depend on."
    },
    {
      id: "u4l3", title: "PM Scheduling, Completion Rates, and the Compliance Report", domain: 3, obj: "OPS-B", minutes: 10,
      body: `It is the twenty-eighth of the month and your scheduled maintenance completion sits at 71 percent. Four technicians are chasing devices they cannot find, one is on leave you approved, and the report goes to the environment of care committee in eight days. The month is already lost. The lesson is that completion is managed daily and only reported monthly.

## Building the schedule
The maintenance strategy decides what each asset gets; the schedule decides when. Scheduled maintenance is planned by month, with each asset landing in one of the twelve. Three rules keep the year workable. Balance it against the calendar, because February is short, summers lose people to leave, and the last two months of the year lose days to holidays. Sweep by location or by equipment type rather than visiting a unit every month, so one set of kits, tools, and test equipment serves a whole batch. And place the biggest jobs first, then fit the smaller ones into what is left, the way you would pack a jar with large rocks before sand.

## The arithmetic, and what each word means
Completion rate is **completed / due x 100**. The definitions behind the two numbers are where programs go wrong.
\`\`\`
Status              What it means                       Does it count as done
Completed           the work was performed and          yes
                    documented against the asset
Deferred            moved with a documented reason      no, and it stays on the
                    and a new date                      report until it closes
Could not locate    the device was not found            no. This is an inventory
                                                        problem, not a PM problem
In the window       annual work done inside the 30      yes. The accreditor allows
                    days either side of its due date    30 days on either side
\`\`\`
\`\`\`
A month, worked out
Due in the month                                              412
Completed and documented                                      371
Deferred with a reason and a date                              18
Could not locate                                               23
Completion rate            371 / 412 x 100                   90.0 percent
High-risk and life-support subset   96 / 96 x 100           100.0 percent
\`\`\`
Report both lines. A 90 percent overall rate with every life-support device complete is a different conversation from 90 percent with four ventilators missed.

## The compliance report and its readers
The monthly report carries the rate overall, the rate by department, the rate for high-risk and life-support equipment, the list of misses with a reason for each, and the date each one was finally closed. It goes to the environment of care committee, into the annual evaluation of the equipment management plan, and to the clinical directors whose devices were missed. A documented miss is a finding you can answer. An undocumented one is a finding you cannot.

## Chasing what you cannot find, and fixing a falling rate
Could-not-locate is handled as a procedure, not a shrug: a written search of the unit, the sister units, central storage and the loaner pool, a note to the unit manager, a second attempt on a named date, then escalation to the department director and a record that the device is presumed missing. When the rate falls, name the cause before the fix, because the corrective action follows the cause and not the number. Too much work scheduled in one month is a scheduling fix. An absence nobody covered is a staffing fix. Devices in use at the only hour you went is an access fix. Each correction gets an owner, a date, and a verification at the next report.

> Exam tip: completion rate is completed divided by due times 100, monitored daily rather than at month end. Deferred and could-not-locate do not count as complete. Annual scheduled work has a 30 day window on either side of its date, and the report names every miss with its reason and its closing date.`,
      hook: "Completion rate is completed divided by due times 100, watched daily, reported monthly by department and for high-risk equipment, with every miss named, explained, and closed."
    },
    {
      id: "u4l4", title: "Performance Data and KPIs: Productivity, Staffing, Competency, Cost Reduction", domain: 3, obj: "OPS-D", minutes: 10,
      body: `A new chief operating officer asks for your dashboard. You have eleven reports, none of which agree, and three of them measure how busy people look rather than what the department delivered. Choosing the measures is the management act here. Once a number is on a dashboard, it will be managed, including in ways you did not intend.

## The set worth reporting
\`\`\`
Measure                 What it actually tells you
PM completion rate      whether the regulatory baseline is being met. The
                        number a surveyor asks for first
Repeat repairs          work that comes back within 30 days of the first
                        repair: a bad device, a bad part, or a training need
Mean time to repair     average hands-on repair time. Measures the technician
                        and the parts supply
Total time to repair    from the call to return to service, including waits
                        for parts, vendors, and access. The clock the
                        clinician feels, and the one to report
Uptime                  share of time a device was available. Report it on
                        critical equipment, where downtime cancels cases
Backlog                 open work orders and overdue scheduled maintenance,
                        with age. The earliest honest warning you get
Customer satisfaction   the survey score, unchanged year to year
Cost of service ratio   annual service cost against acquisition cost, by
                        department, modality, type, and manufacturer
Labor hours per device  documented hours divided by assets supported. Useful
                        inside one hospital, misleading between hospitals
Overtime                hours and dollars. Sustained overtime is a staffing
                        request waiting to be written
Training hours          delivered hours and the competencies they closed
\`\`\`
Pick a short set for leadership, usually completion, backlog, total time to repair, satisfaction, and cost, and keep reporting the same set.

## Productivity, and the traps in measuring it
Productivity means getting the greatest result out of the resources you hold, not the greatest amount of motion. The usual mistake is to chase people from job to job and call the result efficiency. The honest measure is documented time: every paid hour assigned to something, with as much of it as possible against a tagged physical asset, then against a clinical department, and only what is left against the department itself. Document travel, phone time, manual reading, and cleanup against the device, because that is work you would bill a customer if you owned the shop. A realistic documentation rate is around **85 percent** of paid hours; chasing 100 percent produces fiction. The classic false economy is a technician spending two hours sourcing a cheaper part: the parts line improves, the labor line pays for it twice, and other work did not get done.

## Competency, tracked as data
Competency assessment of the people who service medical equipment is an accreditation requirement, so it has to produce records. Hold a skills matrix of technician against equipment type with the date of training, the date of assessment, and the method used, and keep the same records on your contractors by sampling their training files and competency assessments. Repeat repairs by technician is a legitimate input: a cluster usually means a training need rather than carelessness, and it is cheaper to answer with a school seat than with another visit.

## Cost reduction you can prove
Prove savings the same way every time: establish the baseline from the record before the change, state the change and its date, report actual cost for the same number of months afterward, and name what else changed so nobody can claim your saving was the weather.
\`\`\`
Insourcing one analyzer fleet, proved
Baseline: contract cost, prior 12 months                   $84,000
After: parts, outside labor, and training, 12 months       $31,500
Documented in-house labor, 240 hours at $72 loaded         $17,280
Total after                                                $48,780
Saving claimed                                             $35,220
\`\`\`
Put the arithmetic in the report, not just the conclusion, and say what the department gave up to get it.

> Exam tip: report total time to repair rather than only mean time to repair, because the clinician feels the whole wait. Backlog with age is the earliest warning of a staffing problem, repeat repairs within 30 days point at a device, a part, or training, and labor hours per device compares honestly only inside one hospital.`,
      hook: "A short, stable KPI set of completion, backlog, total time to repair, satisfaction, and cost beats eleven reports, and every claimed saving carries its baseline and its arithmetic."
    },
    {
      id: "u4l5", title: "The Cost of Service Ratio and Benchmarking", domain: 3, obj: "OPS-D", minutes: 9,
      body: `A vendor quotes $180,000 a year to cover an imaging system the hospital bought for a million dollars. The clinical director wants it signed. You need one number before you answer, and it is not the quote. It is what that quote costs as a share of what the device cost, measured against what the rest of your program costs.

## The formula and what goes into it
**COSR** is annual service cost divided by the original acquisition cost, times 100. Two numbers, both of which you should already hold: what the hospital paid for the asset, and what it costs in a year to keep that asset running. Annual service cost means everything: in-house labor at its fully loaded rate, parts, outside labor, contract payments, calibration, and the department overhead allocated to it. Leave in-house labor out and every in-house option will look free, which is the most common way this calculation gets rigged by accident.
\`\`\`
Service arrangement                        Ratio you should expect
Maintained by the manufacturer, whether    10 to 25 percent
under contract or time and materials
Across a whole program, mixed              roughly 4 to 25 percent, and a
arrangements                               well-run program sits low in that band
Fully in-house on suitable equipment       as little as 4 to 6 percent
\`\`\`

## The quote, worked
\`\`\`
Device                  Acquisition   Annual service   COSR
Imaging system          $1,000,000    $180,000         18.0 percent
Whole program           $100,000,000  $6,000,000        6.0 percent
\`\`\`
The contract costs roughly three times what the program average costs. That is not an automatic refusal, because one system with no in-house training and no spare is exactly where a contract earns its price. It is the question you now get to ask out loud: what does the hospital get for the extra twelve points, how much would a tube or a failed workstation on a Saturday actually cost, and what would training and a parts float cost instead.

## Reading the ratio, and where the savings hide
Calculate it for the whole system, then drill down: by hospital, by clinical department, by modality, by equipment type, and by manufacturer. The aggregate number tells you almost nothing; the drill-down is where cost reduction is found, because a program at a respectable average can easily hide one modality at triple the norm and one manufacturer whose parts pricing is carrying its own margin. Sort the list by ratio and work from the top.

## Benchmarking, and its honest limits
The ratio travels better than most measures because dividing by acquisition cost removes the magnitude of the dollars, which lets a thermometer and a scanner be compared on the same scale. Benchmarks still deserve suspicion. Programs count different things as service cost, inventory differently, include or exclude imaging and laboratory work, and allocate overhead their own way, so a published band is a conversation starter rather than a verdict. Measures inherited from facilities management, such as heated square footage, discharges, or raw device counts, tell you nothing useful about an equipment program's size or cost. Your own ratio, tracked over years and broken down, is the benchmark you can defend.

## What the number is allowed to decide
A high ratio on a device type points at three possible actions: change the service arrangement, replace the asset, or add the staff and training that would let you take the work in-house. A low ratio is not automatically good either, because an unusually low number on critical equipment sometimes means scheduled work is not being done. Carry the ratio into the contract review, the replacement list, and the staffing request, and bring it to the committee with the drill-down attached.

> Exam tip: cost of service ratio is annual service cost divided by acquisition cost times 100. Manufacturer-maintained equipment typically runs 10 to 25 percent and fully in-house work can reach 4 to 6 percent. Always include loaded in-house labor, and look for savings in the drill-down by department, modality, type, and manufacturer rather than in the average.`,
      hook: "Cost of service ratio is annual service cost divided by acquisition cost times 100, and the savings live in the drill-down by department, modality, equipment type, and manufacturer rather than in the program average."
    },
    {
      id: "u4l6", title: "Staffing and Scheduling Requirements", domain: 3, obj: "OPS-E", minutes: 9,
      body: `You are two people short, overtime has run above plan for five months, and administration has a hiring freeze. The request you are about to write will fail if it argues from workload, because scheduled maintenance that prevents problems is invisible to the people who approve positions. It will succeed if it argues from cost avoided.

## Build the workload from the inventory upward
\`\`\`
Input                        Where it comes from
Scheduled hours              hours per procedure times quantity, by model,
                             from your own records rather than a guess
Unscheduled hours            repair history: two or three years of recorded
                             repair hours by equipment type, including
                             vendor-handled work
Risk weighting               life-support and critical devices consume more
                             hours per unit than support equipment
Travel                       time between buildings, clinics, and offices.
                             Spread-out sites raise the number materially
Non-device time              meetings, rounding, training, incidents,
                             projects, inventory, and committee work
Scope                        imaging, laboratory, non-clinical equipment,
                             anesthesia, and how many shifts you cover
\`\`\`
One **FTE** is one full-time position of roughly 2,080 paid hours a year. Divide your total hours by the productive hours a real person delivers, not by 2,080, because leave, holidays, training, and the undocumented hour everybody loses each day are real.

## The planning numbers, and what they are worth
Devices per technician has historically been quoted at roughly 1,200 to 2,000 inventoried items. Treat it as a sanity check and nothing more: it ignores complexity, ignores what is on contract, and is hostage to how the inventory was counted, since a department that inventoried every module looks twice as efficient as one that counted systems. Equipment value is a better first estimate, because maintenance need tracks acquisition cost reasonably well, with one caveat: imaging carries expensive parts and relatively little labor, so an equal dollar value of general patient care equipment needs more hours.

## The justification that gets approved
\`\`\`
A system leaves warranty next quarter
Vendor contract quoted, annual                             $60,000
A technician at the entry grade, fully loaded              less than that
Hours the new system actually needs                        0.4 FTE
Net capacity returned to the maintenance schedule          0.6 FTE
The ask                                                    one position, funded
                                                           by declining the contract
\`\`\`
The argument is the fully loaded cost of your own labor against the alternative. A hospital-employed technician earning under $100,000 a year is under $50 an hour across 2,080 hours; add about 25 percent for benefits and about another 20 percent for supervision and unproductive time and the loaded cost is at most about $72 an hour, which is below any outside hourly rate and usually below the labor inside a contract. Make sure the contract you are declining has a cancellation clause, and leave deliberate slack in the new position so it absorbs backlog as well as the new system.

## Skill mix and scheduling
Decide the mix before the headcount: generalists for patient care equipment, specialists for imaging, laboratory, and sterilizers, at least one person who can hold a technical conversation with information technology about networked devices, and a supervisory layer once the department passes the size one person can see. Every skill needs a second seat, because one trained technician is a single point of failure the first time they take leave. Then schedule to the hours clinicians work rather than the hours the shop prefers. Steady evening and weekend volume is answered by a second shift, not by overtime, and overtime that persists for months is a position in disguise. On-call needs a written rotation, a defined response time, documented pay, and a rule about who may be called and for what.

> Exam tip: build staffing from scheduled hours plus historical unscheduled hours plus travel and non-device time, weighted by risk. One FTE is about 2,080 paid hours. Devices per technician, around 1,200 to 2,000, is a sanity check rather than an answer, and the winning justification is cost avoided against a vendor alternative.`,
      hook: "Staffing is built from the inventory as scheduled plus unscheduled hours weighted by risk, and the request that gets funded argues the fully loaded cost of your own technician against the contract you would otherwise sign."
    },
    {
      id: "u4l7", title: "Resources: PPE, Tools, Test Equipment, Supplies, Technical Information", domain: 3, obj: "OPS-G", minutes: 9,
      body: `A technician cannot finish three of the month's scheduled jobs because the kits were not ordered, the gas analyzer is out for calibration with no loaner, and nobody can find the service manual for a model the hospital has owned for six years. None of that is a skills problem. Making the resources available is a management duty, and when it fails it shows up as a compliance number.

## The resource list a manager owns
\`\`\`
Resource                 What managing it means
PPE                      gloves, eye and hearing protection, lockout devices,
                         and whatever each area's hazard assessment requires,
                         with the training to use them and a record of it
Hand and specialty       matched to the equipment types you service, under
tools                    tool control: issued to a named person, accounted
                         for, and replaced when worn
Test equipment           safety analyzers, simulators, meters, and gas and
                         flow analyzers matched to the inventory you actually
                         hold, with coverage while one is away
Calibration              every instrument on a schedule, traceable to the
                         national measurement standards, certificates on file
Supplies and kits        ordered before the month they are needed, so work is
                         never held waiting on a filter
Technical information    service and operator manuals, software, passwords,
                         diagnostic access, updates, and accounts on the
                         vendor's service portal, obtained in writing at
                         purchase
Training                 model-specific schools, refreshers, and the
                         competency records that prove them
\`\`\`

## Test equipment and the calibration trap
Tools used for maintenance do not have to be the exact instruments the device manufacturer names, but they do have to produce results equivalent to what the manufacturer's procedure requires, and they have to be maintained so their readings can be relied on. That makes the calibration schedule a patient safety control rather than paperwork. The trap is retroactive: an analyzer found out of calibration casts doubt on every record it produced since its last good certificate, which can mean re-testing a fleet and explaining the gap to a surveyor. Hold the certificates, schedule calibration before it lapses, and arrange coverage so a shop is never tempted to use an instrument that is overdue.

## Technical information is negotiated, not requested
Nothing obliges a manufacturer to sell you manuals, software, keys, or training, and after the purchase order is signed your leverage is gone. Write the requirement into the purchase agreement: all literature, operator and service manuals, software and updates, passwords and diagnostic access, and technical support lasting as long as the device does, each named as a deliverable rather than left in the terms. In a state that has adopted the health care facilities code, much of that list is a legal requirement, and it is worth citing in the specification either way. Then arrange with materials management that payment can be withheld until those items actually arrive, because an invoice is normally cleared once the priced items are delivered and the unpriced promises are the ones that quietly go missing.

## Budgeting for them, and the cost of a gap
\`\`\`
Resource line              Where it lives in the budget
PPE, consumables, kits     operating: supplies
Hand tools, small test     operating, unless an instrument clears the
instruments                capitalization threshold
Major test equipment       capital, and it competes with clinical requests
Calibration                operating: maintenance and repairs, or a
                           dedicated calibration line
Manuals, software,         negotiated into the capital purchase wherever
licenses                   possible, so they are not an annual surprise
Training                   operating: travel and education, requested per
                           technician with the justification attached
\`\`\`
A missing resource never stays a resource problem. It becomes a missed scheduled inspection on the compliance report, an unverified device returned to a patient, a safety test performed with an instrument of unknown accuracy, or a technician working without the protection the hazard assessment required. Each of those is a finding with your name on it, which is why the resource list belongs in the budget narrative and in the equipment management plan rather than in somebody's memory.

> Exam tip: test equipment need not be the manufacturer's named tool but must give equivalent results and be maintained so readings are reliable. Calibration is traceable to the national measurement standards with certificates retained, and manuals, software, passwords, and training are negotiated into the purchase agreement, because none of them is owed to you afterward.`,
      hook: "PPE, tools, calibrated test equipment, kits, manuals, software access, and training are management deliverables, and every gap in them reappears as a compliance or safety finding."
    },
    {
      id: "u4l8", title: "Electronic Data Management of Computerized Assets: Backups, Security, Patching, Updates", domain: 3, obj: "OPS-M", minutes: 9,
      body: `Your work order system goes down on a Tuesday and comes back on Thursday from a backup nobody had ever restored. Eleven days of work orders are gone, including the three that document a device involved in a patient event. The repair was the vendor's job. The restore test that would have caught it was yours.

## What counts as a computerized asset you manage
\`\`\`
Asset                        Your responsibility for it
Device software and          version recorded in the inventory, configuration
configuration                backed up, changes controlled
Servers and workstations     the imaging archive front ends, monitoring
the department runs          central stations, analyzer middleware
The work order system        the department's own system of record, and the
                             one nobody else will back up for you
Device databases             calibration records, test results, patient lists
                             held on devices
Vendor-hosted services       what the vendor holds, how it is backed up, and
                             what the contract says you get if they fail
\`\`\`

## Backups, and the restore test that makes them real
Set a schedule per asset, hold the copies somewhere other than the machine they protect, and write down how long a restore is allowed to take and how much data the hospital can afford to lose. Then restore one, on purpose, on a date in the calendar, and record the result. A backup nobody has restored is a hope. The same rule reaches device configurations: a monitoring system's unit setup, alarm limits, and user lists are hours of clinical work that no spare part replaces, and the only copy is often on the device itself.

## Accounts and access, which is where most findings live
\`\`\`
Control                    What it looks like in practice
Named accounts             one person, one account. Shared logins destroy
                           the audit trail you will need later
Role-based rights          technicians, supervisors, vendors, and clinical
                           users each see only what their job needs
Default credentials        the default password changed on every device
                           and system at installation, and the new one
                           recorded in a controlled store rather than a
                           shared spreadsheet
Vendor remote access       named accounts, approval before each session,
                           logging, and revocation when the contract ends
Removal at departure       the account closed the day someone leaves. Build
                           it into the exit checklist, not into good intentions
Periodic review            a quarterly read of who still has access, with
                           the list signed
\`\`\`

## Patching and updates, coordinated with the vendor
Patching is a policy decision before it is a technical one, because a device is cleared in a configuration and a change applied outside the manufacturer's validated path can take it out of that configuration. The policy must name who may patch what, on whose validated schedule, what the manufacturer is obliged by contract to supply and when, and what the hospital does when the manufacturer says a patch is not supported. Record every patch and every software update against the asset with its version and date, which is also how you answer the next vulnerability bulletin in an afternoon instead of a fortnight.

## Change control, and what to record
1. **Request** the change in writing, with what is changing, on which assets, and why.
2. **Assess** it jointly with information technology and the manufacturer: clinical impact, what it touches, how to reverse it.
3. **Approve** it through the change process, with the clinical department told what to expect.
4. **Schedule** it in a window that is not the middle of a clinical day, with a back-out plan.
5. **Test** afterward, including the interfaces that send data onward, before the device returns to patients.
6. **Record** the version, the date, who did it, and the test result against the asset.

A change made quietly on a clinical device is the most common self-inflicted outage in the field, and the reason it hurts is always the same: nobody could say afterward what changed, so nobody could put it back.

> Exam tip: a backup is not a backup until a restore has been tested and documented. Patch on the manufacturer's validated schedule with the vendor's obligations written into the contract, record software and firmware versions against the asset, and run device changes through formal change control with a back-out plan and a test afterward.`,
      hook: "The department owns backups with tested restores, named accounts and vendor access control, patching on the manufacturer's validated schedule, and version records in the inventory for every computerized asset."
    },
    {
      id: "u4l9", title: "Alternative Equipment Maintenance Programs and How to Document Them", domain: 3, obj: "OPS-B", minutes: 10,
      body: `A surveyor opens your inventory, filters it to the devices you maintain on your own intervals rather than the manufacturer's, picks the two most dangerous things on that list, and asks how the decision was made. That question has a right answer, and it is a document rather than an opinion.

## What an alternative program is, and what it is not
An **AEM** program changes how often maintenance, inspection, and testing happen and what each one includes, away from the manufacturer's recommendations, on the strength of a risk-based assessment by qualified personnel. Regulators permit the change itself. What they do not permit is improvisation: once the hospital sets its own activities and frequencies it must follow them strictly, and a program that drifts is worse than no program at all. Following the manufacturer is always compliant, and doing the work more often than the manufacturer recommends is allowed too, as long as you still perform the manufacturer's activities when you do.

## What may not go in
\`\`\`
Excluded                           Why
Imaging and radiologic             a separate federal requirement says this
equipment, diagnostic or           equipment follows the manufacturer's
therapeutic                        recommendations
Medical laser devices              named as excluded outright
Anything another federal or        the stricter requirement governs, and your
state law pins to the              risk assessment cannot override it
manufacturer's schedule
Equipment covered by other         for example the life safety provisions,
conditions of participation        including the manufacturer's guidance for
that set a specific standard       alcohol-based hand-rub dispensers
New equipment with too little      it stays on the manufacturer's schedule
maintenance history                until history exists to support a change
\`\`\`
New equipment is the exclusion managers forget. History may come from the hospital's own records, its contractor's records, or publicly available nationally recognized sources, and when the device later moves into the program you must hold evidence that you evaluated the track record, assessed the risk, and tested the alternative regimen first.

## The evidence behind each decision
\`\`\`
Factor to document            The question it answers
Function and consequence      what would failure or malfunction do, here, in
of failure                    this setting
Seriousness of the harm       a scale slightly off in an adult clinic is not
                              a scale slightly off in a neonatal unit
How widespread the harm       many patients exposed matters even when each
would be                      individual harm is small
Manufacturer's                what they recommend, and their reasoning where
recommendations               you can get it
Maintenance requirements      simple or complex, instructions available or
                              not, and how you validate the alternative
Availability of backup        can a replacement device reach the bedside in
devices                       time if this one fails
Incident history of           number, frequency, and nature of past failures
identical or very similar     and service requests, from your records, your
equipment                     contractor's, or credible outside evidence
\`\`\`
Several factors are weighed together, because severity and likelihood combine differently for different equipment, and the same model can carry different risk in a different unit.

## Who may decide, and what the file holds
For medical equipment, a clinical or biomedical technician or engineer is qualified to make the decision, and highly specialized equipment may need specialist knowledge on top. Facility equipment decisions belong to a facilities management professional. The hospital keeps records of those people's qualifications and must be able to show how it assures that a contractor's people are qualified too. For each equipment type in the program the documentation names the risks, the alternative activities with the strategy and reasoning behind them and how they differ from the manufacturer's, the alternative frequencies with their reasoning, the dates work was performed with any further action, and any equipment failures that were not operator error. Where several identical items exist the type documentation may be generic, but the record of work performed is specific to each individual device. Very low risk equipment may legitimately carry a range such as every 12 to 24 months, or be covered by periodic departmental sweeps that sample function and poll the operators.

## Living with it: identification, review, and the surveyor
Equipment in the program must be readily identifiable as such in the inventory, and critical equipment must be identifiable whether it is in the program or not, because the surveyor's sample will be drawn mostly from critical devices inside the program. The program itself is written into the medical equipment management plan, and its effectiveness is evaluated as part of the annual review: how performance degradation is detected where it would not be obvious, such as a slow miscalibration; how malfunctions are investigated, including whether the alternative strategy caused them; how unsafe equipment is removed from service; and how performance data has changed the program. Bring that evaluation to the committee with the numbers attached.

> Exam tip: an alternative program adjusts activities and frequencies on a documented risk assessment by qualified personnel, and the hospital must then follow its own intervals strictly. Imaging and radiologic equipment, medical laser devices, anything another law pins to the manufacturer, and new equipment without enough history may not be included, and the surveyor will sample the critical equipment inside the program.`,
      hook: "An alternative maintenance program adjusts activities and frequencies on documented risk, decided by qualified personnel, excluding imaging, lasers, legally pinned equipment, and new equipment without history, and the hospital must then follow its own intervals strictly."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Policy, Regulators, and Accreditation", domain: 3,
  blurb: "The plan, the procedures, the committees, and the regulators that judge the program, and what each of them expects you to produce on request.",
  assumes: "Unit 4. The plan describes the operation you have just learned to run.",
  lessons: [
    {
      id: "u5l1", title: "The Medical Equipment Management Plan", domain: 3, obj: "OPS-E", minutes: 10,
      body: `A new director asks for the hospital's medical equipment management plan. What comes back is a four-page document last revised six years ago, describing two departments that have since merged and a maintenance strategy the department abandoned. It is still the document a surveyor will read first, and the hospital will be judged against what it says rather than what you actually do.

## What the plan is
The **MEMP** is an organization-wide document, not a departmental procedure. It states the hospital's approach to maintaining the medical devices it holds, with enough specificity that a reader can see how each equipment type is maintained and how that maintenance is demonstrated. It is a how-we-do-business document, written to stand up against federal, state, and local requirements, and it references the organization's other policies rather than repeating them. Day-to-day responsibilities are spelled out between clinicians, the in-house department, and any contractors, because a surveyor's next question after "who does this" is always "where does it say so".

## The sections it has to carry
- **Scope and objectives**: which equipment and which locations the plan covers, what the program is trying to achieve, and who maintains what between the department, clinical staff, contractors, and manufacturers.
- **Inventory inclusion criteria**: what gets an asset number, what is grouped, what is excluded, and how leased, rented, loaned, and patient-owned equipment is handled.
- **Risk and maintenance strategies**: how risk is scored, what strategies exist, and how each equipment type is assigned to one, including any alternative program and its rules.
- **Inspection and preventive maintenance**: intervals, procedures, who performs them, and the flexibility window the plan uses.
- **Incident response**: how a device involved in an event is secured, investigated, reported, and released.
- **Recall and advisory response**: who receives notices, how affected assets are found, and how actions are documented and closed.
- **Emergency procedures**: clinical downtime, utility failure, and how staff obtain a replacement device.
- **Training**: who trains the technical staff, who trains operators, and how competency is assessed and recorded.
- **Performance monitoring**: the metrics the plan reports, to whom, and how often.
- **Annual evaluation**: the yearly review of scope, objectives, performance, and effectiveness, with findings reported to the committee.

## Keeping it alive
\`\`\`
Trigger                          What the plan needs
A new service line or building   scope and inventory criteria updated
A change of maintenance          the strategy section rewritten before the
strategy                         first device moves to the new interval
A new contractor                 responsibilities and documentation standard
                                 restated
A regulatory change              the compliance statement and the affected
                                 section reviewed, with the date recorded
A finding on survey              the section the finding touched amended as
                                 part of the corrective action plan
Nothing at all                   the annual evaluation still happens
\`\`\`
Hold it under document control: a version number, an effective date, a named owner, a review date, and a record of what changed. An undated plan cannot prove it was current when the device was serviced.

## The annual evaluation and the committee
The evaluation is a short written report, not a rewrite. It answers four questions: was the scope still right, were the objectives met, what do the performance numbers say, and was the program effective. Bring the completion rates, the incident and recall summary, the alternative program's effectiveness review, the training and competency position, and the corrective actions from last year with their status. It is presented to and approved by the **EOC** committee, which holds the organization's environment of care program, and the equipment plan sits in that program beside the plans for safety, security, hazardous materials, fire, and utilities. Approval is recorded in the minutes, because the minutes are the evidence that leadership accepted the plan.

> Exam tip: the plan is organization-wide and specific enough to show how each equipment type is maintained and how that is demonstrated. It must cover scope, inventory criteria, risk and maintenance strategies, inspection and preventive maintenance, incident and recall response, emergency procedures, training, performance monitoring, and an annual evaluation reported to the environment of care committee.`,
      hook: "The medical equipment management plan is an organization-wide document covering scope, inventory criteria, risk and maintenance strategies, inspections, incident and recall response, emergency procedures, training, and performance monitoring, evaluated annually and approved by the environment of care committee."
    },
    {
      id: "u5l2", title: "SOPs and the Environment of Care Manual", domain: 3, obj: "OPS-E", minutes: 9,
      body: `A surveyor asks a technician what happens when a device due for scheduled maintenance cannot be found. The technician gives a sensible answer. The surveyor then asks to see the procedure, and there is none. The practice was correct and the hospital still has a finding, because an unwritten practice cannot be audited, taught, or proved.

## What a procedure is for
A **SOP** is a living document, written to support the equipment management plan rather than contradict it, used to orient new staff, and referred to in daily work. The test of a good one is simple: a competent newcomer could follow it, and an auditor could tell from the records whether it was followed. Where the organization already has a higher-level policy, the departmental procedure references it and adds the local detail instead of restating it, so the two can never fall out of step.
\`\`\`
Element              What it must say
Title and number     one subject, one number, so it can be cited
Purpose and scope    what it covers and who it applies to
Definitions          only terms that change the meaning of a step
Responsibility       who performs each part by role, never by name
Procedure            numbered steps in the order they happen, with the
                     decision points called out
Records              what is recorded, where, and for how long
References           the plan or policy above it, and related procedures
Approval and dates   approver, effective date, version, review date
\`\`\`

## The library a department needs
A copy of the organization's equipment management plan sits at the front. Then: inventory processes including incoming inspection and removal from inventory; scheduled maintenance covering procedure assignment, the risk-based or alternative strategy, frequencies, responsibility, workload balancing, and what to do when a device cannot be found; test equipment and calibration management; unscheduled maintenance; equipment under warranty and under service agreement; vendor and service management; infection control for devices; work order documentation for scheduled, unscheduled, use error, and non-departmental work; on-call and after-hours call-back; travel time; repair parts, purchase orders, and service contracts; the escalation policy; safety across electrical, radiological, biological, and occupational requirements; information security and patient privacy; telemetry and wireless spectrum management; coordination with information technology; communication with customers; satisfaction and feedback; and professional conduct.

## Document control and training against them
\`\`\`
Control                 Why it matters
Single source           one location everybody uses. A procedure that
                        exists in three versions exists in none
Version and effective   so you can prove which version governed the work
date                    that was done last March
Named owner             somebody whose job it is to keep it true
Review cycle            a date on every document, reviewed whether or not
                        anything changed, with the review recorded
Change record           what changed, when, and who approved it
Training record         who was trained on which version, and when. This
                        is the half most departments skip
Retirement              superseded versions withdrawn and archived, not
                        left in a drawer
\`\`\`
Training against a procedure is what converts it from a document into a practice, and the training record is what lets you say so. When a procedure changes, the people who work to it are retrained and the record is dated.

## What procedures prove, and what a missing one costs
In a survey, procedures are the bridge between the plan and the records. The plan says the hospital does something, the procedure says how, and the work order says it happened. Break any link and the chain fails. A missing or outdated procedure costs you three ways: the finding itself, the corrective action plan that follows, and the discovery that two technicians were doing the same job differently for two years, which is the kind of variation that eventually produces an incident rather than just a citation.

> Exam tip: procedures support the equipment management plan, are kept under document control with an owner, version, effective date, and review cycle, and are taught with a dated training record. An unwritten practice, however good, cannot be audited or proved, and a superseded version left in circulation is itself a finding.`,
      hook: "Standard operating procedures turn the equipment management plan into auditable practice, under document control with an owner, a version, a review cycle, and a dated training record for every person who works to them."
    },
    {
      id: "u5l3", title: "Goals, Objectives, and Reporting to Committees: EOC, Patient Safety, Risk, Performance Improvement, Radiation Safety, Infection Control", domain: 3, obj: "OPS-E", minutes: 10,
      body: `You are on six committee calendars. Five of them get the same slide deck, and three of the five have stopped reading it. A committee is not an audience, it is a body that can give you something, and the way to get it is to bring each one the number it is responsible for and a clear request.

## Goals that can actually be measured
A goal is a direction; an objective is a goal with a number, a date, and an owner. Write them so that failure is visible, set them from last year's actual performance rather than from ambition, and share them with the staff whose work produces them, because people who helped set a goal defend it.
\`\`\`
Goal area                 Objective, written so it can be scored
Regulatory baseline       scheduled maintenance completion at or above the
                          target every month, with life-support at 100
                          percent, reported monthly
Responsiveness            total time to repair on critical equipment
                          reduced against this year's baseline by the
                          agreed margin, by the end of the fiscal year
Reliability               repeat repairs within 30 days reduced on the
                          three worst equipment types
Financial performance     cost of service ratio held or reduced at the
                          program level, with two named drill-downs acted on
Customer satisfaction     the survey's overall effectiveness score improved
                          on the same questions as last year
Use error                 use error work orders reduced in the two
                          departments that generated the most
\`\`\`

## What each committee wants from you
\`\`\`
Committee                 What it needs, and what it can give you
Environment of care       equipment inventory and completion rates,
                          incidents and recalls, the annual plan
                          evaluation, construction and utility impacts.
                          It approves the plan
Patient safety            device-related events and near misses, use error
                          trends, alarm issues, and the actions taken. It
                          can mandate a clinical practice change
Risk management           investigation reports, device holds, reportable
                          events, and exposure from pending claims. It can
                          fund a control you cannot
Performance improvement   metrics with targets and trends, improvement
                          projects, and the results of corrective actions
Radiation safety          imaging and therapy equipment performance,
                          scheduled maintenance on radiation-producing
                          equipment, the dose monitoring program's
                          equipment side, service records, survey
                          results, and the radiation-producing device
                          inventory
Infection control         cleaning and disinfection of devices between
                          patients and before service, water systems,
                          sterilizers, and endoscope reprocessing equipment
\`\`\`
Loaner and rental handling belongs in two of those conversations at once, because a device that arrives from outside the building is both an inventory question and an infection control question.

## The reporting calendar
Build it once a year and publish it: which committee meets when, what is due, who prepares it, and when the data has to be closed to make the deadline. Monthly items are the operating numbers; quarterly items are trends and projects; annual items are the plan evaluation, the alternative program's effectiveness review, and the goals for next year. Put the calendar where your supervisors can see it, because the report that misses a meeting waits a month, and a number that waits a month stops being news.

## How to present to a committee
Five parts, one page: the number, the trend, what caused it, what is being done, and what you need from the committee. Bring the exception list rather than the whole data set, name the departments honestly, and never present a problem you have not thought about. If you are asking for money, people, or a practice change, say so explicitly and say what happens if the answer is no. Then make sure the minutes record the decision, because a commitment that is not in the minutes did not happen, and next year's survey evidence is assembled from those minutes.

> Exam tip: an objective carries a number, a date, and an owner. Match the report to the body: the environment of care committee approves the plan and sees completion and incidents, patient safety sees device events and use error, risk management sees investigations and reportable events, performance improvement sees trends against targets, radiation safety sees imaging records, infection control sees cleaning, water, and reprocessing equipment.`,
      hook: "Objectives carry a number, a date, and an owner, and each committee gets the measure it is responsible for in five parts: the number, the trend, the cause, the action, and the request."
    },
    {
      id: "u5l4", title: "CMS, Deemed Status, and the Organizations That Accredit on Its Behalf", domain: 3, obj: "OPS-F", minutes: 10,
      body: `Somebody in a budget meeting asks why the department cannot simply decide its own maintenance intervals, since no patient has ever been harmed. The answer is not about safety culture. It is that the hospital's payment for most of its patients depends on meeting federal requirements, and an unexplained interval is one of the few things a surveyor can prove.

## Why the money is the lever
**CMS** pays for a large share of hospital care, and to receive that reimbursement a hospital has to meet the federal **CoP**. Several of those conditions reach equipment directly: facilities, supplies, and equipment must be maintained to ensure an acceptable level of safety and quality; equipment must be inspected and tested for performance and safety before first use and after major repairs or upgrades; the people responsible for developing, implementing, and managing the maintenance program must be qualified and the hospital must hold records proving it; and the complete equipment inventory must exist regardless of ownership. Failure here is not a fine. It is a threat to participation, which is why an equipment finding gets attention from people who have never visited your shop.

## Deemed status and the organizations that hold it
The federal agency lets approved accrediting organizations survey on its behalf, and a hospital accredited by one of them is deemed to meet the conditions. That is deemed status. The accreditor's standards must be at least as demanding as the federal requirements, and its survey substitutes for the routine federal one, although the agency retains the right to validate. In hospitals the bodies you are most likely to meet are **TJC**, **DNV**, and **HFAP**, and specific services such as blood banks, laboratories, and imaging carry their own accreditors on top of whichever one surveys the hospital. Whoever arrives, the equipment evidence they ask for is the same.
\`\`\`
Body                            What it accredits, in this context
The Joint Commission (TJC)      the most common hospital accreditor, with
                                standards on the equipment plan,
                                maintenance intervals, and competency
DNV                             hospital accreditation built around an
                                integrated quality management system
The Healthcare Facilities       a hospital accreditation program that has
Accreditation Program (HFAP)    held deeming authority
AABB                            blood banks and transfusion services, with
                                equipment requirements often stricter than
                                the manufacturer's
CAP, and CLIA as the federal    clinical laboratories, against detailed
laboratory program              checklists that can set their own
                                instrument frequencies
State survey agency             surveys on the agency's behalf where a
                                hospital is not accredited, and investigates
                                complaints at any hospital
\`\`\`
Accreditation does not displace the state. State licensure, the state health department, and the state's adopted building, fire, and electrical codes apply on top, and a state rule may be stricter than the federal one.

## The equipment standards they actually survey
Expect the same short list whichever body arrives: a complete inventory regardless of ownership, with critical equipment identifiable; a current management plan with its annual evaluation; scheduled maintenance performance with the misses explained; records that show inspection and testing before first use and after major repair; evidence that whoever performs and oversees the work is qualified, contractors included; incident and recall handling; and the evidence behind any equipment maintained on intervals other than the manufacturer's.

## The alternative program as the agency states it
A hospital may adjust its maintenance, inspection, and testing frequency and activities away from the manufacturer's recommendations on a risk-based assessment by qualified personnel, unless another federal or state law or a condition of participation requires the manufacturer's schedule or sets specific requirements, the equipment is a medical laser device, or the equipment is new without enough maintenance history to support the decision. Imaging and radiologic equipment, diagnostic or therapeutic, is named explicitly as following the manufacturer. A hospital that adjusts must develop, implement, and maintain a documented program based on generally accepted standards of practice, and must then adhere strictly to the activities and frequencies it set. Surveyors are directed to concentrate on the critical equipment inside that program and on the evidence behind putting it there.

> Exam tip: the federal agency sets the conditions of participation and ties them to payment; approved accrediting organizations survey on its behalf under deemed status, and the state survey agency covers the rest and handles complaints. Imaging and radiologic equipment, medical lasers, anything another law pins to the manufacturer, and new equipment without history stay on the manufacturer's schedule.`,
      hook: "Payment depends on the federal conditions of participation, approved accrediting organizations survey on the agency's behalf under deemed status, and state licensure and codes apply on top of both."
    },
    {
      id: "u5l5", title: "FDA, FCC, NRC, and HIPAA Obligations of the HTM Department", domain: 3, obj: "OPS-F", minutes: 10,
      body: `A vendor arrives to install a wireless system, the nuclear medicine manager asks you to service a camera that handles radioactive sources, and a laptop holding test results from forty patients goes missing from the shop, all in the same week. Four different federal regimes just became your problem, and they do not share a point of contact.

## The device regulator
The **FDA** regulates medical devices from market clearance through performance, reporting, and recall, and its device center, **CDRH**, is the part that issues the notices you receive. Three touchpoints matter to a manager. Device classification sorts devices by the control needed to give reasonable assurance of safety and effectiveness, which is why two superficially similar devices can face very different requirements. Medical device reporting puts a mandatory duty on the hospital as a device user facility, with written procedures, event files, and deadlines of its own. And recalls, corrections, and removals arrive with a hazard classification that sets your urgency. There is a fourth touchpoint worth recognizing. A company that rebuilds a finished device so that its performance or safety specifications, or its intended use, are significantly changed is remanufacturing it, and a remanufacturer counts as a manufacturer under the agency's quality system requirements. Work that changes none of those three things is servicing, not remanufacturing, so the question to put to a third-party refurbisher before you buy is what it actually changed.
\`\`\`
Obligation                      Where it lands in the department
Reportable events               written reporting procedures, an event
                                file per event, and the deadline met
Recalls and advisories          matched to assets by model and serial
                                range, documented per unit, closed
Device history for an           complete records, preserved, available to
investigation                   an authorized agency employee
Refurbished purchases           ask what was changed, whether that makes
                                them a remanufacturer, and what rebuild
                                history the device carries
\`\`\`

## Spectrum
The **FCC** licenses and manages the radio spectrum. For a hospital the specific interest is the **WMTS**, protected spectrum set aside for patient telemetry so that monitored waveforms are not competing with everything else in the building. Somebody has to register the hospital's use, hold a record of frequencies and transmitters, keep other equipment out of the band, and treat an interference complaint as a clinical event rather than a radio hobby. That duty almost always lands in the equipment department, and it means every new wireless system, including a vendor arriving with access points of its own, is a coordination request before it is an installation.

## Radioactive materials
The **NRC** is the federal body that authorizes civilian use of radioactive materials, nuclear medicine included, inspects that use, and enforces the conditions attached to a license. In much of the country that authority is exercised by the state under an agreement with the commission, so your actual inspector may be a state official applying equivalent rules. The license is held by the hospital and administered by the radiation safety officer and the radiation safety committee, not by the equipment department. Your role is specific: do not perform work on a device handling sources without the radiation safety officer's clearance, record service on radiation-producing and source-handling equipment where the program requires it, bring your records to the radiation safety committee, and know that service on a sealed source, a brachytherapy device, or a therapy unit is usually restricted to people named in the program. State and local requirements sit on top of all four of these regimes, and the state's rule is sometimes the stricter one, so the plan's compliance statement names federal, state, and local requirements rather than federal alone.

## Patient information
**HIPAA** protects health information through a privacy rule and a security rule, and the security rule reaches every device that creates, receives, maintains, or transmits electronic **PHI**. The practical obligations for a manager are a short list: know which devices hold patient data and record it as a field in the inventory; wipe or destroy media before a device leaves the building for repair, trade-in, lease return, donation, or disposal; keep service vendors who will encounter patient information under a business associate agreement that purchasing arranges and you can cite; apply the same access discipline to device workstations as to any other system; and route any suspected loss or exposure to the privacy officer immediately, because breach response has its own clock and its own owner. Often the only person who knows a device stores patient data is you.

> Exam tip: the device agency handles classification, reporting, and recalls; the spectrum agency protects the telemetry band and expects the hospital's use to be registered and coordinated; radioactive material licensing belongs to the commission or to a state acting under agreement with it and is administered through the radiation safety officer; and the privacy and security rules follow patient data onto every device, which is why media is wiped before anything leaves the building.`,
      hook: "The device agency owns classification, reporting, and recalls, the spectrum agency protects the telemetry band, radioactive material licensing runs through the radiation safety officer under the commission or an agreement state, and patient data on devices is wiped before they leave the building."
    },
    {
      id: "u5l6", title: "Surveys: Preparing, Hosting, and Answering Findings", domain: 3, obj: "OPS-F", minutes: 9,
      body: `Two surveyors arrive on a Tuesday morning with no notice. By ten o'clock one of them is in a critical care unit reading the label on an infusion pump, and by eleven you are being asked for that pump's history, the competency record of the technician who last touched it, and the evidence behind the interval it is maintained on. Nothing you do this week changes the answer. The answer was built over the preceding year.

## The cycle, and the only sane preparation
Accreditation surveys are unannounced, and the agency's own surveyors may arrive to validate an accreditor's work or to investigate a complaint at any time. That rules out preparation as an event. The only preparation that works is keeping the evidence current year-round and knowing exactly where each piece lives, so that assembling it is a retrieval rather than a project.
\`\`\`
Evidence                        Current means
Equipment inventory             complete, regardless of ownership, with
                                critical equipment identifiable and the
                                alternative program identifiable
Completion performance          this month's rates by department, with the
                                misses, their reasons, and closing dates
High-risk and life-support      every record, complete, no gaps
records
Incident and recall files       each one closed with per-unit evidence, or
                                open with an owner and a date
The management plan             current version, with this year's annual
                                evaluation and the committee's approval
Training and competency         for your staff and sampled for contractors
Test equipment calibration      certificates on file, nothing overdue
Alternative program evidence    the risk assessment and the qualifications
                                behind each equipment type in it
\`\`\`

## Tracers, and how a surveyor actually works
A tracer starts with a real device in a real unit rather than with your binder. The surveyor reads the tag, asks the nurse what happens when it fails, then follows that single device into the inventory, into the schedule, into the service history, into the competency record of whoever worked on it, and into the plan that says how it should be maintained. Weak links show up instantly: a tag that is not in the inventory, a history with a gap, an interval nobody can explain. Run your own tracers monthly on a device picked at random, with a supervisor, and fix what you find before someone else does.

## Hosting
Host it yourself and keep the circle small. Answer the question that was asked, show the record, and let the record speak. Do not speculate, do not volunteer a problem you have not fixed, and do not guess at a number you can look up in two minutes. If you do not know, say you will find out, then find out and come back. Brief the staff beforehand on the same three rules, make sure every technician can describe their own competency record and where the procedures live, and have one person whose only job that day is fetching documents so the conversation never stalls.

## Findings, and the plan that closes them
A finding is not negotiable by argument; it is answered by a corrective action plan.
\`\`\`
Part of the plan          What it must contain
What was wrong            the finding in the surveyor's terms, not yours
Scope                     how many devices, units, or records are affected,
                          which usually exceeds the one they found
Root cause                why it happened, not who. A cause of "technician
                          error" is almost never a cause
Corrective action         the fix for the instances found
Preventive action         the fix applied everywhere the same cause acts
Owner and date            one name per item, one date per item
Evidence of completion    what you will show, and the date you will show it
Sustainment              the measure that proves it held, reported to the
                          committee for an agreed number of months
\`\`\`
Submit it inside the accreditor's stated timeline, close each item on its date, and report the plan's status to the environment of care committee until every item is verified and holding.

> Exam tip: surveys are unannounced, so the evidence must be current year-round rather than assembled on arrival. A tracer follows one real device from the unit into the inventory, schedule, history, and competency records. Answer the question asked and show the record, and answer a finding with a corrective action plan carrying scope, root cause, corrective and preventive action, owners, dates, and evidence of completion.`,
      hook: "Surveys arrive unannounced, a tracer follows one device from the bedside through the inventory, schedule, history, and competency records, and a finding is answered with a corrective action plan carrying scope, root cause, owners, dates, and evidence of completion."
    }
  ]
});

FRA.units.push({
  id: "u6", n: 6, title: "Projects, Capital Planning, and Stakeholders", domain: 3,
  blurb: "How a manager evaluates technology requests, runs the projects that follow, and works with everyone else in the building.",
  assumes: "Unit 5. You should know the plan, the committees, and the regulators before you spend capital.",
  lessons: [
    {
      id: "u6l1", title: "Capital Planning: Evaluating Healthcare Technology Requests", domain: 3, obj: "OPS-H", minutes: 10,
      body: `Eleven capital requests arrive on your desk for review before the committee meets. Two name a specific manufacturer in the first sentence. One is for a device whose predecessor the hospital bought three years ago and has used twice. Your job is not to approve or refuse any of them. It is to make each one honest enough that the committee can decide.

## What your review adds
Clinical departments write what they want. Somebody has to write what it will cost and whether the hospital can run it, and that somebody is you, because you hold the cost history, the failure data, and the support-withdrawal notices. Your review strips out the marketing claims, adds the costs the requester did not see, and states one recommendation with the alternatives compared against it.
\`\`\`
Element                   What you supply
Clinical need             the problem the device solves, in the using
                          department's own words, with the consequence of
                          not funding it
Alternatives              do nothing, repair, refurbish, share an existing
                          device, outsource the service, buy a different
                          model
Total cost of ownership   purchase plus installation and site preparation
                          plus service plus parts plus consumables plus
                          training plus disposal, across the life
Service strategy          in-house, contract, or time and materials,
                          priced for the whole life, with the training and
                          test equipment each option needs
Standardization           whether it matches models already owned, and
                          what a new model adds in training and parts
Cybersecurity             the MDS2, the operating system and how long it
                          is supported, patching, authentication, encryption
Regulatory                what the device drags in: a license, a shielding
                          requirement, a reporting duty, an accreditation
                          standard
Staffing and training      the hours it adds, the competencies it needs,
                          and who delivers the operator training
Feasibility               whether the hospital can physically site, power,
                          network, and service it
\`\`\`

## Scoring, so that ranking is possible
Score every request on the same factors with the same weights, publish the weights before you score, and rank. The committee's real question is never whether a device is worthwhile; it is why this one before that one. A scoring sheet answers that in one page and survives the question asked two years later. Common factors are clinical need, regulatory or safety driver, condition or support status of what it replaces, total cost of ownership, downtime impact, standardization fit, and staffing impact. Score from the evidence, not from who asked loudest, and keep the sheet.

## The request that names a vendor
Treat a request that specifies a manufacturer in advance as unfinished. Ask the department to state the clinical requirement in functional terms, then let the evaluation compare models against those requirements. Where only one product genuinely meets a clinical need, that conclusion is defensible and belongs in writing with the reasoning. Where it does not, you have just protected the hospital from a sole-source decision made in a sales meeting, and protected the requester from a device that nobody can service.

## The committee and the record
The capital or technology committee decides, and senior leadership funds. Bring one page: the recommendation, the ranked list, what the hospital carries if the lower items are not funded, and the funding and timing implications. Communicate the outcome back to every requester, including the declined ones, with the reason and what would change the answer, because a requester who understands the reason comes back next year with a better case rather than a complaint. Then keep the evaluation record: the request, the clinical statement, the cost model, the options compared, the score sheet with its date and author, the recommendation, and the decision with the body and date that made it. That file is what answers an auditor, a successor, or a director who wants to know why the hospital owns what it owns.

> Exam tip: the department's contribution to a capital request is total cost of ownership, service strategy, feasibility, standardization, cybersecurity, regulatory impact, and staffing, plus one clear recommendation. Rank competing requests against published weights, send the recommendation to the capital or technology committee, and keep the dated evaluation record.`,
      hook: "Capital review turns a department's wish into a decision the committee can make: total cost of ownership, service strategy, feasibility, standardization, security, regulatory and staffing impact, scored against published weights and recorded."
    },
    {
      id: "u6l2", title: "Project Feasibility: Space, Site Preparation, Power, Network", domain: 3, obj: "OPS-H", minutes: 9,
      body: `A large analyzer is delivered on a Thursday. It does not fit through the final doorway, the room has no floor drain, and the only available receptacle is on the same circuit as two refrigerators. All three facts were knowable in March. Nobody was asked to find them out, which is the actual failure.

## The feasibility questions, before the order
\`\`\`
Domain              What has to be confirmed, in writing
Space               footprint with service clearances, ceiling height,
                    weight and floor loading, and what the room displaces
Delivery path       doorway and corridor widths, turns, elevator
                    dimensions and capacity, loading dock, and whether a
                    wall has to come out
Site preparation    construction, shielding where radiation is involved,
                    casework, flooring, and who pays for each
Environment         heat load and cooling, the HVAC capacity serving the
                    room, ventilation and air changes, humidity, noise,
                    and vibration
Power               load, receptacle type and quantity, which branch it
                    must be on, grounding, and whether the device needs
                    conditioned power or a UPS
Water and gas       supply, pressure, quality, drainage, medical gases and
                    vacuum, and whether a new outlet is needed
Network             drops and their locations, addresses, segment,
                    bandwidth, interfaces to the record, and wireless
                    coverage in the room
Security review     the information security assessment and the agreement
                    with information technology, before purchase
Access and safety   how staff and patients move around it, and what the
                    installation does to egress during the work
\`\`\`

## The site survey
Do it in the room, with the people who own each utility, before the purchase order goes out. Bring the manufacturer's site planning documents and a tape measure, and walk the delivery route from the dock to the final position rather than reading a drawing of it. Take facilities, information technology, infection control where construction is involved, and the clinical department. Write it up the same day: what was found, what has to change, who owns each item, what it costs, and how long it takes. The survey is also where long-lead items surface, and a shielded room, a new electrical circuit, or a network drop in a finished ceiling can easily outlast the delivery date of the device.

## Who signs off
\`\`\`
Requirement                     Whose signature closes it
Space and structure             facilities, with the clinical department
Construction and shielding      facilities and the project manager, with
                                the radiation safety officer where relevant
Power and emergency branch      facilities electrical
Water, drains, and gases        facilities plumbing and mechanical
Network, addresses, security    information technology and the security
                                officer
Infection control during work   the infection control practitioner, through
                                the construction risk assessment
Clinical workflow               the using department's leader
Service and maintainability     you, and nobody else can
\`\`\`
Collect them as a single sign-off sheet attached to the project file. An unsigned requirement is an assumption, and assumptions are what arrive on a Thursday.

## What a missed requirement costs
It costs money, time, and credibility, in that order. Money, because an electrical circuit pulled after the walls close costs several times what it would have cost in the planning, and because the device sits idle while it is arranged. Time, because the clinical department has already scheduled patients around the go-live date you gave them. Credibility, because the next project will be planned without you if the last one surprised everyone. The cheapest hour in any project is the one spent in the room before the order is placed.

> Exam tip: feasibility is confirmed in writing before the purchase order: space with clearances and floor loading, the delivery path, site preparation and shielding, cooling and ventilation, power including branch and conditioning, water and gases, network and security review, and the clinical workflow. Every requirement carries a named sign-off, and long-lead items set the real schedule.`,
      hook: "Feasibility is a site survey done in the room before the order, covering space, delivery path, site preparation, power, water and gases, cooling, network, and security, with a named sign-off for every requirement."
    },
    {
      id: "u6l3", title: "Sustainability and Service Strategy: Parts, Training, Manuals, Life Expectancy, MAUDE Reports", domain: 3, obj: "OPS-H", minutes: 10,
      body: `A clinical department has chosen a device and everybody likes it. Before the order goes out somebody has to ask the question nobody in the demonstration asked: can this hospital keep this device running for the next ten years, and at what price. The answers are all obtainable before purchase and almost none of them are obtainable afterward.

## The sustainability questions
\`\`\`
Question                        What a good answer looks like
Are parts sold to equipment     yes, with a published or quoted price
owners                          list and a stated availability period
Are software keys, service      yes, named in the agreement, not promised
manuals, and diagnostic         in a meeting
access available
Is service training available   yes, with location, length, cost, and the
to the hospital                 same class the manufacturer's own staff
                                attend
Are service manuals and         supplied, in full, for the life of the
software updates included       device, as a named deliverable
What is the expected life       a figure you can compare against your own
                                experience with similar devices
When does support end           a date, or a statement of the policy, in
                                writing
How long is the embedded        a date, and what happens to the device
operating system supported      when that support ends
What has been reported about    search the public device experience
this model                      database before you buy
Is the vendor stable            how long in this market, installed base
                                nearby, local service presence, and what
                                happens to support if the line is sold
\`\`\`
A no to parts or a no to training is not automatically disqualifying, but it decides the service strategy for you and it has to be priced into the request rather than discovered in year three.

## Reading the public reports
**MAUDE** holds the device reports submitted to the federal agency by manufacturers, importers, and user facilities, along with voluntary reports, and anyone can search it. Use it twice. Before purchase, search the model and the manufacturer and read what other facilities have already experienced, looking for patterns rather than counting records, since a widely used model will naturally show more reports than a rare one. During an investigation, search it again to see whether the failure in front of you has a history elsewhere. Pair it with the recall and advisory history for the model, and with a question to other managers who already own one.

## Choosing the strategy at purchase
\`\`\`
Situation                                   Strategy that usually fits
One device, no trained staff, no parts      a negotiated contract, with the
route, remote location                      terms and exclusions fought over
Several units, parts and training           in-house, with a second
available, stable staff                     technician trained
Moderate volume, hard failures rare         first look in-house with vendor
                                            escalation, or time and materials
Large fleet, low unit value, low risk       in-house, time and materials for
                                            the exceptions
Offered at the point of sale with no        decline and decide later. This is
service input                               the most expensive option on the
                                            list and the hardest to leave
\`\`\`
Decide before signature, because the service decision is cheapest at the moment the hospital still holds the purchase. After the sale there is no leverage: not on parts pricing, not on training seats, not on manuals.

## Writing it into the contract
Name every deliverable with a price or a date: parts discount and availability period, training seats and when they will be delivered, manuals and software including updates, diagnostic access and passwords, response commitments with a remedy when missed, exclusions listed by name, the cancellation clause, and what happens at end of support. Arrange with materials management that payment can be withheld until the unpriced deliverables arrive. Then record the sustainment commitments in the asset record, so the manager who inherits the device in six years can find out what the hospital was promised.

> Exam tip: before purchase, confirm parts availability and pricing, training availability, manuals and software and diagnostic access, expected life and end of support, the operating system's support horizon, the model's public report and recall history, and vendor stability. Choose the service strategy before signature, because the hospital has no leverage afterward.`,
      hook: "Sustainability is decided before purchase: parts, training, manuals and keys, expected life and end of support, the model's public report history, and vendor stability, with the service strategy and every deliverable written into the contract."
    },
    {
      id: "u6l4", title: "Standardization: the Argument and Its Limits", domain: 3, obj: "OPS-H", minutes: 9,
      body: `The hospital owns four models of infusion pump across six units, with three sets of disposables, three pump libraries, and three training programs. A nurse who floats between units has to remember which one she is in front of. You have been asked to write the case for consolidating, and you also have to be honest about where consolidation should stop.

## The argument
\`\`\`
Benefit                     How it shows up
Patient safety              one interface, one alarm behavior, one set of
                            habits. User familiarity cuts use error,
                            especially for floating and agency staff
Training                    one operator program and one service school
                            instead of three or four of each
Parts                       one parts float covers more devices, stock
                            turns improve, and fewer part numbers go
                            obsolete on the shelf
Procedures                  one maintenance procedure, one risk
                            assessment, one set of test settings
Contract leverage           volume concentrated with one supplier buys
                            price, response commitments, and training
Downtime                    any unit's spare fits any other unit
\`\`\`
The safety argument is the one that wins committees, and it is also the honest one. Equipment variation in a clinical area is a known contributor to use error, and use error is work your department absorbs and your patients occasionally pay for.

## How to advocate for it
1. **Bring the data.** Models in service by unit, use error and cannot-duplicate work orders by model, repeat repairs, training hours by model, parts held by model, and the cost of service ratio by model.
2. **Bring the clinical voice.** Nursing and the specialty departments have to want it, or it will be undone by the first exception request. Ask them what they would lose, and take the answer seriously.
3. **Name the transition cost.** Standardizing means replacing devices that still work, retraining every operator, and running two fleets during the changeover. Say so, and put it in the capital plan rather than hiding it.
4. **Take it to the committee.** Capital and technology for the funding decision, patient safety for the safety case, and the environment of care committee for the plan implications.
5. **Write the rule down.** A standard that is not in the equipment plan and the purchasing policy lasts until the next sales visit.

## The limits
Standardization is a policy, not a religion. A clinical specialty may genuinely need a device that the standard does not cover, and refusing on principle is how a department loses its credibility with physicians. Single-sourcing a fleet concentrates risk: one recall, one price increase, one supply interruption, or one end-of-support announcement now hits everything at once, and the vendor knows your switching cost. Standardizing on a model late in its life locks the hospital into an obsolescence date. And a standard with no exception route produces quiet non-compliance instead of consistency, so publish the exception process: who requests, what evidence is required, who decides, and the date the exception is reviewed.

## Accessories, consumables, and the formulary idea
The argument applies as strongly below the device as to the device. Cables, probes, cuffs, circuits, sets, and batteries drive a large share of cost, downtime, and user frustration, and consolidating them is cheaper and faster than consolidating capital. Borrow the idea the pharmacy already uses: a published list of approved device types and accessories that the hospital buys, maintained by a committee, with a defined route for adding something new and a defined review for removing it. Purchasing enforces the list, you maintain the technical content, and the clinical departments own the exceptions, which is the only arrangement that survives contact with a sales representative.

> Exam tip: standardization buys safety, training, parts, procedure, and contract leverage, and the safety argument is the strongest one. Its limits are genuine clinical specialty needs, vendor lock-in and concentrated recall or supply risk, and obsolescence, so publish a written exception route and apply the same discipline to accessories and consumables.`,
      hook: "Standardization buys fewer use errors, one training program, one parts float, and contract leverage, limited by genuine specialty needs, vendor lock-in, and obsolescence, so the standard carries a published exception route and extends to accessories."
    },
    {
      id: "u6l5", title: "Coordinating Service Providers Across the Lifecycle: Acquisition, Contracting, Installation, Training, Sustainment", domain: 3, obj: "OPS-C", minutes: 10,
      body: `A vendor engineer spends three hours in an operating room on a Saturday, changes a board, and leaves. No service report arrives. Six weeks later the device fails in a case, the investigation asks what was done in that visit, and the answer is that nobody knows. The department is accountable for the whole maintenance history of that device, including the parts of it that other people performed.

## The coordination role, stage by stage
\`\`\`
Stage            What you coordinate
Acquisition      bring cost history, failure data, and support-withdrawal
                 notices into the evaluation; filter the marketing claims;
                 compare total cost of ownership and serviceability
Contracting      negotiate price, training, manuals, parts discounts,
                 response commitments, exclusions, and cancellation while
                 you still hold the purchase
Installation     site preparation, delivery, and the vendor's own work
                 scheduled against the clinical calendar
Acceptance       the incoming inspection and performance test the device
                 must pass before the hospital accepts and pays
Inventory        asset record created, cost and ownership entered, risk
                 scored, schedule assigned, tag applied
Training         operator and service training delivered before clinical
                 use, with competency recorded
Sustainment      scheduled and unscheduled work, parts, recalls, patching,
                 and cost tracking, whoever performs it
End of life      data wiped, asset retired in the inventory, book value
                 settled, disposal method documented
\`\`\`

## Acceptance testing is the leverage point
Incoming inspection is not a formality and it is the last moment the hospital holds the money. Confirm the device is the model and configuration that was ordered, that the accessories and the unpriced deliverables arrived, that it performs to specification, that it is electrically safe, that its software version is recorded, and that the installation met the site requirements. Then accept it in writing. A device put into clinical use before it was inspected is both a safety exposure and a lost negotiation, because the invoice clears the moment the priced items are signed for.

## One documentation standard for everyone
Internal and external providers are held to the same record. Every visit by a vendor, a manufacturer, a contractor, or another hospital department is logged in the work order system against the asset, with what was found, what was done, which parts were used, and the hours. Make it enforceable rather than hopeful:
1. **Pay for outside service from the department's budget**, because control of payment is the only real leverage there is.
2. **Allow check-in by email** to a named person rather than a walk to the shop, since vendors arrive after hours and resent the trip.
3. **Write the requirement into contracts and purchase orders**, with failure to check in named as grounds for a penalty or termination.
4. **Tell every provider in writing** that payment follows a check-in, a check-out, and a service report inside 24 hours of the visit.
5. **Verify credentials** by sampling: ask for the training records and competency assessments of the people working on your equipment, because the duty to ensure the person is qualified does not transfer with the contract.

## Performance reviews and escalation
Review each significant provider on the record rather than on impressions: response times promised against met, scheduled visits delivered on time, reports received within the deadline, repeat visits for the same fault, parts lead times, quoting accuracy, and billing disputes. Take the scorecard to the vendor annually and at renewal, and share it with purchasing, since a vendor that knows it is measured behaves differently from one that does not. Publish an escalation path with names and timescales for both sides: the technician's contact, the service manager, the regional manager, and the point at which you involve purchasing and consider withholding payment or invoking the cancellation clause. Agree it at signature, because an escalation path invented during an outage is just a series of phone calls.

> Exam tip: the department coordinates every lifecycle stage and holds internal and external providers to the same documentation standard. Incoming inspection and acceptance testing happen before clinical use and before payment, every vendor visit is logged in the work order system, and payment control plus contract language is what makes check-in and service reports actually happen.`,
      hook: "The department coordinates acquisition, contracting, installation, acceptance, training, sustainment, and disposal, holding vendors to the same record as its own staff by paying for outside service and writing check-in and reporting into the contract."
    },
    {
      id: "u6l6", title: "Project Management: Plans, Schedules, Stakeholders, and the Sustainment Plan", domain: 3, obj: "OPS-I", minutes: 10,
      body: `A monitoring system replacement across four units has a budget, a vendor, and a go-live date somebody announced at a meeting you were not in. Nobody owns the training schedule, the network drops are not ordered, and the old devices have nowhere to go. A project is not a purchase with enthusiasm attached. It is a scope, a schedule, a budget, named owners, and a plan for what happens after the vendor leaves.

## What the plan contains
\`\`\`
Component         What it must state
Charter           the objective, the sponsor, the budget, the deadline,
                  and what is explicitly out of scope
Scope             what is being delivered, in what quantity, where, and
                  what the project is not doing
Tasks and roles   every task with one name against it, every role on the
                  project defined, and the decisions that must be made
                  before work can start
Schedule          dates, with long-lead items identified: construction,
                  shielding, network drops, delivery windows, training
Budget            capital and operating lines, with site preparation,
                  training, and disposal named rather than assumed
Stakeholders      everyone who must be consulted or informed, with what
                  each needs and when
Risks             what could delay or break it, how likely, the
                  mitigation, and the owner, reviewed as the project moves
Communication     who reports what to whom on which day, agreed up front
Acceptance        the inspection and performance test the deliverable must
                  pass before the hospital accepts it
\`\`\`

## The vocabulary you are expected to recognize
A **milestone** is a dated checkpoint with no duration of its own, such as "shielding complete" or "first clinical use". The critical path is the longest chain of dependent tasks through the schedule; any slip on it slips the finish date, and tasks off it have slack. A change request is the formal route for altering scope, schedule, or budget once the plan is baselined, and it carries the cost and schedule impact of the change so the sponsor is deciding rather than discovering. Scope creep is what happens in the absence of that route. A dependency is a task that cannot start until another finishes, and it is where most hospital projects fail, because the dependency usually belongs to another department.

## Coordinating across departments
Projects in a hospital are rarely limited by technical difficulty; they are limited by other people's calendars. Facilities holds construction and utilities, information technology holds the network and the interfaces, materials management holds purchasing and receiving, infection control holds the construction risk assessment, education holds the training rooms, and the clinical department holds the only hours in which anything can actually be installed. Put a representative from each in the project, meet on a fixed day, publish a one-page status with the decisions needed, and take the dependencies that belong to others into the risk list rather than assuming they will arrive.

## Go-live, and the plan that outlives the project
\`\`\`
Sustainment item           What has to be true before you close the project
Inventory                  every asset recorded with cost, owner, risk
                           score, and schedule assigned
Maintenance                procedures written, intervals set, test
                           equipment and kits in hand
Parts                      initial stock on the shelf and a sourcing route
Training                   operators trained and recorded; service
                           training delivered; materials where staff find them
Service strategy           live, with the contract or the in-house
                           arrangement actually in force on day one
Software                   versions recorded, patch route agreed, backups
                           and a tested restore in place
Cybersecurity              segment, accounts, and vendor remote access
                           settled with the security officer
Documentation              manuals, passwords, and support contacts filed
Old assets                 retired in the inventory, data wiped, disposal
                           documented
\`\`\`
Then close it out properly: final cost against budget, what was learned, who to thank, and a written statement to the sponsor that it is done. Lessons learned are worth an hour only if they change a template, a checklist, or a contract term; otherwise they are a file nobody opens.

> Exam tip: a project plan carries scope, schedule with long-lead items, budget, named owners, stakeholders, risks, and a communication plan. Acceptance testing precedes go-live, the sustainment plan covers inventory, maintenance, parts, training, service strategy, software, security, and documentation, and close-out compares cost to budget and records lessons learned.`,
      hook: "A project is a charter, a scope, a schedule with its long-lead items, a budget, named owners, a risk list, and a sustainment plan that leaves the device inventoried, scheduled, stocked, trained, secured, and documented."
    },
    {
      id: "u6l7", title: "Construction Planning, Utility Interruption, Change Management, and Downtime Procedures", domain: 3, obj: "OPS-L", minutes: 9,
      body: `Facilities sends a notice that a riser will be isolated on Sunday from six in the morning until noon. It names a floor, not a room, and it goes to eleven people, none of whom know which devices in that area run on battery and for how long. Reading that notice as a clinical event rather than a plumbing announcement is the whole job.

## Why you sit in construction planning meetings
Equipment decisions made on a drawing become construction costs nobody budgeted, or worse, a finished room that cannot hold the device the department ordered. Attend the planning and design meetings, bring the equipment list with its space, power, network, and environmental requirements, and ask the questions only you will ask: where does the device go, how does it get there, what does the room displace, and who maintains the thing once it is installed. Three other items are yours in a construction project. Equipment moves: what gets relocated, when, who verifies it works afterward, and what the unit uses meanwhile. The infection control risk assessment, which decides containment, airflow, and work hours for the project and reaches you whenever devices or utilities are opened up. And interim life safety measures, the temporary compensations that apply while life safety features are impaired by the work.

## Utility interruption planning
\`\`\`
Step                      What it means in practice
Receive the notice        one named owner reads every utility notice, with
                          a backup, and converts it into a device question
Identify the scope        which rooms, which devices, which systems,
                          including the ones fed from that riser two
                          floors away
Assess clinical impact    what cannot run, what runs on battery and for
                          how long, what has to move, and what procedure
                          has to be rescheduled
Plan the coverage         backup power: emergency branch receptacles and
                          what the generator actually feeds, plus spare
                          devices, battery charging beforehand, cylinders
Notify the units          in writing, with the time window, the affected
                          devices, and what to do instead
Attend the interruption   somebody from the department present, reachable,
                          and able to make a call
Test on restoration       devices verified before patients, not after:
                          power-up, self-test, settings, alarms, network
Document                  what was interrupted, what was tested, what
                          failed, and what was corrected
\`\`\`
The step that gets skipped is the last-but-one. A device that was off is not a device that is working, and settings, alarm limits, and network connections are exactly what a power event quietly discards.

## Change management for system changes
Anything that touches a clinical device or the network it depends on goes through the formal change process: a written request with the devices affected, a joint assessment with information technology and the manufacturer, approval, a scheduled window with a back-out plan, a test afterward including the interfaces, and a record of the version and the result against each asset. The pattern behind nearly every self-inflicted clinical outage is the same: a reasonable change made quietly, and nobody afterward able to say what had changed, so nobody could put it back.

## Downtime procedures
\`\`\`
System down              What the procedure has to answer
The work order system    how requests are captured on paper, who holds the
                         critical contact list, how the backlog is entered
                         afterward, and how a recall in progress is tracked
The record system        where device data goes during downtime, who
                         reconciles it afterward, and which devices need
                         their data retrieved manually
Networked devices        what the device does standalone, for how long,
                         what degrades silently, and when a patient must
                         be moved to a different device
\`\`\`
Write both halves, because recovery is where the harm usually happens: who declares the system restored, how downtime data is reconciled into the record, how each device is verified before it goes back to a patient, and who confirms the unit is back on normal workflow. Publish the procedures before the interruption, confirm the units actually hold them, and exercise them, because a drill is the cheapest place to find out that a phone number is wrong.

> Exam tip: utility notices are converted into a device list, a clinical impact assessment, written notification, attendance, and verification of every affected device before patients return to it. System changes run through formal change management with a back-out plan, and downtime procedures must cover recovery and reconciliation as well as the outage itself.`,
      hook: "A utility notice becomes a device list, a clinical impact assessment, unit notification, attendance, and verification on restoration, while changes run through formal change control and downtime procedures cover recovery as well as the outage."
    },
    {
      id: "u6l8", title: "Meetings, Rounding, Huddles, and Communicating with Department Leaders and Vendors", domain: 3, obj: "OPS-J", minutes: 9,
      body: `A nursing director stops you in a corridor and says her unit never hears anything from your department. Your records show eleven work orders closed on her unit last month, all within target. Both of you are telling the truth. The work happened and the communication did not, and in her experience those are the same thing.

## The meetings a department runs
\`\`\`
Meeting            Cadence      What it produces
Daily huddle       every        fifteen minutes standing: today's
                   morning      priorities, the backlog, who is blocked,
                                who is out, which units are hot
Shop meeting       monthly      the numbers, the goals, policy and
                                procedure changes, training, and the
                                staff's own items
One to one         monthly      performance, development, and anything
                                that should never first appear in an
                                annual review
Unit leader        monthly or   their equipment, their complaints, their
meeting            quarterly    projects, and what they need from you
Vendor review      annually     the scorecard, the open issues, and the
                   and at       renewal position
                   renewal
Committees         per the      the number, the trend, the cause, the
                   calendar     action, and the request
\`\`\`
Every meeting has an agenda sent in advance and minutes that record decisions, actions, owners, and dates. Minutes are not a transcript; the only lines that matter are the ones somebody has to do something about. Read last meeting's actions out at the start of this one, because an action list that is never revisited trains people to ignore it.

## Rounding, which is the one that changes perception
Walk the clinical units on a schedule, without a work order in hand. Ask three questions: what is not working, what is annoying you that you have stopped reporting, and is anything coming that I should know about. You will find unreported faults, devices stored in ways that shorten their life, training gaps, and the pump that has been "fine" for three months with a cracked housing. Write down what you are told, act on something visible from each round, and come back and say what you did. Rounding is also where inventory accuracy quietly improves, because you can check a sample of asset tags while you are standing there.

## Vendor communication
Decide who talks to whom and keep to it. Routine technical traffic runs between the technician and the service engineer; commercial traffic, performance problems, and anything involving money run through you and purchasing. State issues in writing with the asset number, the dates, the commitment that was missed, and what you want done, then escalate on a published path with timescales rather than on frustration. Bring the scorecard to the annual review and to the renewal, where it is worth more than any argument. And never let a vendor negotiate around you with a clinical department: when that starts, bring the conversation back into a scheduled meeting with purchasing present.

## Communication that gets cooperation
Three habits do most of the work. Tell people bad news first and from you, because a problem a director hears from their nurse before they hear from you costs twice. Say what you need in one sentence, with the consequence of not getting it, instead of describing the situation and hoping. And document commitments, in both directions: an email the same day saying what was agreed, who owns it, and by when. Half the conflicts a manager handles come from two people remembering a corridor conversation differently, and a short written note closes that gap for the cost of five minutes.

> Exam tip: daily huddles for priorities and blockers, monthly shop meetings for numbers and goals, scheduled rounding for unreported problems and relationships, and committee reports for decisions. Every meeting leaves minutes with actions, owners, and dates, and every commitment, including a vendor's, is confirmed in writing.`,
      hook: "Huddles handle today, shop meetings handle the numbers, rounding surfaces what nobody reported, and every meeting and vendor commitment leaves written actions with owners and dates."
    },
    {
      id: "u6l9", title: "Collaboration with IT, Nursing, Informatics, Facilities, and Senior Leadership; Device Interoperability", domain: 3, obj: "OPS-L", minutes: 10,
      body: `A monitoring upgrade goes in over a weekend. On Monday the vital signs stop reaching the patient record. The monitors are fine, the network is fine, the record system is fine, and the interface between two of them is not, because the upgrade changed a field and nobody owned the interface. Interoperability is a relationship problem that presents as a technical one.

## Assessing needs with the people who have them
Before any technology decision, consult four groups and record what each said. Users know what the workflow actually is, as opposed to what the procedure says. Management knows the service line's direction and what is funded. Vendors know what the product can and cannot do, and what it will cost to make it do more. Your own technicians know what fails, what is unserviceable, and what the last three of these you bought turned out to be like. A requirement list assembled from all four survives contact with reality; one written from any single source does not.

## Who you work with, and on what
\`\`\`
Partner                What you share, and the standing agreement
Information            the network, addresses and segments, security,
technology             patching windows, and remote access. Agree in
                       writing who owns the device, who owns the network,
                       who may change a configuration, and the joint
                       incident path
Nursing                use, training, workflow, alarms, storage, and the
                       complaint you close visibly. A named contact per
                       unit in both directions
Informatics            interfaces to the record, data definitions, what
                       is captured and how it is used, and testing after
                       any change on either side
Facilities             power, water, gases, ventilation, construction
                       schedules, and utility interruptions
Materials management   purchasing, receiving, consignment, consumables,
                       and withholding payment when terms are not met
Senior leadership      scheduled meetings and short written reports with
                       the number, the trend, the cause, and the decision
                       you need. Never a surprise
Clinical specialties   imaging, laboratory, perioperative, dialysis,
                       and sterile processing, each with its own
                       regulators and its own accreditation checklists
\`\`\`

## The interface, and who owns it
An interface is a thing somebody has to own, not a space between two owners. Write it down for every integration: which system sends, which receives, what data, under which messaging or imaging standard and in what format, through what intermediary, who monitors it, who is called when it stops, and who must approve a change at either end. The standards themselves matter less to a manager than the fact that both ends must agree on one and neither end may change it unilaterally. Then hold an inventory of the integrations the way you hold an inventory of devices. A change control rule follows directly: any change to a device, a network, or a record system that touches an interface requires the other side to be told, tested, and signed off before clinical use. Test the data, not the connection, because an interface that is up and delivering the wrong field is more dangerous than one that is plainly down.

## Keeping interoperability working
1. **Record the integrations** with their owners and contacts, and review the list when either system changes.
2. **Define test cases** once: a known value sent from the device, found correctly in the record, against the right patient, with the right time stamp and units.
3. **Run those tests after every change** on either side, including patches, upgrades, and network changes.
4. **Monitor for silence.** The common failure is not an error message but data that quietly stops arriving, so somebody must notice absence.
5. **Treat a wrong-patient or wrong-value event as a patient safety event**, report it as one, and investigate it with the same rigor as a device failure.

> Exam tip: consult users, management, vendors, and technicians before a technology decision. Put the ownership boundary with information technology in writing, give every interface a named owner on both sides, test the data rather than the connection after any change, and treat a wrong-patient or wrong-value result as a patient safety event.`,
      hook: "Technology needs are assessed with users, management, vendors, and technicians, the ownership boundary with information technology is written down, and every interface has a named owner, defined test cases, and a test run after any change on either side."
    }
  ]
});
