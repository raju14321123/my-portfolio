"use client";

import React, { useRef, useEffect, useState } from "react";

// ----------------------------------------------------------------------
// 0. FLOATING NAV (SIDE-BY-SIDE + SCROLL HIDE/SHOW + MOBILE CLEANUP)
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
    { role: 'bot', text: "Hi! I'm Gangadhar's assistant." }
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
      <button onClick={() => !isDragging && setIsOpen(!isOpen)} className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center hover:scale-105 transition-transform">🤖</button>
    </div>
  );
}

// ----------------------------------------------------------------------
// 1. GLOBAL BACKGROUND
// ----------------------------------------------------------------------
function BackgroundVideoScrubber() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
        videoRef.current.currentTime = progress * videoRef.current.duration;
      }
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
// 2. DYNAMIC CINEMATIC COMPONENT (Fixed Subtitles)
// ----------------------------------------------------------------------
function CinematicSection({ videoSrc, slides }: { videoSrc: string, slides: { title: string, subtitle: string, desc: string }[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const duration = videoRef.current.duration;
    const time = videoRef.current.currentTime;
    // Divide duration by number of slides to determine active index
    const index = Math.min(Math.floor((time / duration) * slides.length), slides.length - 1);
    setActiveIndex(index);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 mb-8">
        <video ref={videoRef} src={videoSrc} muted playsInline onTimeUpdate={handleTimeUpdate} className="w-full h-full object-cover" />
      </div>

      <div className="relative w-full text-center flex flex-col items-center">
        {slides.map((slide, i) => (
          <div key={i} className={`transition-opacity duration-300 ${activeIndex === i ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
            <h2 className="text-sm tracking-[0.3em] text-cyan-400 font-bold uppercase mb-2">{slide.title}</h2>
            <h3 className="text-3xl font-extrabold text-white mb-2">{slide.subtitle}</h3>
            <p className="text-sm text-gray-300 max-w-sm">{slide.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. MAIN PAGE
// ----------------------------------------------------------------------
export default function Home() {
  const [activeProject, setActiveProject] = useState<'bus' | 'mouse' | null>(null);

  const busSlides = [
    { title: "INITIALIZATION", subtitle: "Live Telemetry", desc: "Real-time location streaming." },
    { title: "USER PORTAL", subtitle: "Access Portal", desc: "Unified student dashboard." },
    { title: "SYNC", subtitle: "Precision Sync", desc: "Perfect arrival synchronization." }
  ];

  const mouseSlides = [
    { title: "TARGETING", subtitle: "Presentation Mode", desc: "High-precision laser pointing." },
    { title: "SWITCH", subtitle: "Tactile Activation", desc: "Hardware toggle activation." }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <BackgroundVideoScrubber />
      <FloatingNav />
      <AIChatBot />

      <section className="pt-[20vh] pb-[10vh] flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-[0.9]">
          GANGADHAR<br/>PANDLA
        </h1>
      </section>

      <section className="flex flex-col items-center py-12">
        <div className="flex gap-4">
          <button onClick={() => setActiveProject('bus')} className="px-6 py-3 rounded-full border border-white/20 bg-black/50 text-white font-bold backdrop-blur-md text-xs">Bus Tracking</button>
          <button onClick={() => setActiveProject('mouse')} className="px-6 py-3 rounded-full border border-white/20 bg-black/50 text-white font-bold backdrop-blur-md text-xs">Laser Mouse</button>
        </div>
      </section>

      {activeProject === 'bus' && <CinematicSection videoSrc="/bus.mp4" slides={busSlides} />}
      {activeProject === 'mouse' && <CinematicSection videoSrc="/msdemo.mp4" slides={mouseSlides} />}
      
      <div className="h-[20vh] w-full" />
    </div>
  );
}