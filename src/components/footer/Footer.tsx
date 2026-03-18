'use client'

import { motion } from 'motion/react'
import { MOTION } from '@/lib/motion'
import { useTranslations } from 'next-intl'
import { Terminal } from 'lucide-react'
import { SocialLink } from '@/components/shared/SocialLink'
import { siteConfig } from '@/config/site'
import { NAV_ITEMS } from '@/config/navigation'
import { resolveSocialIcon } from '@/components/shared/socialIcons'

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
              <Terminal className="h-5 w-5 text-accent-primary shrink-0" aria-hidden="true" />
              <span className="bg-gradient-to-r from-accent-primary via-purple-400 to-green-400 bg-clip-text text-transparent">
                {siteConfig.displayName}
              </span>
              <span className="text-accent-primary/60 animate-pulse">_</span>
            </div>
            {/* Tagline — mô tả dài hơn */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t('description')}
            </p>
            {/* Decorative dot row */}
            <div className="flex gap-1.5">
              {['bg-accent-primary', 'bg-purple-400', 'bg-pink-400'].map((color, i) => (
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
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="
                      group flex items-center gap-2
                      font-mono text-sm text-gray-400
                      hover:text-accent-primary
                      transition-colors duration-200
                    "
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary text-xs">›</span>
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
              {siteConfig.socials.map((social) => (
                <SocialLink
                  key={social.key}
                  href={social.href}
                  label={tContact(social.key)}
                  icon={resolveSocialIcon(social, 15)}
                  iconUrl={social.iconUrl}
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
