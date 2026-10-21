"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const targetCount = 1247; // Simulated visitor count

  useEffect(() => {
    // Animate count up on mount
    gsap.to({ value: 0 }, {
      value: targetCount,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].value));
      },
    });
  }, []);

  return (
    <div className="fixed top-6 left-6 z-50 glass px-5 py-3 rounded-2xl shadow-2xl border-2 border-white/20 dark:border-white/10">
      <div className="flex items-center gap-2">
        <span className="text-xl">👀</span>
        <div className="text-sm">
          <p className="font-semibold tabular-nums">{count.toLocaleString()}</p>
          <p className="text-xs text-gray-500">visitors</p>
        </div>
      </div>
    </div>
  );
}
