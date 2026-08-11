import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";
import "./page-transition.css";

// --- tuning (from the Osmo snippet) -------------------------------------
const PIXEL_COLS = 12; // how many columns the wipe is divided into
const PIXEL_FADE = 0.2; // per-pixel fade duration
const PIXEL_OVERLAP = 0.3; // how much pixels within a column overlap
const WIPE_DURATION = 0.2; // time for the wipe to sweep across all columns

function makeEl(tag, className, attr) {
  const el = document.createElement(tag);
  el.className = className;
  el.setAttribute(attr, "");
  return el;
}

// Rebuild the pixel grid to fill the current viewport. Columns run along the
// long axis; each column is packed with square pixels along the cross axis.
function buildGrid(panel, isPortrait) {
  const rect = panel.getBoundingClientRect();
  panel.style.flexDirection = isPortrait ? "column" : "row";

  const lineSize = (isPortrait ? rect.height : rect.width) / PIXEL_COLS;
  const crossAmount = Math.max(
    1,
    Math.ceil((isPortrait ? rect.width : rect.height) / lineSize)
  );

  const colFrag = document.createDocumentFragment();
  for (let i = 0; i < PIXEL_COLS; i++) {
    const line = makeEl("div", "transition__col", "data-transition-col");
    line.style.flexDirection = isPortrait ? "row" : "column";
    line.style.flex = "1 1 auto";
    line.style.justifyContent = "center";
    for (let j = 0; j < crossAmount; j++) {
      line.appendChild(
        makeEl("div", "transition__pixel", "data-transition-pixel")
      );
    }
    colFrag.appendChild(line);
  }
  panel.replaceChildren(colFrag);
  return [...panel.querySelectorAll("[data-transition-col]")];
}

// Animate every column's pixels toward `to` opacity, column by column with a
// random per-pixel stagger — the shimmering pixel-wipe.
function animate(tlRef, lines, to) {
  return new Promise((resolve) => {
    tlRef.current?.kill();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline({ onComplete: resolve });
    tlRef.current = tl;

    const allPixels = lines.flatMap((l) => [
      ...l.querySelectorAll("[data-transition-pixel]"),
    ]);
    if (!allPixels.length) {
      resolve();
      return;
    }
    if (reduce) {
      tl.set(allPixels, { opacity: to });
      return;
    }

    const stepDur = WIPE_DURATION / Math.max(1, lines.length);
    const spread = PIXEL_FADE * (1 - PIXEL_OVERLAP);
    lines.forEach((line, i) => {
      const pixels = [...line.querySelectorAll("[data-transition-pixel]")];
      if (!pixels.length) return;
      tl.to(
        pixels,
        {
          opacity: to,
          duration: PIXEL_FADE,
          ease: "none",
          stagger: { amount: spread, from: "random" },
        },
        i * stepDur
      );
    });
  });
}

const PageTransition = forwardRef((props, ref) => {
  const wrapRef = useRef(null);
  const panelRef = useRef(null);
  const tlRef = useRef(null);

  // Build the panel imperatively so React never reconciles the pixel grid
  // (the route swap re-renders the app mid-transition; if React owned these
  // nodes it would corrupt the grid).
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const panel = makeEl("div", "transition__panel", "data-transition-panel");
    const col = makeEl("div", "transition__col", "data-transition-col");
    col.appendChild(makeEl("div", "transition__pixel", "data-transition-pixel"));
    panel.appendChild(col);
    wrap.appendChild(panel);
    panelRef.current = panel;
    return () => {
      tlRef.current?.kill();
      panel.remove();
      panelRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    // Sweep the pixel grid on to fully cover the screen.
    cover() {
      const panel = panelRef.current;
      if (!panel) return Promise.resolve();
      const isPortrait = window.innerHeight > window.innerWidth;
      const lines = buildGrid(panel, isPortrait);
      gsap.set(panel, { opacity: 1 });
      gsap.set(panel.querySelectorAll("[data-transition-pixel]"), {
        opacity: 0,
      });
      return animate(tlRef, lines, 1);
    },
    // Sweep the pixel grid back off to reveal the (already-swapped) page.
    uncover() {
      const panel = panelRef.current;
      if (!panel) return Promise.resolve();
      const lines = [...panel.querySelectorAll("[data-transition-col]")];
      return animate(tlRef, lines, 0).then(() =>
        gsap.set(panel, { opacity: 0 })
      );
    },
  }));

  return (
    <div
      data-transition-wrap
      className="transition"
      ref={wrapRef}
      aria-hidden="true"
    />
  );
});

export default PageTransition;
