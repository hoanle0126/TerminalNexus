// ─── Skills Section Skeleton ──────────────────────────────────────────────────
// Shown while SkillsSection (Three.js graph) lazy loads.
// ─────────────────────────────────────────────────────────────────────────────

export default function SkillsSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="px-8 py-24 animate-pulse"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-16 space-y-3 text-center">
          <div className="h-8 w-72 rounded bg-foreground/10 mx-auto" />
          <div className="h-4 w-56 rounded bg-foreground/8 mx-auto" />
        </div>

        {/* Graph area */}
        <div className="relative mx-auto h-[500px] w-full max-w-3xl rounded-xl border border-border bg-foreground/5 flex items-center justify-center">
          {/* Center node */}
          <div className="h-20 w-20 rounded-full bg-accent-primary/20 ring-2 ring-accent-primary/30" />

          {/* Surrounding nodes — decorative */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const r = 160;
            const x = 50 + (r / 5) * Math.cos(angle);
            const y = 50 + (r / 5) * Math.sin(angle);
            return (
              <div
                key={i}
                className="absolute h-10 w-10 rounded-full bg-foreground/10 ring-1 ring-border"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
