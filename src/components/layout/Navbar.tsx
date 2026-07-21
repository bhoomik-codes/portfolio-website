'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-nav)' as string,
        padding: '0 28px',
        transition: 'background 300ms, backdrop-filter 300ms, border-color 300ms',
        background: scrolled ? 'rgba(7,10,24,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(200%) blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(200%) blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#hero" onClick={e => scrollTo(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: 10 }} data-cursor>
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <defs>
              <linearGradient id="navLg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" /><stop offset="1" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="38" height="38" rx="10" stroke="url(#navLg)" strokeWidth="1.5"/>
            <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="url(#navLg)"
              fontFamily="Syne, sans-serif" fontWeight="800" fontSize="18">B</text>
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            Bhoomik
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} onClick={e => scrollTo(e, link.href)} data-cursor
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: active === link.href ? 'var(--accent-indigo)' : 'var(--text-secondary)',
                transition: 'color 200ms, background 200ms',
                background: active === link.href ? 'rgba(99,102,241,0.1)' : 'transparent',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = active === link.href ? 'var(--accent-indigo)' : 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}

          <a href="/portfolio-website/document/BhoomikSevta_Resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor
            style={{
              marginLeft: 12,
              padding: '9px 22px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--grad-primary)',
              color: '#fff',
              fontSize: '0.88rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              transition: 'transform 200ms, box-shadow 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--glow-indigo)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            Résumé ↗
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          data-cursor
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: 'var(--text-primary)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
            {menuOpen
              ? <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              : <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            background: 'var(--glass-bg-heavy)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderTop: '1px solid var(--glass-border)',
            padding: '16px 28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} onClick={e => scrollTo(e, link.href)} data-cursor
              style={{ padding: '12px 0', color: 'var(--text-secondary)', fontWeight: 500, borderBottom: '1px solid rgba(99,102,241,0.08)' }}
            >
              {link.label}
            </a>
          ))}
          <a href="/document/BhoomikSevta_Resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor
            style={{ marginTop: 12, padding: '12px 22px', borderRadius: 'var(--radius-md)', background: 'var(--grad-primary)', color: '#fff', fontWeight: 600, textAlign: 'center' }}
          >
            Résumé ↗
          </a>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
