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
    border: "border-cyan-500/50",
    glow: "shadow-[0_0_60px_rgba(0,255,255,0.22),inset_0_0_30px_rgba(0,255,255,0.04)]",
    badge: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    badgeText: "text-cyan-400",
    highlightBox: "border-cyan-500/20 bg-cyan-500/5",
    highlightText: "text-cyan-300",
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

// ─── Experience Data ───────────────────────────────────────────────────────────

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    chapter: "01",
    company: "Freelance via Referrals",
    role: "Frontend & Backend Foundations",
    period: "Year 1",
    location: "Ho Chi Minh City, Vietnam",
    source: "Via referrals & Facebook",
    description:
      "Started building web projects through word-of-mouth and Facebook communities. Developed a solid full-stack foundation delivering real client work.",
    stack: ["React.js", "Laravel", "MySQL", "Tailwind CSS", "PHP"],
    highlight: "5 complete client websites + 10+ landing pages delivered",
    type: "freelance",
    accentColor: "cyan",
  },
  {
    id: "exp-2",
    chapter: "02",
    company: "Self-Directed",
    role: "Modern Stack & Self-Hosting",
    period: "Year 2 → Present",
    location: "Ho Chi Minh City, Vietnam",
    source: "Freelance",
    description:
      "Upgraded to a modern stack and took full ownership of deployment: VPS, Cloudflare, Cloudflare R2 for storage. Expert in both raw coding and AI-assisted development.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker", "Cloudflare R2"],
    highlight: "2 major projects live & in production, full VPS self-hosting",
    type: "freelance",
    accentColor: "purple",
  },
  {
    id: "exp-3",
    chapter: "03",
    company: "Independent",
    role: "Creative Developer & Designer",
    period: "Now",
    location: "Ho Chi Minh City, Vietnam",
    source: "Freelance",
    description:
      "Beyond code — design interfaces in Figma, generate images, video, and music with AI. JLPT N3 Japanese. Combine technical depth with creative execution.",
    stack: ["Figma", "AI Image", "AI Video", "AI Music"],
    highlight: "JLPT N3 日本語 certified · Fluent in manual & AI-assisted dev",
    type: "freelance",
    accentColor: "emerald",
  },
];
