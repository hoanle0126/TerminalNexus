"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

// ─── Badge config (non-text data stays here, text comes from i18n) ────────────
const BADGE_CONFIG = [
  {
    key: "badge1" as const,
    color: "border-green-400/40 text-green-400",
    glow: "rgba(74,222,128,0.25)",
    pos: "top-[-12px] right-[-12px] md:right-[-20px]",
  },
  {
    key: "badge2" as const,
    color: "border-cyan-400/40 text-cyan-300",
    glow: "rgba(0,255,255,0.2)",
    pos: "top-[28%] right-[-16px] md:right-[-36px]",
  },
  {
    key: "badge3" as const,
    color: "border-red-400/40 text-red-300",
    glow: "rgba(248,113,113,0.2)",
    pos: "bottom-[28%] right-[-12px] md:right-[-28px]",
  },
  {
    key: "badge4" as const,
    color: "border-cyan-400/40 text-cyan-300",
    glow: "rgba(0,255,255,0.2)",
    pos: "bottom-[-12px] right-[-8px] md:right-[-16px]",
  },
  {
    key: "badge5" as const,
    color: "border-blue-400/40 text-blue-300",
    glow: "rgba(96,165,250,0.2)",
    pos: "top-[12%] left-[-16px] md:left-[-44px]",
  },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────
export default function FloatingBadges() {
  const t = useTranslations("hero");

  return (
    <>
      {BADGE_CONFIG.map((badge, i) => (
        <motion.div
          key={badge.key}
          className={`absolute z-20 px-2.5 py-1.5 rounded-sm text-[10px] md:text-xs font-mono
                      backdrop-blur-md bg-white/5
                      border ${badge.color}
                      whitespace-nowrap ${badge.pos}`}
          style={{ boxShadow: `0 0 14px ${badge.glow}` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 1 + i * 0.15 },
            scale:   { duration: 0.5, delay: 1 + i * 0.15 },
            y: {
              duration: 3 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            },
          }}
        >
          {t(badge.key)}
        </motion.div>
      ))}
    </>
  );
}

