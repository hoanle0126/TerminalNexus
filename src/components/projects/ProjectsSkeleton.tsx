// ─── Projects Section Skeleton ────────────────────────────────────────────────
// Shown while ProjectsSection (bento grid + flip cards) lazy loads.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectsSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="px-8 py-24 animate-pulse"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16 space-y-3">
          <div className="h-4 w-32 rounded bg-accent-primary/15" />
          <div className="h-8 w-56 rounded bg-foreground/10" />
        </div>

        {/* Bento grid — 3 cards top row, 2 cards bottom row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl border border-border bg-foreground/5"
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-xl border border-border bg-foreground/5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
