import "./reusable-components.css";

export default function TextImageSplit({
  tagline,
  title,
  text,
  image,
  cta,
  textPosition = "left",
  // "narrow" holds the image to a smaller column and gives the space to the
  // text. Opt-in so existing sections keep the wide default.
  mediaWidth,
}) {
  return (
    <section
      className={`text-image-split project-section-margin${
        textPosition === "right" ? " text-image-split-reverse" : ""
      }${mediaWidth === "narrow" ? " text-image-split-narrow" : ""}`}
    >
      <div className="text-image-split-text">
        {tagline && <span className="text-image-split-tagline">{tagline}</span>}
        {title && <h2>{title}</h2>}
        {text && <p>{text}</p>}
        {cta && cta.label && (
          <a
            className="text-image-split-cta"
            href={cta.href || "#"}
            target={cta.href && cta.href.startsWith("http") ? "_blank" : undefined}
            rel={cta.href && cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {cta.label}
          </a>
        )}
      </div>
      <div className="text-image-split-media">
        <img src={image} alt={title || ""} />
      </div>
    </section>
  );
}
