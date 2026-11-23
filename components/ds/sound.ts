"use client"

/**
 * Small interface sounds, synthesised with the Web Audio API (no audio files to load).
 *
 * - click: a short, soft tick for any action (links, buttons).
 * - logo:  follows the monogram's hover animation. The two slabs slide apart (a quiet
 *          rising breath of air), then snap back together (a small wooden clack and a
 *          settle tick), timed to the 0.7s CSS animation in globals.css.
 *
 * Browsers only allow audio after the visitor has interacted with the page, so hover
 * sounds stay silent until the first click, tap or key press. A visitor can turn all
 * sounds off with the header toggle; the choice is remembered in localStorage.
 */

const KEY = "pj-sound"
const EVENT = "pj-sound-change"

let ctx: AudioContext | null = null
let out: GainNode | null = null
let noiseBuf: AudioBuffer | null = null

export function soundOn(): boolean {
  try {
    return localStorage.getItem(KEY) !== "off"
  } catch {
    return true
  }
}

export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off")
  } catch {
    /* private mode: the choice lasts for this page view only */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: on }))
}

export function onSoundChange(fn: (on: boolean) => void) {
  const h = (e: Event) => fn((e as CustomEvent<boolean>).detail)
  window.addEventListener(EVENT, h)
  return () => window.removeEventListener(EVENT, h)
}

/** The audio context, created lazily, and only once the page has had a user gesture. */
function audio(): AudioContext | null {
  if (typeof window === "undefined" || !soundOn()) return null
  const activation = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation
  if (activation && !activation.hasBeenActive) return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    out = ctx.createGain()
    out.gain.value = 0.8
    out.connect(ctx.destination)
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {})
  return ctx
}

function noise(c: AudioContext) {
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate * 0.5, c.sampleRate)
    const d = noiseBuf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  const s = c.createBufferSource()
  s.buffer = noiseBuf
  return s
}

/** A decaying tone. */
function tone(
  c: AudioContext,
  t: number,
  freq: number,
  dur: number,
  gain: number,
  type: OscillatorType = "sine",
  glideTo?: number
) {
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, t)
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.003)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(out!)
  o.start(t)
  o.stop(t + dur + 0.02)
}

/** A burst of filtered noise; the filter can sweep. */
function hiss(
  c: AudioContext,
  t: number,
  dur: number,
  gain: number,
  filter: BiquadFilterType,
  freq: number,
  sweepTo?: number,
  attack = 0.002
) {
  const s = noise(c)
  const f = c.createBiquadFilter()
  const g = c.createGain()
  f.type = filter
  f.Q.value = 1.2
  f.frequency.setValueAtTime(freq, t)
  if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  s.connect(f).connect(g).connect(out!)
  s.start(t)
  s.stop(t + dur + 0.02)
}

export function playClick() {
  const c = audio()
  if (!c) return
  const t = c.currentTime + 0.005
  tone(c, t, 2100, 0.035, 0.05)
  hiss(c, t, 0.014, 0.035, "bandpass", 3800)
}

export function playLogo() {
  const c = audio()
  if (!c) return
  const t = c.currentTime + 0.005
  // apart: a breath of air rising as the slabs slide (0 to ~0.28s)
  hiss(c, t, 0.28, 0.022, "bandpass", 500, 2600, 0.12)
  // together: the clack as they meet, then a small settle from the overshoot
  tone(c, t + 0.33, 1350, 0.06, 0.06, "triangle", 1150)
  tone(c, t + 0.33, 2700, 0.03, 0.025)
  hiss(c, t + 0.33, 0.018, 0.045, "highpass", 2200)
  tone(c, t + 0.42, 1500, 0.03, 0.018, "triangle")
}
