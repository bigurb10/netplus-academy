// SecPlus Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "secplus",
  name: "SecPlus Academy",
  short: "S+",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "CompTIA", title: "CompTIA Security+", code: "SY0-701", questions: 90, minutes: 90, passPct: 83 },
  description: "Self-paced CompTIA Security+ SY0-701 course with adaptive training and practice exams.",
  seo: {
    title: "CompTIA Security+ SY0-701 Practice Questions and Study Guide | SecPlus Academy",
    h1: "Security+ SY0-701 Practice Questions and Study Guide",
    intro: "SecPlus Academy is a free Security+ SY0-701 practice question and study guide course: fifty-four lessons across the five exam domains, a printable memorization sheet of controls, attacks, and protocols, tutorials built from your misses, and unlimited practice tests. Use it as a Security+ study guide on its own, or take an SY0-701 practice test after every lesson.",
    phrases: ["Security+ SY0-701 practice questions", "Security+ study guide", "SY0-701 practice test"],
    pbqPhrases: ["Security+ PBQs", "SY0-701 performance-based questions", "Security+ PBQ practice"],
    faq: [
      { q: "How many questions are on the Security+ SY0-701 exam?", a: "Up to 90 questions in 90 minutes, multiple choice and performance-based. The passing score is 750 on a scale of 100 to 900." },
      { q: "What are the SY0-701 domains?", a: "General security concepts, threats, vulnerabilities and mitigations, security architecture, security operations, and security program management and oversight." },
      { q: "How much does Security+ cost?", a: "See CompTIA's current voucher price; the course is free." },
      { q: "How does the course decide I am ready?", a: "Three of your last five fifty-question practice tests at 80% or better, then one ninety-question test at the real passing score of 750 of 900." },
      { q: "Is Security+ harder than Network+?", a: "Most candidates find it broader rather than harder: more terminology, fewer calculations. The cheat sheet carries every term the objectives name." }
    ]
  },
  domains: [
    { id: 1, name: "General Security Concepts", short: "Concepts", pct: 12, quota: 6 },
    { id: 2, name: "Threats, Vulnerabilities, and Mitigations", short: "Threats", pct: 22, quota: 11 },
    { id: 3, name: "Security Architecture", short: "Architecture", pct: 18, quota: 9 },
    { id: 4, name: "Security Operations", short: "Operations", pct: 28, quota: 14 },
    { id: 5, name: "Security Program Management and Oversight", short: "Governance", pct: 20, quota: 10 }
  ],
  // Practice tests pass at 80%; the official-format test uses 83%, the real exam's 750 of 900.
  test: { questions: 50, minutes: 50, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3, pbqInTest: 3 },
  starterPool: {
    1: ["u1l1", "u1l3", "u2l2", "u2l4", "u1l2", "u2l3"],
    2: ["u3l1", "u3l3", "u5l1", "u5l2", "u4l2", "u5l5"],
    3: ["u7l1", "u7l2", "u8l3", "u6l2", "u8l1", "u8l4"],
    4: ["u12l2", "u13l1", "u10l2", "u11l2", "u9l2", "u12l3"],
    5: ["u14l3", "u14l1", "u15l1", "u15l3", "u14l4", "u15l2"]
  },
  core: {
    1: ["u1l1", "u1l2", "u1l3", "u2l2", "u2l4"],
    2: ["u3l1", "u3l3", "u5l1", "u5l2", "u5l5"],
    3: ["u7l1", "u7l2", "u8l1", "u8l3"],
    4: ["u9l1", "u10l2", "u11l2", "u12l2", "u13l1"],
    5: ["u14l1", "u14l3", "u15l1", "u15l3"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "The real exam passes at 750 on a 100 to 900 scale. This course's official-format test uses 83%, that score divided by 900.",
  examDay: [
    "Up to 90 questions in 90 minutes, including performance-based items. Do the multiple choice first if a simulation stalls you; flag and return.",
    "Read for the qualifier: BEST, MOST likely, FIRST, NEXT, LEAST. The answer is usually the least disruptive control that fixes the stated problem.",
    "Sort every control into its category (technical, managerial, operational, physical) and type (preventive, deterrent, detective, corrective, compensating, directive) before you answer.",
    "Incident response order and the risk formulas (SLE = AV x EF, ALE = SLE x ARO) are free points; know them cold.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Port pairs, hash lengths, risk math, CVSS bands, control classification, agreement types, and access control models are generated fresh every time.",
  legacyStoreKeys: []
};
