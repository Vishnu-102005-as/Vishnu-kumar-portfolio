/* ===== FULL-SCREEN SCROLL PORTFOLIO – script.js ===== */
(function () {
  'use strict';

  /* --- Theme toggle --- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  // Load saved preference, or detect system preference
  var saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }

  toggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  var container = document.querySelector('.scroll-container');
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.dot-nav button');
  const reveals = document.querySelectorAll('.reveal');

  /* --- Dot navigation click → smooth scroll --- */
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      const target = document.getElementById(dot.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --- IntersectionObserver: active section → dot highlight --- */
  var activeDot = 0;

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var idx = Array.prototype.indexOf.call(sections, entry.target);
        if (idx !== activeDot) {
          dots[activeDot] && dots[activeDot].classList.remove('active');
          dots[idx] && dots[idx].classList.add('active');
          activeDot = idx;
        }
      }
    });
  }, {
    root: container,
    threshold: 0.55
  });

  sections.forEach(function (sec) { sectionObserver.observe(sec); });

  /* --- IntersectionObserver: reveal animations --- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    root: container,
    threshold: 0.15
  });

  reveals.forEach(function (el) { revealObserver.observe(el); });

  /* --- Initialise: first dot active --- */
  if (dots[0]) dots[0].classList.add('active');
})();
