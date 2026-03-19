"use client";

import { motion } from "motion/react";
import { MOTION } from "@/lib/motion";

/**
 * Animated scroll hint shown at the bottom of the hero section.
 * Rule 14: uses MOTION.scrollIndicator + MOTION.scrollBarPulse tokens.
 * Rule 2:  extracted from HeroSection to keep parent under 200 lines.
 */
export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600"
      {...MOTION.scrollIndicator}
    >
      <span className="text-[10px] font-mono tracking-widest uppercase">
        SCROLL
      </span>
      <motion.div
        className="w-0.5 h-8 bg-gradient-to-b from-accent-primary/60 to-transparent rounded-full"
        {...MOTION.scrollBarPulse}
      />
    </motion.div>
  );
}
