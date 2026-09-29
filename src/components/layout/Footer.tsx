const links = [
  { label: 'GitHub', href: 'https://github.com/bhoomik-codes' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/bhoomik-sevta' },
  { label: 'Email', href: 'mailto:2007bhoomiksevta11@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="wordmark" href="#hero">
          <span className="wordmark-mark" aria-hidden="true">B</span>
          <span>Bhoomik<span className="wordmark-accent">.dev</span></span>
        </a>
        <p>Building toward a brighter tomorrow.</p>
        <nav aria-label="Social links">
          {links.map(link => (
            <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
              {link.label}<span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </nav>
        <span className="footer-copyright">© {new Date().getFullYear()} Bhoomik Sevta</span>
      </div>
    </footer>
  );
}
