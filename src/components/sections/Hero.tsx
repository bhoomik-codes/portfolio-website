import Image from 'next/image';

const chapters = [
  { number: '01', label: 'Experiments', href: '#projects' },
  { number: '02', label: 'Learning', href: '#about' },
  { number: '03', label: 'Systems', href: '#skills' },
  { number: '04', label: 'Next horizon', href: '#contact' },
];

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-art" aria-hidden="true">
        <Image
          src="/portfolio-website/images/journey-world.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 720px) 100vw, 76vw"
          className="hero-art-image"
        />
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> Build / Learn / Explore / Repeat</p>
          <h1>Bhoomik<br /><span>Sevta</span></h1>
          <p className="hero-role">AI/ML &amp; Full-Stack Developer</p>
          <p className="hero-intro">I turn ideas into intelligent products that make a real difference.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects">Explore projects <span aria-hidden="true">↗</span></a>
            <a className="button-secondary" href="#contact">Contact</a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            <a href="https://github.com/bhoomik-codes" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://linkedin.com/in/bhoomik-sevta" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <nav className="chapter-list" aria-label="Journey chapters">
          {chapters.map(chapter => (
            <a href={chapter.href} key={chapter.number}>
              <span>{chapter.number}</span>{chapter.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="hero-bottomline" aria-hidden="true">
        <span>Same curiosity. A brighter tomorrow.</span>
        <span>India · IST</span>
      </div>
    </section>
  );
}
