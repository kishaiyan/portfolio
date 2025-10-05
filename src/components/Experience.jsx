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
      id: "Lendigroup",
      company: "Lendi group",
      location:"Sydney",
      role: "Software Engineer",
      period: "September 2025 – Present",
      teamSize: "12-person dev team",
      contributions: [],
      tech:"React, Node.js, AWS, NestJS, PostgreSQL, BuildKite, LaunchDarkly, Auth0",
      teamRole: "Full Stack Developer",
      collaboration:"Cross-functional teams",
      impact:"Ongoing contributions"
    },
    {
      id: "expertease",
      company: "ExpertEase AI",
      location: "South Australia",
      role: "Full Stack Developer",
      period: "January 2025 – September 2025",
      teamSize: "8-person dev team",
      contributions: [
        "Built and maintained high-performance frontends using React and Next.js, integrated with custom Node.js and Django/Python APIs, Shopify storefronts, and Dynamics 365/CRM systems via REST and GraphQL, improving data flow and customer experience.",
        "Led cloud migration from AWS to Azure, optimizing CDN and cost management, and deploying CI/CD pipelines that reduced release cycles by 50% while lowering expenses by 30%.",
        "Architected and implemented tools for a Retrieval-Augmented Generation (RAG) system, enhancing AI-driven knowledge retrieval and system scalability.",
        "Enforced best practices in code reviews, SEO, accessibility, and site performance, ensuring maintainable and future-ready applications."
      ],
      tech: "React, Next.js, Node.js, Django, Python, REST, GraphQL, AWS, Azure, CI/CD, Shopify, Dynamics 365",
      teamRole: "Technical Lead",
      collaboration: "Cross-functional teams",
      impact: "50% faster releases, 30% cost reduction"
    },
    {
      id: "aiml",
      company: "Australian Institute of Machine Learning",
      location: "Adelaide",
      role: "Software Developer Intern",
      period: "August 2024 – December 2024",
      teamSize: "12-person research team",
      contributions: [
        "Deployed scalable APIs with FastAPI, integrating them with mobile frontends to deliver real-time, seamless user experiences.",
        "Debugged and resolved complex deployment and compatibility issues across multi-cloud environments, ensuring high availability and stable performance.",
        "Developed a disease classification model using Detectron2 (Meta) on public datasets, achieving 91% accuracy, and deployed it within a fully functional Flutter mobile app.",
        "Enhanced user interaction by connecting the app's custom model to ChatGPT, enabling a conversational mode for disease insights and recommendations."
      ],
      tech: "FastAPI, Flutter, Detectron2, Python, ChatGPT, Multi-cloud, React, Mobile Development",
      teamRole: "Research Developer",
      collaboration: "ML researchers & mobile team",
      impact: "91% model accuracy, real-time deployment"
    },
    {
      id: "teem",
      company: "Teem Consulting Ltd",
      location: "Dubai",
      role: "Software Developer",
      period: "July 2019 – December 2021",
      teamSize: "6-person dev team",
      contributions: [
        "Delivered full-stack e-commerce solutions with secure payment integrations, React-based dashboards, and mobile-friendly designs, enhancing user experience and engagement.",
        "Built and maintained Java backend services and REST APIs with database integration, supporting scalable and secure business applications.",
        "Developed internal automation and reporting tools that streamlined workflows and improved team collaboration and productivity."
      ],
      tech: "Java, React, REST APIs, Payment Gateways, E-commerce, Backend Services, Automation Tools",
      teamRole: "Full Stack Developer",
      collaboration: "Product & design teams",
      impact: "Enhanced UX, improved team productivity"
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
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8  text-gray-100  flex flex-col"
    >
      {/* Team Collaboration Header */}
      <div className="text-center mb-8">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-green-400">
            Team
          </span>
          <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-sky-400 ml-2">
            Contributions
          </span>
        </h2>
        <p className="text-gray-400 text-lg">Professional Development Experience</p>

      </div>

      {/* Team/Company Selector */}
      <div className="flex justify-center mb-8 ">
        <div className="flex gap-2 p-2 bg-gray-800/30 rounded-lg border border-gray-700/50">
          {experienceData.map((experience, index) => (
            <button
              title={`${experience.company} team experience`}
              key={experience.id}
              onClick={() => setActiveExperience(index)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeExperience === index
                ? 'bg-gray-700 text-white border border-gray-600'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
            >
              {experience.company}
            </button>
          ))}
        </div>
      </div>

      {/* Team Collaboration Dashboard */}
      <main
        ref={experienceContentRef}
        className="relative rounded-3xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 hover:from-white/10 hover:via-white/15 hover:to-white/10 overflow-hidden flex flex-col opacity-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Inner glass reflection */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        {/* Team Header */}
        <div className="relative z-10 border-b border-cyan-400/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                {currentExperience.company.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {currentExperience.role}
                </h3>
                <p className="text-gray-300 font-medium">
                  {currentExperience.company} • {currentExperience.location}
                </p>
                <p className="text-gray-400 text-sm">
                  {currentExperience.period}
                </p>
              </div>
            </div>

            {/* Team Info */}
            <div className="text-right">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/30">
                <div className="text-sm text-gray-400 mb-1">Team Size</div>
                <div className="text-lg font-bold text-white">{currentExperience.teamSize}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-full relative z-10">
          {/* Left Panel - Team Collaboration Info */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            {/* Role & Collaboration */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Team Collaboration
              </h4>

              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <div className="font-semibold text-white">Position</div>
                      <div className="text-gray-300">{currentExperience.teamRole}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <div className="font-semibold text-white">Collaboration</div>
                      <div className="text-gray-300">{currentExperience.collaboration}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <div className="font-semibold text-white">Achievements</div>
                      <div className="text-gray-300">{currentExperience.impact}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies Stack */}
            <div className="mb-auto">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentExperience?.tech?.split(', ').map((techItem, i) => (
                  <span
                    key={i}
                    className="px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm text-gray-300 text-sm border border-gray-600/30 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Metrics */}
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-cyan-400/30">
              <h5 className="text-sm font-semibold text-white mb-3 text-center">Performance Metrics</h5>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-white">
                    {currentExperience.id === 'expertease' ? '50%' :
                      currentExperience.id === 'aiml' ? '91%' : '100%'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {currentExperience.id === 'expertease' ? 'Faster Releases' :
                      currentExperience.id === 'aiml' ? 'Model Accuracy' : 'Project Success'}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">
                    {currentExperience.id === 'expertease' ? '30%' :
                      currentExperience.id === 'aiml' ? '100%' : '95%'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {currentExperience.id === 'expertease' ? 'Cost Reduction' :
                      currentExperience.id === 'aiml' ? 'Deployment Success' : 'Team Satisfaction'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Contributions */}
          <div className="lg:w-1/2 p-6 border-t lg:border-t-0 lg:border-l border-cyan-400/30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              Key Contributions
            </h4>

            <div className="space-y-4">
              {currentExperience?.contributions?.map((contribution, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {contribution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Collaboration Highlights */}
            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-cyan-400/30">
              <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                Professional Highlights
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-cyan-400/60 rounded-full"></span>
                  Cross-functional team leadership
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-cyan-400/60 rounded-full"></span>
                  Code reviews & technical mentoring
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-cyan-400/60 rounded-full"></span>
                  Agile & DevOps implementation
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-cyan-400/60 rounded-full"></span>
                  Technical presentations & training
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Experience;