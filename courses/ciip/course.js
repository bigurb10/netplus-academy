// CIIP Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "ciip",
  name: "CIIP Academy",
  short: "CI",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "ABII", title: "Certified Imaging Informatics Professional", code: "CIIP", questions: 170, minutes: 170, passPct: 75, fee: "$500; retake $250" },
  description: "Self-paced Certified Imaging Informatics Professional (CIIP) exam prep with adaptive training and practice exams.",
  seo: {
    title: "CIIP Study Guide and Practice Tests | CIIP Academy",
    h1: "CIIP Study Guide and Practice Tests",
    intro: "CIIP Academy is a free study guide and practice-test course for the ABII Certified Imaging Informatics Professional exam. Sixty-five lessons follow the exam's ten domains from the seat of the person who runs PACS and imaging IT, a printable CIIP cheat sheet collects the DICOM, HL7, storage, network, and capacity facts worth memorizing, and every practice test is built from the exam's domain weights. Use it as your CIIP study guide, take a CIIP practice test as often as you like on a bank of original CIIP exam questions, and prepare for the imaging informatics certification and the PACS administrator certification path, free while the site launches.",
    phrases: ["CIIP study guide", "CIIP practice test", "CIIP exam questions", "imaging informatics certification", "PACS administrator certification"],
    related: ["cres", "netplus", "secplus"],
    faq: [
      { q: "How many questions are on the CIIP exam?", a: "170 questions in 2 hours 50 minutes. 130 are scored and 40 are unscored pilot questions you cannot tell apart. Another 20 minutes cover the tutorial, the non-disclosure agreement, and a survey. Most questions are single best answer; some ask for several answers, show an exhibit or video, or ask you to click a hot area. You must answer each question before the next appears, and you can flag questions to review." },
      { q: "How is the CIIP scored?", a: "ABII reports a scaled score from 1 to 99, and 75 passes. The scaled score is not the percentage of questions you got right. This course's official-format test asks for 75 percent." },
      { q: "When and where can I take the CIIP?", a: "Any day, at a Pearson VUE test center or online with a remote proctor. There are no testing windows. You get three attempts within 12 months of being found eligible." },
      { q: "Who is eligible for the CIIP?", a: "ABII uses a seven-point system. You need at least 7 points: 1 to 5 for experience (one point per 12 months as a credentialed imaging professional, a healthcare IT or informatics professional, or a military radiologic technologist), 0 to 5 for your highest degree plus 1 for an imaging informatics degree, and 1 to 4 for imaging informatics continuing education (one point per 10 hours earned in the 18 months before you apply). Radiologic and biomed technologists moving into imaging IT often start with our CRES Academy course." },
      { q: "How much does the CIIP cost?", a: "The exam is $500 and a retake is $250. Certification is kept with 24 continuing education credits every two years and an annual renewal." },
      { q: "How many practice tests should I take?", a: "This course asks for three of your last five fifty-question practice tests at 80% or better, then one full-length 170-question test in the real exam's format at 75%." },
      { q: "Is the course free?", a: "Yes. The lessons, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Procurement", short: "Procurement", pct: 4, quota: 2 },
    { id: 2, name: "Project Management", short: "Projects", pct: 5, quota: 3 },
    { id: 3, name: "Operations", short: "Operations", pct: 12, quota: 6 },
    { id: 4, name: "Communications", short: "Communications", pct: 5, quota: 3 },
    { id: 5, name: "Training and Education", short: "Training", pct: 4, quota: 2 },
    { id: 6, name: "Image Management", short: "Image Mgmt", pct: 18, quota: 9 },
    { id: 7, name: "Information Technology", short: "IT", pct: 12, quota: 6 },
    { id: 8, name: "Systems Management", short: "Systems", pct: 16, quota: 8 },
    { id: 9, name: "Clinical Engineering", short: "Clinical Eng", pct: 10, quota: 5 },
    { id: 10, name: "Medical Imaging Informatics", short: "Informatics", pct: 14, quota: 6 }
  ],
  // Practice tests pass at 80%; the official-format test uses 75% to match ABII's scaled passing score of 75.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u7l1", "u7l2", "u7l3"],
    2: ["u8l1", "u8l2", "u8l3", "u8l4"],
    3: ["u6l1", "u6l3", "u6l6", "u6l8", "u6l2", "u6l4", "u6l5", "u6l7"],
    4: ["u9l1", "u9l2", "u9l3", "u9l4"],
    5: ["u10l1", "u10l2", "u10l3"],
    6: ["u3l1", "u3l3", "u3l5", "u3l9", "u3l2", "u3l4", "u3l6", "u3l7", "u3l8", "u3l10", "u3l11"],
    7: ["u4l1", "u4l2", "u4l4", "u4l7", "u4l3", "u4l5", "u4l6", "u4l8"],
    8: ["u5l1", "u5l3", "u5l5", "u5l6", "u5l9", "u5l10", "u5l2", "u5l4", "u5l7", "u5l8"],
    9: ["u2l1", "u2l3", "u2l5", "u2l2", "u2l4", "u2l6"],
    10: ["u1l1", "u1l2", "u1l3", "u1l5", "u1l4", "u1l6", "u1l7", "u1l8"]
  },
  core: {
    1: ["u7l1", "u7l2"],
    2: ["u8l1", "u8l2"],
    3: ["u6l1", "u6l3", "u6l6", "u6l8"],
    4: ["u9l1", "u9l2"],
    5: ["u10l1", "u10l2"],
    6: ["u3l1", "u3l3", "u3l5", "u3l9"],
    7: ["u4l1", "u4l2", "u4l4", "u4l7"],
    8: ["u5l1", "u5l3", "u5l5", "u5l6", "u5l9", "u5l10"],
    9: ["u2l1", "u2l3", "u2l5"],
    10: ["u1l1", "u1l2", "u1l3", "u1l5"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ABII reports a scaled score from 1 to 99 and 75 passes; the scale is not a percentage of questions correct. This course's official-format test asks for 75%.",
  examDay: [
    "170 questions in 2 hours 50 minutes, about a minute each, with an on-screen calculator. Another 20 minutes cover the tutorial, the agreement, and a survey.",
    "40 of the questions are unscored pilot items and you cannot tell which. A question from nowhere may be one of them; answer it and move on.",
    "You must answer each question before the next appears. Flag the doubtful ones and come back; never leave one blank.",
    "Read for the qualifier: FIRST, MOST likely, BEST. The informatics answer usually protects patient identity and data integrity first, then restores service, then documents.",
    "Know the arithmetic cold: study size, annual storage, compression ratio, transfer time in bits, and downtime from an availability percentage.",
    "Pearson VUE center or online proctor, any day. Bring the ID the confirmation names and arrive early."
  ],
  generatedNote: "Study size and annual storage, compression ratios, transfer times, availability and downtime, and ROI and payback are generated fresh every time.",
  legacyStoreKeys: []
};
