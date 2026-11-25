// INST1 Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "inst1",
  name: "INST1 Academy",
  short: "I1",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "BICSI", title: "Installer 1", code: "INST1", questions: 75, minutes: 120, passPct: 75, fee: "$335 member, $400 nonmember; retest $135 or $200" },
  description: "Self-paced BICSI Installer 1 (INST1) exam prep with cabling labs, adaptive training, and practice exams.",
  seo: {
    title: "BICSI Installer 1 Study Guide and Practice Tests | INST1 Academy",
    h1: "BICSI Installer 1 (INST1) Study Guide and Practice Tests",
    intro: "INST1 Academy is a free study guide and practice-test course for the BICSI Installer 1 written exam. Fifty-two lessons follow the exam's nine areas from the installer's side of the job: pathways and spaces, bonding, firestop, pulling, termination, testing, and troubleshooting. Ten task labs rehearse the work behind the hands-on exam, a printable INST1 cheat sheet collects the distances, fill rules, pulling limits, and color codes worth memorizing, and every practice test is built from the exam's area weights. Use it as your BICSI Installer 1 study guide and take an INST1 practice test as often as you like, free while the site launches. For anyone starting out who wants a structured cabling certification or a low voltage cabling certification, Installer 1 is the usual first step, and the practice tests here are written in the style of BICSI installer exam questions without reproducing any of them.",
    phrases: ["BICSI Installer 1 study guide", "INST1 practice test", "BICSI installer exam questions", "structured cabling certification", "low voltage cabling certification"],
    related: ["netplus", "aplus1"],
    faq: [
      { q: "How many questions are on the BICSI Installer 1 exam?", a: "The written exam has 75 multiple-choice questions in 2 hours, on a computer at a Pearson test center. Questions test both knowledge and how you apply it. A calculator and a whiteboard are provided, and there are no scheduled breaks." },
      { q: "What is the Installer 1 hands-on exam?", a: "Six tasks done to industry standards, 20 minutes each, graded pass or fail after each task. It is given on the last day of BICSI's Installer 1 class. Fail one task and you may retry it the same day at no cost; fail the same task twice, or two tasks, and you retake the hands-on on another date. You must pass the hands-on before you can take the written exam. This course's labs prepare the knowledge behind those tasks; nothing replaces practice with real tools." },
      { q: "How is the Installer 1 written exam scored?", a: "BICSI sets the passing score through a standard-setting panel of experts and does not publish it. If you fail, you get a report of your performance by topic area, not a score. This course's official-format test asks for 75 percent." },
      { q: "Who can take the Installer 1?", a: "No installation experience is required. BICSI recommends its Installer 1 training class, about 50 hours of independent study, and safety and PPE training. Candidates must be able to tell colors apart, do fine hand work, stand for long periods, climb ladders, and lift and carry up to 50 pounds." },
      { q: "How much does the Installer 1 cost?", a: "The application fee is $335 for BICSI members and $400 for nonmembers, and it covers your first hands-on and first written attempt. A retest is $135 for members and $200 for nonmembers. You have one year from your first hands-on attempt, with a 30-day wait between unsuccessful attempts and 90 days after a third." },
      { q: "Does the Installer 1 renew?", a: "No. Installer 1 is a nonrenewable certificate. The next steps are Installer 2 Copper and Installer 2 Optical Fiber." },
      { q: "Is this course from BICSI?", a: "No. INST1 Academy is an independent course and is not affiliated with or endorsed by BICSI. Its lessons and questions are original and never reproduce exam content." },
      { q: "Do I need tools for the labs?", a: "No. Every lab runs on screen. If you want to do the work by hand, a punch-down tool with a 110 blade, a few Category 6 jacks, some scrap cable, a jacket stripper, plugs and a crimper, a continuity tester, and a label maker cost about $50." },
      { q: "Is the course free?", a: "Yes. The lessons, the labs, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Field Planning, Implementation, and Design", short: "Planning", pct: 13, quota: 6 },
    { id: 2, name: "Pathways and Spaces", short: "Pathways", pct: 31, quota: 16 },
    { id: 3, name: "Pulling Copper and Fiber Cable", short: "Pulling", pct: 21, quota: 11 },
    { id: 4, name: "Terminating Copper and Fiber Cable", short: "Termination", pct: 15, quota: 8 },
    { id: 5, name: "Testing", short: "Testing", pct: 6, quota: 3 },
    { id: 6, name: "Troubleshooting", short: "Troubleshooting", pct: 6, quota: 3 },
    { id: 7, name: "Retrofits", short: "Retrofits", pct: 3, quota: 1 },
    { id: 8, name: "Integration and Convergence", short: "Integration", pct: 3, quota: 1 },
    { id: 9, name: "Codes and Standards", short: "Codes", pct: 2, quota: 1 }
  ],
  // Practice tests pass at 80%; the official-format test uses 75% because BICSI publishes no passing score.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l2", "u1l3", "u1l4", "u1l7", "u1l5", "u1l6"],
    2: ["u3l1", "u3l2", "u3l4", "u3l6", "u3l12", "u3l14", "u3l15", "u3l3", "u3l5", "u3l7", "u3l8", "u3l9", "u3l10", "u3l11", "u3l13"],
    3: ["u4l1", "u4l3", "u4l4", "u4l6", "u4l2", "u4l5", "u4l7", "u4l8", "u4l9", "u4l10"],
    4: ["u5l1", "u5l2", "u5l3", "u5l4", "u5l6", "u5l5", "u5l7", "u5l8"],
    5: ["u6l1", "u6l2", "u6l3"],
    6: ["u7l1", "u7l2", "u7l3"],
    7: ["u8l1", "u8l2"],
    8: ["u9l1", "u9l2"],
    9: ["u2l1", "u2l2"]
  },
  core: {
    1: ["u1l1", "u1l2", "u1l3", "u1l4", "u1l7"],
    2: ["u3l1", "u3l2", "u3l4", "u3l6", "u3l12", "u3l14", "u3l15"],
    3: ["u4l1", "u4l3", "u4l4", "u4l6"],
    4: ["u5l1", "u5l2", "u5l3", "u5l4", "u5l6"],
    5: ["u6l1", "u6l2"],
    6: ["u7l1", "u7l2"],
    7: ["u8l1", "u8l2"],
    8: ["u9l1", "u9l2"],
    9: ["u2l1", "u2l2"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  kit: ["Punch-down tool with a 110 blade", "Category 6 keystone jacks (four or more)", "A few feet of Category 6 cable", "Cable jacket stripper", "RJ-45 plugs and a crimper", "Continuity or wiremap tester", "Label maker or a fine marker and labels"],
  kitLab: "label-run",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "BICSI sets the written exam's passing score by expert panel and does not publish it. This course's official-format test asks for 75%.",
  examDay: [
    "Hands-on first: six tasks, 20 minutes each, graded pass or fail as you finish each one. Work to the standard, not just until it works, and leave the work area clean.",
    "The written exam comes after you pass the hands-on: 75 questions in 2 hours at a Pearson center, about a minute and a half each. A calculator and whiteboard are provided; there are no scheduled breaks.",
    "Read for the qualifier: FIRST, MOST likely, BEST. The installer's answer is the one that is safe, to code, and to the standard, in that order.",
    "Know the numbers cold: 90 m and 100 m, 13 mm untwist, 25 lbf per cable, the bend radius multipliers, 40 percent fill, two bends between pull points, and the color codes.",
    "Bring a government photo ID with signature and a second ID; the name must match your BICSI profile exactly."
  ],
  generatedNote: "Conduit fill, bend radius, pulling tension, cable quantity from a run list, and the 25-pair color code are generated fresh every time.",
  legacyStoreKeys: []
};
