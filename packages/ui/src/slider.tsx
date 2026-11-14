"use client";

import { useId } from "react";
import { cx } from "./cx";
import { toneColor, toneText, type Tone } from "./tone";

type SliderProps = {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  /** Shown on the right; defaults to the raw value. */
  format?: (value: number) => string;
  /** Force the slider controls; the label and thumb take its colour. */
  tone?: Tone;
  className?: string;
};

/** Labelled range input with a live value: `label ——●—— value`. */
export function Slider({ label, value, min, max, step = 1, onChange, format, tone = "ink", className }: SliderProps) {
  const id = useId();
  return (
    <div className={cx("grid grid-cols-[8.5ch_minmax(0,1fr)_6.5ch] items-center gap-2.5 font-data text-sm", className)}>
      <label htmlFor={id} className="whitespace-nowrap" style={{ color: toneText(tone) }}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="m-0 h-7 w-full cursor-pointer"
        style={{ accentColor: toneColor(tone) }}
      />
      <output htmlFor={id} className="text-right text-ink tabular-nums">
        {format ? format(value) : value}
      </output>
    </div>
  );
}
