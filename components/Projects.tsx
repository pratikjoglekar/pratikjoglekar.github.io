import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Eyebrow } from "@/components/ds/primitives"
import { Reveal, Stagger, StaggerItem } from "@/components/ds/Motion"
import CountUp from "@/components/ds/CountUp"
import { BentoField, BentoTile } from "@/components/BentoMotion"
import { moreResults, projects } from "@/lib/projects"
import { cn } from "@/lib/utils"

/*
 * Bento layout from 1024px, in project order (12 columns, 150px rows):
 *   [ featured: current project, 8×3 ][ tall, 4×3 ]
 *   [ 5×2                ][ 7×2                    ]
 *   [ wide, 12×2: screen left, text right          ]
 * From 768px: the featured tile spans both columns, the other four pair up.
 * On phones: one column, same order.
 */
/* `row`: where the tile is wide enough to set the metric beside the title rather than
   under it (feature: from 768px; middle row: from 1024px; tall tile: never). The wide
   tile has its own layout from 1024px: screen left, text stacked on the right. */
const TILES = [
  { tile: "md:col-span-2 lg:col-span-8 lg:row-span-3", feature: true, row: "md:flex-row md:items-end md:justify-between", align: "md:text-right" },
  { tile: "lg:col-span-4 lg:row-span-3", tall: true, row: "", align: "" },
  { tile: "lg:col-span-5 lg:row-span-2", row: "lg:flex-row lg:items-end lg:justify-between", align: "lg:text-right" },
  { tile: "lg:col-span-7 lg:row-span-2", row: "lg:flex-row lg:items-end lg:justify-between", align: "lg:text-right" },
  { tile: "lg:col-span-12 lg:row-span-2", wide: true, row: "", align: "" },
] as const

/** Focused crops of each project's key screen, sized for the tiles. */
/* fitHeight: on desktop, size the screen to the tile height and centre it (for tiles much
   wider than the screen). Otherwise it fits the tile width. */
const COVERS: Record<string, { src: string; w: number; h: number; fitHeight?: boolean }> = {
  c4cintegrations: { src: "/images/covers/c4cintegrations.png", w: 1400, h: 868 },
  "pricing-calculator": { src: "/images/covers/pricing-calculator-v2.png", w: 562, h: 736 },
  "usage-intelligence": { src: "/images/covers/usage-intelligence-v3.png", w: 1994, h: 1300 },
  cancellation: { src: "/images/covers/cancellation.png", w: 800, h: 600, fitHeight: true },
  dashboard: { src: "/images/covers/dashboard.png", w: 2421, h: 1592, fitHeight: true },
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-8 pb-20 md:pb-28">
      <Reveal className="flex items-baseline justify-between">
        <Eyebrow as="h2" id="work-title">
          Selected work
        </Eyebrow>
        <span className="font-mono text-mono text-smoke">{projects.length} case studies</span>
      </Reveal>

      {/* Tiles rise in one after another as the grid scrolls into view. Hovering one leans
          it toward the cursor while the others make room (components/BentoMotion.tsx). */}
      <BentoField>
      <Stagger
        as="ul"
        className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-12 lg:auto-rows-[150px]"
      >
        {projects.map((p, i) => {
          const t: { tile: string; row: string; align: string; feature?: boolean; wide?: boolean; tall?: boolean } = TILES[i % TILES.length]
          return (
            <StaggerItem as="li" key={p.slug} className={cn("flex", t.tile)}>
              <BentoTile
                index={i}
                className={cn(
                  "group relative flex w-full flex-col rounded-card-lg bg-warm-taupe p-2.5 transition-shadow duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,.07)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink",
                  t.wide && "lg:flex-row lg:gap-2"
                )}
              >
              {/* The screen: always visible, settles in slightly closer on hover */}
              <div
                className={cn(
                  "relative aspect-[16/10] overflow-hidden rounded-card bg-eggshell lg:aspect-auto lg:min-h-0 lg:flex-1",
                  t.wide && "lg:flex-[1.6]"
                )}
              >
                {/* The screen "peeks" up from the bottom of the tile: a focused crop of the real
                    UI (public/images/covers), never squashed. Narrow tiles fit it to the width;
                    wide tiles on desktop fit it to the height and centre it. */}
                <Image
                  src={COVERS[p.slug]?.src ?? p.image}
                  width={COVERS[p.slug]?.w ?? 1440}
                  height={COVERS[p.slug]?.h ?? 1020}
                  alt=""
                  sizes={t.feature || t.wide ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 640px, (min-width: 768px) 50vw, 100vw"}
                  className={cn(
                    "absolute top-[9%] left-1/2 h-auto min-h-[92%] w-[88%] max-w-none -translate-x-1/2 rounded-[10px] object-cover object-top shadow-[0_10px_30px_rgba(0,0,0,.08),0_0_0_1px_rgba(0,0,0,.05)] transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5",
                    COVERS[p.slug]?.fitHeight && "lg:h-[115%] lg:w-auto lg:max-w-[88%]"
                  )}
                />
                <span
                  aria-hidden
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-eggshell/90 text-ink opacity-0 shadow-whisper backdrop-blur-sm transition-[opacity,translate] duration-300 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100 translate-y-1 group-hover:translate-y-0"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              {/* Company · years, title (the link), and the headline metric */}
              <div
                className={cn(
                  // metric under the title by default; beside it where the tile is wide enough
                  "flex flex-col items-start gap-3 px-2 pt-4 pb-1.5 md:gap-4",
                  t.row,
                  t.wide && "lg:flex-1 lg:flex-col lg:items-start lg:justify-end lg:gap-0 lg:px-6 lg:pb-4"
                )}
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-body-sm text-smoke">
                    {p.current && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember-orange" />}
                    <span className="text-ink">{p.company}</span>
                    <span className="whitespace-nowrap">· {p.years}</span>
                  </p>
                  <h3
                    className={cn(
                      "mt-1 font-headline text-title font-light text-ink",
                      (t.feature || t.wide) && "md:text-heading-sm"
                    )}
                  >
                    {/* The title is the link; ::after stretches the click target over the tile */}
                    <Link
                      href={`/work/${p.slug}`}
                      className="decoration-ash decoration-1 underline-offset-[5px] after:absolute after:inset-0 after:rounded-card-lg after:content-[''] group-hover:underline focus-visible:outline-none group-has-[:focus-visible]:underline"
                    >
                      {p.title}
                    </Link>
                  </h3>
                </div>
                <p className={cn("shrink-0", t.align, t.wide && "lg:mt-4 lg:text-left")}>
                  <span className="block font-headline text-title font-light whitespace-nowrap text-ink">
                    <CountUp value={p.metric} />
                  </span>
                  <span className="block max-w-[24ch] text-caption text-smoke">{p.metricLabel}</span>
                </p>
              </div>
              </BentoTile>
            </StaggerItem>
          )
        })}
      </Stagger>
      </BentoField>

      {/* Results with no case study of their own: quiet, below the work */}
      <Reveal className="mt-12 md:mt-16">
        <Eyebrow as="h2">More results</Eyebrow>
        <ul className="mt-4 grid grid-cols-1 border-t border-stone sm:grid-cols-3">
          {moreResults.map((r, i) => (
            <li
              key={r.label}
              className={cn(
                "border-b border-stone py-5 sm:border-b-0 sm:py-6",
                i > 0 && "sm:border-l sm:pl-6",
                i < moreResults.length - 1 && "sm:pr-6"
              )}
            >
              <p className="font-headline text-title font-light text-ink">
                <CountUp value={r.value} />
              </p>
              <p className="mt-1 text-body-sm text-graphite">{r.label}</p>
              <p className="mt-1 text-caption text-smoke">{r.company}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
