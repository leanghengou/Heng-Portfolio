import "./reusable-components.css";

// `mediaWidth` matches the prop on rich-text-images: "narrow" is the 65%
// preset, any CSS width ("85%", "640px") is passed straight through. The
// images stay centred in the frame either way.
export default function ArchitectureMap({
  title,
  description,
  images = [],
  mediaWidth,
}) {
  const customWidth =
    mediaWidth && mediaWidth !== "narrow" ? mediaWidth : undefined;

  return (
    <section className="architecture-map project-section-margin">
      <div className="rich-text-project">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>

      <div
        className={`architecture-map-images${
          mediaWidth === "narrow" ? " architecture-map-narrow" : ""
        }`}
        style={customWidth ? { "--am-media-width": customWidth } : undefined}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt={`${title || "Architecture"} part ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
