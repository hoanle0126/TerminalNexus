"use client";

import { useTransform, motion } from "motion/react";
import {
  CARD_W,
  CARD_H,
  SPREAD_X,
  SPREAD_Y,
  TILT_Z,
  DEPTH_Y,
  ACCENT_STYLES,
  type ExperienceItem,
  type SpringIndex,
} from "./experienceData";

interface ScrollCardProps {
  item: ExperienceItem;
  cardIndex: number;
  springIndex: SpringIndex;
  totalCards: number;
}

export function ScrollCard({ item, cardIndex, springIndex }: ScrollCardProps) {
  const accent = ACCENT_STYLES[item.accentColor];

  const x       = useTransform(springIndex, (v) => (cardIndex - v) * SPREAD_X);
  const y       = useTransform(springIndex, (v) => (cardIndex - v) * SPREAD_Y);
  const rotateZ = useTransform(springIndex, (v) => (cardIndex - v) * TILT_Z);
  const rotateY = useTransform(springIndex, (v) => (cardIndex - v) * DEPTH_Y);
  const scale   = useTransform(springIndex, (v) => Math.max(0.78, 1 - Math.abs(cardIndex - v) * 0.11));
  const opacity = useTransform(springIndex, (v) => Math.max(0.15, 1 - Math.abs(cardIndex - v) * 0.5));
  const zIndex  = useTransform(springIndex, (v) => Math.round(100 - Math.abs(cardIndex - v) * 30));

  return (
    <motion.div
      style={{
        position: "absolute",
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        x,
        y,
        rotateZ,
        rotateY,
        scale,
        opacity,
        zIndex,
        willChange: "transform, opacity",
      }}
    >
      <div
        className={`
          cursor-target
          w-full h-full rounded-2xl p-6 border relative overflow-hidden
          ${accent.border} ${accent.glow}
          bg-surface-panel
        `}
      >
        <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(0,255,255,0.03)]" />

        <span className="absolute top-3 right-4 text-[80px] leading-none font-bold text-white/[0.04] font-mono select-none pointer-events-none">
          {item.chapter}
        </span>

        <div className="mb-3 flex items-center gap-2 relative z-10">
          <span className={`font-mono text-[10px] tracking-widest uppercase ${accent.badgeText} opacity-70`}>
            Chapter {item.chapter}
          </span>
          <span className="flex-1 h-px bg-white/10" />
          <span className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${accent.badge}`}>
            {item.source}
          </span>
        </div>

        <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${accent.badgeText} opacity-70 mb-1 relative z-10`}>
          {item.period}
        </p>

        <h3 className="text-lg font-bold text-white mb-0.5 relative z-10">{item.role}</h3>
        <p className="text-slate-400 text-sm mb-1 relative z-10">{item.company}</p>
        <p className="font-mono text-xs text-slate-500 mb-4 relative z-10">
          <span className="mr-1.5 text-slate-600">◈</span>
          {item.location}
        </p>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 relative z-10">
          {item.description}
        </p>

        <div className={`mb-4 rounded-lg border px-3 py-2 ${accent.highlightBox} relative z-10`}>
          <p className={`font-mono text-xs ${accent.highlightText}`}>
            <span className="mr-2 opacity-60">&gt;</span>
            {item.highlight}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 relative z-10">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
