import "./reusable-components.css";
import { ICONS } from "./icon-feature-grid";

/* Big-number stat cards with a chamfered bottom-left corner: icon badge, the
   figure with an optional small suffix, its label, and a right-aligned note
   that sits clear of the cut corner.
   Each stat: { icon, value, suffix, label, note }.

   `variant: "index-row"` swaps the boxes for a bare row: a counter, the figure
   over a hairline, then the label. That layout carries no icon and no note, so
   both are dropped rather than rendered somewhere they don't belong. */
export default function StatCards({
  title,
  description,
  columns = 3,
  stats = [],
  variant,
}) {
  const isIndexRow = variant === "index-row";

  return (
    <section
      className={`stat-cards-section${isIndexRow ? " stat-cards-row" : ""}`}
    >
      {(title || description) && (
        <div className="rich-text-project stat-cards-intro">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      <div
        className="stat-cards-grid"
        style={{ "--stat-cards-columns": columns }}
      >
        {stats.map((stat, i) => (
          <div className={isIndexRow ? "stat-row-item" : "stat-card"} key={i}>
            {isIndexRow ? (
              <span className="stat-row-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : ICONS[stat.icon] ? (
              <span className="stat-card-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[stat.icon]}
                </svg>
              </span>
            ) : null}

            <p className="stat-card-value">
              {stat.value}
              {stat.suffix ? <span>{stat.suffix}</span> : null}
            </p>

            <h3 className="stat-card-label">{stat.label}</h3>

            {!isIndexRow && stat.note ? (
              <p className="stat-card-note">{stat.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
