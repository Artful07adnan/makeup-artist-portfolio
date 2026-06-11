/**
 * Services: modal interaction, scroll locking, and form auto-fill integration
 */

const servicesData = {
  bridal: {
    title: 'Bridal Makeup',
    price: 'From ₹12,000',
    duration: '3 Hours',
    selectValue: 'Full Bridal Services',
    description: 'Couture bridal glam customized for your big day. Designed to look breathtaking in person and flawless on camera, ensuring you feel radiant and confident.',
    sectionTitle: 'BRIDAL MAKEUP PACKAGES',
    inclusions: [
      'Ultra HD Makeup  (₹12,000)',
      'Ultra HD Makeup + Luxury Brands  (₹14,000)',
      'Airbrush Makeup  (₹16,000)',
      'Signature Couture Airbrush Makeup  (₹20,000)'
    ]
  },
  engagement: {
    title: 'Engagement Makeup',
    price: 'From ₹6,000',
    duration: '2 Hours',
    selectValue: 'Engagement Makeup Services',
    sectionTitle: 'ENGAGEMENT MAKEUP PACKAGES',

    description: 'Elegant and camera-ready engagement makeup designed to enhance your natural beauty while ensuring a flawless, long-lasting finish for your special celebration.',

    inclusions: [
      'HD Makeup (₹6,000)',
      'Ultra HD Makeup (₹7,000)',
      'Airbrush Makeup (₹8,000)'
    ]
  },
  reception: {
    title: 'Reception Makeup',
    price: 'From ₹12,000',
    duration: '3 Hours',
    selectValue: 'Reception Makeup Services',
    sectionTitle: 'RECEPTION MAKEUP PACKAGES',

    description: 'Sophisticated reception makeup crafted for a glamorous evening look, ensuring flawless photographs and long-lasting elegance throughout your celebration.',

    inclusions: [
      'Ultra HD Makeup (₹12,000)',
      'Ultra HD Makeup + Luxury Brands (₹14,000)',
      'Airbrush Makeup (₹16,000)',
      'Signature Couture Airbrush Makeup (₹20,000)'
    ]
  },
  'hd-airbrush': {
    title: 'Carnival Glam',
    price: 'From ₹6,000',
    duration: '2 Hours',
    sectionTitle: 'CARNIVAL GLAM PACKAGES',

    description: 'Creative and vibrant glam designed for festive celebrations, cultural events, and memorable occasions. Crafted to enhance your natural beauty while ensuring a flawless, long-lasting finish.', sectionTitle: 'CARNIVAL MAKEUP PACKAGES',

    inclusions: [
      'HD Makeup (₹6,000)',
      'Ultra HD Makeup (₹7,000)',
      'Airbrush Makeup (₹8,000)'
    ]
  },
  'party-editorial': {
    title: 'Cocktail Glam',
    price: 'From ₹6,000',
    duration: '2 Hours',
    sectionTitle: 'COCKTAIL GLAM PACKAGES',

    description: 'Elegant cocktail glam tailored for parties, receptions, and social gatherings. Designed to deliver a polished, long-lasting look that photographs beautifully from every angle.',
    inclusions: [
      'HD Makeup (₹6,000)',
      'Ultra HD Makeup (₹7,000)',
      'Airbrush Makeup (₹8,000)'
    ]
  }
};

export function initServices() {
  const modal = document.getElementById('serviceModal');
  const modalContent = document.getElementById('serviceModalContent');
  const modalClose = document.getElementById('serviceModalClose');
  const modalBackdrop = document.getElementById('serviceModalBackdrop');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!modal || !modalContent || !serviceCards.length) return;

  let lastActiveElement = null;

  function openModal(serviceId) {
    const data = servicesData[serviceId];
    if (!data) return;

    lastActiveElement = document.activeElement;

    // Generate dynamic inclusions HTML
    const inclusionsHTML = data.inclusions
      .map(item => `<li class="service-modal__inclusion-item">${item}</li>`)
      .join('');

    // Inject content
    modalContent.innerHTML = `
      <div class="service-modal__header">
        <h3 class="service-modal__title">${data.title}</h3>
        <div class="service-modal__meta">
          <span class="service-modal__price">${data.price}</span>
          <span class="service-modal__duration">✦ ${data.duration}</span>
        </div>
      </div>
      <p class="service-modal__body">${data.description}</p>
      <h4 class="service-modal__subtitle">${data.sectionTitle}</h4>
      <ul class="service-modal__inclusions">
        ${inclusionsHTML}
      </ul>
      <div class="service-modal__action">
        <a href="#booking" class="btn-magnetic-wrap inline-block" id="modalBookBtn">
          <span class="btn-magnetic btn-primary">Book This Service</span>
        </a>
      </div>
    `;

    // Open modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Stop Lenis if it exists
    if (window.lenis) {
      window.lenis.stop();
    }

    // Set focus to the close button
    if (modalClose) {
      modalClose.focus();
    }

    // Add event listener to the booking button in the modal
    const bookBtn = modalContent.querySelector('#modalBookBtn');
    if (bookBtn) {
      bookBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Update select value in booking form
        const serviceSelect = document.getElementById('serviceType');
        if (serviceSelect) {
          serviceSelect.value = data.selectValue;
        }

        // Close modal first
        closeModal();

        // Scroll to booking section
        if (window.lenis) {
          window.lenis.scrollTo('#booking', { offset: 0, duration: 1.2 });
        } else {
          const bookingEl = document.getElementById('booking');
          if (bookingEl) {
            bookingEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Start Lenis if it exists
    if (window.lenis) {
      window.lenis.start();
    }

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Bind click event to each card
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent default navigation if clicking on CTA
      if (e.target.classList.contains('service-card__cta') || e.target.closest('.service-card__cta')) {
        e.preventDefault();
      }

      const serviceId = card.getAttribute('data-service');
      if (serviceId) {
        openModal(serviceId);
      }
    });
  });

  // Bind close events
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Handle ESC key and focus trapping
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      // Trap focus inside modal
      const focusableElements = modal.querySelectorAll('button, a[href]');
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  });
}
