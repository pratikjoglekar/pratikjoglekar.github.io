"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import { usePathname } from "next/navigation"
import {
  AnimatePresence,
  animate,
  m,
  useMotionTemplate,
  useMotionValue,
  usePresence,
  useReducedMotion,
  useTransform,
} from "motion/react"
import { ArrowUp, X } from "lucide-react"
import { cn } from "@/lib/utils"
import SutraMark from "@/components/SutraMark"
import { projects } from "@/lib/projects"
import { track } from "@/lib/track"

type Message = { role: "user" | "assistant"; content: string }

export const SUGGESTIONS = [
  "What was Pratik’s hardest tradeoff?",
  "How does Pratik work with PMs?",
  "What roles is Pratik looking for?",
]

const EASE = [0.22, 1, 0.36, 1] as const
/** Panel width and its gap to the window edge (keep in sync with `.sutra-open` in globals.css). */
const PANEL_W = 420
const GAP = 12

type OpenOptions = { question?: string; from?: HTMLElement | null }
type AskMeContext = { open: (options?: OpenOptions) => void; isOpen: boolean }
const Ctx = createContext<AskMeContext | null>(null)

/** Opens Sutra, optionally sending a first question. Use inside <AskMeProvider>. */
export function useAskMe() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useAskMe must be used inside <AskMeProvider>")
  return ctx
}

function useMedia(query: string) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatch(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [query])
  return match
}

/**
 * Sutra, the portfolio assistant (answers grounded in portfolio.txt).
 * Lives in the root layout, so one conversation follows the visitor across pages.
 *
 * - From 768px it's a side panel on the right that grows out of whatever opened it (the
 *   hero sphere, or the case-study button). From 1024px the page makes room for it
 *   instead of being covered, so you can read and ask side by side.
 * - On phones it's a bottom sheet: swipe the handle down, tap outside or press Escape to close.
 * - On a case study it knows which one is being read: the suggestions are about that
 *   project, and "this project" means it.
 */
export function AskMeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const project = projects.find((p) => pathname === `/work/${p.slug}`)
  const desktop = useMedia("(min-width: 768px)")

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const [isOpen, setOpen] = useState(false)
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading])

  const close = useCallback(() => {
    setOpen(false)
    returnFocus.current?.focus({ preventScroll: true })
  }, [])

  // The page makes room for the panel (globals.css); phones lock the page behind the sheet.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("sutra-open", isOpen && desktop)
    root.classList.toggle("sutra-sheet-open", isOpen && !desktop)
    return () => root.classList.remove("sutra-open", "sutra-sheet-open")
  }, [isOpen, desktop])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.clearTimeout(t)
    }
  }, [isOpen, close])

  function open({ question, from }: OpenOptions = {}) {
    returnFocus.current = from ?? (document.activeElement as HTMLElement | null)
    if (from) {
      const r = from.getBoundingClientRect()
      setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    } else {
      setOrigin(null)
    }
    setOpen(true)
    if (question) send(question)
  }

  async function send(text: string) {
    const question = text.trim()
    if (!question || loading) return

    // the page and whether it was a suggested question; never what the visitor typed
    track("Sutra question", { page: window.location.pathname, suggested: suggestions.includes(question) })
    const history: Message[] = [...messages, { role: "user", content: question }]
    setMessages(history)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, project: project?.slug }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I could not connect just now. Please try again in a moment." },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus({ preventScroll: true })
    }
  }

  const asked = messages.length > 0
  const suggestions = project?.questions ?? SUGGESTIONS
  const greeting = project
    ? "Ask me about this case study, or anything else about Pratik’s work. I only answer from Pratik’s portfolio."
    : "Ask me about Pratik’s work, decisions, or plans for what comes next. I only answer from Pratik’s portfolio."

  const body = (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stone px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-taupe text-ink">
          <SutraMark className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="sutra-title" className="text-body-sm font-medium">
            Sutra
          </h2>
          <p className="truncate text-caption text-smoke">
            {project ? `On this page: ${project.title}` : "AI assistant · Answers from Pratik’s portfolio"}
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close Sutra"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-warm-taupe"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5 text-body-sm"
      >
        <Bubble role="assistant">{greeting}</Bubble>
        {messages.map((msg, i) => (
          <Bubble key={i} role={msg.role}>
            {msg.content}
          </Bubble>
        ))}
        {loading && (
          <p className="flex w-fit items-center gap-2.5 rounded-[18px] rounded-bl-md bg-warm-taupe px-4 py-2.5 text-smoke">
            {/* Sutra's thread draws itself while the answer comes in */}
            <SutraMark active className="h-7 w-7 text-ink" />
            Thinking…
          </p>
        )}
      </div>

      {/* Suggestions sit right above the input, where the eye and thumb already are */}
      {!asked && (
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-stone bg-eggshell px-3 py-1.5 text-left text-body-sm text-graphite transition-colors hover:border-ash hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="border-t border-stone p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center gap-2 rounded-full bg-warm-taupe p-1.5 pl-5">
          <label htmlFor="sutra-input" className="sr-only">
            Your question
          </label>
          <input
            id="sutra-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
            placeholder={project ? "Ask about this case study…" : "Ask about Pratik’s work…"}
            // 16px on phones so iOS doesn't zoom into the field
            className="min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-smoke md:text-body-sm"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={loading || !input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-eggshell transition-opacity disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </form>
    </>
  )

  return (
    <Ctx.Provider value={{ open, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen &&
          (desktop ? (
            <Panel key="panel" origin={origin}>
              {body}
            </Panel>
          ) : (
            <Sheet key="sheet" onClose={close}>
              {body}
            </Sheet>
          ))}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

function Bubble({ role, children }: { role: Message["role"]; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[88%] px-4 py-2.5 whitespace-pre-line break-words",
          role === "user"
            ? "rounded-[18px] rounded-br-md bg-ink text-eggshell"
            : "rounded-[18px] rounded-bl-md bg-warm-taupe text-ink"
        )}
      >
        {children}
      </p>
    </div>
  )
}

/** Soft edge of the panel's reveal, in px: the circle has no hard rim. */
const FEATHER = 120

/**
 * Desktop: a panel on the right. It opens as a soft-edged circle growing out of whatever
 * opened it (the hero sphere, or a case-study button) while the sphere's saffron and
 * cobalt wash through it, hold a moment, then dissolve as the chat fades in. It closes
 * by shrinking back into that point. Reduced motion: a plain fade.
 */
function Panel({ origin, children }: { origin: { x: number; y: number } | null; children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const [isPresent, safeToRemove] = usePresence()

  // The circle's centre in the panel's own coordinates (default: its bottom-right corner),
  // and the radius that just reaches the farthest corner, edge included.
  const [shape] = useState(() => {
    const w = Math.min(PANEL_W, window.innerWidth - GAP * 2)
    const h = window.innerHeight - GAP * 2
    const left = window.innerWidth - GAP - w
    const x = origin ? origin.x - left : w
    const y = origin ? origin.y - GAP : h
    const far = Math.max(...[[0, 0], [w, 0], [0, h], [w, h]].map(([cx, cy]) => Math.hypot(cx - x, cy - y)))
    return { x, y, full: far + FEATHER }
  })

  const r = useMotionValue(reduce ? shape.full : 0)
  const edge = useTransform(r, (v) => v + FEATHER)
  const mask = useMotionTemplate`radial-gradient(circle at ${shape.x}px ${shape.y}px, #000 ${r}px, transparent ${edge}px)`
  const fade = useMotionValue(reduce ? 0 : 1)
  // The outer glow comes up once the panel has mostly opened, and goes first on close.
  const glow = useMotionValue(0)
  const glowOpacity = useTransform(glow, (v) => v * 0.3) // quietly there, never a halo

  useEffect(() => {
    if (isPresent) {
      if (reduce) {
        animate(fade, 1, { duration: 0.25 })
        animate(glow, 1, { duration: 0.25 })
        return
      }
      // A gentle ease-out (not an exponential one) so the growth is visible, not a pop.
      animate(r, shape.full, { duration: 1.05, ease: [0.33, 1, 0.68, 1] })
      animate(glow, 1, { duration: 1.2, delay: 0.55, ease: [0.45, 0, 0.55, 1] })
    } else {
      animate(glow, 0, { duration: reduce ? 0.2 : 0.3 })
      const done = reduce
        ? animate(fade, 0, { duration: 0.2 })
        : animate(r, 0, { duration: 0.55, ease: [0.32, 0, 0.67, 0] })
      done.then(() => safeToRemove?.())
    }
  }, [isPresent, reduce, r, fade, glow, shape.full, safeToRemove])

  const rect = {
    width: `min(${PANEL_W}px, calc(100vw - ${GAP * 2}px))`,
    top: GAP,
    bottom: GAP,
    right: GAP,
  }

  return (
    <>
    {/* Outer glow: the border's colours, blurred and spread outward behind the panel,
        moving in step with the border (it lives outside the panel, which clips) */}
    <m.span aria-hidden style={{ ...rect, opacity: glowOpacity }} className="sutra-glow pointer-events-none fixed z-[59] rounded-card-lg" />
    <m.section
      role="dialog"
      aria-modal="false"
      aria-labelledby="sutra-title"
      style={{
        ...rect,
        ...(reduce ? { opacity: fade } : { maskImage: mask, WebkitMaskImage: mask }),
      }}
      className="fixed z-[60] flex flex-col overflow-hidden rounded-card-lg bg-eggshell text-ink shadow-[0_0_1px_rgba(0,0,0,.25)]"
    >
      {/* The sphere's colours fill the circle as it grows, hold, then dissolve */}
      {!reduce && (
        <m.div
          aria-hidden
          initial={{ opacity: 0.45, scale: 1.06 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ opacity: { duration: 1.4, delay: 0.35, ease: [0.45, 0, 0.55, 1] }, scale: { duration: 1.8, ease: [0.33, 1, 0.68, 1] } }}
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_30%,#ff9933,transparent_60%),radial-gradient(circle_at_70%_75%,#0047ab,transparent_60%)] blur-2xl"
        />
      )}
      <span aria-hidden className="sutra-border" />
      {/* The chat surfaces through the colour rather than appearing at once */}
      <m.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="flex min-h-0 flex-1 flex-col"
      >
        {children}
      </m.div>
    </m.section>
    </>
  )
}

/** Phones: a bottom sheet over a dimmed page. Drag the handle down to dismiss. */
function Sheet({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  const dragY = useMotionValue(0)
  const start = useRef<number | null>(null)

  function down(e: ReactPointerEvent<HTMLDivElement>) {
    start.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function move(e: ReactPointerEvent<HTMLDivElement>) {
    if (start.current === null) return
    dragY.set(Math.max(0, e.clientY - start.current))
  }
  function up() {
    if (start.current === null) return
    start.current = null
    if (dragY.get() > 110) onClose()
    else animate(dragY, 0, { type: "spring", stiffness: 400, damping: 36 })
  }

  return (
    <>
      <m.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-ink/30"
      />
      <m.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="sutra-title"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 bottom-0 z-[61]"
      >
        <m.div style={{ y: dragY }} className="relative">
        {/* Outer glow above the sheet's edge, moving with its border */}
        <span aria-hidden className="sutra-glow pointer-events-none absolute inset-0 rounded-t-card-lg opacity-30" />
        <div className="relative flex h-[88dvh] flex-col overflow-hidden rounded-t-card-lg bg-eggshell text-ink">
          {/* Grab handle: drag down to close */}
          <div
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            className="flex shrink-0 cursor-grab touch-none justify-center pt-2.5 pb-1"
          >
            <span className="h-1 w-10 rounded-full bg-stone" />
          </div>
          <span aria-hidden className="sutra-border" />
          {children}
        </div>
        </m.div>
      </m.section>
    </>
  )
}
