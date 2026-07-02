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
    { label: 'Information', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Blog', href: '#footer' },
    { label: 'Contact Us', href: '#contact' },
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
        backgroundColor: scrolled ? 'rgba(255,254,236,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div 
        className="px-6 md:px-16"
        style={{ 
          width: '100%', 
          height: '80px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >

        {/* Logo — official Blueism Studio wordmark */}
        <a
          href="#"
          aria-label="Blueism Studio — home"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <Image
            src="/logo-wordmark.png"
            alt="Blueism Studio"
            width={643}
            height={254}
            priority
            style={{
              height: '38px',
              width: 'auto',
              display: 'block',
              // Over the dark hero the logo reads white; on the cream nav it shows brand colors
              filter: scrolled ? 'none' : 'brightness(0) invert(1)',
              transition: 'filter 0.3s ease',
            }}
          />
        </a>

        {/* Desktop Links (Spaced evenly across navigation) */}
        <div style={{ display: 'flex', gap: 'clamp(1.5rem, 5vw, 6rem)', alignItems: 'center' }} className="hidden md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-bold)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: scrolled ? 'var(--foreground)' : 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = scrolled ? 'var(--primary)' : '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--foreground)' : 'rgba(255,255,255,0.8)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', zIndex: 60 }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ 
              display: 'block', 
              width: '24px', 
              height: '2px', 
              backgroundColor: isOpen ? (scrolled ? 'var(--foreground)' : '#FFFFFF') : (scrolled ? 'var(--foreground)' : '#FFFFFF'),
              transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none',
              transition: 'all 0.3s ease' 
            }} />
            <span style={{ 
              display: 'block', 
              width: '24px', 
              height: '2px', 
              backgroundColor: isOpen ? (scrolled ? 'var(--foreground)' : '#FFFFFF') : (scrolled ? 'var(--foreground)' : '#FFFFFF'),
              transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none',
              transition: 'all 0.3s ease' 
            }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div style={{ 
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: scrolled ? 'rgba(255,254,236,0.98)' : 'rgba(13,13,13,0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border)',
          padding: '2rem 1.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ 
                fontFamily: 'var(--font-bold)', 
                fontSize: '1.25rem', 
                fontWeight: 700, 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase', 
                color: scrolled ? 'var(--foreground)' : '#FFFFFF', 
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
