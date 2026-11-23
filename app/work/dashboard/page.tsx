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
  BeforeAfter,
} from "@/components/case-study/CaseStudy"
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure"

export const metadata = caseStudyMetadata("dashboard")

export default function Dashboard() {
  return (
    <CaseStudyLayout slug="dashboard">
      <CaseHeader
        slug="dashboard"
        tldr={<>MassMutual&rsquo;s policyholder homepage was a pass-through: customers skimmed a grid of policy tiles and left to get anything done. In 6 months, as senior product designer, I redesigned it around why people actually log in, so payments, policy status and next actions sit on the homepage itself. Median time engaged rose from 15.02s to 34.66s, because customers now finish tasks there instead of hunting for them, and adoption rose 9%.</>}
      />

      <CaseBody>
      <Chapter
        number={1}
        title="Context"
        summary={<>MassMutual&rsquo;s policyholder homepage was a pass-through: customers skimmed it and left to get anything done.</>}
      >
        <TextSection title="A homepage nobody stayed on">
          <p>The homepage was the front door for life insurance and retirement policyholders. As portfolios grew more complex, with more products, coverage types and beneficiaries, it stopped helping.</p>
          <p>Each policy appeared as a tile showing its face amount and little else, and customers told us face value was not the number they cared about most. Below the tiles, a list of quick links sent people elsewhere to act. Billing was one of the main reasons to log in, yet payment details sat apart from the policies being paid for. And the dated design system made the whole page slow to scan.</p>
          <Figure caption="Before: policy tiles showing only face amounts, then a list of quick links.">
            <Image
              src="/images/dashboard/before-figma.png"
              alt="Existing MassMutual dashboard before the redesign"
              width={1218}
              height={1360}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Treat the homepage as the place where customers act on their policies.</> },
              { label: "Why", body: <>Research showed customers log in to get a financial or policy task done.</> },
              { label: "Tradeoff", body: <>Less room for secondary features and quick links.</> },
              { label: "Mitigation", body: <>Offer deeper exploration in context, without pulling people away from their task.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={2}
        title="Problem"
        summary={<>Let customers see what matters about their policies, and act on it, from the homepage. A 4.7k-customer survey showed what matters.</>}
      >
        <TextSection title="Problem statement">
          <p className="case-pullquote">How might we let policyholders see what matters about their policies and act on it right away, without sending them somewhere else first?</p>
        </TextSection>

        <TextSection title="Why customers log in">
          <p>We surveyed customers on why they log in, and 4.7k responded. The answer was clear: they come to manage money and policies.</p>
          <DataTable
            caption="Reasons customers log in, by share of survey respondents"
            columns={["Reason to log in", "Share of respondents"]}
            rows={[
              ["Billing and payments", "75%"],
              ["Policy information", "50%"],
              ["Dividends", "50%"],
              ["Beneficiaries", "38%"],
              ["Loans", "25%"],
              ["Other", "25%"],
            ]}
          />
        </TextSection>

        <TextSection title="What customers told us">
          <p>A usability study of the existing homepage showed where it fell short. Each finding shaped a specific part of the design.</p>
          <DataTable
            caption="Usability findings on the old homepage and the part of the design each one shaped"
            columns={["What customers told us", "What it shaped"]}
            rows={[
              ["9 of 10 found quick links unhelpful, because they added steps", "Tasks you can start from the homepage itself"],
              ["8 of 10 wanted to learn about their policies on the homepage", "Policy summaries with coverage and benefits, not only face value"],
              ["9 of 10 wanted to see what they were paying for alongside the payment", "Payments shown together with the policy they belong to"],
              ["High-level figures alone did not build confidence", "Richer context for each policy, in plain language"],
            ]}
          />
          <p>A competitive review found the same gap across the industry: homepages built on overviews and quick links. That left room to stand out through clarity and action.</p>
        </TextSection>
      </Chapter>

      <Chapter
        number={3}
        title="Approach"
        summary={<>I rebuilt the homepage&rsquo;s structure, tested two directions with customers and chose the one that guided them best, keeping what worked in the other.</>}
      >
        <TextSection title="How I led the work">
          <p>As the senior product designer, working with a product owner, seven developers, a business analyst and a data analyst:</p>
          <ul className="space-y-2">
            <li><strong>Reframed the homepage</strong> from a navigational dashboard to a place to make decisions, using the survey to show why.</li>
            <li><strong>Let evidence choose the direction.</strong> I tested two north-star directions with policyholders on the same tasks, and let task success pick the direction.</li>
          </ul>
          <p><strong className="case-h3">The call I pushed for</strong></p>
          <p>A delivery timeline was pressing, and stakeholders preferred incremental fixes. The research said the information model itself was the problem, so I argued for a full redesign, framed as a place to make decisions rather than a navigation page. It meant a longer timeline, more coordination and less room for secondary features. I secured the redesign mandate.</p>
          <Callout label="Insight">Insurance customers do not need more options. They need help understanding what matters right now. When complexity becomes clear, contextual information, confidence and action follow.</Callout>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>A full homepage redesign instead of incremental visual fixes.</> },
              { label: "Why", body: <>The existing information model could not support growing policy complexity or fast decisions.</> },
              { label: "Tradeoff", body: <>Higher upfront cost and a longer delivery timeline.</> },
              { label: "Mitigation", body: <>Build on reusable patterns and components, to reduce maintenance and rework later.</> },
            ]}
          />
        </TextSection>

        <TextSection title="Two directions, tested">
          <p>I took two north-star directions to policyholders to see which one better supported their key tasks, their understanding and their confidence.</p>
          <DataTable
            caption="Usability results for the two north-star directions"
            columns={["Measure", "Design A", "Design B"]}
            rows={[
              ["Ease of use", "6.6 / 8", "7.85 / 8"],
              ["What worked", "Less visual clutter, once people found the extra actions", "Guided people through their policies and explained them more clearly"],
              ["What did not", "Unclear labels (“People on Policy”), a confusing summary, no clear next payment date, a projection graph nobody needed", "Some missed the “What would you like to do?” section; important status belonged at the top"],
            ]}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Figure caption="Design A.">
              <Image
                src="/images/dashboard/design-a-final.png"
                alt="North-star Design A"
                width={1510}
                height={1763}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 360px, 100vw"
              />
            </Figure>
            <Figure caption="Design B, chosen as the direction.">
              <Image
                src="/images/dashboard/design-b-final.png"
                alt="North-star Design B"
                width={1510}
                height={1763}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 360px, 100vw"
              />
            </Figure>
          </div>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Choose Design B, and carry over what Design A taught us about payments, labels and visual simplicity.</> },
              { label: "Why", body: <>Design B guided people through complex policy information more clearly, and scored higher on ease of use.</> },
              { label: "Tradeoff", body: <>Its key actions were easy to miss, so the hierarchy needed work.</> },
              { label: "Mitigation", body: <>Move &ldquo;What would you like to do?&rdquo; and important status to the top before final implementation.</> },
            ]}
          />
        </TextSection>

        <TextSection title="What I left out">
          <p>Incremental visual fixes were off the table early: they could not fix the information model underneath. Quick links could not stay the main way to act, since 9 of 10 customers found them unhelpful. Design A lost on ease of use, unclear labels and a missing next payment date. And the cash value projection graph went, because customers did not find it actionable.</p>
        </TextSection>

        <TextSection title="The final homepage">
          <p>The final design opens with a greeting and &ldquo;What would you like to do?&rdquo;, with the most common tasks one click away. A dated &ldquo;Things to do&rdquo; list follows, so anything that needs attention, like a statement or a bill, is impossible to miss. Policies follow, grouped by type.</p>
          <AnnotatedFigure
            src="/images/dashboard/after-dashboard-v2.png"
            alt="Final MassMutual homepage redesign"
            width={2421}
            height={1306}
            caption="After: tasks first, then what needs attention, then policies with context."
            pins={[
              { x: 20.4, y: 52.9, title: "Tasks first.", body: "The most common reasons to log in, one click from the homepage." },
              { x: 3, y: 63.9, title: "What needs attention.", body: "Statements and bills, dated, so nothing is missed." },
              { x: 42.4, y: 95.4, title: "Policies below.", body: "Grouped by type, each explained in plain words." },
            ]}
          />
          <AnnotatedFigure
            src="/images/dashboard/policy-detail.png"
            alt="Whole Life policy page showing face value, cash value and death benefit with plain-language explanations, quick actions, and a Billing and Payments section with the next premium due"
            width={1468}
            height={1198}
            caption="One policy in detail: face value, cash value and death benefit side by side, each in plain words, then billing with the next payment due."
            pins={[
              { x: 12.2, y: 28, title: "Tasks on the policy itself.", body: "Pay, borrow or change beneficiaries without leaving the page." },
              { x: 2, y: 38.2, title: "Three numbers, three meanings.", body: "Face value, cash value and death benefit side by side, each with a sentence in plain words." },
              { x: 26, y: 67.5, title: "The next payment, in context.", body: "The amount and date sit with the policy being paid for." },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>Median time engaged rose from 15s to 35s, because customers now finish tasks on the homepage. Adoption rose 9%.</>}
      >
        <Results slug="dashboard" />

        <TextSection title="Reading the numbers">
          <p>Time engaged rose from 15.02s to 34.66s. That is a good sign only because of why it rose: customers stayed to finish tasks on the homepage. Time engaged cannot say which part of the page they used, so the link to tasks and status at the top is my best explanation, not a measurement.</p>
          <BeforeAfter
            before={{ src: "/images/dashboard/before-figma.png", alt: "Existing MassMutual dashboard before the redesign", width: 1218, height: 1360 }}
            after={{ src: "/images/dashboard/after-dashboard-v2.png", alt: "Final MassMutual homepage redesign", width: 2421, height: 1306 }}
            caption="The homepage before and after: tiles showing only face amounts, then tasks first with what needs attention."
          />
          <p>Adoption rose 9% after launch, alongside other changes, so I do not credit it to one decision. The clearest evidence is from testing: Design B scored 7.85 out of 8 for ease of use against 6.6 for Design A, and customers understood their policies better with coverage and benefits beside the face value.</p>
        </TextSection>
      </Chapter>

      <Chapter
        number={5}
        title="Reflection"
        summary={<>The homepage works because its order follows why people log in. Next: carry the pattern to policy pages and other transactions.</>}
      >
        <TextSection title="Getting the redesign through">
          <p>The first hurdle was agreement. A full redesign competes with cheaper short-term fixes, and winning that took a clear case for long-term value and risk. After that, the work needed new components and content patterns that held up across very different policy types and portfolios.</p>
          <p>Two things slowed us down: recruiting participants who held specific policies, and migrating legacy policy data, which added engineering work and forced us to reset the plan along the way.</p>
        </TextSection>

        <TextSection title="What came next">
          <ul className="space-y-2">
            <li><strong>A mobile design system, built from scratch</strong> across life insurance, annuity and retirement experiences. Its reusable patterns went on to support the design of the term policy experience.</li>
            <li><strong>Carry the system across policy and product pages,</strong> so the whole experience shares the same hierarchy and patterns.</li>
            <li><strong>Apply it to other transactions,</strong> so the same clarity reaches tasks beyond the homepage.</li>
          </ul>
          <Callout label="Lesson">Start from why people log in. Once the page&rsquo;s order followed that, and policy terms were put in plain words, customers acted on the homepage itself.</Callout>
        </TextSection>
      </Chapter>

    </CaseBody>
    </CaseStudyLayout>
  )
}
