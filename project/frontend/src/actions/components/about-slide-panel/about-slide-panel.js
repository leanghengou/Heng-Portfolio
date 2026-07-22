import React, { useEffect } from "react";
import "./about-slide-panel.css";

import portrait from "../../../resources/heng-portrait.png";
import deskCharacter from "../../../resources/heng-character-pc.png";
import figma from "../../../resources/skill-icon/figma.png";
import adobe from "../../../resources/skill-icon/adobe.png";
import react from "../../../resources/skill-icon/react.png";
import shopify from "../../../resources/skill-icon/shopify.png";

const SKILL_ICONS = [figma, adobe, react, shopify];

// Hide an image if its resource can't be loaded, rather than showing a broken icon.
const hideOnError = (e) => {
  e.currentTarget.style.display = "none";
};

const AboutSlidePanel = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock the page (stop Lenis + freeze html/body) while the panel is open
  useEffect(() => {
    if (!open) return;
    const lenis = window.__lenis;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    lenis?.stop();
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  return (
    <div className={`about-panel-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div
        className="about-panel-backdrop"
        onClick={onClose}
        data-lenis-prevent
      />

      <aside
        className="about-panel"
        role="dialog"
        aria-modal="true"
        aria-label="About Heng"
      >
        <button className="about-panel-close" onClick={onClose}>
          Close tab <span aria-hidden="true">✕</span>
        </button>

        <div className="about-panel-scroll" data-lenis-prevent>
          <img
            className="about-panel-portrait"
            src={portrait}
            alt="Heng"
            onError={hideOnError}
          />

          <section className="about-panel-section">
            <h3>About me</h3>
            <p>
              I'm Heng — a designer and front-end developer. I help build
              innovative digital products, from UX research through to UI design
              and prototyping.
            </p>
            <div className="about-panel-icons">
              {SKILL_ICONS.map((src, i) => (
                <img key={i} src={src} alt="" onError={hideOnError} />
              ))}
            </div>
          </section>

          <section className="about-panel-section">
            <h3>Currently activities</h3>
            <p>
              Currently building websites and design systems, and exploring the
              crossover between motion, interaction and front-end engineering.
            </p>
            <img
              className="about-panel-desk"
              src={deskCharacter}
              alt=""
              onError={hideOnError}
            />
          </section>

          <section className="about-panel-section">
            <h3>Hobbies</h3>
            <p>
              I'm an enthusiast of extreme sports, and what I love about them is
              the creative aspect — the fact that each athlete has their own
              identity and style. Over two years ago my passion for technology
              caught up with me. Since then I've been training in web
              development, and my current goal is to create websites that reflect
              creativity, originality and technical skill.
            </p>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default AboutSlidePanel;
