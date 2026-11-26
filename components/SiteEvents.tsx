"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { track } from "@/lib/track"

/*
 * Site-wide analytics events that do not belong to one component:
 * - "Email click": any mailto link, with the page it was clicked on.
 * - "Case study read": how far a case study was read, at 25, 50, 75 and 100 percent,
 *   each sent once per page view.
 */
const DEPTHS = [25, 50, 75, 100]

export default function SiteEvents() {
  const path = usePathname()

  useEffect(() => {
    function click(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.('a[href^="mailto:"]')
      if (a) track("Email click", { page: window.location.pathname })
    }
    document.addEventListener("click", click, true)
    return () => document.removeEventListener("click", click, true)
  }, [])

  useEffect(() => {
    if (!path.startsWith("/work/")) return
    const slug = path.split("/").pop() ?? ""
    const sent = new Set<number>()

    function measure() {
      const main = document.querySelector("main")
      if (!main) return
      // 100% is the end of the case study itself, not the next-project card and footer below it
      const end = (main.querySelector("[data-case-body]") ?? main).getBoundingClientRect().bottom
      const top = main.getBoundingClientRect().top
      const read = window.innerHeight - top
      const total = end - top
      if (total <= 0) return
      const pct = (read / total) * 100
      for (const d of DEPTHS) {
        if (pct >= d && !sent.has(d)) {
          sent.add(d)
          track("Case study read", { case: slug, depth: d })
        }
      }
    }
    // two rect reads per scroll event: cheap enough to run straight from the event
    window.addEventListener("scroll", measure, { passive: true })
    return () => window.removeEventListener("scroll", measure)
  }, [path])

  return null
}
