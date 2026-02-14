/**
 * Preloader: RAMSHA as one word, single smooth reveal
 */
export function initPreloader() {
  const gsap = window.gsap;
  if (!gsap) return Promise.resolve();
  const preloader = document.getElementById('preloader');
  const letters = document.querySelectorAll('.letter');
  if (!preloader || !letters.length) return Promise.resolve();

  // Letters are already visible, no initial animation needed
  gsap.set(preloader, { autoAlpha: 1 });

  const tl = gsap.timeline();

  // Fade out letters one by one - medium timing
  letters.forEach((letter, i) => {
    tl.to(letter, {
      opacity: 0,
      y: -12,
      duration: 0.4,
      ease: 'power2.in',
    }, i * 0.2);
  });

  // Fade out preloader after letters disappear
  tl.to(preloader, {
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => preloader.classList.add('hidden'),
  }, '+=0.2');

  return new Promise((resolve) => {
    setTimeout(resolve, 1600);
  });
}
