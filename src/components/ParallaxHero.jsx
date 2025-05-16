import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import gsap from 'gsap';

const ParallaxHero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef=useRef(null);
  const layersRef = useRef([]);
  const typedRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typed.js Effect
  useEffect(() => {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
      typedRef.current = new Typed('.typed-text', {
        strings: [
          'Innovative Solutions',
          'AI-Powered Systems',
          'Scalable Applications',
          'Future-Ready Tech',
          'Reliable Systems',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
      });
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  // Scroll Parallax Effect - optimized for mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Reduce parallax intensity on mobile
      const parallaxIntensity = isMobile ? 0.5 : 1;
      
      if (titleRef.current) {
        // Reduce movement on mobile devices
        const titleMove = isMobile ? scrollPosition * 0.15 : scrollPosition * 0.3;
        titleRef.current.style.transform = `translateY(${titleMove}px)`;
        titleRef.current.style.opacity = 1 - scrollPosition * 0.002;
      }
      
      if (subtitleRef.current) {
        const subtitleMove = isMobile ? scrollPosition * 0.25 : scrollPosition * 0.5;
        subtitleRef.current.style.transform = `translateY(${subtitleMove}px)`;
        subtitleRef.current.style.opacity = 1 - scrollPosition * 0.002;
      }
      if (buttonRef.current){
        const buttonMove= isMobile ? scrollPosition * 0.25 : scrollPosition * 0.50;
        buttonRef.current.style.transform = `translateY(${buttonMove}px)`;
        buttonRef.current.style.opacity=1-scrollPosition *0.02;
      }
      
      layersRef.current.forEach((layer, index) => {
        if (layer) {
          // Adjust speed based on device type
          const speed = (index + 1) * 0.15 * parallaxIntensity;
          layer.style.transform = `translateY(${scrollPosition * speed}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Entrance animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: isMobile ? 40 : 80 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1.2, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: isMobile ? 20 : 40 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1.2, ease: 'power3.out', delay: 0.6 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4"
    >
      {/* Background layers - optimized positioning for mobile */}
      <div ref={(el) => (layersRef.current[0] = el)} className="absolute w-full h-full z-10">
        <div className="absolute top-1/4 md:top-1/3 left-1/4 md:left-1/5 w-16 h-16 md:w-32 md:h-32 rounded-full bg-cyan-600 opacity-15 blur-xl"></div>
      </div>
      <div ref={(el) => (layersRef.current[1] = el)} className="absolute w-full h-full z-20">
        <div className="absolute bottom-1/4 md:top-3/4 right-1/4 md:right-1/5 w-32 h-32 md:w-64 md:h-64 rounded-full bg-teal-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-40 text-center">
        <h1
          ref={titleRef}
          className="flex flex-col md:flex-row items-center justify-center md:gap-5 text-4xl xs:text-5xl sm:text-8xl md:text-7xl lg:text-8xl font-extrabold mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-green-400">
            Kishaiyan
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-sky-400">
            Thangaraj
          </span>
        </h1>
        
        <p 
          ref={subtitleRef} 
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-light text-cyan-100 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl mx-auto"
        >
          Crafting <span className="typed-text"></span>
        </p>

        <div className="mt-8 md:mt-12 flex justify-center">
          <a
            title='Take a tour around portfolio'
            ref={buttonRef}
            href="#intro"
            className="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-cyan-400 px-5 py-2 sm:px-6 md:px-8 md:py-3 focus:outline-none"
          >
            <span className="absolute inset-x-0 bottom-0 h-full translate-y-full bg-gradient-to-r from-cyan-500 to-green-400 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
            <span className="relative text-cyan-400 transition-colors duration-300 ease-in-out group-hover:text-white text-sm sm:text-base">
              Discover My Journey
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator - repositioned for better mobile visibility */}
      <div className="absolute bottom-30 md:bottom-20 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default ParallaxHero;