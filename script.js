/* ============================================================
   lightbox.js — zero dependencies*/
(function () {
  'use strict';

  var lb, lbImg, lbCap, group = [], index = 0, lastFocus = null;

  function buildOverlay() {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML =
      '<button class="lb-btn lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-btn lb-prev"  type="button" aria-label="Previous image">&#10094;</button>' +
      '<button class="lb-btn lb-next"  type="button" aria-label="Next image">&#10095;</button>' +
      '<img id="lb-img" alt="">' +
      '<div class="lb-cap" id="lb-cap"></div>';
    document.body.appendChild(lb);

    lbImg = lb.querySelector('#lb-img');
    lbCap = lb.querySelector('#lb-cap');

    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) {
      e.stopPropagation();
      show(index - 1);
    });
    lb.querySelector('.lb-next').addEventListener('click', function (e) {
      e.stopPropagation();
      show(index + 1);
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target === lbImg) close();
    });
  }

  function show(n) {
    if (!group.length) return;
    index = (n + group.length) % group.length;
    var img = group[index];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = img.alt || '';
  }

  function open(img) {
    var grid = img.closest('.shot-grid');
    var scope = grid || document;
    group = Array.prototype.slice.call(scope.querySelectorAll('.shot img'));
    if (!group.length) group = [img];

    lastFocus = document.activeElement;
    lb.classList.toggle('is-single', group.length < 2);
    show(group.indexOf(img));
    lb.classList.add('is-open');
    document.body.classList.add('lb-lock');
    lb.querySelector('.lb-close').focus();
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.classList.remove('lb-lock');
    lbImg.removeAttribute('src');
    lbCap.textContent = '';
    group = [];
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  function isOpen() {
    return lb && lb.classList.contains('is-open');
  }

  function trapTab(e) {
    var focusable = Array.prototype.filter.call(
      lb.querySelectorAll('.lb-btn'),
      function (el) { return el.offsetParent !== null; }
    );
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function init() {
    if (document.querySelector('.lb')) return; // already initialised
    buildOverlay();

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest ? e.target.closest('.shot') : null;
      if (!trigger) return;
      var img = trigger.querySelector('img');
      if (!img) return;
      e.preventDefault();
      open(img);
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowLeft')  { show(index - 1); return; }
      if (e.key === 'ArrowRight') { show(index + 1); return; }
      if (e.key === 'Tab') trapTab(e);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Accordion functionality //
const accordionHeader = document.querySelector('.accordion-header');
if (accordionHeader) {
  accordionHeader.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const arrow = this.querySelector('.arrow');
    
    content.classList.toggle('active');
    arrow.classList.toggle('rotate');
  });

    // Add collapse button functionality
  const collapseBtn = document.querySelector('.collapse-btn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', function() {
      const content = document.querySelector('.accordion-wrapper .accordion-content');
      const arrow = document.querySelector('.arrow');
      
      content.classList.remove('active');
      arrow.classList.remove('rotate');
    
      // Scroll back to reports section
    document.getElementById('reports').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
  }
}

  // Certifications accordion
const certAccordionHeader = document.querySelector('#Certifications .accordion-header');
if (certAccordionHeader) {
  certAccordionHeader.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const arrow = this.querySelector('.arrow');
    
    content.classList.toggle('active');
    arrow.classList.toggle('rotate');
  });
  
  // Add collapse button functionality
  const collapseBtnCerts = document.querySelector('.collapse-btn-certs');
  if (collapseBtnCerts) {
    collapseBtnCerts.addEventListener('click', function() {
      const content = document.querySelector('#Certifications .accordion-content');
      const arrow = document.querySelector('#Certifications .arrow');
      
      content.classList.remove('active');
      arrow.classList.remove('rotate');
      
      // Scroll back to certifications section
      document.getElementById('Certifications').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

// Project accordions
const projectButtons = document.querySelectorAll('.read-more-btn');
projectButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const content = this.previousElementSibling;
    const arrow = this.querySelector('.arrow');
    
    if (content.classList.contains('active')) {
      content.classList.remove('active');
      arrow.textContent = '▼';
      this.setAttribute('aria-expanded', 'false');
      
      const article = this.closest('.project-item');
      if (article) {
        article.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      content.classList.add('active');
      arrow.textContent = '▲';
      this.setAttribute('aria-expanded', 'true');
    }
  });
});

// Hamburger Navigation js // 
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });

    // Hide menu when any nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
      });
    });

    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // Adjust for navbar height + some padding
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });

      // Back to Top Button show/hide logic with fade effect
      const backToTopBtn = document.getElementById('backToTop');
      if (window.pageYOffset > 800) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Back to Top Button click scroll
    document.getElementById('backToTop').addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
