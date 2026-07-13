import "./reusable-components.css";

export default function RichTextImages({ title, subtitle, description, images, align }) {
  const imageList = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <section
      className={`rich-text-images project-section-margin${
        align === "center" ? " rich-text-images-center" : ""
      }`}
    >
      {(title || subtitle || description) && (
        <div className="rich-text-project">
          {title ? <h2>{title}</h2> : null}
          {subtitle ? <h3>{subtitle}</h3> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      {imageList.length > 0 && (
        <div className="rich-text-images-media">
          {imageList.map((img, i) => (
            <img key={i} src={img} alt={title ? `${title} ${i + 1}` : ""} />
          ))}
        </div>
      )}
    </section>
  );
}
