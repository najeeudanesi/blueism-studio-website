'use client'

import Link from 'next/link'
import { Magnetic, MediaFrame, useSectionTheme } from './motion'
import Squiggle from './squiggle'

export default function About() {
  const ref = useSectionTheme('white')

  return (
    <section id="about" ref={ref} className="relative overflow-x-clip bg-white px-5 py-24 md:px-10 md:py-36">
      {/* long squiggle winding across the whole section */}
      <Squiggle
        className="absolute -right-10 top-0 w-[70%] md:w-[52rem]"
        viewBox="0 0 800 700"
        path="M10 120 C 120 30, 260 90, 300 140 C 350 200, 500 130, 620 170 C 760 215, 700 320, 630 380 C 560 440, 700 520, 780 560 S 760 680, 700 690"
        drift={220}
        rotate={8}
        direction={-1}
      />

      <div className="relative z-10 mx-auto max-w-[1250px]">
        <h2 className="font-sans text-7xl font-900 tracking-tight text-ink md:text-9xl">
          About us
        </h2>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink md:text-lg">
          <em className="font-serif italic">Blueism</em> is a creative design studio dedicated to
          building distinctive and meaningful brand identities. We help transform ideas into
          memorable visual experiences through strategic thinking, creative concepts, and
          purposeful design. From developing unique brand identities to crafting cohesive visual
          systems, every project is approached with a focus on clarity, originality, and lasting
          impact. By combining thoughtful concepts, refined graphics, and strong design
          principles, Blueism creates brands that communicate with confidence, connect with
          their audience, and stand out in a competitive market. Whether you&apos;re launching a
          new business or redefining an existing one, Blueism delivers creative solutions that
          bring your vision to life and establish a strong, recognizable identity.
        </p>

        <div className="mt-16 flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
          <div className="relative">
            <div
              className="absolute -left-6 -top-4 h-[calc(100%+2rem)] w-[70%] bg-blue"
              aria-hidden
            />
            <MediaFrame
              src="/renders/cube.jpg"
              alt="Blue crystal cube on a lit surface"
              radius={4}
              className="h-52 w-80 md:h-64 md:w-[26rem]"
            />
          </div>

          <Magnetic>
            <Link href="#contact" className="pill-cta">
              <span className="pill-dot" aria-hidden />
              <span className="pill-label">– Our Approach</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
