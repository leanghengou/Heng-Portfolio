import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import SectionRenderer from "../actions/components/reusable-components/section-renderer";
import styles from "./pagesCustomcss.css";


export default function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="project-page">
      <div className="project-layout">
        {/* Left: sticky project info */}
        <aside className="project-sidebar">
          <div className="project-sidebar-inner">
            <h1 className="project-sidebar-title">{project.title}</h1>

            {project.category && (
              <span className="project-category-badge">{project.category}</span>
            )}

            <p className="project-sidebar-desc">{project.intro.description}</p>

            <div className="project-sidebar-meta">
              <div className="project-meta-row">
                <span className="project-meta-label">Role :</span>
                <span className="project-meta-value">{project.intro.role}</span>
              </div>

              <div className="project-meta-row">
                <span className="project-meta-label">Duration :</span>
                <span className="project-meta-value">{project.intro.duration}</span>
              </div>

              <div className="project-meta-row">
                <span className="project-meta-label">Tools :</span>
                <span className="project-meta-value">
                  {project.intro.tools.join(", ")}
                </span>
              </div>

              {project.year && (
                <div className="project-meta-row">
                  <span className="project-meta-label">Date :</span>
                  <span className="project-meta-value">{project.year}</span>
                </div>
              )}
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
