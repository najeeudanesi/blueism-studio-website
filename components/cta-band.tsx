'use client'

import { motion } from 'framer-motion'

export default function CtaBand() {
  return (
    <section style={{ backgroundColor: '#0000FF', color: 'white', position: 'relative', overflow: 'hidden' }}>
      
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }} className="cta-band-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '1rem' }}>
              [ Partnership & Commissions ]
            </span>
            <h2 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Let&apos;s build what<br />
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 300, color: 'rgba(255,255,255,0.8)' }}>endures</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              We are currently accepting select architectural, digital design, and product design commissions globally. Let&apos;s discover what we can create together.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'white',
                  color: '#0000FF',
                  fontFamily: 'var(--font-bold)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '1.25rem 2.25rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Inquire today
              </a>
              <a
                href="mailto:hello@blueismstudio.com"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'white',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                hello@blueismstudio.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-band-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
