"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MONOGRAM_PATHS, MONOGRAM_VIEWBOX } from "@/components/ds/Monogram"
import { INTRO_SECONDS, markIntroDone, startIntroFor } from "@/components/ds/Motion"

/**
 * Full-page intro on every page load and every page change: a soft saffron-to-cobalt
 * gradient takes over the screen, the monogram's two slabs slide in along their slant
 * and lock together, then the whole layer dissolves. Pure CSS (`.intro` in globals.css),
 * so it shows from the first paint; it's removed from the page once done.
 * Skipped for reduced motion. Jumping to an anchor on the same page doesn't replay it.
 */
export default function Intro() {
  const pathname = usePathname()
  const [doneFor, setDoneFor] = useState<string | null>(null)

  // On a page change, flag the intro as pending while rendering, so the new page's
  // entrance animations (rendered after this, lower in the tree) wait for it.
  startIntroFor(pathname)

  useEffect(() => {
    const t = window.setTimeout(() => {
      markIntroDone()
      setDoneFor(pathname)
    }, (INTRO_SECONDS + 0.45) * 1000)
    return () => window.clearTimeout(t)
  }, [pathname])

  if (doneFor === pathname) return null
  // keyed by page so the CSS animation restarts from the beginning each time
  return (
    <div key={pathname} aria-hidden className="intro">
      <div className="intro-bg" />
      <svg viewBox={MONOGRAM_VIEWBOX} className="intro-mark" fill="currentColor">
        <path className="intro-slab-a" d={MONOGRAM_PATHS[0]} />
        <path className="intro-slab-b" d={MONOGRAM_PATHS[1]} />
      </svg>
    </div>
  )
}
