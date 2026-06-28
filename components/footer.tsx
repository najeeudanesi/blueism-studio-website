'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: 'var(--background)' }}>

      {/* Blue top band with logo */}
      <div style={{ backgroundColor: '#0000FF', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Large logo + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'white', overflow: 'hidden', flexShrink: 0 }}>
              <Image src="/logo.png" alt="Blueism" width={64} height={64} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', lineHeight: 1 }}>
                Blueism Studio
              </span>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                Casablanca, Morocco · Remote
              </span>
            </div>
          </div>
          {/* Vertical tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,0.65)' }}>
              Form follows feeling.
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem 3rem' }}
      >
        {/* CTA + email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border)', alignItems: 'end' }}>
          <div>
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>[ 06 ] — Let&apos;s work together</span>
            <h2 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              color: 'var(--foreground)',
              margin: 0,
            }}>
              Start a<br />
              <span style={{ color: '#0000FF' }}>conversation.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'flex-end' }}>
            <a
              href="mailto:hello@blueismstudio.com"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2vw, 1.75rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--foreground)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0000FF'; e.currentTarget.style.borderColor = '#0000FF' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              hello@blueismstudio.com
            </a>
            <p className="label">We&apos;re interested in meaningful projects that challenge our thinking.</p>
          </div>
        </div>

        {/* Social + location */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            {['Instagram', 'Behance', 'LinkedIn'].map(platform => (
              <a
                key={platform}
                href="#"
                style={{
                  fontFamily: 'var(--font-bold)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0000FF')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground)')}
              >
                {platform}
              </a>
            ))}
          </div>
          <span className="label">Casablanca, Morocco · الدار البيضاء · Remote</span>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <span className="label">© 2025 Blueism Studio. All rights reserved.</span>
          {/* Small square logo mark at end */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="label">Built with intention.</span>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#0000FF', overflow: 'hidden' }}>
              <Image src="/logo.png" alt="" width={20} height={20} style={{ width: '100%', height: '100%', objectFit: 'cover' }} aria-hidden />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
