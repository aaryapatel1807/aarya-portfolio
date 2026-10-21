"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, lenis } from "@/lib/scroll";

export default function KeyboardShortcuts({ lenis }: { lenis: any }) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextareaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase() as keyof typeof shortcuts;

      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // G L M I R mapping (GitHub, LinkedIn, Mail, Instagram, Resume)
  const shortcuts: Record<string, () => void> = {
    g: () => window.open("https://github.com/your-username", "_blank"),
    l: () => window.open("https://linkedin.com/in/your-username", "_blank"),
    m: () => (window.location.href = "mailto:your-email@example.com"),
    i: () => window.open("https://instagram.com/your-username", "_blank"),
    r: () => {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Aarya-Resume.pdf";
      link.click();
    },
  };

  return null; // This component has no UI, just keyboard listeners