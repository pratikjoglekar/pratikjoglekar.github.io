import Link from "next/link"
import Image from "next/image";
import StickyHome from "@/components/StickyHome"

export default function c4cintegrations() {
  return (
    
    <>
      <StickyHome />
    <main className="min-h-screen px-4 sm:px-5 py-8 pt-24">

      {/* Header */}
      <header className="max-w-[720px] mx-auto mb-12">
        <h1 className="mt-4 text-4xl italic font-medium text-muted-foreground">
          Coursera for Campus (Integrations)
        </h1>

        <p className="mt-1 text-base text-muted-foreground">
          Coursera
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
              <p className="text-base sm:text-base leading-relaxed text-foreground"><strong>TL;DR:</strong>{" "}<br/>Since Jun 2026, I designed a native LTI integration that enabled self-serve LMS onboarding, real-time grade sync, and seamless access to Coursera content, reducing institutional setup effort while improving scalability and reliability for campuses managing large learner populations.</p>
          </div>
        </div>
      </TextSection>



      {/* Hero image */}
      <section className="max-w-[720px] mx-auto mb-8">
          <div className="rounded-xl bg-muted overflow-hidden">
            <Image
                  src="/images/integrations/northstardesign.png"
                  alt="Usage Intelligence Platform dashboard overview"
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
            "8 Developers",
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
          value={["8 months and ongoing"]}
        />
      </section>

      {/* Project overview */}
      <TextSection title="Project Overview">
        <p>Coursera for Campus relied on a third-party LTI tool to integrate with institutional learning management systems. While functional, the external dependency introduced significant overhead, fragmented the user experience, and limited Coursera's ability to evolve the integration alongside core product capabilities.</p>
        <p>This project focused on replacing the third-party LTI with a native Coursera-built LTI experience. By bringing the integration in-house, the goal was to deliver a more seamless, reliable, and scalable experience for learners, instructors, and administrators—while reducing operational complexity and increasing ownership over the end-to-end integration workflow.</p>
        <p>The initiative positioned integrations as a first-class platform capability rather than an external add-on, enabling faster iteration, deeper system alignment, and a markedly improved experience across the Coursera for Campus ecosystem.</p>
      </TextSection>

      {/* Impact */}
      <TextSection title="Impact">
        <p>The native LTI experience improved <mark className="font-bold">successful LMS connection rates from 10% to 23%, reflecting reduced setup friction and increased reliability.</mark> As the experience continues to mature, connection success is trending upward which demonstrates the value of first-party ownership and iterative platform improvement.</p>

        <p>Designed a user flow and information architecture, <mark className="font-bold">and reduced support ticket volume from 57% to 7%,</mark> significantly lowering operational overhead and improving user self-sufficiency.</p>
      </TextSection>

      {/* Problem */}
      <TextSection title="The Problem">
        <p className="text-4xl">How might we design a native LTI integration that enables self-serve LMS connections, real-time grade sync, and seamless access to Coursera content, while reducing operational overhead and increasing platform scalability?</p>
      </TextSection>

      {/* Goals */}
      <TextSection title="Goals">
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Establish a First-Party LTI Platform:</li>
          <ul>
            <li>Replace third-party middleware with a native Coursera-built LTI experience that the team fully owns, maintains, and evolves.</li>
          </ul>
          <li className="font-bold">Enable Self-Serve LMS Integrations:</li>
          <ul>
            <li>Allow institutions to directly configure and manage LMS integrations without support dependency, reducing setup time and operational overhead.</li>
          </ul>
          <li className="font-bold">Deliver a Seamless End-to-End Experience:</li>
          <ul>
            <li>Provide a consistent, reliable experience for learners, instructors, and administrators across course access, enrollment, and grade sync workflows.</li>
          </ul>
          <li className="font-bold">Support Real-Time Data Synchronisation:</li>
          <ul>
            <li>Ensure accurate, near real-time syncing of course content and grades between Coursera and LMS platforms to build trust and reduce manual intervention.</li>
          </ul>
          <li className="font-bold">Improve Platform Reliability and Scalability:</li>
          <ul>
            <li>Design the system to handle growing institutional usage, additional LMS platforms, and future integration needs without linear increases in complexity or cost.</li>
          </ul>
          <li className="font-bold">Reduce Support and Maintenance Burden:</li>
          <ul>
            <li>Minimise reliance on support teams by making integrations observable, debuggable, and resilient through better system design and ownership.</li>
          </ul>
        </ul>
      </TextSection>

      {/* Why needed */}
      <TextSection title="Why was this needed?">
        <p>LTI is a widely adopted industry standard that enables secure, seamless connections between learning management systems (LMS) such as Canvas and Blackboard and external learning platforms. It allows learners to launch courses directly from their LMS without additional logins, enables instructors to embed specific course content, and supports automatic grade synchronisation back to the LMS.</p>
        <p>While Coursera supported LTI through a third-party provider, this architecture introduced meaningful limitations. <mark className="font-bold">The middleware added latency, reduced visibility into failures, and increased dependency on support teams for setup, troubleshooting, and maintenance.</mark> As a result, onboarding institutions was slower, escalations were harder to diagnose, and the overall experience felt fragmented for learners, instructors, and administrators.</p>
        <p>Moving to a native LTI experience removed this intermediary layer and gave Coursera full ownership of the integration. This enabled faster institution setup, fewer support escalations, improved reliability, and greater flexibility to evolve the experience alongside core platform capabilities—addressing long-standing pain points while positioning integrations as a first-class, scalable platform capability.</p>


        <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">
                <strong>Decision:</strong>{" "}Build a native LTI integration rather than continue relying on institution-specific custom setups.<br/>
                <strong>Why:</strong>{" "}Custom integrations created operational overhead, slowed onboarding, and limited Coursera's ability to scale across campuses.<br/>
                <strong>Tradeoff:</strong>{" "}Reduced flexibility for edge-case LMS configurations.<br/>
                <strong>Mitigation:</strong>{" "}Support LTI standards broadly while allowing limited configuration options for institutional needs.
              </p>
          </div>
        </div>
      </TextSection>


      {/* Challenges */}
      <TextSection title="Challenges I encountered">

        <ul className="list-disc pl-5 space-y-2">
          <li className="font-bold">Limited LMS APIs and Data Access:</li>
          <ul>
            <li>Most LMS platforms did not expose APIs for the data we needed, making it difficult to collect, validate, and observe integration health. This required designing around data scarcity while still supporting reliable experiences.</li>
          </ul>
          <li className="font-bold">Metadata Availability and Representation:</li>
          <ul>
            <li>Building a native LTI experience introduced challenges in fetching, structuring, and presenting metadata consistently across LMS environments, directly impacting how course and grade information could be represented and understood.</li>
          </ul>
          <li className="font-bold">GTM-Driven Timelines for MVP:</li>
          <ul>
            <li>The initial mandate prioritized a GTM-ready MVP, leaving limited time for traditional discovery or longitudinal research. This required making informed design decisions under uncertainty.</li>
          </ul>
          <li className="font-bold">Lean Validation Under Constraints:</li>
          <ul>
            <li>In place of standard research approaches, we adopted a lean strategy, leveraging expert reviews, internal dogfooding, rapid iteration, and close cross-functional feedback loops.</li>
          </ul>
          <li className="font-bold">Gaps in Enterprise-Ready Components:</li>
          <ul>
            <li>Existing component libraries were not fully suited for enterprise integration workflows, requiring the creation or extension of components while maintaining consistency and accessibility.</li>
          </ul>
          <li className="font-bold">Designing Within iFrame and LMS-Specific Constraints:</li>
          <ul>
            <li>The LTI experience had to run inside an iframe while adapting to varying constraints across LMS platforms. Some environments supported responsive scaling, while others restricted the experience to fixed-size popover modals.</li>
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
                <strong>Decision:</strong>{" "}Support real-time grade and enrollment synchronization rather than periodic batch updates.<br/>
                <strong>Why:</strong>{" "}Delayed updates undermined trust for instructors and administrators relying on LMS records.<br/>
                <strong>Tradeoff:</strong>{" "}Higher technical complexity and dependency on LMS reliability.<br/>
                <strong>Mitigation:</strong>{" "}Clear error states, retries, and transparency into sync status.
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
                <strong>Insight:</strong>{" "}Institutions don't want to manage integrations — they want them to disappear. When LMS connections are reliable, transparent, and self-serve, adoption increases and operational burden drops dramatically.</p>
          </div>
        </div>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Understanding SchoolDay (GG4L) limitations based on customer connects</strong>

            <p className="mt-2 text-base leading-relaxed text-muted-foreground">Coursera for Campus relied on SchoolDay (GG4L) as the middleware layer for LMS integrations.</p>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Delayed and inflexible data sync:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Grade passback and activity sync are not real-time, with limited configuration options (e.g., final grade or assignment-level sync, not both). This reduced trust in data accuracy and impacted for-credit workflows.</p>
              </li>

              <li>
                <strong>Limited visibility and observability:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Failures or delays in syncing were difficult to diagnose. Coursera had little visibility into where issues occurred, increasing support dependency and resolution time.</p>
              </li>

              <li>
                <strong>Misalignment with academic workflows:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Faculty could not easily map Coursera content to LMS curricula, sync non-graded items, or manage courses the way they teach, forcing manual workarounds.</p>
              </li>

              <li>
                <strong>Search and content discovery constraints:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">8 out of 10 customers wanted to learn more about their policies directly from the homepage, rather than navigating to separate sections.</p>
              </li>

              <li>
                <strong>Program and access control workarounds:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Reliance on middleware constrained Coursera’s ability to iterate on integrations, introduce new capabilities, or adapt quickly to LMS-specific requirements.</p>
              </li>

              <li>
                <strong>Limited flexibility for future evolution:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Middleware constraints forced institutions to create multiple programs to restrict learner access, complicating setup, reporting, and long-term maintenance.</p>
              </li>
            </ul>
          </li>
          <p>The middleware layer solved basic connectivity but failed at scale. Its limitations increased operational overhead, degraded user experience, and restricted Coursera's ability to treat LMS integrations as a strategic platform capability, ultimately motivating the shift to a native LTI owned and evolved by Coursera.</p>
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
                <strong>Decision:</strong>{" "}Design an opinionated integration flow aligned with LTI standards rather than exposing all configuration options upfront.<br/>
                <strong>Why:</strong>{" "}Most institutions shared similar needs, and too much flexibility increased error rates and support load.<br/>
                <strong>Tradeoff:</strong>{" "}Power users had fewer customization options.<br/>
                <strong>Mitigation:</strong>{" "}Expose advanced settings progressively and document supported extensions.
              </p>
          </div>
        </div>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">AI prototyping</strong>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">To move quickly under tight constraints, I used AI-assisted prototyping to create an early, end-to-end concept that addressed key middleware limitations, allowing teams to rapidly align on the intended native LTI experience, validate assumptions, and converge on direction before deeper build investment.</p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">AI-assisted prototyping enabled rapid exploration and alignment under high uncertainty, allowing me to test system behaviors and integration constraints without heavy upfront investment. This reduced risk, accelerated decision-making, and ensured we converged on the right direction before committing engineering effort, maximizing leverage at a critical early stage.</p>
          </li>
        </ul>

      {/* Hero image */}
      <section className="max-w-[720px] mx-auto mb-8">
          <div className="rounded-xl bg-muted overflow-hidden">
            <Image
                  src="/images/integrations/AIPage.png"
                  alt="Usage Intelligence Platform dashboard overview"
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
            <strong className="text-xl">Focused Group</strong>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">I convened a focused group with Customer Success Managers (CSMs), Implementation Managers (IMs), and Solutions Architects (SAs) to capture frontline insights from institutions actively using LMS integrations. These roles provided critical visibility into onboarding friction, escalation patterns, and real-world configuration challenges that were not always surfaced through product analytics alone.</p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">This collaboration helped ground design decisions in operational realities—ensuring the native LTI experience addressed not just user interface gaps, but also implementation complexity, support overhead, and enterprise constraints.</p>
          </li>
        </ul>

         <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">MVP Usability</strong>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Evaluate design direction fit:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Assess how well each Northstar design option resonates with policyholders, focusing on clarity, trust, and perceived usefulness.</p>
              </li>

              <li>
                <strong>Compare effectiveness across options:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Identify which design direction better supports key user tasks, understanding, and confidence when managing policies.</p>
              </li>

              <li>
                <strong>Surface strengths and gaps early</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Understand what works well and what creates friction in each option, enabling informed trade-offs rather than subjective design preference.</p>
              </li>

              <li>
                <strong>Inform a confident directional decision</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Use qualitative evidence to converge on a single Northstar that could scale into the final homepage experience.</p>
              </li>
            </ul>
          </li>
        </ul>

      {/* Hero image */}
      <section className="max-w-[720px] mx-auto mb-8">
          <div className="rounded-xl bg-muted overflow-hidden">
            <Image
                  src="/images/integrations/CoursePage.png"
                  alt="Usage Intelligence Platform dashboard overview"
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
            <strong className="text-xl">Deep dive customer interviews</strong>

            {/* Nested list */}
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                <strong>Personalization:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">As instructors explore the content, provide suggestions for quick actions. Each instructor is also specialized in their area of tutoring, identify that and provide content relevant to them.</p>
              </li>

              <li>
                <strong>AI integrations:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Integrate AI effectively in a way which does not disrupt their experience of selection, but supports it.</p>
              </li>

              <li>
                <strong>Search and Browse:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">Content discovery is the most important JTBD in the entire experience. It should be quick, affordable and easy.</p>
              </li>

              <li>
                <strong>Inform a confident directional decision:</strong>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">The information we provide should make them confident about their selection of content. Bring relevant meta-data which will support that decision.</p>
              </li>
            </ul>
          </li>
        </ul>


        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">Workshop</strong>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">I facilitated a cross-functional workshop to synthesize current user feedback and uncover additional opportunities. Using shared pillars and evaluation lenses, the team assessed ideas against user impact, technical feasibility, and platform leverage, allowing us to prioritize the most valuable opportunities with clarity and alignment.</p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">This created a focused roadmap of initiatives grounded in real user needs and constrained by system realities, enabling confident decision-making as the work continues.</p>
          </li>
        </ul>

        <ul className="list-disc space-y-4 pl-5">
          {/* Parent item */}
          <li>
            <strong className="text-xl">AI Generated Insights</strong>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">Before moving into final designs, I used AI to synthesise large volumes of research, stakeholder inputs, and support data into a structured set of insights. This helped quickly identify recurring patterns, surface edge cases, and validate priorities across teams.</p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">Rather than replacing analysis, this approach accelerated it, allowing me to focus on decision-making, refine problem framing, and move faster toward a coherent design direction.</p>
          </li>
        </ul>  

      </TextSection>




      {/* Conclusion */}
      <TextSection title="Final Visual Design">
        
        {/* Hero image */}
      <section className="max-w-[720px] mx-auto mb-8">
          <div className="rounded-xl bg-muted overflow-hidden">
            <Image
                  src="/images/integrations/northstardesign.png"
                  alt="Usage Intelligence Platform dashboard overview"
                  width={1440}
                  height={1020}
                  className="w-full h-auto"
                  priority
                />
          </div>
          <div>
            <p>The final design brings together all insights into a cohesive experience that helps instructors identify gaps within their LMS curriculum and receive relevant recommendations—augmented by industry trends and best-fit content. By reducing context switching and aligning recommendations with curriculum needs, the experience enables a seamless “launch and learn” flow while supporting deeper discovery within Coursera.</p>
          </div>
        </section>

      </TextSection>

      {/* Conclusion */}
      <TextSection title="Conclusion">
        <p>This work established a foundation for treating LMS integrations as a first-class, first-party platform capability at Coursera. By replacing middleware with a native LTI experience, we reduced setup friction, improved reliability, and increased successful connection rates, while giving the team greater ownership over how integrations evolve.</p>
        <p>The initiative is intentionally ongoing. As we continue to refine the experience, improve observability, and expand LMS support, the focus remains on scaling integrations sustainably while delivering clearer, more reliable experiences for learners, instructors, and administrators.</p>


      <div className="my-10 sm:my-14">
          <div className="relative overflow-hidden rounded-2xl bgColor px-6 py-5 sm:px-8 sm:py-6">
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2 bg-popover"
              />

              {/* Content */}
              <p className="text-base sm:text-base leading-relaxed text-foreground">This work established a foundation for treating LMS integrations as a first-class, first-party platform capability at Coursera. By replacing middleware with a native LTI experience, we reduced setup friction, improved reliability, and increased successful connection rates.</p>
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
