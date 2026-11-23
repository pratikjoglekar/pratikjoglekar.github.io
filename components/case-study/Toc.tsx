"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

type Item = { id: string; title: string }

/** Reads the chapter headings (h2[data-toc]) and tracks which one is being read. */
function useChapters() {
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2[data-toc]"))
    // Headings only exist in the DOM after mount, so reading them here is intended.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(headings.map((h) => ({ id: h.id, title: h.textContent ?? "" })))

    // The active chapter is the last heading that has scrolled above 30% of the screen.
    const update = () => {
      const line = window.innerHeight * 0.3
      let current: string | null = headings[0]?.id ?? null
      for (const h of headings) if (h.getBoundingClientRect().top <= line) current = h.id
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return { items, active }
}

/** Desktop: sticky "On this page" list beside the article. */
export default function Toc() {
  const { items, active } = useChapters()
  if (!items.length) return null

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="mb-4 text-body-sm font-medium text-smoke">On this page</p>
      <ol className="flex flex-col gap-1 border-l border-stone">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-body-sm transition-colors",
                active === item.id ? "border-ink text-ink" : "border-transparent text-smoke hover:text-ink"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Phones and tablets: a floating pill showing the current chapter and reading
 * progress. Tapping it lists all chapters. Only visible while reading the article body.
 */
export function ChapterPill() {
  const { items, active } = useChapters()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const body = document.querySelector<HTMLElement>("[data-case-body]")
    if (!body) return
    const update = () => {
      const r = body.getBoundingClientRect()
      const vh = window.innerHeight
      setVisible(r.top < vh * 0.5 && r.bottom > vh * 0.6)
      setProgress(Math.min(1, Math.max(0, (vh * 0.5 - r.top) / r.height)))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  // Close the list when tapping outside it or pressing Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (!items.length) return null
  const index = Math.max(0, items.findIndex((i) => i.id === active))
  const current = items[index]
  const show = visible || open

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-6 transition-all duration-300 lg:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <div className="relative">
        {open && (
          <nav
            id="chapter-menu"
            aria-label="Chapters"
            className="absolute bottom-full left-1/2 mb-2 w-60 -translate-x-1/2 overflow-hidden rounded-card bg-eggshell p-2 shadow-whisper"
          >
            <ol>
              {items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={item.id === active ? "location" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-small px-3 py-2.5 text-body-sm",
                      item.id === active ? "bg-warm-taupe text-ink" : "text-graphite"
                    )}
                  >
                    <span className="font-mono text-mono text-smoke">{String(i + 1).padStart(2, "0")}</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="chapter-menu"
          tabIndex={show ? 0 : -1}
          className="relative flex h-11 items-center gap-3 overflow-hidden rounded-full bg-ink pr-4 pl-5 text-body-sm text-eggshell shadow-whisper"
        >
          <span className="font-mono text-mono text-ash">
            {String(index + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
          </span>
          <span className="font-medium">{current?.title}</span>
          <ChevronUp aria-hidden className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          {/* Reading progress */}
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-graphite">
            <span
              className="block h-full origin-left bg-eggshell"
              style={{ transform: `scaleX(${progress})` }}
            />
          </span>
        </button>
      </div>
    </div>
  )
}
