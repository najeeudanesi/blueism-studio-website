'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Project, projects } from '@/lib/projects'

// ── Editorial "presentation" layout — shared primitives ───────────
// Used by every case study except software / UI-UX (see usePresentation).
type SuitsSkin = { bg: string; fg: string; line: string }
const SUITS_BLUE: SuitsSkin = { bg: 'var(--primary)', fg: 'var(--background)', line: 'rgba(255,254,236,0.28)' }
const SUITS_CREAM: SuitsSkin = { bg: 'var(--background)', fg: 'var(--primary)', line: 'rgba(56,60,229,0.22)' }

// Print-style registration ticks at each corner of a slide.
function SuitsRegMarks({ color }: { color: string }) {
  return (
    <>
      <span aria-hidden className="reg-mark reg-mark-tl" style={{ borderColor: color }} />
      <span aria-hidden className="reg-mark reg-mark-tr" style={{ borderColor: color }} />
      <span aria-hidden className="reg-mark reg-mark-bl" style={{ borderColor: color }} />
      <span aria-hidden className="reg-mark reg-mark-br" style={{ borderColor: color }} />
    </>
  )
}

// Recurring solid-blue focal square, bottom-left of a key image.
function SuitsCornerMark() {
  return <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', backgroundColor: '#383ce5', zIndex: 2 }} />
}

// Slide orientation row: eyebrow label (left) + index / optional sub (right).
function SuitsTopRow({ left, index, skin, sub }: { left: string; index: string; skin: SuitsSkin; sub?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
      <span className="label" style={{ color: skin.fg }}>{left}</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
        <span className="label" style={{ color: skin.fg }}>{index}</span>
        {sub && <span className="label" style={{ color: skin.fg, opacity: 0.6 }}>{sub}</span>}
      </div>
    </div>
  )
}

// Single consistent contact footer, reused across slides.
function SuitsFooter({ skin }: { skin: SuitsSkin }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderTop: `1px solid ${skin.line}`, paddingTop: '1.1rem', marginTop: '2.5rem' }}>
      <span className="label" style={{ color: skin.fg }}>@blueismstudio</span>
      <span className="label" style={{ color: skin.fg, opacity: 0.75 }}>blueismstudio.com&nbsp;&nbsp;·&nbsp;&nbsp;hello@blueismstudio.com</span>
    </div>
  )
}

interface CaseStudyProps {
  project: Project
}

export default function CaseStudy({ project }: CaseStudyProps) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const prevProject = projects[currentIndex - 1] || projects[projects.length - 1]
  const nextProject = projects[currentIndex + 1] || projects[0]
  // Editorial "presentation" layout for every discipline except software / UI-UX.
  const disciplineKey = project.discipline.toLowerCase()
  const usePresentation = !(disciplineKey.includes('software') || disciplineKey.includes('ui/ux') || disciplineKey.includes('ux/ui'))

  // Ordered, de-duplicated image pool so the presentation never repeats or runs dry.
  const imagePool = [project.image, ...project.gallery].filter((src, i, arr) => arr.indexOf(src) === i)
  const heroImg = imagePool[0] || project.image
  const detailImg = imagePool[1] || heroImg
  const approachImg = imagePool[2] || detailImg
  const galleryImgs = imagePool.slice(3).length ? imagePool.slice(3) : imagePool.slice(1)

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

      {/* Main Content */}
      <div style={{ margin: '0 auto', padding: '60px 0 0' }}>

        {usePresentation ? (
          <div className="suits-presentation">
            {/* ── SLIDE 1 · HERO (blue) ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              style={{ position: 'relative', backgroundColor: SUITS_BLUE.bg, color: SUITS_BLUE.fg, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'clamp(1.5rem, 4vw, 3.5rem)' }}
            >
              <SuitsRegMarks color={SUITS_BLUE.fg} />
              <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <motion.div
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <SuitsTopRow left={`[ ${project.number} / ${project.title} ]`} index="01 / 05" sub="[ Creative Presentation ]" skin={SUITS_BLUE} />
                </motion.div>

                {/* Wordmark + tagline share one row with the hero image */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center', marginTop: '2rem' }}>
                  <div>
                    <motion.h1
                      initial={{ y: 36, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{ fontFamily: 'var(--font-bold)', fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.03em', margin: 0 }}
                    >
                      {project.title}
                    </motion.h1>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', lineHeight: 1.4, maxWidth: '480px', margin: '1.75rem 0 0', paddingTop: '1.75rem', borderTop: `1px solid ${SUITS_BLUE.line}` }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  {/* Hero image */}
                  <motion.div
                    initial={{ scale: 1.04, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'relative', width: '100%', height: '62vh', overflow: 'hidden' }}
                  >
                    <motion.div
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, duration: 2, ease: 'easeOut' }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <Image src={heroImg} alt={project.title} fill style={{ objectFit: 'cover' }} priority />
                    </motion.div>
                    <SuitsCornerMark />
                  </motion.div>
                </div>

                <SuitsFooter skin={SUITS_BLUE} />
              </div>
            </motion.div>

            {/* ── SLIDE 2 · DETAILS (cream) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', backgroundColor: SUITS_CREAM.bg, color: SUITS_CREAM.fg, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'clamp(1.5rem, 4vw, 3.5rem)', borderTop: '2px solid var(--primary)' }}
            >
              <SuitsRegMarks color={SUITS_CREAM.fg} />
              <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <SuitsTopRow left="[ Project Details ]" index="02 / 05" skin={SUITS_CREAM} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center', flex: 1, marginTop: '2.5rem' }}>
                  <div>
                    <motion.h2
                      initial={{ x: -24, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      style={{ fontFamily: 'var(--font-bold)', fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 2.5rem' }}
                    >
                      Project<br />Details
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div style={{ maxWidth: '440px', marginBottom: '2.75rem' }}>
                        <span className="label" style={{ color: SUITS_CREAM.fg, display: 'block', marginBottom: '0.75rem' }}>[ The Challenge ]</span>
                        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.75, margin: 0 }}>{project.challenge}</p>
                      </div>

                      <dl style={{ margin: 0, maxWidth: '440px' }}>
                        {[
                          ['Discipline', project.discipline],
                          ['Year', project.year],
                          ['Location', project.location],
                        ].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1.5rem', padding: '0.85rem 0', borderBottom: `1px solid ${SUITS_CREAM.line}` }}>
                            <dt className="label" style={{ color: SUITS_CREAM.fg }}>{k}</dt>
                            <dd style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.95rem', textAlign: 'right' }}>{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  </div>

                  {/* Detail image */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', width: '100%', height: '62vh', overflow: 'hidden' }}
                  >
                    <motion.div
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: 'easeOut' }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <Image src={detailImg} alt={`${project.title} — detail`} fill style={{ objectFit: 'cover' }} />
                    </motion.div>
                    <SuitsCornerMark />
                  </motion.div>
                </div>

                <SuitsFooter skin={SUITS_CREAM} />
              </div>
            </motion.div>

            {/* ── SLIDE 3 · APPROACH (blue) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', backgroundColor: SUITS_BLUE.bg, color: SUITS_BLUE.fg, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'clamp(1.5rem, 4vw, 3.5rem)' }}
            >
              <SuitsRegMarks color={SUITS_BLUE.fg} />
              <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <SuitsTopRow left="[ Approach ]" index="03 / 05" skin={SUITS_BLUE} />

                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: 'var(--font-bold)', fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '2.5rem 0 3rem' }}
                >
                  Approach
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center', flex: 1 }}>
                  {/* Approach image */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', width: '100%', height: '62vh', overflow: 'hidden' }}
                  >
                    <motion.div
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: 'easeOut' }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <Image src={approachImg} alt={`${project.title} — approach`} fill style={{ objectFit: 'cover' }} />
                    </motion.div>
                    <SuitsCornerMark />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ maxWidth: '460px', borderTop: `1px solid ${SUITS_BLUE.line}`, paddingTop: '1.75rem' }}
                  >
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.75, margin: 0 }}>{project.approach}</p>
                  </motion.div>
                </div>

                <SuitsFooter skin={SUITS_BLUE} />
              </div>
            </motion.div>

            {/* ── SLIDE 4 · GALLERY (cream, B&W → colour on hover) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', backgroundColor: SUITS_CREAM.bg, color: SUITS_CREAM.fg, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'clamp(1.5rem, 4vw, 3.5rem)' }}
            >
              <SuitsRegMarks color={SUITS_CREAM.fg} />
              <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <SuitsTopRow left="[ Gallery ]" index="04 / 05" skin={SUITS_CREAM} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)', flex: 1, marginTop: '2.5rem' }}>
                  {galleryImgs.map((img, i) => (
                    <div key={i} style={{ position: 'relative', minHeight: '62vh', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ scale: 1.15 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 1.5, ease: 'easeOut' }}
                        style={{ position: 'absolute', inset: 0 }}
                      >
                        <Image src={img} alt={`${project.title} — gallery ${i + 1}`} fill className="img-bw" style={{ objectFit: 'cover' }} />
                      </motion.div>
                      <SuitsCornerMark />
                    </div>
                  ))}
                </div>

                <SuitsFooter skin={SUITS_CREAM} />
              </div>
            </motion.div>

            {/* ── RESULT (cream-dark band, italic serif pull-quote) ── */}
            <div style={{ position: 'relative', backgroundColor: 'var(--cream-dark)', color: 'var(--primary)', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3.5rem)' }}>
              <SuitsRegMarks color="var(--primary)" />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}
              >
                <span className="label" style={{ color: 'var(--primary)' }}>[ The Result ]</span>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: 1.4, margin: '1.75rem 0 0' }}>
                  {project.result}
                </p>
              </motion.div>
            </div>

            {/* ── SLIDE 5 · MORE WORK (blue) ── */}
            <div style={{ position: 'relative', backgroundColor: SUITS_BLUE.bg, color: SUITS_BLUE.fg, padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)' }}>
              <SuitsRegMarks color={SUITS_BLUE.fg} />
              <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
                  <span className="label" style={{ color: SUITS_BLUE.fg }}>[ More Work ]</span>
                  <span className="label" style={{ color: SUITS_BLUE.fg }}>05 / 05</span>
                </div>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
                  <Link href={`/work/${prevProject.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                    <span className="label" style={{ color: SUITS_BLUE.fg }}>[ Previous ]</span>
                    <motion.span
                      whileHover={{ x: -10 }}
                      style={{ fontFamily: 'var(--font-bold)', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', display: 'inline-block' }}
                    >
                      ← {prevProject.title}
                    </motion.span>
                  </Link>
                  <Link href={`/work/${nextProject.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', textAlign: 'right', textDecoration: 'none', color: 'inherit' }}>
                    <span className="label" style={{ color: SUITS_BLUE.fg }}>[ Next ]</span>
                    <motion.span
                      whileHover={{ x: 10 }}
                      style={{ fontFamily: 'var(--font-bold)', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', display: 'inline-block' }}
                    >
                      {nextProject.title} →
                    </motion.span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>

        ) : (
          <>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', paddingTop: '4rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383ce5' }}>
                    {project.discipline}
                  </span>
                  <h1 style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: 'clamp(3rem, 7vw, 7.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}>
                    {project.title}
                  </h1>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--border)' }}>
                  [{project.number}]
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ position: 'relative', height: '65vh', overflow: 'hidden', marginBottom: '4rem' }}
              >
                <Image src={project.image} alt={project.title} fill className="img-bw-fixed" style={{ objectFit: 'cover' }} priority />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', backgroundColor: '#383ce5' }} />
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', marginBottom: '5rem' }} className="case-grid">
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
                  <div style={{ marginTop: '2rem' }}>
                    <a href="#contact-project" style={{ display: 'inline-block', backgroundColor: '#383ce5', color: 'white', fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 1.5rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                      Discuss a similar project →
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', lineHeight: 1.4, color: 'var(--foreground)', margin: 0 }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginTop: '1.5rem' }} className="pillars-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span className="label" style={{ color: '#383ce5' }}>[ The Challenge ]</span>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--secondary)', margin: 0 }}>{project.challenge}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span className="label" style={{ color: '#383ce5' }}>[ The Approach ]</span>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--secondary)', margin: 0 }}>{project.approach}</p>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                    <span className="label" style={{ color: '#383ce5', display: 'block', marginBottom: '0.5rem' }}>[ The Result ]</span>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--foreground)', margin: 0 }}>{project.result}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '6rem' }} className="gallery-grid">
                {project.gallery.map((imgUrl, index) => (
                  <div key={index} style={{ position: 'relative', height: index === 0 ? '550px' : '400px', overflow: 'hidden' }}>
                    <Image src={imgUrl} alt={`${project.title} gallery item`} fill className="img-bw" style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

            </div>

            {/* CTA Band */}
            <section id="contact-project" style={{ backgroundColor: '#383ce5', color: 'white', padding: '5rem 3rem', position: 'relative', overflow: 'hidden', marginBottom: '5rem' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")" }} />
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Get in Touch — Start a project</span>
                <h2 style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1, letterSpacing: '0.02em', textTransform: 'uppercase', margin: 0 }}>Want to build something similar for your brand?</h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Let&apos;s talk about your specific {project.discipline} requirements.</p>
                <div>
                  <a href="mailto:hello@blueismstudio.com" style={{ display: 'inline-block', backgroundColor: 'white', color: '#383ce5', fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1.25rem 2rem', textDecoration: 'none', marginTop: '1rem', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    hello@blueismstudio.com →
                  </a>
                </div>
              </div>
            </section>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
              <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '2.5rem', paddingBottom: '4rem' }}>
                <Link href={`/work/${prevProject.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textDecoration: 'none' }}>
                  <span className="label">[ Previous Project ]</span>
                  <span style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, color: 'var(--foreground)', textTransform: 'uppercase', fontSize: '1.15rem' }}>← {prevProject.title}</span>
                </Link>
                <Link href={`/work/${nextProject.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end', textDecoration: 'none' }}>
                  <span className="label">[ Next Project ]</span>
                  <span style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, color: 'var(--foreground)', textTransform: 'uppercase', fontSize: '1.15rem' }}>{nextProject.title} →</span>
                </Link>
              </nav>
            </div>
          </>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-grid > div { height: 350px !important; }
        }
      `}</style>
    </article>
  )
}
