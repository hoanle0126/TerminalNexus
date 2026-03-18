import type { Variants } from "motion/react";

/* ───────────────────────────────────────────────────────────────────────────
 * MOTION — Shared animation tokens (Rule 14)
 *
 * Import these in any component instead of writing inline variants.
 * Example:  import { MOTION } from "@/lib/motion";
 *           <motion.div variants={MOTION.fadeInUp} initial="hidden" animate="visible">
 *
 * For whileInView usage, spread the .hidden/.visible keys directly:
 *   initial={MOTION.fadeInUp.hidden}
 *   whileInView={MOTION.fadeInUp.visible}
 * ─────────────────────────────────────────────────────────────────────────── */

export const MOTION = {
  /* ── Fade variants ─────────────────────────────────────────────────────── */

  /** Fade-in + slide up (y: 20) — sections, cards, headings */
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  } satisfies Variants,

  /** Fade-in + slide up small (y: 12) — subtitles, legends, form success */
  fadeInUpSmall: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  } satisfies Variants,

  /** Fade-in + slide down (y: -16) — section headings that drop in */
  fadeInDown: {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  } satisfies Variants,

  /** Simple fade — overlays, backgrounds */
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  } satisfies Variants,

  /* ── Slide variants ────────────────────────────────────────────────────── */

  /** Slide-in from left (x: -14) — mobile menu items, timeline */
  slideInLeft: {
    hidden: { opacity: 0, x: -14 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.18, ease: "easeOut" } },
  } satisfies Variants,

  /** Slide-in small from left (x: -8) — terminal lines */
  slideInSmallLeft: {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  } satisfies Variants,

  /* ── Scale / blur variants ─────────────────────────────────────────────── */

  /** Scale-up from smaller — code editor, hero panels */
  scaleUp: {
    hidden: { opacity: 0, scale: 0.93, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  } satisfies Variants,

  /** Slide-in from bottom with blur — project cards */
  blurUp: {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  } satisfies Variants,

  /* ── Enter/exit variants (for AnimatePresence) ─────────────────────────── */

  /** Pop up/down — scroll-to-top button, FABs */
  popUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },

  /** Drop-in from top — mobile navigation panels */
  dropIn: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2, ease: "easeOut" },
  },

  /** Icon swap rotate — hamburger ↔ close */
  iconSwap: (direction: 1 | -1 = 1) => ({
    initial: { rotate: direction * 90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: direction * -90, opacity: 0 },
    transition: { duration: 0.15 },
  }),

  /* ── Looping / interaction variants ────────────────────────────────────── */

  /** Infinite bounce — scroll-hint arrows */
  bounce: {
    animate: { y: [0, 4, 0] as number[] },
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" as const },
  },

  /** Tap shrink — submit buttons */
  tapShrink: { whileTap: { scale: 0.97 } },

  /* ── Container variants ────────────────────────────────────────────────── */

  /** Stagger container — wrap children that have their own variants */
  stagger: (staggerMs = 0.12): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerMs },
    },
  }),
} as const;
