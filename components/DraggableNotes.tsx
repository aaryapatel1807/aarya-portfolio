"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const notes = [
  { text: "these notes move ;)", color: "bg-yellow-200" },
  { text: "Built with React & Next.js", color: "bg-pink-200" },
  { text: "GSAP makes it smooth", color: "bg-blue-200" },
  { text: "Drag me anywhere!", color: "bg-green-200" },
];

export default function DraggableNotes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const draggables = Draggable.create(".draggable-note", {
      type: "x,y",
      bounds: window,
      inertia: true,
      onDragStart: function() {
        gsap.to(this.target, {
          scale: 1.1,
          rotate: 5,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          duration: 0.2,
          zIndex: 100,
        });
      },
      onDragEnd: function() {
        gsap.to(this.target, {
          scale: 1,
          rotate: 0,
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          duration: 0.3,
          zIndex: 10,
        });
      },
    });

    return () => {
      draggables.forEach((d) => d.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {notes.map((note, index) => (
        <div
          key={index}
          className={`draggable-note absolute ${note.color} dark:opacity-90 p-4 rounded-lg shadow-lg cursor-grab active:cursor-grabbing transform rotate-${index * 2} select-none`}
          style={{
            left: `${20 + index * 15}%`,
            top: `${10 + index * 8}px`,
            width: "180px",
            zIndex: 10,
          }}
        >
          <p className="text-sm font-medium text-gray-800">{note.text}</p>
        </div>
      ))}
    </div>
  );
}
