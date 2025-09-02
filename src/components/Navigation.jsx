import { useEffect, useRef, useState } from "react";

const Navigation = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Animation for nav items appearing
    const navElements = navRef.current.querySelectorAll('.nav-item');
    navElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 500 + (index * 100));
    });
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };
  
  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md z-50 shadow-lg border-b border-cyan-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className="focus:outline-none group"
              aria-label="Scroll to top"
            >
              <div className="text-cyan-400 font-signature relative overflow-hidden group-hover:text-white transition-colors duration-300">
                <svg width="180" height="36" viewBox="0 0 180 36" className="fill-current">
                  {/* Stylized "K" */}
                  <path d="M10,5 L10,30 M10,18 L20,5 M10,18 L20,30" 
                    stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
                  {/* Stylized "T" */}
                  <path d="M30,5 L50,5 M40,5 L40,30" 
                    stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
                  {/* Flourish under signature */}
                  <path d="M5,32 C25,28 45,36 65,30 C85,24 105,32 125,28 C145,24 165,32 175,30" 
                    stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
                </svg>
                
                {/* Animated dot that follows on hover */}
                <div className="absolute bottom-1 left-0 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></div>
              </div>
            </button>
          </div>
          
          <div className="hidden sm:flex items-center space-x-4">
            {['intro', 'projects', 'skills', 'experience'].map((section) => (
              <button
                key={section}
                onClick={() => handleScroll(section)}
                className="nav-item text-cyan-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 opacity-0"
                style={{ transform: 'translateY(-20px)', transition: 'opacity 0.8s, transform 0.8s' }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </button>
            ))}
            <a
              href="/portfolio/19-8-2025_RESUME.pdf"
              download="Kishan_Thangaraj_Resume.pdf"
              title="Download Resume"
              className="nav-item text-cyan-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 opacity-0 flex items-center space-x-1"
              style={{ transform: 'translateY(-20px)', transition: 'opacity 0.8s, transform 0.8s' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </a>
          </div>
          
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-item text-cyan-400 focus:outline-none opacity-0"
              style={{ transform: 'translateY(-20px)', transition: 'opacity 0.8s, transform 0.8s' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="sm:hidden bg-gray-800/90 backdrop-blur-md">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {['intro', 'projects', 'skills', 'experience'].map((section) => (
              <button
                key={section}
                onClick={() => handleScroll(section)}
                className="block w-full text-left text-cyan-400 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </button>
            ))}
            <a
              href="/portfolio/19-8-2025_RESUME.pdf"
              download="Kishan_Thangaraj_Resume.pdf"
              title="Download Resume"
              className="block w-full text-left text-cyan-400 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;