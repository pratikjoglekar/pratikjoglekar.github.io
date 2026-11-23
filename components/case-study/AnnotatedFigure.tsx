"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/ds/Motion"

export type Pin = {
  /** position over the screenshot, in % of its width and height */
  x: number
  y: number
  title: string
  body: React.ReactNode
}

/**
 * A key screen with numbered markers, each tied to the design decision behind that
 * part of the screen. The notes sit beside the screen on wide displays and below it on
 * phones. Pointing at a marker or a note highlights its partner, so the reader can see
 * exactly which part of the screen a decision shaped.
 */
export default function AnnotatedFigure({
  src,
  alt,
  width,
  height,
  pins,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  pins: Pin[]
  caption?: string
}) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <Reveal>
      <figure className="my-12">
        <div className="overflow-hidden rounded-card bg-warm-taupe p-2 sm:p-4">
          <div className="rounded-small bg-white p-[5%] shadow-hairline">
            <div className="relative">
              <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full rounded-[6px]" sizes="(min-width: 1024px) 720px, 100vw" />
              {pins.map((p, i) => (
                <span
                  key={i}
                  aria-hidden
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  className={cn(
                    "absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff6a13] text-[12px] font-semibold text-white shadow-[0_0_0_3px_rgba(255,255,255,0.9),0_4px_10px_rgba(0,0,0,0.25)] transition-transform duration-300 sm:h-7 sm:w-7 sm:text-[13px]",
                    active === i && "scale-125"
                  )}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ol className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-3">
          {pins.map((p, i) => (
            <li
              key={i}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              className={cn(
                "flex gap-3 rounded-small p-2 -m-2 transition-colors duration-300",
                active === i && "bg-warm-taupe"
              )}
            >
              <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff6a13] text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-body-sm text-graphite">
                <span className="font-medium text-ink">{p.title}</span> {p.body}
              </span>
            </li>
          ))}
        </ol>
        {caption && <figcaption className="mt-4 text-body-sm text-smoke">{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}
