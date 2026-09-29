'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';

type Category = 'all' | 'ai' | 'web' | 'fullstack' | 'tools';
const filters: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Full-stack', value: 'fullstack' },
  { label: 'Web', value: 'web' },
  { label: 'Tools', value: 'tools' },
];
const categories: Record<Project['category'], string> = {
  ai: 'AI / ML', web: 'Web', fullstack: 'Full-stack', tools: 'Tools',
};

export default function Projects() {
  const [filter, setFilter] = useState<Category>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const visibleProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selected]);

  return (
    <section id="projects" className="story-section projects-section">
      <div className="section-marker"><span>01</span><span>Experiments</span></div>
      <div className="section-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Selected work · 2023—2026</p>
            <h2>Things I&apos;ve<br /><em>put into the world</em></h2>
          </div>
          <p className="section-intro">A few experiments in building useful, intelligent software. Each one taught me something worth carrying forward.</p>
        </div>

        <div className="project-filters" aria-label="Filter projects">
          {filters.map(item => (
            <button
              key={item.value}
              type="button"
              className={filter === item.value ? 'is-selected' : ''}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >{item.label}</button>
          ))}
        </div>

        <div className="project-list">
          {visibleProjects.map((project, index) => (
            <article className={`project-item${index === 0 ? ' project-item-featured' : ''}`} key={project.id}>
              <button type="button" className="project-image-button" onClick={() => setSelected(project)} aria-label={`Read about ${project.title}`}>
                <Image src={project.images[0]} alt={`${project.title} interface`} fill sizes="(max-width: 760px) 90vw, 48vw" />
                <span className="project-image-index">{String(index + 1).padStart(2, '0')} / {String(visibleProjects.length).padStart(2, '0')}</span>
              </button>
              <div className="project-copy">
                <p className="eyebrow">{categories[project.category]} <span>·</span> {project.year}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="project-actions">
                  <button type="button" className="text-link" onClick={() => setSelected(project)}>Project notes <span aria-hidden="true">↗</span></button>
                  {project.githubUrl && <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">Source code <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="project-dialog-backdrop" onClick={() => setSelected(null)}>
          <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={event => event.stopPropagation()}>
            <button className="dialog-close" type="button" onClick={() => setSelected(null)} aria-label="Close project details">×</button>
            <p className="eyebrow">{categories[selected.category]} · {selected.year}</p>
            <h3 id="project-dialog-title">{selected.title}</h3>
            <p>{selected.longDescription}</p>
            <div className="project-tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            {selected.githubUrl && <a className="button-primary" href={selected.githubUrl} target="_blank" rel="noreferrer">Explore the repository <span aria-hidden="true">↗</span></a>}
          </section>
        </div>
      )}
    </section>
  );
}
