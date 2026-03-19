// ─── Hero Section Skeleton ────────────────────────────────────────────────────
// Shown while HeroSection is loading. Cyberpunk palette + animate-pulse.
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="flex min-h-screen items-center px-8 py-16"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col justify-center gap-6 animate-pulse">
          {/* Badge */}
          <div className="h-6 w-40 rounded-full bg-accent-primary/10" />
          {/* Name lines */}
          <div className="space-y-3">
            <div className="h-8 w-48 rounded bg-foreground/10" />
            <div className="h-16 w-80 rounded bg-foreground/10" />
          </div>
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-foreground/8" />
            <div className="h-4 w-3/4 rounded bg-foreground/8" />
          </div>
          {/* Stats row */}
          <div className="flex gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-8 w-16 rounded bg-accent-primary/10" />
                <div className="h-3 w-20 rounded bg-foreground/8" />
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex gap-4">
            <div className="h-12 w-40 rounded border border-border bg-foreground/5" />
            <div className="h-12 w-32 rounded border border-border bg-foreground/5" />
          </div>
        </div>

        {/* Right column — code editor placeholder */}
        <div className="animate-pulse">
          <div className="h-96 w-full rounded-lg border border-border bg-foreground/5" />
        </div>
      </div>
    </section>
  );
}
