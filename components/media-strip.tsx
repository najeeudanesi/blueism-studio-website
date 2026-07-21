'use client'

import { useCallback, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSectionTheme } from './motion'

/**
 * Full-bleed video showcase. The section is tall and its visual is pinned
 * (sticky), so it stays locked in place while you scroll through it. The
 * office-vr clip is *scrubbed* by scroll — its currentTime is tagged to scroll
 * progress, so it plays forward as you scroll down and rewinds as you scroll
 * up. A requestAnimationFrame lerp eases currentTime toward the target so the
 * scrub reads smoothly (exact smoothness also depends on the clip's keyframe
 * density). A brand-blue tint sits over it; bold agency copy comes in on the
 * right, then on the left; the panel fades out at the end so it dissolves
 * seamlessly into the next section.
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

  // Scrub: drive the video's currentTime from scroll, eased via a rAF lerp so it
  // glides instead of jumping frame-to-frame.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.pause()

    const onMeta = () => {
      if (Number.isFinite(v.duration)) durationRef.current = v.duration
      // prime so seeked frames actually render (notably on iOS Safari)
      v.play().then(() => v.pause()).catch(() => {})
    }
    if (v.readyState >= 1) onMeta()
    v.addEventListener('loadedmetadata', onMeta)

    let raf = 0
    let current = 0
    const tick = () => {
      const d = durationRef.current
      if (d) {
        const target = Math.min(d - 0.05, Math.max(0, scrollYProgress.get() * d))
        current += (target - current) * 0.15
        if (Math.abs(target - current) < 0.004) current = target
        if (Math.abs(v.currentTime - current) > 0.01) v.currentTime = current
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('loadedmetadata', onMeta)
    }
  }, [scrollYProgress])

  // whole panel fades out over the last stretch → seamless hand-off to next section
  const panelOpacity = useTransform(scrollYProgress, [0, 0.03, 0.9, 1], [1, 1, 1, 0])

  // copy: first block on the RIGHT, then a block on the LEFT
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.4, 0.5], [0, 1, 1, 0])
  const rightX = useTransform(scrollYProgress, [0.05, 0.15], [56, 0])
  const leftOpacity = useTransform(scrollYProgress, [0.54, 0.64, 0.86, 0.94], [0, 1, 1, 0])
  const leftX = useTransform(scrollYProgress, [0.54, 0.64], [-56, 0])

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-white !p-0">
      <motion.div
        ref={setStickyRef}
        style={{ opacity: panelOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-blue"
      >
        {/* scroll-scrubbed background video */}
        <video
          ref={videoRef}
          src="/renders/office-vr.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          aria-hidden
          data-cursor="view"
        />

        {/* brand-blue tint (#383ce5) + dark depth for legibility */}
        <div className="absolute inset-0 bg-blue/45" aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,17,70,0.55) 0%, rgba(40,44,190,0.25) 50%, rgba(15,17,70,0.6) 100%)',
          }}
          aria-hidden
        />

        {/* copy on the RIGHT */}
        <motion.div
          style={{ opacity: rightOpacity, x: rightX }}
          className="absolute inset-0 z-10 flex items-center justify-end px-6 text-right text-white md:px-16"
        >
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-800 uppercase tracking-[0.4em] text-white/70 md:text-sm">
              What we do
            </p>
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
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-800 uppercase tracking-[0.4em] text-white/70 md:text-sm">
              How we work
            </p>
            <h2 className="font-sans text-4xl font-900 leading-[1.05] tracking-tight md:text-7xl">
              Strategy first — every mark, motion and material earns its place in your story.
            </h2>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
