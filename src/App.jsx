import { useEffect, useRef } from 'react';
import ParallaxHero from './components/ParallaxHero';
import Navigation from './components/Navigation';
import HeroIntro from './components/HeroIntro';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const App = () => {
  const canvasRef = useRef(null);
  const heroIntroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);

  // Particle Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const isMobile = window.innerWidth <= 768;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = isMobile ? 50 : 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(0, ${150 + Math.random() * 105}, ${150 + Math.random() * 105}, ${0.2 + Math.random() * 0.6})`,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen text-gray-100 relative">
      {/* Particle Canvas as Background */}
      <canvas
        ref={canvasRef}
        id="particleCanvas"
        className="fixed top-0 left-0 w-full h-full z-[-1]"
      ></canvas>

      <Navigation />
      <div className="pt-16">
        <ParallaxHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroIntroRef}>
            <HeroIntro />
          </div>
          <div ref={projectsRef}>
            <Projects />
          </div>
          <div ref={skillsRef}>
            <Skills />
          </div>
          <div ref={experienceRef}>
            <Experience />
          </div>
        </div>
        <Footer />
        <BackToTop
          sections={[canvasRef,heroIntroRef, projectsRef, skillsRef, experienceRef]}
        />
      </div>
    </div>
  );
};

export default App;