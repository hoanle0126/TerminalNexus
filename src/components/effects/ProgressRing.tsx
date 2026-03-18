/**
 * ProgressRing — Circular SVG progress indicator.
 * Extracted from ScrollToTop to comply with Rule 5 (no inline SVG).
 */

interface ProgressRingProps {
  /** 0-1 progress value */
  progress: number;
  /** Pixel size of the ring (width & height) */
  size?: number;
  /** Stroke width in px */
  strokeWidth?: number;
}

export function ProgressRing({
  progress,
  size = 48,
  strokeWidth = 2,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 -rotate-90"
      aria-hidden
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--accent-primary)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-[stroke-dashoffset] duration-150"
      />
    </svg>
  );
}
