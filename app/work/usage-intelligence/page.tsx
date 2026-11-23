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
  ScreenGrid,
} from "@/components/case-study/CaseStudy"
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure"

export const metadata = caseStudyMetadata("usage-intelligence")

export default function UsageIntelligenceCaseStudy() {
  return (
    <CaseStudyLayout slug="usage-intelligence">
      <CaseHeader
        slug="usage-intelligence"
        tldr={<>HubSpot customers could create usage events, but had no trusted way to own, protect or monitor them, so data problems surfaced only after they caused damage. In 5 months, as the sole product designer, I designed a governance layer that sits beside the analytics tools teams already used: no-code event creation, alerts and auditing. Critical usage situations fell from an expected 8.5% to 5.1%.</>}
      />

      <CaseBody>
      <Chapter
        number={1}
        title="Context"
        summary={<>Customers could create usage events, but nobody clearly owned them, and problems only surfaced after they spread into analytics tools.</>}
      >
        <TextSection title="Events nobody owned">
          <p>Usage events are the signals that show how customers use a product: a feature activated, a report run, a workflow completed. HubSpot customers could already create them, but making sense of them depended on outside tools such as Amplitude and Looker. Many SMB customers did not have those tools at all.</p>
          <p>Four things kept going wrong. Event logic lived in code files that anyone could change, and nobody owned the result. Deleting one of those files deleted live event data, with no safeguard and no signal. Problems showed up only after they had spread into analytics tools, because nothing flagged a sudden change in volume. And there was no simple way to find the events that mattered most, or follow their trends, without leaving the product.</p>
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
              { label: "Why", body: <>Amplitude and Looker were built for exploring data. Nobody was accountable for an event, and nothing told a team when one broke.</> },
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
          <AnnotatedFigure
            src="/images/uip/create-1.png"
            alt="Create New Event, step 1 of 4: team and limit counters, namespace, noun and verb fields that combine into Deal Created, database, event class, a protected-event choice and a description"
            width={1928}
            height={1617}
            caption="Step 1 of creating an event."
            pins={[
              { x: 17.6, y: 1.9, title: "Four steps, always in view.", body: "Details, properties, reviewers, then review." },
              { x: 12.6, y: 19.8, title: "Limits up front.", body: "Team-owned events and the total against the 4,500 limit, before anything is created." },
              { x: 12.6, y: 45, title: "The naming standard, built in.", body: "A noun and a past-tense verb combine into the event name, so names stay consistent." },
              { x: 12.6, y: 69.7, title: "Protection asked up front.", body: "Whether the event is protected is decided at creation, with what that means for downstream reports." },
            ]}
          />

          <p><strong className="case-h3">Alerts before customers notice</strong></p>
          <p>Each event shows its expected range, flags anomalies on its chart, and names the teams that own it. Teams subscribe to the events they care about, so an unexpected change reaches the owner before it turns into an incident.</p>
          <AnnotatedFigure
            src="/images/uip/detail-usedby.png"
            alt="Event detail for Chrome Devtools Interaction: owners in Slack and teams, a usage chart with expected range and five flagged anomalies, and the Used By tab listing charts, cohorts, custom events and URLs that depend on it"
            width={1928}
            height={2383}
            caption="An event in detail."
            pins={[
              { x: 69, y: 3.4, title: "Subscribe to it.", body: "Teams pin and subscribe to the events they care about, so alerts reach them." },
              { x: 73.5, y: 11.6, title: "Named owners.", body: "The Slack channels and teams that own the event, one click away." },
              { x: 96.2, y: 18.9, title: "Anomalies, flagged.", body: "Unexpected points are marked on the chart against the expected range." },
              { x: 20.4, y: 39.3, title: "What depends on it.", body: "Every chart, cohort and URL that uses the event, visible before anyone changes or deletes it." },
            ]}
          />

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
          <p>We tested the direction before building: the eight SMB interviews and the cross-functional workshop put governance up against another dashboard before design went deep. We tracked the result against a target, the expected 8.5% rate of critical usage situations, and it came in at 5.1%. Event ownership and audit trails were still in use after the initial rollout.</p>
          <p>What I could not measure: how much alerts and protection each contributed on their own. So the table below separates what was measured from what I believe.</p>
        </TextSection>

        <TextSection title="Screens and states">
          <p>The rest of the create-event flow. Select any screen to see it full size.</p>
          <ScreenGrid
            items={[
              { src: "/images/uip/create-2.png", alt: "Create New Event, add properties: property counters, naming guidance with incorrect and correct examples, and an Action property with its description", width: 1928, height: 1475, caption: "Step 2: properties, with the naming rule and a correct and incorrect example beside the field." },
              { src: "/images/uip/create-3.png", alt: "Create New Event, add reviewers: owning teams, product analysts, additional reviewers and a documentation link", width: 1928, height: 1362, caption: "Step 3: owners, product analysts and reviewers, so every event has someone accountable from day one." },
              { src: "/images/uip/create-4.png", alt: "Create New Event, review changes: owners, analysts and reviewers, the event name Sales Qualified Deal Created with its database, class and protection, and each property described", width: 1928, height: 1703, caption: "Step 4: one review of everything before it goes out." },
              { src: "/images/uip/modal-submit.png", alt: "Dialog: Are you sure you want to submit the event for review? The event will be created after a team member or product analyst reviews it. Submit for Review and Cancel", width: 1034, height: 524, caption: "Submitting says what happens next: the event is created once a teammate or analyst reviews it." },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>Critical usage situations fell from an expected 8.5% to 5.1%, a 40% improvement that beat the target.</>}
      >
        <Results slug="usage-intelligence" />

        <TextSection title="What I can and cannot claim">
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
              src="/images/uip/library.png"
              alt="Usage library: event search with team, analyst, database, stack and class filters, pinned and other events with volume, queries and trend lines, anomaly warnings, and team stats"
              width={2502}
              height={2586}
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
        <TextSection title="Migration and scale">
          <p>The hardest part was migration. Existing events had to move to a new database without losing data, history or the customer workflows running on them. The architecture also had to leave room to grow without building for needs nobody had yet.</p>
          <p>What held it together was one documented usage library for creating, capturing and processing events. Without it, the flexible schema would have turned into inconsistency.</p>
        </TextSection>

        <TextSection title="What I would do next">
          <p>First, configurable anomaly rules, so each team decides what normal and critical look like for its own events. Then usage data flowing both ways between experimentation and analytics tools, and behavioral signals such as heat maps and rage clicks shown in context, so diagnosing a problem does not mean switching tools.</p>
        </TextSection>
      </Chapter>

    </CaseBody>
    </CaseStudyLayout>
  )
}
