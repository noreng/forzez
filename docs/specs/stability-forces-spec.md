# Stability + Forces panels — spec

Sep 25, 2026 · @Norbert Pozsonyi

## Summary

The current Stability panel splits into two panels: **Stability** (does the whole structure stand?) and **Forces** (how does one thing carry its forces?). The split follows the free body, not the equation.

- **Stability** is about the whole structure: the problems list when it's unstable, and ΣFy, ΣFx and ΣM as proof when it's stable. These three equations are one teaching unit and stay together.
- **Forces** is driven by the selection: a node, member, load or support. It shows that element's forces broken into x and y. The force polygon moves here, because it shows one joint's equilibrium, not the whole structure's.

The current panel mixes the two free bodies. One Pick button drives both the ΣM pivot and the force polygon, and that coupling is why the panel feels crowded.

|  | Stability | Forces |
| --- | --- | --- |
| Question | Does it stand? | How does this element carry force? |
| Free body | Whole structure | One node, member, load or support |
| Driven by | Always on | Canvas selection |
| Learn article | Support reactions, Truss stability | Method of joints |

## Stability panel

The panel answers one question: does it stand? When the structure is unstable, it shows why. When it's stable, the three equilibrium equations are the proof. Stability is the precondition and equilibrium is the consequence, and the section order shows that.

### 1. Status (always shown)

| State | Title | Subtitle |
| --- | --- | --- |
| Stable | This structure is stable | Every force is balanced by another |
| Unstable | This structure is unstable | N problems to fix before forces can balance |

The status comes from the solver (stiffness matrix not singular).

### 2. Problems (unstable only)

- One row per problem type, not per structure.
- Each row says how many structures it affects, e.g. "3 structures".
- Clicking a row highlights the affected structures, nodes or members on the canvas. Students need *where* more than *how many*.
- Replace "12 of 12 structures have problems" with "All 12 structures have problems". Next to "5 problems" in the status, "12 of 12" makes it unclear which number to count.
- Optional: a small "Why?" link per row to the matching section of /learn/truss-stability:
  - too few supports, single node without a pin → *Too few supports*
  - node swings freely, part moves freely → *Free node / internal mechanism*
  - all supports point the same way → *Supports that line up*
- The section is collapsible and disappears when the structure is stable.

### 3. Whole structure (equilibrium)

Three rows, in this order:

1. **Up equals down**, ΣFy = 0
2. **Left equals right**, ΣFx = 0
3. **No turning**, ΣM = 0 about the picked point

Rows are collapsible. Collapsed: title, formula, badge. Expanded: one-line explanation plus the term chips (loads filled, reactions outlined), ending in `= 0 kN` or `= 0 kN·m`.

**ΣM pivot**

- The Pick button belongs only to ΣM. It sits in the No turning row or directly above it.
- The pivot can be any point on the canvas, not only a node. That's the lesson: wherever you put it, ΣM comes out zero.
- Snapping to nodes and supports is welcome, but not required.
- Show the pivot on the canvas while the row is open.

**When unstable**

- All three rows look the same: greyed out, subtitle "Checked once stable".
- No "Off by 55 kN" and never "balanced". With no reactions, the sum is just the sum of the loads. It suggests "add 55 kN somewhere" when the problem is geometric. And if the loads happen to cancel, the row would say "balanced" on an unstable structure.
- The Pick button is disabled or hidden. A bright blue CTA above greyed-out rows is a button for nothing.
- Allowed alternative, if the "falls apart" feeling is wanted: a neutral line with no verdict, e.g. "Loads: ↓55 kN · nothing holding them yet".

## Forces panel

The panel follows the canvas selection. Every view does the same job, one or more forces broken into x and y, so a single panel covers all four cases.

| Selection | View | Needs a solved structure |
| --- | --- | --- |
| Node | Force star, force polygon, ΣFx = 0 and ΣFy = 0 at the node | yes |
| Member | Member force (T/C) with its x and y components | yes |
| Load | Fx, Fy and angle | no |
| Support | Reactions Rx, Ry | yes |
| Nothing | Empty state: "Select a node, member, load or support" | – |

When the structure is unstable, the load view still works. The other views show one line: "Available once the structure is stable".

### Node

1. **Force star**: every force acting on the node, drawn from the node: member forces, loads, reactions. Tension points away from the node. This is the free body the student draws.
2. **Force polygon**: the same forces tip to tail. It closes, and that closure is the proof of equilibrium. Same color per force in the star and the polygon.
3. **Components**: the current ↔ and ↕ chip rows, ΣFx = 0 and ΣFy = 0 at the node.

The star comes first because it's the question, and the polygon is the answer. They can stack, or share a toggle if space is tight.

### Member

- Member force N with T/C label and the app's tension/compression color.
- Its x and y components, Fx and Fy.
- Draw the **geometry triangle** (Δx, Δy, L) next to the **force triangle** (Fx, Fy, N). They're similar triangles, so **Fx / N = Δx / L**. This is the core trick of the method of joints and works without trigonometry. The visual should make the similarity obvious, e.g. same orientation, matching sides highlighted.

### Load

- Fx, Fy and the angle of the load.
- Works on unstable structures, since no solve is needed.

### Support

- Pinned: Rx and Ry.
- Roller: show the missing component explicitly as zero, e.g. "Rx = 0 · a roller can't push sideways". Students get this wrong most often, and it ties back to the Stability problem "All supports point the same way".

### Node ↔ member navigation

The node view is the sum of member breakdowns. Clicking a member arrow in the star jumps to that member's view, and a back control returns to the node. The two views read as two levels of one line of reasoning.

## Interactions

The two panels never share a picker. Stability owns the ΣM pivot, and Forces follows the selection.

- **ΣM pivot** (Stability): its own pick mode, any point, shown as a marker on the canvas. It doesn't change the selection.
- **Selection** (Forces): the normal canvas selection of a node, member, load or support. No separate pick mode.
- **Problems → canvas** (Stability): clicking a problem row highlights the affected parts. The highlight and the selection are separate states.
- Both panels can be open at the same time and are independent. Either one can be closed on its own.
- **Unstable → stable**: the Problems section disappears, the equation rows turn active, and the Forces views unlock with no extra step.

## Changes from the current panel

| Current | New |
| --- | --- |
| "At any point" section holds No turning + Forces meet | Only No turning stays, as the third Whole structure row |
| Forces meet (polygon) in Stability | Moves to Forces → Node view |
| One Pick button for pivot and polygon | Pick = ΣM pivot only. Forces uses the canvas selection |
| Unstable: ΣFy/ΣFx "Off by N kN", ΣM greyed out | Unstable: all three greyed out the same way |
| Unstable: Pick button active | Unstable: Pick disabled or hidden |
| "12 of 12 structures have problems" | "All 12 structures have problems", plus a count per problem row |
| Force components only inside the polygon | Components for node, member, load and support in Forces |

## Open questions

- Does the ΣM pivot snap to nodes, or is it free only?
- Node view: star and polygon stacked, or a toggle?
- Is the Forces panel a dock next to Stability or a separate floating panel? The current panel is draggable, so the default is two independent floating panels.
