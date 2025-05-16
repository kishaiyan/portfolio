import { useEffect,useRef,useState } from "react";
import gsap from "gsap";
const Navigation = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current.children,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

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
            <span className="text-xl sm:text-2xl font-bold text-cyan-400">Kishaiyan Thangaraj</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            {['intro','projects', 'skills','experience'].map((section) => (
              <button
                key={section}
                onClick={() => handleScroll(section)}
                className="text-cyan-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyan-400 focus:outline-none"
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
            {['intro','projects', 'skills','experience'].map((section) => (
              <button
                key={section}
                onClick={() => handleScroll(section)}
                className="block w-full text-left text-cyan-400 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navigation