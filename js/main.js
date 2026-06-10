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
import { initServices } from './services.js';

function init() {
  // Check if mobile device
  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Initialize modules across all viewports
  requestAnimationFrame(() => {
    initCursor();
  });
  
  requestAnimationFrame(() => {
    initThreeBg();
    initParticles();
  });
  
  // Preloader and main content
  initPreloader().then(() => {
    document.body.classList.add('loaded');
    initLenis(isMobile); // Keep Lenis smart scroll toggle for touch devices
    
    // Stagger initialization of remaining modules
    requestAnimationFrame(() => {
      initHero(false); // Enable desktop-like video zoom effect on scroll
      initScrollReveal(); // Enable scroll reveal animations
    });
    
    setTimeout(() => {
      initPortfolio();
      initAbout();
      initContact();
      initMagneticButtons();
      initBeforeAfter();
      initTestimonials();
      initServices();
    }, 100);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
