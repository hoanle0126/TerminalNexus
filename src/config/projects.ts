// ─── Projects Configuration ──────────────────────────────────────────────────
// Your portfolio project entries. Displayed as a bento grid with flip cards.
// Template buyers: replace these with your own projects.
//
// Tips:
//   • Place thumbnail images in `public/projects/` (recommended: 800×600px)
//   • `size: "large"` spans 2 columns, `"small"` spans 1 column
//   • `demoUrl` is optional — omit it if no live demo exists
//   • `techStack` items appear as badges on the card
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string // path to image in /public/projects/
  techStack: string[] // tech badge labels
  demoUrl?: string // optional demo link
  size: 'large' | 'small' // bento grid sizing
}

export const PROJECTS: Project[] = [
  {
    id: 'project-alpha',
    title: 'Aetheria - Editorial Botanical E-Commerce',
    description:
      'Premium cosmetics & skincare e-commerce platform. Designed with a minimalist editorial aesthetic and fluid animations. Officially submitted for sale on UI8.',
    thumbnail: '/projects/atheria.png',
    techStack: ['Next.js', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion', 'GSAP'],
    demoUrl: 'https://atheria.nacy.dev',
    size: 'small',
  },
  {
    id: 'project-beta',
    title: 'Dimotrip Travel',
    description:
      'Freelance cosmetics e-commerce project. Handled end-to-end development, from UI/UX design and Full-stack implementation to production deployment and post-launch support. Received excellent client feedback for UI quality and dedication.',
    thumbnail: '/projects/dimotriptravel.png',
    techStack: ['NextJS','ReactJS', 'Tailwind CSS', 'Shadcn UI', 'NextJS', 'PostgreSQL'],
    demoUrl: 'https://dimotriptravel.online',
    size: 'small',
  },
  {
    id: 'project-gamma',
    title: 'Korean Skincare US',
    description:
      'Freelance cosmetics e-commerce project. Handled the entire end-to-end process: UI/UX design, Full-stack development, production deployment, and post-launch support. Received highly positive client feedback for UI quality and dedication.',
    thumbnail: '/projects/koreaskincareus.png',
    techStack: ['React.JS', 'Tailwind CSS', 'Shadcn UI', 'Laravel', 'MySQL'],
    demoUrl: 'https://koreanskincareus.com',
    size: 'small',
  }
]
