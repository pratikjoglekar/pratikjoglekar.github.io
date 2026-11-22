"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Monogram from "@/components/ds/Monogram";
import AskAboutThis from "@/components/case-study/AskAboutThis";
import { useAskMe } from "@/components/AskMe";

/** Scroll distance (px) in one direction before the bar reacts, so jitter never flickers it. */
const THRESHOLD = 10;
/** Near the top of the page the bar always shows. */
const TOP_ZONE = 40;

/**
 * The case-study bar: back to all work, Ask Sutra, and home.
 * It tucks away while reading down and returns on a deliberate scroll up. It also
 * stays in view when it matters most: near the top, at the end of the page (next case
 * study and footer), while keyboard focus is inside it, and while Sutra is open.
 */
export default function StickyHome() {
  const { isOpen: sutraOpen } = useAskMe();
  const [scrolledAway, setScrolledAway] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [focused, setFocused] = useState(false);
  const anchor = useRef(0); // scroll position where the current direction began
  const lastY = useRef(0);

  // Direction with a threshold: only a real scroll down hides it, only a real scroll up shows it.
  useEffect(() => {
    lastY.current = anchor.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // direction changed: restart measuring from here
      if ((y > lastY.current) !== (lastY.current > anchor.current)) anchor.current = lastY.current;
      lastY.current = y;
      if (y <= TOP_ZONE) return setScrolledAway(false);
      const moved = y - anchor.current;
      if (moved > THRESHOLD) setScrolledAway(true);
      else if (moved < -THRESHOLD) setScrolledAway(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // End of the page: once the next case study or the footer is on screen, keep it shown.
  useEffect(() => {
    const ends = document.querySelectorAll("section[aria-labelledby='next-title'], footer");
    if (!ends.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setAtEnd(seen.size > 0);
    });
    ends.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const visible = !scrolledAway || atEnd || focused || sutraOpen;

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      // Slides, never pops: in on the site's soft ease (0.6s), out a little quicker (0.4s).
      // The transition itself lives on .sutra-aware in globals.css.
      style={{ "--bar-dur": visible ? "600ms" : "400ms" } as React.CSSProperties}
      className={`
        sutra-aware fixed top-0 left-0 right-0 z-50
        h-16
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="flex h-full items-center border-b border-stone bg-eggshell/85 px-4 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-page items-center md:px-12 justify-between">
          <Link
            href="/#work"
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 -ml-3 text-body-sm font-medium text-ink"
          >
            <span aria-hidden>←</span> All work
          </Link>
          <div className="flex items-center gap-2">
          <AskAboutThis compact />
          <Link
            href="/"
            aria-label="Pratik Joglekar, home"
            className="group -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
          >
            <Monogram part className="h-6 w-6" />
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
