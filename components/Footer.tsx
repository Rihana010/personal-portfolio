"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

function useISTTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  const time = useISTTime();
  const [year, setYear] = useState("");
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(".foot-line", {
        y: "0%",
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".foot-title", start: "top 85%" },
      });
    }, root);

    // magnetic button (desktop only)
    const el = btn.current;
    let off: (() => void) | undefined;
    if (el && window.matchMedia("(pointer: fine)").matches) {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      off = () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    }
    return () => {
      ctx.revert();
      off?.();
    };
  }, []);

  return (
    <footer id="contact" ref={root} className="bg-ink px-[var(--gutter)] pb-8 pt-28 text-cream">
      <div className="mx-auto max-w-[1600px]">
        <p className="label mb-8 text-cream/60">(03) Contact</p>
        <h2 className="foot-title display text-[clamp(3rem,12.5vw,14rem)]">
          <span className="mask">
            <span className="mask-in foot-line">Let&apos;s build</span>
          </span>
          <span className="mask">
            <span className="mask-in foot-line">
              <span className="serif-i text-vermilion">something</span>.
            </span>
          </span>
        </h2>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-8">
          <a
            ref={btn}
            href="mailto:aysharihana010@gmail.com"
            className="display inline-block text-[clamp(1.3rem,3vw,2.6rem)] text-vermilion underline decoration-1 underline-offset-[0.25em]"
          >
            aysharihana010@gmail.com
          </a>
          <ul className="label flex gap-8">
            <li>
              <a className="u-link" href="https://github.com/Rihana010" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                className="u-link"
                href="https://www.linkedin.com/in/aysha-rihana-21a6a7335"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="label mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-cream/20 pt-5 text-cream/60">
          <span suppressHydrationWarning>© {year} Aysha Rihana</span>
          <span suppressHydrationWarning>Mangaluru, IN · {time || "--:--"} IST</span>
        </div>
      </div>
    </footer>
  );
}
