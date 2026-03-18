"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

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

  // SVG circle math
  const size = 48;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Progress Ring */}
          <svg
            width={size}
            height={size}
            className="absolute inset-0 -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgb(34,211,238)" /* cyan-400 */
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>

          {/* Button center */}
          <div className="w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center transition-colors">
            <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
