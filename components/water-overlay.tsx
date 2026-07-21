'use client'

import { useEffect, useRef } from 'react'

/**
 * WaterOverlay — Approach C: pointer-trail ripple rings over an animated blue
 * caustics field.
 *
 * Sits as an absolutely-positioned layer (inset-0, z-[5]) between the scrubbed
 * video (z auto) and the z-10 copy in the pinned <MediaStrip/> panel. It is
 * fully self-contained and never reads or touches the video element.
 *
 * Two stacked layers:
 *   1. A FLAT brand-blue floor at opacity 0.58 (a plain DOM div with a fixed
 *      opacity). This ALONE guarantees the hard ">= 0.5 blue" requirement at
 *      every pixel and every moment, independent of anything the canvas does.
 *   2. A <canvas> painting an always-animating light-blue caustics field plus
 *      cursor-driven ripple rings. Every colour the canvas ever paints is
 *      BLUE-DOMINANT (its blue channel is the max of r,g,b) and it is composited
 *      with normal source-over — a per-channel convex combination — so the
 *      canvas can only ever stay blue-dominant, and composited over the blue
 *      floor keeps the whole panel reading blue. It never approaches white.
 *
 * pointer-events: none throughout, so the z-10 copy and the site's custom cursor
 * are never blocked. Pointer input is read from a window-level listener and
 * mapped into the canvas via its bounding rect.
 *
 * Degrade paths: coarse pointer (touch) -> ambient water + tint only, no hover
 * ripples. prefers-reduced-motion -> a single calm static caustic frame, no rAF
 * loop, no ripples. Off-screen (IntersectionObserver) and hidden-tab
 * (visibilitychange) pause the loop. DPR capped at 2. Full teardown on unmount.
 */
export default function WaterOverlay() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    // Hover ripples only on a fine (mouse/trackpad) pointer with motion allowed.
    const allowRipples = finePointer && !prefersReduced

    const rnd = (a: number, b: number) => a + Math.random() * (b - a)

    // ---- loop / lifecycle state (declared before resize uses them) -------
    let raf = 0
    let running = false
    let onScreen = false

    // ---- sizing (DPR-capped) --------------------------------------------
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let cssW = 0
    let cssH = 0
    let rect = canvas.getBoundingClientRect()

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cssW = wrap.clientWidth
      cssH = wrap.clientHeight
      canvas.width = Math.max(1, Math.round(cssW * dpr))
      canvas.height = Math.max(1, Math.round(cssH * dpr))
      // draw in CSS pixels; the backing store is scaled by DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      rect = canvas.getBoundingClientRect()
      if (!running) renderStatic()
    }

    // ---- ambient caustic blobs (drifting light-blue patches) ------------
    type Blob = {
      bx: number
      by: number
      r: number
      ax: number
      ay: number
      sx: number
      sy: number
      ph: number
      a: number
    }
    const blobs: Blob[] = Array.from({ length: 6 }, () => ({
      bx: rnd(0.12, 0.88),
      by: rnd(0.12, 0.88),
      r: rnd(0.3, 0.52),
      ax: rnd(0.05, 0.14),
      ay: rnd(0.04, 0.12),
      sx: rnd(0.06, 0.14),
      sy: rnd(0.05, 0.12),
      ph: rnd(0, Math.PI * 2),
      a: rnd(0.2, 0.36),
    }))

    // ---- ripple ring pool -----------------------------------------------
    type Ripple = {
      x: number
      y: number
      born: number
      life: number
      maxR: number
      a: number
      active: boolean
    }
    const MAX = 64
    const ripples: Ripple[] = Array.from({ length: MAX }, () => ({
      x: 0,
      y: 0,
      born: 0,
      life: 0,
      maxR: 0,
      a: 0,
      active: false,
    }))
    let ri = 0
    const spawn = (x: number, y: number, strength: number) => {
      const rp = ripples[ri]
      ri = (ri + 1) % MAX
      rp.x = x
      rp.y = y
      rp.born = performance.now()
      rp.life = rnd(900, 1300)
      rp.maxR = rnd(70, 150) * strength
      rp.a = 0.42 * Math.min(1, strength)
      rp.active = true
    }

    // ---- pointer (read from window; overlay is pointer-events:none) ------
    let px = -1
    let py = -1
    let tx = -1
    let ty = -1
    let hasPointer = false
    let lastX = 0
    let lastY = 0
    let lastT = 0

    const onMove = (e: PointerEvent) => {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > cssW || y > cssH) {
        hasPointer = false
        return
      }
      tx = x
      ty = y
      if (px < 0) {
        px = x
        py = y
        // seed the trail baseline so the first move doesn't spike a huge ripple
        lastX = x
        lastY = y
      }
      hasPointer = true
      if (!allowRipples) return
      const now = performance.now()
      const dist = Math.hypot(x - lastX, y - lastY)
      // spawn rings ALONG the cursor path: a fast drag lays a dense trail, a slow
      // one a sparse trail. Both branches require real movement, so a stationary
      // pointer never pulses rings in place.
      if (dist > 22 || (dist > 5 && now - lastT > 70)) {
        spawn(x, y, Math.min(1.5, 0.55 + dist / 110))
        lastX = x
        lastY = y
        lastT = now
      }
    }
    const clearPointer = () => {
      hasPointer = false
    }

    // ---- drawing --------------------------------------------------------
    let nextAuto = performance.now() + 1800

    const drawCaustics = (t: number, animate: boolean) => {
      const maxDim = Math.max(cssW, cssH)
      for (const b of blobs) {
        const mx = animate ? Math.sin(t * b.sx + b.ph) * b.ax : 0
        const my = animate ? Math.cos(t * b.sy + b.ph) * b.ay : 0
        const cx = (b.bx + mx) * cssW
        const cy = (b.by + my) * cssH
        const breathe = animate ? 0.9 + 0.1 * Math.sin(t * 0.6 + b.ph) : 1
        const rad = b.r * maxDim * breathe
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        // blue-DOMINANT throughout: the blue channel is always the max component
        g.addColorStop(0, `rgba(150,168,255,${b.a})`)
        g.addColorStop(0.55, `rgba(96,110,242,${b.a * 0.4})`)
        g.addColorStop(1, 'rgba(96,110,242,0)')
        ctx.fillStyle = g
        // fill only the blob's bounding box, not the whole panel — less overdraw
        ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2)
      }
    }

    const drawSpecular = () => {
      if (!hasPointer) return
      // eased follow — a soft bright-blue "disturbance" under the hand
      px += (tx - px) * 0.18
      py += (ty - py) * 0.18
      const rad = Math.min(cssW, cssH) * 0.16
      const g = ctx.createRadialGradient(px, py, 0, px, py, rad)
      g.addColorStop(0, 'rgba(176,190,255,0.4)')
      g.addColorStop(1, 'rgba(176,190,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2)
    }

    const drawRipples = (now: number) => {
      for (const rp of ripples) {
        if (!rp.active) continue
        const age = (now - rp.born) / rp.life
        if (age >= 1) {
          rp.active = false
          continue
        }
        const ease = 1 - Math.pow(1 - age, 3) // fast out, settle
        const r = rp.maxR * ease
        const fade = (1 - age) * (1 - age)
        // outer ring
        ctx.lineWidth = Math.max(0.8, 3.2 * (1 - age))
        ctx.strokeStyle = `rgba(150,170,255,${rp.a * fade})`
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2)
        ctx.stroke()
        // inner refraction ring
        ctx.lineWidth = Math.max(0.6, 1.6 * (1 - age))
        ctx.strokeStyle = `rgba(120,138,250,${rp.a * fade * 0.6})`
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, r * 0.72, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    const render = (now: number) => {
      // clear to transparent so gaps reveal the flat blue floor beneath
      ctx.clearRect(0, 0, cssW, cssH)
      const t = now / 1000
      drawCaustics(t, true)
      if (!prefersReduced) {
        drawSpecular()
        if (now >= nextAuto) {
          // sparse ambient ripples so the surface breathes even at rest
          spawn(rnd(0, cssW), rnd(0, cssH), 0.5)
          nextAuto = now + rnd(1600, 3200)
        }
        drawRipples(now)
      }
    }

    // one calm frame for reduced-motion / off-screen
    function renderStatic() {
      ctx!.clearRect(0, 0, cssW, cssH)
      drawCaustics(0, false)
    }

    // ---- rAF loop with off-screen + hidden-tab pause --------------------
    const frame = (now: number) => {
      render(now)
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (running) return
      if (prefersReduced) {
        renderStatic()
        return
      }
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          onScreen = e.isIntersecting
          if (onScreen && !document.hidden) start()
          else stop()
        }
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    const ro = new ResizeObserver(() => resize())
    ro.observe(wrap)

    const onScroll = () => {
      // sticky panel + page scroll shifts the canvas rect; keep it fresh
      rect = canvas.getBoundingClientRect()
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (onScreen) start()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    if (finePointer) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', clearPointer)
      window.addEventListener('blur', clearPointer)
    }

    resize()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      if (finePointer) {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerleave', clearPointer)
        window.removeEventListener('blur', clearPointer)
      }
    }
  }, [])

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 z-[5]">
      {/* Flat brand-blue floor — the hard >=0.5 guarantee (fixed opacity div) */}
      <div className="absolute inset-0 bg-blue" style={{ opacity: 0.58 }} />
      {/* Animated caustics + ripple rings; blue-dominant, source-over only */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  )
}
