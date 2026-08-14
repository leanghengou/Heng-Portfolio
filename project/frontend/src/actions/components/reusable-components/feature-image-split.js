import "./reusable-components.css";

const CheckIcon = () => (
  <svg
    className="feature-split-check"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="12" fill="#22c55e" />
    <path
      d="M7 12.4l3.2 3.1L17 8.6"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Title + description + green-check feature list on the left, image on the right.
export default function FeatureImageSplit({
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
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {features.length > 0 && (
          <ul className="feature-split-list">
            {features.map((feature, i) => (
              <li className="feature-split-item" key={i}>
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-image-split-media">
        <img src={image} alt={title || ""} />
      </div>
    </section>
  );
}
