import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CollectionPills,
  CollectionSwitcher,
  FILTERS,
  ProjectRow,
  byCategory,
} from "./projects";
import "./projects.css";

// One category of the listing on its own page — /projects/design and friends.
// The rows, header and page chrome are shared with the index; only the copy
// and the set of projects change.
const ProjectsCategory = () => {
  const { category } = useParams();

  const filter = FILTERS.find(
    (f) => f.slug === (category || "").toLowerCase()
  );

  // An unknown slug renders a dead end rather than redirecting: a redirect at
  // mount changes the location before the page-transition overlay is ready to
  // cover it, and the wipe gets stuck half-drawn.
  if (!filter) {
    return (
      <section className="projects-page">
        <header className="projects-header site-width-container">
          <div className="projects-header-lead">
            <p className="projects-eyebrow">
              <Link className="projects-eyebrow-link" to="/projects">
                Projects
              </Link>
              <span className="projects-eyebrow-sep">/</span>
              Not found
            </p>
            <h1 className="projects-heading">Not found</h1>
          </div>

          <p className="projects-intro">
            That category doesn&rsquo;t exist.{" "}
            <Link className="projects-intro-link" to="/projects">
              Back to all projects
            </Link>
            .
          </p>
        </header>
      </section>
    );
  }

  const visible = byCategory(filter.value);

  return (
    <section className="projects-page">
      <header className="projects-collection-header site-width-container">
        {/* Title and blurb centred over the switcher, kept small so the first
            project row still carries the page. The strip below already says
            which collection this is, so there is no breadcrumb — only the
            quiet way back up to the index. */}
        <div className="projects-collection-lead">
          <Link className="projects-collection-back" to="/projects">
            All projects
          </Link>

          <h1 className="projects-collection-title">
            {filter.short || filter.label}
          </h1>
          <p className="projects-collection-blurb">{filter.blurb}</p>

          {/* Phone only. Sits inside the lead because at that width it reads as
              part of the title block, not as a band under it. */}
          <CollectionPills active={filter.slug} />
        </div>

        <CollectionSwitcher active={filter.slug} />
      </header>

      <div className="projects-list site-width-container">
        {visible.length === 0 ? (
          <p className="projects-empty">Nothing here yet.</p>
        ) : (
          visible.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectsCategory;
