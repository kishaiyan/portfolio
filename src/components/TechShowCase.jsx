import ThreeScene from './ThreeScene'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
const TechShowcase = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section id="tech-showcase" ref={sectionRef} className="mb-16 pt-16 px-4 sm:px-6">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-cyan-400 mb-8">Tech in Motion</h2>
      <ThreeScene />
    </section>
  );
};
export default TechShowcase

