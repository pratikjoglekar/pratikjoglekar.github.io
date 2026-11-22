import { ImageResponse } from "next/og"
import { MONOGRAM_PATHS, MONOGRAM_VIEWBOX } from "@/components/ds/Monogram"

export const alt = "Pratik Joglekar · Senior Product Designer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Link-preview card for the home page, in the site's eggshell-and-ink style.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fdfcfc",
          color: "#000000",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="72" height="72" viewBox={MONOGRAM_VIEWBOX}>
            {MONOGRAM_PATHS.map((d) => (
              <path key={d} d={d} fill="#000000" />
            ))}
          </svg>
          <div style={{ fontSize: 28, color: "#777169", letterSpacing: 2 }}>PRATIK JOGLEKAR</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 300, lineHeight: 1.05, letterSpacing: -2 }}>
          I design complex products that feel simple.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#44403b" }}>
          Senior Product Designer · Coursera · previously HubSpot and MassMutual
        </div>
      </div>
    ),
    size
  )
}
