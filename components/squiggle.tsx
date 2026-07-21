'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Scroll-drawn decorative squiggle.
 *
 * The stroke is empty at rest and *draws itself* from its origin (the first
 * point of `path`, marked by the round cap) as the section scrolls up into
 * view — then retracts back to that same origin as you scroll away. So it
 * reads as a deliberate, directional gesture rather than static wallpaper.
 *
 * Layering: the wrapper sits on `z-0`, so it always crosses *behind* the
 * section's `relative z-10` content (headings, copy, media).
 */
export default function Squiggle({
  className = '',
  path = 'M10 120 C 60 20, 140 20, 180 90 S 280 200, 330 110 S 390 40, 395 60',
  viewBox = '0 0 400 200',
  strokeWidth = 22,
  color = '#6063EA',
}: {
  className?: string
  path?: string
  viewBox?: string
  strokeWidth?: number
  color?: string
  drift?: number
  rotate?: number
  direction?: 1 | -1
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Travel of this squiggle through the viewport: 0 as its top edge enters
  // from the bottom of the screen, 1 once it reaches the vertical center.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  // Draw the line across that travel, then hold it fully drawn. Reversing the
  // scroll runs this back down to 0, so the line "un-draws" on the way up.
  const draw = useTransform(scrollYProgress, [0, 0.85], [0, 1])
  const pathLength = useSpring(draw, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <div ref={ref} className={`pointer-events-none z-0 ${className}`} aria-hidden>
      <svg viewBox={viewBox} fill="none" className="h-auto w-full overflow-visible">
        <motion.path
          d={path}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          style={{ pathLength }}
        />
      </svg>
    </div>
  )
}
