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
    <section className="hero-container" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#0D0D0D' }}>
      
      {/* Background Videos (No changes to logic) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {/* Mobile video fallback */}
        <div className="mobile-video-fallback" style={{ display: 'none', width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=85"
            alt="Minimalist design interior space"
            fill
            className="img-bw-fixed"
            style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(0.65)' }}
            priority
          />
        </div>

        <video
          ref={videoRefA}
          muted
          playsInline
          controls={false}
          className="desktop-video"
          style={{ 
            objectFit: 'cover', 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            opacity: activeVideo === 'A' ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            filter: 'grayscale(100%) contrast(1.1) brightness(0.6)'
          }}
        >
          <source src="https://cdn.pixabay.com/video/2026/04/11/345893_large.mp4" type="video/mp4" />
        </video>

        <video
          ref={videoRefB}
          muted
          playsInline
          controls={false}
          className="desktop-video"
          style={{ 
            objectFit: 'cover', 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            opacity: activeVideo === 'B' ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            filter: 'grayscale(100%) contrast(1.1) brightness(0.6)'
          }}
        >
          <source src="https://cdn.pixabay.com/video/2026/04/11/345893_large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle overlay to soften transition and boost contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.7) 100%)', zIndex: 2 }} />

      {/* Main hero typography & bottom bar content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '3rem 4rem 3rem 4rem',
        boxSizing: 'border-box'
      }}>
        
        {/* Main Title typography overlay */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0px', width: 'fit-content' }}
        >
          <h1 style={{
            fontFamily: 'var(--font-bold)',
            fontWeight: 700,
            fontSize: 'clamp(5rem, 16vw, 13rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#EBEBEB',
            margin: 0,
          }}>
            BLUEISM
          </h1>
          <h2 style={{
            color: '#0000FF', 
            fontStyle: 'italic', 
            fontFamily: 'var(--font-display)', 
            fontWeight: 400, 
            fontSize: 'clamp(4.5rem, 14vw, 11rem)', 
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            marginTop: '-0.75rem',
            marginLeft: '0.1em',
            margin: 0,
            transform: 'skewX(-4deg)'
          }}>
            STUDIO
          </h2>
        </motion.div>

        {/* Bottom bar container */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '2rem', 
          marginTop: '3.5rem',
          width: '100%' 
        }}>
          {/* Metadata */}
          <p style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.65rem', 
            letterSpacing: '0.22em', 
            color: 'rgba(255,255,255,0.65)', 
            margin: 0, 
            textTransform: 'uppercase' 
          }}>
            MULTIDISCIPLINARY DESIGN &nbsp;·&nbsp; CASABLANCA
          </p>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'white',
                color: '#0000FF',
                fontFamily: 'var(--font-bold)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.9rem 1.8rem',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#0000FF'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#FFFFFF'
                e.currentTarget.style.color = '#0000FF'
              }}
            >
              Start a project &nbsp;&rarr;
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-container {
            padding: 1.5rem !important;
          }
          .hero-container > div {
            padding: 1.5rem 1.5rem 2rem 1.5rem !important;
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
