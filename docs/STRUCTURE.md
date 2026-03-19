# Project Structure

> Detailed guide to the TerminalNexus folder and component architecture.

---

## Root Directory

```
TerminalNexus/
├── docs/                   # 📖 Documentation (this folder)
├── messages/               # 🌐 i18n translation files
│   ├── en.json             # English
│   └── vi.json             # Vietnamese
├── public/                 # 📁 Static assets (served at /)
│   ├── avatar.png          # Profile photo (referenced by site.ts)
│   └── projects/           # Project thumbnail images
├── src/                    # 📦 Source code
│   ├── app/                # Next.js App Router
│   ├── components/         # React components (by section)
│   ├── config/             # ⭐ Personalization config files
│   ├── i18n/               # next-intl setup
│   └── lib/                # Shared utilities
├── next.config.ts          # Next.js + next-intl plugin config
├── tsconfig.json           # TypeScript paths (@/ alias)
├── components.json         # shadcn/ui registry config
├── RULES.md                # Development rules & guidelines
├── TODO.md                 # Template roadmap
└── package.json
```

---

## App Router (`src/app/`)

```
src/app/
├── globals.css             # Global styles, CSS variables, Tailwind imports
├── layout.tsx              # Root layout (minimal — redirects to locale)
├── favicon.ico
└── [locale]/               # Dynamic locale route (en, vi, ...)
    ├── layout.tsx           # Main layout: fonts, SEO metadata, providers
    └── page.tsx             # Landing page: assembles all sections
```

### `[locale]/layout.tsx`

- Loads Google Fonts (JetBrains Mono, Inter)
- Sets SEO metadata (title, description, OG tags)
- Wraps app with `NextIntlClientProvider` and `ThemeProvider`
- Includes global effects: `BackgroundNoise`, `ScrollToTop`, cursor

### `[locale]/page.tsx`

- Assembles all sections in order: Hero → Skills → Projects → Experience → Contact → Footer
- Each section has a unique `id` matching `navigation.ts` anchors

---

## Components (`src/components/`)

Each section folder is self-contained:

```
src/components/
├── hero/                   # Hero section
│   ├── HeroSection.tsx      # Main hero layout (split: profile + code editor)
│   ├── HeroProfileCard.tsx  # Left side: avatar, name, role, CTA
│   └── CodeEditorPanel.tsx  # Right side: VS Code-style code display
│
├── skills/                 # Skills network graph
│   ├── SkillsSection.tsx    # Section wrapper with title
│   ├── NetworkGraph.tsx     # Interactive force-directed graph (canvas)
│   ├── CenterNode.tsx       # Central "name" node
│   ├── SkillTooltip.tsx     # Hover tooltip for skill nodes
│   └── skillsData.ts        # Re-exports from config/skills.ts
│
├── projects/               # Projects bento grid
│   ├── ProjectsSection.tsx  # Section wrapper
│   ├── ProjectCard.tsx      # Flip card with front/back
│   └── projectsData.ts      # Re-exports from config/projects.ts
│
├── experience/             # Experience timeline
│   ├── ExperienceSection.tsx # Section wrapper
│   ├── ExperienceCarousel.tsx# Desktop carousel with scroll snapping
│   ├── MobileTimeline.tsx   # Mobile vertical timeline
│   ├── ScrollCard.tsx       # Individual experience card
│   ├── ProgressDots.tsx     # Carousel progress indicator
│   └── experienceData.ts    # Re-exports from config/experience.ts
│
├── contact/                # Contact section
│   └── ContactSection.tsx   # Contact form + social links
│
├── footer/                 # Footer
│   └── Footer.tsx           # 3-column footer with nav, socials, copyright
│
├── effects/                # Global visual effects
│   ├── ThemeProvider.tsx     # Injects CSS variables from theme.ts
│   ├── TargetCursorLoader.tsx # Loads custom cursor based on config
│   ├── TargetCursor.tsx     # Crosshair cursor implementation
│   ├── DotCursor.tsx        # Dot follower cursor implementation
│   ├── BackgroundNoise.tsx  # CRT noise overlay effect
│   ├── BackgroundNoise.module.css
│   └── ScrollToTop.tsx      # Scroll-to-top button with progress ring
│
├── shared/                 # Reusable across sections
│   ├── Navbar.tsx           # Fixed navigation bar
│   ├── NavItem.tsx          # Individual nav link with glow effects
│   ├── SocialLink.tsx       # Social icon button
│   ├── LanguageSwitcher.tsx # i18n locale picker
│   └── socialIcons.tsx      # Resolves icon name → Lucide component
│
├── ui/                     # UI primitives (shadcn/ui + Aceternity UI)
│   ├── moving-border.tsx
│   ├── wavy-background.tsx
│   └── ...
│
├── ui-layouts/             # Components from UI-Layouts library
│   └── ...
│
└── reactbits/              # Components from ReactBits library
    ├── Particles.tsx        # Particle background
    ├── StarBorder.tsx       # Star border animation
    ├── ShinyText.tsx        # Shimmer text effect
    ├── FaultyTerminal.tsx   # Glitchy terminal text
    └── ...
```

---

## Config Layer (`src/config/`)

The **config layer** is the key architectural feature — it decouples personal data from component code:

```
src/config/
├── site.ts         # Identity, social links, SEO meta
├── theme.ts        # Accent color, border radius, animation speed, cursor, color mode
├── hero.ts         # Stats, code editor tokens, terminal lines
├── skills.ts       # Skill clusters & items (network graph data)
├── projects.ts     # Project entries (bento grid data)
├── experience.ts   # Career timeline entries
└── navigation.ts   # Nav items & section IDs
```

**Data flow:**

```
config/*.ts  →  components/*Data.ts (re-export)  →  Component.tsx (renders)
```

Components **never** import personal data directly — they read from config or the re-export barrel files in each section folder.

---

## i18n Layer (`src/i18n/`)

```
src/i18n/
└── request.ts      # next-intl request config (locales, default locale)
```

Translation files in `messages/` follow this structure:

```json
{
  "nav": { "home": "Home", "about": "About", ... },
  "hero": { "greeting": "Hi, I'm", "cta": "Get in touch", ... },
  "skills": { "title": "Skills & Expertise", ... },
  "projects": { "title": "Featured Projects", ... },
  "experience": { "title": "My Journey", ... },
  "contact": { "title": "Get in Touch", ... },
  "footer": { ... }
}
```

---

## Utilities (`src/lib/`)

```
src/lib/
├── utils.ts        # cn() — clsx + tailwind-merge helper
└── motion.ts       # Framer Motion animation presets (fadeIn, slideUp, stagger, etc.)
```

`motion.ts` provides reusable animation variants used across all sections for consistent entrance effects.
