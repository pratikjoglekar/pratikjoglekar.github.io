"use client"

import { useRef } from "react"
import { X } from "lucide-react"
import PlayBlob from "@/components/ds/PlayBlob"

/** "Watch the intro" link that opens the video in a native dialog. The video only loads when opened. */
export default function IntroVideo() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  function open() {
    dialogRef.current?.showModal()
    videoRef.current?.play().catch(() => {})
  }

  function close() {
    videoRef.current?.pause()
    dialogRef.current?.close()
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group inline-flex items-center gap-3 text-body-sm font-medium text-ink"
      >
        {/* On hover the ink circle melts into the hero's blob */}
        <PlayBlob className="h-11 w-11" />
        Watch a 30-second intro
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => videoRef.current?.pause()}
        onClick={(e) => {
          if (e.target === dialogRef.current) close()
        }}
        aria-label="Video introduction"
        className="m-auto w-[min(92vw,960px)] overflow-visible bg-transparent p-0 backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative overflow-hidden rounded-card-lg bg-ink">
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            controls
            poster="/videos/intro-poster-v2.jpg"
            playsInline
            preload="none"
            className="aspect-video h-auto w-full"
          />
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close video"
          className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-eggshell text-ink shadow-whisper"
        >
          <X className="h-5 w-5" />
        </button>
      </dialog>
    </>
  )
}
