'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Project, projects } from '@/lib/projects'

interface CaseStudyProps {
  project: Project
}

export default function CaseStudy({ project }: CaseStudyProps) {
  // Find next and previous projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const prevProject = projects[currentIndex - 1] || projects[projects.length - 1]
  const nextProject = projects[currentIndex + 1] || projects[0]

  return (
    <article style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Dynamic SEO CreativeWork Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            'name': project.title,
            'description': project.description,
            'genre': project.discipline,
            'creator': {
              '@type': 'Organization',
              'name': 'Blueism Studio'
            },
            'locationCreated': {
              '@type': 'Place',
              'name': project.location
            },
            'dateCreated': project.year,
            'image': project.image
          })
        }}
      />

      {/* Header Bar */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '60px',
        backgroundColor: 'rgba(255,254,236,0.96)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}>
        <Link href="/" aria-label="Blueism Studio — home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo-wordmark.png"
            alt="Blueism Studio"
            width={643}
            height={254}
            style={{ height: '32px', width: 'auto', display: 'block' }}
          />
        </Link>

        <Link
          href="/#work"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            textDecoration: 'none',
          }}
        >
          [ Close Work ]
        </Link>
      </header>

      {/* Main Title & Hero Banner */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 2rem 4rem' }}>
        
        {/* Discipline / Project Number */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#487ef8' }}>
              {project.discipline}
            </span>
            <h1 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 7vw, 7.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              {project.title}
            </h1>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--border)' }}>
            [{project.number}]
          </span>
        </div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', height: '65vh', overflow: 'hidden', marginBottom: '4rem' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="img-bw-fixed"
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Subtle blue accent corner */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', backgroundColor: '#487ef8' }} />
        </motion.div>

        {/* Sidebar Info & Main Description */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', marginBottom: '5rem' }} className="case-grid">
          
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem' }}>
            <div>
              <span className="label" style={{ display: 'block', marginBottom: '0.25rem' }}>Location</span>
              <span style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.95rem' }}>{project.location}</span>
            </div>
            <div>
              <span className="label" style={{ display: 'block', marginBottom: '0.25rem' }}>Year</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{project.year}</span>
            </div>
            <div>
              <span className="label" style={{ display: 'block', marginBottom: '0.25rem' }}>Services</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9rem', color: 'var(--secondary)' }}>{project.discipline}</span>
            </div>
            
            {/* CTA Button in Sidebar */}
            <div style={{ marginTop: '2rem' }}>
              <a
                href="#contact-project"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#487ef8',
                  color: 'white',
                  fontFamily: 'var(--font-bold)',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '1rem 1.5rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Discuss a similar project →
              </a>
            </div>
          </div>

          {/* Description Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', lineHeight: 1.4, color: 'var(--foreground)', margin: 0 }}>
              {project.description}
            </p>

            {/* Core Pillars: Challenge, Approach, Result */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginTop: '1.5rem' }} className="pillars-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="label" style={{ color: '#487ef8' }}>[ The Challenge ]</span>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--secondary)', margin: 0 }}>
                  {project.challenge}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="label" style={{ color: '#487ef8' }}>[ The Approach ]</span>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--secondary)', margin: 0 }}>
                  {project.approach}
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <span className="label" style={{ color: '#487ef8', display: 'block', marginBottom: '0.5rem' }}>[ The Result ]</span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--foreground)', margin: 0 }}>
                {project.result}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '6rem' }} className="gallery-grid">
          {project.gallery.map((imgUrl, index) => (
            <div key={index} style={{ position: 'relative', height: index === 0 ? '550px' : '400px', overflow: 'hidden' }}>
              <Image
                src={imgUrl}
                alt={`${project.title} gallery item`}
                fill
                className="img-bw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>

        {/* Big Bottom Blue CTA Band */}
        <section id="contact-project" style={{ backgroundColor: '#487ef8', color: 'white', padding: '5rem 3rem', position: 'relative', overflow: 'hidden', marginBottom: '5rem' }}>
          {/* Grain overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          }} />
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Get in Touch — Start a project
            </span>
            <h2 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Want to build something similar for your brand?
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Let&apos;s talk about your specific {project.discipline} requirements.
            </p>
            <div>
              <a
                href="mailto:hello@blueismstudio.com"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'white',
                  color: '#487ef8',
                  fontFamily: 'var(--font-bold)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '1.25rem 2rem',
                  textDecoration: 'none',
                  marginTop: '1rem',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                hello@blueismstudio.com →
              </a>
            </div>
          </div>
        </section>

        {/* Dynamic Project Navigation (Next / Prev Links) */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
          <Link
            href={`/work/${prevProject.slug}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textDecoration: 'none' }}
          >
            <span className="label">[ Previous Project ]</span>
            <span style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, color: 'var(--foreground)', textTransform: 'uppercase', fontSize: '1.15rem' }}>
              ← {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end', textDecoration: 'none' }}
          >
            <span className="label">[ Next Project ]</span>
            <span style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, color: 'var(--foreground)', textTransform: 'uppercase', fontSize: '1.15rem' }}>
              {nextProject.title} →
            </span>
          </Link>
        </nav>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-grid > div {
            height: 350px !important;
          }
        }
      `}</style>
    </article>
  )
}
