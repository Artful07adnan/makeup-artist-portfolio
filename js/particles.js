/**
 * Subtle floating dust particles (elegant, minimal)
 */
export function initParticles() {
  const layer = document.getElementById('particlesLayer');
  if (!layer) return;

  const count = 25;
  const particles = [];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'absolute rounded-full bg-soft-gold';
    p.style.width = p.style.height = Math.random() * 2 + 1 + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.opacity = Math.random() * 0.3 + 0.05;
    p.style.animation = `float ${15 + Math.random() * 20}s linear infinite`;
    p.style.animationDelay = -Math.random() * 20 + 's';
    layer.appendChild(p);
    particles.push(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(10px, -20px) scale(1.1); }
      50% { transform: translate(-5px, -40px) scale(0.95); }
      75% { transform: translate(15px, -60px) scale(1.05); }
    }
  `;
  document.head.appendChild(style);
}
