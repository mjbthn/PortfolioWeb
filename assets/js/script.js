document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll-triggered reveal animations (fade in/out both ways) ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // --- Scroll-spy: highlight the active nav link ---
  if (navLinks) {
    const navAnchors = navLinks.querySelectorAll('a[href^="#"]');
    const sections = Array.from(navAnchors)
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
            if (link) link.classList.toggle('is-active', entry.isIntersecting);
          });
        },
        { rootMargin: '-45% 0px -45% 0px' }
      );
      sections.forEach((section) => spyObserver.observe(section));
    }
  }

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
