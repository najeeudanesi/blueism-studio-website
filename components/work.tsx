'use client'

import Link from 'next/link'
import { MediaFrame, useSectionTheme } from './motion'

/**
 * Work grid — rounded 20px tiles (house radius). Meta separators per the
 * design file. Static tiles with a hover img zoom.
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
          <Link key={i} href={p.href} className="group block">
            <div className="overflow-hidden rounded-[20px] [&_img]:transition-transform [&_img]:duration-[600ms] [&_img]:ease-[cubic-bezier(0.35,0,0,1)] group-hover:[&_img]:scale-105">
              <MediaFrame
                src="/renders/cube.jpg"
                alt="Blue crystal cube project visual"
                radius={20}
                className="aspect-[16/10] w-full"
              />
            </div>
            <Meta />
            {p.name && (
              <span className="mt-2 block font-grotesk text-5xl font-900 tracking-tight text-ink transition-colors duration-500 group-hover:text-blue md:text-6xl">
                {p.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
