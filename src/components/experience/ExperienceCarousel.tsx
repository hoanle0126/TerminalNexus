"use client";

import { useRef } from "react";
import { useTransform, useSpring, useScroll } from "motion/react";
import dec from "@/components/effects/decorative.module.css";

import { CARD_H, EXPERIENCE_DATA } from "./experienceData";
import type { ExperienceCarouselProps } from "./experienceData";
import { ScrollCard } from "./ScrollCard";
import { ProgressDots, ScrollHint } from "./ProgressDots";
import { MobileTimeline } from "./MobileTimeline";

// ─── Main Export ───────────────────────────────────────────────────────────────

export default function ExperienceCarousel({ title, subtitle }: ExperienceCarouselProps) {
  const N = EXPERIENCE_DATA.length;
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scroll-driven: track scroll progress within the tall container ──────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map [0, 1] → [0, N-1] with spring smoothing
  const rawIndex   = useTransform(scrollYProgress, [0, 1], [0, N - 1]);
  const springIndex = useSpring(rawIndex, { stiffness: 180, damping: 28, mass: 0.6 });

  return (
    <>
      {/* ── DESKTOP: Scroll-sticky carousel ──────────────────────────────────── */}
      <div
        ref={containerRef}
        id="about"
        // Each card gets one full viewport of scroll travel
        style={{ height: `${N * 100}vh` }}
        className="relative hidden md:block"
      >
        {/* Sticky viewport that stays fixed while scrolling through the container */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-surface-deep">

          {/* Decorative grid */}
          <div className={`pointer-events-none absolute inset-0 opacity-[0.03] ${dec.gridCyan}`} />

          {/* Ambient glow */}
          <div className={`pointer-events-none absolute inset-0 ${dec.glowExperience}`} />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center pt-20">

            {/* Section heading */}
            <div className="text-center mb-4">
              <p className="font-mono text-sm tracking-widest text-cyan-400/80 mb-2">
                {"// 02. EXPERIENCE"}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-3 font-mono text-sm text-gray-400">{subtitle}</p>
              <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </div>

            {/* Diagonal spread stage */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "100%",
                height: `${CARD_H + 220}px`,
                perspective: "1200px",
                perspectiveOrigin: "50% 50%",
              }}
            >
              {EXPERIENCE_DATA.map((card, i) => (
                <ScrollCard
                  key={card.id}
                  item={card}
                  cardIndex={i}
                  springIndex={springIndex}
                  totalCards={N}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div className="mt-8">
              <ProgressDots springIndex={springIndex} total={N} />
            </div>
          </div>

          {/* Scroll hint */}
          <ScrollHint springIndex={springIndex} />
        </div>
      </div>

      {/* ── MOBILE: Vertical Timeline ─────────────────────────────────────────── */}
      <section
        id="experience-mobile"
        className="relative md:hidden w-full overflow-hidden bg-surface-deep py-24"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-cyan-400/80">
              {"// 02. EXPERIENCE"}
            </p>
            <h2 className="text-3xl font-bold font-mono tracking-tight text-white">
              {title}
            </h2>
            <p className="mt-3 font-mono text-sm text-gray-400">{subtitle}</p>
            <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <MobileTimeline items={EXPERIENCE_DATA} />
        </div>
      </section>
    </>
  );
}
