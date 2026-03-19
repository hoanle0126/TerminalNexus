# Customization Guide

> Everything you need to personalize TerminalNexus without touching component code.

---

## Table of Contents

- [Config Files Overview](#config-files-overview)
- [Identity & SEO — `site.ts`](#identity--seo)
- [Theme — `theme.ts`](#theme)
- [Hero Section — `hero.ts`](#hero-section)
- [Skills Graph — `skills.ts`](#skills-graph)
- [Projects — `projects.ts`](#projects)
- [Experience Timeline — `experience.ts`](#experience-timeline)
- [Navigation — `navigation.ts`](#navigation)
- [Translations (i18n)](#translations-i18n)
- [Adding / Removing Sections](#adding--removing-sections)
- [Custom Accent Color](#custom-accent-color)

---

## Config Files Overview

All config files live in **`src/config/`**:

```
src/config/
├── site.ts         # Your identity, social links, SEO
├── theme.ts        # Colors, border radius, cursor, animations
├── hero.ts         # Hero stats, code editor, terminal output
├── skills.ts       # Skill clusters for the network graph
├── projects.ts     # Project cards for bento grid
├── experience.ts   # Career timeline entries
└── navigation.ts   # Nav items and section anchors
```

---

## Identity & SEO

**File:** `src/config/site.ts`

```ts
export const siteConfig = {
  // ── Identity ──
  name: "Your Name",            // Used in SEO, OG tags, copyright
  displayName: "YOUR NAME",     // Shown in Navbar & Footer logo
  shortName: "YOUR\nNAME",      // Center node in skills graph (supports \n)
  editorTabName: "your-name.ts",// Code editor tab label
  editorVarName: "yourName",    // Code editor variable name
  avatarPath: "/avatar.png",    // Replace public/avatar.png with your photo

  // ── Domain & SEO ──
  domain: "https://yourdomain.com",
  ogSiteName: "Your Name — Portfolio",
  twitterHandle: "@yourhandle",

  // ── Social Links ──
  socials: [
    { key: "socialGithub",   href: "https://github.com/you",   icon: "Github" },
    { key: "socialLinkedin", href: "https://linkedin.com/in/you", icon: "Linkedin" },
    { key: "socialEmail",    href: "mailto:you@example.com",    icon: "Mail" },
    // Add or remove as needed. Supported icons: Github, Linkedin, Dribbble, Mail
    // For unsupported icons, use iconUrl instead:
    // { key: "socialBehance", href: "...", iconUrl: "https://cdn.simpleicons.org/behance/ffffff" },
  ],
};
```

**Translation keys for socials** must match in `messages/en.json`:

```json
{
  "contact": {
    "socialGithub": "GitHub",
    "socialLinkedin": "LinkedIn",
    "socialEmail": "Email"
  }
}
```

---

## Theme

**File:** `src/config/theme.ts`

```ts
export const themeConfig = {
  accent: "cyan",          // "cyan" | "purple" | "green" | "rose" | "amber"
  borderRadius: "rounded", // "sharp" | "rounded" | "pill"
  animationSpeed: "normal",// "fast" | "normal" | "slow"
  cursorStyle: "target",   // "target" (crosshair) | "dot" (follower) | "default" (native)
  colorMode: "dark",       // "dark" | "light" | "system"
};
```

Changes take effect immediately on dev server reload — no build step required.

---

## Hero Section

**File:** `src/config/hero.ts`

### Stats counters

```ts
export const HERO_STATS = [
  { label: "Years of exp.", value: 5, suffix: "+" },
  { label: "Projects shipped", value: 30, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
];
```

### Code editor content

The code editor panel renders syntax-highlighted tokens. Each line is an array of `{ text, kind }` objects:

```ts
// Token kinds: "keyword" | "type" | "string" | "prop" | "value" | "comment" | "plain" | "bracket" | "punctuation"
export const CODE_LINES = [
  [
    { text: "const ", kind: "keyword" },
    { text: "yourName", kind: "plain" },
    { text: ": ", kind: "punctuation" },
    { text: "Developer", kind: "type" },
    { text: " = {", kind: "bracket" },
  ],
  // ... add your own lines
];
```

### Terminal output

```ts
export const TERMINAL_LINES = [
  { text: "$ node portfolio.ts", color: "text-zinc-400" },
  { text: "> Status: ONLINE", color: "text-green-400" },
];
```

---

## Skills Graph

**File:** `src/config/skills.ts`

Skills are organized into clusters that appear as groups in the network graph:

```ts
export const CLUSTERS = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#00ffff",        // Cluster connection line color
    skills: [
      {
        slug: "react",           // Unique identifier
        label: "React.js",       // Display name
        description: "Component-based UI library",  // Tooltip text
        iconKey: "SiReact",      // react-icons key (optional)
        iconColor: "#61DAFB",    // Icon brand color (optional)
      },
      // ... more skills
    ],
  },
  // ... more clusters
];
```

**Icon keys** use `react-icons/si` (Simple Icons). Find keys at [react-icons.github.io](https://react-icons.github.io/react-icons/icons/si/).

For skills without an icon, provide `abbr` instead:

```ts
{ slug: "japanese", label: "Japanese — N3", abbr: "日本", description: "JLPT N3" }
```

---

## Projects

**File:** `src/config/projects.ts`

```ts
export const PROJECTS = [
  {
    id: "my-app",                          // Unique ID
    title: "My App",                       // Card title
    description: "A full-stack SaaS...",   // Card description
    thumbnail: "/projects/my-app.jpg",     // Image in public/projects/
    techStack: ["Next.js", "PostgreSQL"],  // Tech badges
    demoUrl: "https://myapp.com",          // Optional demo link
    size: "large",                         // "large" (2-col) or "small" (1-col)
  },
];
```

**Images:** Place project screenshots in `public/projects/` — recommended size **800×600px**.

---

## Experience Timeline

**File:** `src/config/experience.ts`

```ts
export const EXPERIENCE_DATA = [
  {
    id: "exp-1",
    chapter: "01",                       // Chapter number display
    company: "Acme Inc.",
    role: "Senior Developer",
    period: "2023 → Present",
    location: "Remote",
    source: "Full-time",
    description: "Led the frontend team...",
    stack: ["React", "Node.js", "AWS"],  // Tech badges
    highlight: "Shipped 5 major features",
    type: "fulltime",                    // "fulltime" | "freelance"
    accentColor: "cyan",                 // Card accent color
  },
];
```

---

## Navigation

**File:** `src/config/navigation.ts`

```ts
export const NAV_ITEMS = [
  { key: "home",     href: "#home" },
  { key: "about",    href: "#about" },
  { key: "skills",   href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "contact",  href: "#contact" },
];
```

The `key` maps to `t('nav.<key>')` in translation files. The `href` must match the `id` attribute of the corresponding section in `page.tsx`.

To **add a new section**: add an entry here, add a `<section id="newsection">` in `page.tsx`, and add the translation key in `messages/*.json`.

---

## Translations (i18n)

Translation files live in `messages/`:

```
messages/
├── en.json    # English
└── vi.json    # Vietnamese
```

### Adding a new language

1. Copy `messages/en.json` → `messages/fr.json`
2. Translate all values (keep keys unchanged)
3. Update `src/i18n/request.ts` to include the new locale
4. The language switcher will automatically pick it up

---

## Adding / Removing Sections

1. **Add nav item** in `src/config/navigation.ts`
2. **Create component** in `src/components/yoursection/YourSection.tsx`
3. **Import & place** in `src/app/[locale]/page.tsx`
4. **Add translations** in `messages/en.json` and `messages/vi.json`

To **remove a section**: reverse the steps above.

---

## Custom Accent Color

To add a custom color beyond the 5 presets:

1. Open `src/config/theme.ts`
2. Add your preset to `ACCENT_PRESETS`:

```ts
export const ACCENT_PRESETS = {
  // ... existing presets
  ocean: {
    primary: "#0ea5e9",
    primaryRgb: "14,165,233",
    tailwindName: "sky",
  },
};
```

3. Update the `AccentPreset` type:

```ts
export type AccentPreset = "cyan" | "purple" | "green" | "rose" | "amber" | "ocean";
```

4. Set `accent: "ocean"` in `themeConfig`.
