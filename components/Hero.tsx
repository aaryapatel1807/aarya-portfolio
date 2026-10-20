"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/scroll";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !sceneRef.current) return;

    // Hero 3D Fly-In Animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sceneRef.current,
        {
          scale: 0.7,
          z: -300,
          opacity: 0.5,
        },
        {
          scale: 1,
          z: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom 60%",
            scrub: 1,
            // markers: true, // Enable for debugging
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-container"
    >
      <div
        ref={sceneRef}
        className="relative z-10 text-center px-6 transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          Hey, I'm <span className="text-[var(--accent)]">Aarya</span>
        </h1>
        
        <p className="text-2xl md:text-3xl mb-8 text-gray-600 dark:text-gray-400">
          Building digital experiences
        </p>
        
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Full-stack developer crafting intuitive applications with modern tech.
        </p>

        {/* Project Pins Preview */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["Elysia", "NutriAI", "LearnFlow", "PathForge", "Local Finder"].map((project) => (
            <div
              key={project}
              className="px-4 py-2 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full text-sm hover:bg-[var(--accent)]/20 transition-colors cursor-pointer"
            >
              📍 {project}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          scroll to explore
        </p>
        <svg
          className="w-6 h-6 mx-auto text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950"></div>
    </section>
  );
}
