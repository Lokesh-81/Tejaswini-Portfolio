import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DriftingElement {
  mesh: THREE.Mesh;
  type: 'petal' | 'leaf' | 'dust';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  scale: number;
  phase: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  layer: 'foreground' | 'midground' | 'background';
}

export const Ambient3DEnvironment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check WebGL availability
    let glSupported = true;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) glSupported = false;
    } catch {
      glSupported = false;
    }

    if (!glSupported) return;

    // SCENE, CAMERA & RENDERER
    const scene = new THREE.Scene();
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // LIGHTING (Warm Soft Studio Atmosphere)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xFFF8F0, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFF2E0, 2.2);
    sunLight.position.set(6, 12, 8);
    scene.add(sunLight);

    const softFillLight = new THREE.DirectionalLight(0xEDE0D4, 1.2);
    softFillLight.position.set(-6, -4, 4);
    scene.add(softFillLight);

    // -------------------------------------------------------------
    // PROCEDURAL 3D PETAL & LEAF GEOMETRIES
    // -------------------------------------------------------------
    // 1. Curved 3D Petal Geometry (organic curved tear-drop)
    const createPetalGeometry = () => {
      const geo = new THREE.BufferGeometry();
      const uSegs = 16;
      const vSegs = 16;
      const positions: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i <= uSegs; i++) {
        const u = i / uSegs; // 0 to 1 along length
        for (let j = 0; j <= vSegs; j++) {
          const v = (j / vSegs) * 2 - 1; // -1 to 1 across width

          // Tear-drop profile with natural organic taper
          const widthProfile = Math.sin(u * Math.PI) * (1 - u * 0.3);
          const x = v * widthProfile * 0.45;
          const y = (u - 0.5) * 1.1;
          // Gentle curved cup shape
          const z = (Math.sin(u * Math.PI) * 0.22) - (v * v * 0.12 * widthProfile);

          positions.push(x, y, z);
          uvs.push(u, (v + 1) / 2);
        }
      }

      for (let i = 0; i < uSegs; i++) {
        for (let j = 0; j < vSegs; j++) {
          const a = i * (vSegs + 1) + j;
          const b = (i + 1) * (vSegs + 1) + j;
          const c = (i + 1) * (vSegs + 1) + (j + 1);
          const d = i * (vSegs + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      return geo;
    };

    // 2. Organic Leaf Geometry (folded central spine)
    const createLeafGeometry = () => {
      const geo = new THREE.BufferGeometry();
      const uSegs = 18;
      const vSegs = 12;
      const positions: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i <= uSegs; i++) {
        const u = i / uSegs;
        for (let j = 0; j <= vSegs; j++) {
          const v = (j / vSegs) * 2 - 1;

          const widthProfile = Math.sin(Math.pow(u, 0.7) * Math.PI);
          const x = v * widthProfile * 0.35;
          const y = (u - 0.5) * 1.3;
          // V-shaped spine fold with arched tip
          const spineFold = Math.abs(v) * 0.14 * widthProfile;
          const tipArch = Math.sin(u * Math.PI) * 0.18;
          const z = tipArch - spineFold;

          positions.push(x, y, z);
        }
      }

      for (let i = 0; i < uSegs; i++) {
        for (let j = 0; j < vSegs; j++) {
          const a = i * (vSegs + 1) + j;
          const b = (i + 1) * (vSegs + 1) + j;
          const c = (i + 1) * (vSegs + 1) + (j + 1);
          const d = i * (vSegs + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      return geo;
    };

    const petalGeo = createPetalGeometry();
    const leafGeo = createLeafGeometry();
    const dustGeo = new THREE.SphereGeometry(0.04, 8, 8);

    // -------------------------------------------------------------
    // PALETTE MATERIALS (Warm Editorial Velvet & Translucent Textures)
    // -------------------------------------------------------------
    const petalColors = [
      new THREE.Color('#F7EBE1'), // Soft almond blossom ivory
      new THREE.Color('#EED9C7'), // Warm peach-beige
      new THREE.Color('#E5CBBA'), // Muted blush terracotta
      new THREE.Color('#F2E5D5'), // Pale champagne
      new THREE.Color('#D8BFAC')  // Warm taupe rose
    ];

    const leafColors = [
      new THREE.Color('#D2DAC8'), // Soft sage mist
      new THREE.Color('#C2CCA8'), // Muted olive tint
      new THREE.Color('#DAD0C0'), // Dried botanical beige
      new THREE.Color('#B8C2A8')  // Warm lichen
    ];

    const petalMaterials = petalColors.map((color) => 
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.55,
        metalness: 0.05,
        transmission: 0.25, // Translucent light passing through petals
        thickness: 0.6,
        clearcoat: 0.15,
        clearcoatRoughness: 0.4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88
      })
    );

    const leafMaterials = leafColors.map((color) =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.6,
        metalness: 0.05,
        transmission: 0.15,
        thickness: 0.5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      })
    );

    const dustMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#E8D2BD'),
      transparent: true,
      opacity: 0.45
    });

    // -------------------------------------------------------------
    // SPAWN ELEMENTS ACROSS 3D DEPTH LAYERS
    // -------------------------------------------------------------
    const elements: DriftingElement[] = [];
    const elementGroup = new THREE.Group();
    scene.add(elementGroup);

    // Layer bounds
    const spawnXRange = 16;
    const spawnYRange = 22;

    const createDrifter = (layer: 'foreground' | 'midground' | 'background', initialY?: number): DriftingElement => {
      let type: 'petal' | 'leaf' | 'dust';
      let zMin: number, zMax: number;
      let scaleBase: number;

      if (layer === 'foreground') {
        type = Math.random() > 0.3 ? 'petal' : 'leaf';
        zMin = 2.0;
        zMax = 4.8; // Very close to camera for cinematic depth
        scaleBase = 0.55 + Math.random() * 0.4;
      } else if (layer === 'midground') {
        type = Math.random() > 0.4 ? 'petal' : (Math.random() > 0.5 ? 'leaf' : 'dust');
        zMin = -3.0;
        zMax = 2.0;
        scaleBase = 0.32 + Math.random() * 0.25;
      } else {
        type = Math.random() > 0.6 ? 'dust' : 'petal';
        zMin = -9.0;
        zMax = -3.0;
        scaleBase = 0.16 + Math.random() * 0.18;
      }

      let mesh: THREE.Mesh;
      if (type === 'petal') {
        const mat = petalMaterials[Math.floor(Math.random() * petalMaterials.length)];
        mesh = new THREE.Mesh(petalGeo, mat);
      } else if (type === 'leaf') {
        const mat = leafMaterials[Math.floor(Math.random() * leafMaterials.length)];
        mesh = new THREE.Mesh(leafGeo, mat);
      } else {
        mesh = new THREE.Mesh(dustGeo, dustMaterial);
      }

      const x = (Math.random() - 0.5) * spawnXRange;
      const y = initialY !== undefined ? initialY : (Math.random() - 0.5) * spawnYRange;
      const z = zMin + Math.random() * (zMax - zMin);

      mesh.position.set(x, y, z);
      mesh.scale.set(scaleBase, scaleBase, scaleBase);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      elementGroup.add(mesh);

      return {
        mesh,
        type,
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.006 - 0.003, // Slight natural drift leftward/rightward
        vy: -(0.008 + Math.random() * 0.012) * (layer === 'foreground' ? 1.4 : layer === 'midground' ? 1.0 : 0.6), // Downward terminal velocity
        vz: (Math.random() - 0.5) * 0.003,
        rotX: mesh.rotation.x,
        rotY: mesh.rotation.y,
        rotZ: mesh.rotation.z,
        vRotX: (Math.random() - 0.5) * 0.015,
        vRotY: (Math.random() - 0.5) * 0.018,
        vRotZ: (Math.random() - 0.5) * 0.012,
        scale: scaleBase,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.6 + Math.random() * 0.8,
        wobbleAmp: 0.006 + Math.random() * 0.008,
        layer
      };
    };

    // 14 foreground elements (close cinematic passes)
    for (let i = 0; i < 14; i++) {
      elements.push(createDrifter('foreground'));
    }
    // 55 midground elements (core atmospheric field)
    for (let i = 0; i < 55; i++) {
      elements.push(createDrifter('midground'));
    }
    // 70 background elements (distant depth particles & motes)
    for (let i = 0; i < 70; i++) {
      elements.push(createDrifter('background'));
    }

    // -------------------------------------------------------------
    // INTERACTION: SMOOTH MOUSE PARALLAX & SCROLL VELOCITY
    // -------------------------------------------------------------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;
    let prevScrollY = scrollY;
    let scrollVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // ANIMATION & RENDER LOOP
    // -------------------------------------------------------------
    let clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damped mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Scroll velocity calculations
      const currentScrollDiff = scrollY - prevScrollY;
      scrollVelocity += (currentScrollDiff * 0.001 - scrollVelocity) * 0.1;
      prevScrollY = scrollY;

      // Subtle camera parallax based on mouse
      camera.position.x = mouse.x * 0.6;
      camera.position.y = mouse.y * 0.4 - (scrollY * 0.002);
      camera.lookAt(0, -scrollY * 0.002, 0);

      // Global simulated wind gust
      const windX = Math.sin(time * 0.4) * 0.004 + 0.002;
      const windZ = Math.cos(time * 0.35) * 0.002;

      // Update all drifting elements
      const yBoundBottom = -12 - (scrollY * 0.002);
      const yBoundTop = 13 - (scrollY * 0.002);

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        if (!prefersReducedMotion) {
          // Turbulence & organic aerodynamic wobble
          const wobble = Math.sin(time * el.wobbleSpeed + el.phase) * el.wobbleAmp;
          const wobbleZ = Math.cos(time * el.wobbleSpeed * 0.8 + el.phase) * el.wobbleAmp * 0.6;

          // Parallax depth responsiveness
          let layerParallaxMult = 1.0;
          if (el.layer === 'foreground') layerParallaxMult = 2.4;
          else if (el.layer === 'midground') layerParallaxMult = 1.0;
          else layerParallaxMult = 0.35;

          // Position updates
          el.x += el.vx + windX * layerParallaxMult + wobble;
          el.y += el.vy - scrollVelocity * layerParallaxMult;
          el.z += el.vz + windZ + wobbleZ;

          // Rotational tumbling & aerodynamic drag
          el.rotX += el.vRotX + Math.sin(time * 1.2 + el.phase) * 0.005;
          el.rotY += el.vRotY + windX * 2.0;
          el.rotZ += el.vRotZ + wobble * 0.8;

          el.mesh.rotation.set(el.rotX, el.rotY, el.rotZ);
        }

        // Apply updated position
        el.mesh.position.set(el.x, el.y, el.z);

        // Seamless Boundary Recycling
        if (el.y < yBoundBottom) {
          el.y = yBoundTop + Math.random() * 2;
          el.x = (Math.random() - 0.5) * spawnXRange + (mouse.x * 2);
        } else if (el.y > yBoundTop + 4) {
          el.y = yBoundBottom - Math.random() * 2;
        }

        if (el.x > spawnXRange / 2 + 3) {
          el.x = -spawnXRange / 2 - 2;
        } else if (el.x < -spawnXRange / 2 - 3) {
          el.x = spawnXRange / 2 + 2;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      petalGeo.dispose();
      leafGeo.dispose();
      dustGeo.dispose();
      petalMaterials.forEach((m) => m.dispose());
      leafMaterials.forEach((m) => m.dispose());
      dustMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    />
  );
};
