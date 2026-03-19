<p align="center">
  <img src="public/next.svg" alt="TerminalNexus" width="80" />
</p>

<h1 align="center">TerminalNexus</h1>

<p align="center">
  A premium developer portfolio template with a hacker/terminal aesthetic.<br/>
  Built with <strong>Next.js 16</strong>, <strong>React 19</strong>, <strong>Tailwind CSS v4</strong>, and rich motion effects.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#customization">Customization</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#license">License</a>
</p>

---

## Features

- 🎯 **Terminal/Hacker aesthetic** — CRT noise overlay, neon accents, monospace terminal UI
- ⚡ **Config-driven** — edit 7 config files to personalize the entire site (zero component editing)
- 🎨 **5 accent color presets** — Cyan, Purple, Green, Rose, Amber (or add your own)
- 🌗 **Dark / Light / System** color modes
- 🌐 **i18n ready** — English + Vietnamese out of the box (add languages easily)
- 🖱️ **Custom cursor** — Target crosshair, dot follower, or native cursor
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🧩 **Modular sections** — Hero, Skills (interactive graph), Projects (bento grid), Experience (carousel), Contact, Footer
- ✨ **Rich animations** — Framer Motion, GSAP scroll triggers, React Three Fiber 3D backgrounds
- 🔤 **Code editor panel** — VS Code-style syntax-highlighted profile display
- 📊 **Skills network graph** — interactive force-directed graph with tooltips
- 🏗️ **Bento grid projects** — flip-card project showcase

---

## Tech Stack

| Category     | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | Next.js 16 (App Router)                 |
| Language     | TypeScript 5                            |
| UI           | React 19                                |
| Styling      | Tailwind CSS v4                         |
| Animations   | Framer Motion 12 · GSAP 3              |
| 3D           | React Three Fiber · Three.js · OGL      |
| i18n         | next-intl 4                             |
| Icons        | Lucide React · React Icons              |
| UI Libs      | Radix UI · shadcn/ui                    |
| Linting      | ESLint 9                                |

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9 (or pnpm / yarn / bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hoanle0126/TerminalNexus.git
cd TerminalNexus

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Available Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start development server        |
| `npm run build` | Build for production             |
| `npm run start` | Start production server          |
| `npm run lint`  | Run ESLint                       |

---

## Customization

All personalization happens in **`src/config/`** — no need to touch any component files.

| File                  | What it controls                                              |
| --------------------- | ------------------------------------------------------------- |
| `config/site.ts`      | Name, avatar, social links, SEO meta, domain                  |
| `config/hero.ts`      | Stats counters, code editor content, terminal output           |
| `config/skills.ts`    | Skill clusters and items for the network graph                 |
| `config/projects.ts`  | Project cards (title, description, tags, thumbnail, links)     |
| `config/experience.ts`| Career timeline entries                                        |
| `config/navigation.ts`| Nav items and section anchors                                  |
| `config/theme.ts`     | Accent color, border radius, animation speed, cursor, color mode |

### Changing accent color

Open `src/config/theme.ts` and change the `accent` value:

```ts
export const themeConfig = {
  accent: "purple",      // "cyan" | "purple" | "green" | "rose" | "amber"
  colorMode: "dark",     // "dark" | "light" | "system"
  cursorStyle: "target", // "target" | "dot" | "default"
  // ...
};
```

### Adding a new language

1. Duplicate `messages/en.json` → `messages/fr.json` (translate values)
2. Add `"fr"` to the locale config in `src/i18n/request.ts`

> 📖 See **[docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md)** for the full customization guide.

---

## Project Structure

```
TerminalNexus/
├── messages/               # i18n translation files (en.json, vi.json)
├── public/                 # Static assets (avatar, project thumbnails)
│   └── projects/           # Project screenshot images
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # Global styles + CSS variables
│   │   └── [locale]/       # i18n dynamic route
│   │       ├── layout.tsx  # Root layout (fonts, SEO, providers)
│   │       └── page.tsx    # Main landing page (all sections)
│   ├── components/
│   │   ├── hero/           # Hero section (profile card, code editor, stats)
│   │   ├── skills/         # Interactive network graph
│   │   ├── projects/       # Bento grid project showcase
│   │   ├── experience/     # Career timeline carousel
│   │   ├── contact/        # Contact form + social links
│   │   ├── footer/         # Footer with quick links
│   │   ├── effects/        # Visual effects (cursor, noise, theme, scroll-to-top)
│   │   ├── shared/         # Reusable components (navbar, nav items, social icons)
│   │   ├── ui/             # shadcn/ui + Aceternity UI primitives
│   │   ├── ui-layouts/     # UI-Layouts components
│   │   └── reactbits/      # ReactBits components (particles, star border, etc.)
│   ├── config/             # ⭐ All personalization config files
│   ├── i18n/               # next-intl setup
│   └── lib/                # Utility functions (cn, motion presets)
├── next.config.ts          # Next.js config + next-intl plugin
├── tsconfig.json           # TypeScript config
└── package.json
```

> 📖 See **[docs/STRUCTURE.md](docs/STRUCTURE.md)** for detailed component documentation.

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hoanle0126/TerminalNexus)

1. Push your repo to GitHub
2. Import in [Vercel Dashboard](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy**

### Netlify

```bash
npm run build
# Deploy the `.next` folder via Netlify CLI or drag-and-drop
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

> 📖 See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for detailed deployment instructions.

---

## License

MIT © [Lê Hoàn](https://github.com/hoanle0126)
