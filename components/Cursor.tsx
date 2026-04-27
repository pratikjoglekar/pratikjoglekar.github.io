"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY });

    const addHover = () => setHover(true);
    const removeHover = () => setHover(false);

    window.addEventListener("mousemove", move);

    const hoverTargets = document.querySelectorAll("a, button");
    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverTargets.forEach(el => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${hover ? "hover" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}
