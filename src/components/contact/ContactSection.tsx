'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react'
import { ContactForm } from './ContactForm'
import { SocialLink } from '@/components/shared/SocialLink'

const SOCIAL_LINKS = [
  {
    key: 'socialGithub' as const,
    href: 'https://github.com/hoanle0126',
    icon: <Github size={16} />,
  },
  {
    key: 'socialLinkedin' as const,
    href: 'https://linkedin.com/in/hoanle',
    icon: <Linkedin size={16} />,
  },
  {
    key: 'socialDribbble' as const,
    href: 'https://dribbble.com/hoanle',
    icon: <Dribbble size={16} />,
  },
  {
    key: 'socialBehance' as const,
    href: 'https://behance.net/hoanle',
    iconUrl: 'https://cdn.simpleicons.org/behance/ffffff',
  },
  {
    key: 'socialEmail' as const,
    href: 'mailto:hoanle@example.com',
    icon: <Mail size={16} />,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background — consistent with other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-sm text-cyan-400 tracking-widest mb-3">
            {t('label')}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Left: Contact info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-mono text-xl md:text-2xl font-bold text-white">
                {t('subtitle')}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                {t('blurb')}
              </p>
            </div>

            {/* Email link */}
            <div className="space-y-2">
              <p className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                {t('emailField')}
              </p>
              <a
                href={`mailto:${t('email')}`}
                className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm border-b border-cyan-400/30 hover:border-cyan-300/60 pb-0.5"
              >
                {t('email')}
              </a>
            </div>

            {/* Social links row */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <SocialLink
                    key={social.key}
                    href={social.href}
                    label={t(social.key)}
                    icon={'icon' in social ? social.icon : undefined}
                    iconUrl={'iconUrl' in social ? social.iconUrl : undefined}
                  />
                ))}
              </div>
            </div>

            {/* Decorative terminal hint */}
            <div className="hidden md:block font-mono text-[11px] text-gray-600 border border-white/5 rounded-lg p-4 bg-white/[0.02]">
              <span className="text-cyan-500/60">$</span>{' '}
              <span className="text-gray-500">git commit -m</span>{' '}
              <span className="text-green-400/60">&quot;feat: collaboration begins&quot;</span>
            </div>
          </motion.div>

          {/* Right: Form in glassmorphism card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8 shadow-lg shadow-black/20"
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
