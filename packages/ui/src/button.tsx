import type { ComponentProps } from "react";
import { cx } from "./cx";

type ButtonProps = ComponentProps<"button"> & {
  /** primary: ink fill · secondary: ink outline · ghost: underlined text */
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const variants = {
  primary:
    "border border-ink bg-ink text-surface hover:bg-ink/85 disabled:border-rule disabled:bg-transparent disabled:text-muted",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-sunken disabled:border-rule disabled:text-muted disabled:hover:bg-transparent",
  ghost:
    "border border-transparent bg-transparent text-ink underline decoration-muted underline-offset-3 hover:decoration-ink disabled:text-muted",
};

const sizes = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3.5 py-2.5 text-sm",
};

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded font-data leading-none whitespace-nowrap transition-colors duration-150 ease-fz disabled:cursor-default",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
