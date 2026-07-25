// Navigation menu toggle functionality, Square Automatic Carousels & Scroll Animation Observer
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Automatic Square Carousel for Baco & Valiente (Antes & Después)
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    let currentIndex = 0;

    if (slides.length <= 1) return;

    function showNextSlide() {
      slides[currentIndex].classList.remove('active');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

      currentIndex = (currentIndex + 1) % slides.length;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    // Auto switch every 3.5 seconds
    setInterval(showNextSlide, 3500);
  });

  // Scroll Animation Observer for Chat Bubbles ([data-animate] / .scroll-animate)
  const animateElements = document.querySelectorAll('[data-animate]');

  if (animateElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 180);
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      });

      animateElements.forEach((el) => scrollObserver.observe(el));
    } else {
      // Fallback for older browsers
      animateElements.forEach((el) => el.classList.add('is-visible'));
    }
  }
});
