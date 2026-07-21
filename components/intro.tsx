'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SplitWords, useSectionTheme, useSiteReady } from './motion'

type Segment = { text: string; em?: boolean } | { break: true }
type Unit = { char: string; em: boolean } | { break: true }

const SEGMENTS: Segment[] = [
  { text: 'Creative,', em: true },
  { text: ' Designing businesses from the ground up.' },
  { break: true },
  { text: 'from idea to identity, from screen to space.' },
]

const UNITS: Unit[] = SEGMENTS.flatMap((seg) =>
  'break' in seg ? [{ break: true } as Unit] : [...seg.text].map((char) => ({ char, em: !!seg.em }))
)

const FULL_TEXT = SEGMENTS.map((seg) => ('break' in seg ? ' ' : seg.text)).join('')

/** Types the intro paragraph out character by character on first load. */
function TypedParagraph({ className = '' }: { className?: string }) {
  const { ready } = useSiteReady()
  const [count, setCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (!ready) return
    let i = 0
    const step = () => {
      i += 1
      setCount(i)
      if (i >= UNITS.length) return
      const u = UNITS[i - 1]
      let delay = 26
      if ('break' in u) delay += 200
      else if (u.char === ',' || u.char === '.') delay += 260
      timerRef.current = setTimeout(step, delay)
    }
    timerRef.current = setTimeout(step, 500)
    return () => clearTimeout(timerRef.current)
  }, [ready])

  const nodes: React.ReactNode[] = []
  let buffer = ''
  let bufferEm = false
  let key = 0
  const flush = () => {
    if (!buffer) return
    nodes.push(
      bufferEm ? (
        <em key={key++} className="font-serif text-[1.35em] italic">
          {buffer}
        </em>
      ) : (
        <span key={key++}>{buffer}</span>
      )
    )
    buffer = ''
  }
  for (let i = 0; i < count && i < UNITS.length; i++) {
    const u = UNITS[i]
    if ('break' in u) {
      flush()
      nodes.push(<br key={key++} />)
    } else {
      if (u.em !== bufferEm) flush()
      bufferEm = u.em
      buffer += u.char
    }
  }
  flush()

  const done = count >= UNITS.length

  return (
    <p className={className} aria-label={FULL_TEXT}>
      <span aria-hidden>
        {nodes}
        {!done && <span className="typewriter-caret" aria-hidden>|</span>}
      </span>
    </p>
  )
}

/**
 * Blue opening section — "Creative, Designing businesses from the ground up."
 */
export default function Intro() {
  const ref = useSectionTheme('blue')
  // tracks scroll across the one viewport-height this section occupies
  const { scrollYProgress } = useScroll({ target: ref, offset: ['end end', 'end start'] })
  // holds steady, then dissolves + settles back as Hero rises into view
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.94])

  return (
    <section
      ref={ref}
      className="relative flex h-svh flex-col items-center justify-center bg-blue px-6 text-white"
    >
      <motion.div
        style={{ opacity, scale }}
        className="flex flex-col items-center"
      >
        <TypedParagraph className="max-w-lg text-center text-base font-light leading-relaxed md:max-w-2xl md:text-xl" />

        <SplitWords
          as="h1"
          text="Blueism."
          className="mt-10 font-sans text-[19vw] font-light leading-none tracking-tight md:text-[10rem]"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll to explore</span>
        <span className="inline-block text-lg leading-none" aria-hidden>
          ↓
        </span>
      </motion.div>
    </section>
  )
}
