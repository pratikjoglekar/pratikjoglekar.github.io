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
  Figure,
  DataTable,
} from "@/components/case-study/CaseStudy"

export const metadata = caseStudyMetadata("pricing-calculator")

const results = [
  { metric: "Exposure to Account page", control: "12.3%", test: "11.3%", change: "−8%", read: "Statistically significant drop" },
  { metric: "Exposure to Billing page", control: "1.4%", test: "1.4%", change: "+4%", read: "Neutral, directional only" },
  { metric: "Exposure to Teams conversion", control: "0.80%", test: "0.92%", change: "+15%", read: "Neutral, directional only" },
]

export default function PricingCalculator() {
  return (
    <CaseStudyLayout slug="pricing-calculator">
      <CaseHeader
        slug="pricing-calculator"
        tldr={<>Small teams were leaving the Coursera for Teams purchase path because they learned the real constraints too late. As the only designer on the project, I designed a pricing calculator that puts the price, the 5-seat minimum and the license rules on the landing page, and sends larger teams to sales without a dead end. In a 5-week A/B test, 24% of exposed visitors engaged with it, and buyers got full price transparency at zero cost to conversion. It won 100% of C4T traffic.</>}
      />

      <CaseBody>
      <Chapter
        number={1}
        title="Context"
        summary={<>Teams buyers could not see the price, the 5-seat minimum or the license rules until late in checkout, so small teams dropped out.</>}
      >
        <TextSection title="Project Overview">
          <p>
            Teams buyers could not see what a contract would cost until late in checkout, and the 5-seat minimum and license rules surfaced even later. I designed a module for the Teams landing page: pick 5–125 seats, compare quarterly and annual billing, read the key policies beside the price, and email the estimate to yourself. Above 125 seats it hands off to sales with the buyer&rsquo;s inputs preserved.
          </p>
          <p>
            I owned the design end to end, from the concept brief to the A/B readout: UX and UI, pricing and conversion design, the estimate emails and the experiment design, working with engineering, marketing, and data and analytics.
          </p>
        </TextSection>

        <TextSection title="Why was this needed?">
          <p>Small-team buyers were abandoning the Teams purchase path for four related reasons:</p>
          <ul className="space-y-2">
            <li className="font-medium">Sticker shock:</li>
            <ul><li>A large annual total appeared early, with no lower-commitment option beside it.</li></ul>
            <li className="font-medium">Hidden details:</li>
            <ul><li>Payment methods, billing specifics and licensing rules appeared only late in checkout.</li></ul>
            <li className="font-medium">Fear of inflexibility:</li>
            <ul><li>Buyers could not tell how adding, removing or swapping users would work.</li></ul>
            <li className="font-medium">A late seat minimum:</li>
            <ul><li>The 5-seat minimum was revealed far down the funnel, where it could end a deal.</li></ul>
          </ul>

          <DecisionLog
            rows={[
              { label: "Decision", body: <>Offer self-serve pricing for 5–125 licenses, and switch to a guided &ldquo;Contact sales&rdquo; path above that range.</> },
              { label: "Why", body: <>Small teams get a fast answer, and larger teams reach sales with intent signals: seat count and billing cadence.</> },
              { label: "Tradeoff", body: <>Buyers above the range do not get a number from the module.</> },
              { label: "Mitigation", body: <>Explain what happens next, and carry the seat count and cadence into the sales form.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={2}
        title="Problem"
        summary={<>Show small teams a price they can trust early, and give larger teams a path to sales with no dead end.</>}
      >
        <TextSection title="Problem statement">
          <p className="case-pullquote">
            How might we let small-team buyers estimate Coursera for Teams pricing quickly and trust what they see, while giving larger teams a clear path to sales, without adding friction for buyers who are ready to purchase?
          </p>
        </TextSection>

        <TextSection title="Goals">
          <ul className="space-y-2">
            <li className="font-medium">No late surprises:</li>
            <ul><li>Show the price, the 5-seat minimum and the license rules before checkout.</li></ul>
            <li className="font-medium">No dead ends:</li>
            <ul><li>Give buyers above the self-serve range a guided path to sales that keeps their inputs.</li></ul>
            <li className="font-medium">A number worth carrying:</li>
            <ul><li>Give managers an estimate they trust and can take to whoever approves the budget.</li></ul>
          </ul>
        </TextSection>

        <TextSection title="Where it got hard">
          <ul className="space-y-2">
            <li className="font-medium">A trustworthy number can still drive people away:</li>
            <ul><li>Price had to appear early, so the design&rsquo;s job was framing the commitment: the cadence toggle first, and a breakdown readable at a glance.</li></ul>
            <li className="font-medium">Two audiences, one module:</li>
            <ul><li>Self-serve buyers and enterprise-bound buyers share a surface, and the handoff to sales could not feel like the tool had failed them.</li></ul>
            <li className="font-medium">Policy reads as fine print:</li>
            <ul><li>The 10% rotation limit and the mid-cycle add and remove rules matter to buyers, but they needed plain language beside the price, not a legal block below it.</li></ul>
          </ul>
        </TextSection>
      </Chapter>

      <Chapter
        number={3}
        title="Approach"
        summary={<>A plan comparison came first, then a calculator. The shipped module follows how buyers think: billing cadence, licenses, what is due today, and the rules.</>}
      >
        <TextSection title="Design Strategy">
          <Callout label="Insight">Teams buyers rarely decide alone. They need a number they trust, and they need to carry it to the person who approves the budget. Late surprises break that trust, and so does an estimate they cannot save or share.</Callout>
          <p>
            My concept brief turned this into one idea tested three ways: show 5–125 seat pricing with a prominent cadence toggle, explain the key policies inside the module, and route larger selections to a guided sales path. Success was measured by time to convert, checkout completion and lead quality, with SQLs from non-self-serve leads as a guardrail.
          </p>
        </TextSection>

        <TextSection title="Directions explored">
          <p>
            The first direction compared plans side by side: For Teams against For Enterprises, with who each plan suits, its key features, a price and a next step. I took it from wireframes through light, blue and dark treatments.
          </p>
          <Figure caption="The exploration wall: the plan comparison in wireframe, then in light, blue and dark treatments.">
            <Image
              src="/images/pricing-calculator/explorations.png"
              alt="Wall of plan comparison layout explorations, from grey wireframes to light, blue and dark visual treatments"
              width={1568}
              height={664}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="The plan comparison: it answered which plan fits, but not what a team would actually pay.">
            <Image
              src="/images/pricing-calculator/compare-plans.png"
              alt="Plan comparison module: For Teams, 5 to 125 people at a listed price per user per year with Buy now; For Enterprises, 125 or more at a custom price with Contact sales"
              width={1568}
              height={611}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <p>
            I also explored the calculator for the Coursera for Business page, as a compact strip that expands into the full module. Two options framed the first choice differently. One started from the seat count and switched to enterprise pricing once the count went past the self-serve range. The other asked buyers up front whether they were buying for a team or an enterprise. Both were decommissioned, and the module shipped on the Coursera for Teams page.
          </p>
          <Figure caption="Option 1, seat count first: the strip, the expanded calculator, and the switch to enterprise pricing at a high seat count.">
            <Image
              src="/images/pricing-calculator/option-seat-count.png"
              alt="Option 1 on the Coursera for Business page: a compact pricing strip with billing and seat count, the expanded calculator, and an enterprise state with Contact sales"
              width={1338}
              height={465}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="Option 2, intent first: choose Teams or Enterprise, then the billing cadence.">
            <Image
              src="/images/pricing-calculator/option-intent.png"
              alt="Option 2 on the Coursera for Business page: a strip asking whether the buyer wants Teams or Enterprise, the expanded calculator, and the Enterprise state with Contact sales"
              width={1337}
              height={465}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>

        <TextSection title="Options I ruled out">
          <DataTable
            caption="Directions explored and what happened to each"
            columns={["Option", "What happened"]}
            rows={[
              ["A plan comparison (For Teams against For Enterprises)", "It answered which plan fits, not what a team would pay, so it gave way to a calculator"],
              ["A seat-count strip on the Coursera for Business page", "Explored, then decommissioned with the Business page version"],
              ["An intent-first strip (Teams or Enterprise) on the same page", "Explored, then decommissioned with the Business page version"],
            ]}
          />
        </TextSection>

        <TextSection title="Final design">
          <p>
            The final design brings the four buyer concerns into one module on the Teams landing page. Buyers move through it in the order they think: how often they pay, how many licenses, what is due today, and what the rules are.
          </p>
          <Figure caption="The shipped calculator: the policies on the left, billing and licenses in the middle, and what is due today on the right.">
            <Image
              src="/images/pricing-calculator/calculator.png"
              alt="Pricing calculator with policies, a choice between annual and quarterly billing, a license stepper, an Email estimate button, and a Due today summary with Continue to checkout"
              width={1568}
              height={473}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <ul className="space-y-2">
            <li className="font-medium">The commitment, framed first:</li>
            <ul><li>Annual and quarterly billing sit side by side as two clear choices, each with its price per license, so buyers see the lower-commitment option before any total.</li></ul>
            <li className="font-medium">Licenses, with the range built in:</li>
            <ul><li>A stepper starting at the 5-license minimum, with a link to volume discounts. Above the self-serve range, the price area becomes a &ldquo;Contact sales&rdquo; panel that explains why and what happens next.</li></ul>
            <li className="font-medium">A total you can trust:</li>
            <ul><li>&ldquo;Due today&rdquo; with taxes included, the billing cycle, the price per license and the number of licenses, plus the 14-day refund policy.</li></ul>
            <li className="font-medium">Policies in plain language, beside the price:</li>
            <ul><li>Quarterly billing, license transfers of up to 10% per billing cycle, adding licenses anytime with prorated pricing, and payment by card, ACH, wire, or purchase order over $10K.</li></ul>
            <li className="font-medium">Two ways forward:</li>
            <ul><li>Continue to checkout, or email the estimate to carry it to whoever approves the budget.</li></ul>
          </ul>
        </TextSection>

        <TextSection title="The estimate email system">
          <Figure caption="Email estimate: the number leaves with the buyer, ready to share.">
            <Image
              src="/images/pricing-calculator/email-estimate.png"
              alt="Email estimate dialog with an email field and a Send estimate button"
              width={1512}
              height={788}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <p>
            Emailing the estimate turned the calculator into a follow-up channel. I designed the estimate email, with a variant for limited-time offers, a Day 7 and Day 14 reminder sequence, and two offer-expiry reminders. Each email restates the estimate and ends with the same two paths: <mark className="font-medium">complete the purchase, or contact sales.</mark>
          </p>
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>24% of exposed visitors engaged with it, and putting the price up front cost nothing in conversion. It won all C4T traffic.</>}
      >
        <Results slug="pricing-calculator" />

        <TextSection title="Impact">
          <p>
            <mark className="font-medium">24% of the roughly 20% of landing-page traffic exposed to the module engaged with it.</mark> Showing the full price early is the riskiest thing a pricing page can do, and it cost nothing in conversion: Billing page visits and Teams conversion held steady. The only drop, an 8% dip in Account page progression, came from budget-mismatched visitors choosing themselves out early instead of abandoning checkout later. That is why the calculator won 100% of C4T traffic.
          </p>
          <p>
            Of the visitors who engaged, 75% did not continue to checkout. That separated people exploring the price from people ready to buy, which is exactly what an upfront estimate should do.
          </p>
        </TextSection>

        <TextSection title="Results">
          <p>
            We ran a 50:50 A/B test for about 5 weeks, randomized by cookie. The control was the C4T page without the calculator; the treatment was the page with it. Metrics use a 7-day attribution window, measured from exposure.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-body-sm">
              <caption className="sr-only">A/B test results, control versus calculator</caption>
              <thead>
                <tr className="border-b border-stone font-mono text-mono uppercase tracking-wide text-smoke">
                  <th scope="col" className="py-3 pr-4 font-normal">Metric</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Control</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Test</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Change</th>
                  <th scope="col" className="py-3 font-normal">Read</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.metric} className="border-b border-stone align-top">
                    <th scope="row" className="py-3 pr-4 font-normal text-ink">{r.metric}</th>
                    <td className="py-3 pr-4 tabular-nums">{r.control}</td>
                    <td className="py-3 pr-4 tabular-nums">{r.test}</td>
                    <td className="py-3 pr-4 tabular-nums text-ink">{r.change}</td>
                    <td className="py-3 text-smoke">{r.read}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The Teams conversion lift is directional and not statistically significant, so I do not claim it as a win.
          </p>
        </TextSection>

        <TextSection title="What the behavior shows">
          <ul className="space-y-2">
            <li className="font-medium">There is real demand for upfront cost:</li>
            <ul><li>About 20% of landing-page traffic saw the module, and 24% of those visitors engaged with it meaningfully.</li></ul>
            <li className="font-medium">The drop works as a low-intent filter:</li>
            <ul><li>Roughly 75% of visitors who used the calculator did not continue to the Account page. Because Billing visits and conversion held steady, these look like budget-mismatched visitors choosing themselves out, not visitors blocked by friction in the UI. The calculator did the filtering that checkout used to do, earlier and more kindly.</li></ul>
          </ul>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Ship the pricing calculator to 100% of C4T traffic.</> },
              { label: "Why", body: <>Visitors wanted upfront cost, and giving it to them protected conversion while filtering out low-intent visitors early.</> },
              { label: "Tradeoff", body: <>An 8% drop in Account page progression.</> },
              { label: "Mitigation", body: <>Judge it downstream: the visitors who left looked budget-mismatched, not blocked.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={5}
        title="Reflection"
        summary={<>An early drop-off can be the design working: showing cost sorts buyers by fit. Next, make the estimate easier to carry to whoever approves the budget.</>}
      >
        <TextSection title="Conclusion">
          <p>
            Teams buyers will use an upfront estimate when it is offered, and <mark className="font-medium">showing cost early sorts buyers by fit while protecting conversion.</mark>
          </p>
          <Callout>A drop at the first step can be the design working. I now judge a pricing surface by what happens downstream, not by top-of-funnel progression.</Callout>
        </TextSection>

        <TextSection title="What I would do differently">
          <p>
            I would design the follow-up, the saved estimate and the reminders, as part of the module from day one, since the buyer&rsquo;s real job is to carry a number back to their team.
          </p>
        </TextSection>

        <TextSection title="Next steps">
          <ul className="space-y-2">
            <li className="font-medium">Make the estimate easier to carry:</li>
            <ul><li>A one-click copy or download of the quote.</li></ul>
            <li className="font-medium">Measure the follow-up:</li>
            <ul><li>Track how the estimate and reminder emails perform against faster time to convert and higher checkout completion.</li></ul>
          </ul>
        </TextSection>
      </Chapter>
      </CaseBody>
    </CaseStudyLayout>
  )
}
