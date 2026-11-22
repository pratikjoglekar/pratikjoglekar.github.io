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
          <p>The homepage was the front door for life insurance and retirement policyholders. As portfolios grew more complex, with more products, coverage types and beneficiaries, it stopped helping. The same problems kept coming back:</p>
          <ul className="space-y-2">
            <li><strong>Tiles showed the wrong number.</strong> Each policy appeared as a tile with its face amount, and little else. Customers said face value was not the figure they cared about most.</li>
            <li><strong>Quick links added steps.</strong> A list of links sent people elsewhere instead of letting them act.</li>
            <li><strong>Payments lacked context.</strong> Billing was a main reason to log in, but payment information sat apart from what was being paid for.</li>
            <li><strong>An outdated design system.</strong> The layout was hard to scan, which slowed every decision.</li>
          </ul>
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
              { label: "Decision", body: <>Treat the homepage as a place to make decisions, not a navigation page.</> },
              { label: "Why", body: <>Research showed customers log in to complete financial and policy tasks, not to browse.</> },
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
          <p>We surveyed customers on why they log in, and 4.7k responded. The answer was clear: they come to manage money and policies, not to browse.</p>
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
        summary={<>A full redesign, not a reskin. I tested two directions with customers and chose the one that guided them best, keeping what worked in the other.</>}
      >
        <TextSection title="How I led the work">
          <p>As the senior product designer, working with a product owner, seven developers, a business analyst and a data analyst:</p>
          <ul className="space-y-2">
            <li><strong>Reframed the homepage</strong> from a navigational dashboard to a place to make decisions, using the survey to show why.</li>
            <li><strong>Let evidence choose the direction.</strong> I tested two north-star directions with policyholders on the same tasks, so the choice rested on what worked for them, not on preference.</li>
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

        <TextSection title="Options I ruled out">
          <DataTable
            caption="Options considered and why each was ruled out"
            columns={["Option", "Why I ruled it out"]}
            rows={[
              ["Incremental visual fixes", "They could not fix the information model underneath"],
              ["Quick links as the main way to act", "9 of 10 customers found them unhelpful"],
              ["Design A as the direction", "Lower ease of use, unclear labels and no clear next payment date"],
              ["A cash value projection graph", "Customers did not find it actionable"],
            ]}
          />
        </TextSection>

        <TextSection title="The final homepage">
          <p>The final design opens with a greeting and &ldquo;What would you like to do?&rdquo;, with the most common tasks one click away. A dated &ldquo;Things to do&rdquo; list follows, so anything that needs attention, like a statement or a bill, is impossible to miss. Policies follow, grouped by type.</p>
          <Figure caption="After: tasks first, then what needs attention, then policies with context.">
            <Image
              src="/images/dashboard/after-dashboard.png"
              alt="Final MassMutual homepage redesign"
              width={2421}
              height={1592}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="One policy in detail: face value, cash value and death benefit side by side, each in plain words, then billing with the next payment due.">
            <Image
              src="/images/dashboard/policy-detail.png"
              alt="Whole Life policy page showing face value, cash value and death benefit with plain-language explanations, quick actions, and a Billing and Payments section with the next premium due"
              width={1468}
              height={1198}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>Median time engaged rose from 15s to 35s, because customers now finish tasks on the homepage instead of hunting for them. Adoption rose 9%.</>}
      >
        <Results slug="dashboard" />

        <TextSection title="What my decisions plausibly moved">
          <p>Time engaged rose from 15.02s to 34.66s. That is a good sign only because of why it rose: customers stayed to finish tasks on the homepage instead of navigating away to find them. I claim only the links I can defend, and I mark the rest as hypotheses.</p>
          <DataTable
            caption="Design decisions, the result each most plausibly affected, and the evidence"
            columns={["Decision", "Result it most plausibly affected", "Evidence"]}
            rows={[
              ["Tasks and status at the top of the homepage", "Time engaged, 15.02s to 34.66s", "Hypothesis; time engaged does not show which part people used"],
              ["A homepage built around first-time and returning customers", "Adoption, up 9%", "Measured after launch; not isolated from other changes"],
              ["Choosing Design B", "Ease of use", "7.85 / 8 against 6.6 / 8 in usability testing"],
              ["Policy context instead of face value alone", "Understanding of policies", "Usability findings; no metric after launch on this page"],
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={5}
        title="Reflection"
        summary={<>Good dashboards help people decide, not navigate. Next: carry the pattern to policy pages and other transactions.</>}
      >
        <TextSection title="Where it got hard">
          <ul className="space-y-2">
            <li><strong>Redesign or quick fixes.</strong> Getting agreement on a full redesign, over short-term fixes, took a clear case for long-term value and risk.</li>
            <li><strong>New patterns at scale.</strong> The redesign needed new components and content patterns that worked across very different policy types and portfolios.</li>
            <li><strong>Recruiting the right people.</strong> Finding participants with specific policies and products slowed research at key moments.</li>
            <li><strong>Legacy data.</strong> Migrating legacy policy and product data added engineering complexity and stretched the timeline, so plans had to be reset along the way.</li>
          </ul>
        </TextSection>

        <TextSection title="What came next">
          <ul className="space-y-2">
            <li><strong>A mobile design system, built from scratch</strong> across life insurance, annuity and retirement experiences. Its reusable patterns went on to support the design of the term policy experience.</li>
            <li><strong>Carry the system across policy and product pages,</strong> so the whole experience shares the same hierarchy and patterns.</li>
            <li><strong>Apply it to other transactions,</strong> so the same clarity reaches tasks beyond the homepage.</li>
          </ul>
          <Callout label="Lesson">Good dashboards help people decide, not navigate. When the hierarchy follows why people actually come, and complexity is translated into plain context, confidence and action follow.</Callout>
        </TextSection>
      </Chapter>

    </CaseBody>
    </CaseStudyLayout>
  )
}
