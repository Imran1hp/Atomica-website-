/**
 * ATOMIICA — Website Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('nav a[href^="#"], .actions a[href^="#"]');
  const classCards = document.querySelectorAll('.class-card');

  // 1. Header scroll effect (subtle shadow when scrolled)
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Smooth scrolling for internal anchor links with sticky header offset
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jumping
        history.pushState(null, '', targetId);
      }
    });
  });

  // 3. Make class cards interactive — clicking guides user to contact section
  classCards.forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Inquire about ${card.querySelector('h3')?.textContent || 'classes'}`);

    const navigateToContact = () => {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        const headerOffset = header ? header.offsetHeight : 0;
        const offsetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        history.pushState(null, '', '#contact');
      }
    };

    card.addEventListener('click', navigateToContact);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateToContact();
      }
    });
  });

  console.log('ATOMIICA script initialized successfully.');
});
