"use client";

import { ReactNode, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { cn } from "@/lib/utils";

interface SpringRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

function getTransformValue(
  direction: "up" | "down" | "left" | "right"
): string {
  switch (direction) {
    case "up":
      return "translateY(40px)";
    case "down":
      return "translateY(-40px)";
    case "left":
      return "translateX(40px)";
    case "right":
      return "translateX(-40px)";
  }
}

export function SpringReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: SpringRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const [springs, api] = useSpring(() => ({
    opacity: 0,
    transform: getTransformValue(direction),
    config: { tension: 200, friction: 20 },
  }));

  // Use IntersectionObserver for viewport detection
  const observerRef = useRef<IntersectionObserver | null>(null);

  if (typeof window !== "undefined" && !observerRef.current) {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setTimeout(() => {
              api.start({
                opacity: 1,
                transform: "translateY(0px)",
              });
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  // Attach observer on ref callback
  const setRef = (node: HTMLDivElement | null) => {
    if (ref.current && observerRef.current) {
      observerRef.current.unobserve(ref.current);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ref as any).current = node;
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  };

  return (
    <animated.div ref={setRef} style={springs} className={cn(className)}>
      {children}
    </animated.div>
  );
}

export default SpringReveal;
