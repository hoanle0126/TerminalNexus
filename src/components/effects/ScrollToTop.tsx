"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { MOTION } from "@/lib/motion";
import { ArrowUp } from "lucide-react";
import { ProgressRing } from "./ProgressRing";

/**
 * Floating scroll-to-top button with a circular SVG progress ring.
 * - Appears after scrolling 300px
 * - Progress ring fills proportionally as user scrolls
 * - Smooth scroll to top on click
 * - Cyan accent color scheme
 * - Rule 17: uses Framer Motion useScroll instead of raw scroll event listener
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 300);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          {...MOTION.popUp}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Progress Ring */}
          <ProgressRing progress={progress} />

          {/* Button center */}
          <div className="w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10 group-hover:border-accent-primary/50 flex items-center justify-center transition-colors">
            <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-accent-primary transition-colors" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
