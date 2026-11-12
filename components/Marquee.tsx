"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { stack } from "@/data/projects";

/** Infinite stack marquee whose speed reacts to scroll velocity. */
export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = track.current!;
    const half = () => el.scrollWidth / 2;
    let x = 0;
    let boost = 0;
    let lastY = window.scrollY;

    const tick = () => {
      const y = window.scrollY;
      const v = Math.min(Math.abs(y - lastY), 60);
      lastY = y;
      boost += (v - boost) * 0.1;
      x -= 0.6 + boost * 0.35;
      if (-x >= half()) x += half();
      gsap.set(el, { x });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const items = [...stack, ...stack];

  return (
    <div className="overflow-hidden border-y border-ink/20 py-5" aria-label="Tech stack">
      <div ref={track} className="flex w-max gap-3 will-change-transform">
        {items.map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= stack.length}
            className="label whitespace-nowrap rounded-full border border-ink/25 bg-surface px-5 py-2.5"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
