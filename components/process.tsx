'use client'

import { useSectionTheme } from './motion'

/**
 * Giant numerals 1–4 with hairline rules.
 */
function Row({ n, last }: { n: number; last?: boolean }) {
  return (
    <li>
      <div className="py-6 md:py-10">
        <span className="block font-numeral text-[7rem] leading-[0.9] text-ink md:text-[11.5rem]">
          {n}
        </span>
      </div>
      {!last && <div className="h-px bg-ink" />}
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
