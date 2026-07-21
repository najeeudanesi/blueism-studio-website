'use client'

import { useSectionTheme } from './motion'
import Squiggle from './squiggle'

export default function GraphicDesign() {
  const themeRef = useSectionTheme('white')

  return (
    <section ref={themeRef} className="relative overflow-x-clip bg-white px-5 py-24 md:px-10 md:py-36">
      {/* the big squiggle sweeping through the whole section */}
      <Squiggle
        className="absolute -left-16 top-0 w-[85%] md:w-[60rem]"
        viewBox="0 0 900 420"
        path="M10 180 C 150 40, 480 30, 620 120 C 700 175, 660 260, 560 250 C 470 240, 480 340, 640 380 S 880 400, 895 340"
        drift={160}
        rotate={6}
      />

      <div className="relative z-10 mx-auto grid max-w-[1250px] grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-sans text-7xl font-medium leading-[1.05] tracking-tight text-blue md:text-9xl">
            Graphic
          </h2>
          <span className="block font-sans text-7xl font-medium leading-[1.05] tracking-tight text-blue md:text-9xl">
            Design
          </span>
          <p className="mt-10 text-base font-600 uppercase tracking-wide text-blue">
            You&apos;re the artist,
            <br />
            design!
          </p>
        </div>

        <div className="relative flex items-center gap-10">
          <p className="max-w-[15rem] text-sm leading-relaxed text-ink">
            Identity systems, editorial and print. We shape how a brand speaks — before it ever
            says a word — into something felt and real.
          </p>
          <div
            className="h-24 w-24 flex-none bg-blue md:h-32 md:w-32"
            data-cursor="view"
          />
        </div>
      </div>
    </section>
  )
}
