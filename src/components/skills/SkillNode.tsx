"use client";

import React, { useCallback } from "react";
import { motion } from "motion/react";
import type { Skill, Cluster } from "./skillsData";
import { type NodePosition, SKILL_ICON_MAP, useFloatOffset } from "./networkGraphTypes";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface SkillNodeProps {
  skill: Skill;
  cluster: Cluster;
  position: NodePosition;
  skillIndex: number;
  clusterIndex: number;
  isHighlighted: boolean;
  onEnter: (skill: Skill, x: number, y: number) => void;
  onLeave: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function SkillNode({
  skill,
  cluster,
  position,
  skillIndex,
  clusterIndex,
  isHighlighted,
  onEnter,
  onLeave,
}: SkillNodeProps) {
  const { duration, yOffset } = useFloatOffset(clusterIndex * 7 + skillIndex * 2);

  // Resolve icon component from map
  const IconComponent = skill.iconKey ? SKILL_ICON_MAP[skill.iconKey] : undefined;
  const iconColor = skill.iconColor ?? cluster.color;

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      onEnter(skill, e.clientX, e.clientY);
    },
    [skill, onEnter]
  );

  return (
    <motion.div
      className="absolute"
      style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: 10 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.2 + clusterIndex * 0.06 + skillIndex * 0.04,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
    >
      <motion.div
        animate={{ y: yOffset }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <motion.button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={onLeave}
          animate={{
            boxShadow: isHighlighted
              ? `0 0 18px 4px ${iconColor}55, 0 0 28px 8px ${iconColor}22`
              : `0 0 4px 1px ${cluster.color}25`,
            borderColor: isHighlighted ? iconColor : `${cluster.color}44`,
          }}
          transition={{ duration: 0.15 }}
          aria-label={skill.label}
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-default"
          style={{
            background: isHighlighted
              ? `${iconColor}18`
              : "rgba(5, 10, 25, 0.88)",
          }}
        >
          {IconComponent ? (
            <IconComponent
              size={30}
              color={iconColor}
              style={{ display: "block", pointerEvents: "none", flexShrink: 0 }}
            />
          ) : (
            <span
              className="font-mono font-bold text-[12px] select-none leading-tight text-center"
              style={{ color: skill.iconColor ?? cluster.color }}
            >
              {skill.abbr ?? skill.slug.slice(0, 2).toUpperCase()}
            </span>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
