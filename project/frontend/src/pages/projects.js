import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./projects.css";

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
// leave it out and the row renders without a link.
const PROJECTS = [
  {
    slug: "start-now-app",
    title: "Start Now Fitness App",
    desc: "StartNow is my first UX case study project that I did in order to learn about UX process, and strategy.",
    img: startNowImg,
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
    tags: ["Shopify Ecom", "Development", "Web Performance"],
  },
  {
    title: "30 Days Challenges",
    desc: "A self-set daily design sprint — thirty interfaces in thirty days to sharpen visual instinct and speed.",
    img: daysChallengeImg,
    date: "2023",
    duration: "30 days",
    platform: "Figma",
    tags: ["Design"],
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
    title: "iAgree AI",
    desc: "AI product interface that turns dense legal agreements into plain-language summaries people actually read.",
    img: iagreeAiImg,
    date: "2025",
    duration: "10 weeks",
    platform: "React",
    tags: ["Design", "Development"],
  },

];

const FILTERS = [
  "All",
  "Design",
  "Development",
  "Shopify Ecom",
  "Web Performance",
  "Search Engine Optimization",
];

const ProjectRow = ({ project }) => (
  <article className="projects-row">
    <div className="projects-row-media">
      <img src={project.img} alt={project.title} />
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

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

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
    </section>
  );
};

export default Projects;
