// ─── Site Configuration ──────────────────────────────────────────────────────
// This is the SINGLE SOURCE OF TRUTH for your personal identity.
// Template buyers: edit ONLY this file to personalize the entire portfolio.
// ─────────────────────────────────────────────────────────────────────────────

export interface SocialLink {
  /** Translation key used in contact/footer, e.g. "socialGithub" */
  key: string;
  /** Full URL or mailto: link */
  href: string;
  /**
   * Lucide icon name — must match an import in the component.
   * Supported: "Github" | "Linkedin" | "Dribbble" | "Mail"
   * For icons not in Lucide, leave empty and set `iconUrl` instead.
   */
  icon?: string;
  /** URL to an external SVG icon (e.g. SimpleIcons CDN for Behance) */
  iconUrl?: string;
}

export interface AnalyticsConfig {
  /**
   * Google Analytics 4 Measurement ID (e.g. "G-XXXXXXXXXX").
   * Leave empty to disable GA4.
   */
  ga4Id: string;
  /**
   * Plausible Analytics domain (e.g. "yourdomain.com").
   * Leave empty to disable Plausible.
   */
  plausibleDomain: string;
}

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  /** Full name — used in SEO, meta tags, OG, copyright */
  name: "Lê Văn Xuân Hoàn",
  /** Uppercase display — shown in Navbar & Footer logo */
  displayName: "LE HOAN",
  /** Center node in skills graph (supports \n for line break) */
  shortName: "LÊ\nHOÀN",
  /** Code editor tab label (e.g. "le-hoan.ts") */
  editorTabName: "le-hoan.ts",
  /** Code editor variable name (e.g. "leHoan") */
  editorVarName: "leHoan",
  /** Hero section avatar / profile photo */
  avatarPath: "/avatar.png",

  /** Professional title — used in JSON-LD Person schema */
  jobTitle: "Full-Stack Developer",
  /** Employment company name — used in JSON-LD Person schema */
  worksFor: "",

  // ── Domain & SEO ──────────────────────────────────────────────────────────
  /** Production domain — used for canonical URLs, OG, sitemap */
  domain: "https://hoanle.dev",
  /** OG site name */
  ogSiteName: "Lê Văn Xuân Hoàn — Portfolio",
  /** Twitter/X handle for meta tags */
  twitterHandle: "@hoanle",

  // ── Social Links ──────────────────────────────────────────────────────────
  // Used in ContactSection & Footer. Add/remove as needed.
  socials: [
    {
      key: "socialGithub",
      href: "https://github.com/hoanle0126",
      icon: "Github",
    },
    {
      key: "socialLinkedin",
      href: "https://linkedin.com/in/hoanle",
      icon: "Linkedin",
    },
    {
      key: "socialDribbble",
      href: "https://dribbble.com/hoanle",
      icon: "Dribbble",
    },
    {
      key: "socialBehance",
      href: "https://behance.net/hoanle",
      iconUrl: "https://cdn.simpleicons.org/behance/ffffff",
    },
    {
      key: "socialEmail",
      href: "mailto:hoanle@example.com",
      icon: "Mail",
    },
  ] satisfies SocialLink[],

  // ── Analytics (optional) ──────────────────────────────────────────────────
  // Leave values empty ("") to disable the corresponding provider.
  analytics: {
    /** Google Analytics 4 Measurement ID (e.g. "G-XXXXXXXXXX") */
    ga4Id: "",
    /** Plausible Analytics domain (e.g. "yourdomain.com") */
    plausibleDomain: "",
  } satisfies AnalyticsConfig,
} as const;

export type SiteConfig = typeof siteConfig;
