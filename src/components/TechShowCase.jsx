import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechShowcase = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  const techCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "Next.js", level: 90, icon: "▲" },
        { name: "TypeScript", level: 88, icon: "📘" },
        { name: "Tailwind CSS", level: 92, icon: "🎨" },
        { name: "Flutter", level: 85, icon: "🦋" },
      ]
    },
    {
      title: "Backend",
      icon: "⚙️",
      color: "from-green-500 to-teal-500",
      technologies: [
        { name: "Python", level: 95, icon: "🐍" },
        { name: "Node.js", level: 88, icon: "🟢" },
        { name: "FastAPI", level: 92, icon: "⚡" },
        { name: "Django", level: 85, icon: "🎸" },
        { name: "Java", level: 80, icon: "☕" },
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      color: "from-purple-500 to-pink-500",
      technologies: [
        { name: "AWS", level: 90, icon: "🟠" },
        { name: "Azure", level: 88, icon: "🔵" },
        { name: "Docker", level: 85, icon: "🐳" },
        { name: "Kubernetes", level: 75, icon: "⚓" },
        { name: "CI/CD", level: 88, icon: "🔄" },
      ]
    },
    {
      title: "AI & Data",
      icon: "🤖",
      color: "from-orange-500 to-red-500",
      technologies: [
        { name: "Machine Learning", level: 90, icon: "🧠" },
        { name: "LangChain", level: 88, icon: "🔗" },
        { name: "TensorFlow", level: 82, icon: "🔥" },
        { name: "PyTorch", level: 80, icon: "🔦" },
        { name: "OpenAI API", level: 92, icon: "🤖" },
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Grid animation
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-showcase"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 text-gray-100 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
            Technology
          </span>
          <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mt-2 sm:mt-0 sm:ml-4 animate-gradient">
            Mastery
          </span>
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-500 group border border-slate-700/50 hover:border-cyan-500/30"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {category.title}
                </h3>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} animate-pulse`}></div>
              </div>

              {/* Technologies List */}
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="relative"
                    onMouseEnter={() => setHoveredTech(`${categoryIndex}-${techIndex}`)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <span className="text-lg">{tech.icon}</span>
                        {tech.name}
                      </span>
                      <span className="text-xs text-cyan-400 font-semibold">
                        {tech.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out ${
                          hoveredTech === `${categoryIndex}-${techIndex}` ? 'animate-pulse' : ''
                        }`}
                        style={{
                          width: `${tech.level}%`,
                          transform: hoveredTech === `${categoryIndex}-${techIndex}` ? 'scaleY(1.2)' : 'scaleY(1)'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Stats */}
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Avg. Proficiency</span>
                  <span className="text-cyan-400 font-semibold">
                    {Math.round(category.technologies.reduce((acc, tech) => acc + tech.level, 0) / category.technologies.length)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Continuously learning and adapting to new technologies. 
            <span className="text-cyan-400 font-semibold"> Always excited to explore emerging tools</span> 
            and frameworks that can solve real-world problems more efficiently.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Learning", "Building", "Innovating", "Growing"].map((word, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium animate-pulse"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;