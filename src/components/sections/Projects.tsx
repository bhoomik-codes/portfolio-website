'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';

type Category = 'all' | 'ai' | 'web' | 'fullstack' | 'tools';

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All',        value: 'all'      },
  { label: 'AI / ML',    value: 'ai'       },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'Web Dev',    value: 'web'      },
  { label: 'Tools',      value: 'tools'    },
];

const CAT_BADGE: Record<string, string> = {
  ai:        'badge-violet',
  fullstack: 'badge-cyan',
  web:       'badge-indigo',
  tools:     'badge-emerald',
};
const CAT_LABEL: Record<string, string> = {
  ai: 'AI / ML', fullstack: 'Full-Stack', web: 'Web Dev', tools: 'Tools',
};

/* 3D tilt card */
function TiltCard({ children, className, style, onClick }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 30 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 30 });

  return (
    <motion.article
      className={className}
      style={{ ...style, rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top)  / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
    >
      {children}
    </motion.article>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <TiltCard
      className="glass-card"
      style={{ cursor: 'pointer', overflow: 'hidden' }}
      onClick={onClick}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <Image
          src={project.images[imgIdx]}
          alt={project.title}
          fill
          style={{ objectFit: 'cover', transition: 'transform 500ms ease' }}
        />
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,10,24,0.9) 0%, transparent 50%)' }} />

        {/* Carousel dots */}
        {project.images.length > 1 && (
          <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
            {project.images.map((_, i) => (
              <button key={i}
                onClick={e => { e.stopPropagation(); setImgIdx(i); }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', padding: 0 }}
              />
            ))}
          </div>
        )}

        {project.featured && (
          <span className="badge badge-amber" style={{ position: 'absolute', top: 12, left: 12 }}>⭐ Featured</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span className={`badge ${CAT_BADGE[project.category] ?? 'badge-indigo'}`}>
            {CAT_LABEL[project.category]}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{project.year}</span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {project.tags.slice(0, 5).map(t => (
            <span key={t} style={{ padding: '2px 9px', borderRadius: 99, fontSize: '0.7rem', fontFamily: 'var(--font-mono)', background: 'rgba(99,102,241,0.1)', color: 'var(--text-accent)', border: '1px solid rgba(99,102,241,0.2)' }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              data-cursor
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', color: 'var(--text-muted)', transition: 'color 200ms' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-indigo)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              data-cursor
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', color: 'var(--text-muted)', transition: 'color 200ms' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live
            </a>
          )}
          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 500 }}>
            Read More →
          </span>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Category>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [readme, setReadme]     = useState('');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    if (!selected) { setReadme(''); document.body.style.overflow = ''; return; }
    document.body.style.overflow = 'hidden';
    if (selected.readmeUrl) {
      fetch(selected.readmeUrl).then(r => r.text()).then(setReadme).catch(() => setReadme('Failed to load README.'));
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section id="projects" className="section">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--accent-fuchsia)', bottom: 0, right: -150, opacity: 0.07 }} />

      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 40 }}>
          <p className="section-eyebrow">My Work</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-sub">A selection of things I've built — from AI platforms to real-time collaborative apps.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}
        >
          {FILTERS.map(f => (
            <motion.button
              key={f.value}
              onClick={() => setFilter(f.value)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              data-cursor
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${filter === f.value ? 'var(--accent-indigo)' : 'var(--glass-border)'}`,
                background: filter === f.value ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: filter === f.value ? '#a5b4fc' : 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'none',
                transition: 'all 200ms',
                boxShadow: filter === f.value ? 'var(--glow-indigo)' : 'none',
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* README Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(4,6,15,0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-xl)',
                maxWidth: 760,
                width: '100%',
                maxHeight: '85vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', borderBottom: '1px solid var(--glass-border)' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{selected.title}</h3>
                  <span className={`badge ${CAT_BADGE[selected.category] ?? 'badge-indigo'}`} style={{ marginTop: 4 }}>{CAT_LABEL[selected.category]}</span>
                </div>
                <button onClick={() => setSelected(null)} data-cursor
                  style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '1.2rem', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                  ×
                </button>
              </div>
              <div style={{ padding: '24px 28px', overflowY: 'auto' }}>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem' }} className="readme-body">
                  {selected.readmeUrl ? (
                    <ReactMarkdown>{readme || 'Loading README...'}</ReactMarkdown>
                  ) : (
                    <p>No README provided for this project.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .readme-body h1,.readme-body h2,.readme-body h3 { color: var(--text-primary); margin: 1.5em 0 0.6em; }
        .readme-body h1 { font-size: 1.5rem; } .readme-body h2 { font-size: 1.2rem; }
        .readme-body code { background: rgba(99,102,241,0.15); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85em; color: #a5b4fc; }
        .readme-body pre { background: var(--bg-tertiary); padding: 16px; border-radius: 10px; overflow-x: auto; margin: 1em 0; }
        .readme-body pre code { background: none; padding: 0; color: var(--text-primary); }
        .readme-body a { color: var(--accent-indigo); text-decoration: underline; }
        .readme-body ul, .readme-body ol { padding-left: 1.5em; margin: 0.8em 0; }
        .readme-body li { margin: 0.3em 0; }
        .readme-body hr { border: none; border-top: 1px solid var(--glass-border); margin: 1.5em 0; }
        .readme-body blockquote { border-left: 2px solid var(--accent-indigo); padding-left: 12px; margin: 1em 0; color: var(--text-secondary); }
        .readme-body table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin: 1em 0; }
        .readme-body th, .readme-body td { padding: 8px 12px; border: 1px solid var(--glass-border); }
        .readme-body th { background: rgba(99,102,241,0.1); color: var(--text-primary); }
      `}</style>
    </section>
  );
}
