"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/scroll";
import gsap from "gsap";

const projects = [
  { name: "Elysia", position: { top: "38%", left: "12%" }, year: "2024" },
  { name: "NutriAI", position: { top: "48%", left: "35%" }, year: "2024" },
  { name: "LearnFlow", position: { top: "44%", left: "58%" }, year: "2024" },
  { name: "PathForge", position: { top: "52%", right: "18%" }, year: "2024" },
  { name: "Local Finder", position: { top: "58%", left: "50%" }, year: "2024" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  useEffect(() => {
    if (!heroRef.current || !sceneRef.current) return;

    // Hero 3D Fly-In Animation (jameschugh.com reverse-engineered)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sceneRef.current,
        {
          scale: 0.7,           // Start 70% size (TEST: 0.6 - 0.9)
          z: -300,              // 300px away in 3D space (TEST: -200 to -500)
          opacity: 0.5,       // Slightly faded (TEST: 0.3 - 0.8)
        },
        {
          scale: 1,           // Full size
          z: 0,               // At viewer
          opacity: 1,         // Fully visible
          ease: "power2.out", // Smooth deceleration (TEST: power3, expo)
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom 60%", // ~40% of hero scroll (TEST: adjust by feel)
            scrub: 1,         // 1 second smooth scrub
          }
        }
      );

      // Parallax effect on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 100,
          scale: 1.1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden perspective-container"
    >
      {/* Top Bar Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        {/* Music Player */}
        <button
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="glass px-4 py-2 rounded-full border-2 border-white/20 dark:border-white/10 hover:scale-105 transition-all flex items-center gap-2"
        >
          <span className="text-red-500 text-xl">{isMusicPlaying ? "⏸" : "▶"}</span>
          <span className="text-sm font-medium">Play music</span>
        </button>
      </div>

      {/* Hero Scene */}
      <div
        ref={sceneRef}
        className="relative w-full h-full transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hero Background Image */}
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <img 
            src="/hero-bg.svg" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
        </div>

        {/* Interactive Project Pins */}
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="absolute group cursor-pointer z-30"
            style={project.position}
          >
            <div className="relative">
              {/* Pin glow effect */}
              <div className="absolute inset-0 w-12 h-12 bg-red-500/50 rounded-full blur-xl animate-pulse"></div>
              
              {/* Pin marker */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center hover:scale-125 transition-all duration-300 hover:rotate-12">
                <span className="text-white text-xl drop-shadow-lg">📍</span>
              </div>
              
              {/* Connecting line to ground */}
              <div className="absolute top-full left-1/2 w-0.5 h-8 bg-gradient-to-b from-red-500 to-transparent transform -translate-x-1/2 opacity-50"></div>
              
              {/* Tooltip */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none">
                <div className="glass px-5 py-3 rounded-xl border-2 border-white/30 shadow-2xl backdrop-blur-xl">
                  <p className="text-sm font-bold text-white whitespace-nowrap">{project.name}</p>
                  <p className="text-xs opacity-75 text-white/80">{project.year}</p>
                </div>
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/70 backdrop-blur-xl rotate-45"></div>
              </div>

              {/* Click hint */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="glass px-3 py-1 rounded-full border border-white/30 backdrop-blur-md">
                  <p className="text-xs text-white/90 whitespace-nowrap flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    click to explore
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-12 md:px-20 z-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
              <p className="text-base text-white/90 font-medium tracking-wide">hey, I'm Aarya</p>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.95] text-white drop-shadow-2xl">
              Building so you<br />
              don't{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 blur-2xl opacity-50"></span>
                <span className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-black">
                  rage quit
                </span>
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/95 mb-12 font-medium leading-relaxed drop-shadow-lg">
              Full-stack developer. CS student who coded his way here.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button className="glass px-8 py-4 rounded-2xl border-2 border-white/30 hover:border-white/50 transition-all hover:scale-105 group">
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  View Projects
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 rounded-2xl font-bold text-gray-900 hover:scale-105 transition-all shadow-2xl shadow-orange-500/30">
                Get Resume
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center z-30 animate-bounce">
          <div className="glass px-8 py-4 rounded-full border-2 border-white/40 backdrop-blur-xl shadow-2xl">
            <p className="text-base text-white font-semibold flex items-center gap-3">
              <span className="relative flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                <span className="relative inline-flex rounded-full h-8 w-8 bg-white/20 border-2 border-white items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </span>
              scroll to fly in
            </p>
          </div>
        </div>

        {/* Sound Toggle - Bottom Left */}
        <button
          onClick={() => setIsSoundOn(!isSoundOn)}
          className="absolute bottom-8 left-8 z-30 w-12 h-12 glass rounded-full flex items-center justify-center border-2 border-white/30 hover:border-white/50 transition-all hover:scale-110 shadow-xl backdrop-blur-xl"
        >
          <span className="text-2xl">{isSoundOn ? "🔊" : "🔇"}</span>
        </button>
      </div>
    </section>
  );
}
