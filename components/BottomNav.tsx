"use client";

import { useEffect, useState } from "react";
import { scrollTo } from "@/lib/scroll";

  const navItems = [
  { id: "hero", label: "Home" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      scrollTo(target, { duration: 1.2 });
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      {/* Dark solid bar matching jameschugh.com */}
      <div className="flex items-center gap-3 bg-gray-900/95 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl border-2 border-gray-700/50">
        {navItems.slice(0, -1).map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeSection === item.id
                ? "text-white bg-white/10"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
        
        {/* Resume button - Yellow CTA */}
        <button
          onClick={() => handleClick("contact")}
          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-yellow-500/30"
        >
          Resume →
        </button>
      </div>
    </nav>
  );
}
