"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Button, Readout, ReadoutRow, Slider, cx } from "@forzez/ui";
import { EngineContext, useEngine, useEngineState } from "./context";
import { Engine } from "./engine";
import { STEPS, fmt, solve, type Frame, type SliderDef } from "./model";
import { SceneSvg } from "./scene";
import { CONTENT } from "./steps";

const WIDE = "(min-width: 860px)";

/** Equilibrium of forces: scroll-driven explainer. Diagram left (desktop) or pinned bottom (mobile), text right. */
export function Equilibrium() {
  const [engine] = useState(() => new Engine());
  const sections = useRef<(HTMLElement | null)[]>([]);
  const sceneRef = useRef<HTMLElement>(null);

  return (
    <EngineContext value={engine}>
      <div className="min-[860px]:grid min-[860px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <aside
          ref={sceneRef}
          aria-label="Interactive force diagram"
          className="fixed inset-x-0 bottom-0 z-10 flex h-[50svh] flex-col border-t border-rule bg-surface pb-[env(safe-area-inset-bottom)] min-[860px]:sticky min-[860px]:top-0 min-[860px]:col-start-1 min-[860px]:row-start-1 min-[860px]:h-svh min-[860px]:border-t-0 min-[860px]:border-r"
        >
          <Stage sections={sections} sceneRef={sceneRef} />
          <Controls />
        </aside>

        <main className="mx-auto max-w-[40rem] px-4 pb-[80svh] text-md leading-[1.55] min-[860px]:col-start-2 min-[860px]:row-start-1 min-[860px]:max-w-none min-[860px]:px-[clamp(24px,4vw,56px)] min-[860px]:pb-[55svh]">
          {STEPS.map((s, i) => (
            <Step key={s.id} index={i} intro={s.intro} refFn={(el) => { sections.current[i] = el; }}>
              {CONTENT[s.id]}
            </Step>
          ))}
        </main>
      </div>
    </EngineContext>
  );
}

function Step({ index, intro, refFn, children }: { index: number; intro?: boolean; refFn: (el: HTMLElement | null) => void; children: React.ReactNode }) {
  const on = useEngineState((s) => s.active === index);
  return (
    <section
      ref={refFn}
      className={cx(
        "max-w-[34rem] opacity-40 transition-opacity duration-350 ease-fz motion-reduce:transition-none [&_p]:mb-[0.8em] [&_p:last-child]:mb-0",
        on && "opacity-100",
        intro ? "pt-[max(32px,8svh)] pb-[18svh]" : "py-[14svh]",
      )}
    >
      {children}
    </section>
  );
}

/** Diagram + readout + reset. Owns the frame loop; only this subtree re-renders every frame. */
function Stage({ sections, sceneRef }: { sections: React.RefObject<(HTMLElement | null)[]>; sceneRef: React.RefObject<HTMLElement | null> }) {
  const engine = useEngine();
  const [{ frame, now }, setFrame] = useState<{ frame: Frame; now: number }>(() => ({ frame: solve((k) => engine.user[k]), now: 0 }));
  const active = useEngineState((s) => s.active);

  useEffect(() => {
    const wide = matchMedia(WIDE);
    // active step = last section whose top has passed the trigger line
    const pickStep = () => {
      const vh = innerHeight;
      const trigger = wide.matches ? vh * 0.55 : (vh - (sceneRef.current?.offsetHeight ?? 0)) * 0.62;
      let idx = 0;
      sections.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < trigger) idx = i;
      });
      return idx;
    };
    return engine.start(pickStep, (frame, now) => setFrame({ frame, now }));
  }, [engine, sections, sceneRef]);

  const { R, M, Rx, Ry, fs, V } = frame;
  const rb = R > 0.05, mb = Math.abs(M) > 0.05;
  const status = !rb && !mb ? "equilibrium" : rb && mb ? "accelerates and turns" : rb ? "accelerates" : "turns";
  const anyF = Math.max(...fs.map((q) => q.op));
  const hasEq = !!STEPS[active]?.eq;

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <SceneSvg frame={frame} now={now} reduceMotion={engine.reduceMotion} />
      <Readout className="pointer-events-none absolute top-2.5 left-3 transition-opacity duration-300">
        <div style={{ opacity: anyF > 0.05 ? 1 : 0 }}>
          <ReadoutRow label={<>ΣF<sub>x</sub></>} value={fmt(Rx, 2)} unit="kN" />
          <ReadoutRow label={<>ΣF<sub>y</sub></>} value={fmt(Ry, 2)} unit="kN" />
          {V("showM") > 0.5 ? <ReadoutRow label="ΣM" value={fmt(Math.abs(M), 2)} unit="kNm" /> : null}
          <Badge tone={rb || mb ? "bad" : "ok"} className="mt-1">{status}</Badge>
        </div>
      </Readout>
      {hasEq ? (
        <Button size="sm" className="absolute top-2.5 right-3" disabled={!(rb || mb)} onClick={() => engine.reset()}>
          ↺ Back to equilibrium
        </Button>
      ) : null}
    </div>
  );
}

/** Sliders for the active step; re-mount when the step or the engine's values change from outside. */
function Controls() {
  const active = useEngineState((s) => s.active);
  const version = useEngineState((s) => s.version);
  const sliders = STEPS[active]?.sliders ?? [];
  if (!sliders.length) return null;
  return (
    <div key={`${active}:${version}`} className="grid gap-1 border-t border-rule px-3.5 pt-2 pb-2.5 min-[860px]:px-6 min-[860px]:pt-3.5 min-[860px]:pb-5">
      {sliders.map((d) => <SliderRow key={d.keys.join()} def={d} />)}
    </div>
  );
}

function SliderRow({ def }: { def: SliderDef }) {
  const engine = useEngine();
  const [value, setValue] = useState(() => engine.user[def.keys[0]]);
  return (
    <Slider
      label={def.label}
      tone={def.tone}
      min={def.min}
      max={def.max}
      step={def.step}
      value={value}
      format={def.format}
      onChange={(v) => {
        setValue(v);
        engine.setUser(def.keys, v);
      }}
      className="animate-[fz-rise_.35s_ease_both] motion-reduce:animate-none"
    />
  );
}
