"use client";

import { motion } from "motion/react";

// ─── Sizing constants ─────────────────────────────────────────────────────────
export const CORNER_SIZE = 12;
export const BORDER_W = 3;
export const IDLE_OFFSET = CORNER_SIZE * 1.5;  // distance from centre when idle
export const EXPAND_OFFSET = 36;               // bloom radius when cursor-expand active

// ─── Corner definitions ───────────────────────────────────────────────────────
export const CORNERS = [
  { id: "tl", borderClass: "border-t border-l", label: "top-left" },
  { id: "tr", borderClass: "border-t border-r", label: "top-right" },
  { id: "br", borderClass: "border-b border-r", label: "bottom-right" },
  { id: "bl", borderClass: "border-b border-l", label: "bottom-left" },
] as const;

// ─── Position presets ─────────────────────────────────────────────────────────
export const IDLE_POSITIONS = [
  { x: -IDLE_OFFSET, y: -IDLE_OFFSET },
  { x: IDLE_OFFSET - CORNER_SIZE, y: -IDLE_OFFSET },
  { x: IDLE_OFFSET - CORNER_SIZE, y: IDLE_OFFSET - CORNER_SIZE },
  { x: -IDLE_OFFSET, y: IDLE_OFFSET - CORNER_SIZE },
];

export const EXPAND_POSITIONS = [
  { x: -EXPAND_OFFSET, y: -EXPAND_OFFSET },
  { x: EXPAND_OFFSET - CORNER_SIZE, y: -EXPAND_OFFSET },
  { x: EXPAND_OFFSET - CORNER_SIZE, y: EXPAND_OFFSET - CORNER_SIZE },
  { x: -EXPAND_OFFSET, y: EXPAND_OFFSET - CORNER_SIZE },
];

// ─── Corner component ─────────────────────────────────────────────────────────
interface CornerProps {
  borderClass: string;
  x: number;
  y: number;
}

export function Corner({ borderClass, x, y }: CornerProps) {
  return (
    <motion.div
      className={`absolute w-3 h-3 border-[3px] border-accent-primary ${borderClass}`}
      style={{
        top: "50%",
        left: "50%",
        filter: "drop-shadow(0 0 3px rgba(var(--accent-primary-rgb),0.8))",
        willChange: "transform",
      }}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
    />
  );
}
