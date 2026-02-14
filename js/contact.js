/**
 * Contact form: focus glow, submit confirmation with subtle particle burst
 */
export function initContact() {
  const gsap = window.gsap;
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!successEl) return;
    successEl.classList.remove('hidden');
    successEl.style.opacity = '0';
    gsap.to(successEl, { opacity: 1, duration: 0.5 });
    form.reset();

    // Subtle particle burst near submit button
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const burst = document.createElement('div');
      burst.className = 'fixed pointer-events-none z-50';
      burst.style.left = rect.left + rect.width / 2 + 'px';
      burst.style.top = rect.top + rect.height / 2 + 'px';
      burst.style.width = '20px';
      burst.style.height = '20px';
      burst.style.marginLeft = '-10px';
      burst.style.marginTop = '-10px';
      burst.style.borderRadius = '50%';
      burst.style.background = 'radial-gradient(circle, rgba(201,169,98,0.8) 0%, transparent 70%)';
      burst.style.boxShadow = '0 0 40px 20px rgba(201,169,98,0.3)';
      document.body.appendChild(burst);
      gsap.to(burst, {
        scale: 4,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => burst.remove(),
      });
    }
  });
}
