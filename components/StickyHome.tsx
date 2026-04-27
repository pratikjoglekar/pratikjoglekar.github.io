"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyHome() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50
        h-16
        transition-transform duration-300 ease-out
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div
        className="
          h-full bgColor px-4 flex items-center
          border-b
        "
        style={{
          borderColor: "oklch(0.6133 0 0 / 5%)",
        }}
      >
        <div className="max-w-[720px] mx-auto w-full">
          <Link
            href="/"
            className="text-base text-muted-foreground hover:underline hover:underline-offset-4 hover:opacity-80 transition-opacity"
          >
            <strong>← Home</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}