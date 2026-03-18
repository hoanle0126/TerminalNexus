'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import type { Project } from './projectsData'
import dec from '@/components/effects/decorative.module.css'

interface Props {
  project: Project
  index: number
}

export function ProjectFlipCard({ project }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const t = useTranslations('projects')

  const aspectClass =
    project.size === 'large' ? 'aspect-[16/10]' : 'aspect-square'

  return (
    <div
      className={`relative cursor-pointer w-full ${aspectClass}`}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        whileHover={{ scale: 1.02 }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ======================== FRONT FACE ======================== */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes={
              project.size === 'large'
                ? '(max-width: 768px) 100vw, 66vw'
                : '(max-width: 768px) 100vw, 33vw'
            }
            className="object-cover"
            priority={project.size === 'large'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div
            className={`absolute inset-0 opacity-[0.04] pointer-events-none ${dec.scanlinesCyanSoft}`}
          />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="font-mono text-xl md:text-2xl font-bold text-white drop-shadow-lg">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-cyan-400/70 mt-1 tracking-widest">
              {t('hoverToFlip')}
            </p>
          </div>
        </div>

        {/* ======================== BACK FACE ======================== */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-cyan-400/30 bg-gray-950/95 backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-mono text-lg font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="font-mono text-[10px] bg-white/5 border-white/10 text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {project.demoUrl && (
            <div className="relative z-10 mt-4">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="cursor-target inline-flex items-center px-5 py-2 rounded-md font-mono font-bold text-sm text-black bg-cyan-500 hover:bg-cyan-400 transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                {t('viewDemo')}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
