import * as React from "react"
import { ImagePlus } from "lucide-react"
import type { Metadata } from "next"
import StickyHome from "@/components/StickyHome"
import SiteFooter from "@/components/SiteFooter"
import Toc, { ChapterPill } from "@/components/case-study/Toc"
import CaseVideo from "@/components/case-study/CaseVideo"
import NextProjectCard from "@/components/case-study/NextProjectCard"
import Lottie from "@/components/ds/Lottie"
import CountUp from "@/components/ds/CountUp"
import { MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/ds/Motion"
import { Card, Eyebrow } from "@/components/ds/primitives"
import { projects, type Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug)
  if (!project) throw new Error(`Unknown case study: ${slug}`)
  return project
}

/** Per-page <title>, description and link preview, built from lib/projects. */
export function caseStudyMetadata(slug: string): Metadata {
  const p = getProject(slug)
  const title = `${p.title} (${p.company})`
  return {
    title,
    description: p.summary,
    openGraph: {
      type: "article",
      title,
      description: p.summary,
      url: `/work/${p.slug}`,
      images: [{ url: p.image, width: 1440, height: 1020, alt: p.imageAlt }],
    },
  }
}

/* ================================================================
   Page shell
   ================================================================ */

export function CaseStudyLayout({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  return (
    <>
      <StickyHome />
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-page px-6 pt-24 outline-none md:px-16 md:pt-32">
        {children}
        <NextProject slug={slug} />
        <SiteFooter />
      </main>
    </>
  )
}

/* ================================================================
   Header: company and title, TL;DR, then the summary video, then At a glance
   (The video's poster shows the hero screenshot, so it is not repeated below.)
   ================================================================ */

export function CaseHeader({
  slug,
  tldr,
}: {
  slug: string
  tldr: React.ReactNode
}) {
  const p = getProject(slug)

  return (
    <header className="pb-16 md:pb-24">
      <Stagger immediate>
      <StaggerItem className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-warm-taupe">
        <Lottie src={p.icon} mode="once" rest={p.iconRest ?? "last"} className="h-7 w-7" />
      </StaggerItem>
      <StaggerItem as="p" className="flex items-center gap-2 text-body-sm text-smoke">
        {p.current && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember-orange" />}
        <span className="text-ink">{p.company}</span>
        <span>· {p.years}</span>
        <span>· {p.readMinutes} min read</span>
      </StaggerItem>

      <StaggerItem as="h1" className="mt-6 max-w-4xl font-headline text-heading font-light text-ink md:text-hero">
        {p.title}
      </StaggerItem>

      <StaggerItem as="p" className="mt-8 max-w-3xl text-body-lg text-graphite">{tldr}</StaggerItem>
      </Stagger>

      {/* The one-minute summary comes after the title and TL;DR, so visitors know where they
          are first; it then reads as a choice (read the short version, or watch it) and
          still works as the page's hero visual. It settles in from 96% once the text is in. */}
      <Reveal
        immediate
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
        className="mt-12 md:mt-16"
      >
        <Eyebrow className="mb-4">Prefer to watch?</Eyebrow>
        <CaseVideo slug={p.slug} title={p.title} />
      </Reveal>

      <AtAGlance project={p} />
    </header>
  )
}

function AtAGlance({ project: p }: { project: Project }) {
  const g = p.glance
  return (
    <section aria-labelledby="glance-title" className="mt-12 md:mt-16">
      <h2 id="glance-title" className="sr-only">
        At a glance
      </h2>
      <Stagger as="dl" delay={0.3} className="grid grid-cols-1 border-t border-stone sm:grid-cols-2 lg:grid-cols-4">
        <GlanceCell label="Problem">
          <p>{g.problem}</p>
        </GlanceCell>
        <GlanceCell label="My role">
          <p className="text-ink">{g.role}</p>
          <p>With {g.team}</p>
          <p>{g.duration}</p>
        </GlanceCell>
        <GlanceCell label="Key decisions">
          <ol className="space-y-2">
            {g.decisions.map((d, i) => (
              <li key={d} className="flex gap-3">
                <span className="font-mono text-mono text-smoke">{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </GlanceCell>
        <GlanceCell label="Outcome">
          <ul className="space-y-4">
            {g.outcomes.map((o) => (
              <li key={o.label}>
                <span className="block font-display text-title font-light text-ink">
                  {o.value}
                </span>
                <span>{o.label}</span>
              </li>
            ))}
          </ul>
        </GlanceCell>
      </Stagger>
    </section>
  )
}

function GlanceCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <StaggerItem className="border-b border-stone py-6 sm:pr-8 lg:border-b-0 lg:border-l lg:px-6 lg:py-6 lg:first:border-l-0 lg:first:pl-0">
      <dt className="font-mono text-mono uppercase tracking-wide text-smoke">{label}</dt>
      <dd className="mt-3 space-y-1 text-body-sm text-graphite">{children}</dd>
    </StaggerItem>
  )
}

/* ================================================================
   Body: sticky chapter list + prose column
   ================================================================ */

export function CaseBody({ children }: { children: React.ReactNode }) {
  return (
    <div data-case-body className="grid grid-cols-1 gap-12 border-t border-stone pt-16 md:pt-24 lg:grid-cols-12 lg:gap-8">
      <aside className="hidden lg:col-span-3 lg:block">
        <Toc />
      </aside>
      <ChapterPill />
      <div className="min-w-0 lg:col-span-8 lg:col-start-5">
        <div className="max-w-prose">{children}</div>
      </div>
    </div>
  )
}

/**
 * One of the five chapters: Context, Problem, Approach, Outcome, Reflection.
 * `summary` is the chapter in one line, under the title, so someone skimming the
 * headings still gets the whole story.
 */
export function Chapter({
  number,
  title,
  summary,
  children,
}: {
  number: number
  title: string
  summary?: React.ReactNode
  children: React.ReactNode
}) {
  const id = slugify(title)
  return (
    <section aria-labelledby={id} className="mb-24 md:mb-32">
      <p className="font-mono text-mono text-smoke">
        <MaskReveal>{String(number).padStart(2, "0")}</MaskReveal>
      </p>
      <h2
        id={id}
        data-toc
        className="mt-2 scroll-mt-28 font-headline text-heading font-light text-ink md:text-display"
      >
        <MaskReveal delay={0.08}>{title}</MaskReveal>
      </h2>
      {summary && (
        <Reveal delay={0.15}>
          <p className="mt-6 border-l border-ink pl-5 text-body-lg text-ink">
            <span className="mb-1 block font-mono text-mono uppercase tracking-wide text-smoke">In short</span>
            {summary}
          </p>
        </Reveal>
      )}
      <div className="mt-10 space-y-14">{children}</div>
    </section>
  )
}

export function TextSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="font-display text-title font-light text-ink md:text-heading-sm">
        <MaskReveal>{title}</MaskReveal>
      </h3>
      <Reveal delay={0.1}>
        <div className="case-prose mt-5 space-y-5">{children}</div>
      </Reveal>
    </section>
  )
}

/** Untitled block inside a chapter (e.g. an outcome between figures). */
export function Section({ children }: { children: React.ReactNode }) {
  return <section className="case-prose space-y-5">{children}</section>
}

/* ================================================================
   Callouts
   ================================================================ */

export function Callout({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <Reveal>
      <Card className="my-10 p-6 sm:p-8">
        {label && <Eyebrow className="mb-3">{label}</Eyebrow>}
        <p className="font-display text-title font-light text-ink">{children}</p>
      </Card>
    </Reveal>
  )
}

/** Decision → Why → Tradeoff → Mitigation, laid out as a small decision log. */
export function DecisionLog({
  rows,
}: {
  rows: { label: string; body: React.ReactNode }[]
}) {
  return (
    <Reveal>
    <Card className="my-10 overflow-hidden p-0">
      <dl className="divide-y divide-stone">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[120px_1fr] sm:gap-6 sm:px-8",
              i === 0 && "bg-stone/50"
            )}
          >
            <dt className="font-mono text-mono uppercase tracking-wide text-smoke">
              {row.label}
            </dt>
            <dd className={cn("text-body", i === 0 ? "font-medium text-ink" : "text-graphite")}>
              {row.body}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
    </Reveal>
  )
}

/* ================================================================
   Media and numbers
   ================================================================ */

/**
 * Marks where a screen still needs to be added: a dashed frame the size of a figure,
 * with what to show. Replace it with <Figure><Image …/></Figure> once the screen exists.
 */
export function ScreenPlaceholder({ label, caption }: { label: string; caption?: string }) {
  return (
    <Reveal>
      <figure className="my-10">
        <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-card border border-dashed border-ash bg-warm-taupe p-6 text-center">
          <ImagePlus aria-hidden className="h-6 w-6 text-ash" strokeWidth={1.5} />
          <p className="font-mono text-mono uppercase tracking-wide text-smoke">Screen to add</p>
          <p className="max-w-[36ch] text-body-sm text-graphite">{label}</p>
        </div>
        {caption && <figcaption className="mt-3 text-body-sm text-smoke">{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}

/** A simple, scrollable data table in the case-study style (first column is the row header). */
export function DataTable({
  caption,
  columns,
  rows,
}: {
  caption: string
  columns: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <Reveal>
      <div className="my-8 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-body-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-stone font-mono text-mono uppercase tracking-wide text-smoke">
              {columns.map((c) => (
                <th key={c} scope="col" className="py-3 pr-4 font-normal last:pr-0">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-stone align-top">
                {r.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="py-3 pr-4 font-normal text-ink">
                      {cell}
                    </th>
                  ) : (
                    <td key={j} className="py-3 pr-4 text-graphite last:pr-0">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

export function Figure({
  children,
  caption,
}: {
  children: React.ReactNode
  caption?: string
}) {
  return (
    <Reveal>
    <figure className="my-10">
      {/* Warm-taupe frame, then a white mat, so every screen has room to breathe
          (cut-out components never touch the edge). */}
      <div className="overflow-hidden rounded-card bg-warm-taupe p-2 sm:p-4">
        <div className="rounded-small bg-white p-[5%] shadow-hairline [&_img]:rounded-[6px]">
          {children}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-body-sm text-smoke">{caption}</figcaption>
      )}
    </figure>
    </Reveal>
  )
}

/**
 * The results moment, first thing in the Outcome chapter: the case study's headline
 * numbers (from lib/projects), set large and counted up as they scroll in.
 * A before → after figure runs from the before value to the after one.
 */
export function Results({ slug }: { slug: string }) {
  const outcomes = getProject(slug).glance.outcomes
  return (
    <section aria-label="Results">
      <Stagger className={cn("grid grid-cols-1 border-y border-stone", outcomes.length > 1 && "sm:grid-cols-2")}>
        {outcomes.map((o, i) => (
          <StaggerItem
            key={o.label}
            className={cn("py-8 sm:py-10", i > 0 && "border-t border-stone sm:border-t-0 sm:border-l sm:pl-8")}
          >
            {/* capped at 56px so a before → after figure fits half the prose column */}
            <p className="font-headline text-display font-light whitespace-nowrap text-ink xl:text-[56px]">
              <CountUp value={o.value} duration={1.6} />
            </p>
            <p className="mt-3 max-w-[28ch] text-body text-smoke">{o.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}

export function OutcomeCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Card className="flex flex-col justify-between gap-6 p-6 sm:p-8">
      <span className="font-display text-heading font-light text-ink sm:text-display">
        <CountUp value={title} />
      </span>
      <span className="text-body-sm text-smoke">{subtitle}</span>
    </Card>
  )
}

/* ================================================================
   Next case study
   ================================================================ */

function NextProject({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <NextProjectCard
      href={`/work/${next.slug}`}
      company={next.company}
      years={next.years}
      title={next.title}
      metric={next.metric}
      metricLabel={next.metricLabel}
    />
  )
}
