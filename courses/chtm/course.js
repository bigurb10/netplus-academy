// CHTM Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "chtm",
  name: "CHTM Academy",
  short: "CH",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "AAMI / ACI", title: "Certified Healthcare Technology Manager", code: "CHTM", questions: 100, minutes: 120, passPct: 70, fee: "2026: $490 AAMI member, $565 non-member; retake $440 or $515" },
  description: "Self-paced Certified Healthcare Technology Manager (CHTM) exam prep with adaptive training and practice exams.",
  seo: {
    title: "CHTM Study Guide and Practice Tests | CHTM Academy",
    h1: "CHTM Study Guide and Practice Tests",
    intro: "CHTM Academy is a free study guide and practice-test course for the AAMI/ACI Certified Healthcare Technology Manager exam. Sixty lessons follow the exam's five domains from the manager's seat, a printable CHTM cheat sheet collects the financial formulas, risk tools, operations metrics, regulators, and labor laws worth memorizing, adaptive tutorials rebuild from your misses, and unlimited CHTM practice tests draw on a bank of original CHTM exam questions built from the exam's domain weights. Everything you need to prepare for the healthcare technology manager certification is here, free while the site launches.",
    phrases: ["CHTM study guide", "CHTM practice tests", "CHTM exam questions", "healthcare technology manager certification"],
    faq: [
      { q: "How many questions are on the CHTM exam?", a: "100 multiple-choice questions in 2 hours, closed book, with an on-screen calculator and notepad. ACI sets the cut score with a criterion-referenced method and does not publish it; this course's official-format test uses 70%." },
      { q: "When is the CHTM offered?", a: "Twice a year, May 1 to 15 and November 1 to 15, at computer-based test centers. Applications open about three months before each window." },
      { q: "Who is eligible for the CHTM?", a: "One of five pathways. The common one is a current CCE, CBET, CRES, or CLES plus at least three years as an HTM supervisor or manager in the last five; our CBET Academy and CRES Academy courses prepare for two of those credentials. The others are the Department of Defense BMET program plus three years of supervision, an associate degree in biomedical technology, a related healthcare discipline, IT, or business plus three years, a bachelor's degree or higher in those fields plus two years as a manager, or seven years in HTM with three in management. Pathways without the supervisor or manager title need an attestation of management duties." },
      { q: "How much does the CHTM cost?", a: "In 2026 the exam is $490 for AAMI members and $565 for non-members; a retake is $440 or $515. In 2027 the fees rise to $510 and $590, with a retake at $460 or $540. Certification is renewed every three years with continuing education." },
      { q: "How many practice tests should I take?", a: "This course asks for three of your last five fifty-question practice tests at 80% or better, then one full-length test in the real exam's format at the real passing score." },
      { q: "Is the course free?", a: "Yes. The lessons, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Financial Management", short: "Financial", pct: 20, quota: 10 },
    { id: 2, name: "Risk Management", short: "Risk", pct: 16, quota: 8 },
    { id: 3, name: "Operations Management", short: "Operations", pct: 40, quota: 20 },
    { id: 4, name: "Education and Training", short: "Education", pct: 11, quota: 6 },
    { id: 5, name: "Human Resources", short: "HR", pct: 13, quota: 6 }
  ],
  // Practice tests pass at 80%; the official-format test uses 70% because ACI publishes no CHTM cut score.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l3", "u1l5", "u2l1", "u2l2", "u1l2", "u1l4", "u1l6", "u2l3", "u2l4", "u2l5", "u2l6"],
    2: ["u3l1", "u3l4", "u3l5", "u3l7", "u3l2", "u3l3", "u3l6", "u3l8", "u3l9", "u3l10"],
    3: ["u4l1", "u4l2", "u4l3", "u4l4", "u5l1", "u5l4", "u6l1", "u6l3", "u6l6", "u4l5", "u4l6", "u4l7", "u4l8", "u4l9", "u5l2", "u5l3", "u5l5", "u5l6", "u6l2", "u6l4", "u6l5", "u6l7", "u6l8", "u6l9"],
    4: ["u7l1", "u7l2", "u7l6", "u7l3", "u7l4", "u7l5", "u7l7"],
    5: ["u8l1", "u8l2", "u8l7", "u8l3", "u8l4", "u8l5", "u8l6"]
  },
  core: {
    1: ["u1l1", "u1l3", "u1l5", "u2l1", "u2l2"],
    2: ["u3l1", "u3l4", "u3l5", "u3l7"],
    3: ["u4l1", "u4l2", "u4l3", "u4l4", "u5l1", "u5l4", "u6l1", "u6l3", "u6l6"],
    4: ["u7l1", "u7l2", "u7l6"],
    5: ["u8l1", "u8l2", "u8l7"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ACI reports CHTM results as pass or fail and publishes no cut score. This course's official-format test uses 70%, the same bar as our CBET and CRES courses.",
  examDay: [
    "100 questions in 2 hours, closed book, with an on-screen calculator and notepad. That is over a minute per question; the arithmetic items are few and worth doing carefully.",
    "Some questions are unscored trial items. A question that seems to be from nowhere may be one of them; answer it and move on.",
    "Read for the qualifier: FIRST, MOST appropriate, BEST. The manager's answer is usually the one that measures, documents, and escalates through the right committee, not the one that fixes the device.",
    "Know the formulas and the names cold: variance, ROI and payback, depreciation, the cost of service ratio, the risk priority number, the Safe Medical Devices Act, the committees, the regulators, and the labor laws.",
    "Eligibility is checked when you apply: a current technician credential plus three years as an HTM supervisor or manager in the last five is the common pathway. Apply early; the windows are May 1 to 15 and November 1 to 15.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Budget variance, return on investment and payback period, straight-line depreciation, the cost of service ratio, and FMEA risk priority numbers are generated fresh every time.",
  legacyStoreKeys: []
};
