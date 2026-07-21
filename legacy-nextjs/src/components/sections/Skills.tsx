'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import styles from './Skills.module.css';

const categoryColors: Record<string, string> = {
  frontend: '#5E5CE6',
  backend:  '#39FF14',
  ai:       '#A358DF',
  tools:    '#00E5CC',
};

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend:  'Backend',
  ai:       'AI & ML',
  tools:    'DevOps & Tools',
};

export default function Skills() {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {categories.map((cat, ci) => {
            const catSkills = skills.filter(s => s.category === cat);
            const color = categoryColors[cat] ?? '#5E5CE6';
            return (
              <motion.div
                key={cat}
                className={`glass-card ${styles.categoryCard}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.1 }}
              >
                <div className={styles.catHeader}>
                  <span className={styles.catDot} style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                  <h3 className={styles.catTitle} style={{ color }}>
                    {categoryLabels[cat]}
                  </h3>
                </div>

                <div className={styles.skillsList}>
                  {catSkills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      className={styles.skillRow}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.1 + si * 0.06, duration: 0.5 }}
                    >
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      </div>
                      <div className={styles.barTrack}>
                        <motion.div
                          className={styles.barFill}
                          style={{ background: `linear-gradient(90deg, ${skill.color}, ${color})` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: ci * 0.1 + si * 0.08, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <div
                          className={styles.barGlow}
                          style={{ background: skill.color, width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
