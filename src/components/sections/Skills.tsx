'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Image from 'next/image';

type TechGroup = 'frontend' | 'backend' | 'ai' | 'workflow';
type Filter = 'all' | TechGroup;

const filters: { label: string; value: Filter }[] = [
  { label: 'Everything', value: 'all' },
  { label: 'Interfaces', value: 'frontend' },
  { label: 'Systems', value: 'backend' },
  { label: 'AI & language', value: 'ai' },
  { label: 'Workflow', value: 'workflow' },
];

const technologies: { name: string; icon: string; group: TechGroup; note: string; monochrome?: boolean }[] = [
  { name: 'TypeScript', icon: 'typescript', group: 'frontend', note: 'Typed interfaces' },
  { name: 'React', icon: 'react', group: 'frontend', note: 'Component systems' },
  { name: 'Next.js', icon: 'nextdotjs', group: 'frontend', note: 'Web applications', monochrome: true },
  { name: 'Three.js', icon: 'threedotjs', group: 'frontend', note: 'Interactive worlds', monochrome: true },
  { name: 'Node.js', icon: 'nodedotjs', group: 'backend', note: 'Server-side tools' },
  { name: 'PostgreSQL', icon: 'postgresql', group: 'backend', note: 'Relational data' },
  { name: 'SQLite', icon: 'sqlite', group: 'backend', note: 'Embedded storage', monochrome: true },
  { name: 'Socket.io', icon: 'socketdotio', group: 'backend', note: 'Real-time systems', monochrome: true },
  { name: 'Python', icon: 'python', group: 'ai', note: 'Prototypes to production' },
  { name: 'NLP', icon: 'nlp', group: 'ai', note: 'Language technology' },
  { name: 'LangChain', icon: 'langchain', group: 'ai', note: 'LLM workflows' },
  { name: 'OpenAI API', icon: 'ai-orbit', group: 'ai', note: 'Generative features' },
  { name: 'Docker', icon: 'docker', group: 'workflow', note: 'Repeatable setups' },
  { name: 'Git & GitHub', icon: 'github', group: 'workflow', note: 'Versioned builds', monochrome: true },
  { name: 'Prisma', icon: 'prisma', group: 'workflow', note: 'Data access', monochrome: true },
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
                <span className="tech-orb">
                  <Image
                    className={`tech-logo${technology.monochrome ? ' is-monochrome' : ''}`}
                    src={`/portfolio-website/images/toolbox/${technology.icon}.svg`}
                    alt=""
                    aria-hidden="true"
                    width={38}
                    height={38}
                  />
                </span>
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
