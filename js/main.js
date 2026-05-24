/**
 * AURELIA BRIDE - Main entry
 * Orchestrates preloader, Lenis, and all module initialisation.
 */
import { initPreloader } from './preloader.js';
import { initLenis } from './lenis.js';
import { initHero } from './hero.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initPortfolio } from './portfolio.js';
import { initAbout } from './about.js';
import { initContact } from './contact.js';
import { initCursor } from './cursor.js';
import { initThreeBg } from './three-bg.js';
import { initParticles } from './particles.js';
import { initMagneticButtons } from './magnetic.js';
import { initBeforeAfter } from './before-after.js';
import { initTestimonials } from './testimonials.js';

function init() {
  // Check if mobile device
  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Unload background video streams dynamically on mobile to free memory and GPU resources
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      try {
        video.pause();
        const sources = video.querySelectorAll('source');
        sources.forEach((source) => source.remove());
        video.removeAttribute('src');
        video.load();
      } catch (e) {
        console.warn("Could not unload mobile video resource:", e);
      }
    });
  } else {
    // Initialize performance-heavy desktop modules first
    requestAnimationFrame(() => {
      initCursor();
    });
    
    requestAnimationFrame(() => {
      initThreeBg();
      initParticles();
    });
  }
  
  // Preloader and main content
  initPreloader().then(() => {
    document.body.classList.add('loaded');
    initLenis(isMobile);
    
    // Stagger initialization of remaining modules
    requestAnimationFrame(() => {
      initHero(isMobile);
      if (!isMobile) {
        initScrollReveal();
      }
    });
    
    setTimeout(() => {
      initPortfolio();
      initAbout();
      initContact();
      if (!isMobile) {
        initMagneticButtons();
      }
      initBeforeAfter();
      initTestimonials();
    }, isMobile ? 50 : 100); // Faster on mobile
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
