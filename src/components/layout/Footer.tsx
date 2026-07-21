'use client';

import { motion } from 'framer-motion';

const LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/bixpurr',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/bhoomik-sevta',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(7,10,24,0.8)',
      backdropFilter: 'blur(20px)',
      padding: '48px 0 32px',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 48, alignItems: 'start', marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <defs>
                  <linearGradient id="ftLg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" /><stop offset="1" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
                <rect x="1" y="1" width="38" height="38" rx="10" stroke="url(#ftLg)" strokeWidth="1.5"/>
                <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="url(#ftLg)"
                  fontFamily="Syne, sans-serif" fontWeight="800" fontSize="18">B</text>
              </svg>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
                Bhoomik<span className="gradient-text">.dev</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: 280, lineHeight: 1.7 }}>
              Building intelligent systems and immersive web experiences at the intersection of AI and design.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)} data-cursor
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 200ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-indigo)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Connect</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-cursor
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 200ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-indigo)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(99,102,241,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} Bhoomik Sevta — Built with Next.js & Three.js
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-cursor
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'border-color 200ms',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-indigo)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
          >
            ↑ Back to top
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
