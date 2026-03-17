"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, animate } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TargetCursorProps {
  /** CSS selector for elements the cursor snaps to on hover */
  targetSelector?: string;
  /** Duration in seconds for the idle spin cycle */
  spinDuration?: number;
}

// ─── Corner config ────────────────────────────────────────────────────────────
// cornerSize: px, borderWidth: px used for snap offset
const CORNER_SIZE = 12;
const BORDER_W = 3;
const IDLE_OFFSET = CORNER_SIZE * 1.5; // distance from centre when idle

// Each corner: which tailwind border sides to show
const CORNERS = [
  { id: "tl", borderClass: "border-t border-l", label: "top-left" },
  { id: "tr", borderClass: "border-t border-r", label: "top-right" },
  { id: "br", borderClass: "border-b border-r", label: "bottom-right" },
  { id: "bl", borderClass: "border-b border-l", label: "bottom-left" },
];

// Idle positions (relative to cursor centre, in px)
const IDLE_POSITIONS = [
  { x: -IDLE_OFFSET, y: -IDLE_OFFSET }, // top-left
  { x: IDLE_OFFSET - CORNER_SIZE, y: -IDLE_OFFSET }, // top-right
  { x: IDLE_OFFSET - CORNER_SIZE, y: IDLE_OFFSET - CORNER_SIZE }, // bottom-right
  { x: -IDLE_OFFSET, y: IDLE_OFFSET - CORNER_SIZE }, // bottom-left
];

// ─── Corner component ─────────────────────────────────────────────────────────
interface CornerProps {
  borderClass: string;
  x: number;
  y: number;
}

function Corner({ borderClass, x, y }: CornerProps) {
  return (
    <motion.div
      className={`absolute w-3 h-3 border-[3px] border-cyan-400 ${borderClass}`}
      style={{
        top: "50%",
        left: "50%",
        filter: "drop-shadow(0 0 3px rgba(0,255,255,0.8))",
        willChange: "transform",
      }}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
    />
  );
}

// ─── TargetCursor ─────────────────────────────────────────────────────────────
export function TargetCursor({
  targetSelector = ".cursor-target",
  spinDuration = 3,
}: TargetCursorProps) {
  // ── Mobile kill-switch ───────────────────────────────────────────────────
  const isMobile =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // ── Mouse position (raw) ─────────────────────────────────────────────────
  const rawX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const rawY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  // ── Spring-smoothed position for the outer wrapper ───────────────────────
  const springX = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.5 });

  // ── Snap state ───────────────────────────────────────────────────────────
  const [snapRect, setSnapRect] = useState<DOMRect | null>(null);
  const [isSnapped, setIsSnapped] = useState(false);

  // ── Spin rotation ────────────────────────────────────────────────────────
  const rotation = useMotionValue(0);
  const spinControlRef = useRef<ReturnType<typeof animate> | null>(null);

  // Keep ref to latest rect for scroll updates
  const activeTargetRef = useRef<Element | null>(null);

  // ── Corner positions derived from snap rect ───────────────────────────────
  const getSnapPositions = useCallback(
    (rect: DOMRect, curX: number, curY: number) => [
      {
        x: rect.left - BORDER_W - curX - CORNER_SIZE / 2,
        y: rect.top - BORDER_W - curY - CORNER_SIZE / 2,
      },
      {
        x: rect.right + BORDER_W - CORNER_SIZE - curX - CORNER_SIZE / 2,
        y: rect.top - BORDER_W - curY - CORNER_SIZE / 2,
      },
      {
        x: rect.right + BORDER_W - CORNER_SIZE - curX - CORNER_SIZE / 2,
        y: rect.bottom + BORDER_W - CORNER_SIZE - curY - CORNER_SIZE / 2,
      },
      {
        x: rect.left - BORDER_W - curX - CORNER_SIZE / 2,
        y: rect.bottom + BORDER_W - CORNER_SIZE - curY - CORNER_SIZE / 2,
      },
    ],
    []
  );

  // Pre-compute corner positions
  const [cornerPositions, setCornerPositions] = useState(IDLE_POSITIONS);

  // ── Spin helpers ─────────────────────────────────────────────────────────
  const startSpin = useCallback(() => {
    if (spinControlRef.current) spinControlRef.current.stop();
    const current = rotation.get();
    const target = current + 360;
    spinControlRef.current = animate(rotation, target, {
      duration: spinDuration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [rotation, spinDuration]);

  const stopSpin = useCallback(() => {
    if (spinControlRef.current) {
      spinControlRef.current.stop();
      spinControlRef.current = null;
    }
    // Snap rotation to 0 smoothly
    animate(rotation, 0, { duration: 0.3, ease: "easeOut" });
  }, [rotation]);

  // ── Start spinning on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    startSpin();
    return () => {
      if (spinControlRef.current) spinControlRef.current.stop();
    };
  }, [isMobile, startSpin]);

  // ── Mouse move ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      // Update snap positions if snapped (accounts for mouse move within element)
      if (activeTargetRef.current) {
        const rect = activeTargetRef.current.getBoundingClientRect();
        setCornerPositions(getSnapPositions(rect, e.clientX, e.clientY));
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [isMobile, rawX, rawY, getSnapPositions]);

  // ── Hover target detection ────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;

    const handleEnter = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest(targetSelector);
      if (!el) return;
      activeTargetRef.current = el;

      const rect = el.getBoundingClientRect();
      const cx = rawX.get();
      const cy = rawY.get();
      setSnapRect(rect);
      setIsSnapped(true);
      setCornerPositions(getSnapPositions(rect, cx, cy));
      stopSpin();
    };

    const handleLeave = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest(targetSelector);
      if (!el) return;
      // Only leave if we're actually leaving this element, not entering a child
      if (el.contains(e.relatedTarget as Node)) return;
      activeTargetRef.current = null;
      setSnapRect(null);
      setIsSnapped(false);
      setCornerPositions(IDLE_POSITIONS);
      startSpin();
    };

    // Attach to window to catch all cursor-target entries
    window.addEventListener("mouseover", handleEnter as EventListener);
    window.addEventListener("mouseout", handleLeave as EventListener);

    return () => {
      window.removeEventListener("mouseover", handleEnter as EventListener);
      window.removeEventListener("mouseout", handleLeave as EventListener);
    };
  }, [isMobile, targetSelector, rawX, rawY, startSpin, stopSpin, getSnapPositions]);

  // ── Scroll: refresh snap rect ─────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (!activeTargetRef.current) return;
      const rect = activeTargetRef.current.getBoundingClientRect();
      setSnapRect(rect);
      const cx = rawX.get();
      const cy = rawY.get();
      setCornerPositions(getSnapPositions(rect, cx, cy));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, rawX, rawY, getSnapPositions]);

  // ── Hide default cursor via class ─────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    document.documentElement.classList.add("cursor-hidden");
    return () => document.documentElement.classList.remove("cursor-hidden");
  }, [isMobile]);

  // ── Mobile: render nothing ────────────────────────────────────────────────
  if (isMobile) return null;

  return (
    <>
      {/*
       * Outer wrapper: spring-follows the mouse.
       * Centred at (0,0) relative to itself — corners are offset from here.
       */}
      <motion.div
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, willChange: "transform" }}
      >
        {/* Spinning ring wrapper (idle only) */}
        <motion.div
          className="absolute top-0 left-0 w-0 h-0"
          style={{ rotate: isSnapped ? 0 : rotation }}
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

      {/* Snap highlight overlay — drawn directly over the target element */}
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
