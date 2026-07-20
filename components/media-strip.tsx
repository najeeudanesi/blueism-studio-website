'use client'

import { useSectionTheme } from './motion'

/**
 * Full-bleed dark showcase — the Enter key and the orb hand.
 */
function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[72vh] w-full overflow-hidden md:h-screen">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        data-cursor="view"
      />
    </div>
  )
}

export default function MediaStrip() {
  const ref = useSectionTheme('dark')
  return (
    <section ref={ref} className="bg-[#05050c] !p-0">
      <Panel src="/renders/enter-card.jpg" alt="Enter key rising from a dark keyboard" />
      <Panel src="/renders/orb-hand.jpg" alt="Hand holding a glowing blue orb" />
    </section>
  )
}
