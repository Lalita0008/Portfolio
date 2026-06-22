import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ExternalLink, ChevronDown, Download, X, Award, Link } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const KaggleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.211 0-.316-.117-.316-.352V.263c0-.211.105-.316.316-.316h2.431c.234 0 .351.105.351.316v15.023l6.091-6.706c.117-.117.258-.176.422-.176h3.115c.164 0 .258.07.281.211.024.141-.023.258-.14.351L11.58 15.07l7.105 8.437c.117.141.164.258.14.352z"/>
  </svg>
);

// --- Neural Network Particles with Mouse Reactivity ---
const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{ x: number, y: number, vx: number, vy: number, size: number }> = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interaction with mouse
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 100) {
          p.x -= dxMouse * 0.01;
          p.y -= dyMouse * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist / 1200})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] z-0 pointer-events-none opacity-50"></div>
    </div>
  );
};

// --- Typewriter Effect Component ---
const Typewriter = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const startTyping = () => {
      timer = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, 100);
    };

    setTimeout(startTyping, delay);

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, [text, delay]);

  return (
    <span>{displayText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span></span>
  );
};

// --- Fade In Component for Scroll Animations ---
const FadeIn = ({ children, delay = 0, yOffset = 30 }: { children: React.ReactNode, delay?: number, yOffset?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Certifications Modal Component ---
const CertificationsModal = ({ isOpen, onClose, certs }: { isOpen: boolean, onClose: () => void, certs: any[] }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 relative border border-white/20 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full p-2"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
            <Award className="text-gray-400" /> All Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certs.map((cert, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-medium mb-2">{cert.title}</h4>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">{cert.date}</p>
                </div>
                <a href={cert.link} target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group">
                  <Link size={14} className="group-hover:rotate-45 transition-transform" /> View Credential
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main App ---
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certifications = [
    { title: "IBM Data Science Orientation Certificate", issuer: "IBM/coursera", date: "March 2026", link: "/certifications/IBM Certificate.pdf"},
    { title: "Gemini Certified Student", issuer: "Google", date: "November 2025", link: "/certifications/gemini.pdf" },
    
  ];

  const skillCategories = [
    {
  title: "Programming/Framworks",
  skills: ["Python", "SQL", "Flask", "FastAPI"]
},
{
  title: "Machine Learning & AI",
  skills: ["Machine Learning", "Artificial Intelligence", "Data Science", "Predictive Modeling" , "Model Training", "NLP", "LLMs", "RAG"]
},
{
  title: "Data Science",
  skills: ["Data Analytics", "Feature Engineering", "Data Preprocessing", "Model Evaluation", "Data Visualization"]
},
{
  title: "Libraries & Tools",
  skills: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "LangChain", "Pinecone", "MySQL", "GitHub", "Jupyter Notebook", "Google Colab", "Claude", "Antigravity"]
}
  ];

  const projects = [
    {
  title: 'CareerPilot AI',
  desc: 'An AI-powered Career Recommendation System that analyzes resumes using NLP and Machine Learning to extract skills, predict suitable career paths, and identify skill gaps. The platform provides personalized career guidance based on user profiles and industry-relevant skill requirements.',
  tech: ['Python', 'Scikit-Learn', 'FastAPI', 'React', 'NLP', 'Pandas'],
  github: 'https://github.com/Lalita0008/CareerPilot',
  link: 'https://ai-career-adviser.netlify.app/',
  image: '/career.png'
},
{
      
  title: 'AI GitHub PR Reviewer',
  desc: 'Built an end-to-end AI Code Review Assistant that integrates with GitHub to analyze Pull Requests using Large Language Models. The system reviews code changes, identifies bugs, suggests optimizations, explains issues, and generates actionable feedback, helping developers improve code quality and accelerate the review process.',
  tech: ['Python', 'FastAPI', 'GitHub API', 'OpenAI API', 'React', 'Streamlit'],
  github: 'https://github.com/Lalita0008/AI_PR_Reviewer',
  link: '#',
  image: '/prreviewer.jpg'
},
    
{
  title: 'GreenLoop',
  desc: 'GreenLoop is an AI-driven sustainability platform currently under development. The project aims to integrate waste analysis, compost recommendations, and plant health monitoring into a unified system. The current version includes a responsive frontend interface, while backend development and Machine Learning model training are in progress.',
  tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'React Router DOM'],
  github: 'https://github.com/Lalita0008/GreenLoop-Frontend',
  link: 'https://greenloop-eco.netlify.app/',
  image: '/greenloop.png'
},

{
  title: 'AI Gardening Chatbot',
  desc: 'Developed an AI-powered gardening assistant specialized in fruits and vegetable cultivation. Implemented Retrieval-Augmented Generation (RAG) using LangChain and Pinecone to provide accurate, context-aware responses from gardening knowledge sources. Integrated OpenAI LLMs for intelligent question answering and built a full-stack web application for interactive user guidance.',
  tech: ['Python', 'Flask', 'LangChain', 'Pinecone', 'OpenAI API', 'HTML', 'CSS'],
  github: 'https://github.com/Lalita0008/Gardening-Chatbot',
  link: '#',
  image: '/garden.png'
},

{
  title: 'Car Evaluation ML Model',
  desc: 'Built an end-to-end Machine Learning classification model using Decision Trees to predict car acceptability based on buying price, maintenance cost, safety, passenger capacity, and other vehicle attributes. Performed data preprocessing, feature engineering, model training, evaluation, and visualization to generate accurate and interpretable predictions.',
  tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Decision Tree', 'Matplotlib', 'Seaborn'],
  github: 'https://github.com/Lalita0008/car-evaluation-ml',
  link: '#',
  image: '/carevaluation.png'
},
  ];

  return (
    <div className="min-h-screen text-primaryText font-sans relative selection:bg-gray-800 selection:text-white">
      <NeuralNetworkBackground />
      
      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b-0 border-x-0 rounded-none bg-opacity-80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-widest text-gradient-silver relative overflow-hidden group"
          >
            PORTFOLIO
            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:animate-shimmer"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-8 text-sm font-medium text-secondaryText"
          >
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 space-y-32">
        
        {/* 1. Hero Section */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center pt-24 relative">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12 md:gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 w-full flex flex-col items-center text-center md:items-start md:text-left"
            >
              <h2 className="text-secondaryText font-mono mb-4 text-sm md:text-base tracking-widest uppercase">
                Hello, I am
              </h2>
              <div className="relative inline-block mb-6 group cursor-default max-w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D9D9D9] to-[#A8A8A8] relative z-10 whitespace-nowrap">
                  LALITA JHAPATE
                </h1>
                <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite] pointer-events-none z-20 mix-blend-overlay"></div>
              </div>
              
              <h3 className="text-2xl md:text-4xl text-gray-400 font-light mb-8 flex items-center justify-center md:justify-start gap-4 min-h-[40px]">
                <Typewriter text="AI/ML Developer" delay={500} />
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="h-[1px] bg-gray-600 block origin-left hidden md:block"
                ></motion.span>
              </h3>
              <p className="max-w-2xl text-secondaryText text-lg leading-relaxed mb-8">
                Architecting intelligent systems and transforming data into actionable insights.
                Specialized in building scalable machine learning models, natural language processing, and bridging the gap between research and production.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                <a href="#contact" className="glass-card hover-glow px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 group">
                  Let's Talk 
                  <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/Resume.pdf" target="_blank" className="border border-white/20 hover:border-white/50 px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10 group">
                  Resume 
                  <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                </a>
              </div>

              {/* Hero Social Links
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="p-2.5 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center">
                  <GithubIcon />
                </a>
                <a href="#" className="p-2.5 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center">
                  <LinkedinIcon />
                </a>
                <a href="#" className="p-2.5 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center">
                  <KaggleIcon />
                </a>
                <a href="mailto:hello@example.com" className="p-2.5 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center">
                  <Mail size={24} />
                </a>
              </div> */}
            </motion.div>

            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="relative w-56 h-56 md:w-80 md:h-80 flex-shrink-0 group mt-10 md:mt-0"
            >
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                {/* Glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-500/20 via-gray-300/40 to-gray-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-[spin_10s_linear_infinite]"></div>
                
                {/* Silver Border & Frame */}
                <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-br from-white via-gray-400 to-[#111111] shadow-[0_0_30px_rgba(217,217,217,0.3)] group-hover:shadow-[0_0_50px_rgba(217,217,217,0.5)] transition-shadow duration-500 relative z-10">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background relative border-4 border-background">
                    <img 
                      src="/profile.jpeg" 
                      alt="Lalita Jhapate" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-125 grayscale-[20%]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 opacity-50 hidden md:block"
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        {/* 2. About Me */}
        <section id="about" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-xl font-mono text-gray-500">01.</span> About Me
              <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-secondaryText leading-relaxed">
                <p>
                  I'm an AI/ML enthusiast who enjoys building projects that solve real-world problems through technology. I have a strong interest in machine learning, artificial intelligence, and software development, and I love turning ideas into working applications.
                </p>
                <p>
                  Over time, I've worked on projects ranging from AI-powered career guidance systems to intelligent code review tools and smart waste management solutions. Every project teaches me something new and helps me grow as a developer.
                  I'm always exploring new technologies, improving my skills, and looking for opportunities to build meaningful solutions that can make a positive impact.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/0 via-gray-400/10 to-gray-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                <pre className="font-mono text-sm text-gray-300 overflow-x-auto relative z-10">
                  <code>
{`const engineer = {
  name: "Lalita Jhapate",
  role: "AI/ML Developer",
  passion: ["Machine/Deep Learning", "Data Science", "AI"],
  focus: "Building Scalable AI",
  status: "Open to Opportunities"
};

engineer.train(neuralNetwork);
engineer.deploy(model);`}
                  </code>
                </pre>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 3. Skills */}
        <section id="skills" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-xl font-mono text-gray-500">02.</span> Technical Arsenal
              <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skillCategories.map((category, idx) => (
                <div key={idx} className="glass-card hover-glow p-8 rounded-2xl transition-all duration-300 border border-white/5 hover:border-white/20">
                  <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">{category.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="glass-card px-4 py-2 rounded-full text-sm font-mono text-gray-300 border border-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-default relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative z-10">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 4. Projects Grid */}
        <section id="projects" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-xl font-mono text-gray-500">03.</span> Projects
              <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 hover-glow transition-all duration-500 border border-white/10 group">
                  <div className="h-48 bg-[#111111] border-b border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none opacity-50 group-hover:opacity-20 transition-opacity"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#D9D9D9] transition-colors">{project.title}</h3>
                    <p className="text-secondaryText text-sm leading-relaxed mb-6 flex-grow">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 font-mono text-xs text-gray-400 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="bg-white/5 px-2.5 py-1 rounded-full border border-white/5">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      {project.github && (
                        <a href={project.github} className="text-gray-400 hover:text-white transition-colors" title="GitHub Repository">
                          <div className="w-5 h-5"><GithubIcon /></div>
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} className="text-gray-400 hover:text-white transition-colors" title="Live Demo">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 5. Education & Certifications */}
        <section id="education" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-xl font-mono text-gray-500">04.</span> Background
              <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
            </h2>
            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><span className="text-gray-500">#</span> Education</h3>
                <div className="space-y-6 border-l border-white/10 pl-6 ml-2 relative">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                  <div className="relative">
                    <h4 className="text-lg font-medium text-white">Bachelor of Technology in Artificial Intelligence</h4>
                    <p className="text-sm text-gray-500 mb-2">Sage University Indore • 2024 - 2028</p>
                    <p className="text-secondaryText text-sm leading-relaxed">Specialization in Artificial Intelligence and Machine Learning.</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><span className="text-gray-500">#</span> Certifications</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certifications.slice(0, 4).map((cert, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ y: -5 }}
                      className="glass-card p-5 rounded-2xl hover-glow transition-all duration-300 border border-white/5 flex flex-col justify-between h-full group"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium leading-tight group-hover:text-[#D9D9D9] transition-colors">{cert.title}</h4>
                          <Award className="text-gray-500 w-5 h-5 flex-shrink-0 ml-2" />
                        </div>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{cert.date}</span>
                        <a href={cert.link} target="_blank" rel="noreferrer" className="text-xs text-gray-300 hover:text-white flex items-center gap-1 transition-colors group-hover:underline">
                          View <Link size={12} />
                        </a>
                        
                        
                      </div>
                    </motion.div>
                  ))}
                </div>
                {certifications.length > 4 && (
                  <div className="mt-6 text-center sm:text-left">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="glass-card hover-glow px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 border border-white/10 flex items-center gap-2 inline-flex"
                    >
                      +{certifications.length - 4} More Certifications
                    </button>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 6. Contact */}
        <section id="contact" className="scroll-mt-32 pb-20">
          <FadeIn delay={0.2} yOffset={50}>
            <div className="glass-card rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-b from-white/5 to-transparent rounded-[100%] blur-[80px] pointer-events-none"></div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-silver tracking-tight relative z-10">Let's Build the Future</h2>
              <p className="text-secondaryText max-w-2xl mx-auto mb-10 leading-relaxed text-lg relative z-10">
                Whether you have a complex ML problem to solve, a project idea, or just want to connect, my inbox is always open. Let's discuss new opportunities in the AI/ML space.
              </p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lalitajhapate043@gmail.com" className="inline-block bg-white text-black font-bold px-12 py-4 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 relative z-10">
                Say Hello
              </a>
              
              <div className="flex justify-center gap-6 mt-20 relative z-10 flex-wrap">
                <a href="https://github.com/Lalita0008" className="p-4 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                  <GithubIcon />
                </a>
                <a href="https://www.linkedin.com/in/lalita-jhapate-61b899353" className="p-4 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                  <LinkedinIcon />
                </a>
                <a href="https://www.kaggle.com/lalitajhapate" className="p-4 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                  <KaggleIcon />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lalitajhapate043@gmail.com" className="p-4 glass-card rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>
      
      <footer className="text-center py-8 text-sm text-gray-500 font-mono border-t border-white/5">
        <p>Designed & Built by Lalita © 2026</p>
      </footer>

      {/* Modals */}
      <CertificationsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} certs={certifications} />
    </div>
  );
}

export default App;
