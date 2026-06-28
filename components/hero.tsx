'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A')
  const videoRefA = useRef<HTMLVideoElement>(null)
  const videoRefB = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoA = videoRefA.current
    const videoB = videoRefB.current
    if (!videoA || !videoB) return

    // Pre-start video A
    videoA.play().catch(() => {})

    const interval = setInterval(() => {
      if (activeVideo === 'A') {
        if (videoA.duration && videoA.currentTime >= videoA.duration - 1.8) {
          // Start playing B in the background
          videoB.currentTime = 0
          videoB.play().then(() => {
            setActiveVideo('B')
          }).catch(() => {})
        }
      } else {
        if (videoB.duration && videoB.currentTime >= videoB.duration - 1.8) {
          // Start playing A in the background
          videoA.currentTime = 0
          videoA.play().then(() => {
            setActiveVideo('A')
          }).catch(() => {})
        }
      }
    }, 150)

    return () => clearInterval(interval)
  }, [activeVideo])

  return (
    <section className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* LEFT PANEL — Blue with logo text + vertical text (Desktop only) */}
      <div className="hero-left-panel" style={{ backgroundColor: '#0000FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem', position: 'relative', overflow: 'hidden', zIndex: 10 }}>

        {/* Big square logo text info (Logo mark image removed) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-bold)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Est. 2021 · Casablanca
            </span>
          </div>
        </motion.div>

        {/* Vertical STUDIO text — center marquee */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            width: '100vh',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <div className="hero-marquee" style={{ display: 'flex', gap: '6rem', paddingRight: '6rem' }}>
            <span className="marquee-item">BLUEISM STUDIO</span>
            <span className="marquee-item">BLUEISM STUDIO</span>
            <span className="marquee-item">BLUEISM STUDIO</span>
          </div>
          <div className="hero-marquee" style={{ display: 'flex', gap: '6rem', paddingRight: '6rem' }} aria-hidden>
            <span className="marquee-item">BLUEISM STUDIO</span>
            <span className="marquee-item">BLUEISM STUDIO</span>
            <span className="marquee-item">BLUEISM STUDIO</span>
          </div>
        </div>

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
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.8, maxWidth: '180px', marginBottom: '1rem' }}>
            Form follows feeling<br />الشعور يوجه الشكل
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#0000FF',
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.75rem 1.25rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              width: 'fit-content'
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start a project →
          </a>
        </motion.div>
      </div>

      {/* RIGHT PANEL — Media (Video/Static Fallback) + big headline */}
      <div className="hero-right-panel" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0D0D0D' }}>
        {/* Full-bleed Media */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          
          {/* Static image thumbnail on mobile fallback to avoid black screens */}
          <div className="mobile-video-fallback" style={{ display: 'none', width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <Image
              src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=85"
              alt="Minimalist design interior space"
              fill
              className="img-bw-fixed"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          <video
            ref={videoRefA}
            muted
            playsInline
            controls={false}
            className="img-bw-fixed desktop-video"
            style={{ 
              objectFit: 'cover', 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none',
              position: 'absolute',
              inset: 0,
              opacity: activeVideo === 'A' ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          >
            <source src="https://cdn.pixabay.com/video/2026/04/11/345893_large.mp4" type="video/mp4" />
          </video>

          <video
            ref={videoRefB}
            muted
            playsInline
            controls={false}
            className="img-bw-fixed desktop-video"
            style={{ 
              objectFit: 'cover', 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none',
              position: 'absolute',
              inset: 0,
              opacity: activeVideo === 'B' ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          >
            <source src="https://cdn.pixabay.com/video/2026/04/11/345893_large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark gradient bottom overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(13,13,13,0.85) 100%)', zIndex: 2 }} />

        {/* Registration marks */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '14px', height: '14px', borderTop: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '14px', height: '14px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 3 }} />

        {/* Mobile-only logo float (Logo mark image removed) */}
        <div className="mobile-logo-overlay" style={{ display: 'none', position: 'absolute', top: '5.5rem', left: '1.5rem', zIndex: 10, alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-bold)', fontSize: '0.9rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Blueism
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
            Blueism<br />
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
        .hero-marquee {
          animation: marqueeScroll 25s linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee-item {
          font-family: var(--font-bold);
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }
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
          .desktop-video {
            display: none !important;
          }
          .mobile-video-fallback {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
