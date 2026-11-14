> Historical (imported 2026-11-14). Starting spec for the generative art; the thesis, net1/net2 and current decisions are in `docs/notes/forzez-generative-plan.md` and `docs/notes/truss-art-net-session.md`. Where they disagree, the notes win.

# Truzme Art — spec

Status: idea + working prototypes (chat widgets, 2026-10-04 and 2026-10-12). Not in the repo yet.

## Idea

Generative art made of real truss models. Pre-built generators with a seeded random source; the user tweaks a few parameters, and a **seed** makes their piece stable: reproducible and shareable. Every piece opens in Truzme as a real, solvable model.

What makes it Truzme-specific: **the physics paints.** Load directions, support orientations and (with members) tension/compression colouring are engineering results, not decoration.

Positioning: Truzme itself is a finished artifact, so this is scope creep as an app feature. As a **separate product / `/art` page** built on the same engine and Project code, it's a shareable toy that spreads through images. Lean that way.

## Core rules

1. **Recipe, not model, in the link.** A piece is `generator@version + seed + params`, e.g. `pts1.truzme.c3.j1.f100.ra` → a few dozen chars. Future link: `truzme.com/art#pts1.truzme.c3.j1.f100.ra` (fragment, no backend, same reasoning as tz1). Compare: the model itself is ~40–100 kB of Project code.
2. **Versions are frozen.** Once a generator version is published, its code never changes. Any fix or tweak = new version (`pts2`). Old recipes must render identically forever. Keep old generators in the bundle.
3. **Own PRNG.** `Math.random` is not seedable. Seed string → FNV-1a 32-bit hash → mulberry32.
4. **Independent random streams.** Global structure from one PRNG that always draws a fixed number of values (e.g. always 6 field components, `complexity` only chooses how many to use). Per-cell randomness from a hash of `(seed, channel, i, j)`, not a shared sequence. Moving one slider then changes only its own layer, not the whole picture (tuning vs. re-rolling).
5. **Float determinism.** `Math.sin/cos/exp` aren't bit-specified across engines (V8 vs SpiderMonkey). Round outputs (forces to 0.001, angles to 0.1°). **Topological decisions** (keep/drop a node, add/omit a member, choose a template) must come from integer hash output, never from a trig value near a threshold.
6. **Stability.** Once generators place members: either build only from stable templates, or use the solver as a filter (unstable → deterministic next candidate, recorded so reproduction matches).
7. **Opening a piece** = a new local model via `createLocalModel({ source: { kind: 'art', recipe } })`. Fits "never overwrite Local"; after that it's an ordinary editable truss.

## Project code facts used (schema 1.1.0)

- `supports[].angle`: optional, degrees CCW. On a roller it changes the restrained direction; **on a pin it only changes the drawing.**
- `nodalLoads[].mode`: drawing only. Default `push` = arrow head at the node; `pull` = tail at the node, pointing away.
- Members: `{ id, from, to, section, material }`. Roller: `{ x: false, y: true }` (+ `angle`).
- Units used: m, mm, kN, N/mm², mm², kg/m³. Material S235 (#F9DC85), section CHS 114.3×6 (#FF908D) copied from Norbert's sample.

## Generators so far

### `pts1` — seeded support points (frozen reference)

20×20 grid, 1 m spacing, nodes at x = i, y = 19 − j. Each kept node: pin support + one nodal load (push). Max load 1 kN; magnitudes normalised to the grid max.

Params: `seed` (a-z0-9), `c` complexity 1–6, `j` noise 0–10, `f` fill 30–100 (step 5), `ra|r0` support aligned to reaction or not.
Recipe: `pts1.<seed>.c<c>.j<j>.f<f>.<ra|r0>` (seed lowercased, non-alphanumerics stripped).

```js
function h32(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0}
function mulberry(a){return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}}
function hr(S,ch,i,j){let h=S^Math.imul(ch+1,0x9E3779B1);h=Math.imul(h^(i+1),0x85EBCA6B);h^=h>>>13;h=Math.imul(h^(j+1),0xC2B2AE35);h^=h>>>16;return mulberry(h)()}
// channels: 1 = angle noise, 2 = fill
function gen(st){ // st = {seed, c, j, f, ra}, N = 20, FMAX = 1
  const S=h32(st.seed), rng=mulberry(S), comps=[];
  for(let k=0;k<6;k++) comps.push({t:Math.floor(rng()*3), cx:rng()*2-1, cy:rng()*2-1, s:rng()<0.5?-1:1,
    f:1+Math.floor(rng()*4), th:rng()*Math.PI*2, ph:rng()*Math.PI*2, sg:0.3+rng()*0.7});
  const use=comps.slice(0,st.c), pts=[]; let mx=0;
  for(let j=0;j<N;j++) for(let i=0;i<N;i++){
    if(hr(S,2,i,j)>=st.f/100) continue;
    const u=i/(N-1)*2-1, v=1-j/(N-1)*2; let vx=0, vy=0;
    use.forEach(q=>{const dx=u-q.cx, dy=v-q.cy, e=Math.exp(-(dx*dx+dy*dy)/(q.sg*q.sg));
      if(q.t===0){const w=Math.sin(q.f*Math.PI*(u*Math.cos(q.th)+v*Math.sin(q.th))+q.ph); vx+=-Math.sin(q.th)*w; vy+=Math.cos(q.th)*w}   // wave
      else if(q.t===1){vx+=-dy*e*2*q.s; vy+=dx*e*2*q.s}   // vortex
      else {vx+=dx*e*2*q.s; vy+=dy*e*2*q.s}});            // source/sink
    const a=Math.atan2(vy,vx)+(hr(S,1,i,j)-0.5)*st.j/10*Math.PI, m=Math.hypot(vx,vy); mx=Math.max(mx,m);
    pts.push({i,j,a,m});
  }
  return pts.map(p=>{const m=mx?p.m/mx:0, Fx=r3(Math.cos(p.a)*m*FMAX), Fy=r3(Math.sin(p.a)*m*FMAX);
    let ang=0; if(st.ra&&(Fx||Fy)) ang=r1(((Math.atan2(-Fy,-Fx)*180/Math.PI-90)%360+540)%360-180);
    return {x:p.i, y:N-1-p.j, Fx, Fy, ang}});
} // r3 = round to 0.001, r1 = round to 0.1, both normalise -0 to 0
```

Output: node ids 1..n in grid order, support id = node id, `angle` omitted when 0, loads only where Fx or Fy ≠ 0 (sequential ids).
Support alignment: pin rotated so the reaction points from its base to the node; the push load arrives from the opposite side, so load, node, reaction and base sit on one axis per cell.

### Unseeded prototypes (2026-10-04, not versioned)

- **Reaction grid:** 20×20, 1 m, pin + load per node, six fixed fields (vortex, wave, dipole, flow, radial, spiral) with one parameter `k`. Loads normalised to max 1 kN. Preview drew loads as pull; exported code had no `mode` (mismatch, never fixed).
- **Mini trusses:** 20×20 cells, each a 3-member triangle: pin at (i+0.2, Y+0.15), roller at (i+0.8, Y+0.15), apex at (i+0.5+lean·0.3·cos a, Y+0.15+h), h = 0.5 or 0.2+0.45·m. Load at apex, `mode: "pull"` when Fy > 0 so the arrow stays above the apex. Preview computed reactions and member forces by statics, colouring T blue / C red with width ∝ |N|; that colouring was the most striking part.

Next obvious step: a seeded `tri1` from the mini-truss generator (members + roller + T/C colouring), and rotated rollers (which, unlike pins, change the physics).

## Product questions (open)

- Separate product/domain vs `/art` on truzme.com. Shares engine, Project code, renderer (`renderTrussSvg` from the learn spec would also render art thumbnails and OG images).
- Share = recipe link + image. Client-side PNG export is needed (people share pictures, not links); the learn-spec renderer covers it.
- How much control: a few curated sliders per generator (current approach) vs exposing the field. Fewer is better for "my piece" ownership.
- Seed format: random base36 (current) vs word seeds (`steel-vortex-42`), more memorable for sharing.
- Gallery/curation without a backend: hand-picked recipes in a static list.
- Max model size: 400 points ≈ 40 kB of Project code, 1200 nodes/members for mini trusses. Check how Truzme renders and solves at that scale.
