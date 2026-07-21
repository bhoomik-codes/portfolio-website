'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';
import styles from './Projects.module.css';

type Category = 'all' | 'ai' | 'web' | 'fullstack' | 'tools';

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All',        value: 'all' },
  { label: 'AI / ML',    value: 'ai' },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'Web Dev',    value: 'web' },
  { label: 'Tools',      value: 'tools' },
];

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  return (
    <motion.article
      className={styles.card}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div className={styles.cardImage}>
        <Image
          src={project.images[currentImageIndex]}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          className={styles.img}
        />
        <div className={`${styles.imageOverlay} ${hovered ? styles.overlayVisible : ''}`} />

        {project.images.length > 1 && (
          <div className={`${styles.carouselControls} ${hovered ? styles.controlsVisible : ''}`}>
            <button onClick={prevImage} className={styles.carouselBtn} aria-label="Previous image">❮</button>
            <div className={styles.carouselDots}>
              {project.images.map((_, i) => (
                <span key={i} className={`${styles.dot} ${i === currentImageIndex ? styles.dotActive : ''}`} />
              ))}
            </div>
            <button onClick={nextImage} className={styles.carouselBtn} aria-label="Next image">❯</button>
          </div>
        )}

        {project.featured && (
          <span className={`neon-badge blue ${styles.featuredBadge}`}>Featured</span>
        )}

        {/* Hover links */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className={styles.hoverLinks}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.hoverLink} onClick={(e) => e.stopPropagation()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Source
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.hoverLink} onClick={(e) => e.stopPropagation()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={`neon-badge ${project.category === 'ai' ? 'purple' : project.category === 'fullstack' ? 'teal' : 'blue'}`}>
            {project.category === 'ai' ? 'AI / ML' : project.category === 'fullstack' ? 'Full-Stack' : project.category === 'web' ? 'Web Dev' : 'Tools'}
          </span>
          <span className={styles.year}>{project.year}</span>
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.tags.slice(0, 5).map(t => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>('');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  useEffect(() => {
    if (selectedProject?.readmeUrl) {
      fetch(selectedProject.readmeUrl)
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.text();
        })
        .then((text) => setReadmeContent(text))
        .catch(() => setReadmeContent('Failed to load README.'));
    } else {
      setReadmeContent('');
    }
    
    // Prevent scrolling when modal is open
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">My Work</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of things I&apos;ve built — from AI platforms to real-time apps.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {FILTERS.map(f => (
            <motion.button
              key={f.value}
              className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
              onClick={() => setFilter(f.value)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard 
                key={p.id} 
                project={p} 
                index={i} 
                onClick={() => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>×</button>
                <div className={styles.markdownBody}>
                  {selectedProject.readmeUrl ? (
                    <ReactMarkdown>{readmeContent || 'Loading...'}</ReactMarkdown>
                  ) : (
                    <p>No README provided for this project.</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
