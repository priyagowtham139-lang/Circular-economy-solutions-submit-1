// ===== AUTH JAVASCRIPT - Login & Signup =====

document.addEventListener('DOMContentLoaded', function() {

  // =============================================
  // PASSWORD STRENGTH CHECKER
  // =============================================
  function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  }

  function updateStrengthMeter(password, meter, textEl) {
    const strength = checkPasswordStrength(password);
    meter.className = 'strength-bar';
    if (password.length === 0) {
      textEl.textContent = '';
      return;
    }
    if (strength <= 1) {
      meter.classList.add('weak');
      textEl.textContent = 'Weak';
      textEl.style.color = '#ff4d4d';
    } else if (strength <= 3) {
      meter.classList.add('medium');
      textEl.textContent = 'Medium';
      textEl.style.color = '#ffa726';
    } else {
      meter.classList.add('strong');
      textEl.textContent = 'Strong';
      textEl.style.color = '#52b788';
    }
  }

  // Password strength meters
  document.querySelectorAll('.password-input').forEach(input => {
    const wrapper = input.closest('.form-group') || input.parentElement.closest('.form-group') || input.parentElement.parentElement;
    const meter = wrapper.querySelector('.strength-bar');
    const strengthText = wrapper.querySelector('.strength-text');

    if (input && meter && strengthText) {
      input.addEventListener('input', function() {
        updateStrengthMeter(this.value, meter, strengthText);
      });
    }
  });

  // =============================================
  // EYE TOGGLE FOR PASSWORDS (Single click only)
  // =============================================
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const input = this.previousElementSibling;
      if (input && input.type === 'password') {
        input.type = 'text';
        this.classList.add('visible');
      } else if (input) {
        input.type = 'password';
        this.classList.remove('visible');
      }
    });
  });

  // =============================================
  // LOGIN VALIDATION
  // =============================================

  // Real-time email validation (login)
  const loginEmail = document.getElementById('loginEmail');
  const emailAlert = document.getElementById('emailAlert');
  if (loginEmail && emailAlert) {
    loginEmail.addEventListener('input', function() {
      const val = this.value.trim();
      if (val.length > 0 && !val.toLowerCase().endsWith('@gmail.com')) {
        emailAlert.textContent = 'Only Gmail addresses are allowed';
        emailAlert.className = 'alert-message error';
        this.style.borderColor = '#ff4d4d';
      } else {
        emailAlert.className = 'alert-message';
        this.style.borderColor = '';
      }
    });
  }

  // Real-time email validation (signup)
  const signupEmail = document.getElementById('signupEmail');
  const signupEmailAlert = document.getElementById('signupEmailAlert');
  if (signupEmail && signupEmailAlert) {
    signupEmail.addEventListener('input', function() {
      const val = this.value.trim();
      if (val.length > 0 && !val.toLowerCase().endsWith('@gmail.com')) {
        signupEmailAlert.textContent = 'Only Gmail addresses are allowed';
        signupEmailAlert.className = 'alert-message error';
        this.style.borderColor = '#ff4d4d';
      } else {
        signupEmailAlert.className = 'alert-message';
        this.style.borderColor = '';
      }
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('loginEmail');
      const password = document.getElementById('loginPassword');
      const role = document.querySelector('input[name="role"]:checked') || document.querySelector('.role-option.active');
      const remember = document.getElementById('rememberMe');

      let valid = true;

      // Email validation - only Gmail
      const emailAlert = document.getElementById('emailAlert');
      if (!email.value.toLowerCase().endsWith('@gmail.com')) {
        if (emailAlert) {
          emailAlert.textContent = 'Only Gmail addresses are allowed';
          emailAlert.className = 'alert-message error';
        }
        email.style.borderColor = '#ff4d4d';
        valid = false;
      } else {
        if (emailAlert) emailAlert.className = 'alert-message';
        email.style.borderColor = '';
      }

      // Password strength check
      const passAlert = document.getElementById('passwordAlert');
      if (password.value.length < 8) {
        if (passAlert) {
          passAlert.textContent = 'Password must be at least 8 characters with uppercase, lowercase, number & special character';
          passAlert.className = 'alert-message error';
        }
        password.style.borderColor = '#ff4d4d';
        valid = false;
      } else {
        const strength = checkPasswordStrength(password.value);
        if (strength < 3) {
          if (passAlert) {
            passAlert.textContent = 'Please use a stronger password';
            passAlert.className = 'alert-message error';
          }
          password.style.borderColor = '#ff4d4d';
          valid = false;
        } else {
          if (passAlert) passAlert.className = 'alert-message';
          password.style.borderColor = '';
        }
      }

      if (!valid) return;

      // Determine role and redirect
      let roleValue = 'user';
      if (role) {
        if (role.tagName === 'INPUT') {
          roleValue = role.value;
        } else {
          roleValue = role.dataset.value || 'user';
        }
      }

      // Save user data to localStorage
      const userName = email.value.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      localStorage.setItem('circUser', JSON.stringify({
        name: userName,
        email: email.value,
        role: roleValue,
        loggedIn: true
      }));

      if (roleValue === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'user-dashboard.html';
      }
    });
  }

  // Role selection
  document.querySelectorAll('.role-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.role-option').forEach(o => o.classList.remove('active'));
      this.classList.add('active');
      const radio = this.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // =============================================
  // SIGNUP VALIDATION
  // =============================================
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('signupName');
      const email = document.getElementById('signupEmail');
      const password = document.getElementById('signupPassword');
      const confirm = document.getElementById('signupConfirm');
      const privacy = document.getElementById('privacyCheck');
      const nameAlert = document.getElementById('nameAlert');
      const emailAlert = document.getElementById('signupEmailAlert');
      const passAlert = document.getElementById('signupPassAlert');
      const confirmAlert = document.getElementById('confirmAlert');
      const privacyAlert = document.getElementById('privacyAlert');

      let valid = true;

      // Name validation - only alphabets
      if (!/^[A-Za-z\s]+$/.test(name.value)) {
        if (nameAlert) {
          nameAlert.textContent = 'Only alphabets are allowed in name';
          nameAlert.className = 'alert-message error';
        }
        name.style.borderColor = '#ff4d4d';
        valid = false;
      } else {
        if (nameAlert) nameAlert.className = 'alert-message';
        name.style.borderColor = '';
      }

      // Email - only Gmail
      if (!email.value.toLowerCase().endsWith('@gmail.com')) {
        if (emailAlert) {
          emailAlert.textContent = 'Only Gmail addresses are allowed';
          emailAlert.className = 'alert-message error';
        }
        email.style.borderColor = '#ff4d4d';
        valid = false;
      } else {
        if (emailAlert) emailAlert.className = 'alert-message';
        email.style.borderColor = '';
      }

      // Password strength
      if (password.value.length < 8 || checkPasswordStrength(password.value) < 3) {
        if (passAlert) {
          passAlert.textContent = 'Password must be at least 8 characters with uppercase, lowercase, number & special character';
          passAlert.className = 'alert-message error';
        }
        password.style.borderColor = '#ff4d4d';
        valid = false;
      } else {
        if (passAlert) passAlert.className = 'alert-message';
        password.style.borderColor = '';
      }

      // Confirm password
      if (confirm.value !== password.value) {
        if (confirmAlert) {
          confirmAlert.textContent = 'Passwords do not match';
          confirmAlert.className = 'alert-message error';
        }
        confirm.style.borderColor = '#ff4d4d';
        valid = false;
      } else {
        if (confirmAlert) confirmAlert.className = 'alert-message';
        confirm.style.borderColor = '';
      }

      // Privacy checkbox
      if (!privacy || !privacy.checked) {
        if (privacyAlert) {
          privacyAlert.textContent = 'Please accept Privacy Policy and Terms & Conditions';
          privacyAlert.className = 'alert-message error';
        }
        valid = false;
      } else {
        if (privacyAlert) privacyAlert.className = 'alert-message';
      }

      if (!valid) return;

      // Save user data to localStorage
      localStorage.setItem('circUser', JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        role: 'user',
        loggedIn: true
      }));

      // Redirect to user dashboard
      window.location.href = 'user-dashboard.html';
    });
  }

  // =============================================
  // FORGOT PASSWORD → 404
  // =============================================
  const forgotLinks = document.querySelectorAll('.forgot-link');
  forgotLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  // =============================================
  // REAL-TIME NAME VALIDATION (Signup)
  // =============================================
  const nameInput = document.getElementById('signupName');
  const nameAlert = document.getElementById('nameAlert');
  if (nameInput && nameAlert) {
    nameInput.addEventListener('input', function() {
      if (/[0-9]/.test(this.value)) {
        nameAlert.textContent = 'Only alphabets are allowed in name';
        nameAlert.className = 'alert-message error';
        this.style.borderColor = '#ff4d4d';
      } else {
        nameAlert.className = 'alert-message';
        this.style.borderColor = '';
      }
    });
  }

  // =============================================
  // SOCIAL MEDIA ICONS → 404
  // =============================================
  document.querySelectorAll('.footer-social a').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  // =============================================
  // FOOTER TOGGLE LINKS → respective pages
  // =============================================
  document.querySelectorAll('.footer-toggle-content a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Let normal navigation happen
    });
  });

});
