/* Rustin Soraki — homepage interactions (no dependencies) */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
    });

    // Close the menu after tapping a link (mobile)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('i').className = 'fas fa-bars';
      });
    });
  }

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---- Copy email to clipboard ---- */
  var copyBtn = document.querySelector('.footer-copy');
  if (copyBtn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      var copyReset;
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(copyBtn.getAttribute('data-copy')).then(function () {
          var icon = copyBtn.querySelector('i');
          copyBtn.setAttribute('data-copied', 'true');
          if (icon) { icon.className = 'fas fa-check'; }
          window.clearTimeout(copyReset);
          copyReset = window.setTimeout(function () {
            copyBtn.removeAttribute('data-copied');
            if (icon) { icon.className = 'fas fa-copy'; }
          }, 1700);
        }).catch(function () { /* clipboard blocked — the mailto link still works */ });
      });
    } else {
      // No clipboard API: drop the dead control, leave the email link intact.
      copyBtn.parentNode.removeChild(copyBtn);
    }
  }

  /* ---- Below-the-fold scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal-up');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });

    // Safety: reveal anything already within the viewport on load, in case the
    // observer is slow to fire for initially-visible elements.
    window.addEventListener('load', function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < vh) { el.classList.add('in'); }
      });
    });
  }

  /* ---- Scroll-spy: highlight the active nav link ---- */
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navItems
    .map(function (a) {
      var id = a.getAttribute('href');
      return id && id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navItems.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
