'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

export function ContactForm() {
  const t = useTranslations('contact')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[ContactForm] Mock submission:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-green-400 text-sm bg-black/60 border border-green-400/30 rounded-xl p-8 text-center"
      >
        <span className="block text-2xl mb-2">✓</span>
        <span>{t('sent')}</span>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="font-mono text-xs text-gray-400 tracking-wider uppercase">
          {t('name')}
        </Label>
        <Input
          id="name"
          required
          placeholder={t('namePlaceholder')}
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="cursor-target bg-white/5 border-white/10 font-mono text-white placeholder:text-gray-600 focus-visible:ring-cyan-400/50 focus-visible:border-cyan-400/50"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="font-mono text-xs text-gray-400 tracking-wider uppercase">
          {t('emailField')}
        </Label>
        <Input
          id="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className="cursor-target bg-white/5 border-white/10 font-mono text-white placeholder:text-gray-600 focus-visible:ring-cyan-400/50 focus-visible:border-cyan-400/50"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="message" className="font-mono text-xs text-gray-400 tracking-wider uppercase">
          {t('message')}
        </Label>
        <Textarea
          id="message"
          required
          rows={5}
          placeholder={t('messagePlaceholder')}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className="cursor-target bg-white/5 border-white/10 font-mono text-white placeholder:text-gray-600 resize-none focus-visible:ring-cyan-400/50 focus-visible:border-cyan-400/50"
        />
      </div>

      {/* Submit */}
      <motion.div whileTap={{ scale: 0.97 }}>
        <Button
          type="submit"
          className="cursor-target w-full font-mono font-bold tracking-widest bg-cyan-500 hover:bg-cyan-400 text-black transition-colors duration-200"
        >
          {t('send')}
        </Button>
      </motion.div>
    </form>
  )
}
