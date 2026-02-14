/**
 * Lenis smooth scrolling + GSAP ScrollTrigger integration
 */
export function initLenis() {
  if (typeof Lenis === 'undefined') return;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  document.documentElement.classList.add('lenis', 'lenis-smooth');
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  window.lenis = lenis;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    a.addEventListener('click', (e) => {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      }
    });
  });
}
