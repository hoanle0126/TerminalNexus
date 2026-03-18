"use client";

import React, { useState, useEffect } from "react";
import { CLUSTERS } from "./skillsData";
import {
  CENTER,
  CLUSTER_POSITIONS,
  computeSkillPositions,
} from "./networkGraphTypes";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface ConnectionLinesProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredCluster: string | null;
  hoveredSkill: string | null;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function ConnectionLines({
  containerRef,
  hoveredCluster,
  hoveredSkill,
}: ConnectionLinesProps) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  if (!size.w || !size.h) return null;

  const px = (pct: number, dim: number) => (pct / 100) * dim;

  const lines: React.ReactNode[] = [];

  CLUSTERS.forEach((cluster) => {
    const cp = CLUSTER_POSITIONS[cluster.id];
    if (!cp) return;

    // Center → Cluster line
    const isClusterHighlighted = hoveredCluster === cluster.id;
    lines.push(
      <line
        key={`center-${cluster.id}`}
        x1={px(CENTER.x, size.w)}
        y1={px(CENTER.y, size.h)}
        x2={px(cp.x, size.w)}
        y2={px(cp.y, size.h)}
        stroke={cluster.color}
        strokeWidth={isClusterHighlighted ? 2 : 1.5}
        strokeOpacity={isClusterHighlighted ? 0.6 : 0.25}
        strokeLinecap="round"
      />
    );

    // Cluster → Skill lines
    const skillPositions = computeSkillPositions(cluster.id, cluster.skills.length);
    cluster.skills.forEach((skill, i) => {
      const sp = skillPositions[i];
      if (!sp) return;

      const isSkillHighlighted =
        isClusterHighlighted || hoveredSkill === skill.slug;

      lines.push(
        <line
          key={`${cluster.id}-${skill.slug}`}
          x1={px(cp.x, size.w)}
          y1={px(cp.y, size.h)}
          x2={px(sp.x, size.w)}
          y2={px(sp.y, size.h)}
          stroke={cluster.color}
          strokeWidth={isSkillHighlighted ? 1.5 : 1}
          strokeOpacity={isSkillHighlighted ? 0.55 : 0.2}
          strokeLinecap="round"
        />
      );
    });
  });

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={size.w}
      height={size.h}
      style={{ zIndex: 1 }}
    >
      {lines}
    </svg>
  );
}
