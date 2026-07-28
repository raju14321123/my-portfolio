"use client";

import React, { useRef, useEffect, useState } from "react";

// ... [Keep FloatingNav, AIChatBot, BackgroundVideoScrubber as they were] ...

// ----------------------------------------------------------------------
// 2. BUS CINEMATIC (Fixed: Dynamic visibility logic)
// ----------------------------------------------------------------------
function BusCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const newProgress = e.currentTarget.currentTime / e.currentTarget.duration;
    setProgress(newProgress);
  };

  // Only show the active section based on video progress
  const getVisibility = (start: number, end: number) => {
    return progress >= start && progress <= end ? "block" : "hidden";
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center justify-center"
         onMouseEnter={() => videoRef.current?.play()}
         onMouseLeave={() => { videoRef.current?.pause(); videoRef.current!.currentTime = 0; setProgress(0); }}>
      <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl mb-8">
        <video ref={videoRef} src="/bus.mp4" muted playsInline onTimeUpdate={handleTimeUpdate} className="w-full h-full object-cover" />
      </div>

      <div className="relative w-full text-center items-center">
        <div className={`${getVisibility(0.05, 0.30)} transition-opacity duration-500`}>
          <h2 className="text-sm tracking-[0.3em] text-[var(--accent-cyan)] font-bold uppercase mb-2">DRIVER INITIALIZATION</h2>
          <h3 className="text-3xl font-extrabold text-white mb-2">Live Telemetry Uplink</h3>
          <p className="text-sm text-gray-300">Driver initiates real-time location sharing, establishing a secure, high-fidelity data stream.</p>
        </div>
        <div className={`${getVisibility(0.35, 0.65)} transition-opacity duration-500`}>
          <h2 className="text-sm tracking-[0.3em] text-[var(--accent-blue)] font-bold uppercase mb-2">USER PORTAL</h2>
          <h3 className="text-3xl font-extrabold text-white mb-2">Student Access Portal</h3>
          <p className="text-sm text-gray-300">Students log in to a unified dashboard, featuring real-time route visualization powered by OpenStreetMap.</p>
        </div>
        <div className={`${getVisibility(0.70, 0.95)} transition-opacity duration-500`}>
          <h2 className="text-sm tracking-[0.3em] text-[var(--accent-cyan)] font-bold uppercase mb-2">SYNC COMPLETE</h2>
          <h3 className="text-3xl font-extrabold text-white mb-2">Precision Sync</h3>
          <p className="text-sm text-gray-300">Digital tracking aligns perfectly with physical reality, ensuring students arrive on time.</p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. MOUSE CINEMATIC (Fixed: Dynamic visibility logic)
// ----------------------------------------------------------------------
function MouseCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const assemblyRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const getVisibility = (start: number, end: number) => {
    return progress >= start && progress <= end ? "block" : "hidden";
  };

  return (
    <>
      <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center justify-center"
           onMouseEnter={() => videoRef.current?.play()}
           onMouseLeave={() => { videoRef.current?.pause(); videoRef.current!.currentTime = 0; }}>
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl mb-8">
          <video ref={videoRef} src="/msdemo.mp4" muted playsInline onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / e.currentTarget.duration)} className="w-full h-full object-cover mix-blend-screen" />
        </div>
        
        <div className="relative w-full text-center items-center">
            <div className={`${getVisibility(0.05, 0.25)}`}>
              <h2 className="text-sm tracking-[0.3em] text-red-500 font-bold uppercase mb-2">SPATIAL TARGETING</h2>
              <h3 className="text-3xl font-extrabold text-white mb-2">Presentation Mode</h3>
              <p className="text-sm text-gray-300">Seamless toggle mode designed for high-precision, lag-free optical laser pointing.</p>
            </div>
            <div className={`${getVisibility(0.30, 0.50)}`}>
              <h2 className="text-sm tracking-[0.3em] text-red-500 font-bold uppercase mb-2">STATE SWITCH</h2>
              <h3 className="text-3xl font-extrabold text-white mb-2">Tactile Activation</h3>
              <p className="text-sm text-gray-300">A hardware-level toggle instantly transforms the laser into a full 3D air-mouse.</p>
            </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl"
             onMouseEnter={() => assemblyRef.current?.play()}
             onMouseLeave={() => { assemblyRef.current?.pause(); assemblyRef.current!.currentTime = 0; }}>
          <video ref={assemblyRef} src="/msassembly.mp4" muted playsInline className="w-full h-full object-cover mix-blend-screen" />
          <div className="absolute bottom-4 w-full text-center text-white font-bold text-[10px] p-2 opacity-60">Component Assembly & Sensor Fusion</div>
        </div>
      </div>
    </>
  );
}

// ... [Keep Home component as it was] ...