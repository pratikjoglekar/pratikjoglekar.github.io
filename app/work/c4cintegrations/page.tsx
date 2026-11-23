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
          <p>Coursera for Campus ran that connection through a third-party middleware, and it kept failing universities in the same places. Grades synced a day or two late, and when a sync failed nobody could easily see why, so faculty could not rely on the gradebook for credit. Setup was high-touch and often took two to three weeks of back-and-forth.</p>
          <p>Universities also depended on customizations the middleware handled, such as multiple LMS shells, granular grade sync and roster-based access. Dropping them would have broken existing partners. And learners met Coursera in a separate browser tab, which made it feel like a third-party tool bolted onto the course.</p>
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
            <li><strong>Started from the field.</strong> The focus group meant the roadmap began with what customers had actually raised.</li>
            <li><strong>Ran JTBD interviews with instructors and admins</strong> and created a shared prioritization framework, so the team moved past surface feature requests to the integration gaps behind them.</li>
            <li><strong>Co-authored the initiative concept</strong> with the PM: the problem, the phased roadmap, the risks and the baseline metrics.</li>
            <li><strong>Facilitated a cross-functional workshop</strong> that scored ideas on user impact, technical feasibility and platform leverage, so everyone ranked ideas against the same criteria.</li>
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
            <li><strong>One-click setup.</strong> Admins connect Coursera by pasting a single URL.</li>
            <li><strong>Academic customizations.</strong> Granular grade sync first, then incremental sync and restoring grades for re-enrolled students.</li>
            <li><strong>Content discovery.</strong> A structured catalog with search and filters, so instructors can judge content before linking it.</li>
            <li><strong>Embedded learner experience.</strong> Coursera content inside the LMS, so learners never leave the course.</li>
          </ol>
        </TextSection>

        <TextSection title="Guided LMS setup">
          <p>
            Connecting an LMS used to mean weeks of back-and-forth with support, exchanging IDs and URLs by email. I redesigned it as a guided flow an admin can finish alone, from Coursera&rsquo;s own Settings.
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li><strong>Choose the LMS and how to connect.</strong> Canvas, Moodle, Blackboard, D2L and others. Dynamic registration is the recommended default because it exchanges the details automatically; static registration remains for platforms that need it.</li>
            <li><strong>Copy Coursera&rsquo;s details into the LMS.</strong> Every value an LMS asks for, each with a copy button and a short explanation, so nothing is retyped or guessed.</li>
            <li><strong>Paste the LMS details back into Coursera.</strong> One form, in the order most LMS consoles show them, marked as a production or test environment.</li>
            <li><strong>See every connection in one place.</strong> Each LMS appears in a table with its configuration type and environment, ready to view or remove.</li>
          </ol>
          <Figure caption="Step 1: choose the LMS and the configuration type, with dynamic registration recommended.">
            <Image
              src="/images/integrations/lms-setup-choose.png"
              alt="Choose your LMS: Moodle selected, and a choice between Dynamic (Automatic), marked Recommended, and Static (Manual) configuration"
              width={1140}
              height={1010}
              className="mx-auto h-auto w-full max-w-[520px]"
              sizes="520px"
            />
          </Figure>
            <Figure caption="Step 2: copy Coursera's configuration into the LMS, one value at a time.">
              <Image
                src="/images/integrations/lms-setup-coursera-config.png"
                alt="Coursera Config, step 1 of 2: Tool URL, Initiate login URL, Redirection URIs, Public keyset and Content Selection URL, each with a Copy button"
                width={1130}
                height={1193}
                className="mx-auto h-auto w-full max-w-[520px]"
                sizes="520px"
              />
            </Figure>
            <Figure caption="Step 3: paste the LMS details back into Coursera and pick the environment.">
              <Image
                src="/images/integrations/lms-setup-lms-config.png"
                alt="LMS configuration, step 2 of 2: platform name, environment, client ID, deployment ID, platform ID, public keyset, access token and authentication request URLs, and a Configure LTI tool button"
                width={1130}
                height={1660}
                className="mx-auto h-auto w-full max-w-[520px]"
                sizes="520px"
              />
            </Figure>
          <Figure caption="Step 4: the connection is confirmed, and every LMS sits in one table with its configuration type and environment.">
            <Image
              src="/images/integrations/lms-setup-connections.png"
              alt="Settings, Integrations, LTI tool configurations: a success message and a table of Moodle, Blackboard and D2L connections with client ID, static or dynamic configuration, production or test environment, and view and delete actions"
              width={2480}
              height={1250}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
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
          <p>Every instructor saw every program, which risked misused licenses, contract breaches and blocked rollouts. I added a control for each LMS connection that opens program selection, and it only turns on once an active program is saved. Each LTI registration shows a status in words (Configured, Not configured, Needs attention), and a warning appears when enabling with unconfigured registrations. The unsafe state, control on with nothing visible, cannot happen. Existing links keep working, so the control only affects future selection.</p>
          <Figure caption="Before: access is set per LMS connection. Every connection starts at All programs, with its own toggle.">
            <Image
              src="/images/integrations/access-off-v2.png"
              alt="Settings, Integrations, Additional settings: Program Access Control with a table of two Moodle connections, each showing All programs and a toggle that is off"
              width={2494}
              height={1059}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="Turning it on explains the consequence and goes straight to choosing groups, so the control is never on with nothing selected.">
            <Image
              src="/images/integrations/access-enable-dialog.png"
              alt="Dialog titled Group Access Control Enabled: instructors will only see the groups you select, unselected groups are hidden, and the selection can be updated at any time. Select groups and Cancel buttons"
              width={1102}
              height={534}
              className="mx-auto h-auto w-full max-w-[560px]"
              sizes="560px"
            />
          </Figure>
          <Figure caption="Choosing the groups: search, sort and filter across hundreds of programs, see when each was created and how many courses it holds, and select only the ones instructors should see.">
            <Image
              src="/images/integrations/access-group-dialog.png"
              alt="Group selection dialog for a Moodle connection: a search field, sort and filter controls, a paginated table of groups with checkboxes, created dates and course counts, a count of selected groups, and Select groups and Select all groups buttons"
              width={2506}
              height={1527}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <Figure caption="Saving with nothing changed says what to do next.">
              <Image
                src="/images/integrations/access-group-error.png"
                alt="Inline error under the group table: No changes detected. Add or remove at least one program to update your selection."
                width={1040}
                height={470}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 360px, 100vw"
              />
            </Figure>
            <Figure caption="Turning the control off asks first, and says exactly what will happen: every group becomes visible again.">
              <Image
                src="/images/integrations/access-disable-confirm.png"
                alt="Confirmation dialog: Are you sure you want to disable group access control? If you disable this setting, all groups will be visible within the LMS. Disable and Cancel buttons"
                width={1102}
                height={476}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 360px, 100vw"
              />
            </Figure>
          </div>
          <Figure caption="After: the control is on for one connection only, with a plain-language confirmation naming it, and Select groups to change the selection later.">
            <Image
              src="/images/integrations/access-on-v3.png"
              alt="Group Access Control table: one Moodle connection still on All groups with its toggle off, the other switched on with a Select groups link, and a green confirmation that only selected groups will be available for that connection"
              width={2484}
              height={1185}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">Letting instructors set a grade-sync cutoff</strong></p>
          <p>Sync was continuous, so gradebooks kept changing after evaluation ended, and the LMS did not send due dates. Instead of guessing, instructors can set an optional date when they create a link, labeled &ldquo;Stop grade sync to Gradebook&rdquo; so it cannot be mistaken for the LMS due date. It solves a real need without relying on data the LMS does not provide.</p>
          <Figure caption="Confirm Selection: the course, the grade configuration and the optional grade sync cutoff, reviewed together before anything is linked, with copy that separates the cutoff from the LMS due date.">
            <Image
              src="/images/integrations/confirm-selection.png"
              alt="Confirm Selection screen: the selected IBM course, a Grade Configuration choice between item level and final grade sync, and an optional Stop Grade Sync to Gradebook date and time, marked Ready to confirm"
              width={2506}
              height={1612}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>

          <p><strong className="case-h3">Three smaller decisions</strong></p>
          <ul className="space-y-2">
            <li><strong>Content linking.</strong> Choose the license scope, then the content type. One Specialization is one link, with course order visible but no course picker. Instructors cannot pick single courses inside it, which protects the one-link, one-grade model.</li>
            <li><strong>Progress and certificates.</strong> Status appears next to the linked item, and only for items that were actually deep linked. Instructors can view certificates but not download them.</li>
            <li><strong>Embedded learner view.</strong> Content appears inside the LMS, adapting to hosts that scale responsively and to hosts that only allow fixed-size pop-ups.</li>
          </ul>
          <Figure caption="Course detail in the content picker: instructors browse modules and preview each item, then assign a whole module or a single piece of content without leaving the LMS.">
            <Image
              src="/images/integrations/content-page.png"
              alt="Course page for Introduction to Artificial Intelligence: a module list with an open module and its readings, videos and assessments, a content preview, and Assign module and Assign content buttons"
              width={2506}
              height={2238}
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

        <TextSection title="Which decisions moved which numbers">
          <p>These results belong to the whole team. Here is where I think design made the difference, and how sure I am.</p>
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
          <Figure caption="Shipped: the content home inside the LMS. Recommendations based on the instructor&rsquo;s LMS course come first, then 350+ partners and curated courses, videos and guided projects.">
            <Image
              src="/images/integrations/content-home.png"
              alt="Coursera content home inside an LMS: a welcome message, recommendations based on the instructor's LMS course, partner logos, and curated courses, videos and guided projects"
              width={1400}
              height={868}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </Figure>
          <Figure caption="Shipped: browsing the catalog. Instructors filter by topic, duration, product type, language and level, then view or select any course, certificate, project or video without leaving the LMS.">
            <Image
              src="/images/integrations/content-search.png"
              alt="Coursera catalog search inside an LMS: filters and a grid of courses, certificates, guided projects and videos, each with View and Select actions"
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
        <TextSection title="What we could not design away">
          <p>We could not control the host. Each LMS behaves differently: Canvas decides multi-select per placement at launch, Moodle adds its own confirmation page, and most platforms expose little data. So the design had to work placement by placement.</p>
          <p>The calendar was tight too. Universities would only migrate between semesters, and each move depended on getting enrollment and grade data out of the old middleware.</p>
          <p>Self-serve was not enough on its own. Many customers still needed hands-on help through setup and testing, so clear ownership from the field teams mattered as much as the product. And the component library had nothing for enterprise integration workflows, so we extended it while keeping it consistent and accessible.</p>
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
