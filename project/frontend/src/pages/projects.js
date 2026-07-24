import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./projects.css";
// Bubble-tag styles live with the homepage carousel; reuse them here.
import "../actions/components/project-carousel/project-carousel.css";

import startNowImg from "../resources/startnow-intro-img.png";
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

// Static for now — `slug` points at an existing /project/:slug case study,
// leave it out and the card renders as "In progress".
const PROJECTS = [
  {
    slug: "start-now-app",
    title: "Start Now Fitness App",
    desc: "A full UX case study — research, personas, information architecture and a build-ready UI for a habit-driven fitness app.",
    img: startNowImg,
    year: "2024",
    tags: ["Design", "UI/UX"],
  },
  {
    title: "Saint Embers",
    desc: "Shopify storefront built from scratch: custom sections, reusable components and a checkout flow tuned for conversion.",
    img: saintEmberImg,
    year: "2024",
    tags: ["eCommerce", "Shopify", "Web Development"],
  },
  {
    title: "30 Days Challenges",
    desc: "A self-set daily design sprint — thirty interfaces in thirty days to sharpen visual instinct and speed.",
    img: daysChallengeImg,
    year: "2023",
    tags: ["Design", "Creative"],
  },
  {
    title: "Insper U",
    desc: "Learning platform concept focused on course discovery and keeping students on track through their programme.",
    img: insperUImg,
    year: "2023",
    tags: ["Design", "UI/UX"],
  },
  {
    title: "iAgree AI",
    desc: "AI product interface that turns dense legal agreements into plain-language summaries people actually read.",
    img: iagreeAiImg,
    year: "2025",
    tags: ["Design", "Web Development"],
  },
  {
    title: "Merv",
    desc: "Brand and product identity work — visual language, type system and marketing site direction.",
    img: mervImg,
    year: "2025",
    tags: ["Creative", "Design"],
  },
];

const FILTERS = ["All", "Design", "UI/UX", "Web Development", "Shopify", "eCommerce", "Creative"];

const slugifyTag = (tag) => tag.replace(/[/\s]+/g, "-").toLowerCase();

const ProjectCard = ({ project }) => {
  const inner = (
    <>
      <div className="projects-card-media">
        <img src={project.img} alt={project.title} />
        {project.year && <span className="projects-card-year">{project.year}</span>}
      </div>

      <div className="projects-card-body">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <div className="bubble-tag-all-container">
          {project.tags.map((tag) => (
            <div key={tag} className={`bubble-tag-container ${slugifyTag(tag)}`}>
              <div className={`bubble-tag-item ${slugifyTag(tag)}`}>
                <p>{tag}</p>
              </div>
            </div>
          ))}
        </div>

        <span className="projects-card-cta">
          {project.slug ? "View case study" : "In progress"}
          {project.slug && <ArrowRight />}
        </span>
      </div>
    </>
  );

  if (!project.slug) {
    return <article className="projects-card is-locked">{inner}</article>;
  }

  return (
    <Link className="projects-card" to={`/project/${project.slug}`}>
      {inner}
    </Link>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section className="projects-page">
      <div className="site-width-container">
        <div className="projects-page-header">
          <div>
            <p className="projects-page-eyebrow">Projects</p>
            <h1 className="projects-page-title">
              Case studies, storefronts and things I built to find out if they'd work.
            </h1>
            <p className="projects-page-intro">
              A mix of UX research, interface design and front-end builds. Some are finished
              case studies, some are still moving.
            </p>
          </div>

          <span className="projects-page-count">
            {String(visible.length).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="projects-filters">
          {FILTERS.map((item) => (
            <button
              key={item}
              className={`projects-filter ${filter === item ? "is-active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.length === 0 ? (
            <p className="projects-empty">Nothing here yet.</p>
          ) : (
            visible.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
