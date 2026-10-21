"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/scroll";

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
    description: "Dove into web development and built interactive components.",
  },
  {
    year: "2024",
    month: "Apr",
    title: "First Full-Stack Project",
    description: "Built your first full-stack application.",
  },
  {
    year: "2024",
    month: "Jun",
    title: "Shipped NutriAI",
    description: "Built an AI-powered nutrition tracking app.",
  },
  {
    year: "2024",
    month: "Sep",
    title: "Built This Portfolio",
    description: "Designed and built your reverse-engineered portfolio.",
  },
];

export default function TimelineJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
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
          trigger: ".timeline-journey",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }, sectionRef);

    // Scroll-triggered card swap
    ScrollTrigger.create({
      trigger: ".timeline-journey",
      start: "top center",
      end: "bottom center",
      onUpdate: (self: any) => {
        const progress = self.progress;
        const stopIndex = Math.min(Math.floor(progress * timelineStops.length), timelineStops.length - 1);
        setCurrentStop(stopIndex);
      },
      onCleanup: () => setCurrentStop(0),
    });
  }, []);

  return (
    <section
      className="timeline-journey section-padding"
      id="journey"
      ref={sectionRef}
    >
      <h2 className="text-4xl font-bold mb-12 text-center">
        The Journey
      </h2>
      <p className="text-lg text-center text-gray-500 mb-12">
        5 stops from 2024 to now. Scroll to walk the path.
      </p>

      <div className="relative">
        {/* SVG Path */}
        <svg
          className="w-full h-96 md:h-[500px] relative"
          viewBox="0 0 800 600"
          ref={pathRef}
        >
          <path
            className="journey-path"
            d="M100 500
               C200 100, 600 100, 700 500"
            stroke="var(--primary)"
            strokeWidth={4}
            fill="none"
          />
          {/* Dots for each stop */}
          <g className="journey-dots">
            {timelineStops.map((stop, index) => (
              <circle
                key={stop.year}
                cx={100 + index * 150}
                cy={500}
                r={12}
                fill="var(--primary)"
                className={`dot ${currentStop === index ? "dot-active" : ""}`}
              />
            )}
          </g>
        </svg>

        {/* Active stop card */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 max-w-md text-center"
          style={{ transform: `translateY(${currentStop * 150}px)` }}
        >
          <h3 className="text-xl font-bold mb-2">{timelineStops[currentStop].title}</h3>
          <p className="text-sm text-gray-500 mb-2">{timelineStops[currentStop].year} {timelineStops[currentStop].month}</p>
          <p className="text-gray-600 line-clamp-2">{timelineStops[currentStop].description}</p>
        </div>
      </div>

      {/* Navigation dots below */}
      <div className="flex justify-center mt-8">
        {timelineStops.map((stop, index) => (
          <button
            key={stop.year}
            type="button"
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentStop === index ? "bg-primary-600 text-white" : "text-gray-400 hover:bg-gray-200"
            } transition-colors`}
            onClick={() => setCurrentStop(index)}
          >
            {stop.year}
          </button>
        ))}
      </div>
    </section>
  );
}
