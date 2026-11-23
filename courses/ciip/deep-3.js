// CIIP Academy deeper explanations, units 6 to 10. Original content. All figures in worked examples are example values.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u6l1: `## DMAIC worked on report turnaround
The chair says reports are slow. Here is how a DMAIC project handles it, with example numbers.

**Define.** The problem: routine outpatient CT reports are finalized too slowly. The goal: cut the median time from exam complete to final report to under 6 hours. The scope: routine outpatient CT, one site. The sponsor: the department chair.

**Measure.** You pull four weeks of timestamps from the RIS and PACS and split the journey into stages. Nobody argues about feelings now, because there is a baseline.

**Analyze.** The stage table shows where the time goes.

\`\`\`
Stage                                   Median hours before   Median hours after the fix
Exam complete to technologist release   3.0                   0.5
Release to first read                   4.5                   4.5
First read to final report              2.0                   2.0
Total                                   9.5                   7.0
\`\`\`

The surprise is the first row. Studies sit for 3 hours waiting for the technologist to release them, because releases are done in a batch at the end of each shift. A fishbone chart with the team shows two causes: no prompt on the console, and a belief that a release must wait for a quality check that is already done.

**Improve.** You run a PDSA test on one scanner for two weeks: a prompt appears at exam completion and the release is done on the spot. The study phase compares the measures with the prediction, and the act phase adopts the change for every scanner. The median drops from 9.5 to 7.0 hours. That is 2.5 hours gained, and it is still above the 6 hour goal, so a second cycle goes after the 4.5 hour wait from release to first read, perhaps with better worklist sorting by priority.

**Control.** You keep a run chart of the monthly median on the department dashboard, name an owner, and set a trigger: if the median rises above target for two months in a row, the team meets again. Without the control step the process drifts back.

## What the exam looks for
- DMAIC starts with a defined problem and a measured baseline; fixes come in the fourth step, not the first.
- The wait was found by measurement, not by blaming the radiologists.
- Lean would describe the same finding as waiting waste between two steps.`,

u6l2: `## Picking and combining the tools
The tools in this lesson answer different questions, and a real problem usually needs three of them in order. Here is an example from an exception queue that has grown to 140 studies.

**Step 1, describe it (SBAR).** You write to the PACS manager: situation, 140 studies are in the exception queue, up from 40 last week. Background, the order feed was changed on Tuesday. Assessment, the new feed sends patient names in a different format and the matching rule rejects them. Recommendation, approve a change to the matching rule today and assign one person to clear the queue tomorrow.

**Step 2, rank the causes (Pareto).** You count the reasons for each exception over a week and rank them.

\`\`\`
Reason for exception              Studies   Share    Running total
Patient name format mismatch      84        60%      60%
Missing or wrong accession        28        20%      80%
Wrong procedure code              17        12%      92%
Other                             11        8%       100%
\`\`\`

The first bar is 60 percent of the problem. The first two bars are 80 percent. This is the pattern the Pareto chart is built to show: a few causes make most of the trouble.

**Step 3, find the root (five whys).** Why are names rejected? The matching rule compares last name and first name in a fixed order. Why did that change? The new feed sends last name first. Why was this not caught? The change was made without testing against the matching rule. Why? The change request did not list the PACS as an affected system. Now you have a fixable root: the impact assessment in change control missed an interface.

**Step 4, confirm (run chart).** After the fix, a run chart of the daily queue size shows the drop and shows whether it stays down.

## Fishbone categories to remember
- People: training, staffing, handoffs.
- Process: steps, rules, approvals.
- Equipment: modalities, servers, workstations.
- Software: versions, settings, interfaces.
- Environment: network, power, room conditions.
- Measurement: bad data or a wrong definition.

## The exam angle
Match the tool to the verb in the question: communicate means SBAR, brainstorm means fishbone, rank means Pareto, and track over time means run chart.`,

u6l3: `## A downtime procedure staff will follow
A policy can be perfect and still fail if the procedure is a 30 page document nobody can find at 2 in the morning. Here is the shape of a procedure that works, with a short downtime example for a technologist on a night shift.

\`\`\`
Step   Action                                              Who
1      Confirm that the PACS is unreachable from a         technologist
       second workstation
2      Call the on-call analyst at the number on the card  technologist
3      Switch the modalities to the backup destination     analyst
4      Read from the backup viewer; do not delete          radiologist
       anything from the modality
5      Write patient name, MRN, and exam on the paper      technologist
       log for each exam during downtime
6      When service returns, the analyst confirms every    analyst
       paper log entry has a matching study
\`\`\`

It is short, in the order people do it, names an owner for each step, and ends with the reconciliation that most downtime plans forget. Put it on a laminated card at each console and in the on-call binder, and test it in a drill at least once a year, because untested procedures fail.

## The access lifecycle in a table
\`\`\`
Event                      Trigger                       Action
New hire                   manager request               create account with the role for the job
Job change                 HR notice or manager          move to the new role, remove the old one
Periodic review            scheduled, such as yearly     owners confirm each user still needs the role
Departure                  HR notice, same day           disable the account, retrieve devices
Long inactivity            no sign-in for a set period   disable, then review
\`\`\`

The review is the control that catches mistakes in all the other rows. An auditor will pick a few leavers and check that their accounts were disabled, so keep the evidence.

## Policy life cycle
1. The owner drafts it with the people who will follow it.
2. The governance committee approves it.
3. You publish it where staff look and train on it.
4. A review date triggers a yearly check, and a real incident can trigger an early one.

## The exam angle
When a scenario shows a former employee's account still active, the finding is a missing or skipped periodic review and termination step. When it shows staff improvising during an outage, the finding is a missing or untested downtime procedure.`,

u6l4: `## What each rule asks of the imaging team
Compliance is easier when you turn each law into the records you must be able to show. This table links the rule to the evidence.

\`\`\`
Rule                    What it requires of you                    Evidence an auditor asks for
HIPAA Privacy Rule      minimum necessary access; patient rights   role definitions, access requests
HIPAA Security Rule     administrative, physical, technical        risk analysis, audit logs, encryption
                        safeguards for electronic data             settings, workstation policy
Breach Notification     notice to patients within 60 days of       incident report, notice log, timeline
                        discovery at the latest, plus the
                        government for large breaches
HITECH                  business associates bound; higher          signed vendor agreements, breach log
                        penalties; breach notice law
MQSA                    accreditation, qualified physicians,       certificates, QC records, retention
                        QC, records, patient summary               schedule, outcome tracking
Dose tracking           record dose per exam; review outliers      dose records, review meeting minutes
\`\`\`

## A breach in practice
A radiologist opens the study of a neighbor. Your first steps: preserve the audit log entries, report to the privacy officer, and let the privacy officer decide whether it is a reportable breach. The clock to notify runs from discovery, so the record of when you found out matters. Afterward, the audit log supports the corrective action, which may include retraining or discipline under the policy. Informatics supplies the facts; the privacy and legal officers decide what the law requires.

## MQSA records in practice
The informatics team must be able to retrieve a mammogram and its report for the retention period, which is at least 5 years, or 10 years if there is no later exam at the facility, and longer if the state says so. The retention rule has to be set in the archive's lifecycle policy, so that no automatic delete removes a mammography study too early. Mammography displays are on the quality control schedule, and the records of those tests are part of the inspection.

## Dose tracking in practice
The modality sends a radiation dose structured report with each exam. The dose system stores its values, compares them with a reference level for the exam type, and flags exams above it for a physicist's review. The informatics duty is the data flow: every dose-producing modality sends the report, the values map to the correct exam type, and the review is documented.

## The exam angle
If the question names a protected data issue, the answer is HIPAA. If it names breach notification or stronger penalties, it is HITECH. If it names mammography records, it is MQSA.`,

u6l5: `## A change request from start to finish
A radiologist wants the default window setting changed on every reading workstation. It looks small. Here is how the change goes through control, written as the form the change board sees.

\`\`\`
Field                    Entry
Request                  Change default CT window on all reading workstations
Requested by             Section chief, neuroradiology
Reason                   Current setting hides a common finding type
Systems affected         Viewer profile on 24 workstations
Users affected           All radiologists in the section
Risk                     Low; setting only, no data change
Test                     Apply to two workstations for two days
Window                   Tuesday 6 AM, before the first read
Back-out plan            Restore saved profile; takes 10 minutes
Communication            Email and huddle on Monday
Approver                 Change board, signed
Post-change review       Section chief confirms after one week
\`\`\`

Every row has a purpose. Systems and users affected prevent surprises. Risk and test decide how careful to be. The window avoids busy hours. The back-out plan, written before the change, tells you how long a failure can last and when to use it. The review closes the loop.

## The operating budget as a table
\`\`\`
Line                       Last year   Next year   Why it changed
Support and maintenance    210,000     231,000     10 percent contract increase
Licenses                   60,000      66,000      two new reading seats
Storage growth             40,000      80,000      new CT doubles daily volume
Staff                      360,000     360,000     no change
Training                   15,000      20,000      workstation upgrade
Total                      685,000     757,000
\`\`\`

Check the arithmetic: 210 + 60 + 40 + 360 + 15 = 685, and 231 + 66 + 80 + 360 + 20 = 757, in thousands. The increase is 72,000, about 10.5 percent. A budget with a reason on every changed line is easy to defend.

## Capital and operating
Buying the new archive hardware is a capital purchase: it lasts years and is depreciated. The annual support on it is operating. Where the organization draws the line is a finance decision, which is why you ask finance rather than guess.

## The exam angle
- The back-out plan comes before the change.
- An emergency change still gets documented and reviewed.
- Storage growth and contract increases are the usual drivers of the operating budget.`,

u6l6: `## A monthly KPI report
Here is a one-page report as you might send it to the department chair, with example numbers. Each row has the measure, the target, the result, and an action for anything off target.

\`\`\`
KPI                     Target            This month   Last month   Status
Uptime                  99.9 percent      99.92        99.95        met
Capacity used           under 80 percent  71 percent   69 percent   met
Months remaining        over 12           14.5         16           watch
Exceptions open         under 20          34           18           missed
Unread exams over 24h   under 10          6            11           met
Lost studies            0                 1            0            missed
Report turnaround       median under 6 h  6.4 h        6.8 h        improving
Interface queue depth   under 100         40           35           met
\`\`\`

## Showing the arithmetic
Capacity: with 100 TB total and 71 TB used, 29 TB are free. At growth of 2 TB per month, months remaining are 29 divided by 2, which is 14.5. Last month the growth was lower, so the figure was higher. The trend, not just the number, is what a leader needs: 14.5 months is above the 12 month target, and falling, so the purchase process must begin before it reaches 12.

Uptime: 99.92 percent means unavailable for 0.08 percent of the month. In a 30 day month of 43,200 minutes that is about 35 minutes.

## One line per miss
- **Exceptions, 34 against under 20.** Cause: a new order feed format. Action: the matching rule was updated on the 18th, and the queue is falling. Owner: the PACS analyst.
- **Lost studies, 1.** A study sent from an outside clinic arrived with a wrong accession number and was found by search 3 days later. Action: reconcile outside studies the day they arrive.

## Choosing what goes on the page
Do not fill the page with everything you can measure. The chair needs the measures that point to a decision, and every number outside its target needs an explanation and an owner. Send it on the same day each month, and keep the definitions fixed so the trend means something. If you change a definition, say so on the page.

## Data mining and statistics, at this level
Data mining is the search for patterns, such as the finding that most exceptions come from one outside clinic. A percentile tells you how bad the slow cases are: the median is the middle value, so half the studies are slower. A control chart adds limits so you can tell normal month-to-month variation from a real change.`,

u6l7: `## Matching the chart to the question
An exam export of 200,000 rows is a list, not an answer. The work is in choosing the question first.

\`\`\`
Question from the manager                       Pivot or chart                      What you see
Which modality is growing fastest?              pivot: modality by month, then      one line rising faster
                                                a line chart                        than the rest
Which site sends the most exceptions?           pivot: site by count, then bars     one tall bar
Does study size predict transfer time?          scatter plot of images vs seconds   an upward cloud
Is today normal?                                dashboard with live counts          current values vs limits
Where do we start fixing?                       Pareto chart of causes              biggest bars first
\`\`\`

## Building a pivot table, step by step
1. Take the raw list with one row per exam: date, modality, site, status.
2. Choose the grouping: modality in rows and month in columns.
3. Choose the value: count of exams.
4. Read the totals, then change one setting at a time, for example switch the rows from modality to site.

A pivot table lets you answer five questions from one list without writing five reports, and it keeps the original data untouched.

## A misleading chart and its repair
A bar chart shows two sites with 98 percent and 96 percent on-time reports, drawn with an axis from 95 to 100, so one bar looks twice as tall as the other. The truth is a 2 point difference. The repair: start the axis at zero, or show the numbers on the bars, and say how many exams each site read. A site with 20 exams and a site with 2,000 do not deserve equal weight.

## Dashboard rules
- Show what someone must act on, not everything available.
- Put the most important measure top left.
- Use color only to flag a problem, and never rely on color alone.
- Show the time of the last refresh, because a stale dashboard is worse than none.
- Link each number to its definition.

## Correlation is not cause
If the scatter plot shows long transfer times for large studies, that is expected: more images take more time. If it shows long transfer times for one site at every size, the cause is probably the network link at that site. The chart points; you must still investigate.`,

u6l8: `## An SLA term checklist
Read every service agreement against this checklist before you sign and again at renewal. Each row shows what to ask and what should worry you.

\`\`\`
Term                    Ask                                        Red flag
Severity definitions    What makes an issue critical?              the vendor alone decides severity
Response time           How fast do they start, by severity?       response promised, no resolution target
Resolution time         How fast is it fixed or worked around?     "best effort" only
Hours of coverage       Is it around the clock for critical?       business hours only for a 24 hour service
Uptime guarantee        What percent, measured how and by whom?    measured by the vendor with no data shared
Exclusions              What does not count as downtime?           planned maintenance with no limit
Remedy                  What do you get if they miss it?           credits so small they change nothing
Escalation              Who do you call if they stall?             no named senior contact
Exit right              Can you leave after repeated misses?       none
\`\`\`

## What an uptime percentage really allows
The sheet's ladder gives 99.9 percent as 525.6 minutes of downtime in a year, about 8.8 hours. Show the arithmetic for a lower promise: 99.5 percent leaves 0.5 percent of 525,600 minutes, which is 2,628 minutes, about 43.8 hours a year. A vendor who offers 99.5 percent is allowing five times the downtime of one who offers 99.9 percent. Ask whether the stated percent includes planned maintenance. If maintenance is excluded and the vendor schedules 10 hours of it a month, the real availability is lower than the promise.

## Using the numbers at renewal
Keep a simple log all year:
- every incident with the time you called, the time they responded, and the time it was resolved;
- uptime from your own monitoring, not only the vendor's report;
- open requests that have been waiting longest.

At renewal, compare your log to the SLA. If the vendor missed response targets six times, ask for the credits, and a better remedy. If the quote rises 9 percent, ask what you receive for it, and ask for competing quotes.

## End of service life
When an end of life notice arrives, ask for four things: the final date of support, the cost of extended support if any, the supported upgrade or migration path, and whether the data format is standard so that another system can take over. The budget for replacement belongs in next year's capital plan.

## The exam angle
Response is the start of work; resolution is the fix. A guarantee with no measurement method, or with broad exclusions, is a weak guarantee.`,

u7l1: `## A TCO and ROI worked example
Two vendors bid on a five-year replacement of the PACS. Vendor X has the lower purchase price. The board wants to know which costs less to own and what the return is. Here is the five-year total cost of ownership, using example figures.

\`\`\`
Cost item (5 years)            Vendor X     Vendor Y
Purchase and licenses          350,000      420,000
Hardware and storage           180,000      140,000
Installation and migration      70,000       80,000
Training                        30,000       30,000
Support (5 years)              300,000      200,000
Staff time (5 years)           120,000       90,000
TCO                          1,050,000      960,000
\`\`\`

Add the columns: for X, 350 + 180 + 70 + 30 + 300 + 120 = 1,050 (thousands); for Y, 420 + 140 + 80 + 30 + 200 + 90 = 960. On the purchase price alone X wins by 70,000. On total cost of ownership Y wins by 90,000. This reversal is the whole reason for TCO: the quote is not the cost.

## ROI and payback for the winner
Suppose Vendor Y saves 240,000 a year in avoided repeat exams, faster reading, and the retirement of an old support contract, which is 1,200,000 over five years.

\`\`\`
ROI      = (gain minus cost) / cost x 100
         = (1,200,000 minus 960,000) / 960,000 x 100
         = 240,000 / 960,000 x 100 = 25 percent
Payback  = cost / annual savings
         = 960,000 / 240,000 = 4 years
\`\`\`

A 25 percent return over five years, and the money comes back in 4 years. If the system were expected to last only 3 years, the payback would exceed its life and the case would be weak, so always compare the payback with the expected life.

## Other justifications
Not every project has a return in dollars. Replacing a system whose vendor has ended support is justified by risk: if it fails there is no fix. Meeting a regulation, closing a security gap, and supporting a strategic goal are also valid cases. State the dollar ROI where you can, and the risk where you cannot.

## Definition items in order
The justification is one part of the project definition. The rest, in order, are goals, scope, preliminary budget, procurement policies, the evaluation and selection process, governance, and the plan with milestones and dates. The exam may list these and ask which one is missing from a project that is stuck.

## Reading the question
Use the formula that matches the verb: percent return means ROI, how long until the money is back means payback, and all costs over the life means TCO.`,

u7l2: `## From interviews to a requirement
Needs assessment turns what people say into something a vendor can answer. Follow one need from interview to requirement.

**Interview.** A radiologist says, "I wait too long for priors." That is a symptom.

**Observe.** You sit in the reading room. Priors from the old archive take about a minute each to appear, and the radiologist reads on without them in many cases.

**Document.** "Prior studies from the old archive load slowly; the radiologist often skips them."

**Analyze.** Other sections report the same. The cause is the old archive's retrieval path, not the viewer.

**Prioritize.** Must-have, because missing priors can change a read.

**Validate.** You show the final list to the section chiefs, and they confirm it.

**Requirement as written.** "Prior studies from the archive, including migrated studies, must display within a stated time of opening a current study, demonstrated with the sample studies provided." Now a vendor can answer, and you can test it.

## The three requests compared
\`\`\`
Document   Purpose                              Contains                         Vendor answers with
RFI        learn the market                     your general need, short         brochures and general capability
RFP        select a complete solution           numbered requirements, criteria  a proposal, a price, and a plan
RFQ        buy a defined item                   exact specification and quantity a price and delivery date
\`\`\`

## A requirement table that works
\`\`\`
No.   Requirement                                   Priority      Vendor response
12    Send a study to an outside site by DICOM      must-have     standard / configured / custom / no
13    Show a prior from the migrated archive        must-have     standard / configured / custom / no
14    Dictation macros in the viewer                nice-to-have  standard / configured / custom / no
\`\`\`

## Vendor qualification checklist
- Customers of your size and type that have been live for a year or more.
- Financial strength and how long they have sold the product.
- Support staff and a response path in your region.
- A product roadmap that does not end soon.
- Standards support, such as DICOM and the IHE profiles, stated in conformance documents.

## Finalizing the request
Before sending, confirm the evaluation criteria and their weights are in the document, the deadline and the single contact are named, and every vendor gets the identical package at the same time. Questions and answers go to all vendors.

## The exam angle
If the question is about the order, assessment comes first, then the request, then the evaluation. If a department asks for a product by name, ask what problem it should solve.`,

u7l3: `## A weighted scoring matrix, filled in
Three vendors finished the scripted demonstration. Each evaluator scored each criterion from 1 (poor) to 5 (excellent), and these are the averaged scores. The weights were agreed before the proposals were opened and add to 100.

\`\`\`
Criterion            Weight   Vendor A   Vendor B   Vendor C
Clinical function    25       4          5          3
Integration          20       5          3          4
Total cost (TCO)     20       3          3          5
Support and SLA      15       3          4          4
Vendor viability     10       4          4          3
References           10       5          3          4
\`\`\`

## Computing the totals
Multiply each score by its weight and add.
\`\`\`
Vendor A: 4x25 + 5x20 + 3x20 + 3x15 + 4x10 + 5x10 = 100 + 100 + 60 + 45 + 40 + 50 = 395
Vendor B: 5x25 + 3x20 + 3x20 + 4x15 + 4x10 + 3x10 = 125 + 60 + 60 + 60 + 40 + 30 = 375
Vendor C: 3x25 + 4x20 + 5x20 + 4x15 + 3x10 + 4x10 = 75 + 80 + 100 + 60 + 30 + 40 = 385
\`\`\`
The maximum is 500, so A scores 79 percent, C scores 77 percent, and B scores 75 percent. The totals are close, and you should say so.

## Reading a close result
When scores are within a few points, the matrix does not decide alone. Look at the details: Vendor B won clinical function, but its references were weak. A weak reference score means current customers had problems after go-live, which the demonstration would not show. Vendor C is cheapest to own, but its clinical function score is the lowest. Test the weights too: if cost weight were 10 and clinical function 35, would the order change? If the winner changes with small shifts in the weights, the choice is fragile, and the team should discuss it openly.

## Reference call questions
- What did you not expect at go-live?
- How long did the migration take compared with the promise?
- How does the vendor respond when something breaks?
- Have upgrades gone smoothly?
- Would you buy again?

## Contract checklist
\`\`\`
Clause                    What good looks like
Acceptance criteria       written tests; final payment after they pass
Uptime and support        measured uptime, response and resolution times, remedies
Data ownership and exit   data is yours; returned in a standard format; assistance defined
Pricing                   fixed price for the scope; capped renewal increases
Payment schedule          tied to milestones; final amount held until acceptance
Change terms              how scope changes are priced
\`\`\`

## The exam angle
The scoring matrix works only if the weights are set before the vendors are scored. Never let a verbal promise replace a contract clause.`,

u8l1: `## A scope change request and a risk register
A section chief asks to add a second hanging protocol layout, with a different set of priors, to the PACS upgrade. The project manager does not say yes or no on the spot. This is the form that follows.

\`\`\`
Scope change request
Requested by        Section chief, musculoskeletal
Change              Add two hanging protocol layouts for knee MRI
Effort estimate     40 hours of analyst time
Schedule effect     Pushes configuration complete by one week
Cost effect         Within contingency
Risk                Low; same tools as the existing layouts
Decision            Approved by sponsor; plan updated; team informed
\`\`\`

The estimate is made first, the decision follows from the numbers, and the plan changes only after approval. If the sponsor declined, the request would go on a list for a later phase. Both are good outcomes; the bad outcome is an unrecorded yes.

## Quantifying a risk
Score likelihood and impact on a scale of 1 to 3 (low, medium, high), multiply, and rank.

\`\`\`
Risk                                  Likelihood  Impact  Score  Strategy
Vendor delivers storage 4 weeks late  2           3       6      reduce: order early, confirm weekly
Key interface analyst resigns         1           3       3      reduce: cross-train a second person
Network outage window is canceled     2           2       4      accept; reschedule on the plan
Regulation changes retention rule     1           2       2      accept; monitor
\`\`\`

## Four responses to a risk
- **Reduce** the likelihood or the impact.
- **Transfer** it, for example with contract terms that make the vendor pay for delays.
- **Avoid** it by changing the plan so the risk does not apply.
- **Accept** it, knowingly, perhaps with a reserve of time or money.

## Internal versus external
The analyst resigning is internal: it comes from within the project's own resources. The vendor delay and the network window are external: they depend on others. You can control internal risks more directly. For external risks you reduce the exposure by writing dates into contracts, asking for early warnings, and keeping a plan B.

## Dependencies
\`\`\`
Task                          Cannot start until
Load migrated studies         storage is installed and tested
Switch modalities             interfaces verified in test
Train users                   test system is stable
Go-live                       acceptance tests passed
\`\`\`
A risk that affects a task at the front of a chain affects everything behind it, so risks to the critical path deserve the most attention.

## The exam angle
Scope change goes through control and updates the plan. A risk register has likelihood, impact, owner, and mitigation. A dependency is a "cannot start until" statement.`,

u8l2: `## A work breakdown structure for a PACS upgrade
Here is a WBS for a PACS upgrade, with an example effort estimate in hours for each work package. The numbering is an outline of the WBS, and the hours are example estimates; the lowest level is small enough for one person to own.

\`\`\`
1  Project management and governance
   1.1  Charter and project plan                      40 hours
   1.2  Status reporting and change control           80 hours
2  Infrastructure
   2.1  Install storage and servers                  120 hours
   2.2  Network and firewall changes                  40 hours
3  Software
   3.1  Build the test system                         60 hours
   3.2  Configure hanging protocols and routing       80 hours
4  Interfaces and modalities
   4.1  Rebuild the HL7 interfaces                    70 hours
   4.2  Retarget modalities and verify                50 hours
5  Data migration
   5.1  Migrate prior studies                        100 hours
   5.2  Verify counts and spot-check images           40 hours
6  Training and go-live
   6.1  Train users and super-users                   90 hours
   6.2  Cutover and early support                    110 hours
Total effort                                         880 hours
\`\`\`

The sum is 40 + 80 + 120 + 40 + 60 + 80 + 70 + 50 + 100 + 40 + 90 + 110 = 880 hours. The WBS is about deliverables; it has no dates. A common mistake is to list actions in order, which is a schedule, not a structure.

## From effort to duration
880 hours is not 880 hours of calendar time. If three people each give about 20 productive hours a week to the project, the team supplies 60 hours a week, and 880 divided by 60 is about 14.7 weeks, which you round up and then check against the dependencies. Duration depends on how many people work in parallel, and on the tasks that must wait.

## Resources
For each package, name the role: analyst, network engineer, technologist, vendor engineer. A resource that appears in many tasks at the same time is a bottleneck. Spreading the work, or moving a task, protects the dates.

## Milestones for this project
- Contract signed.
- Test system ready.
- Interfaces verified.
- Migration complete.
- Training complete.
- Go-live.
- Project closed.

## The critical path at recognition level
Draw each package with its dependency. If the storage install (2.1) must finish before the migration (5.1) and the migration before the cutover (6.2), those three form a chain. If the chain is the longest from start to finish, it is the critical path, and a delay in any of them delays go-live. The training can move a little without changing the end date if it has slack.

## The exam angle
WBS is deliverables, effort is hours, duration is time, a milestone has no length, and the critical path is the longest dependent chain.`,

u8l3: `## What a status report holds
Every report goes out on a fixed schedule, so the sponsor does not have to ask. Here is the same project in two weeks of a report, with example figures.

\`\`\`
Area        Week 6                          Week 8                          Direction
Schedule    on track, test system ready     at risk, interfaces 5 days late worse
Budget      spent 210,000 of 600,000        spent 290,000 of 600,000        as planned
Cost        forecast at completion 590,000  forecast at completion 625,000   worse
Resources   all roles filled                network engineer out 2 weeks    worse
Quality     9 open defects, none critical   14 open defects, 1 critical     worse
\`\`\`

The report also states the top risks, the decisions needed, and what happens next. In week 8 the useful content is not the numbers alone but the action: the critical defect has an owner and a fix date, a second engineer is borrowed, and the sponsor is asked to approve 25,000 from contingency, the amount by which the forecast of 625,000 exceeds the 600,000 budget, or to move the date. Reporting the problem early gives the sponsor time to help.

## Earned effort versus spent effort
Time-and-task tracking compares real hours with the estimate for each task.

\`\`\`
Task                         Estimate   Actual so far   Percent done   Reading
Rebuild HL7 interfaces       70 hours   65 hours        60 percent     over: finish needs about 108 hours
Install storage              120 hours  100 hours       90 percent     on track
\`\`\`

For the first task, 65 hours for 60 percent complete projects a total of 65 divided by 0.6, about 108 hours, 38 more than the estimate. That is a warning you can act on in week 8, instead of discovering in week 12.

## The Gantt chart in use
Look at the chart each week for three things: the tasks that should have started and have not, the tasks that are behind the bars, and the effect on the milestones. Mark the critical path in a different color. When a task on it slips, the end date moves unless you add resources or shorten something behind it.

## Process groups and their documents
\`\`\`
Group                      Typical document
Initiating                 project charter, sponsor and manager named
Planning                   WBS, schedule, budget, risk register, communication plan
Executing                  work done, vendor deliverables, test results
Monitoring and controlling status reports, change log, risk register updates
Closing                    acceptance sign-off, lessons learned
\`\`\`

## The exam angle
A Gantt chart is the schedule picture; status reports cover schedule, budget, cost, resources, and quality; time-and-task tracking is how you see an estimate fail early.`,

u8l4: `## A go/no-go meeting
At the meeting, the project manager shows the checklist and the group decides. A good record has the criteria, the status, the owner of each open item, and the decision with its reasons.

\`\`\`
Criterion                       Status     Owner         Decision effect
Acceptance tests passed         met        project mgr   none
Modalities connected            3 failing  analyst       blocks go-live for those 3
Users trained                   met        trainer       none
Support staffing for week 1     met        PACS manager  none
Back-out plan tested            met        analyst       none
Downtime procedures out         met        PACS manager  none
\`\`\`

Open critical items need either a fix before the date or a documented exception. Going live with three modalities that cannot send is a patient-care risk. Options: delay everything, go live with the 12 working modalities while the 3 stay on the old system with a documented plan, or fix them by a set hour. Whichever the group picks, it records the choice and the reason. A no-go is not a failure; it is the check working.

## The first days
\`\`\`
Day            Support level
Day 1          vendor and analysts in the reading rooms; hourly check-ins
Days 2 to 5    floor walkers on every shift; twice-daily review of issues
Week 2         daily review; super-users handle most questions
Week 4         back-out plan retired by named decision; return to normal support
\`\`\`
These are example intervals. The key points are that more help comes first, the back-out plan stays alive until a named decision retires it, and every issue is logged, classified, and escalated.

## The project assessment
Compare the delivered system with the goals, scope, and budget, and with the benefits claimed in the justification. If the justification said the system would cut repeat exams, measure repeat exams after go-live and report whether they fell. This is also where you obtain formal acceptance and close the contract.

## The retrospective and lessons learned
\`\`\`
What went well              What did not                 Action                         Owner
Test system caught 3 bugs   Interface testing started    Start interface testing        Analyst
                            late                         at 25 percent of schedule
Super-users answered most   Night shift had no           Name a night super-user        Trainer
questions                   super-user                   for every project
\`\`\`

Hold the retrospective soon after go-live while memories are fresh, and again after a few months when long-term issues show up. Keep lessons in one shared place, give each action an owner, and open the file when planning the next project.

## The exam angle
Go/no-go uses criteria set earlier. Support is heaviest at the start. A lesson that is not written down and read again was not learned.`,

u9l1: `## Who owns which decision
Informatics projects fail when the right person is not in the room. This table maps common decisions to the role that usually owns them.

\`\`\`
Decision                                          Usually owned by
Which clinical workflow the department wants      department chair or section chief
How a clinical system supports patient care       CMIO
Technology standards and enterprise budget        CIO
Whether the images are technically acceptable     technologist
What the images mean and what the report says     attending radiologist
Daily operation of the imaging systems            PACS administrator
Staffing and the operating budget                 administrator or department manager
\`\`\`

## A study through the roles
A technologist performs the exam and checks the image quality. The study reaches the worklist, a resident drafts a report, the attending reviews and finalizes it, and the referring clinician reads it. The nurse prepares the patient and tells the technologist about allergies or limits. The PACS administrator keeps the systems working, and the informaticist designs the workflow so each handoff is smooth. When something breaks, you need to know whom to tell.

## Training level
A resident is a doctor who has finished medical school and is in a training program. A fellow has finished residency and is training further in a subspecialty. An attending has completed training and is responsible for the patient and the report. The rules for who may finalize a report, and what is routed to whom, follow these levels, so workflow rules and permissions are tied to them.

## Settings change the work
\`\`\`
Setting             What is different for informatics
Ambulatory clinic   few staff on site, remote support, link to the main archive
Academic center     teaching files, research, residents, many custom workflows
Private practice    cost control, reading for several sites, referring-physician access
Pediatrics          size-based protocols, dose sensitivity, child-friendly workflows
Research            de-identification, review board approval, trial naming rules
\`\`\`

## Specialties and their imaging needs
Orthopedics needs comparisons and measurements on bones and joints. Neurology needs MRI and CT of the brain and spine, often with special sequences. Oncology needs prior comparisons and measurements over time. Cardiology needs moving images and measurements, which are often stored in a separate system. Pediatrics needs correct size and dose information. Learn what each group does with an image before you design its workflow.

## The exam angle
Match a role to its decision. When a question puts a CMIO beside a CIO, the CMIO is the physician leader for clinical use and the CIO is the technology leader.`,

u9l2: `## Reading a study header as a technologist would
Terminology matters because it becomes data. Here is a small part of what a study carries, written in plain words, with the check an informatics professional should make.

\`\`\`
Header field          Value               Check
Body Part Examined    knee                matches the order and the protocol
Laterality            left                matches the order; the most serious error if wrong
Patient Position      feet first, supine  fits the exam; affects image orientation
View Position         lateral             used by the hanging protocol
Modality              MR                  routes the study to the right worklist
\`\`\`

Mislabeled laterality can send a clinician to the wrong side of the body, so many sites check it at three points: the order, the technologist's entry, and the final report. If an exception queue shows laterality mismatches, they are a safety issue, not a clerical one.

## Planes and what they look like
\`\`\`
Plane      Cuts the body into          A typical image
Axial      upper and lower parts       a cross-section like a slice of bread
Coronal    front and back parts        a view as if you faced the patient
Sagittal   left and right parts        a view from the side, the nose on one edge
\`\`\`
A CT is acquired as axial slices and can be reformatted into coronal and sagittal views. A viewer lists them as series or reformats; knowing the words lets you read a protocol.

## Positions and projections in one table
\`\`\`
Term           Meaning
AP             beam goes front to back
PA             beam goes back to front
Lateral        beam goes through from side to side
Oblique        beam at an angle between
Supine         lying on the back
Prone          lying on the stomach
Decubitus      lying on a side, often with a horizontal beam
Upright        standing or sitting
\`\`\`

## Words that change meaning with the modality
- **Series**: in CT and MRI, one acquisition or reconstruction.
- **View**: in mammography, a named projection such as the standard craniocaudal and side views.
- **Sequence**: in MRI, a pulse and timing pattern that gives a certain image contrast.
- **Phase**: in CT, the time after contrast injection, which labels a series.
When a hanging protocol fails to place a series, a mismatch between the protocol's word and the header's word is a likely cause.

## Anatomy at the right depth
You need to know that a chest exam covers the chest, that an extremity exam means an arm or a leg, and that a brain study is a head study, so routing and protocol rules are written correctly. You do not interpret the findings.

## The exam angle
Know the three planes, the direction terms, and which fields carry laterality and body part. A mismatch in these fields causes a routing or display error and may cause harm.`,

u9l3: `## One downtime, three notices
The change: a PACS upgrade, Saturday from 10 at night until 2 in the morning, four hours. The same facts, three different notices. Notice what changes and what stays the same.

**For the radiologists (email and reading room banner)**
\`\`\`
Subject: PACS upgrade Saturday 10 PM to Sunday 2 AM. Plan for read-only access
Who: All radiologists, including remote readers.
What: The PACS will be unavailable for new studies. Use the backup viewer at
      the link below to read studies already received. New studies will queue.
When: Saturday 10 PM until about 2 AM Sunday. We will email when it ends.
Why: The upgrade fixes the slow loading of priors that many of you reported.
How: Dictation continues as normal. For urgent reads call the on-call analyst.
\`\`\`

**For the technologists (huddle, a card at each console)**
\`\`\`
Saturday 10 PM to 2 AM: Keep scanning. Images will queue on the modalities.
Do NOT delete or resend anything from the console. Write patient name, MRN, and
exam on the paper log. If a console reports an error, call the on-call analyst.
When the all-clear arrives we will confirm every exam on your log arrived.
\`\`\`

**For the IT staff (ticket and email)**
\`\`\`
Start 10:00 PM: stop interface services, back up the database, run the upgrade.
Checks at 1:00 AM: interfaces up, 5 test studies received, viewer launch works.
Back-out decision: 1:30 AM if checks fail. Restore time about 45 minutes.
Contacts: on-call analyst, vendor support line, network on-call.
\`\`\`

## What stayed the same
Every notice has the dates and times, the effect on the user's task, and the person to call. What differs is the first line: radiologists care about reading, technologists about scanning, and IT about the sequence and the checks.

## Timing and channels
\`\`\`
When              Message                       Channel
Two weeks before  first notice                  email, intranet, department meeting
Three days before reminder with the backup plan email, huddle, login banner
Day of            final reminder                banner, huddle
At the start      downtime has begun            banner, page to key staff
When it ends      all-clear and what to report  email, banner
\`\`\`
These intervals are examples, and your policy sets the real ones.

## Unplanned downtime
Send a short first message at once: what is down, what to use, who is working on it, and when the next update will be sent. A fixed update time reduces the flood of calls to the help desk.

## The exam angle
A good notice answers who, what, when, why, and how, and it is shaped by role. Forgetting the all-clear message is a common gap.`,

u9l4: `## Aligning a plan to the organization
Leaders fund what ties to their strategy. This table shows how to turn an organizational goal into an imaging informatics goal and a measure.

\`\`\`
Organization goal               Department goal                         Measure                    Source
Faster stroke treatment         head CT read within the target time     minutes scan to report     RIS and PACS timestamps
Lower cost per exam             fewer repeat exams from missing priors  repeat exam count          modality logs
Better patient experience       shorter wait for results                days to result letter      reporting tool
Safer data                      yearly access review                    accounts removed on time   access review records
\`\`\`

A goal with a measure and a source can be reported. A goal without one will be argued about.

## A short survey that works
\`\`\`
Question                                          Scale
The viewer loads studies quickly enough           1 (disagree) to 5 (agree)
I can find prior studies when I need them         1 to 5
The training prepared me for my daily tasks       1 to 5
What is the one thing we should fix first?        open comment
\`\`\`
Four questions take two minutes. Send it at the same time each year or after a major change, and report the number of responses with the results, since a score from 6 people means little. Ask the same questions each time so the trend is meaningful.

## Combining numbers and opinion
If the dashboard says turnaround is within target but the survey says the radiologists find the system slow, one of them is measuring the wrong thing, or the slow part is a step the dashboard does not capture, such as launching the viewer. Investigate both and do not assume the numbers win.

## A one-page leadership update
\`\`\`
Goal             Reduce time from scan to report for head CT
Result           median 41 minutes, down from 58 (example values)
Cost             no new spending; one rule change
Risk             the on-call roster has one gap on Sundays
Request          approve a second Sunday reader or a teleradiology contract
\`\`\`
The first line is the goal, the second is the result, and the last is the one decision you need. Leaders will read it, and the details can follow if they ask.

## Close the loop
Tell users what you changed because of their comments. People who see results answer the next survey; people who do not stop answering.

## The exam angle
Alignment means connecting to the organizational strategic plan. Reporting tools give objective measures and surveys give user opinion.`,

u10l1: `## Building a training needs plan
Take a new reading workstation software release. The trigger is a system upgrade, but the audience is mixed, and each role needs different content. A needs table makes that visible.

\`\`\`
Role            Tasks that change                       Size   Location       Best method
Radiologist     new hanging protocols, toolbar          45     3 sites        short virtual session plus quick reference card
Technologist    new study list, correcting names        30     main site      hands-on in the test system
Clerk           new scheduling screen                   12     main site      hands-on, 30 minutes
Help desk       new error messages, escalation          8      main site      classroom plus a troubleshooting guide
\`\`\`

The method follows the audience and the task. A short list of tasks for many dispersed radiologists is a good fit for a virtual session with a card; a task with many clicks, done by technologists, needs hands-on practice.

## Writing objectives
\`\`\`
Vague                                 Checkable
Understand the new study list         Filter the study list by status and open the oldest unread study
Know the downtime plan                State the first three downtime steps and where the backup viewer is
Be aware of the privacy policy        Describe what to do on seeing a record you should not access
\`\`\`
A checkable objective names an observable action and a condition. You can design the practice and the test directly from it.

## Choosing a measure in advance
For the technologists, the measure might be a task analysis: watch ten technologists correct a mismatched name and count the steps where they stop or ask for help. If most stop at the same step, the training or the screen needs work. A survey after the session asks about confidence and clarity of materials. The two together tell you whether people can do the task and whether they believe they can.

## What triggers training
- **New system.** The most training: everyone, every role.
- **Workflow change.** A narrow group, but the change is easy to forget, so use cards and reminders.
- **Upgrade.** A lighter touch for changes in screens or behavior, with release notes by role.

## Timing
Plan the content early, train close to the go-live date, and keep the test system available afterward. People learn the tasks they perform, so training for a rare task needs a quick reference nearby.

## The exam angle
Training starts from a trigger and an audience. Audience size, location, and role choose the delivery method, and objectives must be written so they can be checked.`,

u10l2: `## A training program for a new workstation release
Here is a program built for the table in the previous lesson, with example numbers and the reasons behind each choice.

\`\`\`
Piece                       Format                      Length      Who delivers
Overview for radiologists   virtual, recorded           30 minutes  CMIO and PACS administrator
Task practice               in person, test system      45 minutes  super-users
Technologist training       in person, test system      60 minutes  super-users
Reference card              one page at each console    n/a         project team
Short task videos           e-learning on the intranet  2 to 4 min  project team
Help desk briefing          classroom                   60 minutes  analyst
\`\`\`

## Why super-users
The project team of three cannot be in every room on every shift. Super-users multiply the team. Choose one on each shift and in each modality area, ideally a respected person and not just the most junior. Train them first and a little deeper, give them release time for it, and give them a direct channel to the analysts. They answer questions in the moment, spot patterns of confusion, and tell the project team early. In a train-the-trainer program, they also deliver the sessions to their peers.

## Matching the format to the job
\`\`\`
If the learner needs to...                      Use
follow ten steps in order                       written guide or reference card
see where a control is on screen                graphic with labels
watch a task done once                          short video
learn at their own time and pace                e-learning module
practice a skill safely                         in-person session in the test system
\`\`\`

## Scheduling around the clinical day
Radiologists read on a worklist and a block of 2 hours is rarely possible. Offer 15 to 30 minute sessions at several times, a recorded version, and a quiet room near the reading room. Technologists work shifts, so schedule on each shift, including nights and weekends. Avoid peak scanner hours. Reserve a few extra slots for those who miss a session, and keep the test system open for practice after training.

## Common failures
- Training too early, so people forget before go-live.
- One session for all roles.
- No practice environment.
- Night shift left out.
- Super-users with no time to help.

## The exam angle
Pick the setting and format that fit the audience and the task; use super-users to bring help to every shift and area; schedule around the clinical day, not the training room.`,

u10l3: `## Assessment tools and what they can and cannot show
No single tool answers every question. Combine them.

\`\`\`
Tool                   Shows                             Does not show
Attendance sheet       who came                          whether they learned
Quiz                   recall of facts and rules         whether they can do the task
Observation            real performance, with errors     what they think and feel
Authentic assessment   ability to complete a real task   long-term retention
Survey                 confidence, clarity, opinions     actual ability
Help-desk call trends  where real users struggle         why they struggle
\`\`\`

## An authentic assessment
For a technologist, the task: "A study arrives with a patient name that does not match the order. Correct it in the test system and show the audit entry." The assessor has a checklist.

\`\`\`
Step                                         Done correctly
Opens the study from the exception list      yes
Compares the order and the study             yes
Selects the correct patient record           no, picked the wrong MRN first
Applies the correction                       yes
Finds the audit entry                        no, did not know where
\`\`\`
Two misses show what to fix: a card step on verifying the MRN and a quick reference for the audit log. The result is specific enough to act on.

## Reading help-desk trends
\`\`\`
Topic                         Calls week 1   Calls week 2   Calls week 3
Cannot find the study list    4              3              1
Correcting patient names      22             25             24
Printing to the film printer  3              2              1
\`\`\`
The first and third topics fall as people learn. The second does not, so the training missed it, or the screen is confusing. A short video or a change to the screen is the response. Since the exam may ask what the evidence is, remember: a call volume that does not fall for one task is a sign of a training gap on that task.

## Acting on results
- A weak quiz result: rewrite or repeat that lesson.
- Observed errors: add or fix steps on the card.
- A call spike: a refresher, a huddle, or a video.
- A low survey rating on clarity: fix the materials.
Retrain the people and topics that need it, not everyone, and measure again.

## The training record
Keep name, role, completed modules, date, and assessment result. If an auditor, accreditor, or manager asks who was trained before using the system, the record answers. It also shows who still needs training, such as a new hire or a person on leave during the sessions.

## The exam angle
Pick the assessment tool that matches the objective: quizzes for knowledge, observation and authentic tasks for performance, surveys for opinion, and call trends for field evidence.`
});
