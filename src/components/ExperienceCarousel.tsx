"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  useTransform,
  useSpring,
  useMotionValue,
  motion,
} from "motion/react";

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

interface ExperienceCarouselProps {
  title: string;
  subtitle: string;
  present: string;
  prevBtn: string;
  nextBtn: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const CARD_W   = 400;   // card width px
const CARD_H   = 500;   // card height px

// ── Diagonal spread constants — tweak these 4 to adjust the look ──────────────
// Gap between adjacent cards = SPREAD_X - CARD_W  (keep > 80px to avoid overlap)
const SPREAD_X = 620;   // px — horizontal separation per rel unit  (620 - 400 = 220px gap)
const SPREAD_Y = -90;   // px — vertical offset per rel unit (negative = right card is higher)
const TILT_Z   = -8;    // deg — Z-axis tilt (negative → left card tilts \, right card tilts /)
const DEPTH_Y  = 20;    // deg — Y-axis rotation for 3-D depth

// ─── Data ──────────────────────────────────────────────────────────────────────

const EXPERIENCE_DATA: ExperienceItem[] = [
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

const ACCENT_STYLES: Record<
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

// ─── DiagonalCard — scroll-driven diagonal spread card ────────────────────────

interface ScrollCardProps {
  item: ExperienceItem;
  cardIndex: number;
  /** spring-smoothed fractional active index (0 = first card, N-1 = last) */
  springIndex: ReturnType<typeof useSpring>;
  totalCards: number;
}

function ScrollCard({ item, cardIndex, springIndex }: ScrollCardProps) {
  const accent = ACCENT_STYLES[item.accentColor];

  // rel = signed distance from this card to the spring-animated active index
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
      {/* Card face */}
      <div
        className={`
          cursor-target
          w-full h-full rounded-2xl p-6 border relative overflow-hidden
          ${accent.border} ${accent.glow}
          bg-[#070c14]
        `}
      >
        {/* Inset glow overlay */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(0,255,255,0.03)]" />

        {/* Chapter watermark */}
        <span className="absolute top-3 right-4 text-[80px] leading-none font-bold text-white/[0.04] font-mono select-none pointer-events-none">
          {item.chapter}
        </span>

        {/* Chapter label + source */}
        <div className="mb-3 flex items-center gap-2 relative z-10">
          <span className={`font-mono text-[10px] tracking-widest uppercase ${accent.badgeText} opacity-70`}>
            Chapter {item.chapter}
          </span>
          <span className="flex-1 h-px bg-white/10" />
          <span className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${accent.badge}`}>
            {item.source}
          </span>
        </div>

        {/* Period */}
        <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${accent.badgeText} opacity-70 mb-1 relative z-10`}>
          {item.period}
        </p>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-0.5 relative z-10">{item.role}</h3>
        <p className="text-slate-400 text-sm mb-1 relative z-10">{item.company}</p>
        <p className="font-mono text-xs text-slate-500 mb-4 relative z-10">
          <span className="mr-1.5 text-slate-600">◈</span>
          {item.location}
        </p>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 relative z-10">
          {item.description}
        </p>

        {/* Highlight */}
        <div className={`mb-4 rounded-lg border px-3 py-2 ${accent.highlightBox} relative z-10`}>
          <p className={`font-mono text-xs ${accent.highlightText}`}>
            <span className="mr-2 opacity-60">&gt;</span>
            {item.highlight}
          </p>
        </div>

        {/* Stack */}
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

// ─── Progress Dots ─────────────────────────────────────────────────────────────

function ProgressDots({
  springIndex,
  total,
}: {
  springIndex: ReturnType<typeof useSpring>;
  total: number;
}) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const width   = useTransform(springIndex, (v) => (Math.round(v) === i ? 28 : 6));
        const opacity = useTransform(springIndex, (v) => (Math.round(v) === i ? 1 : 0.3));
        return (
          <motion.div
            key={i}
            className="h-1 rounded-full bg-cyan-400"
            style={{ width, opacity }}
          />
        );
      })}
    </div>
  );
}

// ─── Scroll Hint ───────────────────────────────────────────────────────────────

function ScrollHint({ springIndex }: { springIndex: ReturnType<typeof useSpring> }) {
  const opacity = useTransform(springIndex, [0, 0.3], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 font-mono text-xs flex flex-col items-center gap-1 pointer-events-none"
    >
      <span>scroll</span>
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        ↓
      </motion.span>
    </motion.div>
  );
}

// ─── Mobile Vertical Timeline ──────────────────────────────────────────────────

function MobileTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative ml-4 border-l border-cyan-500/25">
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          className="mb-10 ml-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-cyan-500 bg-[#040d1a]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </span>
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-cyan-400/70">
            {item.period}
          </p>
          <h3 className="text-base font-bold text-white">{item.role}</h3>
          <p className="mb-2 text-sm text-slate-400">
            {item.company} · {item.location}
          </p>
          <p className="mb-3 text-sm leading-relaxed text-slate-500">{item.description}</p>
          <div className="mb-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2">
            <p className="font-mono text-xs text-cyan-300">
              <span className="mr-2 text-cyan-400">{">"}</span>
              {item.highlight}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

// ─── Snap threshold: minimum wheel delta to trigger a card advance ─────────────
const WHEEL_THRESHOLD = 30; // px

export default function ExperienceCarousel({ title, subtitle }: ExperienceCarouselProps) {
  const N = EXPERIENCE_DATA.length;
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── Discrete active index ─────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Spring-smoothed fractional index drives all card transforms ───────────
  const rawIndex = useMotionValue(0);
  const springIndex = useSpring(rawIndex, { stiffness: 280, damping: 32, mass: 0.8 });

  // Keep rawIndex in sync with activeIndex
  useEffect(() => { rawIndex.set(activeIndex); }, [activeIndex, rawIndex]);

  // ── Intersection observer: track whether section is in viewport ───────────
  const isInView = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isInView.current = entry.isIntersecting; },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Wheel handler ─────────────────────────────────────────────────────────
  const cooldownRef = useRef(false);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!isInView.current) return;
      const delta = e.deltaY;

      // Scrolling DOWN
      if (delta > WHEEL_THRESHOLD) {
        if (activeIndex < N - 1) {
          e.preventDefault();
          if (!cooldownRef.current) {
            cooldownRef.current = true;
            setActiveIndex((i) => Math.min(i + 1, N - 1));
            setTimeout(() => { cooldownRef.current = false; }, 700);
          }
        }
        // At last card → let page scroll naturally (no preventDefault)
        return;
      }

      // Scrolling UP
      if (delta < -WHEEL_THRESHOLD) {
        if (activeIndex > 0) {
          e.preventDefault();
          if (!cooldownRef.current) {
            cooldownRef.current = true;
            setActiveIndex((i) => Math.max(i - 1, 0));
            setTimeout(() => { cooldownRef.current = false; }, 700);
          }
        }
        // At first card → let page scroll up naturally
        return;
      }
    },
    [activeIndex, N]
  );

  // Attach wheel listener to the section (non-passive so we can preventDefault)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  return (
    <>
      {/* ── DESKTOP: Wheel-snap carousel ─────────────────────────────────────── */}
      <div
        ref={sectionRef}
        id="experience"
        className="relative hidden md:block h-screen"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[#040d1a]">

          {/* Decorative grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 45% at 50% 55%, rgba(0,255,255,0.05) 0%, rgba(168,85,247,0.02) 40%, transparent 70%)",
            }}
          />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center">

            {/* Section heading */}
            <div className="text-center mb-10">
              <p className="font-mono text-sm tracking-widest text-cyan-400/60 mb-2">
                {"// 02. EXPERIENCE"}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-3 font-mono text-sm text-gray-500">{subtitle}</p>
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

      {/* ── MOBILE: Vertical Timeline ────────────────────────────────────────── */}
      <section
        id="experience-mobile"
        className="relative md:hidden w-full overflow-hidden bg-[#040d1a] py-24"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-cyan-400/60">
              {"// 02. EXPERIENCE"}
            </p>
            <h2 className="text-3xl font-bold font-mono tracking-tight text-white">
              {title}
            </h2>
            <p className="mt-3 font-mono text-sm text-gray-500">{subtitle}</p>
            <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <MobileTimeline items={EXPERIENCE_DATA} />
        </div>
      </section>
    </>
  );
}
