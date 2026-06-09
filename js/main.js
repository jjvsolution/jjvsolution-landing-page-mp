/**
 * JJV SOLUTIONS - Landing page
 * Menú móvil, scroll suave y año en footer
 */

(function () {
  'use strict';

  var header = document.getElementById('header');
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileNavLinks = mobileNav && mobileNav.querySelectorAll('a');

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function toggleMenu() {
    if (!mobileNav || !menuBtn) return;
    var isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isOpen);
    menuBtn.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    mobileNav.classList.toggle('hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeMenu() {
    if (!mobileNav || !menuBtn) return;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
    mobileNav.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  if (mobileNavLinks && mobileNavLinks.length) {
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;

    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
