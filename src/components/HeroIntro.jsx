import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myselfImage from "../assets/myself.jpeg";

gsap.registerPlugin(ScrollTrigger);

const HeroIntro = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textContentRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Animate the main section title
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelector("h2"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate the image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, x: -50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate the text content
    if (textContentRef.current) {
      gsap.fromTo(
        textContentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate the buttons
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8 text-gray-100 overflow-hidden relative"
    >
      {/* Main Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 sm:mb-8 tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-green-400">
          Innovate.
        </span>
        <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-sky-400 mt-1 sm:mt-0 sm:ml-3">
          Build. Transform.
        </span>
      </h2>

      {/* Content Container */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8">
          {/* Circular Image with enhanced styling */}
          <div ref={imageRef} className="flex-shrink-0 mb-6 lg:mb-0 group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-green-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img
                src={myselfImage}
                alt="Picture of a developer"
                className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-slate-700 shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/300x300/2D3748/E2E8F0?text=Image+Error&font=Inter";
                }}
              />
            </div>
          </div>

          {/* Paragraph and Buttons Section */}
          <div className="flex flex-col items-center lg:items-start w-full max-w-3xl">
            <div
              ref={textContentRef}
              className="bg-slate-800/70 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-2xl border border-sky-500/30 w-full"
            >
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                👋 Hi, I'm <span className="text-sky-400 font-semibold">Kishan Thangaraj</span> — a full-stack developer by day, AI whisperer by night 🌙, and part-time debugger of life's infinite loop 🔁. Whether I'm wiring up sleek React frontends ⚛️, crafting Python backends 🐍 that don't throw exceptions (unless intended 😏), or fine-tuning machine learning models 🤖 to spot sick plants 🌿 before they call in sick — I build with purpose and a passion for impact 💥.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center lg:text-left mt-3">
                From deploying cloud-native apps ☁️ on AWS and Azure, to building bill-splitting apps 💸 smart enough to spot that one roommate who never pays on time 😅 (you know the one), my code lives where innovation meets intuition 🧠✨.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center lg:text-left mt-3">
                Armed with a patent 🧾 in public tech, a radar for efficiency 📡, and a love for tools like LangChain 🔗, FastAPI ⚡, and Flutter 🦋 — I don't just write code. I engineer experiences 🎨, automate the boring stuff 🛠️, and push pixels and algorithms to their limits 🚀.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center lg:text-left mt-3">
                So whether it's a voting system that can't be hacked 🗳️🔐, or a plant doctor in your pocket 🌱📱 — let's build something extraordinary (and unit-tested ✅).
              </p>
            </div>

            {/* Buttons with glassy styling */}
            <div
              ref={buttonsRef}
              className="mt-4 flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
            >
              <a
                title="contact me via mail"
                href="mailto:kishaiyanthangaraj@gmail.com"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-green-500/20 backdrop-blur-lg border border-cyan-400/30 text-white text-sm sm:text-base font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 text-center"
              >
                📬 Contact Me
              </a>
              <a
                title="Connect me via github"
                href="https://github.com/kishaiyan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-green-500/10 backdrop-blur-lg border border-cyan-400/30 text-white text-sm sm:text-base font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 text-center"
              >
                🐙 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default HeroIntro;