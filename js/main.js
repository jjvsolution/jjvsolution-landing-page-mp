/**
 * JJV SOLUTIONS - Landing page
 * Menú móvil, scroll suave y año en footer
 */

(function () {
  'use strict';

  var header = document.getElementById('header');
  var menuBtn = header && header.querySelector('.header__menu-btn');
  var nav = header && header.querySelector('.header__nav');
  var navLinks = header && header.querySelectorAll('.header__nav-link');

  // Año en el footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menú móvil: toggle al hacer clic en el botón
  function toggleMenu() {
    if (!nav || !menuBtn) return;
    var isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isOpen);
    menuBtn.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    nav.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeMenu() {
    if (!nav || !menuBtn) return;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  // Cerrar menú al hacer clic en un enlace (navegación interna)
  if (navLinks && navLinks.length) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  // Scroll suave para enlaces internos
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

  // Opcional: animación suave al entrar en viewport (IntersectionObserver)
  var observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .hero').forEach(function (section) {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });
})();
