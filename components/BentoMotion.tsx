"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { PointerEvent } from "react"
import { m, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react"

/* Same spring as the hero sphere, so the grid and the blob feel like one material. */
const FOLLOW = { stiffness: 120, damping: 16, mass: 0.8 }
/** How far the hovered tile leans toward the cursor, and how far its neighbours make room (px). */
const LEAN = 8
const PUSH = 6

type Field = {
  hovered: number | null
  setHovered: (i: number | null) => void
  px: MotionValue<number>
  py: MotionValue<number>
}
const Ctx = createContext<Field | null>(null)

/**
 * The bento's hover field. The tile under the pointer leans toward it (like the hero
 * sphere) and lifts a touch; every other tile eases a few pixels away from it, as if
 * making room. Moving across the gaps hands the hover from tile to tile without a bounce;
 * everything settles back when the pointer leaves the grid.
 * Mouse and trackpad only; still for reduced motion and on touch screens.
 */
export function BentoField({ className, children }: { className?: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [enabled, setEnabled] = useState(false)
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const active = enabled && !reduce
  return (
    <Ctx.Provider value={{ hovered: active ? hovered : null, setHovered, px, py }}>
      <div className={className} onPointerLeave={() => setHovered(null)}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

/** One tile's surface. Pass the tile's visual classes; its grid placement stays on the parent. */
export function BentoTile({
  index,
  className,
  children,
}: {
  index: number
  className?: string
  children: React.ReactNode
}) {
  const field = useContext(Ctx)
  if (!field) throw new Error("BentoTile must be inside <BentoField>")
  const { hovered, setHovered, px, py } = field
  const ref = useRef<HTMLDivElement>(null)

  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const ts = useMotionValue(1)
  const x = useSpring(tx, FOLLOW)
  const y = useSpring(ty, FOLLOW)
  const scale = useSpring(ts, FOLLOW)

  useEffect(() => {
    if (hovered === null) {
      tx.set(0)
      ty.set(0)
      ts.set(1)
      return
    }
    if (hovered === index) {
      // lean toward the cursor while it moves over this tile
      ts.set(1.01)
      tx.set(px.get() * LEAN)
      ty.set(py.get() * LEAN)
      const offX = px.on("change", (v) => tx.set(v * LEAN))
      const offY = py.on("change", (v) => ty.set(v * LEAN))
      return () => {
        offX()
        offY()
      }
    }
    // make room: drift directly away from the hovered tile
    ts.set(1)
    const me = ref.current?.getBoundingClientRect()
    const other = document.querySelector(`[data-tile="${hovered}"]`)?.getBoundingClientRect()
    if (!me || !other) return
    const dx = me.left + me.width / 2 - (other.left + other.width / 2)
    const dy = me.top + me.height / 2 - (other.top + other.height / 2)
    const d = Math.hypot(dx, dy) || 1
    tx.set((dx / d) * PUSH)
    ty.set((dy / d) * PUSH)
  }, [hovered, index, px, py, tx, ty, ts])

  function enter(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") setHovered(index)
  }
  function move(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return
    if (hovered !== index) setHovered(index)
    const r = e.currentTarget.getBoundingClientRect()
    const clamp = (v: number) => Math.max(-1, Math.min(1, v))
    px.set(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)))
    py.set(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)))
  }

  return (
    <m.div
      ref={ref}
      data-tile={index}
      onPointerEnter={enter}
      onPointerMove={move}
      style={{ x, y, scale }}
      className={className}
    >
      {children}
    </m.div>
  )
}
