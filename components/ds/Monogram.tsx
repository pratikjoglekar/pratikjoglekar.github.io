import { cn } from "@/lib/utils"

/* Two slanted slabs joined by a mirrored S-curve. Traced from the supplied artwork
   (1085×1449 source, kept in source units); the viewBox is a square around it. */
export const MONOGRAM_PATHS = [
  "M182 535C182 522 190 513 201 508L527 361C541 355 561 362 561 380V580C561 637.4 516.2 684 461 684C403.6 684 357 730.6 357 788V997C357 1005 353 1012 346 1016L207 1087C195 1093 182 1086 182 1073Z",
  "M659 479C659 471 664 464 671 461L875 362C888 356 902 363 902 377V915C902 928 895 939 884 944L540 1093C520 1101 491 1094 491 1072V911C491 901 499 893 509 893H547C608.9 893 659 844.6 659 785Z",
]
export const MONOGRAM_VIEWBOX = "162 348 760 760"

/**
 * Pratik's monogram. Decorative by default; colour comes from `currentColor`.
 * `part`: the two slabs part along their slant and click back together once when the
 * nearest `.group` ancestor is hovered or focused (`.mono-part` in globals.css).
 */
export default function Monogram({ className, title, part = false }: { className?: string; title?: string; part?: boolean }) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      fill="currentColor"
      className={cn("shrink-0 overflow-visible", part && "mono-part", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {MONOGRAM_PATHS.map((d, i) => (
        <path key={d} d={d} className={part ? (i === 0 ? "mono-a" : "mono-b") : undefined} />
      ))}
    </svg>
  )
}
