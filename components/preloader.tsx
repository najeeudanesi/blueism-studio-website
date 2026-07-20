'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Aura, EASE, useSiteReady } from './motion'

const EASE_ROLL: [number, number, number, number] = [0.3, 0.9, 0.3, 1]

/** One rolling odometer column (0-9 stacked, translates to the active digit). */
function RollDigit({ digit }: { digit: number }) {
  return (
    <span className="inline-block h-[1em] w-[0.62em] overflow-hidden align-bottom">
      <motion.span
        className="block leading-none"
        animate={{ y: `-${digit}em` }}
        transition={{ duration: 0.7, ease: EASE_ROLL }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1em]">
            {i}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

/**
 * Lusion-style preloader: blue overlay, odometer percentage tied to real
 * loading (fonts + hero media), wipes up on completion and unlocks the intro.
 */
export default function Preloader() {
  const { setReady } = useSiteReady()
  const [display, setDisplay] = useState(0)
  const [done, setDone] = useState(false)
  const target = useRef(0)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    const assets = ['/renders/hero-cloth.jpg', '/renders/enter-card.jpg', '/renders/orb-hand.jpg']
    let loaded = 0
    const bump = () => {
      loaded += 1
      target.current = Math.round((loaded / (assets.length + 1)) * 100)
    }
    document.fonts.ready.then(bump)
    assets.forEach((src) => {
      const img = new Image()
      img.onload = bump
      img.onerror = bump
      img.src = src
    })
    // never hang on a stalled asset
    const failsafe = setTimeout(() => (target.current = 100), 3500)

    let raf: number
    let value = 0
    const tick = () => {
      value += (target.current - value) * 0.06
      const v = Math.min(100, Math.round(value))
      setDisplay(v)
      if (v >= 100) {
        setTimeout(() => {
          setDone(true)
          setReady(true)
          document.documentElement.style.overflow = ''
        }, 450)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(failsafe)
      document.documentElement.style.overflow = ''
    }
  }, [setReady])

  const digits = String(display).padStart(3, '0').split('').map(Number)

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[150] overflow-hidden bg-blue text-white"
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(20px)' }}
          transition={{ duration: 1.4, ease: EASE }}
          aria-hidden
        >
          {/* wandering glow — the dream is already breathing behind the counter */}
          <Aura className="left-[15%] top-[20%]" size={640} duration={14} />
          <Aura
            className="right-[5%] bottom-[10%]"
            size={480}
            duration={17}
            color="rgba(255,255,255,0.14)"
          />
          <div className="absolute bottom-8 left-8 font-sans text-[18vw] font-extralight leading-none md:text-[9rem]">
            {display >= 100 ? (
              <span>100</span>
            ) : (
              <>
                <span className={digits[0] === 0 ? 'opacity-0' : ''}>
                  <RollDigit digit={digits[0]} />
                </span>
                <span className={digits[0] === 0 && digits[1] === 0 ? 'opacity-0' : ''}>
                  <RollDigit digit={digits[1]} />
                </span>
                <RollDigit digit={digits[2]} />
              </>
            )}
            <span className="text-[0.35em] font-light align-top">%</span>
          </div>
          <p className="absolute right-8 top-8 text-xs font-light tracking-[0.25em] uppercase text-white/70">
            Blueism — Creative Studio
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
