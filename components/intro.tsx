'use client'

import { motion } from 'framer-motion'
import { EASE, SplitWords, useSectionTheme, useSiteReady } from './motion'

/**
 * Blue opening section — "Creative, Designing businesses from the ground up."
 * Revealed by the preloader wipe; wordmark swings up Lusion-style.
 */
export default function Intro() {
  const ref = useSectionTheme('blue')
  const { ready } = useSiteReady()

  return (
    <section
      ref={ref}
      className="relative flex h-svh flex-col items-center justify-center bg-blue px-6 text-white"
    >
      <motion.p
        initial={{ opacity: 0, y: 28 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="max-w-md text-center text-sm font-light leading-relaxed md:max-w-lg md:text-lg"
      >
        <em className="font-serif text-[1.35em] italic">Creative,</em> Designing businesses from
        the ground up.
        <br />
        from idea to identity, from screen to space.
      </motion.p>

      <SplitWords
        as="h1"
        text="Blueism."
        gate
        delay={0.4}
        className="mt-10 font-sans text-[17vw] font-light leading-none tracking-tight md:text-[8.5rem]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll to explore</span>
        <span className="nudge inline-block text-lg leading-none" aria-hidden>
          ↓
        </span>
      </motion.div>
    </section>
  )
}
