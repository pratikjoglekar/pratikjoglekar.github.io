import { caseOgAlt, caseOgImage } from "@/lib/caseOgImage"

export const alt = caseOgAlt("cancellation")
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return caseOgImage("cancellation")
}
