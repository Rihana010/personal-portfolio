"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const NAME = "Rihana.";

function finish(setShow: (v: boolean) => void) {
  window.__loaded = true;
  window.__lenis?.start();
  window.dispatchEvent(new Event("loader:done"));
  setShow(false);
}

export default function Loader() {
  const [show, setShow] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("seen-loader") === "1";
    } catch {}

    if (seen || prefersReducedMotion()) {
      finish(setShow);
      return;
    }

    window.__lenis?.stop();
    document.documentElement.classList.add("lenis-stopped");

    const counter = { v: 0 };
    const chars = nameRef.current!.querySelectorAll<HTMLElement>(".char-mask > span");

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("seen-loader", "1");
        } catch {}
        document.documentElement.classList.remove("lenis-stopped");
        finish(setShow);
      },
    });

    gsap.set(word.current, { filter: "blur(32px)", opacity: 0.25, scale: 1.04 });

    tl.to(counter, {
      v: 100,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .to(word.current, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.7, ease: "power2.inOut" }, 0)
      // wordmark exits up, name rises in
      .to(word.current, { yPercent: -110, duration: 0.7, ease: "expo.inOut" }, 1.8)
      .to(chars, { y: "0%", duration: 0.9, ease: "expo.out", stagger: 0.04 }, 2.0)
      // curtain
      .to(root.current, { yPercent: -100, duration: 1.0, ease: "expo.inOut" }, 3.0);

    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[95] bg-cream text-ink"
      role="status"
      aria-label="Loading"
    >
      <span
        ref={count}
        className="label absolute bottom-[var(--gutter)] left-[var(--gutter)] tabular-nums"
      >
        000
      </span>
      <span className="label absolute right-[var(--gutter)] bottom-[var(--gutter)] text-muted">
        Mangaluru, IN
      </span>

      <div className="absolute inset-0 grid place-items-center overflow-hidden">
        <div
          ref={word}
          className="display select-none text-[clamp(4rem,19vw,20rem)]"
          aria-hidden
        >
          portfolio
        </div>
        <div
          ref={nameRef}
          className="display absolute text-[clamp(3.5rem,15vw,15rem)]"
          aria-hidden
        >
          {NAME.split("").map((c, i) => (
            <span key={i} className="char-mask">
              <span>{c}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
