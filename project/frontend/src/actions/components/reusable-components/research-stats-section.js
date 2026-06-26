import "./reusable-components.css";

export default function ResearchStatsSection({ stats = [] }) {
  return (
    <section className="research-stats-section project-section-margin">
      <div className="research-stats-list">
        {stats.map((stat, key) => (
          <div className="research-stat-item" key={key}>
            <div className="research-stat-icon-wrap" aria-hidden={!stat.icon}>
              {stat.icon ? (
                <img
                  className="research-stat-icon"
                  src={stat.icon}
                  alt={stat.iconAlt || ""}
                />
              ) : null}
            </div>
            <p className="research-stat-copy">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
