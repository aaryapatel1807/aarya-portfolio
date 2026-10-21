"use client";

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  // Initialize Lenis smooth scroll
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    smoothTouch: false, // Disabled for mobile performance
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis to GSAP ticker
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  // Disable lag smoothing
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollTo(target: string | HTMLElement, options?: any) {
  lenis?.scrollTo(target, options);
}

export { gsap, ScrollTrigger };
