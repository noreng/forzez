"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { Live } from "@forzez/ui";
import type { Engine } from "./engine";

export const EngineContext = createContext<Engine | null>(null);

export function useEngine(): Engine {
  const e = useContext(EngineContext);
  if (!e) throw new Error("useEngine outside <EngineContext>");
  return e;
}

/** Subscribe to one slice of the engine's UI state; re-renders only when it changes. */
export function useEngineState<T>(select: (s: Engine["state"]) => T): T {
  const e = useEngine();
  return useSyncExternalStore(e.subscribe, () => select(e.getState()), () => select(e.getState()));
}

/** Plain live number (for tables). */
export function LiveText({ k }: { k: string }) {
  return <>{useEngineState((s) => s.live[k] ?? "")}</>;
}

/** Live number as an inline chip in the text. */
export function LiveValue({ k }: { k: string }) {
  return (
    <Live>
      <LiveText k={k} />
    </Live>
  );
}
