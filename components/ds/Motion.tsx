"use client"

import * as React from "react"
// LazyMotion + `m` ships only the features used here (animations, variants, in-view),
// which is much smaller than the full `motion` component.
import { LazyMotion, MotionConfig, domAnimation, m, type Variants } from "motion/react"

/* ================================================================
   Motion tokens — see DESIGN.md › Motion.
   One ease, one duration, one distance: everything should feel the same.
   ================================================================ */

export const EASE = [0.22, 1, 0.36, 1] as const // soft ease-out
export const DURATION = 0.7
export const DISTANCE = 16 // px of rise
export const STAGGER = 0.08

// Trigger as soon as any part is 80px inside the viewport. (A percentage threshold
// would never fire for sections taller than the screen, leaving them invisible.)
const VIEWPORT = { once: true, amount: "some", margin: "0px 0px -80px 0px" } as const

/* ---------- Page intro (components/Intro.tsx) ----------
   The intro covers the screen for INTRO_SECONDS on every page load and every page
   change, so above-the-fold animations wait for it. */
export const INTRO_SECONDS = 0.6
let introPending = true
export function markIntroDone() {
  introPending = false
}
let introPath: string | null = null
/** Called by the intro while it renders, before the page's content renders: a new page
    means a new intro, so its entrance animations wait again. */
export function startIntroFor(pathname: string) {
  if (introPath === pathname) return
  introPath = pathname
  introPending = true
}
/** Extra delay for above-the-fold animations while the intro is still on screen. */
export function introDelay() {
  if (!introPending || typeof window === "undefined") return 0
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0
  return INTRO_SECONDS
}

/**
 * Wraps the app. With reducedMotion="user", visitors who ask for reduced motion
 * get opacity fades only: no movement.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: DURATION, ease: EASE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}

/* ---------- Reveal: fade and rise when scrolled into view ---------- */

type RevealProps = React.ComponentProps<typeof m.div> & {
  delay?: number
  /** Animate on page load instead of on scroll (for content above the fold). */
  immediate?: boolean
}

export function Reveal({ delay = 0, immediate, transition, children, ...rest }: RevealProps) {
  const target = { opacity: 1, y: 0 }
  // Above-the-fold reveals also wait for the page-load intro, whatever transition is passed.
  const baseDelay = (transition as { delay?: number } | undefined)?.delay ?? delay
  return (
    <m.div
      initial={{ opacity: 0, y: DISTANCE }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: VIEWPORT })}
      {...rest}
      transition={{
        duration: DURATION,
        ease: EASE,
        ...transition,
        delay: baseDelay + (immediate ? introDelay() : 0),
      }}
    >
      {children}
    </m.div>
  )
}

/* ---------- MaskReveal: a heading slides up from behind a line ---------- */

/**
 * For headings: the text rises into view from behind an invisible edge, once, when it
 * scrolls in (like type in the case-study videos). Reduced motion: it simply appears.
 */
export function MaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    // the padding keeps descenders (g, p, y) inside the mask
    <span className="-mb-[0.15em] block overflow-hidden pb-[0.15em]">
      <m.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </m.span>
    </span>
  )
}

/* ---------- Stagger: children reveal one after another ---------- */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
}

const item: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
}

type StaggerProps = {
  as?: "div" | "ul" | "ol" | "dl"
  immediate?: boolean
  delay?: number
  className?: string
  children: React.ReactNode
}

export function Stagger({ as = "div", immediate, delay = 0, className, children }: StaggerProps) {
  const Comp = m[as] as typeof m.div
  const wait = delay + (immediate ? introDelay() : 0)
  const variants: Variants = wait
    ? { ...container, show: { transition: { staggerChildren: STAGGER, delayChildren: wait } } }
    : container
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT })}
    >
      {children}
    </Comp>
  )
}

type StaggerItemProps = React.ComponentProps<typeof m.div> & { as?: "div" | "li" | "p" | "h1" }

export function StaggerItem({ as = "div", children, ...rest }: StaggerItemProps) {
  const Comp = m[as] as typeof m.div
  return (
    <Comp variants={item} {...rest}>
      {children}
    </Comp>
  )
}
