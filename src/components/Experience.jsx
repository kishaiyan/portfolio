import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const experienceContentRef = useRef(null);
  const [activeExperience, setActiveExperience] = useState(0);
  
  const experienceData = [
    {
      id: "expertease",
      company: "ExpertEase AI",
      location: "South Australia",
      role: "Full Stack Developer",
      period: "January 2025 – Present",
      achievements: [
        "Architected and implemented an enterprise-grade Retrieval Augmented Generation (RAG) pipeline, enhancing knowledge retrieval accuracy by 30% and reducing query processing time by 40%.",
        "Led the successful migration of mission-critical databases between EC2 instances, ensuring zero downtime through meticulous planning, comprehensive testing, and staged deployment strategies.",
        "Optimized CI/CD workflows by implementing containerization and infrastructure-as-code practices, reducing deployment time by 50% and improving system reliability with automated testing.",
        "Spearheaded the implementation of observability solutions using BetterStack and Langfuse, resulting in 25% faster issue resolution and enhanced system performance monitoring."
      ],
      tech: "Python, React, AWS, Lambda, S3, MySQL, Qdrant, FastAPI, Docker, BetterStack, Langfuse"
    },
    {
      id: "aiml",
      company: "Australian Institute of Machine Learning",
      location: "Adelaide",
      role: "Software Developer Intern",
      period: "August 2024 – December 2024",
      achievements: [
        "Engineered solutions to complex Linux-NVIDIA CUDA integration challenges for Detectron2, enabling seamless deployment of computer vision models across heterogeneous computing environments.",
        "Implemented and optimized Open Vocabulary Object Detection algorithms, achieving a 35% improvement in detection accuracy for novel object classes not present in training data.",
        "Designed and deployed a production-ready RESTful API using FastAPI on AWS EC2, enabling secure, scalable access to machine learning models with comprehensive authentication and rate limiting.",
        "Developed a cross-platform Flutter application incorporating on-device ML inference capabilities, reducing latency by 60% compared to cloud-based processing while maintaining detection accuracy."
      ],
      tech: "Python, PyTorch, Transformers, AWS EC2, FastAPI, Flutter, React, MySQL"
    },
    {
      id: "teem",
      company: "Teem Consulting Ltd",
      location: "Dubai",
      role: "Software Developer",
      period: "July 2019 – December 2021",
      achievements: [
        "Led the development of a fintech solution processing over $3M in monthly transactions, implementing bank-grade security measures and achieving PCI DSS compliance.",
        "Designed and implemented microservices architecture using Java Spring Boot, reducing system latency by 45% and enabling independent scaling of application components.",
        "Orchestrated the migration from monolithic architecture to containerized microservices, resulting in 60% improved deployment frequency and enhanced system resilience.",
        "Mentored junior developers through knowledge-sharing sessions and pair programming, increasing team productivity by 25% and promoting adoption of best practices."
      ],
      tech: "Java, Python, Spring Boot, React, AWS, MySQL, Docker, Kubernetes, CI/CD"
    },
    {
      id: "tkmaxx",
      company: "TK Maxx",
      location: "West Lakes, South Australia",
      role: "Retail Team Lead (Part-Time)",
      period: "August 2023 – Present",
      achievements: [
        "Direct operations during peak business hours, supervising a team of 5-7 associates and optimizing workflow processes to increase customer throughput by 20% while maintaining quality service.",
        "Developed and implemented staff training programs that improved new employee onboarding efficiency by 30% and reduced training time by two days.",
        "Streamlined inventory management procedures, reducing stockroom processing time by 15% and improving merchandise flow to the sales floor."
      ],
      qualities: "Leadership, Customer Service, Team Management, Process Optimization, Inventory Control, Training & Development, Communication, Time Management, Problem Solving"
    }
  ];

  // GSAP Animations
  useEffect(() => {
    // Animate the section title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate the initial content
    if (experienceContentRef.current && experienceData.length > 0) {
      gsap.fromTo(
        experienceContentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.2, // Small delay to ensure title animation starts
        }
      );
    }
  }, []); // Runs once on mount

  // Animation for experience content change
  useEffect(() => {
    if (experienceContentRef.current) {
      // Fade out
      gsap.to(experienceContentRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          // Content updates via React state change (activeExperience)
          // Then fade in the new content
          gsap.fromTo(experienceContentRef.current, 
            { opacity: 0, y: 10 }, // Start slightly from bottom
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        },
      });
    }
  }, [activeExperience]);

  const currentExperience = experienceData[activeExperience];
  
  if (!currentExperience) {
    return (
      <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-gray-100 h-screen flex flex-col justify-center items-center">
        <p>No experience entries to display.</p>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-gray-100 h-screen flex flex-col"
    >
      {/* Title */}
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 tracking-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400">
          Professional
        </span>
        <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-cyan-400 ml-2">
          Experience
        </span>
      </h2>

      {/* Horizontally Scrollable Experience List */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 py-2 mb-6 sm:mb-8">
        <div className="flex flex-nowrap space-x-2 sm:space-x-3 px-1 justify-start sm:justify-center min-w-max sm:min-w-0">
          {experienceData.map((experience, index) => (
            <button
              title={`${experience.company} toggle for experience`}
              key={experience.id}
              onClick={() => setActiveExperience(index)}
              className={`whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-200 
                ${activeExperience === index 
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium shadow-lg transform scale-105' 
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-cyan-300'}`}
            >
              {experience.company}
            </button>
          ))}
        </div>
      </div>

      {/* Main Experience Content Area */}
      <main 
        ref={experienceContentRef} 
        className="w-full flex-grow bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700 overflow-hidden flex flex-col opacity-0" 
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - role & details */}
          <div className="lg:w-1/2 p-4 sm:p-5 flex flex-col">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                {currentExperience.role}
              </h3>
              
              <p className="text-xs sm:text-sm text-cyan-300/80 mb-2 sm:mb-3">
                {currentExperience.company}, {currentExperience.location}
              </p>
              
              <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5 font-medium">
                {currentExperience.period}
              </p>
            </div>
            
            {/* This div will fill space and push the technologies to the bottom */}
            
              {currentExperience.tech && (
                <div className="mb-auto">
                  <h4 className="text-xs sm:text-sm font-semibold text-cyan-300 mb-1.5 sm:mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentExperience.tech.split(', ').map((techItem, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded bg-slate-700/70 text-gray-300 text-[0.7rem] sm:text-xs border border-slate-600"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>
              )}
         
            
              {currentExperience.qualities && (
                <div className="mb-auto">
                  <h4 className="text-xs sm:text-sm font-semibold text-cyan-300 mb-1.5 sm:mb-2">
                  Demonstrated Skills :
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentExperience.qualities.split(', ').map((quality, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded bg-slate-700/70 text-gray-300 text-[0.7rem] sm:text-xs border border-slate-600"
                      >
                        {quality}
                      </span>
                    ))}
                  </div>
                  </div>
              )}
            
          </div>
          
          {/* Right side - achievements */}
          <div className="lg:w-1/2 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-slate-700 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <h4 className="text-xs sm:text-sm font-semibold text-cyan-300 mb-2 sm:mb-3 flex justify-between items-center">
              <span>Key Achievements:</span>
            </h4>
            
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-[0.75rem] sm:text-sm">
              {currentExperience.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 mr-1.5 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Experience;