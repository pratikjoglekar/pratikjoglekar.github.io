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

export const metadata = caseStudyMetadata("cancellation")

export default function Cancellation() {
  return (
    <CaseStudyLayout slug="cancellation">
      <CaseHeader
        slug="cancellation"
        tldr={<>HubSpot&rsquo;s starter customers often cancelled before the roughly two-year payback on what it cost to acquire them. In 2 months, as the sole product designer, I designed a time-bound offer at the moment of cancellation, with a breakdown that shows exactly what the discount covers. It drove 36% dollar retention among recipients, and 14% stayed on after the discount ended, without a permanent price change.</>}
      />

      <CaseBody>
      <Chapter
        number={1}
        title="Context"
        summary={<>Starter customers often cancelled before HubSpot recouped the roughly 2-year cost of acquiring them, so each early churn lost money.</>}
      >
        <TextSection title="Churn that lost money">
          <p>Acquiring a starter customer cost far more than that customer paid in the short term, so the payback took nearly two years. Customers who left before then cost HubSpot more than they ever brought in.</p>
          <p>Cancellations and downgrades among starter customers were rising. Treated as a churn problem, the obvious fix was a lower price. Handled bluntly, that would have meant a permanent price change for everyone, including customers who were happy to pay.</p>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Judge the work by dollar retention and lifetime value, the revenue a saved customer actually brings in.</> },
              { label: "Why", body: <>Churn alone hid the real risk: customers who left before payback created negative unit economics.</> },
              { label: "Tradeoff", body: <>Some retained customers would still leave later, which hurts short-term churn numbers.</> },
              { label: "Mitigation", body: <>Count success as dollars retained and customers who stayed after the discount ended. A cancellation pushed back a month does not count.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={2}
        title="Problem"
        summary={<>Keep price-sensitive starter customers at the moment they cancel, without permanent price changes. The market showed how.</>}
      >
        <TextSection title="Problem statement">
          <p className="case-pullquote">How might we keep price-sensitive starter customers long enough to recoup what it cost to win them, without changing the price for everyone?</p>
        </TextSection>

        <TextSection title="What the market showed">
          <p>I studied how B2B SaaS companies such as VEED.IO, Jasper.ai, Notion, Intercom, ClickFunnels and Canva use retention offers. Each pattern shaped a specific part of the design.</p>
          <DataTable
            caption="Competitor patterns and the part of the design each one shaped"
            columns={["What the market showed", "What it shaped"]}
            rows={[
              ["Offers appear only at a moment of intent", "The offer appears only inside the cancellation flow"],
              ["Framing changes with where the customer is", "Copy written for someone who has decided to leave"],
              ["Supportive, benefit-led language gets accepted", "Offer copy that reads as help with the cost"],
              ["The discount applies the moment it is accepted", "A breakdown that shows the new price straight away"],
            ]}
          />
          <p>The hypothesis came with a clear failure line. A 50% discount should keep about a third of price-sensitive customers, and they should keep paying after it ends. If fewer than 5% continued after the discount, or lifetime value still did not exceed acquisition cost, the idea had failed.</p>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Offer a time-bound discount only inside the cancellation flow.</> },
              { label: "Why", body: <>Cancellation is the moment of explicit intent and highest price sensitivity, so the offer is most relevant there.</> },
              { label: "Tradeoff", body: <>No reach for customers who leave silently, without entering the flow.</> },
              { label: "Mitigation", body: <>Validate impact on a tight scope first, before exploring earlier signals.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={3}
        title="Approach"
        summary={<>A tightly scoped experiment: the right cohort, the right moment in the flow, and an offer whose terms are clear before anyone accepts it.</>}
      >
        <TextSection title="How I led the work">
          <p>As the only product designer, working with a PM, two developers and a data analyst:</p>
          <ul className="space-y-2">
            <li><strong>Chose the cohort with the analyst,</strong> from data on paying customers, product adoption and billing setup.</li>
            <li><strong>Coordinated growth, pricing, legal, engineering and customer experience,</strong> and iterated the customer-facing language with legal while development was already underway.</li>
          </ul>
          <p><strong className="case-h3">The call I made</strong></p>
          <p>The obvious brief was &ldquo;reduce churn.&rdquo; I reframed it around dollar retention and lifetime value, and anchored success on whether customers kept paying after the discount ended. That ruled out counting cancellations that were only delayed as wins, which a churn number alone would have hidden.</p>
          <Callout label="Insight">Price-sensitive customers are not rejecting the product. They are signaling a temporary mismatch between when they get value and what they can afford. Well-timed flexibility can keep their trust and extend lifetime value.</Callout>
        </TextSection>

        <TextSection title="Why not just cut the price">
          <p>A permanent price cut would have lowered the bill for everyone, including customers who were happy to pay. Showing the offer earlier in the journey would have reached people with no intent to cancel, where it means little. Rolling it out to every customer at once would have added noise and made the result harder to read. And counting deferred cancellations as wins would only have hidden churn that arrives a month later.</p>
        </TextSection>

        <TextSection title="Strategy: validate narrowly, then expand">
          <p>The first rollout went only to customers with clear price-sensitivity and churn-risk signals:</p>
          <ul className="space-y-2">
            <li>on <strong>starter products</strong> and the <strong>Starter Customer Platform</strong></li>
            <li>on the <strong>new seats-based pricing</strong></li>
            <li>on a <strong>monthly commitment, paid monthly</strong></li>
          </ul>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Limit the experiment to a narrowly defined, high-risk starter cohort.</> },
              { label: "Why", body: <>A focused segment reduced noise and made the result easier to trust and faster to read.</> },
              { label: "Tradeoff", body: <>The result would not immediately apply to every customer segment.</> },
              { label: "Mitigation", body: <>Treat it as validation, with expansion criteria agreed up front.</> },
            ]}
          />
        </TextSection>

        <TextSection title="Designing the moment">
          <p>Three choices shaped the moment itself: where the offer appears, how it reads, and how clear its terms are.</p>
          <p><strong className="case-h3">Where the offer appears</strong></p>
          <p>I mapped the whole cancellation flow to find the moment when a customer has clearly said they are leaving but is still open to staying. The offer appears there, at the second of four steps, right after the customer says why they want to cancel and before they review the cancellation.</p>
          <Figure caption="The cancellation flow map. The offer and its accept path are in green: the offer sits right after the customer shares why they are leaving, accepting leads to a short confirm and checkout path, and declining continues the cancellation as before.">
            <Image
              src="/images/retention/cancellation-flow.png"
              alt="Cancellation user flow: cancel auto-renewal, select what to cancel, share why, then the offer. If accepted: confirm the offer, mini checkout, offer confirmation and billing details, with a reminder 30 days before the offer expires. If declined: additional details, summary and canceled."
              width={1568}
              height={468}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">An offer that reads as help</strong></p>
          <p>The offer says what it is in one line: 50% off for the next three months. It shows the old and new price side by side, the date the discount ends, and, in plain words, that it covers existing products and seats only.</p>
          <Figure caption="The offer at step 2 of 4: the discount, the new price, when it ends and what it covers.">
            <Image
              src="/images/retention/retention-offer.png"
              alt="Retention offer shown during cancellation: 50% off for 3 months"
              width={1456}
              height={832}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">No surprises on the bill</strong></p>
          <p>Before accepting, customers can open an offer breakdown. It lists, line by line, what is discounted and what is not, so the new total is never a surprise. Clear terms let customers reverse their decision with confidence, without eroding trust in HubSpot&rsquo;s pricing.</p>
          <Figure caption="The offer breakdown: each product with its discount, the add-ons that stay at full price, and the new total.">
            <Image
              src="/images/retention/offer-breakdown.png"
              alt="Offer breakdown drawer listing each product with its 50% discount, additional marketing contacts at full price, and a summary with the order total and savings"
              width={1317}
              height={1214}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>The offer drove 36% dollar retention among recipients, and 14% stayed on after the discount ended.</>}
      >
        <Results slug="cancellation" />

        <TextSection title="What the numbers do and do not show">
          <p>Two links are measured. Placing the offer inside the cancellation flow kept 36% of recipients&rsquo; revenue on the experiment cohort. Tracking what happened after the discount ended showed 14% kept paying, well above the 5% failure line, which is how we told real retention from delayed churn.</p>
          <p>Two are not. I believe the clear terms and the offer breakdown helped acceptance, but acceptance was not measured screen by screen. And the cohort was narrow and high-risk on purpose, so the result is not yet shown for other segments.</p>
        </TextSection>
      </Chapter>

      <Chapter
        number={5}
        title="Reflection"
        summary={<>The discount worked because of where and when it appeared. Next time I would A/B test discount levels, to find the smallest offer that still keeps customers.</>}
      >
        <TextSection title="A first for HubSpot">
          <p>HubSpot had not run a retention offer like this before, so the patterns, safeguards and compliance checks were all new. Growth, pricing, legal, engineering and customer experience each had a stake, and their priorities did not always agree. Customer-facing language, feasibility and the roadmap kept moving while development was already underway.</p>
          <p>The risks were real, too. Offers can teach customers to expect discounts and can distort short-term revenue, so the failure line kept both in view.</p>
        </TextSection>

        <TextSection title="What I would do differently">
          <p>I would test discount levels systematically. The 50% offer was chosen to prove the idea quickly, and it did, but time did not allow testing smaller offers. The best balance between retention and revenue, for different levels of price sensitivity, is still unknown.</p>
          <p>What I would keep: the offer&rsquo;s timing and scope did more work than its size. Shown once, right after customers said why they were leaving, it protected lifetime value without making discounts the default.</p>
        </TextSection>
      </Chapter>

    </CaseBody>
    </CaseStudyLayout>
  )
}
