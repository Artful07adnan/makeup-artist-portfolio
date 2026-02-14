/**
 * Portfolio: masonry filter, GSAP layout, hover, lightbox, keyboard & swipe
 */
const gsap = window.gsap;
const filters = document.querySelectorAll('.portfolio-filter');
const masonry = document.getElementById('portfolioMasonry');
const items = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function filterPortfolio(category) {
  if (!masonry || !items.length) return;
  items.forEach((item) => {
    const cat = item.getAttribute('data-category');
    const show = category === 'all' || cat === category;
    gsap.to(item, {
      scale: show ? 1 : 0.8,
      opacity: show ? 1 : 0.3,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    });
  });
  filters.forEach((btn) => {
    const isActive = btn.getAttribute('data-filter') === category;
    btn.classList.toggle('bg-soft-gold', isActive);
    btn.classList.toggle('text-warm-black', isActive);
    if (!isActive) {
      btn.classList.remove('bg-soft-gold', 'text-warm-black');
    }
  });
}

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || 'Bride';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function handleSwipe() {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  let startX = 0;
  lightbox.addEventListener(
    'touchstart',
    (e) => (startX = e.touches[0].clientX),
    { passive: true }
  );
  lightbox.addEventListener(
    'touchend',
    (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 80) closeLightbox();
    },
    { passive: true }
  );
}

export function initPortfolio() {
  filters?.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      filterPortfolio(category);
    });
  });

  items?.forEach((item) => {
    const imgWrap = item.querySelector('.portfolio-item__img-wrap img');
    if (!imgWrap) return;
    item.addEventListener('click', () => {
      const src = imgWrap.src.replace(/w=\d+/, 'w=1600').replace(/q=\d+/, 'q=90');
      const name = item.querySelector('.portfolio-item__name')?.textContent || 'Bride';
      openLightbox(src, name);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  handleSwipe();
}
