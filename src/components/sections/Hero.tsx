'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';

const RobotScene = dynamic(() => import('@/components/3d/RobotScene'), { ssr: false });

/* ─── Roles for the typing animation ─── */
const ROLES = ['AI / ML Developer', 'Full-Stack Engineer', 'Creative Technologist'];

/* ─── Typing text component ─── */
function TypingText() {
  const textRef = useRef<HTMLSpanElement>(null);
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const role = ROLES[roleIdx.current];
      if (!textRef.current) return;

      if (!deleting.current) {
        charIdx.current++;
        textRef.current.textContent = role.slice(0, charIdx.current);
        if (charIdx.current === role.length) {
          deleting.current = true;
          timeoutId = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIdx.current--;
        textRef.current.textContent = role.slice(0, charIdx.current);
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % ROLES.length;
        }
      }
      timeoutId = setTimeout(tick, deleting.current ? 45 : 75);
    };

    timeoutId = setTimeout(tick, 700);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span style={{ display: 'inline', color: 'var(--accent-indigo)', fontWeight: 600 }}>
      <span ref={textRef} />
      <span style={{ animation: 'blink 0.9s step-end infinite', display: 'inline-block', marginLeft: 2, color: 'var(--accent-indigo)', fontWeight: 300 }}>|</span>
    </span>
  );
}

/* ─── Social icon links ─── */
const SOCIALS = [
  {
    name: 'GitHub',
    url: 'https://github.com/bhoomik-codes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/bhoomik-sevta',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/bhoomik_codes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

/* ─── Animation variants ─── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

export default function Hero() {
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    mousePos.current = {
      x: (e.clientX - cx) / cx,
      y: (e.clientY - cy) / cy,
    };
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background orbs */}
      <div className="orb" style={{ width: 600, height: 600, background: 'var(--accent-indigo)', top: -200, left: -150, opacity: 0.11, animation: 'driftOrb 14s ease-in-out infinite alternate' }} />
      <div className="orb" style={{ width: 450, height: 450, background: 'var(--accent-violet)', top: '30%', right: -100, opacity: 0.09, animation: 'driftOrb 10s ease-in-out infinite alternate-reverse' }} />
      <div className="orb" style={{ width: 380, height: 380, background: 'var(--accent-cyan)', bottom: -80, left: '40%', opacity: 0.08, animation: 'driftOrb 16s ease-in-out infinite alternate' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Mobile-only: profile photo shown above text */}
        <div className="hero-profile-mobile">
          <div className="profile-wrapper">
            <div className="profile-glow" />
            <Image
              src="/portfolio-website/images/profile.jpg"
              alt="Bhoomik Sevta"
              width={220}
              height={220}
              className="profile-img"
              priority
              style={{ objectFit: 'cover', aspectRatio: '1/1' }}
            />
            <div className="profile-frame" />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 48,
          minHeight: '100vh',
          paddingTop: 100,
          paddingBottom: 60,
        }}>

          {/* Left: text */}
          <motion.div variants={container} initial="hidden" animate="show">

            {/* Status badge */}
            <motion.div variants={item} style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                height: 1, width: 32,
                background: 'var(--accent-indigo)',
                boxShadow: '0 0 8px rgba(99,102,241,0.6)',
                position: 'relative', overflow: 'hidden',
              }}>
                <span style={{
                  position: 'absolute', top: 0, left: '-100%',
                  width: '100%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  animation: 'shimmer 2.5s infinite',
                }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--text-secondary)',
              }}>
                Available for Opportunities
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                marginBottom: 12,
              }}
            >
              Hello, I&apos;m<br />
              <span className="gradient-text">Bhoomik Sevta</span>
            </motion.h1>

            {/* Typing role row */}
            <motion.div
              variants={item}
              style={{
                fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
                color: 'var(--text-secondary)',
                fontWeight: 400,
                marginBottom: 20,
              }}
            >
              I&apos;m a <TypingText />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={item}
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.78,
                maxWidth: 460,
                marginBottom: 32,
              }}
            >
              Crafting intelligent systems and immersive web experiences — from{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>AI chatbots</span>{' '}
              to{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>3D interactive UIs</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
              <motion.a
                href="#projects"
                className="btn-primary"
                data-cursor
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-ghost"
                data-cursor
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Let&apos;s Talk
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
              {SOCIALS.map(s => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  data-cursor
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 42, height: 42,
                    borderRadius: 10,
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-secondary)',
                    backdropFilter: 'blur(8px)',
                    transition: 'color 200ms, border-color 200ms, box-shadow 200ms',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent-indigo)';
                    e.currentTarget.style.borderColor = 'var(--accent-indigo)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              style={{
                display: 'flex',
                gap: 32,
                paddingTop: 24,
                borderTop: '1px solid rgba(99,102,241,0.12)',
              }}
            >
              {[
                { val: '5+',  label: 'Projects Built' },
                { val: '3+',  label: 'Years Learning'  },
                { val: '∞',   label: 'Curiosity'       },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    background: 'var(--grad-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}>
                    {s.val}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: 4,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-3d-side"
            style={{ height: '70vh', minHeight: 460, position: 'relative' }}
          >
            <RobotScene mousePos={mousePos} />

            {/* Floating info card — AI/ML */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', bottom: '18%', left: '-5%',
                background: 'var(--glass-bg-heavy)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: 'var(--glow-indigo)',
                zIndex: 2,
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🧠</div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>AI / ML</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Deep Learning</div>
              </div>
            </motion.div>

            {/* Floating info card — Full Stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', top: '14%', right: '-3%',
                background: 'var(--glass-bg-heavy)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid rgba(6,182,212,0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: 'var(--glow-cyan)',
                zIndex: 2,
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>⚡</div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>Full Stack</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>React + Next.js</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em' }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: 1.5, height: 30, background: 'linear-gradient(var(--accent-indigo), transparent)', borderRadius: 99 }}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-3d-side { display: none !important; }
          #hero > div > div:last-child > div:last-child { grid-template-columns: 1fr !important; }
          #hero > div > div:last-child { grid-template-columns: 1fr !important; min-height: auto !important; padding-top: 80px !important; }
        }
      `}</style>
    </section>
  );
}
