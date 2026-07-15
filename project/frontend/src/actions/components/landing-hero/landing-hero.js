import React, { useEffect, useRef } from "react";
import { gsap, Power2 } from "gsap";
import "./landing-hero.css";

const LandingHero = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated gradient: drift + scale each colour blob on an endless loop
      gsap.to(".landing-blob-1", {
        xPercent: 18,
        yPercent: -14,
        scale: 1.25,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".landing-blob-2", {
        xPercent: -20,
        yPercent: 16,
        scale: 1.3,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".landing-blob-3", {
        xPercent: 14,
        yPercent: 20,
        scale: 1.18,
        duration: 13,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // slow hue rotation over the whole gradient layer
      gsap.to(".landing-hero-bg", {
        filter: "hue-rotate(40deg)",
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // content reveal
      gsap.from(".landing-hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: Power2.easeOut,
        delay: 0.15,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-hero" ref={rootRef}>
      <div className="landing-hero-bg">
        <span className="landing-blob landing-blob-1" />
        <span className="landing-blob landing-blob-2" />
        <span className="landing-blob landing-blob-3" />
      </div>
      <div className="landing-hero-grain" />

      <div className="landing-hero-inner site-width-container">
        <div className="landing-hero-logo landing-hero-reveal" aria-hidden="true">
          <svg viewBox="0 0 44 48" width="44" height="48" fill="none">
            <path
              d="M22 1.5 41.5 12.75v22.5L22 46.5 2.5 35.25v-22.5L22 1.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="22"
              y="30"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="currentColor"
            >
              H
            </text>
          </svg>
        </div>

        <p className="landing-hero-eyebrow landing-hero-reveal">
          REMOTE · WORLDWIDE
        </p>

        <h1 className="landing-hero-name landing-hero-reveal">Heng</h1>

        <p className="landing-hero-role landing-hero-reveal">
          UX/UI Designer &amp; Web Developer
        </p>

        <div className="landing-hero-links landing-hero-reveal">
          <a href="#" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>

        <a className="landing-hero-cv landing-hero-reveal" href="#">
          Download CV
        </a>

        <p className="landing-hero-copy landing-hero-reveal">
          © 2026 Heng
        </p>
      </div>
    </section>
  );
};

export default LandingHero;
