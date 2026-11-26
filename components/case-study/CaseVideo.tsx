"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { Maximize2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import PlayBlob from "@/components/ds/PlayBlob"
import { track } from "@/lib/track"

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00"
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
}

/**
 * Case studies whose poster is a composed board of the final design, rather than the
 * video's title card, so the first big visual on the page is the work itself.
 * One board per theme. The Watch pill moves to the corner so it does not cover the design.
 */
const BOARD: Record<string, { light: string; dark: string }> = {
  c4cintegrations: { light: "/images/integrations/board-light.jpg", dark: "/images/integrations/board-dark.jpg" },
  "pricing-calculator": { light: "/images/pricing-calculator/board-light.jpg", dark: "/images/pricing-calculator/board-dark.jpg" },
  "usage-intelligence": { light: "/images/uip/board-light.jpg", dark: "/images/uip/board-dark.jpg" },
  cancellation: { light: "/images/retention/board-light.jpg", dark: "/images/retention/board-dark.jpg" },
  dashboard: { light: "/images/dashboard/board-light.jpg", dark: "/images/dashboard/board-dark.jpg" },
}

function subscribeTheme(fn: () => void) {
  const mo = new MutationObserver(fn)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
  return () => mo.disconnect()
}
const isDark = () => document.documentElement.getAttribute("data-theme") === "dark"

/** File version per video (bump when a video is re-rendered, so no cached copy shows). */
const VERSION: Record<string, string> = { "pricing-calculator": "v7", c4cintegrations: "v9", dashboard: "v7" }

/**
 * The one-minute narrated summary at the top of a case study.
 * Custom, quiet controls in the site's style instead of the browser's (no dark gradient).
 * The video has its own progress line burned in, so the player doesn't add another.
 * Nothing loads or plays, and there's no sound, until the visitor presses Watch.
 */
export default function CaseVideo({ slug, title }: { slug: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(50)
  const [showControls, setShowControls] = useState(true)
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false)
  const board = BOARD[slug]

  // Controls fade out while playing and the pointer is still; they return on movement or focus.
  function wake() {
    setShowControls(true)
    if (idle.current) clearTimeout(idle.current)
    idle.current = setTimeout(() => setShowControls(false), 1800)
  }
  useEffect(() => () => { if (idle.current) clearTimeout(idle.current) }, [])

  function toggle() {
    const v = ref.current
    if (!v) return
    if (!started) {
      setStarted(true)
      track("Video play", { video: slug })
      v.volume = 0.8
    }
    if (v.paused || v.ended) {
      v.play().catch(() => {})
      wake()
    } else {
      v.pause()
    }
  }

  function toggleMute() {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  function fullscreen() {
    const v = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    if (!v) return
    if (boxRef.current?.requestFullscreen) boxRef.current.requestFullscreen().catch(() => {})
    else v.webkitEnterFullscreen?.() // iOS Safari
  }

  const controlsVisible = !playing || showControls
  const pill =
    "inline-flex items-center rounded-full bg-eggshell/90 text-ink shadow-whisper backdrop-blur-sm"
  const iconBtn =
    "flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-warm-taupe"

  return (
    <figure>
      <div
        ref={boxRef}
        onPointerMove={() => playing && wake()}
        onFocus={wake}
        className="group relative overflow-hidden rounded-card-lg bg-eggshell shadow-[inset_0_0_0_1px_var(--color-stone)]"
      >
        <video
          ref={ref}
          src={`/videos/case/${slug}-${VERSION[slug] ?? "v6"}.mp4`}
          poster={board ? board[dark ? "dark" : "light"] : `/videos/case/${slug}-${VERSION[slug] ?? "v6"}-poster.jpg`}
          preload="none"
          playsInline
          onClick={toggle}
          onPlay={() => { setPlaying(true); setEnded(false) }}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setEnded(true) }}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          aria-label={`One-minute narrated summary of ${title}, with captions`}
          className={cn("aspect-video h-auto w-full", started && "cursor-pointer")}
        />

        {/* Before first play: one quiet, centred call to action */}
        {!started && (
          <button
            type="button"
            onClick={toggle}
            aria-label="Watch the one-minute summary"
            className={cn("absolute inset-0 flex", board ? "items-end justify-start p-4 sm:p-6" : "items-center justify-center")}
          >
            <span className={cn(pill, "gap-2.5 py-1.5 pr-4 pl-1.5 text-body-sm font-medium transition-transform duration-300 group-hover:scale-[1.04] sm:py-2 sm:pr-5 sm:pl-2")}>
              {/* Hovering the video melts the ink circle into the hero's blob */}
              <PlayBlob className="h-7 w-7 sm:h-8 sm:w-8" iconClassName="h-3.5 w-3.5" />
              <span className="sm:hidden">Watch · 1 min</span>
              <span className="hidden sm:inline">Watch the one-minute summary</span>
            </span>
          </button>
        )}

        {/* After first play: a small control pill, bottom-left, that fades when idle */}
        {started && (
          <div
            className={cn(
              "absolute bottom-4 left-4 transition-opacity duration-300 sm:bottom-5 sm:left-5",
              controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <div className={cn(pill, "gap-0.5 p-1")}>
              <button type="button" onClick={toggle} className={iconBtn} aria-label={ended ? "Replay" : playing ? "Pause" : "Play"}>
                {ended ? <RotateCcw className="h-3.5 w-3.5" /> : playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
              </button>
              <span className="px-1.5 font-mono text-mono text-smoke tabular-nums" aria-hidden>
                {fmt(time)} / {fmt(duration)}
              </span>
              <button type="button" onClick={toggleMute} className={iconBtn} aria-label={muted ? "Unmute" : "Mute"}>
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
              <button type="button" onClick={fullscreen} className={cn(iconBtn, "hidden sm:flex")} aria-label="Full screen">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
      <figcaption className="sr-only">
        A one-minute summary: the problem, the call Pratik pushed for, the work and the outcome. Narrated, with captions and soft background music.
      </figcaption>
    </figure>
  )
}
