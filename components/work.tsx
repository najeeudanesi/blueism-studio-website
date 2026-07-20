'use client'

import Link from 'next/link'
import { FadeUp, LineReveal, MediaFrame, useSectionTheme } from './motion'

/**
 * Work grid — rounded 20px tiles (house radius), curtain reveals,
 * hover zoom inside the mask. Meta separators per the design file.
 */
const PROJECTS = [
  { name: '', href: '/work/suits' },
  { name: '', href: '/work/manarah' },
  { name: 'PRINGLES', href: '/work/suits' },
  { name: 'GYMSHARK', href: '/work/manarah' },
]

function Meta() {
  return (
    <p className="meta-label mt-4 text-ink">
      WEB <span className="text-blue">’</span> DESIGN <span className="text-blue">’</span>{' '}
      DEVELOPMENT <span className="text-blue">’</span> 3D
    </p>
  )
}

export default function Work() {
  const ref = useSectionTheme('white')

  return (
    <section id="work" ref={ref} className="bg-white px-5 pb-32 pt-16 md:px-10 md:pb-44 md:pt-24">
      <div className="mx-auto grid max-w-[1250px] grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-24">
        {PROJECTS.map((p, i) => (
          <FadeUp key={i} delay={(i % 2) * 0.12}>
            <Link href={p.href} className="group block">
              <div className="overflow-hidden rounded-[20px] [&_img]:transition-transform [&_img]:duration-[600ms] [&_img]:ease-[cubic-bezier(0.35,0,0,1)] group-hover:[&_img]:scale-105">
                <MediaFrame
                  src="/renders/cube.jpg"
                  alt="Blue crystal cube project visual"
                  radius={20}
                  parallax={6}
                  className="aspect-[16/10] w-full"
                />
              </div>
              <Meta />
              {p.name && (
                <LineReveal className="mt-2 font-grotesk text-4xl font-900 tracking-tight text-ink transition-colors duration-500 group-hover:text-blue md:text-5xl">
                  {p.name}
                </LineReveal>
              )}
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
