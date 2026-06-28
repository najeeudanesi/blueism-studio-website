'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backgroundColor: scrolled ? 'rgba(245,243,238,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo — square mark + wordmark */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Square logo mark */}
          <div style={{ width: '36px', height: '36px', flexShrink: 0, overflow: 'hidden', backgroundColor: '#0000FF' }}>
            <Image
              src="/logo.png"
              alt="Blueism logo"
              width={36}
              height={36}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-bold)', fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Blueism
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.2em', color: 'var(--secondary)', textTransform: 'uppercase', marginTop: '2px' }}>
              Studio · Casablanca
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--secondary)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--foreground)', transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--foreground)', transition: 'all 0.3s' }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--background)', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ fontFamily: 'var(--font-bold)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--foreground)', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
