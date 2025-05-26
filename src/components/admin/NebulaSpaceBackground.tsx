import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NebulaSpaceBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    const mountNode = mountRef.current;
    if (!mountNode) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001); // Add fog for depth
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);

    // Create main nebula cloud layers
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);
    
    // Create multiple cloud planes with different colors and depths
    const createNebulaLayer = (color: number, depth: number, scale: number, opacity: number) => {
      const planeGeometry = new THREE.PlaneGeometry(scale, scale);
      
      // Create cloud texture procedurally
      const texture = new THREE.CanvasTexture(generateCloudTexture(color));
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      
      const mesh = new THREE.Mesh(planeGeometry, material);
      mesh.position.z = depth;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      return mesh;
    };
    
    // Generate procedural cloud texture
    function generateCloudTexture(baseColor: number): HTMLCanvasElement {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Convert base color to RGB
      const r = (baseColor >> 16) & 255;
      const g = (baseColor >> 8) & 255;
      const b = baseColor & 255;
      
      // Generate perlin-like noise
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const value = simplex2(x / 25, y / 25) * 0.5 + 0.5;
          const alpha = Math.pow(value, 3) * 0.6;
          
          // Apply color with alpha
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      
      return canvas;
    }
    
    // Basic simplex noise implementation
    function simplex2(x: number, y: number): number {
      // This is a simplified version, not truly perlin noise
      return Math.sin(x * 10) * Math.sin(y * 10) * Math.sin((x + y) * 5);
    }
    
    // Add multiple nebula layers
    const nebulaLayers = [
      // Purples
      createNebulaLayer(0x4a0072, -800, 2000, 0.6),
      createNebulaLayer(0x7b00ff, -600, 1800, 0.5),
      // Pinks
      createNebulaLayer(0xff0099, -400, 1600, 0.4),
      // Cyans
      createNebulaLayer(0x00ffff, -300, 1400, 0.5),
      // Deeper blues
      createNebulaLayer(0x0022ff, -200, 1200, 0.3)
    ];
    
    nebulaLayers.forEach(layer => cloudGroup.add(layer));
    
    // Create distant stars (background)
    const distantStarsGeometry = new THREE.BufferGeometry();
    const distantStarsCount = 10000;
    const distantStarsPositions = new Float32Array(distantStarsCount * 3);
    const distantStarsSizes = new Float32Array(distantStarsCount);
    
    for (let i = 0; i < distantStarsCount; i++) {
      const i3 = i * 3;
      // Distribute in sphere
      const radius = 1000 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      distantStarsPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      distantStarsPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      distantStarsPositions[i3 + 2] = radius * Math.cos(phi);
      
      distantStarsSizes[i] = 0.5 + Math.random() * 1.5;
    }
    
    distantStarsGeometry.setAttribute('position', new THREE.BufferAttribute(distantStarsPositions, 3));
    distantStarsGeometry.setAttribute('size', new THREE.BufferAttribute(distantStarsSizes, 1));
    
    // Create shader material for stars with glow
    const distantStarsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: generateStarTexture() }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = vec3(1.0, 1.0, 1.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(color * vColor, 1.0);
          gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });
    
    // Generate star texture with glow
    function generateStarTexture(): THREE.Texture {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create radial gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }
    
    const distantStars = new THREE.Points(distantStarsGeometry, distantStarsMaterial);
    scene.add(distantStars);
    
    // Create foreground particles (closer stars for parallax effect)
    const foregroundParticleCount = 5000;
    const foregroundGeometry = new THREE.BufferGeometry();
    const foregroundPositions = new Float32Array(foregroundParticleCount * 3);
    const foregroundColors = new Float32Array(foregroundParticleCount * 3);
    const foregroundSizes = new Float32Array(foregroundParticleCount);
    const foregroundVelocities = new Float32Array(foregroundParticleCount);
    
    const pathLength = 1000; // Length of the tunnel
    
    for (let i = 0; i < foregroundParticleCount; i++) {
      const i3 = i * 3;
      
      // Create tunnel-like distribution
      const randomRadius = 10 + Math.random() * 30;
      const randomAngle = Math.random() * Math.PI * 2;
      foregroundPositions[i3] = Math.cos(randomAngle) * randomRadius;
      foregroundPositions[i3 + 1] = Math.sin(randomAngle) * randomRadius;
      
      // Distribute along tunnel length
      foregroundPositions[i3 + 2] = Math.random() * -pathLength;
      
      // Random velocity for parallax effect
      foregroundVelocities[i] = 5 + Math.random() * 20;
      
      // Size based on distance (smaller = further)
      foregroundSizes[i] = 0.3 + Math.random() * 1.5;
      
      // Random colors: white, light blue, pink, cyan
      const colorChoice = Math.floor(Math.random() * 4);
      const color = new THREE.Color();
      
      switch (colorChoice) {
        case 0: // White
          color.setRGB(1, 1, 1);
          break;
        case 1: // Light blue
          color.setRGB(0.6, 0.8, 1);
          break;
        case 2: // Pink
          color.setRGB(1, 0.6, 0.9);
          break;
        case 3: // Cyan
          color.setRGB(0.6, 1, 1);
          break;
      }
      
      foregroundColors[i3] = color.r;
      foregroundColors[i3 + 1] = color.g;
      foregroundColors[i3 + 2] = color.b;
    }
    
    foregroundGeometry.setAttribute('position', new THREE.BufferAttribute(foregroundPositions, 3));
    foregroundGeometry.setAttribute('color', new THREE.BufferAttribute(foregroundColors, 3));
    foregroundGeometry.setAttribute('size', new THREE.BufferAttribute(foregroundSizes, 1));
    
    // Create shader material for foreground stars
    const foregroundMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: generateStarTexture() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0);
          gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });
    
    const foregroundStars = new THREE.Points(foregroundGeometry, foregroundMaterial);
    scene.add(foregroundStars);
    
    // Add some light flares at fixed positions for visual interest
    const flareCount = 20;
    const flares: THREE.Sprite[] = [];
    
    // Create flare texture
    const flareTexture = generateFlareTexture();
    
    for (let i = 0; i < flareCount; i++) {
      const flareMaterial = new THREE.SpriteMaterial({
        map: flareTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.6
      });
      
      const flare = new THREE.Sprite(flareMaterial);
      
      // Position flares within the tunnel space
      const angle = Math.random() * Math.PI * 2;
      const radius = 50 + Math.random() * 150;
      flare.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -200 - Math.random() * 800
      );
      
      // Random size
      const size = 10 + Math.random() * 40;
      flare.scale.set(size, size, 1);
      
      scene.add(flare);
      flares.push(flare);
    }
    
    // Generate lens flare texture
    function generateFlareTexture(): THREE.Texture {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create radial gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 230, 255, 0.5)');
      gradient.addColorStop(0.7, 'rgba(160, 160, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(30, 30, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }
    
    // Create a camera path for smooth looping movement
    const pathRadius = 5;
    const cameraAngleSpeed = 0.1; // Speed of lateral motion
    const cameraForwardSpeed = 15; // Speed of forward motion
    let cameraAngle = 0;
    let cameraPathPosition = 0;
    
    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      
      // Move camera in a helical path
      cameraAngle += delta * cameraAngleSpeed;
      cameraPathPosition += delta * cameraForwardSpeed;
      
      // Reset path position for looping
      if (cameraPathPosition > pathLength) {
        cameraPathPosition = 0;
        // Reset other elements to maintain the illusion of continuous flight
        resetScene();
      }
      
      // Update camera position on helical path
      camera.position.x = Math.cos(cameraAngle) * pathRadius;
      camera.position.y = Math.sin(cameraAngle) * pathRadius;
      camera.position.z = -cameraPathPosition;
      
      // Make camera look ahead with slight tilt based on movement
      camera.lookAt(
        camera.position.x + Math.cos(cameraAngle) * 5,
        camera.position.y + Math.sin(cameraAngle) * 5,
        camera.position.z - 100
      );
      
      // Update foreground stars
      const positionsAttribute = foregroundGeometry.attributes.position;
      for (let i = 0; i < foregroundParticleCount; i++) {
        const i3 = i * 3;
        // Move stars forward
        positionsAttribute.array[i3 + 2] += foregroundVelocities[i] * delta;
        
        // If passed the camera, reset to far end of tunnel
        if (positionsAttribute.array[i3 + 2] > camera.position.z + 10) {
          positionsAttribute.array[i3 + 2] = camera.position.z - pathLength;
          // Randomize x/y slightly
          const randomRadius = 10 + Math.random() * 30;
          const randomAngle = Math.random() * Math.PI * 2;
          positionsAttribute.array[i3] = Math.cos(randomAngle) * randomRadius;
          positionsAttribute.array[i3 + 1] = Math.sin(randomAngle) * randomRadius;
        }
      }
      positionsAttribute.needsUpdate = true;
      
      // Slowly rotate nebula layers for additional movement
      cloudGroup.children.forEach((cloud, index) => {
        const speed = 0.02 - (index * 0.003); // Different speeds for parallax
        cloud.rotation.z += speed * delta;
      });
      
      // Flicker the flares slightly
      flares.forEach(flare => {
        flare.material.opacity = 0.4 + Math.sin(clock.elapsedTime * (0.5 + Math.random() * 2)) * 0.2;
      });
      
      // Slowly rotate the entire distant star field
      distantStars.rotation.y += 0.001;
      distantStars.rotation.x += 0.0005;
      
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    
    // Function to reset elements when the camera path loops
    function resetScene() {
      // Respositon nebula layers
      cloudGroup.children.forEach(cloud => {
        cloud.position.z = cloud.position.z - pathLength;
      });
      
      // Flares need to be reset too
      flares.forEach(flare => {
        flare.position.z = flare.position.z - pathLength;
      });
    }
    
    // Start animation
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
      
      // Clean up Three.js resources
      renderer.dispose();
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          } else if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          }
        } else if (child instanceof THREE.Points) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
      
      // Remove canvas from DOM
      if (mountNode && renderer.domElement && mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Make the canvas take up the full screen
  const canvasStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  };
  
  return <div ref={mountRef} style={canvasStyle} />;
};

export default NebulaSpaceBackground;