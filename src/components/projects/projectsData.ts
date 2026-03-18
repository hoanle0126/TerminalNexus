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
