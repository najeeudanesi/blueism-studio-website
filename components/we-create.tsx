'use client'

import { useSectionTheme } from './motion'
import Squiggle from './squiggle'

/**
 * "WE CREATE?" — rendered as a text selection: the highlight box drag-selects
 * across the headline, then the two blue selection handles pop in.
 */
export default function WeCreate() {
  const ref = useSectionTheme('white')

  return (
    <section ref={ref} className="relative overflow-x-clip bg-white px-5 py-32 text-center md:px-10 md:py-44">
      <Squiggle
        className="absolute -left-24 top-0 w-72 md:w-[30rem]"
        viewBox="0 0 400 520"
        path="M240 10 C 60 90, 130 200, 60 290 S 120 470, 380 500"
        drift={200}
        rotate={10}
      />

      <div className="relative mx-auto max-w-2xl">
        <h2 className="relative inline-block px-4 py-2 font-sans text-5xl font-extralight tracking-[0.12em] text-ink md:text-7xl">
          {/* selection highlight */}
          <span className="absolute inset-0 bg-[#D7D7EB]" aria-hidden />
          {/* selection handles */}
          <span
            className="absolute -left-1 -top-3 h-5 w-[3px] bg-blue before:absolute before:-left-[3.5px] before:-top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-blue before:content-['']"
            aria-hidden
          />
          <span
            className="absolute -bottom-3 -right-1 h-5 w-[3px] bg-blue after:absolute after:-bottom-2 after:-left-[3.5px] after:h-2.5 after:w-2.5 after:rounded-full after:bg-blue after:content-['']"
            aria-hidden
          />
          <span className="relative">WE CREATE?</span>
        </h2>

        <p className="mx-auto mt-10 max-w-xl text-sm font-bold leading-relaxed text-blue md:text-base">
          Blueism is a creative studio that brings your ideas to life and fulfils your dream
          identity — an experience where we enhance your creativity into something much bigger
          than a picture, but something felt and real.
        </p>

        <p className="mt-8 text-lg text-blue md:text-xl">
          Start your journey by knowing our services — which are many.
        </p>
      </div>
    </section>
  )
}
