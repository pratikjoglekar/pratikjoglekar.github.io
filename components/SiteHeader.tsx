import Link from "next/link"
import Monogram from "@/components/ds/Monogram"
import HeaderNav from "@/components/HeaderNav"

export default function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 md:h-20 md:px-16">
      <Link
        href="/"
        aria-label="Pratik Joglekar, home"
        className="group -ml-1.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink"
      >
        <Monogram part className="h-7 w-7 md:h-8 md:w-8" />
      </Link>

      {/* The two ways to act (LinkedIn, Email) are always in reach, on every screen size */}
      <HeaderNav />
    </header>
  )
}
