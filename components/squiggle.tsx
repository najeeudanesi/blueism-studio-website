'use client'

/**
 * Static decorative squiggle line.
 */
export default function Squiggle({
  className = '',
  path = 'M10 120 C 60 20, 140 20, 180 90 S 280 200, 330 110 S 390 40, 395 60',
  viewBox = '0 0 400 200',
}: {
  className?: string
  path?: string
  viewBox?: string
  drift?: number
  rotate?: number
  direction?: 1 | -1
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg viewBox={viewBox} fill="none" className="h-auto w-full overflow-visible">
        <path d={path} stroke="#6063EA" strokeWidth="11" strokeLinecap="round" />
      </svg>
    </div>
  )
}
