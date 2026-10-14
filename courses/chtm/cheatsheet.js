// CHTM Academy memorization sheet for the AAMI/ACI CHTM exam. Formulas, statement lines, risk tools, operations
// metrics, regulators, training measures, and labor laws a healthcare technology manager must recall cold. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CHTM Memorization Sheet",
  intro: "Print this and keep it beside you. The CHTM exam rewards recall of the financial formulas, the risk tools and the laws behind them, the operations metrics a department reports, who regulates what, how training is justified and measured, and the labor laws a manager must not break. Every number and name on this sheet is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Certifying body", "The AAMI Credentials Institute (ACI), the credentialing arm of AAMI"],
          ["Credential", "Certified Healthcare Technology Manager (CHTM), for HTM supervisors and managers"],
          ["Questions", "100 multiple-choice questions"],
          ["Time and rules", "2 hours, closed book; an on-screen calculator and an on-screen notepad are the only tools"],
          ["Delivery", "Computer-based at Kryterion test centers"],
          ["Testing windows", "Twice a year: May 1 to 15 and November 1 to 15"],
          ["Domain 1", "Financial Management, 20% of the exam"],
          ["Domain 2", "Risk Management, 16% of the exam"],
          ["Domain 3", "Operations Management, 40% of the exam"],
          ["Domain 4", "Education and Training, 11% of the exam"],
          ["Domain 5", "Human Resources, 13% of the exam"],
          ["Scoring method", "A criterion-referenced cut score set by the modified Angoff method; the cut score is not published"],
          ["Results", "Reported as pass or fail, with no numeric score"],
          ["Fee", "$490 member, $565 non-member; retake $440 member, $515 non-member"],
          ["Retake rules", "Wait 60 days between attempts; at most three attempts in two years, then a one-year wait"],
          ["Recertification", "At least 30 continuing education units (CEUs) in a three-year cycle, with fees paid by December 31 of the year the credential expires. One CEU is one hour of qualifying activity"],
          ["Other ACI credentials", "CABT for associates entering the field, CBET for technicians, CRES for imaging specialists; the CHTM is the management credential. A CABT alone does not satisfy an eligibility pathway"],
          ["How the questions read", "They ask for the FIRST step, the BEST recommendation, the MOST appropriate report, committee, or document, and now and then the LEAST appropriate action"]
        ] },
        { type: "table", cols: ["Eligibility pathway", "What it requires"], rows: [
          ["1. Current technician or engineer credential", "A current CCE, CBET, CRES, or CLES plus at least three years of work as an HTM supervisor or manager in the last five"],
          ["2. Military training", "The Department of Defense (DoD) BMET training program plus three years of military or civilian HTM supervisor or manager experience in the last five"],
          ["3. Associate degree", "An associate degree in biomedical technology, a related healthcare discipline, information technology, or business plus three years as an HTM supervisor or manager in the last five"],
          ["4. Bachelor's degree or higher", "A bachelor's degree or higher in biomedical technology, engineering, a related healthcare discipline, information technology, or business plus two years as an HTM manager in the last five"],
          ["5. Experience alone", "Seven years in the HTM field with three years of management experience in the last five"],
          ["Attestation rule", "A pathway without the supervisor or manager title needs confirmation of management duties by self-attestation or third-party attestation"]
        ] },
        { type: "note", text: "This course's official-format test uses 70%, the same bar as our CBET and CRES courses; ACI publishes no cut score." }
      ]
    },
    {
      id: "financial", title: "Financial management",
      blocks: [
        { type: "table", cols: ["Budget or term", "What it means to the manager"], rows: [
          ["Operating budget", "Next year's spending on labor, parts, contracts, outside service, calibration, tools and minor equipment, office supplies, travel, memberships, education, and shop meetings"],
          ["Capital budget", "Requests above the hospital's dollar threshold for items with a long useful life: a system, test equipment, a shop expansion. It competes with every other capital request in the hospital"],
          ["Who approves what", "The manager builds both. The operating budget is approved up the manager's own chain with finance; the capital budget is approved by the capital or technology committee and senior leadership, because capital money is rationed across the whole hospital"],
          ["When budgets are built", "Three to six months before the fiscal year starts"],
          ["Fiscal year", "The hospital's twelve-month accounting year. It often does not match the calendar year, so know which one a request is aimed at"],
          ["Cost center", "The numbered account a department's costs post to. Every work order, part, and contract payment should trace to one"],
          ["Chart of accounts", "The hospital's list of cost centers and subaccounts. The HTM budget is reported in those subaccount numbers, not in categories HTM invents"],
          ["Distributed budgeting", "HTM holds only shop costs: labor, calibration, training, supplies. Contracts, parts, and outside labor stay with whichever clinical cost center owns the device, which leaves nobody able to see total maintenance cost or hold a vendor to terms"],
          ["Consolidated budgeting", "Every equipment dollar is moved under the HTM cost center, then allocated back to the clinical cost centers from CMMS reports. This is the better model, because the department that pays can withhold payment until service reports arrive"],
          ["The irregular-cost trap", "A large cost that recurs on a long interval, such as an eighteen-month part, must be budgeted on its interval. Last year's spend may not contain it at all"],
          ["Purchase order cost", "Raising one purchase order carries roughly $100 of hospital overhead, so many small orders waste more than the lower part price ever saves"],
          ["Fiscal agreement", "Consolidation only works with a written understanding among HTM, the clinical departments, and the chief financial officer on priorities and on how a repair that exceeds the budget still gets done"]
        ] },
        { type: "table", cols: ["What you spend money on", "Where it posts in the general ledger"], rows: [
          ["Technician and supervisor wages", "Salaries, the payroll line"],
          ["Overtime and on-call pay", "Salaries. Track it as its own line: rising overtime is the first sign of understaffing"],
          ["Repair parts bought by HTM", "Maintenance and repairs"],
          ["Service contracts and vendor labor", "Purchased maintenance and repair"],
          ["Shop consumables and small supplies", "Office supplies or medical and surgical inventory, by what the item is"],
          ["Test equipment calibration", "Maintenance and repairs, or a calibration line if the hospital has one"],
          ["Training tuition, travel, and lodging", "Travel and education. Training is an expense because it cannot be depreciated"],
          ["A replacement monitoring system", "Capital, not operating. It is depreciated over its useful life rather than expensed this year"]
        ] },
        { type: "table", cols: ["Formula", "Statement and worked example"], rows: [
          ["Budget variance", "Variance = actual minus budget. $112,000 actual against a $100,000 budget is a $12,000 variance"],
          ["Variance percent", "Variance / budget x 100. $12,000 / $100,000 x 100 = 12%. Accounting usually wants a written explanation once a month lands 5% or 10% off its budget"],
          ["Favorable or unfavorable", "An expense that comes in under budget is favorable; over budget is unfavorable. Over-expenditure is what gets the attention"],
          ["ROI percent", "ROI = (gain minus cost) / cost x 100. A $25,000 school that avoids $90,000 of contract cost: (90,000 minus 25,000) / 25,000 x 100 = 260%"],
          ["Payback period", "Payback = cost / annual savings. A $100,000 project returning $20,000 a year pays back in five years. Shorter is better"],
          ["Total cost of ownership", "TCO = purchase plus installation plus service plus parts plus training plus disposal, across the life of the device. Compare TCO, never the sticker price"],
          ["Straight-line depreciation", "(Cost minus salvage value) / useful life, per year. A $1,000,000 system over ten years with no salvage depreciates $100,000 a year"],
          ["Book value", "Book value = cost minus accumulated depreciation. After three years that system books at $700,000, and that number says nothing about remaining useful life or resale value"],
          ["Cost of service ratio", "COSR = annual service cost / acquisition cost x 100. $5,000 a year on a $125,000 system is 4%"],
          ["Reading a COSR", "Across a hospital, 4% to 25% is the normal band. Manufacturer service typically runs 10% to 25%; full in-house service can reach 4% to 6%"],
          ["COSR on a quoted contract", "Divide the contract's annual price by the device's purchase price, then compare it with the department's COSR. A $180,000 contract on a $1,000,000 system is 18% against a department running 6%: three times the cost"]
        ] },
        { type: "table", cols: ["Statement or accounting term", "What it holds"], rows: [
          ["Balance sheet", "A snapshot on one day: assets, liabilities, and owner's equity. Assets equal liabilities plus equity"],
          ["Income statement", "Also called the profit and loss statement. It covers a period of a month, quarter, or year: revenue minus expenses equals net income"],
          ["Cash flow statement", "Cash in and cash out over a period, split into operating, investing, and financing. Reported profit is not money in the bank"],
          ["GAAP", "Generally accepted accounting principles: the standards, conventions, and rules accountants follow when recording transactions and preparing statements"],
          ["Accounts payable", "AP is what the hospital owes its vendors. Unpaid service invoices and parts orders sit here"],
          ["Accounts receivable", "AR is what the hospital is owed. Revenue from servicing outside clinics sits here until it is collected"],
          ["Accrual versus cash basis", "Accrual records an expense when it is incurred; cash basis records it when the payment clears. Hospitals budget on accrual, so a part ordered in June is June's expense"],
          ["Capital versus expense", "A capital item is depreciated over its useful life; an expense lands entirely in this year's budget"],
          ["Who to know by name", "The chief financial officer and the cost accountant for your cost center. The CFO decides how large irregular costs are carried in the budget"]
        ] },
        { type: "note", text: "A business justification is written in one order and never another: the problem, the options, the costs, the benefits, the risks, then the recommendation. Say what happens if nothing is funded." }
      ]
    },
    {
      id: "procurement", title: "Procurement, contracts, and the lifecycle",
      blocks: [
        { type: "table", cols: ["Life expectancy question", "How the manager answers it"], rows: [
          ["How is useful life set", "Manufacturer guidance, the AHA useful-life schedule for hospital assets, the department's own failure trends, parts availability, and the declared end of support"],
          ["What the AHA schedule is", "An industry average life expectancy by asset type, widely used to set depreciation. It is an average, not a verdict on the device in front of you"],
          ["What end of life means", "The manufacturer has decided to stop supporting the model. It does not mean the device is unsafe, unrepairable, or finished"],
          ["Is support guaranteed", "No. No law requires a manufacturer to supply parts or support for any number of years after it declares EOL"],
          ["What triggers replacement", "Support withdrawn, parts no longer available, failure rates climbing, calibration that will not hold, technology overtaken by something safer or more capable, or an annual maintenance cost that has outgrown the device's value"],
          ["How replacement is forecast", "Rising annual cost per device in the CMMS plus the manufacturer's EOL notices, read years ahead, because replacement runs into millions"]
        ] },
        { type: "table", cols: ["Service arrangement", "What it covers", "Who carries the risk"], rows: [
          ["Full service contract", "Parts, labor, travel, scheduled maintenance, often software support", "The vendor, at a fixed and usually high price"],
          ["Parts only", "Parts at an agreed price; no labor", "Shared: in-house staff do the work"],
          ["Time and materials", "Nothing in advance. You pay per call for labor, parts, and travel", "The hospital, which is self-insurance. Managed well it can cut cost by as much as 60% against a contract"],
          ["Shared risk", "A spending pool or a cap, with savings or overruns divided by formula", "Shared. Read the formula before you sign it"],
          ["First look", "In-house staff respond first; the vendor is called only when they cannot finish", "The hospital on routine calls, the vendor on the hard ones"],
          ["Preventive only", "Scheduled maintenance; repairs are billed separately", "The hospital on every failure"],
          ["Software support", "Updates, patches, remote diagnostics, license renewal", "The vendor, but only for what the license actually lists"],
          ["Point-of-sale or extended warranty", "Service sold at the moment of purchase, usually with no HTM input", "The hospital, which overpays. The seller's margin on one can run as high as 90%, and they rarely allow cancellation without a penalty"],
          ["Equipment insurance or asset management", "A premium covers scheduled and unscheduled work; you file claims", "The insurer, but the administrative load of claims lands on HTM"],
          ["In-house service", "Your own staff, tools, test equipment, and parts", "The hospital. Usually the lowest cost given volume, training, and stable staff"]
        ] },
        { type: "table", cols: ["Contract term", "What to pin down before signing"], rows: [
          ["Scope", "Exactly which devices, systems, modules, and accessories are covered, by serial or asset number, and during what hours"],
          ["Cost", "The annual price, what it buys against the alternatives priced over the same years, and the COSR it works out to on this device"],
          ["Compliance", "Whether the vendor's people are qualified and will supply training and competency records, whether their work will be documented in the CMMS, and whether their intervals meet the plan and the accreditor"],
          ["Response time", "Time to a phone response and time to on-site arrival, stated separately, with what happens when they are missed"],
          ["Uptime guarantee", "The promised availability, how it is measured, and the remedy when it is not met"],
          ["Parts", "Whether parts are included, whether glassware and major assemblies are included, and whether they are new, refurbished, or exchange"],
          ["Loaners", "Whether a loaner or backup unit is provided, how fast, and at whose cost"],
          ["Training", "Seats, level, location, and whether service literature and passwords come with them"],
          ["Exclusions", "The list that decides your real cost: batteries, accessories, probes, abuse, after-hours maintenance, software, travel"],
          ["Termination", "How the hospital gets out, how much notice is required, and what penalty applies"],
          ["Renewal and escalation", "Whether it renews automatically and how much the price may rise each year"],
          ["Indemnity and liability", "Who answers for injury, data loss, and damage caused during service"],
          ["Entire-agreement clause", "The signed contract is the whole deal, and a term can run as long as ten years. Nothing said in a meeting or an email survives it"],
          ["Where the leverage is", "Before signing, and before the capital purchase closes. After the sale the hospital has none"]
        ] },
        { type: "list", title: "In-house or vendor: the factors that decide", cols: 2, items: [
          "Volume: how many of this model the hospital owns, and whether the hours justify a trained technician",
          "Skills: who on staff already works at this level, and what happens when that one person is on leave",
          "Training cost: tuition, travel, lodging, and the weeks of productivity lost while a technician is away",
          "Test equipment: what the model requires, what it costs, and who calibrates it",
          "Parts access: whether the manufacturer sells parts, service keys, and software to equipment owners at all",
          "Risk: the consequence of a long outage on this device, and whether a backup unit exists",
          "Response time: how long a vendor takes to arrive against how long your own staff take to walk down the hall"
        ] },
        { type: "table", cols: ["Acquisition or disposal choice", "What the manager does with it"], rows: [
          ["Purchase", "Capital money, depreciated over the useful life. The hospital owns the asset and all of its downstream cost"],
          ["Lease", "Operating money spread over the term. Read who maintains it, who insures it, and what happens at the end"],
          ["Fair market value", "What a willing buyer would pay today. It is not book value and not replacement cost, and policy should say who determines it"],
          ["Trade-in", "Convenient, and usually the lowest value the hospital can get. Price the open market before accepting it"],
          ["Resale", "Used-equipment companies and broker sites will bid. After the labor to list, negotiate, and load, it is often close to break-even"],
          ["Donation", "A charity may deploy the device abroad. Policy must say who selects the charity and who may donate instead of sell"],
          ["Environmental disposal", "Batteries, mercury, sealed sources, refrigerants, and electronics follow environmental rules, not the loading dock"],
          ["Data wiping before disposal", "Any device that stored patient information is wiped or has its media destroyed before it leaves. Selling or donating a device holding PHI is a HIPAA violation, and often only HTM knows the data is there"],
          ["Documentation", "A disposal record naming the asset, the method, the date, the wipe, and the signature closes the asset out of the inventory and the ledger"],
          ["Order of preference", "Redistribute inside the organization or to a simulation center, then sell, then donate, then recycle. Disposing of an asset still being depreciated takes a hit for the remaining book value, so finance agrees first"]
        ] }
      ]
    },
    {
      id: "risk", title: "Risk management",
      blocks: [
        { type: "table", cols: ["Risk category", "What it looks like in an HTM department"], rows: [
          ["Patient safety risk", "A device that shocks, burns, delivers the wrong dose, or reads out of calibration and leads to a misdiagnosis"],
          ["Operations risk", "Downtime on the only device of its kind; a procedure canceled; a surgeon who takes cases to another hospital"],
          ["Financial risk", "Unplanned repairs that blow the budget, a contract signed without review, regulatory fines, the cost of a lawsuit"],
          ["Emergency preparedness risk", "A utility failure, a network outage, or a disaster that leaves clinicians without working equipment and no documented workaround"],
          ["Regulatory risk", "A survey finding on maintenance records, an unreported adverse event, equipment in an alternative program that is not eligible for it"],
          ["How risk and cost trade", "Risk and cost move in opposite directions. Almost any risk can be driven near zero if the hospital pays enough, and cost comes down only by accepting more risk. The hospital's risk management department decides how much is acceptable"]
        ] },
        { type: "table", cols: ["Scoring input", "How it shapes the maintenance strategy"], rows: [
          ["Equipment function", "What the device does: life support, therapeutic, diagnostic, analytical, or support. Life support scores highest"],
          ["Physical risk", "The harm a failure could cause: death, injury, a wrong diagnosis, or an inconvenience"],
          ["Likelihood of failure", "How often this model actually fails, from the hospital's own history or credible outside data"],
          ["Maintenance requirement", "How much scheduled work the device truly needs: filters, batteries, calibration, moving parts, or almost nothing"],
          ["Incident history", "The number, frequency, and nature of past failures and service requests on identical or very similar equipment"],
          ["How the score is used", "The inputs combine into one number. High scores get full scheduled maintenance at the manufacturer's interval; low scores get a longer interval or less work"],
          ["Run to failure", "A low-risk, inexpensive device whose failure harms nobody may be repaired or replaced only when it fails, under a documented alternative equipment maintenance program"]
        ] },
        { type: "table", cols: ["Risk tool", "The steps, in order"], rows: [
          ["Root cause analysis", "Define the event, gather the facts, ask why until the causes stop being symptoms (the five whys), map contributing causes on a fishbone, agree corrective actions with owners and dates, then verify the fix held"],
          ["What RCA is for", "Events that already happened. It works backward from the nearest cause to the root, which is often the organization rather than the person at the bedside"],
          ["FMEA", "Pick the process, list every step, list how each step can fail, score severity, occurrence, and detection, multiply them into a risk priority number, act on the highest, then rescore. Use it on failures that have not happened yet"],
          ["Risk priority number", "RPN = severity x occurrence x detection. Severity 8 x occurrence 3 x detection 5 = 120. Rank the list and work from the top"],
          ["Incident investigation", "Secure the device, its accessories, and its disposables where they are; preserve settings and switch positions; photograph everything; interview the witnesses; pull error logs; document names, dates, and sequence; then report"],
          ["What not to do", "Do not clean, repair, re-calibrate, update, or return the device to service, and do not let the trash be emptied: lot numbers of disposables live in it"],
          ["Where the report goes", "The complete report goes to the risk manager, which is what makes it work product. Discuss its contents with no one else. A near miss is investigated the same way"]
        ] },
        { type: "table", cols: ["Law, program, or report", "What it obligates"], rows: [
          ["Safe Medical Devices Act of 1990 (SMDA)", "Made adverse-event reporting mandatory for device user facilities: hospitals, ambulatory surgical facilities, nursing homes, and outpatient diagnostic and treatment facilities"],
          ["Death", "Report to the FDA and to the manufacturer no later than 10 work days after becoming aware. Where the manufacturer cannot be identified, the report goes to the agency alone"],
          ["Serious injury", "Report to the manufacturer no later than 10 work days, or to the agency instead when the manufacturer cannot be identified. Copying the agency on every suspected serious injury is recommended practice"],
          ["Serious injury, defined", "Life-threatening, or causing permanent impairment of a body function or permanent damage to a body structure, or requiring medical or surgical intervention to prevent that permanent harm"],
          ["Annual user facility report", "Submitted to the FDA on Form FDA 3419 by January 1 of each year, identifying the facility and the reports it filed"],
          ["MDR event files", "A user facility must keep written reporting procedures and must retain the event file for 2 years from the date of the event, available to an FDA investigator"],
          ["How reports are filed", "Mandatory reports go in on Form FDA 3500A through MedWatch. Form FDA 3500 is the voluntary form for clinicians and the public"],
          ["MAUDE", "The public database of device reports. Search it before buying and during an investigation to see whether others have reported the same failure"],
          ["Sentinel event", "A patient safety event that reaches a patient and results in death, permanent harm, or severe temporary harm. It triggers a full root cause analysis and an action plan, and accrediting bodies publish alerts on the patterns they see"],
          ["Recall classification", "The FDA assigns a recall the numeral I, II, or III to show the relative degree of health hazard the violative product presents"],
          ["Class I recall", "The worst case: there is a reasonable probability that using or being exposed to the product will cause serious harm to health, or death. Act on it immediately"],
          ["Class II recall", "Using or being exposed to the product may cause health consequences that are temporary or medically reversible, or the chance of serious harm is remote"],
          ["Class III recall", "Using or being exposed to the product is not likely to harm health at all, but it still breaks a requirement and must be corrected"],
          ["Recall workflow", "Receive the notice, locate every affected asset in the CMMS by model and serial range, quarantine or correct, notify the users and the committee, document each unit, verify the vendor's correction, then close the recall with a record"],
          ["Hazard and safety advisories", "Manufacturer notices, ECRI alerts, and FDA safety communications. Someone must own the inbox, log each notice, and record the action taken even when the action is none"]
        ] },
        { type: "table", cols: ["Data and cybersecurity topic", "What the manager must hold"], rows: [
          ["PACS", "Stores and moves images with patient identifiers. Treat the archive as patient data, not as a file server"],
          ["EMR and EHR", "The record inside one organization and the record shared across organizations. Networked devices feed them directly or through middleware"],
          ["HITECH", "Extended the HIPAA rules: breach notification, direct obligations on business associates, and stronger enforcement"],
          ["Integrity", "Data that arrives at the record unchanged and attached to the right patient. A wrong-patient vital sign is a safety event, not a clerical error"],
          ["Backups", "Scheduled, verified, stored away from the system they protect, and restored in a test before you need them in anger"],
          ["Access control", "Unique named accounts, least privilege, multi-factor authentication where it is supported, and shared service passwords retired"],
          ["Encryption", "Protect data at rest on the device and in transit across the network, by the manufacturer's supported method"],
          ["Patching and updates", "Only on the manufacturer's validated schedule. An unvalidated patch can take a cleared device out of its cleared configuration"],
          ["Hardening", "Turn off unused ports and services, change default credentials, and remove software the clinical function does not need"],
          ["Segmentation", "Put devices that cannot be patched on their own network segment with tight rules, and document who approves exceptions"],
          ["Antivirus", "Only where the manufacturer allows it, and only with the exclusions they specify"],
          ["MDS2", "The manufacturer disclosure statement for medical device security. Require it before purchase; it is the inventory of what the device can and cannot protect"],
          ["Operating system life expectancy", "Ask how long the embedded operating system will be supported. A device with a long clinical life running an operating system whose support ends far sooner is a known future problem, not a surprise"],
          ["Wireless Medical Telemetry Service", "Protected spectrum for patient telemetry, licensed and coordinated under FCC rules. Someone must register the hospital's WMTS use and keep other transmitters out of the band"],
          ["Why the FCC matters", "It licenses and manages the radio spectrum. An unmanaged transmitter in a telemetry band means dropped waveforms on monitored patients"]
        ] },
        { type: "list", title: "Emergency preparedness", cols: 2, items: [
          "Downtime procedures in writing for every clinical system: what staff do when the network, the record, or the device is gone, and who declares downtime",
          "Utility failure: know what is on emergency power, which outlets are on the generator, and which devices must be moved when they are not",
          "Generator and UPS inventory: which devices have internal batteries, how long they last, and when each battery was last tested and replaced",
          "Critical equipment lists: the devices whose failure threatens life, maintained whether or not they sit in an alternative maintenance program",
          "Disaster plans: surge capacity, where reserve equipment is stored, how it is kept charged and tested, and who releases it"
        ] }
      ]
    },
    {
      id: "operations", title: "Service operations and metrics",
      blocks: [
        { type: "table", cols: ["Work order stage", "What has to happen"], rows: [
          ["Request", "Captured once, with the device asset number, location, caller, and the problem in the caller's words"],
          ["Triage", "Ranked by clinical impact, not by order of arrival. A life-support device beats a convenience item every time"],
          ["Assignment", "To a technician with the competency and the parts, with the clinical user told who is coming and when"],
          ["Repair", "The work itself, with time and parts recorded as they happen rather than from memory at the end of the week"],
          ["Verification", "Performance and safety checks that prove the device meets specification before it goes back to the patient"],
          ["Closure", "Problem code, cause, action, parts, labor hours, and the condition on return, all in the CMMS"],
          ["Customer feedback", "Tell the user what was wrong and what was done, then measure satisfaction on a survey you do not change year to year, so the numbers compare"],
          ["What a complete record holds", "Asset number, date and time in and out, who did the work, the reported problem, what was found, what was done, parts used with cost, labor hours, test results, and the return-to-service decision"],
          ["Problem codes that matter", "Use error and cannot duplicate. Both are real work and neither is an equipment failure. Trend them or you will mistake a training problem for a reliability problem"],
          ["Outside vendors", "Every visit by a vendor or manufacturer is logged in the CMMS too. Make check-in and a service report within 24 hours a condition of payment"]
        ] },
        { type: "table", cols: ["CMMS content", "Why it is there"], rows: [
          ["Asset inventory", "Every medical device in the building, whether the hospital bought it, leases it, rents it, has it on loan, or borrowed it, and regardless of who maintains it"],
          ["Standard nomenclature", "One agreed name per device type, manufacturer, and model, so like items can be compared. UMDNS from ECRI is the common free standard"],
          ["Granularity rule", "Inventory anything carrying a serial number, because serial ranges are what recalls name. Give one shared number to the cheap, numerous, low-consequence items nobody would track one by one"],
          ["Original cost", "Price paid for every asset. Without it no cost of service ratio can be calculated and no cost can be fairly allocated to a cost center"],
          ["Work orders", "Every scheduled and unscheduled job, open and closed, with hours and parts against the asset"],
          ["Service history", "The full life of the asset, including work done by vendors, so trends and repeat problems are visible"],
          ["Parts", "What is on the shelf, what it cost, what it fits, and what is on order"],
          ["Recalls and advisories", "Which notice hit which asset, what was done, and when it closed"],
          ["End of life and support dates", "So replacement planning starts years before the device stops being serviceable"]
        ] },
        { type: "table", cols: ["Maintenance term or task", "What it means"], rows: [
          ["Preventive maintenance", "Scheduled work on parts that wear: filters, fans, lubrication, batteries, and components with a known life"],
          ["Performance verification", "Confirming the device still meets specification. If it does, nothing is changed"],
          ["Safety testing", "Measuring leakage current, ground resistance, and where applicable isolation, with a safety analyzer"],
          ["Scheduled maintenance", "The umbrella term: any mix of safety testing, performance verification, and preventive maintenance done on a schedule"],
          ["How PM is scheduled", "By month. Each asset lands in one of the twelve months of the year, and the year is balanced around a short February, summer vacations, and the holidays"],
          ["The flexibility window", "The Joint Commission allows 30 days either side of the scheduled date for annual scheduled maintenance, which is what makes the plan workable"],
          ["PM completion rate", "Completed / due x 100. Monitor it daily, not at month end, because at month end it is too late to fix"],
          ["The compliance report", "Completion rate by month and by department, the list of misses, the reason for each, and the date each was completed"],
          ["Documenting a missed PM", "Name the asset, why it was missed, where the device was, what the clinical risk was, and when it was finished. A missed PM with a documented reason is a finding you can answer"],
          ["What a surveyor asks for", "The inventory, the plan, the completion rate, the misses and their explanations, the critical equipment list, which assets sit in an alternative program, and the evidence behind putting them there"]
        ] },
        { type: "table", cols: ["Metric the department reports", "How it is read"], rows: [
          ["PM completion rate", "Completed / due x 100. The number a surveyor asks for first and the one administration understands"],
          ["Repeat repairs", "Repairs that come back within 30 days of the first one. A falling count means the fixes are holding; a rising one points at a bad device, a bad part, or a technician who needs training"],
          ["Mean time to repair", "MTTR is the average hands-on repair time. It measures the technician and the parts supply"],
          ["Total time to repair", "The clock the clinician feels: from the call to return to service, including waiting for parts, vendors, and access. Always longer than MTTR, and the one to report"],
          ["Uptime", "The share of time a device was available for use. Report it on critical devices, where downtime cancels cases"],
          ["Customer satisfaction", "A periodic survey of contactability, response speed, completion, technical competence, communication, and overall effectiveness, kept unchanged so results compare across years"],
          ["Cost of service ratio", "COSR by hospital, department, modality, equipment type, and manufacturer. The drill-down is where the savings are found"],
          ["Labor hours per device", "Total documented hours divided by assets supported. Useful inside one hospital and dangerous as a comparison between hospitals"],
          ["Overtime", "Hours and dollars. Sustained overtime is a staffing request waiting to be written"],
          ["Backlog", "Open work orders and overdue scheduled maintenance, with age. A growing backlog is the earliest honest warning"],
          ["Which KPIs leadership sees", "A short monthly set: completion rate, backlog, total time to repair, satisfaction, and cost. Pick the KPI set once and keep reporting the same one"]
        ] },
        { type: "table", cols: ["Staffing question", "How to answer it"], rows: [
          ["Devices per technician", "Historically one technician per roughly 1,200 to 2,000 inventoried items. It ignores complexity, contracts, and how the inventory was counted"],
          ["Hours per device", "Build the workload from the bottom up: scheduled hours per model times quantity, plus historical unscheduled hours, plus travel"],
          ["Workload by risk", "Life-support and critical devices need more hours per unit than support equipment. Weight the count, do not just take it"],
          ["Full-time equivalent", "One FTE is one full-time position of roughly 2,080 paid hours a year. Express partial coverage in tenths"],
          ["A worked case", "A system leaves warranty. The quoted contract is $60,000 a year; a junior technician costs less than that. The new position absorbs 0.4 FTE of the system and returns 0.6 FTE to the maintenance schedule"],
          ["Scheduling", "Cover the hours clinicians work, not the hours the shop prefers. A second shift beats overtime when the volume is steady"],
          ["On-call", "A written rotation, a defined response time, documented pay, and a rule about who may be called and for what"]
        ] },
        { type: "list", title: "Resources the department has to keep current", cols: 2, items: [
          "PPE and the training to use it: gloves, eye protection, hearing protection, lockout devices, and whatever the hazard assessment for each area requires",
          "Hand tools and specialty tools per equipment type, accounted for and replaced when worn",
          "Test equipment: safety analyzers, simulators, meters, and gas and flow analyzers matched to the inventory",
          "Calibration of test equipment on a schedule, traceable to the national standards kept by NIST, with certificates on file",
          "Supplies and PM kits ordered before the month they are needed, so work is not held waiting on parts",
          "Technical information: service manuals, operator manuals, software, passwords, and updates, obtained in writing at purchase",
          "Training: model-specific schools, refreshers, and the competency records that prove them"
        ] },
        { type: "list", title: "Data management the department owns", cols: 2, items: [
          "Backups of the CMMS and of device configurations, on a schedule, stored away from the machine they protect",
          "Restore tests, performed and documented, because a backup nobody has restored is a hope and not a plan",
          "Security of the CMMS: named accounts, role-based rights, and removal of accounts when people leave",
          "Patching on the manufacturer's validated schedule, recorded against the asset",
          "Updates and software versions tracked in the inventory, so a recall or a vulnerability can be matched to real devices"
        ] },
        { type: "table", cols: ["Alternative equipment maintenance question", "The answer"], rows: [
          ["What an AEM program is", "A program that changes how often maintenance, inspection, and testing happen and what they include, away from the manufacturer's recommendations, on the strength of a risk assessment by qualified personnel"],
          ["What CMS allows", "The change itself, where no other federal or state law and no condition of participation requires the manufacturer's schedule"],
          ["What may NOT be included", "Imaging and radiologic equipment, whether diagnostic or therapeutic; medical laser devices; and new equipment without enough maintenance history to support a risk-based decision"],
          ["New equipment", "Maintained to the manufacturer's recommendations until there is enough history, from the hospital, its contractor, or nationally recognized sources, to support a change"],
          ["Who may make the decision", "Qualified personnel, hospital employees or contractors. The hospital must be able to show how it assures that contractors use qualified people"],
          ["Evidence required", "The equipment's function and the consequences of failure, how serious the likely harm is, likelihood of failure, maintenance requirements, availability of alternative or backup devices, and documented incident history of identical or very similar equipment"],
          ["Documentation", "Written policies and procedures, the risk methodology, the evidence held per equipment type, and the activities and frequencies chosen"],
          ["Adherence", "A hospital must follow the alternative activities and frequencies it set, strictly. An AEM program is not permission to improvise"],
          ["Identification", "Equipment in the program must be readily identifiable as such, and so must critical equipment. Surveyors focus on the critical equipment inside the program"]
        ] }
      ]
    },
    {
      id: "policy", title: "Policy, regulators, and accreditation",
      blocks: [
        { type: "table", cols: ["Medical equipment management plan section", "What it must say"], rows: [
          ["Scope", "Which equipment and which locations the plan covers, and who maintains what between HTM, clinical staff, contractors, and manufacturers"],
          ["Inventory criteria", "What gets an asset number, what is grouped, what is excluded, and how leased, rented, loaned, and patient-owned equipment is handled"],
          ["Risk and maintenance strategies", "How risk is scored, which strategies exist, and how each equipment type is assigned to one"],
          ["Scheduled maintenance and inspection", "Intervals, procedures, who performs them, and the flexibility window the plan uses"],
          ["Incident response", "How a device involved in an event is secured, investigated, reported, and released"],
          ["Recalls and advisories", "Who receives notices, how affected assets are found, and how actions are documented and closed"],
          ["Emergency procedures", "Clinical downtime procedures, utility failures, and how staff get a replacement device"],
          ["Training", "Who trains HTM staff, who trains operators, and how competency is assessed and recorded"],
          ["Performance monitoring", "The metrics the plan reports, to whom, and how often"],
          ["Annual evaluation", "A yearly review of the plan's scope, objectives, performance, and effectiveness, with the findings reported to the committee"],
          ["Compliance statement", "The plan must stand up against federal, state, and local requirements, be specific enough to show how each equipment type is maintained, and reference the organization's other policies rather than repeat them"]
        ] },
        { type: "list", title: "The policy library a department needs", cols: 2, items: [
          "A copy of the organization's MEMP, with the department's own procedures written to support it rather than contradict it",
          "Inventory procedures: what is inventoried, incoming inspection of new equipment, and removal from inventory",
          "Scheduled maintenance: assigning procedures, the risk-based or alternative strategy, frequencies, responsibility, and workload balancing",
          "Work order documentation, including scheduled, unscheduled, use error, and non-HTM work",
          "Repair parts, purchase orders, service contracts, and the escalation policy",
          "Safety: electrical, radiological, biological, and OSHA requirements, plus infection control for devices",
          "Information security and patient privacy, telemetry and wireless spectrum management, and coordination with IT",
          "The environment of care manual: the organization's binder of plans, which holds the MEMP beside safety, security, hazardous materials, fire, and utilities",
          "SOPs are living documents. They are updated as scope changes, used to orient new staff, and referenced in daily work rather than filed and forgotten"
        ] },
        { type: "table", cols: ["Committee", "What HTM brings to it"], rows: [
          ["Environment of care committee (EOC)", "Equipment inventory and completion rates, incidents and recalls, the annual plan evaluation, and utility and construction impacts"],
          ["Patient safety", "Device-related events and near misses, use error trends, alarm issues, and the actions taken"],
          ["Risk management", "Incident investigation reports, device holds, exposure from pending claims, and reportable events"],
          ["Performance improvement", "Metrics with targets and trends, improvement projects, and the results of corrective actions"],
          ["Radiation safety", "Imaging and therapy equipment performance, service records, survey results, and the radiation-producing device inventory"],
          ["Infection control", "Device cleaning and disinfection between patients and before service, water systems, sterilizers, and loaner handling"],
          ["How to report to any of them", "A short written report with the number, the trend, what caused it, what is being done, and what you need from the committee"]
        ] },
        { type: "table", cols: ["Regulator or body", "What it controls"], rows: [
          ["CMS", "The Centers for Medicare and Medicaid Services pays for most hospital care and sets the conditions of participation a hospital must meet to be paid"],
          ["Conditions of participation", "The federal requirements behind hospital surveys. Several CoPs reach equipment maintenance and documentation directly"],
          ["Deemed status", "CMS lets approved accrediting organizations survey on its behalf, so a hospital accredited by one of them is deemed to meet the conditions"],
          ["The Joint Commission (TJC)", "The most common hospital accreditor, with standards for the equipment management plan, maintenance intervals, and competency assessment"],
          ["DNV", "An accrediting organization for hospitals whose program integrates a quality management system with the CMS requirements"],
          ["AABB", "Accredits blood banks and transfusion services, with equipment testing requirements often stricter than the manufacturer's"],
          ["CAP and CLIA", "CAP accredits laboratories against detailed checklists; CLIA is the federal program through which CMS regulates clinical laboratory testing"],
          ["FDA", "Regulates medical devices: clearance for market, manufacturing and performance, medical device reporting, and recalls"],
          ["CDRH", "The FDA center responsible for devices and radiation-emitting products, including mandatory performance standards and recall authority"],
          ["FCC", "Licenses and manages the radio spectrum, including the Wireless Medical Telemetry Service bands hospitals use for patient telemetry"],
          ["NRC", "Licenses and inspects the use of radioactive materials, including nuclear medicine, and enforces its requirements"],
          ["OSHA", "Requires the employer to keep the workplace safe and healthful, with hazard communication, PPE, lockout, and electrical safety rules"],
          ["HIPAA", "Protects the privacy and security of identifiable health information, by rules on privacy and on administrative, physical, and technical safeguards. It reaches every device that stores or sends patient data"],
          ["State agencies", "The state health department and licensing bodies, plus the state's adopted building, fire, and electrical codes. State rules can be stricter than federal ones"],
          ["NFPA", "Publishes consensus codes that become law only where a state adopts them. NFPA 99 is the health care facilities code and NFPA 70 is the electrical code"],
          ["IEC", "International standards used throughout the field, including the 60601 series for medical electrical equipment and the 80001 series for risk management of networks carrying devices"],
          ["ECRI", "An independent nonprofit that tests devices, publishes hazard and recall alerts, and maintains the nomenclature many inventories use"]
        ] },
        { type: "list", title: "Surviving a survey", cols: 2, items: [
          "Prepare the evidence in advance and keep it current year-round: inventory, plan, completion rates, the misses with explanations, competency records, the critical equipment list, and the alternative program with its evidence",
          "Host the surveyor yourself: answer the question asked, show the record, and let the record speak. Do not speculate and do not volunteer problems you have not fixed",
          "Expect tracers: a surveyor picks a device in a unit and follows it through the inventory, the schedule, the history, and the competency of whoever serviced it",
          "Answer a finding with a corrective action plan: what was wrong, the root cause, the action, the owner, the completion date, and how you will show it held"
        ] }
      ]
    },
    {
      id: "projects", title: "Projects, capital planning, and stakeholders",
      blocks: [
        { type: "table", cols: ["Capital request element", "What HTM supplies"], rows: [
          ["The request itself", "What is being bought, how many, for whom, and when it is needed, in the hospital's capital request format"],
          ["Clinical need", "The clinical problem the device solves, stated by the department that will use it, with the consequence of not funding it"],
          ["Feasibility", "Whether the hospital can actually run and service it: staff, skills, parts, and vendor presence"],
          ["Space", "Footprint, clearances, doorways and elevator access, and the room it displaces"],
          ["Site preparation", "Construction, shielding, floor loading, ventilation, water, gases, drains, and who pays for them"],
          ["Power", "Load, receptacle type, emergency versus normal branch, and whether the device needs conditioned power or a UPS"],
          ["Network", "Addresses, ports, segment, bandwidth, interfaces to the record, and the agreement with IT in writing"],
          ["Total cost of ownership", "Purchase plus installation plus service plus parts plus training plus disposal over the life, not the quoted price"],
          ["Service strategy", "In-house, contract, or time and materials, priced for the life of the device, with the training and test equipment each option needs"],
          ["Standardization", "Whether this matches models already owned, and what a new model adds in training, parts, and procedures"],
          ["Cybersecurity", "The MDS2, the operating system and how long it is supported, the patching method, authentication, and encryption"],
          ["The recommendation", "One clear recommendation with the options compared against it, so the committee decides rather than deliberates"]
        ] },
        { type: "list", title: "Can the hospital sustain this device", cols: 2, items: [
          "Parts: are they sold to equipment owners, at what price, and for how many years",
          "Training: is service training available to the hospital at all, where, how long, and at what cost",
          "Service manuals, software, passwords, and diagnostic access, confirmed in writing before the order",
          "Life expectancy: how long the model is expected to serve and when the manufacturer plans to end support",
          "MAUDE history: what other facilities have already reported about this model",
          "Operating system life expectancy, and what happens to the device when that support ends"
        ] },
        { type: "table", cols: ["Project stage", "What the manager produces"], rows: [
          ["Charter", "The scope, the objective, the sponsor, the budget, the deadline, and what is explicitly out of scope"],
          ["Plan", "Tasks, owners, dependencies, and the decisions that must be made before work starts"],
          ["Schedule", "Dates with the long-lead items identified: construction, shielding, network drops, and delivery windows"],
          ["Budget", "Capital and operating lines, with site preparation and training named rather than assumed"],
          ["Stakeholders", "Everyone who must be consulted or informed, named, with what each needs and when"],
          ["Risks", "What could delay or break the project, how likely it is, and the mitigation, reviewed as the project moves"],
          ["Communication", "Who reports what to whom on what day, agreed at the start so nobody learns about a change from the hallway"],
          ["Acceptance testing", "The incoming inspection and performance test the device must pass before the hospital accepts delivery and pays"],
          ["Sustainment plan", "Asset in the inventory, schedule assigned, parts stocked, service strategy live, training delivered, and support contacts recorded"],
          ["Close-out", "Final cost against budget, lessons learned, the old asset retired in the inventory, and the sponsor told it is done"]
        ] },
        { type: "table", cols: ["Lifecycle stage", "HTM's job in it"], rows: [
          ["Acquisition", "Bring the cost history, failure data, and support-withdrawal notices, then compare total cost of ownership, serviceability, standardization, security, and clinical fit, filtering out marketing claims"],
          ["Contracting", "Negotiate price, training, manuals, parts discounts, response times, and exclusions while there is still leverage"],
          ["Installation", "Coordinate site preparation, power, network, delivery, and the pre-acceptance inspection, then inspect, test, tag, record cost and ownership, and assign the maintenance schedule"],
          ["Training", "Deliver operator and service training before clinical use, record competency, and keep the materials where staff can find them"],
          ["Sustainment", "Scheduled and unscheduled maintenance, parts, recalls, upgrades, patching, and cost tracking, with cost per year and failure rate watched so the replacement is seen coming years out"],
          ["Disposal", "Wipe the data, remove it from the inventory, settle the book value, and document the method"]
        ] },
        { type: "list", title: "Construction, utilities, and change", cols: 2, items: [
          "Attend the planning and design meetings. Equipment decisions made in a drawing become construction costs nobody budgeted",
          "Read utility interruption notices as clinical events: which rooms, which devices, how long, and what runs on battery",
          "Publish the downtime procedures before the interruption and confirm the clinical units have them",
          "Use formal change management for network changes, patches, and configuration changes to clinical devices"
        ] },
        { type: "list", title: "Stakeholders and how to stay in front of them", cols: 2, items: [
          "Senior leadership: scheduled meetings and short written reports with the number, the trend, the cause, and the decision you need. Never a surprise",
          "Nursing: daily rounding in the units, a named contact, and visible follow-up on the thing they reported last week",
          "IT and informatics: joint ownership of networked devices, shared change windows, and an agreed incident path",
          "Facilities: power, water, gases, ventilation, and construction schedules that affect clinical equipment",
          "Materials management: purchase orders, receiving, consumables, and withholding payment when terms are not met",
          "Vendors: check-in and check-out, service reports within 24 hours, and a scorecard you can show them",
          "Technicians: shop meetings, daily huddles on the backlog, and a clear escalation path when they are blocked"
        ] }
      ]
    },
    {
      id: "education", title: "Education and training",
      blocks: [
        { type: "table", cols: ["Needs analysis input", "The question it answers"], rows: [
          ["Cost", "What the training costs in tuition, travel, lodging, and the weeks of productivity lost while the technician is away"],
          ["Return on investment", "What the hospital avoids in contract, vendor labor, and downtime once the technician is trained, accumulated across four, five, and six years"],
          ["Operations", "Which backlog, response time, or completion problem this training actually fixes"],
          ["Technical requirements", "What the equipment demands: proprietary software, calibration, service keys, or a certificate to open it legally"],
          ["Competency", "Which assessed gaps exist today, by person and by equipment type"],
          ["Customer requirements", "What the clinical departments have asked for, and what they will stop calling the vendor for once staff are trained"],
          ["Resources", "Whether the test equipment, tools, manuals, and parts access exist to use the training once it is delivered"],
          ["Asset inventory", "How many of the model the hospital owns, where they are, and whether the count justifies a trained technician at all"]
        ] },
        { type: "table", cols: ["Effectiveness measure", "What it should do after training"], rows: [
          ["Cost", "Vendor labor, contract spend, and parts cost for that equipment type should fall"],
          ["Failure rates", "Repeat repairs on the trained equipment should drop, because the fix is now the right fix"],
          ["Total time to repair", "The clinician's clock should shorten, because the first responder can finish the job"],
          ["Staff competencies", "Documented assessments move from gap to competent, recorded per person and per model"],
          ["Skill set", "More models covered in-house, with at least two people competent on every critical one"],
          ["User satisfaction", "Survey scores for technical competence and responsiveness should rise in the departments involved"]
        ] },
        { type: "table", cols: ["Training type", "What it is and how it is obtained"], rows: [
          ["Technical and model-specific", "Service-level training on one model. Start with the maker of the device, then price independent trainers, who are often cheaper and sometimes teach more"],
          ["Manufacturer-provided, negotiated", "Negotiate training into the purchase: seats, level, location, travel, and lodging, delivered inside the warranty period or the warranty extended until it is. After the sale there is no leverage left"],
          ["Safety", "Electrical safety, lockout, radiation and laser areas, hazard communication, lifting, and infection control for device handling"],
          ["Soft skills", "Customer service, written communication, conflict handling, and how to explain a technical answer to a clinician"],
          ["Regulatory and code compliance", "What the accreditor and the conditions of participation require, how records are kept, and what a surveyor asks"],
          ["Internal policy", "The department's own SOPs, the CMMS, documentation standards, escalation, and on-call rules"],
          ["Orientation", "A new technician gets a mentor, the SOP manual, the MEMP, supervised work, and a documented sign-off before working alone"],
          ["Certification", "Tie steps in the career ladder to a credential and pay for achieving it. Trained, certified staff stay with employers who value them"],
          ["Competency assessment", "Required by the accreditor. Test, self-assessment spot-checked by the manager, observed scheduled maintenance, or review of repeat repairs, documented either way"]
        ] },
        { type: "list", title: "Operator training: when HTM teaches clinicians", cols: 2, items: [
          "Failure trending: when a model generates work orders that are not failures, the training need is in the unit, not the shop",
          "Use error: identify it on the service call, code it, trend it by department, model, and shift, then take in-service education to the pattern on every shift",
          "New equipment: operator training before first clinical use, on every shift that will touch it, with attendance recorded",
          "New clinical applications: a new procedure on an old device is new training",
          "New staff and rotating students: a spike in use errors often follows an intake of residents or travelers",
          "Database management: record who was trained, on what, by whom, and when, because the accreditor will ask and the pattern tells you where to go next"
        ] },
        { type: "list", title: "Materials: what the department keeps and who keeps it current", cols: 2, items: [
          "Service manuals per model, obtained at purchase, kept where technicians can reach them on and off shift",
          "Operations manuals, including the copies the clinical units need, because a unit's lost manual becomes a service call",
          "Software, firmware images, service keys, and passwords, stored securely and retrievable when the one person who knew them leaves",
          "Training media: recordings, slides, job aids, and quick reference cards made after each school, so one seat teaches the whole shop",
          "A written purchase requirement that manuals, software, passwords, updates, and support are supplied for as long as the device stays in service, with payment withheld until they arrive",
          "One named owner for the library and a review date, so superseded versions come out and nobody works from an obsolete procedure"
        ] },
        { type: "list", title: "Partners who train with you", cols: 2, items: [
          "Infection prevention: cleaning and disinfection between patients, what HTM may handle, and how devices are decontaminated before service",
          "Facilities management: power, emergency branch, water, gases, ventilation, and who responds to what at two in the morning",
          "Materials management: purchase orders, receiving and incoming inspection, consumables, and vendor terms",
          "IT: addresses, segments, patching windows, interface failures, and the joint incident path"
        ] }
      ]
    },
    {
      id: "hr", title: "Human resources and labor law",
      blocks: [
        { type: "table", cols: ["Employee lifecycle stage", "What the manager produces"], rows: [
          ["Job description", "Duties, required education and experience, certification expectations, physical requirements, and the pay grade. Keep a full ladder of levels and steps: nobody can be promoted into a job that does not exist, and even a two-person department needs at least eight"],
          ["Selection", "Screening against the written description, the same interview questions for every candidate, reference and credential verification, and a documented reason for the choice"],
          ["Orientation", "A mentor, the SOP manual, the MEMP, the CMMS, safety training, and supervised work with a documented sign-off before solo assignments"],
          ["Evaluation", "The annual review, which should contain nothing the employee is hearing for the first time. Feedback is the manager's job all year"],
          ["Development plan", "What the employee wants to be able to do next, the training that gets them there, and the date it is reviewed"],
          ["Retention", "The direct manager is the biggest single factor in whether staff stay. Interesting work, involvement, feedback, training, and respect hold people"],
          ["Why turnover hurts", "Recruiting and training a replacement is estimated to exceed 1.5 times annual salary, before counting the clinical cost of equipment nobody can repair"],
          ["Performance improvement plan", "Specific deficiencies, specific expectations, specific dates, the support offered, and a clear statement that it is an opportunity rather than an automatic exit"],
          ["Termination", "The last step of a documented path, done with the human resources department present and with every prior conversation already on paper"]
        ] },
        { type: "table", cols: ["Performance and engagement topic", "What the manager does"], rows: [
          ["Compensation", "Know the local and national market for each grade, and get a real survey done rather than relying on self-reported numbers"],
          ["Organizational values", "Tie department goals to the hospital's stated priorities, so the request speaks the language the budget is written in"],
          ["Engagement", "Bring staff into goal setting. A plan the shop helped write gets implemented; a plan dropped on the shop gets resisted"],
          ["Goals", "Department goals covering financial performance, scheduled maintenance completion, customer satisfaction, response time, repeat repairs, and use errors, shared with everyone"],
          ["Coaching", "Continuous and specific, in the moment, with the behavior named and the better alternative shown"],
          ["Mentoring", "Pair a new technician with an experienced one, with time protected for it rather than assumed"],
          ["Recognition", "Financial incentives are hard to get in a hospital. Recognition and a real say in the department's direction often matter more to technicians"],
          ["What managers get wrong", "Managers rank salary, bonuses, vacation, retirement, and perks first. Employees rank interesting work, involvement in decisions, feedback, training, and respect first, with the money items last"],
          ["Conflict", "Address it early, with the people involved, on the facts, and document what was agreed"],
          ["Documenting improvement opportunities", "Write it down when it happens, in neutral language, with dates and specifics, so the record exists before you need it"],
          ["Recommendations to human resources", "Bring human resources in before you act, not after. They own the process, the consistency, and the legal exposure"]
        ] },
        { type: "table", cols: ["Staffing and pay item", "The number or the rule"], rows: [
          ["Staffing levels", "One technician per roughly 1,200 to 2,000 inventoried items as a first pass, refined by inventory value, equipment complexity, risk mix, number of sites, and travel"],
          ["Cost of a biomed", "Salary / 2,080 hours plus benefits plus supervision and unproductive time. Under $100,000 a year is under $50 an hour, about $72 an hour fully loaded, which is below any vendor rate and below most contract labor"],
          ["Incentives", "Pay differentials for certification, on-call, shift, and specialty skills, where the hospital's compensation policy allows"],
          ["Overtime and on-call pay", "Budgeted, tracked as its own line, and governed by a written rotation. Sustained overtime is cheaper to fix with a position than to keep paying"],
          ["Pay equity", "Whatever criteria the employer applies when it sets wages must be free of any influence from sex or race, and comparable work inside the department should be paid comparably. Review it regularly"],
          ["Certification as a differentiator", "Make certification a requirement at defined steps in the ladder and reward it. It is proof of competence and a retention tool, not a resignation risk"]
        ] },
        { type: "table", cols: ["Law or agency", "What a manager must not get wrong"], rows: [
          ["ADA", "The Americans with Disabilities Act prohibits discrimination against people with disabilities and requires reasonable accommodation. A disability is a physical or mental impairment that substantially limits a major life activity, a record of one, or being regarded as having one"],
          ["EEOC", "The Equal Employment Opportunity Commission enforces the federal bans on discrimination by race, color, religion, sex including pregnancy, gender identity, and sexual orientation, national origin, age of 40 or older, disability, and genetic information"],
          ["EEOC coverage", "The rules reach most employers of 15 or more people, and 20 or more in age discrimination cases. Retaliation against someone who complains or takes part in an investigation is itself illegal"],
          ["FMLA", "The Family and Medical Leave Act gives eligible employees 12 workweeks of unpaid, job-protected leave in a 12-month period for a birth, an adoption or foster placement, a serious health condition of the employee or a spouse, child, or parent, or a qualifying military exigency, with group health coverage continued"],
          ["FMLA military caregiver leave", "Up to 26 workweeks in a single 12-month period to care for a covered servicemember with a serious injury or illness"],
          ["NLRA", "The National Labor Relations Act protects employees' rights to organize, to bargain collectively, and to engage in concerted activity about terms and conditions of employment, whether or not a union is present"],
          ["OSHA", "The employer owes every worker a workplace that is safe and healthful. For HTM that means hazard assessment, PPE, electrical safety, lockout and tagout, hazard communication, and the right to report hazards without retaliation"],
          ["Hearings and investigations", "Human resources present, the facts gathered the same way every time, comparable cases treated comparably, and contemporaneous documentation. The same rule applied the same way to every employee is what keeps the hospital out of court"]
        ] },
        { type: "note", text: "Facilitating change: explain why before what, involve the people who will do the work, train them before the switch, measure what happened, then recognize the staff who made it work. A change explained is implemented; a change announced is resisted." }
      ]
    }
  ]
};
