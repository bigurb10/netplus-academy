// APlus Academy Core 1 course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "aplus1",
  name: "APlus Academy Core 1",
  short: "A1",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "CompTIA", title: "CompTIA A+ Core 1", code: "220-1201", questions: 90, minutes: 90, passPct: 75 },
  description: "Self-paced CompTIA A+ Core 1 (220-1201) course with adaptive training and practice exams.",
  seo: {
    title: "CompTIA A+ Core 1 220-1201 Practice Test and Study Guide | APlus Academy Core 1",
    h1: "A+ Core 1 220-1201 Practice Test and Study Guide",
    intro: "APlus Academy Core 1 is a free A+ Core 1 220-1201 practice test and study guide course: forty-one lessons on mobile devices, networking, hardware, virtualization, cloud, and troubleshooting, a printable memorization sheet, tutorials built from your misses, and unlimited practice tests. Use it as an A+ 220-1201 study guide on its own, or work through the CompTIA A+ practice questions bank lesson by lesson.",
    phrases: ["A+ Core 1 220-1201 practice test", "A+ 220-1201 study guide", "CompTIA A+ practice questions"],
    pbqPhrases: ["A+ Core 1 PBQs", "220-1201 performance-based questions", "A+ PBQ practice"],
    faq: [
      { q: "How many questions are on the A+ Core 1 exam?", a: "Up to 90 questions in 90 minutes, multiple choice and performance-based. The passing score is 675 on a scale of 100 to 900." },
      { q: "Do I need both A+ exams?", a: "Yes. The A+ certification needs Core 1 (220-1201) and Core 2 (220-1202); this course covers Core 1 and its sister course covers Core 2." },
      { q: "How much does A+ cost?", a: "See CompTIA's current voucher price for each exam; the course is free." },
      { q: "How does the course decide I am ready?", a: "Three of your last five fifty-question practice tests at 80% or better, then one ninety-question test at the real passing score of 675 of 900." }
    ]
  },
  domains: [
    { id: 1, name: "Mobile Devices", short: "Mobile", pct: 13, quota: 6 },
    { id: 2, name: "Networking", short: "Networking", pct: 23, quota: 12 },
    { id: 3, name: "Hardware", short: "Hardware", pct: 25, quota: 12 },
    { id: 4, name: "Virtualization and Cloud Computing", short: "Cloud", pct: 11, quota: 6 },
    { id: 5, name: "Hardware and Network Troubleshooting", short: "Troubleshooting", pct: 28, quota: 14 }
  ],
  // Practice tests pass at 80%; the official-format test uses 75%, the real exam's 675 of 900.
  test: { questions: 50, minutes: 50, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3, pbqInTest: 2 },
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
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "The real exam passes at 675 on a 100 to 900 scale. This course's official-format test uses 75%, that score divided by 900.",
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
