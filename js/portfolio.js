/**
 * Portfolio: masonry filter, GSAP layout, hover, lightbox, keyboard & swipe
 */
const gsap = window.gsap;
const filters = document.querySelectorAll('.portfolio-filter');
const masonry = document.getElementById('portfolioMasonry');
const items = Array.from(document.querySelectorAll('.portfolio-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

let activeItemIndex = -1;

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

function updateLightboxContent() {
  if (activeItemIndex < 0 || activeItemIndex >= items.length || !lightboxImg) return;
  const activeItem = items[activeItemIndex];
  const imgWrap = activeItem.querySelector('.portfolio-item__img-wrap img');
  if (!imgWrap) return;
  const src = imgWrap.src.replace(/w=\d+/, 'w=1600').replace(/q=\d+/, 'q=90');
  const name = activeItem.querySelector('.portfolio-item__name')?.textContent || 'Bride';
  
  // Luxury transition for swapping images
  gsap.fromTo(lightboxImg, { opacity: 0.3, scale: 0.98 }, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: 'power2.out',
    onStart: () => {
      lightboxImg.src = src;
      lightboxImg.alt = name;
    }
  });
}

function openLightbox(index) {
  if (!lightbox || !lightboxImg || index < 0 || index >= items.length) return;
  activeItemIndex = index;
  updateLightboxContent();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  activeItemIndex = -1;
}

function showNextImage() {
  if (activeItemIndex === -1) return;
  activeItemIndex = (activeItemIndex + 1) % items.length;
  updateLightboxContent();
}

function showPrevImage() {
  if (activeItemIndex === -1) return;
  activeItemIndex = (activeItemIndex - 1 + items.length) % items.length;
  updateLightboxContent();
}

function handleSwipe() {
  if (!lightbox) return;
  let startX = 0;
  lightbox.addEventListener(
    'touchstart',
    (e) => {
      if (!lightbox.classList.contains('active')) return;
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );
  lightbox.addEventListener(
    'touchend',
    (e) => {
      if (!lightbox.classList.contains('active')) return;
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 80) {
        showPrevImage();
      } else if (diff < -80) {
        showNextImage();
      }
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

  items?.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__inner')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'Tab') {
      // Focus trapping: close button is the only focusable element in lightbox
      e.preventDefault();
      lightboxClose?.focus();
    }
  });

  handleSwipe();
}
