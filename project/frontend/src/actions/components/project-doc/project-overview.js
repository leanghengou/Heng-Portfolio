import React, { useEffect, useState } from "react";
import "./project-doc.css";

// Top block of the documentation-style project layout: masked headline and
// standfirst on the left, the cover image on the right, and an optional row of
// takeaway cards underneath (`intro.highlights`: { label, title, description }).
// `intro.heroTitle` breaks the headline over several lines, same as the
// full-bleed hero does; `intro.heroImage` swaps the cover for something else.
export default function ProjectOverview({ project }) {
  const [revealed, setRevealed] = useState(false);

  // Mount first, flip on the next frame, so the reveal transitions run instead
  // of being the element's initial state.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const titleLines = project.intro?.heroTitle?.length
    ? project.intro.heroTitle
    : [project.title];
  const cover = project.intro?.heroImage || project.cover;
  const highlights = project.intro?.highlights || [];

  return (
    <header
      className={`project-overview ${revealed ? "is-active" : ""}`}
      id="overview"
    >
      <div className="project-overview-top">
        <div className="project-overview-copy">
          <h1 className="project-overview-title">
            {titleLines.map((line, i) => (
              <span className="project-overview-line" key={i}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          {project.intro?.description && (
            <p className="project-overview-desc">{project.intro.description}</p>
          )}
        </div>

        {cover && (
          // Two layers, same trick as the full-bleed hero: covers are
          // landscape and the card is portrait, so a blurred copy fills the
          // card and the sharp one is contained inside it — nothing of the
          // artwork gets cropped away.
          <figure className="project-overview-cover">
            <img className="project-overview-cover-bg" src={cover} alt="" aria-hidden="true" />
            <img className="project-overview-cover-img" src={cover} alt={project.title} />
          </figure>
        )}
      </div>

      {highlights.length > 0 && (
        <ul className="project-overview-highlights">
          {highlights.map((item, i) => (
            <li className="project-highlight-card" key={i}>
              {item.label && (
                <span className="project-highlight-label">{item.label}</span>
              )}
              <h2 className="project-highlight-title">{item.title}</h2>
              {item.description && (
                <p className="project-highlight-desc">{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
