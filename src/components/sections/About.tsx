import Image from 'next/image';

const technologies = ['TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Socket.io', 'LangChain', 'OpenAI API', 'Three.js'];

export default function About() {
  return (
    <section id="about" className="story-section about-section">
      <div className="section-marker"><span>02</span><span>Learning</span></div>
      <div className="section-shell about-layout">
        <div className="about-image-wrap" data-reveal>
          <Image
            src="/portfolio-website/images/bhoomik-portrait.webp"
            alt="Bhoomik Sevta smiling in a blue shirt"
            width={1024}
            height={1280}
            className="about-image"
            sizes="(max-width: 760px) 84vw, 42vw"
          />
          <span className="image-caption">Curiosity compounds.</span>
        </div>
        <div className="about-copy" data-reveal>
          <p className="eyebrow">A little about me</p>
          <h2>Learning by<br /><em>building things</em></h2>
          <p>I&apos;m Bhoomik, an AI/ML developer and full-stack engineer drawn to the space between useful software and ambitious ideas.</p>
          <p>I work on language technology, retrieval-augmented generation, and digital products that feel thoughtful to use. Most of what I know came from making a project, finding what broke, and trying again.</p>
          <p className="about-signoff">Right now, I&apos;m exploring how intelligent systems can make everyday tools more human.</p>
          <div className="technology-list" aria-label="Selected technologies">
            {technologies.map(tech => <span key={tech}>{tech}</span>)}
          </div>
          <a className="text-link" href="/portfolio-website/files/BhoomikSevta_Resume.pdf" download>Download résumé <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
