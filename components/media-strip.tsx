'use client'

import { useCallback, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSectionTheme } from './motion'
import WaterOverlay from './water-overlay'

/**
 * Full-bleed video showcase. The section is tall and its visual is pinned
 * (sticky), so it stays locked in place while you scroll through it. The
 * office-vr clip is *scrubbed* by scroll — its currentTime is tagged to scroll
 * progress, so it plays forward as you scroll down and rewinds as you scroll
 * up. A rAF lerp eases currentTime toward the target, and seeks are gated on
 * `!video.seeking` so we never pile up seek requests (which is what makes a
 * scrubbed video appear frozen). Bold agency copy comes in on the right, then
 * on the left; the panel fades out at the end to hand off to the next section.
 */
export default function MediaStrip() {
  const themeRef = useSectionTheme('dark')
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const durationRef = useRef(0)

  // theme sentinel goes on the pinned 100vh visual (not the tall section, which
  // can never be 35% in view) so the nav flips to its dark treatment correctly
  const setStickyRef = useCallback(
    (node: HTMLDivElement | null) => {
      ;(themeRef as React.MutableRefObject<HTMLElement | null>).current = node
    },
    [themeRef],
  )

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.pause()

    const captureDuration = () => {
      if (Number.isFinite(v.duration) && v.duration > 0) durationRef.current = v.duration
    }
    captureDuration()
    v.addEventListener('loadedmetadata', captureDuration)
    v.addEventListener('durationchange', captureDuration)
    v.addEventListener('canplay', captureDuration)

    let raf = 0
    let current = 0
    const tick = () => {
      const d = durationRef.current
      if (d > 0) {
        const target = Math.max(0, Math.min(d - 0.05, scrollYProgress.get() * d))
        // ease toward the scroll target so the scrub glides. The clip is now
        // all-intra so seeks are cheap — track tightly to avoid a laggy feel.
        current += (target - current) * 0.32
        if (Math.abs(target - current) < 0.004) current = target
        // only issue a new seek once the previous one has finished — piling up
        // seeks is exactly what freezes a scrubbed video
        if (!v.seeking && Math.abs(v.currentTime - current) > 0.02) {
          v.currentTime = current
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('loadedmetadata', captureDuration)
      v.removeEventListener('durationchange', captureDuration)
      v.removeEventListener('canplay', captureDuration)
    }
  }, [scrollYProgress])

  // whole panel fades out over the last stretch → seamless hand-off to next section
  const panelOpacity = useTransform(scrollYProgress, [0, 0.03, 0.9, 1], [1, 1, 1, 0])

  // copy: first block on the RIGHT, then a block on the LEFT
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [0, 1, 1, 0])
  const rightX = useTransform(scrollYProgress, [0.05, 0.15], [56, 0])
  const leftOpacity = useTransform(scrollYProgress, [0.54, 0.64, 0.86, 0.94], [0, 1, 1, 0])
  const leftX = useTransform(scrollYProgress, [0.54, 0.64], [-56, 0])

  const shadow = '0 2px 18px rgba(0,0,0,0.55)'

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-white !p-0">
      <motion.div
        ref={setStickyRef}
        style={{ opacity: panelOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
      >
        {/* scroll-scrubbed background video (no tint overlay) */}
        <video
          ref={videoRef}
          src="/renders/jellyfish.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          aria-hidden
          data-cursor="view"
        />

        {/* watery hover overlay — brand-blue tint + ripples that trail the cursor */}
        <WaterOverlay />

        {/* copy on the RIGHT */}
        <motion.div
          style={{ opacity: rightOpacity, x: rightX }}
          className="absolute inset-0 z-10 flex items-center justify-end px-6 text-right text-white md:px-16"
        >
          <div className="max-w-xl" style={{ textShadow: shadow }}>
            <p className="mb-5 text-xs font-800 uppercase tracking-[0.4em] md:text-sm">What we do</p>
            <h2 className="font-sans text-4xl font-900 leading-[1.05] tracking-tight md:text-7xl">
              We build brands from the ground up — identity, 3D, motion and web, made to be felt.
            </h2>
          </div>
        </motion.div>

        {/* copy on the LEFT */}
        <motion.div
          style={{ opacity: leftOpacity, x: leftX }}
          className="absolute inset-0 z-10 flex items-center justify-start px-6 text-left text-white md:px-16"
        >
          <div className="max-w-xl" style={{ textShadow: shadow }}>
            <p className="mb-5 text-xs font-800 uppercase tracking-[0.4em] md:text-sm">How we work</p>
            <h2 className="font-sans text-4xl font-900 leading-[1.05] tracking-tight md:text-7xl">
              Strategy first — every mark, motion and material earns its place in your story.
            </h2>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
