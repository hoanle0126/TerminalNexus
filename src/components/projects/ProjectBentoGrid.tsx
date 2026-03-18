'use client'

import { motion } from 'framer-motion'
import { PROJECTS } from './projectsData'
import { ProjectFlipCard } from './ProjectFlipCard'

export function ProjectBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PROJECTS.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            delay: index * 0.2,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={
            project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
          }
        >
          <ProjectFlipCard project={project} index={index} />
        </motion.div>
      ))}
    </div>
  )
}
