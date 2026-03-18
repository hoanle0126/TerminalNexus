'use client'

import { useTranslations } from 'next-intl'
import dec from '@/components/effects/decorative.module.css'
import { ProjectBentoGrid } from './ProjectBentoGrid'

export function ProjectsSection() {
  const t = useTranslations('projects')

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background — subtle gradient consistent with other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />
      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 opacity-[0.03] pointer-events-none ${dec.gridCyanSoft}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-cyan-400 tracking-widest mb-3">
            {t('label')}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t('title')}
          </h2>
        </div>

        {/* Bento Grid */}
        <ProjectBentoGrid />
      </div>
    </section>
  )
}
