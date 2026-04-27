import Link from "next/link"
import Image from "next/image";
import StickyHome from "@/components/StickyHome"

export default function Cancellation() {
  return (

    <>
      <StickyHome />
    <main className="min-h-screen px-4 sm:px-5 py-8 pt-24">

      {/* Header */}
      <header className="max-w-[720px] mx-auto mb-12">
        <h1 className="mt-4 text-4xl italic font-medium text-muted-foreground">
          Retention Intervention at Cancellation
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
                <strong>TL;DR:</strong>{" "}<br/>In 2 months, we designed and validated a targeted, time-bound retention intervention at cancellation that improved dollar retention by 35.8% among discount recipients and drove 14% post-discount continuation, proving that contextual incentives can extend customer lifetime value without introducing permanent pricing changes.
              </p>
          </div>
        </div>
      </TextSection>

      {/* Hero image */}
      <section className="max-w-[720px] mx-auto mb-8">
          <div className="rounded-xl bg-muted overflow-hidden">
            <Image
                  src="/images/retention/retention.png"
                  alt="HubSpot retention intervention discount panel at cancellation"
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
            "2 Developers",
            "1 Product Manager",
            "1 Data Analyst",
          ]}
        />
        <MetaBlock
          label="Discipline"
          value={["UXR, Design Strategy", "Data Analysis, UX, UI"]}
        />
        <MetaBlock
          label="Duration"
          value={["2 months"]}
        />
      </section>

      {/* Project overview */}
      <TextSection title="Project Overview">
        <p>
          The cost of acquiring starter customers significantly exceeded their short-term revenue contribution, resulting in a payback period of nearly 2 years. Customers who churned before reaching this threshold created negative unit economics, where acquisition costs outweighed the lifetime value generated.
        </p>

        <p>
          This project focused on improving dollar retention and lifetime value by extending customer tenure, particularly at critical churn moments. By identifying and intervening at high-risk points in the customer journey, the initiative aimed to rebalance acquisition efficiency with sustainable growth, ensuring that starter customers deliver long-term value rather than incremental loss.
        </p>
      </TextSection>

      {/* Impact */}
      <TextSection title="Impact">
        <p>
          The retention offer <mark className="font-bold">drove 35.8% dollar retention among discount recipients and 14% post-discount continuation,</mark> confirming that targeted incentives at cancellation can extend customer tenure and improve LTV beyond the discount window.
        </p>
      </TextSection>

      {/* Problem */}
      <TextSection title="The Problem">
        <p className="text-4xl">
          How might we retain starter customers longer to increase dollar retention and lifetime value, ensuring the cost of acquisition is recouped more efficiently?
        </p>
      </TextSection>

      {/* Goals */}
      <TextSection title="Goals">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Improve unit economics for starter customers:</li>
          <ul>
            <li>Reduce the gap between acquisition cost and realized value by increasing customer dollar retention and extending customer lifetime value beyond the CAC payback.</li>
          </ul>
          <li className="font-bold">Retain price-sensitive customers at critical churn moments:</li>
          <ul>
            <li>Intervene at the point of cancellation with a targeted, time-bound incentive to retain customers who are otherwise likely to churn due to affordability constraints.</li>
          </ul>
          <li className="font-bold">Increase customer lifetime value (LTV):</li>
          <ul>
            <li>Extend customer tenure through contextual retention offers, with the goal of improving LTV without introducing permanent pricing changes.</li>
          </ul>
          <li className="font-bold">Validate a discount-based retention hypothesis:</li>
          <ul>
            <li>Test whether offering a 50% discount can retain approximately one-third of price-sensitive customers and result in sustained usage beyond the discount period.</li>
          </ul>
          <li className="font-bold">Distinguish delayed churn from meaningful retention:</li>
          <ul>
            <li>Measure post-discount behavior to ensure the intervention drives continued product usage rather than short-term churn deferral.</li>
          </ul>
          <li className="font-bold">Establish a scalable retention intervention model:</li>
          <ul>
            <li>Create a repeatable, data-informed framework for retention interventions that can be refined, governed, and applied across similar customer segments.</li>
          </ul>
        </ul>
      </TextSection>

      {/* Why needed */}
      <TextSection title="Why was this needed?">
        <p>
          HubSpot observed a sustained increase in cancellations and plan downgrades among starter customers, signaling growing pressure on retention and long-term revenue health. Left unaddressed, this downward trend risked eroding customer lifetime value, weakening unit economics, and increasing reliance on acquisition to offset churn.
        </p>
        <p>
          The objective was to intervene early and deliberately, testing targeted retention strategies to stabilize this trajectory, retain price-sensitive customers, and protect long-term value. By addressing churn at its most critical moment, the initiative aimed to <mark className="font-bold">shift retention from reactive loss mitigation to a more intentional, data-informed growth lever.</mark>
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
                <strong>Decision:</strong>{" "}Frame the initiative around unit economics and lifetime value rather than reducing raw churn.<br/>
                <strong>Why:</strong>{" "}Churn alone masked the true business risk&mdash;customers leaving before CAC payback created negative unit economics.<br/>
                <strong>Tradeoff:</strong>{" "}Some retained users would still churn later, limiting short-term churn-reduction optics.<br/>
                <strong>Mitigation:</strong>{" "}Measure success using dollar retention and post-discount continuation, not cancellation deferral.
              </p>
          </div>
        </div>

      </TextSection>



      {/* Challenges */}
      <TextSection title="Challenges I encountered">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Complex stakeholder coordination:</li>
          <ul>
            <li>The project involved multiple teams across growth, pricing, legal, engineering, and customer experience, creating significant coordination overhead and competing priorities.</li>
          </ul>
          <li className="font-bold">Evolving scope and trade-offs:</li>
          <ul>
            <li>Repeated iteration was required to align on customer-facing language, technical feasibility, and shifting roadmap constraints, often in parallel with active development.</li>
          </ul>
          <li className="font-bold">High technical and strategic uncertainty:</li>
          <ul>
            <li>HubSpot had not previously implemented a comparable retention strategy, requiring new technical patterns, risk-mitigation approaches, and close experimentation to ensure reliability and compliance.</li>
          </ul>
        </ul>
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
                <strong>Insight:</strong>{" "}Price-sensitive customers aren&rsquo;t rejecting the product&mdash;they&rsquo;re signaling a temporary mismatch between value timing and affordability. Well-timed flexibility can preserve trust while extending lifetime value.</p>
          </div>
        </div>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Competitive Landscape & Market Signals</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Competitor behavior strongly validated discount-based retention as an accepted market pattern. Several B2B SaaS companies already deploy targeted discounts across key customer touchpoints, including cancellation, indicating both customer expectation and commercial viability.
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Observed competitors included: <strong>VEED.IO, Jasper.ai, Notion, Intercom, ClickFunnels, Canva,</strong> and others.
            </p>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Discounts are contextual, not universal:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Competitors surface discounts at specific moments of intent&mdash;most commonly during cancellation, downgrade flows, or renewal checkpoints&mdash;rather than as always-on offers.
                </p>
              </li>

              <li>
                <strong>Positioning varies by touchpoint:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Discounts are framed differently depending on where the user is in their journey, reinforcing the importance of matching the intervention to user intent rather than relying on generic promotions.
                </p>
              </li>

              <li>
                <strong>Language drives acceptance:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Successful implementations used inviting, empathetic, and benefit-led language, positioning the discount as support or flexibility rather than a hard sell.
                </p>
              </li>

              <li>
                <strong>Instant gratification is expected:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  In nearly all cases, the discount took effect immediately upon acceptance. Delayed activation introduced friction and reduced perceived value.
                </p>
              </li>
            </ul>
            <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  These <mark className="font-bold">insights reinforced the decision to introduce a time-bound, contextual retention offer at cancellation,</mark> designed to feel supportive rather than transactional, activate immediately, and align with established SaaS norms while maintaining HubSpot&rsquo;s brand and pricing integrity.
            </p>
          </li>
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
                <strong>Decision:</strong>{" "}Introduce a time-bound discount only at the moment of cancellation rather than earlier in the journey.<br/>
                <strong>Why:</strong>{" "}Cancellation represents explicit intent and maximum price sensitivity, increasing relevance and acceptance.<br/>
                <strong>Tradeoff:</strong>{" "}Limited opportunity to influence users who churn silently without entering the flow.<br/>
                <strong>Mitigation:</strong>{" "}Scope the experiment tightly to validate impact first before exploring earlier signals.
              </p>
          </div>
        </div>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Cohort Selection</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              To ensure the experiment produced reliable and actionable results, the initial rollout was deliberately scoped to a narrowly defined customer cohort. Working with an analyst, I reviewed data across paying customers, product adoption, and billing configurations to identify a segment most likely to benefit from&mdash;and respond to&mdash;the intervention.
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              The selected cohort included:
            </p>
              <ul className="list-disc space-y-4 pl-5">
                <li>Customers on <strong>starter products</strong></li>
                <li>Customers using the <strong>Starter Customer Platform</strong></li>
                <li>Customers on the <strong>new seats-based pricing model</strong></li>
                <li>Customers on a <strong>Monthly Commit, Monthly Pay plan</strong></li>
              </ul>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              By constraining the experiment to a focused, price-sensitive segment with clear churn-risk signals, we reduced noise, improved interpretability of results, and increased confidence in causal impact. This approach allowed us to validate the retention hypothesis efficiently before considering broader rollout or additional segments.
            </p>
          </li>
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
                <strong>Decision:</strong>{" "}Constrain the experiment to a narrowly defined, high-risk starter cohort.<br/>
                <strong>Why:</strong>{" "}A focused segment reduced noise, increased causal confidence, and allowed faster validation.<br/>
                <strong>Tradeoff:</strong>{" "}Results would not immediately generalize to all customer segments.<br/>
                <strong>Mitigation:</strong>{" "}Treat this as a validation step, not a final rollout, with clear criteria for expansion.
              </p>
          </div>
        </div>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">User Flow Analysis</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              To determine the most effective placement for the discount offer, I mapped the end-to-end cancellation flow to understand user intent, decision points, and drop-off risks. This helped identify a strategic moment where users had clearly expressed cancellation intent but were still open to intervention.
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              By grounding placement decisions in the full cancellation journey&mdash;rather than isolated screens&mdash;we ensured the discount panel appeared at a moment of highest relevance, maximizing clarity, acceptance, and impact without disrupting the overall experience.
            </p>
          </li>
        </ul>

      </TextSection>

      {/* Outcomes */}
      <TextSection title="Final Designs and metric improvements">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Discount page</li>
          <ul>
            <li>A cohort-based, data-informed retention framework allowed me to evaluate retention strategies through experimentation rather than assumptions, establishing a repeatable intervention model without compromising pricing strategy.</li>
          </ul>
        </ul>
          <section className="max-w-[720px] mx-auto mb-8">
          <div className="rounded-xl bg-muted overflow-hidden">
            <Image
                  src="/images/retention/retention.png"
                  alt="Retention discount page presented at cancellation"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
          </div>
        </section>

        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Mini-checkout experience</li>
          <ul>
            <li>A mini-checkout with immediate discount visibility and clear legal language helped customers reverse their cancellation decisions with higher confidence and lower friction&mdash;increasing acceptance of the retention offer without eroding trust or pricing clarity.</li>
          </ul>
        </ul>
        <section className="max-w-[720px] mx-auto mb-8">
          <div className="rounded-xl bg-muted overflow-hidden">
            <Image
                  src="/images/retention/minicheckout.png"
                  alt="Mini-checkout experience showing the applied retention discount"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
          </div>
        </section>

        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Metric improvement</li>
          <ul>
            <li>The contextual, time-bound discount presented at cancellation helped price-sensitive customers reconsider cancellation instead of defaulting to churn.</li>
          </ul>
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <OutcomeCard title="35.8%" subtitle="Dollar retention within cancellation" />
        <OutcomeCard title="14%" subtitle="Post-discount continuation" />
        </div>
      </TextSection>

      {/* Differently */}
      <TextSection title="What I could have done differently">
        <p>I would invest more time in systematically A/B testing different discount levels. While the initial 50% discount was chosen to validate the core retention hypothesis quickly, time constraints limited deeper experimentation. Expanding tests across varied discount rates could have identified a more optimal balance between retention impact and revenue preservation, particularly across different levels of price sensitivity.</p>
      </TextSection>

      {/* Next actions */}
      <TextSection title="Next actions I would have taken">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Optimize discount levels through experimentation:</li>
          <ul>
            <li>Test varied discount values to identify the minimum effective incentive that maximizes retention while preserving or improving lifetime value.</li>
          </ul>
        </ul>
      </TextSection>

      {/* Conclusion */}
      <TextSection title="Conclusion">
        <p>This project demonstrated that <mark className="font-bold">targeted, time-bound interventions at the point of cancellation can meaningfully improve retention and lifetime value for price-sensitive customers.</mark> By grounding the strategy in unit economics, validating it through experimentation, and designing for transparency and trust, the team was able to stabilize churn without introducing permanent pricing changes.
        </p>
        <p>More importantly, the work established a repeatable retention model&mdash;one that balances customer empathy with business sustainability and can be refined through further experimentation as pricing and customer needs evolve.
        </p>

      <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">It helped me learn that effective retention is a systems problem, not a promotion problem. Clear intent signals, disciplined scoping, and fast validation matter more than aggressive incentives when teams need to protect lifetime value without eroding trust at scale.</p>
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
