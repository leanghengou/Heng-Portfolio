import React, { useRef, useLayoutEffect } from "react";
import "./builder-hero.css";
import { gsap } from "gsap";
import purpleBg from "../../../resources/purple-bg-img-component.png";
import hengPortrait from "../../../resources/heng-portrait.png";

const stats = [
  { value: "4", label: "Years Building" },
  { value: "100+", label: "Years Building" },
  { value: "09", label: "Years Building" },
];

const BuilderHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      tl.from(".builder-hero-bg", {
        autoAlpha: 0,
        filter: "blur(24px)",
        duration: 1.4,
      })
        .from(
          ".builder-hero-line",
          { yPercent: 120, autoAlpha: 0, filter: "blur(16px)", stagger: 0.12 },
          0.15
        )
        .from(
          ".builder-hero-sub",
          { y: 24, autoAlpha: 0, filter: "blur(10px)" },
          "-=0.45"
        )
        .from(
          ".builder-hero-cta",
          { y: 18, autoAlpha: 0, filter: "blur(8px)", duration: 0.6 },
          "-=0.55"
        )
        .from(
          ".builder-hero-portrait img",
          { x: 60, scale: 1.05, autoAlpha: 0, filter: "blur(18px)", duration: 1.1 },
          0.35
        )
        .from(
          ".builder-hero-stat",
          { y: 20, autoAlpha: 0, filter: "blur(8px)", stagger: 0.1, duration: 0.6 },
          "-=0.7"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="homepage builder-hero" ref={rootRef}>
      <img className="builder-hero-bg" src={purpleBg} alt="" aria-hidden="true" />

      <div className="builder-hero-inner site-width-container">
        <div className="builder-hero-copy">
          <h1 className="builder-hero-title">
            <span className="builder-hero-line">Designer</span>
            <span className="builder-hero-line accent">who build.</span>
          </h1>

          <p className="builder-hero-sub">
            Helping brands scale through high-conversion UX,
            operational clarity, and AI-driven automation.
          </p>

          <a className="btn builder-hero-cta">
            Commander en ligne
          </a>
        </div>

        <div className="builder-hero-portrait">
          <img src={hengPortrait} alt="Heng portrait" />

          <div className="builder-hero-stats">
            {stats.map((stat, index) => (
              <div className="builder-hero-stat" key={index}>
                <span className="builder-hero-stat-value">{stat.value}</span>
                <span className="builder-hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderHero;
