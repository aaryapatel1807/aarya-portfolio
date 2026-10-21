"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/scroll";
import Hero from "@/components/Hero";
import TimelineJourney from "@/components/TimelineJourney";
import BottomNav from "@/components/BottomNav";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ThemeToggle from "@/components/ThemeToggle";
import ProjectDeck from "@/components/ProjectDeck";
import StackGrid from "@/components/StackGrid";
import DraggableNotes from "@/components/DraggableNotes";
import NotesWall from "@/components/NotesWall";
import VisitorCounter from "@/components/VisitorCounter";

export default function Home() {
  useEffect(() => {
    // Initialize smooth scroll on mount
    const lenis = initSmoothScroll();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <main className="relative">
      {/* Keyboard shortcuts listener */}
      <KeyboardShortcuts />

      {/* Theme toggle button (top-right) */}
      <ThemeToggle />

      {/* Visitor counter (top-left) */}
      <VisitorCounter />

      {/* Bottom navigation */}
      <BottomNav />

      {/* Hero Section with 3D Fly-In */}
      <Hero />

      {/* About Section with Draggable Notes */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 dark:from-gray-950 dark:via-amber-950/20 dark:to-gray-950 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute inset-0 bg-grain opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-0">
          <div className="glass inline-block px-6 py-3 rounded-full border-2 border-white/30 mb-8 backdrop-blur-xl shadow-xl">
            <p className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
              About Me
            </p>
          </div>

          <h2 className="text-6xl md:text-7xl font-black mb-8 drop-shadow-xl text-gray-900 dark:text-white">
            How I Got Here
          </h2>

          <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
            Started with curiosity, stayed for the craft. I build things that work beautifully and solve real problems.
          </p>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
            From design to deployment, I handle the full stack.
          </p>

          <div className="glass inline-block px-8 py-4 rounded-2xl border-3 border-white/30 backdrop-blur-xl shadow-2xl">
            <p className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-3xl">🎓</span>
              CS student. 2 years building. Every project shipped. 🚀
            </p>
          </div>
        </div>

        {/* Draggable sticky notes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            <DraggableNotes />
          </div>
        </div>
      </section>

      {/* Timeline Journey */}
      <TimelineJourney />

      {/* Projects Section - Card Deck */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        {/* Radial gradient background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/30 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-grain opacity-30"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-black mb-8 drop-shadow-2xl text-white">
            Selected Projects
          </h2>

          <p className="text-2xl md:text-3xl text-white/90 mb-4 font-medium">
            Things I've built. Real apps, real impact.
          </p>

          <p className="text-xl text-white/70 mb-16">
            Pick a card from the deck. Swipe through 5 projects.
          </p>

          <ProjectDeck />
        </div>
      </section>

      {/* Stack Section - Unwrap Animation */}
      <section
        id="stack"
        className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      >
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-mesh-gradient"></div>
        <div className="absolute inset-0 bg-grain opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            My Stack
          </h2>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            Everything I know, unwrapped.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            17 tools I know well, from the first sketch to the shipped build.
          </p>

          <StackGrid />
        </div>
      </section>

      {/* Notes Wall Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-cork-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              The Wall
            </h2>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
              Before you leave, leave a note.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400">
              Say hi, share feedback, or tell me what you're building. It goes up on the wall.
            </p>
          </div>

          <NotesWall />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      >
        {/* Spotlight gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-400/20 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-grain opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Let's Build Something
          </h2>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
            Open to projects and collaborations. I reply fast.
          </p>

          <div className="glass inline-block px-6 py-3 rounded-full mb-8 border-2 border-white/20 dark:border-white/10">
            <p className="text-sm font-medium">
              psst, these work on your keyboard too: G L M I R
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/aarya"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20 dark:border-white/10 hover:border-[var(--accent)]/50"
              >
                <kbd className="font-normal text-lg">G</kbd> <span className="ml-2 font-semibold">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/aarya"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20 dark:border-white/10 hover:border-[var(--accent)]/50"
              >
                <kbd className="font-normal text-lg">L</kbd> <span className="ml-2 font-semibold">LinkedIn</span>
              </a>
              <a
                href="mailto:aarya@example.com"
                className="glass px-8 py-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20 dark:border-white/10 hover:border-[var(--accent)]/50"
              >
                <kbd className="font-normal text-lg">M</kbd> <span className="ml-2 font-semibold">Email</span>
              </a>
              <a
                href="https://instagram.com/aarya"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20 dark:border-white/10 hover:border-[var(--accent)]/50"
              >
                <kbd className="font-normal text-lg">I</kbd> <span className="ml-2 font-semibold">Instagram</span>
              </a>
              <a
                href="/resume.pdf"
                download
                className="glass px-8 py-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20 dark:border-white/10 hover:border-[var(--accent)]/50"
              >
                <kbd className="font-normal text-lg">R</kbd> <span className="ml-2 font-semibold">Resume</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}