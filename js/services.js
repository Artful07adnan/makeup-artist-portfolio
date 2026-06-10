/**
 * Services: modal interaction, scroll locking, and form auto-fill integration
 */

const servicesData = {
  bridal: {
    title: 'Bridal Makeup',
    price: 'From ₹14,000',
    duration: '3 Hours',
    selectValue: 'Full Bridal',
    description: 'Couture bridal glam customized for your big day. Designed to look breathtaking in person and flawless on camera, ensuring you feel radiant and confident.',
    inclusions: [
      'Skin Hydration & Hydrating Prep',
      'Premium HD / Airbrush Base',
      'Luxury Lash Customization',
      'Hairstyling & Draping Assistance',
      'Setting sprays for 12hr+ longevity',
      'Premium Touch-up Kit'
    ]
  },
  engagement: {
    title: 'Engagement Makeup',
    price: 'From ₹12,000',
    duration: '2.5 Hours',
    selectValue: 'Trial Only',
    description: 'A romantic, glowing look tailored for your engagement ceremony or photoshoot. Enhances your natural features with a soft, camera-ready radiant finish.',
    inclusions: [
      'Luminosity Skin Prep',
      'Flawless HD Makeup Base',
      'Premium Custom Lashes',
      'Romantic Hairstyling',
      'Dressing & Draping Assistance',
      'Mini Touch-up Kit'
    ]
  },
  reception: {
    title: 'Reception Glam',
    price: 'From ₹12,000',
    duration: '2.5 Hours',
    selectValue: 'Full Bridal',
    description: 'An elegant, high-impact look for your reception celebration. Characterized by sophisticated details, dramatic accents, and longevity for evening lighting.',
    inclusions: [
      'Deep Skin Prep & Prime',
      'Sophisticated HD Matte/Glow Finish',
      'Drama Eye Makeup / Bold Lip Option',
      'Modern Elegant Hairstyling',
      'Saree / Dupatta Draping Assistance',
      'Touch-up Kit'
    ]
  },
  'hd-airbrush': {
    title: 'HD / Airbrush',
    price: 'From ₹16,000',
    duration: '3 Hours',
    selectValue: 'Full Bridal',
    description: 'High-definition airbrush application for a seamless, weightless, transfer-resistant base. Ideal for professional photography, films, and warm weather.',
    inclusions: [
      'Silicon-based or Water-based Airbrush Base',
      'Pore-refining Skin Prep',
      'Luxury Mink Lashes',
      'Hairstyling & Set Styling',
      'Outfit Draping Assistance',
      'Complete Premium Touch-up Kit'
    ]
  },
  'party-editorial': {
    title: 'Party & Editorial',
    price: 'From ₹10,000',
    duration: '2 Hours',
    selectValue: 'Bridal Party',
    description: 'Bold, creative, and fashion-forward looks designed for editorials, high-profile cocktail parties, or runway shoots. Tailored entirely to your theme.',
    inclusions: [
      'Themed or Avant-Garde Makeup Base',
      'Creative Eye Art / Specialty Liners',
      'High-impact Glow & Sculpting',
      'Basic Hair Set or Slick Look styling',
      'Premium Setting & Lock sprays',
      'Lash Application'
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
      <h4 class="service-modal__subtitle">What's Included</h4>
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
