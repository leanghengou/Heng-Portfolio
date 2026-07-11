import "./reusable-components.css";

export default function ArchitectureMap({ title, description, images = [] }) {
  return (
    <section className="architecture-map project-section-margin">
      <div className="rich-text-project">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>

      <div className="architecture-map-images">
        {images.map((img, i) => (
          <img key={i} src={img} alt={`${title || "Architecture"} part ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
