import "./reusable-components.css";

export default function PrototypeEmbed({ title, description, src }) {
  if (!src) return null;

  return (
    <section className="prototype-embed project-section-margin">
      {(title || description) && (
        <div className="rich-text-project">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      <div className="prototype-embed-frame">
        <iframe
          src={src}
          title={title || "Prototype"}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
