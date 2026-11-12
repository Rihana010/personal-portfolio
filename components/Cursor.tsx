"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/** Ink dot that grows into a labelled circle on [data-cursor="Label"] and a ring on links. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const withLabel = t?.closest<HTMLElement>("[data-cursor]");
      const link = t?.closest("a, button");
      if (withLabel) {
        if (label.current) label.current.textContent = withLabel.dataset.cursor ?? "";
        el.classList.add("is-active");
        el.classList.remove("is-link");
      } else if (link) {
        el.classList.add("is-link");
        el.classList.remove("is-active");
      } else {
        el.classList.remove("is-active", "is-link");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden>
      <span ref={label} className="label" />
    </div>
  );
}
