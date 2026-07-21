'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_TEXT, useSectionTheme } from './motion'
import Squiggle from './squiggle'

const HEADLINE = 'WE CREATE?'
const TYPE_MS = 95 // per-character cadence
const START_DELAY_MS = 250 // beat before the first keystroke

/**
 * "WE CREATE?" — reads as text being typed, then selected.
 *
 * The first time the headline scrolls into view it types itself out one
 * character at a time behind a blinking caret. When the last key lands, the
 * caret vanishes and the selection highlight drag-sweeps across it while the
 * two blue selection handles pop in at the corners.
 */
export default function WeCreate() {
  const ref = useSectionTheme('white')
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(h2Ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  const [count, setCount] = useState(0)
  const typed = HEADLINE.slice(0, count)
  const doneTyping = count >= HEADLINE.length

  useEffect(() => {
    if (!inView || doneTyping) return
    if (reduce) {
      setCount(HEADLINE.length) // no motion: reveal the finished headline
      return
    }
    const t = setTimeout(
      () => setCount((c) => c + 1),
      count === 0 ? START_DELAY_MS : TYPE_MS,
    )
    return () => clearTimeout(t)
  }, [inView, reduce, count, doneTyping])

  return (
    <section ref={ref} className="relative overflow-x-clip bg-white px-5 py-32 text-center md:px-10 md:py-44">
      <Squiggle
        className="absolute -left-24 top-0 w-72 md:w-[30rem]"
        viewBox="0 0 400 520"
        path="M240 10 C 60 90, 130 200, 60 290 S 120 470, 380 500"
        drift={200}
        rotate={10}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <h2
          ref={h2Ref}
          className="relative inline-block px-4 py-2 font-sans text-5xl font-extralight tracking-[0.12em] text-ink md:text-7xl"
        >
          {/* selection highlight — drag-sweeps in after typing */}
          <motion.span
            className="absolute inset-0 origin-left bg-[#D7D7EB]"
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={doneTyping ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_TEXT }}
          />
          {/* selection handles — pop in just behind the highlight */}
          <motion.span
            className="absolute -left-1 -top-3 h-5 w-[3px] bg-blue before:absolute before:-left-[3.5px] before:-top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-blue before:content-['']"
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            animate={doneTyping ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.3, delay: doneTyping ? 0.28 : 0, ease: EASE_TEXT }}
          />
          <motion.span
            className="absolute -bottom-3 -right-1 h-5 w-[3px] bg-blue after:absolute after:-bottom-2 after:-left-[3.5px] after:h-2.5 after:w-2.5 after:rounded-full after:bg-blue after:content-['']"
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            animate={doneTyping ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.3, delay: doneTyping ? 0.28 : 0, ease: EASE_TEXT }}
          />

          {/* text: reserve the final geometry, then type over it */}
          <span className="relative inline-block">
            {/* holds the finished width so nothing reflows while typing */}
            <span className="invisible" aria-hidden>
              {HEADLINE}
            </span>
            {/* the visible keystrokes + caret (partial text → hidden from AT) */}
            <span
              className="absolute inset-0 flex items-center whitespace-pre"
              aria-hidden
              data-typed={typed}
            >
              {typed}
              {inView && !doneTyping && (
                <motion.span
                  className="ml-[3px] inline-block h-[0.85em] w-[3px] bg-blue"
                  aria-hidden
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
                />
              )}
            </span>
            {/* real accessible label */}
            <span className="sr-only">{HEADLINE}</span>
          </span>
        </h2>

        <motion.p
          className="mx-auto mt-10 max-w-xl text-sm font-bold leading-relaxed text-blue md:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_TEXT }}
        >
          Blueism is a creative studio that brings your ideas to life and fulfils your dream
          identity — an experience where we enhance your creativity into something much bigger
          than a picture, but something felt and real.
        </motion.p>

        <motion.p
          className="mt-8 text-lg text-blue md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE_TEXT }}
        >
          Start your journey by knowing our services — which are many.
        </motion.p>
      </div>
    </section>
  )
}
