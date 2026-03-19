import { useTranslations } from "next-intl";
import Link from "next/link";

// ─── Custom 404 Page ─────────────────────────────────────────────────────────
// Terminal / Cyberpunk aesthetic — matches the portfolio theme.
// Accessible at any unmatched route within the locale segment.
// ─────────────────────────────────────────────────────────────────────────────

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-8 text-center"
      aria-labelledby="not-found-heading"
    >
      {/* Glitchy error code */}
      <div className="font-mono text-8xl font-bold text-accent-primary opacity-20 select-none mb-4 md:text-[10rem]">
        {t("errorCode")}
      </div>

      {/* Status headline */}
      <h1
        id="not-found-heading"
        className="font-mono text-2xl font-bold tracking-widest text-accent-primary uppercase mb-6 md:text-3xl"
      >
        {t("headline")}
      </h1>

      {/* Terminal block */}
      <div className="w-full max-w-lg mb-8 rounded-lg border border-border bg-background/80 p-4 text-left font-mono text-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-foreground/40 text-xs">terminal</span>
        </div>
        <p className="text-accent-primary">{t("terminal")}</p>
        <p className="mt-1 text-destructive/80">{t("terminalResult")}</p>
        <p className="mt-3 text-foreground/60 text-xs">
          <span className="text-accent-primary">▊</span>
        </p>
      </div>

      {/* Human-readable message */}
      <p className="mb-8 max-w-md text-foreground/60 text-sm leading-relaxed">
        {t("message")}
      </p>

      {/* CTA */}
      <Link
        href="/"
        aria-label={t("ariaReturn")}
        className="inline-flex items-center gap-2 rounded border border-accent-primary px-6 py-3 font-mono text-sm font-semibold text-accent-primary transition-all duration-200 hover:bg-accent-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span aria-hidden="true">→</span>
        {t("returnBtn")}
      </Link>
    </main>
  );
}
