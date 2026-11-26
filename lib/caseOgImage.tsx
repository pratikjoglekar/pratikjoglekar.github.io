import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { MONOGRAM_PATHS, MONOGRAM_VIEWBOX } from "@/components/ds/Monogram"
import { projects } from "@/lib/projects"

/*
 * Link-preview card for a case study (Slack, email, LinkedIn): the title, company and
 * headline result on the left, the case study's design board on the right. Each
 * app/work/<slug>/opengraph-image.tsx calls this with its slug.
 */
export const OG_SIZE = { width: 1200, height: 630 }

const BOARD: Record<string, string> = {
  c4cintegrations: "images/integrations/board-light.jpg",
  "pricing-calculator": "images/pricing-calculator/board-light.jpg",
  "usage-intelligence": "images/uip/board-light.jpg",
  cancellation: "images/retention/board-light.jpg",
  dashboard: "images/dashboard/board-light.jpg",
}

export function caseOgAlt(slug: string) {
  const p = projects.find((x) => x.slug === slug)!
  return `${p.title}, a case study by Pratik Joglekar`
}

export async function caseOgImage(slug: string) {
  const p = projects.find((x) => x.slug === slug)!
  const board = await readFile(join(process.cwd(), "public", BOARD[slug]))
  const src = `data:image/jpeg;base64,${board.toString("base64")}`

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fdfcfc", color: "#000000", fontFamily: "sans-serif" }}>
        <div style={{ width: 520, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 48px 64px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="44" height="44" viewBox={MONOGRAM_VIEWBOX}>
              {MONOGRAM_PATHS.map((d) => (
                <path key={d} d={d} fill="#000000" />
              ))}
            </svg>
            <div style={{ fontSize: 20, color: "#777169", letterSpacing: 2 }}>PRATIK JOGLEKAR</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 22, color: "#777169" }}>{`${p.company} · ${p.years}`}</div>
            <div style={{ fontSize: 50, fontWeight: 300, lineHeight: 1.08, letterSpacing: -1.5 }}>{p.title}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>{p.metric}</div>
            <div style={{ fontSize: 22, color: "#44403b" }}>{p.metricLabel}</div>
          </div>
        </div>
        {/* the board is 16:9; show its left two thirds, where the main screen sits */}
        <div style={{ width: 680, height: 630, display: "flex", overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={src} alt="" width={1120} height={630} style={{ position: "absolute", left: -90, top: 0, width: 1120, height: 630 }} />
        </div>
      </div>
    ),
    OG_SIZE
  )
}
