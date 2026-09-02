import React from "react";
import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import SectionRenderer from "../actions/components/reusable-components/section-renderer";
import ProjectRail from "../actions/components/project-doc/project-rail";
import ProjectOverview from "../actions/components/project-doc/project-overview";
import styles from "./pagesCustomcss.css";
// .skill-tag/.skill-tags live with the skills section; imported here so the
// tool chips are styled whether or not that component is on the page.
import "../actions/components/skill-services/skill-services.css";

// Anchor id for a chapter label. Kept in this file because both the contents
// list and the anchors it points at are built here.
const chapterId = label =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  // Contents list: the overview at the top, then one entry per section that
  // declares a `chapter` label. A project with no chapters just gets a meta
  // rail — the list hides itself.
  const chapters = [
    { id: "overview", label: "Overview" },
    ...project.sections
      .filter(section => section.chapter)
      .map(section => ({
        id: chapterId(section.chapter),
        label: section.chapter,
      })),
  ];

  // The rail button points at an external prototype when the project names
  // one, otherwise at the embedded prototype section if the page has one.
  const prototypeSection = project.sections.find(
    section => section.type === "prototype-embed"
  );
  const prototypeHref =
    project.intro?.prototypeUrl ||
    (prototypeSection
      ? `#${
          prototypeSection.chapter
            ? chapterId(prototypeSection.chapter)
            : "prototype"
        }`
      : null);

  return (
    // The per-project modifier is a hook for page-specific overrides. It comes
    // from the matched project, not the raw route param, so it's always one of
    // our own slugs.
    <div className={`project-page project-page--${project.slug}`}>
      <div className="project-doc-shell site-width-container">
        <ProjectRail
          project={project}
          chapters={chapters}
          prototypeHref={prototypeHref}
        />

        {/* Overview and content are separate grid children rather than one
            wrapper: that lets the mobile stack put the headline above the meta
            rail while the desktop grid keeps both in the right-hand column. */}
        <ProjectOverview project={project} />

        <main className="project-content">
          {project.sections.map((section, index) => {
            // Zero-height marker in front of a chapter's first section, so
            // the contents list has something to scroll to and spy on.
            const anchor = section.chapter
              ? chapterId(section.chapter)
              : section === prototypeSection && prototypeHref === "#prototype"
              ? "prototype"
              : null;

            return (
              <React.Fragment key={index}>
                {anchor && (
                  <span
                    className="project-chapter-anchor"
                    id={anchor}
                    aria-hidden="true"
                  />
                )}
                <SectionRenderer section={section} />
              </React.Fragment>
            );
          })}
        </main>
      </div>
    </div>
  );
}
