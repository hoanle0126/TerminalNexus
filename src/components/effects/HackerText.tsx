"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function getRandomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface HackerTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function HackerText({
  text,
  speed = 50,
  className,
  onComplete,
}: HackerTextProps) {
  const [displayText, setDisplayText] = useState<string>("");
  const resolvedIndexRef = useRef<number>(0);
  const cycleCountRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const hasCompletedRef = useRef<boolean>(false);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= speed) {
        lastTimeRef.current = timestamp;
        const currentResolved = resolvedIndexRef.current;

        if (currentResolved >= text.length) {
          setDisplayText(text);
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete?.();
          }
          return;
        }

        cycleCountRef.current += 1;

        // Each character cycles through 3–5 random chars before settling
        const cyclesPerChar = 3 + Math.floor(Math.random() * 3);

        if (cycleCountRef.current >= cyclesPerChar) {
          resolvedIndexRef.current += 1;
          cycleCountRef.current = 0;
        }

        const resolved = text.slice(0, resolvedIndexRef.current);
        const scrambled = Array.from(
          { length: text.length - resolvedIndexRef.current },
          () => getRandomChar()
        ).join("");

        setDisplayText(resolved + scrambled);
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [text, speed, onComplete]
  );

  useEffect(() => {
    resolvedIndexRef.current = 0;
    cycleCountRef.current = 0;
    lastTimeRef.current = 0;
    hasCompletedRef.current = false;

    // Initialize with random characters
    setDisplayText(
      Array.from({ length: text.length }, () => getRandomChar()).join("")
    );

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [text, animate]);

  return (
    <span className={cn("font-mono", className)} aria-label={text}>
      {displayText}
    </span>
  );
}

export default HackerText;
