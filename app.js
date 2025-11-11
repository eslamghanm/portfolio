

(function () {
  // Helper: throttle function for performance (not strictly needed but good practice)
  function throttle(fn, wait) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  // Smooth scroll for internal links
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav after click
      const navLinks = document.getElementById('nav-links');
      if (navLinks) { navLinks.classList.add('hidden'); navLinks.classList.remove('open'); }
      const toggleBtn = document.querySelector('.nav-toggle');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Mobile nav toggle (Tailwind hidden)
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const nowHidden = links.classList.toggle('hidden');
      links.classList.toggle('open', !nowHidden);
      toggle.setAttribute('aria-expanded', String(!nowHidden));
    });
  }

  // Add subtle shadow on header when scrolled
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', throttle(function () {
      if (window.scrollY > 8) {
        header.style.boxShadow = '0 6px 20px rgba(2, 6, 23, 0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, 100));
  }

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('#name');
      const emailInput = form.querySelector('#email');
      const messageInput = form.querySelector('#message');
      const nameError = nameInput.nextElementSibling;
      const emailError = emailInput.nextElementSibling;
      const messageError = messageInput.nextElementSibling;

      let valid = true;

      // Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        valid = false;
      } else {
        nameError.textContent = '';
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email.';
        valid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      } else {
        emailError.textContent = '';
      }

      // Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter a message.';
        valid = false;
      } else {
        messageError.textContent = '';
      }

      if (valid) {
        // Create email content
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Create mailto link with form data
        const subject = `Portfolio Contact from ${name}`;
        const body = `Hello Eslam,

I found your portfolio and would like to get in touch.

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`;
        
        // Encode the email content
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        
        // Open email client
        const mailtoLink = `mailto:eslamahmedghanem77@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
        window.location.href = mailtoLink;
        
        // Reset form
        form.reset();
        
        // Show success message
        alert('Your email client will open with the message pre-filled. Please send the email to complete your message.');
      }
    });
  }

  // Dynamic year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Enhanced reveal-on-scroll with IntersectionObserver
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a slight delay for more dramatic effect
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.random() * 200);
          io.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach((el, i) => {
      // More sophisticated staggering
      const delay = Math.min(i * 80, 400) + Math.random() * 100;
      el.style.transitionDelay = `${delay}ms`;
      io.observe(el);
    });
  } else {
    // Fallback: make all visible
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Add parallax effect to hero background
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }, 16));
  }

  // Typed.js animations for hero section
  if (typeof Typed !== 'undefined') {
    // Animate the roles (primary typing animation)
    const typedRoles = new Typed('#typed-roles', {
      strings: [
        'Eslam Ghanem',
        'Full-Stack Developer', 
        'Laravel Developer',
        'PHP Developer',
        'JavaScript Specialist',
        'Web Developer',
        'Frontend Developer',
        'Backend Developer'
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: false,
      startDelay: 1000
    });
  }

  // Hover effects are handled in CSS to avoid inline style jitter

  // Add smooth reveal for form fields
  const formFields = document.querySelectorAll('input, textarea');
  formFields.forEach(field => {
    field.addEventListener('focus', () => {
      field.parentElement.style.transform = 'translateY(-2px)';
      field.parentElement.style.transition = 'transform 300ms ease';
    });
    field.addEventListener('blur', () => {
      field.parentElement.style.transform = 'translateY(0)';
    });
  });
})();

// theme toggle removed (light mode deleted)
