// CHTM Academy curriculum, units 1 to 3. Original teaching content for the AAMI/ACI CHTM exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Financial Management", domain: 1,
  blurb: "How hospital money is organized, how the HTM budget is built and defended, and how a manager reads the statements.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "How Hospital Money Is Organized: Operating and Capital Budgets, Cost Centers, the Fiscal Year", domain: 1, obj: "FIN-B", minutes: 9,
      body: `A budget packet lands on your desk with a return date three weeks out. It has two sections you must fill in, it is addressed to a number rather than to your department's name, and it asks for next year rather than this one. Before you can fill in a single line you have to know which pot of money each request belongs in, whose signature releases it, and which twelve months you are being asked about.

## Operating money and capital money are different money
The **operating budget** is the coming year's running expenses, plus any revenue the department earns. Labor, parts, service contracts, outside labor, calibration, small tools, supplies, travel, memberships, and education all live here. An operating dollar is spent and gone inside the year.

The **capital budget** is for items with a long useful life whose price clears the hospital's capitalization threshold: a monitoring system, a large analyzer, a shop expansion, major test equipment. A capital item is not charged against this year at full price. It is recorded as an asset and depreciated across its useful life, so your operating budget feels only the depreciation and the service that follows it. Capital requests compete against every other capital request in the hospital, which is why they need the clinical case attached.

## Who approves what
\`\`\`
Request                      Approved by                                  Why
Operating budget             your own chain of command plus finance       it is this year's spending
Capital request              the capital or technology committee and      capital money is rationed
                             senior leadership                            across the whole hospital
A purchase inside budget     the manager, up to a policy dollar limit     the money is already approved
A purchase over the limit    the next level and purchasing                a second signature on size
An unbudgeted repair         finance, by exception, in writing            it has to come from somewhere
\`\`\`

## The fiscal year and the cycle
The hospital's **fiscal year** is its twelve-month accounting year, and it often does not start in January. Know which year a request is aimed at before you write it. Budgets are typically built three to six months before the fiscal year starts, and the cycle repeats: request, review and negotiation, approval, then monthly reports against the approved plan for the rest of the year.

## Cost centers and where HTM money comes from
A **cost center** is the numbered account a department's costs post to, and the HTM department is one of them. Every work order, part, and contract payment should trace to a cost center, because that is the only way cost can be allocated back to the department that owns the device. Your funding arrives three ways: the department's own budget, the service contracts the department manages on other departments' behalf, and chargebacks that bill a clinical cost center for parts or labor spent on its equipment.

## Distributed versus consolidated budgeting
Under **distributed budgeting** HTM holds only shop costs, and contracts, parts, and outside labor stay with whichever clinical cost center owns the device. Nobody can then see the total cost of maintaining a device, and nobody with the vendor's invoice in hand has the technical standing to hold that vendor to its terms. Under **consolidated budgeting** every equipment dollar moves under the HTM cost center and is allocated back to the clinical cost centers from CMMS reports. That is the stronger model, because the department that pays the invoice can withhold payment until the service report arrives. Consolidation only holds together with a written fiscal agreement among HTM, the clinical departments, and the chief financial officer on priorities and on how a repair that exceeds the budget still gets done.

> Exam tip: expense this year means operating; long-lived and above the threshold means capital. Operating goes up your chain with finance, capital goes to the capital committee. Consolidated budgeting gives the manager control and visibility; distributed budgeting takes both away.`,
      hook: "Operating money is this year's expenses and capital money buys long-lived assets that get depreciated, each approved by a different body, all of it posted to a cost center inside a fiscal year that may not be the calendar year."
    },
    {
      id: "u1l2", title: "The HTM General Ledger: Supplies, Payroll, Parts, Consumables, Contracts, Training", domain: 1, obj: "FIN-B", minutes: 9,
      body: `A cost accountant emails you a spreadsheet of your department's spending and asks you to explain three lines. The lines are not named "parts" and "training". They are six-digit account numbers with abbreviations you have never used. This is the general ledger, and until you can read it you cannot defend a single number in your budget.

## What the general ledger is
The **general ledger** is the hospital's complete record of financial transactions, organized by account. The list of those accounts is the chart of accounts, and it is the hospital's list, not yours. Your budget is reviewed, reported, and questioned in those account numbers. If you track spending in categories you invented, every conversation with finance starts with a translation argument you will lose.

## The accounts an HTM department manages
\`\`\`
What you spend on                        Where it posts
technician and supervisor wages          salaries and wages
benefits                                 employee benefits, usually a rate on salary
overtime and on-call pay                 salaries, tracked as its own line
repair parts bought by HTM               maintenance and repairs
service contracts and vendor labor       purchased maintenance and repair
shop consumables and small supplies      office supplies or medical and surgical
                                         inventory, by what the item is
test equipment calibration               maintenance and repairs, or a calibration
                                         line where the hospital keeps one
training tuition, travel, lodging        travel and education
software licenses and support            purchased services or software maintenance
a replacement monitoring system          capital, not operating
\`\`\`
Training is an expense rather than capital, because knowledge cannot be depreciated. A system purchase is capital and reaches your operating budget only later, as depreciation and as the service that follows it.

## Coding a purchase to the right account
Coding is the act of deciding which account number and which cost center a purchase posts to, and it happens when the requisition is written, not at year end. Two habits keep it honest: the account comes from the chart of accounts, and the cost center comes from the asset record of the device the money was spent on.

## Encumbrances and accruals in plain words
An **encumbrance** is money set aside the moment you commit to spend it. The purchase order is raised, the funds are reserved against your budget, and the balance available to you drops even though no invoice has arrived. An **accrual** records an expense in the month the work or the delivery happened rather than the month the payment cleared. Hospitals budget on an accrual basis, so a part received in June is June's expense even if the invoice is paid in August. Both exist so that your available balance and your reported spending tell the truth about commitments you have already made.

## Why miscoded parts hide the real cost of a device
Post a pump part to a generic supplies account and three reports go wrong at once. The device's own cost history understates what it really costs to keep, so the replacement decision is made on a false number. The clinical cost center is never charged, so nursing believes its equipment is free. And the cost of service ratio for that model cannot be calculated at all, which removes the one number that would have proved a contract was overpriced. Reading the ledger detail line by line each month, with the work orders beside it, is how a manager catches that before it becomes a year of bad data.

> Exam tip: budget and report in the hospital's account numbers. Parts and in-house repair post to maintenance and repairs; contracts and vendor labor post to purchased maintenance; training posts to travel and education and is never capital. An encumbrance reserves committed money; an accrual books the expense in the month it was incurred.`,
      hook: "The general ledger is the hospital's account structure, and a manager who codes every part, contract, and class to the right account and cost center keeps the cost history that later justifies a replacement."
    },
    {
      id: "u1l3", title: "Budget Reports and Variance: Reading the Monthly Report and Explaining the Gap", domain: 1, obj: "FIN-B", minutes: 10,
      body: `On the eighth working day of the month a report appears in your inbox with your cost center at the top. One line is highlighted. Finance wants a written explanation by Friday. This happens every month of your career, and the manager who can read the report and write the explanation in ten minutes is the manager whose budget requests get believed.

## What the monthly budget report holds
Five columns, repeated twice: once for the month and once for the year to date.
\`\`\`
Account                 Budget     Actual     Variance   Percent
Salaries                 48,000     51,600      (3,600)   (7.5)
Maintenance and repairs  12,000      8,400       3,600     30.0
Purchased maintenance    30,000     30,000           0      0.0
Travel and education      2,000      5,400      (3,400)  (170.0)
Supplies                  1,500      1,350         150     10.0
Total                    93,500     96,750      (3,250)    (3.5)
\`\`\`
Brackets are the hospital's way of writing a negative, and on an expense line a negative variance means you spent more than you were given.

## The arithmetic
Variance = actual minus budget. Variance percent = variance / budget x 100. On the salaries line above, 51,600 minus 48,000 is a 3,600 overspend, and 3,600 / 48,000 x 100 is 7.5 percent. Accounting usually asks for a written explanation once a month lands 5 or 10 percent off its budget, so know your hospital's trigger.

## Favorable and unfavorable
For an expense, under budget is **favorable** and over budget is **unfavorable**. For revenue it is the other way round: more revenue than planned is favorable. Over-expenditure is what draws attention, but a large favorable variance is also a question, because it usually means work did not happen.

## Timing variances and real variances
A **timing variance** is a gap that will close by itself. The contract invoice was due in March and arrived in April, so March looks favorable and April looks terrible, while the year to date is exactly on plan. A **real variance** does not close: a new position filled early, a part price increase, a vendor rate change, a device failing more often than budgeted. Check the year-to-date column before you write anything, because it separates the two for you. Seasonality and one-time events belong in the same reading: scheduled maintenance clusters in some months, and a single large repair can own a month on its own.

## Writing the explanation leadership expects
Three sentences, in one order every time: what, why, and what you will do.
- **What:** travel and education is 3,400 unfavorable for the month and 1,100 unfavorable year to date.
- **Why:** two technicians attended the school negotiated into the purchase of the new system, which was scheduled this month rather than spread across the year.
- **What you will do:** no further school spending is planned before the fourth quarter, so the line returns to plan by year end; the alternative was vendor labor at a higher rate.
Never explain a variance with the word "overspent" and nothing else, and never promise a recovery you cannot show in the numbers.

## Forecasting the year end
Divide the year-to-date actual by the months elapsed to get a monthly run rate, multiply by twelve, then adjust for what you know is coming: a contract renewal with an escalation, a vacancy you expect to fill, an irregular part due on its interval. A forecast you carry to leadership in month six is a request for help; the same number discovered in month twelve is a failure.

> Exam tip: variance is actual minus budget, and percent is variance divided by budget. On expenses, under is favorable and over is unfavorable. Check year to date before calling a variance real, and write every explanation as what, why, and what you will do.`,
      hook: "Variance is actual minus budget and its percent is variance over budget, read against the year to date so a timing gap is never mistaken for a real one, then explained as what, why, and what you will do."
    },
    {
      id: "u1l4", title: "Financial Statements: Balance Sheet, Income Statement, Depreciation, GAAP, Accounts Payable and Receivable", domain: 1, obj: "FIN-B", minutes: 10,
      body: `You are invited to a leadership meeting where the finance officer walks through the hospital's statements before the capital list is discussed. Nobody will explain the terms to you. Your ten-million-dollar inventory is sitting inside one of those statements, and the way it is carried there decides how your replacement request is heard.

## The two statements a manager must recognize
\`\`\`
Statement            Covers            Lines                            Where equipment shows up
Balance sheet        one day           assets, liabilities, equity      an asset, at book value
Income statement     a period          revenue, expenses, net income    depreciation and service
                                                                        expense
\`\`\`
The **balance sheet** is a snapshot on a single date, and it balances: assets equal liabilities plus owner's equity. Your equipment sits on the asset side at its book value. The **income statement**, also called the profit and loss statement, covers a period of a month, a quarter, or a full year: revenue minus expenses equals net income. Your department touches it through salaries, parts, contracts, and the depreciation of the assets you asked for.

Cash flow deserves one paragraph. The **cash flow statement** tracks money in and money out over a period, split into operating, investing, and financing. It exists because reported profit is not money in the bank. A hospital can show net income and still have no cash this quarter for your capital item, and that is a real answer rather than an excuse.

## Depreciation, and why a fully depreciated device still runs
Depreciation spreads a capital item's cost across its useful life. Straight-line is the common method: (cost minus salvage value) / useful life, per year. A $1,000,000 system over a ten-year useful life with no salvage depreciates $100,000 a year. **Book value** = cost minus accumulated depreciation, so after three years that system is carried at $700,000.

Here is the trap. Book value is an accounting position, not a condition report. A device that is fully depreciated has a book value of zero and may still be accurate, safe, supported, and years from replacement. Another device may be half depreciated and already unsupportable. Replacement is argued on support, failure trend, parts availability, and clinical need, never on the depreciation schedule alone. The schedule matters in one direction only: disposing of an asset still being depreciated writes off the remaining book value, which is a hit finance must agree to in advance.

## GAAP and why the department follows it
**GAAP** stands for generally accepted accounting principles: the standards, conventions, and rules accountants follow when they record transactions and prepare statements. A manager does not apply GAAP personally, but a manager lives inside it. It is why a part cannot be expensed in a convenient month, why capital and expense are not interchangeable, and why the auditor can ask to see the receiving document behind a number. Consistent rules are what make one year comparable with the next.

## Payables, receivables, and business activity reports
**Accounts payable** is what the hospital owes its vendors, and your unpaid service invoices and parts orders sit there. Your part in it is real: you approve the invoice, confirm the work was done and documented, and withhold approval when the service report never arrived. **Accounts receivable** is what the hospital is owed, and it holds the revenue from any service your department sells outside, plus the chargebacks billed to clinical cost centers. A **business activity report** is the periodic summary of what the department did and what it cost, written for leadership: volumes, labor, cost by category, and the trend. It is how a non-financial department shows its work in financial language.

> Exam tip: balance sheet is one day and holds assets, liabilities, and equity; income statement is a period and holds revenue, expenses, and net. Straight-line depreciation is (cost minus salvage) / useful life, and book value is cost minus accumulated depreciation. Payable is what the hospital owes; receivable is what it is owed. Fully depreciated never means unusable.`,
      hook: "The balance sheet is a one-day snapshot of assets, liabilities, and equity, the income statement is a period of revenue, expenses, and net, and a device's book value is an accounting number that says nothing about its remaining useful life."
    },
    {
      id: "u1l5", title: "Business Justification and Return on Investment: ROI, Payback Period, Total Cost of Ownership", domain: 1, obj: "FIN-A", minutes: 10,
      body: `A vendor contract on your imaging system renews in four months at $180,000 a year. You believe two trained technicians and a parts budget could do most of that work for less. Nobody will take your word for it. What gets funded is a business justification with the numbers inside it, and what gets rejected is the same idea described in a hallway.

## The business justification document
Written in one order and never another.
1. **The problem,** in the hospital's terms: cost, downtime, risk, or a regulatory exposure, with the number attached.
2. **The options,** including doing nothing, each described well enough to be chosen.
3. **The costs** of each option across the same number of years.
4. **The benefits,** separated into dollars you can defend and benefits you cannot price.
5. **The risks** of the option you are recommending, and how each is handled.
6. **The recommendation,** one option, stated plainly, with what happens if nothing is funded.

## Return on investment, worked
ROI = (gain minus cost) / cost x 100. Take the real case: a $25,000 training program and tool package that lets your staff absorb work you now buy, avoiding $90,000 of contract cost in the first year.
\`\`\`
Gain avoided                              $90,000
Cost of the investment                    $25,000
Gain minus cost                           $65,000
Divide by cost            65,000 / 25,000       2.6
Times 100                                   260%
\`\`\`
An ROI of 260 percent says each dollar invested returned itself and $1.60 besides, inside the year. Positive is the pass mark; what gets funded is the highest return among competing requests.

## Payback period, worked
Payback = cost / annual savings, in years. A $100,000 project that saves $20,000 a year pays back in five years. Shorter is better, and finance usually has an unwritten ceiling, so ask what it is before you write the memo. Payback and ROI answer different questions: ROI asks how much the investment returns, payback asks how long the hospital's money is at risk.

## Total cost of ownership
**TCO** is every dollar a device costs from purchase to disposal: purchase price plus installation and site preparation, service and parts across the life, training, software and licensing, consumables, and disposal. Compare TCO, never sticker price. A system that is $40,000 cheaper to buy and $25,000 a year more expensive to maintain loses on a ten-year TCO by a margin no purchase discount recovers. State the number of years in the comparison, because an unstated horizon is how a bad option wins.

## Soft benefits, stated so they count
Uptime, patient safety, faster response, clinician satisfaction, and staff retention are real and resist pricing. Do not hide them and do not inflate them. State each as a measurable change with a baseline: response time on this equipment type falls from the current measured figure, repeat repairs fall, satisfaction scores on the departments served rise, with the dates you will report them. A soft benefit with a measurement attached survives the meeting. One stated as "better service" does not.

> Exam tip: ROI = (gain minus cost) / cost x 100, payback = cost / annual savings, and TCO is the whole life, not the purchase. The justification runs problem, options, costs, benefits, risks, recommendation, and always says what happens if nothing is funded.`,
      hook: "A funded request is a written justification that runs problem, options, costs, benefits, risks, and recommendation, with ROI as gain minus cost over cost times 100, payback as cost over annual savings, and total cost of ownership rather than the sticker price."
    },
    {
      id: "u1l6", title: "Analyzing Past, Present, and Expected Operations: Trends, Forecasts, Development Opportunities", domain: 1, obj: "FIN-A", minutes: 9,
      body: `Your director asks a question with no obvious answer: where is this department going, and what should we be doing differently next year? Nothing in the CMMS answers that directly. What answers it is an analysis you build yourself from the data you already own, and the manager who brings one has set the agenda before anyone else has spoken.

## Three tenses, one method
Look at the past to find what actually happened, the present to find what is happening now, and the expected to state where today's trend lands. The raw material is already in your records: service history by asset and model, labor hours, parts and contract spend, work order volume, completion rates, downtime, and the inventory with its ages and support dates.

## What the analysis is looking for
Two groups of findings come out of it. Development opportunities are the things worth doing: contracts to insource, devices to standardize, training that pays back. Areas needing improvement are the things going wrong, and the usual three are repeat repairs, overdue preventive maintenance, and overtime.
\`\`\`
Signal in the data                      Development opportunity it points to
one vendor contract far above the       insource the work, or renegotiate with the
department's cost of service ratio      department's own cost data in hand
six models doing one clinical job       standardize at the next replacement cycle
a model your staff cannot open          negotiate training and manuals, or change
                                        the service strategy on that model

Signal in the data                      Area needing improvement
the same asset repaired three times     a bad device, a bad part, or a training gap
in thirty days                          in the shop
overdue scheduled maintenance rising    workload, staffing, or a scheduling plan that
                                        never matched the inventory
sustained overtime                      a staffing request waiting to be written
use error climbing on one unit          operator training on every shift, not a repair
\`\`\`

## Trend analysis and simple forecasting
A trend needs at least three comparable periods and a constant definition. Count the same thing the same way each month, or you will report a definition change as an improvement. To forecast, take the run rate from the periods you have, project it forward, then adjust for what you know: a contract escalation, a vacancy, equipment arriving, an irregular part due on its interval. Say which assumptions you used. A forecast whose assumptions are visible can be argued with, and that is what makes it useful.

## Benchmarking, carefully
Comparing against similar departments is informative and easy to misuse. Cost of service ratio compares reasonably well because it is a ratio of two numbers both hospitals have. Devices per technician and labor hours per device compare badly, because every hospital counts its inventory differently, carries a different contract mix, and supports a different number of sites. Use an outside benchmark to raise a question, then answer the question with your own drill-down by department, modality, equipment type, and manufacturer. Your own history over three years is the most honest benchmark you have.

## Presenting it to leadership
Leadership reads cost, risk, and capacity. One page: the number, the trend, the cause, the recommendation, and what you need from them. Put the ratio and the dollar figure in the first two lines, name the clinical consequence, and attach the detail behind the summary rather than in front of it. Bring the same metrics every time so the comparison is the message, and never present an analysis without a recommendation attached.

> Exam tip: the analysis comes from the department's own service history, cost, and workload data. Three comparable periods make a trend, assumptions must be stated with a forecast, and cost of service ratio benchmarks better across hospitals than devices per technician. Always carry a recommendation, not just a chart.`,
      hook: "Service history, cost, and workload data read across past, present, and expected operations is what turns a CMMS into a one-page recommendation leadership can act on."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Procurement, Contracts, and the Asset Lifecycle", domain: 1,
  blurb: "How a manager plans replacement, evaluates contracts, sources parts and service, and advises on value.",
  assumes: "Unit 1. You can read a variance report and work an ROI and a payback period.",
  lessons: [
    {
      id: "u2l1", title: "Life Expectancy and Capital Replacement Planning", domain: 1, obj: "FIN-C", minutes: 10,
      body: `Finance asks every manager for a five-year capital forecast. Clinical departments bring you a list of what they want. Neither list is a replacement plan. The plan is yours to build, and the only person in the hospital who knows which devices are running out of life is the person holding the service history.

## How useful life is actually set
Six inputs, not one.
- **Manufacturer guidance:** what the maker says the model is designed to serve.
- **Industry useful-life schedules:** the published average life expectancy by asset type, widely used to set depreciation. The AHA schedule for hospital assets is the common one. It is an average across the country, not a verdict on the device in front of you.
- **The department's own failure trends:** annual cost per device and failure count, from your own CMMS.
- **Parts and support availability:** whether parts, software, and service training can still be bought.
- **End of support dates:** the date the manufacturer has declared, or has not.
- **Technology change:** something safer, more capable, or required by a new clinical practice.

**End of life** means the manufacturer has decided to stop supporting the model. It does not mean the device is unsafe, unrepairable, or finished. And no law requires a manufacturer to supply parts or support for any number of years after it declares end of life, so a declared date is a planning deadline rather than a guarantee.

## The replacement planning list
\`\`\`
Factor              What you record                         Where it comes from
Age                 years in service against useful life    the asset record
Condition           failures, calibration drift, cosmetic   service history
Cost of service     annual service cost, and the cost of    CMMS plus original cost
                    service ratio against original cost
Downtime            hours out of service, cases affected    work orders
Clinical need       what the department cannot do without   the clinical director
Support             parts, training, software, end of       the manufacturer, in writing
                    support date
Regulatory driver   a standard, code, or recall that        the accreditor or the notice
                    forces a change
\`\`\`

## Scoring and prioritizing requests
A list of thirty replacement candidates and funding for eight is the normal situation. Score each candidate against the same factors with the same weights, publish the weights before the scoring, and rank the list. Then present the ranked list rather than thirty separate pleas, because a committee can approve a line in a ranked list and cannot adjudicate thirty arguments. Say explicitly what the hospital carries if items nine through thirty are not funded this year, and carry the unfunded items into next year's plan rather than starting over.

## The multi-year plan and the paper trail
The plan runs several years out because replacement runs into millions and because the earliest warnings, rising cost per device and a manufacturer's support-withdrawal notice, arrive years before the device actually fails. Each year you refresh it with new service data, new support notices, and the items that were funded. The file behind each line holds the asset record, the cost history, the support notice, the clinical statement of need, and the score with its date. That file is what answers an auditor, a surveyor, or a new director who asks why this device and not that one.

> Exam tip: useful life comes from manufacturer guidance, an industry life-expectancy schedule, your own failure data, parts and support availability, the end of support date, and technology change. End of life is a support decision, not a safety verdict, and no manufacturer is obliged to support a device for any set number of years.`,
      hook: "Useful life is set from manufacturer guidance, an industry schedule, the department's own failure and cost data, parts and support availability, and the declared end of support, then turned into a ranked multi-year replacement plan with a file behind every line."
    },
    {
      id: "u2l2", title: "Service Contracts: Cost, Compliance, Terms and Conditions", domain: 1, obj: "FIN-C", minutes: 10,
      body: `A renewal notice arrives sixty days before the contract ends, at a price six percent above last year. Purchasing wants a yes or no. The vendor's representative is pleasant and has been responsive. None of that is evidence. The evidence is in your own records, and whether you can produce it inside sixty days decides whether you negotiate or simply sign.

## What a contract covers, and what it does not
A service contract is a purchase of defined work at a fixed price. Its value lives in two lists: what is covered and what is excluded. The exclusion list decides your real cost, because every excluded item becomes an unbudgeted repair later in the year. Batteries, accessories, probes and transducers, glassware, major assemblies, abuse and misuse, after-hours work, software and licensing, and travel are the usual exclusions, and each one is worth asking about by name.

## The terms that matter
\`\`\`
Term                   What to pin down before signing
Scope                  which devices and modules, by serial or asset number,
                       and during what hours
Response time          time to phone response and time on site, stated
                       separately, with a remedy when missed
Uptime guarantee       the promised availability, how it is measured, and
                       what the hospital gets when it is not met
Parts                  included or not; new, refurbished, or exchange
Loaners                provided or not, how fast, at whose cost
Scheduled maintenance  included, at what interval, and documented where
Software updates       included or licensed separately
Training               seats, level, location, and whether manuals and
                       passwords come with them
Remote access          who connects, how, who approves, and what is logged
Termination            notice required and penalty owed
Renewal and escalation whether it renews by itself and the annual cap on
                       a price rise
Indemnity and          who answers for injury, data loss, and damage done
insurance              during service, and what cover the vendor carries
\`\`\`
Read the scheduled maintenance row twice. Ask specifically whether preventive maintenance is included, at whose interval, and where the records land, because a contract that covers repairs and leaves scheduled work to you is a different purchase from the one the vendor described. One term governs all the others: the signed agreement is the whole deal, and a term can run as long as ten years. Nothing said in a meeting or an email survives an entire-agreement clause.

## Measuring vendor compliance
A contract you do not measure is a contract you renew blind. Hold the vendor to the terms with records you already generate: every vendor visit logged in the CMMS, a service report inside twenty-four hours as a condition of payment, response times recorded against the promised times, scheduled maintenance completion by the contracted interval, and the qualification and training records of the people who did the work. Compliance also runs upward: the vendor's intervals must meet your maintenance plan and your accreditor's expectations, not merely the vendor's own schedule.

## The two numbers that price a contract
Cost per device per year is the contract price divided by the number of covered devices, and it makes two quotes comparable. Cost of service ratio is the better weapon: COSR = annual service cost / acquisition cost x 100. A $180,000 contract on a $1,000,000 system works out to 18 percent, against a department running 6 percent in house, which is three times the cost of doing it yourself. Across a hospital, 4 to 25 percent is the normal band, manufacturer service typically runs 10 to 25 percent, and full in-house service can reach 4 to 6 percent.

## Negotiating at renewal
Bring the department's own data: calls placed, response times met and missed, scheduled maintenance delivered, parts actually consumed, downtime, and the ratio above. Ask for the escalation to be capped, the exclusions narrowed, training seats added, or the coverage level reduced to match the real call volume. Document the contract's performance in the CMMS all year, because the leverage exists before the signature and nowhere after it.

> Exam tip: the exclusion list, not the coverage list, decides your real cost. Measure the vendor against the terms with CMMS records all year. Cost of service ratio is annual service cost over acquisition cost times 100, and the signed contract is the entire agreement.`,
      hook: "A service contract is judged on its exclusions, its response and uptime terms, and the cost of service ratio it works out to, all measured against CMMS records a manager keeps all year so the renewal is a negotiation rather than a signature."
    },
    {
      id: "u2l3", title: "Contract Types and Coverage Levels; the In-House Versus Vendor Decision", domain: 1, obj: "FIN-C", minutes: 10,
      body: `A new analyzer arrives with a warranty that expires in twelve months, and the vendor has quoted a full service contract for year two. The lab director assumes you will buy it. Before anyone buys anything, somebody has to say which of about ten different service arrangements this device should be under, and that somebody is you.

## The arrangements, and who carries the risk
\`\`\`
Arrangement          What it covers                        Who carries the risk
Full service         parts, labor, travel, scheduled        the vendor, at a fixed and
                     maintenance, often software            usually high price
Parts only           parts at an agreed price, no labor     shared; your staff work
Time and materials   nothing in advance; billed per call    the hospital, which is
                                                            self-insurance
Shared risk          a spending pool or a cap, savings      shared; read the formula
                     and overruns split by formula          before signing
First look           in-house responds first, vendor is     the hospital on routine
                     called when staff cannot finish        calls, vendor on hard ones
Preventive only      scheduled maintenance; repairs         the hospital on every
                     billed separately                      failure
Software support     updates, patches, remote               the vendor, for exactly
                     diagnostics, license renewal           what the license lists
Multi-vendor         one company services many makes,       the service organization,
service              often subcontracting                   with a layer of margin
Point-of-sale or     service sold at the moment of          the hospital, which
extended warranty    purchase, usually with no HTM input    overpays
Equipment insurance  a premium covers scheduled and         the insurer, with the
or asset management  unscheduled work; you file claims      claims load on HTM
In-house service     your own staff, tools, test            the hospital, usually at
                     equipment, and parts                    the lowest cost
\`\`\`
Three of these deserve a warning. A multi-vendor service arrangement hands one company a fleet of several makes, which it often subcontracts, so you are relying on a chain you did not choose and paying a margin layer for the privilege. Managed well, time and materials can cut cost by as much as sixty percent against a full contract, which is why self-insuring a low-risk fleet is often the right answer. And a point-of-sale warranty is the worst buy on the list: the seller's margin can run as high as ninety percent and cancellation usually carries a penalty, so the moment to stop one is before the purchase closes.

## The in-house decision factors
- **Volume:** how many of this model the hospital owns, and whether the hours justify a trained technician.
- **Skills:** who already works at this level, and what happens when that one person is on leave.
- **Training cost:** tuition, travel, lodging, and the weeks of lost productivity while a technician is away.
- **Test equipment:** what the model requires, what it costs, and who calibrates it.
- **Parts access:** whether the manufacturer sells parts, service keys, and software to equipment owners at all.
- **Response time:** how long a vendor takes to arrive against how long your own staff take to walk down the hall.
- **Risk:** the consequence of a long outage on this device, and whether a backup unit exists.
- **Regulatory:** whether an accreditor, a standard, or a licensing body requires a particular qualification.

## Hybrid models are usually the answer
Few fleets belong wholly to one arrangement. First look on the devices your staff can handle, full coverage on the two modalities nobody can open, parts only where parts are sold, preventive only on a device whose repairs are rare and cheap, and time and materials on the long tail. Review the mix every year against call volume, because a fleet that changes and a contract set that never does is how a department overpays quietly.

## Presenting the decision
Compare options over the same number of years, with the training, test equipment, and parts inventory each one needs priced in, and show the ROI and the payback. Name the risk the hospital takes on with the cheaper option and how you will manage it. One recommendation, with the alternatives beneath it.

> Exam tip: know the arrangements by what they cover and who carries the risk. Time and materials is self-insurance and can be far cheaper on a low-risk fleet; a point-of-sale warranty is the worst value and must be stopped before the purchase closes. The in-house decision turns on volume, skills, training cost, test equipment, parts access, response time, risk, and regulation.`,
      hook: "Every service arrangement from full coverage to time and materials is defined by what it covers and who carries the risk, and the in-house decision turns on volume, skills, training cost, test equipment, parts access, response time, and risk."
    },
    {
      id: "u2l4", title: "Sourcing Parts, Service, Training, and Test Equipment", domain: 1, obj: "FIN-C", minutes: 9,
      body: `A technician needs a board today. The manufacturer quotes $4,200 with a two-week lead time. A third-party supplier quotes $1,900 overnight, and a broker has one for $700 with no warranty. The device is a ventilator. The purchase is yours to approve, and so is the consequence.

## The sourcing options and their risks
\`\`\`
Source            What you gain                  What you risk
Manufacturer      correct part, warranty,        highest price, longest lead
                  documented traceability        time
Third-party       lower price, often faster      verify quality, warranty, and
supplier                                          traceability before you buy
Refurbished       much lower price on            unknown history; ask what was
                  assemblies                      replaced and what is warranted
Exchange or       lowest cost on repairable      you owe the core back, and
core exchange     assemblies, fast                downtime if the core is lost
Broker or         availability when nothing      no warranty, no traceability,
surplus           else exists                     counterfeit exposure
\`\`\`
Three risks run through all of it. Quality: a part that is not what the label says puts a patient behind it. Warranty: an uncovered part that fails twice costs more than the manufacturer's price. Counterfeit and regulatory exposure: a part with no traceable origin in a life-support device is a finding waiting to happen, and in the case above the right answer is the supplier who can document what the part is, not the cheapest line on the page.

## Parts inventory management
Stock what the schedule and the failure history say you will need, not what feels safe. Set stock levels and reorder points per item from consumption data, keep PM kits ordered before the month they are needed, and measure turns so the shelf does not become a museum. Consignment stock sits on your shelf and is owned by the vendor until you use it, which protects cash and shifts the obsolescence risk, provided somebody reconciles it. Remember the overhead: raising one purchase order carries roughly $100 of hospital cost, so many small orders can waste more than the lower part price ever saved. Consolidate.

## Sourcing service, training, and test equipment
For service, price the manufacturer, independent service organizations, and your own staff over the same years, and ask every outside provider for qualification and training records before the first visit. For training, start with the maker of the device, then price independent trainers, who are often cheaper and sometimes teach more, and negotiate the seats into the purchase while there is leverage. For test equipment, buy against the inventory you actually support: safety analyzers, simulators, meters, and gas and flow analyzers matched to the devices on the floor. Then buy the calibration with it, on a schedule, traceable to the national standards kept by NIST, with certificates on file. Test equipment out of calibration invalidates every record made with it.

## Purchasing policy compliance
Follow the hospital's own rules, every time, in this order: a written specification, the number of quotes the policy requires at the dollar value, the approvals the policy requires, a purchase order raised before the work or the goods arrive, receiving confirmed against the order, and the invoice matched to both before it is approved. Sole-source purchases need a written justification. A verbal order that bypasses a purchase order leaves the hospital holding an unapproved commitment, and leaves you explaining it to an auditor.

> Exam tip: compare sources on quality, warranty, traceability, and lead time, not on price alone, and never put an untraceable part in a life-support device. Buy calibration with test equipment and keep it traceable to NIST. Follow the purchasing policy's quote, approval, purchase order, and receiving sequence, and remember a purchase order carries about $100 of overhead.`,
      hook: "Parts, service, training, and test equipment are sourced on quality, warranty, traceability, and lead time rather than price alone, inside the hospital's quote, approval, purchase order, and receiving policy."
    },
    {
      id: "u2l5", title: "Fair Market Value: Purchase, Lease, and Asset Recovery on Disposal", domain: 1, obj: "FIN-C", minutes: 9,
      body: `Two decisions bracket a device's life and both come to you for a number. At the front, finance asks whether to buy it or lease it. At the end, a vendor offers a trade-in credit on the replacement, and a used-equipment dealer offers cash. Somebody has to say what the old device is actually worth, and what has to happen to it before it leaves the building.

## Fair market value, and what it is not
**Fair market value** is what a willing buyer would pay a willing seller today, with neither under pressure. It is not book value, which is an accounting position, and it is not replacement cost, which is what a new one costs. It is established from current market evidence: completed sales of the same model, dealer and broker quotes, auction results, and a professional appraisal where the value justifies one. Hospital policy should say who determines fair market value and who may accept an offer, because the manager who negotiates the replacement should not also be the sole judge of the trade-in credit.

## Purchase, lease, and rental
\`\`\`
Choice     Money it uses       What the hospital holds     What to read in the terms
Purchase   capital             the asset and every         nothing; the cost is yours
                               downstream cost             for the life
Capital    behaves like a      the asset in substance,     who maintains and insures
lease      purchase, paid      ending in ownership or a    it, the end-of-term buyout
           over a term         bargain purchase
Operating  operating money     use of the device for a     who maintains and insures
lease      across the term     term, then it goes back     it, return condition,
                                                           escalation, and renewal
Rental     operating money,    use for weeks or months     daily or monthly rate, who
           short term                                      services it, delivery
\`\`\`
A capital lease is a purchase in substance, so the asset and the obligation land on the balance sheet. An operating lease spreads cost as an expense and leaves the device the lessor's property. Finance picks the structure; HTM's job is to say who services it, who insures it, what condition it must be returned in, whether the hospital may service it at all, and what happens to data on it at the end of term.

## Asset recovery on disposal
Order of preference, highest value first: redistribute inside the organization or to a simulation or training center, then sell, then donate, then recycle.
- **Trade-in** is convenient and usually the lowest value available. Price the open market before accepting it.
- **Resale** through used-equipment companies and broker sites will draw bids. After the labor to list, negotiate, and load, it is often close to break-even, so count the labor.
- **Donation** can put a device to work abroad. Policy must say who selects the charity and who may donate instead of sell, and the device must still be serviceable where it lands.
- **Recycling** is the floor, and it is still a documented, compliant route rather than the loading dock.
One financial warning: disposing of an asset that is still being depreciated writes off its remaining book value, so finance agrees before the device moves.

## The disposal process
1. **Approval** under the hospital's policy, with finance notified of the book value.
2. **Data wiping or media destruction** on anything that stored patient information. Selling or donating a device holding PHI is a HIPAA violation, and often only HTM knows the data is in there.
3. **Decontamination** to the infection prevention standard, documented, before anyone handles it.
4. **Environmental handling** for batteries, mercury, sealed sources, refrigerants, and electronics, which follow environmental rules rather than the dumpster.
5. **Documentation and inventory removal:** a disposal record naming the asset, the method, the date, the wipe, and the signature, then the asset closed out of the CMMS and the ledger.

> Exam tip: fair market value is today's market price, not book value and not replacement cost. A capital lease behaves like a purchase; an operating lease is an expense. Wipe the data and decontaminate before anything leaves, document the disposal, and get finance's agreement on remaining book value first.`,
      hook: "Fair market value is what the market would pay today rather than book value, and every disposal runs approval, data wiping, decontamination, environmental handling, documentation, and removal from the inventory."
    },
    {
      id: "u2l6", title: "Advising Management: the Recommendation and the Paper Trail", domain: 1, obj: "FIN-C", minutes: 9,
      body: `A surgeon has already chosen a system, the vendor has already quoted it, and the capital committee meets in nine days. You are copied on the email as a courtesy. This is the most common and the most expensive way HTM is used in procurement, and the whole lesson is about how to be in the conversation three months earlier instead.

## HTM's actual role
Consult early, evaluate, recommend. Do not decide alone. The clinical department owns the clinical need, finance owns the money, and leadership owns the decision. What HTM owns is the technical truth: whether the hospital can run, service, secure, and afford this device for its whole life. Being in the planning and design meetings is not a courtesy, it is where equipment decisions become construction costs and service costs nobody budgeted.

## The evaluation record
\`\`\`
Element                What it holds                      Who supplies it
Clinical input         the need, the volume, the           the clinical director,
                       consequence of not funding          in writing
Technical review       serviceability, parts, manuals,     HTM
                       test equipment, training, space,
                       power, and site preparation
Cybersecurity review   the MDS2, the operating system      HTM with IT and the
                       and how long it is supported,       security officer
                       patching, authentication,
                       encryption, remote access
Service strategy       in-house, contract, or time and     HTM
                       materials, priced for the life
Total cost of          purchase, installation, service,    HTM with finance
ownership              parts, training, software,
                       consumables, disposal
Standardization        what the hospital already owns      HTM
                       and what a new model adds
References            other facilities running it, and     HTM, directly, not
                       what MAUDE already holds             through the vendor
Options compared       every option including doing         HTM
                       nothing, over the same years
\`\`\`

## Conflicts of interest and vendor relations
Vendor relationships are useful and must be visible. Disclose anything of value offered to you or your staff under the hospital's policy, decline what the policy forbids, and never let a vendor write your evaluation or supply your references unverified. Treat all bidders the same: the same specification, the same questions, the same deadline, the same information. Keep pricing confidential between bidders. The test is simple: would this look defensible written down in the file, because one day it will be read.

## Writing a recommendation leadership can act on
One page, one recommendation. The clinical need in a sentence, the options with their total cost of ownership over a stated number of years, the recommendation, the risks of the recommendation and how each is handled, what happens if nothing is funded, and the decision you are asking for. Put the number and the recommendation in the first three lines; a committee can approve a line and cannot adjudicate an essay. Say what you do not know and when you will know it rather than leaving a gap for someone else to fill with an assumption.

## What the file must hold for a later audit
The specification, the quotes and who was asked, the evaluation record above, the conflict disclosures, the committee minutes or the approval, the purchase order, the acceptance test results, and the service strategy as it was approved. An auditor or a surveyor asks the same question in different words: show me how this was decided, and show me that the same rule applied to everyone. The file answers that or it does not.

> Exam tip: HTM consults early, evaluates, and recommends; it does not decide alone. The evaluation record carries clinical input, technical review, cybersecurity review, service strategy, total cost of ownership, standardization, and verified references. Disclose conflicts, treat all bidders alike, and keep the file that shows how the decision was made.`,
      hook: "HTM's role in procurement is to consult early, evaluate, and recommend, leaving behind a one-page recommendation and a file that shows an auditor exactly how the decision was made."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Risk, Recalls, and Data Security", domain: 2,
  blurb: "How a manager finds, scores, controls, reports, and recovers from risk.",
  assumes: "Unit 1's cost language. The risk tools in this unit stand on their own.",
  lessons: [
    {
      id: "u3l1", title: "Identifying and Evaluating Risk: Patient Safety, Operations, Financial, Emergency Preparedness, Regulatory", domain: 2, obj: "RSK-A", minutes: 10,
      body: `Your risk manager asks for the HTM department's top five risks by the end of the week, for a report going to the board. You have incident reports, a service history, a recall folder, and a backlog list, and none of them is labeled "risk". Turning what you already know into five ranked statements somebody else can act on is the whole job of this lesson.

## The five categories, with an HTM example of each
\`\`\`
Category                 What it looks like in your department
Patient safety           a device that shocks, burns, delivers the wrong dose, or
                         reads out of calibration and leads to a misdiagnosis
Operations               downtime on the only device of its kind, a canceled
                         procedure, a surgeon who takes cases elsewhere
Financial                unplanned repairs that break the budget, a contract
                         signed without review, a fine, the cost of a lawsuit
Emergency preparedness   a utility or network failure that leaves clinicians
                         without working equipment and no written workaround
Regulatory               a survey finding on maintenance records, an unreported
                         adverse event, equipment in an alternative maintenance
                         program that was never eligible for it
\`\`\`
They overlap on purpose. One failed sterilizer is a patient safety risk, an operations risk, a financial risk, and a regulatory risk at the same time, and naming all four is what gets it funded.

## Risk is likelihood and consequence
A risk statement that names only the bad outcome cannot be ranked. Every risk has two dimensions: how likely it is, from your own history or credible outside data, and how bad it is if it happens. A rare event with catastrophic consequence and a weekly event with a trivial consequence can carry the same score and need completely different responses. Write each risk as a sentence that holds both: if this happens, that follows, and here is how often we have seen it.

There is a trade behind every decision you will make with these numbers. Risk and cost move in opposite directions. Almost any risk can be driven close to zero if the hospital spends enough, and cost comes down only by accepting more risk. The hospital's risk management department decides how much risk is acceptable; your job is to state the risk honestly and price the options.

## Where the information comes from
- **Incident reports** from the hospital's event system, including the ones that never mention a device by name.
- **Service history** in the CMMS: repeat repairs, use error codes, cannot-duplicate calls, rising failure rates.
- **Recalls and advisories** received and still open.
- **Survey findings** from your accreditor and from internal audits.
- **Staff rounds** in the clinical units, which surface the workaround nobody reported.
- **Near misses**, which are the cheapest data you will ever get and the most often thrown away.

## The risk register
A risk register is one list, maintained rather than written once. Each entry holds the risk statement, the category, the likelihood and consequence, the current score, the controls already in place, the named owner, the action with a date, and the review date. It is the document the risk manager actually wants, and it is what lets you answer "what are your top five" in one minute rather than one week.

## Who owns what, and when you escalate
Ownership follows the ability to act. HTM owns equipment condition, maintenance strategy, recall execution, and technical advice. The clinical department owns operator competence, device use, and reporting events. IT and the security officer own network and security controls jointly with you. Facilities own power, gases, water, and ventilation. Risk management owns the hospital's tolerance and the investigation. Escalate the moment a risk is beyond your authority or your budget to control, when a device has harmed a patient, when a recall is a Class I, or when a control you recommended has been refused. Escalate in writing, name what you recommended, and keep the copy.

> Exam tip: the five categories are patient safety, operations, financial, emergency preparedness, and regulatory. Risk is likelihood times consequence, risk and cost move in opposite directions, and the hospital's risk management department sets what is acceptable. The risk register is the document that holds it all with a named owner per line.`,
      hook: "Risk comes in five categories, is stated as likelihood and consequence rather than outcome alone, is collected from incidents, service history, recalls, surveys, rounds, and near misses, and lives in a risk register with a named owner on every line."
    },
    {
      id: "u3l2", title: "Risk Scoring and the Maintenance Strategy It Drives", domain: 2, obj: "RSK-C", minutes: 10,
      body: `A surveyor points at a row of identical infusion pumps and asks why they are inspected annually when the manufacturer's manual says every six months. There is exactly one acceptable answer, and it is not "that is what we have always done". It is a documented, risk-based decision made by qualified people, with the evidence behind it in a file you can produce.

## Risk-based inclusion, then risk-based strategy
Two decisions, in order. First, inclusion: does this device belong in the equipment management program at all, and at what level of tracking. Second, strategy: what work does it get, and how often. Both decisions are made from the same inputs.
\`\`\`
Scoring input              What it asks
Equipment function         what the device does: life support, therapeutic,
                           diagnostic, analytical, or support. Life support
                           scores highest
Physical risk of failure   the harm a failure could cause: death, injury, a
                           wrong diagnosis, or an inconvenience
Likelihood of failure      how often this model actually fails, from your own
                           history or credible outside data
Maintenance requirement    how much scheduled work it truly needs: filters,
                           batteries, calibration, moving parts, or almost none
Incident history           the number, frequency, and nature of past failures
                           and service requests on identical or very similar
                           equipment
Backup availability        whether an alternative or backup device is available
                           in time if this one fails
\`\`\`

## Scoring models and their thresholds
A scoring model turns those inputs into one number, usually by scoring each input on a short scale and combining them with a published formula. The bands that separate high, medium, and low are set by the hospital in its own written methodology; there is no national threshold to look up, and a manager who quotes one is quoting nothing. What matters for the exam and for a surveyor is that the scale, the formula, and the bands are written down before the scoring starts, applied the same way to every device type, and approved by whoever owns the equipment management plan.

Worked, on this course's own model: all six inputs, each scored 1 to 5, added into one number. The deep dive scores more devices on exactly this model and the same bands.
\`\`\`
Device           Func  Phys  Like  Maint  Inc  Back  Score  Band
Ventilator         5     5     3     5      3    5      26  high
Infusion pump      4     4     3     3      3    1      18  high
Diagnostic ECG     3     3     2     3      1    1      13  medium
Exam light         1     1     3     1      1    1       8  low
Bands in this example: 18 and above high, 11 to 17 medium, 10 and below low
\`\`\`

## What each band gets
- **High:** full scheduled maintenance at the manufacturer's interval, with preventive maintenance, safety testing, and performance verification all delivered, on the critical equipment list, and a backup plan for failure.
- **Medium:** scheduled maintenance at an interval the risk assessment supports, which may be longer than the manufacturer's, with the evidence on file.
- **Low:** inspection only, or in the right circumstances run to failure, also called breakdown or reactive maintenance, where the device is inexpensive, failure harms nobody, and a replacement is on the shelf.

Any change away from the manufacturer's recommendations lives inside a documented **AEM** program, decided by qualified personnel on a risk assessment. Three things may never go into one: imaging and radiologic equipment, whether diagnostic or therapeutic; medical laser devices; and new equipment with too little maintenance history to support a risk-based decision. New equipment is maintained to the manufacturer's recommendations until that history exists. Equipment in the program must be readily identifiable as such, and so must critical equipment, because that is exactly where a surveyor looks first.

## Documenting the rationale, and reviewing it
The file per equipment type holds the inputs with their values, the formula, the band, the activities and frequencies chosen, the qualified person who decided, and the date. Then it gets reviewed, because a score made on a thin history is a hypothesis. Re-score when the failure history changes, when an incident happens on that model, when the manufacturer issues a notice or changes its guidance, when the fleet grows or shrinks, and at the interval the plan sets. And once you have set an interval, you must follow it strictly; an alternative program is a different schedule, never permission to improvise.

> Exam tip: the risk inputs are equipment function, physical risk of failure, likelihood of failure, maintenance requirement, incident history, and backup availability. The hospital writes its own thresholds. Imaging and radiologic equipment, lasers, and new equipment without history cannot go into an alternative program, and whatever frequency you set, you must then follow.`,
      hook: "Equipment function, physical risk, likelihood of failure, maintenance requirement, incident history, and backup availability combine into one score whose band decides full scheduled maintenance, a longer interval, inspection only, or run to failure, all documented before the fact."
    },
    {
      id: "u3l3", title: "Recommending Controls: Processes, Procedures, and Policies That Mitigate Risk", domain: 2, obj: "RSK-B", minutes: 9,
      body: `An investigation closes and the recommendation writes itself: retrain the staff. Six months later the same event happens on a different unit. Retraining is the weakest control available, and a manager who reaches for it first will spend a career fixing the same thing. This lesson is about choosing a control that holds and proving that it did.

## The hierarchy of controls, applied to healthcare technology
Strongest first. Work down the list only when the one above it is genuinely impossible.
\`\`\`
Control            What it means here                   Example
Eliminate          remove the hazard entirely           retire the model that has
                                                        no free-flow protection
Substitute         replace it with something safer      standardize on one pump
                                                        with a drug library
Engineer           design the hazard out so a person    hard dose limits, interlocks,
                   cannot reach it                      keyed connectors, segmented
                                                        network, tamper-proof settings
Administer         change what people are told to do    a procedure, a policy, a
                                                        checklist, a second signature,
                                                        a maintenance interval
Protect            put equipment between the person     gloves, eye protection,
                   and the hazard                       lockout devices
\`\`\`
Engineering controls work whether or not anyone is paying attention; administrative controls work only while attention lasts. That is why a device configuration change usually beats a memo, and why the committee should hear both options with their cost.

## Writing a procedure or policy that actually controls the risk
A policy says what the organization requires and who is accountable. A procedure says who does what, in what order, with what, and what the record is. A control written as prose nobody can follow is not a control.
1. State the risk the document exists to control, in one sentence.
2. Name the trigger: what starts the procedure.
3. Number the steps in the order a person performs them, one action per step.
4. Name the roles, not the people, so it survives a resignation.
5. Say what record is made, where it is kept, and for how long.
6. Say what to do when a step cannot be completed, and who to escalate to.
7. Date it, version it, name the owner, and set a review date.
Reference the organization's other policies rather than repeating them, so one change does not leave three documents disagreeing.

## Training and competency as controls
Training is a legitimate control when the gap really is knowledge and when it is backed by competency assessment rather than an attendance sheet. Competency means the person demonstrated the task, was observed, and the observation was recorded. For operators, take in-service education to the pattern you measured, on every shift that touches the device, and record who was trained on what, by whom, and when. For staff, documented assessment per person and per equipment type. Training with no assessment behind it is a note in a file, and a surveyor will read it as one.

## Measuring whether a control works
Decide the measure before you implement the control, and take a baseline. Then measure the same thing the same way: the event count or near-miss count, the use error code frequency on that model and unit, repeat repairs, overdue scheduled maintenance, audit results on the new procedure's records, and the completion of the training. Set a date to report. A control with no measure attached cannot be defended and cannot be withdrawn, so the department accumulates procedures forever and knows nothing about any of them.

## Presenting the recommendation to the committee that owns it
Match the control to the committee. Device-related events and use error trends go to patient safety. Equipment inventory, completion rates, recalls, and the annual plan evaluation go to the environment of care committee. Investigations, device holds, and reportable events go to risk management. Metrics with targets and corrective action results go to performance improvement. Imaging and therapy equipment performance goes to radiation safety, device cleaning and disinfection to infection control. Whichever it is, bring one page: the risk, the options with cost, your recommendation, the measure you will report, and the decision you need from them.

> Exam tip: work the hierarchy from the top. Eliminate, substitute, and engineer beat administrative controls and personal protective equipment, and retraining alone is the weakest answer on any list. Define the measure and the baseline before you implement, and take the recommendation to the committee that owns that risk.`,
      hook: "Controls are chosen from the top of the hierarchy down, written as a procedure with roles, records, and a review date, measured against a baseline set before implementation, and taken to the committee that owns the risk."
    },
    {
      id: "u3l4", title: "Root Cause Analysis and Incident Investigation", domain: 2, obj: "RSK-C", minutes: 11,
      body: `The phone rings at 2 a.m. A patient was harmed, a device was in the room, and the unit wants to know whether they can keep using it. Everything you do in the next twenty minutes either preserves an investigation or destroys it. There is a sequence, and it does not begin with troubleshooting.

## Securing the scene
1. **Take the device out of patient use** and tag it. Nothing else happens until this is done.
2. **Leave it exactly as it is.** Do not clean it, repair it, recalibrate it, update it, power-cycle it where the log would be lost, or return it to service.
3. **Collect what was attached to it:** accessories, cables, sensors, the disposables in use, the bag or syringe, the tubing, the electrodes.
4. **Stop the trash from being emptied.** Lot numbers of disposables live in it, and so does the packaging that proves what was used.
5. **Preserve settings and switch positions as found,** and photograph the screen, the controls, the connections, and the room before anything moves.
6. **Pull the error and event logs** by the manufacturer's documented method, and record who pulled them and when.
7. **Secure the device** in a locked location with a chain of custody, so nobody well-meaning fixes it.

## Interviewing without blame
Interview the people who were there, separately, as soon as memory is fresh, and ask what happened rather than what went wrong. Record their words, not your interpretation. Never suggest an answer, never compare one account with another in front of a witness, and never let the conversation become a disciplinary meeting. People who feel accused stop reporting, and the department goes blind. Keep the discussion inside the investigation: the complete report goes to the risk manager, which is what makes it work product, and you discuss its contents with nobody else.

## Root cause analysis methods
RCA works backward on an event that has already happened, from the nearest cause to the root, and the root is more often the organization than the person at the bedside.
\`\`\`
Method          How it works                        What it is good at
Timeline        every event with a time, from        establishing what actually
                before the incident to after it     happened before theorizing
Five whys       ask why of each answer until the    getting past the first
                answers stop being symptoms         plausible explanation
Fishbone        sort candidate causes into          making sure no whole category
                categories: people, process,        of cause was skipped
                equipment, materials, environment,
                and management
\`\`\`
A **root cause** is a cause whose removal prevents recurrence. A **contributing factor** made the event more likely or worse but would not alone have caused it. Both belong in the report; only the root cause earns a corrective action that will hold. "The technician was rushed" is a contributing factor; "there is no procedure that requires a second check and the schedule assumes none" is closer to a root.

## Corrective and preventive action, and verification
Corrective action fixes this event's cause. Preventive action stops the same cause producing a different event elsewhere, which usually means applying the fix to the whole fleet, every unit, or every shift, not just the room it happened in. Each **CAPA** item carries an owner, a date, and a measure. Then verification: come back at the date, measure the thing you said you would, and record whether it held. An action plan nobody verified is an action plan that did not happen.

## The investigation report, and who else is involved
The report states the facts in sequence, the findings, the root cause and contributing factors, the actions with owners and dates, and the verification plan. It goes to the risk manager, and through risk management to patient safety and to the committees that own the actions. The manufacturer is involved when the device may have malfunctioned, when a design or labeling problem is suspected, or when the investigation needs their analysis, and anything you send them is coordinated through risk management. The FDA is involved when the event meets the reporting criteria, which the next lesson covers, and a device may be required as evidence, so never ship it away without agreement.

## Device error versus use error, from the manager's seat
A device error means the device did not perform as designed. A use error means it performed exactly as designed, in response to how it was operated. Determine which by testing the device against specification after the evidence is preserved and by reading the log against the timeline. The distinction decides the fix, not the blame: a device error leads to repair, replacement, a fleet check, and possibly a report; a use error leads to training, configuration, workflow safeguards, and a report to the manufacturer when a confusing design invited the mistake. Trend both, because a department that codes every use error as "no fault found" will mistake a training problem for a reliability problem for years.

> Exam tip: first step is always to remove the device from use and preserve everything as found, including the disposables and the trash. Root cause analysis looks backward at an event that happened. A root cause's removal prevents recurrence; a contributing factor does not. The complete report goes to the risk manager.`,
      hook: "An incident investigation starts by taking the device out of use and preserving everything as found, then works backward with a timeline, the five whys, and a fishbone to a root cause whose removal prevents recurrence, with corrective and preventive actions that are verified."
    },
    {
      id: "u3l5", title: "FMEA: Severity, Occurrence, Detection, and the Risk Priority Number", domain: 2, obj: "RSK-C", minutes: 10,
      body: `A new infusion pump fleet arrives in six weeks, with a new drug library and a new wireless configuration. Nothing has gone wrong yet, and the safety committee wants to know what could. Root cause analysis is useless here, because there is no event to work backward from. The tool for a failure that has not happened is failure modes and effects analysis, which everyone calls FMEA.

## The method, step by step
1. **Pick the process or the system** and set its boundaries, so the exercise ends.
2. **Assemble the people who do the work:** a nurse, a pharmacist, a technician, IT, and somebody from quality. A team of one produces one person's blind spots.
3. **List every step** of the process in order.
4. **List how each step can fail** and what the effect of that failure would be on the patient.
5. **Score each failure mode** on severity, occurrence, and detection.
6. **Multiply the three into a risk priority number.**
7. **Rank the list** and work from the top.
8. **Act:** assign a control, an owner, and a date to the highest-ranked modes.
9. **Re-score after the action** and confirm the number actually fell.

## What the three scores mean
- **Severity** is how bad the effect is on the patient if this failure happens. It almost never improves without a design change, because the harm is inherent in the failure.
- **Occurrence** is how often this failure mode is expected. It falls when you remove the cause.
- **Detection** is how likely the failure is to be caught before it reaches the patient. A high detection score means detection is poor. It falls when you add an alarm, a check, or a verification step.

Use one scale for all three and say what it is. This course's worked examples use 1 to 10, where 10 is the worst case on every axis: most severe, most frequent, and least detectable.

## RPN = severity x occurrence x detection
\`\`\`
Failure mode                       Sev  Occ  Det   RPN  Rank
Wrong concentration entered         9    4    7    252    1
Pump not on the wireless network,   4    6    5    120    2
so the library never updates
Battery fails during transport      7    3    4     84    3
Cassette misloaded, free flow       9    2    3     54    4
\`\`\`
Work the top of the list. The highest-ranked mode here is attacked on two axes at once: a hard concentration limit in the library lowers occurrence, and a mandatory second-person check lowers the detection score. Re-score afterward: severity stays at 9, because the harm from a wrong concentration has not changed, while occurrence falls to 2 and detection to 3, giving 54 and dropping it to the bottom of the list. That is what a completed FMEA cycle looks like.

Two cautions a manager should carry. RPN is a ranking device, not a measurement: 252 is not twice as dangerous as 126. And a high severity score deserves attention even when its RPN is low, because a rare, undetectable, fatal failure can rank below a frequent nuisance. Read the severity column separately before you accept the ranking.

## Where FMEA fits
- **New equipment** before it reaches patients, which is the case that opened this lesson.
- **A new or changed process:** a new workflow, a new interface to the record, a new service arrangement.
- **After an incident,** alongside root cause analysis: RCA explains the event that happened, FMEA finds the other ways the same process could fail.
- **Before a major change** such as consolidating pumps onto one model or moving a fleet to a new network segment.
- **On a schedule** for high-risk processes, because the process drifts even when nothing visibly breaks.

The output is a document: the process, the failure modes, the scores, the RPN, the actions with owners and dates, and the re-scores. It goes to the committee that owns the process, and it is the evidence that the hospital looked before it moved.

> Exam tip: FMEA is proactive and RCA is retrospective. RPN = severity x occurrence x detection, a high detection score means poor detection, severity rarely falls without a design change, and the team acts on the highest numbers then re-scores to prove the action worked.`,
      hook: "FMEA is the proactive tool: list the steps, list how each can fail, score severity, occurrence, and detection, multiply them into a risk priority number, act on the highest, then re-score to prove the action worked."
    },
    {
      id: "u3l6", title: "Reports That Explain Risk: the Safe Medical Devices Act of 1990, Medical Device Reporting, Sentinel Event Alerts", domain: 2, obj: "RSK-D", minutes: 10,
      body: `A patient died during a procedure, a device was in use, and the investigation is three hours old. Somebody in the building is now on a legal clock, and in most hospitals that somebody is the HTM manager, because nobody else knows the device, the serial number, or the deadline. Reporting is not optional and the deadline does not wait for the investigation to finish.

## The Safe Medical Devices Act of 1990
The **SMDA** made adverse-event reporting mandatory for device user facilities: hospitals, ambulatory surgical facilities, nursing homes, and outpatient diagnostic and treatment facilities. Before it, reporting ran from manufacturers only, so the agency learned about device problems from the party least motivated to raise them. The act moved part of that duty onto the facility that uses the device.

## Who reports what, to whom, and when
\`\`\`
Event                      Report to                     Deadline
Device-related death       the FDA and the manufacturer  within 10 work days of
                                                         becoming aware
Device-related serious     the manufacturer              within 10 work days of
injury                                                   becoming aware
Serious injury where the   the FDA instead               the same 10 work days
manufacturer cannot be
identified
Annual user facility       the FDA, on Form FDA 3419     by January 1 of each year
report
\`\`\`
A **serious injury** is one that is life-threatening, or causes permanent impairment of a body function or permanent damage to a body structure, or requires medical or surgical intervention to prevent that permanent harm. Copying the agency on every suspected serious injury is recommended practice even where only the manufacturer must be told. Where the manufacturer of a device involved in a death cannot be identified, the report goes to the agency alone.

Two housekeeping duties sit behind the deadlines. A user facility must develop, maintain, and follow written reporting procedures, so the duty does not depend on one person's memory. And it must establish, clearly identify, and keep the event file for 2 years from the date of the event, available to an agency investigator at any reasonable time. Learn that period as a flat 2 years from the event: the longer rule you may have heard, 2 years or the device's expected life if that is greater, is the manufacturer's and the importer's obligation, not the hospital's.

## The forms and the database
Mandatory reports from a facility go in on Form FDA 3500A, through the MedWatch program. Form FDA 3500 is the voluntary form, used by clinicians and the public. **MAUDE** is the public database those reports feed, and a manager uses it twice: before buying a model, to see what other facilities have already reported, and during an investigation, to see whether the failure in front of you has a history. An **MDR** obligation is triggered by what you became aware of, not by what the investigation later concludes, so file on time and send a supplemental or follow-up report when the facts firm up, rather than missing the deadline while you wait for certainty. Narrow exemptions and variances from these reporting requirements do exist, but the agency grants them on request; a hospital never decides on its own that a reportable event does not have to be reported.

## Sentinel events and the alerts that follow
A **sentinel event** is a patient safety event that reaches a patient and results in death, permanent harm, or severe temporary harm. It triggers a full root cause analysis and an action plan on the hospital's own clock, separately from any report to the agency. Accrediting bodies publish alerts on the patterns they see across many hospitals: alarm management, tubing misconnections, equipment-related harm. Those alerts are not optional reading. A manager is expected to know whether the hospital has the vulnerability the alert describes and to be able to say what was done about it.

## Writing a report that explains risk
Separate the regulatory report from the management report. The regulatory report is the form, filed on the deadline, factual, with the device identified exactly: manufacturer, model, serial number, lot numbers of disposables, software version. The management report is the one that changes anything, and it has four parts: the findings, stated as facts in sequence; the risk position, which is what could happen again and how likely it is; the recommendations, with cost and owner; and what you need from the reader. Who receives it decides its tone, not its facts: risk management gets the complete investigation, patient safety and the environment of care committee get the device findings and the trend, senior leadership gets one page with the decision on it, and the clinical department gets what it must do differently.

> Exam tip: the Safe Medical Devices Act of 1990 made user facility reporting mandatory. Death goes to the agency and the manufacturer; serious injury goes to the manufacturer, or to the agency when the manufacturer cannot be identified; both inside 10 work days. The annual report is Form FDA 3419 by January 1, mandatory reports use Form FDA 3500A, and MAUDE is the public database.`,
      hook: "Under the Safe Medical Devices Act of 1990 a user facility reports a device-related death to the agency and the manufacturer and a serious injury to the manufacturer, both within 10 work days, and files Form FDA 3419 as its annual report by January 1."
    },
    {
      id: "u3l7", title: "Recalls, Hazards, and Safety Advisories", domain: 2, obj: "RSK-G", minutes: 10,
      body: `A notice lands in a shared inbox at 4:40 on a Friday. It names a model you own, a serial range you have to look up, and a correction that requires a vendor visit. By Monday morning somebody will ask how many you have, where they are, and whether any are still on patients. If the answer takes a week, the process is broken before the notice even arrived.

## The three recall classes
A recall is classified by the relative degree of health hazard the violative product presents, and the class sets your urgency.
\`\`\`
Class  What it means                                      What you do
I      there is a reasonable probability that using or    act immediately: locate and
       being exposed to the product will cause serious    quarantine or correct now,
       harm to health, or death                           and escalate the same day
II     using or being exposed to it may cause health      act on a planned schedule
       consequences that are temporary or medically       with a firm completion date
       reversible, or the chance of serious harm is
       remote
III    using or being exposed to it is not likely to      correct through the normal
       harm health at all, but it still breaks a          work queue, and document
       requirement and must be corrected                  that you did
\`\`\`
Every class ends in a documented action, including Class III. "Not likely to harm" is not the same as "ignore".

Most recalls are firm initiated: the manufacturer finds the problem, decides to act, and notifies its customers and the agency. The agency can also request a recall when a firm has not acted, and it can order one for the most serious hazards. For your workflow the difference changes nothing, because the same identify, locate, correct, document, and close sequence runs either way. What it changes is the pressure: an agency-requested recall arrives with publicity attached, which means your committee and your senior leadership will ask for status before you have finished counting.

## Where notices come from, and who owns the inbox
Notices arrive from the FDA's own safety communications and recall postings, from manufacturers and their field service organizations, from distributors and group purchasing partners, and from independent sources such as ECRI. They arrive by email, by letter, by fax, through purchasing, and occasionally through a technician who heard it from a vendor. One named person must own that inbox, with a named backup, and every notice must be logged on arrival whether or not it applies to you. A notice that applies to nothing you own is still logged, with the finding recorded, because the question at the next survey is not "do you own this" but "how do you know".

## The recall workflow
1. **Receive and log** the notice with its date, source, class, and the devices it names.
2. **Identify affected devices in the CMMS** by manufacturer, model, and serial or lot range. This is the step that fails, and it fails for a reason: an inventory without serial numbers and original model names cannot answer a recall at all.
3. **Locate** each unit physically, including the ones on loan, in storage, in a different building, or out with a vendor.
4. **Quarantine or correct** by the class above: remove from service and tag, or apply the correction, or schedule the vendor.
5. **Notify** the clinical departments that hold the devices, before they find out from a nurse.
6. **Document each unit** individually: asset number, action taken, date, who did it.
7. **Verify** the correction, including work the vendor performed, against the notice's own instructions.
8. **Close the recall** with a record naming every affected asset and its disposition, and report the closure.

## Hazards and safety advisories that are not recalls
Plenty of notices are not recalls at all: a manufacturer's safety notice or field advisory, an alert from an independent testing body, a software bulletin, a labeling update, an agency safety communication on a use pattern rather than a defect. They carry no recall class, and some require no action. They still get logged, assessed, and closed the same way, and the record must say what action was taken even when the action was none and why. The worst outcome is a notice that was read, judged harmless, and left no trace of either.

## Communicating and reporting
Tell the clinical department what the notice says in plain words, what you are doing, what they must do, when their device goes away and when it comes back, and what to use meanwhile. Put nothing on a device-facing notice that a nurse cannot act on. Then report upward: recall status goes to the environment of care committee and, for a Class I or any event involving harm, to risk management and patient safety immediately. Report the same table every month, so the trend is visible: notices received, notices applicable, devices affected, devices corrected, recalls open, and the age of the oldest open recall. Open recalls are tracked in the CMMS against the asset, never on a spreadsheet one person maintains, because the recall outlives the person.

> Exam tip: Class I is a reasonable probability of serious harm or death and is acted on immediately, Class II is temporary or reversible harm or a remote chance of serious harm, Class III is unlikely to harm but still must be corrected. The first step after receiving a notice is to identify the affected devices in the inventory by model and serial range, and every notice is logged and closed with a record even when no action was needed.`,
      hook: "Class I recalls mean a reasonable probability of serious harm or death and are acted on immediately, Class II covers temporary or reversible harm, Class III is unlikely to harm but must still be corrected, and every notice is logged, matched to the inventory by serial range, documented per unit, and closed."
    },
    {
      id: "u3l8", title: "Data Integrity and Security for PACS, the EMR, and Networked Devices", domain: 2, obj: "RSK-E", minutes: 10,
      body: `A nurse calls because a set of vital signs is in the wrong patient's chart. Nothing is broken. The monitor works, the network is up, the record is up, and a number that will be used to make a treatment decision is attached to the wrong person. This is a data integrity failure, it is a patient safety event, and it belongs to you as much as any circuit board ever did.

## What data HTM is responsible for
\`\`\`
Data                    Why it is yours                 What can go wrong
Device configurations   you set them, and they decide   a changed alarm limit or dose
                        how the device behaves          limit silently applied to a fleet
Device and error logs   they are the evidence in an     overwritten, never pulled, or
                        investigation                   lost in a power cycle
Calibration and test    they prove the device met       recorded on paper that is lost,
records                 specification                   or made with uncalibrated gear
Patient data on         it is protected health          sold, donated, or scrapped with
devices                 information wherever it sits    the data still on it
CMMS content            it is the inventory, history,   corrupted, unbacked, or edited
                        and recall evidence             with no audit trail
\`\`\`

## Integrity: the data arriving unchanged and on the right patient
Integrity means the value that leaves the device reaches the record unchanged and attached to the right patient. The controls are unglamorous. Backups on a schedule for the CMMS and for device configurations, stored away from the system they protect. **Restore tests** performed and documented, because a backup nobody has restored is a hope rather than a plan. Version control on configurations and software, so you know which version is on which asset and can prove what changed. Audit logs kept and actually read, so a configuration change has a name and a time against it. And an association check in the workflow: the admission, discharge, and transfer feed that ties a bed to a patient is the usual culprit in a wrong-patient reading, which makes it a joint investigation with IT rather than a monitor repair.

## Security: access, encryption, and the physical layer
- **Access control:** unique named accounts, least privilege, multi-factor authentication where the system supports it, accounts removed the day somebody leaves, and shared service passwords retired. A shared password used by eight technicians and three vendors identifies nobody.
- **Encryption:** data protected at rest on the device and in transit across the network, by the manufacturer's supported method. Encryption added in a way the manufacturer does not support can take a device out of its cleared configuration.
- **Physical security:** servers in locked rooms with controlled access, portable devices secured, removable media controlled, and the quiet one people forget, devices awaiting disposal locked up rather than stacked in a corridor.

## The three examples the exam uses
**PACS** stores and moves images carrying patient identifiers. Treat the archive as patient data rather than a file server: backups, retention, access control, and a documented restore test. The **EMR** is the record inside the organization, and the broader **EHR** is the record shared across organizations; networked devices feed them directly or through middleware, so an interface failure is a clinical event and needs an alarm and an owner, not a quarterly discovery. **Networked devices** are the long tail: monitors, pumps, ventilators, analyzers, and imaging consoles, many of which cannot be patched on demand and some of which store patient data nobody remembers is there.

## HIPAA from the manager's seat
**HIPAA** protects identifiable health information through its privacy rule and its security rule, and the security rule asks for administrative, physical, and technical safeguards. **HITECH** extended it: breach notification, direct obligations on business associates, and stronger enforcement. For a manager that reduces to a short list of habits. Know which of your devices store **PHI**, and keep that list current. Wipe or destroy media before any device leaves the building, because selling or donating a device holding patient data is a violation and often only HTM knows the data is in there. Do not move patient data onto a laptop or a memory stick to troubleshoot it. Report a suspected breach through the hospital's process immediately rather than investigating it quietly first.

## Business associate agreements with vendors
A vendor who creates, receives, maintains, or transmits protected health information for the hospital is a business associate, and the relationship needs a written business associate agreement before the first visit. The agreement says what the vendor may do with the data, what safeguards it will apply, that it will report incidents, what happens to data at the end of the contract, and that its subcontractors are bound too. Practically, three vendor situations must never start without one: remote support into a device that holds patient data, a hosted or cloud service behind a device, and any arrangement where the vendor takes a device or its drive away. Checking that it exists is part of your procurement review, not legal's problem alone.

> Exam tip: integrity is the right data on the right patient, and its controls are backups with tested restores, version control, and audit logs. Security is access control, encryption, and physical security. Know which devices hold protected health information, wipe before disposal, and get a business associate agreement in place before a vendor touches patient data.`,
      hook: "Data integrity means the right value reaching the right patient's record, protected by backups with tested restores, version control, and audit logs, while security means access control, encryption, physical security, and a business associate agreement before any vendor touches patient data."
    },
    {
      id: "u3l9", title: "Cybersecurity Oversight: Patching, Hardening, Segmentation, WMTS, Operating System Life Expectancy", domain: 2, obj: "RSK-F", minutes: 10,
      body: `The security officer forwards a vulnerability bulletin and asks a reasonable question: how many of our medical devices are affected, and when will they be patched. If you cannot answer the first half in an afternoon, the second half is guesswork. Cybersecurity oversight for medical devices is mostly inventory, policy, and relationships, and only occasionally technology.

## The oversight list
\`\`\`
Element                    What the manager must hold
Networked device           every device that connects, with model, software and
inventory                  firmware version, operating system, address, segment,
                           and who owns it clinically
MDS2 on file               the manufacturer's security disclosure for each model,
                           collected before purchase
Risk assessment            which devices hold patient data, which cannot be
                           patched, which are reachable from outside, and what
                           the consequence of compromise would be
Patch policy               who may patch what, on whose validated schedule, with
                           the vendor's role written down
Hardening standard         unused ports and services off, default credentials
                           changed, software the clinical function does not need
                           removed
Segmentation               devices that cannot be patched on their own segment
                           with tight rules, and a named approver for exceptions
Antivirus                  only where the manufacturer allows it, with their
                           exclusions applied
Physical security          consoles, servers, and portable devices controlled
Vendor remote access       named accounts, approval before each session, logging,
                           and revocation when the contract ends
\`\`\`

## Patching, and the vendor's role in it
A medical device is cleared in a configuration, so a patch applied without the manufacturer's validation can take it out of that configuration and out of your warranty with it. The policy must therefore name three things: that patching follows the manufacturer's validated schedule, that the manufacturer is obliged by contract to supply patches and to state when it will, and what the hospital does when the manufacturer says a patch is not supported. That last case is the real work, and the answer is a compensating control rather than a shrug: segment it, restrict what can reach it, monitor it, and record the decision with the security officer's agreement.

## System hardening and segmentation
Hardening reduces what an attacker can reach on a device you cannot change much: turn off services and ports the clinical function does not use, change default credentials, remove unnecessary software, and disable unused removable media. Segmentation reduces who can reach the device at all. Network segmentation means putting clinical devices on their own part of the network, away from general hospital traffic: a clinical network segment with explicit rules about what may talk to what, with legacy devices gathered behind tighter rules, converts an unpatchable fleet from an open exposure into a managed one. Both are decided jointly with IT, because the rules live on their equipment and the clinical consequence of a wrong rule lives on yours.

## Operating system life expectancy and legacy devices
Ask one question before every purchase: how long will the embedded operating system be supported, and what happens to this device when that support ends. A device with a fifteen-year clinical life running an operating system whose support ends in four is a known future problem, not a surprise, and it belongs in the capital plan from the day it arrives. For the legacy devices already in the building, build the list, assess each one, and apply compensating controls: segmentation, restricted access, no internet reachability, monitoring, and a replacement date in the capital plan. Document every one of those decisions, because "we knew and we managed it" is a defensible position and "nobody looked" is not.

## Wireless Medical Telemetry Service and spectrum coordination
**WMTS** is protected spectrum for patient telemetry, licensed and coordinated under **FCC** rules. Somebody must register the hospital's use, keep a record of its frequencies and transmitters, and keep other equipment out of the band. That duty is usually HTM's, and it matters because the FCC licenses and manages the radio spectrum: an unmanaged transmitter in a telemetry band means dropped waveforms on monitored patients, which is a patient safety event wearing a radio problem's clothes. Treat any new wireless system, including vendors arriving with their own access points, as a coordination request rather than an installation.

## Working with IT and the security officer, and incident response
Agree the boundaries in writing: who owns the device, who owns the network, who may change a configuration, which change windows apply to clinical devices, and the joint path when something breaks. Then rehearse the incident response path. When a device is suspected of compromise: isolate it from the network without disconnecting patient care, tell the security officer and IT immediately, preserve the device and its logs the way you would for any investigation, bring the manufacturer in, decide clinically whether it can keep being used, and document the sequence. Formal change management for patches, network changes, and configuration changes to clinical devices is what keeps the next incident from being self-inflicted.

> Exam tip: oversight starts with an inventory of networked devices and the MDS2 collected before purchase. Patch on the manufacturer's validated schedule, and where a patch is impossible use compensating controls: hardening, segmentation, restricted access, and monitoring. Ask how long the operating system will be supported before you buy, and register and coordinate telemetry spectrum under the FCC rules.`,
      hook: "Cybersecurity oversight is an inventory of networked devices, an MDS2 per model, patching on the manufacturer's validated schedule, hardening and segmentation where patching is impossible, an answer to operating system life expectancy before purchase, and coordinated telemetry spectrum."
    },
    {
      id: "u3l10", title: "Emergency Preparedness and Continuity for HTM: Downtime, Utility Failure, Disaster Plans", domain: 2, obj: "RSK-A", minutes: 9,
      body: `A transformer fails at 6 p.m. and half the hospital drops to emergency power. Within four minutes somebody will call to ask which outlets in the unit are on the generator, how long the pumps will run on battery, and where the spare monitors are. Those are not questions to answer by walking the building with a flashlight. They are answered by lists you built on a quiet afternoon months ago.

## HTM's role in the emergency operations plan
The hospital's emergency operations plan is not yours to write, but several of its pages depend entirely on you: which equipment is critical, what each piece needs to keep running, what the clinical workaround is when it stops, where reserve equipment is and who releases it, and how HTM is reached and staffed in an event. Get your department named in the plan with a role, a contact method, and a reporting location, and get your lists attached to it rather than kept in your own files.

## Critical equipment lists
The critical equipment list names the devices whose failure threatens life or interrupts care that cannot wait. It is maintained whether or not those devices sit in an alternative maintenance program, and surveyors look hardest at critical equipment that was placed in such a program. Build it with the clinical departments so it reflects what they actually cannot work without, keep it in the CMMS so it cannot drift away from the inventory, and review it when services change.

## Utility failure, and what depends on each utility
Five utilities carry clinical equipment, and a manager should be able to name what depends on each without looking: power, medical gas, water, HVAC, and the network.
\`\`\`
Utility        Equipment that stops or degrades        What HTM must know in advance
Power          nearly everything; battery devices      which receptacles are on the
               run until they do not                   emergency branch, by room
Medical gas    ventilators, anesthesia machines,       which areas feed from which
               suction, oxygen therapy                 zone valves and manifolds
Water          sterilizers, dialysis, lab analyzers,   which devices need treated
               cooling for imaging                     water and which need cooling
HVAC           imaging and lab equipment with          temperature and humidity limits
               environmental limits, sterile storage   per equipment type
Network        the record, PACS, telemetry,            which devices fail safe, which
               networked pumps and monitors            fail silent, and the downtime
                                                       procedure for each system
\`\`\`
Read every planned utility interruption notice as a clinical event, not a facilities memo: which rooms, which devices, how long, what runs on battery, and what has to be moved. Then publish the downtime procedure before the interruption rather than during it.

## Generator and uninterruptible power supply inventories
Keep three lists current. The devices with internal batteries, with how long each actually runs under load and when its battery was last tested or replaced. The **UPS** units, with what each supports, its capacity, its runtime, and its battery age. And the equipment that must be moved to an emergency-branch receptacle when normal power is lost, by room. Battery runtime degrades quietly, so a tested figure beats a specification sheet every time.

## Downtime procedures and recovery
Every clinical system needs a written downtime procedure that says who declares downtime, what staff do without the system, where the paper or standalone fallback lives, and who is called. Recovery needs the same rigor and usually gets none: who declares the system restored, how the data collected during downtime is reconciled into the record, how devices are verified before they go back on patients, and who confirms the units are back on the normal workflow. Most of the harm from an outage happens on the way back up.

## Surge capacity, drills, and after-action review
Surge capacity is the reserve: where spare monitors, pumps, ventilators, and beds are stored, how they are kept charged, tested, and in date, who releases them, and how they are tracked while deployed so they come back. Take part in the hospital's drills with real equipment and real lists rather than sending a representative, because a drill is the cheapest place to discover that a list is wrong. Then write the after-action review: what worked, what failed, what will change, who owns it, and by when, with the changes carried back into the plan and the lists.

## Continuity for the CMMS itself
Your own system is a single point of failure. If the CMMS is down you cannot find an asset, answer a recall, prove a maintenance record, or document the event you are living through. So back it up on a schedule, store the backup away from the system it protects, test a restore and document it, and keep an offline copy of what you would need in the first hours: the critical equipment list, the emergency contact list, the vendor list with account numbers, and the location list for reserve equipment. Print it or keep it on a device that does not need the network.

> Exam tip: HTM owns the critical equipment list, the battery and emergency-power inventories, and the equipment side of every utility and downtime procedure. Recovery needs a written procedure as much as downtime does, drills end in an after-action review with owners and dates, and the CMMS itself needs a backup, a tested restore, and an offline copy of the lists.`,
      hook: "Emergency preparedness for HTM is a critical equipment list, an inventory of what each utility supports, tested battery and emergency-power lists, written downtime and recovery procedures, drills closed by an after-action review, and a CMMS you can survive without."
    }
  ]
});
