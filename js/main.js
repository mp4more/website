/* ========================================
   4 MORE Capital Partners
   Navigation · Mobile · Scroll Reveal
   ======================================== */

(function () {
  'use strict';

  // Navbar scroll effect
  var nav = document.getElementById('nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile navigation
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Hero parallax scroll effect
  // Background drifts up slowly, content fades + lifts as user scrolls
  var hero = document.querySelector('.hero');
  var heroBg = document.querySelector('.hero-bg');
  var heroContainer = hero ? hero.querySelector('.container') : null;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hero && heroBg && heroContainer && !prefersReducedMotion) {
    var ticking = false;

    function heroParallax() {
      var scrollY = window.scrollY || window.pageYOffset;
      var heroHeight = hero.offsetHeight;

      // Only animate while hero is in view
      if (scrollY > heroHeight + 200) {
        ticking = false;
        return;
      }

      // Progress: 0 at top, 1 when hero scrolled out
      var progress = Math.min(scrollY / heroHeight, 1);

      // Background moves up at 40% of scroll speed (parallax)
      var bgShift = scrollY * 0.4;
      heroBg.style.transform = 'translate3d(0,' + bgShift + 'px,0)';

      // Content fades out and drifts up
      var contentShift = scrollY * 0.15;
      var contentOpacity = 1 - progress * 1.2; // fades before fully scrolled
      if (contentOpacity < 0) contentOpacity = 0;
      heroContainer.style.transform = 'translate3d(0,-' + contentShift + 'px,0)';
      heroContainer.style.opacity = contentOpacity;

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(heroParallax);
      }
    }, { passive: true });

    // Run once on load in case page is already scrolled
    heroParallax();
  }

  // Scroll reveal (IntersectionObserver)
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  // Contact form
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.form-submit');
      var original = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Current year
  document.querySelectorAll('.current-year').forEach(function (span) {
    span.textContent = new Date().getFullYear();
  });

})();
