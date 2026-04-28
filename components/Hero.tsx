export default function Hero() {
  return (
    <section className="max-w-7xl">
      <h1
        className="
          font-bold
          leading-[1.05] sm:leading-[1.08] md:leading-tight
          text-[clamp(2.25rem,6vw,5.2rem)]
        "
      >
        <span className="text-popover">Systemic</span>
        <span className="text-muted-foreground">.</span>{" "}
        <span className="text-popover">Intentional</span>
        <span className="text-muted-foreground">.</span>
        <br className="hidden sm:block" />
        <span className="text-popover">Rigorous</span>
        <span className="text-muted-foreground">.</span>{" "}
        <span className="text-muted-foreground md:text-foreground">
          Sr. Product Designer
        </span>
        <span className="text-muted-foreground">.</span>
      </h1>
    </section>
  )
}
