import React, { useEffect, useState } from "react";
import "./project-doc.css";

// Sticky meta rail for the documentation-style project layout: the project's
// role / timeline / tools, a contents list that tracks the section you're
// reading, and an optional prototype button.
// `chapters` is built by the page (one entry per section carrying a `chapter`
// label); with none the rail is meta only.
export default function ProjectRail({ project, chapters = [], prototypeHref }) {
  const [activeId, setActiveId] = useState(chapters[0]?.id || "");

  // Scroll spy. Reads the anchors' live positions on every frame the page
  // scrolls rather than using IntersectionObserver: sections here are taller
  // than the viewport, so "which anchor did we last cross" is the answer we
  // want, and an observer only reports the ones currently intersecting.
  useEffect(() => {
    if (!chapters.length) return undefined;

    const update = () => {
      // The reading line sits a third down the viewport, so a heading counts
      // as current once it's comfortably on screen rather than at the very top.
      const line = window.innerHeight * 0.32;
      let current = chapters[0].id;

      chapters.forEach(chapter => {
        const el = document.getElementById(chapter.id);
        if (el && el.getBoundingClientRect().top <= line) current = chapter.id;
      });

      setActiveId(current);
    };

    // Run straight off the event rather than through requestAnimationFrame: a
    // frame requested while the tab is hidden is never delivered, which would
    // leave the list stuck on whatever was current when the tab went away.
    // Reading a handful of rects with no writes in between is cheap, and React
    // bails out of the render when the id hasn't changed.
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [chapters]);

  // Lenis owns the scroll position sitewide, so hand the jump to it when it's
  // mounted — a native scrollTo would be fought by its animation loop.
  const jumpTo = id => event => {
    const el = document.getElementById(id);
    if (!el) return;

    event.preventDefault();
    // Light the clicked item up straight away rather than waiting for the
    // scroll to arrive under the reading line.
    setActiveId(id);

    const navHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--pill-nav-height"
        ),
        10
      ) || 76;
    const offset = -(navHeight + 32);

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset });
    } else {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + offset,
        behavior: "smooth",
      });
    }
  };

  const timeline = [project.intro?.duration, project.year]
    .filter(Boolean)
    .join(" · ");

  // Same source the parked overview block used for its cover, so a project
  // that names its own hero image still gets that one in the rail.
  const thumb = project.intro?.heroImage || project.cover;

  return (
    <aside className="project-rail">
      <div className="project-rail-inner">
        {thumb && (
          <figure className="project-rail-thumb">
            <img src={thumb} alt={project.title} loading="lazy" />
          </figure>
        )}

        <p className="project-rail-name">{project.title}</p>

        {/* Plain-language "what this is" line. `intro.summary` is the short
            rail copy; `intro.description` is the longer hero paragraph. */}
        {project.intro?.summary && (
          <p className="project-rail-summary">{project.intro.summary}</p>
        )}

        {project.intro?.role && (
          <div className="project-rail-field">
            <span className="project-rail-label">Role</span>
            <span className="project-rail-value">{project.intro.role}</span>
          </div>
        )}

        {timeline && (
          <div className="project-rail-field">
            <span className="project-rail-label">Timeline</span>
            <span className="project-rail-value">{timeline}</span>
          </div>
        )}

        {project.intro?.tools?.length > 0 && (
          <div className="project-rail-field project-rail-field--tools">
            <span className="project-rail-label">Tools</span>
            <div className="project-rail-tools">
              {project.intro.tools.map((tool, i) => (
                <span className="project-rail-tool" key={`${tool}-${i}`}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {chapters.length > 0 && (
          <nav className="project-rail-toc" aria-label="Case study contents">
            <span className="project-rail-label">On this page</span>
            <ul>
              {chapters.map(chapter => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className={`project-toc-link ${
                      activeId === chapter.id ? "is-active" : ""
                    }`}
                    aria-current={activeId === chapter.id ? "true" : undefined}
                    onClick={jumpTo(chapter.id)}
                  >
                    <span className="project-toc-dash" aria-hidden="true" />
                    <span className="project-toc-text">{chapter.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {prototypeHref &&
          (prototypeHref.startsWith("#") ? (
            <a
              className="project-rail-cta"
              href={prototypeHref}
              onClick={jumpTo(prototypeHref.slice(1))}
            >
              View prototype
            </a>
          ) : (
            <a
              className="project-rail-cta"
              href={prototypeHref}
              target="_blank"
              rel="noreferrer"
            >
              View prototype
            </a>
          ))}
      </div>
    </aside>
  );
}
