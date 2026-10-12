window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};
// One lab on a FREE lesson (u1l2), on the instrument that needs no controls, so the lab card,
// its state, the merge, and the static-page note are all testable without the BMET pack.
FRA.labs["mini-ping"] = {
  id: "mini-ping", lesson: "u1l2", title: "Read a ping", instrument: "choices",
  intro: "Read the output below, then answer the tasks.",
  scenario: { text: "Reply from 10.0.0.1: bytes=32 time=1ms TTL=64\nRequest timed out.\nPackets: Sent = 2, Received = 1, Lost = 1 (50% loss)" },
  tasks: [
    { id: "who", kind: "choice", prompt: "Which address replied?", options: ["10.0.0.1", "10.0.0.2"], expect: 0 },
    { id: "loss", kind: "reading", prompt: "Packet loss, in percent", unit: "%", expect: [50, 50] },
    { id: "ok", kind: "verdict", prompt: "Is this link healthy?", expect: "fail" }
  ],
  why: { who: "The reply line names 10.0.0.1.", loss: "Lost = 1 of 2 sent is 50%.", ok: "Half the packets are lost; that is a fault, not a healthy link." }
};
