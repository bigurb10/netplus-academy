// CBET Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "cbet",
  name: "CBET Academy",
  short: "CB",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "AAMI / ACI", title: "Certified Biomedical Equipment Technician", code: "CBET" },
  description: "Self-paced Certified Biomedical Equipment Technician (CBET) exam prep with adaptive training and practice exams.",
  domains: [
    { id: 1, name: "Anatomy and Physiology", short: "A&P", pct: 7, quota: 4 },
    { id: 2, name: "Public Safety in the Healthcare Facility", short: "Safety", pct: 10, quota: 5 },
    { id: 3, name: "Fundamentals of Electricity and Electronics", short: "Electronics", pct: 6, quota: 3 },
    { id: 4, name: "Healthcare Technology and Function", short: "Function", pct: 30, quota: 15 },
    { id: 5, name: "Healthcare Technology Problem Solving", short: "Problem Solving", pct: 30, quota: 15 },
    { id: 6, name: "Healthcare Information Technology", short: "Healthcare IT", pct: 17, quota: 8 }
  ],
  // The real exam needs roughly 70%, so the course bar is 85% to keep a margin.
  test: { questions: 50, minutes: 55, passPct: 85, streakNeeded: 3, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l2", "u1l3", "u1l4", "u1l5", "u1l1", "u1l6", "u1l7"],
    2: ["u3l1", "u3l2", "u3l3", "u3l4", "u3l5", "u3l6", "u3l7"],
    3: ["u2l1", "u2l2", "u2l4", "u2l5", "u2l3", "u2l6", "u2l7"],
    4: ["u4l1", "u4l2", "u4l3", "u4l6", "u5l2", "u6l1", "u6l3", "u6l4", "u5l1", "u5l4", "u4l7", "u5l5", "u5l6", "u5l7", "u6l5"],
    5: ["u7l1", "u7l4", "u8l1", "u8l5", "u7l2", "u8l2", "u8l3", "u7l6", "u8l6"],
    6: ["u9l1", "u9l5", "u9l4", "u9l3", "u9l6", "u9l2", "u9l7", "u9l8"]
  },
  core: {
    1: ["u1l2", "u1l3"],
    2: ["u3l1", "u3l2", "u3l3"],
    3: ["u2l1", "u2l2"],
    4: ["u4l1", "u4l2", "u4l3", "u4l6", "u5l2", "u6l1", "u6l3", "u6l4"],
    5: ["u7l1", "u7l4", "u8l1", "u8l5"],
    6: ["u9l1", "u9l5", "u9l4"]
  },
  freeCourse: true,
  free: { lessons: 10 },
  upgradeUrl: "",
  realExamNote: "The real exam requires about 116 of 165 correct, roughly 70%.",
  examDay: [
    "165 questions in 3 hours, closed book, with a simple calculator allowed. That is over a minute per question; do not rush the math items.",
    "Some questions are unscored trial items. A question that seems to be from nowhere may be one of them; answer it and move on.",
    "Read for the qualifier: FIRST, MOST likely, BEST. In problem-solving items the first step is usually the patient, then the simplest cause, then the accessory.",
    "Know the safety numbers cold: leakage limits and the current thresholds, ECG paper math, pressure and temperature conversions, and the infusion rate formula.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Ohm's law and circuit math, RC time constants, leakage limits and shock thresholds, ECG rate math, unit conversions, infusion rates and doses, ventilator math, and subnet questions are generated fresh every time.",
  legacyStoreKeys: []
};
