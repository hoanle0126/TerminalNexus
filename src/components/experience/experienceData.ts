import type { useSpring } from "motion/react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  chapter: string;
  company: string;
  role: string;
  period: string;
  location: string;
  source: string;
  description: string;
  stack: string[];
  highlight: string;
  type: "full-time" | "part-time" | "freelance" | "internship";
  accentColor: "cyan" | "purple" | "emerald";
}

export interface ExperienceCarouselProps {
  title: string;
  subtitle: string;
  present: string;
  prevBtn: string;
  nextBtn: string;
}

export type SpringIndex = ReturnType<typeof useSpring>;

// ─── Layout constants ──────────────────────────────────────────────────────────

export const CARD_W   = 400;
export const CARD_H   = 500;
export const SPREAD_X = 620;
export const SPREAD_Y = -90;
export const TILT_Z   = -8;
export const DEPTH_Y  = 20;

// ─── Accent style map ──────────────────────────────────────────────────────────

export const ACCENT_STYLES: Record<
  ExperienceItem["accentColor"],
  {
    border: string;
    glow: string;
    badge: string;
    badgeText: string;
    highlightBox: string;
    highlightText: string;
  }
> = {
  cyan: {
    border: "border-accent-primary/50",
    glow: "shadow-[0_0_60px_rgba(var(--accent-primary-rgb),0.22),inset_0_0_30px_rgba(var(--accent-primary-rgb),0.04)]",
    badge: "text-accent-primary border-accent-primary/30 bg-accent-primary/10",
    badgeText: "text-accent-primary",
    highlightBox: "border-accent-primary/20 bg-accent-primary/5",
    highlightText: "text-accent-primary",
  },
  purple: {
    border: "border-purple-500/50",
    glow: "shadow-[0_0_60px_rgba(168,85,247,0.22),inset_0_0_30px_rgba(168,85,247,0.04)]",
    badge: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    badgeText: "text-purple-400",
    highlightBox: "border-purple-500/20 bg-purple-500/5",
    highlightText: "text-purple-300",
  },
  emerald: {
    border: "border-emerald-500/50",
    glow: "shadow-[0_0_60px_rgba(52,211,153,0.22),inset_0_0_30px_rgba(52,211,153,0.04)]",
    badge: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    badgeText: "text-emerald-400",
    highlightBox: "border-emerald-500/20 bg-emerald-500/5",
    highlightText: "text-emerald-300",
  },
};

// ─── Experience Data — re-exported from config ─────────────────────────────────
export { EXPERIENCE_DATA } from "@/config/experience";
