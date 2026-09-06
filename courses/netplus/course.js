// NetPlus Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "netplus",
  name: "NetPlus Academy",
  short: "N+",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "CompTIA", title: "CompTIA Network+", code: "N10-009" },
  description: "Self-paced CompTIA Network+ N10-009 course with adaptive training and practice exams.",
  // Domains in exam order. id is what lessons reference in their `domain` field. quota is the count on the full test.
  domains: [
    { id: 1, name: "Networking Concepts", short: "Concepts", pct: 23, quota: 12 },
    { id: 2, name: "Network Implementation", short: "Implementation", pct: 20, quota: 10 },
    { id: 3, name: "Network Operations", short: "Operations", pct: 19, quota: 9 },
    { id: 4, name: "Network Security", short: "Security", pct: 14, quota: 7 },
    { id: 5, name: "Network Troubleshooting", short: "Troubleshooting", pct: 24, quota: 12 }
  ],
  test: { questions: 50, minutes: 50, passPct: 85, streakNeeded: 3, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
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
  free: { lessons: 10 },
  upgradeUrl: "",
  realExamNote: "The real exam passes at 720 of 900, about 72%.",
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
