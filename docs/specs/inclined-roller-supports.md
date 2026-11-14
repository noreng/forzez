# Inclined roller supports

Sep 27, 2026 · @Norbert Pozsonyi

## Summary

A roller support can be generalized to any angle by describing it with the direction of its reaction line instead of x/y flags. The solver then rotates that node's two degrees of freedom into the support's own axes before applying the restraint.

Status: design only, nothing is implemented yet. Everything below refers to `packages/structural-calculator` and `apps/truzme` as of this date.

## How supports work today

The solver only supports restraints along the global X and Y axes.

| Part | File | Behaviour |
| --- | --- | --- |
| Input | `types/truss2d-input.types.ts` | `TrussSolverNodalSupport = { id, node, x: boolean, y: boolean }` |
| Restraints | `truss2d/solver.ts` `initRestrains` / `applyRestraints` | Marks global DOFs as supported, zeroes their rows and columns, puts 1 on the diagonal |
| Reactions | `truss2d/solver.ts` `solve` | `K_orig · u − F`, read only at supported DOFs; other DOFs are zeroed |
| Stability checks | `helpers/check-node-dofs.ts`, `helpers/check-external-stability.ts` | Go through `getAngleDegOfSupport()`, which maps x/y to `[0]`, `[90]` or `[0, 90]` |
| App model | `apps/truzme/.../model-store.types.ts`, `tools.types.ts` | `SupportData { x, y }`, `SupportType = 'pin' \| 'rollerX' \| 'rollerY'` |

The stability checks already reason in angles, so they mostly carry over. The row/column zeroing in the solver is the part that only works for axis-aligned restraints.

## Proposed input model

Describe a support by the direction it blocks, not by axis flags:

```ts
export type TrussSolverNodalSupport =
    | { id: number; node: number; type: 'pin' }
    | { id: number; node: number; type: 'roller'; angle: number }; // deg, direction of the reaction line
```

- `angle` is the direction of the reaction, which is the normal of the rolling surface. Today's two rollers become `angle: 0` and `angle: 90`.
- The UI can show the surface tilt instead (`angle − 90`), which is more natural for students.
- `getAngleDegOfSupport` returns `[0, 90]` for a pin and `[angle]` for a roller, so the stability checks keep their structure.
- Angles must be normalized mod 180 and compared with a tolerance: 30° and 210° are the same line.

## Solver change

Recommended: rotate the support node's DOFs into local axes, then restrain the local DOF along the reaction line. For a roller at angle α, the node's local axes are n (along the reaction) and t (along the rolling surface).

```latex
T_{node} = \begin{bmatrix} \cos\alpha & \sin\alpha \\ -\sin\alpha & \cos\alpha \end{bmatrix}, \quad K' = T K T^{T}, \quad F' = T F, \quad u = T^{T} u'
```

`T` is the identity matrix except for the 2×2 block of each rotated node.

1. Assemble `K` and `F` in global coordinates, as now.
2. Rotate the blocks of inclined-support nodes: `K' = T K Tᵀ`, `F' = T F`.
3. Restrain only the local n DOF, with the existing row/column zeroing.
4. Solve for `u'`, then rotate back: `u = Tᵀ u'`.

Pins and axis-aligned rollers are the special case α = 0 or 90, where `T = I`. So the existing path can be generalized rather than duplicated.

Alternatives considered and rejected:

- Penalty stiffness (add `k · n · nᵀ` to the node block): approximate, and a large `k` hurts conditioning in the plain Gauss elimination.
- Lagrange multipliers: gives the reaction directly, but puts zeros on the diagonal, so the solver would need pivoting.

## Reactions: Rx, Ry and R

An inclined roller can only push along its reaction line, so its reaction is one signed scalar R along n = (cos α, sin α).

```latex
R_x = R \cos\alpha, \quad R_y = R \sin\alpha, \quad \frac{R_y}{R_x} = \tan\alpha
```

- Rx and Ry can still come from `K_orig · u − F` in global coordinates. At the support node both global components come out non-zero, and the vector is automatically parallel to n. The only change is to stop zeroing the "unsupported" component of that node.
- The existing equilibrium check (`sumX`, `sumY`) stays valid without changes.
- Add `R` to `NodeReactions` next to `Rx` / `Ry`, so the UI can draw one inclined arrow with one number and show the components as secondary information.

### Worked example

A beam of span L, pin at A, roller at B with its reaction line at α = 60°, vertical load P at midspan. Moments about A give `R · sin α · L = P · L / 2`.

| Support | Rx | Ry | R |
| --- | --- | --- | --- |
| A (pin) | −P / (2 tan α) ≈ −0.289P | P / 2 | — |
| B (roller, 60°) | P / (2 tan α) ≈ 0.289P | P / 2 | P / (2 sin α) ≈ 0.577P |

The inclined roller creates a horizontal reaction even under a purely vertical load, and the pin has to balance it. That is a useful teaching point for students.

## Other places to change

| Area | File | Change |
| --- | --- | --- |
| Support angles | `helpers/support-angle.ts` | Return `[0, 90]` for pin, `[angle]` for roller |
| Parallel check | `helpers/check-external-stability.ts` `getParallelError` | Compare angles mod 180 with a tolerance, not through an exact `Set` |
| Single-node check | same file, `getSingleNodeError` | "Pin, or two rollers at different angles" instead of `x && y` |
| Node DOF check | `helpers/check-node-dofs.ts` `areNotCollinear` | Normalize mod 180, so 0° and 180° count as the same line |
| Several supports on one node | `truss2d/solver.ts` | If their directions span two independent lines, treat the node as fully fixed |
| DOF count | `truss2d/solver.ts` `nOfSupportedDofs` | Count restraints (pin = 2, roller = 1); determinacy formula unchanged |
| App model | `model-store.types.ts`, `tools.types.ts` | Add an angle to `SupportData` and `SupportType`, plus a migration in `schema-migrations.ts` |
| Solver input mapping | `calculator/solver/SolverWorkerManager.ts` | Map the new support shape |
| Result helper | `calculator/solver/solver-result-helper.ts` | Replace the per-node x/y flags "OR-ed across all supports" |
| Canvas | support rendering, `SupportTool`, `SupportContextMenu` | Draw rotated supports and let the user set the angle |

## Open questions

- [ ] Should the user set the surface tilt or the reaction direction in the UI? (Stored value stays the reaction angle either way.)
- [ ] Free angle input, or snapping to common values (15°, 30°, 45°, 60°)?
- [ ] Should inclined supports snap to the direction of a nearby member or the ground line?
- [ ] How should the results panel and the free body diagram show R versus its Rx / Ry components?
- [ ] Do `rollerX` / `rollerY` stay as shortcuts in the tool panel, or become one roller tool with an angle?
