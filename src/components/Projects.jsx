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
      id: "billsplit",
      name: "Bill-Splitting App — Smart Utility Management",
      shortName: "SplitMateez",
      description: [
        "🏠 Developed a scalable bill-splitting app for shared accommodations, enabling real-time utility consumption tracking, fair cost distribution, and integrated features such as push notifications, payment gateway, unauthorized access alerts, and issue reporting.",
        "🤖 Implemented LangChain agents for automated report generation and anomaly detection, leveraging a CSV agent to efficiently identify usage discrepancies and generate insights.",
        "☁️ Architected a full AWS cloud stack with DynamoDB, Amplify, SNS, S3 Buckets, and Rekognition, ensuring scalability, reliability, and secure data processing for thousands of users."
      ],
      tech: "AWS Cloud, LangChain, React Native, DynamoDB, Amplify, SNS, S3, Rekognition, Payment Gateway",
      github: "https://github.com/kishaiyan/splitmateez.git",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
      category: "Mobile App",
      status: "Production",
      highlights: ["Real-time Tracking", "AI-Powered Analytics", "Cloud Architecture"]
    },
    {
      id: "cropsense",
      name: "CropSense — Intelligent Crop Monitoring App",
      shortName: "CropSense AI",
      description: [
        "📱 Built a comprehensive mobile app with Firebase/Auth0 authentication and JWT tokens, featuring real-time chat using Socket.io and WebSockets, integrated with ChatGPT for AI-driven conversational support.",
        "🌱 Implemented advanced image classification with Transfer Learning (Swin Transformer) to detect and analyze crop health from user-uploaded images with 91% accuracy.",
        "🔒 Strengthened application and API security through data encryption, biometric authentication (fingerprint/face recognition), and secure storage using SecureStore, Keychain, and Keystore."
      ],
      tech: "AWS Cloud, FastAPI, Detectron2, Flutter, Firebase, Auth0, JWT, Socket.io, WebSockets, ChatGPT, Swin Transformer",
      github: "https://github.com/kishaiyan/Cropsense_.git",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop&crop=center",
      category: "AI/ML App",
      status: "Beta",
      highlights: ["91% Accuracy", "Real-time Chat", "Biometric Security"]
    },
    {
      id: "securevote",
      name: "Electronic Voting System — Secure Digital Democracy",
      shortName: "SecureVote",
      description: [
        "🗳️ Developed a secure electronic voting system following Microsoft Secured by Design principles, implementing multi-factor authentication, encrypted data storage, and detailed user activity logging.",
        "🔐 Conducted comprehensive penetration testing and security audits to ensure industry-standard compliance and protect against vulnerabilities, achieving zero critical security issues.",
        "📊 Built real-time vote tracking and analytics dashboard with end-to-end encryption ensuring voter privacy while maintaining transparency."
      ],
      tech: "React, Firebase, GCP, Multi-factor Authentication, Encryption, Security Auditing, Real-time Analytics",
      github: "https://github.com/kishaiyan/electronic-voting-system.git",
      image: "https://images.unsplash.com/photo-1495592822108-9e6261896da8?w=600&h=400&fit=crop&crop=center",
      category: "Security System",
      status: "Completed",
      highlights: ["Zero Security Issues", "End-to-End Encryption", "Real-time Analytics"]
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
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8  text-gray-100 h-screen flex flex-col font-mono"
    >
      {/* IDE-Style Header */}
      <div className="mb-6">
        {/* IDE Menu Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400">Kishaiyan's Portfolio - Projects</span>
          </div>
          <div className="text-gray-500 text-xs">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* File Tabs */}
        <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto">
          {projectsData.map((project, index) => (
            <button
              title={`${project.shortName} tab`}
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`px-4 py-2 text-sm border-r border-gray-700 flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${activeProject === index
                ? 'bg-gray-900 text-green-400 border-b-2 border-green-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-750'
                }`}
            >
              <span className="text-xs">📁</span>
              {project.shortName}
              {activeProject === index && <span className="text-xs">●</span>}
            </button>
          ))}
        </div>
      </div>

      {/* IDE-Style Code Editor */}
      <main
        ref={projectContentRef}
        className="w-full flex-grow bg-gray-900 border border-gray-700 overflow-hidden flex flex-col opacity-0"
      >
        <div className="flex h-full">
          {/* Left Sidebar - File Explorer */}
          <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Explorer Header */}
            <div className="px-4 py-2 bg-gray-750 border-b border-gray-700 text-sm font-semibold text-gray-300">
              📁 PROJECT EXPLORER
            </div>

            {/* Project Structure */}
            <div className="p-3 text-sm text-gray-300 flex-1 overflow-y-auto">
              <div className="space-y-1">
                <div className="text-green-400 font-semibold mb-2">
                  📂 {currentProject.shortName}/
                </div>

                {/* Project Files */}
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-2 text-blue-400">
                    <span>📄</span> README.md
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <span>📄</span> package.json
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>📂</span> src/
                  </div>
                  <div className="ml-4 space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span>📄</span> App.jsx
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <span>📄</span> components/
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-orange-400">
                    <span>📄</span> .env
                  </div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="mt-6 p-3 bg-gray-900 rounded border border-gray-600">
                <div className="text-xs text-gray-400 mb-2">PROJECT STATS</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`${currentProject.status === 'Production' ? 'text-green-400' :
                      currentProject.status === 'Beta' ? 'text-yellow-400' : 'text-blue-400'
                      }`}>
                      {currentProject.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-cyan-400">{currentProject.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lines:</span>
                    <span className="text-green-400">
                      {currentProject.id === 'billsplit' ? '15,420' :
                        currentProject.id === 'cropsense' ? '12,850' : '8,930'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-600">
                <div className="text-xs text-gray-400 mb-2">DEPENDENCIES</div>
                <div className="space-y-1 text-xs">
                  {currentProject.tech.split(', ').slice(0, 5).map((tech, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-gray-300">{tech}</span>
                    </div>
                  ))}
                  {currentProject.tech.split(', ').length > 5 && (
                    <div className="text-gray-500 text-xs">
                      +{currentProject.tech.split(', ').length - 5} more...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Code Area */}
          <div className="flex-1 flex flex-col">
            {/* Code Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">📄 {currentProject.shortName}.jsx</span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-green-400">Saved</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>UTF-8</span>
                <span>JavaScript</span>
                <span>Ln 1, Col 1</span>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 flex">
              {/* Line Numbers */}
              <div className="w-12 bg-gray-850 border-r border-gray-700 text-right text-xs text-gray-500 py-4">
                {Array.from({ length: 25 }, (_, i) => (
                  <div key={i} className="px-2 leading-6">{i + 1}</div>
                ))}
              </div>

              {/* Code Editor */}
              <div className="flex-1 p-4 bg-gray-900 overflow-y-auto text-sm font-mono">
                <div className="space-y-1">
                  <div><span className="text-purple-400">import</span> <span className="text-cyan-400">React</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</div>
                  <div><span className="text-purple-400">import</span> <span className="text-cyan-400">{'{'}</span> <span className="text-yellow-400">useState, useEffect</span> <span className="text-cyan-400">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</div>
                  <div></div>
                  <div><span className="text-gray-500">// {currentProject.name}</span></div>
                  <div><span className="text-purple-400">const</span> <span className="text-yellow-400">{currentProject.shortName}</span> <span className="text-cyan-400">=</span> <span className="text-cyan-400">()</span> <span className="text-cyan-400">=></span> <span className="text-cyan-400">{'{'}</span></div>
                  <div className="ml-4"><span className="text-purple-400">const</span> <span className="text-yellow-400">[data, setData]</span> <span className="text-cyan-400">=</span> <span className="text-yellow-400">useState</span><span className="text-cyan-400">(</span><span className="text-orange-400">null</span><span className="text-cyan-400">)</span>;</div>
                  <div></div>
                  <div className="ml-4"><span className="text-gray-500">// Key Features:</span></div>
                  {currentProject.highlights.map((highlight, i) => (
                    <div key={i} className="ml-4">
                      <span className="text-gray-500">// ✓ {highlight}</span>
                    </div>
                  ))}
                  <div></div>
                  <div className="ml-4"><span className="text-purple-400">useEffect</span><span className="text-cyan-400">(()</span> <span className="text-cyan-400">=></span> <span className="text-cyan-400">{'{'}</span></div>
                  <div className="ml-8"><span className="text-gray-500">// Initialize project components</span></div>
                  <div className="ml-8"><span className="text-yellow-400">initializeApp</span><span className="text-cyan-400">()</span>;</div>
                  <div className="ml-4"><span className="text-cyan-400">{'}'}, [])</span>;</div>
                  <div></div>
                  <div className="ml-4"><span className="text-purple-400">return</span> <span className="text-cyan-400">(</span></div>
                  <div className="ml-8"><span className="text-red-400">&lt;div</span> <span className="text-yellow-400">className</span><span className="text-cyan-400">=</span><span className="text-green-400">"app-container"</span><span className="text-red-400">&gt;</span></div>
                  <div className="ml-12"><span className="text-red-400">&lt;h1&gt;</span><span className="text-white">{currentProject.shortName}</span><span className="text-red-400">&lt;/h1&gt;</span></div>
                  <div className="ml-12"><span className="text-gray-500">// Project implementation here...</span></div>
                  <div className="ml-8"><span className="text-red-400">&lt;/div&gt;</span></div>
                  <div className="ml-4"><span className="text-cyan-400">)</span>;</div>
                  <div><span className="text-cyan-400">{'}'}</span>;</div>
                  <div></div>
                  <div><span className="text-purple-400">export</span> <span className="text-purple-400">default</span> <span className="text-yellow-400">{currentProject.shortName}</span>;</div>
                </div>
              </div>
            </div>

            {/* Terminal/Output Panel */}
            <div className="h-48 bg-black border-t border-gray-700 flex flex-col">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-4 text-sm">
                <button className="text-green-400 font-semibold">TERMINAL</button>
                <button className="text-gray-400">PROBLEMS</button>
                <button className="text-gray-400">OUTPUT</button>
                <button className="text-gray-400">DEBUG CONSOLE</button>
              </div>

              <div className="flex-1 p-4 font-mono text-sm text-green-400 overflow-y-auto">
                <div className="space-y-1">
                  <div><span className="text-gray-500">kishaiyan@portfolio:~/{currentProject.shortName.toLowerCase()}$</span> npm start</div>
                  <div className="text-cyan-400">Starting development server...</div>
                  <div className="text-green-400">✓ Compiled successfully!</div>
                  <div className="text-yellow-400">⚡ Hot reload enabled</div>
                  <div className="text-blue-400">🚀 Server running on http://localhost:3000</div>
                  <div></div>
                  <div className="text-gray-400">Project Stats:</div>
                  <div className="text-gray-300">• Status: <span className="text-green-400">{currentProject.status}</span></div>
                  <div className="text-gray-300">• Performance: <span className="text-green-400">
                    {currentProject.id === 'cropsense' ? '91% accuracy' :
                      currentProject.id === 'securevote' ? '100% security score' : '95% uptime'}
                  </span></div>
                  <div className="text-gray-300">• Users: <span className="text-cyan-400">
                    {currentProject.id === 'billsplit' ? '1000+' :
                      currentProject.id === 'cropsense' ? '500+ farmers' : '50+ institutions'}
                  </span></div>
                  <div></div>
                  <div className="flex items-center gap-4">
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      📂 View Repository
                    </a>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400">🔧 Built with {currentProject.tech.split(', ').slice(0, 3).join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Projects;