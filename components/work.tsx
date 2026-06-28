'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    number: '01',
    title: 'Concrete Sanctuary',
    discipline: 'Interior Architecture',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85',
    tall: true,
  },
  {
    number: '02',
    title: 'Brutalist Forms',
    discipline: '3D Design',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85',
    tall: false,
  },
  {
    number: '03',
    title: 'Still Objects',
    discipline: 'Product Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=85',
    tall: false,
  },
  {
    number: '04',
    title: 'Digital Surface',
    discipline: 'UI/UX',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',
    tall: true,
  },
]

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

        {/* Asymmetric magazine grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <ProjectCard project={projects[0]} height={560} delay={0} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ProjectCard project={projects[1]} height={340} delay={0.1} />
            {/* Editorial quote card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ backgroundColor: '#0000FF', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, position: 'relative', overflow: 'hidden', minHeight: '160px' }}
            >
              {/* Square logo mark inside card */}
              <div style={{ width: '28px', height: '28px', backgroundColor: 'white', overflow: 'hidden' }}>
                <Image src="/logo.png" alt="Blueism" width={28} height={28} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  "Every project begins with a single, sincere question."
                </p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>— Blueism Studio</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>
          <ProjectCard project={projects[2]} height={360} delay={0.15} />
          <ProjectCard project={projects[3]} height={560} delay={0.25} />
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span className="label">All projects on request</span>
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
    </motion.div>
  )
}
