'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const STATS = [
  { value: '3+',  label: 'Years Coding'    },
  { value: '10+', label: 'Projects Built'  },
  { value: '5+',  label: 'AI/ML Projects'  },
  { value: '∞',   label: 'Cups of Coffee'  },
];

const TECH = [
  'TypeScript', 'Python', 'Next.js', 'React', 'Node.js',
  'PostgreSQL', 'Socket.io', 'LangChain', 'OpenAI API', 'Three.js',
  'Docker', 'Prisma', 'FastAPI', 'Framer Motion', 'Git',
];

const BADGE_COLORS = ['badge-indigo','badge-violet','badge-cyan','badge-emerald','badge-amber','badge-fuchsia'];

export default function About() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  return (
    <section id="about" className="section">
      {/* Background accent */}
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--accent-violet)', bottom: -100, right: -100, opacity: 0.09 }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 72, alignItems: 'center' }} className="about-grid">

          {/* Left — profile image + stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            {/* Profile image */}
            <div className="profile-wrapper" style={{ maxWidth: 380 }}>
              <div className="profile-glow" />
              <Image
                src="/portfolio-website/images/profile.jpg"
                alt="Bhoomik Sevta"
                width={380}
                height={460}
                className="profile-img"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="profile-frame" />

              {/* Name badge overlay */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  position: 'absolute',
                  bottom: 18,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--glass-bg-heavy)',
                  backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 18px',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  zIndex: 2,
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Bhoomik Sevta</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-indigo)', marginTop: 2 }}>AI/ML · Full-Stack Engineer</div>
              </motion.div>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="glass-card"
                  style={{ padding: '18px 20px', textAlign: 'center' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.9rem',
                    fontWeight: 800,
                    background: 'var(--grad-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginTop: 5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — text side */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="section-eyebrow">About Me</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Building the Future,<br />
              <span className="gradient-text">One Commit at a Time</span>
            </motion.h2>

            <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.82, marginBottom: 14 }}>
                I&apos;m an aspiring{' '}
                <strong style={{ color: 'var(--text-primary)' }}>AI-ML Developer</strong>{' '}
                and{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Full-Stack Engineer</strong>{' '}
                passionate about building intelligent systems and immersive digital experiences.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.82, marginBottom: 14 }}>
                My focus areas include{' '}
                <span style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>Natural Language Processing</span>,{' '}
                <span style={{ color: 'var(--accent-violet)', fontWeight: 600 }}>Retrieval-Augmented Generation</span>,{' '}
                and{' '}
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Generative AI</span>.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.82 }}>
                I love building things that push the boundaries of what&apos;s possible — whether it&apos;s an AI-powered assistant, a real-time collaboration platform, or an immersive 3D web experience.
              </p>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 14,
              }}>
                Tech I work with
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {TECH.map((t, i) => (
                  <motion.span
                    key={t}
                    className={`badge ${BADGE_COLORS[i % BADGE_COLORS.length]}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="/portfolio-website/document/BhoomikSevta_Resume.pdf"
              download
              className="btn-ghost"
              style={{ width: 'fit-content', display: 'inline-flex' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-cursor
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Résumé
            </motion.a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-grid > div:first-child .profile-wrapper { max-width: 280px !important; }
        }
      `}</style>
    </section>
  );
}
