'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', service: 'Graphic Design', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend yet — acknowledge locally so the form is usable.
    setSent(true)
  }

  return (
    <section id="contact" style={{ backgroundColor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
      {/* Blue vertical accent strip — left edge */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', backgroundColor: '#383ce5' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '7rem 2rem' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '4.5rem', alignItems: 'start' }}>

          {/* Left — heading + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>[ 06 ] — Start a conversation</span>
            <h2 style={{
              fontFamily: 'var(--font-bold)', fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.92,
              letterSpacing: '-0.01em', textTransform: 'uppercase',
              color: 'var(--foreground)', margin: 0,
            }}>
              Let&apos;s build<br />
              <span style={{ color: '#383ce5' }}>together.</span>
            </h2>

            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.8, color: 'rgba(13,13,13,0.7)', margin: '2rem 0 0', maxWidth: '420px' }}>
              Tell us about your vision. We&apos;re currently accepting select brand, spatial, and product commissions globally.
            </p>

            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <a href="mailto:hello@blueismstudio.com" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--foreground)', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', width: 'fit-content' }}>
                hello@blueismstudio.com
              </a>
              <span className="label">Casablanca, Morocco · الدار البيضاء · Remote</span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              <div style={{ border: '1px solid var(--border)', padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: '1.75rem', textTransform: 'uppercase', color: '#383ce5', marginBottom: '0.75rem' }}>
                  Message received
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'rgba(13,13,13,0.7)', margin: 0 }}>
                  Thank you, {form.name || 'friend'}. We&apos;ll be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Field label="Your name">
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Doe" className="contact-input" />
                </Field>
                <Field label="Email address">
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@studio.com" className="contact-input" />
                </Field>
                <Field label="Service of interest">
                  <select name="service" value={form.service} onChange={handleChange} className="contact-input">
                    <option>Graphic Design</option>
                    <option>Interior Design</option>
                    <option>3D Design</option>
                    <option>Software</option>
                    <option>UI/UX Design</option>
                  </select>
                </Field>
                <Field label="Tell us about your project">
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="A few words about what you're imagining…" className="contact-input" style={{ resize: 'vertical' }} />
                </Field>

                <button
                  type="submit"
                  style={{
                    marginTop: '0.5rem',
                    backgroundColor: '#383ce5', color: 'white',
                    fontFamily: 'var(--font-bold)', fontWeight: 700,
                    fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '1.2rem 2rem', border: 'none', cursor: 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Send message →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 0.75rem 0;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.3s ease;
          border-radius: 0;
        }
        .contact-input::placeholder { color: rgba(13,13,13,0.35); }
        .contact-input:focus { border-color: #383ce5; }
        select.contact-input { cursor: pointer; }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(56,60,229,0.7)', marginBottom: '0.5rem' }}>
        {label}
      </span>
      {children}
    </label>
  )
}
