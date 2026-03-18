import { siteConfig } from "./site";

// ─── Hero Section Configuration ──────────────────────────────────────────────
// Stats counters, code editor content, and terminal output.
// Template buyers: customise these to reflect your own profile.
// ─────────────────────────────────────────────────────────────────────────────

// ── Stats (shown below the hero CTA) ────────────────────────────────────────

export interface HeroStat {
  label: string;
  value: number;
  suffix: string;
}

export const HERO_STATS: HeroStat[] = [
  { label: "Years of exp.", value: 2, suffix: "+" },
  { label: "Projects shipped", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

// ── Code Editor Tokens ──────────────────────────────────────────────────────

type TokenKind =
  | "keyword"
  | "type"
  | "string"
  | "prop"
  | "value"
  | "comment"
  | "plain"
  | "bracket"
  | "punctuation";

export interface CodeToken {
  text: string;
  kind: TokenKind;
}

export type CodeLine = CodeToken[];

/**
 * Lines rendered in the VS Code-style code editor panel.
 * Each inner array is one line of syntax-highlighted tokens.
 */
export const CODE_LINES: CodeLine[] = [
  [
    { text: "import", kind: "keyword" },
    { text: " { Developer } ", kind: "plain" },
    { text: "from", kind: "keyword" },
    { text: " '@/types'", kind: "string" },
  ],
  [],
  [
    { text: "const ", kind: "keyword" },
    { text: siteConfig.editorVarName, kind: "plain" },
    { text: ": ", kind: "punctuation" },
    { text: "Developer", kind: "type" },
    { text: " = {", kind: "bracket" },
  ],
  [
    { text: "  name", kind: "prop" },
    { text: ":       ", kind: "punctuation" },
    { text: `"${siteConfig.name}"`, kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [
    { text: "  role", kind: "prop" },
    { text: ":       ", kind: "punctuation" },
    { text: '"Full-Stack Developer"', kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [
    { text: "  location", kind: "prop" },
    { text: ":   ", kind: "punctuation" },
    { text: '"Vietnam 🇻🇳"', kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [
    { text: "  experience", kind: "prop" },
    { text: ": ", kind: "punctuation" },
    { text: '"2yr freelance"', kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [
    { text: "  japanese", kind: "prop" },
    { text: ":   ", kind: "punctuation" },
    { text: '"JLPT N3 日本語"', kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [
    { text: "  stack", kind: "prop" },
    { text: ": {", kind: "bracket" },
  ],
  [
    { text: "    frontend", kind: "prop" },
    { text: ": ", kind: "punctuation" },
    { text: '["Next.js","React","TS"]', kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [
    { text: "    backend", kind: "prop" },
    { text: ":  ", kind: "punctuation" },
    { text: '["Node.js","PostgreSQL"]', kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [
    { text: "    cloud", kind: "prop" },
    { text: ":    ", kind: "punctuation" },
    { text: '["AWS","Docker"]', kind: "string" },
    { text: ",", kind: "punctuation" },
  ],
  [{ text: "  },", kind: "bracket" }],
  [
    { text: "  status", kind: "prop" },
    { text: ":     ", kind: "punctuation" },
    { text: '"available_for_hire"', kind: "string" },
    { text: " ✓", kind: "value" },
  ],
  [{ text: "}", kind: "bracket" }],
];

// ── Terminal output lines ───────────────────────────────────────────────────

export interface TerminalLine {
  text: string;
  color: string;
}

export const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ node portfolio.ts", color: "text-zinc-400" },
  { text: "> Loading profile...  100%", color: "text-accent-primary" },
  { text: "> Status: ONLINE — Ready to build.", color: "text-green-400" },
];
