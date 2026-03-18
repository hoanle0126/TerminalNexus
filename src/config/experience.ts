// ─── Experience Configuration ────────────────────────────────────────────────
// Your career timeline entries. Template buyers: edit these to match your journey.
// ─────────────────────────────────────────────────────────────────────────────

import type { ExperienceItem } from "@/components/experience/experienceData";

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    chapter: "01",
    company: "Freelance via Referrals",
    role: "Frontend & Backend Foundations",
    period: "Year 1",
    location: "Ho Chi Minh City, Vietnam",
    source: "Via referrals & Facebook",
    description:
      "Started building web projects through word-of-mouth and Facebook communities. Developed a solid full-stack foundation delivering real client work.",
    stack: ["React.js", "Laravel", "MySQL", "Tailwind CSS", "PHP"],
    highlight: "5 complete client websites + 10+ landing pages delivered",
    type: "freelance",
    accentColor: "cyan",
  },
  {
    id: "exp-2",
    chapter: "02",
    company: "Self-Directed",
    role: "Modern Stack & Self-Hosting",
    period: "Year 2 → Present",
    location: "Ho Chi Minh City, Vietnam",
    source: "Freelance",
    description:
      "Upgraded to a modern stack and took full ownership of deployment: VPS, Cloudflare, Cloudflare R2 for storage. Expert in both raw coding and AI-assisted development.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker", "Cloudflare R2"],
    highlight: "2 major projects live & in production, full VPS self-hosting",
    type: "freelance",
    accentColor: "purple",
  },
  {
    id: "exp-3",
    chapter: "03",
    company: "Independent",
    role: "Creative Developer & Designer",
    period: "Now",
    location: "Ho Chi Minh City, Vietnam",
    source: "Freelance",
    description:
      "Beyond code — design interfaces in Figma, generate images, video, and music with AI. JLPT N3 Japanese. Combine technical depth with creative execution.",
    stack: ["Figma", "AI Image", "AI Video", "AI Music"],
    highlight: "JLPT N3 日本語 certified · Fluent in manual & AI-assisted dev",
    type: "freelance",
    accentColor: "emerald",
  },
];
