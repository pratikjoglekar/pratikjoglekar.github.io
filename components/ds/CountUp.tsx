"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Counts every number inside `value` (e.g. "−40%", "35.8%") up from zero the first time
 * it scrolls into view, keeping the surrounding text and decimals. A before → after value
 * ("10% → 31%", "57% → 7%") keeps the "before" still and runs the "after" from the
 * before number, so the count shows the change itself, up or down.
 * Renders the final value on the server and for reduced motion; screen readers
 * always get the final value.
 */
export default function CountUp({ value, duration = 1.2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" })
  const reduce = useReducedMotion()
  const parts = value.split(/(\d+(?:\.\d+)?)/) // odd indexes are numbers
  // For "before → after": the numbers after the arrow start from the ones before it.
  const arrow = parts.findIndex((p, i) => i % 2 === 0 && /→/.test(p))
  const before = arrow > 0 ? parts.slice(0, arrow).filter((_, i) => i % 2) : []
  const from = (i: number) => {
    if (arrow < 0) return "0"
    if (i < arrow) return null // a "before" number: stays put
    return before[Math.floor((i - arrow) / 2)] ?? "0"
  }

  // Before it's seen, show the starting numbers (the row is still hidden by its reveal, so nothing flashes).
  useEffect(() => {
    if (reduce || inView || !ref.current) return
    ref.current.querySelectorAll<HTMLSpanElement>("[data-n]").forEach((el) => {
      el.textContent = format(parseFloat(el.dataset.from!), el.dataset.n!)
    })
  }, [reduce, inView])

  useEffect(() => {
    if (reduce || !inView || !ref.current) return
    const els = Array.from(ref.current.querySelectorAll<HTMLSpanElement>("[data-n]"))
    const controls = animate(0, 1, {
      duration,
      ease: EASE,
      onUpdate: (t) =>
        els.forEach((el) => {
          const a = parseFloat(el.dataset.from!)
          el.textContent = format(a + (parseFloat(el.dataset.n!) - a) * t, el.dataset.n!)
        }),
    })
    return () => controls.stop()
  }, [reduce, inView, duration])

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        {parts.map((p, i) =>
          i % 2 && from(i) !== null ? (
            <span key={i} data-n={p} data-from={from(i)!}>
              {p}
            </span>
          ) : (
            p
          )
        )}
      </span>
    </span>
  )
}

function format(n: number, target: string) {
  const decimals = target.includes(".") ? target.split(".")[1].length : 0
  return n.toFixed(decimals)
}
