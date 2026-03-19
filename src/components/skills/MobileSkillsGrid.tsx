"use client";

import { motion } from "motion/react";
import { CLUSTERS } from "./skillsData";
import { SKILL_ICON_MAP } from "./networkGraphTypes";
import { MOTION } from "@/lib/motion";

// ─── Mobile Skills Grid ───────────────────────────────────────────────────────
// Rendered on screens < lg (iPad and below) instead of the network graph.
// Shows clusters as pill-labeled sections with icon chips.
// ─────────────────────────────────────────────────────────────────────────────

export function MobileSkillsGrid() {
  return (
    <div className="flex flex-col gap-6">
      {CLUSTERS.map((cluster, ci) => {
        return (
          <motion.div
            key={cluster.id}
            initial={MOTION.fadeInUpSmall.hidden}
            whileInView={MOTION.fadeInUpSmall.visible}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: ci * 0.07 }}
          >
            {/* Cluster label */}
            <div className="mb-3 flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 rounded-full flex-shrink-0"
                style={{
                  background: cluster.color,
                  boxShadow: `0 0 6px ${cluster.color}80`,
                }}
              />
              <span
                className="font-mono text-xs font-bold uppercase tracking-widest"
                style={{ color: cluster.color }}
              >
                {cluster.label}
              </span>
              <div
                className="h-px flex-1"
                style={{ background: `${cluster.color}30` }}
              />
            </div>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-2 pl-5">
              {cluster.skills.map((skill) => {
                const Icon = skill.iconKey ? SKILL_ICON_MAP[skill.iconKey] : null;

                return (
                  <motion.div
                    key={skill.slug}
                    whileTap={{ scale: 0.95 }}
                    title={skill.description}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-medium text-gray-300 transition-colors"
                    style={{
                      borderColor: `${cluster.color}40`,
                      background: `${cluster.color}08`,
                    }}
                  >
                    {Icon ? (
                      <Icon
                        className="h-3.5 w-3.5 flex-shrink-0"
                        style={{ color: skill.iconColor ?? cluster.color }}
                      />
                    ) : (
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: skill.iconColor ?? cluster.color }}
                      >
                        {skill.abbr}
                      </span>
                    )}
                    {skill.label}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
