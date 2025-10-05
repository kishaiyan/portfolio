import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myselfImage from "../assets/myself.jpeg";

gsap.registerPlugin(ScrollTrigger);

const HeroIntro = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Stats data
  const stats = [
    { number: "3+", label: "Years", icon: "🚀" },
    { number: "20+", label: "Projects", icon: "💼" },
    { number: "3", label: "Clouds", icon: "☁️" },
    { number: "1", label: "Patent", icon: "🏆" },
  ];

  const techStack = ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript', 'MongoDB', 'FastAPI', 'Flutter'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single card animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate stats with stagger
      const statElements = cardRef.current.querySelectorAll('.stat-item');
      gsap.fromTo(
        statElements,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-gray-100 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Glassy Main Card */}
        <div
          ref={cardRef}
          className="relative rounded-3xl p-6 sm:p-8 lg:p-10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 hover:from-white/10 hover:via-white/15 hover:to-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Inner glass reflection */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

          {/* NEWSPAPER HEADER */}
          <div className="border-b-2 border-cyan-400/30 pb-6 mb-8">
            {/* Newspaper Masthead */}
            <div className="text-center mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 tracking-wider mb-1">
                THE DEVELOPER HERALD
              </h1>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-2">
                <span>Adelaide, Australia</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>•</span>
                <span>Portfolio Edition</span>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-green-400">
                Local Developer Revolutionizes AI-Powered Solutions
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-center text-lg text-gray-300 font-medium mb-2">
              Lendi Group Engineer Patents Breakthrough Technology, Delivers 20+ Scalable Applications
            </p>

            {/* Byline */}
            <div className="text-center text-sm text-gray-400">
              <span>By </span>
              <span className="text-cyan-400 font-semibold">Tech Correspondent</span>
              <span> | Full-Stack Developer • AI Engineer • Cloud Architect</span>
            </div>
          </div>

          {/* NEWSPAPER ARTICLE LAYOUT */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN - Photo & Caption */}
            <div className="lg:col-span-1">
              {/* Newspaper Photo */}
              <div className="border-2 border-gray-600/50 p-2 bg-gray-800/30 mb-4">
                <div className="relative group">
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-slate-800 image-loading"></div>
                    )}
                    <img
                      src={myselfImage}
                      alt="Kishaiyan Thangaraj at work"
                      className={`w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/300x300/2D3748/E2E8F0?text=KT&font=Inter";
                        setImageLoaded(true);
                      }}
                    />
                  </div>
                </div>

                {/* Photo Caption */}
                <div className="mt-2 p-2 bg-gray-900/50 border-t border-gray-600/30">
                  <p className="text-xs text-gray-400 italic text-center">
                    Kishaiyan Thangaraj, Full-Stack Developer and AI Engineer, working on breakthrough solutions at Lendi Group headquaters in Sydney.
                  </p>
                </div>
              </div>

              {/* Contact Information Box */}
              <div className="border-2 border-cyan-400/30 p-4 bg-cyan-500/5">
                <h4 className="text-sm font-bold text-cyan-400 mb-3 text-center border-b border-cyan-400/30 pb-2">
                  CONNECT WITH THE DEVELOPER
                </h4>
                <div className="flex justify-center gap-3">
                  {/* Email */}
                  <a
                    title="Contact via email"
                    href="mailto:kishaiyanthangaraj@gmail.com"
                    className="p-2 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    title="View GitHub"
                    href="https://github.com/kishaiyan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-400/30 text-gray-300 hover:bg-gray-400/10 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    title="LinkedIn"
                    href="https://linkedin.com/in/kishaiyanthangaraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-blue-400/30 text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>

                  {/* Download Resume */}
                  <a
                    href="/portfolio/19-8-2025_RESUME.pdf"
                    download="Kishan_Thangaraj_Resume.pdf"
                    title="Download Resume"
                    className="p-2 border border-green-400/30 text-green-400 hover:bg-green-400/10 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Stats Box */}
              <div className="mt-4 border border-gray-600/50 p-4 bg-gray-800/20">
                <h4 className="text-sm font-bold text-gray-300 mb-3 text-center border-b border-gray-600/30 pb-2">
                  BY THE NUMBERS
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-2 border border-gray-700/50">
                      <div className="text-lg font-bold text-cyan-400">{stat.number}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Article Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Lead Paragraph */}
              <div className="text-lg leading-relaxed text-justify">
                <span className="float-left text-6xl font-bold text-cyan-400 mr-2 mt-1 leading-none">I</span>
                <p className="text-gray-300">
                  n the rapidly evolving landscape of artificial intelligence and cloud computing, few developers have made as significant an impact as <span className="font-semibold text-cyan-400">Kishaiyan Thangaraj</span>. This Adelaide-based full-stack developer has quietly revolutionized how businesses approach scalable web applications and AI-powered solutions.
                </p>
              </div>

              {/* Article Body */}
              <div className="space-y-4 text-gray-300 leading-relaxed columns-1 lg:columns-2 gap-8">
                <p className="break-inside-avoid text-justify">
                  With over three years of hands-on experience, Thangaraj has established himself as a formidable force in the technology sector. His expertise spans the entire development stack, from crafting intuitive React frontends to architecting robust Node.js and Python backends, all seamlessly deployed on cloud infrastructure that scales with demand.
                </p>

                <p className="break-inside-avoid text-justify">
                  "From architecting microservices with PostgreSQL databases to containerizing applications with Docker, I thrive on solving complex problems with elegant code," Thangaraj explains. His technical arsenal includes modern JavaScript frameworks, cloud platforms including AWS and Azure, and cutting-edge AI technologies such as LangChain and machine learning models.
                </p>

                <p className="break-inside-avoid text-justify">
                  Currently serving as a key developer at <span className="font-semibold text-green-400">Lendi Group</span>, Thangaraj has successfully delivered over 20 projects ranging from mobile applications to enterprise-grade systems. His work has not gone unnoticed in the industry, having been awarded a patent in public technology—a testament to his innovative approach to problem-solving.
                </p>

                <p className="break-inside-avoid text-justify">
                  "I don't just write code—I engineer solutions that make a difference," he states with conviction. This philosophy has driven him to push both pixels and algorithms to their limits, creating applications that are not only functional but transformative.
                </p>

                <p className="break-inside-avoid text-justify">
                  Beyond the technical realm, Thangaraj draws inspiration from his diverse interests. A passionate reader of newspapers who stays informed about global developments, he brings this analytical mindset to his coding practice. His love for sports—from the strategic thinking of cricket to the teamwork of football—translates into his collaborative approach to software development.
                </p>

                <p className="break-inside-avoid text-justify">
                  "This portfolio itself reflects who I am," Thangaraj explains. "The newspaper layout honors my daily ritual of staying informed, the sports-themed skills section celebrates my athletic interests, and the team collaboration focus in my experience showcases my belief that great software is built together, not in isolation."
                </p>
              </div>

              {/* Technology Stack Section */}
              <div className="border-t-2 border-gray-600/30 pt-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4 border-b border-cyan-400/30 pb-2">
                  TECHNICAL EXPERTISE
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {techStack.map((tech, index) => (
                    <div
                      key={tech}
                      className="text-center p-2 border border-gray-600/30 bg-gray-800/20 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-200"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeInUp 0.5s ease-out forwards'
                      }}
                    >
                      <span className="text-xs font-medium text-gray-300">{tech}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 italic text-center">
                  + Extensive experience with many additional technologies and frameworks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;