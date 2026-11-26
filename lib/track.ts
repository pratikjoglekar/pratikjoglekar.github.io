import { track as vercelTrack } from "@vercel/analytics"

/*
 * Custom analytics events (Vercel Web Analytics), so we can see what visitors actually
 * use: videos, Sutra, screenshot zoom, how far case studies are read, email copies.
 * Event names are fixed strings; properties carry no personal data.
 */
export type TrackEvent =
  | "Video play"
  | "Sutra question"
  | "Screenshot zoom"
  | "Case study read"
  | "Email copy"
  | "Email click"

export function track(event: TrackEvent, props?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(event, props)
  } catch {
    /* analytics must never break the page */
  }
}
