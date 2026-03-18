"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

// ─── Boot line definition ─────────────────────────────────────────────────────
interface BootLine {
  text: string;
  /** Extra delay before this line appears (ms) */
  delay?: number;
  /** If true, show as accent-colored */
  accent?: boolean;
  /** If true, show as large/bold text */
  hero?: boolean;
}

// ─── State machine ────────────────────────────────────────────────────────────
type Phase = "booting" | "exiting" | "done";

const STAGGER_MS = 350;
const EXIT_DELAY_MS = 600;
const EXIT_DURATION_MS = 500;

// ─── Component ────────────────────────────────────────────────────────────────
export default function BootLoader() {
  const t = useTranslations("boot");
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("booted")) {
      return "done";
    }
    return "booting";
  });
  const [visibleLines, setVisibleLines] = useState(0);

  // Build boot lines from i18n
  const bootLines: BootLine[] = [
    { text: t("line1") },
    { text: t("line2") },
    { text: t("line3") },
    { text: t("line4"), accent: true, hero: true },
    { text: t("line5"), accent: true },
  ];

  const totalLines = bootLines.length;

  // Stagger lines in
  useEffect(() => {
    if (phase !== "booting") return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, (i + 1) * STAGGER_MS),
      );
    });

    // After all lines shown, trigger exit
    timers.push(
      setTimeout(() => {
        setPhase("exiting");
      }, totalLines * STAGGER_MS + EXIT_DELAY_MS),
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // After exit animation completes
  const handleExitComplete = useCallback(() => {
    setPhase("done");
    try {
      sessionStorage.setItem("booted", "1");
    } catch {
      /* private browsing */
    }
  }, []);

  // Don't render anything if already booted
  if (phase === "done") return null;

  const progress = Math.round((visibleLines / totalLines) * 100);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {phase === "booting" && (
        <motion.div
          key="boot-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          transition={{ duration: EXIT_DURATION_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center
                     bg-background"
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
            }}
          />

          {/* Terminal window */}
          <div className="relative w-full max-w-md px-6">
            {/* Terminal header */}
            <div className="flex items-center gap-1.5 mb-4 opacity-40">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] font-mono text-muted-foreground tracking-wider">
                terminal — boot
              </span>
            </div>

            {/* Boot lines */}
            <div className="space-y-2 font-mono text-sm">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex items-center gap-2 ${
                    line.hero
                      ? "text-lg font-bold mt-4"
                      : ""
                  } ${
                    line.accent
                      ? "text-accent-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {!line.hero && (
                    <span className="text-accent-primary/60 select-none">
                      {">"}
                    </span>
                  )}
                  <span>{line.text}</span>
                  {/* Blinking cursor on last line */}
                  {i === visibleLines - 1 && (
                    <span className="inline-block w-2 h-4 bg-accent-primary animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  boxShadow: "0 0 8px rgba(var(--accent-primary-rgb), 0.6)",
                }}
              />
            </div>

            {/* Progress percentage */}
            <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground/50 tracking-widest">
              <span>BOOT</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
