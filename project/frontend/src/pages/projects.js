import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./projects.css";

import startNowImg from "../resources/startnow-intro-img.png";
import startNowBg from "../resources/start-now-bg.webp";
import snThumb1 from "../resources/sn-thumbmail-1.png";
import snThumb2 from "../resources/sn-thumbmail-2.png";
import snThumb3 from "../resources/sn-thumbmail-3.png";
import saintEmberImg from "../resources/Mask-group-8.webp";
import daysChallengeImg from "../resources/30days-challange-img.webp";
import insperUImg from "../resources/insper-u.png";
import iagreeAiImg from "../resources/iagree-ai.png";
import mervImg from "../resources/merv.png";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckMark = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12l5 5L19 7"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 5h18M6 12h12M10 19h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Static for now — `slug` points at an existing /project/:slug case study,
// leave it out and the row renders without a link.
const PROJECTS = [
  {
    slug: "start-now-app",
    title: "Start Now Fitness App",
    desc: "StartNow is my first UX case study project that I did in order to learn about UX process, and strategy.",
    img: startNowImg,
    // Higher-quality image used for the hover background (falls back to `img`).
    bgImg: startNowBg,
    // Cycled through in the media column while the row is hovered.
    thumbs: [snThumb1, snThumb2, snThumb3],
    date: "2024",
    duration: "8 weeks",
    platform: "Figma",
    tags: ["Design"],
  },
  {
    title: "Saint Embers",
    desc: "Shopify storefront built from scratch: custom sections, reusable components and a checkout flow tuned for conversion.",
    img: saintEmberImg,
    date: "2024",
    duration: "6 weeks",
    platform: "Shopify",
    tags: ["Ecom", "Development"],
  },
  {
    title: "Insper U",
    desc: "Learning platform concept focused on course discovery and keeping students on track through their programme.",
    img: insperUImg,
    date: "2023",
    duration: "5 weeks",
    platform: "Figma",
    tags: ["Design"],
  },


];

// `value` is matched against project tags; `label` is the button text;
// `slug` is the URL segment, e.g. /projects/development.
const FILTERS = [
  { label: "Design", value: "Design", slug: "design" },
  { label: "Development", value: "Development", slug: "development" },
  { label: "Search Engine Optimization", short: "SEO", value: "SEO", slug: "seo" },
  { label: "Ecommerce", value: "Ecom", slug: "ecommerce" },
];

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();
  const go = () => project.slug && navigate(`/project/${project.slug}`);

  // Media column cycles through `thumbs` while hovered; falls back to `img`.
  const slides = project.thumbs?.length ? project.thumbs : [project.img];
  const count = slides.length;

  // One filmstrip track holding all slides + a clone of the first, so the
  // forward auto-loop (…→ last → first) never visibly rewinds.
  const track = count > 1 ? [...slides, slides[0]] : slides;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timerRef = useRef(null);

  const startCarousel = () => {
    if (count < 2) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, 2500);
  };
  const stopCarousel = () => {
    clearInterval(timerRef.current);
    setAnimate(true);
    setIndex(0);
  };

  // When we land on the trailing clone (== first slide), snap back to the real
  // first slide with animation off — invisible since it's the same image.
  const handleTransitionEnd = () => {
    if (index === count) {
      setAnimate(false);
      setIndex(0);
    }
  };

  // Re-enable animation on the frame after a silent snap-back.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  // Clear the interval if the row unmounts mid-hover.
  useEffect(() => () => clearInterval(timerRef.current), []);

  const activeDot = index % count;

  return (
    <article
      className="projects-row"
      style={{
        "--row-img": `url(${project.bgImg || project.img})`,
        cursor: project.slug ? "pointer" : "default",
      }}
      onClick={go}
      onMouseEnter={startCarousel}
      onMouseLeave={stopCarousel}
    >
    <div className="projects-row-media">
      <div
        className="projects-row-track"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animate
            ? "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {track.map((src, i) => (
          <img key={i} src={src} alt={project.title} />
        ))}
      </div>

      {count > 1 && (
        <div className="projects-row-dots" aria-hidden="true">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`projects-row-dot ${i === activeDot ? "is-active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>

    <div className="projects-row-body">
      <p className="projects-row-meta">
        {project.date} <span className="projects-row-meta-sep">/</span> {project.duration}{" "}
        <span className="projects-row-meta-sep">/</span> {project.platform}
      </p>

      <h2 className="projects-row-title">{project.title}</h2>

      <p className="projects-row-desc">{project.desc}</p>

      {project.slug ? (
        <Link className="projects-row-cta" to={`/project/${project.slug}`}>
          View project <ArrowRight />
        </Link>
      ) : (
        <span className="projects-row-cta is-disabled">In progress</span>
      )}
    </div>
    </article>
  );
};

const Projects = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // The active filter is derived from the URL slug (unknown slug → show all).
  const activeFilter = FILTERS.find(
    (f) => f.slug === (category || "").toLowerCase()
  );
  const active = activeFilter ? activeFilter.value : "";

  // Selecting a box swaps the URL; clicking the active box clears it.
  // Also closes the mobile filter sheet after a choice is made.
  const toggle = (slug) => {
    navigate(activeFilter?.slug === slug ? "/projects" : `/projects/${slug}`);
    setFiltersOpen(false);
  };

  // Nothing selected → show everything; otherwise match the selected tag.
  const visible =
    active === "" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  const filterList = (
    <div className="projects-filters">
      {FILTERS.map(({ label, value, slug }) => {
        const checked = active === value;
        return (
          <button
            key={value}
            type="button"
            className={`projects-filter ${checked ? "is-active" : ""}`}
            onClick={() => toggle(slug)}
            aria-pressed={checked}
          >
            <span className="projects-filter-box" aria-hidden="true">
              {checked && <CheckMark />}
            </span>
            <span className="projects-filter-label">{label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="projects-page">
      <div className="projects-layout">
        {/* Left: sticky intro + filters */}
        <aside className="projects-sidebar">
          <div className="projects-sidebar-inner">
            <p className="projects-eyebrow">Project</p>
            <h1 className="projects-heading">Projects</h1>
            <p className="projects-sidebar-desc">
              A mix of UX research, interface design and front-end builds. Some are finished
              case studies, some are still moving.
            </p>

            {/* Mobile: opens the filter sheet. Hidden on desktop. */}
            <button
              type="button"
              className="projects-filter-toggle"
              onClick={() => setFiltersOpen(true)}
            >
              <FilterIcon />
              {activeFilter
                ? `Categories: ${activeFilter.short || activeFilter.label}`
                : "Categories"}
            </button>

            {/* Desktop: inline checkbox list. Hidden on mobile. */}
            {filterList}
          </div>
        </aside>

        {/* Right: project rows */}
        <div className="projects-list">
          {visible.length === 0 ? (
            <p className="projects-empty">Nothing here yet.</p>
          ) : (
            visible.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))
          )}
        </div>
      </div>

      {/* Mobile filter popup (right-side drawer) */}
      <div
        className={`projects-filter-sheet ${filtersOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!filtersOpen}
      >
        <div
          className="projects-filter-sheet-backdrop"
          onClick={() => setFiltersOpen(false)}
        />
        <div className="projects-filter-sheet-panel">
          <div className="projects-filter-sheet-head">
            <span>Categories</span>
            <button
              type="button"
              className="projects-filter-sheet-close"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
            >
              ×
            </button>
          </div>
          {filterList}
        </div>
      </div>
    </section>
  );
};

export default Projects;
