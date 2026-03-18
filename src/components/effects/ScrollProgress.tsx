"use client";

import { ScrollProgress as BaseScrollProgress } from "@/components/ui/scroll-progress";

/**
 * ScrollProgress
 *
 * A 2px neon progress bar that tracks the page scroll position.
 * Fixed on top of everything (z-[60]) so it renders above the Navbar (z-50).
 * The gradient matches the Terminal-Futurist colour palette:
 *   cyan (#22d3ee) → purple (#a855f7) → green (#4ade80)
 */
export function ScrollProgress() {
  return (
    <BaseScrollProgress
      className="z-[60] h-[2px] bg-linear-to-r from-accent-primary via-purple-500 to-green-400 shadow-[0_0_8px_1px_rgba(var(--accent-primary-rgb),0.5)]"
      aria-hidden="true"
    />
  );
}
