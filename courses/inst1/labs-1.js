// INST1 Academy labs: ten task labs on the choices panel, each with a drawing. Original content.
// Every lab can be done on screen; the optional kit (course.kit) lets a learner do the same work by hand.
// Drawings are inline SVG in a 420 x 220 viewBox and use currentColor so they read in light and dark themes,
// except where the lab is about color (jacks, 25-pair, wiremap, 110 block), which use the fixed palette C.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};
(function () {
  const C = { blue: '#1f5fd1', orange: '#f08a00', green: '#1a9a3a', brown: '#7a4a1e', slate: '#7d8a96', white: '#f4f4f4', red: '#d12', black: '#111', yellow: '#f2d000', violet: '#7d3cc8' };
  const svg = (parts, label) => `<svg viewBox="0 0 420 220" role="img" aria-label="${label}" style="display:block;width:100%;height:auto">${parts.join('')}</svg>`;
  const text = (x, y, t, size, anchor) => `<text x="${x}" y="${y}" font-size="${size || 11}" text-anchor="${anchor || 'middle'}" fill="currentColor">${t}</text>`;
  const box = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill || 'none'}" stroke="currentColor" stroke-width="1.5"/>`;
  const line = (x1, y1, x2, y2, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${w || 1.5}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const circ = (x, y, r, fill, w, dash) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill || 'none'}" stroke="currentColor" stroke-width="${w || 1.5}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  // A conductor bar by name: "blue" is solid, "white-blue" is white with a blue stripe.
  const cond = (x, y, w, h, name) => {
    const p = name.split('-');
    if (p.length === 1) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C[p[0]]}" stroke="currentColor" stroke-width="1"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C[p[0]]}" stroke="currentColor" stroke-width="1"/><rect x="${x + w * 0.3}" y="${y}" width="${w * 0.4}" height="${h}" fill="${C[p[1]]}"/>`;
  };
  // A pair swatch: the tip color on the top half and the ring color on the bottom half.
  const swatch = (x, y, w, h, tip, ring) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="${C[tip]}" stroke="currentColor" stroke-width="1"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 2}" fill="${C[ring]}" stroke="currentColor" stroke-width="1"/>`;

  // ---------- label-run ----------
  FRA.labs["label-run"] = {
    id: "label-run", lesson: "u1l7", title: "Label a cable run", instrument: "choices",
    intro: `Label one horizontal run the way the next technician will need to read it. By hand you would print labels on a label maker, check them against the drawing, and apply them to the cable and the hardware.

- **Tools:** a label maker with durable labels, the drawing, a marker for field notes only.
- **Steps:** read the scheme card, build the identifier, check it against the drawing, label the cable near each end, label the faceplate and the panel port, and record the run.
- **Common failures:** a label that disagrees with the drawing, handwriting that smudges, a label hidden behind the bundle, and a record that skips the test result.
- **Standard:** one identifier on both ends, readable without moving the cable, durable, and matching the drawing and the records.`,
    scenario: {
      text: "Scheme card for this job:\n- Telecommunications room: floor number + room letter, for example 2A.\n- Patch panel: a letter. Port: two digits.\n- Cable identifier: <room>-<panel><port>.\n\nThe drawing shows TR 2A on floor 2. The cable you just pulled lands on panel B, port 07, and runs to the outlet marked 07 in the work area.",
      svg: svg([
        box(10, 15, 170, 165), text(95, 33, 'TR 2A (floor 2)', 12),
        box(30, 55, 130, 70), text(95, 72, 'Panel B', 11),
        [0, 1, 2, 3, 4, 5, 6, 7].map(i => box(36 + i * 15, 82, 11, 11, i === 6 ? 'currentColor' : 'none')).join(''),
        text(41, 108, '01', 8), text(141, 108, '08', 8), text(131, 80, 'port 07', 7),
        box(240, 15, 170, 165), text(325, 33, 'Work area', 12),
        box(300, 85, 50, 40), text(325, 109, '07', 14),
        line(131, 93, 131, 150, 1.5, '4 3'), line(131, 150, 325, 150, 1.5, '4 3'), line(325, 150, 325, 125, 1.5, '4 3'),
        text(230, 144, 'cable run', 9),
        text(210, 205, 'TR = floor + letter    panel = letter    port = two digits', 10)
      ], 'Floor plan of telecommunications room 2A with panel B and an outlet marked 07')
    },
    tasks: [
      { id: "tr", kind: "choice", prompt: "What is the identifier of this telecommunications room?", options: ["2A", "A2", "2B", "B07"], expect: 0 },
      { id: "cable", kind: "choice", prompt: "What is the cable identifier for this run?", options: ["2A-B07", "2A-07B", "B07-2A", "A2-B07"], expect: 0 },
      { id: "where", kind: "choice", prompt: "Where do labels for this run go?", options: ["On the cable within sight of each end, on the faceplate, and on the panel port, all with the same identifier", "On the panel end only, because that is where the next technician starts", "On the cable jacket at the middle of the run, where it crosses the ceiling", "On the faceplate only, because the jack is what the user sees"], expect: 0 },
      { id: "type", kind: "choice", prompt: "What kind of label do you use?", options: ["Machine-printed and durable", "Handwritten with a permanent marker", "A paper tag taped to the cable", "A colored tape flag with a number"], expect: 0 },
      { id: "records", kind: "choice", prompt: "What goes in the records for this run?", options: ["The identifier, both ends, and the test result", "The identifier and the pull date only", "Both ends and the jacket color", "The identifier and the crew name"], expect: 0 }
    ],
    why: {
      tr: "The room identifier is the floor number followed by the room letter: floor 2, room A, so 2A. A2 reverses the pattern, and 2B names a different room.",
      cable: "This job's scheme builds the cable identifier from the room, a dash, then the panel letter and the two-digit port: 2A, then B and 07. Both ends carry that same identifier, so a tech holding either end can find the other.",
      where: "Both ends of the cable carry the same identifier, placed where it can be read without moving the cable, and the faceplate and the panel port are labeled too. A label on one end only leaves the other end unreadable.",
      type: "Machine-printed, durable labels survive handling and stay readable. Handwriting smudges, and tags and flags fall off.",
      records: "The records tie the identifier, both ends, and the test result together, and they must agree with the labels and the drawing. A run with no test result is not finished."
    }
  };

  // ---------- cut-in-ring ----------
  const studs = [50, 130, 210, 290, 370].map(x => box(x - 4, 20, 8, 170, 'currentColor')).join('');
  FRA.labs["cut-in-ring"] = {
    id: "cut-in-ring", lesson: "u3l8", title: "Add an outlet with a cut-in ring", instrument: "choices",
    intro: `Add one outlet to a finished wall with a cut-in ring. By hand you would use a stud finder, a level, a drywall saw, a string or fish tape, and a cut-in ring on a scrap of drywall.

- **Steps:** locate the studs and check the cavity, mark the height, trace and cut, pull the cable, set the ring, dress the cable.
- **Common failures:** cutting into a stud or a power cable, an opening too large for the ring, a cable pulled with no slack, and a standard ring in a rated wall.
- **Standard:** the opening matches the ring, the ring clamps tight to the drywall, the cable keeps its bend radius, and a rated wall is restored to its rating.`,
    scenario: {
      text: "The customer wants one more outlet on the finished wall behind the desk. The drawing shows the wall from the front: studs 16 in apart, an electrical box 20 in to the left of the outlet mark, and the mark between two studs. There is no open wall.",
      svg: svg([
        line(10, 190, 410, 190, 2), line(10, 20, 410, 20, 2),
        studs,
        box(80, 105, 20, 30), text(90, 150, 'Electrical', 9), text(90, 161, 'box', 9),
        box(180, 105, 20, 30, 'none').replace('stroke-width="1.5"', 'stroke-width="1.5" stroke-dasharray="4 3"'), text(190, 150, 'Outlet', 9), text(190, 161, 'mark', 9),
        text(50, 12, 'stud', 9), text(130, 12, 'stud', 9), text(210, 12, 'stud', 9), text(290, 12, 'stud', 9), text(370, 12, 'stud', 9),
        line(90, 203, 190, 203, 1.5), line(90, 197, 90, 209), line(190, 197, 190, 209), text(140, 216, '20 in between centers', 9),
        line(130, 45, 210, 45, 1.5), line(130, 39, 130, 51), line(210, 39, 210, 51), text(170, 36, '16 in', 10)
      ], 'Wall elevation with studs 16 in apart, an electrical box 20 in left of the outlet mark')
    },
    tasks: [
      { id: "first", kind: "choice", prompt: "What is the first step before you cut?", options: ["Find the studs and check the cavity for power and obstructions", "Trace the ring template at the marked height", "Drop a string from the ceiling space", "Set the ring wings loose in a test hole"], expect: 0 },
      { id: "order", kind: "choice", prompt: "Which order is right?", options: ["Locate and check the cavity, mark level, cut, drop the string and pull the cable, set the ring", "Mark level, cut, locate and check the cavity, set the ring, pull the cable", "Cut, locate and check the cavity, mark level, pull the cable, set the ring", "Locate and check the cavity, cut, mark level, set the ring, pull the cable"], expect: 0 },
      { id: "height", kind: "choice", prompt: "How do you choose the mounting height?", options: ["The height the drawings or the AHJ give, matching the other outlets in the room", "The height that puts the ring against the nearest stud", "The height where the string drops most easily from the ceiling", "The height the customer points at, with no check against the drawings"], expect: 0 },
      { id: "rated", kind: "verdict", prompt: "The wall is fire-rated and the crew sets a standard low-voltage ring that is not listed for it. Does the work pass?", expect: "fail" }
    ],
    why: {
      first: "A stud, fire blocking, or a power cable in the cavity means the opening moves, and you only know that before the cut. Locating studs and checking the cavity always comes first.",
      order: "Check the cavity first, mark the height with a level, then cut, then drop the string and pull the cable, and set the ring last so it clamps on a cable already in place.",
      height: "Heights are set by the drawings or the authority having jurisdiction, and a matching row of outlets is the standard on a finished wall. Convenience is not a rule.",
      rated: "In a rated wall only a box listed for that wall is acceptable, firestopped to its listing. A standard ring leaves a weak point in the rating, so the work fails."
    }
  };

  // ---------- conduit-fill ----------
  FRA.labs["conduit-fill"] = {
    id: "conduit-fill", lesson: "u3l14", title: "Conduit fill", instrument: "choices",
    intro: `Decide how many cables a conduit can take. By hand you would use a calculator, the conduit's inside diameter from the chart, and the cable's outside diameter from the spec sheet.

- **Steps:** find the ID of the conduit and the OD of the cable, square both, apply the fill formula, compare to the limit for that cable count, round the cable count down.
- **Common failures:** using the trade size instead of the real inside diameter, forgetting to square, and rounding the cable count up.
- **Standard:** fill stays at or under 53 percent for one cable, 31 percent for two, and 40 percent for three or more.`,
    scenario: {
      text: "1 in EMT with an inside diameter of 1.049 in (ID squared 1.1004). Category 6 cables with an outside diameter of 0.25 in (OD squared 0.0625). Fill percent = number of cables x OD squared / ID squared x 100.",
      svg: svg([
        circ(110, 110, 90, 'none', 3), circ(88.5, 109, 21.5), circ(131.5, 109, 21.5),
        circ(67, 152, 21.5), circ(110, 152, 21.5), circ(153, 152, 21.5),
        text(110, 16, '1 in EMT, 5 cables shown', 11),
        text(320, 60, 'ID 1.049 in', 12), text(320, 80, 'Cable OD 0.25 in', 12)
      ], 'Cross-section of 1 in EMT with five cables')
    },
    tasks: [
      { id: "fill5", kind: "reading", prompt: "Fill percent with 5 cables, to the nearest tenth", unit: "%", expect: [28.0, 29.0] },
      { id: "max", kind: "reading", prompt: "Most cables the conduit can take at the limit for three or more cables, rounded down", unit: "cables", expect: [7, 7] },
      { id: "rule", kind: "choice", prompt: "Which fill limit applies to three or more cables?", options: ["40 percent", "53 percent", "31 percent", "60 percent"], expect: 0 },
      { id: "nine", kind: "verdict", prompt: "The foreman wants 9 of these cables in this conduit. Does that pass?", expect: "fail" }
    ],
    why: {
      fill5: "5 x 0.0625 = 0.3125. Divided by 1.1004 that is 0.284, so the fill is 28.4 percent, well under 40 percent.",
      max: "40 percent of 1.1004 is 0.4402. Divided by 0.0625 that is 7.04 cables. Round down, so 7. Eight cables would be 45.4 percent, which is over.",
      rule: "Three or more cables share 40 percent of the conduit's inside area. 53 percent is for a single cable and 31 percent is for two.",
      nine: "9 x 0.0625 = 0.5625, divided by 1.1004 is 51.1 percent. That is over the 40 percent limit, so nine cables fail."
    }
  };

  // ---------- firestop-pick ----------
  FRA.labs["firestop-pick"] = {
    id: "firestop-pick", lesson: "u3l15", title: "Pick the firestop method", instrument: "choices",
    intro: `Match a firestop method to each penetration in a rated wall. By hand you would read the listed system sheet for the wall, the penetrant, and the opening, then install exactly what it says.

- **Steps:** identify the wall rating, name the penetrant, measure the opening, find the listed system that matches all three, install it exactly as listed, label it, and get it inspected before it is covered.
- **Common failures:** foam, rags, or tape in place of a listed system, the wrong annular space, a system listed for a different penetrant, and an opening left unsealed overnight.
- **Standard:** only a listed system matched to the wall, the penetrant, and the opening restores the rating.`,
    scenario: {
      text: "A two-hour rated wall has four penetrations. 1: a steel sleeve already full of cable. 2: a bundle of cables through a cored hole with no sleeve. 3: a plastic pipe. 4: an empty steel sleeve held for cable that will be pulled later.",
      svg: svg([
        box(10, 30, 400, 150), text(210, 22, 'Two-hour rated wall', 11),
        box(40, 80, 50, 50), [0, 1, 2, 3, 4, 5].map(i => circ(50 + (i % 3) * 15, 95 + Math.floor(i / 3) * 20, 5)).join(''),
        circ(190, 105, 28, 'none', 1.5, '4 3'), [0, 1, 2, 3, 4].map(i => circ(176 + (i % 3) * 14, 97 + Math.floor(i / 3) * 16, 5)).join(''),
        circ(290, 105, 26, 'none', 3), circ(290, 105, 17),
        box(340, 80, 50, 50),
        text(65, 70, '1', 14), text(190, 70, '2', 14), text(290, 70, '3', 14), text(365, 70, '4', 14),
        text(65, 152, 'steel sleeve', 9), text(65, 164, 'full of cable', 9), text(190, 152, 'cored hole', 9), text(190, 164, 'with cables', 9),
        text(290, 152, 'plastic pipe', 9), text(365, 152, 'empty sleeve', 9), text(365, 164, 'held for later', 9)
      ], 'A rated wall with four penetrations: a sleeve with cables, a cored hole with cables, a plastic pipe, and an empty sleeve')
    },
    tasks: [
      { id: "p1", kind: "choice", prompt: "Penetration 1, the sleeve already full of cable: which method matches a listed system?", options: ["A firestop device listed for cable in that sleeve, held by compression", "An intumescent collar listed for plastic pipe", "A removable plug sized for an empty sleeve", "Spray foam packed around the cables"], expect: 0 },
      { id: "p2", kind: "choice", prompt: "Penetration 2, the bare bundle in the cored hole: which method matches a listed system?", options: ["Sealant at the annular space and depth the listed system names", "A compression device sized for a steel sleeve", "An intumescent collar listed for plastic pipe", "A removable pillow with the bundle left loose in it"], expect: 0 },
      { id: "p3", kind: "choice", prompt: "Penetration 3, the plastic pipe: which method matches a listed system?", options: ["An intumescent collar or wrap listed for plastic pipe", "A putty pad of the kind used behind an outlet box", "A compression device listed for cable", "Mineral wool packed tight and caulked"], expect: 0 },
      { id: "p4", kind: "choice", prompt: "Penetration 4, the empty sleeve held for later cable: which method matches a listed system?", options: ["A removable plug or pillow listed for re-entry", "Permanent sealant filling the sleeve from end to end", "An intumescent collar listed for plastic pipe", "Nothing yet, since no cable passes through it"], expect: 0 },
      { id: "add", kind: "choice", prompt: "A cable is added to penetration 1 six months later. What is the right action?", options: ["Reseal it per the same listing and have it inspected", "Push the cable through the old seal, which still holds", "Fill the gap around the new cable with spray foam", "Log the cable and reseal at the next shutdown"], expect: 0 }
    ],
    why: {
      p1: "A sleeve full of cable needs a manufactured firestop device listed for cable, held by compression. A plug is for an empty sleeve, a collar is for plastic pipe, and foam is not a listed system.",
      p2: "A bare bundle in a cored hole with no sleeve is sealed with sealant at the annular space and depth the listed system names. A compression device needs a sleeve, and a collar is for plastic pipe.",
      p3: "Plastic pipe burns away in a fire and leaves a hole, so it needs the intumescent collar or wrap that is listed for plastic pipe. A putty pad is for the back of a box, and loose packing is not a listed system.",
      p4: "An empty sleeve still passes smoke and flame. A plug or pillow listed for re-entry closes it now and comes out and goes back when cable is pulled later. Permanent sealant would have to be cut out, and a rated opening is not left open.",
      add: "Adding or removing a cable breaks the seal. Reseal it every time to the same listing and have it inspected. Foam is not a listed system, and a rated opening is not left open for later."
    }
  };

  // ---------- bend-tension ----------
  FRA.labs["bend-tension"] = {
    id: "bend-tension", lesson: "u4l3", title: "Pull limits: bend radius and tension", instrument: "choices",
    intro: `Work out the limits for a pull before anyone touches the winch. By hand you would use the cable spec sheet, a calculator, and the tension meter on the puller.

- **Steps:** read the OD, multiply by 4 for UTP or 10 for multipair to get the minimum bend radius, multiply the single-cable tension limit by the number of cables in the pull, and set the puller to stop at or under it.
- **Common failures:** a bend tighter than the minimum, using the single-cable limit as if it were the bundle limit, mixing pounds and newtons, and pulling harder when the pull gets stiff.
- **Standard:** 25 lbf (110 N) per 4-pair cable, bend radius 4 x OD for UTP and 10 x OD for multipair, and the manufacturer's stated limit wins.`,
    scenario: {
      text: "A pull plan for one sweep: 12 Category 6 cables, each 0.25 in OD, pulled together as one bundle; and a separate 25-pair backbone cable, 0.5 in OD. The maximum tension is 25 lbf per 4-pair cable.",
      svg: svg([
        `<path d="M 30 190 L 30 140 A 55 55 0 0 1 85 85 L 250 85" fill="none" stroke="currentColor" stroke-width="16" opacity="0.25"/>`,
        `<path d="M 30 190 L 30 140 A 55 55 0 0 1 85 85 L 250 85" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        line(250, 85, 285, 85, 2), `<polygon points="285,79 297,85 285,91" fill="currentColor"/>`,
        text(90, 130, 'sweep', 10), text(270, 70, 'pull', 10),
        text(130, 200, 'bend radius is measured in cable diameters', 9),
        [0, 1, 2, 3].map(c => [0, 1, 2].map(r => circ(320 + c * 13, 120 + r * 13, 5.5)).join('')).join(''), text(345, 175, '12 cables, 0.25 in OD', 9),
        circ(345, 40, 12, 'none', 1.5), text(345, 66, '25-pair, 0.5 in OD', 9)
      ], 'A sweep with a bundle of twelve cables and one 25-pair cable shown in cross-section')
    },
    tasks: [
      { id: "utp", kind: "reading", prompt: "Minimum installed bend radius for the 0.25 in UTP cables", unit: "in", expect: [1.0, 1.0] },
      { id: "multi", kind: "reading", prompt: "Minimum bend radius for the 0.5 in 25-pair cable", unit: "in", expect: [5.0, 5.0] },
      { id: "tension", kind: "reading", prompt: "Maximum pulling tension for the 12-cable bundle", unit: "lbf", expect: [300, 300] },
      { id: "winch", kind: "verdict", prompt: "The crew sets the winch to stop at 400 lbf for the 12-cable bundle. Is that setting within the limit?", expect: "fail" }
    ],
    why: {
      utp: "The radius for 4-pair UTP is 4 x the OD: 4 x 0.25 = 1.0 in. The same radius holds after the cable is installed.",
      multi: "Multipair copper needs 10 x the OD: 10 x 0.5 = 5.0 in, a gentler bend than the UTP.",
      tension: "The limit of 25 lbf belongs to each cable, and the bundle gets the single-cable limit times the number of cables: 12 x 25 = 300 lbf.",
      winch: "400 lbf is 33 lbf per cable, over the 25 lbf limit, and the bundle limit is 300 lbf. A setting over the limit can stretch the cable, so the setting fails."
    }
  };

  // ---------- punch-110 ----------
  FRA.labs["punch-110"] = {
    id: "punch-110", lesson: "u5l2", title: "Punch down a 110 block", instrument: "choices",
    intro: `Terminate a four-pair cable on a 110 block. By hand you would use a 110 punch-down tool with a 110 blade, a cable stripper, and a scrap block with a short length of cable.

- **Steps:** strip the jacket, keep the twist to within 13 mm (0.5 in) of the block, lay each pair into its position in color order, seat each conductor with the tool, and check that every conductor is seated and trimmed.
- **Common failures:** the cutting edge turned the wrong way, so the wire you keep is cut; too much untwist; pairs out of order; and a conductor left half seated.
- **Standard:** pairs in color order, each conductor seated and cut flush, and the pair twist kept to the block.`,
    scenario: {
      text: "A four-pair cable is fanned out above a 110 block row with four pair positions, 1 to 4, from left to right. Each pair has a white-striped conductor (the tip) and a solid conductor (the ring).",
      svg: svg([
        box(30, 28, 360, 24), text(210, 44, 'cable jacket (stripped back)', 10),
        [['green', 0, 0], ['brown', 1, 1], ['blue', 0, 0], ['orange', 1, 1]].map((q, i) => (q[1] ? cond(60 + i * 85, 52, 12, 55, q[0]) + cond(76 + i * 85, 52, 12, 55, 'white-' + q[0]) : cond(60 + i * 85, 52, 12, 55, 'white-' + q[0]) + cond(76 + i * 85, 52, 12, 55, q[0]))).join(''),
        text(210, 120, 'pairs as they come out of the jacket', 9),
        box(30, 130, 360, 40, 'none'),
        [0, 1, 2, 3].map(i => box(52 + i * 85, 136, 44, 28) + text(74 + i * 85, 155, 'P' + (i + 1), 11)).join(''),
        text(210, 190, '110 block: four pair positions', 10)
      ], 'A fanned-out four-pair cable above a 110 block with four pair positions')
    },
    tasks: [
      { id: "order", kind: "choice", prompt: "In which order do the pairs land across positions 1 to 4?", options: ["Blue, orange, green, brown", "Brown, green, orange, blue", "Blue, green, orange, brown", "Green, blue, orange, brown"], expect: 0 },
      { id: "tip", kind: "choice", prompt: "Within each pair, which conductor lands first?", options: ["The white-striped conductor (tip), then the solid one (ring)", "The solid conductor (ring), then the white-striped one (tip)", "Either one, because the order inside a pair does not matter", "The one on the left as the pair leaves the jacket"], expect: 0 },
      { id: "tool", kind: "choice", prompt: "Which tool and blade position seats and trims the wire?", options: ["A 110 punch-down tool with the cutting edge turned out, toward the waste end", "A 110 punch-down tool with the cutting edge turned in, toward the wire you keep", "A flat screwdriver to seat the wire, then diagonal cutters to trim it"], expect: 0 },
      { id: "untwist", kind: "choice", prompt: "At most how far may a pair be untwisted at the block?", options: ["13 mm (0.5 in)", "6 mm (0.25 in)", "25 mm (1 in)", "50 mm (2 in)"], expect: 0 }
    ],
    why: {
      order: "The four pairs go across the block in color order: blue, orange, green, brown. Following one order on every block means the next technician never has to guess.",
      tip: "In every pair the tip, the white-striped conductor, goes in first, then the ring. Doing it the same way every time keeps the pairs right and the work checkable.",
      tool: "A punch tool seats the wire and cuts the extra in one stroke. The cutting edge goes toward the waste end. Turned in, it cuts the wire you need to keep.",
      untwist: "Untwisting more than 13 mm (0.5 in) lets the pair lose its crosstalk protection, so the link can fail even when every wire is in the right place."
    }
  };

  // ---------- jack-t568b ----------
  const T568B = ['white-orange', 'orange', 'white-green', 'blue', 'white-blue', 'green', 'white-brown', 'brown'];
  const T568A = ['white-green', 'green', 'white-orange', 'blue', 'white-blue', 'orange', 'white-brown', 'brown'];
  const C568 = ['orange', 'white-orange', 'white-green', 'blue', 'white-blue', 'green', 'white-brown', 'brown'];
  const D568 = ['white-orange', 'orange', 'green', 'blue', 'white-blue', 'white-green', 'white-brown', 'brown'];
  const jackDraw = (ox, letter, set) => text(ox + 47, 50, 'Jack ' + letter, 11) + box(ox, 58, 94, 82) + set.map((n, i) => cond(ox + 4 + i * 11, 64, 10, 62, n) + text(ox + 9 + i * 11, 136, i + 1, 7)).join('');
  FRA.labs["jack-t568b"] = {
    id: "jack-t568b", lesson: "u5l3", title: "Wire a jack to T568B", instrument: "choices",
    intro: `Terminate a jack to the T568B scheme and spot a jack that is wired wrong. By hand you would use a keystone jack, a four-pair cable, a stripper, a punch-down tool, and a printed pin table.

- **Steps:** strip only the jacket you need, keep the twist to within 13 mm (0.5 in), match each pair to the color-coded label for the scheme in use, seat the conductors in order, set the cap, and seat and cut with the tool.
- **Common failures:** the white-orange and white-green conductors confused, one end wired T568A and the other T568B, a stray strand, and a cap not seated flush.
- **Standard:** one scheme at every jack, panel, and cord end on the job, and the tester shows a clean wiremap.`,
    scenario: {
      text: "The job specifies T568B. Four jacks are drawn from the same job, with the pins numbered 1 to 8 from the left. Each was wired by a different tech, and the far end of every link is wired T568B.",
      svg: svg([
        jackDraw(6, 'A', T568B), jackDraw(110, 'B', T568A), jackDraw(214, 'C', C568), jackDraw(318, 'D', D568),
        text(210, 165, 'Pin 1 is at the left of every jack', 10),
        text(210, 190, 'A bar with a stripe is white with that color stripe', 10)
      ], 'Four jack faces with eight color-coded slots each')
    },
    tasks: [
      { id: "pin1", kind: "choice", prompt: "In T568B, which color is on pin 1?", options: ["White-orange", "White-green", "Orange", "White-blue"], expect: 0 },
      { id: "pin2", kind: "choice", prompt: "In T568B, which color is on pin 2?", options: ["Orange", "Green", "White-orange", "Brown"], expect: 0 },
      { id: "pin3", kind: "choice", prompt: "In T568B, which color is on pin 3?", options: ["White-green", "White-orange", "Green", "White-brown"], expect: 0 },
      { id: "pin6", kind: "choice", prompt: "In T568B, which color is on pin 6?", options: ["Green", "Orange", "White-green", "Blue"], expect: 0 },
      { id: "wrong", kind: "choice", prompt: "Which drawn jack makes the link test as crossed pairs against the T568B far end, and why?", options: ["Jack B: the orange and green pairs trade places, so it is T568A", "Jack C: the orange pair is reversed on pins 1 and 2, so it is T568A", "Jack D: the green pair is reversed on pins 3 and 6, so it is T568A", "Jack A: the blue pair is on the wrong pins, so it is T568A"], expect: 0 }
    ],
    why: {
      pin1: "T568B starts with white-orange on pin 1. White-green on pin 1 is T568A.",
      pin2: "Pin 2 is the solid orange, the ring of the pair that starts on pin 1.",
      pin3: "T568B puts white-green on pin 3. White-orange on pin 3 is T568A.",
      pin6: "Pin 6 is solid green, the ring of the pair whose tip is on pin 3. The pair at pins 3 and 6 straddles the blue pair on 4 and 5.",
      wrong: "Jack B has green on pins 1 and 2 and orange on pins 3 and 6, the T568A order. Against a T568B far end the orange and green pairs cross over, and the tester shows crossed pairs. Jacks C and D keep the T568B pairs on the right pins but reverse one pair, which tests as a reversed pair, and Jack A is correct T568B."
    }
  };

  // ---------- pair-colors ----------
  const TIPS = ['white', 'red', 'black', 'yellow', 'violet'];
  const RINGS = ['blue', 'orange', 'green', 'brown', 'slate'];
  FRA.labs["pair-colors"] = {
    id: "pair-colors", lesson: "u5l4", title: "Read the 25-pair color code", instrument: "choices",
    intro: `Find pairs by color in a 25-pair cable. By hand you would use a short 25-pair cable, a 110 or 66 block, and the code on a card.

- **Steps:** name the tip color and the ring color, find the tip group (1 to 5) and the ring position (1 to 5), then pair number = 5 x (tip group - 1) + ring position. Terminate pair by pair in order.
- **Common failures:** swapping tip and ring, skipping a pair so every pair after it lands one row off, and mixing up black and brown by eye.
- **Standard:** every pair in color order with no gaps, each row labeled with its pair range.`,
    scenario: {
      text: "Twenty-five pairs are drawn as swatches. The top half of each swatch is the tip color and the bottom half is the ring color. Read the grid from left to right and from top to bottom, starting at the top left with pair 1. Tip colors run white, red, black, yellow, violet. Ring colors run blue, orange, green, brown, slate.",
      svg: svg([
        TIPS.map((t, g) => RINGS.map((r, k) => swatch(40 + k * 70, 20 + g * 36, 64, 30, t, r)).join('')).join(''),
        text(210, 212, 'tip color on top, ring color on the bottom', 10)
      ], 'A five by five grid of tip and ring color swatches for the 25-pair code')
    },
    tasks: [
      { id: "p1", kind: "choice", prompt: "What are the colors of pair 1?", options: ["White-blue", "White-slate", "Blue-white", "Red-blue"], expect: 0 },
      { id: "p7", kind: "choice", prompt: "What are the colors of pair 7?", options: ["Red-orange", "Red-blue", "Red-green", "White-green"], expect: 0 },
      { id: "p14", kind: "choice", prompt: "What are the colors of pair 14?", options: ["Black-brown", "Black-green", "Yellow-brown", "Red-brown"], expect: 0 },
      { id: "p25", kind: "choice", prompt: "What are the colors of pair 25?", options: ["Violet-slate", "Violet-brown", "Yellow-slate", "Black-slate"], expect: 0 },
      { id: "yg", kind: "choice", prompt: "Which pair number is yellow-green?", options: ["18", "13", "17", "23"], expect: 0 }
    ],
    why: {
      p1: "Pair 1 is the first tip color with the first ring color: white-blue. The tip color is named first.",
      p7: "For pair 7: 7 - 1 = 6. 6 divided by 5 is 1 remainder 1, so the tip is the second color, red, and the ring is the second color, orange. Pair 7 is red-orange.",
      p14: "For pair 14: 14 - 1 = 13. 13 divided by 5 is 2 remainder 3, so the tip is the third color, black, and the ring is the fourth color, brown. Pair 14 is black-brown.",
      p25: "Pair 25 is the last tip color with the last ring color: violet-slate. 25 - 1 = 24, which is 4 remainder 4.",
      yg: "Yellow is the fourth tip color and green is the third ring color: 5 x (4 - 1) + 3 = 18. Pair 13 is black-green, 17 is yellow-orange, and 23 is violet-green."
    }
  };

  // ---------- coax-f ----------
  const conn = (ox, kind) => {
    const pinEnd = kind === 'flush' ? ox + 100 : ox + 118;
    const strands = kind === 'braid' ? line(ox + 52, 98, ox + 86, 98, 1) + line(ox + 52, 104, ox + 84, 104, 1) + line(ox + 52, 92, ox + 76, 92, 1) + line(ox + 76, 92, ox + 90, 110, 1) : line(ox + 52, 98, ox + 86, 98, 1) + line(ox + 52, 104, ox + 84, 104, 1) + line(ox + 52, 92, ox + 76, 92, 1);
    return box(ox, 94, 34, 32) + box(ox + 34, 90, 14, 40, 'none') + box(ox + 48, 84, 52, 52) + strands
      + line(ox + 60, 110, pinEnd, 110, 4);
  };
  FRA.labs["coax-f"] = {
    id: "coax-f", lesson: "u5l5", title: "Terminate an F connector", instrument: "choices",
    intro: `Put a compression F connector on RG-6 coax and inspect it. By hand you would use the connector maker's strip tool, a compression tool, F connectors, and a short length of RG-6.

- **Steps:** strip with the strip tool, fold the braid back over the jacket, keep stray strands away from the center conductor, insert the connector, and compress it with the tool.
- **Common failures:** braid strands touching the center conductor, a center conductor cut too short, a crushed dielectric, and a connector not fully seated.
- **Standard:** a clean strip, the center conductor protruding the right amount, no braid showing outside, and a tight, fully seated fitting with no short between the center conductor and the shield.`,
    scenario: {
      text: "Three finished F connectors are drawn as cutaways, left to right: A, B, and C. In each, the thick line is the center conductor, the box at the left is the jacket, and the thin lines inside the body are the braid.",
      svg: svg([
        conn(5, 'good'), conn(145, 'braid'), conn(285, 'flush'),
        text(65, 160, 'Connector A', 11), text(205, 160, 'Connector B', 11), text(345, 160, 'Connector C', 11),
        text(22, 86, 'jacket', 9), text(74, 80, 'braid', 9), text(210, 185, 'thick line: center conductor', 10)
      ], 'Three F connector cutaways with the jacket, braid, and center conductor drawn')
    },
    tasks: [
      { id: "tool", kind: "choice", prompt: "What do you use to strip the cable, and how?", options: ["The connector maker's strip tool, which cuts the jacket, braid, and dielectric to set depths at once", "A utility knife for the jacket and scissors for the braid, cut by eye", "Diagonal cutters, one cut through every layer at the same point", "A knife for the jacket and a file for the braid"], expect: 0 },
      { id: "order", kind: "choice", prompt: "Which is the right order?", options: ["Strip, fold the braid back, insert the connector, compress", "Insert the connector, strip, fold the braid back, compress", "Fold the braid back, strip, compress, insert the connector", "Strip, compress, fold the braid back, insert the connector"], expect: 0 },
      { id: "a", kind: "verdict", prompt: "Connector A: pass or fail?", expect: "pass" },
      { id: "b", kind: "verdict", prompt: "Connector B: pass or fail?", expect: "fail" },
      { id: "c", kind: "verdict", prompt: "Connector C: pass or fail?", expect: "fail" }
    ],
    why: {
      tool: "The strip tool made for the connector sets every layer to the right depth in one pass, so the center conductor is the right length and the layers are not nicked or crushed.",
      order: "Strip first, fold the braid back so it contacts the connector body, then insert the connector over it and compress it with the tool.",
      a: "The center conductor sticks out past the body by the right amount, the braid stays inside the body, and nothing touches the center conductor. It passes.",
      b: "A braid strand reaches the center conductor, which shorts the center to the shield. The picture rolls or drops. It fails.",
      c: "The center conductor ends flush with the body, so it will not seat into the equipment's port and the contact is poor. It fails."
    }
  };

  // ---------- wiremap-fault ----------
  const screen = (ox, n, map, status) => {
    const y = i => 40 + i * 17;
    let s = text(ox + 47, 22, 'Screen ' + n, 11);
    for (let i = 0; i < 8; i++) {
      s += circ(ox + 24, y(i), 3, 'currentColor', 1) + circ(ox + 70, y(i), 3, 'currentColor', 1) + text(ox + 11, y(i) + 3, i + 1, 8) + text(ox + 83, y(i) + 3, i + 1, 8);
    }
    map.forEach(([a, b]) => { s += line(ox + 24, y(a - 1), ox + 70, y(b - 1), 1.5); });
    return s + text(ox + 47, 190, status, 8);
  };
  const straight = [1, 2, 3, 4, 5, 6, 7, 8].map(i => [i, i]);
  FRA.labs["wiremap-fault"] = {
    id: "wiremap-fault", lesson: "u7l1", title: "Read the wiremap screen", instrument: "choices",
    intro: `Read a tester's wiremap screen and name the fault. By hand you would use a cable tester with a remote end and a few short test cables you have wired wrong on purpose.

- **Steps:** find the pin that is wrong on the screen, go to the end the tester names, reterminate, and retest. Never assume the fix worked until the screen says so.
- **Common failures:** fixing the wrong end, assuming a pass because every pin has a line, and trusting a basic continuity check to find a split pair.
- **Standard:** a clean wiremap and a passing NEXT result on every link.`,
    scenario: {
      text: "Four tester screens, each showing pins 1 to 8 at the near end on the left and the far end on the right. A line joins the pin you test to the pin where it arrives. Screen 4 reads every pin straight through but the NEXT result fails.",
      svg: svg([
        screen(4, 1, straight.filter(p => p[0] !== 7), 'Map: FAIL'),
        screen(109, 2, [[1, 2], [2, 1]].concat(straight.slice(2)), 'Map: FAIL'),
        screen(214, 3, [[1, 3], [2, 6], [3, 1], [6, 2]].concat([[4, 4], [5, 5], [7, 7], [8, 8]]), 'Map: FAIL'),
        screen(319, 4, straight, 'Map: PASS  NEXT: FAIL')
      ], 'Four wiremap screens showing an open, a reversed pair, crossed pairs, and straight lines with a failing NEXT')
    },
    tasks: [
      { id: "s1", kind: "choice", prompt: "Screen 1: what is the fault?", options: ["Open", "Short", "Reversed pair", "Crossed pairs", "Split pair"], expect: 0 },
      { id: "s2", kind: "choice", prompt: "Screen 2: what is the fault?", options: ["Reversed pair", "Open", "Short", "Crossed pairs", "Split pair"], expect: 0 },
      { id: "s3", kind: "choice", prompt: "Screen 3: what is the fault?", options: ["Crossed pairs", "Open", "Short", "Reversed pair", "Split pair"], expect: 0 },
      { id: "s4", kind: "choice", prompt: "Screen 4: what is the fault?", options: ["Split pair", "Open", "Short", "Reversed pair", "Crossed pairs"], expect: 0 },
      { id: "fix", kind: "choice", prompt: "Screen 3 is the link you are fixing. What is the fix?", options: ["Reterminate one end so both ends use the same scheme, then retest", "Replace the cable, because crossed pairs mean it is damaged", "Swap the orange and green wires on the tester's remote end", "Replace both jacks with a higher category"], expect: 0 },
      { id: "blind", kind: "choice", prompt: "Which of these faults can a basic continuity tester not see?", options: ["Split pair", "Open", "Reversed pair", "Crossed pairs"], expect: 0 }
    ],
    why: {
      s1: "Pin 7 has no line to the far end. A conductor with no connection is an open, usually one that did not seat in its slot.",
      s2: "Pins 1 and 2 arrive on each other's pins, so the tip and ring of one pair are swapped. That is a reversed pair, and the fix is to reterminate that pair.",
      s3: "Pins 1 and 2 arrive on pins 3 and 6, and 3 and 6 arrive on 1 and 2, while the blue and brown pairs run straight. That is the signature of T568A at one end and T568B at the other: crossed pairs.",
      s4: "Every pin lands on the same pin, but NEXT fails. A wire from one pair has traded places with a wire from another, so each pair is no longer twisted with its own mate. That is a split pair.",
      fix: "Crossed pairs come from the two ends using different schemes. Reterminate one end so both ends match, then retest. The cable and the jacks are fine.",
      blind: "A split pair connects every pin to the right pin, so a basic continuity check passes it. It shows up only on a tester that checks twisting, or as a NEXT failure."
    }
  };
})();
