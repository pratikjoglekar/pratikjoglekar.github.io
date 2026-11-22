"use client"

import { useEffect, useRef } from "react"
import type { AnimationItem } from "lottie-web"
import { cn } from "@/lib/utils"

type Props = {
  /** Path under /public, e.g. "/lottie/sphere.json" */
  src: string
  /**
   * loop:  plays continuously while on screen.
   * once:  plays once each time it scrolls into view.
   * hover: rests on a still frame; plays once when the nearest [data-lottie-hover]
   *        ancestor (or the animation itself) is hovered or focused.
   */
  mode?: "loop" | "once" | "hover"
  /**
   * Frame shown before playing and for people who prefer reduced motion:
   * "first", "last", or a fraction of the animation (0–1).
   */
  rest?: "first" | "last" | number
  speed?: number
  className?: string
}

/**
 * Decorative Lottie animation. Uses the lightweight SVG renderer, loaded lazily,
 * and never animates when the visitor has asked for reduced motion.
 */
export default function Lottie({ src, mode = "once", rest = "last", speed = 1, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let anim: AnimationItem | null = null
    let cancelled = false
    const cleanups: (() => void)[] = []
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const showRest = () => {
      if (!anim) return
      const last = anim.totalFrames - 1
      const frame = rest === "last" ? last : rest === "first" ? 0 : Math.round(last * rest)
      anim.goToAndStop(frame, true)
    }

    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled) return
      anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: mode === "loop",
        autoplay: false,
        path: src,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      })
      anim.setSpeed(speed)

      // After a one-off play, settle back on the still frame (some icons end blank).
      if (mode !== "loop") anim.addEventListener("complete", showRest)

      anim.addEventListener("DOMLoaded", () => {
        showRest()
        if (reduce) return

        if (mode === "hover") {
          const target = (el.closest("[data-lottie-hover]") as HTMLElement | null) ?? el
          const play = () => anim?.goToAndPlay(0, true)
          target.addEventListener("mouseenter", play)
          target.addEventListener("focusin", play)
          cleanups.push(() => {
            target.removeEventListener("mouseenter", play)
            target.removeEventListener("focusin", play)
          })
          return
        }

        // loop / once: play only while visible
        const io = new IntersectionObserver(
          ([entry]) => {
            if (!anim) return
            if (entry.isIntersecting) {
              if (mode === "loop") anim.play()
              else anim.goToAndPlay(0, true)
            } else if (mode === "loop") {
              anim.pause()
            }
          },
          { threshold: 0.3 }
        )
        io.observe(el)
        cleanups.push(() => io.disconnect())
      })
    })

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
      anim?.destroy()
    }
  }, [src, mode, rest, speed])

  return <div ref={ref} aria-hidden className={cn("pointer-events-none", className)} />
}
