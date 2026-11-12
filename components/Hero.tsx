"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useAfterLoad, prefersReducedMotion } from "@/lib/motion";
import Marquee from "./Marquee";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useAfterLoad(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".hero-line", { y: "0%", duration: 1.4, stagger: 0.12 }, 0.05)
        .to(".hero-photo", { clipPath: "inset(0% 0 0 0)", duration: 1.5 }, 0.1)
        .to(".hero-photo img", { scale: 1, duration: 1.8 }, 0.1)
        .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.7);

      // parallax on portrait + headline drift
      gsap.to(".hero-photo img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-title", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  });

  return (
    <section id="top" ref={root} className="relative pt-28">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-4 px-[var(--gutter)] pb-10 md:min-h-[86svh]">
        <h1
          className="hero-title display col-span-12 mt-6 self-start text-[clamp(3.2rem,10.2vw,11rem)] md:col-span-9 md:mt-14"
          aria-label="Full-Stack Builder and ML Engineer"
        >
          <span className="mask">
            <span className="mask-in hero-line">Full-Stack</span>
          </span>
          <span className="mask">
            <span className="mask-in hero-line">Builder &amp;</span>
          </span>
          <span className="mask">
            <span className="mask-in hero-line">
              <span className="serif-i text-vermilion">ML Engineer</span>.
            </span>
          </span>
        </h1>

        <div
          ref={photo}
          className="hero-photo relative col-span-8 col-start-5 mt-10 aspect-[4/5] overflow-hidden rounded-xl [clip-path:inset(100%_0_0_0)] md:absolute md:right-[var(--gutter)] md:top-28 md:mt-0 md:w-[24vw] md:max-w-[380px]"
        >
          <Image
            src="/images/hero-portrait.jpg"
            alt="Portrait of Aysha Rihana"
            fill
            priority
            sizes="(min-width: 768px) 24vw, 66vw"
            className="scale-[1.18] object-cover object-top grayscale contrast-110"
          />
        </div>

        <p
  data-hero-fade
  className="col-span-12 mt-10 max-w-[34rem] self-end text-[clamp(1.35rem,2.1vw,2rem)] leading-[1.15] tracking-[-0.02em] opacity-0 [transform:translateY(24px)] md:col-span-6 md:col-start-7 md:mt-0 md:justify-self-end md:text-right"
>
  Hi, I&apos;m <span className="serif-i text-vermilion">Aysha Rihana</span>. I build AI
  products that ship.{" "}
  <span className="text-muted">Atlas: validated end-to-end on 20 datasets.</span>
</p>

        <div
          data-hero-fade
          className="label col-span-12 mt-8 flex items-center justify-between border-t border-ink/20 pt-4 opacity-0 [transform:translateY(24px)] md:mt-10"
        >
          <span>CSE · AI &amp; ML · AJIET</span>
          <span className="text-muted">Scroll ↓</span>
          <span className="hidden sm:inline">Class of 2029</span>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
