"use client";

import React, { useRef, useEffect, useState } from "react";

// ----------------------------------------------------------------------
// 0. FLOATING NAV (Preserved exactly as requested)
// ----------------------------------------------------------------------
function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-4 left-0 right-0 z-40 flex justify-center transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-24'}`}>
      <div className="bg-black/20 backdrop-blur-2xl border border-white/10 px-4 py-2 rounded-full shadow-2xl flex flex-row items-center gap-2">
        <a href="/resume.pdf" target="_blank" className="px-3 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-all font-bold text-white text-[9px] uppercase tracking-widest">Resume</a>
        <a href="mailto:gangadharpandla4477@gmail.com" className="px-3 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-all font-bold text-white text-[9px] uppercase tracking-widest">Contact</a>
        <div className="hidden md:block w-[1px] h-3 bg-white/20" />
        <a href="/resume.pdf" download="Gangadhar_Resume.pdf" className="hidden md:block text-[9px] text-gray-400 hover:text-white transition-colors underline underline-offset-4 uppercase tracking-widest">Download</a>
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
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPos({ x: window.innerWidth - e.clientX + offset.current.x - 32, y: window.innerHeight - e.clientY + offset.current.y - 32 });
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
    <div className="fixed z-50 cursor-grab active:cursor-grabbing" style={{ right: `${pos.x}px`, bottom: `${pos.y}px` }} onMouseDown={handleMouseDown}>
      {isOpen && (
        <div className="mb-6 w-80 bg-black/90 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <h3 className="text-cyan-400 font-bold text-xs uppercase tracking-widest">AI Assistant</h3>
            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-white/50 hover:text-white">✕</button>
          </div>
          <div className="h-48 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {messages.map((m, i) => <div key={i} className={`text-sm ${m.role === 'bot' ? 'text-cyan-200' : 'text-white bg-white/10 p-2 rounded-lg'}`}>{m.text}</div>)}
          </div>
        </div>
      )}
      <button onClick={() => !isDragging && setIsOpen(!isOpen)} className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center hover:scale-105 transition-transform">🤖</button>
    </div>
  );
}

// ----------------------------------------------------------------------
// 1. BACKGROUND
// ----------------------------------------------------------------------
function BackgroundVideoScrubber() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) videoRef.current.currentTime = (scrollY / maxScroll) * videoRef.current.duration;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] bg-black">
      <video ref={videoRef} src="/chip1.mp4" muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. BUS CINEMATIC (Subtitles synced to video)
// ----------------------------------------------------------------------
function BusCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    // Switch subtitles every 3 seconds
    if (time < 3) setActiveSlide(0);
    else if (time < 6) setActiveSlide(1);
    else setActiveSlide(2);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 mb-8">
        <video ref={videoRef} src="/bus.mp4" muted playsInline onTimeUpdate={handleTimeUpdate} className="w-full h-full object-cover" />
      </div>

      <div className="relative w-full text-center flex flex-col items-center">
        {activeSlide === 0 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-sm tracking-[0.3em] text-[var(--accent-cyan)] font-bold uppercase mb-2">DRIVER INITIALIZATION</h2>
            <h3 className="text-3xl font-extrabold text-white mb-2">Live Telemetry Uplink</h3>
            <p className="text-sm text-gray-300 max-w-sm">Driver initiates real-time location sharing, establishing a secure, high-fidelity data stream.</p>
          </div>
        )}
        {activeSlide === 1 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-sm tracking-[0.3em] text-[var(--accent-blue)] font-bold uppercase mb-2">USER PORTAL</h2>
            <h3 className="text-3xl font-extrabold text-white mb-2">Student Access Portal</h3>
            <p className="text-sm text-gray-300 max-w-sm">Students log in to a unified dashboard, featuring real-time route visualization.</p>
          </div>
        )}
        {activeSlide === 2 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-sm tracking-[0.3em] text-[var(--accent-cyan)] font-bold uppercase mb-2">SYNC COMPLETE</h2>
            <h3 className="text-3xl font-extrabold text-white mb-2">Precision Sync</h3>
            <p className="text-sm text-gray-300 max-w-sm">Digital tracking aligns perfectly with physical reality, ensuring accurate arrivals.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. MOUSE CINEMATIC (Subtitles synced to video)
// ----------------------------------------------------------------------
function MouseCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const assemblyRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    if (time < 3) setActiveSlide(0);
    else setActiveSlide(1);
  };

  return (
    <>
      <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 mb-8">
          <video ref={videoRef} src="/msdemo.mp4" muted playsInline onTimeUpdate={handleTimeUpdate} className="w-full h-full object-cover mix-blend-screen" />
        </div>
        
        <div className="relative w-full text-center flex flex-col items-center">
            {activeSlide === 0 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-sm tracking-[0.3em] text-red-500 font-bold uppercase mb-2">SPATIAL TARGETING</h2>
                <h3 className="text-3xl font-extrabold text-white mb-2">Presentation Mode</h3>
                <p className="text-sm text-gray-300 max-w-sm">Seamless toggle mode designed for high-precision optical laser pointing.</p>
              </div>
            )}
            {activeSlide === 1 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-sm tracking-[0.3em] text-red-500 font-bold uppercase mb-2">STATE SWITCH</h2>
                <h3 className="text-3xl font-extrabold text-white mb-2">Tactile Activation</h3>
                <p className="text-sm text-gray-300 max-w-sm">Hardware-level toggle for 3D air-mouse control.</p>
              </div>
            )}
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40">
          <video ref={assemblyRef} src="/msassembly.mp4" muted playsInline className="w-full h-full object-cover mix-blend-screen" />
          <div className="absolute bottom-4 w-full text-center text-white font-bold text-[10px] p-2 opacity-60">Component Assembly & Sensor Fusion</div>
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
    <div className="relative w-full overflow-hidden">
      <BackgroundVideoScrubber />
      <FloatingNav />
      <AIChatBot />

      <section className="pt-[20vh] pb-[10vh] flex flex-col items-center text-center relative z-10">
        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] leading-[0.9]">
          GANGADHAR<br/>PANDLA
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4 max-w-2xl px-6">
          {techStack.map((tech, i) => (
            <div key={i} className="px-5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gray-300 font-bold text-sm tracking-wide">{tech}</div>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col items-center justify-center relative z-10 px-4 py-16">
        <div className="max-w-4xl w-full group relative bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
          <h2 className="text-[var(--accent-cyan)] text-xs tracking-[0.5em] uppercase font-bold mb-12 text-center">Education & Academic Path</h2>
          <div className="space-y-8">
            <div className="pl-4 border-l-2 border-[var(--accent-cyan)]"><h4 className="font-bold text-white">B.Tech - ECE</h4><p className="text-gray-400 font-mono text-xs">Sri Venkateswara Institute of Technology</p></div>
            <div className="pl-4 border-l-2 border-[var(--accent-blue)]"><h4 className="font-bold text-gray-200">Diploma in Engineering</h4><p className="text-gray-400 font-mono text-xs">Govt Polytechnic, Anantapur</p></div>
            <div className="pl-4 border-l-2 border-gray-600"><h4 className="font-bold text-gray-300">10th Class (SSC)</h4><p className="text-gray-500 font-mono text-xs">Andhra Pradesh Residential School</p></div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center relative z-10 px-4 pt-12 pb-12">
        <h2 className="text-gray-500 text-xs tracking-[0.5em] uppercase font-bold mb-4">PROJECT</h2>
        <div className="flex gap-4">
          <button onClick={() => setActiveProject('bus')} className="px-6 py-3 rounded-full border border-white/20 bg-black/50 text-white font-bold backdrop-blur-md hover:border-cyan-500 transition-colors text-xs">Bus Tracking</button>
          <button onClick={() => setActiveProject('mouse')} className="px-6 py-3 rounded-full border border-white/20 bg-black/50 text-white font-bold backdrop-blur-md hover:border-red-500 transition-colors text-xs">Laser Mouse</button>
        </div>
      </section>

      {activeProject === 'bus' && <BusCinematic />}
      {activeProject === 'mouse' && <MouseCinematic />}
      
      <section className="py-20 relative z-10 text-center">
        <h2 className="text-white/50 uppercase tracking-[0.5em] mb-12">Achievements</h2>
        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto px-6">
          <div className="p-6 rounded-3xl border border-white/10 bg-black/40"><h3 className="text-cyan-400 font-bold">NCC National Cadet</h3></div>
          <div className="p-6 rounded-3xl border border-white/10 bg-black/40"><h3 className="text-cyan-400 font-bold">Arts Excellence</h3></div>
        </div>
      </section>

      <div className="h-[20vh] w-full" />
    </div>
  );
}