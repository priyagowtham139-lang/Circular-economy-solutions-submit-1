// ===== WELCOME PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {

  // === CREATE FLOATING PARTICLES ===
  const particlesContainer = document.querySelector('.welcome-particles');
  if (particlesContainer) {
    // Additional particles via JS for variety
    const symbols = ['♻', '♻', '♻', '🌱'];
    for (let i = 0; i < 6; i++) {
      const span = document.createElement('span');
      span.textContent = symbols[i];
      span.style.cssText = `
        position: absolute; font-size: ${20 + Math.random() * 30}px;
        opacity: ${0.1 + Math.random() * 0.2};
        top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
        animation: particleFloat ${15 + Math.random() * 15}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `;
      particlesContainer.appendChild(span);
    }
  }

  // === RIPPLE EFFECT ON BUTTONS ===
  const rippleBtns = document.querySelectorAll('.ripple-btn');
  rippleBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        left: ${x}px; top: ${y}px;
        width: ${Math.max(rect.width, rect.height)}px;
        height: ${Math.max(rect.width, rect.height)}px;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // === ENTER WEBSITE BUTTON ===
  const enterBtn = document.querySelector('.enter-website');
  if (enterBtn) {
    enterBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';
      setTimeout(function() {
        window.location.href = this.getAttribute('href') || 'index.html';
      }.bind(this), 500);
    });
  }

  // === KEYBOARD NAVIGATION ===
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const focused = document.activeElement;
      if (focused && focused.classList.contains('welcome-btn')) {
        focused.click();
      }
    }
  });
});
