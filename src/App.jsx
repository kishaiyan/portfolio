import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import ParallaxHero from './components/ParallaxHero';
import Navigation from './components/Navigation';
import HeroIntro from './components/HeroIntro';

// Lazy load components for better performance
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Footer = lazy(() => import('./components/Footer'));
const BackToTop = lazy(() => import('./components/BackToTop'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
  </div>
);

const App = () => {
  const canvasRef = useRef(null);
  const heroIntroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Enhanced Particle Canvas Effect with performance optimizations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip animations if user prefers reduced motion
    if (isReducedMotion) {
      setIsLoaded(true);
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = isMobile ? 30 : 80; // Reduced for better performance
    const particles = [];

    // Create particles with better color variety
    for (let i = 0; i < particleCount; i++) {
      const colorVariants = [
        `rgba(6, 182, 212, ${0.1 + Math.random() * 0.4})`, // cyan
        `rgba(20, 184, 166, ${0.1 + Math.random() * 0.4})`, // teal
        `rgba(34, 197, 94, ${0.1 + Math.random() * 0.4})`, // green
        `rgba(59, 130, 246, ${0.1 + Math.random() * 0.4})`, // blue
      ];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: colorVariants[Math.floor(Math.random() * colorVariants.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Add subtle pulsing effect
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
    };

    animate();
    setIsLoaded(true);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reposition particles on resize
      particles.forEach(particle => {
        if (particle.x > canvas.width) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = canvas.height;
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-100 relative overflow-x-hidden">
      {/* Enhanced Background with Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 z-[-2]"></div>
      
      {/* Particle Canvas as Background */}
      <canvas
        ref={canvasRef}
        id="particleCanvas"
        className="fixed top-0 left-0 w-full h-full z-[-1] opacity-70"
        aria-hidden="true"
      ></canvas>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-cyan-400 text-lg">Loading Portfolio...</p>
          </div>
        </div>
      )}

      <Navigation />
      
      <main className="pt-16">
        <ParallaxHero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section ref={heroIntroRef}>
            <HeroIntro />
          </section>
          
          <Suspense fallback={<LoadingSpinner />}>
            <section ref={projectsRef}>
              <Projects />
            </section>
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner />}>
            <section ref={skillsRef}>
              <Skills />
            </section>
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner />}>
            <section ref={experienceRef}>
              <Experience />
            </section>
          </Suspense>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
        
        <Suspense fallback={null}>
          <BackToTop
            sections={[canvasRef, heroIntroRef, projectsRef, skillsRef, experienceRef]}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default App;