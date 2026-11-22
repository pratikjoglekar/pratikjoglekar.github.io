import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Text that gets a flowing saffron-to-cobalt wavy underline, word by word, when an
 * ancestor with `wave-trigger` is hovered or holds keyboard focus, or when an ancestor
 * has `wave-on`. Each word carries its own wave, so it still works when a line wraps.
 * Styles: `.wave-word` in globals.css. See DESIGN.md › Motion.
 */
export default function WaveText({ text, className, start = 0 }: { text: string; className?: string; start?: number }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className={cn("wave-word", className)} style={{ "--i": start + i } as React.CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  )
}
