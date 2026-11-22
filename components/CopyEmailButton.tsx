"use client"

import { useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import { contact } from "@/lib/projects"

/** Small secondary action next to the visible email address. */
export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      // A quiet "done": the wavy underline draws under the address, flows, then retracts.
      const scope = ref.current?.closest("[data-copy-scope]")
      scope?.classList.add("wave-on")
      setTimeout(() => scope?.classList.remove("wave-on"), 1600)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-2 self-start rounded-full border border-button-border bg-eggshell px-4 text-body-sm font-medium text-ink shadow-whisper transition-colors hover:bg-warm-taupe sm:self-auto"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}
