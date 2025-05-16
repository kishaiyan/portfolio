import { useEffect, useRef } from 'react';
import * as THREE from 'three';
const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: !isMobile });
    renderer.setSize(window.innerWidth, 300);

    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x00f6ff,
      metalness: 0.6,
      roughness: 0.3,
      clearcoat: 0.8,
      emissive: 0x00f6ff,
      emissiveIntensity: 0.2,
      wireframe: true
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = isMobile ? 500 : 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i+2] = radius * Math.cos(phi);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00f6ff,
      size: isMobile ? 0.03 : 0.05,
      transparent: true,
      opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 4;

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      icosahedron.rotation.x += 0.003;
      icosahedron.rotation.y += 0.003;
      icosahedron.rotation.x += mouseY * 0.008;
      icosahedron.rotation.y += mouseX * 0.008;
      particlesMesh.rotation.x += 0.0008;
      particlesMesh.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, 300);
      camera.aspect = window.innerWidth / 300;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[300px]" />;
};
 export default ThreeScene;