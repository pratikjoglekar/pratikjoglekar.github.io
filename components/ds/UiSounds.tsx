"use client"

import { useEffect, useSyncExternalStore } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { onSoundChange, playClick, playLogo, setSoundOn, soundOn } from "@/components/ds/sound"

const ACTION = 'a[href], button:not(:disabled), [role="button"], summary, select, input[type="checkbox"], input[type="radio"]'
const HOVER: Record<string, () => void> = { logo: playLogo }

/**
 * Mounted once in the root layout. A tick on every click of a link or button, and a
 * hover sound on elements marked data-sound="logo" (mouse only,
 * so a tap on a phone gives just the click).
 */
export function UiSounds() {
  useEffect(() => {
    let hovered: Element | null = null
    let last = 0

    function click(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest(ACTION)
      if (el && !el.closest('[data-sound-click="off"]')) playClick()
    }
    function over(e: PointerEvent) {
      if (e.pointerType !== "mouse") return
      const el = (e.target as Element | null)?.closest("[data-sound]")
      if (!el || el === hovered) return
      hovered = el
      const now = performance.now()
      if (now - last < 250) return
      last = now
      HOVER[el.getAttribute("data-sound") ?? ""]?.()
    }
    function leave(e: PointerEvent) {
      if (hovered && !hovered.contains(e.relatedTarget as Node | null)) hovered = null
    }

    document.addEventListener("click", click, true)
    document.addEventListener("pointerover", over)
    document.addEventListener("pointerout", leave)
    return () => {
      document.removeEventListener("click", click, true)
      document.removeEventListener("pointerover", over)
      document.removeEventListener("pointerout", leave)
    }
  }, [])
  return null
}

/** Speaker button for the header: turns interface sounds on and off. */
export function SoundToggle({ className }: { className?: string }) {
  const on = useSyncExternalStore(onSoundChange, soundOn, () => true)

  return (
    <button
      type="button"
      data-sound-click="off"
      aria-pressed={on}
      aria-label={on ? "Turn interface sounds off" : "Turn interface sounds on"}
      title={on ? "Sounds on" : "Sounds off"}
      onClick={() => {
        const next = !on
        setSoundOn(next)
        if (next) playClick()
      }}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-smoke transition-colors hover:bg-warm-taupe hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className
      )}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  )
}
