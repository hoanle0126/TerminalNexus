"use client";

import { motion } from "motion/react";
import type { Cluster } from "./skillsData";
import { CLUSTER_POSITIONS, useFloatOffset } from "./networkGraphTypes";
import { MOTION } from "@/lib/motion";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface ClusterNodeProps {
  cluster: Cluster;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function ClusterNode({ cluster, index, isHovered, onEnter, onLeave }: ClusterNodeProps) {
  const pos = CLUSTER_POSITIONS[cluster.id]!;
  const { duration, yOffset } = useFloatOffset(index * 3);

  return (
    <motion.div
      className="absolute"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: 15 }}
      {...MOTION.clusterNodeEnter(index)}
    >
      <motion.div
        {...MOTION.clusterNodeFloat(yOffset, duration)}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <motion.button
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          animate={{
            boxShadow: isHovered
              ? `0 0 18px 4px ${cluster.color}55, 0 0 32px 8px ${cluster.color}22`
              : `0 0 8px 2px ${cluster.color}30`,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full px-5 py-2.5 border font-mono font-bold text-[12px] uppercase tracking-widest cursor-default select-none whitespace-nowrap"
          style={{
            borderColor: isHovered ? cluster.color : `${cluster.color}60`,
            color: cluster.color,
            background: isHovered
              ? `${cluster.color}18`
              : `${cluster.color}08`,
          }}
        >
          {cluster.label}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
