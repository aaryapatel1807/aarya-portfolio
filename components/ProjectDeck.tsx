"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const projects = [
  {
    name: "Elysia",
    description: "Full-stack web application with real-time features",
    tech: "React, Node.js, PostgreSQL",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "NutriAI",
    description: "AI-powered nutrition tracking and meal planning",
    tech: "Next.js, OpenAI, TailwindCSS",
    color: "from-green-500 to-teal-500",
  },
  {
    name: "LearnFlow",
    description: "Adaptive learning platform with progress tracking",
    tech: "React, Firebase, D3.js",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "PathForge",
    description: "Career planning tool with data visualization",
    tech: "Next.js, Recharts, Supabase",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Local Finder",
    description: "Location-based discovery with maps integration",
    tech: "React Native, Mapbox, Express",
    color: "from-yellow-500 to-amber-500",
  },
];

export default function ProjectDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!deckRef.current) return;

    const cards = gsap.utils.toArray<HTMLDivElement>(".project-card");
    
    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: cards.length - index,
        y: index * 10,
        rotateZ: index * 3,
        scale: 1 - index * 0.04,
      });
    });
  }, []);

  const handleNext = () => {
    const cards = gsap.utils.toArray<HTMLDivElement>(".project-card");
    const currentCard = cards[currentIndex];

    if (!currentCard) return;

    // Animate current card out with dramatic effect
    gsap.to(currentCard, {
      x: 1200,
      rotateZ: 35,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(currentCard, {
          x: 0,
          rotateZ: 0,
          opacity: 1,
          scale: 1,
          zIndex: 0,
        });
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        
        // Rearrange stack with smooth animation
        cards.forEach((card, index) => {
          const newIndex = (index - currentIndex - 1 + cards.length) % cards.length;
          gsap.to(card, {
            y: newIndex * 10,
            rotateZ: newIndex * 3,
            scale: 1 - newIndex * 0.04,
            zIndex: cards.length - newIndex,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      },
    });
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ height: "600px" }}>
      <div ref={deckRef} className="relative w-full h-full">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="project-card absolute inset-0 rounded-3xl shadow-2xl cursor-pointer overflow-hidden border-4 border-white/30 hover:border-white/50 transition-all hover:scale-[1.02] transform-gpu"
            onClick={handleNext}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-95`}></div>
            
            {/* Grain texture */}
            <div className="absolute inset-0 bg-grain opacity-20"></div>
            
            {/* Content */}
            <div className="relative z-10 text-white h-full flex flex-col justify-between p-10">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="glass inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold shadow-lg">
                    Project #{index + 1}
                  </div>
                  <span className="text-5xl drop-shadow-2xl">📍</span>
                </div>
                <h3 className="text-6xl md:text-7xl font-black mb-6 drop-shadow-2xl leading-none">{project.name}</h3>
                <p className="text-xl mb-6 opacity-95 leading-relaxed font-medium">{project.description}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.split(", ").map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30 shadow-lg">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="glass border-2 border-white/30 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-center">
                  <span className="text-base font-bold flex items-center justify-center gap-2">
                    Click to see next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <div className="glass inline-block px-6 py-3 rounded-full border-2 border-white/30 backdrop-blur-xl shadow-xl">
          <p className="text-base font-bold text-white">
            pick a card → <span className="text-yellow-400 text-xl">{currentIndex + 1}</span> <span className="text-white/50">/</span> <span className="text-white/80">{projects.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
