import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Reset refs on re-render
  cardRefs.current = [];

  // Skills organized by sports disciplines - each representing different tech areas
  const skillsData = [
    {
      title: "Sprint (Running)",
      subtitle: "Core Programming - Speed & Fundamentals",
      sport: "🏃‍♂️",
      skills: [
        { name: "Java", level: 90, years: 3, position: "Sprinter" },
        { name: "Python", level: 95, years: 3, position: "Marathon Runner" },
        { name: "JavaScript", level: 95, years: 3, position: "Speed Demon" },
        { name: "TypeScript", level: 85, years: 2, position: "Technical Runner" },
        { name: "HTML/CSS", level: 90, years: 3, position: "Foundation Runner" }
      ],
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      field: "🏃‍♂️ Track & Field",
      teamColor: "Red Lightning"
    },
    {
      title: "Basketball",
      subtitle: "Frontend Development - Teamwork & Strategy",
      sport: "🏀",
      skills: [
        { name: "React", level: 95, years: 3, position: "Point Guard" },
        { name: "Next.js", level: 85, years: 2, position: "Shooting Guard" },
        { name: "Tailwind CSS", level: 90, years: 2, position: "Small Forward" },
        { name: "Performance Optimization", level: 80, years: 2, position: "Power Forward" },
        { name: "Accessibility", level: 75, years: 1, position: "Center" }
      ],
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      field: "🏀 Basketball Court",
      teamColor: "Golden State"
    },
    {
      title: "Cricket",
      subtitle: "Backend Development - Strategy & Endurance",
      sport: "🏏",
      skills: [
        { name: "Node.js", level: 90, years: 3, position: "Captain" },
        { name: "NestJS", level: 80, years: 2, position: "All-rounder" },
        { name: "REST APIs", level: 95, years: 3, position: "Fast Bowler" },
        { name: "GraphQL", level: 75, years: 1, position: "Spin Bowler" },
        { name: "Serverless", level: 80, years: 2, position: "Wicket Keeper" }
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      field: "🏏 Cricket Ground",
      teamColor: "Emerald Eagles"
    },
    {
      title: "Badminton",
      subtitle: "Cloud & DevOps - Precision & Agility",
      sport: "🏸",
      skills: [
        { name: "AWS", level: 85, years: 2, position: "Singles Player" },
        { name: "Azure", level: 90, years: 3, position: "Doubles Expert" },
        { name: "Docker", level: 80, years: 2, position: "Net Player" },
        { name: "CI/CD", level: 85, years: 2, position: "Baseline Player" }
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      field: "🏸 Badminton Court",
      teamColor: "Sky Shuttlers"
    },
    {
      title: "Football",
      subtitle: "Integration & Tools - Team Coordination",
      sport: "⚽",
      skills: [
        { name: "Dynamics 365", level: 80, years: 2, position: "Midfielder" },
        { name: "Payment Gateways", level: 85, years: 2, position: "Striker" },
        { name: "Firebase", level: 90, years: 3, position: "Goalkeeper" },
        { name: "MongoDB", level: 85, years: 2, position: "Defender" },
        { name: "WebSocket/Socket.io", level: 80, years: 2, position: "Winger" }
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      field: "⚽ Football Pitch",
      teamColor: "Purple United"
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
      className="pb-20 sm:py-5 px-4 sm:px-6 lg:px-8  text-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Sports Complex Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
          >
            <span className="title-word text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-green-400">
              SKILLS
            </span>
            <span className="title-word text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-sky-400 ml-4">
              ACADEMY
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">Multi-Sport Training Academy</p>

          
        </div>

        {/* Sports Selection Menu */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="flex gap-2 p-2 bg-gray-800/30 rounded-lg border border-gray-700/50">
            {skillsData.map((sport, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === index
                  ? `bg-gray-700 text-white border border-gray-600`
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }`}
              >
                {sport.title}
              </button>
            ))}
          </div>
        </div>

        {/* Athletic Performance Arena */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={addToRefs}
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
            {/* Sport Header - Minimal & Clean */}
            <div className="text-center mb-10 relative z-10">
              <h3 className={`text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${skillsData[selectedCategory].color}`}>
                {skillsData[selectedCategory].title}
              </h3>
              <p className="text-gray-300">{skillsData[selectedCategory].subtitle}</p>
            </div>

            {/* Player Roster - Skills as Athletes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 relative z-10">
              {skillsData[selectedCategory].skills.map((skill, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <h4 className="text-white font-semibold text-lg">{skill.name}</h4>
                  <p className="text-sm text-gray-300 mt-1">{skill.position}</p>
                </div>
              ))}
            </div>

            {/* Championship Stats */}
            <div className="flex justify-center gap-8 pt-6 border-t border-cyan-400/30 relative z-10">
              <div className="text-center">
                <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${skillsData[selectedCategory].color}`}>
                  {skillsData[selectedCategory].skills.length}
                </div>
                <div className="text-xs text-gray-300">Skills</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${skillsData[selectedCategory].color}`}>
                  {Math.max(...skillsData[selectedCategory].skills.map(s => s.years))}
                </div>
                <div className="text-xs text-gray-300">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;