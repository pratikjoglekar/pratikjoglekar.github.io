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

export const metadata = caseStudyMetadata("c4cintegrations")

export default function c4cintegrations() {
  return (
    <CaseStudyLayout slug="c4cintegrations">
      <CaseHeader
        slug="c4cintegrations"
        tldr={<>Coursera&rsquo;s LMS integration ran through third-party middleware that delayed grades by a day or two and took weeks to set up. I was the product designer on the native LTI that replaced it: near real-time grade sync, self-serve registration, content linking inside the LMS, and admin controls. The LMS connection rate rose from 10% to 31%, and support dependency fell from 57% to 7%.</>}
      />

      <CaseBody>
      <Chapter
        number={1}
        title="Context"
        summary={<>Coursera&rsquo;s LMS integration ran through middleware that could not support for-credit learning at scale. I designed the native integration that replaced it.</>}
      >
        <TextSection title="The middleware could not carry for-credit learning">
          <p>Universities connect Coursera to their learning management system (Canvas, Blackboard, Moodle) through LTI, an industry standard. It lets learners launch courses from the LMS without another login, lets instructors place Coursera content inside their course, and sends grades back to the gradebook.</p>
          <p>Coursera for Campus ran that connection through a third-party middleware. The same four problems kept coming back:</p>
          <ul className="space-y-2">
            <li><strong>Late, opaque grades.</strong> Grade sync lagged by a day or two, and when it failed, nobody could easily see why. Faculty could not trust the gradebook for credit.</li>
            <li><strong>Slow, manual setup.</strong> Onboarding was high-touch and often took two to three weeks of back-and-forth.</li>
            <li><strong>Missing academic workflows.</strong> Universities relied on customizations such as multiple LMS shells, granular grade sync and roster-based access. Replacing the middleware without them would have broken existing partners.</li>
            <li><strong>A disconnected learner experience.</strong> Coursera content opened in a separate browser tab, so it felt like a third-party tool instead of part of the course.</li>
          </ul>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Replace the middleware with a native LTI instead of continuing to patch it.</> },
              { label: "Why", body: <>It gave Coursera ownership of the whole experience, removed the vendor dependency, and matched what competitors already offered.</> },
              { label: "Tradeoff", body: <>Value could take a long time to show, and the work would take engineering capacity from other initiatives.</> },
              { label: "Mitigation", body: <>Move smaller customers right after the first release, to validate impact early.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={2}
        title="Problem"
        summary={<>Only 10% of LMS connections succeeded, and 57% of admin issues needed support. The field told us where it hurt most.</>}
      >
        <TextSection title="Problem statement">
          <p className="case-pullquote">How might we replace the middleware with an integration universities can set up themselves, that keeps grades trustworthy, and that makes Coursera feel native inside the LMS, without losing the workflows existing partners depend on?</p>
        </TextSection>

        <TextSection title="What the field told us">
          <p>The first release was tied to a go-to-market date, so discovery started with the people closest to customers. In September 2025 I ran a focus group with eight Customer Success Managers, Implementation Managers and Solutions Architects across LATAM, EMEA and APAC. Each finding shaped a specific part of the design.</p>
          <DataTable
            caption="Focus group findings and the part of the design each one shaped"
            columns={["What the field told us", "What it shaped"]}
            rows={[
              ["Embedding Coursera inside the LMS was the most requested feature", "The embedded learner view"],
              ["Grade sync delays kept recurring, and customers needed better diagnostics", "Real-time grade sync, registration status and a grade-sync cutoff"],
              ["Instructors wanted course detail before selecting, and instructor and admin experiences felt far apart", "The content picker, and admin control over what instructors see"],
              ["Setup needed self-serve guidance", "A guided registration flow with documentation"],
            ]}
          />
          <p>A survey of admins and instructors among early users followed in March 2026, covering ease of setup, blockers, and what to improve first.</p>
          <DecisionLog
            rows={[
              { label: "Decision", body: <>Real-time grade sync instead of periodic batch updates.</> },
              { label: "Why", body: <>Delayed grades undermined trust for instructors and admins who rely on LMS records.</> },
              { label: "Tradeoff", body: <>More technical complexity, and dependence on each LMS&rsquo;s reliability.</> },
              { label: "Mitigation", body: <>Clear error states, retries and visible sync status.</> },
            ]}
          />
        </TextSection>
      </Chapter>

      <Chapter
        number={3}
        title="Approach"
        summary={<>Parity first, then self-serve setup, then a better experience on top. I designed the decisions that make the integration safe by default.</>}
      >
        <TextSection title="How I led the work">
          <p>As the only product designer, working with a PM, eight developers and a data analyst, I treated alignment as part of the design job.</p>
          <ul className="space-y-2">
            <li><strong>Started from the field.</strong> The focus group meant the roadmap began from what customers had actually raised, not from assumptions.</li>
            <li><strong>Ran JTBD interviews with instructors and admins</strong> and created a shared prioritization framework, so the team moved past surface feature requests to the integration gaps behind them.</li>
            <li><strong>Co-authored the initiative concept</strong> with the PM: the problem, the phased roadmap, the risks and the baseline metrics.</li>
            <li><strong>Facilitated a cross-functional workshop</strong> that scored ideas on user impact, technical feasibility and platform leverage, so priorities came from shared criteria instead of the loudest voice.</li>
            <li><strong>Stepped into an open Product Manager role</strong> for the instructor-facing side (due dates, learner progress and certificates), owning discovery, stakeholder alignment, sprint planning and delivery across engineering, QA and customer success.</li>
            <li><strong>Used an early prototype to settle direction.</strong> With little time for traditional research, I built an AI-assisted, end-to-end concept so engineering and the business could react to something concrete before committing build effort.</li>
          </ul>
          <p><strong className="case-h3">The call I pushed for</strong></p>
          <p>Go-to-market pressure pushed for a first release that kept the third-party middleware. I argued for building the integration natively, so Coursera would own observability, how grades sync, and how fast the roadmap could move. The cost was less flexibility for unusual LMS configurations. The native integration shipped, and the connection rate rose from 10% to 31%.</p>
          <Figure caption="The AI-assisted concept the team reacted to before committing build effort.">
            <Image
              src="/images/integrations/ai-concept.png"
              alt="Early AI-assisted concept of the native LTI experience"
              width={1355}
              height={896}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>

        <TextSection title="Strategy: parity first">
          <Callout label="Insight">Top university partners would not move until the native tool matched what they already had. So the roadmap protected existing customers before it added anything new.</Callout>
          <ol className="list-decimal space-y-2 pl-5">
            <li><strong>Core integration.</strong> LMS registration, content linking with course search, single sign-in, course-level grade sync and basic rostering. The first customer went live in December 2025.</li>
            <li><strong>One-click setup.</strong> Admins connect Coursera with a single URL instead of back-and-forth with support.</li>
            <li><strong>Academic customizations.</strong> Granular grade sync first, then incremental sync and restoring grades for re-enrolled students.</li>
            <li><strong>Content discovery.</strong> A structured catalog with search and filters, so instructors can judge content before linking it.</li>
            <li><strong>Embedded learner experience.</strong> Coursera content inside the LMS, so learners never leave the course.</li>
          </ol>
        </TextSection>

        <TextSection title="Designing safe defaults">
          <DecisionLog
            rows={[
              { label: "Decision", body: <>An opinionated setup flow instead of exposing every option up front.</> },
              { label: "Why", body: <>Most institutions had similar needs, and extra flexibility raised error rates and support load.</> },
              { label: "Tradeoff", body: <>Power users get fewer customization options.</> },
              { label: "Mitigation", body: <>Advanced settings appear progressively, and supported extensions are documented.</> },
            ]}
          />

          <p><strong className="case-h3">Giving admins control over what instructors see</strong></p>
          <p>Every instructor saw every program, which risked misused licenses, contract breaches and blocked rollouts. I added an org-level control that opens program selection, and it only turns on once an active program is saved. Each LTI registration shows a status in words (Configured, Not configured, Needs attention), and a warning appears when enabling with unconfigured registrations. The unsafe state, control on with nothing visible, cannot happen. Existing links keep working, so the control only affects future selection.</p>
          <Figure caption="Before: Program Access Control is off, and every program is visible to instructors.">
            <Image
              src="/images/integrations/access-off.png"
              alt="Settings, Integrations: Program Access Control with its toggle off"
              width={1568}
              height={606}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="Turning it on goes straight to choosing programs, so the control is never on with nothing selected.">
            <Image
              src="/images/integrations/access-select-programs.png"
              alt="Dialog titled Program Access Control Enabled explaining that instructors will only see selected programs, with a Select programs button"
              width={1568}
              height={659}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="After: the control is on, with a plain-language confirmation of what instructors will see.">
            <Image
              src="/images/integrations/access-on.png"
              alt="Program Access Control switched on, with a Select programs link and a green confirmation that only selected programs will be available"
              width={1568}
              height={727}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">Letting instructors set a grade-sync cutoff</strong></p>
          <p>Sync was continuous, so gradebooks kept changing after evaluation ended, and the LMS did not send due dates. Instead of guessing, instructors can set an optional date when they create a link, labeled &ldquo;Stop grade sync to Gradebook&rdquo; so it cannot be mistaken for the LMS due date. It solves a real need without relying on data the LMS does not provide.</p>
          <Figure caption="Link setup: the optional cutoff sits beside the grade configuration, with copy that separates it from the LMS due date.">
            <Image
              src="/images/integrations/grade-sync-cutoff.png"
              alt="Finalize Setup screen with an optional Stop Grade Sync to Gradebook date and time, and a Grade Configuration choice between final grade sync and item level grade sync"
              width={957}
              height={1232}
              className="mx-auto h-auto w-full max-w-[460px]"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">Three smaller decisions</strong></p>
          <ul className="space-y-2">
            <li><strong>Content linking.</strong> Choose the license scope, then the content type. One Specialization is one link, with course order visible but no course picker. Instructors cannot pick single courses inside it, which protects the one-link, one-grade model.</li>
            <li><strong>Progress and certificates.</strong> Status appears next to the linked item, and only for items that were actually deep linked. Instructors can view certificates but not download them.</li>
            <li><strong>Embedded learner view.</strong> Content appears inside the LMS, adapting to hosts that scale responsively and to hosts that only allow fixed-size pop-ups.</li>
          </ul>
          <Figure caption="Course detail in the content picker: instructors see the modules and what each includes before they link anything.">
            <Image
              src="/images/integrations/course-detail.png"
              alt="Course detail view in the Coursera content picker, with modules and their contents"
              width={1395}
              height={1280}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>

        <TextSection title="Options I ruled out">
          <DataTable
            caption="Options considered and why each was ruled out"
            columns={["Option", "Why I ruled it out"]}
            rows={[
              ["Keep patching the middleware", "Coursera would never own observability, grade sync or the roadmap"],
              ["Batch grade updates", "Delayed grades undermined trust for credit"],
              ["Expose every setting up front", "Extra flexibility raised error rates and support load"],
              ["Let instructors pick single courses inside a Specialization", "It would break the one-link, one-grade model"],
            ]}
          />
        </TextSection>

        <TextSection title="Validation">
          <p>We checked the design in usability sessions on the first version, then with the survey of early users.</p>
          <ul className="space-y-2">
            <li><strong>Self-serve setup.</strong> Admins connected an LMS end to end with no support present, and we noted every hesitation and backtrack.</li>
            <li><strong>Content discovery.</strong> Instructors looked for Coursera content that fit a specific part of their curriculum, and we watched whether the flow surfaced the right material or forced workarounds.</li>
            <li><strong>Trust in grade sync.</strong> Instructors saw sync status and grade passback, and we asked whether they trusted the grades enough to use them for credit.</li>
          </ul>
          <p>The go-to-market date left no time for longitudinal research, so expert reviews, internal dogfooding, rapid iteration and cross-functional feedback filled the gap. That leaves research debt I would repay with a longer-term study of how admins and instructors use the integration over time.</p>
          <p><strong className="case-h3">What changed after check-ins</strong></p>
          <p>At launch, the cutoff could not be changed once set, as the setup screen above says. After check-ins with Customer Success Managers, phase 2 brought every link into one instructor overview, where each item shows when its grade sync stops, and the date can be updated after setup.</p>
          <Figure caption="Phase 2: one overview of every link, with its stop date, ungraded items marked, and learner details one click away.">
            <Image
              src="/images/integrations/instructor-overview.png"
              alt="Instructor overview of a course shell listing Coursera content with created dates, a Stop Grade Sync on column and enrolled learners"
              width={1568}
              height={736}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>
      </Chapter>

      <Chapter
        number={4}
        title="Outcome"
        summary={<>Connection success rose from 10% to 31%, and support dependency fell from 57% to 7% over two quarters.</>}
      >
        <Results slug="c4cintegrations" />

        <TextSection title="What my decisions plausibly moved">
          <p>The results belong to the whole team, so I claim only the links I can defend, and I mark the rest as hypotheses.</p>
          <DataTable
            caption="Design decisions, the result each most plausibly affected, and the evidence today"
            columns={["Decision", "Result it most plausibly affected", "Evidence today"]}
            rows={[
              ["Real-time grade sync and the grade-sync cutoff", "Instructor trust in grades", "Survey comments; no metric yet"],
              ["Admin control and registration status", "Support dependency, 57% to 7%", "Hypothesis; not isolated from other changes"],
              ["Guided self-serve registration", "LMS connection rate, 10% to 31%", "Hypothesis; customers often still needed hands-on help"],
              ["Content picker and embedded view", "Content linking and learner adoption", "Hypothesis; no per-decision measurement"],
            ]}
          />
          <Figure caption="The north-star design: instructors see gaps in their curriculum and the Coursera content that fits, without leaving the LMS.">
            <Image
              src="/images/integrations/northstar-home.png"
              alt="North-star design of Coursera content inside an LMS"
              width={1400}
              height={868}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="North-star browsing: instructors filter the catalog by topic, duration, product type, language and level, then view or select any course, certificate, project or video without leaving the LMS.">
            <Image
              src="/images/integrations/northstar-search.png"
              alt="North-star search page with filters and a grid of Coursera courses, certificates, guided projects and videos, each with View and Select actions"
              width={1299}
              height={924}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
        </TextSection>
      </Chapter>

      <Chapter
        number={5}
        title="Reflection"
        summary={<>Self-serve is a product plus an operating model. The setup flow is half of it; what happens when setup fails is the other half.</>}
      >
        <TextSection title="Where it got hard">
          <ul className="space-y-2">
            <li><strong>We could not control the host.</strong> Each LMS behaves differently. Canvas decides multi-select per placement at launch, and Moodle adds its own confirmation page. Most platforms exposed little data, so the design had to degrade gracefully per placement instead of assuming one behavior.</li>
            <li><strong>Migration had a short window.</strong> Customers would only move between academic semesters, and the move depended on getting enrollment and grade data out of the old middleware.</li>
            <li><strong>Self-serve alone was not enough.</strong> Customers often still needed hands-on help through setup and testing. Clear ownership from field teams mattered as much as the product.</li>
            <li><strong>The component library was not built for this.</strong> Enterprise integration workflows needed components that did not exist yet, so we extended the system while keeping it consistent and accessible.</li>
          </ul>
        </TextSection>

        <TextSection title="What I would carry forward">
          <p>Native LTI made Coursera a first-party part of the LMS, with grades that arrive in near real time and a setup customers can start themselves. The work continues with broader LMS support, better observability and richer content discovery.</p>
          <Callout label="Lesson">Self-serve is a product plus an operating model. A setup flow is only half of it. The other half is what happens when setup fails: visible status, diagnostics, and a clear handoff to a person.</Callout>
        </TextSection>
      </Chapter>

    </CaseBody>
    </CaseStudyLayout>
  )
}
