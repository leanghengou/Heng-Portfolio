import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./cursor.css";

// Basic custom cursor (Osmo snippet) ported to React. The dot follows the
// pointer with an eased quickTo; it grows over links/buttons/[data-cursor]
// via the CSS body:has(...) rules.
const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return undefined;

    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div className="cursor" ref={cursorRef} aria-hidden="true" />;
};

export default Cursor;
