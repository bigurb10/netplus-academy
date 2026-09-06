window.FRA = window.FRA || {};
FRA.questions = FRA.questions || [];
for (const t of ["u1l1", "u1l2", "u1l3", "u2l1", "u2l2", "u2l3"]) {
  for (let i = 1; i <= 5; i++) {
    FRA.questions.push({ id: `${t}-${i}`, t, q: `Question ${i} for lesson ${t}: which option is correct?`, a: ["Wrong one", "Right answer", "Wrong two", "Wrong three"], c: 1, e: `Right answer is correct for ${t} question ${i} because the fixture says so.` });
  }
}
