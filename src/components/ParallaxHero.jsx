import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import gsap from 'gsap';

const ParallaxHero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const layersRef = useRef([]);
  const typedRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse movement effect for desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Enhanced Typed.js Effect
  useEffect(() => {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
      typedRef.current = new Typed('.typed-text', {
        strings: [
          'AI-Powered Solutions 🤖',
          'Scalable Cloud Systems ☁️',
          'Full-Stack Applications 🚀',
          'Machine Learning Models 🧠',
          'Future-Ready Technology ✨',
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  // Enhanced Scroll Parallax Effect
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const handleScroll = () => {
      if (isReducedMotion) return;
      
      const scrollPosition = window.scrollY;
      const parallaxIntensity = isMobile ? 0.3 : 0.6;
      
      if (titleRef.current) {
        const titleMove = scrollPosition * 0.2 * parallaxIntensity;
        titleRef.current.style.transform = `translateY(${titleMove}px)`;
        titleRef.current.style.opacity = Math.max(0, 1 - scrollPosition * 0.001);
      }
      
      if (subtitleRef.current) {
        const subtitleMove = scrollPosition * 0.3 * parallaxIntensity;
        subtitleRef.current.style.transform = `translateY(${subtitleMove}px)`;
        subtitleRef.current.style.opacity = Math.max(0, 1 - scrollPosition * 0.0015);
      }
      
      if (buttonRef.current) {
        const buttonMove = scrollPosition * 0.4 * parallaxIntensity;
        buttonRef.current.style.transform = `translateY(${buttonMove}px)`;
        buttonRef.current.style.opacity = Math.max(0, 1 - scrollPosition * 0.002);
      }
      
      layersRef.current.forEach((layer, index) => {
        if (layer) {
          const speed = (index + 1) * 0.1 * parallaxIntensity;
          layer.style.transform = `translateY(${scrollPosition * speed}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Enhanced entrance animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: isMobile ? 60 : 100, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: isMobile ? 30 : 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4"
    >
      {/* Enhanced Background layers with mouse interaction */}
      <div 
        ref={(el) => (layersRef.current[0] = el)} 
        className="absolute w-full h-full z-10"
        style={{
          transform: !isMobile ? `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` : 'none'
        }}
      >
        <div className="absolute top-1/4 md:top-1/3 left-1/4 md:left-1/5 w-20 h-20 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-15 blur-xl animate-float"></div>
      </div>
      
      <div 
        ref={(el) => (layersRef.current[1] = el)} 
        className="absolute w-full h-full z-20"
        style={{
          transform: !isMobile ? `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` : 'none'
        }}
      >
        <div className="absolute bottom-1/4 md:top-3/4 right-1/4 md:right-1/5 w-40 h-40 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-green-400 to-teal-500 opacity-15 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/2 w-16 h-16 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 opacity-10 blur-2xl animate-float"></div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0 z-30">
        <div className="absolute top-20 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-teal-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-40 text-center max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="flex flex-col md:flex-row items-center justify-center md:gap-6 text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6 leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-green-400 animate-gradient">
            Kishaiyan
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-sky-400 animate-gradient">
            Thangaraj
          </span>
        </h1>
        
        <div 
          ref={subtitleRef} 
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-cyan-100 max-w-4xl mx-auto mb-8"
        >
          <p className="mb-2">Crafting <span className="typed-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 font-semibold"></span></p>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Full-Stack Developer • AI Engineer • Cloud Architect
          </p>
        </div>

        <div ref={buttonRef} className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            title='Explore my portfolio'
            href="#intro"
            className="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-cyan-400 px-6 py-3 sm:px-8 sm:py-4 focus:outline-none btn-hover-effect animate-pulse-glow hover:animate-none transition-all duration-300"
          >
            <span className="absolute inset-x-0 bottom-0 h-full translate-y-full bg-gradient-to-r from-cyan-500 to-green-400 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
            <span className="relative text-cyan-400 transition-colors duration-300 ease-in-out group-hover:text-white text-sm sm:text-base font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Discover My Journey
            </span>
          </a>
          
          <a
            href="mailto:kishaiyanthangaraj@gmail.com"
            className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 text-sm sm:text-base font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get In Touch
          </a>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-cyan-400 font-medium">Scroll to explore</span>
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;