// BMET Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "bmet",
  name: "BMET Academy",
  short: "BM",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "AAMI / ACI", title: "Certified Associate in Biomedical Technology", code: "CABT", questions: 100, minutes: 120, passPct: 70 },
  description: "Biomed basic training for the AAMI/ACI CABT: 53 lessons, 13 hands-on labs on virtual instruments, a printable memorization sheet, adaptive tutorials, and practice exams.",
  domains: [
    { id: 1, name: "Anatomy and Physiology", short: "A&P", pct: 10, quota: 5 },
    { id: 2, name: "Medical Devices and Test Equipment", short: "Devices", pct: 23, quota: 12 },
    { id: 3, name: "Safety in Healthcare", short: "Safety", pct: 16, quota: 8 },
    { id: 4, name: "Electricity and Electronics", short: "Electricity", pct: 14, quota: 7 },
    { id: 5, name: "Reasoning and Problem Solving", short: "Reasoning", pct: 24, quota: 12 },
    { id: 6, name: "Healthcare IT", short: "Healthcare IT", pct: 13, quota: 6 },
    { id: 7, name: "Your Career", short: "Career", pct: 0, quota: 0 }
  ],
  // Practice tests pass at 80%; the official-format test uses 70% because ACI publishes no CABT cut score.
  test: { questions: 50, minutes: 60, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u2l2", "u2l6", "u2l3", "u2l1", "u2l4", "u2l5"],
    2: ["u6l2", "u6l4", "u6l6", "u6l9", "u6l1", "u6l8", "u6l10", "u6l3", "u6l5", "u6l7"],
    3: ["u5l1", "u5l2", "u5l5", "u5l3", "u5l6", "u5l4", "u5l7"],
    4: ["u3l1", "u3l2", "u3l5", "u3l3", "u3l6", "u3l9", "u3l4", "u3l7", "u3l8"],
    5: ["u4l1", "u4l2", "u4l5", "u4l6", "u4l3", "u4l4", "u4l7"],
    6: ["u7l3", "u7l5", "u7l6", "u7l1", "u7l2", "u7l4"]
  },
  core: {
    1: ["u2l2", "u2l6"],
    2: ["u6l2", "u6l4", "u6l6", "u6l9"],
    3: ["u5l1", "u5l2", "u5l5"],
    4: ["u3l1", "u3l2", "u3l5"],
    5: ["u4l1", "u4l2", "u4l6"],
    6: ["u7l3", "u7l5"]
  },
  freeCourse: true,
  free: { lessons: 10 },
  certificate: true,
  kit: ["Digital multimeter with test leads", "Solderless breadboard and jumper wires", "Resistor assortment (at least 100, 220, 470, 1k, 2.2k, and 10k ohm)", "A few capacitors", "9 V battery and battery clip", "LEDs (red and green)", "A slide switch", "A fuse holder with a 1 A fuse"],
  kitLab: "kit-setup",
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ACI reports CABT results only as pass or fail and publishes no passing score. This course's official-format test uses 70%, the same bar as our CBET course.",
  examDay: [
    "100 multiple-choice questions in 2 hours, closed book, taken from home or an office through live remote proctoring. That is over a minute a question; read every option before you answer.",
    "You need a laptop or desktop with a movable webcam for check-in, a steady connection, and administrator rights to install the secure browser. A personal computer is strongly recommended over a work one.",
    "Test in an enclosed, quiet, well-lit room with nobody else present, pets included. The desk must be clear: no paper, pens, phones, or second screens. A four-function calculator is on the screen.",
    "Stay in view of the camera the whole time. Leaving the room, talking, reading aloud, headphones, or looking away repeatedly draws a warning, then termination.",
    "Results come back as pass or fail right away and by email within 24 hours. The fee is non-refundable, you must test within six months of purchase, and a retake waits 60 days.",
    "The credential is valid for five years and cannot be renewed; by then you qualify to sit for the CBET."
  ],
  generatedNote: "Ohm's law, series and parallel circuits, unit conversions, tolerance and percent error, ECG paper math, leakage pass/fail, infusion rate checks, and delivered-energy checks are generated fresh every time.",
  legacyStoreKeys: []
};
