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
import decorolalaThumb from "../resources/Decorolala-thumbmail.png";
import hornetThumb from "../resources/Hornet-thubmail.png";

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
// Exported because the nav's mega menu groups these same entries by tag; one
// source of truth so the menu can't drift from the listing.
export const PROJECTS = [
  {
    slug: "decorolala-loyalty-cart-recovery",
    title: "Decorolala Loyalty & Cart Recovery",
    desc: "Custom Shopify loyalty program, dynamic cart-drawer rewards, and a Klaviyo-integrated cart recovery flow.",
    img: decorolalaThumb,
    date: "2026",
    duration: "3 months",
    platform: "Shopify",
    tags: ["Development", "Design", "Ecom"],
  },
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
    slug: "saint-embers",
    title: "Saint Embers",
    desc: "A custom Shopify storefront built from scratch — bespoke sections, reusable components, and a conversion-tuned checkout. Live and in production.",
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
  {
    slug: "hornet-energy",
    title: "Hornet Energy",
    desc: "Designing and building an early e-commerce experience for a growing energy-gel brand — a clean, conversion-focused Shopify storefront.",
    img: hornetThumb,
    date: "2026",
    duration: "Early-stage build",
    platform: "Shopify",
    tags: ["Development", "Design", "Ecom"],
  },
  {
    slug: "30-days-of-daily-posters",
    title: "30 Days of Daily Posters",
    desc: "A 30-day exploration of visual communication — one poster every day, each exploring a different idea, opinion, or observation about society.",
    img: daysChallengeImg,
    date: "2020",
    duration: "30 days",
    platform: "Personal",
    tags: ["Design"],
  },


];

// `value` is matched against project tags; `label` is the button text;
// `slug` is the URL segment, e.g. /projects/development.
// Exported for the nav mega menu — its columns are these same categories.
export const FILTERS = [
  { label: "Design", value: "Design", slug: "design" },
  { label: "Development", value: "Development", slug: "development" },
  { label: "Search Engine Optimization", short: "SEO", value: "SEO", slug: "seo" },
  { label: "Ecommerce", value: "Ecom", slug: "ecommerce" },
];

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();
  const go = () => {
    if (project.href) {
      window.open(project.href, "_blank", "noopener,noreferrer");
    } else if (project.slug) {
      navigate(`/project/${project.slug}`);
    }
  };

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
    // First flip lands sooner (0.7s) so the hover feels responsive, then
    // settles into the normal 2.5s pace for the rest of the cycle.
    timerRef.current = setTimeout(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
      timerRef.current = setInterval(() => {
        setAnimate(true);
        setIndex((i) => i + 1);
      }, 2500);
    }, 700);
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

      {project.href ? (
        <a
          className="projects-row-cta"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Visit site <ArrowRight />
        </a>
      ) : project.slug ? (
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

  const openFilters = () => {
    if (document.body.getAttribute("data-menu-status") === "open") return;
    setFiltersOpen(true);
  };

  useEffect(() => {
    if (!filtersOpen || typeof MutationObserver === "undefined") return undefined;

    const closeWhenMenuOpens = () => {
      if (document.body.getAttribute("data-menu-status") === "open") {
        setFiltersOpen(false);
      }
    };

    closeWhenMenuOpens();

    const observer = new MutationObserver(closeWhenMenuOpens);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-menu-status"],
    });

    return () => observer.disconnect();
  }, [filtersOpen]);

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
              onClick={openFilters}
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
