'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A')
  const videoRefA = useRef<HTMLVideoElement>(null)
  const videoRefB = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

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

  /* ---------- Scroll-driven depth ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Title recedes into the page as you scroll away from the hero.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const titleRotateScroll = useTransform(scrollYProgress, [0, 1], [0, 20])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const barOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const barY = useTransform(scrollYProgress, [0, 1], [0, 60])
  // Video parallax — slow drift + gentle zoom for depth behind the type.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 90])

  /* ---------- Pointer-driven 3D tilt ---------- */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [14, -14]), { stiffness: 140, damping: 18, mass: 0.4 })
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18, mass: 0.4 })
  // Slight counter-shift on the video so the layers separate in depth.
  const bgShiftX = useSpring(useTransform(px, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 20 })
  const bgShiftY = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 20 })

  const handlePointer = (e: React.MouseEvent) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const resetPointer = () => {
    px.set(0)
    py.set(0)
  }

  const letters = 'BLUEISM'.split('')

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointer}
      onMouseLeave={resetPointer}
      className="hero-container"
      style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#0D0D0D' }}
    >

      {/* Background Videos — parallax layer */}
      <motion.div style={{ position: 'absolute', inset: '-6%', zIndex: 1, scale: videoScale, y: videoY, x: bgShiftX }}>
        <motion.div style={{ position: 'absolute', inset: 0, y: bgShiftY }}>
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
        </motion.div>
      </motion.div>

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

        {/* Main Title — scroll depth wrapper */}
        <motion.div
          style={{
            width: 'fit-content',
            perspective: 1000,
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
          }}
        >
          {/* Scroll tilt + pointer tilt, composed in 3D space */}
          <motion.h1
            style={{
              rotateX: rotX,
              rotateY: rotY,
              transformStyle: 'preserve-3d',
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(4rem, 16vw, 15rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#EBEBEB',
              margin: 0,
              display: 'flex',
            }}
          >
            {/* Extra scroll-driven forward tilt on the whole word */}
            <motion.span style={{ rotateX: titleRotateScroll, transformStyle: 'preserve-3d', display: 'flex' }}>
              {letters.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ rotateX: -95, opacity: 0, y: 60 }}
                  animate={{ rotateX: 0, opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.075, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Bottom bar container */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '3.5rem',
            width: '100%',
            opacity: barOpacity,
            y: barY,
          }}
        >
          {/* Metadata */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.65)',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            MULTIDISCIPLINARY DESIGN &nbsp;·&nbsp; CASABLANCA
          </motion.p>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'white',
                color: '#487ef8',
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
                e.currentTarget.style.backgroundColor = '#487ef8'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#FFFFFF'
                e.currentTarget.style.color = '#487ef8'
              }}
            >
              Start a project &nbsp;&rarr;
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: barOpacity, position: 'absolute', bottom: '1.5rem', left: '50%', x: '-50%', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        className="hero-scroll-cue"
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)' }}
        />
      </motion.div>

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
          .hero-scroll-cue {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
