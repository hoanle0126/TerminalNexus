"use client";

import styles from "./BackgroundNoise.module.css";

/**
 * Full-viewport fixed overlay with subtle scanlines + animated film grain.
 * Retro CRT aesthetic — very low opacity, pointer-events-none.
 *
 * Scanlines: repeating-linear-gradient (horizontal lines every 4px)
 * Film grain: SVG feTurbulence noise shifted by CSS keyframes (GPU-accelerated)
 */
export function BackgroundNoise() {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
    >
      {/* Scanlines layer */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          )`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Film grain layer */}
      <div
        className={`absolute inset-0 opacity-[0.04] ${styles.grain}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
