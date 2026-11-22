import type * as React from "react"
import HeroAsk from "@/components/HeroAsk"
import { Reveal, Stagger, StaggerItem } from "@/components/ds/Motion"

/** One key word: thickens and gets the flowing wavy underline while the headline is hovered. */
function Word({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <span className="wave-word" style={{ "--i": i } as React.CSSProperties}>
      {children}
    </span>
  )
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grid grid-cols-1 items-center gap-10 pt-16 pb-20 md:grid-cols-12 md:gap-8 md:pt-28 md:pb-32"
    >
      {/* Intro lines rise in one after another on page load */}
      <Stagger immediate className="md:col-span-8">
        <StaggerItem
          as="h1"
          id="hero-title"
          className="wave-trigger max-w-4xl font-headline text-hero font-light text-balance text-ink"
        >
          I design{" "}
          <span className="hero-key">
            <Word i={0}>complex</Word> <Word i={1}>products</Word>
          </span>{" "}
          that{" "}
          <span className="hero-key hero-key-2">
            <Word i={2}>feel</Word> <Word i={3}>simple</Word>
          </span>
          .
        </StaggerItem>
        <StaggerItem as="p" className="mt-8 max-w-2xl text-body-lg text-smoke">
          For 8+ years, I have worked on products people have to use at work,
          and made them want to.
        </StaggerItem>
        {/* One quiet line: title first (what recruiters scan for), then the kinds of products.
            Each dot sits in the gap before its item; the line's left edge clips any dot that
            starts a wrapped line, so no line ever begins or ends with a stray dot. */}
        <StaggerItem
          as="p"
          className="mt-10 overflow-hidden font-mono text-mono uppercase tracking-wide text-smoke"
        >
          <span className="-ml-[3ch] flex flex-wrap">
            {["Senior Product Designer", "B2B SaaS", "Enterprise", "EdTech", "Financial services"].map((item, i) => (
              <span
                key={item}
                className="relative pl-[3ch] whitespace-nowrap before:absolute before:left-[1ch] before:content-['·']"
              >
                {/* the dots are visual; screen readers hear a comma-separated list */}
                {i > 0 && <span className="sr-only">, </span>}
                {item}
              </span>
            ))}
          </span>
        </StaggerItem>
      </Stagger>

      {/* The sphere opens the portfolio chat; on phones it sits below the intro */}
      <Reveal
        immediate
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="md:col-span-4"
      >
        <HeroAsk />
      </Reveal>
    </section>
  )
}
