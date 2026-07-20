'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Lusion-style living squiggle: the blue line draws itself in, drifts across
 * the screen as you scroll past, and undulates continuously.
 */
export default function Squiggle({
  className = '',
  path = 'M10 120 C 60 20, 140 20, 180 90 S 280 200, 330 110 S 390 40, 395 60',
  viewBox = '0 0 400 200',
  drift = 220,
  rotate = 24,
  direction = 1,
}: {
  className?: string
  path?: string
  viewBox?: string
  drift?: number
  rotate?: number
  direction?: 1 | -1
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 18, mass: 1.2 })

  const x = useTransform(smooth, [0, 1], [-drift * direction, drift * direction])
  const y = useTransform(smooth, [0, 1], [drift * 0.4, -drift * 0.4])
  const r = useTransform(smooth, [0, 1], [-rotate * direction, rotate * direction])
  const draw = useTransform(smooth, [0, 0.35], [0, 1])

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden>
      <motion.div
        style={{ x, y, rotate: r }}
        animate={{ y: [0, -14, 0, 10, 0], rotate: [0, 2.5, 0, -2.5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox={viewBox} fill="none" className="h-auto w-full overflow-visible">
          <motion.path
            d={path}
            stroke="#6063EA"
            strokeWidth="11"
            strokeLinecap="round"
            style={{ pathLength: draw }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
