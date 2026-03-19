"use client";

import { motion } from "motion/react";
import { MOTION } from "@/lib/motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Rule 14: motion states sourced from MOTION.blurUp token
export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      initial={MOTION.blurUp.hidden}
      animate={MOTION.blurUp.visible}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
