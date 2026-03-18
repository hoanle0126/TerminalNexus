"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * DotCursor — a minimal custom cursor that renders a small glowing dot
 * following the mouse pointer. Simpler alternative to the TargetCursor.
 */
export function DotCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Skip on touch devices
    const mobile = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    setIsMobile(mobile);
    if (mobile) return;

    // Hide native cursor
    document.documentElement.classList.add("cursor-hidden");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x,
        y,
        willChange: "transform",
      }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 24,
          height: 24,
          top: -12,
          left: -12,
          border: "1.5px solid rgba(var(--accent-primary-rgb), 0.35)",
          boxShadow: "0 0 10px rgba(var(--accent-primary-rgb), 0.15)",
        }}
      />
      {/* Inner solid dot */}
      <div
        className="absolute bg-accent-primary rounded-full"
        style={{
          width: 6,
          height: 6,
          top: -3,
          left: -3,
          boxShadow: "0 0 8px rgba(var(--accent-primary-rgb), 0.8)",
        }}
      />
    </motion.div>
  );
}
