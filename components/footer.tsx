'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const columns = [
  {
    title: 'Studio',
    links: ['Services', 'Work', 'Manifesto', 'Contact'],
  },
  {
    title: 'Services',
    links: ['Graphic Design', 'Interior Design', '3D Design', 'Software', 'UI/UX Design'],
  },
  {
    title: 'Connect',
    links: ['Instagram', 'Behance', 'LinkedIn', 'Dribbble'],
  },
]

export default function Footer() {
  return (
    <footer id="footer" style={{ position: 'relative', overflow: 'hidden', color: 'white' }}>

      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05)' }}
      />
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.82) 0%, rgba(13,13,13,0.92) 100%)' }} />
      {/* Subtle blue wash */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 0%, rgba(56,60,229,0.35), transparent 55%)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem 2.5rem' }}>

        {/* Branding + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
        >
          <div>
            <Image
              src="/logo-wordmark.png"
              alt="Blueism Studio"
              width={643}
              height={254}
              style={{ height: 'clamp(40px, 5vw, 60px)', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }}
            />
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', margin: '1.25rem 0 0', maxWidth: '360px' }}>
              Form follows feeling. A multidisciplinary studio building brands, spaces and systems that endure.
            </p>
          </div>

          <a
            href="#contact"
            style={{
              backgroundColor: 'white', color: '#383ce5',
              fontFamily: 'var(--font-bold)', fontWeight: 700,
              fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '1.1rem 2rem', textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start a project →
          </a>
        </motion.div>

        {/* Link columns + contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="footer-cols"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', padding: '3.5rem 0' }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '1.25rem' }}>
                {col.title}
              </span>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#8f92ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info column */}
          <div>
            <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '1.25rem' }}>
              Get in touch
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <a href="mailto:hello@blueismstudio.com" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                hello@blueismstudio.com
              </a>
              <a href="tel:+212600000000" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                +212 6 00 00 00 00
              </a>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                Casablanca, Morocco<br />الدار البيضاء · Remote worldwide
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            © 2025 Blueism Studio. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Built with intention.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-cols { grid-template-columns: repeat(2, 1fr) !important; gap: 2.5rem 1.5rem !important; }
        }
      `}</style>
    </footer>
  )
}
