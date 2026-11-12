"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const EASE = "expo.out";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

declare global {
  interface Window {
    __loaded?: boolean;
    __lenis?: import("lenis").default;
  }
}

/** Run `cb` once the loader has finished (or immediately if it already has). */
export function useAfterLoad(cb: () => void | (() => void)) {
  useEffect(() => {
    let cleanup: void | (() => void);
    let ran = false;
    const run = () => {
      if (ran) return;
      ran = true;
      cleanup = cb();
    };
    if (window.__loaded) run();
    else window.addEventListener("loader:done", run, { once: true });
    return () => {
      window.removeEventListener("loader:done", run);
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
