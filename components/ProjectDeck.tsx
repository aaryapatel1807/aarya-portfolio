"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Project {
  name: string;
  description: string;
  tech: string;
  color: string;
}

const projects: Project[] = [
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
  const [activeStop, setActiveStop] = useState(0);

  useEffect(() => {
    if (!deckRef.current) return;

    // Initial card stack arrangement
    const cards = gsap.utils.toArray<HTMLDivElement>(`.project-card`);

    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: cards.length - index,
        y: index * 10,
        rotateZ: index * 3,
        scale: 1 - index * 0.04,
      });
    });

    // Scroll-triggered card swap logic
    ScrollTrigger.create({
      trigger: '.project-deck',
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self: any) => {
        const progress = self.progress;
        const stopIndex = Math.min(Math.floor(progress * projects.length), projects.length - 1);
        setActiveStop(stopIndex);
      },
      onCleanup: () => setActiveStop(0),
    });
  }, []);

  const handleNext = () => {
    const cards = gsap.utils.toArray<HTMLDivElement>(`.project-card`);
    const currentCard = cards[activeStop];

    if (!currentCard) return;

    // Animate current card out
    gsap.to(currentCard, {
      x: 800,
      rotateZ: 25,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(currentCard, {
          x: 0,
          rotateZ: 0,
          opacity: 1,
          scale: 1,
          zIndex: 0,
        });
        setActiveStop((prev) => (prev + 1) % projects.length);

        // Rearrange stack with smooth animation
        cards.forEach((card, index) => {
          const newIndex = (index - activeStop - 1 + cards.length) % cards.length;
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
    <section className="selected-projects section-padding" id="projects">
      <h2 className="text-4xl font-bold mb-12 text-center">Selected Work</h2>
      <p className="text-lg text-center text-gray-500 mb-16">
        Projects I've built. Pick a card to explore.
      </p>

      <div
        ref={deckRef}
        className="project-deck relative w-full max-w-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden"
        style={{ height: "600px" }}
      >
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`project-card rounded-3xl shadow-2xl cursor-pointer overflow-hidden border-4 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-[1.05] relative group`}
            style={{ transitionTransform: `scale(${index <= activeStop ? 1 : 0.9})` }}
          >
            {/* Card front */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/95 to-white p-8 flex flex-col justify-end"
            >
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              <p className="text-xs text-gray-500">{project.tech}</p>
            </div>

            {/* Card back (flipped) */}
            <div
              className="absolute inset-0 bg-gray-900/90 backface-hidden rounded-3xl p-8 flex flex-col justify-end"
              style={{ transform: `rotateY(${activeStop >= index ? 180 : 0}deg)`, backfaceVisibility: "hidden", transition: "transform 0.4s power2.out" }}
            >
              <p className="text-center text-xs text-gray-400 py-8">View details</p>
            </div>

            {/* Flip interaction on hover */}
            <div
              className="absolute inset-0 group-hover:rotate-y-180 group-hover:transition-transform duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front content already rendered above */}
            </div>
          </div>
        ))}
      </div>

      <p className="my-16 text-center text-sm text-gray-400">pick a card →</p>
    </section>
  );
}