import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import { Eyebrow } from "@/components/ds/primitives"
import { projects } from "@/lib/projects"

export const metadata = { title: "Page not found" }

/** Shown for any unknown URL, e.g. an old case-study link. Points people back to the work. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-page px-6 outline-none md:px-16">
        <section aria-labelledby="nf-title" className="pt-16 pb-20 md:pt-28 md:pb-28">
          <Eyebrow>404</Eyebrow>
          <h1 id="nf-title" className="mt-4 max-w-3xl font-headline text-heading font-light text-ink md:text-hero">
            This page does not exist.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-smoke">
            The link may be old or mistyped. Here is the work instead.
          </p>
        </section>

        <section aria-labelledby="nf-work" className="pb-20 md:pb-28">
          <Eyebrow as="h2" id="nf-work">
            Case studies
          </Eyebrow>
          <ul className="mt-6 border-t border-stone">
            {projects.map((p) => (
              <li key={p.slug} className="border-b border-stone">
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex items-center justify-between gap-6 py-6"
                >
                  <span>
                    <span className="block text-body-sm text-smoke">{p.company}</span>
                    <span className="font-display text-title font-light text-ink">{p.title}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <SiteFooter />
      </main>
    </>
  )
}
