// Pass either a single { href, cta } pair, or a `ctas` array for multiple
// buttons — e.g. [{ label: "Visit gallery" }, { label: "Behance", href: "…" }].
// A cta entry with no href renders as a disabled placeholder (link coming soon).
export default function ExternalCtaSection({ title, description, href, cta = "Visit site", ctas }) {
  const items = ctas || (href ? [{ label: cta, href }] : []);

  return (
    <section className="rich-text-container external-cta-section">
      <div className="rich-text-project">
        {title ? <h2>{title}</h2> : null}
        {description ? <p>{description}</p> : null}

        <div className="external-cta-actions">
          {items.map((item, index) =>
            item.href ? (
              <a
                key={index}
                className="btn"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </a>
            ) : (
              <span key={index} className="btn is-disabled">
                {item.label}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
