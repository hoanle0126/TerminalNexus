// ─── Demo Data Configuration ─────────────────────────────────────────────────
// This file contains fictional data for the live demo site.
// Deploy with NEXT_PUBLIC_DEMO_MODE=true to swap in this data.
//
// Demo persona: "Alex Chen" — Full-Stack / DevOps Engineer
// ─────────────────────────────────────────────────────────────────────────────

import type { HeroStat, CodeLine, TerminalLine } from "./hero";

// ── Site identity ─────────────────────────────────────────────────────────────

export const DEMO_SITE = {
  name:          "Alex Chen",
  displayName:   "ALEX CHEN",
  shortName:     "ALEX\nCHEN",
  editorTabName: "alex-chen.ts",
  editorVarName: "alexChen",
  avatarPath:    "/demo/avatar-demo.png",
  jobTitle:      "Full-Stack Developer",
  worksFor:      "Freelance",
  domain:        "https://terminalnexus-demo.vercel.app",
  ogSiteName:    "Alex Chen — Portfolio",
  twitterHandle: "@alexchen_dev",
  socials: [
    { key: "socialGithub",   href: "https://github.com",      icon: "Github"   },
    { key: "socialLinkedin", href: "https://linkedin.com",     icon: "Linkedin" },
    { key: "socialEmail",    href: "mailto:alex@example.com",  icon: "Mail"     },
  ],
  analytics: { ga4Id: "", plausibleDomain: "" },
};

// ── Hero stats ────────────────────────────────────────────────────────────────

export const DEMO_HERO_STATS: HeroStat[] = [
  { label: "Years of exp.",    value: 5,  suffix: "+" },
  { label: "Projects shipped", value: 30, suffix: "+" },
  { label: "Technologies",     value: 25, suffix: "+" },
];

// ── Code editor lines ─────────────────────────────────────────────────────────

export const DEMO_CODE_LINES: CodeLine[] = [
  [
    { text: "import",    kind: "keyword" },
    { text: " { Developer } ", kind: "plain" },
    { text: "from",     kind: "keyword" },
    { text: " '@/types'", kind: "string" },
  ],
  [],
  [
    { text: "const ",   kind: "keyword" },
    { text: "alexChen", kind: "plain" },
    { text: ": ",       kind: "punctuation" },
    { text: "Developer", kind: "type" },
    { text: " = {",     kind: "bracket" },
  ],
  [
    { text: "  name",   kind: "prop" },
    { text: ":       ", kind: "punctuation" },
    { text: '"Alex Chen"', kind: "string" },
    { text: ",",        kind: "punctuation" },
  ],
  [
    { text: "  role",   kind: "prop" },
    { text: ":       ", kind: "punctuation" },
    { text: '"Full-Stack Developer"', kind: "string" },
    { text: ",",        kind: "punctuation" },
  ],
  [
    { text: "  location", kind: "prop" },
    { text: ":   ",       kind: "punctuation" },
    { text: '"San Francisco, CA 🇺🇸"', kind: "string" },
    { text: ",",          kind: "punctuation" },
  ],
  [
    { text: "  experience", kind: "prop" },
    { text: ": ",           kind: "punctuation" },
    { text: '"5yr full-time"', kind: "string" },
    { text: ",",            kind: "punctuation" },
  ],
  [{ text: "  stack", kind: "prop" }, { text: ": {", kind: "bracket" }],
  [
    { text: "    frontend", kind: "prop" },
    { text: ": ",           kind: "punctuation" },
    { text: '["Next.js","React","TS"]', kind: "string" },
    { text: ",",            kind: "punctuation" },
  ],
  [
    { text: "    backend",  kind: "prop" },
    { text: ":  ",          kind: "punctuation" },
    { text: '["Node.js","PostgreSQL","GraphQL"]', kind: "string" },
    { text: ",",            kind: "punctuation" },
  ],
  [
    { text: "    devops",   kind: "prop" },
    { text: ":   ",         kind: "punctuation" },
    { text: '["AWS","Docker","K8s"]', kind: "string" },
    { text: ",",            kind: "punctuation" },
  ],
  [{ text: "  },", kind: "bracket" }],
  [
    { text: "  status",  kind: "prop" },
    { text: ":     ",    kind: "punctuation" },
    { text: '"open_to_opportunities"', kind: "string" },
    { text: " ✓",        kind: "value" },
  ],
  [{ text: "}", kind: "bracket" }],
];

// ── Terminal output ───────────────────────────────────────────────────────────

export const DEMO_TERMINAL_LINES: TerminalLine[] = [
  { text: "$ node portfolio.ts",               color: "text-zinc-400"       },
  { text: "> Loading profile...  100%",         color: "text-accent-primary" },
  { text: "> Status: ONLINE — Ready to build.", color: "text-green-400"      },
];
