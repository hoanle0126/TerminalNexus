"use client";

import React, { useState, useCallback, useRef, useEffect, type ElementType } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CLUSTERS, type Skill, type Cluster } from "./skillsData";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiNestjs, SiLaravel, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiLinux, SiNginx, SiCloudflare, SiGithub,
  SiFigma,
} from "react-icons/si";

// Map iconKey → react-icons component
const SKILL_ICON_MAP: Record<string, ElementType> = {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiNestjs, SiLaravel, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiLinux, SiNginx, SiCloudflare, SiGithub,
  SiFigma,
};

// ─── Types ─────────────────────────────────────────────────────────────────────

interface NodePosition {
  x: number; // percentage 0–100
  y: number; // percentage 0–100
}

interface TooltipState {
  skill: Skill;
  x: number;
  y: number;
}

// ─── Layout — percentage-based positions ───────────────────────────────────────

const CENTER: NodePosition = { x: 50, y: 50 };

const CLUSTER_POSITIONS: Record<string, NodePosition> = {
  frontend:  { x: 50, y: 13 },
  backend:   { x: 13, y: 50 },
  devops:    { x: 87, y: 50 },
  languages: { x: 28, y: 87 },
  design:    { x: 72, y: 87 },
};

/** Fan skill nodes around their cluster center */
function computeSkillPositions(
  clusterId: string,
  skillCount: number
): NodePosition[] {
  const clusterPos = CLUSTER_POSITIONS[clusterId];
  if (!clusterPos) return [];

  // direction from center to cluster (unit vector)
  const dx = clusterPos.x - CENTER.x;
  const dy = clusterPos.y - CENTER.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  // spread angle — wider for more skills
  const halfSpread = Math.min(55, skillCount * 11);
  const radius = 19; // % units from cluster node

  return Array.from({ length: skillCount }, (_, i) => {
    const angleDeg =
      skillCount === 1
        ? 0
        : -halfSpread + (i * (halfSpread * 2)) / (skillCount - 1);
    const angleRad = (angleDeg * Math.PI) / 180;

    // Rotate (ux, uy) by angleRad
    const fx = ux * Math.cos(angleRad) - uy * Math.sin(angleRad);
    const fy = ux * Math.sin(angleRad) + uy * Math.cos(angleRad);

    return {
      x: clusterPos.x + fx * radius,
      y: clusterPos.y + fy * radius,
    };
  });
}

// ─── SVG Connection Lines ──────────────────────────────────────────────────────

interface LinesProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredCluster: string | null;
  hoveredSkill: string | null;
}

function ConnectionLines({
  containerRef,
  hoveredCluster,
  hoveredSkill,
}: LinesProps) {
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

// ─── Float animation helper ────────────────────────────────────────────────────

function useFloatOffset(seedOffset: number) {
  const duration = 3.5 + (seedOffset % 5) * 0.5;
  return { duration, yOffset: [-3, 0, -3] as number[] };
}

// ─── Center Node ───────────────────────────────────────────────────────────────

function CenterNode() {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, zIndex: 20 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [-2, 0, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        {/* Outer ring */}
        <motion.div
          animate={{ boxShadow: [
            "0 0 20px 4px rgba(168,85,247,0.5), 0 0 40px 8px rgba(0,255,255,0.15)",
            "0 0 30px 8px rgba(168,85,247,0.7), 0 0 60px 12px rgba(0,255,255,0.25)",
            "0 0 20px 4px rgba(168,85,247,0.5), 0 0 40px 8px rgba(0,255,255,0.15)",
          ]}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[100px] h-[100px] rounded-full border-2 border-purple-500 flex items-center justify-center"
          style={{ background: "rgba(5, 10, 25, 0.95)" }}
        >
          {/* Inner ring */}
          <div className="w-[82px] h-[82px] rounded-full border border-cyan-400/70 flex items-center justify-center">
            <span className="font-mono text-[11px] font-bold text-white tracking-widest text-center leading-tight">
              LÊ<br />HOÀN
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Cluster Node ──────────────────────────────────────────────────────────────

interface ClusterNodeProps {
  cluster: Cluster;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function ClusterNode({ cluster, index, isHovered, onEnter, onLeave }: ClusterNodeProps) {
  const pos = CLUSTER_POSITIONS[cluster.id]!;
  const { duration, yOffset } = useFloatOffset(index * 3);

  return (
    <motion.div
      className="absolute"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: 15 }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
    >
      <motion.div
        animate={{ y: yOffset }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
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

// ─── Skill Node ────────────────────────────────────────────────────────────────

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

function SkillNode({
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

// ─── Tooltip ───────────────────────────────────────────────────────────────────

function SkillTooltip({ tooltip }: { tooltip: TooltipState }) {
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

// ─── Main NetworkGraph ─────────────────────────────────────────────────────────

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
