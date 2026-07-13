import "./reusable-components.css";

export default function MultiBubbleText({ title, content = [] }) {
  return (
    <section className="startnow-multi-buble-text project-section-margin">
      {title && <h2 className="project-section-title">{title}</h2>}

      <div className="process-grid">
        {content.map((item, key) => {
          const step = typeof item === "string" ? { title: item } : item;

          return (
            <div className="process-item" key={key}>
              <span className="process-phase">Step {key + 1}</span>

              <div className="process-body">
                <h3 className="process-title">{step.title}</h3>
                {step.description && (
                  <p className="process-desc">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
