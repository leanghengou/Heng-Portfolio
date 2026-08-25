import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import SectionRenderer from "../actions/components/reusable-components/section-renderer";
import styles from "./pagesCustomcss.css";
// .skill-tag/.skill-tags live with the skills section; imported here so the
// chips are styled whether or not that component is on the page.
import "../actions/components/skill-services/skill-services.css";


export default function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    // The per-project modifier is a hook for page-specific overrides. It comes
    // from the matched project, not the raw route param, so it's always one of
    // our own slugs.
    <div
      className={`project-page site-width-container project-page--${project.slug}`}
    >
      <div className="project-layout">
        {/* Left: sticky project info */}
        <aside className="project-sidebar">
          <div className="project-sidebar-inner">
            <h1 className="project-sidebar-title">{project.title}</h1>

            <p className="project-sidebar-desc">{project.intro.description}</p>

            <div className="project-sidebar-meta">
              <div className="project-meta-row">
                <span className="project-meta-label">Role</span>
                <span className="project-meta-value">{project.intro.role}</span>
              </div>

              {project.year && (
                <div className="project-meta-row">
                  <span className="project-meta-label">Date</span>
                  <span className="project-meta-value">{project.year}</span>
                </div>
              )}

              <div className="project-meta-row">
                <span className="project-meta-label">Tools</span>
                {/* One chip per tool, in the same tag style the skills
                    section uses, rather than a comma-joined sentence. */}
                <div className="skill-tags">
                  {project.intro.tools.map((tool, i) => (
                    <span className="skill-tag" key={`${tool}-${i}`}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: scrollable content */}
        <main className="project-content project-content-framed">
          {project.cover && (
            <img
              className="project-content-cover"
              src={project.cover}
              alt={project.title}
            />
          )}

          {project.sections.map((section, index) => (
            <SectionRenderer key={index} section={section} />
          ))}
        </main>
      </div>
    </div>
  );
}
