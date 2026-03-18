// ─── Theme Configuration ─────────────────────────────────────────────────────
// Template buyers: change values below to customise the entire site.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Accent Color Presets ─────────────────────────────────────────────────────
export type AccentPreset = "cyan" | "purple" | "green" | "rose" | "amber";

export interface AccentColors {
  /** Main accent hex — used for text, borders, CTA buttons */
  primary: string;
  /** RGB triplet — used for rgba() opacity variants */
  primaryRgb: string;
  /** Tailwind shade name for code-editor tokens (e.g. "cyan" → text-cyan-300) */
  tailwindName: string;
}

export const ACCENT_PRESETS: Record<AccentPreset, AccentColors> = {
  cyan: {
    primary: "#22d3ee",
    primaryRgb: "34,211,238",
    tailwindName: "cyan",
  },
  purple: {
    primary: "#a78bfa",
    primaryRgb: "167,139,250",
    tailwindName: "purple",
  },
  green: {
    primary: "#4ade80",
    primaryRgb: "74,222,128",
    tailwindName: "green",
  },
  rose: {
    primary: "#fb7185",
    primaryRgb: "251,113,133",
    tailwindName: "rose",
  },
  amber: {
    primary: "#fbbf24",
    primaryRgb: "251,191,36",
    tailwindName: "amber",
  },
};

// ─── Border Radius Presets ────────────────────────────────────────────────────
export type RadiusPreset = "sharp" | "rounded" | "pill";

export const RADIUS_VALUES: Record<RadiusPreset, string> = {
  sharp: "0.2rem",
  rounded: "0.625rem",
  pill: "9999px",
};

// ─── Animation Speed Presets ──────────────────────────────────────────────────
export type AnimationSpeed = "fast" | "normal" | "slow";

/** Multiplier applied to all transition/animation durations */
export const SPEED_MULTIPLIERS: Record<AnimationSpeed, number> = {
  fast: 0.6,
  normal: 1,
  slow: 1.6,
};

// ─── Cursor Style ─────────────────────────────────────────────────────────────
export type CursorStyle = "target" | "dot" | "default";

// ─── Color Mode ───────────────────────────────────────────────────────────────
export type ColorMode = "dark" | "light" | "system";

// ─── Active Theme Config ──────────────────────────────────────────────────────
// Change these values to customise the entire site in one place.
// ─────────────────────────────────────────────────────────────────────────────

export const themeConfig = {
  /** Accent color — "cyan" | "purple" | "green" | "rose" | "amber" */
  accent: "cyan" as AccentPreset,

  /** Border radius — "sharp" | "rounded" | "pill" */
  borderRadius: "rounded" as RadiusPreset,

  /** Animation speed — "fast" | "normal" | "slow" */
  animationSpeed: "normal" as AnimationSpeed,

  /** Custom cursor — "target" (crosshair) | "dot" (simple follower) | "default" (native) */
  cursorStyle: "target" as CursorStyle,

  /** Color mode — "dark" | "light" | "system" (follows OS preference) */
  colorMode: "dark" as ColorMode,
};
