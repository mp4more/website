/* ========================================
   4 MORE Capital Partners - Main JavaScript
   Navbar · Mobile Nav · Scroll Reveal · Interactions
   ======================================== */

(function () {
  'use strict';

  // ---------- Navbar Scroll Effect ----------
  var nav = document.getElementById('nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---------- Mobile Navigation ----------
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---------- Intersection Observer - Scroll Reveal ----------
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for old browsers
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- Hero Metrics Entrance Animation ----------
  var heroMetrics = document.querySelector('.hero-metrics');

  if (heroMetrics && 'IntersectionObserver' in window) {
    var metrics = heroMetrics.querySelectorAll('.hero-metric');

    metrics.forEach(function (metric, index) {
      metric.style.opacity = '0';
      metric.style.transform = 'translateY(16px)';
      metric.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      metric.style.transitionDelay = (0.6 + index * 0.1) + 's';
    });

    // Trigger after page loads
    window.addEventListener('load', function () {
      metrics.forEach(function (metric) {
        metric.style.opacity = '1';
        metric.style.transform = 'translateY(0)';
      });
    });
  }

  // ---------- Smooth Parallax on Hero (subtle) ----------
  var heroContent = document.querySelector('.hero-content');

  if (heroContent && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        var opacity = 1 - (scrolled / window.innerHeight) * 0.6;
        var translate = scrolled * 0.15;
        heroContent.style.transform = 'translateY(' + translate + 'px)';
        heroContent.style.opacity = opacity;
      }
    }, { passive: true });
  }

  // ---------- Contact Form ----------
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('.form-submit');
      var originalHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Message Sent &#10003;';
      submitBtn.style.background = '#16a34a';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ---------- Smooth scroll for anchor links ----------
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

  // ---------- Current year in footer ----------
  var yearSpans = document.querySelectorAll('.current-year');
  yearSpans.forEach(function (span) {
    span.textContent = new Date().getFullYear();
  });

})();
