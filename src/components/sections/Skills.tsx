'use client';

import { useMemo, useState, type CSSProperties } from 'react';

type TechGroup = 'frontend' | 'backend' | 'ai' | 'workflow';
type Filter = 'all' | TechGroup;

const filters: { label: string; value: Filter }[] = [
  { label: 'Everything', value: 'all' },
  { label: 'Interfaces', value: 'frontend' },
  { label: 'Systems', value: 'backend' },
  { label: 'AI & language', value: 'ai' },
  { label: 'Workflow', value: 'workflow' },
];

const technologies: { name: string; mark: string; group: TechGroup; note: string }[] = [
  { name: 'TypeScript', mark: 'TS', group: 'frontend', note: 'Typed interfaces' },
  { name: 'React', mark: 'R', group: 'frontend', note: 'Component systems' },
  { name: 'Next.js', mark: 'N', group: 'frontend', note: 'Web applications' },
  { name: 'Three.js', mark: '3D', group: 'frontend', note: 'Interactive worlds' },
  { name: 'Node.js', mark: 'JS', group: 'backend', note: 'Server-side tools' },
  { name: 'PostgreSQL', mark: 'PG', group: 'backend', note: 'Relational data' },
  { name: 'SQLite', mark: 'SQL', group: 'backend', note: 'Embedded storage' },
  { name: 'Socket.io', mark: 'IO', group: 'backend', note: 'Real-time systems' },
  { name: 'Python', mark: 'Py', group: 'ai', note: 'Prototypes to production' },
  { name: 'NLP', mark: 'NLP', group: 'ai', note: 'Language technology' },
  { name: 'LangChain', mark: 'LC', group: 'ai', note: 'LLM workflows' },
  { name: 'OpenAI API', mark: 'AI', group: 'ai', note: 'Generative features' },
  { name: 'Docker', mark: 'D', group: 'workflow', note: 'Repeatable setups' },
  { name: 'Git & GitHub', mark: 'G', group: 'workflow', note: 'Versioned builds' },
  { name: 'Prisma', mark: 'P', group: 'workflow', note: 'Data access' },
];

export default function Skills() {
  const [filter, setFilter] = useState<Filter>('all');
  const visibleTechnologies = useMemo(
    () => filter === 'all' ? technologies : technologies.filter(technology => technology.group === filter),
    [filter],
  );

  return (
    <section id="skills" className="story-section skills-section">
      <div className="section-marker"><span>03</span><span>Systems</span></div>
      <div className="section-shell">
        <div className="section-heading-row" data-reveal>
          <div>
            <p className="eyebrow">Toolbox · always in motion</p>
            <h2>Tools for the<br /><em>next small wonder</em></h2>
          </div>
          <p className="section-intro">A curious mix of languages, systems, and creative tools I use to turn an idea into something real.</p>
        </div>

        <div className="toolbox-console" data-reveal>
          <div className="toolbox-console-top">
            <span className="console-light" aria-hidden="true" />
            <span className="console-label">BHOOMIK / FIELD KIT</span>
            <span className="console-status"><span aria-hidden="true" /> {visibleTechnologies.length} in rotation</span>
          </div>

          <div className="toolbox-filters" role="group" aria-label="Filter technologies">
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

          <div className="tech-grid">
            {visibleTechnologies.map((technology, index) => (
              <article
                className="tech-card"
                data-group={technology.group}
                data-reveal
                key={technology.name}
                style={{ '--reveal-delay': `${(index % 5) * 45}ms` } as CSSProperties}
              >
                <span className="tech-orb"><span>{technology.mark}</span></span>
                <span className="tech-name">{technology.name}</span>
                <span className="tech-note">{technology.note}</span>
              </article>
            ))}
          </div>
        </div>

        <p className="toolbox-footnote" data-reveal><span>FIELD NOTE</span> The stack is a starting point. The interesting part is what it lets me make.</p>
      </div>
    </section>
  );
}
