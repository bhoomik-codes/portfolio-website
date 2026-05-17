'use client';

import { useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { socialLinks } from '@/data/portfolio';
import styles from './Hero.module.css';

const ROLES = ['AI-ML Developer', 'Full-Stack Engineer', 'Creative Technologist'];

function TypingText() {
  const textRef = useRef<HTMLSpanElement>(null);
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const role = ROLES[roleIdx.current];
      if (!textRef.current) return;

      if (!deleting.current) {
        charIdx.current++;
        textRef.current.textContent = role.slice(0, charIdx.current);
        if (charIdx.current === role.length) {
          deleting.current = true;
          setTimeout(tick, 1600);
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
      setTimeout(tick, deleting.current ? 50 : 80);
    };

    const id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <span className={styles.typingWrapper}>
      <span ref={textRef} />
      <span className={styles.cursor}>|</span>
    </span>
  );
}



const stagger: Variants = {
  hidden:  {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden:  { opacity: 0, y: 30 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Background orbs */}
      <div className={`${styles.orb} ${styles.orbBlue}`}   />
      <div className={`${styles.orb} ${styles.orbPurple}`} />
      <div className={`${styles.orb} ${styles.orbTeal}`}   />

      <div className={styles.content}>
        {/* Left: text */}
        <motion.div
          className={styles.textSide}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for opportunities
          </motion.div>

          <motion.h1 variants={item} className={styles.headline}>
            Hello, I&apos;m<br />
            <span className={styles.name}>Bhoomik Sevta</span>
          </motion.h1>

          <motion.div variants={item} className={styles.roleRow}>
            <span className={styles.roleLabel}>I&apos;m a </span>
            <span className={styles.role}><TypingText /></span>
          </motion.div>

          <motion.p variants={item} className={styles.description}>
            Crafting intelligent systems and immersive web experiences. I turn complex ideas into elegant,
            high-performance applications — from&nbsp;
            <span className={styles.highlight}>AI chatbots</span> to{' '}
            <span className={styles.highlight}>3D interactive UIs</span>.
          </motion.p>

          <motion.div variants={item} className={styles.ctas}>
            <motion.a
              href="#projects"
              className="btn-primary"
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
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>

          <motion.div variants={item} className={styles.socials}>
            {socialLinks.map((s) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                whileHover={{ scale: 1.15, y: -3 }}
                aria-label={s.name}
              >
                {s.icon === 'github' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                )}
                {s.icon === 'linkedin' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {s.icon === 'twitter' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        >
          <div className={styles.imageWrapper}>
            <img src="/images/profile.jpg" alt="Bhoomik Sevta" className={styles.profileImg} />
            <div className={styles.imageGlow} />
            <div className={styles.imageFrame} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
