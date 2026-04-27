import Hero from "@/components/Hero"
import VideoPlaceholder from "@/components/VideoPlaceholder"
import ChatPlaceholder from "@/components/ChatPlaceholder"
import Projects from "@/components/Projects"
import Actions from "@/components/Actions"
import Extras from "@/components/Extras"

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col px-4 sm:px-6 md:px-16 py-4 overflow-auto md:overflow-hidden md:h-screen">
      {/* Header */}
      <div className="text-center text-sm text-muted-foreground font-jalliya">
        Pratik Joglekar
      </div>

      {/* Hero */}
      <div className="mt-4">
        <Hero />
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 mt-6 md:flex-1 md:min-h-0">
        {/* Video + Chat */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:flex-[3] md:min-h-0">
          <VideoPlaceholder />
          <ChatPlaceholder />
        </section>

        {/* Projects + Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:flex-[1] md:min-h-0">
          <Projects />
          <Actions />
        </section>
      </div>

      {/* Footer */}
      <Extras />
    </main>
  )
}
