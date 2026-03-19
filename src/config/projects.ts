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
    title: 'Project Alpha',
    description:
      'A full-stack web application built with Next.js and NestJS, featuring real-time collaboration, authentication, and a modern dashboard interface.',
    thumbnail: '/projects/project-alpha.jpg',
    techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    demoUrl: 'https://example.com',
    size: 'large',
  },
  {
    id: 'project-beta',
    title: 'Project Beta',
    description:
      'Mobile-first e-commerce platform with payment integration, inventory management, and analytics dashboard.',
    thumbnail: '/projects/project-beta.jpg',
    techStack: ['React', 'Node.js', 'Redis', 'Stripe'],
    demoUrl: 'https://example.com',
    size: 'small',
  },
]
