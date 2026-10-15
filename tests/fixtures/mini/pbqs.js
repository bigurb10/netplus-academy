window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};
// One PBQ with every task kind, on the free lesson u1l2, marked for the static page, so the view,
// the state, the merge, the test integration, and the static page are all testable without a pack.
FRA.pbqs["mini-net"] = {
  id: "mini-net", title: "Bring the new printer online", domain: 1, lesson: "u1l2", seo: true,
  scenario: {
    text: "A new network printer must join VLAN 10 on the 192.168.10.0/26 segment. The switch port shows no link.",
    log: "Port Gi1/0/7: notconnect\nVLAN 10: active\nPort Gi1/0/7 speed auto duplex auto",
    svg: "<svg viewBox=\"0 0 200 70\" xmlns=\"http://www.w3.org/2000/svg\">\n"
      + "<rect x=\"4\" y=\"15\" width=\"70\" height=\"40\" rx=\"4\" fill=\"none\" stroke=\"#2b2b2b\"/>\n"
      + "<text x=\"12\" y=\"39\" font-size=\"11\">Switch</text>\n"
      + "<circle cx=\"66\" cy=\"30\" r=\"4\" fill=\"#c0392b\"/>\n"
      + "<line x1=\"74\" y1=\"35\" x2=\"140\" y2=\"35\" stroke=\"#2b2b2b\" stroke-width=\"2\"/>\n"
      + "<rect x=\"140\" y=\"15\" width=\"56\" height=\"40\" rx=\"4\" fill=\"none\" stroke=\"#2b2b2b\"/>\n"
      + "<text x=\"148\" y=\"39\" font-size=\"11\">Printer</text>\n"
      + "</svg>"
  },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the troubleshooting steps in order.", items: ["Identify the problem", "Establish a theory", "Test the theory", "Establish a plan"], expect: [0, 1, 2, 3] },
    { id: "pairs", kind: "match", prompt: "Match each device to its layer.", left: ["Switch", "Router"], right: ["Layer 2", "Layer 3", "Layer 7"], expect: [0, 1] },
    { id: "lines", kind: "multiselect", prompt: "Pick every line that shows a problem.", options: ["Port Gi1/0/7: notconnect", "VLAN 10: active", "speed auto duplex auto"], expect: [0], shuffle: false },
    { id: "cfg", kind: "form", prompt: "Give the printer a valid address.", fields: [{ id: "ip", label: "IP address", expect: ["192.168.10.10"], normalize: "ip" }, { id: "mask", label: "Subnet mask", expect: ["255.255.255.192", "/26"], normalize: "cidr" }] },
    { id: "cmd", kind: "command", prompt: "Type the command that shows the full IP configuration on the Windows workstation.", expect: ["ipconfig /all"], alt: ["ipconfig -all"], flagOrder: false },
    { id: "cable", kind: "choice", prompt: "The port shows no link. What do you check first?", options: ["The patch cable and the port light", "The DNS server", "The printer's toner"], expect: 0 }
  ],
  why: {
    steps: "Identify, theorize, test, then plan: the method always starts with the symptom.",
    pairs: "A switch forwards frames at layer 2; a router forwards packets at layer 3.",
    lines: "notconnect is the only line that reports a fault; the others are normal settings.",
    cfg: "Any host address inside 192.168.10.0/26 works; the mask is 255.255.255.192, which is /26.",
    cmd: "ipconfig /all shows the adapter's address, mask, gateway, and DNS servers.",
    cable: "No link is a physical-layer symptom: check the cable and the port light before anything above it."
  }
};
