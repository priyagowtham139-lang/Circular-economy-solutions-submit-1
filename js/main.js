// ===== MAIN JAVASCRIPT - Global Functions =====

document.addEventListener('DOMContentLoaded', function() {

  // === HAMBURGER MENU ===
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click and scroll to top
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
        if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
          window.scrollTo(0, 0);
        }
      });
    });
  }

  // === SCROLL TO TOP (Footer Logo) ===
  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    footerLogo.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === HEADER SCROLL EFFECT ===
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // === FOOTER TOGGLES (Mobile) ===
  const footerToggles = document.querySelectorAll('.footer-toggle');
  footerToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content && content.classList.contains('footer-toggle-content')) {
        content.classList.toggle('active');
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      }
    });
  });

  // === SCROLL ANIMATIONS ===
  const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target') || target.textContent.replace(/,/g, ''), 10);
        if (isNaN(targetValue)) return;

        let current = 0;
        const increment = Math.ceil(targetValue / 60);
        const timer = setInterval(function() {
          current += increment;
          if (current >= targetValue) {
            target.textContent = targetValue.toLocaleString();
            clearInterval(timer);
          } else {
            target.textContent = current.toLocaleString();
          }
        }, 25);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === VIDEO BACKGROUND FALLBACK ===
  const videos = document.querySelectorAll('.hero-video');
  videos.forEach(video => {
    video.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
});
