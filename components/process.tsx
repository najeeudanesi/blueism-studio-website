'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE_MASK, LineReveal, useSectionTheme } from './motion'

/**
 * Giant numerals 1–4 with hairline rules — numbers drift laterally with
 * scroll (alternating directions) so the section stays alive.
 */
function Row({ n, last }: { n: number; last?: boolean }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], n % 2 ? ['0%', '6%'] : ['4%', '-2%'])

  return (
    <li ref={ref}>
      <div className="py-6 md:py-10">
        <LineReveal>
          <motion.span
            style={{ x }}
            className="block font-numeral text-[6rem] leading-[0.9] text-ink md:text-[10rem]"
          >
            {n}
          </motion.span>
        </LineReveal>
      </div>
      {!last && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE_MASK }}
          className="h-px origin-left bg-ink"
        />
      )}
    </li>
  )
}

export default function Process() {
  const ref = useSectionTheme('white')
  return (
    <section ref={ref} className="bg-white px-5 pb-24 pt-4 md:px-10 md:pb-36">
      <ul className="mx-auto max-w-[1250px]">
        {[1, 2, 3, 4].map((n, i, a) => (
          <Row key={n} n={n} last={i === a.length - 1} />
        ))}
      </ul>
    </section>
  )
}
