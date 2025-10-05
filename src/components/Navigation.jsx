import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Navigation = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ['intro', 'projects', 'skills', 'experience'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const navElements = navRef.current.querySelectorAll('.nav-item');
      
      gsap.fromTo(
        navElements,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsOpen(false);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'intro', label: 'About', icon: '👋' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💡' },
  ];
  
  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20' 
          : 'bg-gray-900/70 backdrop-blur-md border-b border-cyan-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Enhanced Logo */}
          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className="focus:outline-none group relative"
              aria-label="Scroll to top"
            >
              <div className="text-cyan-400 font-signature relative overflow-hidden group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                <svg width="160" height="32" viewBox="0 0 160 32" className="fill-current">
                  {/* Enhanced "K" */}
                  <path d="M8,4 L8,28 M8,16 L18,4 M8,16 L18,28" 
                    stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Enhanced "T" */}
                  <path d="M28,4 L48,4 M38,4 L38,28" 
                    stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Animated flourish */}
                  <path d="M4,30 C20,26 40,32 60,28 C80,24 100,30 120,26 C140,22 155,28 155,26" 
                    stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" 
                    className="opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                </svg>
                
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`nav-item px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative group 
                     text-white bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/30
                `   
                }
              >
                
                {item.label}
                
                
              </button>
            ))}
            
            {/* Enhanced Resume Button */}
            <a
              href="/portfolio/19-8-2025_RESUME.pdf"
              download="Kishan_Thangaraj_Resume.pdf"
              title="Download Resume"
              className="nav-item ml-4 px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/30 text-white font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 btn-hover-effect group"
            >
              <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>
          
          {/* Enhanced Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-item text-cyan-400 focus:outline-none p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 relative group"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="glass-effect border-t border-slate-700/50">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                  activeSection === item.id
                    ? 'text-white bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/30'
                    : 'text-cyan-400 hover:text-white hover:bg-slate-800/50'
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: isOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
            
            <a
              href="/portfolio/19-8-2025_RESUME.pdf"
              download="Kishan_Thangaraj_Resume.pdf"
              title="Download Resume"
              className="block w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/30 text-white font-medium transition-all duration-300 flex items-center gap-3 mt-4"
              style={{ 
                animationDelay: `${navItems.length * 100}ms`,
                animation: isOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;