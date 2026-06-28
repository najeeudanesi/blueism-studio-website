'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Services() {
  const services = [
    { number: '01', name: '3D Design', label: 'Spatial · Visualization' },
    { number: '02', name: 'Interior Architecture', label: 'Space · Form' },
    { number: '03', name: 'Product Design', label: 'Object · Craft' },
    { number: '04', name: 'Software', label: 'Digital · Systems' },
    { number: '05', name: 'UI/UX', label: 'Interface · Interaction' },
  ]

  return (
    <section id="services" style={{ backgroundColor: '#0000FF', color: 'white', position: 'relative', overflow: 'hidden' }}>

      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem', position: 'relative', zIndex: 2 }}>

        {/* Top row — section label + logo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>[ 02 ]</span>
            <h2 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'white',
              margin: 0,
              lineHeight: 1,
            }}>
              Services
            </h2>
          </motion.div>

          {/* Logo square — white bg on blue */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '56px', height: '56px', backgroundColor: 'white', overflow: 'hidden', flexShrink: 0 }}
          >
            <Image src="/logo.png" alt="Blueism" width={56} height={56} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>

        {/* Main layout: vertical label + list */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>

          {/* Vertical DISCIPLINES label */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', paddingTop: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}>
              Disciplines
            </span>
          </div>

          {/* Services list */}
          <div style={{ flex: 1 }}>
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ServiceRow service={service} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom — tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            All disciplines — one intention
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)' }}>
            Form follows feeling.
          </span>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceRow({ service }: { service: { number: string; name: string; label: string } }) {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.2)',
        padding: '1.5rem 0',
        display: 'grid',
        gridTemplateColumns: '3rem 1fr auto',
        alignItems: 'center',
        gap: '1.5rem',
        cursor: 'default',
        transition: 'padding-left 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget.querySelector('.svc-name') as HTMLElement
        if (el) el.style.webkitTextStroke = '1px white'
        e.currentTarget.style.paddingLeft = '0.75rem'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget.querySelector('.svc-name') as HTMLElement
        if (el) el.style.webkitTextStroke = '0px'
        e.currentTarget.style.paddingLeft = '0'
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>
        {service.number}
      </span>
      <span
        className="svc-name"
        style={{
          fontFamily: 'var(--font-bold)',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 4vw, 4.5rem)',
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: 'white',
          lineHeight: 1,
          transition: 'all 0.3s ease',
        }}
      >
        {service.name}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textAlign: 'right', whiteSpace: 'nowrap' }}>
        {service.label}
      </span>
    </div>
  )
}
