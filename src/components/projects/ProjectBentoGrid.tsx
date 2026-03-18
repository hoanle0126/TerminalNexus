'use client'

import { motion } from 'motion/react'
import { MOTION } from '@/lib/motion'
import { PROJECTS } from './projectsData'
import { ProjectFlipCard } from './ProjectFlipCard'

export function ProjectBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PROJECTS.map((project, index) => (
        <motion.div
          key={project.id}
          initial={MOTION.blurUp.hidden}
          whileInView={MOTION.blurUp.visible}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            delay: index * 0.2,
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
