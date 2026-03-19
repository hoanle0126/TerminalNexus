import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// ─── Sitemap ──────────────────────────────────────────────────────────────────
// Auto-generated sitemap for Next.js. Accessible at /sitemap.xml
// Includes all locale variants for SEO hreflang support.
// ─────────────────────────────────────────────────────────────────────────────

const locales = ["en", "vi"] as const;
const baseUrl = siteConfig.domain;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Root locale pages
  const localePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
  }));

  return [...localePages];
}
