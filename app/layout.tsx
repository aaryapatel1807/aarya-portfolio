// === jameschugh.com Reverse-Engineered Scroll System ===
// Global Lenis + GSAP initialization (matches jameschugh.com mechanics)
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis (estimated config - refine through iteration)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Connect Lenis to GSAP ScrollTrigger
lenis.on("scroll", () => ScrollTrigger.update());

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" style={{ overflow: 'clip' }}>{children}</body>
    </html>
  );
}
