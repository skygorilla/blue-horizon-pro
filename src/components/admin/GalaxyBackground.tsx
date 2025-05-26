import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GalaxyBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    const mountNode = mountRef.current;
    if (!mountNode) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5; // Start camera closer

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountNode.appendChild(renderer.domElement);

    // Particle setup
    const particleCount = 30000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const color = new THREE.Color();
    const maxRange = 400, farZ = -500; // Depth range

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Initial positions
      positions[i3] = (Math.random() - 0.5) * maxRange * 1.5;
      positions[i3 + 1] = (Math.random() - 0.5) * maxRange * 1.5;
      positions[i3 + 2] = Math.random() * farZ * 2;
      // Speed
      velocities[i] = Math.random() * 2 + 1;
      // Color (white/light blue)
      const lightness = 0.8 + Math.random() * 0.2;
      const hue = 0.55 + Math.random() * 0.1;
      color.setHSL(hue, 0.9, lightness);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material setup
    const material = new THREE.PointsMaterial({
      size: 0.1, // Small dot size
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const positionsAttribute = geometry.attributes.position;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Move towards camera
        positionsAttribute.array[i3 + 2] += velocities[i] * delta * 15;
        // Reset if past camera
        if (positionsAttribute.array[i3 + 2] > camera.position.z) {
          positionsAttribute.array[i3 + 2] = farZ + Math.random() * 50; // Reset Z
          positionsAttribute.array[i3] = (Math.random() - 0.5) * maxRange * 1.5; // Reset X
          positionsAttribute.array[i3 + 1] = (Math.random() - 0.5) * maxRange * 1.5; // Reset Y
        }
      }
      positionsAttribute.needsUpdate = true; // Update buffer

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Cleanup function
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      // Check if mountNode and renderer.domElement exist before removing
      if (mountNode && renderer.domElement && mountNode.contains(renderer.domElement)) {
          try {
              mountNode.removeChild(renderer.domElement);
          } catch (error) {
              console.error("Failed to remove canvas:", error);
          }
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Style for the container div (no background)
  const canvasStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
  };

  // Render only the container for the Three.js canvas
  return (
      <div ref={mountRef} style={canvasStyle} />
  );
};

export default GalaxyBackground;
