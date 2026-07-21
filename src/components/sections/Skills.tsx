'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';

const CAT_CONFIG: Record<string, { label: string; color: string; icon: string; glow: string }> = {
  frontend: { label: 'Frontend',        color: '#6366f1', icon: '🎨', glow: 'var(--glow-indigo)' },
  backend:  { label: 'Backend',         color: '#10b981', icon: '⚙️', glow: '0 0 30px rgba(16,185,129,0.5)' },
  ai:       { label: 'AI & ML',         color: '#8b5cf6', icon: '🧠', glow: 'var(--glow-violet)' },
  tools:    { label: 'DevOps & Tools',  color: '#06b6d4', icon: '🛠️', glow: 'var(--glow-cyan)' },
};

export default function Skills() {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className="section">
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--accent-indigo)', top: 0, left: '20%', opacity: 0.08 }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 60 }}
        >
          <p className="section-eyebrow">Expertise</p>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-sub">
            Tools and technologies I use to build intelligent, scalable, and beautiful experiences.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {categories.map((cat, ci) => {
            const catSkills = skills.filter(s => s.category === cat);
            const cfg = CAT_CONFIG[cat] ?? { label: cat, color: '#6366f1', icon: '✦', glow: 'var(--glow-indigo)' };
            return (
              <motion.div
                key={cat}
                className="glass-card"
                style={{ padding: '28px 24px' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.12 }}
              >
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 10,
                    background: `${cfg.color}22`,
                    border: `1px solid ${cfg.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    boxShadow: cfg.glow.replace('0.5', '0.25'),
                  }}>
                    {cfg.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: cfg.color }}>
                    {cfg.label}
                  </h3>
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {catSkills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.1 + si * 0.06, duration: 0.5 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: cfg.color }}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Bar track */}
                      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
                        <motion.div
                          style={{
                            height: '100%',
                            borderRadius: 99,
                            background: `linear-gradient(90deg, ${cfg.color}, ${skill.color ?? cfg.color})`,
                            position: 'relative',
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.3, delay: ci * 0.1 + si * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
