"use client";

import { useEffect } from "react";
import {
  themeConfig,
  ACCENT_PRESETS,
  RADIUS_VALUES,
  SPEED_MULTIPLIERS,
} from "@/config/theme";

/**
 * ThemeProvider — injects theme CSS variables into :root based on the
 * active configuration defined in `src/config/theme.ts`.
 *
 * Handles: accent color, border radius, animation speed, and color mode.
 *
 * Must be placed in layout.tsx so it runs once on mount.
 */
export default function ThemeProvider() {
  useEffect(() => {
    const root = document.documentElement;

    // ── Accent Color ────────────────────────────────────────────────────────
    const preset = ACCENT_PRESETS[themeConfig.accent];
    if (preset) {
      root.style.setProperty("--accent-primary", preset.primary);
      root.style.setProperty("--accent-primary-rgb", preset.primaryRgb);
    }

    // ── Border Radius ───────────────────────────────────────────────────────
    const radius = RADIUS_VALUES[themeConfig.borderRadius];
    if (radius) {
      root.style.setProperty("--radius", radius);
    }

    // ── Animation Speed ─────────────────────────────────────────────────────
    const speed = SPEED_MULTIPLIERS[themeConfig.animationSpeed];
    if (speed !== undefined) {
      root.style.setProperty("--animation-speed", String(speed));
    }

    // ── Color Mode ──────────────────────────────────────────────────────────
    const applyMode = (dark: boolean) => {
      root.classList.toggle("dark", dark);
    };

    if (themeConfig.colorMode === "dark") {
      applyMode(true);
    } else if (themeConfig.colorMode === "light") {
      applyMode(false);
    } else {
      // "system" — follow OS preference
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      applyMode(mq.matches);

      const handler = (e: MediaQueryListEvent) => applyMode(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  return null;
}
