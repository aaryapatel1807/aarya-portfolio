"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/scroll";

interface TimelineStop {
  year: string;
  month: string;
  title: string;
  description: string;
}

const timelineStops: TimelineStop[] = [
  {
    year: "2024",
    month: "Jan",
    title: "Started Learning Web Dev",
    description: "Dove into React and modern JavaScript. Built my first interactive components.",
  },
  {
    year: "2024",
    month: "Apr",
    title: "First Full-Stack Project",
    description: "Created Elysia - a complete application with backend and database integration.",
  },
  {
    year: "2024",
    month: "Jun",
    title: "Shipped NutriAI",
    description: "Built an AI-powered nutrition tracking app. Learned about ML integration.",
  },
  {
    year: "2024",
    month: "Aug",
    title: "LearnFlow Launch",
    description: "Developed an adaptive learning platform. Focused on UX and accessibility.",
  },
  {
    year: "2024",
    month: "Oct",
    title: "PathForge",
    description: "Career planning tool with data visualization. Mastered D3.js and charts.",
  },
  {
    year: "Now",
    month: "",
    title: "Building Portfolio",
    description: "Creating this interactive scroll-driven experience. Learning GSAP and advanced animations.",
  },
];

export default function TimelineJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentStop, setCurrentStop] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Set up SVG path for drawing animation
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const ctx = gsap.context(() => {
      // Path drawing animation
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Card and dot updates based on scroll progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const progress = self.progress;
          const stopIndex = Math.min(
            Math.floor(progress * timelineStops.length),
            timelineStops.length - 1
          );
          setCurrentStop(stopIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="min-h-[300vh] relative py-20 px-6 bg-gradient-to-b from-purple-950 via-indigo-950 to-blue-950 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
      <div className="absolute inset-0 bg-grain opacity-20"></div>
      
      <div className="sticky top-20 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-2xl">The Journey</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-3 font-medium">
            Developer by passion, learner by nature.
          </p>
          <p className="text-lg text-white/70">
            {timelineStops.length} stops from 2024 to now. Scroll to walk the path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Card - Dynamic Content */}
          <div ref={cardRef} className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            
            <div className="relative glass rounded-3xl p-10 shadow-2xl backdrop-blur-xl border-2 border-white/30 hover:border-white/50 transition-all">
              <div className="flex items-baseline gap-3 mb-6">
                <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {timelineStops[currentStop].year}
                </h3>
                {timelineStops[currentStop].month && (
                  <span className="text-2xl text-white/60 font-bold">
                    {timelineStops[currentStop].month}
                  </span>
                )}
              </div>
              <h4 className="text-3xl font-bold mb-4 text-white">
                {timelineStops[currentStop].title}
              </h4>
              <p className="text-lg text-white/80 leading-relaxed">
                {timelineStops[currentStop].description}
              </p>
              
              {/* Progress indicator */}
              <div className="mt-6 flex items-center gap-2">
                {timelineStops.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentStop ? "w-12 bg-gradient-to-r from-yellow-400 to-orange-500" : "w-6 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - SVG Path + Dots */}
          <div className="relative">
            <svg
              viewBox="0 0 400 500"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Journey Path */}
              <path
                ref={pathRef}
                d="M 50 50 Q 150 100, 100 200 T 200 300 Q 250 350, 200 450"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Dots Timeline */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-12">
              {timelineStops.map((stop, index) => (
                <div key={index} className="relative">
                  {/* Glow for active dot */}
                  {index <= currentStop && (
                    <div className="absolute inset-0 w-6 h-6 -translate-x-1 -translate-y-1 bg-yellow-400 rounded-full blur-lg animate-pulse"></div>
                  )}
                  <div
                    className={`relative w-5 h-5 rounded-full border-3 transition-all duration-500 ${
                      index <= currentStop
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 border-white scale-150 shadow-2xl"
                        : "bg-white/20 border-white/40"
                    }`}
                    title={stop.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Label */}
        <div className="text-center mt-10">
          <div className="glass inline-block px-6 py-3 rounded-full border-2 border-white/30">
            <p className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-yellow-400">2024</span>
              <span className="text-white/50">→</span>
              <span className="text-orange-400">now</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
