'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Dreamlike scroll foundation:
 * - heavy, oceanic Lenis glide (long duration, low lerp — the page floats)
 * - velocity-driven soft focus on #page-warp: while scrolling the sheet
 *   gently recedes, tilts and blurs like a depth-of-field pull, then
 *   drifts back into focus as the scroll settles
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

    const el = document.getElementById('page-warp') as HTMLElement | null
    if (el) {
      el.style.willChange = 'transform, filter'
      el.style.transformOrigin = '50% 50%'
    }

    let velocity = 0
    let smooth = 0
    let progress = 0
    let blurApplied = false
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    lenis.on('scroll', ({ velocity: v, progress: p }: { velocity: number; progress: number }) => {
      velocity = v
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

      // slow settle toward live velocity — the warp lags the scroll dreamily
      smooth += (velocity - smooth) * 0.055
      velocity *= 0.92

      if (el && !reduced) {
        const mag = Math.abs(smooth)
        // recede + soft tilt + lateral sway — no hard skew
        const scale = 1 - Math.min(mag * 0.0013, 0.04)
        const tilt = Math.max(-1.4, Math.min(1.4, smooth * 0.075))
        const sway = Math.sin(time * 0.0005) * Math.min(mag * 0.35, 6)
        el.style.transform = `perspective(1400px) rotateX(${tilt}deg) translateX(${sway}px) scale(${scale})`

        // depth-of-field pull: blur rises with velocity, capped low for perf
        const blur = Math.min(mag * 0.085, 3)
        if (blur > 0.15) {
          el.style.filter = `blur(${blur.toFixed(2)}px)`
          blurApplied = true
        } else if (blurApplied) {
          el.style.filter = ''
          blurApplied = false
        }
      }

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
