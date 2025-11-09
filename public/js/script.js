AOS.init({
  duration: 1000,
  easing: 'ease-out',
  once: true
});

console.log("Portfolio website loaded successfully!");
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

AOS.init({
  duration: 1000,
  easing: 'ease-out',
  once: true
});

// === Candle-style unblur effect ===
const hero = document.getElementById("hero");

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  hero.style.setProperty("--x", `${x}px`);
  hero.style.setProperty("--y", `${y}px`);
});

hero.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const rect = hero.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  hero.style.setProperty("--x", `${x}px`);
  hero.style.setProperty("--y", `${y}px`);
});


hero.addEventListener("mouseleave", () => {
  hero.style.setProperty("--x", `50%`);
  hero.style.setProperty("--y", `50%`);
});


// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});