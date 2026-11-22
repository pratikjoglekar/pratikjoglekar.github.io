"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

/*
 * Geometry traced from the Sutra logo artwork (558×432 source, kept in source units).
 * One thread runs from the top dot, turns left, crosses right, turns down and leaves
 * at the bottom-left dot; a second stroke rises from the lower left and tucks in front
 * of the right-hand turn, separated by a hairline gap.
 */
const THREAD =
  "M352 107.5H193C178 107.5 154 128 154 148C154 170 166 184.5 193 184.5H400C450 184.5 471 208 471 245C471 298 440 349.5 400 349.5H180"
const TOP_TAPER = "M350 90.5C380 90.5 396 86 404 75C398 100 382 124.5 350 124.5Z"
const BOTTOM_TAPER = "M182 332.5C165 334 140 356 117 394C130 382 150 372 182 366.5Z"
const RISING_STROKE =
  "M83 328C88 288 125 250 200 250H428C452 250 470 262 474 281L452 285H200C150 285 105 293 83 328Z"
/** The hairline where the rising stroke passes in front of the right-hand turn. */
const CROSSING_GAP = "M430 246C458 247 474 260 478 281"

/* Centrelines the loading animation draws along, in drawing order. */
const DRAW_THREAD =
  "M404 75C398 95 385 107.5 352 107.5H193C178 107.5 154 128 154 148C154 170 166 184.5 193 184.5H400C450 184.5 471 208 471 245C471 298 440 349.5 400 349.5H182C160 350 135 362 117 394"
const DRAW_RISING = "M83 328C90 290 130 267.5 200 267.5H478"

/**
 * Sutra's logo: an S drawn as a single thread (sūtra means thread, and a sutra is
 * knowledge distilled into the fewest words). Colour comes from `currentColor`.
 *
 * `active` is the loading state: the thread draws out of the top dot, the second
 * stroke follows, the bottom dot lands, then the thread runs out and starts again.
 * It holds still for visitors who prefer reduced motion.
 */
export default function SutraMark({ className, active = false }: { className?: string; active?: boolean }) {
  const id = useId().replace(/:/g, "")
  const threadMask = `${id}-thread`
  const risingMask = `${id}-rising`

  return (
    <svg viewBox="54 15 440 440" aria-hidden className={cn("shrink-0", active && "sutra-loop", className)} fill="currentColor">
      <defs>
        <mask id={threadMask} maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="460">
          <path
            d={DRAW_THREAD}
            pathLength={1}
            className="sutra-draw-thread"
            fill="none"
            stroke="#fff"
            strokeWidth="48"
          />
          <path d={CROSSING_GAP} fill="none" stroke="#000" strokeWidth="8" />
        </mask>
        <mask id={risingMask} maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="460">
          <path
            d={DRAW_RISING}
            pathLength={1}
            className="sutra-draw-rising"
            fill="none"
            stroke="#fff"
            strokeWidth="52"
          />
        </mask>
      </defs>

      <g mask={`url(#${threadMask})`}>
        <path d={THREAD} fill="none" stroke="currentColor" strokeWidth="34" />
        <path d={TOP_TAPER} />
        <path d={BOTTOM_TAPER} />
      </g>
      <path d={RISING_STROKE} mask={`url(#${risingMask})`} />

      <circle cx="442.5" cy="85.5" r="18.5" className="sutra-dot sutra-dot-top" />
      <circle cx="78.5" cy="384" r="18.5" className="sutra-dot sutra-dot-bottom" />
    </svg>
  )
}
