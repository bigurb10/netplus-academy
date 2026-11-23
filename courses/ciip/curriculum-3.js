// CIIP Academy curriculum, units 6 to 10. Original teaching content for the ABII CIIP exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u6", n: 6, title: "Operations", domain: 3,
  blurb: "Running an imaging informatics operation day to day: quality, policy, compliance, budget, change, metrics, and vendors.",
  assumes: "Units 4 and 5.",
  lessons: [
    {
      id: "u6l1", title: "Quality Improvement: Its Philosophy, Six Sigma, Lean", domain: 3, obj: "C1", minutes: 10,
      body: `Radiologists complain that reports take too long, and the chair asks you to fix it. The worst answer is a guess followed by a new rule. Quality improvement gives you a way to find the real cause and prove that your change worked.

## The philosophy
- **Think in systems.** A slow report comes from a chain of steps, handoffs, and tools, not from one careless person. Improve the process, not blame the person.
- **Measure first.** Without a baseline you cannot say whether anything got better.
- **Improve continuously.** One change is never the end; you measure, change, and measure again.

## PDSA, the small test
**PDSA** is plan, do, study, act. Plan a small change and predict the result, try it on one reading room for two weeks, study the numbers against the prediction, then act: adopt it, adjust it, or drop it. Small cycles are cheap and safe, which is why they suit clinical areas.

## Six Sigma and DMAIC
Six Sigma cuts defects and variation with data. Its method is **DMAIC**.
\`\`\`
Define    the problem and the goal         reports finalized too slowly
Measure   the current performance          median hours from exam to final report
Analyze   find the root causes             where the time is really lost
Improve   test and apply the fix           change the worklist routing
Control   keep the gain                    monitor the measure every month
\`\`\`

## Lean and the wastes
Lean removes waste, meaning any step the patient or the radiologist would not pay for. The common wastes are waiting, extra steps, rework, moving things around, defects, too much work in progress, and unused talent. A **value stream map** draws every step from order to final report with the time each one takes and the time work sits idle between steps. The long idle bars show where to look.

## Two imaging examples
- Report turnaround: DMAIC measures the hours from exam complete to final report, finds that studies wait for a technologist to release them, and the control step tracks the median monthly.
- Exception queue backlog: Lean shows studies waiting for someone to fix a mismatched order, and the fix is a rule that routes them to one named owner each morning.

> Exam tip: PDSA is the small repeated test, DMAIC is the data-driven Six Sigma method, and Lean hunts waste with a value stream map. Always measure before you change.`,
      hook: "Measure first, find the root cause, change one thing, and measure again; PDSA, DMAIC, and Lean are three ways to do that."
    },
    {
      id: "u6l2", title: "Problem Identification Tools: SBAR, Fishbone Charts, and Their Companions", domain: 3, obj: "C1", minutes: 9,
      body: `Monday morning, three problems arrive together: a modality worklist that is empty, studies waiting in an exception queue, and a radiologist who says the viewer is slow. Before you fix anything you need to describe each problem clearly to the right person, find its causes, and decide which matters most. Different tools do each job.

## SBAR: tell someone about a problem
**SBAR** keeps a message short and complete.
\`\`\`
Situation       what is wrong right now
Background      what the person needs to know about the system
Assessment      what you think the cause is
Recommendation  what you want them to do, and by when
\`\`\`
An example: "The CT worklist has been empty since 7:10 (situation). The interface was upgraded last night and the broker is the only change (background). I think the order messages are queued behind a bad one (assessment). Please restart the interface now, or approve a manual worklist entry for the next hour (recommendation)."

## Finding causes
- **Fishbone chart** (also called a cause-and-effect diagram) puts the problem at the head and groups possible causes on the bones. Common categories are people, process, equipment, software, environment, and measurement. It is for brainstorming with a team, so you do not stop at the first idea.
- **Five whys** asks why again and again until you reach a cause you can fix. The viewer is slow because the cache is cold, because the prefetch rule did not run, because the schedule feed changed, and so on.

## Ranking and watching
- **Pareto chart** ranks causes by size. A few causes make most of the problem, so fix the biggest bar first.
- **Run chart** plots a measure over time. A **control chart** adds limits so you can tell normal variation from a real change.

## Choosing a tool
\`\`\`
You need to                              Use
Report a problem to a person             SBAR
Brainstorm possible causes               fishbone chart
Drill to one fixable cause               five whys
Decide where to start                    Pareto chart
See whether a change worked              run chart or control chart
\`\`\`

> Exam tip: SBAR is for communicating, the fishbone is for listing causes, the Pareto chart is for choosing, and the run chart is for checking the result.`,
      hook: "SBAR tells, the fishbone lists causes, five whys drills down, the Pareto chart chooses, and the run chart confirms."
    },
    {
      id: "u6l3", title: "Policies and Procedures: Downtime, Incidents, Backup and Recovery, Privacy and Security, User Access and Roles", domain: 3, obj: "C2", minutes: 10,
      body: `A power failure takes down the PACS at 2 in the morning, and the night technologist asks what to do. If the answer lives only in the head of the administrator who is asleep, you have a missing policy. Policies and procedures put decisions in writing before the crisis.

## Policy versus procedure
A **policy** states the rule and who is accountable: all imaging systems have a downtime plan. A **procedure** lists the steps a person follows: the numbered steps to switch the modalities to the backup server. A procedure that staff will actually follow is short, uses their words, is stored where they work, and is tested in a drill.

## The system management policies
- **Downtime policy**: who declares downtime, what staff use meanwhile (a local workstation, paper requisitions, a backup viewer), how studies are entered afterward, and how the end is announced.
- **Incident management policy**: how a problem is reported, who triages it, severity levels with target response times, escalation, and a written review afterward.
- **Backup and recovery policy**: what is backed up, how often, where copies are kept, how long, and how often a restore is tested. The recovery goals (RPO and RTO) come from the business, and the policy states them.
- **Privacy and security policy**: who may see which patient data, how data is protected in storage and transit, and how access is logged and audited.

## User management
Access follows a lifecycle.
\`\`\`
Request      the manager asks for an account and a role
Approve      the owner of the data approves the role
Provision    the administrator creates the account with the role
Review       periodic review: does everyone still need this access
Terminate    remove access the day the person leaves or changes jobs
\`\`\`
Roles keep this manageable: assign a person to a role, not a custom set of rights. The most common finding in an audit is an account that nobody removed after the person left.

## Writing, approving, and reviewing
A policy has an owner, an approving body, an effective date, and a review date, often once a year. Draft with the people who will follow it, approve it through the governance committee, publish it, train on it, and review it on schedule or after any incident that exposed a gap.

> Exam tip: a policy states the rule, a procedure gives the steps, and both need an owner and a review date. Missing or stale accounts point to a gap in the user management review.`,
      hook: "Write the rule, write the steps, name an owner, and review both on a schedule; add and remove access through a request and a periodic review."
    },
    {
      id: "u6l4", title: "Compliance: HIPAA, HITECH, MQSA, Radiation Dose Tracking", domain: 3, obj: "C2", minutes: 10,
      body: `A privacy officer calls: a radiologist saw the images of a neighbor who is not her patient. At the same time the mammography site is due for its yearly inspection. Compliance is the set of laws you must prove you follow, and the proof is documents and logs that you keep.

## HIPAA
HIPAA protects protected health information, meaning anything that identifies a patient and relates to care or payment. Three parts matter to imaging.
- The **Privacy Rule** limits who may use and disclose the data and says to use the minimum necessary for the task.
- The **Security Rule** requires safeguards for electronic data: administrative (risk analysis, policies, training), physical (locked rooms, workstation placement), and technical (unique user IDs, access control, audit logs, encryption, integrity checks).
- The **Breach Notification Rule** requires notifying affected individuals without unreasonable delay and no later than 60 days after discovery of a breach; large breaches also go to the government and the media.
Vendors who handle patient data are business associates and sign an agreement that binds them to the same protections.

## HITECH
The HITECH Act of 2009 pushed adoption of electronic health records (the meaningful use program), extended HIPAA directly to business associates, strengthened enforcement with higher penalties, and made breach notification law.

## MQSA
The Mammography Quality Standards Act is the federal law for mammography. A facility must be accredited and certified, have qualified interpreting physicians, and perform quality control. For informatics the key duties are records and reporting.
- Keep the mammograms and reports for the required period. The federal minimum is 5 years, or 10 years if the patient has no later exam at the facility, and longer where state law says so.
- Send the patient a written summary of the result in plain language, and track outcomes for the facility's audit.
- Show the inspector the display quality control records for the mammography workstations.

## Radiation dose tracking
Many states, accreditation programs, and hospital policies require recording the dose of each exam. The informatics job is to collect it automatically from the DICOM radiation dose structured report, store it per exam, compare it to reference levels, and flag outliers for physicist review.

## Documenting compliance
A control you cannot prove does not count. Keep policies, access reviews, audit log samples, risk analyses, training rosters, QC records, and incident reports where an auditor can find them.

> Exam tip: HIPAA protects the data, HITECH adds breach notification and enforcement, MQSA governs mammography records, and dose tracking compares each exam to reference levels. If you cannot show a record, the auditor assumes it was not done.`,
      hook: "HIPAA protects patient data, HITECH adds breach notification and enforcement, MQSA governs mammography, and dose tracking needs automatic records; compliance is what you can prove."
    },
    {
      id: "u6l5", title: "Operational Budgeting and Systems Change Control", domain: 3, obj: "C3", minutes: 9,
      body: `The finance office wants next year's imaging informatics budget by Friday, and the PACS vendor has just told you the storage must double. At the same time a radiologist asks for a viewer setting changed on all workstations tomorrow. You own two disciplines here: the money to run the systems, and the discipline that keeps changes from breaking them.

## The operational budget
The operating budget covers the recurring cost to keep systems running.
\`\`\`
Line                 Example
Support contracts    annual vendor support and maintenance
Licenses             per-seat, per-modality, and per-server renewals
Storage growth       new capacity as studies accumulate
Staff                administrators, analysts, on-call time
Training             new-hire and upgrade training
Hardware refresh     replacements planned for aging servers and displays
\`\`\`
Build it from last year's actuals, add known growth (the storage lesson's months remaining), and add contract price increases. **Capital** spending buys assets that last years, such as a new server or archive; **operating** spending is the yearly cost to run what you already own. Organizations treat them differently, and your finance team decides how each purchase is classified.

## Change control
A change is any alteration to a production system: a patch, a new interface, a setting, a hardware swap. Change control prevents surprise outages.
1. **Request**: who wants what, and why.
2. **Impact assessment**: which systems, interfaces, and users are affected, and what could go wrong.
3. **Approval** by a change board that includes clinical and technical voices.
4. **Scheduling** in an agreed window that avoids busy clinical hours.
5. **Back-out plan** written before the change, with the point at which you will use it.
6. **Communication** to everyone affected.
7. **Test and implement**, following the plan.
8. **Post-change review**: did it work, and what did we learn.

An **emergency change** to stop an outage can be approved fast by a named person, but it is still documented and reviewed afterward.

> Exam tip: the back-out plan is written before the change, not during it. Operating budgets pay for support, licenses, storage growth, and staff; capital buys long-lived assets.`,
      hook: "Budget the recurring costs from actuals plus known growth, and never change a production system without an impact review, approval, and a back-out plan."
    },
    {
      id: "u6l6", title: "KPIs and Operational Reporting: Uptime, Capacity, Exceptions, Unread Exams, Lost Studies", domain: 3, obj: "C5", minutes: 10,
      body: `The department chair asks, "Is the PACS healthy?" You can answer with a feeling or with seven numbers. A **key performance indicator**, or KPI, is a measure that tells you how an operation is doing against a target. Choose a few and report them the same way every month.

## The imaging KPIs
\`\`\`
KPI                     What it tells you                    Typical target type
Uptime                  percent of time available            a floor, such as an agreed percent
Capacity                space used, free, and growth         months remaining above a threshold
Exceptions              studies stuck or unmatched           a ceiling, cleared daily
Unread exams            exams waiting past the target time   a ceiling by priority
Lost studies            studies sent but not found           zero
Report turnaround       exam complete to final report        median and a long-tail value
Interface queue depth   messages waiting for delivery        a ceiling; growth means a stall
\`\`\`
Report the median and a high percentile, such as the slowest tenth, not only the average, because an average hides the long waits that annoy people most.

## Finding the data
Most KPIs come from logs and tables you already have: the PACS database, the interface engine's message counts, monitoring tools, and RIS timestamps. **Data mining** means searching large sets of records for patterns, for example which modality produces the most exceptions. **Statistical analysis** at this level means averages, medians, percentiles, trends, and limits: is this month's number a real change, or normal variation.

## Building the operational report
1. Pick the question the reader has.
2. Pick the few KPIs that answer it, each with its target.
3. Show the trend, not just this month.
4. Add one line explaining each number outside its target and the action planned.
5. Deliver it on a fixed schedule.

Match the audience. Executives want uptime, risk, and cost on one page. The department wants turnaround and unread exams. The IT team wants queue depth and capacity.

> Exam tip: a KPI has a definition, a target, and an owner. A growing interface queue means a stalled interface, and an average can hide a long tail that a percentile reveals.`,
      hook: "Pick a few KPIs, define each with a target, show the trend, explain the exceptions, and fit the report to its audience."
    },
    {
      id: "u6l7", title: "Data Analytics and Visualization: Pivot Tables, Bar Charts, Scatter Plots, Dashboards", domain: 3, obj: "C5", minutes: 9,
      body: `You export 200,000 exam records to a spreadsheet and the manager asks which modality is growing fastest. A list that long answers nothing until you summarize it and draw it. The skill here is choosing the summary and the picture that fit the question.

## Summarize first: the pivot table
A **pivot table** groups a long list by categories and totals a value. Drag modality to the rows, month to the columns, and count of exams to the values, and the list becomes a small table. Change the grouping to study a different question without redoing the work.

## Pick the chart for the question
\`\`\`
Question                                  Chart
Which category is biggest?                bar chart
How did it change over time?              line chart
Are two measures related?                 scatter plot
What is happening right now?              dashboard
Which causes matter most?                 Pareto chart
\`\`\`
- A **bar chart** compares amounts across categories, such as exams per modality.
- A **line chart** shows a trend over time, such as monthly volume.
- A **scatter plot** places each item by two measures. Each point is one exam: x is the number of images, y is the transfer time. A cloud sloping upward shows that the two move together.
- A **dashboard** puts many live measures on one screen for monitoring, for example uptime, queue depth, and unread exams. Keep it to what someone must act on.

## Misleading charts
- A vertical axis that does not start at zero makes small differences look huge.
- A line joining categories that have no order suggests a trend that is not there.
- Too many colors or series hides the point.
- Averages with no sample size mislead: 3 studies are not a trend.
- Showing correlation as cause: two measures rising together do not prove one drives the other.

State the question in the title, label the axes with units, and give the period.

> Exam tip: pivot to summarize, bar to compare, line for time, scatter for relationships, dashboard for live monitoring. A truncated axis is the classic misleading chart.`,
      hook: "Summarize with a pivot table, then match the chart to the question: bars compare, lines show time, scatter plots show relationships, dashboards monitor."
    },
    {
      id: "u6l8", title: "Vendor Management: SOW, Support and Maintenance Agreements, SLAs, Renewal, End of Service Life", domain: 3, obj: "C6", minutes: 10,
      body: `Your PACS vendor sends a renewal quote with a 9 percent increase, and a radiologist asks why the last outage took six hours to fix. Both questions are answered by the contract, if you read it and kept the numbers. Managing a vendor means knowing what the paper says and holding them to it.

## The documents
- **SOW**, statement of work: exactly what the vendor will deliver, by when, who does what, and how completion is accepted. It belongs to the project.
- **SMA**, support and maintenance agreement: what is covered after go-live, such as software updates, hot fixes, and support hours, and what it costs each year.
- **SLA**, service level agreement: measurable promises with remedies.

## What an SLA states
\`\`\`
Term                  Meaning
Response time         how soon the vendor starts work after you call
Resolution time       how soon it is fixed or a workaround is in place
Severity levels       what counts as critical versus minor
Uptime guarantee      the availability promised, such as 99.9 percent
Measurement           who measures, over what period, with what exclusions
Remedy                credits, penalties, or the right to leave
\`\`\`
Response is when they begin; resolution is when it is fixed. A fast response with no resolution target is not much of a promise. Exclusions, such as planned maintenance, can hide most of the downtime, so read them.

## Renewal
Start months before the date. Collect your own data: the incident log, response times, uptime measured by your own monitoring, and open requests. Use it to negotiate price, ask for missed credits, and compare the quote to what competitors offer. Auto-renewal can lock you in for another term, so note the cancellation deadline.

## End of service life
**EOSL** is the date the vendor stops supporting a product, with no patches and no fixes. A vendor gives notice of end of life ahead of time. When you receive it, ask the date, the cost of extended support, and the migration path, then plan the replacement project, with its budget, long before the date arrives.

> Exam tip: response is not resolution. Use your own performance records at renewal, and treat an end of life notice as the start of a replacement project.`,
      hook: "Read the SOW, SMA, and SLA, keep your own performance data for renewal, and plan the replacement the day an end of life notice arrives."
    }
  ]
});

FRA.units.push({
  id: "u7", n: 7, title: "Procurement", domain: 1,
  blurb: "Justifying, specifying, evaluating, and contracting for an imaging system.",
  assumes: "Unit 6.",
  lessons: [
    {
      id: "u7l1", title: "Defining the Project: Justification With TCO and ROI, Goals, Scope, Budget, Policies, Governance, the Plan", domain: 1, obj: "A1", minutes: 10,
      body: `The PACS is eight years old, support ends in two, and the hospital board asks, "Why should we spend money on this?" Before any vendor hears from you, you define the project and justify it in numbers a board understands.

## Project definition
Write down, in this order, and have the sponsors agree to it:
- **Goals**: what the organization gets, such as faster reads, a supported platform, and one archive for all sites.
- **Scope of solution**: what is included (PACS, archive, viewers, interfaces, migration) and what is not (new modalities, the EMR).
- **Preliminary budget**: a rough ceiling set before bids arrive, so you can tell a reasonable proposal from a fantasy.
- **Procurement policies**: the organization's buying rules, such as the dollar level that requires a formal bid and who may sign.
- **Evaluation and selection process**: who scores, on what criteria, and how a winner is chosen.
- **Governance**: the sponsor, the steering committee, and who has the final say.
- **The plan**: milestones and dates from the request to the contract.

## Total cost of ownership
**TCO** counts everything the system costs over its life, not just the quote: purchase, installation, licenses, hardware, storage, support, staff, training, and migration. A cheap purchase with high annual support and storage costs can lose to a pricier one.

## Return on investment and payback
\`\`\`
ROI = (gain minus cost) divided by cost, x 100 percent
Payback period = initial cost divided by annual savings
\`\`\`
Worked example. A new system costs 300,000 and saves 60,000 a year in staff time and avoided repeat exams for 6 years.
\`\`\`
Total gain    60,000 x 6 = 360,000
ROI           (360,000 minus 300,000) / 300,000 = 0.20, so 20 percent
Payback       300,000 / 60,000 = 5 years
\`\`\`
ROI shows the size of the return; payback shows how soon the money comes back. Some projects are justified without a return, such as a replacement for an unsupported system, and the case then rests on risk.

> Exam tip: define goals, scope, budget, policies, selection process, governance, and plan before asking vendors for anything. ROI is gain minus cost over cost; payback is cost over annual savings.`,
      hook: "Define goals, scope, budget, and governance first, then justify with TCO, ROI, and payback."
    },
    {
      id: "u7l2", title: "Needs Assessment, Vendor Identification, and the RFP", domain: 1, obj: "A2", minutes: 10,
      body: `A department says, "We need a new viewer." Two weeks later you learn that what they really need is faster access to prior studies from the old archive. If you buy the viewer, you buy the wrong thing. A needs assessment finds the real requirements before anyone writes a request.

## Needs assessment
Gather requirements from the people who do the work.
- **Interviews** with radiologists, technologists, clerks, and clinicians, one role at a time.
- **Observation** of the real workflow, because people forget steps they do automatically.
- **Surveys** to reach large groups cheaply.
- **Workflow analysis** to map today's steps and find delays.
Then follow four steps: **document** every requirement, **analyze** for conflicts and duplicates, **prioritize** into must-have and nice-to-have, and **validate** the final list with the users who gave it.

## Writing requirements vendors can answer
A requirement is clear when a vendor can answer it yes or no and you can test it.
\`\`\`
Weak     The system should be fast.
Strong   A 500-image CT study opens at the workstation in under 10 seconds (example target),
         measured during the scripted demonstration.
\`\`\`
Use must-have and nice-to-have labels, number each requirement, and ask the vendor to state whether it is standard, a configuration, a custom development, or not available.

## Finding vendors
Identify candidates from the market, peer sites, and industry events. Qualify them: do they have installed customers of your size and type, financial stability, and support in your region.

## RFI, RFP, and RFQ
\`\`\`
RFI   request for information     learn who is out there and what they offer
RFP   request for proposal        detailed requirements, answer and price for the whole solution
RFQ   request for quotation       a price for a clearly defined item
\`\`\`
Use an RFI when you are still learning, an RFP to select a solution, and an RFQ to price a specific item such as 20 diagnostic displays. Finalize the request with the evaluation criteria and their weights stated, set a deadline and a point of contact, and distribute the same package to every vendor at the same time.

> Exam tip: needs assessment comes before the request, and the requirements are validated with users. RFI means information, RFP means a full solution proposal, RFQ means a price for a defined item.`,
      hook: "Interview, observe, document, prioritize, and validate the needs; write requirements a vendor can answer; then choose RFI, RFP, or RFQ for the job."
    },
    {
      id: "u7l3", title: "Evaluating Solutions, Demonstrations, Reference Checks and Site Visits, Selection, and the Contract", domain: 1, obj: "A5", minutes: 10,
      body: `Three proposals sit on your desk, each longer than a novel and each claiming to meet every requirement. The decision cannot rest on which sales presentation was the smoothest. You need a method that turns claims into comparable evidence.

## Collect and analyze the information
Read the written proposals against the requirement list, mark what is standard, configured, custom, or missing, and send written questions for anything unclear. Keep every vendor on equal terms: the same questions, the same deadlines, the same information.

## Scripted demonstrations
In a **scripted demonstration** every vendor performs the same scenarios in the same order, using your sample studies and your workflow. Examples: receive a study with a mismatched patient name and correct it, hang a prior comparison, send a study to an outside site, and show an audit trail. Evaluators score each scenario as it happens, because memory fades.

## The scoring matrix
\`\`\`
Criterion             Weight   Vendor A   Vendor B   Vendor C
Clinical function     30       4          5          3
Integration           20       5          3          4
Support and SLA       15       3          4          4
Total cost (TCO)      25       3          3          5
Vendor viability      10       4          4          3
\`\`\`
Each evaluator scores each criterion from 1 to 5; the weight times the score, summed, gives the total. Weights are agreed before proposals are opened so no one can steer them toward a favorite.

## References and site visits
Call current customers of your size and type, and ask what went wrong, how the vendor handled it, how upgrades went, and whether they would buy again. A **site visit** lets your staff watch the system in daily use. Choose customers yourself, not only those the vendor offers.

## Selection and contract
Select on the scored evaluation and the references. The contract turns promises into obligations. Negotiate and write down:
- **Deliverables and acceptance criteria**: tests that must pass before the final payment.
- **Uptime and support terms**, with response and resolution times and remedies.
- **Data ownership and exit**: the data stays yours, and the vendor must return it in a standard format at no unreasonable cost.
- **Pricing**: what is fixed, what can rise, and renewal increases.
- **Payment schedule** tied to milestones, with a final amount held until acceptance.

> Exam tip: a scripted demonstration and a weighted scoring matrix make vendors comparable. Data ownership and exit rights, acceptance criteria, and tied payments belong in the contract, not in a verbal promise.`,
      hook: "Script the demonstration, score against weighted criteria, check references, and put acceptance, support, and data exit rights in the contract."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Project Management", domain: 2,
  blurb: "Running an imaging project from scope to lessons learned.",
  assumes: "Unit 7.",
  lessons: [
    {
      id: "u8l1", title: "Goals, Scope, Scope Change Control, Risks, and Dependencies", domain: 2, obj: "B1", minutes: 10,
      body: `Midway through a PACS upgrade, a radiology section asks for a new hanging protocol layout, then another group asks to move an interface onto the new engine. Each request is reasonable. Together they push the date out three months. Scope and risk control are how a project manager says yes, no, or later with a reason.

## Goals and scope
**Goals** state the results the project must deliver. **Scope** states what the project will and will not do. Write both down and have the sponsor sign. The out-of-scope list is as important as the in-scope list, because it is what you point to later.

## Scope change control
Scope creep is the quiet growth of the work without a change in time or money. Control it with a process, not with refusal.
1. A requester submits a written change request.
2. The project manager estimates the effect on cost, time, and risk.
3. The change board or sponsor approves, declines, or defers it.
4. If approved, the plan, the budget, and the schedule are updated and the team is told.

## Risks
A **risk** is something that might happen and would affect the project. **Internal** risks come from within the project, such as a key analyst leaving or a poor estimate. **External** risks come from outside, such as a vendor delivering late or a regulation changing.

Quantify each one: how likely it is, and how bad it would be. A simple scale of high, medium, and low for each is enough. Multiply or combine them to rank the risks, then define a **mitigation strategy**: reduce the likelihood or the impact, transfer the risk (insurance or contract terms), avoid it by changing the plan, or accept it knowingly.

## The risk register
\`\`\`
Risk                         Type       Likelihood  Impact  Owner       Mitigation
Vendor ships hardware late   external   medium      high    Project mgr order early; weekly check
Interface analyst leaves     internal   low         high    IT manager  cross-train a second analyst
\`\`\`
Review the register at every status meeting.

## Dependencies
A **dependency** is a task that cannot start until another finishes: you cannot load studies into the new archive until the storage is installed. Dependencies come from within the project and from outside it, such as a vendor delivery or a network outage window. Record them, because a late predecessor moves everything after it.

> Exam tip: a scope change goes through change control and ends with an updated plan. Internal risks are within the project's control, external ones are not, and a risk register holds likelihood, impact, owner, and mitigation.`,
      hook: "Write goals and scope, route every change through change control, rank the risks in a register, and record the dependencies."
    },
    {
      id: "u8l2", title: "The Project Plan: WBS, Resources, Effort Estimates, Milestones", domain: 2, obj: "B2", minutes: 10,
      body: `The sponsor says, "Upgrade the PACS by March." Before you say yes you need to know what that work consists of, who will do it, how long each piece takes, and which pieces must wait for others. That is the project plan.

## The work breakdown structure
A **work breakdown structure**, or WBS, splits the project into smaller and smaller pieces of work until each piece can be assigned and estimated. Think of it as an outline of deliverables, not of dates. The rule is that the lowest level, a work package, is small enough that one person can own it and estimate it.

## Resources and effort estimates
For each work package, identify the **resources**: the people (analyst, network engineer, technologist), the equipment, and the vendor time. Then estimate the **effort**, the hours of work. Effort is not duration. A task of 16 hours of effort for one person is two working days of duration if they work on it full time, but it could take a week if they work on it two hours a day. Ask the person who will do the work, and add contingency for the unknowns.

## Milestones
A **milestone** marks a major result with no duration of its own: contract signed, test system ready, pilot complete, go-live. Milestones give the sponsor something to check and show where the plan is slipping.

## Dependencies and the critical path
Link the tasks by dependency. The **critical path** is the longest chain of dependent tasks from start to finish; its length is the shortest the project can take, and a delay on it delays the whole project. A task off the critical path has slack, meaning it can slip a little without moving the end date.

\`\`\`
Task                      Days   Needs
A  Install storage        5      none
B  Build test system      4      none
C  Migrate test studies   6      A
D  Validate and train     3      B and C
Path A-C-D = 5 + 6 + 3 = 14 days (critical path)
Path B-D   = 4 + 3     =  7 days (3 days of slack on B)
\`\`\`

> Exam tip: the WBS lists the work, effort is hours, duration is calendar time, and the critical path is the longest chain, so only delays there move the end date.`,
      hook: "Break the work down, estimate the effort with the doer, mark the milestones, and find the critical path."
    },
    {
      id: "u8l3", title: "Running the Project: Gantt Charts, Time-and-Task Tracking, Status Reporting", domain: 2, obj: "B3", minutes: 9,
      body: `The plan is approved and the contract is signed. Now the real project begins, and the plan will not survive contact with reality unless somebody watches it. This lesson is about how a project is run once it starts.

## The process groups
A project moves through **initiating** (authorize it, name the manager and sponsor), **planning** (the WBS, schedule, budget, and risk register), **executing** (do the work), **monitoring and controlling** (compare actual to plan and correct), and **closing** (accept the result and finish the paperwork). Before the start, a **readiness** check confirms that the people, funds, and approvals are in place. Each group produces documents: a charter, a plan, status reports, change records, and a closing report.

## Gantt charts
A **Gantt chart** is a timeline with a bar for each task across the dates, with arrows for dependencies and diamonds for milestones. It answers three questions: what is happening this week, what comes next, and what is late. Mark the critical path so everyone sees which bars matter most.

## Time-and-task tracking
Record the real hours spent on each task and compare them with the estimate. When hours run over, ask whether the estimate was wrong or the task grew. The numbers feed the next estimate and show when the budget is at risk before the money is gone.

## Status reporting
A status report goes out on a fixed schedule and covers five things.
\`\`\`
Schedule    on track, at risk, or late, with the next milestone date
Budget      spent to date against plan
Cost        forecast total cost at completion
Resources   people and equipment gaps
Quality     test results and open defects
\`\`\`
Add the top risks, decisions needed, and what will be done next. A report that is honest about a problem early is worth more than a perfect report that arrives too late.

> Exam tip: a Gantt chart shows tasks, dependencies, and milestones over time. Status reports cover schedule, budget, cost, resources, and quality, and are sent on a regular schedule.`,
      hook: "Run by the process groups, track the real hours against the estimate, show the schedule on a Gantt chart, and report on a fixed schedule."
    },
    {
      id: "u8l4", title: "Go-Live, the Retrospective, and Lessons Learned", domain: 2, obj: "B4", minutes: 9,
      body: `It is the Thursday before cutover to the new PACS. The vendor says the system is ready, the radiologists say they are not sure, and a technologist reports that three modalities still fail the connectivity test. Someone must decide whether to go. This lesson is about that decision and about what you do after it.

## Go-live readiness and the go/no-go decision
Define the readiness criteria in advance and check them one by one.
\`\`\`
Criterion                                  Status
Acceptance tests passed                    yes
Interfaces and modalities verified         no, three failed
Users trained                              yes, with sign-in sheet
Support staff and escalation list ready    yes
Back-out plan tested                       yes
Downtime procedures distributed            yes
\`\`\`
At the **go/no-go meeting** the steering group looks at the open items, weighs the risk, and decides. An open critical item, such as three failing modalities, is a reason to say no, or to go with a documented exception and a plan. The decision and its reasons are written down.

## Support during go-live
Plan extra support for the first days: staff at the elbow in the reading rooms and modalities (floor walkers), a command center or direct line, a daily check-in to review problems, and a clear way to classify and escalate issues. The back-out plan stays ready until a named day when the team agrees the system is stable.

## Completion and assessment
Compare the result with the goals and scope: were the deliverables accepted, did the budget hold, did the benefits promised in the justification appear. Obtain formal acceptance and release the final payment.

## The retrospective and lessons learned
Hold a **retrospective** with the team: what went well, what did not, and what to change. Write the **lessons learned** down in a shared place, with an owner for each action. Review them at the start of the next project, because a lessons-learned document that nobody opens helps nobody. After go-live, revisit them at 30 and 90 days to capture issues that appeared in daily use (example intervals).

> Exam tip: go/no-go uses criteria agreed in advance, and the back-out plan stays ready after go-live. The retrospective produces written lessons learned that the next project reads.`,
      hook: "Decide go or no-go against agreed criteria, support the first days closely, then run a retrospective and keep the lessons where the next team will find them."
    }
  ]
});

FRA.units.push({
  id: "u9", n: 9, title: "Communications", domain: 4,
  blurb: "Who works in healthcare, the words they use, and how to tell them about change.",
  assumes: "Nothing beyond the earlier units; the lessons stand on their own.",
  lessons: [
    {
      id: "u9l1", title: "Healthcare Roles, Settings, and Specialties", domain: 4, obj: "D1", minutes: 9,
      body: `You are asked to join a meeting about a new reading workflow and the invitation lists a CMIO, a section chief, two fellows, a nurse manager, and a CIO. If you do not know who owns what, you will talk to the wrong person about the wrong decision. Informatics sits between clinical and technical people, so you must know both sides.

## Roles
\`\`\`
Role                  What they do
CMIO                  a physician who leads how clinical systems are used
CIO                   leads information technology for the whole organization
Department chair      leads a clinical department, such as radiology
Section chief         leads a subspecialty section, such as neuroradiology
Attending             the senior physician responsible for the patient and the report
Resident              a physician in training after medical school
Fellow                a physician in extra subspecialty training, later than a resident
Technologist          performs the exam and checks its quality
Nurse                 cares for the patient, gives medication, prepares for the exam
Administrator         manages budget, staff, and operations
\`\`\`
Residents draft reports and the attending finalizes them, which is why a worklist or an RIS rule may route a study to a resident first. A technologist decides when the images are acceptable; an attending decides what they mean.

## Settings
- **Ambulatory** and outpatient clinics: short visits, small sites, often a remote link to the main archive.
- **Academic** medical centers: teaching, research, residents and fellows, many subspecialties, and heavy demands for custom workflows.
- **Private practice** groups: owned by the physicians, cost-focused, and often reading for several hospitals.
- **Pediatrics**: smaller patients, special protocols, and sizes and weights that matter to dose.
- **Research** sites: trials with de-identified data and review board approval.

## Specialties that use imaging
Radiology reads most of the images. Orthopedics uses them for bones and joints, neurology for brain and nerves, oncology to stage and follow cancer, cardiology for the heart, and pediatrics for children. Each wants different hanging protocols, priors, and viewer tools.

> Exam tip: CMIO is the clinical informatics physician, CIO is the technology executive, and a fellow is further along than a resident. Match the decision to the role that owns it.`,
      hook: "Know who the CMIO, CIO, chair, section chief, attending, resident, fellow, and technologist are, and which setting or specialty changes the workflow."
    },
    {
      id: "u9l2", title: "Medical Terminology for Informatics: Anatomy, Positions, Planes, Modality Terms", domain: 4, obj: "D2", minutes: 10,
      body: `A technologist calls: the study says right but the images show the left. In informatics you do not interpret images, but you must understand the words in the order, the DICOM header, and the report well enough to catch an error that could hurt a patient. This is vocabulary at recognition level.

## Anatomy, physiology, and pathology
**Anatomy** is the structures of the body, **physiology** is how they work, and **pathology** is the study of disease. You do not diagnose; you recognize that an exam of the chest, the abdomen, or the brain is named for a body region, and that a report finding is a pathology term.

## Directional terms and planes
\`\`\`
Anterior   front              Superior   toward the head
Posterior  back               Inferior   toward the feet
Medial     toward the midline Lateral    away from the midline
Proximal   nearer the trunk   Distal     farther from the trunk
\`\`\`
Three planes cut the body.
- **Axial** (transverse) divides top from bottom, and CT slices are usually axial.
- **Coronal** divides front from back.
- **Sagittal** divides left from right.

## Projections and positions
A **projection** is the direction the beam travels through the body: AP (front to back), PA (back to front), lateral (side), and oblique (at an angle). A **position** is how the patient lies or stands: **supine** on the back, **prone** on the stomach, upright, and **decubitus** lying on a side.

## Modality terms that shift meaning
A **slice** is one image of a cross-section. A **series** is a group of images from one acquisition. A **view** in mammography names a standard projection, while a **sequence** in MRI names a pulse and timing pattern. A **phase** in CT can mean the timing after contrast, in MRI a signal property. The same word can mean different things, so ask which modality is meant.

## Where the words appear in DICOM
\`\`\`
DICOM attribute             Example value                    Used for
Laterality                  right or left                    which side was imaged
Body Part Examined          chest                            routing and display rules
Patient Position            head first, supine               orientation of the images
View Position               PA, lateral                      hanging protocols
\`\`\`
Hanging protocols and routing rules read these values, so a wrong laterality or body part moves the study into the wrong layout, or into the wrong worklist.

> Exam tip: axial divides top and bottom, coronal front and back, sagittal left and right. A wrong laterality is a patient safety error, and DICOM carries laterality, body part, and position in the header.`,
      hook: "Know the directions, the three planes, the projections and positions, and how laterality, body part, and position travel in the DICOM header."
    },
    {
      id: "u9l3", title: "Announcing Downtime, Upgrades, and Workflow Changes: Who, What, When, Why, How, by User Role", domain: 4, obj: "D3", minutes: 9,
      body: `The PACS upgrade needs a four-hour window on Saturday night. If the radiologists learn about it from the login screen at 10 that night, you will hear about it on Monday. People do not resent a planned change as much as they resent a surprise.

## Five questions every notice answers
\`\`\`
Who     is affected, and who is responsible
What    is changing, and what it does to their workflow
When    it starts, how long it lasts, and when it ends
Why     the reason, in the user's own terms
How     what users do differently, and who to call
\`\`\`
Write the answer to each in one line before you write the message. If you cannot answer how, the notice is not ready.

## One change, different messages
Different roles need different content.
- **Radiologists** want to know how reading continues: which workstation or backup viewer to use, what is unavailable, and what happens to dictation.
- **Technologists** want to know what to do with new exams: where to send images, whether to hold studies, and how to label paper requisitions.
- **Clinicians** want to know how to see images and reports meanwhile, and whom to call for an urgent read.
- **IT staff** want the technical sequence: the start time, the checks, the back-out time, and the contacts.

## Timing and channels
Give early notice, then reminders. For a planned downtime, send a first notice about two weeks ahead, a reminder a few days before, a final notice on the day, and a message when it ends (example schedule). Use several channels: email, a banner on the login screen, huddles in the reading room, the intranet, and a phone call or page for urgent contacts. An unplanned outage cannot wait for a schedule, so send a short message at once, with the time you will send the next update.

## Close the loop
Say when the change is over, and what to report if something looks wrong. After a workflow change, a quick survey or a floor walk tells you whether the message landed.

> Exam tip: a notice says who, what, when, why, and how, and is shaped by role. The end-of-downtime message is part of the plan, and early notice plus reminders beat a single announcement.`,
      hook: "Answer who, what, when, why, and how in each notice, tailor it to each role, and announce early, remind, and say when it is over."
    },
    {
      id: "u9l4", title: "Strategic Planning and Feedback: Alignment, Reporting Tools, Surveys", domain: 4, obj: "D4", minutes: 9,
      body: `The hospital's strategic plan says, "reduce time to treatment for stroke patients." Your department's plan says, "upgrade the PACS." Leaders fund what they can tie to their goals, so your job is to show the link, then report the evidence that it worked.

## Alignment
Start from the organization's strategic plan and ask which goals imaging informatics can serve. Then write the department goal in the organization's words.
\`\`\`
Organization goal            Imaging informatics goal                   Measure
Faster stroke treatment      priority routing of head CT to the reader  minutes from scan to report
Lower cost per exam          reduce repeat exams caused by lost priors  repeat exam count
Safer patient data           yearly access review and audit             accounts removed on time
\`\`\`
A goal with no measure cannot be reported, and a project with no goal is hard to fund.

## Feedback mechanisms
Gather evidence from two directions.
- **Reporting tools** pull objective numbers from systems: turnaround, uptime, queue depth, unread exams, and help desk volume.
- **Measurement methods** such as **surveys** ask the users: how satisfied are the radiologists, is the viewer fast enough, is training enough. Use short, specific questions with a rating scale and one open comment, send them at consistent times, and report the response rate so the reader knows how much weight to give the result.

Neither source alone is enough. Numbers say what happened; users say why it matters to them. A service that meets its uptime target but irritates its users has a problem the dashboard hides.

## Presenting to leadership
Lead with the goal and the result, one page, no jargon. Show the trend, say what it cost, name the risks, and make one clear request. Offer the detail on request. Then use the feedback: adjust the plan, tell users what changed because of what they said, and repeat the cycle.

> Exam tip: align department goals with the organizational strategic plan, measure with reporting tools and surveys, report to leaders in their terms, and adjust the plan with what users say.`,
      hook: "Tie each department goal to the organization's plan, measure it with tools and surveys, and show leaders the result in their words."
    }
  ]
});

FRA.units.push({
  id: "u10", n: 10, title: "Training and Education", domain: 5,
  blurb: "Deciding what training a change needs, delivering it, and proving it worked.",
  assumes: "Unit 9.",
  lessons: [
    {
      id: "u10l1", title: "Training Needs: the Trigger, the Audience, Objectives, Measurement Methods", domain: 5, obj: "E1", minutes: 9,
      body: `The new reading workstation software goes live in six weeks, and the vendor offers a one-hour webinar for everybody. That plan will fail, because a radiologist, a technologist, and a clerk need different things from training. Good training starts with the need, not with the slides.

## The trigger
A training need appears when something changes.
- A **new system**: everyone starts from zero.
- A **workflow change**: the same tools used in a new way, such as a new critical-results step.
- A **system upgrade**: a familiar system with new screens or behavior. Training may be short, but it still must happen.

## Know the audience
\`\`\`
Question        Why it matters
Size            200 people need self-paced modules; 8 can sit in one room
Location        many sites favor virtual sessions and e-learning
Role            each role needs only the tasks it performs
Experience      new hires differ from veterans
Availability    radiologists cannot leave the worklist for a half day
\`\`\`

## Write instructional objectives
An **objective** states what the learner can do afterward, in words you can check: "The technologist can correct a patient name mismatch in the study list and confirm it in the audit trail." Objectives that begin with "understand" are vague and cannot be tested. Write one for each task by role.

## Choose a delivery method
Let the audience and the objective decide. A task with many clicks needs hands-on practice in a test system. A short policy change fits a one-page card. A large, spread-out audience fits e-learning. A complex workflow for a small group fits a classroom session.

## Measurement methods chosen at the start
Decide now how you will know it worked. A **survey** asks how learners feel. A **task analysis** breaks a job into steps and records where people hesitate or fail. Combine them, because confidence and ability are different things.

> Exam tip: a new system, a workflow change, or an upgrade triggers training. Audience size, location, and role pick the method, and objectives must be checkable.`,
      hook: "Find the trigger, size up the audience, write objectives you can check, and pick the delivery method and the measurement together."
    },
    {
      id: "u10l2", title: "Training Programs: Settings, Presentation Formats, Delivery", domain: 5, obj: "E2", minutes: 9,
      body: `You have your objectives and your audience. Now you must build the program: where it happens, in what form, who delivers it, and when. The common failure is training that is excellent but cannot be attended because it collides with a full clinical schedule.

## Settings
- **In person**: best for hands-on practice and for questions, and costly in travel and time.
- **Virtual**: live online sessions that reach many sites at once, with less hands-on feel. Record them for those who cannot attend.

## Presentation formats
\`\`\`
Format               Best for
Written guide        step-by-step procedures people look up
Graphics             showing where a button or a layout is
Video                short demonstrations of a task on screen
E-learning           self-paced modules for a large or spread-out audience
Quick reference card one page placed at the workstation for the few key steps
\`\`\`
Use more than one format for important tasks. A video shows how, a card reminds, and a practice exercise makes it stick. Keep each piece short: a three-minute video on one task beats a one-hour tour.

## Super-users and train-the-trainer
A **super-user** is a staff member in each area, such as a technologist on each shift or a clerk at each desk, who gets extra training and then coaches colleagues, answers first-line questions, and reports problems to the project team. In a **train-the-trainer** model, you train the super-users and they train their peers. It scales well, puts a trusted face in each area, and keeps help near the work. Support super-users with time in their schedule and a clear way to reach you.

## Schedule around clinical work
Offer sessions on each shift, short enough to fit between exams (30 minutes is a common target for a refresher, as an example), and give a test environment where people can practice without touching a live patient record. Train close to go-live, not months before, because people forget what they do not use. Reserve seats for night and weekend staff, who are often forgotten.

> Exam tip: in person suits hands-on work and virtual or e-learning suits wide audiences. Super-users and train-the-trainer put help on every shift, and the schedule must fit clinical work.`,
      hook: "Choose in person or virtual, pair formats with the task, use super-users to coach on every shift, and fit the schedule to clinical work."
    },
    {
      id: "u10l3", title: "Assessing Training", domain: 5, obj: "E2", minutes: 9,
      body: `Training finished last week. The attendance sheet is full and everyone smiled. Then the help desk reports that calls about the same three screens have doubled. A full sign-in sheet shows people attended; it does not show they can do the job. Assessment finds out whether the training worked.

## Tools to assess
\`\`\`
Tool                        What it tells you
Quiz                        whether the learner knows the facts
Observation                 whether the learner performs the task correctly
Authentic assessment        performance on a real task in a test system
Survey                      how learners and managers feel, and what they want
Help-desk call trends       where real users struggle after go-live
\`\`\`
- A **quiz** tests knowledge, such as which button sends a study to an outside site. It is quick, but knowing and doing are different.
- **Observation** means watching someone work, ideally with a checklist of steps.
- **Authentic assessment** asks the learner to perform a realistic task, for example to correct a mismatched patient name in the test system. It is the best match for a task-based objective.
- A **survey** gathers opinion, such as confidence and clarity of the materials.
- **Help-desk call trends** are free evidence. A rise in calls on one topic after go-live points to a gap in the training for that task.

## Act on the results
Find the weak spots and fix them: a repeated quiz miss means rewrite that lesson; observation shows a step people skip, so add it to the card; a spike in calls on one screen calls for a short refresher video or a huddle. Retrain the people who need it, not everyone. Then measure again, because training is a cycle, like any other improvement.

## Document who was trained
Keep a record for each person: name, role, what they completed, the date, and the assessment result. It lets you show an auditor or an accreditor that staff were trained before they used the system, lets you find who missed training, and tells you which role to follow up with when a problem appears.

> Exam tip: a sign-in sheet proves attendance, not skill. Authentic assessment and observation test the task, surveys gather opinion, and rising help-desk calls on a topic point to a training gap.`,
      hook: "Test the task, not just attendance, use help-desk call trends as free evidence, fix the gaps, and keep a record of who was trained."
    }
  ]
});
