import { Play } from "lucide-react"
import Lottie from "@/components/ds/Lottie"
import { cn } from "@/lib/utils"

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]"
// Hovering the nearest .group, or keyboard focus on it or inside it
const ON = "group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-has-[:focus-visible]:scale-100 group-has-[:focus-visible]:opacity-100"
const OFF = "group-hover:scale-75 group-hover:opacity-0 group-focus-visible:scale-75 group-focus-visible:opacity-0 group-has-[:focus-visible]:scale-75 group-has-[:focus-visible]:opacity-0"

/**
 * The ink play circle used on video buttons. When its `.group` is hovered or focused,
 * the ink melts away and the hero's blob grows in behind the icon: the same sphere
 * animation at the same speed, flowing saffron to cobalt. Size it with `className`
 * (e.g. "h-11 w-11"); `iconClassName` sizes the play icon.
 */
export default function PlayBlob({ className, iconClassName = "h-4 w-4" }: { className?: string; iconClassName?: string }) {
  return (
    <span aria-hidden className={cn("relative flex shrink-0 items-center justify-center text-eggshell", className)}>
      <span className={cn("absolute -inset-[18%] scale-50 opacity-0 transition-[opacity,scale] duration-700", EASE, ON)}>
        <Lottie src="/lottie/sphere.json" mode="loop" rest={0.25} speed={0.5} className="h-full w-full blur-[2px]" />
      </span>
      <span className={cn("absolute inset-0 rounded-full bg-ink transition-[opacity,scale] duration-500", EASE, OFF)} />
      <Play className={cn("relative ml-0.5", iconClassName)} />
    </span>
  )
}
