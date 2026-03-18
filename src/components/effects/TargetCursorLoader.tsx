"use client";

import dynamic from "next/dynamic";
import { themeConfig } from "@/config/theme";

// Dynamic imports with ssr: false — only load the cursor variant in use
const TargetCursor = dynamic(
  () =>
    import("@/components/effects/TargetCursor").then((m) => ({
      default: m.TargetCursor,
    })),
  { ssr: false }
);

const DotCursor = dynamic(
  () =>
    import("@/components/effects/DotCursor").then((m) => ({
      default: m.DotCursor,
    })),
  { ssr: false }
);

/**
 * Renders the cursor variant selected in `themeConfig.cursorStyle`.
 * - "target" → crosshair snap cursor (default)
 * - "dot"    → minimal spring-following dot
 * - "default" → native cursor (nothing rendered)
 */
export function TargetCursorLoader() {
  if (themeConfig.cursorStyle === "dot") {
    return <DotCursor />;
  }

  if (themeConfig.cursorStyle === "target") {
    return <TargetCursor targetSelector=".cursor-target" />;
  }

  // "default" — use native cursor, render nothing
  return null;
}
