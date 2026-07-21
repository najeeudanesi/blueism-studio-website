'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE, Magnetic, RollLabel, SplitWords, useSectionTheme } from './motion'

/**
 * Gray hero — cloth render (cropped from the design file), blue "Blueism."
 * wordmark swinging up, rectangular Start a Project button.
 */
export default function Hero() {
  const themeRef = useSectionTheme('light')

  return (
    <section ref={themeRef} className="relative bg-hero-gray min-h-screen">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <img
          src="/renders/hero-cloth.jpg"
          alt="Draped cloth over a cube — Blueism 3D render"
          className="h-full w-full object-cover"
          data-cursor="view"
        />
      </div>

      <div className="relative z-10 flex h-full min-h-screen flex-col items-end justify-end px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto w-full max-w-[1700px] flex flex-col gap-8 pb-14 md:flex-row md:items-end md:justify-between md:pb-20"
        >
          <SplitWords
            as="h2"
            text="Blueism."
            className="font-sans text-[18vw] font-medium leading-none tracking-tight text-blue md:text-[9.5rem]"
          />
          <Magnetic>
            <Link href="#contact" className="btn-rect mb-3">
              <RollLabel>Start a Project</RollLabel>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
