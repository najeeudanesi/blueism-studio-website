'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Philosophy() {
  return (
    <section style={{ backgroundColor: '#0000FF', color: 'white', position: 'relative', overflow: 'hidden' }}>

      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      }} />

      {/* Large watermark logo — centered */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 1, opacity: 0.06, pointerEvents: 'none', width: '400px', height: '400px' }}>
        <Image src="/logo.png" alt="" fill style={{ objectFit: 'cover' }} aria-hidden />
      </div>

      {/* Vertical "POSTURE" text — right side */}
      <div style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}>
        <span style={{
          fontFamily: 'var(--font-bold)',
          fontWeight: 700,
          fontSize: '0.55rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          writingMode: 'vertical-rl',
        }}>
          Manifesto · Philosophy · Posture
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 3, maxWidth: '1100px', margin: '0 auto', padding: '9rem 2rem' }}
      >
        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>[ 05 ]</span>
          <span style={{ display: 'inline-block', width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Manifesto</span>
        </div>

        {/* Two-style headline: BOLD + italic mix */}
        <blockquote style={{ margin: 0 }}>
          {/* Line 1 — Oswald ultra bold */}
          <p style={{
            fontFamily: 'var(--font-bold)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 7vw, 8rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'white',
            margin: 0,
          }}>
            Design is not
          </p>
          {/* Line 2 — Cormorant italic, indented */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.75)',
            margin: 0,
            paddingLeft: 'clamp(2rem, 5vw, 6rem)',
          }}>
            a service—
          </p>
          {/* Line 3 — big bold again */}
          <p style={{
            fontFamily: 'var(--font-bold)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 7vw, 8rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'white',
            margin: 0,
          }}>
            it is a posture.
          </p>
          {/* Line 4 — italic small */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 3vw, 3.5rem)',
            lineHeight: 1.2,
            color: 'rgba(255,255,255,0.6)',
            margin: 0,
            paddingLeft: 'clamp(2rem, 5vw, 6rem)',
            marginTop: '0.5rem',
          }}>
            toward slowness, toward meaning,<br />toward what endures.
          </p>

          {/* Attribution */}
          <footer style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {/* Logo in footer attribution */}
              <div style={{ width: '32px', height: '32px', backgroundColor: 'white', overflow: 'hidden', flexShrink: 0 }}>
                <Image src="/logo.png" alt="Blueism" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                  « La forme suit le sentiment » · « الشكل يتبع الشعور »
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  — Blueism Studio, Casablanca
                </span>
              </div>
            </div>
          </footer>
        </blockquote>
      </motion.div>
    </section>
  )
}
