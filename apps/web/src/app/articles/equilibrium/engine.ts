// Scroll-driven scene engine: springs chase the active step's targets every frame.
// Plain TS (no React) so the frame loop never re-renders the text column.

import { KEYS, MERGED, STEPS, solve, type Frame, type Params } from "./model";

type UiState = {
  active: number;
  /** Bumped when user values change from outside the sliders (step change, reset). */
  version: number;
  live: Record<string, string>;
};

const K = 170; // spring stiffness
const C = 2 * Math.sqrt(K) * 0.92; // slightly under-damped

export class Engine {
  user: Params = { ...MERGED[0] };
  private spring: Record<string, { x: number; v: number }> = {};
  private listeners = new Set<() => void>();
  state: UiState = { active: -1, version: 0, live: {} };
  reduceMotion = false;

  constructor() {
    for (const k of KEYS) this.spring[k] = { x: MERGED[0][k], v: 0 };
  }

  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };
  getState = () => this.state;

  private set(p: Partial<UiState>) {
    this.state = { ...this.state, ...p };
    this.listeners.forEach((l) => l());
  }

  enterStep(i: number) {
    if (i === this.state.active) return;
    const s = STEPS[i], free = new Set(s.free ?? []);
    // scripted params snap their target; free params keep the reader's value unless the step sets one
    for (const k of KEYS) if (!free.has(k) || k in s.set) this.user[k] = MERGED[i][k];
    this.set({ active: i, version: this.state.version + 1 });
  }

  setUser(keys: string[], v: number) {
    for (const k of keys) this.user[k] = v;
  }

  reset() {
    const eq = STEPS[this.state.active]?.eq;
    if (!eq) return;
    Object.assign(this.user, eq);
    this.set({ version: this.state.version + 1 });
  }

  /**
   * Run the frame loop. `pickStep` returns the step the scroll position points at;
   * `onFrame` draws. Returns a stop function.
   */
  start(pickStep: () => number, onFrame: (frame: Frame, now: number) => void): () => void {
    this.reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = performance.now();
    const loop = (t: number) => {
      this.enterStep(pickStep());
      const dt = Math.min(0.25, (t - last) / 1000); // real time, capped after tab switches
      last = t;
      onFrame(this.tick(dt), t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }

  /** Advance the springs by dt seconds and return the frame to draw. */
  tick(dt: number): Frame {
    for (const k of KEYS) {
      const s = this.spring[k], target = this.user[k];
      if (this.reduceMotion) {
        s.x = target;
        s.v = 0;
        continue;
      }
      // fixed ~8 ms substeps keep the spring stable even after a long frame
      const n = Math.max(1, Math.ceil(dt / 0.008)), h = dt / n;
      for (let i = 0; i < n; i++) {
        s.v += (-K * (s.x - target) - C * s.v) * h;
        s.x += s.v * h;
      }
    }
    const frame = solve((k) => this.spring[k].x);
    const prev = this.state.live;
    if (Object.keys(frame.live).some((k) => prev[k] !== frame.live[k])) this.set({ live: frame.live });
    return frame;
  }
}
