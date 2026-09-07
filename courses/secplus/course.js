// SecPlus Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "secplus",
  name: "SecPlus Academy",
  short: "S+",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "CompTIA", title: "CompTIA Security+", code: "SY0-701" },
  description: "Self-paced CompTIA Security+ SY0-701 course with adaptive training and practice exams.",
  domains: [
    { id: 1, name: "General Security Concepts", short: "Concepts", pct: 12, quota: 6 },
    { id: 2, name: "Threats, Vulnerabilities, and Mitigations", short: "Threats", pct: 22, quota: 11 },
    { id: 3, name: "Security Architecture", short: "Architecture", pct: 18, quota: 9 },
    { id: 4, name: "Security Operations", short: "Operations", pct: 28, quota: 14 },
    { id: 5, name: "Security Program Management and Oversight", short: "Governance", pct: 20, quota: 10 }
  ],
  // The real exam passes at about 83%, so the course bar is 90% to keep a margin.
  test: { questions: 50, minutes: 50, passPct: 90, streakNeeded: 3, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
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
  free: { lessons: 10 },
  upgradeUrl: "",
  realExamNote: "The real exam passes at 750 of 900, about 83%.",
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
