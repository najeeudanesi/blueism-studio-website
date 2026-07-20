'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Dreamlike cursor: a blue dot with a soft glow halo that trails behind it
 * on a much lazier spring, so every movement leaves a drifting afterglow.
 * Both grow over links/media (via [data-cursor] or interactive elements).
 */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const scale = useMotionValue(1)
  const sx = useSpring(x, { stiffness: 300, damping: 32 })
  const sy = useSpring(y, { stiffness: 300, damping: 32 })
  const sscale = useSpring(scale, { stiffness: 160, damping: 20 })
  // halo lags far behind — the dreamy trail
  const hx = useSpring(x, { stiffness: 70, damping: 18, mass: 0.8 })
  const hy = useSpring(y, { stiffness: 70, damping: 18, mass: 0.8 })
  const hscale = useSpring(scale, { stiffness: 60, damping: 16 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest('a, button, [data-cursor]')
      scale.set(interactive ? 3.2 : 1)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y, scale])

  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[199] h-10 w-10 rounded-full"
        style={{
          x: hx,
          y: hy,
          scale: hscale,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle at center, rgba(96,99,234,0.35), transparent 70%)',
          filter: 'blur(6px)',
        }}
        aria-hidden
      />
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[200] h-3 w-3 rounded-full bg-blue mix-blend-difference"
        style={{ x: sx, y: sy, scale: sscale, translateX: '-50%', translateY: '-50%' }}
        aria-hidden
      />
    </>
  )
}
