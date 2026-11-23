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
  ScreenGrid,
} from "@/components/case-study/CaseStudy"
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure"

export const metadata = caseStudyMetadata("pricing-calculator")

const results = [
  { metric: "Exposure to Account page", control: "12.3%", test: "11.3%", change: "−8%", read: "Statistically significant decrease" },
  { metric: "Exposure to Billing page", control: "1.4%", test: "1.4%", change: "~0%", read: "No observed change" },
  { metric: "Exposure to Teams conversion", control: "0.80%", test: "0.92%", change: "+15%", read: "Positive and directional; not statistically significant" },
]

export default function PricingCalculator() {
  return (
    <CaseStudyLayout slug="pricing-calculator">
      <CaseHeader
        slug="pricing-calculator"
        tldr={<>Small teams were discovering critical pricing and licensing constraints too late in the Coursera for Teams purchase journey, which added friction at checkout. I led the design of a pricing calculator that moved those decisions to the Teams landing page: an upfront estimate, transparent licensing rules and a guided sales path for larger teams. In a five-week A/B test, 24% of exposed visitors engaged with it. Account page progression fell 8%, Billing visits held steady, and overall conversion showed a positive but statistically inconclusive 15% relative lift. The calculator was then rolled out to all C4T traffic.</>}
      />

      <CaseBody>
      <Chapter
        number={1}
        title="Context"
        summary={<>Teams buyers learned the real cost, the 5-seat minimum and the licensing rules only after they had invested time in checkout.</>}
      >
        <TextSection title="Project Overview">
          <AnnotatedFigure
            src="/images/pricing-calculator/calculator-final.png"
            alt="Estimate your price module: annual or quarterly billing, a license stepper, Continue to checkout and Email estimate, an estimate of $1,995 due today, and policies for quarterly billing, license transfers, team size flexibility and payment options"
            width={1568}
            height={621}
            caption="The final calculator on the Teams landing page: billing cycle, licenses and the estimate, with the key policies alongside."
            pins={[
              { x: 18, y: 30.1, title: "Billing choice, priced.", body: "Annual and quarterly side by side, each with its per-license price, so the cheaper commitment is visible up front." },
              { x: 29.8, y: 51.9, title: "Seats from five.", body: "The stepper starts at the 5-seat minimum, and Volume discounts opens the tiers in one place." },
              { x: 34.5, y: 23.5, title: "A live estimate.", body: "Billing cycle, price per license and seats update as you go, with taxes included and the refund policy beside the total." },
              { x: 69.2, y: 27.4, title: "Rules beside the price.", body: "Quarterly billing, license transfers, adding seats and payment options, each in one plain line." },
              { x: 28.6, y: 76.2, title: "A way to wait.", body: "Email estimate sends the number to whoever approves the budget." },
            ]}
          />
          <p>
            Teams buyers could not see what a contract would cost until late in checkout. The 5-seat minimum and the licensing restrictions surfaced even later, often after buyers had already invested time in the purchase.
          </p>
          <p>
            I designed a pricing calculator for the Coursera for Teams landing page that brought these decisions forward. Buyers could configure 5 to 500 seats, compare quarterly and annual billing, understand the key licensing policies, and email an estimate to themselves. Larger teams were routed to a guided sales experience, with their configuration preserved.
          </p>
          <p>
            The objective was not simply to increase checkout entries. <mark className="font-medium">It was to help buyers understand the financial commitment before checkout,</mark> so they could make a more informed purchase decision.
          </p>
        </TextSection>
      </Chapter>

      <Chapter
        number={2}
        title="Problem"
        summary={<>The common thread was timing: buyers were asked to commit before they had enough information to evaluate the purchase.</>}
      >
        <TextSection title="Problem statement">
          <p className="case-pullquote">
            How might we help small-team buyers understand the true cost and commitment of Coursera for Teams before checkout, while giving larger teams a clear path to sales without adding friction for buyers ready to purchase?
          </p>
        </TextSection>

        <TextSection title="Why was this needed?">
          <p>Small-team buyers hit the same uncertainty at four points. A large annual total appeared early, with no lower-commitment option beside it. Payment methods, billing details and licensing rules showed up only late in checkout. Buyers could not easily tell how adding, removing or swapping users would work. And the 5-seat minimum appeared far down the funnel, where it could end a purchase after buyers had already invested time.</p>
          <p>
            The common thread was timing. Buyers were being asked to commit to a purchase before they had enough information to evaluate it.
          </p>
        </TextSection>

        <TextSection title="The design decision">
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Offer transparent self-serve pricing for 5 to 500 licenses, with a guided Contact Sales experience above that range.</> },
              { label: "Why", body: <>Small teams needed an immediate, reliable estimate. Larger teams needed a clear path to a sales conversation.</> },
              { label: "Tradeoff", body: <>Buyers above the self-serve threshold would not get an instant price.</> },
              { label: "Mitigation", body: <>Explain the sales handoff, and carry the seat count and billing cadence into the sales form.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={3}
        title="Approach"
        summary={<>A purchase-journey redesign: show the commitment upstream, make it understandable, and design for the next decision.</>}
      >
        <TextSection title="Design goals">
          <ul className="space-y-2">
            <li className="font-medium">No late surprises:</li>
            <ul><li>Show the price, the 5-seat minimum and the licensing rules before checkout.</li></ul>
            <li className="font-medium">No dead ends:</li>
            <ul><li>Give buyers above the self-serve range a guided path to sales that preserves their inputs.</li></ul>
            <li className="font-medium">A number worth carrying:</li>
            <ul><li>Give managers a reliable estimate they can share with whoever approves the budget.</li></ul>
            <li className="font-medium">Protect the purchase journey:</li>
            <ul><li>Move pricing decisions earlier without compromising downstream purchase activity.</li></ul>
          </ul>
        </TextSection>

        <TextSection title="Where it got hard">
          <p>The hard part was making a complex purchase decision understandable without adding friction.</p>
          <p><strong className="case-h3">Where the calculator should live</strong></p>
          <p>Stakeholders wanted the calculator on the enterprise page, Coursera for Business. I argued for the Teams page: for enterprise buyers the answer would always be Contact sales, so a calculator there adds little. The buyers who need a real number before they commit are small teams, so that is where the calculator belonged.</p>
          <p>Three other tensions shaped the design. Showing the real commitment earlier could discourage some buyers, but I chose clarity over an optimistic starting figure, with a prominent billing cadence choice and a breakdown that reads at a glance. Self-serve and enterprise-bound buyers shared one landing page, so the sales handoff had to feel like a next step, never a failed checkout. And the 10% license rotation limit and the mid-cycle add and remove rules mattered to the decision, so they had to be readable beside the price.</p>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Put the calculator on the Coursera for Teams page, not the enterprise page.</> },
              { label: "Why", body: <>Enterprise buyers always end at Contact sales, so a calculator adds little there. Small teams are the buyers who need a price before they commit.</> },
              { label: "Tradeoff", body: <>Enterprise visitors do not get a calculator on their page.</> },
              { label: "Mitigation", body: <>Above 500 licenses, the Teams calculator hands off to sales with the seat count kept.</> },
            ]}
          />
        </TextSection>

        <TextSection title="Design strategy">
          <Callout label="Insight">Buyers do not just need a price. They need a decision they can take back to their team: a number they trust, clarity about what they are committing to, and something they can share with whoever approves the budget.</Callout>
          <p>
            Late surprises break that trust, and so does an estimate that buyers cannot save, explain or share. So I approached the problem as a purchase-journey redesign rather than an isolated pricing interface, in three parts:
          </p>
          <ul className="space-y-2">
            <li className="font-medium">Move price discovery upstream:</li>
            <ul><li>Make the real financial commitment visible before checkout.</li></ul>
            <li className="font-medium">Make the commitment understandable:</li>
            <ul><li>Explain billing cadence, licensing restrictions and payment details beside the estimate.</li></ul>
            <li className="font-medium">Design for the next decision:</li>
            <ul><li>Let buyers carry the estimate forward by email or continue straight to checkout, with a guided sales path for larger teams.</li></ul>
          </ul>
          <p>
            Success would be judged across the whole purchase journey. Calculator engagement and checkout entries were only part of the picture.
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
            I also explored the calculator for the Coursera for Business page, as a compact strip that expands into the full module. Two options framed the first choice differently. One started from the seat count and switched to enterprise pricing once the count went past the self-serve range. The other asked buyers up front whether they were buying for a team or an enterprise. Both were decommissioned when the team agreed the calculator belonged on the Teams page, and the module shipped there.
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
          <DataTable
            caption="Directions explored and what happened to each"
            columns={["Option", "What happened"]}
            rows={[
              ["A plan comparison (For Teams against For Enterprises)", "It answered which plan fits, not what a team would pay, so it gave way to a calculator"],
              ["A seat-count strip on the Coursera for Business page", "Decommissioned: on the enterprise page the answer is always Contact sales"],
              ["An intent-first strip (Teams or Enterprise) on the same page", "Decommissioned for the same reason; the calculator moved to the Teams page"],
            ]}
          />
        </TextSection>

        <TextSection title="Final visual design">
          <p>
            The final design brought the four buyer concerns into one compact module on the Teams landing page. The interaction follows the order in which buyers make decisions: how many seats, how often they pay, what it costs, and what the rules are.
          </p>
          <ul className="space-y-2">
            <li className="font-medium">Upfront configuration:</li>
            <ul><li>A seat selector covering the self-serve range, with the 5-seat minimum clearly stated. Above the self-serve range, the price area becomes a Contact Sales panel that explains the next step.</li></ul>
            <li className="font-medium">A de-risked price:</li>
            <ul><li>A prominent quarterly and annual billing choice lets buyers compare their commitment, and a clear breakdown shows the billing cadence, any discount and the total.</li></ul>
            <li className="font-medium">No-surprise policies:</li>
            <ul><li>The 10% license rotation limit in plain language, with short explanations of adding and removing users mid-cycle.</li></ul>
            <li className="font-medium">Local currency and payment clarity:</li>
            <ul><li>Pricing in the buyer&rsquo;s local currency, with accepted payment methods and plan details visible before checkout.</li></ul>
            <li className="font-medium">A shareable estimate:</li>
            <ul><li>Buyers can email the estimate to themselves or continue straight to checkout.</li></ul>
          </ul>
          <p><strong className="case-h3">One estimate, every pricing state</strong></p>
          <p>
            The same estimate card had to stay honest across every case: the billing choice, volume tiers, seasonal promotions and the two together. Only one discount applies at a time, so when both qualify the estimate shows the better one and strikes through the other, so buyers never have to work it out. Quarterly billing, a seasonal promotion and the volume tiers are in Screens and states, below.
          </p>
          <Figure caption="A volume discount at 200 licenses: 27% off, the saving shown in the total, and the seasonal discount struck through because only one applies.">
            <Image
              src="/images/pricing-calculator/volume-discount.png"
              alt="Calculator with 200 licenses: the estimate shows $79,800 struck through and $58,254, $291 per license, a 27% volume discount, and a struck-through seasonal discount"
              width={2346}
              height={860}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="On mobile, the module stacks in decision order: billing, licenses, the next step, the estimate, then the policies.">
            <Image
              src="/images/pricing-calculator/mobile.png"
              alt="Three mobile screens of the calculator: the standard estimate, a volume discount and a seasonal discount, each stacking billing cycle, licenses, actions, estimate and policies"
              width={1477}
              height={1590}
              className="mx-auto h-auto w-full max-w-[600px]"
              sizes="600px"
            />
          </Figure>
          <Figure caption="Above the self-serve range: the price becomes custom, the billing choice steps back, and Contact sales takes over with the seat count kept.">
            <Image
              src="/images/pricing-calculator/contact-sales.png"
              alt="Calculator in the enterprise state: 500 licenses entered, a note to contact sales above 500 licenses, custom pricing in the estimate, and a Contact sales button"
              width={1568}
              height={548}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>

        <TextSection title="The estimate email system">
          <p>
            The calculator was not meant to end at the estimate. Buyers often needed to take that number to someone else before making a purchase, so I designed the estimate email as an extension of the purchase experience:
          </p>
          <ul className="space-y-2">
            <li>Standard estimate emails, and a variant for limited-time offers.</li>
            <li>Day 7 and Day 14 reminder emails.</li>
            <li>Two offer-expiry reminders.</li>
          </ul>
          <p>
            Each email restates the estimate and ends with the same two paths: <mark className="font-medium">complete the purchase, or contact sales.</mark> That carried the experience beyond the landing page and into the buyer&rsquo;s real decision-making process.
          </p>
          <Figure caption="The estimate email, offer variant: the plan, the discount, the total due today, what is included, and the two ways forward.">
            <Image
              src="/images/pricing-calculator/estimate-email.png"
              alt="Coursera estimate email: Teams Plan, estimate and offer expiry dates, $1,395 due today with a 30% seasonal discount, billing cycle and licenses, what is included, and Complete your purchase or Contact sales"
              width={1051}
              height={2133}
              className="mx-auto h-auto w-full max-w-[420px]"
              sizes="420px"
            />
          </Figure>
        </TextSection>

        <TextSection title="Screens and states">
          <p>The same estimate card in other pricing states. Select any screen to see it full size.</p>
          <ScreenGrid
            items={[
              { src: "/images/pricing-calculator/quarterly.png", alt: "Calculator with Quarterly selected, 5 licenses, and an estimate of $549 due per quarter at $439 per license per year", width: 2346, height: 860, caption: "Quarterly billing: the same layout, with the higher per-license price and the amount due each quarter." },
              { src: "/images/pricing-calculator/seasonal-discount.png", alt: "Calculator with 10 licenses: the estimate shows $3,990 struck through and $1,995, with a 50% seasonal discount", width: 2346, height: 860, caption: "A seasonal promotion: 50% off for a small team, with the original total struck through so the saving is obvious." },
              { src: "/images/pricing-calculator/volume-modal.png", alt: "Volume discount dialog: 125 to 199 licenses at 15% off, $340 per license, and 200 to 499 licenses at 25% off, $290 per license, each with a Buy button", width: 1060, height: 700, caption: "The Volume discounts link opens the tiers in one place, each with a one-click way to buy at that level." },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>Early-funnel progression fell while Billing visits held steady and conversion moved positively, though not significantly. The calculator was rolled out to all C4T traffic.</>}
      >
        <Results slug="pricing-calculator" />

        <TextSection title="Results: earlier decisions, without losing downstream activity">
          <p>
            We ran a five-week, 50:50 A/B experiment, randomized by cookie. The control showed the original C4T landing page without the calculator; the treatment included the new pricing module. Metrics used a seven-day attribution window, measured from exposure.
          </p>
          <p>
            About 20% of landing-page traffic was exposed to the module, and <mark className="font-medium">24% of those exposed visitors engaged with it.</mark>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-body-sm">
              <caption className="sr-only">A/B test results, control versus calculator</caption>
              <thead>
                <tr className="border-b border-stone text-body-sm font-medium text-smoke">
                  <th scope="col" className="py-3 pr-4 font-normal">Metric</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Control</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Treatment</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Change</th>
                  <th scope="col" className="py-3 font-normal">Interpretation</th>
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
        </TextSection>

        <TextSection title="What the behavior showed">
          <ul className="space-y-2">
            <li className="font-medium">Buyers engaged with upfront pricing:</li>
            <ul><li>24% of visitors exposed to the calculator engaged with it meaningfully, a sign of real demand for understanding the commitment before checkout.</li></ul>
            <li className="font-medium">The purchase journey changed:</li>
            <ul><li>Account page progression fell from 12.3% to 11.3%, while Billing page visits stayed at about 1.4%. Fewer visitors moved through the early purchase stage, and the number reaching Billing held steady. The pattern is consistent with some pricing decisions moving earlier in the journey.</li></ul>
            <li className="font-medium">Downstream conversion was not measurably harmed:</li>
            <ul><li>Teams conversion moved from 0.80% to 0.92%, a 15% relative increase. It was directional and not statistically significant, so we did not claim a proven lift. The important finding was that early-funnel behavior changed without an observed drop in downstream purchase activity.</li></ul>
          </ul>
        </TextSection>

        <TextSection title="What we did not prove">
          <p>
            The experiment did not establish that calculator users had higher purchase intent, or that checkout abandonment fell. We read the drop in Account progression as a possible sign of buyers qualifying themselves earlier, but we could not establish why every visitor left.
          </p>
          <p>
            A cohort analysis comparing calculator users with non-users would be needed to show whether the change improved revenue or buyer quality.
          </p>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Roll out the pricing calculator to 100% of C4T traffic.</> },
              { label: "Why", body: <>The experiment supported moving pricing discovery upstream while observed downstream purchase activity held.</> },
              { label: "Tradeoff", body: <>An 8% drop in Account page progression.</> },
              { label: "Mitigation", body: <>Judge the module downstream, and follow up with a cohort analysis of calculator users.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={5}
        title="Reflection"
        summary={<>More checkout entries do not always mean a healthier purchase journey.</>}
      >
        <TextSection title="Design for the decision">
          <p>
            The biggest lesson was that <mark className="font-medium">more checkout entries do not necessarily mean a healthier purchase journey.</mark> Buyers had been discovering important financial and licensing constraints after entering checkout. Moving that information upstream gave them the chance to understand their commitment before investing more time.
          </p>
          <p>
            The experiment showed early-funnel progression could fall while Billing visits held steady, and overall conversion moved positively, though we could not establish a statistically significant lift.
          </p>
          <p>
            It changed how I design purchase experiences. The goal is to give people the right information at the right moment, so they can decide without surprises later, even if fewer of them move through every step. I would also design the follow-up as part of the original product from day one: saving and sharing an estimate is part of the buyer&rsquo;s job.
          </p>
          <Callout>A better purchase journey is not the one with the most people entering checkout. It is the one where buyers understand what they are committing to before they get there.</Callout>
        </TextSection>

        <TextSection title="What I would improve next">
          <ul className="space-y-2">
            <li>Make estimates easier to carry, with one-click copying or downloading.</li>
            <li>Measure estimate-email engagement and its contribution to purchase completion.</li>
            <li>Compare the purchase behavior of calculator users and non-users.</li>
            <li>Track revenue per exposed visitor and sales-qualified leads.</li>
            <li>Measure time to purchase and checkout abandonment with sufficient sample sizes.</li>
          </ul>
        </TextSection>
      </Chapter>
      </CaseBody>
    </CaseStudyLayout>
  )
}
