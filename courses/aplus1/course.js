// APlus Academy Core 1 course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "aplus1",
  name: "APlus Academy Core 1",
  short: "A1",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "CompTIA", title: "CompTIA A+ Core 1", code: "220-1201" },
  description: "Self-paced CompTIA A+ Core 1 (220-1201) course with adaptive training and practice exams.",
  domains: [
    { id: 1, name: "Mobile Devices", short: "Mobile", pct: 13, quota: 6 },
    { id: 2, name: "Networking", short: "Networking", pct: 23, quota: 12 },
    { id: 3, name: "Hardware", short: "Hardware", pct: 25, quota: 12 },
    { id: 4, name: "Virtualization and Cloud Computing", short: "Cloud", pct: 11, quota: 6 },
    { id: 5, name: "Hardware and Network Troubleshooting", short: "Troubleshooting", pct: 28, quota: 14 }
  ],
  // The real exam passes at 675 of 900, so the course bar is 85% to keep a margin.
  test: { questions: 50, minutes: 50, passPct: 85, streakNeeded: 3, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l3", "u1l2", "u1l4"],
    2: ["u2l2", "u3l1", "u2l3", "u3l3", "u2l4", "u3l4", "u2l5", "u3l6", "u2l1", "u3l2", "u3l5"],
    3: ["u4l1", "u5l1", "u5l3", "u6l2", "u4l2", "u5l4", "u5l7", "u6l1", "u4l3", "u5l2", "u5l5", "u5l6", "u6l3"],
    4: ["u7l1", "u7l3", "u7l4", "u7l2"],
    5: ["u8l2", "u9l1", "u8l3", "u9l2", "u8l4", "u8l5", "u9l3", "u8l1", "u8l6"]
  },
  core: {
    1: ["u1l1", "u1l3"],
    2: ["u2l2", "u2l3", "u3l1", "u3l3"],
    3: ["u4l1", "u4l2", "u5l1", "u5l3", "u5l4", "u6l2"],
    4: ["u7l1", "u7l3"],
    5: ["u8l2", "u8l3", "u9l1", "u9l2"]
  },
  freeCourse: true,
  free: { lessons: 10 },
  upgradeUrl: "",
  realExamNote: "The real exam passes at 675 on a 100 to 900 scale, roughly 64% depending on the scaling.",
  examDay: [
    "Up to 90 questions in 90 minutes with performance-based items; do the multiple choice first if a simulation stalls you, flag it and return.",
    "Port numbers, 802.11 standards, cable categories, connector names, DDR generations, and the seven laser steps are pure recall; know them cold.",
    "In troubleshooting items the simplest physical cause usually wins: cable, input source, seating, power, toner, rollers.",
    "Read for the qualifier: BEST, MOST likely, FIRST, NEXT. Never pick reinstalling the OS when a driver or setting fixes it.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Port numbers, wireless standards, IP addressing, DNS records, cable categories, interface speeds, RAID math, and printer symptoms are generated fresh every time.",
  legacyStoreKeys: []
};
