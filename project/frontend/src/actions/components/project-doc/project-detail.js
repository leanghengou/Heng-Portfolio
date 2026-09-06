import React, { useCallback, useEffect, useRef } from "react";
import "./project-detail.css";

// How far the band leans at the very edge, in degrees. Small on purpose: the
// band is wide and short, so anything past a couple of degrees reads as the
// layout breaking rather than as the card catching the light.
const MAX_TILT = 2.2;

// A project's `duration` is written either as a span of time ("8 weeks",
// "Under 10 days") or as the dates it actually ran ("May – July 2026"), so the
// label under Timeline follows the value rather than calling a date range a
// duration. A month name or a four-digit year is what separates the two.
const DATE_LIKE =
  /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|\b\d{4}\b/i;

// Banner at the head of a project page: the cover image running behind the
// project's own metadata — name, role, timeline, duration and tools. Name and
// role stack in one column, timeline and duration in the next. These used to sit
// in the rail; they moved out here so the contents list can ride up to the top
// of the rail, where it's reachable without scrolling past the meta.
// The background is `intro.heroImage` when the project names one, otherwise
// its cover; a project with neither still renders, just on flat colour.
export default function ProjectDetail({ project }) {
  // The stage carries the perspective and reads the pointer; the plane inside
  // it is what actually rotates. Splitting them keeps the tilt off the element
  // the shell's grid places.
  const stageRef = useRef(null);
  const frameRef = useRef(0);

  const background = project.intro?.heroImage || project.cover;
  const duration = project.intro?.duration;
  const durationLabel = DATE_LIKE.test(duration || "") ? "Date" : "Duration";
  const tools = project.intro?.tools || [];

  // Pointer position arrives far faster than the screen repaints, so the write
  // is deferred to the next frame and only the newest one survives.
  const handlePointerMove = useCallback((event) => {
    const stage = stageRef.current;
    if (!stage || stage.dataset.tiltEnabled !== "true") return;

    const rect = stage.getBoundingClientRect();
    // -0.5 at one edge, +0.5 at the other, 0 dead centre.
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      // Y drives rotateX inverted: pointer above centre should lift the far
      // edge away, not towards you.
      stage.style.setProperty("--tilt-x", `${-y * MAX_TILT * 2}deg`);
      stage.style.setProperty("--tilt-y", `${x * MAX_TILT * 2}deg`);
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    cancelAnimationFrame(frameRef.current);
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
    stage.dataset.tilting = "false";
  }, []);

  const handlePointerEnter = useCallback(() => {
    const stage = stageRef.current;
    // Flags the plane to track the pointer closely; on the way out the longer
    // transition takes over and the band settles back flat.
    if (stage) stage.dataset.tilting = "true";
  }, []);

  // A tilt that follows a pointer has nothing to follow on touch, and it's
  // motion the user may have asked not to see — in either case the handlers
  // stay bound but do nothing, so the band renders exactly as it did before.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const sync = () => {
      stage.dataset.tiltEnabled = String(query.matches);
      if (!query.matches) handlePointerLeave();
    };

    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      cancelAnimationFrame(frameRef.current);
    };
  }, [handlePointerLeave]);

  // Nothing to say — no point in an empty band above the case study.
  if (
    !project.title &&
    !project.intro?.role &&
    !project.year &&
    !duration &&
    !tools.length
  )
    return null;

  return (
    <section
      className="project-detail"
      aria-label="Project details"
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="project-detail-plane">
        {background && (
          // Image plus its own scrim, both behind the fields. They sit before
          // the field list in the DOM and everything here is z-index auto, so
          // paint order alone keeps the copy on top.
          <div className="project-detail-media" aria-hidden="true">
            <img src={background} alt="" />
            <span className="project-detail-scrim" />
          </div>
        )}

        <div className="project-detail-fields">
          {(project.title || project.intro?.role) && (
            <div className="project-detail-group">
              {project.title && (
                <div className="project-detail-field">
                  <span className="project-detail-label">Project</span>
                  <span className="project-detail-value">{project.title}</span>
                </div>
              )}

              {project.intro?.role && (
                <div className="project-detail-field">
                  <span className="project-detail-label">Role</span>
                  <span className="project-detail-value">
                    {project.intro.role}
                  </span>
                </div>
              )}
            </div>
          )}

          {(project.year || duration) && (
            <div className="project-detail-group">
              {project.year && (
                <div className="project-detail-field">
                  <span className="project-detail-label">Timeline</span>
                  <span className="project-detail-value">{project.year}</span>
                </div>
              )}

              {duration && (
                <div className="project-detail-field">
                  <span className="project-detail-label">{durationLabel}</span>
                  <span className="project-detail-value">{duration}</span>
                </div>
              )}
            </div>
          )}

          {tools.length > 0 && (
            <div className="project-detail-field project-detail-field--tools">
              <span className="project-detail-label">Tools</span>
              <div className="project-detail-tools">
                {tools.map((tool, i) => (
                  <span className="project-detail-tool" key={`${tool}-${i}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
