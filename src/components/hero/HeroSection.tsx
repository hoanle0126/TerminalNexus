"use client";

import { motion } from "motion/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MOTION } from "@/lib/motion";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";
import { HeroStats } from "@/components/hero/HeroStats";
import GlitchText from "@/components/reactbits/GlitchText";
import BlurText from "@/components/reactbits/BlurText";
import FloatingBadges from "@/components/hero/FloatingBadges";
import { FadeUp } from "@/components/hero/FadeUp";
import { TypewriterRole } from "@/components/hero/TypewriterRole";
import { ArrowRight } from "lucide-react";

// HeroProfileCard uses PixelTransition (GSAP + window) — no SSR
const HeroProfileCard = dynamic(
  () => import("@/components/hero/HeroProfileCard"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[420px] aspect-[5/6] rounded-xl border border-accent-primary/20 bg-surface-card animate-pulse" />
    ),
  }
);

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

interface HeroSectionProps {
  hero: HeroTranslations;
  terminal?: Record<string, string>;
}


// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection({ hero }: HeroSectionProps) {
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
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(var(--accent-primary-rgb),0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(120,80,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Grid / scanline texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(var(--accent-primary-rgb),1) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(var(--accent-primary-rgb),1) 25px)",
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
                <span className="text-accent-primary">//</span>&nbsp;{hero.greeting}
              </p>
            </FadeUp>

            {/* Name with glitch effect */}
            <FadeUp delay={0.3}>
              <div className="relative">
                <GlitchText
                  speed={0.4}
                  enableShadows
                  enableOnHover={false}
                  className="!text-[clamp(2.8rem,8vw,5.5rem)] !font-black bg-gradient-to-r from-white via-accent-primary/60 to-accent-primary bg-clip-text text-transparent"
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
                <Link
                  href="#projects"
                  className="cursor-target group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-widest text-black bg-accent-primary overflow-hidden transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_24px_rgba(var(--accent-primary-rgb),0.5)] active:scale-95"
                >
                  <span className="relative z-10">{hero.viewProjects}</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>

                <Link
                  href="#contact"
                  className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-widest text-accent-primary border border-accent-primary/40 bg-accent-primary/5 transition-all duration-300 hover:border-accent-primary/70 hover:bg-accent-primary/10 hover:shadow-[0_0_16px_rgba(var(--accent-primary-rgb),0.15)] active:scale-95"
                >
                  {hero.contact}
                </Link>
              </div>
            </FadeUp>

            {/* Stats row */}
            <FadeUp delay={0.85}>
              <HeroStats />
            </FadeUp>
          </div>

          {/* ══════════════════ RIGHT COLUMN ══════════════════ */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center
                          h-[360px] md:h-[480px] lg:h-[560px] px-8 md:px-12">

            {/* FaultyTerminal — ambient backdrop */}
            <div className="pointer-events-none absolute inset-0 opacity-15 rounded-2xl overflow-hidden">
              <FaultyTerminal
                className="absolute inset-0 w-full h-full"
                tint="#00e8ff"
                timeScale={0.12}
                scanlineIntensity={0.15}
                glitchAmount={0.6}
                flickerAmount={0.3}
                chromaticAberration={0.8}
                curvature={0.08}
                brightness={0.6}
                mouseReact={false}
                dpr={Math.min(
                  typeof window !== "undefined" ? window.devicePixelRatio : 1,
                  2
                )}
              />
            </div>

            {/* Profile Card (Pixel Transition) + Floating badges */}
            <div className="relative w-full flex items-center justify-center">
              <HeroProfileCard />
              <FloatingBadges />
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
