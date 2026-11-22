"use client"

import { useEffect, useState } from "react"
import SutraMark from "@/components/SutraMark"
import { useAskMe } from "@/components/AskMe"
import { cn } from "@/lib/utils"

/** When the one-time sweep starts (after the page intro has cleared) and how long one turn takes. */
const SWEEP_DELAY = 1600
const TURN = 3000 // keep in sync with .sutra-ring in globals.css

/**
 * Opens Sutra about the case study being read (Sutra picks up the page itself).
 * Lives in the sticky case-study bar, the one entry point on case studies.
 *
 * Its outline is Sutra's saffron-to-cobalt gradient. It rests still while people read,
 * turns once when the page opens, and keeps turning only while hovered or focused,
 * the same motion as the open panel's border. Still for reduced motion.
 * `compact` is the bar's size; the larger size is unused for now.
 */
export default function AskAboutThis({ compact = false }: { compact?: boolean }) {
  const { open } = useAskMe()
  const [sweeping, setSweeping] = useState(false)

  useEffect(() => {
    const start = window.setTimeout(() => setSweeping(true), SWEEP_DELAY)
    const stop = window.setTimeout(() => setSweeping(false), SWEEP_DELAY + TURN)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(stop)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={(e) => open({ from: e.currentTarget })}
      className={cn(
        "group/ask relative inline-flex items-center gap-2 rounded-full bg-eggshell font-medium text-ink transition-colors hover:bg-warm-taupe",
        compact ? "h-9 px-3.5 text-body-sm" : "h-11 px-5 text-body-sm"
      )}
    >
      <span aria-hidden data-sweep={sweeping || undefined} className="sutra-ring" />
      <SutraMark className={cn("relative", compact ? "h-4 w-4" : "h-5 w-5")} />
      {compact ? (
        <>
          <span className="relative sm:hidden">Ask Sutra</span>
          <span className="relative hidden sm:inline">Ask Sutra about this</span>
        </>
      ) : (
        <span className="relative">Ask Sutra about this case study</span>
      )}
    </button>
  )
}
