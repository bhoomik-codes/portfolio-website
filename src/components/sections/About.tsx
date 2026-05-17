'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from './About.module.css';

const RobotScene = dynamic(() => import('@/components/3d/RobotScene'), { ssr: false });

const stats = [
  { value: '3+',  label: 'Years of\nCoding'    },
  { value: '10+', label: 'Projects\nBuilt'      },
  { value: '5+',  label: 'AI/ML\nProjects'     },
  { value: '∞',   label: 'Cups of\nCoffee'     },
];

const techStack = [
  'TypeScript', 'Python', 'Next.js', 'React', 'Node.js',
  'PostgreSQL', 'Socket.io', 'LangChain', 'OpenAI', 'Three.js',
  'Docker', 'Prisma', 'Express', 'Framer Motion', 'Git',
];

export default function About() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* 3D Scene */}
          <motion.div
            className={styles.imageSide}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.sceneSide}>
              <RobotScene mousePos={mousePos} />
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`glass-card ${styles.statCard}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel} style={{ whiteSpace: 'pre-line' }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            className={styles.textSide}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="section-label">About Me</p>
            <h2 className={`section-title ${styles.title}`}>
              Building the Future,<br />
              <span className="gradient-text">One Line at a Time</span>
            </h2>
            <p className={styles.bio}>
              I&apos;m <strong>Bhoomik Sevta</strong>, an aspiring AI-ML Developer and Full-Stack Engineer
              passionate about crafting intelligent systems and immersive web experiences. I thrive at
              the intersection of <em>machine learning</em> and <em>modern UI engineering</em>.
            </p>
            <p className={styles.bio}>
              My focus areas include <span className={styles.hl}>Natural Language Processing</span>,{' '}
              <span className={styles.hl}>Retrieval-Augmented Generation</span>,{' '}
              <span className={styles.hl}>Generative AI</span>, and{' '}
              <span className={styles.hl}>Full-Stack Web Development</span>. I love building things
              that push the boundaries of what&apos;s possible.
            </p>

            <div className={styles.techStack}>
              <p className={styles.stackLabel}>Tech I work with</p>
              <div className={styles.tags}>
                {techStack.map((t, i) => (
                  <motion.span
                    key={t}
                    className={styles.tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ width: 'fit-content', marginTop: 8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
