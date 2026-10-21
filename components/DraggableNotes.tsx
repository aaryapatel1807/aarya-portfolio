"use client";

import { useEffect, useRef } from "react";// === jameschugh.com Reverse-Engineered Draggable Elements ===
// Sticky notes and collage interaction (from About + Personal sections)

const notes = [
  { text: "these notes move ;)", color: "bg-yellow-200" },
  { text: "Your first note here", color: "bg-pink-200" },
  { text: "Another note to move", color: "bg-blue-200" },
  { text: "Move things around ;)", color: "bg-green-200" },
];

export default function DraggableNotes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const draggables = Draggable.create(".draggable-note", {
      type: "x,y",
      bounds: document.querySelector('.notes-container') || window,
      inertia: true,
      onDragStart: function() {
        gsap.to(this.target, {
          scale: 1.1,
          zIndex: 100,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          duration: 0.2,
        });
      },
      onDragEnd: function() {
        gsap.to(this.target, {
          scale: 1,
          zIndex: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          duration: 0.3,
        });
      },
    });

    return () => {
      draggables.forEach((d) => d.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full notes-container">
      {notes.map((note, index) => (
        <div
          key={index}
          className={`draggable-note absolute ${note.color} dark:opacity-90 p-4 rounded-lg shadow-lg cursor-grab active:cursor-grabbing select-none`}
          style={{
            left: `${30 + index * 25}%`,
            top: `${20 + index * 15}px`,
            width: "200px",
            zIndex: 10,
          }}
        >
          <p className="text-sm font-medium text-gray-800">{note.text}</p>
        </div>
      ))}
    </div>
  );
}
