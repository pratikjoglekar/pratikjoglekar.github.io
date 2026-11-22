"use client"

import type { PointerEvent } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { Eyebrow } from "@/components/ds/primitives"
import { Reveal } from "@/components/ds/Motion"
import WaveText from "@/components/ds/WaveText"

/* The title follows the cursor on a spring; the arrow uses a looser spring so it trails behind. */
const TITLE = { stiffness: 140, damping: 18, mass: 0.7 }
const ARROW = { stiffness: 70, damping: 14, mass: 0.9 }

type Props = {
  href: string
  company: string
  years: string
  title: string
  metric: string
  metricLabel: string
}

/** "Next case study" block: the whole block is clickable, only the title is the link. */
export default function NextProjectCard({ href, company, years, title, metric, metricLabel }: Props) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const hover = useMotionValue(0)

  const tx = useSpring(useTransform(px, (v) => v * 12), TITLE)
  const ty = useSpring(useTransform(py, (v) => v * 6), TITLE)
  const ax = useSpring(useTransform([px, hover], ([x, h]: number[]) => x * 18 + h * 8), ARROW)
  const ay = useSpring(useTransform(py, (v) => v * 8), ARROW)

  function track(e: PointerEvent<HTMLElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const clamp = (v: number) => Math.max(-1, Math.min(1, v))
    px.set(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)))
    py.set(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)))
    hover.set(1)
  }
  function leave() {
    px.set(0)
    py.set(0)
    hover.set(0)
  }

  return (
    <section
      aria-labelledby="next-title"
      onPointerMove={track}
      onPointerLeave={leave}
      className="group wave-trigger relative border-t border-stone py-16 md:py-24"
    >
      <Eyebrow>Next case study</Eyebrow>
      <Reveal className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-body-sm text-smoke">
            <span className="text-ink">{company}</span> · {years}
          </p>
          <h2 id="next-title" className="mt-3 font-headline text-heading-sm font-light text-ink md:text-display">
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              <m.span style={{ x: tx, y: ty }} className="inline-block will-change-transform">
                <WaveText text={title} />
              </m.span>
            </Link>
          </h2>
        </div>
        <p className="flex items-center gap-3 md:col-span-4 md:justify-end">
          <span className="font-display text-title font-light whitespace-nowrap text-ink">{metric}</span>
          <span className="text-body-sm text-smoke">{metricLabel}</span>
          <m.span style={{ x: ax, y: ay }} className="ml-2 inline-flex will-change-transform">
            <ArrowRight aria-hidden className="h-5 w-5 text-ink" />
          </m.span>
        </p>
      </Reveal>
    </section>
  )
}
