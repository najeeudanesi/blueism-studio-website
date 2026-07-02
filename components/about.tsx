'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" style={{ backgroundColor: 'var(--cream-dark, #EAE7DF)', position: 'relative' }}>

      {/* Blue vertical accent strip — left edge */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', backgroundColor: '#383ce5' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '8rem 2rem 8rem 3rem' }}>

        {/* Section header with logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="label">[ 04 ]</span>
            <h2 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1,
            }}>
              About
            </h2>
          </div>
        </motion.div>

        {/* Two-column editorial layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}
          >
            {/* Bold impact statement */}
            <p style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1.05,
              color: 'var(--foreground)',
              marginBottom: '2rem',
            }}>
              We build spaces<br />
              <span style={{ color: '#383ce5' }}>that feel.</span>
            </p>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(13,13,13,0.7)', marginBottom: '1.25rem' }}>
              Design is not decoration — it&apos;s a posture toward the world, a commitment to clarity and emotional truth. <em>Patience, precision, purpose.</em>
            </p>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(13,13,13,0.7)', marginBottom: '1.25rem' }}>
              Based in Casablanca, we draw inspiration from Moroccan craftsmanship and the Mediterranean light. Each project is an investigation into materiality, light, and the spaces that hold our lives.
            </p>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(13,13,13,0.7)', marginBottom: '3rem' }}>
              From 3D visualization to spatial design, our practice is rooted in observation and restraint — the quiet elegance of <em>l&apos;art marocain</em>.
            </p>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', marginBottom: '2.5rem' }}>
              {[['4+', 'Years'], ['30+', 'Projects'], ['12+', 'Countries']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.02em', lineHeight: 1, color: '#383ce5', marginBottom: '0.25rem' }}>{val}</div>
                  <span className="label">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#383ce5',
                  color: 'white',
                  fontFamily: 'var(--font-bold)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '1.1rem 2rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Work with us →
              </a>
            </div>
          </motion.div>

          {/* Right: tall B&W image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Offset frame */}
            <div style={{ position: 'absolute', inset: '-10px', border: '1px solid var(--border)', zIndex: 0, pointerEvents: 'none' }} />
            {/* Blue corner accent */}
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '32px', height: '32px', backgroundColor: '#383ce5', zIndex: 3 }} />
            <div style={{ position: 'relative', height: '600px', overflow: 'hidden', zIndex: 1 }}>
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85"
                alt="Studio workspace with natural light"
                fill
                className="img-bw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span className="label">Studio · Casablanca</span>
              <span className="label">2024</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
