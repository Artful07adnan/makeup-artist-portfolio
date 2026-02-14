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
  // Initialize performance-heavy modules first
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
    initLenis();
    
    // Stagger initialization of remaining modules
    requestAnimationFrame(() => {
      initHero();
      initScrollReveal();
    });
    
    setTimeout(() => {
      initPortfolio();
      initAbout();
      initContact();
      initMagneticButtons();
      initBeforeAfter();
      initTestimonials();
    }, 100);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
