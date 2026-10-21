"use client";

import { useEffect } from "react";

export default function KeyboardShortcuts() {
  useEffect(() => {
    // G L M I R mapping (GitHub, LinkedIn, Mail, Instagram, Resume)
    const shortcuts: Record<string, () => void> = {
      g: () => window.open("https://github.com/aaryapatel1807", "_blank"),
      l: () => window.open("https://linkedin.com/in/aarya-patel", "_blank"),
      m: () => (window.location.href = "mailto:aarya@example.com"),
      i: () => window.open("https://instagram.com/aarya", "_blank"),
      r: () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Aarya-Resume.pdf";
        link.click();
      },
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
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

  return null; // This component has no UI, just keyboard listeners
}