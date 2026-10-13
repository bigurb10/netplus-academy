window.FRA = window.FRA || {};
FRA.guides = FRA.guides || [];
FRA.guides.push({
  slug: "network-plus-n10-009-exam-guide", title: "CompTIA Network+ N10-009 Exam Guide", description: "Format, scoring, the five domains, performance-based questions, and the short list of facts you need cold for N10-009.", updated: "2026-10-13",
  related: { courses: ["netplus"], lessons: ["netplus:u2l2", "netplus:u3l1", "netplus:u4l3"] },
  faq: [
    { q: "How many questions are on N10-009 and what is passing?", a: "Up to 90 questions in 90 minutes, a mix of multiple choice and performance-based items, with a passing score of 720 on a 100 to 900 scale." },
    { q: "How much does the exam cost?", a: "See CompTIA's current voucher price. It changes, and buying through a bundle or a retake-insurance package changes it again, so check before you budget." },
    { q: "Do I need Network+ before Security+?", a: "Not formally. Security+ has no required prerequisite. But Security+ assumes you can read a network diagram and know what a firewall rule or a VLAN is, so doing Network+ first makes the second exam noticeably easier." },
    { q: "How much subnetting do I really need?", a: "Enough to convert a prefix to a mask, find the block size, and name the network and broadcast addresses for any given host, in your head, in under a minute. That skill shows up in several forms, including inside performance-based items." },
    { q: "How long does studying take?", a: "For someone comfortable with computers but new to networking, eight to twelve weeks of steady work is typical. The ceiling is usually subnetting and port numbers, not the concepts." }
  ],
  body: `Network+ N10-009 is the exam that proves you can be handed a network and not break it. It is broad rather than deep: a lot of vocabulary, a handful of skills you must have automatic, and a troubleshooting method that the exam keeps testing in different costumes.

## The format

**Up to 90 questions in 90 minutes.** The item types are multiple choice and performance-based. Passing is **720 out of 900**, on a scale that starts at 100, so the raw percentage you need is not the same as 80 percent and you should not try to reverse-engineer it. Aim to be comfortably strong rather than exactly adequate.

A minute per question sounds generous until a performance-based item eats six of them. Pace is a skill you train, not a thing you hope for.

## The five domains

- **Networking concepts.** The OSI model, topologies, addressing, ports and protocols, cloud and datacenter architectures, traffic types.
- **Network implementation.** Routing and switching configuration, VLANs, wireless standards and placement, physical installation.
- **Network operations.** Documentation, monitoring, performance metrics, disaster recovery, and the policies that keep a network supportable.
- **Network security.** Hardening, access control, common attacks, segmentation, remote access, and the basics of where security sits in a network design.
- **Network troubleshooting.** The method, the tools, and the specific symptom-to-cause patterns for cable, wireless, and routing problems.

Troubleshooting is the domain people underprepare because it feels like something you either can do or cannot. It is actually the most learnable of the five, because the exam rewards a disciplined order of operations: identify the problem, establish a theory, test the theory, build a plan, implement, verify, document. When a question gives you a symptom and four plausible actions, the right answer is usually the next step in that order, not the most clever fix.

## Performance-based questions

These are the ones that make people nervous. They are not programming tasks. Expect to drag items into the right place, fill in a configuration, read a set of outputs and pick what is wrong, or complete a table. Two habits help:

1. **Do not start with them.** If the first item is performance-based and it is not obvious in twenty seconds, flag it and move on. Answer the 80 multiple-choice questions you can bank, then come back with whatever time is left.
2. **Read the whole prompt before touching anything.** These items usually tell you the constraint in the last sentence, and candidates who start clicking from the first sentence end up redoing the work.

## What to know cold

Three areas repay memorization more than anything else on this exam, because they turn questions into reflexes.

- **Ports and protocols.** The familiar ones first: {{22}} for SSH, {{53}} for DNS, {{80}} and {{443}} for web traffic, {{3389}} for RDP, plus the mail, directory, and management ports. Know the transport protocol with each, because a question will ask about TCP versus UDP rather than the number itself.
- **Subnetting.** Prefix to mask, mask to block size, block size to network and broadcast address, and the host range in between. Practice it until it is arithmetic and not a puzzle.
- **Cable and media standards.** The copper categories and their speed and distance limits, the fiber types and where each belongs, and the connectors and transceivers that go with them. These are pure recall and the exam asks for them directly.

## How the course maps to the exam

Our Network+ course is built to put you across that 720 line rather than to cover everything equally.

1. **The cheat sheet first.** Every number, port, standard, and formula in one place, so you see the shape of the exam before the first lesson.
2. **A starter test.** It finds what you already know, and a tutorial is built from what you missed instead of from a fixed syllabus.
3. **Lessons in rail order,** with the first fifteen readable without the app so you can judge the writing before you commit.
4. **Fifty-question practice tests** until three of your last five reach 80 percent. Fifty questions is long enough to be honest and short enough to do after work.
5. **One final test in the real format,** up to 90 questions in 90 minutes, scored at the exam's own passing mark. Clear that and you have met the exam on its own terms once before test day.

The course is free while the site launches.

> If you are failing practice tests by five or ten points, the fix is almost never more concepts. Check subnetting speed and port recall first; those two usually account for the gap.`
});
