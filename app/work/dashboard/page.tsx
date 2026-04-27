import Link from "next/link"
import Image from "next/image";
import StickyHome from "@/components/StickyHome"

export default function Dashboard() {
  return (

    <>
      <StickyHome />
    <main className="min-h-screen px-4 sm:px-5 py-8 pt-24">

      {/* Header */}
      <header className="max-w-[720px] mx-auto mb-12">
        <h1 className="mt-4 text-4xl italic font-medium text-muted-foreground">
          Dashboard Redesign
        </h1>

        <p className="mt-1 text-base text-muted-foreground">
          MassMutual
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
                <strong>TL;DR:</strong>{" "}<br/>In 6 months, we redesigned MassMutual's homepage from a navigational pass-through into a primary control surface, surfacing policy data, payments, and key actions upfront so customers could resolve more without leaving the page. By restructuring information hierarchy and translating insurance complexity into clear, contextual summaries, customers shifted from skimming and navigating away (15.02s) to engaging and resolving in place (34.66s).
              </p>
          </div>
        </div>
      </TextSection>



      {/* Hero image */}
      <section className="max-w-[720px] mx-auto mb-8">
              <div className="rounded-xl bg-muted overflow-hidden">
                <Image
                  src="/images/dashboard/dashboard.png"
                  alt="MassMutual homepage redesign hero overview"
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
            "7 Developers",
            "1 Product Owner",
            "1 Business Analyst",
            "1 Data Analyst",
          ]}
        />
        <MetaBlock
          label="Discipline"
          value={["UXR, Design Strategy", "Data Analysis, UX, UI"]}
        />
        <MetaBlock
          label="Duration"
          value={["6 months"]}
        />
      </section>

      {/* Project overview */}
      <TextSection title="Project Overview">
        <p>The insurance homepage served as the primary entry point for customers, yet it lacked clarity and prioritization, making it difficult for users to quickly understand their policies, see what mattered most, or take action with confidence. As insurance products and customer portfolios grew in complexity, the existing experience no longer supported fast, informed decision-making.
        </p>

        <p>This project focused on redesigning the homepage to surface the most important policy details upfront while enabling users to complete key actions efficiently. By restructuring information hierarchy, simplifying complex insurance data, and tailoring the experience to each customer&rsquo;s portfolio, the new homepage aimed to balance speed, clarity, and meaningful engagement, transforming the homepage from a passive landing page into an active control centre for policy management.
        </p>
      </TextSection>

      {/* Impact */}
      <TextSection title="Impact">
        <p>By pulling policy data, payment details, and key actions/information onto the homepage itself, <mark className="font-bold">we shifted customer behaviour from skim-and-navigate to engage-and-resolve. Median engagement time rose from 15.02s to 34.66s,</mark> not because tasks took longer, but because customers were now completing them on the homepage instead of navigating to find them. The homepage stopped being a pass-through and became the primary surface for managing their policies.
        </p>
      </TextSection>

      {/* Problem */}
      <TextSection title="The Problem">
        <p className="text-4xl">
          How might we create an experience where users can perform actions quickly and see the most important details about their policy and products upfront?
        </p>
      </TextSection>

      {/* Goals */}
      <TextSection title="Goals">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Enable fast, confident action:</li>
          <ul>
            <li>Design the homepage so customers can quickly understand their policy status and perform key actions without navigating deeper into the product.</li>
          </ul>
          <li className="font-bold">Surface what matters most:</li>
          <ul>
            <li>Prioritize critical policy information&mdash;coverage, status, payments, and next actions&mdash;so users can immediately assess their portfolio at a glance.</li>
          </ul>
          <li className="font-bold">Reduce cognitive load through clarity:</li>
          <ul>
            <li>Translate complex insurance data into clear, understandable summaries that support decision-making for both novice and experienced customers.</li>
          </ul>
          <li className="font-bold">Personalize the experience around the customer&rsquo;s portfolio:</li>
          <ul>
            <li>Tailor content and hierarchy based on the user&rsquo;s active products and policies, ensuring relevance rather than a one-size-fits-all dashboard.</li>
          </ul>
          <li className="font-bold">Increase meaningful engagement, not just visibility:</li>
          <ul>
            <li>Encourage deeper interaction with policy details by making the homepage a reliable starting point for understanding and managing insurance products.</li>
          </ul>
        </ul>
      </TextSection>

      {/* Why needed */}
      <TextSection title="Why was this needed?">
        <p>The homepage had become misaligned with both customer needs and the product&rsquo;s growing complexity. <mark className="font-bold">An outdated design system limited scannability and slowed decision-making, while the content model failed to surface information that supported real customer tasks or intent.</mark> As a result, the homepage no longer functioned as an effective control point for policy management, increasing friction and reducing user confidence.
        </p>
        <p>Addressing this was necessary to re-establish the homepage as a high-trust, high-utility surface&mdash;capable of supporting fast action, clarity at scale, and meaningful engagement as customer portfolios evolved.
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
                <strong>Decision:</strong>{" "}Treat the homepage as a decision-making control surface, not a navigational dashboard.<br/>
                <strong>Why:</strong>{" "}Research showed users logged in to complete financial and policy-critical tasks, not to browse or explore.<br/>
                <strong>Tradeoff:</strong>{" "}Reduced emphasis on secondary features and quick links.<br/>
                <strong>Mitigation:</strong>{" "}Support deeper exploration contextually, without pulling users away from core tasks.
              </p>
          </div>
        </div>

      </TextSection>



      {/* Challenges */}
      <TextSection title="Challenges I encountered">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Redesign vs incremental fixes:</li>
          <ul>
            <li>Aligning stakeholders on whether to invest in a full homepage redesign versus applying short-term design fixes to the existing dashboard required clear articulation of long-term value and risk trade-offs.</li>
          </ul>
          <li className="font-bold">Building and scaling new design assets:</li>
          <ul>
            <li>The redesign required creating new UI components and content patterns that could scale across different policy types and customer portfolios.</li>
          </ul>
          <li className="font-bold">Research recruitment constraints:</li>
          <ul>
            <li>Identifying participants who matched specific policy and product criteria proved challenging, slowing qualitative validation at critical points.</li>
          </ul>
          <li className="font-bold">Legacy data migration dependencies:</li>
          <ul>
            <li>Migrating legacy policy and product data introduced technical complexity for engineering and extended the delivery timeline, requiring re-planning and expectation management.</li>
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
                <strong>Decision:</strong>{" "}Invest in a full homepage redesign rather than incremental visual fixes.<br/>
                <strong>Why:</strong>{" "}The existing information model and hierarchy could not support growing policy complexity or fast decision-making.<br/>
                <strong>Tradeoff:</strong>{" "}Higher upfront cost and longer delivery timeline.<br/>
                <strong>Mitigation:</strong>{" "}Anchor the redesign in reusable patterns and scalable components to reduce long-term maintenance and rework.
              </p>
          </div>
        </div>
      </TextSection>


      {/* VOC */}
      <TextSection title="Voice of Customers">
        <p>To ground the redesign in real customer intent, we conducted a quantitative survey to understand the primary reasons users log in to the homepage. <strong>4.7k customers responded</strong>, giving us high confidence in the signal.
        </p>
        <p>The results clearly indicated that users primarily visit the homepage to manage financial and policy-critical tasks, not to browse or explore. This reinforced the need to prioritize billing, policy status, and dividend visibility upfront, while treating lower-frequency actions as secondary or contextual.</p>
        <p>These insights directly informed the information hierarchy and interaction model, ensuring the homepage optimized for speed to action and clarity, while still supporting deeper portfolio exploration when needed.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <OutcomeCard title="75%" subtitle="Billing and payments" />
        <OutcomeCard title="50%" subtitle="Policy information" />
        <OutcomeCard title="50%" subtitle="Dividends" />
        <OutcomeCard title="38%" subtitle="Beneficiaries" />
        <OutcomeCard title="25%" subtitle="Loans" />
        <OutcomeCard title="25%" subtitle="Others" />
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
                <strong>Insight:</strong>{" "}Insurance customers don&rsquo;t need more options&mdash;they need help understanding what matters right now. When complexity is translated into clear, contextual information, confidence and action follow.</p>
          </div>
        </div>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Existing design usability study</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              A usability evaluation of the existing dashboard revealed consistent gaps between customer expectations and the information provided.
            </p>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Information depth was insufficient:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Customers expressed dissatisfaction with the limited information available on the dashboard. High-level figures alone were not enough to support confidence or decision-making.
                </p>
              </li>

              <li>
                <strong>Policy value goes beyond face value:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Users consistently indicated that &ldquo;face value&rdquo; was not the only metric they cared about; context such as coverage details, benefits, and related financial information mattered.
                </p>
              </li>

              <li>
                <strong>Quick links increased friction:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  9 out of 10 customers found quick links unhelpful, as they introduced extra steps rather than enabling faster task completion.
                </p>
              </li>

              <li>
                <strong>Strong demand for policy understanding:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  8 out of 10 customers wanted to learn more about their policies directly from the homepage, rather than navigating to separate sections.
                </p>
              </li>

              <li>
                <strong>Payment context mattered:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  9 out of 10 customers found it intuitive to review what they were paying for alongside richer policy details. Isolated payment information felt incomplete without supporting context.
                </p>
              </li>
            </ul>
            <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  This proved it was important to move away from a navigation-heavy dashboard toward a content-rich, contextual overview, where policy information, payments, and next actions are presented together in a way that supports clarity, trust, and informed decision-making.
            </p>
          </li>
        </ul>

        {/* Image Old Design */}
        <section className="max-w-[720px] mx-auto mb-8">
              <div className="rounded-xl bg-muted overflow-hidden">
                <Image
                  src="/images/dashboard/dashboardold.png"
                  alt="Existing MassMutual dashboard before redesign"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </section>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Competitive Analysis</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Competitors rely heavily on overviews and quick links, creating navigational dashboards rather than decision-making experiences&mdash;revealing an opportunity to differentiate through clarity, context, and action-first design.
            </p>
          </li>
        </ul>


        {/* Competitive analysis image */}
        <section className="max-w-[720px] mx-auto mb-8">
              <div className="rounded-xl bg-muted overflow-hidden">
                <Image
                  src="/images/dashboard/competitive.png"
                  alt="Competitive analysis of insurance and finance homepages"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </section>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Northstar usability study</strong>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Evaluate design direction fit:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Assess how well each Northstar design option resonates with policyholders, focusing on clarity, trust, and perceived usefulness.
                </p>
              </li>
              <li>
                <strong>Compare effectiveness across options:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Identify which design direction better supports key user tasks, understanding, and confidence when managing policies.
                </p>
              </li>
              <li>
                <strong>Surface strengths and gaps early:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Understand what works well and what creates friction in each option, enabling informed trade-offs rather than subjective design preference.
                </p>
              </li>
              <li>
                <strong>Inform a confident directional decision:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Use qualitative evidence to converge on a single Northstar that could scale into the final homepage experience.
                </p>
              </li>
            </ul>
          </li>
        </ul>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-lg italic text-ring">Design A</strong>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Terminology confusion:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  The label &ldquo;People on Policy&rdquo; was unclear to participants, with several unsure whether it referred to beneficiaries or coverage-related roles.
                </p>
              </li>
              <li>
                <strong>Hidden actions:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Participants did not immediately notice the three-dot menu for additional actions, though those who discovered it appreciated the reduced visual clutter.
                </p>
              </li>
              <li>
                <strong>Top summary lacked clarity:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  The high-level summary caused confusion and did not clearly communicate what was most important at a glance.
                </p>
              </li>
              <li>
                <strong>Missing payment visibility:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Participants noted they could not easily determine when the next payment was due&mdash;an important gap given billing was a primary login reason.
                </p>
              </li>
              <li>
                <strong>Low-value visualization:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  The cash value projection graph was perceived as unnecessary; users felt confident about their insurance and did not find the projection actionable.
                </p>
              </li>
              <li>
                <strong>Ease of use score: 6.6 / 8</strong>
              </li>
            </ul>
          </li>
        </ul>

        {/* Design A image */}
        <section className="max-w-[720px] mx-auto mb-8">
              <div className="rounded-xl bg-muted overflow-hidden">
                <Image
                  src="/images/dashboard/designa.png"
                  alt="Northstar Design A explored during the redesign"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </section>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-lg italic text-ring">Design B</strong>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Stronger guided experience:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Participants consistently reported that Design B better guided them through their policies and explained key aspects more clearly.
                </p>
              </li>
              <li>
                <strong>Layout discoverability issues:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Some users missed the &ldquo;What would you like to do?&rdquo; section, indicating the need for stronger visual hierarchy or placement.
                </p>
              </li>
              <li>
                <strong>Information hierarchy opportunities:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Participants suggested that critical messages and status information would be more effective if surfaced at the top of the page.
                </p>
              </li>
              <li>
                <strong>Ease of use score: 7.85 / 8</strong>
              </li>
            </ul>
          </li>
        </ul>

        {/* Design B image */}
        <section className="max-w-[720px] mx-auto mb-8">
              <div className="rounded-xl bg-muted overflow-hidden">
                <Image
                  src="/images/dashboard/designb.png"
                  alt="Northstar Design B selected as the final direction"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </section>

        <p className="mt-1 text-base leading-relaxed text-muted-foreground">
            <mark className="font-bold">Design B scored higher on overall ease of use and better guided users through their policies,</mark> making it the stronger Northstar direction, while incorporating key learnings from Design A around payments, terminology, and visual simplicity.
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
                <strong>Decision:</strong>{" "}Select Design B as the Northstar while incorporating key learnings from Design A.<br/>
                <strong>Why:</strong>{" "}Design B better guided users through complex policy information and improved clarity and confidence.<br/>
                <strong>Tradeoff:</strong>{" "}Required stronger hierarchy tuning to improve discoverability of key actions.<br/>
                <strong>Mitigation:</strong>{" "}Refined layout, placement, and emphasis based on usability feedback before final implementation.
              </p>
          </div>
        </div>

      </TextSection>

      {/* Outcomes */}
      <TextSection title="Final Visual Design">
        <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  A clear, prioritized information hierarchy aligned to customer intent enabled customers to quickly identify policy status, payments, and next actions without navigating deeper.
                </p>
              </li>
              <li>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  Rich, contextual summaries combining coverage, payments, and benefits allowed customers to develop a better understanding of their policies directly from the homepage, increasing meaningful interaction with policy details and reducing reliance on secondary navigation.
                </p>
              </li>
              <li>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  An action-oriented layout&mdash;with relevant next steps surfaced at the right moment&mdash;let users take action directly from the homepage instead of treating it as a pass-through. The homepage shifted from a passive landing page to an active control surface for policy management.
                </p>
              </li>
        </ul>

        <section className="max-w-[720px] mx-auto mb-8">
              <div className="rounded-xl bg-muted overflow-hidden">
                <Image
                  src="/images/dashboard/dashboard.png"
                  alt="Final MassMutual homepage redesign"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </section>


        <OutcomeCard title="15.02s &rarr; 34.66s" subtitle="Engagement time" />
      </TextSection>

      {/* Next actions */}
      <TextSection title="Next actions I would have taken">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Extend the design system across all policy and product pages:</li>
          <ul>
            <li>Apply the new information hierarchy and interaction patterns consistently to ensure a cohesive end-to-end experience.</li>
          </ul>
          <li className="font-bold">Expand the approach to additional transactions:</li>
          <ul>
            <li>Scope and adapt the design principles to support other customer transactions, enabling consistent clarity and efficiency beyond the homepage.</li>
          </ul>
        </ul>
      </TextSection>

      {/* Conclusion */}
      <TextSection title="Conclusion">
        <p>This redesign repositioned the homepage as a trusted control surface rather than a navigational landing page. By grounding decisions in user intent, usability research, and competitive analysis, the final experience surfaces critical policy information and actions upfront, reducing friction and increasing confidence for customers managing complex insurance portfolios.</p>
        <p>The resulting increase in engagement demonstrated that clarity and relevance drive meaningful interaction. More importantly, the work established a scalable foundation&mdash;design patterns, content hierarchy, and decision principles&mdash;that can be extended across policy, product, and transactional experiences to support long-term consistency and growth.</p>

        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">Effective dashboards are decision-making systems, not navigation surfaces. When information hierarchy reflects real user intent and complexity is translated, teams can scale confidence and action without overwhelming customers.</p>
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
