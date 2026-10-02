/**
 * Hung Pham - Portfolio Website JavaScript
 * Pure Vanilla JS - No external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Mobile Hamburger Menu Toggle
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const header = document.getElementById('header');

  if (hamburgerBtn && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking on any navigation link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-open')) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('nav-open') &&
          !navLinks.contains(e.target) &&
          !hamburgerBtn.contains(e.target)) {
        toggleMenu();
      }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
        toggleMenu();
        hamburgerBtn.focus();
      }
    });
  }

  // ==========================================
  // 2. Sticky Header Styling on Scroll
  // ==========================================
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ==========================================
  // 3. Active Nav Link Highlighting
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ==========================================
  // 4. Subtle Typing Animation in Hero
  // ==========================================
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = [
      "International Economics student",
      "Logistics & documentation practitioner",
      "Curious learner & AI enthusiast"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    // Start typing after initial load delay
    setTimeout(typeLoop, 800);
  }

  // ==========================================
  // 5. Lazy-Load Section Background Images
  // ==========================================
  const lazyBgSections = document.querySelectorAll('.lazy-section-bg');
  
  if ('IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('bg-loaded');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '300px 0px 300px 0px',
      threshold: 0.01
    });

    lazyBgSections.forEach(section => bgObserver.observe(section));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyBgSections.forEach(section => section.classList.add('bg-loaded'));
  }

  // ==========================================
  // 6. Scroll Reveal with IntersectionObserver
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================
  // 7. Copy Email to Clipboard & Toast
  // ==========================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');
  const toast = document.getElementById('toast');
  const emailToCopy = 'vn11235813@gmail.com';

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback for older contexts
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        if (copyText) copyText.textContent = 'Copied!';
        showToast('Email address copied to clipboard!');

        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy Email';
        }, 2500);
      } catch (err) {
        showToast('Failed to copy. Please manually copy: ' + emailToCopy);
      }
    });
  }
});
