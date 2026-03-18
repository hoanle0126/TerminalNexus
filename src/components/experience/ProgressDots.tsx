"use client";

import { useTransform, motion } from "motion/react";
import { MOTION } from "@/lib/motion";
import type { SpringIndex } from "./experienceData";

// ─── Progress Dots ─────────────────────────────────────────────────────────────

export function ProgressDots({
  springIndex,
  total,
}: {
  springIndex: SpringIndex;
  total: number;
}) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const width   = useTransform(springIndex, (v) => (Math.round(v) === i ? 28 : 6));
        const opacity = useTransform(springIndex, (v) => (Math.round(v) === i ? 1 : 0.3));
        return (
          <motion.div
            key={i}
            className="h-1 rounded-full bg-cyan-400"
            style={{ width, opacity }}
          />
        );
      })}
    </div>
  );
}

// ─── Scroll Hint ───────────────────────────────────────────────────────────────

export function ScrollHint({ springIndex }: { springIndex: SpringIndex }) {
  const opacity = useTransform(springIndex, [0, 0.4], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 font-mono text-xs flex flex-col items-center gap-1 pointer-events-none"
    >
      <span>scroll</span>
      <motion.span
        {...MOTION.bounce}
      >
        ↓
      </motion.span>
    </motion.div>
  );
}
