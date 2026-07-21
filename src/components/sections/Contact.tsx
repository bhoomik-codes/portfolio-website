'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContactFormData } from '@/types';

type Status = 'idle' | 'sending' | 'success' | 'error';

const CONTACT_INFO = [
  {
    icon: '✉️',
    label: 'Email',
    value: '2007bhoomiksevta11@gmail.com',
    href: 'mailto:2007bhoomiksevta11@gmail.com',
    color: 'var(--accent-indigo)',
    glow: 'var(--glow-indigo)',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'India 🇮🇳',
    href: null,
    color: 'var(--accent-emerald)',
    glow: '0 0 30px rgba(16,185,129,0.5)',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/bhoomik-sevta',
    href: 'https://linkedin.com/in/bhoomik-sevta',
    color: 'var(--accent-cyan)',
    glow: 'var(--glow-cyan)',
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--glass-border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.925rem',
  outline: 'none',
  transition: 'border-color 200ms, box-shadow 200ms',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: 7,
};

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = () => {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim())    e.name    = 'Required';
    if (!form.email.trim())   e.email   = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...form, 
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE' 
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const field = (f: keyof ContactFormData) => ({
    value: form[f],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [f]: e.target.value })),
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = 'var(--accent-indigo)';
      e.target.style.boxShadow = 'var(--glow-indigo)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = errors[f] ? '#ef4444' : 'var(--glass-border)';
      e.target.style.boxShadow = '';
    },
    style: { ...inputStyle, borderColor: errors[f] ? '#ef4444' : 'var(--glass-border)' },
  });

  return (
    <section id="contact" className="section">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--accent-indigo)', top: -100, left: -100, opacity: 0.1 }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 60 }}
        >
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Build Together</span>
          </h2>
          <p className="section-sub">
            Have a project in mind, an opportunity to share, or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }}>

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                className="glass-card"
                style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${info.color}22`, border: `1px solid ${info.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{info.label}</div>
                  {info.href ? (
                    <a href={info.href} target="_blank" rel="noopener noreferrer" data-cursor
                      style={{ fontSize: '0.85rem', color: info.color, fontWeight: 500, wordBreak: 'break-all' }}>
                      {info.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{info.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div
              className="glass-card"
              style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent-emerald)', animation: 'ping 1.5s ease-in-out infinite', opacity: 0.5 }} />
                <div style={{ position: 'absolute', inset: 1, borderRadius: '50%', background: 'var(--accent-emerald)' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 2 }}>Open to Opportunities</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Internships · Freelance · Full-time</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="glass-card"
            style={{ padding: '36px 32px' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button className="btn-ghost" onClick={() => setStatus('idle')} data-cursor>Send Another</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input type="text" placeholder="Your name" {...field('name')} />
                      {errors.name && <span style={{ fontSize: '0.72rem', color: '#ef4444', fontFamily: 'var(--font-mono)', marginTop: 4, display: 'block' }}>{errors.name}</span>}
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input type="email" placeholder="your@email.com" {...field('email')} />
                      {errors.email && <span style={{ fontSize: '0.72rem', color: '#ef4444', fontFamily: 'var(--font-mono)', marginTop: 4, display: 'block' }}>{errors.email}</span>}
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Subject</label>
                    <input type="text" placeholder="What's this about?" {...field('subject')} />
                    {errors.subject && <span style={{ fontSize: '0.72rem', color: '#ef4444', fontFamily: 'var(--font-mono)', marginTop: 4, display: 'block' }}>{errors.subject}</span>}
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Message</label>
                    <textarea rows={5} placeholder="Tell me about your project or opportunity..." {...field('message')} style={{ ...inputStyle, borderColor: errors.message ? '#ef4444' : 'var(--glass-border)', resize: 'vertical', minHeight: 120 }} />
                    {errors.message && <span style={{ fontSize: '0.72rem', color: '#ef4444', fontFamily: 'var(--font-mono)', marginTop: 4, display: 'block' }}>{errors.message}</span>}
                  </div>

                  {status === 'error' && (
                    <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', fontSize: '0.85rem' }}>
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor
                    style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
                  >
                    {status === 'sending' ? (
                      <>
                        <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes ping { 0%,100% { transform: scale(1); opacity:0.5; } 50% { transform: scale(1.8); opacity:0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
