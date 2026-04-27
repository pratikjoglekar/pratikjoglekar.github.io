import Link from "next/link"
import StickyHome from "@/components/StickyHome"
import Image from "next/image";


export default function UsageIntelligenceCaseStudy() {
  return (

    <>
      <StickyHome />
    <main className="min-h-screen px-4 sm:px-5 py-8 pt-24">

      {/* Header */}
      <header className="max-w-[720px] mx-auto mb-12">
        <h1 className="mt-4 text-4xl italic font-medium text-muted-foreground">
          Usage Intelligence Platform
        </h1>

        <p className="mt-1 text-base text-muted-foreground">
          HubSpot
        </p>
      </header>

      {/* TL;DR */}
      <TextSection title=" ">
        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">
                <strong>TL;DR:</strong>{" "}<br/>In 5 months, we built a scalable usage intelligence layer that improved data reliability, reduced critical usage gaps by 40%, and enabled teams to proactively monitor customer behavior without engineering support.
              </p>
          </div>
        </div>
      </TextSection>



      {/* Hero image */}
      <section className="max-w-[720px] mx-auto mb-8">
        <div className="rounded-xl bg-muted overflow-hidden">
          <Image
            src="/images/uip/uip.png"
            alt="HubSpot Usage Intelligence Platform dashboard overview"
            width={1440}
            height={1020}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>



      {/* Meta */}
      <section className="max-w-[720px] mx-auto mb-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-base font-bold">
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

        <p>
          The work focused on building a robust foundation rather than shallow
          reporting&mdash;improving data quality, enabling usage insights across
          roles, product areas, and customer teams, and explicitly supporting
          adoption, informed decision-making, and long-term customer value.
        </p>
      </TextSection>

      {/* Impact */}
      <TextSection title="Impact">
        <p>
          <mark className="font-bold">Reduced critical usage gaps from 8.5% &rarr; 5.1%,</mark> enabling faster detection, ownership clarity, and proactive intervention at scale.
        </p>
      </TextSection>

      {/* Problem */}
      <TextSection title="The Problem">
        <p className="text-4xl">
          How might we enable users to efficiently create reliable and
          actionable usage metrics to support their company and to drive usage
          and user retention?
        </p>

        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">
                <strong>Decision:</strong>{" "}Explicitly reject building another analytics surface in favor of establishing usage ownership and governance.<br/>
                <strong>Why:</strong>{" "}Existing tools optimized for exploration, not accountability or action.<br/>
                <strong>Tradeoff:</strong>{" "}Less flexibility for ad-hoc analysis in favor of consistency and trust.
              </p>
          </div>
        </div>
      </TextSection>


      {/* Goals */}
      <TextSection title="Goals">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Establish a reliable foundation for usage instrumentation:</li>
          <ul>
            <li>Build a dedicated platform that allows teams to securely create, store, and manage usage events within the product ecosystem, reducing dependence on external systems for operational usage signals.</li>
          </ul>
          <li className="font-bold">Improve data reliability and reduce critical usage risks:</li>
          <ul>
            <li>Decrease event-related critical situations from 8.5% by introducing improved, robust, and resilient data infrastructure that strengthens event integrity, consistency, and auditability.</li>
          </ul>
          <li className="font-bold">Shorten feedback loops for product and customer teams:</li>
          <ul>
            <li>Enable faster identification of, and response to, usage issues by making core usage signals immediately accessible, supporting day-to-day decision-making without replacing existing analytics tools.</li>
          </ul>
          <li className="font-bold">Design for scale and long-term ownership across teams:</li>
          <ul>
            <li>Ensure the platform can support growing product complexity, multiple teams, and evolving use cases&mdash;positioning usage intelligence as a durable capability rather than a point solution.</li>
          </ul>
        </ul>
      </TextSection>

      {/* Why needed */}
      <TextSection title="Why was this needed?">
        <p>
          While customers could already create usage events, meaningful interpretation and action depended on external analytics platforms such as Amplitude and Looker. This introduced fragmentation, slower turnaround times, and additional operational overhead&mdash;particularly for teams needing to respond quickly to usage risks.
        </p>
        <p>
          For HubSpot, focusing on SMB customers (who might not even have analytical tools), this dependency limited the ability to deliver a seamless, end-to-end experience around usage intelligence. The goal was not necessarily to replace dedicated analytics tools, but <mark className="font-bold">to establish a framework that supports faster instrumentation, immediate visibility, and quicker action</mark> while continuing to coexist with deeper analytical workflows where present.
        </p>
        <p>
          By bringing core usage processing closer to the product experience, teams could function without external tooling for day-to-day decisions, shorten feedback loops, and address critical situations before escalation&mdash;without disrupting the existing analytics ecosystem.
        </p>


        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">
                <strong>Decision:</strong>{" "}Build a complementary usage intelligence layer instead of replacing existing analytics tools.<br/>
                <strong>Why:</strong>{" "}Replacement would disrupt established workflows and slow adoption across teams.<br/>
                <strong>Tradeoff:</strong>{" "}Limited exploratory depth compared to full analytics platforms.
              </p>
          </div>
        </div>

      </TextSection>

      {/* Flow diagram */}
      <Section>
        <section className="max-w-[720px] mx-auto mb-8">
        <div>
          <Image
            src="/images/uip/flow.png"
            alt="Existing user action flow before the Usage Intelligence Platform"
            width={1440}
            height={1020}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

        <p className="mt-4 text-base text-muted-foreground text-center">
          No data reliability, instrumentation protection, or reporting in place.
        </p>
      </Section>

      {/* Challenges */}
      <TextSection title="Challenges I encountered">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Migration of legacy events:</li>
          <ul>
            <li>Transitioning existing events to a new database while preserving data integrity, historical continuity, and live customer workflows.</li>
          </ul>
          <li className="font-bold">Designing a scalable system architecture:</li>
          <ul>
            <li>Defining technical capabilities that support flexibility, performance, and future growth without over-engineering.</li>
          </ul>
          <li className="font-bold">Establishing a clear usage event framework:</li>
          <ul>
            <li>Documenting a shared usage library covering event creation, data capture, and processing to ensure consistency and ease of adoption.</li>
          </ul>
        </ul>

        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">
                <strong>Decision:</strong>{" "}Prioritized a flexible event schema over exhaustive upfront standardization.<br/>
                <strong>Why:</strong>{" "}Teams needed to move fast without heavy governance blocking early adoption.<br/>
                <strong>Tradeoff:</strong>{" "}Increased risk of inconsistency early on.<br/>
                <strong>Mitigation:</strong>{" "}Introduced validation, auditing, and alerting as safety nets.
              </p>
          </div>
        </div>

      </TextSection>

      {/* Design strategy */}
      <TextSection title="Design Strategy">

        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">
                <strong>Insight:</strong>{" "}
                SMBs lack a single, trusted way to govern, monitor, and understand their events&mdash;forcing them to react to data issues only after they&rsquo;ve already caused downstream risk.
              </p>
          </div>
        </div>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Interview</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Interviewed 8 SMB businesses to learn about their experience with data
              and ways we could improve it. We identified a few critical points
              among others:
            </p>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Event ownership and governance gaps:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Event logic lived in code files with unclear ownership. While this
                  enabled flexibility, it also meant changes could be made by anyone
                  without visibility, accountability, or shared understanding.
                </p>
              </li>

              <li>
                <strong>Limited visibility into important events:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Users struggled to easily identify and monitor the events that
                  mattered most. There was no clear way to surface key events or
                  understand how they were evolving over time.
                </p>
              </li>

              <li>
                <strong>Lack of trend awareness:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Users wanted lightweight ways to view trends for critical events
                  without relying on external analytics tools or complex workflows.
                </p>
              </li>

              <li>
                <strong>No transparency around event changes:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  There was no reporting or notification when events were created,
                  modified, or deleted, making it difficult to track changes or
                  diagnose downstream issues.
                </p>
              </li>

              <li>
                <strong>Data protection and risk exposure:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Deleting a code file resulted in permanent data loss with no
                  immediate signal or safeguard. Issues often resurfaced only after
                  propagating into analytics tools, increasing response time and risk.
                </p>
              </li>

              <li>
                <strong>No detection of event irregularities:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  The system lacked foundational support for anomaly detection. Teams
                  could not generate alerts for unexpected changes in event volume or
                  behavior, limiting proactive intervention.
                </p>
              </li>
            </ul>
          </li>
        </ul>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Workshop</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              A cross-functional workshop was conducted with key stakeholders <mark className="font-bold">to map the current system state, surface technical constraints, and align on feasible solution directions.</mark> This helped establish a shared understanding of platform limitations, clarify non-negotiables, and ground early ideation in real architectural constraints&mdash;reducing risk and rework downstream.
            </p>
          </li>
        </ul>
        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Stakeholder alignment and choice of direction</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Following the workshop, stakeholders aligned on the technical constraints, ownership model, and decision principles. The group agreed to move forward with a usage framework focused on fast feedback loops and operational reliability, while explicitly positioning it as a complementary layer to existing analytics tools. This alignment clarified scope, reduced ambiguity, and enabled teams to proceed with execution confidently.
            </p>
          </li>
        </ul>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Final designs and metric improvements</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Delivered an end-to-end user journey by introducing an interface that made event creation and customer activity tracking dramatically easier. By doing so, we improved our metrics beyond expectations.
            </p>
          </li>
        </ul>
      </TextSection>

      {/* Outcomes */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <ul className="list-disc space-y-4 pl-5">
            <li className=" text-base text-muted-foreground">
              <strong className="text-xl">Outcome 1</strong>
              <p>Critical usage situations dropped from an <mark className="font-bold">expected 8.5% to 5.1% (40% improvement),</mark> exceeding our original target.</p>
            </li>
          </ul>
          <OutcomeCard title="Expected 8.5% &rarr; Actual 5.1%" subtitle="Critical-situation reduction" />
        </div>
      </Section>

      <section className="max-w-[720px] mx-auto mb-8">
        <div className="rounded-xl bg-muted overflow-hidden">
          <Image
            src="/images/uip/uip.png"
            alt="Usage Intelligence Platform dashboard"
            width={1440}
            height={1020}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>



      {/* Outcomes */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <ul className="list-disc space-y-4 pl-5">
            <li className=" text-base text-muted-foreground">
              <strong className="text-xl">Outcome 2</strong>
              <p>An intuitive way to create events without relying on manual coding.</p>
            </li>
          </ul>
          <OutcomeCard title="No-code" subtitle="Easier event creation, faster tracking launch" />
        </div>
      </Section>

      <section className="max-w-[720px] mx-auto mb-8">
        <div className="rounded-xl bg-muted overflow-hidden">
          <Image
            src="/images/uip/createevent.png"
            alt="No-code event creation experience"
            width={1440}
            height={1020}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>


      {/* Outcomes */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <ul className="list-disc space-y-4 pl-5">
            <li className=" text-base text-muted-foreground">
              <strong className="text-xl">Outcome 3</strong>
              <p>Learn about issues and act on them quickly.</p>
            </li>
          </ul>
          <OutcomeCard title="Alert signals" subtitle="Teams notice anomalies earlier, fewer production incidents" />
        </div>
      </Section>

      <section className="max-w-[720px] mx-auto mb-8">
        <div className="rounded-xl bg-muted overflow-hidden">
          <Image
            src="/images/uip/alerts.png"
            alt="Alerting experience for event anomalies"
            width={1440}
            height={1020}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>



      {/* Outcomes */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <ul className="list-disc space-y-4 pl-5">
            <li className=" text-base text-muted-foreground">
              <strong className="text-xl">Outcome 4</strong>
              <p>Identify ownership and shared responsibility by tracking important events.</p>
            </li>
          </ul>
          <OutcomeCard title="Auditing" subtitle="Increased trust in data, faster decision-making" />
        </div>
      </Section>

      {/* Next actions */}
      <TextSection title="Next actions I would have taken">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Configurable event anomaly detection:</li>
          <ul>
            <li>Enable users to define event-specific volume thresholds and anomaly rules, giving teams control over what constitutes normal versus critical behavior for their context.</li>
          </ul>
          <li className="font-bold">Seamless data flow across experimentation and analytics:</li>
          <ul>
            <li>Allow usage data to flow bi-directionally between A/B testing and analytical tools, reducing duplication and enabling faster validation of product and growth decisions.</li>
          </ul>
          <li className="font-bold">Integrated behavioral signals:</li>
          <ul>
            <li>Introduce contextual insights such as heat maps, rage clicks, and session indicators directly within the experience, supporting efficient diagnosis without requiring tool switching.</li>
          </ul>
        </ul>
      </TextSection>

      {/* Conclusion */}
      <TextSection title="Conclusion">
        <p>
          This project established usage intelligence as a durable platform capability rather than an afterthought or external dependency. By focusing on reliability, visibility, and speed to action, <mark className="font-bold">the team moved from reactive investigation to proactive usage monitoring,</mark> reducing critical situations and enabling faster, more confident decisions across product and customer teams.
        </p>
        <p>
          More importantly, the work led to a durable foundation that scales with product complexity and organizational change instead of relying on individual ownership or manual processes. The system establishes accountability, safeguards, and clarity, supporting long-term adoption and consistent outcomes. This shift positioned usage data as an operational asset that teams can trust, act on, and evolve over time.
        </p>

        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">This work reinforced my belief that reliable systems, clear ownership, and fast feedback loops matter more than sophisticated analytics when teams need to act with confidence at scale.
              </p>
          </div>
        </div>
      </TextSection>
    </main>
    </>
  )
}

/* ------------------ */
/* Reusable pieces   */
/* ------------------ */

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-[720px] mx-auto mb-16">
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
      <h2 className="mb-4 text-4xl italic font-light text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
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
    <div className="rounded-xl px-4 py-6 text-center bgColor">
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-1 text-base">
        {subtitle}
      </div>
    </div>
  )
}
