import Link from "next/link"

export default function UsageIntelligenceCaseStudy() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-16 py-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Home
        </Link>

        <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
          Usage Intelligence Platform
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          HubSpot
        </p>
      </header>

      {/* Hero image */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="w-full aspect-[16/9] rounded-xl border bg-muted flex items-center justify-center text-muted-foreground">
          Image placeholder
        </div>
      </section>

      {/* Meta */}
      <section className="max-w-5xl mx-auto mb-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <MetaBlock
          label="Team"
          value={[
            "1 Product Designer",
            "4 Developers",
            "1 Product Manager",
            "1 Data Analyst",
          ]}
        />
        <MetaBlock
          label="Discipline"
          value={["UXR, Design Strategy", "System Design, UX, UI"]}
        />
        <MetaBlock
          label="Duration"
          value={["5 months"]}
        />
      </section>

      {/* Project overview */}
      <TextSection title="Project Overview">
        <p>
          As retention and sustainable usage became core business priorities,
          customers needed a reliable and scalable way to interpret product
          usage beyond surface-level metrics. This initiative established a
          durable usage intelligence layer that enabled teams to define
          consistent usage events, observe meaningful behavioral patterns, and
          act on them with confidence.
        </p>

        <p className="mt-4">
          The work focused on building a robust foundation rather than shallow
          reporting — improving data quality, enabling usage insights across
          roles, product areas, and customer teams, and explicitly supporting
          adoption, informed decision-making, and long-term customer value.
        </p>
      </TextSection>

      {/* Impact */}
      <TextSection title="Impact">
        <p className="bg-muted px-4 py-3 rounded-md">
          Reduced critical usage gaps from{" "}
          <strong>8.5% → 5.1%</strong>, enabling faster detection, ownership
          clarity, and proactive intervention at scale.
        </p>
      </TextSection>

      {/* Problem */}
      <TextSection title="The Problem">
        <p className="text-lg">
          How might we enable users to efficiently create reliable and
          actionable usage metrics to support their company and to drive usage
          and user retention?
        </p>
      </TextSection>

      {/* Goals */}
      <TextSection title="Goals">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Establish a reliable force for early usage foundations.
          </li>
          <li>
            Improve data reliability and reduce critical usage risks.
          </li>
          <li>
            Shorten feedback loops for product and customer teams.
          </li>
          <li>
            Design for scale and long-term ownership across teams.
          </li>
        </ul>
      </TextSection>

      {/* Why needed */}
      <TextSection title="Why was this needed?">
        <p>
          Customers relied heavily on usage metrics, yet instrumentation gaps,
          scattered implementations, and delayed feedback made it difficult to
          confidently interpret behavior or react quickly to usage risks.
        </p>

        <p className="mt-4">
          The platform needed a framework that supported faster instrumentation,
          immediate visibility, and consistent interpretation without requiring
          deep analytics expertise.
        </p>
      </TextSection>

      {/* Flow diagram */}
      <Section>
        <div className="w-full aspect-[16/5] rounded-xl border bg-muted flex items-center justify-center text-muted-foreground">
          Flow diagram placeholder
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          No data reliability, instrumentation protection, or reporting in
          place.
        </p>
      </Section>

      {/* Challenges */}
      <TextSection title="Challenges I encountered">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Migrating legacy events while preserving historical continuity.
          </li>
          <li>
            Designing a scalable system without over-engineering.
          </li>
          <li>
            Establishing a clear usage event framework across teams.
          </li>
        </ul>
      </TextSection>

      {/* Design strategy */}
      <TextSection title="Design Strategy">
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Interviews:</strong> Identified ownership gaps, governance
            confusion, and low visibility into meaningful events.
          </li>
          <li>
            <strong>Workshop:</strong> Facilitated cross-functional alignment
            to converge on a shared usage framework.
          </li>
          <li>
            <strong>Stakeholder alignment:</strong> Balanced technical
            feasibility with long-term product strategy.
          </li>
        </ul>
      </TextSection>

      {/* Outcomes */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <OutcomeCard title="8.5% → 5.1%" subtitle="usage gap reduction" />
          <OutcomeCard title="No-code" subtitle="event creation" />
          <OutcomeCard title="Alert signals" subtitle="risk detection" />
        </div>
      </Section>

      {/* Next actions */}
      <TextSection title="Next actions">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Enable anomaly detection and threshold-based alerts.
          </li>
          <li>
            Support A/B testing for usage-driven decisions.
          </li>
          <li>
            Integrate behavioral signals into in-product surfaces.
          </li>
        </ul>
      </TextSection>

      {/* Conclusion */}
      <TextSection title="Conclusion">
        <p>
          This initiative transformed usage from reactive investigation into
          proactive strategy. By establishing clear foundations, improving
          reliability, and enabling ownership, usage data became an operational
          asset teams could trust and act on.
        </p>
      </TextSection>
    </main>
  )
}

/* ------------------ */
/* Reusable pieces   */
/* ------------------ */

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-5xl mx-auto mb-16">
      {children}
    </section>
  )
}

function TextSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Section>
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </Section>
  )
}

function MetaBlock({
  label,
  value,
}: {
  label: string
  value: string[]
}) {
  return (
    <div>
      <div className="mb-1 font-medium text-muted-foreground">
        {label}
      </div>
      <ul className="space-y-1">
        {value.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  )
}

function OutcomeCard({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="rounded-xl border bg-muted px-4 py-6 text-center">
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">
        {subtitle}
      </div>
    </div>
  )
}
