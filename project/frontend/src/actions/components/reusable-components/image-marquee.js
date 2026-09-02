import "./reusable-components.css";

/* Full-bleed strip of images that drifts sideways on its own, running off both
   screen edges. Images keep their own aspect ratio at a shared height, so a
   wide banner and a tall phone shot sit happily in the same row.
   The row is rendered twice — the track scrolls exactly one copy's width, so
   the loop restarts with no visible seam. The second copy is decorative. */
export default function ImageMarquee({
  title,
  description,
  images = [],
  // Seconds for one full pass of the row. Longer list -> raise it to keep the
  // same apparent speed.
  speed = 40,
  reverse = false,
}) {
  const imageList = Array.isArray(images) ? images : images ? [images] : [];
  const label = (i) => (title ? `${title} ${i + 1}` : "");

  if (imageList.length === 0) return null;

  return (
    <section className="image-marquee-section project-section-margin">
      {(title || description) && (
        <div className="rich-text-project">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      <div
        className="image-marquee-viewport"
        style={{ "--image-marquee-duration": `${speed}s` }}
      >
        <div
          className={`image-marquee-track${
            reverse ? " image-marquee-track--reverse" : ""
          }`}
        >
          {[0, 1].map((copy) => (
            <div
              className="image-marquee-row"
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {imageList.map((img, i) => (
                <img
                  className="image-marquee-item"
                  key={i}
                  src={img}
                  alt={copy === 0 ? label(i) : ""}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
