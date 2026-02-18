/* ========================================
   4 MORE Capital Partners - Main JavaScript v2
   Particles · Scroll Reveal · Micro-interactions
   ======================================== */

(function () {
  'use strict';

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---------- Mobile Navigation ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

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
  }

  // ---------- Floating Particles (Hero) ----------
  const particleContainer = document.querySelector('.hero-particles');

  if (particleContainer) {
    var particleCount = window.innerWidth < 768 ? 12 : 25;

    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.className = 'particle';

      var size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.3 + 0.05;

      particleContainer.appendChild(particle);
    }
  }

  // ---------- Intersection Observer - Scroll Reveal ----------
  var revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  var revealElements = document.querySelectorAll(revealSelectors);

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for old browsers
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ---------- Stagger Children Animation ----------
  var staggerContainers = document.querySelectorAll('.stagger-children');

  if ('IntersectionObserver' in window && staggerContainers.length > 0) {
    var staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var children = entry.target.children;
          for (var j = 0; j < children.length; j++) {
            children[j].classList.add('revealed');
          }
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    staggerContainers.forEach(function (container) {
      staggerObserver.observe(container);
    });
  }

  // ---------- Smooth Parallax on Hero Stats ----------
  var heroStats = document.querySelectorAll('.hero-stat');

  if (heroStats.length > 0 && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroStats.forEach(function (stat, index) {
          var speed = 0.03 + (index * 0.015);
          stat.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
      }
    }, { passive: true });
  }

  // ---------- Magnetic Button Effect ----------
  var magneticBtns = document.querySelectorAll('.btn-primary');

  if (window.innerWidth > 1024) {
    magneticBtns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  // ---------- Contact Form ----------
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('.form-submit');
      var originalHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Message Sent! &#10003;';
      submitBtn.style.background = '#5ce1e6';
      submitBtn.style.color = '#fff';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Current year in footer ----------
  var yearSpans = document.querySelectorAll('.current-year');
  yearSpans.forEach(function (span) {
    span.textContent = new Date().getFullYear();
  });

})();
