"use client"

import { useEffect, useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * Light / dark switch, in the home header and the case-study bar. Light is the default;
 * a visitor's choice is remembered in localStorage, and a script in app/layout.tsx
 * applies it before the first paint, so there is no light flash.
 */
type Theme = "light" | "dark"
const KEY = "pj-theme"
const EVENT = "pj-theme-change"

function read(): Theme {
  try {
    return localStorage.getItem(KEY) === "dark" ? "dark" : "light"
  } catch {
    return "light"
  }
}
function subscribe(fn: () => void) {
  window.addEventListener(EVENT, fn)
  return () => window.removeEventListener(EVENT, fn)
}

export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme)

  useEffect(() => {
    const html = document.documentElement
    if (theme === "dark") html.setAttribute("data-theme", "dark")
    else html.removeAttribute("data-theme")
  }, [theme])

  function toggle() {
    const html = document.documentElement
    // a short cross-fade, only for the switch itself
    html.classList.add("theme-fade")
    window.setTimeout(() => html.classList.remove("theme-fade"), 450)
    try {
      localStorage.setItem(KEY, theme === "dark" ? "light" : "dark")
    } catch {
      /* private mode: lasts for this page view */
    }
    window.dispatchEvent(new Event(EVENT))
  }

  const dark = theme === "dark"
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-smoke transition-colors hover:bg-warm-taupe hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
