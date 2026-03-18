"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { MOTION } from "@/lib/motion";
import { siteConfig } from "@/config/site";
import PixelTransition from "@/components/reactbits/PixelTransition";
import CodeEditorPanel from "@/components/hero/CodeEditorPanel";

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroProfileCard() {
  const t = useTranslations("hero");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches,
    );
  }, []);

  return (
    <motion.div
      initial={MOTION.scaleUp.hidden}
      animate={MOTION.scaleUp.visible}
      transition={{ delay: 0.6 }}
      className="relative w-full max-w-[420px]"
    >
      <PixelTransition
        firstContent={
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={siteConfig.avatarPath}
              alt={siteConfig.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            {/* Dark overlay for contrast with floating badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        }
        secondContent={
          <div className="absolute inset-0 w-full h-full flex items-stretch">
            <CodeEditorPanel />
          </div>
        }
        gridSize={7}
        pixelColor="rgba(var(--accent-primary-rgb), 0.8)"
        animationStepDuration={0.5}
        className="cursor-target w-full rounded-xl border border-accent-primary/20
                   shadow-[0_0_32px_rgba(var(--accent-primary-rgb),0.10),0_0_80px_rgba(var(--accent-primary-rgb),0.05)]"
        aspectRatio="120%"
      />

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="mt-3 text-center text-[10px] font-mono text-accent-primary/40
                   tracking-widest uppercase animate-pulse"
      >
        {isTouchDevice ? t("tapHint") : t("hoverHint")}
      </motion.p>
    </motion.div>
  );
}
