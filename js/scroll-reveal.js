/**
 * Scroll-triggered fade-in, blur-to-clear, parallax
 */
export function initScrollReveal() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const reveals = document.querySelectorAll('.scroll-reveal');
  const parallax = document.querySelectorAll('.parallax-img');

  reveals.forEach((el) => {
    const isSlow = el.classList.contains('reveal-slow');
    gsap.fromTo(
      el,
      { opacity: 0, y: isSlow ? 36 : 50, filter: isSlow ? 'blur(4px)' : 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: isSlow ? 1.4 : 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  parallax.forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    gsap.to(img, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}
