import React, { useEffect, useState } from "react";
import "./project-hero.css";

// The homepage hero (hero-carousel) without the carousel: one static slide per
// project. Two image layers, same as the homepage: the cover runs full-bleed
// and blurred behind everything, and a sharp copy of it sits inside the
// width-constrained box. `intro.heroImage` swaps just the sharp one — point it
// at any imported asset to show something other than the cover in the box.
// `intro.heroTitle` (array of strings) breaks the headline over several masked
// lines the way the homepage does; without it the title is a single line.
const ProjectHero = ({ project }) => {
  // Mount first, then flip the class on the next frame so the reveal
  // transitions actually run instead of being the element's initial state.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const boxImage = project.intro?.heroImage || project.cover;
  const titleLines = project.intro?.heroTitle?.length
    ? project.intro.heroTitle
    : [project.title];

  return (
    <section className="project-hero">
      {/* Full-bleed backdrop. Must stay BEFORE the container in the DOM: both
          are positioned with z-index auto, so paint order follows source order
          and the copy lands on top without any z-index. */}
      {project.cover && (
        <div className="project-hero-media" aria-hidden="true">
          <img src={project.cover} alt="" />
        </div>
      )}

      <div className="project-hero-container site-width-container">
        {/* Sharp image inside the box. Sits before .project-hero-inner in the
            DOM so paint order alone keeps the copy on top of it. */}
        {boxImage && (
          <div className="project-hero-box-media" aria-hidden="true">
            <img src={boxImage} alt="" />
          </div>
        )}

        <div className={`project-hero-inner ${revealed ? "is-active" : ""}`}>
          <h1 className="project-hero-title">
            {titleLines.map((line, i) => (
              <span className="project-hero-line" key={i}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          {project.intro?.description && (
            <p className="project-hero-desc">{project.intro.description}</p>
          )}

          {project.intro?.tools?.length > 0 && (
            <div className="project-hero-tools skill-tags">
              {project.intro.tools.map((tool, i) => (
                <span className="skill-tag" key={`${tool}-${i}`}>
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
