"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(".work-line", {
        y: "0%",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".work-title", start: "top 85%" },
      });

      // letter-spacing tightens as the title scrolls through
      gsap.fromTo(
        ".work-title",
        { letterSpacing: "0.02em" },
        {
          letterSpacing: "-0.05em",
          ease: "none",
          scrollTrigger: { trigger: ".work-title", start: "top 90%", end: "top 30%", scrub: true },
        }
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card");
        cards.forEach((card, i) => {
          const inner = card.querySelector(".work-inner");
          // reveal on enter
          gsap.fromTo(
            card.querySelector(".work-visual"),
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.3,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 75%" },
            }
          );
          // stacking: previous card shrinks + dims as the next one slides over it
          if (i < cards.length - 1) {
            gsap.to(inner, {
              scale: 0.95,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: "top 12%",
                scrub: true,
              },
            });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="px-[var(--gutter)] pb-28">
      <div className="mx-auto mb-12 grid max-w-[1600px] grid-cols-12 items-end gap-x-4">
        <p className="label col-span-12 mb-6 text-muted md:col-span-3 md:mb-0">(02) Work</p>
        <h2 className="work-title display col-span-9 text-[clamp(3rem,9vw,9.5rem)]">
          <span className="mask">
            <span className="mask-in work-line">
              Selected <span className="serif-i text-vermilion">Work</span>.
            </span>
          </span>
        </h2>
        <p className="display col-span-3 mb-[0.5vw] text-right text-[clamp(1.4rem,3vw,3rem)] leading-none text-muted">
          ({String(projects.length).padStart(2, "0")})
        </p>
      </div>

      <div className="mx-auto max-w-[1600px]">
        {projects.map((p, i) => (
          <article
            key={p.n}
            className="work-card md:sticky"
            style={{ top: `calc(5.5rem + ${i * 0.6}rem)` }}
          >
            <div className="work-inner mb-6 grid origin-top grid-cols-12 gap-x-4 gap-y-8 rounded-2xl border border-ink/15 bg-cream p-5 shadow-[0_-1px_0_rgba(20,20,20,0.06)] md:mb-10 md:min-h-[68svh] md:p-8">
              {/* left: meta */}
              <div className="col-span-12 flex flex-col justify-between md:col-span-5">
                <div>
                  <div className="label mb-8 flex items-center justify-between text-muted">
                    <span>{p.n} / {String(projects.length).padStart(2, "0")}</span>
                    <span>{p.role}</span>
                  </div>
                  <h3
                    data-cursor={p.live || p.github ? "View" : undefined}
                    className="display text-[clamp(2.6rem,6vw,6.2rem)] transition-transform duration-500 ease-out hover:translate-x-2"
                  >
                    {p.name}
                  </h3>
                  <p className="serif-i mt-3 text-2xl text-muted md:text-3xl">{p.kicker}</p>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="label rounded-full border border-ink/25 px-3 py-1.5">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* right: visual + case study */}
              <div className="col-span-12 flex flex-col gap-6 md:col-span-7">
                <div
                  className="work-visual group relative aspect-[2/1] overflow-hidden rounded-xl bg-surface"
                  data-cursor={p.live || p.github ? "View" : undefined}
                >
                  <Image
                    src={`/images/projects/0${i + 1}.png`}
                    alt={`${p.name} — ${p.kicker} (illustration)`}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-[1.05rem] leading-snug md:text-[1.15rem]">{p.problem}</p>

                <ul className="divide-y divide-ink/15 border-y border-ink/15">
                  {p.points.map((pt) => (
                    <li key={pt.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                      <span className="label pt-0.5 text-vermilion">{pt.label}</span>
                      <span className="leading-snug">{pt.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="label flex gap-6">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="u-link">
                      Live ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="u-link">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
