'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface SocialLinkProps {
  href: string
  label: string
  icon?: React.ReactNode
  iconUrl?: string
}

export function SocialLink({ href, label, icon, iconUrl }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="
        flex items-center justify-center
        w-10 h-10 rounded-full
        border border-white/20
        bg-white/5
        text-gray-400
        hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10
        transition-colors duration-200
      "
    >
      {iconUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={iconUrl} alt={label} width={16} height={16} className="opacity-60 group-hover:opacity-100" />
      ) : (
        icon
      )}
    </motion.a>
  )
}
