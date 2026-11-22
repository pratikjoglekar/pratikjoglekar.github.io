import Image from "next/image"
import IntroVideo from "@/components/IntroVideo"
import { Eyebrow } from "@/components/ds/primitives"
import { Reveal, Stagger, StaggerItem } from "@/components/ds/Motion"

/**
 * Pratik's portrait, 4:5. Set PHOTO to a file in /public (e.g. "/images/portrait.jpg")
 * to show it under the About label; while it is null, nothing is shown.
 */
const PHOTO: string | null = null

function Portrait() {
  if (!PHOTO) return null
  return (
    <div className="relative mt-6 aspect-[4/5] w-40 overflow-hidden rounded-card bg-warm-taupe sm:w-48 md:w-full md:max-w-[240px]">
      <Image src={PHOTO} alt="Pratik Joglekar" fill sizes="(min-width: 768px) 240px, 192px" className="object-cover" />
    </div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-8 grid grid-cols-1 gap-10 pb-20 md:grid-cols-12 md:gap-8 md:py-28"
    >
      <Reveal className="md:col-span-3">
        <Eyebrow as="h2" id="about-title">
          About
        </Eyebrow>
        <Portrait />
      </Reveal>

      <Stagger className="flex flex-col gap-10 md:col-span-9 lg:col-span-7">
        <StaggerItem className="space-y-5 text-body-lg text-graphite">
          <p>
            I am fascinated by what happens between a problem and a decision:
            the assumptions, invisible systems, and small moments that shape
            how people act. For over 8 years, I have explored them through
            product design across enterprise SaaS, EdTech, and financial
            services.
          </p>
          <p>
            I design for more than what people see: what they understand, what
            they believe, and what they can do next. Whether it is a complex
            enterprise workflow or an emerging AI experience, I want technology
            to feel thoughtful and deeply human.
          </p>
        </StaggerItem>

        <StaggerItem className="flex flex-wrap gap-x-8 gap-y-4">
          <IntroVideo />
        </StaggerItem>

        <StaggerItem className="space-y-2 border-t border-stone pt-6 text-body-sm text-smoke">
          <p>
            Editor at UXPA Magazine · Writer and reviewer for Smashing Magazine ·
            Writing on State of Design and Medium · Speaker at UX Scotland (2024),
            UXPA NH (2024), State of Design (2025) and UX India (2026) · Guest
            lecturer at MIT ADT University · Jury at Thomas Jefferson University
            and Protothon · Mentor to 100+ designers on ADPList
          </p>
          <p>MS in User Experience and Interaction Design, Thomas Jefferson University (2019)</p>
        </StaggerItem>
      </Stagger>
    </section>
  )
}
