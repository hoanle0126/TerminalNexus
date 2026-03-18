"use client";

import { motion } from "motion/react";
import type { TooltipState } from "./networkGraphTypes";

interface SkillTooltipProps {
  tooltip: TooltipState;
}

export function SkillTooltip({ tooltip }: SkillTooltipProps) {
  return (
    <motion.div
      key={tooltip.skill.slug}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 pointer-events-none"
      style={{ left: tooltip.x + 14, top: tooltip.y - 10 }}
    >
      <div className="px-3 py-2 rounded-lg border border-white/10 font-mono text-xs text-white shadow-2xl backdrop-blur-md"
        style={{ background: "rgba(5, 10, 25, 0.92)" }}
      >
        <div className="font-bold text-white mb-0.5">{tooltip.skill.label}</div>
        {tooltip.skill.description && (
          <div className="text-gray-400">{tooltip.skill.description}</div>
        )}
      </div>
    </motion.div>
  );
}
