import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectContentRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const projectsData = [
    {
      id: "splitmate",
      name: "Splitmate — Intelligent Bill Management",
      shortName: "Splitmate",
      description: [
        "Engineered a comprehensive bill-splitting application featuring IoT integration for real-time utility consumption monitoring and user-specific billing.",
        "Implemented an AI-powered anomaly detection system to identify unusual consumption patterns, providing users with actionable insights for energy optimization.",
        "Designed and deployed a highly secure payment gateway, achieving 99.9% transaction reliability and incorporating multi-factor authentication.",
        "Architected a scalable serverless backend on AWS (Lambda, DynamoDB, IoT Core) capable of handling over 10,000 concurrent users with low latency.",
        "Integrated LangChain for advanced natural language processing capabilities, enabling intelligent chatbot support and automated report generation."
      ],
      tech: "React Native, AWS Lambda, DynamoDB, AWS IoT Core, LangChain, GraphQL, Python, Node.js, AWS Amplify, AWS EC2",
      github: "https://github.com/kishaiyan/splitmateez.git",
      image: "https://placehold.co/600x400/1A202C/718096?text=UtiliSplit+Project&font=Inter"
    },
    {
      id: "cropsense",
      name: "CropSense — Agricultural Intelligence Platform",
      shortName: "CropSense",
      description: [
        "Developed a mobile-first platform for precision agriculture, achieving 95% accuracy in crop disease detection using advanced image recognition models.",
        "Integrated a sophisticated recommendation engine powered by a custom-trained LLM (similar to ChatGPT) for contextual farming advice and pest management.",
        "Ensured robust data security and user privacy through JWT-based authentication, biometric login options, and end-to-end data encryption.",
        "Engineered an offline-first architecture using local data caching and synchronization, ensuring uninterrupted functionality in remote agricultural areas with limited connectivity."
      ],
      tech: "Flutter, Firebase, TensorFlow Lite, PyTorch Mobile, Flask, Python, WebSocket, GCP, Swin Transformer",
      github: "https://github.com/kishaiyan/Cropsense_.git",
      image: "https://placehold.co/600x400/1A202C/718096?text=CropSense+Project&font=Inter"
    },
    {
      id: "securevote",
      name: "SecureVote — Online Voting System",
      shortName: "SecureVote",
      description: [
        "Designed and developed the full voting pipeline—from ballot issuance to secure vote casting and encrypted tallying—leveraging React, Firebase, Node.js, and Express.js.",
        "Integrated Multi-Factor Authentication (MFA) using WebAuthn standards and biometric verification. All user interactions and votes are encrypted and stored using industry-standard protocols.",
        "Incorporated Zero-Knowledge Proofs (ZKPs) for voter anonymity and Homomorphic Encryption for secure, real-time vote counting—eliminating any single point of compromise.","Conducted rigorous security audits and penetration testing to address OWASP Top 10 threats and ensure SOC 2 Type II audit-readiness.",
        "Successfully achieved compliance with stringent security standards, including OWASP Top 10, and prepared for SOC 2 Type II auditing."
      ],
      tech: "React, Node.js, Express.js, WebAuthn, OAuth 2.0, IPFS, PostgreSQL, Firbase",
      github: "https://github.com/kishaiyan/electronic-voting-system.git",
      image: "https://placehold.co/600x400/1A202C/718096?text=SecureVote+Project&font=Inter"
    },
    // {
    //   id: "ai_driven_ecom",
    //   name: "AI-Driven E-commerce Personalization Engine",
    //   shortName: "AI E-commerce",
    //   description: [
    //     "Led the development of an AI personalization engine for a major e-commerce platform, resulting in a 15% increase in conversion rates.",
    //     "Utilized collaborative filtering and content-based filtering algorithms to provide tailored product recommendations.",
    //     "Built a real-time user behavior tracking system to dynamically adjust recommendations and UI elements.",
    //     "Deployed the engine on a Kubernetes cluster for high availability and scalability, processing millions of user interactions daily."
    //   ],
    //   tech: "Python, Scikit-learn, Spark MLlib, Kafka, Elasticsearch, React, Node.js, Kubernetes, Docker, Azure ML",
    //   github: "https://github.com/your-repo/ai-ecommerce",
    //   image: "https://placehold.co/600x400/1A202C/718096?text=AI+E-commerce&font=Inter"
    // }
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

    // Animate the initial content (project details area)
    // This needs to be triggered after the initial project data is set.
    // If it's already handled by the activeProject useEffect, this specific one might be redundant
    // or could be merged. For now, assuming it's for the first load.
    if (projectContentRef.current && projectsData.length > 0) {
       gsap.fromTo(
        projectContentRef.current,
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

  // Animation for project content change
  useEffect(() => {
    if (projectContentRef.current) {
      // Fade out
      gsap.to(projectContentRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          // Content updates via React state change (activeProject)
          // Then fade in the new content
          gsap.fromTo(projectContentRef.current, 
            { opacity: 0, y: 10 }, // Start slightly from bottom
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        },
      });
    }
  }, [activeProject]);

  const currentProject = projectsData[activeProject];
  
  if (!currentProject) {
    // Handle case where projectsData might be empty or activeProject is out of bounds
    return (
        <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-gray-100 h-screen flex flex-col justify-center items-center">
            <p>No projects to display.</p>
        </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-gray-100 h-screen flex flex-col"
    >
      {/* Title */}
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 tracking-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-green-400">
          Featured
        </span>
        <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-sky-400 ml-2">
          Projects
        </span>
      </h2>

      {/* Horizontally Scrollable Project List */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 py-2 mb-6 sm:mb-8">
        <div className="flex flex-nowrap space-x-2 sm:space-x-3 px-1 justify-start sm:justify-center min-w-max sm:min-w-0"> {/* justify-center on sm+ if tabs don't fill width */}
          {projectsData.map((project, index) => (
            <button
              title={`${project.shortName} button`}
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-200 
                ${activeProject === index 
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-medium shadow-lg transform scale-105' 
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-sky-300'}`}
            >
              {project.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Project Content Area */}
      <main 
        ref={projectContentRef} 
        // Initial opacity set to 0 for GSAP fade-in
        className="w-full flex-grow bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700 overflow-hidden flex flex-col opacity-0" 
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - image & details */}
          <div className="lg:w-1/2 p-4 sm:p-5 flex flex-col">
            <div className="relative w-full h-36 sm:h-48 lg:h-56 mb-3 sm:mb-4 overflow-hidden rounded-lg shadow-lg">
              <img
                src={currentProject.image}
                alt={`${currentProject.name} preview`}
                className="w-full h-full object-cover border border-slate-600"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src="https://placehold.co/600x400/1A202C/4A5568?text=Image+Not+Available&font=Inter";
                }}
              />
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              {currentProject.name.split('—')[0]}
            </h3>
            
            <p className="text-xs sm:text-sm text-sky-300/80 mb-3 sm:mb-4">
              {currentProject.name.split('—')[1]?.trim()}
            </p>
            
            {/* This div will push the GitHub link to the bottom because of mb-auto */}
            <div className="mb-auto"> 
              <h4 className="text-xs sm:text-sm font-semibold text-sky-300 mb-1.5 sm:mb-2">
                Core Technologies:
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {currentProject.tech.split(', ').map((techItem, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded bg-slate-700/70 text-gray-300 text-[0.7rem] sm:text-xs border border-slate-600"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4">
              <a
                title={`github link to ${currentProject.shortName}`}
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-900 text-white text-xs sm:text-sm font-medium hover:bg-black transition-all duration-200 shadow hover:shadow-md"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                View Code
              </a>
            </div>
          </div>
          
          {/* Right side - description */}
          <div className="lg:w-1/2 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-slate-700 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <h4 className="text-xs sm:text-sm font-semibold text-sky-300 mb-2 sm:mb-3 flex justify-between items-center">
              <span>Key Features & Achievements:</span>
            </h4>
            
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-[0.75rem] sm:text-sm">
              {currentProject.description.map((desc, i) => (
                <li key={i} className="flex items-start">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 mr-1.5 mt-0.5 flex-shrink-0"
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
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Projects;