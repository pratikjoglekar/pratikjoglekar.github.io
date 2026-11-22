import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom type scale from globals.css, otherwise it
// treats `text-body` and `text-smoke` as two conflicting colors and drops one.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "mono",
            "body-sm",
            "body",
            "subheading",
            "body-lg",
            "title",
            "heading-sm",
            "heading",
            "display",
            "hero",
          ],
        },
      ],
      shadow: [{ shadow: ["whisper", "hairline"] }],
      rounded: [{ rounded: ["input", "small", "card", "card-lg"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
