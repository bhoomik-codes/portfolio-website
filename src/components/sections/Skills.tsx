const disciplines = [
  { number: '01', title: 'Interfaces', details: 'TypeScript · React · Next.js · Three.js' },
  { number: '02', title: 'Systems', details: 'Node.js · PostgreSQL · Socket.io · Docker' },
  { number: '03', title: 'Intelligence', details: 'Python · NLP · LLMs · Retrieval-augmented generation' },
];

export default function Skills() {
  return (
    <section id="skills" className="story-section skills-section">
      <div className="section-marker"><span>03</span><span>Systems</span></div>
      <div className="section-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">What I work with</p>
            <h2>Ideas into<br /><em>working systems</em></h2>
          </div>
          <p className="section-intro">The tools change from project to project. These are the areas I keep coming back to.</p>
        </div>
        <div className="discipline-list">
          {disciplines.map(item => (
            <article className="discipline-row" key={item.number}>
              <span className="discipline-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.details}</p>
              <span className="discipline-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
