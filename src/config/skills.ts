// ─── Skills Configuration ────────────────────────────────────────────────────
// Skill clusters displayed in the interactive network graph.
// Template buyers: edit clusters and skills to match your expertise.
//
// Tips:
//   • Each cluster = a group of related skills (Frontend, Backend, etc.)
//   • `color` sets the connection line color in the graph
//   • `iconKey` uses react-icons/si keys — find them at:
//     https://react-icons.github.io/react-icons/icons/si/
//   • For skills without an icon, use `abbr` (2-char fallback text)
//   • `description` appears as tooltip on hover
// ─────────────────────────────────────────────────────────────────────────────

export interface Skill {
  slug: string
  label: string
  abbr?: string         // 2-letter fallback if no icon exists
  description?: string  // tooltip text
  iconKey?: string      // react-icons key e.g. 'SiReact'
  iconColor?: string    // brand hex color
}

export interface Cluster {
  id: string
  label: string
  color: string
  skills: Skill[]
}

export const CLUSTERS: Cluster[] = [
  {
    id: 'frontend', label: 'Frontend', color: '#00ffff',
    skills: [
      { slug: 'react',        label: 'React.js',      description: 'Component-based UI library',      iconKey: 'SiReact',        iconColor: '#61DAFB' },
      { slug: 'nextdotjs',    label: 'Next.js',       description: 'React framework for production',  iconKey: 'SiNextdotjs',    iconColor: '#FFFFFF' },
      { slug: 'typescript',   label: 'TypeScript',    description: 'Typed JavaScript at scale',       iconKey: 'SiTypescript',   iconColor: '#3178C6' },
      { slug: 'tailwindcss',  label: 'Tailwind CSS',  description: 'Utility-first CSS framework',     iconKey: 'SiTailwindcss',  iconColor: '#06B6D4' },
      { slug: 'framer',       label: 'Framer Motion', description: 'Animation library for React',     iconKey: 'SiFramer',       iconColor: '#0055FF' },
    ],
  },
  {
    id: 'backend', label: 'Backend', color: '#a855f7',
    skills: [
      { slug: 'nodedotjs',  label: 'Node.js',     description: 'JavaScript runtime',              iconKey: 'SiNodedotjs',  iconColor: '#5FA04E' },
      { slug: 'nestjs',     label: 'NestJS',      description: 'Progressive Node.js framework',   iconKey: 'SiNestjs',     iconColor: '#E0234E' },
      { slug: 'laravel',    label: 'Laravel',     description: 'PHP framework for web artisans',  iconKey: 'SiLaravel',    iconColor: '#FF2D20' },
      { slug: 'postgresql', label: 'PostgreSQL',  description: 'Advanced open-source database',   iconKey: 'SiPostgresql', iconColor: '#4169E1' },
      { slug: 'mysql',      label: 'MySQL',       description: 'Relational database',             iconKey: 'SiMysql',      iconColor: '#4479A1' },
      { slug: 'redis',      label: 'Redis',       description: 'In-memory data store',            iconKey: 'SiRedis',      iconColor: '#FF4438' },
    ],
  },
  {
    id: 'devops', label: 'DevOps', color: '#22c55e',
    skills: [
      { slug: 'docker',     label: 'Docker',     description: 'Container platform',          iconKey: 'SiDocker',     iconColor: '#2496ED' },
      { slug: 'linux',      label: 'Linux',      description: 'Server OS & VPS management',  iconKey: 'SiLinux',      iconColor: '#FCC624' },
      { slug: 'nginx',      label: 'Nginx',      description: 'Web server & reverse proxy',  iconKey: 'SiNginx',      iconColor: '#009639' },
      { slug: 'cloudflare', label: 'Cloudflare', description: 'CDN & DNS protection',        iconKey: 'SiCloudflare', iconColor: '#F6821F' },
      { slug: 'github',     label: 'GitHub',     description: 'Code hosting & CI/CD',        iconKey: 'SiGithub',     iconColor: '#FFFFFF' },
    ],
  },
  {
    id: 'languages', label: 'Languages', color: '#f59e0b',
    skills: [
      { slug: 'japanese', label: 'Japanese — N3', abbr: '日本', description: 'JLPT N3 certified' },
      { slug: 'english',  label: 'English',       abbr: 'EN',   description: 'TOEIC 700' },
    ],
  },
  {
    id: 'design', label: 'Design', color: '#ec4899',
    skills: [
      { slug: 'figma',      label: 'Figma',      description: 'UI/UX design tool',          iconKey: 'SiFigma',      iconColor: '#F24E1E' },
      { slug: 'photoshop',  label: 'Photoshop',  description: 'Image editing & graphics',   abbr: 'PS', iconColor: '#31A8FF' },
    ],
  },
]
