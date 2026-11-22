// Abuse protection for the Sutra chat endpoint (app/api/chat/route.ts).
//
// Layers, cheapest first:
//   1. Same-site only: browsers always send an Origin header on fetch POSTs, so a request
//      without one, or from another site, is refused. This stops casual scripts and other
//      sites embedding the endpoint (a determined attacker can fake headers; layers 2 to 4
//      and the OpenAI spend cap still hold).
//   2. Per-visitor limits: a burst limit per minute and a daily limit, keyed by IP.
//   3. A circuit breaker on total questions per hour, so a flood cannot drain the budget.
//   4. Size limits on the body and the conversation (checked in the route).
//
// Counters live in memory, per server instance. On Vercel that is per warm function, so the
// limits are approximate. For hard, global limits, add a Vercel Firewall rate-limit rule for
// /api/chat, or move these counters to a shared store such as Upstash Redis.

import { site } from "@/lib/projects"

export const LIMITS = {
  perMinute: 8,
  perDay: 60,
  globalPerHour: 400,
  maxBodyBytes: 16_000,
  maxConversationChars: 8_000,
} as const

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const visitors = new Map<string, number[]>() // ip -> request times in the last day
let global: number[] = [] // request times in the last hour

/** The visitor's IP as seen by Vercel's edge (first entry of x-forwarded-for). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}

function allowedHosts(): string[] {
  const hosts = ["localhost", "127.0.0.1"]
  try {
    const h = new URL(site.url).hostname
    hosts.push(h, h.replace(/^www\./, ""))
  } catch {}
  // This deployment's own URLs on Vercel (production and preview)
  for (const v of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]) {
    if (v) hosts.push(v.replace(/^https?:\/\//, "").split("/")[0])
  }
  return hosts
}

/** True when the request comes from this site in a browser. */
export function isSameSite(req: Request): boolean {
  const origin = req.headers.get("origin")
  if (!origin) return false
  let host: string
  try {
    host = new URL(origin).hostname
  } catch {
    return false
  }
  return allowedHosts().includes(host)
}

type Verdict = { ok: true } | { ok: false; retryAfter: number; reason: "minute" | "day" | "busy" }

/** Records the request if it is within limits; otherwise says how long to wait. */
export function checkRate(ip: string, now = Date.now()): Verdict {
  global = global.filter((t) => now - t < HOUR)
  if (global.length >= LIMITS.globalPerHour) {
    return { ok: false, reason: "busy", retryAfter: Math.ceil((HOUR - (now - global[0])) / 1000) }
  }

  const times = (visitors.get(ip) ?? []).filter((t) => now - t < DAY)
  const lastMinute = times.filter((t) => now - t < MINUTE)
  if (lastMinute.length >= LIMITS.perMinute) {
    visitors.set(ip, times)
    return { ok: false, reason: "minute", retryAfter: Math.ceil((MINUTE - (now - lastMinute[0])) / 1000) }
  }
  if (times.length >= LIMITS.perDay) {
    visitors.set(ip, times)
    return { ok: false, reason: "day", retryAfter: Math.ceil((DAY - (now - times[0])) / 1000) }
  }

  times.push(now)
  visitors.set(ip, times)
  global.push(now)

  // keep memory bounded: drop visitors with nothing in the last day
  if (visitors.size > 5_000) {
    for (const [k, v] of visitors) if (!v.some((t) => now - t < DAY)) visitors.delete(k)
  }
  return { ok: true }
}
