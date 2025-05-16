import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  
  // Reset refs on re-render
  cardRefs.current = [];

  // Condensed skills into 5 more focused categories
  const skillsData = [
    { 
      title: "Languages & Frameworks", 
      skills: ["JavaScript", "TypeScript", "Python", "Java","express js", "Node.js", "Next.js", "Spring Boot","django","Flask"],
      icon: "code"
    },
    { 
      title: "Frontend & Mobile", 
      skills: ["React","React Native", "Flutter", "Responsive Design", "Tailwind CSS", "Material UI", "HTML/CSS", "Vue.js"],
      icon: "layout"
    },
    { 
      title: "Backend & Databases", 
      skills: ["RESTful APIs", "GraphQL",,"grpc", "PostgreSQL", "MongoDB", "Firebase", "Microservices", "MySQL","WebSockets"],
      icon: "database"
    },
    { 
      title: "AI & Machine Learning", 
      skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Generative AI", "LangChain", "RAG Systems"],
      icon: "cpu"
    },
    { 
      title: "DevOps & Cloud", 
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Azure", "GCP", "Terraform"],
      icon: "cloud"
    }
  ];

  useEffect(() => {
    // Create a single GSAP context for better performance
    const ctx = gsap.context(() => {
      // Animation for section title with split text effect
      if (titleRef.current) {
        const titleWords = titleRef.current.querySelectorAll('.title-word');
        
        gsap.fromTo(
          titleWords,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Staggered animation for skill cards
      cardRefs.current.forEach((card, index) => {
        if (card) {
          // Main card animation
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              y: 30, 
              scale: 0.95 
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
              delay: index * 0.1, // Staggered timing
            }
          );
          
          // Skill tags animation
          const skillTags = card.querySelectorAll('.skill-tag');
          gsap.fromTo(
            skillTags,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
              delay: index * 0.1 + 0.3, // Start after card animation
            }
          );
        }
      });
    }, sectionRef); // Scope all animations to the section
    
    return () => ctx.revert(); // Clean up animations on unmount
  }, []);

  // Helper to add elements to our refs array
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // Simple icon components 
  const icons = {
    code: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    layout: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
    database: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    cpu: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    cloud: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="pb-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 sm:mb-20 tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <span className="title-word text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-green-400">
            Technical
          </span>
          <span className="title-word text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-sky-400">
            Expertise
          </span>
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {skillsData.map((category, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 group transform hover:-translate-y-1 hover:scale-[1.01]"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl sm:text-2xl font-semibold text-sky-400 group-hover:text-cyan-300 transition-colors duration-300 flex items-center gap-3">
                  <span className="text-cyan-500 p-2 bg-slate-700/50 rounded-lg group-hover:bg-cyan-900/30 transition-colors duration-300">
                    {icons[category.icon]}
                  </span>
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-tag px-3 py-1.5 rounded-md bg-slate-700/70 text-gray-300 text-sm border border-slate-600 hover:bg-cyan-600/30 hover:border-cyan-500 hover:text-cyan-200 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;