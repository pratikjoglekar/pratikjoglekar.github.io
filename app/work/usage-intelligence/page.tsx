import Image from "next/image"
import {
  CaseStudyLayout,
  CaseHeader,
  CaseBody,
  Chapter,
  Results,
  caseStudyMetadata,
  TextSection,
  Callout,
  DecisionLog,
  DataTable,
  Figure,
} from "@/components/case-study/CaseStudy"

export const metadata = caseStudyMetadata("usage-intelligence")

export default function UsageIntelligenceCaseStudy() {
  return (
    <CaseStudyLayout slug="usage-intelligence">
      <CaseHeader
        slug="usage-intelligence"
        tldr={<>HubSpot customers could create usage events, but had no trusted way to own, protect or monitor them, so data problems surfaced only after they caused damage. In 5 months, as the sole product designer, I designed a governance layer that sits beside analytics tools instead of replacing them: no-code event creation, alerts and auditing. Critical usage situations fell from an expected 8.5% to 5.1%.</>}
      />

      <CaseBody>
      <Chapter
        number={1}
        title="Context"
        summary={<>Customers could create usage events, but nobody clearly owned them, and problems only surfaced after they spread into analytics tools.</>}
      >
        <TextSection title="Events nobody owned">
          <p>Usage events are the signals that show how customers use a product: a feature activated, a report run, a workflow completed. HubSpot customers could already create them, but making sense of them depended on outside tools such as Amplitude and Looker. Many SMB customers did not have those tools at all.</p>
          <p>The same four problems kept coming back:</p>
          <ul className="space-y-2">
            <li><strong>Nobody owned the events.</strong> Event logic lived in code files. Anyone could change it, with no visibility, accountability or shared understanding.</li>
            <li><strong>Data disappeared silently.</strong> Deleting a code file deleted live event data, with no safeguard and no signal.</li>
            <li><strong>Problems surfaced late.</strong> Issues showed up only after they had spread into analytics tools, and nothing flagged unexpected changes in event volume.</li>
            <li><strong>What mattered was hard to see.</strong> There was no simple way to find the most important events or follow their trends without leaving the product.</li>
          </ul>
          <Figure caption="Before: no data reliability, instrumentation protection, or reporting in place.">
            <Image
              src="/images/uip/flow.png"
              alt="Existing user action flow before the Usage Intelligence Platform"
              width={1440}
              height={1020}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Build ownership and governance, not another analytics surface.</> },
              { label: "Why", body: <>Existing tools were built for exploration, not for accountability or action.</> },
              { label: "Tradeoff", body: <>Less flexibility for ad-hoc analysis, in favor of consistency and trust.</> },
              { label: "Mitigation", body: <>Position it as a complementary layer that coexists with Amplitude and Looker.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={2}
        title="Problem"
        summary={<>8.5% of usage situations were expected to turn critical. Interviews with 8 SMBs showed where ownership and visibility broke down.</>}
      >
        <TextSection title="Problem statement">
          <p className="case-pullquote">How might we give teams a trusted way to create, own and monitor their usage events, so they catch problems before customers feel them, without replacing the analytics tools they already use?</p>
        </TextSection>

        <TextSection title="What customers told us">
          <p>I interviewed 8 SMB businesses about their experience with usage data. Each finding shaped a specific part of the design.</p>
          <DataTable
            caption="Interview findings and the part of the design each one shaped"
            columns={["What customers told us", "What it shaped"]}
            rows={[
              ["Event logic lived in code, and nobody knew who owned what", "Event ownership and an audit trail"],
              ["Deleting a file lost live data with no warning", "Protected events"],
              ["Changes to events happened without anyone knowing", "Notifications when events are created, changed or deleted"],
              ["Nothing flagged unexpected changes in event volume", "Team alerts for anomalies"],
              ["The important events were hard to find and follow", "A usage library with pinned events and volume trends"],
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={3}
        title="Approach"
        summary={<>Govern first, and leave deep analysis to the tools built for it. I designed ownership, protection and alerts, on a schema flexible enough for teams to move fast.</>}
      >
        <TextSection title="How I led the work">
          <p>As the only product designer, working with a PM, four developers and a data analyst:</p>
          <ul className="space-y-2">
            <li><strong>Ran a cross-functional workshop</strong> to map the current system, surface technical constraints and agree on what was non-negotiable, so ideas started from real architecture.</li>
            <li><strong>Aligned stakeholders on an ownership model</strong> and decision principles before design went deep, which settled scope and let the team execute with confidence.</li>
          </ul>
          <p><strong className="case-h3">The call I pushed for</strong></p>
          <p>The brief asked to &ldquo;improve analytics visibility.&rdquo; The interviews pointed somewhere else: the gap was ownership and governance. I argued against building another analytics surface, and for a governance layer that works beside Amplitude and Looker. Had governance been ignored, inconsistent events would have scaled, support load would have grown, and trust in the data would have eroded.</p>
          <Callout label="Insight">SMBs lacked a single, trusted way to govern, monitor and understand their events. So they reacted to data issues only after those issues had already caused damage.</Callout>
        </TextSection>

        <TextSection title="Options I ruled out">
          <DataTable
            caption="Options considered and why each was ruled out"
            columns={["Option", "Why I ruled it out"]}
            rows={[
              ["Another analytics dashboard", "Existing tools were built for exploration, not accountability or action"],
              ["Replacing Amplitude and Looker", "It would disrupt established workflows and slow adoption"],
              ["Exhaustive standardization up front", "Heavy governance would have blocked early adoption"],
            ]}
          />
        </TextSection>

        <TextSection title="Designing for trust">
          <DecisionLog
            rows={[
              { label: "Decision", body: <>A flexible event schema instead of exhaustive standardization up front.</> },
              { label: "Why", body: <>Teams needed to move fast, and heavy governance would have blocked early adoption.</> },
              { label: "Tradeoff", body: <>More risk of inconsistency early on.</> },
              { label: "Mitigation", body: <>Validation, auditing and alerting as safety nets.</> },
            ]}
          />

          <p><strong className="case-h3">No-code event creation</strong></p>
          <p>Creating an event used to mean writing code. A four-step flow (details, properties, reviewers, review) lets teams define an event without engineering support. It builds in the naming standard, a noun plus a past-tense verb such as &ldquo;Deal Created,&rdquo; and asks up front whether the event is protected. I traced failures in the old flow back to decision points nobody needed, and removing them cut errors in event creation by 70%.</p>
          <Figure caption="Creating an event without code: the naming standard and the protected-event choice are part of the flow.">
            <Image
              src="/images/uip/createevent.png"
              alt="No-code event creation experience"
              width={1440}
              height={1020}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">Alerts before customers notice</strong></p>
          <p>Each event shows its expected range, flags anomalies on its chart, and names the teams that own it. Teams subscribe to the events they care about, so an unexpected change reaches the owner while it is still a signal, not an incident.</p>
          <Figure caption="An event in detail: expected range, flagged anomalies and the owning teams.">
            <Image
              src="/images/uip/alerts.png"
              alt="Alerting experience for event anomalies"
              width={1440}
              height={1020}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">Protection and auditing</strong></p>
          <p>Important events can be protected, so they cannot disappear with a deleted file. Changes go through reviewers, and each event keeps a history of who changed what, so ownership stays visible long after launch.</p>
          <p>The history also carries context. When a change in volume is intended, a team can mark it as an expected drop and record the reason, so the next person reading the chart does not mistake it for an incident.</p>
          <Figure caption="An event&rsquo;s History tab: every change with its date, who made it and why, from creation to protection, with owners and alerts alongside.">
            <Image
              src="/images/uip/history.webp"
              alt="Usage library event detail showing owners, anomaly chart and a History tab listing each change: status changes with reasons, collaborating teams and properties added, the description, protection and creation"
              width={2000}
              height={1822}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>

        <TextSection title="Validation">
          <p>We checked the work three ways:</p>
          <ul className="space-y-2">
            <li><strong>The direction, before building.</strong> The eight SMB interviews and the cross-functional workshop tested the idea of governance over another dashboard before design went deep.</li>
            <li><strong>The result, against a target.</strong> We tracked critical usage situations against the expected rate of 8.5%. They came in at 5.1%, beating the target.</li>
            <li><strong>Whether it lasted.</strong> Event ownership and audit trails stayed in use after the initial rollout, instead of fading once launch attention moved on.</li>
          </ul>
          <p>What I could not measure: how much alerts and protection each contributed on their own. That is why those links stay hypotheses below.</p>
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>Critical usage situations fell from an expected 8.5% to 5.1%, a 40% improvement that beat the target.</>}
      >
        <Results slug="usage-intelligence" />

        <TextSection title="What my decisions plausibly moved">
          <p>The result belongs to the whole team, so I claim only the links I can defend, and I mark the rest as hypotheses.</p>
          <DataTable
            caption="Design decisions, the result each most plausibly affected, and the evidence"
            columns={["Decision", "Result it most plausibly affected", "Evidence"]}
            rows={[
              ["Alerts, protection and ownership", "Critical usage situations, 8.5% to 5.1%", "Hypothesis; not isolated from other changes"],
              ["A simpler event creation flow", "Errors in event creation, down 70%", "Measured on the creation flow"],
              ["Audit trail and ownership tracking", "Trust in usage data", "Ownership and audit trails persisted beyond launch"],
            ]}
          />
          <Figure caption="The usage library: pinned events, volume and trends, with alerts and notifications one click away.">
            <Image
              src="/images/uip/uip.png"
              alt="Usage Intelligence Platform usage library"
              width={1440}
              height={1020}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>
      </Chapter>

      <Chapter
        number={5}
        title="Reflection"
        summary={<>Clear ownership and fast feedback mattered more than sophisticated analytics. Next: configurable anomaly rules, and usage data flowing into experimentation tools.</>}
      >
        <TextSection title="Where it got hard">
          <ul className="space-y-2">
            <li><strong>Migrating legacy events.</strong> Existing events had to move to a new database while keeping data integrity, history and live customer workflows intact.</li>
            <li><strong>Scaling without over-engineering.</strong> The architecture had to leave room for growth without building for needs nobody had yet.</li>
            <li><strong>A shared framework.</strong> Teams needed one documented usage library for creating, capturing and processing events, or the flexibility would turn into inconsistency.</li>
          </ul>
        </TextSection>

        <TextSection title="What I would do next">
          <ul className="space-y-2">
            <li><strong>Configurable anomaly rules,</strong> so each team decides what normal and critical look like for its own events.</li>
            <li><strong>Usage data flowing both ways</strong> between experimentation and analytics tools, so product decisions are validated faster.</li>
            <li><strong>Behavioral signals in context,</strong> such as heat maps and rage clicks, so diagnosis does not require switching tools.</li>
          </ul>
          <Callout label="Lesson">Reliable systems, clear ownership and fast feedback loops matter more than sophisticated analytics when teams need to act with confidence at scale.</Callout>
        </TextSection>
      </Chapter>

    </CaseBody>
    </CaseStudyLayout>
  )
}
