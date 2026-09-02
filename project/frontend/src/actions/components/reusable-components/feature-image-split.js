import "./reusable-components.css";

// Eyebrow ("01 / Label", same mark as the homepage sections) + title + description + numbered feature list on the left, image on
// the right. The list is an <ol> — the printed 01/02/03 are decoration on top
// of the ordering the markup already carries, so they stay out of the a11y tree.
export default function FeatureImageSplit({
  tagline,
  title,
  description,
  features = [],
  image,
  imagePosition = "right",
}) {
  return (
    <section
      className={`text-image-split feature-split project-section-margin${
        imagePosition === "left" ? " text-image-split-reverse" : ""
      }`}
    >
      <div className="text-image-split-text">
        {tagline && <p className="feature-split-eyebrow">{tagline}</p>}
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {features.length > 0 && (
          <ol className="feature-split-list">
            {features.map((feature, i) => (
              <li className="feature-split-item" key={i}>
                <span className="feature-split-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="feature-split-label">{feature}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="text-image-split-media">
        <img src={image} alt={title || ""} />
      </div>
    </section>
  );
}
