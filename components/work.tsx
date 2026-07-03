'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'

/* Slider categories — the centered card is the active filter for the grid below.
   `match` is compared against project.discipline; `all` shows everything. */
const categories = [
  { key: 'all', label: 'All Projects', match: null, cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80' },
  { key: 'interior', label: 'Interior', match: 'Interior Architecture', cover: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80' },
  { key: '3d', label: '3D Design', match: '3D Design', cover: 'https://images.unsplash.com/photo-1633355444132-695d5876cd00?w=1200&q=80' },
  { key: 'product', label: 'Product', match: 'Product Design', cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80' },
  { key: 'uiux', label: 'UI / UX', match: 'UI/UX', cover: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80' },
  { key: 'software', label: 'Software', match: 'Software', cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80' },
]

const stats = [
  ['5 Years', 'In Experience'],
  ['100+', 'Projects Done'],
  ['Fast Quality', 'Delivery'],
  ['Responsive', 'Staff'],
  ['Served', 'In Quality'],
]

export default function Work() {
  const [active, setActive] = useState(0)
  const current = categories[active]
  const shown = current.match ? projects.filter((p) => p.discipline === current.match) : projects

  return (
    <section id="work" style={{ backgroundColor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>

        {/* ===== Giant WORK header ===== */}
        <div className="work-hero-row">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 400, color: '#487ef8',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', lineHeight: 1.6, margin: 0,
              maxWidth: '440px',
            }}
          >
            Blueism is a creative studio that brings your ideas to life and fulfils your dream
            identity — an experience where we enhance your creativity into something much bigger
            than a picture, but something felt and real.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.94, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="work-bigtitle"

          >
            WORK
          </motion.h2>
        </div>

        {/* ===== Coverflow slider — category selector ===== */}
        <CategorySlider active={active} setActive={setActive} />

        {/* ===== Filtered project grid — irregular editorial layout ===== */}
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
          <span className="label">Showing · {current.label}</span>
          <span className="label">{shown.length} {shown.length === 1 ? 'project' : 'projects'}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            className="work-grid"
            style={{ marginTop: '1.5rem' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {shown.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={i * 0.06}
                className={i === 0 ? 'work-feature' : i % 3 === 0 ? 'work-wide' : undefined}
              />
            ))}

            {/* Brand statement — always present */}
            <BrandStatement delay={shown.length * 0.06} />

            {/* CTA — always present, spans wide */}
            <CtaBlock delay={shown.length * 0.06 + 0.06} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== Stats band ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: '#383ce5', color: 'white' }}
      >
        <div className="work-stats" style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
          {stats.map(([val, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="work-stat"
            >
              <div style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', letterSpacing: '0.02em', textTransform: 'uppercase', lineHeight: 1.05 }}>
                {val}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .work-hero-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
          padding-top: 1.5rem;
        }
        .work-bigtitle {
          position: relative;
          display: inline-block;
          order: -1;
          justify-self: end;
          font-family: var(--font-bold);
          font-weight: 700;
          font-size: clamp(3.5rem, 13vw, 12rem);
          line-height: 0.85;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #383ce5;
          margin-top: -20px;
          margin-bottom: 0.25rem;
          text-align: right;
          text-shadow: 0 18px 40px rgba(56,60,229,0.20);
        }
        /* Overline: from the left viewport edge, stopping where WORK begins.
           right:100% anchors the line to the title's left edge; the 100vw
           overflow to the left is clipped by the section's overflow:hidden. */
        .work-bigtitle::before {
          content: '';
          position: absolute;
          top: 50%;
          right: 100%;
          width: 100vw;
          height: 2px;
          background: #383ce5;
        }

        .work-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2rem; }
        .work-stat { display: flex; flex-direction: column; gap: 0.35rem; text-align: center; align-items: center; }
        .work-stat:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.18); }

        @media (max-width: 860px) {
          .work-hero-row { grid-template-columns: 1fr; }
          .work-bigtitle { text-align: left; justify-self: start; }
          .work-stats { grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; }
          .work-stat:nth-child(2n) { border-right: none; }
          .work-stat { align-items: flex-start; text-align: left; }
        }
      `}</style>
    </section>
  )
}

/* ============ Coverflow category slider ============ */
function CategorySlider({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const n = categories.length
  const [dir, setDir] = useState(1)

  const go = (d: number) => {
    setDir(d)
    setActive((active + d + n) % n)
  }
  const jump = (i: number) => {
    if (i === active) return
    // shortest circular direction, for a natural slide
    let diff = i - active
    if (diff > n / 2) diff -= n
    if (diff < -n / 2) diff += n
    setDir(diff >= 0 ? 1 : -1)
    setActive(i)
  }

  // circular offset in range [-n/2, n/2]
  const offsetOf = (i: number) => {
    let off = i - active
    if (off > n / 2) off -= n
    if (off < -n / 2) off += n
    return off
  }

  return (
    <div className="cf">
      {/* Category title */}
      <div className="cf-title-wrap">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.h3
            key={categories[active].key}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, y: 14, x: d * 30 }),
              center: { opacity: 1, y: 0, x: 0 },
              exit: (d: number) => ({ opacity: 0, y: -14, x: d * -30 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="cf-title"
          >
            {categories[active].label}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* Stage */}
      <div className="cf-stage">
        {/* soft outer glow */}
        <div className="cf-glow" aria-hidden />
        {/* light-blue backing tray */}
        <div className="cf-tray" aria-hidden />

        {/* Arrows */}
        <button className="cf-arrow cf-arrow-prev" onClick={() => go(-1)} aria-label="Previous category" />
        <button className="cf-arrow cf-arrow-next" onClick={() => go(1)} aria-label="Next category" />

        {/* Cards */}
        <div className="cf-cards">
          {categories.map((c, i) => {
            const off = offsetOf(i)
            const abs = Math.abs(off)
            const visible = abs <= 1
            return (
              <motion.button
                key={c.key}
                className="cf-card"
                aria-label={`Select ${c.label}`}
                onClick={() => (off === 0 ? null : jump(i))}
                animate={{
                  x: `${off * 62}%`,
                  scale: off === 0 ? 1 : 0.8,
                  rotateY: off === 0 ? 0 : off < 0 ? 26 : -26,
                  opacity: visible ? (off === 0 ? 1 : 0.9) : 0,
                  zIndex: 10 - abs,
                  filter: off === 0 ? 'brightness(1)' : 'brightness(0.8)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
                style={{ pointerEvents: visible ? 'auto' : 'none', cursor: off === 0 ? 'default' : 'pointer' }}
              >
                <Image src={c.cover} alt={c.label} fill sizes="320px" className="cf-img" />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="cf-dots">
        {categories.map((c, i) => (
          <button
            key={c.key}
            onClick={() => jump(i)}
            aria-label={`Go to ${c.label}`}
            className="cf-dot"
            data-active={i === active}
          />
        ))}
      </div>

      <style>{`
        .cf { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
        .cf-title-wrap { height: 3.2rem; display: flex; align-items: center; }
        .cf-title {
          margin: 0;
          font-family: var(--font-bold); font-weight: 700;
          font-size: clamp(1.5rem, 3.5vw, 2.75rem);
          letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--foreground);
        }

        .cf-stage {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: clamp(300px, 40vw, 420px);
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1400px;
        }
        .cf-glow {
          position: absolute; inset: 4% 8%;
          background: radial-gradient(ellipse at center, rgba(56,60,229,0.30), transparent 68%);
          filter: blur(38px);
          z-index: 0;
        }
        .cf-tray {
          position: absolute;
          top: 12%; bottom: 12%;
          left: 12%; right: 12%;
          background: rgba(56,60,229,0.16);
          border: 1px solid rgba(56,60,229,0.14);
          border-radius: 28px;
          z-index: 1;
        }

        .cf-cards {
          position: relative;
          width: clamp(200px, 30vw, 300px);
          height: 100%;
          transform-style: preserve-3d;
          z-index: 3;
        }
        .cf-card {
          position: absolute;
          inset: 8% 0;
          margin: auto;
          width: 100%;
          border: none; padding: 0;
          border-radius: 22px;
          overflow: hidden;
          /* Same blue duotone treatment as the Services images */
          background: #383ce5;
          box-shadow: 0 30px 60px -22px rgba(56,60,229,0.55);
          transform-style: preserve-3d;
          will-change: transform;
        }
        .cf-img {
          object-fit: cover;
          mix-blend-mode: luminosity;
          opacity: 0.92;
        }

        /* Blue triangle arrows */
        .cf-arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 0; height: 0;
          background: transparent; border-style: solid; cursor: pointer;
          z-index: 6; padding: 0;
          transition: transform 0.25s ease, opacity 0.25s ease;
          opacity: 0.85;
          filter: drop-shadow(0 6px 12px rgba(56,60,229,0.4));
        }
        .cf-arrow:hover { opacity: 1; }
        .cf-arrow-prev {
          left: 0.5rem;
          border-width: 13px 20px 13px 0;
          border-color: transparent #383ce5 transparent transparent;
        }
        .cf-arrow-prev:hover { transform: translateY(-50%) translateX(-4px); }
        .cf-arrow-next {
          right: 0.5rem;
          border-width: 13px 0 13px 20px;
          border-color: transparent transparent transparent #383ce5;
        }
        .cf-arrow-next:hover { transform: translateY(-50%) translateX(4px); }

        .cf-dots { display: flex; gap: 0.5rem; }
        .cf-dot {
          width: 8px; height: 8px; border-radius: 5px; border: none; padding: 0;
          cursor: pointer; background: rgba(56,60,229,0.3);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .cf-dot[data-active="true"] { width: 26px; background: #383ce5; }

        @media (max-width: 560px) {
          .cf-tray { left: 6%; right: 6%; }
        }
      `}</style>
    </div>
  )
}

function ProjectCard({ project, delay = 0, className }: { project: typeof projects[0]; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="work-card" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="work-card-media">
          <motion.div style={{ position: 'absolute', inset: '-12% 0', y: imgY }}>
            <Image src={project.image} alt={project.title} fill sizes="(max-width: 900px) 50vw, 33vw" className="img-bw" style={{ objectFit: 'cover' }} />
          </motion.div>
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(245,243,238,0.8)', backgroundColor: 'rgba(13,13,13,0.5)', padding: '3px 8px' }}>
              — {project.number}
            </span>
          </div>
        </div>
        <div style={{ paddingTop: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.03em', textTransform: 'uppercase', margin: '0 0 0.2rem', color: 'var(--foreground)' }}>
              {project.title}
            </h3>
            <span className="label">{project.discipline}</span>
          </div>
          <span className="label">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  )
}

/* Brand statement — quote block, always shown */
function BrandStatement({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ backgroundColor: '#383ce5', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}
    >
      <span style={{ position: 'absolute', top: '1.25rem', left: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
        [ Ethos ]
      </span>
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.5, marginBottom: '0.75rem' }}>
          &quot;Every project begins with a single, sincere question.&quot;
        </p>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>— Blueism Studio</span>
      </div>
    </motion.div>
  )
}

/* CTA — wide band, always shown */
function CtaBlock({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="work-wide"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ backgroundColor: '#383ce5', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white', position: 'relative' }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
        [ Collaborations ]
      </span>
      <div>
        <h3 style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1, letterSpacing: '0.01em', textTransform: 'uppercase', margin: '0 0 1.25rem' }}>
          Have a vision for your brand?
        </h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 1.5rem', lineHeight: 1.6, maxWidth: '420px' }}>
          We translate complex brand philosophies into tactile spaces, systems, and product experiences.
        </p>
        <a
          href="#contact"
          style={{ display: 'inline-block', backgroundColor: 'white', color: '#383ce5', fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 1.5rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Start a project →
        </a>
      </div>
    </motion.div>
  )
}
