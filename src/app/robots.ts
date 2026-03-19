import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// ─── Robots ───────────────────────────────────────────────────────────────────
// Auto-generated robots.txt for Next.js. Accessible at /robots.txt
// ─────────────────────────────────────────────────────────────────────────────

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
