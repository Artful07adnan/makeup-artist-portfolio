/**
 * Testimonial carousel: next/prev, soft transition
 */
export function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.querySelector('.testimonial-btn--prev');
  const nextBtn = document.querySelector('.testimonial-btn--next');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const total = slides.length;
  if (total === 0) return;

  let index = 0;

  function update() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  prevBtn?.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    update();
  });
  nextBtn?.addEventListener('click', () => {
    index = (index + 1) % total;
    update();
  });

  let autoplay = setInterval(() => {
    index = (index + 1) % total;
    update();
  }, 10000);

  track.closest('.testimonial-carousel')?.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.closest('.testimonial-carousel')?.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      index = (index + 1) % total;
      update();
    }, 10000);
  });

  update();
}
