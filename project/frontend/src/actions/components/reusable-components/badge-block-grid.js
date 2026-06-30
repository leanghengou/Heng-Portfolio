import "./reusable-components.css";

export default function BadgeBlockGrid({ blocks = [] }) {
  return (
    <section className="badge-block-section margin-top-50">
      <div className="badge-block-grid">
        {blocks.map((block, key) => (
          <div
            className={`badge-block-item${block.full ? " badge-block-full" : ""}`}
            key={key}
          >
            <span
              className="badge-block-badge"
              style={{ backgroundColor: block.color }}
            >
              {block.title}
            </span>
            <ul className="badge-block-list">
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
