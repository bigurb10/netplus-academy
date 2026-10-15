// NetPlus Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "netplus",
  name: "NetPlus Academy",
  short: "N+",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "CompTIA", title: "CompTIA Network+", code: "N10-009", questions: 90, minutes: 90, passPct: 80 },
  description: "Self-paced CompTIA Network+ N10-009 course with adaptive training and practice exams.",
  seo: {
    title: "CompTIA Network+ N10-009 Practice Tests and Study Guide | NetPlus Academy",
    h1: "Network+ N10-009 Practice Tests and Study Guide",
    intro: "NetPlus Academy is a free Network+ N10-009 practice test and study guide course: forty-nine lessons mapped to the exam objectives, a printable memorization sheet of ports, protocols, and subnetting, tutorials built from what you miss, and unlimited practice tests in the exam's format. Use it as a Network+ study guide on its own, or work through the N10-009 practice questions bank lesson by lesson.",
    phrases: ["Network+ N10-009 practice test", "Network+ study guide", "N10-009 practice questions"],
    pbqPhrases: ["Network+ PBQs", "N10-009 performance-based questions", "Network+ PBQ practice"],
    faq: [
      { q: "How many questions are on the Network+ N10-009 exam?", a: "Up to 90 questions in 90 minutes, a mix of multiple choice and performance-based items. The passing score is 720 on a scale of 100 to 900." },
      { q: "What does the exam cover?", a: "Networking concepts, network implementation, network operations, network security, and network troubleshooting, in CompTIA's published weights. The course's practice tests use the same weights." },
      { q: "How much does Network+ cost?", a: "See CompTIA's current voucher price; the course itself is free." },
      { q: "How does this course decide I am ready?", a: "Three of your last five fifty-question practice tests at 80% or better, then one ninety-question test at the real passing score of 720 of 900." },
      { q: "Can I read the lessons without signing up?", a: "The first fifteen lessons and the cheat sheet are open on this site; the full course, with checkpoints and practice tests, is free inside the app." }
    ]
  },
  // Domains in exam order. id is what lessons reference in their `domain` field. quota is the count on the full test.
  domains: [
    { id: 1, name: "Networking Concepts", short: "Concepts", pct: 23, quota: 12 },
    { id: 2, name: "Network Implementation", short: "Implementation", pct: 20, quota: 10 },
    { id: 3, name: "Network Operations", short: "Operations", pct: 19, quota: 9 },
    { id: 4, name: "Network Security", short: "Security", pct: 14, quota: 7 },
    { id: 5, name: "Network Troubleshooting", short: "Troubleshooting", pct: 24, quota: 12 }
  ],
  test: { questions: 50, minutes: 50, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3, pbqInTest: 3 },
  // Lessons the starter test samples from, per domain (starterPerDomain different lessons each time).
  starterPool: {
    1: ["u2l1", "u2l2", "u4l3", "u5l2", "u3l3", "u7l4", "u4l5", "u1l3"],
    2: ["u6l2", "u6l3", "u7l2", "u6l6", "u7l3", "u6l4", "u6l5"],
    3: ["u5l3", "u5l4", "u8l3", "u8l5", "u8l6", "u8l2"],
    4: ["u8l7", "u8l8", "u8l9"],
    5: ["u9l1", "u9l3", "u9l5", "u9l2", "u9l4"]
  },
  // Core lessons added when a domain shows a gap on the starter test.
  core: {
    1: ["u2l1", "u2l2", "u3l1", "u3l3", "u4l2", "u4l3", "u5l1", "u5l2", "u7l4"],
    2: ["u6l2", "u6l3", "u6l5", "u6l6", "u7l2", "u7l3"],
    3: ["u5l3", "u5l4", "u8l3", "u8l5", "u8l6"],
    4: ["u8l7", "u8l8", "u8l9"],
    5: ["u9l1", "u9l3", "u9l5"]
  },
  // Access. freeCourse true means everything is open (launch mode). free.lessons is the count of free lessons in course order.
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "The real exam passes at 720 on a 100 to 900 scale. This course's official-format test uses 80%, that score divided by 900.",
  examDay: [
    "Up to 90 questions in 90 minutes, including performance-based items. Do the multiple choice first if a simulation stalls you; flag and return.",
    "Read for the qualifier: MOST likely, BEST, FIRST, NEXT. The methodology questions are about order.",
    "Subnet with block sizes on the scratch board. 256 minus the mask octet, then count.",
    "Eliminate two options, then decide. Never leave a question blank.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Subnetting, ports, OSI, route-selection, and PoE items are generated fresh every time.",
  legacyStoreKeys: ["npa.state.v2"]
};
