import Link from "next/link"

export default function Projects() {
  return (
    <section className="max-w-full font-bold">
      <h2 className="mb-2 text-sm tracking-wide">
        PROJECTS:
      </h2>

      <ul className="space-y-2 md:space-y-1 text-sm">
        {/* ACTIVE CASE STUDY */}
          <li>
            <Link
              href="/work/c4cintegrations"
              className="group relative pl-4 underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span
                aria-hidden
                className="
                  absolute left-0 top-[0.6em]
                  h-1.5 w-1.5 rounded-full
                  bg-chart-2
                  shadow-[0_0_0_4px_rgba(110,163,13,0.15)]
                  animate-[pulse-glow_2.5s_ease-in-out_infinite]
                "
              />
              <span className="block sm:inline">
                Coursera for Campuses Integrations
              </span>{" "}
              <span className="text-muted-foreground whitespace-nowrap">
                (Coursera)
              </span>
            </Link>
          </li>
        
        <li>
            <Link
              href="/work/usage-intelligence"
              className="group relative pl-4 underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span
                aria-hidden
                className="
                  absolute left-0 top-[0.6em]
                  h-1.5 w-1.5 rounded-full
                  bg-muted-foreground
                "
              />
              <span className="block sm:inline">
                Usage Intelligence Platform
              </span>{" "}
              <span className="text-muted-foreground whitespace-nowrap">
                (HubSpot)
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/work/cancellation"
              className="group relative pl-4 underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span
                aria-hidden
                className="
                  absolute left-0 top-[0.6em]
                  h-1.5 w-1.5 rounded-full
                  bg-muted-foreground
                "
              />
              <span className="block sm:inline">
                Retention Intervention at Cancellation
              </span>{" "}
              <span className="text-muted-foreground whitespace-nowrap">
                (HubSpot)
              </span>
            </Link>
          </li>
        
          <li>
            <Link
              href="/work/dashboard"
              className="group relative pl-4 underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span
                aria-hidden
                className="
                  absolute left-0 top-[0.6em]
                  h-1.5 w-1.5 rounded-full
                  bg-muted-foreground
                "
              />
              <span className="block sm:inline">
                Dashboard Redesign
              </span>{" "}
              <span className="text-muted-foreground whitespace-nowrap">
                (MassMutual)
              </span>
            </Link>
          </li>
      </ul>
    </section>
  )
}
