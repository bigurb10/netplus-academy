// CHTM Academy deeper explanations, units 1 to 3. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u1l1: `## Walking one dollar through the hospital
The fastest way to understand hospital money is to follow four requests that arrive in the same week and watch where each one goes.

\`\`\`
Request                              Pot        Approver                    Timing
A $280 pressure transducer for the   operating  the manager, inside the     today
shop's test bench                               policy limit
A $4,100 vital signs monitor to      capital    the capital committee, if   next fiscal
replace a failed unit                            it clears the threshold     year
A $38,000 unplanned repair on an     operating  finance, by exception, in   this month
imaging system out of contract                   writing
A $1,900 training seat for a         operating  the manager plus whoever    this quarter
technician                                       controls education money
\`\`\`
Three of the four are operating money and one is capital, and the only reason the monitor is capital is that it clears the hospital's capitalization threshold and has a long useful life. Change the threshold and the same device becomes an operating purchase. That is why the first question on any request is never "how much" but "which pot".

## The cycle, month by month
A fiscal year that starts in October is built in April and May, reviewed and negotiated in June, approved in July or August, and reported against from November onward. Work backward from that and two habits follow. First, the data you will use to build the budget has to exist by March, which means the cost history, the contract list with renewal dates, and the replacement plan are maintained all year rather than assembled in a panic. Second, a device you want in October has to be in the capital list written eighteen months earlier, so the clinical conversation starts long before the clinical department feels the need.

## Why consolidation changes a manager's job
\`\`\`
Question                        Distributed answer          Consolidated answer
What does this device cost      nobody can say; the parts   one report, from the CMMS
to maintain per year            are in six cost centers
Who holds the vendor to its     whoever has the invoice,    HTM, which pays and knows
response time                   usually without the data    whether the term was met
Who can withhold payment        a clinical manager who      HTM, until the service
for a missing service report    does not know it is missing report arrives
What happens when a repair      an argument between         the fiscal agreement says
exceeds a department's budget   departments                 in advance who carries it
Who sees total maintenance      nobody                      HTM and the chief
cost for the hospital                                       financial officer
\`\`\`
Consolidation is not a bookkeeping preference. It is the difference between a manager who can prove a contract is overpriced and a manager who can only suspect it.

## The irregular cost trap
A device needs a $14,000 assembly every eighteen months. Budget from last year's actual spending and the line is zero, because last year's cycle fell outside the year. Two years later the cost arrives twice in one year and the variance report looks like mismanagement. Large costs that recur on a long interval must be budgeted on their interval, not on last year's actual, and the chief financial officer decides how such a cost is carried: spread across years, held in a reserve, or taken as an exception when it lands. Ask the question before the fiscal year starts, in writing, and the answer protects you twice.

## What to memorize
\`\`\`
Operating budget      this year's expenses and revenue, spent and gone
Capital budget        long-lived items above the capitalization threshold,
                      depreciated across useful life
Cost center           the numbered account every cost posts to
Fiscal year           the hospital's twelve-month accounting year; often not
                      the calendar year
Built                 three to six months before the fiscal year starts
Distributed           HTM holds shop costs only; no visibility, no leverage
Consolidated          all equipment dollars under HTM, allocated back from CMMS
                      reports; needs a written fiscal agreement
\`\`\``,

u1l2: `## Reading a ledger detail line
Finance sends you a ledger extract. It looks like this, and every column matters.

\`\`\`
Date    Account  Cost ctr  Document   Vendor/Ref         Amount   Note
03-04   6421     7310      PO 84112   Parts supplier      1,284   pump board
03-07   6421     7310      PO 84119   Parts supplier        96    freight only
03-11   6190     7310      JE 2291    payroll             51,604   period 6
03-14   6540     7310      INV 55210  imaging vendor      15,000   contract, qtr 2
03-18   6421     6120      PO 84140   Parts supplier        612    pump board
03-22   6421     7310      PO 84151   Parts supplier         48    fuse, one each
\`\`\`
Four things are visible to a manager who knows what to look for. The 03-07 line is freight posted separately from the part, so the device's true parts cost is split across two documents. The 03-18 line posted to a different cost center, 6120, which is either a correct chargeback to a clinical department or a coding error, and only the work order tells you which. The 03-14 contract payment is a quarter of an annual contract, so annualizing a single month's purchased-maintenance figure would overstate the year by four times. And the 03-22 line is a $48 part on its own purchase order, which cost the hospital roughly $100 of overhead to raise: the order cost more than the part.

## Encumbrance, accrual, and the balance you can actually spend
\`\`\`
Event                                 Budget   Encumbered  Actual   Available
Start of month                        20,000            0        0     20,000
Purchase order raised for a $6,000    20,000        6,000        0     14,000
assembly
Assembly received in the month        20,000            0    6,000     14,000
(accrued as this month's expense)
Invoice paid two months later         20,000            0    6,000     14,000
\`\`\`
The available balance drops when you commit, not when you pay. That is the whole point of an encumbrance: it stops two managers from spending the same dollar. The accrual then books the expense in the month the assembly arrived, so the month's report reflects what the department consumed rather than what the payables clerk processed.

## The cost of miscoding, demonstrated
Take one imaging system over three years. The true picture and the miscoded picture are both internally consistent, which is why nobody notices.
\`\`\`
                              True       As coded      Why
Parts posted to the asset     42,000       11,000      31,000 went to a generic
                                                       supplies account
Vendor labor                  18,000       18,000      posted correctly
Annual service cost            20,000        9,667      three-year average
Original cost               400,000      400,000
Cost of service ratio           5.0%         2.4%       20,000 / 400,000 x 100
                                                       against 9,667 / 400,000
\`\`\`
A manager reading the miscoded column sees a cheap, reliable system and leaves the contract alone. A manager reading the true column sees a ratio twice as high and goes looking for the cause. The data did not lie; the coding did.

## What to memorize
\`\`\`
General ledger      the hospital's record of transactions, organized by account
Chart of accounts   the hospital's list of accounts and cost centers
Parts and in-house  maintenance and repairs
repair
Contracts and       purchased maintenance and repair
vendor labor
Training            travel and education; an expense, never capital
Encumbrance         money reserved the moment it is committed
Accrual             the expense booked in the month it was incurred
Purchase order      roughly $100 of hospital overhead per order
\`\`\``,

u1l3: `## A full monthly variance report, read line by line
This is period 6 of a twelve-month fiscal year, so half the year has elapsed. Brackets are negatives, and on an expense line a negative variance means overspending.

\`\`\`
                        ---------- Month 6 ----------    ------- Year to date -------
Account              Budget   Actual   Var      Pct      Budget   Actual     Var
Salaries             48,000   51,600  (3,600)  (7.5)    288,000  299,400  (11,400)
Overtime              2,000    5,100  (3,100) (155.0)    12,000   24,800  (12,800)
Employee benefits    13,500   15,100  (1,600) (11.9)     81,000   87,500   (6,500)
Maintenance/repairs  12,000    8,400   3,600   30.0      72,000   58,900   13,100
Purchased maint.     30,000   30,000       0    0.0     180,000  180,000        0
Travel/education      2,000    5,400  (3,400)(170.0)     12,000   13,100   (1,100)
Supplies              1,500    1,350     150   10.0       9,000    8,600      400
Total                109,000  116,950 (7,950)  (7.3)    654,000  672,300  (18,300)
\`\`\`

## Which of these is a real variance
\`\`\`
Line                 Reading                                 Real or timing
Salaries             over in the month and over year to       real: a position was
                     date by about 4%                         filled earlier than planned
Overtime             double the budget twice over             real, and the most
                                                              serious line on the page
Employee benefits    tracks salaries, because it is a rate    real, and follows from
                     applied to them                          the two lines above
Maintenance/repairs  favorable in the month and 18% favorable timing in part, real in
                     year to date                             part: see below
Purchased maint.     exactly on budget, as a contract paid    neither; verify it was
                     in equal installments should be           invoiced, not assumed
Travel/education     wildly over in the month, barely over    timing: school seats
                     year to date                              negotiated into a purchase
Supplies             small and favorable                      ignore it
\`\`\`
The maintenance and repairs line deserves a second look precisely because it is favorable. A department 18 percent under its parts budget at the half year is either buying better or not doing the work. Check the completion rate and the backlog before you report it as good news, because the favorable parts line and the unfavorable overtime line may be the same story: too few people, so scheduled maintenance slipped and the hours that were worked were paid at premium rates.

## The written explanation, as leadership should receive it
**Salaries, overtime, and benefits: $30,700 unfavorable year to date.** The approved second technician position was filled in month two rather than month six, and the vacancy it replaced was covered on overtime for the five months before that. Overtime also carries the coverage for one technician on extended leave. Scheduled maintenance completion has held at target, which is what the overtime bought.

**Action.** Overtime returns to budget from month seven with the new technician productive, and the leave coverage ends in month nine. The year-end forecast is $1,335,600 against a $1,308,000 annual budget, a 2.1 percent overage carried almost entirely by overtime already incurred. I will report again at month nine before requesting any amendment.

## Forecasting the year end from this page
\`\`\`
Step                                        Arithmetic              Result
Year-to-date actual                         672,300                 672,300
Months elapsed                              6
Monthly run rate                            672,300 / 6             112,050
Straight projection to twelve months        112,050 x 12          1,344,600
Less overtime correction from month 7       (2,100 x 6)            (12,600)
Plus known contract escalation in month 9   (900 x 4)                3,600
Adjusted forecast                                                 1,335,600
Annual budget                                                     1,308,000
Forecast variance                                                   (27,600)
\`\`\`
The straight projection and the adjusted forecast differ by $9,000, and the adjustments are the part leadership can actually act on. State them.

## What to memorize
\`\`\`
Variance          actual minus budget
Variance percent  variance / budget x 100
Favorable         expenses under budget, revenue over budget
Unfavorable       expenses over budget, revenue under budget
Explanation       usually required once a line is 5% or 10% off budget
Timing variance   closes by itself; check the year-to-date column
Explanation shape what, why, what you will do
Forecast          year-to-date actual / months elapsed x 12, then adjust
\`\`\``,

u1l4: `## A small balance sheet
This is a simplified hospital balance sheet on the last day of a fiscal year. It balances, because it must: assets equal liabilities plus equity.

\`\`\`
ASSETS                                      LIABILITIES
Cash and short-term investments    42,000    Accounts payable            31,000
Accounts receivable, net           88,000    Accrued salaries and
Inventories and supplies           14,000      benefits                  19,000
Property, plant and equipment               Current portion of debt      12,000
  Land and buildings              310,000    Long-term debt             186,000
  Medical equipment, at cost      240,000    Total liabilities          248,000
  Less accumulated
    depreciation                 (138,000)   EQUITY
  Net equipment                   102,000    Net assets                 308,000
Total assets                      556,000    Total liabilities
                                               and equity               556,000
\`\`\`
Find your inventory. Medical equipment is carried at $240,000 of original cost with $138,000 of accumulated depreciation against it, so its net book value is $102,000. That $102,000 is not what the equipment is worth, not what it would cost to replace, and not a statement about how much life it has left. It is cost minus the depreciation taken so far, and nothing else.

## The income statement for the same year
\`\`\`
Net patient service revenue                                       742,000
Other operating revenue                                            18,000
Total operating revenue                                           760,000

Salaries, wages and benefits                                      418,000
Supplies and drugs                                                152,000
Purchased services and maintenance                                 64,000
Depreciation and amortization                                      41,000
Interest                                                            9,000
Other operating expenses                                           58,000
Total operating expenses                                          742,000

Operating income                                                   18,000
\`\`\`
Three lines on this statement are yours. Salaries and benefits carries your staff. Purchased services and maintenance carries your contracts and vendor labor. Depreciation carries the capital items you asked for in previous years, which is the quiet reason a capital committee is cautious: every approval it grants becomes an expense line on this statement for a decade.

## Depreciation and book value, worked
\`\`\`
A $1,000,000 system, ten-year useful life, no salvage value
Annual depreciation      (1,000,000 - 0) / 10                100,000 per year
End of year 1 book value 1,000,000 - 100,000                   900,000
End of year 3 book value 1,000,000 - 300,000                   700,000
End of year 10 book      1,000,000 - 1,000,000                       0
value
Disposed in year 7       remaining book value written off       300,000
\`\`\`
The year-seven line is the one that reaches a manager. Replacing that system in year seven costs the hospital the new purchase plus a $300,000 write-off of remaining book value, and finance must agree to the write-off before the old asset moves. A fully depreciated device in year eleven, by contrast, can be disposed of with no write-off at all, which is occasionally the cheapest year to replace something.

## Payables, receivables, and GAAP in one page
\`\`\`
Term                What it is                     Your part in it
Accounts payable    what the hospital owes its      approve the invoice only when
                    vendors                         the work is done and the
                                                    service report is in the CMMS
Accounts            what the hospital is owed       chargebacks to clinical cost
receivable                                          centers and outside service
                                                    billing originate with you
Cash flow           cash in and out, split into     explains why an approved
statement           operating, investing,           capital item still waits
                    financing
GAAP                the standards accountants       why capital and expense are
                    follow to record and report     not interchangeable and why
                                                    the auditor wants the
                                                    receiving document
Business activity   the periodic summary of what    you write it: volumes, labor,
report              the department did and cost     cost by category, and trend
\`\`\`

## What to memorize
\`\`\`
Balance sheet       one day; assets = liabilities + equity
Income statement    a period; revenue - expenses = net income
Cash flow           cash in and out; profit is not cash
Straight-line       (cost - salvage) / useful life, per year
Book value          cost - accumulated depreciation
Fully depreciated   book value zero; says nothing about condition or life
Payable/receivable  owed to vendors / owed to the hospital
\`\`\``,

u1l5: `## The first case: insourcing a contract
The imaging service contract renews at $180,000 a year. You propose training two technicians and stocking parts instead.

\`\`\`
INVESTMENT (year one)
Service school, two technicians, tuition                      28,000
Travel and lodging                                             9,000
Test equipment and tools                                      22,000
Initial parts inventory                                        26,000
Total investment                                              85,000

ANNUAL EFFECT (from year one)
Contract cost avoided                                       180,000
New annual parts and consumables                             (34,000)
Retained vendor support for the one module staff cannot
  service                                                    (22,000)
Net annual saving                                            124,000
\`\`\`
\`\`\`
ROI, year one       (gain - cost) / cost x 100
                    (124,000 - 85,000) / 85,000 x 100            45.9%
Payback             cost / annual savings
                    85,000 / 124,000                         0.69 years,
                                                             about 8 months
ROI, cumulative     (124,000 x 2 - 85,000) / 85,000 x 100       191.8%
through year two
\`\`\`
Read both numbers. The first-year ROI of 45.9 percent is positive but unremarkable, because the investment and the saving both land in year one. The payback of about eight months is the number that wins the meeting, because it says the hospital's money is at risk for less than a fiscal year. State which year an ROI refers to, every time, or the figure means nothing.

## The second case: a project with a long payback
The same department proposes a $240,000 test and calibration facility that lets the hospital stop sending test equipment out and start calibrating for two nearby clinics.

\`\`\`
INVESTMENT
Build-out, bench, and environmental control                  165,000
Reference standards and calibration equipment                 61,000
Training and accreditation preparation                        14,000
Total investment                                             240,000

ANNUAL EFFECT
Outside calibration cost avoided                              31,000
Revenue from the two clinics                                  18,000
Added consumables, reference recalibration, and
  record keeping                                             (11,000)
Net annual benefit                                            38,000
\`\`\`
\`\`\`
ROI, year one       (38,000 - 240,000) / 240,000 x 100           -84.2%
Payback             240,000 / 38,000                        6.3 years
Five-year position  (38,000 x 5 - 240,000) / 240,000 x 100       -20.8%
Ten-year position   (38,000 x 10 - 240,000) / 240,000 x 100       58.3%
\`\`\`
This is a real proposal and a bad one at most hospitals, and the arithmetic is what tells you so. A payback of 6.3 years will fail almost any finance ceiling, and the investment does not turn positive until year seven. Bringing this to a committee without the ten-year line is dishonest; bringing it with the ten-year line and no acknowledgment of the ceiling is naive. The useful version of this proposal is smaller: buy the reference standards, keep sending the hard items out, and revisit.

## Total cost of ownership, compared properly
\`\`\`
                                 System A        System B
Purchase price                    410,000         370,000
Installation and site prep         26,000          48,000
Service, 10 years                 180,000         310,000
Parts outside contract, 10 years   40,000          62,000
Training                           14,000          22,000
Software licensing, 10 years       30,000          55,000
Consumables, 10 years              88,000          88,000
Disposal                            4,000           4,000
Ten-year total cost of ownership  792,000         959,000
\`\`\`
System B is $40,000 cheaper to buy and $167,000 more expensive to own. State the horizon, state every line, and let the committee see that the discount on the sticker was the smallest number on the page.

## Soft benefits with measurements attached
\`\`\`
Soft benefit        How to state it so it counts
Uptime              availability on these devices, from the current measured
                    figure to a target, reported monthly
Response time       total time to repair on this equipment type, baseline to
                    target, from CMMS data
Safety              use error and repeat repair counts on the fleet, baseline
                    to target
Satisfaction        the department's survey score for technical competence and
                    responsiveness, unchanged instrument, same question
Retention           voluntary turnover in the shop, with the replacement cost
                    avoided named
\`\`\`

## What to memorize
\`\`\`
ROI               (gain - cost) / cost x 100; say which year
Payback           cost / annual savings, in years; shorter is better
TCO               purchase + installation + service + parts + training +
                  software + consumables + disposal, over a stated horizon
Justification     problem, options, costs, benefits, risks, recommendation
Always include    what happens if nothing is funded
\`\`\``,

u1l6: `## Turning one year of CMMS data into three recommendations
A department pulls twelve months of its own records and lays them out by modality. Nothing here came from outside the hospital.

\`\`\`
Modality        Assets  Orig cost  Contract  In-house  Annual   COSR   Repeat
                                             parts     service          repairs
Infusion pumps     410  1,640,000         0    38,000   38,000   2.3%      11
Physio monitors    260  2,080,000         0    61,000   61,000   2.9%       8
Ventilators         64  1,920,000    96,000    18,000  114,000   5.9%       3
Imaging, vendor A    9  3,400,000   310,000    12,000  322,000   9.5%       2
Imaging, vendor B    6  2,100,000   378,000     4,000  382,000  18.2%       1
Lab analyzers       22  1,480,000   214,000     9,000  223,000  15.1%       6
Sterilizers         14    560,000    61,000    26,000   87,000  15.5%      14
\`\`\`

## What the table says
\`\`\`
Observation                                  Recommendation it supports
Vendor B imaging runs at 18.2% against       review the contract at renewal with
vendor A's 9.5% on comparable equipment      this comparison, or price a first-
                                              look arrangement on the easy calls
Sterilizers carry 14 repeat repairs on       investigate before spending: one
only 14 assets                               model, one technician, or a water
                                              quality problem upstream
Pumps and monitors run near 2 to 3%          leave them alone; this is what
                                              in-house service at volume looks
                                              like, and it is the benchmark you
                                              use on everything else
\`\`\`
Notice what the analysis did not do. It did not recommend insourcing vendor B's imaging, because the table does not say whether parts, training, or service software can be bought at all. The honest output of an analysis is sometimes a question with a date on it rather than a conclusion.

## Trending the same number across three years
\`\`\`
Metric                          Year 1    Year 2    Year 3   Reading
Scheduled maintenance            94.1%     95.6%     96.2%   holding, slight gain
completion
Open work orders at month end      112       141       188    deteriorating steadily
Average total time to repair      2.8 d     3.4 d     4.6 d   deteriorating
Overtime hours                     640       890     1,310    deteriorating
Assets supported                 1,480     1,660     1,910    up 29% in two years
Technicians                          6         6         6    flat
Assets per technician              247       277       318    the cause
\`\`\`
Three deteriorating metrics and one flat one make a single argument, and it is stronger than any one of them alone. Completion rate held only because overtime doubled, which means the department is buying its compliance at a premium rate. That is a staffing request that writes itself, and it is far more persuasive than a request that opens with "we are busy".

## Forecasting with the assumptions visible
\`\`\`
Assumption                                       Effect on next year
Two imaging systems arrive in month 4            +180 scheduled hours, +1 contract
A contract renews with a 5% escalation           +$18,900 purchased maintenance
One technician retires in month 7                -1,040 productive hours unless
                                                 backfilled
Pump fleet grows by 60 units                     +90 scheduled hours
No change to staffing                            assets per technician reaches 329
\`\`\`
Every line is a number somebody can argue with, which is exactly what makes the forecast credible. A forecast with hidden assumptions invites the reader to reject the whole thing.

## Benchmarking: what compares and what does not
\`\`\`
Measure                   Compares across hospitals   Why
Cost of service ratio     reasonably well             both numbers exist
                                                      everywhere and the ratio
                                                      cancels hospital size
Repeat repair rate        reasonably well             a ratio of the department's
                                                      own work to itself
Assets per technician     badly                       every hospital counts its
                                                      inventory differently
Labor hours per device    badly                       contract mix and site count
                                                      change it completely
Your own three-year       the most honest comparison  the definitions are yours
trend                     you have                    and they did not change
\`\`\`

## What to memorize
\`\`\`
Inputs            service history, cost, workload, inventory age and support
Past              what happened; Present: what is happening; Expected: where
                  the trend lands
Trend             at least three comparable periods, one constant definition
Forecast          run rate projected forward, then adjusted, assumptions named
Benchmark         ratios compare; counts do not
Output            one page: number, trend, cause, recommendation, the ask
\`\`\``

});
Object.assign(FRA.deep, {

u2l1: `## Scoring a replacement list the way a committee can read it
Twelve candidates, funding for four. Score every candidate on the same factors with the same weights, publish the weights first, and rank.

\`\`\`
Factor              Weight  How it is scored 1 to 5
Clinical need          5    5 = no alternative exists and care stops
Support status         4    5 = support withdrawn, no parts available
Condition and          4    5 = failing repeatedly, calibration will not hold
reliability
Cost of service        3    5 = annual service cost far above the fleet norm
Downtime impact        3    5 = cases canceled when it is down
Age against useful     2    5 = well past the schedule's life expectancy
life
Regulatory driver      5    5 = a standard, code, or recall forces the change
\`\`\`
\`\`\`
Candidate                  Need Supp Cond Cost Down Age  Reg  Weighted  Rank
Sterilizer, main OR          5    4    5    4    5    4    3      111     1
Imaging console, vendor B    4    5    4    5    4    5    1       98     2
Anesthesia machines (3)      5    3    3    3    4    3    3       91     3
Physio monitors, unit 4      3    4    4    3    3    5    1       80     4
Lab centrifuges (6)          2    2    4    2    2    4    1       59     5
Exam tables (11)             1    1    3    1    1    4    1       40     6
\`\`\`
Then say what the hospital carries if items five and six are not funded, carry them into next year's plan with their scores and dates, and keep the scoring sheet. The committee's real question is never "is this device old" but "why this one before that one", and a published, weighted sheet answers it in one page.

## The replacement signals, and how early each one arrives
\`\`\`
Signal                            Lead time before failure matters
Manufacturer end-of-support       often announced years ahead; the longest and
notice                            cheapest warning you will get
Rising annual cost per device     two to three years of CMMS data shows it
Parts lead times lengthening      six to eighteen months, and visible only if
                                  somebody records lead times
Calibration drifting toward       months; visible in performance verification
the limit                         records rather than in failures
A failure that cancels cases      no lead time at all; this is the warning you
                                  were supposed to have avoided
\`\`\`

## Useful life is an input, not an answer
A published life-expectancy schedule says a device type averages a certain number of years across the country. Your device is not the average. Two identical analyzers bought the same day, one running three shifts in a busy core lab and one running intermittently in a clinic, will not reach end of life in the same year, and the schedule cannot know that. Use the schedule to set depreciation and to start a conversation; use your own failure and cost data to decide. And remember that end of life is a commercial decision by the manufacturer. The device does not become unsafe on the announced date; it becomes unsupportable, which is a different and slower problem that you manage with a parts buy, a service strategy change, and a date in the capital plan.

## What the file behind each line holds
\`\`\`
Asset record            number, model, serial, install date, original cost,
                        location, clinical owner
Cost history            annual parts, labor, and contract cost by year
Failure history         work orders, repeat repairs, downtime hours
Support evidence        the manufacturer's notice, dated, in writing
Clinical statement      the department's written need and consequence
Score sheet             the factors, the weights, the values, the date, and
                        who scored it
Decision                funded, deferred, or declined, with the date and body
\`\`\`

## What to memorize
\`\`\`
Useful life inputs   manufacturer guidance, industry life-expectancy schedule,
                     own failure trends, parts and support availability, end of
                     support date, technology change
End of life          the manufacturer stops supporting; not a safety verdict
Support guarantee    none; no law requires parts or support for any period
Replacement list     age, condition, cost of service, downtime, clinical need,
                     support, regulatory driver
Plan                 multi-year, refreshed annually, ranked, with a file per line
\`\`\``,

u2l2: `## The contract term checklist
Work this list before signing and again at every renewal. A term you did not ask about is a term the vendor wrote in its own favor.

\`\`\`
#   Term                   The question to ask                      Why it bites
1   Scope                  which devices, modules, and              an uncovered module
                           accessories, by serial or asset          is a full-rate call
                           number, and during what hours
2   Cost                   the annual price, the same options       the sticker price
                           priced over the same years, and the      hides the ratio
                           cost of service ratio it works out to
3   Compliance             are their people qualified, will they    a surveyor asks for
                           supply training and competency           records you do not
                           records, will the work be documented     have
                           in the CMMS, do their intervals meet
                           your plan and your accreditor
4   Response: phone        time to a phone response, stated         "we will respond
                           separately                                promptly" is nothing
5   Response: on site      time to arrival, with the remedy when    no remedy means no
                           it is missed                              obligation
6   Uptime guarantee       the promised availability, how it is     measurement method
                           measured, and the remedy                 decides the number
7   Parts included         included or not; glassware and major     exclusions here are
                           assemblies specifically                   the biggest money
8   Parts condition        new, refurbished, or exchange             affects reliability
                                                                     and resale
9   Loaners                provided, how fast, at whose cost        a loaner clause is
                                                                     cheaper than downtime
10  Scheduled              included, at what interval, documented   a vendor interval
    maintenance            where                                     may not meet the plan
11  Software updates       included or licensed separately           a separate license
                                                                     can rival the contract
12  Training               seats, level, location, and whether      no manuals means no
                           manuals and passwords come with them      in-house work ever
13  Remote access          who connects, how, who approves each     an unlogged tunnel
                           session, what is logged                   into a clinical device
14  Exclusions             the full list: batteries, accessories,   this list, not the
                           probes, abuse, after-hours, software,     coverage list, sets
                           travel                                    your real cost
15  Termination            notice required and penalty owed          a ten-year term with
                                                                     no exit is a decade
16  Renewal                does it renew automatically                an auto-renewal that
                                                                     passed is binding
17  Escalation             the cap on an annual price rise           uncapped escalation
                                                                     compounds
18  Indemnity and          who answers for injury, data loss, and   the hospital carries
    insurance              damage during service, and what cover     what the vendor does
                           the vendor carries                        not
19  Business associate     required where the vendor touches        a missing one is a
    agreement              patient data                              compliance finding
20  Entire agreement       the signed contract is the whole deal    nothing said in a
                                                                     meeting survives it
\`\`\`

## Measuring the vendor across a year
\`\`\`
Measure                        Source               Contract term     Actual
Calls placed                   CMMS                 n/a                  34
Phone response within 2 hours  CMMS timestamps      100%                 91%
On site within 8 hours         CMMS timestamps      100%                 74%
Scheduled maintenance          CMMS                 4 per year      3 per year
delivered
Service reports within 24      CMMS attachments     100%                 62%
hours
Uptime on the covered system   downtime log         98%               96.1%
Parts actually consumed        service reports      n/a           $21,400
Annual contract price          finance              n/a          $180,000
\`\`\`
That table is a negotiation. The vendor met three quarters of its on-site commitment, delivered three of four scheduled visits, and consumed $21,400 of parts against a $180,000 price. You are not asking for a favor at renewal; you are asking to be charged for what was delivered.

## Cost of service ratio, worked three ways
\`\`\`
COSR = annual service cost / acquisition cost x 100

The quoted contract      180,000 / 1,000,000 x 100              18.0%
In-house on comparable    61,000 / 2,080,000 x 100               2.9%
equipment
The same system under a   22,000 + 34,000 = 56,000
first-look arrangement    56,000 / 1,000,000 x 100               5.6%
Normal hospital band                                       4% to 25%
Manufacturer service, typical                             10% to 25%
Full in-house service, achievable                           4% to 6%
\`\`\`
The contract at 18 percent sits inside the normal band and still costs three times the first-look alternative. A number inside the band is not automatically a good number, which is why you compare against your own department rather than against a published range.

## What to memorize
\`\`\`
Exclusions          decide the real cost; ask for the list by name
Response            phone time and on-site time, separately, with a remedy
Entire agreement    the signed contract is the whole deal; terms up to ten years
Measure all year    CMMS records of calls, response, scheduled visits, reports
COSR                annual service cost / acquisition cost x 100
Leverage            before the signature and before the capital purchase closes
\`\`\``,

u2l3: `## Pricing four arrangements on the same device
One $1,000,000 imaging system, five-year comparison, same assumptions throughout.

\`\`\`
                        Full       Parts      First      Time and
                        service    only       look       materials
Annual contract price   180,000     62,000     98,000           0
Parts bought by HTM           0     14,000     11,000      46,000
Vendor labor per call         0     41,000          0      68,000
Training, amortized           0      6,000      6,000       6,000
Test equipment,               0      4,000      4,000       4,000
amortized
In-house labor cost           0     22,000     18,000      29,000
Annual total            180,000    149,000    137,000     153,000
Five-year total         900,000    745,000    685,000     765,000
COSR                      18.0%      14.9%      13.7%       15.3%
Downtime risk            lowest    moderate   moderate     highest
\`\`\`
First look wins on this device under these assumptions, and the assumptions are the argument. Change parts availability and the parts-only and first-look columns collapse. Change call volume upward and time and materials becomes the worst option rather than the middle one. Always show the assumptions beside the totals.

## Who carries the risk, in one table
\`\`\`
Arrangement             Hospital's exposure                Vendor's exposure
Full service            price certainty; you overpay for   every failure, at a
                        the years nothing breaks            fixed price
Parts only              all labor and all downtime         part price only
Time and materials      every call, every part, every      nothing
                        hour; this is self-insurance
Shared risk             whatever the formula assigns       whatever the formula
                        above the pool                      assigns below it
First look              routine calls and the cost of       the hard calls you
                        training staff to handle them       escalate
Preventive only         every failure                      the scheduled visits
Software support        anything the license does not      exactly what the
                        list                                license lists
Multi-vendor service    the subcontractor chain you did    the service company's
                        not choose                          margin layer
Point-of-sale warranty  the premium, the margin, and the   almost nothing
                        cancellation penalty
Equipment insurance     the claims administration load    the covered work
In-house                everything, at the lowest unit     none
                        cost when volume supports it
\`\`\`

## The in-house decision, scored on a real device
\`\`\`
Factor              Finding on this model                         For or against
Volume              9 units, roughly 140 service hours a year     for
Skills              one senior technician already trained;        marginal: single
                    nobody else                                   point of failure
Training cost       $14,000 per seat plus two weeks away          against, until two
                                                                  seats are funded
Test equipment      $22,000, calibrated annually                  neutral, reusable
                                                                  across the fleet
Parts access        manufacturer sells parts and service keys     for; this is the
                    to owners, in writing                         decisive one
Response time       staff on site in minutes; vendor in 8 hours   strongly for
Risk                two backup units available                    for
Regulatory          no qualification required beyond competency   neutral
                    assessment
\`\`\`
The decision here is first look with two trained seats, not full insourcing, because the skills row says one person is not a program. Write that reasoning down: the next manager will otherwise read the decision as a preference rather than a conclusion.

## Reviewing the mix every year
\`\`\`
Trigger to revisit an arrangement        What usually changes
Call volume fell by a third              move from full service to first look
The trained technician left               move back to vendor coverage until a
                                          replacement is trained
Parts stopped being sold to owners        in-house service ends, whatever the
                                          cost comparison says
The fleet grew from 6 units to 20         in-house becomes viable on volume
A new model replaced the old one          every assumption resets
\`\`\`

## What to memorize
\`\`\`
Full service       vendor risk, highest price
Parts only         shared; your staff work
Time and materials self-insurance; managed well, up to 60% cheaper than a
                   contract
Shared risk        a pool or cap with a formula; read the formula
First look         in-house first, vendor on the hard calls
Preventive only    scheduled work only; you carry every failure
Point-of-sale      worst value; margin up to 90%, penalties on cancellation
In-house factors   volume, skills, training cost, test equipment, parts access,
                   response time, risk, regulatory
\`\`\``,

u2l4: `## One part, five sources, one decision
A ventilator blower assembly. The device is life support and the hospital owns nine of them.

\`\`\`
Source          Price    Lead      Warranty   Traceability        Decision
Manufacturer    4,200    14 days   12 months  full, documented    acceptable
Third-party     1,900    1 day     6 months   supplier will       acceptable with
supplier                                       document origin     the documentation
                                               and test records    on file
Refurbished     1,450    3 days    90 days    states what was     acceptable only
assembly                                       replaced            with the report
Exchange unit   1,100    2 days    6 months   full, core owed     best value if the
                                               back                core is returned
Broker, surplus   700    1 day     none       none                refuse
\`\`\`
The broker's part is the cheapest line on the page and the only one that is not a candidate, because this is life support and nothing documents what the part is. Price is the last column you read on a critical device, not the first.

## Setting stock levels from consumption
\`\`\`
Item              Used    Lead     Reorder   Stock   Turns   Reading
                  /year   time     point     held    /year
Pump cassettes      240   3 days      12        30     8.0   healthy
Monitor batteries    96   7 days      10        24     4.0   healthy
Blower assemblies     3  14 days       1         1     3.0   correct: one on
                                                              the shelf
ECG module            1  21 days       0         4    0.25   overstocked; four
                                                              years of supply
Obsolete sensor       0   n/a          0         7     0.0   write it off and
                                                              free the shelf
\`\`\`
Turns is annual usage divided by stock held. A low turn number is money sitting on a shelf becoming obsolete. The ECG module line is the common error: a technician ordered four during a bad month five years ago and nobody looked again.

## The purchase order overhead, demonstrated
\`\`\`
Approach                        Orders  Part cost  Overhead  Total
Order each item as it is          26      3,180     2,600    5,780
needed, roughly $100 per order
Consolidate into a monthly        12      3,180     1,200    4,380
order
Consolidate into a quarterly       4      3,180       400    3,580
PM kit order
\`\`\`
Nothing changed about the parts. Consolidation saved $2,200 of hospital overhead, which is more than most negotiated part discounts return.

## Test equipment and calibration
\`\`\`
Test equipment         Matched to                  Calibration
Electrical safety      every line-powered device   annually, traceable to the
analyzer                                           national standards kept by NIST
Patient simulators     monitors, defibrillators,   annually; certificates on file
                       pumps
Gas and flow           ventilators, anesthesia     annually, plus a verification
analyzers              machines                    after transport
Pressure and           pressure transducers,       annually
vacuum meters          suction
Electrosurgical        electrosurgical units       annually
analyzer
\`\`\`
Calibration is bought with the instrument, on a schedule, with certificates retained. A reading taken with an out-of-calibration analyzer invalidates the record it produced, which can mean re-testing a fleet and explaining it to a surveyor.

## The purchasing policy sequence
\`\`\`
1  Written specification          what is being bought, to what standard
2  Quotes                         the number the policy requires at this value
3  Sole source justification      in writing, where only one source exists
4  Approvals                      every signature the policy requires, in order
5  Purchase order                 raised before the goods or the work arrive
6  Receiving                      goods checked against the order, documented
7  Invoice matching               invoice against order against receiving
8  Payment approval               only when all three agree and the service
                                  report is in the CMMS
\`\`\`
A verbal order skips steps 4 to 6 and leaves the hospital with a commitment nobody approved. That is the audit finding, not the price.

## What to memorize
\`\`\`
Source risks        quality, warranty, traceability, counterfeit exposure
Life support        never an untraceable part
Turns               annual usage / stock held; low turns is dead money
Consignment         vendor-owned until used; reconcile it
Purchase order      roughly $100 of overhead each; consolidate
Calibration         annual, traceable to NIST, certificates on file
Policy sequence     specification, quotes, approvals, order, receiving, match
\`\`\``,

u2l5: `## Establishing fair market value on a real asset
A seven-year-old imaging system, original cost $400,000, ten-year useful life, no salvage.

\`\`\`
Measure                    Value      What it is
Original cost            400,000      what the hospital paid
Accumulated depreciation 280,000      7 years x $40,000
Book value               120,000      cost minus accumulated depreciation
Replacement cost         520,000      what a new equivalent costs today
Dealer quotes, cash       38,000      two used-equipment dealers, as-is
Broker estimate, after    44,000      net of commission and de-installation
sale
Vendor trade-in credit    25,000      offered against the replacement
Fair market value         38,000      what a willing buyer pays today, from
to 44,000                             current market evidence
\`\`\`
Four numbers, and only one of them is fair market value. The trade-in credit is $13,000 to $19,000 below the market, which is the usual relationship, and it is offered because it is convenient. Price the open market before you accept one, and have the hospital's policy name who determines fair market value so the person negotiating the replacement is not also the only judge of the old asset's worth.

Now the financial consequence. Selling for $40,000 against a $120,000 book value writes off $80,000 of remaining book value, and finance must agree to that in advance. Waiting three years until the asset is fully depreciated removes the write-off entirely, which is occasionally a real argument for timing a replacement.

## Purchase, lease, and rental compared
\`\`\`
                     Purchase        Capital lease    Operating lease   Rental
Money used           capital         capital-like     operating         operating
Balance sheet        asset and       asset and        usually not on    no
                     depreciation    obligation       the balance sheet
Who owns it at the   the hospital    usually the      the lessor        the lessor
end                                  hospital
Who maintains it     the hospital    read the terms   read the terms    the lessor,
                                                                        usually
Who insures it       the hospital    read the terms   read the terms    read it
Return condition     n/a             n/a              specified, and    specified
                                                      enforced
Data at end of term  yours to wipe   yours to wipe    WIPE IT BEFORE    wipe it
                                                      IT GOES BACK
Best suited to       long life,      a purchase the   short technology  weeks to
                     stable          hospital wants   cycles, trials    months
                     technology      to pay over time
\`\`\`
The row in capitals is the one HTM exists to catch. A leased device returned at end of term with patient data still on its drive is a breach, and the lessor is not going to raise it.

## Asset recovery, ranked by what the hospital actually recovers
\`\`\`
Route            Typical recovery          What it costs you
Redistribute     full remaining use value  internal transfer, inventory update,
internally       to the organization       and a service history that follows it
Sell to a dealer cash, below book value    de-installation, listing, negotiation,
or broker                                  loading; count the labor
Trade-in         the lowest cash value     nothing; that is what you are paying for
Donate           no cash; goodwill and a   shipping, a serviceable device, and a
                 device in service abroad  policy that says who chooses the charity
Recycle          little or nothing         a compliant, documented route for
                                           batteries, mercury, sealed sources,
                                           refrigerants, and electronics
\`\`\`

## The disposal record
\`\`\`
Field                        Example entry
Asset number                 BM-14027
Manufacturer, model, serial  as recorded in the inventory
Reason for disposal          end of support; replaced under capital plan
Approval                     policy reference, approver name, date
Book value at disposal       $120,000, write-off agreed by finance, date
Data held                    yes: patient images on internal drive
Wipe or destruction method   drive removed and destroyed; certificate attached
Decontamination              performed, method, date, by whom
Environmental handling       lead shielding and batteries to the licensed route
Method of disposal           sold to dealer, $40,000, invoice reference
Date removed from inventory  with the CMMS record closed, not deleted
Signature                    manager, and the second signature policy requires
\`\`\`
The CMMS record is closed rather than deleted, because a recall notice or an audit may still name that serial number next year.

## What to memorize
\`\`\`
Fair market value    what a willing buyer pays today; not book value, not
                     replacement cost
Capital lease        behaves like a purchase; the asset is on the balance sheet
Operating lease      an expense across the term; the device goes back
Order of preference  redistribute, sell, donate, recycle
Before it leaves     approval, data wipe, decontamination, environmental
                     handling, documentation, inventory removal
Financial check      remaining book value is written off; finance agrees first
\`\`\``,

u2l6: `## The one-page recommendation
This is the whole document. Anything longer is an attachment.

\`\`\`
TO          Capital Committee
FROM        Healthcare Technology Management
SUBJECT     Replacement of three anesthesia machines, OR 2, 4 and 6
DECISION    Approve Option B, $462,000 capital, in the current fiscal year
REQUESTED

NEED        The three machines reach end of manufacturer support in
            November. Parts and service training are withdrawn on that
            date. Surgical services runs 2,100 cases a year through
            these rooms and has no alternative machine on site.

OPTIONS     Ten-year total cost of ownership, all three rooms
            A  Do nothing              0 capital, support ends,
                                       no compliant service strategy
            B  Replace with the        462,000 capital, 318,000 service
               hospital's current      and parts, 780,000 total
               standard model
            C  Replace with a new      418,000 capital, 455,000 service
               manufacturer            and parts, 873,000 total, plus
                                       training and test equipment

RECOMMEND   Option B. It is $93,000 cheaper over ten years despite a
            higher purchase price, it matches six machines already in
            service, and staff are already competent on the model.

RISKS       Delivery is 16 weeks; order by June to install before
            November. Mitigation: order on approval, not on delivery of
            the capital release.
            One room requires a gas outlet change. Facilities has
            quoted $11,000, included above.

IF NOT      From November the machines run with no manufacturer support,
FUNDED      no parts route, and no compliant service strategy. Surgical
            services would need to reduce to three rooms on any failure.
\`\`\`
Note what is in the first four lines: the decision requested, the money, and the date. A committee can approve that. Note also that Option A exists and is described honestly, because a recommendation with no alternative reads as a demand.

## The evaluation record, as a checklist with owners
\`\`\`
#   Element                      Owner                 Evidence in the file
1   Clinical need and volume     clinical director     signed statement
2   Serviceability               HTM                   parts, manuals, software,
                                                       and training confirmed in
                                                       writing by the maker
3   Test equipment and tools     HTM                   list and cost
4   Space, power, gases, site    HTM with facilities   drawing and quote
    preparation
5   Network and interfaces       HTM with IT           written agreement on
                                                       addresses, segment, and
                                                       the record interface
6   Cybersecurity review         HTM with the          MDS2, operating system
                                security officer       support horizon, patch
                                                       method, authentication,
                                                       encryption, remote access
7   Service strategy, priced     HTM                   in-house, contract, or
                                                       time and materials, over
                                                       the life
8   Total cost of ownership      HTM with finance      the ten-year comparison
9   Standardization              HTM                   what the hospital owns
                                                       and what a new model adds
10  References                   HTM                   two facilities contacted
                                                       directly, plus what MAUDE
                                                       already holds on the model
11  Conflict disclosures         every evaluator       signed, dated
12  Options compared             HTM                   including doing nothing
\`\`\`
Row 10 has a rule attached: contact the references yourself. A reference list supplied by the vendor and never called is worse than no reference list, because the file now implies a check that did not happen.

## Conflicts of interest, in practice
\`\`\`
Situation                                   What a defensible manager does
A vendor offers to fly you to a user        check the policy; usually permissible
meeting during an active evaluation         only if the hospital pays, or not at all
                                            during an evaluation
A vendor offers lunch for the shop          disclose it; follow the policy's value
                                            threshold
A vendor asks what the other bid was        decline; pricing stays confidential
                                            between bidders
A vendor offers to write the technical      decline; they may answer your
specification                               questions, they may not set them
A relative works for a bidder               disclose in writing and recuse yourself
                                            from scoring
A vendor's representative is a friend       disclose, document, and keep every
                                            communication inside the process
\`\`\`
The test is the file: would this look defensible written down, because one day it will be read by somebody who was not there.

## What the file holds for an audit
\`\`\`
Specification and the requirement it came from
Who was asked to quote, and the quotes received
The evaluation record above, complete, with dates
Conflict disclosures, signed
The recommendation as submitted
The committee minutes or written approval
The purchase order and any sole-source justification
Acceptance test results and the incoming inspection
The approved service strategy and the contract, if one was signed
Training delivered and competency recorded
\`\`\`

## What to memorize
\`\`\`
HTM's role        consult early, evaluate, recommend; do not decide alone
Evaluation record clinical input, technical review, cybersecurity review,
                  service strategy, total cost of ownership, standardization,
                  verified references
Conflicts         disclose, follow policy, treat all bidders identically,
                  keep pricing confidential
Recommendation    one page, one recommendation, decision and money in the
                  first lines, and what happens if nothing is funded
The file          shows how the decision was made and that the same rule
                  applied to everyone
\`\`\``

});

Object.assign(FRA.deep, {

u3l1: `## A risk register page, as a risk manager wants to receive it
Five entries from a real department, scored on a 1 to 5 scale for likelihood and consequence, with the product as the score.

\`\`\`
#  Risk statement                      Category      L  C  Score  Owner
1  The single sterilizer in the main   patient       4  5     20  HTM manager
   OR fails and cases are canceled;    safety and             with surgical
   it has failed twice this year        operations             services
2  Eleven legacy monitors run an       regulatory    3  5     15  HTM manager
   operating system no longer           and patient            with the
   supported; they cannot be patched    safety                 security officer
3  Infusion pumps on three units are   patient       3  4     12  clinical
   programmed without the drug          safety                 director,
   library because staff bypass it                             nursing
4  No documented downtime procedure    emergency     2  5     10  HTM manager
   exists for the imaging archive       preparedness           with IT
5  Scheduled maintenance backlog has   regulatory    4  2      8  HTM manager
   grown for three quarters
\`\`\`
\`\`\`
#  Controls already in place             Action, owner, date
1  quarterly scheduled maintenance;     capital request for a second unit
   a loaner agreement with a nearby     submitted; interim written transfer
   hospital                             agreement signed; HTM, by 30 June
2  on a separate network segment;       replacement in the three-year capital
   no internet reachability             plan; compensating controls documented
                                        and accepted; HTM and security, by
                                        31 March
3  library installed; training          observation audit on all three units,
   delivered at install                  then in-service on every shift;
                                        nursing education, by 15 May
4  none                                 downtime procedure drafted and tested
                                        in the next drill; HTM with IT, by
                                        31 July
5  weekly backlog review                staffing analysis attached to the
                                        budget request; HTM, by 1 September
\`\`\`
Everything a manager needs to answer "what are your top five" is on those two pages, and every line has a name and a date on it. A register without owners and dates is a list of complaints.

## Likelihood and consequence, and why both are required
\`\`\`
Risk                            Likelihood  Consequence  Score  Response
Exam light bulb fails               5            1          5   spares on the cart
A defibrillator fails to            1            5          5   test it, every time,
deliver on a code                                               and never run to
                                                                failure
\`\`\`
Identical scores, opposite responses. That is why a score ranks work but never replaces judgment, and why the severity dimension gets read on its own before any ranked list is accepted.

## Reading your own data for risk
\`\`\`
Source                 What to pull                    What it reveals
Incident reports       every event where a device was   events your shop never
                       present, device named or not     heard about
CMMS service history   repeat repairs within 30 days,   a bad model, a bad part,
                       use error codes, cannot-         or a training gap
                       duplicate calls
Recall and advisory    open notices, and the age of     a compliance exposure
log                    the oldest
Survey findings        every finding touching           where the accreditor
                       equipment, internal or external  already told you
Staff rounds           the workaround nobody reported   the risk that is invisible
                                                        in every database
Near misses            the events that did not reach    the cheapest data you
                       a patient                        will ever get
\`\`\`

## Ownership and escalation
\`\`\`
Risk area                               Owner                  HTM's part
Equipment condition and maintenance     HTM                    all of it
strategy
Operator competence and device use      clinical department     measure and report
                                                                use error trends
Network and security controls           IT and the security     joint; inventory,
                                        officer                 MDS2, and the
                                                                device knowledge
Power, gases, water, ventilation        facilities              which devices
                                                                depend on each
Hospital risk tolerance and the         risk management         state the risk and
investigation                                                   price the options

Escalate immediately when
  a device has harmed a patient
  a Class I recall names equipment you own
  a control you recommended has been refused
  the risk exceeds your authority or your budget to control
Escalate in writing, name what you recommended, keep the copy.
\`\`\`

## What to memorize
\`\`\`
Five categories   patient safety, operations, financial, emergency
                  preparedness, regulatory
Risk              likelihood and consequence, both stated
The trade         risk and cost move in opposite directions; risk management
                  decides what is acceptable
Sources           incident reports, service history, recalls, surveys, staff
                  rounds, near misses
Register          statement, category, likelihood, consequence, score,
                  controls, owner, action, date, review date
\`\`\``,

u3l2: `## Building a scoring model you can defend
There is no national threshold to look up, so the hospital writes its own and writes it down first. Here is one complete methodology, with this course's own 1 to 5 scales.

\`\`\`
Equipment function           Physical risk of failure
5  life support              5  death
4  therapeutic               4  injury
3  diagnostic                3  misdiagnosis or mistreatment
2  analytical                2  delay in care
1  support or utility        1  inconvenience only

Likelihood of failure        Maintenance requirement
5  fails more than once a    5  extensive: calibration, filters, batteries,
   year per unit                moving parts
4  roughly annually          4  significant scheduled work
3  every two to three years  3  moderate
2  rarely                    2  minor
1  almost never              1  essentially none

Incident history             Backup availability
5  documented events on      5  no alternative device anywhere
   this or very similar      3  an alternative exists on another unit
   equipment                 1  identical spares on the shelf
3  service requests but no
   patient events
1  none
\`\`\`

## The worksheet, scored and banded
\`\`\`
Device type        Func Phys Like Maint Inc Back  Score  Band   Strategy
Ventilator           5    5    3     5    3    5     26  high   manufacturer
                                                                 interval, full
                                                                 scheduled
                                                                 maintenance,
                                                                 critical list
Infusion pump        4    4    3     3    3    1     18  high   manufacturer
                                                                 interval; spares
                                                                 on the shelf
Anesthesia machine   5    5    2     5    1    3     21  high   manufacturer
                                                                 interval
Diagnostic ECG       3    3    2     3    1    1     13  med    annual, risk
                                                                 assessment on
                                                                 file
Infant scale         2    1    2     2    1    1      9  low    annual
                                                                 inspection and
                                                                 verification only
Exam light           1    1    3     1    1    1      8  low    run to failure,
                                                                 documented
Bands: 18 and above high, 11 to 17 medium, 10 and below low
\`\`\`
This is the same model and the same bands the lesson works, extended to six device types. The bands are this methodology's own, published before the scoring and applied to every device type the same way. That is the defensible part. A surveyor is not checking your arithmetic against a national table; there is no national table. A surveyor is checking that a written method, approved by whoever owns the equipment management plan, was applied by qualified people and then followed.

## What the alternative program may and may not hold
\`\`\`
Question                          Answer
What may be changed               how often maintenance, inspection, and
                                  testing happen, and what they include
On what authority                 a risk assessment by qualified personnel,
                                  hospital employees or contractors
What may NEVER be included        imaging and radiologic equipment, diagnostic
                                  or therapeutic; medical laser devices; new
                                  equipment without enough maintenance history
What blocks a change anyway       any other federal or state law, or a
                                  condition of participation, that requires the
                                  manufacturer's schedule
New equipment                     manufacturer's recommendations until there is
                                  enough history from the hospital, its
                                  contractor, or nationally recognized sources
Evidence required per type        function and consequences of failure, how
                                  serious the likely harm is, likelihood of
                                  failure, maintenance requirements,
                                  availability of alternative or backup
                                  devices, incident history of identical or
                                  very similar equipment
Documentation                     written policies and procedures, the risk
                                  methodology, the evidence per type, and the
                                  activities and frequencies chosen
Adherence                         follow the activities and frequencies you
                                  set, strictly
Identification                    equipment in the program must be readily
                                  identifiable, and so must critical equipment
\`\`\`

## Re-scoring: the triggers and what changed
\`\`\`
Trigger                              Example outcome
A patient event on this model        incident history rises from 1 to 5; the
                                     band moves from medium to high and the
                                     interval returns to the manufacturer's
A year of clean history on a         likelihood falls; the medium band is
device with a thin record            confirmed rather than assumed
The manufacturer changes its         the baseline changed; re-assess the
guidance or issues a notice          whole type
The fleet drops from 20 units to 3   backup availability rises from 1 to 5
A new service is added that makes    function and physical risk both rise
the device the only one of its kind
The review interval in the plan      scheduled re-score, whether or not
arrives                              anything changed
\`\`\`

## What to memorize
\`\`\`
Inputs            equipment function, physical risk of failure, likelihood of
                  failure, maintenance requirement, incident history, backup
                  availability
Thresholds        set by the hospital, written before the scoring, applied
                  uniformly, approved
High              manufacturer interval, full scheduled maintenance, critical
                  equipment list
Medium            an interval the risk assessment supports, evidence on file
Low               inspection only, or documented run to failure
Never in an AEM   imaging and radiologic, lasers, new equipment without
program           history
Then              follow the frequency you set, strictly
\`\`\``,

u3l3: `## A control decision, worked down the hierarchy
A pump fleet has produced three wrong-concentration events in a year. Here is the same risk addressed at five different levels, with what each costs and how long it lasts.

\`\`\`
Level        Control                          Cost        How long it holds
Eliminate    retire the two models without    $380,000    permanently; the
             a drug library                   capital     hazard is gone
Substitute   standardize the whole fleet on   $140,000    permanently for the
             the model that has hard limits   capital     devices replaced
Engineer     configure hard concentration     $0 to        indefinitely; it
             limits in the library on every   $9,000       works whether or not
             pump that supports them          of labor     anyone is watching
Administer   a policy requiring a second-     staff time   as long as staffing,
             person check, plus a procedure   only         attention, and
             and an audit                                  turnover allow
Protect      nothing applicable; personal     n/a          n/a
             protective equipment does not
             address a dosing error
\`\`\`
The recommendation here is the engineering control first, because it costs almost nothing and does not depend on attention, with the substitution carried into the capital plan and the administrative control used only on the devices that cannot take a hard limit. Bring all of it to the committee. A committee shown one option has been handed a decision, not asked for one.

## A procedure that controls a risk, in full
\`\`\`
TITLE        Securing a device involved in a patient event
PURPOSE      To preserve the device and its evidence so the hospital can
             determine cause and meet its reporting obligations.
OWNER        HTM manager        VERSION 3      REVIEW BY  next March
TRIGGER      Any report that a patient was or may have been harmed while a
             medical device was in use.

STEPS
1  The clinical staff remove the device from patient use immediately and
   do not clean, adjust, reset, or power it off.
2  The charge nurse calls HTM and the risk manager. HTM responds on site.
3  HTM photographs the device, screen, controls, and connections as found.
4  HTM collects the accessories, cables, sensors, and disposables in use,
   including packaging and the contents of the room's trash.
5  HTM pulls event and error logs by the manufacturer's documented method
   and records who pulled them and when.
6  HTM tags the device OUT OF SERVICE, moves it to the secured location,
   and records the chain of custody.
7  HTM supplies the device identification to the risk manager within one
   hour: manufacturer, model, serial, software version, lot numbers.
8  No repair, calibration, update, or return to service occurs until the
   risk manager releases the device in writing.

IF A STEP CANNOT BE COMPLETED
   Record what could not be done and why, and notify the risk manager
   immediately. Escalate to the HTM manager and the administrator on call.

RECORD       The event file: photographs, logs, custody record, device
             identification, and the release. Retained per the hospital's
             retention schedule.
\`\`\`
Read what makes it a control rather than an essay: a trigger, numbered single actions, roles rather than names, a record, an exception path, and a review date.

## Measuring a control
\`\`\`
Control                        Measure                    Baseline  Target  When
Hard concentration limits      wrong-concentration             3/yr     0    quarterly
in the drug library            events
Second-person check policy     audit compliance on 20            n/a    90%  monthly
                               observed programmings                          for 6
                                                                              months
In-service on every shift      use error codes on this          17/qtr   <5   quarterly
                               model
New securing procedure         event files complete on           40%    100%  per event
                               audit
Competency assessment          staff assessed competent          4 of    8 of  annual
on the new fleet                                                  8       8
\`\`\`
Set the baseline before you implement, or you will spend a year arguing about whether anything improved.

## Matching the control to its committee
\`\`\`
What you are bringing                        Committee
device-related events, near misses, use      patient safety
error trends, alarm issues
equipment inventory, completion rates,       environment of care
recalls, the annual plan evaluation,
utility and construction impacts
investigation reports, device holds,         risk management
reportable events
metrics with targets and trends, the         performance improvement
results of corrective actions
imaging and therapy equipment                radiation safety
performance, survey results
cleaning and disinfection, water systems,    infection control
sterilizers, loaner handling
\`\`\`

## What to memorize
\`\`\`
Hierarchy         eliminate, substitute, engineer, administer, protect
Rule of thumb     engineering controls hold without attention; administrative
                  controls hold only while attention lasts
Retraining alone  the weakest answer on any list
Procedure         risk, trigger, numbered steps, roles, record, exception
                  path, owner, version, review date
Competency        demonstrated, observed, recorded; attendance is not
                  competency
Measurement       defined with a baseline before implementation
\`\`\``,

u3l4: `## The first hour, in order
\`\`\`
Minute   Action                                     Why it cannot wait
0        Device out of patient use, tagged          a second patient is the only
                                                    outcome worse than the first
0 to 5   Nothing touched: no cleaning, no reset,    settings and volatile logs
         no power cycle, no repair                  disappear on a power cycle
5 to 15  Photograph as found: screen, controls,     a photograph settles an
         connections, tubing, the room              argument three months later
15 to 30 Collect accessories, cables, sensors,      the failure is in the
         disposables, packaging, and the trash      disposable more often than
                                                    in the device
30 to 45 Pull event and error logs by the           some logs overwrite
         manufacturer's method; record who and when
45 to 60 Device to a secured location with a        well-meaning repair is the
         chain of custody record                    most common way evidence
                                                    is destroyed
Within 1 Device identification to the risk manager  the reporting clock may
hour     manufacturer, model, serial, software      already be running
         version, lot numbers
\`\`\`

## Interviewing without blame
\`\`\`
Ask this                                 Not this
"Walk me through what you did, in        "Did you check the setting?"
order."
"What did the screen show?"              "Didn't it alarm?"
"What were you expecting to happen?"     "Why would you do that?"
"Has this happened before on this        "Who else has done this?"
unit?"
"What would have made this easier to     "Were you trained on this?"
get right?"
\`\`\`
Interview separately, soon, and record their words rather than your summary. Never compare two accounts in front of a witness and never let the conversation become a disciplinary meeting. The complete report goes to the risk manager, which is what makes it work product, and you discuss its contents with nobody else.

## A five whys chain that reaches an organizational root
\`\`\`
The event    A patient received a dose at ten times the intended rate.
Why 1        The pump was programmed with the wrong concentration.
             -> because
Why 2        The bag's concentration differed from the library's default and
             the default was accepted.  -> because
Why 3        The pharmacy had changed to a different concentration two weeks
             earlier.  -> because
Why 4        The change was communicated to nursing but not to the group
             that maintains the pump drug library.  -> because
Why 5        No procedure requires pharmacy formulation changes to be routed
             to the drug library owner before they take effect.
ROOT CAUSE   There is no process linking a pharmacy formulation change to a
             drug library update.
CONTRIBUTING The library default was accepted without a second check; the
FACTORS      unit was short-staffed that shift; the pump's display shows
             concentration in small type.
\`\`\`
Stop at why 1 and the corrective action is "retrain the nurse", and the event recurs on another unit within the year. The root cause is the missing process, and its removal prevents recurrence, which is the test.

## Fishbone categories, used as a completeness check
\`\`\`
Category        Candidate causes found in this case
People          the nurse accepted a default; the pharmacist did not know
                the library existed
Process         no link between formulation change and library update; no
                second check required
Equipment       small-type concentration display; library default cannot be
                locked
Materials       two concentrations of the same drug in circulation during
                the changeover
Environment     short staffing on the shift; a busy unit at shift change
Management      no owner named for the drug library; no change control
\`\`\`
The value of the fishbone is not creativity, it is coverage. Six categories mean nobody can close an investigation having looked only at the person at the bedside.

## Corrective and preventive action, with verification
\`\`\`
#  Action                             Type        Owner        Date   Verified
1  Write and approve a change         corrective  pharmacy    30 Apr  yes, policy
   control routing every formulation  and                              approved
   change to the library owner        preventive                       22 Apr
2  Name a drug library owner and a    preventive  HTM         15 Apr  yes
   deputy
3  Remove the obsolete concentration  corrective  pharmacy     5 Apr  yes
   from circulation
4  Lock the concentration field for   corrective  HTM         31 May  partial: 310
   this drug across the fleet         and                              of 410 pumps;
                                      preventive                       100 awaiting
                                                                       a software
                                                                       version
5  In-service on every shift, all     corrective  nursing     31 May  yes, 94% of
   units                                          education            staff
6  Report use error codes on this     preventive  HTM        quarterly ongoing
   model quarterly for one year
\`\`\`
Item 4 is the honest line. Partial completion is reported as partial, with the reason and the new date, and the risk that remains on 100 pumps is stated. An action plan that reports 100 percent on every line is usually a plan nobody verified.

## Device error or use error
\`\`\`
                        Device error                 Use error
What happened           the device did not perform   the device performed as
                        as designed                   designed, given the input
How you determine it    test against specification   read the log against the
                        after evidence is preserved   timeline
The fix                 repair or replace, check     training, configuration,
                        the fleet, consider a         workflow safeguard,
                        report                        library limit
Report to the           when a malfunction, design,  when a confusing design
manufacturer            or labeling problem is        invited the error
                        suspected
Trending                failure rate by model        use error codes by model,
                                                      department, and shift
What it is never        an excuse to skip the         a verdict on the person
                        investigation
\`\`\`

## What to memorize
\`\`\`
First step        remove the device from patient use and preserve everything
                  as found, including the disposables and the trash
RCA               retrospective; works backward from the nearest cause
Root cause        its removal prevents recurrence
Contributing      made the event more likely or worse; would not alone cause it
factor
Methods           timeline, five whys, fishbone with people, process,
                  equipment, materials, environment, management
CAPA              corrective fixes this cause; preventive stops it elsewhere;
                  both verified at a date
Report            complete report to the risk manager
\`\`\``,

u3l5: `## A complete FMEA worksheet
Process: programming and starting a continuous infusion on the new pump fleet. Team: nursing, pharmacy, HTM, IT, quality. Scale 1 to 10 on each axis, 10 worst.

\`\`\`
#  Step            Failure mode        Effect on the patient        Cause
1  Select the      wrong drug entry    wrong drug limits applied    similar names
   drug in the     selected            to the infusion              adjacent in the
   library                                                           list
2  Enter the       concentration       ten-fold overdose or         bag differs from
   concentration   entered that does   underdose                    the library
                   not match the bag                                default
3  Load the        cassette seated     free flow; uncontrolled      worn latch, no
   cassette        incorrectly        delivery                      tactile feedback
\`\`\`
\`\`\`
#  Sev  Occ  Det  RPN  Rank  Why each score
1    7    5    6  210    2   severe but usually caught by the limit; happens
                             monthly; detection depends on the nurse noticing
                             the limit prompt
2    9    4    7  252    1   potentially fatal; seen three times this year;
                             poorly detected because the default looks correct
3    9    2    3   54    3   potentially fatal; rare; well detected because the
                             pump alarms and the latch is visible
\`\`\`

## Acting on the ranking, then re-scoring
\`\`\`
#  Action taken                                      Sev  Occ  Det  RPN
2  Hard concentration limit in the library for this    9    2    3   54
   drug, plus a mandatory second-person check
   (occurrence falls, detection improves; severity
   cannot fall without a design change)
1  Drug list reordered, confusable names separated,    7    2    3   42
   and a confirmation screen added
3  No action: latch inspection added to the            9    2    3   54
   quarterly scheduled maintenance already in place
\`\`\`
Three readings a manager should take from that table. First, the top-ranked mode fell from 252 to 54 and is now tied with a mode nobody acted on, which is exactly what a successful action looks like. Second, severity did not move on any line, because the harm from a wrong concentration or a free flow is inherent in the failure; only a design change touches severity. Third, failure mode 3 scores 54 with a severity of 9, and it stays on the watch list despite its low RPN, because a rare, fatal failure deserves attention that a ranking by product will not give it.

## Severity, occurrence, and detection, defined so a team scores consistently
\`\`\`
Axis         Question                              High score means
Severity     how bad is the effect on the          catastrophic harm
             patient if this failure occurs
Occurrence   how often do we expect this failure   frequent
Detection    how likely is it to be caught         POORLY detected; a high
             before it reaches the patient         detection score is bad news
\`\`\`
The detection axis is the one teams reverse. Write the definition on the worksheet before scoring starts, because a team that scores detection backward will spend its budget on the wrong failure mode.

## RCA and FMEA side by side
\`\`\`
                    RCA                          FMEA
When                after an event               before an event
Direction           backward from the event      forward through the process
Question            why did this happen          what could go wrong
Output              root cause, contributing     ranked failure modes with
                    factors, corrective and      scores, actions, and
                    preventive actions           re-scores
Team                investigators plus the        the people who do the work
                    people involved
Trigger             an incident, a near miss,    new equipment, a new or
                    a sentinel event             changed process, a major
                                                 change, a schedule, or
                                                 alongside an RCA
\`\`\`

## Where a manager starts an FMEA
\`\`\`
Situation                                      Scope the FMEA to
A new pump fleet arrives in six weeks          programming and starting an
                                               infusion
A new interface sends vital signs to the       the path from device to chart,
record                                         including patient association
A fleet moves to a new network segment         what fails if the segment drops
Two sterilizers consolidate into one           the whole reprocessing workflow
room
An RCA has just closed on a dosing event       every other way the same
                                               process can fail
\`\`\`

## What to memorize
\`\`\`
FMEA              proactive; RCA is retrospective
Steps             pick the process, list the steps, list the failure modes,
                  score severity, occurrence, detection, multiply, rank, act,
                  re-score
RPN               severity x occurrence x detection
High detection    poor detection
Severity          rarely falls without a design change
Caution           RPN ranks, it does not measure; read the severity column
                  on its own
\`\`\``,

u3l6: `## The reporting table
Everything a user facility owes, in one place.

\`\`\`
What happened          Report to                 On what form   By when
Device-related death   the FDA and the           Form FDA       no later than 10
                       manufacturer, if known    3500A          work days after you
                                                                become aware
Device-related death   the FDA alone             Form FDA       the same 10 work
where the manufacturer                           3500A          days
cannot be identified
Device-related         the manufacturer          Form FDA       no later than 10
serious injury                                    3500A          work days after you
                                                                become aware
Device-related         the FDA instead           Form FDA       the same 10 work
serious injury where                              3500A          days
the manufacturer
cannot be identified
Suspected serious      copying the agency is     Form FDA       within the same
injury, generally      recommended practice       3500A          period
A summary of the       the FDA                   Form FDA       by January 1 of
reports you filed                                 3419           each year
Anything a clinician   the FDA, voluntarily      Form FDA       no deadline
or member of the                                  3500
public wants to report
\`\`\`
\`\`\`
Behind the deadlines, for a user facility
Written procedures    develop, maintain, and follow written reporting
                      procedures, so the obligation does not live in one
                      person's head. They must cover how an event is
                      identified and evaluated, how reportability is decided,
                      how the report is transmitted, and what is documented
Event file            establish it, identify it clearly, keep it where it can
                      be reached quickly, and hold the deliberations, the
                      reportability decision, the reports filed, and the
                      agency's electronic acknowledgments
Retention             a flat two years, measured from the event itself, with
                      no exception. The next table says why that matters
Access                an authorized agency employee may access, copy, and
                      verify the records at any reasonable time
What triggers the     what you became aware of, not what the investigation
clock                 later concludes; file on time and supplement afterward
\`\`\`
\`\`\`
Retention, by who you are
User facility                 2 years from the date of the event
Manufacturer or importer      2 years from the date of the event, or a period
                              equal to the device's expected life, whichever
                              is greater
Device distributor            a different duty entirely: complaint records
                              rather than MDR event files, kept 2 years from
                              the date the record went into the file or the
                              device's expected life, whichever is greater,
                              with electronic files backed up
\`\`\`
A hospital is a user facility, so the only number a CHTM candidate needs cold is that flat two-year period counted from the event itself. The longer rule belongs to the manufacturer and the importer, and the backup duty belongs to the distributor. Backing up an electronic event file is good practice in any hospital, and it is practice rather than a requirement that reaches a user facility.

## Serious injury, defined, with examples
\`\`\`
The definition                      Example
life-threatening                    an airway obstruction from a device failure
permanent impairment of a body      a burn resulting in loss of function in the
function                            hand
permanent damage to a body          a laser injury to the retina
structure
requires medical or surgical        a surgical repair performed to prevent that
intervention to prevent permanent   permanent harm
impairment or damage
\`\`\`
What is not a serious injury under that definition still belongs in the hospital's own event system and still gets investigated. The agency's definition sets the reporting duty; it does not set the hospital's interest.

## The Safe Medical Devices Act of 1990, in one paragraph
Before the act, device adverse-event reporting ran from manufacturers. The act made reporting mandatory for device user facilities: hospitals, ambulatory surgical facilities, nursing homes, and outpatient diagnostic and treatment facilities. The reason is structural. The facility sees the event, the patient, the accessories, the settings, and the clinical context, and the manufacturer sees only what somebody chooses to tell it. Reporting from the point of use is the only way the agency sees patterns across many facilities, which is also why the public database matters to you as a buyer.

## MAUDE, used twice
\`\`\`
When                      What to search for             What you do with it
Before buying a model     the manufacturer and model;    raise it in the
                          the failure modes other        evaluation, ask the
                          facilities reported            vendor directly, and
                                                         put the answer in the file
During an investigation   the same model and the same    tells you whether you
                          failure mode                   have a fleet problem or
                                                         a one-off, and whether
                                                         the manufacturer already
                                                         knows
\`\`\`

## Sentinel events and the alerts
A sentinel event is a patient safety event that reaches a patient and results in death, permanent harm, or severe temporary harm. It triggers a full root cause analysis and an action plan on the hospital's own clock, which runs separately from any report to the agency: one is a regulatory obligation and the other is an accreditation and patient safety obligation, and doing one does not satisfy the other. Accrediting bodies then publish alerts on the patterns they see across many hospitals. A manager is expected to have read the alerts that touch equipment, to know whether the hospital has the vulnerability each one describes, and to be able to say what was done about it.

## The management report, by audience
\`\`\`
Audience                 What they get                      Length
Risk management          the complete investigation: facts,  as long as it takes
                         findings, root cause, contributing
                         factors, actions, verification
Patient safety           device findings, the use error or   two pages
committee                failure trend, and the actions
Environment of care      equipment inventory impact,         one page, in the
committee                recalls, completion rates, and      standing report
                         the plan evaluation
Senior leadership        one page: the risk position, the    one page
                         cost, the recommendation, and the
                         decision requested
The clinical department  what changed and what they must     a paragraph they
                         do differently                      can post
The manufacturer         the device, the failure, the data,   as the form or
                         coordinated through risk            their process
                         management                           requires
\`\`\`

## What to memorize
\`\`\`
SMDA 1990         made user facility reporting mandatory
Death             to the FDA and the manufacturer, within 10 work days
Serious injury    to the manufacturer within 10 work days, or to the agency
                  where the manufacturer cannot be identified
Annual report     Form FDA 3419, by January 1
Mandatory form    Form FDA 3500A, through MedWatch; Form FDA 3500 is voluntary
Event file        a user facility keeps it 2 years from the date of the
                  event; the longer rule is the manufacturer's and the
                  importer's, not the hospital's
MAUDE             the public database; search before buying and during an
                  investigation
Sentinel event    reaches a patient; death, permanent harm, or severe
                  temporary harm; full root cause analysis and action plan
\`\`\``,

u3l7: `## A recall, hour by hour
A Class I notice arrives naming an infusion pump model and a serial range.

\`\`\`
Hour   Action                                      Record it creates
0      Notice logged: date received, source,        the recall log entry
       class, manufacturer, model, serial range
0.5    CMMS queried by manufacturer, model, and     the affected asset list
       serial range: 86 of 410 pumps match
1      Clinical leadership and risk management      the notification record
       notified; this is a Class I
1.5    Locations pulled from the CMMS; 79 found     the location worksheet, with
       in service, 4 in the shop, 2 on loan to a    the 1 unaccounted for named
       clinic, 1 unaccounted for
2      Clinical units told what to do: stop using   the unit communication, in
       the listed serials, swap from the spare      writing, posted
       pool, and how to identify them
4      All 79 in-service units pulled and tagged;   per-asset work orders
       spares deployed
8      The unaccounted unit found in a storage      the closed gap; this is the
       room in another building                     line a surveyor will read
24     Vendor scheduled for the correction;         the vendor schedule
       correction order placed per the notice
Days   Each unit corrected, verified against the    86 individual records
       notice's instructions, and returned
Close  Recall closed: every affected asset with     the closure record and the
       its disposition; reported to the             committee report
       environment of care committee
\`\`\`
Step 0.5 is the whole lesson. An inventory without manufacturer, model, and serial numbers cannot answer a recall, which is why serial numbers are inventoried in the first place: serial ranges are what recalls name.

## The three classes, with the action each demands
\`\`\`
Class  The hazard                              Your response
I      a reasonable probability that using or   locate and quarantine or correct
       being exposed to the product will        immediately; escalate the same
       cause serious adverse health             day to risk management and
       consequences or death                    clinical leadership
II     use or exposure may cause temporary      act on a planned schedule with a
       or medically reversible adverse          firm completion date and a
       health consequences, or the              reported status
       probability of serious adverse health
       consequences is remote
III    use or exposure is not likely to cause   correct through the normal work
       adverse health consequences, but the     queue; still documented, still
       product violates a requirement          closed with a record
\`\`\`

## Notice types, and what each demands
\`\`\`
Notice                        Is it a recall   What you must do
Recall or correction and      yes, with a      the full workflow, by class
removal notice                class
Manufacturer field safety     often not        assess, act if applicable, log
notice or advisory                             and close either way
Independent testing body      no               assess against your inventory,
hazard alert                                   act, log, and close
Agency safety communication   no               assess whether the use pattern
on a use pattern                               applies here; often the answer
                                               is training, not a repair
Software or firmware          sometimes         treat as a change: validate,
bulletin                                       schedule, record the version
                                               against the asset
Labeling or instructions      no               get the new instructions to the
update                                         units that hold the device
\`\`\`
Every row ends in a record, including the rows where no action was needed. The record states what was assessed, what was found, and what was decided. A notice that was read, judged harmless, and left no trace is indistinguishable from a notice nobody opened.

## The monthly recall report
\`\`\`
                                 This month   Year to date
Notices received                         31            214
Applicable to equipment we own            6             41
Devices affected                        112            390
Devices corrected                        104            382
Recalls open at month end                 3
Oldest open recall, days                 48
Class I recalls open                      0
\`\`\`
Report the same table every month so the trend is visible, and keep two lines on it that managers often omit: the number of recalls still open and the age of the oldest. Those two are what a surveyor and a committee actually want to know.

## Communicating with a clinical department
\`\`\`
Include                                  Leave out
what the notice says, in plain words     the notice's regulatory language
which devices, how they are identified   the serial range alone with no way
                                         to read it
what they must do right now              a request to "be aware"
what to use instead, and where it is     a promise you have not arranged
when the device goes and when it         an open-ended timeline
returns
who to call and the reference number     your email address alone
\`\`\`

## What to memorize
\`\`\`
Class I     reasonable probability of serious harm or death; act immediately
Class II    temporary or medically reversible harm, or a remote probability
            of serious harm
Class III   not likely to harm, but violates a requirement; still corrected
First step  identify the affected devices in the inventory by manufacturer,
            model, and serial or lot range
Workflow    receive and log, identify, locate, quarantine or correct, notify,
            document per unit, verify, close
Sources     the FDA, manufacturers, distributors, and independent testing
            bodies; one named owner for the inbox, with a backup
Advisories  not recalls; logged, assessed, and closed the same way, even when
            no action was needed
Track       open recalls in the CMMS against the asset, with the age of the
            oldest reported
\`\`\``,

u3l8: `## The data inventory nobody has until somebody builds it
Start with the question an auditor will ask: which of your devices hold patient data, and how do you know.

\`\`\`
Device type           Holds PHI   Where                 What that means
Physio monitors       yes         internal memory,      wipe before disposal;
                                  waveforms and         access control on the
                                  demographics          central station
Infusion pumps        sometimes   event logs may hold   check with the maker;
                                  patient identifiers    assume yes until told no
Imaging consoles      yes         local studies cached  wipe or destroy the drive;
                                  before archiving      never trade in as-is
PACS archive          yes         the whole archive     backups, retention,
                                                        access control, restore
                                                        tests
Ventilators           usually no  settings and logs     still wipe settings, still
                                  without identifiers    control configurations
Analyzers             yes         results with          interface to the record;
                                  identifiers           integrity is the risk
Test equipment        usually no  saved test records    check before disposal
\`\`\`
The last column is the point. "Usually no" is not an answer you can give an auditor; confirm it per model in writing from the manufacturer and record the answer in the asset record.

## Integrity controls, and the failure each one prevents
\`\`\`
Control                  Prevents                        How you prove it works
Scheduled backups of     losing the inventory, the        the backup log, plus a
the CMMS and device      history, and the recall          copy stored away from
configurations           evidence                         the system
A tested, documented     discovering at the worst         a dated restore test
restore                  moment that the backup was       record with the result
                         not usable
Version control on       not knowing which                a version recorded
configurations and       configuration or software is     against every asset
software                 on which asset
Audit logs, read         a configuration change with      a sampled review, with
                         no name and no time against it   the reviewer's name
Patient association      a vital sign landing in the      a joint procedure with
check in the workflow    wrong patient's chart            IT and an owner for the
                                                          admission, discharge,
                                                          and transfer feed
\`\`\`
The wrong-patient reading is the one to understand properly. The monitor is not broken, the network is not broken, and the record is not broken. The association between a bed and a patient is wrong, which makes it a workflow and interface investigation with IT, not a device repair, and it is a patient safety event rather than a clerical one.

## Security controls, in the three categories the security rule uses
\`\`\`
Administrative     written policies, risk assessment, workforce training,
                   access authorization and review, incident procedures,
                   business associate agreements, sanctions
Physical           locked server rooms, controlled access, device and media
                   controls, secure storage of equipment awaiting disposal,
                   workstation security
Technical          unique named accounts, least privilege, multi-factor
                   authentication where supported, encryption at rest and in
                   transit by the manufacturer's supported method, audit
                   controls, automatic logoff
\`\`\`

## PACS, the record, and the long tail
\`\`\`
System              The manager's obligations
PACS                treat the archive as patient data: retention per policy,
                    access control, backups, a documented restore test, and
                    a downtime procedure for when it is unavailable
The EMR and the     your devices feed it directly or through middleware; an
broader EHR         interface failure is a clinical event, so it needs an
                    alarm, an owner, and a downtime procedure, not a
                    quarterly discovery
Networked devices   the long tail: monitors, pumps, ventilators, analyzers,
                    consoles. Many cannot be patched on demand and some hold
                    data nobody remembers is there. Inventory them with
                    software version, operating system, segment, and clinical
                    owner
\`\`\`

## The manager's HIPAA habits
\`\`\`
1  Keep the list of devices that hold protected health information current
2  Wipe or destroy media before any device leaves the building: sold,
   donated, traded, returned at lease end, or sent for repair
3  Never move patient data onto a laptop or memory stick to troubleshoot it
4  Keep a business associate agreement in place before a vendor touches
   patient data, including remote support
5  Control physical access to servers, consoles, and devices awaiting
   disposal
6  Report a suspected breach through the hospital's process immediately
   rather than investigating quietly first
7  Retire shared service passwords and remove accounts the day somebody
   leaves
\`\`\`

## The business associate agreement, and the three vendor situations that need one
\`\`\`
What the agreement says            Why HTM cares
what the vendor may do with the    a service organization that pulls logs
data                               containing identifiers is using patient data
what safeguards it will apply      the hospital remains responsible for the
                                   data it hands over
that it will report incidents      you learn about a breach from the vendor
                                   rather than from the news
what happens to data at the end    a drive that leaves with the contract is a
of the contract                    breach waiting to be discovered
that its subcontractors are bound  the remote support desk is often a third
                                   party you never met

Never start without one
  remote support into a device that holds patient data
  a hosted or cloud service behind a device
  any arrangement where the vendor takes a device or its drive away
\`\`\`

## What to memorize
\`\`\`
Integrity       the right value, unchanged, on the right patient
Its controls    backups, tested restores, version control, audit logs,
                patient association checks
Security        access control, encryption, physical security, across
                administrative, physical, and technical safeguards
HITECH          extended HIPAA: breach notification, direct obligations on
                business associates, stronger enforcement
Before disposal wipe or destroy the media; selling or donating a device
                holding patient data is a violation
Vendors         business associate agreement before they touch patient data
\`\`\``,

u3l9: `## The networked device inventory, which is where oversight begins
You cannot answer a vulnerability bulletin from a device list that stops at model and serial.

\`\`\`
Field                     Why the security officer needs it
Manufacturer, model,      to match a bulletin or an advisory to real devices
serial
Software and firmware     bulletins name versions, not models
version
Operating system and      the real exposure, and the replacement horizon
its support horizon
Network address and       to find it and to know what it can reach
segment
Holds patient data        whether a compromise is also a breach
Patchable, and by whom    whether a fix is even possible, and whose job it is
Remote access enabled     the most commonly forgotten door
Clinical owner            who decides whether it can come off the network
Criticality               whether isolating it stops patient care
\`\`\`
That table is the answer to "how many of our devices are affected", and building it is weeks of work that pays for itself the first time somebody asks.

## The patch decision tree
\`\`\`
Is the device patchable by the hospital?
  YES  -> Does the manufacturer validate this patch?
           YES -> schedule it under change management, test, record the
                  version against the asset
           NO  -> do not apply it; applying an unvalidated patch can take the
                  device out of its cleared configuration. Document the
                  decision and apply compensating controls
  NO   -> Will the manufacturer supply and apply a fix, and when?
           YES -> get the date in writing; track it as an open item; apply
                  compensating controls until it lands
           NO  -> compensating controls, documented, accepted by the security
                  officer, with a replacement date in the capital plan

Compensating controls, in order of value
  1  segment the device and restrict what may reach it
  2  remove internet reachability entirely
  3  disable unused services, ports, and removable media
  4  change default credentials and use named accounts
  5  monitor the segment and alert on anomalies
  6  physically secure the device and its console
  7  record the residual risk, the owner, and the review date
\`\`\`

## A legacy fleet, managed rather than ignored
\`\`\`
Fleet              Units  Operating system   Patchable  What was done
Imaging console A      3  support ended      no         isolated segment, no
                                                        internet route, console
                                                        locked, replacement in
                                                        year 2 of the capital plan
Physio monitors       11  support ended      no         separate segment, central
                                                        station hardened, vendor
                                                        remote access revoked,
                                                        replacement in year 1
Lab analyzer           2  supported, but     vendor     patch windows agreed with
                          vendor controls    only       the lab, versions recorded
                          the patch
Infusion pumps       410  current            vendor     quarterly vendor patch
                                             only       cycle, versions in the
                                                        inventory
Ventilators           64  current            vendor     patched at scheduled
                                             only       maintenance
\`\`\`
Every line has a decision and an owner. "We knew, we assessed it, and here is what we did and when it is replaced" is a defensible position in front of a surveyor, an auditor, or a board. "Nobody looked" is not.

## Operating system life expectancy, asked before the purchase
\`\`\`
Question to the manufacturer, in writing      Why it decides the purchase
Which operating system does the device run,   the answer belongs in the asset
and which version                             record from day one
Until when will that version be supported     a 15-year clinical life on a
                                              4-year support horizon is an
                                              11-year problem you just bought
What is your process for moving the device    sometimes the answer is "a new
to a supported version                        device", which is the real price
Who applies security patches, how often,      an obligation in the contract or
and under what contract                       a gap in your program
What happens to the device's clearance if     the reason you cannot simply
we patch it ourselves                         patch it yourself
\`\`\`
Collect the MDS2 before purchase as the structured version of those answers, and keep it with the asset record rather than in the procurement file where nobody will find it in five years.

## Telemetry spectrum, and why a manager owns it
\`\`\`
Duty                                  What it looks like in practice
Register the hospital's protected     a record of frequencies, transmitters,
telemetry use and coordinate it       and locations, kept current
Keep other equipment out of the band  a rule that any new wireless system,
                                      including a vendor's own access points,
                                      is a coordination request first
Know who to call                      the coordinator and the spectrum rules
                                      the FCC applies
Treat interference as a clinical       dropped waveforms on monitored patients
event                                 is a patient safety event, investigated
                                      as one
\`\`\`

## The device incident response path
\`\`\`
1  Isolate the device from the network without interrupting patient care;
   if care cannot continue without it, decide clinically with the unit
2  Notify the security officer and IT immediately; this is their incident too
3  Preserve the device and its logs the way you would for any patient event
4  Bring the manufacturer in; many compromises need their analysis
5  Decide, with the clinical owner, whether the device can keep being used
6  Check the rest of the fleet for the same exposure
7  Document the sequence, the decisions, and who made them
8  Feed what you learned into the patch policy, the segmentation rules, and
   the next purchase specification
\`\`\`

## What to memorize
\`\`\`
Start            an inventory of networked devices with versions, operating
                 systems, segments, and clinical owners
MDS2             the manufacturer's security disclosure; collect before purchase
Patching         on the manufacturer's validated schedule; an unvalidated patch
                 can take a device out of its cleared configuration
When no patch    compensating controls: hardening, segmentation, restricted
exists           access, monitoring, physical security, documented residual risk
Hardening        unused ports and services off, default credentials changed,
                 unnecessary software removed
Antivirus        only where the manufacturer allows it, with their exclusions
Ask before       how long is the operating system supported, and what happens
buying           to this device when that support ends
WMTS             protected telemetry spectrum, licensed and coordinated under
                 FCC rules; register it and keep the band clear
\`\`\``,

u3l10: `## The four lists that answer the 6 p.m. phone call
\`\`\`
List                       What it holds                     Reviewed
Critical equipment         the devices whose failure         when services change,
                           threatens life or stops care      and at least annually
                           that cannot wait, with location
                           and clinical owner
Emergency power            which receptacles are on the      annually and after
                           emergency branch, by room, and    any electrical work
                           which devices must be moved
                           when normal power is lost
Battery and               every device with an internal      at the tested interval;
uninterruptible power      battery, its tested runtime       runtime degrades
supply                     under load, and the date the      quietly
                           battery was last tested or
                           replaced; each UPS with what it
                           supports, its capacity, and its
                           battery age
Reserve equipment          where spare monitors, pumps,       monthly for charge
                           ventilators, and beds are         and date, and after
                           stored, how they are kept          every deployment
                           charged and in date, who
                           releases them, and how they are
                           tracked while deployed
\`\`\`
All four live in the CMMS or are generated from it, and all four exist in an offline copy, because the event that makes you need them may be the event that takes the network away.

## Utility failure, device by device
\`\`\`
Utility      What stops                        What degrades slowly
Power        anything without a battery, the   battery devices, in the order of
             moment normal power is lost on    their tested runtimes; refrigerated
             a non-emergency receptacle        stock as temperature rises
Medical gas  ventilators and anesthesia        suction performance across a zone
             machines on pipeline supply,      before it fails outright
             unless cylinders are staged
Water        sterilizers, dialysis, lab        imaging equipment on chilled water,
             analyzers needing treated water   as it heats
HVAC         little, immediately               imaging and lab equipment drifting
                                               out of environmental limits; sterile
                                               storage; server rooms
Network      the record, PACS, telemetry       nothing visibly, which is the danger:
             central stations, networked        devices may keep displaying while
             pumps and monitors, and the        no data reaches the chart
             CMMS itself
\`\`\`
The network row is the one managers underestimate. Know which of your devices fail safe, which fail loudly, and which fail silently, because a monitor that keeps showing a waveform while nothing reaches the central station is more dangerous than one that goes dark.

## Downtime and recovery, written as one procedure
\`\`\`
DOWNTIME
1  Who may declare downtime for this system, and how they announce it
2  What clinical staff do without it, step by step
3  Where the paper or standalone fallback is kept, and who checks it
4  Which devices keep working and which do not
5  Who is called: HTM, IT, the vendor, with numbers that do not need the
   network to reach
6  What is recorded during downtime, and on what

RECOVERY, which is the half that gets forgotten
7  Who declares the system restored, and after what verification
8  How data captured during downtime is reconciled into the record, by whom,
   and by when
9  How devices are verified before they go back on patients
10 Who confirms each unit is back on the normal workflow
11 What is documented about the event itself, for the after-action review
\`\`\`
Most of the harm from an outage happens on the way back up, when half the units are on paper, half are on the restored system, and nobody has said which.

## A planned utility interruption, read as a clinical event
\`\`\`
The facilities notice says          What HTM turns it into
"Electrical shutdown, Tower B       Rooms affected: B201 to B240, imaging
levels 2 and 3, Saturday 0600 to    rooms 1 and 2
1000"                               Devices on non-emergency receptacles in
                                    those rooms: 34, listed by asset number
                                    Battery devices and their tested runtimes:
                                    11 pumps at 6 hours, 4 monitors at 3 hours
                                    Devices to be moved to the emergency
                                    branch beforehand: 9, listed
                                    Devices to be relocated or taken out of
                                    service: 2 imaging systems
                                    Downtime procedure published to the units
                                    on Thursday
                                    Who is on site Saturday, and the recovery
                                    verification plan
\`\`\`

## Drills and the after-action review
\`\`\`
Section                What goes in it
What was exercised     the scenario, the date, who took part, what systems
                       and equipment were actually used
What worked            specifically, so it is protected rather than assumed
What failed            the list that matters: a wrong phone number, a battery
                       at half its documented runtime, a reserve monitor out
                       of calibration, a downtime procedure nobody could find
What will change       each item as an action, with an owner and a date
Where the change       which list, which procedure, which section of the
lands                  emergency operations plan
When it is verified    a date, and who confirms it
\`\`\`
Send somebody who does the work, not a representative, and use the real lists. A drill is the cheapest possible place to discover that a list is wrong.

## Continuity for the CMMS itself
\`\`\`
Measure                        Why
Scheduled backups, stored      if the CMMS is gone you cannot find an asset,
away from the system           answer a recall, or prove a maintenance record
A tested, documented restore   a backup nobody has restored is a hope
An offline copy of the first-  the critical equipment list, the emergency
hour information               contact list, the vendor list with account
                               numbers, and the reserve equipment locations
A paper or standalone way to   so work done during the outage is not lost
record work during the outage
A documented reconciliation    so the record is complete when the system
step                           returns
\`\`\`

## What to memorize
\`\`\`
HTM's part in the plan   critical equipment, what each utility supports,
                         reserve equipment, downtime procedures, and how HTM
                         is reached and staffed
Critical equipment list  maintained whether or not those devices sit in an
                         alternative maintenance program, and identifiable
Utilities                power, medical gas, water, HVAC, network, each with
                         the equipment that depends on it
Batteries                tested runtime beats a specification sheet
Recovery                 needs a written procedure as much as downtime does
Drills                   end in an after-action review with owners and dates
The CMMS                 backed up, restore tested, with an offline copy of
                         the lists
\`\`\``

});
