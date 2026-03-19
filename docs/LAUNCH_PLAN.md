# Product Hunt Launch Plan — TerminalNexus

> **Target launch date**: TBD  
> **Product Hunt page**: Draft (link TBD)  
> **Demo site**: https://terminalnexus-demo.vercel.app

---

## Pre-Launch Checklist (2 weeks before)

### Assets
- [ ] Demo site live and working (fictional data, no personal info)
- [ ] Hero screenshot 1920×1080 (dark mode, cyan accent)
- [ ] Mobile screenshot 390×844
- [ ] Multi-device mockup (Shots.so or Mockuuups)
- [ ] Preview GIF / screen recording (60-90 seconds, showing interactions)
- [ ] Product thumbnail 240×240 (clean terminal logo on dark bg)

### Listings
- [ ] Gumroad product page live with:
  - Title, description, screenshots
  - Pricing: Free tier link (GitHub) + Commercial $29
  - Delivery: ZIP download (no .next, no node_modules, no .git)
- [ ] GitHub repo: public, README polished, social preview image set

### Community
- [ ] Post teaser on Twitter/X 3 days before launch
- [ ] Share in relevant Discord servers (Next.js, Tailwind, dev communities)
- [ ] Reach out to 10-15 developer friends to upvote on launch day

---

## Product Hunt Page Copy

### Name
`TerminalNexus`

### Tagline
`Premium developer portfolio template with a hacker aesthetic`

### Description (500 chars)
```
A terminal-inspired portfolio template built with Next.js 15, React 19, 
Tailwind CSS v4, Framer Motion, and React Three Fiber.

✦ Config-driven — personalize by editing 7 files, zero component editing  
✦ 5 accent color presets + dark/light/system mode  
✦ Interactive 3D background, skills network graph, bento grid projects  
✦ i18n ready, WCAG AA accessible, 90+ Lighthouse score  

Free for personal use · $29 commercial license
```

### Topics
`Developer Tools`, `Design`, `Open Source`, `Web Development`, `Template`

### Links
- **Homepage**: https://terminalnexus-demo.vercel.app
- **GitHub**: https://github.com/hoanle0126/TerminalNexus
- **Pricing**: https://gumroad.com/l/terminalnexus

---

## First Comment Template

Post as the maker immediately after launch:

```
Hey Product Hunt! 👋

I'm Hoàn, the developer behind TerminalNexus.

I built this because I wanted a portfolio that actually felt like *me* as 
a developer — not another pastel design template. The terminal/hacker 
aesthetic, interactive 3D background, and skills network graph are all 
original designs.

**What makes it different:**
→ Truly config-driven — buyers only edit 7 config files
→ Dual-license: MIT for personal, $29 commercial
→ Built on the latest stack: Next.js 15, React 19, Tailwind v4

**Ask**: Would love your honest feedback on the demo site. What section 
do you find most impressive? What would you change?

Happy to answer any questions below! 🚀
```

---

## Launch Day Timeline

| Time (UTC) | Action |
|------------|--------|
| 00:01 | Submit to Product Hunt |
| 00:05 | Post first comment (maker comment above) |
| 08:00 | Share on Twitter/X with screenshots |
| 08:30 | Post in relevant Discord/Slack communities |
| 12:00 | Share on LinkedIn |
| 18:00 | Check rankings, respond to all comments |
| 23:00 | Thank-you tweet with results |

**Best launch days**: Tuesday, Wednesday, or Thursday (avoid Monday / Friday)

---

## Pricing Strategy

| Tier | Price | What's included |
|------|-------|----------------|
| **Free** | $0 | Full source code (MIT, personal use only) via GitHub |
| **Commercial** | $29 | 1 commercial project, community support |
| **Extended** | $79 | Unlimited projects (single company), priority support, no attribution |

**Discount strategy**: Launch week only — 30% off commercial ($20 first 48h)

---

## Post-Launch

- Collect testimonials from early adopters
- Write blog post: "How I built a $X template in 6 weeks"
- Submit to: Awesome-Next.js list, Tailwind components directories, Dev.to
- Consider: CSS-Tricks, Smashing Magazine newsletter submission

---

## Bundle Preparation

### What to include in ZIP
```
TerminalNexus/
├── .env.example
├── .gitignore
├── README.md
├── docs/
├── messages/
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public/         (include demo assets, remove personal avatar)
├── src/
├── tsconfig.json
└── components.json
```

### Files to EXCLUDE
- `.git/`
- `node_modules/`
- `.next/`
- Any personal files / real avatar

### ZIP naming
`terminalnexus-v1.0.0.zip`

---

*Last updated: 2026-03-19*
