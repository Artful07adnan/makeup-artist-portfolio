/**
 * Booking form: validations, premium GSAP feedback, and dynamic WhatsApp integration
 */
export function initContact() {
  const gsap = window.gsap;
  const form = document.getElementById('bookingForm');
  const whatsappBtn = document.getElementById('whatsappBookingBtn');
  const errorEl = document.getElementById('formError');

  if (!form || !whatsappBtn) return;

  whatsappBtn.addEventListener('click', () => {
    // 1. Extract values
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('weddingDate');
    const locationInput = document.getElementById('location');
    const serviceSelect = document.getElementById('serviceType');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const date = dateInput ? dateInput.value : '';
    const location = locationInput ? locationInput.value.trim() : '';
    const serviceType = serviceSelect ? serviceSelect.value : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // 2. Perform validations
    if (!name) {
      if (errorEl) {
        errorEl.textContent = "Please provide your name to secure your consultation.";
        errorEl.classList.remove('hidden');
        gsap.fromTo(errorEl, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
      }
      nameInput?.focus();
      return;
    }

    // Hide error alert if visible
    if (errorEl) {
      errorEl.classList.add('hidden');
    }

    // 3. Format dynamic WhatsApp message
    const formattedDate = date ? new Date(date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'TBD';
    const textMessage = 
      `Hi Ramsha,\n\nI'd like to book a luxury bridal consultation!\n\n` +
      `*Name:* ${name}\n` +
      `*Wedding Date:* ${formattedDate}\n` +
      `*Location:* ${location || 'To be discussed'}\n` +
      `*Service:* ${serviceType || 'Not specified'}\n` +
      `*Notes:* ${message || 'None'}`;

    const encodedText = encodeURIComponent(textMessage);
    const phoneNumber = "917974459408"; // Ramsha's official contact number

    // 4. Premium GSAP feedback (particle burst at the button click center)
    const rect = whatsappBtn.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.className = 'fixed pointer-events-none z-50';
    burst.style.left = rect.left + rect.width / 2 + 'px';
    burst.style.top = rect.top + rect.height / 2 + 'px';
    burst.style.width = '24px';
    burst.style.height = '24px';
    burst.style.marginLeft = '-12px';
    burst.style.marginTop = '-12px';
    burst.style.borderRadius = '50%';
    burst.style.background = 'radial-gradient(circle, rgba(201,169,98,0.8) 0%, transparent 70%)';
    burst.style.boxShadow = '0 0 50px 25px rgba(201,169,98,0.4)';
    document.body.appendChild(burst);

    if (gsap) {
      gsap.to(burst, {
        scale: 4,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          burst.remove();
          // Reset the form
          form.reset();
          // Open WhatsApp link in a new tab
          window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank', 'noopener');
        },
      });
    } else {
      burst.remove();
      form.reset();
      window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank', 'noopener');
    }
  });
}
