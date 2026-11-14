# Forzez Films — videos on the site as live code (brainstorm 2026-11-14)

Companion to `forzez-roadmap.md`, `forzez-generative-plan.md`, `forzez-stack.md`.
Inspiration: an experiment where Claude Fable 5.2 made 100 short films as HTML pages (60 fps, score synthesised in code, no media files). Each one only becomes an MP4 when it's rendered.

## Thesis
**A Forzez film is a recipe plus time.** Already true for stills (recipe → model → image). Films add `t`: `frame(recipe, t)` is a pure function, so the same page is:
- a live film in the gallery (any resolution, a few KB, no video hosting),
- a frame-exact MP4 for Instagram / TikTok / YouTube,
- a personal film from the configurator ("your truss, 15 seconds").
Same rule as the stills: the physics designs it. Motion has to come from the solver (load ramp, failure order, form-finding), not from easing curves on top.

## Architecture (three pieces, build in this order)
1. **Film runtime** (`@forzez/film`)
   - `film = { duration, fps, aspects, setup(recipe), draw(ctx, t), score(t) }`. No `Date.now`, no `requestAnimationFrame` state, no incremental integration.
   - Solver results that depend on history (failure sequence, form-finding iterations) are precomputed in `setup` as a step table; `draw(t)` looks up step `k(t)` and interpolates. Deterministic, seekable, scrubbable.
   - Aspect-aware composition: 9:16 (Reels/TikTok, main), 1:1, 16:9 (site/YouTube). Safe areas for UI overlays in 9:16.
   - Title block overlay at the end: recipe / Forze Code, `n m r`, `Σ = 0.002 kN`, film length.
2. **Synth** (`@forzez/sound`, Web Audio, offline-renderable with `OfflineAudioContext`)
   - **Tension members are literally strings.** f = (1/2L)·√(T/μ) with a chosen μ → every blue member has a real pitch. Pluck them in plotter order; tune a bicycle wheel; a spider web becomes a harp. Big hook, physically honest.
   - Compression (red) = low drones / bowed or struck sounds, loudness ∝ |N|.
   - Failure = percussive hit, pitch from the member's force at failure. Collapse = cascade.
   - Plotter sounds: synthesised stepper whine (frequency ∝ pen speed), pen-down click, pen-up tick. ASMR angle for the plotter videos.
   - Score is also a pure function of the step table → audio and picture can't drift.
3. **Render tool** (Node + headless Chrome)
   - Step the page frame by frame (`window.__seek(t)` → capture) → ffmpeg, 1080×1920 and 1920×1080 @ 60 fps; audio rendered offline, muxed.
   - In-browser alternative: WebCodecs export on the site (`VideoEncoder` + mp4 muxer) → visitors download their own film. Same `frame(t)`.

## QA (lessons from the Fable run)
- Its own QA said 100/100 clean while 5 videos had blank frames: it checked format + loudness, not pixels. → **Check the frames.** Per-frame blank / near-uniform detector, frame-hash sequence, frame-count == duration × fps.
- 3 renders silently left 48-byte files → **minimum file size + ffprobe duration check**, fail loudly.
- 99 agents launched at once → all rate-limited, zero output. → If agents write films: one GitHub issue per film, small batches, sequential render queue.
- Determinism test: render the same film twice, compare frame hashes.
- Contact sheet per film (every 2 s) as a human review artifact.

## On the site
- `/films` gallery: live canvases, autoplay muted only while in viewport (IntersectionObserver), max 2–3 running at once, poster = t=0 SVG. `prefers-reduced-motion` → poster + play button.
- Sound on tap (autoplay policy). Small "this film is 6 KB of code" stamp.
- Film page: player + scrub bar (it's seekable, show it off) + recipe + title block + "Download MP4" (WebCodecs) + link to the configurator with the same recipe.
- Configurator: "Make it a film" → pick a film template (draw, load ramp, failure, influence line) → personal MP4. Gift / share hook, possibly a paid tier later.
- Astro island per film template; films are code-split, the gallery loads only what's visible.

## First films (from the generative backlog)
Format idea: 15–30 s, vertical first, one per week. Name: **Forzez Films No. 001…**
1. **13 minutes of ink in 30 seconds** — plotter-order drawing of the arch truss, red pen then blue pen, stepper whine. (= roadmap "First video".)
2. **Which member fails first?** — load ramp, freeze before failure, ask. Answer = next week's film (failure sequence with cascade sound). Series format.
3. **Tuning a bicycle wheel** — spokes tighten, each one plucked at its real pitch, rim turns red.
4. **Spider web harp** — orb web prestressed by form-finding, plucked radials and spiral.
5. **Hanging chain → arch** — chain hangs (blue), flips upside down, turns red. Gaudí in 20 s.
6. **Four hinges** — supports spread, thrust line leaves the arch, hinges open, mechanism. Milanković story in the caption.
7. **Moving load** — a truck crosses, colours ripple (influence lines). Loopable → live wallpaper.
8. **Spaghettification** — truss falls into a black hole, radials blue, rings red, members fail one by one.
9. **Kármán vortex street** — alternating side loads on a chimney, colours flip side to side. "Plotted in Budapest."
10. **The gap / The touch** — Creation arms as cantilevers; the fingertip contact makes one structure.
11. **Granular force chains** — disks settle, red veins appear.
12. **Can a fridge magnet break a bridge?** — recorded magnetometer trace as the load (the trace is the seed).

## Open questions
- Lengths: 15 s (TikTok loop) vs 30–45 s (Reels with story). Probably both cuts from the same film (runtime takes a duration).
- Music identity: one recognisable "Forzez sound" (tuning, scale) across films, or each film its own score? Leaning: shared scale + instrument set, own score each.
- Live vs MP4 on the site for mobile battery/perf: measure; fallback to MP4 with a "play live" toggle.
- Does WebCodecs export become a paid feature (with the print) or free marketing? Leaning: free, watermark-free, with recipe link.
- Agent-made films: write 2–3 by hand first so the runtime and taste are fixed, then hand templated films to agents via issues.

## Build order
1. `@forzez/film` runtime + one film (No. 001, plotter order) + render tool + frame QA.
2. Synth with string-pitch tension + stepper sounds.
3. First 4 films, post weekly; `/films` gallery page on the landing site.
4. WebCodecs "Download MP4" + configurator "Make it a film".
