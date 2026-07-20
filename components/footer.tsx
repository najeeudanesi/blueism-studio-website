'use client'

import Link from 'next/link'
import { FadeUp, LineReveal, Magnetic, RollLabel, useSectionTheme } from './motion'

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.4Z" />
    </svg>
  )
}

/**
 * Lusion footer reveal: the white page sheet (with rounded bottom corners)
 * scrolls up off a footer that is fixed behind it via the clip-path trick.
 */
export default function Footer() {
  const ref = useSectionTheme('blue')

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative h-[85vh]"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="fixed bottom-0 left-0 flex h-[85vh] w-full flex-col justify-between bg-blue px-5 pb-10 pt-24 text-white md:px-10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-10 md:flex-row md:items-start">
          <div>
            <LineReveal as="p" className="text-2xl font-normal md:text-4xl">
              <a href="mailto:Info@blueism-studio.com">
                <RollLabel>Info@blueism-studio.com</RollLabel>
              </a>
            </LineReveal>
            <LineReveal as="p" delay={0.1} className="mt-3 text-2xl font-normal md:text-4xl">
              <a href="tel:+212123456789">
                <RollLabel>+212 123456789</RollLabel>
              </a>
            </LineReveal>
          </div>

          <FadeUp delay={0.2}>
            <div className="flex items-center gap-6">
              <Magnetic>
                <Link
                  href="https://instagram.com/blueismstudio"
                  aria-label="Instagram"
                  className="transition-opacity hover:opacity-70"
                >
                  <InstagramIcon />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="https://x.com/blueismstudio"
                  aria-label="X"
                  className="transition-opacity hover:opacity-70"
                >
                  <XIcon />
                </Link>
              </Magnetic>
            </div>
          </FadeUp>
        </div>

        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between">
          <p className="text-xs font-light tracking-wide text-white/85">
            Rabat, Agdal, Hay francais WTH PK
          </p>
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-white/50">
            © Blueism {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
