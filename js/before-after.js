/**
 * Before & After slider: drag to reveal
 */
export function initBeforeAfter() {
  const sliders = document.querySelectorAll('[data-ba-slider]');
  sliders.forEach((slider) => {
    const before = slider.querySelector('.ba-slider__before');
    const after = slider.querySelector('.ba-slider__after');
    const handle = slider.querySelector('.ba-slider__handle');
    if (!before || !after || !handle) return;

    let isDragging = false;
    let currentX = 50;

    function setPosition(percent) {
      const p = Math.max(0, Math.min(100, percent));
      currentX = p;
      after.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
      handle.style.left = `${p}%`;
    }

    function getPercent(clientX) {
      const rect = slider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    handle.addEventListener('mousedown', () => { isDragging = true; });
    document.addEventListener('mouseup', () => { isDragging = false; });
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(getPercent(e.clientX));
    });

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      setPosition(getPercent(e.touches[0].clientX));
    }, { passive: true });
    slider.addEventListener('touchmove', (e) => {
      if (isDragging) setPosition(getPercent(e.touches[0].clientX));
    }, { passive: true });
    document.addEventListener('touchend', () => { isDragging = false; });

    setPosition(50);
  });
}
