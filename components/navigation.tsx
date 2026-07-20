'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE, Magnetic, RollLabel, useSiteReady } from './motion'

const LINKS = [
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Journal', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Fixed nav that recolors itself via CSS vars as section themes flip
 * (blue sections → white text, light sections → blue text).
 */
export default function Navigation() {
  const { ready } = useSiteReady()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
      style={{ color: 'var(--nav-fg)', transition: 'color 0.5s ease' }}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Magnetic strength={0.25}>
          <Link href="/" className="flex items-center" aria-label="Blueism home">
            <Image
              src="/OFFICIAL-LOGO-BLUEISM-ICON.png"
              alt=""
              width={30}
              height={30}
              style={{ filter: 'var(--nav-logo-filter)', transition: 'filter 0.5s ease' }}
            />
          </Link>
        </Magnetic>
        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="text-[0.8rem] font-600 tracking-wide">
                <RollLabel>{l.label}</RollLabel>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="#contact" className="text-xs font-bold md:hidden">
          Contact
        </Link>
      </nav>
    </motion.header>
  )
}
