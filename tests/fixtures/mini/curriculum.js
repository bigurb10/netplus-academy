window.FRA = window.FRA || {};
FRA.units = FRA.units || [];
const mkLesson = (id, title, domain) => ({ id, title, domain, obj: "1.1", minutes: 3, body: `Lesson ${title}.\n\n## Heading\n- point one\n- point two\n\n> Tip for ${title}.`, hook: `Remember ${title}.` });
FRA.units.push({ id: "u1", n: 1, title: "Unit One", domain: 1, blurb: "First unit.", assumes: "Nothing.", lessons: [mkLesson("u1l1", "A One", 1), mkLesson("u1l2", "A Two", 1), mkLesson("u1l3", "B One", 2)] });
FRA.units.push({ id: "u2", n: 2, title: "Unit Two", domain: 2, blurb: "Second unit.", assumes: "Unit one.", lessons: [mkLesson("u2l1", "B Two", 2), mkLesson("u2l2", "C One", 3), mkLesson("u2l3", "C Two", 3)] });
