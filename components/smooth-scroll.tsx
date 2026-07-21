'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Smooth-scroll foundation:
 * - Lenis inertia scrolling
 * - custom scrollbar thumb that fades in while scrolling
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      lerp: 0.055,
      smoothWheel: !reduced,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.3,
    })

    let progress = 0
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    lenis.on('scroll', ({ progress: p }: { progress: number }) => {
      progress = p
      const track = trackRef.current
      if (track) {
        track.classList.add('is-scrolling')
        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => track.classList.remove('is-scrolling'), 900)
      }
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)

      const thumb = thumbRef.current
      if (thumb) {
        const travel = (trackRef.current?.clientHeight ?? 0) * 0.72
        thumb.style.transform = `translateY(${progress * travel}px)`
      }

      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {children}
      <div ref={trackRef} className="scrollbar-track" aria-hidden>
        <div ref={thumbRef} className="scrollbar-thumb" />
      </div>
    </>
  )
}
