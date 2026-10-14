// CRES Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "cres",
  name: "CRES Academy",
  short: "CR",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "AAMI / ACI", title: "Certified Radiology Equipment Specialist", code: "CRES", questions: 165, minutes: 180, passPct: 70 },
  description: "Self-paced Certified Radiology Equipment Specialist (CRES) exam prep with adaptive training and practice exams.",
  seo: {
    title: "CRES Study Guide and Practice Tests | CRES Academy",
    h1: "CRES Study Guide and Practice Tests",
    intro: "CRES Academy is a free study guide and practice-test course for the AAMI/ACI Certified Radiology Equipment Specialist exam. Sixty lessons follow the exam's six domains, a printable CRES cheat sheet collects the dose limits, formulas, QC tolerances, and network tools worth memorizing, adaptive tutorials rebuild from your misses, and unlimited CRES practice tests draw on a bank of original CRES exam questions built from the exam's domain weights.",
    phrases: ["CRES study guide", "CRES practice tests", "CRES exam questions", "CRES cheat sheet"],
    faq: [
      { q: "How many questions are on the CRES exam?", a: "165 multiple-choice questions in 3 hours, closed book, with an on-screen calculator and notepad. ACI sets the cut score with a criterion-referenced method and does not publish it; this course's official-format test uses 70%." },
      { q: "When is the CRES offered?", a: "Twice a year, May 1 to 15 and November 1 to 15, at Kryterion computer-based test centers. Applications open about three months before each window." },
      { q: "Who is eligible for the CRES?", a: "Full certification needs an associate degree in electronics, technology, or science plus two years of full-time BMET work, or a US military biomed program plus two years, or four years of full-time work alone, and at least 40 percent of that work in radiology over the last two years with 25 percent over the last five. Candidate status is open with the degree, the military program, or two years of work alone." },
      { q: "How much does the CRES cost?", a: "In 2026 the exam is $410 for AAMI members and $460 for non-members; a retake is $355 or $405. In 2027 the fees rise to $425 and $480. Certification is renewed every three years with continuing education." },
      { q: "How many practice tests should I take?", a: "This course asks for three of your last five fifty-question practice tests at 80% or better, then one full-length test in the real exam's format at the real passing score." },
      { q: "Is the course free?", a: "Yes. The lessons, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Anatomy and Physiology", short: "A&P", pct: 7, quota: 4 },
    { id: 2, name: "Public Safety in the Healthcare Facility", short: "Safety", pct: 8, quota: 4 },
    { id: 3, name: "Fundamentals of Electricity and Electronics", short: "Electronics", pct: 10, quota: 5 },
    { id: 4, name: "Healthcare Technology and Function", short: "Function", pct: 25, quota: 12 },
    { id: 5, name: "Healthcare Technology Problem Solving", short: "Problem Solving", pct: 25, quota: 13 },
    { id: 6, name: "Healthcare Information Technology", short: "Healthcare IT", pct: 25, quota: 12 }
  ],
  // Practice tests pass at 80%; the official-format test uses 70% because ACI publishes no CRES cut score.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l2", "u1l3", "u1l4"],
    2: ["u2l1", "u2l2", "u2l3", "u3l1", "u3l4", "u2l4", "u2l5", "u3l2", "u3l3"],
    3: ["u4l1", "u4l2", "u4l4", "u4l3", "u4l5", "u4l6"],
    4: ["u5l1", "u5l2", "u5l3", "u5l5", "u6l2", "u6l3", "u6l5", "u7l1", "u8l1", "u8l2", "u5l4", "u5l6", "u6l1", "u6l4", "u6l6", "u7l2", "u7l3", "u7l4", "u8l3"],
    5: ["u9l1", "u9l2", "u9l3", "u9l4", "u9l10", "u9l5", "u9l6", "u9l7", "u9l8", "u9l9"],
    6: ["u10l1", "u10l4", "u10l5", "u10l8", "u10l10", "u10l2", "u10l3", "u10l6", "u10l7", "u10l9", "u10l11", "u10l12"]
  },
  core: {
    1: ["u1l1", "u1l2"],
    2: ["u2l1", "u2l2", "u2l3", "u3l1", "u3l4"],
    3: ["u4l1", "u4l2", "u4l4"],
    4: ["u5l1", "u5l2", "u5l3", "u5l5", "u6l2", "u6l3", "u6l5", "u7l1", "u8l1", "u8l2"],
    5: ["u9l1", "u9l2", "u9l3", "u9l4", "u9l10"],
    6: ["u10l1", "u10l4", "u10l5", "u10l8", "u10l10"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ACI reports CRES results as pass or fail and publishes no cut score. This course's official-format test uses 70%, the same bar as our CBET course.",
  examDay: [
    "165 questions in 3 hours, closed book, with an on-screen calculator and notepad. That is over a minute per question; do not rush the math items.",
    "Some questions are unscored trial items. A question that seems to be from nowhere may be one of them; answer it and move on.",
    "Read for the qualifier: FIRST, MOST likely, BEST. In problem-solving items the first step is usually the patient, then the simplest cause, then the accessory.",
    "Know the numbers cold: dose limits, the inverse square law, mAs and the 15 percent rule, heat units, fluoroscopy limits, the leakage limits and their standards.",
    "Eligibility is checked when you apply: the technician pathway plus at least 40 percent of your work in radiology over the last two years. Apply early; the windows are May 1 to 15 and November 1 to 15.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Radiation unit conversions and time-to-limit, inverse square law, Ohm's law and circuit math, RC time constants, heat units, mAs and the 15 percent rule, half-value layers, leakage limits and shock thresholds, and subnet questions are generated fresh every time.",
  legacyStoreKeys: []
};
