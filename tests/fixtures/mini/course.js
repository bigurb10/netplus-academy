window.FRA = window.FRA || {};
FRA.course = {
  id: "mini", name: "Mini Course", short: "MC", brand: "FieldReady Academy", catalogUrl: "../",
  exam: { vendor: "Test", title: "Mini Exam", code: "MC-1" }, description: "Fixture course for engine tests.",
  domains: [
    { id: 1, name: "Alpha", short: "Alpha", pct: 40, quota: 4 },
    { id: 2, name: "Beta", short: "Beta", pct: 30, quota: 3 },
    { id: 3, name: "Gamma", short: "Gamma", pct: 30, quota: 3 }
  ],
  test: { questions: 10, minutes: 10, passPct: 80, streakNeeded: 2, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: { 1: ["u1l1", "u1l2"], 2: ["u1l3", "u2l1"], 3: ["u2l2", "u2l3"] },
  core: { 1: ["u1l1"], 2: ["u1l3"], 3: ["u2l2"] },
  freeCourse: true, free: { lessons: 3 }, upgradeUrl: "",
  realExamNote: "The real exam passes at 70%.",
  examDay: ["Sleep.", "Read every option."],
  generatedNote: "",
  legacyStoreKeys: []
};
