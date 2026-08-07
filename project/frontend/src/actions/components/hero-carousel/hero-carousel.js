import React, { useCallback, useEffect, useRef, useState } from "react";
import "./hero-carousel.css";
import welcomeVideo from "../../../resources/hf_20260802_020247_76a3d74b-f02f-411e-b904-c6fa4ab19ae7.mp4.mp4";
import purpleBg from "../../../resources/purple-bg-img-component-100-opacity.png";

// One entry per slide. `tag` renders in the white pill, `title` is the big
// headline (array = one line per element), `stats` fills the metric row.
const SLIDES = [
  {
    tag: "ECOMERCE SITE",
    nav: "Welcome",
    image: purpleBg,
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
    title: ["I BUILD", "PRODUCTION", "GRADE SYSTEMS."],
    stats: [
      { value: "React", label: "Front of the stack." },
      { value: "Node", label: "APIs and services." },
      { value: "∞", label: "Ideas left to build." },
    ],
  },
];

const SLIDE_DURATION = 6000; // ms each slide stays before auto-advancing

const HeroCarousel = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0 -> 1 for the active tab

  // Single source of truth: one rAF loop drives BOTH the progress bar fill and
  // the auto-advance. Refs keep the loop stable across renders / zoom / throttle.
  const activeRef = useRef(0);
  const startRef = useRef(0); // 0 = "restamp me on the next frame"
  const rafRef = useRef(null);

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

  return (
    <section className="hero-carousel site-width-container" aria-roledescription="carousel">
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
    </section>
  );
};

export default HeroCarousel;
