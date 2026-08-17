import React, { useCallback, useEffect, useRef, useState } from "react";
import "./hero-carousel.css";
import welcomeVideo from "../../../resources/hf_20260802_020247_76a3d74b-f02f-411e-b904-c6fa4ab19ae7.mp4.mp4";
// Used in two slots now (slide 1's section backdrop and slide 4's box), so the
// name describes the asset rather than a placement.
import heroLoopVideo from "../../../resources/hf_20260817_023358_60d3a79c-a679-4851-949e-973ccb9a00be.mp4";
import heroSectionBg from "../../../resources/gradient-background-effect-initial.png";
import pixelBgGradient from "../../../resources/pixel-bg-gradient.png";

// One entry per slide. `tag` renders in the white pill, `title` is the big
// headline (array = one line per element), `stats` fills the metric row.
// `image` / `video` = background inside the carousel box.
// `sectionImage` / `sectionVideo` = full-bleed background painted on
// .hero-carousel-section, i.e. behind and around the width-constrained
// carousel. Import the file at the top and point the field at it, e.g.
// `sectionImage: myBackdrop`. If both are set `sectionVideo` wins, so the
// image stays as a one-line revert.
const SLIDES = [
  {
    tag: "ECOMERCE SITE",
    nav: "Welcome",
    beams: true,
    horizon: true,
    sectionVideo: heroLoopVideo,
    sectionImage: heroSectionBg,
    title: ["I'M HENG,", "A DESIGNER &", "A BUILDER."],
    stats: [
      { value: "4 YEARS", label: "Nine years of making software." },
      { value: "200+", label: "Nine years of making software." },
      { value: "4 YEARS", label: "Nine years of making software." },
    ],
  },
  {
    tag: "SELECTED WORK",
    nav: "Design Projects",
    video: welcomeVideo,
    sectionImage: null,
    title: ["CRAFTED", "INTERFACES,", "SHIPPED FAST."],
    stats: [
      { value: "30+", label: "Products designed end to end." },
      { value: "12", label: "Design systems built." },
      { value: "98%", label: "Client retention rate." },
    ],
  },
  {
    tag: "PERSONAL BLOG",
    nav: "Personal Blogs",
    image: pixelBgGradient,
    sectionImage: null,
    title: ["NOTES ON", "DESIGN, CODE", "& THE ROAD."],
    stats: [
      { value: "60+", label: "Essays and case studies." },
      { value: "5 MIN", label: "Average honest read." },
      { value: "WEEKLY", label: "New writing published." },
    ],
  },
  {
    tag: "ENGINEERING",
    nav: "Development",
    video: heroLoopVideo,
    sectionImage: null,
    title: ["I BUILD", "PRODUCTION", "GRADE SYSTEMS."],
    stats: [
      { value: "React", label: "Front of the stack." },
      { value: "Node", label: "APIs and services." },
      { value: "∞", label: "Ideas left to build." },
    ],
  },
];

const SLIDE_DURATION = 800000000000000000; // ms each slide stays before auto-advancing

const HeroCarousel = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0 -> 1 for the active tab

  // Single source of truth: one rAF loop drives BOTH the progress bar fill and
  // the auto-advance. Refs keep the loop stable across renders / zoom / throttle.
  const activeRef = useRef(0);
  const startRef = useRef(0); // 0 = "restamp me on the next frame"
  const rafRef = useRef(null);
  const carouselRef = useRef(null);

  const goTo = useCallback((index) => {
    const next = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
    activeRef.current = next;
    startRef.current = 0; // force the loop to re-stamp its start time
    setActive(next);
    setProgress(0);
  }, []);

  useEffect(() => {
    const tick = (now) => {
      // (Re)stamp the start whenever the clock was reset (navigation).
      if (!startRef.current) startRef.current = now;

      const ratio = Math.min((now - startRef.current) / SLIDE_DURATION, 1);
      setProgress(ratio);

      if (ratio >= 1) {
        // advance to the next slide and reset the clock
        const next = (activeRef.current + 1) % SLIDES.length;
        activeRef.current = next;
        startRef.current = now;
        setActive(next);
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleTiltMove = useCallback((event) => {
    const carousel = carouselRef.current;
    if (!carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = carousel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 7;

    carousel.style.setProperty("--hero-carousel-tilt-x", `${(-y * maxTilt).toFixed(2)}deg`);
    carousel.style.setProperty("--hero-carousel-tilt-y", `${(x * maxTilt).toFixed(2)}deg`);
    carousel.style.setProperty("--hero-carousel-tilt-scale", "1.015");
  }, []);

  const resetTilt = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.style.setProperty("--hero-carousel-tilt-x", "0deg");
    carousel.style.setProperty("--hero-carousel-tilt-y", "0deg");
    carousel.style.setProperty("--hero-carousel-tilt-scale", "1");
  }, []);

  return (
    <section className="hero-carousel-section" aria-roledescription="carousel">
    {/* Full-bleed section backdrop for the active slide. Must stay BEFORE the
        container in the DOM: both are positioned with z-index auto, so paint
        order follows source order and the carousel lands on top without any
        z-index (which would trap .hero-carousel under the fixed nav). */}
    {(SLIDES[active].sectionVideo || SLIDES[active].sectionImage) && (
      <div className="hero-carousel-section-media" aria-hidden="true">
        {SLIDES[active].sectionVideo ? (
          <video
            key={active}
            src={SLIDES[active].sectionVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img key={active} src={SLIDES[active].sectionImage} alt="" />
        )}
      </div>
    )}
    <div className="hero-carousel-container site-width-container">
    <div
      ref={carouselRef}
      className="hero-carousel"
      onPointerMove={handleTiltMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      {/* Light-beam streaks — the base (untouched) */}
      {SLIDES[active].beams && (
        <div
          className="hero-carousel-media hero-carousel-media--plain hero-carousel-media--beams"
          aria-hidden="true"
        >
          <span className="hero-beam hero-beam--1" />
          <span className="hero-beam hero-beam--2" />
          <span className="hero-beam hero-beam--3" />
          <span className="hero-beam hero-beam--4" />
        </div>
      )}

      {/* Glowing globe/arc — transparent overlay ON TOP of the beams */}
      {SLIDES[active].horizon && (
        <div
          className="hero-carousel-media hero-carousel-media--plain hero-horizon"
          aria-hidden="true"
        >
          <div className="hero-horizon-bg">
            <div className="hero-horizon-radial" />
            <div className="hero-horizon-ellipse" />
            <div className="hero-horizon-base" />
          </div>
        </div>
      )}

      {/* Full-section background media for the active slide (behind nav too) */}
      {(SLIDES[active].video || SLIDES[active].image) && (
        <div
          className={`hero-carousel-media ${
            SLIDES[active].image ? "hero-carousel-media--plain" : ""
          }`}
          aria-hidden="true"
        >
          {SLIDES[active].video ? (
            <video
              key={active}
              src={SLIDES[active].video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img key={active} src={SLIDES[active].image} alt="" />
          )}
        </div>
      )}

      {/* Sliding track — all slides sit side by side, we translate the row */}
      <div
        className="hero-carousel-track"
        style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
      >
        {SLIDES.map((slide, i) => (
          <div
            className={`hero-carousel-slide ${i === active ? "is-active" : ""}`}
            key={i}
            aria-hidden={i !== active}
          >
            <div className="hero-carousel-inner site-width-container">
              <span className="hero-carousel-tag">{slide.tag}</span>

              <h1 className="hero-carousel-title">
                {slide.title.map((line, li) => (
                  <span className="hero-carousel-line" key={li}>
                    <span>{line}</span>
                  </span>
                ))}
              </h1>

              <div className="hero-carousel-stats">
                {slide.stats.map((stat, si) => (
                  <div className="hero-carousel-stat" key={si}>
                    <p className="hero-carousel-stat-value">{stat.value}</p>
                    <p className="hero-carousel-stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav — each tab carries its own loading progress bar */}
      <nav className="hero-carousel-nav site-width-container" aria-label="Slides">
        {SLIDES.map((slide, i) => {
          // completed tabs read as full, the active one tracks live progress,
          // upcoming ones stay empty
          let fill = 0;
          if (i < active) fill = 1;
          else if (i === active) fill = progress;

          return (
            <button
              type="button"
              key={i}
              className={`hero-carousel-navitem ${i === active ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-current={i === active}
            >
              <span className="hero-carousel-progress">
                <span
                  className="hero-carousel-progress-fill"
                  style={{ transform: `scaleX(${fill})` }}
                />
              </span>
              <span className="hero-carousel-navlabel">{slide.nav}</span>
            </button>
          );
        })}
      </nav>
    </div>
    </div>
    </section>
  );
};

export default HeroCarousel;
