// Initialize AOS with slightly different settings for smoother reveals
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100 /* Trigger animations a bit sooner */
});

console.log("Portfolio enhanced with scroll effects!");

// === 1. HERO UNBLUR EFFECT (Kept your existing logic) ===
const hero = document.getElementById("hero");
if (hero) {
  const moveLight = (x, y) => {
     hero.style.setProperty("--x", `${x}px`);
     hero.style.setProperty("--y", `${y}px`);
  }

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    moveLight(e.clientX - rect.left, e.clientY - rect.top);
  });

  hero.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const rect = hero.getBoundingClientRect();
    moveLight(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--x", `50%`);
    hero.style.setProperty("--y", `50%`);
  });
}

// === 2. PROFILE REVOLVE ON SCROLL ===
const aboutSection = document.querySelector('.about');
const profileImage = document.querySelector('.about-image img');

function handleProfileRotation() {
  if (!aboutSection || !profileImage || window.innerWidth < 768) return;

  const sectionTop = aboutSection.offsetTop;
  const sectionHeight = aboutSection.offsetHeight;
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // Calculate how far we are through the section.
  // We start rotating when the section enters the view, and finish when it leaves.
  const startOffset = sectionTop - windowHeight;
  const endOffset = sectionTop + sectionHeight;
  const scrollProgress = (scrollY - startOffset) / (endOffset - startOffset);

  // Clamp progress between 0 and 1
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);

  // Rotate 360 degrees based on progress
  const rotation = clampedProgress * 360;
  profileImage.style.transform = `rotate(${rotation}deg)`;
}


// === 3. PROJECT CARDS PARALLAX ===
const projectCards = document.querySelectorAll('.project-grid .card');

function handleProjectParallax() {
  if (window.innerWidth < 768) return; // Disable on mobile for performance

  projectCards.forEach((card, index) => {
    const speed = 0.05 + (index * 0.02); // Different speed for each card (staggered)
    const rect = card.getBoundingClientRect();
    
    // Only animate if in view
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Calculate an offset based on its position in the viewport
      const yPos = (window.innerHeight - rect.top) * speed;
      // Apply translation. We use specific property to not overwrite hover scales if possible,
      // but standard transform is most performant.
      // NOTE: This might conflict slightly with CSS hover if not careful.
      // We only apply this if NOT hovering (optional refinement)
      if (!card.matches(':hover')) {
         card.style.transform = `translateY(${yPos}px)`;
      }
    }
  });
}


// === MAIN SCROLL LISTENER ===
// Combine scroll operations for better performance
let isScrolling = false;

window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      handleProfileRotation();
      handleProjectParallax();
      updateActiveNavLink();
      handleScrollTopButton();
      isScrolling = false;
    });
    isScrolling = true;
  }
});


// === UTILITIES ===
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const scrollTopBtn = document.querySelector('.scroll-top');

function updateActiveNavLink() {
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
    // Handle the 'Home' link which might just be '/'
    const href = link.getAttribute('href');
    if (href === `#${current}` || (current === 'hero' && href === '/')) {
      link.classList.add('active');
    }
  });
}

function handleScrollTopButton() {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

// Smooth scroll for standard anchor links if you have them
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
       target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === 4. PROJECT FILTER LOGIC ===
const filterBtns = document.querySelectorAll('.filter-btn');
const allProjects = document.querySelectorAll('.project-grid .card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add to clicked
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      allProjects.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Re-trigger AOS animation for a nice effect
          card.classList.remove('aos-animate');
          setTimeout(() => card.classList.add('aos-animate'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


// === 5. CONTACT FORM HANDLING ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerText;
    
    // Simulate sending
    btn.innerText = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = 'Message Sent!';
      btn.style.backgroundColor = '#4caf50'; // Green
      
      // Reset form
      contactForm.reset();
      
      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        btn.style.backgroundColor = ''; // Revert to CSS default
      }, 3000);
    }, 1500);
  });
}