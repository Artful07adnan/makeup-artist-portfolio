/**
 * Three.js: subtle gradient mesh background
 */
export function initThreeBg() {
  const canvas = document.getElementById('threeCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0xc9a962) },
      uColor2: { value: new THREE.Color(0x1a1816) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      void main() {
        float n = sin(vUv.x * 3.0 + uTime * 0.1) * 0.5 + 0.5;
        n *= sin(vUv.y * 2.0 + uTime * 0.08) * 0.5 + 0.5;
        vec3 col = mix(uColor2, uColor1, n * 0.15);
        gl_FragColor = vec4(col, 0.25);
      }
    `,
  });

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);

  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value += 0.016;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
