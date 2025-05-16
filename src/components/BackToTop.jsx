import { useState, useEffect } from 'react';

const BackToTop = ({ sections }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Trigger when 30% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex(
            (section) => section.current === entry.target
          );
          if (index !== -1) {
            setCurrentSectionIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    // Check if scrolled to the bottom
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollPosition >= documentHeight - 50); // 50px buffer
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const handleClick = () => {
    if (isAtBottom || currentSectionIndex === sections.length - 1) {
      // Scroll to top if at the bottom or last section
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentSectionIndex(0);
    } else {
      // Scroll to the next section
      const nextIndex = currentSectionIndex + 1;
      const nextSection = sections[nextIndex].current;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setCurrentSectionIndex(nextIndex);
      }
    }
  };

  // Use chevron-down for scrolling down, chevron-up for scrolling to top
  const isUpArrow = isAtBottom || currentSectionIndex === sections.length - 1;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 p-3 sm:p-4 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg hover:scale-110 transition-transform duration-300 z-50"
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={isUpArrow ? 'M5 15l7-7 7 7' : 'M5 9l7 7 7-7'}
        />
      </svg>
    </button>
  );
};

export default BackToTop;