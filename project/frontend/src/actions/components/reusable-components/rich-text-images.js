import "./reusable-components.css";

export default function RichTextImages({ title, subtitle, description, images }) {
  const imageList = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <section className="rich-text-images project-section-margin">
      <div className="rich-text-project">
        <h2>{title}</h2>
        {subtitle ? <h3>{subtitle}</h3> : null}
        {description ? <p>{description}</p> : null}
      </div>

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
