'use client';

import { useState, useSyncExternalStore } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const RESUME_HREF = '/portfolio-website/files/BhoomikSevta_Resume.pdf';
const THEME_EVENT = 'portfolio-theme-change';

function subscribeToTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getThemeSnapshot(): 'dark' | 'light' {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getServerThemeSnapshot(): 'dark' | 'light' {
  return 'dark';
}

export default function Navbar() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('portfolio-theme', nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="wordmark" href="#hero" aria-label="Bhoomik Sevta, home">
          <span className="wordmark-mark" aria-hidden="true">B</span>
          <span>Bhoomik<span className="wordmark-accent">.dev</span></span>
        </a>

        <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a className="nav-resume" href={RESUME_HREF} download>Résumé <span aria-hidden="true">↓</span></a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'light'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☼' : '◐'}</span>
            <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
