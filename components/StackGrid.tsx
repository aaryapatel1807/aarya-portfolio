"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/scroll";

const tools = [
  { name: "React", description: "Building dynamic user interfaces", icon: "⚛️" },
  { name: "Next.js", description: "Full-stack React framework", icon: "▲" },
  { name: "TypeScript", description: "Type-safe JavaScript", icon: "🔷" },
  { name: "Node.js", description: "Backend JavaScript runtime", icon: "🟢" },
  { name: "GSAP", description: "Professional-grade animations", icon: "🎬" },
  { name: "Tailwind", description: "Utility-first CSS framework", icon: "🎨" },
  { name: "PostgreSQL", description: "Relational database", icon: "🐘" },
  { name: "Docker", description: "Container orchestration", icon: "🐳" },
  { name: "Git", description: "Version control system", icon: "📚" },
  { name: "Figma", description: "Design and prototyping", icon: "🎯" },
  { name: "Python", description: "Data science & scripting", icon: "🐍" },
  { name: "MongoDB", description: "NoSQL database", icon: "🍃" },
  { name: "GraphQL", description: "API query language", icon: "◈" },
  { name: "AWS", description: "Cloud infrastructure", icon: "☁️" },
  { name: "Jest", description: "JavaScript testing", icon: "🃏" },
  { name: "Prisma", description: "Database ORM", icon: "⬡" },
  { name: "Framer", description: "Motion design tool", icon: "🔲" },
];

export default function StackGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Unwrap animation on scroll into view
      gsap.fromTo(
        ".stack-tool",
        {
          scale: 0,
          opacity: 0,
          rotateY: 90,
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          stagger: {
            amount: 0.8,
            from: "center",
            grid: "auto",
          },
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 70%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tools.map((tool, index) => (
          <div
            key={tool.name}
            className="stack-tool relative group"
            onMouseEnter={() => setHoveredTool(tool.name)}
            onMouseLeave={() => setHoveredTool(null)}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="glass rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-white/20 dark:border-white/10">
              <div className="text-4xl mb-2 text-center">{tool.icon}</div>
              <p className="text-sm font-semibold text-center">{tool.name}</p>
            </div>

            {/* Tooltip */}
            {hoveredTool === tool.name && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-50 animate-fade-in shadow-xl">
                {tool.description}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center mt-8 text-gray-500">
        My toolkit. Hover a tool to see what I do with it.
      </p>
    </div>
  );
}
