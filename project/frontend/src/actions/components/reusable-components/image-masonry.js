import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./reusable-components.css";

// How much of the masonry stays visible before the reader opens it. Passed down
// to the CSS as a custom property so the clamp has a single source of truth.
const CLAMP_HEIGHT = 760;

// Process/exploration gallery. Desktop lays the images out as a balanced
// two-column masonry so each one keeps its natural height; under 786px the same
// images become a swipeable carousel (same grid/swiper swap the survey cards use).
// These are full-page exploration shots, so at natural height the grid runs
// several screens long — it starts clamped behind a toggle and only opens when
// the reader asks for it.
export default function ImageMasonry({ title, description, images = [] }) {
  const imageList = Array.isArray(images) ? images : images ? [images] : [];
  const label = (i) => (title ? `${title} ${i + 1}` : "");

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [clampable, setClampable] = useState(false);

  // The grid is measured at its natural height — the clamp lives on the wrapper
  // above it — so the answer holds whether or not the reader has expanded it.
  // The result only ever latches on: at mount the images usually have no height
  // yet, and the same grid measures 0 once the mobile breakpoint hides it, and
  // neither of those should take the toggle away again.
  const measure = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    setClampable((was) => was || el.scrollHeight > CLAMP_HEIGHT + 80);
  }, []);

  // Each image re-measures as it lands (below); this covers the rest — the
  // first paint, cached images that never fire load, and column reflows.
  useEffect(() => {
    measure();

    window.addEventListener("resize", measure);
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (resizeObserver && gridRef.current) resizeObserver.observe(gridRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
    };
  }, [measure, imageList.length]);

  const clamped = clampable && !expanded;

  const toggle = () => {
    // Collapsing from the bottom of an opened grid would drop the reader
    // somewhere further down the case study, so bring the section back first.
    if (expanded) sectionRef.current?.scrollIntoView({ block: "start" });
    setExpanded((open) => !open);
  };

  return (
    <section className="image-masonry-section project-section-margin" ref={sectionRef}>
      {(title || description) && (
        <div className="rich-text-project">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      {imageList.length > 0 && (
        <>
          <div
            className={`image-masonry-collapse${clamped ? " is-clamped" : ""}`}
            style={{ "--image-masonry-clamp": `${CLAMP_HEIGHT}px` }}
          >
            <div className="image-masonry-grid" ref={gridRef}>
              {imageList.map((img, i) => (
                <img
                  className="image-masonry-item"
                  key={i}
                  src={img}
                  alt={label(i)}
                  onLoad={measure}
                />
              ))}
            </div>
          </div>

          {clampable && (
            <button type="button" className="image-masonry-toggle" onClick={toggle}>
              {expanded ? "Show less" : `Show all ${imageList.length} images`}
            </button>
          )}

          <div className="image-masonry-swiper">
            <Swiper spaceBetween={16} slidesPerView={1.08}>
              {imageList.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={label(i)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
}
