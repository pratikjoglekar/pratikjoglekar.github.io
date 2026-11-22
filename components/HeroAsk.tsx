"use client"

import type { PointerEvent } from "react"
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import Lottie from "@/components/ds/Lottie"
import SutraMark from "@/components/SutraMark"
import { useAskMe } from "@/components/AskMe"

/* Springs, not timed transitions: the motion follows the cursor and can be
   interrupted at any point, so it never snaps. */
const FOLLOW = { stiffness: 120, damping: 16, mass: 0.8 }
const PRESS = { stiffness: 200, damping: 22, mass: 0.6 }

/**
 * The home-page sphere as the front door to Sutra, the portfolio assistant.
 * On hover the sphere and the "Ask Sutra" pill lean toward the cursor (the sphere
 * more than the pill, for depth), the sphere swells and tilts, and the logo turns
 * with it. Everything eases back on leave. The pill always sits on the sphere's centre.
 */
export default function HeroAsk() {
  const { open } = useAskMe()
  const reduce = useReducedMotion()

  // Pointer position over the button, -1…1 on each axis, and hover 0…1.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const hover = useMotionValue(0)
  const x = useSpring(px, FOLLOW)
  const y = useSpring(py, FOLLOW)
  const h = useSpring(hover, PRESS)

  const blobX = useTransform(x, (v) => v * 14)
  const blobY = useTransform(y, (v) => v * 14)
  const blobRotate = useTransform(x, (v) => v * -10)
  const blobScale = useTransform(h, [0, 1], [1, 1.06])

  const pillX = useTransform(x, (v) => v * 6)
  const pillY = useTransform([y, h], ([vy, vh]: number[]) => vy * 6 - vh * 2)
  const markRotate = useTransform(x, (v) => v * 12)
  const markScale = useTransform(h, [0, 1], [1, 1.12])

  function track(e: PointerEvent<HTMLButtonElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const clamp = (v: number) => Math.max(-1, Math.min(1, v))
    px.set(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)))
    py.set(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)))
  }
  function enter() {
    if (!reduce) hover.set(1)
  }
  function leave() {
    px.set(0)
    py.set(0)
    hover.set(0)
  }

  return (
    <div className="flex justify-center md:justify-end">
      <button
        type="button"
        onClick={(e) => open({ from: e.currentTarget })}
        onPointerEnter={enter}
        onPointerMove={track}
        onPointerLeave={leave}
        onFocus={enter}
        onBlur={leave}
        className="group relative block aspect-square w-60 rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink sm:w-72 md:w-full md:max-w-[400px]"
      >
        {/* Saffron (#FF9933) to cobalt (#0047AB): the page's one colour moment */}
        <m.span
          style={{ x: blobX, y: blobY, rotate: blobRotate, scale: blobScale }}
          className="absolute inset-0 block will-change-transform"
        >
          <Lottie
            src="/lottie/sphere.json"
            mode="loop"
            rest={0.25}
            speed={0.5}
            className="h-full w-full opacity-90 blur-[8px] md:blur-[10px]"
          />
        </m.span>
        <m.span
          style={{ x: pillX, y: pillY }}
          className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-eggshell/85 px-5 py-2.5 text-body-sm font-medium whitespace-nowrap text-ink shadow-whisper backdrop-blur-sm transition-[background-color,box-shadow] duration-500 group-hover:bg-eggshell group-hover:shadow-[0_0_1px_rgba(0,0,0,.4),0_6px_16px_rgba(0,0,0,.08)]"
        >
          <m.span style={{ rotate: markRotate, scale: markScale }} className="inline-flex">
            <SutraMark className="h-5 w-5" />
          </m.span>
          Ask Sutra
        </m.span>
      </button>

    </div>
  )
}
