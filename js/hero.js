/**
 * Hero: calm, smooth fade-in sequence (Monogram → Brand → Line → Tagline → Subheading → Buttons)
 */
export function initHero(isMobile) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const hero = document.getElementById('hero');
  const monogram = hero?.querySelector('.brand-monogram-wrap');
  const brandName = hero?.querySelector('.brand-logo');
  const line = hero?.querySelector('.brand-line');
  const tagline = hero?.querySelector('.brand-tagline');
  const subheading = hero?.querySelector('.hero-subheading');
  const ctas = hero?.querySelector('.hero-ctas');
  const scrollRibbon = hero?.querySelector('.scroll-ribbon');

  const sequence = [monogram, brandName, line, tagline, subheading, ctas, scrollRibbon].filter(Boolean);
  if (!sequence.length) return;

  gsap.set(sequence, { opacity: 0, y: 18 });

  const tl = gsap.timeline({ delay: 0 });
  sequence.forEach((el, i) => {
    tl.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, i === 0 ? 0 : 0.3);
  });

  if (!isMobile) {
    gsap.to(hero.querySelector('.hero-video-wrap'), {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}
