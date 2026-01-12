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
      const content = document.querySelector('.accordion-content');
      const arrow = document.querySelector('.arrow');
      
      content.classList.remove('active');
      arrow.classList.remove('rotate');
    });
  }
}

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

