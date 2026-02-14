/**
 * Custom circular cursor: expand on hover, color over images
 */
export function initCursor() {
  const gsap = window.gsap;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  const setPosition = (el, x, y) => {
    if (gsap) gsap.set(el, { x, y, xPercent: -50, yPercent: -50 });
    else { el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.transform = 'translate(-50%, -50%)'; }
  };

  const isTouch = 'ontouchstart' in window;
  if (isTouch) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setPosition(dot, mouseX, mouseY);
  });

  const hoverTargets = document.querySelectorAll('a, button, .portfolio-item, .btn-magnetic');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover', 'image-hover');
      ring.classList.remove('hover');
    });
  });

  document.querySelectorAll('.portfolio-item').forEach((el) => {
    el.addEventListener('mouseenter', () => dot.classList.add('image-hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('image-hover'));
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    setPosition(ring, ringX, ringY);
    requestAnimationFrame(animateRing);
  }
  animateRing();
}
