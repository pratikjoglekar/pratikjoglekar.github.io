"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { track } from "@/lib/track"

/** The original file behind a next/image URL, so the viewer shows full resolution. */
function original(img: HTMLImageElement) {
  const raw = img.getAttribute("src") ?? ""
  if (raw.startsWith("/_next/image")) {
    const u = new URL(raw, window.location.origin).searchParams.get("url")
    if (u) return u
  }
  return raw
}

/**
 * Select (or press Enter on) any screenshot in the case study to see it full size.
 * Mount once on a case-study page. Every screenshot inside a figure becomes a button;
 * the viewer closes on Escape, on the close button or on the backdrop, and returns
 * focus to the screenshot that opened it.
 */
export default function ImageLightbox() {
  const [shown, setShown] = useState<{ src: string; alt: string } | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const close = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const imgs = () => Array.from(document.querySelectorAll<HTMLImageElement>("main figure img"))
    const prepare = () => {
      for (const img of imgs()) {
        if (img.dataset.zoom) continue
        img.dataset.zoom = "1"
        img.tabIndex = 0
        img.setAttribute("role", "button")
        img.setAttribute("aria-label", `View full size: ${img.alt}`)
        img.style.cursor = "zoom-in"
      }
    }
    prepare()
    // figures that reveal later (on scroll) are prepared when they appear
    const mo = new MutationObserver(prepare)
    mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true })

    function open(img: HTMLImageElement) {
      opener.current = img
      track("Screenshot zoom", { page: window.location.pathname, image: original(img).split("/").pop() ?? "" })
      setShown({ src: original(img), alt: img.alt })
    }
    function onClick(e: MouseEvent) {
      const img = (e.target as Element | null)?.closest?.("main figure img") as HTMLImageElement | null
      if (img) open(img)
    }
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if ((e.key === "Enter" || e.key === " ") && t instanceof HTMLImageElement && t.dataset.zoom) {
        e.preventDefault()
        open(t)
      }
    }
    document.addEventListener("click", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      mo.disconnect()
      document.removeEventListener("click", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    if (!shown) return
    close.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShown(null)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
      opener.current?.focus()
    }
  }, [shown])

  if (!shown) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shown.alt}
      onClick={() => setShown(null)}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-10"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- the full-size original, not a resized copy */}
      <img
        src={shown.src}
        alt={shown.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full cursor-default rounded-small bg-white object-contain shadow-2xl"
      />
      <button
        ref={close}
        type="button"
        onClick={() => setShown(null)}
        aria-label="Close"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}
