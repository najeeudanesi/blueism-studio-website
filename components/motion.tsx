'use client'

import {
  motion,
  MotionConfig,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  type MotionValue,
} from 'framer-motion'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

/*
 * Subtle motion — crisp reveals with minimal blur and quick entry.
 * Smooth easing keeps the feel refined without dreaminess.
 * (Names kept from the old system so consumers stay compatible.)
 */
export const EASE_TEXT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
export const EASE_MASK: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
export const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
export const EASE_DREAM = EASE

/* Shared soft-focus states — minimal blur, crisp reveals */
const VEILED = { opacity: 0, filter: 'blur(4px)' }
const FOCUSED = { opacity: 1, filter: 'blur(0px)' }

/* ---------- Site-ready gate (preloader completion) ---------- */
const SiteReadyContext = createContext<{ ready: boolean; setReady: (v: boolean) => void }>({
  ready: false,
  setReady: () => {},
})

export function SiteReadyProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  return (
    <MotionConfig reducedMotion="user">
      <SiteReadyContext.Provider value={{ ready, setReady }}>{children}</SiteReadyContext.Provider>
    </MotionConfig>
  )
}

export const useSiteReady = () => useContext(SiteReadyContext)

/* ---------- Static text: no entrance animation ---------- */
export function SplitWords({
  text,
  className = '',
  as: Tag = 'span',
}: {
  text: string
  className?: string
  delay?: number
  gate?: boolean
  as?: React.ElementType
}) {
  return <Tag className={className}>{text}</Tag>
}

/* ---------- Subtle line reveal: quick rise with minimal blur ---------- */
export function LineReveal({
  children,
  delay = 0,
  duration = 0.75,
  className = '',
  as: Tag = 'span',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  as?: React.ElementType
}) {
  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial={{ y: '12%', ...VEILED }}
        whileInView={{ y: '0%', ...FOCUSED }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration, delay, ease: EASE_TEXT }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}

/* ---------- Subtle fade + rise with minimal blur ---------- */
export function FadeUp({
  children,
  delay = 0,
  y = 20,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ y, ...VEILED }}
      whileInView={{ y: 0, ...FOCUSED }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE_TEXT }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Media frame: quick reveal with subtle parallax ---------- */
export function MediaFrame({
  src,
  alt = '',
  className = '',
  radius = 20,
  priority = false,
}: {
  src: string
  alt?: string
  className?: string
  radius?: number
  parallax?: number
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: radius }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
        data-cursor="view"
      />
    </div>
  )
}

/* ---------- Scroll-linked parallax, direct transform for subtle effect ---------- */
export function Parallax({
  children,
  amount = 4,
  className = '',
}: {
  children: React.ReactNode
  amount?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${amount}%`, `-${amount}%`])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-[120%] w-full">
        {children}
      </motion.div>
    </div>
  )
}

/* ---------- Subtle drift: minimal float with soft rotation ---------- */
export function Drift({
  children,
  className = '',
  y = 4,
  rotate = 0.6,
  duration = 16,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  y?: number
  rotate?: number
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -y, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Aura: subtle glow with minimal drift ---------- */
export function Aura({
  className = '',
  color = 'rgba(120,124,255,0.3)',
  size = 400,
  duration = 28,
}: {
  className?: string
  color?: string
  size?: number
  duration?: number
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
        filter: 'blur(50px)',
      }}
      animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ---------- Magnetic hover: subtle follow with snappy return ---------- */
export function Magnetic({
  children,
  strength = 0.15,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.3 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

/* ---------- Dual-label roll hover ---------- */
export function RollLabel({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`roll-link ${className}`}>
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden>
        {children}
      </span>
    </span>
  )
}

/* ---------- Section theme sentinel (flips html class, CSS transitions the nav) ---------- */
export function useSectionTheme(theme: 'blue' | 'light' | 'white' | 'dark') {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  useEffect(() => {
    if (!inView) return
    const html = document.documentElement
    html.classList.remove('theme-blue', 'theme-light', 'theme-white', 'theme-dark')
    html.classList.add(`theme-${theme}`)
  }, [inView, theme])
  return ref
}

export type { MotionValue }
