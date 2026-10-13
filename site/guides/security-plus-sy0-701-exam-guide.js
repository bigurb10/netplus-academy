window.FRA = window.FRA || {};
FRA.guides = FRA.guides || [];
FRA.guides.push({
  slug: "security-plus-sy0-701-exam-guide", title: "CompTIA Security+ SY0-701 Exam Guide", description: "Format, scoring, the five SY0-701 domains, what the current version emphasizes, and how to study a terminology-heavy exam.", updated: "2026-10-13",
  related: { courses: ["secplus"], lessons: ["secplus:u1l1", "secplus:u1l2", "secplus:u2l4"] },
  faq: [
    { q: "How many questions are on SY0-701 and what is passing?", a: "Up to 90 questions in 90 minutes, with a passing score of 750 on a 100 to 900 scale. That is a higher bar than Network+ or either A+ exam." },
    { q: "What does the exam cost?", a: "See CompTIA's current voucher price. Bundles with practice material or retake coverage are priced differently again, so compare before you buy." },
    { q: "Do I need Network+ first?", a: "It is not required. It does help, because Security+ assumes you can already read a network diagram and know what a VLAN, a firewall rule, and a DNS record are. Without that background, budget extra weeks." },
    { q: "Is it mostly memorization?", a: "It is mostly vocabulary used correctly. Knowing a definition is not enough; the exam gives you a scenario and asks which named thing applies. Study by sorting and comparing terms rather than reciting them." },
    { q: "How long should I study?", a: "Eight to twelve weeks is typical for someone with general IT experience. The limiting factor is almost always the volume of terminology, not the difficulty of any single idea." }
  ],
  body: `Security+ SY0-701 is a vocabulary exam with a judgment problem attached. The individual ideas are not hard. What is hard is the number of named things the exam expects you to tell apart, and that it asks you to pick the right name for a situation you have never seen. Study accordingly, and the exam becomes manageable.

## The format

**Up to 90 questions in 90 minutes.** Passing is **750 out of 900** on a scale that starts at 100. That is the highest bar among the entry CompTIA exams covered here, so a strategy of scraping by does not work well on this one.

Expect multiple choice with more than one defensible-sounding answer. The exam is written so that two options are usually true statements and only one of them answers the question that was asked. Reading the question stem twice is worth more here than on any other exam at this level.

## The five domains

- **General security concepts.** Control categories and types, the CIA triad, non-repudiation, authentication and authorization, zero trust, physical security, change management, and the cryptography toolkit including PKI, hashing, and key management.
- **Threats, vulnerabilities, and mitigations.** Threat actors and their motivations, attack vectors and surfaces, social engineering, the vulnerability families across applications, hardware, cloud, supply chain, and mobile, plus the indicators and the mitigations for each.
- **Security architecture.** Architecture models including cloud and on-premises, infrastructure considerations, secure design of data and systems, resilience and recovery.
- **Security operations.** Hardening, asset management, vulnerability management, monitoring and alerting, identity and access management, automation, incident response, and the data sources you use during an investigation.
- **Security program management and oversight.** Governance, risk management, third party and vendor risk, compliance, audits and assessments, and security awareness.

That last domain surprises people who came to the exam expecting hacking. A meaningful share of SY0-701 is about running a security program: policies, risk registers, vendor assessments, and the words used for each.

## What the current version emphasizes

This version leans away from product trivia and toward how security is practiced day to day. In plain words:

- **Operations carries a lot of the exam.** Monitoring, alert triage, vulnerability management, and incident response get real room, and the questions are framed as "you are looking at this output, what next".
- **Governance and risk are explicit.** Risk assessment language, vendor and supply chain risk, and compliance have their own domain, security program management and oversight.
- **Automation is treated as normal.** Scripting and orchestration appear as the expected way to do repetitive security work, not as an advanced topic.
- **Zero trust is assumed vocabulary.** Control plane and data plane, policy engines, and implicit trust zones are terms you are expected to use correctly rather than merely recognize.
- **Cloud and hybrid are the default picture.** Architecture questions rarely assume a single datacenter.

## How to study terminology-heavy material

Reciting definitions fails on this exam. These four habits work.

1. **Sort, do not list.** Take a group of related terms and build the grid yourself: control categories down one side, control types across the top, then place each example. The act of placing is what makes it stick, and the exam asks placement questions.
2. **Learn the pairs that get confused.** Authentication and authorization. Vulnerability and threat. Risk acceptance, avoidance, transference, and mitigation. Tabletop and simulation. Write the one-sentence difference for each pair in your own words.
3. **Attach every term to a scene.** A term you can picture happening to someone is recall; a term you can only define is a guess waiting to happen.
4. **Review your own wrong answers, repeatedly.** Your misses are a better syllabus than any chapter list, because they are the gaps that are actually yours.

## How the course is built around that

Our Security+ course opens with a cheat sheet so the vocabulary has a shape before you start, then a starter test that finds your real gaps and builds a tutorial from the questions you missed rather than from a fixed order. From there it is fifty-question practice tests until three of your last five reach 80 percent, followed by one test in the exam's own format at its own passing score. The first fifteen lessons are readable without the app, and the course is free while the site launches.

> The single most common cause of a near miss on SY0-701 is answering the question you expected instead of the question on the screen. Slow down on the stem; speed up on the options.`
});
