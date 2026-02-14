/**
 * Magnetic hover effect for buttons
 */
export function initMagneticButtons() {
  const wraps = document.querySelectorAll('.btn-magnetic-wrap');
  wraps.forEach((wrap) => {
    const btn = wrap.querySelector('.btn-magnetic');
    if (!btn) return;
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });
    wrap.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}
