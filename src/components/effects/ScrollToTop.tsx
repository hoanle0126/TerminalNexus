"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOTION } from "@/lib/motion";
import { ArrowUp } from "lucide-react";
import { ProgressRing } from "./ProgressRing";

/**
 * Floating scroll-to-top button with a circular SVG progress ring.
 * - Appears after scrolling 300px
 * - Progress ring fills proportionally as user scrolls
 * - Smooth scroll to top on click
 * - Cyan accent color scheme
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      setVisible(scrollTop > 300);
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center transition-colors">
            <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

