import { Eyebrow } from "@/components/ds/primitives"
import CopyEmailButton from "@/components/CopyEmailButton"
import Lottie from "@/components/ds/Lottie"
import { Reveal } from "@/components/ds/Motion"
import WaveText from "@/components/ds/WaveText"
import { contact } from "@/lib/projects"

const links = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "Mentoring on ADPList", href: contact.mentoring },
]

/** Site-wide footer: a one-line ask, the email address (always visible), plus links. */
export default function SiteFooter() {
  return (
    <footer
      aria-labelledby="contact-title"
      className="border-t border-stone pt-12 pb-[calc(2rem+env(safe-area-inset-bottom))] md:pt-16"
    >
      <Reveal>
        <Eyebrow as="h2" id="contact-title">
          Contact
        </Eyebrow>
        {/* The closing ask: says what Pratik is looking for, so the right people write */}
        <p className="mt-4 max-w-3xl font-headline text-heading font-light text-ink md:text-display">
          Hiring for a Senior+ role? Let&rsquo;s talk.
        </p>
        {/* data-copy-scope: Copy plays the wave under the address once */}
        <div data-copy-scope className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* The envelope art sits ~4px low in its frame; lift it to line up with the text */}
          <Lottie src="/lottie/mail.json" mode="once" className="h-6 w-6 shrink-0 -translate-y-1" />
          <a
            href={`mailto:${contact.email}`}
            className="wave-trigger max-w-full text-body-lg break-all text-ink"
          >
            <WaveText text={contact.email} />
          </a>
          <CopyEmailButton />
        </div>
      </Reveal>

      <div className="mt-10 flex flex-col gap-4 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink decoration-ash underline-offset-4 hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-body-sm text-smoke">© {new Date().getFullYear()} Pratik Joglekar</p>
      </div>
    </footer>
  )
}
