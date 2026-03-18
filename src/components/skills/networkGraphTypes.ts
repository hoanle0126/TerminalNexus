import type { ElementType } from "react";
import type { Skill } from "./skillsData";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiNestjs, SiLaravel, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiLinux, SiNginx, SiCloudflare, SiGithub,
  SiFigma,
} from "react-icons/si";

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface NodePosition {
  x: number; // percentage 0–100
  y: number; // percentage 0–100
}

export interface TooltipState {
  skill: Skill;
  x: number;
  y: number;
}

// ─── Icon Map ───────────────────────────────────────────────────────────────────

export const SKILL_ICON_MAP: Record<string, ElementType> = {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiNestjs, SiLaravel, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiLinux, SiNginx, SiCloudflare, SiGithub,
  SiFigma,
};

// ─── Layout — percentage-based positions ────────────────────────────────────────

export const CENTER: NodePosition = { x: 50, y: 50 };

export const CLUSTER_POSITIONS: Record<string, NodePosition> = {
  frontend:  { x: 50, y: 13 },
  backend:   { x: 13, y: 50 },
  devops:    { x: 87, y: 50 },
  languages: { x: 28, y: 87 },
  design:    { x: 72, y: 87 },
};

/** Fan skill nodes around their cluster center */
export function computeSkillPositions(
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

// ─── Float animation helper ─────────────────────────────────────────────────────

export function useFloatOffset(seedOffset: number) {
  const duration = 3.5 + (seedOffset % 5) * 0.5;
  return { duration, yOffset: [-3, 0, -3] as number[] };
}
