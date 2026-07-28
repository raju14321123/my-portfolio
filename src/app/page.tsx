"use client";

import React, { useRef, useEffect, useState } from "react";

// ----------------------------------------------------------------------
// 0. FLOATING NAV
// ----------------------------------------------------------------------
function FloatingNav() {
  return (
    <div className="fixed top-6 right-6 z-40">
      <div className="bg-black/20 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl shadow-2xl flex flex-col items-center gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <a href="/resume.pdf" target="_blank" className="px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-all font-bold text-white text-xs uppercase tracking-widest text-center">Resume</a>
          <a href="mailto:gangadharpandla4477@gmail.com" className="px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-all font-bold text-white text-xs uppercase tracking-widest text-center">Contact</a>
        </div>
        <a href="/resume.pdf" download="Gangadhar_Resume.pdf" className="text-[10px] text-gray-400 hover:text-white transition-colors underline underline-offset-4 uppercase tracking-widest">Download Resume</a>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 0.5. INTERACTIVE FLOATING AI BOT
// ----------------------------------------------------------------------
function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: "Hi! I'm Gangadhar's assistant. Ask me anything about his skills, projects, or achievements!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const portfolioKnowledge: Record<string, string> = {
    "education": "Gangadhar is a 4th-year ECE student at SVIT. He also completed his Diploma at Govt Polytechnic, Anantapur with 74.3%.",
    "bus": "His College Bus Tracking project uses React, Supabase, and OpenStreetMap to provide real-time GPS telemetry.",
    "mouse": "The Laser Air Mouse project uses ESP32 with IMU sensor fusion for zero-latency 3D movement.",
    "skills": "He is skilled in VLSI, C++, Embedded systems, and AI-assisted web development.",
    "achievements": "Gangadhar is an NCC National Level gun shooting cadet, an Arts College Fest winner, and skilled in pencil art and painting. Every skill he masters is an achievement to him!",
    "ncc": "He is a proud NCC National Level gun shooting cadet.",
    "art": "He is highly skilled in pencil art and painting, having won his college arts fest."
  };

  const getBotResponse = (query: string) => {
    const q = query.toLowerCase();
    
    for (const key in portfolioKnowledge) {
      if (q.includes(key)) return portfolioKnowledge[key];
    }
    
    return `That's an interesting question about "${query}". As Gangadhar's assistant, I'm specialized in his portfolio, but I can tell you that every detail he works on is built with precision and passion. Would you like to know more about his specific technical skills or his achievements?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: getBotResponse(userText) }]);
    }, 1200); 
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      requestAnimationFrame(() => {
        setPos({ x: window.innerWidth - e.clientX + offset.current.x - 32, y: window.innerHeight - e.clientY + offset.current.y - 32 });
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="fixed z-50 cursor-grab active:cursor-grabbing"
         style={{ right: `${pos.x}px`, bottom: `${pos.y}px` }}
         onMouseDown={handleMouseDown}>
      {isOpen && (
        <div className="mb-6 w-80 bg-black/90 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <h3 className="text-cyan-400 font-bold text-xs uppercase tracking-widest">AI Assistant</h3>
            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-white/50 hover:text-white">✕</button>
          </div>
          <div className="h-48 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role === 'bot' ? 'text-cyan-200' : 'text-white bg-white/10 p-2 rounded-lg'}`}>
                {m.text}
              </div>
            ))}
            {isTyping && <div className="text-cyan-400 text-xs animate-pulse">Assistant is thinking...</div>}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-white/5 border border-white/20 rounded-full px-4 py-2 text-white text-xs outline-none focus:border-cyan-500" placeholder="Ask a question..." />
            <button onClick={handleSend} className="bg-cyan-500 text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-cyan-400 transition-colors">SEND</button>
          </div>
        </div>
      )}
      <button onClick={() => !isDragging && setIsOpen(!isOpen)} className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center hover:scale-105 transition-transform">
        <span className="text-2xl">🤖</span>
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------
// 1. GLOBAL BACKGROUND SCRUBBER
// ----------------------------------------------------------------------
function BackgroundVideoScrubber() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
      }
    };

    const renderLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08;
      if (videoRef.current && videoRef.current.duration) {
        const targetTime = currentProgress * videoRef.current.duration;
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.03) {
          videoRef.current.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    renderLoop();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] bg-black">
      <video ref={videoRef} src="/chip1.mp4" muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.98)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[var(--accent-blue)] opacity-10 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none" />
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. BUS CINEMATIC
// ----------------------------------------------------------------------
function BusCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const newProgress = e.currentTarget.currentTime / e.currentTarget.duration;
    if (Math.abs(newProgress - progress) > 0.01) setProgress(newProgress);
  };

  const getTextStyle = (start: number, end: number) => {
    const fadeZone = (end - start) * 0.25;
    let opacity = 0;
    let translateY = 30;
    if (progress >= start && progress <= end) {
      if (progress < start + fadeZone) { opacity = (progress - start) / fadeZone; translateY = 30 * (1 - opacity); }
      else if (progress > end - fadeZone) { opacity = (end - progress) / fadeZone; translateY = -30 * (1 - opacity); }
      else { opacity = 1; translateY = 0; }
    }
    return { opacity, transform: `translateY(${translateY}px)`, transition: "opacity 0.4s ease-out, transform 0.4s ease-out" };
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row items-center justify-start group"
         onMouseEnter={() => videoRef.current?.play()}
         onMouseLeave={() => { videoRef.current?.pause(); videoRef.current!.currentTime = 0; setProgress(0); }}>
      <div className="relative w-full md:w-[65%] aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl shrink-0">
        <video ref={videoRef} src="/bus.mp4" muted playsInline onTimeUpdate={handleTimeUpdate} className="w-full h-full object-cover" />
      </div>

      <div className="relative w-full md:w-[45%] h-full flex flex-col justify-center pointer-events-none md:-ml-[10%] mt-8 md:mt-0">
        <div className="absolute inset-y-0 left-[-10%] right-[-10%] bg-[radial-gradient(ellipse_at_left,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.7)_50%,transparent_80%)] pointer-events-none -z-10" />
        <div className="relative z-10 w-full pl-6 md:pl-16">
          <div className="absolute w-full top-0 md:top-1/2 md:-translate-y-1/2 text-left" style={getTextStyle(0.05, 0.30)}>
            <h2 className="text-xs md:text-sm tracking-[0.3em] text-[var(--accent-cyan)] font-bold uppercase mb-2 md:mb-4">DRIVER INITIALIZATION</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tighter">Live Telemetry<br/>Uplink</h3>
            <p className="text-sm md:text-lg text-white font-bold max-w-sm">Driver initiates real-time location sharing, establishing a secure, high-fidelity data stream between the bus and our cloud infrastructure.</p>
          </div>
          <div className="absolute w-full top-0 md:top-1/2 md:-translate-y-1/2 text-left" style={getTextStyle(0.35, 0.65)}>
            <h2 className="text-xs md:text-sm tracking-[0.3em] text-[var(--accent-blue)] font-bold uppercase mb-2 md:mb-4">USER PORTAL</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tighter">Student Access<br/>Portal</h3>
            <p className="text-sm md:text-lg text-white font-bold max-w-sm">Students log in to a unified dashboard, featuring real-time route visualization powered by OpenStreetMap and Node.js backend services.</p>
          </div>
          <div className="absolute w-full top-0 md:top-1/2 md:-translate-y-1/2 text-left" style={getTextStyle(0.70, 0.95)}>
            <h2 className="text-xs md:text-sm tracking-[0.3em] text-[var(--accent-cyan)] font-bold uppercase mb-2 md:mb-4">SYNC COMPLETE</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tighter">Precision<br/>Sync</h3>
            <p className="text-sm md:text-lg text-white font-bold max-w-sm">Digital tracking aligns perfectly with physical reality, ensuring students arrive at stops in precise synchronization with bus arrivals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. MOUSE CINEMATIC
// ----------------------------------------------------------------------
function MouseCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const assemblyRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const newProgress = e.currentTarget.currentTime / e.currentTarget.duration;
    if (Math.abs(newProgress - progress) > 0.01) setProgress(newProgress);
  };

  const getTextStyle = (start: number, end: number) => {
    const fadeZone = (end - start) * 0.25;
    let opacity = 0;
    let translateY = 30;
    if (progress >= start && progress <= end) {
      if (progress < start + fadeZone) { opacity = (progress - start) / fadeZone; translateY = 30 * (1 - opacity); }
      else if (progress > end - fadeZone) { opacity = (end - progress) / fadeZone; translateY = -30 * (1 - opacity); }
      else { opacity = 1; translateY = 0; }
    }
    return { opacity, transform: `translateY(${translateY}px)`, transition: "opacity 0.4s ease-out, transform 0.4s ease-out" };
  };

  return (
    <>
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row items-center justify-start group"
           onMouseEnter={() => videoRef.current?.play()}
           onMouseLeave={() => { videoRef.current?.pause(); videoRef.current!.currentTime = 0; setProgress(0); }}>
        <div className="relative w-full md:w-[65%] aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl shrink-0">
          <video ref={videoRef} src="/msdemo.mp4" muted playsInline onTimeUpdate={handleTimeUpdate} className="w-full h-full object-cover mix-blend-screen" />
        </div>
        
        <div className="relative w-full md:w-[45%] h-full flex flex-col justify-center pointer-events-none md:-ml-[10%] mt-8 md:mt-0">
          <div className="absolute inset-y-0 left-[-10%] right-[-10%] bg-[radial-gradient(ellipse_at_left,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.7)_50%,transparent_80%)] pointer-events-none -z-10" />
          <div className="relative z-10 w-full pl-6 md:pl-16">
            <div className="absolute w-full top-0 md:top-1/2 md:-translate-y-1/2 text-left" style={getTextStyle(0.05, 0.25)}>
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 font-bold uppercase mb-2 md:mb-4">SPATIAL TARGETING</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tighter">Presentation<br/>Mode</h3>
              <p className="text-sm md:text-xl text-white font-bold max-w-sm">Seamless toggle mode designed for high-precision, lag-free optical laser pointing in academic seminars.</p>
            </div>
            <div className="absolute w-full top-0 md:top-1/2 md:-translate-y-1/2 text-left" style={getTextStyle(0.30, 0.50)}>
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 font-bold uppercase mb-2 md:mb-4">STATE SWITCH</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tighter">Tactile<br/>Activation</h3>
              <p className="text-sm md:text-xl text-white font-bold max-w-sm">A hardware-level toggle instantly transforms the pointing laser into a full 3D air-mouse interface.</p>
            </div>
            <div className="absolute w-full top-0 md:top-1/2 md:-translate-y-1/2 text-left" style={getTextStyle(0.55, 0.75)}>
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 font-bold uppercase mb-2 md:mb-4">ZERO-SURFACE INPUT</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4 md:mb-6 tracking-tighter">True Air<br/>Mouse</h3>
              <p className="text-sm md:text-xl text-white font-bold max-w-sm">Utilizes IMU sensor fusion to translate spatial hand gestures into zero-latency digital navigation, no surface required.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex items-center justify-center">
        <div className="relative w-[75%] aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl"
             onMouseEnter={() => assemblyRef.current?.play()}
             onMouseLeave={() => { assemblyRef.current?.pause(); assemblyRef.current!.currentTime = 0; }}>
          <video ref={assemblyRef} src="/msassembly.mp4" muted playsInline className="w-full h-full object-cover mix-blend-screen" />
          <div className="absolute bottom-8 w-full text-center text-white font-bold text-xl drop-shadow-lg">Core Hardware Component Assembly & Sensor Fusion</div>
        </div>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------
// 4. MAIN PAGE ASSEMBLY
// ----------------------------------------------------------------------
export default function Home() {
  const [activeProject, setActiveProject] = useState<'bus' | 'mouse' | null>(null);
  const techStack = [ "Basics: VLSI", "C++", "Embedded", "AI Assist Web Development" ];

  return (
    <div className="relative w-full">
      <BackgroundVideoScrubber />
      <FloatingNav />
      <AIChatBot />

      <section id="hero-section" className="w-full pt-[20vh] pb-[10vh] flex flex-col justify-center relative z-10">
        <main className="z-10 px-6 md:px-16 lg:px-24 w-full flex flex-col items-start">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] leading-[0.9]">
            GANGADHAR<br/>PANDLA
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-cyan)]" />
            <span className="text-[var(--accent-cyan)] text-xs md:text-sm tracking-[0.3em] uppercase font-mono drop-shadow-md">Skills</span>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4 max-w-2xl">
            {techStack.map((tech, index) => (
              <div key={index} className="px-5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gray-300 font-bold text-sm md:text-base tracking-wide shadow-lg cursor-default">{tech}</div>
            ))}
          </div>
        </main>
      </section>

      <section id="education-section" className="w-full flex flex-col items-center justify-center relative z-10 px-4 py-16">
        <div className="max-w-4xl w-full">
          <div className="group relative bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-2xl border-t border-l border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[var(--accent-blue)] opacity-10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-20" />
            <h2 className="text-[var(--accent-cyan)] text-xs tracking-[0.5em] uppercase font-bold mb-12 text-center drop-shadow-md">Education & Academic Path</h2>
            <div className="relative ml-2 md:ml-4 space-y-12">
              <div className="absolute left-[7px] top-2 bottom-4 w-[2px] bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-blue)] to-transparent opacity-60" />
              <div className="relative pl-10 transition-all duration-300 hover:translate-x-2 cursor-default group/item">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-black border-2 border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-cyan)] transition-colors duration-300 group-hover/item:bg-[var(--accent-cyan)]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                  <h4 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover/item:text-[var(--accent-cyan)]">B.Tech - Electronics & Communication Engineering (ECE)</h4>
                  <span className="inline-flex w-max items-center px-3 py-1 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] text-xs font-mono font-bold tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.1)]">4TH YEAR</span>
                </div>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">Sri Venkateswara Institute of Technology, Hampapuram</p>
              </div>
              <div className="relative pl-10 transition-all duration-300 hover:translate-x-2 cursor-default group/item">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-black border-2 border-[var(--accent-blue)] transition-colors duration-300 group-hover/item:bg-[var(--accent-blue)] group-hover/item:shadow-[0_0_15px_var(--accent-blue)]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-200 transition-colors duration-300 group-hover/item:text-white">Diploma in Engineering</h4>
                  <span className="inline-flex w-max items-center px-3 py-1 rounded-full bg-white/5 border border-white/20 text-gray-300 text-xs font-mono font-bold tracking-widest">74.3%</span>
                </div>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">Government Polytechnic, Anantapur, Andhra Pradesh</p>
              </div>
              <div className="relative pl-10 transition-all duration-300 hover:translate-x-2 cursor-default group/item">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-black border-2 border-gray-600 transition-colors duration-300 group-hover/item:border-gray-400 group-hover/item:bg-gray-400" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-300 transition-colors duration-300 group-hover/item:text-white">10th Class (SSC)</h4>
                  <span className="inline-flex w-max items-center px-3 py-1 rounded-full bg-white/5 border border-white/20 text-gray-400 text-xs font-mono font-bold tracking-widest">COMPLETED</span>
                </div>
                <p className="text-gray-500 font-mono text-sm leading-relaxed">Andhra Pradesh Residential School of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects-section" className="w-full flex flex-col items-center justify-center relative z-10 px-4 pt-12 pb-12">
        <h2 className="text-gray-500 text-xs tracking-[0.5em] uppercase font-bold mb-4">PROJECT</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <button onClick={() => setActiveProject('bus')} className="px-8 py-4 rounded-full border border-white/20 bg-black/50 text-white font-bold backdrop-blur-md hover:border-cyan-500 transition-colors">Bus Tracking</button>
          <button onClick={() => setActiveProject('mouse')} className="px-8 py-4 rounded-full border border-white/20 bg-black/50 text-white font-bold backdrop-blur-md hover:border-red-500 transition-colors">Future Project Laser Mouse</button>
        </div>
      </section>

      {activeProject === 'bus' && <BusCinematic />}
      {activeProject === 'mouse' && <MouseCinematic />}
      
      <section id="achievements-section" className="w-full py-20 relative z-10">
        <h2 className="text-center text-white/50 text-xs tracking-[0.5em] uppercase font-bold mb-12">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          {[
            { title: "NCC National Cadet", desc: "National level gun shooting competition participant." },
            { title: "Arts Excellence", desc: "College Fest winner in arts; skilled in pencil art and painting." },
            { title: "Academic & Skill Milestones", desc: "Diploma (74.3%) and mastery in VLSI, Embedded systems, and C++." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-cyan-500 transition-all group shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
              <h3 className="text-cyan-400 font-bold text-lg mb-2 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-[20vh] w-full" />
    </div>
  );
}