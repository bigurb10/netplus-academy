// APlus Academy Core 2 course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "aplus2",
  name: "APlus Academy Core 2",
  short: "A2",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "CompTIA", title: "CompTIA A+ Core 2", code: "220-1202", questions: 90, minutes: 90 },
  description: "Self-paced CompTIA A+ Core 2 (220-1202) course with adaptive training and practice exams.",
  domains: [
    { id: 1, name: "Operating Systems", short: "OS", pct: 28, quota: 14 },
    { id: 2, name: "Security", short: "Security", pct: 28, quota: 14 },
    { id: 3, name: "Software Troubleshooting", short: "Troubleshooting", pct: 23, quota: 12 },
    { id: 4, name: "Operational Procedures", short: "Procedures", pct: 21, quota: 10 }
  ],
  // The real exam passes at 700 of 900, so the course bar is 85% to keep a margin.
  test: { questions: 50, minutes: 50, passPct: 85, streakNeeded: 3, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l2", "u1l3", "u1l4", "u2l1", "u2l2", "u2l3", "u2l4", "u2l5", "u2l6", "u3l1", "u3l2"],
    2: ["u4l1", "u4l2", "u4l3", "u4l4", "u4l5", "u5l1", "u5l2", "u5l3", "u5l4", "u5l5", "u5l6", "u5l7", "u5l8"],
    3: ["u6l1", "u6l2", "u6l3", "u6l4", "u6l5", "u6l6"],
    4: ["u7l1", "u7l2", "u7l3", "u8l1", "u8l2", "u8l3", "u8l4", "u9l1", "u9l2", "u9l3"]
  },
  core: {
    1: ["u1l1", "u1l2", "u2l1", "u2l3", "u3l2"],
    2: ["u4l2", "u4l4", "u5l1", "u5l8"],
    3: ["u6l1", "u6l2", "u6l3"],
    4: ["u7l3", "u8l3", "u9l2"]
  },
  freeCourse: true,
  free: { lessons: 10 },
  upgradeUrl: "",
  realExamNote: "The real exam passes at 700 on a 100 to 900 scale, roughly 67% depending on the scaling.",
  examDay: [
    "Up to 90 questions in 90 minutes with performance-based items; do the multiple choice first if a simulation stalls you, flag it and return.",
    "Tool names and their .msc or .exe files, command switches, the seven malware removal steps in order, and the permission rules (most restrictive over the network, Deny wins, move keeps and copy inherits) are pure recall; know them cold.",
    "Troubleshooting items want the least destructive fix that follows the change: roll back the driver before reinstalling Windows, quarantine before scanning, verify before quarantining.",
    "Operational procedure items reward the procedural answer: report and preserve rather than investigate, change board rather than just do it, restore to an alternative location rather than overwrite.",
    "Read for the qualifier: BEST, MOST likely, FIRST, NEXT. Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Windows tools and commands, Linux commands and permissions, malware types, effective permissions, the malware removal steps, Windows symptoms, and backup math are generated fresh every time.",
  legacyStoreKeys: []
};
