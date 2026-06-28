'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* LEFT PANEL — Blue with logo + vertical text (Desktop only) */}
      <div className="hero-left-panel" style={{ backgroundColor: '#0000FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem', position: 'relative', overflow: 'hidden', zIndex: 10 }}>

        {/* Big square logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Logo square — large */}
          <div style={{ width: '80px', height: '80px', backgroundColor: 'white', overflow: 'hidden', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Bluesim" width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-bold)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Est. 2021 · Casablanca
            </span>
          </div>
        </motion.div>

        {/* Vertical STUDIO text — center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-bold)',
            fontSize: 'clamp(3rem, 6vw, 6rem)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.12)',
          }}>
            BLUESIM STUDIO
          </span>
        </motion.div>

        {/* Bottom left — section marker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <span style={{ fontFamily: 'var(--font-bold)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            [ 01 / 06 ]
          </span>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.8, maxWidth: '180px' }}>
            Form follows feeling<br />الشعور يوجه الشكل
          </p>
        </motion.div>
      </div>

      {/* RIGHT PANEL — Video + big headline */}
      <div className="hero-right-panel" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Full-bleed B&W Stock Video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            style={{ objectFit: 'cover', width: '100%', height: '100%', pointerEvents: 'none' }}
            className="img-bw-fixed"
          >
            <source src="https://cdn.pixabay.com/video/2026/04/11/345893_large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark gradient bottom overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(13,13,13,0.85) 100%)', zIndex: 2 }} />

        {/* Registration marks */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '14px', height: '14px', borderTop: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '14px', height: '14px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 3 }} />

        {/* Mobile-only logo float */}
        <div className="mobile-logo-overlay" style={{ display: 'none', position: 'absolute', top: '5.5rem', left: '1.5rem', zIndex: 10, alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#0000FF', overflow: 'hidden', padding: '2px' }}>
            <Image src="/logo.png" alt="Bluesim" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-bold)', fontSize: '0.9rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Bluesim
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
              Casablanca
            </span>
          </div>
        </div>

        {/* Bottom text overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 2rem', zIndex: 4 }}
        >
          <h1 style={{
            fontFamily: 'var(--font-bold)',
            fontWeight: 700,
            fontSize: 'clamp(4rem, 8vw, 9rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'white',
            margin: 0,
            marginBottom: '1.25rem',
          }}>
            Bluesim<br />
            <span style={{ color: '#0000FF', fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.75em', letterSpacing: '-0.02em' }}>Studio</span>
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.55)', margin: 0, textTransform: 'uppercase' }}>
              Multidisciplinary Design · Casablanca
            </p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.45 }}
              className="scroll-cue"
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'white' }}>Scroll</span>
              <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr !important;
          }
          .hero-left-panel {
            display: none !important;
          }
          .hero-right-panel {
            height: 100vh !important;
          }
          .mobile-logo-overlay {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  )
}
