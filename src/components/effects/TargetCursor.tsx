"use client";

import { motion } from "motion/react";
import { CORNERS, BORDER_W, Corner } from "./targetCursorConfig";
import { useTargetCursor } from "./useTargetCursor";

// ─── Types ──────────────────────────────────────────────────────────────────────
interface TargetCursorProps {
  /** CSS selector for elements the cursor snaps to on hover */
  targetSelector?: string;
  /** Duration in seconds for the idle spin cycle */
  spinDuration?: number;
}

// ─── Component ──────────────────────────────────────────────────────────────────
export function TargetCursor({
  targetSelector = ".cursor-target",
  spinDuration = 3,
}: TargetCursorProps) {
  const {
    isMobile,
    springX,
    springY,
    rotation,
    isSnapped,
    isExpanded,
    snapRect,
    cornerPositions,
  } = useTargetCursor({ targetSelector, spinDuration });

  if (isMobile) return null;

  return (
    <>
      {/* Outer wrapper: spring-follows the mouse */}
      <motion.div
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, willChange: "transform" }}
      >
        {/* Spinning ring wrapper (idle only) */}
        <motion.div
          className="absolute top-0 left-0 w-0 h-0"
          style={{ rotate: isSnapped || isExpanded ? 0 : rotation }}
        >
          {CORNERS.map((corner, i) => (
            <Corner
              key={corner.id}
              borderClass={corner.borderClass}
              x={cornerPositions[i].x}
              y={cornerPositions[i].y}
            />
          ))}
        </motion.div>

        {/* Centre dot */}
        <div
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 6px rgba(0,255,255,0.9)",
          }}
        />
      </motion.div>

      {/* Snap highlight overlay */}
      {isSnapped && snapRect && (
        <motion.div
          className="fixed pointer-events-none z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            top: snapRect.top - BORDER_W,
            left: snapRect.left - BORDER_W,
            width: snapRect.width + BORDER_W * 2,
            height: snapRect.height + BORDER_W * 2,
            border: "1px solid rgba(0,255,255,0.15)",
            boxShadow: "0 0 12px rgba(0,255,255,0.06)",
          }}
        />
      )}
    </>
  );
}
