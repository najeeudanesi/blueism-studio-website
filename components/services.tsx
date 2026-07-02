'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface Service {
  num: string
  slug: string
  name: string
  tag: string
  desc: string
  images: [string, string]
}

const services: Service[] = [
  {
    num: '1',
    slug: 'graphic-design',
    name: 'Graphic Design',
    tag: 'Identity · Print · Systems',
    desc: 'Identity systems, editorial and print. We shape how a brand speaks — before it ever says a word — into something felt and real.',
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80',
    ],
  },
  {
    num: '2',
    slug: 'interior-design',
    name: 'Interior Design',
    tag: 'Space · Form · Light',
    desc: 'Spaces designed as experiences. Raw material, filtered light and a quiet sense of intention shape every room we imagine.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
    ],
  },
  {
    num: '3',
    slug: '3d-design',
    name: '3D Design',
    tag: 'Spatial · Visualization',
    desc: 'Visualization and CGI that give ideas weight, texture and presence — long before they physically exist in the world.',
    images: [
      'https://images.unsplash.com/photo-1633355444132-695d5876cd00?w=900&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80',
    ],
  },
  {
    num: '4',
    slug: 'software',
    name: 'Software',
    tag: 'Digital · Systems',
    desc: 'Design-led engineering. Interfaces and systems built to feel as considered and intentional as they are functional.',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80',
    ],
  },
  {
    num: '5',
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    tag: 'Interface · Interaction',
    desc: 'Interfaces built around people. Clear, tactile and effortless to move through — creativity you can actually touch.',
    images: [
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=900&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&q=80',
    ],
  },
]

export default function Services() {
  const [active, setActive] = useState(0)

  const scrollTo = (slug: string) => {
    document.getElementById(`svc-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="services"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Soft transition veil from the dark hero into the light section */}
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '45vh',
          background: 'linear-gradient(to bottom, #0D0D0D 0%, rgba(13,13,13,0.35) 40%, rgba(255,254,236,0) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem 2.5rem', position: 'relative', zIndex: 2 }}>

        {/* ===== INTRO — "WE CREATE?" pointer header ===== */}
        <WeCreateHeader />

        {/* Intro copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ margin: '0 0 0.75rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-bold)', fontWeight: 600, color: '#487ef8',
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', lineHeight: 1.55, margin: 0,
            maxWidth: '560px', textAlign: 'left',
          }}>
            Blueism is a creative studio that brings your ideas to life and fulfils your dream
            identity — an experience where we enhance your creativity into something much bigger
            than a picture, but something felt and real.
          </p>
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
            color: 'rgba(72,126,248,0.7)', fontSize: '1.05rem', marginTop: '0.9rem', marginBottom: 0,
            textAlign: 'center',
          }}>
            Start your journey by knowing our services — which are many.
          </p>
        </motion.div>

        {/* ===== SERVICES title + quick-nav list ===== */}
        <div className="svc-hero-row">
          {/* Quick navigation list */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
          >
            {services.map((s, i) => (
              <motion.li
                key={s.slug}
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
              >
                <button
                  onClick={() => scrollTo(s.slug)}
                  className="svc-nav-item"
                  data-active={active === i}
                  aria-label={`Jump to ${s.name}`}
                >
                  <span className="svc-nav-dot" aria-hidden />
                  <span className="svc-nav-num">{s.num}.</span>
                  <span className="svc-nav-name">{s.name}</span>
                  <span className="svc-nav-arrow" aria-hidden>→</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Giant SERVICES wordmark */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.94, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="svc-bigtitle"
          >
            SERVICES
          </motion.h2>
        </div>

        {/* ===== Service blocks ===== */}
        <div style={{ marginTop: '0.5rem' }}>
          {services.map((s, i) => (
            <ServiceBlock
              key={s.slug}
              service={s}
              index={i}
              reverse={i % 2 === 1}
              onActive={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .svc-hero-row {
          display: grid;
          grid-template-columns: 0.9fr 1.6fr;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .svc-bigtitle {
          font-family: var(--font-bold);
          font-weight: 700;
          font-size: clamp(3.5rem, 13vw, 12rem);
          line-height: 0.85;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #383ce5;
          margin: 0;
          text-align: right;
          text-shadow: 0 18px 40px rgba(56,60,229,0.20);
        }
        .svc-nav-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem 0;
          text-align: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-nav-item:hover { transform: translateX(8px); }
        .svc-nav-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #487ef8; flex-shrink: 0;
          transform: scale(0.55);
          opacity: 0.35;
          transition: all 0.3s ease;
        }
        .svc-nav-item:hover .svc-nav-dot,
        .svc-nav-item[data-active="true"] .svc-nav-dot {
          transform: scale(1); opacity: 1;
          box-shadow: 0 0 0 4px rgba(72,126,248,0.15);
        }
        .svc-nav-num {
          font-family: var(--font-mono); font-size: 0.8rem;
          color: rgba(72,126,248,0.5); flex-shrink: 0;
        }
        .svc-nav-name {
          font-family: var(--font-bold); font-weight: 700;
          font-size: clamp(1rem, 1.6vw, 1.35rem);
          text-transform: uppercase; letter-spacing: 0.02em;
          color: var(--foreground);
          transition: color 0.3s ease;
        }
        .svc-nav-item:hover .svc-nav-name,
        .svc-nav-item[data-active="true"] .svc-nav-name { color: #487ef8; }
        .svc-nav-arrow {
          margin-left: auto; color: #487ef8; font-size: 0.9rem;
          opacity: 0; transform: translateX(-6px);
          transition: all 0.3s ease;
        }
        .svc-nav-item:hover .svc-nav-arrow,
        .svc-nav-item[data-active="true"] .svc-nav-arrow { opacity: 1; transform: translateX(0); }

        /* Service block layout */
        .svc-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
          align-items: stretch;
          min-height: 380px;
          padding: 1.5rem 0 2rem;
          border-top: 1.5px solid rgba(72,126,248,0.3);
          scroll-margin-top: 80px;
        }
        .svc-block-text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .svc-block-media { align-self: start; }
        .svc-block.reverse .svc-block-text { order: 2; }
        .svc-block.reverse .svc-block-media { order: 1; }
        .svc-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .svc-img-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #487ef8;
          box-shadow: 0 20px 40px -18px rgba(72,126,248,0.45);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
        }
        .svc-img-wrap:hover {
          transform: translateY(-8px);
          box-shadow: 0 34px 60px -20px rgba(72,126,248,0.6);
        }
        .svc-duotone {
          object-fit: cover;
          mix-blend-mode: luminosity;
          opacity: 0.92;
          transition: mix-blend-mode 0.5s ease, opacity 0.5s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-img-wrap:hover .svc-duotone {
          mix-blend-mode: normal;
          opacity: 1;
          transform: scale(1.05);
        }

        @media (max-width: 860px) {
          .svc-hero-row { grid-template-columns: 1fr; }
          .svc-bigtitle { text-align: left; }
          .svc-block { grid-template-columns: 1fr; gap: 1.75rem; padding: 2.5rem 0; min-height: 0; }
          .svc-block-text { gap: 1.5rem; }
          .svc-block.reverse .svc-block-text { order: 1; }
          .svc-block.reverse .svc-block-media { order: 2; }
          .svc-number { align-self: flex-start !important; }
        }
      `}</style>
    </section>
  )
}

/* ============ On-view typewriter (service descriptions) ============ */
function TypeOnView({ text, style }: { text: string; style: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [count, setCount] = useState(0)
  const done = count >= text.length

  // Once the paragraph enters view, type it out on its own cadence.
  useEffect(() => {
    if (!inView || done) return
    const t = setTimeout(() => setCount((c) => c + 1), 18)
    return () => clearTimeout(t)
  }, [inView, count, done])

  return (
    <p ref={ref} style={{ ...style, position: 'relative' }}>
      {text.slice(0, count)}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.05em',
          background: '#383ce5',
          verticalAlign: 'text-bottom',
          marginLeft: '2px',
          transform: 'translateY(3px)',
        }}
      />
      {/* Reserve the full paragraph height to avoid layout shift while typing */}
      <span aria-hidden style={{ color: 'transparent' }}>{text.slice(count)}</span>
    </p>
  )
}

/* ============ "WE CREATE?" typewriter + selection header ============ */
function WeCreateHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const full = 'We Create?'
  const [count, setCount] = useState(0)
  const done = count >= full.length

  useEffect(() => {
    if (!inView || done) return
    const t = setTimeout(() => setCount((c) => c + 1), 105)
    return () => clearTimeout(t)
  }, [inView, count, done])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 1.5rem' }}
    >
      {/* Text wrapper — highlight + handles anchor to this exact box */}
      <div style={{ position: 'relative', padding: '0.4rem 0.75rem' }}>
        {/* Text-selection highlight — sweeps in like a drag-select once typed */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={done ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', inset: 0, transformOrigin: 'left',
            background: 'rgba(72,126,248,0.20)', zIndex: 0,
          }}
        />

        {/* Selection handles (appear once selected) */}
        {done && <SelectionHandle position="start" />}
        {done && <SelectionHandle position="end" />}

        <h2 style={{
          position: 'relative', zIndex: 1,
          fontFamily: 'var(--font-bold)', fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3.75rem)',
          letterSpacing: '0.02em', textTransform: 'uppercase',
          color: 'var(--foreground)', margin: 0, lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          {full.slice(0, count)}
          {!done && (
            <motion.span
              aria-hidden
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block', width: '3px', height: '0.95em', background: '#487ef8', verticalAlign: 'text-bottom', marginLeft: '2px' }}
            />
          )}
          {/* Reserve final width to avoid layout shift while typing */}
          <span style={{ color: 'transparent' }} aria-hidden>{full.slice(count)}</span>
        </h2>
      </div>
    </motion.div>
  )
}

function SelectionHandle({ position }: { position: 'start' | 'end' }) {
  const isStart = position === 'start'
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.25 }}
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: isStart ? 'column' : 'column-reverse',
        alignItems: 'center',
        zIndex: 2,
        ...(isStart
          ? { top: 0, left: 0, transform: 'translate(-50%, -100%)' }
          : { bottom: 0, right: 0, transform: 'translate(50%, 100%)' }),
      }}
    >
      <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#487ef8' }} />
      <span style={{ width: 2, height: 15, background: '#487ef8' }} />
    </motion.div>
  )
}

/* ============ Individual service block ============ */
function ServiceBlock({ service, index, reverse, onActive }: { service: Service; index: number; reverse: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, margin: '-20% 0px -20% 0px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Independent depth layers — each moves at its own rate so the block reads
  // as stacked planes (text nearest → images → number deepest) rather than a
  // single flat card. No rotation, so nothing bends.
  const numberY = useTransform(scrollYProgress, [0, 1], [110, -110])
  const textY = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const imgYNear = useTransform(scrollYProgress, [0, 1], [70, -70])
  const imgYFar = useTransform(scrollYProgress, [0, 1], [24, -24])

  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])

  const text = (
    <div className="svc-block-text">
      {/* Top group — label, title, description, tag (nearest plane) */}
      <motion.div style={{ y: textY }}>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-bold)', fontWeight: 700,
            fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
            lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: 'uppercase',
            color: '#383ce5', margin: '0 0 0.85rem',
          }}
        >
          {service.name}
        </motion.h3>

        <TypeOnView
          text={service.desc}
          style={{
            fontFamily: 'var(--font-bold)', fontWeight: 500,
            fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.6,
            color: 'rgba(13,13,13,0.75)', maxWidth: '420px', margin: 0,
          }}
        />

        <span style={{ display: 'inline-block', marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(72,126,248,0.55)' }}>
          {service.tag}
        </span>
      </motion.div>

      {/* Giant parallax number — deepest plane, alternating outer edge */}
      <motion.div
        className="svc-number"
        style={{
          y: numberY,
          alignSelf: reverse ? 'flex-end' : 'flex-start',
          fontFamily: 'var(--font-bold)', fontWeight: 700,
          fontSize: 'clamp(7rem, 16vw, 15rem)',
          lineHeight: 0.8, color: '#383ce5', marginTop: '1rem',
          textShadow: '0 20px 45px rgba(56,60,229,0.28)',
        }}
      >
        {service.num}
      </motion.div>
    </div>
  )

  const media = (
    <div className="svc-block-media">
      <div className="svc-images">
        {service.images.map((src, i) => (
          // Outer layer carries the parallax offset (its own depth); the inner
          // wrapper keeps opacity reveal + the CSS hover lift, uncontested.
          <motion.div key={src} style={{ y: i === 0 ? imgYNear : imgYFar }}>
            <motion.div
              className="svc-img-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={src} alt={`${service.name} — ${i + 1}`} fill className="svc-duotone" sizes="(max-width: 860px) 45vw, 22vw" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div ref={ref} id={`svc-${service.slug}`} className={`svc-block${reverse ? ' reverse' : ''}`}>
      {text}
      {media}
    </div>
  )
}
