/* ========================================
   4 MORE Capital Partners - Main JavaScript
   Navbar · Mobile Nav · Scroll Reveal
   Mouse Effects · Scroll Progress · Flow
   ======================================== */

(function () {
  'use strict';

  // ---------- Scroll Progress Bar ----------
  var scrollProgress = document.querySelector('.scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

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

  // Combined scroll handler for performance
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavScroll();
        updateScrollProgress();
        updateHeroParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  handleNavScroll();
  updateScrollProgress();

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
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

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

  // ---------- Section Visibility (animated divider lines) ----------
  var sections = document.querySelectorAll('.section');

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    sections.forEach(function (s) {
      sectionObserver.observe(s);
    });
  }

  // ---------- Hero Metrics Entrance Animation ----------
  var heroMetrics = document.querySelector('.hero-metrics');

  if (heroMetrics && 'IntersectionObserver' in window) {
    var metrics = heroMetrics.querySelectorAll('.hero-metric');

    metrics.forEach(function (metric, index) {
      metric.style.opacity = '0';
      metric.style.transform = 'translateY(20px)';
      metric.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      metric.style.transitionDelay = (0.8 + index * 0.12) + 's';
    });

    // Trigger after page loads
    window.addEventListener('load', function () {
      metrics.forEach(function (metric) {
        metric.style.opacity = '1';
        metric.style.transform = 'translateY(0)';
      });
    });
  }

  // ---------- Smooth Parallax on Hero ----------
  var heroContent = document.querySelector('.hero-content');

  function updateHeroParallax() {
    if (!heroContent || window.innerWidth <= 768) return;
    var scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      var opacity = 1 - (scrolled / window.innerHeight) * 0.7;
      var translate = scrolled * 0.2;
      heroContent.style.transform = 'translateY(' + translate + 'px)';
      heroContent.style.opacity = opacity;
    }
  }

  // ---------- Mouse-Following Spotlight on Hero ----------
  var hero = document.querySelector('.hero');
  var heroSpotlight = document.querySelector('.hero-spotlight');

  if (hero && heroSpotlight && window.innerWidth > 768) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      heroSpotlight.style.left = (e.clientX - rect.left) + 'px';
      heroSpotlight.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  // ---------- Cursor Glow (follows mouse on light sections) ----------
  var cursorGlow = document.querySelector('.cursor-glow');

  if (cursorGlow && window.innerWidth > 768) {
    var glowX = 0;
    var glowY = 0;
    var currentX = 0;
    var currentY = 0;

    document.addEventListener('mousemove', function (e) {
      glowX = e.clientX;
      glowY = e.clientY;
    });

    // Smooth follow with requestAnimationFrame
    function animateCursorGlow() {
      currentX += (glowX - currentX) * 0.08;
      currentY += (glowY - currentY) * 0.08;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      requestAnimationFrame(animateCursorGlow);
    }

    animateCursorGlow();

    // Only show on non-dark sections
    document.addEventListener('mouseover', function (e) {
      var target = e.target.closest('.section-dark, .hero, .footer, .page-hero');
      if (target) {
        cursorGlow.classList.remove('active');
      } else {
        cursorGlow.classList.add('active');
      }
    });
  }

  // ---------- Magnetic Button Effect ----------
  var magneticBtns = document.querySelectorAll('.btn-white, .btn-dark, .form-submit');

  if (window.innerWidth > 768) {
    magneticBtns.forEach(function (btn) {
      btn.classList.add('btn-magnetic');

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

  // ---------- Tilt Effect on Service / Value / Step Cards ----------
  var tiltCards = document.querySelectorAll('.service-item, .service-block, .value-item, .step-item, .advantage-item');

  if (window.innerWidth > 768) {
    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var tiltX = (y - 0.5) * 4; // degrees
        var tiltY = (x - 0.5) * -4; // degrees

        card.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        // Reset transition after settling
        setTimeout(function () {
          card.style.transition = '';
        }, 500);
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

  // ---------- Staggered Entrance for Grid Children ----------
  var gridContainers = document.querySelectorAll('.values-grid, .grid-3, .advantage-grid, .steps-grid');

  if ('IntersectionObserver' in window) {
    var gridObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var children = entry.target.children;
          for (var i = 0; i < children.length; i++) {
            (function (child, delay) {
              setTimeout(function () {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, delay);
            })(children[i], i * 80);
          }
          gridObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    gridContainers.forEach(function (grid) {
      // Set initial state for children
      var children = grid.children;
      for (var i = 0; i < children.length; i++) {
        children[i].style.opacity = '0';
        children[i].style.transform = 'translateY(20px)';
        children[i].style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      }
      gridObserver.observe(grid);
    });
  }

  // ---------- Current year in footer ----------
  var yearSpans = document.querySelectorAll('.current-year');
  yearSpans.forEach(function (span) {
    span.textContent = new Date().getFullYear();
  });

})();
