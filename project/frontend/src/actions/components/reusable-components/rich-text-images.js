import "./reusable-components.css";

// `mediaWidth` holds the images to a smaller, left-aligned column — for marks
// and diagrams that read fine below the full content width. "narrow" is the
// preset (65%); any CSS width ("85%", "640px") is passed straight through.
// `mediaAlign: "center"` centres those reduced images in the frame without
// touching the copy above them, which `align: "center"` would also centre.
export default function RichTextImages({
  title,
  subtitle,
  description,
  images,
  align,
  mediaWidth,
  mediaAlign,
}) {
  const imageList = Array.isArray(images) ? images : images ? [images] : [];
  const customWidth =
    mediaWidth && mediaWidth !== "narrow" ? mediaWidth : undefined;

  return (
    <section
      className={`rich-text-images project-section-margin${
        align === "center" ? " rich-text-images-center" : ""
      }${mediaWidth === "narrow" ? " rich-text-images-narrow" : ""}${
        mediaAlign === "center" ? " rich-text-images-media-center" : ""
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
        <div
          className="rich-text-images-media"
          style={customWidth ? { "--rti-media-width": customWidth } : undefined}
        >
          {imageList.map((img, i) => (
            <img key={i} src={img} alt={title ? `${title} ${i + 1}` : ""} />
          ))}
        </div>
      )}
    </section>
  );
}
