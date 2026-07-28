"use client";

import React, { useRef, useEffect, useState } from "react";

// ----------------------------------------------------------------------
// 0. FLOATING NAV (Fixed: Top center, side-by-side, hide on scroll)
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
    <div className={`fixed top-4 left-0 right-0 z-50 flex justify-center transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-24'}`}>
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
// 0.5. AI BOT & BACKGROUND (Restored)
// ----------------------------------------------------------------------
function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed z-50 right-5 bottom-5">
      {isOpen && (
        <div className="mb-6 w-80 bg-black/90 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
          <h3 className="text-cyan-400 font-bold text-xs uppercase tracking-widest">AI Assistant <button onClick={() => setIsOpen(false)} className="float-right">✕</button></h3>
          <p className="text-sm text-cyan-200">Hi! I'm Gangadhar's assistant. Ask me anything!</p>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]">🤖</button>
    </div>
  );
}

function BackgroundVideoScrubber() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        videoRef.current.currentTime = progress * videoRef.current.duration;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] bg-black">
      <video ref={videoRef} src="/chip1.mp4" muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. CINEMATICS (Restored with dynamic subtitle positioning)
// ----------------------------------------------------------------------
function BusCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const getTextStyle = (start: number, end: number) => ({ opacity: progress >= start && progress <= end ? 1 : 0, transition: "opacity 0.3s" });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center">
      <video ref={videoRef} src="/bus.mp4" muted playsInline onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / e.currentTarget.duration)} className="w-full aspect-video rounded-[2rem] object-cover mb-8" />
      <div className="relative w-full text-center">
        <div className="absolute w-full" style={getTextStyle(0.05, 0.30)}><h3 className="text-3xl font-bold text-white">Live Telemetry Uplink</h3></div>
        <div className="absolute w-full" style={getTextStyle(0.35, 0.65)}><h3 className="text-3xl font-bold text-white">Student Access Portal</h3></div>
        <div className="absolute w-full" style={getTextStyle(0.70, 0.95)}><h3 className="text-3xl font-bold text-white">Precision Sync</h3></div>
      </div>
      <div className="h-32" />
    </div>
  );
}

function MouseCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const getTextStyle = (start: number, end: number) => ({ opacity: progress >= start && progress <= end ? 1 : 0, transition: "opacity 0.3s" });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center">
      <video ref={videoRef} src="/msdemo.mp4" muted playsInline onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / e.currentTarget.duration)} className="w-full aspect-video rounded-[2rem] object-cover mb-8" />
      <div className="relative w-full text-center">
        <div className="absolute w-full" style={getTextStyle(0.05, 0.40)}><h3 className="text-3xl font-bold text-white">Presentation Mode</h3></div>
        <div className="absolute w-full" style={getTextStyle(0.45, 0.80)}><h3 className="text-3xl font-bold text-white">Tactile Activation</h3></div>
      </div>
      <div className="h-32" />
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. MAIN PAGE (Restored Structure)
// ----------------------------------------------------------------------
export default function Home() {
  const [activeProject, setActiveProject] = useState<'bus' | 'mouse' | null>(null);

  return (
    <div className="relative w-full overflow-hidden">
      <BackgroundVideoScrubber />
      <FloatingNav />
      <AIChatBot />

      <section className="pt-[20vh] pb-[10vh] flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-white">GANGADHAR<br/>PANDLA</h1>
      </section>

      <section className="px-4 py-16 flex justify-center">
        <div className="max-w-4xl w-full bg-black/40 p-8 rounded-[2rem] border border-white/10">
          <h2 className="text-cyan-400 text-center mb-8 uppercase tracking-widest">Education</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-cyan-500 pl-4"><h4>B.Tech ECE</h4></div>
            <div className="border-l-2 border-blue-500 pl-4"><h4>Diploma in Eng</h4></div>
            <div className="border-l-2 border-gray-500 pl-4"><h4>10th Class</h4></div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center py-12">
        <div className="flex gap-4">
          <button onClick={() => setActiveProject('bus')} className="px-6 py-3 rounded-full border border-white/20 bg-black/50 text-white text-xs">Bus Tracking</button>
          <button onClick={() => setActiveProject('mouse')} className="px-6 py-3 rounded-full border border-white/20 bg-black/50 text-white text-xs">Laser Mouse</button>
        </div>
      </section>

      {activeProject === 'bus' && <BusCinematic />}
      {activeProject === 'mouse' && <MouseCinematic />}
      
      <section className="py-20 text-center">
        <h2 className="text-white/50 uppercase tracking-[0.5em] mb-12">Achievements</h2>
        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto px-6">
          <div className="p-6 rounded-3xl border border-white/10 bg-black/40"><h3 className="text-cyan-400">NCC National Cadet</h3></div>
          <div className="p-6 rounded-3xl border border-white/10 bg-black/40"><h3 className="text-cyan-400">Arts Excellence</h3></div>
        </div>
      </section>
    </div>
  );
}