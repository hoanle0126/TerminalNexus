// ─── Experience Section Skeleton ──────────────────────────────────────────────
// Shown while ExperienceSection lazy loads. Timeline card style.
// ─────────────────────────────────────────────────────────────────────────────

export default function ExperienceSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="px-8 py-24 animate-pulse"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-16 space-y-3">
          <div className="h-4 w-24 rounded bg-accent-primary/15 mx-auto" />
          <div className="h-8 w-64 rounded bg-foreground/10 mx-auto" />
        </div>

        {/* Timeline card */}
        <div className="relative mx-auto max-w-3xl rounded-xl border border-border bg-foreground/5 p-8">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="h-6 w-52 rounded bg-foreground/10" />
              <div className="h-4 w-36 rounded bg-accent-primary/10" />
            </div>
            <div className="h-5 w-28 rounded bg-foreground/8" />
          </div>
          {/* Body */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-foreground/8" />
            <div className="h-4 w-5/6 rounded bg-foreground/8" />
            <div className="h-4 w-4/6 rounded bg-foreground/8" />
          </div>
          {/* Tags */}
          <div className="mt-6 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-16 rounded-full bg-accent-primary/10" />
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="h-10 w-28 rounded border border-border bg-foreground/5" />
          <div className="h-10 w-28 rounded border border-border bg-foreground/5" />
        </div>
      </div>
    </section>
  );
}
