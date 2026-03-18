'use client'

import { motion } from 'motion/react'
import { MOTION } from '@/lib/motion'
import { useTranslations } from 'next-intl'
import { Github, Linkedin, Dribbble, Mail, Terminal } from 'lucide-react'
import { SocialLink } from '@/components/shared/SocialLink'

const NAV_LINKS = [
  { key: 'home' as const, href: '#home' },
  { key: 'about' as const, href: '#about' },
  { key: 'skills' as const, href: '#skills' },
  { key: 'projects' as const, href: '#projects' },
  { key: 'contact' as const, href: '#contact' },
]

const SOCIAL_LINKS = [
  {
    key: 'socialGithub' as const,
    href: 'https://github.com/hoanle0126',
    icon: <Github size={15} />,
  },
  {
    key: 'socialLinkedin' as const,
    href: 'https://linkedin.com/in/hoanle',
    icon: <Linkedin size={15} />,
  },
  {
    key: 'socialDribbble' as const,
    href: 'https://dribbble.com/hoanle',
    icon: <Dribbble size={15} />,
  },
  {
    key: 'socialBehance' as const,
    href: 'https://behance.net/hoanle',
    iconUrl: 'https://cdn.simpleicons.org/behance/ffffff',
  },
  {
    key: 'socialEmail' as const,
    href: 'mailto:hoanle@example.com',
    icon: <Mail size={15} />,
  },
]

export function Footer() {
  const t = useTranslations('footer')
  const tContact = useTranslations('contact')

  return (
    <footer className="relative w-full border-t border-white/10 bg-black/95">
      <motion.div
        initial={MOTION.fadeInUpSmall.hidden}
        whileInView={MOTION.fadeInUpSmall.visible}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <div className="space-y-5">
            {/* Logo — bê nguyên từ header */}
            <div className="flex items-center gap-2 font-mono text-lg font-bold tracking-widest text-white">
              <Terminal className="h-5 w-5 text-cyan-400 shrink-0" aria-hidden="true" />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                LE HOAN
              </span>
              <span className="text-cyan-400/60 animate-pulse">_</span>
            </div>
            {/* Tagline — mô tả dài hơn */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t('description')}
            </p>
            {/* Decorative dot row */}
            <div className="flex gap-1.5">
              {['bg-cyan-400', 'bg-purple-400', 'bg-pink-400'].map((color, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${color} opacity-60`} />
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-4">
            <p className="font-mono text-xs text-gray-500 tracking-widest uppercase">
              {t('quickLinks')}
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="
                      group flex items-center gap-2
                      font-mono text-sm text-gray-400
                      hover:text-cyan-400
                      transition-colors duration-200
                    "
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 text-xs">›</span>
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Connect */}
          <div className="space-y-4">
            <p className="font-mono text-xs text-gray-500 tracking-widest uppercase">
              {t('connect')}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <SocialLink
                  key={social.key}
                  href={social.href}
                  label={tContact(social.key)}
                  icon={'icon' in social ? social.icon : undefined}
                  iconUrl={'iconUrl' in social ? social.iconUrl : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-gray-400 italic text-center sm:text-left max-w-sm">
            &ldquo;{t('quote')}&rdquo;
          </p>
          <p className="font-mono text-xs text-gray-400 text-center sm:text-right whitespace-nowrap">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
