import { useRef,useEffect } from "react";
import gsap from "gsap";

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  const experienceData = [
    {
      company: "ExpertEase AI, South Australia",
      role: "Full Stack Developer",
      period: "January 2025 – Present",
      achievements: [
        "Architected and implemented an enterprise-grade Retrieval Augmented Generation (RAG) pipeline, enhancing knowledge retrieval accuracy by 30% and reducing query processing time by 40%.",
        "Led the successful migration of mission-critical databases between EC2 instances, ensuring zero downtime through meticulous planning, comprehensive testing, and staged deployment strategies.",
        "Optimized CI/CD workflows by implementing containerization and infrastructure-as-code practices, reducing deployment time by 50% and improving system reliability with automated testing.",
        "Spearheaded the implementation of observability solutions using BetterStack and Langfuse, resulting in 25% faster issue resolution and enhanced system performance monitoring."
      ],
      tech: "Python, React, AWS , Lambda, S3, MySQL, Qdrant, FastAPI, Docker, BetterStack, Langfuse"
    },
    {
      company: "Australian Institute of Machine Learning, Adelaide",
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
      company: "Teem Consulting Ltd, Dubai",
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
      company: "TK Maxx, West Lakes, South Australia",
      role: "Retail Team Lead (Part-Time)",
      period: "August 2023 – Present",
      achievements: [
        "Direct operations during peak business hours, supervising a team of 5-7 associates and optimizing workflow processes to increase customer throughput by 20% while maintaining quality service.",
        "Developed and implemented staff training programs that improved new employee onboarding efficiency by 30% and reduced training time by two days.",
        "Streamlined inventory management procedures, reducing stockroom processing time by 15% and improving merchandise flow to the sales floor."
      ],
      tech: ""
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="mb-16 pt-16">
      <h2 className="text-5xl font-bold text-cyan-400 mb-8">Professional Experience</h2>
      <div className="space-y-8">
        {experienceData.map((job, index) => (
          <div
            key={index}
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-500 border border-cyan-500/30 group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cyan-400 group-hover:translate-x-2 transition-transform duration-300">{job.role}</h3>
              <p className="text-gray-400 text-lg">{job.period}</p>
            </div>
            <p className="text-gray-300 text-lg mb-4">{job.company}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-teal-400 mb-2">Key Accomplishments:</h4>
              <ul className="space-y-2 text-gray-300">
                {job.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {job.tech && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-teal-400 mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.tech.split(', ').map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-gray-700/50 text-sm text-gray-300 border border-cyan-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
export default Experience;