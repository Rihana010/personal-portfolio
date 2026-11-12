import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";

const display = localFont({
  variable: "--f-display",
  display: "swap",
  src: [
    { path: "./fonts/schibsted-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});
const serif = localFont({
  variable: "--f-serif",
  display: "swap",
  src: [{ path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" }],
});
const mono = localFont({
  variable: "--f-mono",
  display: "swap",
  src: [{ path: "./fonts/geist-mono-latin-400-normal.woff2", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  title: "Aysha Rihana — Full-Stack Builder & ML Engineer",
  description:
    "Portfolio of Aysha Rihana, CSE (AI & ML) student at AJIET Mangaluru. Atlas, Tutor., CampusX, Research-Pilot and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <div className="grain" aria-hidden />
        <Loader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
