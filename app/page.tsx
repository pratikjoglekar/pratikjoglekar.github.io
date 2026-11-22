import SiteHeader from "@/components/SiteHeader"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import About from "@/components/About"
import SiteFooter from "@/components/SiteFooter"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-page px-6 outline-none md:px-16">
        <Hero />
        <Projects />
        <About />
        <SiteFooter />
      </main>
    </>
  )
}
