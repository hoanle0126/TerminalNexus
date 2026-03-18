import { useEffect, useState, useRef, useCallback } from "react";
import { useSpring, useMotionValue, animate } from "motion/react";
import {
  CORNER_SIZE,
  BORDER_W,
  IDLE_POSITIONS,
  EXPAND_POSITIONS,
} from "./targetCursorConfig";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface UseTargetCursorOptions {
  targetSelector: string;
  spinDuration: number;
}

// ─── Hook ───────────────────────────────────────────────────────────────────────

export function useTargetCursor({
  targetSelector,
  spinDuration,
}: UseTargetCursorOptions) {
  // ── Mobile kill-switch ──
  const isMobile =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // ── Mouse position (raw) ──
  const rawX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const rawY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  // ── Spring-smoothed position ──
  const springX = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.5 });

  // ── Snap state ──
  const [snapRect, setSnapRect] = useState<DOMRect | null>(null);
  const [isSnapped, setIsSnapped] = useState(false);

  // ── Expand (bloom) state ──
  const [isExpanded, setIsExpanded] = useState(false);

  // ── Spin rotation ──
  const rotation = useMotionValue(0);
  const spinControlRef = useRef<ReturnType<typeof animate> | null>(null);
  const activeTargetRef = useRef<Element | null>(null);

  // ── Corner positions ──
  const [cornerPositions, setCornerPositions] = useState(IDLE_POSITIONS);

  // ── Snap position calculator ──
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

  // ── Spin helpers ──
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
    animate(rotation, 0, { duration: 0.3, ease: "easeOut" });
  }, [rotation]);

  // ── Start spinning on mount ──
  useEffect(() => {
    if (isMobile) return;
    startSpin();
    return () => {
      if (spinControlRef.current) spinControlRef.current.stop();
    };
  }, [isMobile, startSpin]);

  // ── Mouse move ──
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (activeTargetRef.current) {
        const rect = activeTargetRef.current.getBoundingClientRect();
        setCornerPositions(getSnapPositions(rect, e.clientX, e.clientY));
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [isMobile, rawX, rawY, getSnapPositions]);

  // ── Hover target detection ──
  useEffect(() => {
    if (isMobile) return;

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest(".cursor-expand")) {
        setIsExpanded(true);
        setCornerPositions(EXPAND_POSITIONS);
        stopSpin();
        return;
      }
      const el = target?.closest(targetSelector);
      if (!el) return;
      activeTargetRef.current = el;
      const rect = el.getBoundingClientRect();
      setSnapRect(rect);
      setIsSnapped(true);
      setCornerPositions(getSnapPositions(rect, rawX.get(), rawY.get()));
      stopSpin();
    };

    const handleLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      const expandEl = target?.closest(".cursor-expand");
      if (expandEl) {
        if (expandEl.contains(e.relatedTarget as Node)) return;
        setIsExpanded(false);
        setCornerPositions(IDLE_POSITIONS);
        startSpin();
        return;
      }
      const el = target?.closest(targetSelector);
      if (!el) return;
      if (el.contains(e.relatedTarget as Node)) return;
      activeTargetRef.current = null;
      setSnapRect(null);
      setIsSnapped(false);
      setCornerPositions(IDLE_POSITIONS);
      startSpin();
    };

    window.addEventListener("mouseover", handleEnter as EventListener);
    window.addEventListener("mouseout", handleLeave as EventListener);
    return () => {
      window.removeEventListener("mouseover", handleEnter as EventListener);
      window.removeEventListener("mouseout", handleLeave as EventListener);
    };
  }, [isMobile, targetSelector, rawX, rawY, startSpin, stopSpin, getSnapPositions]);

  // ── Scroll: refresh snap rect ──
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (!activeTargetRef.current) return;
      const rect = activeTargetRef.current.getBoundingClientRect();
      setSnapRect(rect);
      setCornerPositions(getSnapPositions(rect, rawX.get(), rawY.get()));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, rawX, rawY, getSnapPositions]);

  // ── Hide default cursor ──
  useEffect(() => {
    if (isMobile) return;
    document.documentElement.classList.add("cursor-hidden");
    return () => document.documentElement.classList.remove("cursor-hidden");
  }, [isMobile]);

  return {
    isMobile,
    springX,
    springY,
    rotation,
    isSnapped,
    isExpanded,
    snapRect,
    cornerPositions,
  };
}
