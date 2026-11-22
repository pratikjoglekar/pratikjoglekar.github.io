"use client"

import Link from "next/link"
import { useState } from "react"
import type { FocusEvent, PointerEvent } from "react"
import { contact } from "@/lib/projects"
import { cn } from "@/lib/utils"

const linkClass =
  "relative z-10 inline-flex h-9 items-center rounded-full px-2.5 text-body-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-3"

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

/**
 * Header links with one shared hover pill. Instead of each link fading its own
 * background (which flickers as the pointer crosses adjacent links), a single taupe pill
 * appears under the first link you point at, glides between links as you move, and fades
 * out when you leave the nav. Keyboard focus moves it too.
 */
export default function HeaderNav() {
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)
  const [shown, setShown] = useState(false)
  // Glide only between links; when the pill first appears it starts under the pointer.
  const [glide, setGlide] = useState(false)

  function moveTo(el: HTMLElement) {
    setGlide(shown)
    setPill({ x: el.offsetLeft, w: el.offsetWidth })
    setShown(true)
  }
  function hide() {
    setShown(false)
    setGlide(false)
  }
  const onEnter = (e: PointerEvent<HTMLElement>) => moveTo(e.currentTarget)
  const onFocus = (e: FocusEvent<HTMLElement>) => moveTo(e.currentTarget)

  const handlers = { onPointerEnter: onEnter, onFocus }

  return (
    <nav
      aria-label="Primary"
      onPointerLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide()
      }}
      className="relative -mr-2.5 flex items-center sm:-mr-3"
    >
      {pill && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-0 -mt-[18px] h-9 rounded-full bg-warm-taupe"
          style={{
            width: pill.w,
            transform: `translateX(${pill.x}px)`,
            opacity: shown ? 1 : 0,
            transition: glide
              ? `transform 0.35s ${EASE}, width 0.35s ${EASE}, opacity 0.2s ease`
              : "opacity 0.2s ease",
          }}
        />
      )}
      <Link href="/#work" className={linkClass} {...handlers}>
        Work
      </Link>
      <Link href="/#about" className={cn(linkClass, "hidden sm:inline-flex")} {...handlers}>
        About
      </Link>
      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass} {...handlers}>
        LinkedIn
      </a>
      <a href={`mailto:${contact.email}`} className={linkClass} {...handlers}>
        Email
      </a>
    </nav>
  )
}
