"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { useEffect } from "react";
import { stats } from "@/data/projects";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = el.dataset.final ?? "";
      });
      return;
    }
    const ctx = gsap.context(() => {
      // heading lines
      gsap.to(".about-line", {
        y: "0%",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".about-title", start: "top 85%" },
      });

      // bento cards: stagger in
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".bento", start: "top 80%" },
        }
      );

      // image parallax inside the big card
      gsap.fromTo(
        ".about-img",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".bento", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // count-up
      root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count!);
        const dec = parseInt(el.dataset.dec ?? "0", 10);
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = o.v.toFixed(dec);
          },
        });
      });

      // fade-ups
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="mx-auto max-w-[1600px] px-[var(--gutter)] py-28 md:py-40">
      <div className="mb-14 grid grid-cols-12 gap-x-4">
        <p className="label col-span-12 mb-6 text-muted md:col-span-3 md:mb-0">(01) About</p>
        <h2 className="about-title display col-span-12 text-[clamp(2.4rem,6.4vw,6.5rem)] md:col-span-9">
          <span className="mask">
            <span className="mask-in about-line">I turn ideas into</span>
          </span>
          <span className="mask">
            <span className="mask-in about-line">
              working <span className="serif-i text-vermilion">products</span>,
            </span>
          </span>
          <span className="mask">
            <span className="mask-in about-line">not just notebooks.</span>
          </span>
        </h2>
      </div>

      <div className="bento grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-4 md:gap-4">
        {/* big image card */}
        <a
          href="https://www.linkedin.com/in/aysha-rihana-21a6a7335"
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          className="bento-card group relative col-span-2 aspect-[4/5] overflow-hidden rounded-xl bg-ink md:col-span-6 md:row-span-4 md:aspect-auto md:min-h-[640px]"
        >
          <Image
            src="/images/about-portrait.jpg"
            alt="Aysha Rihana smiling in a pinstripe blazer"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="about-img scale-[1.14] object-cover object-top grayscale contrast-110 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <h3 className="display absolute bottom-14 left-6 text-[clamp(2.4rem,4.6vw,4.4rem)] text-cream">
            About me.
          </h3>
          <span className="label absolute bottom-6 left-6 text-cream">↳ Read more on LinkedIn</span>
        </a>

        {/* bio */}
        <div className="bento-card col-span-2 flex flex-col justify-between rounded-xl bg-surface p-6 md:col-span-6">
          <p className="label mb-6 text-muted">Aysha Rihana</p>
          <p className="text-[1.05rem] leading-snug md:text-[1.15rem]">
            Second-year CSE (AI &amp; ML) student at AJIET, Mangaluru. Co-technical
            coordinator of Artifex, the AI/ML department committee. I build
            full-stack apps and ML systems, and I ship them.
          </p>
        </div>

        {/* stats */}
        {stats.map((s) => (
          <div
            key={s.label}
            className="bento-card flex flex-col justify-between rounded-xl bg-surface p-6 md:col-span-3"
          >
            <span className="display text-[clamp(2.4rem,4.6vw,4.4rem)] tabular-nums">
              <span
                data-count={s.value}
                data-dec={s.decimals}
                data-final={s.value.toFixed(s.decimals)}
              >
                {s.value.toFixed(s.decimals)}
              </span>
              <span className="serif-i text-vermilion">{s.suffix}</span>
            </span>
            <span className="label mt-6 text-muted">{s.label}</span>
          </div>
        ))}

        {/* role */}
        <div className="bento-card col-span-2 flex items-center justify-between rounded-xl bg-ink p-6 text-cream md:col-span-6">
          <p className="label">Co-technical coordinator</p>
          <p className="serif-i text-3xl">Artifex</p>
        </div>
      </div>

      <p data-fade className="label mt-8 max-w-xl text-muted">
        Azure AI Essentials · Prompt Engineering for GenAI · Python (Infosys Springboard) ·
        LeetCode in C++ · RC plane aeromodelling workshop
      </p>
    </section>
  );
}
