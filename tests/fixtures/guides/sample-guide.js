window.FRA = window.FRA || {};
FRA.guides = FRA.guides || [];
FRA.guides.push({
  slug: "sample-guide", title: "A Sample Guide & More", description: "A fixture guide for the generator tests.", updated: "2026-10-13",
  related: { courses: ["mini"], lessons: ["mini:u1l1"] },
  faq: [{ q: "Is this a test?", a: "Yes, a fixture." }],
  body: `This guide exists so the generator can be tested.

## A heading
- A bullet with **bold** and {{code}}.

> A tip line.`
});
