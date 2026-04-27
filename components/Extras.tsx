export default function Extras() {
  return (
    <footer
      className="
        mt-auto
        w-full
        pb-4
        [padding-bottom:calc(1rem+env(safe-area-inset-bottom))]
      "
    >
      {/* SAME container pattern as the page */}
      <div className="mx-auto max-w-7xl px-2 md:px-16">
        <p
          className="
            flex flex-wrap items-center
            justify-start md:justify-center
            gap-x-2 gap-y-1
            text-left md:text-center
            text-[11px] sm:text-xs md:text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          <span className="whitespace-nowrap">Editor at UXPA Magazine</span>
          <Separator />

          <span className="whitespace-nowrap">
            Reviewer and Writer for Smashing Magazine
          </span>
          <Separator />

          <span className="whitespace-nowrap">Editor for UXPA Magazine</span>
          <Separator />

          <span className="break-words">
            Spoke at UX Scotland, State of Design 2025, Protothon
          </span>
          <Separator />

          <span className="break-words">
            Jury member at Thomas Jefferson University, and Protothon
          </span>
        </p>
      </div>
    </footer>
  )
}

function Separator() {
  return (
    <span className="opacity-60 select-none mx-0.5" aria-hidden>
      •
    </span>
  )
}
