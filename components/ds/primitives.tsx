import * as React from "react"
import { cn } from "@/lib/utils"

/* ---------- Card ---------- */

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** taupe: flat feature card (default). raised: eggshell with whisper shadow. */
  tone?: "taupe" | "raised"
  size?: "md" | "lg"
}

export function Card({ tone = "taupe", size = "md", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        tone === "taupe" ? "bg-warm-taupe" : "bg-eggshell shadow-whisper",
        size === "lg" ? "rounded-card-lg" : "rounded-card",
        className
      )}
      {...props}
    />
  )
}

/* ---------- Tag ---------- */

export function Tag({
  children,
  dot,
  className,
}: {
  children: React.ReactNode
  /** current = ember-orange status dot; neutral = ash dot */
  dot?: "current" | "neutral"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border border-stone bg-eggshell px-3 text-caption font-medium text-graphite",
        className
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dot === "current" ? "bg-ember-orange" : "bg-ash"
          )}
        />
      )}
      {children}
    </span>
  )
}

/* ---------- Divider ---------- */

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-stone", className)} />
}

/* ---------- Eyebrow + SectionHeader ---------- */

/** Small mono label. Use as="h2" when it names a page section, so it appears in the heading outline. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
  id,
}: {
  children: React.ReactNode
  className?: string
  as?: "p" | "h2"
  id?: string
}) {
  return (
    <Tag id={id} className={cn("text-body-sm font-medium text-smoke", className)}>
      {children}
    </Tag>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  aside,
  id,
}: {
  eyebrow: string
  title: React.ReactNode
  aside?: React.ReactNode
  id?: string
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="font-display text-heading-sm font-light md:text-heading">
          {title}
        </h2>
      </div>
      {aside && <div className="max-w-md text-body text-smoke">{aside}</div>}
    </div>
  )
}

/* ---------- Sphere (decorative only) ---------- */

export function Sphere({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block rounded-full", className)}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #ffd6c7 0%, transparent 45%), radial-gradient(circle at 70% 35%, #ff4704 0%, transparent 55%), radial-gradient(circle at 35% 75%, #0447ff 0%, transparent 60%), radial-gradient(circle at 75% 80%, #ff8fc7 0%, transparent 55%), #f5f3f1",
        filter: "saturate(0.9)",
      }}
    />
  )
}
