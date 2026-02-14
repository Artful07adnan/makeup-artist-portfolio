/**
 * Bridal Journey: timeline step animations
 */
export function initTimeline() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const steps = document.querySelectorAll('.timeline-step');
  steps.forEach((step, i) => {
    const card = step.querySelector('.timeline-card');
    const icon = step.querySelector('.timeline-icon');
    if (!card) return;
    gsap.fromTo(
      card,
      { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    if (icon) {
      gsap.fromTo(
        icon,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: step,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  });
}
