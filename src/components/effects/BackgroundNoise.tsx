"use client";

import dec from "./decorative.module.css";

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
        className={`absolute inset-0 opacity-[0.03] ${dec.scanlines}`}
      />

      {/* Film grain layer */}
      <div
        className={`absolute inset-0 opacity-[0.04] ${dec.grain}`}
      />
    </div>
  );
}
