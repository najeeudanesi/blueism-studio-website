'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'

export default function Work() {
  return (
    <section id="work" style={{ backgroundColor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>

      {/* Vertical section label on right edge */}
      <div style={{
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 5,
        padding: '0 0.5rem',
        backgroundColor: '#0000FF',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        maxHeight: '120px',
      }}>
        <span style={{
          fontFamily: 'var(--font-bold)',
          fontWeight: 700,
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'white',
          writingMode: 'vertical-rl',
        }}>
          Selected Work
        </span>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="label">[ 03 ]</span>
            <h2 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1,
            }}>
              Work
            </h2>
          </div>
          <span className="label">2023 — 2024</span>
        </motion.div>

        {/* Asymmetric magazine grid - Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <ProjectCard project={projects[0]} height={560} delay={0} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ProjectCard project={projects[1]} height={340} delay={0.1} />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ backgroundColor: '#0000FF', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1, position: 'relative', overflow: 'hidden', minHeight: '160px' }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  &quot;Every project begins with a single, sincere question.&quot;
                </p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>— Blueism Studio</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <ProjectCard project={projects[2]} height={360} delay={0.15} />
          <ProjectCard project={projects[3]} height={560} delay={0.25} />
        </div>

        {/* Row 3 - Including Software project & integrated Grid CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          {/* Integrated Grid CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ 
              backgroundColor: '#0000FF', 
              padding: '3rem 2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              minHeight: '400px',
              color: 'white',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                [ Collaborations ]
              </span>
            </div>

            <div>
              <h3 style={{
                fontFamily: 'var(--font-bold)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                lineHeight: 1,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                margin: 0,
                marginBottom: '1.5rem',
              }}>
                Have a vision for your brand?
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6, marginBottom: '2rem', maxWidth: '380px' }}>
                We translate complex brand philosophies into tactile spaces, systems, and product experiences.
              </p>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'white',
                  color: '#0000FF',
                  fontFamily: 'var(--font-bold)',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '1rem 1.5rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Start a project →
              </a>
            </div>
          </motion.div>

          <ProjectCard project={projects[4]} height={400} delay={0.2} />
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span className="label">Click any case study to explore details</span>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0000FF',
              textDecoration: 'none',
              borderBottom: '2px solid #0000FF',
              paddingBottom: '2px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, height, delay }: { project: typeof projects[0]; height: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.slug}`} style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: `${height}px` }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="img-bw"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(245,243,238,0.8)', backgroundColor: 'rgba(13,13,13,0.5)', padding: '3px 8px' }}>
              — {project.number}
            </span>
          </div>
        </div>
        <div style={{ paddingTop: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-bold)',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: '0.2rem',
              color: 'var(--foreground)',
            }}>
              {project.title}
            </h3>
            <span className="label">{project.discipline}</span>
          </div>
          <span className="label">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  )
}
