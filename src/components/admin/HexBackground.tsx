import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader approximating a hex grid with radial mouse mask
const fragmentShader = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.141592653589793

// Simple hexagon grid function
float hex(vec2 p) {
  p = abs(p);
  return max(p.x * 0.866025 + p.y * 0.5, p.y) - 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  // Scale and tile coordinates
  vec2 p = (uv - 0.5) * vec2(u_resolution.x/u_resolution.y, 1.0) * 10.0;
  // Animate grid
  float t = u_time * 0.2;
  p += vec2(t);
  float h = hex(mod(p, vec2(1.0)) - 0.5);
  float line = smoothstep(0.48, 0.5, abs(h));

  // Mouse spotlight mask
  vec2 m = u_mouse / u_resolution;
  float d = distance(uv, m);
  float mask = smoothstep(0.25, 0.0, d);

  vec3 color = mix(vec3(0.0), vec3(0.2, 0.4, 0.9), line);
  color = mix(color, vec3(0.2, 0.6, 1.0), mask);

  gl_FragColor = vec4(color, 1.0);
}
`;

const HexBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(-10, -10) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    let frameId: number;
    const clock = new THREE.Clock();

    const onMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.x = e.clientX;
      uniforms.u_mouse.value.y = height - e.clientY;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    const render = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default HexBackground;
