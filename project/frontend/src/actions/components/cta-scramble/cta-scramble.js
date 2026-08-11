import { useEffect } from "react";

// Every element matching these gets the scramble-on-hover effect. `[data-scramble]`
// lets you opt any extra element in without touching this file.
const CTA_SELECTOR =
  ".btn, .projects-row-cta, .text-image-split-cta, .landing-hero-cv, [data-scramble]";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#@%&";
const DURATION = 420; // ms — within the requested 300–500ms

// The visible label is usually one text node next to an icon/arrow; grab the
// text node with the most letters so we scramble the label, not stray glyphs.
function findLabelNode(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  let best = null;
  let bestLen = 0;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const len = node.nodeValue.replace(/\s/g, "").length;
    if (len > bestLen) {
      bestLen = len;
      best = node;
    }
  }
  return bestLen >= 1 ? best : null;
}

// Elements currently mid-animation, so a jittery pointer doesn't restart them.
const busy = new WeakSet();

function scramble(cta) {
  if (busy.has(cta)) return;
  if (cta.matches(".is-disabled, [disabled], [aria-disabled='true']")) return;

  const node = findLabelNode(cta);
  if (!node) return;

  const finalText = node.nodeValue;
  const len = finalText.length;
  busy.add(cta);

  // keep the accessible name stable while the glyphs flicker
  const hadAria = cta.hasAttribute("aria-label");
  if (!hadAria) cta.setAttribute("aria-label", finalText.trim());

  const start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / DURATION);
    const revealed = p * len; // decode left→right
    let out = "";
    for (let i = 0; i < len; i++) {
      const ch = finalText[i];
      if (ch === " " || ch === " " || ch === "\n") {
        out += ch;
      } else if (i < revealed) {
        out += ch;
      } else {
        out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
    }
    node.nodeValue = out;

    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      node.nodeValue = finalText; // settle back to the real text
      if (!hadAria) cta.removeAttribute("aria-label");
      busy.delete(cta);
    }
  };
  requestAnimationFrame(step);
}

// Renders nothing — just wires a single delegated hover listener for the whole app.
const CtaScramble = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const onOver = (e) => {
      const cta = e.target.closest?.(CTA_SELECTOR);
      if (!cta) return;
      // Only fire when the pointer enters the CTA from outside it (mouseover
      // bubbles from children, so ignore moves within the same button).
      const from =
        e.relatedTarget && e.relatedTarget.closest
          ? e.relatedTarget.closest(CTA_SELECTOR)
          : null;
      if (from === cta) return;
      scramble(cta);
    };

    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  return null;
};

export default CtaScramble;
