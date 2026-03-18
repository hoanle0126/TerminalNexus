"use client";

import React, { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { CLUSTERS, type Skill } from "./skillsData";
import { type TooltipState, computeSkillPositions } from "./networkGraphTypes";
import { ConnectionLines } from "./ConnectionLines";
import { CenterNode } from "./CenterNode";
import { ClusterNode } from "./ClusterNode";
import { SkillNode } from "./SkillNode";
import { SkillTooltip } from "./SkillTooltip";

// ─── Main NetworkGraph ──────────────────────────────────────────────────────────

export default function NetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleSkillEnter = useCallback((skill: Skill, x: number, y: number) => {
    setTooltip({ skill, x, y });
  }, []);

  const handleSkillLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <>
      {/* Graph container */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ minHeight: "70vh" }}
      >
        {/* SVG connection lines */}
        <ConnectionLines
          containerRef={containerRef}
          hoveredCluster={hoveredCluster}
          hoveredSkill={tooltip?.skill.slug ?? null}
        />

        {/* Center node */}
        <CenterNode />

        {/* Cluster + Skill nodes */}
        {CLUSTERS.map((cluster, ci) => {
          const skillPositions = computeSkillPositions(cluster.id, cluster.skills.length);
          const isClusterHovered = hoveredCluster === cluster.id;

          return (
            <React.Fragment key={cluster.id}>
              <ClusterNode
                cluster={cluster}
                index={ci}
                isHovered={isClusterHovered}
                onEnter={() => setHoveredCluster(cluster.id)}
                onLeave={() => setHoveredCluster(null)}
              />
              {cluster.skills.map((skill, si) => {
                const pos = skillPositions[si];
                if (!pos) return null;
                const isHighlighted =
                  isClusterHovered || tooltip?.skill.slug === skill.slug;

                return (
                  <SkillNode
                    key={skill.slug}
                    skill={skill}
                    cluster={cluster}
                    position={pos}
                    skillIndex={si}
                    clusterIndex={ci}
                    isHighlighted={isHighlighted}
                    onEnter={handleSkillEnter}
                    onLeave={handleSkillLeave}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>

      {/* Tooltip — rendered in a portal-like fixed div */}
      <AnimatePresence>
        {tooltip && <SkillTooltip tooltip={tooltip} />}
      </AnimatePresence>
    </>
  );
}
