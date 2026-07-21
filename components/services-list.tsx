'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE_TEXT, useSectionTheme } from './motion'
import Squiggle from './squiggle'

const WORDS = ['Branding', 'Design', '3D', 'Software']

/** Small blue bracket glyph that springs to the active row */
function Glyph() {
  return (
    <svg viewBox="0 0 40 40" className="h-[0.35em] w-[0.35em]" fill="none" aria-hidden>
      <path
        d="M28 8 C 12 6, 8 14, 14 20 S 30 30, 20 34"
        stroke="#6063EA"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Giant service list — active row is ink black, the rest recede to gray;
 * the blue glyph follows the hovered row (Lusion list interaction).
 */
export default function ServicesList() {
  const ref = useSectionTheme('white')
  const [active, setActive] = useState(0)

  return (
    <section id="services" ref={ref} className="relative overflow-x-clip bg-white px-5 py-28 md:px-10 md:py-40">
      <Squiggle
        className="absolute -top-24 right-0 w-64 md:w-md"
        direction={-1}
        drift={240}
      />

      <ul className="relative z-10 mx-auto max-w-[1300px]">
        {WORDS.map((word, i) => (
          <li key={word} className="flex items-center gap-4 md:gap-8">
            {active === i && (
              <motion.span layoutId="service-glyph" className="giant-word flex-none" aria-hidden>
                <Glyph />
              </motion.span>
            )}
            <motion.span
              className="giant-word block cursor-default"
              onMouseEnter={() => setActive(i)}
              animate={{ color: active === i ? '#0A0A0A' : '#BDBDBD' }}
              transition={{ duration: 0.45, ease: EASE_TEXT }}
              data-cursor="view"
            >
              {word}
            </motion.span>
          </li>
        ))}
      </ul>
    </section>
  )
}
