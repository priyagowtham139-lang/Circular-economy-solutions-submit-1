// ===== DASHBOARD JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {

  // === DASHBOARD HAMBURGER ===
  const dashHamburger = document.querySelector('.dash-hamburger');
  const dashSidebar = document.querySelector('.dashboard-sidebar');
  const dashOverlay = document.querySelector('.dash-overlay');

  function toggleSidebar() {
    if (dashHamburger) dashHamburger.classList.toggle('active');
    if (dashSidebar) dashSidebar.classList.toggle('active');
    if (dashOverlay) dashOverlay.classList.toggle('active');
    document.body.style.overflow = dashSidebar && dashSidebar.classList.contains('active') ? 'hidden' : '';
  }

  const dashCloseBtn = document.querySelector('.dash-close-btn');

  if (dashHamburger) {
    dashHamburger.addEventListener('click', toggleSidebar);
  }
  if (dashOverlay) {
    dashOverlay.addEventListener('click', toggleSidebar);
  }
  if (dashCloseBtn) {
    dashCloseBtn.addEventListener('click', toggleSidebar);
  }

  // Close sidebar on link click (mobile)
  if (dashSidebar) {
    const sidebarLinks = dashSidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          toggleSidebar();
        }
      });
    });
  }

  // === LOAD USER DATA FROM LOGIN ===
  const userData = JSON.parse(localStorage.getItem('circUser'));
  if (!userData || !userData.loggedIn) {
    window.location.href = 'login.html';
    return;
  }
  if (userData && userData.loggedIn) {
    const userName = userData.name;
    const userEmail = userData.email;

    // Update welcome banner
    const welcomeHeadings = document.querySelectorAll('.dash-welcome h2');
    welcomeHeadings.forEach(h => {
      if (h.textContent.includes('Welcome') || h.textContent.includes('Control')) {
        h.textContent = 'Welcome, ' + userName;
      }
    });
    const welcomeParagraphs = document.querySelectorAll('.dash-welcome p');
    welcomeParagraphs.forEach(p => {
      if (p.textContent.includes('Welcome back')) {
        p.textContent = 'Welcome back, ' + userName + '! Here\'s your impact overview.';
      }
    });

    // Update topbar profile name
    const profileNames = document.querySelectorAll('.admin-profile span');
    profileNames.forEach(el => { el.textContent = userName; });

    // Update profile section
    const firstNameInput = document.querySelector('#profile input[value="John"]');
    if (firstNameInput) firstNameInput.value = userName.split(' ')[0] || userName;
    const lastNameInput = document.querySelector('#profile input[value="Doe"]');
    if (lastNameInput) lastNameInput.value = userName.split(' ').slice(1).join(' ') || '';
    const emailInput = document.querySelector('#profile input[type="email"][value*="@"]');
    if (emailInput) emailInput.value = userEmail;
    const emailLabel = document.querySelector('#profile .admin-profile + .page-title + .topbar-right + * p');
    const profileEmail = document.querySelector('#profile .dash-card:first-child p');
    if (profileEmail && profileEmail.textContent.includes('@')) profileEmail.textContent = userEmail;
    const profileNameHeading = document.querySelector('#profile .dash-card:first-child h3');
    if (profileNameHeading) profileNameHeading.textContent = userName;
  }

  // === LOGOUT BUTTON ===
  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('circUser');
      window.location.href = 'login.html';
    });
  });

  // === SIDEBAR ACTIVE LINK ===
  const currentPath = window.location.pathname.split('/').pop();
  if (dashSidebar) {
    const links = dashSidebar.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  }

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll('.dash-stat-card h3');
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.replace(/[^0-9.]/g, '');
        const targetValue = parseFloat(text);
        if (isNaN(targetValue)) {
          counterObserver.unobserve(el);
          return;
        }

        const suffix = el.textContent.replace(/[0-9.]/g, '');
        let current = 0;
        const increment = Math.ceil(targetValue / 50);
        const timer = setInterval(function() {
          current += increment;
          if (current >= targetValue) {
            el.textContent = Math.round(targetValue).toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.round(current).toLocaleString() + suffix;
          }
        }, 20);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // === NOTIFICATION BELL ===
  const notifBtn = document.querySelector('.notification-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', function() {
      alert('You have 3 new notifications');
    });
  }

  // === SECTION SWITCHING FOR SIDEBAR ===
  const allSections = document.querySelectorAll('.dashboard-main section');
  const sidebarAnchors = dashSidebar ? dashSidebar.querySelectorAll('a[href^="#"]') : [];

  function switchSection(targetId) {
    allSections.forEach(s => s.style.display = 'none');
    const target = document.getElementById(targetId);
    if (target) target.style.display = 'block';
    sidebarAnchors.forEach(a => a.classList.remove('active'));
    const activeLink = dashSidebar.querySelector('a[href="#' + targetId + '"]');
    if (activeLink) activeLink.classList.add('active');
  }

  if (dashSidebar) {
    sidebarAnchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const targetId = href.replace('#', '');
        switchSection(targetId);
        // Close mobile sidebar if open
        if (dashSidebar) dashSidebar.classList.remove('active');
        if (dashHamburger) dashHamburger.classList.remove('active');
        if (dashOverlay) dashOverlay.classList.remove('active');
        document.body.style.overflow = '';
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          setTimeout(function() {
            targetEl.scrollIntoView(true);
          }, 50);
        }
      });
    });
  }

  // Show initial section
  const activeAnchor = dashSidebar ? dashSidebar.querySelector('.sidebar-menu a.active') : null;
  if (activeAnchor) {
    const href = activeAnchor.getAttribute('href');
    if (href) switchSection(href.replace('#', ''));
  }

  // === SETTINGS TOGGLE SWITCHES ===
  const settingsSections = document.querySelectorAll('#settings, #security');
  settingsSections.forEach(section => {
    const toggles = section.querySelectorAll('label');
    toggles.forEach(label => {
      const checkbox = label.querySelector('input[type="checkbox"]');
      const span = label.querySelector('span');
      if (checkbox && span) {
        label.addEventListener('click', function(e) {
          e.preventDefault();
          checkbox.checked = !checkbox.checked;
          span.style.background = checkbox.checked ? 'var(--secondary)' : '#ccc';
        });
      }
    });
  });

  // === WINDOW RESIZE - Fix sidebar ===
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (dashSidebar) dashSidebar.classList.remove('active');
      if (dashHamburger) dashHamburger.classList.remove('active');
      if (dashOverlay) dashOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
