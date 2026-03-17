"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import GlitchText from "@/components/reactbits/GlitchText";
import CountUp from "@/components/reactbits/CountUp";
import BlurText from "@/components/reactbits/BlurText";

// FaultyTerminal uses WebGL — load only on client with no SSR
const FaultyTerminal = dynamic(
  () => import("@/components/reactbits/FaultyTerminal"),
  { ssr: false }
);

// ─── Types ─────────────────────────────────────────────────────────────────────
interface HeroTranslations {
  greeting: string;
  name: string;
  description: string;
  viewProjects: string;
  availableBadge: string;
  contact: string;
}

interface TerminalTranslations {
  title: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  line5: string;
  line6: string;
  line7: string;
}

interface HeroSectionProps {
  hero: HeroTranslations;
  terminal: TerminalTranslations;
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const ROLES = ["Full-Stack Developer", "Cloud Architect", "UI Engineer"];

const STATS = [
  { label: "Years of exp.", value: 3, suffix: "+" },
  { label: "Projects shipped", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

// ─── Fade-in wrapper ───────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Typewriter role display ───────────────────────────────────────────────────
function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const fullLength = currentRole.length;

    if (!isDeleting && displayed.length < fullLength) {
      // Typing
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length + 1));
      }, 70);
    } else if (!isDeleting && displayed.length === fullLength) {
      // Pause then start deleting
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeoutRef.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, displayed.length - 1));
      }, 40);
    } else if (isDeleting && displayed.length === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, roleIndex]);

  return (
    <div className="flex items-center gap-2 font-mono text-xl md:text-2xl text-cyan-400">
      <span className="text-cyan-600 select-none">&gt;&nbsp;</span>
      <span>{displayed}</span>
      <span className="inline-block w-0.5 h-6 bg-cyan-400 animate-blink-cursor" />
    </div>
  );
}

// ─── Terminal Window (right panel overlay) ────────────────────────────────────
function TerminalWindow({ terminal }: { terminal: TerminalTranslations }) {
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = [
    { text: terminal.line1, color: "text-cyan-300" },
    { text: terminal.line2, color: "text-zinc-400" },
    { text: terminal.line3, color: "text-green-400" },
    { text: terminal.line4, color: "text-zinc-400" },
    { text: terminal.line5, color: "text-zinc-400" },
    { text: terminal.line6, color: "text-emerald-400" },
    { text: terminal.line7, color: "text-cyan-400" },
  ];

  useEffect(() => {
    if (visibleLines >= lines.length) return;
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 400 + visibleLines * 120);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleLines]);

  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        className="w-full max-w-sm md:max-w-md rounded-xl overflow-hidden border border-cyan-500/25 shadow-[0_0_40px_rgba(0,255,255,0.12)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,12,20,0.9) 0%, rgba(0,20,30,0.85) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/15 bg-black/30">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs font-mono text-cyan-400/70 tracking-widest uppercase">
            {terminal.title}
          </span>
          {/* Blinking status dot */}
          <span className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        {/* Terminal body */}
        <div className="p-4 md:p-5 font-mono text-xs md:text-sm space-y-1.5 min-h-[180px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={line.color}
            >
              {line.text}
            </motion.div>
          ))}
          {/* Blinking cursor after last line */}
          {visibleLines < lines.length && (
            <span className="inline-block w-2 h-4 bg-cyan-400 animate-blink-cursor opacity-80" />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection({ hero, terminal }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-3.5rem)] flex items-center overflow-hidden"
    >
      {/* ── Ambient background glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0,255,255,0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(120,80,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Grid / scanline texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,255,255,1) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(0,255,255,1) 25px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ══════════════════ LEFT COLUMN ══════════════════ */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Available badge */}
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {hero.availableBadge}
              </div>
            </FadeUp>

            {/* Greeting */}
            <FadeUp delay={0.2}>
              <p className="font-mono text-lg text-zinc-400">
                <span className="text-cyan-500">//</span>&nbsp;{hero.greeting}
              </p>
            </FadeUp>

            {/* Name with glitch effect */}
            <FadeUp delay={0.3}>
              <div className="relative">
                <GlitchText
                  speed={0.4}
                  enableShadows
                  enableOnHover={false}
                  className="!text-[clamp(2.8rem,8vw,5.5rem)] !font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
                >
                  {hero.name}
                </GlitchText>
              </div>
            </FadeUp>

            {/* Typewriter role */}
            <FadeUp delay={0.45}>
              <TypewriterRole />
            </FadeUp>

            {/* Description */}
            <FadeUp delay={0.55} className="max-w-lg">
              <BlurText
                text={hero.description}
                delay={60}
                animateBy="words"
                direction="bottom"
                className="text-base md:text-lg text-zinc-400 leading-relaxed"
              />
            </FadeUp>

            {/* CTA Buttons */}
            <FadeUp delay={0.7}>
              <div className="flex flex-wrap gap-3 pt-1">
                {/* Primary CTA */}
                <Link
                  href="#projects"
                  className="cursor-target group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-widest text-black bg-cyan-400 overflow-hidden transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_24px_rgba(0,255,255,0.5)] active:scale-95"
                >
                  <span className="relative z-10">{hero.viewProjects}</span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="#contact"
                  className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-widest text-cyan-400 border border-cyan-500/40 bg-cyan-500/5 transition-all duration-300 hover:border-cyan-400/70 hover:bg-cyan-500/10 hover:shadow-[0_0_16px_rgba(0,255,255,0.15)] active:scale-95"
                >
                  {hero.contact}
                </Link>
              </div>
            </FadeUp>

            {/* Stats row */}
            <FadeUp delay={0.85}>
              <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <div className="text-2xl md:text-3xl font-black font-mono text-white">
                      <CountUp
                        to={stat.value}
                        from={0}
                        duration={1.8}
                        delay={1}
                        className="tabular-nums"
                      />
                      <span className="text-cyan-400">{stat.suffix}</span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* ══════════════════ RIGHT COLUMN (WebGL + Terminal overlay) ══════════════════ */}
          <div className="cursor-target relative order-1 lg:order-2 h-[340px] md:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden border border-cyan-500/10">
            {/* FaultyTerminal WebGL canvas — fills the panel */}
            <FaultyTerminal
              className="absolute inset-0 w-full h-full"
              tint="#00e8ff"
              timeScale={0.18}
              scanlineIntensity={0.25}
              glitchAmount={1.2}
              flickerAmount={0.6}
              chromaticAberration={1.5}
              curvature={0.15}
              brightness={0.85}
              mouseReact
              mouseStrength={0.15}
              pageLoadAnimation
              dpr={Math.min(
                typeof window !== "undefined" ? window.devicePixelRatio : 1,
                2
              )}
            />

            {/* Dark overlay so terminal window is readable */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#000c14]/50 to-black/40"
            />

            {/* Corner accent lines — purely decorative */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/60 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/60 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/60 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/60 rounded-br-2xl" />
            </div>

            {/* Glassmorphic terminal window */}
            <TerminalWindow terminal={terminal} />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">
          SCROLL
        </span>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-cyan-500/60 to-transparent rounded-full"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
