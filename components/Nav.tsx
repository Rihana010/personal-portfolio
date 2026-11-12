"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last && y > 120;
      gsap.to(ref.current, {
        yPercent: down ? -120 : 0,
        duration: 0.6,
        ease: "expo.out",
        overwrite: true,
      });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    const lenis = window.__lenis;
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(href === "#top" ? 0 : href, { duration: 1.4 });
  };

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 px-[var(--gutter)] pt-4"
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center rounded-full border border-ink/15 bg-cream/80 px-5 py-2.5 backdrop-blur-sm"
      >
        <a href="#top" onClick={(e) => go(e, "#top")} className="display text-lg">
          AR<span className="text-vermilion">.</span>
        </a>
        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => go(e, l.href)} className="label u-link [background-size:0_1px] hover:[background-size:100%_1px]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={(e) => go(e, "#contact")}
          className="label justify-self-end sm:col-start-3 rounded-full border border-ink px-4 py-2 transition-colors hover:bg-ink hover:text-cream"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
